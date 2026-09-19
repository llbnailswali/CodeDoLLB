/** Exact execution evidence; editorial acceptance lives in WORLD_10_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { WORLD_10_ADDED_EXAMPLE_OUTCOMES, WORLD_10_ADDED_PREDICTION_OUTCOMES, type World10Outcome } from '../src/data/curriculum/world10LessonsData';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const world = CODEDO_MASTER_WORLDS.find(entry => entry.id === 'world-10')!;
assert.ok(world, 'world-10 missing in catalog');
const learnOutputs = ['[20, 40]', '[1, 3, 4]', '16', '[2, 4]', '[[1, 2], [3, 4], [5]]', '[1, 2, 3]', '8', 'true', '[30, 40]', '90'];
const originalExampleOutputs = [
  ['[87, 95, 80]', '[20, 50]', '[apple, banana, cherry]', '[6, 2, 8]\n[3, 1, 4]'],
  ['[100, 200, 204]', '[alpha, beta]', '[1, 2, 3, 4]'],
  ['[1, 2, 3, 4, 5]', '24', '80'],
  ['[hi, go]\n[sun, sky]', 'User-101\nUser-102', '[5, 8, 0]\n[-2, -7]'],
  ['[(Ann, 95), (Bob, 88)]', '[Alice:90, Bob:85]', '[[1, 2], [3, 4], [5]]', '[[10, 20], [20, 30], [30, 40]]'],
  ['[4, 2, 1, 5]', '[alpha, beta, gamma]\n[gamma, beta, alpha]', '[1, 2, 3]\n[3, 1, 2]'],
  ['[ox, cat, giraffe, elephant]', '9\n28', 'null\nnull'],
  ['60\n20.0', 'true\ntrue\ntrue', 'true\nfalse\ntrue'],
  ['7\nnull', '3', '120'],
  ['[30, 44, 70]', '[60, 150]', '165'],
];
const program = (source: string) => source.includes('fun main(') ? source : `fun main() {\n${source}\n}`;
const references: { name: string; code: string; outcome: World10Outcome }[] = [];
const ids = new Set<string>(), seen = new Set<string>();
let examples = 0, predictions = 0, checks = 0, failures = 0;

async function verify(name: string, source: string, outcome: World10Outcome) {
  const code = program(source), result = await compileAndRunKotlin(code);
  const correct = result.output === outcome.output && (outcome.error ? !result.success && result.error?.type === outcome.error : result.success);
  if (!correct) { failures++; console.error(name, 'expected', outcome, 'received', result); }
  references.push({ name, code, outcome });
}

for (const [lessonIndex, entry] of world.lessons.entries()) {
  const lesson = AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!];
  assert.ok(lesson, `${entry.id}: missing registered lesson`);
  assert.equal(lesson.worldId, world.id);
  assert.ok(!seen.has(lesson.id), `${lesson.id}: duplicate registration`); seen.add(lesson.id);
  await verify(`${lesson.id}/Learn`, lesson.learn.codeSnippet.join('\n'), { output: learnOutputs[lessonIndex] });
  for (const [cardIndex, card] of lesson.explore!.cards.entries()) {
    assert.ok(!ids.has(card.id), `${card.id}: duplicate activity ID`); ids.add(card.id);
    const outcome = WORLD_10_ADDED_EXAMPLE_OUTCOMES[card.id] ?? { output: originalExampleOutputs[lessonIndex][cardIndex] };
    assert.notEqual(outcome.output, undefined, `${card.id}: missing hand-traced outcome`);
    await verify(card.id, card.code.join('\n'), outcome); examples++;
  }
  const questions = lesson.predict!.questions;
  assert.equal(entry.questionsCount, questions.length, `${entry.id}: stale catalog question count`);
  for (const [index, question] of questions.entries()) {
    assert.ok(!ids.has(question.id), `${question.id}: duplicate activity ID`); ids.add(question.id);
    assert.equal(question.questionNumber, index + 1); assert.equal(question.totalQuestions, questions.length);
    assert.equal(question.options.filter(option => option.isCorrect).length, 1, `${question.id}: answer key`);
    assert.equal(new Set(question.options.map(option => option.id)).size, 4);
    assert.equal(new Set(question.options.map(option => option.label)).size, 4);
    const correct = question.options.find(option => option.isCorrect)!;
    const outcome = WORLD_10_ADDED_PREDICTION_OUTCOMES[question.id] ?? { output: correct.label };
    if (!outcome.error) assert.equal(correct.label, outcome.output);
    await verify(question.id, question.code!.join('\n'), outcome); predictions++;
  }
  const write = lesson.writeRun!, debug = lesson.debug!;
  assert.notEqual(write.solutionCode.replace(/\s+/g, ''), debug.fixedCode.replace(/\s+/g, ''), `${lesson.id}: duplicate Write/Debug scenario`);
  for (const [stage, code, expected, shouldPass] of [
    ['write solution', write.solutionCode, write.expectedOutput, true], ['unfinished starter', write.initialCode, write.expectedOutput, false],
    ['debug repair', debug.fixedCode, debug.expectedOutput, true], ['broken debug', debug.brokenCode, debug.expectedOutput, false],
  ] as const) {
    const result = await compileAndRunKotlin(code);
    if ((result.success && result.output === expected) !== shouldPass) { failures++; console.error(lesson.id, stage, result); }
    if (shouldPass) references.push({ name: `${lesson.id}/${stage}`, code, outcome: { output: expected } });
    checks++;
  }
  assert.equal(write.testCase.expected, write.expectedOutput);
  console.log(`${lesson.id}: ${lesson.explore!.cards.length} Explore, ${questions.length} Predict`);
}
assert.equal(Object.keys(WORLD_10_ADDED_EXAMPLE_OUTCOMES).length, examples - 32);
assert.equal(Object.keys(WORLD_10_ADDED_PREDICTION_OUTCOMES).length, predictions - 32);
if (process.env.WORLD10_REFERENCE_EXPORT) writeFileSync(process.env.WORLD10_REFERENCE_EXPORT, JSON.stringify(references, null, 2));
console.log(`World 10: ${seen.size} lessons, ${examples} Explore, ${predictions} Predict, ${checks} writing/debug executions; ${failures} failures.`);
console.log('Status: Audit in progress. Browser QA and hardcode resistance remain open.');
assert.equal(failures, 0);
