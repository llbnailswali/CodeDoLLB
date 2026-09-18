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
  explore: string[];
  exploreNote: string;
  predictions: Array<{ code: string[]; output: string; detail: string }>;
  challenge: string;
  description: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  brokenCode: string;
  fixedCode: string;
  hints: [string, string, string];
};

const outputOptions = (answer: string) => [
  { id: 'A' as const, label: answer, isCorrect: true },
  { id: 'B' as const, label: '0', isCorrect: false },
  { id: 'C' as const, label: 'An error', isCorrect: false },
  { id: 'D' as const, label: 'The function itself', isCorrect: false },
];

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
      keyIdeas: [
        { number: 1, title: 'Functions are values', description: 'A function can be stored in a variable, passed to another function, and called later.' },
        { number: 2, title: 'The parameter decides the behavior', description: 'The same reusable function can produce different results when it receives a different operation.' },
        { number: 3, title: 'Call the value with parentheses', description: 'Once a function value is available, value(input) runs it just like a named function call.' },
      ],
      keyTakeaway: config.takeaway,
    },
    explore: {
      title: 'Explore the Concept',
      subtitle: 'Read the lambda from its input to its returned expression, then watch where the callable value is used.',
      cards: [
        {
          id: `${config.key}-explore-1`, number: '01', title: 'Trace the callable value', language: 'Kotlin',
          subtitle: config.exploreNote, code: config.explore,
          whatItMeans: [{ label: 'Function value', description: 'This expression produces a callable value rather than running immediately.' }],
          whatChanged: 'Stored or passed a behavior, then invoked that behavior with a real input.',
        },
        {
          id: `${config.key}-explore-2`, number: '02', title: 'Change the input', language: 'Kotlin',
          subtitle: 'The same operation can be reused with another value.', code: config.example,
          whatItMeans: [{ label: 'Reusable operation', description: 'Only the input changes; the function’s rule stays the same.' }],
          whatChanged: 'Confirmed that one callable value can be invoked repeatedly.',
        },
      ],
    },
    predict: {
      title: 'What will this code print?',
      subtitle: 'Evaluate the operation first, then follow the value passed into println().',
      questions: config.predictions.map((question, index) => ({
        id: `${config.key}-predict-${index + 1}`,
        questionNumber: index + 1,
        totalQuestions: config.predictions.length,
        title: 'Trace the Function Value',
        topicMeta: config.topic,
        language: 'Kotlin',
        code: question.code,
        prompt: 'What will this code print?',
        options: outputOptions(question.output),
        explanation: { codeRef: 'The callable expression', detail: question.detail },
      })),
    },
    writeRun: {
      challengeNumber: 1, totalChallenges: 1, xpReward: config.key === 'boss' ? 50 : 20,
      title: config.challenge, description: numberedDescription,
      requirements: { name: 'main', params: '(none)', returns: 'Unit' },
      fileName: `${config.topic.replace(/[^A-Za-z]/g, '')}.kt`, initialCode: numberedStarterCode,
      solutionCode: config.solutionCode, sampleInput: 'main()', expectedOutput: config.expectedOutput,
      testCase: { call: '', expected: config.expectedOutput },
    },
    debug: {
      title: 'Fix the Function Behavior', subtitle: 'The program runs, but its callable value applies the wrong rule.',
      challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic',
      bugLabel: 'Logic Bug: Wrong Lambda or Function Value', brokenCode: config.brokenCode,
      fixedCode: config.fixedCode, expectedOutput: config.expectedOutput, hints: config.hints,
      explanation: 'The function value is valid Kotlin, so the program runs. Compare the operation’s expression with the result the program is meant to produce, then restore the intended callable behavior.',
    },
    mastered: {
      topicTitle: config.topic,
      summary: `You have mastered ${config.topic.toLowerCase()} by reading, predicting, writing, and repairing callable Kotlin code.`,
      passedCount: '3 / 3 PASSED',
      verificationItems: [
        { title: 'Concept understood', subtitle: config.takeaway },
        { title: 'Examples explored', subtitle: 'Stored and invoked a reusable operation' },
        { title: 'Predictions completed', subtitle: '3/3 callable-value traces correct' },
        { title: 'Code written & executed', subtitle: 'A runnable function-value challenge passed' },
        { title: 'Bugs diagnosed & repaired', subtitle: 'Repaired a wrong operation result' },
      ], xpEarned: config.key === 'boss' ? 50 : 20, streakDays: 1, accuracy: '100%',
    },
  };
}

