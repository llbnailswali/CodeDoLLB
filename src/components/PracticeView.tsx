import React from 'react';
import { AppTheme } from '../types';
import { soundFX } from '../utils/audio';
import { StorageManager } from '../utils/storage';

export type DrillType = 'sprint' | 'battle' | 'inference' | 'conditionals' | 'loops' | 'mistakes' | 'surprise';

interface PracticeViewProps {
  theme: AppTheme;
  onStartDrill: (drillType?: DrillType) => void;
  onOpenCodingChallenge?: (lessonKey: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ theme, onStartDrill }) => {
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

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-2 pb-28 select-none">
      <div className="flex flex-col gap-4 px-4">
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
    </div>
  );
};
