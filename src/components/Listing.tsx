import React, { useState, useEffect, useRef } from 'react';
import { AppTheme, LessonMeta } from '../types';
import { MasterWorldEntry } from '../data/curriculum/masterCurriculumCatalog';
import { CODEDO_MASTER_WORLDS as WORLDS_CATALOG } from '../data/curriculum/masterCurriculumCatalog';
import { soundFX } from '../utils/audio';

interface ListingProps {
  theme: AppTheme;
  initialWorldId?: string;
  onJumpToToday: () => void;
  onStartLesson?: (topic?: string) => void;
}

export const Listing: React.FC<ListingProps> = ({
  theme,
  initialWorldId,
  onJumpToToday,
  onStartLesson,
}) => {
  // Selected active world in the curriculum journey
  const [selectedWorldId, setSelectedWorldId] = useState<string>(initialWorldId || 'world-1');
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('focused');

  // Ref to the horizontal scrollable world strip
  const scrollStripRef = useRef<HTMLDivElement>(null);
  const worldButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Refs to measure the connecting stem line so it ends exactly at the last
  // visible lesson node's icon instead of a hardcoded offset (which drifted
  // once boss lessons stopped rendering their own timeline node).
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const lastNodeIconRef = useRef<HTMLDivElement>(null);
  const [stemHeight, setStemHeight] = useState<number | null>(null);

  // Function to scroll the world scroller so the active world is centered/visible
  const scrollToActiveWorld = (worldId: string) => {
    const container = scrollStripRef.current;
    const btn = worldButtonRefs.current.get(worldId);
    if (container && btn) {
      const containerWidth = container.clientWidth;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    } else if (btn) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  useEffect(() => {
    if (initialWorldId) {
      setSelectedWorldId(initialWorldId);
      // Scroll root container to top when entering or switching worlds
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Automatically scroll top worlds scroller to the clicked world after render
      const timer = setTimeout(() => {
        scrollToActiveWorld(initialWorldId);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [initialWorldId]);

  const isDark = theme === 'dark';
  const selectedWorld: MasterWorldEntry =
    WORLDS_CATALOG.find((w) => w.id === selectedWorldId) || WORLDS_CATALOG[0];

  // Recompute the stem line's height so it stops at the last node's icon
  // center, never past it, whenever the visible lesson list changes.
  useEffect(() => {
    const measure = () => {
      const section = timelineSectionRef.current;
      const lastIcon = lastNodeIconRef.current;
      if (section && lastIcon) {
        const sectionTop = section.getBoundingClientRect().top;
        const iconRect = lastIcon.getBoundingClientRect();
        const iconCenter = iconRect.top - sectionTop + iconRect.height / 2;
        setStemHeight(iconCenter);
      }
    };
    const timer = setTimeout(measure, 0);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [selectedWorldId]);

  const handleWorldSelect = (worldId: string) => {
    soundFX.playClick();
    setSelectedWorldId(worldId);
    scrollToActiveWorld(worldId);
  };

  // Used by the "next world" milestone button at the bottom of the timeline --
  // unlike the top world-pill strip, that button sits far down the page, so
  // switching worlds from there should also bring the user back to the top.
  const handleNextWorldSelect = (worldId: string) => {
    handleWorldSelect(worldId);
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLaunchLesson = (lesson: LessonMeta) => {
    soundFX.playClick();
    if (onStartLesson) {
      if (lesson.fiveStageLessonKey) {
        onStartLesson(lesson.fiveStageLessonKey);
        return;
      }
      // Fallback for lessons that don't have real content authored yet --
      // best-effort keyword guess so something reasonable still opens.
      const lower = lesson.title.toLowerCase();
      if (lower.includes('loop') || lower.includes('for') || lower.includes('while')) {
        onStartLesson('loops');
      } else if (lower.includes('function') || lower.includes('scope') || lower.includes('parameter')) {
        onStartLesson('functions');
      } else {
        onStartLesson('variables');
      }
    } else {
      onJumpToToday();
    }
  };

  return (
    <div
      className={`min-h-full min-h-screen w-full flex flex-col items-center select-none pb-28 pt-2 px-4 transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-[#e2e8f0]' : 'bg-[#f1f4f9] text-[#1e2433]'
      }`}
    >
      <div className="w-full max-w-md flex flex-col">
        {/* ================= DYNAMIC HORIZONTAL WORLD SELECTOR ================= */}
        <section className="mb-2 pt-1">
          {/* Scrollable World Navigation Strip -- bleeds full-width (negating the
              page's px-4) so a pill can reach the true screen edge once scrolled;
              the leading/trailing spacers below restore the initial visual gap
              without constraining how far the strip can scroll. */}
          <div
            ref={scrollStripRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 scroll-smooth scrollbar-none overscroll-x-contain touch-pan-x"
          >
            <div className="shrink-0 w-2" aria-hidden="true" />
            {WORLDS_CATALOG.map((w) => {
              const isSelected = w.id === selectedWorldId;
              return (
                <button
                  key={w.id}
                  id={`curriculum-world-pill-${w.id}`}
                  ref={(el) => {
                    if (el) {
                      worldButtonRefs.current.set(w.id, el);
                    } else {
                      worldButtonRefs.current.delete(w.id);
                    }
                  }}
                  type="button"
                  onClick={() => handleWorldSelect(w.id)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-md'
                        : 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-sm'
                      : isDark
                      ? 'bg-[#151b28] border-white/10 text-slate-400 hover:text-white'
                      : 'bg-white border-slate-200/80 text-slate-600 shadow-sm'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-['Outfit'] text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-[#0f1420] text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {w.order}
                  </span>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="font-['Outfit'] text-xs font-bold truncate max-w-[130px]">
                      {w.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {w.lessons.length} lessons
                    </span>
                  </div>
                </button>
              );
            })}
            <div className="shrink-0 w-2" aria-hidden="true" />
          </div>
        </section>

        {/* ================= FOCUSED WORLD OR ALL WORLDS VIEW ================= */}
        {viewMode === 'focused' ? (
          /* SINGLE FOCUSED WORLD TIMELINE (as in stitch prototype world_journey_curriculum) */
          <div className="flex flex-col">
            {/* World Hero Header */}
            <section
              className={`rounded-3xl p-5 border mb-3 transition-all ${
                isDark
                  ? 'bg-[#151b28] border-white/10 shadow-lg'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              {/* Kotlin Track Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 bg-white/10 border border-white/10">
                <svg className="w-3.5 h-3.5 rounded-sm" fill="none" viewBox="0 0 24 24">
                  <path d="M24 24H0V0H24L12 12L24 24Z" fill="url(#kotlin-grad)"></path>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="kotlin-grad" x1="24" x2="0" y1="0" y2="24">
                      <stop stopColor="#7F52FF"></stop>
                      <stop offset="0.5" stopColor="#C711E1"></stop>
                      <stop offset="1" stopColor="#E4485D"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
                  Kotlin Track
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 font-['Outfit']">
                  World {selectedWorld.order}
                </p>
                <h1 className="text-2xl font-extrabold font-['Outfit'] tracking-tight">
                  {selectedWorld.title}
                </h1>
                <p
                  className={`text-xs mt-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {selectedWorld.subtitle}
                </p>
              </div>

              {/* Mastery Progress Card */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-[#0f1420] border-white/5'
                    : 'bg-[#f0f3f8] border-slate-200/60 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-mono font-bold text-indigo-500 tracking-wide uppercase">
                    72% Mastered
                  </span>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${
                      isDark
                        ? 'bg-[#151b28] border-white/10 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Today
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDark ? 'bg-slate-700' : 'bg-slate-300'
                      }`}
                    ></span>
                    <span className="text-[11px] font-mono font-bold ml-0.5">2/3</span>
                  </div>
                </div>

                {/* Progress Track */}
                <div
                  className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${
                    isDark ? 'bg-[#090d16]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm"
                    style={{ width: '72%' }}
                  ></div>
                </div>
              </div>
            </section>

            {/* Linear Curriculum Timeline */}
            <section ref={timelineSectionRef} className="relative">
              {/* Central Connecting Stem Line -- stops exactly at the last visible node's icon */}
              <div
                aria-hidden="true"
                className="absolute left-[18px] top-4 w-1 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-slate-400"
                style={{ height: stemHeight !== null ? Math.max(0, stemHeight - 16) : 0 }}
              />

              {/* Dynamic Lesson Nodes */}
              <div className="space-y-4">
                {(() => {
                  const lastVisibleIdx = selectedWorld.lessons.reduce(
                    (acc, l, i) => (l.isBoss ? acc : i),
                    -1
                  );
                  return selectedWorld.lessons.map((lesson, idx) => {
                  const isFirstThree = idx < 3;
                  const isCurrent = idx === 3;
                  const isBoss = lesson.isBoss;

                  if (isBoss) {
                    return null;
                  }

                  const isClickable = true; // All lessons or review/available lessons can be launched

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLaunchLesson(lesson)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleLaunchLesson(lesson);
                        }
                      }}
                      className="relative flex items-center gap-4 group cursor-pointer select-none active:scale-[0.99] transition-transform"
                    >
                      {/* Node Dot Indicator (tick / play / lock icon) */}
                      <div
                        ref={idx === lastVisibleIdx ? lastNodeIconRef : undefined}
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isFirstThree
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md group-hover:scale-105 group-hover:ring-2 group-hover:ring-indigo-400/40'
                            : isCurrent
                            ? 'bg-white dark:bg-[#151b28] border-indigo-500 text-indigo-500 shadow-md ring-4 ring-indigo-500/20 animate-pulse group-hover:scale-105'
                            : isDark
                            ? 'bg-[#0f1420] border-slate-700 text-slate-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400'
                            : 'bg-white border-slate-300 text-slate-400 shadow-sm group-hover:border-indigo-400 group-hover:text-indigo-600'
                        }`}
                      >
                        {isFirstThree ? (
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        ) : isCurrent ? (
                          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        ) : (
                          <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        )}
                      </div>

                      {/* Node Card Details */}
                      <div
                        className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? isDark
                              ? 'bg-[#151b28] border-indigo-500/60 shadow-md group-hover:border-indigo-400 group-hover:bg-[#192132]'
                              : 'bg-white border-indigo-300 shadow-md group-hover:border-indigo-500 group-hover:bg-indigo-50/40'
                            : isDark
                            ? 'bg-[#151b28]/60 border-white/5 group-hover:border-indigo-500/40 group-hover:bg-[#171e2e]'
                            : 'bg-white/80 border-slate-200/60 shadow-sm group-hover:border-indigo-300 group-hover:bg-indigo-50/20'
                        }`}
                      >
                        <h3 className="text-sm font-bold font-['Outfit'] group-hover:text-indigo-500 transition-colors">
                          {lesson.title}
                        </h3>

                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-semibold ${
                                isFirstThree
                                  ? 'text-emerald-500'
                                  : isCurrent
                                  ? 'text-indigo-500'
                                  : isDark
                                  ? 'text-slate-400'
                                  : 'text-slate-500'
                              }`}
                            >
                              {isFirstThree ? 'Completed' : isCurrent ? 'Available Now' : 'Pending'}
                            </span>
                            <span className="text-slate-400 text-xs">•</span>
                            <span
                              className="text-xs font-bold text-indigo-500 group-hover:text-indigo-400 group-hover:underline decoration-indigo-300"
                            >
                              {isFirstThree ? 'Review' : 'Start'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-semibold text-slate-400">
                            Lesson {selectedWorld.order}.{idx + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                  });
                })()}
              </div>

              {/* World Transition Milestone */}
              <div className="relative flex justify-center pt-6 pb-4">
                {(() => {
                  const nextOrder = selectedWorld.order + 1;
                  const nextWorld = WORLDS_CATALOG.find((w) => w.order === nextOrder);
                  if (!nextWorld) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => handleNextWorldSelect(nextWorld.id)}
                      className={`px-4 py-2.5 rounded-full border flex items-center gap-2 text-xs font-bold transition-all active:scale-95 ${
                        isDark
                          ? 'bg-[#151b28] border-white/10 text-slate-300 hover:text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:text-indigo-600 shadow-sm'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-indigo-500">
                        explore
                      </span>
                      <span className="font-['Outfit'] uppercase tracking-wider text-[11px]">
                        WORLD {nextWorld.order} • {nextWorld.title}
                      </span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  );
                })()}
              </div>
            </section>
          </div>
        ) : (
          /* ALL WORLDS EXPANDED BROWSER */
          <div className="flex flex-col space-y-4">
            {WORLDS_CATALOG.map((world) => (
              <div
                key={world.id}
                className={`rounded-2xl p-4 border transition-all ${
                  world.id === selectedWorldId
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                      : 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                    : isDark
                    ? 'bg-[#151b28] border-white/10 shadow-sm'
                    : 'bg-white border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-['Outfit'] font-bold text-xs ${
                        isDark ? 'bg-indigo-900/60 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      {world.order}
                    </span>
                    <div>
                      <h3 className="font-['Outfit'] font-bold text-base">
                        {world.title}
                      </h3>
                      <p className="text-xs text-slate-400">{world.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedWorldId(world.id);
                      setViewMode('focused');
                    }}
                    className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-['Outfit'] text-xs font-bold shadow-sm"
                  >
                    View Timeline
                  </button>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-500/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{world.lessons.length} structured modules</span>
                  <span>+{world.lessons.reduce((acc, l) => acc + l.xpReward, 0)} Total XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