function conceptualLesson(key: string, topic: string, title: string, subtitle: string, code: string[], questions: Array<{ prompt: string; answer: string; detail: string }>): FiveStageLesson {
  return {
    id: `world-9-${key}`, worldId: WORLD_ID, worldName: WORLD_NAME, stageName: STAGE, topicTitle: topic,
    learn: {
      title, subtitle, exampleTag: 'CONCEPT', exampleTitle: 'Read the compiler rule', language: 'Kotlin', codeSnippet: code,
      explanation: subtitle,
      keyIdeas: [
        { number: 1, title: 'This is a compile-time rule', description: 'Its purpose is to make control flow or generated code safe before the program runs.' },
        { number: 2, title: 'Syntax signals intent', description: 'Kotlin uses a modifier or label so the compiler can enforce the correct boundary.' },
        { number: 3, title: 'Use the right activity', description: 'Understand this rule through reading and prediction; the in-app runner does not pretend to emulate compiler internals.' },
      ],
      keyTakeaway: subtitle,
    },
    predict: {
      title: 'Check Your Understanding', subtitle: 'Choose the statement that matches Kotlin’s compiler rule.',
      questions: questions.map((question, index) => ({
        id: `${key}-predict-${index + 1}`, questionNumber: index + 1, totalQuestions: questions.length,
        title: topic, topicMeta: 'Compiler semantics', language: 'Kotlin', code: index === 0 ? code : undefined,
        prompt: question.prompt,
        options: [
          { id: 'A', label: question.answer, isCorrect: true },
          { id: 'B', label: 'It only changes the visual formatting of the code.', isCorrect: false },
          { id: 'C', label: 'It makes every variable mutable.', isCorrect: false },
          { id: 'D', label: 'It is identical to a normal function call in every situation.', isCorrect: false },
        ], explanation: { codeRef: 'Kotlin compiler rule', detail: question.detail },
      })),
    },
    mastered: {
      topicTitle: topic, summary: `You understand when and why Kotlin uses ${topic.toLowerCase()} semantics.`, passedCount: '3 / 3 PASSED',
      verificationItems: [
        { title: 'Concept understood', subtitle }, { title: 'Compiler rule identified', subtitle: 'Distinguished runtime behavior from compiler-enforced behavior' },
        { title: 'Predictions completed', subtitle: '3/3 semantic checks correct' },
      ], xpEarned: 20, streakDays: 1, accuracy: '100%',
    },
  };
}

