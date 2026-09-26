import { LessonQuestion } from '../../types';

export const WORLD_8_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Suspending Functions & Suspension Points (5 questions)
  // =========================================================================
  {
    id: 'w8-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'suspend-basics',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Coroutines • The suspend Modifier',
    skill: 'suspend',
    difficulty: 1,
    xpReward: 20,
    question: 'What does the `suspend` keyword signify when added to a function signature in Kotlin?',
    codeFileName: 'SuspendDecl.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun fetchUserProfile(userId: String): UserProfile {',
      '    delay(1000)',
      '    return api.getUser(userId)',
      '}'
    ],
    options: [
      { id: 'A', title: 'The function can pause execution without blocking the underlying OS thread and resume later', subtitle: 'Suspension releases the carrier thread to execute other coroutines until computation is ready', isCorrect: true },
      { id: 'B', title: 'The function executes on a separate daemon thread created by the OS', subtitle: 'Coroutines are lightweight user-space constructs, not 1:1 OS threads', isCorrect: false },
      { id: 'C', title: 'The function runs synchronously and freezes the calling thread for the duration', subtitle: 'Suspension explicitly avoids blocking the calling thread', isCorrect: false },
      { id: 'D', title: 'The function can only be invoked from Java code', subtitle: 'suspend is a Kotlin-native keyword for asynchronous coroutine execution', isCorrect: false }
    ],
    hint: 'Think about non-blocking suspension: what happens to the underlying thread while waiting?',
    explanation: {
      title: 'Suspending Functions in Kotlin',
      text: 'A suspending function can pause execution at suspension points (like delay() or network requests) and later resume execution on the same or another thread without blocking the calling thread. The Kotlin compiler translates suspending functions into state machines using Continuation-Passing Style (CPS).',
      highlights: ['Pauses without blocking threads', 'Compiler transforms to Continuation (CPS)', 'Carrier thread is freed for other work']
    }
  },
  {
    id: 'w8-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'suspend-basics',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Coroutines • delay vs Thread.sleep',
    skill: 'suspend',
    difficulty: 1,
    xpReward: 20,
    question: 'How does calling `delay(1000)` differ from calling `Thread.sleep(1000)` inside a coroutine?',
    codeFileName: 'DelayVsSleep.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun waitNonBlocking() {',
      '    delay(1000) // Non-blocking suspension',
      '}',
      'fun waitBlocking() {',
      '    Thread.sleep(1000) // Blocking sleep',
      '}'
    ],
    options: [
      { id: 'A', title: 'delay pauses the coroutine leaving the thread free, while Thread.sleep blocks the thread entirely', subtitle: 'delay is a suspend function; Thread.sleep halts the entire OS thread preventing other tasks', isCorrect: true },
      { id: 'B', title: 'Thread.sleep releases the thread while delay blocks it', subtitle: 'The opposite is true: Thread.sleep is blocking, delay is non-blocking', isCorrect: false },
      { id: 'C', title: 'Both functions perform the exact same underlying JVM thread sleep', subtitle: 'delay registers a timer and suspends, never parking the carrier thread', isCorrect: false },
      { id: 'D', title: 'delay throws an InterruptedException when called', subtitle: 'delay suspends cleanly and responds to cancellation via CancellationException', isCorrect: false }
    ],
    hint: 'delay() is a suspending function; Thread.sleep() holds onto the thread and prevents any other work on it.',
    explanation: {
      title: 'Non-Blocking delay vs. Thread.sleep',
      text: 'delay() is a special suspending function that pauses the coroutine for the given duration, releasing the underlying thread to do other work (such as handling UI touches or running other coroutines). In contrast, Thread.sleep() blocks the OS thread completely, preventing any work from running on that thread.',
      highlights: ['delay() frees the underlying thread', 'Thread.sleep() blocks the OS thread', 'delay() is cancellable']
    }
  },
  {
    id: 'w8-l1-c3',
    challengeType: 'bug-fix',
    worldId: 'world-8',
    lessonId: 'suspend-basics',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Coroutines • Suspension Context Rule',
    skill: 'suspend',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 fails to compile with: "Suspend function \'fetchData\' should be called only from a coroutine or another suspend function". How must `processData` be declared?',
    codeFileName: 'SuspendCallRule.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun processData() {',
      '    val data = fetchData()',
      '    println(data)',
      '}',
      'suspend fun fetchData(): String = "Data"'
    ],
    buggyLineIndex: 0,
    options: [
      { id: 'A', title: 'suspend fun processData() {', subtitle: 'Marking processData as suspend allows it to invoke other suspending functions directly', isCorrect: true },
      { id: 'B', title: 'async fun processData() {', subtitle: 'async is a coroutine builder function, not a function declaration modifier', isCorrect: false },
      { id: 'C', title: 'inline fun processData() {', subtitle: 'Inlining alone does not grant suspension context', isCorrect: false },
      { id: 'D', title: 'threaded fun processData() {', subtitle: 'threaded is not a valid Kotlin keyword', isCorrect: false }
    ],
    hint: 'In Kotlin, you can only invoke a suspend function from within another suspend function or inside a coroutine builder block.',
    explanation: {
      title: 'The Suspension Calling Context Rule',
      text: 'Because suspending functions require a Continuation parameter behind the scenes to manage suspension and resumption, they can only be called from within another suspending function (which provides the continuation) or from a coroutine builder like launch, async, or runBlocking.',
      highlights: ['Only callable from suspend or coroutine builders', 'Requires Continuation under the hood', 'Compile-time enforcement of asynchronous safety']
    }
  },
  {
    id: 'w8-l1-c4',
    challengeType: 'code-completion',
    worldId: 'world-8',
    lessonId: 'suspend-basics',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Coroutines • Sequential Execution by Default',
    skill: 'suspend',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the snippet to demonstrate that consecutive calls to suspending functions run sequentially by default inside a coroutine.',
    codeFileName: 'SequentialSuspend.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun loadUserData(): String {',
      '    val name = fetchName()',
      '    val email = ____',
      '    return "$name <$email>"',
      '}'
    ],
    options: [
      { id: 'A', title: 'fetchEmail()', subtitle: 'Consecutive calls without explicit concurrency builders execute sequentially in natural procedural order', isCorrect: true },
      { id: 'B', title: 'async { fetchEmail() }', subtitle: 'async creates a Deferred object rather than returning the String directly', isCorrect: false },
      { id: 'C', title: 'thread { fetchEmail() }', subtitle: 'thread creates an OS thread and does not return the direct value', isCorrect: false },
      { id: 'D', title: 'await fetchEmail()', subtitle: 'await is a method on Deferred, not a keyword preceding a function call', isCorrect: false }
    ],
    hint: 'Inside a suspending function, regular calls to other suspending functions look and behave like normal sequential code.',
    explanation: {
      title: 'Sequential by Default',
      text: 'Code inside coroutines executes sequentially by default, just like standard synchronous code. Calling fetchName() suspends until it returns, and only then is fetchEmail() invoked. This eliminates callback hell while maintaining non-blocking performance.',
      highlights: ['Sequential execution by default', 'No callback nesting or promises required', 'Natural imperative control flow']
    }
  },
  {
    id: 'w8-l1-c5',
    challengeType: 'code-ordering',
    worldId: 'world-8',
    lessonId: 'suspend-basics',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Coroutines • Suspend Execution Order',
    skill: 'suspend',
    difficulty: 2,
    xpReward: 25,
    question: 'Arrange the code blocks to define a suspending function that fetches an auth token, uses it to fetch data, and returns the formatted result.',
    codeFileName: 'SequentialFlow.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Target: Suspending function executing token retrieval then data query'
    ],
    codeOrderingItems: [
      { id: 'order-1', code: 'suspend fun getSecureData(): String {' },
      { id: 'order-2', code: '    val token = fetchToken()' },
      { id: 'order-3', code: '    val record = queryDatabase(token)' },
      { id: 'order-4', code: '    return "Result: $record"\n}' }
    ],
    correctOrderIds: ['order-1', 'order-2', 'order-3', 'order-4'],
    options: [
      { id: 'A', title: 'Signature -> Fetch token -> Query with token -> Return formatted result', subtitle: 'Each step suspends until completed before proceeding to the next dependent step', isCorrect: true },
      { id: 'B', title: 'Query with token -> Fetch token -> Signature -> Return', subtitle: 'Cannot query database before token is retrieved', isCorrect: false },
      { id: 'C', title: 'Signature -> Query with token -> Fetch token -> Return', subtitle: 'Token variable would not be in scope', isCorrect: false },
      { id: 'D', title: 'Fetch token -> Signature -> Query with token -> Return', subtitle: 'Statements must reside inside the function body', isCorrect: false }
    ],
    hint: 'First declare the suspend function, fetch the token, pass the token into the query, and return the result.',
    explanation: {
      title: 'Suspension Workflow',
      text: 'Sequential suspension allows dependent asynchronous operations to be written sequentially without nested callbacks. The function suspends during fetchToken(), resumes, passes the token to queryDatabase(token), suspends again, and finally returns the string.',
      highlights: ['Dependent calls execute naturally in sequence', 'Clean imperative asynchronous code', 'Zero thread blocking during waits']
    }
  },

  // =========================================================================
  // LESSON 2: Builders: launch, async & runBlocking (5 questions)
  // =========================================================================
  {
    id: 'w8-l2-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'coroutine-builders',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Builders • launch vs async',
    skill: 'builders',
    difficulty: 2,
    xpReward: 25,
    question: 'What is the fundamental difference between the `launch` and `async` coroutine builders?',
    codeFileName: 'LaunchVsAsync.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// Builder 1:',
      'val job = scope.launch { doBackgroundWork() }',
      '// Builder 2:',
      'val deferred = scope.async { computeScore() }'
    ],
    options: [
      { id: 'A', title: 'launch returns a Job for "fire-and-forget" tasks without a return value, while async returns a Deferred<T> that yields a result via .await()', subtitle: 'launch is designed for side-effects; async is designed for computing and returning values', isCorrect: true },
      { id: 'B', title: 'launch is synchronous while async is asynchronous', subtitle: 'Both launch and async start coroutines asynchronously', isCorrect: false },
      { id: 'C', title: 'launch runs on the main thread while async runs on a background thread', subtitle: 'Dispatchers determine the thread, not the builder itself', isCorrect: false },
      { id: 'D', title: 'async cannot be cancelled once started', subtitle: 'Deferred inherits from Job and can be cancelled at any time', isCorrect: false }
    ],
    hint: 'Check the return types: launch returns Job, while async returns Deferred<T> which has an await() method.',
    explanation: {
      title: 'launch vs. async',
      text: 'launch creates a coroutine without returning a result value; it returns a Job object used to manage lifecycle (cancelling or waiting via .join()). async creates a coroutine that computes a value; it returns a Deferred<T> (a light-weight Future) whose result is retrieved using .await().',
      highlights: ['launch -> Job (fire-and-forget, Unit)', 'async -> Deferred<T> (computes a value)', '.await() suspends until Deferred is ready']
    }
  },
  {
    id: 'w8-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'coroutine-builders',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Builders • Parallel Decomposition with async',
    skill: 'builders',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this concurrent coroutine calculation using `async` and `await()`?',
    codeFileName: 'ConcurrentAsync.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'runBlocking {',
      '    val deferred1 = async { 10 + 5 }',
      '    val deferred2 = async { 20 * 2 }',
      '    val result = deferred1.await() + deferred2.await()',
      '    println("Total: $result")',
      '}'
    ],
    options: [
      { id: 'A', title: 'Total: 55', subtitle: 'deferred1 yields 15 and deferred2 yields 40; 15 + 40 = 55', isCorrect: true },
      { id: 'B', title: 'Total: 35', subtitle: 'Calculation: 15 + 40 equals 55, not 35', isCorrect: false },
      { id: 'C', title: 'Total: null', subtitle: 'await() returns the non-null Int result', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'runBlocking provides a CoroutineScope permitting async and await', isCorrect: false }
    ],
    hint: 'Both async blocks execute concurrently: 10 + 5 = 15, and 20 * 2 = 40. Then their results are awaited and added.',
    explanation: {
      title: 'Concurrent Decomposition with async',
      text: 'By calling async twice in parallel, both background computations execute concurrently. Calling deferred1.await() and deferred2.await() suspends until both values are ready, summing 15 + 40 = 55.',
      highlights: ['Multiple async blocks run concurrently', 'await() retrieves the computed value', 'Enables structured parallel decomposition']
    }
  },
  {
    id: 'w8-l2-c3',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'coroutine-builders',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Builders • runBlocking Purpose',
    skill: 'builders',
    difficulty: 2,
    xpReward: 25,
    question: 'When is it appropriate to use the `runBlocking` coroutine builder?',
    codeFileName: 'RunBlockingUsage.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'fun main() = runBlocking {',
      '    val data = fetchData()',
      '    println(data)',
      '}'
    ],
    options: [
      { id: 'A', title: 'In top-level main functions and unit tests to bridge non-coroutine blocking code with suspending code', subtitle: 'runBlocking blocks the current thread until all children coroutines finish', isCorrect: true },
      { id: 'B', title: 'Inside Android UI event listeners to perform network calls', subtitle: 'Calling runBlocking on Android\'s UI thread freezes the app and triggers ANRs', isCorrect: false },
      { id: 'C', title: 'Inside suspending functions to launch background threads', subtitle: 'Use coroutineScope { } or withContext() instead of runBlocking inside suspend functions', isCorrect: false },
      { id: 'D', title: 'Anywhere higher performance is required than launch', subtitle: 'runBlocking blocks the thread, which degrades performance rather than improving it', isCorrect: false }
    ],
    hint: 'runBlocking bridges regular blocking worlds (like main() or @Test) with the coroutine world.',
    explanation: {
      title: 'Purpose of runBlocking',
      text: 'runBlocking runs a new coroutine and blocks the current thread until its completion. It is specifically designed as a bridge between normal blocking code and libraries that use suspending functions, predominantly in main() entry points and unit tests. It should NEVER be used on UI threads.',
      highlights: ['Bridges blocking code and coroutines', 'Used in main() and unit tests', 'Never use on UI threads (causes ANRs)']
    }
  },
  {
    id: 'w8-l2-c4',
    challengeType: 'code-completion',
    worldId: 'world-8',
    lessonId: 'coroutine-builders',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Builders • Waiting for a Job with join',
    skill: 'builders',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the snippet to suspend the current coroutine until the launched `Job` has finished execution.',
    codeFileName: 'JobJoin.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val job = scope.launch {',
      '    delay(500)',
      '    println("Job completed")',
      '}',
      '// Suspend until job finishes:',
      'job.____()'
    ],
    options: [
      { id: 'A', title: 'join', subtitle: 'job.join() is a suspending function that waits until the Job completes', isCorrect: true },
      { id: 'B', title: 'await', subtitle: 'await() is only available on Deferred<T>, not Job', isCorrect: false },
      { id: 'C', title: 'wait', subtitle: 'wait() is a Java Object monitor method, not a coroutine suspension function', isCorrect: false },
      { id: 'D', title: 'block', subtitle: 'block() does not exist on Job', isCorrect: false }
    ],
    hint: 'Job provides a suspending method named .join() to wait for its completion.',
    explanation: {
      title: 'Waiting for a Job with .join()',
      text: 'A Job does not produce a return value, so it does not have .await(). Instead, you call the suspending function job.join() to suspend the caller until the background job finishes.',
      highlights: ['job.join() waits for completion', 'Non-blocking suspension', 'Equivalent of Thread.join() for coroutines']
    }
  },
  {
    id: 'w8-l2-c5',
    challengeType: 'bug-fix',
    worldId: 'world-8',
    lessonId: 'coroutine-builders',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Builders • Accidental Sequential Await',
    skill: 'builders',
    difficulty: 3,
    xpReward: 30,
    question: 'The code below was intended to run two network requests concurrently, but line 2 calls await() immediately, forcing them to run sequentially! How should it be fixed for true concurrency?',
    codeFileName: 'AccidentalSequential.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'coroutineScope {',
      '    val user = async { fetchUser() }.await()',
      '    val posts = async { fetchPosts() }.await()',
      '    println("$user with ${posts.size} posts")',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'val userDeferred = async { fetchUser() }; val postsDeferred = async { fetchPosts() }; val user = userDeferred.await(); val posts = postsDeferred.await()', subtitle: 'Starting both async coroutines before calling await() on either allows them to execute concurrently', isCorrect: true },
      { id: 'B', title: 'val user = launch { fetchUser() }.await()', subtitle: 'launch does not return a value and has no await()', isCorrect: false },
      { id: 'C', title: 'val user = async(Dispatchers.Unconfined) { fetchUser() }.await()', subtitle: 'Calling await() immediately on the same line still suspends sequentially', isCorrect: false },
      { id: 'D', title: 'val user = fetchUser().await()', subtitle: 'Standard suspend functions do not have an await() method', isCorrect: false }
    ],
    hint: 'Calling .await() immediately on async { ... } starts the coroutine and immediately waits for it, defeating concurrency.',
    explanation: {
      title: 'The Immediate await() Antipattern',
      text: 'Writing async { ... }.await() immediately starts the coroutine and immediately suspends the caller until it finishes before reaching the next line. To run them concurrently, start BOTH async blocks first, and only then await their results.',
      highlights: ['async { }.await() is an antipattern', 'Launch all async tasks first', 'Await results together at the end']
    }
  },

  // =========================================================================
  // LESSON 3: Dispatchers & CoroutineContext (5 questions)
  // =========================================================================
  {
    id: 'w8-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'dispatchers-context',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Dispatchers • Dispatcher Selection',
    skill: 'dispatchers',
    difficulty: 1,
    xpReward: 20,
    question: 'Which CoroutineDispatcher should be selected for performing blocking network requests or file disk I/O?',
    codeFileName: 'DispatcherChoice.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'withContext(____) {',
      '    val response = httpClient.get("https://api.example.com/items")',
      '    saveToFile(response.body)',
      '}'
    ],
    options: [
      { id: 'A', title: 'Dispatchers.IO', subtitle: 'Dispatchers.IO uses an elastic pool of on-demand threads optimized for blocking input/output operations', isCorrect: true },
      { id: 'B', title: 'Dispatchers.Default', subtitle: 'Dispatchers.Default is sized for CPU-intensive computations, not blocking I/O', isCorrect: false },
      { id: 'C', title: 'Dispatchers.Main', subtitle: 'Dispatchers.Main runs on the UI thread; blocking it causes application freeze', isCorrect: false },
      { id: 'D', title: 'Dispatchers.Unconfined', subtitle: 'Unconfined does not confine execution to any specific thread and should not be used for I/O', isCorrect: false }
    ],
    hint: 'IO stands for Input/Output (network and disk calls).',
    explanation: {
      title: 'Coroutine Dispatchers in Kotlin',
      text: 'Kotlin provides specialized dispatchers:\n- Dispatchers.IO: Sized dynamically (up to 64 threads or core count) for blocking I/O (files, sockets, databases).\n- Dispatchers.Default: Sized to CPU cores for heavy computation (sorting, JSON parsing, algorithms).\n- Dispatchers.Main: Confined to the UI thread (Android, JavaFX, Swing).',
      highlights: ['Dispatchers.IO for network and disk', 'Dispatchers.Default for CPU computation', 'Dispatchers.Main for UI updates']
    }
  },
  {
    id: 'w8-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'dispatchers-context',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Dispatchers • Context Switching with withContext',
    skill: 'dispatchers',
    difficulty: 2,
    xpReward: 25,
    question: 'What does `withContext(Dispatchers.IO)` return when used as an expression?',
    codeFileName: 'WithContextReturn.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun calculateLength(): Int {',
      '    val len = withContext(Dispatchers.Default) {',
      '        val text = "CodeDoKotlin" * 2',
      '        text.length',
      '    }',
      '    return len',
      '}'
    ],
    options: [
      { id: 'A', title: 'The result of the lambda block (24)', subtitle: 'withContext switches context, executes the block, and returns its lambda expression result', isCorrect: true },
      { id: 'B', title: 'A Job instance', subtitle: 'withContext returns the value of the block, not a Job', isCorrect: false },
      { id: 'C', title: 'A Deferred<Int> instance', subtitle: 'withContext is a suspending function that awaits inline, returning the direct value', isCorrect: false },
      { id: 'D', title: 'Unit', subtitle: 'withContext is generic and returns T, the type of the last expression in the lambda', isCorrect: false }
    ],
    hint: 'withContext switches to the given dispatcher, executes the code, returns the value of the last line, and restores the original context.',
    explanation: {
      title: 'Context Switching with withContext',
      text: 'withContext is a suspending function that switches the coroutine context (such as switching from Main to Default) for the duration of the lambda and suspends until it completes, returning the lambda\'s final value directly.',
      highlights: ['Switches dispatcher safely', 'Returns the value of the lambda', 'Suspends without blocking the calling thread']
    }
  },
  {
    id: 'w8-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-8',
    lessonId: 'dispatchers-context',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Dispatchers • Combining CoroutineContext Elements',
    skill: 'dispatchers',
    difficulty: 2,
    xpReward: 25,
    question: 'Which operator is used to combine multiple `CoroutineContext` elements together (such as a Dispatcher and a CoroutineName)?',
    codeFileName: 'CombineContext.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val context = Dispatchers.IO ____ CoroutineName("NetworkWorker")',
      'scope.launch(context) {',
      '    println("Running on: ${Thread.currentThread().name}")',
      '}'
    ],
    options: [
      { id: 'A', title: '+', subtitle: 'The plus (+) operator is overloaded on CoroutineContext to merge elements into a combined context', isCorrect: true },
      { id: 'B', title: '&', subtitle: 'Bitwise AND is not used for combining coroutine contexts', isCorrect: false },
      { id: 'C', title: 'and', subtitle: 'and is for boolean logic, not context composition', isCorrect: false },
      { id: 'D', title: ',', subtitle: 'Comma separation is for argument lists, not single expression context creation', isCorrect: false }
    ],
    hint: 'In Kotlin, CoroutineContext elements are composed together using the plus operator (+).',
    explanation: {
      title: 'Combining CoroutineContext Elements with +',
      text: 'A CoroutineContext is an indexed set of Element instances. Kotlin overloads the plus (+) operator on CoroutineContext so you can write Dispatchers.IO + CoroutineName("Worker") + handler to assemble custom execution environments.',
      highlights: ['Context elements combined using +', 'Combines Dispatcher, Job, Name, and ExceptionHandler', 'Right-hand elements override left-hand duplicates']
    }
  },
  {
    id: 'w8-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-8',
    lessonId: 'dispatchers-context',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Dispatchers • CPU-Bound Dispatcher',
    skill: 'dispatchers',
    difficulty: 2,
    xpReward: 25,
    question: 'Line 2 uses Dispatchers.IO for calculating 10 million prime numbers (a heavy CPU computation). Which dispatcher should be used instead?',
    codeFileName: 'CpuDispatcherFix.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'suspend fun computePrimes(): List<Long> {',
      '    return withContext(Dispatchers.IO) {',
      '        findPrimesUpTo(10_000_000)',
      '    }',
      '}'
    ],
    buggyLineIndex: 1,
    options: [
      { id: 'A', title: 'return withContext(Dispatchers.Default) {', subtitle: 'Dispatchers.Default is backed by a thread pool sized to available CPU cores for compute-heavy work', isCorrect: true },
      { id: 'B', title: 'return withContext(Dispatchers.Main) {', subtitle: 'Dispatchers.Main is the single UI thread; CPU work here will freeze the UI', isCorrect: false },
      { id: 'C', title: 'return withContext(Dispatchers.Unconfined) {', subtitle: 'Unconfined does not provide thread safety or bounded CPU allocation', isCorrect: false },
      { id: 'D', title: 'return withContext(null) {', subtitle: 'Context cannot be null', isCorrect: false }
    ],
    hint: 'Dispatchers.Default is backed by a pool of threads equal to the number of CPU cores and is reserved for CPU-intensive calculations.',
    explanation: {
      title: 'Dispatchers.Default for CPU-Intensive Tasks',
      text: 'Dispatchers.Default is optimized for CPU-bound computations (such as complex math, large array sorting, and image processing). Its pool size equals the number of available CPU cores (minimum 2), preventing thread over-subscription and CPU thrashing.',
      highlights: ['Dispatchers.Default for CPU tasks', 'Thread count matches CPU core count', 'Prevents CPU cache thrashing and context-switch overhead']
    }
  },
  {
    id: 'w8-l3-c5',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'dispatchers-context',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Dispatchers • Exception Handling with Handler',
    skill: 'dispatchers',
    difficulty: 3,
    xpReward: 30,
    question: 'What is printed when an uncaught exception occurs inside a root coroutine with a CoroutineExceptionHandler?',
    codeFileName: 'ExceptionHandlerDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val handler = CoroutineExceptionHandler { _, exception ->',
      '    println("Caught: ${exception.message}")',
      '}',
      'runBlocking {',
      '    val job = GlobalScope.launch(handler) {',
      '        throw IllegalStateException("Disk full")',
      '    }',
      '    job.join()',
      '}'
    ],
    options: [
      { id: 'A', title: 'Caught: Disk full', subtitle: 'The CoroutineExceptionHandler catches uncaught exceptions from root launch coroutines', isCorrect: true },
      { id: 'B', title: 'Program crash with uncaught stack trace', subtitle: 'The handler captures the exception cleanly', isCorrect: false },
      { id: 'C', title: 'Caught: null', subtitle: 'The exception message is "Disk full"', isCorrect: false },
      { id: 'D', title: 'Nothing printed', subtitle: 'The exception triggers the handler before the job finishes', isCorrect: false }
    ],
    hint: 'CoroutineExceptionHandler acts as a generic catch block for uncaught exceptions in root launch coroutines.',
    explanation: {
      title: 'CoroutineExceptionHandler',
      text: 'CoroutineExceptionHandler is an optional CoroutineContext element that catches otherwise unhandled exceptions in root coroutines started with launch. It functions like Thread.uncaughtExceptionHandler, logging errors or reporting telemetry.',
      highlights: ['Catches uncaught exceptions in root launch', 'Installed in CoroutineContext via +', 'Prevents uncaught crashes in background workers']
    }
  },

  // =========================================================================
  // LESSON 4: Structured Concurrency & Cancellation (5 questions)
  // =========================================================================
  {
    id: 'w8-l4-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'structured-concurrency',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Structured Concurrency • Parent-Child Hierarchy',
    skill: 'structured_concurrency',
    difficulty: 2,
    xpReward: 25,
    question: 'What happens to child coroutines when their parent CoroutineScope or parent Job is cancelled?',
    codeFileName: 'ParentCancellation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val parentJob = scope.launch {',
      '    launch { while(true) { delay(100) } } // Child 1',
      '    launch { while(true) { delay(100) } } // Child 2',
      '}',
      'parentJob.cancel()'
    ],
    options: [
      { id: 'A', title: 'All child coroutines are automatically and recursively cancelled', subtitle: 'Structured concurrency guarantees that cancelling a parent cascades cancellation to every child in its hierarchy', isCorrect: true },
      { id: 'B', title: 'Child coroutines become orphaned and continue running indefinitely', subtitle: 'Unlike standard OS threads, coroutines follow structured hierarchy without leaking orphans', isCorrect: false },
      { id: 'C', title: 'Only the immediate first child is cancelled', subtitle: 'Cancellation cascades recursively throughout the entire tree of children', isCorrect: false },
      { id: 'D', title: 'The parent waits until all children finish naturally before cancelling', subtitle: 'Parent cancellation takes immediate effect across the tree', isCorrect: false }
    ],
    hint: 'Structured concurrency guarantees that no work leaks: cancelling a parent cancels all its children.',
    explanation: {
      title: 'Structured Concurrency & Cancellation Cascading',
      text: 'Structured concurrency ensures that coroutines are launched in a hierarchy. When a parent Job is cancelled, it immediately cancels all its children coroutines recursively, preventing memory leaks and orphaned background computations.',
      highlights: ['Parent cancellation cascades to all children', 'No orphaned background tasks', 'Guarantees resource cleanup']
    }
  },
  {
    id: 'w8-l4-c2',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'structured-concurrency',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Structured Concurrency • Cooperative Cancellation',
    skill: 'structured_concurrency',
    difficulty: 2,
    xpReward: 25,
    question: 'Why does this coroutine NOT stop running even after cancelAndJoin() is called?',
    codeFileName: 'UncooperativeLoop.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val job = scope.launch(Dispatchers.Default) {',
      '    var i = 0',
      '    while (i < 1_000_000) {',
      '        i++ // Pure computation without checking cancellation',
      '    }',
      '}',
      'job.cancelAndJoin()'
    ],
    options: [
      { id: 'A', title: 'Coroutine cancellation is cooperative: code that does not suspend or check isActive will continue executing until finished', subtitle: 'A coroutine must yield or check isActive to respond to cancellation signals', isCorrect: true },
      { id: 'B', title: 'cancelAndJoin() only works on Dispatchers.Main', subtitle: 'cancelAndJoin works across all dispatchers', isCorrect: false },
      { id: 'C', title: 'Dispatchers.Default cannot be cancelled under any circumstances', subtitle: 'Dispatchers.Default fully supports cooperative cancellation', isCorrect: false },
      { id: 'D', title: 'cancelAndJoin() throws an UnsupportedOperationException', subtitle: 'cancelAndJoin() is standard kotlinx.coroutines syntax', isCorrect: false }
    ],
    hint: 'Coroutines do not abruptly kill threads. Cancellation is cooperative; loops must check isActive or call a suspending function like yield() or delay().',
    explanation: {
      title: 'Coroutine Cancellation is Cooperative',
      text: 'In Kotlin, coroutine cancellation is cooperative. If a coroutine is running a tight CPU loop without calling any suspending functions (like delay or yield) and without inspecting the isActive property, it will ignore cancellation requests until the loop finishes.',
      highlights: ['Cancellation is cooperative', 'Suspending functions check cancellation automatically', 'CPU loops must check isActive or call yield()']
    }
  },
  {
    id: 'w8-l4-c3',
    challengeType: 'code-completion',
    worldId: 'world-8',
    lessonId: 'structured-concurrency',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Structured Concurrency • Checking isActive',
    skill: 'structured_concurrency',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the loop condition so this CPU-intensive task cooperatively terminates as soon as the coroutine is cancelled.',
    codeFileName: 'CooperativeCheck.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val job = scope.launch(Dispatchers.Default) {',
      '    while (____) {',
      '        computeNextBatch()',
      '    }',
      '}'
    ],
    options: [
      { id: 'A', title: 'isActive', subtitle: 'The CoroutineScope.isActive property returns false as soon as the job is cancelled', isCorrect: true },
      { id: 'B', title: 'isAlive', subtitle: 'isAlive is a Java Thread method, not a coroutine scope property', isCorrect: false },
      { id: 'C', title: 'isCancelled.not()', subtitle: 'isActive is the standard idiom in Kotlin coroutines', isCorrect: false },
      { id: 'D', title: 'running', subtitle: 'running is not a property on CoroutineScope', isCorrect: false }
    ],
    hint: 'Use the standard `isActive` extension property available inside any `CoroutineScope`.',
    explanation: {
      title: 'Making CPU Tasks Cooperative with isActive',
      text: 'Inside a coroutine builder, isActive is a shorthand for coroutineContext[Job]?.isActive == true. Checking while(isActive) ensures that when cancel() is called, the loop immediately exits on the next iteration.',
      highlights: ['while (isActive) cooperatively exits', 'Ensures responsiveness during cancellation', 'Alternatively use ensureActive() or yield()']
    }
  },
  {
    id: 'w8-l4-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'structured-concurrency',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Structured Concurrency • CancellationException',
    skill: 'structured_concurrency',
    difficulty: 2,
    xpReward: 25,
    question: 'What exception is thrown internally inside a coroutine when a suspending function encounters cancellation?',
    codeFileName: 'CancellationExceptionDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'try {',
      '    delay(5000)',
      '} catch (e: Exception) {',
      '    println(e::class.simpleName)',
      '}'
    ],
    options: [
      { id: 'A', title: 'CancellationException', subtitle: 'kotlinx.coroutines uses CancellationException internally to cleanly unwind suspended coroutines', isCorrect: true },
      { id: 'B', title: 'InterruptedException', subtitle: 'Java threads throw InterruptedException; coroutines throw CancellationException', isCorrect: false },
      { id: 'C', title: 'TimeoutException', subtitle: 'TimeoutException is only used by withTimeout without null fallback', isCorrect: false },
      { id: 'D', title: 'IllegalStateException', subtitle: 'Cancellation is a normal lifecycle event, not an illegal state', isCorrect: false }
    ],
    hint: 'Suspending functions unwind their call stack by throwing a specific `CancellationException`.',
    explanation: {
      title: 'CancellationException Unwinding',
      text: 'When a coroutine is cancelled, its active suspension point (such as delay()) throws a CancellationException. This special exception unwinds the call stack so finally blocks can execute. It is treated as normal completion by parent coroutines and does NOT crash the parent.',
      highlights: ['CancellationException unwinds coroutines', 'finally blocks always execute', 'Does not cancel parent when thrown for normal cancellation']
    }
  },
  {
    id: 'w8-l4-c5',
    challengeType: 'bug-fix',
    worldId: 'world-8',
    lessonId: 'structured-concurrency',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Structured Concurrency • NonCancellable Context',
    skill: 'structured_concurrency',
    difficulty: 3,
    xpReward: 30,
    question: 'In a finally cleanup block of a cancelled coroutine, calling `closeRemoteConnection()` suspends and immediately fails with CancellationException! How must suspending cleanup be wrapped?',
    codeFileName: 'NonCancellableCleanup.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'try {',
      '    work()',
      '} finally {',
      '    // Bug: Fails because coroutine is already cancelled',
      '    closeRemoteConnection()',
      '}'
    ],
    buggyLineIndex: 4,
    options: [
      { id: 'A', title: 'withContext(NonCancellable) { closeRemoteConnection() }', subtitle: 'withContext(NonCancellable) temporarily protects suspending cleanup operations from the cancelled state', isCorrect: true },
      { id: 'B', title: 'withoutCancellation { closeRemoteConnection() }', subtitle: 'withoutCancellation does not exist in the coroutine library', isCorrect: false },
      { id: 'C', title: 'runBlocking { closeRemoteConnection() }', subtitle: 'runBlocking on a cancelled coroutine still inherits cancelled context or blocks needlessly', isCorrect: false },
      { id: 'D', title: 'launch(Dispatchers.IO) { closeRemoteConnection() }', subtitle: 'Launching a new child from a cancelled parent immediately cancels the new child', isCorrect: false }
    ],
    hint: 'Use `withContext(NonCancellable) { ... }` inside a `finally` block when you must invoke a suspending cleanup function.',
    explanation: {
      title: 'Suspending Cleanup with NonCancellable',
      text: 'Any attempt to call a suspending function inside a finally block of an already-cancelled coroutine will immediately throw another CancellationException. To execute suspending cleanup (like flushing a socket or closing a database), wrap it with `withContext(NonCancellable)`.',
      highlights: ['withContext(NonCancellable) protects cleanup', 'Permits suspending functions inside finally', 'Reserved strictly for cleanup operations']
    }
  },

  // =========================================================================
  // LESSON 5: Flows: Reactive Streams & Channels (5 questions)
  // =========================================================================
  {
    id: 'w8-l5-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'flow-reactive',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Flow • Cold Streams vs Hot Streams',
    skill: 'flow',
    difficulty: 1,
    xpReward: 20,
    question: 'Why is a Kotlin `Flow` builder (`flow { ... }`) referred to as a "cold" stream?',
    codeFileName: 'ColdFlow.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val numbersFlow = flow {',
      '    println("Flow started!")',
      '    emit(1)',
      '    emit(2)',
      '}'
    ],
    options: [
      { id: 'A', title: 'The flow block does not execute until a terminal operator like .collect() is called', subtitle: 'Cold streams produce items lazily on-demand for each new collector', isCorrect: true },
      { id: 'B', title: 'It emits values at zero degrees Kelvin', subtitle: 'Cold in reactive streams refers to lazy on-demand evaluation', isCorrect: false },
      { id: 'C', title: 'It can only emit immutable primitive numbers', subtitle: 'Flow can emit any data type, whether primitive or reference object', isCorrect: false },
      { id: 'D', title: 'It runs immediately in the background regardless of collectors', subtitle: 'Hot streams (like StateFlow or SharedFlow) emit values without collectors; Flow is cold', isCorrect: false }
    ],
    hint: 'Cold streams are lazy: nothing happens until someone starts collecting.',
    explanation: {
      title: 'Cold Streams in Kotlin Flow',
      text: 'A Flow created via the flow { ... } builder is cold: the code inside the builder does not run until a terminal operator (such as .collect()) is invoked. Furthermore, each new call to collect() starts a separate, independent execution of the flow.',
      highlights: ['Code does not run until .collect()', 'Each collector triggers a new run', 'Conserves resources by computing on-demand']
    }
  },
  {
    id: 'w8-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'flow-reactive',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Flow • Intermediate Transformations',
    skill: 'flow',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when this Flow pipeline is transformed with `filter`, `map`, and collected?',
    codeFileName: 'FlowPipeline.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'runBlocking {',
      '    flowOf(1, 2, 3, 4)',
      '        .filter { it % 2 == 0 }',
      '        .map { it * 10 }',
      '        .collect { print("$it ") }',
      '}'
    ],
    options: [
      { id: 'A', title: '20 40 ', subtitle: 'Even numbers are 2 and 4; multiplied by 10 yields 20 and 40', isCorrect: true },
      { id: 'B', title: '10 20 30 40 ', subtitle: 'filter { it % 2 == 0 } removed odd numbers 1 and 3', isCorrect: false },
      { id: 'C', title: '2 4 ', subtitle: 'The map { it * 10 } transformation multiplies the filtered values', isCorrect: false },
      { id: 'D', title: 'Nothing printed', subtitle: 'The terminal collect operator triggers and prints each emission', isCorrect: false }
    ],
    hint: 'Filter keeps even numbers (2 and 4), and map multiplies them by 10 (20 and 40).',
    explanation: {
      title: 'Flow Transformations: filter and map',
      text: 'Intermediate operators like filter and map are applied to each element sequentially as it flows through the pipeline. When collect() is invoked, items 1, 2, 3, 4 are processed: only 2 and 4 pass the filter, resulting in 20 and 40 being printed.',
      highlights: ['Intermediate operators are lazy', 'Values processed one-by-one as emitted', 'Terminal operator (collect) triggers the pipeline']
    }
  },
  {
    id: 'w8-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-8',
    lessonId: 'flow-reactive',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Flow • flowOn Operator',
    skill: 'flow',
    difficulty: 2,
    xpReward: 25,
    question: 'Which operator is used to change the execution context of upstream Flow emissions without violating flow invariant constraints?',
    codeFileName: 'FlowOnOperator.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'flow {',
      '    emit(heavyDatabaseRead())',
      '}',
      '.____(Dispatchers.IO) // Change upstream execution context',
      '.collect { updateUI(it) }'
    ],
    options: [
      { id: 'A', title: 'flowOn', subtitle: 'flowOn(Dispatchers.IO) alters the CoroutineDispatcher for all upstream operators without affecting downstream collectors', isCorrect: true },
      { id: 'B', title: 'withContext', subtitle: 'Calling withContext inside a flow block violates flow context preservation rules and causes an exception', isCorrect: false },
      { id: 'C', title: 'dispatchTo', subtitle: 'dispatchTo is not a valid operator in Kotlin Flow', isCorrect: false },
      { id: 'D', title: 'subscribeOn', subtitle: 'subscribeOn is RxJava terminology, not Kotlin Flow', isCorrect: false }
    ],
    hint: 'Use the `flowOn` operator to specify the dispatcher for upstream emissions.',
    explanation: {
      title: 'Context Preservation & flowOn',
      text: 'Flow honors context preservation: you must not emit values from a different context inside a flow { ... } block (e.g., using withContext will throw an IllegalStateException). The correct way to change upstream execution context is with the flowOn(dispatcher) operator.',
      highlights: ['flowOn changes upstream context', 'Preserves flow invariant rules', 'Collector runs in its own caller context']
    }
  },
  {
    id: 'w8-l5-c4',
    challengeType: 'multiple-choice',
    worldId: 'world-8',
    lessonId: 'flow-reactive',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Flow • StateFlow vs SharedFlow',
    skill: 'flow',
    difficulty: 2,
    xpReward: 25,
    question: 'How does a `StateFlow` differ from a standard `SharedFlow` in Kotlin?',
    codeFileName: 'StateVsSharedFlow.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val uiState = MutableStateFlow(InitialState)',
      'val eventBus = MutableSharedFlow<UserEvent>()'
    ],
    options: [
      { id: 'A', title: 'StateFlow is a hot, state-holding observable with an always-accessible .value property that deduplicates identical consecutive values via equals()', subtitle: 'StateFlow requires an initial value and behaves like a modern reactive state holder', isCorrect: true },
      { id: 'B', title: 'StateFlow is cold and SharedFlow is hot', subtitle: 'Both StateFlow and SharedFlow are hot streams', isCorrect: false },
      { id: 'C', title: 'StateFlow cannot be collected more than once', subtitle: 'StateFlow can be collected by multiple collectors simultaneously', isCorrect: false },
      { id: 'D', title: 'SharedFlow always retains the entire history of every emission since app startup', subtitle: 'SharedFlow only retains the number of replay items specified in its replay parameter', isCorrect: false }
    ],
    hint: 'StateFlow represents state: it has a `.value` property and always holds a current value.',
    explanation: {
      title: 'StateFlow vs. SharedFlow',
      text: 'StateFlow is a specialized SharedFlow designed for observable state (e.g., UI state in ViewModels). Key traits of StateFlow:\n- Always holds an initial value.\n- Exposes `.value` for immediate synchronous reads.\n- Deduplicates consecutive identical emissions (conflation).\nSharedFlow is a general-purpose event bus for one-time events without a mandatory initial state.',
      highlights: ['StateFlow holds a current .value', 'Deduplicates identical updates', 'SharedFlow for one-time events/broadcasts']
    }
  },
  {
    id: 'w8-l5-c5',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'flow-reactive',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'Flow • Catching Exceptions with catch',
    skill: 'flow',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this flow when an upstream exception is caught by the `.catch` operator?',
    codeFileName: 'FlowCatchDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'runBlocking {',
      '    flow {',
      '        emit("A")',
      '        throw RuntimeException("Network Error")',
      '        emit("B")',
      '    }',
      '    .catch { emit("Fallback") }',
      '    .collect { print("$it ") }',
      '}'
    ],
    options: [
      { id: 'A', title: 'A Fallback ', subtitle: 'Emits "A", the exception triggers .catch which recovers by emitting "Fallback", and the flow completes', isCorrect: true },
      { id: 'B', title: 'A B Fallback ', subtitle: 'Statements after a thrown exception inside the flow block are unreachable', isCorrect: false },
      { id: 'C', title: 'Fallback ', subtitle: '"A" was already emitted and received before the exception occurred', isCorrect: false },
      { id: 'D', title: 'Uncaught RuntimeException crash', subtitle: 'The .catch operator safely intercepted the exception', isCorrect: false }
    ],
    hint: 'The flow emits "A", then encounters the exception. The `.catch` operator catches it and emits "Fallback".',
    explanation: {
      title: 'Exception Transparency with catch',
      text: 'Kotlin Flow preserves exception transparency. The .catch { ... } operator intercepts exceptions thrown by UPSTREAM operations and allows emitting fallback values, logging errors, or terminating cleanly without breaking downstream collectors.',
      highlights: ['catch operator catches upstream errors', 'Can emit fallback values via emit()', 'Preserves exception transparency']
    }
  },

  // =========================================================================
  // LESSON 6: WORLD BOSS: Async Overlord (1 multi-stage challenge)
  // =========================================================================
  {
    id: 'w8-boss-1',
    challengeType: 'output-prediction',
    worldId: 'world-8',
    lessonId: 'coroutines-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Coroutines & Asynchronous Kotlin',
    topicTag: 'World Boss • The Async Overlord',
    skill: 'coroutines-boss',
    difficulty: 3,
    xpReward: 50,
    question: 'Trace this resilient real-time trading feed pipeline combining parallel async fetches, dispatcher switching, flow transformations, and structured error recovery. What is printed?',
    codeFileName: 'AsyncOverlordBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// 1. Parallel Data Fetching with async',
      'suspend fun fetchAccount(): String = coroutineScope {',
      '    val balanceDef = async(Dispatchers.Default) { 1500 }',
      '    val tierDef = async(Dispatchers.Default) { "PRO" }',
      '    "${tierDef.await()}:$${balanceDef.await()}"',
      '}',
      '',
      '// 2. Real-Time Price Stream with Flow',
      'fun priceStream(): Flow<Int> = flow {',
      '    emit(100)',
      '    emit(110)',
      '    throw IllegalStateException("Feed disconnected")',
      '}',
      '.catch { emit(95) } // Fallback price on feed drop',
      '',
      '// 3. Execution Pipeline',
      'fun main() = runBlocking {',
      '    val account = fetchAccount()',
      '    val totalValue = withContext(Dispatchers.Default) {',
      '        var sum = 0',
      '        priceStream()',
      '            .filter { it >= 100 }',
      '            .collect { price -> sum += price }',
      '        sum',
      '    }',
      '    println("$account | Portfolio: $$totalValue")',
      '}'
    ],
    options: [
      { id: 'A', title: 'PRO:$1500 | Portfolio: $210', subtitle: 'account resolves to "PRO:$1500"; priceStream emits 100 and 110, catches error and emits 95 (filtered out because 95 < 100); sum = 100 + 110 = 210', isCorrect: true },
      { id: 'B', title: 'PRO:$1500 | Portfolio: $305', subtitle: 'The fallback value 95 is filtered out by .filter { it >= 100 } and not added to the sum', isCorrect: false },
      { id: 'C', title: 'null:$0 | Portfolio: $0', subtitle: 'Both async blocks and the flow emit valid positive integers', isCorrect: false },
      { id: 'D', title: 'IllegalStateException crash', subtitle: 'The .catch operator on priceStream catches the exception and emits the fallback value 95', isCorrect: false }
    ],
    hint: 'Step 1: calculate account ("PRO:$1500"). Step 2: prices emitted are 100, 110, and fallback 95. Step 3: .filter { it >= 100 } drops 95. What is 100 + 110?',
    explanation: {
      title: 'World 8 Boss Mastery: The Async Overlord',
      text: 'This boss challenge tests the convergence of Kotlin\'s asynchronous runtime:\n1. Parallel Decomposition: `fetchAccount()` launches two concurrent `async` coroutines on `Dispatchers.Default`, computing `PRO:$1500` without sequential lag.\n2. Exception Recovery in Flow: `priceStream()` emits 100 and 110, throws an `IllegalStateException`, but recovers via `.catch { emit(95) }`.\n3. Pipeline Filtering: Downstream `.filter { it >= 100 }` allows 100 and 110 through while rejecting 95 (since 95 < 100).\n4. Terminal Reduction: `collect` sums 100 + 110 = 210, yielding the final output: "PRO:$1500 | Portfolio: $210".',
      highlights: [
        'Concurrent async decomposition computes tier and balance in parallel',
        '.catch on Flow captures upstream exceptions and cleanly emits fallback data',
        '.filter { it >= 100 } selectively discards the fallback value 95',
        'Structured concurrency prevents thread starvation across dispatchers'
      ]
    }
  }
];
