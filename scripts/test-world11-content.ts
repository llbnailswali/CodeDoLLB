import assert from 'node:assert/strict';
import { WORLD_11_LESSONS } from '../src/data/curriculum/world11LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const world = CODEDO_MASTER_WORLDS.find(world => world.id === 'world-11')!;
assert.equal(WORLD_11_LESSONS.length, 14);
const runnableIds = new Set([
  'world-11-data-classes-domain-modeling-enum-classes',
  'world-11-object-declarations',
  'world-11-boss',
]);
let executions = 0;
async function verify(code: string, expected: string, name: string, shouldPass = true) {
  const result = await compileAndRunKotlin(code);
  const passes = result.success && result.output === expected;
  assert.equal(passes, shouldPass, `${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  executions++;
}
for (const [index, lesson] of WORLD_11_LESSONS.entries()) {
  const entry = world.lessons[index];
  assert.equal(AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!], lesson, `${entry.id}: wrong lesson registration`);
  assert.equal(entry.questionsCount, lesson.predict!.questions.length, `${entry.id}: stale question count`);
  assert.ok(!entry.description.includes('Placeholder'), `${entry.id}: stale description`);
  assert.ok(lesson.learn.codeSnippet.some(line => line.includes('fun main()')), `${lesson.id}: missing real Learn example`);
  assert.ok(lesson.explore!.cards.length >= 3);
  assert.ok(lesson.predict!.questions.length >= 3);
  assert.equal(new Set(lesson.explore!.cards.map(card => card.code.join('\n'))).size, lesson.explore!.cards.length);
  assert.equal(new Set(lesson.predict!.questions.map(question => question.code!.join('\n'))).size, lesson.predict!.questions.length);
  for (const question of lesson.predict!.questions) {
    assert.ok(question.code!.length > 3);
    assert.equal(question.options.filter(option => option.isCorrect).length, 1);
    assert.equal(new Set(question.options.map(option => option.label)).size, 4);
    assert.equal(question.totalQuestions, lesson.predict!.questions.length);
  }
  assert.equal(Boolean(lesson.writeRun), runnableIds.has(lesson.id), `${lesson.id}: changed editor capability gating`);
  assert.equal(Boolean(lesson.debug), runnableIds.has(lesson.id));
  if (!lesson.writeRun || !lesson.debug) continue;
  const write = lesson.writeRun;
  const debug = lesson.debug;
  assert.equal(write.expectedOutput, write.testCase.expected);
  await verify(write.solutionCode, write.expectedOutput, `${lesson.id}: write solution`);
  await verify(write.initialCode, write.expectedOutput, `${lesson.id}: unfinished starter`, false);
  await verify(debug.fixedCode, debug.expectedOutput, `${lesson.id}: debug solution`);
  await verify(debug.brokenCode, debug.expectedOutput, `${lesson.id}: broken debug`, false);

}
console.log(`World 11 content audit passed: 14 lessons, ${executions} runner checks.`);
