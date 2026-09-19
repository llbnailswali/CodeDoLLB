/** Execution/structure evidence only. Editorial acceptance lives in WORLD_5_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-5')!;
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

// Output-correctness spot checks for the Named Arguments lesson's Explore
// cards. "Runs successfully" alone does not prove the printed value matches
// real Kotlin's named-argument reordering semantics -- see the W5-01 fix in
// PITFALLS.md, found precisely because the audit above only checked success,
// not output, and a broken reordering still ran without error.
const namedArgChecks: Array<{ id: string; code: string; expected: string }> = [
  { id: 'card-move (x=2,y=4 despite call order)', code: `fun main() {
    fun move(x: Int, y: Int) {
        println("$x, $y")
    }
    move(y = 4, x = 2)
}`, expected: '2, 4' },
  { id: 'card-color (labeled same-type args)', code: `fun color(red: Int, green: Int, blue: Int) {
    println("$red $green $blue")
}
fun main() {
    color(red = 255, green = 120, blue = 0)
}`, expected: '255 120 0' },
  { id: 'pred-point (y=7,x=3)', code: `fun main() {
    fun point(x: Int, y: Int) {
        println("$x,$y")
    }
    point(y = 7, x = 3)
}`, expected: '3,7' },
];
for (const { id, code, expected } of namedArgChecks) {
  const result = await compileAndRunKotlin(code);
  assert.equal(result.success && result.output === expected, true, `${id}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  checks++;
}
console.log(`Named-argument output-correctness checks passed: ${namedArgChecks.length}.`);

console.log('This checks existing activities, not concept coverage, all prediction semantics, UI quality or Kotlin compiler equivalence. Quality status: see WORLD_5_CONTENT_REVIEW.md.');
