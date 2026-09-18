import React, { useState, useEffect, useRef } from 'react';
import { DetailedTutorialData } from '../data/detailedTutorialsData';
import { renderKotlinCodeLines } from '../utils/codeHighlighter';
import { soundFX } from '../utils/audio';
import { AnimatedFlowChart } from './visuals/AnimatedFlowChart';

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

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // Dynamic typography classes based on reader preference
  const proseTextSize = isComfortableSize
    ? 'text-[16.5px] sm:text-[17px] leading-[1.8]'
    : 'text-[15px] sm:text-[15.5px] leading-[1.7]';

  const subtitleTextSize = isComfortableSize
    ? 'text-[16px] sm:text-[17px] leading-[1.75]'
    : 'text-[15px] sm:text-base leading-[1.65]';

  // Track scroll progress for the top bar progress line
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current || document.documentElement;
      const scrollTop = container.scrollTop || window.scrollY;
      const scrollHeight = (container.scrollHeight || document.documentElement.scrollHeight) - (container.clientHeight || window.innerHeight);
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Top Reading Progress Bar (Fixed) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Controls Bar at Top Right */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        {/* Font Size Reading Toggle (Comfortable vs Standard) */}
        <button
          type="button"
          id="detailed-tutorial-font-size-btn"
          onClick={() => {
            soundFX.playClick();
            setIsComfortableSize(!isComfortableSize);
          }}
          className={`h-9 px-2.5 rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-lg backdrop-blur-md font-outfit text-xs font-bold border ${
            isComfortableSize
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-500/25'
              : isDark
              ? 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border-white/20 shadow-black/40'
              : 'bg-white/95 hover:bg-slate-100 text-slate-700 border-slate-300 shadow-slate-400/20'
          }`}
          title={isComfortableSize ? 'Switch to Standard Text' : 'Switch to Large Reading Text'}
          aria-label="Toggle Reading Text Size"
        >
          <span className="text-[11px] tracking-tight">Aa</span>
          <span className="text-[10px] opacity-75">{isComfortableSize ? 'Lg' : 'Sm'}</span>
        </button>

        {/* Floating Close Button */}
        <button
          type="button"
          id="detailed-tutorial-close-btn"
          onClick={() => {
            soundFX.playClick();
            onBack();
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-lg backdrop-blur-md ${
            isDark
              ? 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-white/20 shadow-black/40'
              : 'bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-slate-400/20'
          }`}
          title="Close Tutorial"
          aria-label="Close Tutorial"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Main Content Article Body - Edge-to-Edge reading with zero unnecessary wasted space */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-0 pt-0 pb-10 space-y-3 sm:space-y-4">
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

          <div className="flex flex-wrap items-center gap-2 mb-3 pr-24">
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
            id={`tut-sec-${sec.id}`}
            className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-6 ${
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
          id="tut-sec-gotchas"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-6 ${
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
          id="tut-sec-cheatsheet"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-6 ${
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
          id="tut-sec-quiz"
          className={`px-4 py-4 sm:px-6 sm:py-5 border-y transition-all scroll-mt-6 ${
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
    </div>
  );
};

