import assert from 'node:assert/strict';
import { WORLD_13_LESSONS } from '../src/data/curriculum/world13LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const lessons = WORLD_13_LESSONS;
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-13')!;
assert.equal(lessons.length, 10, 'World 13 should register exactly 10 lessons');

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

  // Every Explore card and Predict question must actually run through the
  // real engine (see PITFALLS.md's repeated "reading the data is not
  // enough" rule) -- a card silently becoming `undefined` (an array-hole
  // bug this exact check caught once already) or a scope-function call
  // the engine can't execute would otherwise ship unnoticed.
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
    assert.ok(result.success, `${lesson.id}::${q.id}: Predict example failed to run: ${JSON.stringify(result.error)}`);
    const correct = q.options.find(o => o.isCorrect)!;
    if (q.prompt.toLowerCase().includes('what') && q.prompt.toLowerCase().includes('print')) {
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
console.log(`World 13 content audit passed: ${lessons.length} lessons, ${executions} runner checks.`);
