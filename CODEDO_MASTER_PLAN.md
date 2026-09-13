# CodeDo Master Curriculum & Learning Framework Plan

> **Single Source of Truth Document**
> This file contains the complete, authoritative specification and master curriculum plan for CodeDo. All ongoing development, curriculum structuring, exercise counts, and feature progression must strictly align with this document.

---

## Curriculum Goal

Use the Kotlin roadmap from roadmap.sh as the coverage reference, but organize CodeDo around learner progression:

> **Beginner → Intermediate → Experienced**

The curriculum should feel like a coherent learning journey rather than a collection of Kotlin keywords.

**Specialization tracks are intentionally excluded for now.** The current CodeDo Kotlin curriculum focuses entirely on mastering **Core Kotlin**.

---

# 🎯 CodeDo's 6-Step Topic Mastery Program

Every Kotlin topic in CodeDo should follow the same six-step learning loop.

```text
┌──────────────────────┐
│ 1. LEARN             │
│ Understand concept   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 2. EXPLORE           │
│ 5–6 practical        │
│ examples             │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 3. PREDICT OUTPUT    │
│ 5–6 challenges       │
│ Predict before run   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 4. WRITE & RUN       │
│ Write the program    │
│ and execute it       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 5. DEBUG PROGRAM     │
│ Find, fix & run      │
│ broken programs      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ 6. MASTERED          │
│ Demonstrated mastery │
└──────────────────────┘
```

## The six stages

| Step | Purpose | Learner skill |
|---|---|---|
| **1. Learn** | Explain the concept clearly | Understand |
| **2. Explore** | Show 5–6 practical examples | Recognize |
| **3. Predict Output** | Give 5–6 code snippets and ask for the output | Reason |
| **4. Write & Run** | Ask the learner to write and execute code | Create |
| **5. Debug Program** | Give broken programs to diagnose and fix | Diagnose |
| **6. Mastered** | Confirm the learner can apply the concept | Demonstrate |

### Important principle

The six steps are not six different lesson types that are used optionally.

> **Every core topic should pass through all six steps before it is considered mastered.**

This gives CodeDo a consistent learning system across the entire Kotlin curriculum.

---

# 🐞 Step 5 — Debug the Program

Debugging is a core part of CodeDo, not an additional quiz.

The learner has already learned the concept, observed correct examples, predicted behavior, and written a working program. Now they must learn to deal with **incorrect code**.

The learning progression becomes:

> **Understand → Recognize → Reason → Create → Diagnose → Demonstrate**

## Types of bugs

Debugging challenges should progressively cover:

### 1. Syntax Bugs

Example:

```kotlin
val name = "Nishu
println(name)
```

Task:

> Find and fix the syntax error.

### 2. Logic Bugs

Example:

```kotlin
fun isAdult(age: Int): Boolean {
    return age < 18
}
```

The program runs, but the logic is incorrect.

This is especially valuable because real-world bugs are often logical rather than syntactical.

### 3. Runtime Bugs

Example:

```kotlin
val numbers = listOf(10, 20, 30)

println(numbers[3])
```

Task:

> Identify why the program crashes and fix it.

### 4. Null-Safety Bugs

Example:

```kotlin
val name: String? = null

println(name.length)
```

Task:

> Fix the nullable access safely.

### 5. Type Bugs

Example:

```kotlin
val age = "25"

println(age + 5)
```

### 6. Collection Bugs

Example:

```kotlin
val numbers = mutableListOf(1, 2, 3)

for (number in numbers) {
    if (number % 2 == 0) {
        numbers.remove(number)
    }
}
```

The learner must reason about the behavior instead of simply looking for a syntax error.

### 7. Coroutine / Flow Bugs

At Experienced level, debugging should include:

- Incorrect coroutine scope
- Missing `await()`
- Incorrect dispatcher
- Cancellation problems
- Race conditions
- Incorrect Flow operators
- StateFlow / SharedFlow mistakes
- Exception propagation problems

---

# 🧠 Debugging Hint System

Do not immediately reveal the bug.

Use progressive hints.

### Hint 1

Give a conceptual clue.

> 💡 Something is wrong with the condition.

### Hint 2

Narrow the reasoning.

> 💡 What should happen when `age` is 18?

### Final Hint

Identify the relevant concept without directly solving everything.

> 🔎 Check the comparison operator.

This keeps debugging a **problem-solving exercise** instead of turning it into another answer-recall activity.

---

# 📈 Debugging Difficulty

Debugging should become harder as the learner progresses.

| Difficulty | Challenge |
|---|---|
| 🟢 Easy | Obvious syntax error |
| 🟢 Easy | Single-line logic error |
| 🟡 Medium | Multiple possible causes |
| 🟡 Medium | Runtime + logic interaction |
| 🔴 Hard | Subtle Kotlin behavior |
| 🔴 Expert | Coroutine / Flow / concurrency bug |

Later, CodeDo can introduce timed debugging challenges such as:

> 🐞 **Bug Hunter — Find the bug before time runs out.**

---

# 🟢 Beginner

**Goal:** A learner who has never programmed in Kotlin should be able to write useful standalone Kotlin programs.

Every topic below uses **topic-aware activity selection**. The activities are not mandatory for every topic.

> **Use only the activities that meaningfully prove understanding.**

Exercise counts are also **coverage-driven**, not fixed at 5–6. Where an activity applies, it has a minimum baseline (normally **at least 3**), and additional exercises are created whenever needed to cover the topic's important knowledge points and behaviors.

## 1. Kotlin Fundamentals

- What is Kotlin?
- Kotlin syntax
- `main()`
- Comments
- `print()` / `println()`
- `val` vs `var`
- Variables
- Type inference
- Basic data types
  - Int
  - Long
  - Float
  - Double
  - Boolean
  - Char
  - String
- String templates

## 2. Operators

- Arithmetic operators
- Comparison operators
- Logical operators
- Assignment operators
- Increment / decrement
- Operator precedence

## 3. Conditions

- `if`
- `if-else`
- `else-if`
- `when`
- `when` with ranges
- `when` as an expression

## 4. Loops

- `for`
- `while`
- `do-while`
- Ranges
- Progressions
- `break`
- `continue`

## 5. Functions

- Defining functions
- Parameters
- Return values
- Default parameters
- Named arguments
- Single-expression functions
- Local functions
- `vararg`

## 6. Collections

- Arrays
- Lists
- Sets
- Maps
- Mutable vs read-only collections
- Basic collection operations

## 7. Null Safety ⭐

- Nullable types
- `?`
- Safe calls `?.`
- Elvis operator `?:`
- Non-null assertion `!!`
- Null checks
- Safe casts

## 8. Basic OOP

- Classes
- Objects
- Properties
- Methods
- Constructors
- Primary constructors
- `init`
- Visibility modifiers
- Data classes
- Enums
- Basic inheritance
- Interfaces

## 🏆 Beginner Boss Fight

### Student Grade Manager

The learner should build a small application that:

- Stores students
- Calculates grades
- Uses collections
- Uses functions
- Uses conditions
- Uses loops
- Uses classes
- Uses null safety

The boss validates whether the learner can combine the concepts rather than simply recall them.

---

# 🟡 Intermediate

**Goal:** The learner should start writing idiomatic Kotlin rather than "Java written in Kotlin."

Every topic uses **topic-aware activity selection** rather than a mandatory six-step sequence.

> **Use only the activities that meaningfully prove understanding.**

Exercise counts are **coverage-driven**. Applicable Explore/Predict/MCQ activities have a minimum baseline (normally **at least 3**), but complex topics may require many more.

