import { LessonQuestion } from '../../types';

export const WORLD_7_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Generic Functions & Classes (5 questions)
  // =========================================================================
  {
    id: 'w7-l1-c1',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'generics-basics',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Generics • Generic Functions',
    skill: 'generics',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by this generic function when invoked with both Int and String arguments?',
    codeFileName: 'GenericFunction.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T> wrapInList(item: T): List<T> = listOf(item)',
      'val numList = wrapInList(42)',
      'val strList = wrapInList("Kotlin")',
      'println("${numList.first()} & ${strList.first()}")'
    ],
    options: [
      { id: 'A', title: '42 & Kotlin', subtitle: 'The compiler infers T as Int for the first call and String for the second', isCorrect: true },
      { id: 'B', title: 'Any & Any', subtitle: 'Generics preserve their specific inferred types rather than defaulting to Any', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'T must be explicitly specified at call site', isCorrect: false },
      { id: 'D', title: '42 & null', subtitle: 'Both values are retained cleanly in their respective lists', isCorrect: false }
    ],
    hint: 'Type parameters placed before the function name (<T>) allow the compiler to infer T from arguments.',
    explanation: {
      title: 'Generic Functions in Kotlin',
      text: 'Generic type parameters in functions are declared between the fun keyword and the function name (fun <T>). The Kotlin compiler automatically infers T from the argument passed to item, producing List<Int> and List<String> respectively without requiring explicit type arguments at call sites.',
      highlights: ['fun <T> declares type parameter', 'Automatic type argument inference', 'Type safety without runtime overhead']
    }
  },
  {
    id: 'w7-l1-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'generics-basics',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Generics • Generic Classes',
    skill: 'generics',
    difficulty: 1,
    xpReward: 20,
    question: 'Where is the type parameter declared when defining a generic class in Kotlin?',
    codeFileName: 'GenericClassDecl.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Container<T>(val item: T) {',
      '    fun get(): T = item',
      '}'
    ],
    options: [
      { id: 'A', title: 'Directly after the class name: class Container<T>', subtitle: 'Type parameters are placed inside angle brackets immediately following the class name', isCorrect: true },
      { id: 'B', title: 'Inside the constructor parentheses: class Container(val item: <T>)', subtitle: 'Parentheses define parameters, not generic type definitions', isCorrect: false },
      { id: 'C', title: 'Before the class keyword: <T> class Container', subtitle: 'This syntax is not valid Kotlin', isCorrect: false },
      { id: 'D', title: 'Inside the class body only: class Container { type T }', subtitle: 'Generics cannot be declared as body members', isCorrect: false }
    ],
    hint: 'Kotlin follows standard angle-bracket syntax placed immediately after the class identifier.',
    explanation: {
      title: 'Generic Class Declaration',
      text: 'To declare a generic class in Kotlin, place one or more type parameters inside angle brackets right after the class identifier (e.g., class Box<T>(val value: T)). The type T is then available throughout constructors, properties, and member functions.',
      highlights: ['class Name<T> declaration', 'Available across properties and methods', 'Enables type-safe reusable abstractions']
    }
  },
  {
    id: 'w7-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-7',
    lessonId: 'generics-basics',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Generics • Multiple Type Parameters',
    skill: 'generics',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the declaration of PairHolder to support two distinct generic types K and V.',
    codeFileName: 'PairHolder.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class PairHolder<____>(val key: K, val value: V) {',
      '    fun format(): String = "$key: $value"',
      '}'
    ],
    options: [
      { id: 'A', title: 'K, V', subtitle: 'Multiple type parameters are separated by commas inside the angle brackets', isCorrect: true },
      { id: 'B', title: 'K; V', subtitle: 'Semicolons are not used in type parameter lists', isCorrect: false },
      { id: 'C', title: 'K and V', subtitle: 'and is not a valid separator for generic type parameters', isCorrect: false },
      { id: 'D', title: 'K | V', subtitle: 'Union type syntax is not used for generic parameter declarations', isCorrect: false }
    ],
    hint: 'Separate multiple generic type parameters with a comma inside <...>.',
    explanation: {
      title: 'Multiple Generic Type Parameters',
      text: 'Classes and functions can declare multiple type parameters by listing them separated by commas: class Map<K, V>. Each parameter can represent an independent type.',
      highlights: ['Comma-separated type parameters', '<K, V> allows independent types', 'Full type checking on each parameter']
    }
  },
  {
    id: 'w7-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-7',
    lessonId: 'generics-basics',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Generics • Unconstrained Member Access',
    skill: 'generics',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 causes an unresolved reference error for .length because T is unconstrained. How should the function header be fixed?',
    codeFileName: 'PrintLength.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T> printLength(item: T) {',
      '    println(item.length)',
      '}'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'fun <T : CharSequence> printLength(item: T) {', subtitle: 'Constraining T to CharSequence guarantees the length property exists', isCorrect: true },
      { id: 'B', title: 'fun <T : Any> printLength(item: T) {', subtitle: 'Any does not declare a length property', isCorrect: false },
      { id: 'C', title: 'fun <T with length> printLength(item: T) {', subtitle: 'with length is not valid Kotlin syntax', isCorrect: false },
      { id: 'D', title: 'fun <T> printLength(item: T) as String {', subtitle: 'as String cannot be applied to function headers', isCorrect: false }
    ],
    hint: 'Without an upper bound, T defaults to Any?, which has no .length. Constrain T using a colon (T : CharSequence).',
    explanation: {
      title: 'Type Bounds and Member Access',
      text: 'In Kotlin, an unconstrained type parameter T is implicitly bounded by Any?, which only provides equals(), hashCode(), and toString(). To access members like .length, you must specify an upper bound using a colon: <T : CharSequence>.',
      highlights: ['Default bound is Any?', 'Upper bounds enable member access', '<T : UpperBound> syntax']
    }
  },
  {
    id: 'w7-l1-c5',
    challengeType: 'code-ordering',
    worldId: 'world-7',
    lessonId: 'generics-basics',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Generics • Generic Cache Assembly',
    skill: 'generics',
    difficulty: 2,
    xpReward: 25,
    question: 'Arrange the code statements in proper order to declare a generic Cache class, instantiate it, store a value, and read it back.',
    codeFileName: 'CacheLifecycle.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Target: Define class Cache<T>, create instance, put, and get'
    ],
    codeOrderingItems: [
      { id: 'order-1', code: 'class Cache<T> { private var data: T? = null; fun put(v: T) { data = v }; fun get(): T? = data }' },
      { id: 'order-2', code: 'val cache = Cache<String>()' },
      { id: 'order-3', code: 'cache.put("token_99")' },
      { id: 'order-4', code: 'println(cache.get()?.uppercase())' }
    ],
    correctOrderIds: ['order-1', 'order-2', 'order-3', 'order-4'],
    options: [
      { id: 'A', title: 'Class declaration -> Instantiate -> Put -> Get', subtitle: 'Declares Cache<T>, creates Cache<String>, populates it, and invokes safe uppercase call', isCorrect: true },
      { id: 'B', title: 'Instantiate -> Class declaration -> Put -> Get', subtitle: 'Cannot instantiate class before declaration', isCorrect: false },
      { id: 'C', title: 'Class declaration -> Put -> Instantiate -> Get', subtitle: 'Cannot invoke put on uninstantiated variable', isCorrect: false },
      { id: 'D', title: 'Put -> Get -> Class declaration -> Instantiate', subtitle: 'Invalid execution sequence', isCorrect: false }
    ],
    hint: 'First define the generic class, then create an instance with a concrete type argument, store the item, and retrieve it.',
    explanation: {
      title: 'Generic Class Usage Lifecycle',
      text: 'A generic class must be declared before instantiation. Once instantiated with Cache<String>(), the compiler guarantees that only String instances can be passed to put(), and get() returns String?, permitting safe access to .uppercase().',
      highlights: ['Declaration before instantiation', 'Type parameter specialized at call site', 'Strong compile-time checking']
    }
  },

  // =========================================================================
  // LESSON 2: Upper Bounds & Type Constraints (5 questions)
  // =========================================================================
  {
    id: 'w7-l2-c1',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'type-constraints',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Constraints • Numeric Upper Bound',
    skill: 'constraints',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the output of this function constrained to the Number upper bound?',
    codeFileName: 'NumberConstraint.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T : Number> toDoubleSum(a: T, b: T): Double {',
      '    return a.toDouble() + b.toDouble()',
      '}',
      'println(toDoubleSum(10, 20))'
    ],
    options: [
      { id: 'A', title: '30.0', subtitle: 'Both integers are converted to Double via Number.toDouble() and summed', isCorrect: true },
      { id: 'B', title: '30', subtitle: 'The return type is explicitly Double, printing with a decimal point', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'toDouble() is a valid member of kotlin.Number', isCorrect: false },
      { id: 'D', title: '1020.0', subtitle: 'Numeric addition is performed, not string concatenation', isCorrect: false }
    ],
    hint: 'T : Number bounds T to kotlin.Number or any of its subclasses (Int, Double, Float, Long).',
    explanation: {
      title: 'The Number Upper Bound',
      text: 'Specifying <T : Number> guarantees that any argument passed inherits from kotlin.Number. This grants access to common numeric conversion functions such as .toDouble(), .toInt(), and .toLong() directly inside the generic function body.',
      highlights: ['<T : Number> constraint', 'Access to .toDouble() on any numeric type', 'Accepts Int, Double, Long, Float']
    }
  },
  {
    id: 'w7-l2-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'type-constraints',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Constraints • Comparable Constraint',
    skill: 'constraints',
    difficulty: 2,
    xpReward: 25,
    question: 'Which upper bound is required to find the maximum between two generic values using the > operator?',
    codeFileName: 'FindMax.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T : ____> maxOf(a: T, b: T): T {',
      '    return if (a > b) a else b',
      '}'
    ],
    options: [
      { id: 'A', title: 'Comparable<T>', subtitle: 'Implementing Comparable<T> allows Kotlin\'s compareTo operator overloading (> and <)', isCorrect: true },
      { id: 'B', title: 'Orderable', subtitle: 'Orderable does not exist in the Kotlin standard library', isCorrect: false },
      { id: 'C', title: 'Any', subtitle: 'Any does not support comparison operators (> or <)', isCorrect: false },
      { id: 'D', title: 'Number', subtitle: 'Number does not implement Comparable by itself (only its subclasses do)', isCorrect: false }
    ],
    hint: 'In Kotlin, the > operator is translated to a.compareTo(b) > 0, which requires the Comparable interface.',
    explanation: {
      title: 'Recursive Comparable Bound',
      text: 'Comparison operators like >, <, >=, and <= translate to calls to compareTo(). To enable these operators on generic type T, you must bound it to Comparable<T> (e.g. <T : Comparable<T>>).',
      highlights: ['<T : Comparable<T>> upper bound', 'Enables > and < operators', 'Translated to compareTo() call']
    }
  },
  {
    id: 'w7-l2-c3',
    challengeType: 'code-completion',
    worldId: 'world-7',
    lessonId: 'type-constraints',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Constraints • Multiple Upper Bounds with where',
    skill: 'constraints',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the syntax to apply multiple upper bounds on type parameter T.',
    codeFileName: 'MultipleBounds.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T> appendIfNotEmpty(target: T, text: CharSequence)',
      '        ____ T : CharSequence, T : Appendable {',
      '    if (target.isNotEmpty()) target.append(text)',
      '}'
    ],
    options: [
      { id: 'A', title: 'where', subtitle: 'The where clause at the end of the function signature specifies multiple constraints for a type parameter', isCorrect: true },
      { id: 'B', title: 'with', subtitle: 'with is a scope function, not a type constraint keyword', isCorrect: false },
      { id: 'C', title: 'given', subtitle: 'given is not a keyword in Kotlin', isCorrect: false },
      { id: 'D', title: 'requires', subtitle: 'requires is not part of Kotlin syntax', isCorrect: false }
    ],
    hint: 'When a generic type parameter requires more than one upper bound, Kotlin uses the "where" clause at the end of the signature.',
    explanation: {
      title: 'Multiple Constraints with "where"',
      text: 'If a type parameter requires multiple bounds (such as requiring both CharSequence for isNotEmpty and Appendable for append), only one can be placed inside <...>. All additional constraints must be declared in a trailing "where" clause.',
      highlights: ['where clause for multiple constraints', 'T must satisfy every specified bound', 'Placed before function body']
    }
  },
  {
    id: 'w7-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-7',
    lessonId: 'type-constraints',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Constraints • Non-Nullable Upper Bound',
    skill: 'constraints',
    difficulty: 2,
    xpReward: 25,
    question: 'The function below allows null arguments because T defaults to Any?. How do you forbid nulls by enforcing non-nullability?',
    codeFileName: 'NonNullableGeneric.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T> requireNonNullItem(item: T): Int {',
      '    return item.hashCode()',
      '}'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'fun <T : Any> requireNonNullItem(item: T): Int {', subtitle: 'Constraining T to Any (without the question mark) strictly forbids nullable arguments', isCorrect: true },
      { id: 'B', title: 'fun <T : notnull> requireNonNullItem(item: T): Int {', subtitle: 'notnull is not a valid Kotlin type', isCorrect: false },
      { id: 'C', title: 'fun <T!> requireNonNullItem(item: T): Int {', subtitle: 'Exclamation mark denotes platform types from Java, not type bounds', isCorrect: false },
      { id: 'D', title: 'fun <nonnull T> requireNonNullItem(item: T): Int {', subtitle: 'nonnull is not a valid modifier', isCorrect: false }
    ],
    hint: 'By default, <T> is equivalent to <T : Any?>. To reject nulls, specify <T : Any>.',
    explanation: {
      title: 'Enforcing Non-Nullable Generics with T : Any',
      text: 'In Kotlin, an unadorned generic parameter <T> defaults to <T : Any?>, allowing null to be passed as an argument. To guarantee at compile-time that T cannot be null, you must explicitly declare <T : Any>.',
      highlights: ['Default bound is Any? (nullable)', '<T : Any> disallows nulls', 'Safe direct method calls without ?.']
    }
  },
  {
    id: 'w7-l2-c5',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'type-constraints',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Constraints • Extension on Constrained Collections',
    skill: 'constraints',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when this constrained extension function processes a List<Int>?',
    codeFileName: 'AverageExt.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <T : Number> List<T>.sumDoubles(): Double =',
      '    this.fold(0.0) { acc, elem -> acc + elem.toDouble() }',
      'val items = listOf(5, 10, 15)',
      'println(items.sumDoubles())'
    ],
    options: [
      { id: 'A', title: '30.0', subtitle: 'All elements conform to Number, toDouble() is called, and the accumulator returns 30.0', isCorrect: true },
      { id: 'B', title: '30', subtitle: 'The return value is a Double, printed with decimal suffix', isCorrect: false },
      { id: 'C', title: '0.0', subtitle: 'The fold operation processes all three elements', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'List<T> where T: Number is a completely valid extension receiver', isCorrect: false }
    ],
    hint: 'List<T>.sumDoubles() is callable on any list whose elements inherit from Number (such as Int).',
    explanation: {
      title: 'Generic Extension on Constrained Receivers',
      text: 'You can write extension functions on generic types with constraints: fun <T : Number> List<T>.sumDoubles(). Because Int is a Number, listOf(5, 10, 15).sumDoubles() compiles and runs cleanly, producing 30.0.',
      highlights: ['Generic receiver constraints', 'fun <T : Bound> Receiver<T>.ext()', 'Type-safe domain extensions']
    }
  },

  // =========================================================================
  // LESSON 3: Variance: Invariance, Covariance (out) & Contravariance (in) (5 questions)
  // =========================================================================
  {
    id: 'w7-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'variance-in-out',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Variance • Invariance by Default',
    skill: 'variance',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does the assignment `val anyList: MutableList<Any> = mutableListOf<String>("a")` fail to compile?',
    codeFileName: 'InvarianceDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val strList: MutableList<String> = mutableListOf("a", "b")',
      '// Fails to compile:',
      'val anyList: MutableList<Any> = strList'
    ],
    options: [
      { id: 'A', title: 'MutableList is invariant', subtitle: 'If allowed, you could execute anyList.add(42), corrupting the original String list with an integer', isCorrect: true },
      { id: 'B', title: 'String does not inherit from Any in Kotlin', subtitle: 'String is a direct subtype of Any', isCorrect: false },
      { id: 'C', title: 'mutableListOf returns an unmodifiable list', subtitle: 'mutableListOf returns a fully mutable list', isCorrect: false },
      { id: 'D', title: 'Generics cannot be assigned to local variables', subtitle: 'Generics can be assigned to local variables of matching types', isCorrect: false }
    ],
    hint: 'If you could view a MutableList<String> as MutableList<Any>, what would stop someone from adding an Int or a Boolean to it?',
    explanation: {
      title: 'Why Mutable Generics Must Be Invariant',
      text: 'In Kotlin, MutableList<T> is invariant: MutableList<String> is NOT a subtype of MutableList<Any>. If it were, you could write anyList.add(123), which would insert an Int into what is actually a backing list of Strings, causing a runtime ClassCastException later.',
      highlights: ['Default variance is invariant', 'Prevents collection heap pollution', 'Mutable containers cannot be covariant']
    }
  },
  {
    id: 'w7-l3-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'variance-in-out',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Variance • Covariance with "out"',
    skill: 'variance',
    difficulty: 2,
    xpReward: 25,
    question: 'Why IS `val anyList: List<Any> = listOf<String>("a")` valid in Kotlin?',
    codeFileName: 'CovarianceDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val strList: List<String> = listOf("hello")',
      'val anyList: List<Any> = strList // Compiles perfectly!'
    ],
    options: [
      { id: 'A', title: 'List<out E> is declared covariant with the "out" modifier', subtitle: 'Because List is read-only, elements are only produced (read) and can never be added or mutated', isCorrect: true },
      { id: 'B', title: 'The compiler casts the list to an array under the hood', subtitle: 'No array conversion takes place', isCorrect: false },
      { id: 'C', title: 'Any is dynamically replaced with String by the JIT compiler', subtitle: 'Variance is verified at compile time', isCorrect: false },
      { id: 'D', title: 'List is an abstract class rather than an interface', subtitle: 'List is an interface', isCorrect: false }
    ],
    hint: 'Check the declaration in Kotlin\'s StdLib: public interface List<out E>. What does "out" mean?',
    explanation: {
      title: 'Covariance with "out" (Producer Position)',
      text: 'The "out" keyword marks a type parameter as covariant. It means the class/interface only PRODUCES (returns) elements of type E and never consumes (accepts) them as arguments. Because you can only read from List<out E>, reading a String as an Any is always type-safe.',
      highlights: ['out marks covariance', 'Producer only (read-only)', 'Subtype relationship preserved: List<String> is a subtype of List<Any>']
    }
  },
  {
    id: 'w7-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-7',
    lessonId: 'variance-in-out',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Variance • Contravariance with "in"',
    skill: 'variance',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the declaration of Consumer to make type parameter T contravariant.',
    codeFileName: 'Contravariance.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'interface Consumer<____ T> {',
      '    fun consume(item: T)',
      '}'
    ],
    options: [
      { id: 'A', title: 'in', subtitle: 'The in modifier marks T as contravariant, meaning it can only appear in input (consumed) positions', isCorrect: true },
      { id: 'B', title: 'out', subtitle: 'out is for covariance (producer positions)', isCorrect: false },
      { id: 'C', title: 'into', subtitle: 'into is not a Kotlin keyword', isCorrect: false },
      { id: 'D', title: 'consume', subtitle: 'consume is a method name, not a variance modifier', isCorrect: false }
    ],
    hint: 'Use the "in" modifier when the type parameter is only consumed (passed as input) by member functions.',
    explanation: {
      title: 'Contravariance with "in" (Consumer Position)',
      text: 'The "in" modifier indicates contravariance: type parameter T can only be consumed as a method parameter, never returned. Contravariance reverses the subtyping relationship: Consumer<Any> is a valid subtype of Consumer<String> because anything that can handle Any can certainly handle a String.',
      highlights: ['in marks contravariance', 'Consumer only (input parameters)', 'Reverses subtyping: Consumer<Number> is subtype of Consumer<Int>']
    }
  },
  {
    id: 'w7-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-7',
    lessonId: 'variance-in-out',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Variance • out Parameter in In-Position',
    skill: 'variance',
    difficulty: 3,
    xpReward: 30,
    question: 'Line 2 causes a compiler error: "Type parameter T is declared as \'out\' but occurs in \'in\' position". How should the class declaration be fixed so it can both produce and consume T?',
    codeFileName: 'InvariantStorage.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Storage<out T>(private var item: T) {',
      '    fun update(newItem: T) { item = newItem }',
      '    fun read(): T = item',
      '}'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'class Storage<T>(private var item: T) {', subtitle: 'Removing "out" makes T invariant, allowing it in both parameter (in) and return (out) positions', isCorrect: true },
      { id: 'B', title: 'class Storage<in T>(private var item: T) {', subtitle: 'Using in would then make line 3 (returning T) fail', isCorrect: false },
      { id: 'C', title: 'class Storage<out in T>(private var item: T) {', subtitle: 'out in is invalid syntax', isCorrect: false },
      { id: 'D', title: 'class Storage<* T>(private var item: T) {', subtitle: 'Star is not allowed in class type parameter declarations', isCorrect: false }
    ],
    hint: 'A class that both accepts T as an argument and returns T as a result cannot be covariant (out) or contravariant (in); it must be invariant.',
    explanation: {
      title: 'Variance Position Rules',
      text: 'Kotlin enforces that type parameters marked with "out" can only appear in "out" (return) positions. Because update(newItem: T) accepts T as an argument, it is an "in" position. To allow both read and write, remove "out" so that T becomes invariant.',
      highlights: ['out is prohibited in input parameters', 'in is prohibited in return types', 'Invariant classes support both read and write']
    }
  },
  {
    id: 'w7-l3-c5',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'variance-in-out',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Variance • Use-Site Variance (Type Projection)',
    skill: 'variance',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this copy function using use-site variance projection (Array<out Any>)?',
    codeFileName: 'TypeProjection.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun copy(from: Array<out Any>, to: Array<Any>) {',
      '    for (i in from.indices) { to[i] = from[i] }',
      '}',
      'val strings = arrayOf("Alpha", "Beta")',
      'val target = Array<Any>(2) { "" }',
      'copy(strings, target)',
      'println(target.joinToString(", "))'
    ],
    options: [
      { id: 'A', title: 'Alpha, Beta', subtitle: 'Array<out Any> allows passing Array<String> safely as a read-only source', isCorrect: true },
      { id: 'B', title: ', ', subtitle: 'The target array elements were overwritten with the source elements', isCorrect: false },
      { id: 'C', title: 'TypeCastException', subtitle: 'Type projection allows reading String as Any without casting errors', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Use-site projection Array<out Any> enables passing Array<String>', isCorrect: false }
    ],
    hint: 'Normally Array<T> is invariant. Array<out Any> projects it as read-only at the call site, allowing Array<String> to be passed.',
    explanation: {
      title: 'Use-Site Variance (Type Projection)',
      text: 'Even though Array<T> is invariant in Kotlin, you can project it as covariant at the use site using Array<out Any>. This tells the compiler that the function will only read from the array, making it safe to pass an Array<String>.',
      highlights: ['Use-site variance with out', 'Allows reading invariant containers safely', 'Kotlin equivalent of Java ? extends Object']
    }
  },

  // =========================================================================
  // LESSON 4: Star Projection (List<*>) (5 questions)
  // =========================================================================
  {
    id: 'w7-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'star-projection',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Star Projection • Meaning & Reading',
    skill: 'star_projection',
    difficulty: 2,
    xpReward: 25,
    question: 'When you have a reference to a `List<*>`, what is the static type of an element retrieved via `list[0]`?',
    codeFileName: 'StarListRead.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun inspectFirst(list: List<*>) {',
      '    val element = list[0]',
      '}'
    ],
    options: [
      { id: 'A', title: 'Any?', subtitle: 'Because the element type is unknown, the compiler can only guarantee it is a subtype of Any?', isCorrect: true },
      { id: 'B', title: 'Nothing', subtitle: 'Nothing represents an impossible value; reading produces Any?', isCorrect: false },
      { id: 'C', title: 'Object', subtitle: 'Object is Java terminology; Kotlin\'s root type is Any?', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Reading from star-projected read-only lists is entirely legal', isCorrect: false }
    ],
    hint: 'When the specific type argument is completely unknown, what is the most general type in Kotlin that can hold anything?',
    explanation: {
      title: 'Star Projection Reading Semantics',
      text: 'Star projection List<*> is used when you know nothing about the type argument. For covariant types like List<out T>, List<*> is equivalent to List<out Any?>. Therefore, reading elements always safely produces values of type Any?.',
      highlights: ['List<*> reads as Any?', 'Safe when type is unknown', 'Equivalent to List<out Any?>']
    }
  },
  {
    id: 'w7-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'star-projection',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Star Projection • Writing Prohibition',
    skill: 'star_projection',
    difficulty: 2,
    xpReward: 25,
    question: 'What happens when attempting to add an element into a MutableList<*>?',
    codeFileName: 'StarListWrite.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun appendValue(list: MutableList<*>) {',
      '    list.add("hello")',
      '}'
    ],
    options: [
      { id: 'A', title: 'Compilation Error', subtitle: 'Writing into a star-projected mutable collection is forbidden because the actual element type is unknown', isCorrect: true },
      { id: 'B', title: 'Successful insertion', subtitle: 'The compiler cannot verify that the list can hold Strings', isCorrect: false },
      { id: 'C', title: 'UnsupportedOperationException at runtime', subtitle: 'The error is caught at compile-time, not runtime', isCorrect: false },
      { id: 'D', title: 'Silent no-op', subtitle: 'Kotlin does not silently drop method calls', isCorrect: false }
    ],
    hint: 'If list was actually a MutableList<Int>, allowing list.add("hello") would destroy type safety.',
    explanation: {
      title: 'Star Projection Forbids Writing',
      text: 'For invariant types like MutableList<T>, MutableList<*> means you cannot write any elements into it (except Nothing, which has no instances). The compiler rejects list.add(...) because it cannot verify whether the underlying list accepts strings, integers, or another type.',
      highlights: ['Cannot write to MutableList<*>', 'Prevents type corruption at compile-time', 'Consumer position expects Nothing']
    }
  },
  {
    id: 'w7-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-7',
    lessonId: 'star-projection',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Star Projection • Type Check with is',
    skill: 'star_projection',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the type check to determine if an unknown object is any kind of List without triggering type erasure warnings.',
    codeFileName: 'CheckList.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun printSizeIfList(obj: Any) {',
      '    if (obj is List<____>) {',
      '        println(obj.size)',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: '*', subtitle: 'Star projection (List<*>) allows checking the collection type despite JVM runtime type erasure', isCorrect: true },
      { id: 'B', title: 'T', subtitle: 'Unbound T cannot be checked at runtime without reification', isCorrect: false },
      { id: 'C', title: 'Any', subtitle: 'obj is List<Any> triggers an unchecked cast warning due to type erasure', isCorrect: false },
      { id: 'D', title: '?', subtitle: 'Question mark alone is not the star projection operator in Kotlin', isCorrect: false }
    ],
    hint: 'Use the star (*) symbol to check for a generic type when the type arguments were erased at runtime.',
    explanation: {
      title: 'Type Checking with Star Projection',
      text: 'Due to JVM type erasure, Kotlin cannot verify whether obj is List<String> or List<Int> at runtime. However, you CAN check if it is a List of unknown elements using star projection: obj is List<*>. The smart-cast then grants access to members like .size.',
      highlights: ['obj is List<*> is always valid', 'Bypasses JVM type erasure limits', 'Enables smart-casting to generic interface']
    }
  },
  {
    id: 'w7-l4-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'star-projection',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Star Projection • Star vs Raw Types',
    skill: 'star_projection',
    difficulty: 2,
    xpReward: 25,
    question: 'How does Kotlin\'s star projection (List<*>) differ from Java\'s raw types (List)?',
    codeFileName: 'StarVsRaw.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Kotlin:',
      'val items: List<*> = listOf(1, "two", true)'
    ],
    options: [
      { id: 'A', title: 'Star projections are completely type-safe at compile time, whereas Java raw types bypass type-checking entirely', subtitle: 'Kotlin forbids unsafe writes and forces reads to be typed as Any?', isCorrect: true },
      { id: 'B', title: 'Star projections cause runtime reflection overhead', subtitle: 'Star projections have zero reflection overhead', isCorrect: false },
      { id: 'C', title: 'Star projections are only permitted on Android', subtitle: 'Star projections are part of standard Kotlin', isCorrect: false },
      { id: 'D', title: 'Java raw types are strictly type-safe, while star projections are not', subtitle: 'Java raw types allow unsafe operations; Kotlin star projections prevent them', isCorrect: false }
    ],
    hint: 'Java raw types allow writing anything into the list without compiler warnings. Does Kotlin allow this?',
    explanation: {
      title: 'Star Projection vs. Raw Types',
      text: 'Kotlin does not have unsafe raw types. Instead, it uses star projection (like Java\'s wildcard List<?>). It provides complete compile-time safety: you can safely read items as Any?, but the compiler strictly blocks inserting arbitrary elements, eliminating accidental heap pollution.',
      highlights: ['Fully type-safe at compile time', 'No raw types in Kotlin', 'Reads produce Any?, writes are blocked']
    }
  },
  {
    id: 'w7-l4-c5',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'star-projection',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Star Projection • Smart Cast & Safe Calls',
    skill: 'star_projection',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this function when passing a map with mixed values to a star-projected receiver?',
    codeFileName: 'StarMap.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun printKeyCount(map: Map<*, *>) {',
      '    println("Count: ${map.keys.size}")',
      '}',
      'val data = mapOf("id" to 101, 42 to "answer")',
      'printKeyCount(data)'
    ],
    options: [
      { id: 'A', title: 'Count: 2', subtitle: 'Map<*, *> accepts any Map regardless of key or value types, and queries keys.size', isCorrect: true },
      { id: 'B', title: 'Count: 0', subtitle: 'The map contains two entries', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Map<*, *> is completely valid syntax for any map', isCorrect: false },
      { id: 'D', title: 'ClassCastException', subtitle: 'No casting is needed to check the number of keys', isCorrect: false }
    ],
    hint: 'Map<*, *> matches a map of any key type and any value type.',
    explanation: {
      title: 'Accepting Any Map with Map<*, *>',
      text: 'Declaring a parameter as Map<*, *> allows passing any map instance regardless of its key or value types. You can query common properties like .size, .isEmpty(), or iterate through entries where keys and values are treated as Any?.',
      highlights: ['Map<*, *> accepts any key/value types', 'Universal read-only inspection', 'Safe and idiomatic Kotlin']
    }
  },

  // =========================================================================
  // LESSON 5: Reified Type Parameters & Inline Functions (5 questions)
  // =========================================================================
  {
    id: 'w7-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-7',
    lessonId: 'reified-types',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Reification • Type Erasure on the JVM',
    skill: 'reified',
    difficulty: 1,
    xpReward: 20,
    question: 'Why does a standard non-inline function like `fun <T> check(v: Any) = v is T` fail to compile?',
    codeFileName: 'TypeErasure.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Fails to compile: "Cannot check for instance of erased type: T"',
      'fun <T> isInstanceOf(value: Any): Boolean {',
      '    return value is T',
      '}'
    ],
    options: [
      { id: 'A', title: 'JVM Type Erasure', subtitle: 'Generic type arguments are stripped from bytecode at runtime, so the JVM cannot check if value is T', isCorrect: true },
      { id: 'B', title: 'is operator cannot be used on generic types in any situation', subtitle: 'Inline functions with reified type parameters allow using is T', isCorrect: false },
      { id: 'C', title: 'value is Any and cannot be cast', subtitle: 'Any can be checked with is against any concrete type', isCorrect: false },
      { id: 'D', title: 'T must inherit from Throwable', subtitle: 'Throwable is only for exceptions', isCorrect: false }
    ],
    hint: 'At runtime on the JVM, generic types like List<String> and List<Int> become just List. Type information is erased.',
    explanation: {
      title: 'Type Erasure on the JVM',
      text: 'Like Java, Kotlin generics are subject to type erasure: generic type parameters (like T) are removed during compilation and replaced with their upper bounds (such as Object/Any). Consequently, at runtime the JVM does not know what T is, making value is T impossible in standard functions.',
      highlights: ['Type erasure strips T at runtime', 'Cannot check value is T in normal functions', 'Cannot access T::class.java normally']
    }
  },
  {
    id: 'w7-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'reified-types',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Reification • inline & reified',
    skill: 'reified',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this inlined function utilizing a reified type parameter?',
    codeFileName: 'ReifiedCheck.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'inline fun <reified T> isType(value: Any): Boolean = value is T',
      'val a = isType<String>("CodeDo")',
      'val b = isType<Int>("CodeDo")',
      'println("$a and $b")'
    ],
    options: [
      { id: 'A', title: 'true and false', subtitle: '"CodeDo" is a String (true) and is not an Int (false)', isCorrect: true },
      { id: 'B', title: 'true and true', subtitle: '"CodeDo" is not an instance of Int', isCorrect: false },
      { id: 'C', title: 'false and false', subtitle: '"CodeDo" is indeed a String', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'inline with reified makes value is T fully legal', isCorrect: false }
    ],
    hint: 'Inlining pastes the function body directly at call sites, substituting T with the actual concrete type (e.g. value is String).',
    explanation: {
      title: 'Reified Type Parameters with "inline"',
      text: 'By combining the inline keyword on a function with the reified modifier on its type parameter (inline fun <reified T>), the compiler copies the bytecode directly into each call site. Because the call site knows the concrete type, it can emit a real instanceof check (value is String), bypassing type erasure.',
      highlights: ['inline inlines bytecode at call sites', 'reified retains type at runtime', 'Enables value is T and T::class.java']
    }
  },
  {
    id: 'w7-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-7',
    lessonId: 'reified-types',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Reification • Accessing Class Literals',
    skill: 'reified',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the reified function to retrieve the Java Class object of type T without passing a Class parameter.',
    codeFileName: 'ReifiedClass.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'inline fun <reified T> printClassName() {',
      '    val clazz = ____::class.java',
      '    println(clazz.simpleName)',
      '}',
      'printClassName<Double>()'
    ],
    options: [
      { id: 'A', title: 'T', subtitle: 'Reified type parameters allow referencing T::class and T::class.java directly', isCorrect: true },
      { id: 'B', title: 'this', subtitle: 'this refers to the receiver, not the type parameter', isCorrect: false },
      { id: 'C', title: 'type', subtitle: 'type is not a keyword for type literal access in Kotlin', isCorrect: false },
      { id: 'D', title: 'Any', subtitle: 'Any::class.java would always return class java.lang.Object', isCorrect: false }
    ],
    hint: 'With a reified type parameter, you can reference T::class directly as if T were a concrete class name.',
    explanation: {
      title: 'Referencing T::class Directly',
      text: 'In standard Java and non-inlined Kotlin generics, you must pass Class<T> clazz manually. With Kotlin reified type parameters, you can directly access T::class or T::class.java inside the inline function body.',
      highlights: ['T::class.java enabled by reified', 'Eliminates boilerplate Class<T> parameters', 'Clean API design for reflection and serialization']
    }
  },
  {
    id: 'w7-l5-c4',
    challengeType: 'bug-fix',
    worldId: 'world-7',
    lessonId: 'reified-types',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Reification • Reified Requires Inline',
    skill: 'reified',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 1 fails with: "Only type parameters of inline functions can be reified". How should the function be declared?',
    codeFileName: 'MissingInline.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun <reified T> identify(item: Any): Boolean {',
      '    return item is T',
      '}'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'inline fun <reified T> identify(item: Any): Boolean {', subtitle: 'The reified modifier is strictly only allowed on inline functions', isCorrect: true },
      { id: 'B', title: 'noinline fun <reified T> identify(item: Any): Boolean {', subtitle: 'noinline suppresses inlining of lambda parameters, not the function itself', isCorrect: false },
      { id: 'C', title: 'reified fun <T> identify(item: Any): Boolean {', subtitle: 'reified modifies the type parameter, not the fun keyword', isCorrect: false },
      { id: 'D', title: 'crossinline fun <reified T> identify(item: Any): Boolean {', subtitle: 'crossinline is for lambda parameters inside inline functions', isCorrect: false }
    ],
    hint: 'Reification requires the function to be marked with "inline" so the compiler can copy the actual types to each call site.',
    explanation: {
      title: 'Reified Type Modifier Prerequisite',
      text: 'The reified keyword cannot work without inlining because the JVM does not support runtime reified generics. The Kotlin compiler relies on the inline mechanism to substitute the exact type at each call site.',
      highlights: ['reified requires inline', 'Compiler substitutes concrete type in bytecode', 'Cannot reify regular non-inline functions']
    }
  },
  {
    id: 'w7-l5-c5',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'reified-types',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'Reification • filterIsInstance',
    skill: 'reified',
    difficulty: 2,
    xpReward: 25,
    question: 'What is returned when using the standard library reified extension function filterIsInstance<T>()?',
    codeFileName: 'FilterInstance.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val mixedList: List<Any> = listOf("Kotlin", 100, "Jetpack", 200, true)',
      'val strings: List<String> = mixedList.filterIsInstance<String>()',
      'println(strings)'
    ],
    options: [
      { id: 'A', title: '[Kotlin, Jetpack]', subtitle: 'filterIsInstance<String>() filters items where item is String and smart-casts to List<String>', isCorrect: true },
      { id: 'B', title: '[100, 200]', subtitle: 'Filtered for String, not Int', isCorrect: false },
      { id: 'C', title: '[Kotlin, 100, Jetpack, 200, true]', subtitle: 'Items that are not Strings are filtered out', isCorrect: false },
      { id: 'D', title: 'ClassCastException', subtitle: 'filterIsInstance safely filters without casting errors', isCorrect: false }
    ],
    hint: 'filterIsInstance<T>() filters the collection keeping only elements that match type T, returning a clean List<T>.',
    explanation: {
      title: 'filterIsInstance<T>() in the Standard Library',
      text: 'The standard library defines inline fun <reified R> Iterable<*>.filterIsInstance(): List<R>. Thanks to reification, it inspects each element with item is R and returns a typed List<R> containing only matching elements.',
      highlights: ['filterIsInstance<T>() uses reification', 'Filters and casts simultaneously', 'Returns strictly typed List<T>']
    }
  },

  // =========================================================================
  // LESSON 6: WORLD BOSS: Type Alchemist (1 multi-stage challenge)
  // =========================================================================
  {
    id: 'w7-boss-1',
    challengeType: 'output-prediction',
    worldId: 'world-7',
    lessonId: 'generics-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Generics & Advanced Type System',
    topicTag: 'World Boss • The Type Alchemist',
    skill: 'generics-boss',
    difficulty: 3,
    xpReward: 50,
    question: 'Trace this type-safe EventBus and Service Locator architecture combining covariance (out), reified lookup, and upper bounds. What is printed?',
    codeFileName: 'TypeAlchemistBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// 1. Covariant Event Hierarchy',
      'open class Event(val id: String)',
      'class UserEvent(id: String, val username: String) : Event(id)',
      '',
      'interface EventSource<out T : Event> {',
      '    fun next(): T',
      '}',
      '',
      '// 2. Type-Safe Service Container',
      'class ServiceContainer {',
      '    val services = mutableMapOf<String, Any>()',
      '',
      '    inline fun <reified T : Any> register(service: T) {',
      '        services[T::class.java.name] = service',
      '    }',
      '',
      '    inline fun <reified T : Any> resolve(): T? {',
      '        return services[T::class.java.name] as? T',
      '    }',
      '}',
      '',
      '// 3. Execution Pipeline',
      'fun main() {',
      '    val container = ServiceContainer()',
      '    val source: EventSource<Event> = object : EventSource<UserEvent> {',
      '        override fun next(): UserEvent = UserEvent("evt_1", "Alice")',
      '    }',
      '    container.register<EventSource<Event>>(source)',
      '    val resolved = container.resolve<EventSource<Event>>()',
      '    val event = resolved?.next()',
      '    println("${event?.id}: ${(event as? UserEvent)?.username}")',
      '}'
    ],
    options: [
      { id: 'A', title: 'evt_1: Alice', subtitle: 'EventSource is covariant (out T) so EventSource<UserEvent> can be assigned to EventSource<Event>; reified registry stores and resolves it cleanly', isCorrect: true },
      { id: 'B', title: 'evt_1: null', subtitle: 'The event was instantiated as UserEvent, so the safe cast (event as? UserEvent) succeeds', isCorrect: false },
      { id: 'C', title: 'Compilation Error on line 24', subtitle: 'Because EventSource is declared with out T, EventSource<UserEvent> is a valid subtype of EventSource<Event>', isCorrect: false },
      { id: 'D', title: 'ClassCastException at runtime', subtitle: 'The safe cast as? T returns the object without throwing', isCorrect: false }
    ],
    hint: 'Key concepts: EventSource<out T : Event> allows covariance; reified register/resolve keys by Class name; next() returns UserEvent("evt_1", "Alice").',
    explanation: {
      title: 'World 7 Boss Mastery: The Type Alchemist',
      text: 'This boss battle tests all core pillars of Kotlin\'s advanced type system:\n1. Covariance (<out T : Event>): Because T is marked with out, EventSource<UserEvent> is an assignable subtype of EventSource<Event>.\n2. Reified Generic Lookup: T::class.java.name dynamically maps the exact type to the registry without requiring manual class parameter passing.\n3. Upper Bound (<T : Any>): Guarantees non-null services in the container.\n4. Execution: source.next() produces UserEvent("evt_1", "Alice"), which is successfully resolved and downcast to print "evt_1: Alice".',
      highlights: [
        'out T enables covariance subtyping',
        'T::class.java in reified methods avoids Class<T> boilerplate',
        'Safe cast (event as? UserEvent) cleanly accesses subclass properties'
      ]
    }
  }
];
