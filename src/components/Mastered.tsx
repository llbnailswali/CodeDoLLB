import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Stage5MasteredData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

interface MasteredStageProps {
  data: Stage5MasteredData;
  stageName: string;
  isDark: boolean;
  onContinue: () => void;
}

export const Mastered: React.FC<MasteredStageProps> = ({
  data,
  stageName,
  isDark,
  onContinue,
}) => {
  const [badgePressed, setBadgePressed] = useState<boolean>(false);

  const fireConfetti = () => {
    soundFX.playSuccess();
    setBadgePressed(true);
    setTimeout(() => setBadgePressed(false), 240);

    try {
      // Main center celebratory cannon burst
      confetti({
        particleCount: 60,
        spread: 75,
        origin: { y: 0.35 },
        colors: isDark
          ? ['#818cf8', '#c084fc', '#34d399', '#fbbf24', '#f472b6']
          : ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ec4899'],
      });

      // Side fountains for celebratory depth
      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 50,
          origin: { x: 0.15, y: 0.45 },
          colors: ['#6366f1', '#a855f7', '#fbbf24', '#34d399'],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 50,
          origin: { x: 0.85, y: 0.45 },
          colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
        });
      }, 180);
    } catch {
      // safe fallback if canvas-confetti is not supported
    }
  };

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center animate-fadeIn pt-2">
      {/* Concept Mastered Heading */}
      <div className="flex flex-col items-center text-center px-3 mb-6">
        <button
          type="button"
          onClick={fireConfetti}
          title="Tap to celebrate with confetti!"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mb-3 border cursor-pointer transition-all duration-200 active:scale-95 ${
            badgePressed ? 'scale-95' : 'hover:scale-105'
          } ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d] text-indigo-400 shadow-sm'
              : 'bg-white neo-raised border-slate-200 text-indigo-600 shadow-sm'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="text-[11px] font-bold tracking-wider uppercase">
            Concept Mastered!
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        </button>
        <h1
          className={`text-2xl font-bold tracking-tight leading-snug mb-2 font-['Outfit'] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.topicTitle}
        </h1>
        <p
          className={`text-xs max-w-[320px] leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {data.summary}
        </p>
      </div>

      {/* Mastery Verification Card */}
      <div
        className={`w-full rounded-xl p-5 mb-5 flex flex-col gap-4 border transition-all ${
          isDark
            ? 'bg-[#171b26] border-[#262c3d]'
            : 'bg-background neo-raised border-slate-200/80'
        }`}
      >
        <div className="flex items-center justify-between pb-1 border-b border-slate-500/10">
          <span
            className={`text-[11px] font-semibold tracking-wider uppercase font-['Outfit'] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Mastery Verification
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
              isDark
                ? 'bg-[#0f131d] text-indigo-400 border border-[#262c3d]'
                : 'bg-background neo-inset text-indigo-600'
            }`}
          >
            {data.passedCount}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {data.verificationItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isDark
                    ? 'bg-[#0f131d] text-indigo-400 border border-[#262c3d]'
                    : 'bg-background neo-inset text-indigo-600'
                }`}
              >
                <span className="material-symbols-outlined text-[17px] filled">check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`text-[11px] leading-tight ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Journey CTA */}
      <div className="w-full pt-2 pb-6">
        <button
          type="button"
          onClick={onContinue}
          className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-['Outfit'] font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/35 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px]">rocket_launch</span>
          <span>Continue Journey</span>
          <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
