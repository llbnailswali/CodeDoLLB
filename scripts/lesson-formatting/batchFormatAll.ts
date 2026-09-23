/**
 * Non-interactive batch runner for the lesson-formatting tool: walks every
 * world's lesson data file, every lesson, every code field, and applies the
 * same structural formatter (+ real-engine equivalence verification) the
 * dashboard uses -- but fully unattended, no browser/click-through needed.
 *
 * Two lesson-declaration conventions exist in this codebase:
 *  - worlds 9-17: `export const WORLD_<N>_LESSONS: FiveStageLesson[]`
 *  - worlds 1,2,3,4,6,7,8: individual `export const X_LESSON: FiveStageLesson = {...}`
 *  - world 5: lessons are built via a local `makeLesson(config)` factory, so
 *    there is no object literal in the source matching a `FiveStageLesson`
 *    shape directly -- field VALUES can still be read (real runtime import),
 *    but the AST-based save step cannot locate a matching node there. World 5
 *    is scanned and reported, but every save attempt for it fails safely
 *    (a clear error, not a corrupted file) and is counted separately.
 *
 * Usage:
 *   npx tsx scripts/lesson-formatting/batchFormatAll.ts            # dry run
 *   npx tsx scripts/lesson-formatting/batchFormatAll.ts --apply    # writes changes
 *   npx tsx scripts/lesson-formatting/batchFormatAll.ts --apply --worlds=1,2,3
 */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { compileAndRunKotlin } from '../../src/utils/kotlinRunner';
import { scanKotlin } from '../../src/utils/kotlinSource';
import { extractFields, fieldKey, type FieldEntry } from './extractFields';
import { formatKotlinLines, formatJoinedKotlin } from './kotlinFormatter';
import { applyUpdatesToFile, type FieldUpdate } from './applyFieldUpdate';

/**
 * Universal safety net, independent of and in addition to the real-engine
 * execution check: the formatter must never add, drop, reorder, or alter
 * any token's text -- including inside a comment or string, where a content
 * change could be invisible to an output-equivalence check entirely (this
 * caught a real bug during development: block-comment text getting
 * re-indented, which doesn't change what a program prints but does corrupt
 * the lesson's own content). Applies even to fragments that can't run
 * standalone, since tokenizing doesn't require a complete program.
 */
function sameTokenSequence(before: string, after: string): boolean {
  try {
    // `;` is excluded deliberately: the formatter's whole job includes
    // replacing a `;` statement separator with a real line break (`a; b` ->
    // `a` / `b`), which is always semantically safe in Kotlin and is exactly
    // the crammed-line fix this tool exists for -- not a content alteration.
    const strip = (tokens: ReturnType<typeof scanKotlin>) =>
      tokens.filter((t) => !(t.kind === 'symbol' && t.text === ';')).map((t) => `${t.kind}:${t.text}`);
    const b = strip(scanKotlin(before));
    const a = strip(scanKotlin(after));
    return b.length === a.length && b.every((t, i) => t === a[i]);
  } catch {
    return false; // if either side fails to tokenize, don't trust the comparison -- treat as a mismatch
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const worldsArg = args.find((a) => a.startsWith('--worlds='));
const WORLDS = worldsArg
  ? worldsArg
      .slice('--worlds='.length)
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n))
  : Array.from({ length: 17 }, (_, i) => i + 1);

/**
 * Every world's own content-audit script (scripts/test-world*-content.ts)
 * wraps a bare fragment in `fun main() { ... }` before executing it -- that
 * is how the real app treats an Explore/Predict `code` array too. An
 * earlier version of this script instead SKIPPED verification entirely for
 * any field without its own explicit `fun main()`, which is most
 * Explore/Predict content -- and that blind spot let a real regression
 * through undetected (see PITFALLS.md: a dormant `staticValidateKotlin`
 * false-positive that only a multi-line reformatted body could trigger).
 * Wrapping here, matching the audit scripts exactly, closes that gap.
 */
function wrapForExecution(code: string): string {
  return code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
}

async function verifyEquivalence(beforeCode: string, afterCode: string): Promise<{ matches: boolean; skipped: boolean }> {
  const [before, after] = await Promise.all([
    compileAndRunKotlin(wrapForExecution(beforeCode), { timeoutMs: 3000 }),
    compileAndRunKotlin(wrapForExecution(afterCode), { timeoutMs: 3000 }),
  ]);
  return { matches: before.success === after.success && before.output === after.output, skipped: false };
}

interface LoadedWorld {
  filePath: string;
  lessons: Array<{ id: string; topicTitle?: string }>;
}

