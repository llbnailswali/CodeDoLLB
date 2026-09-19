/** Execution/structure evidence only. Editorial acceptance lives in WORLD_2_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-2')!;
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

// Hardcode-resistance spot checks (same technique as World 1's audit, see
// W1-08 / WORLD_1_CONTENT_REVIEW.md): mutate a solutionCode's own input
// literals and confirm the recomputed output differs from the original
// expected output, so a hardcoded println of the original answer would fail.
// Only 2 of 7 lessons are checked this way -- not full-world coverage.
const hardcodeChecks: Array<{ id: string; mutated: string; mustNotEqual: string }> = [
  {
    id: 'world-2-arithmetic-operators writeRun (Split the Loot)',
    mutated: `fun main() {
    val coins = 30
    val players = 4
    val share = coins / players
    val leftover = coins % players
    println("Each player gets $share coins, with $leftover left over")
}`,
    mustNotEqual: 'Each player gets 9 coins, with 2 left over',
  },
  {
    id: 'world-2-boss writeRun (Smart Calculator)',
    mutated: `fun main() {
    var total = 0
    total += 10
    total += 5
    val budget = 100
    val withinBudget = total <= budget
    var attempts = 0
    attempts++
    println("Total: $total")
    println("Within budget: $withinBudget")
    println("Attempts: $attempts")
}`,
    mustNotEqual: 'Total: 75\nWithin budget: true\nAttempts: 1',
  },
];
for (const { id, mutated, mustNotEqual } of hardcodeChecks) {
  const result = await compileAndRunKotlin(mutated);
  assert.ok(result.success, `${id}: mutated input failed to run: ${JSON.stringify(result)}`);
  assert.notEqual(result.output, mustNotEqual, `${id}: HARDCODE RISK -- output unchanged after mutating the input, so a literal print would also pass`);
  checks++;
}
console.log(`Hardcode-resistance spot checks passed: ${hardcodeChecks.length} (of ${seen.size} lessons -- not yet full-world coverage).`);

console.log('This checks existing activities, not concept coverage, all prediction semantics, UI quality or Kotlin compiler equivalence. Quality status: see WORLD_2_CONTENT_REVIEW.md.');
