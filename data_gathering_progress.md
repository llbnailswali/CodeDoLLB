# CodeDo Curriculum Data Gathering & Question Authoring Progress

> **Target Goal**: Complete 90-Day Kotlin Mastery Curriculum (Worlds 1–10) with multi-format interactive challenges (predict-output, bug-hunter, arrange-blocks, multiple-choice, boss fights).

---

## 📊 High-Level Metrics Summary

| Metric | Target | Current Status | Completion % |
| :--- | :--- | :--- | :--- |
| **Curriculum Worlds** | 10 Worlds | 10 Worlds Authored | **100%** |
| **Core Curriculum Lessons** | ~60 Lessons | 57 Lessons + 9 Bosses | **100%** |
| **Curriculum Questions** | 300+ Questions | 294 Questions | **98.0%** |
| **Daily Battle Question Bank** | 50+ Questions | 10 Questions | **20%** |
| **Total Active Bank** | 350+ Questions | **304 Questions** | **86.9%** |
| **Schema Validation** | 100% Passing | 100% Passing (`tsc`, `vite`) | **100%** |

---

## 🗺️ World-by-World Curriculum Status

### ✅ World 1: Kotlin Foundations
- **Status**: Complete (`/src/data/curriculum/world1_foundations.ts`)
- **Total Lessons**: 8
- **Total Questions**: 40
- **Topics Covered**:
  1. `welcome-kotlin`: `fun main()`, standard console output (`print` vs `println`), file extension `.kt`, comments.
  2. `variables`: `val` immutability, `Int` inference, explicit `: Type` annotations, static typing.
  3. `val-vs-var`: Reassignable state vs read-only, mutating counters, immutability best practices.
  4. `data-types`: `Double` 64-bit precision, `Char` single quotes vs `String` double quotes, explicit conversions (`.toLong()`).
  5. `operators`: Integer division truncation (`5 / 2 = 2`), modulo operator (`%`), compound assignments (`+=`).
  6. `strings`: Triple-quoted raw multiline strings (`"""`), `.trimIndent()`, indexing (`text[1]`), escape characters.
  7. `string-templates`: String interpolation (`$var`), complex expressions (`${expression}`), escaping `\$`.
  8. `null-safety`: Nullable types (`Type?`), safe call operator (`?.`), Elvis operator (`?:`), assertion (`!!`).

---

### ✅ World 2: Logic & Branches
- **Status**: Complete (`/src/data/curriculum/world2_logic.ts`)
- **Total Lessons**: 5 + 1 Boss Fight
- **Total Questions**: 26
- **Topics Covered**:
  1. `booleans`: Strict boolean typing (no integer coercion), logical NOT (`!`), assignment-in-condition prevention.
  2. `comparisons`: Structural equality (`==`) vs referential identity (`===`), inequality (`!=`), null equality.
  3. `if-else-expression`: Expression returns, replacing ternary operator, block return semantics, mandatory `else`.
  4. `when-expression`: Pattern matching, comma-separated values, range matching (`in 1..10`), argumentless `when`.
  5. `logical-operators`: Short-circuit evaluation (`&&`, `||`), null-safe guards, De Morgan's laws, operator precedence.
  6. `logic-boss`: **WORLD BOSS: Logic Gatekeeper** — multi-branch security clearance simulation combining range checks, compound logic, and override flags.

---

### ✅ World 3: Loops & Iterations
- **Status**: Complete (`/src/data/curriculum/world3_loops.ts`)
- **Total Lessons**: 5 + 1 Boss Fight
- **Total Questions**: 26
- **Topics Covered**:
  1. `for-loops`: Closed ranges (`..`), array iteration, `withIndex()` destructuring, implicit `val` loop variables.
  2. `while-loops`: Pre-condition `while`, guaranteed execution `do-while`, loop variable progression, standard `repeat()`.
  3. `ranges`: Half-open `until`, descending `downTo`, interval `step`, `CharRange`, empty ascending range traps (`5..1`).
  4. `nested-loops`: 2D Cartesian products, coordinate tracing, grid traversal, variable shadowing in nested loops.
  5. `loop-control`: Immediate termination (`break`), skipping (`continue`), labeled loop jumps (`label@`).
  6. `loop-boss`: **WORLD BOSS: Matrix Navigator** — matrix traversal and compression simulation combining step intervals, continue skips, and labeled breaks.

