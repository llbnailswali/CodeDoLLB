import { LessonQuestion, WorldMeta } from '../../types';
import { WORLD_1_QUESTIONS } from './world1_foundations';
import { WORLD_2_QUESTIONS } from './world2_logic';
import { WORLD_3_QUESTIONS } from './world3_loops';
import { WORLD_4_QUESTIONS } from './world4_functions';
import { WORLD_5_QUESTIONS } from './world5_oop';
import { WORLD_6_QUESTIONS } from './world6_collections';
import { WORLD_7_QUESTIONS } from './world7_generics';
import { WORLD_8_QUESTIONS } from './world8_coroutines';
import { WORLD_9_QUESTIONS } from './world9_compose';
import { WORLD_10_QUESTIONS } from './world10_architecture';
import { DAILY_BATTLE_POOL } from './dailyBattleBank';

export { WORLD_1_QUESTIONS } from './world1_foundations';
export { WORLD_2_QUESTIONS } from './world2_logic';
export { WORLD_3_QUESTIONS } from './world3_loops';
export { WORLD_4_QUESTIONS } from './world4_functions';
export { WORLD_5_QUESTIONS } from './world5_oop';
export { WORLD_6_QUESTIONS } from './world6_collections';
export { WORLD_7_QUESTIONS } from './world7_generics';
export { WORLD_8_QUESTIONS } from './world8_coroutines';
export { WORLD_9_QUESTIONS } from './world9_compose';
export { WORLD_10_QUESTIONS } from './world10_architecture';
export { DAILY_BATTLE_POOL } from './dailyBattleBank';

// Master combined pool of all curriculum questions
export const ALL_CURRICULUM_QUESTIONS: LessonQuestion[] = [
  ...WORLD_1_QUESTIONS,
  ...WORLD_2_QUESTIONS,
  ...WORLD_3_QUESTIONS,
  ...WORLD_4_QUESTIONS,
  ...WORLD_5_QUESTIONS,
  ...WORLD_6_QUESTIONS,
  ...WORLD_7_QUESTIONS,
  ...WORLD_8_QUESTIONS,
  ...WORLD_9_QUESTIONS,
  ...WORLD_10_QUESTIONS
];

