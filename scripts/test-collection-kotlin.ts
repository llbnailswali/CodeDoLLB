/** Optional reference check. Point KOTLIN_COMPILER_CLASSPATH at a local Kotlin
 * compiler and its dependencies; nothing is downloaded or installed here. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import { tmpdir } from 'node:os';
import { cases } from './collection-runner-cases';
const functionCases = cases.map(([name, body, expected]) => ({ name, code: `fun main() {\n${body}\n}`, expected }));

const compilerClasspath = process.env.KOTLIN_COMPILER_CLASSPATH;
assert.ok(compilerClasspath, 'Set KOTLIN_COMPILER_CLASSPATH to the local compiler/dependency JAR classpath.');
const runtimeClasspath = process.env.KOTLIN_RUNTIME_CLASSPATH ?? compilerClasspath;
const dir = mkdtempSync(join(tmpdir(), 'codedo-kotlin-functions-'));
function java(args: string[]) {
  const result = spawnSync('java', args, { encoding: 'utf8', timeout: 60000, maxBuffer: 8 * 1024 * 1024 });
  assert.ifError(result.error);
  return result;
}
function compile(files: string[], jar: string) {
  return java(['-cp', compilerClasspath!, 'org.jetbrains.kotlin.cli.jvm.K2JVMCompiler',
    '-no-stdlib', '-no-reflect', '-classpath', runtimeClasspath!, ...files, '-d', jar]);
}
try {
  const valid = functionCases.map((test, index) => {
    const file = join(dir, `Valid${index}.kt`);
    writeFileSync(file, `package valid${index}\n\n${test.code}`);
    return file;
  });
  const harness = join(dir, 'Audit.kt');
  writeFileSync(harness, `fun main() {\n${functionCases.map((_, index) =>
    `println("===CASE${index}===")\nvalid${index}.main()`
  ).join('\n')}\n}`);
  const jar = join(dir, 'valid.jar');
  const build = compile([...valid, harness], jar);
  assert.equal(build.status, 0, build.stderr);
  const run = java(['-cp', jar + delimiter + runtimeClasspath, 'AuditKt']);
  assert.equal(run.status, 0, run.stderr);
  const chunks = run.stdout.split('===CASE').slice(1);
  assert.equal(chunks.length, functionCases.length);
  for (const [index, test] of functionCases.entries()) {
    assert.equal(chunks[index].split('===\n')[1].trimEnd(), test.expected, test.name);
  }
  console.log(`Kotlin collection reference audit passed: ${functionCases.length} exact outputs.`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
