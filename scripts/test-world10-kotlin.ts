/** Optional real-Kotlin comparison; uses local compiler JARs and downloads nothing. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import { tmpdir } from 'node:os';

const compiler = process.env.KOTLIN_COMPILER_CLASSPATH;
assert.ok(compiler, 'Set KOTLIN_COMPILER_CLASSPATH to local compiler/dependency JARs.');
const runtime = process.env.KOTLIN_RUNTIME_CLASSPATH ?? compiler;
const dir = mkdtempSync(join(tmpdir(), 'codedo-world10-kotlin-'));
function java(args: string[]) {
  const result = spawnSync('java', args, { encoding: 'utf8', timeout: 60000, maxBuffer: 12 * 1024 * 1024 });
  assert.ifError(result.error);
  return result;
}
function compile(files: string[], jar: string) {
  return java(['-cp', compiler!, 'org.jetbrains.kotlin.cli.jvm.K2JVMCompiler', '-no-stdlib', '-no-reflect', '-classpath', runtime!, ...files, '-d', jar]);
}
const oldExport = process.env.WORLD10_REFERENCE_EXPORT;
try {
  const exported = join(dir, 'cases.json');
  process.env.WORLD10_REFERENCE_EXPORT = exported;
  await import('./audit-world10-quality');
  const cases: { name: string; code: string; outcome: { output: string; error?: string } }[] = JSON.parse(readFileSync(exported, 'utf8'));
  const prepared = cases.map((test, index) => {
    const file = join(dir, `Case${index}.kt`);
    writeFileSync(file, `package case${index}\n${test.code}`);
    return { ...test, index, file };
  });
  const valid = prepared.filter(test => !test.outcome.error);
  const runtimeErrors = prepared.filter(test => test.outcome.error === 'runtime_error');
  const harness = join(dir, 'Audit.kt');
  writeFileSync(harness, `fun main() {\n${valid.map(test => `println("===CASE${test.index}==="); case${test.index}.main()`).join('\n')}\n}`);
  const jar = join(dir, 'valid.jar');
  const build = compile([...valid.map(test => test.file), harness], jar);
  assert.equal(build.status, 0, build.stderr);
  const run = java(['-cp', jar + delimiter + runtime, 'AuditKt']);
  assert.equal(run.status, 0, run.stderr);
  const chunks = run.stdout.split('===CASE').slice(1);
  assert.equal(chunks.length, valid.length);
  for (const [index, test] of valid.entries()) {
    const body = chunks[index].slice(chunks[index].indexOf('===\n') + 4).replace(/\n+$/, '');
    assert.equal(body, test.outcome.output, test.name);
  }
  for (const test of runtimeErrors) {
    const rejectedJar = join(dir, `runtime${test.index}.jar`);
    const compiled = compile([test.file], rejectedJar);
    assert.equal(compiled.status, 0, compiled.stderr);
    const failed = java(['-cp', rejectedJar + delimiter + runtime, `case${test.index}.Case${test.index}Kt`]);
    assert.notEqual(failed.status, 0, `${test.name}: expected a runtime failure`);
  }
  console.log(`Kotlin World 10 reference passed: ${valid.length} exact outputs, ${runtimeErrors.length} runtime failures.`);
} finally {
  if (oldExport === undefined) delete process.env.WORLD10_REFERENCE_EXPORT;
  else process.env.WORLD10_REFERENCE_EXPORT = oldExport;
  rmSync(dir, { recursive: true, force: true });
}
