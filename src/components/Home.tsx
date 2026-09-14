import React from 'react';
import { AppTheme, UserStats } from '../types';
import { soundFX } from '../utils/audio';
import { CODEDO_MASTER_WORLDS } from '../data/curriculum/masterCurriculumCatalog';

// Single source of truth for world identity (name, order, lesson count) --
// shared with Listing, so the two screens can never drift out of sync.
const getWorld = (order: number) => {
  const world = CODEDO_MASTER_WORLDS.find((w) => w.order === order);
  if (!world) {
    return {
      id: `world-${order}`,
      order,
      title: `World ${order}`,
      level: 'beginner' as const,
      levelTitle: 'Beginner',
      subtitle: '',
      badge: `W${order}`,
      bossTitle: `World ${order} Milestone`,
      bossDescription: '',
      lessons: [],
    };
  }
  return world;
};

// Shared styling for the "world name + lesson count" pair repeated across every
// node on the snake path, so completed/locked worlds stay visually consistent.
// Colors reuse the app's own neu-surface recipe; locked/disabled variants
// maintain a clean slate palette with high legibility while remaining visually distinct.
const getWorldTitleClass = (isDark: boolean, completed: boolean) =>
  `text-sm font-['Outfit'] font-bold ${
    completed ? 'text-inherit' : isDark ? 'text-slate-200' : 'text-slate-800'
  }`;

const getLessonTagClass = (isDark: boolean, completed: boolean) => {
  if (completed) {
    return `inline-flex w-fit mt-0.5 text-[10px] font-mono font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
      isDark
        ? 'bg-[#121824] border-emerald-500/30 text-emerald-400'
        : 'bg-[#e8eaf0] border-emerald-500/20 text-emerald-600'
    }`;
  }
  return `inline-flex w-fit mt-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
    isDark
      ? 'bg-[#121824] border-white/10 text-slate-300'
      : 'bg-[#dcdee4] border-black/10 text-slate-700'
  }`;
};

export const CHAPTER_1_NODES = [
  'node-1',
  'node-2',
  'node-3',
  'node-4',
  'node-5-top',
  'node-5-bot',
  'node-6',
  'node-7',
  'node-8',
];
export const CHAPTER_1_STRAIGHT = [4];

export const CHAPTER_2_NODES = [
  'node-9',
  'node-10',
  'node-11',
  'node-12',
  'node-13',
  'node-14',
  'node-15',
];

export const CHAPTER_3_NODES = [
  'node-16',
  'node-17',
  'node-18',
  'node-19',
  'node-20',
  'node-21',
  'node-22',
];

export const SEC1_DEFAULT_PATH =
  'M 54,25 C 54,72 306,72 306,118 C 306,164 54,164 54,210 C 54,256 306,256 306,302 C 306,354 180,344 180,396 L 180,638 C 180,689 306,679 306,730 C 306,776 54,776 54,822 C 54,868 306,868 306,914';
export const SEC1_DEFAULT_ACTIVE =
  'M 54,25 C 54,72 306,72 306,118 C 306,164 54,164 54,210 C 54,256 306,256 306,302 C 306,354 180,344 180,396';
export const SEC1_DEFAULT_VIEWBOX = '0 0 360 970';

export const SEC2_DEFAULT_PATH =
  'M 54,30 C 54,76 306,76 306,122 C 306,168 54,168 54,214 C 54,260 306,260 306,306 C 306,352 54,352 54,398 C 54,444 306,444 306,490 C 306,543 180,537 180,586';
export const SEC2_DEFAULT_VIEWBOX = '0 0 360 740';

export const SEC3_DEFAULT_PATH =
  'M 54,30 C 54,76 306,76 306,122 C 306,168 54,168 54,214 C 54,260 306,260 306,306 C 306,352 54,352 54,398 C 54,444 306,444 306,490 C 306,546 180,540 180,592';
export const SEC3_DEFAULT_VIEWBOX = '0 0 360 740';

interface Point {
  x: number;
  y: number;
}

