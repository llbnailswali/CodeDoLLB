/** Optional real-Kotlin reference check; uses local compiler JARs, downloads nothing. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import { tmpdir } from 'node:os';
const compiler = process.env.KOTLIN_COMPILER_CLASSPATH;
assert.ok(compiler, 'Set KOTLIN_COMPILER_CLASSPATH to local compiler/dependency JARs.');
const runtime = process.env.KOTLIN_RUNTIME_CLASSPATH ?? compiler;
const dir = mkdtempSync(join(tmpdir(), 'codedo-world9-kotlin-'));
function java(args: string[]) {
 const result = spawnSync('java', args, { encoding: 'utf8', timeout: 60000, maxBuffer: 8 * 1024 * 1024 });
 assert.ifError(result.error); return result;
}
function compile(files: string[], jar: string) {
 return java(['-cp', compiler!, 'org.jetbrains.kotlin.cli.jvm.K2JVMCompiler', '-no-stdlib', '-no-reflect', '-classpath', runtime!, ...files, '-d', jar]);
}
const previousExport = process.env.WORLD9_REFERENCE_EXPORT;
try {
 const exported = join(dir, 'cases.json');
 process.env.WORLD9_REFERENCE_EXPORT = exported;
 await import('./audit-world9-quality');
 const cases: {name: string; code: string; outcome: {output: string; error?: string}}[] = JSON.parse(readFileSync(exported, 'utf8'));
 const prepared = cases.map((test, index) => {
  const file = join(dir, `Case${index}.kt`);
  writeFileSync(file, `package case${index}\n${test.code}`);
  return { ...test, index, file };
 });
 const valid = prepared.filter(test => test.outcome.error !== 'compiler_error');
 const invalid = prepared.filter(test => test.outcome.error === 'compiler_error');
 const harness = join(dir, 'Audit.kt');
 writeFileSync(harness, `fun main() {\n${valid.map(test => `println("===CASE${test.index}==="); try { case${test.index}.main() } catch(e: NullPointerException) { println("===NPE===") }`).join('\n')}\n}`);
 const jar = join(dir, 'valid.jar');
 const build = compile([...valid.map(test => test.file), harness], jar);
 assert.equal(build.status, 0, build.stderr);
 const run = java(['-cp', jar + delimiter + runtime, 'AuditKt']);
 assert.equal(run.status, 0, run.stderr);
 const chunks = run.stdout.split('===CASE').slice(1);
 assert.equal(chunks.length, valid.length);
 for (const [index, test] of valid.entries()) {
  const expected = test.outcome.output + (test.outcome.error === 'runtime_error' ? (test.outcome.output ? '\n' : '') + '===NPE===' : '');
  assert.equal(chunks[index].slice(chunks[index].indexOf('===\n') + 4).replace(/\n+$/, ''), expected, test.name);
 }
 for (const test of invalid) {
  const rejected = compile([test.file], join(dir, `invalid${test.index}.jar`));
  assert.notEqual(rejected.status, 0, `${test.name}: should fail compilation`);
  assert.ok(rejected.stderr.includes(`Case${test.index}.kt:`), rejected.stderr);
 }
 console.log(`Kotlin World 9 reference passed: ${valid.length} runnable cases, ${invalid.length} compiler rejections.`);
} finally {
 if (previousExport === undefined) delete process.env.WORLD9_REFERENCE_EXPORT;
 else process.env.WORLD9_REFERENCE_EXPORT = previousExport;
 rmSync(dir, { recursive: true, force: true });
}
