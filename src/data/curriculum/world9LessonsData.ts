import { FiveStageLesson } from '../lessonStagesData';

const WORLD_ID = 'world-9';
const WORLD_NAME = 'Lambda Lab';
const STAGE = 'STAGE 9 — ADVANCED FUNCTIONS';

type RunnableConfig = {
  key: string;
  topic: string;
  learnTitle: string;
  learnText: string;
  takeaway: string;
  example: string[];
  exploreCards: Array<{
    title: string;
    subtitle: string;
    code: string[];
    whatItMeans: Array<{ label: string; description: string }>;
    whatChanged: string;
  }>;
  predictions: Array<{
    code?: string[];
    prompt?: string;
    options: Array<{ id: 'A' | 'B' | 'C' | 'D'; label: string; isCorrect: boolean }>;
    detail: string;
  }>;
  challenge: string;
  description: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  debugTitle: string;
  debugSubtitle: string;
  brokenCode: string;
  fixedCode: string;
  debugExpectedOutput?: string;
  hints: [string, string, string];
  debugExplanation: string;
};

type ReasoningConfig = {
  key: string;
  topic: string;
  learnTitle: string;
  learnText: string;
  takeaway: string;
  example: string[];
  exploreCards: Array<{
    title: string;
    subtitle: string;
    code: string[];
    whatItMeans: Array<{ label: string; description: string }>;
    whatChanged: string;
  }>;
  predictions: Array<{
    code?: string[];
    prompt: string;
    options: Array<{ id: 'A' | 'B' | 'C' | 'D'; label: string; isCorrect: boolean }>;
    detail: string;
  }>;
};

function runnableLesson(config: RunnableConfig): FiveStageLesson {
  let commentNumber = 0;
  const numberedStarterCode = config.initialCode.replace(/^(\s*)\/\/\s*(?!\d+\.\s*)(.+)$/gm, (_line, indent, text) => {
    commentNumber++;
    return `${indent}// ${commentNumber}. ${text}`;
  });
  const numberedDescription = `${config.description}\n\n1. Complete the function or lambda behavior described above.\n\n2. Call the completed value from the provided main() code.\n\n3. Confirm the output matches the expected result.`;

  return {
    id: `world-9-${config.key}`,
    worldId: WORLD_ID,
    worldName: WORLD_NAME,
    stageName: config.key === 'boss' ? 'WORLD BOSS' : STAGE,
    topicTitle: config.topic,
    learn: {
      title: config.learnTitle,
      subtitle: config.learnText,
      exampleTag: 'EXAMPLE',
      exampleTitle: `A ${config.topic.toLowerCase()} example`,
      language: 'Kotlin',
      codeSnippet: config.example,
      explanation: config.learnText,
      keyIdeas: [{ number: 1, title: config.learnTitle, description: config.takeaway }],
      keyTakeaway: config.takeaway,
    },
    explore: {
      title: 'Explore the Concept',
      subtitle: 'Examine distinct ways this functional feature is written, invoked, and composed in Kotlin.',
      cards: config.exploreCards.map((card, idx) => ({
        id: `${config.key}-explore-${idx + 1}`,
        number: `0${idx + 1}`,
        title: card.title,
        language: 'Kotlin',
        subtitle: card.subtitle,
        code: card.code,
        whatItMeans: card.whatItMeans,
        whatChanged: card.whatChanged,
      })),
    },
    predict: {
      title: 'What will this code print?',
      subtitle: 'Trace each callable value and evaluate how the operation executes.',
      questions: config.predictions.map((question, index) => ({
        id: `${config.key}-predict-${index + 1}`,
        questionNumber: index + 1,
        totalQuestions: config.predictions.length,
        title: 'Trace the Function Value',
        topicMeta: config.topic,
        language: 'Kotlin',
        code: question.code,
        prompt: question.prompt ?? 'What will this code print?',
        options: question.options,
        explanation: { codeRef: 'The callable expression', detail: question.detail },
      })),
    },
    writeRun: {
      challengeNumber: 1,
      totalChallenges: 1,
      xpReward: config.key === 'boss' ? 50 : 20,
      title: config.challenge,
      description: numberedDescription,
      requirements: { name: 'main', params: '(none)', returns: 'Unit' },
      fileName: `${config.topic.replace(/[^A-Za-z]/g, '')}.kt`,
      initialCode: numberedStarterCode,
      solutionCode: config.solutionCode,
      sampleInput: 'main()',
      expectedOutput: config.expectedOutput,
      testCase: { call: '', expected: config.expectedOutput },
    },
    debug: {
      title: config.debugTitle,
      subtitle: config.debugSubtitle,
      challengeNumber: 1,
      totalChallenges: 1,
      difficulty: 'medium',
      bugType: 'logic',
      bugLabel: 'Logic Bug: Incorrect Function Behavior',
      brokenCode: config.brokenCode,
      fixedCode: config.fixedCode,
      expectedOutput: config.debugExpectedOutput ?? config.expectedOutput,
      hints: config.hints,
      explanation: config.debugExplanation,
    },
    mastered: {
      topicTitle: config.topic,
      summary: `You have mastered ${config.topic.toLowerCase()} by reading, predicting, writing, and repairing callable Kotlin code.`,
      passedCount: `${config.predictions.length} / ${config.predictions.length} PASSED`,
      verificationItems: [
        { title: 'Concept understood', subtitle: config.takeaway },
        { title: 'Examples explored', subtitle: 'Progressive patterns examined and verified' },
        { title: 'Predictions completed', subtitle: `${config.predictions.length}/${config.predictions.length} callable-value traces correct` },
        { title: 'Code written & executed', subtitle: 'A runnable function-value challenge passed' },
        { title: 'Bugs diagnosed & repaired', subtitle: 'Repaired a distinct bug scenario' },
      ],
      xpEarned: config.key === 'boss' ? 50 : 20,
      streakDays: 1,
      accuracy: '100%',
    },
  };
}

function reasoningLesson(config: ReasoningConfig): FiveStageLesson {
  return {
    id: `world-9-${config.key}`,
    worldId: WORLD_ID,
    worldName: WORLD_NAME,
    stageName: STAGE,
    topicTitle: config.topic,
    learn: {
      title: config.learnTitle,
      subtitle: config.learnText,
      exampleTag: 'CONCEPT',
      exampleTitle: 'Compiler semantics',
      language: 'Kotlin',
      codeSnippet: config.example,
      explanation: config.learnText,
      keyIdeas: [{ number: 1, title: config.learnTitle, description: config.takeaway }],
      keyTakeaway: config.takeaway,
    },
    explore: {
      title: 'Explore the Concept',
      subtitle: 'Examine how Kotlin compiler directives govern inlining and return safety.',
      cards: config.exploreCards.map((card, idx) => ({
        id: `${config.key}-explore-${idx + 1}`,
        number: `0${idx + 1}`,
        title: card.title,
        language: 'Kotlin',
        subtitle: card.subtitle,
        code: card.code,
        whatItMeans: card.whatItMeans,
        whatChanged: card.whatChanged,
      })),
    },
    predict: {
      title: 'Check Your Understanding',
      subtitle: 'Predict runtime behavior and compiler semantics for inlining rules.',
      questions: config.predictions.map((question, index) => ({
        id: `${config.key}-predict-${index + 1}`,
        questionNumber: index + 1,
        totalQuestions: config.predictions.length,
        title: config.topic,
        topicMeta: 'Compiler semantics',
        language: 'Kotlin',
        code: question.code,
        prompt: question.prompt,
        options: question.options,
        explanation: { codeRef: 'Kotlin compiler rule', detail: question.detail },
      })),
    },
    mastered: {
      topicTitle: config.topic,
      summary: `You understand when and why Kotlin uses ${config.topic.toLowerCase()} semantics.`,
      passedCount: `${config.predictions.length} / ${config.predictions.length} PASSED`,
      verificationItems: [
        { title: 'Concept understood', subtitle: config.takeaway },
        { title: 'Compiler rules explored', subtitle: 'Analyzed inlining transformations and return constraints' },
        { title: 'Predictions completed', subtitle: `${config.predictions.length}/${config.predictions.length} semantic checks correct` },
      ],
      xpEarned: 20,
      streakDays: 1,
      accuracy: '100%',
    },
  };
}

