import assert from 'node:assert/strict';
import { WORLD_14_LESSONS } from '../src/data/curriculum/world14LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const lessons = WORLD_14_LESSONS;
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-14')!;
assert.equal(lessons.length, 13, 'World 14 should register exactly 13 lessons');

let executions = 0;
async function verify(code: string, expected: string, name: string, shouldPass = true) {
  const result = await compileAndRunKotlin(code);
  const passes = result.success && result.output === expected;
  assert.equal(passes, shouldPass, `${name}: expected ${shouldPass ? '' : 'NOT '}${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  executions++;
}

for (const [index, lesson] of lessons.entries()) {
  const entry = world.lessons[index];
  assert.equal(AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!], lesson, `${entry.id}: wrong lesson registration`);
  assert.equal(entry.questionsCount, lesson.predict!.questions.length, `${entry.id}: stale question count`);
  assert.ok(!entry.description.includes('Placeholder'), `${entry.id}: stale description`);
  assert.ok(lesson.learn.codeSnippet.length > 0, `${lesson.id}: missing Learn example`);

  const cards = lesson.explore!.cards;
  assert.equal(cards.length, new Set(cards.map(c => c.id)).size, `${lesson.id}: duplicate Explore card id`);
  for (const card of cards) {
    assert.ok(card, `${lesson.id}: Explore cards array has a hole`);
    const code = card.code.join('\n');
    const wrapped = code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
    const result = await compileAndRunKotlin(wrapped);
    assert.ok(result.success, `${lesson.id}::${card.id}: Explore example failed to run: ${JSON.stringify(result.error)}`);
    executions++;
  }
  const questions = lesson.predict!.questions;
  assert.equal(questions.length, new Set(questions.map(q => q.id)).size, `${lesson.id}: duplicate Predict question id`);
  for (const q of questions) {
    assert.ok(q, `${lesson.id}: Predict questions array has a hole`);
    assert.equal(q.options.filter(o => o.isCorrect).length, 1, `${q.id}: must have exactly one correct option`);
    if (!q.code) continue;
    const code = q.code.join('\n');
    const wrapped = code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
    const result = await compileAndRunKotlin(wrapped);
    // A handful of Predict questions are deliberately conceptual/performance-
    // reasoning-only (code is a comment, e.g. "// Need the first 3 matches
    // from a long source...") and are not meant to execute -- skip those.
    const isConceptualOnly = code.trim().startsWith('//');
    if (isConceptualOnly) continue;
    const correct = q.options.find(o => o.isCorrect)!;
    // World 14's single-use-sequence lesson correctly teaches that a
    // second traversal of a no-seed generateSequence THROWS
    // IllegalStateException -- that's the correct answer, not a runner
    // bug, so this specific shape must NOT require success.
    const expectsException = /exception|error/i.test(correct.label);
    if (expectsException) {
      assert.ok(!result.success, `${lesson.id}::${q.id}: expected a runtime error (per its own correct answer), but it succeeded with ${JSON.stringify(result.output)}`);
      executions++;
      continue;
    }
    assert.ok(result.success, `${lesson.id}::${q.id}: Predict example failed to run: ${JSON.stringify(result.error)}`);
    if (q.prompt.toLowerCase().includes('what') && (q.prompt.toLowerCase().includes('print') || q.prompt.toLowerCase().includes('printed'))) {
      assert.equal(result.output, correct.label.replace(/\\n/g, '\n'), `${q.id}: correct option must match real execution`);
    }
    executions++;
  }

  assert.ok(lesson.writeRun, `${lesson.id}: missing writeRun stage`);
  assert.ok(lesson.debug, `${lesson.id}: missing debug stage`);
  if (!lesson.writeRun || !lesson.debug) continue;
  const write = lesson.writeRun;
  const debug = lesson.debug;
  assert.equal(write.expectedOutput, write.testCase.expected);
  await verify(write.solutionCode, write.expectedOutput, `${lesson.id}: write solution`);
  await verify(write.initialCode, write.expectedOutput, `${lesson.id}: unfinished starter`, false);
  await verify(debug.fixedCode, debug.expectedOutput, `${lesson.id}: debug solution`);
  await verify(debug.brokenCode, debug.expectedOutput, `${lesson.id}: broken debug`, false);
}
console.log(`World 14 content audit passed: ${lessons.length} lessons, ${executions} runner checks.`);