## 1. Advanced Functions

- Lambda expressions
- Anonymous functions
- Function types
- Higher-order functions
- `it`
- Function references
- `return` from lambdas
- Inline functions
- `noinline`
- `crossinline`

## 2. Functional Collection Operations ⭐

This should be a major section in CodeDo.

- `map`
- `mapNotNull`
- `filter`
- `filterNot`
- `find`
- `first`
- `last`
- `any`
- `all`
- `none`
- `count`
- `sum`
- `sumOf`
- `reduce`
- `fold`
- `groupBy`
- `associate`
- `partition`
- `zip`
- `flatten`
- `flatMap`
- `sorted`
- `sortedBy`
- `distinct`
- `chunked`
- `windowed`

## 3. Object-Oriented Kotlin

- Abstract classes
- Interfaces
- Inheritance
- Sealed classes
- Nested classes
- Inner classes
- Object declarations
- Companion objects
- Extension functions
- Extension properties
- Data classes
- Enum classes
- Type aliases

## 4. Generics

- Generic classes
- Generic functions
- Generic constraints
- Variance
- `in`
- `out`
- Star projections
- `reified` types

## 5. Advanced Nullability & Types

- Smart casts
- Type checks
- Explicit casts
- Safe casts
- Nullable generics
- Platform types
- `Nothing`
- `Unit`
- `Any`

## 6. Scope Functions ⭐

- `let`
- `run`
- `with`
- `apply`
- `also`

### Important learning objective

Do not teach only the syntax.

Teach:

> **When should I use which scope function?**

Debugging should include cases where the wrong scope function produces confusing or incorrect behavior.

## 7. Sequences

- Collection vs Sequence
- Lazy evaluation
- `asSequence()`
- Sequence transformations
- Sequence terminal operations
- Performance implications

## 8. Exceptions & Error Handling

- `try`
- `catch`
- `finally`
- `throw`
- Custom exceptions
- `runCatching`
- Result-based error handling

## 9. Kotlin Standard Library

- `let`
- `takeIf`
- `takeUnless`
- `require`
- `check`
- `error`
- `TODO`
- Useful standard functions

## 10. Packages & Code Organization

- Packages
- Imports
- Visibility
- File organization
- Type aliases
- Kotlin conventions

## 🏆 Intermediate Boss Fight

### E-Commerce Order Engine

The challenge should require:

- Data classes
- Sealed classes
- Generics
- Extension functions
- Lambdas
- Collection operators
- Scope functions
- Null safety
- Error handling

Include at least one intentionally broken requirement that the learner must debug before completing the boss.

---

# 🔴 Experienced

**Goal:** The learner should understand Kotlin's advanced capabilities and be capable of building production-grade Kotlin systems.

Every topic uses **topic-aware activity selection** rather than a mandatory six-step sequence.

> **Use only the activities that meaningfully prove understanding.**

Exercise counts are **coverage-driven**. Applicable Explore/Predict/MCQ activities have a minimum baseline (normally **at least 3**), but complex topics may require many more.

## 1. Coroutines ⭐⭐⭐

This should be one of the biggest Experienced worlds.

- What are coroutines?
- Suspending functions
- `suspend`
- Coroutine builders
  - `launch`
  - `async`
  - `runBlocking`
- Coroutine scopes
- Dispatchers
- Context
- Jobs
- Structured concurrency
- Cancellation
- Timeouts
- Exception handling
- `CoroutineExceptionHandler`
- `supervisorScope`
- `SupervisorJob`
- `withContext`
- Async programming
- Parallel decomposition

### Debugging focus

- Incorrect scope usage
- Missing `await()`
- Incorrect dispatcher
- Cancellation bugs
- Exception propagation
- Structured concurrency violations
- Race conditions

## 2. Flow ⭐⭐⭐

- Flow fundamentals
- Cold flows
- `flow`
- `collect`
- `map`
- `filter`
- `transform`
- `combine`
- `zip`
- `flatMapConcat`
- `flatMapMerge`
- `flatMapLatest`
- `catch`
- `retry`
- `debounce`
- `distinctUntilChanged`
- `StateFlow`
- `SharedFlow`
- Hot vs cold streams

### Debugging focus

- Incorrect Flow operator
- Hot vs cold behavior
- Incorrect collection
- StateFlow mistakes
- SharedFlow mistakes
- Cancellation
- Exception handling
- Timing-related bugs

## 3. Advanced Kotlin

- Inline classes / value classes
- Delegated properties
- Property delegation
- `lazy`
- `observable`
- Custom delegates
- Operator overloading
- Destructuring
- DSL construction
- Type-safe builders
- Contracts
- Context receivers / current context features
- Advanced generics
- Reified types

## 4. Kotlin/JVM

- Java interoperability
- Calling Java from Kotlin
- Calling Kotlin from Java
- JVM annotations
- `@JvmStatic`
- `@JvmField`
- `@JvmOverloads`
- `@JvmName`
- Platform types
- JVM metadata

## 5. Performance

- Collection performance
- Sequence performance
- Allocation
- Inline functions
- Boxing/unboxing
- Coroutine overhead
- Memory considerations
- Choosing the right collection

### Debugging focus

Give learners slow or inefficient programs and ask them to identify the performance problem.

## 6. Concurrency

- Thread vs coroutine
- Shared mutable state
- Race conditions
- Mutex
- Atomic operations
- Thread confinement
- Actors / channels
- Structured concurrency

### Debugging focus

This becomes advanced debugging territory:

- Race conditions
- Deadlocks
- Shared-state corruption
- Incorrect synchronization
- Cancellation races

## 7. Kotlin Ecosystem

- Gradle basics
- Kotlin serialization
- Kotlin test
- File I/O
- Date & Time
- Libraries
- KDoc
- Dokka
- Build tools

---

# 🏆 Experienced Boss Fight

## Build a Concurrent Data Processing Engine

Give the learner a large dataset and require them to:

- Process it concurrently
- Use coroutines
- Use Flow
- Handle cancellation
- Handle failures
- Use appropriate collections
- Optimize performance

The boss should contain at least one deliberately broken component that the learner must debug.

This distinguishes an experienced Kotlin developer from someone who only knows advanced syntax.

---

# 🎮 CodeDo World Structure

Do not make every topic simply:

> Lesson → Quiz → Next Lesson

Instead, organize the curriculum into **Worlds**.

Each topic inside a world uses an appropriate, topic-aware activity set.

```text
World
 │
 ├── Topic 1
 │    ├── Learn
 │    ├── Explore (minimum 3 when applicable; coverage-driven)
 │    ├── Predict (minimum 3 when applicable; coverage-driven)
 │    ├── Write & Run
 │    ├── Debug
 │    └── Mastered
 │
 ├── Topic 2
 │    ├── Learn
 │    ├── Explore
 │    ├── Predict
 │    ├── Write & Run
 │    ├── Debug
 │    └── Mastered
 │
 └── 🏆 Boss Fight
```

---

# 🟢 Beginner Worlds

## World 1 — Kotlin Awakening
### Kotlin Fundamentals
1. What is Kotlin?
2. Kotlin syntax
3. `main()`
4. Comments
5. `print()` / `println()`
6. `val` vs `var`
7. Variables
8. Type inference
9. `Int`
10. `Long`
11. `Float`
12. `Double`
13. `Boolean`
14. `Char`
15. `String`
16. String templates

**World Boss — Personal Profile Program:** Build a small standalone Kotlin program that declares different variables, uses appropriate data types, prints values, and uses string templates.