export const LAMBDA_EXPRESSIONS_LESSON = runnableLesson({
  key: 'lambda-expressions', topic: 'Lambda expressions', learnTitle: 'Write a Function Without Naming It',
  learnText: 'A lambda is a compact function value. Parameters appear before -> and the final expression becomes the result.',
  takeaway: 'Use { input -> result } when a small behavior belongs exactly where it is used.',
  example: ['fun main() {', '    val double = { number: Int -> number * 2 }', '    println(double(6))', '}'],
  explore: ['val label = { name: String -> "Hi, " + name }', 'println(label("Mina"))'], exploreNote: 'The lambda is assigned first, then invoked with label("Mina").',
  predictions: [
    { code: ['fun main() {', '    val addFive = { n: Int -> n + 5 }', '    println(addFive(4))', '}'], output: '9', detail: 'n receives 4, so n + 5 is 9.' },
    { code: ['fun main() {', '    val square = { n: Int -> n * n }', '    println(square(3))', '}'], output: '9', detail: 'The one input is multiplied by itself.' },
    { code: ['fun main() {', '    val greet = { name: String -> "Hi " + name }', '    println(greet("Jo"))', '}'], output: 'Hi Jo', detail: 'The lambda concatenates the input string.' },
  ],
  challenge: 'Build a Tripler', description: 'Create a lambda named triple that receives an Int and returns that number multiplied by 3. Print triple(7).',
  initialCode: 'fun main() {\n    // Create triple as a lambda taking number: Int:\n\n    println(triple(7))\n}',
  solutionCode: 'fun main() {\n    val triple = { number: Int -> number * 3 }\n    println(triple(7))\n}', expectedOutput: '21',
  brokenCode: 'fun main() {\n    val triple = { number: Int -> number + 3 }\n    println(triple(7))\n}', fixedCode: 'fun main() {\n    val triple = { number: Int -> number * 3 }\n    println(triple(7))\n}',
  hints: ['The lambda should triple, not add a fixed amount.', 'Look at the operator between number and 3.', 'Replace + with * in the lambda body.'],
});

export const ANONYMOUS_FUNCTIONS_LESSON = runnableLesson({
  key: 'anonymous-functions', topic: 'Anonymous functions', learnTitle: 'Use fun as a Value',
  learnText: 'An anonymous function uses fun without a name. Unlike a lambda, an ordinary return inside it returns from that anonymous function.',
  takeaway: 'Use fun (...) { return ... } when an unnamed function needs an explicit local return.',
  example: ['fun main() {', '    val double = fun(number: Int): Int { return number * 2 }', '    println(double(6))', '}'],
  explore: ['val welcome = fun(name: String): String { return "Welcome, " + name }', 'println(welcome("Ari"))'], exploreNote: 'The function has no declaration name; welcome stores the function value.',
  predictions: [
    { code: ['fun main() {', '    val next = fun(n: Int): Int { return n + 1 }', '    println(next(8))', '}'], output: '9', detail: 'return n + 1 is local to the anonymous function.' },
    { code: ['fun main() {', '    val twice = fun(n: Int): Int { return n * 2 }', '    println(twice(5))', '}'], output: '10', detail: 'The anonymous function returns 5 * 2.' },
    { code: ['fun main() {', '    val tag = fun(word: String): String { return "#" + word }', '    println(tag("kotlin"))', '}'], output: '#kotlin', detail: 'The function returns the prefixed string.' },
  ],
  challenge: 'Create a Local Formatter', description: 'Store an anonymous function in format. It should return "Score: " + value. Print format(42).',
  initialCode: 'fun main() {\n    // Create format as an anonymous function taking value: Int:\n\n    println(format(42))\n}',
  solutionCode: 'fun main() {\n    val format = fun(value: Int): String { return "Score: " + value }\n    println(format(42))\n}', expectedOutput: 'Score: 42',
  brokenCode: 'fun main() {\n    val format = fun(value: Int): String { return "Score: " + (value + 1) }\n    println(format(42))\n}', fixedCode: 'fun main() {\n    val format = fun(value: Int): String { return "Score: " + value }\n    println(format(42))\n}',
  hints: ['The function should format the exact value it receives.', 'Nothing should change value before it is concatenated.', 'Remove + 1 from the return expression.'],
});

