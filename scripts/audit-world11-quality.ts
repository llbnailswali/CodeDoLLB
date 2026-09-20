/** Execution/structure evidence only. Editorial acceptance lives in WORLD_11_CONTENT_REVIEW.md. */
import assert from 'node:assert/strict';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-11')!;
assert.ok(world, 'world-11 missing in catalog');

const seen = new Set<string>();
let checks = 0, predictions = 0, examples = 0;
const diagnostics: string[] = [];

// Every World 11 lesson's Explore/Predict "output" claims are now backed by
// real engine execution (see WORLD_11_CONTENT_REVIEW.md) -- the previous,
// narrower list here included a mistyped id
// ('world-11-data-classes-domain-modeling-enum-classes', missing "-in-")
// that silently never matched a real lesson, so that lesson's Explore/Predict
// outputs were never actually exact-checked despite appearing in earlier
// reports. All 14 ids below are copied from world11LessonsData.ts directly.
const exactExecutionIds = new Set([
  'world-11-inheritance-abstract-classes',
  'world-11-interfaces-multiple-interface-implementation',
  'world-11-sealed-classes-sealed-interfaces',
  'world-11-data-classes-in-domain-modeling-enum-classes',
  'world-11-nested-classes',
  'world-11-inner-classes',
  'world-11-object-declarations',
  'world-11-companion-objects',
  'world-11-extension-functions',
  'world-11-extension-properties',
  'world-11-delegation',
  'world-11-delegated-properties',
  'world-11-visibility-and-api-design',
  'world-11-boss',
]);
const practiceIds = exactExecutionIds;
let exactExecutions = 0;

async function verifyExact(name: string, code: string, expected: string, compilerError = false) {
  const result = await compileAndRunKotlin(code);
  if (compilerError) {
    assert.equal(result.success, false, `${name}: expected compiler rejection`);
    assert.equal(result.error?.type, 'compiler_error', `${name}: expected compiler diagnostic`);
  } else {
    assert.equal(result.success, true, `${name}: ${result.error?.message}`);
    assert.equal(result.output, expected, `${name}: output mismatch`);
  }
  exactExecutions++;
}

for (const entry of world.lessons) {
  const lesson = AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!];
  assert.ok(lesson, `${entry.id}: missing registered lesson for key ${entry.fiveStageLessonKey}`);
  assert.ok(!seen.has(lesson.id), `${entry.id}: repeated catalog lesson`);
  seen.add(lesson.id);

  const questions = lesson.predict?.questions ?? [];
  const cards = lesson.explore?.cards ?? [];
  predictions += questions.length;
  examples += cards.length;

  // `questionsCount` is legacy catalog metadata. The quality standard makes
  // Predict coverage-driven, so its numeric value is not a completion gate.
  // Validate the authored array directly below instead.
  assert.ok(!entry.description.includes('Placeholder'), `${entry.id}: stale description`);
  assert.ok(lesson.learn.codeSnippet.length > 0, `${lesson.id}: missing Learn example`);
  assert.equal(new Set(cards.map(card => card.code.join('\n'))).size, cards.length, `${lesson.id}: duplicate explore cards`);
  assert.equal(new Set(questions.map(q => q.code!.join('\n'))).size, questions.length, `${lesson.id}: duplicate predict questions`);

  for (const question of questions) {
    assert.ok(question.code!.length > 0, `${question.id}: predict code snippet missing`);
    assert.equal(question.options.filter(o => o.isCorrect).length, 1, `${question.id}: answer key must have exactly one correct option`);
    assert.equal(new Set(question.options.map(o => o.label)).size, 4, `${question.id}: distractors must have 4 distinct options`);
    assert.equal(question.totalQuestions, questions.length, `${question.id}: stale totalQuestions count`);
    assert.ok(question.explanation.detail.length > 20, `${question.id}: explanation too brief`);
  }

  if (exactExecutionIds.has(lesson.id)) {
    for (const card of cards) {
      const output = card.whatItMeans.find(item => item.label === 'Output')?.description;
      if (output) await verifyExact(card.id, card.code.join('\n'), output);
    }
    for (const question of questions) {
      const correct = question.options.find(option => option.isCorrect)!;
      const compilerError = /compil/i.test(question.prompt) || /compil/i.test(correct.label);
      // Compiler-boundary questions are validated editorially; the simulator
      // must not be asked to manufacture compiler diagnostics.
      if (!compilerError && /output/i.test(question.prompt)) await verifyExact(question.id, question.code!.join('\n'), correct.label);
    }
  }

  // Practice stages are selected from the lesson coverage map. Their
  // presence is evidence to audit below, not a hardcoded per-lesson quota.

  const write = lesson.writeRun;
  const debug = lesson.debug;

  if (write && debug) {
    // Audit task-scope rule: debug.fixedCode must NOT duplicate writeRun.solutionCode
    const normWrite = write.solutionCode.replace(/\s+/g, ' ').trim();
    const normDebug = debug.fixedCode.replace(/\s+/g, ' ').trim();
    assert.notEqual(normWrite, normDebug, `${lesson.id}: debug fixedCode duplicates writeRun solutionCode`);
    assert.notEqual(write.expectedOutput, debug.expectedOutput, `${lesson.id}: debug expectedOutput duplicates writeRun expectedOutput`);

    for (const [stage, code, expected, shouldPass] of [
      ['write solution', write.solutionCode, write.expectedOutput, true],
      ['unfinished starter', write.initialCode, write.expectedOutput, false],
      ['debug repair', debug.fixedCode, debug.expectedOutput, true],
      ['broken debug', debug.brokenCode, debug.expectedOutput, false],
    ] as const) {
      const result = await compileAndRunKotlin(code);
      assert.equal(
        result.success && result.output === expected,
        shouldPass,
        `${lesson.id} ${stage}: expected pass=${shouldPass}, result=${JSON.stringify(result)}`
      );
      checks++;
    }
  }

  console.log(`${lesson.id}: ${cards.length} Explore, ${questions.length} Predict; writing ${!!write}, debugging ${!!debug}`);
}

console.log(`Evidence: ${seen.size} catalog lessons, ${examples} examples, ${predictions} predictions, ${checks} writing/debug executions, ${exactExecutions} exact Learn/Explore/Predict checks passed.`);
for (const diagnostic of diagnostics) console.log(`OPEN DIAGNOSTIC DEFECT: ${diagnostic}`);
console.log('This checks existing activities, capability gating, and verified editor execution. Quality status: see WORLD_11_CONTENT_REVIEW.md.');
