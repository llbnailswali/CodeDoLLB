import React, { useState, useEffect, useRef } from 'react';
import { DetailedTutorialData } from '../data/detailedTutorialsData';
import { renderKotlinCodeLines } from '../utils/codeHighlighter';
import { soundFX } from '../utils/audio';
import { AnimatedFlowChart } from './visuals/AnimatedFlowChart';

/**
 * Custom Cubic-Bezier curve evaluator.
 * Solves B_x(u) = t using Newton-Raphson with bisection fallback,
 * then returns B_y(u) to provide exact CSS cubic-bezier easing.
 */
function createCubicBezierEasing(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number, epsilon = 1e-5) {
    let t2 = x;
    // Newton-Raphson iteration
    for (let i = 0; i < 8; i++) {
      const x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      const d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) break;
      t2 -= x2 / d2;
    }
    // Fallback bisection
    let t0 = 0.0;
    let t1 = 1.0;
    t2 = x;
    if (t2 < t0) return t0;
    if (t2 > t1) return t1;
    while (t0 < t1) {
      const x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }
    return t2;
  }

  return (progress: number): number => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    return sampleCurveY(solveCurveX(progress));
  };
}

// Tactile & premium easing curve: cubic-bezier(0.16, 1, 0.3, 1)
// Responsive quick start, fluid motion, and smooth cushioned settling
const tactileScrollEase = createCubicBezierEasing(0.16, 1.0, 0.3, 1.0);

interface DetailedTutorialViewProps {
  tutorial: DetailedTutorialData;
  isDark: boolean;
  onBack: () => void;
  onToggleTheme?: () => void;
}

/**
 * Renders prose text with inline code tokens (`...`),
 * maintaining clean vertical baseline alignment and font hierarchy.
 */
