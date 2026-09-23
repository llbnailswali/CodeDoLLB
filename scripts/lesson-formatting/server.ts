/**
 * Local-only web UI + API for the lesson code-formatting tool.
 *
 * Flow: enter a lesson code (e.g. "W16L01") -> preview runs the structural
 * formatter against every code field on that lesson and re-executes both the
 * original and the formatted code through the real engine
 * (compileAndRunKotlin) to prove the formatting didn't change behavior ->
 * you review the before/after diffs in the browser and pick which fields to
 * keep -> Save writes only those fields back into the source .ts file via an
 * AST-based edit (ts-morph), nothing else in the file is touched.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileAndRunKotlin } from '../../src/utils/kotlinRunner';
import { resolveLesson } from './lessonLocator';
import { extractFields, fieldKey, type FieldEntry } from './extractFields';
import { formatKotlinLines, formatJoinedKotlin } from './kotlinFormatter';
import { applyUpdatesToFile, type FieldUpdate } from './applyFieldUpdate';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

interface FormatResult {
  before: string;
  after: string;
  changed: boolean;
  verify: {
    beforeSuccess: boolean;
    beforeOutput: string;
    afterSuccess: boolean;
    afterOutput: string;
    matches: boolean;
    skipped?: boolean;
  };
}

interface FieldPreview {
  screenName: string;
  key: string;
  kind: 'array' | 'string';
  result: FormatResult;
}

function toDisplayString(value: string[] | string): string {
  return Array.isArray(value) ? value.join('\n') : value;
}

/** Fragments (bare class bodies, expressions with no `fun main`) can't run standalone -- verification is skipped for those rather than reported as a false mismatch. */
function looksStandaloneRunnable(code: string): boolean {
  return /\bfun\s+main\s*\(/.test(code);
}

async function verifyEquivalence(beforeCode: string, afterCode: string): Promise<FormatResult['verify']> {
  if (!looksStandaloneRunnable(beforeCode)) {
    return { beforeSuccess: false, beforeOutput: '', afterSuccess: false, afterOutput: '', matches: true, skipped: true };
  }
  const [before, after] = await Promise.all([
    compileAndRunKotlin(beforeCode, { timeoutMs: 3000 }),
    compileAndRunKotlin(afterCode, { timeoutMs: 3000 }),
  ]);
  const matches = before.success === after.success && before.output === after.output;
  return {
    beforeSuccess: before.success,
    beforeOutput: before.output,
    afterSuccess: after.success,
    afterOutput: after.output,
    matches,
  };
}

async function buildFormatResult(field: FieldEntry): Promise<FormatResult> {
  const before = toDisplayString(field.value);
  const after = field.kind === 'array' ? formatKotlinLines(field.value as string[]).lines.join('\n') : formatJoinedKotlin(field.value as string).code;
  const changed = before !== after;
  const verify = changed ? await verifyEquivalence(before, after) : { beforeSuccess: true, beforeOutput: '', afterSuccess: true, afterOutput: '', matches: true, skipped: true };
  return { before, after, changed, verify };
}

app.get('/api/preview', async (req, res) => {
  const code = String(req.query.lesson || '');
  try {
    const ref = await resolveLesson(code);
    const mod = await import(`${ref.filePath}?t=${Date.now()}`);
    const lessons = mod[ref.exportName] as any[];
    const lesson = lessons[ref.lessonIndex - 1];
    const fields = extractFields(lesson);

    const previews: FieldPreview[] = [];
    for (const field of fields) {
      const result = await buildFormatResult(field);
      previews.push({ screenName: field.screenName, key: fieldKey(field.path), kind: field.kind, result });
    }

    res.json({ ref, fields: previews });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.post('/api/save', async (req, res) => {
  const { lesson: code, keys } = req.body as { lesson: string; keys: string[] };
  try {
    const ref = await resolveLesson(code);
    const mod = await import(`${ref.filePath}?t=${Date.now()}`);
    const lessons = mod[ref.exportName] as any[];
    const lesson = lessons[ref.lessonIndex - 1];
    const fields = extractFields(lesson);
    const byKey = new Map(fields.map((f) => [fieldKey(f.path), f]));

    const updates: FieldUpdate[] = [];
    for (const key of keys) {
      const field = byKey.get(key);
      if (!field) throw new Error(`Unknown field key "${key}"`);
      if (field.kind === 'array') {
        const { lines } = formatKotlinLines(field.value as string[]);
        updates.push({ path: field.path, kind: 'array', newValue: lines });
      } else {
        const { code: formatted } = formatJoinedKotlin(field.value as string);
        updates.push({ path: field.path, kind: 'string', newValue: formatted });
      }
    }

    await applyUpdatesToFile(ref.filePath, ref.id, updates);
    res.json({ ok: true, savedFields: updates.length });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4570;
app.listen(PORT, () => {
  console.log(`Lesson formatting UI running at http://localhost:${PORT}`);
});
