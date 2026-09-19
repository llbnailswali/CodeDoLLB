/** Exact execution evidence; browser QA and assessment hardening remain separate. */
import assert from 'node:assert/strict';
import { world9InlineValidationCases } from './world9-inline-validation-cases';
import { writeFileSync } from 'node:fs';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { WORLD_9_ADDED_OUTPUTS, WORLD_9_COMPILE_ERRORS } from '../src/data/curriculum/world9LessonsData';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-9')!;
const learn = ['12','12','10','12','16','10','12','7','Inlined execution!','12','20','12'];
const originalOutputs = [
 ['Welcome, Mina','42','PONG','25','10\n15'], ['4\n0','[Kotlin]','36','[2, 4, 6]'],
 ['Level 5','PONG','8\n14'], ['12','12\n50','4'], ['[10, 20, 30]','HELLO!','true\nfalse'],
 ['true\nfalse','27','Hello, Alex'], ['11','neg\npos','true\nfalse'], ['1\n3\n5','4','0\n10'],
 ['Running directly!','Early exit','16'], ['12','13','ready'], ['20','0','scheduled'], ['15','16','2']
];
const reference: {name: string; code: string; outcome: {output: string; error?: string}}[] = [];
const seen = new Set<string>(), ids = new Set<string>();
let failures = 0, examples = 0, predictions = 0, checks = 0;
const program = (code: string) => code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
async function verify(name: string, source: string, expected: string, error = false) {
 const code = program(source), result = await compileAndRunKotlin(code);
 if (error ? result.success || result.error?.type !== 'compiler_error' : !result.success || result.output !== expected) {
  failures++; console.error(name, {expected, error}, result);
 }
 reference.push({name, code, outcome: {output: error ? '' : expected, ...(error ? {error:'compiler_error'} : {})}});
}
for (const [index, entry] of world.lessons.entries()) {
 const lesson = AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!];
 assert.ok(lesson); assert.equal(lesson.worldId, world.id);
 assert.ok(!seen.has(lesson.id)); seen.add(lesson.id);
 await verify(`${lesson.id}/Learn`, lesson.learn.codeSnippet.join('\n'), learn[index]);
 for (const [i, card] of lesson.explore!.cards.entries()) {
  assert.ok(!ids.has(card.id)); ids.add(card.id);
  const expected = WORLD_9_ADDED_OUTPUTS[card.id] ?? originalOutputs[index][i];
  assert.notEqual(expected, undefined, `${card.id}: missing independent output`);
  await verify(card.id, card.code.join('\n'), expected); examples++;
 }
 const questions = lesson.predict!.questions;
 assert.equal(entry.questionsCount, questions.length, `${entry.id}: catalog count`);
 for (const [i, q] of questions.entries()) {
  assert.ok(!ids.has(q.id)); ids.add(q.id);
  assert.equal(q.questionNumber, i + 1); assert.equal(q.totalQuestions, questions.length);
  assert.equal(q.options.filter(o => o.isCorrect).length, 1);
  assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length);
  assert.equal(new Set(q.options.map(o => o.label)).size, q.options.length);
  if (q.code?.length) await verify(q.id, q.code.join('\n'), q.options.find(o => o.isCorrect)!.label, WORLD_9_COMPILE_ERRORS.has(q.id));
  predictions++;
 }
 const write = lesson.writeRun, debug = lesson.debug;
 if (write && debug) assert.notEqual(write.solutionCode.replace(/\s+/g,''), debug.fixedCode.replace(/\s+/g,''), `${lesson.id}: duplicate practice`);
 for (const [name, code, expected, pass] of [
  ['write',write?.solutionCode,write?.expectedOutput,true], ['starter',write?.initialCode,write?.expectedOutput,false],
  ['repair',debug?.fixedCode,debug?.expectedOutput,true], ['broken',debug?.brokenCode,debug?.expectedOutput,false]
 ] as const) {
  if (!code) continue;
  const result = await compileAndRunKotlin(code);
  if ((result.success && result.output === expected) !== pass) {failures++;console.error(lesson.id,name,result);}
  if (pass) reference.push({name:`${lesson.id}/${name}`,code,outcome:{output:expected!}});
  checks++;
 }
 if (write) assert.equal(write.testCase.expected,write.expectedOutput);
 console.log(`${lesson.id}: ${lesson.explore!.cards.length} Explore, ${questions.length} Predict`);
}
let capabilityGaps = 0;
for (const test of world9InlineValidationCases) {
 const result = await compileAndRunKotlin(test.code);
 if (result.success || result.error?.type !== 'compiler_error') {
  capabilityGaps++; console.log(`OPEN CAPABILITY GAP: ${test.name}`);
 }
 reference.push({name: test.name, code: test.code, outcome: {output: '', error: 'compiler_error'}});
}
if (process.env.WORLD9_REFERENCE_EXPORT) writeFileSync(process.env.WORLD9_REFERENCE_EXPORT, JSON.stringify(reference,null,2));
console.log(`World 9: ${seen.size} lessons, ${examples} Explore, ${predictions} Predict, ${checks} writing/debug executions; ${failures} failures.`);
console.log(`Status: ${capabilityGaps ? 'Changes required' : 'Audit in progress'}. ${capabilityGaps} inline-parameter capability gaps; browser QA and hardcode resistance remain open.`);
assert.equal(failures + capabilityGaps,0);
