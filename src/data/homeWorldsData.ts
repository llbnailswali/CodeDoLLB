import { CurriculumLevel } from '../types';
import { CODEDO_MASTER_WORLDS } from './curriculum/masterCurriculumCatalog';

export interface WorldTopicNode {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'locked';
  isBoss?: boolean;
  bossTitle?: string;
  bossSubtitle?: string;
  xpReward: number;
}

export interface WorldTopicSection {
  worldNumber: number;
  worldId: string;
  topicTitle: string;
  level: CurriculumLevel;
  levelTitle: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  nodes: WorldTopicNode[];
  description?: string;
  icon?: string;
  badge?: string;
}

export interface WorldCardMeta {
  tagline: string;
  icon: string;
  badge: string;
  gradient: string;
  accentColor: string;
  level: CurriculumLevel;
}

export const WORLD_CARD_META: Record<string, WorldCardMeta> = {
  // Beginner (1-8)
  'world-1': {
    tagline: 'main(), syntax, val vs var, type inference & basic types',
    icon: 'data_object',
    badge: 'BEGINNER • W1',
    gradient: 'from-blue-600 to-indigo-600',
    accentColor: '#3b82f6',
    level: 'beginner',
  },
  'world-2': {
    tagline: 'Arithmetic, comparison, logical, assignment & precedence',
    icon: 'calculate',
    badge: 'BEGINNER • W2',
    gradient: 'from-indigo-600 to-violet-600',
    accentColor: '#6366f1',
    level: 'beginner',
  },
  'world-3': {
    tagline: 'if, if-else, else-if, when expressions & is checks',
    icon: 'alt_route',
    badge: 'BEGINNER • W3',
    gradient: 'from-violet-600 to-purple-600',
    accentColor: '#8b5cf6',
    level: 'beginner',
  },
  'world-4': {
    tagline: 'for, while, do-while, ranges, downTo, step & breaks',
    icon: 'sync',
    badge: 'BEGINNER • W4',
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: '#10b981',
    level: 'beginner',
  },
  'world-5': {
    tagline: 'fun, parameters, returns, default & named args, vararg',
    icon: 'code',
    badge: 'BEGINNER • W5',
    gradient: 'from-cyan-600 to-blue-600',
    accentColor: '#06b6d4',
    level: 'beginner',
  },
  'world-6': {
    tagline: 'Arrays, Lists, Sets, Maps & read-only vs mutable',
    icon: 'filter_list',
    badge: 'BEGINNER • W6',
    gradient: 'from-pink-600 to-rose-600',
    accentColor: '#ec4899',
    level: 'beginner',
  },
  'world-7': {
    tagline: 'Nullable types, safe call ?., Elvis ?:, !! & smart casts',
    icon: 'verified_user',
    badge: 'BEGINNER • W7',
    gradient: 'from-sky-600 to-indigo-600',
    accentColor: '#0ea5e9',
    level: 'beginner',
  },
  'world-8': {
    tagline: 'Classes, init, data classes, enums, inheritance & interfaces',
    icon: 'category',
    badge: 'BEGINNER CAPSTONE',
    gradient: 'from-amber-600 to-orange-600',
    accentColor: '#f59e0b',
    level: 'beginner',
  },

  // Intermediate (9-15)
  'world-9': {
    tagline: 'Lambdas, higher-order functions, it, references & inline',
    icon: 'bolt',
    badge: 'INTERMEDIATE • W9',
    gradient: 'from-cyan-500 to-teal-600',
    accentColor: '#06b6d4',
    level: 'intermediate',
  },
  'world-10': {
    tagline: 'map, filter, flatMap, fold, groupBy, associate & sorting',
    icon: 'auto_fix_high',
    badge: 'INTERMEDIATE • W10',
    gradient: 'from-violet-600 to-purple-600',
    accentColor: '#8b5cf6',
    level: 'intermediate',
  },
  'world-11': {
    tagline: 'Abstract classes, sealed classes, extensions & singletons',
    icon: 'layers',
    badge: 'INTERMEDIATE • W11',
    gradient: 'from-orange-500 to-amber-600',
    accentColor: '#f97316',
    level: 'intermediate',
  },
  'world-12': {
    tagline: 'Generics, constraints, in/out variance & reified types',
    icon: 'all_inclusive',
    badge: 'INTERMEDIATE • W12',
    gradient: 'from-sky-500 to-blue-600',
    accentColor: '#0ea5e9',
    level: 'intermediate',
  },
  'world-13': {
    tagline: 'let, run, with, apply, also: this vs it & return values',
    icon: 'psychology',
    badge: 'INTERMEDIATE • W13',
    gradient: 'from-purple-500 to-pink-600',
    accentColor: '#a855f7',
    level: 'intermediate',
  },
  'world-14': {
    tagline: 'Lazy evaluation, asSequence(), pipelines & performance',
    icon: 'waterfall_chart',
    badge: 'INTERMEDIATE • W14',
    gradient: 'from-teal-500 to-emerald-600',
    accentColor: '#14b8a6',
    level: 'intermediate',
  },
  'world-15': {
    tagline: 'try/catch/finally, throw, custom exceptions & Result type',
    icon: 'shield',
    badge: 'INTERMEDIATE CAPSTONE',
    gradient: 'from-rose-600 to-red-600',
    accentColor: '#e11d48',
    level: 'intermediate',
  },

  // Experienced (16-22)
  'world-16': {
    tagline: 'suspend, launch, async, dispatchers, structured concurrency',
    icon: 'electric_bolt',
    badge: 'EXPERIENCED • W16',
    gradient: 'from-purple-600 to-indigo-600',
    accentColor: '#9333ea',
    level: 'experienced',
  },
  'world-17': {
    tagline: 'Cold flows, StateFlow, SharedFlow & reactive operators',
    icon: 'stream',
    badge: 'EXPERIENCED • W17',
    gradient: 'from-fuchsia-600 to-pink-600',
    accentColor: '#d946ef',
    level: 'experienced',
  },
  'world-18': {
    tagline: 'Threads, shared mutable state, Mutex, Atomic & race conditions',
    icon: 'warning',
    badge: 'EXPERIENCED • W18',
    gradient: 'from-red-600 to-rose-700',
    accentColor: '#e11d48',
    level: 'experienced',
  },
  'world-19': {
    tagline: 'Delegated properties, value classes, operators & DSLs',
    icon: 'build_circle',
    badge: 'EXPERIENCED • W19',
    gradient: 'from-yellow-600 to-amber-700',
    accentColor: '#ca8a04',
    level: 'experienced',
  },
  'world-20': {
    tagline: 'Java interop, platform types, @JvmStatic & SAM conversions',
    icon: 'compare_arrows',
    badge: 'EXPERIENCED • W20',
    gradient: 'from-sky-600 to-cyan-700',
    accentColor: '#0284c7',
    level: 'experienced',
  },
  'world-21': {
    tagline: 'Memory allocations, boxing, inlining & benchmarking',
    icon: 'speed',
    badge: 'EXPERIENCED • W21',
    gradient: 'from-orange-600 to-red-600',
    accentColor: '#ea580c',
    level: 'experienced',
  },
  'world-22': {
    tagline: 'Serialization, Gradle, Kotlin Test, Dokka & Grandmaster Capstone',
    icon: 'stars',
    badge: 'GRANDMASTER CAPSTONE',
    gradient: 'from-indigo-600 to-purple-800',
    accentColor: '#4f46e5',
    level: 'experienced',
  },
};