export const FUNCTION_TYPES_LESSON = runnableLesson({
  key: 'function-types', topic: 'Function types', learnTitle: 'Describe a Callable Value',
  learnText: 'A function type such as (Int) -> Int says what input a callable accepts and what it returns.',
  takeaway: 'Read (Input) -> Output as the contract for a function value.',
  example: ['fun main() {', '    val double: (Int) -> Int = { n -> n * 2 }', '    println(double(5))', '}'],
  explore: ['val badge: (String) -> String = { name -> "VIP " + name }', 'println(badge("Rae"))'], exploreNote: 'The annotation promises one String input and one String result.',
  predictions: [
    { code: ['fun main() {', '    val plusTwo: (Int) -> Int = { n -> n + 2 }', '    println(plusTwo(7))', '}'], output: '9', detail: 'The callable’s Int input is 7 and it returns 7 + 2.' },
    { code: ['fun main() {', '    val echo: (String) -> String = { text -> text + "!" }', '    println(echo("Go"))', '}'], output: 'Go!', detail: 'The String result follows the declared String-to-String contract.' },
    { code: ['fun main() {', '    val subtract: (Int, Int) -> Int = { a, b -> a - b }', '    println(subtract(9, 4))', '}'], output: '5', detail: 'Two Int inputs are accepted in order.' },
  ],
  challenge: 'Declare a Discount Function', description: 'Declare discount with type (Int) -> Int. Its lambda should subtract 5 from price. Print discount(30).',
  initialCode: 'fun main() {\n    // Declare discount with type (Int) -> Int:\n\n    println(discount(30))\n}',
  solutionCode: 'fun main() {\n    val discount: (Int) -> Int = { price -> price - 5 }\n    println(discount(30))\n}', expectedOutput: '25',
  brokenCode: 'fun main() {\n    val discount: (Int) -> Int = { price -> price + 5 }\n    println(discount(30))\n}', fixedCode: 'fun main() {\n    val discount: (Int) -> Int = { price -> price - 5 }\n    println(discount(30))\n}',
  hints: ['A discount lowers the price.', 'Check whether the lambda adds or subtracts 5.', 'Use price - 5.'],
});

export const HIGHER_ORDER_FUNCTIONS_LESSON = runnableLesson({
  key: 'higher-order-functions', topic: 'Higher-order functions', learnTitle: 'Accept Behavior as an Argument',
  learnText: 'A higher-order function receives a function value, then decides when to call that behavior.',
  takeaway: 'Pass an operation parameter when one reusable function should work with many behaviors.',
  example: ['fun apply(value: Int, operation: (Int) -> Int): Int {', '    return operation(value)', '}', 'fun main() {', '    println(apply(4) { it * 3 })', '}'],
  explore: ['fun use(value: Int, operation: (Int) -> Int): Int {', '    return operation(value)', '}', 'println(use(10) { it - 1 })'], exploreNote: 'use does not know the rule; operation supplies it.',
  predictions: [
    { code: ['fun run(value: Int, op: (Int) -> Int): Int { return op(value) }', 'fun main() {', '    println(run(3) { it * 4 })', '}'], output: '12', detail: 'run passes 3 into the supplied operation.' },
    { code: ['fun run(value: Int, op: (Int) -> Int): Int { return op(value) }', 'fun main() {', '    println(run(8) { it + 2 })', '}'], output: '10', detail: 'The operation adds 2 after run supplies 8.' },
    { code: ['fun main() {', '    val op = { n: Int -> n - 3 }', '    println(op(9))', '}'], output: '6', detail: 'A function value can be called after it is stored.' },
  ],
  challenge: 'Apply a Bonus Rule', description: 'Write applyBonus(value, operation) so it returns operation(value). In main, print applyBonus(10) { it + 5 }.',
  initialCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    // Return operation(value):\n\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}',
  solutionCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    return operation(value)\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}', expectedOutput: '15',
  brokenCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    return value\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}', fixedCode: 'fun applyBonus(value: Int, operation: (Int) -> Int): Int {\n    return operation(value)\n}\n\nfun main() {\n    println(applyBonus(10) { it + 5 })\n}',
  hints: ['The supplied operation must actually be called.', 'Returning value ignores the lambda.', 'Return operation(value).'],
});

