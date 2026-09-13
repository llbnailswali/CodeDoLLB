import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Stage5DebugData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { compileAndRunKotlin, KotlinExecutionResult } from '../utils/kotlinRunner';

interface DebugStageProps {
  data: Stage5DebugData;
  topicTitle?: string;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  tapToRevealEnabled?: boolean;
  onContinue: () => void;
}

// Reveal steps:
// 0: Title only (initial state)
// 1: Bug diagnosis banner
// 2: Target expected output card
// 3: Code editor & run/hint tools (interactive stage)
const MAX_REVEAL_STEP = 3;

export const Debug: React.FC<DebugStageProps> = ({
  data,
  topicTitle: _topicTitle,
  isDark,
  revealStep,
  setRevealStep,
  tapToRevealEnabled = true,
  onContinue,
}) => {
  const [code, setCode] = useState<string>(data.brokenCode);
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0); // 0: no hints, 1: hint 1, 2: hint 2, 3: hint 3
  const [showHintPanel, setShowHintPanel] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<KotlinExecutionResult | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Re-initialize if data changes
  useEffect(() => {
    setCode(data.brokenCode);
    setActiveHintLevel(0);
    setExecutionResult(null);
    setIsResolved(false);
    setShowHintPanel(false);
    setRevealStep(0);
  }, [data]);

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

  const isFullyRevealed = !tapToRevealEnabled || revealStep >= MAX_REVEAL_STEP;

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const lines = code.split('\n').length;
    const minHeightBasedOnLines = lines * 26;
    const computedHeight = Math.max(textarea.scrollHeight, minHeightBasedOnLines, 140);
    textarea.style.height = `${computedHeight}px`;
  };

  useLayoutEffect(() => {
    autoResizeTextarea();
  }, [code]);

  useEffect(() => {
    window.addEventListener('resize', autoResizeTextarea);
    const timer = setTimeout(autoResizeTextarea, 50);
    return () => {
      window.removeEventListener('resize', autoResizeTextarea);
      clearTimeout(timer);
    };
  }, []);

  const handleRevealNextHint = () => {
    soundFX.playClick();
    if (activeHintLevel < 3) {
      setActiveHintLevel((prev) => prev + 1);
    }
  };

  const handleResetToBrokenCode = () => {
    soundFX.playClick();
    setCode(data.brokenCode);
    setExecutionResult(null);
    setIsResolved(false);
  };

  const handleTestAndRun = async () => {
    soundFX.playClick();
    setIsRunning(true);
    setExecutionResult(null);

    try {
      const result = await compileAndRunKotlin(code, {
        expectedOutput: data.expectedOutput,
      });
      setExecutionResult(result);

      // Check if output matches expected or success criteria
      const trimmedOutput = (result.output || '').trim();
      const expected = (data.expectedOutput || '').trim();

      const outputMatches = trimmedOutput.includes(expected) || trimmedOutput === expected;
      const noErrors = result.success && !result.error;

      if (noErrors && outputMatches) {
        soundFX.playSuccess();
        setIsResolved(true);
      } else {
        soundFX.playError();
        setIsResolved(false);
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        output: '',
        logs: [],
        error: {
          message: err?.message || 'Execution failed. Please verify syntax and structure.',
          line: 1,
          type: 'runtime_error',
        },
        executionTimeMs: 0,
        exitCode: 1,
      });
      soundFX.playError();
      setIsResolved(false);
    } finally {
      setIsRunning(false);
      setTimeout(() => {
        const outputEl = document.getElementById('debug-result-section');
        if (outputEl) {
          outputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleApplySolution = () => {
    soundFX.playClick();
    setCode(data.fixedCode);
    setShowSolutionModal(false);
  };

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] animate-fadeIn pb-12 select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* Stage Header Info */}
      <section className="mb-4">
        <h1 className="text-2xl font-extrabold font-['Outfit'] tracking-tight mb-1">
          {data.title}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {data.subtitle}
        </p>
      </section>

      {/* Bug Classification Badge & Diagnosis Banner (Revealed on tap 1) */}
      {revealStep >= 1 && (
      <section
        className={`p-3.5 rounded-2xl border mb-4 flex items-start gap-3 transition-colors animate-fadeIn ${
          isDark
            ? 'bg-rose-950/20 border-rose-500/20 text-slate-200'
            : 'bg-rose-50 border-rose-200 text-slate-800'
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">bug_report</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400">
              {data.bugLabel}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-[11px] text-slate-400">Find & fix the flaw</span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            This code contains an intentional defect. Inspect the logic, correct the code, and run it to verify the expected behavior.
          </p>
        </div>
      </section>
      )}

      {/* Target Expected Output Card (Revealed on tap 2) */}
      {revealStep >= 2 && (
      <section
        className={`p-3.5 rounded-2xl border mb-4 transition-colors animate-fadeIn ${
          isDark ? 'bg-[#151b28] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Target Expected Output
          </span>
          <span className="text-[10px] font-mono text-indigo-500 font-semibold">
            Success Criterion
          </span>
        </div>
        <div
          className={`px-3 py-2 rounded-xl font-mono text-xs ${
            isDark ? 'bg-[#090d16] text-emerald-400' : 'bg-slate-100 text-emerald-700'
          }`}
        >
          {data.expectedOutput}
        </div>
      </section>
      )}

      {/* Code Editor Section (Revealed on tap 3) -- matches Stage 4 (WriteRun)'s always-dark terminal window */}
      {revealStep >= 3 && (
      <>
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
                solution.kt
              </span>
              <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                {code.split('\n').length} lines
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {code !== data.brokenCode && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetToBrokenCode();
                }}
                className="text-[11px] font-mono text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
                title="Reset to initial broken code"
              >
                <span className="material-symbols-outlined text-[13px]">restart_alt</span>
                <span>Reset</span>
              </button>
            )}
            {code === data.brokenCode && (
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

        {/* Editor Area with Line Numbers */}
        <div
          className="p-4 overflow-x-auto cursor-text bg-slate-950"
          onClick={() => textareaRef.current?.focus()}
        >
          <div className="flex gap-3 min-w-full w-max">
            <div
              className="font-mono text-xs text-slate-600 select-none text-right flex flex-col leading-[1.625rem] shrink-0 min-w-[1.5rem]"
              aria-hidden="true"
            >
              {code.split('\n').map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              wrap="off"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setIsResolved(false);
              }}
              spellCheck={false}
              className="flex-1 bg-transparent border-0 outline-none text-indigo-300 font-mono text-xs leading-[1.625rem] resize-none p-0 focus:ring-0 overflow-y-hidden overflow-x-hidden block whitespace-pre min-w-0"
            />
          </div>
        </div>
      </section>

      {/* Action Buttons: Run & Diagnose */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={handleTestAndRun}
          disabled={isRunning}
          className={`flex-1 py-3 px-4 rounded-xl font-bold font-['Outfit'] text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
            isResolved
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              Executing fix...
            </>
          ) : isResolved ? (
            <>
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Bug Fixed & Verified!
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Run & Verify Fix
            </>
          )}
        </button>
      </div>

      {/* Progressive Hint System (Conceptual -> Targeted -> Pinpointed) -- collapsed
          behind a hint icon by default so it doesn't clutter the debug view up front. */}
      {!showHintPanel ? (
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setShowHintPanel(true);
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border mb-5 font-bold text-xs transition-colors ${
            isDark
              ? 'bg-[#151b28] border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
              : 'bg-white border-amber-200 text-amber-700 shadow-sm hover:bg-amber-50'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          Need a hint?
          {activeHintLevel > 0 && (
            <span className="text-[11px] font-mono text-slate-400">
              ({activeHintLevel}/3 revealed)
            </span>
          )}
        </button>
      ) : (
      <section
        className={`p-4 rounded-2xl border mb-5 transition-colors ${
          isDark ? 'bg-[#151b28] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-500">
              lightbulb
            </span>
            <h2 className="text-sm font-bold font-['Outfit']">Progressive Hints</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              {activeHintLevel}/3 Revealed
            </span>
            <button
              type="button"
              aria-label="Hide hints"
              onClick={() => {
                soundFX.playClick();
                setShowHintPanel(false);
              }}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        {activeHintLevel === 0 ? (
          <p className="text-xs text-slate-400 mb-3">
            Need a clue? Reveal hints progressively without spoiling the solution.
          </p>
        ) : (
          <div className="space-y-2.5 mb-3">
            {/* Hint 1: Conceptual Clue */}
            {activeHintLevel >= 1 && (
              <div
                className={`p-3 rounded-xl border text-xs animate-fadeIn ${
                  isDark
                    ? 'bg-amber-950/20 border-amber-500/20 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="font-mono font-bold text-[10px] uppercase text-amber-500 mb-1">
                  💡 Hint 1 — Conceptual Clue
                </div>
                <div>{data.hints[0]}</div>
              </div>
            )}

            {/* Hint 2: Narrow the Reasoning */}
            {activeHintLevel >= 2 && (
              <div
                className={`p-3 rounded-xl border text-xs animate-fadeIn ${
                  isDark
                    ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-200'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                }`}
              >
                <div className="font-mono font-bold text-[10px] uppercase text-indigo-500 mb-1">
                  💡 Hint 2 — Targeted Reasoning
                </div>
                <div>{data.hints[1]}</div>
              </div>
            )}

            {/* Hint 3: Pinpointed Direction */}
            {activeHintLevel >= 3 && (
              <div
                className={`p-3 rounded-xl border text-xs animate-fadeIn ${
                  isDark
                    ? 'bg-purple-950/20 border-purple-500/20 text-purple-200'
                    : 'bg-purple-50 border-purple-200 text-purple-900'
                }`}
              >
                <div className="font-mono font-bold text-[10px] uppercase text-purple-500 mb-1">
                  🔎 Final Hint — Pinpointed Direction
                </div>
                <div>{data.hints[2]}</div>
              </div>
            )}
          </div>
        )}

        {activeHintLevel < 3 && (
          <button
            type="button"
            onClick={handleRevealNextHint}
            className={`w-full py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${
              isDark
                ? 'bg-[#0f1420] border-amber-500/30 text-amber-400 hover:bg-amber-500/10'
                : 'bg-amber-50/60 border-amber-200 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
            Reveal Hint {activeHintLevel + 1} of 3
          </button>
        )}
      </section>
      )}

      {/* Execution Result Banner */}
      {executionResult && (
        <section
          id="debug-result-section"
          className={`p-4 rounded-2xl border mb-6 transition-all animate-fadeIn ${
            isResolved
              ? isDark
                ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                : 'bg-emerald-50 border-emerald-300 text-slate-800'
              : isDark
              ? 'bg-rose-950/30 border-rose-500/40 text-slate-200'
              : 'bg-rose-50 border-rose-300 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`material-symbols-outlined text-[20px] ${
                isResolved ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {isResolved ? 'check_circle' : 'cancel'}
            </span>
            <h3 className="font-bold text-sm font-['Outfit']">
              {isResolved ? 'Bug Resolved Successfully!' : 'Not Quite Fixed Yet'}
            </h3>
          </div>

          <div className="text-xs mb-2">
            {isResolved ? (
              <p className="leading-relaxed text-emerald-600 dark:text-emerald-400 font-medium">
                {data.explanation}
              </p>
            ) : (
              <p className="leading-relaxed opacity-90">
                The code executed, but the output does not yet match the target output. Review the hint or inspect the operator/variable logic again.
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-xl font-mono text-xs overflow-x-auto ${
              isDark ? 'bg-[#090d16]' : 'bg-slate-900 text-slate-100'
            }`}
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Program Output
            </div>
            <pre>
              {executionResult.error
                ? `Line ${executionResult.error.line}: ${executionResult.error.message}`
                : executionResult.output || '(no output produced)'}
            </pre>
          </div>
        </section>
      )}
      </>
      )}

      {/* Spacer reserving room below the in-flow content for the fixed bottom bar */}
      <div className="h-24" />

      {/* Bottom CTA / Tap Hint -- fixed (not sticky) so it stays flush with the screen
          bottom from the very first tap, consistent with all other stages. */}
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
        ) : (
          <button
            type="button"
            disabled={!isResolved}
            onClick={(e) => {
              e.stopPropagation();
              if (isResolved) {
                soundFX.playClick();
                onContinue();
              }
            }}
            className={`w-full h-14 rounded-2xl font-['Outfit'] font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isResolved
                ? 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white shadow-lg shadow-emerald-600/35 cursor-pointer animate-fadeIn'
                : isDark
                ? 'bg-[#171b26] border border-[#262c3d] text-slate-500 cursor-not-allowed opacity-60'
                : 'bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
            }`}
          >
            <span>{isResolved ? 'Claim Mastery' : 'Fix the bug to continue'}</span>
            <span className="material-symbols-outlined text-[18px]">
              {isResolved ? 'arrow_forward' : 'lock'}
            </span>
          </button>
        )}
      </div>
      </div>

      {/* Solution Modal */}
      {showSolutionModal && (
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
                Correct Solution
              </h3>
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Here is the corrected code that resolves the defect:
            </p>

            <div
              className={`p-3 rounded-xl font-mono text-xs overflow-x-auto mb-4 ${
                isDark ? 'bg-[#090d16] text-slate-200' : 'bg-slate-100 text-slate-900'
              }`}
            >
              <pre>{data.fixedCode}</pre>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${
                  isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleApplySolution}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
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
