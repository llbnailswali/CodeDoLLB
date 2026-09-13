import React, { useState } from 'react';
import { AppTheme } from '../types';
import { soundFX } from '../utils/audio';
import { StorageManager } from '../utils/storage';

export type DrillType = 'sprint' | 'battle' | 'inference' | 'conditionals' | 'loops' | 'mistakes';

interface PracticeViewProps {
  theme: AppTheme;
  onStartDrill: (drillType?: DrillType) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ theme, onStartDrill }) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'sandbox'>('challenges');
  const [sandboxCode, setSandboxCode] = useState<string>(
    'fun main() {\n    val greeting = "Hello, Android!"\n    val number = 42\n    println("$greeting The answer is $number")\n}'
  );
  const [terminalOutput, setTerminalOutput] = useState<string>('Hello, Android! The answer is 42');
  const [isRunning, setIsRunning] = useState<boolean>(false);

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

  const handleRunCode = () => {
    soundFX.playClick();
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      soundFX.playSuccess();
      setTerminalOutput('Hello, Android! The answer is 42\n[Program executed with exit code 0]');
    }, 400);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 select-none">
      {/* Tab switch */}
      <div className="flex items-center gap-2 mb-4 p-1 rounded-full bg-slate-500/10">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-['Outfit'] text-lg font-bold text-inherit">Live Interactive Kotlin IDE</h3>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-['Outfit'] text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isRunning ? 'sync' : 'play_arrow'}
              </span>
              <span>{isRunning ? 'Running...' : 'Run Snippet'}</span>
            </button>
          </div>

          <div className="w-full rounded-2xl bg-[#0D1322] border border-slate-800 p-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs font-['JetBrains_Mono'] text-slate-400">Scratchpad.kt</span>
              <span className="text-[10px] text-indigo-300 font-['JetBrains_Mono']">Kotlin 1.9.20</span>
            </div>
            <textarea
              value={sandboxCode}
              onChange={(e) => setSandboxCode(e.target.value)}
              rows={6}
              className="w-full bg-transparent font-['JetBrains_Mono'] text-xs text-sky-200 outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="w-full rounded-2xl bg-[#070A12] border border-slate-800/80 p-3 shadow-inner">
            <div className="flex items-center gap-2 mb-1.5 text-slate-400 text-[11px] font-['JetBrains_Mono']">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>Standard Output</span>
            </div>
            <pre className="font-['JetBrains_Mono'] text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {terminalOutput}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
