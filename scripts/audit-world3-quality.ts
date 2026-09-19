/** Execution/structure evidence only. Editorial acceptance lives in WORLD_3_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-3')!;
const seen = new Set<string>();
let checks = 0, predictions = 0, examples = 0;
const diagnostics: string[] = [];
const exampleGaps: string[] = [];
for (const entry of world.lessons) {
 const lesson = AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!];
 assert.ok(lesson, `${entry.id}: missing registered lesson`);
 assert.ok(!seen.has(lesson.id), `${entry.id}: repeated catalog lesson`);
 seen.add(lesson.id);
 const questions = lesson.predict?.questions ?? [];
 const cards = lesson.explore?.cards ?? [];
 predictions += questions.length; examples += cards.length;
 for (const card of cards) {
  const fragment = card.code.join('\n');
  const code = fragment.includes('fun main(') ? fragment : `fun main() {\n${fragment}\n}`;
  const result = await compileAndRunKotlin(code);
  if (!result.success) exampleGaps.push(`${lesson.id}/${card.id}: ${result.error?.message}`);
 }

 assert.equal(entry.questionsCount, questions.length, `${entry.id}: stale question count`);
 for (const question of questions) {
  assert.equal(question.options.filter(o => o.isCorrect).length, 1, `${question.id}: answer key`);
  assert.equal(question.totalQuestions, questions.length, `${question.id}: stale total`);
 }
 const write = lesson.writeRun, debug = lesson.debug;
 for (const [stage, code, expected, shouldPass] of [
  ['write solution', write?.solutionCode, write?.expectedOutput, true],
  ['unfinished starter', write?.initialCode, write?.expectedOutput, false],
  ['debug repair', debug?.fixedCode, debug?.expectedOutput, true],
  ['broken debug', debug?.brokenCode, debug?.expectedOutput, false],
 ] as const) {
  if (!code) continue;
  const result = await compileAndRunKotlin(code);
  assert.equal(result.success && result.output === expected, shouldPass, `${lesson.id} ${stage}: ${JSON.stringify(result)}`);
  if (result.error?.message.includes('Cannot read properties')) diagnostics.push(`${lesson.id}: ${result.error.message}`);
  checks++;
 }
 console.log(`${lesson.id}: ${cards.length} Explore, ${questions.length} Predict; writing ${!!write}, debugging ${!!debug}`);
}
console.log(`Evidence: ${seen.size} catalog lessons, ${examples} examples, ${predictions} predictions, ${checks} execution checks passed.`);
for (const diagnostic of diagnostics) console.log(`OPEN DIAGNOSTIC DEFECT: ${diagnostic}`);
for (const gap of exampleGaps) console.log(`OPEN EXAMPLE EXECUTION GAP: ${gap}`);
console.log('This checks existing activities, not concept coverage, all prediction semantics, UI quality or Kotlin compiler equivalence. Quality status: see WORLD_3_CONTENT_REVIEW.md.');