## World 2 — Operator Forge
### Operators
1. Arithmetic operators
2. Comparison operators
3. Logical operators
4. Assignment operators
5. Increment / decrement
6. Operator precedence

**World Boss — Smart Calculator:** Build a calculator/decision program that combines arithmetic, comparisons, logical conditions, assignments, increment/decrement, and precedence.

## World 3 — Decision Maker
### Conditions
1. `if`
2. `if-else`
3. `else-if`
4. `when`
5. `when` with ranges
6. `when` as an expression
7. Multiple conditions and nested conditions
8. Type checks with `is` where appropriate

**World Boss — Grade & Eligibility System:** Build a program that evaluates multiple conditions and produces decisions/results.

## World 4 — Loop Master
### Loops, Ranges & Progressions
1. `for`
2. `while`
3. `do-while`
4. Ranges
5. Progressions
6. `downTo`
7. `step`
8. `break`
9. `continue`
10. Nested loops

**World Boss — Pattern & Number Analyzer:** Build a program that processes a range of values using multiple loop constructs and control statements.

## World 5 — Function Forge
### Functions
1. Defining functions
2. Function parameters
3. Return values
4. Default parameters
5. Named arguments
6. Single-expression functions
7. Local functions
8. `vararg`

**World Boss — Utility Toolkit:** Build a reusable collection of functions that perform several related operations.

## World 6 — Collection Valley
### Collections
1. Arrays
2. Lists
3. Sets
4. Maps
5. Mutable vs read-only collections
6. Creating and accessing collections
7. Adding/removing/updating mutable elements
8. Iterating over collections
9. Basic collection operations
10. Choosing the right collection type

**World Boss — Student Records:** Build a small student-record system using multiple collection types.

## World 7 — Null Safety Shield
### Null Safety
1. Nullable types
2. Nullable variables
3. Safe call `?.`
4. Elvis operator `?:`
5. Non-null assertion `!!`
6. Null checks
7. Smart casts
8. Safe casts `as?`
9. Nullable collections and collection values
10. Chaining nullable operations

**World Boss — Safe Data Processor:** Build a program that safely processes incomplete/missing data without unnecessary crashes.

## World 8 — Object Kingdom
### Basic OOP
1. Classes
2. Objects
3. Properties
4. Methods
5. Constructors
6. Primary constructors
7. `init`
8. Visibility modifiers
9. Data classes
10. Enums
11. Basic inheritance
12. Interfaces
13. Overriding members

**World Boss — Student Grade Manager:** Build a small application that stores students, calculates grades, uses collections, functions, conditions, loops, classes, and null safety.

---

# 🟡 Intermediate Worlds

## World 9 — Lambda Lab
### Advanced Functions
1. Lambda expressions
2. Anonymous functions
3. Function types
4. Higher-order functions
5. `it`
6. Function references
7. Returning from lambdas
8. Local returns
9. Inline functions
10. `noinline`
11. `crossinline`

**World Boss — Functional Utility Engine:** Build reusable operations using higher-order functions and function types.

## World 10 — Collection Wizardry
### Functional Collection Operations
1. `map`
2. `mapNotNull`
3. `filter`
4. `filterNot`
5. `filterIsInstance`
6. `flatMap`
7. `flatten`
8. `reduce`
9. `fold`
10. `groupBy`
11. `associate`
12. `partition`
13. `zip`
14. `chunked`
15. `windowed`
16. `distinct`
17. `sorted`
18. `sortedBy`
19. `min` / `max`
20. `sum` / `average`
21. `any` / `all` / `none`
22. `first` / `find`
23. Collection pipelines and chaining

**World Boss — Data Transformation Engine:** Transform and analyze a realistic dataset using multiple collection operations.

## World 11 — OOP Evolution
### Advanced OOP & Kotlin Types
1. Inheritance
2. Abstract classes
3. Interfaces
4. Multiple interface implementation
5. Sealed classes
6. Sealed interfaces
7. Data classes in domain modeling
8. Enum classes
9. Nested classes
10. Inner classes
11. Object declarations
12. Companion objects
13. Extension functions
14. Extension properties
15. Delegation
16. Delegated properties
17. Visibility and API design

**World Boss — Domain Model Engine:** Design a maintainable domain model using Kotlin's OOP and type-system features.

## World 12 — Generic Realm
### Generics & Type System
1. Generic classes
2. Generic functions
3. Type parameters
4. Generic constraints
5. Multiple constraints
6. `in` variance
7. `out` variance
8. Invariance
9. Declaration-site variance
10. Use-site variance
11. Star projections
12. Reified type parameters
13. Type aliases
14. Type-safe generic APIs

**World Boss — Generic Data Toolkit:** Build reusable generic components that work safely across multiple data types.

## World 13 — Scope Masters
### Scope Functions
1. `let`
2. `run`
3. `apply`
4. `also`
5. `with`
6. `this` vs `it`
7. Return values of scope functions
8. Choosing the appropriate scope function
9. Scope-function chaining
10. Avoiding overuse and nesting

**World Boss — Configuration Builder:** Refactor and construct objects using scope functions appropriately.

## World 14 — Sequence Dimension
### Sequences & Lazy Processing
1. What sequences are
2. Eager collection processing
3. Lazy processing
4. Creating sequences
5. `asSequence()`
6. Intermediate operations
7. Terminal operations
8. Sequence evaluation order
9. Short-circuiting
10. Sequences vs collections
11. Performance trade-offs
12. When sequences should and should not be used

**World Boss — Large Dataset Processor:** Compare and implement efficient data-processing pipelines.

## World 15 — Error Fortress
### Exceptions & Error Handling
1. Exceptions
2. `try`
3. `catch`
4. `finally`
5. `throw`
6. Multiple catch blocks
7. `try` as an expression
8. Custom exceptions
9. Checked vs unchecked exception model
10. `Result`
11. `runCatching`
12. Success/failure handling
13. Error-handling patterns
14. Avoiding swallowed errors
15. Designing meaningful failure paths

**World Boss — Reliable Order Engine:** Build an application that handles invalid input and failures predictably.

---

# 🔴 Experienced Worlds

## World 16 — Coroutine Academy
### Coroutines
1. Coroutine fundamentals
2. Coroutine builders
3. `launch`
4. `async`
5. `await`
6. Suspending functions
7. `suspend`
8. Coroutine context
9. Dispatchers
10. Jobs
11. Cancellation
12. Cooperative cancellation
13. Structured concurrency
14. `coroutineScope`
15. `supervisorScope`
16. Exception handling in coroutines
17. Coroutine best practices

**World Boss — Concurrent Task Runner:** Build a concurrent application with cancellation and structured concurrency.

## World 17 — Flow Universe
### Flow & Reactive Streams
1. Flow fundamentals
2. Cold Flow
3. Hot streams
4. `flow`
5. `collect`
6. Intermediate Flow operators
7. `map`
8. `filter`
9. `transform`
10. `catch`
11. `onEach`
12. `StateFlow`
13. `SharedFlow`
14. State vs events
15. Flow cancellation
16. Combining flows
17. Flow lifecycle
18. Backpressure/conflation concepts where applicable

**World Boss — Live Data Pipeline:** Build a reactive data pipeline that models state and events.

## World 18 — Concurrency Arena
### Concurrency
1. Threads
2. Shared mutable state
3. Thread safety
4. Race conditions
5. Synchronization
6. Mutex
7. Atomic operations
8. Thread confinement
9. Coroutine concurrency
10. Concurrent access patterns
11. Deadlock concepts
12. Avoiding shared mutable state
13. Structured concurrency vs uncontrolled concurrency

