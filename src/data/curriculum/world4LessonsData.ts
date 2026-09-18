import { FiveStageLesson } from '../lessonStagesData';

// =========================================================================
// LESSON 1: for (world-4-for)
// =========================================================================
export const FOR_LESSON: FiveStageLesson = {
  id: 'world-4-for',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'for',
  learn: {
    title: 'Repeating Code with for',
    subtitle:
      'A for loop lets your program run the same block of code once for every value in a range, instead of writing the same line over and over. for (i in a..b) counts from a to b, inclusive of both ends, and gives you the current value through the loop variable i.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'The for loop',
    language: 'Kotlin',
    codeSnippet: ['for (i in 1..5) {', '    println(i)', '}'],
    explanation:
      'for (i in 1..5) creates a loop variable named i and runs the block once for every value in the range 1..5 -- that is 1, 2, 3, 4, and 5, in order. Each time through, i holds the current value, so println(i) prints a different number on each pass: 1, then 2, then 3, then 4, then 5. Notice the range includes both ends -- 5 is printed too, not stopped before.',
    keyIdeas: [
      { number: 1, title: 'for repeats a known number of times', description: 'Use for (i in a..b) to run a block once for every value between a and b, without writing the same code repeatedly.' },
      { number: 2, title: 'The range is inclusive on both ends', description: 'a..b includes both a and b. for (i in 1..5) visits 1, 2, 3, 4, and 5 -- it does not stop before reaching 5.' },
      { number: 3, title: 'i is available inside the block', description: 'The loop variable (here, i) holds the current value on each pass, and can be used anywhere inside the loop body -- printed directly, or used in a calculation.' },
      { number: 4, title: 'The body runs once per value, in order', description: 'The block executes completely for i = 1, then completely for i = 2, and so on, moving to the next value only after the current pass finishes.' }
    ],
    keyTakeaway: 'for (i in a..b) { ... } runs the block once for every value from a to b inclusive, with i holding the current value each time.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See for count through an inclusive range, expose its loop variable inside the block, and build up a running total.',
    cards: [
      {
        id: 'card-for-1',
        number: '01',
        title: 'A basic for loop',
        language: 'Kotlin',
        subtitle: 'Run the same line once for each value in the range.',
        code: ['for (i in 1..3) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'for (i in 1..3)', description: 'Creates a loop variable i that takes the values 1, 2, then 3' },
          { label: 'println(i)', description: 'Runs once per value, printing the current value of i each time' }
        ],
        whatChanged: 'Introduced the basic for loop, counting up through a small inclusive range.'
      },
      {
        id: 'card-for-2',
        number: '02',
        title: 'The range includes both ends',
        language: 'Kotlin',
        subtitle: 'Even a range with a single value still runs the loop body once.',
        code: ['for (i in 4..4) {', '    println("Ran once")', '}'],
        whatItMeans: [
          { label: '4..4', description: 'A range whose start and end are the same value still contains that one value, 4' },
          { label: 'Result', description: 'The loop body runs exactly once, printing "Ran once" -- not zero times' }
        ],
        whatChanged: 'Confirmed the range is inclusive on both ends, using a range that contains only a single value.'
      },
      {
        id: 'card-for-3',
        number: '03',
        title: 'Using the loop variable in a calculation',
        language: 'Kotlin',
        subtitle: 'i is a normal value -- use it in expressions, not just println(i) directly.',
        code: ['for (i in 1..4) {', '    println(i * i)', '}'],
        whatItMeans: [
          { label: 'i * i', description: 'Multiplies the current loop value by itself' },
          { label: 'Result', description: 'Prints 1, 4, 9, then 16 -- the square of each value from 1 to 4' }
        ],
        whatChanged: 'Used the loop variable inside a calculation instead of printing it unchanged.'
      },
      {
        id: 'card-for-4',
        number: '04',
        title: 'Building a running total',
        language: 'Kotlin',
        subtitle: 'Combine a for loop with a mutable accumulator variable.',
        code: ['var total = 0', 'for (i in 1..5) {', '    total = total + i', '}', 'println(total)'],
        whatItMeans: [
          { label: 'var total = 0', description: 'A mutable variable that starts at 0, ready to accumulate a sum' },
          { label: 'total = total + i', description: 'On each pass, adds the current loop value to the running total' },
          { label: 'Result', description: 'After the loop finishes, total holds 1 + 2 + 3 + 4 + 5, which is 15' }
        ],
        whatChanged: 'Combined the for loop with an accumulator variable to build up a sum across every iteration.'
      },
      {
        id: 'card-for-5',
        number: '05',
        title: 'Range bounds from variables',
        language: 'Kotlin',
        subtitle: "A range's start and end don't have to be literal numbers.",
        code: ['val start = 2', 'val end = 5', 'for (i in start..end) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'start..end', description: 'The range bounds come from variables instead of literal numbers' },
          { label: 'Result', description: 'i takes the values 2, 3, 4, then 5, since start is 2 and end is 5' }
        ],
        whatChanged: "Used variables instead of literal numbers as the range's bounds."
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace the range the for loop counts through, then predict exactly what gets printed.',
    questions: [
      {
        id: 'pred-for-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'A Basic Count-Up',
        topicMeta: 'Basic for loop',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..4) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n3\n4', isCorrect: true },
          { id: 'B', label: '1\n2\n3', isCorrect: false },
          { id: 'C', label: '0\n1\n2\n3', isCorrect: false },
          { id: 'D', label: '4', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 1..4)', detail: '1..4 includes both ends, so i takes the values 1, 2, 3, and 4 in order, printing each one on its own line.' }
      },
      {
        id: 'pred-for-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'A Single-Value Range',
        topicMeta: 'Inclusive range',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 7..7) {', '        println("Value: $i")', '    }', '    println("Done")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Value: 7\nDone', isCorrect: true },
          { id: 'B', label: 'Done', isCorrect: false },
          { id: 'C', label: 'Value: 7', isCorrect: false },
          { id: 'D', label: 'Value: 7\nValue: 7\nDone', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 7..7)', detail: '7..7 still contains the value 7, so the loop body runs exactly once, printing "Value: 7". Then "Done" prints after the loop finishes.' }
      },
      {
        id: 'pred-for-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Using i in an Expression',
        topicMeta: 'Loop variable in a calculation',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..3) {', '        println(i * 10)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '10\n20\n30', isCorrect: true },
          { id: 'B', label: '1\n2\n3', isCorrect: false },
          { id: 'C', label: '10\n20\n30\n40', isCorrect: false },
          { id: 'D', label: '30', isCorrect: false }
        ],
        explanation: { codeRef: 'println(i * 10)', detail: 'i takes 1, 2, then 3. Each pass prints i * 10, giving 10, 20, and 30 in order.' }
      },
      {
        id: 'pred-for-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Summing with an Accumulator',
        topicMeta: 'Accumulator pattern',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 1..5) {', '        total = total + i', '    }', '    println(total)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '15', isCorrect: true },
          { id: 'B', label: '10', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: '0', isCorrect: false }
        ],
        explanation: { codeRef: 'total = total + i', detail: 'total starts at 0 and adds each value from 1 to 5 inclusive: 0+1+2+3+4+5 = 15, which is what println(total) prints.' }
      },
      {
        id: 'pred-for-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Range from Variables',
        topicMeta: 'Variable range bounds',
        language: 'Kotlin',
        code: ['fun main() {', '    val start = 3', '    val end = 5', '    for (i in start..end) {', '        println("Item $i")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Item 3\nItem 4\nItem 5', isCorrect: true },
          { id: 'B', label: 'Item 3\nItem 4', isCorrect: false },
          { id: 'C', label: 'Item 4\nItem 5', isCorrect: false },
          { id: 'D', label: 'Item 3\nItem 4\nItem 5\nItem 6', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in start..end)', detail: 'start is 3 and end is 5, so start..end is 3..5, which includes both ends: i takes 3, 4, then 5, printing "Item 3", "Item 4", and "Item 5".' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Sum of a Range',
    description:
      'Declare var total = 0.\n\n' +
      '1. Use a for loop over the range 1..5 to visit numbers 1 to 5 inclusive.\n\n' +
      '2. Inside the loop, add each number to total.\n\n' +
      '3. Print the result as:\n' +
      '"Sum: 15" using string templates ($total)',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'SumOfRange.kt',
    initialCode: `fun main() {
    var total = 0

    // 1. Use a for loop over 1..5 to add each number to total:

    // 2. Print "Sum: $total":
    println("Sum: $total")
}`,
    solutionCode: `fun main() {
    var total = 0
    for (i in 1..5) {
        total = total + i
    }
    println("Sum: $total")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Sum: 15',
    testCase: { call: '', expected: 'Sum: 15' }
  },
  debug: {
    title: 'Fix the Five-Day Countdown',
    subtitle: 'The loop should print Day 1 through Day 5, but it stops one day short -- find and fix the range.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Range Upper Bound',
    brokenCode: `fun main() {
    // BUG: this should print Day 1 through Day 5, but stops one short!
    for (day in 1..4) {
        println("Day $day")
    }
}`,
    fixedCode: `fun main() {
    for (day in 1..5) {
        println("Day $day")
    }
}`,
    expectedOutput: 'Day 1\nDay 2\nDay 3\nDay 4\nDay 5',
    hints: [
      'Something is wrong with how many times the loop runs.',
      'How many days should this loop print -- check the upper bound of the range.',
      "Check the range's upper bound: 1..4 stops at 4, but the loop needs to include 5 as well."
    ],
    explanation:
      "for (day in 1..4) only includes the values 1, 2, 3, and 4, so the loop stops after printing \"Day 4\" and \"Day 5\" never prints. Changing the range's upper bound to 1..5 includes 5 as well, so all five lines print, from \"Day 1\" through \"Day 5\"."
  },
  mastered: {
    topicTitle: 'for',
    summary: 'You have mastered the for loop: counting through an inclusive range with for (i in a..b), using the loop variable inside the block, building a running total with an accumulator, and diagnosing a real wrong-upper-bound logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'for (i in a..b) runs its block once for every value from a to b, inclusive' },
      { title: 'Examples explored', subtitle: '5 progressive for-loop patterns, from a basic count-up to variable range bounds' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved wrong-range-upper-bound logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 2: while (world-4-while)
// =========================================================================
export const WHILE_LESSON: FiveStageLesson = {
  id: 'world-4-while',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'while',
  learn: {
    title: 'Repeating Until a Condition Changes',
    subtitle:
      "A for loop is perfect when you already know how many times to repeat -- iterate a range, and you're done. But sometimes you don't know the number of iterations in advance; you only know you should keep going while some condition stays true. That's what while is for.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'The while loop',
    language: 'Kotlin',
    codeSnippet: [
      'var ticketsLeft = 3',
      'while (ticketsLeft > 0) {',
      '    println("Selling ticket #$ticketsLeft")',
      '    ticketsLeft--',
      '}',
      'println("Sold out")'
    ],
    explanation:
      'Before every single pass through the loop -- including the very first one -- Kotlin checks ticketsLeft > 0. While it stays true, the body runs: it prints the current ticket number, then decreases ticketsLeft by 1. Once ticketsLeft reaches 0, the condition becomes false, the loop stops, and execution continues with the line after it, printing "Sold out".',
    keyIdeas: [
      { number: 1, title: 'The condition is checked before every iteration', description: 'Including the very first one. If the condition is already false the moment the loop is reached, the body never runs at all -- not even once.' },
      { number: 2, title: 'The body must eventually make the condition false', description: 'Nothing stops a while loop automatically. If nothing inside the body changes the value the condition depends on, the condition stays true forever and the loop never ends -- an infinite loop.' },
      { number: 3, title: 'A var counter usually drives the loop', description: 'A typical pattern declares a var before the loop, checks it in the condition, and updates it (ticketsLeft--, count++, etc.) somewhere inside the body so the loop eventually terminates.' },
      { number: 4, title: 'Use while when the iteration count is not known ahead of time', description: "for (i in 1..5) is ideal when you already know exactly how many times to repeat. while (condition) is for when the number of repeats depends on something that changes as the program runs -- like counting down a stock of tickets, or processing values until a target is reached." }
    ],
    keyTakeaway: 'while (condition) { ... } repeats its block for as long as condition stays true, checking BEFORE every iteration -- and it is up to the body to eventually make that condition false, or the loop never stops.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See while check its condition before every pass, sometimes run zero times, and combine with if/else from World 3.',
    cards: [
      {
        id: 'card-while-1',
        number: '01',
        title: 'Counting up with while',
        language: 'Kotlin',
        subtitle: 'A var counter increases until the condition turns false.',
        code: ['var count = 1', 'while (count <= 3) {', '    println(count)', '    count++', '}'],
        whatItMeans: [
          { label: 'var count = 1', description: 'A mutable counter the condition will check' },
          { label: 'count <= 3', description: 'Checked before every pass -- true for 1, 2, and 3' },
          { label: 'count++', description: 'Increases count so the condition eventually becomes false' }
        ],
        whatChanged: 'Introduced the basic while loop: a condition checked before each pass, and a counter updated inside the body.'
      },
      {
        id: 'card-while-2',
        number: '02',
        title: 'A condition that is false from the start',
        language: 'Kotlin',
        subtitle: 'When the condition is already false, the body never runs -- not even once.',
        code: ['var attempts = 5', 'while (attempts < 3) {', '    println("Retrying")', '    attempts++', '}', 'println("No retries needed")'],
        whatItMeans: [
          { label: 'attempts < 3', description: 'attempts is 5, so 5 < 3 is false the very first time it is checked' },
          { label: 'Result', description: 'The loop body is skipped completely -- "Retrying" never prints, only "No retries needed" does' }
        ],
        whatChanged: 'Showed that the condition is checked BEFORE the first iteration too -- a loop can run zero times.'
      },
      {
        id: 'card-while-3',
        number: '03',
        title: 'Looping until a target is reached',
        language: 'Kotlin',
        subtitle: 'Ideal for while: the number of passes is not known in advance.',
        code: ['var price = 100', 'while (price > 50) {', '    price -= 20', '}', 'println(price)'],
        whatItMeans: [
          { label: 'price > 50', description: 'Keeps discounting price by 20 as long as it is still above 50' },
          { label: 'price -= 20', description: '100 -> 80 -> 60 -> 40, then the condition finally turns false' },
          { label: 'Result', description: 'Prints 40 -- unlike a for loop, nothing here told Kotlin in advance how many times to repeat' }
        ],
        whatChanged: 'Used while for a case where the iteration count depends on the data, not a fixed range.'
      },
      {
        id: 'card-while-4',
        number: '04',
        title: 'Combining while with if/else',
        language: 'Kotlin',
        subtitle: 'The loop body can contain any code you already know, including conditions.',
        code: ['var n = 1', 'while (n <= 5) {', '    if (n % 2 == 0) {', '        println("$n is even")', '    }', '    n++', '}'],
        whatItMeans: [
          { label: 'while (n <= 5)', description: 'Repeats for n = 1 through 5' },
          { label: 'if (n % 2 == 0)', description: 'Only even values of n trigger a println inside the loop body' },
          { label: 'Result', description: 'Prints "2 is even" and "4 is even" -- odd values are silently skipped by the if' }
        ],
        whatChanged: 'Nested an if inside a while loop body, combining this lesson with World 3\'s conditions.'
      },
      {
        id: 'card-while-5',
        number: '05',
        title: 'Updating the counter by more than one',
        language: 'Kotlin',
        subtitle: 'The update step does not have to be ++ or -- by exactly 1.',
        code: ['var fuel = 4', 'while (fuel > 0) {', '    println("Fuel remaining: $fuel")', '    fuel -= 2', '}', 'println("Out of fuel")'],
        whatItMeans: [
          { label: 'fuel > 0', description: 'Keeps the loop going while there is fuel left' },
          { label: 'fuel -= 2', description: 'Each pass drains 2 units instead of 1: 4 -> 2 -> 0' },
          { label: 'Result', description: 'Prints two "Fuel remaining" lines, then "Out of fuel" once fuel reaches 0' }
        ],
        whatChanged: 'Showed the counter update can change the condition variable by any amount, as long as it eventually makes the condition false.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace the condition before every pass through the loop, then predict exactly what gets printed.',
    questions: [
      {
        id: 'pred-while-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Basic Counting Loop',
        topicMeta: 'while with an incrementing counter',
        language: 'Kotlin',
        code: ['fun main() {', '    var i = 1', '    while (i <= 3) {', '        println(i)', '        i++', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n3', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4', isCorrect: false },
          { id: 'C', label: '0\n1\n2', isCorrect: false },
          { id: 'D', label: 'It never stops', isCorrect: false }
        ],
        explanation: { codeRef: 'while (i <= 3)', detail: 'i starts at 1 and is checked before each pass: 1 <= 3, 2 <= 3, and 3 <= 3 are all true, printing 1, 2, then 3. After i becomes 4, 4 <= 3 is false and the loop stops.' }
      },
      {
        id: 'pred-while-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'False From the Very Start',
        topicMeta: 'Zero iterations',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 10', '    while (count < 5) {', '        println("Looping")', '        count++', '    }', '    println("Done")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Done', isCorrect: true },
          { id: 'B', label: 'Looping\nDone', isCorrect: false },
          { id: 'C', label: 'Looping', isCorrect: false },
          { id: 'D', label: 'Nothing prints at all', isCorrect: false }
        ],
        explanation: { codeRef: 'while (count < 5)', detail: 'count starts at 10, and 10 < 5 is false the very first time it is checked -- before any iteration happens. The loop body never runs, not even once, so only "Done" prints.' }
      },
      {
        id: 'pred-while-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'Counting Down',
        topicMeta: 'while with a decrementing counter',
        language: 'Kotlin',
        code: ['fun main() {', '    var n = 3', '    while (n >= 1) {', '        println(n)', '        n--', '    }', '    println("Liftoff")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '3\n2\n1\nLiftoff', isCorrect: true },
          { id: 'B', label: '3\n2\n1\n0\nLiftoff', isCorrect: false },
          { id: 'C', label: 'Liftoff', isCorrect: false },
          { id: 'D', label: '2\n1\nLiftoff', isCorrect: false }
        ],
        explanation: { codeRef: 'while (n >= 1)', detail: 'n starts at 3. 3 >= 1, 2 >= 1, and 1 >= 1 are all true, printing 3, 2, then 1. Once n becomes 0, 0 >= 1 is false, the loop stops, and "Liftoff" prints.' }
      },
      {
        id: 'pred-while-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'while Combined With if/else',
        topicMeta: 'A condition inside the loop body',
        language: 'Kotlin',
        code: ['fun main() {', '    var num = 1', '    while (num <= 4) {', '        if (num % 2 == 0) {', '            println("Even: $num")', '        } else {', '            println("Odd: $num")', '        }', '        num++', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Odd: 1\nEven: 2\nOdd: 3\nEven: 4', isCorrect: true },
          { id: 'B', label: 'Even: 1\nOdd: 2\nEven: 3\nOdd: 4', isCorrect: false },
          { id: 'C', label: 'Odd: 1\nOdd: 3', isCorrect: false },
          { id: 'D', label: 'Even: 2\nEven: 4', isCorrect: false }
        ],
        explanation: { codeRef: 'if (num % 2 == 0)', detail: 'The loop runs for num = 1, 2, 3, 4. Each pass checks whether num is even: 1 is odd, 2 is even, 3 is odd, 4 is even, so the if/else prints "Odd: 1", "Even: 2", "Odd: 3", "Even: 4" in that order.' }
      },
      {
        id: 'pred-while-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Updating by More Than One',
        topicMeta: 'A non-1 counter step',
        language: 'Kotlin',
        code: ['fun main() {', '    var points = 20', '    while (points > 0) {', '        println(points)', '        points -= 5', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '20\n15\n10\n5', isCorrect: true },
          { id: 'B', label: '20\n15\n10\n5\n0', isCorrect: false },
          { id: 'C', label: '15\n10\n5\n0', isCorrect: false },
          { id: 'D', label: '20', isCorrect: false }
        ],
        explanation: { codeRef: 'points -= 5', detail: 'points starts at 20 and decreases by 5 each pass: 20, 15, 10, 5 are all printed while points > 0 is true. Once points reaches 0, 0 > 0 is false and the loop stops before 0 is ever printed.' }
      },
      {
        id: 'pred-while-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'Unknown Iteration Count',
        topicMeta: 'while for a data-dependent stop point',
        language: 'Kotlin',
        code: ['fun main() {', '    var value = 3', '    while (value < 20) {', '        value *= 2', '    }', '    println(value)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '24', isCorrect: true },
          { id: 'B', label: '20', isCorrect: false },
          { id: 'C', label: '12', isCorrect: false },
          { id: 'D', label: '48', isCorrect: false }
        ],
        explanation: { codeRef: 'value *= 2', detail: 'value starts at 3 and doubles each pass while it stays below 20: 3 -> 6 -> 12 -> 24. Once value is 24, 24 < 20 is false, so the loop stops and 24 prints -- there was no way to know in advance exactly how many doublings that would take.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Countdown to Launch',
    description:
      'Declare var seconds = 5.\n\n' +
      '1. Use a while loop that runs while seconds > 0.\n\n' +
      '2. Inside the loop, print seconds and decrement it using seconds--.\n\n' +
      '3. After the loop ends, print "Go!".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'Countdown.kt',
    initialCode: `fun main() {
    var seconds = 5

    // 1. While seconds > 0, print seconds and decrease it by 1:

    // 2. After the loop ends, print "Go!":
}`,
    solutionCode: `fun main() {
    var seconds = 5
    while (seconds > 0) {
        println(seconds)
        seconds--
    }
    println("Go!")
}`,
    sampleInput: 'main()',
    expectedOutput: '5\n4\n3\n2\n1\nGo!',
    testCase: { call: '', expected: '5\n4\n3\n2\n1\nGo!' }
  },
  debug: {
    title: 'Diagnose the Missing Life',
    subtitle: 'The countdown is stopping one step too early -- identify why, and fix the loop condition.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Comparison Operator',
    brokenCode: `fun main() {
    var lives = 3
    // BUG: this condition stops the loop one iteration too early!
    while (lives > 1) {
        println("Lives: $lives")
        lives--
    }
    println("Game over")
}`,
    fixedCode: `fun main() {
    var lives = 3
    while (lives >= 1) {
        println("Lives: $lives")
        lives--
    }
    println("Game over")
}`,
    expectedOutput: 'Lives: 3\nLives: 2\nLives: 1\nGame over',
    hints: [
      'Something is wrong with the condition that decides when the loop stops, not with how lives is updated.',
      'Think about what value of lives should still trigger one more pass through the loop -- should the loop stop before or after printing "Lives: 1"?',
      'Check the comparison operator: lives > 1 excludes the case where lives equals 1, but the loop should still run for that value.'
    ],
    explanation:
      'lives > 1 becomes false as soon as lives reaches 1, so the loop stops before that final pass ever runs -- the program prints "Lives: 3" and "Lives: 2", then jumps straight to "Game over", skipping "Lives: 1" entirely. Changing the comparison to lives >= 1 lets the loop still run when lives equals 1, correctly printing "Lives: 1" before the countdown ends.'
  },
  mastered: {
    topicTitle: 'while',
    summary:
      'You have mastered the while loop: repeating a block for as long as a Boolean condition stays true, checking that condition before every single pass (including the first), using a var counter to eventually make it false, and diagnosing a real wrong-operator logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'while repeats its block while its condition is true, checked before every pass' },
      { title: 'Examples explored', subtitle: '5 progressive while patterns, from counting up to a data-dependent stop point' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including a zero-iteration case' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved wrong-comparison-operator logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 3: do-while (world-4-do-while)
// =========================================================================
export const DO_WHILE_LESSON: FiveStageLesson = {
  id: 'world-4-do-while',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'do-while',
  learn: {
    title: 'Running the Body At Least Once with do-while',
    subtitle:
      "A while loop checks its condition BEFORE the body ever runs, so if the condition starts out false, the body is skipped entirely. A do-while loop checks its condition AFTER the body runs -- so the body always executes at least once, no matter what the condition was to begin with.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'do-while runs first, checks after',
    language: 'Kotlin',
    codeSnippet: [
      'var count = 5',
      'do {',
      '    println(count)',
      '    count++',
      '} while (count < 5)'
    ],
    explanation:
      'count starts at 5. A while loop would check count < 5 first -- 5 < 5 is false, so it would never run at all. But do-while runs the body FIRST: it prints 5 and increments count to 6. Only THEN does it check the condition, count < 5, which is 6 < 5 -- false. So the loop stops after exactly one pass, having printed "5" even though the condition was already false before the loop ever started.',
    keyIdeas: [
      { number: 1, title: 'Body runs first, condition checked after', description: 'do { ... } while (condition) always executes everything inside the braces once BEFORE it ever looks at the condition.' },
      { number: 2, title: 'Guaranteed at-least-once execution', description: 'Even if the condition is false from the very start, a do-while body still runs exactly one time -- this is the entire reason do-while exists as a separate loop.' },
      { number: 3, title: 'while can run zero times', description: 'A plain while loop checks its condition first, so if it starts false, the body never runs at all -- zero times, not once.' },
      { number: 4, title: 'The condition still controls repeats', description: 'After that guaranteed first run, do-while behaves just like while: it keeps repeating the body for as long as the condition stays true.' }
    ],
    keyTakeaway: 'do { ... } while (condition) always runs its body at least once, then keeps repeating only while condition stays true -- use it whenever something must happen before you can even check whether to continue.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See do-while run its body at least once, then compare it directly against a while loop facing the exact same starting condition.',
    cards: [
      {
        id: 'card-dowhile-1',
        number: '01',
        title: 'Basic do-while, repeating normally',
        language: 'Kotlin',
        subtitle: 'When the condition starts true, do-while looks just like a while loop.',
        code: ['var i = 1', 'do {', '    println(i)', '    i++', '} while (i <= 3)'],
        whatItMeans: [
          { label: 'do { ... }', description: 'runs first: prints 1, then i becomes 2' },
          { label: 'while (i <= 3)', description: 'checked after each pass -- true for i = 2 and i = 3, false once i becomes 4' },
          { label: 'Result', description: 'prints 1, 2, then 3, stopping once i reaches 4' }
        ],
        whatChanged: 'Introduced do-while repeating multiple times, same as a while loop would when its condition starts true.'
      },
      {
        id: 'card-dowhile-2',
        number: '02',
        title: 'The at-least-once guarantee',
        language: 'Kotlin',
        subtitle: "The condition is false from the very start -- but the body still runs once.",
        code: ['var attempts = 10', 'do {', '    println("Attempt: $attempts")', '    attempts++', '} while (attempts < 5)'],
        whatItMeans: [
          { label: 'attempts = 10', description: 'attempts < 5 is already false before the loop even begins' },
          { label: 'do { ... }', description: 'runs anyway -- prints "Attempt: 10" and increments attempts to 11' },
          { label: 'while (attempts < 5)', description: '11 < 5 is false, so the loop stops after that single guaranteed pass' }
        ],
        whatChanged: 'Proved the key do-while behavior: the body runs once even when the condition was never going to be true.'
      },
      {
        id: 'card-dowhile-3',
        number: '03',
        title: 'The same starting condition with while instead',
        language: 'Kotlin',
        subtitle: 'A plain while loop facing an initially-false condition never runs its body at all.',
        code: ['var stock = 0', 'while (stock > 0) {', '    println("Restocking")', '    stock--', '}', 'println("Check complete")'],
        whatItMeans: [
          { label: 'stock = 0', description: 'stock > 0 is false immediately' },
          { label: 'while (stock > 0)', description: 'checked BEFORE the body -- since it is false, the body is skipped entirely' },
          { label: 'Result', description: 'only "Check complete" prints -- "Restocking" never runs, not even once' }
        ],
        whatChanged: 'Contrasted do-while with a while loop under the same kind of initially-false condition, to show while can run zero times.'
      },
      {
        id: 'card-dowhile-4',
        number: '04',
        title: 'The do-while version of that same scenario',
        language: 'Kotlin',
        subtitle: 'Swapping to do-while with a similarly false-from-the-start condition still forces one run.',
        code: ['var tickets = 0', 'do {', '    println("Selling ticket")', '    tickets++', '} while (tickets < 0)'],
        whatItMeans: [
          { label: 'tickets = 0', description: 'tickets < 0 is already false -- a while loop here would never run' },
          { label: 'do { ... }', description: 'runs first regardless -- prints "Selling ticket" and tickets becomes 1' },
          { label: 'while (tickets < 0)', description: '1 < 0 is false, so the loop stops -- but only after that one guaranteed pass' }
        ],
        whatChanged: 'Directly mirrored card 03 with do-while instead of while, making the zero-times vs at-least-once difference concrete.'
      },
      {
        id: 'card-dowhile-5',
        number: '05',
        title: 'A realistic countdown with do-while',
        language: 'Kotlin',
        subtitle: 'Withdraw from a balance until it runs out, counting how many withdrawals happened.',
        code: ['var balance = 100', 'var withdrawals = 0', 'do {', '    balance -= 20', '    withdrawals++', '} while (balance > 0)', 'println("Withdrawals: $withdrawals")'],
        whatItMeans: [
          { label: 'do { ... }', description: 'each pass subtracts 20 from balance and counts the withdrawal' },
          { label: 'while (balance > 0)', description: 'checked after each withdrawal: 80, 60, 40, 20 are all > 0, but 0 is not' },
          { label: 'Result', description: 'runs 5 times (100 to 0 in steps of 20), printing "Withdrawals: 5"' }
        ],
        whatChanged: 'Used do-while for a realistic repeat-until-depleted task, with the loop driving its own exit condition.'
      },
      {
        id: 'card-dowhile-6',
        number: '06',
        title: 'Validating something that turns out fine right away',
        language: 'Kotlin',
        subtitle: 'do-while still checks once before deciding to stop -- even when nothing needed fixing.',
        code: ['var pin = 1234', 'var tries = 0', 'do {', '    tries++', '} while (pin != 1234 && tries < 3)', 'println("Tries: $tries")'],
        whatItMeans: [
          { label: 'do { tries++ }', description: 'always runs at least once, incrementing tries to 1' },
          { label: 'pin != 1234', description: 'false, since pin is already 1234 -- the && short-circuits to false' },
          { label: 'Result', description: 'the loop stops after that single pass, printing "Tries: 1"' }
        ],
        whatChanged: 'Modeled a validate-at-least-once scenario -- the check must be attempted once before we can know it already succeeded.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace the do-while loop by hand: run the body first, then check the condition -- and watch for cases where the condition was already false.',
    questions: [
      {
        id: 'pred-dowhile-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Basic Repetition',
        topicMeta: 'do-while running multiple times',
        language: 'Kotlin',
        code: ['fun main() {', '    var i = 1', '    do {', '        println(i)', '        i++', '    } while (i <= 3)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n3', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4', isCorrect: false },
          { id: 'C', label: '1', isCorrect: false },
          { id: 'D', label: 'Nothing is printed', isCorrect: false }
        ],
        explanation: { codeRef: 'while (i <= 3)', detail: 'i prints as 1, 2, and 3, incrementing each time. Once i becomes 4, the condition 4 <= 3 is false and the loop stops -- 4 is never printed.' }
      },
      {
        id: 'pred-dowhile-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'At-Least-Once with a False Start',
        topicMeta: 'The core do-while guarantee',
        language: 'Kotlin',
        code: ['fun main() {', '    var x = 10', '    do {', '        println("Running")', '        x++', '    } while (x < 5)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Running', isCorrect: true },
          { id: 'B', label: 'Running\nRunning', isCorrect: false },
          { id: 'C', label: 'Nothing is printed', isCorrect: false },
          { id: 'D', label: 'The loop runs forever', isCorrect: false }
        ],
        explanation: { codeRef: 'do { println("Running") ... } while (x < 5)', detail: 'x < 5 is already false when x is 10, but do-while runs its body BEFORE checking that. It prints "Running" once, x becomes 11, then 11 < 5 is false, so the loop stops after that single guaranteed pass.' }
      },
      {
        id: 'pred-dowhile-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'The while Version of the Same Idea',
        topicMeta: 'while skips the body entirely',
        language: 'Kotlin',
        code: ['fun main() {', '    var n = 0', '    while (n > 0) {', '        println("Loop")', '        n--', '    }', '    println("Done")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Done', isCorrect: true },
          { id: 'B', label: 'Loop\nDone', isCorrect: false },
          { id: 'C', label: 'Nothing is printed', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'while (n > 0)', detail: 'n is 0, so n > 0 is false before the loop ever starts. Because while checks its condition FIRST, the body never runs -- not even once. Only "Done" prints.' }
      },
      {
        id: 'pred-dowhile-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'Accumulating a Total',
        topicMeta: 'do-while with an accumulator',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    var n = 3', '    do {', '        total += n', '        n--', '    } while (n > 0)', '    println(total)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '6', isCorrect: true },
          { id: 'B', label: '3', isCorrect: false },
          { id: 'C', label: '9', isCorrect: false },
          { id: 'D', label: '0', isCorrect: false }
        ],
        explanation: { codeRef: 'total += n', detail: 'Pass 1: total = 0 + 3 = 3, n becomes 2 (2 > 0, continue). Pass 2: total = 3 + 2 = 5, n becomes 1 (1 > 0, continue). Pass 3: total = 5 + 1 = 6, n becomes 0 (0 > 0 is false, stop). Final total is 6.' }
      },
      {
        id: 'pred-dowhile-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Counting Down',
        topicMeta: 'do-while with a comparison operator',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 5', '    do {', '        println(count)', '        count--', '    } while (count >= 1)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '5\n4\n3\n2\n1', isCorrect: true },
          { id: 'B', label: '5\n4\n3\n2\n1\n0', isCorrect: false },
          { id: 'C', label: '5\n4\n3\n2', isCorrect: false },
          { id: 'D', label: '4\n3\n2\n1', isCorrect: false }
        ],
        explanation: { codeRef: 'while (count >= 1)', detail: 'count prints 5, 4, 3, 2, then 1, decrementing each pass. After printing 1, count becomes 0, and 0 >= 1 is false, so the loop stops -- 0 is never printed.' }
      },
      {
        id: 'pred-dowhile-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'A Boolean Condition, Already False',
        topicMeta: 'The at-least-once guarantee, again',
        language: 'Kotlin',
        code: ['fun main() {', '    var isReady = true', '    var checks = 0', '    do {', '        checks++', '    } while (!isReady)', '    println("Checks: $checks")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Checks: 1', isCorrect: true },
          { id: 'B', label: 'Checks: 0', isCorrect: false },
          { id: 'C', label: 'The loop runs forever', isCorrect: false },
          { id: 'D', label: 'Checks: 2', isCorrect: false }
        ],
        explanation: { codeRef: 'do { checks++ } while (!isReady)', detail: 'The body runs first regardless: checks becomes 1. Only then is !isReady checked -- isReady is true, so !isReady is false, and the loop stops. The do-while still guaranteed that one pass, so "Checks: 1" prints.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Count Up With do-while',
    description:
      'Declare var current = 1.\n\n' +
      '1. Use a do-while loop to print current and increment it.\n\n' +
      '2. Continue looping while current <= 4.\n\n' +
      '3. After the loop finishes, print "Done".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'CountUp.kt',
    initialCode: `fun main() {
    var current = 1

    // 1. Use a do-while loop to print current and increment it, while current <= 4:

    // 2. Print "Done" after the loop:
    println("Done")
}`,
    solutionCode: `fun main() {
    var current = 1
    do {
        println(current)
        current++
    } while (current <= 4)
    println("Done")
}`,
    sampleInput: 'main()',
    expectedOutput: '1\n2\n3\n4\nDone',
    testCase: { call: '', expected: '1\n2\n3\n4\nDone' }
  },
  debug: {
    title: 'Fix the Skipped Reminder',
    subtitle: 'A reminder must always be sent at least once, but the current loop wrongly skips it entirely.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: while Instead of do-while',
    brokenCode: `fun main() {
    var remindersSent = 1
    // BUG: a reminder must always be sent at least once, but plain while skips the body entirely!
    while (remindersSent < 1) {
        println("Reminder sent")
        remindersSent++
    }
    println("Reminders complete")
}`,
    fixedCode: `fun main() {
    var remindersSent = 1
    do {
        println("Reminder sent")
        remindersSent++
    } while (remindersSent < 1)
    println("Reminders complete")
}`,
    expectedOutput: 'Reminder sent\nReminders complete',
    hints: [
      'Something is wrong with when the loop body gets a chance to run.',
      'remindersSent starts at 1, and the condition is remindersSent < 1 -- what happens the very first time a while loop checks that?',
      'Check which loop keyword checks its condition AFTER the body runs instead of before -- that is the one that guarantees the reminder is always sent at least once.'
    ],
    explanation: 'remindersSent starts at 1, so remindersSent < 1 is false before the loop ever begins. A plain while checks its condition first, so the body never runs -- "Reminder sent" never prints, and only "Reminders complete" appears. Switching to do-while runs the body FIRST regardless: it prints "Reminder sent" and increments remindersSent to 2, and only then checks 2 < 1 (false), stopping the loop. The guaranteed first pass is exactly what the reminder requirement needed.'
  },
  mastered: {
    topicTitle: 'do-while',
    summary: 'You have mastered the do-while loop: understanding that its body always runs at least once before the condition is ever checked, contrasting that against a while loop facing the same starting condition, tracing accumulator and countdown behavior, writing a working do-while program, and diagnosing a real at-least-once logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'do { ... } while (condition) always runs its body at least once, checking the condition only after' },
      { title: 'Examples explored', subtitle: '6 progressive do-while patterns, including a direct while-vs-do-while contrast pair' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including two false-from-the-start guarantee cases' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a while-instead-of-do-while logic defect that skipped a required first run' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 4: Ranges (world-4-ranges)
// =========================================================================
export const RANGES_LESSON: FiveStageLesson = {
  id: 'world-4-ranges',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'Ranges',
  learn: {
    title: 'What is a Range?',
    subtitle:
      "A range like 1..5 represents a consecutive, inclusive sequence of values from 1 up to and including 5. In this engine, a range only works in two places: directly inside a for-loop header to drive iteration, or directly inside a membership check with in / !in to test whether a value falls between two bounds -- both ends are always included.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'The same range, two ways',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..5) {',
      '    println(i)',
      '}',
      '',
      'val age = 15',
      'if (age in 13..19) {',
      '    println("Teenager")',
      '}'
    ],
    explanation:
      '1..5 describes the inclusive sequence 1, 2, 3, 4, 5 -- the for-loop visits each of those values in order. Separately, age in 13..19 asks a yes/no question: is 15 anywhere between 13 and 19 inclusive? It is, so "Teenager" prints. Both lines use the same a..b syntax, but one drives a loop and the other tests membership.',
    keyIdeas: [
      { number: 1, title: 'A range is a consecutive, inclusive sequence', description: '1..5 means every whole number from 1 to 5, with neither end excluded.' },
      { number: 2, title: 'Use #1: driving a for-loop', description: 'for (i in a..b) { ... } visits every value in the range, from a up to b, one at a time.' },
      { number: 3, title: 'Use #2: testing membership', description: 'x in a..b asks whether x falls inside the range, producing true or false -- perfect for if conditions.' },
      { number: 4, title: '!in tests the opposite', description: 'x !in a..b is true whenever x falls outside the range entirely.' },
      { number: 5, title: 'Both endpoints are always included', description: 'In 1..5, both 1 and 5 count as being inside the range -- neither boundary is ever skipped.' }
    ],
    keyTakeaway: 'a..b describes an inclusive sequence of values -- use it to drive a for-loop, or to ask "is this value in between?" with in / !in. Both ends always count.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a basic loop range to variable bounds, membership checks, and inclusive boundaries.',
    cards: [
      {
        id: 'card-ranges-1',
        number: '01',
        title: 'A basic for-loop range',
        language: 'Kotlin',
        subtitle: 'Iterate through every value from 1 to 5, inclusive.',
        code: ['for (i in 1..5) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '1..5', description: 'The inclusive sequence 1, 2, 3, 4, 5' },
          { label: 'for (i in 1..5)', description: 'Visits each of those five values in order, one per pass' }
        ],
        whatChanged: 'Used a range to drive repetition through a fixed sequence of numbers.'
      },
      {
        id: 'card-ranges-2',
        number: '02',
        title: 'A for-loop range with variable bounds',
        language: 'Kotlin',
        subtitle: "A range's start and end can come from variables, not just literal numbers.",
        code: ['val start = 3', 'val end = 6', 'for (i in start..end) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'start..end', description: 'Builds the range from the current values of start and end: 3..6' },
          { label: 'Result', description: 'Prints 3, 4, 5, 6 -- exactly as if it had been written 3..6 directly' }
        ],
        whatChanged: 'Showed that a for-loop range can be built from variables instead of hardcoded numbers.'
      },
      {
        id: 'card-ranges-3',
        number: '03',
        title: 'Membership check with in',
        language: 'Kotlin',
        subtitle: 'Ask whether a value falls inside a range, without looping at all.',
        code: ['val age = 15', 'if (age in 13..19) {', '    println("Teenager")', '}'],
        whatItMeans: [
          { label: 'age in 13..19', description: 'Evaluates to true if age is anywhere between 13 and 19 inclusive' },
          { label: 'Result', description: '15 is inside that range, so "Teenager" prints' }
        ],
        whatChanged: 'Used a range as a yes/no membership test instead of a loop subject.'
      },
      {
        id: 'card-ranges-4',
        number: '04',
        title: 'Membership check with !in',
        language: 'Kotlin',
        subtitle: 'Test whether a value falls outside a range.',
        code: ['val age = 25', 'if (age !in 13..19) {', '    println("Not a teenager")', '}'],
        whatItMeans: [
          { label: 'age !in 13..19', description: 'Evaluates to true if age is NOT between 13 and 19' },
          { label: 'Result', description: '25 falls outside that range, so "Not a teenager" prints' }
        ],
        whatChanged: 'Negated the membership check with !in to test for exclusion instead of inclusion.'
      },
      {
        id: 'card-ranges-5',
        number: '05',
        title: 'Inclusive boundary in a membership check',
        language: 'Kotlin',
        subtitle: 'The exact endpoint value still counts as a match.',
        code: ['val score = 100', 'if (score in 90..100) {', '    println("Top score")', '}'],
        whatItMeans: [
          { label: 'score = 100', description: 'Exactly matches the upper boundary of the range' },
          { label: '90..100', description: 'Includes 100 itself, since ranges never exclude their own endpoints' }
        ],
        whatChanged: 'Verified that a boundary value at the very edge of a range still counts as inside it.'
      },
      {
        id: 'card-ranges-6',
        number: '06',
        title: 'Combining a loop range with a membership check',
        language: 'Kotlin',
        subtitle: 'The two supported uses of a range can work together in the same program.',
        code: ['for (i in 1..10) {', '    if (i in 4..6) {', '        println(i)', '    }', '}'],
        whatItMeans: [
          { label: 'for (i in 1..10)', description: 'Drives the loop through every value from 1 to 10' },
          { label: 'if (i in 4..6)', description: 'On each pass, tests whether the current i also falls inside a second, narrower range' },
          { label: 'Result', description: 'Only 4, 5, and 6 pass the inner check, so those are the only values printed' }
        ],
        whatChanged: 'Combined a loop-driving range with a membership-testing range in the same program.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-ranges-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Basic For-Loop Range',
        topicMeta: 'a..b driving a loop',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 2..5) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2345', isCorrect: true },
          { id: 'B', label: '234', isCorrect: false },
          { id: 'C', label: '12345', isCorrect: false },
          { id: 'D', label: '2 3 4 5', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 2..5)', detail: '2..5 is inclusive on both ends, so i takes the values 2, 3, 4, 5 in order. print (not println) leaves each line open, so the digits run together as "2345".' }
      },
      {
        id: 'pred-ranges-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'Accumulating Across a Range',
        topicMeta: 'Inclusive upper bound',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 1..4) {', '        total += i', '    }', '    println(total)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '10', isCorrect: true },
          { id: 'B', label: '6', isCorrect: false },
          { id: 'C', label: '4', isCorrect: false },
          { id: 'D', label: '9', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 1..4)', detail: '1..4 includes 4, so the loop adds 1 + 2 + 3 + 4 = 10 into total, which is then printed.' }
      },
      {
        id: 'pred-ranges-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'Membership Check with in',
        topicMeta: 'x in a..b',
        language: 'Kotlin',
        code: ['fun main() {', '    val temp = 72', '    if (temp in 60..80) {', '        println("Comfortable")', '    } else {', '        println("Uncomfortable")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Comfortable', isCorrect: true },
          { id: 'B', label: 'Uncomfortable', isCorrect: false },
          { id: 'C', label: '72', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'temp in 60..80', detail: '72 falls between 60 and 80 inclusive, so the membership check is true and "Comfortable" prints.' }
      },
      {
        id: 'pred-ranges-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'Membership Check with !in',
        topicMeta: 'x !in a..b',
        language: 'Kotlin',
        code: ['fun main() {', '    val code = 5', '    if (code !in 1..10) {', '        println("Out of range")', '    } else {', '        println("In range")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'In range', isCorrect: true },
          { id: 'B', label: 'Out of range', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: 'Nothing prints', isCorrect: false }
        ],
        explanation: { codeRef: 'code !in 1..10', detail: '5 IS inside 1..10, so !in evaluates to false -- the if body is skipped and the else branch prints "In range".' }
      },
      {
        id: 'pred-ranges-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Inclusive Upper Boundary',
        topicMeta: 'Boundary value in a membership check',
        language: 'Kotlin',
        code: ['fun main() {', '    val score = 100', '    if (score in 90..100) {', '        println("Top score")', '    } else {', '        println("Not top score")', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Top score', isCorrect: true },
          { id: 'B', label: 'Not top score', isCorrect: false },
          { id: 'C', label: '100', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'score in 90..100', detail: 'score is exactly 100, the upper boundary of 90..100. Since ranges are inclusive on both ends, 100 still counts as a match, so "Top score" prints.' }
      },
      {
        id: 'pred-ranges-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'Loop Range Combined with a Membership Check',
        topicMeta: 'Two ranges working together',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 0', '    for (i in 1..10) {', '        if (i in 5..8) {', '            count++', '        }', '    }', '    println(count)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '4', isCorrect: true },
          { id: 'B', label: '8', isCorrect: false },
          { id: 'C', label: '10', isCorrect: false },
          { id: 'D', label: '3', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i in 5..8)', detail: 'The outer loop visits 1 through 10, but only i = 5, 6, 7, and 8 satisfy the inner membership check, so count is incremented 4 times.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Count Values Inside a Range',
    description:
      'Declare var count = 0.\n\n' +
      '1. Write a for loop over 1..10 using loop variable i.\n\n' +
      '2. Inside the loop, check if i falls within range 3..7 (i in 3..7).\n\n' +
      '3. Increment count whenever the check passes.\n\n' +
      '4. Print count after the loop completes.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'RangeCounter.kt',
    initialCode: `fun main() {
    var count = 0

    // 1. Write a for-loop over 1..10 using loop variable i:
    // 2. Inside the loop, check if (i in 3..7) and increment count:

    // 3. Print count after the loop:
}`,
    solutionCode: `fun main() {
    var count = 0
    for (i in 1..10) {
        if (i in 3..7) {
            count++
        }
    }
    println(count)
}`,
    sampleInput: 'main()',
    expectedOutput: '5',
    testCase: { call: '', expected: '5' }
  },
  debug: {
    title: 'Diagnose the Range Membership Bug',
    subtitle: 'A value of exactly 10 should count as "Valid", but the program prints "Invalid" instead -- find and fix the range check.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Membership Direction (!in instead of in)',
    brokenCode: `fun main() {
    val value = 10
    // BUG: !in matches values OUTSIDE the range, so a valid value of 10 fails this check!
    if (value !in 1..10) {
        println("Valid")
    } else {
        println("Invalid")
    }
}`,
    fixedCode: `fun main() {
    val value = 10
    if (value in 1..10) {
        println("Valid")
    } else {
        println("Invalid")
    }
}`,
    expectedOutput: 'Valid',
    hints: [
      'Something is wrong with the direction of the membership check -- a value that should pass is failing instead.',
      'value is 10, and 1..10 includes 10. Is the condition testing whether value is inside the range, or outside it?',
      'The check uses !in, which matches values OUTSIDE the range. Since 10 is actually inside 1..10, change !in to in.'
    ],
    explanation: 'The broken code used !in 1..10, which is true only when value falls outside that range. Since value is 10 -- inside the range -- the !in check evaluates to false, so the else branch runs and prints "Invalid" instead of "Valid". Changing !in to in tests for membership in the correct direction, and 10 correctly matches, printing "Valid".'
  },
  mastered: {
    topicTitle: 'Ranges',
    summary:
      'You have mastered using a..b both to drive a for-loop and to test membership with in / !in, including inclusive-boundary behavior and variable-bound loop ranges, and diagnosed a real membership-direction bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'Ranges as an inclusive sequence, used for looping and membership testing' },
      { title: 'Examples explored', subtitle: '6 progressive range-usage patterns' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including boundary values' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a wrong-direction membership check (!in vs in) & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 5: Progressions (world-4-progressions)
// =========================================================================
export const PROGRESSIONS_LESSON: FiveStageLesson = {
  id: 'world-4-progressions',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'Progressions',
  learn: {
    title: 'Progressions: Ranges With a Step',
    subtitle:
      'A progression is a range combined with a step size -- an arithmetic sequence of values, evenly spaced apart. A plain range like 1..10 is really just a progression with an implicit step of 1. Adding step n changes how far apart consecutive values are.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A progression with step 4',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..10 step 4) {',
      '    println(i)',
      '}'
    ],
    explanation:
      'Starting at 1, each value in the sequence is 4 more than the one before it: 1, then 5, then 9. The next value would be 13, which is past the upper bound of 10, so the loop stops there -- it never visits 10 at all, even though 10 is written right in the range. This is the key surprise about progressions: the step decides which exact values get visited, and the range\'s own upper bound is only ever a ceiling, not a guarantee.',
    keyIdeas: [
      { number: 1, title: 'A plain range is a progression with step 1', description: 'for (i in 1..5) is really shorthand for a progression that increases by exactly 1 each time -- the step is just left implicit.' },
      { number: 2, title: 'step changes the interval', description: 'Writing step n right after the range (1..10 step n) changes how far apart consecutive values are, instead of always moving by 1.' },
      { number: 3, title: 'step must always be a positive number', description: 'Even when counting down with downTo, the step value itself stays positive -- direction comes from choosing .. / until (counting up) versus downTo (counting down), never from the sign of the step.' },
      { number: 4, title: 'The sequence can stop short of the bound', description: 'If the step does not evenly divide the distance between the start and the end, the last value visited can land before the upper bound (or after the lower bound, going down) -- the loop simply stops the moment the next value would go past it.' }
    ],
    keyTakeaway: 'A progression is a range plus a step: step n sets the gap between consecutive values, the step is always positive, and the sequence stops the instant the next value would pass the bound -- even if that means never touching the bound itself.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See how the implicit step of 1 becomes an explicit step, in different directions and with different range forms.',
    cards: [
      {
        id: 'card-prog-1',
        number: '01',
        title: 'The implicit step of 1',
        language: 'Kotlin',
        subtitle: 'A plain range is already a progression -- just with step 1 left unwritten.',
        code: ['for (i in 1..5) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '1..5', description: 'a progression from 1 to 5 with an implicit step of 1' },
          { label: 'Result', description: 'visits every value one apart: 1, 2, 3, 4, 5' }
        ],
        whatChanged: 'Reframed the familiar range loop as a progression whose step happens to be 1.'
      },
      {
        id: 'card-prog-2',
        number: '02',
        title: 'An explicit step that divides evenly',
        language: 'Kotlin',
        subtitle: 'Adding step 2 doubles the gap between consecutive values.',
        code: ['for (i in 0..10 step 2) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'step 2', description: 'each value is 2 more than the last, instead of 1 more' },
          { label: 'Result', description: '0, 2, 4, 6, 8, 10 -- since 10 - 0 = 10 divides evenly by 2, the sequence lands exactly on the upper bound' }
        ],
        whatChanged: 'Introduced step to widen the gap between values, landing exactly on the range\'s upper bound.'
      },
      {
        id: 'card-prog-3',
        number: '03',
        title: "When the step doesn't divide evenly",
        language: 'Kotlin',
        subtitle: 'The sequence can stop short of the upper bound entirely.',
        code: ['for (i in 1..10 step 4) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'step 4', description: 'values are 1, 5, 9 -- the next one would be 13' },
          { label: 'Result', description: '13 is past 10, so the loop stops at 9 -- 10 is never visited, even though it is the range\'s written bound' }
        ],
        whatChanged: 'Showed the key surprise: a step that does not evenly divide the range distance leaves the last value short of the bound.'
      },
      {
        id: 'card-prog-4',
        number: '04',
        title: 'step with an exclusive until range',
        language: 'Kotlin',
        subtitle: 'until already excludes the upper bound -- step compounds on top of that.',
        code: ['for (i in 0 until 15 step 5) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '0 until 15', description: 'an exclusive range -- 15 itself is never a candidate value' },
          { label: 'step 5', description: 'values are 0, 5, 10 -- the next one, 15, is excluded by until anyway' }
        ],
        whatChanged: 'Combined step with the exclusive until range from the earlier loops lesson.'
      },
      {
        id: 'card-prog-5',
        number: '05',
        title: 'step while counting down',
        language: 'Kotlin',
        subtitle: 'downTo still needs a positive step -- the direction comes from downTo itself.',
        code: ['for (i in 20 downTo 0 step 5) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'downTo', description: 'sets the direction to descending' },
          { label: 'step 5', description: 'written as a positive number even though the values are decreasing' },
          { label: 'Result', description: '20, 15, 10, 5, 0' }
        ],
        whatChanged: 'Confirmed the step stays positive even in a descending progression -- downTo supplies the direction, not the step\'s sign.'
      },
      {
        id: 'card-prog-6',
        number: '06',
        title: 'Using a variable for the step size',
        language: 'Kotlin',
        subtitle: 'The step does not have to be a literal number -- a variable works too.',
        code: ['val gap = 3', 'for (i in 0..12 step gap) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'val gap = 3', description: 'stores the step amount in a variable' },
          { label: 'step gap', description: 'uses that variable directly inside the for-loop header' },
          { label: 'Result', description: '0, 3, 6, 9, 12 -- 12 - 0 = 12 divides evenly by 3, so the sequence lands exactly on 12' }
        ],
        whatChanged: 'Showed that the range bounds and the step amount can all be variables, not just literal numbers.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace each value the progression actually visits before checking your answer -- pay close attention to whether the step divides evenly.',
    questions: [
      {
        id: 'pred-prog-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'A Step That Divides Evenly',
        topicMeta: 'Basic step',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 2..10 step 2) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '246810', isCorrect: true },
          { id: 'B', label: '2468', isCorrect: false },
          { id: 'C', label: '13579', isCorrect: false },
          { id: 'D', label: 'Compilation error', isCorrect: false }
        ],
        explanation: { codeRef: '2..10 step 2', detail: 'Starting at 2 and adding 2 each time visits 2, 4, 6, 8, 10 -- 10 - 2 = 8 divides evenly by 2, so the sequence lands exactly on the upper bound. print() has no separator, so the digits run together as "246810".' }
      },
      {
        id: 'pred-prog-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: "A Step That Doesn't Divide Evenly",
        topicMeta: 'Step stops short of the bound',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..10 step 4) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '159', isCorrect: true },
          { id: 'B', label: '15910', isCorrect: false },
          { id: 'C', label: '1591', isCorrect: false },
          { id: 'D', label: '1 5 9', isCorrect: false }
        ],
        explanation: { codeRef: '1..10 step 4', detail: 'The values are 1, then 5, then 9. The next value would be 13, which is past the upper bound of 10, so the loop stops at 9 -- 10 is never visited. Concatenated with no separator, the output is "159".' }
      },
      {
        id: 'pred-prog-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'Step Counting Down',
        topicMeta: 'downTo with step',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 15 downTo 0 step 5) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '151050', isCorrect: true },
          { id: 'B', label: '051015', isCorrect: false },
          { id: 'C', label: '15105', isCorrect: false },
          { id: 'D', label: 'Compilation error -- step must be negative when counting down', isCorrect: false }
        ],
        explanation: { codeRef: '15 downTo 0 step 5', detail: 'downTo already sets the direction to descending, so the step stays a positive 5: the values are 15, 10, 5, 0, printed with no separator as "151050". Writing step -5 would actually be invalid here -- step must always be positive.' }
      },
      {
        id: 'pred-prog-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'Step With an Exclusive Range',
        topicMeta: 'until with step',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 0 until 20 step 5) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '051015', isCorrect: true },
          { id: 'B', label: '05101520', isCorrect: false },
          { id: 'C', label: '51015', isCorrect: false },
          { id: 'D', label: 'Compilation error', isCorrect: false }
        ],
        explanation: { codeRef: '0 until 20 step 5', detail: 'The values are 0, 5, 10, 15 -- the next value, 20, is excluded because until is an exclusive range, so it is never a candidate even before step is considered. Printed with no separator: "051015".' }
      },
      {
        id: 'pred-prog-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'Accumulating a Total With step',
        topicMeta: 'Step inside an accumulator',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 0..12 step 3) {', '        total += i', '    }', '    println(total)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '30', isCorrect: true },
          { id: 'B', label: '78', isCorrect: false },
          { id: 'C', label: '45', isCorrect: false },
          { id: 'D', label: '12', isCorrect: false }
        ],
        explanation: { codeRef: '0..12 step 3', detail: 'The progression visits 0, 3, 6, 9, 12 -- 12 - 0 = 12 divides evenly by 3, so it lands exactly on 12. Adding each into total gives 0 + 3 + 6 + 9 + 12 = 30.' }
      },
      {
        id: 'pred-prog-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'A Second Step That Stops Short',
        topicMeta: 'Step stops short of the bound',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 2..15 step 4) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2\n6\n10\n14', isCorrect: true },
          { id: 'B', label: '2\n6\n10\n14\n18', isCorrect: false },
          { id: 'C', label: '2\n6\n10\n15', isCorrect: false },
          { id: 'D', label: '15', isCorrect: false }
        ],
        explanation: { codeRef: '2..15 step 4', detail: 'Starting at 2 and adding 4 each time visits 2, 6, 10, 14. The next value would be 18, which is past the upper bound of 15, so the loop stops at 14 -- 15 is never visited, and each value prints on its own line since println() adds a newline.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Print Every Third Number',
    description:
      'Print values stepping through a range.\n\n' +
      '1. Use a for loop over the range 1..20 with a step of 3 (1..20 step 3).\n\n' +
      '2. Print each number on its own line using println(i).',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'EveryThirdNumber.kt',
    initialCode: `fun main() {
    // 1. Use a for loop with step (1..20 step 3) to print each number on its own line:
}`,
    solutionCode: `fun main() {
    for (i in 1..20 step 3) {
        println(i)
    }
}`,
    sampleInput: 'main()',
    expectedOutput: '1\n4\n7\n10\n13\n16\n19',
    testCase: { call: '', expected: '1\n4\n7\n10\n13\n16\n19' }
  },
  debug: {
    title: 'Fix the Wrong Step Size',
    subtitle: 'The program is supposed to count by 5s from 0 to 25, but it is visiting a completely different set of numbers.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Step Value',
    brokenCode: `fun main() {
    // BUG: this should count by 5s, not 2s!
    for (i in 0..25 step 2) {
        println(i)
    }
}`,
    fixedCode: `fun main() {
    for (i in 0..25 step 5) {
        println(i)
    }
}`,
    expectedOutput: '0\n5\n10\n15\n20\n25',
    hints: [
      'Something is wrong with how far apart each printed number is from the last.',
      'What step value would make consecutive numbers exactly 5 apart, instead of 2 apart?',
      'Check the step used in the for-loop header -- it should be 5, not 2.'
    ],
    explanation: 'for (i in 0..25 step 2) visits 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 -- thirteen values, all multiples of 2, and it never even reaches 25. Changing step 2 to step 5 makes the progression visit 0, 5, 10, 15, 20, 25 instead -- six values, all multiples of 5, landing exactly on the intended upper bound.'
  },
  mastered: {
    topicTitle: 'Progressions',
    summary: 'You have mastered progressions: recognizing a plain range as an implicit step-1 progression, using step to change the interval between values, keeping the step positive in both directions, reasoning about when the sequence stops short of the range\'s bound, and diagnosing a real wrong-step logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'A progression is a range plus a step, and a plain range is step 1 in disguise' },
      { title: 'Examples explored', subtitle: '6 progressive step patterns, from implicit step 1 to downTo and variable steps' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including steps that stop short of the bound' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a wrong-step-value logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 6: downTo (world-4-downto)
// =========================================================================
export const DOWNTO_LESSON: FiveStageLesson = {
  id: 'world-4-downto',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'downTo',
  learn: {
    title: 'Counting Down with downTo',
    subtitle:
      'A plain range like 1..5 only ever counts UP. When you need a loop that counts DOWN -- a countdown timer, a reverse-order listing -- Kotlin gives you a dedicated keyword: downTo. It works just like a range, but the loop variable decreases by 1 each time instead of increasing.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A simple countdown',
    language: 'Kotlin',
    codeSnippet: ['for (i in 5 downTo 1) {', '    println(i)', '}'],
    explanation:
      'for (i in 5 downTo 1) starts i at 5 and counts DOWN by 1 each pass, stopping once it reaches 1. Both ends are inclusive, just like a normal range -- so this loop visits 5, 4, 3, 2, then 1, printing each one on its own line before the loop ends.',
    keyIdeas: [
      { number: 1, title: 'downTo counts backwards', description: 'a downTo b starts at a and decreases toward b, one step at a time -- the opposite direction of a..b.' },
      { number: 2, title: 'Both ends are inclusive', description: '5 downTo 1 includes both 5 and 1 -- the loop visits 5, 4, 3, 2, 1, exactly five values.' },
      { number: 3, title: 'The left side must be the larger number', description: 'downTo is written high-to-low: the starting value on the left is where counting begins, and it must be greater than or equal to the value on the right for the loop to actually run.' },
      { number: 4, title: 'A backwards .. range is NOT the same thing', description: 'Writing 5..1 (a plain range with the big number first) does NOT count down -- it silently produces an EMPTY loop. Only downTo actually reverses direction.' }
    ],
    keyTakeaway: 'Use a downTo b to count down from a to b, inclusive on both ends -- and never rely on writing a plain a..b backwards, because that produces zero iterations instead of a countdown.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from a basic countdown to the exact gotcha that trips learners up most.',
    cards: [
      {
        id: 'card-downto-1',
        number: '01',
        title: 'A basic countdown',
        language: 'Kotlin',
        subtitle: 'Count down from 5 to 1, printing each number.',
        code: ['for (i in 5 downTo 1) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'downTo', description: 'counts backwards from the left value toward the right value' },
          { label: '5 downTo 1', description: 'visits 5, 4, 3, 2, 1 -- five iterations total' }
        ],
        whatChanged: 'Introduced downTo as the tool for counting downward in a for-loop.'
      },
      {
        id: 'card-downto-2',
        number: '02',
        title: 'Counting down to zero',
        language: 'Kotlin',
        subtitle: 'The lower bound does not have to be 1 -- it can be any value, including 0.',
        code: ['for (i in 3 downTo 0) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '3 downTo 0', description: 'both ends are inclusive, so 0 is visited too -- 3, 2, 1, 0' }
        ],
        whatChanged: 'Showed that downTo\'s lower bound is inclusive, just like a normal range\'s upper bound.'
      },
      {
        id: 'card-downto-3',
        number: '03',
        title: 'downTo with step',
        language: 'Kotlin',
        subtitle: 'Combine downTo with step to skip values while counting down.',
        code: ['for (i in 10 downTo 0 step 2) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'step 2', description: 'decreases by 2 each time instead of by 1' },
          { label: '10 downTo 0 step 2', description: 'visits 10, 8, 6, 4, 2, 0' }
        ],
        whatChanged: 'Connected downTo to the step modifier from Progressions, showing it works in either direction.'
      },
      {
        id: 'card-downto-4',
        number: '04',
        title: 'A countdown timer message',
        language: 'Kotlin',
        subtitle: 'A realistic use for downTo: printing a launch countdown.',
        code: ['for (i in 3 downTo 1) {', '    println("T-minus $i")', '}', 'println("Liftoff!")'],
        whatItMeans: [
          { label: '3 downTo 1', description: 'visits 3, 2, 1' },
          { label: '"T-minus $i"', description: 'interpolates each counted-down value into the message' },
          { label: 'println("Liftoff!")', description: 'runs once, after the loop finishes counting down' }
        ],
        whatChanged: 'Applied downTo to a realistic countdown-timer scenario.'
      },
      {
        id: 'card-downto-5',
        number: '05',
        title: 'The backwards .. trap',
        language: 'Kotlin',
        subtitle: 'Writing a plain range backwards does NOT count down -- it produces nothing.',
        code: ['for (i in 5..1) {', '    println(i)', '}', 'println("Loop finished")'],
        whatItMeans: [
          { label: '5..1', description: 'a plain range where the start (5) is already greater than the end (1)' },
          { label: 'Result', description: 'the loop body never runs even once -- only "Loop finished" prints' }
        ],
        whatChanged: 'Demonstrated the common mistake of using .. instead of downTo when a countdown was intended -- .. never reverses direction, it just produces an empty loop.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the range direction carefully, then predict exactly what gets printed.',
    questions: [
      {
        id: 'pred-downto-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic Countdown',
        topicMeta: 'downTo',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 4 downTo 1) {', '        print(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '4321', isCorrect: true },
          { id: 'B', label: '1234', isCorrect: false },
          { id: 'C', label: '432', isCorrect: false },
          { id: 'D', label: '(nothing is printed)', isCorrect: false }
        ],
        explanation: { codeRef: '4 downTo 1', detail: 'downTo counts backwards inclusively, visiting 4, 3, 2, then 1, printing "4321" with no separators since print() is used.' }
      },
      {
        id: 'pred-downto-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Inclusive Lower Bound',
        topicMeta: 'downTo to zero',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 2 downTo 0) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2\n1\n0', isCorrect: true },
          { id: 'B', label: '2\n1', isCorrect: false },
          { id: 'C', label: '0\n1\n2', isCorrect: false },
          { id: 'D', label: '2\n1\n0\n-1', isCorrect: false }
        ],
        explanation: { codeRef: '2 downTo 0', detail: 'Both ends are inclusive, so the loop visits 2, 1, and 0, each printed on its own line.' }
      },
      {
        id: 'pred-downto-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'The Backwards .. Trap',
        topicMeta: 'Common mistake',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 5..1) {', '        println(i)', '    }', '    println("Done")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: 'Done', isCorrect: true },
          { id: 'B', label: '5\n4\n3\n2\n1\nDone', isCorrect: false },
          { id: 'C', label: '1\n2\n3\n4\n5\nDone', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 5..1)', detail: 'A plain .. range never reverses direction. Since the start (5) is already greater than the end (1), the loop condition is false immediately, so the body never runs -- only "Done" prints.' }
      },
      {
        id: 'pred-downto-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'downTo with step',
        topicMeta: 'downTo + step',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 9 downTo 1 step 3) {', '        total += i', '    }', '    println(total)', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: '18', isCorrect: true },
          { id: 'B', label: '15', isCorrect: false },
          { id: 'C', label: '45', isCorrect: false },
          { id: 'D', label: '9', isCorrect: false }
        ],
        explanation: { codeRef: '9 downTo 1 step 3', detail: 'Counting down by 3 from 9 visits 9, 6, and 3 (the next step would be 0, which is below the lower bound of 1, so the loop stops). total accumulates 9 + 6 + 3 = 18.' }
      },
      {
        id: 'pred-downto-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Countdown Message',
        topicMeta: 'Realistic usage',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 3 downTo 1) {', '        println("T-minus $i")', '    }', '    println("Liftoff!")', '}'],
        prompt: 'What does this program print?',
        options: [
          { id: 'A', label: 'T-minus 3\nT-minus 2\nT-minus 1\nLiftoff!', isCorrect: true },
          { id: 'B', label: 'T-minus 1\nT-minus 2\nT-minus 3\nLiftoff!', isCorrect: false },
          { id: 'C', label: 'T-minus 3\nT-minus 2\nT-minus 1', isCorrect: false },
          { id: 'D', label: 'Liftoff!', isCorrect: false }
        ],
        explanation: { codeRef: '3 downTo 1', detail: 'The loop counts down from 3 to 1 inclusive, printing "T-minus 3", "T-minus 2", "T-minus 1", and then "Liftoff!" prints once after the loop finishes.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Print a Countdown',
    description:
      'Count down using the downTo operator.\n\n' +
      '1. Write a for loop counting down from 5 to 1 using downTo (5 downTo 1).\n\n' +
      '2. Print each number on its own line.\n\n' +
      '3. After the loop finishes, print "Go!".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'Countdown.kt',
    initialCode: `fun main() {
    // 1. Use a for-loop with downTo to count down from 5 to 1, printing each number:
    
    // 2. After the loop, print "Go!":
    println("Go!")
}`,
    solutionCode: `fun main() {
    for (i in 5 downTo 1) {
        println(i)
    }
    println("Go!")
}`,
    sampleInput: 'main()',
    expectedOutput: '5\n4\n3\n2\n1\nGo!',
    testCase: { call: '', expected: '5\n4\n3\n2\n1\nGo!' }
  },
  debug: {
    title: 'Fix the Broken Countdown',
    subtitle: 'The countdown timer is supposed to count down from 5 to 1, but nothing prints except the final message.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Backwards Range Instead of downTo',
    brokenCode: `fun main() {
    // BUG: this range never counts down!
    for (i in 5..1) {
        println(i)
    }
    println("Go!")
}`,
    fixedCode: `fun main() {
    for (i in 5 downTo 1) {
        println(i)
    }
    println("Go!")
}`,
    expectedOutput: '5\n4\n3\n2\n1\nGo!',
    hints: [
      'Something is wrong with how the loop is supposed to count downward.',
      'A plain .. range only ever counts up -- what happens when its start is already bigger than its end?',
      'Replace 5..1 with 5 downTo 1 so the loop actually counts backwards.'
    ],
    explanation:
      'for (i in 5..1) uses a plain range, which always counts UP from its left value to its right value. Since 5 is already greater than 1, the loop\'s condition is false immediately, so the body never runs at all -- only "Go!" prints. Replacing 5..1 with 5 downTo 1 makes the loop actually count backwards from 5 to 1, printing all five numbers before "Go!".'
  },
  mastered: {
    topicTitle: 'downTo',
    summary: 'You have mastered downTo for counting downward in a for-loop, its inclusive bounds, combining it with step, and diagnosed the classic backwards-range mistake that silently produces an empty loop.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'downTo counts backwards, inclusive on both ends' },
      { title: 'Examples explored', subtitle: '5 progressive downTo patterns, including the backwards .. trap' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved backwards-range logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 7: step (world-4-step)
// =========================================================================
export const STEP_LESSON: FiveStageLesson = {
  id: 'world-4-step',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'step',
  learn: {
    title: 'step — Controlling the Interval',
    subtitle:
      'By default, a range counts one at a time. Adding step n changes the GAP between consecutive values to n instead of 1 -- but it never changes direction. Direction still comes from .. or until (counting up) versus downTo (counting down); step is always written as a positive number in real Kotlin.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Counting up by 3 with step',
    language: 'Kotlin',
    codeSnippet: ['for (i in 1..10 step 3) {', '    println(i)', '}'],
    explanation:
      'The loop starts at 1. Instead of adding 1 each time, it adds 3: 1, then 4, then 7, then 10. Since 10 <= 10, the range\'s own inclusive upper bound still applies, so 10 is included. The next value would be 13, which is greater than 10, so the loop stops there -- printing 1, 4, 7, 10, each on its own line.',
    keyIdeas: [
      { number: 1, title: 'step sets the interval', description: 'step n replaces the default gap of 1 between consecutive loop values with n.' },
      { number: 2, title: 'step is always written positive', description: 'Direction never comes from step itself -- .. and until count up (+n each time), downTo counts down (-n each time). A negative step is not how Kotlin expresses counting down.' },
      { number: 3, title: "The range's own boundary rule still applies", description: '.. is still inclusive and until is still exclusive even with a step -- step only changes which values are visited on the way, not whether the endpoint counts.' },
      { number: 4, title: 'The endpoint is not always reached exactly', description: 'If the step does not land exactly on the end value, the loop simply stops at the last value that is still within range -- it never overshoots past the boundary.' }
    ],
    keyTakeaway: 'step n changes the gap between consecutive loop values to n -- it always combines with .., until, or downTo (which supply the direction and the boundary rule), and it is always written as a positive number.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See step combined with all three range forms this world teaches, and how it interacts with inclusive vs exclusive endpoints.',
    cards: [
      {
        id: 'card-step-1',
        number: '01',
        title: 'step with .. that lands exactly on the endpoint',
        language: 'Kotlin',
        subtitle: 'The stepped sequence reaches 10 exactly, and .. includes it.',
        code: ['for (i in 1..10 step 3) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '1..10 step 3', description: 'Counts up from 1 by 3 each time: 1, 4, 7, 10' },
          { label: 'Result', description: '10 is reached exactly and .. is inclusive, so 10 is printed too -- the next value, 13, is past 10 and the loop stops' }
        ],
        whatChanged: 'Introduced step combined with .., the ascending inclusive range form.'
      },
      {
        id: 'card-step-2',
        number: '02',
        title: 'step with .. that does NOT land on the endpoint',
        language: 'Kotlin',
        subtitle: 'The stepped sequence skips past 10 without ever landing on it.',
        code: ['for (i in 1..10 step 4) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '1..10 step 4', description: 'Counts up from 1 by 4 each time: 1, 5, 9' },
          { label: 'Result', description: 'The next value would be 13, which is greater than 10, so the loop simply stops at 9 -- 10 is never visited or printed' }
        ],
        whatChanged: 'Showed that the endpoint is not guaranteed to be visited -- the loop stops at the last in-range value instead.'
      },
      {
        id: 'card-step-3',
        number: '03',
        title: 'step with until -- the same numbers, a different result',
        language: 'Kotlin',
        subtitle: "Swapping .. for until excludes the endpoint even when step would have landed on it.",
        code: ['for (i in 1 until 10 step 3) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '1 until 10 step 3', description: 'Counts up from 1 by 3 each time: 1, 4, 7' },
          { label: 'Result', description: 'The next value, 10, satisfies "would equal 10" but until 10 means strictly less than 10, so 10 is excluded -- only 1, 4, 7 print' }
        ],
        whatChanged: "Contrasted with card 01: the exact same start, end, and step values, but until's exclusive upper bound drops the final value that .. would have kept."
      },
      {
        id: 'card-step-4',
        number: '04',
        title: 'step with downTo -- counting down',
        language: 'Kotlin',
        subtitle: 'downTo still supplies the direction; step still supplies the gap.',
        code: ['for (i in 10 downTo 1 step 3) {', '    println(i)', '}'],
        whatItMeans: [
          { label: '10 downTo 1 step 3', description: 'Counts down from 10 by 3 each time: 10, 7, 4, 1' },
          { label: 'Result', description: '1 is reached exactly and downTo is inclusive of its lower bound, so 1 prints -- the next value, -2, is past 1 and the loop stops' }
        ],
        whatChanged: 'Applied step to downTo, showing the gap works the same way whether counting up or down -- always written as a positive number.'
      },
      {
        id: 'card-step-5',
        number: '05',
        title: 'step from a variable',
        language: 'Kotlin',
        subtitle: 'The step amount does not have to be a literal number.',
        code: ['val interval = 5', 'for (i in 0..20 step interval) {', '    println(i)', '}'],
        whatItMeans: [
          { label: 'interval', description: 'Holds 5, and is used directly after step, just like a literal number would be' },
          { label: '0..20 step interval', description: 'Counts up from 0 by 5 each time: 0, 5, 10, 15, 20' }
        ],
        whatChanged: 'Showed step accepting a variable instead of only a hardcoded literal.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace each stepped range by hand -- list out every value it actually visits before checking your answer.',
    questions: [
      {
        id: 'pred-step-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'step with .. Landing Exactly on the Endpoint',
        topicMeta: 'Ascending, inclusive',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 2..12 step 5) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2\n7\n12', isCorrect: true },
          { id: 'B', label: '2\n7', isCorrect: false },
          { id: 'C', label: '2\n7\n12\n17', isCorrect: false },
          { id: 'D', label: '2\n4\n6\n8\n10\n12', isCorrect: false }
        ],
        explanation: { codeRef: '2..12 step 5', detail: 'Counting up from 2 by 5 each time gives 2, 7, 12. 12 <= 12 so .. includes it. The next value, 17, is past 12, so the loop stops there.' }
      },
      {
        id: 'pred-step-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'step with .. That Overshoots the Endpoint',
        topicMeta: 'Ascending, endpoint not visited',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 3..14 step 4) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '3\n7\n11', isCorrect: true },
          { id: 'B', label: '3\n7\n11\n15', isCorrect: false },
          { id: 'C', label: '3\n7\n11\n14', isCorrect: false },
          { id: 'D', label: '3\n8\n13', isCorrect: false }
        ],
        explanation: { codeRef: '3..14 step 4', detail: 'Counting up from 3 by 4 each time gives 3, 7, 11. The next value would be 15, which is greater than 14, so the loop stops at 11 -- 14 itself is never visited.' }
      },
      {
        id: 'pred-step-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'step with until -- Excluding the Endpoint',
        topicMeta: 'Ascending, exclusive',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1 until 15 step 7) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n8', isCorrect: true },
          { id: 'B', label: '1\n8\n15', isCorrect: false },
          { id: 'C', label: '1\n7\n14', isCorrect: false },
          { id: 'D', label: '1', isCorrect: false }
        ],
        explanation: { codeRef: '1 until 15 step 7', detail: 'Counting up from 1 by 7 each time gives 1, then 8. The next value would be 15, but until 15 means strictly less than 15, so 15 is excluded and the loop stops after printing 8.' }
      },
      {
        id: 'pred-step-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'step with downTo Landing Exactly on the Endpoint',
        topicMeta: 'Descending, inclusive',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 20 downTo 5 step 5) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '20\n15\n10\n5', isCorrect: true },
          { id: 'B', label: '20\n15\n10', isCorrect: false },
          { id: 'C', label: '20\n15\n10\n5\n0', isCorrect: false },
          { id: 'D', label: '5\n10\n15\n20', isCorrect: false }
        ],
        explanation: { codeRef: '20 downTo 5 step 5', detail: 'Counting down from 20 by 5 each time gives 20, 15, 10, 5. 5 >= 5 so it is included. The next value, 0, is less than 5, so the loop stops there.' }
      },
      {
        id: 'pred-step-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'step with downTo That Overshoots the Endpoint',
        topicMeta: 'Descending, endpoint not visited',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 20 downTo 1 step 6) {', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '20\n14\n8\n2', isCorrect: true },
          { id: 'B', label: '20\n14\n8\n2\n1', isCorrect: false },
          { id: 'C', label: '20\n14\n8', isCorrect: false },
          { id: 'D', label: '20\n13\n6', isCorrect: false }
        ],
        explanation: { codeRef: '20 downTo 1 step 6', detail: 'Counting down from 20 by 6 each time gives 20, 14, 8, 2. The next value would be -4, which is less than 1, so the loop stops at 2 -- 1 itself is never visited.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Count Up by 5',
    description:
      'Step through a range in increments of 5.\n\n' +
      '1. Use a for loop over the range 1..20 with a step of 5 (1..20 step 5).\n\n' +
      '2. Print each value on its own line (outputs 1, 6, 11, 16).',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'CountBy5.kt',
    initialCode: `fun main() {
    // 1. Use a for loop with step (1..20 step 5) to print 1, 6, 11, and 16:
}`,
    solutionCode: `fun main() {
    for (i in 1..20 step 5) {
        println(i)
    }
}`,
    sampleInput: 'main()',
    expectedOutput: '1\n6\n11\n16',
    testCase: { call: '', expected: '1\n6\n11\n16' }
  },
  debug: {
    title: 'Fix the Missing Final Value',
    subtitle: 'The loop should print every even number from 2 to 10, but the last one, 10, never shows up.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Range Form Excludes the Last Value',
    brokenCode: `fun main() {
    // BUG: this should print every even number from 2 to 10, including 10
    for (i in 2 until 10 step 2) {
        println(i)
    }
}`,
    fixedCode: `fun main() {
    for (i in 2..10 step 2) {
        println(i)
    }
}`,
    expectedOutput: '2\n4\n6\n8\n10',
    hints: [
      'Something is wrong with which numbers the loop includes, not with the step amount itself.',
      'What is the difference between .. and until when the stepped sequence would land exactly on the end value?',
      'Check the range form -- until always excludes its end value, even when step would have reached it exactly.'
    ],
    explanation:
      '2 until 10 step 2 counts 2, 4, 6, 8 -- the next value would be exactly 10, but until 10 means strictly less than 10, so 10 is excluded and never prints. Changing until to .. makes the upper bound inclusive, so 2..10 step 2 counts 2, 4, 6, 8, 10, and 10 is correctly included.'
  },
  mastered: {
    topicTitle: 'step',
    summary: 'You have mastered step: changing the interval between loop values, always writing it as a positive number, combining it with .., until, and downTo, and recognizing how inclusive vs exclusive endpoints interact with a stepped sequence -- including diagnosing a real range-form logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'step n changes the gap between consecutive loop values, always written positive' },
      { title: 'Examples explored', subtitle: '5 progressive step patterns across .., until, and downTo, including endpoint-missed and endpoint-excluded cases' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts across all three range forms' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a wrong-range-form logic defect that silently excluded the final value & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 8: break (world-4-break)
// =========================================================================
export const BREAK_LESSON: FiveStageLesson = {
  id: 'world-4-break',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'break',
  learn: {
    title: 'Stopping a Loop Early with break',
    subtitle:
      'break immediately exits the nearest enclosing loop the moment it runs -- skipping every remaining iteration entirely. It is typically placed inside an if, so the loop stops as soon as some condition becomes true, instead of needlessly running through the rest of the range.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Stopping a search as soon as a match is found',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..20) {',
      '    if (i % 7 == 0) {',
      '        println("Found: $i")',
      '        break',
      '    }',
      '}',
      'println("Search finished")'
    ],
    explanation:
      'The loop checks i % 7 == 0 for i = 1, 2, 3, 4, 5, 6 -- none of them are divisible by 7, so nothing prints and the loop just keeps going. When i reaches 7, the condition becomes true: "Found: 7" prints, and then break runs, which exits the for loop immediately. The remaining values -- 8 through 20 -- are never visited at all. Execution then continues with the first line after the loop, printing "Search finished".',
    keyIdeas: [
      { number: 1, title: 'break exits the nearest loop immediately', description: 'The moment break runs, the loop stops -- no more condition checks, no more iterations, nothing else in that pass of the loop body executes either.' },
      { number: 2, title: 'Usually paired with an if', description: 'break on its own would always stop the loop on the first pass, so it is almost always written inside an if that only becomes true once some condition is met.' },
      { number: 3, title: 'Remaining iterations are skipped entirely', description: 'Any values the loop had not reached yet are simply never visited -- break does not just skip the rest of the current pass, it cancels every pass still to come.' },
      { number: 4, title: 'Code after the loop still runs normally', description: 'break only exits the loop itself. Once the loop ends, execution continues with whatever statement comes right after it, exactly as if the loop had finished naturally.' }
    ],
    keyTakeaway: 'break immediately exits the nearest loop the moment it runs, skipping every remaining iteration -- but code written after the loop still executes normally once it exits.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See break stop a loop the instant its condition is met, and confirm that code after the loop keeps running normally.',
    cards: [
      {
        id: 'card-break-1',
        number: '01',
        title: 'Exiting a loop early',
        language: 'Kotlin',
        subtitle: 'break stops the loop the moment i reaches 5 -- the rest of the range is never visited.',
        code: ['for (i in 1..10) {', '    if (i == 5) {', '        break', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'if (i == 5)', description: 'Stays false for i = 1, 2, 3, 4, so println(i) runs normally each time' },
          { label: 'break', description: 'Once i == 5 becomes true, break runs immediately and the loop exits -- 5 is never printed, and 6 through 10 are never visited at all' }
        ],
        whatChanged: 'Introduced break inside a for loop: the loop stops the instant its condition becomes true.'
      },
      {
        id: 'card-break-2',
        number: '02',
        title: 'Code after the loop still runs',
        language: 'Kotlin',
        subtitle: 'break only exits the loop -- execution continues normally right after it.',
        code: ['for (i in 1..10) {', '    if (i == 5) {', '        break', '    }', '    println(i)', '}', 'println("Loop ended")'],
        whatItMeans: [
          { label: 'break', description: 'Exits the for loop as soon as i == 5' },
          { label: 'println("Loop ended")', description: 'This line is not part of the loop, so it runs right after break exits it -- exactly as if the loop had finished on its own' }
        ],
        whatChanged: 'Confirmed that break only stops the loop itself -- the rest of the program continues normally afterward.'
      },
      {
        id: 'card-break-3',
        number: '03',
        title: 'Searching for a value',
        language: 'Kotlin',
        subtitle: 'A very common use of break: stop looking the moment the target is found.',
        code: ['val target = 6', 'for (i in 1..10) {', '    if (i == target) {', '        println("Found $target")', '        break', '    }', '}'],
        whatItMeans: [
          { label: 'i == target', description: 'False for i = 1 through 5, so the loop keeps going without printing anything' },
          { label: 'break', description: 'Once i reaches 6, "Found 6" prints and break exits immediately -- there is no reason to keep checking 7 through 10' }
        ],
        whatChanged: 'Showed the typical search pattern: keep looping until a match is found, then break out right away.'
      },
      {
        id: 'card-break-4',
        number: '04',
        title: 'break inside a while loop',
        language: 'Kotlin',
        subtitle: 'break works the same way in a while loop -- it is not limited to for loops.',
        code: ['var count = 0', 'while (true) {', '    if (count == 3) {', '        break', '    }', '    println(count)', '    count++', '}'],
        whatItMeans: [
          { label: 'while (true)', description: 'Would loop forever on its own, with no condition to stop it' },
          { label: 'if (count == 3) { break }', description: 'Gives the loop its only way to stop -- once count reaches 3, break exits before 3 is ever printed' }
        ],
        whatChanged: 'Used break to give an otherwise-infinite while (true) loop a real stopping point.'
      },
      {
        id: 'card-break-5',
        number: '05',
        title: 'Stopping once a running total is exceeded',
        language: 'Kotlin',
        subtitle: 'break does not have to compare i directly -- it can react to any condition, including one built up during the loop.',
        code: ['var total = 0', 'for (i in 1..100) {', '    total += i', '    if (total > 20) {', '        break', '    }', '}', 'println(total)'],
        whatItMeans: [
          { label: 'total += i', description: 'Adds 1, then 2, then 3, then 4, then 5, then 6 to total, giving 1, 3, 6, 10, 15, 21' },
          { label: 'if (total > 20)', description: 'Becomes true right after total reaches 21 (at i = 6), so break exits there -- the loop never reaches i = 7 or beyond' }
        ],
        whatChanged: 'Showed break reacting to a condition built up across iterations, not just to the loop variable itself.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace the loop carefully -- figure out exactly which iteration break fires on, then predict what actually gets printed.',
    questions: [
      {
        id: 'pred-break-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic break',
        topicMeta: 'Exiting early',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..10) {', '        if (i == 5) {', '            break', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n3\n4', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10', isCorrect: false },
          { id: 'C', label: '1\n2\n3\n4\n5', isCorrect: false },
          { id: 'D', label: '(nothing is printed)', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i == 5) { break }', detail: 'println(i) runs for i = 1, 2, 3, and 4. When i reaches 5, break fires before println(i) can run, and the loop exits immediately -- 5 through 10 are never printed.' }
      },
      {
        id: 'pred-break-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Code after the loop',
        topicMeta: 'Execution continues normally',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..5) {', '        if (i == 3) {', '            break', '        }', '        println(i)', '    }', '    println("Done")', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\nDone', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5\nDone', isCorrect: false },
          { id: 'C', label: '1\n2', isCorrect: false },
          { id: 'D', label: 'Done', isCorrect: false }
        ],
        explanation: { codeRef: 'println("Done")', detail: 'println(i) runs for i = 1 and 2. At i = 3, break exits the loop right away. Since println("Done") is not inside the loop, it still runs normally afterward, printing "Done" last.' }
      },
      {
        id: 'pred-break-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Counting iterations before break',
        topicMeta: 'Tracing exactly how many times the loop ran',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 0', '    for (i in 1..20) {', '        if (i == 6) {', '            break', '        }', '        count++', '    }', '    println(count)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '5', isCorrect: true },
          { id: 'B', label: '6', isCorrect: false },
          { id: 'C', label: '20', isCorrect: false },
          { id: 'D', label: '0', isCorrect: false }
        ],
        explanation: { codeRef: 'count++', detail: 'count++ runs for i = 1, 2, 3, 4, and 5 -- five times total. When i reaches 6, the if (i == 6) check fires break BEFORE count++ can run on that pass, so count never gets a sixth increment. The loop entered 6 times overall (i = 1 through 6), but count only reached 5.' }
      },
      {
        id: 'pred-break-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'break inside a while loop',
        topicMeta: 'Not just for loops',
        language: 'Kotlin',
        code: ['fun main() {', '    var n = 1', '    while (n <= 100) {', '        if (n * n > 30) {', '            break', '        }', '        println(n)', '        n++', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n3\n4\n5', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5\n6', isCorrect: false },
          { id: 'C', label: '1\n2\n3\n4', isCorrect: false },
          { id: 'D', label: '(nothing is printed)', isCorrect: false }
        ],
        explanation: { codeRef: 'if (n * n > 30) { break }', detail: 'n * n is 1, 4, 9, 16, 25 for n = 1 through 5 -- all at or below 30, so each of those prints. At n = 6, n * n is 36, which is greater than 30, so break fires before 6 is printed and the loop exits.' }
      },
      {
        id: 'pred-break-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'break driven by an accumulated total',
        topicMeta: 'Reacting to a condition built during the loop',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 1..10) {', '        total += i', '        if (total >= 10) {', '            break', '        }', '    }', '    println(total)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '10', isCorrect: true },
          { id: 'B', label: '6', isCorrect: false },
          { id: 'C', label: '55', isCorrect: false },
          { id: 'D', label: '4', isCorrect: false }
        ],
        explanation: { codeRef: 'if (total >= 10) { break }', detail: 'total accumulates 1, 3, 6, then 10 as i goes 1, 2, 3, 4. Once total reaches 10 (at i = 4), the condition total >= 10 becomes true and break exits the loop right away, so total never grows past 10.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Stop the Countdown Scan Early',
    description:
      'Terminate loop execution prematurely using break.\n\n' +
      '1. Loop through numbers 1 to 20 (1..20).\n\n' +
      '2. If i equals 8, break out of the loop before printing.\n\n' +
      '3. Otherwise, print each number with println(i).',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'BreakEarly.kt',
    initialCode: `fun main() {
    for (i in 1..20) {
        // 1. If i equals 8, break out of the loop before printing:

        // 2. Print i:
        println(i)
    }
}`,
    solutionCode: `fun main() {
    for (i in 1..20) {
        if (i == 8) {
            break
        }
        println(i)
    }
}`,
    sampleInput: 'main()',
    expectedOutput: '1\n2\n3\n4\n5\n6\n7',
    testCase: { call: '', expected: '1\n2\n3\n4\n5\n6\n7' }
  },
  debug: {
    title: 'Fix the Threshold Search',
    subtitle: 'This loop is supposed to find the first number greater than 15, but it is stopping far too early.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Threshold in Break Condition',
    brokenCode: `fun main() {
    for (i in 1..20) {
        // BUG: this should look for a number greater than 15, not 5!
        if (i > 5) {
            println("Found: $i")
            break
        }
    }
    println("Search complete")
}`,
    fixedCode: `fun main() {
    for (i in 1..20) {
        if (i > 15) {
            println("Found: $i")
            break
        }
    }
    println("Search complete")
}`,
    expectedOutput: 'Found: 16\nSearch complete',
    hints: [
      'Something is wrong with the condition that decides when to stop searching.',
      'What number is this search actually supposed to be looking for -- is 5 the right threshold?',
      'Check the comparison value inside the if condition that triggers break.'
    ],
    explanation:
      'The broken code checks i > 5, which becomes true the moment i reaches 6 -- so it prints "Found: 6" and breaks far too early, well before reaching any number greater than 15. Changing the threshold to i > 15 makes the condition stay false all the way through i = 15, and only become true at i = 16, so the loop correctly prints "Found: 16" before printing "Search complete".'
  },
  mastered: {
    topicTitle: 'break',
    summary: 'You have mastered break: exiting a loop the instant a condition becomes true, understanding that every remaining iteration is skipped entirely, confirming that code after the loop still runs normally, and diagnosing a real wrong-threshold logic bug in a break condition.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'break immediately exits the nearest enclosing loop, skipping all remaining iterations' },
      { title: 'Examples explored', subtitle: '5 progressive break patterns, from a basic early exit to a while loop and an accumulated-total condition' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts, including tracing exactly how many iterations ran before break fired' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a wrong-threshold logic defect in a break condition & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 9: continue (world-4-continue)
// =========================================================================
export const CONTINUE_LESSON: FiveStageLesson = {
  id: 'world-4-continue',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'continue',
  learn: {
    title: 'Skipping an Iteration with continue',
    subtitle:
      "continue skips only the REST of the current iteration's body and jumps straight to the next iteration -- the loop itself keeps running. This is different from break (the previous lesson), which exits the loop entirely and never runs another iteration at all.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Skipping even numbers with continue',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..5) {',
      '    if (i % 2 == 0) {',
      '        continue',
      '    }',
      '    println(i)',
      '}'
    ],
    explanation:
      "For each i from 1 to 5, the loop first checks i % 2 == 0. When i is 2 or 4, that condition is true, so continue runs -- it skips println(i) for that iteration completely and jumps straight to the next value of i. The loop itself never stops: it still goes on to check i = 3, i = 4, and i = 5. Only the odd values 1, 3, and 5 ever reach println(i), so the program prints \"1\", \"3\", and \"5\" on separate lines.",
    keyIdeas: [
      { number: 1, title: 'continue skips the rest of the current iteration', description: 'Any code written after continue inside the loop body is skipped for that pass -- in the example, println(i) never runs when i is even.' },
      { number: 2, title: 'The loop keeps running', description: 'Unlike break, continue does not stop the loop. Execution jumps back to the loop\'s next iteration -- the next value in a for loop, or the next condition check in a while/do-while loop.' },
      { number: 3, title: 'continue vs break', description: 'break exits the ENTIRE loop immediately -- no further iterations happen at all. continue only skips ONE iteration -- the loop continues on to the next one right after.' },
      { number: 4, title: 'Usually paired with an if', description: 'continue is almost always written inside an if block, so it only fires for the specific values you want to skip -- like even numbers, multiples of 3, or invalid entries.' }
    ],
    keyTakeaway: 'continue skips only the remaining code in the current iteration and moves on to the next one -- the loop keeps running until it finishes naturally. break, by contrast, stops the loop immediately and for good.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See continue skip individual iterations across for, while, and do-while loops, and contrast it directly with break.',
    cards: [
      {
        id: 'card-continue-1',
        number: '01',
        title: 'Skipping even numbers',
        language: 'Kotlin',
        subtitle: 'continue skips println(i) only on the iterations where the condition matches.',
        code: ['for (i in 1..5) {', '    if (i % 2 == 0) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'i % 2 == 0', description: 'true whenever i is even -- true for i = 2 and i = 4' },
          { label: 'continue', description: 'skips println(i) for that iteration and jumps to the next value of i' },
          { label: 'Result', description: 'prints 1, 3, 5 -- the loop still visits every value from 1 to 5' }
        ],
        whatChanged: 'Introduced continue to skip printing on even iterations while the loop itself keeps running to completion.'
      },
      {
        id: 'card-continue-2',
        number: '02',
        title: 'Skipping odd numbers instead',
        language: 'Kotlin',
        subtitle: 'Flip the condition to skip a different set of values.',
        code: ['for (i in 1..6) {', '    if (i % 2 != 0) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'i % 2 != 0', description: 'true whenever i is odd -- true for i = 1, 3, 5' },
          { label: 'Result', description: 'those odd values are skipped, so only 2, 4, 6 print' }
        ],
        whatChanged: 'Showed that continue works with any Boolean condition, not just a fixed check for evenness.'
      },
      {
        id: 'card-continue-3',
        number: '03',
        title: 'continue inside a while loop',
        language: 'Kotlin',
        subtitle: 'continue works the same way outside for loops too.',
        code: ['var i = 0', 'while (i < 6) {', '    i++', '    if (i % 2 == 0) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'i++', description: 'runs first every iteration, so i is already updated before continue could ever skip it' },
          { label: 'continue', description: 'skips println(i) but the while condition i < 6 is still checked again right after' },
          { label: 'Result', description: 'prints 1, 3, 5, then stops once i reaches 6' }
        ],
        whatChanged: 'Used continue inside a while loop, confirming it is not limited to for loops.'
      },
      {
        id: 'card-continue-4',
        number: '04',
        title: 'Skipping multiples of 3',
        language: 'Kotlin',
        subtitle: 'Scale the same pattern to a longer range.',
        code: ['for (i in 1..10) {', '    if (i % 3 == 0) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'i % 3 == 0', description: 'true for i = 3, 6, and 9' },
          { label: 'Result', description: 'those three values are skipped -- every other number from 1 to 10 still prints: 1, 2, 4, 5, 7, 8, 10' }
        ],
        whatChanged: 'Scaled continue up to a longer range, skipping every multiple of 3 instead of every other number.'
      },
      {
        id: 'card-continue-5',
        number: '05',
        title: 'continue vs. what break would do',
        language: 'Kotlin',
        subtitle: 'The same condition, but continue only removes ONE value from the output.',
        code: ['for (i in 1..5) {', '    if (i == 3) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [
          { label: 'continue at i == 3', description: 'skips only printing 3 -- the loop still goes on to check i = 4 and i = 5' },
          { label: 'Result', description: 'prints 1, 2, 4, 5' },
          { label: 'If this were break instead', description: 'the loop would stop completely the moment i == 3, so 4 and 5 would never even be reached, let alone printed' }
        ],
        whatChanged: 'Directly contrasted continue (skip one iteration, loop keeps going) with what break would do (stop the loop immediately) on the exact same condition.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace each iteration by hand -- decide which ones get skipped by continue and which ones actually reach println.',
    questions: [
      {
        id: 'pred-continue-1',
        questionNumber: 1,
        totalQuestions: 6,
        title: 'Skipping Even Numbers',
        topicMeta: 'Basic continue',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..5) {', '        if (i % 2 == 0) {', '            continue', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n3\n5', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5', isCorrect: false },
          { id: 'C', label: '2\n4', isCorrect: false },
          { id: 'D', label: 'Nothing is printed', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i % 2 == 0) { continue }', detail: 'i = 2 and i = 4 are even, so continue skips println(i) for those two iterations and jumps to the next one -- but the loop keeps running. i = 1, 3, 5 are odd, so they print normally, producing "1\n3\n5".' }
      },
      {
        id: 'pred-continue-2',
        questionNumber: 2,
        totalQuestions: 6,
        title: 'Skipping Multiples of Three',
        topicMeta: 'continue with %',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..6) {', '        if (i % 3 == 0) {', '            continue', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n4\n5', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5\n6', isCorrect: false },
          { id: 'C', label: '3\n6', isCorrect: false },
          { id: 'D', label: '1\n2\n4\n5\n6', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i % 3 == 0) { continue }', detail: '3 and 6 are multiples of 3, so continue skips printing them and the loop moves on to the next value. The rest -- 1, 2, 4, 5 -- still print normally, giving "1\n2\n4\n5".' }
      },
      {
        id: 'pred-continue-3',
        questionNumber: 3,
        totalQuestions: 6,
        title: 'continue in a while Loop',
        topicMeta: 'continue outside for',
        language: 'Kotlin',
        code: ['fun main() {', '    var i = 0', '    while (i < 6) {', '        i++', '        if (i % 2 == 0) {', '            continue', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n3\n5', isCorrect: true },
          { id: 'B', label: '0\n2\n4', isCorrect: false },
          { id: 'C', label: '1\n2\n3\n4\n5\n6', isCorrect: false },
          { id: 'D', label: 'Infinite loop -- never stops', isCorrect: false }
        ],
        explanation: { codeRef: 'i++', detail: 'i++ runs before the check each pass, incrementing i from 0 up toward 6. continue skips println whenever i becomes even, so only i = 1, 3, 5 reach println before the while condition i < 6 turns false at i = 6.' }
      },
      {
        id: 'pred-continue-4',
        questionNumber: 4,
        totalQuestions: 6,
        title: 'Skipping a Single Value',
        topicMeta: 'continue for one iteration',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..5) {', '        if (i == 3) {', '            continue', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n2\n4\n5', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5', isCorrect: false },
          { id: 'C', label: '1\n2', isCorrect: false },
          { id: 'D', label: '3', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i == 3) { continue }', detail: 'continue only skips the println for i = 3 -- the loop keeps going afterward, so i = 4 and i = 5 still print normally, giving "1\n2\n4\n5".' }
      },
      {
        id: 'pred-continue-5',
        questionNumber: 5,
        totalQuestions: 6,
        title: 'The Same Loop, with break Instead',
        topicMeta: 'break vs continue',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..5) {', '        if (i == 3) {', '            break', '        }', '        println(i)', '    }', '}'],
        prompt: 'This is the exact same loop as the previous question, but continue has been replaced with break. What does it print now?',
        options: [
          { id: 'A', label: '1\n2', isCorrect: true },
          { id: 'B', label: '1\n2\n4\n5', isCorrect: false },
          { id: 'C', label: '1\n2\n3', isCorrect: false },
          { id: 'D', label: '1\n2\n3\n4\n5', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i == 3) { break }', detail: 'Unlike continue, break exits the loop immediately the moment i == 3 -- so i = 4 and i = 5 are never reached at all. This is the key contrast with the previous question: continue produced "1\n2\n4\n5" because the loop kept going, while break produces only "1\n2" because the loop stopped completely.' }
      },
      {
        id: 'pred-continue-6',
        questionNumber: 6,
        totalQuestions: 6,
        title: 'continue in a do-while Loop',
        topicMeta: 'continue with do-while',
        language: 'Kotlin',
        code: ['fun main() {', '    var i = 0', '    do {', '        i++', '        if (i == 2) {', '            continue', '        }', '        println(i)', '    } while (i < 4)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '1\n3\n4', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4', isCorrect: false },
          { id: 'C', label: '1\n3', isCorrect: false },
          { id: 'D', label: '1\n2\n4', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i == 2) { continue }', detail: 'i increments each pass: 1 (prints), then 2 (continue skips the println, and the while i < 4 check still runs after), then 3 (prints), then 4 (prints, and the loop then stops since 4 < 4 is false). The result is "1\n3\n4".' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Skip Multiples of Four',
    description:
      'Skip loop iterations using continue.\n\n' +
      '1. Loop through numbers 1 to 10 (1..10).\n\n' +
      '2. If i is a multiple of 4 (i % 4 == 0), skip printing with continue.\n\n' +
      '3. Print all remaining numbers using println(i).',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'SkipMultiplesOfFour.kt',
    initialCode: `fun main() {
    for (i in 1..10) {
        // 1. If i is a multiple of 4 (i % 4 == 0), skip with continue:

        // 2. Print remaining numbers:
        println(i)
    }
}`,
    solutionCode: `fun main() {
    for (i in 1..10) {
        if (i % 4 == 0) {
            continue
        }
        println(i)
    }
}`,
    sampleInput: 'main()',
    expectedOutput: '1\n2\n3\n5\n6\n7\n9\n10',
    testCase: { call: '', expected: '1\n2\n3\n5\n6\n7\n9\n10' }
  },
  debug: {
    title: 'Diagnose the Break-Instead-of-Continue Bug',
    subtitle: 'The loop is only supposed to skip printing the number 3 and keep going through the rest of the range -- but it is stopping the whole loop instead.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: break Used Instead of continue',
    brokenCode: `fun main() {
    for (i in 1..5) {
        // BUG: this should only skip i == 3, not stop the whole loop!
        if (i == 3) {
            break
        }
        println(i)
    }
}`,
    fixedCode: `fun main() {
    for (i in 1..5) {
        if (i == 3) {
            continue
        }
        println(i)
    }
}`,
    expectedOutput: '1\n2\n4\n5',
    hints: [
      'Something is wrong with which control statement is being used inside the if -- not with the condition itself.',
      'The intent is to skip only i == 3 and keep printing the rest of the range -- does the loop actually keep going after i == 3?',
      'break exits the loop entirely; continue only skips the current iteration. Try replacing break with continue.'
    ],
    explanation:
      'break exits the loop completely the instant i == 3, so the loop never even reaches i = 4 or i = 5 -- the broken code only prints "1\n2". Replacing break with continue makes the program skip only the println for i = 3 while the loop keeps running afterward, so i = 4 and i = 5 still print, producing "1\n2\n4\n5".'
  },
  mastered: {
    topicTitle: 'continue',
    summary: 'You have mastered the continue keyword: skipping the rest of the current iteration while the loop itself keeps running, contrasting it directly with break, using it across for/while/do-while loops, and diagnosing a real break-used-instead-of-continue logic bug.',
    passedCount: '6 / 6 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'continue skips only the current iteration\'s remaining body -- the loop keeps running, unlike break' },
      { title: 'Examples explored', subtitle: '5 progressive continue patterns across for, while, and do-while loops' },
      { title: 'Predictions completed', subtitle: '6/6 correct output forecasts, including a direct break vs continue contrast' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a break-used-instead-of-continue logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 10: Nested loops (world-4-nested-loops)
// =========================================================================
export const NESTED_LOOPS_LESSON: FiveStageLesson = {
  id: 'world-4-nested-loops',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'Nested loops',
  learn: {
    title: 'Loops Inside Loops',
    subtitle:
      "A nested loop is simply one loop placed entirely inside another loop's body. The inner loop runs completely, start to finish, for EVERY single iteration of the outer loop -- this is the loop equivalent of the nested ifs you already saw in World 3, where the inner check only happens as a follow-up to the outer one.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'A multiplication table with nested loops',
    language: 'Kotlin',
    codeSnippet: [
      'for (i in 1..2) {',
      '    for (j in 1..2) {',
      '        println("$i x $j = ${i * j}")',
      '    }',
      '}'
    ],
    explanation:
      'The outer loop runs i = 1, then i = 2. For EACH of those, the inner loop runs completely through j = 1, then j = 2 before the outer loop is even allowed to move on. So the full sequence of (i, j) pairs is (1,1), (1,2), (2,1), (2,2) -- 4 pairs total, because the outer loop has 2 iterations and the inner loop has 2 iterations per outer iteration: 2 * 2 = 4.',
    keyIdeas: [
      { number: 1, title: 'The inner loop runs fully, every time', description: 'For each single pass of the outer loop, the entire inner loop runs from its start value all the way to its end value before control returns to the outer loop.' },
      { number: 2, title: 'Total iterations multiply', description: 'If the outer loop runs 3 times and the inner loop runs 2 times per outer pass, the innermost code runs 3 * 2 = 6 times in total -- the counts multiply, they do not add.' },
      { number: 3, title: 'break and continue only affect the innermost loop', description: "A break or continue written inside the inner loop only stops or skips THAT inner loop's current pass -- it has no effect at all on the outer loop, which keeps running normally." },
      { number: 4, title: 'Natural use cases', description: 'Nested loops are the natural way to build a grid, a table (like a multiplication table), or any pattern that needs a row-by-column structure -- the outer loop walks the rows, the inner loop walks the columns of that row.' }
    ],
    keyTakeaway: 'A loop nested inside another runs completely for every single iteration of the outer loop, so the total number of inner-body runs is outer-count * inner-count -- and break/continue inside the inner loop only ever affect that inner loop.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: "See a nested loop's full (outer, inner) trace, how the total iteration count multiplies, a real multiplication-table use case, and how break/continue stay confined to the inner loop.",
    cards: [
      {
        id: 'card-nested-1',
        number: '01',
        title: 'The basic nested structure',
        language: 'Kotlin',
        subtitle: 'The inner loop completes fully for every outer value.',
        code: ['for (row in 1..2) {', '    for (col in 1..2) {', '        println("row=$row, col=$col")', '    }', '}'],
        whatItMeans: [
          { label: 'for (row in 1..2)', description: 'the outer loop -- runs row = 1, then row = 2' },
          { label: 'for (col in 1..2)', description: 'the inner loop -- for EACH row value, runs col = 1 then col = 2 to completion' },
          { label: 'Result', description: 'prints row=1,col=1 / row=1,col=2 / row=2,col=1 / row=2,col=2, in that exact order' }
        ],
        whatChanged: "Introduced the basic nested-loop shape: one for loop entirely inside another's body."
      },
      {
        id: 'card-nested-2',
        number: '02',
        title: 'Total iterations multiply, not add',
        language: 'Kotlin',
        subtitle: 'An outer loop of 3 and an inner loop of 2 run the inner body 3 * 2 = 6 times.',
        code: ['var total = 0', 'for (i in 1..3) {', '    for (j in 1..2) {', '        total++', '    }', '}', 'println(total)'],
        whatItMeans: [
          { label: 'for (i in 1..3)', description: 'outer loop runs 3 times' },
          { label: 'for (j in 1..2)', description: 'inner loop runs 2 times for EACH of those 3 outer passes' },
          { label: 'total', description: 'incremented once per inner-body run: 3 * 2 = 6, so this prints 6' }
        ],
        whatChanged: 'Made the outer-count * inner-count relationship visible by counting every inner-body execution.'
      },
      {
        id: 'card-nested-3',
        number: '03',
        title: 'A multiplication table',
        language: 'Kotlin',
        subtitle: 'A natural, realistic use case for nested loops.',
        code: ['for (i in 1..3) {', '    for (j in 1..3) {', '        println("$i x $j = ${i * j}")', '    }', '}'],
        whatItMeans: [
          { label: 'Outer loop (i)', description: 'walks each row of the table, 1 through 3' },
          { label: 'Inner loop (j)', description: 'for each row i, walks every column 1 through 3, printing i x j = i * j' },
          { label: 'Result', description: 'prints all 9 combinations, from "1 x 1 = 1" up to "3 x 3 = 9"' }
        ],
        whatChanged: 'Applied the nested-loop pattern to a real, practical task: generating a multiplication table.'
      },
      {
        id: 'card-nested-4',
        number: '04',
        title: 'A simple grid pattern',
        language: 'Kotlin',
        subtitle: 'Building a square of characters, row by row.',
        code: ['for (i in 1..3) {', '    for (j in 1..3) {', '        print("*")', '    }', '    println()', '}'],
        whatItMeans: [
          { label: 'Inner loop', description: 'prints 3 stars on the same line using print() (no newline yet)' },
          { label: 'println() after the inner loop', description: 'runs once per outer pass, right after the inner loop finishes -- it moves to a new line to start the next row' },
          { label: 'Result', description: 'prints a 3x3 square: "***" on each of 3 lines' }
        ],
        whatChanged: 'Showed that code placed AFTER the inner loop, but still inside the outer loop, runs once per outer iteration -- here, to end each row.'
      },
      {
        id: 'card-nested-5',
        number: '05',
        title: 'break only exits the inner loop',
        language: 'Kotlin',
        subtitle: 'A break inside the inner loop never touches the outer loop.',
        code: ['for (i in 1..3) {', '    for (j in 1..3) {', '        if (j == 2) break', '        println("i=$i, j=$j")', '    }', '}'],
        whatItMeans: [
          { label: 'if (j == 2) break', description: 'stops the CURRENT inner loop as soon as j reaches 2' },
          { label: 'Outer loop', description: 'is completely unaffected -- it moves on to the next i value normally, and the inner loop starts fresh (j = 1 again) each time' },
          { label: 'Result', description: 'prints i=1,j=1 / i=2,j=1 / i=3,j=1 -- one line per outer pass, since j always breaks right after printing j=1' }
        ],
        whatChanged: 'Demonstrated that break inside a nested loop only ever affects the innermost loop it is directly inside.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Trace the outer loop and inner loop together, pair by pair -- write out the (outer, inner) sequence before answering if it helps.',
    questions: [
      {
        id: 'pred-nested-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Total Iteration Count',
        topicMeta: 'Outer-count * inner-count',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 0', '    for (i in 1..3) {', '        for (j in 1..2) {', '            count++', '        }', '    }', '    println(count)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '5', isCorrect: false },
          { id: 'B', label: '6', isCorrect: true },
          { id: 'C', label: '3', isCorrect: false },
          { id: 'D', label: '2', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 1..3) { for (j in 1..2) { count++ } }', detail: 'The outer loop runs 3 times, and for each of those the inner loop runs 2 times, so count is incremented 3 * 2 = 6 times in total.' }
      },
      {
        id: 'pred-nested-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Tracing Both Loop Variables',
        topicMeta: 'Full interleaved trace',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..2) {', '        for (j in 1..3) {', '            println("i=$i, j=$j")', '        }', '    }', '}'],
        prompt: 'What will this code print, in order?',
        options: [
          { id: 'A', label: 'i=1, j=1\ni=1, j=2\ni=1, j=3\ni=2, j=1\ni=2, j=2\ni=2, j=3', isCorrect: true },
          { id: 'B', label: 'i=1, j=1\ni=2, j=1\ni=1, j=2\ni=2, j=2\ni=1, j=3\ni=2, j=3', isCorrect: false },
          { id: 'C', label: 'i=1, j=1\ni=1, j=2\ni=1, j=3', isCorrect: false },
          { id: 'D', label: 'i=1, j=3\ni=2, j=3', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 1..2) { for (j in 1..3) { ... } }', detail: 'The inner loop runs completely for each outer value before the outer loop advances: first i=1 pairs with j=1, j=2, j=3 in order, THEN i becomes 2 and pairs with j=1, j=2, j=3 again -- never interleaved, and never repeating the same i twice separately.' }
      },
      {
        id: 'pred-nested-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'break Only Exits the Inner Loop',
        topicMeta: 'break scoping',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..3) {', '        for (j in 1..3) {', '            if (j == 2) break', '            println("i=$i, j=$j")', '        }', '    }', '}'],
        prompt: 'What will this code print, in order?',
        options: [
          { id: 'A', label: 'i=1, j=1\ni=2, j=1\ni=3, j=1', isCorrect: true },
          { id: 'B', label: 'i=1, j=1', isCorrect: false },
          { id: 'C', label: 'i=1, j=1\ni=1, j=2\ni=1, j=3', isCorrect: false },
          { id: 'D', label: '(nothing is printed)', isCorrect: false }
        ],
        explanation: { codeRef: 'if (j == 2) break', detail: 'break only exits the innermost (j) loop, never the outer (i) loop. For each of i=1, i=2, i=3: the inner loop prints j=1, then hits j=2 and breaks immediately -- so exactly one line prints per outer pass, and the outer loop keeps running normally for all 3 values of i.' }
      },
      {
        id: 'pred-nested-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'continue Only Skips the Inner Loop',
        topicMeta: 'continue scoping',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..2) {', '        for (j in 1..3) {', '            if (j == 2) continue', '            println("$i$j")', '        }', '    }', '}'],
        prompt: 'What will this code print, in order?',
        options: [
          { id: 'A', label: '11\n13\n21\n23', isCorrect: true },
          { id: 'B', label: '11\n21', isCorrect: false },
          { id: 'C', label: '11\n12\n13\n21\n22\n23', isCorrect: false },
          { id: 'D', label: '11\n13', isCorrect: false }
        ],
        explanation: { codeRef: 'if (j == 2) continue', detail: 'continue only skips the current pass of the innermost (j) loop -- it does not affect the outer (i) loop at all. For each i, j=2 is skipped but j=1 and j=3 still print, and the outer loop still runs for both i=1 and i=2, giving 11, 13, 21, 23 in order.' }
      },
      {
        id: 'pred-nested-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'A Small Multiplication Table',
        topicMeta: 'Real-world nested-loop pattern',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..2) {', '        for (j in 1..2) {', '            println("$i x $j = ${i * j}")', '        }', '    }', '}'],
        prompt: 'What will this code print, in order?',
        options: [
          { id: 'A', label: '1 x 1 = 1\n1 x 2 = 2\n2 x 1 = 2\n2 x 2 = 4', isCorrect: true },
          { id: 'B', label: '1 x 1 = 1\n2 x 2 = 4', isCorrect: false },
          { id: 'C', label: '1 x 1 = 1\n2 x 1 = 2\n1 x 2 = 2\n2 x 2 = 4', isCorrect: false },
          { id: 'D', label: '1 x 1 = 1\n1 x 2 = 2', isCorrect: false }
        ],
        explanation: { codeRef: '${i * j}', detail: 'For i=1, the inner loop produces "1 x 1 = 1" and "1 x 2 = 2". Only once the inner loop finishes does i become 2, producing "2 x 1 = 2" and "2 x 2 = 4" -- four lines total, since the outer loop runs 2 times and the inner loop runs 2 times per outer pass.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 30,
    title: 'Print a Multiplication Table',
    description:
      'Generate a 3x3 multiplication table using nested loops.\n\n' +
      '1. Write an outer loop: for i from 1 to 3 (1..3).\n\n' +
      '2. Inside, write an inner loop: for j from 1 to 3 (1..3).\n\n' +
      '3. Print each multiplication result formatted as:\n' +
      '"$i x $j = ${i * j}"',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'MultiplicationTable.kt',
    initialCode: `fun main() {
    // 1. Outer loop: for i from 1 to 3:

        // 2. Inner loop: for j from 1 to 3:

            // 3. Print each pair as "$i x $j = \${i * j}":
}`,
    solutionCode: `fun main() {
    for (i in 1..3) {
        for (j in 1..3) {
            println("$i x $j = \${i * j}")
        }
    }
}`,
    sampleInput: 'main()',
    expectedOutput: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9',
    testCase: { call: '', expected: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9' }
  },
  debug: {
    title: 'Diagnose the Un-Tied Inner Range',
    subtitle: "The program should print a growing triangle of stars, but it is printing a full square instead -- inspect the inner loop's range and fix it.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Inner Loop Range Not Tied to Outer Variable',
    brokenCode: `fun main() {
    // BUG: the inner loop always runs 1..3, no matter what row (i) it's on --
    // it should only run 1..i, so each row prints one more star than the last!
    for (i in 1..3) {
        for (j in 1..3) {
            print("*")
        }
        println()
    }
}`,
    fixedCode: `fun main() {
    for (i in 1..3) {
        for (j in 1..i) {
            print("*")
        }
        println()
    }
}`,
    expectedOutput: '*\n**\n***',
    hints: [
      "Something is wrong with the inner loop's range, not with the outer loop or the printing itself.",
      'Row i should print exactly i stars -- does the inner loop\'s upper bound actually depend on i at all?',
      'Change the inner loop\'s range from a fixed 1..3 to 1..i, so it grows along with the outer loop variable.'
    ],
    explanation:
      'The inner loop\'s range was hardcoded as 1..3, so every row printed exactly 3 stars regardless of which row (i) it was on -- producing a full 3x3 square ("***" on all three lines) instead of a growing triangle. Changing the inner loop to 1..i ties its length to the current outer value: row i=1 prints 1 star, row i=2 prints 2 stars, and row i=3 prints 3 stars, producing "*", "**", "***" on successive lines.'
  },
  mastered: {
    topicTitle: 'Nested loops',
    summary: 'You have mastered nested loops: placing one loop entirely inside another so the inner loop runs fully for every outer iteration, understanding that total iterations multiply (outer-count * inner-count), using nested loops for a multiplication table and a grid pattern, seeing that break/continue only ever affect the innermost loop, and diagnosing a real inner-range logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'The inner loop runs completely for every single iteration of the outer loop' },
      { title: 'Examples explored', subtitle: '5 progressive nested-loop patterns, from basic tracing to a multiplication table, a grid, and break scoping' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts, including a full interleaved (outer, inner) trace and break/continue confined to the inner loop' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed: a nested-loop multiplication table' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved an inner-loop range not tied to the outer variable & verified execution' }
    ],
    xpEarned: 30,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// WORLD 4 BOSS: Pattern & Number Analyzer (world-4-boss)
// =========================================================================
export const WORLD_4_BOSS_LESSON: FiveStageLesson = {
  id: 'world-4-boss',
  worldId: 'world-4',
  worldName: 'Loop Master',
  stageName: 'STAGE 4 — LOOPS',
  topicTitle: 'Pattern & Number Analyzer',
  learn: {
    title: 'World 4 Boss: Pattern & Number Analyzer',
    subtitle:
      'Congratulations on reaching the World 4 Boss! You will now assemble everything you learned in Loop Master: for-loops with step and downTo, while/do-while, break, continue, and combine them with World 2 and World 3 tools (accumulators, modulo, if/when) to analyze a range of numbers.',
    exampleTag: 'CAPSTONE',
    exampleTitle: 'The Complete Analyzer Structure',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    var total = 0',
      '    for (i in 1..12 step 3) {',
      '        if (i % 9 == 0) {',
      '            continue',
      '        }',
      '        total += i',
      '        if (total > 15) {',
      '            println("Stopping early, total=$total")',
      '            break',
      '        }',
      '        println("Kept $i, total=$total")',
      '    }',
      '}'
    ],
    explanation:
      'A capstone loop program combines a stepped range, a skip condition (continue), a running accumulator, and an early exit (break) into one coherent analysis pass.',
    keyIdeas: [
      { number: 1, title: 'Stepped ranges drive the scan', description: '`for (i in a..b step n)` (or `downTo`) controls exactly which numbers get visited.' },
      { number: 2, title: 'continue filters, break stops', description: 'continue skips just the current number; break ends the whole loop the moment a condition is met.' },
      { number: 3, title: 'Accumulate as you go', description: 'A var total built up with += tracks running state across iterations.' },
      { number: 4, title: 'World 4 Mastery', description: 'Proves you can combine multiple loop constructs with conditions into one real analysis program.' }
    ],
    keyTakeaway: 'You now possess every loop tool needed to scan, filter, accumulate, and stop -- the core of real Kotlin iteration.'
  },
  explore: {
    title: 'Explore the Capstone Loop Patterns',
    subtitle: 'Review the integrated loop fundamentals before you build the full analyzer.',
    cards: [
      {
        id: 'card-boss4-1',
        number: '01',
        title: 'Stepped range + accumulator',
        language: 'Kotlin',
        subtitle: 'Sum only the numbers a step-range actually visits.',
        code: ['var sum = 0', 'for (i in 1..10 step 5) {', '    sum += i', '}', 'println("Sum: $sum")'],
        whatItMeans: [{ label: 'step 5', description: 'Only visits 1 and 6, so sum accumulates 1 + 6 = 7' }],
        whatChanged: 'Combined a stepped range with a running accumulator.'
      },
      {
        id: 'card-boss4-2',
        number: '02',
        title: 'continue filters out unwanted values',
        language: 'Kotlin',
        subtitle: 'Skip a number without ending the loop.',
        code: ['for (i in 1..8) {', '    if (i % 3 == 0) {', '        continue', '    }', '    println(i)', '}'],
        whatItMeans: [{ label: 'continue', description: 'Jumps straight to the next iteration, skipping 3 and 6' }],
        whatChanged: 'Used continue to filter multiples of 3 out of the output.'
      },
      {
        id: 'card-boss4-3',
        number: '03',
        title: 'break ends the loop the moment a condition hits',
        language: 'Kotlin',
        subtitle: 'Stop scanning as soon as a limit is reached.',
        code: ['for (i in 1..100) {', '    if (i > 5) {', '        break', '    }', '    println(i)', '}'],
        whatItMeans: [{ label: 'break', description: 'Exits the loop entirely once i exceeds 5, even though the range goes to 100' }],
        whatChanged: 'Demonstrated an early exit that bounds a loop by a condition, not just its range.'
      },
      {
        id: 'card-boss4-4',
        number: '04',
        title: 'when + continue + accumulator, together',
        language: 'Kotlin',
        subtitle: 'The exact pattern the boss challenge builds on.',
        code: ['var total = 0', 'for (i in 1..6) {', '    when (i % 2) {', '        0 -> total += i', '        else -> continue', '    }', '    println("Running total: $total")', '}'],
        whatItMeans: [{ label: 'when (i % 2)', description: 'Routes odd i straight to continue, and even i into the accumulator' }],
        whatChanged: 'Fused when, continue, and an accumulator inside a single for-loop.'
      }
    ]
  },
  predict: {
    title: 'Predict Capstone Loop Output',
    subtitle: 'Test your holistic understanding of World 4 loop concepts combined together.',
    questions: [
      {
        id: 'pred-boss4-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Stepped accumulation',
        topicMeta: 'step + accumulator',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 0', '    for (i in 2..10 step 2) {', '        total += i', '    }', '    println(total)', '}'],
        prompt: 'What will this program print?',
        options: [
          { id: 'A', label: '30', isCorrect: true },
          { id: 'B', label: '20', isCorrect: false },
          { id: 'C', label: '15', isCorrect: false },
          { id: 'D', label: '55', isCorrect: false }
        ],
        explanation: { codeRef: 'for (i in 2..10 step 2)', detail: 'The stepped range visits 2, 4, 6, 8, 10. Accumulating with += gives 2+4+6+8+10 = 30.' }
      },
      {
        id: 'pred-boss4-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'continue filtering',
        topicMeta: 'continue skips only the current value',
        language: 'Kotlin',
        code: ['fun main() {', '    for (i in 1..6) {', '        if (i % 2 == 0) {', '            continue', '        }', '        println(i)', '    }', '}'],
        prompt: 'What will this program print?',
        options: [
          { id: 'A', label: '1\n3\n5', isCorrect: true },
          { id: 'B', label: '1\n2\n3\n4\n5\n6', isCorrect: false },
          { id: 'C', label: '2\n4\n6', isCorrect: false },
          { id: 'D', label: '1\n3\n5\n6', isCorrect: false }
        ],
        explanation: { codeRef: 'if (i % 2 == 0) { continue }', detail: 'Every even i is skipped with continue before println runs, so only 1, 3, and 5 are printed, each on its own line.' }
      },
      {
        id: 'pred-boss4-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'break stopping a counter',
        topicMeta: 'break ends the loop early',
        language: 'Kotlin',
        code: ['fun main() {', '    var count = 0', '    for (i in 1..20) {', '        count++', '        if (count == 4) {', '            break', '        }', '    }', '    println("Loop stopped, count=$count")', '}'],
        prompt: 'What will this program print?',
        options: [
          { id: 'A', label: 'Loop stopped, count=4', isCorrect: true },
          { id: 'B', label: 'Loop stopped, count=20', isCorrect: false },
          { id: 'C', label: 'Loop stopped, count=3', isCorrect: false },
          { id: 'D', label: 'Loop stopped, count=0', isCorrect: false }
        ],
        explanation: { codeRef: 'if (count == 4) { break }', detail: 'count increments once per iteration (1, 2, 3, 4). The instant it reaches 4, break exits the loop, so the final printed count is 4, not the range\'s upper bound of 20.' }
      },
      {
        id: 'pred-boss4-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'when + for classification',
        topicMeta: 'when(subject) inside a for-loop',
        language: 'Kotlin',
        code: ['fun main() {', '    var evenCount = 0', '    for (i in 1..5) {', '        val label = when (i % 2) {', '            0 -> "even"', '            else -> "odd"', '        }', '        if (label == "even") {', '            evenCount++', '        }', '        println("$i is $label")', '    }', '    println("Total even: $evenCount")', '}'],
        prompt: 'What will this program print?',
        options: [
          { id: 'A', label: '1 is odd\n2 is even\n3 is odd\n4 is even\n5 is odd\nTotal even: 2', isCorrect: true },
          { id: 'B', label: '1 is even\n2 is odd\n3 is even\n4 is odd\n5 is even\nTotal even: 3', isCorrect: false },
          { id: 'C', label: '1 is odd\n2 is even\n3 is odd\n4 is even\n5 is odd\nTotal even: 3', isCorrect: false },
          { id: 'D', label: 'Total even: 2', isCorrect: false }
        ],
        explanation: { codeRef: 'when (i % 2) { 0 -> "even"; else -> "odd" }', detail: 'i goes 1..5, so i % 2 alternates 1,0,1,0,1 -> odd,even,odd,even,odd. Each line prints, and evenCount only increments for 2 and 4, ending at 2.' }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 60,
    title: 'Build the Pattern & Number Analyzer',
    description:
      'Declare var total = 0.\n\n' +
      '1. Loop through odd numbers using for (i in 1..19 step 2).\n\n' +
      '2. Skip multiples of 5 using continue (i % 5 == 0).\n\n' +
      '3. Add the number to total (total += i).\n\n' +
      '4. If total > 40, print "Total exceeded limit, stopping." and terminate the loop with break.\n\n' +
      '5. Otherwise, print "Counted $i, total so far: $total".',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'PatternAnalyzer.kt',
    initialCode: `fun main() {
    var total = 0

    // 1. Loop from 1 to 19 step 2:
    // 2. Skip multiples of 5 with continue:
    // 3. Add i to total:
    // 4. If total > 40, print "Total exceeded limit, stopping." and break:
    // 5. Otherwise print "Counted $i, total so far: $total":
}`,
    solutionCode: `fun main() {
    var total = 0
    for (i in 1..19 step 2) {
        if (i % 5 == 0) {
            continue
        }
        total += i
        if (total > 40) {
            println("Total exceeded limit, stopping.")
            break
        }
        println("Counted $i, total so far: $total")
    }
}`,
    sampleInput: 'main()',
    expectedOutput:
      'Counted 1, total so far: 1\nCounted 3, total so far: 4\nCounted 7, total so far: 11\nCounted 9, total so far: 20\nCounted 11, total so far: 31\nTotal exceeded limit, stopping.',
    testCase: {
      call: '',
      expected:
        'Counted 1, total so far: 1\nCounted 3, total so far: 4\nCounted 7, total so far: 11\nCounted 9, total so far: 20\nCounted 11, total so far: 31\nTotal exceeded limit, stopping.'
    }
  },
  debug: {
    title: 'Fix the Broken Pattern Analyzer',
    subtitle: 'Find and resolve the accumulator bug hiding inside this capstone loop.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'hard',
    bugType: 'logic',
    bugLabel: 'Accumulator Overwritten Instead of Accumulated',
    brokenCode: `fun main() {
    var sum = 0
    for (i in 2..20 step 2) {
        if (i % 6 == 0) {
            continue
        }
        sum = i
        if (sum > 60) {
            println("Limit reached at $i")
            break
        }
        println("Added $i, sum is $sum")
    }
}`,
    fixedCode: `fun main() {
    var sum = 0
    for (i in 2..20 step 2) {
        if (i % 6 == 0) {
            continue
        }
        sum += i
        if (sum > 60) {
            println("Limit reached at $i")
            break
        }
        println("Added $i, sum is $sum")
    }
}`,
    expectedOutput:
      'Added 2, sum is 2\nAdded 4, sum is 6\nAdded 8, sum is 14\nAdded 10, sum is 24\nAdded 14, sum is 38\nAdded 16, sum is 54\nLimit reached at 20',
    hints: [
      'Something is wrong with how the running total accumulates across iterations.',
      "Check the difference between replacing sum's value each time and adding to it.",
      'Look closely at the line updating sum inside the loop -- is it `sum = i` or `sum += i`?'
    ],
    explanation:
      'The loop steps through 2, 4, 6, 8, ... 20, skipping any multiple of 6 (6, 12, 18) with continue. The bug uses `sum = i`, which overwrites sum with the current i instead of adding to it, so sum can never build up past whatever i currently is -- it never exceeds 60 and the "Limit reached" branch never runs, so the loop silently reaches the end of the range instead of stopping early. Changing `sum = i` to `sum += i` makes sum a genuine running total, which correctly exceeds 60 once i reaches 20 and triggers the break.'
  },
  mastered: {
    topicTitle: 'Pattern & Number Analyzer',
    summary:
      'You defeated the World 4 Boss! You demonstrated full mastery of Loop Master: for-loops with ranges, until, downTo, and step, while/do-while, break, continue, and combining loops with accumulators and conditions from earlier worlds.',
    passedCount: '4 / 4 PASSED',
    verificationItems: [
      { title: 'Loop constructs mastered', subtitle: 'for with ranges/until/downTo/step, while, do-while' },
      { title: 'Loop control mastered', subtitle: 'break and continue, each scoped to their innermost loop' },
      { title: 'Integration with earlier worlds', subtitle: 'Accumulators, modulo, if, and when combined inside loops' },
      { title: 'World 4 Boss Defeated', subtitle: 'Awarded Loop Master Badge' }
    ],
    xpEarned: 60,
    streakDays: 1,
    accuracy: '100%'
  }
};
