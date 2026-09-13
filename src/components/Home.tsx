import React from 'react';
import { AppTheme, UserStats } from '../types';
import { soundFX } from '../utils/audio';
import { CODEDO_MASTER_WORLDS } from '../data/curriculum/masterCurriculumCatalog';

// Single source of truth for world identity (name, order, lesson count) --
// shared with Listing, so the two screens can never drift out of sync.
const getWorld = (order: number) => {
  const world = CODEDO_MASTER_WORLDS.find((w) => w.order === order);
  if (!world) {
    throw new Error(`No world found for order ${order} in CODEDO_MASTER_WORLDS`);
  }
  return world;
};

// Shared styling for the "world name + lesson count" pair repeated across every
// node on the snake path, so completed/locked worlds stay visually consistent.
// Colors reuse the app's own neu-surface badge recipe (see the Chapter badges
// above) instead of generic Tailwind pastels, and the locked/disabled variant
// is deliberately desaturated + dimmed to read as greyed-out.
const getWorldTitleClass = (isDark: boolean, completed: boolean) =>
  `text-sm font-['Outfit'] font-bold ${
    completed ? 'text-inherit' : isDark ? 'text-slate-500' : 'text-slate-400'
  }`;

const getLessonTagClass = (isDark: boolean, completed: boolean) => {
  if (completed) {
    return `inline-flex w-fit mt-0.5 text-[10px] font-mono font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
      isDark
        ? 'bg-[#121824] border-emerald-500/30 text-emerald-400'
        : 'bg-[#e8eaf0] border-emerald-500/20 text-emerald-600'
    }`;
  }
  return `inline-flex w-fit mt-0.5 text-[10px] font-mono font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border opacity-60 ${
    isDark
      ? 'bg-[#121824] border-white/5 text-slate-500'
      : 'bg-[#e8eaf0] border-black/5 text-slate-400'
  }`;
};

