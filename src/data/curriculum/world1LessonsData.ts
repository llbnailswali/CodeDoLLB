import { FiveStageLesson } from '../lessonStagesData';

// =========================================================================
// LESSON 1: What is Kotlin? (world-1-what-is-kotlin)
// =========================================================================
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

// =========================================================================
// LESSON 2: Kotlin Syntax & main() (world-1-kotlin-syntax)
// =========================================================================
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
    // whenever it's present. Re-calling it via testCase (as a non-main
    // function's testCase.call would, e.g. multiply(4, 5)) would run main()
    // a second time, doubling the printed output and permanently failing
    // the expectedOutput match even for correct code.
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

// =========================================================================
// LESSON 3: Comments (world-1-comments)
// =========================================================================
export const COMMENTS_LESSON: FiveStageLesson = {
  id: 'world-1-comments',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Comments',
  learn: {
    title: 'Notes for Humans',
    subtitle:
      'Comments allow you to write human-readable notes, explanations, or temporarily disable lines of code. The Kotlin compiler ignores comments completely when running your program.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Single-line & Multi-line Comments',
    language: 'Kotlin',
    codeSnippet: [
      '// This is a single-line comment',
      'val hero = "Kotlin" // Note at the end of a line',
      '',
      '/*',
      '  This is a multi-line comment.',
      '  Everything inside is skipped by the compiler.',
      '*/',
      'println(hero)'
    ],
    explanation: 'Single-line comments start with `//`. Multi-line comments are wrapped between `/*` and `*/`. None of them affect program execution.',
    keyIdeas: [
      {
        number: 1,
        title: 'Single-line comments //',
        description: 'Starts with // and extends to the end of the current line.'
      },
      {
        number: 2,
        title: 'Multi-line comments /* */',
        description: 'Wraps across multiple lines between opening /* and closing */.'
      },
      {
        number: 3,
        title: 'Compiler skips them',
        description: 'Comments take zero memory and have zero effect on program speed or output.'
      }
    ],
    keyTakeaway: 'Comments are ignored by the compiler -- use them to explain tricky logic and keep notes.'
  },
  explore: {
    title: 'Explore Comments',
    subtitle: 'See how single-line and multi-line comments work in practice.',
    cards: [
      {
        id: 'card-comments-1',
        number: '01',
        title: 'Single-line comment',
        language: 'Kotlin',
        subtitle: 'Add a note above or beside code.',
        code: [
          '// Calculate total points',
          'val score = 100',
          'println(score) // Prints 100'
        ],
        whatItMeans: [
          { label: '//', description: 'Everything following on that line is ignored' },
          { label: 'Inline note', description: 'Can be placed right after code on the same line' }
        ],
        whatChanged: 'We documented what the code does without altering its behavior.'
      },
      {
        id: 'card-comments-2',
        number: '02',
        title: 'Multi-line block comment',
        language: 'Kotlin',
        subtitle: 'Span multiple lines of explanation.',
        code: [
          '/*',
          '  Author: JetBrains',
          '  Goal: Welcome learner',
          '*/',
          'println("Ready!")'
        ],
        whatItMeans: [
          { label: '/*', description: 'Starts a multi-line comment block' },
          { label: '*/', description: 'Closes the multi-line comment block' }
        ],
        whatChanged: 'We added a multi-line header without needing // on every line.'
      },
      {
        id: 'card-comments-3',
        number: '03',
        title: 'Commenting out code',
        language: 'Kotlin',
        subtitle: 'Temporarily disable a statement.',
        code: [
          'val health = 100',
          '// println("Debug: health is $health")',
          'println("Game start!")'
        ],
        whatItMeans: [
          { label: 'Disabled line', description: 'The debug statement is not executed' },
          { label: 'Active line', description: 'Only "Game start!" will print' }
        ],
        whatChanged: 'We disabled a line of code without deleting it.'
      },
      {
        id: 'card-comments-4',
        number: '04',
        title: '// inside a string is not a comment',
        language: 'Kotlin',
        subtitle: 'Comment markers lose their meaning inside quotes.',
        code: [
          'val website = "Visit http://example.com for docs"',
          'println(website)'
        ],
        whatItMeans: [
          { label: '// inside "..."', description: 'The // in http:// is just literal text here, not the start of a comment' }
        ],
        whatChanged: 'Showed that // only starts a comment outside of a string literal.'
      }
    ]
  },
  predict: {
    title: 'Predict Output with Comments',
    subtitle: 'Determine what will be printed when comments are present.',
    questions: [
      {
        id: 'pred-comments-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Inline Comment',
        topicMeta: 'Comments',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    // println("A")',
          '    println("B") // println("C")',
          '}'
        ],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'A and B', isCorrect: false },
          { id: 'B', label: 'B', isCorrect: true },
          { id: 'C', label: 'B and C', isCorrect: false },
          { id: 'D', label: 'A, B, and C', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println("B") // println("C")',
          detail: 'Line 2 is commented out. On line 3, println("B") runs, but // println("C") is treated as a comment and ignored.'
        }
      },
      {
        id: 'pred-comments-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Block Comment',
        topicMeta: 'Multi-line comments',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    /* println("One")',
          '       println("Two") */',
          '    println("Three")',
          '}'
        ],
        prompt: 'Which number is printed?',
        options: [
          { id: 'A', label: 'One', isCorrect: false },
          { id: 'B', label: 'Two', isCorrect: false },
          { id: 'C', label: 'Three', isCorrect: true },
          { id: 'D', label: 'All three', isCorrect: false }
        ],
        explanation: {
          codeRef: '/* ... */',
          detail: 'Everything between /* and */ is skipped. Only println("Three") executes.'
        }
      },
      {
        id: 'pred-comments-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Comment inside quotes',
        topicMeta: 'Strings vs comments',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    println("// Not a comment")',
          '}'
        ],
        prompt: 'What happens when // is inside quotes?',
        options: [
          { id: 'A', label: 'Prints: // Not a comment', isCorrect: true },
          { id: 'B', label: 'Prints nothing', isCorrect: false },
          { id: 'C', label: 'Compiler error', isCorrect: false },
          { id: 'D', label: 'Prints: Not a comment', isCorrect: false }
        ],
        explanation: {
          codeRef: '"// Not a comment"',
          detail: 'Inside a string literal between double quotes, // is literal text, not a comment.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Comment Out the Extra Line',
    description:
      'An unwanted line is printing alongside the real message.\n\n' +
      '1. Comment out the unwanted line using //.\n\n' +
      '2. Ensure only "Mission Ready!" prints to the console.',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'CommentsChallenge.kt',
    initialCode: `fun main() {
    // 1. Comment out the unwanted println statement using //:
    println("Not part of the final output")
    println("Mission Ready!")
}`,
    solutionCode: `fun main() {
    // println("Not part of the final output")
    println("Mission Ready!")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Mission Ready!',
    testCase: {
      call: '',
      expected: 'Mission Ready!'
    }
  },
  debug: {
    title: 'Fix the Unclosed Comment',
    subtitle: 'Find why the compiler fails to parse this program.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Syntax Error: Unclosed Block Comment',
    brokenCode: `fun main() {
    /* Set up user greeting
    println("Welcome to CodeDo!")
}`,
    fixedCode: `fun main() {
    /* Set up user greeting */
    println("Welcome to CodeDo!")
}`,
    expectedOutput: 'Welcome to CodeDo!',
    hints: [
      'The block comment was opened but never closed.',
      'Look for the missing */ delimiter.',
      'Close the comment with */ before println("Welcome to CodeDo!").'
    ],
    explanation: 'Multi-line comments opened with /* must always be closed with */. Without the closing marker, the compiler considers the rest of the file part of the comment.'
  },
  mastered: {
    topicTitle: 'Comments',
    summary: 'You mastered Kotlin comments: single-line //, block comments /* */, and how the compiler skips them.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Single-line comments', subtitle: 'Learned // syntax for fast inline notes' },
      { title: 'Multi-line comments', subtitle: 'Learned /* */ for multiline documentation' },
      { title: 'Debugging with comments', subtitle: 'Learned to temporarily disable code without deletion' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 4: print() and println() (world-1-print-println)
// =========================================================================
export const PRINT_PRINTLN_LESSON: FiveStageLesson = {
  id: 'world-1-print-println',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'print() and println()',
  learn: {
    title: 'Writing to the Console',
    subtitle:
      'Kotlin provides two primary functions for printing text to the console: print() and println(). The difference is simple: print() stays on the same line, while println() drops down to a new line after printing.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Line Breaks in Output',
    language: 'Kotlin',
    codeSnippet: [
      'print("Loading ")',
      'print("...")',
      'println() // Empty newline',
      'println("Done!")'
    ],
    explanation: '`print()` leaves the cursor right where it finished. `println()` adds a line break so subsequent output starts on a fresh line.',
    keyIdeas: [
      {
        number: 1,
        title: 'print() stays on the line',
        description: 'Subsequent calls continue right after the last character.'
      },
      {
        number: 2,
        title: 'println() adds a newline',
        description: 'Outputs the text and then moves the cursor to the beginning of the next line.'
      },
      {
        number: 3,
        title: 'println() with no arguments',
        description: 'Calling println() alone just prints a blank line.'
      }
    ],
    keyTakeaway: 'Use print() when assembling text piece by piece; use println() when each message belongs on its own line.'
  },
  explore: {
    title: 'Explore print() vs println()',
    subtitle: 'See how different combinations format output.',
    cards: [
      {
        id: 'card-print-1',
        number: '01',
        title: 'Sequential println calls',
        language: 'Kotlin',
        subtitle: 'Each message gets its own line.',
        code: [
          'println("Hello")',
          'println("World")'
        ],
        whatItMeans: [
          { label: 'Line 1', description: 'Outputs "Hello" and moves down' },
          { label: 'Line 2', description: 'Outputs "World" on the next line' }
        ],
        whatChanged: 'Produces two distinct lines in the console.'
      },
      {
        id: 'card-print-2',
        number: '02',
        title: 'Sequential print calls',
        language: 'Kotlin',
        subtitle: 'Glues pieces together on one line.',
        code: [
          'print("A")',
          'print("B")',
          'print("C")'
        ],
        whatItMeans: [
          { label: 'Single line', description: 'Outputs "ABC" with no line breaks between them' }
        ],
        whatChanged: 'All three calls output on the exact same line.'
      },
      {
        id: 'card-print-3',
        number: '03',
        title: 'Mixing print and println',
        language: 'Kotlin',
        subtitle: 'Build a sentence then terminate it.',
        code: [
          'print("Count: ")',
          'println(42)'
        ],
        whatItMeans: [
          { label: 'print("Count: ")', description: 'Prints "Count: " and waits' },
          { label: 'println(42)', description: 'Prints 42 on the same line, then breaks to a new line' }
        ],
        whatChanged: 'Produces "Count: 42" cleanly on a single line.'
      },
      {
        id: 'card-print-4',
        number: '04',
        title: 'Empty println() for a blank line',
        language: 'Kotlin',
        subtitle: 'Calling println() with no arguments still moves to a new line.',
        code: [
          'println("Hi")',
          'println()',
          'println("Bye")'
        ],
        whatItMeans: [
          { label: 'println()', description: 'Prints nothing but still ends the current line, inserting a blank line between "Hi" and "Bye"' }
        ],
        whatChanged: 'Inserted a visible blank line by calling println() with no arguments.'
      }
    ]
  },
  predict: {
    title: 'Predict Console Output',
    subtitle: 'Forecast whether lines stay together or split apart.',
    questions: [
      {
        id: 'pred-print-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'print then println',
        topicMeta: 'print vs println',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    print("Kotlin ")',
          '    println("Awakening")',
          '}'
        ],
        prompt: 'How will this appear in the console?',
        options: [
          { id: 'A', label: 'Kotlin Awakening (on 1 line)', isCorrect: true },
          { id: 'B', label: 'Kotlin\\nAwakening (on 2 lines)', isCorrect: false },
          { id: 'C', label: '"Kotlin Awakening"', isCorrect: false },
          { id: 'D', label: 'Awakening Kotlin', isCorrect: false }
        ],
        explanation: {
          codeRef: 'print("Kotlin ")',
          detail: 'print() does not append a newline, so "Awakening" from println joins right next to it.'
        }
      },
      {
        id: 'pred-print-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'println then print',
        topicMeta: 'Newline order',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    println("First")',
          '    print("Second")',
          '}'
        ],
        prompt: 'Where does "Second" appear?',
        options: [
          { id: 'A', label: 'On the line below "First"', isCorrect: true },
          { id: 'B', label: 'Directly attached to "First"', isCorrect: false },
          { id: 'C', label: 'Replaces "First"', isCorrect: false },
          { id: 'D', label: 'Never prints', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println("First")',
          detail: 'println("First") moves the cursor to the next line, so "Second" starts on a fresh line.'
        }
      },
      {
        id: 'pred-print-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Empty println()',
        topicMeta: 'Blank lines',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    println("Hi")',
          '    println()',
          '    println("Bye")',
          '}'
        ],
        prompt: 'What does the empty println() do?',
        options: [
          { id: 'A', label: 'Inserts an empty blank line between Hi and Bye', isCorrect: true },
          { id: 'B', label: 'Causes a compiler error', isCorrect: false },
          { id: 'C', label: 'Prints the text "null"', isCorrect: false },
          { id: 'D', label: 'Does nothing at all', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println()',
          detail: 'Calling println() without arguments outputs a blank newline.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Format a Status Banner',
    description:
      'Format and display a status indicator.\n\n' +
      '1. Use print() to output "Status:".\n\n' +
      '2. Use println() to output "ACTIVE" so they appear together as "Status:ACTIVE".',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'StatusBanner.kt',
    initialCode: `fun main() {
    // 1. Print "Status:" without a newline:

    // 2. Print "ACTIVE" on the same line using println():
}`,
    solutionCode: `fun main() {
    print("Status:")
    println("ACTIVE")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Status:ACTIVE',
    testCase: {
      call: '',
      expected: 'Status:ACTIVE'
    }
  },
  debug: {
    title: 'Fix the Broken Score Line',
    subtitle: 'The label and score should appear together on one line, but they are printing separately -- identify why, and fix the calls.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: println() Ends the Line Too Early',
    brokenCode: `fun main() {
    // BUG: println() starts a new line before the score can join it!
    println("Score:")
    print(95)
}`,
    fixedCode: `fun main() {
    print("Score:")
    println(95)
}`,
    expectedOutput: 'Score:95',
    hints: [
      'Compare the two calls used here -- one of them ends the current line before the next value is printed.',
      'println("Score:") immediately starts a new line, so 95 always lands on its own separate line instead of joining "Score:".',
      'Swap which call keeps the line open: use print() for "Score:" and println() for 95.'
    ],
    explanation: 'println() always ends the current line with a newline, while print() leaves the line open for whatever prints next. Because the label used println(), the score was pushed to its own line no matter what printed it. Swapping to print("Score:") followed by println(95) keeps both values on the same line: Score:95.'
  },
  mastered: {
    topicTitle: 'print() and println()',
    summary: 'You mastered console output in Kotlin: staying on the same line with print() and creating new lines with println().',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'print() behavior', subtitle: 'Learned that print() stays on the active line' },
      { title: 'println() behavior', subtitle: 'Learned that println() adds a newline' },
      { title: 'Output formatting', subtitle: 'Learned to combine both for clean terminal output' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 5: val vs var (world-1-val-vs-var)
// =========================================================================
export const VAL_VS_VAR_LESSON: FiveStageLesson = {
  id: 'world-1-val-vs-var',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'val vs var',
  learn: {
    title: 'Immutable val vs Mutable var',
    subtitle:
      'In Kotlin, every variable is declared with either `val` or `var`. Use `val` for values that never change (read-only), and `var` for values that need to be reassigned later. Idiomatic Kotlin favors `val` by default for safety.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'val (locked) vs var (changeable)',
    language: 'Kotlin',
    codeSnippet: [
      'val birthYear = 2000 // Cannot be changed',
      'var currentAge = 24  // Can be updated',
      '',
      'currentAge = 25      // Valid reassignment',
      '// birthYear = 2001  // COMPILE ERROR: Val cannot be reassigned',
      'println(currentAge)'
    ],
    explanation: '`val` creates an immutable reference -- once assigned, it cannot point to anything else. `var` creates a mutable reference that can be reassigned anytime.',
    keyIdeas: [
      {
        number: 1,
        title: 'val is read-only (immutable)',
        description: 'Assigned once and locked forever. Safe from accidental changes.'
      },
      {
        number: 2,
        title: 'var is mutable',
        description: 'Can be reassigned new values as the program runs.'
      },
      {
        number: 3,
        title: 'Default to val',
        description: 'Idiomatic Kotlin code favors val by default, switching to var only when reassignment is genuinely required.'
      }
    ],
    keyTakeaway: 'Use val by default. Only switch to var when you know a value must change.'
  },
  explore: {
    title: 'Explore val vs var',
    subtitle: 'Examine how Kotlin enforces immutability at compile time.',
    cards: [
      {
        id: 'card-valvar-1',
        number: '01',
        title: 'Declaring with val',
        language: 'Kotlin',
        subtitle: 'A fixed constant value.',
        code: [
          'val pi = 3.14159',
          'println(pi)'
        ],
        whatItMeans: [
          { label: 'val', description: 'Locks the identifier "pi"' },
          { label: 'Value', description: '3.14159 is stored and cannot be overwritten' }
        ],
        whatChanged: 'We established a safe, unmodifiable reference.'
      },
      {
        id: 'card-valvar-2',
        number: '02',
        title: 'Reassigning a var',
        language: 'Kotlin',
        subtitle: 'Updating state over time.',
        code: [
          'var coins = 10',
          'coins = 15',
          'println(coins)'
        ],
        whatItMeans: [
          { label: 'var coins', description: 'Declared as mutable with initial value 10' },
          { label: 'coins = 15', description: 'Overwrites the previous value with 15' }
        ],
        whatChanged: 'The variable smoothly accepted a new value.'
      },
      {
        id: 'card-valvar-3',
        number: '03',
        title: 'Val reassignment error',
        language: 'Kotlin',
        subtitle: 'The compiler stops illegal modifications.',
        code: [
          'val id = 101',
          '// id = 102  <-- Val cannot be reassigned',
          'println(id)'
        ],
        whatItMeans: [
          { label: 'Compiler error', description: 'Prevents the code from ever compiling if re-assigned' }
        ],
        whatChanged: 'Kotlin guarantees that val variables cannot be corrupted.'
      }
    ]
  },
  predict: {
    title: 'Predict val and var Behavior',
    subtitle: 'Check if code compiles or what value it holds.',
    questions: [
      {
        id: 'pred-valvar-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Valid Reassignment',
        topicMeta: 'var mutation',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    var score = 10',
          '    score = 20',
          '    println(score)',
          '}'
        ],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: '10', isCorrect: false },
          { id: 'B', label: '20', isCorrect: true },
          { id: 'C', label: '30', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'score = 20',
          detail: 'Since score was declared with var, reassigning it to 20 is completely legal, and 20 is printed.'
        }
      },
      {
        id: 'pred-valvar-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Illegal val Modification',
        topicMeta: 'val immutability',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val level = 1',
          '    level = 2',
          '    println(level)',
          '}'
        ],
        prompt: 'What happens when this runs?',
        options: [
          { id: 'A', label: 'Prints 2', isCorrect: false },
          { id: 'B', label: 'Compile error: Val cannot be reassigned', isCorrect: true },
          { id: 'C', label: 'Prints 1', isCorrect: false },
          { id: 'D', label: 'Runtime exception', isCorrect: false }
        ],
        explanation: {
          codeRef: 'level = 2',
          detail: 'Variables declared with `val` cannot be reassigned. The Kotlin compiler rejects this code before it can run.'
        }
      },
      {
        id: 'pred-valvar-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Choosing between val and var',
        topicMeta: 'Best practices',
        language: 'Kotlin',
        prompt: 'Why does Kotlin encourage using val over var whenever possible?',
        options: [
          { id: 'A', label: 'It makes code safer and prevents accidental mutations', isCorrect: true },
          { id: 'B', label: 'var is deprecated in modern Kotlin', isCorrect: false },
          { id: 'C', label: 'val uses less CPU time on Android', isCorrect: false },
          { id: 'D', label: 'val variables don\'t need a type', isCorrect: false }
        ],
        explanation: {
          codeRef: 'val by default',
          detail: 'Immutability prevents unexpected state bugs and makes programs much easier to reason about and debug.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Update a Game Score',
    description:
      'Declare a mutable variable var score = 50.\n\n' +
      '1. Update score by adding 25 (or setting it to 75).\n\n' +
      '2. Print the updated score to the console.',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'GameScore.kt',
    initialCode: `fun main() {
    var score = 50

    // 1. Update score to 75 (or score += 25):

    // 2. Print the updated score:
}`,
    solutionCode: `fun main() {
    var score = 50
    score = 75
    println(score)
}`,
    sampleInput: 'main()',
    expectedOutput: '75',
    testCase: {
      call: '',
      expected: '75'
    }
  },
  debug: {
    title: 'Fix the val Reassignment Bug',
    subtitle: 'This program tries to update a value, but fails compilation.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Compiler Error: Val cannot be reassigned',
    brokenCode: `fun main() {
    val counter = 0
    counter = 1
    println(counter)
}`,
    fixedCode: `fun main() {
    var counter = 0
    counter = 1
    println(counter)
}`,
    expectedOutput: '1',
    hints: [
      'The variable "counter" needs to be reassigned on line 3.',
      'Variables declared with "val" cannot change their value.',
      'Change "val counter = 0" to "var counter = 0".'
    ],
    explanation: 'Because counter is reassigned to 1 on the next line, it must be declared with `var` instead of `val`.'
  },
  mastered: {
    topicTitle: 'val vs var',
    summary: 'You mastered Kotlin\'s immutability foundation: locked read-only `val` vs reassignable `var`.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'val immutability', subtitle: 'Understood that val locks the variable itself against reassignment (not necessarily the contents of what it holds)' },
      { title: 'var mutability', subtitle: 'Learned how and when to mutate variables' },
      { title: 'Idiomatic Kotlin', subtitle: 'Defaulting to val for safer code' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 6: Variables & Type Inference (world-1-variables-type-inference)
// =========================================================================
export const VARIABLES_TYPE_INFERENCE_LESSON: FiveStageLesson = {
  id: 'world-1-variables-type-inference',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Variables & Type Inference',
  learn: {
    title: 'Type Inference & Explicit Types',
    subtitle:
      'Kotlin is statically typed, but you don\'t have to write the type on every line. The compiler automatically infers the type from the value on the right side. You can also explicitly declare the type using a colon `: Type`.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Inferred vs Explicit Types',
    language: 'Kotlin',
    codeSnippet: [
      'val age = 25             // Inferred as Int',
      'val score: Int = 100     // Explicitly typed as Int',
      'val city = "Tokyo"       // Inferred as String',
      'println(age + score)'
    ],
    explanation: 'Once a variable\'s type is determined (either inferred or explicit), it can never change. A variable holding an Int can never hold a String later.',
    keyIdeas: [
      {
        number: 1,
        title: 'Type Inference',
        description: 'Kotlin figures out the data type from the initial assigned value.'
      },
      {
        number: 2,
        title: 'Explicit Annotation (: Type)',
        description: 'You can optionally specify `: String`, `: Int`, etc., after the variable name.'
      },
      {
        number: 3,
        title: 'Type Safety',
        description: 'A variable\'s type is permanently fixed at compile time.'
      }
    ],
    keyTakeaway: 'Let Kotlin infer the type when it\'s obvious; use explicit types when clarity is needed.'
  },
  explore: {
    title: 'Explore Type Inference',
    subtitle: 'See how Kotlin deduces types and enforces type safety.',
    cards: [
      {
        id: 'card-var-inf-1',
        number: '01',
        title: 'Inferred Int and String',
        language: 'Kotlin',
        subtitle: 'Kotlin knows what you assigned.',
        code: [
          'val count = 42',
          'val name = "Alex"',
          'println(name)'
        ],
        whatItMeans: [
          { label: 'count', description: 'Inferred as Int from 42' },
          { label: 'name', description: 'Inferred as String from "Alex"' }
        ],
        whatChanged: 'No boilerplate type declarations needed.'
      },
      {
        id: 'card-var-inf-2',
        number: '02',
        title: 'Explicit type annotation',
        language: 'Kotlin',
        subtitle: 'Declare the type clearly using a colon.',
        code: [
          'val greeting: String = "Hello"',
          'val level: Int = 5',
          'println(greeting)'
        ],
        whatItMeans: [
          { label: ': String', description: 'Guarantees the variable holds text' },
          { label: ': Int', description: 'Guarantees the variable holds an integer' }
        ],
        whatChanged: 'The type is explicitly stated for readability.'
      },
      {
        id: 'card-var-inf-3',
        number: '03',
        title: 'Type cannot change',
        language: 'Kotlin',
        subtitle: 'Reassigning a different type is forbidden.',
        code: [
          'var items = 10',
          '// items = "Ten"  <-- Error: Type mismatch',
          'println(items)'
        ],
        whatItMeans: [
          { label: 'Type mismatch', description: 'Cannot assign a String to an Int variable' }
        ],
        whatChanged: 'Kotlin guarantees type stability even for mutable var.'
      }
    ]
  },
  predict: {
    title: 'Predict Types & Output',
    subtitle: 'Test your understanding of type deduction.',
    questions: [
      {
        id: 'pred-var-inf-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Inferred Type',
        topicMeta: 'Type inference',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val message = "CodeDo"',
          '    println(message)',
          '}'
        ],
        prompt: 'What type does Kotlin infer for `message`?',
        options: [
          { id: 'A', label: 'String', isCorrect: true },
          { id: 'B', label: 'Char', isCorrect: false },
          { id: 'C', label: 'Any', isCorrect: false },
          { id: 'D', label: 'Text', isCorrect: false }
        ],
        explanation: {
          codeRef: '"CodeDo"',
          detail: 'Text in double quotes is automatically inferred as `String` in Kotlin.'
        }
      },
      {
        id: 'pred-var-inf-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Type Mismatch on var',
        topicMeta: 'Static typing',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    var count = 5',
          '    count = "five"',
          '    println(count)',
          '}'
        ],
        prompt: 'What happens when this program is compiled?',
        options: [
          { id: 'A', label: 'Compile error: Type mismatch (String cannot be assigned to Int)', isCorrect: true },
          { id: 'B', label: 'Prints five', isCorrect: false },
          { id: 'C', label: 'Prints 5', isCorrect: false },
          { id: 'D', label: 'Runs and converts 5 to five dynamically', isCorrect: false }
        ],
        explanation: {
          codeRef: 'count = "five"',
          detail: 'Kotlin is statically typed. Even though count is a `var`, its type is fixed as `Int`, so assigning a `String` is illegal.'
        }
      },
      {
        id: 'pred-var-inf-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Explicit Declaration syntax',
        topicMeta: 'Syntax',
        language: 'Kotlin',
        prompt: 'Which syntax correctly declares an explicit Int variable in Kotlin?',
        options: [
          { id: 'A', label: 'val points: Int = 100', isCorrect: true },
          { id: 'B', label: 'Int points = 100;', isCorrect: false },
          { id: 'C', label: 'val points = Int(100)', isCorrect: false },
          { id: 'D', label: 'val Int: points = 100', isCorrect: false }
        ],
        explanation: {
          codeRef: 'val points: Int = 100',
          detail: 'Kotlin uses Pascal-style type annotations: the identifier is followed by a colon and the type name (`name: Type`).'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Declare Explicit and Inferred Variables',
    description:
      'Declare two variables:\n' +
      '• val username = "Alex" (type inferred)\n' +
      '• val level: Int = 10 (explicit type)\n\n' +
      '1. Print username on the first line.\n\n' +
      '2. Print level on the second line.',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'UserVars.kt',
    initialCode: `fun main() {
    // 1. Declare username = "Alex" and level: Int = 10:

    // 2. Print username and level on separate lines:
}`,
    solutionCode: `fun main() {
    val username = "Alex"
    val level: Int = 10
    println(username)
    println(level)
}`,
    sampleInput: 'main()',
    expectedOutput: 'Alex\n10',
    testCase: {
      call: '',
      expected: 'Alex\n10'
    }
  },
  debug: {
    title: 'Fix the Type Mismatch',
    subtitle: 'A variable is assigned a value of the wrong type.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'type',
    bugLabel: 'Type Mismatch: Assigned String to Int',
    brokenCode: `fun main() {
    val xp: Int = "500"
    println(xp)
}`,
    fixedCode: `fun main() {
    val xp: Int = 500
    println(xp)
}`,
    expectedOutput: '500',
    hints: [
      'The variable xp is explicitly typed as Int.',
      '"500" with double quotes is a String, not an integer.',
      'Remove the double quotes around 500.'
    ],
    explanation: '`Int` represents whole numbers. Putting quotes around 500 makes it a `String`, causing a type mismatch. Removing the quotes fixes the error.'
  },
  mastered: {
    topicTitle: 'Variables & Type Inference',
    summary: 'You mastered Kotlin type inference and explicit type annotations.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Automatic inference', subtitle: 'Learned how Kotlin deduces types from values' },
      { title: 'Explicit types', subtitle: 'Learned the : Type syntax' },
      { title: 'Type stability', subtitle: 'Learned that types never change at runtime' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 7: Int & Long (world-1-int-long)
// =========================================================================
export const INT_LONG_LESSON: FiveStageLesson = {
  id: 'world-1-int-long',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Int & Long',
  learn: {
    title: 'Whole Numbers: Int vs Long',
    subtitle:
      'Kotlin represents whole numbers primarily using two types: `Int` (32-bit, up to ~2.1 billion) and `Long` (64-bit, up to ~9 quintillion). If a number exceeds 2 billion, use a `Long` and suffix it with a capital `L`.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Standard Int vs Large Long',
    language: 'Kotlin',
    codeSnippet: [
      'val itemsInStock = 42             // Inferred as Int',
      'val worldPopulation = 8000000000L // Inferred as Long (with L suffix)',
      'println(itemsInStock)',
      'println(worldPopulation)'
    ],
    explanation: 'Whole numbers without a suffix default to `Int`. Adding `L` at the end tells the compiler to allocate 64 bits for a `Long`.',
    keyIdeas: [
      {
        number: 1,
        title: 'Int range',
        description: 'Stores numbers from -2,147,483,648 to +2,147,483,647.'
      },
      {
        number: 2,
        title: 'Long range (with L)',
        description: 'Stores massive numbers up to ~9 x 10^18. Suffix with capital L.'
      },
      {
        number: 3,
        title: 'Underscores for readability',
        description: 'You can write 1_000_000 for 1 million -- underscores are ignored by Kotlin.'
      }
    ],
    keyTakeaway: 'Use Int for everyday counts. Use Long for timestamps, file sizes, or values exceeding 2 billion -- Kotlin infers Long automatically for oversized literals, but adding the L suffix makes that intent explicit.'
  },
  explore: {
    title: 'Explore Int & Long',
    subtitle: 'See how Kotlin handles whole numbers of varying sizes.',
    cards: [
      {
        id: 'card-intlong-1',
        number: '01',
        title: 'Standard Int arithmetic',
        language: 'Kotlin',
        subtitle: 'Fast, compact 32-bit integers.',
        code: [
          'val a = 20',
          'val b = 10',
          'println(a + b)'
        ],
        whatItMeans: [
          { label: 'a + b', description: 'Performs integer addition yielding 30' }
        ],
        whatChanged: 'Basic math with default Int types.'
      },
      {
        id: 'card-intlong-2',
        number: '02',
        title: 'Long literal with L',
        language: 'Kotlin',
        subtitle: 'Explicit 64-bit precision.',
        code: [
          'val stars = 100_000_000_000L',
          'println(stars)'
        ],
        whatItMeans: [
          { label: 'L suffix', description: 'Makes the Long type explicit for readability -- this literal already exceeds Int\'s range, so Kotlin would infer Long even without it' },
          { label: 'Underscores', description: 'Make large numbers easy for humans to read' }
        ],
        whatChanged: 'Safely represented a number far beyond Int capacity.'
      },
      {
        id: 'card-intlong-3',
        number: '03',
        title: 'Converting between Int and Long',
        language: 'Kotlin',
        subtitle: 'Explicit conversion via .toLong() or .toInt().',
        code: [
          'val small = 100',
          'val big: Long = small.toLong()',
          'println(big)'
        ],
        whatItMeans: [
          { label: '.toLong()', description: 'Kotlin does not implicitly widen types; you must convert explicitly' }
        ],
        whatChanged: 'Converted an Int to a Long safely.'
      }
    ]
  },
  predict: {
    title: 'Predict Integer Outcomes',
    subtitle: 'Test your understanding of whole number types.',
    questions: [
      {
        id: 'pred-intlong-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Default Inference',
        topicMeta: 'Int vs Long',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val count = 500',
          '    println(count)',
          '}'
        ],
        prompt: 'What type is `count` by default?',
        options: [
          { id: 'A', label: 'Int', isCorrect: true },
          { id: 'B', label: 'Long', isCorrect: false },
          { id: 'C', label: 'Short', isCorrect: false },
          { id: 'D', label: 'Number', isCorrect: false }
        ],
        explanation: {
          codeRef: '500',
          detail: 'Whole numbers without a suffix default to Int in Kotlin.'
        }
      },
      {
        id: 'pred-intlong-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'The L Suffix',
        topicMeta: 'Long suffix',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val distance = 500L',
          '    println(distance)',
          '}'
        ],
        prompt: 'What does appending `L` do?',
        options: [
          { id: 'A', label: 'Forces the type to Long', isCorrect: true },
          { id: 'B', label: 'Multiplies by 1000', isCorrect: false },
          { id: 'C', label: 'Creates a List', isCorrect: false },
          { id: 'D', label: 'Marks it as a Local variable', isCorrect: false }
        ],
        explanation: {
          codeRef: '500L',
          detail: 'The L suffix indicates a 64-bit Long literal.'
        }
      },
      {
        id: 'pred-intlong-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Underscore formatting',
        topicMeta: 'Number formatting',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val amount = 1_000_000',
          '    println(amount)',
          '}'
        ],
        prompt: 'What is printed to the console?',
        options: [
          { id: 'A', label: '1000000', isCorrect: true },
          { id: 'B', label: '1_000_000', isCorrect: false },
          { id: 'C', label: '1', isCorrect: false },
          { id: 'D', label: 'Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '1_000_000',
          detail: 'Underscores in numeric literals are purely visual for readability and are discarded by the compiler.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Convert Daily Visitors to a Yearly Long Total',
    description:
      'Declare the visitor counts:\n' +
      '• val dailyVisitors = 50_000 (an Int)\n' +
      '• val days = 365L (a Long)\n\n' +
      '1. Convert dailyVisitors to Long using .toLong(), since Kotlin never implicitly widens Int to Long.\n\n' +
      '2. Multiply the converted value by days to get the yearly total.\n\n' +
      '3. Print the resulting yearly total (18250000).',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'YearlyVisitors.kt',
    initialCode: `fun main() {
    val dailyVisitors = 50_000
    val days = 365L

    // 1. Convert dailyVisitors to Long with .toLong():

    // 2-3. Multiply by days and print the yearly total:
}`,
    solutionCode: `fun main() {
    val dailyVisitors = 50_000
    val days = 365L
    val dailyVisitorsLong = dailyVisitors.toLong()
    val yearlyVisitors = dailyVisitorsLong * days
    println(yearlyVisitors)
}`,
    sampleInput: 'main()',
    expectedOutput: '18250000',
    testCase: {
      call: '',
      expected: '18250000'
    }
  },
  debug: {
    title: 'Fix the Long Arithmetic Mistake',
    subtitle: 'The total across all batches is wrong -- identify why, and fix the operator.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Arithmetic Operator',
    brokenCode: `fun main() {
    val satellitesPerBatch = 4_000L
    val totalBatches = 25L
    // BUG: adding gives one batch plus a leftover count, not the true total!
    val totalSatellites = satellitesPerBatch + totalBatches
    println(totalSatellites)
}`,
    fixedCode: `fun main() {
    val satellitesPerBatch = 4_000L
    val totalBatches = 25L
    val totalSatellites = satellitesPerBatch * totalBatches
    println(totalSatellites)
}`,
    expectedOutput: '100000',
    hints: [
      'The total across 25 batches of 4,000 satellites each should be found by repeating (multiplying), not by adding a leftover count once.',
      'satellitesPerBatch + totalBatches gives 4,000 + 25 = 4,025 -- nowhere near the real total of 25 batches of 4,000.',
      'Change the + to * so totalSatellites = satellitesPerBatch * totalBatches = 100,000.'
    ],
    explanation: 'satellitesPerBatch + totalBatches only adds 25 to 4,000, giving 4,025 -- it never accounts for having 25 separate batches of 4,000 each. Replacing + with * correctly multiplies 4,000 by 25, producing the real total: 100000. Both values are declared as Long (with underscore-formatted literals and no suffix needed beyond the L) since a satellite constellation count like this is exactly the kind of large, growing value Long is meant for.'
  },
  mastered: {
    topicTitle: 'Int & Long',
    summary: 'You mastered Kotlin\'s integer data types: 32-bit Int for regular numbers and 64-bit Long for large values.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Int usage', subtitle: 'Learned the standard whole number type' },
      { title: 'Long with L suffix', subtitle: 'Learned to represent large values safely' },
      { title: 'Readability with _', subtitle: 'Learned to format numbers with underscores' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 8: Float & Double (world-1-float-double)
// =========================================================================
export const FLOAT_DOUBLE_LESSON: FiveStageLesson = {
  id: 'world-1-float-double',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Float & Double',
  learn: {
    title: 'Decimal Numbers: Float vs Double',
    subtitle:
      'Kotlin provides two floating-point types for decimals: `Double` (64-bit, default, ~15-17 digits precision) and `Float` (32-bit, ~6-7 digits precision). Any decimal without a suffix is a `Double`. To make a `Float`, append `f` or `F`.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Default Double vs Float',
    language: 'Kotlin',
    codeSnippet: [
      'val pi = 3.1415926535   // Inferred as Double (default)',
      'val price = 19.99f      // Inferred as Float (with f suffix)',
      'println(pi)',
      'println(price)'
    ],
    explanation: '`Double` is the default because modern processors handle 64-bit math fast and the extra precision prevents subtle rounding errors. Use `Float` when memory is strictly constrained (e.g. graphics or games).',
    keyIdeas: [
      {
        number: 1,
        title: 'Double is the default',
        description: 'Writing 3.14 creates a Double with 64 bits of precision.'
      },
      {
        number: 2,
        title: 'Float requires f or F',
        description: 'Writing 3.14f creates a Float with 32 bits of precision.'
      },
      {
        number: 3,
        title: 'High precision',
        description: 'Double has more than twice the decimal precision of Float.'
      }
    ],
    keyTakeaway: 'Default to Double for decimal numbers. Use Float with an f suffix only when needed.'
  },
  explore: {
    title: 'Explore Float & Double',
    subtitle: 'See how precision and suffixes work in practice.',
    cards: [
      {
        id: 'card-float-1',
        number: '01',
        title: 'Double by default',
        language: 'Kotlin',
        subtitle: 'Standard decimal arithmetic.',
        code: [
          'val rate = 2.5',
          'val hours = 4.0',
          'println(rate * hours)'
        ],
        whatItMeans: [
          { label: '2.5 * 4.0', description: 'Multiplies two Doubles, producing 10.0' }
        ],
        whatChanged: 'Calculated with 64-bit precision.'
      },
      {
        id: 'card-float-2',
        number: '02',
        title: 'Float literal with f',
        language: 'Kotlin',
        subtitle: 'Explicit 32-bit float.',
        code: [
          'val weight: Float = 68.5f',
          'println(weight)'
        ],
        whatItMeans: [
          { label: '68.5f', description: 'The f suffix marks it as Float' }
        ],
        whatChanged: 'Allocated a 32-bit floating point value.'
      },
      {
        id: 'card-float-3',
        number: '03',
        title: 'Float requires suffix',
        language: 'Kotlin',
        subtitle: 'Writing 3.14 without f to a Float is a compiler error.',
        code: [
          '// val x: Float = 3.14  <-- Error: Type mismatch (Double != Float)',
          'val x: Float = 3.14f',
          'println(x)'
        ],
        whatItMeans: [
          { label: 'No auto-conversion', description: 'Kotlin will not silently downgrade Double to Float' }
        ],
        whatChanged: 'Learned the mandatory f suffix for Float.'
      },
      {
        id: 'card-float-4',
        number: '04',
        title: 'Converting between Float and Double',
        language: 'Kotlin',
        subtitle: 'Explicit conversion via .toFloat() or .toDouble().',
        code: [
          'val weight: Float = 68.5f',
          'val weightAsDouble: Double = weight.toDouble()',
          'println(weightAsDouble)'
        ],
        whatItMeans: [
          { label: '.toDouble()', description: 'Kotlin does not implicitly widen a Float to a Double; you must convert explicitly, just like Int to Long' }
        ],
        whatChanged: 'Converted a Float to a Double safely.'
      }
    ]
  },
  predict: {
    title: 'Predict Decimal Outputs',
    subtitle: 'Verify your understanding of Double and Float types.',
    questions: [
      {
        id: 'pred-float-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Default decimal type',
        topicMeta: 'Decimal defaults',
        language: 'Kotlin',
        code: [
          'val temperature = 98.6',
          'println(temperature)'
        ],
        prompt: 'What type is `temperature`?',
        options: [
          { id: 'A', label: 'Double', isCorrect: true },
          { id: 'B', label: 'Float', isCorrect: false },
          { id: 'C', label: 'Decimal', isCorrect: false },
          { id: 'D', label: 'Int', isCorrect: false }
        ],
        explanation: {
          codeRef: '98.6',
          detail: 'Decimals without a suffix are always inferred as Double in Kotlin.'
        }
      },
      {
        id: 'pred-float-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Float Suffix',
        topicMeta: 'Float literals',
        language: 'Kotlin',
        code: [
          'val factor = 1.5f',
          'println(factor)'
        ],
        prompt: 'What type is `factor`?',
        options: [
          { id: 'A', label: 'Float', isCorrect: true },
          { id: 'B', label: 'Double', isCorrect: false },
          { id: 'C', label: 'String', isCorrect: false },
          { id: 'D', label: 'Function', isCorrect: false }
        ],
        explanation: {
          codeRef: '1.5f',
          detail: 'The f suffix explicitly tells the compiler to construct a 32-bit Float.'
        }
      },
      {
        id: 'pred-float-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'Type Mismatch on Float',
        topicMeta: 'Type assignment',
        language: 'Kotlin',
        code: [
          'val speed: Float = 55.0'
        ],
        prompt: 'What will happen with this declaration?',
        options: [
          { id: 'A', label: 'Compile error: Type mismatch (Double assigned to Float)', isCorrect: true },
          { id: 'B', label: 'Automatically converts to Float', isCorrect: false },
          { id: 'C', label: 'Warning only', isCorrect: false },
          { id: 'D', label: 'Compiles with no issues', isCorrect: false }
        ],
        explanation: {
          codeRef: 'val speed: Float = 55.0',
          detail: '55.0 is a Double. In Kotlin, assigning a Double to a variable typed as Float is a compile error without the trailing f.'
        }
      },
      {
        id: 'pred-float-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'Explicit Conversion',
        topicMeta: 'Float / Double conversion',
        language: 'Kotlin',
        code: [
          'val weight: Float = 68.5f',
          'val weightAsDouble: Double = weight.toDouble()',
          'println(weightAsDouble)'
        ],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: '68.5', isCorrect: true },
          { id: 'B', label: 'Compile error: Type mismatch', isCorrect: false },
          { id: 'C', label: '68', isCorrect: false },
          { id: 'D', label: '68.5f', isCorrect: false }
        ],
        explanation: {
          codeRef: '.toDouble()',
          detail: 'Kotlin never implicitly widens a Float to a Double, but .toDouble() converts it explicitly, safely producing 68.5 as a Double.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Convert a Double Subtotal to Float',
    description:
      'Declare the order values:\n' +
      '• val pricePerItem = 12.50 (a Double)\n' +
      '• val quantity = 4.0 (a Double)\n\n' +
      '1. Calculate subtotal using the formula: pricePerItem * quantity.\n\n' +
      '2. Convert subtotal to Float using .toFloat() and store it as val subtotalAsFloat: Float.\n\n' +
      '3. Print subtotalAsFloat (50.0).',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'SubtotalFloat.kt',
    initialCode: `fun main() {
    val pricePerItem = 12.50
    val quantity = 4.0

    // 1. Calculate subtotal (pricePerItem * quantity):

    // 2-3. Convert subtotal to Float and print it:
}`,
    solutionCode: `fun main() {
    val pricePerItem = 12.50
    val quantity = 4.0
    val subtotal = pricePerItem * quantity
    val subtotalAsFloat: Float = subtotal.toFloat()
    println(subtotalAsFloat)
}`,
    sampleInput: 'main()',
    expectedOutput: '50.0',
    testCase: {
      call: '',
      expected: '50.0'
    }
  },
  debug: {
    title: 'Fix the Decimal Arithmetic Mistake',
    subtitle: 'The total price is wrong -- identify why, and fix the operator.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Arithmetic Operator',
    brokenCode: `fun main() {
    val pricePerItem = 2.5
    val quantity = 3.0
    // BUG: adding gives one item's price plus the quantity, not the total cost!
    val total = pricePerItem + quantity
    println(total)
}`,
    fixedCode: `fun main() {
    val pricePerItem = 2.5
    val quantity = 3.0
    val total = pricePerItem * quantity
    println(total)
}`,
    expectedOutput: '7.5',
    hints: [
      'The total cost of buying multiple items at a fixed price should come from repeating (multiplying), not from adding.',
      'pricePerItem + quantity gives 2.5 + 3.0 = 5.5 -- that never accounts for buying 3 units at $2.5 each.',
      'Change the + to * so total = pricePerItem * quantity = 7.5.'
    ],
    explanation: 'pricePerItem + quantity only adds 3.0 to 2.5, giving 5.5 -- it never accounts for buying 3 units at $2.5 each. Replacing + with * correctly multiplies 2.5 by 3.0, producing the real total: 7.5. Both values default to Double since neither literal has an f suffix, which is exactly the default behavior this lesson teaches.'
  },
  mastered: {
    topicTitle: 'Float & Double',
    summary: 'You mastered Kotlin\'s floating-point types: default 64-bit Double and suffixed 32-bit Float.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Double precision', subtitle: 'Learned why Double is the default decimal type' },
      { title: 'Float suffix', subtitle: 'Learned when and how to write Float literals with f' },
      { title: 'Type mismatch prevention', subtitle: 'Learned that Kotlin strictly separates Float and Double' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 9: Boolean (world-1-boolean)
// =========================================================================
export const BOOLEAN_LESSON: FiveStageLesson = {
  id: 'world-1-boolean',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Boolean',
  learn: {
    title: 'True or False: The Boolean Type',
    subtitle:
      'A `Boolean` represents a binary truth value: it can only ever be `true` or `false`. Booleans are the core foundation of program logic, decision making, conditional branches, and state flags.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Declaring and Negating Booleans',
    language: 'Kotlin',
    codeSnippet: [
      'val isLoggedIn = true',
      'val hasCompletedTutorial = false',
      '',
      'println(isLoggedIn)        // Prints true',
      'println(!hasCompletedTutorial) // Negation: Prints true'
    ],
    explanation: 'The exclamation mark `!` is the logical NOT operator. It flips `true` to `false` and `false` to `true`.',
    keyIdeas: [
      {
        number: 1,
        title: 'Only two values',
        description: 'A Boolean can only be true or false (no numbers like 0 or 1 in Kotlin).'
      },
      {
        number: 2,
        title: 'Strict boolean type',
        description: 'Kotlin does not treat truthy/falsy values as booleans -- it requires real Booleans.'
      },
      {
        number: 3,
        title: 'Logical NOT (!)',
        description: 'Inverts a boolean value (!true becomes false).'
      }
    ],
    keyTakeaway: 'Use Booleans for flags, checks, and conditions. They are always either true or false.'
  },
  explore: {
    title: 'Explore Boolean Logic',
    subtitle: 'See how Booleans are declared, negated, and evaluated.',
    cards: [
      {
        id: 'card-bool-1',
        number: '01',
        title: 'Direct boolean values',
        language: 'Kotlin',
        subtitle: 'Assigning true and false.',
        code: [
          'val active = true',
          'val muted = false',
          'println(active)'
        ],
        whatItMeans: [
          { label: 'true / false', description: 'Kotlin reserved keywords for boolean literals' }
        ],
        whatChanged: 'Created two clear binary flags.'
      },
      {
        id: 'card-bool-2',
        number: '02',
        title: 'Comparison results in Boolean',
        language: 'Kotlin',
        subtitle: 'Comparing numbers yields a Boolean.',
        code: [
          'val score = 85',
          'val passed = score >= 50',
          'println(passed)'
        ],
        whatItMeans: [
          { label: 'score >= 50', description: 'Evaluates to true because 85 is greater than or equal to 50' }
        ],
        whatChanged: 'Generated a boolean from a comparison.'
      },
      {
        id: 'card-bool-3',
        number: '03',
        title: 'Logical NOT (!)',
        language: 'Kotlin',
        subtitle: 'Flipping a boolean flag.',
        code: [
          'val isDark = true',
          'val isLight = !isDark',
          'println(isLight)'
        ],
        whatItMeans: [
          { label: '!isDark', description: 'Inverts true into false' }
        ],
        whatChanged: 'Toggled state using the NOT operator.'
      }
    ]
  },
  predict: {
    title: 'Predict Boolean States',
    subtitle: 'Evaluate boolean expressions and negation.',
    questions: [
      {
        id: 'pred-bool-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Negation Evaluation',
        topicMeta: 'Logical NOT',
        language: 'Kotlin',
        code: [
          'val isReady = false',
          'println(!isReady)'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '!false', isCorrect: false },
          { id: 'D', label: 'null', isCorrect: false }
        ],
        explanation: {
          codeRef: '!isReady',
          detail: '! negates false to true.'
        }
      },
      {
        id: 'pred-bool-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Quotes vs Booleans',
        topicMeta: 'Type distinction',
        language: 'Kotlin',
        code: [
          'val flag = "true"'
        ],
        prompt: 'What type is `flag`?',
        options: [
          { id: 'A', label: 'String', isCorrect: true },
          { id: 'B', label: 'Boolean', isCorrect: false },
          { id: 'C', label: 'Char', isCorrect: false },
          { id: 'D', label: 'Bool', isCorrect: false }
        ],
        explanation: {
          codeRef: '"true"',
          detail: '"true" in quotes is a String literal. A real Boolean must be written without quotes: `val flag = true`.'
        }
      },
      {
        id: 'pred-bool-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Comparison result',
        topicMeta: 'Comparisons',
        language: 'Kotlin',
        code: [
          'val a = 10',
          'val b = 20',
          'println(a > b)'
        ],
        prompt: 'What does `a > b` evaluate to?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: '10', isCorrect: false },
          { id: 'D', label: '20', isCorrect: false }
        ],
        explanation: {
          codeRef: 'a > b',
          detail: '10 is not greater than 20, so the expression evaluates to the boolean false.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Toggle a Feature Flag',
    description:
      'Declare val isPremium = false.\n\n' +
      '1. Use the logical NOT operator (!) to negate isPremium.\n\n' +
      '2. Print the negated value (!isPremium), which outputs true.',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'FeatureFlag.kt',
    initialCode: `fun main() {
    val isPremium = false

    // 1. Print the negated value using !isPremium:
}`,
    solutionCode: `fun main() {
    val isPremium = false
    println(!isPremium)
}`,
    sampleInput: 'main()',
    expectedOutput: 'true',
    testCase: {
      call: '',
      expected: 'true'
    }
  },
  debug: {
    title: 'Fix the Missing Negation',
    subtitle: 'The sound status is backwards -- identify why, and fix the missing operator.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Missing Negation (!)',
    brokenCode: `fun main() {
    val isMuted = true
    // BUG: soundEnabled should be the OPPOSITE of isMuted, not a copy of it!
    val soundEnabled = isMuted
    println(soundEnabled)
}`,
    fixedCode: `fun main() {
    val isMuted = true
    val soundEnabled = !isMuted
    println(soundEnabled)
}`,
    expectedOutput: 'false',
    hints: [
      'soundEnabled and isMuted should never agree -- if one is true, the other must be false. Check whether that is actually true here.',
      'val soundEnabled = isMuted just copies isMuted\'s value (true), instead of flipping it.',
      'Add the ! negation operator: val soundEnabled = !isMuted.'
    ],
    explanation: 'Copying isMuted directly means soundEnabled ends up true whenever the device is muted -- exactly backwards. Adding the ! negation operator flips true to false, so soundEnabled = !isMuted correctly evaluates to false while isMuted is true.'
  },
  mastered: {
    topicTitle: 'Boolean',
    summary: 'You mastered Kotlin Booleans: true/false flags, the ! negation operator, and boolean comparisons.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'true and false', subtitle: 'Learned the strict Boolean values' },
      { title: 'Negation (!)', subtitle: 'Learned to invert boolean flags' },
      { title: 'Type distinction', subtitle: 'Learned to never wrap booleans in quotes' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 10: Char (world-1-char)
// =========================================================================
export const CHAR_LESSON: FiveStageLesson = {
  id: 'world-1-char',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Char',
  learn: {
    title: 'Single Characters: The Char Type',
    subtitle:
      "The `Char` type represents a single character and is ALWAYS enclosed in single quotes 'A'. This is strictly distinguished from `String`, which represents sequences of characters and is enclosed in double quotes \"A\".",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Char Literals & Escapes',
    language: 'Kotlin',
    codeSnippet: [
      "val grade: Char = 'A'       // Single quotes for single character",
      "val symbol = '$'            // Inferred as Char",
      "val newline = '\\n'          // Escaped newline character",
      'println(grade)',
      'println(symbol)'
    ],
    explanation: "Single quotes ' ' define a `Char`. Double quotes \" \" define a `String`. Trying to put more than one character inside single quotes causes a compiler error.",
    keyIdeas: [
      {
        number: 1,
        title: 'Single quotes only',
        description: 'Char literals must be enclosed in single quotes: \'X\'.'
      },
      {
        number: 2,
        title: 'Exactly one character',
        description: 'Single quotes cannot contain multiple characters (e.g. \'AB\' is illegal).'
      },
      {
        number: 3,
        title: 'Special escape characters',
        description: '\'\\n\' (newline), \'\\t\' (tab), and \'\\\\\' (backslash) are valid single characters.'
      }
    ],
    keyTakeaway: 'Single quotes = single Char. Double quotes = String.'
  },
  explore: {
    title: 'Explore the Char Type',
    subtitle: 'See how characters work in Kotlin.',
    cards: [
      {
        id: 'card-char-1',
        number: '01',
        title: 'Letters, digits, and symbols',
        language: 'Kotlin',
        subtitle: 'Any single character can be a Char.',
        code: [
          'val letter = \'K\'',
          'val digit = \'7\'',
          'println(letter)'
        ],
        whatItMeans: [
          { label: '\'K\'', description: 'The uppercase letter K as a Char' },
          { label: '\'7\'', description: 'The character 7 (not the integer 7)' }
        ],
        whatChanged: 'Stored distinct characters safely.'
      },
      {
        id: 'card-char-2',
        number: '02',
        title: 'Char vs String comparison',
        language: 'Kotlin',
        subtitle: 'Notice the quotation marks.',
        code: [
          'val c: Char = \'A\'',
          'val s: String = "A"',
          'println(c)'
        ],
        whatItMeans: [
          { label: '\'A\'', description: 'A single 16-bit Unicode character' },
          { label: '"A"', description: 'A String object holding one character' }
        ],
        whatChanged: 'Clarified the distinction between Char and String.'
      },
      {
        id: 'card-char-3',
        number: '03',
        title: 'Escape characters: tab',
        language: 'Kotlin',
        subtitle: 'Representing invisible characters.',
        code: [
          'val tab = \'\\t\'',
          'println("A" + tab + "B")'
        ],
        whatItMeans: [
          { label: '\'\\t\'', description: 'Single character representing horizontal tab' }
        ],
        whatChanged: 'Used an escaped control character.'
      },
      {
        id: 'card-char-4',
        number: '04',
        title: 'Escape characters: newline',
        language: 'Kotlin',
        subtitle: 'Forcing a line break inside concatenated text.',
        code: [
          'val newline = \'\\n\'',
          'println("Line1" + newline + "Line2")'
        ],
        whatItMeans: [
          { label: '\'\\n\'', description: 'Single character representing a line break' },
          { label: 'Result', description: 'Prints "Line1" and "Line2" on two separate lines, even though they were joined with +' }
        ],
        whatChanged: 'Used a different escape character to control line breaks, not just spacing.'
      }
    ]
  },
  predict: {
    title: 'Predict Char Behavior',
    subtitle: 'Identify valid Char literals and outputs.',
    questions: [
      {
        id: 'pred-char-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Char Quotes',
        topicMeta: 'Quotation syntax',
        language: 'Kotlin',
        code: [
          'val grade: Char = \'Z\''
        ],
        prompt: 'Which of the following is a valid Char literal in Kotlin?',
        options: [
          { id: 'A', label: '\'Z\'', isCorrect: true },
          { id: 'B', label: '"Z"', isCorrect: false },
          { id: 'C', label: '\'Kotlin\'', isCorrect: false },
          { id: 'D', label: '`Z`', isCorrect: false }
        ],
        explanation: {
          codeRef: '\'Z\'',
          detail: 'Char literals require single quotation marks around exactly one character.'
        }
      },
      {
        id: 'pred-char-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Multiple characters error',
        topicMeta: 'Char length',
        language: 'Kotlin',
        code: [
          'val initial = \'AB\''
        ],
        prompt: 'What happens when compiling this line?',
        options: [
          { id: 'A', label: 'Compile error: too many characters in a character literal', isCorrect: true },
          { id: 'B', label: 'Inferred as String', isCorrect: false },
          { id: 'C', label: 'Takes only the first character \'A\'', isCorrect: false },
          { id: 'D', label: 'Creates an array of characters', isCorrect: false }
        ],
        explanation: {
          codeRef: '\'AB\'',
          detail: 'Single quotes can only ever hold a single character. For multiple characters, use double quotes ("AB").'
        }
      },
      {
        id: 'pred-char-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'Char digit vs Int',
        topicMeta: 'Char vs Int',
        language: 'Kotlin',
        code: [
          'val c = \'5\'',
          'println(c)'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: '5', isCorrect: true },
          { id: 'B', label: '\'5\'', isCorrect: false },
          { id: 'C', label: '53 (ASCII code)', isCorrect: false },
          { id: 'D', label: 'Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'println(c)',
          detail: 'println outputs the character glyph \'5\' without the surrounding single quotes.'
        }
      },
      {
        id: 'pred-char-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'Newline escape',
        topicMeta: 'Escape sequences',
        language: 'Kotlin',
        code: [
          'val newline = \'\\n\'',
          'println("Line1" + newline + "Line2")'
        ],
        prompt: 'What does this print?',
        options: [
          { id: 'A', label: 'Line1 and Line2 on two separate lines', isCorrect: true },
          { id: 'B', label: 'Line1\\nLine2 (with the literal backslash-n visible)', isCorrect: false },
          { id: 'C', label: 'Line1Line2 (joined with no separator)', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: '\'\\n\'',
          detail: 'The escape sequence \\n represents an actual line-break character, not the two visible characters "\\" and "n". Concatenating it between the two strings forces Line2 onto its own line.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Print a First Initial',
    description:
      'Declare a Char variable:\n' +
      'val initial: Char = \'K\'\n\n' +
      '1. Use println() to print initial to the console.',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'Initial.kt',
    initialCode: `fun main() {
    // 1. Declare val initial: Char = 'K' and print it:
}`,
    solutionCode: `fun main() {
    val initial: Char = 'K'
    println(initial)
}`,
    sampleInput: 'main()',
    expectedOutput: 'K',
    testCase: {
      call: '',
      expected: 'K'
    }
  },
  debug: {
    title: 'Fix the Missing Tab Escape',
    subtitle: 'The name and score should be separated by a tab, but the separator prints as a plain letter -- identify why, and fix the Char literal.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Missing Backslash in Escape Sequence',
    brokenCode: `fun main() {
    // BUG: this should be a tab escape, not the plain letter t!
    val separator: Char = 't'
    println("Name:" + separator + "Score")
}`,
    fixedCode: `fun main() {
    val separator: Char = '\\t'
    println("Name:" + separator + "Score")
}`,
    expectedOutput: 'Name:\tScore',
    hints: [
      'The separator Char is meant to be a tab, not the visible letter t -- check what actually prints between "Name:" and "Score".',
      "'t' is just the one-character letter t. A tab escape needs a backslash before the t: '\\t'.",
      "Change 't' to '\\t' so separator holds the tab escape sequence, not a literal letter."
    ],
    explanation: "'t' is a single Char holding the letter t -- Kotlin has no way to know you meant \"tab\" without the backslash. '\\t' is the escape sequence for an actual tab character. Since separator was declared as a single Char, only one escape sequence (or one literal character) can go inside the quotes; adding the backslash fixes the value without changing anything else."
  },
  mastered: {
    topicTitle: 'Char',
    summary: 'You mastered Kotlin single-character Char literals and single-quote syntax.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Single-quote syntax', subtitle: 'Learned \'A\' syntax for Char literals' },
      { title: 'Char vs String', subtitle: 'Distinguished 1-char Char from String' },
      { title: 'Escape sequences', subtitle: 'Learned \\n and \\t escape characters' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 11: Strings (world-1-string)
// =========================================================================
export const STRING_LESSON: FiveStageLesson = {
  id: 'world-1-string',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Strings',
  learn: {
    title: 'Working with Text: Strings',
    subtitle:
      'In Kotlin, text is represented by the `String` type. Strings are enclosed in double quotes `"..."`. You can check a string\'s character count using `.length`, combine strings with `+`, and create multi-line strings with triple quotes `"""..."""`.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'String Properties and Concatenation',
    language: 'Kotlin',
    codeSnippet: [
      'val greeting = "Hello"',
      'val target = "World"',
      'val combined = greeting + " " + target',
      '',
      'println(combined)        // Prints Hello World',
      'println(greeting.length) // Prints 5'
    ],
    explanation: 'Strings in Kotlin are immutable -- once created, their characters cannot be modified in-place; operations create new strings.',
    keyIdeas: [
      {
        number: 1,
        title: 'Double quotes',
        description: 'Strings are wrapped in double quotes: "Hello".'
      },
      {
        number: 2,
        title: '.length property',
        description: 'Returns the exact number of characters in the string.'
      },
      {
        number: 3,
        title: 'Multi-line strings (""")',
        description: 'Triple quotes create multiline raw strings without escape characters.'
      }
    ],
    keyTakeaway: 'Strings represent text wrapped in double quotes. Access .length for character counts.'
  },
  explore: {
    title: 'Explore Strings',
    subtitle: 'See how strings are created and manipulated.',
    cards: [
      {
        id: 'card-str-1',
        number: '01',
        title: 'String length',
        language: 'Kotlin',
        subtitle: 'Counting characters in a string.',
        code: [
          'val word = "Kotlin"',
          'println(word.length)'
        ],
        whatItMeans: [
          { label: 'word.length', description: 'Returns 6 (the number of letters in "Kotlin")' }
        ],
        whatChanged: 'Measured text length directly.'
      },
      {
        id: 'card-str-2',
        number: '02',
        title: 'String concatenation with +',
        language: 'Kotlin',
        subtitle: 'Joining multiple strings.',
        code: [
          'val first = "Code"',
          'val second = "Do"',
          'println(first + second)'
        ],
        whatItMeans: [
          { label: 'first + second', description: 'Produces "CodeDo"' }
        ],
        whatChanged: 'Combined two strings together.'
      },
      {
        id: 'card-str-3',
        number: '03',
        title: 'Multi-line raw string',
        language: 'Kotlin',
        subtitle: 'Triple quotes preserve exact formatting.',
        code: [
          'val banner = """',
          '  LINE 1',
          '  LINE 2',
          '""".trimIndent()',
          'println(banner)'
        ],
        whatItMeans: [
          { label: '"""', description: 'Starts and ends a multi-line raw string' },
          { label: '.trimIndent()', description: 'Strips the common leading whitespace and the leading/trailing blank lines the raw string would otherwise keep' }
        ],
        whatChanged: 'Wrote multiple lines of text without \\n, then trimmed the indentation raw strings preserve by default.'
      }
    ]
  },
  predict: {
    title: 'Predict String Outputs',
    subtitle: 'Evaluate string lengths and combinations.',
    questions: [
      {
        id: 'pred-str-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'String length evaluation',
        topicMeta: 'String.length',
        language: 'Kotlin',
        code: [
          'val text = "Hi!"',
          'println(text.length)'
        ],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: '3', isCorrect: true },
          { id: 'B', label: '2', isCorrect: false },
          { id: 'C', label: '4', isCorrect: false },
          { id: 'D', label: 'Hi!', isCorrect: false }
        ],
        explanation: {
          codeRef: 'text.length',
          detail: '"Hi!" has 3 characters: \'H\', \'i\', and \'!\'.'
        }
      },
      {
        id: 'pred-str-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Concatenation with numbers',
        topicMeta: 'Concatenation',
        language: 'Kotlin',
        code: [
          'val text = "Level " + 5',
          'println(text)'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'Level 5', isCorrect: true },
          { id: 'B', label: 'Level + 5', isCorrect: false },
          { id: 'C', label: 'Error', isCorrect: false },
          { id: 'D', label: 'Level', isCorrect: false }
        ],
        explanation: {
          codeRef: '"Level " + 5',
          detail: 'When concatenating a String with an Int, Kotlin automatically converts the number to text.'
        }
      },
      {
        id: 'pred-str-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Empty String length',
        topicMeta: 'Empty strings',
        language: 'Kotlin',
        code: [
          'val empty = ""',
          'println(empty.length)'
        ],
        prompt: 'What is the length of an empty string `""`?',
        options: [
          { id: 'A', label: '0', isCorrect: true },
          { id: 'B', label: '1', isCorrect: false },
          { id: 'C', label: '-1', isCorrect: false },
          { id: 'D', label: 'null', isCorrect: false }
        ],
        explanation: {
          codeRef: '""',
          detail: 'An empty string contains zero characters, so .length returns 0.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Print Combined Title',
    description:
      'Declare val prefix = "Kotlin" and val suffix = "Awakening".\n\n' +
      '1. Combine prefix and suffix with a space in between.\n\n' +
      '2. Print the combined title: "Kotlin Awakening".',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'CombinedTitle.kt',
    initialCode: `fun main() {
    val prefix = "Kotlin"
    val suffix = "Awakening"

    // 1. Combine prefix, space, and suffix, then print:
}`,
    solutionCode: `fun main() {
    val prefix = "Kotlin"
    val suffix = "Awakening"
    println(prefix + " " + suffix)
}`,
    sampleInput: 'main()',
    expectedOutput: 'Kotlin Awakening',
    testCase: {
      call: '',
      expected: 'Kotlin Awakening'
    }
  },
  debug: {
    title: 'Fix the Unterminated String',
    subtitle: 'The compiler is missing a closing quote.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Syntax Error: Unterminated string literal',
    brokenCode: `fun main() {
    val motto = "Learn Kotlin
    println(motto)
}`,
    fixedCode: `fun main() {
    val motto = "Learn Kotlin"
    println(motto)
}`,
    expectedOutput: 'Learn Kotlin',
    hints: [
      'Look at the quotes on line 2.',
      'The string starts with a double quote but never ends.',
      'Add the closing double quote (") after "Learn Kotlin".'
    ],
    explanation: 'Single-line strings must begin and end with double quotes on the same line.'
  },
  mastered: {
    topicTitle: 'Strings',
    summary: 'You mastered Kotlin strings: double-quote literals, .length checks, and concatenation.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'String creation', subtitle: 'Learned "text" double-quote syntax' },
      { title: 'String properties', subtitle: 'Learned .length for character counts' },
      { title: 'Concatenation', subtitle: 'Learned combining strings together' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 12: String Templates (world-1-string-templates)
// =========================================================================
export const STRING_TEMPLATES_LESSON: FiveStageLesson = {
  id: 'world-1-string-templates',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'String Templates',
  learn: {
    title: 'Clean Interpolation: String Templates',
    subtitle:
      'Instead of clumsy `+` concatenation, Kotlin provides **String Templates**. Simply insert a `$` followed by a variable name right inside the string: `"$name"`. For expressions or math, wrap it in curly braces: `"${score + 10}"`.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Variable and Expression Templates',
    language: 'Kotlin',
    codeSnippet: [
      'val player = "Maya"',
      'val level = 5',
      '',
      '// Variable template: $player and $level',
      'println("Player: $player is on Level $level")',
      '',
      '// Expression template: ${level * 10}',
      'println("Next level points: ${level * 10}")'
    ],
    explanation: '`$name` embeds a simple variable. `${expression}` evaluates any Kotlin code inside the curly braces and places the result into the string.',
    keyIdeas: [
      {
        number: 1,
        title: 'Simple variable: $name',
        description: 'Drop $ directly before a variable name inside double quotes.'
      },
      {
        number: 2,
        title: 'Expression: ${a + b}',
        description: 'Use curly braces ${...} to evaluate math, function calls, or property accesses.'
      },
      {
        number: 3,
        title: 'Escaping the dollar sign',
        description: 'To print a literal $ sign, escape it as \\$ (or, inside a raw string where \\ escapes don\'t work, use ${\'$\'}).'
      }
    ],
    keyTakeaway: 'Always prefer string templates over `+` concatenation -- they are cleaner, faster, and idiomatic.'
  },
  explore: {
    title: 'Explore String Templates',
    subtitle: 'See how Kotlin evaluates templates inside strings.',
    cards: [
      {
        id: 'card-tmpl-1',
        number: '01',
        title: 'Embedding a variable',
        language: 'Kotlin',
        subtitle: 'Direct variable substitution.',
        code: [
          'val language = "Kotlin"',
          'println("We are learning $language!")'
        ],
        whatItMeans: [
          { label: '$language', description: 'Replaced with "Kotlin" yielding "We are learning Kotlin!"' }
        ],
        whatChanged: 'Replaced string concatenation with a clean template.'
      },
      {
        id: 'card-tmpl-2',
        number: '02',
        title: 'Expression template ${...}',
        language: 'Kotlin',
        subtitle: 'Evaluate math or expressions.',
        code: [
          'val count = 3',
          'val price = 10',
          'println("Total: \${count * price}")'
        ],
        whatItMeans: [
          { label: '${count * price}', description: 'Evaluates 3 * 10 = 30 and places 30 into the string' }
        ],
        whatChanged: 'Evaluated arithmetic right inside the text.'
      },
      {
        id: 'card-tmpl-3',
        number: '03',
        title: 'Property access inside template',
        language: 'Kotlin',
        subtitle: 'Accessing .length inside curly braces.',
        code: [
          'val name = "Sam"',
          'println("Length of $name is ${name.length}")'
        ],
        whatItMeans: [
          { label: '$name', description: 'Embeds "Sam"' },
          { label: '${name.length}', description: 'Requires curly braces to access the .length property' }
        ],
        whatChanged: 'Showed why ${...} is required for property calls.'
      },
      {
        id: 'card-tmpl-4',
        number: '04',
        title: 'Escaping a literal dollar sign',
        language: 'Kotlin',
        subtitle: 'Printing a real $ character without triggering interpolation.',
        code: [
          'val price = 25',
          'println("Price: \\$price")'
        ],
        whatItMeans: [
          { label: '\\$price', description: 'The backslash escapes the dollar sign, so it prints as a literal $ followed by the plain text "price" -- not the variable\'s value' }
        ],
        whatChanged: 'Printed a literal $ sign instead of triggering interpolation.'
      }
    ]
  },
  predict: {
    title: 'Predict String Template Outputs',
    subtitle: 'Evaluate variable and expression interpolation.',
    questions: [
      {
        id: 'pred-tmpl-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Simple Variable Template',
        topicMeta: 'Variable template',
        language: 'Kotlin',
        code: [
          'val city = "Paris"',
          'println("Welcome to $city!")'
        ],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'Welcome to Paris!', isCorrect: true },
          { id: 'B', label: 'Welcome to $city!', isCorrect: false },
          { id: 'C', label: 'Welcome to "Paris"!', isCorrect: false },
          { id: 'D', label: 'Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '"Welcome to $city!"',
          detail: '$city is evaluated and replaced by its value: "Paris".'
        }
      },
      {
        id: 'pred-tmpl-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Missing Braces Bug',
        topicMeta: 'Expression braces',
        language: 'Kotlin',
        code: [
          'val count = 5',
          'println("$count + 1")'
        ],
        prompt: 'What will this print without curly braces?',
        options: [
          { id: 'A', label: '5 + 1', isCorrect: true },
          { id: 'B', label: '6', isCorrect: false },
          { id: 'C', label: '$count + 1', isCorrect: false },
          { id: 'D', label: 'Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '"$count + 1"',
          detail: 'Without curly braces, only $count is interpolated (yielding 5), and " + 1" is treated as literal text.'
        }
      },
      {
        id: 'pred-tmpl-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'Expression with Braces',
        topicMeta: 'Expression evaluation',
        language: 'Kotlin',
        code: [
          'val count = 5',
          'println("${count + 1}")'
        ],
        prompt: 'What does this print with `${count + 1}`?',
        options: [
          { id: 'A', label: '6', isCorrect: true },
          { id: 'B', label: '5 + 1', isCorrect: false },
          { id: 'C', label: '51', isCorrect: false },
          { id: 'D', label: '${6}', isCorrect: false }
        ],
        explanation: {
          codeRef: '"${count + 1}"',
          detail: 'The curly braces evaluate the expression count + 1 (5 + 1 = 6) before placing it in the string.'
        }
      },
      {
        id: 'pred-tmpl-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'Escaping the Dollar Sign',
        topicMeta: 'Literal $ with \\$',
        language: 'Kotlin',
        code: [
          'val price = 25',
          'println("Price: \\$price")'
        ],
        prompt: 'What does this print?',
        options: [
          { id: 'A', label: 'Price: $price', isCorrect: true },
          { id: 'B', label: 'Price: 25', isCorrect: false },
          { id: 'C', label: 'Price: ${price}', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: '"Price: \\$price"',
          detail: 'The backslash escapes the dollar sign, so it prints as literal text -- "$" followed by the plain characters "price" -- instead of interpolating the price variable.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Format a User Summary',
    description:
      'Given val name = "Kai" and val points = 95.\n\n' +
      '1. Use string templates ($name and $points) to construct the message.\n\n' +
      '2. Print the result:\n' +
      '"Kai scored 95 points!"',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'UserSummary.kt',
    initialCode: `fun main() {
    val name = "Kai"
    val points = 95

    // 1. Print "$name scored $points points!" using string templates:
}`,
    solutionCode: `fun main() {
    val name = "Kai"
    val points = 95
    println("$name scored $points points!")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Kai scored 95 points!',
    testCase: {
      call: '',
      expected: 'Kai scored 95 points!'
    }
  },
  debug: {
    title: 'Fix Missing Braces in Expression',
    subtitle: 'A property call was written without expression braces.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Error: Missing curly braces around property access',
    brokenCode: `fun main() {
    val item = "CodeDo"
    // Expects: "Length: 6"
    println("Length: $item.length")
}`,
    fixedCode: `fun main() {
    val item = "CodeDo"
    println("Length: \${item.length}")
}`,
    expectedOutput: 'Length: 6',
    hints: [
      'Notice what prints: "Length: CodeDo.length".',
      'Kotlin only treats $item as the variable, ignoring .length.',
      'Wrap item.length in curly braces: ${item.length}.'
    ],
    explanation: 'To access properties or methods inside a string template, wrap the entire expression in curly braces `${item.length}`.'
  },
  mastered: {
    topicTitle: 'String Templates',
    summary: 'You mastered Kotlin string templates: $variable and ${expression} interpolation.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Variable interpolation', subtitle: 'Learned $var syntax inside strings' },
      { title: 'Expression interpolation', subtitle: 'Learned ${a + b} syntax for complex expressions' },
      { title: 'Idiomatic Kotlin', subtitle: 'Replaced clunky + concatenation completely' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 13: World 1 Boss — Personal Profile Program (world-1-boss)
// =========================================================================
export const WORLD_1_BOSS_LESSON: FiveStageLesson = {
  id: 'world-1-boss',
  worldId: 'world-1',
  worldName: 'Kotlin Awakening',
  stageName: 'STAGE 1 — FOUNDATIONS',
  topicTitle: 'Personal Profile Program',
  learn: {
    title: 'World 1 Boss: Personal Profile Program',
    subtitle:
      'Congratulations on reaching the World 1 Boss! You will now assemble everything you learned in Kotlin Awakening: val and var, data types (Int, Double, Boolean, Char, String), and string templates to construct a complete profile generator.',
    exampleTag: 'CAPSTONE',
    exampleTitle: 'The Complete Profile Structure',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    val name: String = "Dev"',
      '    var level: Int = 1',
      '    val rank: Char = \'S\'',
      '    val score: Double = 98.5',
      '    val isActive: Boolean = true',
      '',
      '    println("--- DEVELOPER PROFILE ---")',
      '    println("Name: $name | Rank: $rank")',
      '    println("Level: $level | Score: $score | Active: $isActive")',
      '}'
    ],
    explanation: 'A comprehensive Kotlin program integrates multiple data types seamlessly with clear variable semantics.',
    keyIdeas: [
      {
        number: 1,
        title: 'Combine all fundamental types',
        description: 'String, Int, Double, Boolean, and Char working together in harmony.'
      },
      {
        number: 2,
        title: 'Clean template formatting',
        description: 'Use string templates to output complex multiline profile summaries.'
      },
      {
        number: 3,
        title: 'World 1 Mastery',
        description: 'Proves you can write standalone, syntactically correct Kotlin applications.'
      }
    ],
    keyTakeaway: 'You now possess the foundational building blocks of all Kotlin software engineering.'
  },
  explore: {
    title: 'Explore the Capstone Architecture',
    subtitle: 'Review the integrated fundamentals.',
    cards: [
      {
        id: 'card-boss-1',
        number: '01',
        title: 'Data types in harmony',
        language: 'Kotlin',
        subtitle: 'Multiple data types serving one profile.',
        code: [
          'val name = "Kora"',
          'val badge = \'★\'',
          'val level = 10',
          'println("$name $badge (Lvl $level)")'
        ],
        whatItMeans: [
          { label: 'String + Char + Int', description: 'Combined seamlessly via string templates' }
        ],
        whatChanged: 'Unified multiple distinct data types.'
      },
      {
        id: 'card-boss-2',
        number: '02',
        title: 'State updates',
        language: 'Kotlin',
        subtitle: 'Updating mutable values.',
        code: [
          'var xp = 1000',
          'xp += 250',
          'println("XP: $xp")'
        ],
        whatItMeans: [
          { label: 'xp += 250', description: 'Updates mutable var state' }
        ],
        whatChanged: 'Demonstrated state mutation within a profile.'
      },
      {
        id: 'card-boss-3',
        number: '03',
        title: 'Formatted console reports',
        language: 'Kotlin',
        subtitle: 'Using print and println for structured reports.',
        code: [
          'println("=================")',
          'println("PROFILE COMPLETE")',
          'println("=================")'
        ],
        whatItMeans: [
          { label: 'Banners', description: 'Creates clean visual terminal interfaces' }
        ],
        whatChanged: 'Crafted production-ready terminal output.'
      }
    ]
  },
  predict: {
    title: 'Predict Capstone Program Output',
    subtitle: 'Test your holistic understanding of World 1 concepts.',
    questions: [
      {
        id: 'pred-boss-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Comprehensive Profile Evaluation',
        topicMeta: 'World 1 Synthesis',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val tag = \'@\'',
          '    val user = "alex"',
          '    var level = 1',
          '    level = 2',
          '    println("$tag$user: Level $level")',
          '}'
        ],
        prompt: 'What will this profile program output?',
        options: [
          { id: 'A', label: '@alex: Level 2', isCorrect: true },
          { id: 'B', label: '@alex: Level 1', isCorrect: false },
          { id: 'C', label: '$tag$user: Level $level', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: '"$tag$user: Level $level"',
          detail: 'tag (\'@\') and user ("alex") and the updated level (2) interpolate cleanly to "@alex: Level 2".'
        }
      },
      {
        id: 'pred-boss-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Double and Boolean formatting',
        topicMeta: 'Data type formatting',
        language: 'Kotlin',
        code: [
          'val score = 9.5',
          'val passed = score >= 5.0',
          'println("Passed: $passed ($score/10)")'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'Passed: true (9.5/10)', isCorrect: true },
          { id: 'B', label: 'Passed: false (9.5/10)', isCorrect: false },
          { id: 'C', label: 'Passed: true (10/10)', isCorrect: false },
          { id: 'D', label: 'Passed: 9.5', isCorrect: false }
        ],
        explanation: {
          codeRef: 'score >= 5.0',
          detail: '9.5 is >= 5.0, so passed is true, printing "Passed: true (9.5/10)".'
        }
      },
      {
        id: 'pred-boss-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'The fundamental rule of val',
        topicMeta: 'World 1 Core Rule',
        language: 'Kotlin',
        prompt: 'In Kotlin, which statement best defines the difference between val and var?',
        options: [
          { id: 'A', label: 'val cannot be reassigned once set; var can be reassigned', isCorrect: true },
          { id: 'B', label: 'val is for numbers; var is for text', isCorrect: false },
          { id: 'C', label: 'val is only used inside main(); var is used anywhere', isCorrect: false },
          { id: 'D', label: 'val variables require explicit types; var never does', isCorrect: false }
        ],
        explanation: {
          codeRef: 'val vs var',
          detail: 'val defines read-only references; var defines mutable variables that can be reassigned.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 50,
    title: 'Build the Personal Profile Program',
    description:
      'Declare the user profile variables:\n' +
      '• val name = "CodeDo"\n' +
      '• val grade = \'A\'\n' +
      '• var score = 88 (mutable, since a bonus still needs to be added)\n' +
      '• val bonus = 12\n\n' +
      '1. Add bonus to score using score += bonus.\n\n' +
      '2. Compute val passed: Boolean = score >= 90.\n\n' +
      '3. Print the profile summary:\n' +
      '"User: $name | Grade: $grade | Score: $score | Passed: $passed"',
    requirements: {
      name: 'main',
      params: '(none)',
      returns: 'Unit'
    },
    fileName: 'ProfileProgram.kt',
    initialCode: `fun main() {
    val name = "CodeDo"
    val grade = 'A'
    var score = 88
    val bonus = 12

    // 1. Add bonus to score using +=:

    // 2. Compute passed (score >= 90):

    // 3. Print "User: $name | Grade: $grade | Score: $score | Passed: $passed":
}`,
    solutionCode: `fun main() {
    val name = "CodeDo"
    val grade = 'A'
    var score = 88
    val bonus = 12
    score += bonus
    val passed: Boolean = score >= 90
    println("User: $name | Grade: $grade | Score: $score | Passed: $passed")
}`,
    sampleInput: 'main()',
    expectedOutput: 'User: CodeDo | Grade: A | Score: 100 | Passed: true',
    testCase: {
      call: '',
      expected: 'User: CodeDo | Grade: A | Score: 100 | Passed: true'
    }
  },
  debug: {
    title: 'Fix the Broken Profile Program',
    subtitle: 'Find and resolve the multiple syntax and type bugs in this capstone program.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'syntax',
    bugLabel: 'Multiple Syntax & Type Errors in Capstone',
    brokenCode: `fun main() {
    val name: String = "Hero
    val tier: Char = "S"
    println("Name: $name, Tier: $tier")
}`,
    fixedCode: `fun main() {
    val name: String = "Hero"
    val tier: Char = 'S'
    println("Name: $name, Tier: $tier")
}`,
    expectedOutput: 'Name: Hero, Tier: S',
    hints: [
      'There is an unclosed quote on the string "Hero".',
      'The variable tier is typed as Char, but uses double quotes ("S").',
      'Close "Hero" with a double quote and use single quotes for \'S\'.'
    ],
    explanation: 'String literals require closing double quotes, and Char literals must be wrapped in single quotes.'
  },
  mastered: {
    topicTitle: 'Personal Profile Program',
    summary: 'You defeated the World 1 Boss! This capstone combined String, Char, Int, var mutation, and a Boolean comparison into one working profile program -- the individual Long, Float, and Double lessons each verified those types separately.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Core syntax mastered', subtitle: 'main(), println(), and comments' },
      { title: 'Types integrated in this capstone', subtitle: 'String, Char, Int (with var mutation), and a comparison-derived Boolean' },
      { title: 'State updates & templates', subtitle: 'Reassigning a var with += and formatting the result with $template interpolation' },
      { title: 'World 1 Boss Defeated', subtitle: 'Awarded Kotlin Awakening Master Badge' }
    ],
    xpEarned: 50,
    streakDays: 1,
    accuracy: '100%'
  }
};
