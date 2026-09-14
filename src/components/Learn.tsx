import React, { useState } from 'react';
import { Stage1LearnData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { FunctionAnimatedExplainer } from './FunctionAnimatedExplainer';

interface LearnStageProps {
  data: Stage1LearnData;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  onContinue: () => void;
  renderSnippetLine: (line: string, isDark: boolean) => React.ReactNode;
  tapToRevealEnabled?: boolean;
  /** Label of whichever stage actually comes next for this lesson (Explore,
   * Predict, etc.) -- stages can be skipped per-lesson, so this must not be
   * hardcoded. Defaults to 'Explore' only as a last-resort fallback. */
  nextStageLabel?: string;
}

// Reveal stages:
// 0: Title only (initial state)
// 1: Subtitle / Concept introduction
// 2: Example Code Card & explanation
// 3 to 2 + keyIdeas.length: Key Idea 1, Key Idea 2, ...
// After key ideas: Key Takeaway (final section revealed, then button is shown)

export const Learn: React.FC<LearnStageProps> = ({
  data,
  isDark,
  revealStep,
  setRevealStep,
  onContinue,
  renderSnippetLine,
  tapToRevealEnabled = true,
  nextStageLabel = 'Explore',
}) => {
  // Total steps = 2 (subtitle + example) + data.keyIdeas.length + 1 (key takeaway)
  const totalKeyIdeas = data.keyIdeas.length;
  const maxRevealStep = 2 + totalKeyIdeas + 1;

  const handleNextReveal = () => {
    if (!tapToRevealEnabled) return;
    soundFX.playClick();
    if (revealStep < maxRevealStep) {
      setRevealStep((prev) => {
        const next = prev + 1;
        // Scroll smoothly to newly revealed content
        setTimeout(() => {
          const rootEl = document.getElementById('root');
          if (rootEl) {
            rootEl.scrollTo({ top: rootEl.scrollHeight, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 60);
        return next;
      });
    }
  };

  const isFullyRevealed = !tapToRevealEnabled || revealStep >= maxRevealStep;

  const isFunctionTopic =
    data.title.toLowerCase().includes('function') ||
    data.subtitle.toLowerCase().includes('function') ||
    data.exampleTitle.toLowerCase().includes('function');

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* 0: Concept Title (Always visible initially) */}
      <div className="pt-1 mb-2">
        <h1
          className={`font-['Outfit'] text-2xl font-semibold tracking-tight mb-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h1>
      </div>

      {/* 1: Concept Subtitle & Brief (Revealed on tap 1 or if tapToReveal is disabled) */}
      {(!tapToRevealEnabled || revealStep >= 1) && (
        <p
          className={`mt-1 text-[15px] leading-relaxed mb-4 transition-all duration-300 animate-fadeIn ${
            isDark ? 'text-[#94a3b8]' : 'text-slate-600'
          }`}
        >
          {data.subtitle}
        </p>
      )}

      {/* 1.5: Animated Explanation of "What is a Function and How It Works" */}
      {isFunctionTopic && (!tapToRevealEnabled || revealStep >= 1) && (
        <div
          className="mb-4 transition-all duration-300 animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <FunctionAnimatedExplainer isDark={isDark} />
        </div>
      )}

      {/* 2: Simple Concept Example Card (Revealed on tap 2 or if tapToReveal is disabled) */}
      {(!tapToRevealEnabled || revealStep >= 2) && (
        <section
          className={`mt-1 mb-5 rounded-2xl p-4 transition-all duration-300 animate-fadeIn ${
            isDark
              ? 'bg-[#171b26] border border-[#262c3d] shadow-sm'
              : 'silk-surface'
          }`}
        >
          {/* Header with clean example title */}
          <div className="flex items-center justify-between mb-3">
            <h2
              className={`font-['Outfit'] text-sm font-semibold tracking-tight ${
                isDark ? 'text-[#f8fafc]' : 'text-slate-800'
              }`}
            >
              {data.exampleTitle}
            </h2>
          </div>

          {/* Code Block */}
          <div
            className={`rounded-xl p-3.5 font-mono text-[13px] leading-relaxed overflow-x-auto ${
              isDark
                ? 'bg-[#0a0e18] border border-[#1e2438] text-slate-200'
                : 'silk-inset text-slate-800'
            }`}
          >
            {data.codeSnippet.map((line, idx) => (
              <div key={idx} className="whitespace-pre">
                {renderSnippetLine(line, isDark)}
              </div>
            ))}
          </div>

          {/* Explanation text */}
          <div
            className={`mt-3 flex items-start gap-2 text-xs leading-relaxed ${
              isDark ? 'text-[#94a3b8]' : 'text-slate-600'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] shrink-0 mt-[-1px] ${
                isDark ? 'text-[#818cf8]' : 'text-indigo-500'
              }`}
            >
              info
            </span>
            <span>{data.explanation}</span>
          </div>
        </section>
      )}

      {/* 3: Key Ideas Section (Revealed one by one on subsequent taps or immediately if tapToReveal is disabled) */}
      {(!tapToRevealEnabled || revealStep >= 3) && (
        <section className="mb-5 transition-all duration-300 animate-fadeIn">
          <h2
            className={`font-['Outfit'] text-xs font-bold tracking-wider uppercase mb-3 px-1 ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            KEY IDEAS
          </h2>
          <div className="space-y-2.5">
            {data.keyIdeas.map((idea, index) => {
              // Idea 0 is shown at revealStep >= 3
              // Idea 1 is shown at revealStep >= 4
              // Idea 2 is shown at revealStep >= 5, etc.
              const ideaStepRequired = 3 + index;
              if (tapToRevealEnabled && revealStep < ideaStepRequired) return null;

              return (
                <div
                  key={idea.number}
                  className={`rounded-xl p-3.5 flex items-start gap-3.5 border transition-all duration-300 animate-fadeIn ${
                    isDark
                      ? 'bg-[#171b26] border-[#262c3d]'
                      : 'silk-surface'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-['Outfit'] font-bold text-xs shrink-0 mt-0.5 shadow-sm ${
                      isDark
                        ? 'bg-indigo-950/80 border border-indigo-700/50 text-indigo-400'
                        : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                    }`}
                  >
                    {idea.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-['Outfit'] text-[14px] font-semibold ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {idea.title}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 leading-normal ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {idea.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Final Section: Key Takeaway Card (Revealed after all key ideas or immediately if tapToReveal is disabled) */}
      {(!tapToRevealEnabled || revealStep >= 3 + totalKeyIdeas) && (
        <section
          className={`rounded-xl p-3.5 flex items-center gap-3 mb-6 border transition-all duration-300 animate-fadeIn ${
            isDark
              ? 'bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-indigo-950/20 border-indigo-500/30'
              : 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/5 border-indigo-200/80'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 shrink-0 ${
              isDark
                ? 'bg-[#171b26] border border-indigo-500/30 text-indigo-400'
                : 'bg-white shadow-sm border border-indigo-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`text-[10px] font-bold font-['Outfit'] uppercase tracking-wider block mb-0.5 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              KEY TAKEAWAY
            </span>
            <p
              className={`text-xs font-semibold leading-snug ${
                isDark ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {data.keyTakeaway}
            </p>
          </div>
        </section>
      )}

      {/* Spacer reserving room below the in-flow content for the fixed bottom bar */}
      <div className="h-24" />

      {/* Bottom Fixed Control: Hint bar during reveal, or Next Stage Button on last step --
          fixed (not sticky) so it stays flush with the screen bottom from the very first tap,
          instead of only reaching the bottom once revealed content grows tall enough. */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 pb-safe pt-1.5 pb-4 transition-all ${
          isDark
            ? 'bg-gradient-to-t from-[#0f131d] via-[#0f131d]/95 to-transparent'
            : 'bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9]/95 to-transparent'
        }`}
      >
      <div className="max-w-md mx-auto px-4">
        {!isFullyRevealed ? (
          /* Subtle Minimalist Tap Hint (Finger icon + short text) positioned nicely above the bottom edge.
              The wrapper (not just the pill) carries the click handler and extra vertical padding so
              taps slightly above/below/left/right of the visible pill still register. */
          <div
            className="flex justify-center w-full py-3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNextReveal();
            }}
          >
            <button
              type="button"
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
          /* Final step: Button to advance to Step 2 (Explore) */
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-['Outfit'] font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to {nextStageLabel}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        )}
      </div>
      </div>
    </div>
  );
};
