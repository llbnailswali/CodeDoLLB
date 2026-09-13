import { LessonQuestion } from '../../types';

export const WORLD_6_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Read-only vs Mutable Collections (5 questions)
  // =========================================================================
  {
    id: 'w6-l1-c1',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'list-set-map',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Collections • List vs MutableList',
    skill: 'collections',
    difficulty: 1,
    xpReward: 20,
    question: 'What happens when attempting to call .add() on a list created with listOf()?',
    codeFileName: 'Collections.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val numbers: List<Int> = listOf(1, 2, 3)',
      'numbers.add(4)',
      'println(numbers)'
    ],
    options: [
      { id: 'A', title: 'Compilation Error', subtitle: 'List<T> is read-only and does not expose mutation methods like add()', isCorrect: true },
      { id: 'B', title: '[1, 2, 3, 4]', subtitle: 'The list dynamically grows by appending 4', isCorrect: false },
      { id: 'C', title: 'UnsupportedOperationException', subtitle: 'Compiles but crashes at runtime because the backing list is unmodifiable', isCorrect: false },
      { id: 'D', title: '[1, 2, 3]', subtitle: 'The mutation is silently ignored', isCorrect: false }
    ],
    hint: 'Kotlin explicitly separates collection interfaces into read-only (List<T>) and mutable (MutableList<T>).',
    explanation: {
      title: 'Read-Only vs. Mutable Collection Interfaces',
      text: 'listOf() returns an instance of kotlin.collections.List<T>, which provides only query operations (size, get, contains). Mutation methods like add() or remove() are only declared on MutableList<T>, preventing accidental mutations at compile time.',
      highlights: ['List is read-only', 'MutableList allows mutation', 'Compile-time safety']
    }
  },
  {
    id: 'w6-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'list-set-map',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Collections • Set & Uniqueness',
    skill: 'collections',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when this Set is initialized and its size is queried?',
    codeFileName: 'UniqueSet.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val tags = setOf("kotlin", "jvm", "kotlin", "android", "JVM")',
      'println(tags.size)'
    ],
    options: [
      { id: 'A', title: '4', subtitle: '"kotlin" is duplicated and deduplicated, but "jvm" and "JVM" are case-sensitive and distinct', isCorrect: true },
      { id: 'B', title: '5', subtitle: 'All inserted elements are retained', isCorrect: false },
      { id: 'C', title: '3', subtitle: 'Both duplicates and case-insensitive matches are removed', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'setOf cannot take duplicate string literals', isCorrect: false }
    ],
    hint: 'Sets eliminate duplicates using standard equals() comparison, which is case-sensitive for strings.',
    explanation: {
      title: 'Set Deduplication & Case Sensitivity',
      text: 'setOf() constructs a Set containing unique elements. The second occurrence of "kotlin" is discarded because "kotlin".equals("kotlin") is true. However, "jvm" and "JVM" have different casing, so both are retained, yielding a total size of 4.',
      highlights: ['setOf enforces uniqueness', 'equals() verification', 'String case sensitivity']
    }
  },
  {
    id: 'w6-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-6',
    lessonId: 'list-set-map',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Collections • Map Lookup & Elvis',
    skill: 'collections',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the expression to look up the inventory count for "potion", defaulting to 0 if absent.',
    codeFileName: 'GameInventory.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val inventory: Map<String, Int> = mapOf("sword" to 1, "shield" to 2)',
      '// Look up "potion" or fall back to 0',
      'val potionCount: Int = inventory["potion"] ___ 0',
      'println(potionCount)'
    ],
    options: [
      { id: 'A', title: '?:', subtitle: 'Map indexing returns Int? (nullable), so the Elvis operator ?: provides the default value', isCorrect: true },
      { id: 'B', title: '||', subtitle: 'Logical OR operator for boolean conditions', isCorrect: false },
      { id: 'C', title: 'default', subtitle: 'The default keyword cannot be placed inline here', isCorrect: false },
      { id: 'D', title: '!', subtitle: 'Unary not operator', isCorrect: false }
    ],
    hint: 'Indexing a map with [key] returns a nullable value (V?). What operator falls back when a value is null?',
    explanation: {
      title: 'Map Indexing & Nullable Values',
      text: 'In Kotlin, map[key] returns V? because the requested key might not exist in the map. Combining indexing with the Elvis operator (?:) is the idiomatic way to handle missing keys with a default fallback.',
      highlights: ['map[key] returns nullable V?', 'Elvis operator ?: fallback', 'mapOf creates read-only map']
    }
  },
  {
    id: 'w6-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-6',
    lessonId: 'list-set-map',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Collections • Converting to MutableList',
    skill: 'collections',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 causes a type mismatch error. How should the read-only list be converted into a mutable list?',
    codeFileName: 'MutableConversion.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val baseList: List<Int> = listOf(10, 20)',
      'val activeList: MutableList<Int> = baseList',
      'activeList.add(30)',
      'println(activeList)'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'val activeList: MutableList<Int> = baseList.toMutableList()', subtitle: 'Creates a new mutable copy that can be safely modified', isCorrect: true },
      { id: 'B', title: 'val activeList: MutableList<Int> = baseList as MutableList<Int>', subtitle: 'Casting at runtime may throw ClassCastException on read-only implementations', isCorrect: false },
      { id: 'C', title: 'val activeList = baseList.makeMutable()', subtitle: 'makeMutable() does not exist in the Kotlin standard library', isCorrect: false },
      { id: 'D', title: 'val activeList = baseList + 30', subtitle: 'Returns a new List, but does not fix the MutableList type assignment', isCorrect: false }
    ],
    hint: 'Use the standard library function .toMutableList() to create an independent, mutable copy.',
    explanation: {
      title: 'Defensive Copying with toMutableList()',
      text: 'Kotlin enforces that List<T> is a covariant read-only interface, not an assignable sub-type of MutableList<T>. To mutate elements, you must explicitly create a mutable copy using .toMutableList().',
      highlights: ['toMutableList() produces MutableList<T>', 'Prevents unsafe casting', 'Preserves immutability of source']
    }
  },
  {
    id: 'w6-l1-c5',
    challengeType: 'code-ordering',
    worldId: 'world-6',
    lessonId: 'list-set-map',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Collections • MutableMap Assembly',
    skill: 'collections',
    difficulty: 2,
    xpReward: 25,
    question: 'Arrange the code statements in correct sequence to create a mutable map, add an entry, update an entry, and print the map size.',
    codeFileName: 'ConfigBuilder.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Target: Create mutable map, add "timeout", update "retries", print size'
    ],
    codeOrderingItems: [
      { id: 'order-1', code: 'val config = mutableMapOf("retries" to 3)' },
      { id: 'order-2', code: 'config["timeout"] = 5000' },
      { id: 'order-3', code: 'config["retries"] = 5' },
      { id: 'order-4', code: 'println(config.size)' }
    ],
    correctOrderIds: ['order-1', 'order-2', 'order-3', 'order-4'],
    options: [
      { id: 'A', title: 'Initialize map -> Add timeout -> Update retries -> Print size', subtitle: 'Creates the mutable map before inserting or modifying entries', isCorrect: true },
      { id: 'B', title: 'Add timeout -> Initialize map -> Update retries -> Print size', subtitle: 'Cannot assign to variable before declaration', isCorrect: false },
      { id: 'C', title: 'Print size -> Initialize map -> Add timeout -> Update retries', subtitle: 'Variable not in scope when printing', isCorrect: false },
      { id: 'D', title: 'Initialize map -> Print size -> Add timeout -> Update retries', subtitle: 'Prints size before insertions are made', isCorrect: false }
    ],
    hint: 'First initialize with mutableMapOf(), then write key-value pairs using square-bracket syntax, and finally query .size.',
    explanation: {
      title: 'MutableMap Mutation Flow',
      text: 'mutableMapOf() creates an instance of MutableMap. You can both insert new keys and overwrite existing keys using index assignment syntax (map[key] = value). Since "retries" was overwritten, the map has exactly 2 keys ("retries" and "timeout").',
      highlights: ['mutableMapOf initialization', 'Indexing assignment syntax', 'Keys are unique and updated in-place']
    }
  },

  // =========================================================================
  // LESSON 2: Lambdas & Trailing Lambda Syntax (5 questions)
  // =========================================================================
  {
    id: 'w6-l2-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'lambdas-it',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Lambdas • Function Types',
    skill: 'lambdas',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the explicit Kotlin function type for the lambda { a: Int, b: String -> b.repeat(a) }?',
    codeFileName: 'LambdaTypes.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val formatter: (___) -> ___ = { a: Int, b: String -> b.repeat(a) }'
    ],
    options: [
      { id: 'A', title: '(Int, String) -> String', subtitle: 'Function type syntax wraps parameter types in parentheses and points with -> to the return type', isCorrect: true },
      { id: 'B', title: '(Int, String) -> Unit', subtitle: 'The lambda returns a String, not Unit', isCorrect: false },
      { id: 'C', title: 'Function2<Int, String>', subtitle: 'This is the underlying JVM bytecode interface, not idiomatic Kotlin function type syntax', isCorrect: false },
      { id: 'D', title: 'Int, String -> String', subtitle: 'Parentheses around parameter types are mandatory in Kotlin function types', isCorrect: false }
    ],
    hint: 'Kotlin function types always enclose parameters in parentheses: (Param1, Param2) -> ReturnType.',
    explanation: {
      title: 'Kotlin Function Type Syntax',
      text: 'In Kotlin, function types are denoted as (A, B) -> R. The parameter types are listed inside parentheses, followed by an arrow ->, and then the return type. Here, taking an Int and String to produce a String is written as (Int, String) -> String.',
      highlights: ['(ParamTypes) -> ReturnType', 'Mandatory parentheses for parameters', 'Explicit lambda typing']
    }
  },
  {
    id: 'w6-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'lambdas-it',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Lambdas • Implicit "it" Parameter',
    skill: 'lambdas',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by this trailing lambda expression using the implicit "it" parameter?',
    codeFileName: 'ImplicitIt.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val numbers = listOf(1, 2, 3)',
      'val doubled = numbers.map { it * 2 }',
      'println(doubled)'
    ],
    options: [
      { id: 'A', title: '[2, 4, 6]', subtitle: 'it refers to each individual element in turn during map transformation', isCorrect: true },
      { id: 'B', title: '[1, 2, 3, 1, 2, 3]', subtitle: 'it does not duplicate the entire list', isCorrect: false },
      { id: 'C', title: '6', subtitle: 'map transforms each element into a new list, rather than summing them', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'it must be explicitly declared as a lambda parameter', isCorrect: false }
    ],
    hint: 'If a lambda has exactly one parameter, Kotlin allows omitting its name and referring to it via the implicit keyword "it".',
    explanation: {
      title: 'Implicit Single Parameter "it"',
      text: 'When a lambda has only one parameter, Kotlin automatically defines it with the name "it". Therefore, numbers.map { it * 2 } is functionally identical to numbers.map { x -> x * 2 }.',
      highlights: ['implicit "it" keyword', 'Applicable to single-parameter lambdas', 'Concise functional syntax']
    }
  },
  {
    id: 'w6-l2-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'lambdas-it',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Lambdas • Trailing Lambda Convention',
    skill: 'lambdas',
    difficulty: 1,
    xpReward: 20,
    question: 'Which syntax rule allows writing filter { it > 5 } instead of filter({ it > 5 }) in Kotlin?',
    codeFileName: 'TrailingSyntax.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val items = listOf(3, 7, 2, 9)',
      'val filtered = items.filter { it > 5 }'
    ],
    options: [
      { id: 'A', title: 'Trailing Lambda Convention', subtitle: 'If the last parameter of a function is a lambda, it can be placed outside the parentheses', isCorrect: true },
      { id: 'B', title: 'Operator Overloading', subtitle: 'Curly braces are not overloaded operators here', isCorrect: false },
      { id: 'C', title: 'Infix Function Notation', subtitle: 'filter is not declared with the infix keyword', isCorrect: false },
      { id: 'D', title: 'SAM Conversion', subtitle: 'SAM conversion converts Java Single Abstract Methods, not syntax placement', isCorrect: false }
    ],
    hint: 'According to Kotlin convention, if a function\'s final argument is a lambda, it can be moved outside the parentheses. If it is the only argument, parentheses can be omitted entirely.',
    explanation: {
      title: 'The Trailing Lambda Convention',
      text: 'Kotlin allows placing a lambda outside the parameter parentheses if it is the function\'s last parameter. Furthermore, if the lambda is the ONLY parameter, the parentheses can be completely omitted: items.filter { it > 5 }.',
      highlights: ['Trailing lambda syntax', 'Omission of empty parentheses ()', 'Standard idiom across the Kotlin StdLib']
    }
  },
  {
    id: 'w6-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-6',
    lessonId: 'lambdas-it',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Lambdas • Multi-Parameter Lambdas',
    skill: 'lambdas',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 fails to compile because "it" cannot be used for multi-parameter lambdas. How should it be fixed?',
    codeFileName: 'TwoParams.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val pairs = mapOf("alpha" to 1, "beta" to 2)',
      'pairs.forEach { println("$it: $it") }'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'pairs.forEach { (key, value) -> println("$key: $value") }', subtitle: 'Explicitly destructures the Map.Entry into key and value parameters', isCorrect: true },
      { id: 'B', title: 'pairs.forEach { it1, it2 -> println("$it1: $it2") }', subtitle: 'it1 and it2 are not built-in identifiers', isCorrect: false },
      { id: 'C', title: 'pairs.forEach { key: value -> println("$key: $value") }', subtitle: 'Colon syntax is for types, not parameter declaration', isCorrect: false },
      { id: 'D', title: 'pairs.forEach(key, value) { println("$key: $value") }', subtitle: 'Parameters belong inside the curly braces of the lambda', isCorrect: false }
    ],
    hint: 'When iterating a Map with forEach, use destructuring syntax (key, value) -> ... inside the lambda.',
    explanation: {
      title: 'Destructuring in Lambda Parameters',
      text: 'For Map.forEach or multi-parameter callbacks, Kotlin provides destructuring in lambda arguments using parentheses: { (key, value) -> ... }. This cleanly extracts the key and value of each Map.Entry without needing it.key and it.value.',
      highlights: ['Multi-parameter lambdas require explicit names', 'Destructuring with (k, v) ->', 'it is only valid for single parameters']
    }
  },
  {
    id: 'w6-l2-c5',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'lambdas-it',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Lambdas • Underscore for Unused Parameters',
    skill: 'lambdas',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when this map transformation uses an underscore (_) for the unused parameter?',
    codeFileName: 'UnusedParam.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val scores = mapOf("Alice" to 85, "Bob" to 92)',
      'val adjusted = scores.mapValues { (_, score) -> score + 5 }',
      'println(adjusted["Bob"])'
    ],
    options: [
      { id: 'A', title: '97', subtitle: 'Bob\'s initial score of 92 is incremented by 5', isCorrect: true },
      { id: 'B', title: '92', subtitle: 'Scores were not updated', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Underscore is not allowed as a parameter placeholder', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Bob was removed from the map during mapValues', isCorrect: false }
    ],
    hint: 'An underscore (_) tells the Kotlin compiler that a lambda parameter is intentionally unused.',
    explanation: {
      title: 'Unused Parameter Placeholders with Underscore (_)',
      text: 'If a lambda receives multiple arguments (such as a Map.Entry with key and value) but only needs one, you can replace the unused parameter with an underscore (_). Here, the name key is omitted, and only the score is modified.',
      highlights: ['_ ignores unused parameters', 'mapValues transforms values while keeping keys intact', 'Clean and readable lambdas']
    }
  },

  // =========================================================================
  // LESSON 3: Higher-Order Collection Transforms (5 questions)
  // =========================================================================
  {
    id: 'w6-l3-c1',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'map-filter-reduce',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Transforms • Chaining filter & map',
    skill: 'transforms',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the output of this chained filter and map pipeline?',
    codeFileName: 'ChainedPipeline.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val numbers = listOf(1, 2, 3, 4, 5, 6)',
      'val result = numbers',
      '    .filter { it % 2 != 0 }',
      '    .map { it * 10 }',
      'println(result)'
    ],
    options: [
      { id: 'A', title: '[10, 30, 50]', subtitle: 'Filters odd numbers (1, 3, 5) then multiplies each by 10', isCorrect: true },
      { id: 'B', title: '[20, 40, 60]', subtitle: 'Filters even numbers rather than odd numbers', isCorrect: false },
      { id: 'C', title: '[10, 20, 30, 40, 50, 60]', subtitle: 'The filter step was not skipped', isCorrect: false },
      { id: 'D', title: '90', subtitle: 'Chained operations produce a transformed List, not a scalar sum', isCorrect: false }
    ],
    hint: 'it % 2 != 0 selects odd numbers. map { it * 10 } transforms each selected element.',
    explanation: {
      title: 'Chaining Collections Transforms',
      text: 'filter evaluates each item against a predicate (keeping only 1, 3, and 5). Next, map executes the transformation lambda on each retained element, producing the new list [10, 30, 50].',
      highlights: ['filter keeps matching items', 'map transforms elements', 'Chained pipeline execution']
    }
  },
  {
    id: 'w6-l3-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'map-filter-reduce',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Transforms • reduce vs fold',
    skill: 'transforms',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the key difference between reduce() and fold() in Kotlin?',
    codeFileName: 'FoldVsReduce.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val numbers = listOf(1, 2, 3)',
      'val r = numbers.reduce { acc, x -> acc + x }',
      'val f = numbers.fold(10) { acc, x -> acc + x }'
    ],
    options: [
      { id: 'A', title: 'fold() takes an explicit initial accumulator value, while reduce() starts with the collection\'s first element', subtitle: 'fold(10) starts acc at 10 (yielding 16); reduce() starts with 1 (yielding 6) and crashes on empty collections', isCorrect: true },
      { id: 'B', title: 'reduce() works on lists; fold() only works on sets and maps', subtitle: 'Both are generic collection extension functions', isCorrect: false },
      { id: 'C', title: 'reduce() is lazy while fold() is eager', subtitle: 'Both evaluate eagerly when invoked on standard Iterables', isCorrect: false },
      { id: 'D', title: 'fold() cannot change the accumulator type from the element type', subtitle: 'fold allows accumulating into an entirely different type (e.g. List<Int> folded into a String)', isCorrect: false }
    ],
    hint: 'Look at the arguments: fold(10) specifies an initial value 10, whereas reduce() has no initial parameter.',
    explanation: {
      title: 'fold vs. reduce Accumulation',
      text: 'reduce uses the first element as the initial accumulator, throwing an UnsupportedOperationException if the collection is empty. fold accepts an explicit initial value (which can even be a different type than the collection elements) and safely returns this initial value if the collection is empty.',
      highlights: ['fold accepts initial accumulator', 'reduce throws on empty collection', 'fold accumulator can be a different type']
    }
  },
  {
    id: 'w6-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-6',
    lessonId: 'map-filter-reduce',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Transforms • filterNotNull',
    skill: 'transforms',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the method call to strip nulls and convert List<String?> into a non-null List<String>.',
    codeFileName: 'FilterNulls.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val rawData: List<String?> = listOf("Alpha", null, "Gamma", null)',
      'val validData: List<String> = rawData.____()',
      'println(validData.size)'
    ],
    options: [
      { id: 'A', title: 'filterNotNull', subtitle: 'Filters out null elements and automatically casts the list to List<T> (non-null)', isCorrect: true },
      { id: 'B', title: 'removeNulls', subtitle: 'removeNulls() is not a standard library function in Kotlin', isCorrect: false },
      { id: 'C', title: 'notNull', subtitle: 'notNull is not a collection filtering function', isCorrect: false },
      { id: 'D', title: 'clean', subtitle: 'clean() is not a built-in method', isCorrect: false }
    ],
    hint: 'Kotlin\'s standard library provides a dedicated function named filterNotNull() that filters and smart-casts collection types.',
    explanation: {
      title: 'Filtering Nulls with filterNotNull()',
      text: 'filterNotNull() removes all null elements from a collection of nullable items (List<T?>) and returns a clean, non-null List<T>. The compiler recognizes the type change, eliminating nullability checks downstream.',
      highlights: ['filterNotNull() strips nulls', 'Changes type from List<T?> to List<T>', 'Built-in null safety enhancement']
    }
  },
  {
    id: 'w6-l3-c4',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'map-filter-reduce',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Transforms • fold with Initial String',
    skill: 'transforms',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the output of this fold operation accumulating integers into a formatted string?',
    codeFileName: 'StringFold.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val digits = listOf(1, 2, 3)',
      'val result = digits.fold("CODE:") { acc, n -> "$acc-$n" }',
      'println(result)'
    ],
    options: [
      { id: 'A', title: 'CODE:-1-2-3', subtitle: 'Starts with "CODE:" and appends each integer separated by a dash', isCorrect: true },
      { id: 'B', title: 'CODE: 6', subtitle: 'fold does not sum the integers when the lambda performs string concatenation', isCorrect: false },
      { id: 'C', title: '1-2-3', subtitle: 'The initial accumulator "CODE:" is not dropped', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'fold can accumulate into a different type (String) than the elements (Int)', isCorrect: false }
    ],
    hint: 'The initial accumulator is "CODE:". For each digit n, it evaluates "$acc-$n".',
    explanation: {
      title: 'Fold Across Heterogeneous Types',
      text: 'fold(initial) allows accumulating elements of type T into an accumulator of an entirely different type R. Here, List<Int> is folded into a String starting with "CODE:", sequentially appending "-1", "-2", and "-3".',
      highlights: ['fold can change types (Int to String)', 'Sequential accumulation', 'Initial value prepended']
    }
  },
  {
    id: 'w6-l3-c5',
    challengeType: 'bug-fix',
    worldId: 'world-6',
    lessonId: 'map-filter-reduce',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Transforms • reduce on Empty Collection',
    skill: 'transforms',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 crashes at runtime when items is empty. Which alternative method safely handles empty collections by providing a default initial value?',
    codeFileName: 'SafeSum.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val items: List<Int> = emptyList()',
      'val total = items.reduce { acc, x -> acc + x }',
      'println(total)'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'val total = items.fold(0) { acc, x -> acc + x }', subtitle: 'fold(0) starts with 0 and safely returns 0 if the list is empty', isCorrect: true },
      { id: 'B', title: 'val total = items.reduceOrNull() ?: 0', subtitle: 'reduceOrNull exists, but does not take a binary operation without arguments', isCorrect: false },
      { id: 'C', title: 'val total = items.reduce(0) { acc, x -> acc + x }', subtitle: 'reduce does not accept an initial value argument', isCorrect: false },
      { id: 'D', title: 'val total = items.sumEmpty()', subtitle: 'sumEmpty is not a valid Kotlin standard library function', isCorrect: false }
    ],
    hint: 'Use fold(0) or sum() to provide a safe default when reducing an empty collection.',
    explanation: {
      title: 'Safe Accumulation on Empty Collections',
      text: 'Calling reduce() on an empty collection throws java.lang.UnsupportedOperationException: Empty collection can\'t be reduced. Using fold(initial) avoids this risk by returning the initial value (0) directly when the collection contains no items.',
      highlights: ['reduce throws on empty collections', 'fold(0) provides safe initial value', 'Robust functional design']
    }
  },

  // =========================================================================
  // LESSON 4: Advanced Operations: flatMap, groupBy, partition, associateBy (5 questions)
  // =========================================================================
  {
    id: 'w6-l4-c1',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'collection-operations',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Operations • flatMap vs map',
    skill: 'collection_ops',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when flatMap flattens nested lists of integers?',
    codeFileName: 'FlatMapDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val matrix = listOf(listOf(1, 2), listOf(3, 4))',
      'val flattened = matrix.flatMap { it }',
      'println(flattened)'
    ],
    options: [
      { id: 'A', title: '[1, 2, 3, 4]', subtitle: 'flatMap merges the child lists into a single continuous list', isCorrect: true },
      { id: 'B', title: '[[1, 2], [3, 4]]', subtitle: 'This would be the output of matrix.map { it } without flattening', isCorrect: false },
      { id: 'C', title: '[10]', subtitle: 'flatMap does not sum elements', isCorrect: false },
      { id: 'D', title: '4', subtitle: 'flatMap returns a List, not the total count', isCorrect: false }
    ],
    hint: 'flatMap transforms each element into an Iterable and concatenates the results into a single collection.',
    explanation: {
      title: 'Flattening with flatMap',
      text: 'flatMap combines two steps in one: it transforms each item into a collection (here the identity it, returning each child list) and then concatenates all resulting collections into a single, flat list: [1, 2, 3, 4].',
      highlights: ['flatMap transforms and flattens', 'Merges nested collections', 'Returns single List<T>']
    }
  },
  {
    id: 'w6-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'collection-operations',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Operations • groupBy',
    skill: 'collection_ops',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the resulting structure when words are grouped by their first letter?',
    codeFileName: 'GroupWords.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val words = listOf("apple", "banana", "apricot")',
      'val grouped = words.groupBy { it.first() }',
      'println(grouped[\'a\'])'
    ],
    options: [
      { id: 'A', title: '[apple, apricot]', subtitle: 'groupBy produces a Map<Char, List<String>> containing all words starting with \'a\'', isCorrect: true },
      { id: 'B', title: 'apple', subtitle: 'groupBy collects all matching elements into a list, not just the first', isCorrect: false },
      { id: 'C', title: '[apple, banana, apricot]', subtitle: 'All elements were not grouped under \'a\'', isCorrect: false },
      { id: 'D', title: '2', subtitle: 'The map value is the list itself, not its size', isCorrect: false }
    ],
    hint: 'groupBy returns a Map<Key, List<Value>> where the value is a list of all elements matching the key selector.',
    explanation: {
      title: 'Grouping Elements with groupBy',
      text: 'groupBy takes a selector function and returns a Map<K, List<T>>. For key \'a\', both "apple" and "apricot" match, so grouped[\'a\'] yields [apple, apricot].',
      highlights: ['groupBy returns Map<K, List<T>>', 'Collects all matching elements into lists', 'Preserves encounter order']
    }
  },
  {
    id: 'w6-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-6',
    lessonId: 'collection-operations',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Operations • partition',
    skill: 'collection_ops',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the call to split the numbers into two lists: those matching the condition and those that do not.',
    codeFileName: 'PartitionNumbers.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val scores = listOf(45, 82, 90, 30)',
      'val (passed, failed) = scores.____ { it >= 50 }',
      'println("Passed: $passed, Failed: $failed")'
    ],
    options: [
      { id: 'A', title: 'partition', subtitle: 'Splits the collection into a Pair<List<T>, List<T>> based on a predicate', isCorrect: true },
      { id: 'B', title: 'split', subtitle: 'split is for strings, not collections', isCorrect: false },
      { id: 'C', title: 'divide', subtitle: 'divide is not a collection operation in Kotlin', isCorrect: false },
      { id: 'D', title: 'separate', subtitle: 'separate is not part of the standard library', isCorrect: false }
    ],
    hint: 'The partition method splits a collection into a pair of lists: first where the predicate is true, second where it is false.',
    explanation: {
      title: 'Splitting Collections with partition',
      text: 'partition { predicate } evaluates each element, returning a Pair(matchingList, nonMatchingList). Destructuring declarations like val (passed, failed) allow capturing both lists simultaneously in a single pass.',
      highlights: ['partition returns Pair<List<T>, List<T>>', 'First component matches predicate', 'Second component fails predicate']
    }
  },
  {
    id: 'w6-l4-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'collection-operations',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Operations • associateBy vs groupBy',
    skill: 'collection_ops',
    difficulty: 2,
    xpReward: 25,
    question: 'What happens if you use associateBy { keySelector } on a collection with duplicate keys?',
    codeFileName: 'AssociateKeys.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class User(val id: Int, val name: String)',
      'val users = listOf(User(1, "Alice"), User(1, "Aaron"))',
      'val userMap = users.associateBy { it.id }',
      'println(userMap[1]?.name)'
    ],
    options: [
      { id: 'A', title: 'Aaron', subtitle: 'associateBy produces Map<K, T>; if keys collide, the last encountered element overwrites earlier ones', isCorrect: true },
      { id: 'B', title: 'Alice', subtitle: 'The earlier element is not kept; the later element replaces it', isCorrect: false },
      { id: 'C', title: '[Alice, Aaron]', subtitle: 'This would be the behavior of groupBy, not associateBy', isCorrect: false },
      { id: 'D', title: 'DuplicateKeyException', subtitle: 'associateBy does not throw on key collisions', isCorrect: false }
    ],
    hint: 'associateBy creates a 1-to-1 Map<Key, Element>. If two elements produce the same key, which one wins?',
    explanation: {
      title: 'associateBy Key Collisions',
      text: 'associateBy creates a Map<K, V> where each key points to a single element. If multiple elements have identical keys, the LAST element encountered overwrites any previous entry. If you need all elements preserved, use groupBy instead.',
      highlights: ['associateBy produces Map<K, T>', 'Last entry wins on collisions', 'Use groupBy to preserve all items']
    }
  },
  {
    id: 'w6-l4-c5',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'collection-operations',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Operations • zip Operation',
    skill: 'collection_ops',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the output when zipping two lists of unequal length?',
    codeFileName: 'ZipPairs.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val letters = listOf("A", "B", "C", "D")',
      'val numbers = listOf(1, 2)',
      'val zipped = letters.zip(numbers)',
      'println(zipped)'
    ],
    options: [
      { id: 'A', title: '[(A, 1), (B, 2)]', subtitle: 'zip pairs corresponding elements up to the length of the shorter collection', isCorrect: true },
      { id: 'B', title: '[(A, 1), (B, 2), (C, null), (D, null)]', subtitle: 'zip does not pad missing elements with nulls', isCorrect: false },
      { id: 'C', title: 'IndexOutOfBoundsException', subtitle: 'zip handles uneven sizes gracefully without throwing', isCorrect: false },
      { id: 'D', title: '[(A, 1), (B, 2), (C, 1), (D, 2)]', subtitle: 'zip does not loop the shorter collection', isCorrect: false }
    ],
    hint: 'zip stops as soon as the shortest collection runs out of elements.',
    explanation: {
      title: 'Pairing Collections with zip',
      text: 'zip merges two collections into a list of Pairs. The size of the resulting collection is strictly determined by the shorter collection, cleanly discarding extra elements from the longer list.',
      highlights: ['zip creates List<Pair<T, R>>', 'Bounded by the shorter collection', 'No index exceptions on uneven sizes']
    }
  },

  // =========================================================================
  // LESSON 5: Lazy Evaluation & Sequences (5 questions)
  // =========================================================================
  {
    id: 'w6-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'sequences-lazy',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Sequences • Lazy vs Eager Evaluation',
    skill: 'sequences',
    difficulty: 1,
    xpReward: 20,
    question: 'What fundamentally differentiates a Sequence<T> from an Iterable<T> in Kotlin?',
    codeFileName: 'SequenceVsIterable.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val seq = listOf(1, 2, 3).asSequence()',
      '    .filter { it > 1 }',
      '    .map { it * 2 }'
    ],
    options: [
      { id: 'A', title: 'Sequences evaluate lazily on an element-by-element basis without intermediate list allocations', subtitle: 'Intermediate operations are deferred until a terminal operation (e.g. toList, first) is called', isCorrect: true },
      { id: 'B', title: 'Sequences are mutable while Iterables are always read-only', subtitle: 'Sequences represent streams of data, not mutable collections', isCorrect: false },
      { id: 'C', title: 'Sequences can only hold primitives like Int and Long', subtitle: 'Sequences are fully generic (Sequence<T>)', isCorrect: false },
      { id: 'D', title: 'Sequences run automatically on background threads via coroutines', subtitle: 'Sequences are synchronous and single-threaded by default', isCorrect: false }
    ],
    hint: 'Iterables create intermediate list buffers for every step; Sequences evaluate lazily element-by-element when a terminal operation asks for them.',
    explanation: {
      title: 'Lazy Evaluation in Sequences',
      text: 'Standard collection operations on Iterable are eager: each step (filter, map) creates an intermediate List. In contrast, Sequence performs operations lazily: elements pass through the entire chain one-by-one only when triggered by a terminal operation (like .toList() or .count()).',
      highlights: ['Lazy element-by-element pipeline', 'No intermediate list allocations', 'Requires terminal operation to execute']
    }
  },
  {
    id: 'w6-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'sequences-lazy',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Sequences • Terminal Operations & Short-Circuiting',
    skill: 'sequences',
    difficulty: 2,
    xpReward: 25,
    question: 'How many times is the filter predicate evaluated when using a Sequence with .first()?',
    codeFileName: 'LazyEvaluationCount.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var evaluations = 0',
      'val result = sequenceOf(10, 25, 30, 40)',
      '    .filter { evaluations++; it > 20 }',
      '    .first()',
      'println("Result: $result, Count: $evaluations")'
    ],
    options: [
      { id: 'A', title: 'Result: 25, Count: 2', subtitle: 'Sequence tests 10 (false), then 25 (true), and immediately short-circuits without testing 30 or 40', isCorrect: true },
      { id: 'B', title: 'Result: 25, Count: 4', subtitle: 'An eager Iterable would evaluate all 4 items; lazy sequences short-circuit', isCorrect: false },
      { id: 'C', title: 'Result: 10, Count: 1', subtitle: '10 does not satisfy it > 20', isCorrect: false },
      { id: 'D', title: 'Result: null, Count: 0', subtitle: 'The terminal operation first() forces evaluation', isCorrect: false }
    ],
    hint: 'A Sequence processes elements one at a time. As soon as first() finds a matching element, execution stops immediately.',
    explanation: {
      title: 'Short-Circuit Evaluation with Sequences',
      text: 'Because Sequences are lazy, elements flow through the pipeline one at a time. The filter checks 10 (fails), then checks 25 (succeeds). Because first() only needs one element, execution short-circuits immediately. The evaluations counter is 2, not 4.',
      highlights: ['Short-circuiting terminal operations', 'Lazy step-by-step traversal', 'Avoids unnecessary computations']
    }
  },
  {
    id: 'w6-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-6',
    lessonId: 'sequences-lazy',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Sequences • asSequence Conversion',
    skill: 'sequences',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the code to convert a large Iterable into a lazy Sequence before transforming.',
    codeFileName: 'OptimizeList.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val largeList = (1..100_000).toList()',
      'val topThree = largeList.____()',
      '    .filter { it % 7 == 0 }',
      '    .map { it * it }',
      '    .take(3)',
      '    .toList()'
    ],
    options: [
      { id: 'A', title: 'asSequence', subtitle: 'Converts any Iterable into a lazy Sequence', isCorrect: true },
      { id: 'B', title: 'toSequence', subtitle: 'toSequence is not the standard extension method name', isCorrect: false },
      { id: 'C', title: 'makeLazy', subtitle: 'makeLazy is not a Kotlin standard library method', isCorrect: false },
      { id: 'D', title: 'stream', subtitle: 'stream() is Java 8 Streams API, whereas asSequence() is Kotlin idiomatic', isCorrect: false }
    ],
    hint: 'Use the standard extension function .asSequence() on any collection to switch to lazy evaluation.',
    explanation: {
      title: 'The asSequence() Extension',
      text: 'Calling .asSequence() on a List or Set wraps the collection in a Sequence. This prevents allocating intermediate lists for the filter, map, and take stages, finally materializing only the requested 3 elements via .toList().',
      highlights: ['asSequence() converts Iterable to Sequence', 'Prevents massive memory overhead', 'Converts back with toList()']
    }
  },
  {
    id: 'w6-l5-c4',
    challengeType: 'bug-fix',
    worldId: 'world-6',
    lessonId: 'sequences-lazy',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Sequences • Infinite Sequences & take',
    skill: 'sequences',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 hangs indefinitely because generateSequence is infinite! How do you safely limit it to the first 4 elements?',
    codeFileName: 'InfiniteSequence.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val powers = generateSequence(1) { it * 2 }',
      'val result = powers.toList()',
      'println(result)'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'val result = powers.take(4).toList()', subtitle: 'take(4) truncates the infinite sequence to 4 items before materializing it', isCorrect: true },
      { id: 'B', title: 'val result = powers.limit(4).toList()', subtitle: 'limit() is a Java Stream method, not a Kotlin Sequence extension', isCorrect: false },
      { id: 'C', title: 'val result = powers.first(4).toList()', subtitle: 'first() takes a predicate or returns a single item, not a sub-sequence', isCorrect: false },
      { id: 'D', title: 'val result = powers.stopAt(4).toList()', subtitle: 'stopAt is not a valid Kotlin standard library function', isCorrect: false }
    ],
    hint: 'Use the .take(n) intermediate operation to bound an infinite sequence before calling terminal operations.',
    explanation: {
      title: 'Bounding Infinite Sequences with take()',
      text: 'generateSequence(seed) { next } creates an unbounded, infinite stream. Invoking a terminal operation like toList() directly on an infinite sequence causes an infinite loop and OutOfMemoryError. You must truncate it using .take(count).',
      highlights: ['generateSequence creates infinite streams', 'take(n) bounds the sequence', 'Must bound before eager terminal calls']
    }
  },
  {
    id: 'w6-l5-c5',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'sequences-lazy',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Sequences • generateSequence Termination',
    skill: 'sequences',
    difficulty: 2,
    xpReward: 25,
    question: 'What elements are produced when the generator lambda returns null to signal termination?',
    codeFileName: 'TerminatingSequence.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val countdown = generateSequence(3) { if (it > 1) it - 1 else null }',
      'println(countdown.toList())'
    ],
    options: [
      { id: 'A', title: '[3, 2, 1]', subtitle: 'The sequence begins with 3, generates 2 and 1, and terminates when the lambda returns null', isCorrect: true },
      { id: 'B', title: '[3, 2, 1, 0]', subtitle: 'The lambda returns null when it is 1, so 0 is never emitted', isCorrect: false },
      { id: 'C', title: '[3, 2]', subtitle: '1 is emitted before the subsequent step yields null', isCorrect: false },
      { id: 'D', title: 'NullPointerException', subtitle: 'Returning null safely terminates generateSequence without throwing', isCorrect: false }
    ],
    hint: 'Returning null from generateSequence\'s nextFunction signals the end of the sequence.',
    explanation: {
      title: 'Terminating Sequences with null',
      text: 'generateSequence starts with the seed (3). When it > 1, it emits it - 1 (giving 2, then 1). When it is 1, the condition fails and returns null. Kotlin treats null as the termination signal, concluding the sequence at [3, 2, 1].',
      highlights: ['Returning null terminates generateSequence', 'Seed is included as first element', 'Graceful stream termination']
    }
  },

  // =========================================================================
  // LESSON 6: Scope Functions (let, apply, run, also, with) (5 questions)
  // =========================================================================
  {
    id: 'w6-l6-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'scope-functions',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Scope Functions • apply for Configuration',
    skill: 'scope_functions',
    difficulty: 1,
    xpReward: 20,
    question: 'Which scope function is specifically designed to configure object properties and returns the receiver object itself (this)?',
    codeFileName: 'ConfigScope.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val alert = Dialog().____ {',
      '    title = "Notice"',
      '    isCancelable = false',
      '}'
    ],
    options: [
      { id: 'A', title: 'apply', subtitle: 'Executes block with this as context receiver and returns the object itself', isCorrect: true },
      { id: 'B', title: 'let', subtitle: 'let passes object as it and returns the lambda result, not the object', isCorrect: false },
      { id: 'C', title: 'run', subtitle: 'run returns the lambda result rather than the receiver object', isCorrect: false },
      { id: 'D', title: 'with', subtitle: 'with is a non-extension function requiring with(obj) { ... }', isCorrect: false }
    ],
    hint: 'Use "apply" for object configuration: inside the block you have "this", and it returns the configured object.',
    explanation: {
      title: 'Object Initialization with apply',
      text: 'The apply function executes a lambda on the receiver object where properties can be accessed directly as this. Its return value is the receiver object itself, making it ideal for object creation and property configuration pipelines.',
      highlights: ['apply uses this as context', 'Returns the receiver object', 'Standard for builders and configuration']
    }
  },
  {
    id: 'w6-l6-c2',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'scope-functions',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Scope Functions • Safe Call with let',
    skill: 'scope_functions',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when safe call ?.let is invoked on a null reference?',
    codeFileName: 'SafeLet.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val rawInput: String? = null',
      'val length = rawInput?.let { it.length } ?: -1',
      'println(length)'
    ],
    options: [
      { id: 'A', title: '-1', subtitle: 'Because rawInput is null, the let block is skipped entirely, triggering the Elvis fallback ?: -1', isCorrect: true },
      { id: 'B', title: '0', subtitle: 'Null strings do not default to length 0', isCorrect: false },
      { id: 'C', title: 'NullPointerException', subtitle: 'The safe call operator ?. prevents null pointer exceptions', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'The Elvis operator ?: catches the null result and returns -1', isCorrect: false }
    ],
    hint: 'If the reference is null, ?. skips the let block and produces null, which triggers the Elvis operator ?:.',
    explanation: {
      title: 'Safe Scoping with ?.let',
      text: 'Combining ?. with let guarantees that the lambda block executes only when the receiver is non-null. Since rawInput is null, the block is skipped and evaluates to null; the Elvis operator ?: then supplies -1.',
      highlights: ['?.let executes only if non-null', 'it is smart-cast to non-null inside the block', 'Elvis ?: provides fallback']
    }
  },
  {
    id: 'w6-l6-c3',
    challengeType: 'code-completion',
    worldId: 'world-6',
    lessonId: 'scope-functions',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Scope Functions • also for Side Effects',
    skill: 'scope_functions',
    difficulty: 2,
    xpReward: 25,
    question: 'Which scope function is best suited for executing secondary side-effects (like logging) while passing the original object along a call chain?',
    codeFileName: 'SideEffectChain.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun makeUser(name: String) = User(name)',
      '    .____ { println("Created user: ${it.name}") }',
      '    .apply { role = "GUEST" }'
    ],
    options: [
      { id: 'A', title: 'also', subtitle: 'also provides the context as it and returns the original object, perfect for side effects', isCorrect: true },
      { id: 'B', title: 'run', subtitle: 'run returns the lambda result, which would be Unit here, breaking the chain', isCorrect: false },
      { id: 'C', title: 'let', subtitle: 'let returns the result of the println (Unit), which cannot be chained with .apply', isCorrect: false },
      { id: 'D', title: 'log', subtitle: 'log is not a built-in Kotlin scope function', isCorrect: false }
    ],
    hint: 'Use "also" when you say: "and ALSO do this side effect with the object (it), then continue with the object".',
    explanation: {
      title: 'Side Effects with also',
      text: 'also provides the context object as an argument (it) and returns the context object itself. This makes it ideal for performing side effects (logging, debugging, metric reporting) without altering the chain.',
      highlights: ['also accesses object via it', 'Returns context object itself', 'Designed for side effects and logging']
    }
  },
  {
    id: 'w6-l6-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-6',
    lessonId: 'scope-functions',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Scope Functions • Scope Matrix Comparison',
    skill: 'scope_functions',
    difficulty: 2,
    xpReward: 25,
    question: 'Which comparison correctly contrasts run and let regarding context reference and return value?',
    codeFileName: 'ScopeMatrix.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val a = "kotlin".run { length }',
      'val b = "kotlin".let { it.length }'
    ],
    options: [
      { id: 'A', title: 'Both return the lambda result, but run accesses the object via this, while let accesses it via it', subtitle: 'run is an extension with this receiver; let passes the receiver as it argument', isCorrect: true },
      { id: 'B', title: 'run returns this, while let returns the lambda result', subtitle: 'run returns the lambda result; apply returns this', isCorrect: false },
      { id: 'C', title: 'let can only be called on nullable types; run only on non-nullable', subtitle: 'Both can be called on any type using safe calls', isCorrect: false },
      { id: 'D', title: 'run is asynchronous while let is synchronous', subtitle: 'All standard Kotlin scope functions are inline and synchronous', isCorrect: false }
    ],
    hint: 'Look at how length is accessed: run accesses "length" directly on "this", while let uses "it.length". Both assign the Int result.',
    explanation: {
      title: 'The Scope Function Decision Matrix',
      text: 'Both run and let evaluate a block and return the lambda\'s final expression result. The difference lies in the context object: run provides this (receiver), whereas let provides it (parameter).',
      highlights: ['run uses this as receiver', 'let uses it as parameter', 'Both return lambda result']
    }
  },
  {
    id: 'w6-l6-c5',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'scope-functions',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'Scope Functions • Non-Extension with',
    skill: 'scope_functions',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this usage of the non-extension with() scope function?',
    codeFileName: 'WithScope.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val sb = StringBuilder("Code") ',
      'val result = with(sb) {',
      '    append("Do")',
      '    toString()',
      '}',
      'println(result)'
    ],
    options: [
      { id: 'A', title: 'CodeDo', subtitle: 'with passes sb as this receiver, appends "Do", and returns the lambda result toString()', isCorrect: true },
      { id: 'B', title: 'Code', subtitle: 'The append modification is not lost', isCorrect: false },
      { id: 'C', title: 'Do', subtitle: 'The initial string "Code" in StringBuilder is retained', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'with is a built-in top-level function taking a receiver and lambda', isCorrect: false }
    ],
    hint: 'with(receiver) { ... } runs the block with the receiver as this and returns the last statement.',
    explanation: {
      title: 'Scoping with the with() Function',
      text: 'with(obj) { ... } is a non-extension function used to call multiple methods on an object without repeating its name. Inside the block, sb is this, so append("Do") mutates it and toString() returns "CodeDo".',
      highlights: ['with(receiver) takes object as first argument', 'Operates on this receiver', 'Returns lambda result']
    }
  },

  // =========================================================================
  // LESSON 7: WORLD BOSS: Stream Weaver (1 question)
  // =========================================================================
  {
    id: 'w6-l7-boss',
    challengeType: 'output-prediction',
    worldId: 'world-6',
    lessonId: 'collections-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Collections & Functional Kotlin',
    topicTag: 'BOSS FIGHT • Analytics Pipeline Stream Weaver',
    skill: 'collections-boss',
    difficulty: 3,
    xpReward: 50,
    question: 'WORLD BOSS: Stream Weaver! Trace this e-commerce event stream analytics pipeline. What does it print?',
    codeFileName: 'StreamWeaverBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class Order(val id: String, val category: String, val amount: Int, val isApproved: Boolean)',
      '',
      'val orders = listOf(',
      '    Order("O1", "Books", 25, true),',
      '    Order("O2", "Electronics", 150, false),',
      '    Order("O3", "Books", 35, true),',
      '    Order("O4", "Electronics", 200, true),',
      '    Order("O5", "Books", 10, false)',
      ')',
      '',
      'val summary = orders',
      '    .asSequence()',
      '    .filter { it.isApproved }',
      '    .groupBy { it.category }',
      '    .mapValues { (_, orderList) -> orderList.sumOf { it.amount } }',
      '',
      'println("${summary["Books"]}:${summary["Electronics"]}")'
    ],
    options: [
      { id: 'A', title: '60:200', subtitle: 'Books approved: O1 (25) + O3 (35) = 60. Electronics approved: O4 (200) = 200. Rejected orders O2 & O5 are excluded.', isCorrect: true },
      { id: 'B', title: '70:350', subtitle: 'All orders included without checking isApproved', isCorrect: false },
      { id: 'C', title: '25:150', subtitle: 'Only first items processed', isCorrect: false },
      { id: 'D', title: 'Books:Electronics', subtitle: 'Prints the category keys instead of aggregated sum values', isCorrect: false }
    ],
    hint: 'Step 1: Filter to only approved orders. Step 2: Group by category. Step 3: Sum the amounts for each category.',
    explanation: {
      title: 'WORLD BOSS DEFEATED: Stream Weaver Mastered!',
      text: 'Step 1: filter { it.isApproved } leaves O1 ($25, Books), O3 ($35, Books), and O4 ($200, Electronics). O2 and O5 are dropped. Step 2: groupBy { it.category } separates them into "Books" -> [O1, O3] and "Electronics" -> [O4]. Step 3: mapValues sums each category\'s amounts: Books = 25 + 35 = 60, Electronics = 200. Output is "60:200".',
      highlights: ['Stream filtering & grouping', 'mapValues aggregation with sumOf', 'Enterprise event processing pipeline']
    }
  }
];