export const IT_LESSON = runnableLesson({
  key: 'it', topic: 'it', learnTitle: 'Use Kotlin’s Implicit Lambda Parameter',
  learnText: 'When a lambda has exactly one parameter, Kotlin lets you omit its name and use it instead.',
  takeaway: 'Use it only when one implicit parameter stays clear; name the parameter when clarity needs it.',
  example: ['fun main() {', '    val double: (Int) -> Int = { it * 2 }', '    println(double(8))', '}'],
  explore: ['val announce: (String) -> String = { "Ready: " + it }', 'println(announce("Go"))'], exploreNote: 'it stands for the single String input.',
  predictions: [
    { code: ['fun main() {', '    val next: (Int) -> Int = { it + 1 }', '    println(next(4))', '}'], output: '5', detail: 'it receives 4.' },
    { code: ['fun main() {', '    val loud: (String) -> String = { it + "!" }', '    println(loud("Yes"))', '}'], output: 'Yes!', detail: 'it receives the one String argument.' },
    { code: ['fun main() {', '    val half: (Int) -> Int = { it / 2 }', '    println(half(8))', '}'], output: '4', detail: 'it is 8, so integer division gives 4.' },
  ],
  challenge: 'Use the Implicit Input', description: 'Create a lambda named cheer with type (String) -> String. Use it to return "Go, " + it + "!". Print cheer("Team").',
  initialCode: 'fun main() {\n    // Create cheer using implicit it:\n\n    println(cheer("Team"))\n}',
  solutionCode: 'fun main() {\n    val cheer: (String) -> String = { "Go, " + it + "!" }\n    println(cheer("Team"))\n}', expectedOutput: 'Go, Team!',
  brokenCode: 'fun main() {\n    val cheer: (String) -> String = { "Go, " + it }\n    println(cheer("Team"))\n}', fixedCode: 'fun main() {\n    val cheer: (String) -> String = { "Go, " + it + "!" }\n    println(cheer("Team"))\n}',
  hints: ['The output needs punctuation after the input.', 'The lambda has one String input, represented by it.', 'Append + "!" to the expression.'],
});

export const FUNCTION_REFERENCES_LESSON = runnableLesson({
  key: 'function-references', topic: 'Function references', learnTitle: 'Pass a Named Function with ::',
  learnText: 'Prefixing a named function with :: passes the function itself instead of calling it immediately.',
  takeaway: 'Use ::name when another function needs a callable reference to name.',
  example: ['fun double(n: Int): Int = n * 2', 'fun main() {', '    val operation: (Int) -> Int = ::double', '    println(operation(5))', '}'],
  explore: ['fun badge(name: String): String = "VIP " + name', 'val makeBadge: (String) -> String = ::badge', 'println(makeBadge("Noa"))'], exploreNote: '::badge stores the function; badge("Noa") would call it immediately.',
  predictions: [
    { code: ['fun plusOne(n: Int): Int = n + 1', 'fun main() {', '    val op: (Int) -> Int = ::plusOne', '    println(op(9))', '}'], output: '10', detail: 'op refers to plusOne, then op(9) calls it.' },
    { code: ['fun label(n: Int): String = "#" + n', 'fun main() {', '    val tag: (Int) -> String = ::label', '    println(tag(3))', '}'], output: '#3', detail: 'The reference keeps label’s String result.' },
    { code: ['fun triple(n: Int): Int = n * 3', 'fun main() {', '    println((::triple)(4))', '}'], output: '12', detail: 'The reference is callable with the same input.' },
  ],
  challenge: 'Reference a Named Formatter', description: 'Write a named function stamp that returns "ID-" + number. Store ::stamp in formatter and print formatter(7).',
  initialCode: 'fun stamp(number: Int): String {\n    // Return "ID-" + number:\n\n}\n\nfun main() {\n    // Store ::stamp in formatter:\n\n    println(formatter(7))\n}',
  solutionCode: 'fun stamp(number: Int): String {\n    return "ID-" + number\n}\n\nfun main() {\n    val formatter: (Int) -> String = ::stamp\n    println(formatter(7))\n}', expectedOutput: 'ID-7',
  brokenCode: 'fun stamp(number: Int): String {\n    return "ID-" + number\n}\n\nfun main() {\n    val formatter: (Int) -> String = { it + "ID-" }\n    println(formatter(7))\n}', fixedCode: 'fun stamp(number: Int): String {\n    return "ID-" + number\n}\n\nfun main() {\n    val formatter: (Int) -> String = ::stamp\n    println(formatter(7))\n}',
  hints: ['formatter should refer to the named stamp function.', 'A function reference starts with two colons.', 'Replace the lambda with ::stamp.'],
});

