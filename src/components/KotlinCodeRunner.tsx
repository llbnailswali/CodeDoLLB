import React, { useState } from 'react';
import {
  compileAndRunKotlin,
  KotlinExecutionResult,
} from '../utils/kotlinRunner';
import { soundFX } from '../utils/audio';

export interface KotlinCodeRunnerProps {
  /** The Kotlin program source code to compile and run */
  code: string;
  /** Optional expected output for automated pass/fail verification */
  expectedOutput?: string;
  /** Optional unit test case specification (function invocation & expected output) */
  testCase?: {
    call?: string;
    expected?: string;
  };
  /** Callback fired whenever execution completes (with output or error) */
  onExecutionResult?: (result: KotlinExecutionResult) => void;
  /** Callback fired immediately when running begins */
  onRunStart?: () => void;
  /** Label for the run button (defaults to "RUN CODE") */
  runButtonText?: string;
  /** Dark mode flag */
  isDark?: boolean;
  /** Whether to display the run button (default true) */
  showRunButton?: boolean;
  /** Custom HTML ID for scrolling to the output block */
  outputSectionId?: string;
  /** Optional additional container CSS classes */
  className?: string;
}

/**
 * Common Reusable Kotlin Program Runner Component
 * Compiles and runs Kotlin source code, captures stdout and return values,
 * and renders formatted outputs or detailed syntax/compilation/runtime diagnostics.
 */
export const KotlinCodeRunner: React.FC<KotlinCodeRunnerProps> = ({
  code,
  expectedOutput,
  testCase,
  onExecutionResult,
  onRunStart,
  runButtonText = 'RUN CODE',
  isDark = true,
  showRunButton = true,
  outputSectionId = 'kotlin-runner-output-section',
  className = '',
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [result, setResult] = useState<KotlinExecutionResult | null>(null);

  const handleExecute = async () => {
    soundFX.playClick();
    setIsRunning(true);
    if (onRunStart) {
      onRunStart();
    }

    try {
      // Simulate short compiling stage for tactile feedback
      const execResult = await compileAndRunKotlin(code, {
        testCase,
        expectedOutput,
      });

      setResult(execResult);
      setHasExecuted(true);

      if (execResult.success) {
        soundFX.playSuccess();
      } else {
        soundFX.playError();
      }

      if (onExecutionResult) {
        onExecutionResult(execResult);
      }

      // Smooth scroll to output after a micro-delay
      setTimeout(() => {
        const el = document.getElementById(outputSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err: any) {
      const fallbackResult: KotlinExecutionResult = {
        success: false,
        output: '',
        logs: [],
        error: {
          message: `Execution failed: ${err?.message || 'Unknown error'}`,
          line: 1,
          type: 'runtime_error',
        },
        executionTimeMs: 1,
        exitCode: 1,
      };
      setResult(fallbackResult);
      setHasExecuted(true);
      soundFX.playError();
      if (onExecutionResult) {
        onExecutionResult(fallbackResult);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const isOutputMatching =
    expectedOutput && result?.output
      ? result.output.trim() === expectedOutput.trim()
      : false;

  return (
    <div className={`w-full ${className}`}>
      {/* Run Code Button */}
      {showRunButton && (
        <button
          type="button"
          disabled={isRunning}
          onClick={(e) => {
            e.stopPropagation();
            handleExecute();
          }}
          className={`w-full h-12 rounded-2xl font-bold font-['Outfit'] text-sm shadow-md flex items-center justify-center gap-2 mb-4 transition-all ${
            isRunning
              ? 'bg-indigo-700 text-indigo-200 cursor-wait opacity-80'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white shadow-indigo-600/30 cursor-pointer'
          }`}
        >
          {isRunning ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>COMPILING & RUNNING...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px] filled">
                play_arrow
              </span>
              <span>{runButtonText}</span>
            </>
          )}
        </button>
      )}

      {/* Output & Error Section */}
      {hasExecuted && result && (
        <section
          id={outputSectionId}
          className={`rounded-2xl p-4 border mb-4 animate-fadeIn transition-all ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-white border-slate-200 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Outfit']">
                {result.success ? 'PROGRAM OUTPUT' : 'COMPILER DIAGNOSTICS'}
              </span>
              {result.error?.line && (
                <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
                  Line {result.error.line}
                </span>
              )}
            </div>

            <div>
              {result.success ? (
                isOutputMatching ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[12px]">
                      check_circle
                    </span>
                    Matches Expected
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Exit Code 0
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 font-semibold bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[12px]">
                    error
                  </span>
                  Exit Code 1
                </span>
              )}
            </div>
          </div>

          {/* Error View */}
          {!result.success && result.error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-rose-400 text-[18px] shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs font-bold text-rose-300 break-words">
                    {result.error.message}
                  </div>
                  {result.error.type === 'val_reassignment' && (
                    <div className="text-[11px] text-rose-200/80 mt-1 font-sans">
                      Tip: Variables declared with <code className="font-mono font-bold text-rose-300">val</code> are read-only and immutable. Use <code className="font-mono font-bold text-rose-300">var</code> if you need to reassign or modify values.
                    </div>
                  )}
                  {result.error.type === 'type_mismatch' && (
                    <div className="text-[11px] text-rose-200/80 mt-1 font-sans">
                      Tip: Kotlin enforces static typing. Ensure the value matches the annotated or inferred variable type.
                    </div>
                  )}
                </div>
              </div>

              {/* Code Snippet with Line Highlight */}
              {result.error.codeSnippet && (
                <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-800 font-mono text-xs">
                  <div className="text-slate-500 text-[10px] mb-1">
                    Line {result.error.line}:
                  </div>
                  <div className="text-slate-300">
                    {result.error.codeSnippet}
                  </div>
                  <div className="text-rose-400 font-bold tracking-tighter text-[11px]">
                    ^^^^^^^^^^^^^^^^^^^^
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success View */}
          {result.success && (
            <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800">
              <div className="font-mono text-sm font-semibold tracking-wide text-emerald-400 whitespace-pre-wrap break-words">
                {result.output || (
                  <span className="text-slate-500 italic text-xs">
                    (Program produced no output)
                  </span>
                )}
              </div>

              {/* Output diff helper if expectedOutput provided and doesn't match */}
              {expectedOutput && !isOutputMatching && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/90 flex items-center justify-between gap-2">
                  <span>Expected: &quot;{expectedOutput}&quot;</span>
                  <span className="text-slate-400 text-[10px]">
                    Adjust code to match target
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Execution Time & Diagnostics Footer */}
          <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-slate-500">
            <span className="font-sans">Kotlin 1.9 In-Browser Engine</span>
            <span className="font-mono">
              Executed in {result.executionTimeMs}ms
            </span>
          </div>
        </section>
      )}
    </div>
  );
};
