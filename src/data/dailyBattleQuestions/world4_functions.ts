import { LessonQuestion } from '../../types';

export const WORLD_4_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Defining Functions & Unit Returns
  // =========================================================================
  {
    id: 'w4-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'defining-functions',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Functions • Unit Return Type',
    skill: 'functions',
    difficulty: 1,
    xpReward: 15,
    question: 'What is the return type of a Kotlin function that returns no meaningful value (equivalent to void in Java)?',
    codeFileName: 'UnitDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun logMessage(msg: String): _____ {',
      '    println(msg)',
      '}'
    ],
    options: [
      { id: 'A', title: 'Unit', subtitle: 'A real singleton object representing no useful value', isCorrect: true },
      { id: 'B', title: 'void', subtitle: 'Java keyword (not a type in Kotlin)', isCorrect: false },
      { id: 'C', title: 'Nothing', subtitle: 'Represents a function that never returns (throws an exception or halts)', isCorrect: false },
      { id: 'D', title: 'Null', subtitle: 'Not a return type', isCorrect: false }
    ],
    hint: 'Kotlin uses "Unit", which is an actual singleton object, unlike Java\'s primitive "void".',
    explanation: {
      title: 'The Unit Return Type',
      text: 'In Kotlin, functions that do not return a value return `Unit`. Specifying `: Unit` is optional because the compiler infers it automatically.',
      highlights: ['Unit', 'singleton object', 'optional annotation']
    }
  },
  {
    id: 'w4-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'defining-functions',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Functions • Return Value Passing',
    skill: 'functions',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by calling multiply(4, 5)?',
    codeFileName: 'Multiply.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun multiply(a: Int, b: Int): Int {',
      '    return a * b',
      '}',
      'val result = multiply(4, 5)',
      'println(result)'
    ],
    options: [
      { id: 'A', title: '20', subtitle: '4 * 5 = 20 returned and printed', isCorrect: true },
      { id: 'B', title: '9', subtitle: 'Addition rather than multiplication', isCorrect: false },
      { id: 'C', title: 'Unit', subtitle: 'Function has explicit Int return type', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Valid function call', isCorrect: false }
    ],
    hint: 'The function returns a * b, where a=4 and b=5.',
    explanation: {
      title: 'Explicit Return from Functions',
      text: '`multiply(4, 5)` computes `4 * 5`, returns `20`, and prints it to the console.',
      highlights: ['20', 'return a * b', 'explicit return']
    }
  },
  {
    id: 'w4-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'defining-functions',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Functions • Parameter Types',
    skill: 'functions',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the function declaration with explicit parameter and return types:',
    codeFileName: 'Greeting.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun greet(name: String)_____ {',
      '    return "Hello, $name"',
      '}'
    ],
    options: [
      { id: 'A', title: ': String', subtitle: 'Colon followed by return type String', isCorrect: true },
      { id: 'B', title: '-> String', subtitle: 'Lambda return arrow', isCorrect: false },
      { id: 'C', title: 'as String', subtitle: 'Cast operator', isCorrect: false },
      { id: 'D', title: 'returns String', subtitle: 'Pseudo-code keyword', isCorrect: false }
    ],
    hint: 'Function return types in Kotlin are placed after the parameter parentheses, preceded by a colon (:).',
    explanation: {
      title: 'Function Return Type Annotation',
      text: 'The standard function signature syntax is `fun name(param: Type): ReturnType { ... }`.',
      highlights: [': String', 'colon notation', 'return type']
    }
  },
  {
    id: 'w4-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'defining-functions',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • Mutating Function Parameters',
    skill: 'functions',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why does Line 2 fail compilation?',
    codeFileName: 'ParamMutationBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun increment(x: Int): Int {',
      '    x = x + 1 // Line 2',
      '    return x',
      '}'
    ],
    options: [
      { id: 'A', title: 'Function parameters in Kotlin are strictly val (immutable) and cannot be reassigned', subtitle: 'Val cannot be reassigned', isCorrect: true },
      { id: 'B', title: 'return x cannot return an Int', subtitle: 'Return type matches', isCorrect: false },
      { id: 'C', title: 'Line 1 is missing "var" before x', subtitle: '"var" is not allowed in parameter list', isCorrect: false },
      { id: 'D', title: 'x must be declared as Double', subtitle: 'Int is valid', isCorrect: false }
    ],
    hint: 'In Kotlin, all function parameters are immutable references (val). You cannot modify them directly.',
    explanation: {
      title: 'Function Parameters Are Implicit vals',
      text: 'Kotlin enforces immutable parameters to prevent accidental mutation of arguments passed from callers. To modify, declare a local `var result = x + 1`.',
      highlights: ['Line 2', 'Parameters are val', 'cannot reassign']
    }
  },
  {
    id: 'w4-l1-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'defining-functions',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Functions • Top-Level Functions',
    skill: 'functions',
    difficulty: 1,
    xpReward: 20,
    question: 'In Kotlin, do functions have to be defined inside a class (like in Java)?',
    codeFileName: 'TopLevel.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// MathUtils.kt',
      'package com.codedo.utils',
      '',
      'fun square(n: Int): Int = n * n'
    ],
    options: [
      { id: 'A', title: 'No, Kotlin supports top-level functions defined directly inside source files', subtitle: 'Eliminates dummy "Util" classes from Java', isCorrect: true },
      { id: 'B', title: 'Yes, all functions must be wrapped in a class', subtitle: 'Java limitation, not in Kotlin', isCorrect: false },
      { id: 'C', title: 'Only if declared with "static"', subtitle: 'Kotlin has no static keyword', isCorrect: false },
      { id: 'D', title: 'Only inside main.kt', subtitle: 'Top-level functions can be defined in any .kt file', isCorrect: false }
    ],
    hint: 'Kotlin functions can be declared at the "top level" of any file without needing an enclosing class.',
    explanation: {
      title: 'Top-Level Functions in Kotlin',
      text: 'Kotlin allows top-level functions anywhere in a package, making utility methods clean and direct without artificial static utility classes.',
      highlights: ['Top-level functions', 'no class wrapper required', 'idiomatic']
    }
  },

  // =========================================================================
  // LESSON 2: Default Arguments
  // =========================================================================
  {
    id: 'w4-l2-c1',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'default-arguments',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Default Arguments • Fallback Value',
    skill: 'default_arguments',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when calling greet() without providing the second argument?',
    codeFileName: 'DefaultArg.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun greet(name: String, prefix: String = "Hello"): String {',
      '    return "$prefix, $name"',
      '}',
      'println(greet("Alice"))'
    ],
    options: [
      { id: 'A', title: 'Hello, Alice', subtitle: 'Uses default "Hello" for prefix', isCorrect: true },
      { id: 'B', title: 'null, Alice', subtitle: 'Does not default to null', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Default arguments are a core feature of Kotlin', isCorrect: false },
      { id: 'D', title: 'Alice', subtitle: 'Prefix is included in template', isCorrect: false }
    ],
    hint: 'Since no prefix was supplied in greet("Alice"), the default value "Hello" is used.',
    explanation: {
      title: 'Default Parameter Values',
      text: 'Kotlin allows setting default values for parameters using `= value`. Callers can omit arguments that have defaults.',
      highlights: ['Hello, Alice', 'default argument', 'prefix = "Hello"']
    }
  },
  {
    id: 'w4-l2-c2',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'default-arguments',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Default Arguments • Declaration Syntax',
    skill: 'default_arguments',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the declaration so that timeout defaults to 3000 milliseconds:',
    codeFileName: 'Network.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun connect(url: String, timeout: Int _____ 3000) {',
      '    println("Connecting to $url with timeout $timeout ms")',
      '}'
    ],
    options: [
      { id: 'A', title: '=', subtitle: 'Equal sign assigns the default value', isCorrect: true },
      { id: 'B', title: 'default', subtitle: 'Not a keyword for parameter defaults', isCorrect: false },
      { id: 'C', title: ':', subtitle: 'Colon is for type specification', isCorrect: false },
      { id: 'D', title: ':=', subtitle: 'Go/Pascal syntax', isCorrect: false }
    ],
    hint: 'Use the equals sign (=) after the type annotation to specify default values.',
    explanation: {
      title: 'Parameter Default Syntax',
      text: 'Default arguments are declared as `param: Type = defaultValue`.',
      highlights: ['timeout: Int = 3000', '= operator']
    }
  },
  {
    id: 'w4-l2-c3',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'default-arguments',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Default Arguments • Overriding Defaults',
    skill: 'default_arguments',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when an argument is explicitly supplied to override the default?',
    codeFileName: 'OverrideDefault.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun rollDice(sides: Int = 6): Int = sides',
      'println(rollDice(20))'
    ],
    options: [
      { id: 'A', title: '20', subtitle: 'Explicitly passed value overrides the default 6', isCorrect: true },
      { id: 'B', title: '6', subtitle: 'Default value ignored when argument is provided', isCorrect: false },
      { id: 'C', title: '26', subtitle: 'Sum of both', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Fully valid call', isCorrect: false }
    ],
    hint: 'Passing 20 overrides the default 6.',
    explanation: {
      title: 'Overriding Default Arguments',
      text: 'Passing an argument (`20`) overrides the declared default value (`6`), evaluating to `20`.',
      highlights: ['20', 'overrides default', 'rollDice(20)']
    }
  },
  {
    id: 'w4-l2-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'default-arguments',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Architecture • Overload Elimination',
    skill: 'default_arguments',
    difficulty: 2,
    xpReward: 25,
    question: 'What major problem in Java does Kotlin\'s default arguments solve?',
    codeFileName: 'Boilerplate.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// In Java, developers often write 4-5 overloaded methods for different combinations.',
      '// In Kotlin, one function with default arguments replaces all of them!'
    ],
    options: [
      { id: 'A', title: 'Eliminates telescoping constructor / method overload boilerplate', subtitle: 'One function can cover all combinations cleanly', isCorrect: true },
      { id: 'B', title: 'Speeds up JVM bytecode by 10x', subtitle: 'Bytecode size is similar', isCorrect: false },
      { id: 'C', title: 'Allows dynamic runtime types', subtitle: 'Kotlin remains statically typed', isCorrect: false },
      { id: 'D', title: 'Enables Kotlin to run on WebAssembly without compiling', subtitle: 'Unrelated concept', isCorrect: false }
    ],
    hint: 'In Java, developers had to write telescopic overloads: f(a), f(a, b), f(a, b, c). Default arguments solve this.',
    explanation: {
      title: 'Solving the Telescoping Problem',
      text: 'Default arguments eliminate the need to write dozens of overloaded functions or builder patterns just to handle optional parameters.',
      highlights: ['Eliminates telescoping', 'clean code', 'fewer overloads']
    }
  },
  {
    id: 'w4-l2-c5',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'default-arguments',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Default Arguments • Dependent Default Expressions',
    skill: 'default_arguments',
    difficulty: 3,
    xpReward: 30,
    question: 'Can a default argument refer to a preceding parameter in the same function?',
    codeFileName: 'DependentDefault.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun calc(width: Int, height: Int = width * 2): Int {',
      '    return width + height',
      '}',
      'println(calc(5))'
    ],
    options: [
      { id: 'A', title: '15 (width is 5, height defaults to 5 * 2 = 10, total 15)', subtitle: 'Default arguments can reference earlier parameters', isCorrect: true },
      { id: 'B', title: '10', subtitle: 'height only', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Default arguments CAN reference earlier parameters in Kotlin', isCorrect: false },
      { id: 'D', title: '5', subtitle: 'height ignored', isCorrect: false }
    ],
    hint: 'Kotlin evaluates default argument expressions at call-site from left to right, so height can reference width.',
    explanation: {
      title: 'Dependent Default Parameters',
      text: 'Default values can be dynamic expressions and can even reference earlier parameters (`width * 2`). `calc(5)` computes `5 + 10 = 15`.',
      highlights: ['15', 'dependent default', 'width * 2']
    }
  },

  // =========================================================================
  // LESSON 3: Named Arguments
  // =========================================================================
  {
    id: 'w4-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'named-arguments',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Named Arguments • Call-Site Syntax',
    skill: 'named_arguments',
    difficulty: 1,
    xpReward: 20,
    question: 'How do you pass an argument by name in a Kotlin function call?',
    codeFileName: 'NamedCall.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun createUser(name: String, role: String, active: Boolean) { ... }',
      '// Which call passes arguments by name correctly?'
    ],
    options: [
      { id: 'A', title: 'createUser(name = "Dev", role = "Admin", active = true)', subtitle: 'paramName = value syntax', isCorrect: true },
      { id: 'B', title: 'createUser(name: "Dev", role: "Admin", active: true)', subtitle: 'Colon is for definition, not call-site', isCorrect: false },
      { id: 'C', title: 'createUser(@name "Dev", @role "Admin")', subtitle: 'Objective-C / Swift syntax', isCorrect: false },
      { id: 'D', title: 'createUser(--name="Dev", --role="Admin")', subtitle: 'CLI flag syntax', isCorrect: false }
    ],
    hint: 'At the call-site, use parameterName = value.',
    explanation: {
      title: 'Named Argument Call Syntax',
      text: 'In Kotlin, you can name arguments when calling a function: `paramName = value`. This dramatically improves readability for methods with many parameters.',
      highlights: ['name = "Dev"', 'named arguments', 'call-site readability']
    }
  },
  {
    id: 'w4-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'named-arguments',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Named Arguments • Reordering Arguments',
    skill: 'named_arguments',
    difficulty: 2,
    xpReward: 20,
    question: 'Can named arguments be passed in a different order than their definition?',
    codeFileName: 'Reorder.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun format(first: String, last: String): String = "$last, $first"',
      'println(format(last = "Hopper", first = "Grace"))'
    ],
    options: [
      { id: 'A', title: 'Hopper, Grace', subtitle: 'Named arguments can be reordered freely without issue', isCorrect: true },
      { id: 'B', title: 'Grace, Hopper', subtitle: 'Position ignored when names are provided', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Order mismatch is fully permitted when naming parameters', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Valid return', isCorrect: false }
    ],
    hint: 'When all arguments are named, you can pass them in any order you want.',
    explanation: {
      title: 'Reordering Named Arguments',
      text: 'Because both arguments are named explicitly, Kotlin maps `last = "Hopper"` and `first = "Grace"` correctly regardless of order.',
      highlights: ['Hopper, Grace', 'reordering allowed', 'explicit names']
    }
  },
  {
    id: 'w4-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'named-arguments',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Named Arguments • Skipping Defaults',
    skill: 'named_arguments',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the call to override only "separator" while keeping the default prefix and postfix:',
    codeFileName: 'JoinString.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun join(text: String, separator: String = ", ", prefix: String = "", postfix: String = ""): String {',
      '    return "$prefix$text$postfix"',
      '}',
      'val result = join("CodeDo", _____ = " - ")'
    ],
    options: [
      { id: 'A', title: 'separator', subtitle: 'Targets the separator parameter directly by name', isCorrect: true },
      { id: 'B', title: 'param[1]', subtitle: 'Index notation invalid for function arguments', isCorrect: false },
      { id: 'C', title: 'sep', subtitle: 'Must match parameter name exactly', isCorrect: false },
      { id: 'D', title: 'with', subtitle: 'Not a parameter name', isCorrect: false }
    ],
    hint: 'Specify the exact parameter name: separator = " - ".',
    explanation: {
      title: 'Targeting Specific Default Arguments',
      text: 'Named arguments allow specifying only the optional parameter you care about without having to provide dummy values for all preceding optional parameters.',
      highlights: ['separator = " - "', 'skipping defaults', 'targeted assignment']
    }
  },
  {
    id: 'w4-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'named-arguments',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • Positional After Named Argument',
    skill: 'named_arguments',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! In older Kotlin versions, why did mixing positional arguments after named arguments fail?',
    codeFileName: 'MixedArgsBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun config(host: String, port: Int, ssl: Boolean) = Unit',
      'config(port = 8080, "localhost", true) // Line 2'
    ],
    options: [
      { id: 'A', title: 'Positional arguments cannot follow out-of-order named arguments', subtitle: 'The compiler cannot determine which parameter "localhost" corresponds to', isCorrect: true },
      { id: 'B', title: 'port cannot be 8080', subtitle: 'Port 8080 is a valid Int', isCorrect: false },
      { id: 'C', title: 'ssl must be a string', subtitle: 'ssl is Boolean', isCorrect: false },
      { id: 'D', title: 'Line 1 is invalid', subtitle: 'Valid function declaration', isCorrect: false }
    ],
    hint: 'If you name an argument out of order (port first), following positional arguments lose their positional alignment.',
    explanation: {
      title: 'Positional After Named Constraints',
      text: 'Positional arguments must either be placed before named arguments or maintain their natural positional order. Best practice: once you name an argument, name the rest!',
      highlights: ['Positional after named', 'order ambiguity', 'Line 2']
    }
  },
  {
    id: 'w4-l3-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'named-arguments',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Clean Code • Boolean Argument Clarity',
    skill: 'named_arguments',
    difficulty: 1,
    xpReward: 20,
    question: 'Why do Kotlin style guides recommend using named arguments when passing Boolean flags (e.g. animate = true)?',
    codeFileName: 'BooleanClarity.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Compare:',
      '// A: showDialog(true, false, true)',
      '// B: showDialog(dismissOnTouch = true, cancelable = false, animate = true)'
    ],
    options: [
      { id: 'A', title: 'Prevents "mystery boolean" anti-pattern where readers cannot decipher what "true" means', subtitle: 'Self-documenting code at the call site', isCorrect: true },
      { id: 'B', title: 'Named booleans compile to 1-bit flags', subtitle: 'No bytecode representation difference', isCorrect: false },
      { id: 'C', title: 'Positional booleans are deprecated in Kotlin 2.0', subtitle: 'Not deprecated', isCorrect: false },
      { id: 'D', title: 'Named arguments prevent garbage collection overhead', subtitle: 'No GC difference', isCorrect: false }
    ],
    hint: 'Looking at showDialog(true, false, true) makes it impossible to know what each boolean means without checking docs.',
    explanation: {
      title: 'Solving Mystery Booleans',
      text: 'Passing anonymous booleans like `true, false` is unreadable. Named arguments make the caller\'s intent immediately obvious to anyone reading the code.',
      highlights: ['Mystery booleans', 'self-documenting', 'named clarity']
    }
  },

  // =========================================================================
  // LESSON 4: Single-Expression Functions (= syntax)
  // =========================================================================
  {
    id: 'w4-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'single-expression',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Single-Expression • = Syntax',
    skill: 'single_expression',
    difficulty: 1,
    xpReward: 15,
    question: 'How do you write a single-expression function in Kotlin without curly braces or an explicit "return" keyword?',
    codeFileName: 'DoubleNumber.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun double(x: Int): Int _____ x * 2'
    ],
    options: [
      { id: 'A', title: '=', subtitle: 'Equals sign assigns the expression body directly to the function', isCorrect: true },
      { id: 'B', title: '->', subtitle: 'Lambda arrow (invalid for fun declaration)', isCorrect: false },
      { id: 'C', title: '=>', subtitle: 'JavaScript arrow', isCorrect: false },
      { id: 'D', title: 'return', subtitle: 'return keyword requires curly braces { }', isCorrect: false }
    ],
    hint: 'Use the equals sign (=) between the function header and the expression.',
    explanation: {
      title: 'Single-Expression Functions',
      text: 'When a function returns a single expression, you can omit the curly braces and specify the body after an `=` sign: `fun double(x: Int): Int = x * 2`.',
      highlights: ['= x * 2', 'no braces needed', 'no return keyword']
    }
  },
  {
    id: 'w4-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'single-expression',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Single-Expression • Return Type Inference',
    skill: 'single_expression',
    difficulty: 1,
    xpReward: 20,
    question: 'Can the return type be inferred automatically in a single-expression function?',
    codeFileName: 'TypeInference.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun square(n: Int) = n * n',
      'val result = square(5)',
      'println(result::class.simpleName)'
    ],
    options: [
      { id: 'A', title: 'Int', subtitle: 'Inferred automatically from n * n (Int * Int = Int)', isCorrect: true },
      { id: 'B', title: 'Unit', subtitle: 'Single-expression functions infer the expression\'s type, not Unit', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Return type is optional for single-expression functions', isCorrect: false },
      { id: 'D', title: 'Any', subtitle: 'Strictly inferred as Int', isCorrect: false }
    ],
    hint: 'For single-expression functions (=), Kotlin infers the return type automatically from the right-hand side expression.',
    explanation: {
      title: 'Return Type Inference on Expression Bodies',
      text: 'Kotlin compiler knows `n * n` is `Int`, so `fun square(n: Int) = n * n` has return type `Int` without needing `: Int`.',
      highlights: ['Int', 'inferred return type', 'square(n: Int) = n * n']
    }
  },
  {
    id: 'w4-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'single-expression',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Single-Expression • Conditional Expression Body',
    skill: 'single_expression',
    difficulty: 2,
    xpReward: 20,
    question: 'Complete the concise single-expression function that returns the larger of two numbers:',
    codeFileName: 'MaxFunc.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun max(a: Int, b: Int) = _____ (a > b) a else b'
    ],
    options: [
      { id: 'A', title: 'if', subtitle: 'if expression returns a value directly', isCorrect: true },
      { id: 'B', title: 'when', subtitle: 'Requires when { ... } block', isCorrect: false },
      { id: 'C', title: 'return if', subtitle: 'return is illegal after = sign', isCorrect: false },
      { id: 'D', title: 'ternary', subtitle: 'Not a keyword', isCorrect: false }
    ],
    hint: 'Since if is an expression in Kotlin, you can place it directly after the = sign: = if (a > b) a else b.',
    explanation: {
      title: 'if in Expression Body',
      text: '`fun max(a: Int, b: Int) = if (a > b) a else b` is a classic idiomatic Kotlin one-liner.',
      highlights: ['= if (a > b) a else b', 'expression body', 'concise']
    }
  },
  {
    id: 'w4-l4-c4',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'single-expression',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • return Keyword After Equals',
    skill: 'single_expression',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 0,
    question: 'Find the bug! Why does Line 1 fail compilation?',
    codeFileName: 'ReturnBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun cube(n: Int) = return n * n * n // Line 1'
    ],
    options: [
      { id: 'A', title: 'The "return" keyword is forbidden after the "=" in a single-expression function', subtitle: 'Expression body automatically returns the value; "return" is a syntax error here', isCorrect: true },
      { id: 'B', title: 'cube cannot take an Int', subtitle: 'Int parameter is valid', isCorrect: false },
      { id: 'C', title: 'n * n * n causes overflow', subtitle: 'Valid arithmetic', isCorrect: false },
      { id: 'D', title: 'Must specify : Int explicitly', subtitle: 'Return type inference works fine once return is removed', isCorrect: false }
    ],
    hint: 'Remove the "return" word: fun cube(n: Int) = n * n * n.',
    explanation: {
      title: 'No "return" in Expression Bodies',
      text: 'The `=` sign implies returning the expression. Putting `return` right after `=` is a compiler syntax error. Write `fun cube(n: Int) = n * n * n`.',
      highlights: ['Line 1', 'no return after =', 'syntax error']
    }
  },
  {
    id: 'w4-l4-c5',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'single-expression',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Single-Expression • String Template Expression',
    skill: 'single_expression',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by this single-expression greeting function?',
    codeFileName: 'FormatTag.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun createTag(label: String, id: Int) = "#$label-$id"',
      'println(createTag("kotlin", 101))'
    ],
    options: [
      { id: 'A', title: '#kotlin-101', subtitle: 'Evaluates template and returns String', isCorrect: true },
      { id: 'B', title: '#label-id', subtitle: 'Variables were interpolated', isCorrect: false },
      { id: 'C', title: 'Unit', subtitle: 'Returns String', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Valid function call', isCorrect: false }
    ],
    hint: 'The string template "#$label-$id" interpolates "kotlin" and 101.',
    explanation: {
      title: 'Expression Bodies with String Templates',
      text: 'The function evaluates the string template `"#kotlin-101"` and returns it as a `String`.',
      highlights: ['#kotlin-101', 'string template', 'concise']
    }
  },

  // =========================================================================
  // LESSON 5: Vararg Parameters & Spread Operator (*)
  // =========================================================================
  {
    id: 'w4-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'vararg-parameters',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Vararg • Keyword Declaration',
    skill: 'vararg',
    difficulty: 1,
    xpReward: 20,
    question: 'Which keyword allows a function to accept a variable number of arguments (like Java\'s Type...)?',
    codeFileName: 'SumAll.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun printAll(_____ messages: String) {',
      '    for (m in messages) println(m)',
      '}'
    ],
    options: [
      { id: 'A', title: 'vararg', subtitle: 'Kotlin keyword for variable number of arguments', isCorrect: true },
      { id: 'B', title: '...', subtitle: 'Java ellipsis syntax (invalid in Kotlin)', isCorrect: false },
      { id: 'C', title: 'params', subtitle: 'C# keyword', isCorrect: false },
      { id: 'D', title: 'args', subtitle: 'Parameter name, not keyword', isCorrect: false }
    ],
    hint: 'Kotlin uses the "vararg" keyword preceding the parameter name.',
    explanation: {
      title: 'The vararg Modifier',
      text: 'In Kotlin, you mark a parameter with `vararg` to allow passing multiple comma-separated values: `fun printAll(vararg messages: String)`. Inside the function, `messages` is treated as an `Array<String>`.',
      highlights: ['vararg', 'variable arguments', 'Array type']
    }
  },
  {
    id: 'w4-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'vararg-parameters',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Vararg • Summation',
    skill: 'vararg',
    difficulty: 2,
    xpReward: 20,
    question: 'What is printed by calling sumNumbers with 4 integer arguments?',
    codeFileName: 'VarargSum.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun sumNumbers(vararg numbers: Int): Int {',
      '    var total = 0',
      '    for (n in numbers) total += n',
      '    return total',
      '}',
      'println(sumNumbers(1, 2, 3, 4))'
    ],
    options: [
      { id: 'A', title: '10', subtitle: '1 + 2 + 3 + 4 = 10', isCorrect: true },
      { id: 'B', title: '4', subtitle: 'Count of arguments, not sum', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Multiple arguments are valid for vararg', isCorrect: false },
      { id: 'D', title: '24', subtitle: 'Product rather than sum', isCorrect: false }
    ],
    hint: 'The loop iterates through 1, 2, 3, 4 and sums them together: 1 + 2 + 3 + 4 = 10.',
    explanation: {
      title: 'Iterating Over vararg',
      text: 'Inside the function, `numbers` behaves as an `IntArray`. Iterating over it adds `1 + 2 + 3 + 4 = 10`.',
      highlights: ['10', 'IntArray', 'sumNumbers(1, 2, 3, 4)']
    }
  },
  {
    id: 'w4-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'vararg-parameters',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Vararg • Spread Operator (*)',
    skill: 'vararg',
    difficulty: 2,
    xpReward: 25,
    question: 'To pass an existing array into a vararg parameter, which prefix operator unpacks its elements?',
    codeFileName: 'SpreadOp.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun printWords(vararg words: String) { ... }',
      'val items = arrayOf("A", "B", "C")',
      'printWords(_____items)'
    ],
    options: [
      { id: 'A', title: '*', subtitle: 'The spread operator unpacks an array into vararg arguments', isCorrect: true },
      { id: 'B', title: '...', subtitle: 'JavaScript spread operator (invalid in Kotlin)', isCorrect: false },
      { id: 'C', title: '&', subtitle: 'Pointer / address-of operator', isCorrect: false },
      { id: 'D', title: 'unpack', subtitle: 'Not a Kotlin operator', isCorrect: false }
    ],
    hint: 'In Kotlin, prefixing the array with an asterisk (*) acts as the spread operator.',
    explanation: {
      title: 'The Spread Operator (*)',
      text: 'Prefixing an array with `*` (e.g. `*items`) passes its contents as individual vararg arguments to the function.',
      highlights: ['*items', 'spread operator', 'unpacks array']
    }
  },
  {
    id: 'w4-l5-c4',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'vararg-parameters',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • Passing Array Without Spread',
    skill: 'vararg',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 2,
    question: 'Find the bug! Why does Line 3 fail compilation?',
    codeFileName: 'MissingSpreadBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun logAll(vararg msgs: String) = println(msgs.size)',
      'val arr = arrayOf("Hello", "World")',
      'logAll(arr) // Line 3'
    ],
    options: [
      { id: 'A', title: 'Cannot pass an Array<String> where vararg String is expected without the spread operator (*arr)', subtitle: 'Type mismatch: inferred Array<String> but expected String', isCorrect: true },
      { id: 'B', title: 'logAll has no return type', subtitle: 'Single-expression infers Unit', isCorrect: false },
      { id: 'C', title: 'msgs.size is forbidden', subtitle: 'Arrays have a .size property', isCorrect: false },
      { id: 'D', title: 'No bug: prints 2', subtitle: 'Fails to compile without *', isCorrect: false }
    ],
    hint: 'You must write logAll(*arr) to unpack the array for the vararg parameter.',
    explanation: {
      title: 'Spread Operator Required',
      text: 'Line 3 tries to pass the `Array` object as a single item, which fails because `vararg msgs: String` expects individual `String` arguments. Write `logAll(*arr)`.',
      highlights: ['Line 3', '*arr required', 'spread operator']
    }
  },
  {
    id: 'w4-l5-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'vararg-parameters',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Vararg • Parameter Position Rules',
    skill: 'vararg',
    difficulty: 2,
    xpReward: 25,
    question: 'Unlike Java (which requires varargs to be the last parameter), can Kotlin have parameters after vararg?',
    codeFileName: 'VarargPosition.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun formatList(vararg items: String, suffix: String) {',
      '    for (i in items) println("$i$suffix")',
      '}'
    ],
    options: [
      { id: 'A', title: 'Yes, but subsequent parameters must be passed using named arguments (suffix = "!")', subtitle: 'Kotlin supports non-terminal varargs with named arguments', isCorrect: true },
      { id: 'B', title: 'No, vararg must always be strictly the last parameter', subtitle: 'That is Java\'s restriction, not Kotlin\'s', isCorrect: false },
      { id: 'C', title: 'Yes, and they can be passed positionally', subtitle: 'Positional arguments would be consumed by vararg', isCorrect: false },
      { id: 'D', title: 'Only if suffix is of type Int', subtitle: 'Applies to any type', isCorrect: false }
    ],
    hint: 'Kotlin allows parameters after vararg as long as you name them when calling: formatList("A", "B", suffix = "!").',
    explanation: {
      title: 'Non-Terminal varargs in Kotlin',
      text: 'In Kotlin, `vararg` does not have to be the last parameter! Any parameters following `vararg` can be supplied using named arguments.',
      highlights: ['Non-terminal vararg', 'named argument required', 'suffix = "!"']
    }
  },

  // =========================================================================
  // LESSON 6: Infix Functions
  // =========================================================================
  {
    id: 'w4-l6-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'infix-functions',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Infix • Keyword & Readability',
    skill: 'infix',
    difficulty: 2,
    xpReward: 20,
    question: 'What keyword allows calling a member or extension function without dots and parentheses (e.g. 5 downTo 1)?',
    codeFileName: 'InfixDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '_____ fun Int.superAdd(other: Int): Int = this + other',
      'val sum = 3 superAdd 4'
    ],
    options: [
      { id: 'A', title: 'infix', subtitle: 'Kotlin modifier enabling infix notation', isCorrect: true },
      { id: 'B', title: 'operator', subtitle: 'For overloading symbolic operators like +, *', isCorrect: false },
      { id: 'C', title: 'inline', subtitle: 'For compiler inlining of lambdas', isCorrect: false },
      { id: 'D', title: 'custom', subtitle: 'Not a Kotlin keyword', isCorrect: false }
    ],
    hint: 'The modifier is "infix".',
    explanation: {
      title: 'Infix Notation',
      text: 'Functions marked with the `infix` modifier can be called using infix notation (omitting the dot and parentheses): `3 superAdd 4`.',
      highlights: ['infix', '3 superAdd 4', 'infix notation']
    }
  },
  {
    id: 'w4-l6-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'infix-functions',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Infix • Standard Library "to" Infix',
    skill: 'infix',
    difficulty: 1,
    xpReward: 20,
    question: 'What does the standard library infix function "to" produce in Kotlin?',
    codeFileName: 'PairTo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val entry = "Alice" to 95',
      'println(entry::class.simpleName)'
    ],
    options: [
      { id: 'A', title: 'Pair', subtitle: '"A" to B creates a Pair(A, B)', isCorrect: true },
      { id: 'B', title: 'Map', subtitle: 'mapOf uses Pairs, but "to" creates a Pair', isCorrect: false },
      { id: 'C', title: 'Range', subtitle: 'Ranges use .. or until', isCorrect: false },
      { id: 'D', title: 'String', subtitle: 'Not a string concatenation', isCorrect: false }
    ],
    hint: 'In Kotlin, "key" to value is an infix function that returns a Pair(key, value).',
    explanation: {
      title: 'The Infix "to" Function',
      text: '`"Alice" to 95` calls `public infix fun <A, B> A.to(that: B): Pair<A, B> = Pair(this, that)`. It creates a `Pair`.',
      highlights: ['Pair', '"Alice" to 95', 'standard library infix']
    }
  },
  {
    id: 'w4-l6-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'infix-functions',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Infix • Requirements & Restrictions',
    skill: 'infix',
    difficulty: 2,
    xpReward: 25,
    question: 'What are the strict compiler requirements for a function to be marked with "infix"?',
    codeFileName: 'InfixRules.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Rules for infix functions in Kotlin language specification:'
    ],
    options: [
      { id: 'A', title: 'Must be a member or extension function, have exactly ONE parameter, and cannot accept varargs or default values', subtitle: 'Strict infix function signature constraints', isCorrect: true },
      { id: 'B', title: 'Must have at least two parameters', subtitle: 'Must have exactly one parameter', isCorrect: false },
      { id: 'C', title: 'Can only return Boolean', subtitle: 'Can return any type', isCorrect: false },
      { id: 'D', title: 'Must be declared inside a companion object', subtitle: 'Can be top-level extension or class member', isCorrect: false }
    ],
    hint: 'An infix function sits between two items: the receiver (left) and exactly one parameter (right).',
    explanation: {
      title: 'Infix Function Constraints',
      text: 'To be valid, an infix function MUST: 1. Be a member function or extension function. 2. Take exactly one single parameter. 3. Not have default values or varargs.',
      highlights: ['Exactly one parameter', 'member or extension', 'no default values']
    }
  },
  {
    id: 'w4-l6-c4',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'infix-functions',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • Two Parameters on Infix',
    skill: 'infix',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 0,
    question: 'Find the bug! Why does Line 1 fail compilation?',
    codeFileName: 'InfixParamBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'infix fun String.combine(prefix: String, suffix: String) = "$prefix$this$suffix" // Line 1'
    ],
    options: [
      { id: 'A', title: 'Infix functions must have exactly ONE parameter, but "combine" declares two', subtitle: 'Compiler error: Infix function must have exactly one parameter', isCorrect: true },
      { id: 'B', title: 'String cannot have extension functions', subtitle: 'String supports extensions', isCorrect: false },
      { id: 'C', title: 'Missing return type', subtitle: 'Return type is inferred', isCorrect: false },
      { id: 'D', title: 'this keyword is illegal in extension functions', subtitle: 'this refers to the receiver', isCorrect: false }
    ],
    hint: 'How could a caller write "a combine b c"? Infix notation only works with one argument on the right!',
    explanation: {
      title: 'Infix Requires Exactly One Parameter',
      text: 'Infix functions can only accept a single argument (e.g. `a combine b`). Having two parameters makes infix notation syntactically impossible, causing a compiler error.',
      highlights: ['Line 1', 'exactly one parameter', 'compiler error']
    }
  },
  {
    id: 'w4-l6-c5',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'infix-functions',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Infix • Execution Tracing',
    skill: 'infix',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by calling this custom infix multiplier?',
    codeFileName: 'TimesDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'infix fun String.repeatTimes(count: Int): String = this.repeat(count)',
      'val sound = "Ha" repeatTimes 3',
      'println(sound)'
    ],
    options: [
      { id: 'A', title: 'HaHaHa', subtitle: '"Ha" repeated 3 times', isCorrect: true },
      { id: 'B', title: 'Ha 3', subtitle: 'Did not concatenate', isCorrect: false },
      { id: 'C', title: 'HaHa', subtitle: 'Only 2 times', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Infix syntax is completely valid', isCorrect: false }
    ],
    hint: '"Ha" repeatTimes 3 calls the repeatTimes method with this="Ha" and count=3.',
    explanation: {
      title: 'Infix Extension Method Execution',
      text: '`"Ha" repeatTimes 3` invokes the extension function with `"Ha"` as the receiver, returning `"HaHaHa"`.',
      highlights: ['HaHaHa', 'repeatTimes 3', 'clean DSL style']
    }
  },

  // =========================================================================
  // LESSON 7: Function Overloading
  // =========================================================================
  {
    id: 'w4-l7-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-4',
    lessonId: 'function-overloading',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Overloading • Signature Differentiation',
    skill: 'overloading',
    difficulty: 1,
    xpReward: 20,
    question: 'Can two functions in Kotlin share the same name if their parameter types or count differ?',
    codeFileName: 'Overloads.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun display(message: String) { println(message) }',
      'fun display(number: Int) { println("Number: $number") }'
    ],
    options: [
      { id: 'A', title: 'Yes, this is valid function overloading', subtitle: 'The compiler distinguishes them by parameter types', isCorrect: true },
      { id: 'B', title: 'No, function names must be globally unique in a file', subtitle: 'Overloading is fully supported in Kotlin', isCorrect: false },
      { id: 'C', title: 'Only if one is marked "override"', subtitle: 'override is for class inheritance, not overloading', isCorrect: false },
      { id: 'D', title: 'Only if return types are different', subtitle: 'Return types alone cannot distinguish overloads', isCorrect: false }
    ],
    hint: 'Functions can share a name as long as their parameter signatures (types or counts) are distinct.',
    explanation: {
      title: 'Function Overloading',
      text: 'Kotlin supports function overloading: multiple functions can have the exact same name as long as their parameter lists are distinguishable.',
      highlights: ['Function overloading', 'different parameter types', 'valid Kotlin']
    }
  },
  {
    id: 'w4-l7-c2',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'function-overloading',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Overloading • Resolution Tracing',
    skill: 'overloading',
    difficulty: 2,
    xpReward: 20,
    question: 'Which overloaded version is called when passing 3.5?',
    codeFileName: 'ResolveOverload.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun process(x: Int) = "Int: $x"',
      'fun process(x: Double) = "Double: $x"',
      'println(process(3.5))'
    ],
    options: [
      { id: 'A', title: 'Double: 3.5', subtitle: '3.5 is a Double literal, resolving to the Double overload', isCorrect: true },
      { id: 'B', title: 'Int: 3', subtitle: '3.5 is not truncated automatically', isCorrect: false },
      { id: 'C', title: 'Double: 3.0', subtitle: 'Exact value is preserved', isCorrect: false },
      { id: 'D', title: 'Compilation Error: Ambiguous overload', subtitle: 'No ambiguity exists', isCorrect: false }
    ],
    hint: '3.5 is a Double literal, so it matches process(x: Double) directly.',
    explanation: {
      title: 'Overload Resolution by Literal Type',
      text: 'The literal `3.5` is of type `Double`, matching `process(x: Double)` exactly.',
      highlights: ['Double: 3.5', 'exact type match', 'overload resolution']
    }
  },
  {
    id: 'w4-l7-c3',
    challengeType: 'bug-fix',
    worldId: 'world-4',
    lessonId: 'function-overloading',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Bug Hunter • Return Type Only Overload',
    skill: 'overloading',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why does Line 2 fail compilation?',
    codeFileName: 'ReturnTypeOverloadBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun getValue(): String = "Hello"',
      'fun getValue(): Int = 42 // Line 2'
    ],
    options: [
      { id: 'A', title: 'Functions cannot be overloaded based on return type alone', subtitle: 'Compiler error: Platform declaration clash (same parameter signature)', isCorrect: true },
      { id: 'B', title: 'getValue cannot return an Int', subtitle: 'Int is a valid type', isCorrect: false },
      { id: 'C', title: 'Single-expression syntax requires curly braces', subtitle: 'Expression body is valid', isCorrect: false },
      { id: 'D', title: 'No bug: caller determines which function to call by variable type', subtitle: 'Disallowed because call-site like getValue() is ambiguous', isCorrect: false }
    ],
    hint: 'If you write val x = getValue(), how would the compiler know which one you called? Return type alone is not enough.',
    explanation: {
      title: 'No Overloading by Return Type Alone',
      text: 'Both functions have the exact same signature `getValue()`. The compiler cannot distinguish which function is being invoked from `getValue()`, creating a platform declaration clash.',
      highlights: ['Line 2', 'return type alone cannot overload', 'declaration clash']
    }
  },
  {
    id: 'w4-l7-c4',
    challengeType: 'code-completion',
    worldId: 'world-4',
    lessonId: 'function-overloading',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Overloading • Parameter Count Overload',
    skill: 'overloading',
    difficulty: 2,
    xpReward: 20,
    question: 'Complete the two-parameter overload of logMessage:',
    codeFileName: 'LogOverloads.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun logMessage(msg: String) = println("[INFO] $msg")',
      'fun logMessage(tag: String, _____ String) = println("[$tag] $msg")'
    ],
    options: [
      { id: 'A', title: 'msg:', subtitle: 'Parameter name followed by colon for type specification', isCorrect: true },
      { id: 'B', title: 'val msg:', subtitle: 'val keyword is illegal in parameter declarations', isCorrect: false },
      { id: 'C', title: 'msg as', subtitle: 'Cast syntax', isCorrect: false },
      { id: 'D', title: ':msg', subtitle: 'Invalid syntax', isCorrect: false }
    ],
    hint: 'Declare the second parameter: msg: String.',
    explanation: {
      title: 'Arity-Based Overloading',
      text: 'The two functions take 1 and 2 arguments respectively: `logMessage(msg)` and `logMessage(tag, msg)`.',
      highlights: ['msg: String', 'two-parameter overload', 'arity']
    }
  },
  {
    id: 'w4-l7-c5',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'function-overloading',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Functions & Modules',
    topicTag: 'Overloading • Ambiguity with Default Arguments',
    skill: 'overloading',
    difficulty: 3,
    xpReward: 30,
    question: 'Why can combining overloads with default arguments sometimes create ambiguity?',
    codeFileName: 'Ambiguity.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun printScore(score: Int) = println("Score: $score")',
      'fun printScore(score: Int, bonus: Int = 0) = println("Score: $score + $bonus")',
      '// What happens when calling printScore(10)?'
    ],
    options: [
      { id: 'A', title: 'Compilation Error: Overload resolution ambiguity', subtitle: 'Both functions can match printScore(10), so compiler rejects it', isCorrect: true },
      { id: 'B', title: 'Prints "Score: 10"', subtitle: 'Compiler refuses to guess', isCorrect: false },
      { id: 'C', title: 'Prints "Score: 10 + 0"', subtitle: 'Neither function takes priority', isCorrect: false },
      { id: 'D', title: 'Runtime crash', subtitle: 'Caught at compile time', isCorrect: false }
    ],
    hint: 'Both functions can accept a single argument printScore(10). Which one should the compiler pick? It can\'t decide!',
    explanation: {
      title: 'Overload Resolution Ambiguity',
      text: 'Because `printScore(10)` matches both `printScore(score: Int)` and `printScore(score: Int, bonus: Int = 0)`, the compiler flags this as an ambiguous call error. Avoid creating redundant overloads when default arguments already exist!',
      highlights: ['Overload resolution ambiguity', 'compiler error', 'avoid redundant overloads']
    }
  },

  // =========================================================================
  // WORLD 4 BOSS: Function Boss Milestone
  // =========================================================================
  {
    id: 'w4-boss',
    challengeType: 'output-prediction',
    worldId: 'world-4',
    lessonId: 'function-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Functions & Modules',
    topicTag: 'WORLD BOSS • Functional Pipeline Simulation',
    skill: 'function-boss',
    difficulty: 3,
    xpReward: 50,
    isBoss: true,
    question: 'BOSS CHALLENGE: Trace this pipeline combining default args, named args, single-expression, and infix functions. What is printed?',
    codeFileName: 'FunctionBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'infix fun Int.applyBonus(bonus: Int): Int = this + bonus',
      '',
      'fun transform(vararg values: Int, multiplier: Int = 2, tag: String = "VAL"): String {',
      '    var sum = 0',
      '    for (v in values) {',
      '        sum += (v applyBonus 1)',
      '    }',
      '    return "$tag:${sum * multiplier}"',
      '}',
      '',
      'val output = transform(1, 2, tag = "XP", multiplier = 3)',
      'println(output)'
    ],
    options: [
      { id: 'A', title: '"XP:15"', subtitle: '1+1=2, 2+1=3. sum=5. 5 * 3 = 15. Tag="XP"', isCorrect: true },
      { id: 'B', title: '"VAL:10"', subtitle: 'Used default multiplier (2) and default tag', isCorrect: false },
      { id: 'C', title: '"XP:18"', subtitle: 'Multiplier calculated on individual elements', isCorrect: false },
      { id: 'D', title: '"XP:12"', subtitle: 'Bonus not added', isCorrect: false }
    ],
    hint: 'Values: 1 and 2. 1 applyBonus 1 = 2. 2 applyBonus 1 = 3. Total sum = 5. Multiplier is 3 (named arg). Tag is "XP" (named arg). 5 * 3 = 15 -> "XP:15".',
    explanation: {
      title: 'BOSS DEFEATED! Function Architecture Master',
      text: '1. `1 applyBonus 1` = 2.\n2. `2 applyBonus 1` = 3.\n3. `sum` = 2 + 3 = 5.\n4. Named args provide `multiplier = 3` and `tag = "XP"`.\n5. `sum * multiplier` = 5 * 3 = 15.\nFinal result: `"XP:15"`.',
      highlights: ['"XP:15"', 'infix call', 'vararg loop', 'named arguments', 'Boss Defeated']
    }
  }
];
