import assert from 'node:assert/strict';
import {
  LAUNCH_ASYNC_LESSON,
  AWAIT_SUSPENDING_FUNCTIONS_LESSON,
  SUSPEND_COROUTINE_CONTEXT_LESSON,
  DISPATCHERS_JOBS_LESSON,
  CANCELLATION_COOPERATIVE_CANCELLATION_LESSON,
  STRUCTURED_CONCURRENCY_LESSON,
  COROUTINE_SCOPE_LESSON,
  SUPERVISOR_SCOPE_LESSON,
  EXCEPTION_HANDLING_IN_COROUTINES_LESSON,
  COROUTINE_BEST_PRACTICES_LESSON,
  CONCURRENT_TASK_RUNNER_BOSS_LESSON,
} from '../data/curriculum/world16LessonsData';
import { compileAndRunKotlin, transpileKotlinToJS } from './kotlinRunner';

type ProgramCase = { id: string; code: string; expected: string; success: boolean };
const lesson2 = LAUNCH_ASYNC_LESSON;
const lesson3 = AWAIT_SUSPENDING_FUNCTIONS_LESSON;
const lesson4 = SUSPEND_COROUTINE_CONTEXT_LESSON;
const lesson5 = DISPATCHERS_JOBS_LESSON;
const lesson6 = CANCELLATION_COOPERATIVE_CANCELLATION_LESSON;
const lesson7 = STRUCTURED_CONCURRENCY_LESSON;
const lesson8 = COROUTINE_SCOPE_LESSON;
const lesson9 = SUPERVISOR_SCOPE_LESSON;
const lesson10 = EXCEPTION_HANDLING_IN_COROUTINES_LESSON;
const lesson11 = COROUTINE_BEST_PRACTICES_LESSON;
const lesson12 = CONCURRENT_TASK_RUNNER_BOSS_LESSON;

// Lesson 2 was missing from this file entirely in the delivered handoff --
// added here, cases derived directly from the shipped lesson object (never
// hand-copied) and every expected value confirmed by actually running the
// code through compileAndRunKotlin (see PITFALLS.md's "World 16 Lessons
// 2-12 handoff" entry).
const lesson2Cases: ProgramCase[] = [
  { id: 'lesson-2.learn', code: lesson2.learn.codeSnippet.join('\n'), expected: 'saved=true\ntotal=42', success: true },
  ...lesson2.explore.cards.map((card, index) => ({ id: `lesson-2.${card.id}`, code: card.code.join('\n'), expected: ['waiting\nsent', '3', '9', 'false\n8\ntrue', 'true:7'][index], success: true })),
  ...lesson2.predict.questions.map((question, index) => ({ id: `lesson-2.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['waiting\nsent', '5', '', 'false\n12\ntrue', 'true:9'][index], success: true })),
  { id: 'lesson-2.write.solution', code: lesson2.writeRun!.solutionCode, expected: '15', success: true },
  { id: 'lesson-2.write.starter', code: lesson2.writeRun!.initialCode, expected: '', success: true },
  { id: 'lesson-2.debug.fixed', code: lesson2.debug!.fixedCode, expected: 'ready', success: true },
  { id: 'lesson-2.debug.broken', code: lesson2.debug!.brokenCode, expected: 'Job{Active}', success: true },
];

const lesson3Cases: ProgramCase[] = [
  { id: 'lesson-3.learn', code: lesson3.learn.codeSnippet.join('\n'), expected: '7', success: true },
  ...lesson3.explore.cards.map((card, index) => ({ id: `lesson-3.${card.id}`, code: card.code.join('\n'), expected: ['7', '8', 'resumed', '9', 'first\nsecond\n5', '9'][index], success: true })),
  ...lesson3.predict.questions.map((question, index) => ({ id: `lesson-3.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['7', '', '', '11', 'one\ntwo\n3', '13'][index], success: index !== 1 })),
  { id: 'lesson-3.write.solution', code: lesson3.writeRun!.solutionCode, expected: 'ready', success: true },
  { id: 'lesson-3.write.starter', code: lesson3.writeRun!.initialCode, expected: '', success: false },
  { id: 'lesson-3.debug.fixed', code: lesson3.debug!.fixedCode, expected: '16', success: true },
  { id: 'lesson-3.debug.broken', code: lesson3.debug!.brokenCode, expected: 'NaN', success: true },
];

