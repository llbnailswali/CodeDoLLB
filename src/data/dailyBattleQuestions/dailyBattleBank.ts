import { LessonQuestion } from '../../types';

export const DAILY_BATTLE_POOL: LessonQuestion[] = [
  {
    id: 'battle-1',
    challengeType: 'output-prediction',
    stepNumber: 1,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Immutability',
    skill: 'variables',
    difficulty: 1,
    xpReward: 15,
    question: 'Can a "val" variable in Kotlin be reassigned after declaration?',
    codeFileName: 'Battle1.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['val score = 50', '// score = 60'],
    options: [
      { id: 'A', title: 'No', subtitle: 'val is immutable and read-only', isCorrect: true },
      { id: 'B', title: 'Yes', subtitle: 'Any variable can change', isCorrect: false },
      { id: 'C', title: 'Only in classes', subtitle: 'Scope dependent', isCorrect: false },
      { id: 'D', title: 'Only if nullable', subtitle: 'Type dependent', isCorrect: false }
    ],
    hint: 'Think of "val" as value (final/constant) and "var" as variable.',
    explanation: {
      title: 'val is Read-Only',
      text: 'val defines a read-only reference that cannot be reassigned.',
      highlights: ['val', 'read-only']
    }
  },
  {
    id: 'battle-2',
    challengeType: 'output-prediction',
    stepNumber: 2,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • String Templates',
    skill: 'strings',
    difficulty: 1,
    xpReward: 15,
    question: 'What is the output of "${3 * 4}" inside a Kotlin string?',
    codeFileName: 'Battle2.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['println("Result: ${3 * 4}")'],
    options: [
      { id: 'A', title: 'Result: 12', subtitle: 'Expression evaluated in string template', isCorrect: true },
      { id: 'B', title: 'Result: ${3 * 4}', subtitle: 'Literal text', isCorrect: false },
      { id: 'C', title: 'Result: 34', subtitle: 'String concatenation', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Invalid syntax', isCorrect: false }
    ],
    hint: 'Kotlin evaluates any valid code expression placed inside ${...}.',
    explanation: {
      title: 'String Template Evaluation',
      text: '3 * 4 is calculated inside ${...}, yielding 12.',
      highlights: ['${3 * 4}', '12']
    }
  },
  {
    id: 'battle-3',
    challengeType: 'multiple-choice',
    stepNumber: 3,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Null Safety',
    skill: 'null-safety',
    difficulty: 2,
    xpReward: 20,
    question: 'Which type can hold a null value in Kotlin?',
    codeFileName: 'Battle3.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['var text: String? = null'],
    options: [
      { id: 'A', title: 'String?', subtitle: 'Nullable type with question mark', isCorrect: true },
      { id: 'B', title: 'String', subtitle: 'Non-null type by default', isCorrect: false },
      { id: 'C', title: 'Nullable<String>', subtitle: 'C# generic syntax', isCorrect: false },
      { id: 'D', title: 'Optional<String>', subtitle: 'Java Optional wrapper', isCorrect: false }
    ],
    hint: 'In Kotlin, suffixing a type with "?" makes it nullable.',
    explanation: {
      title: 'Nullable Types',
      text: 'Types in Kotlin are non-null by default. Add ? to allow null values (e.g. String?).',
      highlights: ['String?', 'nullable']
    }
  },
  {
    id: 'battle-4',
    challengeType: 'output-prediction',
    stepNumber: 4,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Integer Math',
    skill: 'operators',
    difficulty: 1,
    xpReward: 15,
    question: 'What is the result of 7 / 2 in integer arithmetic in Kotlin?',
    codeFileName: 'Battle4.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['val quotient = 7 / 2', 'println(quotient)'],
    options: [
      { id: 'A', title: '3', subtitle: 'Integer division truncates decimals', isCorrect: true },
      { id: 'B', title: '3.5', subtitle: 'Floating point conversion', isCorrect: false },
      { id: 'C', title: '4', subtitle: 'Rounded up', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Type error', isCorrect: false }
    ],
    hint: 'Dividing two Int numbers results in an Int, discarding any fractional remainder.',
    explanation: {
      title: 'Integer Division Truncation',
      text: '7 / 2 evaluates to 3 because both operands are integers.',
      highlights: ['7 / 2 == 3', 'truncation']
    }
  },
  {
    id: 'battle-5',
    challengeType: 'code-completion',
    stepNumber: 5,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Collections',
    skill: 'collections',
    difficulty: 2,
    xpReward: 20,
    question: 'Which function creates an immutable read-only list in Kotlin?',
    codeFileName: 'Battle5.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['val items = _____(1, 2, 3)'],
    options: [
      { id: 'A', title: 'listOf', subtitle: 'Standard library immutable list constructor', isCorrect: true },
      { id: 'B', title: 'mutableListOf', subtitle: 'Creates a mutable list', isCorrect: false },
      { id: 'C', title: 'newList', subtitle: 'Invalid syntax', isCorrect: false },
      { id: 'D', title: 'arrayListOf', subtitle: 'ArrayList instance', isCorrect: false }
    ],
    hint: 'listOf creates a read-only List, while mutableListOf creates one you can modify.',
    explanation: {
      title: 'listOf Helper',
      text: 'listOf creates an immutable List in Kotlin.',
      highlights: ['listOf', 'immutable list']
    }
  },
  {
    id: 'battle-6',
    challengeType: 'output-prediction',
    stepNumber: 6,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Comparisons',
    skill: 'conditionals',
    difficulty: 2,
    xpReward: 20,
    question: 'What does "apple" == "apple" evaluate to in Kotlin?',
    codeFileName: 'Battle6.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['println("apple" == "apple")'],
    options: [
      { id: 'A', title: 'true', subtitle: '== checks structural equality (equals)', isCorrect: true },
      { id: 'B', title: 'false', subtitle: 'Different object references', isCorrect: false },
      { id: 'C', title: 'Error', subtitle: 'Strings cannot use == in Kotlin', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Nullable check', isCorrect: false }
    ],
    hint: 'In Kotlin, == checks structural equality (like .equals() in Java). Use === for referential equality.',
    explanation: {
      title: 'Structural Equality (==)',
      text: '== translates to equals() null-safely, returning true for identical string values.',
      highlights: ['==', 'structural equality']
    }
  },
  {
    id: 'battle-7',
    challengeType: 'multiple-choice',
    stepNumber: 7,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Functions',
    skill: 'functions',
    difficulty: 2,
    xpReward: 20,
    question: 'What is the default return type of a Kotlin function that returns no value?',
    codeFileName: 'Battle7.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['fun greet(): Unit { println("Hello") }'],
    options: [
      { id: 'A', title: 'Unit', subtitle: 'Equivalent to void in other languages', isCorrect: true },
      { id: 'B', title: 'void', subtitle: 'Java keyword (does not exist in Kotlin)', isCorrect: false },
      { id: 'C', title: 'Nothing', subtitle: 'Type that never returns', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Null literal', isCorrect: false }
    ],
    hint: 'Kotlin uses "Unit" where Java would use "void".',
    explanation: {
      title: 'Unit Return Type',
      text: 'Unit corresponds to the void type in Java, and can be omitted from function signatures.',
      highlights: ['Unit', 'equivalent to void']
    }
  },
  {
    id: 'battle-8',
    challengeType: 'bug-fix',
    stepNumber: 8,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Loops',
    skill: 'loops',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 0,
    question: 'Identify the invalid Kotlin range loop syntax:',
    codeFileName: 'Battle8.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'for (i = 0; i < 5; i++) { // Line 1',
      '    println(i)',
      '}'
    ],
    options: [
      { id: 'A', title: 'Line 1: for (i = 0; i < 5; i++)', subtitle: 'C-style for-loop does not exist in Kotlin', isCorrect: true },
      { id: 'B', title: 'Line 2: println(i)', subtitle: 'Valid print', isCorrect: false },
      { id: 'C', title: 'Line 3: closing brace', subtitle: 'Valid brace', isCorrect: false },
      { id: 'D', title: 'All lines are valid', subtitle: 'Valid in Kotlin', isCorrect: false }
    ],
    hint: 'Kotlin does not have three-part C-style for loops. Use "for (i in 0 until 5)" instead.',
    explanation: {
      title: 'Kotlin for Loops',
      text: 'Kotlin uses "for (item in collection)" or "for (i in 0 until 5)". C-style for loops are not supported.',
      highlights: ['for (i in 0 until 5)', 'no C-style loop']
    }
  },
  {
    id: 'battle-9',
    challengeType: 'output-prediction',
    stepNumber: 9,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Elvis Operator',
    skill: 'null-safety',
    difficulty: 2,
    xpReward: 20,
    question: 'What is the value of "result" when length is null?',
    codeFileName: 'Battle9.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val length: Int? = null',
      'val result = length ?: 0',
      'println(result)'
    ],
    options: [
      { id: 'A', title: '0', subtitle: 'Fallback from Elvis operator', isCorrect: true },
      { id: 'B', title: 'null', subtitle: 'Evaluates to null', isCorrect: false },
      { id: 'C', title: '-1', subtitle: 'Negative fallback', isCorrect: false },
      { id: 'D', title: 'Exception', subtitle: 'Throws NullPointer', isCorrect: false }
    ],
    hint: '?: returns the right operand when the left operand is null.',
    explanation: {
      title: 'The Elvis Operator (?:)',
      text: 'Because length is null, the Elvis operator returns the fallback value 0.',
      highlights: ['?:', 'Elvis fallback = 0']
    }
  },
  {
    id: 'battle-10',
    challengeType: 'multiple-choice',
    stepNumber: 10,
    totalSteps: 10,
    worldName: 'Daily Battle',
    topicTag: 'Sprint • Kotlin Strengths',
    skill: 'variables',
    difficulty: 1,
    xpReward: 25,
    question: 'Do semicolons (;) need to be written at the end of statements in Kotlin?',
    codeFileName: 'Battle10.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: ['val message = "Hello CodeDo"'],
    options: [
      { id: 'A', title: 'Optional', subtitle: 'Omitted by convention in idiomatic Kotlin', isCorrect: true },
      { id: 'B', title: 'Mandatory', subtitle: 'Causes syntax error if missing', isCorrect: false },
      { id: 'C', title: 'Forbidden', subtitle: 'Causes syntax error if present', isCorrect: false },
      { id: 'D', title: 'Only in loops', subtitle: 'Conditional rule', isCorrect: false }
    ],
    hint: 'Kotlin semicolons are entirely optional, and idiomatic Kotlin code avoids them.',
    explanation: {
      title: 'Optional Semicolons',
      text: 'Semicolons are optional in Kotlin; clean Kotlin code omits them.',
      highlights: ['Optional', 'idiomatic Kotlin']
    }
  }
];
