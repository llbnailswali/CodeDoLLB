import { FiveStageLesson } from '../lessonStagesData';

export const INHERITANCE_ABSTRACT_CLASSES_LESSON: FiveStageLesson = {
  id: "world-11-inheritance-abstract-classes", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Inheritance & Abstract Classes",
  learn: { title: "Build Extensible Contracts with open and abstract", subtitle: "Use open and abstract classes deliberately, override behavior safely, and implement every abstract member required by a concrete subclass. Prerequisite: World 8 classes, constructors, inheritance, interfaces, and overriding.", exampleTag: 'EXAMPLE', exampleTitle: "Core Inheritance & Abstract Classes syntax", language: 'Kotlin', codeSnippet: ["abstract class Payment(val amount: Int) {", "    abstract fun fee(): Int", "    open fun label() = \"payment:$amount\"", "}", "class CardPayment(amount: Int) : Payment(amount) {", "    override fun fee() = amount / 20", "}"], explanation: "Use open and abstract classes deliberately, override behavior safely, and implement every abstract member required by a concrete subclass. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Final by default", description: "Ordinary Kotlin classes and members are final. Use open for optional overriding and abstract for required implementation." }, { number: 2, title: "Abstract means incomplete contract", description: "An abstract class cannot be instantiated directly; abstract members have no implementation and concrete subclasses must implement unresolved members." }, { number: 3, title: "Inheritance preserves subtype behavior", description: "A base-typed reference can hold a subclass and overridden members dispatch to the runtime object." }, { number: 4, title: "Prefer inheritance for is-a relationships", description: "Use composition when the goal is only implementation reuse rather than substitutability." }], keyTakeaway: "Use open and abstract classes deliberately, override behavior safely, and implement every abstract member required by a concrete subclass." },
  explore: { title: 'Explore the Concept', subtitle: "8 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-inheritance-abstract-classes-explore-1", number: "01", title: "Open override", language: 'Kotlin', subtitle: "open permits inheritance/override; override supplies runtime behavior.", code: [
      "open class Animal {",
      "    open fun sound() = \"?\"",
      "}",
      "",
      "class Dog : Animal() {",
      "    override fun sound() = \"woof\"",
      "}",
      "",
      "println(Dog().sound())"
    ], whatItMeans: [{ label: 'Behavior', description: "open permits inheritance/override; override supplies runtime behavior." }], whatChanged: "Covers a distinct mapped scenario: Open override." },
    { id: "world-11-inheritance-abstract-classes-explore-2", number: "02", title: "Base reference dispatch", language: 'Kotlin', subtitle: "Overridden members use dynamic dispatch through a base reference.", code: [
      "open class Shape {",
      "    open fun name() = \"shape\"",
      "}",
      "",
      "class Circle : Shape() {",
      "    override fun name() = \"circle\"",
      "}",
      "",
      "val s: Shape = Circle()",
      "println(s.name())"
    ], whatItMeans: [{ label: 'Behavior', description: "Overridden members use dynamic dispatch through a base reference." }], whatChanged: "Covers a distinct mapped scenario: Base reference dispatch." },
    { id: "world-11-inheritance-abstract-classes-explore-3", number: "03", title: "Abstract function obligation", language: 'Kotlin', subtitle: "A concrete subclass implements the abstract function.", code: [
      "abstract class Report {",
      "    abstract fun render(): String",
      "}",
      "",
      "class TextReport : Report() {",
      "    override fun render() = \"text\"",
      "}",
      "",
      "println(TextReport().render())"
    ], whatItMeans: [{ label: 'Behavior', description: "A concrete subclass implements the abstract function." }], whatChanged: "Covers a distinct mapped scenario: Abstract function obligation." },
    { id: "world-11-inheritance-abstract-classes-explore-4", number: "04", title: "Abstract property", language: 'Kotlin', subtitle: "Abstract properties also require concrete implementation.", code: [
      "abstract class Account {",
      "    abstract val kind: String",
      "}",
      "",
      "class Savings : Account() {",
      "    override val kind = \"savings\"",
      "}",
      "",
      "println(Savings().kind)"
    ], whatItMeans: [{ label: 'Behavior', description: "Abstract properties also require concrete implementation." }], whatChanged: "Covers a distinct mapped scenario: Abstract property." },
    { id: "world-11-inheritance-abstract-classes-explore-5", number: "05", title: "Concrete behavior in abstract class", language: 'Kotlin', subtitle: "Abstract classes may hold constructor state and concrete behavior.", code: [
      "abstract class Job(val id: Int) {",
      "    fun tag() = \"job:$id\"",
      "    abstract fun run(): String",
      "}",
      "",
      "class SyncJob(id: Int) : Job(id) {",
      "    override fun run() = \"sync\"",
      "}",
      "",
      "println(SyncJob(7).tag())"
    ], whatItMeans: [{ label: 'Behavior', description: "Abstract classes may hold constructor state and concrete behavior." }], whatChanged: "Covers a distinct mapped scenario: Concrete behavior in abstract class." },
    { id: "world-11-inheritance-abstract-classes-explore-6", number: "06", title: "super call", language: 'Kotlin', subtitle: "super accesses the base implementation.", code: [
      "open class Base {",
      "    open fun text() = \"base\"",
      "}",
      "",
      "class Child : Base() {",
      "    override fun text() = super.text() + \"+child\"",
      "}",
      "",
      "println(Child().text())"
    ], whatItMeans: [{ label: 'Behavior', description: "super accesses the base implementation." }], whatChanged: "Covers a distinct mapped scenario: super call." },
    { id: "world-11-inheritance-abstract-classes-explore-7", number: "07", title: "final override", language: 'Kotlin', subtitle: "An override remains open unless final is used to stop further overriding.", code: [
      "open class A {",
      "    open fun f() = \"A\"",
      "}",
      "",
      "open class B : A() {",
      "    final override fun f() = \"B\"",
      "}",
      "",
      "println(B().f())"
    ], whatItMeans: [{ label: 'Behavior', description: "An override remains open unless final is used to stop further overriding." }], whatChanged: "Covers a distinct mapped scenario: final override." },
    { id: "world-11-inheritance-abstract-classes-explore-8", number: "08", title: "Compile boundary: unresolved abstract member", language: 'Kotlin', subtitle: "A concrete subclass cannot leave an abstract member unresolved.", code: [
      "abstract class Parser {",
      "    abstract fun parse(): Int",
      "}",
      "",
      "// class BadParser : Parser()  // ERROR: parse() is not implemented"
    ], whatItMeans: [{ label: 'Behavior', description: "A concrete subclass cannot leave an abstract member unresolved." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary: unresolved abstract member." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-inheritance-abstract-classes-predict-1", questionNumber: 1, totalQuestions: 8, title: "Dispatch through base type", topicMeta: "output", language: 'Kotlin', code: [
      "open class Device {",
      "    open fun status() = \"base\"",
      "}",
      "",
      "class Phone : Device() {",
      "    override fun status() = \"phone\"",
      "}",
      "",
      "fun main() {",
      "    val d: Device = Phone()",
      "    println(d.status())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "phone", isCorrect: true }, { id: "B", label: "base", isCorrect: false }, { id: "C", label: "Device", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Dispatch through base type", detail: "Overridden status dispatches to Phone at runtime." } },
    { id: "world-11-inheritance-abstract-classes-predict-2", questionNumber: 2, totalQuestions: 8, title: "Abstract instantiation", topicMeta: "compilation", language: 'Kotlin', code: [
      "abstract class Task",
      "",
      "fun main() {",
      "    // val t = Task()",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Task() would fail to compile because Task is abstract.", isCorrect: true }, { id: "B", label: "Task() creates an empty Task.", isCorrect: false }, { id: "C", label: "Task() returns null.", isCorrect: false }, { id: "D", label: "Task() is allowed only in main.", isCorrect: false }], explanation: { codeRef: "Abstract instantiation", detail: "Abstract classes cannot be instantiated." } },
    { id: "world-11-inheritance-abstract-classes-predict-3", questionNumber: 3, totalQuestions: 8, title: "Missing abstract override", topicMeta: "compilation", language: 'Kotlin', code: [
      "abstract class Source {",
      "    abstract fun read(): String",
      "}",
      "",
      "class FileSource : Source()"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "It fails: FileSource must implement read().", isCorrect: true }, { id: "B", label: "It compiles and read() returns an empty string.", isCorrect: false }, { id: "C", label: "It compiles because abstract members are optional.", isCorrect: false }, { id: "D", label: "It fails because Source needs open.", isCorrect: false }], explanation: { codeRef: "Missing abstract override", detail: "Concrete subclasses must implement unresolved abstract members." } },
    { id: "world-11-inheritance-abstract-classes-predict-4", questionNumber: 4, totalQuestions: 8, title: "super behavior", topicMeta: "output", language: 'Kotlin', code: [
      "open class P {",
      "    open fun n() = 2",
      "}",
      "",
      "class C : P() {",
      "    override fun n() = super.n() + 3",
      "}",
      "",
      "fun main() {",
      "    println(C().n())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "5", isCorrect: true }, { id: "B", label: "3", isCorrect: false }, { id: "C", label: "2", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "super behavior", detail: "super.n() returns 2, then Child adds 3." } },
    { id: "world-11-inheritance-abstract-classes-predict-5", questionNumber: 5, totalQuestions: 8, title: "Abstract property", topicMeta: "output", language: 'Kotlin', code: [
      "abstract class User {",
      "    abstract val role: String",
      "}",
      "",
      "class Admin : User() {",
      "    override val role = \"admin\"",
      "}",
      "",
      "fun main() {",
      "    println(Admin().role)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "admin", isCorrect: true }, { id: "B", label: "User", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Abstract property", detail: "Admin supplies the required property." } },
    { id: "world-11-inheritance-abstract-classes-predict-6", questionNumber: 6, totalQuestions: 8, title: "Final override boundary", topicMeta: "compilation", language: 'Kotlin', code: [
      "open class A {",
      "    open fun f() = 1",
      "}",
      "",
      "open class B : A() {",
      "    final override fun f() = 2",
      "}",
      "",
      "// class C : B() { override fun f() = 3 }"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "The commented override in class C would fail because B.f() is final.", isCorrect: true }, { id: "B", label: "Class C may always override B.f().", isCorrect: false }, { id: "C", label: "The final modifier applies only to class B itself.", isCorrect: false }, { id: "D", label: "The code fails because A.f() is open.", isCorrect: false }], explanation: { codeRef: "Final override boundary", detail: "final override closes further overriding." } },
    { id: "world-11-inheritance-abstract-classes-predict-7", questionNumber: 7, totalQuestions: 8, title: "Constructor state", topicMeta: "output", language: 'Kotlin', code: [
      "abstract class Item(val id: Int) {",
      "    fun label() = \"#$id\"",
      "}",
      "",
      "class Book(id: Int) : Item(id)",
      "",
      "fun main() {",
      "    println(Book(4).label())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "#4", isCorrect: true }, { id: "B", label: "4#", isCorrect: false }, { id: "C", label: "Book", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Constructor state", detail: "Abstract classes can have constructor state and concrete functions." } },
    { id: "world-11-inheritance-abstract-classes-predict-8", questionNumber: 8, totalQuestions: 8, title: "Open vs abstract", topicMeta: "behavior", language: 'Kotlin', code: [
      "open class A {",
      "    open fun f() = 1",
      "}",
      "",
      "abstract class B {",
      "    abstract fun f(): Int",
      "}"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "Class A provides optional customization; class B requires a subclass implementation of f().", isCorrect: true }, { id: "B", label: "Both f() functions must be implemented by every subclass.", isCorrect: false }, { id: "C", label: "Neither class A nor abstract class B can be instantiated.", isCorrect: false }, { id: "D", label: "The open and abstract modifiers are synonyms.", isCorrect: false }], explanation: { codeRef: "Open vs abstract", detail: "open supplies an implementation; abstract declares an incomplete contract." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Implement a Concrete Notification", description: "Complete EmailNotification so it implements the abstract channel property and send() function.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "ImplementaConcreteNotification.kt", initialCode: "abstract class Notification {\n    abstract val channel: String\n    abstract fun send(message: String): String\n}\n\nclass EmailNotification : Notification() {\n    // TODO implement channel and send\n}\n\nfun main() {\n    val n: Notification = EmailNotification()\n    println(n.channel)\n    println(n.send(\"Ready\"))\n}", solutionCode: "abstract class Notification {\n    abstract val channel: String\n    abstract fun send(message: String): String\n}\n\nclass EmailNotification : Notification() {\n    override val channel = \"email\"\n    override fun send(message: String) = \"email:$message\"\n}\n\nfun main() {\n    val n: Notification = EmailNotification()\n    println(n.channel)\n    println(n.send(\"Ready\"))\n}", sampleInput: 'main()', expectedOutput: "email\nemail:Ready", testCase: { call: '', expected: "email\nemail:Ready" } },
  debug: { title: "Fix the Missing Override", subtitle: "A concrete exporter leaves one abstract member unresolved.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "abstract class Exporter {\n    abstract fun format(): String\n}\nclass CsvExporter : Exporter() {\n    fun format() = \"csv\"\n}\nfun main(){ println(CsvExporter().format()) }", fixedCode: "abstract class Exporter {\n    abstract fun format(): String\n}\nclass CsvExporter : Exporter() {\n    override fun format() = \"csv\"\n}\nfun main(){ println(CsvExporter().format()) }", expectedOutput: "csv", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Add the required override modifier so the concrete implementation satisfies the abstract contract." },
  mastered: { topicTitle: "Inheritance & Abstract Classes", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "8 / 8 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "8 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "8 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const INTERFACES_MULTIPLE_INTERFACE_IMPLEMENTATION_LESSON: FiveStageLesson = {
  id: "world-11-interfaces-multiple-interface-implementation", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Interfaces & Multiple Interface Implementation",
  learn: { title: "Compose Capabilities with Multiple Interfaces", subtitle: "Implement multiple behavioral contracts, use defaults safely, and resolve conflicting interface implementations explicitly. Prerequisite: World 8 interfaces and overriding; World 11 inheritance basics.", exampleTag: 'EXAMPLE', exampleTitle: "Core Interfaces & Multiple Interface Implementation syntax", language: 'Kotlin', codeSnippet: ["interface Printable { fun print() = \"print\" }", "interface Savable { fun save(): String }", "class Document : Printable, Savable {", "    override fun save() = \"save\"", "}"], explanation: "Implement multiple behavioral contracts, use defaults safely, and resolve conflicting interface implementations explicitly. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Interfaces model capabilities", description: "A class can implement multiple interfaces while extending at most one class." }, { number: 2, title: "Defaults are real implementations", description: "Interface members may provide default bodies; abstract members still require implementation." }, { number: 3, title: "Conflicts must be resolved", description: "If immediate supertypes provide the same member implementation, the class must override it." }, { number: 4, title: "Qualified super selects a default", description: "Use super<InterfaceName>.member() inside the resolving override." }], keyTakeaway: "Implement multiple behavioral contracts, use defaults safely, and resolve conflicting interface implementations explicitly." },
  explore: { title: 'Explore the Concept', subtitle: "7 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-interfaces-multiple-interface-implementation-explore-1", number: "01", title: "Two interfaces", language: 'Kotlin', subtitle: "One class can implement independent interface capabilities.", code: [
      "interface Readable {",
      "    fun read() = \"read\"",
      "}",
      "interface Writable {",
      "    fun write() = \"write\"",
      "}",
      "class File : Readable, Writable",
      "",
      "println(File().read() + \":\" + File().write())"
    ], whatItMeans: [{ label: 'Behavior', description: "One class can implement independent interface capabilities." }], whatChanged: "Covers a distinct mapped scenario: Two interfaces." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-2", number: "02", title: "Abstract + default member", language: 'Kotlin', subtitle: "A class implements the abstract member and inherits the default.", code: [
      "interface Logger {",
      "    fun name(): String",
      "    fun log() = \"log:${name()}\"",
      "}",
      "class App : Logger {",
      "    override fun name() = \"app\"",
      "}",
      "",
      "println(App().log())"
    ], whatItMeans: [{ label: 'Behavior', description: "A class implements the abstract member and inherits the default." }], whatChanged: "Covers a distinct mapped scenario: Abstract + default member." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-3", number: "03", title: "Interface reference polymorphism", language: 'Kotlin', subtitle: "Calls through an interface reference dispatch to the implementation.", code: [
      "interface Payable {",
      "    fun pay(): String",
      "}",
      "class Card : Payable {",
      "    override fun pay() = \"card\"",
      "}",
      "",
      "val p: Payable = Card()",
      "println(p.pay())"
    ], whatItMeans: [{ label: 'Behavior', description: "Calls through an interface reference dispatch to the implementation." }], whatChanged: "Covers a distinct mapped scenario: Interface reference polymorphism." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-4", number: "04", title: "Conflict resolution", language: 'Kotlin', subtitle: "Conflicting defaults require an override and can call qualified super implementations.", code: [
      "interface A {",
      "    fun label() = \"A\"",
      "}",
      "interface B {",
      "    fun label() = \"B\"",
      "}",
      "class C : A, B {",
      "    override fun label() = super<A>.label() + super<B>.label()",
      "}",
      "",
      "println(C().label())"
    ], whatItMeans: [{ label: 'Behavior', description: "Conflicting defaults require an override and can call qualified super implementations." }], whatChanged: "Covers a distinct mapped scenario: Conflict resolution." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-5", number: "05", title: "One implementation satisfies matching abstracts", language: 'Kotlin', subtitle: "One override can satisfy matching abstract signatures from multiple interfaces.", code: [
      "interface X {",
      "    fun id(): Int",
      "}",
      "interface Y {",
      "    fun id(): Int",
      "}",
      "class Z : X, Y {",
      "    override fun id() = 7",
      "}",
      "",
      "println(Z().id())"
    ], whatItMeans: [{ label: 'Behavior', description: "One override can satisfy matching abstract signatures from multiple interfaces." }], whatChanged: "Covers a distinct mapped scenario: One implementation satisfies matching abstracts." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-6", number: "06", title: "Class plus interfaces", language: 'Kotlin', subtitle: "A class may extend one class and implement multiple interfaces.", code: [
      "open class Base(val id: Int)",
      "interface Named {",
      "    fun name(): String",
      "}",
      "interface Active {",
      "    fun active() = true",
      "}",
      "class User(id: Int) : Base(id), Named, Active {",
      "    override fun name() = \"u$id\"",
      "}",
      "",
      "println(User(3).name())"
    ], whatItMeans: [{ label: 'Behavior', description: "A class may extend one class and implement multiple interfaces." }], whatChanged: "Covers a distinct mapped scenario: Class plus interfaces." },
    { id: "world-11-interfaces-multiple-interface-implementation-explore-7", number: "07", title: "Compile boundary: unresolved default conflict", language: 'Kotlin', subtitle: "Kotlin rejects ambiguous inherited implementations.", code: [
      "interface A {",
      "    fun f() = 1",
      "}",
      "interface B {",
      "    fun f() = 2",
      "}",
      "",
      "// class C : A, B // ERROR: must override f"
    ], whatItMeans: [{ label: 'Behavior', description: "Kotlin rejects ambiguous inherited implementations." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary: unresolved default conflict." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-interfaces-multiple-interface-implementation-predict-1", questionNumber: 1, totalQuestions: 7, title: "Two capabilities", topicMeta: "output", language: 'Kotlin', code: [
      "interface A {",
      "    fun a() = \"A\"",
      "}",
      "interface B {",
      "    fun b() = \"B\"",
      "}",
      "class C : A, B",
      "",
      "fun main() {",
      "    val c = C()",
      "    println(c.a() + c.b())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "AB", isCorrect: true }, { id: "B", label: "A", isCorrect: false }, { id: "C", label: "B", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Two capabilities", detail: "C inherits non-conflicting defaults from both interfaces." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-2", questionNumber: 2, totalQuestions: 7, title: "Conflict compilation", topicMeta: "compilation", language: 'Kotlin', code: [
      "interface A {",
      "    fun x() = 1",
      "}",
      "interface B {",
      "    fun x() = 2",
      "}",
      "class C : A, B"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "It fails because C must override x().", isCorrect: true }, { id: "B", label: "It prints 1.", isCorrect: false }, { id: "C", label: "It prints 2.", isCorrect: false }, { id: "D", label: "Kotlin chooses the first interface.", isCorrect: false }], explanation: { codeRef: "Conflict compilation", detail: "Conflicting immediate implementations are ambiguous." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-3", questionNumber: 3, totalQuestions: 7, title: "Qualified super", topicMeta: "output", language: 'Kotlin', code: [
      "interface L {",
      "    fun n() = 2",
      "}",
      "interface R {",
      "    fun n() = 5",
      "}",
      "class Both : L, R {",
      "    override fun n() = super<L>.n() + super<R>.n()",
      "}",
      "",
      "fun main() {",
      "    println(Both().n())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "7", isCorrect: true }, { id: "B", label: "2", isCorrect: false }, { id: "C", label: "5", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Qualified super", detail: "The override explicitly combines both defaults." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-4", questionNumber: 4, totalQuestions: 7, title: "Single override satisfies two contracts", topicMeta: "output", language: 'Kotlin', code: [
      "interface P {",
      "    fun code(): String",
      "}",
      "interface Q {",
      "    fun code(): String",
      "}",
      "class R : P, Q {",
      "    override fun code() = \"ok\"",
      "}",
      "",
      "fun main() {",
      "    println(R().code())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "ok", isCorrect: true }, { id: "B", label: "P", isCorrect: false }, { id: "C", label: "Q", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Single override satisfies two contracts", detail: "Matching abstract contracts can be satisfied by one implementation." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-5", questionNumber: 5, totalQuestions: 7, title: "Interface reference", topicMeta: "dispatch", language: 'Kotlin', code: [
      "interface Runner {",
      "    fun run(): String",
      "}",
      "class Fast : Runner {",
      "    override fun run() = \"fast\"",
      "}",
      "",
      "fun main() {",
      "    val r: Runner = Fast()",
      "    println(r.run())",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The call dispatches to Fast.run() and prints fast.", isCorrect: true }, { id: "B", label: "The interface body runs and prints Runner.", isCorrect: false }, { id: "C", label: "The call is statically blocked.", isCorrect: false }, { id: "D", label: "It prints null.", isCorrect: false }], explanation: { codeRef: "Interface reference", detail: "Interface references support polymorphic calls." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-6", questionNumber: 6, totalQuestions: 7, title: "Class and interface", topicMeta: "output", language: 'Kotlin', code: [
      "open class Base {",
      "    open fun n() = 1",
      "}",
      "interface Extra {",
      "    fun e() = 2",
      "}",
      "class C : Base(), Extra",
      "",
      "fun main() {",
      "    println(C().n() + C().e())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "1", isCorrect: false }, { id: "C", label: "2", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Class and interface", detail: "C inherits Base.n and Extra.e." } },
    { id: "world-11-interfaces-multiple-interface-implementation-predict-7", questionNumber: 7, totalQuestions: 7, title: "Interface constructor misconception", topicMeta: "compilation", language: 'Kotlin', code: [
      "interface Service",
      "",
      "// val s = Service()"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Service() is invalid because interfaces do not have constructors.", isCorrect: true }, { id: "B", label: "Service() creates an anonymous implementation.", isCorrect: false }, { id: "C", label: "Service() returns a singleton.", isCorrect: false }, { id: "D", label: "It is valid only with no members.", isCorrect: false }], explanation: { codeRef: "Interface constructor misconception", detail: "Interfaces are contracts, not directly constructible classes." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Resolve Two Formatting Contracts", description: "Implement Report so it satisfies both interfaces and explicitly combines their conflicting label() defaults.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "ResolveTwoFormattingContracts.kt", initialCode: "interface ShortLabel { fun label() = \"short\" }\ninterface DetailedLabel { fun label() = \"detailed\" }\n\nclass Report : ShortLabel, DetailedLabel {\n    // TODO resolve label conflict\n}\n\nfun main(){ println(Report().label()) }", solutionCode: "interface ShortLabel { fun label() = \"short\" }\ninterface DetailedLabel { fun label() = \"detailed\" }\n\nclass Report : ShortLabel, DetailedLabel {\n    override fun label() = super<ShortLabel>.label() + \"+\" + super<DetailedLabel>.label()\n}\n\nfun main(){ println(Report().label()) }", sampleInput: 'main()', expectedOutput: "short+detailed", testCase: { call: '', expected: "short+detailed" } },
  debug: { title: "Fix the Interface Conflict", subtitle: "Two defaults collide and the class does not resolve them.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "interface Light { fun mode() = \"light\" }\ninterface Dark { fun mode() = \"dark\" }\nclass Theme : Light, Dark\nfun main(){ println(Theme().mode()) }", fixedCode: "interface Light { fun mode() = \"light\" }\ninterface Dark { fun mode() = \"dark\" }\nclass Theme : Light, Dark {\n    override fun mode() = super<Dark>.mode()\n}\nfun main(){ println(Theme().mode()) }", expectedOutput: "dark", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Override the conflicting member and explicitly choose the intended super-interface implementation." },
  mastered: { topicTitle: "Interfaces & Multiple Interface Implementation", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "7 / 7 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "7 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "7 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const SEALED_CLASSES_SEALED_INTERFACES_LESSON: FiveStageLesson = {
  id: "world-11-sealed-classes-sealed-interfaces", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Sealed Classes & Sealed Interfaces",
  learn: { title: "Model Closed State Families with sealed", subtitle: "Model a deliberately closed family of states and use compiler-checked exhaustive when expressions. Prerequisite: Classes, interfaces, inheritance, when expressions, data classes, objects.", exampleTag: 'EXAMPLE', exampleTitle: "Core Sealed Classes & Sealed Interfaces syntax", language: 'Kotlin', codeSnippet: [
    "sealed interface LoadState",
    "data object Loading : LoadState",
    "data class Ready(val count: Int) : LoadState",
    "data class Failed(val message: String) : LoadState",
    "",
    "fun label(s: LoadState) = when (s) {",
    "    Loading -> \"loading\"",
    "    is Ready -> \"ready:${s.count}\"",
    "    is Failed -> \"failed:${s.message}\"",
    "}"
  ], explanation: "Model a deliberately closed family of states and use compiler-checked exhaustive when expressions. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Closed direct hierarchy", description: "Sealed types restrict direct subclasses/implementations to the permitted Kotlin package/module rules." }, { number: 2, title: "Exhaustive when", description: "When every sealed alternative is covered, a when expression needs no else and the compiler checks future omissions." }, { number: 3, title: "Variants can have different shapes", description: "Unlike enum constants, sealed variants can be different classes/objects with different payloads." }, { number: 4, title: "Sealed class vs interface", description: "A sealed class can share constructor state/implementation; a sealed interface supports flexible multiple contracts." }], keyTakeaway: "Model a deliberately closed family of states and use compiler-checked exhaustive when expressions." },
  explore: { title: 'Explore the Concept', subtitle: "7 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-sealed-classes-sealed-interfaces-explore-1", number: "01", title: "Object and data variants", language: 'Kotlin', subtitle: "Sealed families can mix singleton and data-carrying variants.", code: [
      "sealed interface Result",
      "data object Busy : Result",
      "data class Ok(val value: Int) : Result",
      "",
      "println(Ok(3))"
    ], whatItMeans: [{ label: 'Behavior', description: "Sealed families can mix singleton and data-carrying variants." }], whatChanged: "Covers a distinct mapped scenario: Object and data variants." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-2", number: "02", title: "Exhaustive when", language: 'Kotlin', subtitle: "All direct cases are covered without else.", code: [
      "sealed interface State",
      "data object On : State",
      "data object Off : State",
      "",
      "fun text(s: State) = when (s) {",
      "    On -> \"on\"",
      "    Off -> \"off\"",
      "}",
      "",
      "println(text(On))"
    ], whatItMeans: [{ label: 'Behavior', description: "All direct cases are covered without else." }], whatChanged: "Covers a distinct mapped scenario: Exhaustive when." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-3", number: "03", title: "Sealed class shared state", language: 'Kotlin', subtitle: "A sealed class can carry common constructor state.", code: [
      "sealed class Error(val code: Int)",
      "class Network : Error(503)",
      "class Auth : Error(401)",
      "",
      "println(Network().code)"
    ], whatItMeans: [{ label: 'Behavior', description: "A sealed class can carry common constructor state." }], whatChanged: "Covers a distinct mapped scenario: Sealed class shared state." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-4", number: "04", title: "Sealed interface multiple contract", language: 'Kotlin', subtitle: "A sealed interface can participate alongside other interfaces.", code: [
      "sealed interface Event",
      "interface Logged",
      "data object Start : Event, Logged",
      "",
      "println(Start is Logged)"
    ], whatItMeans: [{ label: 'Behavior', description: "A sealed interface can participate alongside other interfaces." }], whatChanged: "Covers a distinct mapped scenario: Sealed interface multiple contract." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-5", number: "05", title: "Enum comparison", language: 'Kotlin', subtitle: "Enum entries share one enum shape; sealed variants can carry structurally different data.", code: [
      "enum class Direction { NORTH, SOUTH }",
      "sealed interface Message",
      "data class Text(val value: String) : Message"
    ], whatItMeans: [{ label: 'Behavior', description: "Enum entries share one enum shape; sealed variants can carry structurally different data." }], whatChanged: "Covers a distinct mapped scenario: Enum comparison." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-6", number: "06", title: "Compile boundary: sealed instantiation", language: 'Kotlin', subtitle: "A sealed class cannot be instantiated directly.", code: [
      "sealed class Token",
      "",
      "// val t = Token() // ERROR: sealed class is abstract"
    ], whatItMeans: [{ label: 'Behavior', description: "A sealed class cannot be instantiated directly." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary: sealed instantiation." },
    { id: "world-11-sealed-classes-sealed-interfaces-explore-7", number: "07", title: "Compile boundary: missing when branch", language: 'Kotlin', subtitle: "Compiler exhaustiveness is a language rule, not a simulator guess.", code: [
      "sealed interface Flag",
      "data object A : Flag",
      "data object B : Flag",
      "",
      "// fun f(x: Flag) = when (x) { A -> 1 } // ERROR: when is not exhaustive"
    ], whatItMeans: [{ label: 'Behavior', description: "Compiler exhaustiveness is a language rule, not a simulator guess." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary: missing when branch." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-sealed-classes-sealed-interfaces-predict-1", questionNumber: 1, totalQuestions: 7, title: "Exhaustive state", topicMeta: "output", language: 'Kotlin', code: [
      "sealed interface S",
      "data object A : S",
      "data class B(val n: Int) : S",
      "",
      "fun f(s: S) = when (s) {",
      "    A -> 0",
      "    is B -> s.n",
      "}",
      "",
      "fun main() {",
      "    println(f(B(4)))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "4", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "B", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Exhaustive state", detail: "B carries 4 and its branch returns n." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-2", questionNumber: 2, totalQuestions: 7, title: "Missing branch", topicMeta: "compilation", language: 'Kotlin', code: [
      "sealed interface S",
      "data object A : S",
      "data object B : S",
      "",
      "fun f(s: S) = when (s) {",
      "    A -> 1",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "It fails because the when expression is not exhaustive.", isCorrect: true }, { id: "B", label: "It compiles and returns 0 for B.", isCorrect: false }, { id: "C", label: "It compiles because sealed types always add else.", isCorrect: false }, { id: "D", label: "It fails because objects cannot implement sealed interfaces.", isCorrect: false }], explanation: { codeRef: "Missing branch", detail: "The compiler knows the direct sealed alternatives." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-3", questionNumber: 3, totalQuestions: 7, title: "Sealed class instance", topicMeta: "compilation", language: 'Kotlin', code: [
      "sealed class R",
      "",
      "// val r = R()"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "R() is invalid because a sealed class is abstract.", isCorrect: true }, { id: "B", label: "R() creates the default variant.", isCorrect: false }, { id: "C", label: "R() is a singleton.", isCorrect: false }, { id: "D", label: "R() is allowed inside main.", isCorrect: false }], explanation: { codeRef: "Sealed class instance", detail: "Sealed classes are abstract by nature." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-4", questionNumber: 4, totalQuestions: 7, title: "Different payloads", topicMeta: "output", language: 'Kotlin', code: [
      "sealed interface Msg",
      "data class Text(val s: String) : Msg",
      "data class Count(val n: Int) : Msg",
      "",
      "fun main() {",
      "    println(Text(\"hi\"))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "Text(s=hi)", isCorrect: true }, { id: "B", label: "hi", isCorrect: false }, { id: "C", label: "Msg", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Different payloads", detail: "Text is a data-class variant and uses generated toString." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-5", questionNumber: 5, totalQuestions: 7, title: "Object identity", topicMeta: "equality", language: 'Kotlin', code: [
      "sealed interface State",
      "data object Idle : State",
      "",
      "fun main() {",
      "    println(Idle === Idle)",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Object identity", detail: "An object variant is a singleton." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-6", questionNumber: 6, totalQuestions: 7, title: "Sealed interface + interface", topicMeta: "output", language: 'Kotlin', code: [
      "sealed interface Event",
      "interface Trackable",
      "data object Open : Event, Trackable",
      "",
      "fun main() {",
      "    println(Open is Trackable)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Open", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Sealed interface + interface", detail: "A class/object can implement multiple interfaces." } },
    { id: "world-11-sealed-classes-sealed-interfaces-predict-7", questionNumber: 7, totalQuestions: 7, title: "Else tradeoff", topicMeta: "behavior", language: 'Kotlin', code: [
      "sealed interface S",
      "data object A : S",
      "data object B : S",
      "",
      "fun f(s: S) = when (s) {",
      "    A -> 1",
      "    else -> 2",
      "}"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "It compiles, but else means adding another variant may not force this when to be updated.", isCorrect: true }, { id: "B", label: "It cannot compile with else.", isCorrect: false }, { id: "C", label: "else makes the sealed hierarchy open.", isCorrect: false }, { id: "D", label: "B can never reach else.", isCorrect: false }], explanation: { codeRef: "Else tradeoff", detail: "An else branch can reduce compiler assistance when variants evolve." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Model Checkout State", description: "Complete the exhaustive label() function for the closed checkout-state family.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "ModelCheckoutState.kt", initialCode: "sealed interface CheckoutState\ndata object Idle : CheckoutState\ndata class Paid(val receipt: String) : CheckoutState\ndata class Failed(val reason: String) : CheckoutState\n\nfun label(state: CheckoutState): String = TODO()\n\nfun main(){\n    println(label(Idle))\n    println(label(Paid(\"R7\")))\n    println(label(Failed(\"declined\")))\n}", solutionCode: "sealed interface CheckoutState\ndata object Idle : CheckoutState\ndata class Paid(val receipt: String) : CheckoutState\ndata class Failed(val reason: String) : CheckoutState\n\nfun label(state: CheckoutState): String = when(state){\n    Idle -> \"idle\"\n    is Paid -> \"paid:${state.receipt}\"\n    is Failed -> \"failed:${state.reason}\"\n}\n\nfun main(){\n    println(label(Idle))\n    println(label(Paid(\"R7\")))\n    println(label(Failed(\"declined\")))\n}", sampleInput: 'main()', expectedOutput: "idle\npaid:R7\nfailed:declined", testCase: { call: '', expected: "idle\npaid:R7\nfailed:declined" } },
  debug: { title: "Fix the Non-Exhaustive State Handler", subtitle: "A new state exists but the when expression does not cover it.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "sealed interface SyncState\ndata object Waiting:SyncState\ndata object Running:SyncState\ndata object Done:SyncState\nfun text(s:SyncState)=when(s){\n    Waiting -> \"waiting\"\n    Running -> \"running\"\n}\nfun main(){println(text(Done))}", fixedCode: "sealed interface SyncState\ndata object Waiting:SyncState\ndata object Running:SyncState\ndata object Done:SyncState\nfun text(s:SyncState)=when(s){\n    Waiting -> \"waiting\"\n    Running -> \"running\"\n    Done -> \"done\"\n}\nfun main(){println(text(Done))}", expectedOutput: "done", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Add the missing sealed variant rather than hiding the gap behind an unnecessary catch-all else." },
  mastered: { topicTitle: "Sealed Classes & Sealed Interfaces", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "7 / 7 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "7 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "7 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const DATA_CLASSES_DOMAIN_ENUMS_LESSON: FiveStageLesson = {
  id: "world-11-data-classes-in-domain-modeling-enum-classes", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Data Classes in Domain Modeling & Enum Classes",
  learn: { title: "Model Values with data class and Fixed Categories with enum", subtitle: "Use data classes for value-oriented records, understand generated copy/equality/hashCode/toString behavior, and use enums for fixed singleton categories. Prerequisite: World 8 data classes and enums; collections and when.", exampleTag: 'EXAMPLE', exampleTitle: "Core Data Classes in Domain Modeling & Enum Classes syntax", language: 'Kotlin', codeSnippet: [
    "enum class Status { NEW, PAID }",
    "data class Order(val id: Int, val status: Status)",
    "",
    "fun main() {",
    "    val a = Order(1, Status.NEW)",
    "    val b = a.copy(status = Status.PAID)",
    "    println(a)",
    "    println(b)",
    "}"
  ], explanation: "Use data classes for value-oriented records, understand generated copy/equality/hashCode/toString behavior, and use enums for fixed singleton categories. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Primary-constructor properties define generated value semantics", description: "equals/hashCode/toString/componentN/copy are generated from primary-constructor properties." }, { number: 2, title: "copy is shallow", description: "copy creates a new data-class instance but nested mutable references are still shared unless separately copied." }, { number: 3, title: "Enums are fixed singleton constants", description: "Each enum entry is one instance of the same enum class and may carry common constructor data." }, { number: 4, title: "Choose by domain meaning", description: "Use data classes for value records and enums for a fixed shared-shape category set; do not rely on ordinal as an external identifier." }], keyTakeaway: "Use data classes for value-oriented records, understand generated copy/equality/hashCode/toString behavior, and use enums for fixed singleton categories." },
  explore: { title: 'Explore the Concept', subtitle: "8 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-1", number: "01", title: "Structural equality", language: 'Kotlin', subtitle: "Data-class equality compares primary-constructor properties structurally.", code: [
      "data class Point(val x: Int, val y: Int)",
      "",
      "println(Point(1, 2) == Point(1, 2))"
    ], whatItMeans: [{ label: 'Behavior', description: "Data-class equality compares primary-constructor properties structurally." }], whatChanged: "Covers a distinct mapped scenario: Structural equality." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-2", number: "02", title: "Hash code agreement", language: 'Kotlin', subtitle: "Equal data-class values produce matching hash codes.", code: [
      "data class Key(val id: Int)",
      "",
      "val a = Key(2)",
      "val b = Key(2)",
      "println(a.hashCode() == b.hashCode())"
    ], whatItMeans: [{ label: 'Behavior', description: "Equal data-class values produce matching hash codes." }], whatChanged: "Covers a distinct mapped scenario: Hash code agreement." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-3", number: "03", title: "Generated toString", language: 'Kotlin', subtitle: "Generated toString includes the class name and primary-constructor properties.", code: [
      "data class User(val name: String, val age: Int)",
      "",
      "println(User(\"Mia\", 20))"
    ], whatItMeans: [{ label: 'Behavior', description: "Generated toString includes the class name and primary-constructor properties." }], whatChanged: "Covers a distinct mapped scenario: Generated toString." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-4", number: "04", title: "copy with one change", language: 'Kotlin', subtitle: "copy preserves unspecified primary-constructor values and replaces named ones.", code: [
      "data class Ticket(val id: Int, val open: Boolean)",
      "",
      "val a = Ticket(1, true)",
      "val b = a.copy(open = false)",
      "println(b)"
    ], whatItMeans: [{ label: 'Behavior', description: "copy preserves unspecified primary-constructor values and replaces named ones." }], whatChanged: "Covers a distinct mapped scenario: copy with one change." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-5", number: "05", title: "Body property excluded", language: 'Kotlin', subtitle: "Properties declared only in the body are excluded from generated equality.", code: [
      "data class Box(val id: Int) {",
      "    var note = \"A\"",
      "}",
      "",
      "val a = Box(1)",
      "val b = Box(1)",
      "b.note = \"B\"",
      "println(a == b)"
    ], whatItMeans: [{ label: 'Behavior', description: "Properties declared only in the body are excluded from generated equality." }], whatChanged: "Covers a distinct mapped scenario: Body property excluded." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-6", number: "06", title: "Shallow copy", language: 'Kotlin', subtitle: "copy duplicates the data-class shell, not nested mutable objects.", code: [
      "data class Team(val names: MutableList<String>)",
      "",
      "val a = Team(mutableListOf(\"A\"))",
      "val b = a.copy()",
      "b.names.add(\"B\")",
      "println(a.names)"
    ], whatItMeans: [{ label: 'Behavior', description: "copy duplicates the data-class shell, not nested mutable objects." }], whatChanged: "Covers a distinct mapped scenario: Shallow copy." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-7", number: "07", title: "Enum data", language: 'Kotlin', subtitle: "Enum entries can carry constructor data shared by the enum shape.", code: [
      "enum class Level(val code: Int) {",
      "    LOW(1),",
      "    HIGH(9)",
      "}",
      "",
      "println(Level.HIGH.code)"
    ], whatItMeans: [{ label: 'Behavior', description: "Enum entries can carry constructor data shared by the enum shape." }], whatChanged: "Covers a distinct mapped scenario: Enum data." },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-explore-8", number: "08", title: "Enum exhaustive when", language: 'Kotlin', subtitle: "A when over all enum entries can be exhaustive.", code: [
      "enum class Mode { AUTO, MANUAL }",
      "",
      "fun text(m: Mode) = when (m) {",
      "    Mode.AUTO -> \"A\"",
      "    Mode.MANUAL -> \"M\"",
      "}",
      "",
      "println(text(Mode.AUTO))"
    ], whatItMeans: [{ label: 'Behavior', description: "A when over all enum entries can be exhaustive." }], whatChanged: "Covers a distinct mapped scenario: Enum exhaustive when." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-1", questionNumber: 1, totalQuestions: 8, title: "Equality", topicMeta: "equality", language: 'Kotlin', code: [
      "data class User(val id: Int)",
      "",
      "fun main() {",
      "    println(User(1) == User(1))",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Compilation error", isCorrect: false }, { id: "D", label: "Reference-dependent", isCorrect: false }], explanation: { codeRef: "Equality", detail: "Data-class equals compares constructor properties." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-2", questionNumber: 2, totalQuestions: 8, title: "Copy", topicMeta: "output", language: 'Kotlin', code: [
      "data class P(val x: Int, val y: Int)",
      "",
      "fun main() {",
      "    println(P(1, 2).copy(y = 5))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "P(x=1, y=5)", isCorrect: true }, { id: "B", label: "P(x=5, y=2)", isCorrect: false }, { id: "C", label: "P(1,5)", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Copy", detail: "copy preserves x and replaces y." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-3", questionNumber: 3, totalQuestions: 8, title: "Body property equality", topicMeta: "equality", language: 'Kotlin', code: [
      "data class Item(val id: Int) {",
      "    var tag = \"x\"",
      "}",
      "",
      "fun main() {",
      "    val a = Item(1)",
      "    val b = Item(1)",
      "    b.tag = \"y\"",
      "    println(a == b)",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Compilation error", isCorrect: false }, { id: "D", label: "Depends on tag length", isCorrect: false }], explanation: { codeRef: "Body property equality", detail: "tag is outside the primary constructor and excluded from generated equals." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-4", questionNumber: 4, totalQuestions: 8, title: "Shallow copy alias", topicMeta: "output", language: 'Kotlin', code: [
      "data class Bag(val xs: MutableList<Int>)",
      "",
      "fun main() {",
      "    val a = Bag(mutableListOf(1))",
      "    val b = a.copy()",
      "    b.xs += 2",
      "    println(a.xs)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "[1, 2]", isCorrect: true }, { id: "B", label: "[1]", isCorrect: false }, { id: "C", label: "[2]", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Shallow copy alias", detail: "Both copies reference the same mutable list." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-5", questionNumber: 5, totalQuestions: 8, title: "Generated toString", topicMeta: "output", language: 'Kotlin', code: [
      "data class Pairing(val left: String, val right: Int)",
      "",
      "fun main() {",
      "    println(Pairing(\"x\", 2))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "Pairing(left=x, right=2)", isCorrect: true }, { id: "B", label: "x:2", isCorrect: false }, { id: "C", label: "[x,2]", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Generated toString", detail: "Generated toString follows data-class property representation." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-6", questionNumber: 6, totalQuestions: 8, title: "Hash equality", topicMeta: "equality", language: 'Kotlin', code: [
      "data class K(val n: Int)",
      "",
      "fun main() {",
      "    println(K(3).hashCode() == K(3).hashCode())",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Compilation error", isCorrect: false }, { id: "D", label: "Only on JVM debug builds", isCorrect: false }], explanation: { codeRef: "Hash equality", detail: "Equal values must have equal hash codes." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-7", questionNumber: 7, totalQuestions: 8, title: "Enum singleton", topicMeta: "equality", language: 'Kotlin', code: [
      "enum class Flag { ON, OFF }",
      "",
      "fun main() {",
      "    println(Flag.ON === Flag.ON)",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Enum singleton", detail: "Each enum constant is a singleton instance." } },
    { id: "world-11-data-classes-in-domain-modeling-enum-classes-predict-8", questionNumber: 8, totalQuestions: 8, title: "Enum when", topicMeta: "output", language: 'Kotlin', code: [
      "enum class State { A, B }",
      "",
      "fun f(s: State) = when (s) {",
      "    State.A -> 1",
      "    State.B -> 2",
      "}",
      "",
      "fun main() {",
      "    println(f(State.B))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "2", isCorrect: true }, { id: "B", label: "1", isCorrect: false }, { id: "C", label: "B", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Enum when", detail: "B selects the second exhaustive branch." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Model an Order Snapshot", description: "Use a data class plus enum, then copy the order to a new status without mutating the original.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "ModelanOrderSnapshot.kt", initialCode: "enum class Status { NEW, SHIPPED }\ndata class Order(val id: Int, val status: Status)\n\nfun main(){\n    val original = Order(12, Status.NEW)\n    // TODO create shipped using copy\n    // TODO print original and shipped\n}", solutionCode: "enum class Status { NEW, SHIPPED }\ndata class Order(val id: Int, val status: Status)\n\nfun main(){\n    val original = Order(12, Status.NEW)\n    val shipped = original.copy(status = Status.SHIPPED)\n    println(original)\n    println(shipped)\n}", sampleInput: 'main()', expectedOutput: "Order(id=12, status=NEW)\nOrder(id=12, status=SHIPPED)", testCase: { call: '', expected: "Order(id=12, status=NEW)\nOrder(id=12, status=SHIPPED)" } },
  debug: { title: "Fix Equality-Critical State", subtitle: "The domain code expects version to participate in data-class equality, but version is only a body property.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "data class Document(val id:Int){\n    var version:Int = 1\n}\nfun main(){\n    val a=Document(5)\n    val b=Document(5)\n    b.version=2\n    println(a==b)\n}", fixedCode: "data class Document(val id:Int, val version:Int)\nfun main(){\n    val a=Document(5,1)\n    val b=Document(5,2)\n    println(a==b)\n}", expectedOutput: "false", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Move equality-critical state into the primary constructor so generated equals/hashCode/copy include it." },
  mastered: { topicTitle: "Data Classes in Domain Modeling & Enum Classes", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "8 / 8 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "8 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "8 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const NESTED_CLASSES_LESSON: FiveStageLesson = {
  id: "world-11-nested-classes", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Nested Classes",
  learn: { title: "Associate Types without Capturing an Outer Instance", subtitle: "Use static-like nested classes for strongly associated types that do not need an outer instance. Prerequisite: Classes and visibility.", exampleTag: 'EXAMPLE', exampleTitle: "Core Nested Classes syntax", language: 'Kotlin', codeSnippet: [
    "class HttpResponse(val code: Int) {",
    "    class Header(val name: String)",
    "}",
    "",
    "fun main() {",
    "    println(HttpResponse.Header(\"Accept\").name)",
    "}"
  ], explanation: "Use static-like nested classes for strongly associated types that do not need an outer instance. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Nested is static-like", description: "A regular class declared inside another class has no implicit outer-instance reference." }, { number: 2, title: "Construction uses Outer.Nested", description: "No Outer instance is needed to construct a nested class." }, { number: 3, title: "No implicit outer state access", description: "Pass an outer instance explicitly if nested behavior genuinely needs one." }, { number: 4, title: "Use nesting for cohesion", description: "Nesting can communicate ownership/namespacing without retaining outer lifetime." }], keyTakeaway: "Use static-like nested classes for strongly associated types that do not need an outer instance." },
  explore: { title: 'Explore the Concept', subtitle: "5 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-nested-classes-explore-1", number: "01", title: "Construct directly", language: 'Kotlin', subtitle: "Use Outer.Nested() syntax.", code: [
      "class Box {",
      "    class Label(val text: String)",
      "}",
      "",
      "println(Box.Label(\"A\").text)"
    ], whatItMeans: [{ label: 'Behavior', description: "Use Outer.Nested() syntax." }], whatChanged: "Covers a distinct mapped scenario: Construct directly." },
    { id: "world-11-nested-classes-explore-2", number: "02", title: "No outer instance", language: 'Kotlin', subtitle: "Nested construction does not require Outer().", code: [
      "class Outer {",
      "    class Nested {",
      "        fun n() = 2",
      "    }",
      "}",
      "",
      "println(Outer.Nested().n())"
    ], whatItMeans: [{ label: 'Behavior', description: "Nested construction does not require Outer()." }], whatChanged: "Covers a distinct mapped scenario: No outer instance." },
    { id: "world-11-nested-classes-explore-3", number: "03", title: "Own constructor state", language: 'Kotlin', subtitle: "Nested classes have their own properties and constructors.", code: [
      "class Api {",
      "    class Error(val code: Int)",
      "}",
      "",
      "println(Api.Error(404).code)"
    ], whatItMeans: [{ label: 'Behavior', description: "Nested classes have their own properties and constructors." }], whatChanged: "Covers a distinct mapped scenario: Own constructor state." },
    { id: "world-11-nested-classes-explore-4", number: "04", title: "Explicit outer reference", language: 'Kotlin', subtitle: "A nested class can use an explicitly supplied outer instance.", code: [
      "class Outer(val n: Int) {",
      "    class Nested {",
      "        fun read(o: Outer) = o.n",
      "    }",
      "}",
      "",
      "println(Outer.Nested().read(Outer(7)))"
    ], whatItMeans: [{ label: 'Behavior', description: "A nested class can use an explicitly supplied outer instance." }], whatChanged: "Covers a distinct mapped scenario: Explicit outer reference." },
    { id: "world-11-nested-classes-explore-5", number: "05", title: "Compile boundary", language: 'Kotlin', subtitle: "There is no implicit outer receiver.", code: [
      "class Outer(val n: Int) {",
      "    class Nested {",
      "        // fun read() = n // ERROR",
      "    }",
      "}"
    ], whatItMeans: [{ label: 'Behavior', description: "There is no implicit outer receiver." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-nested-classes-predict-1", questionNumber: 1, totalQuestions: 5, title: "Construction", topicMeta: "output", language: 'Kotlin', code: [
      "class A {",
      "    class B(val x: Int)",
      "}",
      "",
      "fun main() {",
      "    println(A.B(3).x)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "A", isCorrect: false }, { id: "C", label: "B", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Construction", detail: "A.B constructs the nested type without A()." } },
    { id: "world-11-nested-classes-predict-2", questionNumber: 2, totalQuestions: 5, title: "Outer access", topicMeta: "compilation", language: 'Kotlin', code: [
      "class A(val x: Int) {",
      "    class B {",
      "        // fun f() = x",
      "    }",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Uncommenting f fails because B has no implicit A instance.", isCorrect: true }, { id: "B", label: "B reads x automatically.", isCorrect: false }, { id: "C", label: "B creates a hidden A.", isCorrect: false }, { id: "D", label: "x becomes static.", isCorrect: false }], explanation: { codeRef: "Outer access", detail: "Regular nested classes do not capture an outer instance." } },
    { id: "world-11-nested-classes-predict-3", questionNumber: 3, totalQuestions: 5, title: "Own state", topicMeta: "output", language: 'Kotlin', code: [
      "class Shop {",
      "    class Item(val name: String)",
      "}",
      "",
      "fun main() {",
      "    println(Shop.Item(\"Pen\").name)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "Pen", isCorrect: true }, { id: "B", label: "Shop", isCorrect: false }, { id: "C", label: "Item", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Own state", detail: "The nested Item owns name." } },
    { id: "world-11-nested-classes-predict-4", questionNumber: 4, totalQuestions: 5, title: "Explicit reference", topicMeta: "output", language: 'Kotlin', code: [
      "class O(val x: Int) {",
      "    class N {",
      "        fun f(o: O) = o.x",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(O.N().f(O(9)))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "9", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "O", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Explicit reference", detail: "Passing O explicitly makes its state available." } },
    { id: "world-11-nested-classes-predict-5", questionNumber: 5, totalQuestions: 5, title: "Nested vs inner", topicMeta: "behavior", language: 'Kotlin', code: [
      "class O {",
      "    class N",
      "    inner class I",
      "}"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "N has no outer reference; I does.", isCorrect: true }, { id: "B", label: "Both retain O.", isCorrect: false }, { id: "C", label: "Neither can exist without O.", isCorrect: false }, { id: "D", label: "N and I are synonyms.", isCorrect: false }], explanation: { codeRef: "Nested vs inner", detail: "inner is the modifier that captures an outer instance." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Build a Nested Result Type", description: "Create and print a nested Result.Meta without constructing Result.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "BuildaNestedResultType.kt", initialCode: "class Result {\n    class Meta(val source: String)\n}\nfun main(){\n    // TODO construct Result.Meta(\"cache\") and print source\n}", solutionCode: "class Result {\n    class Meta(val source: String)\n}\nfun main(){\n    val meta = Result.Meta(\"cache\")\n    println(meta.source)\n}", sampleInput: 'main()', expectedOutput: "cache", testCase: { call: '', expected: "cache" } },
  debug: { title: "Fix the Nested Construction", subtitle: "A regular nested class is incorrectly constructed through an outer instance.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "class Catalog { class Entry(val id:Int) }\nfun main(){\n    val c=Catalog()\n    val e=c.Entry(8)\n    println(e.id)\n}", fixedCode: "class Catalog { class Entry(val id:Int) }\nfun main(){\n    val e=Catalog.Entry(8)\n    println(e.id)\n}", expectedOutput: "8", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Construct a regular nested class with Outer.Nested(), not outer.Nested()." },
  mastered: { topicTitle: "Nested Classes", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "5 / 5 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "5 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "5 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const INNER_CLASSES_LESSON: FiveStageLesson = {
  id: "world-11-inner-classes", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Inner Classes",
  learn: { title: "Capture an Outer Instance with inner", subtitle: "Use inner only when a nested object genuinely needs one specific outer instance and understand the retained outer reference. Prerequisite: Nested classes and class state.", exampleTag: 'EXAMPLE', exampleTitle: "Core Inner Classes syntax", language: 'Kotlin', codeSnippet: [
    "class Cart(private val prefix: String) {",
    "    inner class Line(val item: String) {",
    "        fun label() = \"$prefix:$item\"",
    "    }",
    "}",
    "",
    "fun main() {",
    "    println(Cart(\"cart\").Line(\"book\").label())",
    "}"
  ], explanation: "Use inner only when a nested object genuinely needs one specific outer instance and understand the retained outer reference. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "inner captures one outer instance", description: "An inner class carries a reference to the Outer object used to create it." }, { number: 2, title: "Construct through an instance", description: "Use outer.Inner(), not Outer.Inner(), for an inner class." }, { number: 3, title: "Outer members are directly accessible", description: "Inner code can read accessible outer state, including private members." }, { number: 4, title: "Prefer nested when capture is unnecessary", description: "The retained outer reference can extend the outer object's lifetime." }], keyTakeaway: "Use inner only when a nested object genuinely needs one specific outer instance and understand the retained outer reference." },
  explore: { title: 'Explore the Concept', subtitle: "5 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-inner-classes-explore-1", number: "01", title: "Read outer state", language: 'Kotlin', subtitle: "Inner directly reads x from its outer instance.", code: [
      "class O(val x: Int) {",
      "    inner class I {",
      "        fun f() = x",
      "    }",
      "}",
      "",
      "println(O(4).I().f())"
    ], whatItMeans: [{ label: 'Behavior', description: "Inner directly reads x from its outer instance." }], whatChanged: "Covers a distinct mapped scenario: Read outer state." },
    { id: "world-11-inner-classes-explore-2", number: "02", title: "Different outers", language: 'Kotlin', subtitle: "Each inner instance is tied to the outer that created it.", code: [
      "class O(val x: Int) {",
      "    inner class I {",
      "        fun f() = x",
      "    }",
      "}",
      "",
      "val a = O(1)",
      "val b = O(2)",
      "println(a.I().f() + b.I().f())"
    ], whatItMeans: [{ label: 'Behavior', description: "Each inner instance is tied to the outer that created it." }], whatChanged: "Covers a distinct mapped scenario: Different outers." },
    { id: "world-11-inner-classes-explore-3", number: "03", title: "Private outer member", language: 'Kotlin', subtitle: "Inner classes can access outer private members.", code: [
      "class Vault(private val code: Int) {",
      "    inner class Key {",
      "        fun reveal() = code",
      "    }",
      "}",
      "",
      "println(Vault(7).Key().reveal())"
    ], whatItMeans: [{ label: 'Behavior', description: "Inner classes can access outer private members." }], whatChanged: "Covers a distinct mapped scenario: Private outer member." },
    { id: "world-11-inner-classes-explore-4", number: "04", title: "Qualified this", language: 'Kotlin', subtitle: "this@Outer disambiguates the outer receiver.", code: [
      "class O(val x: Int) {",
      "    inner class I(val x: Int) {",
      "        fun outerX() = this@O.x",
      "    }",
      "}",
      "",
      "println(O(5).I(9).outerX())"
    ], whatItMeans: [{ label: 'Behavior', description: "this@Outer disambiguates the outer receiver." }], whatChanged: "Covers a distinct mapped scenario: Qualified this." },
    { id: "world-11-inner-classes-explore-5", number: "05", title: "Compile boundary", language: 'Kotlin', subtitle: "Inner construction requires a specific outer object.", code: [
      "class O {",
      "    inner class I",
      "}",
      "",
      "// val i = O.I() // ERROR: an outer instance is required"
    ], whatItMeans: [{ label: 'Behavior', description: "Inner construction requires a specific outer object." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-inner-classes-predict-1", questionNumber: 1, totalQuestions: 5, title: "Outer value", topicMeta: "output", language: 'Kotlin', code: [
      "class A(val n: Int) {",
      "    inner class B {",
      "        fun n() = this@A.n",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(A(6).B().n())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "6", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "B", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Outer value", detail: "The inner class captures its specific outer A(6) instance, so this@A.n reads that instance's n." } },
    { id: "world-11-inner-classes-predict-2", questionNumber: 2, totalQuestions: 5, title: "Two outers", topicMeta: "output", language: 'Kotlin', code: [
      "class A(val n: Int) {",
      "    inner class B {",
      "        fun value() = n",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(A(2).B().value() + A(3).B().value())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "5", isCorrect: true }, { id: "B", label: "2", isCorrect: false }, { id: "C", label: "3", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Two outers", detail: "Each inner uses its own outer." } },
    { id: "world-11-inner-classes-predict-3", questionNumber: 3, totalQuestions: 5, title: "Construction", topicMeta: "output", language: 'Kotlin', code: [
      "class A {",
      "    inner class B {",
      "        fun f() = 1",
      "    }",
      "}",
      "",
      "fun main() {",
      "    val a = A()",
      "    val b1 = a.B()",
      "    val b2 = a.B()",
      "    println(b1 === b2)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "false", isCorrect: true }, { id: "B", label: "true", isCorrect: false }, { id: "C", label: "A", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Construction", detail: "Each a.B() call constructs a distinct inner instance, even from the same outer a." } },
    { id: "world-11-inner-classes-predict-4", questionNumber: 4, totalQuestions: 5, title: "Qualified receiver", topicMeta: "output", language: 'Kotlin', code: [
      "class A(val x: Int) {",
      "    inner class B(val x: Int) {",
      "        fun sum() = x + this@A.x",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(A(4).B(7).sum())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "11", isCorrect: true }, { id: "B", label: "7", isCorrect: false }, { id: "C", label: "4", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Qualified receiver", detail: "Unqualified x is inner x; this@A.x is outer x." } },
    { id: "world-11-inner-classes-predict-5", questionNumber: 5, totalQuestions: 5, title: "Nested distinction", topicMeta: "behavior", language: 'Kotlin', code: [
      "class A {",
      "    class N",
      "    inner class I",
      "}"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "Only I retains an A instance.", isCorrect: true }, { id: "B", label: "Only N retains A.", isCorrect: false }, { id: "C", label: "Both retain A.", isCorrect: false }, { id: "D", label: "Neither can access A state.", isCorrect: false }], explanation: { codeRef: "Nested distinction", detail: "inner changes the receiver/lifetime relationship." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Use Outer State from an Inner Class", description: "Complete the inner formatter so it uses the outer prefix.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "UseOuterStatefromanInnerClass.kt", initialCode: "class Formatter(private val prefix:String){\n    inner class Entry(private val value:String){\n        fun text():String = TODO()\n    }\n}\nfun main(){ println(Formatter(\"ID\").Entry(\"42\").text()) }", solutionCode: "class Formatter(private val prefix:String){\n    inner class Entry(private val value:String){\n        fun text():String = \"$prefix:$value\"\n    }\n}\nfun main(){ println(Formatter(\"ID\").Entry(\"42\").text()) }", sampleInput: 'main()', expectedOutput: "ID:42", testCase: { call: '', expected: "ID:42" } },
  debug: { title: "Fix the Missing inner Modifier", subtitle: "The nested helper needs outer state but is not declared inner.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "class Session(private val token:String){\n    class Header{\n        fun value()=\"Bearer $token\"\n    }\n}\nfun main(){println(Session(\"abc\").Header().value())}", fixedCode: "class Session(private val token:String){\n    inner class Header{\n        fun value()=\"Bearer $token\"\n    }\n}\nfun main(){println(Session(\"abc\").Header().value())}", expectedOutput: "Bearer abc", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Mark Header inner so it has the required Session receiver." },
  mastered: { topicTitle: "Inner Classes", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "5 / 5 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "5 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "5 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const OBJECT_DECLARATIONS_LESSON: FiveStageLesson = {
  id: "world-11-object-declarations", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Object Declarations",
  learn: { title: "Create an Intentional Singleton with object", subtitle: "Use named singleton objects deliberately, distinguish them from object expressions, and manage shared state consciously. Prerequisite: Objects from World 8, interfaces, state.", exampleTag: 'EXAMPLE', exampleTitle: "Core Object Declarations syntax", language: 'Kotlin', codeSnippet: [
    "object Ids {",
    "    private var next = 0",
    "    fun newId(): Int {",
    "        next++",
    "        return next",
    "    }",
    "}",
    "",
    "fun main() {",
    "    println(Ids.newId())",
    "    println(Ids.newId())",
    "}"
  ], explanation: "Use named singleton objects deliberately, distinguish them from object expressions, and manage shared state consciously. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "One named instance", description: "An object declaration defines a named singleton and its members are accessed through that name." }, { number: 2, title: "Shared mutable state is global state", description: "All callers observe the same singleton fields, so mutation should be deliberate." }, { number: 3, title: "Objects can implement contracts", description: "An object declaration can extend a class or implement interfaces." }, { number: 4, title: "Object expression is different", description: "object : Interface { ... } creates an anonymous object expression; it is not the same as a named singleton declaration." }], keyTakeaway: "Use named singleton objects deliberately, distinguish them from object expressions, and manage shared state consciously." },
  explore: { title: 'Explore the Concept', subtitle: "6 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-object-declarations-explore-1", number: "01", title: "Shared counter", language: 'Kotlin', subtitle: "Both calls use the same singleton state.", code: [
      "object Counter {",
      "    var n = 0",
      "    fun next() = ++n",
      "}",
      "",
      "println(Counter.next())",
      "println(Counter.next())"
    ], whatItMeans: [{ label: 'Behavior', description: "Both calls use the same singleton state." }], whatChanged: "Covers a distinct mapped scenario: Shared counter." },
    { id: "world-11-object-declarations-explore-2", number: "02", title: "Implement interface", language: 'Kotlin', subtitle: "A singleton can implement an interface.", code: [
      "interface Clock {",
      "    fun now(): String",
      "}",
      "object FixedClock : Clock {",
      "    override fun now() = \"12:00\"",
      "}",
      "",
      "println(FixedClock.now())"
    ], whatItMeans: [{ label: 'Behavior', description: "A singleton can implement an interface." }], whatChanged: "Covers a distinct mapped scenario: Implement interface." },
    { id: "world-11-object-declarations-explore-3", number: "03", title: "Identity", language: 'Kotlin', subtitle: "The object name refers to the same instance.", code: [
      "object Config",
      "",
      "println(Config === Config)"
    ], whatItMeans: [{ label: 'Behavior', description: "The object name refers to the same instance." }], whatChanged: "Covers a distinct mapped scenario: Identity." },
    { id: "world-11-object-declarations-explore-4", number: "04", title: "Private state", language: 'Kotlin', subtitle: "Singleton state can still be encapsulated.", code: [
      "object Registry {",
      "    private var n = 0",
      "    fun add() { n++ }",
      "    fun size() = n",
      "}",
      "",
      "Registry.add()",
      "println(Registry.size())"
    ], whatItMeans: [{ label: 'Behavior', description: "Singleton state can still be encapsulated." }], whatChanged: "Covers a distinct mapped scenario: Private state." },
    { id: "world-11-object-declarations-explore-5", number: "05", title: "Object expression", language: 'Kotlin', subtitle: "An object expression creates an anonymous object value.", code: [
      "interface Label {",
      "    fun text(): String",
      "}",
      "",
      "val a = object : Label {",
      "    override fun text() = \"A\"",
      "}",
      "println(a.text())"
    ], whatItMeans: [{ label: 'Behavior', description: "An object expression creates an anonymous object value." }], whatChanged: "Covers a distinct mapped scenario: Object expression." },
    { id: "world-11-object-declarations-explore-6", number: "06", title: "Compile boundary", language: 'Kotlin', subtitle: "Named object declarations are referenced, not instantiated.", code: [
      "object Settings",
      "",
      "// val s = Settings() // ERROR: object declaration is not constructed"
    ], whatItMeans: [{ label: 'Behavior', description: "Named object declarations are referenced, not instantiated." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-object-declarations-predict-1", questionNumber: 1, totalQuestions: 6, title: "Shared state", topicMeta: "output", language: 'Kotlin', code: [
      "object C {",
      "    var n = 1",
      "}",
      "",
      "fun main() {",
      "    C.n++",
      "    println(C.n)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "2", isCorrect: true }, { id: "B", label: "1", isCorrect: false }, { id: "C", label: "0", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Shared state", detail: "The singleton's mutable n is shared." } },
    { id: "world-11-object-declarations-predict-2", questionNumber: 2, totalQuestions: 6, title: "Identity", topicMeta: "equality", language: 'Kotlin', code: [
      "object A",
      "",
      "fun main() {",
      "    println(A === A)",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Identity", detail: "A names one singleton instance." } },
    { id: "world-11-object-declarations-predict-3", questionNumber: 3, totalQuestions: 6, title: "Interface object", topicMeta: "output", language: 'Kotlin', code: [
      "interface X {",
      "    fun f() = 3",
      "}",
      "object O : X",
      "",
      "fun main() {",
      "    println(O.f())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "O", isCorrect: false }, { id: "C", label: "X", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Interface object", detail: "O inherits the interface default." } },
    { id: "world-11-object-declarations-predict-4", questionNumber: 4, totalQuestions: 6, title: "Construction boundary", topicMeta: "compilation", language: 'Kotlin', code: [
      "object O",
      "",
      "// val x = O()"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "O() is invalid; use O directly.", isCorrect: true }, { id: "B", label: "O() creates another singleton.", isCorrect: false }, { id: "C", label: "O() is required before first access.", isCorrect: false }, { id: "D", label: "Only interfaces cannot be constructed.", isCorrect: false }], explanation: { codeRef: "Construction boundary", detail: "Object declarations do not have ordinary construction syntax." } },
    { id: "world-11-object-declarations-predict-5", questionNumber: 5, totalQuestions: 6, title: "Shared across functions", topicMeta: "output", language: 'Kotlin', code: ["object Counter{", "    var n=0", "    fun inc(){n++}", "}", "fun bump(){Counter.inc()}", "fun main(){bump();bump();println(Counter.n)}"], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "2", isCorrect: true }, { id: "B", label: "1", isCorrect: false }, { id: "C", label: "0", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Shared across functions", detail: "Every call site reaches the same singleton instance, so both bump() calls mutate the same n." } },
    { id: "world-11-object-declarations-predict-6", questionNumber: 6, totalQuestions: 6, title: "Encapsulation", topicMeta: "output", language: 'Kotlin', code: ["object Store{", "    private var n=2", "    fun size()=n", "}", "fun main(){println(Store.size())}"], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "2", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "Store", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Encapsulation", detail: "Public behavior can expose controlled access to private singleton state." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Build a Shared ID Generator", description: "Complete nextId() so repeated calls share and increment singleton state.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "BuildaSharedIDGenerator.kt", initialCode: "object IdGenerator {\n    private var next = 100\n    fun nextId(): Int {\n        TODO()\n    }\n}\nfun main(){\n    println(IdGenerator.nextId())\n    println(IdGenerator.nextId())\n}", solutionCode: "object IdGenerator {\n    private var next = 100\n    fun nextId(): Int {\n        next += 1\n        return next\n    }\n}\nfun main(){\n    println(IdGenerator.nextId())\n    println(IdGenerator.nextId())\n}", sampleInput: 'main()', expectedOutput: "101\n102", testCase: { call: '', expected: "101\n102" } },
  debug: { title: "Fix Accidental Local State", subtitle: "The function creates a fresh counter every call instead of using the singleton.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "object Counter { var n=0 }\nfun next():Int {\n    var n=0\n    n++\n    return n\n}\nfun main(){println(next());println(next())}", fixedCode: "object Counter { var n=0 }\nfun next():Int {\n    Counter.n++\n    return Counter.n\n}\nfun main(){println(next());println(next())}", expectedOutput: "1\n2", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Use the singleton's state rather than a fresh local variable." },
  mastered: { topicTitle: "Object Declarations", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "6 / 6 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "6 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "6 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const COMPANION_OBJECTS_LESSON: FiveStageLesson = {
  id: "world-11-companion-objects", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Companion Objects",
  learn: { title: "Attach Class-Level Factories with companion object", subtitle: "Associate factories/constants with a class, understand companion identity, and avoid pretending companion members are instance members. Prerequisite: Object declarations, constructors, visibility.", exampleTag: 'EXAMPLE', exampleTitle: "Core Companion Objects syntax", language: 'Kotlin', codeSnippet: [
    "class User private constructor(val name: String) {",
    "    companion object {",
    "        fun guest() = User(\"guest\")",
    "    }",
    "}",
    "",
    "fun main() {",
    "    println(User.guest().name)",
    "}"
  ], explanation: "Associate factories/constants with a class, understand companion identity, and avoid pretending companion members are instance members. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Companion is an object", description: "It is a real singleton associated with a class, not a magical static namespace." }, { number: 2, title: "Class-name access", description: "Companion members can usually be called as ClassName.member." }, { number: 3, title: "Factory pattern", description: "A private constructor plus companion factory can control creation." }, { number: 4, title: "No implicit enclosing instance", description: "Companion code cannot directly read one particular object's instance state without receiving that object." }], keyTakeaway: "Associate factories/constants with a class, understand companion identity, and avoid pretending companion members are instance members." },
  explore: { title: 'Explore the Concept', subtitle: "6 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-companion-objects-explore-1", number: "01", title: "Factory", language: 'Kotlin', subtitle: "A companion factory can call a private constructor.", code: [
      "class Token private constructor(val v: String) {",
      "    companion object {",
      "        fun of(v: String) = Token(v)",
      "    }",
      "}",
      "",
      "println(Token.of(\"x\").v)"
    ], whatItMeans: [{ label: 'Behavior', description: "A companion factory can call a private constructor." }], whatChanged: "Covers a distinct mapped scenario: Factory." },
    { id: "world-11-companion-objects-explore-2", number: "02", title: "Constant", language: 'Kotlin', subtitle: "Eligible compile-time constants can live in a companion.", code: [
      "class Limits {",
      "    companion object {",
      "        const val MAX = 5",
      "    }",
      "}",
      "",
      "println(Limits.MAX)"
    ], whatItMeans: [{ label: 'Behavior', description: "Eligible compile-time constants can live in a companion." }], whatChanged: "Covers a distinct mapped scenario: Constant." },
    { id: "world-11-companion-objects-explore-3", number: "03", title: "Named companion", language: 'Kotlin', subtitle: "A named companion can be reached through the class or its companion name.", code: [
      "class A {",
      "    companion object Factory {",
      "        fun n() = 2",
      "    }",
      "}",
      "",
      "println(A.n())",
      "println(A.Factory.n())"
    ], whatItMeans: [{ label: 'Behavior', description: "A named companion can be reached through the class or its companion name." }], whatChanged: "Covers a distinct mapped scenario: Named companion." },
    { id: "world-11-companion-objects-explore-4", number: "04", title: "Companion as value", language: 'Kotlin', subtitle: "A companion can implement an interface and be passed as a value.", code: [
      "interface Factory {",
      "    fun make(): String",
      "}",
      "class A {",
      "    companion object : Factory {",
      "        override fun make() = \"A\"",
      "    }",
      "}",
      "",
      "val f: Factory = A",
      "println(f.make())"
    ], whatItMeans: [{ label: 'Behavior', description: "A companion can implement an interface and be passed as a value." }], whatChanged: "Covers a distinct mapped scenario: Companion as value." },
    { id: "world-11-companion-objects-explore-5", number: "05", title: "No instance state", language: 'Kotlin', subtitle: "Receive an instance explicitly when companion behavior needs instance data.", code: [
      "class User(val name: String) {",
      "    companion object {",
      "        fun label(u: User) = u.name",
      "    }",
      "}",
      "",
      "println(User.label(User(\"Mia\")))"
    ], whatItMeans: [{ label: 'Behavior', description: "Receive an instance explicitly when companion behavior needs instance data." }], whatChanged: "Covers a distinct mapped scenario: No instance state." },
    { id: "world-11-companion-objects-explore-6", number: "06", title: "Compile boundary", language: 'Kotlin', subtitle: "The companion has no implicit User instance.", code: [
      "class User(val name: String) {",
      "    companion object {",
      "        // fun bad() = name // ERROR",
      "    }",
      "}"
    ], whatItMeans: [{ label: 'Behavior', description: "The companion has no implicit User instance." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-companion-objects-predict-1", questionNumber: 1, totalQuestions: 6, title: "Factory call", topicMeta: "output", language: 'Kotlin', code: [
      "class A private constructor(val n: Int) {",
      "    companion object {",
      "        fun create() = A(7)",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(A.create().n)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "7", isCorrect: true }, { id: "B", label: "A", isCorrect: false }, { id: "C", label: "0", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Factory call", detail: "The companion can access the private constructor." } },
    { id: "world-11-companion-objects-predict-2", questionNumber: 2, totalQuestions: 6, title: "Constant", topicMeta: "output", language: 'Kotlin', code: [
      "class C {",
      "    companion object {",
      "        const val X = 4",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(C.X)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "4", isCorrect: true }, { id: "B", label: "X", isCorrect: false }, { id: "C", label: "C", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Constant", detail: "Class-name syntax accesses the companion constant." } },
    { id: "world-11-companion-objects-predict-3", questionNumber: 3, totalQuestions: 6, title: "Named companion", topicMeta: "output", language: 'Kotlin', code: [
      "class C {",
      "    companion object Maker {",
      "        fun x() = 3",
      "    }",
      "}",
      "",
      "fun main() {",
      "    println(C.Maker.x())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "Maker", isCorrect: false }, { id: "C", label: "C", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Named companion", detail: "Named companion access is valid." } },
    { id: "world-11-companion-objects-predict-4", questionNumber: 4, totalQuestions: 6, title: "Companion as interface", topicMeta: "output", language: 'Kotlin', code: [
      "interface F {",
      "    fun make(): Int",
      "}",
      "class C {",
      "    companion object : F {",
      "        override fun make() = 8",
      "    }",
      "}",
      "",
      "fun main() {",
      "    val f: F = C",
      "    println(f.make())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "8", isCorrect: true }, { id: "B", label: "C", isCorrect: false }, { id: "C", label: "F", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Companion as interface", detail: "C can denote its companion in this context." } },
    { id: "world-11-companion-objects-predict-5", questionNumber: 5, totalQuestions: 6, title: "Instance misconception", topicMeta: "compilation", language: 'Kotlin', code: [
      "class C(val n: Int) {",
      "    companion object {",
      "        // fun bad() = n",
      "    }",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Uncommenting bad fails because the companion has no C instance receiver.", isCorrect: true }, { id: "B", label: "It prints the latest C.n.", isCorrect: false }, { id: "C", label: "It creates C automatically.", isCorrect: false }, { id: "D", label: "n becomes static.", isCorrect: false }], explanation: { codeRef: "Instance misconception", detail: "Companion members are not instance members." } },
    { id: "world-11-companion-objects-predict-6", questionNumber: 6, totalQuestions: 6, title: "One companion", topicMeta: "compilation", language: 'Kotlin', code: [
      "class C {",
      "    companion object A",
      "    // companion object B",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "A class can declare only one companion object.", isCorrect: true }, { id: "B", label: "Any number of companions are allowed.", isCorrect: false }, { id: "C", label: "Named companions are not objects.", isCorrect: false }, { id: "D", label: "A companion requires a constructor.", isCorrect: false }], explanation: { codeRef: "One companion", detail: "Kotlin permits one companion per class." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Create through a Companion Factory", description: "Implement Product.of so callers use a controlled factory.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "CreatethroughaCompanionFactory.kt", initialCode: "class Product private constructor(val sku:String){\n    companion object {\n        fun of(raw:String):Product {\n            TODO()\n        }\n    }\n}\nfun main(){ println(Product.of(\"  A7 \").sku) }", solutionCode: "class Product private constructor(val sku:String){\n    companion object {\n        fun of(raw:String):Product {\n            return Product(raw.trim())\n        }\n    }\n}\nfun main(){ println(Product.of(\"  A7 \").sku) }", sampleInput: 'main()', expectedOutput: "A7", testCase: { call: '', expected: "A7" } },
  debug: { title: "Fix the Companion Instance Access", subtitle: "The companion incorrectly tries to read instance state directly.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "class Account(val id:Int){\n    companion object {\n        fun label()=\"account:$id\"\n    }\n}\nfun main(){println(Account.label())}", fixedCode: "class Account(val id:Int){\n    companion object {\n        fun label(account:Account)=\"account:${account.id}\"\n    }\n}\nfun main(){println(Account.label(Account(9)))}", expectedOutput: "account:9", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Pass the Account instance explicitly; the companion has no implicit enclosing Account receiver." },
  mastered: { topicTitle: "Companion Objects", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "6 / 6 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "6 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "6 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const EXTENSION_FUNCTIONS_LESSON: FiveStageLesson = {
  id: "world-11-extension-functions", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Extension Functions",
  learn: { title: "Add External Behavior with Extension Functions", subtitle: "Add convenient callable syntax without modifying a receiver type, and reason about static extension resolution versus dynamic member dispatch. Prerequisite: Functions, inheritance, visibility.", exampleTag: 'EXAMPLE', exampleTitle: "Core Extension Functions syntax", language: 'Kotlin', codeSnippet: [
    "fun String.initials(): String =",
    "    split(\" \").filter { it.isNotEmpty() }.joinToString(\"\") { it.first().uppercase() }",
    "",
    "fun main() {",
    "    println(\"Ada Lovelace\".initials())",
    "}"
  ], explanation: "Add convenient callable syntax without modifying a receiver type, and reason about static extension resolution versus dynamic member dispatch. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Extensions do not modify the class", description: "They declare externally resolved callable syntax on a receiver type." }, { number: 2, title: "this is the extension receiver", description: "Inside the extension, this refers to the receiver value." }, { number: 3, title: "Members win", description: "A real member with an applicable same signature takes precedence over an extension." }, { number: 4, title: "Extensions dispatch statically", description: "Which extension is selected depends on the compile-time receiver type, not runtime subtype." }], keyTakeaway: "Add convenient callable syntax without modifying a receiver type, and reason about static extension resolution versus dynamic member dispatch." },
  explore: { title: 'Explore the Concept', subtitle: "7 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-extension-functions-explore-1", number: "01", title: "Basic receiver", language: 'Kotlin', subtitle: "Extension call uses normal dot syntax.", code: [
      "fun String.shout() = uppercase() + \"!\"",
      "",
      "println(\"hi\".shout())"
    ], whatItMeans: [{ label: 'Behavior', description: "Extension call uses normal dot syntax." }], whatChanged: "Covers a distinct mapped scenario: Basic receiver." },
    { id: "world-11-extension-functions-explore-2", number: "02", title: "Parameter", language: 'Kotlin', subtitle: "Extensions can accept parameters and return values.", code: [
      "fun Int.timesText(s: String) = s.repeat(this)",
      "",
      "println(3.timesText(\"x\"))"
    ], whatItMeans: [{ label: 'Behavior', description: "Extensions can accept parameters and return values." }], whatChanged: "Covers a distinct mapped scenario: Parameter." },
    { id: "world-11-extension-functions-explore-3", number: "03", title: "Nullable receiver", language: 'Kotlin', subtitle: "Nullable receiver extensions can handle null directly.", code: [
      "fun String?.orDash() = this ?: \"-\"",
      "",
      "val s: String? = null",
      "println(s.orDash())"
    ], whatItMeans: [{ label: 'Behavior', description: "Nullable receiver extensions can handle null directly." }], whatChanged: "Covers a distinct mapped scenario: Nullable receiver." },
    { id: "world-11-extension-functions-explore-4", number: "04", title: "Member wins", language: 'Kotlin', subtitle: "A member function wins over an extension of the same signature.", code: [
      "class A {",
      "    fun f() = \"member\"",
      "}",
      "fun A.f() = \"extension\"",
      "",
      "println(A().f())"
    ], whatItMeans: [{ label: 'Behavior', description: "A member function wins over an extension of the same signature." }], whatChanged: "Covers a distinct mapped scenario: Member wins." },
    { id: "world-11-extension-functions-explore-5", number: "05", title: "Static resolution", language: 'Kotlin', subtitle: "The A extension is chosen from the variable's compile-time type.", code: [
      "open class A",
      "class B : A()",
      "",
      "fun A.name() = \"A\"",
      "fun B.name() = \"B\"",
      "",
      "val x: A = B()",
      "println(x.name())"
    ], whatItMeans: [{ label: 'Behavior', description: "The A extension is chosen from the variable's compile-time type." }], whatChanged: "Covers a distinct mapped scenario: Static resolution." },
    { id: "world-11-extension-functions-explore-6", number: "06", title: "Private boundary", language: 'Kotlin', subtitle: "Member-like syntax does not grant private/protected access.", code: [
      "class User(private val secret: String)",
      "",
      "// fun User.reveal() = secret // ERROR: extension cannot access private receiver state"
    ], whatItMeans: [{ label: 'Behavior', description: "Member-like syntax does not grant private/protected access." }], whatChanged: "Covers a distinct mapped scenario: Private boundary." },
    { id: "world-11-extension-functions-explore-7", number: "07", title: "Top-level/import model", language: 'Kotlin', subtitle: "Top-level extensions are ordinary declarations that can be imported.", code: [
      "fun String.wordCount() = trim().split(\" \").size",
      "",
      "println(\"one two\".wordCount())"
    ], whatItMeans: [{ label: 'Behavior', description: "Top-level extensions are ordinary declarations that can be imported." }], whatChanged: "Covers a distinct mapped scenario: Top-level/import model." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-extension-functions-predict-1", questionNumber: 1, totalQuestions: 7, title: "Basic call", topicMeta: "output", language: 'Kotlin', code: [
      "fun String.tag() = \"<$this>\"",
      "",
      "fun main() {",
      "    println(\"x\".tag())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "<x>", isCorrect: true }, { id: "B", label: "x", isCorrect: false }, { id: "C", label: "tag", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Basic call", detail: "this is x inside the extension." } },
    { id: "world-11-extension-functions-predict-2", questionNumber: 2, totalQuestions: 7, title: "Nullable", topicMeta: "output", language: 'Kotlin', code: [
      "fun String?.sizeOrZero() = this?.length ?: 0",
      "",
      "fun main() {",
      "    val s: String? = null",
      "    println(s.sizeOrZero())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "0", isCorrect: true }, { id: "B", label: "null", isCorrect: false }, { id: "C", label: "1", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Nullable", detail: "The nullable receiver handles null." } },
    { id: "world-11-extension-functions-predict-3", questionNumber: 3, totalQuestions: 7, title: "Member precedence", topicMeta: "dispatch", language: 'Kotlin', code: [
      "class A {",
      "    fun f() = \"M\"",
      "}",
      "fun A.f() = \"E\"",
      "",
      "fun main() {",
      "    println(A().f())",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The member runs and prints M.", isCorrect: true }, { id: "B", label: "The extension runs and prints E.", isCorrect: false }, { id: "C", label: "Both run.", isCorrect: false }, { id: "D", label: "Compilation is ambiguous.", isCorrect: false }], explanation: { codeRef: "Member precedence", detail: "Members take precedence over extensions." } },
    { id: "world-11-extension-functions-predict-4", questionNumber: 4, totalQuestions: 7, title: "Static dispatch", topicMeta: "dispatch", language: 'Kotlin', code: [
      "open class A",
      "class B : A()",
      "",
      "fun A.k() = \"A\"",
      "fun B.k() = \"B\"",
      "",
      "fun main() {",
      "    val x: A = B()",
      "    println(x.k())",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The A extension runs and prints A.", isCorrect: true }, { id: "B", label: "The B extension runs and prints B.", isCorrect: false }, { id: "C", label: "Both run.", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Static dispatch", detail: "Extension resolution uses the declared receiver type." } },
    { id: "world-11-extension-functions-predict-5", questionNumber: 5, totalQuestions: 7, title: "Parameter", topicMeta: "output", language: 'Kotlin', code: [
      "fun Int.add(n: Int) = this + n",
      "",
      "fun main() {",
      "    println(4.add(3))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "7", isCorrect: true }, { id: "B", label: "4", isCorrect: false }, { id: "C", label: "3", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Parameter", detail: "The receiver participates like an implicit first argument." } },
    { id: "world-11-extension-functions-predict-6", questionNumber: 6, totalQuestions: 7, title: "Private access", topicMeta: "compilation", language: 'Kotlin', code: [
      "class A(private val x: Int)",
      "",
      "// fun A.read() = x"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Uncommenting read fails because an external extension cannot access A.x.", isCorrect: true }, { id: "B", label: "It compiles because extensions become members.", isCorrect: false }, { id: "C", label: "It compiles only for val.", isCorrect: false }, { id: "D", label: "x becomes protected.", isCorrect: false }], explanation: { codeRef: "Private access", detail: "Extensions do not bypass visibility." } },
    { id: "world-11-extension-functions-predict-7", questionNumber: 7, totalQuestions: 7, title: "No class mutation", topicMeta: "behavior", language: 'Kotlin', code: [
      "class A",
      "fun A.label() = \"a\""
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "label is an external extension; it is not inserted as a virtual member into A.", isCorrect: true }, { id: "B", label: "A is rewritten to contain label.", isCorrect: false }, { id: "C", label: "Every subclass must override label.", isCorrect: false }, { id: "D", label: "label changes A's constructor.", isCorrect: false }], explanation: { codeRef: "No class mutation", detail: "Extension syntax does not mutate the receiver class." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Add a Domain Extension", description: "Implement centsLabel as an Int extension and use it through dot syntax.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "AddaDomainExtension.kt", initialCode: "fun Int.centsLabel(): String {\n    TODO()\n}\nfun main(){\n    println(250.centsLabel())\n}", solutionCode: "fun Int.centsLabel(): String {\n    return \"$this cents\"\n}\nfun main(){\n    println(250.centsLabel())\n}", sampleInput: 'main()', expectedOutput: "250 cents", testCase: { call: '', expected: "250 cents" } },
  debug: { title: "Fix Static Extension Resolution", subtitle: "The program expects the derived extension but stores the receiver as the base type.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "open class Message\nclass ErrorMessage:Message()\nfun Message.kind()=\"message\"\nfun ErrorMessage.kind()=\"error\"\nfun main(){\n    val m:Message=ErrorMessage()\n    println(m.kind())\n}", fixedCode: "open class Message\nclass ErrorMessage:Message()\nfun Message.kind()=\"message\"\nfun ErrorMessage.kind()=\"error\"\nfun main(){\n    val m=ErrorMessage()\n    println(m.kind())\n}", expectedOutput: "error", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Extensions are statically resolved; keep the receiver typed as ErrorMessage when that extension is required." },
  mastered: { topicTitle: "Extension Functions", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "7 / 7 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "7 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "7 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const EXTENSION_PROPERTIES_LESSON: FiveStageLesson = {
  id: "world-11-extension-properties", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Extension Properties",
  learn: { title: "Expose Computed Views with Extension Properties", subtitle: "Expose derived property-like values without pretending extensions can store backing state. Prerequisite: Extension functions and properties.", exampleTag: 'EXAMPLE', exampleTitle: "Core Extension Properties syntax", language: 'Kotlin', codeSnippet: [
    "data class Size(val width: Int, val height: Int)",
    "val Size.area: Int get() = width * height",
    "",
    "fun main() {",
    "    println(Size(3, 4).area)",
    "}"
  ], explanation: "Expose derived property-like values without pretending extensions can store backing state. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "No backing field", description: "Extension properties cannot store per-instance state because they do not actually add fields to the receiver." }, { number: 2, title: "Getter computes the value", description: "A val extension property commonly supplies get() based on public receiver state." }, { number: 3, title: "Use property semantics", description: "Prefer an extension property for cheap value-like derived information, not actions or surprising side effects." }, { number: 4, title: "Resolution is static", description: "Extension properties follow the same static receiver-resolution model as extension functions." }], keyTakeaway: "Expose derived property-like values without pretending extensions can store backing state." },
  explore: { title: 'Explore the Concept', subtitle: "6 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-extension-properties-explore-1", number: "01", title: "Computed getter", language: 'Kotlin', subtitle: "The getter derives a value from receiver state.", code: [
      "val String.lastIndexSafe: Int get() = length - 1",
      "",
      "println(\"abc\".lastIndexSafe)"
    ], whatItMeans: [{ label: 'Behavior', description: "The getter derives a value from receiver state." }], whatChanged: "Covers a distinct mapped scenario: Computed getter." },
    { id: "world-11-extension-properties-explore-2", number: "02", title: "Nullable receiver", language: 'Kotlin', subtitle: "Nullable receiver properties can safely derive values.", code: [
      "val String?.lengthOrZero: Int get() = this?.length ?: 0",
      "",
      "val s: String? = null",
      "println(s.lengthOrZero)"
    ], whatItMeans: [{ label: 'Behavior', description: "Nullable receiver properties can safely derive values." }], whatChanged: "Covers a distinct mapped scenario: Nullable receiver." },
    { id: "world-11-extension-properties-explore-3", number: "03", title: "No initializer storage", language: 'Kotlin', subtitle: "Extension properties cannot have backing fields.", code: [
      "// val String.cached: Int = 1 // invalid extension property with backing storage"
    ], whatItMeans: [{ label: 'Behavior', description: "Extension properties cannot have backing fields." }], whatChanged: "Covers a distinct mapped scenario: No initializer storage." },
    { id: "world-11-extension-properties-explore-4", number: "04", title: "Member property wins", language: 'Kotlin', subtitle: "A real member property wins over the extension.", code: [
      "class A {",
      "    val count = 5",
      "}",
      "val A.count: Int get() = 9",
      "",
      "println(A().count)"
    ], whatItMeans: [{ label: 'Behavior', description: "A real member property wins over the extension." }], whatChanged: "Covers a distinct mapped scenario: Member property wins." },
    { id: "world-11-extension-properties-explore-5", number: "05", title: "Derived domain view", language: 'Kotlin', subtitle: "Computed property syntax suits value-like views.", code: [
      "data class Price(val cents: Int)",
      "val Price.dollars: Int get() = cents / 100",
      "",
      "println(Price(500).dollars)"
    ], whatItMeans: [{ label: 'Behavior', description: "Computed property syntax suits value-like views." }], whatChanged: "Covers a distinct mapped scenario: Derived domain view." },
    { id: "world-11-extension-properties-explore-6", number: "06", title: "Private boundary", language: 'Kotlin', subtitle: "Extension status does not grant access to receiver-private members.", code: [
      "class A(private val n: Int)",
      "",
      "// val A.hidden: Int get() = n // ERROR"
    ], whatItMeans: [{ label: 'Behavior', description: "Extension status does not grant access to receiver-private members." }], whatChanged: "Covers a distinct mapped scenario: Private boundary." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-extension-properties-predict-1", questionNumber: 1, totalQuestions: 6, title: "Computed value", topicMeta: "output", language: 'Kotlin', code: [
      "data class R(val w: Int, val h: Int)",
      "val R.area: Int get() = w * h",
      "",
      "fun main() {",
      "    println(R(2, 5).area)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "10", isCorrect: true }, { id: "B", label: "7", isCorrect: false }, { id: "C", label: "R", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Computed value", detail: "The getter computes 2*5." } },
    { id: "world-11-extension-properties-predict-2", questionNumber: 2, totalQuestions: 6, title: "Nullable receiver", topicMeta: "output", language: 'Kotlin', code: [
      "val String?.empty: Boolean get() = this == null || isEmpty()",
      "",
      "fun main() {",
      "    val s: String? = null",
      "    println(s.empty)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Nullable receiver", detail: "The getter handles a null receiver." } },
    { id: "world-11-extension-properties-predict-3", questionNumber: 3, totalQuestions: 6, title: "Backing field", topicMeta: "compilation", language: 'Kotlin', code: [
      "// val String.memo: Int = 1"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "An extension property cannot use an initializer as stored backing state.", isCorrect: true }, { id: "B", label: "It creates one field per String.", isCorrect: false }, { id: "C", label: "It creates one global field automatically.", isCorrect: false }, { id: "D", label: "Only var extensions need getters.", isCorrect: false }], explanation: { codeRef: "Backing field", detail: "Extensions do not add storage to receiver instances." } },
    { id: "world-11-extension-properties-predict-4", questionNumber: 4, totalQuestions: 6, title: "Member precedence", topicMeta: "dispatch", language: 'Kotlin', code: [
      "class A {",
      "    val n = 1",
      "}",
      "val A.n: Int get() = 2",
      "",
      "fun main() {",
      "    println(A().n)",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The member property wins and prints 1.", isCorrect: true }, { id: "B", label: "The extension wins and prints 2.", isCorrect: false }, { id: "C", label: "Both are ambiguous.", isCorrect: false }, { id: "D", label: "Compilation fails.", isCorrect: false }], explanation: { codeRef: "Member precedence", detail: "Members take precedence." } },
    { id: "world-11-extension-properties-predict-5", questionNumber: 5, totalQuestions: 6, title: "Static nature", topicMeta: "dispatch", language: 'Kotlin', code: [
      "open class A",
      "class B : A()",
      "",
      "val A.name: String get() = \"A\"",
      "val B.name: String get() = \"B\"",
      "",
      "fun main() {",
      "    val x: A = B()",
      "    println(x.name)",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The A extension property is selected and prints A.", isCorrect: true }, { id: "B", label: "The B extension prints B.", isCorrect: false }, { id: "C", label: "Both print.", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Static nature", detail: "Extension properties resolve from compile-time receiver type." } },
    { id: "world-11-extension-properties-predict-6", questionNumber: 6, totalQuestions: 6, title: "Private access", topicMeta: "compilation", language: 'Kotlin', code: [
      "class A(private val n: Int)",
      "",
      "// val A.read: Int get() = n"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "The extension cannot access private n.", isCorrect: true }, { id: "B", label: "The extension can always access n.", isCorrect: false }, { id: "C", label: "Only val private members are accessible.", isCorrect: false }, { id: "D", label: "It compiles only in main.", isCorrect: false }], explanation: { codeRef: "Private access", detail: "Extensions do not become privileged receiver members." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Create a Derived Extension Property", description: "Implement Rectangle.perimeter as a computed extension property.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "CreateaDerivedExtensionProperty.kt", initialCode: "data class Rectangle(val w:Int,val h:Int)\nval Rectangle.perimeter:Int\n    get() = TODO()\n\nfun main(){ println(Rectangle(3,5).perimeter) }", solutionCode: "data class Rectangle(val w:Int,val h:Int)\nval Rectangle.perimeter:Int\n    get() = 2 * (w + h)\n\nfun main(){ println(Rectangle(3,5).perimeter) }", sampleInput: 'main()', expectedOutput: "16", testCase: { call: '', expected: "16" } },
  debug: { title: "Fix the Fake Stored Extension", subtitle: "The extension property incorrectly tries to use an initializer as receiver storage.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "data class User(val first:String,val last:String)\nval User.fullName:String = \"$first $last\"\nfun main(){println(User(\"Ada\",\"Lovelace\").fullName)}", fixedCode: "data class User(val first:String,val last:String)\nval User.fullName:String\n    get() = \"$first $last\"\nfun main(){println(User(\"Ada\",\"Lovelace\").fullName)}", expectedOutput: "Ada Lovelace", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Use a getter; extension properties have no backing field." },
  mastered: { topicTitle: "Extension Properties", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "6 / 6 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "6 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "6 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const DELEGATION_LESSON: FiveStageLesson = {
  id: "world-11-delegation", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Delegation",
  learn: { title: "Forward an Interface with by", subtitle: "Reuse behavior through composition with interface delegation, and override selected wrapper behavior deliberately. Prerequisite: Interfaces and composition.", exampleTag: 'EXAMPLE', exampleTitle: "Core Delegation syntax", language: 'Kotlin', codeSnippet: [
    "interface Printer {",
    "    fun print(): String",
    "}",
    "class BasicPrinter : Printer {",
    "    override fun print() = \"basic\"",
    "}",
    "class AuditedPrinter(private val delegate: Printer) : Printer by delegate",
    "",
    "fun main() {",
    "    println(AuditedPrinter(BasicPrinter()).print())",
    "}"
  ], explanation: "Reuse behavior through composition with interface delegation, and override selected wrapper behavior deliberately. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Delegation is composition", description: "A wrapper holds a collaborator instead of inheriting its implementation." }, { number: 2, title: "by forwards interface members", description: "class Wrapper(d: Interface) : Interface by d generates forwarding implementations." }, { number: 3, title: "Wrapper overrides win for external calls", description: "The delegating class can explicitly override selected interface members." }, { number: 4, title: "Delegate self-calls stay on delegate", description: "Calls made inside the delegate to its own members are not automatically rerouted through wrapper overrides." }], keyTakeaway: "Reuse behavior through composition with interface delegation, and override selected wrapper behavior deliberately." },
  explore: { title: 'Explore the Concept', subtitle: "6 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-delegation-explore-1", number: "01", title: "Basic forwarding", language: 'Kotlin', subtitle: "by forwards the interface call.", code: [
      "interface P {",
      "    fun text(): String",
      "}",
      "class Base : P {",
      "    override fun text() = \"base\"",
      "}",
      "class Wrap(p: P) : P by p",
      "",
      "println(Wrap(Base()).text())"
    ], whatItMeans: [{ label: 'Behavior', description: "by forwards the interface call." }], whatChanged: "Covers a distinct mapped scenario: Basic forwarding." },
    { id: "world-11-delegation-explore-2", number: "02", title: "Override selected member", language: 'Kotlin', subtitle: "An explicit wrapper override replaces forwarding for that member.", code: [
      "interface P {",
      "    fun text(): String",
      "}",
      "class Base : P {",
      "    override fun text() = \"base\"",
      "}",
      "class Wrap(p: P) : P by p {",
      "    override fun text() = \"wrap\"",
      "}",
      "",
      "println(Wrap(Base()).text())"
    ], whatItMeans: [{ label: 'Behavior', description: "An explicit wrapper override replaces forwarding for that member." }], whatChanged: "Covers a distinct mapped scenario: Override selected member." },
    { id: "world-11-delegation-explore-3", number: "03", title: "Constructor delegate", language: 'Kotlin', subtitle: "Delegate objects are commonly supplied as constructor dependencies.", code: [
      "interface Store {",
      "    fun size(): Int",
      "}",
      "class Memory : Store {",
      "    override fun size() = 2",
      "}",
      "class Repo(private val s: Store) : Store by s",
      "",
      "println(Repo(Memory()).size())"
    ], whatItMeans: [{ label: 'Behavior', description: "Delegate objects are commonly supplied as constructor dependencies." }], whatChanged: "Covers a distinct mapped scenario: Constructor delegate." },
    { id: "world-11-delegation-explore-4", number: "04", title: "Different object identity", language: 'Kotlin', subtitle: "The wrapper and delegate are distinct objects.", code: [
      "interface X {",
      "    fun n(): Int",
      "}",
      "class D : X {",
      "    override fun n() = 1",
      "}",
      "class W(val d: D) : X by d",
      "",
      "val d = D()",
      "val w = W(d)",
      "println(w === d)"
    ], whatItMeans: [{ label: 'Behavior', description: "The wrapper and delegate are distinct objects." }], whatChanged: "Covers a distinct mapped scenario: Different object identity." },
    { id: "world-11-delegation-explore-5", number: "05", title: "Manual vs by", language: 'Kotlin', subtitle: "Manual forwarding and by express the same composition idea; by removes boilerplate.", code: [
      "interface X {",
      "    fun n(): Int",
      "}",
      "class D : X {",
      "    override fun n() = 4",
      "}",
      "class W(private val d: X) : X {",
      "    override fun n() = d.n()",
      "}",
      "",
      "println(W(D()).n())"
    ], whatItMeans: [{ label: 'Behavior', description: "Manual forwarding and by express the same composition idea; by removes boilerplate." }], whatChanged: "Covers a distinct mapped scenario: Manual vs by." },
    { id: "world-11-delegation-explore-6", number: "06", title: "Self-call nuance", language: 'Kotlin', subtitle: "D.b() calls D.a() internally, so the result remains D rather than W.", code: ["interface X{", "    fun a():String", "    fun b():String", "}", "class D:X{", "    override fun a()=\"D\"", "    override fun b()=this.a()", "}", "class W(d:X):X by d{override fun a()=\"W\"}", "println(W(D()).b())"], whatItMeans: [{ label: 'Behavior', description: "D.b() calls D.a() internally, so the result remains D rather than W." }], whatChanged: "Covers a distinct mapped scenario: Self-call nuance." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-delegation-predict-1", questionNumber: 1, totalQuestions: 6, title: "Forward", topicMeta: "output", language: 'Kotlin', code: [
      "interface X {",
      "    fun f(): Int",
      "}",
      "class D : X {",
      "    override fun f() = 3",
      "}",
      "class W(d: X) : X by d",
      "",
      "fun main() {",
      "    println(W(D()).f())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "W", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Forward", detail: "The call is forwarded to D." } },
    { id: "world-11-delegation-predict-2", questionNumber: 2, totalQuestions: 6, title: "Override", topicMeta: "dispatch", language: 'Kotlin', code: [
      "interface X {",
      "    fun f(): Int",
      "}",
      "class D : X {",
      "    override fun f() = 3",
      "}",
      "class W(d: X) : X by d {",
      "    override fun f() = 8",
      "}",
      "",
      "fun main() {",
      "    println(W(D()).f())",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "The wrapper override runs and prints 8.", isCorrect: true }, { id: "B", label: "The delegate always wins and prints 3.", isCorrect: false }, { id: "C", label: "Both run.", isCorrect: false }, { id: "D", label: "Compilation is ambiguous.", isCorrect: false }], explanation: { codeRef: "Override", detail: "Explicit wrapper overrides take precedence for calls on W." } },
    { id: "world-11-delegation-predict-3", questionNumber: 3, totalQuestions: 6, title: "Identity", topicMeta: "equality", language: 'Kotlin', code: [
      "interface X",
      "class D : X",
      "class W(val d: D) : X by d",
      "",
      "fun main() {",
      "    val d = D()",
      "    println(W(d) === d)",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "false", isCorrect: true }, { id: "B", label: "true", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Identity", detail: "Delegation does not merge wrapper and delegate identity." } },
    { id: "world-11-delegation-predict-4", questionNumber: 4, totalQuestions: 6, title: "Manual forwarding", topicMeta: "output", language: 'Kotlin', code: [
      "interface X {",
      "    fun f(): Int",
      "}",
      "class D : X {",
      "    override fun f() = 2",
      "}",
      "class W(private val d: X) : X {",
      "    override fun f() = d.f() + 1",
      "}",
      "",
      "fun main() {",
      "    println(W(D()).f())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "2", isCorrect: false }, { id: "C", label: "1", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Manual forwarding", detail: "Manual delegation can decorate the forwarded result." } },
    { id: "world-11-delegation-predict-5", questionNumber: 5, totalQuestions: 6, title: "Self-call", topicMeta: "dispatch", language: 'Kotlin', code: ["interface X{", "    fun a():String", "    fun b():String", "}", "class D:X{", "    override fun a()=\"D\"", "    override fun b()=this.a()", "}", "class W(d:X):X by d{override fun a()=\"W\"}", "fun main(){println(W(D()).b())}"], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "D is printed because the delegate's b() calls its own a().", isCorrect: true }, { id: "B", label: "W is printed.", isCorrect: false }, { id: "C", label: "DW is printed.", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Self-call", detail: "Delegation does not virtualize delegate-internal self-calls through the wrapper." } },
    { id: "world-11-delegation-predict-6", questionNumber: 6, totalQuestions: 6, title: "Type role", topicMeta: "behavior", language: 'Kotlin', code: [
      "interface Reader {",
      "    fun read(): String",
      "}",
      "class FileReader : Reader {",
      "    override fun read() = \"file\"",
      "}",
      "class Cached(r: Reader) : Reader by r"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "Cached reuses Reader behavior through composition without becoming a FileReader subclass.", isCorrect: true }, { id: "B", label: "Cached inherits FileReader implementation as a subclass.", isCorrect: false }, { id: "C", label: "by creates a second FileReader automatically.", isCorrect: false }, { id: "D", label: "Reader becomes a class.", isCorrect: false }], explanation: { codeRef: "Type role", detail: "Interface delegation is composition-based implementation reuse." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Delegate a Storage Interface", description: "Complete CachedStorage using class delegation, overriding only read() to add a prefix.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "DelegateaStorageInterface.kt", initialCode: "interface Storage { fun read():String }\nclass MemoryStorage:Storage { override fun read()=\"memory\" }\n\nclass CachedStorage(private val delegate:Storage) : Storage by delegate {\n    // TODO override read\n}\n\nfun main(){ println(CachedStorage(MemoryStorage()).read()) }", solutionCode: "interface Storage { fun read():String }\nclass MemoryStorage:Storage { override fun read()=\"memory\" }\n\nclass CachedStorage(private val delegate:Storage) : Storage by delegate {\n    override fun read() = \"cached:\" + delegate.read()\n}\n\nfun main(){ println(CachedStorage(MemoryStorage()).read()) }", sampleInput: 'main()', expectedOutput: "cached:memory", testCase: { call: '', expected: "cached:memory" } },
  debug: { title: "Fix the Faked Contract Implementation", subtitle: "The wrapper hardcodes its own answer instead of reusing a real Sender through delegation.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "interface Sender{fun send():String}\nclass EmailSender:Sender{override fun send()=\"email\"}\nclass LoggedSender:Sender{override fun send()=\"pending\"}\nfun main(){println(LoggedSender().send())}", fixedCode: "interface Sender{fun send():String}\nclass EmailSender:Sender{override fun send()=\"email\"}\nclass LoggedSender(sender:Sender):Sender by sender\nfun main(){println(LoggedSender(EmailSender()).send())}", expectedOutput: "email", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Delegate the Sender contract to a real EmailSender instead of faking send() with a hardcoded value." },
  mastered: { topicTitle: "Delegation", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "6 / 6 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "6 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "6 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const DELEGATED_PROPERTIES_LESSON: FiveStageLesson = {
  id: "world-11-delegated-properties", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Delegated Properties",
  learn: { title: "Delegate Property Access with by", subtitle: "Use property delegation for lazy computation and reusable access behavior, and distinguish it from class delegation. Prerequisite: Properties, lambdas, object delegation.", exampleTag: 'EXAMPLE', exampleTitle: "Core Delegated Properties syntax", language: 'Kotlin', codeSnippet: [
    "class Profile {",
    "    val greeting: String by lazy {",
    "        println(\"compute\")",
    "        \"hello\"",
    "    }",
    "}",
    "",
    "fun main() {",
    "    val p = Profile()",
    "    println(p.greeting)",
    "    println(p.greeting)",
    "}"
  ], explanation: "Use property delegation for lazy computation and reusable access behavior, and distinguish it from class delegation. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Property by delegate", description: "val/var property by expression routes access through a delegate protocol." }, { number: 2, title: "lazy computes once", description: "The standard lazy delegate computes on first access and caches the result for later reads." }, { number: 3, title: "Custom delegates implement access operators", description: "Read-only delegates need compatible getValue; mutable delegates also need setValue." }, { number: 4, title: "Different from class delegation", description: "Both use by, but property delegation controls property access rather than forwarding an interface." }], keyTakeaway: "Use property delegation for lazy computation and reusable access behavior, and distinguish it from class delegation." },
  explore: { title: 'Explore the Concept', subtitle: "7 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-delegated-properties-explore-1", number: "01", title: "lazy first access", language: 'Kotlin', subtitle: "The initializer runs only when value is first read.", code: [
      "val value by lazy {",
      "    println(\"build\")",
      "    7",
      "}",
      "",
      "println(\"before\")",
      "println(value)"
    ], whatItMeans: [{ label: 'Behavior', description: "The initializer runs only when value is first read." }], whatChanged: "Covers a distinct mapped scenario: lazy first access." },
    { id: "world-11-delegated-properties-explore-2", number: "02", title: "lazy caches", language: 'Kotlin', subtitle: "The initializer runs once and the cached value is reused.", code: [
      "var calls = 0",
      "val value by lazy {",
      "    calls++",
      "    10",
      "}",
      "",
      "println(value)",
      "println(value)",
      "println(calls)"
    ], whatItMeans: [{ label: 'Behavior', description: "The initializer runs once and the cached value is reused." }], whatChanged: "Covers a distinct mapped scenario: lazy caches." },
    { id: "world-11-delegated-properties-explore-3", number: "03", title: "Custom getValue", language: 'Kotlin', subtitle: "A read-only custom delegate supplies getValue.", code: [
      "import kotlin.reflect.KProperty",
      "",
      "class D {",
      "    operator fun getValue(thisRef: Any?, p: KProperty<*>) = \"${p.name}:ok\"",
      "}",
      "",
      "val status by D()",
      "println(status)"
    ], whatItMeans: [{ label: 'Behavior', description: "A read-only custom delegate supplies getValue." }], whatChanged: "Covers a distinct mapped scenario: Custom getValue." },
    { id: "world-11-delegated-properties-explore-4", number: "04", title: "Custom mutable delegate", language: 'Kotlin', subtitle: "A var delegate needs both getValue and setValue.", code: [
      "import kotlin.reflect.KProperty",
      "",
      "class D {",
      "    private var v = 0",
      "    operator fun getValue(r: Any?, p: KProperty<*>) = v",
      "    operator fun setValue(r: Any?, p: KProperty<*>, n: Int) { v = n }",
      "}",
      "",
      "var score by D()",
      "score = 5",
      "println(score)"
    ], whatItMeans: [{ label: 'Behavior', description: "A var delegate needs both getValue and setValue." }], whatChanged: "Covers a distinct mapped scenario: Custom mutable delegate." },
    { id: "world-11-delegated-properties-explore-5", number: "05", title: "Map-backed property", language: 'Kotlin', subtitle: "Map delegation can provide values by property name.", code: [
      "val user = mapOf(\"name\" to \"Ada\")",
      "val name: String by user",
      "",
      "println(name)"
    ], whatItMeans: [{ label: 'Behavior', description: "Map delegation can provide values by property name." }], whatChanged: "Covers a distinct mapped scenario: Map-backed property." },
    { id: "world-11-delegated-properties-explore-6", number: "06", title: "Local lazy", language: 'Kotlin', subtitle: "Local variables can also be delegated.", code: [
      "fun main() {",
      "    val n by lazy { 3 * 4 }",
      "    println(n)",
      "}"
    ], whatItMeans: [{ label: 'Behavior', description: "Local variables can also be delegated." }], whatChanged: "Covers a distinct mapped scenario: Local lazy." },
    { id: "world-11-delegated-properties-explore-7", number: "07", title: "Compile boundary var + lazy", language: 'Kotlin', subtitle: "A read-only delegate cannot satisfy a mutable var.", code: ["// var n by lazy { 1 } // ERROR: lazy is read-only and has no setValue"], whatItMeans: [{ label: 'Behavior', description: "A read-only delegate cannot satisfy a mutable var." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary var + lazy." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-delegated-properties-predict-1", questionNumber: 1, totalQuestions: 7, title: "Lazy order", topicMeta: "output", language: 'Kotlin', code: [
      "val x by lazy {",
      "    println(\"build\")",
      "    4",
      "}",
      "",
      "fun main() {",
      "    println(\"A\")",
      "    println(x)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "A\nbuild\n4", isCorrect: true }, { id: "B", label: "build\nA\n4", isCorrect: false }, { id: "C", label: "A\n4", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Lazy order", detail: "lazy executes when x is first read." } },
    { id: "world-11-delegated-properties-predict-2", questionNumber: 2, totalQuestions: 7, title: "Lazy caching", topicMeta: "output", language: 'Kotlin', code: [
      "var c = 0",
      "val x by lazy { ++c }",
      "",
      "fun main() {",
      "    println(x)",
      "    println(x)",
      "    println(c)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "1\n1\n1", isCorrect: true }, { id: "B", label: "1\n2\n2", isCorrect: false }, { id: "C", label: "0\n0\n0", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Lazy caching", detail: "The computed value is cached after first access." } },
    { id: "world-11-delegated-properties-predict-3", questionNumber: 3, totalQuestions: 7, title: "Read-only boundary", topicMeta: "compilation", language: 'Kotlin', code: ["// var x by lazy { 1 }"], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "A mutable var cannot use lazy because lazy provides no setter.", isCorrect: true }, { id: "B", label: "It compiles and recomputes on assignment.", isCorrect: false }, { id: "C", label: "It creates a normal var.", isCorrect: false }, { id: "D", label: "lazy becomes mutable automatically.", isCorrect: false }], explanation: { codeRef: "Read-only boundary", detail: "lazy is a read-only delegate." } },
    { id: "world-11-delegated-properties-predict-4", questionNumber: 4, totalQuestions: 7, title: "Map delegate", topicMeta: "output", language: 'Kotlin', code: [
      "fun main() {",
      "    val m = mapOf(\"city\" to \"Pune\")",
      "    val city: String by m",
      "    println(city)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "Pune", isCorrect: true }, { id: "B", label: "city", isCorrect: false }, { id: "C", label: "null", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Map delegate", detail: "The map supplies the entry matching the property name." } },
    { id: "world-11-delegated-properties-predict-5", questionNumber: 5, totalQuestions: 7, title: "getValue metadata", topicMeta: "output", language: 'Kotlin', code: [
      "import kotlin.reflect.KProperty",
      "",
      "class D {",
      "    operator fun getValue(r: Any?, p: KProperty<*>) = p.name",
      "}",
      "",
      "val answer by D()",
      "",
      "fun main() {",
      "    println(answer)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "answer", isCorrect: true }, { id: "B", label: "D", isCorrect: false }, { id: "C", label: "getValue", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "getValue metadata", detail: "The delegate receives KProperty metadata including the property name." } },
    { id: "world-11-delegated-properties-predict-6", questionNumber: 6, totalQuestions: 7, title: "Class vs property delegation", topicMeta: "behavior", language: 'Kotlin', code: [
      "interface X {",
      "    fun f(): Int",
      "}",
      "class D : X {",
      "    override fun f() = 1",
      "}",
      "class W(d: X) : X by d",
      "val n by lazy { 2 }"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "The first by forwards an interface; the second delegates property access.", isCorrect: true }, { id: "B", label: "Both are class inheritance.", isCorrect: false }, { id: "C", label: "Both are lazy properties.", isCorrect: false }, { id: "D", label: "The syntax is invalid twice.", isCorrect: false }], explanation: { codeRef: "Class vs property delegation", detail: "The same keyword supports two distinct delegation mechanisms." } },
    { id: "world-11-delegated-properties-predict-7", questionNumber: 7, totalQuestions: 7, title: "First access only", topicMeta: "output", language: 'Kotlin', code: [
      "var built = false",
      "val x by lazy {",
      "    built = true",
      "    9",
      "}",
      "",
      "fun main() {",
      "    println(built)",
      "    val y = x",
      "    println(built)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "false\ntrue", isCorrect: true }, { id: "B", label: "true\ntrue", isCorrect: false }, { id: "C", label: "false\nfalse", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "First access only", detail: "The lazy block has not run before x is read." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Use lazy for an Expensive Label", description: "Complete the lazy property so its initializer runs once on first access.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "UselazyforanExpensiveLabel.kt", initialCode: "class Report {\n    var builds = 0\n    val label:String by lazy {\n        // TODO increment builds and return \"report\"\n        \"\"\n    }\n}\nfun main(){\n    val r=Report()\n    println(r.builds)\n    println(r.label)\n    println(r.label)\n    println(r.builds)\n}", solutionCode: "class Report {\n    var builds = 0\n    val label:String by lazy {\n        builds++\n        \"report\"\n    }\n}\nfun main(){\n    val r=Report()\n    println(r.builds)\n    println(r.label)\n    println(r.label)\n    println(r.builds)\n}", sampleInput: 'main()', expectedOutput: "0\nreport\nreport\n1", testCase: { call: '', expected: "0\nreport\nreport\n1" } },
  debug: { title: "Fix Recomputed Expensive State", subtitle: "A custom getter recomputes every access; the requirement is compute once on first access.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "class Config {\n    var calls=0\n    val token:String\n        get(){ calls++; return \"T$calls\" }\n}\nfun main(){val c=Config();println(c.token);println(c.token);println(c.calls)}", fixedCode: "class Config {\n    var calls=0\n    val token:String by lazy { calls++; \"T$calls\" }\n}\nfun main(){val c=Config();println(c.token);println(c.token);println(c.calls)}", expectedOutput: "T1\nT1\n1", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Use lazy when the intended semantics are deferred one-time computation plus caching." },
  mastered: { topicTitle: "Delegated Properties", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "7 / 7 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "7 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "7 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const VISIBILITY_API_DESIGN_LESSON: FiveStageLesson = {
  id: "world-11-visibility-and-api-design", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Visibility & API Design",
  learn: { title: "Use Visibility to Define the Supported API", subtitle: "Design a small public surface, protect invariants with visibility, and understand public/private/protected/internal boundaries. Prerequisite: Classes, inheritance, modules, properties.", exampleTag: 'EXAMPLE', exampleTitle: "Core Visibility & API Design syntax", language: 'Kotlin', codeSnippet: [
    "class Wallet(initial: Int) {",
    "    var balance: Int = initial",
    "        private set",
    "    fun deposit(amount: Int) {",
    "        if (amount > 0) balance += amount",
    "    }",
    "}",
    "",
    "fun main() {",
    "    val w = Wallet(10)",
    "    w.deposit(5)",
    "    println(w.balance)",
    "}"
  ], explanation: "Design a small public surface, protect invariants with visibility, and understand public/private/protected/internal boundaries. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "public is the default", description: "Expose only the declarations callers should rely on." }, { number: 2, title: "private protects implementation/invariants", description: "Class-private members are visible only inside the class; top-level private is file-scoped." }, { number: 3, title: "protected is subclass-facing", description: "Protected class members are visible in the class and subclasses, not unrelated callers." }, { number: 4, title: "internal is module-scoped", description: "internal means visible within the same Kotlin module, not package-private." }, { number: 5, title: "Restrict mutation separately", description: "A public/readable property can use private set to keep writes inside the class." }], keyTakeaway: "Design a small public surface, protect invariants with visibility, and understand public/private/protected/internal boundaries." },
  explore: { title: 'Explore the Concept', subtitle: "6 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-visibility-and-api-design-explore-1", number: "01", title: "private set", language: 'Kotlin', subtitle: "Callers can read n but only class code can set it.", code: [
      "class Counter {",
      "    var n = 0",
      "        private set",
      "    fun inc() { n++ }",
      "}",
      "",
      "val c = Counter()",
      "c.inc()",
      "println(c.n)"
    ], whatItMeans: [{ label: 'Behavior', description: "Callers can read n but only class code can set it." }], whatChanged: "Covers a distinct mapped scenario: private set." },
    { id: "world-11-visibility-and-api-design-explore-2", number: "02", title: "Private constructor", language: 'Kotlin', subtitle: "Constructor visibility can enforce controlled creation.", code: [
      "class Token private constructor(val v: String) {",
      "    companion object {",
      "        fun of(v: String) = Token(v)",
      "    }",
      "}",
      "",
      "println(Token.of(\"x\").v)"
    ], whatItMeans: [{ label: 'Behavior', description: "Constructor visibility can enforce controlled creation." }], whatChanged: "Covers a distinct mapped scenario: Private constructor." },
    { id: "world-11-visibility-and-api-design-explore-3", number: "03", title: "Protected member", language: 'Kotlin', subtitle: "A subclass can access protected state.", code: [
      "open class Base {",
      "    protected val code = 7",
      "}",
      "class Child : Base() {",
      "    fun read() = code",
      "}",
      "",
      "println(Child().read())"
    ], whatItMeans: [{ label: 'Behavior', description: "A subclass can access protected state." }], whatChanged: "Covers a distinct mapped scenario: Protected member." },
    { id: "world-11-visibility-and-api-design-explore-4", number: "04", title: "Internal concept", language: 'Kotlin', subtitle: "internal is a module boundary; a single-file JVM compilation is within one module.", code: [
      "internal class Engine(val name: String)",
      "",
      "println(Engine(\"core\").name)"
    ], whatItMeans: [{ label: 'Behavior', description: "internal is a module boundary; a single-file JVM compilation is within one module." }], whatChanged: "Covers a distinct mapped scenario: Internal concept." },
    { id: "world-11-visibility-and-api-design-explore-5", number: "05", title: "Top-level private", language: 'Kotlin', subtitle: "Top-level private remains usable within its file.", code: [
      "private fun secret() = \"x\"",
      "",
      "fun main() {",
      "    println(secret())",
      "}"
    ], whatItMeans: [{ label: 'Behavior', description: "Top-level private remains usable within its file." }], whatChanged: "Covers a distinct mapped scenario: Top-level private." },
    { id: "world-11-visibility-and-api-design-explore-6", number: "06", title: "Compile boundary external private set", language: 'Kotlin', subtitle: "The compiler enforces restricted setters.", code: [
      "class A {",
      "    var n = 0",
      "        private set",
      "}",
      "",
      "// fun main() { A().n = 2 } // ERROR"
    ], whatItMeans: [{ label: 'Behavior', description: "The compiler enforces restricted setters." }], whatChanged: "Covers a distinct mapped scenario: Compile boundary external private set." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-visibility-and-api-design-predict-1", questionNumber: 1, totalQuestions: 6, title: "Private setter", topicMeta: "output", language: 'Kotlin', code: [
      "class A {",
      "    var n = 1",
      "        private set",
      "    fun inc() { n++ }",
      "}",
      "",
      "fun main() {",
      "    val a = A()",
      "    a.inc()",
      "    println(a.n)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "2", isCorrect: true }, { id: "B", label: "1", isCorrect: false }, { id: "C", label: "0", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Private setter", detail: "Class code can use the private setter." } },
    { id: "world-11-visibility-and-api-design-predict-2", questionNumber: 2, totalQuestions: 6, title: "External private setter", topicMeta: "compilation", language: 'Kotlin', code: [
      "class A {",
      "    var n = 1",
      "        private set",
      "}",
      "",
      "fun main() {",
      "    val a = A()",
      "    a.n = 2",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "It fails because n's setter is private.", isCorrect: true }, { id: "B", label: "It prints 2.", isCorrect: false }, { id: "C", label: "private affects only reading.", isCorrect: false }, { id: "D", label: "It is allowed in the same package.", isCorrect: false }], explanation: { codeRef: "External private setter", detail: "Setter visibility is compiler-enforced." } },
    { id: "world-11-visibility-and-api-design-predict-3", questionNumber: 3, totalQuestions: 6, title: "Protected", topicMeta: "output", language: 'Kotlin', code: [
      "open class A {",
      "    protected val n = 3",
      "}",
      "class B : A() {",
      "    fun read() = n",
      "}",
      "",
      "fun main() {",
      "    println(B().read())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "A", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Protected", detail: "Subclass B may access protected n." } },
    { id: "world-11-visibility-and-api-design-predict-4", questionNumber: 4, totalQuestions: 6, title: "Unrelated protected access", topicMeta: "compilation", language: 'Kotlin', code: [
      "open class A {",
      "    protected val n = 3",
      "}",
      "",
      "fun main() {",
      "    // println(A().n)",
      "}"
    ], prompt: "Compilation question: which result is correct?", options: [{ id: "A", label: "Uncommenting the access fails because main is not a subclass context.", isCorrect: true }, { id: "B", label: "protected is public inside the package.", isCorrect: false }, { id: "C", label: "protected means module-only.", isCorrect: false }, { id: "D", label: "A protected member is always private to subclasses.", isCorrect: false }], explanation: { codeRef: "Unrelated protected access", detail: "Kotlin protected is class/subclass visibility." } },
    { id: "world-11-visibility-and-api-design-predict-5", questionNumber: 5, totalQuestions: 6, title: "Internal meaning", topicMeta: "behavior", language: 'Kotlin', code: [
      "internal class Engine"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "Engine is visible within the same module, not merely the same package.", isCorrect: true }, { id: "B", label: "Engine is visible only in its file.", isCorrect: false }, { id: "C", label: "Engine is visible everywhere.", isCorrect: false }, { id: "D", label: "Engine is visible only to subclasses.", isCorrect: false }], explanation: { codeRef: "Internal meaning", detail: "internal is module-scoped." } },
    { id: "world-11-visibility-and-api-design-predict-6", questionNumber: 6, totalQuestions: 6, title: "Top-level private", topicMeta: "output", language: 'Kotlin', code: [
      "private fun x() = 1",
      "",
      "fun main() {",
      "    println(x())",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "1", isCorrect: true }, { id: "B", label: "Compilation error", isCorrect: false }, { id: "C", label: "0", isCorrect: false }, { id: "D", label: "private", isCorrect: false }], explanation: { codeRef: "Top-level private", detail: "Top-level private is visible within the same file." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Protect Account Mutation", description: "Use a private setter and controlled deposit method so callers can read but not directly mutate balance.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "ProtectAccountMutation.kt", initialCode: "class Account(initial:Int){\n    var balance:Int = initial\n        // TODO restrict setter\n\n    fun deposit(amount:Int){\n        // TODO accept positive amounts only\n    }\n}\nfun main(){\n    val a=Account(10)\n    a.deposit(5)\n    println(a.balance)\n}", solutionCode: "class Account(initial:Int){\n    var balance:Int = initial\n        private set\n\n    fun deposit(amount:Int){\n        if(amount>0) balance += amount\n    }\n}\nfun main(){\n    val a=Account(10)\n    a.deposit(5)\n    println(a.balance)\n}", sampleInput: 'main()', expectedOutput: "15", testCase: { call: '', expected: "15" } },
  debug: { title: "Fix the Leaky Mutable API", subtitle: "The service exposes its mutable list directly, allowing callers to bypass add().", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "class Service {\n    val items = mutableListOf<String>()\n    fun add(value:String){ if(value.isNotBlank()) items.add(value) }\n}\nfun main(){\n    val s=Service()\n    s.items.add(\"\")\n    println(s.items.size)\n}", fixedCode: "class Service {\n    private val mutableItems = mutableListOf<String>()\n    val items:List<String> get() = mutableItems.toList()\n    fun add(value:String){ if(value.isNotBlank()) mutableItems.add(value) }\n}\nfun main(){\n    val s=Service()\n    s.add(\"\")\n    println(s.items.size)\n}", expectedOutput: "0", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Hide the mutable storage and expose a read-only snapshot through the supported API." },
  mastered: { topicTitle: "Visibility & API Design", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "6 / 6 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "6 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "6 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const DOMAIN_MODEL_ENGINE_BOSS_LESSON: FiveStageLesson = {
  id: "world-11-boss", worldId: 'world-11', worldName: 'OOP Evolution', stageName: 'STAGE 11 — ADVANCED OOP', topicTitle: "Domain Model Engine (World Boss)",
  learn: { title: "Integrate OOP Features Only Where the Domain Needs Them", subtitle: "Design a coherent domain model using value records, fixed categories, contracts, extension behavior, encapsulation, and a focused service/formatter object. Prerequisite: All World 11 lessons; collections, null safety, functions.", exampleTag: 'EXAMPLE', exampleTitle: "Core Domain Model Engine (World Boss) syntax", language: 'Kotlin', codeSnippet: [
    "enum class Priority { NORMAL, URGENT }",
    "data class Ticket(val id: Int, val title: String, val priority: Priority)",
    "interface Formatter {",
    "    fun format(ticket: Ticket): String",
    "}",
    "object TicketFormatter : Formatter {",
    "    override fun format(ticket: Ticket) = \"${ticket.id}:${ticket.title}:${ticket.priority}\"",
    "}"
  ], explanation: "Design a coherent domain model using value records, fixed categories, contracts, extension behavior, encapsulation, and a focused service/formatter object. The examples use real Kotlin semantics; compile-time boundaries are called out explicitly rather than simulated as runtime behavior.", keyIdeas: [{ number: 1, title: "Model meaning first", description: "Use data class for value records, enum for fixed shared-shape categories, and interfaces for capabilities." }, { number: 2, title: "Keep mutation behind an API", description: "Services should protect internal mutable collections and expose deliberate operations/read-only views." }, { number: 3, title: "Extensions should be derived convenience", description: "Add extension behavior when it reads naturally and does not pretend to own receiver state." }, { number: 4, title: "Do not force every feature", description: "Nested/inner/companion/delegation belong only when the domain actually benefits from them." }], keyTakeaway: "Design a coherent domain model using value records, fixed categories, contracts, extension behavior, encapsulation, and a focused service/formatter object." },
  explore: { title: 'Explore the Concept', subtitle: "8 coverage-derived scenarios; no fixed activity quota.", cards: [
    { id: "world-11-boss-explore-1", number: "01", title: "Value record + enum", language: 'Kotlin', subtitle: "A data class plus enum models a stable value snapshot.", code: [
      "enum class Status { OPEN, CLOSED }",
      "data class Issue(val id: Int, val status: Status)",
      "",
      "println(Issue(1, Status.OPEN))"
    ], whatItMeans: [{ label: 'Behavior', description: "A data class plus enum models a stable value snapshot." }], whatChanged: "Covers a distinct mapped scenario: Value record + enum." },
    { id: "world-11-boss-explore-2", number: "02", title: "Formatter contract", language: 'Kotlin', subtitle: "An interface plus object supplies a replaceable formatting capability.", code: [
      "interface Formatter<T> {",
      "    fun format(value: T): String",
      "}",
      "data class User(val name: String)",
      "object UserFormatter : Formatter<User> {",
      "    override fun format(value: User) = value.name.uppercase()",
      "}",
      "",
      "println(UserFormatter.format(User(\"Ada\")))"
    ], whatItMeans: [{ label: 'Behavior', description: "An interface plus object supplies a replaceable formatting capability." }], whatChanged: "Covers a distinct mapped scenario: Formatter contract." },
    { id: "world-11-boss-explore-3", number: "03", title: "Derived extension", language: 'Kotlin', subtitle: "A computed extension property adds a value-like presentation view.", code: [
      "data class Product(val cents: Int)",
      "val Product.priceLabel: String get() = \"₹${cents / 100}\"",
      "",
      "println(Product(500).priceLabel)"
    ], whatItMeans: [{ label: 'Behavior', description: "A computed extension property adds a value-like presentation view." }], whatChanged: "Covers a distinct mapped scenario: Derived extension." },
    { id: "world-11-boss-explore-4", number: "04", title: "Encapsulated service", language: 'Kotlin', subtitle: "The service owns mutation and returns a snapshot.", code: [
      "class Repo {",
      "    private val xs = mutableListOf<String>()",
      "    fun add(x: String) { xs += x }",
      "    fun all(): List<String> = xs.toList()",
      "}",
      "",
      "val r = Repo()",
      "r.add(\"A\")",
      "println(r.all())"
    ], whatItMeans: [{ label: 'Behavior', description: "The service owns mutation and returns a snapshot." }], whatChanged: "Covers a distinct mapped scenario: Encapsulated service." },
    { id: "world-11-boss-explore-5", number: "05", title: "Polymorphic formatter", language: 'Kotlin', subtitle: "Interface polymorphism can process multiple implementations uniformly.", code: [
      "interface F {",
      "    fun text(): String",
      "}",
      "class A : F {",
      "    override fun text() = \"A\"",
      "}",
      "class B : F {",
      "    override fun text() = \"B\"",
      "}",
      "",
      "println(listOf<F>(A(), B()).joinToString(\"\") { it.text() })"
    ], whatItMeans: [{ label: 'Behavior', description: "Interface polymorphism can process multiple implementations uniformly." }], whatChanged: "Covers a distinct mapped scenario: Polymorphic formatter." },
    { id: "world-11-boss-explore-6", number: "06", title: "Copy state transition", language: 'Kotlin', subtitle: "copy creates a new value snapshot for a state transition.", code: [
      "enum class S { NEW, DONE }",
      "data class Task(val id: Int, val state: S)",
      "",
      "val done = Task(1, S.NEW).copy(state = S.DONE)",
      "println(done)"
    ], whatItMeans: [{ label: 'Behavior', description: "copy creates a new value snapshot for a state transition." }], whatChanged: "Covers a distinct mapped scenario: Copy state transition." },
    { id: "world-11-boss-explore-7", number: "07", title: "Singleton service helper", language: 'Kotlin', subtitle: "A stateless object can represent one intentional shared formatter/helper.", code: [
      "object Slug {",
      "    fun of(s: String) = s.trim().lowercase().replace(\" \", \"-\")",
      "}",
      "",
      "println(Slug.of(\"Hello World\"))"
    ], whatItMeans: [{ label: 'Behavior', description: "A stateless object can represent one intentional shared formatter/helper." }], whatChanged: "Covers a distinct mapped scenario: Singleton service helper." },
    { id: "world-11-boss-explore-8", number: "08", title: "Boundary: don't expose mutable list", language: 'Kotlin', subtitle: "A coherent domain API protects invariants instead of leaking mutable implementation state.", code: [
      "class BadRepo {",
      "    val items = mutableListOf<String>()",
      "}",
      "// Better: private mutable storage + read-only/snapshot API"
    ], whatItMeans: [{ label: 'Behavior', description: "A coherent domain API protects invariants instead of leaking mutable implementation state." }], whatChanged: "Covers a distinct mapped scenario: Boundary: don't expose mutable list." }
  ] },
  predict: { title: 'What will this code do?', subtitle: 'Independent Kotlin reasoning with one correct answer per question.', questions: [
    { id: "world-11-boss-predict-1", questionNumber: 1, totalQuestions: 8, title: "Value equality", topicMeta: "equality", language: 'Kotlin', code: [
      "data class Money(val cents: Int)",
      "",
      "fun main() {",
      "    println(Money(50) == Money(50))",
      "}"
    ], prompt: "Equality question: which result is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Compilation error", isCorrect: false }, { id: "D", label: "Reference-only", isCorrect: false }], explanation: { codeRef: "Value equality", detail: "Domain value records compare structurally." } },
    { id: "world-11-boss-predict-2", questionNumber: 2, totalQuestions: 8, title: "Enum state", topicMeta: "output", language: 'Kotlin', code: [
      "enum class S { OPEN, CLOSED }",
      "",
      "fun main() {",
      "    println(S.CLOSED.name)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "CLOSED", isCorrect: true }, { id: "B", label: "closed", isCorrect: false }, { id: "C", label: "S", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Enum state", detail: "Enum name returns the declared entry name." } },
    { id: "world-11-boss-predict-3", questionNumber: 3, totalQuestions: 8, title: "Interface dispatch", topicMeta: "dispatch", language: 'Kotlin', code: [
      "interface F {",
      "    fun text(): String",
      "}",
      "class X : F {",
      "    override fun text() = \"x\"",
      "}",
      "",
      "fun main() {",
      "    val f: F = X()",
      "    println(f.text())",
      "}"
    ], prompt: "Dispatch question: which result is correct?", options: [{ id: "A", label: "X.text runs and prints x.", isCorrect: true }, { id: "B", label: "F is printed.", isCorrect: false }, { id: "C", label: "No method runs.", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Interface dispatch", detail: "The interface reference dispatches to X." } },
    { id: "world-11-boss-predict-4", questionNumber: 4, totalQuestions: 8, title: "Extension view", topicMeta: "output", language: 'Kotlin', code: [
      "data class P(val n: Int)",
      "val P.double: Int get() = n * 2",
      "",
      "fun main() {",
      "    println(P(4).double)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "8", isCorrect: true }, { id: "B", label: "4", isCorrect: false }, { id: "C", label: "2", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Extension view", detail: "The extension property computes from public receiver state." } },
    { id: "world-11-boss-predict-5", questionNumber: 5, totalQuestions: 8, title: "Encapsulation", topicMeta: "output", language: 'Kotlin', code: ["class R{", "    private val xs=mutableListOf(1)", "    fun size()=xs.size", "}", "fun main(){println(R().size())}"], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "1", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "R", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Encapsulation", detail: "The public method exposes controlled information without exposing storage." } },
    { id: "world-11-boss-predict-6", questionNumber: 6, totalQuestions: 8, title: "Copy transition", topicMeta: "output", language: 'Kotlin', code: [
      "enum class S { A, B }",
      "data class T(val s: S)",
      "",
      "fun main() {",
      "    val a = T(S.A)",
      "    val b = a.copy(s = S.B)",
      "    println(a.s)",
      "    println(b.s)",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "A\nB", isCorrect: true }, { id: "B", label: "B\nB", isCorrect: false }, { id: "C", label: "A\nA", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Copy transition", detail: "copy does not mutate the original data-class instance." } },
    { id: "world-11-boss-predict-7", questionNumber: 7, totalQuestions: 8, title: "Object formatter", topicMeta: "output", language: 'Kotlin', code: [
      "object F {",
      "    fun text(n: Int) = \"#$n\"",
      "}",
      "",
      "fun main() {",
      "    println(F.text(3))",
      "}"
    ], prompt: "Output question: which result is correct?", options: [{ id: "A", label: "#3", isCorrect: true }, { id: "B", label: "3", isCorrect: false }, { id: "C", label: "F", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Object formatter", detail: "The singleton formatter is accessed by object name." } },
    { id: "world-11-boss-predict-8", questionNumber: 8, totalQuestions: 8, title: "API design", topicMeta: "behavior", language: 'Kotlin', code: [
      "class Repo {",
      "    private val xs = mutableListOf<String>()",
      "    fun add(x: String) { xs += x }",
      "    fun all(): List<String> = xs.toList()",
      "}"
    ], prompt: "Behavior question: which result is correct?", options: [{ id: "A", label: "Callers use add/all while Repo retains ownership of mutable storage.", isCorrect: true }, { id: "B", label: "Callers can mutate xs directly.", isCorrect: false }, { id: "C", label: "private makes all() private.", isCorrect: false }, { id: "D", label: "toList returns the same MutableList reference type.", isCorrect: false }], explanation: { codeRef: "API design", detail: "The API exposes behavior while hiding implementation mutation." } }
  ] },
  writeRun: { challengeNumber: 1, totalChallenges: 1, xpReward: 20, title: "Build a Small Ticket Domain", description: "Complete the formatter extension and repository API. Use the existing data class, enum, interface, object, and encapsulated storage naturally.", requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: "BuildaSmallTicketDomain.kt", initialCode: "enum class Priority { NORMAL, URGENT }\ndata class Ticket(val id:Int, val title:String, val priority:Priority)\n\ninterface TicketFormatter { fun format(ticket:Ticket):String }\nobject DefaultTicketFormatter : TicketFormatter {\n    override fun format(ticket:Ticket):String = TODO()\n}\n\nval Ticket.isUrgent:Boolean\n    get() = TODO()\n\nclass TicketRepository {\n    private val items = mutableListOf<Ticket>()\n    fun add(ticket:Ticket){ TODO() }\n    fun all():List<Ticket> = TODO()\n}\n\nfun main(){\n    val repo=TicketRepository()\n    repo.add(Ticket(1,\"Login\",Priority.URGENT))\n    val ticket=repo.all().first()\n    println(DefaultTicketFormatter.format(ticket))\n    println(ticket.isUrgent)\n}", solutionCode: "enum class Priority { NORMAL, URGENT }\ndata class Ticket(val id:Int, val title:String, val priority:Priority)\n\ninterface TicketFormatter { fun format(ticket:Ticket):String }\nobject DefaultTicketFormatter : TicketFormatter {\n    override fun format(ticket:Ticket)=\"${ticket.id}:${ticket.title}:${ticket.priority}\"\n}\n\nval Ticket.isUrgent:Boolean\n    get() = priority == Priority.URGENT\n\nclass TicketRepository {\n    private val items = mutableListOf<Ticket>()\n    fun add(ticket:Ticket){ items.add(ticket) }\n    fun all():List<Ticket> = items.toList()\n}\n\nfun main(){\n    val repo=TicketRepository()\n    repo.add(Ticket(1,\"Login\",Priority.URGENT))\n    val ticket=repo.all().first()\n    println(DefaultTicketFormatter.format(ticket))\n    println(ticket.isUrgent)\n}", sampleInput: 'main()', expectedOutput: "1:Login:URGENT\ntrue", testCase: { call: '', expected: "1:Login:URGENT\ntrue" } },
  debug: { title: "Fix the Domain Equality Bug", subtitle: "The record's status should be part of value equality but was placed outside the primary constructor.", challengeNumber: 1, totalChallenges: 1, difficulty: 'medium', bugType: 'logic', bugLabel: "Topic-specific Kotlin bug", brokenCode: "enum class Status{OPEN,CLOSED}\ndata class Case(val id:Int){\n    var status:Status=Status.OPEN\n}\nfun main(){\n    val a=Case(7)\n    val b=Case(7)\n    b.status=Status.CLOSED\n    println(a==b)\n}", fixedCode: "enum class Status{OPEN,CLOSED}\ndata class Case(val id:Int,val status:Status)\nfun main(){\n    val a=Case(7,Status.OPEN)\n    val b=Case(7,Status.CLOSED)\n    println(a==b)\n}", expectedOutput: "false", hints: ["Identify the exact language rule or domain invariant being violated.", "Compare the broken declaration with the lesson's mapped Kotlin behavior.", "Apply one focused repair; do not rewrite unrelated code."], explanation: "Put domain state that defines value equality in the data class primary constructor." },
  mastered: { topicTitle: "Domain Model Engine (World Boss)", summary: "Coverage authored for the mapped World 11 concepts; final quality verification remains gated by compiler/runner/editorial checks.", passedCount: "8 / 8 PASSED", verificationItems: [{ title: 'Concept coverage', subtitle: "8 distinct Explore scenarios" }, { title: 'Reasoning coverage', subtitle: "8 independent Predict scenarios" }, { title: 'Implementation', subtitle: '1 focused Write & Run task' }, { title: 'Diagnosis', subtitle: '1 independent Debug task' }, { title: 'Verification status', subtitle: 'Not automatically Verified; see World 11 audit' }], xpEarned: 20, streakDays: 1, accuracy: '100%' },
};

export const WORLD_11_LESSONS: FiveStageLesson[] = [
  INHERITANCE_ABSTRACT_CLASSES_LESSON,
  INTERFACES_MULTIPLE_INTERFACE_IMPLEMENTATION_LESSON,
  SEALED_CLASSES_SEALED_INTERFACES_LESSON,
  DATA_CLASSES_DOMAIN_ENUMS_LESSON,
  NESTED_CLASSES_LESSON,
  INNER_CLASSES_LESSON,
  OBJECT_DECLARATIONS_LESSON,
  COMPANION_OBJECTS_LESSON,
  EXTENSION_FUNCTIONS_LESSON,
  EXTENSION_PROPERTIES_LESSON,
  DELEGATION_LESSON,
  DELEGATED_PROPERTIES_LESSON,
  VISIBILITY_API_DESIGN_LESSON,
  DOMAIN_MODEL_ENGINE_BOSS_LESSON,
];