const lesson4Cases: ProgramCase[] = [
  { id: 'lesson-4.learn', code: lesson4.learn.codeSnippet.join('\n'), expected: 'true', success: true },
  ...lesson4.explore.cards.map((card, index) => ({ id: `lesson-4.${card.id}`, code: card.code.join('\n'), expected: ['true', 'reader', 'parent', 'inner\nouter', '42'][index], success: true })),
  ...lesson4.predict.questions.map((question, index) => ({ id: `lesson-4.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['true', 'api', 'B\nA', '42', ''][index], success: true })),
  { id: 'lesson-4.write.solution', code: lesson4.writeRun!.solutionCode, expected: 'true', success: true },
  { id: 'lesson-4.write.starter', code: lesson4.writeRun!.initialCode, expected: 'false', success: true },
  { id: 'lesson-4.debug.fixed', code: lesson4.debug!.fixedCode, expected: '42', success: true },
  { id: 'lesson-4.debug.broken', code: lesson4.debug!.brokenCode, expected: '0', success: true },
];

const lesson5Cases: ProgramCase[] = [
  { id: 'lesson-5.learn', code: lesson5.learn.codeSnippet.join('\n'), expected: 'computed\ntrue', success: true },
  ...lesson5.explore.cards.map((card, index) => ({ id: `lesson-5.${card.id}`, code: card.code.join('\n'), expected: ['cpu\ntrue', 'loaded', 'cpu\nio\ntrue', 'false\ntrue', ''][index], success: true })),
  ...lesson5.predict.questions.map((question, index) => ({ id: `lesson-5.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['work\ntrue', '', 'sent', '22', ''][index], success: true })),
  { id: 'lesson-5.write.solution', code: lesson5.writeRun!.solutionCode, expected: 'true', success: true },
  { id: 'lesson-5.write.starter', code: lesson5.writeRun!.initialCode, expected: 'false', success: true },
  { id: 'lesson-5.debug.fixed', code: lesson5.debug!.fixedCode, expected: 'uploaded\ntrue', success: true },
  { id: 'lesson-5.debug.broken', code: lesson5.debug!.brokenCode, expected: 'false\nuploaded', success: true },
];

const lesson6Cases: ProgramCase[] = [
  { id: 'lesson-6.learn', code: lesson6.learn.codeSnippet.join('\n'), expected: 'true', success: true },
  ...lesson6.explore.cards.map((card, index) => ({ id: `lesson-6.${card.id}`, code: card.code.join('\n'), expected: ['false\ntrue', 'true', 'stopped', 'true', 'cleanup\ntrue'][index], success: true })),
  ...lesson6.predict.questions.map((question, index) => ({ id: `lesson-6.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['true', 'done', 'release\njoined', 'continued', '', ''][index], success: true })),
  { id: 'lesson-6.write.solution', code: lesson6.writeRun!.solutionCode, expected: 'true', success: true },
  { id: 'lesson-6.write.starter', code: lesson6.writeRun!.initialCode, expected: 'continued\ntrue', success: true },
  { id: 'lesson-6.debug.fixed', code: lesson6.debug!.fixedCode, expected: 'cleanup\ntrue', success: true },
  { id: 'lesson-6.debug.broken', code: lesson6.debug!.brokenCode, expected: 'true', success: true },
];

const lesson7Cases: ProgramCase[] = [
  { id: 'lesson-7.learn', code: lesson7.learn.codeSnippet.join('\n'), expected: 'child\nscope complete', success: true },
  ...lesson7.explore.cards.map((card, index) => ({ id: `lesson-7.${card.id}`, code: card.code.join('\n'), expected: ['child\nafter', 'first\nsecond\nall done', 'parent child\ngrandchild\ncomplete', 'true', 'caught'][index], success: true })),
  ...lesson7.predict.questions.map((question, index) => ({ id: `lesson-7.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['inside\noutside', 'A\nB\nC', 'nested\ndone', '3', ''][index], success: true })),
  { id: 'lesson-7.write.solution', code: lesson7.writeRun!.solutionCode, expected: '7', success: true },
  { id: 'lesson-7.write.starter', code: lesson7.writeRun!.initialCode, expected: '0', success: true },
  { id: 'lesson-7.debug.fixed', code: lesson7.debug!.fixedCode, expected: '9', success: true },
  { id: 'lesson-7.debug.broken', code: lesson7.debug!.brokenCode, expected: '0', success: true },
];