**World Boss — Concurrent Data Processor:** Build a program that safely processes shared data concurrently and deliberately debug a race-condition bug.

## World 19 — Kotlin Blacksmith
### Advanced Kotlin Language Features
1. Delegation
2. Delegated properties
3. Custom delegates
4. DSL design
5. Type-safe builders
6. Value classes
7. Inline classes / value-class concepts
8. Contracts
9. Contract limitations and use cases
10. Advanced extension design
11. Operator overloading
12. Infix functions
13. Destructuring
14. Advanced sealed/data modeling
15. Advanced language idioms
16. Advanced standard-library patterns

**World Boss — Mini DSL:** Design a small type-safe DSL that demonstrates advanced Kotlin language capabilities.

## World 20 — JVM Bridge
### JVM & Java Interoperability
1. Java interoperability
2. Calling Java from Kotlin
3. Calling Kotlin from Java
4. Platform types
5. Nullability across the Java boundary
6. JVM annotations
7. `@JvmStatic`
8. `@JvmOverloads`
9. `@JvmField`
10. Java/Kotlin collection interoperability
11. SAM conversions
12. JVM method/property mapping
13. Checked-exception interoperability considerations
14. JVM metadata concepts

**World Boss — Java/Kotlin Integration Module:** Build a small module that interoperates cleanly between Java and Kotlin.

## World 21 — Performance Lab
### Kotlin Performance
1. Allocation
2. Object creation costs
3. Collections and allocation
4. Eager vs lazy processing
5. Sequences
6. Inline functions
7. Boxing/unboxing considerations
8. Value classes and representation
9. String-building considerations
10. Coroutine performance
11. Dispatchers and scheduling overhead
12. Measuring performance
13. Benchmarking concepts
14. Avoiding premature optimization
15. Performance-oriented API design

**World Boss — Performance Optimization Challenge:** Profile and improve a deliberately inefficient Kotlin program.

## World 22 — Production Kotlin
### Kotlin Ecosystem & Production Engineering
1. Kotlin Standard Library
2. Packages
3. Imports
4. Code organization
5. Gradle basics
6. Kotlin Gradle configuration
7. Dependencies
8. Library management
9. Serialization
10. JSON/data serialization concepts
11. File I/O
12. Data/time APIs
13. Testing fundamentals
14. Unit testing
15. Test organization
16. KDoc
17. Dokka
18. Build tools
19. CI/CD concepts
20. Production code quality
21. Kotlin best practices
22. Maintainability and API design

**World Boss — Production Kotlin Project:** Build a small production-style project with organized code, dependencies, serialization/I/O, tests, documentation, and a reliable build.

### 🏆 Kotlin Grandmaster
A comprehensive production-grade Kotlin challenge combining:
- Language fundamentals
- Control flow
- Functions
- Collections
- Null safety
- OOP
- Functional programming
- Generics
- Error handling
- Coroutines
- Flow
- Concurrency
- JVM interoperability
- Performance
- Testing
- Production engineering

The Grandmaster challenge should include at least one deliberately broken component that the learner must diagnose and fix.

A comprehensive production-grade Kotlin challenge combining:

- Coroutines
- Flow
- Concurrency
- Collections
- Error handling
- Generics
- Performance
- Architecture
- Debugging

---

# 📊 Recommended Overall Scale

| Level | Worlds | Lesson Units |
|---|---:|---:|
| 🟢 Beginner | 7–8 | ~35–45 |
| 🟡 Intermediate | 7–8 | ~40–50 |
| 🔴 Experienced | 7–8 | ~40–50 |
| **Total Core Kotlin** | **22 worlds** | **~120–140 units** |

The target is approximately **120–140 meaningful Kotlin lesson units**.

Do not turn every node from the roadmap into a separate lesson. Group related concepts into meaningful learning units.

---

# 🧪 Recommended Content Pattern Per Topic

A typical CodeDo topic should look like this:

## Example: Null Safety

### 1. Learn
Explain:
- What nullable types are
- Why Kotlin has null safety
- `String` vs `String?`
- `?.`
- `?:`
- `!!`

### 2. Explore — 5–6 Examples

Show progressively more realistic examples:

1. Basic nullable variable
2. Safe call
3. Elvis operator
4. Nullable function parameter
5. Nullable collection value
6. Combining multiple null-safe operations

### 3. Predict Output — 5–6 Challenges

Show code and ask:

> **What will this program print?**

The learner must predict before seeing the answer.

### 4. Write & Run

Give a programming task:

> Write a function that safely extracts a user's display name and returns `"Guest"` when the name is missing.

The learner writes and runs the program.

### 5. Debug Program

Give broken programs such as:

```kotlin
fun getName(name: String?): Int {
    return name.length
}
```

The learner must:

1. Inspect the code
2. Identify the problem
3. Fix it
4. Run it
5. Verify the result

### 6. Mastered

Only after completing the required stages should the topic be marked:

> 🏆 **Mastered**

---

# 🎯 Final CodeDo Learning Philosophy

CodeDo should teach programming as a skill, not as information.

The six-step system is designed around six developer abilities:

| CodeDo Stage | Developer Ability |
|---|---|
| **Learn** | Understand a concept |
| **Explore** | Recognize how it is used |
| **Predict** | Reason about code |
| **Write & Run** | Create working code |
| **Debug** | Diagnose broken code |
| **Mastered** | Demonstrate independent understanding |

The core loop is:

> **Learn → Observe → Reason → Create → Repair → Master**

That should be the consistent learning model throughout the entire Core Kotlin curriculum.

---

# Reference

Kotlin roadmap used as the initial coverage reference:

https://roadmap.sh/pdfs/roadmaps/kotlin.pdf


---

# 🌐 Language-Agnostic CodeDo Learning Framework

The CodeDo curriculum architecture should **not be Kotlin-specific**.

Kotlin is the first implementation of a broader learning system that can later support additional programming languages such as:

- Java
- Python
- JavaScript / TypeScript
- C
- C++
- C#
- Go
- Rust
- Swift
- SQL
- Other languages as CodeDo expands

The **curriculum content changes by language**, but the **learning framework remains the same**.

## Core Product Principle

> **CodeDo should be a programming-learning platform, not a Kotlin-learning app.**

Kotlin is simply the first language whose curriculum is being built using the framework.

---

# 🧩 Adaptive Topic Mastery

The six learning activities are **available tools**, not mandatory steps.

Do **not** force every topic through every activity.

Instead:

> **Choose the activities that best prove understanding of that particular topic.**

The learner ultimately reaches:

> 🏆 **Mastered**

when they demonstrate sufficient understanding through the activities appropriate for that topic.

## Available Learning Activities

1. 📖 **Learn**
2. 🔍 **Explore Examples**
3. 🧠 **Predict Output / Behavior**
4. 💻 **Write & Run**
5. 🐞 **Debug the Program**
6. ❓ **Check Understanding**

**Mastered** is the outcome, not necessarily another activity.

---

# 📚 Topic Types

Each topic should have a classification that determines which activities are appropriate.

## 📖 Conceptual

Used for topics where understanding information is more important than writing code.

Examples:

- What is Kotlin?
- History of Kotlin
- What is a compiler?
- What is an interpreter?
- What is an IDE?
- Programming paradigms
- What is object-oriented programming?
- What is functional programming?

Typical flow:

```text
Learn
  ↓
Explore / Visual Explanation
  ↓
MCQ / Check Understanding
  ↓
Mastered
```

No artificial Predict, Write & Run, or Debug stages should be created.

---

## 💻 Practical

Used when the learner needs to understand and use a language feature.