function renderFormattedProse(text: string, isDark: boolean): React.ReactNode {
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
          className={`font-mono text-[0.88em] font-semibold px-1.5 py-0.5 mx-0.5 rounded border inline-block align-baseline transition-colors ${
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

export const DetailedTutorialView: React.FC<DetailedTutorialViewProps> = ({
  tutorial,
  isDark,
  onBack,
  onToggleTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [isComfortableSize, setIsComfortableSize] = useState<boolean>(false);

  // Tab & scroll-spy state
  const [activeTabId, setActiveTabId] = useState<string>(tutorial.toc?.[0]?.id || '');
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabBarRef = useRef<HTMLElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnimRef = useRef<number | null>(null);

  // Cancel active programmatic cubic-bezier scroll animation if user interacts manually
  useEffect(() => {
    const cancelAnim = () => {
      if (scrollAnimRef.current !== null) {
        cancelAnimationFrame(scrollAnimRef.current);
        scrollAnimRef.current = null;
        isProgrammaticScrollRef.current = false;
      }
    };

    const rootEl = document.getElementById('root');
    rootEl?.addEventListener('wheel', cancelAnim, { passive: true });
    rootEl?.addEventListener('touchstart', cancelAnim, { passive: true });
    window.addEventListener('wheel', cancelAnim, { passive: true });
    window.addEventListener('touchstart', cancelAnim, { passive: true });

    return () => {
      rootEl?.removeEventListener('wheel', cancelAnim);
      rootEl?.removeEventListener('touchstart', cancelAnim);
      window.removeEventListener('wheel', cancelAnim);
      window.removeEventListener('touchstart', cancelAnim);
      if (scrollAnimRef.current !== null) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, []);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // Reset active tab to first section on tutorial change
  useEffect(() => {
    if (tutorial.toc && tutorial.toc.length > 0) {
      setActiveTabId(tutorial.toc[0].id);
    }
  }, [tutorial.lessonId, tutorial.toc]);

  // Keep active tab visible in the horizontal scroller
  useEffect(() => {
    if (!activeTabId || !tutorial.toc) return;
    const activeIdx = tutorial.toc.findIndex((item) => item.id === activeTabId);
    if (activeIdx >= 0) {
      const activeTabEl = tabRefs.current[activeIdx];
      if (activeTabEl && tabsScrollRef.current) {
        activeTabEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeTabId, tutorial.toc]);

  // Dynamic typography classes based on reader preference
  const proseTextSize = isComfortableSize
    ? 'text-[16.5px] sm:text-[17px] leading-[1.8]'
    : 'text-[15px] sm:text-[15.5px] leading-[1.7]';

  const subtitleTextSize = isComfortableSize
    ? 'text-[16px] sm:text-[17px] leading-[1.75]'
    : 'text-[15px] sm:text-base leading-[1.65]';

  // Track scroll progress for the top bar progress line and scroll-spy for tabs
  useEffect(() => {
    const rootEl = document.getElementById('root');

    const handleScroll = () => {
      const currentScrollTop = rootEl
        ? rootEl.scrollTop
        : (window.scrollY || document.documentElement.scrollTop || 0);
      const scrollHeight = rootEl
        ? rootEl.scrollHeight
        : document.documentElement.scrollHeight;
      const clientHeight = rootEl ? rootEl.clientHeight : window.innerHeight;

      // 1. Reading progress bar
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollTop / maxScroll) * 100));
        setScrollProgress(progress);
      }

      // 2. Scroll-spy for tutorial.toc tabs
      if (isProgrammaticScrollRef.current) return;
      if (!tutorial.toc || tutorial.toc.length === 0) return;

      // If user reaches near bottom, highlight the last tab (quiz)
      const isNearBottom = maxScroll > 0 && maxScroll - currentScrollTop < 100;
      if (isNearBottom) {
        const lastId = tutorial.toc[tutorial.toc.length - 1].id;
        setActiveTabId((prev) => (prev !== lastId ? lastId : prev));
        return;
      }

      const triggerOffset = Math.min(220, window.innerHeight * 0.35);

      let currentId = tutorial.toc[0].id;
      for (const item of tutorial.toc) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset) {
            currentId = item.id;
          } else {
            break;
          }
        }
      }

      setActiveTabId((prev) => (prev !== currentId ? currentId : prev));
    };

    rootEl?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    handleScroll();

    return () => {
      rootEl?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [tutorial.toc]);

  const handleTabClick = (targetId: string) => {
    soundFX.playClick();
    setActiveTabId(targetId);

    const el = document.getElementById(targetId);
    if (!el) return;

    const rootEl = document.getElementById('root');
    const startRoot = rootEl ? rootEl.scrollTop : 0;
    const startWindow = window.scrollY || document.documentElement.scrollTop || 0;

    const rectTop = el.getBoundingClientRect().top;
    const headerOffset = 58; // 52px sticky header + 6px breathing margin
    const targetRoot = Math.max(0, startRoot + rectTop - headerOffset);
    const targetWindow = Math.max(0, startWindow + rectTop - headerOffset);

    const deltaRoot = targetRoot - startRoot;
    const deltaWindow = targetWindow - startWindow;
    const distance = Math.max(Math.abs(deltaRoot), Math.abs(deltaWindow));

    // Dynamic duration based on travel distance for natural tactile feel:
    // 380ms for adjacent sections, scaling gracefully up to 720ms for full-length transitions
    const duration = Math.min(720, Math.max(380, Math.round(distance * 0.28 + 320)));

    // Cancel any ongoing scroll animation
    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }

    // Suppress scroll-spy during programmatic animation
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, duration + 50);

    const startTime = performance.now();

    const animateScroll = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = tactileScrollEase(progress);

      if (rootEl) {
        rootEl.scrollTop = Math.round(startRoot + deltaRoot * easedProgress);
      }
      window.scrollTo(0, Math.round(startWindow + deltaWindow * easedProgress));

      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollAnimRef.current = null;
        isProgrammaticScrollRef.current = false;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(animateScroll);
  };

  const handleCopy = (codeText: string, id: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number, correctIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));

    if (optionIdx === correctIdx) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
  };

  const answeredQuestionsCount = Object.keys(selectedAnswers).length;
  const correctCount = tutorial.quiz.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col transition-colors duration-200 select-none font-jakarta ${
        isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-[#f8f9fb] text-slate-900'
      }`}
    >
      {/* ================= STICKY TOP HEADER WITH PROGRESS BAR ================= */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#0a0e17]/95 border-white/10 shadow-sm shadow-black/30'
            : 'bg-[#f8f9fb]/95 border-slate-200/90 shadow-xs'
        }`}
      >
        <div className="max-w-2xl mx-auto w-full px-3 sm:px-4 h-12 flex items-center justify-between gap-3">
          {/* Left: Back affordance + Tutorial Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              id="detailed-tutorial-back-btn"
              onClick={() => {
                soundFX.playClick();
                onBack();
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Close Tutorial"
              aria-label="Close Tutorial"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>

            <h1
              className={`text-xs sm:text-sm font-bold font-outfit truncate ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {tutorial.title}
            </h1>
          </div>

          {/* Right: Progress % badge + Aa font size toggle + Day/Night Mode Switch */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border tabular-nums ${
                isDark
                  ? 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              {Math.round(scrollProgress)}%
            </span>

            {/* Font Size Reading Toggle (Comfortable vs Standard) */}
            <button
              type="button"
              id="detailed-tutorial-font-size-btn"
              onClick={() => {
                soundFX.playClick();
                setIsComfortableSize(!isComfortableSize);
              }}
              className={`h-7 px-2 rounded-lg flex items-center justify-center gap-0.5 transition-all cursor-pointer active:scale-95 text-xs font-bold border ${
                isComfortableSize
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 border-slate-200'
              }`}
              title={isComfortableSize ? 'Switch to Standard Text' : 'Switch to Large Reading Text'}
              aria-label="Toggle Reading Text Size"
            >
              <span className="text-[11px] tracking-tight">Aa</span>
              <span className="text-[9px] opacity-75">{isComfortableSize ? 'Lg' : 'Sm'}</span>
            </button>

            {/* Day / Night Theme Switch */}
            {onToggleTheme && (
              <button
                type="button"
                id="detailed-tutorial-theme-btn"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                onClick={() => {
                  soundFX.playClick();
                  onToggleTheme();
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 border ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-amber-400 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 hover:text-indigo-600 border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Sticky Progress Bar Track along bottom edge of header */}
        <div
          role="progressbar"
          aria-label="Section Reading Progress"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-1 bg-slate-200/60 dark:bg-white/10 relative overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Main Content Article Body - Edge-to-Edge reading with zero unnecessary wasted space */}
      <main
        className={`flex-1 max-w-2xl mx-auto w-full px-0 pt-0 space-y-3 sm:space-y-4 ${
          tutorial.toc && tutorial.toc.length > 0 ? 'pb-24 sm:pb-28' : 'pb-10'
        }`}
      >
        {/* ================= HERO HEADER CARD ================= */}
        <section
          className={`px-4 pt-4 pb-5 sm:px-6 sm:pt-6 sm:pb-6 border-b transition-all relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-b from-[#13192a] to-[#0a0e17] border-indigo-500/20 shadow-sm'
              : 'bg-gradient-to-b from-white to-slate-50 border-indigo-100/80 shadow-xs'
          }`}
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                isDark
                  ? 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60'
                  : 'bg-indigo-50 text-indigo-600 border-indigo-200'
              }`}
            >
              {tutorial.badge}
            </span>
            <span
              className={`flex items-center gap-1 text-[11px] font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{tutorial.readTime}</span>
            </span>
          </div>

          <h1
            className={`font-outfit text-2xl sm:text-[32px] font-extrabold tracking-tight leading-[1.22] mb-2.5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {tutorial.title}
          </h1>

          <p
            className={`${subtitleTextSize} mb-4 font-normal font-tutorial ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {renderFormattedProse(tutorial.subtitle, isDark)}
          </p>

          {/* Executive Overview Summary Card */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border flex flex-col gap-2.5 ${
              isDark
                ? 'bg-slate-900/60 border-white/10 text-slate-200'
                : 'bg-indigo-50/50 border-indigo-100/80 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-700/50'
                    : 'bg-white text-indigo-600 shadow-xs border border-indigo-100'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">auto_stories</span>
              </div>
              <span className="text-[11px] font-outfit font-bold uppercase tracking-wider text-indigo-500">
                EXECUTIVE SUMMARY
              </span>
            </div>
            <p className="text-[13.5px] sm:text-sm leading-[1.65]">
              {renderFormattedProse(tutorial.overviewSummary, isDark)}
            </p>
          </div>
        </section>

        {/* ================= TUTORIAL SECTIONS ================= */}
        {tutorial.sections.map((sec, secIdx) => (
          <article
            key={sec.id}
            id={sec.id}
            className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-16 ${
              isDark
                ? 'bg-[#121726] border-white/10 shadow-sm'
                : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/40 dark:border-white/5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isDark
                    ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/50'
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {sec.icon || 'menu_book'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                {sec.badge && (
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-500 dark:text-indigo-400 block mb-0.5">
                    {sec.badge}
                  </span>
                )}
                <h2
                  className={`font-outfit text-[19px] sm:text-xl font-bold leading-snug tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {secIdx + 1}. {sec.title}
                </h2>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3.5 mb-4">
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={`${proseTextSize} font-tutorial ${
                    isDark ? 'text-slate-200/90' : 'text-slate-700'
                  }`}
                >
                  {renderFormattedProse(p, isDark)}
                </p>
              ))}
            </div>

            {/* Bullet Points if any */}
            {sec.bulletPoints && sec.bulletPoints.length > 0 && (
              <div className="space-y-2.5 my-4">
                {sec.bulletPoints.map((bp, bpIdx) => (
                  <div
                    key={bpIdx}
                    className={`rounded-xl p-3.5 border flex items-start gap-3 transition-colors ${
                      isDark
                        ? 'bg-slate-900/50 border-white/5'
                        : 'bg-slate-50/70 border-slate-200/70'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-[13.5px] font-outfit font-bold mb-1 tracking-tight ${
                          isDark ? 'text-slate-100' : 'text-slate-800'
                        }`}
                      >
                        {bp.title}
                      </h4>
                      <p
                        className={`text-[13px] sm:text-[13.5px] leading-[1.62] ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {renderFormattedProse(bp.desc, isDark)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet if any */}
            {sec.codeSnippet && (
              <div className="my-4">
                <div
                  className={`rounded-2xl border overflow-hidden shadow-inner ${
                    isDark
                      ? 'bg-[#090d16] border-[#1e2538]'
                      : 'bg-[#1e2330] border-slate-700 text-slate-100'
                  }`}
                >
                  {/* Code Toolbar */}
                  <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2 font-mono text-[11.5px] font-semibold text-slate-300">
                        {sec.codeSnippet.title || 'Kotlin'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(sec.codeSnippet!.code.join('\n'), `code-${sec.id}`)
                      }
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedCodeId === `code-${sec.id}` ? 'check' : 'content_copy'}
                      </span>
                      <span>
                        {copiedCodeId === `code-${sec.id}` ? 'Copied' : 'Copy'}
                      </span>
                    </button>
                  </div>

                  {/* Highlighted Code Lines */}
                  <div className="p-4 font-mono text-[12.5px] sm:text-[13px] leading-[1.7] overflow-x-auto whitespace-pre">
                    {renderKotlinCodeLines(sec.codeSnippet.code, { isDark: true }).map(
                      (lineNode, lIdx) => (
                        <div key={lIdx} className="leading-6">
                          {lineNode}
                        </div>
                      )
                    )}
                  </div>

                  {/* Console Output if provided */}
                  {sec.codeSnippet.output && (
                    <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 text-[12px] font-mono text-emerald-400 flex items-start gap-2">
                      <span className="text-slate-500 select-none">&gt;</span>
                      <span className="whitespace-pre">{sec.codeSnippet.output}</span>
                    </div>
                  )}
                </div>

                {sec.codeSnippet.explanation && (
                  <p
                    className={`mt-2 text-[12.5px] leading-[1.6] italic px-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    💡 {renderFormattedProse(sec.codeSnippet.explanation, isDark)}
                  </p>
                )}
              </div>
            )}

            {/* Comparison Side-by-Side if provided */}
            {sec.comparison && (
              <div className="my-5 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Left (Java / Older) */}
                  <div
                    className={`rounded-xl p-3.5 border font-mono text-xs overflow-x-auto ${
                      isDark
                        ? 'bg-[#18131d]/60 border-rose-900/30 text-rose-200'
                        : 'bg-rose-50/50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 font-outfit font-bold text-[11.5px] uppercase tracking-wide">
                      <span className="text-rose-500">{sec.comparison.leftTitle}</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[10px] font-mono">
                        {sec.comparison.leftTag || 'JAVA'}
                      </span>
                    </div>
                    <pre className="text-[11.5px] leading-[1.65] whitespace-pre font-mono">
                      {sec.comparison.leftCode.join('\n')}
                    </pre>
                  </div>

                  {/* Right (Kotlin / Modern) */}
                  <div
                    className={`rounded-xl p-3.5 border font-mono text-xs overflow-x-auto ${
                      isDark
                        ? 'bg-[#0f1f1d]/60 border-emerald-900/30 text-emerald-200'
                        : 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 font-outfit font-bold text-[11.5px] uppercase tracking-wide">
                      <span className="text-emerald-500">{sec.comparison.rightTitle}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-mono">
                        {sec.comparison.rightTag || 'KOTLIN'}
                      </span>
                    </div>
                    <pre className="text-[11.5px] leading-[1.65] whitespace-pre font-mono">
                      {sec.comparison.rightCode.join('\n')}
                    </pre>
                  </div>
                </div>

                {sec.comparison.verdict && (
                  <div
                    className={`rounded-xl p-3 text-[12.5px] sm:text-[13px] leading-relaxed font-medium flex items-center gap-2 border ${
                      isDark
                        ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-500 shrink-0">
                      verified
                    </span>
                    <span>{renderFormattedProse(sec.comparison.verdict, isDark)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Callout if any */}
            {sec.callout && (
              <div
                className={`rounded-2xl p-4 border my-4 flex items-start gap-3 ${
                  sec.callout.type === 'key'
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
                      : 'bg-indigo-50/80 border-indigo-200 text-indigo-900'
                    : isDark
                    ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                    : 'bg-amber-50/80 border-amber-200 text-amber-900'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    sec.callout.type === 'key'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {sec.callout.type === 'key' ? 'lightbulb' : 'info'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-outfit font-bold text-[12px] uppercase tracking-wider mb-1">
                    {sec.callout.title}
                  </h4>
                  <p className="text-[13.5px] leading-[1.65]">
                    {renderFormattedProse(sec.callout.message, isDark)}
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Animated Flow Chart if configured for this topic */}
            {sec.flowChart && (
              <div className="my-5">
                <AnimatedFlowChart
                  isDark={isDark}
                  variant={sec.flowChart.variant}
                  title={sec.flowChart.title}
                  subtitle={sec.flowChart.subtitle}
                  conditionText={sec.flowChart.conditionText}
                  trueLabel={sec.flowChart.trueLabel}
                  falseLabel={sec.flowChart.falseLabel}
                  ifBlockText={sec.flowChart.ifBlockText}
                  elseBlockText={sec.flowChart.elseBlockText}
                  startLabel={sec.flowChart.startLabel}
                  endLabel={sec.flowChart.endLabel}
                  sampleCode={sec.flowChart.sampleCode}
                />
              </div>
            )}
          </article>
        ))}

        {/* ================= COMMON GOTCHAS & PITFALLS ================= */}
        <section
          id="gotchas"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-16 ${
            isDark
              ? 'bg-[#121726] border-white/10 shadow-sm'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200/40 dark:border-white/5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                isDark
                  ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                  : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-500 block mb-0.5">
                COMPILER TRAPS
              </span>
              <h2
                className={`font-outfit text-[19px] sm:text-xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Common Gotchas & How to Avoid Them
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {tutorial.gotchas.map((gotcha, gIdx) => (
              <div
                key={gIdx}
                className={`rounded-xl p-4 border transition-colors ${
                  isDark
                    ? 'bg-slate-900/60 border-white/5'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="material-symbols-outlined text-rose-500 text-[18px] shrink-0 mt-0.5">
                    cancel
                  </span>
                  <div>
                    <h3
                      className={`text-[13.5px] font-outfit font-bold ${
                        isDark ? 'text-rose-300' : 'text-rose-700'
                      }`}
                    >
                      Mistake: {gotcha.mistake}
                    </h3>
                    <p
                      className={`text-[13px] mt-1 leading-[1.62] ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {renderFormattedProse(gotcha.whyItFails, isDark)}
                    </p>
                  </div>
                </div>

                {/* Bad vs Fixed Code Preview */}
                {gotcha.badCode && gotcha.fixedCode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5 font-mono text-[11.5px]">
                    <div
                      className={`rounded-lg p-2.5 border ${
                        isDark
                          ? 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-500 block mb-1">
                        ❌ INCORRECT
                      </span>
                      <pre className="whitespace-pre leading-[1.6]">{gotcha.badCode.join('\n')}</pre>
                    </div>

                    <div
                      className={`rounded-lg p-2.5 border ${
                        isDark
                          ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 block mb-1">
                        ✓ CORRECT
                      </span>
                      <pre className="whitespace-pre leading-[1.6]">{gotcha.fixedCode.join('\n')}</pre>
                    </div>
                  </div>
                )}

                <div
                  className={`mt-2 flex items-center gap-1.5 text-[12.5px] font-medium ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] shrink-0">check_circle</span>
                  <span>{renderFormattedProse(gotcha.correction, isDark)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= QUICK CHEATSHEET ================= */}
        <section
          id="cheatsheet"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-16 ${
            isDark
              ? 'bg-[#121726] border-white/10 shadow-sm'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/40 dark:border-white/5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                isDark
                  ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/50'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bookmark</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-500 block mb-0.5">
                RAPID REFERENCE
              </span>
              <h2
                className={`font-outfit text-[19px] sm:text-xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Topic Cheatsheet & Syntax Table
              </h2>
            </div>
          </div>

          <div className="space-y-2">
            {tutorial.cheatsheet.map((item, cIdx) => (
              <div
                key={cIdx}
                className={`rounded-xl p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-900/60 border-white/5'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isDark
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/60'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.term}
                  </span>
                  <span className="font-mono text-xs text-indigo-500 dark:text-indigo-400 font-semibold">{item.syntax}</span>
                </div>
                <span
                  className={`text-[13px] leading-relaxed sm:text-right ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {renderFormattedProse(item.description, isDark)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE KNOWLEDGE CHECK (QUIZ) ================= */}
        <section
          id="quiz"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-16 ${
            isDark
              ? 'bg-[#121726] border-white/10 shadow-sm'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/40 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isDark
                    ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/50'
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">quiz</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-500 block mb-0.5">
                  SELF-ASSESSMENT
                </span>
                <h2
                  className={`font-outfit text-[19px] sm:text-xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Knowledge Check
                </h2>
              </div>
            </div>

            {answeredQuestionsCount > 0 && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  correctCount === tutorial.quiz.length
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border-white/10'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                Score: {correctCount}/{tutorial.quiz.length}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {tutorial.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl p-4 border transition-colors ${
                    isDark
                      ? 'bg-slate-900/50 border-white/5'
                      : 'bg-slate-50/80 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h3
                      className={`text-[14.5px] font-outfit font-semibold leading-[1.4] ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {renderFormattedProse(q.question, isDark)}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisTheCorrectAnswer = optIdx === q.correctIndex;

                      let optStyles = isDark
                        ? 'bg-slate-800/60 hover:bg-slate-800 border-white/5 text-slate-200'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

                      if (isAnswered) {
                        if (isThisTheCorrectAnswer) {
                          optStyles = isDark
                            ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300 font-medium'
                            : 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                        } else if (isThisSelected) {
                          optStyles = isDark
                            ? 'bg-rose-950/50 border-rose-500/60 text-rose-300 font-medium'
                            : 'bg-rose-50 border-rose-400 text-rose-900 font-medium';
                        } else {
                          optStyles = isDark
                            ? 'bg-slate-900/30 border-white/5 text-slate-500 opacity-60'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isAnswered}
                          onClick={() =>
                            handleSelectQuizOption(q.id, optIdx, q.correctIndex)
                          }
                          className={`w-full text-left p-3 rounded-xl border text-[13px] leading-relaxed transition-all cursor-pointer flex items-center justify-between gap-2 ${optStyles}`}
                        >
                          <span>{renderFormattedProse(opt, isDark)}</span>
                          {isAnswered && (
                            <span>
                              {isThisTheCorrectAnswer ? (
                                <span className="material-symbols-outlined text-emerald-500 text-[18px]">
                                  check_circle
                                </span>
                              ) : isThisSelected ? (
                                <span className="material-symbols-outlined text-rose-500 text-[18px]">
                                  cancel
                                </span>
                              ) : null}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card after answering */}
                  {showExplanations[q.id] && (
                    <div
                      className={`p-3 rounded-xl border text-[12.5px] leading-[1.65] transition-all ${
                        isCorrect
                          ? isDark
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : isDark
                          ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                          : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] mb-1 font-outfit">
                        <span className="material-symbols-outlined text-[14px]">
                          {isCorrect ? 'check' : 'info'}
                        </span>
                        <span>{isCorrect ? 'Correct!' : 'Explanation'}</span>
                      </div>
                      <p>{renderFormattedProse(q.explanation, isDark)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ================= FIXED BOTTOM SECTION TABS ================= */}
      {tutorial.toc && tutorial.toc.length > 0 && (
        <nav
          ref={tabBarRef}
          aria-label="Tutorial Sections"
          className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-[#0a0e17]/95 border-white/10 shadow-lg shadow-black/50'
              : 'bg-[#f8f9fb]/95 border-slate-200 shadow-lg shadow-slate-900/10'
          }`}
        >
          <div className="max-w-2xl mx-auto w-full px-3 sm:px-4 py-2 sm:py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <div
              ref={tabsScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {tutorial.toc.map((item, idx) => {
                const isActive = activeTabId === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-medium font-outfit transition-all cursor-pointer select-none whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? isDark
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-500/25 ring-1 ring-indigo-400/30'
                          : 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {item.id === 'gotchas' && (
                      <span className="material-symbols-outlined text-[13px] text-amber-500">
                        warning
                      </span>
                    )}
                    {item.id === 'cheatsheet' && (
                      <span className="material-symbols-outlined text-[13px] text-indigo-400">
                        bookmark
                      </span>
                    )}
                    {item.id === 'quiz' && (
                      <span className="material-symbols-outlined text-[13px] text-emerald-400">
                        quiz
                      </span>
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

