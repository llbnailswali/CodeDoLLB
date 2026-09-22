import assert from 'node:assert/strict';
import { WORLD_16_LESSONS } from '../src/data/curriculum/world16LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

// Diagnostic audit: a successful process means evidence was collected, NOT that
// World 16 passed. --strict fails when executable reference tasks fail.
const arg = process.argv[2];
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-16')!;
assert.ok(world);
const selected = arg && arg !== '--strict' ? WORLD_16_LESSONS.filter(l => l.id === arg || l.id.endsWith(arg)) : WORLD_16_LESSONS;
assert.ok(selected.length);
let blocked = 0;
for (const lesson of selected) {
  const catalog = world.lessons.find(l => l.fiveStageLessonKey === lesson.id);
  assert.ok(catalog, lesson.id);
  assert.equal(AVAILABLE_FIVE_STAGE_LESSONS[lesson.id], lesson);
  const activities: { id: string; code: string; expected?: string; kind: string }[] = [];
  activities.push({ id: 'learn', code: lesson.learn.codeSnippet.join('\n'), kind: 'illustration' });
  for (const c of lesson.explore.cards) {
    assert.ok(c, 'Sparse Explore array');
    activities.push({ id: c.id, code: c.code.join('\n'), kind: 'illustration' });
  }
  for (const q of lesson.predict.questions) {
    assert.ok(q, 'Sparse Predict array');
    assert.equal(q.options.filter(o => o.isCorrect).length, 1, q.id);
    activities.push({ id: q.id, code: (q.code ?? []).join('\n'), kind: q.topicMeta ?? 'prediction', expected: q.topicMeta === 'output' ? q.options.find(o => o.isCorrect)!.label : undefined });
  }
  if (lesson.writeRun) {
    activities.push({ id: 'write.solution', code: lesson.writeRun.solutionCode, expected: lesson.writeRun.expectedOutput, kind: 'reference' });
    activities.push({ id: 'write.starter', code: lesson.writeRun.initialCode, expected: lesson.writeRun.expectedOutput, kind: 'negative' });
  }
  if (lesson.debug) {
    activities.push({ id: 'debug.fixed', code: lesson.debug.fixedCode, expected: lesson.debug.expectedOutput, kind: 'reference' });
    activities.push({ id: 'debug.broken', code: lesson.debug.brokenCode, expected: lesson.debug.expectedOutput, kind: 'negative' });
  }
  const results = [];
  for (const a of activities) {
    // Execute even illustrative fragments, but never call empty output proof of
    // coroutine semantics. Keep exact output comparison outside runner.trim().
    const r = await compileAndRunKotlin(a.code, { timeoutMs: 100 });
    const exact = a.expected === undefined ? null : r.success && r.output === a.expected;
    if (a.kind === 'reference' && !exact) blocked++;
    results.push({ id: a.id, kind: a.kind, success: r.success, output: r.output, expected: a.expected, exact, error: r.error?.message });
  }
  const bypass = lesson.writeRun ? await compileAndRunKotlin(`fun main() {\n    println(${JSON.stringify(lesson.writeRun.expectedOutput)})\n}`, { expectedOutput: lesson.writeRun.expectedOutput, testCase: lesson.writeRun.testCase }) : null;
  console.log(JSON.stringify({ lesson: lesson.id, explore: lesson.explore.cards.length, predict: lesson.predict.questions.length, catalogQuestions: catalog.questionsCount, correctPositions: lesson.predict.questions.map(q => q.options.findIndex(o => o.isCorrect)), uniqueExplore: new Set(lesson.explore.cards.map(c => c.code.join('\n'))).size, uniquePredict: new Set(lesson.predict.questions.map(q => q.code?.join('\n'))).size, hardcodedPass: bypass?.success, results }, null, 2));
}
console.log(`Diagnostic collection complete: ${selected.length} lessons; ${blocked} reference tasks blocked. This is not quality acceptance.`);
if (process.argv.includes('--strict') && blocked) process.exitCode = 1;
