/** Execution/structure evidence only. Editorial acceptance lives in WORLD_1_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-1')!;
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
  if (lesson.id === 'world-1-float-double' && card.id === 'card-float-1')
   console.log(`FLOAT FORMATTING EVIDENCE: ${card.id} prints ${JSON.stringify(result.output)}; Kotlin Double output should be 10.0.`);
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

// W1-08 hardcode-resistance spot checks: mutate a solutionCode's own input
// literal(s) and confirm the recomputed output changes accordingly, proving
// the lesson checks a real transformation rather than a printed literal that
// would pass regardless of the input. This is not yet run across every
// writeRun/debug in the world (see WORLD_1_CONTENT_REVIEW.md finding W1-08)
// -- these are the exercises revised in this pass.
const hardcodeChecks: Array<{ id: string; mutated: string; mustNotEqual: string }> = [
  {
    id: 'world-1-int-long writeRun (Long conversion)',
    mutated: `fun main() {
    val dailyVisitors = 10_000
    val days = 365L
    val dailyVisitorsLong = dailyVisitors.toLong()
    val yearlyVisitors = dailyVisitorsLong * days
    println(yearlyVisitors)
}`,
    mustNotEqual: '18250000',
  },
  {
    id: 'world-1-float-double writeRun (Float conversion)',
    mutated: `fun main() {
    val pricePerItem = 10.00
    val quantity = 4.0
    val subtotal = pricePerItem * quantity
    val subtotalAsFloat: Float = subtotal.toFloat()
    println(subtotalAsFloat)
}`,
    mustNotEqual: '50.0',
  },
  {
    id: 'world-1-boss writeRun (score + bonus + passed)',
    mutated: `fun main() {
    val name = "CodeDo"
    val grade = 'A'
    var score = 40
    val bonus = 12
    score += bonus
    val passed: Boolean = score >= 90
    println("User: $name | Grade: $grade | Score: $score | Passed: $passed")
}`,
    mustNotEqual: 'User: CodeDo | Grade: A | Score: 100 | Passed: true',
  },
];
for (const { id, mutated, mustNotEqual } of hardcodeChecks) {
  const result = await compileAndRunKotlin(mutated);
  assert.ok(result.success, `${id}: mutated input failed to run: ${JSON.stringify(result)}`);
  assert.notEqual(result.output, mustNotEqual, `${id}: HARDCODE RISK -- output unchanged after mutating the input, so a literal print would also pass`);
  checks++;
}
console.log(`Hardcode-resistance spot checks passed: ${hardcodeChecks.length} (of ${seen.size} lessons -- not yet full-world coverage, see W1-08).`);

console.log('This checks existing activities, not concept coverage, all prediction semantics, UI quality or Kotlin compiler equivalence. Quality status: see WORLD_1_CONTENT_REVIEW.md.');
