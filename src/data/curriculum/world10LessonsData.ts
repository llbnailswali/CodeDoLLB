import { FiveStageLesson } from '../lessonStagesData';

export type CollectionLessonConfig = {
  key: string;
  topic: string;
  stageName?: string;
  learnTitle: string;
  learnText: string;
  keyIdeas: Array<{ number: number; title: string; description: string }>;
  takeaway: string;
  exampleSnippet: string[];
  exploreCards: Array<{
    title: string;
    subtitle: string;
    code: string[];
    whatItMeans: Array<{ label: string; description: string }>;
    whatChanged: string;
  }>;
  predictions: Array<{
    code: string[];
    prompt?: string;
    options: Array<{ id: 'A' | 'B' | 'C' | 'D'; label: string; isCorrect: boolean }>;
    detail: string;
  }>;
  taskTitle: string;
  taskDescription: string;
  taskSteps: string[];
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  debugTitle: string;
  debugSubtitle: string;
  brokenCode: string;
  fixedCode: string;
  debugExpectedOutput: string;
  hints: [string, string, string];
  debugExplanation: string;
};

const WORLD_ID = 'world-10';
const WORLD_NAME = 'Collection Wizardry';

function createCollectionLesson(c: CollectionLessonConfig): FiveStageLesson {
  const numberedDescription = `${c.taskDescription}\n\nThe source collection is already declared in main().\n\n${c.taskSteps
    .map((step, idx) => `${idx + 1}. ${step}`)
    .join('\n\n')}\n\nExpected output:\n${c.expectedOutput}`;

  return {
    id: `world-10-${c.key}`,
    worldId: WORLD_ID,
    worldName: WORLD_NAME,
    stageName: c.stageName ?? (c.key === 'boss' ? 'WORLD BOSS' : 'STAGE 10 — FUNCTIONAL COLLECTION OPERATIONS'),
    topicTitle: c.topic,
    learn: {
      title: c.learnTitle,
      subtitle: c.learnText,
      exampleTag: 'EXAMPLE',
      exampleTitle: `A ${c.topic} demonstration`,
      language: 'Kotlin',
      codeSnippet: c.exampleSnippet,
      explanation: c.learnText,
      keyIdeas: c.keyIdeas,
      keyTakeaway: c.takeaway,
    },
    explore: {
      title: 'Explore Collection Operations',
      subtitle: 'Examine how data flows through collection transformations.',
      cards: c.exploreCards.map((card, i) => ({
        id: `${c.key}-explore-${i + 1}`,
        number: `0${i + 1}`,
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
      subtitle: 'Trace each transformation and evaluate the output.',
      questions: c.predictions.map((p, i) => ({
        id: `${c.key}-predict-${i + 1}`,
        questionNumber: i + 1,
        totalQuestions: c.predictions.length,
        title: 'Trace Collection Pipeline',
        topicMeta: c.topic,
        language: 'Kotlin',
        code: p.code,
        prompt: p.prompt ?? 'What will this code print?',
        options: p.options,
        explanation: { codeRef: c.topic, detail: p.detail },
      })),
    },
    writeRun: {
      challengeNumber: 1,
      totalChallenges: 1,
      xpReward: c.key === 'boss' ? 50 : 20,
      title: c.taskTitle,
      description: numberedDescription,
      requirements: { name: 'main', params: '(none)', returns: 'Unit' },
      fileName: 'Collections.kt',
      initialCode: c.initialCode,
      solutionCode: c.solutionCode,
      sampleInput: 'main()',
      expectedOutput: c.expectedOutput,
      testCase: { call: '', expected: c.expectedOutput },
    },
    debug: {
      title: c.debugTitle,
      subtitle: c.debugSubtitle,
      challengeNumber: 1,
      totalChallenges: 1,
      difficulty: 'medium',
      bugType: 'collection',
      bugLabel: 'Collection Logic Bug',
      brokenCode: c.brokenCode,
      fixedCode: c.fixedCode,
      expectedOutput: c.debugExpectedOutput,
      hints: c.hints,
      explanation: c.debugExplanation,
    },
    mastered: {
      topicTitle: c.topic,
      summary: `You have mastered ${c.topic} by tracing, predicting, writing, and debugging Kotlin collection operations.`,
      passedCount: `${c.predictions.length} / ${c.predictions.length} PASSED`,
      verificationItems: [
        { title: 'Concept understood', subtitle: c.takeaway },
        { title: 'Examples explored', subtitle: `${c.exploreCards.length} distinct collection operations traced` },
        { title: 'Predictions completed', subtitle: `${c.predictions.length}/${c.predictions.length} prediction questions answered` },
        { title: 'Code written & executed', subtitle: 'Passed the collection challenge' },
        { title: 'Bugs diagnosed & repaired', subtitle: 'Fixed an independent collection defect' },
      ],
      xpEarned: c.key === 'boss' ? 50 : 20,
      streakDays: 1,
      accuracy: '100%',
    },
  };
}

export const MAP_MAPNOTNULL_FILTER_LESSON = createCollectionLesson({
  key: 'map-mapnotnull-filter',
  topic: 'map & mapNotNull & filter',
  learnTitle: 'Transforming and Selecting Collection Elements',
  learnText: 'Kotlin collection operations transform and select items functionally without modifying the original collection. filter keeps elements matching a boolean predicate, map transforms each element with a lambda, and mapNotNull transforms each element while automatically discarding any null results.',
  takeaway: 'Filter before map to minimize downstream transformations, and use mapNotNull to eliminate null results in a single step.',
  keyIdeas: [
    { number: 1, title: 'Immutability first', description: 'Functional operations produce new collections without mutating the source list.' },
    { number: 2, title: 'Predicate vs Transform', description: 'filter tests a condition and keeps matches; map applies an expression to convert each item.' },
    { number: 3, title: 'Null filtering', description: 'mapNotNull discards any transformation that yields null, guaranteeing a list of non-null values.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val numbers = listOf(1, 2, 3, 4)',
    '    val evens = numbers.filter { it % 2 == 0 }',
    '    val scaled = evens.map { it * 10 }',
    '    println(scaled)',
    '}',
  ],
  exploreCards: [
    {
      title: 'Filter followed by Map',
      subtitle: 'Chain filter and map to transform selected elements.',
      code: [
        'val scores = listOf(45, 82, 90, 60, 75)',
        'val boosted = scores.filter { it >= 70 }.map { it + 5 }',
        'println(boosted)',
      ],
      whatItMeans: [{ label: 'Pipeline', description: 'Scores below 70 are dropped before adding 5.' }],
      whatChanged: 'Filtered to [82, 90, 75], then mapped to [87, 95, 80].',
    },
    {
      title: 'mapNotNull Discards Nulls',
      subtitle: 'Eliminate null returns during transformation.',
      code: [
        'val inputs = listOf(10, -5, 25, -2)',
        'val positiveDoubles = inputs.mapNotNull { if (it > 0) it * 2 else null }',
        'println(positiveDoubles)',
      ],
      whatItMeans: [{ label: 'mapNotNull', description: 'Negative values produce null and are discarded.' }],
      whatChanged: 'Produced [20, 50] without null entries.',
    },
    {
      title: 'filterNotNull Discards Existing Null Elements',
      subtitle: 'Strip null references from a nullable collection without a transformation lambda.',
      code: [
        'val items: List<String?> = listOf("apple", null, "banana", null, "cherry")',
        'val nonNulls = items.filterNotNull()',
        'println(nonNulls)',
      ],
      whatItMeans: [{ label: 'filterNotNull', description: 'Filters out null elements, producing a clean List<String>.' }],
      whatChanged: 'Produced [apple, banana, cherry] from a list containing null values.',
    },
    {
      title: 'Original Collection Unchanged',
      subtitle: 'Operations return new lists while preserving the source.',
      code: [
        'val original = listOf(3, 1, 4)',
        'val mapped = original.map { it * 2 }',
        'println(mapped)',
        'println(original)',
      ],
      whatItMeans: [{ label: 'Safety', description: 'Original collection retains its initial values.' }],
      whatChanged: 'Printed [6, 2, 8] followed by the intact [3, 1, 4].',
    },
  ],
  predictions: [
    {
      code: [
        'val numbers = listOf(1, 2, 3, 4)',
        'val result = numbers.filter { it > 2 }.map { it * 3 }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[9, 12]', isCorrect: true },
        { id: 'B', label: '[3, 6, 9, 12]', isCorrect: false },
        { id: 'C', label: '[3, 6]', isCorrect: false },
        { id: 'D', label: '[6, 8]', isCorrect: false },
      ],
      detail: 'filter keeps 3 and 4; map multiplies each by 3, yielding [9, 12].',
    },
    {
      code: [
        'val items = listOf(1, 2, 3, 4)',
        'val result = items.mapNotNull { if (it % 2 == 0) it * 10 else null }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[10, 20, 30, 40]', isCorrect: false },
        { id: 'B', label: '[20, 40]', isCorrect: true },
        { id: 'C', label: '[null, 20, null, 40]', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'Odd numbers evaluate to null and are excluded; 2 and 4 yield [20, 40].',
    },
    {
      code: [
        'val items: List<String?> = listOf("Kotlin", null, "Java", null)',
        'val result = items.filterNotNull().map { it.length }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[6, 4]', isCorrect: true },
        { id: 'B', label: '[6, null, 4, null]', isCorrect: false },
        { id: 'C', label: '[Kotlin, Java]', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'filterNotNull removes all null entries leaving ["Kotlin", "Java"]; map transforms them to their lengths [6, 4].',
    },
    {
      code: [
        'val numbers = listOf(10, 20, 30)',
        'val result = numbers.map { it + 5 }.filter { it > 20 }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[15, 25, 35]', isCorrect: false },
        { id: 'B', label: '[20, 30]', isCorrect: false },
        { id: 'C', label: '[25, 35]', isCorrect: true },
        { id: 'D', label: '[35]', isCorrect: false },
      ],
      detail: 'map adds 5 to make [15, 25, 35]; filter keeps elements strictly greater than 20, yielding [25, 35].',
    },
  ],
  taskTitle: 'Filter and Discount Product Prices',
  taskDescription: 'You are processing an e-commerce inventory list of product prices. Filter the list to retain only prices strictly greater than 30, then apply a 5 discount to each matching price using map.',
  taskSteps: [
    'Filter the prices collection to retain only elements greater than 30.',
    'Map the filtered elements by subtracting 5 from each.',
    'Print the resulting discounted list.',
  ],
  initialCode: `fun main() {
    val prices = listOf(15, 45, 80, 20, 120)

    // 1. Filter prices strictly greater than 30

    // 2. Map matching prices by subtracting 5

    // 3. Print the discounted list

}`,
  solutionCode: `fun main() {
    val prices = listOf(15, 45, 80, 20, 120)
    val discounted = prices.filter { it > 30 }.map { it - 5 }
    println(discounted)
}`,
  expectedOutput: '[40, 75, 115]',
  debugTitle: 'Fix Temperature Sensor Scaling',
  debugSubtitle: 'The telemetry logger is using an incorrect arithmetic multiplier.',
  brokenCode: `fun main() {
    val readings = listOf(18, 26, 32, 14, 28)
    val warm = readings.filter { it >= 20 }
    println(warm.map { it + 5 })
}`,
  fixedCode: `fun main() {
    val readings = listOf(18, 26, 32, 14, 28)
    val warm = readings.filter { it >= 20 }
    println(warm.map { it * 2 })
}`,
  debugExpectedOutput: '[52, 64, 56]',
  hints: [
    'Observe the output: [31, 37, 33] is adding 5 instead of scaling by 2.',
    'Check the lambda passed to map: it adds 5 rather than multiplying by 2.',
    'Change it + 5 to it * 2 to produce the calibrated sensor readings.',
  ],
  debugExplanation: 'The broken program used addition instead of multiplication in map, producing [31, 37, 33]. Replacing it + 5 with it * 2 yields [52, 64, 56].',
});

export const FILTERNOT_FILTERISINSTANCE_FLATMAP_LESSON = createCollectionLesson({
  key: 'filternot-filterisinstance-flatmap',
  topic: 'filterNot & filterIsInstance & flatMap',
  learnTitle: 'Negated Selection, Type Filtering, and Flattening',
  learnText: 'filterNot selects elements that do NOT match a predicate, eliminating clumsy inverted boolean conditions. filterIsInstance extracts elements of a given type from a mixed collection. flatMap transforms each element into a collection and flattens all returned collections into a single result list.',
  takeaway: 'Use filterNot to exclude unwanted matches, filterIsInstance for type selection, and flatMap to transform and flatten nested structures in one pass.',
  keyIdeas: [
    { number: 1, title: 'Clean negation', description: 'filterNot { it == x } is more readable and less error-prone than filter { it != x }.' },
    { number: 2, title: 'Safe type extraction', description: 'filterIsInstance<T>() filters heterogeneous collections by type safely.' },
    { number: 3, title: 'Transform and flatten', description: 'flatMap applies a collection-returning lambda and collapses the nested lists into one.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val rows = listOf(listOf(1, 2), listOf(3, 4))',
    '    val flat = rows.flatMap { it }',
    '    println(flat.filterNot { it == 2 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'filterNot Excludes Matches',
      subtitle: 'Discard matching items directly.',
      code: [
        'val codes = listOf(100, 404, 200, 500, 204)',
        'val validCodes = codes.filterNot { it >= 400 }',
        'println(validCodes)',
      ],
      whatItMeans: [{ label: 'filterNot', description: 'Any code 400 or above is excluded.' }],
      whatChanged: 'Produced [100, 200, 204].',
    },
    {
      title: 'filterIsInstance Selects Types',
      subtitle: 'Extract elements of a specific type from mixed data.',
      code: [
        'val mixed = listOf("alpha", 42, "beta", true, 99)',
        'val stringsOnly = mixed.filterIsInstance<String>()',
        'println(stringsOnly)',
      ],
      whatItMeans: [{ label: 'Type Filter', description: 'Non-String elements are filtered out.' }],
      whatChanged: 'Produced [alpha, beta].',
    },
    {
      title: 'flatMap Combines Generated Lists',
      subtitle: 'Expand each item into multiple values in a flat list.',
      code: [
        'val numbers = listOf(1, 3)',
        'val expanded = numbers.flatMap { listOf(it, it + 1) }',
        'println(expanded)',
      ],
      whatItMeans: [{ label: 'flatMap', description: 'Each number maps to a 2-element list, flattened into one.' }],
      whatChanged: 'Produced [1, 2, 3, 4].',
    },
  ],
  predictions: [
    {
      code: [
        'val numbers = listOf(1, 2, 3, 4, 5)',
        'val result = numbers.filterNot { it % 2 == 0 }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[2, 4]', isCorrect: false },
        { id: 'B', label: '[1, 3, 5]', isCorrect: true },
        { id: 'C', label: '[1, 2, 3, 4, 5]', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'filterNot excludes even numbers where it % 2 == 0 is true, keeping [1, 3, 5].',
    },
    {
      code: [
        'val items = listOf("one", 10, "two", 20)',
        'val numbers = items.filterIsInstance<Number>()',
        'println(numbers)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[one, two]', isCorrect: false },
        { id: 'B', label: '[10, 20]', isCorrect: true },
        { id: 'C', label: '[one, 10, two, 20]', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'filterIsInstance<Number>() retains only numeric elements [10, 20].',
    },
    {
      code: [
        'val nested = listOf(listOf(1, 2), listOf(3))',
        'val result = nested.flatMap { it }.filterNot { it == 2 }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[1, 3]', isCorrect: true },
        { id: 'B', label: '[[1], [3]]', isCorrect: false },
        { id: 'C', label: '[1, 2, 3]', isCorrect: false },
        { id: 'D', label: '[2]', isCorrect: false },
      ],
      detail: 'flatMap flattens the lists into [1, 2, 3], then filterNot removes 2, leaving [1, 3].',
    },
  ],
  taskTitle: 'Flatten and Filter Department Teams',
  taskDescription: 'Given lists of department sub-teams, flatten them into a single list of all active groups and exclude Research using filterNot.',
  taskSteps: [
    'Use flatMap to flatten the nested department lists into a single list.',
    'Use filterNot to exclude the team named "Research".',
    'Print the resulting active team list.',
  ],
  initialCode: `fun main() {
    val departments = listOf(listOf("Design", "Research"), listOf("Eng", "Product"))

    // 1. Flatten departments with flatMap

    // 2. Exclude "Research" with filterNot

    // 3. Print the active team list

}`,
  solutionCode: `fun main() {
    val departments = listOf(listOf("Design", "Research"), listOf("Eng", "Product"))
    val active = departments.flatMap { it }.filterNot { it == "Research" }
    println(active)
}`,
  expectedOutput: '[Design, Eng, Product]',
  debugTitle: 'Filter Deprecated Build Tags',
  debugSubtitle: 'The release script is accidentally retaining deprecated tags.',
  brokenCode: `fun main() {
    val tags = listOf(listOf("core", "deprecated"), listOf("ui", "deprecated"))
    val flattened = tags.flatMap { it }
    println(flattened.filterNot { it == "core" })
}`,
  fixedCode: `fun main() {
    val tags = listOf(listOf("core", "deprecated"), listOf("ui", "deprecated"))
    val flattened = tags.flatMap { it }
    println(flattened.filterNot { it == "deprecated" })
}`,
  debugExpectedOutput: '[core, ui]',
  hints: [
    'Notice that the broken program excludes "core" instead of "deprecated".',
    'The filterNot condition should remove elements matching "deprecated".',
    'Update the filterNot lambda to check it == "deprecated".',
  ],
  debugExplanation: 'The filterNot condition checked for "core" rather than "deprecated", leaving deprecated tags in the output. Updating the condition to it == "deprecated" outputs [core, ui].',
});

export const FLATTEN_REDUCE_FOLD_LESSON = createCollectionLesson({
  key: 'flatten-reduce-fold',
  topic: 'flatten & reduce & fold',
  learnTitle: 'Flattening Nested Lists and Accumulating Results',
  learnText: 'flatten merges a list of lists into a single flat list. reduce aggregates elements from left to right using the first element as the initial accumulator (and throws on an empty list). fold takes an explicit seed value as the starting accumulator, making it safe for empty collections and allowing the return type to differ from the element type.',
  takeaway: 'Use flatten to remove one level of nesting, reduce for non-empty collections without an offset, and fold whenever an initial seed or empty safety is needed.',
  keyIdeas: [
    { number: 1, title: 'One level unwrapping', description: 'flatten() turns List<List<T>> into List<T>.' },
    { number: 2, title: 'reduce requires items', description: 'reduce throws NoSuchElementException if called on an empty collection.' },
    { number: 3, title: 'fold provides the seed', description: 'fold(initial) { acc, elem -> ... } begins accumulation with the given initial value.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val rows = listOf(listOf(1, 2), listOf(3))',
    '    println(rows.flatten().fold(10) { acc, value -> acc + value })',
    '}',
  ],
  exploreCards: [
    {
      title: 'flatten Collapses Nesting',
      subtitle: 'Merge sub-lists without changing element order.',
      code: [
        'val matrix = listOf(listOf(1, 2), listOf(3, 4), listOf(5))',
        'val flat = matrix.flatten()',
        'println(flat)',
      ],
      whatItMeans: [{ label: 'flatten', description: 'Unwraps each inner list into a single sequence.' }],
      whatChanged: 'Produced [1, 2, 3, 4, 5].',
    },
    {
      title: 'reduce Combines Elements',
      subtitle: 'Use the first element as accumulator to compute a product.',
      code: [
        'val factors = listOf(2, 3, 4)',
        'val product = factors.reduce { acc, n -> acc * n }',
        'println(product)',
      ],
      whatItMeans: [{ label: 'reduce', description: 'Starts with 2, multiplies by 3 (6), then 4 (24).' }],
      whatChanged: 'Produced 24.',
    },
    {
      title: 'fold with Initial Seed',
      subtitle: 'Begin accumulation from an explicit starting value.',
      code: [
        'val items = listOf(5, 10, 15)',
        'val totalWithBase = items.fold(50) { acc, n -> acc + n }',
        'println(totalWithBase)',
      ],
      whatItMeans: [{ label: 'fold', description: '50 + 5 + 10 + 15 = 80.' }],
      whatChanged: 'Produced 80.',
    },
  ],
  predictions: [
    {
      code: [
        'val nested = listOf(listOf(10, 20), listOf(30))',
        'val sum = nested.flatten().reduce { a, b -> a + b }',
        'println(sum)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '60', isCorrect: true },
        { id: 'B', label: '[10, 20, 30]', isCorrect: false },
        { id: 'C', label: '50', isCorrect: false },
        { id: 'D', label: '10', isCorrect: false },
      ],
      detail: 'flatten produces [10, 20, 30], and reduce sums them: 10 + 20 + 30 = 60.',
    },
    {
      code: [
        'val numbers = listOf(2, 3)',
        'val result = numbers.fold(10) { acc, v -> acc - v }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '5', isCorrect: true },
        { id: 'B', label: '15', isCorrect: false },
        { id: 'C', label: '-5', isCorrect: false },
        { id: 'D', label: '9', isCorrect: false },
      ],
      detail: 'Starts at 10: 10 - 2 = 8, then 8 - 3 = 5.',
    },
    {
      code: [
        'val empty = listOf<Int>()',
        'val result = empty.fold(42) { acc, v -> acc + v }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '0', isCorrect: false },
        { id: 'B', label: '42', isCorrect: true },
        { id: 'C', label: 'null', isCorrect: false },
        { id: 'D', label: 'An error', isCorrect: false },
      ],
      detail: 'fold on an empty collection immediately returns the initial seed value (42) without executing the lambda.',
    },
  ],
  taskTitle: 'Tally Total Shift Hours with Bonus',
  taskDescription: 'Given weekly shift records broken down into nested lists, flatten the lists into a single collection of hours and accumulate the total with an initial base bonus of 10 using fold.',
  taskSteps: [
    'Call flatten() on the nested weeklyShifts list.',
    'Accumulate the total hours using fold with an initial value of 10.',
    'Print the accumulated total.',
  ],
  initialCode: `fun main() {
    val weeklyShifts = listOf(listOf(8, 7), listOf(8, 9, 4))

    // 1. Flatten the nested shift hours

    // 2. Accumulate hours with a base bonus of 10 using fold

    // 3. Print the total hours

}`,
  solutionCode: `fun main() {
    val weeklyShifts = listOf(listOf(8, 7), listOf(8, 9, 4))
    val total = weeklyShifts.flatten().fold(10) { acc, hours -> acc + hours }
    println(total)
}`,
  expectedOutput: '46',
  debugTitle: 'Fix Loyalty Tier Starting Balance',
  debugSubtitle: 'The point calculator forgot to include the member starting bonus.',
  brokenCode: `fun main() {
    val dailyPoints = listOf(12, 18, 25)
    val finalScore = dailyPoints.fold(0) { acc, pts -> acc + pts }
    println(finalScore)
}`,
  fixedCode: `fun main() {
    val dailyPoints = listOf(12, 18, 25)
    val finalScore = dailyPoints.fold(100) { acc, pts -> acc + pts }
    println(finalScore)
}`,
  debugExpectedOutput: '155',
  hints: [
    'The member loyalty tier starts with an initial balance of 100 points.',
    'Notice the starting accumulator passed to fold is 0 instead of 100.',
    'Change fold(0) to fold(100) to include the initial balance.',
  ],
  debugExplanation: 'The loyalty calculation started from 0 instead of the member bonus of 100 points. Changing the fold initial seed to 100 yields 155.',
});

export const GROUPBY_ASSOCIATE_PARTITION_LESSON = createCollectionLesson({
  key: 'groupby-associate-partition',
  topic: 'groupBy & associate & partition',
  learnTitle: 'Grouping, Associating, and Partitioning',
  learnText: 'groupBy groups elements by a computed key into a Map of lists. associate transforms elements into key-value pairs (using to) to build a Map where later keys overwrite earlier ones. partition splits a collection into a Pair of two lists in a single pass: matching elements in the first list, and non-matching elements in the second.',
  takeaway: 'Use groupBy for one-to-many categories, associate to create key-value mappings, and partition to divide a collection into two matching/non-matching subsets simultaneously.',
  keyIdeas: [
    { number: 1, title: 'groupBy produces lists', description: 'The resulting map values are collections containing all items that produced each key.' },
    { number: 2, title: 'associate overwrites keys', description: 'associate creates a Map; duplicate keys replace earlier entries with the latest value.' },
    { number: 3, title: 'partition evaluates once', description: 'partition runs the predicate once per element and produces Pair(matching, nonMatching).' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(1, 2, 3, 4)',
    '    val split = values.partition { it % 2 == 0 }',
    '    println(split.first)',
    '}',
  ],
  exploreCards: [
    {
      title: 'groupBy Words by Length',
      subtitle: 'Classify items into Map<Key, List<Value>>.',
      code: [
        'val words = listOf("hi", "sun", "go", "sky")',
        'val byLength = words.groupBy { it.length }',
        'println(byLength[2])',
        'println(byLength[3])',
      ],
      whatItMeans: [{ label: 'groupBy', description: 'Keys are word lengths; values are lists of matching words.' }],
      whatChanged: 'Printed [hi, go] followed by [sun, sky].',
    },
    {
      title: 'associate with Pairs',
      subtitle: 'Construct a Map using the to infix function.',
      code: [
        'val ids = listOf(101, 102)',
        'val userMap = ids.associate { it to "User-$it" }',
        'println(userMap[101])',
        'println(userMap[102])',
      ],
      whatItMeans: [{ label: 'associate', description: 'Maps ID integers directly to formatted username strings.' }],
      whatChanged: 'Printed User-101 and User-102.',
    },
    {
      title: 'partition into Pair of Lists',
      subtitle: 'Split into matches and non-matches in a single pass.',
      code: [
        'val numbers = listOf(5, -2, 8, -7, 0)',
        'val (positives, negatives) = numbers.partition { it >= 0 }',
        'println(positives)',
        'println(negatives)',
      ],
      whatItMeans: [{ label: 'partition', description: 'positives receives matches; negatives receives non-matches.' }],
      whatChanged: 'Printed [5, 8, 0] followed by [-2, -7].',
    },
  ],
  predictions: [
    {
      code: [
        'val values = listOf(1, 2, 3, 4)',
        'val (evens, odds) = values.partition { it % 2 == 0 }',
        'println(evens)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[1, 3]', isCorrect: false },
        { id: 'B', label: '[2, 4]', isCorrect: true },
        { id: 'C', label: '[1, 2, 3, 4]', isCorrect: false },
        { id: 'D', label: '2', isCorrect: false },
      ],
      detail: 'partition { it % 2 == 0 } places even numbers into first (destructured as evens), printing [2, 4].',
    },
    {
      code: [
        'val words = listOf("ant", "bear", "ape")',
        'val grouped = words.groupBy { it[0] }',
        'println(grouped[\'a\'])',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[ant, ape]', isCorrect: true },
        { id: 'B', label: '[bear]', isCorrect: false },
        { id: 'C', label: 'ant', isCorrect: false },
        { id: 'D', label: '[ant]', isCorrect: false },
      ],
      detail: 'grouped[\'a\'] retrieves all words starting with \'a\', namely [ant, ape].',
    },
    {
      code: [
        'val numbers = listOf(1, 2, 3)',
        'val map = numbers.associate { it % 2 to it }',
        'println(map[1])',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '1', isCorrect: false },
        { id: 'B', label: '3', isCorrect: true },
        { id: 'C', label: '[1, 3]', isCorrect: false },
        { id: 'D', label: 'null', isCorrect: false },
      ],
      detail: 'associate builds a Map with unique keys; 1 to 1 is later overwritten by 3 to 3, so map[1] is 3.',
    },
  ],
  taskTitle: 'Partition Passing and Failing Exam Scores',
  taskDescription: 'Given a list of student exam scores, partition them into passing scores (60 and above) and failing scores (below 60). Print the passing list first, followed by the failing list.',
  taskSteps: [
    'Use partition with the predicate it >= 60 to split the scores list.',
    'Destructure or access the first (passed) and second (failed) lists.',
    'Print the passed list, then print the failed list on the next line.',
  ],
  initialCode: `fun main() {
    val scores = listOf(75, 45, 88, 55, 92)

    // 1. Partition scores into passing (>= 60) and failing

    // 2. Destructure or access the first and second lists

    // 3. Print the passed list followed by the failed list

}`,
  solutionCode: `fun main() {
    val scores = listOf(75, 45, 88, 55, 92)
    val (passed, failed) = scores.partition { it >= 60 }
    println(passed)
    println(failed)
}`,
  expectedOutput: '[75, 88, 92]\n[45, 55]',
  debugTitle: 'Fix Reversed Status Partition',
  debugSubtitle: 'The health check inverted the success and failure partitions.',
  brokenCode: `fun main() {
    val statuses = listOf(200, 404, 201, 500)
    val (success, failure) = statuses.partition { it >= 400 }
    println(success)
    println(failure)
}`,
  fixedCode: `fun main() {
    val statuses = listOf(200, 404, 201, 500)
    val (success, failure) = statuses.partition { it < 400 }
    println(success)
    println(failure)
}`,
  debugExpectedOutput: '[200, 201]\n[404, 500]',
  hints: [
    'HTTP status codes below 400 represent success, while 400 and above are errors.',
    'The broken predicate it >= 400 put the error codes into the success variable.',
    'Invert the partition condition to it < 400.',
  ],
  debugExplanation: 'The partition condition checked it >= 400, placing errors into the first list (destructured as success). Changing the condition to it < 400 correctly separates success codes from failures.',
});

export const ZIP_CHUNKED_WINDOWED_LESSON = createCollectionLesson({
  key: 'zip-chunked-windowed',
  topic: 'zip & chunked & windowed',
  learnTitle: 'Pairing, Batching, and Sliding Across Collections',
  learnText: 'zip pairs corresponding elements from two collections into Pair objects, truncating to the length of the shorter list. chunked(size) splits a collection into fixed-size batches, where the last batch contains any remaining elements. windowed(size, step) creates overlapping or stepped sliding views over a collection.',
  takeaway: 'Use zip to combine parallel streams, chunked to process items in batches, and windowed to inspect sequential sliding sub-lists.',
  keyIdeas: [
    { number: 1, title: 'zip truncates safely', description: 'When collections have different sizes, zip stops at the end of the shorter collection.' },
    { number: 2, title: 'chunked batches items', description: 'chunked(n) divides elements into lists of size n; the final chunk contains any remainder.' },
    { number: 3, title: 'windowed slides forward', description: 'windowed(size, step) creates a moving window across sequential elements.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(1, 2, 3, 4, 5)',
    '    println(values.chunked(2))',
    '}',
  ],
  exploreCards: [
    {
      title: 'zip Pairs Elements',
      subtitle: 'Align two collections into pairs.',
      code: [
        'val names = listOf("Ann", "Bob")',
        'val scores = listOf(95, 88, 70)',
        'println(names.zip(scores))',
      ],
      whatItMeans: [{ label: 'zip', description: 'Stops after 2 pairs because names only has 2 elements.' }],
      whatChanged: 'Produced [(Ann, 95), (Bob, 88)].',
    },
    {
      title: 'zip with Transformation Lambda',
      subtitle: 'Directly combine paired values without creating intermediate Pair objects.',
      code: [
        'val names = listOf("Alice", "Bob", "Charlie")',
        'val scores = listOf(90, 85)',
        'val summaries = names.zip(scores) { name, score -> "$name:$score" }',
        'println(summaries)',
      ],
      whatItMeans: [{ label: 'zip { a, b -> ... }', description: 'Applies a custom lambda combining each pair into a formatted string.' }],
      whatChanged: 'Produced [Alice:90, Bob:85] directly.',
    },
    {
      title: 'chunked Groups Batches',
      subtitle: 'Split elements into fixed-size sub-lists.',
      code: [
        'val items = listOf(1, 2, 3, 4, 5)',
        'val batches = items.chunked(2)',
        'println(batches)',
      ],
      whatItMeans: [{ label: 'chunked', description: 'Pairs 1 and 2, 3 and 4, leaving 5 in the final chunk.' }],
      whatChanged: 'Produced [[1, 2], [3, 4], [5]].',
    },
    {
      title: 'windowed Sliding View',
      subtitle: 'Inspect adjacent elements with step = 1.',
      code: [
        'val stream = listOf(10, 20, 30, 40)',
        'val windows = stream.windowed(2, step = 1)',
        'println(windows)',
      ],
      whatItMeans: [{ label: 'windowed', description: 'Slides a window of size 2 across the list.' }],
      whatChanged: 'Produced [[10, 20], [20, 30], [30, 40]].',
    },
  ],
  predictions: [
    {
      code: [
        'val a = listOf(1, 2)',
        'val b = listOf(10, 20)',
        'val result = a.zip(b) { x, y -> x + y }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[(1, 10), (2, 20)]', isCorrect: false },
        { id: 'B', label: '[11, 22]', isCorrect: true },
        { id: 'C', label: '[10, 40]', isCorrect: false },
        { id: 'D', label: '33', isCorrect: false },
      ],
      detail: 'zip with a transform lambda combines paired elements directly: 1 + 10 = 11, 2 + 20 = 22.',
    },
    {
      code: [
        'val keys = listOf("A", "B")',
        'val values = listOf(1, 2, 3)',
        'val pairs = keys.zip(values) { k, v -> "$k$v" }',
        'println(pairs)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[A1, B2]', isCorrect: true },
        { id: 'B', label: '[A1, B2, null3]', isCorrect: false },
        { id: 'C', label: '[(A, 1), (B, 2)]', isCorrect: false },
        { id: 'D', label: '[A1, B2, 3]', isCorrect: false },
      ],
      detail: 'zip truncates to the shorter collection (keys has 2 elements), combining "A" with 1 and "B" with 2 to produce [A1, B2].',
    },
    {
      code: [
        'val numbers = listOf(1, 2, 3, 4, 5, 6, 7)',
        'println(numbers.chunked(3))',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[[1, 2, 3], [4, 5, 6], [7]]', isCorrect: true },
        { id: 'B', label: '[[1, 2, 3], [4, 5, 6]]', isCorrect: false },
        { id: 'C', label: '[[1, 2], [3, 4], [5, 6], [7]]', isCorrect: false },
        { id: 'D', label: '[1, 2, 3, 4, 5, 6, 7]', isCorrect: false },
      ],
      detail: 'chunked(3) divides 7 elements into groups of 3, with the remaining 1 element in the last chunk.',
    },
    {
      code: [
        'val list = listOf(1, 2, 3, 4)',
        'println(list.windowed(3, step = 2))',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[[1, 2, 3], [3, 4]]', isCorrect: false },
        { id: 'B', label: '[[1, 2, 3]]', isCorrect: true },
        { id: 'C', label: '[[1, 2], [3, 4]]', isCorrect: false },
        { id: 'D', label: '[[1, 2, 3], [2, 3, 4]]', isCorrect: false },
      ],
      detail: 'windowed(3, step = 2) takes index 0..2 ([1, 2, 3]); advancing by step 2 reaches index 2, which only has 2 elements remaining, so without partialWindows it stops.',
    },
  ],
  taskTitle: 'Batch Request IDs into Chunks of Three',
  taskDescription: 'You are writing an API batching service. Given a list of request IDs, divide them into batches of size 3 using chunked(3) and print the resulting list of batches.',
  taskSteps: [
    'Call chunked(3) on the requests collection.',
    'Store the resulting list of chunks in a variable.',
    'Print the batches exactly as produced.',
  ],
  initialCode: `fun main() {
    val requests = listOf(101, 102, 103, 104, 105, 106, 107)

    // 1. Group requests into batches of 3 using chunked

    // 2. Store the chunks in a value

    // 3. Print the batches

}`,
  solutionCode: `fun main() {
    val requests = listOf(101, 102, 103, 104, 105, 106, 107)
    val batches = requests.chunked(3)
    println(batches)
}`,
  expectedOutput: '[[101, 102, 103], [104, 105, 106], [107]]',
  debugTitle: 'Fix Sensor Batch Size',
  debugSubtitle: 'The telemetry logger used the wrong chunk size.',
  brokenCode: `fun main() {
    val readings = listOf(5, 10, 15, 20, 25)
    val batches = readings.chunked(3)
    println(batches)
}`,
  fixedCode: `fun main() {
    val readings = listOf(5, 10, 15, 20, 25)
    val batches = readings.chunked(2)
    println(batches)
}`,
  debugExpectedOutput: '[[5, 10], [15, 20], [25]]',
  hints: [
    'The telemetry specification requires pairs of 2 readings per batch.',
    'Notice chunked(3) creates batches of 3 instead of 2.',
    'Update chunked(3) to chunked(2).',
  ],
  debugExplanation: 'The code used chunked(3) instead of chunked(2). Changing the argument to 2 creates the required [[5, 10], [15, 20], [25]] batches.',
});

export const DISTINCT_SORTED_LESSON = createCollectionLesson({
  key: 'distinct-sorted',
  topic: 'distinct & sorted',
  learnTitle: 'Removing Duplicates and Ordering Elements',
  learnText: 'distinct returns a new list containing only unique elements, preserving the relative order of first appearances. sorted returns elements in natural ascending order, and sortedDescending returns them in descending order. Neither operation mutates the source list.',
  takeaway: 'Chain distinct before sorted to deduplicate and order values cleanly without modifying the original collection.',
  keyIdeas: [
    { number: 1, title: 'First occurrence preserved', description: 'distinct() retains the first appearance of each duplicate value in relative order.' },
    { number: 2, title: 'Natural ordering', description: 'sorted() orders numbers ascending and strings lexicographically.' },
    { number: 3, title: 'Source immutability', description: 'Neither distinct() nor sorted() mutates the original list; both return fresh lists.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(3, 1, 3, 2)',
    '    println(values.distinct().sorted())',
    '}',
  ],
  exploreCards: [
    {
      title: 'distinct Keeps First Occurrences',
      subtitle: 'Remove duplicate numbers while preserving order.',
      code: [
        'val ids = listOf(4, 2, 4, 1, 2, 5)',
        'val unique = ids.distinct()',
        'println(unique)',
      ],
      whatItMeans: [{ label: 'distinct', description: 'First 4 and first 2 are retained; subsequent ones are dropped.' }],
      whatChanged: 'Produced [4, 2, 1, 5].',
    },
    {
      title: 'sorted and sortedDescending',
      subtitle: 'Order strings ascending and descending.',
      code: [
        'val words = listOf("gamma", "alpha", "beta")',
        'println(words.sorted())',
        'println(words.sortedDescending())',
      ],
      whatItMeans: [{ label: 'Sorting', description: 'sorted() gives alphabetical order; sortedDescending() reverses it.' }],
      whatChanged: 'Printed [alpha, beta, gamma] then [gamma, beta, alpha].',
    },
    {
      title: 'Original List Is Preserved',
      subtitle: 'Deduplication and sorting return new lists.',
      code: [
        'val original = listOf(3, 1, 2)',
        'val sortedList = original.sorted()',
        'println(sortedList)',
        'println(original)',
      ],
      whatItMeans: [{ label: 'Immutability', description: 'The original list remains in its initial unsorted order.' }],
      whatChanged: 'Printed [1, 2, 3] followed by [3, 1, 2].',
    },
  ],
  predictions: [
    {
      code: [
        'val numbers = listOf(5, 2, 5, 1, 2)',
        'println(numbers.distinct())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[1, 2, 5]', isCorrect: false },
        { id: 'B', label: '[5, 2, 1]', isCorrect: true },
        { id: 'C', label: '[5, 2, 5, 1, 2]', isCorrect: false },
        { id: 'D', label: '[2, 1, 5]', isCorrect: false },
      ],
      detail: 'distinct preserves the order of first appearance: 5 appears first, then 2, then 1.',
    },
    {
      code: [
        'val words = listOf("z", "b", "m")',
        'println(words.sorted())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[b, m, z]', isCorrect: true },
        { id: 'B', label: '[z, m, b]', isCorrect: false },
        { id: 'C', label: '[b, z, m]', isCorrect: false },
        { id: 'D', label: '[z, b, m]', isCorrect: false },
      ],
      detail: 'sorted() orders strings alphabetically: b, m, z.',
    },
    {
      code: [
        'val values = listOf(3, 1, 3, 2)',
        'println(values.distinct().sorted())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[3, 1, 2]', isCorrect: false },
        { id: 'B', label: '[1, 2, 3]', isCorrect: true },
        { id: 'C', label: '[1, 2, 3, 3]', isCorrect: false },
        { id: 'D', label: '[3, 2, 1]', isCorrect: false },
      ],
      detail: 'distinct() produces [3, 1, 2], and sorted() orders them ascending: [1, 2, 3].',
    },
  ],
  taskTitle: 'Deduplicate and Sort Category Tags',
  taskDescription: 'Given an array of user-submitted category tags with repeated entries, remove all duplicate tags using distinct() and sort the resulting unique tags alphabetically using sorted().',
  taskSteps: [
    'Call distinct() on the tags list to eliminate duplicates.',
    'Call sorted() on the deduplicated result to sort alphabetically.',
    'Print the final cleaned tag list.',
  ],
  initialCode: `fun main() {
    val tags = listOf("kotlin", "java", "kotlin", "android", "java")

    // 1. Remove duplicate tags using distinct

    // 2. Sort the unique tags alphabetically using sorted

    // 3. Print the sorted tags

}`,
  solutionCode: `fun main() {
    val tags = listOf("kotlin", "java", "kotlin", "android", "java")
    val clean = tags.distinct().sorted()
    println(clean)
}`,
  expectedOutput: '[android, java, kotlin]',
  debugTitle: 'Fix Inverted Priority Ordering',
  debugSubtitle: 'The task priority queue was sorted descending instead of ascending.',
  brokenCode: `fun main() {
    val levels = listOf(3, 1, 4, 1, 3, 2)
    val result = levels.distinct().sortedDescending()
    println(result)
}`,
  fixedCode: `fun main() {
    val levels = listOf(3, 1, 4, 1, 3, 2)
    val result = levels.distinct().sorted()
    println(result)
}`,
  debugExpectedOutput: '[1, 2, 3, 4]',
  hints: [
    'The requirement is ascending order (lowest priority number first).',
    'Notice sortedDescending() reverses the order to [4, 3, 2, 1].',
    'Replace sortedDescending() with sorted().',
  ],
  debugExplanation: 'The broken code used sortedDescending(), ordering the priorities from 4 down to 1. Replacing it with sorted() outputs [1, 2, 3, 4].',
});

export const SORTEDBY_MIN_MAX_LESSON = createCollectionLesson({
  key: 'sortedby-min-max',
  topic: 'sortedBy & min / max',
  learnTitle: 'Key-Based Sorting and Safe Extrema Lookup',
  learnText: 'sortedBy orders elements by a derived comparable key, such as string length or an object property. minOrNull and maxOrNull safely find the lowest and highest values, returning null if the collection is empty. In contrast, min and max throw an exception when called on empty lists.',
  takeaway: 'Use sortedBy to sort by derived properties, and prefer minOrNull / maxOrNull for safe extrema lookup without risk of empty collection exceptions.',
  keyIdeas: [
    { number: 1, title: 'Selector lambda', description: 'sortedBy { it.property } compares elements using the value returned by the lambda.' },
    { number: 2, title: 'Safe vs Throwing', description: 'minOrNull() and maxOrNull() return null on empty collections; min() and max() throw an error.' },
    { number: 3, title: 'Stable ordering', description: 'When multiple elements share the same key, sortedBy preserves their relative order.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(5, 2, 8)',
    '    println(values.maxOrNull())',
    '}',
  ],
  exploreCards: [
    {
      title: 'sortedBy on String Length',
      subtitle: 'Order strings by length instead of alphabetical value.',
      code: [
        'val words = listOf("elephant", "cat", "ox", "giraffe")',
        'val byLength = words.sortedBy { it.length }',
        'println(byLength)',
      ],
      whatItMeans: [{ label: 'sortedBy', description: 'Compares lengths: ox (2), cat (3), giraffe (7), elephant (8).' }],
      whatChanged: 'Produced [ox, cat, giraffe, elephant].',
    },
    {
      title: 'minOrNull and maxOrNull',
      subtitle: 'Safely find the lowest and highest values in a collection.',
      code: [
        'val temps = listOf(14, 28, 9, 21)',
        'println(temps.minOrNull())',
        'println(temps.maxOrNull())',
      ],
      whatItMeans: [{ label: 'Extrema', description: 'minOrNull finds 9; maxOrNull finds 28.' }],
      whatChanged: 'Printed 9 followed by 28.',
    },
    {
      title: 'Safe Handling on Empty Lists',
      subtitle: 'minOrNull returns null when no elements exist.',
      code: [
        'val empty = listOf<Int>()',
        'println(empty.minOrNull())',
        'println(empty.maxOrNull())',
      ],
      whatItMeans: [{ label: 'Null safety', description: 'Does not throw an exception on empty input.' }],
      whatChanged: 'Printed null twice.',
    },
  ],
  predictions: [
    {
      code: [
        'val words = listOf("bb", "a", "ccc")',
        'println(words.sortedBy { it.length })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[a, bb, ccc]', isCorrect: true },
        { id: 'B', label: '[bb, a, ccc]', isCorrect: false },
        { id: 'C', label: '[ccc, bb, a]', isCorrect: false },
        { id: 'D', label: '[1, 2, 3]', isCorrect: false },
      ],
      detail: 'sortedBy orders strings by length: a (1), bb (2), ccc (3).',
    },
    {
      code: [
        'val numbers = listOf(15, 3, 82, 44)',
        'println(numbers.maxOrNull())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '82', isCorrect: true },
        { id: 'B', label: '3', isCorrect: false },
        { id: 'C', label: '44', isCorrect: false },
        { id: 'D', label: 'null', isCorrect: false },
      ],
      detail: 'maxOrNull() identifies the largest numeric value in the list, which is 82.',
    },
    {
      code: [
        'val items = listOf("pear", "apple", "fig")',
        'println(items.minOrNull())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: 'fig', isCorrect: false },
        { id: 'B', label: 'apple', isCorrect: true },
        { id: 'C', label: 'pear', isCorrect: false },
        { id: 'D', label: 'null', isCorrect: false },
      ],
      detail: 'For strings, minOrNull() compares lexicographically: "apple" comes first alphabetically.',
    },
  ],
  taskTitle: 'Sort Cities by Name Length',
  taskDescription: 'Given a list of city names, sort them in ascending order of their character length using sortedBy { it.length } and print the sorted list.',
  taskSteps: [
    'Call sortedBy on the cities list with a selector lambda targeting it.length.',
    'Store the sorted result in a variable.',
    'Print the sorted list.',
  ],
  initialCode: `fun main() {
    val cities = listOf("Seattle", "York", "Chicago", "Denver")

    // 1. Sort cities by name length using sortedBy

    // 2. Store the result in a value

    // 3. Print the sorted cities

}`,
  solutionCode: `fun main() {
    val cities = listOf("Seattle", "York", "Chicago", "Denver")
    val byLength = cities.sortedBy { it.length }
    println(byLength)
}`,
  expectedOutput: '[York, Denver, Seattle, Chicago]',
  debugTitle: 'Fix Coldest Temperature Lookup',
  debugSubtitle: 'The weather reporter looked up the highest temperature instead of the lowest.',
  brokenCode: `fun main() {
    val readings = listOf(12, -3, 8, 25, 0)
    val coldest = readings.maxOrNull()
    println(coldest)
}`,
  fixedCode: `fun main() {
    val readings = listOf(12, -3, 8, 25, 0)
    val coldest = readings.minOrNull()
    println(coldest)
}`,
  debugExpectedOutput: '-3',
  hints: [
    'The report requires the coldest recorded temperature, which is the minimum value.',
    'Notice maxOrNull() finds the highest temperature (25) instead of the lowest (-3).',
    'Replace maxOrNull() with minOrNull().',
  ],
  debugExplanation: 'The code called maxOrNull() instead of minOrNull(), reporting 25 instead of the minimum value -3. Replacing it with minOrNull() outputs -3.',
});

export const SUM_AVERAGE_ANY_ALL_NONE_LESSON = createCollectionLesson({
  key: 'sum-average-any-all-none',
  topic: 'sum / average & any / all / none',
  learnTitle: 'Numeric Aggregations and Predicate Validation',
  learnText: 'sum adds all numeric elements in a collection, while average calculates their arithmetic mean (returning NaN if the collection is empty). any returns true if at least one element matches a predicate; all returns true if every element matches (and is vacuously true on empty collections); none returns true if zero elements match.',
  takeaway: 'Use sum and average to calculate numeric aggregates, and use any, all, and none to test collection conditions with short-circuiting.',
  keyIdeas: [
    { number: 1, title: 'Numeric aggregates', description: 'sum() computes the total; average() computes the mean or returns NaN on empty lists.' },
    { number: 2, title: 'Short-circuiting predicates', description: 'any stops on the first true; all and none stop on the first false.' },
    { number: 3, title: 'Empty list guarantees', description: 'On an empty list: any is false, all is true (vacuous truth), and none is true.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(2, 4, 6)',
    '    println(values.all { it % 2 == 0 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'sum and average',
      subtitle: 'Calculate total and mean from numeric collections.',
      code: [
        'val scores = listOf(10, 20, 30)',
        'println(scores.sum())',
        'println(scores.average())',
      ],
      whatItMeans: [{ label: 'Aggregates', description: '10 + 20 + 30 = 60; 60 / 3 = 20.0.' }],
      whatChanged: 'Printed 60 followed by 20.0.',
    },
    {
      title: 'Testing Predicates with any, all, none',
      subtitle: 'Validate conditions across elements.',
      code: [
        'val numbers = listOf(2, 4, 6)',
        'println(numbers.all { it % 2 == 0 })',
        'println(numbers.any { it > 5 })',
        'println(numbers.none { it < 0 })',
      ],
      whatItMeans: [{ label: 'Predicates', description: 'All are even (true), at least one > 5 (true), none negative (true).' }],
      whatChanged: 'Printed true three times.',
    },
    {
      title: 'Predicate Truth on Empty Lists',
      subtitle: 'Understand vacuous truth on empty collections.',
      code: [
        'val empty = listOf<Int>()',
        'println(empty.all { it > 100 })',
        'println(empty.any())',
        'println(empty.none())',
      ],
      whatItMeans: [{ label: 'Empty Predicates', description: 'all is vacuously true; any is false; none is true.' }],
      whatChanged: 'Printed true, false, true.',
    },
  ],
  predictions: [
    {
      code: [
        'val numbers = listOf(3, 6, 9)',
        'println(numbers.all { it % 3 == 0 })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: 'true', isCorrect: true },
        { id: 'B', label: 'false', isCorrect: false },
        { id: 'C', label: '3', isCorrect: false },
        { id: 'D', label: '[3, 6, 9]', isCorrect: false },
      ],
      detail: 'All numbers (3, 6, 9) are divisible by 3, so all returns true.',
    },
    {
      code: [
        'val numbers = listOf(1, 3, 5)',
        'println(numbers.any { it % 2 == 0 })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: 'true', isCorrect: false },
        { id: 'B', label: 'false', isCorrect: true },
        { id: 'C', label: 'null', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'None of the numbers in [1, 3, 5] are even, so any returns false.',
    },
    {
      code: [
        'val numbers = listOf(10, 20, 30)',
        'println(numbers.sum())',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '20', isCorrect: false },
        { id: 'B', label: '60', isCorrect: true },
        { id: 'C', label: '[10, 20, 30]', isCorrect: false },
        { id: 'D', label: '30', isCorrect: false },
      ],
      detail: 'sum adds 10 + 20 + 30 = 60.',
    },
  ],
  taskTitle: 'Validate Daily Step Goals and Calculate Total',
  taskDescription: 'Given daily step counts for a week, verify that every day met the minimum goal of 5000 steps using all { it >= 5000 }, and calculate the total weekly steps using sum(). Print both results.',
  taskSteps: [
    'Use all { it >= 5000 } to test if every day reached at least 5000 steps.',
    'Use sum() to compute the total steps across all days.',
    'Print the boolean result followed by the total steps on the next line.',
  ],
  initialCode: `fun main() {
    val steps = listOf(6000, 7500, 8200, 5100)

    // 1. Check if all step counts are at least 5000 using all

    // 2. Calculate the total steps using sum

    // 3. Print the verification result and the total

}`,
  solutionCode: `fun main() {
    val steps = listOf(6000, 7500, 8200, 5100)
    val allMet = steps.all { it >= 5000 }
    val total = steps.sum()
    println(allMet)
    println(total)
}`,
  expectedOutput: 'true\n26800',
  debugTitle: 'Fix Student Honor Roll Verification',
  debugSubtitle: 'The qualification checker used any instead of all.',
  brokenCode: `fun main() {
    val grades = listOf(85, 92, 58, 90)
    val passedAll = grades.any { it >= 70 }
    println(passedAll)
}`,
  fixedCode: `fun main() {
    val grades = listOf(85, 92, 58, 90)
    val passedAll = grades.all { it >= 70 }
    println(passedAll)
}`,
  debugExpectedOutput: 'false',
  hints: [
    'The honor roll requirement states that ALL grades must be 70 or higher.',
    'Notice that grades contains 58, which fails the requirement.',
    'Replace any { it >= 70 } with all { it >= 70 }.',
  ],
  debugExplanation: 'The code used any, which returned true because some grades were above 70 despite 58 failing. Replacing it with all correctly returns false.',
});

export const FIRST_FIND_PIPELINES_LESSON = createCollectionLesson({
  key: 'first-find-collection-pipelines-and-chai',
  topic: 'first / find & Collection pipelines and chaining',
  learnTitle: 'Item Lookup and Declarative Collection Pipelines',
  learnText: 'first returns the first element matching a predicate, throwing NoSuchElementException if no match exists. find (an alias for firstOrNull) safely returns null when no element matches. Combining filtering, mapping, sorting, and item lookup produces clear, declarative collection pipelines.',
  takeaway: 'Prefer find over first when a match might not exist, and structure pipelines to filter early and transform before terminal aggregation.',
  keyIdeas: [
    { number: 1, title: 'first vs find', description: 'first() throws an exception if no element matches; find() returns null safely.' },
    { number: 2, title: 'Declarative pipelines', description: 'Chain collection operations into a cohesive sequence without intermediate var state.' },
    { number: 3, title: 'Order of operations', description: 'Filtering before mapping avoids doing transformations on elements that will be discarded.' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(1, 2, 3, 4)',
    '    val selected = values.filter { it > 2 }',
    '    println(selected.map { it * 10 })',
    '}',
  ],
  exploreCards: [
    {
      title: 'first vs find Lookup',
      subtitle: 'Compare throwing first with safe find.',
      code: [
        'val numbers = listOf(3, 7, 2, 9)',
        'println(numbers.first { it > 5 })',
        'println(numbers.find { it > 10 })',
      ],
      whatItMeans: [{ label: 'Lookup', description: 'first finds 7; find returns null when nothing is > 10.' }],
      whatChanged: 'Printed 7 followed by null.',
    },
    {
      title: 'Chaining Filter, Map, and Count',
      subtitle: 'Transform collections through multiple pipeline stages.',
      code: [
        'val words = listOf("alpha", "beta", "gamma", "delta")',
        'val count = words.filter { it.length > 4 }.map { it.length }.count()',
        'println(count)',
      ],
      whatItMeans: [{ label: 'Pipeline', description: 'Filters 3 words with length > 4, maps lengths, counts results.' }],
      whatChanged: 'Produced 3.',
    },
    {
      title: 'Pipeline Terminating with first()',
      subtitle: 'Extract the first transformed match from a pipeline.',
      code: [
        'val ids = listOf(12, 45, 8, 24, 60)',
        'val match = ids.filter { it % 4 == 0 }.map { it * 10 }.first()',
        'println(match)',
      ],
      whatItMeans: [{ label: 'Terminal', description: 'First multiple of 4 is 12; mapped to 120 and retrieved.' }],
      whatChanged: 'Produced 120.',
    },
  ],
  predictions: [
    {
      code: [
        'val numbers = listOf(1, 2, 3, 4)',
        'println(numbers.first { it > 2 })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '3', isCorrect: true },
        { id: 'B', label: '4', isCorrect: false },
        { id: 'C', label: '[3, 4]', isCorrect: false },
        { id: 'D', label: 'null', isCorrect: false },
      ],
      detail: 'first { it > 2 } searches from left to right and returns the first matching element, which is 3.',
    },
    {
      code: [
        'val items = listOf("cat", "dog")',
        'println(items.find { it.length > 5 })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: 'null', isCorrect: true },
        { id: 'B', label: 'cat', isCorrect: false },
        { id: 'C', label: 'An error', isCorrect: false },
        { id: 'D', label: '[]', isCorrect: false },
      ],
      detail: 'find returns null when no elements satisfy the predicate, rather than throwing an exception.',
    },
    {
      code: [
        'val values = listOf(10, 20, 30)',
        'val result = values.filter { it > 15 }.map { it / 10 }.first()',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '1', isCorrect: false },
        { id: 'B', label: '2', isCorrect: true },
        { id: 'C', label: '[2, 3]', isCorrect: false },
        { id: 'D', label: '20', isCorrect: false },
      ],
      detail: 'filter keeps [20, 30]; map produces [2, 3]; first() extracts 2.',
    },
  ],
  taskTitle: 'Find the First Long Account Name in Uppercase',
  taskDescription: 'Given a list of usernames, construct a collection pipeline that filters for names strictly longer than 8 characters, transforms the remaining names to uppercase using uppercase(), and retrieves the first matching name with first().',
  taskSteps: [
    'Filter the accounts list to retain names with length > 8.',
    'Map each matching name to uppercase using uppercase().',
    'Extract the first result using first() and print it.',
  ],
  initialCode: `fun main() {
    val accounts = listOf("guest", "alex", "administrator", "moderator")

    // 1. Filter accounts with length greater than 8

    // 2. Transform the matching accounts to uppercase using map

    // 3. Select the first matching account and print it

}`,
  solutionCode: `fun main() {
    val accounts = listOf("guest", "alex", "administrator", "moderator")
    val match = accounts.filter { it.length > 8 }.map { it.uppercase() }.first()
    println(match)
}`,
  expectedOutput: 'ADMINISTRATOR',
  debugTitle: 'Fix Coupon Discount Pipeline Order',
  debugSubtitle: 'The shopping cart applied the filter threshold before subtracting the discount.',
  brokenCode: `fun main() {
    val prices = listOf(5, 12, 45, 80, 20)
    val match = prices.filter { it > 10 }.map { it - 30 }.first()
    println(match)
}`,
  fixedCode: `fun main() {
    val prices = listOf(5, 12, 45, 80, 20)
    val match = prices.map { it - 30 }.filter { it > 10 }.first()
    println(match)
}`,
  debugExpectedOutput: '15',
  hints: [
    'The program should find the first price that remains over 10 AFTER applying the 30 coupon.',
    'Notice that filtering before subtracting the coupon selected 12, yielding 12 - 30 = -18.',
    'Apply the map discount first, then filter for items strictly greater than 10.',
  ],
  debugExplanation: 'The pipeline filtered prices before subtracting the coupon. By mapping with it - 30 first and then filtering for it > 10, the first matching discounted price is 45 - 30 = 15.',
});

export const WORLD_10_BOSS_LESSON = createCollectionLesson({
  key: 'boss',
  topic: 'Data Transformation Engine',
  stageName: 'WORLD BOSS',
  learnTitle: 'Designing Multi-Stage Collection Pipelines',
  learnText: 'A complete collection pipeline chains filtering, mapping, sorting, and reduction to process real-world data without intermediate mutable state. Clean pipelines separate concerns: first sanitize and filter, then transform and enrich, and finally sort or aggregate into the target summary.',
  takeaway: 'Structure end-to-end collection pipelines into clear sequential stages: filter irrelevant data, transform values, and reduce to the final result.',
  keyIdeas: [
    { number: 1, title: 'Multi-stage composition', description: 'Combine filter, map, sorted, and aggregation into a single cohesive pipeline.' },
    { number: 2, title: 'Immutability at scale', description: 'Every stage produces a new collection, preventing unintended side effects.' },
    { number: 3, title: 'Terminal operations', description: 'End pipelines with purposeful aggregation such as sum(), fold(), or first().' },
  ],
  exampleSnippet: [
    'fun main() {',
    '    val values = listOf(1, 2, 3, 4)',
    '    val selected = values.filter { it > 1 }',
    '    val scaled = selected.map { it * 10 }',
    '    val total = scaled.fold(0) { acc, value -> acc + value }',
    '    println(total)',
    '}',
  ],
  exploreCards: [
    {
      title: 'Sanitization and Scaling Pipeline',
      subtitle: 'Filter invalid values and scale results.',
      code: [
        'val raw = listOf(15, -4, 22, 0, 35)',
        'val sanitized = raw.filter { it > 0 }.map { it * 2 }',
        'println(sanitized)',
      ],
      whatItMeans: [{ label: 'Pipeline', description: 'Drops negative and zero values, then doubles positive numbers.' }],
      whatChanged: 'Produced [30, 44, 70].',
    },
    {
      title: 'Batching and Aggregation',
      subtitle: 'Divide into batches and compute sums per batch.',
      code: [
        'val stream = listOf(10, 20, 30, 40, 50, 60)',
        'val batchSums = stream.chunked(3) { it.sum() }',
        'println(batchSums)',
      ],
      whatItMeans: [{ label: 'chunked with lambda', description: 'Sums each 3-element batch.' }],
      whatChanged: 'Produced [60, 150].',
    },
    {
      title: 'Sorting and Seeded Accumulation',
      subtitle: 'Filter, sort, and fold values with an initial seed.',
      code: [
        'val values = listOf(5, 20, 15, 30)',
        'val total = values.filter { it >= 15 }.sorted().fold(100) { acc, v -> acc + v }',
        'println(total)',
      ],
      whatItMeans: [{ label: 'fold with seed', description: '100 + 15 + 20 + 30 = 165.' }],
      whatChanged: 'Produced 165.',
    },
  ],
  predictions: [
    {
      code: [
        'val raw = listOf(10, -5, 20, 30)',
        'val total = raw.filter { it > 0 }.map { it / 10 }.sum()',
        'println(total)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '6', isCorrect: true },
        { id: 'B', label: '55', isCorrect: false },
        { id: 'C', label: '60', isCorrect: false },
        { id: 'D', label: '5', isCorrect: false },
      ],
      detail: 'filter keeps [10, 20, 30]; map divides each by 10 to produce [1, 2, 3]; sum adds 1 + 2 + 3 = 6.',
    },
    {
      code: [
        'val list = listOf(1, 2, 3, 4)',
        'println(list.chunked(2) { it.sum() })',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '[3, 7]', isCorrect: true },
        { id: 'B', label: '[[1, 2], [3, 4]]', isCorrect: false },
        { id: 'C', label: '10', isCorrect: false },
        { id: 'D', label: '[1, 2, 3, 4]', isCorrect: false },
      ],
      detail: 'chunked(2) passes [1, 2] to produce sum 3, and [3, 4] to produce sum 7, yielding [3, 7].',
    },
    {
      code: [
        'val values = listOf(4, 1, 3, 2)',
        'val result = values.sorted().fold(10) { acc, n -> acc + n }',
        'println(result)',
      ],
      prompt: 'What will this code print?',
      options: [
        { id: 'A', label: '20', isCorrect: true },
        { id: 'B', label: '10', isCorrect: false },
        { id: 'C', label: '14', isCorrect: false },
        { id: 'D', label: '[1, 2, 3, 4]', isCorrect: false },
      ],
      detail: 'Values sorted are [1, 2, 3, 4]; fold starts at 10 and adds 1 + 2 + 3 + 4 = 10, resulting in 20.',
    },
  ],
  taskTitle: 'Process Order Revenue with Member Vouchers',
  taskDescription: 'Build an end-to-end data processing pipeline for sales transactions. Filter to retain only premium orders (order amount >= 100), apply a 20 member voucher discount to each using map, and sum the total discounted revenue using sum(). Print the total.',
  taskSteps: [
    'Filter the orders list to keep only amounts >= 100.',
    'Map each qualifying order by subtracting 20.',
    'Compute the total discounted revenue with sum() and print the result.',
  ],
  initialCode: `fun main() {
    val orders = listOf(120, -15, 45, 250, 80, 310)

    // 1. Filter to retain premium orders >= 100

    // 2. Apply a 20 voucher discount using map

    // 3. Sum the final amounts and print the total revenue

}`,
  solutionCode: `fun main() {
    val orders = listOf(120, -15, 45, 250, 80, 310)
    val revenue = orders.filter { it >= 100 }.map { it - 20 }.sum()
    println(revenue)
}`,
  expectedOutput: '620',
  debugTitle: 'Fix Missing Telemetry Sort in Pipeline',
  debugSubtitle: 'The excess latency pipeline neglected to sort the resulting samples.',
  brokenCode: `fun main() {
    val pingSamples = listOf(45, 120, 210, 85, 300, 150)
    val excess = pingSamples.filter { it >= 100 }.map { it - 100 }
    println(excess)
}`,
  fixedCode: `fun main() {
    val pingSamples = listOf(45, 120, 210, 85, 300, 150)
    val excess = pingSamples.filter { it >= 100 }.map { it - 100 }.sorted()
    println(excess)
}`,
  debugExpectedOutput: '[20, 50, 110, 200]',
  hints: [
    'The telemetry specification requires excess latencies to be sorted in ascending order.',
    'Notice the pipeline produces [20, 110, 200, 50], which remains unsorted.',
    'Append sorted() to the pipeline chain after the map transformation.',
  ],
  debugExplanation: 'The pipeline filtered and mapped excess latencies but omitted sorted(), leaving the output in original order. Adding sorted() outputs [20, 50, 110, 200].',
});

export const WORLD_10_LESSONS: FiveStageLesson[] = [
  MAP_MAPNOTNULL_FILTER_LESSON,
  FILTERNOT_FILTERISINSTANCE_FLATMAP_LESSON,
  FLATTEN_REDUCE_FOLD_LESSON,
  GROUPBY_ASSOCIATE_PARTITION_LESSON,
  ZIP_CHUNKED_WINDOWED_LESSON,
  DISTINCT_SORTED_LESSON,
  SORTEDBY_MIN_MAX_LESSON,
  SUM_AVERAGE_ANY_ALL_NONE_LESSON,
  FIRST_FIND_PIPELINES_LESSON,
  WORLD_10_BOSS_LESSON,
];

export type World10Outcome = { output: string; error?: 'compiler_error' | 'runtime_error' };
export const WORLD_10_ADDED_EXAMPLE_OUTCOMES: Record<string, World10Outcome> = {};
export const WORLD_10_ADDED_PREDICTION_OUTCOMES: Record<string, World10Outcome> = {};

function addCoverage(
  lesson: FiveStageLesson,
  title: string,
  explanation: string,
  exampleCode: string,
  exampleOutcome: World10Outcome | undefined,
  predictionCode: string,
  predictionOutcome: World10Outcome,
  distractors: string[],
) {
  const key = lesson.id.replace('world-10-', '');
  if (exampleOutcome) {
    const cards = lesson.explore!.cards;
    const id = `${key}-explore-${cards.length + 1}`;
    cards.push({
      id,
      number: String(cards.length + 1).padStart(2, '0'),
      title,
      language: 'Kotlin',
      subtitle: explanation,
      code: exampleCode.split('\n'),
      whatItMeans: [{ label: title, description: explanation }],
      whatChanged: exampleOutcome.error ? 'This operation stops with the stated runtime error.' : `Expected output:\n${exampleOutcome.output}`,
    });
    WORLD_10_ADDED_EXAMPLE_OUTCOMES[id] = exampleOutcome;
  }
  const questions = lesson.predict!.questions;
  const id = `${key}-predict-${questions.length + 1}`;
  const answer = predictionOutcome.error ? 'Runtime error' : predictionOutcome.output;
  questions.push({
    id,
    questionNumber: questions.length + 1,
    totalQuestions: 0,
    title,
    topicMeta: lesson.topicTitle,
    language: 'Kotlin',
    code: predictionCode.split('\n'),
    prompt: predictionOutcome.error ? 'What happens when this code runs?' : 'What will this code print?',
    options: [answer, ...distractors].map((label, index) => ({
      id: ['A', 'B', 'C', 'D'][index] as 'A' | 'B' | 'C' | 'D',
      label,
      isCorrect: index === 0,
    })),
    explanation: { codeRef: title, detail: explanation },
  });
  WORLD_10_ADDED_PREDICTION_OUTCOMES[id] = predictionOutcome;
  lesson.learn.keyIdeas.push({ number: lesson.learn.keyIdeas.length + 1, title, description: explanation });
}

addCoverage(MAP_MAPNOTNULL_FILTER_LESSON,
  'Empty input stays empty',
  'filter, map, and mapNotNull preserve order and produce an empty result when no element survives; they never invent a placeholder value.',
  'val values = emptyList<Int>()\nprintln(values.filter { it > 0 }.map { it * 2 })', { output: '[]' },
  'val values = listOf(-2, -1)\nprintln(values.mapNotNull { if (it > 0) it * 10 else null })', { output: '[]' },
  ['[null, null]', '[0, 0]', 'Runtime error']);

addCoverage(FILTERNOT_FILTERISINSTANCE_FLATMAP_LESSON,
  'Type filtering works for declared classes',
  'filterIsInstance can retain instances of a declared class while discarding values of unrelated types. Numeric subtype and generic reified filters remain outside the editor scope.',
  'class Item(val code: Int)\nval mixed = listOf(Item(4), "skip", Item(7))\nprintln(mixed.filterIsInstance<Item>().map { it.code })', { output: '[4, 7]' },
  'class Note(val text: String)\nval mixed = listOf("plain", Note("A"), 9, Note("B"))\nprintln(mixed.filterIsInstance<Note>().map { it.text })', { output: '[A, B]' },
  ['[plain, 9]', '[Note, Note]', '[]']);
addCoverage(FILTERNOT_FILTERISINSTANCE_FLATMAP_LESSON,
  'flatMap may produce no values for one input',
  'Each flatMap callback returns a collection. An empty returned collection contributes nothing, while later inputs still contribute their values.',
  'val values = listOf(1, 2, 3)\nprintln(values.flatMap { if (it == 2) emptyList<Int>() else listOf(it, it * 10) })', { output: '[1, 10, 3, 30]' },
  'val words = listOf("go", "", "up")\nprintln(words.flatMap { if (it == "") emptyList<String>() else listOf(it, it.uppercase()) })', { output: '[go, GO, up, UP]' },
  ['[go, GO, , up, UP]', '[[go, GO], [], [up, UP]]', '[GO, UP]']);

addCoverage(FLATTEN_REDUCE_FOLD_LESSON,
  'fold can change the accumulator type',
  'The explicit seed defines the accumulator type, so a list of numbers can fold into a String report as well as another number.',
  'val values = listOf(2, 4, 6)\nprintln(values.fold("items") { text, value -> text + ":" + value })', { output: 'items:2:4:6' },
  'val values = listOf(3, 5)\nprintln(values.fold("start") { text, value -> text + "-" + value })', { output: 'start-3-5' },
  ['8', '[3, 5]', 'start']);
addCoverage(FLATTEN_REDUCE_FOLD_LESSON,
  'reduce requires at least one element',
  'reduce has no explicit seed and therefore cannot start on an empty collection; Kotlin throws instead of returning zero or null.',
  '', undefined,
  'val values = emptyList<Int>()\nprintln(values.reduce { acc, value -> acc + value })', { output: '', error: 'runtime_error' },
  ['0', 'null', '[]']);

addCoverage(GROUPBY_ASSOCIATE_PARTITION_LESSON,
  'partition evaluates its predicate once per item',
  'partition creates both output lists in one pass. Side effects in predicates are usually best avoided, but a counter makes the single evaluation observable.',
  'var calls = 0\nval split = listOf(1, 2, 3).partition { calls++; it > 1 }\nprintln(split.first)\nprintln(split.second)\nprintln(calls)', { output: '[2, 3]\n[1]\n3' },
  'var checks = 0\nval split = listOf(2, 5, 8, 9).partition { checks++; it % 2 == 0 }\nprintln(split.first)\nprintln(checks)', { output: '[2, 8]\n4' },
  ['[2, 8]\n2', '[5, 9]\n4', '[2, 8]\n8']);
addCoverage(GROUPBY_ASSOCIATE_PARTITION_LESSON,
  'A missing grouped key returns null',
  'groupBy creates entries only for produced keys. Looking up a category with no members returns null, just like another missing map key.',
  'val groups = listOf("ant", "bee").groupBy { it.length }\nprintln(groups[4])', { output: 'null' },
  'val groups = listOf(1, 3, 5).groupBy { it % 2 }\nprintln(groups[0])', { output: 'null' },
  ['[]', '[1, 3, 5]', '0']);

addCoverage(ZIP_CHUNKED_WINDOWED_LESSON,
  'Partial windows and a transform',
  'partialWindows = true keeps the final short window, step controls the next start, and the trailing lambda transforms each window.',
  'val values = listOf(1, 2, 3, 4, 5)\nprintln(values.windowed(3, step = 2, partialWindows = true) { it.sum() })', { output: '[6, 12, 5]' },
  'val values = listOf(2, 4, 6, 8)\nprintln(values.windowed(3, step = 2, partialWindows = true) { it.sum() })', { output: '[12, 14]' },
  ['[12]', '[12, 18]', '[[2, 4, 6], [6, 8]]']);
addCoverage(ZIP_CHUNKED_WINDOWED_LESSON,
  'Batch and window sizes must be positive',
  'A zero size cannot advance through the input, so Kotlin rejects it at runtime instead of looping or returning empty batches.',
  '', undefined,
  'println(listOf(1, 2).chunked(0))', { output: '', error: 'runtime_error' },
  ['[]', '[[1, 2]]', '[[1], [2]]']);

addCoverage(DISTINCT_SORTED_LESSON,
  'Nested lists use structural equality',
  'distinct compares list contents, so two different inner lists containing the same values count as duplicates; the first occurrence is kept.',
  'val rows = listOf(listOf(1), listOf(1), listOf(2))\nprintln(rows.distinct())', { output: '[[1], [2]]' },
  'val rows = listOf(listOf(2, 3), listOf(2, 3), listOf(3, 2))\nprintln(rows.distinct())', { output: '[[2, 3], [3, 2]]' },
  ['[[2, 3]]', '[[2, 3], [2, 3], [3, 2]]', '[[3, 2], [2, 3]]']);

addCoverage(SORTEDBY_MIN_MAX_LESSON,
  'sortedBy is stable for equal keys',
  'When selector keys are equal, sortedBy preserves the original relative order, which matters when records share a derived key.',
  'val words = listOf("bb", "aa", "c", "dd")\nprintln(words.sortedBy { it.length })', { output: '[c, bb, aa, dd]' },
  'val words = listOf("sun", "cat", "a", "dog")\nprintln(words.sortedBy { it.length })', { output: '[a, sun, cat, dog]' },
  ['[a, cat, dog, sun]', '[a, dog, cat, sun]', '[sun, cat, dog, a]']);
addCoverage(SORTEDBY_MIN_MAX_LESSON,
  'Throwing extrema need non-empty input',
  'min() and max() require an element, while minOrNull() and maxOrNull() express the empty case as null.',
  '', undefined,
  'val values = emptyList<Int>()\nprintln(values.max())', { output: '', error: 'runtime_error' },
  ['null', '0', '[]']);

addCoverage(SUM_AVERAGE_ANY_ALL_NONE_LESSON,
  'average returns a Double and empty average is NaN',
  'average uses floating-point division even for Int elements. With no elements there is no divisor, so the result is NaN.',
  'println(listOf(1, 2).average())\nprintln(emptyList<Int>().average())', { output: '1.5\nNaN' },
  'println(listOf(2, 3, 5).average())\nprintln(emptyList<Int>().sum())', { output: '3.3333333333333335\n0' },
  ['3\n0', '10\n0', '3.0\nNaN']);
addCoverage(SUM_AVERAGE_ANY_ALL_NONE_LESSON,
  'none with a predicate means zero matches',
  'none { condition } is true only when every element fails the condition; it is the zero-match counterpart to any.',
  'val values = listOf(2, 4, 6)\nprintln(values.none { it < 0 })\nprintln(values.none { it > 5 })', { output: 'true\nfalse' },
  'val values = listOf("red", "blue")\nprintln(values.none { it.length < 3 })\nprintln(values.none { it.length == 3 })', { output: 'true\nfalse' },
  ['false\ntrue', 'true\ntrue', 'false\nfalse']);

addCoverage(FIRST_FIND_PIPELINES_LESSON,
  'firstOrNull handles an empty source',
  'firstOrNull returns null when the source is empty or no predicate match exists, so Elvis can supply an explicit application fallback.',
  'val values = emptyList<Int>()\nprintln(values.firstOrNull() ?: -1)', { output: '-1' },
  'val names = listOf("cat", "dog")\nprintln(names.firstOrNull { it.length > 5 } ?: "missing")', { output: 'missing' },
  ['null', 'cat', 'Runtime error']);

addCoverage(WORLD_10_BOSS_LESSON,
  'Group and aggregate a report',
  'A realistic pipeline can filter records, group them by a derived key, and aggregate each group. This adds reporting structure beyond a single filter-map-sum chain.',
  'val sales = listOf(12, 25, 18, 31)\nval grouped = sales.filter { it >= 15 }.groupBy { if (it < 25) "standard" else "premium" }\nprintln(grouped["standard"]?.sum() ?: 0)\nprintln(grouped["premium"]?.sum() ?: 0)', { output: '18\n56' },
  'val values = listOf(5, 14, 22, 7)\nval groups = values.filter { it >= 10 }.groupBy { if (it < 20) "small" else "large" }\nprintln(groups["small"]?.sum() ?: 0)\nprintln(groups["large"]?.sum() ?: 0)', { output: '14\n22' },
  ['14\n0', '19\n22', '[14]\n[22]']);
addCoverage(WORLD_10_BOSS_LESSON,
  'Choose an empty-result policy',
  'Terminal operations have different empty behavior. sum returns zero, while a lookup may need firstOrNull plus an explicit fallback.',
  'val selected = listOf(1, 2).filter { it > 10 }\nprintln(selected.sum())\nprintln(selected.firstOrNull() ?: -1)', { output: '0\n-1' },
  'val selected = listOf(3, 4).filter { it < 0 }.map { it * 10 }\nprintln(selected.sum())\nprintln(selected.firstOrNull() ?: 99)', { output: '0\n99' },
  ['null\nnull', '0\nnull', 'Runtime error']);

for (const [lessonIndex, lesson] of WORLD_10_LESSONS.entries()) {
  const questions = lesson.predict!.questions;
  questions.forEach((question, index) => {
    question.questionNumber = index + 1;
    question.totalQuestions = questions.length;
    const shift = (lessonIndex + index) % question.options.length;
    const options = question.options.slice(shift).concat(question.options.slice(0, shift));
    question.options = options.map((option, optionIndex) => ({
      ...option,
      id: ['A', 'B', 'C', 'D'][optionIndex] as 'A' | 'B' | 'C' | 'D',
    }));
  });
  lesson.mastered.passedCount = `${questions.length} / ${questions.length} PASSED`;
  const explored = lesson.mastered.verificationItems.find(item => item.title === 'Examples explored');
  if (explored) explored.subtitle = `${lesson.explore!.cards.length} distinct collection scenarios traced`;
  const predicted = lesson.mastered.verificationItems.find(item => item.title === 'Predictions completed');
  if (predicted) predicted.subtitle = `${questions.length}/${questions.length} prediction questions answered`;
}

// The original temperature Debug only diagnosed arithmetic, not a collection
// misconception. This independent scenario repairs a filter/map ordering fault.
Object.assign(MAP_MAPNOTNULL_FILTER_LESSON.debug!, {
  title: 'Filter After Normalizing Sensor Values',
  subtitle: 'The alert threshold must be checked after calibration, but the broken pipeline filters raw values first.',
  brokenCode: 'fun main() {\n    val readings = listOf(8, 12, 15)\n    val alerts = readings.filter { it >= 10 }.map { it - 5 }\n    println(alerts)\n}',
  fixedCode: 'fun main() {\n    val readings = listOf(8, 12, 15)\n    val alerts = readings.map { it - 5 }.filter { it >= 10 }\n    println(alerts)\n}',
  expectedOutput: '[10]',
  hints: [
    'The threshold applies to calibrated values, not raw readings.',
    'The current filter runs before subtracting the calibration offset.',
    'Map with it - 5 first, then filter values >= 10.',
  ],
  explanation: 'Filtering first keeps raw 12 and 15, which become 7 and 10. Calibrating first and applying the threshold afterwards keeps only 10.',
});