---

### ✅ World 4: Functions & Modules
- **Status**: Complete (`/src/data/curriculum/world4_functions.ts`)
- **Total Lessons**: 7 + 1 Boss Fight
- **Total Questions**: 36
- **Topics Covered**:
  1. `defining-functions`: `fun` keyword, `Unit` return type singleton, immutable parameter references, top-level functions.
  2. `default-arguments`: Default parameter expressions (`param: Type = value`), eliminating constructor overloads.
  3. `named-arguments`: Call-site readability, parameter reordering, targeting specific defaults, eliminating mystery booleans.
  4. `single-expression`: Concise `= expression` syntax, automatic return type inference, conditional expression bodies.
  5. `vararg-parameters`: Variable arity arguments with `vararg`, array unpacking with the spread operator (`*items`).
  6. `infix-functions`: `infix` modifier, standard library `to` Pair, single-parameter requirement, DSL readability.
  7. `function-overloading`: Signature differentiation by type and count, resolution by literal type, prohibition of return-type-only overloads.
  8. `function-boss`: **WORLD BOSS: Pipeline Architect** — functional data pipeline simulation combining default args, named args, varargs, and infix operations.

---

### ✅ World 5: Classes & Object-Oriented Kotlin
- **Status**: Complete (`/src/data/curriculum/world5_oop.ts`)
- **Total Lessons**: 6 + 1 Boss Fight
- **Total Questions**: 31
- **Topics Covered**:
  1. `classes-properties`: Primary constructors, `val`/`var` property generation, `init` block execution order, secondary constructor delegation (`: this(...)`), and custom getters (`get()`).
  2. `data-classes`: Auto-generated structural `equals()` and `hashCode()`, immutable cloning with `.copy()`, destructuring declarations (`componentN()`), and parameter rules.
  3. `inheritance-interfaces`: `open` modifier requirement (classes `final` by default), dynamic dispatch, concrete interface default bodies, diamond ambiguity resolution (`super<T>`), and mandatory `override`.
  4. `visibility-modifiers`: `public` default, `internal` compilation module scoping, forbidding `protected` on top-level declarations, `private set` encapsulation, and file-scoped `private`.
  5. `objects-singletons`: `object` thread-safe singletons, `companion object` factory pattern and private constructor access, single companion limit, anonymous `object : Interface` expressions, and `companion` keyword.
  6. `sealed-classes`: Restricted closed class hierarchies, compile-time exhaustiveness in `when` expressions without `else`, abstract instantiation prevention, comparison with `enum`, and `sealed interface`.
  7. `oop-boss`: **WORLD BOSS: Object Architect** — enterprise transaction pipeline simulation combining sealed states, data classes, and companion factories.

---

### ✅ World 6: Collections & Functional Kotlin
- **Status**: Complete (`/src/data/curriculum/world6_collections.ts`)
- **Total Lessons**: 6 + 1 Boss Fight
- **Total Questions**: 31
- **Topics Covered**:
  1. `list-set-map`: Read-only (`List<T>`) vs mutable (`MutableList<T>`), set deduplication with `equals()`, map indexing with Elvis operator `?:`, defensive copying via `.toMutableList()`, and `mutableMapOf` manipulation.
  2. `lambdas-it`: Explicit function types `(ParamTypes) -> ReturnType`, implicit single parameter `it`, trailing lambda convention outside parentheses, destructuring parameters in multi-arg lambdas `(k, v) -> ...`, and underscore `_` for unused parameters.
  3. `map-filter-reduce`: Chaining `filter` and `map` pipelines, `fold()` with initial accumulator vs `reduce()` runtime exception on empty collections, `filterNotNull()` smart-casting, and heterogeneous folding.
  4. `collection-operations`: `flatMap` collection concatenation, `groupBy` resulting in `Map<K, List<V>>`, `partition` splitting into `Pair<List<T>, List<T>>`, `associateBy` key collision behavior (last-write-wins), and `zip` collection pairing.
  5. `sequences-lazy`: Lazy evaluation with `Sequence<T>`, element-by-element traversal avoiding intermediate allocations, short-circuiting with terminal operations like `.first()`, converting with `.asSequence()`, and bounding infinite sequences using `.take(n)` and `null` termination.
  6. `scope-functions`: Object configuration with `apply` (context `this`, returns receiver), safe scoping with `?.let` (context `it`, returns lambda result), side-effects with `also` (context `it`, returns receiver), `run` evaluation, and non-extension `with(receiver)`.
  7. `collections-boss`: **WORLD BOSS: Stream Weaver** — multi-stage e-commerce order stream processing with sequences, status filtering, category grouping, and aggregated metrics.

