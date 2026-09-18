/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppTheme } from '../types';
import {
  FontCombo,
  RECOMMENDED_FONT_COMBOS,
  getSavedFontCombo,
  saveAndApplyFontCombo,
  resetFontComboToDefault,
} from '../utils/fontThemes';
import { soundFX } from '../utils/audio';
import { DETAILED_TUTORIALS, DetailedTutorialData } from '../data/detailedTutorialsData';
import { renderKotlinCodeLines } from '../utils/codeHighlighter';

interface FontThemesViewProps {
  theme: AppTheme;
  onBack: () => void;
  onSelectAndGoHome?: () => void;
  onToggleTheme?: () => void;
}

/**
 * Renders prose text with inline code tokens (`...`),
 * styled explicitly with the target combo's code font.
 */
function renderFormattedProse(
  text: string,
  isDark: boolean,
  codeFont: string
): React.ReactNode {
  if (!text) return text;
  if (!text.includes('`')) {
    return text;
  }

  const parts = text.split(/(`[^`]+`)/g);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const code = part.slice(1, -1);
      return (
        <code
          key={i}
          style={{ fontFamily: codeFont }}
          className={`text-[0.88em] font-semibold px-1.5 py-0.5 mx-0.5 rounded border inline-block align-baseline transition-colors ${
            isDark
              ? 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200/90'
          }`}
        >
          {code}
        </code>
      );
    }
    return part;
  });
}

function getShortFontName(fontFamilyStr: string): string {
  return fontFamilyStr.replace(/\s*\([^)]*\)/, '').trim();
}

export const FontThemesView: React.FC<FontThemesViewProps> = ({
  theme,
  onBack,
  onSelectAndGoHome,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';
  const [activeCombo, setActiveCombo] = useState<FontCombo>(() => getSavedFontCombo());
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [isComfortableSize, setIsComfortableSize] = useState<boolean>(false);

  // Replicated tutorial data from World 1 Lesson 1
  const tutorial: DetailedTutorialData =
    DETAILED_TUTORIALS['world-1-what-is-kotlin'] || Object.values(DETAILED_TUTORIALS)[0];

  // Interactive micro-quiz state per combo
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<string, boolean>>({});

  // Find index of currently active combo to start pager on that page
  const initialIndex = Math.max(
    0,
    RECOMMENDED_FONT_COMBOS.findIndex((c) => c.id === activeCombo.id)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  // References for horizontal scrolling and synchronized vertical scrolling
  const viewPagerRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // References and flags for synchronized vertical scrolling across all combo screens
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const isSyncingScrollRef = useRef<boolean>(false);
  const currentScrollTopRef = useRef<number>(0);

  // Synchronize all pages whenever any page is vertically scrolled
  const handlePageVerticalScroll = useCallback((sourceIdx: number) => {
    if (isSyncingScrollRef.current) return;
    const sourceEl = pageRefs.current[sourceIdx];
    if (!sourceEl) return;

    const st = sourceEl.scrollTop;
    currentScrollTopRef.current = st;

    const maxScroll = sourceEl.scrollHeight - sourceEl.clientHeight;
    const isNearBottom = maxScroll > 0 && maxScroll - st < 25;

    isSyncingScrollRef.current = true;
    pageRefs.current.forEach((el, idx) => {
      if (idx !== sourceIdx && el) {
        if (isNearBottom) {
          el.scrollTop = el.scrollHeight - el.clientHeight;
        } else if (Math.abs(el.scrollTop - st) > 1) {
          el.scrollTop = st;
        }
      }
    });

    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  }, []);

  // Ensure the target page matches the synchronized scroll position when switching tabs or swiping
  useEffect(() => {
    const currentEl = pageRefs.current[currentIndex];
    if (currentEl) {
      const targetTop = currentScrollTopRef.current;
      if (Math.abs(currentEl.scrollTop - targetTop) > 1) {
        currentEl.scrollTop = targetTop;
      }
    }
  }, [currentIndex]);

  // Keep scroll synchronized when toggling reading text size
  useEffect(() => {
    const targetTop = currentScrollTopRef.current;
    isSyncingScrollRef.current = true;
    pageRefs.current.forEach((el) => {
      if (el) {
        el.scrollTop = targetTop;
      }
    });
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  }, [isComfortableSize]);

  // Scroll ViewPager to initial index on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (viewPagerRef.current && initialIndex > 0) {
        const width = viewPagerRef.current.clientWidth;
        viewPagerRef.current.scrollTo({ left: initialIndex * width, behavior: 'auto' });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [initialIndex]);

  // Keep active tab visible in the top horizontal scroller
  useEffect(() => {
    const activeTabEl = tabRefs.current[currentIndex];
    if (activeTabEl && tabsScrollRef.current) {
      activeTabEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  // Touch and swipe gesture management: strictly enforce single swipe at a time
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const touchStartIndexRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const lastWheelTimeRef = useRef<number>(0);

  const scrollToIndex = useCallback((index: number, smooth: boolean = true) => {
    const container = viewPagerRef.current;
    if (!container) return;
    const clampedIndex = Math.max(0, Math.min(index, RECOMMENDED_FONT_COMBOS.length - 1));
    const width = container.clientWidth;
    isProgrammaticScrollRef.current = true;
    container.scrollTo({
      left: clampedIndex * width,
      behavior: smooth ? 'smooth' : 'auto',
    });
    setCurrentIndex(clampedIndex);
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);
  }, []);

  const handleViewPagerScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    const container = viewPagerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    if (width <= 0) return;
    const computedIndex = Math.round(container.scrollLeft / width);
    if (
      computedIndex >= 0 &&
      computedIndex < RECOMMENDED_FONT_COMBOS.length &&
      computedIndex !== currentIndex
    ) {
      // Strictly clamp momentum to single step at a time
      const clampedSingleStep =
        computedIndex > currentIndex ? currentIndex + 1 : currentIndex - 1;

      setCurrentIndex(clampedSingleStep);
      // If momentum tried to skip multiple pages, cleanly realign to single step
      if (Math.abs(computedIndex - currentIndex) > 1) {
        scrollToIndex(clampedSingleStep, true);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    touchStartIndexRef.current = currentIndex;
    isHorizontalSwipeRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - touchStartXRef.current);
    const diffY = Math.abs(currentY - touchStartYRef.current);

    if (isHorizontalSwipeRef.current === null && (diffX > 8 || diffY > 8)) {
      isHorizontalSwipeRef.current = diffX > diffY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || !isHorizontalSwipeRef.current) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      isHorizontalSwipeRef.current = null;
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;
    const deltaTime = Math.max(1, Date.now() - touchStartTimeRef.current);
    const velocityX = Math.abs(deltaX) / deltaTime;

    const container = viewPagerRef.current;
    const containerWidth = container ? container.clientWidth : window.innerWidth;
    const threshold = Math.min(50, containerWidth * 0.12);
    const isFastSwipe = velocityX > 0.25;

    const startIndex = touchStartIndexRef.current;
    let targetIndex = startIndex;

    if (deltaX > threshold || (deltaX > 20 && isFastSwipe)) {
      // Exactly one swipe forward (+1)
      targetIndex = Math.min(startIndex + 1, RECOMMENDED_FONT_COMBOS.length - 1);
    } else if (deltaX < -threshold || (deltaX < -20 && isFastSwipe)) {
      // Exactly one swipe backward (-1)
      targetIndex = Math.max(startIndex - 1, 0);
    } else {
      // Snap back to current page
      targetIndex = startIndex;
    }

    scrollToIndex(targetIndex, true);

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isHorizontalSwipeRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Intercept horizontal trackpad flicks to strictly enforce 1 page per flick
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 450) {
        return;
      }
      lastWheelTimeRef.current = now;
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleTabClick = (index: number) => {
    soundFX.playClick();
    scrollToIndex(index, true);
  };

  const handlePrev = () => {
    soundFX.playClick();
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    if (currentIndex < RECOMMENDED_FONT_COMBOS.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handleSelectCombo = (combo: FontCombo) => {
    soundFX.playClick();
    const updated = saveAndApplyFontCombo(combo.id);
    setActiveCombo(updated);
    setCopiedNotification(`Applied "${combo.name}"! Navigating to Home...`);
    if (onSelectAndGoHome) {
      setTimeout(() => {
        onSelectAndGoHome();
      }, 350);
    } else {
      setTimeout(() => {
        setCopiedNotification(null);
      }, 2500);
    }
  };

  const handleReset = () => {
    soundFX.playClick();
    const def = resetFontComboToDefault();
    setActiveCombo(def);
    const defIndex = RECOMMENDED_FONT_COMBOS.findIndex((c) => c.id === def.id);
    if (defIndex !== -1) {
      scrollToIndex(defIndex);
    }
    setCopiedNotification('Reset to Modern Kotlin Native (Default)!');
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2500);
  };

  const handleCopyCode = (codeText: string, id: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSelectQuizOption = (
    comboId: string,
    questionId: string,
    optionIdx: number,
    correctIdx: number
  ) => {
    const key = `${comboId}-${questionId}`;
    if (quizAnswers[key] !== undefined) return;

    setQuizAnswers((prev) => ({ ...prev, [key]: optionIdx }));
    setShowQuizExplanations((prev) => ({ ...prev, [key]: true }));

    if (optionIdx === correctIdx) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const currentShowingCombo = RECOMMENDED_FONT_COMBOS[currentIndex] || RECOMMENDED_FONT_COMBOS[0];

  const proseTextSize = isComfortableSize
    ? 'text-[16.5px] sm:text-[17px] leading-[1.8]'
    : 'text-[15px] sm:text-[15.5px] leading-[1.72]';

  return (
    <div
      className={`h-screen w-full flex flex-col transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-[#f8f9fb] text-slate-900'
      }`}
    >
      {/* ================= TOP APPLICATION BAR ================= */}
      <header
        className={`px-3 py-2 sm:px-4 sm:py-2.5 border-b flex items-center justify-between z-30 transition-colors shrink-0 ${
          isDark ? 'bg-[#0d121f]/95 border-white/10' : 'bg-white/95 border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onBack();
          }}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            isDark
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80'
          }`}
          title="Back to Profile"
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Day/Night Mode Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onToggleTheme();
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border active:scale-95 ${
                isDark
                  ? 'bg-slate-800 text-amber-300 border-white/10 hover:bg-slate-700 hover:text-amber-200 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-slate-900 shadow-xs'
              }`}
              title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}

          {/* Font Size Reading Toggle */}
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setIsComfortableSize(!isComfortableSize);
            }}
            className={`h-8 px-2.5 rounded-lg flex items-center gap-1 text-xs font-bold font-mono transition-all cursor-pointer border ${
              isComfortableSize
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                : isDark
                ? 'bg-slate-800 text-slate-300 border-white/10 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            title="Toggle Reading Text Size"
          >
            <span>Aa</span>
            <span className="text-[10px] opacity-75">{isComfortableSize ? 'Lg' : 'Sm'}</span>
          </button>

          {/* Reset to Default */}
          <button
            type="button"
            onClick={handleReset}
            className={`h-8 px-2.5 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer border ${
              isDark
                ? 'bg-slate-800/80 text-slate-300 hover:text-white border-white/10 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300 hover:bg-slate-200'
            }`}
            title="Reset to Modern Kotlin Native"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
            <span className="hidden md:inline text-[11px]">Reset</span>
          </button>

          {/* Direct Apply & Go Home Button */}
          <button
            type="button"
            onClick={() => handleSelectCombo(currentShowingCombo)}
            className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm ${
              activeCombo.id === currentShowingCombo.id
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {activeCombo.id === currentShowingCombo.id ? 'check' : 'palette'}
            </span>
            <span className="font-semibold">
              {activeCombo.id === currentShowingCombo.id ? 'Active (Home)' : 'Apply to App'}
            </span>
          </button>
        </div>
      </header>

      {/* ================= TOP HORIZONTAL SCROLLER WITH COMBO OPTIONS ================= */}
      <nav
        aria-label="Font Combos"
        className={`w-full border-b shrink-0 z-20 transition-colors ${
          isDark ? 'bg-[#0f1422] border-white/10' : 'bg-slate-100/90 border-slate-200'
        }`}
      >
        <div
          ref={tabsScrollRef}
          className="flex items-center gap-2 overflow-x-auto py-2.5 px-3 sm:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {RECOMMENDED_FONT_COMBOS.map((combo, idx) => {
            const isCurrentPage = currentIndex === idx;
            const isApplied = activeCombo.id === combo.id;

            return (
              <button
                key={combo.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 select-none ${
                  isCurrentPage
                    ? isDark
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/30'
                    : isDark
                    ? 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-white/10'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold whitespace-nowrap">
                      {combo.name}
                    </span>
                    {isApplied && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block animate-pulse" />
                    )}
                  </div>
                  <span
                    className={`text-[9.5px] font-mono tracking-wider whitespace-nowrap ${
                      isCurrentPage ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {combo.formula}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ================= NOTIFICATION TOAST ================= */}
      {copiedNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* ================= VIEWPAGER: EACH PAGE REPLICATES DETAILED TUTORIAL SCREEN ================= */}
      <div
        ref={viewPagerRef}
        onScroll={handleViewPagerScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="flex-1 w-full flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {RECOMMENDED_FONT_COMBOS.map((combo, comboIdx) => {
          const isSelected = activeCombo.id === combo.id;

          // Scope all font CSS variables to this specific ViewPager page
          const pageContainerStyle: React.CSSProperties = {
            ['--font-display' as any]: combo.displayFont,
            ['--font-body' as any]: combo.bodyFont,
            ['--font-tutorial' as any]: combo.tutorialFont,
            ['--font-code' as any]: combo.codeFont,
            fontFamily: combo.bodyFont,
            scrollSnapStop: 'always',
          };

          return (
            <section
              key={combo.id}
              ref={(el) => {
                pageRefs.current[comboIdx] = el;
              }}
              onScroll={() => handlePageVerticalScroll(comboIdx)}
              style={pageContainerStyle}
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto px-3 sm:px-6 py-4 pb-28"
            >
              <div className="max-w-3xl mx-auto w-full space-y-4">
                {/* 1. Combo Specification & Apply Banner Card (Height-locked to 132px for identical vertical content alignment across all screens) */}
                <div
                  className={`h-[132px] min-h-[132px] max-h-[132px] p-3 sm:p-3.5 rounded-2xl border flex flex-col justify-between transition-all overflow-hidden shrink-0 ${
                    isDark
                      ? 'bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border-indigo-500/30'
                      : 'bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-white border-indigo-200 shadow-xs'
                  }`}
                >
                  {/* Top Row: Name, Formula, Badges and Action Button */}
                  <div className="flex items-center justify-between gap-2 h-8 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <span
                        style={{ fontFamily: combo.displayFont }}
                        className="text-sm sm:text-base font-bold tracking-tight truncate"
                        title={combo.name}
                      >
                        {combo.name}
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
                        {combo.formula}
                      </span>
                      {combo.isDefault && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[8.5px] sm:text-[9px] font-bold shrink-0">
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectCombo(combo)}
                      className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white ring-1 sm:ring-2 ring-emerald-400/30'
                          : isDark
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
                        {isSelected ? 'check_circle' : 'palette'}
                      </span>
                      <span className="hidden sm:inline whitespace-nowrap">
                        {isSelected ? 'Active • View on Home' : 'Apply & View on Home'}
                      </span>
                      <span className="inline sm:hidden whitespace-nowrap">
                        {isSelected ? 'Active' : 'Apply'}
                      </span>
                      <span className="material-symbols-outlined text-[13px] sm:text-[14px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Middle Row: Tagline in single line */}
                  <p
                    style={{ fontFamily: combo.tutorialFont }}
                    className="text-[11px] sm:text-xs text-slate-400 truncate h-4 leading-4"
                    title={combo.tagline}
                  >
                    {combo.tagline}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-slate-200/40 dark:border-white/10" />

                  {/* Bottom Row: 4 Typography Assignments Grid (Guaranteed 1 single row) */}
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-[11px]">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-[9.5px] font-mono uppercase text-indigo-400 font-bold truncate">
                        Display
                      </span>
                      <span
                        style={{ fontFamily: combo.displayFont }}
                        className="font-bold text-[11px] sm:text-xs truncate"
                        title={combo.roles.display.fontFamily}
                      >
                        {getShortFontName(combo.roles.display.fontFamily)}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-[9.5px] font-mono uppercase text-emerald-400 font-bold truncate">
                        UI &amp; Quizzes
                      </span>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="font-medium text-[11px] sm:text-xs truncate"
                        title={combo.roles.ui.fontFamily}
                      >
                        {getShortFontName(combo.roles.ui.fontFamily)}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-[9.5px] font-mono uppercase text-cyan-400 font-bold truncate">
                        Reading
                      </span>
                      <span
                        style={{ fontFamily: combo.tutorialFont }}
                        className="font-medium text-[11px] sm:text-xs truncate"
                        title={combo.roles.tutorial.fontFamily}
                      >
                        {getShortFontName(combo.roles.tutorial.fontFamily)}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-[9.5px] font-mono uppercase text-amber-400 font-bold truncate">
                        Code
                      </span>
                      <span
                        style={{ fontFamily: combo.codeFont }}
                        className="font-mono text-[10.5px] sm:text-[11px] truncate text-emerald-400"
                        title={combo.roles.code.fontFamily}
                      >
                        {getShortFontName(combo.roles.code.fontFamily)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. REPLICATED DETAILED TUTORIAL HERO HEADER */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all relative overflow-hidden ${
                    isDark
                      ? 'bg-[#111625] border-indigo-500/20 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span
                      style={{ fontFamily: combo.bodyFont }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                        isDark
                          ? 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60'
                          : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                      }`}
                    >
                      {tutorial.badge}
                    </span>
                    <span
                      style={{ fontFamily: combo.bodyFont }}
                      className={`flex items-center gap-1 text-[11px] font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span>{tutorial.readTime}</span>
                    </span>
                  </div>

                  {/* Main Title rendered in Display Font */}
                  <h2
                    style={{ fontFamily: combo.displayFont }}
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.2] mb-2.5 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {tutorial.title}
                  </h2>

                  {/* Subtitle rendered in Tutorial Reading Font */}
                  <p
                    style={{ fontFamily: combo.tutorialFont }}
                    className={`text-[15px] sm:text-base leading-[1.65] mb-4 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {renderFormattedProse(tutorial.subtitle, isDark, combo.codeFont)}
                  </p>

                  {/* Executive Overview Summary Card */}
                  <div
                    className={`rounded-xl p-3.5 sm:p-4 border flex flex-col gap-2 ${
                      isDark
                        ? 'bg-slate-900/60 border-white/10 text-slate-200'
                        : 'bg-indigo-50/50 border-indigo-100/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          isDark
                            ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-700/50'
                            : 'bg-white text-indigo-600 shadow-xs border border-indigo-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                      </div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="text-[11px] font-bold uppercase tracking-wider text-indigo-500"
                      >
                        EXECUTIVE SUMMARY
                      </span>
                    </div>
                    <p
                      style={{ fontFamily: combo.tutorialFont }}
                      className="text-[13.5px] sm:text-sm leading-[1.65]"
                    >
                      {renderFormattedProse(tutorial.overviewSummary, isDark, combo.codeFont)}
                    </p>
                  </div>
                </article>

                {/* 3. REPLICATED TUTORIAL SECTION 1: Origins & Vision */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all ${
                    isDark
                      ? 'bg-[#111625] border-white/10 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/40 dark:border-white/5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isDark
                          ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/50'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">history_edu</span>
                    </div>
                    <div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-500 block mb-0.5"
                      >
                        BACKGROUND
                      </span>
                      <h3
                        style={{ fontFamily: combo.displayFont }}
                        className={`text-lg sm:text-xl font-bold leading-snug tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        1. The Origin Story &amp; Why JetBrains Built Kotlin
                      </h3>
                    </div>
                  </div>

                  {/* Prose Paragraphs in Tutorial Font */}
                  <div className="space-y-3 mb-4">
                    <p
                      style={{ fontFamily: combo.tutorialFont }}
                      className={`${proseTextSize} ${isDark ? 'text-slate-200/90' : 'text-slate-700'}`}
                    >
                      {renderFormattedProse(
                        'In 2010, JetBrains (the creator of IntelliJ IDEA and Android Studio) hit a productivity barrier with Java. Java was rock-solid and mature, but required staggering amounts of repetitive boilerplate. Modern language features like type inference, lambdas, and null-safety were either absent or clumsy.',
                        isDark,
                        combo.codeFont
                      )}
                    </p>
                    <p
                      style={{ fontFamily: combo.tutorialFont }}
                      className={`${proseTextSize} ${isDark ? 'text-slate-200/90' : 'text-slate-700'}`}
                    >
                      {renderFormattedProse(
                        'Their core goal was pragmatic: create an industrial-strength, general-purpose language with lightning-fast compilation, uncompromising type safety, and seamless 100% two-way interoperability with existing Java code.',
                        isDark,
                        combo.codeFont
                      )}
                    </p>
                  </div>

                  {/* Callout Box in Tutorial Font */}
                  <div
                    className={`rounded-xl p-3.5 border flex items-start gap-3 ${
                      isDark
                        ? 'bg-indigo-950/40 border-indigo-800/50 text-indigo-200'
                        : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-indigo-400 shrink-0 mt-0.5">
                      verified
                    </span>
                    <div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="font-bold text-xs uppercase tracking-wide block mb-1 text-indigo-400"
                      >
                        Google&apos;s Historic Milestone
                      </span>
                      <p
                        style={{ fontFamily: combo.tutorialFont }}
                        className="text-[13px] sm:text-[13.5px] leading-relaxed"
                      >
                        At Google I/O in May 2017, Google announced Kotlin as an official language on Android. In 2019, Google announced Android is Kotlin-First. Today, over 95% of the top 1,000 Android apps use Kotlin.
                      </p>
                    </div>
                  </div>
                </article>

                {/* 4. REPLICATED TUTORIAL SECTION 2: Four Pillars */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all ${
                    isDark
                      ? 'bg-[#111625] border-white/10 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/40 dark:border-white/5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isDark
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">diamond</span>
                    </div>
                    <div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-500 block mb-0.5"
                      >
                        LANGUAGE DESIGN
                      </span>
                      <h3
                        style={{ fontFamily: combo.displayFont }}
                        className={`text-lg sm:text-xl font-bold leading-snug tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        2. The Four Core Pillars of Kotlin
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: '1. Concise & Expressive',
                        desc: 'Drastically reduces boilerplate. Data classes, type inference, lambdas, and extension functions let you express concepts in a fraction of lines.',
                      },
                      {
                        title: '2. Null Safety by Default',
                        desc: 'Eliminates the "billion-dollar mistake". Distinguishes nullable and non-nullable types at compile time so NullPointerExceptions are caught early.',
                      },
                      {
                        title: '3. 100% Interoperable',
                        desc: 'Works flawlessly with Java. Call Java libraries from Kotlin and Kotlin classes from Java with zero performance penalty or translation layers.',
                      },
                      {
                        title: '4. Kotlin Multiplatform (KMP)',
                        desc: 'Write common business logic, networking, and state once in Kotlin and run natively on Android, iOS, Desktop, and Server-Side backends.',
                      },
                    ].map((pillar, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-3.5 rounded-xl border flex flex-col gap-1.5 transition-colors ${
                          isDark
                            ? 'bg-slate-900/50 border-white/5'
                            : 'bg-slate-50/80 border-slate-200/70'
                        }`}
                      >
                        <h4
                          style={{ fontFamily: combo.bodyFont }}
                          className="font-bold text-xs sm:text-[13px] text-indigo-400"
                        >
                          {pillar.title}
                        </h4>
                        <p
                          style={{ fontFamily: combo.tutorialFont }}
                          className="text-[12.5px] sm:text-[13px] leading-relaxed text-slate-300 dark:text-slate-300"
                        >
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>

                {/* 5. REPLICATED CODE SNIPPET IN TARGET CODE FONT */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all ${
                    isDark
                      ? 'bg-[#111625] border-white/10 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isDark
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                    </div>
                    <div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-500 block mb-0.5"
                      >
                        SYNTAX IN ACTION
                      </span>
                      <h3
                        style={{ fontFamily: combo.displayFont }}
                        className={`text-lg sm:text-xl font-bold leading-snug tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        3. Immutability, Variables &amp; Kotlin Functions
                      </h3>
                    </div>
                  </div>

                  <p
                    style={{ fontFamily: combo.tutorialFont }}
                    className={`${proseTextSize} mb-3.5 ${isDark ? 'text-slate-200/90' : 'text-slate-700'}`}
                  >
                    {renderFormattedProse(
                      'Notice how concise declarations are. Use `val` for read-only references and `var` only when mutation is necessary. String templates use the `$variable` syntax for effortless string interpolation.',
                      isDark,
                      combo.codeFont
                    )}
                  </p>

                  {/* Code Card Rendered in Target Code Font */}
                  <div className="rounded-xl border overflow-hidden bg-[#0a0e17] border-white/10 shadow-inner">
                    <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        <span
                          style={{ fontFamily: combo.codeFont }}
                          className="ml-2 text-[11.5px] font-semibold text-slate-300"
                        >
                          Main.kt
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(
                            `fun main() {\n  val learnerName: String = "Alex"\n  val streakDays: Int = 14\n  println("Welcome $learnerName! Streak: $streakDays days")\n}`,
                            `code-${combo.id}`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedCodeId === `code-${combo.id}` ? 'check' : 'content_copy'}
                        </span>
                        <span>
                          {copiedCodeId === `code-${combo.id}` ? 'Copied' : 'Copy'}
                        </span>
                      </button>
                    </div>

                    <div
                      style={{ fontFamily: combo.codeFont }}
                      className="p-4 text-[12.5px] sm:text-[13px] leading-[1.7] overflow-x-auto whitespace-pre text-slate-200"
                    >
                      {renderKotlinCodeLines(
                        [
                          'fun main() {',
                          '    val learnerName: String = "Alex"',
                          '    val streakDays: Int = 14',
                          '    val level: String = if (streakDays >= 10) "Master" else "Apprentice"',
                          '    println("Welcome $learnerName! Tier: $level")',
                          '}',
                        ],
                        { isDark: true }
                      ).map((lineNode, lIdx) => (
                        <div key={lIdx} className="leading-6">
                          {lineNode}
                        </div>
                      ))}
                    </div>

                    <div
                      style={{ fontFamily: combo.codeFont }}
                      className="px-4 py-2 bg-black/40 border-t border-white/5 text-[11.5px] text-emerald-400 flex items-center gap-2"
                    >
                      <span className="text-slate-500 select-none">&gt;</span>
                      <span>Welcome Alex! Tier: Master</span>
                    </div>
                  </div>
                </article>

                {/* 6. REPLICATED KOTLIN VS JAVA COMPARISON */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all ${
                    isDark
                      ? 'bg-[#111625] border-white/10 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <h3
                    style={{ fontFamily: combo.displayFont }}
                    className={`text-lg sm:text-xl font-bold leading-snug tracking-tight mb-3 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    4. Verbosity Comparison: Java vs Kotlin
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {/* Java */}
                    <div className="rounded-xl p-3.5 border bg-rose-950/20 border-rose-900/30 text-rose-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                          Java (18 Lines)
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono">
                          VERBOSE
                        </span>
                      </div>
                      <pre
                        style={{ fontFamily: combo.codeFont }}
                        className="text-[11px] leading-relaxed whitespace-pre text-rose-200/80 overflow-x-auto"
                      >
                        {`public class User {
    private final int id;
    private final String name;
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
    public int getId() { return id; }
    public String getName() { return name; }
}`}
                      </pre>
                    </div>

                    {/* Kotlin */}
                    <div className="rounded-xl p-3.5 border bg-emerald-950/20 border-emerald-900/30 text-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                          Kotlin (1 Line)
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                          CONCISE
                        </span>
                      </div>
                      <pre
                        style={{ fontFamily: combo.codeFont }}
                        className="text-[11px] leading-relaxed whitespace-pre text-emerald-200 overflow-x-auto"
                      >
                        {`// Generates constructor, getters, equals,
// hashCode, toString, and copy() automatically!
data class User(val id: Int, val name: String)`}
                      </pre>
                    </div>
                  </div>

                  <p
                    style={{ fontFamily: combo.tutorialFont }}
                    className="text-xs sm:text-[13px] text-slate-400 italic"
                  >
                    💡 Verdict: Kotlin delivers full feature parity with 95% less boilerplate code, preventing trivial accessor bugs.
                  </p>
                </article>

                {/* 7. REPLICATED INTERACTIVE KNOWLEDGE CHECK QUIZ */}
                <article
                  className={`rounded-2xl border p-4 sm:p-6 transition-all ${
                    isDark
                      ? 'bg-[#111625] border-white/10 shadow-sm'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/40 dark:border-white/5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isDark
                          ? 'bg-purple-950/60 text-purple-400 border border-purple-800/50'
                          : 'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">quiz</span>
                    </div>
                    <div>
                      <span
                        style={{ fontFamily: combo.bodyFont }}
                        className="text-[10px] font-mono font-bold tracking-wider uppercase text-purple-400 block mb-0.5"
                      >
                        INTERACTIVE RECAP
                      </span>
                      <h3
                        style={{ fontFamily: combo.displayFont }}
                        className={`text-lg sm:text-xl font-bold leading-snug tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        5. Knowledge Check Micro-Quiz
                      </h3>
                    </div>
                  </div>

                  {tutorial.quiz.slice(0, 1).map((q) => {
                    const quizKey = `${combo.id}-${q.id}`;
                    const answered = quizAnswers[quizKey] !== undefined;
                    const selectedIdx = quizAnswers[quizKey];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div key={q.id} className="space-y-3">
                        <p
                          style={{ fontFamily: combo.tutorialFont }}
                          className="font-medium text-sm sm:text-base text-slate-200"
                        >
                          {q.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selectedIdx === optIdx;
                            let btnStyle = isDark
                              ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-200 border-white/10'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

                            if (answered) {
                              if (optIdx === q.correctIndex) {
                                btnStyle =
                                  'bg-emerald-600/30 text-emerald-300 border-emerald-500 font-bold';
                              } else if (isThisSelected) {
                                btnStyle =
                                  'bg-rose-600/30 text-rose-300 border-rose-500 font-bold';
                              } else {
                                btnStyle = 'opacity-40 border-transparent';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() =>
                                  handleSelectQuizOption(
                                    combo.id,
                                    q.id,
                                    optIdx,
                                    q.correctIndex
                                  )
                                }
                                disabled={answered}
                                style={{ fontFamily: combo.bodyFont }}
                                className={`p-3 rounded-xl border text-left text-xs sm:text-[13px] transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {answered && optIdx === q.correctIndex && (
                                  <span className="material-symbols-outlined text-[16px] text-emerald-400">
                                    check_circle
                                  </span>
                                )}
                                {answered && isThisSelected && optIdx !== q.correctIndex && (
                                  <span className="material-symbols-outlined text-[16px] text-rose-400">
                                    cancel
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {showQuizExplanations[quizKey] && (
                          <div
                            className={`p-3 rounded-xl border text-xs sm:text-[13px] leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                                : 'bg-amber-950/40 border-amber-800 text-amber-300'
                            }`}
                          >
                            <span className="font-bold block mb-1">
                              {isCorrect ? '🎉 Correct!' : '💡 Explanation:'}
                            </span>
                            <p style={{ fontFamily: combo.tutorialFont }}>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </article>

                {/* 8. Bottom Action & Navigation Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={comboIdx === 0}
                      className="px-3 py-2 rounded-xl border text-xs font-mono disabled:opacity-30 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                      <span>Previous Combo</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={comboIdx === RECOMMENDED_FONT_COMBOS.length - 1}
                      className="px-3 py-2 rounded-xl border text-xs font-mono disabled:opacity-30 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Combo</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectCombo(combo)}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSelected ? 'check_circle' : 'palette'}
                    </span>
                    <span>
                      {isSelected
                        ? 'Active Combo • Return to Home'
                        : `Apply "${combo.name}" & Return to Home`}
                    </span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
