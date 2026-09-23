/** Shared lesson-discovery helper: same convention resolution used by batchFormatAll.ts, reused here for stats. */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

export const KNOWN_WORLD_COUNT = 17;

export async function loadWorldLessons(world: number): Promise<any[] | null> {
  const filePath = path.join(REPO_ROOT, 'src', 'data', 'curriculum', `world${world}LessonsData.ts`);
  let mod: Record<string, unknown>;
  try {
    mod = await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`);
  } catch {
    return null;
  }
  const arrayExport = mod[`WORLD_${world}_LESSONS`];
  const lessons = Array.isArray(arrayExport)
    ? (arrayExport as any[])
    : Object.values(mod).filter((v: any) => v && typeof v === 'object' && typeof v.id === 'string' && v.learn && v.mastered);
  return lessons.length > 0 ? lessons : null;
}
