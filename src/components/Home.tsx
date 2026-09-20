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

// Temporary availability rule shared with Listing: show a world as active as
// soon as all of its five-stage lesson data exists. Replace with real learner
// completion/unlocking when progression is connected to the journey map.
const hasCollectedWorldData = (worldOrder: number) => {
  const world = getWorld(worldOrder);
  return world.lessons.length > 0 && world.lessons.every((lesson) => Boolean(lesson.fiveStageLessonKey));
};

// Shared styling for the "world name + lesson count" pair repeated across every
// node on the snake path, so completed/locked worlds stay visually consistent.
// Colors reuse the app's own neu-surface recipe; locked/disabled variants
// maintain a clean slate palette with high legibility while remaining visually distinct.
const getWorldTitleClass = (isDark: boolean, isLocked: boolean) =>
  `text-sm font-['Outfit'] ${
    isLocked
      ? isDark
        ? 'text-slate-300 font-semibold'
        : 'text-slate-700 font-semibold'
      : isDark
      ? 'text-slate-100 font-bold'
      : 'text-slate-900 font-bold'
  }`;

const getLessonTagClass = (isDark: boolean, isLocked: boolean) =>
  `inline-flex w-fit mt-0.5 text-[10px] font-mono font-medium tracking-wide px-1.5 py-0.5 rounded ${
    isLocked
      ? isDark
        ? 'bg-slate-800/40 border border-white/5 text-slate-400'
        : 'bg-slate-100/90 border border-slate-200/80 text-slate-500'
      : isDark
      ? 'bg-slate-800/50 border border-white/5 text-slate-400'
      : 'bg-slate-100/90 border border-slate-200/80 text-slate-500'
  }`;

const getWorldIcon = (worldOrder: number) => {
  const icons = [
    'code',
    'terminal',
    'data_object',
    'account_tree',
    'function',
    'visibility',
    'security',
    'category',
    'science',
    'view_list',
    'hub',
    'data_object',
    'inventory_2',
    'bolt',
    'workspace_premium',
    'architecture',
    'swap_vert',
    'tune',
    'memory',
    'cloud',
    'rocket_launch',
    'military_tech',
  ];
  return icons[worldOrder - 1] ?? 'code';
};

const WORLD_ICON_STYLES: Record<
  number,
  { lightIcon: string; darkIcon: string; lightBg: string; darkBg: string; lightBorder: string; darkBorder: string }