const lesson8Cases: ProgramCase[] = [
  { id: 'lesson-8.learn', code: lesson8.learn.codeSnippet.join('\n'), expected: '10', success: true },
  ...lesson8.explore.cards.map((card, index) => ({ id: `lesson-8.${card.id}`, code: card.code.join('\n'), expected: ['4', '10', 'child\ndone', '7', 'caught'][index], success: true })),
  ...lesson8.predict.questions.map((question, index) => ({ id: `lesson-8.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['42', 'prepared\nready', '7', '', ''][index], success: index !== 3 })),
  { id: 'lesson-8.write.solution', code: lesson8.writeRun!.solutionCode, expected: '10', success: true },
  { id: 'lesson-8.write.starter', code: lesson8.writeRun!.initialCode, expected: '0', success: true },
  { id: 'lesson-8.debug.fixed', code: lesson8.debug!.fixedCode, expected: 'ready', success: true },
  { id: 'lesson-8.debug.broken', code: lesson8.debug!.brokenCode, expected: 'pending', success: true },
];

const lesson9Cases: ProgramCase[] = [
  { id: 'lesson-9.learn', code: lesson9.learn.codeSnippet.join('\n'), expected: 'bad\n7', success: true },
  ...lesson9.explore.cards.map((card, index) => ({ id: `lesson-9.${card.id}`, code: card.code.join('\n'), expected: ['child\nafter', 'bad\n7', 'handled', 'scope failed', 'true'][index], success: true })),
  ...lesson9.predict.questions.map((question, index) => ({ id: `lesson-9.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['caught\n5', 'owned\ndone', '', '', ''][index], success: true })),
  { id: 'lesson-9.write.solution', code: lesson9.writeRun!.solutionCode, expected: 'bad\n7', success: true },
  { id: 'lesson-9.write.starter', code: lesson9.writeRun!.initialCode, expected: 'bad\n7\nscope failed', success: true },
  { id: 'lesson-9.debug.fixed', code: lesson9.debug!.fixedCode, expected: 'offline\ncached', success: true },
  { id: 'lesson-9.debug.broken', code: lesson9.debug!.brokenCode, expected: 'offline\ncached\nscope failed', success: true },
];

