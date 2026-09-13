import { LessonQuestion } from '../../types';

export const WORLD_10_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Clean Architecture & Modern MVVM (5 questions)
  // =========================================================================
  {
    id: 'w10-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-mvvm',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'MVVM • Separation of Concerns',
    skill: 'clean_architecture',
    difficulty: 1,
    xpReward: 20,
    question: 'In Modern Android MVVM (Model-View-ViewModel) architecture, what is the primary responsibility of the `ViewModel`?',
    codeFileName: 'UserViewModel.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class UserViewModel(private val repository: UserRepository) : ViewModel() {',
      '    private val _uiState = MutableStateFlow<UserUiState>(UserUiState.Loading)',
      '    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()',
      '    ',
      '    fun loadUser(id: String) { /* ... */ }',
      '}'
    ],
    options: [
      { id: 'A', title: 'To hold and manage UI-related state across configuration changes, process user intents, and transform business data into observable UI State', subtitle: 'The ViewModel survives configuration changes (like screen rotation) and decouples business logic from UI rendering', isCorrect: true },
      { id: 'B', title: 'To directly manipulate and draw pixels on the Android Canvas', subtitle: 'Drawing pixels is the responsibility of the UI layer (Compose or Views)', isCorrect: false },
      { id: 'C', title: 'To store user credentials directly in plain text in SharedPreferences', subtitle: 'ViewModels do not handle low-level disk storage directly and should never store plain credentials', isCorrect: false },
      { id: 'D', title: 'To hold references to Android Activity and Context instances', subtitle: 'ViewModels must NEVER hold strong references to Activities or Views to avoid catastrophic memory leaks', isCorrect: false }
    ],
    hint: 'ViewModels manage observable UI state and survive screen rotations without holding references to Android Views or Activities.',
    explanation: {
      title: 'The Role of the ViewModel in MVVM',
      text: 'In Modern Android Architecture, the ViewModel acts as the state holder for the UI. It survives configuration changes (like screen rotation), communicates with domain and data layers (Repositories/Use Cases), and exposes state via observable streams like StateFlow.',
      highlights: ['Survives configuration changes', 'Exposes observable UI State', 'Never holds references to Activities or Views']
    }
  },
  {
    id: 'w10-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-mvvm',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'MVVM • Modeling UI State with Sealed Interfaces',
    skill: 'clean_architecture',
    difficulty: 2,
    xpReward: 25,
    question: 'Why is modeling UI State with a `sealed interface` preferred over having multiple independent boolean flags (`isLoading`, `isError`, `hasData`)?',
    codeFileName: 'UiStateModeling.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed interface OrderUiState {',
      '    object Loading : OrderUiState',
      '    data class Success(val orders: List<Order>) : OrderUiState',
      '    data class Error(val message: String) : OrderUiState',
      '}'
    ],
    options: [
      { id: 'A', title: 'It makes impossible UI states unrepresentable at compile time (e.g. loading and error flags cannot both be true simultaneously)', subtitle: 'Sealed hierarchies enforce mutually exclusive states and exhaustive compile-time when branches', isCorrect: true },
      { id: 'B', title: 'Sealed interfaces consume 90% less heap memory than plain classes', subtitle: 'The memory difference is negligible; the primary benefit is type safety and correctness', isCorrect: false },
      { id: 'C', title: 'It allows the UI state to be transmitted over Bluetooth automatically', subtitle: 'Sealed interfaces have no inherent network or Bluetooth capabilities', isCorrect: false },
      { id: 'D', title: 'It allows the garbage collector to skip the ViewModel entirely', subtitle: 'ViewModels are normal JVM objects managed by the garbage collector', isCorrect: false }
    ],
    hint: 'Think about what happens if `isLoading = true` and `isError = true` at the same time: which one does the UI show?',
    explanation: {
      title: 'Eliminating Impossible States with Sealed Hierarchies',
      text: 'Using separate flags like `val isLoading: Boolean` and `val isError: Boolean` can lead to contradictory, buggy states (e.g. `isLoading = true` and `isError = true`). A sealed interface guarantees mutually exclusive states and enables exhaustive `when` expressions with compile-time checking.',
      highlights: ['Makes invalid states unrepresentable', 'Exhaustive compile-time `when` checking', 'Single Source of Truth for the UI screen']
    }
  },
  {
    id: 'w10-l1-c3',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-mvvm',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'MVVM • Encapsulation with StateFlow',
    skill: 'clean_architecture',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 exposes a `MutableStateFlow` publicly, allowing any UI composable or outside class to arbitrarily overwrite state from the outside! How should public state be safely encapsulated?',
    codeFileName: 'StateEncapsulation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class DashboardViewModel : ViewModel() {',
      '    val uiState = MutableStateFlow<DashboardState>(DashboardState.Initial) // Bug: Publicly mutable!',
      '    ',
      '    fun refresh() { /* ... */ }',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'private val _uiState = MutableStateFlow<DashboardState>(DashboardState.Initial); val uiState: StateFlow<DashboardState> = _uiState.asStateFlow()', subtitle: 'Backing property pattern: internal mutable state is private, while external exposure is read-only StateFlow', isCorrect: true },
      { id: 'B', title: 'val uiState = volatile(MutableStateFlow(DashboardState.Initial))', subtitle: 'volatile is a field annotation for memory visibility, not an encapsulation pattern', isCorrect: false },
      { id: 'C', title: 'val uiState: Any = MutableStateFlow(DashboardState.Initial)', subtitle: 'Exposing as Any loses type safety and does not prevent casting', isCorrect: false },
      { id: 'D', title: 'const val uiState = MutableStateFlow(DashboardState.Initial)', subtitle: 'MutableStateFlow cannot be a compile-time const primitive', isCorrect: false }
    ],
    hint: 'Use the standard Kotlin backing property idiom: private `_uiState` as `MutableStateFlow`, exposed as public read-only `uiState` via `asStateFlow()`.',
    explanation: {
      title: 'The Backing Property Pattern for UI State',
      text: 'To enforce Unidirectional Data Flow, the ViewModel must be the sole entity permitted to modify UI state. We declare `_uiState` as a private `MutableStateFlow` and expose `uiState` as a read-only `StateFlow` via `.asStateFlow()`.',
      highlights: ['Private _uiState ensures mutation isolation', 'Public uiState is read-only StateFlow', 'Prevents external tampering with screen state']
    }
  },
  {
    id: 'w10-l1-c4',
    challengeType: 'code-completion',
    worldId: 'world-10',
    lessonId: 'arch-mvvm',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'MVVM • Coroutine Lifecycle with viewModelScope',
    skill: 'clean_architecture',
    difficulty: 2,
    xpReward: 25,
    question: 'Which built-in CoroutineScope should be used inside an Android `ViewModel` so launched background jobs are automatically cancelled when the ViewModel is cleared?',
    codeFileName: 'ViewModelLaunch.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class ProfileViewModel(private val api: ApiService) : ViewModel() {',
      '    fun updateBio(newBio: String) {',
      '        ____.launch {',
      '            api.saveBio(newBio)',
      '        }',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'viewModelScope', subtitle: 'viewModelScope is tied directly to the ViewModel lifecycle and cancels automatically in onCleared()', isCorrect: true },
      { id: 'B', title: 'GlobalScope', subtitle: 'GlobalScope is an antipattern that outlives ViewModels and leaks memory and network requests', isCorrect: false },
      { id: 'C', title: 'lifecycleScope', subtitle: 'lifecycleScope is tied to an Activity or Fragment lifecycle, not the ViewModel', isCorrect: false },
      { id: 'D', title: 'coroutineContext', subtitle: 'coroutineContext is not a standalone CoroutineScope extension on ViewModel', isCorrect: false }
    ],
    hint: 'Android\'s `lifecycle-viewmodel-ktx` library provides the standard extension property `viewModelScope`.',
    explanation: {
      title: 'Automatic Lifecycle Management with viewModelScope',
      text: '`viewModelScope` is a CoroutineScope bound to the ViewModel\'s lifecycle. Any coroutine launched in this scope is automatically cancelled when the ViewModel is destroyed (`onCleared()`), preventing wasted network calls and memory leaks.',
      highlights: ['Tied to ViewModel lifecycle', 'Cancels coroutines in onCleared()', 'Replaces dangerous GlobalScope usage']
    }
  },
  {
    id: 'w10-l1-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-mvvm',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Clean Architecture • Layer Dependency Rule',
    skill: 'clean_architecture',
    difficulty: 2,
    xpReward: 25,
    question: 'According to Clean Architecture principles, what is the Dependency Rule regarding Domain, Data, and Presentation layers?',
    codeFileName: 'CleanArchLayers.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Layer 1: Presentation (UI, Compose, ViewModels)',
      '// Layer 2: Domain (Use Cases, Business Models, Repository Interfaces)',
      '// Layer 3: Data (Repository Implementations, Room DB, Retrofit API)'
    ],
    options: [
      { id: 'A', title: 'Source code dependencies must only point inward: the Domain layer is completely independent of UI frameworks, Android SDK, and database libraries', subtitle: 'Domain contains pure business logic and defines interfaces that Data and Presentation implement or consume', isCorrect: true },
      { id: 'B', title: 'The Domain layer must directly import Android Activity and Room SQLite classes', subtitle: 'Domain must remain pure Kotlin without Android or third-party database dependencies', isCorrect: false },
      { id: 'C', title: 'All layers must circular-depend on each other for maximum flexibility', subtitle: 'Circular dependencies destroy modularity and prevent unit testing', isCorrect: false },
      { id: 'D', title: 'The Data layer is forbidden from using network connections', subtitle: 'The Data layer is precisely where network and disk data sources reside', isCorrect: false }
    ],
    hint: 'The core Domain layer is the heart of your app: it knows nothing about Android, SQL, or UI.',
    explanation: {
      title: 'The Clean Architecture Dependency Rule',
      text: 'In Clean Architecture, dependencies point inward toward business logic. The Domain layer contains pure Kotlin business entities and repository interfaces. The Data layer (Room, Retrofit) and Presentation layer (Compose, ViewModels) depend on Domain, but Domain has zero dependencies on frameworks or libraries.',
      highlights: ['Dependencies point strictly inward', 'Domain layer is pure Kotlin (no Android imports)', 'Enables effortless unit testing and framework swapping']
    }
  },

  // =========================================================================
  // LESSON 2: Repository Pattern & Offline-First Data (5 questions)
  // =========================================================================
  {
    id: 'w10-l2-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-repository',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Repository • Single Source of Truth (SSOT)',
    skill: 'offline_first',
    difficulty: 2,
    xpReward: 25,
    question: 'In an offline-first Android application, what does the "Single Source of Truth" (SSOT) pattern dictate?',
    codeFileName: 'SingleSourceOfTruth.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class ArticleRepository(',
      '    private val localDao: ArticleDao,',
      '    private val remoteApi: ArticleApi',
      ') {',
      '    // Single Source of Truth: UI observes local DB only',
      '    fun getArticles(): Flow<List<Article>> = localDao.observeArticles()',
      '}'
    ],
    options: [
      { id: 'A', title: 'The UI observes local storage (e.g. Room database) as the authoritative source of truth, while network fetches silently update the local database', subtitle: 'Network data is saved into the local DB, and the local DB automatically emits updated items to the UI stream', isCorrect: true },
      { id: 'B', title: 'The UI always displays network data directly and ignores disk storage', subtitle: 'Ignoring disk storage breaks offline support completely', isCorrect: false },
      { id: 'C', title: 'The application stores all data in memory variables without persisting to disk', subtitle: 'Transient memory variables are lost on process death', isCorrect: false },
      { id: 'D', title: 'Every API response must be printed to the Android Logcat console first', subtitle: 'Logcat is for debugging, not data persistence architecture', isCorrect: false }
    ],
    hint: 'The local database is the single authority. The network only refreshes the database.',
    explanation: {
      title: 'Single Source of Truth (SSOT)',
      text: 'In an offline-first architecture, the local database (such as Room) serves as the Single Source of Truth. The UI observes a Flow from the local database. When network requests succeed, they write directly into the database. The database then automatically notifies the Flow, updating the UI smoothly.',
      highlights: ['Local DB is the authoritative data source', 'Works instantly offline or on flight mode', 'Network responses update the DB, which emits to UI']
    }
  },
  {
    id: 'w10-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-repository',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Repository • Refresh Flow Execution',
    skill: 'offline_first',
    difficulty: 2,
    xpReward: 25,
    question: 'When `syncArticles()` is called while offline (network throws IOException), what does the UI observing `getArticles()` display?',
    codeFileName: 'OfflineSync.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun syncArticles() {',
      '    try {',
      '        val remoteArticles = remoteApi.fetchArticles()',
      '        localDao.insertAll(remoteArticles)',
      '    } catch (e: IOException) {',
      '        // Network failed (offline), silently catch',
      '    }',
      '}',
      'fun getArticles(): Flow<List<Article>> = localDao.observeArticles()'
    ],
    options: [
      { id: 'A', title: 'The UI continues displaying previously cached articles from the local database without crashing', subtitle: 'Because the UI observes the local database, network failures do not erase or block cached content', isCorrect: true },
      { id: 'B', title: 'The app crashes immediately with an unhandled IOException', subtitle: 'The try-catch block catches the network exception cleanly', isCorrect: false },
      { id: 'C', title: 'The local database is cleared and emits an empty list', subtitle: 'The local database retains all existing records', isCorrect: false },
      { id: 'D', title: 'The screen freezes until internet connectivity is restored', subtitle: 'Room database observations run asynchronously and remain responsive', isCorrect: false }
    ],
    hint: 'The UI is observing the local database, not the network call. If the network fails, previously saved DB records remain intact.',
    explanation: {
      title: 'Resilient Offline Caching',
      text: 'Because `getArticles()` reads directly from the local database, any network failure during `syncArticles()` does not interrupt the UI. The user can view cached data seamlessly even on an airplane or subway.',
      highlights: ['Cached data is displayed instantly', 'Network failures do not wipe cached data', 'Graceful degradation in offline environments']
    }
  },
  {
    id: 'w10-l2-c3',
    challengeType: 'code-completion',
    worldId: 'world-10',
    lessonId: 'arch-repository',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Repository • Interface Abstraction',
    skill: 'offline_first',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the repository interface definition to allow substituting fake/mock implementations during unit tests.',
    codeFileName: 'RepositoryContract.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '____ UserRepository {',
      '    fun observeUser(id: String): Flow<User?>',
      '    suspend fun refreshUser(id: String)',
      '}',
      'class DefaultUserRepository(...) : UserRepository { /* ... */ }'
    ],
    options: [
      { id: 'A', title: 'interface', subtitle: 'Declaring UserRepository as an interface allows production code and test fakes to adhere to the same contract', isCorrect: true },
      { id: 'B', title: 'abstract class', subtitle: 'While possible, interfaces are standard in Kotlin for lightweight architectural contracts', isCorrect: false },
      { id: 'C', title: 'sealed class', subtitle: 'Sealed classes restrict sub-classing within the same package, preventing test fakes in test modules', isCorrect: false },
      { id: 'D', title: 'open class', subtitle: 'Interfaces are preferred for defining repository contracts', isCorrect: false }
    ],
    hint: 'Use `interface` to define the boundary contract between domain logic and data sources.',
    explanation: {
      title: 'Repository Interface Abstraction',
      text: 'Defining repository contracts with `interface UserRepository` decouples the ViewModel from concrete data implementations. In unit tests, you can inject a `FakeUserRepository` that returns in-memory test data instantly without spinning up a mock HTTP server or SQLite database.',
      highlights: ['Enables test fakes without mocking frameworks', 'Decouples domain logic from I/O libraries', 'Promotes clean modular architecture']
    }
  },
  {
    id: 'w10-l2-c4',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-repository',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Repository • Database Transaction Atomicity',
    skill: 'offline_first',
    difficulty: 3,
    xpReward: 30,
    question: 'In the sync method below, if `insertAll` fails, `clearOld` has already deleted the user’s offline data! How should full cache replacement be made atomic?',
    codeFileName: 'AtomicCacheSync.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun syncTransactions(remoteList: List<Tx>) {',
      '    // Bug: Non-atomic execution leaves database empty if network or insert fails midway!',
      '    database.transactionDao().clearOld()',
      '    database.transactionDao().insertAll(remoteList)',
      '}'
    ],
    buggyLineIndex: 2,
    options: [
      { id: 'A', title: 'database.withTransaction { database.transactionDao().clearOld(); database.transactionDao().insertAll(remoteList) }', subtitle: 'Room\'s withTransaction executes both operations in a single atomic database transaction, rolling back on error', isCorrect: true },
      { id: 'B', title: 'synchronized(this) { database.transactionDao().clearOld(); database.transactionDao().insertAll(remoteList) }', subtitle: 'synchronized only locks JVM threads and does not provide SQLite database rollback guarantees', isCorrect: false },
      { id: 'C', title: 'withContext(Dispatchers.IO) { database.transactionDao().clearOld() }', subtitle: 'Dispatchers.IO changes threads but provides no database atomicity or rollback protection', isCorrect: false },
      { id: 'D', title: 'launch { database.transactionDao().clearOld() }', subtitle: 'Asynchronous launching makes operations race against each other', isCorrect: false }
    ],
    hint: 'Use Room\'s `withTransaction { ... }` extension to execute multiple database writes atomically.',
    explanation: {
      title: 'Atomic Database Synchronization with withTransaction',
      text: 'When replacing or updating multiple database tables during a sync, wrapping operations inside `database.withTransaction { ... }` ensures ACID atomicity. If any operation throws an exception, the entire transaction is rolled back, preventing corrupted or half-deleted offline states.',
      highlights: ['Guarantees all-or-nothing database writes', 'Rolls back automatically on failure', 'Prevents corrupted offline cache states']
    }
  },
  {
    id: 'w10-l2-c5',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-repository',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Repository • Data Mapping Between DTO and Domain Entity',
    skill: 'offline_first',
    difficulty: 2,
    xpReward: 25,
    question: 'Why do clean architecture repositories map Network DTOs (Data Transfer Objects) to clean Domain Models before returning them to ViewModels?',
    codeFileName: 'ModelMapping.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Network DTO from JSON:',
      'data class UserResponseDto(@SerializedName("usr_id_str") val id: String)',
      '',
      '// Domain Model:',
      'data class User(val id: String)',
      '',
      'fun UserResponseDto.toDomain(): User = User(id = this.id)'
    ],
    options: [
      { id: 'A', title: 'It isolates internal app business logic from external API schema changes and serialization annotations', subtitle: 'If the backend changes JSON field names or switches from Gson to Moshi/Kotlinx Serialization, only the DTO mapper changes', isCorrect: true },
      { id: 'B', title: 'It speeds up Kotlin runtime code execution by 500%', subtitle: 'Mapping introduces an extra object allocation; the value is architectural isolation, not raw CPU speed', isCorrect: false },
      { id: 'C', title: 'Because Kotlin forbids data classes from having more than one property', subtitle: 'Kotlin data classes can hold dozens of properties', isCorrect: false },
      { id: 'D', title: 'Because DTO objects cannot be stored in RAM', subtitle: 'All JVM objects reside in RAM memory', isCorrect: false }
    ],
    hint: 'What happens to your ViewModel and UI if the backend changes a JSON field name from `usr_id_str` to `user_id`?',
    explanation: {
      title: 'Separating DTOs from Domain Models',
      text: 'Keeping Network/Database DTOs separate from Domain Models insulates your core application from external changes. If the backend renames API fields or your persistence library changes, only the mapper function needs updating, keeping ViewModels, Use Cases, and UI untouched.',
      highlights: ['Shields app from backend API breaking changes', 'Domain models remain clean and annotation-free', 'Clear boundary between data source and business logic']
    }
  },

  // =========================================================================
  // LESSON 3: Result Monad & Functional Error Handling (5 questions)
  // =========================================================================
  {
    id: 'w10-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-result',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Result • Kotlin standard Result<T>',
    skill: 'result_monad',
    difficulty: 1,
    xpReward: 20,
    question: 'What is Kotlin’s built-in `Result<T>` type designed for?',
    codeFileName: 'ResultBasics.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val result: Result<Int> = runCatching {',
      '    "123".toInt()',
      '}'
    ],
    options: [
      { id: 'A', title: 'A discriminated union encapsulating a successful outcome with a value of type T or a failure with an arbitrary Throwable', subtitle: 'Result<T> allows treating success and failure as explicit first-class values rather than throwing exceptions', isCorrect: true },
      { id: 'B', title: 'An asynchronous future that always executes on thread pools', subtitle: 'Result is a synchronous value container, not a thread scheduler', isCorrect: false },
      { id: 'C', title: 'A replacement for standard Kotlin Boolean values', subtitle: 'Result represents execution outcomes (Success or Failure)', isCorrect: false },
      { id: 'D', title: 'A database table mapper for SQLite', subtitle: 'Result is part of the standard kotlin library for error handling', isCorrect: false }
    ],
    hint: 'Think about representing success or failure as a clean return value instead of throwing exceptions up the stack.',
    explanation: {
      title: 'Kotlin\'s Result<T> Monad',
      text: '`Result<T>` is Kotlin\'s standard representation of an operation\'s outcome. It encapsulates either a successful value `T` or an exception (`Throwable`), enabling functional error handling and passing outcomes as ordinary values.',
      highlights: ['Encapsulates Success(value) or Failure(throwable)', 'Eliminates unchecked exception throwing across layers', 'Optimized as an inlined value class']
    }
  },
  {
    id: 'w10-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-result',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Result • runCatching & fold',
    skill: 'result_monad',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this functional error recovery pipeline using `runCatching` and `fold`?',
    codeFileName: 'ResultFold.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val output = runCatching {',
      '    "not_a_number".toInt()',
      '}.fold(',
      '    onSuccess = { "Value: $it" },',
      '    onFailure = { "Fallback: 0" }',
      ')',
      'println(output)'
    ],
    options: [
      { id: 'A', title: 'Fallback: 0', subtitle: '"not_a_number".toInt() throws NumberFormatException, triggering the onFailure lambda branch', isCorrect: true },
      { id: 'B', title: 'Value: 0', subtitle: 'Parsing failed, so onSuccess is never executed', isCorrect: false },
      { id: 'C', title: 'Crash with NumberFormatException', subtitle: 'runCatching catches the exception cleanly into a Result.failure', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'fold transforms the result into a non-null String', isCorrect: false }
    ],
    hint: 'Parsing non-numeric text throws `NumberFormatException`, which `runCatching` catches into `Result.failure`. Which lambda branch does `fold` execute?',
    explanation: {
      title: 'Functional Error Handling with fold',
      text: '`runCatching { ... }` executes the block and captures any thrown exception into a `Result.failure`. Calling `.fold(onSuccess, onFailure)` processes the outcome cleanly, calling `onFailure` with the exception and returning `"Fallback: 0"`.',
      highlights: ['runCatching safely captures exceptions', 'fold transforms both success and failure outcomes', 'No unhandled crash occurs']
    }
  },
  {
    id: 'w10-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-10',
    lessonId: 'arch-result',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Result • getOrElse Default Provider',
    skill: 'result_monad',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the snippet using the idiomatic `Result` extension to return a fallback default value if the calculation threw an exception.',
    codeFileName: 'GetOrElseDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val portNumber: Int = runCatching {',
      '    System.getenv("PORT").toInt()',
      '}.____ { 8080 }'
    ],
    options: [
      { id: 'A', title: 'getOrElse', subtitle: 'result.getOrElse { default } returns the encapsulated value on success or the lambda result on failure', isCorrect: true },
      { id: 'B', title: 'orDefault', subtitle: 'orDefault is not standard Kotlin Result syntax', isCorrect: false },
      { id: 'C', title: 'fallback', subtitle: 'fallback does not exist on Result', isCorrect: false },
      { id: 'D', title: 'recoverWith', subtitle: 'recoverWith is Scala terminology, not Kotlin', isCorrect: false }
    ],
    hint: 'The method is named `getOrElse`, which takes a lambda returning the fallback.',
    explanation: {
      title: 'Result.getOrElse',
      text: '`getOrElse { exception -> fallback }` returns the encapsulated value if the Result was successful, or evaluates the lambda block to provide a fallback value if the Result was a failure.',
      highlights: ['Safe value unwrapping', 'Computes fallback only on failure', 'Clean alternative to try-catch-finally']
    }
  },
  {
    id: 'w10-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-result',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Result • Coroutine Cancellation Gotcha in runCatching',
    skill: 'result_monad',
    difficulty: 3,
    xpReward: 30,
    question: 'Line 2 uses `runCatching` inside a coroutine. But `runCatching` catches ALL Throwables, including `CancellationException`, which breaks structured concurrency and swallows cancellation! How should cooperative coroutine cancellation be preserved?',
    codeFileName: 'CancellationGotcha.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun loadUserData(): Result<User> {',
      '    return runCatching { // Bug: Swallows CancellationException!',
      '        delay(1000)',
      '        api.getUser()',
      '    }',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'Re-throw CancellationException: runCatching { ... }.onFailure { if (it is CancellationException) throw it }', subtitle: 'CancellationException must always be re-thrown in coroutines so parent scopes know the coroutine was cancelled', isCorrect: true },
      { id: 'B', title: 'Wrap the code in withContext(Dispatchers.Main)', subtitle: 'Switching dispatchers does not solve swallowed CancellationExceptions', isCorrect: false },
      { id: 'C', title: 'Replace delay(1000) with Thread.sleep(1000)', subtitle: 'Thread.sleep blocks the thread and worsens concurrency', isCorrect: false },
      { id: 'D', title: 'Cast the return type to Any', subtitle: 'Type casting has no effect on exception propagation', isCorrect: false }
    ],
    hint: 'In Kotlin Coroutines, `CancellationException` is used to signal job cancellation. If caught and swallowed, the coroutine fails to cancel cooperatively!',
    explanation: {
      title: 'The runCatching & CancellationException Antipattern',
      text: '`runCatching` catches `Throwable`, which includes Kotlin Coroutines\' `CancellationException`. If swallowed, the coroutine appears to finish with a failure instead of being cancelled, breaking parent-child coroutine hierarchy. Always rethrow `CancellationException` or use custom `runSuspendCatching` helpers.',
      highlights: ['Never swallow CancellationException', 'Structured concurrency requires cancellation propagation', 'Rethrow if it is CancellationException']
    }
  },
  {
    id: 'w10-l3-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-result',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Result • Domain-Specific Result Sealed Interface',
    skill: 'result_monad',
    difficulty: 2,
    xpReward: 25,
    question: 'Why do many production teams define custom domain-specific `DataResult<T, E>` sealed hierarchies instead of standard `kotlin.Result<T>`?',
    codeFileName: 'CustomResult.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed interface DataResult<out T, out E> {',
      '    data class Success<T>(val data: T) : DataResult<T, Nothing>',
      '    data class Error<E>(val error: E) : DataResult<Nothing, E>',
      '}'
    ],
    options: [
      { id: 'A', title: 'To enforce typed domain errors (e.g. NetworkTimeout, InvalidCredentials) rather than generic, untyped java.lang.Throwable exceptions', subtitle: 'Typed domain errors force callers to exhaustively handle specific business failure cases with compile-time verification', isCorrect: true },
      { id: 'B', title: 'Because kotlin.Result cannot hold primitive Ints', subtitle: 'kotlin.Result can hold any type, primitive or reference', isCorrect: false },
      { id: 'C', title: 'Custom sealed interfaces are 100x faster than standard library types', subtitle: 'Performance is virtually identical', isCorrect: false },
      { id: 'D', title: 'Because standard Result is deprecated in Kotlin 1.9', subtitle: 'Result is fully supported and part of standard library', isCorrect: false }
    ],
    hint: 'Standard `Result<T>` only holds `Throwable`. What if your error is an `enum class AuthError { WRONG_PASSWORD, ACCOUNT_LOCKED }`?',
    explanation: {
      title: 'Typed Domain Errors with Custom Result Hierarchies',
      text: 'While `kotlin.Result<T>` is great for capturing Java/Kotlin exceptions (`Throwable`), real business logic often has typed domain errors (like `UserNotFound`, `InsufficientFunds`). A typed `DataResult<T, E>` makes error variants strongly typed, enabling exhaustive compiler checks.',
      highlights: ['Type-safe domain error modeling', 'Avoids generic untyped Throwables', 'Exhaustive when expressions over error variants']
    }
  },

  // =========================================================================
  // LESSON 4: Dependency Injection Principles & Modularity (5 questions)
  // =========================================================================
  {
    id: 'w10-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-di',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'DI • Constructor Injection vs Service Locator',
    skill: 'dependency_injection',
    difficulty: 2,
    xpReward: 25,
    question: 'Why is Constructor Injection considered superior to hardcoding dependencies inside class constructors or using global singletons?',
    codeFileName: 'ConstructorInjection.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Pattern A (Hardcoded tight coupling):',
      'class BadService {',
      '    private val api = RetrofitClient.createApi()',
      '}',
      '',
      '// Pattern B (Constructor Injection):',
      'class GoodService(private val api: ApiClient) { /* ... */ }'
    ],
    options: [
      { id: 'A', title: 'It exposes all dependencies explicitly, makes classes decoupled, and allows effortlessly passing mock/fake implementations during unit tests', subtitle: 'Constructor injection follows the Inversion of Control (IoC) principle and prevents hidden dependencies', isCorrect: true },
      { id: 'B', title: 'Constructor injection reduces Android APK size by half', subtitle: 'Constructor injection does not compress binary size', isCorrect: false },
      { id: 'C', title: 'Constructor injection guarantees that all code runs on the GPU', subtitle: 'Dependency injection is an architectural pattern, not a hardware GPU dispatcher', isCorrect: false },
      { id: 'D', title: 'Constructor injection eliminates the need for unit tests completely', subtitle: 'Constructor injection makes unit testing much easier and more reliable', isCorrect: false }
    ],
    hint: 'How can you unit test `BadService` without actually hitting a live network backend server?',
    explanation: {
      title: 'Constructor Injection & Inversion of Control',
      text: 'Constructor injection makes dependencies explicit: a caller cannot instantiate the class without providing its required collaborators. This eliminates hidden dependencies, prevents global mutable state, and allows unit tests to inject fakes or mocks instantly.',
      highlights: ['Explicit dependencies in constructor', 'Effortless unit testing with fakes', 'Decoupled and modular design']
    }
  },
  {
    id: 'w10-l4-c2',
    challengeType: 'code-completion',
    worldId: 'world-10',
    lessonId: 'arch-di',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'DI • Lazy Dependency Initialization with by lazy',
    skill: 'dependency_injection',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the property declaration to lazily instantiate an expensive database instance only when it is first accessed.',
    codeFileName: 'LazyInjection.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class AppContainer(private val context: Context) {',
      '    val database: AppDatabase ____ {',
      '        Room.databaseBuilder(context, AppDatabase::class.java, "app.db").build()',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'by lazy', subtitle: 'by lazy { ... } computes the value thread-safely on first property access and caches the result for future reads', isCorrect: true },
      { id: 'B', title: 'by remember', subtitle: 'remember is for Composable UI trees, not non-Composable container classes', isCorrect: false },
      { id: 'C', title: '= defer', subtitle: 'defer is not a built-in Kotlin keyword or delegate', isCorrect: false },
      { id: 'D', title: 'by observable', subtitle: 'observable is for listening to property mutations', isCorrect: false }
    ],
    hint: 'Use Kotlin\'s standard library delegate `by lazy { ... }` for thread-safe deferred initialization.',
    explanation: {
      title: 'Lazy Initialization with by lazy',
      text: 'In manual dependency injection containers (AppContainer), using `val db: AppDatabase by lazy { ... }` defers initialization until the database is actually needed. The initialization is thread-safe by default (`LazyThreadSafetyMode.SYNCHRONIZED`) and caches the instance.',
      highlights: ['Initializes only on first access', 'Thread-safe by default', 'Saves memory and startup time']
    }
  },
  {
    id: 'w10-l4-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-di',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'DI • Interface Segregation Principle',
    skill: 'dependency_injection',
    difficulty: 2,
    xpReward: 25,
    question: 'How does the Interface Segregation Principle (ISP) improve dependency injection and clean architecture in Kotlin?',
    codeFileName: 'InterfaceSegregation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Fat Interface:',
      'interface MegaUserOperations {',
      '    fun readProfile(): Profile',
      '    fun updatePassword(pass: String)',
      '    fun deleteAccount()',
      '    fun chargeCreditCard(cents: Long)',
      '}',
      '',
      '// Segregated Interfaces:',
      'interface ProfileReader { fun readProfile(): Profile }',
      'interface PasswordManager { fun updatePassword(pass: String) }'
    ],
    options: [
      { id: 'A', title: 'Clients should not be forced to depend on methods they do not use; fine-grained interfaces reduce coupling and prevent accidental misuse', subtitle: 'A component displaying a profile picture only needs ProfileReader, not authority to charge credit cards or delete accounts', isCorrect: true },
      { id: 'B', title: 'It automatically encrypts all interface methods with AES-256', subtitle: 'ISP is an architectural design principle, not an encryption algorithm', isCorrect: false },
      { id: 'C', title: 'It forces Kotlin to generate separate bytecode files for every method', subtitle: 'Bytecode generation follows standard JVM rules', isCorrect: false },
      { id: 'D', title: 'It allows classes to inherit from multiple abstract classes', subtitle: 'Kotlin uses single class inheritance with multiple interface implementations', isCorrect: false }
    ],
    hint: 'Why should a simple UI badge displaying a user\'s name have access to a method that charges credit cards?',
    explanation: {
      title: 'Interface Segregation Principle (ISP)',
      text: 'The Interface Segregation Principle states that no client should be forced to depend on methods it does not use. By splitting large ("fat") interfaces into focused contracts, dependencies become narrow, secure, and easier to mock in tests.',
      highlights: ['Clients depend only on what they need', 'Prevents accidental calls to dangerous methods', 'Minimizes test fake boilerplate']
    }
  },
  {
    id: 'w10-l4-c4',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-di',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'DI • Scoping: Singleton vs Factory Instance',
    skill: 'dependency_injection',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when calling `getService()` twice on this manual DI Container?',
    codeFileName: 'ContainerScoping.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class SimpleContainer {',
      '    // Factory (new instance each call):',
      '    fun getTransientService(): Any = Object()',
      '    // Singleton (same instance):',
      '    val singletonService: Any by lazy { Object() }',
      '}',
      'val container = SimpleContainer()',
      'println(container.getTransientService() === container.getTransientService())',
      'println(container.singletonService === container.singletonService)'
    ],
    options: [
      { id: 'A', title: 'false\ntrue', subtitle: 'getTransientService() returns a new instance every call (false); singletonService returns the exact same cached instance (true)', isCorrect: true },
      { id: 'B', title: 'true\ntrue', subtitle: 'Factory methods create new instances on every call', isCorrect: false },
      { id: 'C', title: 'false\nfalse', subtitle: 'by lazy caches the initialized instance', isCorrect: false },
      { id: 'D', title: 'true\nfalse', subtitle: 'The reverse is true: factory is false, singleton is true', isCorrect: false }
    ],
    hint: '`===` checks referential identity (same memory address). A factory method creates a new object every time.',
    explanation: {
      title: 'DI Scoping: Transient Factory vs. Singleton',
      text: 'In dependency injection, scope defines an instance\'s lifetime. A factory/transient binding creates a new instance on every request (`===` returns `false`). A singleton binding creates the object once and reuses that same instance for all subsequent injections (`===` returns `true`).',
      highlights: ['Factory creates fresh instances per injection', 'Singleton reuses a shared single instance', '=== checks referential identity']
    }
  },
  {
    id: 'w10-l4-c5',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-di',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'DI • Memory Leaks with Context',
    skill: 'dependency_injection',
    difficulty: 3,
    xpReward: 30,
    question: 'Line 2 injects an `Activity` Context into a Singleton Repository. When the user rotates their phone, the Activity is destroyed, but the Singleton holds onto it, causing a severe memory leak! What should be injected instead?',
    codeFileName: 'ContextLeak.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'object RepositoryLocator {',
      '    // Bug: Holding Activity context in a singleton leaks the entire Activity and View tree!',
      '    private var activityContext: Activity? = null',
      '    ',
      '    fun init(activity: Activity) {',
      '        activityContext = activity',
      '    }',
      '}'
    ],
    buggyLineIndex: 2,
    options: [
      { id: 'A', title: 'Inject applicationContext: Context (tied to process lifecycle, not ephemeral Activity)', subtitle: 'The Application context lives as long as the app process and is safe to hold in singletons without leaking activities', isCorrect: true },
      { id: 'B', title: 'Make the activity variable volatile', subtitle: 'volatile does not prevent garbage collector reference retention', isCorrect: false },
      { id: 'C', title: 'Cast Activity to Any', subtitle: 'Casting to Any still retains the strong reference on the heap', isCorrect: false },
      { id: 'D', title: 'Store the Activity in ThreadLocal', subtitle: 'ThreadLocal does not solve singleton lifecycle leaks', isCorrect: false }
    ],
    hint: 'Never hold an `Activity` context in singletons. Always use `applicationContext`.',
    explanation: {
      title: 'Preventing Context Leaks in Singletons',
      text: 'An `Activity` contains references to its entire view hierarchy, Compose nodes, and system services. Holding an Activity in a singleton prevents the JVM garbage collector from reclaiming it on orientation changes, leaking megabytes of memory. Always use `applicationContext` for singleton dependencies.',
      highlights: ['Never store Activity in singletons or repositories', 'Use applicationContext for long-lived components', 'Prevents massive Android memory leaks']
    }
  },

  // =========================================================================
  // LESSON 5: Modern Kotlin Idioms & Best Practices (5 questions)
  // =========================================================================
  {
    id: 'w10-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-10',
    lessonId: 'arch-idioms',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Idioms • Value Classes with @JvmInline',
    skill: 'kotlin_idioms',
    difficulty: 2,
    xpReward: 25,
    question: 'What runtime performance advantage does a `@JvmInline value class` provide over a regular data class wrapper?',
    codeFileName: 'ValueClassOptimization.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '@JvmInline',
      'value class UserId(val value: String)',
      '',
      'fun fetchProfile(id: UserId) { /* ... */ }'
    ],
    options: [
      { id: 'A', title: 'It provides type safety at compile time while the Kotlin compiler inlines the underlying primitive/reference at runtime, avoiding object allocation overhead', subtitle: 'At runtime, UserId is treated directly as a String without allocating a wrapper object on the heap', isCorrect: true },
      { id: 'B', title: 'It forces the class to be saved to disk immediately', subtitle: 'Value classes are an in-memory optimization and have nothing to do with disk persistence', isCorrect: false },
      { id: 'C', title: 'It allows the class to inherit from multiple abstract classes', subtitle: 'Value classes cannot extend classes (they can only implement interfaces)', isCorrect: false },
      { id: 'D', title: 'It converts the String into a 64-bit integer hash', subtitle: 'The underlying value is preserved exactly as declared', isCorrect: false }
    ],
    hint: 'Value classes give you strong domain typing (e.g. `UserId` vs `OrderId`) with ZERO runtime heap allocation overhead.',
    explanation: {
      title: '@JvmInline Value Classes',
      text: 'Value classes wrap a single property with a domain-specific type (e.g., `UserId`, `EmailAddress`). The Kotlin compiler enforces type safety during compilation, but inlines the raw underlying type in the generated bytecode whenever possible, eliminating wrapper object allocation on the heap.',
      highlights: ['Compile-time domain type safety', 'Zero runtime object allocation overhead', 'Inlines underlying property in bytecode']
    }
  },
  {
    id: 'w10-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-idioms',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Idioms • Class Delegation with by',
    skill: 'kotlin_idioms',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this demonstration of Kotlin\'s first-class class delegation using the `by` keyword?',
    codeFileName: 'ClassDelegation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'interface Greeter { fun greet(): String }',
      '',
      'class EnglishGreeter : Greeter {',
      '    override fun greet() = "Hello"' ,
      '}',
      '',
      'class DecoratedGreeter(greeter: Greeter) : Greeter by greeter {',
      '    fun shout() = "${greet().uppercase()}!"',
      '}',
      '',
      'val decorated = DecoratedGreeter(EnglishGreeter())',
      'println(decorated.greet())',
      'println(decorated.shout())'
    ],
    options: [
      { id: 'A', title: 'Hello\nHELLO!', subtitle: 'The greet() call is automatically forwarded to the underlying delegate EnglishGreeter by the compiler', isCorrect: true },
      { id: 'B', title: 'HELLO!\nHELLO!', subtitle: 'decorated.greet() calls the original un-shouted delegate method', isCorrect: false },
      { id: 'C', title: 'null\nnull', subtitle: 'Both methods return non-null Strings', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Kotlin natively supports implementation delegation with the `by` keyword', isCorrect: false }
    ],
    hint: 'Class delegation with `by greeter` forwards all interface methods to the delegate unless explicitly overridden.',
    explanation: {
      title: 'Class Delegation with the by Keyword',
      text: 'Kotlin has built-in support for the Decorator pattern via class delegation. Writing `class DecoratedGreeter(greeter: Greeter) : Greeter by greeter` tells the compiler to generate boilerplate forwarding stubs for every method in `Greeter`, favoring composition over inheritance effortlessly.',
      highlights: ['Native decorator pattern support', 'Favors composition over inheritance', 'Zero manual forwarding boilerplate']
    }
  },
  {
    id: 'w10-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-10',
    lessonId: 'arch-idioms',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Idioms • Sealed Interface vs Sealed Class',
    skill: 'kotlin_idioms',
    difficulty: 2,
    xpReward: 25,
    question: 'Why are `sealed interface` declarations preferred over `sealed class` in modern Kotlin when sub-types do not require constructor state sharing?',
    codeFileName: 'SealedInterfaceAdvantage.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'sealed ____ NavigationEvent {',
      '    data class NavigateTo(val route: String) : NavigationEvent',
      '    object PopBackStack : NavigationEvent',
      '}'
    ],
    options: [
      { id: 'A', title: 'interface', subtitle: 'Sealed interfaces allow sub-types to implement multiple sealed hierarchies and do not restrict inheritance hierarchies', isCorrect: true },
      { id: 'B', title: 'enum', subtitle: 'Enum cannot contain nested data classes', isCorrect: false },
      { id: 'C', title: 'struct', subtitle: 'struct is not a Kotlin keyword', isCorrect: false },
      { id: 'D', title: 'annotation', subtitle: 'Annotation classes are for metadata, not navigation event modeling', isCorrect: false }
    ],
    hint: 'Use `sealed interface` for flexible multi-inheritance hierarchies.',
    explanation: {
      title: 'Sealed Interfaces in Modern Kotlin',
      text: 'Introduced in Kotlin 1.5, `sealed interface` provides the exact same exhaustive `when` compiler checks as `sealed class`, but with two massive advantages: a sub-class can implement multiple sealed interfaces, and it doesn\'t consume the single class inheritance slot.',
      highlights: ['Allows multiple sealed interface implementations', 'Leaves class inheritance open for Base classes', 'Identical exhaustive when compile-time safety']
    }
  },
  {
    id: 'w10-l5-c4',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-idioms',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Idioms • Exhaustive when with Sealed Types',
    skill: 'kotlin_idioms',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 6 uses an `else` branch for a sealed hierarchy. Adding a new subtype later will silently fall into `else` without warning, causing hidden production bugs! How should sealed `when` expressions be written for true compile-time safety?',
    codeFileName: 'ExhaustiveWhenFix.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun handleEvent(event: NavigationEvent) {',
      '    when (event) {',
      '        is NavigationEvent.NavigateTo -> router.go(event.route)',
      '        // Bug: else branch conceals missing cases when new events are added!',
      '        else -> router.back()',
      '    }',
      '}'
    ],
    buggyLineIndex: 4,
    options: [
      { id: 'A', title: 'Explicitly enumerate all branches (e.g. NavigationEvent.PopBackStack -> router.back()) and omit the else branch entirely', subtitle: 'Omitting else forces the Kotlin compiler to check for exhaustiveness whenever new subtypes are added', isCorrect: true },
      { id: 'B', title: 'Add a try-catch block around the when statement', subtitle: 'Missing cases in non-exhaustive when do not throw exceptions; they silently do nothing or run else', isCorrect: false },
      { id: 'C', title: 'Convert the sealed interface into an Any type', subtitle: 'Any destroys type safety and compiler checking', isCorrect: false },
      { id: 'D', title: 'Replace when with multiple if-else statements', subtitle: 'if-else without return is not exhaustively checked by the compiler', isCorrect: false }
    ],
    hint: 'Never use an `else` branch on a sealed type unless strictly necessary! Explicitly listing all branches ensures the compiler alerts you when someone adds a new subtype.',
    explanation: {
      title: 'The Danger of else in Sealed when Expressions',
      text: 'When you include an `else` branch in a `when` expression over a sealed type, you disable the compiler\'s exhaustiveness checking. If another developer adds a new event (e.g. `Logout`), the compiler will not warn you, and it will silently execute the `else` branch. Explicitly listing all cases guarantees compile-time alerts.',
      highlights: ['Avoid `else` on sealed hierarchies', 'Guarantees compile errors when new cases are introduced', 'Enforces strict feature completeness across the app']
    }
  },
  {
    id: 'w10-l5-c5',
    challengeType: 'output-prediction',
    worldId: 'world-10',
    lessonId: 'arch-idioms',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'Idioms • Custom Type-Safe Builder DSL',
    skill: 'kotlin_idioms',
    difficulty: 3,
    xpReward: 30,
    question: 'What is printed by this custom type-safe query builder DSL using lambdas with receiver (`QueryBuilder.() -> Unit`)?',
    codeFileName: 'TypeSafeDsl.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class QueryBuilder {',
      '    var table = ""',
      '    var limit = 10',
      '    fun build() = "SELECT * FROM $table LIMIT $limit"',
      '}',
      '',
      'fun query(block: QueryBuilder.() -> Unit): String {',
      '    val builder = QueryBuilder()',
      '    builder.block()',
      '    return builder.build()',
      '}',
      '',
      'val sql = query {',
      '    table = "users"',
      '    limit = 50',
      '}',
      'println(sql)'
    ],
    options: [
      { id: 'A', title: 'SELECT * FROM users LIMIT 50', subtitle: 'Lambdas with receiver configure the QueryBuilder instance in-place with clean declarative syntax', isCorrect: true },
      { id: 'B', title: 'SELECT * FROM  LIMIT 10', subtitle: 'The block updated table to "users" and limit to 50', isCorrect: false },
      { id: 'C', title: 'QueryBuilder@1a2b3c', subtitle: 'The function returns the String produced by builder.build()', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Kotlin natively supports DSL building via lambdas with receiver', isCorrect: false }
    ],
    hint: 'The lambda `QueryBuilder.() -> Unit` runs with `builder` as `this`, configuring `table` and `limit`.',
    explanation: {
      title: 'Type-Safe Builders & DSLs with Lambdas with Receiver',
      text: 'Kotlin allows creating rich domain-specific languages (DSLs) using "function types with receiver" (`Receiver.() -> Unit`). Inside the lambda block, methods and properties of the receiver class can be called directly without qualifiers, producing clean, declarative APIs like Gradle, HTML builders, and Compose.',
      highlights: ['Lambdas with receiver (`T.() -> Unit`)', 'Powers Compose, Gradle Kotlin DSL, and Ktor', 'Declarative configuration syntax with compile-time type safety']
    }
  },

  // =========================================================================
  // LESSON 6: WORLD BOSS: Grandmaster Capstone (1 Boss Question)
  // =========================================================================
  {
    id: 'w10-boss-c1',
    challengeType: 'bug-fix',
    worldId: 'world-10',
    lessonId: 'arch-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Real-World Architecture & Clean Code',
    topicTag: 'World Boss • Enterprise Fintech Architecture Pipeline',
    skill: 'grandmaster_capstone',
    difficulty: 3,
    xpReward: 50,
    question: 'FINAL WORLD BOSS: Grandmaster Capstone! This enterprise FinTech Transfer Engine combines offline-first repositories, Result monads, and ViewModel UI State. However, line 11 introduces a critical architectural flaw that breaks Unidirectional Data Flow and risks duplicate transactions! Identify and fix the defect.',
    codeFileName: 'FintechTransferEngine.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'class TransferViewModel(',
      '    private val repository: TransferRepository,',
      '    private val userManager: UserManager',
      ') : ViewModel() {',
      '    private val _uiState = MutableStateFlow<TransferUiState>(TransferUiState.Idle)',
      '    val uiState: StateFlow<TransferUiState> = _uiState.asStateFlow()',
      '',
      '    fun executeTransfer(amountCents: Long, targetAccount: String) {',
      '        viewModelScope.launch {',
      '            _uiState.value = TransferUiState.Processing',
      '            // Bug: Direct mutation of global singleton user balance from ViewModel bypassing Repository atomicity!',
      '            userManager.cachedBalanceCents -= amountCents',
      '            ',
      '            val result = repository.transferFunds(amountCents, targetAccount)',
      '            result.fold(',
      '                onSuccess = { _uiState.value = TransferUiState.Success(it.transactionId) },',
      '                onFailure = { _uiState.value = TransferUiState.Failed(it.message ?: "Error") }',
      '            )',
      '        }',
      '    }',
      '}'
    ],
    buggyLineIndex: 11,
    options: [
      { id: 'A', title: 'Remove direct cached balance mutation; let repository.transferFunds() handle balance deduction atomically in the database and emit updated balance via SSOT Flow', subtitle: 'Mutating in-memory singletons directly from ViewModels bypasses ACID transactions and causes state desynchronization on network failure', isCorrect: true },
      { id: 'B', title: 'Replace viewModelScope.launch with Thread { ... }.start()', subtitle: 'Using raw Java threads bypasses coroutine cancellation and crashes ViewModels', isCorrect: false },
      { id: 'C', title: 'Change _uiState type to public MutableLiveData', subtitle: 'StateFlow with backing property pattern is the modern standard; public mutable LiveData degrades encapsulation', isCorrect: false },
      { id: 'D', title: 'Catch and ignore all exceptions silently', subtitle: 'Silent exception swallowing masks network failures and corrupts user accounting', isCorrect: false }
    ],
    hint: 'Never mutate cached business state directly from a ViewModel! The Repository is the Single Source of Truth that executes atomic updates.',
    explanation: {
      title: 'Congratulations! 90-Day Kotlin Grandmaster Achieved!',
      text: 'You have defeated the final World Boss and conquered the 90-Day Kotlin Mastery Curriculum! Direct mutation of global in-memory state from a ViewModel violates Single Source of Truth (SSOT). If `repository.transferFunds()` fails over the network, the user\'s local balance would remain deducted! The Repository must handle transactional atomicity, letting data flow back reactively to the UI.',
      highlights: [
        'Single Source of Truth (SSOT) preserves state integrity',
        'Repository coordinates network and database transactions atomically',
        'ViewModels strictly observe state and dispatch user intents',
        'You have mastered Kotlin from Foundations to Enterprise Architecture!'
      ]
    }
  }
];