> = {
  1:  { lightIcon: 'text-indigo-700',  darkIcon: 'text-indigo-400',  lightBg: 'bg-indigo-50/90',  darkBg: 'bg-indigo-950/40',  lightBorder: 'border-indigo-200/90',  darkBorder: 'border-indigo-500/30' },
  2:  { lightIcon: 'text-violet-700',  darkIcon: 'text-violet-400',  lightBg: 'bg-violet-50/90',  darkBg: 'bg-violet-950/40',  lightBorder: 'border-violet-200/90',  darkBorder: 'border-violet-500/30' },
  3:  { lightIcon: 'text-blue-700',    darkIcon: 'text-blue-400',    lightBg: 'bg-blue-50/90',    darkBg: 'bg-blue-950/40',    lightBorder: 'border-blue-200/90',    darkBorder: 'border-blue-500/30' },
  4:  { lightIcon: 'text-cyan-700',    darkIcon: 'text-cyan-400',    lightBg: 'bg-cyan-50/90',    darkBg: 'bg-cyan-950/40',    lightBorder: 'border-cyan-200/90',    darkBorder: 'border-cyan-500/30' },
  5:  { lightIcon: 'text-fuchsia-700', darkIcon: 'text-fuchsia-400', lightBg: 'bg-fuchsia-50/90', darkBg: 'bg-fuchsia-950/40', lightBorder: 'border-fuchsia-200/90', darkBorder: 'border-fuchsia-500/30' },
  6:  { lightIcon: 'text-amber-700',   darkIcon: 'text-amber-400',   lightBg: 'bg-amber-50/90',   darkBg: 'bg-amber-950/40',   lightBorder: 'border-amber-200/90',   darkBorder: 'border-amber-500/30' },
  7:  { lightIcon: 'text-rose-700',    darkIcon: 'text-rose-400',    lightBg: 'bg-rose-50/90',    darkBg: 'bg-rose-950/40',    lightBorder: 'border-rose-200/90',    darkBorder: 'border-rose-500/30' },
  8:  { lightIcon: 'text-teal-700',    darkIcon: 'text-teal-400',    lightBg: 'bg-teal-50/90',    darkBg: 'bg-teal-950/40',    lightBorder: 'border-teal-200/90',    darkBorder: 'border-teal-500/30' },
  9:  { lightIcon: 'text-purple-700',  darkIcon: 'text-purple-400',  lightBg: 'bg-purple-50/90',  darkBg: 'bg-purple-950/40',  lightBorder: 'border-purple-200/90',  darkBorder: 'border-purple-500/30' },
  10: { lightIcon: 'text-sky-700',     darkIcon: 'text-sky-400',     lightBg: 'bg-sky-50/90',     darkBg: 'bg-sky-950/40',     lightBorder: 'border-sky-200/90',     darkBorder: 'border-sky-500/30' },
  11: { lightIcon: 'text-indigo-700',  darkIcon: 'text-indigo-400',  lightBg: 'bg-indigo-50/90',  darkBg: 'bg-indigo-950/40',  lightBorder: 'border-indigo-200/90',  darkBorder: 'border-indigo-500/30' },
  12: { lightIcon: 'text-emerald-700', darkIcon: 'text-emerald-400', lightBg: 'bg-emerald-50/90', darkBg: 'bg-emerald-950/40', lightBorder: 'border-emerald-200/90', darkBorder: 'border-emerald-500/30' },
  13: { lightIcon: 'text-orange-700',  darkIcon: 'text-orange-400',  lightBg: 'bg-orange-50/90',  darkBg: 'bg-orange-950/40',  lightBorder: 'border-orange-200/90',  darkBorder: 'border-orange-500/30' },
  14: { lightIcon: 'text-pink-700',    darkIcon: 'text-pink-400',    lightBg: 'bg-pink-50/90',    darkBg: 'bg-pink-950/40',    lightBorder: 'border-pink-200/90',    darkBorder: 'border-pink-500/30' },
  15: { lightIcon: 'text-violet-700',  darkIcon: 'text-violet-400',  lightBg: 'bg-violet-50/90',  darkBg: 'bg-violet-950/40',  lightBorder: 'border-violet-200/90',  darkBorder: 'border-violet-500/30' },
  16: { lightIcon: 'text-amber-700',   darkIcon: 'text-amber-400',   lightBg: 'bg-amber-50/90',   darkBg: 'bg-amber-950/40',   lightBorder: 'border-amber-200/90',   darkBorder: 'border-amber-500/30' },
  17: { lightIcon: 'text-red-700',     darkIcon: 'text-red-400',     lightBg: 'bg-red-50/90',     darkBg: 'bg-red-950/40',     lightBorder: 'border-red-200/90',     darkBorder: 'border-red-500/30' },
  18: { lightIcon: 'text-emerald-700', darkIcon: 'text-emerald-400', lightBg: 'bg-emerald-50/90', darkBg: 'bg-emerald-950/40', lightBorder: 'border-emerald-200/90', darkBorder: 'border-emerald-500/30' },
  19: { lightIcon: 'text-purple-700',  darkIcon: 'text-purple-400',  lightBg: 'bg-purple-50/90',  darkBg: 'bg-purple-950/40',  lightBorder: 'border-purple-200/90',  darkBorder: 'border-purple-500/30' },
  20: { lightIcon: 'text-cyan-700',    darkIcon: 'text-cyan-400',    lightBg: 'bg-cyan-50/90',    darkBg: 'bg-cyan-950/40',    lightBorder: 'border-cyan-200/90',    darkBorder: 'border-cyan-500/30' },
  21: { lightIcon: 'text-orange-700',  darkIcon: 'text-orange-400',  lightBg: 'bg-orange-50/90',  darkBg: 'bg-orange-950/40',  lightBorder: 'border-orange-200/90',  darkBorder: 'border-orange-500/30' },
  22: { lightIcon: 'text-amber-700',   darkIcon: 'text-amber-400',   lightBg: 'bg-amber-50/90',   darkBg: 'bg-amber-950/40',   lightBorder: 'border-amber-200/90',   darkBorder: 'border-amber-500/30' },
};

export const CHAPTER_1_NODES = [
  'node-beginner-start',
  'node-1',
  'node-2',
  'node-3',
  'node-4',
  'node-5',
  'node-6',
  'node-7',
  'node-8',
];
export const CHAPTER_1_STRAIGHT = [0];

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

const ALL_JOURNEY_NODES = [
  ...CHAPTER_1_NODES,
  ...CHAPTER_2_NODES,
  ...CHAPTER_3_NODES,
];

export const SEC1_DEFAULT_PATH =
  'M 54,25 C 54,72 306,72 306,118 C 306,164 54,164 54,210 C 54,256 306,256 306,302 C 306,348 54,348 54,394 C 54,440 306,440 306,486 C 306,532 54,532 54,578 C 54,624 306,624 306,670';
export const SEC1_DEFAULT_ACTIVE =
  'M 54,25 C 54,72 306,72 306,118 C 306,164 54,164 54,210 C 54,256 306,256 306,302 C 306,348 54,348 54,394';
