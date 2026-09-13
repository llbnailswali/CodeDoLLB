import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Stage5DebugData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { compileAndRunKotlin, KotlinExecutionResult } from '../utils/kotlinRunner';

interface DebugStageProps {
  data: Stage5DebugData;
  topicTitle?: string;
  isDark: boolean;
  onContinue: () => void;
}

export const Debug: React.FC<DebugStageProps> = ({
  data,
  topicTitle: _topicTitle,
  isDark,
  onContinue,
}) => {
  const [code, setCode] = useState<string>(data.brokenCode);
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0); // 0: no hints, 1: hint 1, 2: hint 2, 3: hint 3
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
  }, [data]);

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

  const getDifficultyBadge = () => {
    switch (data.difficulty) {
      case 'easy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Easy
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      case 'hard':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Hard
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col animate-fadeIn pb-12">
      {/* Stage Header Info */}
      <section className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <span className="material-symbols-outlined text-[14px]">pest_control</span>
              STEP 5: DEBUG
            </span>
            {getDifficultyBadge()}
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-400">
            Challenge {data.challengeNumber}/{data.totalChallenges}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold font-['Outfit'] tracking-tight mb-1">
          {data.title}
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {data.subtitle}
        </p>
      </section>

      {/* Bug Classification Badge & Diagnosis Banner */}
      <section
        className={`p-3.5 rounded-2xl border mb-4 flex items-start gap-3 transition-colors ${
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

      {/* Target Expected Output Card */}
      <section
        className={`p-3.5 rounded-2xl border mb-4 transition-colors ${
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

      {/* Code Editor Section */}
      <section
        className={`rounded-2xl border overflow-hidden mb-4 transition-colors ${
          isDark
            ? 'bg-[#0f1420] border-white/10 shadow-xl'
            : 'bg-white border-slate-200 shadow-md'
        }`}
      >
        {/* Editor Top Bar */}
        <div
          className={`h-11 px-4 border-b flex items-center justify-between ${
            isDark ? 'bg-[#151b28] border-white/5' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs font-semibold text-slate-400">
              solution.kt (Interactive)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToBrokenCode}
              title="Reset code to initial broken state"
              className={`text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              Reset
            </button>
            <button
              type="button"
              onClick={() => setShowSolutionModal(true)}
              title="Peek at solution"
              className={`text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                isDark
                  ? 'text-indigo-400 hover:bg-indigo-500/10'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              Solution
            </button>
          </div>
        </div>

        {/* Editor Area with Line Numbers */}
        <div className="relative flex p-3 font-mono text-xs">
          <div
            className={`select-none pr-3 text-right text-slate-500 font-mono text-xs leading-[1.625rem] border-r ${
              isDark ? 'border-white/5' : 'border-slate-200'
            }`}
          >
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setIsResolved(false);
            }}
            spellCheck={false}
            className={`w-full pl-3 bg-transparent font-mono text-xs leading-[1.625rem] resize-none outline-none focus:outline-none ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}
          />
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

      {/* Progressive Hint System (Conceptual -> Targeted -> Pinpointed) */}
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
          <span className="text-[11px] font-mono text-slate-400">
            {activeHintLevel}/3 Revealed
          </span>
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

      {/* Bottom Sticky Completion Bar */}
      <div className="pt-3 border-t border-slate-500/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isResolved ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-semibold text-slate-400">
            {isResolved ? 'Ready to Advance' : 'Fix bug to continue'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onContinue();
          }}
          disabled={!isResolved}
          className={`py-3 px-6 rounded-xl font-bold font-['Outfit'] text-sm flex items-center gap-2 transition-all ${
            isResolved
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-95'
              : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Claim Mastery</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
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
