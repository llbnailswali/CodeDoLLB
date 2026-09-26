import { LessonQuestion } from '../../types';

export const WORLD_3_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: for Loops & Basic Iteration
  // =========================================================================
  {
    id: 'w3-l1-c1',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'for-loops',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loops • for in Range',
    skill: 'for_loops',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the printed output of this simple for loop in Kotlin?',
    codeFileName: 'BasicFor.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 1..4) {',
      '    print("$i")',
      '}'
    ],
    options: [
      { id: 'A', title: '1234', subtitle: 'Inclusive range prints 1, 2, 3, and 4', isCorrect: true },
      { id: 'B', title: '123', subtitle: '4 would be excluded only with "until"', isCorrect: false },
      { id: 'C', title: '0123', subtitle: 'Starts at 1, not 0', isCorrect: false },
      { id: 'D', title: '4', subtitle: 'All iterations are printed', isCorrect: false }
    ],
    hint: '1..4 is inclusive on both ends, so the loop executes for 1, 2, 3, and 4.',
    explanation: {
      title: 'Inclusive Range Iteration',
      text: 'The `..` operator creates a range including both 1 and 4. `print` outputs each number on the same line, yielding `1234`.',
      highlights: ['1..4', '1234', 'inclusive']
    }
  },
  {
    id: 'w3-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'for-loops',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loops • Collection Iteration',
    skill: 'for_loops',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when iterating directly over an array of strings?',
    codeFileName: 'ArrayLoop.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val tools = arrayOf("Vite", "Kotlin")',
      'for (tool in tools) {',
      '    print("${tool[0]}")',
      '}'
    ],
    options: [
      { id: 'A', title: 'VK', subtitle: 'First character of each word: tool[0]', isCorrect: true },
      { id: 'B', title: 'ViteKotlin', subtitle: 'Entire words printed', isCorrect: false },
      { id: 'C', title: '01', subtitle: 'Indices', isCorrect: false },
      { id: 'D', title: 'V', subtitle: 'Second iteration missed', isCorrect: false }
    ],
    hint: 'tool[0] retrieves the first character of each string ("V" from Vite, "K" from Kotlin).',
    explanation: {
      title: 'Iterating Elements Directly',
      text: 'In Kotlin, `for (item in collection)` directly iterates over the elements. `tool[0]` takes \'V\' then \'K\', outputting `VK`.',
      highlights: ['VK', 'tool[0]', 'collection iteration']
    }
  },
  {
    id: 'w3-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-3',
    lessonId: 'for-loops',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loops • withIndex()',
    skill: 'for_loops',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the loop to iterate over both the index and value simultaneously using destructuring:',
    codeFileName: 'IndexedLoop.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val items = listOf("A", "B")',
      'for ((index, value) in items._____()) {',
      '    println("$index: $value")',
      '}'
    ],
    options: [
      { id: 'A', title: 'withIndex', subtitle: 'Kotlin standard library function returning IndexedValue pairs', isCorrect: true },
      { id: 'B', title: 'enumerate', subtitle: 'Python enumerate syntax', isCorrect: false },
      { id: 'C', title: 'entries', subtitle: 'Map entries property', isCorrect: false },
      { id: 'D', title: 'indices', subtitle: 'Returns only IntRange of indices', isCorrect: false }
    ],
    hint: 'Kotlin collections have a .withIndex() method that pairs each element with its index.',
    explanation: {
      title: 'The withIndex() Helper',
      text: '`items.withIndex()` yields an iterable of `IndexedValue(index, value)`, allowing clean tuple-like destructuring in `for` loops.',
      highlights: ['items.withIndex()', '(index, value)', 'destructuring']
    }
  },
  {
    id: 'w3-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-3',
    lessonId: 'for-loops',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Bug Hunter • C-Style For Loop',
    skill: 'for_loops',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 0,
    question: 'Find the bug! Why does Line 1 cause a Kotlin compiler error?',
    codeFileName: 'CStyleForBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (int i = 0; i < 5; i++) { // Line 1',
      '    println(i)',
      '}'
    ],
    options: [
      { id: 'A', title: 'Kotlin does NOT have C-style three-part for loops (for (int i...))', subtitle: 'Kotlin uses "for (i in 0 until 5)" instead', isCorrect: true },
      { id: 'B', title: 'int must be capitalized to Int', subtitle: 'Even with Int, the C-style loop structure is invalid in Kotlin', isCorrect: false },
      { id: 'C', title: 'Missing braces', subtitle: 'Braces are present', isCorrect: false },
      { id: 'D', title: 'Line 2 println is invalid', subtitle: 'Valid statement', isCorrect: false }
    ],
    hint: 'Kotlin intentionally removed C-style for loops in favor of ranges and iterator loops.',
    explanation: {
      title: 'No C-Style For Loops in Kotlin',
      text: 'Line 1 fails syntax parsing. Kotlin replaced traditional `for (int i = 0; ...)` loops with clean range loops: `for (i in 0 until 5)`.',
      highlights: ['No C-style for loops', 'for (i in 0 until 5)', 'Line 1']
    }
  },
  {
    id: 'w3-l1-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-3',
    lessonId: 'for-loops',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loops • Loop Variable Mutability',
    skill: 'for_loops',
    difficulty: 2,
    xpReward: 20,
    question: 'Can you reassign the loop iteration variable (i) inside the body of a Kotlin for loop?',
    codeFileName: 'LoopVarMutability.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 1..5) {',
      '    // Can we write: i = i + 2 ?',
      '}'
    ],
    options: [
      { id: 'A', title: 'No, loop iteration variables in Kotlin are implicit vals and cannot be reassigned', subtitle: 'Compiler error: Val cannot be reassigned', isCorrect: true },
      { id: 'B', title: 'Yes, if defined with var i in 1..5', subtitle: 'var keyword is illegal in loop header', isCorrect: false },
      { id: 'C', title: 'Yes, in Kotlin all loop variables are mutable', subtitle: 'They are strictly immutable', isCorrect: false },
      { id: 'D', title: 'Only inside while loops', subtitle: 'Loop variable reassignment in for is forbidden', isCorrect: false }
    ],
    hint: 'In Kotlin, the loop parameter `i` is an implicit `val`. You cannot reassign it.',
    explanation: {
      title: 'Loop Variables are Implicit vals',
      text: 'Kotlin loop variables cannot be reassigned inside the loop body. This avoids common bugs where iteration counters are modified unexpectedly.',
      highlights: ['Implicit val', 'cannot reassign', 'loop safety']
    }
  },

  // =========================================================================
  // LESSON 2: while & do-while Loops
  // =========================================================================
  {
    id: 'w3-l2-c1',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'while-loops',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'while • Counter Loop',
    skill: 'while_loops',
    difficulty: 1,
    xpReward: 20,
    question: 'How many times does this while loop execute?',
    codeFileName: 'WhileCounter.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var n = 1',
      'while (n < 4) {',
      '    n++',
      '}',
      'println(n)'
    ],
    options: [
      { id: 'A', title: 'Prints 4 (executes 3 times for n = 1, 2, 3)', subtitle: 'Stops when n becomes 4', isCorrect: true },
      { id: 'B', title: 'Prints 3 (executes 2 times)', subtitle: 'n increments to 4 before terminating', isCorrect: false },
      { id: 'C', title: 'Prints 5', subtitle: 'Overcounts', isCorrect: false },
      { id: 'D', title: 'Infinite loop', subtitle: 'n increments every iteration', isCorrect: false }
    ],
    hint: 'Iteration 1: n becomes 2. Iteration 2: n becomes 3. Iteration 3: n becomes 4. Then 4 < 4 is false, loop terminates.',
    explanation: {
      title: 'Tracing while Loop Iterations',
      text: 'The loop executes 3 times. When `n` reaches `4`, the condition `n < 4` is false, and the loop prints `4`.',
      highlights: ['Prints 4', 'executes 3 times', 'condition check']
    }
  },
  {
    id: 'w3-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'while-loops',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'while • do-while Guarantee',
    skill: 'while_loops',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this do-while loop even though the condition is false initially?',
    codeFileName: 'DoWhile.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var x = 100',
      'do {',
      '    print("Executed ")',
      '} while (x < 10)'
    ],
    options: [
      { id: 'A', title: 'Executed ', subtitle: 'do-while always runs at least once before checking the condition', isCorrect: true },
      { id: 'B', title: 'Nothing is printed', subtitle: 'Standard while would print nothing, but do-while guarantees one run', isCorrect: false },
      { id: 'C', title: 'Infinite loop', subtitle: 'Condition checked at bottom is false', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'do-while is fully supported in Kotlin', isCorrect: false }
    ],
    hint: 'A do-while loop executes the body first, then checks the condition at the end.',
    explanation: {
      title: 'do-while Executes at Least Once',
      text: 'Because the condition check occurs at the end of the block, the `do` block is guaranteed to execute at least once.',
      highlights: ['Executed once', 'condition at bottom', 'guaranteed first run']
    }
  },
  {
    id: 'w3-l2-c3',
    challengeType: 'code-completion',
    worldId: 'world-3',
    lessonId: 'while-loops',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'while • Halving While Loop',
    skill: 'while_loops',
    difficulty: 2,
    xpReward: 20,
    question: 'Complete the loop to run as long as energy remains positive (> 0):',
    codeFileName: 'EnergyLoop.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var energy = 10',
      '_____ (energy > 0) {',
      '    energy /= 2',
      '}'
    ],
    options: [
      { id: 'A', title: 'while', subtitle: 'Kotlin while loop keyword', isCorrect: true },
      { id: 'B', title: 'loop', subtitle: 'Rust keyword', isCorrect: false },
      { id: 'C', title: 'repeat', subtitle: 'repeat is a higher-order function, not keyword', isCorrect: false },
      { id: 'D', title: 'until', subtitle: 'Range function', isCorrect: false }
    ],
    hint: 'Use the standard "while" keyword with condition in parentheses.',
    explanation: {
      title: 'Standard while Syntax',
      text: '`while (condition)` evaluates the condition before each iteration. The loop stops when `energy` becomes 0.',
      highlights: ['while (energy > 0)', 'standard keyword']
    }
  },
  {
    id: 'w3-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-3',
    lessonId: 'while-loops',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Bug Hunter • Infinite Loop',
    skill: 'while_loops',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 2,
    question: 'Find the bug! Why does this while loop run infinitely?',
    codeFileName: 'InfiniteBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var count = 0',
      'while (count < 5) {',
      '    println(count) // Line 3',
      '}'
    ],
    options: [
      { id: 'A', title: 'The loop never modifies count (missing count++), so count < 5 is always true', subtitle: 'Creates a freeze / infinite loop', isCorrect: true },
      { id: 'B', title: 'Line 1: var count = 0 is invalid', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 2: while conditions cannot use <', subtitle: '< is a valid comparison operator', isCorrect: false },
      { id: 'D', title: 'Kotlin automatically increments variables', subtitle: 'Variables must be explicitly modified', isCorrect: false }
    ],
    hint: 'If count never changes inside the loop body, count < 5 will stay true forever.',
    explanation: {
      title: 'Missing Loop Progress Mutation',
      text: 'Without `count++` inside the block, `count` remains 0 forever, causing an infinite loop. Always ensure the loop variable advances toward termination.',
      highlights: ['Missing count++', 'infinite loop', 'termination condition']
    }
  },
  {
    id: 'w3-l2-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-3',
    lessonId: 'while-loops',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Clean Code • repeat() Utility',
    skill: 'while_loops',
    difficulty: 1,
    xpReward: 20,
    question: 'When you simply need to execute a block N times without an index, what idiomatic Kotlin function is preferred over while?',
    codeFileName: 'RepeatDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Idiomatic Kotlin for running 3 times:',
      '_____(3) {',
      '    println("Ping")',
      '}'
    ],
    options: [
      { id: 'A', title: 'repeat', subtitle: 'Standard library inline function repeat(times) { ... }', isCorrect: true },
      { id: 'B', title: 'loop', subtitle: 'Not in Kotlin standard library', isCorrect: false },
      { id: 'C', title: 'times', subtitle: 'Groovy / Ruby syntax', isCorrect: false },
      { id: 'D', title: 'cycle', subtitle: 'Non-existent function', isCorrect: false }
    ],
    hint: 'Kotlin\'s standard library includes a clean function named "repeat".',
    explanation: {
      title: 'The repeat() Function',
      text: '`repeat(n) { ... }` is Kotlin\'s idiomatic way to run an action `n` times without manually maintaining a counter.',
      highlights: ['repeat(3)', 'idiomatic', 'standard library']
    }
  },

  // =========================================================================
  // LESSON 3: Ranges (.., until, downTo, step)
  // =========================================================================
  {
    id: 'w3-l3-c1',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'ranges',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Ranges • until Keyword',
    skill: 'ranges',
    difficulty: 2,
    xpReward: 20,
    question: 'What is the last number printed by "0 until 4"?',
    codeFileName: 'UntilDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 0 until 4) {',
      '    print("$i ")',
      '}'
    ],
    options: [
      { id: 'A', title: '3 (prints: 0 1 2 3 )', subtitle: '"until" excludes the upper boundary (4)', isCorrect: true },
      { id: 'B', title: '4 (prints: 0 1 2 3 4 )', subtitle: '4 would be included with .. (double dot)', isCorrect: false },
      { id: 'C', title: '2', subtitle: 'Under-counts', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'until is a standard Kotlin infix function', isCorrect: false }
    ],
    hint: 'until creates an open upper-bound range [0, 4) where 4 is excluded.',
    explanation: {
      title: 'Half-Open Ranges with "until"',
      text: '`0 until 4` iterates indices 0, 1, 2, and 3. This is ideal for 0-indexed arrays of size 4.',
      highlights: ['0 until 4', 'excludes 4', '0 1 2 3']
    }
  },
  {
    id: 'w3-l3-c2',
    challengeType: 'code-completion',
    worldId: 'world-3',
    lessonId: 'ranges',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Ranges • downTo Countdown',
    skill: 'ranges',
    difficulty: 2,
    xpReward: 25,
    question: 'To count downwards in Kotlin, you cannot write "5..1". Which infix function must be used?',
    codeFileName: 'Countdown.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 5 _____ 1) {',
      '    print("$i ")',
      '}'
    ],
    options: [
      { id: 'A', title: 'downTo', subtitle: 'Creates a descending IntProgression', isCorrect: true },
      { id: 'B', title: 'backward', subtitle: 'Not a Kotlin keyword', isCorrect: false },
      { id: 'C', title: 'decrement', subtitle: 'Not a range operator', isCorrect: false },
      { id: 'D', title: 'to', subtitle: 'Creates a Pair object', isCorrect: false }
    ],
    hint: 'Use "downTo" to create descending progressions (e.g., 5 downTo 1).',
    explanation: {
      title: 'Descending Progression with downTo',
      text: 'Writing `5..1` produces an empty range. To count backwards from 5 down to 1, Kotlin provides the `downTo` infix function.',
      highlights: ['5 downTo 1', 'descending', 'downTo']
    }
  },
  {
    id: 'w3-l3-c3',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'ranges',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Ranges • step Interval',
    skill: 'ranges',
    difficulty: 2,
    xpReward: 25,
    question: 'What sequence is printed by applying "step 3" to the range 1..10?',
    codeFileName: 'StepDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (n in 1..10 step 3) {',
      '    print("$n ")',
      '}'
    ],
    options: [
      { id: 'A', title: '1 4 7 10 ', subtitle: 'Increments by 3 starting at 1', isCorrect: true },
      { id: 'B', title: '3 6 9 ', subtitle: 'Starts at 1, not 3', isCorrect: false },
      { id: 'C', title: '1 3 6 9 ', subtitle: 'Inconsistent step', isCorrect: false },
      { id: 'D', title: '1 2 3 ', subtitle: 'Step interval ignored', isCorrect: false }
    ],
    hint: 'Start at 1, add 3 -> 4, add 3 -> 7, add 3 -> 10.',
    explanation: {
      title: 'Step Progression',
      text: '`step 3` configures the progression step to 3, outputting `1`, `4`, `7`, and `10`.',
      highlights: ['1 4 7 10', 'step 3', 'progression']
    }
  },
  {
    id: 'w3-l3-c4',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'ranges',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Ranges • in Range Check',
    skill: 'ranges',
    difficulty: 2,
    xpReward: 20,
    question: 'What is printed by this character range membership test?',
    codeFileName: 'CharRange.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val ch = \'c\'',
      'println(ch in \'a\'..\'e\')'
    ],
    options: [
      { id: 'A', title: 'true', subtitle: '\'c\' falls alphabetically between \'a\' and \'e\'', isCorrect: true },
      { id: 'B', title: 'false', subtitle: 'Outside bounds', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Ranges cannot be made of characters', isCorrect: false },
      { id: 'D', title: '2', subtitle: 'Index return', isCorrect: false }
    ],
    hint: 'CharRange supports natural alphabetical order: \'a\', \'b\', \'c\', \'d\', \'e\'.',
    explanation: {
      title: 'Character Ranges',
      text: 'Ranges work on any Comparable type in Kotlin, including `Char`. `\'c\' in \'a\'..\'e\'` evaluates to `true`.',
      highlights: ['\'a\'..\'e\'', 'true', 'Comparable ranges']
    }
  },
  {
    id: 'w3-l3-c5',
    challengeType: 'bug-fix',
    worldId: 'world-3',
    lessonId: 'ranges',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Bug Hunter • Empty Range Trap',
    skill: 'ranges',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 0,
    question: 'Find the bug! Why does this loop print nothing at all?',
    codeFileName: 'EmptyRangeBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 5..1) { // Line 1',
      '    println(i)',
      '}'
    ],
    options: [
      { id: 'A', title: '5..1 creates an empty ascending range (must use 5 downTo 1 instead)', subtitle: 'The start is greater than the end in an ascending range', isCorrect: true },
      { id: 'B', title: 'Line 2 println is broken', subtitle: 'Loop never enters body', isCorrect: false },
      { id: 'C', title: 'Causes a NegativeRangeCrash', subtitle: 'Compiles fine but is empty', isCorrect: false },
      { id: 'D', title: 'No bug: prints 5 4 3 2 1', subtitle: '5..1 does NOT count down', isCorrect: false }
    ],
    hint: 'The .. operator only creates ascending progressions. If start > end, the range is empty.',
    explanation: {
      title: 'The Ascending Range Trap',
      text: '`5..1` produces an empty range because `..` always defaults to `step 1`. To count downwards, always use `5 downTo 1`.',
      highlights: ['5..1 is empty', 'use 5 downTo 1', 'Line 1']
    }
  },

  // =========================================================================
  // LESSON 4: Nested Loops & Matrices
  // =========================================================================
  {
    id: 'w3-l4-c1',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'nested-loops',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Nested Loops • Iteration Product',
    skill: 'nested_loops',
    difficulty: 2,
    xpReward: 25,
    question: 'How many total times does the inner print execute?',
    codeFileName: 'NestedCount.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var count = 0',
      'for (r in 1..3) {',
      '    for (c in 1..4) {',
      '        count++',
      '    }',
      '}',
      'println(count)'
    ],
    options: [
      { id: 'A', title: '12', subtitle: 'Outer (3) * Inner (4) = 12 total iterations', isCorrect: true },
      { id: 'B', title: '7', subtitle: '3 + 4 = 7 (addition mistake)', isCorrect: false },
      { id: 'C', title: '4', subtitle: 'Inner loop count only', isCorrect: false },
      { id: 'D', title: '9', subtitle: '3 * 3 = 9', isCorrect: false }
    ],
    hint: 'For every iteration of the outer loop (3 times), the inner loop runs 4 times: 3 * 4 = 12.',
    explanation: {
      title: 'Cartesian Product of Nested Loops',
      text: 'The outer loop runs 3 times; each time, the inner loop runs 4 times. Total count = 3 * 4 = 12.',
      highlights: ['3 * 4 = 12', 'outer * inner', 'nested loops']
    }
  },
  {
    id: 'w3-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'nested-loops',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Nested Loops • Coordinate Tracing',
    skill: 'nested_loops',
    difficulty: 2,
    xpReward: 25,
    question: 'What coordinates are printed on the very first iteration?',
    codeFileName: 'Coordinates.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (x in 1..2) {',
      '    for (y in 10..20 step 10) {',
      '        println("($x,$y)")',
      '        break',
      '    }',
      '    break',
      '}'
    ],
    options: [
      { id: 'A', title: '(1,10)', subtitle: 'First x is 1, first y is 10', isCorrect: true },
      { id: 'B', title: '(1,20)', subtitle: 'Second y iteration', isCorrect: false },
      { id: 'C', title: '(2,10)', subtitle: 'Second x iteration', isCorrect: false },
      { id: 'D', title: '(0,0)', subtitle: 'Loops start at 1 and 10', isCorrect: false }
    ],
    hint: 'Start with the initial values of x (1) and y (10).',
    explanation: {
      title: 'Initial Coordinate State',
      text: 'The outer loop begins at `x = 1`, and the inner loop begins at `y = 10`, printing `(1,10)` before breaking.',
      highlights: ['(1,10)', 'first iteration']
    }
  },
  {
    id: 'w3-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-3',
    lessonId: 'nested-loops',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Nested Loops • Grid Traversal',
    skill: 'nested_loops',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the nested loop to iterate through all rows and columns of a 3x3 grid:',
    codeFileName: 'Grid.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (row in 0 until 3) {',
      '    _____ (col in 0 until 3) {',
      '        print("[$row,$col]")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'for', subtitle: 'Standard nested for loop keyword', isCorrect: true },
      { id: 'B', title: 'each', subtitle: 'Method name (not keyword)', isCorrect: false },
      { id: 'C', title: 'while', subtitle: 'Requires boolean expression', isCorrect: false },
      { id: 'D', title: 'in', subtitle: 'Membership operator', isCorrect: false }
    ],
    hint: 'Nest another "for" loop inside the outer loop.',
    explanation: {
      title: 'Nested for Loop Traversal',
      text: 'Using a nested `for` loop allows cleanly iterating through 2D grids, matrices, and tables.',
      highlights: ['for (col in ...)', '2D grid', 'nested traversal']
    }
  },
  {
    id: 'w3-l4-c4',
    challengeType: 'bug-fix',
    worldId: 'world-3',
    lessonId: 'nested-loops',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Bug Hunter • Variable Shadowing in Loops',
    skill: 'nested_loops',
    difficulty: 3,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why is using the same loop variable name "i" in Line 2 confusing and problematic?',
    codeFileName: 'ShadowBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 1..3) {',
      '    for (i in 1..3) { // Line 2',
      '        print(i)',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'The inner loop variable shadows the outer loop variable', subtitle: 'Makes accessing the outer i impossible inside the inner block', isCorrect: true },
      { id: 'B', title: 'Line 2 crashes JVM with OutOfMemory', subtitle: 'Causes shadowing, not crash', isCorrect: false },
      { id: 'C', title: 'Inner for loops must always use "j"', subtitle: 'Naming convention, not language mandate', isCorrect: false },
      { id: 'D', title: 'No bug exists: Kotlin merges both variables', subtitle: 'Shadowing hides outer scope', isCorrect: false }
    ],
    hint: 'Reusing "i" shadows the outer "i", making the outer loop index inaccessible.',
    explanation: {
      title: 'Variable Shadowing in Nested Scopes',
      text: 'Line 2 shadows the outer `i`. Always use distinct names (such as `row` and `col`, or `i` and `j`) to avoid confusion and bugs.',
      highlights: ['Shadowing', 'Line 2', 'use distinct names']
    }
  },
  {
    id: 'w3-l4-c5',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'nested-loops',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Nested Loops • Dependent Inner Range',
    skill: 'nested_loops',
    difficulty: 3,
    xpReward: 30,
    question: 'What triangular pattern character count is printed by this dependent nested loop?',
    codeFileName: 'Triangle.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var stars = 0',
      'for (row in 1..3) {',
      '    for (col in 1..row) {',
      '        stars++',
      '    }',
      '}',
      'println(stars)'
    ],
    options: [
      { id: 'A', title: '6', subtitle: 'Row 1 (1) + Row 2 (2) + Row 3 (3) = 6 stars', isCorrect: true },
      { id: 'B', title: '9', subtitle: '3 * 3 = 9 (if range were 1..3)', isCorrect: false },
      { id: 'C', title: '3', subtitle: 'Row count only', isCorrect: false },
      { id: 'D', title: '5', subtitle: 'Under-counts', isCorrect: false }
    ],
    hint: 'When row=1: col runs 1..1 (1 star). When row=2: col runs 1..2 (2 stars). When row=3: col runs 1..3 (3 stars). 1 + 2 + 3 = 6.',
    explanation: {
      title: 'Dependent Inner Loop Ranges',
      text: 'The inner loop range depends on the outer variable `1..row`. The sum of iterations is 1 + 2 + 3 = 6.',
      highlights: ['6', '1 + 2 + 3 = 6', 'dependent range']
    }
  },

  // =========================================================================
  // LESSON 5: Loop Control (break, continue & Labels)
  // =========================================================================
  {
    id: 'w3-l5-c1',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'loop-control',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loop Control • break Statement',
    skill: 'loop_control',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when "break" is encountered at i == 3?',
    codeFileName: 'BreakDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i in 1..5) {',
      '    if (i == 3) break',
      '    print("$i ")',
      '}'
    ],
    options: [
      { id: 'A', title: '1 2 ', subtitle: 'Loop terminates immediately when i reaches 3', isCorrect: true },
      { id: 'B', title: '1 2 3 ', subtitle: '3 is not printed because break happens before print', isCorrect: false },
      { id: 'C', title: '1 2 4 5 ', subtitle: 'That would be continue, not break', isCorrect: false },
      { id: 'D', title: '3 4 5 ', subtitle: 'Break exits the loop', isCorrect: false }
    ],
    hint: 'break terminates the loop immediately. Since the check happens before print("$i "), 3 is never printed.',
    explanation: {
      title: 'The break Statement',
      text: '`break` terminates the enclosing loop immediately. The numbers `1` and `2` are printed, then the loop exits.',
      highlights: ['1 2 ', 'break terminates loop', 'immediate exit']
    }
  },
  {
    id: 'w3-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'loop-control',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loop Control • continue Statement',
    skill: 'loop_control',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when "continue" skips odd numbers?',
    codeFileName: 'ContinueDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (n in 1..5) {',
      '    if (n % 2 != 0) continue',
      '    print("$n ")',
      '}'
    ],
    options: [
      { id: 'A', title: '2 4 ', subtitle: 'Skips 1, 3, 5 and prints only even numbers', isCorrect: true },
      { id: 'B', title: '1 3 5 ', subtitle: 'Odd numbers were skipped by continue', isCorrect: false },
      { id: 'C', title: '2 ', subtitle: 'Terminated early', isCorrect: false },
      { id: 'D', title: '1 2 3 4 5 ', subtitle: 'continue was not ignored', isCorrect: false }
    ],
    hint: 'continue skips the rest of the current iteration and jumps directly to the next iteration.',
    explanation: {
      title: 'The continue Statement',
      text: '`continue` bypasses the remaining code inside the loop for the current item. Only even numbers `2` and `4` reach the `print` statement.',
      highlights: ['2 4 ', 'skips current iteration', 'continue']
    }
  },
  {
    id: 'w3-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-3',
    lessonId: 'loop-control',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loop Control • Labeled Break',
    skill: 'loop_control',
    difficulty: 3,
    xpReward: 30,
    question: 'How do you label an outer loop so an inner loop can break out of both loops in Kotlin?',
    codeFileName: 'LabeledBreak.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '_____ for (x in 1..5) {',
      '    for (y in 1..5) {',
      '        if (x * y == 6) break@outer',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'outer@', subtitle: 'Label identifier followed by @ sign', isCorrect: true },
      { id: 'B', title: '@outer', subtitle: 'Annotation syntax (invalid for labels)', isCorrect: false },
      { id: 'C', title: ':outer', subtitle: 'Assembly/goto syntax', isCorrect: false },
      { id: 'D', title: 'label(outer)', subtitle: 'Macro syntax', isCorrect: false }
    ],
    hint: 'In Kotlin, labels take the form of an identifier followed by the @ sign: name@.',
    explanation: {
      title: 'Labeled Jump Expressions',
      text: 'Any expression in Kotlin may be marked with a label (e.g. `outer@`). You can qualify `break` or `continue` with `@outer` to jump out of nested loops.',
      highlights: ['outer@', 'break@outer', 'labeled break']
    }
  },
  {
    id: 'w3-l5-c4',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'loop-control',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Loop Control • Labeled Break Execution',
    skill: 'loop_control',
    difficulty: 3,
    xpReward: 30,
    question: 'What is printed by this labeled break?',
    codeFileName: 'LabelExec.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'loop@ for (i in 1..3) {',
      '    for (j in 1..3) {',
      '        if (i == 2) break@loop',
      '        print("$i$j ")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: '11 12 13 ', subtitle: 'When i becomes 2, break@loop terminates the entire outer loop', isCorrect: true },
      { id: 'B', title: '11 12 13 31 32 33 ', subtitle: 'That would occur with continue@loop', isCorrect: false },
      { id: 'C', title: '11 ', subtitle: 'First j iteration only', isCorrect: false },
      { id: 'D', title: '21 22 23 ', subtitle: 'i==2 is where break occurs', isCorrect: false }
    ],
    hint: 'When i == 1: prints 11, 12, 13. When i == 2: break@loop terminates the outer loop completely!',
    explanation: {
      title: 'Breaking Out of Outer Loop',
      text: '`break@loop` immediately terminates the outer loop labeled `loop@`. The entire process halts at `i == 2`, leaving `11 12 13 `.',
      highlights: ['11 12 13 ', 'break@loop', 'terminates outer']
    }
  },
  {
    id: 'w3-l5-c5',
    challengeType: 'bug-fix',
    worldId: 'world-3',
    lessonId: 'loop-control',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Loops & Iterations',
    topicTag: 'Bug Hunter • Unreachable Code After Break',
    skill: 'loop_control',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 2,
    question: 'Find the bug! Why does Line 3 trigger a compiler warning or unreachable code error?',
    codeFileName: 'UnreachableBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'while (true) {',
      '    break',
      '    println("Finished") // Line 3',
      '}'
    ],
    options: [
      { id: 'A', title: 'Line 3 is unreachable code because break exited the block on Line 2', subtitle: 'Statements after an unconditional break can never execute', isCorrect: true },
      { id: 'B', title: 'while (true) is illegal in Kotlin', subtitle: 'while (true) is valid syntax', isCorrect: false },
      { id: 'C', title: 'println cannot be called inside loops', subtitle: 'Standard valid statement', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Code executes normally', isCorrect: false }
    ],
    hint: 'Once break executes unconditionally, no following lines in that block can ever be reached.',
    explanation: {
      title: 'Unreachable Code After Break',
      text: 'Line 3 can never be executed because `break` transfers control outside the loop immediately. Kotlin flags this as unreachable code.',
      highlights: ['Line 3', 'unreachable code', 'unconditional break']
    }
  },

  // =========================================================================
  // WORLD 3 BOSS: Loop Boss Milestone
  // =========================================================================
  {
    id: 'w3-boss',
    challengeType: 'output-prediction',
    worldId: 'world-3',
    lessonId: 'loop-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Loops & Iterations',
    topicTag: 'WORLD BOSS • Multi-Stage Matrix Algorithm',
    skill: 'loop-boss',
    difficulty: 3,
    xpReward: 50,
    isBoss: true,
    question: 'BOSS CHALLENGE: Trace this matrix compression algorithm with skip controls. What is printed?',
    codeFileName: 'MatrixBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var checksum = 0',
      'matrix@ for (r in 1..4 step 2) { // r = 1, 3',
      '    for (c in 5 downTo 1 step 2) { // c = 5, 3, 1',
      '        if (r == 3 && c == 3) continue',
      '        if (r == 3 && c == 1) break@matrix',
      '        checksum += (r * c)',
      '    }',
      '}',
      'println(checksum)'
    ],
    options: [
      { id: 'A', title: '24', subtitle: 'r=1: (5+3+1)=9. r=3: c=5 adds 15 (sum 24), c=3 skipped, c=1 breaks', isCorrect: true },
      { id: 'B', title: '36', subtitle: 'Calculated all combinations without break', isCorrect: false },
      { id: 'C', title: '18', subtitle: 'First row only', isCorrect: false },
      { id: 'D', title: '30', subtitle: 'Missed continue skip', isCorrect: false }
    ],
    hint: 'Trace r=1: c=5 (5), c=3 (3), c=1 (1) -> sum = 9. Trace r=3: c=5 adds 3*5=15 (sum=24), c=3 is skipped, c=1 breaks loop completely!',
    explanation: {
      title: 'BOSS DEFEATED! Loop & Range Champion',
      text: '1. `r = 1`:\n   - `c = 5`: +5 (sum=5)\n   - `c = 3`: +3 (sum=8)\n   - `c = 1`: +1 (sum=9)\n2. `r = 3`:\n   - `c = 5`: +15 (sum=24)\n   - `c = 3`: continue skips addition\n   - `c = 1`: `break@matrix` terminates everything!\nResult: `24`.',
      highlights: ['24', 'continue skip', 'break@matrix', 'Boss Defeated']
    }
  }
];