export const SEC1_DEFAULT_VIEWBOX = '0 0 360 740';

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
    if (straightSegmentIndices.includes(i) && Math.abs(p1.x - p0.x) < 8) {
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
    startY: number;
    fadeEndY: number;
  }>({
    path: defaultPath,
    activePath: defaultActivePath,
    viewBox: defaultViewBox,
    startY: 0,
    fadeEndY: 0,
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
          // If the first segment is a lead-in from the Beginner strip, align horizontally with World 1
          if (straightSegments.includes(0)) {
            points[0].x = points[1].x;
          }

          const fullPath = buildSmoothCurve(points, straightSegments);
          let activePathStr: string | undefined = undefined;
          if (activeIndex > 0) {
            activePathStr = buildSmoothCurve(points.slice(0, activeIndex + 1), straightSegments);
          }
          const newViewBox = `0 0 ${containerRect.width.toFixed(0)} ${containerRect.height.toFixed(0)}`;
          const startY = points[0].y;
          const deltaY = Math.max(30, points[1].y - startY);
          // Gradual initial fade from startY down towards World 1 (reaching full opacity comfortably before World 1)
          const fadeEndY = straightSegments.includes(0)
            ? startY + Math.min(deltaY * 0.75, 55)
            : startY;

          const current = latestPathRef.current;
          if (
            current.path !== fullPath ||
            current.activePath !== activePathStr ||
            current.viewBox !== newViewBox ||
            current.startY !== startY ||
            current.fadeEndY !== fadeEndY
          ) {
            setPathData({
              path: fullPath,
              activePath: activePathStr,
              viewBox: newViewBox,
              startY,
              fadeEndY,
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
  const activePath = activeUpToNodeId ? (pathData.activePath ?? (activeUpToNodeId === 'node-5' ? defaultActivePath : undefined)) : undefined;
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
        {/* Active path gradient */}
        <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Base track gradient starting in Beginner indigo and transitioning to base track slate */}
        <linearGradient
          id={`${gradientId}-baseTrackGrad`}
          x1="0"
          y1={pathData.startY}
          x2="0"
          y2={pathData.startY + 160}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="35%" stopColor={isDark ? '#4f46e5' : '#818cf8'} />
          <stop offset="100%" stopColor={isDark ? '#384764' : '#9ca3af'} />
        </linearGradient>

        {/* Highlight track gradient */}
        <linearGradient
          id={`${gradientId}-highlightTrackGrad`}
          x1="0"
          y1={pathData.startY}
          x2="0"
          y2={pathData.startY + 160}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={isDark ? '#818cf8' : '#c7d2fe'} />
          <stop offset="100%" stopColor={isDark ? '#475569' : '#ffffff'} />
        </linearGradient>

        {/* Gradual opacity mask at the path origin so the path emerges softly from the Beginner strip */}
        {pathData.fadeEndY > pathData.startY && (
          <>
            <linearGradient
              id={`${gradientId}-fadeMaskGrad`}
              x1="0"
              y1={pathData.startY}
              x2="0"
              y2={pathData.fadeEndY}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            <mask
              id={`${gradientId}-startMask`}
              maskUnits="userSpaceOnUse"
              x="-1000"
              y="0"
              width="4000"
              height="10000"
            >
              <rect x="-1000" y="0" width="4000" height={Math.max(0, pathData.startY)} fill="#000000" />
              <rect
                x="-1000"
                y={pathData.startY}
                width="4000"
                height={Math.max(1, pathData.fadeEndY - pathData.startY)}
                fill={`url(#${gradientId}-fadeMaskGrad)`}
              />
              <rect
                x="-1000"
                y={pathData.fadeEndY}
                width="4000"
                height="20000"
                fill="#ffffff"
              />
            </mask>
          </>
        )}
      </defs>

      <g mask={pathData.fadeEndY > pathData.startY ? `url(#${gradientId}-startMask)` : undefined}>
        {/* Neumorphic highlight track */}
        <path
          d={path}
          opacity={isDark ? '0.35' : '0.85'}
          stroke={`url(#${gradientId}-highlightTrackGrad)`}
          strokeLinecap="round"
          strokeWidth="12"
        />
        {/* Recessed base track (greyed out track) */}
        <path
          d={path}
          stroke={`url(#${gradientId}-baseTrackGrad)`}
          strokeLinecap="round"
          strokeWidth="6"
          opacity={isDark ? '0.75' : '0.75'}
        />
        {/* Active gradient ribbon up to current/completed worlds */}
        {activePath && (
          <>
            <path
              d={activePath}
              stroke={isDark ? '#6366f1' : '#818cf8'}
              strokeLinecap="round"
              strokeWidth="8"
              opacity={isDark ? '0.25' : '0.30'}
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
        {/* Keep a dim traveling highlight on the full route. */}
        <path
          d={path}
          className="snake-path-shimmer"
          stroke={isDark ? '#94a3b8' : '#ffffff'}
          strokeDasharray="18 180"
          strokeLinecap="round"
          strokeWidth="3"
          opacity={isDark ? '0.5' : '0.7'}
        />
        {/* Add a brighter traveling highlight over the enabled blue route. */}
        {activePath && (
          <path
            d={activePath}
            className="snake-path-shimmer"
            stroke={isDark ? '#c7d2fe' : '#ffffff'}
            strokeDasharray="18 180"
            strokeLinecap="round"
            strokeWidth="3"
            opacity={isDark ? '0.95' : '1'}
          />
        )}
      </g>
    </svg>
  );
};

interface WorldNodeProps {
  worldOrder: number;
  completedWorlds: number;
  align: 'left' | 'right' | 'center';
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
  const worldTheme = WORLD_ICON_STYLES[worldOrder] || WORLD_ICON_STYLES[1];
  const isDataAvailable = hasCollectedWorldData(worldOrder);
  const isCompleted = isDataAvailable && worldOrder <= completedWorlds;
  const isCurrent = isDataAvailable && worldOrder === completedWorlds + 1;
  const isLocked = !isDataAvailable || worldOrder > completedWorlds + 1;
  const isAvailableToStart = isDataAvailable && !isLocked && !isCompleted && !isCurrent;
  const isLeft = align === 'left';

  if (isCurrent) {
    return (
      <div className={`relative w-full flex justify-center ${paddingTop} pb-4 z-20`} style={{ marginTop: 'var(--path-gap, 0px)' }}>
        <div
          className={`w-full max-w-[320px] neu-raised rounded-2xl p-4 relative flex flex-col gap-2.5 border transition-all ${
            isDark
              ? 'bg-[#151b28] border-indigo-500/40 text-white shadow-[0_0_16px_rgba(99,102,241,0.2)]'
              : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
          }`}
        >
          <div data-node-id={nodeId} className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none" />
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                isDark
                  ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30'
                  : 'text-indigo-700 bg-indigo-50 border-indigo-200'
              }`}
            >
              CURRENT WORLD
            </span>
            <span
              className={`text-[11px] font-semibold font-mono whitespace-nowrap ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              0 / {world.lessons.length} lessons
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-['Outfit'] font-bold text-inherit tracking-tight">
              World {String(world.order).padStart(2, '0')} · {world.title}
            </h3>
            <p className={`text-xs leading-snug mt-1 ${
              isDark ? 'text-slate-300' : 'text-slate-700 font-normal'
            }`}>
              Continue your journey through {world.title}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onWorldClick(world.id)}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-['Outfit'] font-semibold text-sm flex items-center justify-center gap-2 cta-glow active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>START WORLD {world.order}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full flex items-center z-10 ${paddingTop} ${
        isLeft ? 'justify-start pl-8' : align === 'right' ? 'justify-end pr-8' : 'justify-center'
      }`}
      style={{ marginTop: 'var(--path-gap, 0px)' }}
    >
      <div
        className={`flex items-center gap-2.5 transition-all ${
          !isLeft && align !== 'center' ? 'flex-row-reverse text-right' : ''
        } ${
          isLocked
            ? 'opacity-65 grayscale-[0.35] hover:opacity-80 cursor-not-allowed select-none'
            : 'opacity-100 cursor-pointer active:scale-95'
        }`}
        onClick={() => {
          onWorldClick(world.id);
        }}
      >
        <div
          data-node-id={nodeId}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
            isCurrent
              ? isDark
                ? 'neu-raised bg-[#182030] border-2 border-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.5)] ring-2 ring-indigo-500/30'
                : 'neu-raised bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-indigo-400 shadow-[0_4px_16px_rgba(99,102,241,0.35)] ring-4 ring-indigo-500/20'
              : isCompleted
              ? isDark
                ? 'neu-raised bg-[#151b28] border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)]'
                : 'neu-raised bg-emerald-50/95 border-2 border-emerald-300/90 shadow-xs'
              : isLocked
              ? isDark
                ? `neu-raised ${worldTheme.darkBg} border ${worldTheme.darkBorder} shadow-xs`
                : `neu-raised ${worldTheme.lightBg} border ${worldTheme.lightBorder} shadow-xs hover:border-slate-300`
              : isAvailableToStart
              ? isDark
                ? 'neu-raised bg-[#161d2c] border-2 border-indigo-500/50 shadow-sm'
                : 'neu-raised bg-indigo-50/90 border-2 border-indigo-400 shadow-xs'
              : isDark
              ? `neu-raised ${worldTheme.darkBg} border ${worldTheme.darkBorder} shadow-xs`
              : `neu-raised ${worldTheme.lightBg} border ${worldTheme.lightBorder} shadow-xs hover:border-slate-300`
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isCurrent
                ? isDark
                  ? 'text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] font-bold'
                  : 'text-white drop-shadow-xs font-bold'
                : isCompleted
                ? isDark
                  ? 'text-emerald-400 font-bold'
                  : 'text-emerald-700 font-bold'
                : isLocked
                ? isDark
                  ? `${worldTheme.darkIcon} font-medium opacity-80`
                  : `${worldTheme.lightIcon} font-bold opacity-80`
                : isAvailableToStart
                ? isDark
                  ? 'text-indigo-400 font-bold'
                  : 'text-indigo-700 font-bold'
                : isDark
                ? `${worldTheme.darkIcon} font-medium`
                : `${worldTheme.lightIcon} font-bold`
            }`}
          >
            {isLocked ? 'lock' : getWorldIcon(worldOrder)}
          </span>
        </div>
        <div className={`flex flex-col ${!isLeft && align !== 'center' ? 'text-right' : ''}`}>
          <div className={`flex items-center gap-1.5 ${!isLeft && align !== 'center' ? 'justify-end' : ''}`}>
            <span
              className={`inline-flex w-fit text-[10px] font-mono font-extrabold tracking-wide px-2.5 py-0.5 rounded-md border shadow-xs ${
                isCompleted
                  ? isDark
                    ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    : 'text-emerald-800 bg-emerald-100 border-emerald-300 font-bold'
                  : isCurrent
                  ? isDark
                    ? 'text-indigo-200 bg-indigo-500/25 border-indigo-400/50 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                    : 'text-indigo-800 bg-indigo-100 border-indigo-300 ring-1 ring-indigo-500/25 font-bold'
                  : isLocked
                  ? isDark
                    ? 'text-slate-300 bg-slate-800/80 border-white/10 font-semibold'
                    : 'text-slate-700 bg-white border-slate-300/80 font-semibold'
                  : isAvailableToStart
                  ? isDark
                    ? 'text-indigo-200 bg-indigo-500/20 border-indigo-400/35'
                    : 'text-indigo-800 bg-indigo-50 border-indigo-200 font-bold'
                  : isDark
                  ? 'text-slate-400 bg-slate-800/80 border-white/10'
                  : 'text-slate-700 bg-white border-slate-300/80 font-semibold'
              }`}
            >
              World {String(world.order).padStart(2, '0')}
            </span>
            {isCurrent && (
              <span className="text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-400/40 shadow-xs">
                CURRENT
              </span>
            )}
            {isAvailableToStart && (
              <span className="text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-500/25 shadow-xs">
                AVAILABLE
              </span>
            )}
          </div>
          <span className={getWorldTitleClass(isDark, isLocked)}>
            {world.title}
          </span>
          <span className={getLessonTagClass(isDark, isLocked)}>
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
  pathGap: number;
}

export const Home: React.FC<HomeProps> = ({
  theme,
  userStats,
  onOpenCurriculum,
  onSelectWorld,
  onStartLesson,
  pathGap,
}) => {
  const isDark = theme === 'dark';

  const sec1Ref = React.useRef<HTMLDivElement>(null);
  const sec2Ref = React.useRef<HTMLDivElement>(null);
  const sec3Ref = React.useRef<HTMLDivElement>(null);
  const journeyRef = React.useRef<HTMLDivElement>(null);

  // Dynamic progress state from userStats
  const completedWorldsCount = userStats.completedWorlds ?? 0;
  const currentWorldOrder = Math.min(22, completedWorldsCount + 1);
  const currentWorld = getWorld(currentWorldOrder);
  const progressPct = ((completedWorldsCount / 22) * 100).toFixed(1);
  const activeChapter = currentWorldOrder <= 8 ? 1 : currentWorldOrder <= 15 ? 2 : 3;
  const world15DataAvailable = hasCollectedWorldData(15);
  const world15Unlocked = world15DataAvailable && completedWorldsCount >= 14;
  const world15Completed = world15DataAvailable && completedWorldsCount >= 15;
  const world15Current = world15DataAvailable && completedWorldsCount === 14;

  // Calculate dynamic active endpoints for each chapter's snake path
  // Chapter 1 (Worlds 1-8)
  const chapter1ActiveNode = React.useMemo(() => {
    if (completedWorldsCount <= 0) return undefined;
    if (completedWorldsCount === 1) return 'node-2';
    if (completedWorldsCount === 2) return 'node-3';
    if (completedWorldsCount === 3) return 'node-4';
    if (completedWorldsCount === 4) return 'node-5';
    if (completedWorldsCount === 5) return 'node-6';
    if (completedWorldsCount === 6) return 'node-7';
    return 'node-8';
  }, [completedWorldsCount]);

  const journeyActiveNode = React.useMemo(() => {
    if (completedWorldsCount <= 0) return 'node-1';
    if (completedWorldsCount === 1) return 'node-2';
    if (completedWorldsCount === 2) return 'node-3';
    if (completedWorldsCount === 3) return 'node-4';
    if (completedWorldsCount === 4) return 'node-5';
    if (completedWorldsCount === 5) return 'node-6';
    if (completedWorldsCount === 6) return 'node-7';
    if (completedWorldsCount === 7) return 'node-8';
    if (completedWorldsCount === 8) return 'node-9';
    if (completedWorldsCount === 9) return 'node-10';
    if (completedWorldsCount === 10) return 'node-11';
    if (completedWorldsCount === 11) return 'node-12';
    if (completedWorldsCount === 12) return 'node-13';
    if (completedWorldsCount === 13) return 'node-14';
    if (completedWorldsCount === 14) return 'node-15';
    if (completedWorldsCount === 15) return 'node-16';
    if (completedWorldsCount === 16) return 'node-17';
    if (completedWorldsCount === 17) return 'node-18';
    if (completedWorldsCount === 18) return 'node-19';
    if (completedWorldsCount === 19) return 'node-20';
    if (completedWorldsCount === 20) return 'node-21';
    return 'node-22';
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
    const worldOrder = Number(worldId.replace('world-', ''));
    if (!hasCollectedWorldData(worldOrder)) return;
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
                : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
            }`}
          >
            {/* Top Row: Track Identifier & Clickable Progress Status */}
            <div className="flex items-center justify-between gap-2 w-full">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-xs ${
                  isDark
                    ? 'bg-slate-800/90 border-white/10 text-slate-200'
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
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
                className={`neu-pressed px-2.5 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 border ${
                  isDark
                    ? 'bg-[#121824] hover:bg-[#182030] border-transparent'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-800'
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
                isDark ? 'bg-[#090d16]' : 'bg-slate-100 border border-slate-200/60'
              }`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm transition-all duration-500"
                style={{ width: `${Math.max(Number(progressPct), 4)}%` }}
              />
            </div>
          </div>
        </div>

        <div
          ref={journeyRef}
          className="relative w-full"
          style={{ '--path-gap': `${pathGap}px` } as React.CSSProperties}
        >
          <SnakePathOverlay
            containerRef={journeyRef}
            nodeIds={ALL_JOURNEY_NODES}
            straightSegments={[0]}
            activeUpToNodeId={journeyActiveNode}
            isDark={isDark}
            gradientId="journeyActive"
            defaultViewBox="0 0 360 2200"
            defaultPath="M 54,0 L 54,60 C 54,107 306,107 306,153 C 306,199 54,199 54,245 C 54,291 306,291 306,337 C 306,383 54,383 54,430 C 54,475 306,475 306,520 C 306,565 54,565 54,610 C 54,655 306,655 306,700"
          />

        {/* ================= SECTION 1: BEGINNER (Worlds 1-8) ================= */}
        <section className="relative w-full">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-b ${
              isDark
                ? activeChapter === 1
                  ? 'bg-indigo-950/55 border-indigo-400/35 shadow-[0_4px_18px_rgba(99,102,241,0.22)]'
                  : 'bg-indigo-950/25 border-indigo-400/15 shadow-[0_4px_16px_rgba(99,102,241,0.1)]'
                : activeChapter === 1
                ? 'bg-white/95 border-indigo-200 shadow-[0_4px_20px_rgba(99,102,241,0.12)]'
                : 'bg-[#eceef4]/95 border-slate-300/80 shadow-xs'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border transition-all ${
                  activeChapter === 1
                    ? isDark
                      ? 'text-indigo-200 bg-indigo-500/20 border-indigo-400/40 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                      : 'text-indigo-800 bg-indigo-50 border-indigo-300 shadow-xs'
                    : isDark
                    ? 'text-indigo-300 bg-indigo-500/10 border-indigo-300/30 shadow-sm'
                    : 'text-indigo-800 bg-white border-indigo-200 shadow-xs'
                }`}
              >
                BEGINNER · WORLDS 1–8
                {activeChapter === 1 && (
                  <span className="ml-2 text-[8px] tracking-[0.16em] font-bold text-indigo-600 dark:text-indigo-300">
                    ACTIVE
                  </span>
                )}
              </span>
              <div
                className={`flex-1 h-[1px] ${
                  isDark ? 'bg-white/10' : activeChapter === 1 ? 'bg-indigo-200' : 'bg-slate-300/80'
                }`}
              />
            </div>
          </div>

          {/* SNAKE PATH SECTION 1: WORLDS 1-8 */}
          <div ref={sec1Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-0 pb-8 flex flex-col items-center overflow-hidden">
            {/* Snake path start anchor flush with the bottom border of the Beginner strip */}
            <div className="relative w-full flex items-center justify-start pl-8 pointer-events-none -mt-px">
              <div
                data-node-id="node-beginner-start"
                className="w-11 h-0 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Continuous SVG Path for Section 1 */}
            {/* WORLD 1 (Left) */}
            <StandardWorldNode
              worldOrder={1}
              completedWorlds={completedWorldsCount}
              align="left"
              paddingTop="pt-16"
              isDark={isDark}
              nodeId="node-1"
              onWorldClick={handleWorldClick}
            />

          {/* WORLD 2 (Right) */}
          <StandardWorldNode
            worldOrder={2}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-2"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 3 (Left) */}
          <StandardWorldNode
            worldOrder={3}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-3"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 4 (Right) */}
          <StandardWorldNode
            worldOrder={4}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-4"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 5 (Left) */}
          <StandardWorldNode
            worldOrder={5}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-5"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 6 (Right) */}
          <StandardWorldNode
            worldOrder={6}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-6"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 7 (Left) */}
          <StandardWorldNode
            worldOrder={7}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-7"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 8 (Right) */}
          <StandardWorldNode
            worldOrder={8}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-16"
            isDark={isDark}
            nodeId="node-8"
            onWorldClick={handleWorldClick}
          />
        </div>
      </section>

        {/* ================= SECTION 2: INTERMEDIATE (Worlds 9-15) ================= */}
        <section className="relative w-full mt-6">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-y ${
              isDark
                ? activeChapter === 2
                  ? 'bg-purple-950/60 border-purple-400/35 shadow-[0_4px_18px_rgba(168,85,247,0.22)]'
                  : 'bg-purple-950/25 border-purple-400/15 shadow-[0_4px_16px_rgba(168,85,247,0.1)]'
                : activeChapter === 2
                ? 'bg-white/95 border-purple-200 shadow-[0_4px_20px_rgba(168,85,247,0.14)]'
                : 'bg-[#eceef4]/95 border-slate-300/80 shadow-xs'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border transition-all ${
                  activeChapter === 2
                    ? isDark
                      ? 'text-purple-200 bg-purple-500/20 border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                      : 'text-purple-800 bg-purple-50 border-purple-300 shadow-xs'
                    : isDark
                    ? 'text-purple-300 bg-purple-500/10 border-purple-300/25 shadow-sm'
                    : 'text-purple-800 bg-white border-purple-200 shadow-xs'
                }`}
              >
                INTERMEDIATE · WORLDS 9–15
                {activeChapter === 2 && (
                  <span className="ml-2 text-[8px] tracking-[0.16em] font-bold text-purple-600 dark:text-purple-300">
                    ACTIVE
                  </span>
                )}
              </span>
              <div
                className={`flex-1 h-[1px] ${
                  isDark ? 'bg-white/10' : activeChapter === 2 ? 'bg-purple-200' : 'bg-slate-300/80'
                }`}
              />
            </div>
          </div>

          {/* SNAKE PATH SECTION 2: WORLDS 9-15 */}
          <div ref={sec2Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-4 pb-8 flex flex-col items-center overflow-hidden">
          {/* WORLD 9 (Left) */}
          <StandardWorldNode
            worldOrder={9}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-10"
            isDark={isDark}
            nodeId="node-9"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 10 (Right) */}
          <StandardWorldNode
            worldOrder={10}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-10"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 11 (Left) */}
          <StandardWorldNode
            worldOrder={11}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-11"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 12 (Right) */}
          <StandardWorldNode
            worldOrder={12}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-12"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 13 (Left) */}
          <StandardWorldNode
            worldOrder={13}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-13"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 14 (Right) */}
          <StandardWorldNode
            worldOrder={14}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-14"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 15: Chapter Boss Milestone (Center) */}
          <div className="relative w-full flex items-center justify-center pt-11 z-10">
            <div
              className={`flex flex-col items-center transition-all ${
                world15Unlocked
                  ? 'opacity-100 cursor-pointer active:scale-95'
                  : 'opacity-65 grayscale-[0.35] hover:opacity-80 cursor-not-allowed select-none'
              }`}
              onClick={() => {
                handleWorldClick('world-15');
              }}
            >
              <div
                data-node-id="node-15"
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border relative transition-all ${
                  world15Completed
                    ? isDark
                      ? 'neu-raised bg-[#151b28] border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)]'
                      : 'neu-raised bg-emerald-50/95 border-2 border-emerald-300/90 shadow-xs'
                    : world15Current
                    ? isDark
                      ? 'neu-raised bg-[#1c2236] border-2 border-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.5)] ring-2 ring-indigo-500/30'
                      : 'neu-raised bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-indigo-400 shadow-[0_4px_16px_rgba(99,102,241,0.35)] ring-4 ring-indigo-500/20'
                    : !world15Unlocked
                    ? isDark
                      ? 'neu-raised bg-violet-950/30 border border-violet-500/30 shadow-xs'
                      : 'neu-raised bg-violet-50/90 border border-violet-200/90 shadow-xs hover:border-slate-300'
                    : isDark
                    ? 'neu-raised bg-violet-950/40 border border-violet-500/30 shadow-xs'
                    : 'neu-raised bg-violet-50/90 border border-violet-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    world15Current
                      ? isDark
                        ? 'text-indigo-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] font-bold'
                        : 'text-white drop-shadow-xs font-bold'
                      : world15Completed
                      ? isDark
                        ? 'text-emerald-400 font-bold'
                        : 'text-emerald-700 font-bold'
                      : !world15Unlocked
                      ? isDark
                        ? 'text-violet-400/80 font-medium'
                        : 'text-violet-700/80 font-bold'
                      : isDark
                      ? 'text-violet-400 font-medium'
                      : 'text-violet-700 font-bold'
                  }`}
                >
                  {!world15Unlocked ? 'lock' : getWorldIcon(15)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`inline-flex text-[10px] font-mono font-extrabold tracking-wide px-2.5 py-0.5 rounded-md border shadow-xs ${
                    world15Completed
                      ? isDark
                        ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                        : 'text-emerald-800 bg-emerald-100 border-emerald-300 font-bold'
                      : world15Current
                      ? isDark
                        ? 'text-indigo-200 bg-indigo-500/25 border-indigo-400/50 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                        : 'text-indigo-800 bg-indigo-100 border-indigo-300 ring-1 ring-indigo-500/25 font-bold'
                      : !world15Unlocked
                      ? isDark
                        ? 'text-slate-300 bg-slate-800/80 border-white/10 font-semibold'
                        : 'text-slate-700 bg-white border-slate-300/80 font-semibold'
                      : isDark
                      ? 'text-slate-400 bg-slate-800/80 border-white/10'
                      : 'text-slate-700 bg-white border-slate-300/80 font-semibold'
                  }`}
                >
                  World 15
                </span>
              </div>
              <span className={getWorldTitleClass(isDark, !world15Unlocked)}>
                {getWorld(15).title}
              </span>
              <span className={getLessonTagClass(isDark, !world15Unlocked)}>
                {getWorld(15).lessons.length} lessons
              </span>
            </div>
          </div>
        </div>
      </section>

        {/* ================= SECTION 3: EXPERIENCED (Worlds 16-22) ================= */}
        <section className="relative w-full mt-6">
          <div
            className={`sticky top-[58px] z-30 w-full backdrop-blur-xl transition-colors border-y ${
              isDark
                ? activeChapter === 3
                  ? 'bg-rose-950/60 border-rose-400/35 shadow-[0_4px_18px_rgba(244,63,94,0.22)]'
                  : 'bg-rose-950/25 border-rose-400/15 shadow-[0_4px_16px_rgba(244,63,94,0.1)]'
                : activeChapter === 3
                ? 'bg-white/95 border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.14)]'
                : 'bg-[#eceef4]/95 border-slate-300/80 shadow-xs'
            }`}
          >
            <div className="max-w-md mx-auto px-5 py-2.5 flex items-center gap-3">
              <span
                className={`text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border transition-all ${
                  activeChapter === 3
                    ? isDark
                      ? 'text-rose-200 bg-rose-500/20 border-rose-400/40 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                      : 'text-rose-800 bg-rose-50 border-rose-300 shadow-xs'
                    : isDark
                    ? 'text-rose-300 bg-rose-500/10 border-rose-300/25 shadow-sm'
                    : 'text-rose-800 bg-white border-rose-200 shadow-xs'
                }`}
              >
                EXPERIENCED · WORLDS 16–22
                {activeChapter === 3 && (
                  <span className="ml-2 text-[8px] tracking-[0.16em] font-bold text-rose-600 dark:text-rose-300">
                    ACTIVE
                  </span>
                )}
              </span>
              <div
                className={`flex-1 h-[1px] ${
                  isDark ? 'bg-white/10' : activeChapter === 3 ? 'bg-rose-200' : 'bg-slate-300/80'
                }`}
              />
            </div>
          </div>

          {/* SNAKE PATH SECTION 3: WORLDS 16-22 */}
          <div ref={sec3Ref} className="relative w-full max-w-[360px] mx-auto px-5 pt-4 pb-12 flex flex-col items-center overflow-hidden">
          {/* WORLD 16 (Left) */}
          <StandardWorldNode
            worldOrder={16}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-10"
            isDark={isDark}
            nodeId="node-16"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 17 (Right) */}
          <StandardWorldNode
            worldOrder={17}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-17"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 18 (Left) */}
          <StandardWorldNode
            worldOrder={18}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-18"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 19 (Right) */}
          <StandardWorldNode
            worldOrder={19}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-19"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 20 (Left) */}
          <StandardWorldNode
            worldOrder={20}
            completedWorlds={completedWorldsCount}
            align="left"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-20"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 21 (Right) */}
          <StandardWorldNode
            worldOrder={21}
            completedWorlds={completedWorldsCount}
            align="right"
            paddingTop="pt-15"
            isDark={isDark}
            nodeId="node-21"
            onWorldClick={handleWorldClick}
          />

          {/* WORLD 22: GRAND PINNACLE (Center) */}
          <div className="relative w-full max-w-[330px] pt-12 pb-4 z-20 flex flex-col items-center">
            <div
              className={`rounded-3xl p-4 w-full flex items-center justify-between border transition-all relative ${
                completedWorldsCount >= 21
                  ? 'neu-raised opacity-100 cursor-pointer active:scale-95'
                  : 'neu-raised opacity-65 grayscale-[0.35] hover:opacity-80 cursor-not-allowed select-none'
              } ${
                completedWorldsCount >= 22
                  ? isDark
                    ? 'bg-[#151b28] border-amber-500/40 text-white'
                    : 'bg-white border-amber-300 text-slate-900 shadow-md ring-1 ring-amber-400/30'
                  : completedWorldsCount === 21
                  ? isDark
                    ? 'bg-[#1e243a] border-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.4)] text-white'
                    : 'bg-white border-indigo-500 shadow-[0_8px_24px_rgba(99,102,241,0.18)] text-slate-900 ring-2 ring-indigo-500/20'
                  : isDark
                  ? 'bg-[#151b28]/80 border-slate-700/60 text-slate-300'
                  : 'bg-white/80 border-slate-300/80 text-slate-700 shadow-xs'
              }`}
              onClick={() => {
                if (completedWorldsCount >= 21) handleWorldClick('world-22');
              }}
            >
              <div data-node-id="node-22" className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none" />
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center relative border ${
                    completedWorldsCount >= 22
                      ? isDark
                        ? 'neu-pressed bg-[#121824] border-amber-500/30 text-amber-400'
                        : 'neu-pressed bg-amber-50 border-amber-200 text-amber-600'
                      : completedWorldsCount === 21
                      ? isDark
                        ? 'neu-pressed bg-[#121824] border-indigo-500/30 text-indigo-400'
                        : 'neu-pressed bg-indigo-50 border-indigo-200 text-indigo-600'
                      : isDark
                      ? 'neu-pressed bg-[#121824] border-slate-700/60 text-slate-400'
                      : 'neu-pressed bg-slate-100 border-slate-300/80 text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {completedWorldsCount >= 21 ? 'military_tech' : 'lock'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex w-fit text-[10px] font-mono font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-md border shadow-xs ${
                        completedWorldsCount >= 22
                          ? isDark
                            ? 'text-amber-300 bg-amber-500/15 border-amber-500/30'
                            : 'text-amber-800 bg-amber-50 border-amber-300/80 font-bold'
                          : completedWorldsCount === 21
                          ? isDark
                            ? 'text-indigo-200 bg-indigo-500/15 border-indigo-400/30'
                            : 'text-indigo-700 bg-indigo-50 border-indigo-200/90 font-bold'
                          : isDark
                          ? 'text-slate-300 bg-slate-800/80 border-white/10 font-semibold'
                          : 'text-slate-700 bg-white border-slate-300/80 font-semibold'
                      }`}
                    >
                      FINAL WORLD 22
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      • 500 XP
                    </span>
                  </div>
                  <h3 className={`text-xs font-['Outfit'] mt-0.5 ${
                    completedWorldsCount >= 21
                      ? 'font-bold text-inherit'
                      : isDark
                      ? 'font-semibold text-slate-200'
                      : 'font-semibold text-slate-800'
                  }`}>
                    {getWorld(22).title}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Full-stack Arch & CI/CD Mastery
                  </span>
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  completedWorldsCount >= 22
                    ? isDark
                      ? 'neu-raised bg-[#151b28] border-white/10'
                      : 'neu-raised bg-amber-50/90 border-amber-200/90 shadow-xs'
                    : completedWorldsCount === 21
                    ? isDark
                      ? 'neu-raised bg-[#151b28] border-white/10'
                      : 'neu-raised bg-indigo-50/90 border-indigo-200/90 shadow-xs'
                    : isDark
                    ? 'neu-raised bg-[#151b28] border-slate-700/60 text-slate-400'
                    : 'neu-raised bg-slate-100 border-slate-300/80 text-slate-500'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    completedWorldsCount === 21
                      ? isDark
                        ? 'text-indigo-400 animate-pulse'
                        : 'text-indigo-700 font-bold'
                      : completedWorldsCount >= 22
                      ? isDark
                        ? 'text-amber-400 font-bold'
                        : 'text-amber-700 font-bold'
                      : isDark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  {completedWorldsCount >= 21 ? getWorldIcon(22) : 'lock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  </main>
  );
};