interface HomeProps {
  theme: AppTheme;
  userStats: UserStats;
  onOpenCurriculum: (worldId?: string) => void;
  onSelectWorld?: (worldId: string) => void;
  onStartLesson?: () => void;
  onSelectNode?: (nodeTitle: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  theme,
  userStats,
  onOpenCurriculum,
  onSelectWorld,
  onStartLesson,
}) => {
  const isDark = theme === 'dark';

  const handleWorldClick = (worldId: string) => {
    soundFX.playClick();
    if (onSelectWorld) {
      onSelectWorld(worldId);
    } else {
      onOpenCurriculum(worldId);
    }
  };

  const handleStartCurrentLesson = () => {
    soundFX.playClick();
    if (onStartLesson) {
      onStartLesson();
    } else {
      handleWorldClick('world-5');
    }
  };

  return (
    <main
      className={`flex-1 flex flex-col relative w-full pb-24 pt-2 transition-colors duration-200 select-none ${
        isDark ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#e8eaf0] text-[#2e3040]'
      }`}
    >
      <div className="flex flex-col w-full min-w-0 pb-12 pt-2">
        {/* ================= SUB-HEADER CARD: Kotlin Journey Title & World 5 of 22 Progress ================= */}
        <div className="px-5 pt-2 pb-4">
          <div
            className={`neu-raised rounded-2xl p-4 flex items-center justify-between border transition-all ${
              isDark
                ? 'bg-[#151b28] border-white/10 text-white'
                : 'bg-[#e8eaf0] border-white/60 text-[#2e3040]'
            }`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-sm ${
                    isDark
                      ? 'bg-slate-800 border-white/10 text-slate-200'
                      : 'bg-[#dcdee4] border-white/60 text-[#2e3040]'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="ktGradSub" x1="0%" x2="100%" y1="100%" y2="0%">
                        <stop offset="0%" stopColor="#7F52FF"></stop>
                        <stop offset="50%" stopColor="#C711E1"></stop>
                        <stop offset="100%" stopColor="#E24462"></stop>
                      </linearGradient>
                    </defs>
                    <polygon fill="url(#ktGradSub)" points="24,0 0,0 0,24 24,0"></polygon>
                    <polygon fill="#7F52FF" points="0,24 12,12 24,24"></polygon>
                  </svg>
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">
                    Kotlin Journey
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  22 Worlds Total
                </span>
              </div>
              <h1 className="text-base font-['Outfit'] font-bold tracking-tight">
                World {getWorld(5).order} of 22 • {getWorld(5).title}
              </h1>
            </div>

            <div
              onClick={() => {
                soundFX.playClick();
                onOpenCurriculum();
              }}
              className={`neu-pressed px-3 py-1.5 rounded-xl flex flex-col items-end gap-0.5 cursor-pointer active:scale-95 transition-transform ${
                isDark ? 'bg-[#121824]' : 'bg-[#e8eaf0]'
              }`}
              title="Open Curriculum Explorer"
            >
              <span className="text-[9px] font-['Plus_Jakarta_Sans'] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                PROGRESS
              </span>
              <span className="font-mono text-xs font-bold text-inherit">22.7%</span>
            </div>
          </div>
        </div>

        {/* ================= SECTION 1: BEGINNER (Worlds 1-8) ================= */}
        <section className="relative w-full">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-b ${
              isDark
                ? 'bg-[#0b0f19]/85 border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]'
                : 'bg-[#e8eaf0]/85 border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full neu-pressed border ${
                  isDark ? 'bg-[#121824] border-white/5' : 'bg-[#e8eaf0] border-black/5'
                }`}
              >
                CHAPTER 1 · BEGINNER
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 1: WORLDS 1-8 */}
          <div className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-8 flex flex-col items-center overflow-hidden">
          {/* Continuous SVG Path for Section 1 */}
          <svg
            className="absolute top-2 inset-x-0 w-full h-[880px] pointer-events-none stroke-current"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 360 880"
          >
            <defs>
              <linearGradient id="sec1Active" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1"></stop>
                <stop offset="52%" stopColor="#8b5cf6"></stop>
                <stop offset="58%" stopColor={isDark ? '#263148' : '#d0d2dc'}></stop>
                <stop offset="100%" stopColor={isDark ? '#263148' : '#d0d2dc'}></stop>
              </linearGradient>
            </defs>
            {/* Neumorphic highlight track */}
            <path
              d="M 90,30 C 90,75 270,75 270,130 C 270,185 90,185 90,240 C 90,295 270,295 270,350 C 270,405 180,415 180,470 L 180,520 C 180,575 270,575 270,630 C 270,685 90,685 90,740 C 90,795 270,795 270,850"
              opacity={isDark ? '0.15' : '0.9'}
              stroke={isDark ? '#384260' : '#ffffff'}
              strokeLinecap="round"
              strokeWidth="12"
            ></path>
            {/* Recessed base track */}
            <path
              d="M 90,30 C 90,75 270,75 270,130 C 270,185 90,185 90,240 C 90,295 270,295 270,350 C 270,405 180,415 180,470 L 180,520 C 180,575 270,575 270,630 C 270,685 90,685 90,740 C 90,795 270,795 270,850"
              stroke={isDark ? '#172033' : '#d0d2dc'}
              strokeLinecap="round"
              strokeWidth="6"
            ></path>
            {/* Active gradient ribbon up to World 5 */}
            <path
              d="M 90,30 C 90,75 270,75 270,130 C 270,185 90,185 90,240 C 90,295 270,295 270,350 C 270,405 180,415 180,470"
              stroke="url(#sec1Active)"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeWidth="4"
            ></path>
          </svg>

          {/* WORLD 1: Completed (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-1 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-1')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/60'
                }`}
              >
                <span
                  className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  01
                </span>
                <span className={getWorldTitleClass(isDark, true)}>
                  {getWorld(1).title}
                </span>
                <span className={getLessonTagClass(isDark, true)}>
                  {getWorld(1).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 2: Completed (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-12 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-2')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/60'
                }`}
              >
                <span
                  className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  02
                </span>
                <span className={getWorldTitleClass(isDark, true)}>
                  {getWorld(2).title}
                </span>
                <span className={getLessonTagClass(isDark, true)}>
                  {getWorld(2).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 3: Completed (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-12 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-3')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/60'
                }`}
              >
                <span
                  className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  03
                </span>
                <span className={getWorldTitleClass(isDark, true)}>
                  {getWorld(3).title}
                </span>
                <span className={getLessonTagClass(isDark, true)}>
                  {getWorld(3).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 4: Completed (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-12 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-4')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/60'
                }`}
              >
                <span
                  className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  04
                </span>
                <span className={getWorldTitleClass(isDark, true)}>
                  {getWorld(4).title}
                </span>
                <span className={getLessonTagClass(isDark, true)}>
                  {getWorld(4).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 5: CURRENT WORLD (CENTER FOCAL POINT) */}
          <div className="relative w-full flex flex-col items-center pt-10 pb-4 z-20">
            {/* Attached Callout Card */}
            <div
              className={`w-full max-w-[320px] neu-raised rounded-2xl p-4 relative flex flex-col gap-2.5 border transition-all ${
                isDark
                  ? 'bg-[#151b28] border-white/10 text-white'
                  : 'bg-[#e8eaf0] border-white/80 text-[#2e3040]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                  CURRENT WORLD
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  World {String(getWorld(5).order).padStart(2, '0')} / 22
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-['Outfit'] font-bold text-inherit tracking-tight">
                    {String(getWorld(5).order).padStart(2, '0')} · {getWorld(5).title}
                  </h3>
                  <span
                    className={`text-[11px] font-semibold font-mono ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  >
                    7 / {getWorld(5).lessons.length} lessons
                  </span>
                </div>
                <p
                  className={`text-xs leading-snug mt-0.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Master modular functions, default parameters, named calls, and scope contracts.
                </p>
              </div>
              <button
                id="startLessonBtn"
                type="button"
                onClick={handleStartCurrentLesson}
                className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-['Outfit'] font-semibold text-sm flex items-center justify-center gap-2 cta-glow active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>START WORLD 5</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* WORLD 6: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-10 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-6')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  06
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(6).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(6).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 7: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-12 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-7')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  07
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(7).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(7).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 8: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-12 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-8')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  08
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(8).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(8).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* ================= SECTION 2: INTERMEDIATE (Worlds 9-15) ================= */}
        <section className="relative w-full">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-b ${
              isDark
                ? 'bg-[#0b0f19]/85 border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]'
                : 'bg-[#e8eaf0]/85 border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full neu-pressed border ${
                  isDark ? 'bg-[#121824] border-white/5' : 'bg-[#e8eaf0] border-black/5'
                }`}
              >
                CHAPTER 2 · INTERMEDIATE
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 2: WORLDS 9-15 */}
          <div className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-8 flex flex-col items-center overflow-hidden">
          <svg
            className="absolute top-2 inset-x-0 w-full h-[760px] pointer-events-none stroke-current"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 360 760"
          >
            {/* Neumorphic highlight track */}
            <path
              d="M 270,25 C 270,75 90,75 90,125 C 90,175 270,175 270,225 C 270,275 90,275 90,325 C 90,375 270,375 270,425 C 270,475 90,475 90,525 C 90,575 270,575 270,625 C 270,675 180,685 180,735"
              opacity={isDark ? '0.15' : '0.9'}
              stroke={isDark ? '#384260' : '#ffffff'}
              strokeLinecap="round"
              strokeWidth="12"
            ></path>
            {/* Recessed base track */}
            <path
              d="M 270,25 C 270,75 90,75 90,125 C 90,175 270,175 270,225 C 270,275 90,275 90,325 C 90,375 270,375 270,425 C 270,475 90,475 90,525 C 90,575 270,575 270,625 C 270,675 180,685 180,735"
              stroke={isDark ? '#172033' : '#d0d2dc'}
              strokeLinecap="round"
              strokeWidth="6"
            ></path>
          </svg>

          {/* WORLD 9: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-3 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-9')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  09
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(9).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(9).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 10: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-10')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  10
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(10).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(10).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 11: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-11')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  11
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(11).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(11).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 12: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-12')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  12
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(12).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(12).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 13: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-13')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  13
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(13).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(13).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 14: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-14')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  14
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(14).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(14).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 15: Chapter Boss Milestone (Center) */}
          <div className="relative w-full flex items-center justify-center pt-11 z-10">
            <div
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-15')}
            >
              <div
                className={`w-12 h-12 rounded-2xl neu-raised flex items-center justify-center border relative ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                  shield
                </span>
                <span className="material-symbols-outlined text-[12px] text-slate-400 absolute bottom-1 right-1">
                  lock
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium mt-1">
                15
              </span>
              <span className={getWorldTitleClass(isDark, false)}>
                {getWorld(15).title}
              </span>
              <span className={getLessonTagClass(isDark, false)}>
                {getWorld(15).lessons.length} lessons
              </span>
            </div>
          </div>
        </div>
      </section>

        {/* ================= SECTION 3: EXPERIENCED (Worlds 16-22) ================= */}
        <section className="relative w-full">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-b ${
              isDark
                ? 'bg-[#0b0f19]/85 border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]'
                : 'bg-[#e8eaf0]/85 border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full neu-pressed border ${
                  isDark ? 'bg-[#121824] border-white/5' : 'bg-[#e8eaf0] border-black/5'
                }`}
              >
                CHAPTER 3 · EXPERIENCED
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 3: WORLDS 16-22 */}
          <div className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-8 flex flex-col items-center overflow-hidden">
          <svg
            className="absolute top-2 inset-x-0 w-full h-[760px] pointer-events-none stroke-current"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 360 760"
          >
            {/* Neumorphic highlight track */}
            <path
              d="M 180,25 C 180,65 90,75 90,125 C 90,175 270,175 270,225 C 270,275 90,275 90,325 C 90,375 270,375 270,425 C 270,475 90,475 90,525 C 90,575 270,575 270,625 C 270,675 180,685 180,735"
              opacity={isDark ? '0.15' : '0.9'}
              stroke={isDark ? '#384260' : '#ffffff'}
              strokeLinecap="round"
              strokeWidth="12"
            ></path>
            {/* Recessed base track */}
            <path
              d="M 180,25 C 180,65 90,75 90,125 C 90,175 270,175 270,225 C 270,275 90,275 90,325 C 90,375 270,375 270,425 C 270,475 90,475 90,525 C 90,575 270,575 270,625 C 270,675 180,685 180,735"
              stroke={isDark ? '#172033' : '#d0d2dc'}
              strokeLinecap="round"
              strokeWidth="6"
            ></path>
          </svg>

          {/* WORLD 16: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-3 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-16')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  16
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(16).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(16).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 17: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-17')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  17
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(17).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(17).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 18: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-18')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  18
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(18).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(18).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 19: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-19')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  19
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(19).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(19).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 20: Locked (Left) */}
          <div className="relative w-full flex items-center justify-start pl-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-20')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  20
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(20).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(20).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 21: Locked (Right) */}
          <div className="relative w-full flex items-center justify-end pr-8 pt-11 z-10">
            <div
              className="flex items-center gap-2.5 flex-row-reverse cursor-pointer active:scale-95 transition-transform"
              onClick={() => handleWorldClick('world-21')}
            >
              <div
                className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border ${
                  isDark ? 'bg-[#151b28] border-white/10' : 'bg-[#e8eaf0] border-white/40'
                }`}
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
                  lock
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  21
                </span>
                <span className={getWorldTitleClass(isDark, false)}>
                  {getWorld(21).title}
                </span>
                <span className={getLessonTagClass(isDark, false)}>
                  {getWorld(21).lessons.length} lessons
                </span>
              </div>
            </div>
          </div>

          {/* WORLD 22: GRAND PINNACLE (Center) */}
          <div className="relative w-full max-w-[320px] pt-12 pb-4 z-20 flex flex-col items-center">
            <div
              className={`neu-raised rounded-3xl p-4 w-full flex items-center justify-between border cursor-pointer active:scale-95 transition-transform ${
                isDark
                  ? 'bg-[#151b28] border-white/10 text-white'
                  : 'bg-[#e8eaf0] border-white/60 text-[#2e3040]'
              }`}
              onClick={() => handleWorldClick('world-22')}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl neu-pressed flex items-center justify-center relative ${
                    isDark ? 'bg-[#121824]' : 'bg-[#e8eaf0]'
                  }`}
                >
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[26px]">
                    military_tech
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400">
                      FINAL WORLD 22
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">
                      • 500 XP
                    </span>
                  </div>
                  <h3 className="text-xs font-['Outfit'] font-bold text-inherit">
                    {getWorld(22).title}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Full-stack Arch & CI/CD Mastery
                  </span>
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-xl neu-raised flex items-center justify-center ${
                  isDark ? 'bg-[#151b28]' : 'bg-[#e8eaf0]'
                }`}
              >
                <span className="material-symbols-outlined text-slate-400 text-[16px]">lock</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};