export const RETURNING_FROM_LAMBDAS_LESSON = runnableLesson({
  key: 'returning-from-lambdas', topic: 'Returning from lambdas', learnTitle: 'The Last Lambda Expression Is Its Result',
  learnText: 'A lambda returns the value of its final expression without writing return. That result becomes the function call’s result.',
  takeaway: 'Put the value a lambda should produce in its final expression.',
  example: ['fun main() {', '    val priceWithTax: (Int) -> Int = { price -> price + 2 }', '    println(priceWithTax(10))', '}'],
  explore: ['val isEven: (Int) -> Boolean = { number -> number % 2 == 0 }', 'println(isEven(6))'], exploreNote: 'The comparison is the final expression, so its Boolean value is returned.',
  predictions: [
    { code: ['fun main() {', '    val add = { n: Int -> n + 4 }', '    println(add(2))', '}'], output: '6', detail: 'n + 4 is the lambda’s final expression.' },
    { code: ['fun main() {', '    val label = { n: Int -> "Level " + n }', '    println(label(3))', '}'], output: 'Level 3', detail: 'The final concatenation is returned.' },
    { code: ['fun main() {', '    val check = { n: Int -> n > 5 }', '    println(check(7))', '}'], output: 'true', detail: 'The final comparison returns true.' },
  ],
  challenge: 'Return a Shipping Total', description: 'Create total: (Int) -> Int as a lambda whose final expression adds 4 to subtotal. Print total(16).',
  initialCode: 'fun main() {\n    // Create total as a lambda returning subtotal + 4:\n\n    println(total(16))\n}',
  solutionCode: 'fun main() {\n    val total: (Int) -> Int = { subtotal -> subtotal + 4 }\n    println(total(16))\n}', expectedOutput: '20',
  brokenCode: 'fun main() {\n    val total: (Int) -> Int = { subtotal -> subtotal - 4 }\n    println(total(16))\n}', fixedCode: 'fun main() {\n    val total: (Int) -> Int = { subtotal -> subtotal + 4 }\n    println(total(16))\n}',
  hints: ['The last expression should add the shipping amount.', 'The subtotal must increase by 4.', 'Use subtotal + 4.'],
});

const LOCAL_RETURNS_CONCEPT = conceptualLesson('local-returns', 'Local returns', 'Return From the Intended Boundary', 'A labelled return such as return@forEach exits the lambda only; an ordinary non-local return in an inline lambda exits the enclosing function. Both return boundaries are supported in the learning editor.', ['items.forEach { item ->', '    if (item < 0) return@forEach', '    println(item)', '}'], [
  { prompt: 'What does return@forEach target?', answer: 'Only the lambda passed to forEach, then the surrounding loop continues.', detail: 'The label makes the return local to that lambda invocation.' },
  { prompt: 'Why use a labelled return?', answer: 'To make the return boundary explicit when a lambda is nested in other code.', detail: 'It prevents confusing the lambda boundary with an outer function boundary.' },
  { prompt: 'What does a bare return inside a forEach lambda exit?', answer: 'The enclosing function, because forEach allows non-local returns.', detail: 'Use return@forEach to skip only the current callback. A bare return exits the surrounding function instead.' },
]);

const SUM_POSITIVE_DECLARATION = `fun sumPositive(values: List<Int>): Int {
    var total = 0
    values.forEach {
        if (it < 0) return@forEach
        total += it
    }
    return total
}

fun main() {
    println(sumPositive(listOf(1, -1, 2, -2, 4)))
}`;