function buildSmoothCurve(points: Point[], straightSegmentIndices: number[] = []): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (straightSegmentIndices.includes(i)) {
      d += ` L ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    } else {
      const dy = p1.y - p0.y;
      const cp1y = p0.y + dy * 0.55;
      const cp2y = p1.y - dy * 0.55;
      d += ` C ${p0.x.toFixed(1)},${cp1y.toFixed(1)} ${p1.x.toFixed(1)},${cp2y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`;
    }
  }
  return d;
}

interface SnakePathOverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  nodeIds: string[];
  straightSegments?: number[];
  activeUpToNodeId?: string;
  isDark: boolean;
  defaultPath: string;
  defaultActivePath?: string;
  defaultViewBox: string;
  gradientId?: string;
}

const SnakePathOverlay: React.FC<SnakePathOverlayProps> = ({
  containerRef,
  nodeIds,
  straightSegments = [],
  activeUpToNodeId,
  isDark,
  defaultPath,
  defaultActivePath,
  defaultViewBox,
  gradientId = 'secActiveGrad',
}) => {
  const [pathData, setPathData] = React.useState<{
    path: string;
    activePath?: string;
    viewBox: string;
  }>({
    path: defaultPath,
    activePath: defaultActivePath,
    viewBox: defaultViewBox,
  });

  const latestPathRef = React.useRef(pathData);
  latestPathRef.current = pathData;

  React.useEffect(() => {
    let rafId: number | null = null;
    let isCancelled = false;

    const updatePath = () => {
      if (isCancelled) return;
      try {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        if (containerRect.width < 10 || containerRect.height < 10) return;

        const points: Point[] = [];
        let activeIndex = -1;

        for (const id of nodeIds) {
          const el = container.querySelector(`[data-node-id="${id}"]`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;
            points.push({ x, y });
            if (id === activeUpToNodeId) {
              activeIndex = points.length - 1;
            }
          }
        }

        if (points.length >= 2) {
          const fullPath = buildSmoothCurve(points, straightSegments);
          let activePathStr: string | undefined = undefined;
          if (activeIndex > 0) {
            activePathStr = buildSmoothCurve(points.slice(0, activeIndex + 1), straightSegments);
          }
          const newViewBox = `0 0 ${containerRect.width.toFixed(0)} ${containerRect.height.toFixed(0)}`;

          const current = latestPathRef.current;
          if (
            current.path !== fullPath ||
            current.activePath !== activePathStr ||
            current.viewBox !== newViewBox
          ) {
            setPathData({
              path: fullPath,
              activePath: activePathStr,
              viewBox: newViewBox,
            });
          }
        }
      } catch (err) {
        console.warn('Path update fallback:', err);
      }
    };

    const scheduleUpdate = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePath);
    };

    scheduleUpdate();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate();
      });
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', scheduleUpdate);

    return () => {
      isCancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [containerRef, nodeIds, straightSegments, activeUpToNodeId]);

  // Only resolve activePath if activeUpToNodeId is provided
  const activePath = activeUpToNodeId ? (pathData.activePath ?? (activeUpToNodeId === 'node-5-top' ? defaultActivePath : undefined)) : undefined;
  const path = pathData.path || defaultPath;
  const viewBox = pathData.viewBox || defaultViewBox;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none stroke-current"
      fill="none"
      preserveAspectRatio="none"
      viewBox={viewBox}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Neumorphic highlight track */}
      <path
        d={path}
        opacity={isDark ? '0.35' : '0.85'}
        stroke={isDark ? '#475569' : '#ffffff'}
        strokeLinecap="round"
        strokeWidth="12"
      />
      {/* Recessed base track (greyed out track) */}
      <path
        d={path}
        stroke={isDark ? '#384764' : '#9ca3af'}
        strokeLinecap="round"
        strokeWidth="6"
        opacity={isDark ? '0.65' : '0.70'}
      />
      {/* Active gradient ribbon up to current/completed worlds */}
      {activePath && (
        <>
          <path
            d={activePath}
            stroke={isDark ? '#6366f1' : '#818cf8'}
            strokeLinecap="round"
            strokeWidth="8"
            opacity={isDark ? '0.22' : '0.30'}
          />
          <path
            d={activePath}
            stroke={`url(#${gradientId})`}
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </>
      )}
    </svg>
  );
};

interface WorldNodeProps {
  worldOrder: number;
  completedWorlds: number;
  align: 'left' | 'right';
  paddingTop?: string;
  isDark: boolean;
  nodeId: string;
  onWorldClick: (worldId: string) => void;
}

