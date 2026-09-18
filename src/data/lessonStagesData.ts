export interface Stage1LearnData {
  title: string;
  subtitle: string;
  exampleTag: string;
  exampleTitle: string;
  language: string;
  codeSnippet: string[];
  explanation: string;
  keyIdeas: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  keyTakeaway: string;
}

export interface ExploreCard {
  id: string;
  number: string;
  title: string;
  language: string;
  subtitle: string;
  code: string[];
  whatItMeans: Array<{
    label: string;
    description: string;
  }>;
  whatChanged: string;
}

export interface Stage2ExploreData {
  title: string;
  subtitle: string;
  cards: ExploreCard[];
}

export interface PredictOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  isCorrect: boolean;
}

export interface PredictQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  topicMeta: string;
  title?: string;
  language: string;
  /** Omit for a pure comprehension/MCQ check (no code to predict output for) --
   * used e.g. for purely conceptual topics like "What is Kotlin?". */
  code?: string[];
  prompt: string;
  options: PredictOption[];
  explanation: {
    codeRef: string;
    detail: string;
  };
}

export interface Stage3PredictData {
  title: string;
  subtitle?: string;
  questions: PredictQuestion[];
}

export interface Stage4WriteRunData {
  challengeNumber: number;
  totalChallenges: number;
  xpReward: number;
  title: string;
  description: string;
  requirements: {
    name: string;
    params: string;
    returns: string;
  };
  fileName: string;
  initialCode: string;
  solutionCode: string;
  sampleInput: string;
  expectedOutput: string;
  testCase: {
    call: string;
    expected: string;
  };
}

export type DebugBugType = 'syntax' | 'logic' | 'runtime' | 'null-safety' | 'type' | 'collection';

export interface Stage5DebugData {
  title: string;
  subtitle: string;
  challengeNumber: number;
  totalChallenges: number;
  difficulty: 'easy' | 'medium' | 'hard';
  bugType: DebugBugType;
  bugLabel: string;
  brokenCode: string;
  fixedCode: string;
  expectedOutput: string;
  hints: [string, string, string]; // Hint 1: Conceptual clue, Hint 2: Narrow reasoning, Hint 3: Pinpointed direction
  explanation: string;
}

export interface Stage6MasteredData {
  topicTitle: string;
  summary: string;
  passedCount: string;
  verificationItems: Array<{
    title: string;
    subtitle: string;
  }>;
  xpEarned: number;
  streakDays: number;
  accuracy: string;
}

// Backward compatibility alias for Stage5MasteredData
export type Stage5MasteredData = Stage6MasteredData;

// Learn and Mastered are always required -- every topic needs a concept
// explanation and a completion confirmation. The other four are optional per
// CODEDO_MASTER_PLAN.md's "topic-aware activity selection": a simple/purely
// conceptual topic (e.g. "What is Kotlin?") should only use the activities
// that meaningfully prove understanding -- often just Learn -> MCQ (Predict)
// -> Mastered, skipping Explore/Write&Run/Debug entirely rather than forcing
// them onto content where they don't fit.
export interface FiveStageLesson {
  id: string;
  worldId: string;
  worldName: string;
  stageName: string;
  topicTitle: string;
  learn: Stage1LearnData;
  explore?: Stage2ExploreData;
  predict?: Stage3PredictData;
  writeRun?: Stage4WriteRunData;
  debug?: Stage5DebugData;
  mastered: Stage6MasteredData;
}