export const LOCAL_RETURNS_LESSON: FiveStageLesson = {
  ...LOCAL_RETURNS_CONCEPT,
  learn: { ...LOCAL_RETURNS_CONCEPT.learn, codeSnippet: SUM_POSITIVE_DECLARATION.split('\n'),
    explanation: 'Each negative value returns from just that forEach invocation. Later values are still visited, so 1 + 2 + 4 produces 7. A bare return total would exit sumPositive at the first negative value instead.' },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: 'Skip Negatives Without Stopping the Sum',
    description: 'Complete sumPositive(values) using forEach.\n\n1. Start total at 0.\n\n2. For a negative item, use return@forEach to skip only that item.\n\n3. Add other items to total, then return total after the loop. The provided main must print 7.',
    requirements: { name: 'sumPositive', params: 'values: List<Int>', returns: 'Int' },
    fileName: 'LocalReturns.kt',
    initialCode: `fun sumPositive(values: List<Int>): Int {
    var total = 0
    values.forEach {
        // 1. Skip negative items with a labelled return.
        // 2. Add the remaining items to total.
    }
    return total
}

fun main() {
    println(sumPositive(listOf(1, -1, 2, -2, 4)))
}`,
    solutionCode: SUM_POSITIVE_DECLARATION, sampleInput: 'main()', expectedOutput: '7',
    testCase: { call: '', expected: '7' },
  },
  debug: {
    title: 'Fix the Return That Stops the Whole Sum',
    subtitle: 'The sum stops at the first negative value and reports 1 instead of 7.',
    challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: 'Wrong Return Boundary',
    brokenCode: SUM_POSITIVE_DECLARATION.replace('return@forEach', 'return total'),
    fixedCode: SUM_POSITIVE_DECLARATION, expectedOutput: '7',
    hints: ['Decide whether a negative item should end one callback or the whole function.', 'A bare return inside inline forEach exits sumPositive.', 'Replace return total inside the if with return@forEach. Keep the final return total after the loop.'],
    explanation: 'return total exits sumPositive when -1 is encountered. return@forEach skips that callback only, allowing 2 and 4 to be added later.',
  },
  mastered: { ...LOCAL_RETURNS_CONCEPT.mastered,
    summary: 'You can choose between a local labelled return and a non-local return, and repair a return that exits the wrong boundary.',
    verificationItems: [...LOCAL_RETURNS_CONCEPT.mastered.verificationItems,
      { title: 'Code written & executed', subtitle: 'Skipped negative items while continuing the sum' },
      { title: 'Bug diagnosed & repaired', subtitle: 'Replaced an unintended non-local return with return@forEach' }],
  },
};

export const INLINE_FUNCTIONS_LESSON = conceptualLesson('inline-functions', 'Inline functions', 'Ask the Compiler to Inline a Higher-Order Function', 'inline asks the Kotlin compiler to substitute a function body at call sites, reducing some lambda allocation overhead and enabling specific control-flow rules.', ['inline fun use(value: Int, operation: (Int) -> Int): Int {', '    return operation(value)', '}'], [
  { prompt: 'Who performs inlining?', answer: 'The Kotlin compiler, before the program runs.', detail: 'inline is not a runtime loop or a visual formatting change.' },
  { prompt: 'What can inline reduce in some cases?', answer: 'The overhead of allocating a function object for a higher-order call.', detail: 'It is a performance and control-flow tool, not a guarantee to use everywhere.' },
  { prompt: 'Why is inline concept-only here?', answer: 'The browser runner executes JavaScript and cannot honestly demonstrate Kotlin compiler inlining.', detail: 'The activity focuses on the real compiler meaning.' },
]);

export const NOINLINE_LESSON = conceptualLesson('noinline', 'noinline', 'Keep One Lambda as a Real Value', 'Inside an inline function, noinline tells Kotlin not to inline a particular function parameter so it can be stored or passed onward as a value.', ['inline fun schedule(', '    noinline later: () -> Unit,', '    now: () -> Unit', ') {', '    now()', '}'], [
  { prompt: 'What does noinline apply to?', answer: 'A specific lambda parameter of an inline function.', detail: 'It does not disable the inline modifier for every parameter.' },
  { prompt: 'Why mark a parameter noinline?', answer: 'Because that lambda needs to be kept, stored, or passed as a real function value.', detail: 'A noinline parameter remains callable but is not substituted at each call site.' },
  { prompt: 'What is the relationship to inline?', answer: 'noinline is meaningful only inside a function declared inline.', detail: 'It refines the compiler treatment of one parameter.' },
]);