const StandardWorldNode: React.FC<WorldNodeProps> = ({
  worldOrder,
  completedWorlds,
  align,
  paddingTop = 'pt-11',
  isDark,
  nodeId,
  onWorldClick,
}) => {
  const world = getWorld(worldOrder);
  const isCompleted = worldOrder <= completedWorlds;
  const isCurrent = worldOrder === completedWorlds + 1;
  const isLocked = worldOrder > completedWorlds + 1;
  const isLeft = align === 'left';

  return (
    <div
      className={`relative w-full flex items-center z-10 ${paddingTop} ${
        isLeft ? 'justify-start pl-8' : 'justify-end pr-8'
      }`}
    >
      <div
        className={`flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all ${
          !isLeft ? 'flex-row-reverse text-right' : ''
        } ${isLocked ? 'opacity-70 hover:opacity-90' : 'opacity-100'}`}
        onClick={() => onWorldClick(world.id)}
      >
        <div
          data-node-id={nodeId}
          className={`w-11 h-11 rounded-2xl neu-raised flex items-center justify-center border transition-all ${
            isCurrent
              ? isDark
                ? 'bg-[#182030] border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] ring-2 ring-indigo-500/30'
                : 'bg-white border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)] ring-2 ring-indigo-500/30'
              : isCompleted
              ? isDark
                ? 'bg-[#151b28] border-indigo-500/30'
                : 'bg-[#e8eaf0] border-indigo-400/40'
              : isDark
              ? 'bg-[#151b28] border-white/10'
              : 'bg-[#e8eaf0] border-white/40'
          }`}
        >
          {isCompleted && (
            <span
              className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          )}
          {isCurrent && (
            <span
              className="material-symbols-outlined text-indigo-500 text-[20px] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          )}
          {isLocked && (
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
              lock
            </span>
          )}
        </div>
        <div className={`flex flex-col ${!isLeft ? 'text-right' : ''}`}>
          <div className={`flex items-center gap-1.5 ${!isLeft ? 'justify-end' : ''}`}>
            <span
              className={`text-[10px] font-mono font-bold ${
                isCompleted || isCurrent
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {String(world.order).padStart(2, '0')}
            </span>
            {isCurrent && (
              <span className="text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                CURRENT
              </span>
            )}
          </div>
          <span className={getWorldTitleClass(isDark, isCompleted || isCurrent)}>
            {world.title}
          </span>
          <span className={getLessonTagClass(isDark, isCompleted || isCurrent)}>
            {world.lessons.length} lessons
          </span>
        </div>
      </div>
    </div>
  );
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

  const sec1Ref = React.useRef<HTMLDivElement>(null);
  const sec2Ref = React.useRef<HTMLDivElement>(null);
  const sec3Ref = React.useRef<HTMLDivElement>(null);

  // Dynamic progress state from userStats
  const completedWorldsCount = userStats.completedWorlds ?? 4;
  const currentWorldOrder = Math.min(22, completedWorldsCount + 1);
  const currentWorld = getWorld(currentWorldOrder);
  const progressPct = ((completedWorldsCount / 22) * 100).toFixed(1);

  // Calculate dynamic active endpoints for each chapter's snake path
  // Chapter 1 (Worlds 1-8)
  const chapter1ActiveNode = React.useMemo(() => {
    if (completedWorldsCount <= 0) return undefined;
    if (completedWorldsCount === 1) return 'node-2';
    if (completedWorldsCount === 2) return 'node-3';
    if (completedWorldsCount === 3) return 'node-4';
    if (completedWorldsCount === 4) return 'node-5-top';
    if (completedWorldsCount === 5) return 'node-6';
    if (completedWorldsCount === 6) return 'node-7';
    return 'node-8';
  }, [completedWorldsCount]);

  // Chapter 2 (Worlds 9-15)
  const chapter2ActiveNode = React.useMemo(() => {
    if (completedWorldsCount < 8) return undefined;
    if (completedWorldsCount === 8) return undefined; // Just unlocked world 9, path inside chapter 2 not traversed yet
    const targetOrder = Math.min(completedWorldsCount + 1, 15);
    return `node-${targetOrder}`;
  }, [completedWorldsCount]);

  // Chapter 3 (Worlds 16-22)
  const chapter3ActiveNode = React.useMemo(() => {
    if (completedWorldsCount < 15) return undefined;
    if (completedWorldsCount === 15) return undefined; // Just unlocked world 16, path inside chapter 3 not traversed yet
    const targetOrder = Math.min(completedWorldsCount + 1, 22);
    return `node-${targetOrder}`;
  }, [completedWorldsCount]);

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
      handleWorldClick(currentWorld.id);
    }
  };

  return (
    <main
      className={`flex-1 flex flex-col relative w-full pb-24 pt-2 transition-colors duration-200 select-none ${
        isDark ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#e8eaf0] text-[#2e3040]'
      }`}
    >
      <div className="flex flex-col w-full min-w-0 pb-12 pt-2">
        {/* ================= SUB-HEADER CARD: Kotlin Journey Title & Dynamic Progress ================= */}
        <div className="px-4 sm:px-5 pt-2 pb-4">
          <div
            className={`neu-raised rounded-2xl p-3.5 sm:p-4 flex flex-col gap-2.5 border transition-all overflow-hidden ${
              isDark
                ? 'bg-[#151b28] border-white/10 text-white'
                : 'bg-[#e8eaf0] border-white/60 text-[#2e3040]'
            }`}
          >
            {/* Top Row: Track Identifier & Clickable Progress Status */}
            <div className="flex items-center justify-between gap-2 w-full">
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-sm ${
                  isDark
                    ? 'bg-slate-800/90 border-white/10 text-slate-200'
                    : 'bg-[#dcdee4] border-white/60 text-[#2e3040]'
                }`}
              >
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24">
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
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
                  Kotlin Journey
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onOpenCurriculum();
                }}
                className={`neu-pressed px-2.5 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 ${
                  isDark ? 'bg-[#121824] hover:bg-[#182030]' : 'bg-[#dcdee4] hover:bg-[#d5d7df]'
                }`}
                title="Open Curriculum Explorer"
              >
                <span className="text-[9px] font-['Plus_Jakarta_Sans'] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider whitespace-nowrap">
                  PROGRESS
                </span>
                <span className="font-mono text-xs font-bold text-inherit whitespace-nowrap">
                  {progressPct}%
                </span>
                <span className="material-symbols-outlined text-[13px] text-slate-400">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Headline Row: Full Width Single Line Title */}
            <div className="flex items-center min-w-0 pt-0.5">
              <h1 className="text-sm sm:text-base font-['Outfit'] font-bold tracking-tight whitespace-nowrap truncate text-inherit">
                World {currentWorld.order} of 22 • {currentWorld.title}
              </h1>
            </div>

            {/* Bottom Progress Bar */}
            <div
              className={`w-full h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-[#090d16]' : 'bg-slate-300/70'
              }`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm transition-all duration-500"
                style={{ width: `${Math.max(Number(progressPct), 4)}%` }}
              />
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
                CHAPTER 1 · BEGINNER · WORLDS 01–08
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 1: WORLDS 1-8 */}
          <div ref={sec1Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-12 flex flex-col items-center overflow-hidden">
          {/* Continuous SVG Path for Section 1 */}
          <SnakePathOverlay
            containerRef={sec1Ref}
            nodeIds={CHAPTER_1_NODES}
            straightSegments={CHAPTER_1_STRAIGHT}
            activeUpToNodeId={chapter1ActiveNode}
            isDark={isDark}
            gradientId="sec1Active"
            defaultViewBox={SEC1_DEFAULT_VIEWBOX}
            defaultPath={SEC1_DEFAULT_PATH}
            defaultActivePath={chapter1ActiveNode === 'node-5-top' ? SEC1_DEFAULT_ACTIVE : undefined}
          />

          {/* WORLD 1 (Left) */}
          <StandardWorldNode
            worldOrder={1}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-1"
            isDark={isDark}
            nodeId="node-1"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 2 (Right) */}
          <StandardWorldNode
            worldOrder={2}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-12"
            isDark={isDark}
            nodeId="node-2"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 3 (Left) */}
          <StandardWorldNode
            worldOrder={3}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-12"
            isDark={isDark}
            nodeId="node-3"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 4 (Right) */}
          <StandardWorldNode
            worldOrder={4}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-12"
            isDark={isDark}
            nodeId="node-4"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 5: CENTER FOCAL POINT */}
          <div className="relative w-full flex flex-col items-center pt-10 pb-4 z-20">
            {/* Attached Callout Card */}
            <div
              className={`w-full max-w-[320px] neu-raised rounded-2xl p-4 relative flex flex-col gap-2.5 border transition-all ${
                isDark
                  ? 'bg-[#151b28] border-white/10 text-white'
                  : 'bg-[#e8eaf0] border-white/80 text-[#2e3040]'
              }`}
            >
              <div data-node-id="node-5-top" className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none" />
              <div data-node-id="node-5-bot" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none" />
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    completedWorldsCount >= 5
                      ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                      : completedWorldsCount === 4
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                      : 'text-slate-500 bg-slate-500/10 border-slate-500/20'
                  }`}
                >
                  {completedWorldsCount >= 5
                    ? 'COMPLETED WORLD'
                    : completedWorldsCount === 4
                    ? 'CURRENT WORLD'
                    : 'LOCKED WORLD'}
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  World 05 / 22
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-['Outfit'] font-bold text-inherit tracking-tight">
                    05 · {getWorld(5).title}
                  </h3>
                  <span
                    className={`text-[11px] font-semibold font-mono ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  >
                    {completedWorldsCount >= 5
                      ? `${getWorld(5).lessons.length} / ${getWorld(5).lessons.length}`
                      : completedWorldsCount === 4
                      ? `7 / ${getWorld(5).lessons.length}`
                      : `0 / ${getWorld(5).lessons.length}`}{' '}
                    lessons
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
                <span>
                  {completedWorldsCount >= 5
                    ? 'REVIEW WORLD 5'
                    : completedWorldsCount === 4
                    ? 'START WORLD 5'
                    : 'EXPLORE WORLD 5'}
                </span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* WORLD 6 (Right) */}
          <StandardWorldNode
            worldOrder={6}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-10"
            isDark={isDark}
            nodeId="node-6"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 7 (Left) */}
          <StandardWorldNode
            worldOrder={7}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-12"
            isDark={isDark}
            nodeId="node-7"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 8 (Right) */}
          <StandardWorldNode
            worldOrder={8}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-12"
            isDark={isDark}
            nodeId="node-8"
            onWorldClick={handleWorldClick}
          />
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
                className={`text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full neu-pressed border ${
                  isDark ? 'bg-[#121824] border-white/5' : 'bg-[#e8eaf0] border-black/5'
                }`}
              >
                CHAPTER 2 · INTERMEDIATE · WORLDS 09–15
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 2: WORLDS 9-15 */}
          <div ref={sec2Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-12 flex flex-col items-center overflow-hidden">
          <SnakePathOverlay
            containerRef={sec2Ref}
            nodeIds={CHAPTER_2_NODES}
            activeUpToNodeId={chapter2ActiveNode}
            isDark={isDark}
            gradientId="sec2Active"
            defaultViewBox={SEC2_DEFAULT_VIEWBOX}
            defaultPath={SEC2_DEFAULT_PATH}
          />

          {/* WORLD 9 (Left) */}
          <StandardWorldNode
            worldOrder={9}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-3"
            isDark={isDark}
            nodeId="node-9"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 10 (Right) */}
          <StandardWorldNode
            worldOrder={10}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-10"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 11 (Left) */}
          <StandardWorldNode
            worldOrder={11}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-11"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 12 (Right) */}
          <StandardWorldNode
            worldOrder={12}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-12"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 13 (Left) */}
          <StandardWorldNode
            worldOrder={13}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-13"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 14 (Right) */}
          <StandardWorldNode
            worldOrder={14}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-14"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 15: Chapter Boss Milestone (Center) */}
          <div className="relative w-full flex items-center justify-center pt-11 z-10">
            <div
              className={`flex flex-col items-center cursor-pointer active:scale-95 transition-all ${
                completedWorldsCount >= 14 ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              }`}
              onClick={() => handleWorldClick('world-15')}
            >
              <div
                data-node-id="node-15"
                className={`w-12 h-12 rounded-2xl neu-raised flex items-center justify-center border relative transition-all ${
                  completedWorldsCount >= 15
                    ? isDark
                      ? 'bg-[#151b28] border-indigo-500/40'
                      : 'bg-[#e8eaf0] border-indigo-500/40'
                    : completedWorldsCount === 14
                    ? isDark
                      ? 'bg-[#1c2236] border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] ring-2 ring-indigo-500/30'
                      : 'bg-white border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.3)] ring-2 ring-indigo-500/30'
                    : isDark
                    ? 'bg-[#151b28] border-white/10'
                    : 'bg-[#e8eaf0] border-white/50'
                }`}
              >
                {completedWorldsCount >= 15 ? (
                  <span
                    className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : completedWorldsCount === 14 ? (
                  <span className="material-symbols-outlined text-indigo-500 text-[22px] animate-pulse">
                    shield
                  </span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                      shield
                    </span>
                    <span className="material-symbols-outlined text-[12px] text-slate-400 absolute bottom-1 right-1">
                      lock
                    </span>
                  </>
                )}
              </div>
              <span
                className={`text-[10px] font-mono font-medium mt-1 ${
                  completedWorldsCount >= 14
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                15
              </span>
              <span className={getWorldTitleClass(isDark, completedWorldsCount >= 14)}>
                {getWorld(15).title}
              </span>
              <span className={getLessonTagClass(isDark, completedWorldsCount >= 14)}>
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
                className={`text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full neu-pressed border ${
                  isDark ? 'bg-[#121824] border-white/5' : 'bg-[#e8eaf0] border-black/5'
                }`}
              >
                CHAPTER 3 · EXPERIENCED · WORLDS 16–22
              </span>
              <div className="flex-1 h-[1px] bg-slate-300/60 dark:bg-white/10"></div>
            </div>
          </div>

          {/* SNAKE PATH SECTION 3: WORLDS 16-22 */}
          <div ref={sec3Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-3 pb-12 flex flex-col items-center overflow-hidden">
          <SnakePathOverlay
            containerRef={sec3Ref}
            nodeIds={CHAPTER_3_NODES}
            activeUpToNodeId={chapter3ActiveNode}
            isDark={isDark}
            gradientId="sec3Active"
            defaultViewBox={SEC3_DEFAULT_VIEWBOX}
            defaultPath={SEC3_DEFAULT_PATH}
          />

          {/* WORLD 16 (Left) */}
          <StandardWorldNode
            worldOrder={16}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-3"
            isDark={isDark}
            nodeId="node-16"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 17 (Right) */}
          <StandardWorldNode
            worldOrder={17}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-17"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 18 (Left) */}
          <StandardWorldNode
            worldOrder={18}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-18"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 19 (Right) */}
          <StandardWorldNode
            worldOrder={19}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-19"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 20 (Left) */}
          <StandardWorldNode
            worldOrder={20}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-20"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 21 (Right) */}
          <StandardWorldNode
            worldOrder={21}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-11"
            isDark={isDark}
            nodeId="node-21"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 22: GRAND PINNACLE (Center) */}
          <div className="relative w-full max-w-[320px] pt-12 pb-4 z-20 flex flex-col items-center">
            <div
              className={`neu-raised rounded-3xl p-4 w-full flex items-center justify-between border cursor-pointer active:scale-95 transition-all relative ${
                completedWorldsCount >= 21 ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              } ${
                completedWorldsCount >= 22
                  ? isDark
                    ? 'bg-[#151b28] border-indigo-500/40 text-white'
                    : 'bg-[#e8eaf0] border-indigo-500/40 text-[#2e3040]'
                  : completedWorldsCount === 21
                  ? isDark
                    ? 'bg-[#1e243a] border-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.4)] text-white'
                    : 'bg-white border-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.3)] text-[#2e3040]'
                  : isDark
                  ? 'bg-[#151b28] border-white/10 text-white'
                  : 'bg-[#e8eaf0] border-white/60 text-[#2e3040]'
              }`}
              onClick={() => handleWorldClick('world-22')}
            >
              <div data-node-id="node-22" className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none" />
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl neu-pressed flex items-center justify-center relative ${
                    isDark ? 'bg-[#121824]' : 'bg-[#e8eaf0]'
                  }`}
                >
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[26px]">
                    military_tech
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
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
                {completedWorldsCount >= 22 ? (
                  <span
                    className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : completedWorldsCount === 21 ? (
                  <span className="material-symbols-outlined text-indigo-500 text-[18px] animate-pulse">
                    play_arrow
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-slate-400 text-[16px]">lock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};