export const HOME_WORLDS: WorldTopicSection[] = CODEDO_MASTER_WORLDS.map((w) => {
  const isW1 = w.order === 1;
  const completedCount = isW1 ? 2 : 0;
  const totalCount = w.lessons.length;
  const percentage = isW1 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    worldNumber: w.order,
    worldId: w.id,
    topicTitle: w.title,
    level: w.level,
    levelTitle: w.levelTitle,
    completedCount,
    totalCount,
    percentage,
    badge: w.badge,
    description: w.subtitle,
    icon: WORLD_CARD_META[w.id]?.icon || "school",
    nodes: w.lessons.map((lesson, idx) => {
      let status: "completed" | "active" | "locked" = "locked";
      if (isW1) {
        if (idx < 2) status = "completed";
        else if (idx === 2) status = "active";
        else status = "locked";
      }
      return {
        id: lesson.id,
        title: lesson.title,
        subtitle: lesson.isBoss
          ? `${w.bossTitle}`
          : status === "completed"
          ? `Completed • +${lesson.xpReward} XP`
          : status === "active"
          ? `Current Lesson • Tap to Start`
          : `Lesson ${w.order}.${idx + 1} • +${lesson.xpReward} XP`,
        status,
        isBoss: lesson.isBoss,
        bossTitle: lesson.isBoss ? w.bossTitle : undefined,
        bossSubtitle: lesson.isBoss ? w.bossDescription : undefined,
        xpReward: lesson.xpReward,
      };
    }),
  };
});
