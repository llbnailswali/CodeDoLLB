import React, { useState } from 'react';
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

  const handleBadgeTap = () => {
    soundFX.playSuccess();
    setBadgePressed(true);
    setTimeout(() => setBadgePressed(false), 240);
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn pt-1">
      {/* Mastery Status Row */}
      <div className="w-full flex items-center justify-between gap-3 mb-5 px-1">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-background neo-inset border-transparent'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]"></span>
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 tracking-wide uppercase">
            Mastery
          </span>
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-background neo-raised border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[14px] filled">
            verified
          </span>
          <span
            className={`text-[10px] font-semibold tracking-widest uppercase ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Completed
          </span>
        </div>
      </div>

      {/* Mastery Celebration Visual with Concentric Soft Neumorphic Rings */}
      <div className="relative w-full flex flex-col items-center justify-center py-5 mb-3">
        <div className="relative flex items-center justify-center">
          <div
            className={`w-48 h-48 rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-[#171b26] border border-[#262c3d] shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                : 'bg-[#e8eaf0] neo-raised'
            }`}
          >
            <div
              className={`w-36 h-36 rounded-full flex items-center justify-center ${
                isDark
                  ? 'bg-[#0f131d] border border-[#262c3d]'
                  : 'bg-[#e8eaf0] neo-inset'
              }`}
            >
              <div
                onClick={handleBadgeTap}
                role="button"
                tabIndex={0}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 ${
                  badgePressed ? 'scale-90' : 'hover:scale-105 active:scale-95'
                } ${
                  isDark
                    ? 'bg-[#171b26] border border-[#262c3d] shadow-[0_0_24px_rgba(99,102,241,0.4)]'
                    : 'bg-[#e8eaf0] neo-raised'
                }`}
              >
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[42px] filled">
                  workspace_premium
                </span>
                <div
                  className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center border ${
                    isDark
                      ? 'bg-[#171b26] border-[#262c3d] text-purple-400'
                      : 'bg-[#e8eaf0] neo-raised text-purple-600 border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Mastered Heading */}
      <div className="flex flex-col items-center text-center px-3 mb-6">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2.5 border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d] text-indigo-400'
              : 'bg-background neo-raised border-transparent text-indigo-600'
          }`}
        >
          <span className="material-symbols-outlined text-[15px] filled">check_circle</span>
          <span className="text-[11px] font-bold tracking-wider uppercase">
            Concept Mastered!
          </span>
        </div>
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

      {/* Achievement Statistics Row */}
      <div className="grid grid-cols-3 gap-3 w-full mb-6">
        <div
          className={`rounded-xl p-3 flex flex-col items-center text-center border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-background neo-raised border-slate-200/80'
          }`}
        >
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            +{data.xpEarned} XP
          </span>
          <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 font-['Outfit']">
            Earned
          </span>
        </div>

        <div
          className={`rounded-xl p-3 flex flex-col items-center text-center border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-background neo-raised border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[15px] filled">
              local_fire_department
            </span>
            <span
              className={`text-base font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}
            >
              {data.streakDays} Days
            </span>
          </div>
          <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 font-['Outfit']">
            Streak
          </span>
        </div>

        <div
          className={`rounded-xl p-3 flex flex-col items-center text-center border ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-background neo-raised border-slate-200/80'
          }`}
        >
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            {data.accuracy}
          </span>
          <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 font-['Outfit']">
            Accuracy
          </span>
        </div>
      </div>

      {/* Continue Journey CTA */}
      <div className="w-full pt-1 pb-6">
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
