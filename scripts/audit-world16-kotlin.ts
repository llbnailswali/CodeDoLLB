// Optional independent reference probe using locally cached compiler JARs only.
// No downloads, no changes to lesson source. Generated fixtures live in /tmp.
import { readdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { WORLD_16_LESSONS } from '../src/data/curriculum/world16LessonsData';
const root = join(homedir(), '.gradle/caches/modules-2/files-2.1');
function jar(group: string, artifact: string, version: string) {
  const base = join(root, group, artifact, version);
  for (const hash of readdirSync(base)) for (const file of readdirSync(join(base, hash))) {
    if (file === `${artifact}-${version}.jar`) return join(base, hash, file);
  }
  throw new Error(`Missing local JAR ${artifact}:${version}`);
}
const cp = [jar('org.jetbrains.kotlin', 'kotlin-compiler-embeddable', '2.0.21'), jar('org.jetbrains.kotlin', 'kotlin-stdlib', '2.0.21'), jar('org.jetbrains.kotlin', 'kotlin-reflect', '1.6.10'), jar('org.jetbrains.intellij.deps', 'trove4j', '1.0.20200330'), jar('org.jetbrains', 'annotations', '13.0'), jar('org.jetbrains.kotlinx', 'kotlinx-coroutines-core-jvm', '1.8.1')].join(':');
const lesson = WORLD_16_LESSONS.find(l => l.id.endsWith(process.argv[2]));
if (!lesson) throw new Error('Pass lesson ID or unique suffix');
const keys = process.argv.slice(3);
for (const requestedKey of keys) {
  const [key, mode] = requestedKey.split(':');
  const code = key.startsWith('E') ? lesson.explore.cards[Number(key.slice(1)) - 1].code.join('\n') : key.startsWith('P') ? lesson.predict.questions[Number(key.slice(1)) - 1].code!.join('\n') : key === 'solution' ? lesson.writeRun!.solutionCode : key === 'starter' ? lesson.writeRun!.initialCode : key === 'fixed' ? lesson.debug!.fixedCode : lesson.debug!.brokenCode;
  const dir = mkdtempSync(join(tmpdir(), 'world16-kotlin-'));
  writeFileSync(join(dir, 'Probe.kt'), mode === 'invoke' ? code.replace(/fun main\(/, 'fun auditedMain(') + '\nfun main() { auditedMain(); Unit }\n' : code);
  const compiled = spawnSync('java', ['-cp', cp, 'org.jetbrains.kotlin.cli.jvm.K2JVMCompiler', '-no-stdlib', '-no-reflect', '-classpath', cp, join(dir, 'Probe.kt'), '-d', join(dir, 'probe.jar')], { encoding: 'utf8', timeout: 30000 });
  const run = compiled.status === 0 ? spawnSync('java', ['-cp', `${join(dir, 'probe.jar')}:${cp}`, 'ProbeKt'], { encoding: 'utf8', timeout: 4000 }) : null;
  console.log(JSON.stringify({ lesson: lesson.id, key: requestedKey, compiler: '2.0.21', coroutines: '1.8.1', compileStatus: compiled.status, compileError: compiled.stderr, exit: run?.status, stdout: run?.stdout, stderr: run?.stderr, error: run?.error?.message, fixture: dir }));
}
