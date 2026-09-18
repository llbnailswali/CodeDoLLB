import { LOCAL_RETURNS_LESSON } from '../src/data/curriculum/world9LessonsData';
import { functionCases, invalidFunctionCases } from './lambda-runner-cases';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const cases: Array<{ name: string; code: string; expected: string }> = [
  {
    name: 'typed lambda stored as a function value',
    code: `fun main() {
  val double: (Int) -> Int = { value: Int -> value * 2 }
  println(double(4))
}`,
    expected: '8',
  },
  {
    name: 'higher-order function with an implicit it trailing lambda',
    code: `fun apply(value: Int, operation: (Int) -> Int): Int {
  return operation(value)
}

fun main() {
  println(apply(5) { it * 3 })
}`,
    expected: '15',
  },
  {
    name: 'function reference passed as a callable value',
    code: `fun increment(value: Int): Int = value + 1

fun main() {
  val operation: (Int) -> Int = ::increment
  println(operation(9))
}`,
    expected: '10',
  },
  {
    name: 'anonymous function has a local return',
    code: `fun main() {
  val triple = fun (value: Int): Int {
    return value * 3
  }
  println(triple(4))
}`,
    expected: '12',
  },
  {
    name: 'two-argument function type and explicit lambda parameters',
    code: `fun combine(first: Int, second: Int, operation: (Int, Int) -> Int): Int {
  return operation(first, second)
}

fun main() {
  println(combine(2, 3, { left, right -> left + right }))
}`,
    expected: '5',
  },
];

async function main() {
  let failures = 0;

  for (const test of [...cases, ...functionCases]) {
    const result = await compileAndRunKotlin(test.code);
    if (!result.success || result.output !== test.expected) {
      failures++;
      console.error(
        `${test.name}: expected ${JSON.stringify(test.expected)}, got ${JSON.stringify(result.output)}${result.error ? ` (${result.error.message})` : ''}`
      );
      continue;
    }
    console.log(`✓ ${test.name}`);
  }

  for (const test of invalidFunctionCases) {
    const result = await compileAndRunKotlin(test.code);
    if (result.success || result.error?.type !== 'compiler_error' || !result.error.message.includes(test.error)) {
      failures++;
      console.error(`${test.name}: expected compiler rejection containing ${test.error}, got ${JSON.stringify(result)}`);
    } else console.log(`✓ rejects ${test.name}`);
  }
  const lesson = LOCAL_RETURNS_LESSON;
  for (const [name, code, expected] of [
    ['local-return writing solution', lesson.writeRun!.solutionCode, '7'],
    ['local-return debug repair', lesson.debug!.fixedCode, '7'],
    ['local-return broken program exposes early exit', lesson.debug!.brokenCode, '1'],
    ['local-return starter does not pass', lesson.writeRun!.initialCode, '0'],
  ]) {
    const result = await compileAndRunKotlin(code);
    if (!result.success || result.output !== expected) {
      failures++;
      console.error(`${name}: ${JSON.stringify(result)}`);
    } else console.log(`✓ ${name}`);
  }
  if (failures > 0) process.exit(1);
  console.log(`Lambda runner audit passed: ${cases.length + functionCases.length + invalidFunctionCases.length + 4} cases.`);
}

void main();