// Lesson 10 was redesigned after the original handoff's content was found to
// contradict real Kotlin (verified against Kotlin 2.0.21/coroutines 1.8.1):
// catching a failed Deferred's exception at await() does not stop an
// ordinary (non-supervised) scope from still failing. Learn/Explore-1/
// Predict-1 now correctly expect that crash; Write & Run and Debug's fixed
// code now use supervisorScope to actually isolate the failure. See
// PITFALLS.md's "World 16 Lessons 2-12 handoff" entry for the full record.
const lesson10Cases: ProgramCase[] = [
  { id: 'lesson-10.learn', code: lesson10.learn.codeSnippet.join('\n'), expected: 'bad', success: false },
  ...lesson10.explore.cards.map((card, index) => ({ id: `lesson-10.${card.id}`, code: card.code.join('\n'), expected: ['bad', 'scope failed', 'true', 'handled', 'cleanup'][index], success: index !== 0 })),
  ...lesson10.predict.questions.map((question, index) => ({ id: `lesson-10.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['caught', 'owner', '', 'true', ''][index], success: index !== 0 })),
  { id: 'lesson-10.write.solution', code: lesson10.writeRun!.solutionCode, expected: '-1', success: true },
  { id: 'lesson-10.write.starter', code: lesson10.writeRun!.initialCode, expected: '', success: false },
  { id: 'lesson-10.debug.fixed', code: lesson10.debug!.fixedCode, expected: 'handled', success: true },
  { id: 'lesson-10.debug.broken', code: lesson10.debug!.brokenCode, expected: 'done', success: true },
];

// Lesson 11 was originally left "conceptual only" per the delivered
// handoff's own claim, but its own data already shipped a real Write & Run
// and Debug pair using GlobalScope/withContext -- a genuine inconsistency
// (see PITFALLS.md's "World 16 Lesson 11" entry). Brought into scope,
// engine support added for GlobalScope.launch (deliberately never run --
// see kotlinGlobalScopeLaunch's doc comment), and content de-duplicated
// from 8 reused-template Explore/Predict cards (only 4 unique) down to a
// coverage-driven 4/5, all verified.
const lesson11Cases: ProgramCase[] = [
  { id: 'lesson-11.learn', code: lesson11.learn.codeSnippet.join('\n'), expected: '12', success: true },
  ...lesson11.explore.cards.map((card, index) => ({ id: `lesson-11.${card.id}`, code: card.code.join('\n'), expected: ['12', '0', '81', '12'][index], success: true })),
  ...lesson11.predict.questions.map((question, index) => ({ id: `lesson-11.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['12', '0', '12', '', ''][index], success: true })),
  { id: 'lesson-11.write.solution', code: lesson11.writeRun!.solutionCode, expected: '12', success: true },
  { id: 'lesson-11.write.starter', code: lesson11.writeRun!.initialCode, expected: '0', success: true },
  { id: 'lesson-11.debug.fixed', code: lesson11.debug!.fixedCode, expected: '12', success: true },
  { id: 'lesson-11.debug.broken', code: lesson11.debug!.brokenCode, expected: '0', success: true },
];

const lesson12Cases: ProgramCase[] = [
  { id: 'lesson-12.learn', code: lesson12.learn.codeSnippet.join('\n'), expected: '42', success: true },
  ...lesson12.explore.cards.map((card, index) => ({ id: `lesson-12.${card.id}`, code: card.code.join('\n'), expected: ['42', 'cpu', 'true', 'A,B', 'failed', 'A,fallback', 'loaded'][index], success: true })),
  ...lesson12.predict.questions.map((question, index) => ({ id: `lesson-12.${question.id}`, code: (question.code ?? []).join('\n'), expected: ['42', '', 'AB', 'child\ndone', '', '', ''][index], success: index !== 6 })),
  { id: 'lesson-12.write.solution', code: lesson12.writeRun!.solutionCode, expected: 'A,B', success: true },
  { id: 'lesson-12.write.starter', code: lesson12.writeRun!.initialCode, expected: '', success: true },
  { id: 'lesson-12.debug.fixed', code: lesson12.debug!.fixedCode, expected: 'A,fallback', success: true },
  { id: 'lesson-12.debug.broken', code: lesson12.debug!.brokenCode, expected: 'A,fallback\nscope failed', success: true },
];

function assertLessonStructure(
  lesson: typeof lesson2,
  exploreCount: number,
  predictCount: number,
  correctPositions?: number[],
): void {
  assert.equal(lesson.explore.cards.length, exploreCount);
  assert.equal(lesson.predict.questions.length, predictCount);
  assert.equal(new Set(lesson.explore.cards.map(card => card.code.join('\n'))).size, exploreCount);
  assert.equal(new Set(lesson.predict.questions.map(question => question.code?.join('\n'))).size, predictCount);
  if (correctPositions) {
    assert.deepEqual(lesson.predict.questions.map(question => question.options.findIndex(option => option.isCorrect)), correctPositions);
  }
}

