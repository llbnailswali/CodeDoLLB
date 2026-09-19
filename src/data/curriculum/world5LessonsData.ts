import { FiveStageLesson } from '../lessonStagesData';

type LessonConfig = {
  id: string;
  topic: string;
  learnTitle: string;
  subtitle: string;
  code: string[];
  explanation: string;
  takeaway: string;
  explore: Array<{ title: string; subtitle: string; code: string[]; meaning: string; changed: string }>;
  predicts: Array<{ title: string; code: string[]; output: string; detail: string }>;
  write: { title: string; description: string; initial: string; solution: string; output: string; file: string; params: string; returns: string };
  debug: { title: string; subtitle: string; label: string; broken: string; fixed: string; output: string; hints: [string, string, string]; explanation: string };
  boss?: boolean;
};

const choices = (answer: string) => [
  { id: 'A' as const, label: answer, isCorrect: true },
  { id: 'B' as const, label: 'A different value is printed', isCorrect: false },
  { id: 'C' as const, label: 'Nothing is printed', isCorrect: false },
  { id: 'D' as const, label: 'A compilation error occurs', isCorrect: false },
];

function makeLesson(c: LessonConfig): FiveStageLesson {
  const total = c.predicts.length;
  return {
    id: c.id,
    worldId: 'world-5',
    worldName: 'Function Forge',
    stageName: 'STAGE 5 — FUNCTIONS',
    topicTitle: c.topic,
    learn: {
      title: c.learnTitle, subtitle: c.subtitle, exampleTag: 'EXAMPLE', exampleTitle: c.topic,
      language: 'Kotlin', codeSnippet: c.code, explanation: c.explanation,
      keyIdeas: [
        { number: 1, title: 'Define the behavior once', description: 'A function gives a useful piece of logic a clear, reusable name.' },
        { number: 2, title: 'Call it deliberately', description: 'The function body runs only when its name is called with the required inputs.' },
        { number: 3, title: 'Keep responsibilities focused', description: 'Small functions are easier to read, test, reuse, and repair.' },
      ], keyTakeaway: c.takeaway,
    },
    explore: {
      title: 'Explore the Concept', subtitle: `Build confidence with ${c.topic} through three focused examples.`,
      cards: c.explore.map((x, i) => ({ id: `${c.id}-explore-${i + 1}`, number: `0${i + 1}`, title: x.title, language: 'Kotlin', subtitle: x.subtitle, code: x.code, whatItMeans: [{ label: 'What happens', description: x.meaning }], whatChanged: x.changed })),
    },
    predict: {
      title: 'What will this code do?', subtitle: 'Trace the function call and predict its exact output.',
      questions: c.predicts.map((x, i) => ({ id: `${c.id}-predict-${i + 1}`, questionNumber: i + 1, totalQuestions: total, title: x.title, topicMeta: c.topic, language: 'Kotlin', code: x.code, prompt: 'What will this code print?', options: choices(x.output), explanation: { codeRef: 'Function call', detail: x.detail } })),
    },
    writeRun: {
      challengeNumber: 1, totalChallenges: 1, xpReward: c.boss ? 60 : 20, title: c.write.title, description: c.write.description,
      requirements: { name: 'main', params: c.write.params, returns: c.write.returns }, fileName: c.write.file,
      initialCode: c.write.initial, solutionCode: c.write.solution, sampleInput: 'main()', expectedOutput: c.write.output, testCase: { call: '', expected: c.write.output },
    },
    debug: {
      title: c.debug.title, subtitle: c.debug.subtitle, challengeNumber: 1, totalChallenges: 1, difficulty: c.boss ? 'hard' : 'easy', bugType: 'logic', bugLabel: c.debug.label,
      brokenCode: c.debug.broken, fixedCode: c.debug.fixed, expectedOutput: c.debug.output, hints: c.debug.hints, explanation: c.debug.explanation,
    },
    mastered: {
      topicTitle: c.topic, summary: `You have mastered ${c.topic}: defining focused functions, tracing calls, writing a working solution, and fixing a realistic logic defect.`, passedCount: `${total} / ${total} PASSED`,
      verificationItems: [
        { title: 'Concept understood', subtitle: c.takeaway }, { title: 'Examples explored', subtitle: '3 progressive function patterns' }, { title: 'Predictions completed', subtitle: `${total}/${total} correct output forecasts` }, { title: 'Code written & executed', subtitle: '1 practical runtime test passed' }, { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a function logic defect and verified execution' },
      ], xpEarned: c.boss ? 60 : 20, streakDays: 1, accuracy: '100%',
    },
  };
}

export const DEFINING_FUNCTIONS_LESSON = makeLesson({
  id: 'world-5-defining-functions', topic: 'Defining functions', learnTitle: 'Give Reusable Work a Name',
  subtitle: 'A function groups instructions under a name. Defining it describes the work; calling it actually performs the work.',
  code: ['fun showWelcome() {', '    println("Welcome!")', '}', '', 'fun main() {', '    showWelcome()', '}'],
  explanation: 'fun starts a function declaration. showWelcome has no parameters and returns Unit implicitly. main calls it, so its body prints one line.', takeaway: 'Define a function with fun name() { ... }, then call name() to run its body.',
  explore: [
    { title: 'A no-input function', subtitle: 'The simplest reusable action.', code: ['fun ringBell() {', '    println("Ring!")', '}'], meaning: 'ringBell is defined but does not run yet.', changed: 'Defined a function without calling it.' },
    { title: 'Calling the function', subtitle: 'Use parentheses to run its body.', code: ['fun ringBell() {', '    println("Ring!")', '}', 'ringBell()'], meaning: 'The call runs the body and prints Ring!.', changed: 'Added a call after the definition.' },
    { title: 'Calling more than once', subtitle: 'Reuse the same instructions.', code: ['fun ringBell() {', '    println("Ring!")', '}', 'ringBell()', 'ringBell()'], meaning: 'Each call runs the same body independently.', changed: 'Reused one definition twice.' },
    { title: 'Defined after where it is called', subtitle: 'Top-level functions do not have to be declared before their call site.', code: ['fun main() {', '    announce()', '}', '', 'fun announce() {', '    println("Ready")', '}'], meaning: 'main calls announce even though announce is written below it -- Kotlin still finds it.', changed: 'Called a function that is declared later in the file.' },
  ],
  predicts: [
    { title: 'Definition and call', code: ['fun cheer() {', '    println("Go!")', '}', '', 'fun main() {', '    cheer()', '}'], output: 'Go!', detail: 'cheer is called once, so its println runs once.' },
    { title: 'Two calls', code: ['fun ping() {', '    println("Ping")', '}', 'fun main() {', '    ping()', '    ping()', '}'], output: 'Ping\nPing', detail: 'Each call executes the complete function body.' },
    { title: 'Order matters', code: ['fun first() {', '    println("First")', '}', 'fun main() {', '    println("Start")', '    first()', '}'], output: 'Start\nFirst', detail: 'main prints Start before it calls first.' },
    { title: 'Called Before Its Own Declaration', code: ['fun main() {', '    println("Loading")', '    finish()', '}', '', 'fun finish() {', '    println("Finished")', '}'], output: 'Loading\nFinished', detail: 'finish is declared after main, but Kotlin does not require top-level functions to appear before their call site.' },
  ],
  write: {
    title: 'Create a Status Function',
    description:
      'Define and execute a reusable status function.\n\n' +
      '1. Outside main, define a function named showStatus() that prints "System ready".\n\n' +
      '2. Inside main(), call showStatus() to execute it.',
    initial: '// 1. Outside main, define showStatus():\n\nfun main() {\n    // 2. Call showStatus():\n}',
    solution: 'fun showStatus() {\n    println("System ready")\n}\n\nfun main() {\n    showStatus()\n}',
    output: 'System ready',
    file: 'Status.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Call the Welcome Function', subtitle: 'The function is correct, but the program should print its welcome message.', label: 'Logic Bug: Missing Function Call', broken: 'fun welcome() {\n    println("Welcome!")\n}\n\nfun main() {\n    println("Starting")\n}', fixed: 'fun welcome() {\n    println("Welcome!")\n}\n\nfun main() {\n    println("Starting")\n    welcome()\n}', output: 'Starting\nWelcome!', hints: ['The function exists, but defining code does not execute it.', 'Look inside main for the instruction that should run welcome.', 'Add welcome() after println("Starting").'], explanation: 'A function body runs only after a call. Adding welcome() in main produces the required second line.' },
});

export const FUNCTION_PARAMETERS_LESSON = makeLesson({
  id: 'world-5-function-parameters', topic: 'Function parameters', learnTitle: 'Pass Data into Functions', subtitle: 'Parameters are named inputs. Each call supplies arguments that the function can use inside its body.',
  code: ['fun greet(name: String) {', '    println("Hello, $name")', '}', '', 'fun main() {', '    greet("Maya")', '}'], explanation: 'name is a String parameter. The argument "Maya" is assigned to name for this call, so the template prints Hello, Maya.', takeaway: 'Parameters receive values from a call: fun greet(name: String), then greet("Maya").',
  explore: [
    { title: 'One parameter', subtitle: 'Use a caller-supplied value.', code: ['fun showScore(score: Int) {', '    println(score)', '}', 'showScore(42)'], meaning: 'score holds 42 during this call.', changed: 'Added a typed input.' },
    { title: 'Two parameters', subtitle: 'A function can combine inputs.', code: ['fun add(a: Int, b: Int) {', '    println(a + b)', '}', 'add(3, 4)'], meaning: 'a is 3 and b is 4, so the function prints 7.', changed: 'Added a second input.' },
    { title: 'Different calls', subtitle: 'Parameters make behavior reusable.', code: ['fun greet(name: String) {', '    println("Hi, $name")', '}', 'greet("Ana")', 'greet("Bo")'], meaning: 'The same body uses a different name each time.', changed: 'Called one function with different arguments.' },
    { title: 'Passing a variable', subtitle: 'An argument does not have to be typed directly as a literal.', code: ['val playerName = "Maya"', 'fun greet(name: String) {', '    println("Hello, $name")', '}', 'greet(playerName)'], meaning: 'The value stored in playerName becomes the argument for name.', changed: 'Passed a variable instead of a literal value.' },
  ],
  predicts: [
    { title: 'A string parameter', code: ['fun label(item: String) {', '    println("Item: $item")', '}', '', 'fun main() {', '    label("Book")', '}'], output: 'Item: Book', detail: 'The argument Book becomes the parameter item.' },
    { title: 'Adding parameters', code: ['fun sum(a: Int, b: Int) {', '    println(a + b)', '}', 'fun main() {', '    sum(8, 2)', '}'], output: '10', detail: 'a and b receive 8 and 2, and their sum is printed.' },
    { title: 'Two separate calls', code: ['fun echo(word: String) {', '    println(word)', '}', 'fun main() {', '    echo("Up")', '    echo("Down")', '}'], output: 'Up\nDown', detail: 'Each call supplies a different argument.' },
    { title: 'Passing a Variable', code: ['fun main() {', '    val city = "Delhi"', '    fun show(place: String) {', '        println("Visiting $place")', '    }', '    show(city)', '}'], output: 'Visiting Delhi', detail: 'The value stored in city (Delhi) becomes the argument for place.' },
  ],
  write: {
    title: 'Build a Personal Greeting',
    description:
      'Define a function that takes a name parameter.\n\n' +
      '1. Define greet(name: String) to print "Hello, $name".\n\n' +
      '2. Inside main(), call greet("Riya").',
    initial: '// 1. Define greet(name: String):\n\nfun main() {\n    // 2. Call greet with "Riya":\n}',
    solution: 'fun greet(name: String) {\n    println("Hello, $name")\n}\n\nfun main() {\n    greet("Riya")\n}',
    output: 'Hello, Riya',
    file: 'Greeting.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Use Both Inputs', subtitle: 'The total should include both numbers supplied to the function.', label: 'Logic Bug: Ignored Parameter', broken: 'fun total(a: Int, b: Int) {\n    println(a)\n}\n\nfun main() {\n    total(6, 4)\n}', fixed: 'fun total(a: Int, b: Int) {\n    println(a + b)\n}\n\nfun main() {\n    total(6, 4)\n}', output: '10', hints: ['One parameter is not contributing to the result.', 'The call supplies 6 and 4, so compare the body with the expected total.', 'Change println(a) to println(a + b).'], explanation: 'The broken version receives both inputs but prints only a. Adding b creates the requested total.' },
});

export const RETURN_VALUES_LESSON = makeLesson({
  id: 'world-5-return-values', topic: 'Return values', learnTitle: 'Send a Result Back', subtitle: 'A value-returning function computes a result for its caller. Declare the return type and use return to send the value back.',
  code: ['fun square(number: Int): Int {', '    return number * number', '}', '', 'fun main() {', '    println(square(5))', '}'], explanation: 'square receives 5, returns 25 as an Int, and println prints the returned value. return ends this function call with its result.', takeaway: 'Use `: Type` and return to send a computed value back to the caller.',
  explore: [
    { title: 'Return a number', subtitle: 'The caller can store or print it.', code: ['fun double(n: Int): Int {', '    return n * 2', '}', 'println(double(4))'], meaning: 'double returns 8, which println receives.', changed: 'Returned a value instead of only printing.' },
    { title: 'Return a String', subtitle: 'Return types are not limited to numbers.', code: ['fun badge(name: String): String {', '    return "Player: $name"', '}', 'println(badge("Kai"))'], meaning: 'The function returns a constructed String.', changed: 'Used a String return type.' },
    { title: 'Reuse a returned value', subtitle: 'A return value fits into expressions.', code: ['fun add(a: Int, b: Int): Int {', '    return a + b', '}', 'val score = add(2, 3)', 'println(score)'], meaning: 'add returns 5, which is stored in score.', changed: 'Stored a function result.' },
    { title: 'Return a Boolean', subtitle: 'A comparison can be the returned result.', code: ['fun isAdult(age: Int): Boolean {', '    return age >= 18', '}', 'println(isAdult(20))'], meaning: 'age >= 18 evaluates to true, which the function returns.', changed: 'Used a Boolean return type instead of a number or String.' },
  ],
  predicts: [
    { title: 'A numeric result', code: ['fun half(n: Int): Int {', '    return n / 2', '}', 'fun main() {', '    println(half(9))', '}'], output: '4', detail: 'Both values are Int, so Kotlin integer division truncates 9 / 2 to 4.' },
    { title: 'Return into a template', code: ['fun tag(name: String): String {', '    return "#$name"', '}', 'fun main() {', '    println(tag("fun"))', '}'], output: '#fun', detail: 'tag returns the String #fun, then println prints it.' },
    { title: 'Return then add', code: ['fun next(n: Int): Int {', '    return n + 1', '}', 'fun main() {', '    println(next(9) + 1)', '}'], output: '11', detail: 'next(9) returns 10, then the caller adds 1.' },
    { title: 'A Boolean result', code: ['fun main() {', '    fun isEven(n: Int): Boolean {', '        return n % 2 == 0', '    }', '    println(isEven(7))', '}'], output: 'false', detail: '7 % 2 is 1, so the comparison to 0 is false, and isEven returns false.' },
  ],
  write: {
    title: 'Return a Discounted Price',
    description:
      'Define a function that returns an Int value.\n\n' +
      '1. Define discount(price: Int): Int that returns price - 5.\n\n' +
      '2. Inside main(), call discount(20) and print the result using println().',
    initial: '// 1. Define discount(price: Int): Int:\n\nfun main() {\n    // 2. Print the result of discount(20):\n}',
    solution: 'fun discount(price: Int): Int {\n    return price - 5\n}\n\nfun main() {\n    println(discount(20))\n}',
    output: '15',
    file: 'Discount.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Return the Computed Result', subtitle: 'The function should return the doubled value, not the original input.', label: 'Logic Bug: Wrong Return Value', broken: 'fun double(n: Int): Int {\n    return n\n}\n\nfun main() {\n    println(double(7))\n}', fixed: 'fun double(n: Int): Int {\n    return n * 2\n}\n\nfun main() {\n    println(double(7))\n}', output: '14', hints: ['The function returns a value, but it has not transformed the input.', 'Compare the returned expression with the function name double.', 'Return n * 2 instead of n.'], explanation: 'The original return simply echoes n. Returning n * 2 sends 14 back to println.' },
});

export const DEFAULT_PARAMETERS_LESSON = makeLesson({
  id: 'world-5-default-parameters', topic: 'Default parameters', learnTitle: 'Provide a Useful Default', subtitle: 'A default parameter value lets a caller omit that argument while still getting predictable behavior.',
  code: ['fun greet(name: String = "Guest") {', '    println("Hello, $name")', '}', '', 'fun main() {', '    greet()', '}'], explanation: 'name has the default value Guest. Because the call supplies no argument, the function uses Guest and prints Hello, Guest.', takeaway: 'Write `parameter: Type = value`; callers may omit that argument or override it positionally.',
  explore: [
    { title: 'Use the default', subtitle: 'An omitted argument gets its fallback.', code: ['fun level(points: Int = 0) {', '    println(points)', '}', 'level()'], meaning: 'points is 0 because no argument was supplied.', changed: 'Used a default value.' },
    { title: 'Override the default', subtitle: 'An argument replaces the fallback.', code: ['fun level(points: Int = 0) {', '    println(points)', '}', 'level(12)'], meaning: 'points is 12 for this call.', changed: 'Supplied a positional override.' },
    { title: 'Keep required inputs first', subtitle: 'Defaults commonly follow required parameters.', code: ['fun invite(name: String, city: String = "Pune") {', '    println("$name: $city")', '}', 'invite("Ari")'], meaning: 'name is required; city uses Pune when omitted.', changed: 'Combined required and default inputs.' },
    { title: 'Two defaults, overriding only the first', subtitle: 'Later defaults still apply even when an earlier one is overridden.', code: ['fun order(item: String, quantity: Int = 1, expressShipping: Boolean = false) {', '    println("$item x$quantity, express=$expressShipping")', '}', 'order("Pen", 3)'], meaning: 'quantity is overridden to 3; expressShipping still falls back to false.', changed: 'Overrode one default while leaving a second default untouched.' },
  ],
  predicts: [
    { title: 'Fallback greeting', code: ['fun greet(name: String = "Guest") {', '    println("Hi, $name")', '}', 'fun main() {', '    greet()', '}'], output: 'Hi, Guest', detail: 'No argument is passed, so name takes its default Guest.' },
    { title: 'Override a fallback', code: ['fun greet(name: String = "Guest") {', '    println("Hi, $name")', '}', 'fun main() {', '    greet("Noa")', '}'], output: 'Hi, Noa', detail: 'The supplied positional argument replaces the default for this call.' },
    { title: 'Required plus default', code: ['fun report(item: String, count: Int = 1) {', '    println("$item: $count")', '}', 'fun main() {', '    report("Pen")', '}'], output: 'Pen: 1', detail: 'item receives Pen and the omitted count receives 1.' },
    { title: 'Overriding One of Two Defaults', code: ['fun main() {', '    fun makeCoffee(size: String = "Medium", sugar: Int = 1) {', '        println("$size coffee with $sugar sugar")', '    }', '    makeCoffee("Large")', '}'], output: 'Large coffee with 1 sugar', detail: 'size is overridden to Large; sugar still falls back to its default, 1.' },
  ],
  write: {
    title: 'Set a Default Theme',
    description:
      'Define a function with a default parameter value.\n\n' +
      '1. Define showTheme(theme: String = "Light") to print "Theme: $theme".\n\n' +
      '2. Inside main(), call showTheme() with no arguments so it uses the default value.',
    initial: '// 1. Define showTheme(theme: String = "Light"):\n\nfun main() {\n    // 2. Call showTheme() with no arguments:\n}',
    solution: 'fun showTheme(theme: String = "Light") {\n    println("Theme: $theme")\n}\n\nfun main() {\n    showTheme()\n}',
    output: 'Theme: Light',
    file: 'Theme.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Restore the Default', subtitle: 'Calling without an argument should print the intended fallback.', label: 'Logic Bug: Incorrect Default Value', broken: 'fun lives(count: Int = 1) {\n    println("Lives: $count")\n}\n\nfun main() {\n    lives()\n}', fixed: 'fun lives(count: Int = 3) {\n    println("Lives: $count")\n}\n\nfun main() {\n    lives()\n}', output: 'Lives: 3', hints: ['The call is correct; inspect the fallback declared in the parameter list.', 'No argument is passed, so the default determines the output.', 'Change the default from 1 to 3.'], explanation: 'When a call omits count, Kotlin uses the declared default. Updating it to 3 produces the target output.' },
});

export const NAMED_ARGUMENTS_LESSON = makeLesson({
  id: 'world-5-named-arguments', topic: 'Named arguments', learnTitle: 'Make Calls Self-Documenting', subtitle: 'A named argument labels the parameter it supplies, improving readability and allowing Kotlin callers to reorder arguments.',
  code: ['fun schedule(day: String, hour: Int) {', '    println("$day at $hour")', '}', '', 'schedule(hour = 9, day = "Monday")'], explanation: 'The labels connect values to parameter names, so order no longer matters -- schedule(hour = 9, day = "Monday") still assigns "Monday" to day and 9 to hour, printing "Monday at 9".', takeaway: 'Use `parameterName = value` at a Kotlin call site to make argument meaning clear, and reorder arguments freely once they are labeled.',
  explore: [
    { title: 'Label an argument', subtitle: 'The label documents what the value means.', code: ['fun setVolume(level: Int) {', '    println(level)', '}', 'setVolume(level = 8)'], meaning: 'level = 8 clearly states which parameter receives 8.', changed: 'Added a parameter name at the call site.' },
    { title: 'Reorder safely', subtitle: 'Named arguments identify their destinations.', code: ['fun move(x: Int, y: Int) {', '    println("$x, $y")', '}', 'move(y = 4, x = 2)'], meaning: 'x receives 2 and y receives 4 despite the written order.', changed: 'Reordered named arguments.' },
    { title: 'Mix for readability', subtitle: 'Prefer names when repeated same-type values are unclear.', code: ['fun color(red: Int, green: Int, blue: Int) {', '    println("$red $green $blue")', '}', 'color(red = 255, green = 120, blue = 0)'], meaning: 'The labels prevent confusion between three Int values.', changed: 'Used labels to clarify same-typed inputs.' },
    { title: 'Skip a default, then name a later one', subtitle: 'Named arguments let you target a later default without supplying the ones before it.', code: ['fun order(item: String, quantity: Int = 1, expressShipping: Boolean = false) {', '    println("$item x$quantity, express=$expressShipping")', '}', 'order("Pen", expressShipping = true)'], meaning: 'quantity keeps its default of 1; expressShipping is set directly by name without supplying quantity first.', changed: 'Used a named argument to override a later default while leaving an earlier default untouched.' },
  ],
  predicts: [
    { title: 'Named order', code: ['fun point(x: Int, y: Int) {', '    println("$x,$y")', '}', '', 'fun main() {', '    point(y = 7, x = 3)', '}'], output: '3,7', detail: 'In Kotlin, labels map 3 to x and 7 to y, regardless of call order.' },
    { title: 'Clear Boolean meaning', code: ['fun access(admin: Boolean, active: Boolean) {', '    println(admin && active)', '}', '', 'fun main() {', '    access(active = true, admin = false)', '}'], output: 'false', detail: 'admin is false and active is true, so their && result is false.' },
    { title: 'Same-type parameters', code: ['fun size(width: Int, height: Int) {', '    println(width * height)', '}', '', 'fun main() {', '    size(height = 4, width = 6)', '}'], output: '24', detail: 'The labels give width 6 and height 4, so the area is 24.' },
    { title: 'Naming a Later Default', code: ['fun main() {', '    fun bookRoom(guest: String, nights: Int = 1, breakfast: Boolean = false) {', '        println("$guest for $nights night(s), breakfast=$breakfast")', '    }', '    bookRoom("Ana", breakfast = true)', '}'], output: 'Ana for 1 night(s), breakfast=true', detail: 'nights keeps its default of 1; breakfast is set directly by name without needing to supply nights first.' },
  ],
  write: {
    title: 'Call a Function Using Named Arguments',
    description:
      'Define and call a function using named arguments in reversed order.\n\n' +
      '1. Define schedule(day: String, hour: Int) to print "$day at $hour".\n\n' +
      '2. Inside main(), call schedule using named arguments with hour written before day: schedule(hour = 9, day = "Monday").',
    initial: '// 1. Define schedule(day: String, hour: Int):\n\nfun main() {\n    // 2. Call schedule using named arguments (hour = 9, day = "Monday"):\n}',
    solution: 'fun schedule(day: String, hour: Int) {\n    println("$day at $hour")\n}\n\nfun main() {\n    schedule(hour = 9, day = "Monday")\n}',
    output: 'Monday at 9',
    file: 'Schedule.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Fix the Mislabeled Coordinates', subtitle: 'The position is being reported backwards -- the named arguments are correct, but their values are swapped.', label: 'Logic Bug: Values Swapped Under Named Labels', broken: 'fun position(x: Int, y: Int) {\n    println("$x,$y")\n}\n\nfun main() {\n    // BUG: x and y values are swapped under their own labels!\n    position(x = 5, y = 2)\n}', fixed: 'fun position(x: Int, y: Int) {\n    println("$x,$y")\n}\n\nfun main() {\n    position(x = 2, y = 5)\n}', output: '2,5', hints: ['The labels x = and y = are correct -- check whether the VALUES assigned to each label are the ones actually intended.', 'The position should be (2, 5) -- but which value is currently attached to which label?', 'Swap the values so x = 2 and y = 5.'], explanation: 'Named arguments let you write parameters in any order, but the label still has to be paired with the correct value -- position(x = 5, y = 2) is valid Kotlin, but it attaches 5 to x and 2 to y, the opposite of what was intended. Swapping the values to x = 2, y = 5 correctly reports the position as "2,5".' },
});

export const SINGLE_EXPRESSION_FUNCTIONS_LESSON = makeLesson({
  id: 'world-5-single-expression-functions', topic: 'Single-expression functions', learnTitle: 'Return One Expression Concisely', subtitle: 'When a function body is one expression, use = instead of braces and return. Kotlin infers the result type.',
  code: ['fun triple(number: Int) = number * 3', '', 'fun main() {', '    println(triple(4))', '}'], explanation: 'The expression number * 3 is automatically returned. Kotlin infers the return type Int, so no braces or return keyword are needed.', takeaway: 'Use `fun name(inputs) = expression` when one expression is the entire result.',
  explore: [
    { title: 'A numeric expression', subtitle: 'The expression is the returned value.', code: ['fun square(n: Int) = n * n', 'println(square(3))'], meaning: 'square returns 9.', changed: 'Replaced a block and return with =.' },
    { title: 'A String expression', subtitle: 'Templates also work as expressions.', code: ['fun label(id: Int) = "ID-$id"', 'println(label(7))'], meaning: 'label returns ID-7.', changed: 'Returned a String template concisely.' },
    { title: 'A Boolean expression', subtitle: 'Comparisons produce Boolean results.', code: ['fun isAdult(age: Int) = age >= 18', 'println(isAdult(20))'], meaning: 'age >= 18 evaluates to true.', changed: 'Returned a Boolean expression.' },
    { title: 'An if-expression as the body', subtitle: 'The single expression can itself be an if/else.', code: ['fun max(a: Int, b: Int) = if (a > b) a else b', 'println(max(7, 12))'], meaning: 'The if/else expression evaluates to 12, which becomes the function\'s result.', changed: 'Used an if-expression, not just arithmetic, as the single expression.' },
  ],
  predicts: [
    { title: 'Concise multiplication', code: ['fun timesTen(n: Int) = n * 10', 'fun main() {', '    println(timesTen(6))', '}'], output: '60', detail: 'The single expression n * 10 is returned.' },
    { title: 'A concise check', code: ['fun isEven(n: Int) = n % 2 == 0', 'fun main() {', '    println(isEven(5))', '}'], output: 'false', detail: '5 % 2 is 1, so the comparison to 0 is false.' },
    { title: 'Compose a result', code: ['fun title(name: String) = "Dr. $name"', 'fun main() {', '    println(title("Lee"))', '}'], output: 'Dr. Lee', detail: 'The expression creates and returns the templated String.' },
    { title: 'An if-expression Body', code: ['fun main() {', '    fun sign(n: Int) = if (n >= 0) "positive" else "negative"', '    println(sign(-4))', '}'], output: 'negative', detail: '-4 >= 0 is false, so the if-expression evaluates to "negative", which sign returns directly.' },
  ],
  write: {
    title: 'Write a Compact Converter',
    description:
      'Define a concise single-expression function using = syntax.\n\n' +
      '1. Define minutesToSeconds(minutes: Int) = minutes * 60.\n\n' +
      '2. Inside main(), print the result of minutesToSeconds(3).',
    initial: '// 1. Define single-expression function minutesToSeconds(minutes: Int):\n\nfun main() {\n    // 2. Print minutesToSeconds(3):\n}',
    solution: 'fun minutesToSeconds(minutes: Int) = minutes * 60\n\nfun main() {\n    println(minutesToSeconds(3))\n}',
    output: '180',
    file: 'Converter.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Fix the Compact Formula', subtitle: 'The converter should multiply hours by 60.', label: 'Logic Bug: Wrong Single Expression', broken: 'fun hoursToMinutes(hours: Int) = hours * 6\n\nfun main() {\n    println(hoursToMinutes(2))\n}', fixed: 'fun hoursToMinutes(hours: Int) = hours * 60\n\nfun main() {\n    println(hoursToMinutes(2))\n}', output: '120', hints: ['The compact syntax is fine; inspect the arithmetic expression.', 'How many minutes are in one hour?', 'Change * 6 to * 60.'], explanation: 'A single-expression function returns exactly the expression after =. Multiplying by 60 converts hours to minutes.' },
});

export const LOCAL_FUNCTIONS_LESSON = makeLesson({
  id: 'world-5-local-functions', topic: 'Local functions', learnTitle: 'Keep Helper Logic Local', subtitle: 'A local function is declared inside another function when its helper behavior only makes sense in that enclosing scope.',
  code: ['fun main() {', '    fun decorate(text: String): String {', '        return "[$text]"', '    }', '    println(decorate("Done"))', '}'], explanation: 'decorate is visible inside main, where it is declared. It returns a decorated String that main prints.', takeaway: 'Declare a helper inside a function when it belongs only to that function’s job.',
  explore: [
    { title: 'A local helper', subtitle: 'The helper lives inside main.', code: ['fun main() {', '    fun twice(n: Int) = n * 2', '    println(twice(4))', '}'], meaning: 'twice is available to main and returns 8.', changed: 'Nested a helper function.' },
    { title: 'Use outer data', subtitle: 'A local function can read enclosing values.', code: ['fun main() {', '    val prefix = "Task"', '    fun label(id: Int) = "$prefix-$id"', '    println(label(3))', '}'], meaning: 'label can read prefix from main’s scope.', changed: 'Combined a local helper with outer data.' },
    { title: 'Keep a task focused', subtitle: 'Helpers clarify multi-step work.', code: ['fun main() {', '    fun valid(score: Int) = score >= 50', '    println(valid(70))', '}'], meaning: 'The local name valid makes the final call easy to read.', changed: 'Extracted a check into a local helper.' },
  ],
  predicts: [
    { title: 'Local calculation', code: ['fun main() {', '    fun addTax(price: Int) = price + 2', '    println(addTax(8))', '}'], output: '10', detail: 'The local function returns 8 + 2 to println.' },
    { title: 'Capture an outer value', code: ['fun main() {', '    val mark = "!"', '    fun cheer(word: String) = "$word$mark"', '    println(cheer("Win"))', '}'], output: 'Win!', detail: 'cheer reads mark from its enclosing main function.' },
    { title: 'Call twice locally', code: ['fun main() {', '    fun next(n: Int) = n + 1', '    println(next(1))', '    println(next(4))', '}'], output: '2\n5', detail: 'The same local helper is called with two inputs.' },
  ],
  write: {
    title: 'Create a Local Formatter',
    description:
      'Declare a local helper function scoped inside another function.\n\n' +
      '1. Inside main(), define a local single-expression function: format(name: String) = "User: $name".\n\n' +
      '2. Print the result of calling format("Sam").',
    initial: 'fun main() {\n    // 1. Define local helper format(name: String) = "User: $name":\n\n    // 2. Print format("Sam"):\n}',
    solution: 'fun main() {\n    fun format(name: String) = "User: $name"\n    println(format("Sam"))\n}',
    output: 'User: Sam',
    file: 'LocalHelper.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Fix the Local Announcement', subtitle: 'The local announcer should include the supplied title.', label: 'Logic Bug: Ignored Local Parameter', broken: 'fun main() {\n    fun announce(title: String) = "Now serving"\n    println(announce("VIP"))\n}', fixed: 'fun main() {\n    fun announce(title: String) = "Now serving $title"\n    println(announce("VIP"))\n}', output: 'Now serving VIP', hints: ['The helper receives a value but does not use it.', 'Look at the expression after = in announce.', 'Include $title in the returned String.'], explanation: 'The broken helper discards title. Adding it to the template returns Now serving VIP.' },
});

export const VARARG_LESSON = makeLesson({
  id: 'world-5-vararg', topic: 'vararg', learnTitle: 'Accept a Flexible Number of Inputs', subtitle: 'A vararg parameter accepts zero or more trailing arguments. Inside the function, Kotlin exposes them as a collection-like sequence you can loop over.',
  code: ['fun total(vararg numbers: Int): Int {', '    var sum = 0', '    for (number in numbers) {', '        sum += number', '    }', '    return sum', '}', '', 'fun main() {', '    println(total(2, 3, 4))', '}'], explanation: 'numbers collects 2, 3, and 4. The for loop visits their values, adds them to sum, and returns 9.', takeaway: 'Declare `vararg name: Type` to accept many trailing arguments and iterate their values.',
  explore: [
    { title: 'Several values', subtitle: 'The parameter collects all trailing arguments.', code: ['fun show(vararg words: String) {', '    for (word in words) {', '        println(word)', '    }', '}', 'show("A", "B")'], meaning: 'words contains A and B, which the loop prints as values.', changed: 'Accepted more than one argument.' },
    { title: 'A running total', subtitle: 'Loop through numeric varargs.', code: ['fun sum(vararg values: Int): Int {', '    var total = 0', '    for (value in values) {', '        total += value', '    }', '    return total', '}', 'println(sum(1, 2, 3))'], meaning: 'The loop adds all three values and returns 6.', changed: 'Combined vararg with an accumulator.' },
    { title: 'One value still works', subtitle: 'Vararg accepts any count, including one.', code: ['fun announce(vararg words: String) {', '    for (word in words) {', '        println(word)', '    }', '}', 'announce("Ready")'], meaning: 'The loop has one value to visit.', changed: 'Used the same vararg function with one argument.' },
    { title: 'A fixed parameter before vararg', subtitle: 'vararg can follow a normal, required leading parameter.', code: ['fun greetAll(prefix: String, vararg names: String) {', '    for (name in names) {', '        println("$prefix, $name!")', '    }', '}', 'greetAll("Hi", "Ana", "Bo")'], meaning: 'prefix is fixed as "Hi"; names collects "Ana" and "Bo" as the trailing arguments.', changed: 'Combined a required leading parameter with a trailing vararg.' },
  ],
  predicts: [
    { title: 'Sum several inputs', code: ['fun sum(vararg values: Int): Int {', '    var total = 0', '    for (value in values) {', '        total += value', '    }', '    return total', '}', 'fun main() {', '    println(sum(4, 5))', '}'], output: '9', detail: 'The vararg values are 4 and 5; the loop adds both.' },
    { title: 'Visit values, not indexes', code: ['fun main() {', '    fun show(vararg values: Int) {', '        for (value in values) {', '            println(value)', '        }', '    }', '    show(7, 8)', '}'], output: '7\n8', detail: 'Kotlin for-in iterates the vararg values themselves.' },
    { title: 'One argument', code: ['fun first(vararg words: String): String {', '    return words[0]', '}', 'fun main() {', '    println(first("Solo"))', '}'], output: 'Solo', detail: 'The vararg receives one String, so its first value is Solo.' },
    { title: 'Fixed Parameter Plus vararg', code: ['fun main() {', '    fun greetAll(prefix: String, vararg names: String) {', '        for (name in names) {', '            println("$prefix, $name!")', '        }', '    }', '    greetAll("Hey", "Sam")', '}'], output: 'Hey, Sam!', detail: 'prefix receives "Hey" and names collects the single trailing argument "Sam".' },
  ],
  write: {
    title: 'Sum Flexible Scores',
    description:
      'Accept a variable number of arguments using vararg.\n\n' +
      '1. Define sumScores(vararg scores: Int): Int that loops over scores and returns their total sum.\n\n' +
      '2. Inside main(), print the result of sumScores(5, 10, 15).',
    initial: '// 1. Define sumScores(vararg scores: Int): Int:\n\nfun main() {\n    // 2. Print sumScores(5, 10, 15):\n}',
    solution: 'fun sumScores(vararg scores: Int): Int {\n    var total = 0\n    for (score in scores) {\n        total += score\n    }\n    return total\n}\n\nfun main() {\n    println(sumScores(5, 10, 15))\n}',
    output: '30',
    file: 'Scores.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Accumulate Every Point', subtitle: 'The total should add every vararg value, not replace the running total.', label: 'Logic Bug: Vararg Total Overwritten', broken: 'fun sumPoints(vararg points: Int): Int {\n    var total = 0\n    for (point in points) {\n        total = point\n    }\n    return total\n}\n\nfun main() {\n    println(sumPoints(4, 8, 12))\n}', fixed: 'fun sumPoints(vararg points: Int): Int {\n    var total = 0\n    for (point in points) {\n        total += point\n    }\n    return total\n}\n\nfun main() {\n    println(sumPoints(4, 8, 12))\n}', output: '24', hints: ['The loop sees all points, but the running total is not growing.', 'Compare assigning total with adding to total.', 'Replace total = point with total += point.'], explanation: 'Assignment discards previous points on every iteration. += preserves the running total and produces 24.' },
});

export const WORLD_5_BOSS_LESSON = makeLesson({
  id: 'world-5-boss', topic: 'Utility Toolkit', learnTitle: 'Combine Functions into a Toolkit', subtitle: 'A useful program divides related work into focused functions, then lets main combine their results.',
  code: ['fun double(n: Int) = n * 2', 'fun greeting(name: String = "Guest") = "Hello, $name"', '', 'fun main() {', '    println(greeting())', '    println(double(6))', '}'], explanation: 'This toolkit has two focused functions: one uses a default parameter and one returns a computed value. main calls both to build the final program.', takeaway: 'A utility toolkit combines small, clear functions with parameters, defaults, return values, and reusable calls.', boss: true,
  explore: [
    { title: 'A focused calculator', subtitle: 'Each function has one job.', code: ['fun add(a: Int, b: Int) = a + b', 'fun square(n: Int) = n * n', 'println(add(2, 3))', 'println(square(4))'], meaning: 'Small functions make each operation explicit.', changed: 'Separated two independent utilities.' },
    { title: 'A friendly default', subtitle: 'Defaults make common calls concise.', code: ['fun greeting(name: String = "Guest") = "Hi, $name"', 'println(greeting())'], meaning: 'The toolkit works even when the caller omits a name.', changed: 'Added a default-enabled utility.' },
    { title: 'A flexible utility', subtitle: 'Vararg handles a changing number of inputs.', code: ['fun sum(vararg values: Int): Int {', '    var total = 0', '    for (value in values) {', '        total += value', '    }', '    return total', '}', 'println(sum(2, 4, 6))'], meaning: 'One utility accepts all supplied values and returns their total.', changed: 'Added flexible input handling.' },
    { title: 'A self-documenting call', subtitle: 'Named arguments make a toolkit call read clearly.', code: ['fun greeting(name: String = "Guest") = "Hi, $name"', 'println(greeting(name = "Kai"))'], meaning: 'Labeling the argument makes it obvious which value fills which parameter, even with a default in play.', changed: 'Called a toolkit utility using a named argument.' },
  ],
  predicts: [
    { title: 'Two toolkit calls', code: ['fun double(n: Int) = n * 2', 'fun main() {', '    println(double(4))', '    println(double(1))', '}'], output: '8\n2', detail: 'Each call returns twice its supplied input.' },
    { title: 'Default utility', code: ['fun greeting(name: String = "Guest") = "Hi, $name"', 'fun main() {', '    println(greeting())', '}'], output: 'Hi, Guest', detail: 'The omitted argument uses the declared default.' },
    { title: 'Toolkit total', code: ['fun sum(vararg values: Int): Int {', '    var total = 0', '    for (value in values) {', '        total += value', '    }', '    return total', '}', 'fun main() {', '    println(sum(1, 2, 3))', '}'], output: '6', detail: 'The vararg loop accumulates all three inputs.' },
    { title: 'A Named-Argument Toolkit Call', code: ['fun main() {', '    fun tag(label: String, value: Int) = "$label=$value"', '    println(tag(value = 5, label = "score"))', '}'], output: 'score=5', detail: 'The labels place "score" into label and 5 into value, regardless of the order they were written in the call.' },
  ],
  write: {
    title: 'Build the Utility Toolkit',
    description:
      'Combine multiple helper functions into a cohesive utility program.\n\n' +
      '1. Define double(n: Int) = n * 2.\n\n' +
      '2. Define greeting(name: String = "Guest") = "Hello, $name".\n\n' +
      '3. Inside main(), print greeting() on the first line.\n\n' +
      '4. Inside main(), print double(8) on the second line.',
    initial: '// 1. Define double(n: Int) = n * 2:\n\n// 2. Define greeting(name: String = "Guest") = "Hello, $name":\n\nfun main() {\n    // 3. Print greeting():\n\n    // 4. Print double(8):\n}',
    solution: 'fun double(n: Int) = n * 2\nfun greeting(name: String = "Guest") = "Hello, $name"\n\nfun main() {\n    println(greeting())\n    println(double(8))\n}',
    output: 'Hello, Guest\n16',
    file: 'UtilityToolkit.kt',
    params: '(none)',
    returns: 'Unit'
  },
  debug: { title: 'Repair the Toolkit Total', subtitle: 'The flexible sum utility should return the total of every supplied value.', label: 'Logic Bug: Incorrect Accumulation in Utility', broken: 'fun sum(vararg values: Int): Int {\n    var total = 0\n    for (value in values) {\n        total = value\n    }\n    return total\n}\n\nfun main() {\n    println(sum(3, 4, 5))\n}', fixed: 'fun sum(vararg values: Int): Int {\n    var total = 0\n    for (value in values) {\n        total += value\n    }\n    return total\n}\n\nfun main() {\n    println(sum(3, 4, 5))\n}', output: '12', hints: ['The function receives all three values but only keeps one result.', 'Inspect how total changes inside the loop.', 'Use total += value so earlier values are preserved.'], explanation: 'The broken utility overwrites total on each pass, leaving only 5. Accumulating with += returns 3 + 4 + 5, or 12.' },
});