Examples:

- Variables
- Conditions
- Loops
- Functions
- Collections
- Null safety
- Classes

Typical flow:

```text
Learn
  ↓
Explore
  ↓
Predict
  ↓
Write & Run
  ↓
Debug
  ↓
Check Understanding
  ↓
Mastered
```

---

## 🧠 Reasoning

Used when understanding how code behaves is especially important.

Examples:

- Operator precedence
- Scope
- Evaluation order
- Closures
- Recursion
- Collection transformations

Typical flow:

```text
Learn
  ↓
Explore
  ↓
Predict
  ↓
Check Understanding
  ↓
Mastered
```

Write & Run and Debug can be added when they provide meaningful value.

---

## 🛠️ Applied

Used for concepts that are best demonstrated through implementation.

Examples:

- Extension functions
- Generics
- APIs
- File handling
- Database operations
- Networking
- Coroutines
- Concurrency

Typical flow:

```text
Learn
  ↓
Explore
  ↓
Write & Run
  ↓
Debug
  ↓
Mastered
```

Predict and MCQ can be added when appropriate.

---

# 🧠 Adaptive Activity Selection

The curriculum engine should eventually be able to determine the appropriate activity set from topic metadata.

Example:

```text
Topic
├── title
├── language
├── level
├── category
├── type
├── concepts[]
├── activities[]
└── masteryCriteria
```

Example:

```text
"What is Kotlin?"

type = CONCEPTUAL

activities:
  - learn
  - mcq
```

```text
"Variables"

type = PRACTICAL

activities:
  - learn
  - explore
  - predict
  - write_run
  - debug
  - mcq
```

```text
"Null Safety"

type = PRACTICAL

activities:
  - learn
  - explore
  - predict
  - write_run
  - debug
  - mcq
```

```text
"Recursion"

type = REASONING

activities:
  - learn
  - explore
  - predict
  - write_run
  - debug
```

This allows the same architecture to work for every programming language.

---

# ❓ Check Understanding

MCQs should not be treated as merely a traditional quiz.

They should be used to determine whether the learner actually grasped the concept.

Questions can test:

### Recall

> Which keyword declares an immutable variable?

### Understanding

> Why would you choose an immutable value here?

### Code comprehension

> What does this code do?

### Scenario-based reasoning

> Which approach is safer in this situation?

### Error identification

> Which statement contains the problem?

### Concept comparison

> What is the difference between X and Y?

The question format can evolve beyond traditional multiple-choice into:

- Multiple choice
- Multiple select
- True / false
- Match the concepts
- Arrange in correct order
- Identify the incorrect statement
- Predict behavior
- Choose the best solution

---

# 🐞 Debugging as a Universal Programming Skill

Debugging should remain language-agnostic at the product level.

Every language can have different bug types, but CodeDo can use the same conceptual categories:

- Syntax errors
- Type errors
- Logic errors
- Runtime errors
- State-related bugs
- API misuse
- Performance problems
- Concurrency problems

The actual challenges are language-specific.

For example:

```text
Kotlin → Kotlin debugging challenge
Python → Python debugging challenge
Java → Java debugging challenge
JavaScript → JavaScript debugging challenge
```

But the learner experience remains consistent.

---

# 🎮 Generic CodeDo Architecture

The app should eventually be structured around:

```text
CodeDo
│
├── Programming Languages
│
│   ├── Kotlin
│   │   ├── Beginner
│   │   ├── Intermediate
│   │   └── Experienced
│   │
│   ├── Python
│   │   ├── Beginner
│   │   ├── Intermediate
│   │   └── Experienced
│   │
│   ├── Java
│   │   ├── Beginner
│   │   ├── Intermediate
│   │   └── Experienced
│   │
│   └── ...
│
└── Shared Learning Engine
    ├── Learn
    ├── Explore
    ├── Predict
    ├── Write & Run
    ├── Debug
    ├── Check Understanding
    └── Mastery Engine
```

The **Shared Learning Engine** should be common across languages.

Only the curriculum and language-specific execution/content need to change.

---

# 🏗️ Separate Content From Learning Engine

This is an important architectural principle.

Do not build the app around Kotlin-specific screens or Kotlin-specific assumptions.

Instead:

```text
                    ┌─────────────────────┐
                    │  CodeDo App Engine  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
       Learning Engine                    Code Execution
              │                                 │
       ┌──────┴──────┐                  ┌───────┴────────┐
       │             │                  │                │
     Learn        Mastery            Kotlin           Python
       │             │                  Java          JavaScript
    Explore       Progress             C++              ...
    Predict       XP/Levels
    Write
    Debug
    MCQ
```

This means adding a new language later should primarily involve adding:

1. Curriculum
2. Examples
3. Questions
4. Coding challenges
5. Debugging challenges
6. Language execution support
7. Language-specific metadata

The core learning experience remains unchanged.

---

# 🗺️ Language Curriculum Structure

Every language should use the same high-level progression:

```text
LANGUAGE
│
├── 🟢 Beginner
│
├── 🟡 Intermediate
│
└── 🔴 Experienced
```

However, the actual worlds and topics should be language-specific.

For example:

```text
Kotlin
├── Beginner
│   ├── Kotlin Fundamentals
│   ├── Control Flow
│   ├── Functions
│   └── ...
│
Python
├── Beginner
│   ├── Python Fundamentals
│   ├── Control Flow
│   ├── Functions
│   └── ...
```

Do not assume that every language requires exactly the same topics or world structure.

The **framework is standardized; the curriculum is customized.**

---

# 🎯 Mastery Should Be Competency-Based

A topic should not become mastered simply because the learner clicked through all screens.

Mastery should be based on evidence.

For example:

```text
Conceptual Topic
→ Learn + MCQ performance

Practical Topic
→ Learn + coding performance + debugging

Reasoning Topic
→ Predict + reasoning questions

Applied Topic
→ Implementation + debugging
```

The mastery engine can eventually consider:

- Accuracy
- Number of attempts
- Hint usage
- Time taken
- Code execution results
- Test cases passed
- Debugging success
- Repeated performance

This allows CodeDo to distinguish:

> **"I completed the lesson"**

from:

> **"I actually understand this."**

---

# 📊 Generic Content Model

A future language-independent topic could conceptually be represented as:

```json
{
  "language": "kotlin",
  "level": "beginner",
  "title": "Variables",
  "type": "practical",
  "activities": [
    "learn",
    "explore",
    "predict",
    "write_run",
    "debug",
    "mcq"
  ],
  "masteryCriteria": {
    "minimumAccuracy": 80,
    "codingRequired": true,
    "debuggingRequired": true
  }
}
```

A conceptual topic:

```json
{
  "language": "kotlin",
  "level": "beginner",
  "title": "What is Kotlin?",
  "type": "conceptual",
  "activities": [
    "learn",
    "mcq"
  ],
  "masteryCriteria": {
    "minimumAccuracy": 80,
    "codingRequired": false,
    "debuggingRequired": false
  }
}
```

The same schema can represent:

```text
language = kotlin
language = python
language = java
language = javascript
language = cpp
language = rust
...
```

---

# 🚀 Product Vision

CodeDo should eventually become:

> **One app where a learner can master multiple programming languages through the same proven learning system.**

The learner shouldn't need to learn a new interaction model when switching languages.

For example:

```text
Master Kotlin
      ↓
Start Python
      ↓
Same CodeDo learning experience
      ↓
Learn → Explore → Predict → Write → Debug → Master
```

Only the **content, syntax, challenges, and execution environment** change.

---


---

# ✅ Product Decisions — Consolidated Requirements