---

### ✅ World 7: Generics & Advanced Type System
- **Status**: Complete (`/src/data/curriculum/world7_generics.ts`)
- **Total Lessons**: 5 + 1 Boss Fight
- **Total Questions**: 26
- **Topics Covered**:
  1. `generics-basics`: Generic functions (`fun <T>`), type parameter syntax, multiple parameters (`<K, V>`), and member access constraints.
  2. `type-constraints`: Upper bounds (`<T : Number>`, `<T : Comparable<T>>`), multiple constraints with `where T : CharSequence, T : Appendable`, and non-nullable `T : Any`.
  3. `variance-in-out`: Invariance by default on mutable types, declaration-site covariance (`out T` producer), contravariance (`in T` consumer), and use-site projection (`Array<out Any>`).
  4. `star-projection`: Star projection (`List<*>`) reading as `Any?`, write prohibition on `MutableList<*>`, and runtime type checking (`is List<*>`) bypassing type erasure.
  5. `reified-types`: JVM type erasure, `inline fun <reified T>`, accessing class literals (`T::class.java`), and `filterIsInstance<T>()`.
  6. `generics-boss`: **WORLD BOSS: Type Alchemist** — type-safe EventBus and Service Locator architecture combining covariance (`out Event`), reified lookup, and upper bounds.

---

### ✅ World 8: Coroutines & Asynchronous Kotlin
- **Status**: Complete (`/src/data/curriculum/world8_coroutines.ts`)
- **Total Lessons**: 5 + 1 Boss Fight
- **Total Questions**: 26
- **Topics Covered**:
  1. `suspend-basics`: Suspending functions (`suspend fun`), non-blocking `delay()` vs blocking `Thread.sleep()`, call context rules, and sequential suspension.
  2. `coroutine-builders`: `launch` (Job) vs `async` (Deferred with `await()`), `runBlocking` bridging main/tests, and accidental sequential await antipatterns.
  3. `dispatchers-context`: `Dispatchers.IO` (blocking I/O), `Dispatchers.Default` (CPU computation), context composition (`+`), switching with `withContext()`, and `CoroutineExceptionHandler`.
  4. `structured-concurrency`: Parent-child coroutine hierarchy, cancellation propagation, cooperative cancellation (`isActive`), `CancellationException`, and `withContext(NonCancellable)` cleanup.
  5. `flow-reactive`: Cold streams with `flow { emit() }`, intermediate operators (`filter`, `map`), context preservation with `flowOn`, `StateFlow` vs `SharedFlow`, and `.catch` error recovery.
  6. `coroutines-boss`: **WORLD BOSS: Async Overlord** — resilient real-time trading pipeline combining parallel `async` fetches, dispatcher switches, Flow stream processing, and fallback error handling.

---