export const FUNCTIONS_LESSON: FiveStageLesson = {
  id: 'functions-lesson',
  worldId: 'world-4',
  worldName: 'Functions & Scope',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Kotlin Functions',
  learn: {
    title: 'What is a function?',
    subtitle:
      'A function is a named, reusable sequence of instructions that packages specific operations into a clean, callable unit — allowing you to write logic once and invoke it anywhere with customized inputs.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A simple function',
    language: 'Kotlin',
    codeSnippet: [
      'fun greet() {',
      '    println("Hello!")',
      '}'
    ],
    explanation: 'A function gives a block of code a name so it can be reused whenever we need it.',
    keyIdeas: [
      {
        number: 1,
        title: 'Give code a name',
        description: 'Identify a reusable task.'
      },
      {
        number: 2,
        title: 'Reuse the logic',
        description: 'Call the same code whenever you need it.'
      },
      {
        number: 3,
        title: 'Accept input',
        description: 'Parameters allow a function to receive values.'
      },
      {
        number: 4,
        title: 'Return a result',
        description: 'A function can send a value back to its caller.'
      }
    ],
    keyTakeaway: 'Write the logic once. Call it whenever you need it.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a simple function to parameters and return values.',
    cards: [
      {
        id: 'card-1',
        number: '01',
        title: 'Simple function',
        language: 'Kotlin',
        subtitle: 'Give a block of code a name.',
        code: [
          'fun greet() {',
          '    println("Hello!")',
          '}'
        ],
        whatItMeans: [
          { label: 'fun', description: 'declares a function' },
          { label: 'greet', description: 'function name' },
          { label: '()', description: 'no parameters' },
          { label: '{ }', description: 'function body' },
          { label: 'println("Hello!")', description: 'code executed by the function' }
        ],
        whatChanged: 'We gave a block of code a reusable name.'
      },
      {
        id: 'card-2',
        number: '02',
        title: 'Calling a function',
        language: 'Kotlin',
        subtitle: 'Run the code inside the function.',
        code: [
          'fun greet() {',
          '    println("Hello!")',
          '}',
          '',
          'greet()'
        ],
        whatItMeans: [
          { label: 'fun greet()', description: 'defines the function' },
          { label: 'greet()', description: 'calls the function' },
          { label: 'Execution', description: 'The call causes the code inside the function to execute.' }
        ],
        whatChanged: 'We now use the function after defining it.'
      },
      {
        id: 'card-3',
        number: '03',
        title: 'Function with a parameter',
        language: 'Kotlin',
        subtitle: 'Allow the function to receive a value.',
        code: [
          'fun greet(name: String) {',
          '    println("Hello, $name!")',
          '}',
          '',
          'greet("Alex")'
        ],
        whatItMeans: [
          { label: 'name', description: 'parameter name' },
          { label: 'String', description: 'parameter type' },
          { label: 'name: String', description: 'declares a parameter that accepts text' },
          { label: 'greet("Alex")', description: 'passes "Alex" into the function' }
        ],
        whatChanged: 'The function can now receive dynamic input.'
      },
      {
        id: 'card-4',
        number: '04',
        title: 'Multiple parameters',
        language: 'Kotlin',
        subtitle: 'Allow the function to receive more than one value.',
        code: [
          'fun sum(param1: Int, param2: Int) {',
          '    println(param1 + param2)',
          '}',
          '',
          'sum(4, 6)'
        ],
        whatItMeans: [
          { label: 'param1: Int', description: 'first parameter and its type' },
          { label: 'param2: Int', description: 'second parameter and its type' },
          { label: 'sum(4, 6)', description: 'passes two Int values' },
          { label: 'param1 + param2', description: 'uses the received values' }
        ],
        whatChanged: 'The function can now work with multiple inputs.'
      },
      {
        id: 'card-5',
        number: '05',
        title: 'Returning a value',
        language: 'Kotlin',
        subtitle: 'Send a calculated result back to the caller.',
        code: [
          'fun sum(param1: Int, param2: Int): Int {',
          '    return param1 + param2',
          '}',
          '',
          'val result = sum(4, 6)'
        ],
        whatItMeans: [
          { label: ': Int', description: 'return type declaration' },
          { label: 'return', description: 'sends a calculated value back' },
          { label: 'param1 + param2', description: 'calculated result expression' },
          { label: 'val result', description: 'stores the returned value in a variable' }
        ],
        whatChanged: 'The function can now produce a value that other code can use.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-func-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Kotlin Functions',
        topicMeta: 'Kotlin Functions',
        language: 'Kotlin',
        code: [
          'fun greet() {',
          '    println("Hello!")',
          '}',
          '',
          'greet()'
        ],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Nothing', isCorrect: false },
          { id: 'B', label: 'Hello!', isCorrect: true },
          { id: 'C', label: 'greet', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'greet()',
          detail: 'greet() calls the function, so the println statement executes and outputs "Hello!".'
        }
      },
      {
        id: 'pred-func-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Parameters & Templates',
        topicMeta: 'Parameters & Templates',
        language: 'Kotlin',
        code: [
          'fun welcome(user: String) {',
          '    println("Welcome, $user")',
          '}',
          '',
          'welcome("Dev")',
        ],
        prompt: 'What will be displayed in the terminal?',
        options: [
          { id: 'A', label: 'Welcome, $user', isCorrect: false },
          { id: 'B', label: 'Welcome, Dev', isCorrect: true },
          { id: 'C', label: 'Dev', isCorrect: false },
          { id: 'D', label: 'Unit', isCorrect: false }
        ],
        explanation: {
          codeRef: 'welcome("Dev")',
          detail: 'The string template "$user" interpolates the argument "Dev" directly into the message.'
        }
      },
      {
        id: 'pred-func-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Return Values',
        topicMeta: 'Return Values',
        language: 'Kotlin',
        code: [
          'fun add(a: Int, b: Int): Int {',
          '    return a + b',
          '}',
          '',
          'val sum = add(4, 6)',
          'println("Sum is $sum")'
        ],
        prompt: 'What will this code print to the console?',
        options: [
          { id: 'A', label: 'Sum is 10', isCorrect: true },
          { id: 'B', label: 'Sum is 46', isCorrect: false },
          { id: 'C', label: 'Sum is Unit', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'add(4, 6)',
          detail: 'add(4, 6) returns 10, which is stored in sum and interpolated as "Sum is 10".'
        }
      },
      {
        id: 'pred-func-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Reusing a Function',
        topicMeta: 'Reusing a Function',
        language: 'Kotlin',
        code: [
          'fun shout(word: String) {',
          '    println("$word!!!")',
          '}',
          '',
          'shout("Kotlin")',
          'shout("Rocks")'
        ],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'Kotlin!!!\nRocks!!!', isCorrect: true },
          { id: 'B', label: 'Kotlin!!!Rocks!!!', isCorrect: false },
          { id: 'C', label: 'Kotlin!!!', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'shout("Kotlin")\nshout("Rocks")',
          detail: 'Calling shout() twice with different arguments runs the same function body twice, printing "Kotlin!!!" and "Rocks!!!" on separate lines.'
        }
      },
      {
        id: 'pred-func-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Functions Calling Functions',
        topicMeta: 'Functions Calling Functions',
        language: 'Kotlin',
        code: [
          'fun square(n: Int): Int {',
          '    return n * n',
          '}',
          '',
          'fun sumOfSquares(a: Int, b: Int): Int {',
          '    return square(a) + square(b)',
          '}',
          '',
          'println(sumOfSquares(2, 3))'
        ],
        prompt: 'What is the resulting output?',
        options: [
          { id: 'A', label: '13', isCorrect: true },
          { id: 'B', label: '25', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'square(a) + square(b)',
          detail: 'sumOfSquares calls square(2) = 4 and square(3) = 9, then returns their sum: 4 + 9 = 13.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 3,
    totalChallenges: 5,
    xpReward: 10,
    title: 'Multiply Two Numbers',
    description:
      'Write a function that calculates the product of two integers.\n\n' +
      '1. Return the product of a and b using the multiplication operator (*).',
    requirements: {
      name: 'multiply',
      params: 'a: Int, b: Int',
      returns: 'Int'
    },
    fileName: 'solution.kt',
    initialCode: `// Kotlin Basics · Function Definition

fun multiply(a: Int, b: Int): Int {
    // 1. Return the product of a and b:
}`,
    solutionCode: `
// Kotlin Basics · Function Definition



fun multiply(a: Int, b: Int): Int {

    return a * b

}



// Output: multiply(4, 5) -> 20`,
    sampleInput: 'multiply(4, 5)',
    expectedOutput: '20',
    testCase: {
      call: 'multiply(4, 5)',
      expected: '20'
    }
  },
  debug: {
    title: 'Diagnose the Function Defect',
    subtitle: 'Inspect the broken function, find why the return value fails the requirements, and fix it.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Flaw: Incorrect Operator in Return',
    brokenCode: `fun multiply(a: Int, b: Int): Int {
    // BUG: Returning sum instead of product!
    return a + b
}

fun main() {
    val result = multiply(4, 5)
    println("Result: $result")
}`,
    fixedCode: `fun multiply(a: Int, b: Int): Int {
    return a * b
}

fun main() {
    val result = multiply(4, 5)
    println("Result: $result")
}`,
    expectedOutput: 'Result: 20',
    hints: [
      'Look closely at the arithmetic operation performed in the return statement.',
      'The function says "multiply", but the arithmetic operator inside is adding the two parameters.',
      'Replace the addition operator (+) with the multiplication operator (*) in "return a * b".'
    ],
    explanation: 'The function originally used the addition operator (+) instead of multiplication (*), causing multiply(4, 5) to return 9 instead of 20. Replacing it with `return a * b` resolves the logic defect.'
  },
  mastered: {
    topicTitle: 'Kotlin Functions',
    summary: 'You have successfully mastered function syntax, parameters, return values, and diagnosed real-world code defects.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      {
        title: 'Concept understood',
        subtitle: 'What is a function & how it works'
      },
      {
        title: 'Examples explored',
        subtitle: '5 progressive function patterns'
      },
      {
        title: 'Predictions completed',
        subtitle: '5/5 correct output forecasts'
      },
      {
        title: 'Code written & executed',
        subtitle: '5 practical runtime tests passed'
      },
      {
        title: 'Bugs diagnosed & repaired',
        subtitle: 'Resolved arithmetic logic flaw & verified execution'
      }
    ],
    xpEarned: 60,
    streakDays: 5,
    accuracy: '100%'
  }
};

export const LOOPS_LESSON: FiveStageLesson = {
  id: 'loops-lesson',
  worldId: 'world-3',
  worldName: 'Loops & Iterations',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Kotlin Loops',
  learn: {
    title: 'What is a loop?',
    subtitle:
      "A loop is a fundamental control flow structure that automates repetition across numbers, ranges, or collections, letting your program execute repetitive tasks efficiently without redundant boilerplate code.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A simple loop',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..3) {',
      '    println(i)',
      '}'
    ],
    explanation: 'A loop repeats the code inside its body for each value in the specified range.',
    keyIdeas: [
      {
        number: 1,
        title: 'Repeat code',
        description: 'Execute logic multiple times automatically.'
      },
      {
        number: 2,
        title: 'Control iterations',
        description: 'Set explicit starting points, bounds, and ranges.'
      },
      {
        number: 3,
        title: 'Work through collections',
        description: 'Visit each element in a list or sequence.'
      },
      {
        number: 4,
        title: 'Avoid duplication',
        description: 'Keep code concise and resilient against errors.'
      }
    ],
    keyTakeaway: 'Write the logic once. Let the loop repeat it.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a simple range loop to while loops and step modifiers.',
    cards: [
      {
        id: 'loop-card-1',
        number: '01',
        title: 'Basic range loop',
        language: 'Kotlin',
        subtitle: 'Loop through an inclusive sequence of integers.',
        code: [
          'for (i in 1..3) {',
          '    println(i)',
          '}'
        ],
        whatItMeans: [
          { label: 'for', description: 'starts a loop' },
          { label: 'i', description: 'loop variable holding current number' },
          { label: '1..3', description: 'inclusive range from 1 to 3' },
          { label: '{ }', description: 'body executed on each pass' }
        ],
        whatChanged: 'We established an automatic repetition sequence.'
      },
      {
        id: 'loop-card-2',
        number: '02',
        title: 'While loop',
        language: 'Kotlin',
        subtitle: 'Repeat as long as a condition evaluates to true.',
        code: [
          'var count = 3',
          'while (count > 0) {',
          '    println(count)',
          '    count--',
          '}'
        ],
        whatItMeans: [
          { label: 'while', description: 'conditional loop' },
          { label: 'count > 0', description: 'condition checked before each cycle' },
          { label: 'count--', description: 'decrements state to reach termination' }
        ],
        whatChanged: 'Loop terminates dynamically when condition becomes false.'
      },
      {
        id: 'loop-card-3',
        number: '03',
        title: 'Loop with step',
        language: 'Kotlin',
        subtitle: 'Control the increment between successive iterations.',
        code: [
          'for (i in 0..10 step 2) {',
          '    println(i)',
          '}'
        ],
        whatItMeans: [
          { label: 'step 2', description: 'skips every second number' },
          { label: '0, 2, 4...', description: 'generates even numbers cleanly' }
        ],
        whatChanged: 'Added custom stride step mechanics.'
      },
      {
        id: 'loop-card-4',
        number: '04',
        title: 'Reverse range downTo',
        language: 'Kotlin',
        subtitle: 'Count backwards from higher to lower bounds.',
        code: [
          'for (i in 5 downTo 1) {',
          '    println(i)',
          '}'
        ],
        whatItMeans: [
          { label: 'downTo', description: 'iterates in descending order' },
          { label: '5 downTo 1', description: 'outputs 5, 4, 3, 2, 1' }
        ],
        whatChanged: 'Reversed progression flow without manual decrements.'
      },
      {
        id: 'loop-card-5',
        number: '05',
        title: 'Early break',
        language: 'Kotlin',
        subtitle: 'Terminate a loop early when a match is discovered.',
        code: [
          'for (i in 1..10) {',
          '    if (i == 4) break',
          '    println(i)',
          '}'
        ],
        whatItMeans: [
          { label: 'if (i == 4)', description: 'exit guard condition' },
          { label: 'break', description: 'instantly stops the loop and exits' }
        ],
        whatChanged: 'Gave the program an escape hatch for early completion.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-loop-1',
        questionNumber: 1,
        totalQuestions: 5,
        topicMeta: 'Kotlin Loops',
        language: 'Kotlin',
        code: [
          'var total = 0',
          'for (i in 1..3) {',
          '    total += i',
          '}',
          'println(total)'
        ],
        prompt: 'What will this loop output?',
        options: [
          { id: 'A', label: '3', isCorrect: false },
          { id: 'B', label: '6', isCorrect: true },
          { id: 'C', label: '123', isCorrect: false },
          { id: 'D', label: '0', isCorrect: false }
        ],
        explanation: {
          codeRef: 'total += i',
          detail: '1 + 2 + 3 equals 6. The loop accumulates each value into total.'
        }
      },
      {
        id: 'pred-loop-2',
        questionNumber: 2,
        totalQuestions: 5,
        topicMeta: 'While Loops',
        language: 'Kotlin',
        code: [
          'var n = 4',
          'while (n > 0) {',
          '    print(n)',
          '    n--',
          '}'
        ],
        prompt: 'What will this while loop print?',
        options: [
          { id: 'A', label: '4321', isCorrect: true },
          { id: 'B', label: '0123', isCorrect: false },
          { id: 'C', label: '1234', isCorrect: false },
          { id: 'D', label: 'It never stops', isCorrect: false }
        ],
        explanation: {
          codeRef: 'n--',
          detail: 'n starts at 4 and prints before each decrement, so the loop prints 4, 3, 2, 1 and stops once n reaches 0.'
        }
      },
      {
        id: 'pred-loop-3',
        questionNumber: 3,
        totalQuestions: 5,
        topicMeta: 'Loop Step',
        language: 'Kotlin',
        code: [
          'var sum = 0',
          'for (i in 0..10 step 5) {',
          '    sum += i',
          '}',
          'println(sum)'
        ],
        prompt: 'What does this program output?',
        options: [
          { id: 'A', label: '15', isCorrect: true },
          { id: 'B', label: '10', isCorrect: false },
          { id: 'C', label: '55', isCorrect: false },
          { id: 'D', label: '5', isCorrect: false }
        ],
        explanation: {
          codeRef: '0..10 step 5',
          detail: 'step 5 visits 0, 5, and 10 only, so sum accumulates to 0 + 5 + 10 = 15.'
        }
      },
      {
        id: 'pred-loop-4',
        questionNumber: 4,
        totalQuestions: 5,
        topicMeta: 'Reverse Range downTo',
        language: 'Kotlin',
        code: [
          'for (i in 3 downTo 1) {',
          '    print(i)',
          '}'
        ],
        prompt: 'What will this loop print?',
        options: [
          { id: 'A', label: '321', isCorrect: true },
          { id: 'B', label: '123', isCorrect: false },
          { id: 'C', label: '3210', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '3 downTo 1',
          detail: 'downTo counts backwards inclusively, visiting 3, 2, then 1, printing "321".'
        }
      },
      {
        id: 'pred-loop-5',
        questionNumber: 5,
        totalQuestions: 5,
        topicMeta: 'Early break',
        language: 'Kotlin',
        code: [
          'for (i in 1..5) {',
          '    if (i == 3) break',
          '    print(i)',
          '}'
        ],
        prompt: 'What does this loop print?',
        options: [
          { id: 'A', label: '12', isCorrect: true },
          { id: 'B', label: '123', isCorrect: false },
          { id: 'C', label: '12345', isCorrect: false },
          { id: 'D', label: '3', isCorrect: false }
        ],
        explanation: {
          codeRef: 'if (i == 3) break',
          detail: 'The loop prints 1 and 2, then breaks immediately once i reaches 3, before that value is ever printed.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 2,
    totalChallenges: 5,
    xpReward: 10,
    title: 'Sum of Numbers in Range',
    description:
      'Write a function called sumRange that sums numbers from 1 to max.\n\n' +
      '1. Declare a mutable accumulator variable sum starting at 0.\n\n' +
      '2. Write a for-loop for numbers from 1 up to max (1..max).\n\n' +
      '3. Add each number i to sum (sum += i).\n\n' +
      '4. Return the calculated sum.',
    requirements: {
      name: 'sumRange',
      params: 'max: Int',
      returns: 'Int'
    },
    fileName: 'loop_solution.kt',
    initialCode: `fun sumRange(max: Int): Int {
    // 1. Declare a mutable accumulator variable 'sum' starting at 0:
    
    // 2. Write a for-loop for numbers from 1 up to max (1..max):
    
        // 3. Add each number i to sum (sum += i):
        
    // 4. Return the calculated sum:
    
}`,
    solutionCode: 'fun sumRange(max: Int): Int {\n    var sum = 0\n    for (i in 1..max) {\n        sum += i\n    }\n    return sum\n}',
    sampleInput: 'sumRange(4)',
    expectedOutput: '10',
    testCase: {
      call: 'sumRange(4)',
      expected: '10'
    }
  },
  debug: {
    title: 'Diagnose the Loop Boundary Bug',
    subtitle: 'Identify why the accumulator sum misses the final number, and fix the loop range expression.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Off-by-One Range Boundary Bug',
    brokenCode: `fun sumRange(max: Int): Int {
    var sum = 0
    // BUG: using 'until' excludes the max boundary number!
    for (i in 1 until max) {
        sum += i
    }
    return sum
}

fun main() {
    val total = sumRange(4)
    println("Total: $total")
}`,
    fixedCode: `fun sumRange(max: Int): Int {
    var sum = 0
    for (i in 1..max) {
        sum += i
    }
    return sum
}

fun main() {
    val total = sumRange(4)
    println("Total: $total")
}`,
    expectedOutput: 'Total: 10',
    hints: [
      'Check the range operator inside the for-loop header.',
      'Notice that `until` creates an open-ended range that stops before `max` (1 until 4 only iterates 1, 2, 3 = 6).',
      'Replace `1 until max` with the closed range operator `1..max` so 4 is included.'
    ],
    explanation: 'Using `1 until max` excluded the endpoint `4`, yielding 6 instead of 10. Replacing it with `1..max` includes all integers from 1 up to 4, producing the correct total of 10.'
  },
  mastered: {
    topicTitle: 'Kotlin Loops',
    summary: 'You have mastered iteration mechanics, range bounds, step modifiers, and diagnosed off-by-one loop defects.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      {
        title: 'Concept understood',
        subtitle: 'Repetition logic & loop mechanics'
      },
      {
        title: 'Examples explored',
        subtitle: '5 progressive iteration patterns'
      },
      {
        title: 'Predictions completed',
        subtitle: '5/5 correct accumulator forecasts'
      },
      {
        title: 'Code written & executed',
        subtitle: 'Loop algorithm executed flawlessly'
      },
      {
        title: 'Bugs diagnosed & repaired',
        subtitle: 'Corrected boundary range condition in loop'
      }
    ],
    xpEarned: 60,
    streakDays: 5,
    accuracy: '100%'
  }
};

export const VARIABLES_LESSON: FiveStageLesson = {
  id: 'variables',
  worldId: 'world-1',
  worldName: 'Kotlin Foundations',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Variables & Immutability',
  learn: {
    title: 'What is a Variable?',
    subtitle:
      'Variables act as named memory containers that hold and label data values. In Kotlin, choosing val (immutable) or var (mutable) establishes whether references remain permanent constants or evolve dynamically during program execution.',
    exampleTag: 'EXAMPLE 1.1',
    exampleTitle: 'DECLARING VARIABLES IN KOTLIN',
    language: 'kotlin',
    codeSnippet: [
      '// val creates an immutable (read-only) reference',
      'val appName = "CodeDo"',
      'val maxScore: Int = 100',
      '',
      '// var creates a mutable variable',
      'var userCoins = 10',
      'userCoins = userCoins + 15 // Reassignment is permitted!',
      '',
      '// appName = "OtherApp" // Compile Error: Val cannot be reassigned'
    ],
    explanation:
      'In Kotlin, memory storage is defined with clear intent. By choosing val (value) or var (variable), you explicitly specify whether the stored reference will remain constant or fluctuate during the program lifecycle.',
    keyIdeas: [
      {
        number: 1,
        title: 'val creates an immutable contract',
        description:
          'Once a value is bound to a val reference, it can never be reassigned. This eliminates unexpected mutations and bugs.'
      },
      {
        number: 2,
        title: 'var allows runtime mutation',
        description:
          'Use var only when state must change over time, such as game scores, loop accumulators, or timer counts.'
      },
      {
        number: 3,
        title: 'Automatic type inference',
        description:
          'Kotlin figures out the data type (String, Int, Boolean) automatically from the initial value without requiring manual type declarations.'
      },
      {
        number: 4,
        title: 'Immutability by default',
        description:
          'Standard Kotlin convention: Always declare references with val by default. Only convert to var when reassignment is genuinely required.'
      }
    ],
    keyTakeaway:
      'Prefer val over var. Immutability makes your code thread-safe, robust, and clean.'
  },
  explore: {
    title: '5 progressive examples',
    subtitle: 'Watch val and var evolve from a single declaration into template interpolation and type safety.',
    cards: [
      {
        id: 'card-1',
        number: '01',
        title: 'The Read-Only val',
        language: 'kotlin',
        subtitle: 'Constant reference declaration',
        code: [
          'val language = "Kotlin"',
          'println(language)'
        ],
        whatItMeans: [
          { label: 'val', description: 'Declares an unchangeable reference in memory' },
          { label: 'language', description: 'The unique variable identifier name' },
          { label: '"Kotlin"', description: 'String value assigned at creation' }
        ],
        whatChanged: 'Basic initial declaration of an immutable reference.'
      },
      {
        id: 'card-2',
        number: '02',
        title: 'The Mutable var',
        language: 'kotlin',
        subtitle: 'Reassigning runtime values',
        code: [
          'var attempts = 1',
          'attempts = attempts + 1',
          'println(attempts) // Outputs: 2'
        ],
        whatItMeans: [
          { label: 'var', description: 'Declares a variable that permits value reassignment' },
          { label: 'attempts = ...', description: 'Overwrites existing memory with new value 2' }
        ],
        whatChanged: 'Used var keyword to allow the second line reassignment without compiler error.'
      },
      {
        id: 'card-3',
        number: '03',
        title: 'Explicit Type Annotations',
        language: 'kotlin',
        subtitle: 'Enforcing strict type boundaries',
        code: [
          'val userId: Int = 1042',
          'val price: Double = 19.99',
          'val isPro: Boolean = true'
        ],
        whatItMeans: [
          { label: ': Int', description: 'Enforces standard 32-bit integer type' },
          { label: ': Double', description: 'Enforces 64-bit floating point precision' },
          { label: ': Boolean', description: 'Restricts values strictly to true or false' }
        ],
        whatChanged: 'Added colon syntax : Type to document and enforce exact variable types.'
      },
      {
        id: 'card-4',
        number: '04',
        title: 'String Template Interpolation',
        language: 'kotlin',
        subtitle: 'Embedding values into strings cleanly',
        code: [
          'val hero = "Alex"',
          'var level = 5',
          'println("$hero is currently at Level $level!")'
        ],
        whatItMeans: [
          { label: '$hero', description: 'Directly substitutes the string variable into the text' },
          { label: '$level', description: 'Evaluates and prints the integer variable into the text' }
        ],
        whatChanged: 'Eliminated clumsy string concatenation (+) with clean Kotlin $ template syntax.'
      },
      {
        id: 'card-5',
        number: '05',
        title: 'Type Safety Enforcement',
        language: 'kotlin',
        subtitle: 'Kotlin prevents invalid type changes',
        code: [
          'var score = 50 // Inferred as Int',
          '// score = "fifty" // COMPILE ERROR: Type mismatch!',
          'score = 65 // Valid: Int to Int reassignment'
        ],
        whatItMeans: [
          { label: 'Type Safety', description: 'Even mutable var variables cannot morph into different types' },
          { label: 'Compile Check', description: 'Errors are caught at build-time, not in production' }
        ],
        whatChanged: 'Demonstrates that mutability does not sacrifice strong static typing.'
      }
    ]
  },
  predict: {
    title: 'Predict Output',
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        totalQuestions: 5,
        topicMeta: 'VAL VS VAR & TEMPLATES',
        language: 'kotlin',
        code: [
          'val player = "Kora"',
          'var score = 10',
          'score += 15',
          'println("$player: $score pts")'
        ],
        prompt: 'What will this Kotlin program output to the console?',
        options: [
          { id: 'A', label: 'Kora: 25 pts', isCorrect: true },
          { id: 'B', label: 'Kora: 10 pts', isCorrect: false },
          { id: 'C', label: '$player: 25 pts', isCorrect: false },
          { id: 'D', label: 'Compilation Error: val cannot be reassigned', isCorrect: false }
        ],
        explanation: {
          codeRef: 'score += 15',
          detail:
            'score is declared with var, so adding 15 updates the value to 25. player is declared with val and remains "Kora". The string template interpolates both values into "Kora: 25 pts".'
        }
      },
      {
        id: 'q2',
        questionNumber: 2,
        totalQuestions: 5,
        topicMeta: 'IMMUTABILITY ENFORCEMENT',
        language: 'kotlin',
        code: [
          'val maxRetries = 3',
          'maxRetries = 5',
          'println(maxRetries)'
        ],
        prompt: 'What happens when compiling and executing this code snippet?',
        options: [
          { id: 'A', label: '5', isCorrect: false },
          { id: 'B', label: '3', isCorrect: false },
          { id: 'C', label: 'Compilation Error: Val cannot be reassigned', isCorrect: true },
          { id: 'D', label: 'Runtime Exception', isCorrect: false }
        ],
        explanation: {
          codeRef: 'maxRetries = 5',
          detail:
            'Variables declared with val are read-only and immutable. Attempting to reassign maxRetries causes a compile error: "Val cannot be reassigned".'
        }
      },
      {
        id: 'q3',
        questionNumber: 3,
        totalQuestions: 5,
        topicMeta: 'TYPE SAFETY & STATIC TYPING',
        language: 'kotlin',
        code: [
          'var health = 100',
          'health = "Full"',
          'println(health)'
        ],
        prompt: 'What is the outcome of attempting to reassign health?',
        options: [
          { id: 'A', label: 'Full', isCorrect: false },
          { id: 'B', label: 'Compilation Error: Type mismatch: inferred type String but Int expected', isCorrect: true },
          { id: 'C', label: '100', isCorrect: false },
          { id: 'D', label: 'Runtime Error: ClassCastException', isCorrect: false }
        ],
        explanation: {
          codeRef: 'health = "Full"',
          detail:
            'Kotlin uses static typing. Because health is initialized with 100, its type is inferred as Int. Even though it is a mutable var, you cannot assign a String to an Int.'
        }
      },
      {
        id: 'q4',
        questionNumber: 4,
        totalQuestions: 5,
        topicMeta: 'STRING TEMPLATE EXPRESSIONS',
        language: 'kotlin',
        code: [
          'val count = 4',
          'val cost = 5',
          'println("Total: $${count * cost}")'
        ],
        prompt: 'What does this program print to stdout?',
        options: [
          { id: 'A', label: 'Total: $20', isCorrect: true },
          { id: 'B', label: 'Total: ${count * cost}', isCorrect: false },
          { id: 'C', label: 'Total: $ count * cost', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '${count * cost}',
          detail:
            'The first $ is treated as a literal dollar sign, and ${count * cost} evaluates the expression 4 * 5 = 20, resulting in "Total: $20".'
        }
      },
      {
        id: 'q5',
        questionNumber: 5,
        totalQuestions: 5,
        topicMeta: 'VARIABLE ARITHMETIC',
        language: 'kotlin',
        code: [
          'val base = 5',
          'var multiplier = 3',
          'multiplier += 2',
          'val result = base * multiplier',
          'println("Result: $result")'
        ],
        prompt: 'What is the final console output of this calculation?',
        options: [
          { id: 'A', label: 'Result: 15', isCorrect: false },
          { id: 'B', label: 'Result: 25', isCorrect: true },
          { id: 'C', label: 'Result: 10', isCorrect: false },
          { id: 'D', label: 'Result: base * 5', isCorrect: false }
        ],
        explanation: {
          codeRef: 'multiplier += 2',
          detail:
            'multiplier is incremented from 3 to 5. Then base (5) * multiplier (5) yields 25, so println prints "Result: 25".'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 50,
    title: 'Player Inventory Summary',
    description:
      'Declare variables and track an inventory count.\n\n' +
      '1. Declare immutable player name "Alex" using val.\n\n' +
      '2. Declare mutable coins starting at 25 using var.\n\n' +
      '3. Add 15 coins to the inventory (coins += 15).\n\n' +
      '4. Print the formatted inventory: "Player $player holds $coins coins".',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'Main.kt',
    initialCode: `fun main() {
    // 1. Declare immutable player name "Alex" using val:

    // 2. Declare mutable coins starting at 25 using var:

    // 3. Add 15 coins to the inventory (coins += 15):

    // 4. Print the formatted inventory: "Player $player holds $coins coins"

}`,
    solutionCode: `fun main() {
    val player = "Alex"
    var coins = 25
    coins += 15
    println("Player $player holds $coins coins")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Player Alex holds 40 coins',
    // No testCase.call here: kotlinRunner.ts already auto-invokes main() once
    // whenever it's present (see KOTLIN_SYNTAX_LESSON for the same convention).
    testCase: {
      call: '',
      expected: 'Player Alex holds 40 coins'
    }
  },
  debug: {
    title: 'Diagnose the Mutation Violation',
    subtitle: 'Identify why the program fails with a compile error when trying to reassign score, and fix it.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Syntax / Mutability Bug: Val Reassignment',
    brokenCode: `fun main() {
    // BUG: score is declared with val, but modified below!
    val score = 50
    score = score + 25
    println("Final Score: $score")
}`,
    fixedCode: `fun main() {
    var score = 50
    score = score + 25
    println("Final Score: $score")
}`,
    expectedOutput: 'Final Score: 75',
    hints: [
      'In Kotlin, what is the key difference between `val` and `var`?',
      '`val` creates a read-only immutable reference that cannot be reassigned after declaration.',
      'Change `val score = 50` to `var score = 50` so `score` can be updated with `score + 25`.'
    ],
    explanation: 'In Kotlin, `val` represents an immutable reference. Reassigning `score = score + 25` generates a compilation error: "Val cannot be reassigned". Changing `val` to `var` allows mutable state updates.'
  },
  mastered: {
    topicTitle: 'Variables & Immutability',
    summary:
      'You have mastered Kotlin variable declarations, the core distinction between val and var, type inference, and diagnosed mutability compile bugs.',
    passedCount: '5/5',
    verificationItems: [
      {
        title: 'val vs var Distinction',
        subtitle: 'Enforced read-only contracts and runtime mutations'
      },
      {
        title: 'Type Inference Engine',
        subtitle: 'Auto-resolved Int, String, and Boolean types'
      },
      {
        title: 'String Template Syntax',
        subtitle: 'Embedded variables with $ interpolation'
      },
      {
        title: 'Static Type Safety',
        subtitle: 'Prevented invalid type reassignment at compile time'
      },
      {
        title: 'Bugs diagnosed & repaired',
        subtitle: 'Fixed val reassignment compile violation'
      }
    ],
    xpEarned: 60,
    streakDays: 12,
    accuracy: '100%'
  }
};

// Pure theory topic -- per CODEDO_MASTER_PLAN.md's own "What is Kotlin?"
// example: Learn -> MCQ (via Predict, code-less) -> Mastered. No Explore,
// Write & Run, or Debug: those activities don't meaningfully apply to a
// conceptual "what/why" topic, and function syntax (params, return types)
// belongs to the Functions world (World 5), not here.
export const WHAT_IS_KOTLIN_LESSON: FiveStageLesson = {
  id: 'world-1-what-is-kotlin',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'What is Kotlin?',
  learn: {
    title: 'What is Kotlin?',
    subtitle:
      'Kotlin is a modern programming language created by JetBrains in 2011. In 2017, Google made it an officially supported language for Android development, and today it also powers backend services, desktop apps, and even iOS apps through Kotlin Multiplatform.',
    exampleTag: 'GOOD TO KNOW',
    exampleTitle: 'A taste of Kotlin',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    println("Hello, Kotlin!")',
      '}'
    ],
    explanation: 'This is roughly what a small Kotlin program looks like. Don\'t worry about the details yet -- you\'ll learn exactly how this works in the next lesson.',
    keyIdeas: [
      {
        number: 1,
        title: 'Created by JetBrains',
        description: 'The same company behind IntelliJ IDEA and other popular developer tools, first released in 2011.'
      },
      {
        number: 2,
        title: 'Official language for Android',
        description: 'Google declared Kotlin an officially supported Android language in 2017, and now recommends it as the preferred choice.'
      },
      {
        number: 3,
        title: 'Statically typed and null-safe',
        description: 'Every value\'s type is checked before the program runs, and Kotlin\'s type system is designed to catch accidental null-related crashes early.'
      },
      {
        number: 4,
        title: 'Runs almost everywhere',
        description: 'Beyond Android, Kotlin runs on the JVM for backend/server code, compiles to JavaScript, and even targets native platforms via Kotlin Multiplatform.'
      },
      {
        number: 5,
        title: 'Fully interoperable with Java',
        description: 'Kotlin code can call Java code and vice versa, which is why so many existing Java/Android projects were able to adopt it gradually.'
      }
    ],
    keyTakeaway: 'Kotlin is a modern, safe, and versatile language -- trusted for Android and increasingly used everywhere else too.'
  },
  predict: {
    title: 'Check Your Understanding',
    subtitle: 'A few quick questions based on what you just read -- no code involved yet.',
    questions: [
      {
        id: 'mcq-kotlin-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Origins',
        topicMeta: 'What is Kotlin?',
        language: 'Kotlin',
        prompt: 'Who created Kotlin?',
        options: [
          { id: 'A', label: 'Google', isCorrect: false },
          { id: 'B', label: 'JetBrains', isCorrect: true },
          { id: 'C', label: 'Oracle', isCorrect: false },
          { id: 'D', label: 'Microsoft', isCorrect: false }
        ],
        explanation: {
          codeRef: 'JetBrains, 2011',
          detail: 'Kotlin was created by JetBrains, the company behind IntelliJ IDEA. Google later adopted it as an official Android language in 2017, but did not create it.'
        }
      },
      {
        id: 'mcq-kotlin-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Platforms',
        topicMeta: 'What is Kotlin?',
        language: 'Kotlin',
        prompt: 'Which of these can Kotlin be used for?',
        options: [
          { id: 'A', label: 'Only Android apps', isCorrect: false },
          { id: 'B', label: 'Only backend/server code', isCorrect: false },
          { id: 'C', label: 'Android, backend, and more via Kotlin Multiplatform', isCorrect: true },
          { id: 'D', label: 'Only iOS apps', isCorrect: false }
        ],
        explanation: {
          codeRef: 'Runs almost everywhere',
          detail: 'Kotlin targets Android, JVM backends, JavaScript, and native platforms -- it is not limited to just one type of app.'
        }
      },
      {
        id: 'mcq-kotlin-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Type System',
        topicMeta: 'What is Kotlin?',
        language: 'Kotlin',
        prompt: 'Is Kotlin statically typed or dynamically typed?',
        options: [
          { id: 'A', label: 'Statically typed', isCorrect: true },
          { id: 'B', label: 'Dynamically typed', isCorrect: false },
          { id: 'C', label: 'It has no type system', isCorrect: false },
          { id: 'D', label: 'Only dynamically typed on Android', isCorrect: false }
        ],
        explanation: {
          codeRef: 'Statically typed and null-safe',
          detail: 'Kotlin checks every value\'s type before the program runs (statically typed), which is part of what makes it safer than dynamically typed languages.'
        }
      }
    ]
  },
  mastered: {
    topicTitle: 'What is Kotlin?',
    summary: 'You now know what Kotlin is, who created it, where it runs, and why it\'s considered a modern, safe language.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      {
        title: 'Concept understood',
        subtitle: 'What Kotlin is, its origins, and where it runs'
      },
      {
        title: 'Understanding checked',
        subtitle: '3/3 comprehension questions answered correctly'
      }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// This is where actual code first appears: the program entry point and basic
// syntax. Function mechanics (parameters, return types) are intentionally
// NOT taught here -- that belongs to the Functions world (World 5). Here
// main() is only introduced as "the place execution starts."
export const KOTLIN_SYNTAX_LESSON: FiveStageLesson = {
  id: 'world-1-kotlin-syntax',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Kotlin Syntax & main()',
  learn: {
    title: 'Your Program\'s Entry Point',
    subtitle:
      'Every Kotlin program needs a starting point. That starting point is always main() -- when you run a Kotlin program, this is the first place execution begins.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Your first Kotlin program',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    println("Hello, Kotlin!")',
      '}'
    ],
    explanation: 'Every Kotlin program starts execution inside main() { }. The statements inside its curly braces run one after another, from top to bottom.',
    keyIdeas: [
      {
        number: 1,
        title: 'main() is the entry point',
        description: 'The place where every Kotlin program begins running.'
      },
      {
        number: 2,
        title: 'Statements run top to bottom',
        description: 'Code inside main() executes sequentially, in the order it is written.'
      },
      {
        number: 3,
        title: 'Curly braces { }',
        description: 'Mark the start and end of main()\'s body -- everything between them is what runs.'
      }
    ],
    keyTakeaway: 'Every Kotlin program starts with main() { ... } -- that is where execution begins.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See how a Kotlin program is structured, from its entry point to running statements in order.',
    cards: [
      {
        id: 'card-1',
        number: '01',
        title: 'A minimal Kotlin program',
        language: 'Kotlin',
        subtitle: 'The smallest program Kotlin can run.',
        code: [
          'fun main() {',
          '',
          '}'
        ],
        whatItMeans: [
          { label: 'main', description: 'the special name Kotlin looks for first when a program starts' },
          { label: '()', description: 'required syntax after every entry point name' },
          { label: '{ }', description: 'an empty body -- this program runs and does nothing' }
        ],
        whatChanged: 'We defined the smallest valid Kotlin program: an empty entry point.'
      },
      {
        id: 'card-2',
        number: '02',
        title: 'Printing output',
        language: 'Kotlin',
        subtitle: 'Add a statement so the program actually does something.',
        code: [
          'fun main() {',
          '    println("Hello, Kotlin!")',
          '}'
        ],
        whatItMeans: [
          { label: 'println(...)', description: 'prints text to the console, followed by a new line' },
          { label: '"Hello, Kotlin!"', description: 'a String literal -- text wrapped in double quotes' }
        ],
        whatChanged: 'The program now produces visible output when it runs.'
      },
      {
        id: 'card-3',
        number: '03',
        title: 'Running statements in order',
        language: 'Kotlin',
        subtitle: 'Multiple statements execute top to bottom.',
        code: [
          'fun main() {',
          '    println("First")',
          '    println("Second")',
          '    println("Third")',
          '}'
        ],
        whatItMeans: [
          { label: 'Line order', description: 'Kotlin executes each statement in the order it appears' },
          { label: 'Three println calls', description: 'produce three separate lines of output, in sequence' }
        ],
        whatChanged: 'We saw that a function body can contain multiple statements, executed in order.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-syntax-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Basic Output',
        topicMeta: 'main() and println()',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    println("Kotlin")',
          '}'
        ],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'main', isCorrect: false },
          { id: 'B', label: 'Kotlin', isCorrect: true },
          { id: 'C', label: '"Kotlin"', isCorrect: false },
          { id: 'D', label: 'Nothing', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println("Kotlin")',
          detail: 'println prints the text inside the quotes without the quote marks themselves, so it outputs Kotlin.'
        }
      },
      {
        id: 'pred-syntax-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Statement Order',
        topicMeta: 'Sequential execution',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    println("A")',
          '    println("B")',
          '}'
        ],
        prompt: 'What is printed first?',
        options: [
          { id: 'A', label: 'B', isCorrect: false },
          { id: 'B', label: 'A', isCorrect: true },
          { id: 'C', label: 'Both at the same time', isCorrect: false },
          { id: 'D', label: 'Neither -- this is a compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println("A")',
          detail: 'Kotlin executes statements top to bottom, so the first println call runs before the second.'
        }
      },
      {
        id: 'pred-syntax-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Empty Function Body',
        topicMeta: 'main() structure',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '',
          '}'
        ],
        prompt: 'What does this program print when it runs?',
        options: [
          { id: 'A', label: 'An empty line', isCorrect: false },
          { id: 'B', label: 'Nothing', isCorrect: true },
          { id: 'C', label: 'main', isCorrect: false },
          { id: 'D', label: 'It fails to compile', isCorrect: false }
        ],
        explanation: {
          codeRef: 'fun main() { }',
          detail: 'A valid Kotlin program with an empty main() body runs successfully but produces no output, since there is no println statement.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 10,
    title: 'Print a Welcome Message',
    description:
      'Write your first console output program.\n\n' +
      '1. Inside the main() function, use println() to print the exact message "Welcome to Kotlin!".',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'solution.kt',
    initialCode: `fun main() {
    // 1. Print "Welcome to Kotlin!" using println:
}`,
    solutionCode: 'fun main() {\n    println("Welcome to Kotlin!")\n}',
    sampleInput: 'main()',
    expectedOutput: 'Welcome to Kotlin!',
    // No testCase.call here: kotlinRunner.ts already auto-invokes main() once
    // whenever it's present. Re-calling it via testCase (as FUNCTIONS_LESSON
    // does for a non-main function like multiply(4, 5)) would run main() a
    // second time, doubling the printed output and permanently failing the
    // expectedOutput match even for correct code.
    testCase: {
      call: '',
      expected: 'Welcome to Kotlin!'
    }
  },
  debug: {
    title: 'Diagnose the Broken Program',
    subtitle: 'Inspect the program, find why it fails to compile, and fix it.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Syntax Error: Unterminated String',
    brokenCode: `fun main() {
    println("Hello, Kotlin!)
}`,
    fixedCode: `fun main() {
    println("Hello, Kotlin!")
}`,
    expectedOutput: 'Hello, Kotlin!',
    hints: [
      'Something is wrong with the text being printed.',
      'Look closely at the quotation marks around the message.',
      'The closing double quote (") is missing after "Hello, Kotlin!" -- add it back.'
    ],
    explanation: 'String literals must start and end with a double quote. The broken code was missing the closing quote after "Hello, Kotlin!", so the compiler could not tell where the text ends -- causing a syntax error.'
  },
  mastered: {
    topicTitle: 'Kotlin Syntax & main()',
    summary: 'You have learned how a Kotlin program starts at main(), and how statements run one after another.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      {
        title: 'Concept understood',
        subtitle: 'How main() starts a program and runs top to bottom'
      },
      {
        title: 'Examples explored',
        subtitle: '3 progressive program-structure examples'
      },
      {
        title: 'Predictions completed',
        subtitle: '3/3 correct output forecasts'
      },
      {
        title: 'Code written & executed',
        subtitle: '1 practical runtime test passed'
      },
      {
        title: 'Bugs diagnosed & repaired',
        subtitle: 'Resolved unterminated string syntax error & verified execution'
      }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

import {
  COMMENTS_LESSON,
  PRINT_PRINTLN_LESSON,
  VAL_VS_VAR_LESSON,
  VARIABLES_TYPE_INFERENCE_LESSON,
  INT_LONG_LESSON,
  FLOAT_DOUBLE_LESSON,
  BOOLEAN_LESSON,
  CHAR_LESSON,
  STRING_LESSON,
  STRING_TEMPLATES_LESSON,
  WORLD_1_BOSS_LESSON,
} from './curriculum/world1LessonsData';

import {
  ARITHMETIC_OPERATORS_LESSON,
  COMPARISON_OPERATORS_LESSON,
  LOGICAL_OPERATORS_LESSON,
  ASSIGNMENT_OPERATORS_LESSON,
  INCREMENT_DECREMENT_LESSON,
  OPERATOR_PRECEDENCE_LESSON,
  WORLD_2_BOSS_LESSON,
} from './curriculum/world2LessonsData';

import {
  IF_LESSON,
  IF_ELSE_LESSON,
  ELSE_IF_LESSON,
  WHEN_LESSON,
  WHEN_WITH_RANGES_LESSON,
  WHEN_AS_EXPRESSION_LESSON,
  MULTIPLE_NESTED_CONDITIONS_LESSON,
  TYPE_CHECKS_IS_LESSON,
  WORLD_3_BOSS_LESSON,
} from './curriculum/world3LessonsData';

import {
  FOR_LESSON,
  WHILE_LESSON,
  DO_WHILE_LESSON,
  RANGES_LESSON,
  PROGRESSIONS_LESSON,
  DOWNTO_LESSON,
  STEP_LESSON,
  BREAK_LESSON,
  CONTINUE_LESSON,
  NESTED_LOOPS_LESSON,
  WORLD_4_BOSS_LESSON,
} from './curriculum/world4LessonsData';

import {
  DEFINING_FUNCTIONS_LESSON,
  FUNCTION_PARAMETERS_LESSON,
  RETURN_VALUES_LESSON,
  DEFAULT_PARAMETERS_LESSON,
  NAMED_ARGUMENTS_LESSON,
  SINGLE_EXPRESSION_FUNCTIONS_LESSON,
  LOCAL_FUNCTIONS_LESSON,
  VARARG_LESSON,
  WORLD_5_BOSS_LESSON,
} from './curriculum/world5LessonsData';

import { ARRAYS_LESSON, LISTS_LESSON, SETS_LESSON, MAPS_LESSON, MUTABLE_VS_READONLY_LESSON, CREATING_ACCESSING_COLLECTIONS_LESSON, ADDING_REMOVING_UPDATING_LESSON, ITERATING_COLLECTIONS_LESSON, BASIC_COLLECTION_OPERATIONS_LESSON, CHOOSING_COLLECTION_TYPE_LESSON, WORLD_6_BOSS_LESSON } from './curriculum/world6LessonsData';
import { NULLABLE_TYPES_LESSON, NULLABLE_VARIABLES_LESSON, SAFE_CALL_LESSON, ELVIS_OPERATOR_LESSON, NON_NULL_ASSERTION_LESSON, NULL_CHECKS_LESSON, SMART_CASTS_LESSON, SAFE_CASTS_LESSON, NULLABLE_COLLECTIONS_LESSON, CHAINING_NULLABLE_OPERATIONS_LESSON, WORLD_7_BOSS_LESSON } from './curriculum/world7LessonsData';
import { CLASSES_LESSON, OBJECTS_LESSON, PROPERTIES_LESSON, METHODS_LESSON, CONSTRUCTORS_LESSON, PRIMARY_CONSTRUCTORS_LESSON, INIT_LESSON, VISIBILITY_MODIFIERS_LESSON, DATA_CLASSES_LESSON, ENUMS_LESSON, BASIC_INHERITANCE_LESSON, INTERFACES_LESSON, OVERRIDING_MEMBERS_LESSON, WORLD_8_BOSS_LESSON } from './curriculum/world8LessonsData';

export const AVAILABLE_FIVE_STAGE_LESSONS: Record<string, FiveStageLesson> = {
  variables: VARIABLES_LESSON,
  functions: FUNCTIONS_LESSON,
  loops: LOOPS_LESSON,
  // World 1 - Kotlin Awakening (13 lessons)
  'what-is-kotlin': WHAT_IS_KOTLIN_LESSON,
  'world-1-what-is-kotlin': WHAT_IS_KOTLIN_LESSON,
  'kotlin-syntax': KOTLIN_SYNTAX_LESSON,
  'world-1-kotlin-syntax': KOTLIN_SYNTAX_LESSON,
  comments: COMMENTS_LESSON,
  'world-1-comments': COMMENTS_LESSON,
  'print-println': PRINT_PRINTLN_LESSON,
  'world-1-print-println': PRINT_PRINTLN_LESSON,
  'val-vs-var': VAL_VS_VAR_LESSON,
  'world-1-val-vs-var': VAL_VS_VAR_LESSON,
  'variables-type-inference': VARIABLES_TYPE_INFERENCE_LESSON,
  'world-1-variables-type-inference': VARIABLES_TYPE_INFERENCE_LESSON,
  'int-long': INT_LONG_LESSON,
  'world-1-int-long': INT_LONG_LESSON,
  'float-double': FLOAT_DOUBLE_LESSON,
  'world-1-float-double': FLOAT_DOUBLE_LESSON,
  boolean: BOOLEAN_LESSON,
  'world-1-boolean': BOOLEAN_LESSON,
  char: CHAR_LESSON,
  'world-1-char': CHAR_LESSON,
  string: STRING_LESSON,
  'world-1-string': STRING_LESSON,
  'string-templates': STRING_TEMPLATES_LESSON,
  'world-1-string-templates': STRING_TEMPLATES_LESSON,
  'world-1-boss': WORLD_1_BOSS_LESSON,
  // World 2 - Operator Forge (7 lessons)
  'arithmetic-operators': ARITHMETIC_OPERATORS_LESSON,
  'world-2-arithmetic-operators': ARITHMETIC_OPERATORS_LESSON,
  'comparison-operators': COMPARISON_OPERATORS_LESSON,
  'world-2-comparison-operators': COMPARISON_OPERATORS_LESSON,
  'logical-operators': LOGICAL_OPERATORS_LESSON,
  'world-2-logical-operators': LOGICAL_OPERATORS_LESSON,
  'assignment-operators': ASSIGNMENT_OPERATORS_LESSON,
  'world-2-assignment-operators': ASSIGNMENT_OPERATORS_LESSON,
  'increment-decrement': INCREMENT_DECREMENT_LESSON,
  'world-2-increment-decrement': INCREMENT_DECREMENT_LESSON,
  'operator-precedence': OPERATOR_PRECEDENCE_LESSON,
  'world-2-operator-precedence': OPERATOR_PRECEDENCE_LESSON,
  'world-2-boss': WORLD_2_BOSS_LESSON,
  // World 3 - Decision Maker (9 lessons)
  'world-3-if': IF_LESSON,
  'world-3-if-else': IF_ELSE_LESSON,
  'world-3-else-if': ELSE_IF_LESSON,
  'world-3-when': WHEN_LESSON,
  'world-3-when-with-ranges': WHEN_WITH_RANGES_LESSON,
  'world-3-when-as-an-expression': WHEN_AS_EXPRESSION_LESSON,
  'world-3-multiple-conditions-and-nested-condition': MULTIPLE_NESTED_CONDITIONS_LESSON,
  'world-3-type-checks-with-is-where-appropriate': TYPE_CHECKS_IS_LESSON,
  'world-3-boss': WORLD_3_BOSS_LESSON,
  // World 4 - Loop Master (11 lessons)
  'world-4-for': FOR_LESSON,
  'world-4-while': WHILE_LESSON,
  'world-4-do-while': DO_WHILE_LESSON,
  'world-4-ranges': RANGES_LESSON,
  'world-4-progressions': PROGRESSIONS_LESSON,
  'world-4-downto': DOWNTO_LESSON,
  'world-4-step': STEP_LESSON,
  'world-4-break': BREAK_LESSON,
  'world-4-continue': CONTINUE_LESSON,
  'world-4-nested-loops': NESTED_LOOPS_LESSON,
  'world-4-boss': WORLD_4_BOSS_LESSON,
  // World 5 - Function Forge (9 lessons)
  'world-5-defining-functions': DEFINING_FUNCTIONS_LESSON,
  'world-5-function-parameters': FUNCTION_PARAMETERS_LESSON,
  'world-5-return-values': RETURN_VALUES_LESSON,
  'world-5-default-parameters': DEFAULT_PARAMETERS_LESSON,
  'world-5-named-arguments': NAMED_ARGUMENTS_LESSON,
  'world-5-single-expression-functions': SINGLE_EXPRESSION_FUNCTIONS_LESSON,
  'world-5-local-functions': LOCAL_FUNCTIONS_LESSON,
  'world-5-vararg': VARARG_LESSON,
  'world-5-boss': WORLD_5_BOSS_LESSON,
  // World 6 - Collection Valley
  'world-6-arrays': ARRAYS_LESSON,
  'world-6-lists': LISTS_LESSON,
  'world-6-sets': SETS_LESSON,
  'world-6-maps': MAPS_LESSON,
  'world-6-mutable-vs-read-only-collections': MUTABLE_VS_READONLY_LESSON,
  'world-6-creating-and-accessing-collections': CREATING_ACCESSING_COLLECTIONS_LESSON,
  'world-6-adding-removing-updating-mutable-element': ADDING_REMOVING_UPDATING_LESSON,
  'world-6-iterating-over-collections': ITERATING_COLLECTIONS_LESSON,
  'world-6-basic-collection-operations': BASIC_COLLECTION_OPERATIONS_LESSON,
  'world-6-choosing-the-right-collection-type': CHOOSING_COLLECTION_TYPE_LESSON,
  'world-6-boss': WORLD_6_BOSS_LESSON,
  // World 7 - Null Safety Shield
  'world-7-nullable-types': NULLABLE_TYPES_LESSON,
  'world-7-nullable-variables': NULLABLE_VARIABLES_LESSON,
  'world-7-safe-call': SAFE_CALL_LESSON,
  'world-7-elvis-operator': ELVIS_OPERATOR_LESSON,
  'world-7-non-null-assertion': NON_NULL_ASSERTION_LESSON,
  'world-7-null-checks': NULL_CHECKS_LESSON,
  'world-7-smart-casts': SMART_CASTS_LESSON,
  'world-7-safe-casts-as': SAFE_CASTS_LESSON,
  'world-7-nullable-collections-and-collection-valu': NULLABLE_COLLECTIONS_LESSON,
  'world-7-chaining-nullable-operations': CHAINING_NULLABLE_OPERATIONS_LESSON,
  'world-7-boss': WORLD_7_BOSS_LESSON,
  // World 8 - Object Kingdom
  'world-8-classes': CLASSES_LESSON,
  'world-8-objects': OBJECTS_LESSON,
  'world-8-properties': PROPERTIES_LESSON,
  'world-8-methods': METHODS_LESSON,
  'world-8-constructors': CONSTRUCTORS_LESSON,
  'world-8-primary-constructors': PRIMARY_CONSTRUCTORS_LESSON,
  'world-8-init': INIT_LESSON,
  'world-8-visibility-modifiers': VISIBILITY_MODIFIERS_LESSON,
  'world-8-data-classes': DATA_CLASSES_LESSON,
  'world-8-enums': ENUMS_LESSON,
  'world-8-basic-inheritance': BASIC_INHERITANCE_LESSON,
  'world-8-interfaces': INTERFACES_LESSON,
  'world-8-overriding-members': OVERRIDING_MEMBERS_LESSON,
  'world-8-boss': WORLD_8_BOSS_LESSON,
};
