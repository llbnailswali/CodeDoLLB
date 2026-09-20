import { WORLD_12_LESSONS } from '../src/data/curriculum/world12LessonsData';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

async function run(code: string, expected: string) {
  const result = await compileAndRunKotlin(code);
  const pass = result.success && result.output === expected;
  return { pass, result, expected };
}

async function main() {
  for (const lesson of WORLD_12_LESSONS) {
    console.log(`\n=== ${lesson.id} ===`);
    const write = lesson.writeRun;
    const debug = lesson.debug;
    if (write) {
      const sol = await run(write.solutionCode, write.expectedOutput);
      console.log(`  write.solutionCode: ${sol.pass ? 'PASS' : 'FAIL'}`);
      if (!sol.pass) console.log(`    expected=${JSON.stringify(sol.expected)} got=${JSON.stringify(sol.result.output)} err=${JSON.stringify(sol.result.error)}`);

      const starterResult = await compileAndRunKotlin(write.initialCode);
      const starterUnfinished = !(starterResult.success && starterResult.output === write.expectedOutput);
      console.log(`  write.initialCode unfinished (expect true): ${starterUnfinished}`);
    } else {
      console.log('  (no writeRun)');
    }
    if (debug) {
      const fixed = await run(debug.fixedCode, debug.expectedOutput);
      console.log(`  debug.fixedCode: ${fixed.pass ? 'PASS' : 'FAIL'}`);
      if (!fixed.pass) console.log(`    expected=${JSON.stringify(fixed.expected)} got=${JSON.stringify(fixed.result.output)} err=${JSON.stringify(fixed.result.error)}`);

      const brokenResult = await compileAndRunKotlin(debug.brokenCode);
      const brokenFails = !(brokenResult.success && brokenResult.output === debug.expectedOutput);
      console.log(`  debug.brokenCode fails (expect true): ${brokenFails}`);
      if (!brokenFails) console.log(`    broken code unexpectedly already matches expected output!`);
      if (write) {
        const normWrite = write.solutionCode.replace(/\s+/g, ' ').trim();
        const normDebug = debug.fixedCode.replace(/\s+/g, ' ').trim();
        if (normWrite === normDebug) console.log('  DUPLICATE: debug.fixedCode === write.solutionCode');
      }
    } else {
      console.log('  (no debug)');
    }
  }
}

main();
