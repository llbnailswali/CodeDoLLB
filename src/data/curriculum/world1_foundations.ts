import { LessonQuestion } from '../../types';

export const WORLD_1_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Welcome to Kotlin & The Entry Point
  // =========================================================================
  {
    id: 'w1-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'welcome-kotlin',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Basics • Entry Point',
    skill: 'syntax',
    difficulty: 1,
    xpReward: 15,
    question: 'What is the mandatory entry-point function name for any executable Kotlin program?',
    codeFileName: 'Main.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun _____() {',
      '    println("Hello, CodeDo!")',
      '}'
    ],
    options: [
      { id: 'A', title: 'main', subtitle: 'Standard program entry point', isCorrect: true },
      { id: 'B', title: 'start', subtitle: 'Android lifecycle method', isCorrect: false },
      { id: 'C', title: 'run', subtitle: 'Kotlin scope function', isCorrect: false },
      { id: 'D', title: 'execute', subtitle: 'Custom executor method', isCorrect: false }
    ],
    hint: 'Kotlin programs begin execution at the top-level main() function.',
    explanation: {
      title: 'The main() Entry Point',
      text: 'Every Kotlin standalone application begins at the `fun main()` entry point. In modern Kotlin (1.3+), parameters are optional.',
      highlights: ['fun main()', 'entry point', 'println']
    }
  },
  {
    id: 'w1-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'welcome-kotlin',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Console Output • println vs print',
    skill: 'syntax',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the exact output of executing these two print calls?',
    codeFileName: 'ConsoleDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'print("Kotlin ")',
      'println("Rocks!")'
    ],
    options: [
      { id: 'A', title: 'Kotlin Rocks!', subtitle: 'Printed on the same single line', isCorrect: true },
      { id: 'B', title: 'Kotlin\\nRocks!', subtitle: 'Printed on two separate lines', isCorrect: false },
      { id: 'C', title: '"Kotlin Rocks!"', subtitle: 'Includes double quote characters', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'print() is invalid without ln', isCorrect: false }
    ],
    hint: 'print() outputs text without appending a newline, while println() appends a newline after outputting text.',
    explanation: {
      title: 'print() vs println()',
      text: 'Because the first call uses `print()`, the cursor remains on the same line, resulting in "Kotlin Rocks!" together.',
      highlights: ['print()', 'println()', 'no newline']
    }
  },
  {
    id: 'w1-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'welcome-kotlin',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Syntax • Function Declaration',
    skill: 'syntax',
    difficulty: 1,
    xpReward: 20,
    question: 'Which keyword is used to declare a function in Kotlin?',
    codeFileName: 'App.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '_____ greetUser() {',
      '    println("Welcome developer!")',
      '}'
    ],
    options: [
      { id: 'A', title: 'fun', subtitle: 'Kotlin function declaration keyword', isCorrect: true },
      { id: 'B', title: 'def', subtitle: 'Python/Ruby function keyword', isCorrect: false },
      { id: 'C', title: 'function', subtitle: 'JavaScript function keyword', isCorrect: false },
      { id: 'D', title: 'void', subtitle: 'Java return type keyword', isCorrect: false }
    ],
    hint: 'Kotlin uses the short 3-letter keyword "fun" (short for function) to define functions.',
    explanation: {
      title: 'The "fun" Keyword',
      text: 'In Kotlin, all functions are declared using the `fun` keyword, regardless of whether they return a value or Unit.',
      highlights: ['fun', 'function', 'declaration']
    }
  },
  {
    id: 'w1-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'welcome-kotlin',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Syntax Cleanliness',
    skill: 'syntax',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line causes a Kotlin syntax error?',
    codeFileName: 'GreetBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun main() {',
      '    System.out.println("Hello") // Line 2',
      '    System.print("Hi")          // Line 3',
      '}'
    ],
    options: [
      { id: 'A', title: 'Line 3: System.print("Hi")', subtitle: 'print() is not a method on Java System', isCorrect: true },
      { id: 'B', title: 'Line 1: fun main()', subtitle: 'Missing class wrapper', isCorrect: false },
      { id: 'C', title: 'Line 2: System.out.println', subtitle: 'Java interoperability error', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Valid Java syntax in Kotlin', isCorrect: false }
    ],
    hint: 'While Kotlin can interop with Java System.out, the method is System.out.print, not System.print. Prefer idiomatic Kotlin print()!',
    explanation: {
      title: 'Idiomatic Kotlin vs Java Interop',
      text: 'Line 3 is invalid. Always use Kotlin\'s idiomatic top-level `println()` and `print()` functions directly.',
      highlights: ['Line 3', 'println()', 'idiomatic']
    }
  },
  {
    id: 'w1-l1-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'welcome-kotlin',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Tooling • File Extensions',
    skill: 'syntax',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the standard file extension for source files written in Kotlin?',
    codeFileName: 'ProjectFiles.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Project file: MainActivity._____',
      'class MainActivity'
    ],
    options: [
      { id: 'A', title: '.kt', subtitle: 'Standard Kotlin source file extension', isCorrect: true },
      { id: 'B', title: '.kts', subtitle: 'Kotlin script file extension only', isCorrect: false },
      { id: 'C', title: '.kot', subtitle: 'Unsupported format', isCorrect: false },
      { id: 'D', title: '.java', subtitle: 'Java source file', isCorrect: false }
    ],
    hint: 'Kotlin files end with .kt (or .kts for build scripts).',
    explanation: {
      title: 'Kotlin File Types',
      text: 'Standard Kotlin source code files use `.kt`. Gradle build scripts written in Kotlin use `.kts`.',
      highlights: ['.kt', 'Kotlin source', '.kts']
    }
  },

  // =========================================================================
  // LESSON 2: Variables & Type Inference
  // =========================================================================
  {
    id: 'w1-l2-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'variables',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Variables • Immutability',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'Which keyword declares a read-only (immutable) variable in Kotlin?',
    codeFileName: 'Variables.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val appName: String = "CodeDo"',
      '// appName = "NewApp" // Error: Val cannot be reassigned',
      'println(appName)'
    ],
    options: [
      { id: 'A', title: 'val', subtitle: 'Immutable read-only reference', isCorrect: true },
      { id: 'B', title: 'var', subtitle: 'Mutable variable', isCorrect: false },
      { id: 'C', title: 'const', subtitle: 'Compile-time constant modifier', isCorrect: false },
      { id: 'D', title: 'let', subtitle: 'Scoping function', isCorrect: false }
    ],
    hint: 'In Kotlin, "val" is value (immutable), while "var" stands for variable (mutable).',
    explanation: {
      title: 'val = Value (Read-Only)',
      text: 'In Kotlin, `val` declares a read-only reference. Once assigned, its value cannot be reassigned.',
      highlights: ['val', 'immutable', 'read-only']
    }
  },
  {
    id: 'w1-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'variables',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Variables • Type Inference',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'What type does Kotlin automatically infer for the variable "score"?',
    codeFileName: 'Inference.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val score = 42',
      'println(score::class.simpleName)'
    ],
    options: [
      { id: 'A', title: 'Int', subtitle: '32-bit signed integer inferred from 42', isCorrect: true },
      { id: 'B', title: 'Double', subtitle: 'Floating point number', isCorrect: false },
      { id: 'C', title: 'Long', subtitle: 'Requires L suffix (e.g., 42L)', isCorrect: false },
      { id: 'D', title: 'Number', subtitle: 'Abstract base class', isCorrect: false }
    ],
    hint: 'Whole numbers without decimal points and without an L suffix default to Int in Kotlin.',
    explanation: {
      title: 'Automatic Type Inference',
      text: 'Kotlin compiler inspects the assigned literal 42 and infers `Int` automatically without requiring an explicit type annotation.',
      highlights: ['score = 42', 'Int', 'type inference']
    }
  },
  {
    id: 'w1-l2-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'variables',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Variables • Explicit Annotation',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the declaration with an explicit String type annotation:',
    codeFileName: 'User.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val username_____ = "AlexCoder"',
      'println(username)'
    ],
    options: [
      { id: 'A', title: ': String', subtitle: 'Colon followed by Kotlin String type', isCorrect: true },
      { id: 'B', title: ' String', subtitle: 'Missing colon separator', isCorrect: false },
      { id: 'C', title: '-> String', subtitle: 'Function return arrow', isCorrect: false },
      { id: 'D', title: '<String>', subtitle: 'Generic type argument', isCorrect: false }
    ],
    hint: 'In Kotlin, type annotations follow the variable name preceded by a colon (:).',
    explanation: {
      title: 'Variable Type Annotations',
      text: 'The syntax is `val name: Type = value`. The colon denotes the type specification.',
      highlights: [': String', 'colon notation', 'explicit type']
    }
  },
  {
    id: 'w1-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'variables',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Type Safety',
    skill: 'variables',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line fails compilation due to a type mismatch?',
    codeFileName: 'Mismatch.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var age: Int = 20',
      'age = "twenty-one" // Line 2',
      'println(age)'
    ],
    options: [
      { id: 'A', title: 'Line 2: age = "twenty-one"', subtitle: 'Cannot assign String to Int variable', isCorrect: true },
      { id: 'B', title: 'Line 1: var age: Int = 20', subtitle: 'Invalid var declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: println(age)', subtitle: 'Invalid print call', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Kotlin dynamically changes types', isCorrect: false }
    ],
    hint: 'Kotlin is statically typed. Even with "var", a variable cannot change its declared type.',
    explanation: {
      title: 'Static Typing in Kotlin',
      text: 'Although `var` allows reassignment, the new value must match the original declared type (`Int`). Assigning a `String` causes a compiler error.',
      highlights: ['Line 2', 'Type mismatch', 'statically typed']
    }
  },
  {
    id: 'w1-l2-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'variables',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Best Practices • Immutability First',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the official Kotlin recommended practice when choosing between val and var?',
    codeFileName: 'CleanCode.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Best practice in Kotlin coding conventions:',
      '// Always prefer _____ unless mutation is strictly required'
    ],
    options: [
      { id: 'A', title: 'val by default', subtitle: 'Promotes immutability and thread safety', isCorrect: true },
      { id: 'B', title: 'var by default', subtitle: 'Allows maximum flexibility', isCorrect: false },
      { id: 'C', title: 'const by default', subtitle: 'Restricted only to primitive top-levels', isCorrect: false },
      { id: 'D', title: 'Either is identical in performance', subtitle: 'Style preference only', isCorrect: false }
    ],
    hint: 'Kotlin conventions recommend favoring immutability whenever possible to reduce side effects.',
    explanation: {
      title: 'Immutability First',
      text: 'Always declare variables with `val` by default. Only change to `var` if the value genuinely needs to be reassigned.',
      highlights: ['val by default', 'immutability', 'clean code']
    }
  },

  // =========================================================================
  // LESSON 3: val vs var (Mutability Decisions)
  // =========================================================================
  {
    id: 'w1-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'val-vs-var',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Mutability • Reassignment',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'Which variable can be reassigned to a new value after its initial declaration?',
    codeFileName: 'Mutability.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val maxScore = 100',
      'var currentScore = 0'
    ],
    options: [
      { id: 'A', title: 'currentScore only', subtitle: 'Declared with mutable var', isCorrect: true },
      { id: 'B', title: 'maxScore only', subtitle: 'Declared with val', isCorrect: false },
      { id: 'C', title: 'Both variables', subtitle: 'All Kotlin variables can reassign', isCorrect: false },
      { id: 'D', title: 'Neither variable', subtitle: 'Numbers are immutable', isCorrect: false }
    ],
    hint: '"var" is mutable (reassignable), while "val" is read-only.',
    explanation: {
      title: 'var Enables Reassignment',
      text: 'Only `currentScore` can be reassigned because it was declared with `var`. Attempting to reassign `maxScore` will fail compilation.',
      highlights: ['currentScore', 'var', 'reassignable']
    }
  },
  {
    id: 'w1-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'val-vs-var',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Mutability • Counter Update',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the final printed value of counter?',
    codeFileName: 'Counter.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var counter = 10',
      'counter = counter + 5',
      'counter = counter * 2',
      'println(counter)'
    ],
    options: [
      { id: 'A', title: '30', subtitle: '(10 + 5) * 2 = 30', isCorrect: true },
      { id: 'B', title: '25', subtitle: '10 + (5 * 2) = 20', isCorrect: false },
      { id: 'C', title: '15', subtitle: 'Second assignment missed', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Cannot reassign counter', isCorrect: false }
    ],
    hint: 'Trace step-by-step: 10 + 5 becomes 15, then 15 * 2 becomes 30.',
    explanation: {
      title: 'Step-by-Step State Mutation',
      text: 'First counter is 10, then updated to 15, then multiplied by 2 to yield 30.',
      highlights: ['counter = 10', '15', '30']
    }
  },
  {
    id: 'w1-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'val-vs-var',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Code Completion • Mutability',
    skill: 'variables',
    difficulty: 1,
    xpReward: 20,
    question: 'Choose the correct keyword so that the level variable can be incremented later:',
    codeFileName: 'Player.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '_____ level = 1',
      'level = level + 1',
      'println("Level: $level")'
    ],
    options: [
      { id: 'A', title: 'var', subtitle: 'Allows reassignment for incrementing', isCorrect: true },
      { id: 'B', title: 'val', subtitle: 'Causes compiler error on reassignment', isCorrect: false },
      { id: 'C', title: 'set', subtitle: 'Property accessor keyword', isCorrect: false },
      { id: 'D', title: 'mutable', subtitle: 'Not a variable keyword in Kotlin', isCorrect: false }
    ],
    hint: 'If a variable needs to change over time (like a player level or score), use var.',
    explanation: {
      title: 'Choosing var for Changing State',
      text: 'Because `level` is reassigned on the next line (`level = level + 1`), it must be declared with `var`.',
      highlights: ['var level = 1', 'reassigned']
    }
  },
  {
    id: 'w1-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'val-vs-var',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Mutability Violation',
    skill: 'variables',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Which line causes a Kotlin compilation error?',
    codeFileName: 'Config.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val apiKey = "SECRET_123"',
      'apiKey = "NEW_SECRET" // Line 2',
      'println(apiKey)'
    ],
    options: [
      { id: 'A', title: 'Line 2: apiKey = "NEW_SECRET"', subtitle: 'Val cannot be reassigned', isCorrect: true },
      { id: 'B', title: 'Line 1: val apiKey', subtitle: 'Missing explicit type', isCorrect: false },
      { id: 'C', title: 'Line 3: println(apiKey)', subtitle: 'Invalid print statement', isCorrect: false },
      { id: 'D', title: 'No error', subtitle: 'Strings can be reassigned', isCorrect: false }
    ],
    hint: 'Look closely at Line 1. "apiKey" is defined with "val", so reassigning it on Line 2 is forbidden.',
    explanation: {
      title: 'Val Cannot Be Reassigned',
      text: 'Line 2 fails with the Kotlin compiler error: "Val cannot be reassigned". To allow reassignment, declare `apiKey` with `var`.',
      highlights: ['Line 2', 'Val cannot be reassigned', 'var vs val']
    }
  },
  {
    id: 'w1-l3-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'val-vs-var',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Architecture • Mutability Reasoning',
    skill: 'variables',
    difficulty: 2,
    xpReward: 25,
    question: 'Why do modern Kotlin and Android developers strongly prefer val over var?',
    codeFileName: 'Reasoning.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Architectural decision:',
      'val userToken = fetchToken()'
    ],
    options: [
      { id: 'A', title: 'Prevents unintended side effects and race conditions', subtitle: 'Thread safe and deterministic', isCorrect: true },
      { id: 'B', title: 'val runs 10x faster in the JVM', subtitle: 'Incorrect performance claim', isCorrect: false },
      { id: 'C', title: 'var takes double the memory', subtitle: 'Memory usage is identical', isCorrect: false },
      { id: 'D', title: 'val allows null values whereas var forbids them', subtitle: 'Nullability is independent of mutability', isCorrect: false }
    ],
    hint: 'Immutable references guarantee that values cannot be mutated unexpectedly by other parts of the code.',
    explanation: {
      title: 'The Safety of Immutability',
      text: 'Using `val` guarantees that a reference will never change once initialized, dramatically reducing bugs in asynchronous and multi-threaded programs.',
      highlights: ['Prevents side effects', 'thread safe', 'deterministic']
    }
  },

  // =========================================================================
  // LESSON 4: Data Types (Int, Double, Boolean, Char, String)
  // =========================================================================
  {
    id: 'w1-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'data-types',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Data Types • Primitive Recognition',
    skill: 'data-types',
    difficulty: 1,
    xpReward: 20,
    question: 'Which of the following is the 64-bit floating point number type in Kotlin?',
    codeFileName: 'Types.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val price: _____ = 19.99',
      'println(price)'
    ],
    options: [
      { id: 'A', title: 'Double', subtitle: '64-bit standard floating point type', isCorrect: true },
      { id: 'B', title: 'Float', subtitle: '32-bit single precision (requires 19.99f)', isCorrect: false },
      { id: 'C', title: 'Decimal', subtitle: 'C# type (not native in Kotlin)', isCorrect: false },
      { id: 'D', title: 'Real', subtitle: 'Pascal/SQL type', isCorrect: false }
    ],
    hint: 'Floating point numbers with decimal points default to Double in Kotlin.',
    explanation: {
      title: 'Kotlin Numeric Types',
      text: 'In Kotlin, `Double` represents 64-bit IEEE 754 floating point numbers. Literal numbers like `19.99` default to `Double`.',
      highlights: ['Double', '19.99', 'floating point']
    }
  },
  {
    id: 'w1-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'data-types',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Data Types • Char vs String',
    skill: 'data-types',
    difficulty: 2,
    xpReward: 20,
    question: 'Which delimiter is used for Char and which for String in Kotlin?',
    codeFileName: 'Characters.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val letter: Char = \'K\'',
      'val word: String = "Kotlin"',
      'println("$letter is in $word")'
    ],
    options: [
      { id: 'A', title: 'Single quotes for Char (\' \'), double quotes for String (" ")', subtitle: 'Standard Kotlin literal rules', isCorrect: true },
      { id: 'B', title: 'Double quotes for both Char and String', subtitle: 'Invalid for Char in Kotlin', isCorrect: false },
      { id: 'C', title: 'Backticks (` `) for Char, single quotes for String', subtitle: 'Backticks are for identifiers only', isCorrect: false },
      { id: 'D', title: 'Single quotes can be used interchangeably', subtitle: 'Single quotes are exclusively for Char', isCorrect: false }
    ],
    hint: 'In Kotlin, single quotes \'A\' are strictly for a single Char. Double quotes "A" create a String.',
    explanation: {
      title: 'Char vs String Literals',
      text: '`Char` literals are always enclosed in single quotes (`\'K\'`). `String` literals require double quotes (`"Kotlin"`).',
      highlights: ['\'K\' for Char', '"Kotlin" for String']
    }
  },
  {
    id: 'w1-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'data-types',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Data Types • Explicit Conversion',
    skill: 'data-types',
    difficulty: 2,
    xpReward: 25,
    question: 'Kotlin does not perform implicit numeric widening. Complete the explicit conversion from Int to Long:',
    codeFileName: 'Convert.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val smallNum: Int = 100',
      'val bigNum: Long = smallNum._____()',
      'println(bigNum)'
    ],
    options: [
      { id: 'A', title: 'toLong', subtitle: 'Kotlin explicit number conversion method', isCorrect: true },
      { id: 'B', title: 'asLong', subtitle: 'Cast syntax (invalid)', isCorrect: false },
      { id: 'C', title: 'parseLong', subtitle: 'Java static helper on Long', isCorrect: false },
      { id: 'D', title: 'castToLong', subtitle: 'Non-existent method', isCorrect: false }
    ],
    hint: 'In Kotlin, all numeric types provide explicit helper functions like toInt(), toLong(), toDouble().',
    explanation: {
      title: 'No Implicit Numeric Widening',
      text: 'Unlike Java, Kotlin will not silently convert an `Int` to a `Long`. You must call `.toLong()` explicitly.',
      highlights: ['.toLong()', 'explicit conversion', 'type safety']
    }
  },
  {
    id: 'w1-l4-c4',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'data-types',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Type Compatibility',
    skill: 'data-types',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line fails compilation due to an illegal assignment?',
    codeFileName: 'WideningBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val integerVal: Int = 42',
      'val doubleVal: Double = integerVal // Line 2',
      'println(doubleVal)'
    ],
    options: [
      { id: 'A', title: 'Line 2: val doubleVal: Double = integerVal', subtitle: 'Cannot assign Int to Double without .toDouble()', isCorrect: true },
      { id: 'B', title: 'Line 1: val integerVal: Int = 42', subtitle: 'Invalid Int declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: println(doubleVal)', subtitle: 'Invalid print statement', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Automatic widening occurs in Kotlin', isCorrect: false }
    ],
    hint: 'In Kotlin, Int is not a subtype of Double. You must write integerVal.toDouble().',
    explanation: {
      title: 'Explicit Number Conversion Required',
      text: 'Line 2 fails compilation. In Kotlin, numeric types do not automatically widen. Use `integerVal.toDouble()` instead.',
      highlights: ['Line 2', 'integerVal.toDouble()', 'no implicit widening']
    }
  },
  {
    id: 'w1-l4-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'data-types',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Data Types • Boolean Values',
    skill: 'data-types',
    difficulty: 1,
    xpReward: 20,
    question: 'What are the only two valid literal values for a Kotlin Boolean type?',
    codeFileName: 'Booleans.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val isOnline: Boolean = _____',
      'val isReady: Boolean = _____'
    ],
    options: [
      { id: 'A', title: 'true and false', subtitle: 'Lowercase Boolean literals', isCorrect: true },
      { id: 'B', title: '1 and 0', subtitle: 'C-style numeric truthiness (invalid in Kotlin)', isCorrect: false },
      { id: 'C', title: 'True and False', subtitle: 'Python title-case keywords (invalid in Kotlin)', isCorrect: false },
      { id: 'D', title: 'YES and NO', subtitle: 'Objective-C literals', isCorrect: false }
    ],
    hint: 'Kotlin uses lowercase "true" and "false" just like Java and JavaScript.',
    explanation: {
      title: 'Boolean Literals',
      text: 'The `Boolean` type in Kotlin has exactly two literal values: `true` and `false`. Numbers (like 0 or 1) cannot be used as Booleans.',
      highlights: ['true', 'false', 'Boolean']
    }
  },

  // =========================================================================
  // LESSON 5: Operators & Arithmetic Precedence
  // =========================================================================
  {
    id: 'w1-l5-c1',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'operators',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Operators • Integer Division',
    skill: 'operators',
    difficulty: 2,
    xpReward: 20,
    question: 'What does this integer division print to the console?',
    codeFileName: 'Division.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val a = 5',
      'val b = 2',
      'println(a / b)'
    ],
    options: [
      { id: 'A', title: '2', subtitle: 'Integer division truncates decimals', isCorrect: true },
      { id: 'B', title: '2.5', subtitle: 'Floating point result', isCorrect: false },
      { id: 'C', title: '3', subtitle: 'Rounded up', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Division by integer error', isCorrect: false }
    ],
    hint: 'When dividing two Int values in Kotlin, the fractional part is truncated (dropped), returning an Int.',
    explanation: {
      title: 'Integer Division Truncation',
      text: 'Because both `a` and `b` are `Int`, `5 / 2` evaluates to `2`. To get `2.5`, at least one operand must be a `Double` (e.g., `5.0 / 2`).',
      highlights: ['5 / 2 = 2', 'truncation', 'Int division']
    }
  },
  {
    id: 'w1-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'operators',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Operators • Modulo Remainder',
    skill: 'operators',
    difficulty: 2,
    xpReward: 20,
    question: 'What is the output of the modulo (%) operator in this snippet?',
    codeFileName: 'Modulo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val remainder = 17 % 5',
      'println(remainder)'
    ],
    options: [
      { id: 'A', title: '2', subtitle: '17 divided by 5 is 3 with remainder 2', isCorrect: true },
      { id: 'B', title: '3', subtitle: 'Quotient result', isCorrect: false },
      { id: 'C', title: '0.4', subtitle: 'Percentage calculation', isCorrect: false },
      { id: 'D', title: '1', subtitle: 'Off by one', isCorrect: false }
    ],
    hint: 'The modulo operator (%) calculates the remainder after integer division.',
    explanation: {
      title: 'The Modulo (%) Operator',
      text: '17 = 5 * 3 + 2. The remainder is `2`. Modulo is frequently used to test even/odd numbers or wrap indices.',
      highlights: ['17 % 5 = 2', 'remainder', 'modulo']
    }
  },
  {
    id: 'w1-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'operators',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Operators • Compound Assignment',
    skill: 'operators',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the snippet to add 10 to the score using compound assignment:',
    codeFileName: 'ScoreBonus.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var score = 50',
      'score _____ 10',
      'println(score)'
    ],
    options: [
      { id: 'A', title: '+=', subtitle: 'Add and assign operator', isCorrect: true },
      { id: 'B', title: '=+', subtitle: 'Assign positive number', isCorrect: false },
      { id: 'C', title: '++', subtitle: 'Unary increment (adds 1 only)', isCorrect: false },
      { id: 'D', title: ':=', subtitle: 'Go/Pascal assignment operator', isCorrect: false }
    ],
    hint: 'The compound operator "+=" adds the right operand to the variable and assigns the result.',
    explanation: {
      title: 'Compound Assignment (+=)',
      text: '`score += 10` is shorthand for `score = score + 10`. It updates score from 50 to 60.',
      highlights: ['+=', 'score += 10', 'compound operator']
    }
  },
  {
    id: 'w1-l5-c4',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'operators',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Operators • Precedence Rules',
    skill: 'operators',
    difficulty: 2,
    xpReward: 25,
    question: 'What will this expression evaluate to?',
    codeFileName: 'Precedence.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val result = 2 + 3 * 4',
      'println(result)'
    ],
    options: [
      { id: 'A', title: '14', subtitle: 'Multiplication (3 * 4 = 12) takes precedence before addition', isCorrect: true },
      { id: 'B', title: '20', subtitle: '(2 + 3) * 4 = 20', isCorrect: false },
      { id: 'C', title: '24', subtitle: 'Incorrect evaluation', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Requires explicit parentheses', isCorrect: false }
    ],
    hint: 'Multiplication (*) has higher precedence than addition (+).',
    explanation: {
      title: 'Operator Precedence',
      text: '`3 * 4` is evaluated first to produce `12`, then `2 + 12` results in `14`. Always use parentheses `(2 + 3) * 4` if you need addition first.',
      highlights: ['14', '3 * 4 first', 'precedence']
    }
  },
  {
    id: 'w1-l5-c5',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'operators',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Increment On Val',
    skill: 'operators',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line causes a Kotlin compilation error?',
    codeFileName: 'IncrementBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val lives = 3',
      'lives++ // Line 2',
      'println(lives)'
    ],
    options: [
      { id: 'A', title: 'Line 2: lives++', subtitle: 'Cannot increment a val (read-only)', isCorrect: true },
      { id: 'B', title: 'Line 1: val lives = 3', subtitle: 'Missing type annotation', isCorrect: false },
      { id: 'C', title: 'Line 3: println(lives)', subtitle: 'Invalid print call', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: '++ is valid on all numbers', isCorrect: false }
    ],
    hint: 'Incrementing (lives++) mutates the variable. Can you mutate a "val"?',
    explanation: {
      title: 'Increment Requires Mutable var',
      text: '`lives++` reassigns `lives = lives + 1`. Since `lives` is declared with `val`, Line 2 triggers a compiler error. Change to `var lives = 3`.',
      highlights: ['Line 2', 'lives++', 'val cannot be incremented']
    }
  },

  // =========================================================================
  // LESSON 6: Strings & Raw Multiline Literals
  // =========================================================================
  {
    id: 'w1-l6-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'strings',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Strings • Raw String Delimiter',
    skill: 'strings',
    difficulty: 1,
    xpReward: 20,
    question: 'How do you define a multiline raw string that does not require escape characters in Kotlin?',
    codeFileName: 'RawString.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val query = _____',
      '    SELECT * FROM users',
      '    WHERE status = \'active\'',
      '_____'
    ],
    options: [
      { id: 'A', title: 'Triple quotes (""")', subtitle: 'Standard Kotlin raw string literal', isCorrect: true },
      { id: 'B', title: 'Single quotes (\' \')', subtitle: 'Reserved for single Char literals', isCorrect: false },
      { id: 'C', title: 'Backticks (` `)', subtitle: 'Markdown/JS template syntax', isCorrect: false },
      { id: 'D', title: 'Double brackets ([[ ]])', subtitle: 'Lua syntax', isCorrect: false }
    ],
    hint: 'Kotlin raw strings are enclosed by three double quotes (""").',
    explanation: {
      title: 'Raw Multiline Strings',
      text: 'Raw strings in Kotlin are demarcated by `"""` triple quotes. They can span multiple lines and contain newlines without `\\n`.',
      highlights: ['"""', 'raw string', 'triple quotes']
    }
  },
  {
    id: 'w1-l6-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'strings',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Strings • trimIndent()',
    skill: 'strings',
    difficulty: 2,
    xpReward: 25,
    question: 'What does the .trimIndent() function do to a raw multiline string?',
    codeFileName: 'IndentDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val message = """',
      '    Hello',
      '    World',
      '""".trimIndent()'
    ],
    options: [
      { id: 'A', title: 'Detects and strips the common minimal leading indentation', subtitle: 'Aligns text cleanly to the left margin', isCorrect: true },
      { id: 'B', title: 'Removes all spaces between words', subtitle: 'Would produce "HelloWorld"', isCorrect: false },
      { id: 'C', title: 'Removes all newline breaks into one line', subtitle: 'Would flatten the string', isCorrect: false },
      { id: 'D', title: 'Converts all letters to lowercase', subtitle: 'That is .lowercase()', isCorrect: false }
    ],
    hint: 'trimIndent() removes the uniform whitespace padding that you wrote in your source code to align with code indentation.',
    explanation: {
      title: 'Clean Margins with trimIndent()',
      text: '`trimIndent()` detects the shared leading whitespace prefix on all non-blank lines and removes it so your string isn\'t awkwardly indented.',
      highlights: ['trimIndent()', 'leading indentation', 'raw strings']
    }
  },
  {
    id: 'w1-l6-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'strings',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Strings • String Properties',
    skill: 'strings',
    difficulty: 1,
    xpReward: 20,
    question: 'How do you check the character count of a String in Kotlin?',
    codeFileName: 'StrLength.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val text = "CodeDo"',
      'val count = text._____',
      'println(count)'
    ],
    options: [
      { id: 'A', title: 'length', subtitle: 'Property returning character count', isCorrect: true },
      { id: 'B', title: 'size', subtitle: 'Collection property (not on String)', isCorrect: false },
      { id: 'C', title: 'count()', subtitle: 'Method from CharSequence', isCorrect: false },
      { id: 'D', title: 'len()', subtitle: 'Python built-in', isCorrect: false }
    ],
    hint: 'In Kotlin, strings have a .length property, just like in Java.',
    explanation: {
      title: 'The length Property',
      text: '`String.length` is a property in Kotlin that returns the number of characters in the string.',
      highlights: ['text.length', 'property', 'character count']
    }
  },
  {
    id: 'w1-l6-c4',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'strings',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Strings • Index Access',
    skill: 'strings',
    difficulty: 2,
    xpReward: 20,
    question: 'What is printed when accessing the character at index 1 of "Kotlin"?',
    codeFileName: 'IndexAccess.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val word = "Kotlin"',
      'println(word[1])'
    ],
    options: [
      { id: 'A', title: '\'o\'', subtitle: 'Zero-indexed: index 0 is K, index 1 is o', isCorrect: true },
      { id: 'B', title: '\'K\'', subtitle: 'First character (index 0)', isCorrect: false },
      { id: 'C', title: '\'t\'', subtitle: 'Third character (index 2)', isCorrect: false },
      { id: 'D', title: '"Kotlin"', subtitle: 'Full string', isCorrect: false }
    ],
    hint: 'Kotlin strings use 0-based indexing: index 0 = \'K\', index 1 = \'o\'.',
    explanation: {
      title: 'Bracket Indexing on Strings',
      text: 'Kotlin allows bracket indexing `word[1]` to retrieve individual characters. Since indexing is 0-based, index 1 is `\'o\'`.',
      highlights: ['word[1]', '\'o\'', 'zero-based indexing']
    }
  },
  {
    id: 'w1-l6-c5',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'strings',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Escape Character',
    skill: 'strings',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line fails to escape the quote inside the string?',
    codeFileName: 'EscapeQuote.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val title = "CodeDo"',
      'val quote = "She said, "Kotlin is fun!"" // Line 2',
      'println(quote)'
    ],
    options: [
      { id: 'A', title: 'Line 2: unescaped inner quotes', subtitle: 'Must use \\" inside double quotes or a raw string', isCorrect: true },
      { id: 'B', title: 'Line 1: val title = "CodeDo"', subtitle: 'Invalid assignment', isCorrect: false },
      { id: 'C', title: 'Line 3: println(quote)', subtitle: 'Invalid print statement', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Kotlin auto-escapes inner quotes', isCorrect: false }
    ],
    hint: 'Inside a standard double-quoted string, internal double quotes must be escaped with a backslash: \\".',
    explanation: {
      title: 'Escaping Double Quotes',
      text: 'Line 2 terminates the string prematurely. To include double quotes, use `\\"Kotlin is fun!\\"` or wrap in raw string `"""`.',
      highlights: ['Line 2', '\\"', 'escaping']
    }
  },

  // =========================================================================
  // LESSON 7: String Templates ($ and ${})
  // =========================================================================
  {
    id: 'w1-l7-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'string-templates',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Templates • Variable Prefix',
    skill: 'strings',
    difficulty: 1,
    xpReward: 20,
    question: 'Which character prefixes a variable name to interpolate it inside a Kotlin string template?',
    codeFileName: 'Greeting.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val hero = "Link"',
      'println("Welcome, _____hero!")'
    ],
    options: [
      { id: 'A', title: '$', subtitle: 'Standard Kotlin interpolation operator', isCorrect: true },
      { id: 'B', title: '@', subtitle: 'Annotation prefix', isCorrect: false },
      { id: 'C', title: '#', subtitle: 'Pre-processor prefix', isCorrect: false },
      { id: 'D', title: '&', subtitle: 'Reference address operator', isCorrect: false }
    ],
    hint: 'Use the dollar sign ($) directly before a variable name inside double quotes.',
    explanation: {
      title: 'String Interpolation with $',
      text: 'Prefixing a variable with `$` evaluates and embeds its value directly into the string: `"$hero"` becomes `"Link"`.',
      highlights: ['$', '$hero', 'string template']
    }
  },
  {
    id: 'w1-l7-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'string-templates',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Templates • Expression Evaluation',
    skill: 'strings',
    difficulty: 2,
    xpReward: 20,
    question: 'What is printed when evaluating an expression inside ${}?',
    codeFileName: 'Calculation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val base = 10',
      'val bonus = 5',
      'println("Total: ${base + bonus * 2}")'
    ],
    options: [
      { id: 'A', title: 'Total: 20', subtitle: '10 + (5 * 2) = 20 inside the template', isCorrect: true },
      { id: 'B', title: 'Total: 30', subtitle: '(10 + 5) * 2 = 30', isCorrect: false },
      { id: 'C', title: 'Total: ${base + bonus * 2}', subtitle: 'Literal printed without evaluation', isCorrect: false },
      { id: 'D', title: 'Total: 15', subtitle: 'Multiplication ignored', isCorrect: false }
    ],
    hint: 'Inside ${}, the code is evaluated as normal Kotlin code adhering to operator precedence: 5 * 2 = 10, then 10 + 10 = 20.',
    explanation: {
      title: 'Expressions in ${}',
      text: 'Any valid Kotlin expression can be enclosed in `${}`. Here `base + bonus * 2` computes `10 + 10 = 20`.',
      highlights: ['Total: 20', '${}', 'evaluated expression']
    }
  },
  {
    id: 'w1-l7-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'string-templates',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Templates • Property Access',
    skill: 'strings',
    difficulty: 2,
    xpReward: 20,
    question: 'When accessing a property like .length inside a template, which syntax is required?',
    codeFileName: 'TemplateProp.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val name = "CodeDo"',
      'println("Letters: _____name.length_____")'
    ],
    options: [
      { id: 'A', title: '${ and }', subtitle: 'Braces are required when calling properties or methods', isCorrect: true },
      { id: 'B', title: '$ and (empty)', subtitle: 'Without braces, only $name is parsed, printing ".length"', isCorrect: false },
      { id: 'C', title: '#{ and }', subtitle: 'Ruby/Bash syntax', isCorrect: false },
      { id: 'D', title: '{{ and }}', subtitle: 'Mustache template syntax', isCorrect: false }
    ],
    hint: 'For anything more complex than a simple variable name (like accessing .length), you must wrap with ${}.',
    explanation: {
      title: 'Property Access Requires ${}',
      text: 'Writing `$name.length` prints "CodeDo.length". To evaluate the property, you must write `${name.length}`.',
      highlights: ['${name.length}', 'braces required', 'property access']
    }
  },
  {
    id: 'w1-l7-c4',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'string-templates',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Templates • Escaping Literal Dollar',
    skill: 'strings',
    difficulty: 2,
    xpReward: 25,
    question: 'How do you print a literal dollar sign ($) before a number without triggering interpolation?',
    codeFileName: 'PriceTag.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val cost = 99',
      'println("Price is \\$$cost")'
    ],
    options: [
      { id: 'A', title: 'Price is $99', subtitle: '\\$ prints a literal $, and $cost prints 99', isCorrect: true },
      { id: 'B', title: 'Price is \\$99', subtitle: 'Backslash retained', isCorrect: false },
      { id: 'C', title: 'Price is 99', subtitle: 'Dollar sign removed', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Invalid escape sequence', isCorrect: false }
    ],
    hint: 'Use the escape sequence \\$ to output a literal dollar symbol.',
    explanation: {
      title: 'Escaping the Dollar Sign',
      text: 'In standard strings, `\\$` produces a literal `$` sign without initiating a template interpolation.',
      highlights: ['\\$$cost', 'Price is $99', 'escaping $']
    }
  },
  {
    id: 'w1-l7-c5',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'string-templates',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Template Syntax Error',
    skill: 'strings',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line does NOT evaluate the expression as intended?',
    codeFileName: 'TemplateBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val count = 5',
      'val msg = "Count is: $count + 1" // Line 2',
      'println(msg)'
    ],
    options: [
      { id: 'A', title: 'Line 2 prints "Count is: 5 + 1" instead of 6', subtitle: 'Missing curly braces ${count + 1}', isCorrect: true },
      { id: 'B', title: 'Line 1: val count = 5', subtitle: 'Invalid variable', isCorrect: false },
      { id: 'C', title: 'Line 3: println(msg)', subtitle: 'Invalid print', isCorrect: false },
      { id: 'D', title: 'Line 2 crashes at runtime', subtitle: 'Does not compile', isCorrect: false }
    ],
    hint: '$count only captures the variable "count". The " + 1" is treated as literal characters.',
    explanation: {
      title: 'Missing Curly Braces in Expression',
      text: 'To compute the addition inside the string, wrap the arithmetic in braces: `"${count + 1}"`. Without braces, only `$count` is interpolated.',
      highlights: ['Line 2', '${count + 1}', 'braces required']
    }
  },

  // =========================================================================
  // LESSON 8: Null Safety, Safe Call (?.) & Elvis (?:)
  // =========================================================================
  {
    id: 'w1-l8-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'null-safety',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Null Safety • Nullable Types',
    skill: 'null-safety',
    difficulty: 1,
    xpReward: 20,
    question: 'How do you declare a variable that CAN hold either a String or a null value in Kotlin?',
    codeFileName: 'Nullable.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// A variable that can safely hold null:',
      'val username: _____ = null'
    ],
    options: [
      { id: 'A', title: 'String?', subtitle: 'Question mark denotes a nullable type', isCorrect: true },
      { id: 'B', title: 'String', subtitle: 'Non-nullable type (assigning null causes compiler error)', isCorrect: false },
      { id: 'C', title: 'Nullable<String>', subtitle: 'C# generic style (not in Kotlin)', isCorrect: false },
      { id: 'D', title: 'Optional<String>', subtitle: 'Java Optional wrapper class', isCorrect: false }
    ],
    hint: 'Appending a question mark (?) after the type name makes it nullable in Kotlin.',
    explanation: {
      title: 'First-Class Nullable Types',
      text: 'In Kotlin, types are non-null by default. Appending `?` (e.g. `String?`) explicitly allows the variable to hold `null`.',
      highlights: ['String?', 'nullable', 'non-null by default']
    }
  },
  {
    id: 'w1-l8-c2',
    challengeType: 'output-prediction',
    worldId: 'world-1',
    lessonId: 'null-safety',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Null Safety • Safe Call Operator',
    skill: 'null-safety',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when accessing .length on a null reference using the safe call operator (?.):',
    codeFileName: 'SafeCall.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val nickname: String? = null',
      'println(nickname?.length)'
    ],
    options: [
      { id: 'A', title: 'null', subtitle: 'Safe call returns null without throwing NullPointerException', isCorrect: true },
      { id: 'B', title: '0', subtitle: 'Does not default to zero', isCorrect: false },
      { id: 'C', title: 'NullPointerException', subtitle: 'Crash prevented by ?.', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Safe call is fully valid', isCorrect: false }
    ],
    hint: 'The safe call operator (?.) returns null if the object is null, avoiding any runtime crash.',
    explanation: {
      title: 'The Safe Call Operator (?.)',
      text: '`nickname?.length` checks if `nickname` is null. Since it is null, the expression safely evaluates to `null` without throwing a NullPointerException.',
      highlights: ['nickname?.length', 'evaluates to null', 'no crash']
    }
  },
  {
    id: 'w1-l8-c3',
    challengeType: 'code-completion',
    worldId: 'world-1',
    lessonId: 'null-safety',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Null Safety • Elvis Operator',
    skill: 'null-safety',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the snippet with the Elvis operator to provide "Guest" as a fallback value when username is null:',
    codeFileName: 'ElvisFallback.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val username: String? = null',
      'val displayName = username _____ "Guest"',
      'println(displayName)'
    ],
    options: [
      { id: 'A', title: '?:', subtitle: 'Elvis operator (fallback default)', isCorrect: true },
      { id: 'B', title: '??', subtitle: 'JavaScript / C# nullish coalescing operator', isCorrect: false },
      { id: 'C', title: '||', subtitle: 'Logical OR operator', isCorrect: false },
      { id: 'D', title: '->', subtitle: 'Lambda arrow', isCorrect: false }
    ],
    hint: 'Turn your head sideways: ?: looks like Elvis Presley\'s pompadour hairstyle and eyes!',
    explanation: {
      title: 'The Elvis Operator (?:)',
      text: 'If the expression on the left is not null, it is returned; otherwise, the value on the right ("Guest") is returned.',
      highlights: ['?:', 'Elvis operator', '"Guest" fallback']
    }
  },
  {
    id: 'w1-l8-c4',
    challengeType: 'bug-fix',
    worldId: 'world-1',
    lessonId: 'null-safety',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Bug Hunter • Non-Null Violation',
    skill: 'null-safety',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line causes a Kotlin compiler error?',
    codeFileName: 'NullBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val nonNullText: String = "Hello"',
      'val invalidText: String = null // Line 2',
      'println(nonNullText)'
    ],
    options: [
      { id: 'A', title: 'Line 2: val invalidText: String = null', subtitle: 'Null can not be a value of a non-null type String', isCorrect: true },
      { id: 'B', title: 'Line 1: val nonNullText: String = "Hello"', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: println(nonNullText)', subtitle: 'Valid print', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'All references can be null', isCorrect: false }
    ],
    hint: 'Notice that Line 2 declares type String without a question mark. Non-nullable types cannot accept null.',
    explanation: {
      title: 'Null Can Not Be Value of Non-Null Type',
      text: 'Line 2 fails compilation because `String` is strictly non-nullable. To allow `null`, the type must be declared as `String?`.',
      highlights: ['Line 2', 'String vs String?', 'compile-time null safety']
    }
  },
  {
    id: 'w1-l8-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-1',
    lessonId: 'null-safety',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Kotlin Foundations',
    topicTag: 'Null Safety • Assertion Operator',
    skill: 'null-safety',
    difficulty: 3,
    xpReward: 30,
    question: 'What does the double-bang (!!) operator do in Kotlin?',
    codeFileName: 'Assertion.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val message: String? = null',
      'val len = message!!.length // Risky!'
    ],
    options: [
      { id: 'A', title: 'Forces conversion to non-null, throwing NullPointerException if null', subtitle: 'Not-null assertion operator', isCorrect: true },
      { id: 'B', title: 'Safely ignores null without error', subtitle: 'That is the safe call operator (?.)', isCorrect: false },
      { id: 'C', title: 'Converts null to an empty string ""', subtitle: 'Requires Elvis operator ?: ""', isCorrect: false },
      { id: 'D', title: 'Checks if message is equal to true', subtitle: 'Boolean operation', isCorrect: false }
    ],
    hint: '!! asserts to the compiler that the value is definitely NOT null. If it is null, it throws a NullPointerException immediately.',
    explanation: {
      title: 'The Not-Null Assertion Operator (!!)',
      text: 'The `!!` operator forcefully casts a nullable reference to a non-null type. If the value is actually `null`, it crashes with a `NullPointerException`. Use with caution!',
      highlights: ['!!', 'NullPointerException', 'assertion operator']
    }
  }
];
