import React, { useState, useEffect, useRef } from 'react';
import { AppTheme, LessonMeta, UserStats } from '../types';
import { MasterWorldEntry } from '../data/curriculum/masterCurriculumCatalog';
import { CODEDO_MASTER_WORLDS as WORLDS_CATALOG } from '../data/curriculum/masterCurriculumCatalog';
import { soundFX } from '../utils/audio';

interface ListingProps {
  theme: AppTheme;
  initialWorldId?: string;
  userStats?: UserStats;
  onJumpToToday: () => void;
  onStartLesson?: (topic?: string) => void;
}

export const Listing: React.FC<ListingProps> = ({
  theme,
  initialWorldId,
  userStats,
  onJumpToToday,
  onStartLesson,
}) => {
  // Selected active world in the curriculum journey
  const [selectedWorldId, setSelectedWorldId] = useState<string>(initialWorldId || 'world-1');
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('focused');

  // Ref to the horizontal scrollable world strip
  const scrollStripRef = useRef<HTMLDivElement>(null);
  const worldButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Refs and geometry to measure the connecting stem line so it is precisely
  // centered on the status circles, starts at the center of the first circle (never above it),
  // and ends at the center of the last circle.
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const firstNodeIconRef = useRef<HTMLDivElement | null>(null);
  const lastNodeIconRef = useRef<HTMLDivElement | null>(null);
  const [stemGeometry, setStemGeometry] = useState<{
    top: number;
    height: number;
    left: number;
  } | null>(null);

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

  const completedWorldsCount =
    (userStats?.completedLessons ?? 0) > 15
      ? userStats?.completedWorlds ?? 0
      : 0;
  const isSelectedWorldCompleted = selectedWorld.order <= completedWorldsCount;
  const isSelectedWorldCurrent = selectedWorld.order === completedWorldsCount + 1;

  // Recompute the stem line's geometry so it is precisely centered on the status
  // circles, starts at the first circle center (never above it), and stops at the last circle.
  useEffect(() => {
    const measure = () => {
      const section = timelineSectionRef.current;
      const firstIcon = firstNodeIconRef.current;
      const lastIcon = lastNodeIconRef.current;
      if (section && firstIcon && lastIcon) {
        const sectionRect = section.getBoundingClientRect();
        const firstRect = firstIcon.getBoundingClientRect();
        const lastRect = lastIcon.getBoundingClientRect();

        const top = firstRect.top - sectionRect.top + firstRect.height / 2;
        const bottom = lastRect.top - sectionRect.top + lastRect.height / 2;
        const left = firstRect.left - sectionRect.left + firstRect.width / 2;

        setStemGeometry({
          top,
          height: Math.max(0, bottom - top),
          left,
        });
      }
    };

    const timer = setTimeout(measure, 0);
    window.addEventListener('resize', measure);

    // Use ResizeObserver if available to re-measure on layout/font shifts
    let ro: ResizeObserver | null = null;
    if (timelineSectionRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure());
      ro.observe(timelineSectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
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
              const isWorldDone = w.order <= completedWorldsCount;
              const isWorldActive = w.order === completedWorldsCount + 1;
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
                      isWorldDone
                        ? 'bg-emerald-600 text-white'
                        : isWorldActive
                        ? 'bg-purple-600 text-white ring-2 ring-purple-400/40'
                        : isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-[#0f1420] text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isWorldDone ? (
                      <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                    ) : (
                      w.order
                    )}
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
              {(() => {
                const visibleLessons = selectedWorld.lessons.filter((l) => !l.isBoss);
                const totalLessons = Math.max(1, visibleLessons.length);
                const completedInThisWorld =
                  selectedWorld.order === 1
                    ? Math.min(totalLessons, userStats?.completedLessons ?? 1)
                    : selectedWorld.order <= completedWorldsCount
                    ? totalLessons
                    : 0;
                const masteryPercentage = Math.round((completedInThisWorld / totalLessons) * 100);

                return (
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark
                        ? 'bg-[#0f1420] border-white/5'
                        : 'bg-[#f0f3f8] border-slate-200/60 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase whitespace-nowrap shrink-0">
                        {masteryPercentage}% Mastered
                      </span>
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs whitespace-nowrap shrink-0 ${
                          isDark
                            ? 'bg-[#151b28] border-white/10 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            completedInThisWorld > 0
                              ? 'bg-emerald-500'
                              : isDark
                              ? 'bg-slate-700'
                              : 'bg-slate-300'
                          }`}
                        />
                        <span className="text-[11px] font-mono font-bold">
                          {completedInThisWorld}/{totalLessons} Lessons
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden p-0.5 ${
                        isDark ? 'bg-[#090d16]' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 shadow-sm transition-all duration-500"
                        style={{ width: `${Math.max(masteryPercentage, completedInThisWorld > 0 ? 5 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* Linear Curriculum Timeline */}
            <section ref={timelineSectionRef} className="relative">
              {/* Central Connecting Stem Line -- precisely centered on status circles, starts at first circle center (never above it) and stops at last circle center */}
              {stemGeometry && (
                <div
                  aria-hidden="true"
                  className="absolute w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-300 dark:to-slate-700 pointer-events-none"
                  style={{
                    left: `${stemGeometry.left}px`,
                    top: `${stemGeometry.top}px`,
                    height: `${stemGeometry.height}px`,
                  }}
                />
              )}

              {/* Dynamic Lesson Nodes */}
              <div className="space-y-4">
                {(() => {
                  const visibleLessons = selectedWorld.lessons.filter((l) => !l.isBoss);
                  const totalLessons = Math.max(1, visibleLessons.length);
                  const completedInThisWorld =
                    selectedWorld.order === 1
                      ? Math.min(totalLessons, userStats?.completedLessons ?? 1)
                      : selectedWorld.order <= completedWorldsCount
                      ? totalLessons
                      : 0;

                  const firstVisibleIdx = selectedWorld.lessons.findIndex(
                    (l) => !l.isBoss
                  );
                  const lastVisibleIdx = selectedWorld.lessons.reduce(
                    (acc, l, i) => (l.isBoss ? acc : i),
                    -1
                  );
                  return selectedWorld.lessons.map((lesson, idx) => {
                  const isBoss = lesson.isBoss;

                  if (isBoss) {
                    return null;
                  }

                  // Respect completed count in selected world:
                  // Lessons before completedInThisWorld are completed,
                  // lesson at completedInThisWorld is current (if world not fully completed),
                  // and rest are upcoming
                  const isCompleted = idx < completedInThisWorld;
                  const isCurrent =
                    idx === completedInThisWorld && completedInThisWorld < totalLessons;
                  const isUpcoming = idx > completedInThisWorld;

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
                      className="relative flex items-center gap-4 group cursor-pointer select-none active:scale-[0.99] transition-all"
                    >
                      {/* Node Dot Indicator (checkmark / purple pulse play / muted lock) */}
                      <div
                        ref={(el) => {
                          if (idx === firstVisibleIdx) {
                            firstNodeIconRef.current = el;
                          }
                          if (idx === lastVisibleIdx) {
                            lastNodeIconRef.current = el;
                          }
                        }}
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                          isCompleted
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md group-hover:scale-105 group-hover:ring-2 group-hover:ring-indigo-400/40'
                            : isCurrent
                            ? 'bg-purple-600 border-purple-300 dark:border-purple-300 text-white shadow-lg shadow-purple-500/35 ring-4 ring-purple-500/25 animate-pulse group-hover:scale-105'
                            : isDark
                            ? 'bg-[#0f1420] border-slate-700/80 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-400'
                            : 'bg-slate-100 border-slate-300 text-slate-400 shadow-sm group-hover:border-slate-400 group-hover:text-slate-600'
                        }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                        ) : isCurrent ? (
                          <span className="material-symbols-outlined text-[18px] font-bold">play_arrow</span>
                        ) : (
                          <span className="material-symbols-outlined text-[15px]">lock_outline</span>
                        )}
                      </div>

                      {/* Node Card Details - highlighted border for current, controlled opacity for Up Next */}
                      <div
                        className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                          isUpcoming ? 'opacity-[0.65] hover:opacity-100' : 'opacity-100'
                        } ${
                          isCurrent
                            ? isDark
                              ? 'bg-[#151b28] border-purple-500 ring-1 ring-purple-500/30 shadow-sm group-hover:border-purple-400 group-hover:bg-[#171e2e]'
                              : 'bg-white border-purple-500 ring-1 ring-purple-500/20 shadow-sm group-hover:border-purple-600 group-hover:bg-indigo-50/20'
                            : isDark
                            ? 'bg-[#151b28] border-white/10 shadow-sm group-hover:border-indigo-500/40 group-hover:bg-[#171e2e]'
                            : 'bg-white border-slate-200/80 shadow-sm group-hover:border-indigo-300 group-hover:bg-indigo-50/20'
                        }`}
                      >
                        <h3 className="text-sm font-bold font-['Outfit'] group-hover:text-indigo-500 transition-colors">
                          {lesson.title}
                        </h3>

                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-semibold ${
                                isCompleted
                                  ? 'text-emerald-500'
                                  : isCurrent
                                  ? 'text-indigo-500'
                                  : isDark
                                  ? 'text-slate-400'
                                  : 'text-slate-500'
                              }`}
                            >
                              {isCompleted ? 'Completed' : isCurrent ? 'Available Now' : 'Up Next'}
                            </span>
                            <span className="text-slate-400 text-xs">•</span>
                            <span
                              className={`text-xs font-bold ${
                                isCompleted
                                  ? 'text-indigo-500 group-hover:text-indigo-400 group-hover:underline decoration-indigo-300'
                                  : isCurrent
                                  ? 'text-indigo-500 group-hover:text-indigo-400 group-hover:underline decoration-indigo-300'
                                  : 'text-slate-400 group-hover:text-indigo-500'
                              }`}
                            >
                              {isCompleted ? 'Review' : 'Start'}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono font-semibold text-slate-400">
                            Lesson {idx + 1}
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
            {WORLDS_CATALOG.map((world) => {
              const isWorldDone = world.order <= completedWorldsCount;
              const isWorldActive = world.order === completedWorldsCount + 1;

              return (
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
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-['Outfit'] font-bold text-xs ${
                          isWorldDone
                            ? 'bg-emerald-600 text-white'
                            : isWorldActive
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400/40'
                            : isDark
                            ? 'bg-indigo-900/60 text-indigo-300'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {isWorldDone ? (
                          <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                        ) : (
                          world.order
                        )}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Outfit'] font-bold text-base">
                            {world.title}
                          </h3>
                          {isWorldDone ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[11px] font-bold">check</span>
                              Completed
                            </span>
                          ) : isWorldActive ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
                              Current
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              Up Next
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{world.subtitle}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedWorldId(world.id);
                        setViewMode('focused');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-['Outfit'] text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      View Timeline
                    </button>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-500/10 flex items-center justify-between text-xs text-slate-400">
                    <span>{world.lessons.length} structured modules</span>
                    <span>+{world.lessons.reduce((acc, l) => acc + l.xpReward, 0)} Total XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
