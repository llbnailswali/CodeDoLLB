#!/usr/bin/env node
/**
 * Audits curriculum data for a specific, easy-to-miss content bug: a
 * lesson stage's subtitle (the description shown directly under the
 * stage title -- learn.subtitle, explore.subtitle, predict.subtitle) that
 * is generic boilerplate reused across many lessons in the same world,
 * instead of describing what that specific lesson's stage actually
 * covers. Found across Worlds 9-11 and 13 -- e.g. World 10's Explore
 * subtitle is the literal same sentence ("Examine how data flows through
 * collection transformations.") for all 10 lessons regardless of whether
 * the lesson is map, groupBy, or zip; World 11's Explore subtitle
 * ("N coverage-derived scenarios; no fixed activity quota.") describes
 * the AUTHORING PROCESS, not the Kotlin content, and is the same template
 * with only a number substituted in every lesson.
 *
 * Detection: within each worldNLessonsData.ts file, group every lesson's
 * subtitle for the same stage (learn/explore/predict) after normalizing
 * away digit runs (so "5 coverage-derived scenarios..." and "6
 * coverage-derived scenarios..." are recognized as the same template).
 * Any group shared by 2+ lessons in the same file is flagged -- a
 * genuinely lesson-specific subtitle should essentially never collide
 * with another lesson's.
 *
 * This is a candidate scanner, not an auto-fail check: every flagged
 * group is a worklist item needing a human/agent rewrite, the same way
 * `audit-dash-collision.mjs` findings do. See LESSON_CLARITY_STANDARD.md
 * section 1D.
 *
 * Known limitation: the reported lesson ids are best-effort (matched to
 * the nearest preceding `id:` that looks like a lesson-object opening,
 * not a nested card/question). Some files' exact formatting still causes
 * a nested id to be reported instead of the real lesson id -- the
 * (file, stage, reused-subtitle, count) signal is reliable regardless;
 * treat the listed ids as a hint, not a guarantee, and open the file to
 * confirm which lessons are actually affected before editing.
 *
 * Run with: node scripts/audit-generic-subtitles.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

function listFiles(dir, exts, out = []) {
  for (const entry of readdirSyncSafe(dir)) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(full, exts, out);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function readdirSyncSafe(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const files = listFiles(path.join(ROOT, 'src/data/curriculum'), ['.ts']).filter((f) =>
  /LessonsData\.ts$/.test(f)
);

// Only a LESSON's own id, not a nested Explore card's or Predict
// question's `id:` -- those come later in the same object and would
// otherwise get mistaken for the lesson id of whatever comes after them.
// This codebase always writes a lesson as `... : FiveStageLesson = { id:
// '...', ...}` (a named export) or `{ id: '...', ... }` as an array
// element directly after a `[`/`,` -- both are anchored to the object's
// own opening brace, unlike a card/question id three levels deeper.
const idRe = /(?:FiveStageLesson\s*=\s*\{|[[,]\s*\{)\s*id\s*:\s*['"]([A-Za-z0-9_-]+)['"]/g;
const stageRe = /\b(learn|explore|predict)\s*:\s*\{[^{}]*?subtitle\s*:\s*(['"])((?:(?!\2)[^\\]|\\.)*)\2/gs;
const normalize = (text) => text.replace(/\d+/g, '#').replace(/\s+/g, ' ').trim();

let totalGroups = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');

  // Map every match position to the nearest preceding `id: '...'`, which
  // this codebase always writes as a lesson object's first field.
  const idMatches = [...text.matchAll(idRe)];
  const idAt = (pos) => {
    let found = null;
    for (const m of idMatches) {
      if (m.index > pos) break;
      found = m[1];
    }
    return found ?? '(unknown lesson)';
  };

  const byStage = { learn: new Map(), explore: new Map(), predict: new Map() };
  for (const m of text.matchAll(stageRe)) {
    const [, stage, , subtitle] = m;
    const key = normalize(subtitle);
    if (!key) continue;
    const bucket = byStage[stage];
    if (!bucket.has(key)) bucket.set(key, []);
    bucket.get(key).push({ lessonId: idAt(m.index), subtitle });
  }

  for (const stage of ['learn', 'explore', 'predict']) {
    for (const [, occurrences] of byStage[stage]) {
      if (occurrences.length < 2) continue;
      totalGroups++;
      console.log(`${path.relative(ROOT, file)} -- ${stage}.subtitle reused across ${occurrences.length} lessons:`);
      console.log(`  "${occurrences[0].subtitle}"`);
      console.log(`  lessons: ${occurrences.map((o) => o.lessonId).join(', ')}\n`);
    }
  }
}

if (totalGroups === 0) {
  console.log('No candidate generic/reused stage subtitles found.');
} else {
  console.log(`Found ${totalGroups} generic/reused stage-subtitle group(s) across the curriculum. Each is a\nworklist item: rewrite every lesson in the group with a subtitle specific to that lesson's own\nExplore/Predict content, not a template shared with other lessons. See LESSON_CLARITY_STANDARD.md.`);
}
