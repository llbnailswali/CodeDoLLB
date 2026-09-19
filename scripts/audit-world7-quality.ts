/** Execution and editorial evidence; assessment hardening and browser QA remain separate. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { WORLD_7_EXAMPLE_OUTCOMES, WORLD_7_PREDICTION_OUTCOMES, type World7Outcome } from '../src/data/curriculum/world7LessonsData';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
import { nullSafetyCases } from './null-safety-runner-cases';
import { writeFileSync } from 'node:fs';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-7')!;
const seen = new Set<string>(), activityIds = new Set<string>();
let checks = 0, predictions = 0, examples = 0, failures = 0;
const referenceCases: { name: string; code: string; outcome: World7Outcome }[] = [];
export const program = (code: string) => code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
async function verify(name: string, source: string, outcome: World7Outcome) {
 const code = program(source);
 referenceCases.push({ name, code, outcome });
 const result = await compileAndRunKotlin(code);
 const correct = result.output === outcome.output && (outcome.error ? !result.success && result.error?.type === outcome.error : result.success);
 if (!correct) { failures++; console.error(name, 'expected', outcome, 'got', result); }
}
const learnOutputs = ['null', 'Active', 'null', 'Guest', '3', 'No email', '6', 'hello', '[20, null, 25]', '0', 'Ann: 82\nBen: no score yet'];
for (const [index, entry] of world.lessons.entries()) {
 const lesson = AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!];
 assert.ok(lesson, `${entry.id}: missing lesson`);
 assert.equal(lesson.worldId, world.id);
 assert.ok(!seen.has(lesson.id), `${entry.id}: duplicate registration`); seen.add(lesson.id);
 const questions = lesson.predict?.questions ?? [], cards = lesson.explore?.cards ?? [];
 assert.equal(entry.questionsCount, questions.length, `${entry.id}: stale catalog count`);
 await verify(`${lesson.id}/Learn`, lesson.learn.codeSnippet.join('\n'), { output: learnOutputs[index] });
 for (const card of cards) {
  assert.ok(!activityIds.has(card.id)); activityIds.add(card.id);
  assert.ok(WORLD_7_EXAMPLE_OUTCOMES[card.id], `${card.id}: missing hand-traced outcome`);
  await verify(card.id, card.code.join('\n'), WORLD_7_EXAMPLE_OUTCOMES[card.id]); examples++;
 }
 for (const [i, question] of questions.entries()) {
  assert.ok(!activityIds.has(question.id)); activityIds.add(question.id);
  assert.equal(question.options.filter(o => o.isCorrect).length, 1, `${question.id}: answer key`);
  assert.equal(new Set(question.options.map(o => o.label)).size, question.options.length, `${question.id}: duplicated answers`);
  assert.equal(question.totalQuestions, questions.length); assert.equal(question.questionNumber, i + 1);
  const outcome = WORLD_7_PREDICTION_OUTCOMES[question.id];
  assert.ok(outcome, `${question.id}: missing outcome`);
  if (!outcome.error) assert.equal(question.options.find(o => o.isCorrect)!.label, outcome.output, `${question.id}: stale correct answer`);
  await verify(question.id, question.code!.join('\n'), outcome); predictions++;
 }
 for (const [stage, code, expected, shouldPass] of [
  ['write solution', lesson.writeRun!.solutionCode, lesson.writeRun!.expectedOutput, true],
  ['unfinished starter', lesson.writeRun!.initialCode, lesson.writeRun!.expectedOutput, false],
  ['debug repair', lesson.debug!.fixedCode, lesson.debug!.expectedOutput, true],
  ['broken debug', lesson.debug!.brokenCode, lesson.debug!.expectedOutput, false],
 ] as const) {
  const result = await compileAndRunKotlin(code);
  if ((result.success && result.output === expected) !== shouldPass) { failures++; console.error(lesson.id, stage, result); }
  if (shouldPass) referenceCases.push({ name: `${lesson.id}/${stage}`, code, outcome: { output: expected } });
  checks++;
 }
 assert.equal(lesson.writeRun!.testCase.expected, lesson.writeRun!.expectedOutput);
 console.log(`${lesson.id}: ${cards.length} Explore, ${questions.length} Predict; focused writing/debugging checked.`);
}
assert.equal(Object.keys(WORLD_7_EXAMPLE_OUTCOMES).length, examples);
assert.equal(Object.keys(WORLD_7_PREDICTION_OUTCOMES).length, predictions);
for (const test of nullSafetyCases) {
 const result = await compileAndRunKotlin(program(test.body));
 const editorOnlyLimit = test.error === 'compiler_error' && (test.message?.includes('not simulated') || test.message === 'mutable sources' || test.message === 'known primitive source type');
 if (!editorOnlyLimit) referenceCases.push({ name: test.name, code: program(test.body), outcome: { output: test.output, error: test.error } });

 if (result.output !== test.output || (test.error ? result.success || result.error?.type !== test.error : !result.success) || (test.message && !result.error?.message.includes(test.message))) {
  failures++; console.error(test.name, result);
 }
}
console.log(`Null-safety regressions: ${nullSafetyCases.length} cases checked.`);
if (process.env.WORLD7_REFERENCE_EXPORT) writeFileSync(process.env.WORLD7_REFERENCE_EXPORT, JSON.stringify(referenceCases, null, 2));
console.log(`World 7: ${seen.size} lessons, ${examples} Explore, ${predictions} Predict, ${checks} writing/debug checks, ${failures} failures.`);
console.log('Quality status: Audit in progress. Hardcode resistance and browser visual QA are out of scope.');
if (failures) process.exit(1);
