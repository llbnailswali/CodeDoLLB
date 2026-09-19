import { compileAndRunKotlin } from '../src/utils/kotlinRunner';
import { WORLD_10_LESSONS } from '../src/data/curriculum/world10LessonsData';
import { cases } from './collection-runner-cases';
let failures = 0;
for (const [name, body, expected] of cases) {
 const result = await compileAndRunKotlin(`fun main() {\n${body}\n}`);
 if (!result.success || result.output !== expected) { failures++; console.error(name, JSON.stringify(result)); }
}
for (const body of ['listOf(1).chunked(0)', 'listOf(1).windowed(2, 0)', 'listOf<Int>().first()', 'listOf<Int>().reduce { a, b -> a + b }', 'listOf(1, 2.0).filterIsInstance<Int>()']) {
 const result = await compileAndRunKotlin(`fun main() {\nprintln(${body})\n}`);
 if (result.success) { failures++; console.error('Expected rejection:', body); }
}
for (const lesson of WORLD_10_LESSONS) {
 for (const [code, expected] of [
   [lesson.writeRun!.solutionCode, lesson.writeRun!.expectedOutput],
   [lesson.debug!.fixedCode, lesson.debug!.expectedOutput],
 ]) {
  const result = await compileAndRunKotlin(code);
  if (!result.success || result.output !== expected) { failures++; console.error(lesson.id, result); }
 }
}
if (failures) process.exit(1);
console.log(`Collection audit passed: ${cases.length} behavior cases, 5 rejection cases, 20 lesson solutions.`);
