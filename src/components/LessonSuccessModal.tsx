import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AppTheme, LessonQuestion } from '../types';
import { ROBOT_MASCOT_URL } from '../data/curriculumData';
import { soundFX } from '../utils/audio';

interface LessonSuccessModalProps {
  theme: AppTheme;
  question: LessonQuestion;
  onContinue: () => void;
  earnedXP: number;
  streak: number;
}

export const LessonSuccessModal: React.FC<LessonSuccessModalProps> = ({
  theme,
  question,
  onContinue,
  earnedXP,
  streak,
}) => {
  useEffect(() => {
    soundFX.playSuccess();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: theme === 'dark' 
          ? ['#10b981', '#34d399', '#38bdf8', '#f59e0b', '#fbbf24', '#c084fc']
          : ['#3748dd', '#825100', '#10b981', '#f59e0b', '#7a5aed']
      });
    } catch {
      // Fallback to css confetti in dom
    }
  }, [theme]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden">
      {/* Scrim Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-black/40 via-[#0a0e18]/85 to-[#0a0e18]'
          : 'bg-gradient-to-b from-black/10 via-[#f8f9fb]/80 to-[#f8f9fb]'
      }`} />

      {/* Decorative Confetti Elements */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-[28%] left-[12%] w-3 h-3 rounded-full bg-amber-400 shadow-sm animate-bounce" />
        <div className="absolute top-[24%] right-[16%] w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div className="absolute top-[32%] right-[28%] w-3.5 h-2 rounded-sm bg-indigo-500 rotate-45 opacity-85" />
        <div className="absolute top-[38%] left-[20%] w-2.5 h-2.5 rounded-full bg-purple-500 opacity-75" />
        <div className="absolute top-[34%] left-[78%] w-3 h-3 rounded-full bg-amber-300 opacity-80" />
        <div className="absolute top-[44%] right-[10%] w-3.5 h-3.5 rounded-sm bg-emerald-300 rotate-12 opacity-70" />
      </div>

      {/* Celebratory Mascot Robot vignette slot */}
      <div className="w-full flex justify-center -mb-8 z-30 relative pointer-events-none">
        <div
          className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-[#131d33] border-2 border-emerald-400/40 shadow-[0_0_35px_rgba(16,185,129,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]'
              : 'bg-[#f8f9fb] shadow-[-6px_-6px_14px_#ffffff,6px_6px_18px_rgba(163,177,198,0.5)]'
          }`}
        >
          <img
            src={ROBOT_MASCOT_URL}
            alt="3D vibrant celebratory robot mascot jumping happily holding an emerald trophy"
            className="w-20 h-20 rounded-full object-cover shadow-inner"
          />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-inherit">
            <span className="material-symbols-outlined text-[18px] font-bold icon-filled">
              verified
            </span>
          </div>
        </div>
      </div>

      {/* Neumorphic / Obsidian Pop-up Modal Sheet */}
      <div
        className={`w-full max-w-md mx-auto rounded-t-[32px] p-5 pt-12 pb-6 relative z-20 flex flex-col items-center text-center backdrop-blur-xl animate-in fade-in slide-in-from-bottom duration-300 ${
          theme === 'dark'
            ? 'bg-[#131D33] border-t border-emerald-500/25 shadow-[0_-8px_32px_rgba(16,185,129,0.18),0_20px_45px_rgba(0,0,0,0.85)] text-white'
            : 'bg-[#f8f9fb] shadow-[-6px_-6px_20px_#ffffff,8px_16px_32px_rgba(163,177,198,0.55)] text-[#191c1e]'
        }`}
      >
        {/* Grab notch */}
        <div
          className={`w-12 h-1.5 rounded-full mb-3.5 ${
            theme === 'dark' ? 'bg-slate-700/80' : 'bg-[#e0e3e5] shadow-inner'
          }`}
        />

        {/* Festive Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="font-['Outfit'] text-[26px] leading-8 font-extrabold tracking-tight">
            Nice! That's correct!
          </h2>
        </div>
        <p className="font-['Outfit'] text-xs text-slate-400 mb-4">
          Spot-on logic! You aced the type deduction check.
        </p>

        {/* Gamified Reward Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4 w-full">
          {/* XP Pill */}
          <div
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${
              theme === 'dark'
                ? 'bg-amber-500/10 border border-amber-400/35 shadow-[0_0_18px_rgba(245,158,11,0.25)]'
                : 'bg-white shadow-[-2px_-2px_6px_#ffffff,2px_2px_8px_rgba(163,177,198,0.35)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-amber-500 icon-filled">
              star
            </span>
            <span className="font-['Outfit'] text-[15px] font-bold text-amber-500">
              +{earnedXP} XP
            </span>
          </div>

          {/* Streak Retention Pill */}
          <div
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${
              theme === 'dark'
                ? 'bg-orange-500/10 border border-orange-400/35 shadow-[0_0_18px_rgba(249,115,22,0.25)]'
                : 'bg-white shadow-[-2px_-2px_6px_#ffffff,2px_2px_8px_rgba(163,177,198,0.35)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-orange-500 icon-filled">
              local_fire_department
            </span>
            <span className="font-['Outfit'] text-[15px] font-bold text-orange-500">
              Streak maintained!
            </span>
          </div>
        </div>

        {/* Explanation Box */}
        <div
          className={`w-full text-left rounded-2xl p-4 mb-4 ${
            theme === 'dark'
              ? 'bg-[#1A243B] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.35)]'
              : 'bg-[#f2f4f6] shadow-inner'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[18px] text-amber-400 icon-filled">
              lightbulb
            </span>
            <span className="font-['Outfit'] text-[11px] font-bold tracking-wider uppercase text-indigo-400">
              Quick Breakdown
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed opacity-95">
            {question.explanation.text}
          </p>
        </div>

        {/* Telemetry & Speed */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-5 font-['Plus_Jakarta_Sans']">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-emerald-500 animate-pulse">
              volume_up
            </span>
            <span className="font-medium">Haptic active</span>
          </div>
          <span className="opacity-40">•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-amber-400 icon-filled">
              bolt
            </span>
            <span className="font-medium">Answered in 1.4s (Superfast!)</span>
          </div>
        </div>

        {/* Continue Primary CTA Button */}
        <button
          id="continue-btn"
          type="button"
          onClick={() => {
            soundFX.playClick();
            onContinue();
          }}
          className={`w-full py-4 px-6 rounded-full font-['Outfit'] text-[18px] font-extrabold tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] active:translate-y-0.5 transition-all ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_28px_rgba(16,185,129,0.55),0_4px_0_#047857]'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_10px_22px_rgba(16,185,129,0.45)]'
          }`}
        >
          <span>CONTINUE</span>
          <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
