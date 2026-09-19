import { FiveStageLesson } from '../lessonStagesData';

// =========================================================================
// LESSON 1: if (world-3-if)
// =========================================================================
export const IF_LESSON: FiveStageLesson = {
  id: 'world-3-if',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'if',
  learn: {
    title: 'Making Decisions with if',
    subtitle:
      'The if statement lets your program run a block of code only when a condition is true. The condition must be a Boolean -- often built from the comparison and logical operators you already know from World 2.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'The if statement',
    language: 'Kotlin',
    codeSnippet: ['val age = 20', 'if (age >= 18) {', '    println("You can vote")', '}'],
    explanation:
      'if (age >= 18) evaluates the condition age >= 18 first. Since age is 20, the condition is true, so the block inside the curly braces runs and prints "You can vote". If age had been below 18, the condition would be false and the block would simply be skipped -- the program would move on without printing anything.',
    keyIdeas: [
      { number: 1, title: 'if needs a Boolean condition', description: 'The value inside the parentheses must evaluate to true or false -- often a comparison like age >= 18 or a Boolean variable on its own.' },
      { number: 2, title: 'True runs the block', description: 'When the condition evaluates to true, every statement inside the curly braces executes, in order.' },
      { number: 3, title: 'False skips the block', description: 'When the condition evaluates to false, the block is skipped entirely -- the program simply continues with whatever comes after it.' },
      { number: 4, title: 'Braces are optional for one statement', description: 'If the body is a single statement, you can drop the { } -- but using braces is still the clearer habit to build, even for one line.' }
    ],
    keyTakeaway: 'if (condition) { ... } runs its block only when condition is true, and skips it entirely when condition is false -- nothing more, nothing less.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See if run a block when its condition is true, get skipped when the condition is false, and combine with the operators from World 2.',
    cards: [
      {
        id: 'card-if-1',
        number: '01',
        title: 'A condition that is true',
        language: 'Kotlin',
        subtitle: 'The block runs because the condition evaluates to true.',
        code: ['val temperature = 35', 'if (temperature > 30) {', '    println("It\'s hot today")', '}'],
        whatItMeans: [
          { label: 'temperature > 30', description: '35 > 30 evaluates to true' },
          { label: 'Result', description: 'Because the condition is true, the block runs and prints "It\'s hot today"' }
        ],
        whatChanged: 'Introduced the basic if statement: a true condition runs its block.'
      },
      {
        id: 'card-if-2',
        number: '02',
        title: 'A condition that is false',
        language: 'Kotlin',
        subtitle: 'The block is skipped entirely -- execution just continues.',
        code: ['val temperature = 20', 'if (temperature > 30) {', '    println("It\'s hot today")', '}', 'println("Done checking")'],
        whatItMeans: [
          { label: 'temperature > 30', description: '20 > 30 evaluates to false' },
          { label: 'Result', description: 'The if block is skipped completely -- only "Done checking" prints' }
        ],
        whatChanged: 'Showed that a false condition skips the block without printing anything from it.'
      },
      {
        id: 'card-if-3',
        number: '03',
        title: 'A Boolean variable as the condition',
        language: 'Kotlin',
        subtitle: 'The condition does not have to be a comparison -- a Boolean on its own works too.',
        code: ['val isLoggedIn = true', 'if (isLoggedIn) {', '    println("Welcome back")', '}'],
        whatItMeans: [
          { label: 'isLoggedIn', description: 'Already holds a Boolean value, so it can be used directly as the condition' },
          { label: 'Result', description: 'Since isLoggedIn is true, the block runs and prints "Welcome back"' }
        ],
        whatChanged: 'Used a plain Boolean variable as the condition instead of writing a comparison.'
      },
      {
        id: 'card-if-4',
        number: '04',
        title: 'Combining comparison and logical operators',
        language: 'Kotlin',
        subtitle: 'Build a richer condition using && from World 2.',
        code: ['val score = 85', 'val hasSubmitted = true', 'if (score >= 60 && hasSubmitted) {', '    println("You passed")', '}'],
        whatItMeans: [
          { label: 'score >= 60', description: '85 >= 60 evaluates to true' },
          { label: 'score >= 60 && hasSubmitted', description: 'true && true evaluates to true' },
          { label: 'Result', description: 'The combined condition is true, so the block runs and prints "You passed"' }
        ],
        whatChanged: 'Built the if condition from a comparison operator and a logical operator together.'
      },
      {
        id: 'card-if-5',
        number: '05',
        title: 'Omitting braces for a single statement',
        language: 'Kotlin',
        subtitle: 'Kotlin allows a brace-free body when it is exactly one statement.',
        code: ['val stock = 0', 'if (stock == 0) println("Out of stock")'],
        whatItMeans: [
          { label: 'stock == 0', description: '0 == 0 evaluates to true' },
          { label: 'No braces', description: 'With only one statement in the body, the { } can be left out entirely' }
        ],
        whatChanged: 'Showed that braces are optional for a single-statement body, even though this lesson\'s other examples always include them for clarity.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the condition, decide if it is true or false, then predict exactly what gets printed.',
    questions: [
      {
        id: 'pred-if-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'A True Condition',
        topicMeta: 'Basic if',
        language: 'Kotlin',
        code: ['fun main() {', '    val age = 20', '    if (age >= 18) {', '        println("Adult")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Adult', isCorrect: true },
          { id: 'B', label: 'Nothing', isCorrect: false },
          { id: 'C', label: 'age >= 18', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'age >= 18', detail: '20 >= 18 evaluates to true, so the block runs and prints "Adult".' }
      },
      {
        id: 'pred-if-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'A False Condition',
        topicMeta: 'Skipping the block',
        language: 'Kotlin',
        code: ['fun main() {', '    val age = 15', '    if (age >= 18) {', '        println("Adult")', '    }', '    println("Checked")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Checked', isCorrect: true },
          { id: 'B', label: 'Adult\nChecked', isCorrect: false },
          { id: 'C', label: 'Adult', isCorrect: false },
          { id: 'D', label: 'Nothing is printed', isCorrect: false }
        ],
        explanation: { codeRef: 'if (age >= 18)', detail: '15 >= 18 is false, so the if block is skipped entirely. Execution continues to the next line, which prints "Checked".' }
      },
      {
        id: 'pred-if-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Comparison, NOT, and AND together',
        topicMeta: 'Combined condition',
        language: 'Kotlin',
        code: ['fun main() {', '    val temperature = 40', '    val hasUmbrella = false', '    if (temperature > 35 && !hasUmbrella) {', '        println("Stay hydrated")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Stay hydrated', isCorrect: true },
          { id: 'B', label: 'Nothing', isCorrect: false },
          { id: 'C', label: 'true', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'temperature > 35 && !hasUmbrella', detail: '40 > 35 is true. !hasUmbrella is !false, which is true. true && true evaluates to true, so the block runs and prints "Stay hydrated".' }
      },
      {
        id: 'pred-if-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'An OR Condition',
        topicMeta: 'Combined condition',
        language: 'Kotlin',
        code: ['fun main() {', '    val isWeekend = false', '    val isHoliday = true', '    if (isWeekend || isHoliday) {', '        println("No work today")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'No work today', isCorrect: true },
          { id: 'B', label: 'Nothing', isCorrect: false },
          { id: 'C', label: 'false', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'isWeekend || isHoliday', detail: 'false || true evaluates to true, since || only needs one side to be true. The block runs and prints "No work today".' }
      },
      {
        id: 'pred-if-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'A False Boolean Variable',
        topicMeta: 'Skipping the block',
        language: 'Kotlin',
        code: ['fun main() {', '    val hasTicket = false', '    if (hasTicket) {', '        println("Entry granted")', '    }', '    println("Checking complete")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Checking complete', isCorrect: true },
          { id: 'B', label: 'Entry granted\nChecking complete', isCorrect: false },
          { id: 'C', label: 'Entry granted', isCorrect: false },
          { id: 'D', label: 'Nothing is printed', isCorrect: false }
        ],
        explanation: { codeRef: 'if (hasTicket)', detail: 'hasTicket is false, so the if block never runs. Only the final println, "Checking complete", executes.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Check Storage Warning',
    description:
      'Declare val usedPercent = 92.\n\n' +
      '1. Check if usedPercent is greater than or equal to 90 using an if statement.\n\n' +
      '2. Inside the if block, print:\n' +
      '"Warning: storage almost full"',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'StorageWarning.kt',
    initialCode: `fun main() {
    val usedPercent = 92
    // 1. Check if usedPercent is greater than or equal to 90 using an if statement:

    // 2. Print "Warning: storage almost full"
}`,
    solutionCode: `fun main() {
    val usedPercent = 92
    if (usedPercent >= 90) {
        println("Warning: storage almost full")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Warning: storage almost full',
    testCase: { call: '', expected: 'Warning: storage almost full' }
  },
  debug: {
    title: 'Fix the Free Shipping Check',
    subtitle: 'Orders of exactly the threshold amount should still qualify for free shipping, but the current condition rejects them.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Comparison Operator',
    brokenCode: `fun main() {
    val cartTotal = 50
    // BUG: orders of exactly 50 should also qualify for free shipping!
    if (cartTotal > 50) {
        println("Free shipping applied")
    }
    println("Checkout complete")
}`,
    fixedCode: `fun main() {
    val cartTotal = 50
    if (cartTotal >= 50) {
        println("Free shipping applied")
    }
    println("Checkout complete")
}`,
    expectedOutput: 'Free shipping applied\nCheckout complete',
    hints: [
      'Something is wrong with the condition that decides whether shipping is free.',
      'What should happen when cartTotal is exactly 50, not just above it?',
      'Check the comparison operator -- > excludes the equal case, but the rule should include it.'
    ],
    explanation:
      'cartTotal > 50 only evaluates to true when the cart total is strictly greater than 50, so a cart of exactly 50 is wrongly denied free shipping and only "Checkout complete" prints. Changing > to >= includes the equal case, so 50 >= 50 correctly evaluates to true and both "Free shipping applied" and "Checkout complete" print.'
  },
  mastered: {
    topicTitle: 'if',
    summary: 'You have mastered the if statement: writing a Boolean condition, running a block only when it is true, skipping it when it is false, combining it with comparison and logical operators, and diagnosing a real wrong-operator logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'if runs its block only when its Boolean condition is true' },
      { title: 'Examples explored', subtitle: '5 progressive if patterns, from a true condition to brace-free syntax' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved wrong-comparison-operator logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 2: if-else (world-3-if-else)
// =========================================================================
export const IF_ELSE_LESSON: FiveStageLesson = {
  id: 'world-3-if-else',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'if / else',
  learn: {
    title: 'if / else — Two-Way Decisions',
    subtitle:
      "A bare if only reacts when its condition is true. Adding an else gives your program a second path to take when it's false -- and in Kotlin, if/else can also be used as an EXPRESSION that evaluates to a value, replacing the ternary operator other languages use.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'if/else as a statement, and as an expression',
    language: 'Kotlin',
    codeSnippet: [
      'val age = 20',
      '',
      'if (age >= 18) {',
      '    println("You can vote")',
      '} else {',
      '    println("Not old enough yet")',
      '}',
      '',
      'val status = if (age >= 18) "adult" else "minor"',
      'println(status)'
    ],
    explanation:
      'The first if/else is a STATEMENT: it runs one block of code or the other, and prints nothing by itself -- you still have to call println() inside each branch. The second if/else is an EXPRESSION: written on a single line with no braces, it evaluates directly to a value ("adult" or "minor") that gets stored in status. This is Kotlin\'s replacement for the ternary operator (cond ? a : b) found in other languages.',
    keyIdeas: [
      { number: 1, title: 'if/else as a statement', description: 'Runs one block or the other based on the condition. Each branch can contain as many lines as you need, including its own println() calls.' },
      { number: 2, title: 'if/else as an expression', description: 'Written as val x = if (cond) a else b, the whole if/else evaluates to a and b\'s value directly -- no println() needed inside it.' },
      { number: 3, title: 'Expression form stays single-line, brace-free', description: 'val x = if (cond) { a } else { b } is not the safe pattern to rely on -- keep both branches as a single value with no braces, on one line.' },
      { number: 4, title: 'Expression form always needs an else', description: 'A statement if can omit else and just do nothing when false. An if used as an expression MUST have an else -- there must always be a value to produce.' }
    ],
    keyTakeaway: 'Use if/else as a statement to run different code in each branch. Use if/else as an expression -- single-line, brace-free, always with an else -- when you just need to pick between two values.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a basic if/else statement to using if/else as an expression.',
    cards: [
      {
        id: 'card-ifelse-1',
        number: '01',
        title: 'Basic if/else statement',
        language: 'Kotlin',
        subtitle: 'The true branch runs when the condition holds.',
        code: ['val temperature = 15', 'if (temperature < 20) {', '    println("Wear a jacket")', '} else {', '    println("No jacket needed")', '}'],
        whatItMeans: [
          { label: 'temperature < 20', description: '15 is less than 20, so the condition is true' },
          { label: 'Result', description: 'The if branch runs, printing "Wear a jacket" -- the else branch is skipped entirely' }
        ],
        whatChanged: 'Introduced the two-branch if/else statement, where exactly one block always runs.'
      },
      {
        id: 'card-ifelse-2',
        number: '02',
        title: 'The else branch running instead',
        language: 'Kotlin',
        subtitle: 'When the condition is false, the else block runs instead.',
        code: ['val score = 85', 'if (score >= 90) {', '    println("Grade: A")', '} else {', '    println("Grade: B or lower")', '}'],
        whatItMeans: [
          { label: 'score >= 90', description: '85 is not greater than or equal to 90, so the condition is false' },
          { label: 'Result', description: 'The else branch runs instead, printing "Grade: B or lower"' }
        ],
        whatChanged: 'Showed that when the condition is false, control passes to the else block, never both.'
      },
      {
        id: 'card-ifelse-3',
        number: '03',
        title: 'if/else as an expression',
        language: 'Kotlin',
        subtitle: "Kotlin's replacement for the ternary operator.",
        code: ['val a = 7', 'val b = 12', 'val larger = if (a > b) a else b', 'println(larger)'],
        whatItMeans: [
          { label: 'if (a > b) a else b', description: 'a > b is false (7 is not greater than 12), so the whole expression evaluates to b' },
          { label: 'larger', description: 'Holds the value 12 directly -- no println() was needed inside the if/else itself' }
        ],
        whatChanged: 'Used if/else as an expression that evaluates directly to a value, instead of as a statement that runs println().'
      },
      {
        id: 'card-ifelse-4',
        number: '04',
        title: 'Expression result used in a string template',
        language: 'Kotlin',
        subtitle: "An if/else expression's value can be used just like any other value.",
        code: ['val hour = 14', 'val greeting = if (hour < 12) "Good morning" else "Good afternoon"', 'println("Message: $greeting")'],
        whatItMeans: [
          { label: 'hour < 12', description: '14 is not less than 12, so the condition is false' },
          { label: 'greeting', description: 'Evaluates to "Good afternoon", which is then interpolated into the template string' }
        ],
        whatChanged: 'Showed that an if/else expression\'s result is a normal value -- usable in a string template like anything else.'
      },
      {
        id: 'card-ifelse-5',
        number: '05',
        title: 'Choosing between two strings',
        language: 'Kotlin',
        subtitle: 'if/else expressions work for any type, not just numbers.',
        code: ['val stock = 0', 'val status = if (stock > 0) "In stock" else "Out of stock"', 'println(status)'],
        whatItMeans: [
          { label: 'stock > 0', description: '0 is not greater than 0, so the condition is false' },
          { label: 'status', description: 'Evaluates to "Out of stock", the else branch\'s value' }
        ],
        whatChanged: 'Confirmed if/else expressions work for String results just as well as for numbers.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-ifelse-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Statement Form: True Branch',
        topicMeta: 'if/else as a statement',
        language: 'Kotlin',
        code: ['fun main() {', '    val balance = 120', '    if (balance >= 100) {', '        println("Premium member")', '    } else {', '        println("Standard member")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Premium member', isCorrect: true },
          { id: 'B', label: 'Standard member', isCorrect: false },
          { id: 'C', label: 'Premium member\nStandard member', isCorrect: false },
          { id: 'D', label: '(nothing is printed)', isCorrect: false }
        ],
        explanation: { codeRef: 'balance >= 100', detail: '120 >= 100 is true, so only the if branch runs, printing "Premium member". The else branch never executes.' }
      },
      {
        id: 'pred-ifelse-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Statement Form: Else Branch',
        topicMeta: 'if/else as a statement',
        language: 'Kotlin',
        code: ['fun main() {', '    val attempts = 5', '    if (attempts < 3) {', '        println("Try again")', '    } else {', '        println("Locked out")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Try again', isCorrect: false },
          { id: 'B', label: 'Locked out', isCorrect: true },
          { id: 'C', label: 'Try again\nLocked out', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'attempts < 3', detail: '5 < 3 is false, so control passes to the else branch, printing "Locked out".' }
      },
      {
        id: 'pred-ifelse-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Expression Form: Picking a Number',
        topicMeta: 'if/else as an expression',
        language: 'Kotlin',
        code: ['fun main() {', '    val x = 4', '    val y = 9', '    val bigger = if (x > y) x else y', '    println(bigger)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '4', isCorrect: false },
          { id: 'B', label: '9', isCorrect: true },
          { id: 'C', label: '13', isCorrect: false },
          { id: 'D', label: 'x', isCorrect: false }
        ],
        explanation: { codeRef: 'if (x > y) x else y', detail: 'x > y is false (4 is not greater than 9), so the expression evaluates to y, which is 9.' }
      },
      {
        id: 'pred-ifelse-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Expression Form: Picking a String',
        topicMeta: 'if/else as an expression',
        language: 'Kotlin',
        code: ['fun main() {', '    val code = 404', '    val result = if (code == 200) "OK" else "Error"', '    println("Status: $result")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Status: OK', isCorrect: false },
          { id: 'B', label: 'Status: Error', isCorrect: true },
          { id: 'C', label: 'Status: 404', isCorrect: false },
          { id: 'D', label: 'Error', isCorrect: false }
        ],
        explanation: { codeRef: 'if (code == 200) "OK" else "Error"', detail: 'code == 200 is false (404 is not 200), so result becomes "Error", which is interpolated into "Status: $result".' }
      },
      {
        id: 'pred-ifelse-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Statement and Expression Together',
        topicMeta: 'Combining both forms',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val isMember = true',
          '    val price = 50',
          '',
          '    if (isMember) {',
          '        println("Discount applied")',
          '    } else {',
          '        println("Full price")',
          '    }',
          '',
          '    val finalPrice = if (isMember) price - 10 else price',
          '    println(finalPrice)',
          '}'
        ],
        prompt: 'What does this program print, in order?',
        options: [
          { id: 'A', label: 'Discount applied\n40', isCorrect: true },
          { id: 'B', label: 'Full price\n50', isCorrect: false },
          { id: 'C', label: 'Discount applied\n50', isCorrect: false },
          { id: 'D', label: 'Full price\n40', isCorrect: false }
        ],
        explanation: { codeRef: 'if (isMember) price - 10 else price', detail: 'isMember is true, so the if/else statement prints "Discount applied". Then the if/else expression evaluates to price - 10 = 40, which finalPrice holds and prints.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Ticket Price Calculator',
    description:
      'Declare val age = 10 and val isHoliday = true.\n\n' +
      '1. Use an if/else statement: print "Child ticket" if age is less than 12, otherwise print "Adult ticket".\n\n' +
      '2. Use if/else as an expression to set val price to 15 if isHoliday is true, otherwise 10.\n\n' +
      '3. Print the result as:\n' +
      '"Price: 15" using a string template',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'TicketPrice.kt',
    initialCode: `fun main() {
    val age = 10
    val isHoliday = true

    // 1. Use if/else: print "Child ticket" if age is less than 12, otherwise print "Adult ticket":

    // 2. Use if/else as an expression: val price = 15 if isHoliday is true, otherwise 10:

    // 3. Print the price as "Price: 15" using a string template:
}`,
    solutionCode: `fun main() {
    val age = 10
    val isHoliday = true

    if (age < 12) {
        println("Child ticket")
    } else {
        println("Adult ticket")
    }

    val price = if (isHoliday) 15 else 10
    println("Price: $price")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Child ticket\nPrice: 15',
    testCase: { call: '', expected: 'Child ticket\nPrice: 15' }
  },
  debug: {
    title: 'Diagnose the Senior Discount Bug',
    subtitle: 'The discount is not being applied when it should be -- identify why, and fix the condition.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Inverted Comparison',
    brokenCode: `fun main() {
    val age = 65
    // BUG: this condition is inverted -- it should grant the discount at 65 or older!
    if (age < 65) {
        println("Senior discount applied")
    } else {
        println("No discount")
    }
}`,
    fixedCode: `fun main() {
    val age = 65
    if (age >= 65) {
        println("Senior discount applied")
    } else {
        println("No discount")
    }
}`,
    expectedOutput: 'Senior discount applied',
    hints: [
      'Something is wrong with the condition being checked, not with the branches themselves.',
      'Think about what age value should trigger the senior discount -- should it happen only below 65, or at 65 and above?',
      'Check the comparison operator: age < 65 only lets ages under 65 through. Try age >= 65 instead.'
    ],
    explanation:
      'age < 65 is false when age is exactly 65, so the else branch runs and prints "No discount" -- exactly backwards from what a senior discount should do. Changing the comparison to age >= 65 makes the condition true at 65, correctly printing "Senior discount applied".'
  },
  mastered: {
    topicTitle: 'if / else',
    summary: 'You have mastered two-way branching with if/else -- both as a statement that runs different code per branch, and as an expression that evaluates directly to a value -- and diagnosed a real inverted-condition logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'if/else as a statement vs. if/else as an expression' },
      { title: 'Examples explored', subtitle: '5 progressive if/else patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved inverted-condition logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 3: else-if (world-3-else-if)
// =========================================================================
export const ELSE_IF_LESSON: FiveStageLesson = {
  id: 'world-3-else-if',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'else-if',
  learn: {
    title: 'Chaining Multiple Conditions with else if',
    subtitle:
      "When you have more than two possibilities to test, you can chain else if between if and else to check them one after another. Kotlin checks each condition in order and runs the body of the FIRST one that is true -- every condition after that is skipped, even if it would also have been true.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Grading a score with else if',
    language: 'Kotlin',
    codeSnippet: [
      'val score = 75',
      '',
      'if (score >= 90) {',
      '    println("Grade: A")',
      '} else if (score >= 80) {',
      '    println("Grade: B")',
      '} else if (score >= 70) {',
      '    println("Grade: C")',
      '} else {',
      '    println("Grade: F")',
      '}'
    ],
    explanation:
      'Kotlin checks score >= 90 first -- false. Then score >= 80 -- also false. Then score >= 70 -- true, so "Grade: C" prints and the chain stops right there. The final else never even gets checked, because a match was already found.',
    keyIdeas: [
      { number: 1, title: 'Conditions are checked in order, top to bottom', description: 'Kotlin tests each if / else if condition one at a time, in the exact order they are written.' },
      { number: 2, title: 'Only the FIRST matching branch runs', description: 'The instant a condition is true, its body runs and the entire chain stops -- later conditions are never even evaluated, even if they would also have been true.' },
      { number: 3, title: 'Order matters', description: 'Placing a broader condition before a more specific one can accidentally "steal" cases that were meant for a later branch.' },
      { number: 4, title: 'The final else is optional', description: 'else acts as a catch-all for anything that matched none of the conditions above it. Without one, it is possible for NO branch to run at all.' }
    ],
    keyTakeaway: 'else if lets you test a sequence of possibilities in order -- but only the first one that matches ever runs, so put the most specific conditions first.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a simple three-way decision to why branch order matters.',
    cards: [
      {
        id: 'card-elseif-1',
        number: '01',
        title: 'A three-way decision',
        language: 'Kotlin',
        subtitle: 'Chain else if to test more than two possibilities.',
        code: ['val age = 15', '', 'if (age < 13) {', '    println("Child ticket")', '} else if (age < 18) {', '    println("Teen ticket")', '} else {', '    println("Adult ticket")', '}'],
        whatItMeans: [
          { label: 'age < 13', description: 'checked first -- false, since age is 15' },
          { label: 'age < 18', description: 'checked next -- true, since 15 is less than 18' },
          { label: 'Result', description: 'prints "Teen ticket" and skips the final else entirely' }
        ],
        whatChanged: 'Extended a simple if-else into a three-way decision using else if.'
      },
      {
        id: 'card-elseif-2',
        number: '02',
        title: 'Only the first match runs',
        language: 'Kotlin',
        subtitle: 'A later condition is never even checked once an earlier one matches.',
        code: ['val temp = 35', '', 'if (temp > 30) {', '    println("Hot")', '} else if (temp > 20) {', '    println("Warm")', '}'],
        whatItMeans: [
          { label: 'temp > 30', description: 'true, since temp is 35 -- prints "Hot" immediately' },
          { label: 'temp > 20', description: 'also true on paper, but never evaluated -- the chain already stopped' }
        ],
        whatChanged: 'Showed that a condition further down the chain can be true and STILL never run.'
      },
      {
        id: 'card-elseif-3',
        number: '03',
        title: 'No branch may run at all',
        language: 'Kotlin',
        subtitle: 'Without a final else, it is possible for nothing to match.',
        code: ['val hour = 23', '', 'if (hour < 6) {', '    println("Night")', '} else if (hour < 12) {', '    println("Morning")', '} else if (hour < 18) {', '    println("Afternoon")', '}'],
        whatItMeans: [
          { label: 'hour < 6, < 12, < 18', description: 'all false when hour is 23 -- none of the three conditions match' },
          { label: 'No else', description: 'there is no catch-all branch, so this program prints nothing' }
        ],
        whatChanged: 'Demonstrated that an else if chain with no final else can leave every condition unmatched.'
      },
      {
        id: 'card-elseif-4',
        number: '04',
        title: 'Grading with multiple branches',
        language: 'Kotlin',
        subtitle: 'A longer chain testing several score bands in order.',
        code: ['val score = 82', '', 'if (score >= 90) {', '    println("Grade: A")', '} else if (score >= 80) {', '    println("Grade: B")', '} else if (score >= 70) {', '    println("Grade: C")', '} else {', '    println("Grade: F")', '}'],
        whatItMeans: [
          { label: 'score >= 90', description: 'false, since score is 82' },
          { label: 'score >= 80', description: 'true -- prints "Grade: B" and stops the chain' }
        ],
        whatChanged: 'Scaled the pattern up to four bands, still only ever running one branch.'
      },
      {
        id: 'card-elseif-5',
        number: '05',
        title: 'Chaining boolean conditions',
        language: 'Kotlin',
        subtitle: 'else if works with any Boolean expression, not just numeric ranges.',
        code: ['val isAdmin = false', 'val isMember = true', '', 'if (isAdmin) {', '    println("Full access")', '} else if (isMember) {', '    println("Member access")', '} else {', '    println("Guest access")', '}'],
        whatItMeans: [
          { label: 'isAdmin', description: 'false, so the first branch is skipped' },
          { label: 'isMember', description: 'true -- prints "Member access" and stops the chain' }
        ],
        whatChanged: 'Applied else if to plain Boolean flags instead of comparisons.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer -- pay close attention to the ORDER of the conditions.',
    questions: [
      {
        id: 'pred-elseif-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Basic else if Selection',
        topicMeta: 'Choosing the matching branch',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 65', '    if (score >= 90) {', '        println("A")', '    } else if (score >= 70) {', '        println("B")', '    } else {', '        println("C")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'A', isCorrect: false },
          { id: 'B', label: 'B', isCorrect: false },
          { id: 'C', label: 'C', isCorrect: true },
          { id: 'D', label: 'A\nB\nC', isCorrect: false }
        ],
        explanation: { codeRef: 'else { println("C") }', detail: 'score is 65, so score >= 90 is false and score >= 70 is also false. Neither branch matches, so the final else runs and prints "C".' }
      },
      {
        id: 'pred-elseif-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'Only the First Match Runs',
        topicMeta: 'Branch-order behavior',
        language: 'Kotlin',
        code: ['fun main() {', '    val n = 50', '    if (n > 10) {', '        println("Big")', '    } else if (n > 40) {', '        println("Bigger")', '    } else {', '        println("Small")', '    }', '}'],
        prompt: 'n satisfies both n > 10 and n > 40. What does this code actually print?',
        options: [
          { id: 'A', label: 'Big', isCorrect: true },
          { id: 'B', label: 'Bigger', isCorrect: false },
          { id: 'C', label: 'Big\nBigger', isCorrect: false },
          { id: 'D', label: 'Small', isCorrect: false }
        ],
        explanation: { codeRef: 'if (n > 10) { println("Big") }', detail: 'n > 10 is checked first and is true, so "Big" prints and the chain stops immediately. n > 40 is also true on paper, but it is never even evaluated -- only the first matching branch ever runs.' }
      },
      {
        id: 'pred-elseif-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'No Match, No Else',
        topicMeta: 'When nothing matches',
        language: 'Kotlin',
        code: ['fun main() {', '    val code = 5', '    if (code == 1) {', '        println("One")', '    } else if (code == 2) {', '        println("Two")', '    }', '    println("Done")', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'Done', isCorrect: true },
          { id: 'B', label: 'One\nDone', isCorrect: false },
          { id: 'C', label: 'Two\nDone', isCorrect: false },
          { id: 'D', label: 'Nothing prints at all', isCorrect: false }
        ],
        explanation: { codeRef: 'if (code == 1) { ... } else if (code == 2) { ... }', detail: 'code is 5, so neither code == 1 nor code == 2 matches, and there is no final else -- so the whole chain produces no output. Execution simply continues to the next line, which prints "Done".' }
      },
      {
        id: 'pred-elseif-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'Chaining Boolean Conditions',
        topicMeta: 'else if with flags',
        language: 'Kotlin',
        code: ['fun main() {', '    val hasTicket = false', '    val isVIP = false', '    if (isVIP) {', '        println("VIP entrance")', '    } else if (hasTicket) {', '        println("Standard entrance")', '    } else {', '        println("No entry")', '    }', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'VIP entrance', isCorrect: false },
          { id: 'B', label: 'Standard entrance', isCorrect: false },
          { id: 'C', label: 'No entry', isCorrect: true },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: { codeRef: 'else { println("No entry") }', detail: 'Both isVIP and hasTicket are false, so neither of the first two branches matches, and the final else runs, printing "No entry".' }
      },
      {
        id: 'pred-elseif-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Boundary Value with >=',
        topicMeta: 'Inclusive comparisons',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 90', '    if (score >= 90) {', '        println("A")', '    } else if (score >= 80) {', '        println("B")', '    } else {', '        println("C")', '    }', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'A', isCorrect: true },
          { id: 'B', label: 'B', isCorrect: false },
          { id: 'C', label: 'C', isCorrect: false },
          { id: 'D', label: 'A\nB', isCorrect: false }
        ],
        explanation: { codeRef: 'score >= 90', detail: 'score is exactly 90, and >= includes the equal case, so score >= 90 is true. "A" prints and the chain stops before score >= 80 is ever checked.' }
      },
      {
        id: 'pred-elseif-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'A Broader Condition Placed First',
        topicMeta: 'Why order matters',
        language: 'Kotlin',
        code: ['fun main() {', '    val temp = 15', '    if (temp > 0) {', '        println("Above freezing")', '    } else if (temp > 10) {', '        println("Warm")', '    }', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'Above freezing', isCorrect: true },
          { id: 'B', label: 'Warm', isCorrect: false },
          { id: 'C', label: 'Above freezing\nWarm', isCorrect: false },
          { id: 'D', label: 'Nothing prints', isCorrect: false }
        ],
        explanation: { codeRef: 'if (temp > 0) { println("Above freezing") }', detail: 'temp > 0 is broader than temp > 10, and it was placed first, so it catches temp = 15 immediately and prints "Above freezing". The temp > 10 branch is unreachable for any value that already satisfies temp > 0 -- this is exactly why branch order matters.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Grade the Score',
    description:
      'Declare val score = 82.\n\n' +
      '1. Use an if / else if / else chain to evaluate the score:\n\n' +
      '2. If score >= 90, print "Grade: A".\n\n' +
      '3. Else if score >= 80, print "Grade: B".\n\n' +
      '4. Else if score >= 70, print "Grade: C".\n\n' +
      '5. Otherwise, print "Grade: F".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'GradeScore.kt',
    initialCode: `fun main() {
    val score = 82
    // 1. Use if / else if / else to print "Grade: A" (score >= 90),
    //    "Grade: B" (score >= 80), "Grade: C" (score >= 70), or "Grade: F" otherwise:
}`,
    solutionCode: `fun main() {
    val score = 82
    if (score >= 90) {
        println("Grade: A")
    } else if (score >= 80) {
        println("Grade: B")
    } else if (score >= 70) {
        println("Grade: C")
    } else {
        println("Grade: F")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Grade: B',
    testCase: { call: '', expected: 'Grade: B' }
  },
  debug: {
    title: 'Diagnose the Misordered Branches',
    subtitle: 'A top student is getting the wrong grade -- identify why, and fix the order of the conditions.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Branches in the Wrong Order',
    brokenCode: `fun main() {
    val score = 95
    // BUG: the >= 70 check comes before >= 90, so top students never reach "Grade: A"!
    if (score >= 70) {
        println("Grade: C")
    } else if (score >= 90) {
        println("Grade: A")
    } else {
        println("Grade: F")
    }
}`,
    fixedCode: `fun main() {
    val score = 95
    if (score >= 90) {
        println("Grade: A")
    } else if (score >= 70) {
        println("Grade: C")
    } else {
        println("Grade: F")
    }
}`,
    expectedOutput: 'Grade: A',
    hints: [
      'Something is wrong with the order the conditions are checked in, not with the conditions themselves.',
      'A score of 95 also satisfies score >= 70 -- could that broader condition be matching first, before the chain ever reaches the one meant for it?',
      'Reorder the branches so the more specific condition (score >= 90) is checked before the broader one (score >= 70).'
    ],
    explanation:
      'Because score >= 70 was checked first, a score of 95 (which also satisfies score >= 70) matched that branch immediately and printed "Grade: C" -- the else if chain stops at the first match, so the score >= 90 branch further down was never even evaluated. Reordering the conditions from most specific to least specific (>= 90 before >= 70) lets top scores reach the correct branch first.'
  },
  mastered: {
    topicTitle: 'else-if',
    summary: 'You have mastered chaining multiple conditions with else if, learned that only the first matching branch ever runs, that order matters, and diagnosed a real branch-ordering logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'Chaining else if to test a sequence of possibilities' },
      { title: 'Examples explored', subtitle: '5 progressive else-if patterns' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including branch-order edge cases' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a misordered-branches logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 4: when (world-3-when)
// =========================================================================
export const WHEN_LESSON: FiveStageLesson = {
  id: 'world-3-when',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'when',
  learn: {
    title: 'Replacing Long else-if Chains with when',
    subtitle:
      "A long chain of else if checks against the same variable gets hard to read fast. Kotlin's when statement checks one subject against several possible values and runs the code next to whichever one matches -- with a required else as the catch-all for anything that doesn't.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A when statement with a subject',
    language: 'Kotlin',
    codeSnippet: ['val day = 3', 'when (day) {', '    1, 2, 3, 4, 5 -> println("Weekday")', '    6, 7 -> println("Weekend")', '    else -> println("Invalid day")', '}', '// Prints: Weekday'],
    explanation:
      "when (day) declares day as the subject being checked. Each branch lists one or more values separated by commas -- if day equals ANY of them, that branch's code runs. day is 3, which appears in the first branch's list (1, 2, 3, 4, 5), so \"Weekday\" prints and no other branch is checked. The else branch only runs when none of the value branches match.",
    keyIdeas: [
      { number: 1, title: 'when always needs a subject', description: 'when (day) { ... } checks the value in parentheses against each branch -- Kotlin requires that subject.' },
      { number: 2, title: 'Commas mean OR', description: '1, 2, 3, 4, 5 -> println("Weekday") matches if day equals 1 OR 2 OR 3 OR 4 OR 5 -- any one of them triggers that branch.' },
      { number: 3, title: 'else is the catch-all', description: "else -> ... runs only when the subject didn't match any earlier branch. Since listing every possible value is rarely practical, always include else." },
      { number: 4, title: 'Cleaner than else-if', description: 'when (day) { 1,2,3,4,5 -> ...; 6,7 -> ...; else -> ... } reads far clearer than the equivalent chain of if / else if / else if / else checking day == 1, day == 2, and so on.' }
    ],
    keyTakeaway: 'when (subject) checks one value against several branches of comma-separated possibilities, runs the first one that matches, and falls back to else when nothing does -- always include else.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a single-value branch to comma-separated values, else, and String subjects.',
    cards: [
      {
        id: 'card-when-1',
        number: '01',
        title: 'A basic when with single-value branches',
        language: 'Kotlin',
        subtitle: 'Each branch matches exactly one value.',
        code: ['val rating = 2', 'when (rating) {', '    1 -> println("Poor")', '    2 -> println("Average")', '    3 -> println("Good")', '}'],
        whatItMeans: [
          { label: 'when (rating)', description: 'rating is the subject -- every branch compares against it' },
          { label: '2 -> println("Average")', description: 'rating equals 2, so this branch runs and nothing else is checked' }
        ],
        whatChanged: 'Introduced when as a subject-based alternative to a chain of if / else if checks.'
      },
      {
        id: 'card-when-2',
        number: '02',
        title: 'Comma-separated values in one branch',
        language: 'Kotlin',
        subtitle: 'A single branch can match several different values.',
        code: ['val day = 6', 'when (day) {', '    1, 2, 3, 4, 5 -> println("Weekday")', '    6, 7 -> println("Weekend")', '}'],
        whatItMeans: [
          { label: '1, 2, 3, 4, 5 -> ...', description: 'Matches if day equals any one of those five values' },
          { label: '6, 7 -> ...', description: 'day is 6, which is in this list, so "Weekend" prints' }
        ],
        whatChanged: 'Showed that comma-separated values in a branch act like an OR across all of them.'
      },
      {
        id: 'card-when-3',
        number: '03',
        title: 'else as the catch-all',
        language: 'Kotlin',
        subtitle: 'Handling values that no branch explicitly lists.',
        code: ['val day = 9', 'when (day) {', '    1, 2, 3, 4, 5 -> println("Weekday")', '    6, 7 -> println("Weekend")', '    else -> println("Invalid day")', '}'],
        whatItMeans: [
          { label: 'day = 9', description: '9 does not appear in either the weekday or weekend list' },
          { label: 'else -> ...', description: 'Since nothing else matched, this branch runs and prints "Invalid day"' }
        ],
        whatChanged: 'Added else so the when statement can safely handle a value that falls outside every listed branch.'
      },
      {
        id: 'card-when-4',
        number: '04',
        title: 'when with a String subject',
        language: 'Kotlin',
        subtitle: 'The subject does not have to be a number.',
        code: ['val command = "start"', 'when (command) {', '    "start" -> println("Starting...")', '    "stop" -> println("Stopping...")', '    else -> println("Unknown command")', '}'],
        whatItMeans: [
          { label: 'when (command)', description: 'command is a String, so each branch compares against a String literal' },
          { label: '"start" -> ...', description: 'command equals "start", so this branch runs and prints "Starting..."' }
        ],
        whatChanged: 'Confirmed when works the same way on String subjects, not just numbers.'
      },
      {
        id: 'card-when-5',
        number: '05',
        title: 'Only an exact match counts',
        language: 'Kotlin',
        subtitle: 'A value not listed in any branch always falls through to else.',
        code: ['val grade = 90', 'when (grade) {', '    100 -> println("Perfect")', '    90, 91, 92 -> println("Excellent")', '    else -> println("Keep trying")', '}'],
        whatItMeans: [
          { label: '100 -> ...', description: 'grade is 90, not 100, so this branch does not match' },
          { label: '90, 91, 92 -> ...', description: 'grade equals 90, which is in this list, so "Excellent" prints' }
        ],
        whatChanged: 'Reinforced that each branch matches by exact equality against the values it lists -- nothing more.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read each when statement, predict the printed output, then check your answer.',
    questions: [
      {
        id: 'pred-when-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Basic Branch Match',
        topicMeta: 'when with comma-separated values',
        language: 'Kotlin',
        code: ['fun main() {', '    val day = 4', '    when (day) {', '        1, 2, 3, 4, 5 -> println("Weekday")', '        6, 7 -> println("Weekend")', '        else -> println("Invalid day")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Weekday', isCorrect: true },
          { id: 'B', label: 'Weekend', isCorrect: false },
          { id: 'C', label: 'Invalid day', isCorrect: false },
          { id: 'D', label: '4', isCorrect: false }
        ],
        explanation: { codeRef: '1, 2, 3, 4, 5 -> println("Weekday")', detail: 'day is 4, which appears in the first branch\'s comma-separated list, so "Weekday" prints.' }
      },
      {
        id: 'pred-when-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'Second Branch Match',
        topicMeta: 'when with comma-separated values',
        language: 'Kotlin',
        code: ['fun main() {', '    val day = 7', '    when (day) {', '        1, 2, 3, 4, 5 -> println("Weekday")', '        6, 7 -> println("Weekend")', '        else -> println("Invalid day")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Weekday', isCorrect: false },
          { id: 'B', label: 'Weekend', isCorrect: true },
          { id: 'C', label: 'Invalid day', isCorrect: false },
          { id: 'D', label: 'Nothing -- runtime error', isCorrect: false }
        ],
        explanation: { codeRef: '6, 7 -> println("Weekend")', detail: 'day is 7, which matches the second branch\'s list (6, 7), so "Weekend" prints.' }
      },
      {
        id: 'pred-when-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'Falling Through to else',
        topicMeta: 'when with a required else',
        language: 'Kotlin',
        code: ['fun main() {', '    val day = 0', '    when (day) {', '        1, 2, 3, 4, 5 -> println("Weekday")', '        6, 7 -> println("Weekend")', '        else -> println("Invalid day")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Invalid day', isCorrect: true },
          { id: 'B', label: 'Weekday', isCorrect: false },
          { id: 'C', label: 'Weekend', isCorrect: false },
          { id: 'D', label: 'Nothing prints', isCorrect: false }
        ],
        explanation: { codeRef: 'else -> println("Invalid day")', detail: 'day is 0, which does not appear in either value list, so neither branch matches and the else branch runs instead.' }
      },
      {
        id: 'pred-when-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'A String Subject',
        topicMeta: 'when on a String',
        language: 'Kotlin',
        code: ['fun main() {', '    val command = "pause"', '    when (command) {', '        "start" -> println("Starting...")', '        "stop" -> println("Stopping...")', '        else -> println("Unknown command")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Unknown command', isCorrect: true },
          { id: 'B', label: 'Starting...', isCorrect: false },
          { id: 'C', label: 'Stopping...', isCorrect: false },
          { id: 'D', label: 'pause', isCorrect: false }
        ],
        explanation: { codeRef: 'else -> println("Unknown command")', detail: 'command is "pause", which matches neither "start" nor "stop", so the else branch runs.' }
      },
      {
        id: 'pred-when-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Matching Within a Comma List',
        topicMeta: 'Exact-value matching',
        language: 'Kotlin',
        code: ['fun main() {', '    val grade = 90', '    when (grade) {', '        100 -> println("Perfect")', '        90, 91, 92 -> println("Excellent")', '        else -> println("Keep trying")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Excellent', isCorrect: true },
          { id: 'B', label: 'Perfect', isCorrect: false },
          { id: 'C', label: 'Keep trying', isCorrect: false },
          { id: 'D', label: '90', isCorrect: false }
        ],
        explanation: { codeRef: '90, 91, 92 -> println("Excellent")', detail: 'grade is 90, which is not 100 but IS in the second branch\'s list (90, 91, 92), so "Excellent" prints.' }
      },
      {
        id: 'pred-when-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'The First Matching Branch Wins',
        topicMeta: 'Branch evaluation order',
        language: 'Kotlin',
        code: ['fun main() {', '    val code = 2', '    when (code) {', '        1, 2 -> println("Low")', '        2, 3 -> println("Medium")', '        else -> println("Unknown")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Low', isCorrect: true },
          { id: 'B', label: 'Medium', isCorrect: false },
          { id: 'C', label: 'Low\nMedium', isCorrect: false },
          { id: 'D', label: 'Unknown', isCorrect: false }
        ],
        explanation: { codeRef: '1, 2 -> println("Low")', detail: 'Branches are checked top to bottom, and code is 2, which already matches the first branch (1, 2). "Low" prints and the second branch (which also lists 2) is never reached.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Classify the Day',
    description:
      'Declare val dayNumber = 6.\n\n' +
      '1. Write a when statement with dayNumber as the subject.\n\n' +
      '2. For branches 1, 2, 3, 4, 5, print "Weekday".\n\n' +
      '3. For branches 6, 7, print "Weekend".\n\n' +
      '4. In the else branch, print "Invalid day".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'DayClassifier.kt',
    initialCode: `fun main() {
    val dayNumber = 6
    // 1. Use when (dayNumber) with branches:
    //    1, 2, 3, 4, 5 -> "Weekday"
    //    6, 7 -> "Weekend"
    //    else -> "Invalid day"
}`,
    solutionCode: `fun main() {
    val dayNumber = 6
    when (dayNumber) {
        1, 2, 3, 4, 5 -> println("Weekday")
        6, 7 -> println("Weekend")
        else -> println("Invalid day")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Weekend',
    testCase: { call: '', expected: 'Weekend' }
  },
  debug: {
    title: 'Diagnose the Wrong Weekday Bug',
    subtitle: 'Friday is being classified as a weekend -- identify why, and fix the branch it belongs to.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Value in a when Branch',
    brokenCode: `fun main() {
    val dayNumber = 5
    // BUG: day 5 is Friday, a weekday -- but 5 was put in the wrong branch!
    when (dayNumber) {
        1, 2, 3, 4, 6 -> println("Weekday")
        5, 7 -> println("Weekend")
        else -> println("Invalid day")
    }
}`,
    fixedCode: `fun main() {
    val dayNumber = 5
    when (dayNumber) {
        1, 2, 3, 4, 5 -> println("Weekday")
        6, 7 -> println("Weekend")
        else -> println("Invalid day")
    }
}`,
    expectedOutput: 'Weekday',
    hints: [
      'Something is wrong with which branch dayNumber = 5 ends up matching.',
      'Look closely at the numbers listed in each branch -- is 5 really in the list it should be in, and is 6 really in the list it should be in?',
      'The weekday branch is missing 5 and has 6 instead; swap them so the weekday branch lists 1, 2, 3, 4, 5 and the weekend branch lists 6, 7.'
    ],
    explanation:
      'The weekday branch lists 1, 2, 3, 4, 6 instead of 1, 2, 3, 4, 5, and the weekend branch lists 5, 7 instead of 6, 7. Since dayNumber is 5, it matches the (wrong) weekend branch and prints "Weekend" instead of "Weekday". Moving 5 back into the weekday branch and 6 back into the weekend branch fixes the classification.'
  },
  mastered: {
    topicTitle: 'when',
    summary: 'You have mastered Kotlin\'s when statement: giving it a required subject, matching comma-separated values in a single branch, relying on else as the catch-all, and diagnosing a real value-placement logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'when (subject) as a cleaner alternative to a long else-if chain' },
      { title: 'Examples explored', subtitle: '5 progressive when patterns, from single values to String subjects' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a wrong-branch-value logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 5: when with ranges (world-3-when-with-ranges)
// =========================================================================
export const WHEN_WITH_RANGES_LESSON: FiveStageLesson = {
  id: 'world-3-when-with-ranges',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'when with Ranges',
  learn: {
    title: 'Matching a Range of Values with when',
    subtitle:
      "Instead of listing every individual value a branch should match, when can check whether the subject falls inside a range using in a..b, or outside it using !in a..b. Branches are still checked top to bottom -- the first range that matches wins -- and both ends of the range are included.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Grading a score with range branches',
    language: 'Kotlin',
    codeSnippet: ['val score = 85', 'when (score) {', '    in 90..100 -> println("A")', '    in 80..89 -> println("B")', '    in 70..79 -> println("C")', '    else -> println("F")', '}'],
    explanation:
      'Kotlin checks each in a..b branch from top to bottom. score is 85, so the first branch (90..100) fails, but the second branch (80..89) matches -- 85 falls between 80 and 89 inclusive -- so "B" prints and the remaining branches are skipped entirely, just like an else-if chain.',
    keyIdeas: [
      { number: 1, title: 'in a..b matches a whole range', description: 'A single branch can cover every value between a and b, instead of listing each one with commas.' },
      { number: 2, title: 'Both ends are inclusive', description: 'in 80..89 matches 80, 89, and everything between them -- neither end is excluded.' },
      { number: 3, title: 'First match wins, top to bottom', description: 'Kotlin checks branches in order and stops at the first range that matches, exactly like a chain of if / else-if.' },
      { number: 4, title: '!in checks the opposite', description: '!in a..b matches whenever the subject is NOT inside that range.' },
      { number: 5, title: 'else still catches the rest', description: "A value that falls outside every listed range runs the else branch, if one is present." }
    ],
    keyTakeaway: 'in a..b (and !in a..b) let a single when branch cover a whole range instead of listing individual values -- both ends are included, branches are still checked top to bottom, and else remains the catch-all for anything outside every range.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a single range branch to inclusive boundaries, negation, and mixing range branches with value branches.',
    cards: [
      {
        id: 'card-whenrange-1',
        number: '01',
        title: 'A single range branch',
        language: 'Kotlin',
        subtitle: 'Matching a whole span of values with one branch.',
        code: ['val score = 95', 'when (score) {', '    in 90..100 -> println("Grade: A")', '    else -> println("Grade: Other")', '}'],
        whatItMeans: [
          { label: 'in 90..100', description: 'Matches score if it falls anywhere between 90 and 100' },
          { label: 'Result', description: '"Grade: A" prints, because 95 is inside that range' }
        ],
        whatChanged: 'Replaced a long list of individual values with a single range branch.'
      },
      {
        id: 'card-whenrange-2',
        number: '02',
        title: 'Branches are still checked top to bottom',
        language: 'Kotlin',
        subtitle: 'The first matching range wins, just like an else-if chain.',
        code: ['val score = 72', 'when (score) {', '    in 90..100 -> println("A")', '    in 80..89 -> println("B")', '    in 70..79 -> println("C")', '    else -> println("F")', '}'],
        whatItMeans: [
          { label: 'in 90..100, in 80..89', description: 'Both fail, since 72 is not inside either range' },
          { label: 'in 70..79', description: 'Matches -- 72 is between 70 and 79 -- so "C" prints and the rest are skipped' }
        ],
        whatChanged: 'Confirmed that when checks range branches in order and stops at the first match.'
      },
      {
        id: 'card-whenrange-3',
        number: '03',
        title: 'Both ends of the range are inclusive',
        language: 'Kotlin',
        subtitle: 'The exact boundary values 80 and 89 both belong to the range.',
        code: ['val score = 80', 'when (score) {', '    in 90..100 -> println("A")', '    in 80..89 -> println("B")', '    else -> println("Below B")', '}'],
        whatItMeans: [
          { label: 'in 80..89', description: 'score is exactly 80, the lower boundary -- and 80..89 includes it' },
          { label: 'Result', description: '"B" prints, since inclusive ranges never exclude their own endpoints' }
        ],
        whatChanged: 'Verified that a boundary value like 80 is matched, not skipped.'
      },
      {
        id: 'card-whenrange-4',
        number: '04',
        title: '!in matches outside the range',
        language: 'Kotlin',
        subtitle: 'Negating a range check with !in.',
        code: ['val age = 25', 'when (age) {', '    !in 13..19 -> println("Not a teenager")', '    else -> println("Teenager")', '}'],
        whatItMeans: [
          { label: '!in 13..19', description: 'Matches whenever age is NOT between 13 and 19' },
          { label: 'Result', description: '"Not a teenager" prints, since 25 falls outside that range' }
        ],
        whatChanged: 'Used !in to match everything a range does NOT cover.'
      },
      {
        id: 'card-whenrange-5',
        number: '05',
        title: 'Mixing range branches with value branches and else',
        language: 'Kotlin',
        subtitle: 'A single when can combine comma-separated values, ranges, and a final else.',
        code: ['val age = 70', 'when (age) {', '    0, 1 -> println("Infant")', '    in 2..12 -> println("Child")', '    in 13..19 -> println("Teenager")', '    in 20..64 -> println("Adult")', '    else -> println("Senior")', '}'],
        whatItMeans: [
          { label: '0, 1', description: 'A comma-separated value branch -- matches only exactly 0 or exactly 1' },
          { label: 'in 2..12, in 13..19, in 20..64', description: 'Three range branches, checked in order -- none of them cover 70' },
          { label: 'else', description: 'Catches age = 70, since it falls outside every listed range, printing "Senior"' }
        ],
        whatChanged: 'Combined comma-value branches, multiple ranges, and else in a single when block.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-whenrange-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic Range Match',
        topicMeta: 'in a..b',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 92', '    when (score) {', '        in 90..100 -> println("A")', '        in 80..89 -> println("B")', '        else -> println("F")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'A', isCorrect: true },
          { id: 'B', label: 'B', isCorrect: false },
          { id: 'C', label: 'F', isCorrect: false },
          { id: 'D', label: '92', isCorrect: false }
        ],
        explanation: { codeRef: 'in 90..100 -> println("A")', detail: '92 falls between 90 and 100, so the first range branch matches and "A" prints.' }
      },
      {
        id: 'pred-whenrange-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'No Range Matches',
        topicMeta: 'else as the catch-all',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 65', '    when (score) {', '        in 90..100 -> println("A")', '        in 80..89 -> println("B")', '        in 70..79 -> println("C")', '        else -> println("F")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'F', isCorrect: true },
          { id: 'B', label: 'C', isCorrect: false },
          { id: 'C', label: '65', isCorrect: false },
          { id: 'D', label: 'Nothing -- no branch matches', isCorrect: false }
        ],
        explanation: { codeRef: 'else -> println("F")', detail: '65 is not inside 90..100, 80..89, or 70..79, so none of the range branches match and else runs, printing "F".' }
      },
      {
        id: 'pred-whenrange-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Inclusive Lower Boundary',
        topicMeta: 'Range inclusivity',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 90', '    when (score) {', '        in 90..100 -> println("A")', '        in 80..89 -> println("B")', '        else -> println("F")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'A', isCorrect: true },
          { id: 'B', label: 'B', isCorrect: false },
          { id: 'C', label: 'F', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'in 90..100', detail: 'score is exactly 90, the lower boundary of 90..100. Since ranges are inclusive on both ends, 90 counts as a match, so "A" prints -- it does NOT fall through to the 80..89 branch.' }
      },
      {
        id: 'pred-whenrange-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Negated Range with !in',
        topicMeta: '!in a..b',
        language: 'Kotlin',
        code: ['fun main() {', '    val temp = 5', '    when (temp) {', '        !in 60..80 -> println("Not comfortable")', '        else -> println("Comfortable")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Not comfortable', isCorrect: true },
          { id: 'B', label: 'Comfortable', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: 'Nothing prints', isCorrect: false }
        ],
        explanation: { codeRef: '!in 60..80', detail: 'temp is 5, which is NOT between 60 and 80, so !in 60..80 evaluates to true and "Not comfortable" prints.' }
      },
      {
        id: 'pred-whenrange-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Inclusive Upper Boundary with Mixed Branches',
        topicMeta: 'Ranges combined with comma values',
        language: 'Kotlin',
        code: ['fun main() {', '    val age = 12', '    when (age) {', '        0, 1 -> println("Infant")', '        in 2..12 -> println("Child")', '        in 13..19 -> println("Teenager")', '        else -> println("Adult")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Child', isCorrect: true },
          { id: 'B', label: 'Teenager', isCorrect: false },
          { id: 'C', label: 'Adult', isCorrect: false },
          { id: 'D', label: 'Infant', isCorrect: false }
        ],
        explanation: { codeRef: 'in 2..12 -> println("Child")', detail: 'age is exactly 12, the upper boundary of 2..12. Since that end is inclusive too, 12 matches this range and "Child" prints, rather than falling through to 13..19.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Build a Grade Classifier',
    description:
      'Declare val score = 78.\n\n' +
      '1. Write a when (score) statement that checks ranges.\n\n' +
      '2. In branch in 90..100, print "Grade: A".\n\n' +
      '3. In branch in 80..89, print "Grade: B".\n\n' +
      '4. In branch in 70..79, print "Grade: C".\n\n' +
      '5. In the else branch, print "Grade: F".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'GradeClassifier.kt',
    initialCode: `fun main() {
    val score = 78
    // 1. Write a when (score) statement with range branches:
    //    in 90..100 -> print "Grade: A"
    //    in 80..89 -> print "Grade: B"
    //    in 70..79 -> print "Grade: C"
    //    else -> print "Grade: F"
}`,
    solutionCode: `fun main() {
    val score = 78
    when (score) {
        in 90..100 -> println("Grade: A")
        in 80..89 -> println("Grade: B")
        in 70..79 -> println("Grade: C")
        else -> println("Grade: F")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Grade: C',
    testCase: { call: '', expected: 'Grade: C' }
  },
  debug: {
    title: 'Diagnose the Grade Boundary Bug',
    subtitle: 'A score of exactly 80 should earn a "Grade: B", but the program prints "Grade: F" instead -- find and fix the range boundary.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Off-by-One Range Boundary',
    brokenCode: `fun main() {
    val score = 80
    when (score) {
        in 90..100 -> println("Grade: A")
        // BUG: this range starts at 81, so it silently excludes the boundary value 80!
        in 81..89 -> println("Grade: B")
        in 70..79 -> println("Grade: C")
        else -> println("Grade: F")
    }
}`,
    fixedCode: `fun main() {
    val score = 80
    when (score) {
        in 90..100 -> println("Grade: A")
        in 80..89 -> println("Grade: B")
        in 70..79 -> println("Grade: C")
        else -> println("Grade: F")
    }
}`,
    expectedOutput: 'Grade: B',
    hints: [
      'Something is wrong with one of the range boundaries -- a score that should earn a passing grade is falling all the way through to the wrong branch.',
      'What grade should a score of exactly 80 receive? Check which range 80 actually needs to land inside.',
      'Look closely at the B range\'s lower bound -- in 81..89 starts at 81, so it excludes 80 entirely. Change it to in 80..89 so the boundary value is included.'
    ],
    explanation:
      'The B range was written as in 81..89, which starts at 81 and excludes the boundary value 80. Since 80 also fails the A range (90..100) and the C range (70..79 is too low), it falls all the way through to else, printing "Grade: F" instead of "Grade: B". Changing the lower bound to 80 so the range reads in 80..89 correctly includes the boundary score.'
  },
  mastered: {
    topicTitle: 'when with Ranges',
    summary:
      'You have mastered using in a..b and !in a..b range branches inside when, including inclusive boundary behavior, top-to-bottom first-match evaluation, mixing ranges with comma-separated values and else, and diagnosed a real off-by-one range boundary bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'Range branches (in a..b, !in a..b) inside when, and inclusive boundaries' },
      { title: 'Examples explored', subtitle: '5 progressive range-branch patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts, including boundary values' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved an off-by-one range boundary defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 6: when as an expression (world-3-when-as-an-expression)
// =========================================================================
export const WHEN_AS_EXPRESSION_LESSON: FiveStageLesson = {
  id: 'world-3-when-as-an-expression',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'when as an Expression',
  learn: {
    title: 'when as an Expression',
    subtitle:
      "Just like if, a when block can produce a value instead of just running statements. Assign the entire when block to a val, and whichever branch matches becomes the value -- no need to call println() inside every branch.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Assigning a when result directly',
    language: 'Kotlin',
    codeSnippet: ['val score = 85', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 80..89 -> "B"', '    in 70..79 -> "C"', '    else -> "F"', '}', 'println(grade)'],
    explanation:
      'When Kotlin evaluates "when (score) { ... }" as an expression, it checks each branch in order, finds the first one that matches, and the value after that branch\'s -> becomes the value of the entire when block. Here score is 85, which falls in 80..89, so grade is assigned "B" -- and only "B" is ever printed, not the whole decision process.',
    keyIdeas: [
      { number: 1, title: 'when produces a value', description: 'Assigning "val grade = when (score) { ... }" works exactly like an if-expression, but scales cleanly to many branches instead of just two.' },
      { number: 2, title: 'Every branch supplies one result', description: 'Each "-> result" line is the value that gets assigned if that branch matches -- there is no println() inside the branches themselves.' },
      { number: 3, title: 'else is required', description: 'Without else, there would be no value to assign when no other branch matches -- it guarantees the expression always produces a result.' },
      { number: 4, title: 'Print once, after the when', description: 'Unlike the statement form of when (which prints separately inside every branch), the expression form is computed once and printed a single time afterward.' }
    ],
    keyTakeaway:
      'A when-expression works like if-expression: each branch offers a possible value, the first matching branch\'s result becomes the value of the whole expression, and else guarantees there is always something to assign.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a basic when-expression to value lists, branch order, else, and numeric results.',
    cards: [
      {
        id: 'card-whenexpr-1',
        number: '01',
        title: 'A basic when-expression',
        language: 'Kotlin',
        subtitle: 'Assign the result of a when block directly to a val.',
        code: ['val score = 95', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 80..89 -> "B"', '    in 70..79 -> "C"', '    else -> "F"', '}', 'println(grade)'],
        whatItMeans: [
          { label: 'val grade = when (score) { ... }', description: 'Whichever branch matches, its result becomes the value assigned to grade' },
          { label: 'in 90..100 -> "A"', description: '95 falls in this range, so grade is assigned "A"' },
          { label: 'println(grade)', description: 'Prints the value that was assigned, not something from inside the when' }
        ],
        whatChanged: 'Showed a when-expression assigning directly to a variable instead of calling println() inside each branch.'
      },
      {
        id: 'card-whenexpr-2',
        number: '02',
        title: 'Comma-value branches in an expression',
        language: 'Kotlin',
        subtitle: 'Equality branches work in expression form too, not just ranges.',
        code: ['val day = 6', 'val dayType = when (day) {', '    1, 2, 3, 4, 5 -> "Weekday"', '    6, 7 -> "Weekend"', '    else -> "Invalid day"', '}', 'println(dayType)'],
        whatItMeans: [
          { label: '1, 2, 3, 4, 5 -> "Weekday"', description: 'Matches if day equals any of these listed values' },
          { label: '6, 7 -> "Weekend"', description: 'day is 6, which matches this branch' },
          { label: 'else -> "Invalid day"', description: 'Catches any day number outside 1..7' }
        ],
        whatChanged: 'Combined comma-separated value branches with a when-expression, the same principle as range branches.'
      },
      {
        id: 'card-whenexpr-3',
        number: '03',
        title: 'Branch order decides the result',
        language: 'Kotlin',
        subtitle: 'Branches are checked top to bottom -- the first match wins.',
        code: ['val rating = 3', 'val description = when (rating) {', '    in 4..5 -> "Great"', '    in 2..3 -> "Okay"', '    in 0..1 -> "Poor"', '    else -> "Invalid rating"', '}', 'println(description)'],
        whatItMeans: [
          { label: 'in 4..5 -> "Great"', description: 'rating is 3, so this branch does not match -- skip it' },
          { label: 'in 2..3 -> "Okay"', description: 'rating is 3, this branch matches -- description becomes "Okay"' },
          { label: 'Order matters', description: 'Only the first matching branch (top to bottom) supplies the value' }
        ],
        whatChanged: 'Reinforced that when-expression branches are checked in order, and the first match determines the final value.'
      },
      {
        id: 'card-whenexpr-4',
        number: '04',
        title: 'else guarantees a result',
        language: 'Kotlin',
        subtitle: 'Without else, a value outside every range would have nothing to assign.',
        code: ['val score = 45', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 80..89 -> "B"', '    in 70..79 -> "C"', '    in 60..69 -> "D"', '    else -> "F"', '}', 'println("Score $score -> Grade $grade")'],
        whatItMeans: [
          { label: 'score = 45', description: 'Does not fall inside any of the listed ranges' },
          { label: 'else -> "F"', description: 'Guarantees the when-expression always produces a value, even below 60' },
          { label: 'String template', description: 'Combines the original score and the computed grade in one printed line' }
        ],
        whatChanged: 'Demonstrated why else is required for a when-expression -- without it, there would be no value for a score like 45.'
      },
      {
        id: 'card-whenexpr-5',
        number: '05',
        title: 'A when-expression can produce a number',
        language: 'Kotlin',
        subtitle: 'The assigned value does not have to be a String -- it can feed into further math.',
        code: ['val quantity = 25', 'val discountPercent = when (quantity) {', '    in 10..19 -> 10', '    in 20..29 -> 20', '    else -> 0', '}', 'val finalPrice = 100 - discountPercent', 'println("Discount: $discountPercent%, Final price: $finalPrice")'],
        whatItMeans: [
          { label: 'discountPercent = when (quantity) { ... }', description: 'quantity is 25, which falls in 20..29, so discountPercent is assigned 20' },
          { label: 'finalPrice = 100 - discountPercent', description: 'Uses the assigned number in an ordinary calculation afterward' },
          { label: 'Separation of concerns', description: 'The when handles the decision; the math after it handles the calculation' }
        ],
        whatChanged: 'Showed a when-expression producing a number instead of a String, feeding directly into further calculation.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-whenexpr-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic Range Match',
        topicMeta: 'when-expression with ranges',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 72', '    val grade = when (score) {', '        in 90..100 -> "A"', '        in 80..89 -> "B"', '        in 70..79 -> "C"', '        else -> "F"', '    }', '    println(grade)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'C', isCorrect: true },
          { id: 'B', label: 'B', isCorrect: false },
          { id: 'C', label: 'F', isCorrect: false },
          { id: 'D', label: '72', isCorrect: false }
        ],
        explanation: { codeRef: 'in 70..79 -> "C"', detail: '72 falls inside 70..79, so grade is assigned "C" and that is what gets printed.' }
      },
      {
        id: 'pred-whenexpr-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Comma-Value Branch',
        topicMeta: 'when-expression with value lists',
        language: 'Kotlin',
        code: ['fun main() {', '    val day = 1', '    val dayType = when (day) {', '        1, 2, 3, 4, 5 -> "Weekday"', '        6, 7 -> "Weekend"', '        else -> "Invalid day"', '    }', '    println(dayType)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Weekday', isCorrect: true },
          { id: 'B', label: 'Weekend', isCorrect: false },
          { id: 'C', label: 'Invalid day', isCorrect: false },
          { id: 'D', label: '1', isCorrect: false }
        ],
        explanation: { codeRef: '1, 2, 3, 4, 5 -> "Weekday"', detail: 'day is 1, which matches the first branch\'s value list, so dayType is assigned "Weekday".' }
      },
      {
        id: 'pred-whenexpr-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'First Match Wins',
        topicMeta: 'Branch order in an expression',
        language: 'Kotlin',
        code: ['fun main() {', '    val rating = 5', '    val description = when (rating) {', '        in 4..5 -> "Great"', '        in 2..3 -> "Okay"', '        in 0..1 -> "Poor"', '        else -> "Invalid rating"', '    }', '    println(description)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Great', isCorrect: true },
          { id: 'B', label: 'Okay', isCorrect: false },
          { id: 'C', label: 'Poor', isCorrect: false },
          { id: 'D', label: 'Invalid rating', isCorrect: false }
        ],
        explanation: { codeRef: 'in 4..5 -> "Great"', detail: 'rating is 5, which matches the very first branch, so description is assigned "Great" immediately.' }
      },
      {
        id: 'pred-whenexpr-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Falling Through to else',
        topicMeta: 'else as the fallback value',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 55', '    val grade = when (score) {', '        in 90..100 -> "A"', '        in 80..89 -> "B"', '        in 70..79 -> "C"', '        in 60..69 -> "D"', '        else -> "F"', '    }', '    println("Grade: $grade")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Grade: F', isCorrect: true },
          { id: 'B', label: 'Grade: D', isCorrect: false },
          { id: 'C', label: 'Grade: 55', isCorrect: false },
          { id: 'D', label: 'Grade: null', isCorrect: false }
        ],
        explanation: { codeRef: 'else -> "F"', detail: '55 does not fall inside any of the listed ranges (90..100, 80..89, 70..79, 60..69), so it falls through to else, assigning grade "F".' }
      },
      {
        id: 'pred-whenexpr-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'A Numeric Result',
        topicMeta: 'when-expression producing a number',
        language: 'Kotlin',
        code: ['fun main() {', '    val quantity = 25', '    val discountPercent = when (quantity) {', '        in 10..19 -> 10', '        in 20..29 -> 20', '        else -> 0', '    }', '    val finalPrice = 100 - discountPercent', '    println(finalPrice)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '80', isCorrect: true },
          { id: 'B', label: '20', isCorrect: false },
          { id: 'C', label: '100', isCorrect: false },
          { id: 'D', label: '90', isCorrect: false }
        ],
        explanation: { codeRef: 'val finalPrice = 100 - discountPercent', detail: 'quantity is 25, which falls in 20..29, so discountPercent is assigned 20. finalPrice is then 100 - 20 = 80.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Classify the Temperature',
    description:
      'Declare val temperature = 28.\n\n' +
      '1. Assign the result of a when (temperature) expression to val description:\n' +
      '   • in 30..100 -> "Hot"\n' +
      '   • in 20..29 -> "Warm"\n' +
      '   • in 10..19 -> "Cool"\n' +
      '   • else -> "Cold"\n\n' +
      '2. Print the result as:\n' +
      '"It\'s Warm outside" using string templates ($description)',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'ClassifyTemperature.kt',
    initialCode: `fun main() {
    val temperature = 28
    // 1. Assign the result of a when-expression to val description:
    //    in 30..100 -> "Hot", in 20..29 -> "Warm", in 10..19 -> "Cool", else -> "Cold"

    // 2. Print "It's $description outside"
}`,
    solutionCode: `fun main() {
    val temperature = 28
    val description = when (temperature) {
        in 30..100 -> "Hot"
        in 20..29 -> "Warm"
        in 10..19 -> "Cool"
        else -> "Cold"
    }
    println("It's $description outside")
}`,
    sampleInput: 'main()',
    expectedOutput: "It's Warm outside",
    testCase: { call: '', expected: "It's Warm outside" }
  },
  debug: {
    title: 'Diagnose the Unused Expression Result',
    subtitle: 'The computed grade is never actually printed -- find and fix what gets passed to println.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Printed the Wrong Variable',
    brokenCode: `fun main() {
    val score = 72
    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        else -> "F"
    }
    // BUG: this prints the raw score, not the grade the when-expression computed!
    println("Grade: $score")
}`,
    fixedCode: `fun main() {
    val score = 72
    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        else -> "F"
    }
    println("Grade: $grade")
}`,
    expectedOutput: 'Grade: C',
    hints: [
      'The when-expression on the right runs and assigns a result to grade -- but check what actually gets interpolated in the println below it.',
      'println("Grade: $score") prints the raw score (72), not the letter grade the when-expression computed and stored in grade.',
      'Change $score to $grade in the println so the computed result is what actually gets printed.'
    ],
    explanation:
      'The whole point of using when as an expression is that its result is a value you go on to use -- here, that value was assigned to grade, but the println below still referenced score instead. Since score is 72, the broken version prints "Grade: 72" -- the computed grade ("C") is calculated but never actually used. Printing $grade instead of $score correctly shows the letter grade the when-expression produced.'
  },
  mastered: {
    topicTitle: 'when as an Expression',
    summary:
      'You have mastered using when as an expression -- assigning its result directly to a val with range branches, comma-value branches, and a required else, and diagnosed a real range-boundary logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'How a when-expression assigns its matching branch\'s result to a variable' },
      { title: 'Examples explored', subtitle: '5 progressive when-expression patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved an off-by-one range-boundary defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 7: Multiple conditions and nested conditions (world-3-multiple-conditions-and-nested-condition)
// =========================================================================
export const MULTIPLE_NESTED_CONDITIONS_LESSON: FiveStageLesson = {
  id: 'world-3-multiple-conditions-and-nested-condition',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'Multiple conditions and nested conditions',
  learn: {
    title: 'Multiple Conditions & Nested Ifs',
    subtitle:
      'Real decisions often depend on more than one thing. Kotlin gives you two tools for that: combine several conditions into a single if using && / ||, or nest one if inside another so a second check only happens after the first one passes.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Combined condition vs. nested if',
    language: 'Kotlin',
    codeSnippet: [
      'val age = 20',
      'val hasId = true',
      '',
      '// Combined: both conditions matter equally, checked together',
      'if (age >= 18 && hasId) {',
      '    println("Entry allowed")',
      '} else {',
      '    println("Entry denied")',
      '}'
    ],
    explanation:
      'age >= 18 && hasId puts both conditions inside one if -- they are treated as a single combined gate. A nested if is different: it places one if block inside another, so the inner condition is only ever checked once the outer condition has already passed. Use a combined condition when every condition matters equally to the same decision; use a nested if when the second check only makes sense as a follow-up to the first.',
    keyIdeas: [
      { number: 1, title: 'Combined conditions with && / ||', description: 'Put every condition inside one if using && (all must be true) or || (at least one must be true) when they all gate the exact same decision.' },
      { number: 2, title: 'Nested ifs express dependency', description: 'An if placed inside another if’s body only runs when the outer condition is true -- it models "check this, and only if that passes, check something else."' },
      { number: 3, title: 'A false outer condition skips the inner if entirely', description: 'If the outer if is false, Kotlin jumps straight to its else (if any) and never even looks at the nested if inside -- the inner condition is not evaluated at all.' },
      { number: 4, title: 'Choosing between them', description: 'Ask: "do these conditions matter equally as one gate, or does the second one only make sense after the first passes?" The first case favors && / ||; the second favors nesting.' }
    ],
    keyTakeaway: 'Combine conditions with && / || when they all gate the same decision equally; nest one if inside another when the second check is only meaningful after the first one passes.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See combined conditions and nested ifs side by side, including what happens when the outer condition fails.',
    cards: [
      {
        id: 'card-mnc-1',
        number: '01',
        title: 'Combining conditions with &&',
        language: 'Kotlin',
        subtitle: 'Both conditions must hold for entry to be allowed.',
        code: ['val age = 20', 'val hasId = true', 'if (age >= 18 && hasId) {', '    println("Entry allowed")', '} else {', '    println("Entry denied")', '}'],
        whatItMeans: [
          { label: 'age >= 18 && hasId', description: 'A single combined condition -- both sides must be true' },
          { label: 'Entry allowed', description: '20 >= 18 is true and hasId is true, so the combined condition is true' }
        ],
        whatChanged: 'Combined two related conditions into a single if using &&.'
      },
      {
        id: 'card-mnc-2',
        number: '02',
        title: 'Combining conditions with ||',
        language: 'Kotlin',
        subtitle: 'Only one of two conditions needs to hold.',
        code: ['val isMember = false', 'val hasPass = true', 'if (isMember || hasPass) {', '    println("Welcome!")', '} else {', '    println("Access denied")', '}'],
        whatItMeans: [
          { label: 'isMember || hasPass', description: 'true if at least one side is true' },
          { label: 'Welcome!', description: 'isMember is false, but hasPass is true, so the combined condition is still true' }
        ],
        whatChanged: 'Combined two alternative paths into a single if using ||.'
      },
      {
        id: 'card-mnc-3',
        number: '03',
        title: 'Nested if: a dependent second check',
        language: 'Kotlin',
        subtitle: 'Only check admin status after confirming the user is logged in.',
        code: ['val isLoggedIn = true', 'val isAdmin = true', 'if (isLoggedIn) {', '    if (isAdmin) {', '        println("Welcome, Admin!")', '    } else {', '        println("Welcome, User!")', '    }', '} else {', '    println("Please log in")', '}'],
        whatItMeans: [
          { label: 'if (isLoggedIn) { ... }', description: 'The outer gate -- everything inside only runs if this is true' },
          { label: 'if (isAdmin) { ... }', description: 'The nested, dependent check -- only reached once isLoggedIn is true' },
          { label: 'Welcome, Admin!', description: 'Both isLoggedIn and isAdmin are true, so the innermost branch runs' }
        ],
        whatChanged: 'Nested a second if-else inside the first, so the admin check only happens after confirming the user is logged in.'
      },
      {
        id: 'card-mnc-4',
        number: '04',
        title: 'Nested if: outer false skips the inner check',
        language: 'Kotlin',
        subtitle: 'The exact same structure, but the outer condition now fails.',
        code: ['val isLoggedIn = false', 'val isAdmin = true', 'if (isLoggedIn) {', '    if (isAdmin) {', '        println("Welcome, Admin!")', '    } else {', '        println("Welcome, User!")', '    }', '} else {', '    println("Please log in")', '}'],
        whatItMeans: [
          { label: 'isLoggedIn: false', description: 'The outer condition is false, so its if-body is skipped entirely' },
          { label: 'isAdmin is never checked', description: 'Even though isAdmin is true, the nested if is inside the outer if’s body -- it only runs when isLoggedIn is true' },
          { label: 'Please log in', description: 'Execution jumps straight to the outer else branch' }
        ],
        whatChanged: 'Same nested structure, different outer result: the inner if never runs at all, showing that nesting expresses dependency, not just an extra filter.'
      },
      {
        id: 'card-mnc-5',
        number: '05',
        title: 'Combining both patterns together',
        language: 'Kotlin',
        subtitle: 'A nested outer check, with a combined condition inside it.',
        code: ['val accountExists = true', 'val balance = 500', 'val withdrawAmount = 300', 'if (accountExists) {', '    if (balance >= withdrawAmount && withdrawAmount > 0) {', '        println("Withdrawal approved")', '    } else {', '        println("Withdrawal denied")', '    }', '} else {', '    println("No such account")', '}'],
        whatItMeans: [
          { label: 'if (accountExists) { ... }', description: 'A nested outer check -- only look at withdrawal rules if the account is real' },
          { label: 'balance >= withdrawAmount && withdrawAmount > 0', description: 'A combined condition inside the nested if -- both parts must be true' },
          { label: 'Withdrawal approved', description: '500 >= 300 is true and 300 > 0 is true, so the combined inner condition is true' }
        ],
        whatChanged: 'Combined both patterns: an outer nested if for a dependent check, and an inner combined condition using && for two conditions that must both be true.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace combined conditions and nested ifs carefully -- pay attention to when an inner check is skipped entirely.',
    questions: [
      {
        id: 'pred-mnc-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Combined AND condition',
        topicMeta: 'Combining conditions with &&',
        language: 'Kotlin',
        code: ['fun main() {', '    val age = 15', '    val hasTicket = true', '    if (age >= 13 && hasTicket) {', '        println("Enjoy the movie")', '    } else {', '        println("Not allowed")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Enjoy the movie', isCorrect: true },
          { id: 'B', label: 'Not allowed', isCorrect: false },
          { id: 'C', label: 'true', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'age >= 13 && hasTicket', detail: '15 >= 13 is true, and hasTicket is true, so the combined condition true && true is true, printing "Enjoy the movie".' }
      },
      {
        id: 'pred-mnc-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Combined OR condition',
        topicMeta: 'Combining conditions with ||',
        language: 'Kotlin',
        code: ['fun main() {', '    val isStudent = false', '    val isSenior = true', '    if (isStudent || isSenior) {', '        println("Discount applied")', '    } else {', '        println("Full price")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Discount applied', isCorrect: true },
          { id: 'B', label: 'Full price', isCorrect: false },
          { id: 'C', label: 'true', isCorrect: false },
          { id: 'D', label: 'isSenior', isCorrect: false }
        ],
        explanation: { codeRef: 'isStudent || isSenior', detail: 'isStudent is false, but isSenior is true, so false || true is true. Only one side needs to be true for ||, printing "Discount applied".' }
      },
      {
        id: 'pred-mnc-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Nested if: outer condition fails',
        topicMeta: 'Nested ifs',
        language: 'Kotlin',
        code: ['fun main() {', '    val isWeekend = false', '    val hasCoupon = true', '    if (isWeekend) {', '        if (hasCoupon) {', '            println("Extra discount")', '        } else {', '            println("Weekend discount")', '        }', '    } else {', '        println("No discount")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'No discount', isCorrect: true },
          { id: 'B', label: 'Extra discount', isCorrect: false },
          { id: 'C', label: 'Weekend discount', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'if (isWeekend) { if (hasCoupon) ... }', detail: 'isWeekend is false, so the outer if’s body -- including the nested hasCoupon check -- never runs at all. Execution goes straight to the outer else, printing "No discount", even though hasCoupon is true.' }
      },
      {
        id: 'pred-mnc-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Nested if: outer passes, inner fails',
        topicMeta: 'Nested ifs',
        language: 'Kotlin',
        code: ['fun main() {', '    val isMember = true', '    val points = 50', '    if (isMember) {', '        if (points >= 100) {', '            println("Redeem reward")', '        } else {', '            println("Keep earning points")', '        }', '    } else {', '        println("Join membership program")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Keep earning points', isCorrect: true },
          { id: 'B', label: 'Redeem reward', isCorrect: false },
          { id: 'C', label: 'Join membership program', isCorrect: false },
          { id: 'D', label: 'points >= 100', isCorrect: false }
        ],
        explanation: { codeRef: 'if (points >= 100) ... else ...', detail: 'isMember is true, so the outer if runs. Inside it, points >= 100 is 50 >= 100, which is false, so the nested if’s else branch runs, printing "Keep earning points".' }
      },
      {
        id: 'pred-mnc-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Combined condition across an else-if chain',
        topicMeta: 'Combined conditions with else-if',
        language: 'Kotlin',
        code: ['fun main() {', '    val temperature = 28', '    val isRaining = false', '    if (temperature > 30 && !isRaining) {', '        println("Great beach day")', '    } else if (temperature > 20 && !isRaining) {', '        println("Nice day for a walk")', '    } else {', '        println("Stay indoors")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Nice day for a walk', isCorrect: true },
          { id: 'B', label: 'Great beach day', isCorrect: false },
          { id: 'C', label: 'Stay indoors', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'temperature > 20 && !isRaining', detail: 'temperature > 30 is 28 > 30, which is false, so the first branch is skipped. The else-if checks temperature > 20 (28 > 20, true) && !isRaining (!false, true), which is true, printing "Nice day for a walk".' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 30,
    title: 'Loan Approval System',
    description:
      'Declare hasStableJob = true, creditScore = 750, and income = 30000.\n\n' +
      '1. Check if hasStableJob is true using an outer if statement.\n\n' +
      '2. Inside the outer if, combine two checks with &&:\n' +
      '   creditScore >= 700 && income >= 25000\n\n' +
      '3. Print "Loan approved" if both conditions hold, otherwise print "Loan denied".\n\n' +
      '4. If hasStableJob is false, the outer else branch must print:\n' +
      '"Employment required"',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'LoanApproval.kt',
    initialCode: `fun main() {
    val hasStableJob = true
    val creditScore = 750
    val income = 30000

    // 1. Outer check: only evaluate credit terms when hasStableJob is true:
    // 2. Nested check: combine creditScore >= 700 && income >= 25000 ("Loan approved" vs "Loan denied"):
    // 3. Outer else: print "Employment required":
}`,
    solutionCode: `fun main() {
    val hasStableJob = true
    val creditScore = 750
    val income = 30000
    if (hasStableJob) {
        if (creditScore >= 700 && income >= 25000) {
            println("Loan approved")
        } else {
            println("Loan denied")
        }
    } else {
        println("Employment required")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Loan approved',
    testCase: { call: '', expected: 'Loan approved' }
  },
  debug: {
    title: 'Diagnose the Un-nested Dependent Check',
    subtitle: 'A withdrawal is being approved even though the account isn’t active -- inspect the structure of the ifs and fix it.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Dependent Check Not Nested',
    brokenCode: `fun main() {
    val isAccountActive = false
    val balance = 500
    val withdrawAmount = 200

    // BUG: the balance check should be nested INSIDE the active-account
    // check, but it's written as a separate, independent if below!
    if (isAccountActive) {
        println("Account is active")
    }

    if (balance >= withdrawAmount) {
        println("Withdrawal approved")
    } else {
        println("Withdrawal denied")
    }
}`,
    fixedCode: `fun main() {
    val isAccountActive = false
    val balance = 500
    val withdrawAmount = 200

    if (isAccountActive) {
        if (balance >= withdrawAmount) {
            println("Withdrawal approved")
        } else {
            println("Withdrawal denied")
        }
    } else {
        println("Account inactive")
    }
}`,
    expectedOutput: 'Account inactive',
    hints: [
      'Something is wrong with how the two if-checks relate to each other.',
      'Should the withdrawal check ever run at all when the account isn’t active? Look at whether the second if is really depending on the first.',
      'Nest the balance check inside the isAccountActive if-block, and add an else branch there for when the account isn’t active.'
    ],
    explanation:
      'The broken code writes two separate, top-level ifs: one that checks isAccountActive (doing nothing useful with the result), and a second, completely independent if that checks the balance. Because the balance check isn’t nested inside the account-active check, it runs regardless of isAccountActive -- so with isAccountActive false, it still prints "Withdrawal approved". Nesting the balance check inside the isAccountActive if-block (with its own else for the inactive case) makes the balance check genuinely dependent on the account being active, correctly printing "Account inactive".'
  },
  mastered: {
    topicTitle: 'Multiple conditions and nested conditions',
    summary: 'You have mastered combining conditions with && / || into a single if, nesting one if inside another for dependent checks, and diagnosed a real un-nested logic defect.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'Combined conditions vs. nested, dependent ifs' },
      { title: 'Examples explored', subtitle: '5 progressive combined-condition and nested-if patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts, including a skipped nested check' },
      { title: 'Code written & executed', subtitle: 'Nested if with a combined inner condition, executed successfully' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Fixed a dependent check that was missing its nesting' }
    ],
    xpEarned: 30,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 8: Type checks with is where appropriate (world-3-type-checks-with-is-where-appropriate)
// =========================================================================
export const TYPE_CHECKS_IS_LESSON: FiveStageLesson = {
  id: 'world-3-type-checks-with-is-where-appropriate',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'Type checks with is where appropriate',
  learn: {
    title: 'Asking "What Type Is This?" with is',
    subtitle:
      "Sometimes a value's exact type isn't known until your program is running -- for example, a variable declared as Any that could hold a number, some text, or a true/false flag. Kotlin's is operator checks a value's runtime type and returns a Boolean, so you can branch on what a value actually is before you use it.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Checking a runtime type with is',
    language: 'Kotlin',
    codeSnippet: ['val value: Any = 42', '', 'if (value is Int) {', '    println("It\'s a number")', '} else {', '    println("It\'s not a number")', '}'],
    explanation:
      "value is declared as Any, so at compile time Kotlin does not know exactly what it holds. The expression value is Int asks the question at runtime: \"does value actually hold an Int?\" -- and evaluates to a Boolean, true or false, that an if can branch on. !is asks the opposite question: \"is this NOT that type?\"",
    keyIdeas: [
      { number: 1, title: 'is checks a runtime type', description: 'value is Type evaluates to true if value actually holds that type when the program runs, false otherwise.' },
      { number: 2, title: '!is is the negation', description: 'value !is Type is the exact opposite of value is Type -- true when value does NOT hold that type.' },
      { number: 3, title: 'Most useful with Any', description: 'is shines when a variable could hold more than one kind of value -- like data read from a form or a mixed list -- and your code needs to decide what to do based on which one it actually got.' },
      { number: 4, title: 'Combine with && and ||', description: 'Because is produces a plain Boolean, you can combine it with other conditions in the same if, e.g. value is String && value.length > 0.' }
    ],
    keyTakeaway: 'is asks "what type is this value, right now?" and gives you back a Boolean you can branch on -- the natural decision-making tool for values whose type isn\'t fixed in advance.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from checking a single value to combining is with other conditions.',
    cards: [
      {
        id: 'card-is-1',
        number: '01',
        title: 'Checking if a value is a number',
        language: 'Kotlin',
        subtitle: 'Use is to test whether an Any value holds a number.',
        code: ['val value: Any = 42', 'if (value is Int) {', '    println("It\'s a number")', '}'],
        whatItMeans: [
          { label: 'val value: Any', description: 'value could hold any type -- the compiler does not restrict it up front' },
          { label: 'value is Int', description: 'checks, at runtime, whether value actually holds a number' },
          { label: 'Result', description: 'true, since 42 is a number, so "It\'s a number" is printed' }
        ],
        whatChanged: 'Introduced is as a way to test the runtime type of an Any value.'
      },
      {
        id: 'card-is-2',
        number: '02',
        title: 'Checking if a value is text',
        language: 'Kotlin',
        subtitle: 'is also works for String, with an else branch for the opposite case.',
        code: ['val value: Any = "hello"', 'if (value is String) {', '    println("It\'s text")', '} else {', '    println("It\'s not text")', '}'],
        whatItMeans: [
          { label: 'value is String', description: 'checks whether value actually holds a String' },
          { label: 'Result', description: '"hello" is a String, so the if branch runs and prints "It\'s text"' }
        ],
        whatChanged: 'Paired is with if/else to handle both the matching and non-matching cases.'
      },
      {
        id: 'card-is-3',
        number: '03',
        title: 'Using !is for the opposite check',
        language: 'Kotlin',
        subtitle: '!is asks whether a value does NOT match a type.',
        code: ['val value: Any = true', 'if (value !is String) {', '    println("Definitely not text")', '}'],
        whatItMeans: [
          { label: 'value !is String', description: 'true only when value does NOT hold a String' },
          { label: 'Result', description: 'true holds a Boolean, not a String, so the condition is true and the message prints' }
        ],
        whatChanged: 'Showed !is as the direct negation of is, useful when you only care about ruling a type out.'
      },
      {
        id: 'card-is-4',
        number: '04',
        title: 'Combining is with &&',
        language: 'Kotlin',
        subtitle: 'A type check can be one part of a larger condition.',
        code: ['val input: Any = "Kotlin"', 'if (input is String && input.length > 3) {', '    println("Long text value")', '} else {', '    println("Short or not text")', '}'],
        whatItMeans: [
          { label: 'input is String', description: 'confirms input is actually text before it is safe to check its length' },
          { label: '&& input.length > 3', description: 'a second condition, only meaningful once we know input is text' },
          { label: 'Result', description: '"Kotlin" is a String with length 6, so both sides of && are true and "Long text value" prints' }
        ],
        whatChanged: 'Combined a type check with && to make a more specific decision.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-is-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic is Check',
        topicMeta: 'is with a number',
        language: 'Kotlin',
        code: ['fun main() {', '    val value: Any = 42', '    println(value is Int)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '42', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'value is Int', detail: 'value holds 42, which is a number, so value is Int evaluates to true.' }
      },
      {
        id: 'pred-is-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'is with the Wrong Type',
        topicMeta: 'is returning false',
        language: 'Kotlin',
        code: ['fun main() {', '    val value: Any = 42', '    println(value is String)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: '42', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'value is String', detail: 'value holds 42, a number, not a String, so value is String evaluates to false.' }
      },
      {
        id: 'pred-is-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Negation with !is',
        topicMeta: '!is negation',
        language: 'Kotlin',
        code: ['fun main() {', '    val value: Any = "hello"', '    println(value !is Int)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'hello', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'value !is Int', detail: '"hello" is a String, not an Int, so !is Int (does NOT hold an Int) evaluates to true.' }
      },
      {
        id: 'pred-is-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Checking a Boolean',
        topicMeta: 'is with Boolean',
        language: 'Kotlin',
        code: ['fun main() {', '    val value: Any = true', '    println(value is Boolean)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'Compiler error', isCorrect: false },
          { id: 'D', label: 'null', isCorrect: false }
        ],
        explanation: { codeRef: 'value is Boolean', detail: 'value holds true, which is a Boolean, so value is Boolean evaluates to true.' }
      },
      {
        id: 'pred-is-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Combining is with &&',
        topicMeta: 'is inside a compound condition',
        language: 'Kotlin',
        code: ['fun main() {', '    val value: Any = "Kotlin"', '    if (value is String && value.length > 3) {', '        println("Long")', '    } else {', '        println("Short")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Long', isCorrect: true },
          { id: 'B', label: 'Short', isCorrect: false },
          { id: 'C', label: 'true', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'value is String && value.length > 3', detail: '"Kotlin" is a String, so the is check is true, and its length is 6, which is greater than 3 -- both sides of && are true, so "Long" is printed.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Classify the User Input',
    description:
      'Declare val input: Any = 30.\n\n' +
      '1. Use the `is` operator to check whether input is an Int.\n\n' +
      '2. If input is an Int, print:\n' +
      '"Input is a number."\n\n' +
      '3. Otherwise, print:\n' +
      '"Input is not a number."',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'ClassifyInput.kt',
    initialCode: `fun main() {
    val input: Any = 30
    // 1. Check whether input is an Int using \`is\`:

    // 2. If it is, print "Input is a number."

    // 3. Otherwise, print "Input is not a number."
}`,
    solutionCode: `fun main() {
    val input: Any = 30
    if (input is Int) {
        println("Input is a number.")
    } else {
        println("Input is not a number.")
    }
}`,
    sampleInput: 'main()',
    expectedOutput: 'Input is a number.',
    testCase: { call: '', expected: 'Input is a number.' }
  },
  debug: {
    title: 'Diagnose the Wrong-Type Check',
    subtitle: 'The order total is not being calculated -- identify why, and fix the type check.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong is Type Check',
    brokenCode: `fun main() {
    val quantity: Any = 4
    val pricePerItem = 3
    // BUG: quantity actually holds a number, not text!
    if (quantity is String) {
        val total = pricePerItem * quantity
        println("Total: $total")
    } else {
        println("Invalid quantity")
    }
}`,
    fixedCode: `fun main() {
    val quantity: Any = 4
    val pricePerItem = 3
    if (quantity is Int) {
        val total = pricePerItem * quantity
        println("Total: $total")
    } else {
        println("Invalid quantity")
    }
}`,
    expectedOutput: 'Total: 12',
    hints: [
      'Look closely at which type is being checked for -- does it match what quantity actually holds?',
      'quantity is Any = 4, which is a number, not text -- so quantity is String will always be false here.',
      'Change quantity is String to quantity is Int so the correct branch runs and total gets calculated.'
    ],
    explanation:
      'quantity holds the number 4, but the code checks quantity is String, which is always false for a number -- so the program always falls into the else branch and never calculates the total. Changing the check to quantity is Int makes the if branch run, computing total = 3 * 4 = 12 and printing "Total: 12".'
  },
  mastered: {
    topicTitle: 'Type checks with is where appropriate',
    summary:
      'You have mastered using is and !is to check a value\'s runtime type, combining type checks with other conditions, and diagnosed a real wrong-type-check logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'is and !is check a value\'s runtime type and return a Boolean' },
      { title: 'Examples explored', subtitle: '4 progressive is/!is patterns, including combining with &&' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved wrong-type-check logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// WORLD 3 BOSS: Grade & Eligibility System (world-3-boss)
// =========================================================================
export const WORLD_3_BOSS_LESSON: FiveStageLesson = {
  id: 'world-3-boss',
  worldId: 'world-3',
  worldName: 'Decision Maker',
  stageName: 'STAGE 3 — CONDITIONS',
  topicTitle: 'Grade & Eligibility System',
  learn: {
    title: 'World 3 Boss: Grade & Eligibility System',
    subtitle:
      'Congratulations on reaching the World 3 Boss! You will now combine everything you learned in Decision Maker -- if/else-if chains, when with ranges, when as an expression, and combined && / || conditions -- into a single decision-making program.',
    exampleTag: 'CAPSTONE',
    exampleTitle: 'Classifying a grade and checking eligibility together',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    val score = 84',
      '    val attendance = 92',
      '    val hasNoInfractions = true',
      '',
      '    val grade = when (score) {',
      '        in 90..100 -> "A"',
      '        in 80..89 -> "B"',
      '        in 70..79 -> "C"',
      '        in 60..69 -> "D"',
      '        else -> "F"',
      '    }',
      '    val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions',
      '',
      '    println("Grade: $grade")',
      '    println("Eligible: $isEligible")',
      '}'
    ],
    explanation:
      'A single decision-making program can lean on when-as-an-expression to classify a value into categories, and on if/&&/|| logic to combine multiple independent conditions into one true/false decision.',
    keyIdeas: [
      { number: 1, title: 'when as an expression', description: 'Assigning the result of a when block directly to a val, so each branch produces the value.' },
      { number: 2, title: 'Ranges select a branch', description: '`in 90..100 -> "A"` checks the branches top-to-bottom, like an if / else-if chain.' },
      { number: 3, title: 'Combining && and ||', description: 'Parentheses group an OR of alternatives, then && requires an additional condition on top.' },
      { number: 4, title: 'World 3 Mastery', description: 'Proves you can combine conditions, ranges, and expressions into one working decision engine.' }
    ],
    keyTakeaway: 'You now possess the tools to make Kotlin programs that branch, classify, and decide.'
  },
  explore: {
    title: 'Explore the Capstone Architecture',
    subtitle: 'Review how ranged when-expressions and combined conditions work together.',
    cards: [
      {
        id: 'card-boss-1',
        number: '01',
        title: 'Classifying with when-as-expression',
        language: 'Kotlin',
        subtitle: 'A when block assigned straight to a val.',
        code: ['val score = 73', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 70..79 -> "C"', '    else -> "F"', '}', 'println("Grade: $grade")'],
        whatItMeans: [
          { label: 'val grade = when (score)', description: 'The when block itself produces the value stored in grade' },
          { label: 'in 70..79 -> "C"', description: '73 falls in this range, so "C" is the result' }
        ],
        whatChanged: 'Used when as an expression instead of a statement.'
      },
      {
        id: 'card-boss-2',
        number: '02',
        title: 'Eligibility with a combined condition',
        language: 'Kotlin',
        subtitle: 'Two boolean values joined with &&.',
        code: ['val attendance = 96', 'val hasNoInfractions = true', 'val isEligible = attendance >= 95 && hasNoInfractions', 'println("Eligible: $isEligible")'],
        whatItMeans: [{ label: 'attendance >= 95 && hasNoInfractions', description: 'Both conditions must be true for isEligible to be true' }],
        whatChanged: 'Combined two independent boolean checks into one decision.'
      },
      {
        id: 'card-boss-3',
        number: '03',
        title: 'Grouping OR before AND',
        language: 'Kotlin',
        subtitle: 'Parentheses control which conditions combine first.',
        code: ['val score = 91', 'val attendance = 70', 'val hasNoInfractions = true', 'val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions', 'println("Eligible: $isEligible")'],
        whatItMeans: [
          { label: '(score >= 90 || attendance >= 95)', description: 'Either alternative alone can satisfy this group' },
          { label: '&& hasNoInfractions', description: 'The group result still needs this final condition to be true' }
        ],
        whatChanged: 'Grouped an OR of alternatives, then required an extra AND condition.'
      },
      {
        id: 'card-boss-4',
        number: '04',
        title: 'Grade and eligibility together',
        language: 'Kotlin',
        subtitle: 'The full capstone pattern in one program.',
        code: [
          'val score = 65',
          'val attendance = 80',
          'val hasNoInfractions = true',
          'val grade = when (score) {',
          '    in 90..100 -> "A"',
          '    in 80..89 -> "B"',
          '    in 60..69 -> "D"',
          '    else -> "F"',
          '}',
          'val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions',
          'println("Grade: $grade | Eligible: $isEligible")'
        ],
        whatItMeans: [
          { label: 'grade', description: 'Computed independently from the when-expression' },
          { label: 'isEligible', description: 'Computed independently from the combined condition' }
        ],
        whatChanged: 'Ran both decision systems side by side in the same program.'
      }
    ]
  },
  predict: {
    title: 'Predict Capstone Program Output',
    subtitle: 'Test your holistic understanding of World 3 concepts.',
    questions: [
      {
        id: 'pred-boss-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'A range branch matches',
        topicMeta: 'when with ranges',
        language: 'Kotlin',
        code: ['val score = 68', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 80..89 -> "B"', '    in 70..79 -> "C"', '    in 60..69 -> "D"', '    else -> "F"', '}', 'println("Grade: $grade")'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'Grade: D', isCorrect: true },
          { id: 'B', label: 'Grade: F', isCorrect: false },
          { id: 'C', label: 'Grade: C', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'in 60..69 -> "D"', detail: '68 falls inside 60..69, so grade becomes "D" and the program prints "Grade: D".' }
      },
      {
        id: 'pred-boss-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Falling through to else',
        topicMeta: 'when with ranges',
        language: 'Kotlin',
        code: ['val score = 55', 'val grade = when (score) {', '    in 90..100 -> "A"', '    in 80..89 -> "B"', '    else -> "F"', '}', 'println("Grade: $grade")'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'Grade: F', isCorrect: true },
          { id: 'B', label: 'Grade: B', isCorrect: false },
          { id: 'C', label: 'Nothing is printed', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: 'else -> "F"', detail: '55 matches neither 90..100 nor 80..89, so the else branch runs and grade becomes "F".' }
      },
      {
        id: 'pred-boss-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'OR makes the group true',
        topicMeta: 'Combined && / || conditions',
        language: 'Kotlin',
        code: ['val score = 82', 'val attendance = 98', 'val hasNoInfractions = true', 'val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions', 'println("Eligible: $isEligible")'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'Eligible: true', isCorrect: true },
          { id: 'B', label: 'Eligible: false', isCorrect: false },
          { id: 'C', label: 'Eligible: 98', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: '(score >= 90 || attendance >= 95)', detail: 'score >= 90 is false, but attendance >= 95 (98 >= 95) is true, so the OR group is true; combined with hasNoInfractions (true) via &&, isEligible is true.' }
      },
      {
        id: 'pred-boss-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'AND still requires the last condition',
        topicMeta: 'Combined && / || conditions',
        language: 'Kotlin',
        code: ['val score = 97', 'val attendance = 60', 'val hasNoInfractions = false', 'val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions', 'println("Eligible: $isEligible")'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'Eligible: false', isCorrect: true },
          { id: 'B', label: 'Eligible: true', isCorrect: false },
          { id: 'C', label: 'Eligible: 97', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: { codeRef: '&& hasNoInfractions', detail: 'score >= 90 is true, so the OR group is true -- but && still requires hasNoInfractions, which is false, so isEligible is false overall.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 50,
    title: 'Build the Grade & Eligibility Program',
    description:
      'Declare val score = 88, val attendance = 90, and val hasNoInfractions = true.\n\n' +
      '1. Compute val grade using a when (score) expression:\n' +
      '   • in 90..100 -> "A"\n' +
      '   • in 80..89 -> "B"\n' +
      '   • in 70..79 -> "C"\n' +
      '   • in 60..69 -> "D"\n' +
      '   • else -> "F"\n\n' +
      '2. Compute val isEligible using boolean logic:\n' +
      '   (score >= 90 || attendance >= 95) && hasNoInfractions\n\n' +
      '3. Print "Grade: $grade".\n\n' +
      '4. Print "Eligible: $isEligible".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'GradeEligibility.kt',
    initialCode: `fun main() {
    val score = 88
    val attendance = 90
    val hasNoInfractions = true

    // 1. Compute val grade with a when-expression (ranges: 90..100 -> "A", 80..89 -> "B", etc.):

    // 2. Compute val isEligible as (score >= 90 || attendance >= 95) && hasNoInfractions:

    // 3. Print "Grade: $grade" and "Eligible: $isEligible":
}`,
    solutionCode: `fun main() {
    val score = 88
    val attendance = 90
    val hasNoInfractions = true

    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        in 60..69 -> "D"
        else -> "F"
    }
    val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions

    println("Grade: $grade")
    println("Eligible: $isEligible")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Grade: B\nEligible: false',
    testCase: { call: '', expected: 'Grade: B\nEligible: false' }
  },
  debug: {
    title: 'Fix the Broken Grade & Eligibility Program',
    subtitle: 'Two integration bugs are hiding in this capstone program -- find and fix both.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'hard',
    bugType: 'logic',
    bugLabel: 'Wrong when-range order and wrong logical operator',
    brokenCode: `fun main() {
    val score = 95
    val attendance = 82
    val hasNoInfractions = false

    val grade = when (score) {
        in 80..100 -> "B"
        in 90..100 -> "A"
        in 70..79 -> "C"
        in 60..69 -> "D"
        else -> "F"
    }
    val isEligible = (score >= 90 || attendance >= 95) || hasNoInfractions

    println("Grade: $grade")
    println("Eligible: $isEligible")
}`,
    fixedCode: `fun main() {
    val score = 95
    val attendance = 82
    val hasNoInfractions = false

    val grade = when (score) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        in 60..69 -> "D"
        else -> "F"
    }
    val isEligible = (score >= 90 || attendance >= 95) && hasNoInfractions

    println("Grade: $grade")
    println("Eligible: $isEligible")
}`,
    expectedOutput: 'Grade: A\nEligible: false',
    hints: [
      'Something is off both in how the score becomes a letter grade and in how eligibility is decided.',
      'Look at the order of the when ranges -- could an earlier, wider range be catching scores meant for a later, narrower range? Also check whether the eligibility check should require hasNoInfractions or merely allow it as an alternative.',
      'in 80..100 must not come before in 90..100, and the final operator before hasNoInfractions must be && (AND), not || (OR).'
    ],
    explanation:
      'when branches are checked top-to-bottom like an if / else-if chain, so a wider earlier range (in 80..100) silently swallows scores meant for a narrower, later range (in 90..100) -- ranges must go from most specific to least specific. Separately, eligibility must require hasNoInfractions to be true, not merely allow it as an alternative, so the combining operator must be && rather than ||.'
  },
  mastered: {
    topicTitle: 'Grade & Eligibility System',
    summary: 'You defeated the World 3 Boss! You demonstrated full mastery of Decision Maker: if/else-if chains, when with ranges, when as an expression, and combining conditions with && and ||.',
    passedCount: '4 / 4 PASSED',
    verificationItems: [
      { title: 'Conditions mastered', subtitle: 'if, if-else, else-if, and when as statements' },
      { title: 'Ranges mastered', subtitle: 'when branches matched with in a..b range checks' },
      { title: 'when as an expression', subtitle: 'Assigning a when block’s result directly to a val' },
      { title: 'World 3 Boss Defeated', subtitle: 'Awarded Decision Maker Master Badge' }
    ],
    xpEarned: 50,
    streakDays: 1,
    accuracy: '100%'
  }
};