export const CROSSINLINE_LESSON = conceptualLesson('crossinline', 'crossinline', 'Forbid Non-Local Returns Safely', 'crossinline marks a lambda parameter of an inline function when that lambda may run in another execution context, so a non-local return is forbidden.', ['inline fun later(crossinline action: () -> Unit) {', '    val task = { action() }', '    task()', '}'], [
  { prompt: 'What does crossinline prevent?', answer: 'A non-local return from that lambda.', detail: 'The lambda may be invoked from a nested callback-like context.' },
  { prompt: 'Why is crossinline needed?', answer: 'Because the inline function passes the lambda into another execution boundary.', detail: 'A return from the outer caller would no longer be safe there.' },
  { prompt: 'Does crossinline stop the lambda from running?', answer: 'No; it only restricts the kind of return written inside it.', detail: 'The action remains callable normally.' },
]);

export const WORLD_9_BOSS_LESSON = runnableLesson({
  key: 'boss', topic: 'Functional Utility Engine', learnTitle: 'Build Reusable Operations',
  learnText: 'A utility engine accepts behavior as a function parameter, so one function can apply many rules without duplicating its own control flow.',
  takeaway: 'Combine function types, higher-order parameters, and lambdas to create flexible reusable utilities.',
  example: ['fun apply(value: Int, operation: (Int) -> Int): Int {', '    return operation(value)', '}', 'fun main() {', '    println(apply(6) { it * 2 })', '}'],
  explore: ['fun apply(value: Int, operation: (Int) -> Int): Int { return operation(value) }', 'val addTen: (Int) -> Int = { it + 10 }', 'println(apply(5, addTen))'], exploreNote: 'The same apply function works with a stored lambda or a trailing lambda.',
  predictions: [
    { code: ['fun apply(n: Int, op: (Int) -> Int): Int { return op(n) }', 'fun main() {', '    println(apply(4) { it * it })', '}'], output: '16', detail: 'apply supplies 4 to the square operation.' },
    { code: ['fun apply(n: Int, op: (Int) -> Int): Int { return op(n) }', 'fun main() {', '    val bonus: (Int) -> Int = { it + 10 }', '    println(apply(2, bonus))', '}'], output: '12', detail: 'The stored bonus operation receives 2.' },
    { code: ['fun main() {', '    val label: (Int) -> String = { "Item-" + it }', '    println(label(3))', '}'], output: 'Item-3', detail: 'A function type can return text as well as numbers.' },
  ],
  challenge: 'Build the Functional Utility Engine', description: 'Create applyRule(value, rule) returning rule(value). In main, create double with type (Int) -> Int, then print applyRule(9, double) and applyRule(9) { it + 1 }.',
  initialCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    // Return rule(value):\n\n}\n\nfun main() {\n    // Create double as an (Int) -> Int lambda:\n\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}',
  solutionCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    return rule(value)\n}\n\nfun main() {\n    val double: (Int) -> Int = { it * 2 }\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}', expectedOutput: '18\n10',
  brokenCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    return value\n}\n\nfun main() {\n    val double: (Int) -> Int = { it * 2 }\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}', fixedCode: 'fun applyRule(value: Int, rule: (Int) -> Int): Int {\n    return rule(value)\n}\n\nfun main() {\n    val double: (Int) -> Int = { it * 2 }\n    println(applyRule(9, double))\n    println(applyRule(9) { it + 1 })\n}',
  hints: ['applyRule must use the rule parameter.', 'Returning value bypasses both supplied behaviors.', 'Return rule(value).'],
});
