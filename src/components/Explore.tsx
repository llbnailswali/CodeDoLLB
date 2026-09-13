import React, { useState, useEffect, useRef } from 'react';
import { Stage2ExploreData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

interface ExploreStageProps {
  data: Stage2ExploreData;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  exploreCardIndex: number;
  setExploreCardIndex: (index: number) => void;
  scrollToElement: (id: string, offset?: number) => void;
  onContinue: () => void;
  tapToRevealEnabled?: boolean;
}

// Reveal steps:
// 0: Title only
// 1: Subtitle + sticky examples navigator + 1st Example Card revealed together
// 2 to cards.length: Subsequent example cards (card 1, card 2, ...)
export const Explore: React.FC<ExploreStageProps> = ({
  data,
  isDark,
  revealStep,
  setRevealStep,
  exploreCardIndex,
  setExploreCardIndex,
  scrollToElement,
  onContinue,
  tapToRevealEnabled = true,
}) => {
  const totalCards = data.cards.length;
  // Step 0: title only
  // Step 1: indicator bar + 1st example card (card 0)
  // Step 2..totalCards: card 1, card 2, ...
  const maxRevealStep = totalCards;

  // Refs to decouple tap-to-select and tap-to-continue from scroll-based highlighting
  // This prevents indicator buttons from fluctuating during smooth/programmatic scrolling
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const programmaticTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isFullyRevealed = !tapToRevealEnabled || revealStep >= maxRevealStep;

  // Calculate exact offset so the example section is scrolled to sit JUST below the sticky indicator bar
  const getIndicatorBottomOffset = () => {
    const indicatorEl = document.getElementById('explore-indicator-bar');
    const indicatorHeight = indicatorEl ? indicatorEl.offsetHeight : 44;
    return 56 + indicatorHeight + 8; // 56px top toolbar + indicator bar height + 8px minor spacing
  };

  // When user taps to continue: reveal indicator and example, highlight the relevant number, and scroll so example sits just below indicator
  const handleNextReveal = () => {
    if (!tapToRevealEnabled) return;
    soundFX.playClick();
    if (revealStep < maxRevealStep) {
      const nextStep = revealStep + 1;
      const targetCardIdx = nextStep - 1; // e.g. step 1 -> example 1 (idx 0), step 2 -> example 2 (idx 1), etc.

      // Lock programmatic scroll to prevent any scroll-based fluctuation
      isProgrammaticScrollRef.current = true;
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

      // Highlight the relevant button according to example number on tap
      setRevealStep(nextStep);
      setExploreCardIndex(targetCardIdx);

      // Smoothly scroll down so the newly revealed example sits just below the indicator
      requestAnimationFrame(() => {
        setTimeout(() => {
          const offset = getIndicatorBottomOffset();
          scrollToElement(`explore-card-${targetCardIdx}`, offset);

          // Keep lock until smooth scroll completes
          programmaticTimerRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 750);
        }, 60);
      });
    }
  };

  // When user directly taps an indicator button: highlight that step and scroll so it sits just below indicator
  const handleIndicatorClick = (idx: number) => {
    soundFX.playClick();
    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

    // If card has not yet been revealed, reveal up to that card immediately
    const targetReveal = idx + 1;
    if (revealStep < targetReveal) {
      setRevealStep(targetReveal);
    }

    setExploreCardIndex(idx);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const offset = getIndicatorBottomOffset();
        scrollToElement(`explore-card-${idx}`, offset);

        programmaticTimerRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 750);
      }, 60);
    });
  };

  // When user clicks a card directly
  const handleCardClick = (idx: number) => {
    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

    setExploreCardIndex(idx);

    programmaticTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 400);
  };

  // Keep the scrolling-highlight in sync whenever the content is scrolled
  useEffect(() => {
    const handleUserGesture = () => {
      // User manual interaction takes precedence over programmatic scroll lock
      isProgrammaticScrollRef.current = false;
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    };

    const rootEl = document.getElementById('root');
    const gestureTargets: (Window | HTMLElement)[] = [window];
    if (rootEl) gestureTargets.push(rootEl);

    gestureTargets.forEach((target) => {
      target.addEventListener('touchstart', handleUserGesture, { passive: true });
      target.addEventListener('touchmove', handleUserGesture, { passive: true });
      target.addEventListener('wheel', handleUserGesture, { passive: true });
      target.addEventListener('pointerdown', handleUserGesture, { passive: true });
      target.addEventListener('keydown', handleUserGesture as EventListener, { passive: true });
    });

    let ticking = false;
    const updateActiveCardOnScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      // In non-tap mode (!tapToRevealEnabled), all cards are visible
      const visibleCount = !tapToRevealEnabled ? totalCards : Math.min(revealStep, totalCards);
      if (visibleCount <= 0) return;

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (rootEl ? rootEl.scrollTop : 0);

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        rootEl ? rootEl.scrollHeight : 0
      );

      const clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        (rootEl ? rootEl.clientHeight : 0);

      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

      if (isAtBottom) {
        setExploreCardIndex(visibleCount - 1);
        return;
      }

      const headerOffset = getIndicatorBottomOffset();
      let matchedIdx = 0;
      for (let i = visibleCount - 1; i >= 0; i--) {
        const el = document.getElementById(`explore-card-${i}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerOffset + 60) {
          matchedIdx = i;
          break;
        }
      }
      setExploreCardIndex(matchedIdx);
    };

    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        updateActiveCardOnScroll();
        ticking = false;
      });
      ticking = true;
    };

    const handleScrollEnd = () => {
      isProgrammaticScrollRef.current = false;
      updateActiveCardOnScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    if (rootEl) {
      rootEl.addEventListener('scroll', handleScroll, { passive: true });
      rootEl.addEventListener('scrollend', handleScrollEnd, { passive: true });
    }

    // Initial check on mount or when mode/step updates
    updateActiveCardOnScroll();

    return () => {
      gestureTargets.forEach((target) => {
        target.removeEventListener('touchstart', handleUserGesture);
        target.removeEventListener('touchmove', handleUserGesture);
        target.removeEventListener('wheel', handleUserGesture);
        target.removeEventListener('pointerdown', handleUserGesture);
        target.removeEventListener('keydown', handleUserGesture as EventListener);
      });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (rootEl) {
        rootEl.removeEventListener('scroll', handleScroll);
        rootEl.removeEventListener('scrollend', handleScrollEnd);
      }
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    };
  }, [revealStep, totalCards, tapToRevealEnabled, setExploreCardIndex]);

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* 0: Concept Title (Always visible initially) */}
      <div className="pt-1 mb-2">
        <h2
          className={`font-['Outfit'] text-2xl font-semibold tracking-tight mb-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h2>
      </div>

      {/* Subtitle if available */}
      {data.subtitle && data.subtitle.trim() !== '' && (
        <p
          className={`text-[15px] leading-snug font-normal mb-2 transition-all duration-300 animate-fadeIn ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {data.subtitle}
        </p>
      )}

      {/* Sticky Indicator Navigation Bar - Shown after tap or when tapToReveal is disabled */}
      {(!tapToRevealEnabled || revealStep >= 1) && (
        <div
          id="explore-indicator-bar"
          className="sticky top-14 z-30 mb-2.5 py-0.5 flex justify-center w-full animate-fadeIn"
        >
          {/* Rectangle shape indicator navigation container */}
          <div
            className={`inline-flex items-center gap-1.5 p-1.5 rounded-xl border backdrop-blur-md shadow-md transition-colors duration-200 ${
              isDark
                ? 'bg-[#171b26]/95 border-[#262c3d] shadow-black/40'
                : 'bg-white/95 border-slate-200/90 shadow-slate-900/10'
            }`}
          >
            {data.cards.map((card, idx) => {
              const buttonLabel = card.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);
              const isHighlighted = exploreCardIndex === idx;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIndicatorClick(idx);
                  }}
                  className={`min-w-[42px] h-8 px-2.5 flex items-center justify-center text-xs font-bold font-mono tracking-wider rounded-lg transition-all duration-150 select-none cursor-pointer ${
                    isHighlighted
                      ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500/50 scale-[1.03]'
                      : isDark
                      ? 'bg-[#121622] text-slate-400 border border-[#262c3d] hover:text-slate-200 hover:border-slate-500 hover:bg-[#181d2c]'
                      : 'bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-200/70'
                  }`}
                >
                  {buttonLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progressive Example Cards - Shown after tap or when tapToReveal is disabled */}
      {(!tapToRevealEnabled || revealStep >= 1) && (
        <div className="space-y-4 mb-6">
          {data.cards.map((card, idx) => {
            const isCardRevealed = !tapToRevealEnabled || revealStep >= 1 + idx;
            if (!isCardRevealed) return null;

          return (
            <article
              key={card.id}
              id={`explore-card-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(idx);
              }}
              className={`w-full rounded-2xl p-5 border transition-all duration-300 animate-fadeIn ${
                exploreCardIndex === idx
                  ? isDark
                    ? 'bg-[#171b26] border-indigo-500/40 shadow-lg'
                    : 'bg-white border-indigo-200/90 shadow-md'
                  : isDark
                  ? 'bg-[#171b26] border-[#262c3d] shadow-sm'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <header className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                      isDark
                        ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}
                  >
                    {card.number}
                  </span>
                  <h3
                    className={`font-['Outfit'] font-bold text-lg ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isDark
                      ? 'bg-[#0f131d] text-slate-300 border border-[#262c3d]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {card.language}
                </span>
              </header>

              <p
                className={`text-sm mb-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {card.subtitle}
              </p>

              {/* Code Snippet Container */}
              <div
                className={`rounded-xl p-4 font-mono text-sm leading-relaxed mb-4 overflow-x-auto ${
                  isDark
                    ? 'bg-[#0f131d] border border-[#262c3d] text-slate-200'
                    : 'bg-slate-50 border border-slate-200/70 text-slate-800'
                }`}
              >
                {card.code.map((line, lIdx) => (
                  <div key={lIdx} className="whitespace-pre">
                    {line.startsWith('fun ') ? (
                      <>
                        <span className="text-indigo-500 font-semibold">fun </span>
                        <span className="text-slate-900 dark:text-white font-medium">
                          {line.substring(4)}
                        </span>
                      </>
                    ) : line.includes('println') ? (
                      <span className="pl-4">
                        <span className="text-slate-900 dark:text-white">println</span>
                        (
                        <span className="text-emerald-500">
                          {line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'))}
                        </span>
                        )
                      </span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* What it means breakdown */}
              <div className="mb-4">
                <h4
                  className={`text-[11px] font-['Outfit'] font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  WHAT IT MEANS
                </h4>
                <ul
                  className={`text-xs space-y-1.5 leading-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {card.whatItMeans.map((item, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>
                        <code
                          className={`font-mono px-1 py-0.5 rounded text-[11px] ${
                            isDark
                              ? 'bg-[#0f131d] text-slate-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.label}
                        </code>{' '}
                        → {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What changed callout */}
              <div
                className={`rounded-xl p-3.5 border ${
                  isDark
                    ? 'bg-indigo-950/40 border-indigo-800/40 text-slate-200'
                    : 'bg-indigo-50/60 border border-indigo-100 text-slate-800'
                }`}
              >
                <h4
                  className={`text-[10px] font-['Outfit'] font-bold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-indigo-300' : 'text-indigo-700'
                  }`}
                >
                  WHAT CHANGED
                </h4>
                <p className="text-xs font-medium">{card.whatChanged}</p>
              </div>
            </article>
          );
        })}
      </div>
      )}

      {/* Spacer to push content up so hint sits cleanly at bottom with breathing space */}
      <div className="flex-1 min-h-[16px]" />

      {/* Primary CTA / Tap Hint */}
      <div
        className={`sticky bottom-0 left-0 right-0 w-full pt-1.5 pb-2 transition-all ${
          isDark
            ? 'bg-gradient-to-t from-[#0f131d] via-[#0f131d]/95 to-transparent'
            : 'bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9]/95 to-transparent'
        }`}
      >
        {!isFullyRevealed ? (
          /* Subtle Minimalist Tap Hint (Finger icon + short text) positioned nicely above bottom edge */
          <div className="flex justify-center w-full">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextReveal();
              }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border shadow-md transition-all duration-200 active:scale-95 cursor-pointer select-none ${
                isDark
                  ? 'bg-[#171b26] border-indigo-500/40 text-indigo-300 hover:text-white hover:border-indigo-400'
                  : 'bg-white border-indigo-200 text-indigo-700 hover:border-indigo-300 shadow-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-indigo-500 animate-bounce">
                touch_app
              </span>
              <span className="text-xs font-semibold font-['Outfit'] tracking-wide">
                Tap to continue
              </span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-['Outfit'] font-bold text-base rounded-2xl shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to Predict</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
