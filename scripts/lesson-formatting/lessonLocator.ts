/**
 * Resolves a lesson code like "W16L01" to the world data file, its exported
 * lesson array, and the lesson's real `id`. Scoped to worlds that follow the
 * `export const WORLD_<N>_LESSONS` convention (currently worlds 9-17).
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface LessonRef {
  code: string; // "W16L01"
  world: number;
  lessonIndex: number; // 1-based
  filePath: string; // absolute path to the world*LessonsData.ts file
  id: string; // the lesson's own `id` field
  exportName: string;
}

const REPO_ROOT = path.resolve(__dirname, '..', '..');

export function parseLessonCode(code: string): { world: number; lessonIndex: number } {
  const m = /^W(\d{1,2})L(\d{1,2})$/i.exec(code.trim());
  if (!m) throw new Error(`Invalid lesson code "${code}". Expected a form like "W16L01".`);
  return { world: Number(m[1]), lessonIndex: Number(m[2]) };
}

export async function resolveLesson(code: string): Promise<LessonRef> {
  const { world, lessonIndex } = parseLessonCode(code);
  const fileName = `world${world}LessonsData.ts`;
  const filePath = path.join(REPO_ROOT, 'src', 'data', 'curriculum', fileName);
  const exportName = `WORLD_${world}_LESSONS`;

  let mod: Record<string, unknown>;
  try {
    mod = await import(pathToFileURL(filePath).href);
  } catch (err) {
    throw new Error(`Could not load ${fileName}: ${(err as Error).message}`);
  }

  const lessons = mod[exportName] as Array<{ id: string }> | undefined;
  if (!Array.isArray(lessons)) {
    throw new Error(`${fileName} does not export "${exportName}" as an array. This tool only supports worlds using that convention.`);
  }
  const lesson = lessons[lessonIndex - 1];
  if (!lesson) {
    throw new Error(`${fileName}'s ${exportName} has no lesson at index ${lessonIndex} (only ${lessons.length} lessons).`);
  }

  return { code: code.toUpperCase(), world, lessonIndex, filePath, id: lesson.id, exportName };
}
