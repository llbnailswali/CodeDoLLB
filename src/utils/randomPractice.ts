/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserStats } from '../types';
import { CODEDO_MASTER_WORLDS, MasterWorldEntry } from '../data/curriculum/masterCurriculumCatalog';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../data/lessonStagesData';
import { PracticeProblemMode } from './storage';

// Same "content is authored" check Listing.tsx/PracticeTab.tsx use -- a
// world only counts as practice-able once every one of its lessons has real
// five-stage data.
const hasCollectedWorldData = (world: MasterWorldEntry) =>
  world.lessons.length > 0 && world.lessons.every((l) => Boolean(l.fiveStageLessonKey));

export interface RandomPracticeTask {
  lessonKey: string;
  mode: PracticeProblemMode;
}

// "Surprise Me" / "Next Random Task": prefer a problem from a World already
// unlocked/learned so far; fall back to any World with practice content if
// none qualify yet -- there's no true per-lesson completion tracking to be
// more precise than this coarse, World-level signal (mirrors PracticeTab.tsx
// and Listing.tsx's own completedWorldsCount heuristic). Shared by
// PracticeTab.tsx's Surprise Me button and Detail.tsx's "Next Random Task"
// so both draw from the exact same candidate pool.
export function pickRandomPracticeTask(userStats: UserStats): RandomPracticeTask | null {
  const completedWorldsCount =
    (userStats.completedLessons ?? 0) > 15 ? userStats.completedWorlds ?? 0 : 0;

  const worlds = CODEDO_MASTER_WORLDS.filter(hasCollectedWorldData).map((world) => ({
    visibleLessons: world.lessons.filter((l) => !l.isBoss),
    practiceLocked: world.order > completedWorldsCount + 1,
  }));

  const unlockedWorlds = worlds.filter((w) => !w.practiceLocked);
  const candidateWorlds = unlockedWorlds.length > 0 ? unlockedWorlds : worlds;

  const candidates: RandomPracticeTask[] = [];
  candidateWorlds.forEach(({ visibleLessons }) => {
    visibleLessons.forEach((lesson) => {
      if (!lesson.fiveStageLessonKey) return;
      const five = AVAILABLE_FIVE_STAGE_LESSONS[lesson.fiveStageLessonKey];
      if (five?.writeRun) candidates.push({ lessonKey: lesson.fiveStageLessonKey, mode: 'writeRun' });
      if (five?.debug) candidates.push({ lessonKey: lesson.fiveStageLessonKey, mode: 'debug' });
    });
  });
  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}
