import { PathNode } from '../types';
import { ALL_CURRICULUM_QUESTIONS, WORLD_1_QUESTIONS } from './curriculum';

export const ROBOT_MASCOT_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQZLQVIXsNeIx3GLb4t3VuO2m6EhmcT_7eh1sjY3gvqlOTbM6NwD21dLB20YU1t4ZGKgi0a8JREJbPLQv_LJa0wTk5nzIBWw0HFwwNH1qbOlII8L3HaTzqL034Cdfbo3B8azN0tTCE-5UXzltlU8_L6P9nwM9aBhhFKVjq4NVs4emnABEx6wWgyavML97x74Gl9bQ-r0DZF4aFkqisqCCQahKWIw-RvAPB80gnJUwS0d6tOg0o9nfE';

// Active lesson questions pool
export const LESSON_QUESTIONS = ALL_CURRICULUM_QUESTIONS.length > 0 ? ALL_CURRICULUM_QUESTIONS : WORLD_1_QUESTIONS;

export {
  ALL_CURRICULUM_QUESTIONS,
  WORLD_1_QUESTIONS,
  WORLD_2_QUESTIONS,
  WORLD_3_QUESTIONS,
  DAILY_BATTLE_POOL,
  WORLDS_CATALOG,
  LessonRepository,
  BattleRepository
} from './curriculum';

export const WORLD_01_NODES: PathNode[] = [

  {
    id: 'node-1',
    title: 'Variables',
    xpText: '+20 XP Mastered',
    status: 'completed',
    position: 'left'
  },
  {
    id: 'node-2',
    title: 'Data Types',
    xpText: '+25 XP Mastered',
    status: 'completed',
    position: 'center'
  },
  {
    id: 'node-3',
    title: 'Operators & Math',
    xpText: 'START TODAY • 5 MIN',
    status: 'active',
    position: 'right',
    badge: 'AVAILABLE NOW'
  },
  {
    id: 'node-4',
    title: 'Bonus Chest',
    xpText: 'Unlocks after Lesson 3',
    status: 'chest',
    position: 'center'
  },
  {
    id: 'node-5',
    title: 'String Templates',
    xpText: '+30 XP',
    status: 'locked',
    position: 'left'
  },
  {
    id: 'node-gate-1',
    title: 'Kotlin Foundations',
    xpText: '2 / 4 Completed',
    status: 'gate',
    position: 'center'
  },
  {
    id: 'node-6',
    title: 'Conditionals',
    xpText: 'Boss Level',
    status: 'locked',
    position: 'center',
    isBoss: true
  },
  {
    id: 'node-7',
    title: 'Boolean Logic',
    xpText: '+35 XP',
    status: 'locked',
    position: 'right'
  }
];
