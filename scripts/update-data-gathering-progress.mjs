#!/usr/bin/env node
/**
 * Regenerates the "Five-Stage Content Progress" table in
 * data_gathering_progress.md from the actual source of truth
 * (src/data/curriculum/masterCurriculumCatalog.ts), instead of relying on
 * someone manually keeping the table in sync with reality.
 *
 * A world's lesson counts as "authored" when it has a `fiveStageLessonKey`
 * field -- placeholder lessons (not yet authored) never have that field
 * (see the file's own header comment).
 *
 * Run this at the end of any session that adds/changes five-stage lesson
 * content (see data_gathering_progress.md's Resume Protocol, step 8).
 *
 * Usage: node scripts/update-data-gathering-progress.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CATALOG_PATH = path.join(ROOT, 'src/data/curriculum/masterCurriculumCatalog.ts');
const PROGRESS_PATH = path.join(ROOT, 'data_gathering_progress.md');

const START_MARKER = '<!-- AUTO-GENERATED:FIVE-STAGE-PROGRESS:START -->';
const END_MARKER = '<!-- AUTO-GENERATED:FIVE-STAGE-PROGRESS:END -->';

function parseCatalog(source) {
  // World-level "id" lines are indented 4 spaces; lesson-level "id" lines
  // (inside a world's `lessons` array) are indented 8 spaces. That
  // indentation difference is what lets us tell them apart without a full
  // JSON/TS parser.
  const worldHeaderRe = /^ {4}"id": "(world-\d+)",\n {4}"order": (\d+),\n {4}"title": "([^"]*)"/gm;
  const headers = [...source.matchAll(worldHeaderRe)].map((m) => ({
    id: m[1],
    order: Number(m[2]),
    title: m[3],
    start: m.index,
  }));

  const lessonIdRe = /^ {8}"id": "/gm;
  const fiveStageKeyRe = /^ {8}"fiveStageLessonKey": /gm;

  return headers.map((h, i) => {
    const end = i + 1 < headers.length ? headers[i + 1].start : source.length;
    const chunk = source.slice(h.start, end);
    const totalLessons = (chunk.match(lessonIdRe) || []).length;
    const authoredLessons = (chunk.match(fiveStageKeyRe) || []).length;
    return { ...h, totalLessons, authoredLessons };
  });
}

function renderTable(worlds) {
  const rows = worlds
    .sort((a, b) => a.order - b.order)
    .map((w) => {
      const status =
        w.authoredLessons === 0
          ? '⬜ Not started'
          : w.authoredLessons === w.totalLessons
          ? `✅ Complete`
          : `🟡 In progress`;
      return `| World ${w.order} — ${w.title} | ${w.authoredLessons} / ${w.totalLessons} | ${status} |`;
    });

  const completeCount = worlds.filter((w) => w.authoredLessons === w.totalLessons && w.totalLessons > 0).length;

  const header = [
    '| World (per `MASTER_PLAN.md`) | Five-stage lessons authored | Status |',
    '| :--- | :--- | :--- |',
  ];

  const summary = `**${completeCount} of ${worlds.length} worlds complete by the format that actually ships.** Everything else in \`masterCurriculumCatalog.ts\` beyond the complete worlds is placeholder metadata (\`questionsCount: 0\`, no \`fiveStageLessonKey\`) — this is expected and self-documented in that file, not a bug.`;

  return [...header, ...rows].join('\n') + '\n\n' + summary;
}

const catalogSource = readFileSync(CATALOG_PATH, 'utf-8');
const worlds = parseCatalog(catalogSource);

if (worlds.length === 0) {
  console.error('No worlds parsed from masterCurriculumCatalog.ts -- the file structure may have changed. Aborting without writing.');
  process.exit(1);
}

const progressSource = readFileSync(PROGRESS_PATH, 'utf-8');
const startIdx = progressSource.indexOf(START_MARKER);
const endIdx = progressSource.indexOf(END_MARKER);

if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
  console.error(`Could not find both markers (${START_MARKER} / ${END_MARKER}) in data_gathering_progress.md -- aborting without writing.`);
  process.exit(1);
}

const before = progressSource.slice(0, startIdx + START_MARKER.length);
const after = progressSource.slice(endIdx);
const newContent = `${before}\n\n${renderTable(worlds)}\n\n${after}`;

writeFileSync(PROGRESS_PATH, newContent, 'utf-8');

console.log(`Updated data_gathering_progress.md from masterCurriculumCatalog.ts:`);
for (const w of worlds.sort((a, b) => a.order - b.order)) {
  console.log(`  World ${w.order} — ${w.title}: ${w.authoredLessons}/${w.totalLessons}`);
}