export const LAMBDA_EXPRESSIONS_LESSON = runnableLesson({
  key: 'lambda-expressions',
  topic: 'Lambda expressions',
  learnTitle: 'Write a Function Without Naming It',
  learnText: 'A lambda is a compact function literal written with braces. Parameters appear before -> and the final expression becomes the returned result.',
  takeaway: 'Use { input -> result } when a small behavior belongs directly where it is declared or passed.',
  example: [
    'fun main() {',
    '    val double = { number: Int -> number * 2 }',
    '    println(double(6))',
    '}',
  ],
  exploreCards: [
    {
      title: 'Single-parameter text formatter',
      subtitle: 'A lambda can accept a String and concatenate it into a welcome message.',
      code: [
        'val format = { name: String -> "Welcome, " + name }',
        'println(format("Mina"))',
      ],
      whatItMeans: [{ label: 'format("Mina")', description: 'Invokes the lambda with "Mina", returning "Welcome, Mina".' }],
      whatChanged: 'Stored a String-to-String lambda in format and called it with an argument.',
    },
    {
      title: 'Two-parameter math operation',
      subtitle: 'Parameters before -> are comma-separated and called positionally.',
      code: [
        'val sum = { a: Int, b: Int -> a + b }',
        'println(sum(15, 27))',
      ],
      whatItMeans: [{ label: 'sum(15, 27)', description: 'Binds a=15 and b=27, then evaluates a + b.' }],
      whatChanged: 'Demonstrated a multi-parameter lambda combining two integer inputs.',
    },
    {
      title: 'Zero-parameter supplier lambda',
      subtitle: 'A lambda with no parameters omits the arrow -> completely and is invoked with empty parentheses.',
      code: [
        'val ping = { "PONG" }',
        'println(ping())',
      ],
      whatItMeans: [{ label: 'ping()', description: 'Invokes the zero-parameter lambda, returning "PONG".' }],
      whatChanged: 'Declared and invoked a supplier lambda with zero parameters.',
    },
    {
      title: 'Multiline lambda body',
      subtitle: 'Statements execute sequentially, and the very last expression becomes the returned value.',
      code: [
        'val score = { base: Int ->',
        '    val bonus = 5',
        '    base + bonus',
        '}',
        'println(score(20))',
      ],
      whatItMeans: [{ label: 'base + bonus', description: 'The final line in the braces determines the lambda output.' }],
      whatChanged: 'Added an intermediate local variable inside the lambda body before returning.',
    },
    {
      title: 'Capturing and reading outer variables (closure)',
      subtitle: 'Lambdas can access and observe variables declared in their surrounding outer scope.',
      code: [
        'var factor = 2',
        'val scale = { n: Int -> n * factor }',
        'println(scale(5))',
        'factor = 3',
        'println(scale(5))',
      ],
      whatItMeans: [{ label: 'factor = 3', description: 'The lambda captures factor by reference and reflects updates made to it.' }],
      whatChanged: 'Observed outer variable mutation across multiple invocations.',
    },
  ],
  predictions: [
    {
      code: ['fun main() {', '    val addFive = { n: Int -> n + 5 }', '    println(addFive(4))', '}'],
      options: [
        { id: 'A', label: '9', isCorrect: true },
        { id: 'B', label: '4', isCorrect: false },
        { id: 'C', label: '5', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'n receives 4, so evaluating n + 5 yields 9.',
    },
    {
      code: ['fun main() {', '    val multiply = { x: Int, y: Int -> x * y }', '    println(multiply(3, 4))', '}'],
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '7', isCorrect: false },
        { id: 'C', label: '34', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The two parameters x and y receive 3 and 4; 3 * 4 is 12.',
    },
    {
      code: ['fun main() {', '    val cheer = { "Hurray!" }', '    println(cheer())', '}'],
      options: [
        { id: 'A', label: 'Hurray!', isCorrect: true },
        { id: 'B', label: 'cheer', isCorrect: false },
        { id: 'C', label: 'null', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The lambda takes zero parameters and produces "Hurray!" when invoked with cheer().',
    },
    {
      code: ['fun main() {', '    val greet = { name: String -> "Hi " + name }', '    println(greet("Jo"))', '}'],
      options: [
        { id: 'A', label: 'Hi Jo', isCorrect: true },
        { id: 'B', label: 'Hi name', isCorrect: false },
        { id: 'C', label: 'Jo', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The lambda concatenates "Hi " with the input string "Jo".',
    },
    {
      code: [
        'fun main() {',
        '    var multiplier = 2',
        '    val multiply = { x: Int -> x * multiplier }',
        '    println(multiply(3))',
        '    multiplier = 4',
        '    println(multiply(3))',
        '}',
      ],
      options: [
        { id: 'A', label: '6\n12', isCorrect: true },
        { id: 'B', label: '6\n6', isCorrect: false },
        { id: 'C', label: '12\n12', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The lambda captures multiplier from outer scope. First call computes 3 * 2 = 6; after multiplier becomes 4, the second call computes 3 * 4 = 12.',
    },
  ],
  challenge: 'Build a Tripler',
  description: 'Create a lambda named triple that receives an Int and returns that number multiplied by 3. Print triple(7).',
  initialCode: 'fun main() {\n    // Create triple as a lambda taking number: Int:\n\n    println(triple(7))\n}',
  solutionCode: 'fun main() {\n    val triple = { number: Int -> number * 3 }\n    println(triple(7))\n}',
  expectedOutput: '21',
  debugTitle: 'Fix the Fuel Cost Multiplier',
  debugSubtitle: 'The fuel calculation adds distance instead of multiplying by rate, printing 14 instead of 40.',
  brokenCode: 'fun main() {\n    val fuelCost = { distance: Int -> distance + 4 }\n    println(fuelCost(10))\n}',
  fixedCode: 'fun main() {\n    val fuelCost = { distance: Int -> distance * 4 }\n    println(fuelCost(10))\n}',
  debugExpectedOutput: '40',
  hints: [
    'The fuel calculation should multiply distance by 4, not add 4.',
    'Look at the operator inside the lambda body: distance + 4.',
    'Replace + with * so distance * 4 computes 40 for input 10.',
  ],
  debugExplanation: 'The original lambda used + instead of *, calculating 10 + 4 = 14. Changing the operator to * produces the expected 40.',
});

export const ANONYMOUS_FUNCTIONS_LESSON = runnableLesson({
  key: 'anonymous-functions',
  topic: 'Anonymous functions',
  learnTitle: 'Use fun as a Value',
  learnText: 'An anonymous function uses the fun keyword without a function name. Unlike a lambda, a regular return inside it exits that anonymous function itself, not the outer caller.',
  takeaway: 'Use fun (...) { return ... } when an unnamed function requires an explicit local return boundary or multiple return statements.',
  example: [
    'fun main() {',
    '    val double = fun(number: Int): Int { return number * 2 }',
    '    println(double(6))',
    '}',
  ],
  exploreCards: [
    {
      title: 'Explicit local early return',
      subtitle: 'Multiple return statements allow guard clauses without labels.',
      code: [
        'val safeDivide = fun(a: Int, b: Int): Int {',
        '    if (b == 0) return 0',
        '    return a / b',
        '}',
        'println(safeDivide(12, 3))',
        'println(safeDivide(10, 0))',
      ],
      whatItMeans: [{ label: 'return 0', description: 'Exits the anonymous function early when division by zero would occur.' }],
      whatChanged: 'Demonstrated guard clauses returning locally from the anonymous function.',
    },
    {
      title: 'String transformation function',
      subtitle: 'Explicit parameter types and return type define a clear contract.',
      code: [
        'val tag = fun(word: String): String { return "[" + word + "]" }',
        'println(tag("Kotlin"))',
      ],
      whatItMeans: [{ label: 'fun(word: String): String', description: 'Defines an anonymous function taking String and returning String.' }],
      whatChanged: 'Used an anonymous function to enclose a string in brackets.',
    },
    {
      title: 'Expression-body anonymous function',
      subtitle: 'Single-expression syntax fun(...) = expr is supported without explicit return.',
      code: [
        'val square = fun(x: Int): Int = x * x',
        'println(square(6))',
      ],
      whatItMeans: [{ label: '= x * x', description: 'Directly computes and returns the squared result.' }],
      whatChanged: 'Wrote an anonymous function with single-expression body syntax.',
    },
    {
      title: 'Passing an anonymous function to higher-order functions',
      subtitle: 'Anonymous functions can be passed directly into standard library functions like filter.',
      code: [
        'val numbers = listOf(1, 2, 3, 4, 5, 6)',
        'val evens = numbers.filter(fun(n: Int): Boolean { return n % 2 == 0 })',
        'println(evens)',
      ],
      whatItMeans: [{ label: 'filter(fun(...) { ... })', description: 'Passes the anonymous function inside parentheses as an argument to filter.' }],
      whatChanged: 'Supplied an explicit anonymous function with local return into a higher-order collection function.',
    },
  ],
  predictions: [
    {
      code: ['fun main() {', '    val next = fun(n: Int): Int { return n + 1 }', '    println(next(8))', '}'],
      options: [
        { id: 'A', label: '9', isCorrect: true },
        { id: 'B', label: '8', isCorrect: false },
        { id: 'C', label: '1', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The anonymous function executes return 8 + 1, producing 9.',
    },
    {
      code: ['fun main() {', '    val twice = fun(n: Int): Int { return n * 2 }', '    println(twice(5))', '}'],
      options: [
        { id: 'A', label: '10', isCorrect: true },
        { id: 'B', label: '5', isCorrect: false },
        { id: 'C', label: '2', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'Calling twice(5) returns 5 * 2 = 10.',
    },
    {
      code: ['fun main() {', '    val tag = fun(word: String): String { return "#" + word }', '    println(tag("kotlin"))', '}'],
      options: [
        { id: 'A', label: '#kotlin', isCorrect: true },
        { id: 'B', label: 'kotlin', isCorrect: false },
        { id: 'C', label: '#', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'Prefixes "#" to the argument "kotlin", giving "#kotlin".',
    },
    {
      code: [
        'fun main() {',
        '    val items = listOf("cat", "elephant", "dog")',
        '    val longWords = items.filter(fun(w: String): Boolean { return w.length > 3 })',
        '    println(longWords)',
        '}',
      ],
      options: [
        { id: 'A', label: '[elephant]', isCorrect: true },
        { id: 'B', label: '[cat, dog]', isCorrect: false },
        { id: 'C', label: '[cat, elephant, dog]', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'filter evaluates each string with the anonymous function; only "elephant" has length > 3, yielding [elephant].',
    },
  ],
  challenge: 'Create a Local Formatter',
  description: 'Store an anonymous function in format. It should return "Score: " + value. Print format(42).',
  initialCode: 'fun main() {\n    // Create format as an anonymous function taking value: Int:\n\n    println(format(42))\n}',
  solutionCode: 'fun main() {\n    val format = fun(value: Int): String { return "Score: " + value }\n    println(format(42))\n}',
  expectedOutput: 'Score: 42',
  debugTitle: 'Fix the Reference Code Formatter',
  debugSubtitle: 'The reference formatter adds 1 to the code parameter, producing REF-101 instead of REF-100.',
  brokenCode: 'fun main() {\n    val parseCode = fun(code: Int): String { return "REF-" + (code + 1) }\n    println(parseCode(100))\n}',
  fixedCode: 'fun main() {\n    val parseCode = fun(code: Int): String { return "REF-" + code }\n    println(parseCode(100))\n}',
  debugExpectedOutput: 'REF-100',
  hints: [
    'The reference code should keep the exact integer passed in.',
    'Notice the + 1 addition to code in the return expression.',
    'Remove (code + 1) and return "REF-" + code.',
  ],
  debugExplanation: 'The anonymous function altered the input value by adding 1. Removing the + 1 restores the correct code REF-100.',
});

export const FUNCTION_TYPES_LESSON = runnableLesson({
  key: 'function-types',
  topic: 'Function types',
  learnTitle: 'Describe a Callable Value',
  learnText: 'A function type such as (Int) -> Int describes what inputs a callable accepts and what type of value it returns.',
  takeaway: 'Read (Input) -> Output as the explicit type signature and contract for any function value.',
  example: [
    'fun main() {',
    '    val double: (Int) -> Int = { n -> n * 2 }',
    '    println(double(5))',
    '}',
  ],
  exploreCards: [
    {
      title: 'Two-parameter function contract',
      subtitle: 'The function type (String, Int) -> String accepts two parameters in exact order.',
      code: [
        'val combine: (String, Int) -> String = { text, count -> text + count }',
        'println(combine("Level ", 5))',
      ],
      whatItMeans: [{ label: '(String, Int) -> String', description: 'Requires a String first, an Int second, and produces a String.' }],
      whatChanged: 'Annotated a multi-parameter lambda with an explicit two-argument function type.',
    },
    {
      title: 'Zero-parameter function type',
      subtitle: 'An empty parameter list () -> ReturnType represents a supplier or thunk.',
      code: [
        'val ping: () -> String = { "PONG" }',
        'println(ping())',
      ],
      whatItMeans: [{ label: '() -> String', description: 'Takes zero arguments and returns a String when called.' }],
      whatChanged: 'Declared a zero-parameter function type invoked with ping().',
    },
    {
      title: 'Reassigning a function-typed variable',
      subtitle: 'A var with a function type can hold any matching callable implementation.',
      code: [
        'var op: (Int) -> Int = { it * 2 }',
        'println(op(4))',
        'op = { it + 10 }',
        'println(op(4))',
      ],
      whatItMeans: [{ label: 'op = { it + 10 }', description: 'Replaces the doubling logic with an adding logic matching (Int) -> Int.' }],
      whatChanged: 'Swapped the active implementation stored in a function-typed variable at runtime.',
    },
  ],
  predictions: [
    {
      code: ['fun main() {', '    val plusTwo: (Int) -> Int = { n -> n + 2 }', '    println(plusTwo(7))', '}'],
      options: [
        { id: 'A', label: '9', isCorrect: true },
        { id: 'B', label: '7', isCorrect: false },
        { id: 'C', label: '2', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The callable contract is (Int) -> Int; calling plusTwo(7) returns 7 + 2 = 9.',
    },
    {
      code: ['fun main() {', '    val echo: (String) -> String = { text -> text + "!" }', '    println(echo("Go"))', '}'],
      options: [
        { id: 'A', label: 'Go!', isCorrect: true },
        { id: 'B', label: 'Go', isCorrect: false },
        { id: 'C', label: '!', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The String-to-String lambda appends "!" to "Go", printing "Go!".',
    },
    {
      code: ['fun main() {', '    val subtract: (Int, Int) -> Int = { a, b -> a - b }', '    println(subtract(9, 4))', '}'],
      options: [
        { id: 'A', label: '5', isCorrect: true },
        { id: 'B', label: '13', isCorrect: false },
        { id: 'C', label: '-5', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'Passes 9 as a and 4 as b, calculating 9 - 4 = 5.',
    },
  ],
  challenge: 'Declare a Discount Function',
  description: 'Declare discount with type (Int) -> Int. Its lambda should subtract 5 from price. Print discount(30).',
  initialCode: 'fun main() {\n    // Declare discount with type (Int) -> Int:\n\n    println(discount(30))\n}',
  solutionCode: 'fun main() {\n    val discount: (Int) -> Int = { price -> price - 5 }\n    println(discount(30))\n}',
  expectedOutput: '25',
  debugTitle: 'Fix the Surcharge Calculation',
  debugSubtitle: 'The surcharge function subtracts 8 instead of adding it, producing 12 instead of 28.',
  brokenCode: 'fun main() {\n    val addSurcharge: (Int) -> Int = { weight -> weight - 8 }\n    println(addSurcharge(20))\n}',
  fixedCode: 'fun main() {\n    val addSurcharge: (Int) -> Int = { weight -> weight + 8 }\n    println(addSurcharge(20))\n}',
  debugExpectedOutput: '28',
  hints: [
    'A surcharge must increase the cost by 8.',
    'Check whether the lambda uses + or - between weight and 8.',
    'Change weight - 8 to weight + 8.',
  ],
  debugExplanation: 'The lambda subtracted 8 from 20 instead of adding 8. Changing the subtraction to addition restores the expected result 28.',
});

export const HIGHER_ORDER_FUNCTIONS_LESSON = runnableLesson({
  key: 'higher-order-functions',
  topic: 'Higher-order functions',
  learnTitle: 'Accept Behavior as an Argument',
  learnText: 'A higher-order function is a function that receives another function as a parameter, returns a function, or both. Trailing lambdas can be placed outside the argument parentheses.',
  takeaway: 'Pass an operation parameter when one reusable algorithm should operate with caller-provided behaviors.',
  example: [
    'fun apply(value: Int, operation: (Int) -> Int): Int {',
    '    return operation(value)',
    '}',
    'fun main() {',
    '    println(apply(4) { it * 3 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'Trailing lambda syntax',
      subtitle: 'When the last parameter is a function type, the lambda can sit outside parentheses.',
      code: [
        'fun apply(value: Int, operation: (Int) -> Int): Int {',
        '    return operation(value)',
        '}',
        'println(apply(4) { it * 3 })',
      ],
      whatItMeans: [{ label: 'apply(4) { it * 3 }', description: '4 is passed inside parentheses; the operation lambda follows outside.' }],
      whatChanged: 'Demonstrated Kotlin’s conventional trailing lambda calling syntax.',
    },
    {
      title: 'Swapping operations with one higher-order function',
      subtitle: 'The caller chooses the operation, while apply controls when the operation runs.',
      code: [
        'fun apply(value: Int, operation: (Int) -> Int): Int {',
        '    return operation(value)',
        '}',
        'println(apply(10) { it + 2 })',
        'println(apply(10) { it * 5 })',
      ],
      whatItMeans: [{ label: 'Reusable engine', description: 'The exact same apply function handles addition and multiplication.' }],
      whatChanged: 'Passed two different operations to the same higher-order function.',
    },
    {
      title: 'Two data arguments and an operation',
      subtitle: 'Higher-order functions can accept multiple arguments before the function parameter.',
      code: [
        'fun combine(a: Int, b: Int, op: (Int, Int) -> Int): Int = op(a, b)',
        'println(combine(7, 3) { x, y -> x - y })',
      ],
      whatItMeans: [{ label: 'combine(7, 3) { ... }', description: 'Passes 7 and 3, then executes the subtraction lambda on them.' }],
      whatChanged: 'Used a higher-order function that combines two inputs with a binary lambda.',
    },
  ],
  predictions: [
    {
      code: ['fun run(value: Int, op: (Int) -> Int): Int { return op(value) }', 'fun main() {', '    println(run(3) { it * 4 })', '}'],
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '7', isCorrect: false },
        { id: 'C', label: '3', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'run invokes op with value 3, computing 3 * 4 = 12.',
    },
    {
      code: ['fun run(value: Int, op: (Int) -> Int): Int { return op(value) }', 'fun main() {', '    println(run(8) { it + 2 })', '}'],
      options: [
        { id: 'A', label: '10', isCorrect: true },
        { id: 'B', label: '8', isCorrect: false },
        { id: 'C', label: '16', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'run passes 8 into { it + 2 }, returning 10.',
    },
    {
      code: ['fun calculate(x: Int, op: (Int) -> Int): Int = op(x)', 'fun main() {', '    val step = { n: Int -> n - 3 }', '    println(calculate(9, step))', '}'],
      options: [
        { id: 'A', label: '6', isCorrect: true },
        { id: 'B', label: '9', isCorrect: false },
        { id: 'C', label: '3', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'calculate passes 9 into the step lambda, returning 9 - 3 = 6.',
    },
  ],
  challenge: 'Apply a Bonus Rule',
  description: 'Write applyBonus(value, operation) so it returns operation(value). In main, print applyBonus(10) { it + 5 }.',
  initialCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    // Return operation(value):\n\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}',
  solutionCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    return operation(value)\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}',
  expectedOutput: '15',
  debugTitle: 'Fix Bypassed Higher-Order Policy',
  debugSubtitle: 'modifyScore returns score directly without invoking the supplied policy lambda, printing 50 instead of 100.',
  brokenCode: 'fun modifyScore(score: Int, policy: (Int) -> Int): Int {\n    return score\n}\n\nfun main() {\n    println(modifyScore(50) { it * 2 })\n}',
  fixedCode: 'fun modifyScore(score: Int, policy: (Int) -> Int): Int {\n    return policy(score)\n}\n\nfun main() {\n    println(modifyScore(50) { it * 2 })\n}',
  debugExpectedOutput: '100',
  hints: [
    'The higher-order function must actually call the policy parameter.',
    'Returning score ignores the multiplier passed in main().',
    'Change return score to return policy(score).',
  ],
  debugExplanation: 'The function ignored its policy argument and returned the raw score. Calling policy(score) executes the doubling lambda and returns 100.',
});

export const IT_LESSON = runnableLesson({
  key: 'it',
  topic: 'it',
  learnTitle: 'Use Kotlin’s Implicit Lambda Parameter',
  learnText: 'When the context supplies a function type with exactly one parameter, Kotlin lets you omit the parameter declaration and -> arrow entirely and refer to the argument as it.',
  takeaway: 'Use it when a single parameter is obvious from context; use an explicit name when clarity or nesting requires it.',
  example: [
    'fun main() {',
    '    val double: (Int) -> Int = { it * 2 }',
    '    println(double(8))',
    '}',
  ],
  exploreCards: [
    {
      title: 'it in collection transformations',
      subtitle: 'Standard library functions like map supply each element through it.',
      code: [
        'val items = listOf(1, 2, 3)',
        'println(items.map { it * 10 })',
      ],
      whatItMeans: [{ label: 'it * 10', description: 'it represents each integer in items consecutively.' }],
      whatChanged: 'Used it inside standard library collection map.',
    },
    {
      title: 'String method chaining on it',
      subtitle: 'it can receive any type, such as String, and call member methods on it directly.',
      code: [
        'val shout: (String) -> String = { it.uppercase() + "!" }',
        'println(shout("hello"))',
      ],
      whatItMeans: [{ label: 'it.uppercase()', description: 'Calls String.uppercase() on the implicit it parameter.' }],
      whatChanged: 'Invoked a method on the implicit it argument.',
    },
    {
      title: 'Boolean predicate using it',
      subtitle: 'Predicates return Boolean conditions evaluated against it.',
      code: [
        'val isPositive: (Int) -> Boolean = { it > 0 }',
        'println(isPositive(4))',
        'println(isPositive(-2))',
      ],
      whatItMeans: [{ label: 'it > 0', description: 'Evaluates whether the implicit integer input is strictly positive.' }],
      whatChanged: 'Created a predicate lambda utilizing it.',
    },
  ],
  predictions: [
    {
      code: ['fun main() {', '    val next: (Int) -> Int = { it + 1 }', '    println(next(4))', '}'],
      options: [
        { id: 'A', label: '5', isCorrect: true },
        { id: 'B', label: '4', isCorrect: false },
        { id: 'C', label: '1', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'it is assigned 4, so it + 1 produces 5.',
    },
    {
      code: ['fun main() {', '    val loud: (String) -> String = { it + "!" }', '    println(loud("Yes"))', '}'],
      options: [
        { id: 'A', label: 'Yes!', isCorrect: true },
        { id: 'B', label: 'Yes', isCorrect: false },
        { id: 'C', label: 'it!', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'it is the string "Yes", so appending "!" gives "Yes!".',
    },
    {
      code: ['fun main() {', '    val half: (Int) -> Int = { it / 2 }', '    println(half(8))', '}'],
      options: [
        { id: 'A', label: '4', isCorrect: true },
        { id: 'B', label: '8', isCorrect: false },
        { id: 'C', label: '2', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'it receives 8; integer division 8 / 2 results in 4.',
    },
  ],
  challenge: 'Use the Implicit Input',
  description: 'Create a lambda named cheer with type (String) -> String. Use it to return "Go, " + it + "!". Print cheer("Team").',
  initialCode: 'fun main() {\n    // Create cheer using implicit it:\n\n    println(cheer("Team"))\n}',
  solutionCode: 'fun main() {\n    val cheer: (String) -> String = { "Go, " + it + "!" }\n    println(cheer("Team"))\n}',
  expectedOutput: 'Go, Team!',
  debugTitle: 'Fix the Unit Suffix Position',
  debugSubtitle: 'The unit formatter prepends the unit prefix instead of appending it as a suffix, printing px24 instead of 24px.',
  brokenCode: 'fun main() {\n    val addUnit: (Int) -> String = { "px" + it }\n    println(addUnit(24))\n}',
  fixedCode: 'fun main() {\n    val addUnit: (Int) -> String = { it.toString() + "px" }\n    println(addUnit(24))\n}',
  debugExpectedOutput: '24px',
  hints: [
    'The pixel unit "px" must come after the number, not before it.',
    'Convert the number to string and append "px".',
    'Use it.toString() + "px" or "$it" + "px".',
  ],
  debugExplanation: 'The original code placed "px" in front of it. Swapping the concatenation order to it.toString() + "px" produces 24px.',
});

export const FUNCTION_REFERENCES_LESSON = runnableLesson({
  key: 'function-references',
  topic: 'Function references',
  learnTitle: 'Pass a Named Function with ::',
  learnText: 'Prefixing an existing function with :: produces a function reference. This allows passing a named function wherever a matching function type is expected.',
  takeaway: 'Use ::name to pass an existing named function as a callable value without wrapping it in an extra lambda.',
  example: [
    'fun double(n: Int): Int = n * 2',
    'fun main() {',
    '    val operation: (Int) -> Int = ::double',
    '    println(operation(5))',
    '}',
  ],
  exploreCards: [
    {
      title: 'Passing a reference to a higher-order function',
      subtitle: 'A named predicate can be passed directly using ::isEven.',
      code: [
        'fun isEven(n: Int): Boolean = n % 2 == 0',
        'fun check(x: Int, predicate: (Int) -> Boolean): Boolean = predicate(x)',
        'println(check(8, ::isEven))',
        'println(check(7, ::isEven))',
      ],
      whatItMeans: [{ label: '::isEven', description: 'Refers to the named isEven function without invoking it immediately.' }],
      whatChanged: 'Passed a top-level function reference as an argument.',
    },
    {
      title: 'Storing a reference in a typed variable',
      subtitle: 'A reference matches any function type with equivalent parameters and return type.',
      code: [
        'fun cube(n: Int): Int = n * n * n',
        'val op: (Int) -> Int = ::cube',
        'println(op(3))',
      ],
      whatItMeans: [{ label: 'val op = ::cube', description: 'op stores a reference to cube, which can be called with op(3).' }],
      whatChanged: 'Assigned ::cube to an (Int) -> Int variable.',
    },
    {
      title: 'String function reference',
      subtitle: 'Works with text parameters and returns matching (String) -> String.',
      code: [
        'fun greet(name: String): String = "Hello, " + name',
        'val fn: (String) -> String = ::greet',
        'println(fn("Alex"))',
      ],
      whatItMeans: [{ label: '::greet', description: 'A reference to the greet function conforming to (String) -> String.' }],
      whatChanged: 'Created a function reference taking and returning a String.',
    },
  ],
  predictions: [
    {
      code: ['fun plusOne(n: Int): Int = n + 1', 'fun main() {', '    val op: (Int) -> Int = ::plusOne', '    println(op(9))', '}'],
      options: [
        { id: 'A', label: '10', isCorrect: true },
        { id: 'B', label: '9', isCorrect: false },
        { id: 'C', label: '1', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'op refers to plusOne; op(9) calls plusOne(9), returning 10.',
    },
    {
      code: ['fun label(n: Int): String = "#" + n', 'fun main() {', '    val tag: (Int) -> String = ::label', '    println(tag(3))', '}'],
      options: [
        { id: 'A', label: '#3', isCorrect: true },
        { id: 'B', label: '3', isCorrect: false },
        { id: 'C', label: '#', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'tag refers to label; tag(3) evaluates "#" + 3 = "#3".',
    },
    {
      code: ['fun triple(n: Int): Int = n * 3', 'fun main() {', '    println((::triple)(4))', '}'],
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '4', isCorrect: false },
        { id: 'C', label: '3', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: '(::triple)(4) directly invokes the function reference with 4, producing 12.',
    },
  ],
  challenge: 'Reference a Named Formatter',
  description: 'Write a named function stamp that returns "ID-" + number. Store ::stamp in formatter and print formatter(7).',
  initialCode: 'fun stamp(number: Int): String {\n    // Return "ID-" + number:\n\n}\n\nfun main() {\n    // Store ::stamp in formatter:\n\n    println(formatter(7))\n}',
  solutionCode: 'fun stamp(number: Int): String {\n    return "ID-" + number\n}\n\nfun main() {\n    val formatter: (Int) -> String = ::stamp\n    println(formatter(7))\n}',
  expectedOutput: 'ID-7',
  debugTitle: 'Fix the Bypassed Function Reference',
  debugSubtitle: 'taxFunc uses an identity lambda instead of referencing calculateTax, printing 50 instead of 5.',
  brokenCode: 'fun calculateTax(amount: Int): Int = amount / 10\n\nfun main() {\n    val taxFunc: (Int) -> Int = { amount -> amount }\n    println(taxFunc(50))\n}',
  fixedCode: 'fun calculateTax(amount: Int): Int = amount / 10\n\nfun main() {\n    val taxFunc: (Int) -> Int = ::calculateTax\n    println(taxFunc(50))\n}',
  debugExpectedOutput: '5',
  hints: [
    'taxFunc must reference the calculateTax function.',
    'Replace the lambda with a function reference syntax using ::.',
    'Assign ::calculateTax to taxFunc.',
  ],
  debugExplanation: 'The code mistakenly assigned a dummy lambda returning amount unmodified. Assigning ::calculateTax calls the division logic, printing 5.',
});

export const RETURNING_FROM_LAMBDAS_LESSON = runnableLesson({
  key: 'returning-from-lambdas',
  topic: 'Returning from lambdas',
  learnTitle: 'The Last Lambda Expression Is Its Result',
  learnText: 'In Kotlin, a lambda returns the value of its final expression automatically. You do not write return inside a lambda for normal returns.',
  takeaway: 'Make the last expression inside the lambda braces the exact value you want the lambda to produce.',
  example: [
    'fun main() {',
    '    val priceWithTax: (Int) -> Int = { price -> price + 2 }',
    '    println(priceWithTax(10))',
    '}',
  ],
  exploreCards: [
    {
      title: 'Multiline lambda with final expression',
      subtitle: 'Intermediate variables can be declared, and the final line is returned.',
      code: [
        'val compute = { x: Int ->',
        '    val step1 = x * 2',
        '    val step2 = step1 + 3',
        '    step2',
        '}',
        'println(compute(4))',
      ],
      whatItMeans: [{ label: 'step2', description: 'Since step2 is the last expression, its value (11) is the lambda result.' }],
      whatChanged: 'Executed multi-step calculations where the last line produces the returned value.',
    },
    {
      title: 'Returning an if-else expression',
      subtitle: 'Because if is an expression in Kotlin, its chosen branch becomes the lambda result.',
      code: [
        'val sign = { n: Int -> if (n >= 0) "pos" else "neg" }',
        'println(sign(-5))',
        'println(sign(3))',
      ],
      whatItMeans: [{ label: 'if (...) ... else ...', description: 'The branch that evaluates becomes the lambda result.' }],
      whatChanged: 'Used an inline conditional expression as the final lambda expression.',
    },
    {
      title: 'Returning a Boolean comparison',
      subtitle: 'Logical comparisons directly return true or false.',
      code: [
        'val inRange = { n: Int -> n >= 1 && n <= 10 }',
        'println(inRange(7))',
        'println(inRange(15))',
      ],
      whatItMeans: [{ label: 'n >= 1 && n <= 10', description: 'Returns a Boolean without needing any if statement.' }],
      whatChanged: 'Returned a Boolean condition from a lambda.',
    },
  ],
  predictions: [
    {
      code: ['fun main() {', '    val add = { n: Int -> n + 4 }', '    println(add(2))', '}'],
      options: [
        { id: 'A', label: '6', isCorrect: true },
        { id: 'B', label: '2', isCorrect: false },
        { id: 'C', label: '4', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'n + 4 is the final expression, returning 2 + 4 = 6.',
    },
    {
      code: ['fun main() {', '    val label = { n: Int -> "Level " + n }', '    println(label(3))', '}'],
      options: [
        { id: 'A', label: 'Level 3', isCorrect: true },
        { id: 'B', label: '3', isCorrect: false },
        { id: 'C', label: 'Level', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The final concatenation produces "Level 3".',
    },
    {
      code: ['fun main() {', '    val check = { n: Int -> n > 5 }', '    println(check(7))', '}'],
      options: [
        { id: 'A', label: 'true', isCorrect: true },
        { id: 'B', label: 'false', isCorrect: false },
        { id: 'C', label: '7', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: '7 > 5 evaluates to true, which is returned.',
    },
  ],
  challenge: 'Return a Shipping Total',
  description: 'Create total: (Int) -> Int as a lambda whose final expression adds 4 to subtotal. Print total(16).',
  initialCode: 'fun main() {\n    // Create total as a lambda returning subtotal + 4:\n\n    println(total(16))\n}',
  solutionCode: 'fun main() {\n    val total: (Int) -> Int = { subtotal -> subtotal + 4 }\n    println(total(16))\n}',
  expectedOutput: '20',
  debugTitle: 'Fix the Multiline Lambda Return Value',
  debugSubtitle: 'calculateBonus returns the extra variable alone rather than adding it to base, printing 15 instead of 115.',
  brokenCode: 'fun main() {\n    val calculateBonus = { base: Int ->\n        val extra = 15\n        extra\n    }\n    println(calculateBonus(100))\n}',
  fixedCode: 'fun main() {\n    val calculateBonus = { base: Int ->\n        val extra = 15\n        base + extra\n    }\n    println(calculateBonus(100))\n}',
  debugExpectedOutput: '115',
  hints: [
    'The bonus calculation must include the base amount.',
    'Look at the final expression inside the calculateBonus lambda.',
    'Change the last line from extra to base + extra.',
  ],
  debugExplanation: 'The lambda ended with extra alone, discarding base. Ending with base + extra produces the expected sum 115.',
});

export const LOCAL_RETURNS_LESSON: FiveStageLesson = runnableLesson({
  key: 'local-returns',
  topic: 'Local returns',
  learnTitle: 'Return From the Intended Boundary',
  learnText: 'A labelled return such as return@forEach exits only the current lambda invocation. In contrast, an unlabelled return inside an inlined lambda exits the surrounding enclosing function.',
  takeaway: 'Use return@label to skip or finish the current lambda callback without aborting the enclosing function.',
  example: [
    'fun sumPositive(values: List<Int>): Int {',
    '    var total = 0',
    '    values.forEach {',
    '        if (it < 0) return@forEach',
    '        total += it',
    '    }',
    '    return total',
    '}',
    'fun main() {',
    '    println(sumPositive(listOf(1, -1, 2, -2, 4)))',
    '}',
  ],
  exploreCards: [
    {
      title: 'return@forEach skips one iteration',
      subtitle: 'Labelled return acts like continue for a forEach loop.',
      code: [
        'val numbers = listOf(1, -2, 3, -4, 5)',
        'numbers.forEach {',
        '    if (it < 0) return@forEach',
        '    println(it)',
        '}',
      ],
      whatItMeans: [{ label: 'return@forEach', description: 'Immediately exits the lambda for the current element, proceeding to the next element.' }],
      whatChanged: 'Printed only positive numbers by skipping negatives with return@forEach.',
    },
    {
      title: 'Non-local return exits the enclosing function',
      subtitle: 'A bare return inside an inlined function exits the surrounding named function completely.',
      code: [
        'fun findFirstEven(list: List<Int>): Int {',
        '    list.forEach {',
        '        if (it % 2 == 0) return it',
        '    }',
        '    return -1',
        '}',
        'fun main() {',
        '    println(findFirstEven(listOf(1, 3, 4, 7)))',
        '}',
      ],
      whatItMeans: [{ label: 'return it', description: 'Immediately returns from findFirstEven as soon as an even number is found.' }],
      whatChanged: 'Demonstrated a non-local return through inline forEach.',
    },
    {
      title: 'Custom explicit lambda label',
      subtitle: 'A lambda can be prefixed with label@ to enable return@label.',
      code: [
        'val sanitize: (Int) -> Int = filter@ { n ->',
        '    if (n < 0) return@filter 0',
        '    n * 2',
        '}',
        'println(sanitize(-3))',
        'println(sanitize(5))',
      ],
      whatItMeans: [{ label: 'filter@ { ... return@filter 0 }', description: 'Returns 0 from the lambda early when n < 0.' }],
      whatChanged: 'Attached a custom label to a lambda and returned a value locally.',
    },
  ],
  predictions: [
    {
      code: [
        'fun main() {',
        '    val items = listOf(1, -2, 3)',
        '    items.forEach { item ->',
        '        if (item < 0) return@forEach',
        '        println(item)',
        '    }',
        '}',
      ],
      options: [
        { id: 'A', label: '1\n3', isCorrect: true },
        { id: 'B', label: '1', isCorrect: false },
        { id: 'C', label: '1\n-2\n3', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'The negative item -2 hits return@forEach, skipping its print. 1 and 3 are printed.',
    },
    {
      code: [
        'fun search(numbers: List<Int>): Int {',
        '    numbers.forEach {',
        '        if (it > 10) return it',
        '    }',
        '    return 0',
        '}',
        'fun main() {',
        '    println(search(listOf(4, 15, 8)))',
        '}',
      ],
      options: [
        { id: 'A', label: '15', isCorrect: true },
        { id: 'B', label: '0', isCorrect: false },
        { id: 'C', label: '4', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'When 15 is encountered, the bare return it exits search() immediately with 15.',
    },
    {
      code: [
        'fun main() {',
        '    var count = 0',
        '    listOf(2, 4, 5, 6).forEach {',
        '        if (it % 2 != 0) return@forEach',
        '        count += it',
        '    }',
        '    println(count)',
        '}',
      ],
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '17', isCorrect: false },
        { id: 'C', label: '6', isCorrect: false },
        { id: 'D', label: '0', isCorrect: false },
      ],
      detail: '5 is skipped by return@forEach. The remaining numbers 2 + 4 + 6 sum to 12.',
    },
  ],
  challenge: 'Skip Negatives Without Stopping the Sum',
  description: 'Complete sumPositive(values) using forEach. Skip negative items with return@forEach, sum the others, and return total. The provided main must print 7.',
  initialCode: 'fun sumPositive(values: List<Int>): Int {\n    var total = 0\n    values.forEach {\n        // 1. Skip negative items with a labelled return.\n        // 2. Add remaining items to total.\n    }\n    return total\n}\n\nfun main() {\n    println(sumPositive(listOf(1, -1, 2, -2, 4)))\n}',
  solutionCode: 'fun sumPositive(values: List<Int>): Int {\n    var total = 0\n    values.forEach {\n        if (it < 0) return@forEach\n        total += it\n    }\n    return total\n}\n\nfun main() {\n    println(sumPositive(listOf(1, -1, 2, -2, 4)))\n}',
  expectedOutput: '7',
  debugTitle: 'Fix the Premature Return in Word Counter',
  debugSubtitle: 'countLongWords uses bare return count instead of return@forEach, exiting on the first short word and returning 0 instead of 2.',
  brokenCode: 'fun countLongWords(words: List<String>): Int {\n    var count = 0\n    words.forEach {\n        if (it.length <= 3) return count\n        count += 1\n    }\n    return count\n}\n\nfun main() {\n    println(countLongWords(listOf("cat", "elephant", "dog", "tiger")))\n}',
  fixedCode: 'fun countLongWords(words: List<String>): Int {\n    var count = 0\n    words.forEach {\n        if (it.length <= 3) return@forEach\n        count += 1\n    }\n    return count\n}\n\nfun main() {\n    println(countLongWords(listOf("cat", "elephant", "dog", "tiger")))\n}',
  debugExpectedOutput: '2',
  hints: [
    'A short word should skip only that item, not terminate the whole function.',
    'A bare return inside an inline forEach exits countLongWords prematurely.',
    'Replace return count inside the if statement with return@forEach.',
  ],
  debugExplanation: 'The bare return count exited countLongWords immediately when "cat" was checked. Using return@forEach skips only "cat" and "dog", counting "elephant" and "tiger" for a result of 2.',
});

export const INLINE_FUNCTIONS_LESSON = reasoningLesson({
  key: 'inline-functions',
  topic: 'Inline functions',
  learnTitle: 'Ask the Compiler to Inline a Function',
  learnText: 'The inline modifier requests the Kotlin compiler to copy the function body and its lambda parameters directly into call sites, which can avoid lambda allocation at those call sites and permit non-local returns from eligible lambda arguments. The editor checks behavior, not JVM bytecode or performance.',
  takeaway: 'Mark higher-order functions inline when they take function parameters and you want to avoid lambda allocation overhead or permit non-local returns.',
  example: [
    'inline fun execute(action: () -> Unit) {',
    '    action()',
    '}',
    'fun main() {',
    '    execute { println("Inlined execution!") }',
    '}',
  ],
  exploreCards: [
    {
      title: 'Direct inlining at the call site',
      subtitle: 'The compiler copies the inline function body and lambda directly into the caller.',
      code: [
        'inline fun execute(action: () -> Unit) {',
        '    action()',
        '}',
        'fun main() {',
        '    execute { println("Running directly!") }',
        '}',
      ],
      whatItMeans: [{ label: 'inline fun execute', description: 'No Function object is created; the println is substituted into main() by the compiler.' }],
      whatChanged: 'Inlined a simple higher-order action at the call site.',
    },
    {
      title: 'Enabling non-local returns',
      subtitle: 'Because inline code is substituted into the caller, a bare return exits the enclosing function.',
      code: [
        'inline fun runSafe(action: () -> Unit) {',
        '    action()',
        '}',
        'fun evaluate(): String {',
        '    runSafe { return "Early exit" }',
        '    return "Finished"',
        '}',
        'fun main() {',
        '    println(evaluate())',
        '}',
      ],
      whatItMeans: [{ label: 'return "Early exit"', description: 'Exits evaluate() directly because runSafe is inlined.' }],
      whatChanged: 'Demonstrated that inlined lambdas support non-local returns.',
    },
    {
      title: 'Inlined parameter transformation',
      subtitle: 'Functions taking typed transformations can also be marked inline.',
      code: [
        'inline fun compute(value: Int, operation: (Int) -> Int): Int {',
        '    return operation(value)',
        '}',
        'fun main() {',
        '    println(compute(8) { it * 2 })',
        '}',
      ],
      whatItMeans: [{ label: 'compute(8) { it * 2 }', description: 'Both compute and the multiplication lambda are inlined into main.' }],
      whatChanged: 'Applied an inlined transformation function.',
    },
  ],
  predictions: [
    {
      prompt: 'What does the Kotlin compiler do for an inline function call?',
      options: [
        { id: 'A', label: 'It copies the function bytecode and the lambda code directly into the calling site.', isCorrect: true },
        { id: 'B', label: 'It creates a background thread to execute the lambda asynchronously.', isCorrect: false },
        { id: 'C', label: 'It converts all variables inside the lambda into global static variables.', isCorrect: false },
        { id: 'D', label: 'It delays execution until the garbage collector runs.', isCorrect: false },
      ],
      detail: 'Inlining replaces the function call with the actual contents of the function and lambda bytecode.',
    },
    {
      code: [
        'inline fun check(action: () -> Unit) { action() }',
        'fun test(): Int {',
        '    check { return 42 }',
        '    return 0',
        '}',
        'fun main() { println(test()) }',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '42', isCorrect: true },
        { id: 'B', label: '0', isCorrect: false },
        { id: 'C', label: 'Compiler error', isCorrect: false },
        { id: 'D', label: 'null', isCorrect: false },
      ],
      detail: 'Because check is inlined, return 42 performs a non-local return exiting test() with 42.',
    },
    {
      prompt: 'Why should you avoid inlining very large function bodies?',
      options: [
        { id: 'A', label: 'Inlining large functions can cause bytecode bloat because the code is duplicated at every call site.', isCorrect: true },
        { id: 'B', label: 'Because inline functions cannot accept Int or String parameters.', isCorrect: false },
        { id: 'C', label: 'Because the JVM forbids functions with more than 10 lines of code.', isCorrect: false },
        { id: 'D', label: 'Because large functions automatically run slower on the CPU.', isCorrect: false },
      ],
      detail: 'Duplicating large function bodies across many call sites inflates bytecode size significantly.',
    },
  ],
});

export const NOINLINE_LESSON = reasoningLesson({
  key: 'noinline',
  topic: 'noinline',
  learnTitle: 'Keep One Lambda as a Function Object',
  learnText: 'Inside an inline function, noinline tells the compiler NOT to inline a specific lambda parameter. This is necessary when that lambda must be stored in a variable or passed to a non-inline function.',
  takeaway: 'Use noinline on a parameter of an inline function when that lambda must be preserved as a callable object.',
  example: [
    'inline fun setup(noinline callback: (Int) -> Int): Int {',
    '    val saved = callback',
    '    return saved(5)',
    '}',
    'fun main() {',
    '    println(setup { it + 7 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'Storing a noinline lambda parameter',
      subtitle: 'Inlined lambdas cannot be stored as objects; noinline preserves the object.',
      code: [
        'inline fun setup(noinline callback: (Int) -> Int): Int {',
        '    val saved = callback',
        '    return saved(5)',
        '}',
        'fun main() {',
        '    println(setup { it + 7 })',
        '}',
      ],
      whatItMeans: [{ label: 'noinline callback', description: 'Kept as a real Function object, allowing val saved = callback.' }],
      whatChanged: 'Stored a noinline parameter into a local variable.',
    },
    {
      title: 'Mixing inline and noinline parameters',
      subtitle: 'An inline function can inline some parameters while keeping others as function objects.',
      code: [
        'inline fun runMixed(inlineOp: (Int) -> Int, noinline storedOp: (Int) -> Int): Int {',
        '    return inlineOp(2) + storedOp(3)',
        '}',
        'fun main() {',
        '    println(runMixed({ it * 2 }, { it * 3 }))',
        '}',
      ],
      whatItMeans: [{ label: 'inlineOp vs storedOp', description: 'inlineOp is inlined at the call site; storedOp remains a function object.' }],
      whatChanged: 'Combined inlined and non-inlined parameters in a single function.',
    },
    {
      title: 'Non-local returns are forbidden in noinline',
      subtitle: 'Because a noinline lambda is kept as an object, it cannot perform a non-local return.',
      code: [
        'inline fun process(noinline op: () -> Unit) {',
        '    op()',
        '}',
      ],
      whatItMeans: [{ label: 'No non-local return', description: 'A bare return inside a noinline lambda is rejected by the Kotlin compiler.' }],
      whatChanged: 'Clarified the return restrictions on noinline parameters.',
    },
  ],
  predictions: [
    {
      prompt: 'What does the noinline modifier do to a parameter in an inline function?',
      options: [
        { id: 'A', label: 'It keeps that specific lambda as a regular function object instead of inlining it.', isCorrect: true },
        { id: 'B', label: 'It prevents the function from ever being called.', isCorrect: false },
        { id: 'C', label: 'It makes the parameter accept only primitive numbers.', isCorrect: false },
        { id: 'D', label: 'It converts the lambda into an anonymous class at compile time only.', isCorrect: false },
      ],
      detail: 'noinline retains an ordinary callable value. It does not guarantee a fresh allocation on every call; backend optimizations can differ.',
    },
    {
      code: [
        'inline fun calculate(noinline op: (Int) -> Int): Int {',
        '    val stored = op',
        '    return stored(10)',
        '}',
        'fun main() {',
        '    println(calculate { it * 3 })',
        '}',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '30', isCorrect: true },
        { id: 'B', label: '10', isCorrect: false },
        { id: 'C', label: 'Compiler error', isCorrect: false },
        { id: 'D', label: '0', isCorrect: false },
      ],
      detail: 'The noinline lambda is stored and invoked with 10, returning 10 * 3 = 30.',
    },
    {
      prompt: 'Can a lambda passed to a noinline parameter use a bare non-local return?',
      options: [
        { id: 'A', label: 'No, non-local returns are only permitted in truly inlined lambdas.', isCorrect: true },
        { id: 'B', label: 'Yes, any lambda can return from the outer function at any time.', isCorrect: false },
        { id: 'C', label: 'Yes, but only if the function returns a String.', isCorrect: false },
        { id: 'D', label: 'Only if the parameter is also marked crossinline.', isCorrect: false },
      ],
      detail: 'Because noinline lambdas may be invoked later or from other scopes, non-local returns are disallowed.',
    },
  ],
});

export const CROSSINLINE_LESSON = reasoningLesson({
  key: 'crossinline',
  topic: 'crossinline',
  learnTitle: 'Forbid Non-Local Returns Safely',
  learnText: 'crossinline marks a lambda parameter of an inline function when that lambda will be executed inside another execution context, such as a local object or nested lambda. It allows inlining while disallowing non-local returns.',
  takeaway: 'Use crossinline when an inlined lambda is called from a nested scope where non-local returns would be illegal.',
  example: [
    'inline fun runWrapped(crossinline action: (Int) -> Int): Int {',
    '    val helper = { action(4) }',
    '    return helper()',
    '}',
    'fun main() {',
    '    println(runWrapped { it * 5 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'Calling an inlined lambda in a nested context',
      subtitle: 'crossinline allows action to be inlined even inside a local helper closure.',
      code: [
        'inline fun runWrapped(crossinline action: (Int) -> Int): Int {',
        '    val helper = { action(4) }',
        '    return helper()',
        '}',
        'fun main() {',
        '    println(runWrapped { it * 5 })',
        '}',
      ],
      whatItMeans: [{ label: 'crossinline action', description: 'Inlined into helper, but bare non-local returns are blocked.' }],
      whatChanged: 'Executed an inlined lambda from inside another nested closure.',
    },
    {
      title: 'Labelled return remains valid inside crossinline',
      subtitle: 'Local returns targeted with return@functionName are completely legal.',
      code: [
        'inline fun compute(crossinline step: (Int) -> Int): Int {',
        '    val task = { step(6) }',
        '    return task()',
        '}',
        'println(compute { if (it > 5) return@compute 0; it })',
      ],
      whatItMeans: [{ label: 'Local labelled return', description: 'Exiting the lambda itself with return@compute is allowed.' }],
      whatChanged: 'Demonstrated that crossinline forbids only non-local returns.',
    },
    {
      title: 'Why crossinline is required by the compiler',
      subtitle: 'Without crossinline, passing a lambda into another object or thread could break execution flow.',
      code: [
        'inline fun schedule(crossinline task: () -> Unit) {',
        '    val runnable = { task() }',
        '    runnable()',
        '}',
      ],
      whatItMeans: [{ label: 'Context boundary', description: 'Guarantees the lambda cannot jump out of callers on another call stack.' }],
      whatChanged: 'Illustrated context boundary protection with crossinline.',
    },
  ],
  predictions: [
    {
      prompt: 'What does crossinline prevent inside an inlined lambda?',
      options: [
        { id: 'A', label: 'It disallows non-local returns while still allowing the lambda body to be inlined.', isCorrect: true },
        { id: 'B', label: 'It prevents the lambda from accessing local variables.', isCorrect: false },
        { id: 'C', label: 'It forbids using the it keyword inside the lambda.', isCorrect: false },
        { id: 'D', label: 'It makes the function run on a separate CPU core.', isCorrect: false },
      ],
      detail: 'crossinline enables inlining while preventing unsafe non-local returns across execution boundaries.',
    },
    {
      code: [
        'inline fun execute(crossinline action: (Int) -> Int): Int {',
        '    val runner = { action(3) }',
        '    return runner()',
        '}',
        'fun main() {',
        '    println(execute { it * 4 })',
        '}',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '3', isCorrect: false },
        { id: 'C', label: '4', isCorrect: false },
        { id: 'D', label: 'Compiler error', isCorrect: false },
      ],
      detail: 'execute passes 3 to the action lambda via runner(), producing 3 * 4 = 12.',
    },
    {
      prompt: 'How can you exit early from a crossinline lambda if bare return is forbidden?',
      options: [
        { id: 'A', label: 'Use a labelled return such as return@functionName.', isCorrect: true },
        { id: 'B', label: 'Use a break statement.', isCorrect: false },
        { id: 'C', label: 'Throw a RuntimeException.', isCorrect: false },
        { id: 'D', label: 'Local returns are impossible in Kotlin lambdas.', isCorrect: false },
      ],
      detail: 'A return to the current lambda label exits that invocation; it does not attempt a non-local return.',
    },
  ],
});

export const WORLD_9_BOSS_LESSON = runnableLesson({
  key: 'boss',
  topic: 'Functional Utility Engine',
  learnTitle: 'Build Reusable Operations',
  learnText: 'A functional utility engine accepts behavior as function parameters, allowing one reusable pipeline to apply multiple distinct transformations without duplicating control flow.',
  takeaway: 'Combine function types, higher-order functions, lambdas, and function references to create flexible, modular pipelines.',
  example: [
    'fun apply(value: Int, operation: (Int) -> Int): Int {',
    '    return operation(value)',
    '}',
    'fun main() {',
    '    println(apply(6) { it * 2 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'Stored lambda vs. trailing lambda',
      subtitle: 'The same higher-order utility works seamlessly with both calling conventions.',
      code: [
        'fun apply(value: Int, operation: (Int) -> Int): Int { return operation(value) }',
        'val addTen: (Int) -> Int = { it + 10 }',
        'println(apply(5, addTen))',
      ],
      whatItMeans: [{ label: 'apply(5, addTen)', description: 'Supplies a pre-defined function value addTen to apply.' }],
      whatChanged: 'Called a higher-order function with a stored function value.',
    },
    {
      title: 'Chaining two transformation steps',
      subtitle: 'Compose functions by passing step1’s output into step2.',
      code: [
        'fun transform(value: Int, step1: (Int) -> Int, step2: (Int) -> Int): Int {',
        '    return step2(step1(value))',
        '}',
        'println(transform(5, { it + 3 }, { it * 2 }))',
      ],
      whatItMeans: [{ label: 'step2(step1(value))', description: '5 + 3 = 8, then 8 * 2 = 16.' }],
      whatChanged: 'Composed two functional steps sequentially.',
    },
    {
      title: 'Predicate filtering utility',
      subtitle: 'A utility counting matching items based on a caller-supplied predicate.',
      code: [
        'fun filterAndCount(items: List<Int>, predicate: (Int) -> Boolean): Int {',
        '    var count = 0',
        '    items.forEach { if (predicate(it)) count++ }',
        '    return count',
        '}',
        'println(filterAndCount(listOf(2, 5, 8, 11)) { it > 6 })',
      ],
      whatItMeans: [{ label: '{ it > 6 }', description: 'Predicate testing whether an element exceeds 6.' }],
      whatChanged: 'Built a functional filter-and-count utility.',
    },
  ],
  predictions: [
    {
      code: ['fun apply(n: Int, op: (Int) -> Int): Int { return op(n) }', 'fun main() {', '    println(apply(4) { it * it })', '}'],
      options: [
        { id: 'A', label: '16', isCorrect: true },
        { id: 'B', label: '8', isCorrect: false },
        { id: 'C', label: '4', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'apply supplies 4 to the squaring lambda, returning 4 * 4 = 16.',
    },
    {
      code: ['fun apply(n: Int, op: (Int) -> Int): Int { return op(n) }', 'fun main() {', '    val bonus: (Int) -> Int = { it + 10 }', '    println(apply(2, bonus))', '}'],
      options: [
        { id: 'A', label: '12', isCorrect: true },
        { id: 'B', label: '20', isCorrect: false },
        { id: 'C', label: '2', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'Passes 2 to the stored bonus operation, returning 2 + 10 = 12.',
    },
    {
      code: ['fun main() {', '    val label: (Int) -> String = { "Item-" + it }', '    println(label(3))', '}'],
      options: [
        { id: 'A', label: 'Item-3', isCorrect: true },
        { id: 'B', label: 'Item-it', isCorrect: false },
        { id: 'C', label: '3', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'Formats "Item-" with 3, producing "Item-3".',
    },
  ],
  challenge: 'Build the Functional Utility Engine',
  description: 'Create applyRule(value, rule) returning rule(value). In main, create double with type (Int) -> Int, then print applyRule(9, double) and applyRule(9) { it + 1 }.',
  initialCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    // Return rule(value):\n\n}\n\nfun main() {\n    // Create double as an (Int) -> Int lambda:\n\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}',
  solutionCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    return rule(value)\n}\n\nfun main() {\n    val double: (Int) -> Int = { it * 2 }\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}',
  expectedOutput: '18\n10',
  debugTitle: 'Fix the Pipeline Processor Ignored Operation',
  debugSubtitle: 'runTransform returns number unmodified instead of applying the operation lambda, printing 4 and 4 instead of 16 and 14.',
  brokenCode: 'fun runTransform(number: Int, operation: (Int) -> Int): Int {\n    return number\n}\n\nfun main() {\n    val square: (Int) -> Int = { it * it }\n    println(runTransform(4, square))\n    println(runTransform(4) { it + 10 })\n}',
  fixedCode: 'fun runTransform(number: Int, operation: (Int) -> Int): Int {\n    return operation(number)\n}\n\nfun main() {\n    val square: (Int) -> Int = { it * it }\n    println(runTransform(4, square))\n    println(runTransform(4) { it + 10 })\n}',
  debugExpectedOutput: '16\n14',
  hints: [
    'runTransform must execute the operation parameter on number.',
    'Returning number ignores the transformation.',
    'Change return number to return operation(number).',
  ],
  debugExplanation: 'The function returned number without executing operation(number). Calling operation(number) applies the square and addTen operations, yielding 16 and 14.',
});

// Coverage additions planned in WORLD_9_CONTENT_REVIEW.md. Outputs are independently
// checked by audit-world9-quality and the optional real Kotlin reference audit.
export const WORLD_9_LESSONS = [LAMBDA_EXPRESSIONS_LESSON, ANONYMOUS_FUNCTIONS_LESSON,
 FUNCTION_TYPES_LESSON, HIGHER_ORDER_FUNCTIONS_LESSON, IT_LESSON, FUNCTION_REFERENCES_LESSON,
 RETURNING_FROM_LAMBDAS_LESSON, LOCAL_RETURNS_LESSON, INLINE_FUNCTIONS_LESSON,
 NOINLINE_LESSON, CROSSINLINE_LESSON, WORLD_9_BOSS_LESSON];
export const WORLD_9_ADDED_OUTPUTS: Record<string, string> = {};
export const WORLD_9_COMPILE_ERRORS = new Set<string>();
function addCoverage(lesson: FiveStageLesson, title: string, explanation: string,
 example: string, output: string, prediction: string, answer: string, distractors: string[], compilerError = false) {
 const key = lesson.id.replace('world-9-', '');
 const cards = lesson.explore!.cards;
 if (example) {
  const id = `${key}-explore-${cards.length + 1}`;
  cards.push({ id, number: String(cards.length + 1).padStart(2, '0'), title, subtitle: explanation,
   language: 'Kotlin', code: example.split('\n'), whatItMeans: [{ label: title, description: explanation }],
   whatChanged: `Expected output:\n${output}` });
  WORLD_9_ADDED_OUTPUTS[id] = output;
 }
 const questions = lesson.predict!.questions;
 const id = `${key}-predict-${questions.length + 1}`;
 questions.push({ id, questionNumber: questions.length + 1, totalQuestions: 0, title,
  topicMeta: lesson.topicTitle, language: 'Kotlin', code: prediction.split('\n'),
  prompt: compilerError ? 'Does this code compile, and what happens?' : 'What will this code print?',
  options: [answer, ...distractors].map((label, i) => ({id: ['A','B','C','D'][i] as 'A'|'B'|'C'|'D', label, isCorrect: i === 0})),
  explanation: { codeRef: title, detail: explanation + (compilerError ? ' This program is rejected at compilation.' : ` The prediction prints:\n${answer}`) } });
 if (compilerError) WORLD_9_COMPILE_ERRORS.add(id);
 lesson.learn.keyIdeas.push({number: lesson.learn.keyIdeas.length + 1, title, description: explanation});
}
addCoverage(WORLD_9_LESSONS[0], "Captured state changes on invocation", "A callback can update a captured var. Declaring the lambda does not run its body.", "var visits = 0\nval record: () -> Unit = { visits += 1 }\nrecord()\nrecord()\nprintln(visits)", "2", "var hits = 1\nval visit: () -> Unit = { hits += 2 }\nprintln(hits)\nvisit()\nprintln(hits)", "1\n3", ["3\n5", "1\n1", "3"]);
addCoverage(WORLD_9_LESSONS[0], "Ignore an unused parameter", "Use _ for an unused declared parameter; its position still belongs to the callable contract.", "val keep: (Int, String) -> String = { _, text -> text }\nprintln(keep(9, \"ready\"))", "ready", "val choose: (String, Int) -> Int = { _, count -> count + 1 }\nprintln(choose(\"ignored\", 6))", "7", ["6", "ignored", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[1], "A guard returns from the anonymous function", "A bare return inside fun exits that anonymous function. Its caller continues afterwards.", "", "", "val normalize = fun(n: Int): Int {\n    if (n < 0) return 0\n    return n + 2\n}\nprintln(normalize(-4))\nprintln(normalize(5))\nprintln(\"done\")", "0\n7\ndone", ["0", "0\n7", "-2\n7\ndone"]);
addCoverage(WORLD_9_LESSONS[1], "Infer parameters from the expected type", "An expected function type can supply parameter types. An expression body infers its result; a non-Unit block body needs an explicit return type.", "val wrap: (String) -> String = fun(word) = \"[\" + word + \"]\"\nprintln(wrap(\"sun\"))", "[sun]", "val increase: (Int) -> Int = fun(value) = value + 4\nprintln(increase(9))", "13", ["9", "4", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[2], "Unit callbacks and invoke", "(String) -> Unit describes an action, not a text result. f.invoke(x) and f(x) invoke the same callable.", "val log: (String) -> Unit = { message -> println(message) }\nlog.invoke(\"saved\")", "saved", "val announce: (Int) -> Unit = { println(it + 3) }\nannounce.invoke(8)\nprintln(\"end\")", "11\nend", ["8\nend", "11", "kotlin.Unit\nend"]);
addCoverage(WORLD_9_LESSONS[2], "Nullable callable versus nullable result", "((Int) -> String)? may have no function; (Int) -> String? always has a callable but may return null. Invoke a nullable callback with ?.invoke.", "val absent: ((Int) -> String)? = null\nval lookup: (Int) -> String? = { null }\nprintln(absent?.invoke(2) ?: \"no callback\")\nprintln(lookup(2) ?: \"no result\")", "no callback\nno result", "val optional: ((Int) -> Int)? = { it * 3 }\nval missing: (Int) -> Int? = { null }\nprintln(optional?.invoke(4) ?: -1)\nprintln(missing(4) ?: -2)", "12\n-2", ["-1\n-2", "12\nnull", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[2], "Function literal with receiver", "String.(Int) -> String supplies this as the String receiver and one explicit Int parameter. Invoke it with receiver.function(argument).", "val label: String.(Int) -> String = { number -> this + number }\nprintln(\"Box-\".label(4))", "Box-4", "val tag: String.(Int) -> String = { number -> this + \":\" + number }\nprintln(\"Shelf\".tag(7))", "Shelf:7", ["7:Shelf", "Shelf", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[3], "Return configured behavior", "A higher-order function can return a lambda that captures its configuration. Calling the factory and invoking its returned function are separate steps.", "fun makeAdder(amount: Int): (Int) -> Int {\n    return { value -> value + amount }\n}\nval addFive = makeAdder(5)\nprintln(addFive(8))", "13", "fun makeScale(factor: Int): (Int) -> Int {\n    return { value -> value * factor }\n}\nval twice = makeScale(2)\nval triple = makeScale(3)\nprintln(twice(4))\nprintln(triple(4))", "8\n12", ["12\n12", "8\n8", "2\n3"]);
addCoverage(WORLD_9_LESSONS[3], "An algorithm controls callback invocations", "A () -> Unit callback supplies an action. The higher-order function decides how often to call it.", "fun twice(action: () -> Unit) {\n    action()\n    action()\n}\ntwice { println(\"tick\") }", "tick\ntick", "fun twice(action: () -> Unit) {\n    action()\n    action()\n}\nvar count = 0\ntwice { count += 3 }\nprintln(count)", "6", ["3", "0", "9"]);
addCoverage(WORLD_9_LESSONS[4], "Name the outer input when nesting", "Each one-parameter lambda has its own it. Give the outer parameter a name to use both inputs unambiguously. map returns one transformed result per element.", "val result = listOf(2, 3).map { outer ->\n    listOf(10, 20).map { outer + it }\n}\nprintln(result)", "[[12, 22], [13, 23]]", "val result = listOf(4, 5).map { row ->\n    listOf(1, 2).map { row * it }\n}\nprintln(result)", "[[4, 8], [5, 10]]", ["[[1, 4], [1, 4]]", "[[5, 6], [6, 7]]", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[5], "Bound and unbound member references", "instance::method retains its receiver; Type::method takes a receiver as its first argument. These forms reuse the World 8 member-function model.", "class Meter(val offset: Int) {\n    fun read(value: Int): Int = offset + value\n}\nval meter = Meter(5)\nval bound: (Int) -> Int = meter::read\nval unbound: (Meter, Int) -> Int = Meter::read\nprintln(bound(2))\nprintln(unbound(Meter(10), 2))", "7\n12", "class Scale(val factor: Int) {\n    fun apply(value: Int): Int = factor * value\n}\nval bound: (Int) -> Int = Scale(3)::apply\nval open: (Scale, Int) -> Int = Scale::apply\nprintln(bound(4))\nprintln(open(Scale(2), 4))", "12\n8", ["8\n12", "12\n12", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[5], "Constructor references create values", "::ClassName is a callable that constructs an instance. Creating the reference does not construct an instance until invocation.", "class Ticket(val code: Int)\nval create: (Int) -> Ticket = ::Ticket\nprintln(create(42).code)", "42", "class Parcel(val weight: Int)\nval factory: (Int) -> Parcel = ::Parcel\nprintln(factory(8).weight)", "8", ["Parcel", "0", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[6], "A when expression can be the result", "The chosen when branch supplies the last-expression result. Keep an else branch when it is required to cover all inputs.", "val category: (Int) -> String = { score ->\n    when (score) {\n        0 -> \"none\"\n        1 -> \"one\"\n        else -> \"many\"\n    }\n}\nprintln(category(3))", "many", "val state: (Int) -> String = { n ->\n    when (n) {\n        0 -> \"empty\"\n        2 -> \"pair\"\n        else -> \"other\"\n    }\n}\nprintln(state(2))\nprintln(state(7))", "pair\nother", ["other\nother", "pair", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[6], "Printing is an action, not the computed result", "A callback declared to return Unit performs an action. To return a computed value, keep that value as the final expression of a value-returning lambda.", "val show: (Int) -> Unit = { value -> println(value * 2) }\nshow(5)\nprintln(\"done\")", "10\ndone", "val show: (Int) -> Unit = { println(it + 6) }\nshow(2)\nprintln(\"after\")", "8\nafter", ["2\nafter", "8", "kotlin.Unit\nafter"]);
addCoverage(WORLD_9_LESSONS[7], "Explicit labels can return a value", "return@label value finishes this labelled lambda invocation with that result; later invocations still run.", "", "", "val fee: (Int) -> Int = charge@ { age ->\n    if (age < 5) return@charge 0\n    12\n}\nprintln(fee(3))\nprintln(fee(8))", "0\n12", ["0", "12\n12", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[8], "A non-inline callback cannot return from its caller", "An ordinary higher-order callback does not allow a bare return from the enclosing function. Use a local label or an eligible inline parameter.", "", "", "fun execute(action: () -> Unit) { action() }\nfun answer(): Int {\n    execute { return 9 }\n    return 0\n}\nfun main() { println(answer()) }", "Compilation error", ["9", "0", "9\n0"], true);
addCoverage(WORLD_9_LESSONS[9], "A noinline callback can escape for later use", "noinline permits returning the callback as an ordinary function value. It can then be invoked after the setup call returns.", "inline fun retain(noinline action: (Int) -> Int): (Int) -> Int {\n    return action\n}\nval next = retain { it + 1 }\nprintln(next(6))", "7", "inline fun keep(noinline action: (Int) -> Int): (Int) -> Int {\n    return action\n}\nval action = keep { it * 4 }\nprintln(action(3))", "12", ["3", "4", "Compilation error"]);
addCoverage(WORLD_9_LESSONS[9], "noinline forbids non-local return", "noinline keeps a callback value that cannot jump back out of its enclosing caller. A return to the current lambda label remains legal.", "", "", "inline fun call(noinline action: () -> Unit) { action() }\nfun answer(): Int {\n    call { return 8 }\n    return 0\n}\nfun main() { println(answer()) }", "Compilation error", ["8", "0", "8\n0"], true);
addCoverage(WORLD_9_LESSONS[10], "crossinline forbids non-local return", "A wrapped crossinline callback may finish locally with return@label, but cannot return from its enclosing function.", "", "", "inline fun wrapped(crossinline action: () -> Unit) {\n    val task = { action() }\n    task()\n}\nfun answer(): Int {\n    wrapped { return 7 }\n    return 0\n}\nfun main() { println(answer()) }", "Compilation error", ["7", "0", "7\n0"], true);
addCoverage(WORLD_9_LESSONS[11], "Composition order with a named function", "A reusable pipeline applies its first operation before its second. A named reference and a lambda can fill the same function-type contract.", "fun double(n: Int): Int = n * 2\nfun pipe(n: Int, first: (Int) -> Int, second: (Int) -> Int): Int = second(first(n))\nprintln(pipe(4, ::double, { it + 3 }))", "11", "fun addTwo(n: Int): Int = n + 2\nfun pipe(n: Int, first: (Int) -> Int, second: (Int) -> Int): Int = second(first(n))\nprintln(pipe(5, ::addTwo, { it * 3 }))", "21", ["17", "15", "7"]);

for (const [lessonIndex, lesson] of WORLD_9_LESSONS.entries()) {
 const questions = lesson.predict!.questions;
 questions.forEach((question, index) => {
  question.totalQuestions = questions.length;
  const shift = (index + lessonIndex) % question.options.length;
  const options = question.options.slice(shift).concat(question.options.slice(0, shift));
  question.options = options.map((option, i) => ({...option, id: ['A','B','C','D'][i] as 'A'|'B'|'C'|'D'}));
 });
 lesson.mastered.passedCount = `${questions.length} / ${questions.length} PASSED`;
 const summary = lesson.mastered.verificationItems.find(item => item.title === 'Predictions completed');
 if (summary) summary.subtitle = `${questions.length} prediction checks completed`;
 if (lesson.writeRun) lesson.writeRun.description += `\n\nExpected output:\n${lesson.writeRun.expectedOutput}`;
}

// Repair practice to assess callable semantics, with independent Debug scenarios.
function repairDebug(lesson: FiveStageLesson, title: string, subtitle: string, broken: string, fixed: string, expected: string, hints: string[], explanation: string) {
 Object.assign(lesson.debug!, {title, subtitle, brokenCode: broken, fixedCode: fixed,
  expectedOutput: expected, hints, explanation});
}
repairDebug(WORLD_9_LESSONS[0], "Invoke the Saved Callback", "The program should record one launch, but the counter stays at zero.", "fun main() {\nvar launches = 0\nval record: () -> Unit = { launches += 1 }\nrecord\nprintln(launches)\n}", "fun main() {\nvar launches = 0\nval record: () -> Unit = { launches += 1 }\nrecord()\nprintln(launches)\n}", "1", ["Check whether the callback body executes.", "Reading a function value is different from calling it.", "Use record() to invoke the saved lambda."], "The expression record only reads the function value. record() executes its body and updates the captured counter.");
repairDebug(WORLD_9_LESSONS[1], "Return Early From the Anonymous Function", "Missing stock should report zero; positive stock should include two reserve items.", "fun main() {\nval available = fun(stock: Int): Int {\n    if (stock < 0) 0\n    return stock + 2\n}\nprintln(available(-5))\nprintln(available(4))\n}", "fun main() {\nval available = fun(stock: Int): Int {\n    if (stock < 0) return 0\n    return stock + 2\n}\nprintln(available(-5))\nprintln(available(4))\n}", "0\n6", ["Trace whether the negative-stock branch stops the function.", "Evaluating 0 alone does not return from a block-bodied anonymous function.", "Add return before 0 in the guard."], "return 0 exits only available for missing stock. Without return the guard value is discarded and stock + 2 still runs.");
repairDebug(WORLD_9_LESSONS[2], "Match the Function Result Contract", "The callback must return a String receipt, but its body returns an Int.", "fun main() {\nval receipt: (Int) -> String = { count -> count + 2 }\nprintln(receipt(6))\n}", "fun main() {\nval receipt: (Int) -> String = { count -> \"Items: \" + count }\nprintln(receipt(6))\n}", "Items: 6", ["Compare the declared result type with the body result.", "(Int) -> String requires text, not an Int calculation.", "Return \"Items: \" + count."], "A typed function value must match its declared result contract. The repaired lambda returns text containing the item count.");
repairDebug(WORLD_9_LESSONS[4], "Keep the Outer Row Value", "Each row should add its row number to every column, but the inner lambda doubles each column.", "fun main() {\nval grid = listOf(10, 20).map { row ->\n    listOf(1, 3).map { it + it }\n}\nprintln(grid)\n}", "fun main() {\nval grid = listOf(10, 20).map { row ->\n    listOf(1, 3).map { row + it }\n}\nprintln(grid)\n}", "[[11, 13], [21, 23]]", ["Trace which value the inner it represents.", "The inner it is a column; row names the outer input.", "Use row + it in the inner lambda."], "Each lambda introduces its own input. Naming the outer value row allows the inner callback to combine both values.");
repairDebug(WORLD_9_LESSONS[11], "Restore Pipeline Order", "Apply the adjustment first, then the multiplier. The pipeline currently reverses the two steps.", "fun process(n: Int, adjust: (Int) -> Int, multiply: (Int) -> Int): Int {\n    return adjust(multiply(n))\n}\nfun main() {\n    println(process(6, { it + 4 }, { it * 3 }))\n}", "fun process(n: Int, adjust: (Int) -> Int, multiply: (Int) -> Int): Int {\n    return multiply(adjust(n))\n}\nfun main() {\n    println(process(6, { it + 4 }, { it * 3 }))\n}", "30", ["Work out the value after the first required step.", "The innermost call executes first.", "Use multiply(adjust(n)) to apply the adjustment before multiplying."], "Function composition is ordered: (6 + 4) * 3 is 30, while (6 * 3) + 4 is 22. Only the nesting order needs repair.");

FUNCTION_TYPES_LESSON.debug!.bugType = 'syntax';
FUNCTION_TYPES_LESSON.debug!.bugLabel = 'Compiler Error: Function Result Type Mismatch';
Object.assign(HIGHER_ORDER_FUNCTIONS_LESSON.writeRun!, {
 title: 'Return a Configured Fee Calculator',
 description: 'Complete makeFee(extra) so it returns a lambda adding extra to its Int input. The provided calls must print 13 then 23. Each returned function keeps its own extra value.',
 initialCode: 'fun makeFee(extra: Int): (Int) -> Int {\n    // Return a lambda that adds extra to its input.\n}\nfun main() {\n    val smallFee = makeFee(3)\n    val largeFee = makeFee(13)\n    println(smallFee(10))\n    println(largeFee(10))\n}',
 solutionCode: 'fun makeFee(extra: Int): (Int) -> Int {\n    return { price -> price + extra }\n}\nfun main() {\n    val smallFee = makeFee(3)\n    val largeFee = makeFee(13)\n    println(smallFee(10))\n    println(largeFee(10))\n}',
 expectedOutput: '13\n23', testCase: {call: '', expected: '13\n23'}
});
// Declaration-only cards now show an actual invocation, with inline declarations
// outside main (Kotlin does not allow local inline function declarations).
NOINLINE_LESSON.explore!.cards[2].code.push('fun main() { process { println("ready") } }');
CROSSINLINE_LESSON.explore!.cards[2].code.push('fun main() { schedule { println("scheduled") } }');
for (const lesson of WORLD_9_LESSONS) {
 for (const card of lesson.explore!.cards) {
  const code = card.code.join('\n');
  if (code.startsWith('inline fun') && !code.includes('fun main(')) {
   let depth = 0, end = 0;
   for (let i = code.indexOf('{'); i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}' && --depth === 0) { end = i + 1; break; }
   }
   card.code = (code.slice(0, end) + '\nfun main() {\n' + code.slice(end).trim() + '\n}').split('\n');
  }
 }
}
WORLD_9_LESSONS[8].writeRun = {"challengeNumber": 1, "totalChallenges": 1, "xpReward": 20, "title": "Run an Inline Action", "description": "Complete inline fun perform(action: () -> Unit) by invoking action. The provided callback prints start, followed by done in main.\n\nExpected output:\nstart\ndone", "requirements": {"name": "main", "params": "(none)", "returns": "Unit"}, "fileName": "Callbacks.kt", "initialCode": "inline fun perform(action: () -> Unit) {\n    // Invoke action.\n}\nfun main() {\n    perform { println(\"start\") }\n    println(\"done\")\n}", "solutionCode": "inline fun perform(action: () -> Unit) {\n    action()\n}\nfun main() {\n    perform { println(\"start\") }\n    println(\"done\")\n}", "sampleInput": "main()", "expectedOutput": "start\ndone", "testCase": {"call": "", "expected": "start\ndone"}};
WORLD_9_LESSONS[8].debug = {"title": "Enable the Intended Return Boundary", "subtitle": "This callback is intended to return 5 from result, but its higher-order function is missing a modifier.", "challengeNumber": 1, "totalChallenges": 1, "difficulty": "medium", "bugType": "syntax", "bugLabel": "Compiler Error: Return Boundary", "brokenCode": "fun visit(action: () -> Unit) { action() }\nfun result(): Int {\n    visit { return 5 }\n    return 2\n}\nfun main() { println(result()) }", "fixedCode": "inline fun visit(action: () -> Unit) { action() }\nfun result(): Int {\n    visit { return 5 }\n    return 2\n}\nfun main() { println(result()) }", "expectedOutput": "5", "hints": ["Identify which function return 5 is trying to exit.", "An ordinary callback cannot perform that non-local return.", "Mark visit inline to permit this direct callback return."], "explanation": "The eligible inline callback may return from result. The ordinary non-inline declaration rejects this control flow."};
WORLD_9_LESSONS[8].mastered.summary = "You practiced the callback and return rules. This editor does not measure JVM inlining, allocations, or performance.";
WORLD_9_LESSONS[9].writeRun = {"challengeNumber": 1, "totalChallenges": 1, "xpReward": 20, "title": "Keep a Callback for Later", "description": "Complete save so it returns its noinline callback. Invoke the retained action with 7 using the provided main.\n\nExpected output:\n15", "requirements": {"name": "main", "params": "(none)", "returns": "Unit"}, "fileName": "Callbacks.kt", "initialCode": "inline fun save(noinline action: (Int) -> Int): (Int) -> Int {\n    // Return the callback value without invoking it.\n}\nfun main() {\n    val saved = save { it + 8 }\n    println(saved(7))\n}", "solutionCode": "inline fun save(noinline action: (Int) -> Int): (Int) -> Int {\n    return action\n}\nfun main() {\n    val saved = save { it + 8 }\n    println(saved(7))\n}", "sampleInput": "main()", "expectedOutput": "15", "testCase": {"call": "", "expected": "15"}};
WORLD_9_LESSONS[9].debug = {"title": "Invoke the Retained Callback", "subtitle": "The saved callback should set ready to true, but reading the callback leaves it false.", "challengeNumber": 1, "totalChallenges": 1, "difficulty": "medium", "bugType": "logic", "bugLabel": "Logic Bug: Callback Not Invoked", "brokenCode": "inline fun dispatch(noinline action: () -> Unit) {\n    val saved = action\n    saved\n}\nfun main() {\n    var ready = false\n    dispatch { ready = true }\n    println(ready)\n}", "fixedCode": "inline fun dispatch(noinline action: () -> Unit) {\n    val saved = action\n    saved()\n}\nfun main() {\n    var ready = false\n    dispatch { ready = true }\n    println(ready)\n}", "expectedOutput": "true", "hints": ["Does the saved callback execute?", "Saving a callback preserves a value; it does not run its body.", "Invoke saved with saved()."], "explanation": "noinline permits storing the callback, but calling it still requires parentheses."};
WORLD_9_LESSONS[9].mastered.summary = "You practiced the callback and return rules. This editor does not measure JVM inlining, allocations, or performance.";
WORLD_9_LESSONS[10].writeRun = {"challengeNumber": 1, "totalChallenges": 1, "xpReward": 20, "title": "Wrap a Crossinline Callback", "description": "Complete runTask by creating a helper lambda that invokes action(6), then return helper(). Keep crossinline because action is called inside a stored lambda.\n\nExpected output:\n42", "requirements": {"name": "main", "params": "(none)", "returns": "Unit"}, "fileName": "Callbacks.kt", "initialCode": "inline fun runTask(crossinline action: (Int) -> Int): Int {\n    // Create helper and return its result.\n}\nfun main() { println(runTask { it * 7 }) }", "solutionCode": "inline fun runTask(crossinline action: (Int) -> Int): Int {\n    val helper = { action(6) }\n    return helper()\n}\nfun main() { println(runTask { it * 7 }) }", "sampleInput": "main()", "expectedOutput": "42", "testCase": {"call": "", "expected": "42"}};
WORLD_9_LESSONS[10].debug = {"title": "Return Only From the Wrapped Callback", "subtitle": "The callback should produce zero for negative input and allow answer to continue, but its bare return is forbidden.", "challengeNumber": 1, "totalChallenges": 1, "difficulty": "medium", "bugType": "syntax", "bugLabel": "Compiler Error: Return Boundary", "brokenCode": "inline fun wrap(crossinline action: (Int) -> Int): Int {\n    val task = { action(-3) }\n    return task()\n}\nfun answer(): Int {\n    val value = wrap { if (it < 0) return 0; it }\n    return value + 9\n}\nfun main() { println(answer()) }", "fixedCode": "inline fun wrap(crossinline action: (Int) -> Int): Int {\n    val task = { action(-3) }\n    return task()\n}\nfun answer(): Int {\n    val value = wrap { if (it < 0) return@wrap 0; it }\n    return value + 9\n}\nfun main() { println(answer()) }", "expectedOutput": "9", "hints": ["Which boundary should finish when the input is negative?", "crossinline disallows returning from answer through this callback.", "Use return@wrap 0 to finish just the current callback."], "explanation": "The labelled return yields zero to wrap without leaving answer. answer then adds nine. A bare return would attempt a forbidden non-local exit."};
WORLD_9_LESSONS[10].mastered.summary = "You practiced the callback and return rules. This editor does not measure JVM inlining, allocations, or performance.";
// Inline declarations must stay at file scope in complete prediction programs.
for (const lesson of WORLD_9_LESSONS) {
 for (const question of lesson.predict!.questions) {
  const code = question.code?.join('\n') ?? '';
  if (code.startsWith('inline fun') && !code.includes('fun main(')) {
   let depth = 0, end = 0;
   for (let i = code.indexOf('{'); i < code.length; i++) {
    if (code[i] === '{') depth++;
    if (code[i] === '}' && --depth === 0) { end = i + 1; break; }
   }
   question.code = (code.slice(0, end) + '\nfun main() {\n' + code.slice(end).trim() + '\n}').split('\n');
  }
 }
}
repairDebug(NOINLINE_LESSON,
 'Retain the Selected Callback',
 'The setup should keep the selected formatter for later, but returns its fallback formatter instead.',
 'inline fun select(noinline chosen: (String) -> String, noinline fallback: (String) -> String): (String) -> String {\n    return fallback\n}\nfun main() {\n    val format = select({ "Selected: " + it }, { "Fallback: " + it })\n    println(format("report"))\n}',
 'inline fun select(noinline chosen: (String) -> String, noinline fallback: (String) -> String): (String) -> String {\n    return chosen\n}\nfun main() {\n    val format = select({ "Selected: " + it }, { "Fallback: " + it })\n    println(format("report"))\n}',
 'Selected: report',
 ['Which callback value survives after setup finishes?', 'Compare the parameter returned by select with the requested selection.', 'Return chosen instead of fallback.'],
 'Both noinline parameters can be retained as function values. Returning the selected value preserves its behavior for the later invocation.');
NOINLINE_LESSON.debug!.bugLabel = 'Logic Bug: Wrong Callback Retained';
FUNCTION_REFERENCES_LESSON.debug!.hints = [
 'Compare the assigned callable with the tax behavior defined above it.',
 'The identity lambda bypasses the named tax calculation.',
 'Assign ::calculateTax to taxFunc.'
];
HIGHER_ORDER_FUNCTIONS_LESSON.debug!.hints = [
 'Trace what happens to the policy argument after the function receives it.',
 'The returned value currently does not depend on policy.',
 'Return policy(score) to invoke the supplied operation.'
];
for (const lesson of WORLD_9_LESSONS) {
 lesson.mastered.summary = `You practiced the ${lesson.topicTitle.toLowerCase()} scenarios in this lesson. Continue applying them with different inputs.`;
 if (lesson.mastered.verificationItems.every(item => item.title !== 'Code written & executed')) {
  lesson.mastered.verificationItems.push(
   {title:'Code written & executed', subtitle:'Practiced callback behavior; JVM performance is not measured'},
   {title:'Bugs diagnosed & repaired', subtitle:'Repaired one independent callback fault'}
  );
 }
}
// Replace redundant arithmetic forecasts with the behavior the matching Explore
// card teaches. IDs stay stable; these are replacements, not count inflation.
function revisePrediction(lesson: FiveStageLesson, index: number, title: string, code: string, answer: string, wrong: string[], detail: string) {
 const question = lesson.predict!.questions[index];
 question.title = title;
 question.code = code.split('\n');
 const labels = [answer, ...wrong];
 const shift = index % labels.length;
 question.options = labels.slice(shift).concat(labels.slice(0, shift)).map((label, i) =>
  ({id: ['A','B','C','D'][i] as 'A'|'B'|'C'|'D', label, isCorrect: label === answer}));
 question.explanation = {codeRef: title, detail};
}
revisePrediction(LAMBDA_EXPRESSIONS_LESSON, 3, 'The Last Expression Wins',
 'val total = { base: Int ->\n    val doubled = base * 2\n    doubled + 3\n}\nprintln(total(6))', '15', ['12','6','3'],
 'The intermediate doubled value is 12. The final expression adds 3, so total returns 15.');
revisePrediction(ANONYMOUS_FUNCTIONS_LESSON, 1, 'Expression-Body Result',
 'val magnitude = fun(n: Int) = if (n < 0) -n else n\nprintln(magnitude(-7))', '7', ['-7','kotlin.Unit','Compilation error'],
 'The anonymous function has an expression body, so the selected if branch supplies its inferred Int result.');
revisePrediction(HIGHER_ORDER_FUNCTIONS_LESSON, 1, 'The Caller Chooses Each Operation',
 'fun run(value: Int, op: (Int) -> Int): Int = op(value)\nfun main() {\n    println(run(8) { it + 2 })\n    println(run(8) { it * 2 })\n}', '10\n16', ['10\n10','16\n16','8\n8'],
 'Each call supplies a new operation: the first adds two and the second doubles the same input.');
revisePrediction(IT_LESSON, 2, 'A Predicate at Its Boundary',
 'val isPositive: (Int) -> Boolean = { it > 0 }\nprintln(isPositive(0))\nprintln(isPositive(3))', 'false\ntrue', ['true\ntrue','false\nfalse','0\n3'],
 'it is the argument of each invocation. Zero is not strictly greater than zero; three is.');
revisePrediction(WORLD_9_BOSS_LESSON, 2, 'Caller-Defined Selection',
 'fun countMatches(values: List<Int>, accepts: (Int) -> Boolean): Int {\n    var count = 0\n    for (value in values) {\n        if (accepts(value)) count++\n    }\n    return count\n}\nfun main() { println(countMatches(listOf(1, 4, 6, 9)) { it % 2 == 0 }) }', '2', ['4','10','0'],
 'The utility invokes the supplied predicate on every element. Only 4 and 6 match, so it returns a count of two.');