The following decisions are mandatory principles for the current CodeDo learning system:

### Prompt 1 — Not Every Topic Uses Every Activity
Every topic **must not** automatically receive Predict Output, Write & Run, and Debug.

Examples:

```text
What is Kotlin?
→ Learn → MCQ → Mastered
```

```text
Variables
→ Learn → Explore → Predict → Write & Run → Debug → MCQ → Mastered
```

The activity set depends on what can meaningfully demonstrate understanding.

### Prompt 2 — The Plan Must Be Language-Agnostic
Kotlin is the first curriculum, not the definition of the product.

The same CodeDo learning engine should later support languages such as:

- Kotlin
- Python
- Java
- JavaScript / TypeScript
- C
- C++
- C#
- Go
- Rust
- Swift
- SQL
- Future languages

The **learning framework is shared**, while curriculum, syntax, examples, challenges, debugging content, and execution support are language-specific.

### Prompt 3 — Explore and Predict Are Not Fixed at 5–6
Never use a rule such as:

> "Every topic has 5–6 examples and 5–6 predictions."

Instead:

> **The number of exercises is determined by the amount and complexity of knowledge that needs to be practiced.**

For Predict specifically:

> **Every meaningful code behavior/detail that can be tested through prediction should be exercised adequately.**

A complex topic can therefore have 10, 15, 20, or more prediction challenges when required. A simple topic may need only the minimum.

### Prompt 4 — There Is a Minimum
Flexibility does not mean an arbitrary single example is enough.

Default minimums:

| Activity | Minimum | Maximum |
|---|---:|---|
| Explore Examples | 3 | No fixed maximum |
| Predict Output / Behavior | 3 | No fixed maximum |
| MCQ / Check Understanding | 3 | No fixed maximum |
| Write & Run | Topic-dependent | No fixed maximum |
| Debug | Topic-dependent | No fixed maximum |

The minimum applies **only when that activity is applicable to the topic**.

### Final Formula

```text
Actual Exercise Count
=
MAX(
    Minimum Required,
    Exercises Needed for Concept Coverage
)
```

Then:

```text
Actual Exercise Count
+
Learner Performance
+
Adaptive Practice
=
Personalized Mastery Path
```


# ⭐ Final Learning Philosophy

CodeDo's fundamental learning philosophy is:

> **Don't force every concept into the same lesson format. Use the right activity to prove understanding.**

The six core activities are:

> 📖 Learn  
> 🔍 Explore  
> 🧠 Predict  
> 💻 Write & Run  
> 🐞 Debug  
> ❓ Check Understanding

But the learner journey is **adaptive**.

A simple conceptual topic may only need:

> **Learn → MCQ → Mastered**

A practical programming topic may need:

> **Learn → Explore → Predict → Write & Run → Debug → Mastered**

An applied topic may need:

> **Learn → Explore → Write & Run → Debug → Mastered**

This keeps CodeDo educationally honest, avoids artificial exercises, and creates a framework that can scale from **Kotlin today to many programming languages tomorrow**.

---

# Reference

Initial Kotlin coverage reference:

https://roadmap.sh/pdfs/roadmaps/kotlin.pdf


---

# 📏 Exercise Count Strategy

CodeDo should have **minimum quality guarantees without imposing artificial maximums**.

The number of activities should be determined by the complexity and concept coverage of the topic.

## Core Rule

> **Minimum Required Exercises + Topic-Driven Additional Exercises**

There should be a minimum number of exercises for applicable activity types, but no fixed maximum.

### Recommended minimums

| Activity | Minimum | Maximum |
|---|---:|---:|
| 🔍 Explore Examples | **3** | No fixed maximum |
| 🧠 Predict Output / Behavior | **3** | No fixed maximum |
| 💻 Write & Run | Topic-dependent | No fixed maximum |
| 🐞 Debug Program | Topic-dependent | No fixed maximum |
| ❓ MCQ / Check Understanding | **3** for applicable topics | No fixed maximum |

These are **minimum requirements, not target counts**.

---

## 🧠 Concept Coverage Determines the Actual Count

The key question should not be:

> "How many examples/questions does this topic have?"

Instead:

> **"Have we covered all important concepts, behaviors, variations, and meaningful edge cases of this topic?"**

The exercise count should therefore follow:

```text
Exercise Count =
MAX(Minimum Required, Exercises Needed for Concept Coverage)
```

For example:

```text
Simple topic
→ Minimum = 3
→ Coverage requires 3
→ Create 3

Complex topic
→ Minimum = 3
→ Coverage requires 12
→ Create 12
```

There is **no artificial maximum**.

---

# 🔍 Explore Examples — Coverage Driven

Every applicable topic should have at least **3 examples**.

Beyond that, add as many examples as necessary to build a complete mental model.

Examples should progressively cover:

1. Basic usage
2. Common variations
3. Different contexts
4. Edge cases
5. Real-world usage
6. Interaction with related concepts
7. Common mistakes where useful

### Example: `println()`

A simple topic may need:

```text
3 examples
```

For example:

```kotlin
println("Hello")
println(10)
println("Age: $age")
```

### Example: `when`

A broader topic might need:

```text
8–12 examples
```

Potential coverage:

- Basic `when`
- Multiple conditions
- `else`
- Multiple values
- Ranges
- `when` as an expression
- Type checks
- Nullable values
- Exhaustiveness
- More complex conditions

The exact count is determined by coverage, not by a fixed quota.

---

# 🧠 Predict Output / Behavior — Coverage Driven

Every applicable topic should have at least **3 prediction challenges**.

Beyond the minimum, prediction exercises should cover the important behaviors of the topic.

The goal is:

> **The learner should exercise every important detail that can meaningfully be tested by predicting code behavior.**

### Example: `when`

A minimum of 3 predictions is required, but 3 may not be enough.

Possible coverage:

```text
Basic branch          → 1+
Multiple conditions   → 1+
else                  → 1+
Multiple values       → 1+
Ranges                → 1+
Expression result     → 1+
Type checking         → 1+
Nullable values       → 1+
Exhaustiveness        → 1+
Edge cases            → 1+
```

This could result in 10–15 prediction challenges.

---

# 🎯 Predict Should Test Understanding, Not Counting

Do not define success as:

```text
6 predictions completed
        ↓
Topic complete
```

Instead:

```text
Topic
 ↓
Identify important behaviors
 ↓
Create prediction challenges
 ↓
Track concept coverage
 ↓
Evaluate accuracy
 ↓
Mastery
```

For example:

```text
Null Safety

Knowledge Points
✓ Nullable types
✓ Safe calls
✓ Elvis operator
✓ !!
✓ Null checks
✓ Smart casts
✓ Nullable collections

Prediction Coverage: 100%
Prediction Accuracy: 88%

🏆 Ready for Mastery
```

The number of questions is secondary to whether the learner has exercised the important concepts.

---

# 🔄 Minimum + Adaptive Expansion

The minimum count should act as a baseline.

CodeDo can eventually support adaptive expansion based on learner performance.

Example:

```text
Null Safety
     ↓
Core predictions: 8
     ↓
Learner struggles with `?.`
     ↓
+ 3 targeted `?.` exercises
     ↓
Learner improves
     ↓
Continue
```

Another learner might perform strongly:

```text
Null Safety
     ↓
Core predictions: 8
     ↓
Strong performance
     ↓
No additional exercises
     ↓
Continue
```

This allows CodeDo to eventually personalize practice without changing the underlying curriculum.

---

# ❗ Minimums Apply Only to Applicable Activities

Minimum exercise counts should **not** force activities onto topics where they do not make sense.

