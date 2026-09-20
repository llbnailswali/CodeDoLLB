import assert from 'node:assert/strict';
import { WORLD_11_LESSONS } from '../src/data/curriculum/world11LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const world = CODEDO_MASTER_WORLDS.find(world => world.id === 'world-11')!;
assert.equal(WORLD_11_LESSONS.length, 14);
// Every World 11 lesson currently authors both a writeRun and a debug
// stage; this check exists to catch a lesson silently losing one of them
// (an editor-capability regression), not to gate which lessons are
// "runnable" -- see WORLD_11_CONTENT_REVIEW.md for the per-lesson
// execution-capability map.
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
  // A Learn example may legitimately be a labeled fragment (a class/interface
  // shape with no `fun main()`) rather than a full runnable program -- see
  // LESSON_QUALITY_STANDARD.md section 3's "Label fragments versus complete
  // programs". Only check that a real snippet exists, not that it always
  // includes a `main`.
  assert.ok(lesson.learn.codeSnippet.length > 0, `${lesson.id}: missing Learn example`);
  assert.equal(new Set(lesson.explore!.cards.map(card => card.code.join('\n'))).size, lesson.explore!.cards.length);
  assert.equal(new Set(lesson.predict!.questions.map(question => question.code!.join('\n'))).size, lesson.predict!.questions.length);
  for (const question of lesson.predict!.questions) {
    // A short, real reasoning scenario (an equality/identity check, a
    // 2-line construction question) is legitimate; length alone is not a
    // quality signal. Coverage is planned and reviewed in
    // WORLD_11_CONTENT_REVIEW.md's concept map instead.
    assert.ok(question.code!.length > 0, `${question.id}: predict code snippet missing`);
    assert.equal(question.options.filter(option => option.isCorrect).length, 1);
    assert.equal(new Set(question.options.map(option => option.label)).size, 4);
    assert.equal(question.totalQuestions, lesson.predict!.questions.length);
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
console.log(`World 11 content audit passed: 14 lessons, ${executions} runner checks.`);
