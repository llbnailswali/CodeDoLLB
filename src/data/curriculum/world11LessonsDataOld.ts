import type { FiveStageLesson, PredictOption } from '../lessonStagesData';

// Content benchmark: World 8 / Interfaces. Each pattern teaches a new behavior,
// then asks the learner to transfer it to a different call or declaration.
// Keep editor activities within CODEDO_EDITOR_CAPACITY.md's verified subset.
type Pattern = {
  title: string;
  declarations: string;
  body: string;
  output: string;
  detail: string;
  prediction: string;
  answer: string;
  distractors: [string, string, string];
  reasoning: string;
  compileError?: boolean;
};
type Topic = {
  key: string;
  title: string;
  subtitle: string;
  takeaway: string;
  ideas: [string, string][];
  patterns: Pattern[];
  practice?: {
    title: string;
    steps: string[];
    initialCode: string;
    solution: string;
    output: string;
    debugTitle: string;
    bug: string;
    broken: string;
    debugSolution?: string;
    debugOutput?: string;
    hints: [string, string, string];
    repair: string;
  };
};
const program = (declarations: string, body: string) =>
  `${declarations}\n\nfun main() {\n${body.split('\n').map(line => `    ${line}`).join('\n')}\n}`;
const lines = (code: string) => code.split('\n');

function lesson(topic: Topic): FiveStageLesson {
  const first = topic.patterns[0];
  const count = topic.patterns.length;
  const practice = topic.practice;
  const reward = topic.key === 'boss' ? 50 : 20;
  return {
    id: `world-11-${topic.key}`, worldId: 'world-11', worldName: 'OOP Evolution',
    stageName: topic.key === 'boss' ? 'WORLD BOSS' : 'STAGE 11 — ADVANCED OOP', topicTitle: topic.title,
    learn: {
      title: topic.title, subtitle: topic.subtitle, exampleTag: 'EXAMPLE',
      exampleTitle: first.title, language: 'Kotlin', codeSnippet: lines(program(first.declarations, first.body)),
      explanation: `${first.detail} This program prints:\n${first.output}`,
      keyIdeas: topic.ideas.map(([title, description], i) => ({ number: i + 1, title, description })),
      keyTakeaway: topic.takeaway,
    },
    explore: {
      title: `Explore ${topic.title}`, subtitle: topic.takeaway,
      cards: topic.patterns.map((p, i) => ({
        id: `${topic.key}-explore-${i + 1}`, number: String(i + 1).padStart(2, '0'), title: p.title,
        language: 'Kotlin', subtitle: p.detail.split('. ')[0] + (p.detail.includes('. ') ? '.' : ''),
        code: lines(program(p.declarations, p.body)),
        whatItMeans: [{ label: p.title, description: p.detail }, { label: 'Output', description: p.output }],
        whatChanged: p.detail,
      })),
    },
    predict: {
      title: 'Trace the Code', subtitle: 'Use the declarations and calls to decide the result before revealing the explanation.',
      questions: topic.patterns.map((p, i) => {
        const labels = [...p.distractors];
        const correctIndex = i % 4;
        labels.splice(correctIndex, 0, p.answer);
        return {
          id: `${topic.key}-predict-${i + 1}`, questionNumber: i + 1, totalQuestions: count,
          title: p.title, topicMeta: topic.title, language: 'Kotlin', code: lines(p.prediction),
          prompt: p.compileError ? 'Will this code compile in Kotlin?' : 'What will this code print?',
          options: labels.map((label, index) => ({ id: 'ABCD'[index] as PredictOption['id'], label, isCorrect: index === correctIndex })),
          explanation: {
            codeRef: p.prediction.split('\n').filter(line => line.trim().startsWith('println(')).at(-1)?.trim() ?? p.title,
            detail: p.reasoning,
          },
        };
      }),
    },
    ...(practice ? {
      writeRun: {
        challengeNumber: 1, totalChallenges: 1, xpReward: reward, title: practice.title,
        description: `${practice.title}.\n\n${practice.steps.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}`,
        requirements: { name: 'main', params: '(none)', returns: 'Unit' }, fileName: 'Domain.kt',
        initialCode: practice.initialCode, solutionCode: practice.solution, sampleInput: 'main()',
        expectedOutput: practice.output, testCase: { call: '', expected: practice.output },
      },
      debug: {
        title: practice.debugTitle, subtitle: practice.bug, challengeNumber: 1, totalChallenges: 1,
        difficulty: topic.key === 'boss' ? 'hard' as const : 'medium' as const,
        bugType: 'logic' as const, bugLabel: practice.debugTitle, brokenCode: practice.broken,
        fixedCode: practice.debugSolution ?? practice.solution,
        expectedOutput: practice.debugOutput ?? practice.output,
        hints: practice.hints, explanation: practice.repair,
      },
    } : {}),
    mastered: {
      topicTitle: topic.title, summary: topic.takeaway, passedCount: `${count} / ${count} PASSED`,
      verificationItems: [
        { title: 'Concept understood', subtitle: topic.ideas[0][1] },
        { title: 'Examples explored', subtitle: topic.patterns.map(p => p.title).join(' · ') },
        { title: 'Predictions completed', subtitle: `${count}/${count} code reasoning checks correct` },
        ...(practice ? [
          { title: 'Code written & executed', subtitle: practice.title },
          { title: 'Bug diagnosed & repaired', subtitle: practice.repair },
        ] : []),
      ], xpEarned: reward, streakDays: 1, accuracy: '100%',
    },
  };
}

const animal = `abstract class Animal(val name: String) {
    fun label() = "Pet: " + name
    abstract fun sound(): String
}
class Dog(name: String) : Animal(name) {
    override fun sound() = "Woof"
}
class Cat(name: String) : Animal(name) {
    override fun sound() = "Meow"
}`;
const capabilities = `interface Named {
    fun name(): String
}
interface Priced {
    fun price(): Int
}
class Product : Named, Priced {
    override fun name() = "Notebook"
    override fun price() = 40
}`;
const sealed = `sealed interface Delivery
object Waiting : Delivery
data class Arrived(val minutes: Int) : Delivery
fun describe(delivery: Delivery): String = when (delivery) {
    Waiting -> "Waiting"
    is Arrived -> "Arrived in " + delivery.minutes
}`;
const model = `data class Ticket(val id: Int, val owner: String)
enum class Level { LOW, HIGH }`;
const nested = `class Store(val name: String) {
    class Item(val code: String) {
        fun label() = "Item " + code
    }
}`;
const inner = `class Store(val name: String) {
    inner class Receipt(val amount: Int) {
        fun label() = name + ": " + amount
    }
}`;
const singleton = `object VisitCounter {
    var total = 0
    fun record() {
        this.total = this.total + 1
    }
}`;
const companion = `class Ticket(val id: Int) {
    companion object {
        fun first() = Ticket(1)
        val prefix = "T"
    }
}`;
const extension = `fun String.badge() = "[" + this + "]"`;
const extensionProperty = `val String.lastPosition: Int
    get() = this.length - 1`;
const delegation = `interface Labelled {
    fun label(): String
}
class PlainLabel(val text: String) : Labelled {
    override fun label() = text
}
class Card(source: Labelled) : Labelled by source`;
const lazy = `class Report {
    val title: String by lazy {
        println("Loading")
        "Weekly"
    }
}`;
const visibility = `class Wallet {
    private var coins = 10
    fun spend(amount: Int) {
        if (amount > 0 && amount <= coins) {
            coins = coins - amount
        }
    }
    fun balance() = coins
}`;
const engine = `data class Ticket(val id: Int, val owner: String)
enum class Level { LOW, HIGH }
object TicketPrinter {
    fun label(ticket: Ticket) = "#" + ticket.id + " " + ticket.owner
}`;

