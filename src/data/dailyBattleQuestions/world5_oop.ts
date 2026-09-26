import { LessonQuestion } from '../../types';

export const WORLD_5_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Classes, Properties & Init Blocks (5 questions)
  // =========================================================================
  {
    id: 'w5-l1-c1',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'classes-properties',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Classes • Primary Constructor & Init',
    skill: 'classes',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed when this Player instance is initialized?',
    codeFileName: 'Player.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Player(val name: String, var score: Int = 0) {',
      '    init {',
      '        println("Ready: $name ($score)")',
      '    }',
      '}',
      'val p = Player("Aragorn", 100)'
    ],
    options: [
      { id: 'A', title: 'Ready: Aragorn (100)', subtitle: 'Primary constructor parameters are immediately available in init', isCorrect: true },
      { id: 'B', title: 'Ready: Aragorn (0)', subtitle: 'Default score is used instead of passed argument', isCorrect: false },
      { id: 'C', title: 'Ready: null (0)', subtitle: 'Parameters are not initialized until after init runs', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'init blocks cannot access constructor parameters', isCorrect: false }
    ],
    hint: 'The primary constructor parameters (val name, var score) are already bound when init executes.',
    explanation: {
      title: 'Primary Constructor & Init Execution',
      text: 'In Kotlin, the primary constructor initializes properties declared with val/var. The init block runs immediately during object construction with all passed arguments bound.',
      highlights: ['primary constructor', 'init block', 'val/var properties']
    }
  },
  {
    id: 'w5-l1-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'classes-properties',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Classes • Constructor Parameters vs Properties',
    skill: 'classes',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the crucial difference between declaring "val name: String" versus "name: String" in a primary constructor?',
    codeFileName: 'ParamDiff.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class UserA(val name: String)',
      'class UserB(name: String)'
    ],
    options: [
      { id: 'A', title: 'val creates a class property; omitting it only creates a transient constructor parameter', subtitle: 'UserB cannot access name outside init blocks or property initializers', isCorrect: true },
      { id: 'B', title: 'Omitting val makes the property mutable (like var)', subtitle: 'Kotlin does not default to var', isCorrect: false },
      { id: 'C', title: 'There is no difference; Kotlin generates getters for both', subtitle: 'Without val/var, no getter or field is generated', isCorrect: false },
      { id: 'D', title: 'UserB is private while UserA is public', subtitle: 'Visibility is unchanged', isCorrect: false }
    ],
    hint: 'Adding val or var tells the Kotlin compiler to generate a backing field and accessor for that parameter.',
    explanation: {
      title: 'Constructor Parameters vs Properties',
      text: 'In UserA, `val name` creates a public read-only property with a getter. In UserB, `name` is merely a constructor parameter available only during initialization (in `init` blocks and property declarations).',
      highlights: ['val property', 'transient parameter', 'init scope']
    }
  },
  {
    id: 'w5-l1-c3',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'classes-properties',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Classes • Initialization Order',
    skill: 'classes',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the exact output printed when Tracker() is created?',
    codeFileName: 'InitOrder.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Tracker {',
      '    val first = "A".also { print(it) }',
      '    init {',
      '        print("B")',
      '    }',
      '    val second = "C".also { print(it) }',
      '}',
      'Tracker()'
    ],
    options: [
      { id: 'A', title: 'ABC', subtitle: 'Properties and init blocks run top-to-bottom in declaration order', isCorrect: true },
      { id: 'B', title: 'BAC', subtitle: 'init blocks always run before all property declarations', isCorrect: false },
      { id: 'C', title: 'ACB', subtitle: 'All properties initialize before init blocks run', isCorrect: false },
      { id: 'D', title: 'BCA', subtitle: 'init block runs first, then reverse property order', isCorrect: false }
    ],
    hint: 'Kotlin executes property initializers and init blocks in the exact sequential order they appear in the class body.',
    explanation: {
      title: 'Sequential Initialization Order',
      text: 'Property initializers and `init` blocks are executed in the exact order of appearance in the class body. First `first` initializes (prints "A"), then `init` runs (prints "B"), and finally `second` initializes (prints "C").',
      highlights: ['sequential order', 'top-to-bottom', 'init blocks']
    }
  },
  {
    id: 'w5-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-5',
    lessonId: 'classes-properties',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Classes • Secondary Constructor Delegation',
    skill: 'classes',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does this secondary constructor fail to compile?',
    codeFileName: 'Car.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Car(val brand: String, val speed: Int) {',
      '    constructor(brand: String) {',
      '        // Trying to construct a car with default speed 60',
      '    }',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'Secondary constructors must delegate to the primary constructor via : this(...)', subtitle: 'e.g., constructor(brand: String) : this(brand, 60)', isCorrect: true },
      { id: 'B', title: 'Classes with primary constructors cannot have secondary constructors', subtitle: 'Secondary constructors are allowed with proper delegation', isCorrect: false },
      { id: 'C', title: 'Secondary constructors must be marked with the open keyword', subtitle: 'Constructors cannot be open', isCorrect: false },
      { id: 'D', title: 'The brand parameter shadows the primary constructor parameter', subtitle: 'Parameter names are allowed to match', isCorrect: false }
    ],
    hint: 'If a class has a primary constructor, every secondary constructor must delegate directly or indirectly to it using `: this(...)`.',
    explanation: {
      title: 'Secondary Constructor Delegation',
      text: 'When a primary constructor exists, all secondary constructors must delegate to it using `: this(arguments)`. This guarantees that primary property initializations always take place.',
      highlights: ['this(...)', 'constructor delegation', 'primary constructor']
    }
  },
  {
    id: 'w5-l1-c5',
    challengeType: 'code-completion',
    worldId: 'world-5',
    lessonId: 'classes-properties',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Classes • Custom Getters',
    skill: 'classes',
    difficulty: 2,
    xpReward: 20,
    question: 'Fill in the blank to define a custom getter for the computed property isAdult.',
    codeFileName: 'Profile.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Profile(val age: Int) {',
      '    val isAdult: Boolean',
      '        _____() = age >= 18',
      '}'
    ],
    options: [
      { id: 'A', title: 'get', subtitle: 'Declares a custom property accessor: get() = expression', isCorrect: true },
      { id: 'B', title: 'getter', subtitle: 'Invalid keyword in Kotlin', isCorrect: false },
      { id: 'C', title: 'fun', subtitle: 'fun declares a function, not a property accessor', isCorrect: false },
      { id: 'D', title: 'return', subtitle: 'return is a jump statement, not an accessor', isCorrect: false }
    ],
    hint: 'Kotlin uses "get()" to declare a custom getter accessor for a property.',
    explanation: {
      title: 'Custom Property Getters',
      text: 'A custom getter is declared using `get()`. When accessing `profile.isAdult`, the expression `age >= 18` is evaluated on-demand every time without storing an unnecessary backing field.',
      highlights: ['get()', 'custom getter', 'no backing field']
    }
  },

  // =========================================================================
  // LESSON 2: Data Classes & Structural Operations (5 questions)
  // =========================================================================
  {
    id: 'w5-l2-c1',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'data-classes',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Data Classes • Structural Equality',
    skill: 'data_classes',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by comparing these two Point instances with == ?',
    codeFileName: 'PointCheck.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class Point(val x: Int, val y: Int)',
      'val p1 = Point(10, 20)',
      'val p2 = Point(10, 20)',
      'println(p1 == p2)'
    ],
    options: [
      { id: 'A', title: 'true', subtitle: 'Data classes auto-generate equals() based on primary constructor properties', isCorrect: true },
      { id: 'B', title: 'false', subtitle: 'They are two different memory references', isCorrect: false },
      { id: 'C', title: 'Point(10, 20)', subtitle: 'The comparison returns a Boolean, not the object', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: '== cannot be applied to custom classes', isCorrect: false }
    ],
    hint: 'Data classes automatically generate equals() and hashCode() using all primary constructor properties.',
    explanation: {
      title: 'Automatic Structural Equality in Data Classes',
      text: 'For `data class`, the Kotlin compiler auto-generates `equals()` (invoked by `==`) and `hashCode()` comparing every property in the primary constructor. Because `p1.x == p2.x` and `p1.y == p2.y`, `p1 == p2` is `true`.',
      highlights: ['data class', 'equals()', 'structural equality']
    }
  },
  {
    id: 'w5-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'data-classes',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Data Classes • The .copy() Method',
    skill: 'data_classes',
    difficulty: 2,
    xpReward: 25,
    question: 'What does the .copy() method print when updating specific properties?',
    codeFileName: 'TaskCopy.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class Task(val id: Int, val title: String, val done: Boolean = false)',
      'val t1 = Task(1, "Plan Sprint")',
      'val t2 = t1.copy(title = "Review Sprint", done = true)',
      'println("${t2.id}: ${t2.title}, done=${t2.done}")'
    ],
    options: [
      { id: 'A', title: '1: Review Sprint, done=true', subtitle: 'Unspecified properties retain original values (id=1)', isCorrect: true },
      { id: 'B', title: '1: Plan Sprint, done=true', subtitle: 'The title override was ignored', isCorrect: false },
      { id: 'C', title: 'null: Review Sprint, done=true', subtitle: 'id was not set so it became null', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'copy() cannot take named arguments', isCorrect: false }
    ],
    hint: 'The compiler-generated copy() creates a new instance, copying unmentioned properties from the source instance.',
    explanation: {
      title: 'Immutability with copy()',
      text: 'The generated `.copy()` function enables immutable updates: it creates a new instance while letting you mutate select fields using named arguments, keeping unmodified fields (like `id`) intact.',
      highlights: ['copy()', 'immutable updates', 'named arguments']
    }
  },
  {
    id: 'w5-l2-c3',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'data-classes',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Data Classes • Destructuring Declarations',
    skill: 'data_classes',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by destructuring this User instance with an underscore?',
    codeFileName: 'Destructure.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class User(val name: String, val role: String, val level: Int)',
      'val (uName, _, uLevel) = User("Alice", "Admin", 42)',
      'println("$uName is level $uLevel")'
    ],
    options: [
      { id: 'A', title: 'Alice is level 42', subtitle: 'component1() maps to uName, component2() is skipped by _, component3() maps to uLevel', isCorrect: true },
      { id: 'B', title: 'Alice is level Admin', subtitle: 'Underscore does not skip components in Kotlin', isCorrect: false },
      { id: 'C', title: 'Admin is level 42', subtitle: 'uName bound to role instead of name', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Underscore is not valid syntax in destructuring', isCorrect: false }
    ],
    hint: 'Data classes generate componentN() methods. An underscore `_` skips that position in destructuring.',
    explanation: {
      title: 'Destructuring Declarations & Skipping',
      text: 'Kotlin generates `component1()`, `component2()`, `component3()` for data classes. Destructuring assigns these positional components in order. The underscore `_` explicitly tells the compiler to skip `component2()`.',
      highlights: ['destructuring', 'componentN()', 'underscore skip']
    }
  },
  {
    id: 'w5-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-5',
    lessonId: 'data-classes',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Data Classes • Parameter Requirements',
    skill: 'data_classes',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does the EmptyEvent data class fail to compile?',
    codeFileName: 'EmptyData.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class EmptyEvent()'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'A data class primary constructor must have at least one parameter marked val or var', subtitle: 'Data classes exist to hold data; empty constructors are forbidden', isCorrect: true },
      { id: 'B', title: 'Data classes cannot use PascalCase names', subtitle: 'Naming conventions do not forbid PascalCase', isCorrect: false },
      { id: 'C', title: 'EmptyEvent must inherit from Event', subtitle: 'Data classes can inherit or stand alone', isCorrect: false },
      { id: 'D', title: 'Data classes must have an explicit body with braces {}', subtitle: 'Empty bodies are allowed if constructor has parameters', isCorrect: false }
    ],
    hint: 'The Kotlin compiler requires that a data class primary constructor has at least one val or var parameter.',
    explanation: {
      title: 'Data Class Requirements',
      text: 'By Kotlin language specification, a `data class` primary constructor must have at least one parameter, and all primary constructor parameters must be marked with `val` or `var` to enable component generation.',
      highlights: ['at least one parameter', 'val or var required', 'data class specification']
    }
  },
  {
    id: 'w5-l2-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'data-classes',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Data Classes • Body Properties vs Primary Constructor',
    skill: 'data_classes',
    difficulty: 3,
    xpReward: 25,
    question: 'If a property is declared inside the class body rather than in the primary constructor of a data class, what happens to equals() and toString()?',
    codeFileName: 'BodyProp.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class Person(val name: String) {',
      '    var age: Int = 0',
      '}'
    ],
    options: [
      { id: 'A', title: 'age is excluded from equals(), hashCode(), and toString()', subtitle: 'Only primary constructor properties participate in generated methods', isCorrect: true },
      { id: 'B', title: 'age is included in toString() but excluded from equals()', subtitle: 'It is excluded from all generated data class methods', isCorrect: false },
      { id: 'C', title: 'The code fails to compile because data classes cannot have body properties', subtitle: 'Body properties are fully valid in data classes', isCorrect: false },
      { id: 'D', title: 'age is included in all generated methods automatically', subtitle: 'Only primary parameters are included', isCorrect: false }
    ],
    hint: 'Only properties declared in the primary constructor parameter list are considered by the compiler for equals, hashCode, and toString.',
    explanation: {
      title: 'Body Properties in Data Classes',
      text: 'The compiler only uses properties listed in the primary constructor for `equals()`, `hashCode()`, `toString()`, and `copy()`. Any property declared in the class body (like `var age`) is completely ignored by those generated methods.',
      highlights: ['excluded from equals', 'primary constructor only', 'body properties']
    }
  },

  // =========================================================================
  // LESSON 3: Inheritance & Interfaces (5 questions)
  // =========================================================================
  {
    id: 'w5-l3-c1',
    challengeType: 'bug-fix',
    worldId: 'world-5',
    lessonId: 'inheritance-interfaces',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Inheritance • The open Keyword',
    skill: 'inheritance',
    difficulty: 1,
    xpReward: 20,
    question: 'Why does subclass Wizard fail to compile when extending Character?',
    codeFileName: 'Character.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Character(val name: String)',
      'class Wizard(name: String, val mana: Int) : Character(name)'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'Classes in Kotlin are final by default; Character must be marked open', subtitle: 'To allow subclassing, write: open class Character(...)', isCorrect: true },
      { id: 'B', title: 'Kotlin uses the "extends" keyword instead of ":"', subtitle: 'Kotlin uses ":" for both inheritance and interfaces', isCorrect: false },
      { id: 'C', title: 'Wizard cannot pass name to Character constructor', subtitle: 'Passing arguments to super constructor is required', isCorrect: false },
      { id: 'D', title: 'Character must declare an empty secondary constructor', subtitle: 'Super constructor call matches the primary constructor', isCorrect: false }
    ],
    hint: 'In Kotlin, all classes and methods are "final" by default. You must explicitly open them.',
    explanation: {
      title: 'Classes are Final by Default',
      text: 'To avoid the fragile base class problem, Kotlin classes are closed (`final`) by default. To permit inheritance, the base class must be declared with the `open` modifier: `open class Character(val name: String)`.',
      highlights: ['final by default', 'open modifier', 'subclassing']
    }
  },
  {
    id: 'w5-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'inheritance-interfaces',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Inheritance • Polymorphic Method Dispatch',
    skill: 'inheritance',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when invoking s.speak() through the supertype reference?',
    codeFileName: 'Speaker.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'open class Speaker {',
      '    open fun speak() = "Hello"',
      '}',
      'class Robot : Speaker() {',
      '    override fun speak() = "Beep"',
      '}',
      'val s: Speaker = Robot()',
      'println(s.speak())'
    ],
    options: [
      { id: 'A', title: 'Beep', subtitle: 'Dynamic dispatch calls the overridden Robot method', isCorrect: true },
      { id: 'B', title: 'Hello', subtitle: 'Static binding uses the Speaker reference type', isCorrect: false },
      { id: 'C', title: 'Hello Beep', subtitle: 'Both super and child methods run', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Cannot assign Robot instance to Speaker type', isCorrect: false }
    ],
    hint: 'Kotlin methods are virtual by default when marked open. Runtime dynamic dispatch executes the subclass implementation.',
    explanation: {
      title: 'Virtual Methods & Dynamic Dispatch',
      text: 'Because `speak()` is marked `open` and overridden with `override`, runtime polymorphic dispatch calls the implementation corresponding to the actual instance (`Robot`), printing "Beep".',
      highlights: ['override', 'dynamic dispatch', 'polymorphism']
    }
  },
  {
    id: 'w5-l3-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'inheritance-interfaces',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Interfaces • Default Method Implementations',
    skill: 'interfaces',
    difficulty: 2,
    xpReward: 20,
    question: 'Can Kotlin interfaces contain concrete method implementations?',
    codeFileName: 'LoggerInterface.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'interface Logger {',
      '    fun log(msg: String) {',
      '        println("[LOG]: $msg")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Yes, Kotlin interface methods can have concrete default bodies', subtitle: 'Implementing classes inherit the default implementation without special keywords', isCorrect: true },
      { id: 'B', title: 'No, all interface methods in Kotlin must be strictly abstract', subtitle: 'Kotlin interfaces have supported default bodies since version 1.0', isCorrect: false },
      { id: 'C', title: 'Yes, but only if annotated with @JvmDefault', subtitle: '@JvmDefault is only for legacy bytecode generation, not syntax', isCorrect: false },
      { id: 'D', title: 'No, only abstract classes can have method bodies', subtitle: 'Interfaces also support default bodies', isCorrect: false }
    ],
    hint: 'Unlike older versions of Java, Kotlin interfaces can contain both abstract declarations and concrete method bodies.',
    explanation: {
      title: 'Interface Method Implementations',
      text: 'Kotlin interfaces can contain declarations of abstract methods as well as concrete method implementations. Implementing classes can use the default behavior or choose to override it.',
      highlights: ['interface bodies', 'default implementations', 'optional override']
    }
  },
  {
    id: 'w5-l3-c4',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'inheritance-interfaces',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Interfaces • Disambiguating Multiple Defaults',
    skill: 'interfaces',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by resolving conflicting interface methods with super<Clickable>?',
    codeFileName: 'Conflict.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'interface Clickable {',
      '    fun show() = "Click"',
      '}',
      'interface Focusable {',
      '    fun show() = "Focus"',
      '}',
      'class Button : Clickable, Focusable {',
      '    override fun show(): String {',
      '        return super<Clickable>.show() + "!"',
      '    }',
      '}',
      'println(Button().show())'
    ],
    options: [
      { id: 'A', title: 'Click!', subtitle: 'super<Clickable>.show() returns "Click", concatenated with "!"', isCorrect: true },
      { id: 'B', title: 'Focus!', subtitle: 'Calls Focusable implementation', isCorrect: false },
      { id: 'C', title: 'ClickFocus!', subtitle: 'Calls both interfaces automatically', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Cannot inherit two interfaces with the same method name', isCorrect: false }
    ],
    hint: 'When two implemented interfaces provide identical method signatures, Kotlin requires using `super<InterfaceName>.method()` to disambiguate.',
    explanation: {
      title: 'Supertype Disambiguation with super<T>',
      text: 'When multiple supertypes provide conflicting default method implementations, the subclass must override the method and can resolve ambiguity using `super<TypeName>.method()`.',
      highlights: ['super<TypeName>', 'conflict resolution', 'diamond problem']
    }
  },
  {
    id: 'w5-l3-c5',
    challengeType: 'code-completion',
    worldId: 'world-5',
    lessonId: 'inheritance-interfaces',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Inheritance • Mandatory Override Modifier',
    skill: 'inheritance',
    difficulty: 1,
    xpReward: 20,
    question: 'Fill in the blank with the mandatory modifier required when providing a subclass implementation.',
    codeFileName: 'Circle.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'open class Shape {',
      '    open fun draw() = println("Shape")',
      '}',
      'class Circle : Shape() {',
      '    ________ fun draw() = println("Circle")',
      '}'
    ],
    options: [
      { id: 'A', title: 'override', subtitle: 'Mandatory keyword in Kotlin when overriding superclass members', isCorrect: true },
      { id: 'B', title: 'open', subtitle: 'open allows further subclassing, but does not declare an override', isCorrect: false },
      { id: 'C', title: 'shadow', subtitle: 'Invalid keyword in Kotlin', isCorrect: false },
      { id: 'D', title: 'virtual', subtitle: 'C# keyword, not used in Kotlin', isCorrect: false }
    ],
    hint: 'Kotlin enforces the `override` modifier to prevent accidental method overriding.',
    explanation: {
      title: 'The Mandatory override Modifier',
      text: 'In Kotlin, the `override` modifier is mandatory. If you omit `override`, the compiler produces an error, protecting your codebase against accidental method signature collision.',
      highlights: ['override modifier', 'mandatory', 'compiler safety']
    }
  },

  // =========================================================================
  // LESSON 4: Visibility Modifiers (5 questions)
  // =========================================================================
  {
    id: 'w5-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'visibility-modifiers',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Visibility • Default Visibility',
    skill: 'visibility',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the default visibility modifier for classes, functions, and properties in Kotlin if none is explicitly written?',
    codeFileName: 'DefaultVis.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Service {',
      '    fun process() { ... }',
      '}'
    ],
    options: [
      { id: 'A', title: 'public', subtitle: 'Declarations are visible everywhere by default in Kotlin', isCorrect: true },
      { id: 'B', title: 'package-private', subtitle: 'Java default; does not exist in Kotlin', isCorrect: false },
      { id: 'C', title: 'internal', subtitle: 'Module-wide visibility must be explicitly specified', isCorrect: false },
      { id: 'D', title: 'protected', subtitle: 'Protected must be explicitly specified and applies to subclasses', isCorrect: false }
    ],
    hint: 'Unlike Java (which defaults to package-private), Kotlin makes all declarations public by default.',
    explanation: {
      title: 'Kotlin Visibility Defaults to Public',
      text: 'In Kotlin, if you do not specify a visibility modifier, `public` is used by default. Declarations are visible everywhere that has access to the enclosing scope.',
      highlights: ['public by default', 'no package-private', 'omitted modifier']
    }
  },
  {
    id: 'w5-l4-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'visibility-modifiers',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Visibility • The internal Modifier',
    skill: 'visibility',
    difficulty: 2,
    xpReward: 20,
    question: 'What does the internal visibility modifier mean in Kotlin?',
    codeFileName: 'InternalScope.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'internal class CacheManager {',
      '    internal fun evict() { ... }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Visible anywhere within the same compilation module', subtitle: 'e.g., within the same Gradle module, IntelliJ module, or Maven project', isCorrect: true },
      { id: 'B', title: 'Visible only within the same file', subtitle: 'That is private visibility', isCorrect: false },
      { id: 'C', title: 'Visible only within the same package directory', subtitle: 'Kotlin has no package-private modifier', isCorrect: false },
      { id: 'D', title: 'Visible only to subclasses across modules', subtitle: 'That is protected visibility', isCorrect: false }
    ],
    hint: 'A "module" in Kotlin corresponds to a set of compiled files, such as a Gradle source set.',
    explanation: {
      title: 'The internal Module-Level Modifier',
      text: 'The `internal` modifier means the declaration is visible everywhere within the same compilation module (such as a Gradle project or Maven module), but completely invisible to other external modules depending on it.',
      highlights: ['internal', 'compilation module', 'module boundaries']
    }
  },
  {
    id: 'w5-l4-c3',
    challengeType: 'bug-fix',
    worldId: 'world-5',
    lessonId: 'visibility-modifiers',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Visibility • Protected on Top-Level Declarations',
    skill: 'visibility',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does this top-level function declaration in Security.kt fail to compile?',
    codeFileName: 'Security.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// File: Security.kt',
      'protected fun hashPassword(raw: String): String {',
      '    return raw.reversed()',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'protected is not allowed on top-level declarations', subtitle: 'protected is only applicable to members inside a class or interface', isCorrect: true },
      { id: 'B', title: 'Top-level functions cannot accept String parameters', subtitle: 'Function signatures have no such restriction', isCorrect: false },
      { id: 'C', title: 'Functions must always be wrapped in a class in Kotlin', subtitle: 'Kotlin fully supports top-level functions', isCorrect: false },
      { id: 'D', title: 'Top-level functions can only be public', subtitle: 'They can also be private or internal', isCorrect: false }
    ],
    hint: 'Since top-level declarations have no enclosing class to subclass, "protected" has no meaningful definition there.',
    explanation: {
      title: 'Top-Level Visibility Restrictions',
      text: 'Top-level declarations (outside any class) can only be `public`, `private` (visible within that file), or `internal` (visible within the module). `protected` is not permitted top-level because there are no subclasses.',
      highlights: ['protected forbidden top-level', 'file private', 'internal module']
    }
  },
  {
    id: 'w5-l4-c4',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'visibility-modifiers',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Visibility • Encapsulation with private set',
    skill: 'visibility',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by accessing this BankAccount instance with private set?',
    codeFileName: 'BankAccount.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class BankAccount(val id: String, initBalance: Double) {',
      '    var balance: Double = initBalance',
      '        private set',
      '    fun deposit(amount: Double) { balance += amount }',
      '}',
      'val acc = BankAccount("A1", 100.0)',
      'acc.deposit(50.0)',
      'println("${acc.id}: ${acc.balance}")'
    ],
    options: [
      { id: 'A', title: 'A1: 150.0', subtitle: 'Getter is public (readable), but setter is private (only mutable inside BankAccount)', isCorrect: true },
      { id: 'B', title: 'A1: 100.0', subtitle: 'deposit failed to mutate balance', isCorrect: false },
      { id: 'C', title: 'Compilation Error: balance is private', subtitle: 'Only the setter is private; the property itself is public', isCorrect: false },
      { id: 'D', title: 'A1: null', subtitle: 'balance was reset', isCorrect: false }
    ],
    hint: 'Kotlin lets you set different visibility for a property getter and setter: `private set` allows reading publicly while restricting mutation to the class.',
    explanation: {
      title: 'Public Getter with private set',
      text: 'By declaring `var balance: Double ... private set`, external code can freely read `acc.balance`, but only internal methods of `BankAccount` (like `deposit`) can assign to `balance`.',
      highlights: ['private set', 'read-only externally', 'encapsulation']
    }
  },
  {
    id: 'w5-l4-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'visibility-modifiers',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Visibility • Private Top-Level Scope',
    skill: 'visibility',
    difficulty: 2,
    xpReward: 20,
    question: 'If a top-level function or class is marked private in Kotlin, where can it be called or referenced?',
    codeFileName: 'Utils.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// File: Utils.kt',
      'private fun sanitize(input: String): String = input.trim()'
    ],
    options: [
      { id: 'A', title: 'Only inside the same file (Utils.kt)', subtitle: 'Private top-level declarations are scoped strictly to the declaring file', isCorrect: true },
      { id: 'B', title: 'Anywhere in the same package', subtitle: 'Kotlin does not have package-level private scoping', isCorrect: false },
      { id: 'C', title: 'Only by classes declared inside Utils.kt', subtitle: 'Other top-level functions in Utils.kt can also access it', isCorrect: false },
      { id: 'D', title: 'Nowhere; private top-level declarations are illegal', subtitle: 'They are legal and widely used for file-scoped helpers', isCorrect: false }
    ],
    hint: 'In Kotlin, top-level `private` means private to the file in which it is declared.',
    explanation: {
      title: 'File-Scoped Private Declarations',
      text: 'When a top-level declaration is marked `private`, it is visible only within the file where it is declared. No other file in the same package or module can see or invoke it.',
      highlights: ['file-scoped', 'private top-level', 'Utils.kt']
    }
  },

  // =========================================================================
  // LESSON 5: Objects, Singletons & Companion Objects (5 questions)
  // =========================================================================
  {
    id: 'w5-l5-c1',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'objects-singletons',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Objects • Singleton Declarations',
    skill: 'objects',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by accessing this object declaration across multiple calls?',
    codeFileName: 'AppConfig.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'object AppConfig {',
      '    var connectionCount: Int = 0',
      '    fun connect() { connectionCount++ }',
      '}',
      'AppConfig.connect()',
      'AppConfig.connect()',
      'println(AppConfig.connectionCount)'
    ],
    options: [
      { id: 'A', title: '2', subtitle: 'object declares a thread-safe singleton instance shared across all calls', isCorrect: true },
      { id: 'B', title: '1', subtitle: 'Each access created a new instance', isCorrect: false },
      { id: 'C', title: '0', subtitle: 'The mutations were lost', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Cannot invoke methods on an object without new', isCorrect: false }
    ],
    hint: 'Kotlin\'s `object` keyword creates a singleton: exactly one instance exists for the entire application.',
    explanation: {
      title: 'The object Singleton Declaration',
      text: 'An `object` declaration creates a thread-safe, lazily initialized singleton. There is exactly one instance of `AppConfig`, so calling `connect()` twice increments `connectionCount` to 2.',
      highlights: ['object declaration', 'singleton', 'thread-safe']
    }
  },
  {
    id: 'w5-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'objects-singletons',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Objects • Companion Object Factory Pattern',
    skill: 'companion_object',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by calling the companion object factory method?',
    codeFileName: 'UserFactory.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Member private constructor(val email: String) {',
      '    companion object {',
      '        fun createGuest(): Member = Member("guest@example.com")',
      '    }',
      '}',
      'val m = Member.createGuest()',
      'println(m.email)'
    ],
    options: [
      { id: 'A', title: 'guest@example.com', subtitle: 'Companion objects have full access to private constructors of the enclosing class', isCorrect: true },
      { id: 'B', title: 'Compilation Error: constructor is private', subtitle: 'Companion objects can freely access private members of the enclosing class', isCorrect: false },
      { id: 'C', title: 'Member.createGuest', subtitle: 'The function returns a Member instance, not string name', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'The constructor initializes email with "guest@example.com"', isCorrect: false }
    ],
    hint: 'A companion object is tied to the class definition and can access its private constructors, making it the ideal factory.',
    explanation: {
      title: 'Companion Objects as Factories',
      text: 'Members of a companion object can be accessed directly using the class name (e.g., `Member.createGuest()`). Furthermore, companion objects have privileged access to private constructors of the enclosing class.',
      highlights: ['companion object', 'factory method', 'private constructor']
    }
  },
  {
    id: 'w5-l5-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'objects-singletons',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Objects • Companion Object Cardinality',
    skill: 'companion_object',
    difficulty: 2,
    xpReward: 20,
    question: 'How many companion objects can a single Kotlin class define?',
    codeFileName: 'MultiCompanion.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class Sample {',
      '    companion object Factory',
      '    // Can we add another companion object here?',
      '}'
    ],
    options: [
      { id: 'A', title: 'At most one companion object per class', subtitle: 'A class can only have one companion object, though it can contain multiple named objects', isCorrect: true },
      { id: 'B', title: 'Up to two (one public, one internal)', subtitle: 'There is a strict limit of one', isCorrect: false },
      { id: 'C', title: 'As many as needed if each has a unique name', subtitle: 'Only one can be marked with the companion keyword', isCorrect: false },
      { id: 'D', title: 'None; companion objects are only allowed in interfaces', subtitle: 'Classes frequently define companion objects', isCorrect: false }
    ],
    hint: 'A class can define regular nested objects, but at most ONE companion object.',
    explanation: {
      title: 'At Most One Companion Object',
      text: 'Each Kotlin class can declare at most one companion object. If you need additional singletons nested inside a class, you can declare regular nested objects (e.g., `object Utils`), but only one can have the `companion` modifier.',
      highlights: ['at most one', 'companion keyword', 'nested objects']
    }
  },
  {
    id: 'w5-l5-c4',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'objects-singletons',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Objects • Anonymous Object Expressions',
    skill: 'objects',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when an anonymous object expression implements an interface?',
    codeFileName: 'AnonObject.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'interface ClickListener {',
      '    fun onClick(): String',
      '}',
      'val listener = object : ClickListener {',
      '    override fun onClick() = "Handled"',
      '}',
      'println(listener.onClick())'
    ],
    options: [
      { id: 'A', title: 'Handled', subtitle: 'object : Interface { ... } creates an anonymous class instance', isCorrect: true },
      { id: 'B', title: 'ClickListener', subtitle: 'Prints the interface name instead of the method return', isCorrect: false },
      { id: 'C', title: 'null', subtitle: 'onClick() returns a non-null String', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Object expressions require a class keyword', isCorrect: false }
    ],
    hint: 'In Kotlin, `object : SuperType { ... }` replaces Java\'s anonymous inner class syntax.',
    explanation: {
      title: 'Anonymous Object Expressions',
      text: 'Object expressions are executed (and initialized) immediately where they are defined. `object : ClickListener { ... }` creates an anonymous implementation of `ClickListener`, printing "Handled".',
      highlights: ['object expression', 'anonymous class', 'immediate initialization']
    }
  },
  {
    id: 'w5-l5-c5',
    challengeType: 'code-completion',
    worldId: 'world-5',
    lessonId: 'objects-singletons',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Objects • The companion Keyword',
    skill: 'companion_object',
    difficulty: 1,
    xpReward: 20,
    question: 'Fill in the blank with the keyword that allows constants to be called as NetworkClient.TIMEOUT_MS.',
    codeFileName: 'Constants.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class NetworkClient {',
      '    _________ object {',
      '        const val TIMEOUT_MS = 5000',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'companion', subtitle: 'Binds the object members directly to the class name scope', isCorrect: true },
      { id: 'B', title: 'static', subtitle: 'Java keyword, not valid for object declarations in Kotlin', isCorrect: false },
      { id: 'C', title: 'shared', subtitle: 'Invalid keyword in Kotlin', isCorrect: false },
      { id: 'D', title: 'singleton', subtitle: 'Invalid keyword in Kotlin', isCorrect: false }
    ],
    hint: 'The `companion` modifier designates the object as the companion of the containing class.',
    explanation: {
      title: 'Declaring a companion object',
      text: 'Using `companion object` allows members like `const val TIMEOUT_MS` to be called directly via `NetworkClient.TIMEOUT_MS`, providing clean, idiomatic static-like access.',
      highlights: ['companion object', 'static-like access', 'const val']
    }
  },

  // =========================================================================
  // LESSON 6: Sealed Classes & Exhaustive Hierarchies (5 questions)
  // =========================================================================
  {
    id: 'w5-l6-c1',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'sealed-classes',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Sealed Classes • Exhaustive Pattern Matching',
    skill: 'sealed_classes',
    difficulty: 1,
    xpReward: 25,
    question: 'What is printed by evaluating this sealed UI state hierarchy in when?',
    codeFileName: 'UIState.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed class ScreenState',
      'object Loading : ScreenState()',
      'data class Success(val items: Int) : ScreenState()',
      'data class Error(val msg: String) : ScreenState()',
      '',
      'fun render(state: ScreenState): String = when (state) {',
      '    is Loading -> "Spinning..."',
      '    is Success -> "Loaded ${state.items} items"',
      '    is Error -> "Failed: ${state.msg}"',
      '}',
      'println(render(Success(5)))'
    ],
    options: [
      { id: 'A', title: 'Loaded 5 items', subtitle: 'when expression exhaustively matches Success and smart-casts to access state.items', isCorrect: true },
      { id: 'B', title: 'Spinning...', subtitle: 'First branch was matched incorrectly', isCorrect: false },
      { id: 'C', title: 'Compilation Error: else branch required', subtitle: 'Sealed classes guarantee exhaustiveness so else is not needed', isCorrect: false },
      { id: 'D', title: 'Failed: null', subtitle: 'Error branch was matched', isCorrect: false }
    ],
    hint: 'Because ScreenState is sealed, the compiler knows all possible subclasses, eliminating the need for an else branch.',
    explanation: {
      title: 'Exhaustive Matching on Sealed Classes',
      text: 'Sealed classes represent restricted hierarchies. When using `when` as an expression on a sealed class, the compiler verifies that all subclasses are covered, eliminating the need for an `else` branch and automatically smart-casting in each branch.',
      highlights: ['sealed class', 'exhaustive when', 'smart-cast']
    }
  },
  {
    id: 'w5-l6-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'sealed-classes',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Sealed Classes • Why Else is Not Needed',
    skill: 'sealed_classes',
    difficulty: 2,
    xpReward: 20,
    question: 'Why is an "else" branch NOT required when evaluating a sealed class in a when expression?',
    codeFileName: 'ExhaustiveWhen.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed class Response',
      '// when (resp: Response) { is Ok -> ...; is Err -> ... }'
    ],
    options: [
      { id: 'A', title: 'All direct subclasses are known at compile time within the same package/module', subtitle: 'The compiler mathematically proves all possible cases are handled', isCorrect: true },
      { id: 'B', title: 'Kotlin inserts a hidden default throw statement', subtitle: 'No hidden throw is needed because all types are known', isCorrect: false },
      { id: 'C', title: 'Sealed classes can only have two subclasses', subtitle: 'A sealed class can have any number of subclasses', isCorrect: false },
      { id: 'D', title: 'Because Response inherits directly from Enum', subtitle: 'Sealed classes are not Enums', isCorrect: false }
    ],
    hint: 'All subclasses of a sealed class must be declared within the same package and module.',
    explanation: {
      title: 'Compile-Time Closed Hierarchies',
      text: 'A sealed class has a strictly closed set of subclasses known at compile time. This allows the Kotlin compiler to guarantee that every possible subclass is handled in a `when` expression.',
      highlights: ['closed hierarchy', 'compile-time proof', 'exhaustive when']
    }
  },
  {
    id: 'w5-l6-c3',
    challengeType: 'bug-fix',
    worldId: 'world-5',
    lessonId: 'sealed-classes',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Sealed Classes • Cannot Directly Instantiate',
    skill: 'sealed_classes',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does attempting to create "Result()" fail to compile?',
    codeFileName: 'SealedInstantiate.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed class Result',
      'data class Ok(val value: String) : Result()',
      'val r = Result()'
    ],
    buggyLineIndex: 2,
    options: [
      { id: 'A', title: 'Sealed classes are abstract by default and cannot be instantiated directly', subtitle: 'You can only instantiate concrete subclasses like Ok("test")', isCorrect: true },
      { id: 'B', title: 'Result must declare a public constructor explicitly', subtitle: 'Sealed class constructors are protected by design', isCorrect: false },
      { id: 'C', title: 'Result must be marked with the open modifier', subtitle: 'Sealed classes are already open to their subclasses', isCorrect: false },
      { id: 'D', title: 'Data class subclasses are not permitted for sealed classes', subtitle: 'Data classes are the most common subclass of sealed classes', isCorrect: false }
    ],
    hint: 'Sealed classes are inherently abstract base classes.',
    explanation: {
      title: 'Sealed Classes are Abstract',
      text: 'A sealed class is abstract by definition. Its constructors are `protected` (or `private`), meaning it cannot be instantiated directly. You only create instances of its subclasses (like `Ok`).',
      highlights: ['abstract by default', 'cannot instantiate', 'subclasses only']
    }
  },
  {
    id: 'w5-l6-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-5',
    lessonId: 'sealed-classes',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Sealed Classes • Sealed Classes vs Enum Classes',
    skill: 'sealed_classes',
    difficulty: 2,
    xpReward: 20,
    question: 'What is the primary architectural difference between an enum class and a sealed class?',
    codeFileName: 'EnumVsSealed.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'enum class Direction { NORTH, SOUTH }',
      'sealed class NetworkState'
    ],
    options: [
      { id: 'A', title: 'Enum constants are fixed singletons; sealed class subclasses can hold distinct instance state', subtitle: 'e.g., Error(val code: Int) can have different codes per instance', isCorrect: true },
      { id: 'B', title: 'Enums can inherit from classes, while sealed classes cannot', subtitle: 'Enums cannot inherit from classes; sealed classes can', isCorrect: false },
      { id: 'C', title: 'Sealed classes cannot be used in when expressions', subtitle: 'Sealed classes excel in when expressions', isCorrect: false },
      { id: 'D', title: 'Enum classes can be extended outside their file', subtitle: 'Enums cannot be extended at all', isCorrect: false }
    ],
    hint: 'Each enum constant is a single instance. Sealed class subclasses can be instantiated multiple times with unique data.',
    explanation: {
      title: 'Enums vs Sealed Classes',
      text: 'Enum entries represent single instances of fixed constant types. Sealed classes allow subclasses (often `data class`) to be instantiated multiple times with distinct dynamic state (e.g. `Success(data)` vs `Error(code, message)`).',
      highlights: ['distinct state', 'data subclasses', 'instance flexibility']
    }
  },
  {
    id: 'w5-l6-c5',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'sealed-classes',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'Sealed Classes • Sealed Interfaces',
    skill: 'sealed_classes',
    difficulty: 3,
    xpReward: 25,
    question: 'What is printed by evaluating this sealed interface hierarchy?',
    codeFileName: 'SealedInterface.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed interface Command',
      'data class Move(val dx: Int) : Command',
      'object Halt : Command',
      '',
      'fun execute(cmd: Command): Int = when (cmd) {',
      '    is Move -> cmd.dx * 10',
      '    Halt -> 0',
      '}',
      'val c: Command = Move(4)',
      'println(execute(c))'
    ],
    options: [
      { id: 'A', title: '40', subtitle: 'Move(4) matches is Move, smart-casting to access cmd.dx * 10 = 40', isCorrect: true },
      { id: 'B', title: '4', subtitle: 'Multiplication by 10 was omitted', isCorrect: false },
      { id: 'C', title: '0', subtitle: 'Halt branch was matched', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Sealed interfaces are not allowed in Kotlin', isCorrect: false }
    ],
    hint: 'Kotlin 1.5+ supports `sealed interface`. They work just like sealed classes but allow classes to implement multiple sealed hierarchies.',
    explanation: {
      title: 'Sealed Interfaces in Modern Kotlin',
      text: 'Kotlin supports `sealed interface`. They provide the exact same exhaustive matching guarantees as sealed classes, but allow classes to implement multiple sealed hierarchies simultaneously.',
      highlights: ['sealed interface', 'multiple hierarchies', 'smart-cast']
    }
  },

  // =========================================================================
  // WORLD BOSS: Object Architect (1 Boss challenge)
  // =========================================================================
  {
    id: 'w5-boss-01',
    challengeType: 'output-prediction',
    worldId: 'world-5',
    lessonId: 'oop-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Classes & Object-Oriented Kotlin',
    topicTag: 'World Boss • Object-Oriented Architecture',
    skill: 'oop-boss',
    difficulty: 3,
    xpReward: 50,
    isBoss: true,
    question: 'WORLD BOSS: Trace this transaction processing pipeline combining data classes, sealed states, companion factories, and pattern matching. What is the final balance printed?',
    codeFileName: 'ObjectArchitect.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'data class Account(val iban: String, val balance: Int)',
      'sealed class TxResult {',
      '    data class Approved(val account: Account, val fee: Int) : TxResult()',
      '    data class Declined(val reason: String) : TxResult()',
      '}',
      'class PaymentProcessor private constructor(val rate: Double) {',
      '    companion object {',
      '        fun create(): PaymentProcessor = PaymentProcessor(0.10)',
      '    }',
      '    fun process(acc: Account, amount: Int): TxResult {',
      '        val fee = (amount * rate).toInt()',
      '        val total = amount + fee',
      '        return if (acc.balance >= total) {',
      '            TxResult.Approved(acc.copy(balance = acc.balance - total), fee)',
      '        } else {',
      '            TxResult.Declined("Insufficient Funds")',
      '        }',
      '    }',
      '}',
      'val processor = PaymentProcessor.create()',
      'val startAcc = Account("NL01", 150)',
      'val res1 = processor.process(startAcc, 100)',
      'val accAfter = when (res1) {',
      '    is TxResult.Approved -> res1.account',
      '    is TxResult.Declined -> startAcc',
      '}',
      'val res2 = processor.process(accAfter, 50)',
      'val finalBalance = when (res2) {',
      '    is TxResult.Approved -> res2.account.balance',
      '    is TxResult.Declined -> accAfter.balance',
      '}',
      'println("Final: $finalBalance")'
    ],
    options: [
      { id: 'A', title: 'Final: 40', subtitle: 'Tx 1 succeeds (150 - 110 = 40); Tx 2 fails (40 < 55) so balance remains 40', isCorrect: true },
      { id: 'B', title: 'Final: 0', subtitle: 'Assumes both transactions succeeded', isCorrect: false },
      { id: 'C', title: 'Final: 95', subtitle: 'Assumes fee was not included in total deduction', isCorrect: false },
      { id: 'D', title: 'Final: 150', subtitle: 'Assumes first transaction was declined', isCorrect: false }
    ],
    hint: 'Trace Tx 1: amount=100, fee=10, total=110. Account starts at 150. For Tx 2: can the remaining 40 balance cover 50 + 5 fee?',
    explanation: {
      title: 'World Boss: Transaction Processing Pipeline',
      text: 'Step 1: processor rate = 0.10. startAcc balance = 150.\nStep 2: Tx 1 amount = 100. fee = 10, total = 110. 150 >= 110 -> Approved! accAfter balance = 150 - 110 = 40.\nStep 3: Tx 2 amount = 50 on accAfter (balance 40). fee = 5, total = 55. 40 >= 55 is FALSE -> Declined("Insufficient Funds").\nStep 4: The second when matches Declined, keeping accAfter.balance = 40. "Final: 40" is printed.',
      highlights: ['Approved 110 deduction', 'Declined on insufficient funds', 'Final balance 40']
    }
  }
];