// World Meta Catalog (Authoritative 90-Day Curriculum Structure)
export const WORLDS_CATALOG: WorldMeta[] = [
  {
    id: 'world-1',
    title: 'Kotlin Foundations',
    subtitle: 'Variables, Immutability, Math & Null Safety',
    badge: 'FOUNDATIONS',
    color: '#3748dd',
    order: 1,
    lessons: [
      {
        id: 'welcome-kotlin',
        title: 'Welcome to Kotlin',
        worldId: 'world-1',
        skill: 'syntax',
        durationMinutes: 3,
        xpReward: 20,
        description: 'The main() entry point, standard console output, and Kotlin syntax fundamentals.',
        questionsCount: 5
      },
      {
        id: 'variables',
        title: 'Variables & Inference',
        worldId: 'world-1',
        skill: 'variables',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Read-only references, type annotations, and static typing guarantees.',
        questionsCount: 5
      },
      {
        id: 'val-vs-var',
        title: 'val vs var Decisions',
        worldId: 'world-1',
        skill: 'variables',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Mastering mutability: when to reassign state and why immutability rules.',
        questionsCount: 5
      },
      {
        id: 'data-types',
        title: 'Core Data Types',
        worldId: 'world-1',
        skill: 'data-types',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Int, Double, Boolean, Char vs String, and explicit type conversion.',
        questionsCount: 5
      },
      {
        id: 'operators',
        title: 'Operators & Arithmetic',
        worldId: 'world-1',
        skill: 'operators',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Integer division truncation, modulo remainder, compound assignments, and precedence.',
        questionsCount: 5
      },
      {
        id: 'strings',
        title: 'Strings & Raw Literals',
        worldId: 'world-1',
        skill: 'strings',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Multiline triple-quoted strings, trimIndent(), character indexing, and escaping.',
        questionsCount: 5
      },
      {
        id: 'string-templates',
        title: 'String Templates',
        worldId: 'world-1',
        skill: 'strings',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Interpolation with $variable, complex expressions with ${}, and property access.',
        questionsCount: 5
      },
      {
        id: 'null-safety',
        title: 'Null Safety & Elvis',
        worldId: 'world-1',
        skill: 'null-safety',
        durationMinutes: 5,
        xpReward: 30,
        description: 'Nullable types (Type?), safe calls (?.), Elvis operator (?:), and not-null assertions (!!).',
        questionsCount: 5
      }
    ]
  },
  {
    id: 'world-2',
    title: 'Logic & Branches',
    subtitle: 'Booleans, if-else expressions, when matching & Logic Boss',
    badge: 'LOGIC',
    color: '#8b5cf6',
    order: 2,
    lessons: [
      {
        id: 'booleans',
        title: 'Boolean Values & Truth',
        worldId: 'world-2',
        skill: 'booleans',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Strict type safety, logical negation (!), and avoiding assignment bugs.',
        questionsCount: 5
      },
      {
        id: 'comparisons',
        title: 'Comparisons & Equality',
        worldId: 'world-2',
        skill: 'comparisons',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Structural equality (==) vs referential identity (===), relational operators, and null safety.',
        questionsCount: 5
      },
      {
        id: 'if-else-expression',
        title: 'if as an Expression',
        worldId: 'world-2',
        skill: 'conditionals',
        durationMinutes: 3,
        xpReward: 25,
        description: 'Returning values from if/else, block last expressions, and ternary elimination.',
        questionsCount: 5
      },
      {
        id: 'when-expression',
        title: 'when Matching Engine',
        worldId: 'world-2',
        skill: 'when',
        durationMinutes: 4,
        xpReward: 30,
        description: 'Expressive branch matching, comma groups, ranges in when, and argumentless conditions.',
        questionsCount: 5
      },
      {
        id: 'logical-operators',
        title: 'Logical Operators (&&, ||)',
        worldId: 'world-2',
        skill: 'logical_operators',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Short-circuit evaluation, null guards with &&, and De Morgan\'s laws.',
        questionsCount: 5
      },
      {
        id: 'logic-boss',
        title: 'WORLD BOSS: Logic Gatekeeper',
        worldId: 'world-2',
        skill: 'logic-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Conquer the multi-branch logic matrix challenge to unlock World 3!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-3',
    title: 'Loops & Iterations',
    subtitle: 'for loops, while, ranges, step & Loop Boss',
    badge: 'LOOPS',
    color: '#10b981',
    order: 3,
    lessons: [
      {
        id: 'for-loops',
        title: 'for Loops & Iteration',
        worldId: 'world-3',
        skill: 'for_loops',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Collection iteration, withIndex() destructuring, and implicit val loop variables.',
        questionsCount: 5
      },
      {
        id: 'while-loops',
        title: 'while & do-while Loops',
        worldId: 'world-3',
        skill: 'while_loops',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Pre-condition while, guaranteed execution with do-while, and infinite loop safeguards.',
        questionsCount: 5
      },
      {
        id: 'ranges',
        title: 'Ranges (until, downTo, step)',
        worldId: 'world-3',
        skill: 'ranges',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Closed ranges (..), half-open (until), descending progressions (downTo), and interval steps.',
        questionsCount: 5
      },
      {
        id: 'nested-loops',
        title: 'Nested Loops & Grids',
        worldId: 'world-3',
        skill: 'nested_loops',
        durationMinutes: 4,
        xpReward: 25,
        description: '2D coordinates, Cartesian products, avoiding shadowing bugs, and dependent inner ranges.',
        questionsCount: 5
      },
      {
        id: 'loop-control',
        title: 'Loop Control (break & Labels)',
        worldId: 'world-3',
        skill: 'loop_control',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Immediate termination with break, skipping with continue, and jumping with label@.',
        questionsCount: 5
      },
      {
        id: 'loop-boss',
        title: 'WORLD BOSS: Matrix Navigator',
        worldId: 'world-3',
        skill: 'loop-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Solve the matrix compression algorithm with custom skip controls!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-4',
    title: 'Functions & Modules',
    subtitle: 'Parameters, Defaults, Named Args, Single-Expressions, Vararg & Infix',
    badge: 'FUNCTIONS',
    color: '#06b6d4',
    order: 4,
    lessons: [
      {
        id: 'defining-functions',
        title: 'Defining Functions & Unit',
        worldId: 'world-4',
        skill: 'functions',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Function syntax, Unit return type, immutable parameters, and top-level functions.',
        questionsCount: 5
      },
      {
        id: 'default-arguments',
        title: 'Default Arguments',
        worldId: 'world-4',
        skill: 'default_arguments',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Eliminating overload boilerplate with default values and dependent expressions.',
        questionsCount: 5
      },
      {
        id: 'named-arguments',
        title: 'Named Arguments',
        worldId: 'world-4',
        skill: 'named_arguments',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Readable call sites, reordering parameters, and eliminating mystery booleans.',
        questionsCount: 5
      },
      {
        id: 'single-expression',
        title: 'Single-Expression Functions',
        worldId: 'world-4',
        skill: 'single_expression',
        durationMinutes: 3,
        xpReward: 20,
        description: 'Concise = syntax, automatic return type inference, and idiomatic conditional bodies.',
        questionsCount: 5
      },
      {
        id: 'vararg-parameters',
        title: 'Vararg & Spread Operator (*)',
        worldId: 'world-4',
        skill: 'vararg',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Variable arity arguments, array unpacking with the spread operator (*), and position rules.',
        questionsCount: 5
      },
      {
        id: 'infix-functions',
        title: 'Infix Notation Functions',
        worldId: 'world-4',
        skill: 'infix',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Creating natural, readable DSL expressions with the infix keyword modifier.',
        questionsCount: 5
      },
      {
        id: 'function-overloading',
        title: 'Function Overloading',
        worldId: 'world-4',
        skill: 'overloading',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Differentiating by parameter types and count, resolving resolution ambiguities.',
        questionsCount: 5
      },
      {
        id: 'function-boss',
        title: 'WORLD BOSS: Pipeline Architect',
        worldId: 'world-4',
        skill: 'function-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Trace and execute a functional pipeline combining defaults, named args, varargs, and infix operations!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-5',
    title: 'Classes & Object-Oriented Kotlin',
    subtitle: 'Properties, Data Classes, Inheritance, Modifiers, Objects & Sealed Types',
    badge: 'OOP',
    color: '#ec4899',
    order: 5,
    lessons: [
      {
        id: 'classes-properties',
        title: 'Classes, Properties & Init',
        worldId: 'world-5',
        skill: 'classes',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Primary constructors, val/var properties, init block order, and custom getters.',
        questionsCount: 5
      },
      {
        id: 'data-classes',
        title: 'Data Classes & Copy',
        worldId: 'world-5',
        skill: 'data_classes',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Auto-generated equals/hashCode, toString, copy() overrides, and destructuring declarations.',
        questionsCount: 5
      },
      {
        id: 'inheritance-interfaces',
        title: 'Inheritance & Interfaces',
        worldId: 'world-5',
        skill: 'inheritance',
        durationMinutes: 4,
        xpReward: 25,
        description: 'open classes and methods, mandatory override keyword, interface defaults, and super<T> disambiguation.',
        questionsCount: 5
      },
      {
        id: 'visibility-modifiers',
        title: 'Visibility Modifiers',
        worldId: 'world-5',
        skill: 'visibility',
        durationMinutes: 3,
        xpReward: 20,
        description: 'public default, internal module-level access, private file-scoping, and private setters.',
        questionsCount: 5
      },
      {
        id: 'objects-singletons',
        title: 'Objects & Singletons',
        worldId: 'world-5',
        skill: 'objects',
        durationMinutes: 4,
        xpReward: 25,
        description: 'object singletons, companion object factory methods, and anonymous object expressions.',
        questionsCount: 5
      },
      {
        id: 'sealed-classes',
        title: 'Sealed Classes & Interfaces',
        worldId: 'world-5',
        skill: 'sealed_classes',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Restricted class hierarchies, compile-time exhaustiveness, and smart casting in when.',
        questionsCount: 5
      },
      {
        id: 'oop-boss',
        title: 'WORLD BOSS: Object Architect',
        worldId: 'world-5',
        skill: 'oop-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Trace an enterprise transaction pipeline combining sealed states, data classes, and companion factories!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-6',
    title: 'Collections & Functional Kotlin',
    subtitle: 'Lists, Sets, Maps, Lambdas, Transforms, Sequences & Scope Functions',
    badge: 'COLLECTIONS',
    color: '#10b981',
    order: 6,
    lessons: [
      {
        id: 'list-set-map',
        title: 'List, Set & Map Fundamentals',
        worldId: 'world-6',
        skill: 'collections',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Read-only vs mutable collections, set deduplication, map indexing with Elvis, and defensive copying.',
        questionsCount: 5
      },
      {
        id: 'lambdas-it',
        title: 'Lambdas & Trailing Syntax',
        worldId: 'world-6',
        skill: 'lambdas',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Function types, implicit it parameter, trailing lambda conventions, and destructuring lambda arguments.',
        questionsCount: 5
      },
      {
        id: 'map-filter-reduce',
        title: 'Transformations: Map, Filter & Fold',
        worldId: 'world-6',
        skill: 'transforms',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Chained pipelines, fold vs reduce, safe empty collection handling, and filterNotNull.',
        questionsCount: 5
      },
      {
        id: 'collection-operations',
        title: 'Advanced Operations & Grouping',
        worldId: 'world-6',
        skill: 'collection_ops',
        durationMinutes: 4,
        xpReward: 25,
        description: 'flatMap flattening, groupBy categorization, partition splitting, and associateBy collisions.',
        questionsCount: 5
      },
      {
        id: 'sequences-lazy',
        title: 'Sequences & Lazy Evaluation',
        worldId: 'world-6',
        skill: 'sequences',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Iterable vs Sequence, intermediate vs terminal operations, short-circuiting, and generateSequence.',
        questionsCount: 5
      },
      {
        id: 'scope-functions',
        title: 'Scope Functions: let, apply, run & also',
        worldId: 'world-6',
        skill: 'scope_functions',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Context objects (this vs it), return values, configuration with apply, and safe execution with let.',
        questionsCount: 5
      },
      {
        id: 'collections-boss',
        title: 'WORLD BOSS: Stream Weaver',
        worldId: 'world-6',
        skill: 'collections-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Trace an end-to-end telemetry analytics pipeline combining sequences, filters, groupings, and aggregations!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-7',
    title: 'Generics & Advanced Type System',
    subtitle: 'Type Parameters, Bounds, Variance (in/out), Star Projections & Reified Inlines',
    badge: 'GENERICS',
    color: '#8b5cf6',
    order: 7,
    lessons: [
      {
        id: 'generics-basics',
        title: 'Generic Functions & Classes',
        worldId: 'world-7',
        skill: 'generics',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Type parameter declarations, multiple parameters <K, V>, and member access constraints.',
        questionsCount: 5
      },
      {
        id: 'type-constraints',
        title: 'Upper Bounds & Type Constraints',
        worldId: 'world-7',
        skill: 'constraints',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Number and Comparable bounds, multiple bounds with where clauses, and non-nullable T : Any.',
        questionsCount: 5
      },
      {
        id: 'variance-in-out',
        title: 'Variance: in, out & Invariance',
        worldId: 'world-7',
        skill: 'variance',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Declaration-site covariance (out T), contravariance (in T), invariance rules, and type projection.',
        questionsCount: 5
      },
      {
        id: 'star-projection',
        title: 'Star Projections (List<*>)',
        worldId: 'world-7',
        skill: 'star_projection',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Safe reads with Any?, write prevention, type checks with is, and comparison to Java raw types.',
        questionsCount: 5
      },
      {
        id: 'reified-types',
        title: 'Reified Type Parameters & Inlines',
        worldId: 'world-7',
        skill: 'reified',
        durationMinutes: 4,
        xpReward: 25,
        description: 'JVM type erasure, inline fun <reified T>, T::class.java reflection, and filterIsInstance.',
        questionsCount: 5
      },
      {
        id: 'generics-boss',
        title: 'WORLD BOSS: Type Alchemist',
        worldId: 'world-7',
        skill: 'generics-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Master a type-safe Dependency Injection and Event Bus container combining covariance, reified lookups, and upper bounds!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-8',
    title: 'Coroutines & Asynchronous Kotlin',
    subtitle: 'Suspending Functions, Builders (launch/async), Dispatchers, Structured Concurrency & Flow',
    badge: 'COROUTINES',
    color: '#0284c7',
    order: 8,
    lessons: [
      {
        id: 'suspend-basics',
        title: 'Suspending Functions & Suspension',
        worldId: 'world-8',
        skill: 'suspend',
        durationMinutes: 4,
        xpReward: 25,
        description: 'suspend modifier, non-blocking delay vs Thread.sleep, and sequential suspension semantics.',
        questionsCount: 5
      },
      {
        id: 'coroutine-builders',
        title: 'Builders: launch, async & runBlocking',
        worldId: 'world-8',
        skill: 'builders',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Job lifecycle with launch, Deferred<T> with async.await(), and runBlocking bridge.',
        questionsCount: 5
      },
      {
        id: 'dispatchers-context',
        title: 'Dispatchers & CoroutineContext',
        worldId: 'world-8',
        skill: 'dispatchers',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Dispatchers.IO, Dispatchers.Default, context composition with +, and switching with withContext.',
        questionsCount: 5
      },
      {
        id: 'structured-concurrency',
        title: 'Structured Concurrency & Cancellation',
        worldId: 'world-8',
        skill: 'structured_concurrency',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Parent-child hierarchies, cooperative cancellation, isActive checks, and NonCancellable cleanup.',
        questionsCount: 5
      },
      {
        id: 'flow-reactive',
        title: 'Flows: Reactive Streams & Channels',
        worldId: 'world-8',
        skill: 'flow',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Cold streams with flow { emit() }, intermediate transformations, flowOn, and StateFlow vs SharedFlow.',
        questionsCount: 5
      },
      {
        id: 'coroutines-boss',
        title: 'WORLD BOSS: Async Overlord',
        worldId: 'world-8',
        skill: 'coroutines-boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Orchestrate a concurrent trading pipeline using parallel async, Flow streams, and structured error recovery!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-9',
    title: 'Android & Jetpack Compose Fundamentals',
    subtitle: '@Composable Functions, State & Recomposition, Layouts & Modifiers, Lazy Lists & Side Effects',
    badge: 'COMPOSE',
    color: '#059669',
    order: 9,
    lessons: [
      {
        id: 'compose-basics',
        title: 'Composable Functions & UI Tree',
        worldId: 'world-9',
        skill: 'compose_basics',
        durationMinutes: 4,
        xpReward: 25,
        description: '@Composable annotation, declarative UI paradigm, recomposition skipping, and setContent.',
        questionsCount: 5
      },
      {
        id: 'compose-state',
        title: 'State in Compose & State Hoisting',
        worldId: 'world-9',
        skill: 'compose_state',
        durationMinutes: 4,
        xpReward: 25,
        description: 'remember, mutableStateOf, rememberSaveable, state hoisting, and unidirectional data flow (UDF).',
        questionsCount: 5
      },
      {
        id: 'compose-layouts',
        title: 'Layouts & Modifiers',
        worldId: 'world-9',
        skill: 'compose_layouts',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Row, Column, Box, Modifier chaining order, weight distribution, and clipping touch bounds.',
        questionsCount: 5
      },
      {
        id: 'compose-lazy',
        title: 'Lazy Lists & High-Performance Scrolling',
        worldId: 'world-9',
        skill: 'compose_lazy',
        durationMinutes: 4,
        xpReward: 25,
        description: 'LazyColumn virtualization, stable item keys, stickyHeader, LazyListState, and contentPadding.',
        questionsCount: 5
      },
      {
        id: 'compose-effects',
        title: 'Side Effects & Coroutines in Compose',
        worldId: 'world-9',
        skill: 'compose_effects',
        durationMinutes: 4,
        xpReward: 25,
        description: 'LaunchedEffect lifecycle, rememberCoroutineScope for callbacks, DisposableEffect cleanup, and SideEffect.',
        questionsCount: 5
      },
      {
        id: 'compose-boss',
        title: 'WORLD BOSS: Compose Architect',
        worldId: 'world-9',
        skill: 'compose_boss',
        durationMinutes: 5,
        xpReward: 50,
        description: 'Diagnose and architect an enterprise social feed fixing state retention, lazy list keys, and side effects!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-10',
    title: 'Real-World Architecture & Clean Code',
    subtitle: 'MVVM & Clean Architecture, Offline-First Repositories, Result Monads, DI, & Kotlin Idioms',
    badge: 'GRANDMASTER',
    color: '#D97706',
    order: 10,
    lessons: [
      {
        id: 'arch-mvvm',
        title: 'Clean Architecture & Modern MVVM',
        worldId: 'world-10',
        skill: 'clean_architecture',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Separation of concerns, sealed UI state interfaces, backing property encapsulation, and viewModelScope.',
        questionsCount: 5
      },
      {
        id: 'arch-repository',
        title: 'Repository Pattern & Offline-First Data',
        worldId: 'world-10',
        skill: 'offline_first',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Single Source of Truth, Room database reactive observation, atomic sync with withTransaction, and DTO mapping.',
        questionsCount: 5
      },
      {
        id: 'arch-result',
        title: 'Result Monad & Functional Error Handling',
        worldId: 'world-10',
        skill: 'result_monad',
        durationMinutes: 4,
        xpReward: 25,
        description: 'runCatching, fold, getOrElse, CancellationException coroutine safety, and typed domain error hierarchies.',
        questionsCount: 5
      },
      {
        id: 'arch-di',
        title: 'Dependency Injection & Modularity',
        worldId: 'world-10',
        skill: 'dependency_injection',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Constructor injection, Inversion of Control, lazy initialization, Interface Segregation, and Context leak prevention.',
        questionsCount: 5
      },
      {
        id: 'arch-idioms',
        title: 'Modern Kotlin Idioms & Best Practices',
        worldId: 'world-10',
        skill: 'kotlin_idioms',
        durationMinutes: 4,
        xpReward: 25,
        description: '@JvmInline value classes, class delegation with by, sealed interfaces, and type-safe DSL builders.',
        questionsCount: 5
      },
      {
        id: 'arch-boss',
        title: 'FINAL WORLD BOSS: Grandmaster Capstone',
        worldId: 'world-10',
        skill: 'grandmaster_capstone',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Enterprise FinTech Transfer Engine combining offline-first repositories, Result monads, and ViewModel UI State!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-11',
    title: 'Networking & Serialization',
    subtitle: 'Ktor Client, Kotlinx Serialization & RESTful APIs',
    badge: 'NETWORKING',
    color: '#0284c7',
    order: 11,
    lessons: [
      {
        id: 'net-ktor-client',
        title: 'HTTP Requests with Ktor Client',
        worldId: 'world-11',
        skill: 'networking',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Creating HttpClient engines, GET/POST requests, headers, and request configuration.',
        questionsCount: 5
      },
      {
        id: 'net-kotlinx-serialization',
        title: 'JSON Serialization with @Serializable',
        worldId: 'world-11',
        skill: 'serialization',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Decoding API JSON into typed data classes, custom serializers, and polymorphic models.',
        questionsCount: 5
      },
      {
        id: 'net-error-handling',
        title: 'Network Resilience & Timeout Handling',
        worldId: 'world-11',
        skill: 'networking_resilience',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Exponential backoff retries, connection timeouts, HTTP status code interceptors, and offline fallbacks.',
        questionsCount: 5
      },
      {
        id: 'net-boss',
        title: 'WORLD BOSS: API Gateway Champion',
        worldId: 'world-11',
        skill: 'api_gateway',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Build a production-grade resilient network client that gracefully handles token refreshes and network dropouts.',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-12',
    title: 'Local Persistence & Room',
    subtitle: 'Entities, DAOs, Migrations & Reactive Flow',
    badge: 'PERSISTENCE',
    color: '#059669',
    order: 12,
    lessons: [
      {
        id: 'room-entities',
        title: 'Room Entities & Database Schemas',
        worldId: 'world-12',
        skill: 'database_entities',
        durationMinutes: 4,
        xpReward: 25,
        description: '@Entity, @PrimaryKey auto-generation, foreign key relations, and @ColumnInfo indexing.',
        questionsCount: 5
      },
      {
        id: 'room-daos',
        title: 'DAOs & Reactive Flow Queries',
        worldId: 'world-12',
        skill: 'data_access_objects',
        durationMinutes: 4,
        xpReward: 25,
        description: '@Insert, @Update, @Query with Flow<List<T>> continuous emission, and transaction boundaries.',
        questionsCount: 5
      },
      {
        id: 'room-migrations',
        title: 'TypeConverters & Database Migrations',
        worldId: 'world-12',
        skill: 'migrations',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Custom object serializers with @TypeConverter and executing destructive-free schema migrations.',
        questionsCount: 5
      },
      {
        id: 'room-boss',
        title: 'WORLD BOSS: Persistence Architect',
        worldId: 'world-12',
        skill: 'persistence_architect',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Construct a synchronized offline cache that emits live database updates into Jetpack Compose screens.',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-13',
    title: 'Dependency Injection',
    subtitle: 'Hilt, Koin & Decoupled Modular Architecture',
    badge: 'INJECTION',
    color: '#d97706',
    order: 13,
    lessons: [
      {
        id: 'di-hilt-basics',
        title: 'Hilt Fundamentals & @Inject',
        worldId: 'world-13',
        skill: 'hilt_injection',
        durationMinutes: 4,
        xpReward: 25,
        description: '@HiltAndroidApp, constructor injection with @Inject, and injecting ViewModels into Composable screens.',
        questionsCount: 5
      },
      {
        id: 'di-modules',
        title: 'Hilt Modules: @Provides & @Binds',
        worldId: 'world-13',
        skill: 'hilt_modules',
        durationMinutes: 4,
        xpReward: 25,
        description: '@InstallIn(SingletonComponent::class), interface implementations, and third-party library provider modules.',
        questionsCount: 5
      },
      {
        id: 'di-koin',
        title: 'Lightweight DI with Koin DSL',
        worldId: 'world-13',
        skill: 'koin_dsl',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Singletons, factories, viewModel definitions in pure Kotlin DSL without code generation overhead.',
        questionsCount: 5
      },
      {
        id: 'di-boss',
        title: 'WORLD BOSS: Inversion of Control Sentinel',
        worldId: 'world-13',
        skill: 'ioc_mastery',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Design a clean multi-module dependency graph with swapped mock bindings for seamless integration testing.',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-14',
    title: 'Testing & Quality Assurance',
    subtitle: 'Unit Testing, MockK, Turbine & Compose UI Tests',
    badge: 'TESTING',
    color: '#e11d48',
    order: 14,
    lessons: [
      {
        id: 'test-unit-mockk',
        title: 'Unit Testing with JUnit5 & MockK',
        worldId: 'world-14',
        skill: 'unit_testing',
        durationMinutes: 4,
        xpReward: 25,
        description: 'coEvery coroutine mocking, verify assertions, test dispatchers, and test fixture setup.',
        questionsCount: 5
      },
      {
        id: 'test-turbine-flow',
        title: 'Turbine: Testing Kotlin Flows',
        worldId: 'world-14',
        skill: 'flow_testing',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Testing hot and cold flows with test.awaitItem(), awaitComplete(), and timing validation.',
        questionsCount: 5
      },
      {
        id: 'test-compose-ui',
        title: 'Jetpack Compose UI Testing',
        worldId: 'world-14',
        skill: 'compose_testing',
        durationMinutes: 4,
        xpReward: 25,
        description: 'createComposeRule(), semantic matchers (onNodeWithText, onNodeWithTag), and click/scroll interactions.',
        questionsCount: 5
      },
      {
        id: 'test-boss',
        title: 'WORLD BOSS: Reliability Overlord',
        worldId: 'world-14',
        skill: 'qa_overlord',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Achieve 100% test coverage on a complex asynchronous ViewModel flow with error edge-cases.',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-15',
    title: 'Kotlin Multiplatform (KMP)',
    subtitle: 'Shared Business Logic, expect/actual & Cross-Platform',
    badge: 'MULTIPLATFORM',
    color: '#8b5cf6',
    order: 15,
    lessons: [
      {
        id: 'kmp-architecture',
        title: 'KMP Architecture & Project Structure',
        worldId: 'world-15',
        skill: 'kmp_structure',
        durationMinutes: 4,
        xpReward: 25,
        description: 'commonMain, androidMain, iosMain source sets, and sharing data models across mobile ecosystems.',
        questionsCount: 5
      },
      {
        id: 'kmp-expect-actual',
        title: 'Platform Interop with expect/actual',
        worldId: 'world-15',
        skill: 'expect_actual',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Bridging platform-specific APIs (UUID, KeyValue storage, device info) with native platform implementations.',
        questionsCount: 5
      },
      {
        id: 'kmp-compose-multiplatform',
        title: 'Compose Multiplatform across Android & iOS',
        worldId: 'world-15',
        skill: 'compose_multiplatform',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Sharing 100% declarative UI code between Android and iOS using Skiko rendering.',
        questionsCount: 5
      },
      {
        id: 'kmp-boss',
        title: 'WORLD BOSS: Cross-Platform Titan',
        worldId: 'world-15',
        skill: 'kmp_titan',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Implement a cross-platform currency converter running identical UI and business logic on Android and iOS.',
        questionsCount: 1,
        isBoss: true
      }
    ]
  },
  {
    id: 'world-16',
    title: 'Performance, Profiling & Security',
    subtitle: 'Baseline Profiles, Memory Optimization & R8',
    badge: 'PERFORMANCE',
    color: '#ea580c',
    order: 16,
    lessons: [
      {
        id: 'perf-baseline-profiles',
        title: 'Baseline Profiles & Cold-Start Optimization',
        worldId: 'world-16',
        skill: 'baseline_profiles',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Ahead-Of-Time (AOT) compilation, Macrobenchmark rule testing, and eliminating frame drops during startup.',
        questionsCount: 5
      },
      {
        id: 'perf-memory-leaks',
        title: 'Memory Optimization & Coroutine Scope Leaks',
        worldId: 'world-16',
        skill: 'memory_profiling',
        durationMinutes: 4,
        xpReward: 25,
        description: 'Preventing Context leaks, job cancellation on screen exit, and analyzing Android Studio memory dumps.',
        questionsCount: 5
      },
      {
        id: 'perf-security',
        title: 'EncryptedSharedPreferences & Biometric Auth',
        worldId: 'world-16',
        skill: 'app_security',
        durationMinutes: 4,
        xpReward: 25,
        description: 'MasterKey hardware keystore encryption, BiometricPrompt authentication, and R8 obfuscation rules.',
        questionsCount: 5
      },
      {
        id: 'perf-boss',
        title: 'WORLD BOSS: High-Speed Cyber Guardian',
        worldId: 'world-16',
        skill: 'performance_guardian',
        durationMinutes: 6,
        xpReward: 50,
        description: 'Audit and optimize an unoptimized app to hit rock-solid 120 FPS and bank-grade data security!',
        questionsCount: 1,
        isBoss: true
      }
    ]
  }
];

// Repository Lookup Helpers
export class LessonRepository {
  static getAll(): LessonQuestion[] {
    return ALL_CURRICULUM_QUESTIONS;
  }

  static getById(id: string): LessonQuestion | undefined {
    return (
      ALL_CURRICULUM_QUESTIONS.find((q) => q.id === id) ||
      DAILY_BATTLE_POOL.find((q) => q.id === id)
    );
  }

  static getForLesson(lessonId: string): LessonQuestion[] {
    const matched = ALL_CURRICULUM_QUESTIONS.filter((q) => q.lessonId === lessonId);
    return matched.length > 0 ? matched : WORLD_1_QUESTIONS;
  }

  static getForWorld(worldId: string): LessonQuestion[] {
    return ALL_CURRICULUM_QUESTIONS.filter((q) => q.worldId === worldId);
  }

  static getForSkill(skill: string): LessonQuestion[] {
    return ALL_CURRICULUM_QUESTIONS.filter((q) => q.skill === skill);
  }
}

export class BattleRepository {
  static getDailySprint(): LessonQuestion[] {
    return DAILY_BATTLE_POOL;
  }
}