const topics: Topic[] = [
  {
    key: 'inheritance-abstract-classes', title: 'Inheritance & Abstract Classes',
    subtitle: 'Reuse finished behavior from a base class while requiring each concrete subclass to complete its missing behavior.',
    takeaway: 'Use inheritance for an is-a relationship; an abstract base can share code while requiring concrete subclasses to finish its contract.',
    ideas: [
      ['Reuse and specialize', 'Kotlin classes and methods are final by default. open permits inheritance or overriding; abstract members have no implementation to reuse.'],
      ['Finish the contract', 'An abstract class can have constructor state and finished methods. Every concrete subclass must implement its remaining abstract members.'],
      ['The instance chooses the override', 'An Animal reference holding a Cat calls Cat.sound(). The reference type limits available members, but does not replace the object’s behavior.'],
    ],
    patterns: [
      { title: 'Reuse a method and complete another', declarations: animal, body: 'val dog = Dog("Milo")\nprintln(dog.label())\nprintln(dog.sound())', output: 'Pet: Milo\nWoof', detail: 'Dog passes its name to Animal and inherits label() unchanged. Its override supplies the sound that the abstract base leaves unfinished.', prediction: program(animal, 'val cat = Cat("Luna")\nprintln(cat.label())\nprintln(cat.sound())'), answer: 'Pet: Luna\nMeow', distractors: ['Pet: Luna\nWoof', 'Luna\nMeow', 'Compilation error: abstract classes cannot have constructors'], reasoning: 'Cat forwards "Luna" to Animal, so inherited label() returns "Pet: Luna". Cat completes sound() with "Meow".' },
      { title: 'Call through the abstract type', declarations: animal, body: 'val pet: Animal = Dog("Max")\nprintln(pet.sound())', output: 'Woof', detail: 'An abstract type is valid for a variable even though it cannot be instantiated directly. The actual Dog object supplies sound().', prediction: program(animal, 'val pet: Animal = Cat("Kit")\nprintln(pet.sound())'), answer: 'Meow', distractors: ['Woof', 'Animal', 'Compilation error: an abstract type cannot be a variable type'], reasoning: 'pet refers to a concrete Cat. Dynamic dispatch selects Cat.sound(), regardless of the Animal annotation.' },
      { title: 'Complete every abstract member', declarations: animal, body: 'println(Cat("Pip").sound())', output: 'Meow', detail: 'Cat is constructible because it completes sound(). Removing that override leaves a concrete class with an unfinished contract.', prediction: 'abstract class Animal {\n    abstract fun sound(): String\n}\nclass Cat : Animal()\n\nfun main() {\n    println(Cat().sound())\n}', answer: 'Compilation error: Cat must implement sound() or be abstract', distractors: ['It prints an empty string', 'It prints Animal', 'It compiles, then throws when sound() is called'], reasoning: 'The compiler rejects the concrete Cat declaration before main runs. Marking Cat abstract would defer the obligation, but then Cat() would also be invalid.', compileError: true },
    ],
  },
  {
    key: 'interfaces-multiple-interface-implementation', title: 'Interfaces & Multiple Interface Implementation',
    subtitle: 'Combine independent capabilities in one class, pass it through either contract, and resolve conflicting default implementations explicitly.',
    takeaway: 'A class may implement several interfaces. Callers depend on the capability they need, while the class resolves any overlapping behavior.',
    ideas: [
      ['Combine capabilities', 'List interfaces after the colon, separated by commas. Interfaces are not constructor calls, so their names have no parentheses.'],
      ['Depend on a small contract', 'A function accepting Priced can ask for price() without depending on Product or its other capabilities.'],
      ['Resolve default conflicts', 'If two interfaces provide the same method implementation, override it and choose a parent with super<Interface>.method().'],
    ],
    patterns: [
      { title: 'One object, two contracts', declarations: capabilities, body: 'val product = Product()\nprintln(product.name())\nprintln(product.price())', output: 'Notebook\n40', detail: 'Product implements both Named and Priced. Its two overrides satisfy different capabilities on the same instance.', prediction: program(capabilities, 'val product = Product()\nprintln(product.price() + 5)\nprintln(product.name())'), answer: '45\nNotebook', distractors: ['40\nNotebook', 'Notebook\n45', 'Compilation error: only one interface is allowed'], reasoning: 'Both methods belong to Product. main adds 5 to price() before printing, then calls name().' },
      { title: 'Accept only the required capability', declarations: capabilities + '\nfun doubledPrice(item: Priced) = item.price() * 2', body: 'println(doubledPrice(Product()))', output: '80', detail: 'doubledPrice needs only Priced. Product can be passed because it implements that interface, even though it also implements Named.', prediction: program(capabilities + '\nfun surcharge(item: Priced) = item.price() + 10', 'println(surcharge(Product()))'), answer: '50', distractors: ['40', '10', 'Compilation error: Product implements two interfaces'], reasoning: 'The Priced parameter exposes price(), whose Product implementation returns 40. Adding 10 gives 50.' },
      { title: 'Choose between conflicting defaults', declarations: 'interface Brief {\n    fun label() = "Short"\n}\ninterface Detailed {\n    fun label() = "Long"\n}\nclass Caption : Brief, Detailed {\n    override fun label() = super<Brief>.label()\n}', body: 'println(Caption().label())', output: 'Short', detail: 'Both interfaces supply label(), so Caption must resolve the conflict. The qualified super call deliberately selects Brief’s implementation.', prediction: program('interface Brief {\n    fun label() = "Short"\n}\ninterface Detailed {\n    fun label() = "Long"\n}\nclass Caption : Brief, Detailed {\n    override fun label() = super<Detailed>.label() + "!"\n}', 'println(Caption().label())'), answer: 'Long!', distractors: ['Short!', 'Long', 'Compilation error: conflicting defaults cannot be resolved'], reasoning: 'super<Detailed> selects "Long", then the override appends "!". Interface order does not choose the implementation.' },
    ],
  },
  {
    key: 'sealed-classes-sealed-interfaces', title: 'Sealed Classes & Sealed Interfaces',
    subtitle: 'Represent alternatives with different data and let Kotlin check that a when expression handles every possible variant.',
    takeaway: 'Use a sealed hierarchy for a controlled family of variants; exhaustive when expressions make unhandled alternatives visible during compilation.',
    ideas: [
      ['Control the direct variants', 'Direct subclasses of a sealed type must be named declarations in the same package and module. A sealed class can hold state; a sealed interface can combine with other interfaces.'],
      ['Give each variant its own data', 'Arrived carries minutes, while Waiting needs no payload. Unlike enum entries, class variants can have many instances with different data.'],
      ['Handle every alternative', 'When a sealed-type when expression covers all variants, it needs no else. Adding another variant requires updating those expressions.'],
    ],
    patterns: [
      { title: 'Read data from a selected variant', declarations: sealed, body: 'println(describe(Arrived(8)))', output: 'Arrived in 8', detail: 'The is Arrived branch smart-casts delivery to Arrived. That branch can read minutes, while Waiting has no minutes property.', prediction: program(sealed, 'println(describe(Waiting))\nprintln(describe(Arrived(3)))'), answer: 'Waiting\nArrived in 3', distractors: ['Arrived in 0\nArrived in 3', 'Waiting\nWaiting', 'Compilation error: when requires else'], reasoning: 'Waiting matches the singleton branch. Arrived(3) matches the type branch and exposes minutes = 3. Both known variants are covered.' },
      { title: 'Share state through a sealed class', declarations: 'sealed class Result(val source: String)\nclass Success(val count: Int) : Result("cache")\nclass Failure : Result("network")', body: 'val result: Result = Success(4)\nprintln(result.source)', output: 'cache', detail: 'A sealed class can carry constructor state shared by its subclasses. Success chooses the base source while keeping count as its own payload.', prediction: program('sealed class Result(val source: String)\nclass Success(val count: Int) : Result("cache")\nclass Failure : Result("network")', 'val result: Result = Failure()\nprintln(result.source)'), answer: 'network', distractors: ['cache', 'Failure', 'Compilation error: sealed classes cannot have state'], reasoning: 'Failure invokes the Result constructor with "network". Reading the inherited source property returns that value.' },
      { title: 'Detect a missing branch', declarations: sealed, body: 'println(describe(Waiting))', output: 'Waiting', detail: 'describe returns a String from its when expression. Every variant must therefore produce a result, even if main currently uses only Waiting.', prediction: 'sealed interface Delivery\nobject Waiting : Delivery\ndata class Arrived(val minutes: Int) : Delivery\nfun describe(delivery: Delivery): String = when (delivery) {\n    Waiting -> "Waiting"\n}\nfun main() {\n    println(describe(Waiting))\n}', answer: 'Compilation error: the when expression is not exhaustive', distractors: ['It prints Waiting', 'It prints null', 'It compiles and fails only for Arrived'], reasoning: 'The Arrived case is missing from a when expression used to return String. Kotlin checks every possible variant, not just the value passed by this main.', compileError: true },
    ],
  },
  {
    key: 'data-classes-domain-modeling-enum-classes', title: 'Data Classes in Domain Modeling & Enum Classes',
    subtitle: 'Separate records that carry data from a fixed vocabulary of states, then reason about value equality and copies.',
    takeaway: 'Use data classes for values with named fields and enums for a fixed set of choices. A copy creates a new record without changing the original.',
    ideas: [
      ['Model a value', 'Primary-constructor properties determine generated equality, toString(), component functions, and copy(). A data class saves you from writing those value operations by hand.'],
      ['Constrain a choice', 'An enum gives a fixed set of named entries. A property typed as that enum cannot accept an arbitrary state string.'],
      ['Copy deliberately', 'copy() can replace selected constructor properties. It is shallow: referenced mutable objects are shared unless you explicitly copy them too.'],
    ],
    patterns: [
      { title: 'Keep records and choices explicit', declarations: model, body: 'val ticket = Ticket(7, "Ana")\nprintln(ticket)\nprintln(Level.HIGH)', output: 'Ticket(id=7, owner=Ana)\nHIGH', detail: 'Ticket names the fields in its generated text representation. Level.HIGH names one of the only two allowed priority choices.', prediction: program(model, 'println(Ticket(9, "Bo"))\nprintln(Level.LOW)'), answer: 'Ticket(id=9, owner=Bo)\nLOW', distractors: ['Ticket(id=9, owner=Bo)\nHIGH', '9 Bo\nLOW', 'Ticket\n0'], reasoning: 'Generated toString() uses the constructor property names and values. Printing the enum entry gives LOW, not its ordinal.' },
      { title: 'Use an enum inside the model', declarations: 'enum class State { OPEN, CLOSED }\ndata class Issue(val id: Int, val state: State)', body: 'val issue = Issue(2, State.OPEN)\nprintln(issue.state)', output: 'OPEN', detail: 'The State type connects the record to the allowed vocabulary. Passing the string "OPEN" instead would be a type error.', prediction: program('enum class State { OPEN, CLOSED }\ndata class Issue(val id: Int, val state: State)', 'val issue = Issue(5, State.CLOSED)\nprintln(issue.state == State.OPEN)'), answer: 'false', distractors: ['true', 'CLOSED', 'Compilation error: enum entries cannot be compared'], reasoning: 'The issue stores CLOSED. It is a different enum entry from OPEN, so equality is false.' },
      { title: 'Store custom properties in enum entries', declarations: 'enum class Priority(val score: Int) {\n    LOW(10),\n    HIGH(50)\n}', body: 'val level = Priority.HIGH\nprintln(level.score)\nprintln(level.name)', output: '50\nHIGH', detail: 'Enum classes can declare constructor properties. Each entry passes its own parameters, accessible alongside built-in members like name.', prediction: program('enum class Priority(val score: Int) {\n    LOW(10),\n    HIGH(50)\n}', 'val low = Priority.LOW\nval high = Priority.HIGH\nprintln(high.score - low.score)'), answer: '40', distractors: ['50', '10', 'Compilation error: enum entries cannot declare constructor properties'], reasoning: 'high.score is 50 and low.score is 10. 50 - 10 yields 40.' },
      { title: 'Copy without replacing the original', declarations: 'data class Ticket(val id: Int, val owner: String)', body: 'val original = Ticket(1, "Ana")\nval reassigned = original.copy(owner = "Bo")\nprintln(original.owner)\nprintln(reassigned.owner)', output: 'Ana\nBo', detail: 'copy(owner = ...) creates another Ticket with the same id and a different owner. The original record keeps its owner.', prediction: program('data class Ticket(val id: Int, val owner: String)', 'val original = Ticket(1, "Ana")\nval same = original.copy()\nval other = original.copy(owner = "Bo")\nprintln(original == same)\nprintln(original == other)'), answer: 'true\nfalse', distractors: ['false\nfalse', 'true\ntrue', 'false\ntrue'], reasoning: 'Data-class equality compares constructor properties. same has identical values; other differs in owner. New instance identity does not make same unequal.' },
    ],
    practice: {
      title: 'Create Two Ticket Records', steps: ['Keep the provided Ticket data class and Level enum.', 'Create first as Ticket(7, "Ana") and second as Ticket(8, "Bo").', 'Print first, then second, then Level.HIGH on separate lines.'],
      initialCode: program(model, '// 1. Keep the declarations above.\n// 2. Create first and second.\n\n// 3. Print both records, then the HIGH level.'),
      solution: program(model, 'val first = Ticket(7, "Ana")\nval second = Ticket(8, "Bo")\nprintln(first)\nprintln(second)\nprintln(Level.HIGH)'), output: 'Ticket(id=7, owner=Ana)\nTicket(id=8, owner=Bo)\nHIGH',
      debugTitle: 'Fix the Duplicated Record', bug: 'Both devices are created correctly, but the report prints the first device twice and omits the second device.',
      broken: program('data class Device(val serial: Int, val model: String)\nenum class Status { ACTIVE, RETIRED }', 'val d1 = Device(101, "Tablet")\nval d2 = Device(102, "Phone")\nprintln(d1)\nprintln(d1)\nprintln(Status.ACTIVE)'),
      debugSolution: program('data class Device(val serial: Int, val model: String)\nenum class Status { ACTIVE, RETIRED }', 'val d1 = Device(101, "Tablet")\nval d2 = Device(102, "Phone")\nprintln(d1)\nprintln(d2)\nprintln(Status.ACTIVE)'),
      debugOutput: 'Device(serial=101, model=Tablet)\nDevice(serial=102, model=Phone)\nACTIVE',
      hints: ['Compare the two printed lines with the two values created in main.', 'Both println calls currently read the same d1 variable.', 'Change the second println(d1) to println(d2).'],
      repair: 'The constructor values were correct. Printing d2 on the second line reports Device(serial=102, model=Phone) instead of repeating the first record.',
    },
  },
  {
    key: 'nested-classes', title: 'Nested Classes',
    subtitle: 'Group a helper type inside its owner’s namespace without tying helper instances to an outer object.',
    takeaway: 'A nested class is accessed through Outer.Nested and has no implicit outer instance. Pass any data it needs explicitly.',
    ideas: [
      ['Qualify the type', 'Store.Item identifies a type declared inside Store. Calling Store.Item(...) does not construct a Store.'],
      ['No captured owner', 'A plain nested class cannot directly read an outer instance’s name. Nesting organizes names, not object ownership.'],
      ['Pass dependencies explicitly', 'Give a nested helper its own constructor properties when it needs data. Use inner only when it must retain an outer instance.'],
    ],
    patterns: [
      { title: 'Construct without an outer object', declarations: nested, body: 'val item = Store.Item("A1")\nprintln(item.label())', output: 'Item A1', detail: 'Store.Item is constructed directly using the outer type name. No Store instance is needed because Item uses only its own code property.', prediction: program(nested, 'val item = Store.Item("B2")\nprintln(item.label())'), answer: 'Item B2', distractors: ['Item A1', 'Store B2', 'Compilation error: construct Store first'], reasoning: 'B2 belongs to this Item instance. label() reads code and prefixes it with "Item ".' },
      { title: 'Give each helper its own data', declarations: nested, body: 'val first = Store.Item("A1")\nval second = Store.Item("B2")\nprintln(first.label())\nprintln(second.label())', output: 'Item A1\nItem B2', detail: 'Nesting does not turn Item into a singleton. Each constructor call creates an independent item with its own code.', prediction: program(nested, 'val first = Store.Item("C3")\nval second = Store.Item("D4")\nprintln(second.label())\nprintln(first.label())'), answer: 'Item D4\nItem C3', distractors: ['Item C3\nItem D4', 'Item D4\nItem D4', 'Item C3\nItem C3'], reasoning: 'The print order is second, then first. The instances keep their own values regardless of their shared nested type.' },
      { title: 'Pass outer data explicitly', declarations: 'class Store(val name: String) {\n    class Label(val storeName: String) {\n        fun text() = storeName\n    }\n}', body: 'val store = Store("North")\nval label = Store.Label(store.name)\nprintln(label.text())', output: 'North', detail: 'Label can read storeName because it receives that value through its own constructor. It does not gain access to Store.name just by being nested.', prediction: 'class Store(val name: String) {\n    class Label {\n        fun text() = name\n    }\n}\nfun main() {\n    println(Store.Label().text())\n}', answer: 'Compilation error: Label has no outer instance for name', distractors: ['It prints Store', 'It prints an empty string', 'It compiles and automatically creates a Store'], reasoning: 'name belongs to a Store instance. Plain nested Label has no captured Store, so the reference is unavailable.', compileError: true },
    ],
  },
  {
    key: 'inner-classes', title: 'Inner Classes',
    subtitle: 'Bind a helper to one particular outer instance so it can read that owner’s data and observe changes to it.',
    takeaway: 'An inner instance keeps its outer object. Construct it through that object, and use this@Outer when inner and outer member names overlap.',
    ideas: [
      ['Create through an instance', 'store.Receipt(20) binds the receipt to store. Unlike a plain nested type, it needs a particular Store object.'],
      ['Read the owning object', 'An inner class can access outer members. Two receipts attached to different stores see different names.'],
      ['Disambiguate receivers', 'this refers to the inner object; this@Store refers to its captured Store. Capturing the owner also keeps that owner reachable.'],
    ],
    patterns: [
      { title: 'Bind a receipt to its store', declarations: inner, body: 'val store = Store("North")\nprintln(store.Receipt(20).label())', output: 'North: 20', detail: 'Receipt reads amount from itself and name from the Store it belongs to. The call through store supplies that outer instance.', prediction: program(inner, 'val store = Store("South")\nprintln(store.Receipt(35).label())'), answer: 'South: 35', distractors: ['North: 35', 'South: 20', 'Compilation error: Receipt cannot access name'], reasoning: 'The receipt belongs to the South store and has its own amount of 35. label() combines those two values.' },
      { title: 'Keep owners separate', declarations: inner, body: 'val north = Store("North")\nval south = Store("South")\nprintln(north.Receipt(10).label())\nprintln(south.Receipt(10).label())', output: 'North: 10\nSouth: 10', detail: 'Each receipt captures the store used to construct it. Sharing the same inner class definition does not make their owners interchangeable.', prediction: program(inner, 'val east = Store("East")\nval west = Store("West")\nval receipt = west.Receipt(12)\nprintln(receipt.label())\nprintln(east.Receipt(4).label())'), answer: 'West: 12\nEast: 4', distractors: ['East: 12\nEast: 4', 'West: 12\nWest: 4', 'East: 4\nWest: 12'], reasoning: 'receipt was constructed through west, so it keeps West. The second receipt was constructed through east and sees East.' },
      { title: 'Distinguish the two receivers', declarations: 'class Store(var name: String) {\n    inner class Label(val name: String) {\n        fun text() = this@Store.name + "/" + this.name\n    }\n}', body: 'val store = Store("North")\nval label = store.Label("Sale")\nstore.name = "New North"\nprintln(label.text())', output: 'New North/Sale', detail: 'this@Store reads the outer object’s current name, while this.name reads the Label’s name. The outer reference is not a frozen copy of its properties.', prediction: program('class Store(var name: String) {\n    inner class Label(val name: String) {\n        fun text() = this@Store.name + "/" + this.name\n    }\n}', 'val store = Store("West")\nval label = store.Label("Open")\nstore.name = "East"\nprintln(label.text())'), answer: 'East/Open', distractors: ['West/Open', 'Open/Open', 'East/East'], reasoning: 'The label retains the Store object, whose name has changed to East. Its own name remains Open.' },
    ],
  },
  {
    key: 'object-declarations', title: 'Object Declarations',
    subtitle: 'Create one shared service, access its members directly, and trace state shared by every reference to that service.',
    takeaway: 'An object declaration names a singleton. Every reference reaches the same instance, so keep shared mutable state intentional.',
    ideas: [
      ['Use the name directly', 'An object declaration supplies an instance as well as a type. Call VisitCounter.record(), without a VisitCounter() constructor call.'],
      ['Share one state', 'Assigning an object to another variable creates another reference, not a copy. Mutations remain visible through every reference.'],
      ['Choose shared responsibility carefully', 'A stateless formatter is a useful singleton. A mutable counter is also shared across callers, so it must not represent unrelated users’ independent state.'],
    ],
    patterns: [
      { title: 'Call the shared service', declarations: singleton, body: 'VisitCounter.record()\nprintln(VisitCounter.total)', output: '1', detail: 'record() increments total on the single VisitCounter instance. Access through the object name requires no construction step.', prediction: program(singleton, 'VisitCounter.record()\nVisitCounter.record()\nprintln(VisitCounter.total)'), answer: '2', distractors: ['1', '0', 'Compilation error: VisitCounter was not constructed'], reasoning: 'Both calls reach the same counter, taking total from 0 to 1 to 2.' },
      { title: 'Aliases share the same state', declarations: singleton, body: 'val counter = VisitCounter\ncounter.record()\nVisitCounter.record()\nprintln(counter.total)', output: '2', detail: 'counter is another reference to VisitCounter. Updating through either name changes the same total.', prediction: program(singleton, 'val first = VisitCounter\nval second = VisitCounter\nfirst.record()\nprintln(second.total)\nsecond.record()\nprintln(first.total)'), answer: '1\n2', distractors: ['0\n1', '1\n1', '2\n2'], reasoning: 'first and second refer to one object. The first read sees one visit; after the second mutation the final read sees two.' },
      { title: 'Prefer a stateless formatter when possible', declarations: 'object TicketLabel {\n    fun text(id: Int) = "T-" + id\n}', body: 'println(TicketLabel.text(4))\nprintln(TicketLabel.text(9))', output: 'T-4\nT-9', detail: 'TicketLabel computes each result from its argument and stores no changing data. Earlier calls do not affect later labels.', prediction: program('object TicketLabel {\n    fun text(id: Int) = "T-" + id\n}', 'println(TicketLabel.text(2))\nprintln(TicketLabel.text(2))'), answer: 'T-2\nT-2', distractors: ['T-2\nT-3', '2\n2', 'T-1\nT-2'], reasoning: 'text() uses the supplied id without incrementing anything. Repeating the same argument produces the same result.' },
    ],
    practice: {
      title: 'Record Three Visits', steps: ['Implement VisitCounter.record() so it adds exactly one to this.total.', 'In main, call record() twice and print total.', 'Call record() once more and print total again. The two output lines must be 2 and 3.'],
      initialCode: program('object VisitCounter {\n    var total = 0\n    fun record() {\n        // 1. Increase this.total by one.\n    }\n}', '// 2. Record twice, then print total.\n\n// 3. Record once more, then print total.'),
      solution: program(singleton, 'VisitCounter.record()\nVisitCounter.record()\nprintln(VisitCounter.total)\nVisitCounter.record()\nprintln(VisitCounter.total)'), output: '2\n3',
      debugTitle: 'Fix the Vault That Keeps Resetting', bug: 'After three deposits the balances should be 10 and 15, but deposit() resets balance to 5 on every call.',
      broken: program('object CoinVault {\n    var balance = 0\n    fun deposit() {\n        this.balance = 5\n    }\n}', 'CoinVault.deposit()\nCoinVault.deposit()\nprintln(CoinVault.balance)\nCoinVault.deposit()\nprintln(CoinVault.balance)'),
      debugSolution: program('object CoinVault {\n    var balance = 0\n    fun deposit() {\n        this.balance = this.balance + 5\n    }\n}', 'CoinVault.deposit()\nCoinVault.deposit()\nprintln(CoinVault.balance)\nCoinVault.deposit()\nprintln(CoinVault.balance)'),
      debugOutput: '10\n15',
      hints: ['A new deposit must preserve earlier deposits in the vault.', 'Compare assigning a constant with adding to the current balance.', 'Replace this.balance = 5 with this.balance = this.balance + 5.'],
      repair: 'Assigning 5 discards previous deposits. Adding 5 to the stored balance preserves shared history, producing 10 and then 15.',
    },
  },
  {
    key: 'companion-objects', title: 'Companion Objects',
    subtitle: 'Put creation helpers beside their class and distinguish the shared companion from each separately created instance.',
    takeaway: 'A companion is an object associated with a class. Access it through the class name for factories and shared members; instance data still belongs to each object.',
    ideas: [
      ['Access through the class', 'Ticket.first() calls the companion’s factory. You do not need an existing Ticket to ask it to create one.'],
      ['Separate shared and instance data', 'The companion’s prefix is shared, while each Ticket has its own id. A companion does not implicitly refer to an arbitrary Ticket instance.'],
      ['A companion is a real object', 'The default name is Companion; you can name it Factory instead. Unlike a purely static namespace, a companion can implement an interface.'],
    ],
    patterns: [
      { title: 'Create through a factory', declarations: companion, body: 'val ticket = Ticket.first()\nprintln(ticket.id)\nprintln(Ticket.prefix)', output: '1\nT', detail: 'first() constructs and returns a Ticket. prefix belongs to the companion, while id belongs to the newly created instance.', prediction: program(companion, 'val ticket = Ticket(8)\nprintln(Ticket.prefix + ticket.id)\nprintln(Ticket.first().id)'), answer: 'T8\n1', distractors: ['T1\n1', 'T8\n8', 'Compilation error: companion members require a Ticket instance'], reasoning: 'The explicitly constructed ticket has id 8. Calling the factory afterward creates a separate ticket with id 1.' },
      { title: 'Name the companion', declarations: 'class Ticket(val id: Int) {\n    companion object Factory {\n        fun create(id: Int) = Ticket(id)\n    }\n}', body: 'println(Ticket.create(3).id)\nprintln(Ticket.Factory.create(4).id)', output: '3\n4', detail: 'Both Ticket.create and Ticket.Factory.create reach the same named companion. Each call can still produce a new Ticket.', prediction: program('class Ticket(val id: Int) {\n    companion object Factory {\n        fun create(id: Int) = Ticket(id)\n    }\n}', 'val factory = Ticket.Factory\nprintln(factory.create(6).id)\nprintln(Ticket.create(7).id)'), answer: '6\n7', distractors: ['6\n6', '7\n7', 'Compilation error: a companion cannot be assigned to a variable'], reasoning: 'factory refers to the companion object. The two create calls receive different ids and construct different ticket values.' },
      { title: 'Use the companion as an interface value', declarations: 'interface Named {\n    fun label(): String\n}\nclass Ticket {\n    companion object : Named {\n        override fun label() = "Tickets"\n    }\n}', body: 'val catalogue: Named = Ticket\nprintln(catalogue.label())', output: 'Tickets', detail: 'Ticket used as an expression refers to its companion. That object implements Named and can be passed anywhere the interface is required.', prediction: program('interface Named {\n    fun label(): String\n}\nclass Ticket {\n    companion object : Named {\n        override fun label() = "Tickets"\n    }\n}\nfun heading(value: Named) = value.label() + "!"', 'println(heading(Ticket))'), answer: 'Tickets!', distractors: ['Ticket!', 'Tickets', 'Compilation error: the companion cannot implement Named'], reasoning: 'heading receives the companion as Named, calls its override returning "Tickets", then adds an exclamation mark.' },
    ],
  },
  {
    key: 'extension-functions', title: 'Extension Functions',
    subtitle: 'Write receiver-style helpers without modifying a class, and distinguish static extension selection from virtual member dispatch.',
    takeaway: 'Extensions add convenient call syntax. The declared receiver type selects an extension, and a matching real member takes precedence.',
    ideas: [
      ['Name a receiver type', 'In fun String.badge(), String is the receiver type and this is the string at the call site. The String class itself is unchanged.'],
      ['Resolve at compile time', 'For overloaded extensions, Kotlin uses the receiver’s declared type. A subclass instance does not dynamically override an extension on its base type.'],
      ['Members win', 'If an accessible member matches the name and arguments, Kotlin chooses it before an extension. Extensions also cannot bypass private visibility.'],
    ],
    patterns: [
      { title: 'Use the receiver as input', declarations: extension, body: 'println("Gold".badge())', output: '[Gold]', detail: 'Inside badge(), this is the string before the dot. The helper returns that text surrounded by brackets without changing the original string.', prediction: program(extension, 'val name = "Silver"\nprintln(name.badge())\nprintln(name)'), answer: '[Silver]\nSilver', distractors: ['[Silver]\n[Silver]', 'Silver\nSilver', '[Gold]\nSilver'], reasoning: 'badge() returns a new string. name remains Silver, so printing name afterward shows the unchanged input.' },
      { title: 'Select by the declared receiver type', declarations: 'open class Animal\nclass Dog : Animal()\nfun Animal.kind() = "animal"\nfun Dog.kind() = "dog"', body: 'val pet: Animal = Dog()\nprintln(pet.kind())', output: 'animal', detail: 'pet is declared Animal, so the Animal extension is selected. Extension functions do not participate in virtual override dispatch.', prediction: program('open class Animal\nclass Dog : Animal()\nfun Animal.kind() = "animal"\nfun Dog.kind() = "dog"', 'val dog = Dog()\nval pet: Animal = dog\nprintln(dog.kind())\nprintln(pet.kind())'), answer: 'dog\nanimal', distractors: ['dog\ndog', 'animal\nanimal', 'animal\ndog'], reasoning: 'dog has inferred type Dog; pet has declared type Animal. The same object therefore uses different extensions at these two call sites.' },
      { title: 'Prefer a matching member', declarations: 'class Badge {\n    fun label() = "member"\n}\nfun Badge.label() = "extension"', body: 'println(Badge().label())', output: 'member', detail: 'Badge already has a label() member with the same call signature. The extension is shadowed for this call.', prediction: program('class Badge {\n    fun label() = "member"\n}\nfun Badge.label() = "extension"\nfun Badge.label(prefix: String) = prefix + "extension"', 'val badge = Badge()\nprintln(badge.label())\nprintln(badge.label("new-"))'), answer: 'member\nnew-extension', distractors: ['extension\nnew-extension', 'member\nnew-member', 'Compilation error: extensions cannot overload member names'], reasoning: 'The no-argument call matches the real member. No member accepts a String, so the second call selects the extension overload.' },
    ],
  },
  {
    key: 'extension-properties', title: 'Extension Properties',
    subtitle: 'Expose derived information with property syntax while keeping storage in the original object.',
    takeaway: 'An extension property computes through accessors; it cannot introduce a backing field. Its getter can reflect changes in the receiver’s existing state.',
    ideas: [
      ['Compute on read', 'val String.lastPosition: Int get() = length - 1 exposes a calculation as a property. An empty string produces -1, which is not a valid character index.'],
      ['No new storage', 'Extension properties do not add fields to the receiver. An initializer such as val String.score = 0 is therefore not allowed.'],
      ['Use current receiver state', 'A getter runs when the property is read; it is not automatically cached. A var extension needs a setter that writes to existing state or external storage.'],
    ],
    patterns: [
      { title: 'Read a computed property', declarations: extensionProperty, body: 'println("Kotlin".lastPosition)', output: '5', detail: 'Kotlin has six characters, indexed from zero. The getter subtracts one from length to compute the last position.', prediction: program(extensionProperty, 'println("Cat".lastPosition)\nprintln("".lastPosition)'), answer: '2\n-1', distractors: ['3\n0', '2\n0', 'Compilation error: extension properties need parentheses'], reasoning: 'The getter returns length minus one: 3 - 1 is 2 and 0 - 1 is -1. Property access does not use parentheses.' },
      { title: 'Recompute from current state', declarations: 'class Basket(var count: Int)\nval Basket.isEmpty: Boolean\n    get() = count == 0', body: 'val basket = Basket(0)\nprintln(basket.isEmpty)\nbasket.count = 2\nprintln(basket.isEmpty)', output: 'true\nfalse', detail: 'isEmpty stores no extra Boolean. Each access compares the basket’s current count with zero.', prediction: program('class Basket(var count: Int)\nval Basket.isEmpty: Boolean\n    get() = count == 0', 'val basket = Basket(3)\nprintln(basket.isEmpty)\nbasket.count = 0\nprintln(basket.isEmpty)'), answer: 'false\ntrue', distractors: ['false\nfalse', 'true\nfalse', 'true\ntrue'], reasoning: 'The first read sees count 3. After count becomes zero the getter runs again, so the second result is true.' },
      { title: 'Use a getter instead of an initializer', declarations: 'val String.doubleLength: Int\n    get() = length * 2', body: 'println("Hi".doubleLength)', output: '4', detail: 'A getter derives doubleLength from the receiver. An initializer would require an extension backing field, which Kotlin does not provide.', prediction: 'val String.score: Int = 10\n\nfun main() {\n    println("Hi".score)\n}', answer: 'Compilation error: extension properties cannot have initializers', distractors: ['It prints 10', 'It prints 2', 'It compiles and adds score to every String instance'], reasoning: 'An extension cannot add a stored field to String. This read-only property needs a getter, such as get() = 10.', compileError: true },
    ],
  },
  {
    key: 'delegation', title: 'Delegation',
    subtitle: 'Implement an interface by forwarding work to a composed object, then override only the behavior your wrapper needs to change.',
    takeaway: 'Interface delegation reuses another object’s implementation through by. A wrapper override changes calls on the wrapper, not calls inside the delegate.',
    ideas: [
      ['Forward a contract', 'class Card(source: Labelled) : Labelled by source asks Kotlin to generate forwarding implementations for Labelled’s members.'],
      ['Compose instead of inherit', 'Card contains a delegate. It implements Labelled without extending PlainLabel, so another Labelled implementation can be supplied later.'],
      ['Know which object is executing', 'A wrapper can override a delegated member, but a method running inside the delegate still calls that delegate’s own members.'],
    ],
    patterns: [
      { title: 'Forward an interface call', declarations: delegation, body: 'val card = Card(PlainLabel("Ready"))\nprintln(card.label())', output: 'Ready', detail: 'Card does not write label() itself. Kotlin forwards the call to the PlainLabel object supplied as source.', prediction: program(delegation, 'val first = Card(PlainLabel("Open"))\nval second = Card(PlainLabel("Closed"))\nprintln(second.label())\nprintln(first.label())'), answer: 'Closed\nOpen', distractors: ['Open\nClosed', 'Closed\nClosed', 'Compilation error: Card must manually override label()'], reasoning: 'Each Card retains its own delegate. The second card forwards to Closed and the first forwards to Open.' },
      { title: 'Override selected behavior', declarations: 'interface Labelled {\n    fun label(): String\n}\nclass PlainLabel : Labelled {\n    override fun label() = "plain"\n}\nclass Card(source: Labelled) : Labelled by source {\n    override fun label() = "card"\n}', body: 'println(Card(PlainLabel()).label())', output: 'card', detail: 'An explicit override in Card replaces generated forwarding for label(). The supplied PlainLabel still has its own unchanged implementation.', prediction: program('interface Labelled {\n    fun label(): String\n}\nclass PlainLabel : Labelled {\n    override fun label() = "plain"\n}\nclass Card(source: Labelled) : Labelled by source {\n    override fun label() = "card"\n}', 'val source = PlainLabel()\nprintln(Card(source).label())\nprintln(source.label())'), answer: 'card\nplain', distractors: ['plain\nplain', 'card\ncard', 'plain\ncard'], reasoning: 'Calling the wrapper uses its override. Calling source directly still uses PlainLabel.label(); delegation did not modify that object.' },
      { title: 'Trace calls inside the delegate', declarations: 'interface Message {\n    fun text(): String\n    fun render(): String\n}\nclass Original : Message {\n    override fun text() = "original"\n    override fun render() = "[" + text() + "]"\n}\nclass Wrapper(source: Message) : Message by source {\n    override fun text() = "wrapper"\n}', body: 'val message = Wrapper(Original())\nprintln(message.text())\nprintln(message.render())', output: 'wrapper\n[original]', detail: 'render() is forwarded to Original. While running on Original, its call to text() uses Original.text(), not Wrapper.text().', prediction: program('interface Message {\n    fun text(): String\n    fun render(): String\n}\nclass Original : Message {\n    override fun text() = "inside"\n    override fun render() = "[" + text() + "]"\n}\nclass Wrapper(source: Message) : Message by source {\n    override fun text() = "outside"\n}', 'val message = Wrapper(Original())\nprintln(message.render())\nprintln(message.text())'), answer: '[inside]\noutside', distractors: ['[outside]\noutside', '[inside]\ninside', '[outside]\ninside'], reasoning: 'The forwarded render() executes on Original and uses inside. The direct wrapper text() call uses outside. The receiving object matters at each step.' },
    ],
  },
  {
    key: 'delegated-properties', title: 'Delegated Properties',
    subtitle: 'Let a reusable delegate control how a property is read or written: initialize on demand, observe changes, or look up a named value.',
    takeaway: 'Property delegation uses by to hand access to another object. lazy caches a successful first result; other delegates can observe writes or read keyed data.',
    ideas: [
      ['Delay a calculation', 'by lazy runs its initializer on the first read and remembers the result after successful initialization. Declaring the property alone does not calculate it.'],
      ['Observe assignments', 'Delegates.observable receives the property metadata, old value, and new value after an assignment. It observes a change rather than vetoing it.'],
      ['Delegate access, not a whole interface', 'Property delegates supply operator getValue and, for var, setValue. Built-in delegates hide that protocol; map delegation uses the property name as its key.'],
    ],
    patterns: [
      { title: 'Calculate once on first access', declarations: lazy, body: 'val report = Report()\nprintln("Created")\nprintln(report.title)\nprintln(report.title)', output: 'Created\nLoading\nWeekly\nWeekly', detail: 'Constructing Report does not evaluate title. The first read prints Loading and caches Weekly; the second read returns the cached value.', prediction: program(lazy, 'val report = Report()\nprintln("Before")\nprintln(report.title)\nprintln("After")\nprintln(report.title)'), answer: 'Before\nLoading\nWeekly\nAfter\nWeekly', distractors: ['Loading\nBefore\nWeekly\nAfter\nWeekly', 'Before\nLoading\nWeekly\nAfter\nLoading\nWeekly', 'Before\nWeekly\nAfter\nWeekly'], reasoning: 'Loading occurs exactly at the first title read. It is not repeated at the later read because successful lazy initialization caches Weekly.' },
      { title: 'Observe old and new values', declarations: 'import kotlin.properties.Delegates\n\nclass Profile {\n    var name: String by Delegates.observable("Guest") { _, old, new ->\n        println(old + " -> " + new)\n    }\n}', body: 'val profile = Profile()\nprofile.name = "Ana"\nprintln(profile.name)', output: 'Guest -> Ana\nAna', detail: 'Assigning name triggers the observer after the value changes. A later read simply returns the new value without firing the observer again.', prediction: program('import kotlin.properties.Delegates\n\nclass Profile {\n    var name: String by Delegates.observable("Guest") { _, old, new ->\n        println(old + " -> " + new)\n    }\n}', 'val profile = Profile()\nprofile.name = "Bo"\nprofile.name = "Cy"\nprintln(profile.name)'), answer: 'Guest -> Bo\nBo -> Cy\nCy', distractors: ['Guest -> Bo\nGuest -> Cy\nCy', 'Bo\nCy', 'Guest -> Bo\nBo -> Cy\nGuest'], reasoning: 'The first write changes Guest to Bo; the second changes the stored Bo to Cy. The final read returns Cy and produces no observer notification.' },
      { title: 'Read by property name from a map', declarations: 'class Profile(values: Map<String, Any?>) {\n    val name: String by values\n    val age: Int by values\n}', body: 'val profile = Profile(mapOf("name" to "Ana", "age" to 20))\nprintln(profile.name)\nprintln(profile.age)', output: 'Ana\n20', detail: 'The map delegate uses the declared property names as keys. name reads the name entry, and age reads the age entry with its declared type.', prediction: program('class Profile(values: Map<String, Any?>) {\n    val name: String by values\n    val age: Int by values\n}', 'val profile = Profile(mapOf("age" to 25, "name" to "Bo"))\nprintln(profile.name)\nprintln(profile.age + 1)'), answer: 'Bo\n26', distractors: ['25\nBo', 'Bo\n25', 'Compilation error: map entries must follow property order'], reasoning: 'Delegation looks up keys, not positions. name is Bo even though age appears first in the map; 25 + 1 gives 26.' },
    ],
  },
  {
    key: 'visibility-api-design', title: 'Visibility and API Design',
    subtitle: 'Expose the operations callers need while protecting state and implementation details that callers must not control directly.',
    takeaway: 'Design a small public API around valid operations. Use private for implementation details, protected for subclass access, and internal for module boundaries.',
    ideas: [
      ['Protect state through behavior', 'A private class member is available inside that class. Public methods can validate requested changes instead of exposing unrestricted writes.'],
      ['Choose the boundary', 'protected adds subclass access for class members. internal permits access within the same module; public is the default. A top-level private declaration is file-private.'],
      ['Expose reading separately from writing', 'A public var can have a private setter. Callers may read its value, while only the class’s implementation can assign to it.'],
    ],
    patterns: [
      { title: 'Keep invalid changes outside the API', declarations: visibility, body: 'val wallet = Wallet()\nwallet.spend(3)\nwallet.spend(20)\nprintln(wallet.balance())', output: '7', detail: 'spend() accepts only a positive amount within the balance. The invalid request for 20 is ignored, so callers cannot overspend through this API.', prediction: program(visibility, 'val wallet = Wallet()\nwallet.spend(-5)\nwallet.spend(4)\nprintln(wallet.balance())'), answer: '6', distractors: ['11', '1', '10'], reasoning: 'The negative amount fails the positive-amount check and changes nothing. Spending 4 then reduces the original 10 to 6.' },
      { title: 'Allow reading but restrict writing', declarations: 'class Score {\n    var points = 0\n        private set\n    fun win() {\n        points += 10\n    }\n}', body: 'val score = Score()\nscore.win()\nprintln(score.points)', output: '10', detail: 'points has a public getter and a private setter. win() can update it inside Score, while external code can only read it.', prediction: 'class Score {\n    var points = 0\n        private set\n}\nfun main() {\n    val score = Score()\n    score.points = 100\n    println(score.points)\n}', answer: 'Compilation error: the points setter is private', distractors: ['It prints 100', 'It prints 0 because the assignment is ignored', 'It throws a visibility exception at runtime'], reasoning: 'Reading points is public, but assigning to it from main is forbidden. Kotlin rejects that assignment during compilation.', compileError: true },
      { title: 'Share a helper only with subclasses', declarations: 'open class Base {\n    protected fun code() = "B7"\n}\nclass Child : Base() {\n    fun label() = "Code " + code()\n}', body: 'println(Child().label())', output: 'Code B7', detail: 'Child may use the protected code() helper inside its implementation. Outside callers reach the public label(), not the protected helper itself.', prediction: 'open class Base {\n    protected fun code() = "B7"\n}\nclass Child : Base()\nfun main() {\n    println(Child().code())\n}', answer: 'Compilation error: code() is protected', distractors: ['It prints B7', 'It prints Code B7', 'It compiles because Child inherits code()'], reasoning: 'Inheritance makes code() available inside Child, not to unrelated code in main. The external call violates protected visibility.', compileError: true },
      { title: 'Keep implementation inside a module', declarations: 'internal class Formatter {\n    fun label() = "Ready"\n}\nfun status() = Formatter().label()', body: 'println(status())', output: 'Ready', detail: 'Formatter is usable within its module. The public status() returns a String, so its signature does not expose the internal implementation type.', prediction: 'internal class Formatter\n\nfun formatter(): Formatter = Formatter()\n\nfun main() {\n    println("Ready")\n}', answer: 'Compilation error: a public function exposes an internal return type', distractors: ['It prints Ready because main never calls formatter()', 'It prints Formatter', 'It compiles and automatically makes Formatter public'], reasoning: 'formatter() is public by default, but its return type is internal. Kotlin checks that API declaration even though main does not call it.', compileError: true },
    ],
  },
  {
    key: 'boss', title: 'Domain Model Engine',
    subtitle: 'Combine ticket records, a fixed priority vocabulary, and one formatting service into a consistent report for multiple records.',
    takeaway: 'Give each part one responsibility: a data class carries the record, an enum names the priority, and a stateless object formats any supplied ticket.',
    ideas: [
      ['Separate data from formatting', 'Ticket stores id and owner. TicketPrinter accepts a Ticket and computes its label rather than storing a current ticket globally.'],
      ['Name a fixed choice', 'Level.LOW and Level.HIGH provide explicit priority choices. The report prints the chosen level separately from each record’s fields.'],
      ['Prove reuse with different inputs', 'A formatter must read its argument’s fields. Calling it with two different tickets exposes hard-coded ids or owners that a single example could miss.'],
    ],
    patterns: [
      { title: 'Compose a record and a service', declarations: engine, body: 'val ticket = Ticket(12, "Ana")\nprintln(TicketPrinter.label(ticket))\nprintln(Level.HIGH)', output: '#12 Ana\nHIGH', detail: 'TicketPrinter builds a label from the supplied record. Level names the selected priority independently of that formatting operation.', prediction: program(engine, 'println(TicketPrinter.label(Ticket(5, "Bo")))\nprintln(Level.LOW)'), answer: '#5 Bo\nLOW', distractors: ['#12 Ana\nHIGH', '#5 Bo\nHIGH', 'Ticket(id=5, owner=Bo)\nLOW'], reasoning: 'label() explicitly formats a hash, the id, a space, and the owner. It does not use the data class’s generated toString(). The chosen priority is LOW.' },
      { title: 'Reuse the service across records', declarations: engine, body: 'println(TicketPrinter.label(Ticket(1, "Ana")))\nprintln(TicketPrinter.label(Ticket(2, "Bo")))', output: '#1 Ana\n#2 Bo', detail: 'The singleton holds no current-ticket state. Each call uses its own argument, so the second record does not overwrite the first.', prediction: program(engine, 'val first = Ticket(3, "Cy")\nval second = Ticket(4, "Dee")\nprintln(TicketPrinter.label(second))\nprintln(TicketPrinter.label(first))'), answer: '#4 Dee\n#3 Cy', distractors: ['#3 Cy\n#4 Dee', '#4 Dee\n#4 Dee', '#3 Cy\n#3 Cy'], reasoning: 'The calls print second before first. A shared stateless service does not make its input records share their data.' },
      { title: 'Keep model fields intact', declarations: engine, body: 'val ticket = Ticket(6, "Eli")\nprintln(TicketPrinter.label(ticket))\nprintln(ticket.owner)', output: '#6 Eli\nEli', detail: 'Formatting returns a new string; it does not replace owner with the whole label. The record remains available for other uses.', prediction: program(engine, 'val ticket = Ticket(8, "Fay")\nprintln(TicketPrinter.label(ticket))\nprintln(ticket.id)\nprintln(ticket.owner)'), answer: '#8 Fay\n8\nFay', distractors: ['#8 Fay\n8\n#8 Fay', '#8 Fay\n9\nFay', 'Ticket(id=8, owner=Fay)\n8\nFay'], reasoning: 'label() only reads the fields and concatenates a string. The id stays 8 and the owner stays Fay after formatting.' },
    ],
    practice: {
      title: 'Build a Two-Ticket Report', steps: ['In TicketPrinter.label(ticket), return "#" + ticket.id + " " + ticket.owner. Use the argument, not fixed record values.', 'In main, create first as Ticket(12, "Ana") and second as Ticket(13, "Bo").', 'Print the formatted first and second tickets, then Level.HIGH, each on a new line.'],
      initialCode: program('data class Ticket(val id: Int, val owner: String)\nenum class Level { LOW, HIGH }\nobject TicketPrinter {\n    fun label(ticket: Ticket): String {\n        // 1. Build and return the label from ticket.id and ticket.owner.\n    }\n}', '// 2. Create first and second.\n\n// 3. Print their labels, then Level.HIGH.'),
      solution: program(engine, 'val first = Ticket(12, "Ana")\nval second = Ticket(13, "Bo")\nprintln(TicketPrinter.label(first))\nprintln(TicketPrinter.label(second))\nprintln(Level.HIGH)'), output: '#12 Ana\n#13 Bo\nHIGH',
      debugTitle: 'Fix the Hard-Coded Attendee', bug: 'The first badge looks right, but Lia’s badge is also labelled Kai. The shared formatter must work for every supplied record.',
      broken: program('data class Badge(val code: Int, val attendee: String)\nenum class Tier { VIP, REGULAR }\nobject BadgePrinter {\n    fun format(badge: Badge): String = "B-" + badge.code + " Kai"\n}', 'val b1 = Badge(41, "Kai")\nval b2 = Badge(42, "Lia")\nprintln(BadgePrinter.format(b1))\nprintln(BadgePrinter.format(b2))\nprintln(Tier.VIP)'),
      debugSolution: program('data class Badge(val code: Int, val attendee: String)\nenum class Tier { VIP, REGULAR }\nobject BadgePrinter {\n    fun format(badge: Badge): String = "B-" + badge.code + " " + badge.attendee\n}', 'val b1 = Badge(41, "Kai")\nval b2 = Badge(42, "Lia")\nprintln(BadgePrinter.format(b1))\nprintln(BadgePrinter.format(b2))\nprintln(Tier.VIP)'),
      debugOutput: 'B-41 Kai\nB-42 Lia\nVIP',
      hints: ['Compare the two attendees in main with the two attendees in the output.', 'format() reads badge.code but uses fixed text for the attendee.', 'Replace " Kai" with " " + badge.attendee in format().'],
      repair: 'The formatter must read both fields from its argument. Using badge.attendee fixes the second label to B-42 Lia and keeps the first label correct.',
    },
  },
];

export const WORLD_11_LESSONS: FiveStageLesson[] = topics.map(lesson);
