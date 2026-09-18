import React, { useLayoutEffect, useRef, useState } from 'react';
import { AppTheme } from '../types';
import { soundFX } from '../utils/audio';
import { StorageManager } from '../utils/storage';
import { runKotlinCode, KotlinExecutionResult } from '../utils/kotlinRunner';
import { renderVisibleWhitespace } from '../utils/outputDisplay';
import { KotlinCodeEditor } from './ide/KotlinCodeEditor';

export type DrillType = 'sprint' | 'battle' | 'inference' | 'conditionals' | 'loops' | 'mistakes';

interface PracticeViewProps {
  theme: AppTheme;
  onStartDrill: (drillType?: DrillType) => void;
  onOpenCodingChallenge?: (lessonKey: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ theme, onStartDrill, onOpenCodingChallenge }) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'sandbox'>('challenges');
  const [sandboxCode, setSandboxCode] = useState<string>(
    'fun main() {\n    val greeting = "Hello, Android!"\n    val number = 42\n    println("$greeting The answer is $number")\n}'
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<KotlinExecutionResult | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Stretch the scratchpad editor down to the bottom of the visible screen
  // (clearing the fixed bottom Navigation bar) instead of using a fixed
  // pixel height, so its own sticky keyboard sits at the true screen bottom.
  const sandboxWrapperRef = useRef<HTMLDivElement>(null);
  const [sandboxHeight, setSandboxHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (activeTab !== 'sandbox') return;

    const NAV_CLEARANCE_PX = 64; // Navigation bar's h-16

    const recompute = () => {
      const el = sandboxWrapperRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setSandboxHeight(Math.max(240, window.innerHeight - top - NAV_CLEARANCE_PX));
    };

    recompute();
    window.addEventListener('resize', recompute);
    window.addEventListener('orientationchange', recompute);
    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('orientationchange', recompute);
    };
  }, [activeTab]);

  const mistakes = StorageManager.getMistakes();

  const practiceDrills: {
    type: DrillType;
    title: string;
    desc: string;
    xp: string;
    time: string;
    icon: string;
    color: string;
    questionsCount: number;
  }[] = [
    {
      type: 'battle',
      title: 'Daily Battle Arena (10Q)',
      desc: 'Rapid-fire 10-question speed gauntlet',
      xp: '+150 XP',
      time: '5 min',
      icon: 'swords',
      color: 'from-rose-500 via-red-600 to-amber-500',
      questionsCount: 10,
    },
    {
      type: 'sprint',
      title: 'Daily Code Sprint',
      desc: '3 rapid-fire Kotlin syntax checks',
      xp: '+50 XP',
      time: '2 min',
      icon: 'bolt',
      color: 'from-amber-500 to-orange-500',
      questionsCount: 3,
    },
    {
      type: 'inference',
      title: 'Type Inference & Null Safety',
      desc: 'Master val, nullability (?.), and Elvis (?:)',
      xp: '+60 XP',
      time: '3 min',
      icon: 'psychology',
      color: 'from-indigo-500 to-purple-600',
      questionsCount: 5,
    },
    {
      type: 'conditionals',
      title: 'Conditionals Gauntlet',
      desc: 'when expressions, boolean logic, and if values',
      xp: '+60 XP',
      time: '4 min',
      icon: 'tune',
      color: 'from-cyan-500 to-teal-500',
      questionsCount: 4,
    },
    {
      type: 'loops',
      title: 'Loop & Range Drills',
      desc: '1..5, until, downTo, and step intervals',
      xp: '+70 XP',
      time: '4 min',
      icon: 'all_inclusive',
      color: 'from-emerald-500 to-teal-600',
      questionsCount: 3,
    },
  ];

  const handleRunCode = async () => {
    soundFX.playClick();
    setIsRunning(true);
    const result = await runKotlinCode(sandboxCode);
    setIsRunning(false);
    setLastResult(result);
    setShowResultModal(true);
    if (result.success) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
  };

  return (
    <div
      className={`flex flex-col w-full max-w-md mx-auto pt-2 select-none ${
        activeTab === 'sandbox' ? 'pb-0' : 'pb-28'
      }`}
    >
      {/* Tab switch */}
      <div className="flex items-center gap-2 mb-4 p-1 rounded-full bg-slate-500/10 mx-4">
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('challenges');
          }}
          className={`flex-1 py-2 rounded-full font-['Outfit'] text-xs font-bold transition-all ${
            activeTab === 'challenges'
              ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm text-[#3748dd]'
              : 'text-slate-400'
          }`}
        >
          Target Practice
        </button>
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('sandbox');
          }}
          className={`flex-1 py-2 rounded-full font-['Outfit'] text-xs font-bold transition-all ${
            activeTab === 'sandbox'
              ? theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm text-[#3748dd]'
              : 'text-slate-400'
          }`}
        >
          Kotlin Scratchpad
        </button>
      </div>

      {activeTab === 'challenges' ? (
        <div className="flex flex-col gap-4 px-4">
          {/* Featured Challenge: Mobile Coding IDE Section */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border-indigo-500/40 shadow-lg'
                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                <span className="material-symbols-outlined text-[24px]">terminal</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[10px] font-bold">
                    NEW CODING SECTION
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-400">+10 XP</span>
                </div>
                <h4 className="font-['Outfit'] text-sm font-bold text-inherit mt-0.5">
                  Multiply Two Numbers
                </h4>
                <p className="font-['Outfit'] text-xs text-slate-400">
                  Precision Kotlin IDE with syntax highlighting &amp; mobile keyboard
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                if (onOpenCodingChallenge) {
                  onOpenCodingChallenge('functions');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-['Outfit'] text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              <span>Code</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Header & Arena Timer */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-['Outfit'] text-[11px] font-bold text-amber-500 tracking-wider uppercase">
                ARENA DRILLS & BATTLES
              </span>
              <h2 className="font-['Outfit'] text-2xl font-bold tracking-tight text-inherit">
                Daily Coding Arena
              </h2>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">timer</span>
              <span>Resets daily</span>
            </div>
          </div>

          {/* Mistakes Review Prompt if user has logged mistakes */}
          {mistakes.length > 0 && (
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                theme === 'dark'
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : 'bg-rose-50 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                  <span className="material-symbols-outlined">restart_alt</span>
                </div>
                <div>
                  <h4 className="font-['Outfit'] text-sm font-bold text-rose-400">
                    Mistakes Review Bank ({mistakes.length})
                  </h4>
                  <p className="font-['Outfit'] text-xs text-slate-400">
                    Revisit tricky questions to cement your memory
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onStartDrill('mistakes');
                }}
                className="px-3 py-1.5 rounded-full bg-rose-500 text-white font-['Outfit'] text-xs font-bold active:scale-95 shadow-md"
              >
                Review
              </button>
            </div>
          )}

          {/* Drill Cards */}
          <div className="flex flex-col gap-3">
            {practiceDrills.map((drill) => (
              <div
                key={drill.type}
                className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
                  theme === 'dark' ? 'dark-glass-card' : 'bg-white neumorph-raised'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${drill.color} flex items-center justify-center text-white shadow-md shrink-0`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{drill.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-['Outfit'] text-base font-bold text-inherit">
                        {drill.title}
                      </h4>
                    </div>
                    <p className="font-['Outfit'] text-xs text-slate-400">{drill.desc}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-amber-400">
                        {drill.xp}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="font-['Outfit'] text-[11px] text-slate-400">
                        {drill.questionsCount} questions
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="font-['Outfit'] text-[11px] text-slate-400">
                        {drill.time}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    onStartDrill(drill.type);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform shrink-0 ml-2 ${
                    theme === 'dark'
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                      : 'bg-[#3748dd] text-white shadow-md'
                  }`}
                  title={`Start ${drill.title}`}
                >
                  <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Kotlin Scratchpad Playground */
        <div ref={sandboxWrapperRef} className="flex flex-col" style={{ height: sandboxHeight ?? undefined }}>
          <div
            className="w-full flex-1 min-h-0 rounded-2xl bg-[#0D1322] border border-slate-800 shadow-xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 shrink-0">
              <span className="text-xs font-['JetBrains_Mono'] text-slate-400">Scratchpad.kt</span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-['Outfit'] text-xs font-bold flex items-center gap-1 shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isRunning ? 'sync' : 'play_arrow'}
                </span>
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
              <KotlinCodeEditor
                code={sandboxCode}
                onCodeChange={setSandboxCode}
                onRunRequested={handleRunCode}
                isDark={theme === 'dark'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scratchpad Run Result Modal (freeform: no expected-output grading, just what it printed) */}
      {showResultModal && lastResult && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setShowResultModal(false)}
        >
          <div
            className="w-full max-w-[372px] mx-auto rounded-2xl border border-slate-700/80 bg-[#121622] p-5 text-slate-100 shadow-2xl animate-scaleUp max-h-[82vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {lastResult.success ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 font-mono text-[10.5px] font-bold border border-emerald-700/50 flex items-center gap-1">
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>RAN SUCCESSFULLY</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-rose-950/90 text-rose-300 font-mono text-[10.5px] font-bold border border-rose-700/50 flex items-center gap-1">
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>RUN FAILED</span>
                  </span>
                )}
                <span className="text-slate-500 text-xs">·</span>
                <span className="font-mono text-xs text-slate-400 font-medium">{lastResult.executionTimeMs || 12}ms</span>
              </div>
              <button
                type="button"
                aria-label="Close run result"
                onClick={() => setShowResultModal(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="my-3.5">
              <div className="flex items-center gap-2 mb-1.5 text-slate-400 text-[11px] font-['JetBrains_Mono']">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                <span>Standard Output</span>
              </div>
              <pre className="p-3 rounded-xl bg-[#090d16] border border-slate-800 font-['JetBrains_Mono'] text-xs text-emerald-400 whitespace-nowrap overflow-x-auto">
                {lastResult.output ? renderVisibleWhitespace(lastResult.output) : '(no output)'}
              </pre>
              {!lastResult.success && lastResult.error && (
                <p className="mt-2 text-xs text-rose-300 leading-relaxed">{lastResult.error.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium active:scale-95 transition-all cursor-pointer"
              >
                Back to Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
