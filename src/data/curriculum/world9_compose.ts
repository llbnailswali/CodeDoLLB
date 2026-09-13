import { LessonQuestion } from '../../types';

export const WORLD_9_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Composable Functions & The Declarative UI Paradigm (5 questions)
  // =========================================================================
  {
    id: 'w9-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-basics',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Compose • The @Composable Annotation',
    skill: 'compose_basics',
    difficulty: 1,
    xpReward: 20,
    question: 'What does marking a function with the `@Composable` annotation communicate to the Kotlin compiler?',
    codeFileName: 'Greeting.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun GreetingCard(name: String) {',
      '    Text(text = "Hello, $name!")',
      '}'
    ],
    options: [
      { id: 'A', title: 'It informs the Compose compiler plugin that the function transforms data into UI elements and can emit nodes into the UI composition tree', subtitle: 'Composable functions describe the UI declaratively and execute in the Composer context', isCorrect: true },
      { id: 'B', title: 'It automatically executes the function on a background IO thread', subtitle: 'Composable functions run on the main UI thread during composition and recomposition', isCorrect: false },
      { id: 'C', title: 'It converts the function into an Android XML layout file at compile time', subtitle: 'Compose bypasses XML completely, using direct Kotlin code to describe UI', isCorrect: false },
      { id: 'D', title: 'It causes the function to return an Android android.view.View instance', subtitle: 'Composable functions have a Unit return type and emit UI nodes via the Composer', isCorrect: false }
    ],
    hint: 'Think about declarative UI: Composable functions emit nodes to describe the UI rather than returning a traditional View object.',
    explanation: {
      title: 'The @Composable Annotation',
      text: 'In Jetpack Compose, the @Composable annotation informs the Compose compiler plugin that the function is intended to transform data into UI. Like the `suspend` keyword, @Composable alters the function type and passes an implicit Composer parameter to track dependencies and emit UI nodes.',
      highlights: ['Transforms data into UI', 'Managed by the Compose compiler plugin', 'Can only be called from other @Composable functions']
    }
  },
  {
    id: 'w9-l1-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-basics',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Compose • Declarative vs Imperative UI',
    skill: 'compose_basics',
    difficulty: 1,
    xpReward: 20,
    question: 'How does Jetpack Compose’s declarative UI model differ from traditional Android View (imperative) UI updates?',
    codeFileName: 'DeclarativeComparison.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '// Traditional View (Imperative):',
      '// textView.text = "Score: $score"',
      '// textView.visibility = View.VISIBLE',
      '',
      '// Jetpack Compose (Declarative):',
      '@Composable',
      'fun ScoreDisplay(score: Int) {',
      '    if (score > 0) {',
      '        Text(text = "Score: $score")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Compose regenerates and updates UI nodes automatically by recomposing when state changes, instead of manually mutating View properties with getters/setters', subtitle: 'In Compose, UI is a direct pure reflection of the current application state: UI = f(state)', isCorrect: true },
      { id: 'B', title: 'Compose requires manually finding views by ID with findViewById() before updating', subtitle: 'Compose does not use IDs or findViewById(); UI is declared directly in code', isCorrect: false },
      { id: 'C', title: 'Imperative views are non-blocking while Compose blocks all background threads', subtitle: 'Compose is highly efficient and skips unchanged composables during recomposition', isCorrect: false },
      { id: 'D', title: 'Compose only supports static layouts that cannot be updated at runtime', subtitle: 'Compose is designed specifically for dynamic, reactive UI updates', isCorrect: false }
    ],
    hint: 'In declarative UI, you describe what the UI should look like for a given state, rather than manually updating UI elements when data changes.',
    explanation: {
      title: 'Declarative UI Paradigm',
      text: 'In declarative UI frameworks like Jetpack Compose, the UI is a direct mathematical function of the current state: `UI = f(state)`. Instead of holding references to views and imperatively setting properties (e.g. `textView.text = "..."`), you describe what the UI looks like for any given input, and Compose automatically recomposes when state updates.',
      highlights: ['UI = f(state)', 'No findViewById() or manual setter calls', 'Recomposition automatically updates affected nodes']
    }
  },
  {
    id: 'w9-l1-c3',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-basics',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Compose • Calling Context Rule',
    skill: 'compose_basics',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 causes a compile error: "@Composable invocations can only happen from the context of a @Composable function". How must `ProfileBadge` be defined?',
    codeFileName: 'ComposableContextRule.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'fun ProfileBadge(user: String) {',
      '    Text(text = "User: $user")',
      '}'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: '@Composable fun ProfileBadge(user: String) {', subtitle: 'Adding the @Composable annotation provides the necessary Composer context to invoke Text', isCorrect: true },
      { id: 'B', title: 'suspend fun ProfileBadge(user: String) {', subtitle: 'suspend provides coroutine suspension context, not Compose UI context', isCorrect: false },
      { id: 'C', title: 'inline fun ProfileBadge(user: String) {', subtitle: 'inline does not satisfy Compose compiler context requirements', isCorrect: false },
      { id: 'D', title: 'fun ProfileBadge(user: String): View {', subtitle: 'Compose functions emit to the Composer and do not return traditional View objects', isCorrect: false }
    ],
    hint: 'Much like `suspend` functions require a coroutine context, Composable functions like `Text` can only be invoked from another `@Composable` function.',
    explanation: {
      title: 'The Composable Context Rule',
      text: 'Because @Composable functions require an implicit Composer parameter injected by the compiler to manage the slot table and track recomposition, you can only invoke a @Composable function from inside another @Composable function (or inside a setContent { } block).',
      highlights: ['Requires Composer parameter under the hood', 'Can only be called from @Composable context', 'Enforced strictly at compile time']
    }
  },
  {
    id: 'w9-l1-c4',
    challengeType: 'output-prediction',
    worldId: 'world-9',
    lessonId: 'compose-basics',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Compose • Recomposition Skipping',
    skill: 'compose_basics',
    difficulty: 2,
    xpReward: 25,
    question: 'When `ScoreBoard` recomposes because `score` changed from 10 to 11, what does the Compose runtime do with `HeaderTitle`?',
    codeFileName: 'RecompositionSkipping.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun ScoreBoard(score: Int) {',
      '    Column {',
      '        HeaderTitle(title = "Kotlin Tournament") // Constant input',
      '        ScoreText(score = score)               // Input changed',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Compose skips re-executing HeaderTitle because its input arguments did not change', subtitle: 'Smart recomposition only re-runs composables whose input parameters have changed (stability & skipping)', isCorrect: true },
      { id: 'B', title: 'Compose destroys the entire UI tree and recreates all components from scratch', subtitle: 'Compose does not discard the tree; it updates changed nodes in-place', isCorrect: false },
      { id: 'C', title: 'Compose throws an error because child composables cannot have static inputs', subtitle: 'Static inputs are encouraged and allow Compose to optimize execution', isCorrect: false },
      { id: 'D', title: 'Compose freezes the UI thread to re-measure all nodes', subtitle: 'Skipped composables are not re-executed or re-measured', isCorrect: false }
    ],
    hint: 'Compose is smart: if a composable’s inputs haven’t changed and are stable, it skips re-executing that function.',
    explanation: {
      title: 'Smart Recomposition & Skipping',
      text: 'Jetpack Compose utilizes intelligent recomposition skipping. If a composable function takes stable parameters and none of those parameter values have changed since the last composition, Compose skips executing that composable entirely, drastically reducing CPU work.',
      highlights: ['Smart recomposition skips unchanged nodes', 'Requires stable parameters', 'Maximizes 60/120fps UI fluidity']
    }
  },
  {
    id: 'w9-l1-c5',
    challengeType: 'code-completion',
    worldId: 'world-9',
    lessonId: 'compose-basics',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Compose • setContent Entry Point',
    skill: 'compose_basics',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the ComponentActivity snippet to set the Composable UI root content.',
    codeFileName: 'MainActivity.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'class MainActivity : ComponentActivity() {',
      '    override fun onCreate(savedInstanceState: Bundle?) {',
      '        super.onCreate(savedInstanceState)',
      '        ____ {',
      '            MaterialTheme {',
      '                GreetingCard("Kotlin Developer")',
      '            }',
      '        }',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'setContent', subtitle: 'ComponentActivity.setContent defines the root Composable hierarchy for the activity', isCorrect: true },
      { id: 'B', title: 'setContentView', subtitle: 'setContentView takes an XML layout resource ID or View, not a Composable lambda', isCorrect: false },
      { id: 'C', title: 'composeRoot', subtitle: 'composeRoot is not a valid Android Activity method', isCorrect: false },
      { id: 'D', title: 'renderUI', subtitle: 'renderUI is not part of Jetpack Compose', isCorrect: false }
    ],
    hint: 'The extension method on `ComponentActivity` that accepts a `@Composable () -> Unit` block is `setContent`.',
    explanation: {
      title: 'The setContent Root Entry Point',
      text: 'In an Android ComponentActivity, calling `setContent { ... }` bridges the Android Activity lifecycle with the Jetpack Compose world. It initializes the Composition context and attaches the root Composable tree to the activity window.',
      highlights: ['setContent bridges Activity to Compose', 'Replaces traditional setContentView(R.layout...)', 'Houses the MaterialTheme and root UI hierarchy']
    }
  },

  // =========================================================================
  // LESSON 2: State in Compose & State Hoisting (5 questions)
  // =========================================================================
  {
    id: 'w9-l2-c1',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-state',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'State • remember and mutableStateOf',
    skill: 'compose_state',
    difficulty: 2,
    xpReward: 25,
    question: 'In the code below, tapping the button updates `count`, but the UI never recomposes because `count` is a plain `var`! How must reactive state be declared?',
    codeFileName: 'UnreactiveState.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun Counter() {',
      '    var count = 0 // Bug: Plain variable is not observable by Compose',
      '    Button(onClick = { count++ }) {',
      '        Text("Count: $count")',
      '    }',
      '}'
    ],
    buggyLineIndex: 2,
    options: [
      { id: 'A', title: 'var count by remember { mutableStateOf(0) }', subtitle: 'mutableStateOf creates an observable MutableState<Int>, and remember preserves it across recompositions', isCorrect: true },
      { id: 'B', title: 'val count = ObservableInt(0)', subtitle: 'ObservableInt is from the legacy Data Binding library, not Jetpack Compose', isCorrect: false },
      { id: 'C', title: 'var count = volatile(0)', subtitle: 'volatile keyword is for thread memory visibility, not Compose recomposition tracking', isCorrect: false },
      { id: 'D', title: 'static var count = 0', subtitle: 'Kotlin does not have a static keyword, and static variables do not trigger recomposition', isCorrect: false }
    ],
    hint: 'Compose needs an observable `State` object created via `mutableStateOf()` and preserved across recompositions using `remember`.',
    explanation: {
      title: 'Reactive State with mutableStateOf and remember',
      text: 'Compose observes reads and writes to `State<T>` objects. When a `MutableState` is written to, Compose automatically schedules a recomposition of every composable that read that state. Using `remember { mutableStateOf(...) }` ensures the state value survives across recomposition passes.',
      highlights: ['mutableStateOf makes values observable', 'remember preserves state across recompositions', 'by delegate allows direct property reads and writes']
    }
  },
  {
    id: 'w9-l2-c2',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-state',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'State • remember vs rememberSaveable',
    skill: 'compose_state',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the primary difference between `remember` and `rememberSaveable` in Jetpack Compose?',
    codeFileName: 'RememberVsSaveable.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'var text1 by remember { mutableStateOf("") }',
      'var text2 by rememberSaveable { mutableStateOf("") }'
    ],
    options: [
      { id: 'A', title: 'rememberSaveable survives Activity recreation (such as screen orientation rotation) and process death via SavedInstanceState, while remember resets', subtitle: 'rememberSaveable serializes state into Android’s Bundle mechanism', isCorrect: true },
      { id: 'B', title: 'remember runs on background threads while rememberSaveable runs on the main thread', subtitle: 'Both run during composition on the main thread', isCorrect: false },
      { id: 'C', title: 'rememberSaveable is permanently saved to an SQLite database on disk', subtitle: 'rememberSaveable uses transient saved instance state (Bundle), not an SQLite database', isCorrect: false },
      { id: 'D', title: 'remember is deprecated in favor of rememberSaveable', subtitle: 'remember is fundamental and widely used for transient, non-retained state', isCorrect: false }
    ],
    hint: 'What happens to your state when the user rotates their Android phone from portrait to landscape?',
    explanation: {
      title: 'remember vs. rememberSaveable',
      text: '`remember` keeps state in the Composition slot table across recompositions, but it is discarded when the Activity is destroyed during configuration changes (like screen rotation) or process death. `rememberSaveable` automatically saves the value in a SavedInstanceState Bundle so it survives orientation changes.',
      highlights: ['remember survives recompositions only', 'rememberSaveable survives screen rotation & process death', 'Uses Android Bundle under the hood']
    }
  },
  {
    id: 'w9-l2-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-state',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'State • State Hoisting & Unidirectional Data Flow',
    skill: 'compose_state',
    difficulty: 2,
    xpReward: 25,
    question: 'What is "State Hoisting" in Jetpack Compose, and what are its main architectural benefits?',
    codeFileName: 'StateHoisting.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '// Hoisted Stateless Composable:',
      '@Composable',
      'fun SearchBar(',
      '    query: String,',
      '    onQueryChange: (String) -> Unit',
      ') {',
      '    TextField(value = query, onValueChange = onQueryChange)',
      '}'
    ],
    options: [
      { id: 'A', title: 'Moving state to a composable’s caller to make the child composable stateless, reusable, and easily testable (Unidirectional Data Flow: state flows down, events flow up)', subtitle: 'State flows down (query: String), events flow up (onQueryChange: (String) -> Unit)', isCorrect: true },
      { id: 'B', title: 'Storing all UI variables in a global singleton object', subtitle: 'Global singletons introduce hidden dependencies and break isolation', isCorrect: false },
      { id: 'C', title: 'Caching rendered bitmaps of composables in memory', subtitle: 'State hoisting is an architectural pattern for managing state, not bitmap caching', isCorrect: false },
      { id: 'D', title: 'Converting all mutable state into Java thread-local variables', subtitle: 'State hoisting has nothing to do with Java ThreadLocal', isCorrect: false }
    ],
    hint: 'State goes down (parameters), events go up (lambda callbacks).',
    explanation: {
      title: 'State Hoisting & Unidirectional Data Flow (UDF)',
      text: 'State hoisting is the pattern of moving state to a component\'s caller. A hoisted composable replaces internal mutable state with two parameters: `value: T` (state flowing down) and `onValueChange: (T) -> Unit` (event flowing up). This makes components stateless, testable, and reusable in different contexts.',
      highlights: ['State flows down via parameters', 'Events flow up via lambdas', 'Makes composables stateless, reusable, and testable']
    }
  },
  {
    id: 'w9-l2-c4',
    challengeType: 'code-completion',
    worldId: 'world-9',
    lessonId: 'compose-state',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'State • Collecting StateFlow with collectAsStateWithLifecycle',
    skill: 'compose_state',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the snippet to safely collect a ViewModel\'s `StateFlow` as a Compose State that respects the Android Lifecycle.',
    codeFileName: 'ViewModelCollection.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun UserScreen(viewModel: UserViewModel = viewModel()) {',
      '    val uiState by viewModel.uiState.____()',
      '    UserContent(state = uiState)',
      '}'
    ],
    options: [
      { id: 'A', title: 'collectAsStateWithLifecycle', subtitle: 'collectAsStateWithLifecycle cancels collection when the app goes into the background to save battery and resources', isCorrect: true },
      { id: 'B', title: 'collectAsState', subtitle: 'collectAsState works but does not stop flow collection when the app is in the background', isCorrect: false },
      { id: 'C', title: 'subscribeAsState', subtitle: 'subscribeAsState is not a valid Compose API', isCorrect: false },
      { id: 'D', title: 'toComposeState', subtitle: 'toComposeState does not exist in standard Compose libraries', isCorrect: false }
    ],
    hint: 'The recommended modern Compose method from `androidx.lifecycle.compose` that stops collecting in the background is `collectAsStateWithLifecycle`.',
    explanation: {
      title: 'Lifecycle-Aware Flow Collection',
      text: 'In modern Android development, `collectAsStateWithLifecycle()` is the recommended way to collect flows in Compose. It automatically starts and stops collecting based on the Lifecycle.State (defaulting to STARTED), saving CPU and battery when the app is in the background.',
      highlights: ['collectAsStateWithLifecycle saves resources', 'Stops collecting when app is stopped/backgrounded', 'Standard pattern for ViewModel StateFlows']
    }
  },
  {
    id: 'w9-l2-c5',
    challengeType: 'output-prediction',
    worldId: 'world-9',
    lessonId: 'compose-state',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'State • MutableList Gotcha in Compose',
    skill: 'compose_state',
    difficulty: 3,
    xpReward: 30,
    question: 'In the snippet below, clicking the button mutates the `list` directly via `list.add("New")`. Why does the UI FAIL to recompose?',
    codeFileName: 'ListStateGotcha.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun ItemList() {',
      '    val items by remember { mutableStateOf(mutableListOf("A", "B")) }',
      '    Button(onClick = { items.add("New") }) {',
      '        Text("Size: ${items.size}")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Compose tracks instances, not internal mutations of a standard MutableList; the list reference did not change, so no recomposition is triggered', subtitle: 'To track list mutations, use mutableStateListOf() or assign a new copy: items = items + "New"', isCorrect: true },
      { id: 'B', title: 'mutableListOf is not supported in Kotlin 1.9', subtitle: 'mutableListOf is a standard Kotlin collection function', isCorrect: false },
      { id: 'C', title: 'Button clicks can only execute suspend functions', subtitle: 'Button onClick is a standard synchronous lambda', isCorrect: false },
      { id: 'D', title: 'Compose requires lists to be immutable Java arrays', subtitle: 'Compose works with any collection, but requires observable state or reference changes', isCorrect: false }
    ],
    hint: 'Mutating the contents of a regular `MutableList` does not change the list reference itself, so Compose has no way of knowing data changed.',
    explanation: {
      title: 'Collection Mutations in Compose State',
      text: 'When you wrap a standard `mutableListOf` inside `mutableStateOf`, Compose only observes changes to the state object reference itself. Calling `items.add(...)` modifies the existing list instance in-place without writing to the State holder. To fix this, either use `mutableStateListOf<T>()` or treat the list immutably: `items = items + "New"`.',
      highlights: ['Internal mutations do not notify State', 'Use mutableStateListOf() for observable collections', 'Or assign new immutable list copies']
    }
  },

  // =========================================================================
  // LESSON 3: Layouts & Modifiers (5 questions)
  // =========================================================================
  {
    id: 'w9-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-layouts',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Layouts • Core Layout Composables',
    skill: 'compose_layouts',
    difficulty: 1,
    xpReward: 20,
    question: 'Which core Compose layout arranges its child composables horizontally in a single row?',
    codeFileName: 'BasicLayouts.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '____(horizontalArrangement = Arrangement.SpaceBetween) {',
      '    Text("Left item")',
      '    Text("Right item")',
      '}'
    ],
    options: [
      { id: 'A', title: 'Row', subtitle: 'Row places items horizontally next to each other', isCorrect: true },
      { id: 'B', title: 'Column', subtitle: 'Column places items vertically stacked on top of each other', isCorrect: false },
      { id: 'C', title: 'Box', subtitle: 'Box stacks items on top of each other in the Z-order', isCorrect: false },
      { id: 'D', title: 'Stack', subtitle: 'Stack is not a standard Jetpack Compose layout (Box is used instead)', isCorrect: false }
    ],
    hint: 'Row for horizontal, Column for vertical, Box for layering.',
    explanation: {
      title: 'Standard Compose Layouts',
      text: 'Jetpack Compose provides three core layout primitives:\n- `Row`: Places children horizontally in sequence.\n- `Column`: Places children vertically in sequence.\n- `Box`: Layers children on top of each other (Z-order), similar to FrameLayout.',
      highlights: ['Row for horizontal sequences', 'Column for vertical sequences', 'Box for overlapping/Z-index stacking']
    }
  },
  {
    id: 'w9-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-9',
    lessonId: 'compose-layouts',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Modifiers • Order of Modifier Execution',
    skill: 'compose_layouts',
    difficulty: 2,
    xpReward: 25,
    question: 'How does Modifier order affect the visual output in this snippet?',
    codeFileName: 'ModifierOrder.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'Box(',
      '    modifier = Modifier',
      '        .background(Color.Red)',
      '        .padding(16.dp)',
      '        .background(Color.Blue)',
      '        .size(64.dp)',
      ')'
    ],
    options: [
      { id: 'A', title: 'A 64dp blue box surrounded by a 16dp red padding border', subtitle: 'Modifiers are applied sequentially from top to bottom; outer background is Red, then padding, then inner background is Blue', isCorrect: true },
      { id: 'B', title: 'A solid purple box blending red and blue together', subtitle: 'Modifiers do not blend color values together', isCorrect: false },
      { id: 'C', title: 'Only a solid blue box; the first red background is completely overwritten', subtitle: 'Padding separates the two backgrounds, creating an outer border effect', isCorrect: false },
      { id: 'D', title: 'A compile-time error because background() can only be called once', subtitle: 'Modifiers can be chained multiple times in any combination', isCorrect: false }
    ],
    hint: 'Modifiers are evaluated in order: first Red background, then 16dp padding, then Blue background.',
    explanation: {
      title: 'Modifier Chaining Order Matters',
      text: 'In Jetpack Compose, the order of modifier function calls matters significantly. Applying `.background(Red).padding(16.dp).background(Blue)` first draws a red background, applies 16dp of inner inset, and then draws the blue background inside that inset, effectively creating a red border around a blue box.',
      highlights: ['Modifiers chain sequentially', 'Order determines nesting and boundaries', 'Allows building borders, padding, and click areas effortlessly']
    }
  },
  {
    id: 'w9-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-9',
    lessonId: 'compose-layouts',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Modifiers • fillMaxWidth & Weight',
    skill: 'compose_layouts',
    difficulty: 2,
    xpReward: 25,
    question: 'Which Modifier function tells a child inside a `Row` to expand and consume proportional available width?',
    codeFileName: 'WeightedRow.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'Row(modifier = Modifier.fillMaxWidth()) {',
      '    Text("Fixed")',
      '    Text(',
      '        "Flexible content",',
      '        modifier = Modifier.____(1f)',
      '    )',
      '}'
    ],
    options: [
      { id: 'A', title: 'weight', subtitle: 'Modifier.weight(1f) distributes remaining space among weighted children inside RowScope and ColumnScope', isCorrect: true },
      { id: 'B', title: 'expand', subtitle: 'expand is not a valid Modifier in Compose', isCorrect: false },
      { id: 'C', title: 'flex', subtitle: 'flex is CSS/web terminology, not Jetpack Compose', isCorrect: false },
      { id: 'D', title: 'ratio', subtitle: 'aspectRatio controls aspect ratio, not flex distribution', isCorrect: false }
    ],
    hint: 'Use `weight` (available within `RowScope` and `ColumnScope`) to allocate proportional available space.',
    explanation: {
      title: 'Proportional Sizing with Modifier.weight',
      text: 'Inside a RowScope or ColumnScope, `Modifier.weight(weight: Float)` tells the parent layout to measure non-weighted children first, and then divide the remaining space among weighted children proportionally to their weight value.',
      highlights: ['Modifier.weight distributes remaining space', 'Scoped to RowScope and ColumnScope', 'Equivalent to LinearLayout weight in legacy Android']
    }
  },
  {
    id: 'w9-l3-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-layouts',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Layouts • Alignment vs Arrangement',
    skill: 'compose_layouts',
    difficulty: 2,
    xpReward: 25,
    question: 'Inside a `Column`, what is the difference between `verticalArrangement` and `horizontalAlignment`?',
    codeFileName: 'ArrangementVsAlignment.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'Column(',
      '    verticalArrangement = Arrangement.Center,',
      '    horizontalAlignment = Alignment.CenterHorizontally',
      ') {',
      '    Text("Centered content")',
      '}'
    ],
    options: [
      { id: 'A', title: 'verticalArrangement positions items along the main (vertical) axis; horizontalAlignment positions items along the cross (horizontal) axis', subtitle: 'Arrangement controls the layout\'s primary direction; Alignment controls the cross axis', isCorrect: true },
      { id: 'B', title: 'verticalArrangement sets font size; horizontalAlignment sets text padding', subtitle: 'Neither affects typography or font size', isCorrect: false },
      { id: 'C', title: 'Arrangement is for background colors; Alignment is for foreground colors', subtitle: 'Both parameters govern spatial positioning of children', isCorrect: false },
      { id: 'D', title: 'They are identical aliases for the exact same calculation', subtitle: 'They operate on perpendicular axes', isCorrect: false }
    ],
    hint: 'Arrangement is along the primary axis (vertical for Column, horizontal for Row). Alignment is on the cross axis.',
    explanation: {
      title: 'Main Axis Arrangement vs. Cross Axis Alignment',
      text: 'In Compose:\n- For a `Column`, the main axis is vertical (controlled by `verticalArrangement`, e.g., SpaceBetween, Center) and the cross axis is horizontal (controlled by `horizontalAlignment`, e.g., Start, CenterHorizontally).\n- For a `Row`, the main axis is horizontal and the cross axis is vertical.',
      highlights: ['Arrangement governs main axis spacing', 'Alignment governs cross axis positioning', 'Mirrors flexbox justify-content and align-items']
    }
  },
  {
    id: 'w9-l3-c5',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-layouts',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Modifiers • Clickable Ripples & Touch Targets',
    skill: 'compose_layouts',
    difficulty: 3,
    xpReward: 30,
    question: 'Line 3 attempts to make a Card clickable, but the ripple effect is rectangular and bleeds outside the rounded corners! How should the Modifiers be ordered to clip the ripple?',
    codeFileName: 'ClippedClickable.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'Box(',
      '    modifier = Modifier',
      '        .clickable { onClick() }',
      '        .clip(RoundedCornerShape(16.dp))',
      '        .size(100.dp)',
      ')'
    ],
    buggyLineIndex: 2,
    options: [
      { id: 'A', title: 'Place .clip(RoundedCornerShape(16.dp)) BEFORE .clickable { onClick() }', subtitle: 'Clipping first defines the boundary shape so the subsequent clickable ripple is contained inside the corners', isCorrect: true },
      { id: 'B', title: 'Place .clickable { onClick() } inside a CoroutineScope', subtitle: 'Clickable is a UI layout modifier, not a coroutine', isCorrect: false },
      { id: 'C', title: 'Remove .size(100.dp) to fix corner bleeding', subtitle: 'Size does not control shape clipping or ripple boundaries', isCorrect: false },
      { id: 'D', title: 'Replace clickable with pointerInput { }', subtitle: 'Correct modifier ordering with clip before clickable fixes ripple containment cleanly', isCorrect: false }
    ],
    hint: 'To clip a ripple to a shape, apply `.clip(shape)` BEFORE `.clickable { ... }`.',
    explanation: {
      title: 'Clipping Touch & Ripple Boundaries',
      text: 'Because modifiers execute in sequential order, calling `.clickable` before `.clip` causes the click listener and ripple effect to use the unclipped rectangular bounds. Calling `.clip(shape)` before `.clickable` ensures that both the visual content and the material ripple effect adhere to the rounded corner shape.',
      highlights: ['Clip before clickable constrains the ripple', 'Order defines hit-testing and draw boundaries', 'Standard Android Material design best practice']
    }
  },

  // =========================================================================
  // LESSON 4: Lazy Lists & High-Performance Scrolling (5 questions)
  // =========================================================================
  {
    id: 'w9-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-lazy',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Lazy Lists • LazyColumn vs Column',
    skill: 'compose_lazy',
    difficulty: 1,
    xpReward: 20,
    question: 'Why should you use `LazyColumn` instead of a regular `Column` with a `verticalScroll` modifier for displaying a list of 1,000 items?',
    codeFileName: 'LazyVsColumn.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '// Pattern A:',
      'Column(modifier = Modifier.verticalScroll(rememberScrollState())) {',
      '    users.forEach { UserRow(it) } // 1,000 items',
      '}',
      '',
      '// Pattern B:',
      'LazyColumn {',
      '    items(users) { UserRow(it) } // 1,000 items',
      '}'
    ],
    options: [
      { id: 'A', title: 'LazyColumn only composes and measures items that are currently visible on screen (like RecyclerView), preventing high memory consumption and dropped frames', subtitle: 'Regular Column composes all 1,000 items immediately, which can cause severe jank or OutOfMemory errors', isCorrect: true },
      { id: 'B', title: 'Column does not support scrolling on Android devices', subtitle: 'Column supports scrolling via Modifier.verticalScroll, but lacks item recycling/lazy emission', isCorrect: false },
      { id: 'C', title: 'LazyColumn executes all animations on the GPU while Column uses software rendering', subtitle: 'Both render through Compose\'s hardware-accelerated pipeline', isCorrect: false },
      { id: 'D', title: 'LazyColumn automatically persists the list to local disk storage', subtitle: 'Lazy lists manage UI virtualization only', isCorrect: false }
    ],
    hint: 'Think about `RecyclerView`: lazy lists only compose items when they scroll into view.',
    explanation: {
      title: 'Virtualization with LazyColumn',
      text: 'A standard `Column` composes, measures, and renders every single child item immediately, even those far off-screen. `LazyColumn` virtualizes the list: it only composes and lays out items that are currently visible in the viewport, delivering smooth 60/120fps scrolling even with thousands of items.',
      highlights: ['Composes only visible items', 'Equivalent of RecyclerView without the boilerplate', 'Eliminates memory overhead for large lists']
    }
  },
  {
    id: 'w9-l4-c2',
    challengeType: 'code-completion',
    worldId: 'world-9',
    lessonId: 'compose-lazy',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Lazy Lists • Providing Stable Keys',
    skill: 'compose_lazy',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the `items` block to assign a unique, stable key for each item, preventing unnecessary recompositions and lost scroll positions during list reordering.',
    codeFileName: 'LazyItemKeys.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'LazyColumn {',
      '    items(',
      '        items = messages,',
      '        ____ = { message -> message.id }',
      '    ) { message ->',
      '        MessageBubble(message)',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'key', subtitle: 'Providing a unique key parameter allows Compose to identify items by identity rather than position', isCorrect: true },
      { id: 'B', title: 'id', subtitle: 'The parameter name on items() is key, not id', isCorrect: false },
      { id: 'C', title: 'identifier', subtitle: 'identifier is not a valid parameter name', isCorrect: false },
      { id: 'D', title: 'tag', subtitle: 'tag is for layout testing, not item identity', isCorrect: false }
    ],
    hint: 'The parameter on `items()` that accepts a lambda returning a unique identifier is `key`.',
    explanation: {
      title: 'Stable Item Keys in Lazy Lists',
      text: 'By default, LazyColumn uses an item\'s position in the list as its key. If an item is inserted, deleted, or reordered, positions change, causing unnecessary recompositions and broken animations. Providing `key = { it.id }` lets Compose track items by unique identity across updates.',
      highlights: ['key = { it.id } identifies items by identity', 'Enables smooth reordering animations', 'Prevents losing scroll and state positions']
    }
  },
  {
    id: 'w9-l4-c3',
    challengeType: 'output-prediction',
    worldId: 'world-9',
    lessonId: 'compose-lazy',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Lazy Lists • Sticky Headers',
    skill: 'compose_lazy',
    difficulty: 2,
    xpReward: 25,
    question: 'What behavior does the `stickyHeader` DSL block provide inside a `LazyColumn`?',
    codeFileName: 'StickyHeaderDemo.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'LazyColumn {',
      '    contactsGroupedByLetter.forEach { (letter, contacts) ->',
      '        stickyHeader {',
      '            HeaderLetter(letter)',
      '        }',
      '        items(contacts) { contact ->',
      '            ContactRow(contact)',
      '        }',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'The header remains pinned to the top of the viewport as its section scrolls, until the next header pushes it off-screen', subtitle: 'stickyHeader implements standard pinned section headers without extra scroll listener logic', isCorrect: true },
      { id: 'B', title: 'The header flashes yellow and sticks permanently to the center of the screen', subtitle: 'Headers pin to the top of the scrolling viewport', isCorrect: false },
      { id: 'C', title: 'The header is converted into an Android notification', subtitle: 'stickyHeader is purely a UI layout mechanism', isCorrect: false },
      { id: 'D', title: 'The items cannot be scrolled past the header', subtitle: 'The list continues scrolling smoothly beneath the pinned header', isCorrect: false }
    ],
    hint: 'Think of contacts lists in phone apps: the letter "A" header stays stuck at the top while scrolling through A contacts.',
    explanation: {
      title: 'Sticky Headers in LazyColumn',
      text: '`stickyHeader { ... }` is a built-in DSL component in LazyListScope. It pins the header composable to the top of the scrolling list while its category items are visible, smoothly handing off to the next category header when reached.',
      highlights: ['Built-in pinned section headers', 'Zero manual scroll math or listeners needed', 'Perfect for grouped lists (dates, alphabetical contacts)']
    }
  },
  {
    id: 'w9-l4-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-lazy',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Lazy Lists • Programmatic Scroll with LazyListState',
    skill: 'compose_lazy',
    difficulty: 2,
    xpReward: 25,
    question: 'How do you programmatically scroll a `LazyColumn` to the top when a user taps a "Back to Top" floating button?',
    codeFileName: 'ProgrammaticScroll.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'val listState = rememberLazyListState()',
      'val coroutineScope = rememberCoroutineScope()',
      '',
      'LazyColumn(state = listState) { /* ... */ }',
      '',
      'FloatingActionButton(onClick = {',
      '    // Programmatic scroll action here',
      '}) { /* ... */ }'
    ],
    options: [
      { id: 'A', title: 'coroutineScope.launch { listState.animateScrollToItem(0) }', subtitle: 'animateScrollToItem is a suspending function on LazyListState and must be called inside a coroutine scope', isCorrect: true },
      { id: 'B', title: 'listState.scrollTo(0)', subtitle: 'LazyListState uses scrollToItem or animateScrollToItem, which are suspending functions', isCorrect: false },
      { id: 'C', title: 'Thread.sleep(100); listState.reset()', subtitle: 'Thread.sleep freezes the UI thread; reset() does not exist on LazyListState', isCorrect: false },
      { id: 'D', title: 'listState.position = 0', subtitle: 'Scroll state cannot be set directly via property mutation', isCorrect: false }
    ],
    hint: 'Programmatic scrolling functions like `animateScrollToItem()` are suspending functions and must be launched within a `CoroutineScope`.',
    explanation: {
      title: 'Programmatic Scrolling with LazyListState',
      text: '`LazyListState` (created via `rememberLazyListState()`) exposes suspending methods: `scrollToItem(index)` (instant jump) and `animateScrollToItem(index)` (smooth animation). Because they suspend during animation, they must be called inside a coroutine launched via `rememberCoroutineScope()`.',
      highlights: ['listState.animateScrollToItem(index)', 'Suspending functions run inside rememberCoroutineScope', 'Provides current scroll position and visible item info']
    }
  },
  {
    id: 'w9-l4-c5',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-lazy',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Lazy Lists • Horizontal Padding Antipattern',
    skill: 'compose_lazy',
    difficulty: 2,
    xpReward: 25,
    question: 'Applying `.padding(16.dp)` to the LazyColumn modifier clips items when they scroll to the screen edges. Which LazyColumn parameter should be used instead for content padding?',
    codeFileName: 'ContentPaddingFix.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      'LazyColumn(',
      '    modifier = Modifier.padding(16.dp) // Bug: Cuts off scroll edge bounds',
      ') {',
      '    items(items) { CardItem(it) }',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'contentPadding = PaddingValues(16.dp)', subtitle: 'contentPadding adds spacing around list contents without clipping the viewport during scrolling', isCorrect: true },
      { id: 'B', title: 'innerPadding = 16.dp', subtitle: 'innerPadding is not a parameter on LazyColumn', isCorrect: false },
      { id: 'C', title: 'margin = 16.dp', subtitle: 'Compose does not have a margin property or parameter', isCorrect: false },
      { id: 'D', title: 'modifier = Modifier.fillMaxWidth(0.9f)', subtitle: 'Arbitrary fractional widths do not solve content insets properly', isCorrect: false }
    ],
    hint: 'Use the `contentPadding = PaddingValues(...)` parameter on `LazyColumn`.',
    explanation: {
      title: 'contentPadding in Lazy Lists',
      text: 'Applying `Modifier.padding(...)` to a LazyColumn sets an outer boundary that cuts off scrolled items at the padding line. In contrast, `contentPadding = PaddingValues(...)` insets the items inside the scrollable container: the first item starts 16dp down, but as you scroll, items glide smoothly under status and navigation bars.',
      highlights: ['contentPadding = PaddingValues(...)', 'Prevents clipping during scroll passes', 'Ensures edge-to-edge content scrolling']
    }
  },

  // =========================================================================
  // LESSON 5: Side Effects & Coroutines in Compose (5 questions)
  // =========================================================================
  {
    id: 'w9-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-effects',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Side Effects • LaunchedEffect Purpose',
    skill: 'compose_effects',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the purpose of the `LaunchedEffect` composable in Jetpack Compose?',
    codeFileName: 'LaunchedEffectDemo.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun UserProfile(userId: String) {',
      '    LaunchedEffect(userId) {',
      '        viewModel.loadUser(userId)',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'To launch a coroutine scoped to the composable’s lifecycle when entering composition or when any of its key parameters change', subtitle: 'LaunchedEffect launches suspending operations safely within Compose and cancels when leaving composition or changing keys', isCorrect: true },
      { id: 'B', title: 'To launch a separate Android service in a background OS process', subtitle: 'LaunchedEffect creates a coroutine, not an Android Service component', isCorrect: false },
      { id: 'C', title: 'To animate UI properties between states', subtitle: 'Animation in Compose uses animate*AsState or updateTransition', isCorrect: false },
      { id: 'D', title: 'To make the composable run 10x faster', subtitle: 'LaunchedEffect is an effect handler for asynchronous work, not an execution speed booster', isCorrect: false }
    ],
    hint: 'LaunchedEffect launches a coroutine tied to composition. If the key changes, it cancels and relaunches.',
    explanation: {
      title: 'LaunchedEffect: Coroutines in Composition',
      text: '`LaunchedEffect(key1, key2) { ... }` runs a suspending block inside a coroutine. It launches when the composable enters the composition and automatically cancels and relaunches if any key parameter changes. If the composable leaves composition, the coroutine is cleanly cancelled.',
      highlights: ['Runs suspending code in composition', 'Cancels & restarts when key changes', 'Cancels automatically when leaving composition']
    }
  },
  {
    id: 'w9-l5-c2',
    challengeType: 'code-completion',
    worldId: 'world-9',
    lessonId: 'compose-effects',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Side Effects • One-Time Initialization with Unit Key',
    skill: 'compose_effects',
    difficulty: 2,
    xpReward: 25,
    question: 'What key value should be passed to `LaunchedEffect` if you want the effect to run exactly ONCE when the composable first appears, and never re-trigger on recomposition?',
    codeFileName: 'OneTimeEffect.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun SplashScreen(onTimeout: () -> Unit) {',
      '    LaunchedEffect(____) {',
      '        delay(2000)',
      '        onTimeout()',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'Unit', subtitle: 'Passing Unit or true as a constant key ensures the effect only runs once upon initial composition and never relaunches', isCorrect: true },
      { id: 'B', title: 'this', subtitle: 'this is not a valid constant key in this context', isCorrect: false },
      { id: 'C', title: 'remember { mutableStateOf(0) }', subtitle: 'Passing a state object causes unnecessary tracking and overhead', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Unit is the idiomatic constant key in Kotlin Compose', isCorrect: false }
    ],
    hint: 'In Kotlin Compose, the standard constant key used for single-run effects is `Unit`.',
    explanation: {
      title: 'Constant Key (Unit) for Single-Shot Effects',
      text: 'When you pass a constant like `Unit` or `true` as the key to `LaunchedEffect(Unit)`, the key never changes across recompositions. Therefore, the coroutine runs once when the composable enters composition and completes or stays active until the composable leaves composition.',
      highlights: ['LaunchedEffect(Unit) runs once', 'Constant key never triggers restarts', 'Ideal for timers, analytics events, or splash delays']
    }
  },
  {
    id: 'w9-l5-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-9',
    lessonId: 'compose-effects',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Side Effects • rememberCoroutineScope',
    skill: 'compose_effects',
    difficulty: 2,
    xpReward: 25,
    question: 'When should you use `rememberCoroutineScope()` instead of `LaunchedEffect`?',
    codeFileName: 'CoroutineScopeChoice.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun SnackbarDemo() {',
      '    val snackbarHostState = remember { SnackbarHostState() }',
      '    val scope = rememberCoroutineScope()',
      '',
      '    Button(onClick = {',
      '        scope.launch { snackbarHostState.showSnackbar("Message sent!") }',
      '    }) {',
      '        Text("Send")',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'When launching coroutines from outside a Composable context, such as inside user interaction callbacks like onClick or onDrag', subtitle: 'LaunchedEffect is for composition effects; rememberCoroutineScope is for launching coroutines from event callbacks', isCorrect: true },
      { id: 'B', title: 'When you need to block the UI thread during computation', subtitle: 'Coroutines never block the UI thread', isCorrect: false },
      { id: 'C', title: 'When writing unit tests without the Android emulator', subtitle: 'TestCoroutineScope / runTest is used for unit testing', isCorrect: false },
      { id: 'D', title: 'Only when using RxJava with Compose', subtitle: 'rememberCoroutineScope is pure Kotlin Coroutines for Compose', isCorrect: false }
    ],
    hint: 'Event callbacks like `Button(onClick = { ... })` are not `@Composable` functions, so you cannot call `LaunchedEffect` inside them.',
    explanation: {
      title: 'rememberCoroutineScope() for User Event Callbacks',
      text: '`LaunchedEffect` can only be called directly in the body of a `@Composable` function. Inside event listeners (like `onClick`), you are in a standard lambda callback. Calling `rememberCoroutineScope()` gives you a `CoroutineScope` bound to that point in the Composition to launch coroutines in response to user actions.',
      highlights: ['Use inside event callbacks (onClick, onScroll)', 'Bound to the composition lifecycle', 'Cancels automatically when composable leaves']
    }
  },
  {
    id: 'w9-l5-c4',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-effects',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Side Effects • DisposableEffect for Cleanup',
    skill: 'compose_effects',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 5 fails to compile: "DisposableEffect must end with onDispose clause". Complete the required cleanup pattern.',
    codeFileName: 'DisposableCleanup.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun LocationTracker(listener: LocationListener) {',
      '    DisposableEffect(listener) {',
      '        registerLocationListener(listener)',
      '        // Bug: Missing required onDispose block',
      '    }',
      '}'
    ],
    buggyLineIndex: 4,
    options: [
      { id: 'A', title: 'onDispose { unregisterLocationListener(listener) }', subtitle: 'DisposableEffect requires an onDispose { ... } clause as its final statement for resource cleanup', isCorrect: true },
      { id: 'B', title: 'destroy { unregisterLocationListener(listener) }', subtitle: 'The Compose DSL keyword is onDispose, not destroy', isCorrect: false },
      { id: 'C', title: 'finally { unregisterLocationListener(listener) }', subtitle: 'DisposableEffect uses onDispose, not try-finally', isCorrect: false },
      { id: 'D', title: 'close()', subtitle: 'onDispose clause is mandatory on DisposableEffect', isCorrect: false }
    ],
    hint: 'Every `DisposableEffect` MUST conclude with an `onDispose { ... }` block to release observers, listeners, or resources.',
    explanation: {
      title: 'DisposableEffect and onDispose',
      text: '`DisposableEffect` is designed for side-effects that require teardown or cleanup (like registering BroadcastReceivers, sensor listeners, or socket connections). The compiler enforces that its block must end with `onDispose { ... }`, which runs whenever the keys change or the composable leaves the composition.',
      highlights: ['Requires onDispose { ... } clause', 'Cleans up listeners and system resources', 'Prevents memory leaks when composables leave the screen']
    }
  },
  {
    id: 'w9-l5-c5',
    challengeType: 'output-prediction',
    worldId: 'world-9',
    lessonId: 'compose-effects',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'Side Effects • SideEffect Composable',
    skill: 'compose_effects',
    difficulty: 3,
    xpReward: 30,
    question: 'When is the lambda passed to the `SideEffect { ... }` composable executed?',
    codeFileName: 'SideEffectDemo.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun AnalyticsTracker(screenName: String) {',
      '    SideEffect {',
      '        AnalyticsLibrary.logScreenView(screenName)',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'After EVERY successful composition or recomposition pass has completed', subtitle: 'SideEffect publishes state to external non-Compose objects only after composition succeeds', isCorrect: true },
      { id: 'B', title: 'Only once when the app is first installed', subtitle: 'SideEffect runs after each successful composition', isCorrect: false },
      { id: 'C', title: 'Before the composable function begins execution', subtitle: 'It runs after composition has successfully completed', isCorrect: false },
      { id: 'D', title: 'Only when an unhandled exception occurs', subtitle: 'SideEffect is for normal post-composition state synchronization', isCorrect: false }
    ],
    hint: '`SideEffect` runs after every successful recomposition to sync Compose state with non-Compose objects.',
    explanation: {
      title: 'The SideEffect Composable',
      text: 'To share Compose state with objects not managed by Compose (such as an analytics tracker, custom view, or system UI controller), use `SideEffect`. Its lambda executes after every successful recomposition, ensuring the external system reflects the latest committed UI state.',
      highlights: ['Executes after every successful recomposition', 'Syncs Compose state with external systems', 'Guaranteed not to run if composition is aborted or fails']
    }
  },

  // =========================================================================
  // LESSON 6: WORLD BOSS: Compose Architect (1 Boss Question)
  // =========================================================================
  {
    id: 'w9-boss-c1',
    challengeType: 'bug-fix',
    worldId: 'world-9',
    lessonId: 'compose-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Android & Jetpack Compose',
    topicTag: 'World Boss • Feed Architecture with Compose & State',
    skill: 'compose_boss',
    difficulty: 3,
    xpReward: 50,
    question: 'WORLD BOSS: Compose Architect! This enterprise Social Feed composable suffers from 3 critical bugs: un-remembered state resetting on scroll, missing stable keys on LazyColumn, and launching a coroutine directly in the composable body instead of an effect! Identify the line launching a coroutine improperly in the composable body.',
    codeFileName: 'SocialFeedArchitecture.kt',
    languageVersion: 'Kotlin 1.9 / Compose 1.5',
    codeSnippet: [
      '@Composable',
      'fun SocialFeed(',
      '    posts: List<Post>,',
      '    onLike: (String) -> Unit',
      ') {',
      '    // State preserved across recomposition:',
      '    var filterText by rememberSaveable { mutableStateOf("") }',
      '    val listState = rememberLazyListState()',
      '    ',
      '    // Bug: Side effect directly in body executes repeatedly during recomposition passes!',
      '    GlobalScope.launch { analytics.logFeedView(posts.size) }',
      '    ',
      '    LazyColumn(',
      '        state = listState,',
      '        contentPadding = PaddingValues(16.dp)',
      '    ) {',
      '        items(posts, key = { it.id }) { post ->',
      '            PostCard(post = post, onLike = { onLike(post.id) })',
      '        }',
      '    }',
      '}'
    ],
    buggyLineIndex: 9,
    options: [
      { id: 'A', title: 'Replace GlobalScope.launch with LaunchedEffect(Unit) { analytics.logFeedView(posts.size) }', subtitle: 'LaunchedEffect guarantees the side effect runs safely once upon entering composition, cancelling properly when leaving', isCorrect: true },
      { id: 'B', title: 'Replace rememberLazyListState() with null', subtitle: 'listState manages the lazy list viewport and must not be null', isCorrect: false },
      { id: 'C', title: 'Remove key = { it.id } from items()', subtitle: 'Keys are essential for list performance and recomposition skipping', isCorrect: false },
      { id: 'D', title: 'Change posts parameter type to Array<Any>', subtitle: 'Type erasure and generic Any degrades type safety', isCorrect: false }
    ],
    hint: 'Never launch coroutines directly in a Composable body or use GlobalScope! Wrap side effects in `LaunchedEffect` or `rememberCoroutineScope`.',
    explanation: {
      title: 'Compose Architecture Best Practices: Boss Defeated!',
      text: 'You have mastered Jetpack Compose fundamentals! Running side-effects or launching coroutines directly inside the composable body (like GlobalScope.launch) causes them to execute unpredictably on every recomposition pass and leaks lifecycles. Wrapping asynchronous operations inside `LaunchedEffect` ensures they execute cleanly according to the Composable lifecycle.',
      highlights: [
        'Side effects must be wrapped in LaunchedEffect or DisposableEffect',
        'State is preserved with remember and rememberSaveable',
        'LazyColumn virtualizes lists with stable keys and contentPadding',
        'State hoisting enables unidirectional data flow (UDF)'
      ]
    }
  }
];