async function loadWorldLessons(world: number): Promise<LoadedWorld | null> {
  const filePath = path.join(REPO_ROOT, 'src', 'data', 'curriculum', `world${world}LessonsData.ts`);
  let mod: Record<string, unknown>;
  try {
    mod = await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`);
  } catch {
    return null;
  }
  const arrayExport = mod[`WORLD_${world}_LESSONS`];
  const lessons = Array.isArray(arrayExport)
    ? (arrayExport as LoadedWorld['lessons'])
    : (Object.values(mod).filter(
        (v: any) => v && typeof v === 'object' && typeof v.id === 'string' && v.learn && v.mastered
      ) as LoadedWorld['lessons']);
  return { filePath, lessons };
}

interface WorldSummary {
  world: number;
  found: boolean;
  lessonsScanned: number;
  fieldsScanned: number;
  fieldsChanged: number;
  fieldsSaved: number;
  fieldsMismatched: number;
  lessonsSaveFailed: number;
  notes: string[];
}

async function processLessonFields(lesson: any): Promise<{ updates: FieldUpdate[]; scanned: number; changed: number; mismatched: number; mismatchNotes: string[] }> {
  const fields: FieldEntry[] = extractFields(lesson);
  const updates: FieldUpdate[] = [];
  let changed = 0;
  let mismatched = 0;
  const mismatchNotes: string[] = [];

  for (const field of fields) {
    const before = Array.isArray(field.value) ? (field.value as string[]).join('\n') : (field.value as string);
    const after =
      field.kind === 'array' ? formatKotlinLines(field.value as string[]).lines.join('\n') : formatJoinedKotlin(field.value as string).code;
    if (before === after) continue;
    changed++;

    if (!sameTokenSequence(before, after)) {
      mismatched++;
      mismatchNotes.push(`${lesson.id} :: ${fieldKey(field.path)} -- TOKEN SEQUENCE MISMATCH (formatter altered content), left untouched`);
      continue;
    }

    const verify = await verifyEquivalence(before, after);
    if (!verify.matches) {
      mismatched++;
      mismatchNotes.push(`${lesson.id} :: ${fieldKey(field.path)} -- output verification MISMATCH, left untouched`);
      continue;
    }
    updates.push(
      field.kind === 'array'
        ? { path: field.path, kind: 'array', newValue: after.split('\n') }
        : { path: field.path, kind: 'string', newValue: after }
    );
  }

  return { updates, scanned: fields.length, changed, mismatched, mismatchNotes };
}

async function run() {
  console.log(`Lesson formatting batch run -- mode: ${APPLY ? 'APPLY (writes files)' : 'DRY RUN (no files written)'}`);
  console.log(`Worlds: ${WORLDS.join(', ')}\n`);

  const summaries: WorldSummary[] = [];

  for (const world of WORLDS) {
    const summary: WorldSummary = {
      world,
      found: false,
      lessonsScanned: 0,
      fieldsScanned: 0,
      fieldsChanged: 0,
      fieldsSaved: 0,
      fieldsMismatched: 0,
      lessonsSaveFailed: 0,
      notes: [],
    };

    const loaded = await loadWorldLessons(world);
    if (!loaded || loaded.lessons.length === 0) {
      summary.notes.push('no lesson data file found or no lessons discovered for this world');
      summaries.push(summary);
      console.log(`World ${world}: SKIPPED (${summary.notes[0]})`);
      continue;
    }
    summary.found = true;

    for (const lesson of loaded.lessons) {
      summary.lessonsScanned++;
      const { updates, scanned, changed, mismatched, mismatchNotes } = await processLessonFields(lesson);
      summary.fieldsScanned += scanned;
      summary.fieldsChanged += changed;
      summary.fieldsMismatched += mismatched;
      summary.notes.push(...mismatchNotes);

      if (updates.length === 0) continue;

      if (APPLY) {
        try {
          await applyUpdatesToFile(loaded.filePath, lesson.id, updates);
          summary.fieldsSaved += updates.length;
        } catch (err) {
          summary.lessonsSaveFailed++;
          summary.notes.push(`${lesson.id} -- save failed: ${(err as Error).message}`);
        }
      } else {
        summary.fieldsSaved += updates.length; // "would save" in dry-run
      }
    }

    console.log(
      `World ${world}: ${summary.lessonsScanned} lessons, ${summary.fieldsScanned} fields, ${summary.fieldsChanged} changed, ` +
        `${summary.fieldsSaved} ${APPLY ? 'saved' : 'would-save'}, ${summary.fieldsMismatched} mismatched, ${summary.lessonsSaveFailed} save-failed`
    );
    summaries.push(summary);
  }

  console.log('\n=== Summary ===');
  const totals = summaries.reduce(
    (acc, s) => ({
      lessonsScanned: acc.lessonsScanned + s.lessonsScanned,
      fieldsScanned: acc.fieldsScanned + s.fieldsScanned,
      fieldsChanged: acc.fieldsChanged + s.fieldsChanged,
      fieldsSaved: acc.fieldsSaved + s.fieldsSaved,
      fieldsMismatched: acc.fieldsMismatched + s.fieldsMismatched,
      lessonsSaveFailed: acc.lessonsSaveFailed + s.lessonsSaveFailed,
    }),
    { lessonsScanned: 0, fieldsScanned: 0, fieldsChanged: 0, fieldsSaved: 0, fieldsMismatched: 0, lessonsSaveFailed: 0 }
  );
  console.log(
    `Worlds scanned: ${summaries.filter((s) => s.found).length}/${WORLDS.length} | Lessons: ${totals.lessonsScanned} | ` +
      `Fields: ${totals.fieldsScanned} | Changed: ${totals.fieldsChanged} | ${APPLY ? 'Saved' : 'Would-save'}: ${totals.fieldsSaved} | ` +
      `Mismatched (untouched): ${totals.fieldsMismatched} | Save failures: ${totals.lessonsSaveFailed}`
  );

  const allNotes = summaries.flatMap((s) => s.notes.map((n) => `World ${s.world}: ${n}`));
  if (allNotes.length > 0) {
    console.log('\n=== Notes (mismatches, save failures, skipped worlds) ===');
    for (const n of allNotes) console.log('- ' + n);
  }

  if (!APPLY) {
    console.log('\nThis was a dry run -- no files were changed. Re-run with --apply to write changes.');
  }
}

run().catch((err) => {
  console.error('Batch run failed:', err);
  process.exit(1);
});