### ✅ World 9: Android & Jetpack Compose Fundamentals
- **Status**: Complete (`/src/data/curriculum/world9_compose.ts`)
- **Total Lessons**: 5 + 1 Boss Fight
- **Total Questions**: 26
- **Topics Covered**:
  1. `compose-basics`: Composable functions (`@Composable`), declarative UI paradigm (`UI = f(state)`), recomposition skipping, Composable calling context rule, and `setContent` entry point.
  2. `compose-state`: Reactive state with `remember` & `mutableStateOf`, `rememberSaveable` for configuration changes/process death, State Hoisting & Unidirectional Data Flow (UDF), lifecycle-aware flow collection with `collectAsStateWithLifecycle`, and observable collection state gotchas.
  3. `compose-layouts`: Standard layouts (`Row`, `Column`, `Box`), modifier execution order, proportional spacing with `Modifier.weight()`, cross-axis alignment vs main-axis arrangement, and clipping touch bounds (`.clip` before `.clickable`).
  4. `compose-lazy`: Virtualized scrolling with `LazyColumn`, stable identity keys with `items(key = ...)`, sticky category headers with `stickyHeader`, programmatic scrolling with `LazyListState.animateScrollToItem()`, and viewport insets with `contentPadding`.
  5. `compose-effects`: Suspending composition lifecycles with `LaunchedEffect`, one-time run with `LaunchedEffect(Unit)`, UI callback coroutines with `rememberCoroutineScope()`, cleanup with `DisposableEffect` + `onDispose`, and post-composition state publication with `SideEffect`.
  6. `compose-boss`: **WORLD BOSS: Compose Architect** — Enterprise social feed diagnosis fixing un-remembered state, missing lazy list keys, and improper coroutines in composable body.

---

### ✅ World 10: Real-World Architecture & Clean Code
- **Status**: Complete (`/src/data/curriculum/world10_architecture.ts`)
- **Total Lessons**: 5 + 1 Final Grandmaster Capstone Boss
- **Total Questions**: 26
- **Topics Covered**:
  1. `arch-mvvm`: Modern MVVM separation of concerns, modeling UI State with sealed interfaces to eliminate impossible states, backing property encapsulation (`_uiState.asStateFlow()`), `viewModelScope` lifecycle, and Clean Architecture Dependency Rule (domain purity).
  2. `arch-repository`: Offline-first Single Source of Truth (SSOT), Room database observation with Flow, error-resilient network caching, repository interface contracts for test fakes, atomic multi-table synchronization via `withTransaction`, and DTO to domain model mapping.
  3. `arch-result`: Kotlin standard `Result<T>`, functional transformation with `fold` and `getOrElse`, coroutine cancellation protection (never swallow `CancellationException`), and typed domain-specific error hierarchies with sealed interfaces.
  4. `arch-di`: Inversion of Control with constructor injection, lazy dependency containers with `by lazy`, Interface Segregation Principle (ISP), scoping rules (transient factory vs singleton), and preventing Android Context memory leaks in singletons.
  5. `arch-idioms`: `@JvmInline value class` domain typing with zero heap allocations, class delegation with `by` decorator pattern, sealed interfaces with exhaustiveness, and type-safe DSL builders with `@DslMarker`.
  6. `arch-boss`: **FINAL WORLD BOSS: Grandmaster Capstone** — Enterprise FinTech transfer engine combining offline-first repository synchronization, Result monad handling, and ViewModel UI state.

---

## 🏆 90-Day Curriculum Milestone: Complete!

All 10 curriculum worlds (Worlds 1 through 10) have been successfully authored, validated, and integrated into the CodeDo master curriculum!

---

## 🛠️ Question Format Distribution (Current 138 Questions)

| Question Type | Count | Share |
| :--- | :--- | :--- |
| **Output Prediction** (`predict-output`) | 58 | 42.0% |
| **Fill in the Blank** (`fill-blank`) | 28 | 20.3% |
| **Bug Hunter / Error Identifier** (`bug-hunter`) | 24 | 17.4% |
| **Multiple Choice Concept** (`multiple-choice`) | 18 | 13.0% |
| **Code Order / Reorder Blocks** (`arrange-blocks`) | 7 | 5.1% |
| **Multi-Stage Boss Simulation** (`boss-fight`) | 3 | 2.2% |

---

## ✨ Quality & UX Verification Checklist

- [x] **No Duplicate Questions**: Every question has a distinct learning objective and unique code snippet.
- [x] **Verified Kotlin Output**: Snippets are strictly conforming to Kotlin 1.9+ / Kotlin 2.0 language specifications.
- [x] **Comprehensive Explanations**: Every question includes a multi-paragraph `explanation` detailing the exact compiler reasoning.
- [x] **Mobile-First Code Snippets**: Snippets are formatted with concise line lengths (under 45 characters) for optimal mobile phone readability.
- [x] **Consistent XP Rewards**: Regular lessons award 20–25 XP; World Boss challenges award 50 XP.
- [x] **Vite & TypeScript Compilation**: 100% clean builds with zero lint errors.
