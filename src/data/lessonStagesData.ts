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
  language: string;
  code: string[];
  prompt: string;
  options: PredictOption[];
  explanation: {
    codeRef: string;
    detail: string;
  };
}

export interface Stage3PredictData {
  title: string;
  subtitle: string;
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

export interface Stage5MasteredData {
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

export interface FiveStageLesson {
  id: string;
  worldId: string;
  worldName: string;
  stageName: string;
  topicTitle: string;
  learn: Stage1LearnData;
  explore: Stage2ExploreData;
  predict: Stage3PredictData;
  writeRun: Stage4WriteRunData;
  mastered: Stage5MasteredData;
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
        topicMeta: 'Parameters & Templates',
        language: 'Kotlin',
        code: [
          'fun welcome(user: String) {',
          '    println("Welcome, $user")',
          '}',
          '',
          'welcome("Dev")'
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
      }
    ]
  },
  writeRun: {
    challengeNumber: 3,
    totalChallenges: 5,
    xpReward: 10,
    title: 'Multiply Two Numbers',
    description: 'Write a function called multiply that receives two Int values and returns their product.',
    requirements: {
      name: 'multiply',
      params: 'a: Int, b: Int',
      returns: 'Int'
    },
    fileName: 'solution.kt',
    initialCode: 'fun multiply(a: Int, b: Int): Int {\n    return a * b\n}',
    solutionCode: 'fun multiply(a: Int, b: Int): Int {\n    return a * b\n}',
    sampleInput: 'multiply(4, 5)',
    expectedOutput: '20',
    testCase: {
      call: 'multiply(4, 5)',
      expected: '20'
    }
  },
  mastered: {
    topicTitle: 'Kotlin Functions',
    summary: 'You have successfully mastered function syntax, parameters, return values, and invoked structured code flow.',
    passedCount: '4 / 4 PASSED',
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
      }
    ],
    xpEarned: 50,
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
      }
    ]
  },
  writeRun: {
    challengeNumber: 2,
    totalChallenges: 5,
    xpReward: 10,
    title: 'Sum of Numbers in Range',
    description: 'Write a function called sumRange that receives a max value and returns the sum of all integers from 1 up to max.',
    requirements: {
      name: 'sumRange',
      params: 'max: Int',
      returns: 'Int'
    },
    fileName: 'loop_solution.kt',
    initialCode: 'fun sumRange(max: Int): Int {\n    var sum = 0\n    for (i in 1..max) {\n        sum += i\n    }\n    return sum\n}',
    solutionCode: 'fun sumRange(max: Int): Int {\n    var sum = 0\n    for (i in 1..max) {\n        sum += i\n    }\n    return sum\n}',
    sampleInput: 'sumRange(4)',
    expectedOutput: '10',
    testCase: {
      call: 'sumRange(4)',
      expected: '10'
    }
  },
  mastered: {
    topicTitle: 'Kotlin Loops',
    summary: 'You have mastered iteration mechanics, range bounds, step modifiers, and break controls.',
    passedCount: '4 / 4 PASSED',
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
      }
    ],
    xpEarned: 50,
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
    title: 'Variables: The Spectrum',
    subtitle: '5 Progressive Examples • Step 2 of 5',
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
    subtitle: 'Output Forecasting • Step 3 of 5',
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        totalQuestions: 1,
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
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 50,
    title: 'Player Inventory Summary',
    description:
      'Declare a read-only player name with val, and a mutable coin count with var. Increment coins by 15 and print the summary.',
    requirements: {
      name: 'calculatePlayerInventory',
      params: 'val player: String, var coins: Int',
      returns: 'String -> "Player Alex holds 40 coins"'
    },
    fileName: 'Main.kt',
    initialCode: `fun main() {
    // 1. Declare immutable player name "Alex":
    val player = "Alex"
    
    // 2. Declare mutable coins starting at 25:
    var coins = 25
    
    // 3. Add 15 coins to the inventory:
    coins += 15
    
    // 4. Print the formatted inventory:
    println("Player $player holds $coins coins")
}`,
    solutionCode: `fun main() {
    val player = "Alex"
    var coins = 25
    coins += 15
    println("Player $player holds $coins coins")
}`,
    sampleInput: 'Initial: player="Alex", coins=25',
    expectedOutput: 'Player Alex holds 40 coins',
    testCase: {
      call: 'calculatePlayerInventory("Alex", 25)',
      expected: 'Player Alex holds 40 coins'
    }
  },
  mastered: {
    topicTitle: 'Variables & Immutability',
    summary:
      'You have mastered Kotlin variable declarations, the core distinction between val and var, type inference, and string template interpolation.',
    passedCount: '4/4',
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
      }
    ],
    xpEarned: 50,
    streakDays: 12,
    accuracy: '100%'
  }
};

export const AVAILABLE_FIVE_STAGE_LESSONS: Record<string, FiveStageLesson> = {
  variables: VARIABLES_LESSON,
  functions: FUNCTIONS_LESSON,
  loops: LOOPS_LESSON
};
