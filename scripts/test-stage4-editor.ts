import { runKotlinCode, KotlinExecutionResult } from '../src/utils/kotlinRunner';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';

// Color formatting for console
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

let passedCount = 0;
let failedCount = 0;
const failures: { name: string; reason: string }[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedCount++;
    console.log(`  ${green('✔')} ${testName}`);
  } else {
    failedCount++;
    const reason = detail || 'Assertion failed';
    failures.push({ name: testName, reason });
    console.log(`  ${red('✖')} ${testName}: ${red(reason)}`);
  }
}

async function runTests() {
  console.log(bold(cyan('\n======================================================')));
  console.log(bold(cyan('     STAGE 4 CODE EDITOR & RUNNER COMPREHENSIVE SUITE ')));
  console.log(bold(cyan('======================================================\n')));

  // ==========================================
  // SUITE 1: Happy Paths & Basic Language Features
  // ==========================================
  console.log(bold(yellow('SUITE 1: Happy Paths & Basic Language Features')));

  {
    const res = await runKotlinCode(`
      fun main() {
          println("Hello, World!")
      }
    `);
    assert(res.success && res.output === 'Hello, World!', 'Basic println("Hello, World!")');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          print("A")
          print("B")
          println("C")
          println("D")
      }
    `);
    assert(res.success && res.output === 'ABC\nD', 'print and println interleaving');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val a = 10
          val b = 20
          println(a + b)
      }
    `);
    assert(res.success && res.output === '30', 'Basic arithmetic with val declarations');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          var count = 0
          count += 5
          count++
          println(count)
      }
    `);
    assert(res.success && res.output === '6', 'Var reassignment and increment');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val quotient = 47 / 5
          println(quotient)
      }
    `);
    assert(res.success && res.output === '9', 'Kotlin Integer division truncation (47 / 5 -> 9, not 9.4)');
  }

  {
    const res = await runKotlinCode(`
      fun divide(a: Int, b: Int): Int {
          return a / b
      }
      fun main() {
          println(divide(20, 3))
      }
    `);
    assert(res.success && res.output === '6', 'Integer parameter division truncation (20 / 3 -> 6)');
  }

  {
    const res = await runKotlinCode(`
      fun add(a: Int, b: Int): Int = a + b
      fun main() {
          println(add(7, 8))
      }
    `);
    assert(res.success && res.output === '15', 'Single-expression function syntax');
  }

  {
    const res = await runKotlinCode(`
      fun greet(name: String = "World"): String {
          return "Hello, " + name
      }
      fun main() {
          println(greet())
          println(greet("Kotlin"))
      }
    `);
    assert(res.success && res.output === 'Hello, World\nHello, Kotlin', 'Default parameter values in functions');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val score = 85
          val grade = if (score >= 90) "A" else if (score >= 80) "B" else "C"
          println(grade)
      }
    `);
    assert(res.success && res.output === 'B', 'If-expression evaluation');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val x = 3
          when (x) {
              1 -> println("One")
              2, 3 -> println("Two or Three")
              else -> println("Other")
          }
      }
    `);
    assert(res.success && res.output === 'Two or Three', 'When statement with comma matching');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          var sum = 0
          for (i in 1..5) {
              sum += i
          }
          println(sum)
      }
    `);
    assert(res.success && res.output === '15', 'For loop with 1..5 range');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          var out = ""
          for (i in 5 downTo 1 step 2) {
              out = out + i + " "
          }
          println(out.trim())
      }
    `);
    assert(res.success && res.output === '5 3 1', 'For loop with downTo and step');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val items = listOf("sword", "shield", "potion")
          println(items.size)
          println(items.first())
          println(items.last())
          println(items.contains("shield"))
      }
    `);
    assert(res.success && res.output === '3\nsword\npotion\ntrue', 'listOf with size, first, last, contains');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val list = mutableListOf(1, 2)
          list.add(3)
          list.remove(1)
          println(list)
      }
    `);
    assert(res.success && res.output === '[2, 3]', 'mutableListOf add and remove');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val map = mapOf("A" to 100, "B" to 200)
          println(map["A"])
          println(map.containsKey("B"))
          println(map.size)
      }
    `);
    assert(res.success && res.output === '100\ntrue\n2', 'mapOf lookup, containsKey, size');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val s: String? = null
          println(s?.length)
          println(s ?: "default")
      }
    `);
    assert(res.success && res.output === 'null\ndefault', 'Null safety safe call (?.) and Elvis (?:)');
  }

  // ==========================================
  // SUITE 2: Edge Cases & Error Boundaries
  // ==========================================
  console.log(bold(yellow('\nSUITE 2: Edge Cases & Error Boundaries')));

  {
    const res = await runKotlinCode('');
    assert(!res.success || res.output === '', 'Empty code execution (does not crash)', res.error?.message);
  }

  {
    const res = await runKotlinCode('   \n\t   \n');
    assert(!res.success || res.output === '', 'Whitespace-only code handling');
  }

  {
    const res = await runKotlinCode(`
      // Just a single comment
      // Nothing else
    `);
    assert(res.output === '', 'Comment-only code executes safely with empty output');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val s = "unclosed string
          println(s)
      }
    `);
    assert(!res.success && res.error?.type === 'syntax_error', 'Unclosed string literal detected');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val x = (1 + 2}
      }
    `);
    assert(!res.success && res.error?.type === 'syntax_error', 'Mismatched brackets ( { caught');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val x = 10
          x = 20
          println(x)
      }
    `);
    assert(!res.success && res.error?.type === 'val_reassignment', 'val reassignment error caught statically');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val count = 1
          count += 5
          println(count)
      }
    `);
    assert(!res.success && res.error?.type === 'val_reassignment', 'val augmented reassignment (+=) caught statically');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val x: Int = "text"
          println(x)
      }
    `);
    assert(!res.success && res.error?.type === 'type_mismatch', 'Type mismatch (Int assigned String literal) caught');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val x: String? = null
          println(x!!.length)
      }
    `);
    assert(!res.success && res.error?.type === 'runtime_error' && res.error.message.includes('NullPointerException'), 'Non-null assertion on null throws NullPointerException');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val text = "Special: <tag> & \\"quotes\\" \\\\ slash \\n newline \u{1F680}"
          println(text)
      }
    `);
    assert(res.success && res.output.includes('🚀'), 'Unicode, emojis, and escaped quotes in strings');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          // This comment has "unclosed quotes and { [ brackets
          val valid = "Safe"
          println(valid)
      }
    `);
    assert(res.success && res.output === 'Safe', 'Comments containing quotes and brackets do not trigger syntax errors');
  }

  {
    const res = await runKotlinCode(`
      fun main() {
          val huge = 999999999
          val neg = -42
          val zero = 0
          println(huge + neg + zero)
      }
    `);
    assert(res.success && res.output === '999999957', 'Large numbers, negative numbers, and zero arithmetic');
  }

  {
    const res = await runKotlinCode(
      `
      fun main() {
          while (true) {}
      }
    `,
      undefined,
      undefined
    );
    assert(!res.success && res.error?.message.includes('timed out'), 'Infinite loop timeout safeguard terminates safely');
  }

  // ==========================================
  // SUITE 3: Test Case Execution & Expected Output Verification
  // ==========================================
  console.log(bold(yellow('\nSUITE 3: Test Case Execution & Expected Output Matching')));

  {
    const res = await runKotlinCode(
      `
      fun multiply(a: Int, b: Int): Int {
          return a * b
      }
    `,
      '15',
      { call: 'multiply(3, 5)', expected: '15' }
    );
    assert(res.success && res.output === '15', 'Test case call with expected output matches successfully');
  }

  {
    const res = await runKotlinCode(
      `
      fun multiply(a: Int, b: Int): Int {
          return a + b
      }
    `,
      '15',
      { call: 'multiply(3, 5)', expected: '15' }
    );
    assert(!res.success && res.error?.message.includes('Output mismatch'), 'Output mismatch correctly flags failure');
  }

  // ==========================================
  // SUITE 4: Stage 4 Editor Component UI Logic
  // ==========================================
  console.log(bold(yellow('\nSUITE 4: Stage 4 Editor Component UI Logic Simulation')));

  // Test unedited initial code detection
  {
    const initialCode = 'fun main() {\n    // TODO\n}';
    const userCode = 'fun main() {\n    // TODO\n}';
    const trimmedUser = userCode.trim().replace(/\r\n/g, '\n');
    const trimmedInitial = initialCode.trim().replace(/\r\n/g, '\n');
    const isBlocked = trimmedUser === trimmedInitial;
    assert(isBlocked, 'Unedited initial code is blocked from execution');
  }

  {
    const initialCode = 'fun main() {\n    // TODO\n}';
    const userCode = 'fun main() {\n    println(42)\n}';
    const isBlocked = userCode.trim() === initialCode.trim();
    assert(!isBlocked, 'Modified user code passes unedited check');
  }

  // Test Auto-closing pair insertion
  {
    function simulateInsertToken(currentCode: string, cursorPos: number, token: string) {
      let insert = token;
      let cursorOffset = token.length;
      if (token === '{') { insert = '{}'; cursorOffset = 1; }
      else if (token === '(') { insert = '()'; cursorOffset = 1; }
      else if (token === '[') { insert = '[]'; cursorOffset = 1; }
      else if (token === '"') { insert = '""'; cursorOffset = 1; }

      const before = currentCode.slice(0, cursorPos);
      const after = currentCode.slice(cursorPos);
      return {
        newCode: before + insert + after,
        newPos: cursorPos + cursorOffset,
      };
    }

    const t1 = simulateInsertToken('val x = ', 8, '{');
    assert(t1.newCode === 'val x = {}' && t1.newPos === 9, 'Auto-closing { inserts {} and places cursor inside');

    const t2 = simulateInsertToken('val s = ', 8, '"');
    assert(t2.newCode === 'val s = ""' && t2.newPos === 9, 'Auto-closing " inserts "" and places cursor inside');

    const t3 = simulateInsertToken('println', 7, '(');
    assert(t3.newCode === 'println()' && t3.newPos === 8, 'Auto-closing ( inserts () and places cursor inside');
  }

  // Test Smart Backspace
  {
    function simulateSmartBackspace(code: string, cursorPos: number) {
      if (cursorPos > 0) {
        const charBefore = code[cursorPos - 1];
        const charAfter = code[cursorPos];
        const isPair =
          (charBefore === '{' && charAfter === '}') ||
          (charBefore === '(' && charAfter === ')') ||
          (charBefore === '[' && charAfter === ']') ||
          (charBefore === '"' && charAfter === '"');

        if (isPair) {
          const before = code.slice(0, cursorPos - 1);
          const after = code.slice(cursorPos + 1);
          return { newCode: before + after, newPos: cursorPos - 1 };
        }

        const before = code.slice(0, cursorPos - 1);
        const after = code.slice(cursorPos);
        return { newCode: before + after, newPos: cursorPos - 1 };
      }
      return { newCode: code, newPos: 0 };
    }

    const b1 = simulateSmartBackspace('val x = {}', 9);
    assert(b1.newCode === 'val x = ' && b1.newPos === 8, 'Smart backspace inside {} deletes both braces');

    const b2 = simulateSmartBackspace('val x = ""', 9);
    assert(b2.newCode === 'val x = ' && b2.newPos === 8, 'Smart backspace inside "" deletes both quotes');

    const b3 = simulateSmartBackspace('abc', 3);
    assert(b3.newCode === 'ab' && b3.newPos === 2, 'Normal backspace deletes single preceding character');

    const b4 = simulateSmartBackspace('', 0);
    assert(b4.newCode === '' && b4.newPos === 0, 'Backspace at position 0 is safe');
  }

  // Test Smart Indentation (Enter)
  {
    function simulateSmartReturn(userCode: string, pos: number) {
      const textBefore = userCode.slice(0, pos);
      const textAfter = userCode.slice(pos);
      const currentLineMatch = textBefore.match(/(?:^|\n)([^\n]*)$/);
      const currentLine = currentLineMatch ? currentLineMatch[1] : '';
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      const trimmedLine = currentLine.trim();
      const endsWithOpenBrace = trimmedLine.endsWith('{');
      const nextCharIsCloseBrace = textAfter.startsWith('}');

      let insert = '\n' + currentIndent;
      let cursorOffset = insert.length;

      if (endsWithOpenBrace) {
        if (nextCharIsCloseBrace) {
          insert = '\n' + currentIndent + '    \n' + currentIndent;
          cursorOffset = 1 + currentIndent.length + 4;
        } else {
          insert = '\n' + currentIndent + '    ';
          cursorOffset = insert.length;
        }
      }

      return {
        newCode: textBefore + insert + textAfter,
        newPos: pos + cursorOffset,
      };
    }

    const r1 = simulateSmartReturn('fun main() {}', 12);
    assert(
      r1.newCode === 'fun main() {\n    \n}' && r1.newPos === 17,
      'Pressing Enter inside {} expands with 4 spaces indent and preserves closing brace'
    );

    const r2 = simulateSmartReturn('    val x = 1', 13);
    assert(
      r2.newCode === '    val x = 1\n    ' && r2.newPos === 18,
      'Pressing Enter on indented line preserves indentation'
    );
  }

  // Test Undo/Redo history stack bounds
  {
    let history: string[] = ['initial'];
    let historyIndex = 0;

    function pushCode(newCode: string) {
      history = [...history.slice(0, historyIndex + 1), newCode].slice(-40);
      historyIndex = Math.min(historyIndex + 1, 39);
    }
    function undo() {
      if (historyIndex > 0) historyIndex--;
      return history[historyIndex];
    }
    function redo() {
      if (historyIndex < history.length - 1) historyIndex++;
      return history[historyIndex];
    }

    pushCode('step 1');
    pushCode('step 2');
    assert(historyIndex === 2 && history[historyIndex] === 'step 2', 'History push works');

    const u1 = undo();
    assert(u1 === 'step 1' && historyIndex === 1, 'Undo once goes to step 1');

    const u2 = undo();
    assert(u2 === 'initial' && historyIndex === 0, 'Undo second time goes to initial');

    const u3 = undo();
    assert(u3 === 'initial' && historyIndex === 0, 'Undo at bottom stays at 0 without error');

    const r1 = redo();
    assert(r1 === 'step 1' && historyIndex === 1, 'Redo moves forward');

    pushCode('branch step');
    assert(history.length === 3 && history[2] === 'branch step', 'Branching after undo discards old future');
  }

  // ==========================================
  // SUITE 5: Curriculum WriteRun Lessons Validation (Worlds 1-8)
  // ==========================================
  console.log(bold(yellow('\nSUITE 5: Curriculum WriteRun Lessons Validation (Worlds 1-8)')));

  const curriculumSets = [
    { name: 'Available Curriculum', lessons: AVAILABLE_FIVE_STAGE_LESSONS },
  ];

  let totalCurriculumChecked = 0;

  for (const set of curriculumSets) {
    for (const [key, lesson] of Object.entries(set.lessons)) {
      const writeRun = (lesson as any)?.writeRun;
      if (!writeRun) continue;

      totalCurriculumChecked++;
      const code = writeRun.solutionCode;
      const expected = writeRun.expectedOutput;
      const testCase = writeRun.testCase;
      const lessonTitle = `${set.name} - ${lesson.topicTitle || key}: ${writeRun.title}`;

      if (!code) {
        assert(false, lessonTitle, 'Missing solutionCode in writeRun');
        continue;
      }

      try {
        const res = await runKotlinCode(code, expected, testCase);
        if (res.success) {
          assert(true, lessonTitle);
        } else {
          assert(false, lessonTitle, res.error?.message || `Got '${res.output}', expected '${expected}'`);
        }
      } catch (err: any) {
        assert(false, lessonTitle, `Exception thrown: ${err?.message || String(err)}`);
      }
    }
  }

  console.log(bold(yellow(`\nCurriculum lessons verified: ${totalCurriculumChecked}`)));

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log(bold(cyan('\n======================================================')));
  console.log(bold(`TOTAL TESTS: ${passedCount + failedCount}`));
  console.log(green(`PASSED: ${passedCount}`));
  if (failedCount > 0) {
    console.log(red(`FAILED: ${failedCount}`));
    console.log(red('\nFailure Details:'));
    failures.forEach((f) => console.log(` - ${bold(f.name)}: ${f.reason}`));
  } else {
    console.log(bold(green('ALL TESTS PASSED WITH 0 FAILURES! ✨')));
  }
  console.log(bold(cyan('======================================================\n')));

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Test runner fatal error:', e);
  process.exit(1);
});
