import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Stage4WriteRunData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { KotlinCodeRunner } from './KotlinCodeRunner';
import { KotlinExecutionResult } from '../utils/kotlinRunner';

interface WriteRunStageProps {
  data: Stage4WriteRunData;
  topicTitle?: string;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  userCode: string;
  setUserCode: (code: string) => void;
  hasRunCode: boolean;
  setHasRunCode: (hasRun: boolean) => void;
  actualOutput: string;
  setActualOutput?: (output: string) => void;
  onRunCode?: () => void;
  onContinue: () => void;
  /** Label of whichever stage actually comes next for this lesson -- stages
   * can be skipped per-lesson, so this must not be hardcoded. */
  nextStageLabel?: string;
}

// Reveal steps:
// 0: Challenge Title only (initial state)
// 1: Challenge Description & details
// 2: Requirements card
// 3: Code Editor & Execution section (Run Code button is interactive)
const MAX_REVEAL_STEP = 3;

export const WriteRun: React.FC<WriteRunStageProps> = ({
  data,
  topicTitle: _topicTitle,
  isDark,
  revealStep,
  setRevealStep,
  userCode,
  setUserCode,
  hasRunCode,
  setHasRunCode,
  actualOutput: _actualOutput,
  setActualOutput,
  onRunCode,
  onContinue,
  nextStageLabel = 'Debug',
}) => {
  const [executionResult, setExecutionResult] = useState<KotlinExecutionResult | null>(null);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ran without errors AND actually produced the expected output -- required
  // before the user can advance, so a compiling-but-wrong-answer submission
  // doesn't let them skip past the challenge.
  const isOutputCorrect = Boolean(
    executionResult &&
      executionResult.success &&
      data.expectedOutput &&
      (executionResult.output || '').trim() === data.expectedOutput.trim()
  );

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const lines = userCode.split('\n').length;
    // 26px (1.625rem) is the precise line height of text-xs leading-[1.625rem]
    const minHeightBasedOnLines = lines * 26;
    const computedHeight = Math.max(textarea.scrollHeight, minHeightBasedOnLines);
    textarea.style.height = `${computedHeight}px`;
  };

  useLayoutEffect(() => {
    autoResizeTextarea();
  }, [userCode, revealStep]);

  useEffect(() => {
    window.addEventListener('resize', autoResizeTextarea);
    const timer = setTimeout(autoResizeTextarea, 50);
    return () => {
      window.removeEventListener('resize', autoResizeTextarea);
      clearTimeout(timer);
    };
  }, []);

  const scrollToOutput = () => {
    setTimeout(() => {
      const outputEl = document.getElementById('write-run-output-section');
      if (outputEl) {
        outputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const rootEl = document.getElementById('root');
        if (rootEl) {
          rootEl.scrollTo({ top: rootEl.scrollHeight, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }
    }, 80);
  };

  useEffect(() => {
    if (hasRunCode) {
      scrollToOutput();
    }
  }, [hasRunCode]);

  const handleNextReveal = () => {
    soundFX.playClick();
    if (revealStep < MAX_REVEAL_STEP) {
      setRevealStep((prev) => {
        const next = prev + 1;
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

  const isFullyRevealed = revealStep >= MAX_REVEAL_STEP;

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* Challenge Card (Title visible initially; description revealed on tap 1) */}
      <section
        className={`rounded-3xl p-5 border mb-4 shadow-sm transition-all ${
          isDark
            ? 'bg-[#171b26] border-[#262c3d]'
            : 'bg-white border-slate-100 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
        }`}
      >
        <h1
          className={`font-['Outfit'] text-2xl font-semibold mb-1.5 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h1>

        {/* 1: Challenge Description (Revealed on tap 1) */}
        {revealStep >= 1 && (
          <p
            className={`text-xs leading-relaxed transition-all duration-300 animate-fadeIn ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {data.description}
          </p>
        )}
      </section>

      {/* 2: Requirements Card (Revealed on tap 2) */}
      {revealStep >= 2 && (
        <section
          className={`rounded-2xl p-4 border mb-4 transition-all duration-300 animate-fadeIn ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-white border-slate-100 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-3">
            <span className="material-symbols-outlined text-[16px] text-slate-400">
              checklist
            </span>
            <h3 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-['Outfit']">
              REQUIREMENTS
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                NAME
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.name}
              </span>
            </div>
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                PARAMS
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md break-all max-w-[70%] text-right ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.params}
              </span>
            </div>
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                RETURNS
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.returns}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 3: Code Editor & Execution section (Revealed on tap 3) */}
      {revealStep >= 3 && (
        <div className="transition-all duration-300 animate-fadeIn">
          {/* Code Editor Container */}
          <section
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl border bg-slate-950 border-slate-800 shadow-xl mb-4 overflow-hidden"
          >
            {/* Window chrome / tabs */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-6 w-[1px] bg-slate-800 mx-1" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-mono text-xs text-slate-300 font-medium">
                    {data.fileName || 'solution.kt'}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                    {userCode.split('\n').length} lines
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {userCode !== data.initialCode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      setUserCode(data.initialCode);
                      setExecutionResult(null);
                    }}
                    className="text-[11px] font-mono text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
                    title="Reset to initial program code"
                  >
                    <span className="material-symbols-outlined text-[13px]">restart_alt</span>
                    <span>Reset</span>
                  </button>
                )}
                {data.solutionCode && userCode === data.initialCode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      setShowSolutionModal(true);
                    }}
                    className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
                    title="View reference solution code"
                  >
                    <span className="material-symbols-outlined text-[13px]">visibility</span>
                    <span>Solution</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Kotlin 1.9
                </span>
              </div>
            </div>

            {(() => {
              const lines = userCode.split('\n');
              const lineCount = lines.length;
              return (
                <div
                  className="p-4 overflow-x-auto cursor-text bg-slate-950"
                  onClick={() => textareaRef.current?.focus()}
                >
                  <div className="flex gap-3 min-w-full w-max">
                    {/* Line Numbers column, perfectly aligned with content height */}
                    <div
                      className="font-mono text-xs text-slate-600 select-none text-right flex flex-col leading-[1.625rem] shrink-0 min-w-[1.5rem]"
                      aria-hidden="true"
                    >
                      {Array.from({ length: lineCount }).map((_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>

                    {/* Auto-expanding Code Area - shows full program content at once */}
                    <div className="flex-1 font-mono text-xs leading-[1.625rem] text-slate-200 min-w-0">
                      <textarea
                        ref={textareaRef}
                        wrap="off"
                        value={userCode}
                        onChange={(e) => {
                          setUserCode(e.target.value);
                          setExecutionResult(null);
                          autoResizeTextarea();
                        }}
                        onInput={autoResizeTextarea}
                        className="w-full bg-transparent border-0 outline-none text-indigo-300 font-mono text-xs leading-[1.625rem] resize-none p-0 focus:ring-0 overflow-y-hidden overflow-x-hidden block whitespace-pre"
                        spellCheck={false}
                      />
                      <div className="text-slate-500 italic text-[11px] pt-2 select-none">
                        // Ready to execute &bull; Click to edit program
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Reusable Common Kotlin Program Runner */}
          <KotlinCodeRunner
            code={userCode}
            expectedOutput={data.expectedOutput}
            testCase={data.testCase}
            isDark={isDark}
            outputSectionId="write-run-output-section"
            onExecutionResult={(res) => {
              setHasRunCode(true);
              setExecutionResult(res);
              if (setActualOutput) {
                setActualOutput(res.output);
              }
              if (onRunCode) {
                onRunCode();
              }
              scrollToOutput();
            }}
          />
        </div>
      )}

      {/* Spacer reserving room below the in-flow content for the fixed bottom bar */}
      <div className="h-24" />

      {/* Next Challenge / Stage CTA or Minimalist Tap Hint -- fixed (not sticky) so it stays
          flush with the screen bottom from the very first tap, instead of drifting down as
          content grows. */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 pb-safe pt-1.5 pb-4 transition-all ${
          isDark
            ? 'bg-gradient-to-t from-[#0f131d] via-[#0f131d]/95 to-transparent'
            : 'bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9]/95 to-transparent'
        }`}
      >
      <div className="max-w-md mx-auto px-4">
        {!isFullyRevealed ? (
          /* Subtle Minimalist Tap Hint (Finger icon + short text) positioned nicely above bottom edge.
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
        ) : !executionResult ? (
          /* User hasn't run the code yet -- must run it before advancing */
          <div className="w-full h-14 rounded-2xl bg-slate-800/60 border border-slate-700 text-slate-300 font-bold font-['Outfit'] text-sm flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Run your code to continue</span>
          </div>
        ) : !executionResult.success ? (
          /* When there is an active compilation/runtime error, instruct user to fix */
          <div className="w-full h-14 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-rose-300 font-bold font-['Outfit'] text-sm flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>Fix error above to continue</span>
          </div>
        ) : !isOutputCorrect ? (
          /* Ran successfully but output doesn't match what's expected yet */
          <div className="w-full h-14 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-300 font-bold font-['Outfit'] text-sm flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined text-[18px]">rule</span>
            <span>Output doesn't match yet -- keep debugging</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold font-['Outfit'] text-sm shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to {nextStageLabel}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        )}
      </div>
      </div>

      {/* Reference Solution Modal */}
      {showSolutionModal && data.solutionCode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl transition-colors ${
              isDark ? 'bg-[#151b28] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base font-['Outfit'] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-indigo-500">
                  check_circle
                </span>
                Reference Solution
              </h3>
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Here is the reference solution for this challenge:
            </p>

            <div
              className={`p-3 rounded-xl font-mono text-xs overflow-x-auto mb-4 ${
                isDark ? 'bg-[#090d16] text-slate-200' : 'bg-slate-100 text-slate-900'
              }`}
            >
              <pre>{data.solutionCode}</pre>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                  isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playSuccess();
                  setUserCode(data.solutionCode);
                  setExecutionResult(null);
                  setShowSolutionModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Apply to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