For example:

## What is Kotlin?

```text
Learn
  ↓
MCQ ≥ 3
  ↓
Mastered
```

No artificial:

- Predict Output
- Write & Run
- Debug

activities should be created.

## Variables

```text
Learn
  ↓
Explore ≥ 3
  ↓
Predict ≥ 3
  ↓
Write & Run
  ↓
Debug
  ↓
MCQ
  ↓
Mastered
```

## A highly conceptual topic

```text
Learn
  ↓
Explore / Visual Explanation
  ↓
MCQ ≥ 3
  ↓
Mastered
```

---

# 🧩 Final Activity Selection Rule

For every topic:

```text
1. Identify the topic type
2. Identify its knowledge points
3. Select applicable activities
4. Apply minimum exercise requirements
5. Expand exercises until meaningful concept coverage is achieved
6. Evaluate learner performance
7. Add adaptive exercises when useful
8. Mark the topic Mastered when mastery criteria are satisfied
```

This creates a system that is:

- **Consistent** — every applicable topic has a meaningful minimum
- **Flexible** — complex topics can have many more exercises
- **Efficient** — simple topics are not padded unnecessarily
- **Comprehensive** — important details are not skipped
- **Adaptive** — struggling learners can receive targeted practice
- **Language-agnostic** — the same strategy works for Kotlin, Python, Java, JavaScript, C++, Rust, SQL, and future languages

---

# ⭐ Updated CodeDo Principle

> **Minimums provide consistency. Concept coverage determines depth. Learner performance determines additional practice.**

This should replace any fixed rule such as:

> "Every topic must have 5–6 examples and 5–6 prediction questions."

The correct product rule is:

> **Every applicable topic has at least 3 examples/questions, and additional exercises are created as needed to cover the topic completely.**


---


---

# 🔗 Curriculum-to-World Alignment Rule

This is a critical content-quality rule for CodeDo.

> **Every topic introduced in the detailed curriculum must be explicitly assigned to a World.**

The master topic taxonomy and the World structure must never drift apart.

For example, if the detailed curriculum says Kotlin Fundamentals includes:

- What is Kotlin?
- Kotlin syntax
- `main()`
- Comments
- `print()` / `println()`
- `val` vs `var`
- Variables
- Type inference
- `Int`
- `Long`
- `Float`
- `Double`
- `Boolean`
- `Char`
- `String`
- String templates

then **World 1 — Kotlin Awakening must explicitly contain all of them**.

Likewise, if Operators contains:

- Arithmetic operators
- Comparison operators
- Logical operators
- Assignment operators
- Increment / decrement
- Operator precedence

then **World 2 — Operator Forge must explicitly contain all of them**.

### Curriculum Integrity Check

Before finalizing or releasing a curriculum:

1. Extract every topic from the detailed taxonomy.
2. Find its assigned World.
3. Confirm it appears explicitly in the World's topic list.
4. Confirm no important topic exists only in the taxonomy and nowhere in the Worlds.
5. Confirm no World contains vague labels that hide multiple unlisted concepts.
6. Confirm every topic has an appropriate activity strategy.
7. Confirm exercise counts are coverage-driven rather than fixed.
8. Confirm minimum activity counts are respected where the activity applies.
9. Confirm the World Boss tests integration of the World concepts.

This creates a **single source of truth relationship**:

```text
Detailed Curriculum
       ↓
Knowledge Points
       ↓
World Assignment
       ↓
Topic Activities
       ↓
Exercises
       ↓
Mastery Evidence
       ↓
World Boss
```

A curriculum is not considered complete until this chain is traceable.

# 🧭 Master Strategy — Adaptive, Topic-Aware & Language-Agnostic Learning

This section consolidates the product decisions for CodeDo's learning system.

## 1. The Learning Framework Is Flexible

CodeDo has a set of learning activities:

1. 📖 **Learn**
2. 🔍 **Explore Examples**
3. 🧠 **Predict Output / Behavior**
4. 💻 **Write & Run**
5. 🐞 **Debug the Program**
6. ❓ **Check Understanding / MCQ**
7. 🏆 **Mastered** — the outcome

These are **not mandatory steps that every topic must contain**.

The correct principle is:

> **Use the activities that meaningfully prove understanding of the topic.**

Do not force coding activities onto purely theoretical topics.

### Example — "What is Kotlin?"

A learner does not need to write a program or debug code to demonstrate basic understanding of the introduction to Kotlin.

```text
Learn
  ↓
Explore / Explanation
  ↓
MCQ / Check Understanding
  ↓
Mastered
```

### Example — "Variables"

Variables are practical, so a fuller experience is appropriate:

```text
Learn
  ↓
Explore
  ↓
Predict
  ↓
Write & Run
  ↓
Debug
  ↓
MCQ / Check Understanding
  ↓
Mastered
```

### Example — "Recursion"

Recursion requires both behavioral reasoning and implementation:

```text
Learn
  ↓
Explore
  ↓
Predict
  ↓
Write & Run
  ↓
Debug
  ↓
Mastered
```

The exact activity combination is determined by the topic.

---

# 2. Topic Classification

Every topic should be classified so CodeDo can determine which activities make sense.

## 📖 Conceptual

Primarily theoretical or foundational.

Examples:

- What is Kotlin?
- Introduction to Kotlin
- History of Kotlin
- What is a compiler?
- What is an interpreter?
- Programming paradigms
- What is object-oriented programming?

Typical activities:

```text
Learn
Explore / Visual Explanation
MCQ
```

Do not manufacture Predict, Write & Run, or Debug challenges.

---

## 💻 Practical

A topic where the learner needs to use a programming feature.

Examples:

- Variables
- Operators
- Conditions
- Loops
- Functions
- Collections
- Null Safety
- Classes

Typical activities:

```text
Learn
Explore
Predict
Write & Run
Debug
MCQ
```

---

## 🧠 Reasoning

A topic where understanding program behavior is particularly important.

Examples:

- Operator precedence
- Evaluation order
- Scope
- Closures
- Recursion
- Collection transformations

Typical activities:

```text
Learn
Explore
Predict
MCQ
```

Write & Run and Debug are added when they provide meaningful value.

---

## 🛠️ Applied

A topic whose understanding is best demonstrated through implementation.

Examples:

- Extension functions
- Generics
- File handling
- Networking
- APIs
- Coroutines
- Concurrency

Typical activities:

```text
Learn
Explore
Write & Run
Debug
```

Predict and MCQ are optional based on the topic.

---

# 3. No Fixed Maximum for Explore or Predict

CodeDo should **not** use a universal rule such as:

> "Every topic must have 5–6 examples."

or:

> "Every topic must have 5–6 prediction questions."

That creates two problems:

### Problem A — Simple topics become padded

For a tiny topic such as `println()`, six examples may be unnecessary.

### Problem B — Complex topics become artificially shallow

A topic such as `when`, Null Safety, Collections, Coroutines, or Flow may contain many distinct behaviors. Stopping at six exercises could leave important concepts untested.

Therefore:

> **The number of exercises must be determined by topic complexity and concept coverage.**

---

# 4. Minimum Exercise Requirements

Although there should be no fixed maximum, CodeDo should have minimum quality guarantees.

### Recommended minimums

| Activity | Minimum | Maximum |
|---|---:|---:|
| 🔍 Explore Examples | **3** | No fixed maximum |
| 🧠 Predict Output / Behavior | **3** | No fixed maximum |
| ❓ MCQ / Check Understanding | **3** where applicable | No fixed maximum |
| 💻 Write & Run | Topic-dependent | No fixed maximum |
| 🐞 Debug | Topic-dependent | No fixed maximum |

