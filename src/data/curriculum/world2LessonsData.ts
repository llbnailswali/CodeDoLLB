import { FiveStageLesson } from '../lessonStagesData';

// =========================================================================
// LESSON 1: Arithmetic Operators (world-2-arithmetic-operators)
// =========================================================================
export const ARITHMETIC_OPERATORS_LESSON: FiveStageLesson = {
  id: 'world-2-arithmetic-operators',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Arithmetic Operators',
  learn: {
    title: 'Doing Math in Kotlin',
    subtitle:
      "Kotlin gives you five arithmetic operators: +, -, *, /, and %. Most behave exactly as you'd expect, but integer division has a surprising rule -- dividing two Ints always produces a whole-number Int, truncating any decimal part.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'The five arithmetic operators',
    language: 'Kotlin',
    codeSnippet: [
      'val a = 5',
      'val b = 2',
      'println(a / b)   // 2 -- Int / Int truncates',
      'println(a % b)   // 1 -- remainder of 5 / 2',
      'println(5.0 / b) // 2.5 -- a Double operand promotes the result'
    ],
    explanation:
      'When both operands are Int, / performs integer division: it divides, then throws away anything after the decimal point. The % operator gives you exactly what that division threw away -- the remainder. If either operand is a Double, Kotlin switches to floating-point division and keeps the fractional part.',
    keyIdeas: [
      {
        number: 1,
        title: 'Five core operators',
        description: '+, -, *, /, and % handle addition, subtraction, multiplication, division, and remainder.'
      },
      {
        number: 2,
        title: 'Int / Int truncates',
        description: 'Dividing two Ints drops any decimal remainder and keeps the result as a whole-number Int -- 5 / 2 is 2, not 2.5.'
      },
      {
        number: 3,
        title: '% returns the remainder',
        description: 'Modulo gives you what division left over -- 17 % 5 is 2, because 5 fits into 17 three times with 2 left.'
      },
      {
        number: 4,
        title: 'Mixing with Double promotes the result',
        description: 'If either operand is a Double, Kotlin performs floating-point division instead -- 5.0 / 2 is 2.5.'
      }
    ],
    keyTakeaway:
      'Int / Int truncates to a whole number, % gives you the remainder that division dropped, and adding just one Double operand promotes the whole calculation to floating-point.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'Build your understanding step by step, from basic arithmetic to truncation, modulo, and Double promotion.',
    cards: [
      {
        id: 'card-arith-1',
        number: '01',
        title: 'Basic arithmetic',
        language: 'Kotlin',
        subtitle: 'Addition, subtraction, and multiplication behave as expected.',
        code: ['val a = 10', 'val b = 3', 'println(a + b)', 'println(a - b)', 'println(a * b)'],
        whatItMeans: [
          { label: 'a + b', description: 'Adds the two values: 10 + 3 = 13' },
          { label: 'a - b', description: 'Subtracts b from a: 10 - 3 = 7' },
          { label: 'a * b', description: 'Multiplies the two values: 10 * 3 = 30' }
        ],
        whatChanged: 'Established the three most familiar arithmetic operators.'
      },
      {
        id: 'card-arith-2',
        number: '02',
        title: 'Integer division truncates',
        language: 'Kotlin',
        subtitle: 'Dividing two Ints drops the decimal part entirely.',
        code: ['val a = 7', 'val b = 2', 'println(a / b)'],
        whatItMeans: [
          { label: 'a / b', description: 'Int / Int division: 7 / 2 is mathematically 3.5, but the result truncates to 3' },
          { label: 'No rounding', description: 'Kotlin does not round -- it simply discards everything after the decimal point' }
        ],
        whatChanged: 'Revealed that Int / Int never produces a fractional result.'
      },
      {
        id: 'card-arith-3',
        number: '03',
        title: 'The modulo operator',
        language: 'Kotlin',
        subtitle: 'Get the remainder left over from division.',
        code: ['val a = 17', 'val b = 5', 'println(a % b)'],
        whatItMeans: [
          { label: 'a % b', description: '5 divides into 17 three times (15), leaving a remainder of 2' },
          { label: 'Use cases', description: 'Modulo is commonly used to check even/odd numbers or wrap values around a limit' }
        ],
        whatChanged: 'Introduced % to recover what integer division throws away.'
      },
      {
        id: 'card-arith-4',
        number: '04',
        title: 'Mixing Int and Double promotes the result',
        language: 'Kotlin',
        subtitle: 'One Double operand is enough to switch to floating-point math.',
        code: ['val a = 5', 'val b = 2', 'println(a / b)', 'println(a / 2.0)'],
        whatItMeans: [
          { label: 'a / b', description: 'Both operands are Int, so this still truncates to 2' },
          { label: 'a / 2.0', description: 'The Double literal 2.0 promotes the whole expression to Double: 5 / 2.0 is 2.5' }
        ],
        whatChanged: 'Showed that a single Double operand is enough to avoid truncation.'
      },
      {
        id: 'card-arith-5',
        number: '05',
        title: 'Operator precedence',
        language: 'Kotlin',
        subtitle: 'Multiplication and division run before addition and subtraction.',
        code: ['val result = 2 + 3 * 4', 'println(result)'],
        whatItMeans: [
          { label: '3 * 4', description: 'Multiplication is evaluated first, producing 12' },
          { label: '2 + 12', description: 'Addition happens second, producing the final result: 14' }
        ],
        whatChanged: 'Confirmed that Kotlin follows standard mathematical operator precedence.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-arith-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Integer Division',
        topicMeta: 'Int / Int truncation',
        language: 'Kotlin',
        code: ['fun main() {', '    val a = 9', '    val b = 4', '    println(a / b)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2', isCorrect: true },
          { id: 'B', label: '2.25', isCorrect: false },
          { id: 'C', label: '1', isCorrect: false },
          { id: 'D', label: '3', isCorrect: false }
        ],
        explanation: {
          codeRef: 'a / b',
          detail: '9 / 4 is mathematically 2.25, but Int / Int division truncates the decimal part, leaving 2.'
        }
      },
      {
        id: 'pred-arith-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'The Modulo Operator',
        topicMeta: 'Remainder with %',
        language: 'Kotlin',
        code: ['fun main() {', '    val remainder = 17 % 5', '    println(remainder)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '2', isCorrect: true },
          { id: 'B', label: '3', isCorrect: false },
          { id: 'C', label: '0', isCorrect: false },
          { id: 'D', label: '5', isCorrect: false }
        ],
        explanation: {
          codeRef: '17 % 5',
          detail: '5 divides into 17 three times (5 * 3 = 15), leaving a remainder of 2.'
        }
      },
      {
        id: 'pred-arith-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Operator Precedence',
        topicMeta: 'Precedence rules',
        language: 'Kotlin',
        code: ['fun main() {', '    val result = 2 + 3 * 4', '    println(result)', '}'],
        prompt: 'What is the resulting output?',
        options: [
          { id: 'A', label: '14', isCorrect: true },
          { id: 'B', label: '20', isCorrect: false },
          { id: 'C', label: '9', isCorrect: false },
          { id: 'D', label: '24', isCorrect: false }
        ],
        explanation: {
          codeRef: '2 + 3 * 4',
          detail: 'Multiplication runs before addition: 3 * 4 = 12, then 2 + 12 = 14.'
        }
      },
      {
        id: 'pred-arith-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Double Promotion',
        topicMeta: 'Mixing Int and Double',
        language: 'Kotlin',
        code: ['fun main() {', '    val a = 5', '    val b = 2', '    println(a / b)', '    println(5.0 / b)', '}'],
        prompt: 'What does this program print, in order?',
        options: [
          { id: 'A', label: '2\n2.5', isCorrect: true },
          { id: 'B', label: '2.5\n2.5', isCorrect: false },
          { id: 'C', label: '2\n2', isCorrect: false },
          { id: 'D', label: '2.5\n2', isCorrect: false }
        ],
        explanation: {
          codeRef: '5.0 / b',
          detail: 'a / b is Int / Int, so it truncates to 2. But 5.0 / b has a Double operand, so it promotes to floating-point division and prints 2.5.'
        }
      },
      {
        id: 'pred-arith-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Modulo in Practice',
        topicMeta: 'Applying % to real values',
        language: 'Kotlin',
        code: ['fun main() {', '    val price = 47', '    val discount = 10', '    println(price % discount)', '}'],
        prompt: 'What is the resulting output?',
        options: [
          { id: 'A', label: '7', isCorrect: true },
          { id: 'B', label: '4', isCorrect: false },
          { id: 'C', label: '37', isCorrect: false },
          { id: 'D', label: '470', isCorrect: false }
        ],
        explanation: {
          codeRef: 'price % discount',
          detail: '10 divides into 47 four times (10 * 4 = 40), leaving a remainder of 7.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Split the Loot',
    description:
      'Declare val coins = 47 and val players = 5.\n\n' +
      '1. Calculate each player\'s equal share using integer division (coins / players).\n' +
      '2. Calculate the leftover coins using the modulo operator (coins % players).\n' +
      '3. Print the result as:\n' +
      '"Each player gets 9 coins, with 2 left over"',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'SplitLoot.kt',
    initialCode: `fun main() {
    val coins = 47
    val players = 5
    // 1. Calculate each player's share using integer division (coins / players):

    // 2. Calculate the leftover coins using modulo (coins % players):

    // 3. Print "Each player gets 9 coins, with 2 left over"
}`,
    solutionCode: `fun main() {
    val coins = 47
    val players = 5
    val share = coins / players
    val leftover = coins % players
    println("Each player gets $share coins, with $leftover left over")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Each player gets 9 coins, with 2 left over',
    testCase: { call: '', expected: 'Each player gets 9 coins, with 2 left over' }
  },
  debug: {
    title: 'Diagnose the Total Cost Bug',
    subtitle: 'The total cost is wrong -- identify why, and fix the operator.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Arithmetic Operator',
    brokenCode: `fun main() {
    val pricePerItem = 8
    val quantity = 6
    // BUG: adding gives the price plus the quantity, not the true total cost!
    val totalCost = pricePerItem + quantity
    println("Total cost: $totalCost")
}`,
    fixedCode: `fun main() {
    val pricePerItem = 8
    val quantity = 6
    val totalCost = pricePerItem * quantity
    println("Total cost: $totalCost")
}`,
    expectedOutput: 'Total cost: 48',
    hints: [
      'Look at how the total cost is being calculated from the price and the quantity.',
      'pricePerItem + quantity only gives 8 + 6 = 14 -- that ignores that there are 6 items each costing 8.',
      'Replace the + operator with * so totalCost = pricePerItem * quantity = 48.'
    ],
    explanation:
      'pricePerItem + quantity only adds 6 to 8, giving 14 -- it never accounts for buying 6 items at 8 each. Replacing + with * correctly multiplies 8 by 6, producing the real total: 48.'
  },
  mastered: {
    topicTitle: 'Arithmetic Operators',
    summary:
      'You have mastered Kotlin\'s arithmetic operators, including integer division truncation, the modulo operator, operator precedence, and Double promotion, and diagnosed a real arithmetic logic bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'The five arithmetic operators and how division and modulo behave' },
      { title: 'Examples explored', subtitle: '5 progressive arithmetic patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved wrong-operator logic defect & verified execution' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 2: Comparison Operators (world-2-comparison-operators)
// =========================================================================
export const COMPARISON_OPERATORS_LESSON: FiveStageLesson = {
  id: 'world-2-comparison-operators',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Comparison Operators',
  learn: {
    title: 'Comparing Values: == != < > <= >=',
    subtitle:
      "Kotlin's comparison operators let you compare two values and get back a Boolean result. == checks structural equality (are the contents equal?), != checks inequality, and <, >, <=, >= compare ordering between numbers.",
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Equality, Inequality, and Ordering',
    language: 'Kotlin',
    codeSnippet: [
      'val price = 50',
      'val budget = 50',
      '',
      'println(price == budget)   // true: values are equal',
      'println(price != budget)   // false: they are NOT unequal',
      'println(price <= budget)   // true: 50 is less than or equal to 50'
    ],
    explanation:
      "Unlike some other languages, Kotlin's == compares content (it safely calls .equals() under the hood), not memory location. != is simply its opposite. The relational operators <, >, <=, >= compare the ordering of numbers and always produce a Boolean.",
    keyIdeas: [
      {
        number: 1,
        title: 'Structural equality (==)',
        description: '== compares the actual content/value of two things, not whether they are the same object in memory.'
      },
      {
        number: 2,
        title: 'Inequality (!=)',
        description: '!= is the exact opposite of == -- it is true only when the two values are different.'
      },
      {
        number: 3,
        title: 'Relational operators (<, >, <=, >=)',
        description: 'These compare ordering between numbers and always evaluate to a Boolean you can print, store, or reuse.'
      }
    ],
    keyTakeaway: 'Every comparison operator evaluates to a Boolean -- true or false -- that you can print, store in a variable, or use later.'
  },
  explore: {
    title: 'Explore Comparison Operators',
    subtitle: 'See how equality, inequality, and ordering comparisons behave.',
    cards: [
      {
        id: 'card-cmp-1',
        number: '01',
        title: 'Structural equality with ==',
        language: 'Kotlin',
        subtitle: 'Comparing content, not memory location.',
        code: ['val str1 = "CodeDo"', 'val str2 = "CodeDo"', 'println(str1 == str2)'],
        whatItMeans: [
          { label: 'str1 == str2', description: 'Compares the actual text content of both strings' },
          { label: 'Result', description: 'true, because both strings contain the exact same characters' }
        ],
        whatChanged: "Kotlin's == checked the content of both strings, not whether they are the same object in memory."
      },
      {
        id: 'card-cmp-2',
        number: '02',
        title: 'Inequality with !=',
        language: 'Kotlin',
        subtitle: 'Checking whether two values differ.',
        code: ['val attempts = 3', 'val maxAttempts = 3', 'println(attempts != maxAttempts)'],
        whatItMeans: [
          { label: 'attempts != maxAttempts', description: 'Evaluates to true only if the two values are different' },
          { label: 'Result', description: 'false, because attempts and maxAttempts are both 3 -- they are equal' }
        ],
        whatChanged: 'The != operator confirmed the two values were NOT different.'
      },
      {
        id: 'card-cmp-3',
        number: '03',
        title: 'Strictly less than <',
        language: 'Kotlin',
        subtitle: 'Checking whether one value is smaller than another.',
        code: ['val budget = 40', 'val price = 45', 'println(budget < price)'],
        whatItMeans: [
          { label: 'budget < price', description: 'true only if budget is strictly smaller than price' },
          { label: 'Result', description: 'true, because 40 is less than 45' }
        ],
        whatChanged: 'Used < to check whether a value falls strictly below another.'
      },
      {
        id: 'card-cmp-4',
        number: '04',
        title: 'Strictly greater than >',
        language: 'Kotlin',
        subtitle: 'Checking whether one value exceeds another.',
        code: ['val wins = 12', 'val losses = 15', 'println(wins > losses)'],
        whatItMeans: [
          { label: 'wins > losses', description: 'true only if wins is strictly larger than losses' },
          { label: 'Result', description: 'false, because 12 is not greater than 15' }
        ],
        whatChanged: 'Used > to check whether a value strictly exceeds another -- and saw it evaluate to false.'
      },
      {
        id: 'card-cmp-5',
        number: '05',
        title: 'Relational comparisons with >=',
        language: 'Kotlin',
        subtitle: 'Ordering numbers with >=.',
        code: ['val score = 72', 'val passMark = 60', 'println(score >= passMark)'],
        whatItMeans: [
          { label: 'score >= passMark', description: 'true if score is greater than OR equal to passMark' },
          { label: 'Result', description: 'true, because 72 is greater than 60' }
        ],
        whatChanged: 'A relational comparison produced a Boolean we can use to decide pass/fail.'
      }
    ]
  },
  predict: {
    title: 'Predict Comparison Results',
    subtitle: 'Trace exactly what each comparison evaluates to.',
    questions: [
      {
        id: 'pred-cmp-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Relational Comparison',
        topicMeta: 'Relational operators',
        language: 'Kotlin',
        code: ['fun main() {', '    val height = 152', '    val minHeight = 140', '    println(height >= minHeight)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '152', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'height >= minHeight',
          detail: '152 is greater than 140, so height >= minHeight evaluates to true.'
        }
      },
      {
        id: 'pred-cmp-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Structural Equality',
        topicMeta: 'Structural equality',
        language: 'Kotlin',
        code: ['fun main() {', '    val str1 = "CodeDo"', '    val str2 = "CodeDo"', '    println(str1 == str2)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'CodeDo', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'str1 == str2',
          detail: "Kotlin's == compares content, not memory location. Since both strings hold the exact same text \"CodeDo\", the comparison is true."
        }
      },
      {
        id: 'pred-cmp-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Inequality Check',
        topicMeta: 'Inequality logic',
        language: 'Kotlin',
        code: ['fun main() {', '    val attempts = 3', '    val maxAttempts = 3', '    println(attempts != maxAttempts)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: '3', isCorrect: false },
          { id: 'D', label: '0', isCorrect: false }
        ],
        explanation: {
          codeRef: 'attempts != maxAttempts',
          detail: 'attempts and maxAttempts are both 3, so they ARE equal. Since != asks "are these different?", and they are not, the result is false.'
        }
      },
      {
        id: 'pred-cmp-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Strictly Less Than',
        topicMeta: 'The < operator',
        language: 'Kotlin',
        code: ['fun main() {', '    val temp = 18', '    val freezing = 32', '    println(temp < freezing)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '18', isCorrect: false },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'temp < freezing',
          detail: '18 is strictly less than 32, so temp < freezing evaluates to true.'
        }
      },
      {
        id: 'pred-cmp-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Equal Values with <=',
        topicMeta: 'The <= operator',
        language: 'Kotlin',
        code: ['fun main() {', '    val a = 7', '    val b = 7', '    println(a <= b)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'Compiler error', isCorrect: false },
          { id: 'D', label: '7', isCorrect: false }
        ],
        explanation: {
          codeRef: 'a <= b',
          detail: 'a and b are both 7. Since <= includes the equal case, and 7 equals 7, the result is true.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Check Age Eligibility',
    description: 'Declare val age = 20 and val minAge = 18, then print whether age is greater than or equal to minAge using the >= operator.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'AgeCheck.kt',
    initialCode: `fun main() {
    // TODO: declare age = 20 and minAge = 18, then print age >= minAge
}`,
    solutionCode: `fun main() {
    val age = 20
    val minAge = 18
    println(age >= minAge)
}`,
    sampleInput: 'main()',
    expectedOutput: 'true',
    testCase: { call: '', expected: 'true' }
  },
  debug: {
    title: 'Fix the Eligibility Check',
    subtitle: 'This program should grant access to users who meet the exact minimum age, but the current condition rejects them.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Wrong Comparison Operator',
    brokenCode: `fun main() {
    val age = 18
    val minAge = 18
    // BUG: users who are EXACTLY minAge should still be eligible!
    val isEligible = age > minAge
    println(isEligible)
}`,
    fixedCode: `fun main() {
    val age = 18
    val minAge = 18
    val isEligible = age >= minAge
    println(isEligible)
}`,
    expectedOutput: 'true',
    hints: [
      'A user whose age exactly equals minAge should still be considered eligible -- check whether the comparison operator allows for the equal case.',
      'age > minAge is false whenever age equals minAge, since > strictly excludes the equal case.',
      'Change > to >= so isEligible = age >= minAge.'
    ],
    explanation:
      'age > minAge only evaluates to true when age is strictly greater than minAge, so an 18-year-old checked against a minimum age of 18 is wrongly rejected (18 > 18 is false). Using >= includes the equal case, so 18 >= 18 correctly evaluates to true.'
  },
  mastered: {
    topicTitle: 'Comparison Operators',
    summary: "You mastered Kotlin's comparison operators: structural equality with ==, inequality with !=, and relational ordering with <, >, <=, >=.",
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Structural equality (==)', subtitle: 'Learned that == compares content, not memory location' },
      { title: 'Inequality (!=)', subtitle: 'Learned to check when two values differ' },
      { title: 'Relational operators', subtitle: 'Learned to compare ordering with <, >, <=, >=' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 3: Logical Operators (world-2-logical-operators)
// =========================================================================
export const LOGICAL_OPERATORS_LESSON: FiveStageLesson = {
  id: 'world-2-logical-operators',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Logical Operators',
  learn: {
    title: 'Combining Conditions: Logical Operators',
    subtitle:
      '&& (AND) and || (OR) let you combine multiple Boolean expressions into a single condition. && is true only when BOTH sides are true; || is true when AT LEAST ONE side is true.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Combining Conditions with && and ||',
    language: 'Kotlin',
    codeSnippet: [
      'val hasKey = true',
      'val level = 5',
      'println(hasKey && level >= 10) // AND: Prints false, level is not >= 10',
      '',
      'val hasHelmet = false',
      'val hasPass = true',
      'println(hasHelmet || hasPass)  // OR: Prints true, at least one side is true'
    ],
    explanation:
      '&& short-circuits: if the left side is false, Kotlin never even evaluates the right side, because the whole expression can only be false. || short-circuits the opposite way: if the left side is true, the right side is skipped.',
    keyIdeas: [
      { number: 1, title: '&& (AND)', description: 'True only when both sides are true; if either side is false, the whole expression is false.' },
      { number: 2, title: '|| (OR)', description: 'True when at least one side is true; only false when both sides are false.' },
      {
        number: 3,
        title: 'Precedence',
        description: '&& binds tighter than ||, so a || b && c is evaluated as a || (b && c) -- use parentheses to make the grouping explicit.'
      }
    ],
    keyTakeaway: 'Use && when every condition must hold, || when any one condition is enough, and parentheses whenever you combine both in the same expression.'
  },
  explore: {
    title: 'Explore Logical Operators',
    subtitle: 'See how &&, ||, and ! combine and negate conditions, and how precedence groups them.',
    cards: [
      {
        id: 'card-logic-1',
        number: '01',
        title: 'AND (&&) requires both',
        language: 'Kotlin',
        subtitle: 'Combining two conditions with &&.',
        code: ['val hasKey = true', 'val hasCode = false', 'println(hasKey && hasCode)'],
        whatItMeans: [{ label: 'hasKey && hasCode', description: 'true && false is false -- AND needs both sides to be true' }],
        whatChanged: 'Combined two conditions; the result is false because hasCode is false.'
      },
      {
        id: 'card-logic-2',
        number: '02',
        title: 'OR (||) requires just one',
        language: 'Kotlin',
        subtitle: 'Combining the same two conditions with ||.',
        code: ['val hasKey = true', 'val hasCode = false', 'println(hasKey || hasCode)'],
        whatItMeans: [{ label: 'hasKey || hasCode', description: 'true || false is true -- OR only needs one side to be true' }],
        whatChanged: 'Combined the same two conditions with OR; the result flips to true.'
      },
      {
        id: 'card-logic-3',
        number: '03',
        title: 'NOT (!) negates a Boolean',
        language: 'Kotlin',
        subtitle: 'Flipping true to false, and false to true.',
        code: ['val isRaining = false', 'println(!isRaining)'],
        whatItMeans: [{ label: '!isRaining', description: 'Flips false to true -- ! always inverts the Boolean that follows it' }],
        whatChanged: 'Introduced ! as the third logical operator, alongside && and ||.'
      },
      {
        id: 'card-logic-4',
        number: '04',
        title: 'Precedence: && before ||',
        language: 'Kotlin',
        subtitle: 'Mixing && and || in one expression.',
        code: ['val hasPass = false', 'val isVip = true', 'val isOpen = false', 'val canEnter = hasPass || isVip && isOpen', 'println(canEnter)'],
        whatItMeans: [
          {
            label: 'hasPass || isVip && isOpen',
            description: '&& runs first: isVip && isOpen is true && false = false. Then hasPass || false is false || false = false.'
          }
        ],
        whatChanged: 'Showed that && groups tighter than ||, changing how the full expression is read.'
      },
      {
        id: 'card-logic-5',
        number: '05',
        title: 'Combining AND, OR, and NOT',
        language: 'Kotlin',
        subtitle: 'Using parentheses to make a mixed expression explicit.',
        code: [
          'val hasTicket = true',
          'val isVip = false',
          'val isBanned = true',
          'val canEnter = (hasTicket || isVip) && !isBanned',
          'println(canEnter)'
        ],
        whatItMeans: [
          { label: '(hasTicket || isVip)', description: 'The parentheses group the OR first: true || false = true' },
          { label: '!isBanned', description: 'Negates isBanned: !true = false' },
          { label: 'true && false', description: 'Combines both results with AND, producing false' }
        ],
        whatChanged: 'Combined all three logical operators -- &&, ||, and ! -- in a single, clearly grouped expression.'
      }
    ]
  },
  predict: {
    title: 'Predict Logical Outcomes',
    subtitle: 'Trace &&, ||, and ! (with precedence) to their final Boolean result.',
    questions: [
      {
        id: 'pred-logic-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'AND Evaluation',
        topicMeta: 'Logical AND (&&)',
        language: 'Kotlin',
        code: ['fun main() {', '    val hasKey = true', '    val level = 5', '    println(hasKey && level >= 10)', '}'],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: 'level >= 10', isCorrect: false }
        ],
        explanation: {
          codeRef: 'hasKey && level >= 10',
          detail: 'level >= 10 is 5 >= 10, which is false. true && false evaluates to false.'
        }
      },
      {
        id: 'pred-logic-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'OR combined with NOT',
        topicMeta: 'Logical OR (||) and NOT (!)',
        language: 'Kotlin',
        code: ['fun main() {', '    val isWeekend = false', '    val isHoliday = false', '    println(!(isWeekend || isHoliday))', '}'],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'null', isCorrect: false },
          { id: 'D', label: '!false', isCorrect: false }
        ],
        explanation: {
          codeRef: '!(isWeekend || isHoliday)',
          detail: 'isWeekend || isHoliday is false || false = false. Negating it with ! flips false to true.'
        }
      },
      {
        id: 'pred-logic-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Operator Precedence',
        topicMeta: '&& vs || precedence',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val hasPass = false',
          '    val isVip = true',
          '    val isOpen = false',
          '    val canEnter = hasPass || isVip && isOpen',
          '    println(canEnter)',
          '}'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: 'null', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'hasPass || isVip && isOpen',
          detail: '&& binds tighter than ||, so this is hasPass || (isVip && isOpen). isVip && isOpen is true && false = false, then hasPass || false is false || false = false.'
        }
      },
      {
        id: 'pred-logic-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'Negating a Boolean',
        topicMeta: 'The ! operator',
        language: 'Kotlin',
        code: ['fun main() {', '    val isOffline = true', '    println(!isOffline)', '}'],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: 'null', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: '!isOffline',
          detail: 'isOffline is true, and ! always flips a Boolean, so !isOffline evaluates to false.'
        }
      },
      {
        id: 'pred-logic-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Combining AND, OR, and NOT',
        topicMeta: 'Mixed logical expression',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val hasTicket = true',
          '    val isVip = false',
          '    val isBanned = true',
          '    val canEnter = (hasTicket || isVip) && !isBanned',
          '    println(canEnter)',
          '}'
        ],
        prompt: 'What is printed?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: 'null', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: '(hasTicket || isVip) && !isBanned',
          detail: '(hasTicket || isVip) is true || false = true. !isBanned is !true = false. Combining them with && gives true && false = false.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Grant Dashboard Access',
    description: 'Declare val isAdmin = true and val isBanned = false. Print whether the user can access the dashboard using isAdmin && !isBanned (which should print true).',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'DashboardAccess.kt',
    initialCode: `fun main() {
    // TODO: declare isAdmin = true and isBanned = false, then print isAdmin && !isBanned
}`,
    solutionCode: `fun main() {
    val isAdmin = true
    val isBanned = false
    println(isAdmin && !isBanned)
}`,
    sampleInput: 'main()',
    expectedOutput: 'true',
    testCase: { call: '', expected: 'true' }
  },
  debug: {
    title: 'Fix the Precedence Mistake',
    subtitle: 'Club entry is being granted even when the venue is closed -- identify why, and fix the grouping.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Missing Parentheses (Operator Precedence)',
    brokenCode: `fun main() {
    val hasPass = true
    val isVip = false
    val isOpen = false
    // BUG: entry should require the venue to be OPEN, plus a pass or VIP status
    val canEnter = hasPass || isVip && isOpen
    println(canEnter)
}`,
    fixedCode: `fun main() {
    val hasPass = true
    val isVip = false
    val isOpen = false
    val canEnter = (hasPass || isVip) && isOpen
    println(canEnter)
}`,
    expectedOutput: 'false',
    hints: [
      'Entry should require the venue to be open AND (a pass or VIP status) -- check whether the operator grouping actually enforces the "venue must be open" part.',
      'In Kotlin, && binds tighter than ||, so hasPass || isVip && isOpen is really hasPass || (isVip && isOpen) -- isOpen only gets checked when isVip is true.',
      'Add parentheses to force the intended grouping: (hasPass || isVip) && isOpen.'
    ],
    explanation:
      'hasPass || isVip && isOpen parses as hasPass || (isVip && isOpen) because && has higher precedence than ||, so with isVip false the isOpen check is skipped entirely and canEnter comes out true even though the venue is closed. Wrapping the OR in parentheses -- (hasPass || isVip) && isOpen -- forces isOpen to be checked against the combined pass/VIP result, correctly producing false when the venue is closed.'
  },
  mastered: {
    topicTitle: 'Logical Operators',
    summary: 'You mastered Kotlin logical operators: combining conditions with && (AND) and || (OR), negating with ! (NOT), and how operator precedence groups them.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: '&& (AND)', subtitle: 'Learned that AND requires both sides to be true' },
      { title: '|| (OR)', subtitle: 'Learned that OR only needs one side to be true' },
      { title: '! (NOT)', subtitle: 'Learned that ! inverts a Boolean value' },
      { title: 'Precedence', subtitle: 'Learned that && binds tighter than || and when to add parentheses' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 4: Assignment Operators (world-2-assignment-operators)
// =========================================================================
export const ASSIGNMENT_OPERATORS_LESSON: FiveStageLesson = {
  id: 'world-2-assignment-operators',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Assignment Operators',
  learn: {
    title: 'Assignment Operators',
    subtitle:
      'The plain = operator assigns a value to a variable. Kotlin also offers compound assignment operators -- +=, -=, *=, /=, and %= -- which update a variable based on its own current value in a single, shorter step.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Plain assignment vs compound assignment',
    language: 'Kotlin',
    codeSnippet: ['var score = 50   // Plain assignment with =', 'score += 10      // Shorthand for score = score + 10', 'println(score)   // 60'],
    explanation:
      'score += 10 is shorthand for score = score + 10. Kotlin reads the current value of score, adds 10 to it, and stores the result back into score -- all in one compact operator.',
    keyIdeas: [
      { number: 1, title: '= assigns a value', description: 'The plain assignment operator stores a new value into a variable, replacing whatever it held before.' },
      { number: 2, title: 'Compound operators are shorthand', description: '+=, -=, *=, /=, and %= combine an arithmetic operation with an assignment: x += y means x = x + y.' },
      { number: 3, title: 'Only var can be reassigned', description: 'Every assignment operator -- plain or compound -- requires the variable to be declared with var. Using any of them on a val is a compile error.' }
    ],
    keyTakeaway: 'x += y is always shorthand for x = x + y -- and both forms only work on a var.'
  },
  explore: {
    title: 'Explore Assignment Operators',
    subtitle: 'Step through each assignment operator and see how it updates a variable.',
    cards: [
      {
        id: 'card-assignop-1',
        number: '01',
        title: 'Plain assignment with =',
        language: 'Kotlin',
        subtitle: 'Replacing a value outright.',
        code: ['var temperature = 20', 'temperature = 25', 'println(temperature)'],
        whatItMeans: [
          { label: 'var temperature', description: 'Declared as mutable with initial value 20' },
          { label: 'temperature = 25', description: 'Discards 20 and stores 25 in its place' }
        ],
        whatChanged: 'The variable now holds 25, with no reference to its old value.'
      },
      {
        id: 'card-assignop-2',
        number: '02',
        title: 'Adding with +=',
        language: 'Kotlin',
        subtitle: 'Increasing a value based on itself.',
        code: ['var coins = 100', 'coins += 50', 'println(coins)'],
        whatItMeans: [
          { label: 'coins += 50', description: 'Shorthand for coins = coins + 50' },
          { label: 'Result', description: '100 + 50 = 150' }
        ],
        whatChanged: 'coins went from 100 to 150 in a single compact step.'
      },
      {
        id: 'card-assignop-3',
        number: '03',
        title: 'Subtracting with -=',
        language: 'Kotlin',
        subtitle: 'Decreasing a value based on itself.',
        code: ['var health = 80', 'health -= 30', 'println(health)'],
        whatItMeans: [
          { label: 'health -= 30', description: 'Shorthand for health = health - 30' },
          { label: 'Result', description: '80 - 30 = 50' }
        ],
        whatChanged: 'health went from 80 down to 50.'
      },
      {
        id: 'card-assignop-4',
        number: '04',
        title: 'Multiplying with *=',
        language: 'Kotlin',
        subtitle: 'Scaling a value based on itself.',
        code: ['var multiplier = 3', 'multiplier *= 4', 'println(multiplier)'],
        whatItMeans: [
          { label: 'multiplier *= 4', description: 'Shorthand for multiplier = multiplier * 4' },
          { label: 'Result', description: '3 * 4 = 12' }
        ],
        whatChanged: 'multiplier grew from 3 to 12.'
      },
      {
        id: 'card-assignop-5',
        number: '05',
        title: 'Dividing with /=',
        language: 'Kotlin',
        subtitle: 'Shrinking a value based on itself.',
        code: ['var pool = 20', 'pool /= 4', 'println(pool)'],
        whatItMeans: [
          { label: 'pool /= 4', description: 'Shorthand for pool = pool / 4' },
          { label: 'Result', description: '20 / 4 = 5' }
        ],
        whatChanged: 'pool shrank from 20 to 5.'
      },
      {
        id: 'card-assignop-6',
        number: '06',
        title: 'Remainder with %=',
        language: 'Kotlin',
        subtitle: 'Keeping only the remainder of a division.',
        code: ['var remainder = 17', 'remainder %= 5', 'println(remainder)'],
        whatItMeans: [
          { label: 'remainder %= 5', description: 'Shorthand for remainder = remainder % 5' },
          { label: 'Result', description: '17 % 5 = 2 (17 divided by 5 leaves a remainder of 2)' }
        ],
        whatChanged: 'remainder became 2, the leftover from dividing 17 by 5.'
      }
    ]
  },
  predict: {
    title: 'Predict Assignment Operator Behavior',
    subtitle: 'Trace exactly what each variable holds after each operator runs.',
    questions: [
      {
        id: 'pred-assignop-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Compound Addition',
        topicMeta: '+= operator',
        language: 'Kotlin',
        code: ['fun main() {', '    var points = 40', '    points += 15', '    println(points)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: '15', isCorrect: false },
          { id: 'B', label: '40', isCorrect: false },
          { id: 'C', label: '55', isCorrect: true },
          { id: 'D', label: 'Compiler error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'points += 15',
          detail: 'points += 15 is shorthand for points = points + 15. Since points was 40, the new value is 40 + 15 = 55.'
        }
      },
      {
        id: 'pred-assignop-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Compound Subtraction',
        topicMeta: '-= operator',
        language: 'Kotlin',
        code: ['fun main() {', '    var lives = 5', '    lives -= 2', '    println(lives)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: '2', isCorrect: false },
          { id: 'B', label: '3', isCorrect: true },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: '7', isCorrect: false }
        ],
        explanation: {
          codeRef: 'lives -= 2',
          detail: 'lives -= 2 is shorthand for lives = lives - 2. Since lives was 5, the new value is 5 - 2 = 3.'
        }
      },
      {
        id: 'pred-assignop-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'Multiple Compound Operators',
        topicMeta: 'chained assignment',
        language: 'Kotlin',
        code: ['fun main() {', '    var total = 10', '    total *= 3', '    total -= 5', '    println(total)', '}'],
        prompt: 'What does this code print?',
        options: [
          { id: 'A', label: '25', isCorrect: true },
          { id: 'B', label: '30', isCorrect: false },
          { id: 'C', label: '15', isCorrect: false },
          { id: 'D', label: '5', isCorrect: false }
        ],
        explanation: {
          codeRef: 'total *= 3  then  total -= 5',
          detail: 'total *= 3 makes total = 10 * 3 = 30. Then total -= 5 makes total = 30 - 5 = 25. The operators apply in order, each using the result of the previous line.'
        }
      },
      {
        id: 'pred-assignop-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'Compound Assignment on val',
        topicMeta: 'val immutability',
        language: 'Kotlin',
        code: ['fun main() {', '    val limit = 100', '    limit -= 10', '    println(limit)', '}'],
        prompt: 'What happens when this runs?',
        options: [
          { id: 'A', label: 'Prints 90', isCorrect: false },
          { id: 'B', label: 'Prints 100', isCorrect: false },
          { id: 'C', label: 'Compile error: Val cannot be reassigned', isCorrect: true },
          { id: 'D', label: 'Runtime exception', isCorrect: false }
        ],
        explanation: {
          codeRef: 'limit -= 10',
          detail: 'Every assignment operator, including compound ones like -=, reassigns the variable. Since limit was declared with val, the compiler rejects this before the code can run.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Update a Wallet Balance',
    description: 'Declare a mutable variable wallet with initial value 200, add 75 to it using +=, then subtract 50 from it using -=, and print the final balance.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'Wallet.kt',
    initialCode: `fun main() {
    // TODO: declare var wallet = 200, add 75 with +=, subtract 50 with -=, and print it
}`,
    solutionCode: `fun main() {
    var wallet = 200
    wallet += 75
    wallet -= 50
    println(wallet)
}`,
    sampleInput: 'main()',
    expectedOutput: '225',
    testCase: { call: '', expected: '225' }
  },
  debug: {
    title: 'Fix the Compound Assignment Bug',
    subtitle: 'This program tries to update a value with -=, but fails compilation.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Compiler Error: Val cannot be reassigned',
    brokenCode: `fun main() {
    val total = 100
    total -= 20
    println(total)
}`,
    fixedCode: `fun main() {
    var total = 100
    total -= 20
    println(total)
}`,
    expectedOutput: '80',
    hints: [
      'The variable "total" is being updated with a compound assignment operator on line 3.',
      'Compound operators like -= still reassign the variable -- they cannot be used on "val".',
      'Change "val total = 100" to "var total = 100".'
    ],
    explanation: 'total -= 20 is shorthand for total = total - 20, which reassigns total. Since total was declared with val, it must be changed to var before the compound assignment is legal.'
  },
  mastered: {
    topicTitle: 'Assignment Operators',
    summary: "You mastered Kotlin's assignment operators: plain = and the compound shorthand +=, -=, *=, /=, and %=, all of which require var.",
    passedCount: '4 / 4 PASSED',
    verificationItems: [
      { title: 'Plain assignment', subtitle: 'Understood how = replaces a stored value' },
      { title: 'Compound operators', subtitle: 'Learned +=, -=, *=, /=, and %= as shorthand for x = x op y' },
      { title: 'var required', subtitle: 'Confirmed every assignment operator needs a mutable var' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 5: Increment & Decrement (world-2-increment-decrement)
// =========================================================================
export const INCREMENT_DECREMENT_LESSON: FiveStageLesson = {
  id: 'world-2-increment-decrement',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Increment & Decrement',
  learn: {
    title: 'Increment and Decrement Operators',
    subtitle:
      'Kotlin gives you two shorthand operators for adjusting a variable by exactly 1: ++ (increment) and -- (decrement). Both come in a prefix form (++x) and a postfix form (x++), and both only work on a mutable var -- never on a read-only val.',
    exampleTag: 'EXAMPLE',
    exampleTitle: '++ and -- in action',
    language: 'Kotlin',
    codeSnippet: [
      'var lives = 3',
      'lives++        // postfix increment: lives becomes 4',
      'println(lives) // 4',
      '',
      'lives--        // postfix decrement: lives becomes 3',
      'println(lives) // 3',
      '',
      '++lives        // prefix increment: lives becomes 4',
      'println(lives) // 4'
    ],
    explanation:
      "lives++ and ++lives both add 1 to lives as a standalone statement -- the variable ends up at the same value either way. The prefix/postfix difference only matters when the ++/-- expression's own result is used directly inside a larger expression, which this lesson intentionally avoids.",
    keyIdeas: [
      { number: 1, title: '++ adds 1', description: "Increments the variable's current value by exactly 1." },
      { number: 2, title: '-- subtracts 1', description: "Decrements the variable's current value by exactly 1." },
      { number: 3, title: 'Prefix vs postfix', description: '++x (prefix) and x++ (postfix) both increment x by 1. Used as their own statement, the end result is identical either way.' },
      { number: 4, title: 'Only works on var', description: 'Both operators reassign the variable, so they require var. Using ++ or -- on a val is a compile error, just like any other reassignment.' }
    ],
    keyTakeaway: 'x++, ++x, x--, and --x are shorthand for "reassign x to x + 1" or "x - 1" -- and like any reassignment, they require var.'
  },
  explore: {
    title: 'Explore the Concept',
    subtitle: 'See increment and decrement build from a single step to a val restriction.',
    cards: [
      {
        id: 'card-incdec-1',
        number: '01',
        title: 'Postfix increment',
        language: 'Kotlin',
        subtitle: 'Add 1 to a mutable variable.',
        code: ['var count = 5', 'count++', 'println(count)'],
        whatItMeans: [
          { label: 'var count', description: 'Declares a mutable variable starting at 5' },
          { label: 'count++', description: 'Increments count by 1, so it becomes 6' }
        ],
        whatChanged: 'We used the shorthand ++ instead of writing count = count + 1.'
      },
      {
        id: 'card-incdec-2',
        number: '02',
        title: 'Postfix decrement',
        language: 'Kotlin',
        subtitle: 'Subtract 1 from a mutable variable.',
        code: ['var lives = 3', 'lives--', 'println(lives)'],
        whatItMeans: [
          { label: 'var lives', description: 'Declares a mutable variable starting at 3' },
          { label: 'lives--', description: 'Decrements lives by 1, so it becomes 2' }
        ],
        whatChanged: 'We used -- to subtract 1 without writing lives = lives - 1.'
      },
      {
        id: 'card-incdec-3',
        number: '03',
        title: 'Prefix increment',
        language: 'Kotlin',
        subtitle: 'The ++ can also go before the variable.',
        code: ['var score = 10', '++score', 'println(score)'],
        whatItMeans: [
          { label: '++score', description: 'Prefix form: still just adds 1 to score' },
          { label: 'Result', description: 'score becomes 11, same end result as score++' }
        ],
        whatChanged: 'Moved ++ before the variable name -- as its own statement, the effect is identical.'
      },
      {
        id: 'card-incdec-4',
        number: '04',
        title: 'Repeated increments',
        language: 'Kotlin',
        subtitle: 'Apply ++ and -- multiple times in sequence.',
        code: ['var attempts = 0', 'attempts++', 'attempts++', 'attempts--', 'println(attempts)'],
        whatItMeans: [
          { label: 'attempts++ (x2)', description: 'Raises attempts from 0 to 1, then to 2' },
          { label: 'attempts--', description: 'Lowers attempts from 2 back down to 1' }
        ],
        whatChanged: 'Chained several increment/decrement steps to track changing state.'
      },
      {
        id: 'card-incdec-5',
        number: '05',
        title: 'val cannot be incremented',
        language: 'Kotlin',
        subtitle: 'The compiler blocks ++ / -- on a val.',
        code: ['val locked = 5', '// locked++  <-- Val cannot be reassigned', 'println(locked)'],
        whatItMeans: [
          { label: 'val locked', description: 'A read-only reference' },
          { label: 'locked++', description: 'Would reassign locked, so it is rejected at compile time' }
        ],
        whatChanged: 'Confirmed that ++ / -- are reassignments in disguise, so they follow the same val rule as everything else.'
      }
    ]
  },
  predict: {
    title: 'What will this code do?',
    subtitle: 'Read the code, predict the result, then check your answer.',
    questions: [
      {
        id: 'pred-incdec-1',
        questionNumber: 1,
        totalQuestions: 5,
        title: 'Basic Increment',
        topicMeta: 'Postfix ++',
        language: 'Kotlin',
        code: ['fun main() {', '    var health = 10', '    health++', '    println(health)', '}'],
        prompt: 'What will this code print?',
        options: [
          { id: 'A', label: '10', isCorrect: false },
          { id: 'B', label: '11', isCorrect: true },
          { id: 'C', label: '12', isCorrect: false },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'health++',
          detail: 'health is a var starting at 10. health++ increments it by 1, so the printed value is 11.'
        }
      },
      {
        id: 'pred-incdec-2',
        questionNumber: 2,
        totalQuestions: 5,
        title: 'Double Decrement',
        topicMeta: 'Postfix --',
        language: 'Kotlin',
        code: ['fun main() {', '    var lives = 5', '    lives--', '    lives--', '    println(lives)', '}'],
        prompt: 'What does this program output?',
        options: [
          { id: 'A', label: '5', isCorrect: false },
          { id: 'B', label: '4', isCorrect: false },
          { id: 'C', label: '3', isCorrect: true },
          { id: 'D', label: '2', isCorrect: false }
        ],
        explanation: {
          codeRef: 'lives--\n    lives--',
          detail: 'lives starts at 5. Each lives-- subtracts 1, so two decrements bring it to 3.'
        }
      },
      {
        id: 'pred-incdec-3',
        questionNumber: 3,
        totalQuestions: 5,
        title: 'Prefix Increment',
        topicMeta: 'Prefix ++',
        language: 'Kotlin',
        code: ['fun main() {', '    var score = 20', '    ++score', '    println(score)', '}'],
        prompt: 'What is printed to the console?',
        options: [
          { id: 'A', label: '19', isCorrect: false },
          { id: 'B', label: '20', isCorrect: false },
          { id: 'C', label: '21', isCorrect: true },
          { id: 'D', label: 'Compilation Error', isCorrect: false }
        ],
        explanation: {
          codeRef: '++score',
          detail: 'Used as its own statement, ++score increments score by 1 just like score++ would -- the result is 21.'
        }
      },
      {
        id: 'pred-incdec-4',
        questionNumber: 4,
        totalQuestions: 5,
        title: 'val Increment Attempt',
        topicMeta: 'val immutability',
        language: 'Kotlin',
        code: ['fun main() {', '    val count = 5', '    count++', '    println(count)', '}'],
        prompt: 'What happens when this code is compiled?',
        options: [
          { id: 'A', label: 'Prints 6', isCorrect: false },
          { id: 'B', label: 'Prints 5', isCorrect: false },
          { id: 'C', label: 'Compilation Error: Val cannot be reassigned', isCorrect: true },
          { id: 'D', label: 'Runtime Exception', isCorrect: false }
        ],
        explanation: {
          codeRef: 'count++',
          detail: 'count is declared with val, so it is read-only. count++ is a reassignment in disguise, so the compiler rejects it.'
        }
      },
      {
        id: 'pred-incdec-5',
        questionNumber: 5,
        totalQuestions: 5,
        title: 'Mixed Increment and Decrement',
        topicMeta: 'Combining ++ and --',
        language: 'Kotlin',
        code: ['fun main() {', '    var coins = 8', '    coins++', '    coins--', '    coins++', '    println(coins)', '}'],
        prompt: 'What is the final printed value?',
        options: [
          { id: 'A', label: '7', isCorrect: false },
          { id: 'B', label: '8', isCorrect: false },
          { id: 'C', label: '9', isCorrect: true },
          { id: 'D', label: '10', isCorrect: false }
        ],
        explanation: {
          codeRef: 'coins++\n    coins--\n    coins++',
          detail: 'Starting at 8: +1 makes 9, -1 makes 8, +1 makes 9 again. The final printed value is 9.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: 'Track a Lives Counter',
    description: 'Declare a mutable lives counter starting at 3 using var. Increase it twice using lives++, then decrease it once using lives--. Print the final result as "Lives: 4" using a string template.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'Lives.kt',
    initialCode: `fun main() {
    // 1. Declare mutable lives starting at 3 using var:

    // 2. Increment lives twice using lives++:

    // 3. Decrement lives once using lives--:

    // 4. Print the result as "Lives: 4" using a string template ($lives):

}`,
    solutionCode: `fun main() {
    var lives = 3
    lives++
    lives++
    lives--
    println("Lives: $lives")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Lives: 4',
    testCase: { call: '', expected: 'Lives: 4' }
  },
  debug: {
    title: 'Diagnose the Increment Violation',
    subtitle: 'Identify why the program fails to compile when trying to increment lives, and fix it.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'easy',
    bugType: 'syntax',
    bugLabel: 'Syntax / Mutability Bug: Val Increment',
    brokenCode: `fun main() {
    // BUG: lives is declared with val, but incremented below!
    val lives = 3
    lives++
    println("Lives: $lives")
}`,
    fixedCode: `fun main() {
    var lives = 3
    lives++
    println("Lives: $lives")
}`,
    expectedOutput: 'Lives: 4',
    hints: [
      'In Kotlin, what does the ++ operator actually do to a variable?',
      'lives++ reassigns lives to a new value -- and reassignment requires var, not val.',
      'Change val lives = 3 to var lives = 3 so lives++ is allowed.'
    ],
    explanation:
      'The ++ operator increments a variable by reassigning it, just like lives = lives + 1 would. Since lives was declared with val, this reassignment produces a compile error: "Val cannot be reassigned". Changing val to var allows lives++ to run, taking lives from 3 to 4.'
  },
  mastered: {
    topicTitle: 'Increment & Decrement',
    summary: 'You have mastered the ++ and -- operators, prefix vs postfix form, and diagnosed a val-mutation compile bug.',
    passedCount: '5 / 5 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'How ++ and -- adjust a var by exactly 1' },
      { title: 'Examples explored', subtitle: '5 progressive increment/decrement patterns' },
      { title: 'Predictions completed', subtitle: '5/5 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 practical runtime test passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Fixed val increment compile violation' }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// LESSON 6: Operator Precedence (world-2-operator-precedence)
// =========================================================================
export const OPERATOR_PRECEDENCE_LESSON: FiveStageLesson = {
  id: 'world-2-operator-precedence',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Operator Precedence',
  learn: {
    title: 'Operator Precedence',
    subtitle:
      'When an expression mixes several kinds of operators, Kotlin does not evaluate them left-to-right -- it follows a fixed order: * / % run first, then + -, then comparisons (== != < > <= >=), then &&, and finally ||. Parentheses always override this default order.',
    exampleTag: 'EXAMPLE',
    exampleTitle: 'Mixing arithmetic and logic in one expression',
    language: 'Kotlin',
    codeSnippet: [
      'val score = 5 + 3 * 2            // * before +: 5 + 6 = 11',
      'val passed = score > 10 && true  // > before &&: 11 > 10 = true, then true && true',
      'println(score)',
      'println(passed)'
    ],
    explanation:
      "3 * 2 is computed before 5 +, giving score = 11. Then score > 10 is computed before &&, giving true, and finally true && true gives passed = true. Kotlin always resolves the highest-precedence operator first, exactly like the order of operations you already know from arithmetic -- it just extends to comparisons and logic too.",
    keyIdeas: [
      { number: 1, title: 'Arithmetic runs first', description: '* / % are evaluated before + -, and both are evaluated before any comparison or logical operator.' },
      { number: 2, title: 'Comparisons beat && and ||', description: '== != < > <= >= are all evaluated before && or ||, so a > b && c < d compares first, then combines the results.' },
      { number: 3, title: '&& binds tighter than ||', description: 'Between the two logical operators, && groups with its neighbors before || does -- a || b && c means a || (b && c), not (a || b) && c.' }
    ],
    keyTakeaway:
      'Kotlin evaluates * / %, then + -, then comparisons, then &&, then ||. Whenever the order you want does not match that default -- or whenever you just want the grouping to be unmistakable to a reader -- wrap the part you mean to happen first in parentheses.'
  },
  explore: {
    title: 'Explore Operator Precedence',
    subtitle: 'See how default precedence -- and parentheses -- change what an expression actually computes.',
    cards: [
      {
        id: 'card-precedence-1',
        number: '01',
        title: 'Multiplication before addition',
        language: 'Kotlin',
        subtitle: '* is evaluated before +, even though + appears first.',
        code: ['val total = 2 + 3 * 4', 'println(total)'],
        whatItMeans: [
          { label: '3 * 4', description: 'Evaluated first because * outranks +, producing 12' },
          { label: '2 + 12', description: 'The addition happens second, producing 14' }
        ],
        whatChanged: 'Reading left-to-right would wrongly suggest (2 + 3) * 4 = 20 -- the real result is 14.'
      },
      {
        id: 'card-precedence-2',
        number: '02',
        title: 'Comparisons before &&',
        language: 'Kotlin',
        subtitle: 'Each comparison resolves to true/false before && combines them.',
        code: ['val ok = 5 > 3 && 2 < 1', 'println(ok)'],
        whatItMeans: [
          { label: '5 > 3', description: 'Evaluated first, producing true' },
          { label: '2 < 1', description: 'Also evaluated first (comparisons outrank &&), producing false' },
          { label: 'true && false', description: 'Combines the two comparison results last, producing false' }
        ],
        whatChanged: 'Both comparisons finish before && ever runs, so the expression is really (5 > 3) && (2 < 1).'
      },
      {
        id: 'card-precedence-3',
        number: '03',
        title: '&& before ||',
        language: 'Kotlin',
        subtitle: '&& groups with its neighbors before || does.',
        code: ['val hasPass = false', 'val isVip = true', 'val isOpen = false', 'val canEnter = hasPass || isVip && isOpen', 'println(canEnter)'],
        whatItMeans: [
          { label: 'isVip && isOpen', description: 'Evaluated first because && outranks ||, producing true && false = false' },
          { label: 'hasPass || false', description: 'The || runs last, producing false || false = false' }
        ],
        whatChanged: 'The expression is really hasPass || (isVip && isOpen), not (hasPass || isVip) && isOpen.'
      },
      {
        id: 'card-precedence-4',
        number: '04',
        title: 'Parentheses override the default',
        language: 'Kotlin',
        subtitle: 'Wrapping part of an expression in ( ) forces it to run first.',
        code: ['val withoutParens = 2 + 3 * 4', 'val withParens = (2 + 3) * 4', 'println(withoutParens)', 'println(withParens)'],
        whatItMeans: [
          { label: '(2 + 3)', description: 'The parentheses force the addition to happen before the multiplication' },
          { label: '5 * 4', description: 'Only after the parenthesized part resolves does the multiplication run, producing 20' }
        ],
        whatChanged: 'The same two numbers and operators produce a different result -- 14 vs 20 -- purely because of parentheses.'
      }
    ]
  },
  predict: {
    title: 'Predict Operator Precedence',
    subtitle: 'Trace the exact evaluation order Kotlin uses before picking an answer.',
    questions: [
      {
        id: 'pred-precedence-1',
        questionNumber: 1,
        totalQuestions: 3,
        title: 'Division before subtraction',
        topicMeta: 'Arithmetic precedence',
        language: 'Kotlin',
        code: ['fun main() {', '    val result = 20 - 4 / 2', '    println(result)', '}'],
        prompt: 'What is printed to the console?',
        options: [
          { id: 'A', label: '18', isCorrect: true },
          { id: 'B', label: '8', isCorrect: false },
          { id: 'C', label: '16', isCorrect: false },
          { id: 'D', label: '2', isCorrect: false }
        ],
        explanation: {
          codeRef: '20 - 4 / 2',
          detail: '/ outranks -, so 4 / 2 is computed first, giving 2. Then 20 - 2 gives 18.'
        }
      },
      {
        id: 'pred-precedence-2',
        questionNumber: 2,
        totalQuestions: 3,
        title: 'Mixing && and ||',
        topicMeta: 'Logical precedence',
        language: 'Kotlin',
        code: ['fun main() {', '    val hasKey = true', '    val hasCode = false', '    val isAdmin = false', '    val access = hasKey && hasCode || isAdmin', '    println(access)', '}'],
        prompt: 'What is printed to the console?',
        options: [
          { id: 'A', label: 'false', isCorrect: true },
          { id: 'B', label: 'true', isCorrect: false },
          { id: 'C', label: 'Compilation error', isCorrect: false },
          { id: 'D', label: 'null', isCorrect: false }
        ],
        explanation: {
          codeRef: 'hasKey && hasCode || isAdmin',
          detail: '&& outranks ||, so hasKey && hasCode runs first: true && false = false. Then false || isAdmin: false || false = false.'
        }
      },
      {
        id: 'pred-precedence-3',
        questionNumber: 3,
        totalQuestions: 3,
        title: 'Arithmetic inside a comparison inside a logical expression',
        topicMeta: 'Mixed precedence',
        language: 'Kotlin',
        code: ['fun main() {', '    val x = 10', '    val y = 3', '    val result = x > 5 && y + 2 == 5', '    println(result)', '}'],
        prompt: 'What is printed to the console?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '5', isCorrect: false },
          { id: 'D', label: 'Compilation error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'x > 5 && y + 2 == 5',
          detail: 'Arithmetic runs first: y + 2 = 5. Then comparisons: x > 5 is 10 > 5 = true, and 5 == 5 = true. Finally && combines them: true && true = true.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 25,
    title: 'Checkout Totals',
    description:
      'A store needs to total a bill and check express-checkout eligibility. Declare val itemPrice = 25, val itemCount = 4, val hasCoupon = true, and val isMember = false. Calculate total as itemPrice * itemCount and print it. Then calculate qualifies as itemCount > 3 && hasCoupon || isMember and print it.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'CheckoutTotals.kt',
    initialCode: `fun main() {
    // TODO: declare itemPrice, itemCount, hasCoupon, isMember
    // TODO: calculate and print total as itemPrice * itemCount
    // TODO: calculate and print qualifies as itemCount > 3 && hasCoupon || isMember
}`,
    solutionCode: `fun main() {
    val itemPrice = 25
    val itemCount = 4
    val hasCoupon = true
    val isMember = false
    val total = itemPrice * itemCount
    println(total)
    val qualifies = itemCount > 3 && hasCoupon || isMember
    println(qualifies)
}`,
    sampleInput: 'main()',
    expectedOutput: '100\ntrue',
    testCase: { call: '', expected: '100\ntrue' }
  },
  debug: {
    title: 'Fix the Missing Parentheses',
    subtitle: 'The alarm rings even though the system is disarmed -- identify why, and fix the grouping.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'medium',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Missing Parentheses',
    brokenCode: `fun main() {
    val doorOpen = true
    val windowOpen = false
    val isArmed = false
    // BUG: alarm should ring only if (a door or window is open) AND the system is armed
    val alarmShouldRing = doorOpen || windowOpen && isArmed
    println(alarmShouldRing)
}`,
    fixedCode: `fun main() {
    val doorOpen = true
    val windowOpen = false
    val isArmed = false
    val alarmShouldRing = (doorOpen || windowOpen) && isArmed
    println(alarmShouldRing)
}`,
    expectedOutput: 'false',
    hints: [
      'The alarm should only ring when the system is armed -- but isArmed is false here, so the correct result must be false no matter which doors or windows are open.',
      '&& binds tighter than ||, so doorOpen || windowOpen && isArmed actually means doorOpen || (windowOpen && isArmed), which lets doorOpen alone make the whole thing true even while isArmed is false.',
      'Wrap the || part in parentheses -- (doorOpen || windowOpen) && isArmed -- so the door/window check must combine with isArmed before the alarm can ring.'
    ],
    explanation:
      'Without parentheses, doorOpen || windowOpen && isArmed is parsed as doorOpen || (windowOpen && isArmed) because && outranks ||. With doorOpen = true, windowOpen = false, isArmed = false, that becomes true || (false && false) = true || false = true -- the alarm rings even though the system is disarmed. Adding parentheses to force (doorOpen || windowOpen) && isArmed changes the grouping: (true || false) && false = true && false = false, correctly keeping the alarm silent whenever isArmed is false.'
  },
  mastered: {
    topicTitle: 'Operator Precedence',
    summary: 'You mastered how Kotlin orders arithmetic, comparison, and logical operators -- and how parentheses let you override that order.',
    passedCount: '3 / 3 PASSED',
    verificationItems: [
      { title: 'Arithmetic before comparisons', subtitle: 'Learned that * / % and + - always resolve before == != < > <= >=' },
      { title: '&& before ||', subtitle: 'Learned that && groups with its neighbors before || does' },
      { title: 'Parentheses override precedence', subtitle: 'Learned to force a specific grouping with ( )' }
    ],
    xpEarned: 25,
    streakDays: 1,
    accuracy: '100%'
  }
};

// =========================================================================
// WORLD 2 BOSS: Smart Calculator (world-2-boss)
// =========================================================================
export const WORLD_2_BOSS_LESSON: FiveStageLesson = {
  id: 'world-2-boss',
  worldId: 'world-2',
  worldName: 'Operator Forge',
  stageName: 'STAGE 2 — OPERATORS',
  topicTitle: 'Smart Calculator',
  learn: {
    title: 'World 2 Boss: Smart Calculator',
    subtitle:
      'Congratulations on reaching the World 2 Boss! You will now combine everything you learned in Operator Forge -- arithmetic, comparisons, logical conditions, assignment, increment/decrement, and precedence -- into a single working program.',
    exampleTag: 'CAPSTONE',
    exampleTitle: 'A program that blends every operator family',
    language: 'Kotlin',
    codeSnippet: [
      'fun main() {',
      '    var balance = 100',
      '    balance += 50',
      '    balance -= 20',
      '    val price = 15',
      '    val quantity = 3',
      '    val total = price * quantity',
      '    val canAfford = balance >= total && total > 0',
      '    println("Balance: $balance")',
      '    println("Total: $total")',
      '    println("Can afford: $canAfford")',
      '}'
    ],
    explanation:
      'balance starts at 100, then += 50 and -= 20 bring it to 130. total is price * quantity = 15 * 3 = 45. canAfford combines a comparison (balance >= total) with a logical AND (&& total > 0), giving true && true = true.',
    keyIdeas: [
      { number: 1, title: 'State changes over time', description: 'Compound assignment and increment/decrement track a value as it updates step by step.' },
      { number: 2, title: 'Calculations feed decisions', description: 'Arithmetic results (like total) become inputs to comparisons and logical checks.' },
      { number: 3, title: 'Precedence ties it together', description: 'A real expression like balance >= total && total > 0 relies on Kotlin evaluating comparisons before &&, exactly as taught earlier in this world.' }
    ],
    keyTakeaway:
      'A real program blends operators together -- arithmetic to compute, comparisons to check, logic to decide, and assignment/increment to track changing state.'
  },
  explore: {
    title: 'Explore the Capstone Architecture',
    subtitle: 'Review how arithmetic, comparison, logical, assignment, and increment/decrement operators combine in practice.',
    cards: [
      {
        id: 'card-boss2-1',
        number: '01',
        title: 'Tracking a running total',
        language: 'Kotlin',
        subtitle: 'Compound assignment accumulates a value over multiple steps.',
        code: ['var cart = 0', 'cart += 25', 'cart += 40', 'println(cart)'],
        whatItMeans: [{ label: 'cart += 25 then cart += 40', description: 'Each += adds to the running total: 0 + 25 = 25, then 25 + 40 = 65' }],
        whatChanged: 'Used += repeatedly to build up a total instead of one single assignment.'
      },
      {
        id: 'card-boss2-2',
        number: '02',
        title: 'Deciding eligibility with comparison + logical',
        language: 'Kotlin',
        subtitle: 'A comparison feeds directly into a logical AND.',
        code: ['val age = 20', 'val hasId = true', 'val canBuy = age >= 18 && hasId', 'println(canBuy)'],
        whatItMeans: [{ label: 'age >= 18 && hasId', description: 'age >= 18 is 20 >= 18 = true, so true && hasId (true) = true' }],
        whatChanged: 'Combined a relational comparison with a logical AND to produce one eligibility decision.'
      },
      {
        id: 'card-boss2-3',
        number: '03',
        title: 'Precedence in a real formula',
        language: 'Kotlin',
        subtitle: 'Multiplication resolves before addition, just like earlier in this world.',
        code: ['val base = 50', 'val bonus = 10', 'val multiplier = 2', 'val score = base + bonus * multiplier', 'println(score)'],
        whatItMeans: [{ label: 'bonus * multiplier', description: 'Evaluated first (10 * 2 = 20), then added to base: 50 + 20 = 70' }],
        whatChanged: 'Applied precedence rules inside a realistic scoring formula.'
      },
      {
        id: 'card-boss2-4',
        number: '04',
        title: 'Counting attempts with decrement',
        language: 'Kotlin',
        subtitle: 'Tracking a shrinking resource with --.',
        code: ['var attemptsLeft = 3', 'attemptsLeft--', 'attemptsLeft--', 'println(attemptsLeft)'],
        whatItMeans: [{ label: 'attemptsLeft-- (x2)', description: 'Each -- subtracts 1: 3 becomes 2, then 2 becomes 1' }],
        whatChanged: 'Used -- to model a countdown, the same pattern a real game or retry system would use.'
      }
    ]
  },
  predict: {
    title: 'Predict Capstone Program Output',
    subtitle: 'Test your holistic understanding of World 2 concepts.',
    questions: [
      {
        id: 'pred-boss2-1',
        questionNumber: 1,
        totalQuestions: 4,
        title: 'Combined Arithmetic and Comparison',
        topicMeta: 'World 2 Synthesis',
        language: 'Kotlin',
        code: ['fun main() {', '    val price = 20', '    val quantity = 4', '    val budget = 100', '    val total = price * quantity', '    println(total <= budget)', '}'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '80', isCorrect: false },
          { id: 'D', label: 'Compile error', isCorrect: false }
        ],
        explanation: {
          codeRef: 'total <= budget',
          detail: 'total is price * quantity = 20 * 4 = 80. 80 <= 100 is true.'
        }
      },
      {
        id: 'pred-boss2-2',
        questionNumber: 2,
        totalQuestions: 4,
        title: 'Compound Assignment Chain',
        topicMeta: 'World 2 Synthesis',
        language: 'Kotlin',
        code: ['fun main() {', '    var wallet = 200', '    wallet -= 50', '    wallet += 30', '    println(wallet)', '}'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: '180', isCorrect: true },
          { id: 'B', label: '150', isCorrect: false },
          { id: 'C', label: '230', isCorrect: false },
          { id: 'D', label: '200', isCorrect: false }
        ],
        explanation: {
          codeRef: 'wallet -= 50  then  wallet += 30',
          detail: '200 - 50 = 150, then 150 + 30 = 180.'
        }
      },
      {
        id: 'pred-boss2-3',
        questionNumber: 3,
        totalQuestions: 4,
        title: 'Logical Decision with Precedence',
        topicMeta: 'World 2 Synthesis',
        language: 'Kotlin',
        code: [
          'fun main() {',
          '    val hasCoupon = true',
          '    val isMember = false',
          '    val total = 60',
          '    val minSpend = 50',
          '    val discountEligible = total >= minSpend && hasCoupon || isMember',
          '    println(discountEligible)',
          '}'
        ],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: 'Compile error', isCorrect: false },
          { id: 'D', label: 'null', isCorrect: false }
        ],
        explanation: {
          codeRef: 'total >= minSpend && hasCoupon || isMember',
          detail: 'total >= minSpend is 60 >= 50 = true. && binds tighter than ||, so true && hasCoupon (true) = true. Then true || isMember (false) = true.'
        }
      },
      {
        id: 'pred-boss2-4',
        questionNumber: 4,
        totalQuestions: 4,
        title: 'Increment Then Compare',
        topicMeta: 'World 2 Synthesis',
        language: 'Kotlin',
        code: ['fun main() {', '    var lives = 2', '    lives++', '    println(lives > 2)', '}'],
        prompt: 'What will this program output?',
        options: [
          { id: 'A', label: 'true', isCorrect: true },
          { id: 'B', label: 'false', isCorrect: false },
          { id: 'C', label: '3', isCorrect: false },
          { id: 'D', label: '2', isCorrect: false }
        ],
        explanation: {
          codeRef: 'lives++  then  lives > 2',
          detail: 'lives++ raises lives from 2 to 3. 3 > 2 is true.'
        }
      }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 50,
    title: 'Build the Smart Calculator',
    description:
      'Declare var total = 0. Add 45 to it using +=, then add 30 using +=. Declare val budget = 100 and a val withinBudget that checks total <= budget. Declare var attempts = 0 and increment it once using ++. Print "Total: 75", then "Within budget: true", then "Attempts: 1", each on its own line.',
    requirements: { name: 'main', params: '(none)', returns: 'Unit' },
    fileName: 'SmartCalculator.kt',
    initialCode: `fun main() {
    // 1. Declare var total = 0, then add 45 and 30 using +=:

    // 2. Declare val budget = 100 and val withinBudget = total <= budget:

    // 3. Declare var attempts = 0 and increment it once using ++:

    // 4. Print "Total: 75", "Within budget: true", and "Attempts: 1":

}`,
    solutionCode: `fun main() {
    var total = 0
    total += 45
    total += 30
    val budget = 100
    val withinBudget = total <= budget
    var attempts = 0
    attempts++
    println("Total: $total")
    println("Within budget: $withinBudget")
    println("Attempts: $attempts")
}`,
    sampleInput: 'main()',
    expectedOutput: 'Total: 75\nWithin budget: true\nAttempts: 1',
    testCase: { call: '', expected: 'Total: 75\nWithin budget: true\nAttempts: 1' }
  },
  debug: {
    title: 'Diagnose the Bonus Eligibility Bug',
    subtitle: 'A low-scoring user is wrongly receiving a bonus -- identify why, and fix the grouping.',
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: 'hard',
    bugType: 'logic',
    bugLabel: 'Logic Bug: Missing Parentheses (Operator Precedence)',
    brokenCode: `fun main() {
    val score = 60
    val isVip = false
    val bigSpender = true
    // BUG: bonus requires a high score AND (being VIP or a big spender)
    val bonusEligible = score >= 80 && isVip || bigSpender
    println(bonusEligible)
}`,
    fixedCode: `fun main() {
    val score = 60
    val isVip = false
    val bigSpender = true
    val bonusEligible = score >= 80 && (isVip || bigSpender)
    println(bonusEligible)
}`,
    expectedOutput: 'false',
    hints: [
      "The bonus should require BOTH a high score AND at least one of VIP/big-spender status -- check whether that's actually what the expression computes.",
      '&& binds tighter than ||, so score >= 80 && isVip || bigSpender is really (score >= 80 && isVip) || bigSpender -- bigSpender alone can make the whole thing true even when the score is too low.',
      'Add parentheses around isVip || bigSpender so the score check applies to the combined VIP/big-spender result: score >= 80 && (isVip || bigSpender).'
    ],
    explanation:
      'Without parentheses, score >= 80 && isVip || bigSpender parses as (score >= 80 && isVip) || bigSpender. With score = 60, isVip = false, bigSpender = true, that becomes (false && false) || true = false || true = true -- a bonus is wrongly granted even though the score is far below 80. Adding parentheses to force score >= 80 && (isVip || bigSpender) changes the grouping to false && (false || true) = false && true = false, correctly withholding the bonus until the score requirement is met.'
  },
  mastered: {
    topicTitle: 'Smart Calculator (World 2 Boss)',
    summary:
      'You have mastered World 2: combining arithmetic, comparison, logical, assignment, and increment/decrement operators -- with correct precedence -- into one working program.',
    passedCount: '4 / 4 PASSED',
    verificationItems: [
      { title: 'Concept understood', subtitle: 'How every World 2 operator family works together in a real program' },
      { title: 'Examples explored', subtitle: '4 integrated patterns combining multiple operator types' },
      { title: 'Predictions completed', subtitle: '4/4 correct output forecasts' },
      { title: 'Code written & executed', subtitle: '1 multi-step capstone program passed' },
      { title: 'Bugs diagnosed & repaired', subtitle: 'Resolved a precedence bug spanning comparison and logical operators' }
    ],
    xpEarned: 50,
    streakDays: 1,
    accuracy: '100%'
  }
};