async function verifyCases(cases: ProgramCase[]): Promise<void> {
  for (const test of cases) {
    const result = await compileAndRunKotlin(test.code);
    assert.equal(result.success, test.success, `${test.id}: ${result.error?.message ?? ''}`);
    if (test.success) assert.equal(result.output, test.expected, test.id);
    assert.equal(typeof transpileKotlinToJS(test.code), 'string', test.id);
  }
}

export async function verifyWorld16CoroutineLessons(): Promise<void> {
  assertLessonStructure(lesson2, 5, 5, [1, 3, 2, 0, 1]);
  assertLessonStructure(lesson3, 6, 6);
  assertLessonStructure(lesson4, 5, 5, [1, 2, 0, 3, 1]);
  assertLessonStructure(lesson5, 5, 5, [1, 2, 3, 0, 1]);
  assertLessonStructure(lesson6, 5, 6, [1, 2, 3, 0, 1, 2]);
  assertLessonStructure(lesson7, 5, 5, [1, 2, 3, 0, 1]);
  assertLessonStructure(lesson8, 5, 5, [1, 2, 3, 0, 1]);
  assertLessonStructure(lesson9, 5, 5, [1, 2, 3, 0, 1]);
  assertLessonStructure(lesson10, 5, 5, [1, 2, 3, 0, 1]);
  assertLessonStructure(lesson11, 4, 5, [0, 2, 3, 1, 2]);
  assertLessonStructure(lesson12, 7, 7, [1, 2, 3, 0, 1, 2, 3]);
  await verifyCases(lesson2Cases);
  await verifyCases(lesson3Cases);
  await verifyCases(lesson4Cases);
  await verifyCases(lesson5Cases);
  await verifyCases(lesson6Cases);
  await verifyCases(lesson7Cases);
  await verifyCases(lesson8Cases);
  await verifyCases(lesson9Cases);
  await verifyCases(lesson10Cases);
  await verifyCases(lesson11Cases);
  await verifyCases(lesson12Cases);
  assert.notEqual('NaN', lesson3.debug!.expectedOutput);
  assert.notEqual('false', lesson4.writeRun!.expectedOutput);
  assert.notEqual('0', lesson4.debug!.expectedOutput);
  assert.notEqual('false', lesson5.writeRun!.expectedOutput);
  assert.notEqual('false\nuploaded', lesson5.debug!.expectedOutput);
  assert.notEqual('continued\ntrue', lesson6.writeRun!.expectedOutput);
  assert.notEqual('true', lesson6.debug!.expectedOutput);
  assert.notEqual('0', lesson7.writeRun!.expectedOutput);
  assert.notEqual('0', lesson7.debug!.expectedOutput);
  assert.notEqual('0', lesson8.writeRun!.expectedOutput);
  assert.notEqual('pending', lesson8.debug!.expectedOutput);
  assert.notEqual('bad\n7\nscope failed', lesson9.writeRun!.expectedOutput);
  assert.notEqual('offline\ncached\nscope failed', lesson9.debug!.expectedOutput);
  assert.notEqual('', lesson10.writeRun!.expectedOutput);
  assert.notEqual('done', lesson10.debug!.expectedOutput);
  assert.notEqual('', lesson12.writeRun!.expectedOutput);
  assert.notEqual('A,fallback\nscope failed', lesson12.debug!.expectedOutput);
}

export const world16CoroutineCaseCount = lesson2Cases.length + lesson3Cases.length + lesson4Cases.length + lesson5Cases.length + lesson6Cases.length + lesson7Cases.length + lesson8Cases.length + lesson9Cases.length + lesson10Cases.length + lesson11Cases.length + lesson12Cases.length;