These are **minimums, not target counts**.

The minimum guarantees that an applicable activity is not represented by only one trivial example.

---

# 5. Concept Coverage Determines the Actual Number

The fundamental exercise-count rule is:

```text
Actual Exercise Count =
MAX(Minimum Required, Exercises Needed for Concept Coverage)
```

For example:

```text
Simple topic
Minimum = 3
Coverage requires = 3

→ Create 3
```

But:

```text
Complex topic
Minimum = 3
Coverage requires = 12

→ Create 12
```

There is no artificial maximum.

---

# 6. Explore Is Coverage-Driven

The purpose of Explore is to build the learner's mental model.

Examples should cover meaningful aspects such as:

- Basic usage
- Common variations
- Different contexts
- Edge cases
- Real-world usage
- Interaction with related concepts
- Common mistakes
- Increasing complexity

### Example — `println()`

Potentially:

```text
3 examples
```

because the concept is simple.

### Example — `when`

Potentially:

```text
8–12 examples
```

because the topic may cover:

- Basic `when`
- Multiple branches
- `else`
- Multiple values
- Ranges
- `when` as an expression
- Type checks
- Nullable values
- Exhaustiveness
- More complex conditions

The count should be whatever is required to create a complete understanding.

---

# 7. Predict Output / Behavior Is Also Coverage-Driven

Predict should not be treated as:

> "Answer six questions and move on."

Instead:

> **Exercise every important detail of the topic that can meaningfully be tested through code behavior.**

For each topic, identify its important behaviors and create prediction challenges around them.

### Example — Null Safety

Possible knowledge points:

```text
1. Nullable types
2. Safe calls ?.
3. Elvis operator ?:
4. Non-null assertion !!
5. Null checks
6. Smart casts
7. Nullable collections
```

Prediction coverage might therefore look like:

```text
Nullable types       → 2
Safe calls           → 2
Elvis operator       → 2
!!                   → 1
Null checks          → 2
Smart casts          → 2
Nullable collections → 2

Total = 13
```

The exact distribution is not fixed.

The important requirement is:

> **Every meaningful behavior that can be tested through prediction should receive adequate practice.**

---

# 8. Prediction Should Cover Depth, Not Just Breadth

A single prediction question should not be considered sufficient merely because a concept appeared once.

For important or error-prone behaviors, CodeDo can use multiple variations.

For example:

```text
Topic: Elvis operator

Prediction 1 → Basic nullable value
Prediction 2 → Non-null value
Prediction 3 → Null value
Prediction 4 → Function returning nullable
Prediction 5 → Nested expression
```

This allows the learner to encounter the behavior in different contexts.

---

# 9. Adaptive Expansion

In the future, exercise counts can also respond to learner performance.

Start with a core set:

```text
Core Prediction Set
        ↓
Evaluate performance
        ↓
Strong understanding?
   /             \
 YES             NO
 ↓                ↓
Continue       Add targeted exercises
```

For example:

```text
Null Safety
Core predictions: 8
        ↓
Learner repeatedly misses `?.`
        ↓
Add 3 targeted `?.` predictions
        ↓
Re-evaluate
```

Another learner may demonstrate strong understanding and need no additional exercises.

This creates:

> **Minimum baseline + concept coverage + adaptive practice**

---

# 10. Mastery Is an Outcome, Not a Fixed Screen Sequence

Do not define mastery as:

```text
Complete 6 questions
        ↓
Mastered
```

Instead:

```text
Identify topic
      ↓
Identify knowledge points
      ↓
Select applicable activities
      ↓
Meet minimum requirements
      ↓
Achieve sufficient concept coverage
      ↓
Evaluate learner performance
      ↓
Add targeted practice if necessary
      ↓
🏆 Mastered
```

This means a learner has demonstrated competency rather than simply completed a predetermined number of screens.

---

# 11. Language-Agnostic Product Architecture

This strategy must remain **generic and independent of Kotlin**.

Kotlin is the first language implementation, not the definition of the CodeDo product.

The same learning engine should eventually support:

- Kotlin
- Python
- Java
- JavaScript / TypeScript
- C
- C++
- C#
- Go
- Rust
- Swift
- SQL
- Other future languages

The learning framework remains the same while the curriculum and language-specific content change.

---

# 12. Shared Learning Engine

The future CodeDo architecture should look conceptually like:

```text
                         CodeDo
                           │
                  ┌────────┴────────┐
                  │                 │
           Learning Engine     Language Engine
                  │                 │
       ┌──────────┼──────────┐      ├── Kotlin
       │          │          │      ├── Python
     Learn     Practice   Mastery   ├── Java
     Explore   Evaluate   Progress  ├── JavaScript
     Predict   Adapt      XP        ├── C++
     Write     Debug               └── ...
     MCQ
```

The **Learning Engine** is shared.

The **language-specific content and execution layer** changes per language.

---

# 13. Language-Independent Topic Schema

A topic should conceptually contain:

```text
Topic
├── language
├── level
├── category
├── type
├── knowledgePoints[]
├── activities[]
├── examples[]
├── predictionChallenges[]
├── codingChallenges[]
├── debuggingChallenges[]
├── mcqQuestions[]
└── masteryCriteria
```

For example:

```json
{
  "language": "kotlin",
  "level": "beginner",
  "title": "Variables",
  "type": "practical",
  "knowledgePoints": [
    "val",
    "var",
    "type inference",
    "basic types"
  ],
  "activities": [
    "learn",
    "explore",
    "predict",
    "write_run",
    "debug",
    "mcq"
  ],
  "minimums": {
    "explore": 3,
    "predict": 3
  }
}
```

A conceptual topic could be:

```json
{
  "language": "kotlin",
  "level": "beginner",
  "title": "What is Kotlin?",
  "type": "conceptual",
  "activities": [
    "learn",
    "mcq"
  ],
  "minimums": {
    "mcq": 3
  }
}
```

The same schema can represent:

```text
language = kotlin
language = python
language = java
language = javascript
language = cpp
language = rust
...
```

---

# 14. Generic Language Progression

Every language can use the same broad progression:

```text
LANGUAGE
│
├── 🟢 Beginner
│
├── 🟡 Intermediate
│
└── 🔴 Experienced
```

However, the actual worlds and topics should remain language-specific.

Do not assume every programming language has exactly the same concepts or requires exactly the same number of worlds.

The principle is:

> **Standardize the learning framework, not the curriculum content.**

---

# 15. Final CodeDo Learning Philosophy

CodeDo should teach programming as a skill rather than as information.

The product should optimize for:

> **Understanding → Reasoning → Creation → Debugging → Demonstrated Mastery**

The available activities are:

> 📖 Learn  
> 🔍 Explore  
> 🧠 Predict  
> 💻 Write & Run  
> 🐞 Debug  
> ❓ Check Understanding

But the learner journey is **adaptive**.

A simple conceptual topic may be:

```text
Learn → MCQ → Mastered
```

A practical topic may be:

```text
Learn → Explore → Predict → Write & Run → Debug → Mastered
```

A reasoning topic may be:

```text
Learn → Explore → Predict → MCQ → Mastered
```

An applied topic may be:

```text
Learn → Explore → Write & Run → Debug → Mastered
```

And the number of Explore and Predict exercises should be:

> **At least 3 when applicable, then as many as required for meaningful concept coverage.**

### The final product rule

> **Minimums provide consistency. Concept coverage determines depth. Learner performance determines additional practice. The learning framework stays consistent across programming languages.**
