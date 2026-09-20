import { FiveStageLesson } from '../lessonStagesData';

export const COROUTINE_FUNDAMENTALS_BUILDER_LESSON: FiveStageLesson = {
  id: "world-16-coroutine-fundamentals-coroutine-builder",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Coroutine Fundamentals & Coroutine Builders",
  learn: {
    title: "Coroutine Fundamentals & Coroutine Builders",
    subtitle: "Understand what a coroutine is, where CoroutineScope/runBlocking fit, and why suspension is not the same as blocking. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"],
    explanation: "Understand what a coroutine is, where CoroutineScope/runBlocking fit, and why suspension is not the same as blocking. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Understand what a coroutine is, where CoroutineScope/runBlocking fit, and why suspension is not the same as blocking." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Understand what a coroutine is, where CoroutineScope/runBlocking fit, and why suspension is not the same as blocking."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "7 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-1", number: "01", title: "Coroutinescope scenario", language: 'Kotlin', subtitle: "CoroutineScope and lifecycle ownership", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Behavior', description: "CoroutineScope and lifecycle ownership" }], whatChanged: "Distinct coverage: CoroutineScope and lifecycle ownership" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-2", number: "02", title: "Runblocking scenario", language: 'Kotlin', subtitle: "runBlocking bridges blocking code to suspending code", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "runBlocking bridges blocking code to suspending code" }], whatChanged: "Distinct coverage: runBlocking bridges blocking code to suspending code" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-3", number: "03", title: "Launch scenario", language: 'Kotlin', subtitle: "launch starts a child coroutine and returns Job", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "launch starts a child coroutine and returns Job" }], whatChanged: "Distinct coverage: launch starts a child coroutine and returns Job" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-4", number: "04", title: "Delay scenario", language: 'Kotlin', subtitle: "delay suspends without blocking the underlying thread", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "delay suspends without blocking the underlying thread" }], whatChanged: "Distinct coverage: delay suspends without blocking the underlying thread" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-5", number: "05", title: "Builders scenario", language: 'Kotlin', subtitle: "builders inherit scope context", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Behavior', description: "builders inherit scope context" }], whatChanged: "Distinct coverage: builders inherit scope context" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-6", number: "06", title: "Coroutines scenario", language: 'Kotlin', subtitle: "coroutines are not threads", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Behavior', description: "coroutines are not threads" }], whatChanged: "Distinct coverage: coroutines are not threads" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-7", number: "07", title: "Structured scenario", language: 'Kotlin', subtitle: "structured lifetime starts at an owning scope", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Behavior', description: "structured lifetime starts at an owning scope" }], whatChanged: "Distinct coverage: structured lifetime starts at an owning scope" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-1", questionNumber: 1, totalQuestions: 7, title: "Coroutinescope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineScope and lifecycle ownership.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinescope check", detail: "CoroutineScope and lifecycle ownership." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-2", questionNumber: 2, totalQuestions: 7, title: "Runblocking check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Runblocking check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-3", questionNumber: 3, totalQuestions: 7, title: "Launch check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Launch starts a child coroutine and returns Job.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Launch check", detail: "Launch starts a child coroutine and returns Job." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-4", questionNumber: 4, totalQuestions: 7, title: "Delay check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Delay check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-5", questionNumber: 5, totalQuestions: 7, title: "Builders check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Builders inherit scope context.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Builders check", detail: "Builders inherit scope context." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-6", questionNumber: 6, totalQuestions: 7, title: "Coroutines check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A coroutine may suspend and later resume according to its dispatcher."], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Coroutine identity is not the same thing as thread identity.", isCorrect: true }, { id: "B", label: "Every coroutine owns exactly one thread.", isCorrect: false }, { id: "C", label: "A suspended coroutine permanently keeps its thread.", isCorrect: false }, { id: "D", label: "Dispatchers are Jobs.", isCorrect: false }], explanation: { codeRef: "Coroutines check", detail: "Coroutine identity is not the same thing as thread identity." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-7", questionNumber: 7, totalQuestions: 7, title: "Structured check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Structured lifetime starts at an owning scope.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Structured check", detail: "Structured lifetime starts at an owning scope." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Join a Child Job",
    description: "Launch a child that sets result to 7, join it, then print the result. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "JoinaChildJob.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var result = 0\n    val job = launch {\n        delay(1)\n        result = 7\n    }\n    // TODO wait for job\n    println(result)\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var result = 0\n    val job = launch {\n        delay(1)\n        result = 7\n    }\n    job.join()\n    println(result)\n}",
    sampleInput: "main()",
    expectedOutput: "7",
    testCase: { call: "", expected: "7" }
  },
  debug: {
    title: "Await the Deferred",
    subtitle: "The code prints the Deferred object instead of its computed value.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val value = async { 13 }\n    println(value)\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val value = async { 13 }\n    println(value.await())\n}",
    expectedOutput: "13",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Coroutine Fundamentals & Coroutine Builders",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "7 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "7 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const LAUNCH_ASYNC_LESSON: FiveStageLesson = {
  id: "world-16-launch-async",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "launch & async",
  learn: {
    title: "launch & async",
    subtitle: "Choose launch for side-effect work and async for a result represented by Deferred, then retrieve that result with await. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"],
    explanation: "Choose launch for side-effect work and async for a result represented by Deferred, then retrieve that result with await. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Choose launch for side-effect work and async for a result represented by Deferred, then retrieve that result with await." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Choose launch for side-effect work and async for a result represented by Deferred, then retrieve that result with await."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "7 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-launch-async-explore-1", number: "01", title: "Launch scenario", language: 'Kotlin', subtitle: "launch returns Job, not a result", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val j:Job=launch{}; j.join(); println(j.isCompleted) }"], whatItMeans: [{ label: 'Behavior', description: "launch returns Job, not a result" }], whatChanged: "Distinct coverage: launch returns Job, not a result" },
      { id: "world-16-launch-async-explore-2", number: "02", title: "Async scenario", language: 'Kotlin', subtitle: "async returns Deferred<T>", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d:Deferred<Int>=async{3}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "async returns Deferred<T>" }], whatChanged: "Distinct coverage: async returns Deferred<T>" },
      { id: "world-16-launch-async-explore-3", number: "03", title: "Await scenario", language: 'Kotlin', subtitle: "await suspends until Deferred completes and returns its value", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d=async{9}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "await suspends until Deferred completes and returns its value" }], whatChanged: "Distinct coverage: await suspends until Deferred completes and returns its value" },
      { id: "world-16-launch-async-explore-4", number: "04", title: "Async scenario", language: 'Kotlin', subtitle: "async starts eagerly by default", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], whatItMeans: [{ label: 'Behavior', description: "async starts eagerly by default" }], whatChanged: "Distinct coverage: async starts eagerly by default" },
      { id: "world-16-launch-async-explore-5", number: "05", title: "Coroutinestart.lazy scenario", language: 'Kotlin', subtitle: "CoroutineStart.LAZY changes start behavior", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d=async(start=CoroutineStart.LAZY){8}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "CoroutineStart.LAZY changes start behavior" }], whatChanged: "Distinct coverage: CoroutineStart.LAZY changes start behavior" },
      { id: "world-16-launch-async-explore-6", number: "06", title: "Exceptions scenario", language: 'Kotlin', subtitle: "exceptions from async are observed through Deferred/structured parent rules", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "exceptions from async are observed through Deferred/structured parent rules" }], whatChanged: "Distinct coverage: exceptions from async are observed through Deferred/structured parent rules" },
      { id: "world-16-launch-async-explore-7", number: "07", title: "Do scenario", language: 'Kotlin', subtitle: "do not use async when no result is needed", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], whatItMeans: [{ label: 'Behavior', description: "do not use async when no result is needed" }], whatChanged: "Distinct coverage: do not use async when no result is needed" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-launch-async-predict-1", questionNumber: 1, totalQuestions: 7, title: "Launch check", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=launch{}; x.join(); println(x is Job) }"], prompt: "Output question: which result or statement is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "Deferred", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Launch check", detail: "true" } },
      { id: "world-16-launch-async-predict-2", questionNumber: 2, totalQuestions: 7, title: "Async check", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{5}; println(x.await()) }"], prompt: "Output question: which result or statement is correct?", options: [{ id: "A", label: "5", isCorrect: true }, { id: "B", label: "Deferred", isCorrect: false }, { id: "C", label: "Unit", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Async check", detail: "5" } },
      { id: "world-16-launch-async-predict-3", questionNumber: 3, totalQuestions: 7, title: "Await check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Await check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-launch-async-predict-4", questionNumber: 4, totalQuestions: 7, title: "Async check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Async starts eagerly by default.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "Async starts eagerly by default." } },
      { id: "world-16-launch-async-predict-5", questionNumber: 5, totalQuestions: 7, title: "Coroutinestart.lazy check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineStart.LAZY changes start behavior.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinestart.lazy check", detail: "CoroutineStart.LAZY changes start behavior." } },
      { id: "world-16-launch-async-predict-6", questionNumber: 6, totalQuestions: 7, title: "Exceptions check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Exceptions from async are observed through Deferred/structured parent rules.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Exceptions check", detail: "Exceptions from async are observed through Deferred/structured parent rules." } },
      { id: "world-16-launch-async-predict-7", questionNumber: 7, totalQuestions: 7, title: "Do check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d: Deferred<Int> = async { 20 + 22 }", "    println(d.await())", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Do not use async when no result is needed.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Do check", detail: "Do not use async when no result is needed." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Return Two Async Results",
    description: "Use async for two result-producing children and print their awaited sum. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "ReturnTwoAsyncResults.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    // TODO create two Deferred<Int> values for 10 and 5\n    // TODO print their awaited sum\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val left = async { 10 }\n    val right = async { 5 }\n    println(left.await() + right.await())\n}",
    sampleInput: "main()",
    expectedOutput: "15",
    testCase: { call: "", expected: "15" }
  },
  debug: {
    title: "Use async for a Result",
    subtitle: "The task needs a returned value but launch produces only Job.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val task = launch { 21 }\n    println(task)\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val task = async { 21 }\n    println(task.await())\n}",
    expectedOutput: "21",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "launch & async",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "7 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "7 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const AWAIT_SUSPENDING_FUNCTIONS_LESSON: FiveStageLesson = {
  id: "world-16-await-suspending-functions",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "await & Suspending Functions",
  learn: {
    title: "await & Suspending Functions",
    subtitle: "Compose suspend functions sequentially or concurrently without confusing suspension with thread blocking. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"],
    explanation: "Compose suspend functions sequentially or concurrently without confusing suspension with thread blocking. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Compose suspend functions sequentially or concurrently without confusing suspension with thread blocking." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Compose suspend functions sequentially or concurrently without confusing suspension with thread blocking."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "6 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-await-suspending-functions-explore-1", number: "01", title: "Suspend scenario", language: 'Kotlin', subtitle: "suspend marks a function that may suspend", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "suspend marks a function that may suspend" }], whatChanged: "Distinct coverage: suspend marks a function that may suspend" },
      { id: "world-16-await-suspending-functions-explore-2", number: "02", title: "Suspend scenario", language: 'Kotlin', subtitle: "suspend functions are callable from another suspend function or coroutine", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "suspend functions are callable from another suspend function or coroutine" }], whatChanged: "Distinct coverage: suspend functions are callable from another suspend function or coroutine" },
      { id: "world-16-await-suspending-functions-explore-3", number: "03", title: "Delay scenario", language: 'Kotlin', subtitle: "delay is suspending; Thread.sleep blocks", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "delay is suspending; Thread.sleep blocks" }], whatChanged: "Distinct coverage: delay is suspending; Thread.sleep blocks" },
      { id: "world-16-await-suspending-functions-explore-4", number: "04", title: "Await scenario", language: 'Kotlin', subtitle: "await is suspending", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "await is suspending" }], whatChanged: "Distinct coverage: await is suspending" },
      { id: "world-16-await-suspending-functions-explore-5", number: "05", title: "Sequential scenario", language: 'Kotlin', subtitle: "sequential calls stay sequential unless concurrency is introduced", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "sequential calls stay sequential unless concurrency is introduced" }], whatChanged: "Distinct coverage: sequential calls stay sequential unless concurrency is introduced" },
      { id: "world-16-await-suspending-functions-explore-6", number: "06", title: "Async scenario", language: 'Kotlin', subtitle: "async + await composes concurrent result work", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "async + await composes concurrent result work" }], whatChanged: "Distinct coverage: async + await composes concurrent result work" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-await-suspending-functions-predict-1", questionNumber: 1, totalQuestions: 6, title: "Suspend check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Suspend marks a function that may suspend.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Suspend check", detail: "Suspend marks a function that may suspend." } },
      { id: "world-16-await-suspending-functions-predict-2", questionNumber: 2, totalQuestions: 6, title: "Suspend check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Suspend functions are callable from another suspend function or coroutine.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Suspend check", detail: "Suspend functions are callable from another suspend function or coroutine." } },
      { id: "world-16-await-suspending-functions-predict-3", questionNumber: 3, totalQuestions: 6, title: "Delay check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Delay check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-await-suspending-functions-predict-4", questionNumber: 4, totalQuestions: 6, title: "Await check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Await check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-await-suspending-functions-predict-5", questionNumber: 5, totalQuestions: 6, title: "Sequential check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Sequential calls stay sequential unless concurrency is introduced.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Sequential check", detail: "Sequential calls stay sequential unless concurrency is introduced." } },
      { id: "world-16-await-suspending-functions-predict-6", questionNumber: 6, totalQuestions: 6, title: "Async check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "await suspends until the Deferred completes and yields 11." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Call a Suspending Function",
    description: "Implement fetch as suspend, use delay, and print its returned value. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "CallaSuspendingFunction.kt",
    initialCode: "import kotlinx.coroutines.*\nsuspend fun fetch(): String {\n    // TODO suspend briefly and return \"ready\"\n    TODO()\n}\nfun main() = runBlocking { println(fetch()) }",
    solutionCode: "import kotlinx.coroutines.*\nsuspend fun fetch(): String {\n    delay(1)\n    return \"ready\"\n}\nfun main() = runBlocking { println(fetch()) }",
    sampleInput: "main()",
    expectedOutput: "ready",
    testCase: { call: "", expected: "ready" }
  },
  debug: {
    title: "Await before Reading the Result",
    subtitle: "The program tries to treat Deferred<Int> as Int.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val number = async { 8 }\n    val doubled = number * 2\n    println(doubled)\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val number = async { 8 }\n    val doubled = number.await() * 2\n    println(doubled)\n}",
    expectedOutput: "16",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "await & Suspending Functions",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "6 / 6 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "6 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "6 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const SUSPEND_COROUTINE_CONTEXT_LESSON: FiveStageLesson = {
  id: "world-16-suspend-coroutine-context",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "suspend & Coroutine Context",
  learn: {
    title: "suspend & Coroutine Context",
    subtitle: "Reason about suspend boundaries and inherited CoroutineContext elements without assuming a coroutine stays on one thread. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"],
    explanation: "Reason about suspend boundaries and inherited CoroutineContext elements without assuming a coroutine stays on one thread. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Reason about suspend boundaries and inherited CoroutineContext elements without assuming a coroutine stays on one thread." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Reason about suspend boundaries and inherited CoroutineContext elements without assuming a coroutine stays on one thread."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "6 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-suspend-coroutine-context-explore-1", number: "01", title: "Coroutinecontext scenario", language: 'Kotlin', subtitle: "coroutineContext contains elements such as Job and dispatcher", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "coroutineContext contains elements such as Job and dispatcher" }], whatChanged: "Distinct coverage: coroutineContext contains elements such as Job and dispatcher" },
      { id: "world-16-suspend-coroutine-context-explore-2", number: "02", title: "Children scenario", language: 'Kotlin', subtitle: "children inherit context by default", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], whatItMeans: [{ label: 'Behavior', description: "children inherit context by default" }], whatChanged: "Distinct coverage: children inherit context by default" },
      { id: "world-16-suspend-coroutine-context-explore-3", number: "03", title: "Context scenario", language: 'Kotlin', subtitle: "context can be augmented/overridden", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], whatItMeans: [{ label: 'Behavior', description: "context can be augmented/overridden" }], whatChanged: "Distinct coverage: context can be augmented/overridden" },
      { id: "world-16-suspend-coroutine-context-explore-4", number: "04", title: "Coroutinename scenario", language: 'Kotlin', subtitle: "CoroutineName is a context element", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], whatItMeans: [{ label: 'Behavior', description: "CoroutineName is a context element" }], whatChanged: "Distinct coverage: CoroutineName is a context element" },
      { id: "world-16-suspend-coroutine-context-explore-5", number: "05", title: "Withcontext scenario", language: 'Kotlin', subtitle: "withContext changes context for a block and returns its result", code: ["import kotlinx.coroutines.*", "suspend fun answer()=withContext(Dispatchers.Default){42}", "fun main()=runBlocking{println(answer())}"], whatItMeans: [{ label: 'Behavior', description: "withContext changes context for a block and returns its result" }], whatChanged: "Distinct coverage: withContext changes context for a block and returns its result" },
      { id: "world-16-suspend-coroutine-context-explore-6", number: "06", title: "Thread scenario", language: 'Kotlin', subtitle: "thread identity is not coroutine identity", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], whatItMeans: [{ label: 'Behavior', description: "thread identity is not coroutine identity" }], whatChanged: "Distinct coverage: thread identity is not coroutine identity" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-suspend-coroutine-context-predict-1", questionNumber: 1, totalQuestions: 6, title: "Coroutinecontext check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineContext contains elements such as Job and dispatcher.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinecontext check", detail: "CoroutineContext contains elements such as Job and dispatcher." } },
      { id: "world-16-suspend-coroutine-context-predict-2", questionNumber: 2, totalQuestions: 6, title: "Children check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Children inherit context by default.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Children check", detail: "Children inherit context by default." } },
      { id: "world-16-suspend-coroutine-context-predict-3", questionNumber: 3, totalQuestions: 6, title: "Context check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Context can be augmented/overridden.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Context check", detail: "Context can be augmented/overridden." } },
      { id: "world-16-suspend-coroutine-context-predict-4", questionNumber: 4, totalQuestions: 6, title: "Coroutinename check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineName is a context element.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinename check", detail: "CoroutineName is a context element." } },
      { id: "world-16-suspend-coroutine-context-predict-5", questionNumber: 5, totalQuestions: 6, title: "Withcontext check", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f()=withContext(Dispatchers.Default){3}", "fun main()=runBlocking{println(f())}"], prompt: "Output question: which result or statement is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "Unit", isCorrect: false }, { id: "C", label: "Default", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Withcontext check", detail: "3" } },
      { id: "world-16-suspend-coroutine-context-predict-6", questionNumber: 6, totalQuestions: 6, title: "Thread check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A coroutine may suspend and later resume according to its dispatcher."], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Coroutine identity is not the same thing as thread identity.", isCorrect: true }, { id: "B", label: "Every coroutine owns exactly one thread.", isCorrect: false }, { id: "C", label: "A suspended coroutine permanently keeps its thread.", isCorrect: false }, { id: "D", label: "Dispatchers are Jobs.", isCorrect: false }], explanation: { codeRef: "Thread check", detail: "Coroutine identity is not the same thing as thread identity." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Read Context inside suspend",
    description: "Return whether the current coroutine context contains a Job. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "ReadContextinsidesuspend.kt",
    initialCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\nsuspend fun hasJob(): Boolean {\n    // TODO inspect coroutineContext\n    return false\n}\nfun main() = runBlocking { println(hasJob()) }",
    solutionCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\nsuspend fun hasJob(): Boolean {\n    return coroutineContext[Job] != null\n}\nfun main() = runBlocking { println(hasJob()) }",
    sampleInput: "main()",
    expectedOutput: "true",
    testCase: { call: "", expected: "true" }
  },
  debug: {
    title: "Use withContext for the Result",
    subtitle: "The helper launches a separate Job even though the caller needs one returned value.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nsuspend fun answer(): Int = coroutineScope {\n    var result = 0\n    launch(Dispatchers.Default) { result = 42 }\n    result\n}\nfun main() = runBlocking { println(answer()) }",
    fixedCode: "import kotlinx.coroutines.*\nsuspend fun answer(): Int =\n    withContext(Dispatchers.Default) { 42 }\nfun main() = runBlocking { println(answer()) }",
    expectedOutput: "42",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "suspend & Coroutine Context",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "6 / 6 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "6 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "6 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const DISPATCHERS_JOBS_LESSON: FiveStageLesson = {
  id: "world-16-dispatchers-jobs",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Dispatchers & Jobs",
  learn: {
    title: "Dispatchers & Jobs",
    subtitle: "Use dispatchers for execution context and Job for lifecycle/completion, while avoiding thread-name assumptions. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"],
    explanation: "Use dispatchers for execution context and Job for lifecycle/completion, while avoiding thread-name assumptions. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Use dispatchers for execution context and Job for lifecycle/completion, while avoiding thread-name assumptions." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Use dispatchers for execution context and Job for lifecycle/completion, while avoiding thread-name assumptions."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "7 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-dispatchers-jobs-explore-1", number: "01", title: "Dispatchers.default scenario", language: 'Kotlin', subtitle: "Dispatchers.Default for CPU-oriented shared-pool work", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Behavior', description: "Dispatchers.Default for CPU-oriented shared-pool work" }], whatChanged: "Distinct coverage: Dispatchers.Default for CPU-oriented shared-pool work" },
      { id: "world-16-dispatchers-jobs-explore-2", number: "02", title: "Dispatchers.io scenario", language: 'Kotlin', subtitle: "Dispatchers.IO for blocking I/O on JVM", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "Dispatchers.IO for blocking I/O on JVM" }], whatChanged: "Distinct coverage: Dispatchers.IO for blocking I/O on JVM" },
      { id: "world-16-dispatchers-jobs-explore-3", number: "03", title: "Dispatchers.main scenario", language: 'Kotlin', subtitle: "Dispatchers.Main requires a platform Main dispatcher", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Behavior', description: "Dispatchers.Main requires a platform Main dispatcher" }], whatChanged: "Distinct coverage: Dispatchers.Main requires a platform Main dispatcher" },
      { id: "world-16-dispatchers-jobs-explore-4", number: "04", title: "Job scenario", language: 'Kotlin', subtitle: "Job tracks lifecycle and has join/cancel", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "Job tracks lifecycle and has join/cancel" }], whatChanged: "Distinct coverage: Job tracks lifecycle and has join/cancel" },
      { id: "world-16-dispatchers-jobs-explore-5", number: "05", title: "Withcontext scenario", language: 'Kotlin', subtitle: "withContext switches context and returns a value", code: ["import kotlinx.coroutines.*", "suspend fun answer()=withContext(Dispatchers.Default){42}", "fun main()=runBlocking{println(answer())}"], whatItMeans: [{ label: 'Behavior', description: "withContext switches context and returns a value" }], whatChanged: "Distinct coverage: withContext switches context and returns a value" },
      { id: "world-16-dispatchers-jobs-explore-6", number: "06", title: "Child scenario", language: 'Kotlin', subtitle: "child Job belongs to parent hierarchy", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "child Job belongs to parent hierarchy" }], whatChanged: "Distinct coverage: child Job belongs to parent hierarchy" },
      { id: "world-16-dispatchers-jobs-explore-7", number: "07", title: "Dispatcher scenario", language: 'Kotlin', subtitle: "dispatcher does not itself define business lifetime", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Behavior', description: "dispatcher does not itself define business lifetime" }], whatChanged: "Distinct coverage: dispatcher does not itself define business lifetime" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-dispatchers-jobs-predict-1", questionNumber: 1, totalQuestions: 7, title: "Dispatchers.default check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Dispatchers.Default for CPU-oriented shared-pool work.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Dispatchers.default check", detail: "Dispatchers.Default for CPU-oriented shared-pool work." } },
      { id: "world-16-dispatchers-jobs-predict-2", questionNumber: 2, totalQuestions: 7, title: "Dispatchers.io check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Dispatchers.io check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-dispatchers-jobs-predict-3", questionNumber: 3, totalQuestions: 7, title: "Dispatchers.main check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Dispatchers.Main requires a platform Main dispatcher.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Dispatchers.main check", detail: "Dispatchers.Main requires a platform Main dispatcher." } },
      { id: "world-16-dispatchers-jobs-predict-4", questionNumber: 4, totalQuestions: 7, title: "Job check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Job tracks lifecycle and has join/cancel.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Job check", detail: "Job tracks lifecycle and has join/cancel." } },
      { id: "world-16-dispatchers-jobs-predict-5", questionNumber: 5, totalQuestions: 7, title: "Withcontext check", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f()=withContext(Dispatchers.Default){3}", "fun main()=runBlocking{println(f())}"], prompt: "Output question: which result or statement is correct?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "Unit", isCorrect: false }, { id: "C", label: "Default", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Withcontext check", detail: "3" } },
      { id: "world-16-dispatchers-jobs-predict-6", questionNumber: 6, totalQuestions: 7, title: "Child check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Child Job belongs to parent hierarchy.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Child check", detail: "Child Job belongs to parent hierarchy." } },
      { id: "world-16-dispatchers-jobs-predict-7", questionNumber: 7, totalQuestions: 7, title: "Dispatcher check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Dispatcher does not itself define business lifetime.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Dispatcher check", detail: "Dispatcher does not itself define business lifetime." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Wait for a Job",
    description: "Launch work, join it, and print completed only after the Job finishes. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "WaitforaJob.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch(Dispatchers.Default) { delay(1) }\n    // TODO wait for completion\n    println(\"completed\")\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch(Dispatchers.Default) { delay(1) }\n    job.join()\n    println(\"completed\")\n}",
    sampleInput: "main()",
    expectedOutput: "completed",
    testCase: { call: "", expected: "completed" }
  },
  debug: {
    title: "Join before Checking Completion",
    subtitle: "The code checks isCompleted before waiting for the Job.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch { delay(10) }\n    println(job.isCompleted)\n    job.join()\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch { delay(10) }\n    job.join()\n    println(job.isCompleted)\n}",
    expectedOutput: "true",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Dispatchers & Jobs",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "7 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "7 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const CANCELLATION_COOPERATIVE_CANCELLATION_LESSON: FiveStageLesson = {
  id: "world-16-cancellation-cooperative-cancellation",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Cancellation & Cooperative Cancellation",
  learn: {
    title: "Cancellation & Cooperative Cancellation",
    subtitle: "Cancel coroutine work cooperatively using suspending cancellation points, isActive, ensureActive, and yield without claiming arbitrary blocking code is interrupted. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"],
    explanation: "Cancel coroutine work cooperatively using suspending cancellation points, isActive, ensureActive, and yield without claiming arbitrary blocking code is interrupted. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Cancel coroutine work cooperatively using suspending cancellation points, isActive, ensureActive, and yield without claiming arbitrary blocking code is interrupted." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Cancel coroutine work cooperatively using suspending cancellation points, isActive, ensureActive, and yield without claiming arbitrary blocking code is interrupted."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "8 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-cancellation-cooperative-cancellation-explore-1", number: "01", title: "Job.cancel scenario", language: 'Kotlin', subtitle: "Job.cancel requests cancellation", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "Job.cancel requests cancellation" }], whatChanged: "Distinct coverage: Job.cancel requests cancellation" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-2", number: "02", title: "Cancellation scenario", language: 'Kotlin', subtitle: "cancellation is cooperative", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], whatItMeans: [{ label: 'Behavior', description: "cancellation is cooperative" }], whatChanged: "Distinct coverage: cancellation is cooperative" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-3", number: "03", title: "Delay/yield scenario", language: 'Kotlin', subtitle: "delay/yield and many suspending functions check cancellation", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ yield(); println(\"active\") }"], whatItMeans: [{ label: 'Behavior', description: "delay/yield and many suspending functions check cancellation" }], whatChanged: "Distinct coverage: delay/yield and many suspending functions check cancellation" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-4", number: "04", title: "Isactive scenario", language: 'Kotlin', subtitle: "isActive supports polling loops", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val j=launch{while(isActive){yield()}}; j.cancelAndJoin(); println(j.isCancelled) }"], whatItMeans: [{ label: 'Behavior', description: "isActive supports polling loops" }], whatChanged: "Distinct coverage: isActive supports polling loops" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-5", number: "05", title: "Ensureactive scenario", language: 'Kotlin', subtitle: "ensureActive throws when inactive", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val j=launch{repeat(3){ensureActive();yield()}}; j.join(); println(\"done\") }"], whatItMeans: [{ label: 'Behavior', description: "ensureActive throws when inactive" }], whatChanged: "Distinct coverage: ensureActive throws when inactive" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-6", number: "06", title: "Finally scenario", language: 'Kotlin', subtitle: "finally is used for cleanup", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val j=launch{try{delay(1000)}finally{println(\"cleanup\")}}; yield(); j.cancelAndJoin() }"], whatItMeans: [{ label: 'Behavior', description: "finally is used for cleanup" }], whatChanged: "Distinct coverage: finally is used for cleanup" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-7", number: "07", title: "Blocking scenario", language: 'Kotlin', subtitle: "blocking code does not become interruptible merely because it is in a coroutine", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "blocking code does not become interruptible merely because it is in a coroutine" }], whatChanged: "Distinct coverage: blocking code does not become interruptible merely because it is in a coroutine" },
      { id: "world-16-cancellation-cooperative-cancellation-explore-8", number: "08", title: "Cancellationexception scenario", language: 'Kotlin', subtitle: "CancellationException represents normal cancellation", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "CancellationException represents normal cancellation" }], whatChanged: "Distinct coverage: CancellationException represents normal cancellation" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-cancellation-cooperative-cancellation-predict-1", questionNumber: 1, totalQuestions: 8, title: "Job.cancel check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Job.cancel requests cancellation.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Job.cancel check", detail: "Job.cancel requests cancellation." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-2", questionNumber: 2, totalQuestions: 8, title: "Cancellation check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Cancellation is cooperative.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Cancellation check", detail: "Cancellation is cooperative." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-3", questionNumber: 3, totalQuestions: 8, title: "Delay/yield check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Delay/yield check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-4", questionNumber: 4, totalQuestions: 8, title: "Isactive check", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{while(isActive){yield()}};j.cancelAndJoin();println(j.isCancelled)}"], prompt: "Cancellation question: which result or statement is correct?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "false", isCorrect: false }, { id: "C", label: "The loop cannot observe cancellation.", isCorrect: false }, { id: "D", label: "Compilation error", isCorrect: false }], explanation: { codeRef: "Isactive check", detail: "true" } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-5", questionNumber: 5, totalQuestions: 8, title: "Ensureactive check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "EnsureActive throws when inactive.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Ensureactive check", detail: "EnsureActive throws when inactive." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-6", questionNumber: 6, totalQuestions: 8, title: "Finally check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { while (isActive) { yield() } }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Finally is used for cleanup.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Finally check", detail: "Finally is used for cleanup." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-7", questionNumber: 7, totalQuestions: 8, title: "Blocking check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Blocking check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-8", questionNumber: 8, totalQuestions: 8, title: "Cancellationexception check", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Normal Job cancellation uses CancellationException semantics."], prompt: "Cancellation question: which result or statement is correct?", options: [{ id: "A", label: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure.", isCorrect: true }, { id: "B", label: "CancellationException always means a program bug.", isCorrect: false }, { id: "C", label: "CancellationException is unrelated to Job cancellation.", isCorrect: false }, { id: "D", label: "cancel() must fail the parent.", isCorrect: false }], explanation: { codeRef: "Cancellationexception check", detail: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Stop a Cooperative Loop",
    description: "Use isActive and yield so cancellation can stop the loop, then print the cancellation state. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "StopaCooperativeLoop.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch {\n        while (true) {\n            // TODO make loop cooperative\n        }\n    }\n    yield()\n    job.cancelAndJoin()\n    println(job.isCancelled)\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch {\n        while (isActive) {\n            yield()\n        }\n    }\n    yield()\n    job.cancelAndJoin()\n    println(job.isCancelled)\n}",
    sampleInput: "main()",
    expectedOutput: "true",
    testCase: { call: "", expected: "true" }
  },
  debug: {
    title: "Preserve Cancellation",
    subtitle: "The loop catches CancellationException and incorrectly keeps running.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch {\n        try { delay(1000) }\n        catch (e: CancellationException) { println(\"ignored\") }\n        println(\"continued\")\n    }\n    yield()\n    job.cancelAndJoin()\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val job = launch {\n        try { delay(1000) }\n        finally { println(\"cleanup\") }\n    }\n    yield()\n    job.cancelAndJoin()\n}",
    expectedOutput: "cleanup",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Cancellation & Cooperative Cancellation",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "8 / 8 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "8 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "8 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const STRUCTURED_CONCURRENCY_LESSON: FiveStageLesson = {
  id: "world-16-structured-concurrency",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Structured Concurrency",
  learn: {
    title: "Structured Concurrency",
    subtitle: "Keep child work inside an explicit parent lifetime so completion, cancellation, and failure form a predictable hierarchy. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"],
    explanation: "Keep child work inside an explicit parent lifetime so completion, cancellation, and failure form a predictable hierarchy. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Keep child work inside an explicit parent lifetime so completion, cancellation, and failure form a predictable hierarchy." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Keep child work inside an explicit parent lifetime so completion, cancellation, and failure form a predictable hierarchy."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "7 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-structured-concurrency-explore-1", number: "01", title: "Children scenario", language: 'Kotlin', subtitle: "children belong to a parent Job", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val j=launch{};j.join();println(j.isCompleted)}"], whatItMeans: [{ label: 'Behavior', description: "children belong to a parent Job" }], whatChanged: "Distinct coverage: children belong to a parent Job" },
      { id: "world-16-structured-concurrency-explore-2", number: "02", title: "Parent scenario", language: 'Kotlin', subtitle: "parent waits for children", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], whatItMeans: [{ label: 'Behavior', description: "parent waits for children" }], whatChanged: "Distinct coverage: parent waits for children" },
      { id: "world-16-structured-concurrency-explore-3", number: "03", title: "Parent scenario", language: 'Kotlin', subtitle: "parent cancellation cancels children", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], whatItMeans: [{ label: 'Behavior', description: "parent cancellation cancels children" }], whatChanged: "Distinct coverage: parent cancellation cancels children" },
      { id: "world-16-structured-concurrency-explore-4", number: "04", title: "Ordinary scenario", language: 'Kotlin', subtitle: "ordinary child failure cancels parent/siblings", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ supervisorScope{ val a=async{1}; val b=async{2}; println(a.await()+b.await()) } }"], whatItMeans: [{ label: 'Behavior', description: "ordinary child failure cancels parent/siblings" }], whatChanged: "Distinct coverage: ordinary child failure cancels parent/siblings" },
      { id: "world-16-structured-concurrency-explore-5", number: "05", title: "Async scenario", language: 'Kotlin', subtitle: "async children remain structurally owned", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], whatItMeans: [{ label: 'Behavior', description: "async children remain structurally owned" }], whatChanged: "Distinct coverage: async children remain structurally owned" },
      { id: "world-16-structured-concurrency-explore-6", number: "06", title: "Avoid scenario", language: 'Kotlin', subtitle: "avoid detached GlobalScope for ordinary application work", code: ["// Prefer an injected/owned CoroutineScope over GlobalScope for ordinary application work."], whatItMeans: [{ label: 'Behavior', description: "avoid detached GlobalScope for ordinary application work" }], whatChanged: "Distinct coverage: avoid detached GlobalScope for ordinary application work" },
      { id: "world-16-structured-concurrency-explore-7", number: "07", title: "Structured scenario", language: 'Kotlin', subtitle: "structured functions do not return before their children finish", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], whatItMeans: [{ label: 'Behavior', description: "structured functions do not return before their children finish" }], whatChanged: "Distinct coverage: structured functions do not return before their children finish" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-structured-concurrency-predict-1", questionNumber: 1, totalQuestions: 7, title: "Children check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ coroutineScope{launch{delay(1)}}; println(\"done\") }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "done prints only after the child in coroutineScope completes.", isCorrect: true }, { id: "B", label: "done must print before the child completes.", isCorrect: false }, { id: "C", label: "coroutineScope detaches the child.", isCorrect: false }, { id: "D", label: "coroutineScope blocks the OS thread by contract.", isCorrect: false }], explanation: { codeRef: "Children check", detail: "done prints only after the child in coroutineScope completes." } },
      { id: "world-16-structured-concurrency-predict-2", questionNumber: 2, totalQuestions: 7, title: "Parent check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ coroutineScope{launch{delay(1)}}; println(\"done\") }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "done prints only after the child in coroutineScope completes.", isCorrect: true }, { id: "B", label: "done must print before the child completes.", isCorrect: false }, { id: "C", label: "coroutineScope detaches the child.", isCorrect: false }, { id: "D", label: "coroutineScope blocks the OS thread by contract.", isCorrect: false }], explanation: { codeRef: "Parent check", detail: "done prints only after the child in coroutineScope completes." } },
      { id: "world-16-structured-concurrency-predict-3", questionNumber: 3, totalQuestions: 7, title: "Parent check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ coroutineScope{launch{delay(1)}}; println(\"done\") }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "done prints only after the child in coroutineScope completes.", isCorrect: true }, { id: "B", label: "done must print before the child completes.", isCorrect: false }, { id: "C", label: "coroutineScope detaches the child.", isCorrect: false }, { id: "D", label: "coroutineScope blocks the OS thread by contract.", isCorrect: false }], explanation: { codeRef: "Parent check", detail: "done prints only after the child in coroutineScope completes." } },
      { id: "world-16-structured-concurrency-predict-4", questionNumber: 4, totalQuestions: 7, title: "Ordinary check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Ordinary child failure cancels parent/siblings.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Ordinary check", detail: "Ordinary child failure cancels parent/siblings." } },
      { id: "world-16-structured-concurrency-predict-5", questionNumber: 5, totalQuestions: 7, title: "Async check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Async children remain structurally owned.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "Async children remain structurally owned." } },
      { id: "world-16-structured-concurrency-predict-6", questionNumber: 6, totalQuestions: 7, title: "Avoid check", topicMeta: "lifecycle", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Compare an owned CoroutineScope with GlobalScope."], prompt: "Lifecycle question: which result or statement is correct?", options: [{ id: "A", label: "An owned scope makes the work lifetime explicit; GlobalScope is generally inappropriate for ordinary lifecycle-bound work.", isCorrect: true }, { id: "B", label: "GlobalScope automatically follows every UI lifecycle.", isCorrect: false }, { id: "C", label: "GlobalScope is required for structured concurrency.", isCorrect: false }, { id: "D", label: "GlobalScope makes tests deterministic.", isCorrect: false }], explanation: { codeRef: "Avoid check", detail: "An owned scope makes the work lifetime explicit; GlobalScope is generally inappropriate for ordinary lifecycle-bound work." } },
      { id: "world-16-structured-concurrency-predict-7", questionNumber: 7, totalQuestions: 7, title: "Structured check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { delay(1) } }", "    println(\"scope complete\")", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Structured functions do not return before their children finish.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Structured check", detail: "Structured functions do not return before their children finish." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Own Two Children",
    description: "Use coroutineScope so the suspend function returns only after both child Jobs finish. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "OwnTwoChildren.kt",
    initialCode: "import kotlinx.coroutines.*\nsuspend fun runOwned(): String {\n    // TODO create a coroutineScope and two children\n    TODO()\n}\nfun main() = runBlocking { println(runOwned()) }",
    solutionCode: "import kotlinx.coroutines.*\nsuspend fun runOwned(): String = coroutineScope {\n    launch { delay(1) }\n    launch { delay(1) }\n    \"children complete\"\n}\nfun main() = runBlocking { println(runOwned()) }",
    sampleInput: "main()",
    expectedOutput: "children complete",
    testCase: { call: "", expected: "children complete" }
  },
  debug: {
    title: "Keep the Child Structured",
    subtitle: "The helper detaches ordinary work in GlobalScope instead of owning it.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\n@OptIn(DelicateCoroutinesApi::class)\nsuspend fun save(): String {\n    GlobalScope.launch { delay(1) }\n    return \"returned\"\n}\nfun main() = runBlocking { println(save()) }",
    fixedCode: "import kotlinx.coroutines.*\nsuspend fun save(): String = coroutineScope {\n    launch { delay(1) }\n    \"returned\"\n}\nfun main() = runBlocking { println(save()) }",
    expectedOutput: "returned",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Structured Concurrency",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "7 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "7 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const COROUTINE_SCOPE_LESSON: FiveStageLesson = {
  id: "world-16-coroutinescope",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "coroutineScope",
  learn: {
    title: "coroutineScope",
    subtitle: "Use coroutineScope to create a suspending structured boundary that waits for children and fails as a unit. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"],
    explanation: "Use coroutineScope to create a suspending structured boundary that waits for children and fails as a unit. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Use coroutineScope to create a suspending structured boundary that waits for children and fails as a unit." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Use coroutineScope to create a suspending structured boundary that waits for children and fails as a unit."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "6 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-coroutinescope-explore-1", number: "01", title: "Coroutinescope scenario", language: 'Kotlin', subtitle: "coroutineScope is a suspending function", code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Behavior', description: "coroutineScope is a suspending function" }], whatChanged: "Distinct coverage: coroutineScope is a suspending function" },
      { id: "world-16-coroutinescope-explore-2", number: "02", title: "It scenario", language: 'Kotlin', subtitle: "it creates a child scope and waits for all children", code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Behavior', description: "it creates a child scope and waits for all children" }], whatChanged: "Distinct coverage: it creates a child scope and waits for all children" },
      { id: "world-16-coroutinescope-explore-3", number: "03", title: "It scenario", language: 'Kotlin', subtitle: "it returns the block result", code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Behavior', description: "it returns the block result" }], whatChanged: "Distinct coverage: it returns the block result" },
      { id: "world-16-coroutinescope-explore-4", number: "04", title: "Child scenario", language: 'Kotlin', subtitle: "child failure cancels the scope and siblings", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ supervisorScope{ val a=async{1}; val b=async{2}; println(a.await()+b.await()) } }"], whatItMeans: [{ label: 'Behavior', description: "child failure cancels the scope and siblings" }], whatChanged: "Distinct coverage: child failure cancels the scope and siblings" },
      { id: "world-16-coroutinescope-explore-5", number: "05", title: "Caller scenario", language: 'Kotlin', subtitle: "caller is suspended rather than its thread being blocked", code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Behavior', description: "caller is suspended rather than its thread being blocked" }], whatChanged: "Distinct coverage: caller is suspended rather than its thread being blocked" },
      { id: "world-16-coroutinescope-explore-6", number: "06", title: "Use scenario", language: 'Kotlin', subtitle: "use it to implement concurrent suspend functions", code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Behavior', description: "use it to implement concurrent suspend functions" }], whatChanged: "Distinct coverage: use it to implement concurrent suspend functions" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-coroutinescope-predict-1", questionNumber: 1, totalQuestions: 6, title: "Coroutinescope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineScope is a suspending function.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinescope check", detail: "CoroutineScope is a suspending function." } },
      { id: "world-16-coroutinescope-predict-2", questionNumber: 2, totalQuestions: 6, title: "It check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "It creates a child scope and waits for all children.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "It check", detail: "It creates a child scope and waits for all children." } },
      { id: "world-16-coroutinescope-predict-3", questionNumber: 3, totalQuestions: 6, title: "It check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "It returns the block result.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "It check", detail: "It returns the block result." } },
      { id: "world-16-coroutinescope-predict-4", questionNumber: 4, totalQuestions: 6, title: "Child check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Child failure cancels the scope and siblings.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Child check", detail: "Child failure cancels the scope and siblings." } },
      { id: "world-16-coroutinescope-predict-5", questionNumber: 5, totalQuestions: 6, title: "Caller check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A coroutine may suspend and later resume according to its dispatcher."], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Coroutine identity is not the same thing as thread identity.", isCorrect: true }, { id: "B", label: "Every coroutine owns exactly one thread.", isCorrect: false }, { id: "C", label: "A suspended coroutine permanently keeps its thread.", isCorrect: false }, { id: "D", label: "Dispatchers are Jobs.", isCorrect: false }], explanation: { codeRef: "Caller check", detail: "Coroutine identity is not the same thing as thread identity." } },
      { id: "world-16-coroutinescope-predict-6", questionNumber: 6, totalQuestions: 6, title: "Use check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { async { 4 }.await() }", "fun main() = runBlocking { println(value()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Use it to implement concurrent suspend functions.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Use check", detail: "Use it to implement concurrent suspend functions." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Return from coroutineScope",
    description: "Run two async children in coroutineScope and return their deterministic sum. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "ReturnfromcoroutineScope.kt",
    initialCode: "import kotlinx.coroutines.*\nsuspend fun total(): Int = coroutineScope {\n    // TODO async values 4 and 6, await both, return sum\n    0\n}\nfun main() = runBlocking { println(total()) }",
    solutionCode: "import kotlinx.coroutines.*\nsuspend fun total(): Int = coroutineScope {\n    val a = async { 4 }\n    val b = async { 6 }\n    a.await() + b.await()\n}\nfun main() = runBlocking { println(total()) }",
    sampleInput: "main()",
    expectedOutput: "10",
    testCase: { call: "", expected: "10" }
  },
  debug: {
    title: "Await the Child before Returning",
    subtitle: "A manually created detached scope lets the function return before its child is owned by the caller.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nsuspend fun load(): String {\n    CoroutineScope(Dispatchers.Default).launch { delay(10) }\n    return \"done\"\n}\nfun main() = runBlocking { println(load()) }",
    fixedCode: "import kotlinx.coroutines.*\nsuspend fun load(): String = coroutineScope {\n    launch { delay(10) }\n    \"done\"\n}\nfun main() = runBlocking { println(load()) }",
    expectedOutput: "done",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "coroutineScope",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "6 / 6 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "6 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "6 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const SUPERVISOR_SCOPE_LESSON: FiveStageLesson = {
  id: "world-16-supervisorscope",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "supervisorScope",
  learn: {
    title: "supervisorScope",
    subtitle: "Use supervisorScope when sibling failure isolation is intentional, while still handling each child failure correctly. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"],
    explanation: "Use supervisorScope when sibling failure isolation is intentional, while still handling each child failure correctly. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Use supervisorScope when sibling failure isolation is intentional, while still handling each child failure correctly." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Use supervisorScope when sibling failure isolation is intentional, while still handling each child failure correctly."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "7 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-supervisorscope-explore-1", number: "01", title: "Supervisorscope scenario", language: 'Kotlin', subtitle: "supervisorScope waits for children", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ supervisorScope{ val a=async{1}; val b=async{2}; println(a.await()+b.await()) } }"], whatItMeans: [{ label: 'Behavior', description: "supervisorScope waits for children" }], whatChanged: "Distinct coverage: supervisorScope waits for children" },
      { id: "world-16-supervisorscope-explore-2", number: "02", title: "A scenario", language: 'Kotlin', subtitle: "a child failure does not automatically cancel sibling children", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ supervisorScope{ val a=async{1}; val b=async{2}; println(a.await()+b.await()) } }"], whatItMeans: [{ label: 'Behavior', description: "a child failure does not automatically cancel sibling children" }], whatChanged: "Distinct coverage: a child failure does not automatically cancel sibling children" },
      { id: "world-16-supervisorscope-explore-3", number: "03", title: "Scope scenario", language: 'Kotlin', subtitle: "scope failure itself cancels children", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "scope failure itself cancels children" }], whatChanged: "Distinct coverage: scope failure itself cancels children" },
      { id: "world-16-supervisorscope-explore-4", number: "04", title: "Launch scenario", language: 'Kotlin', subtitle: "launch child exceptions need appropriate handling", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "launch child exceptions need appropriate handling" }], whatChanged: "Distinct coverage: launch child exceptions need appropriate handling" },
      { id: "world-16-supervisorscope-explore-5", number: "05", title: "Async scenario", language: 'Kotlin', subtitle: "async still stores failure in Deferred and await rethrows", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d=async{9}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "async still stores failure in Deferred and await rethrows" }], whatChanged: "Distinct coverage: async still stores failure in Deferred and await rethrows" },
      { id: "world-16-supervisorscope-explore-6", number: "06", title: "Supervision scenario", language: 'Kotlin', subtitle: "supervision is not exception suppression", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "supervision is not exception suppression" }], whatChanged: "Distinct coverage: supervision is not exception suppression" },
      { id: "world-16-supervisorscope-explore-7", number: "07", title: "Cancellation scenario", language: 'Kotlin', subtitle: "cancellation from parent still propagates downward", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], whatItMeans: [{ label: 'Behavior', description: "cancellation from parent still propagates downward" }], whatChanged: "Distinct coverage: cancellation from parent still propagates downward" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-supervisorscope-predict-1", questionNumber: 1, totalQuestions: 7, title: "Supervisorscope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "SupervisorScope waits for children.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Supervisorscope check", detail: "SupervisorScope waits for children." } },
      { id: "world-16-supervisorscope-predict-2", questionNumber: 2, totalQuestions: 7, title: "A check", topicMeta: "exception propagation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// In supervisorScope, one child failure does not automatically cancel sibling children."], prompt: "Exception propagation question: which result or statement is correct?", options: [{ id: "A", label: "A direct child failure does not automatically cancel its siblings in supervisorScope.", isCorrect: true }, { id: "B", label: "Every child failure always cancels every sibling.", isCorrect: false }, { id: "C", label: "supervisorScope suppresses every exception.", isCorrect: false }, { id: "D", label: "supervisorScope detaches children from the parent.", isCorrect: false }], explanation: { codeRef: "A check", detail: "A direct child failure does not automatically cancel its siblings in supervisorScope." } },
      { id: "world-16-supervisorscope-predict-3", questionNumber: 3, totalQuestions: 7, title: "Scope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Scope failure itself cancels children.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Scope check", detail: "Scope failure itself cancels children." } },
      { id: "world-16-supervisorscope-predict-4", questionNumber: 4, totalQuestions: 7, title: "Launch check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Launch child exceptions need appropriate handling.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Launch check", detail: "Launch child exceptions need appropriate handling." } },
      { id: "world-16-supervisorscope-predict-5", questionNumber: 5, totalQuestions: 7, title: "Async check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-supervisorscope-predict-6", questionNumber: 6, totalQuestions: 7, title: "Supervision check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Supervision is not exception suppression.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Supervision check", detail: "Supervision is not exception suppression." } },
      { id: "world-16-supervisorscope-predict-7", questionNumber: 7, totalQuestions: 7, title: "Cancellation check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val ok = async { 5 }", "        println(ok.await())", "    }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Cancellation from parent still propagates downward.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Cancellation check", detail: "Cancellation from parent still propagates downward." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Isolate an Expected Child Failure",
    description: "Use supervisorScope with async children; catch the failed Deferred and still print the healthy result. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "IsolateanExpectedChildFailure.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val bad = async<Int> { throw IllegalStateException(\"bad\") }\n        val good = async { 7 }\n        // TODO handle bad.await() and print good.await()\n    }\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val bad = async<Int> { throw IllegalStateException(\"bad\") }\n        val good = async { 7 }\n        try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }\n        println(good.await())\n    }\n}",
    sampleInput: "main()",
    expectedOutput: "bad\n7",
    testCase: { call: "", expected: "bad\n7" }
  },
  debug: {
    title: "Use supervision for Independent Results",
    subtitle: "One async child is expected to fail independently, but ordinary coroutineScope cancels its sibling.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    try {\n        coroutineScope {\n            val bad = async<Int> { throw IllegalStateException(\"x\") }\n            val good = async { delay(1); 9 }\n            try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }\n            println(good.await())\n        }\n    } catch (e: IllegalStateException) { println(\"scope failed\") }\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val bad = async<Int> { throw IllegalStateException(\"x\") }\n        val good = async { delay(1); 9 }\n        try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }\n        println(good.await())\n    }\n}",
    expectedOutput: "bad\n9",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "supervisorScope",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "7 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "7 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const EXCEPTION_HANDLING_IN_COROUTINES_LESSON: FiveStageLesson = {
  id: "world-16-exception-handling-in-coroutines",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Exception Handling in Coroutines",
  learn: {
    title: "Exception Handling in Coroutines",
    subtitle: "Handle coroutine failures at the correct structural boundary and understand when CoroutineExceptionHandler does and does not apply. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(e.message) }", "}"],
    explanation: "Handle coroutine failures at the correct structural boundary and understand when CoroutineExceptionHandler does and does not apply. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Handle coroutine failures at the correct structural boundary and understand when CoroutineExceptionHandler does and does not apply." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Handle coroutine failures at the correct structural boundary and understand when CoroutineExceptionHandler does and does not apply."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "8 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-exception-handling-in-coroutines-explore-1", number: "01", title: "Launch scenario", language: 'Kotlin', subtitle: "launch and async expose failures differently", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "launch and async expose failures differently" }], whatChanged: "Distinct coverage: launch and async expose failures differently" },
      { id: "world-16-exception-handling-in-coroutines-explore-2", number: "02", title: "Async scenario", language: 'Kotlin', subtitle: "async captures exception in Deferred and await rethrows", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d=async{9}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "async captures exception in Deferred and await rethrows" }], whatChanged: "Distinct coverage: async captures exception in Deferred and await rethrows" },
      { id: "world-16-exception-handling-in-coroutines-explore-3", number: "03", title: "Child scenario", language: 'Kotlin', subtitle: "child failure normally propagates to parent", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "child failure normally propagates to parent" }], whatChanged: "Distinct coverage: child failure normally propagates to parent" },
      { id: "world-16-exception-handling-in-coroutines-explore-4", number: "04", title: "Cancellationexception scenario", language: 'Kotlin', subtitle: "CancellationException is normal cancellation", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "CancellationException is normal cancellation" }], whatChanged: "Distinct coverage: CancellationException is normal cancellation" },
      { id: "world-16-exception-handling-in-coroutines-explore-5", number: "05", title: "Coroutineexceptionhandler scenario", language: 'Kotlin', subtitle: "CoroutineExceptionHandler handles uncaught root/supervised launch-style exceptions, not every exception", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "CoroutineExceptionHandler handles uncaught root/supervised launch-style exceptions, not every exception" }], whatChanged: "Distinct coverage: CoroutineExceptionHandler handles uncaught root/supervised launch-style exceptions, not every exception" },
      { id: "world-16-exception-handling-in-coroutines-explore-6", number: "06", title: "Try/catch scenario", language: 'Kotlin', subtitle: "try/catch around await handles Deferred failure", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val d=async{9}; println(d.await()) }"], whatItMeans: [{ label: 'Behavior', description: "try/catch around await handles Deferred failure" }], whatChanged: "Distinct coverage: try/catch around await handles Deferred failure" },
      { id: "world-16-exception-handling-in-coroutines-explore-7", number: "07", title: "Supervision scenario", language: 'Kotlin', subtitle: "supervision changes propagation, not the need to handle failures", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "supervision changes propagation, not the need to handle failures" }], whatChanged: "Distinct coverage: supervision changes propagation, not the need to handle failures" },
      { id: "world-16-exception-handling-in-coroutines-explore-8", number: "08", title: "Finally scenario", language: 'Kotlin', subtitle: "finally supports cleanup", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val j=launch{try{delay(1000)}finally{println(\"cleanup\")}}; yield(); j.cancelAndJoin() }"], whatItMeans: [{ label: 'Behavior', description: "finally supports cleanup" }], whatChanged: "Distinct coverage: finally supports cleanup" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-exception-handling-in-coroutines-predict-1", questionNumber: 1, totalQuestions: 8, title: "Launch check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(e.message) }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Launch and async expose failures differently.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Launch check", detail: "Launch and async expose failures differently." } },
      { id: "world-16-exception-handling-in-coroutines-predict-2", questionNumber: 2, totalQuestions: 8, title: "Async check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-exception-handling-in-coroutines-predict-3", questionNumber: 3, totalQuestions: 8, title: "Child check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(e.message) }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Child failure normally propagates to parent.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Child check", detail: "Child failure normally propagates to parent." } },
      { id: "world-16-exception-handling-in-coroutines-predict-4", questionNumber: 4, totalQuestions: 8, title: "Cancellationexception check", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Normal Job cancellation uses CancellationException semantics."], prompt: "Cancellation question: which result or statement is correct?", options: [{ id: "A", label: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure.", isCorrect: true }, { id: "B", label: "CancellationException always means a program bug.", isCorrect: false }, { id: "C", label: "CancellationException is unrelated to Job cancellation.", isCorrect: false }, { id: "D", label: "cancel() must fail the parent.", isCorrect: false }], explanation: { codeRef: "Cancellationexception check", detail: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure." } },
      { id: "world-16-exception-handling-in-coroutines-predict-5", questionNumber: 5, totalQuestions: 8, title: "Coroutineexceptionhandler check", topicMeta: "exception propagation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// CoroutineExceptionHandler is for uncaught exceptions; async exposes failure through Deferred/await."], prompt: "Exception propagation question: which result or statement is correct?", options: [{ id: "A", label: "A handler is not a universal try/catch and does not replace awaiting a failed Deferred.", isCorrect: true }, { id: "B", label: "A handler catches every coroutine exception.", isCorrect: false }, { id: "C", label: "A handler makes async.await return null on failure.", isCorrect: false }, { id: "D", label: "A handler prevents structured cancellation.", isCorrect: false }], explanation: { codeRef: "Coroutineexceptionhandler check", detail: "A handler is not a universal try/catch and does not replace awaiting a failed Deferred." } },
      { id: "world-16-exception-handling-in-coroutines-predict-6", questionNumber: 6, totalQuestions: 8, title: "Try/catch check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Try/catch check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-exception-handling-in-coroutines-predict-7", questionNumber: 7, totalQuestions: 8, title: "Supervision check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(e.message) }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Supervision changes propagation, not the need to handle failures.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Supervision check", detail: "Supervision changes propagation, not the need to handle failures." } },
      { id: "world-16-exception-handling-in-coroutines-predict-8", questionNumber: 8, totalQuestions: 8, title: "Finally check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(e.message) }", "}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Finally supports cleanup.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Finally check", detail: "Finally supports cleanup." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Handle a Deferred Failure",
    description: "Catch the exception at await and print a deterministic fallback. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "HandleaDeferredFailure.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val result = async<Int> { throw IllegalArgumentException(\"invalid\") }\n    // TODO await safely and print -1 on IllegalArgumentException\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val result = async<Int> { throw IllegalArgumentException(\"invalid\") }\n    val value = try { result.await() } catch (e: IllegalArgumentException) { -1 }\n    println(value)\n}",
    sampleInput: "main()",
    expectedOutput: "-1",
    testCase: { call: "", expected: "-1" }
  },
  debug: {
    title: "Do Not Expect a Handler to Replace await",
    subtitle: "The async failure is never awaited; handle it at the Deferred boundary instead.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val handler = CoroutineExceptionHandler { _, _ -> println(\"handled\") }\n    val d = async(handler) { throw IllegalStateException(\"boom\") }\n    d.join()\n    println(\"done\")\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val d = async<Int> { throw IllegalStateException(\"boom\") }\n    try { d.await() } catch (e: IllegalStateException) { println(\"handled\") }\n}\n",
    expectedOutput: "handled",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Exception Handling in Coroutines",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "8 / 8 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "8 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "8 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const COROUTINE_BEST_PRACTICES_LESSON: FiveStageLesson = {
  id: "world-16-coroutine-best-practices",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Coroutine Best Practices",
  learn: {
    title: "Coroutine Best Practices",
    subtitle: "Design coroutine APIs around suspend functions, owned scopes, injected dispatchers, main-safety, structured concurrency, and testable behavior. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"],
    explanation: "Design coroutine APIs around suspend functions, owned scopes, injected dispatchers, main-safety, structured concurrency, and testable behavior. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Design coroutine APIs around suspend functions, owned scopes, injected dispatchers, main-safety, structured concurrency, and testable behavior." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Design coroutine APIs around suspend functions, owned scopes, injected dispatchers, main-safety, structured concurrency, and testable behavior."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "8 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-coroutine-best-practices-explore-1", number: "01", title: "Scope scenario", language: 'Kotlin', subtitle: "scope ownership follows lifecycle", code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], whatItMeans: [{ label: 'Behavior', description: "scope ownership follows lifecycle" }], whatChanged: "Distinct coverage: scope ownership follows lifecycle" },
      { id: "world-16-coroutine-best-practices-explore-2", number: "02", title: "Avoid scenario", language: 'Kotlin', subtitle: "avoid GlobalScope for ordinary work", code: ["// Prefer an injected/owned CoroutineScope over GlobalScope for ordinary application work."], whatItMeans: [{ label: 'Behavior', description: "avoid GlobalScope for ordinary work" }], whatChanged: "Distinct coverage: avoid GlobalScope for ordinary work" },
      { id: "world-16-coroutine-best-practices-explore-3", number: "03", title: "Inject scenario", language: 'Kotlin', subtitle: "inject dispatchers when context choice belongs to a component", code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], whatItMeans: [{ label: 'Behavior', description: "inject dispatchers when context choice belongs to a component" }], whatChanged: "Distinct coverage: inject dispatchers when context choice belongs to a component" },
      { id: "world-16-coroutine-best-practices-explore-4", number: "04", title: "Use scenario", language: 'Kotlin', subtitle: "use withContext for blocking/CPU context changes", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ delay(1); println(\"resumed\") }"], whatItMeans: [{ label: 'Behavior', description: "use withContext for blocking/CPU context changes" }], whatChanged: "Distinct coverage: use withContext for blocking/CPU context changes" },
      { id: "world-16-coroutine-best-practices-explore-5", number: "05", title: "Expose scenario", language: 'Kotlin', subtitle: "expose suspend APIs instead of launching hidden work when caller should own lifetime", code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], whatItMeans: [{ label: 'Behavior', description: "expose suspend APIs instead of launching hidden work when caller should own lifetime" }], whatChanged: "Distinct coverage: expose suspend APIs instead of launching hidden work when caller should own lifetime" },
      { id: "world-16-coroutine-best-practices-explore-6", number: "06", title: "Do scenario", language: 'Kotlin', subtitle: "do not swallow CancellationException", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{val d=async<Int>{throw IllegalArgumentException(\"x\")};try{d.await()}catch(e:IllegalArgumentException){println(\"caught\")}}"], whatItMeans: [{ label: 'Behavior', description: "do not swallow CancellationException" }], whatChanged: "Distinct coverage: do not swallow CancellationException" },
      { id: "world-16-coroutine-best-practices-explore-7", number: "07", title: "Avoid scenario", language: 'Kotlin', subtitle: "avoid shared mutable state races", code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], whatItMeans: [{ label: 'Behavior', description: "avoid shared mutable state races" }], whatChanged: "Distinct coverage: avoid shared mutable state races" },
      { id: "world-16-coroutine-best-practices-explore-8", number: "08", title: "Make scenario", language: 'Kotlin', subtitle: "make deterministic tests independent of scheduler timing", code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], whatItMeans: [{ label: 'Behavior', description: "make deterministic tests independent of scheduler timing" }], whatChanged: "Distinct coverage: make deterministic tests independent of scheduler timing" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-coroutine-best-practices-predict-1", questionNumber: 1, totalQuestions: 8, title: "Scope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Scope ownership follows lifecycle.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Scope check", detail: "Scope ownership follows lifecycle." } },
      { id: "world-16-coroutine-best-practices-predict-2", questionNumber: 2, totalQuestions: 8, title: "Avoid check", topicMeta: "lifecycle", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Compare an owned CoroutineScope with GlobalScope."], prompt: "Lifecycle question: which result or statement is correct?", options: [{ id: "A", label: "An owned scope makes the work lifetime explicit; GlobalScope is generally inappropriate for ordinary lifecycle-bound work.", isCorrect: true }, { id: "B", label: "GlobalScope automatically follows every UI lifecycle.", isCorrect: false }, { id: "C", label: "GlobalScope is required for structured concurrency.", isCorrect: false }, { id: "D", label: "GlobalScope makes tests deterministic.", isCorrect: false }], explanation: { codeRef: "Avoid check", detail: "An owned scope makes the work lifetime explicit; GlobalScope is generally inappropriate for ordinary lifecycle-bound work." } },
      { id: "world-16-coroutine-best-practices-predict-3", questionNumber: 3, totalQuestions: 8, title: "Inject check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Inject dispatchers when context choice belongs to a component.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Inject check", detail: "Inject dispatchers when context choice belongs to a component." } },
      { id: "world-16-coroutine-best-practices-predict-4", questionNumber: 4, totalQuestions: 8, title: "Use check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Use check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-coroutine-best-practices-predict-5", questionNumber: 5, totalQuestions: 8, title: "Expose check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Expose suspend APIs instead of launching hidden work when caller should own lifetime.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Expose check", detail: "Expose suspend APIs instead of launching hidden work when caller should own lifetime." } },
      { id: "world-16-coroutine-best-practices-predict-6", questionNumber: 6, totalQuestions: 8, title: "Do check", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Normal Job cancellation uses CancellationException semantics."], prompt: "Cancellation question: which result or statement is correct?", options: [{ id: "A", label: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure.", isCorrect: true }, { id: "B", label: "CancellationException always means a program bug.", isCorrect: false }, { id: "C", label: "CancellationException is unrelated to Job cancellation.", isCorrect: false }, { id: "D", label: "cancel() must fail the parent.", isCorrect: false }], explanation: { codeRef: "Do check", detail: "CancellationException represents normal coroutine cancellation and is treated differently from ordinary failure." } },
      { id: "world-16-coroutine-best-practices-predict-7", questionNumber: 7, totalQuestions: 8, title: "Avoid check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Avoid shared mutable state races.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Avoid check", detail: "Avoid shared mutable state races." } },
      { id: "world-16-coroutine-best-practices-predict-8", questionNumber: 8, totalQuestions: 8, title: "Make check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun compute() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(compute()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Make deterministic tests independent of scheduler timing.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Make check", detail: "Make deterministic tests independent of scheduler timing." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Make the API Caller-Owned",
    description: "Implement a suspend repository function that switches context with an injected dispatcher and returns a value. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "MaketheAPICallerOwned.kt",
    initialCode: "import kotlinx.coroutines.*\nclass Repo(private val dispatcher: CoroutineDispatcher) {\n    suspend fun load(): Int {\n        // TODO use withContext(dispatcher) and return 12\n        return 0\n    }\n}\nfun main() = runBlocking { println(Repo(Dispatchers.Default).load()) }",
    solutionCode: "import kotlinx.coroutines.*\nclass Repo(private val dispatcher: CoroutineDispatcher) {\n    suspend fun load(): Int = withContext(dispatcher) { 12 }\n}\nfun main() = runBlocking { println(Repo(Dispatchers.Default).load()) }",
    sampleInput: "main()",
    expectedOutput: "12",
    testCase: { call: "", expected: "12" }
  },
  debug: {
    title: "Remove the Unowned GlobalScope",
    subtitle: "The repository starts detached work and returns before it is structurally owned.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nclass Repo {\n    @OptIn(DelicateCoroutinesApi::class)\n    suspend fun load(): Int {\n        var n=0\n        GlobalScope.launch { n=12 }\n        return n\n    }\n}\nfun main()=runBlocking{println(Repo().load())}",
    fixedCode: "import kotlinx.coroutines.*\nclass Repo(private val dispatcher:CoroutineDispatcher=Dispatchers.Default) {\n    suspend fun load(): Int = withContext(dispatcher) { 12 }\n}\nfun main()=runBlocking{println(Repo().load())}",
    expectedOutput: "12",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Coroutine Best Practices",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "8 / 8 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "8 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "8 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const CONCURRENT_TASK_RUNNER_BOSS_LESSON: FiveStageLesson = {
  id: "world-16-boss",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Concurrent Task Runner",
  learn: {
    title: "Concurrent Task Runner",
    subtitle: "Build a structured task runner with multiple child computations, explicit ownership, deterministic result assembly, and focused failure handling. Prerequisite: functions, lambdas, exceptions, and prior Kotlin control-flow/OOP lessons as applicable.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"],
    explanation: "Build a structured task runner with multiple child computations, explicit ownership, deterministic result assembly, and focused failure handling. All executable examples require kotlinx-coroutines-core. The CodeDo JavaScript-style runner must not be treated as authoritative for coroutine scheduling, cancellation, context, or failure propagation.",
    keyIdeas: [{ number: 1, title: "Purpose", description: "Build a structured task runner with multiple child computations, explicit ownership, deterministic result assembly, and focused failure handling." }, { number: 2, title: "Dependency", description: "These examples require kotlinx-coroutines-core; coroutine builders are library APIs, while suspend is a Kotlin language modifier." }, { number: 3, title: "Ownership", description: "CoroutineScope provides lifecycle/context ownership. Child coroutines should normally remain structurally owned." }, { number: 4, title: "Correctness boundary", description: "Do not infer thread order or timing unless the program establishes a deterministic dependency such as join/await." }],
    keyTakeaway: "Build a structured task runner with multiple child computations, explicit ownership, deterministic result assembly, and focused failure handling."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "8 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-boss-explore-1", number: "01", title: "Coroutinescope scenario", language: 'Kotlin', subtitle: "coroutineScope owns child tasks", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "coroutineScope owns child tasks" }], whatChanged: "Distinct coverage: coroutineScope owns child tasks" },
      { id: "world-16-boss-explore-2", number: "02", title: "Async scenario", language: 'Kotlin', subtitle: "async is appropriate for returned values", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "async is appropriate for returned values" }], whatChanged: "Distinct coverage: async is appropriate for returned values" },
      { id: "world-16-boss-explore-3", number: "03", title: "Await scenario", language: 'Kotlin', subtitle: "await retrieves results", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "await retrieves results" }], whatChanged: "Distinct coverage: await retrieves results" },
      { id: "world-16-boss-explore-4", number: "04", title: "Launch scenario", language: 'Kotlin', subtitle: "launch is appropriate for side effects", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "launch is appropriate for side effects" }], whatChanged: "Distinct coverage: launch is appropriate for side effects" },
      { id: "world-16-boss-explore-5", number: "05", title: "Results scenario", language: 'Kotlin', subtitle: "results can be printed deterministically after awaiting even if completion order is concurrent", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "results can be printed deterministically after awaiting even if completion order is concurrent" }], whatChanged: "Distinct coverage: results can be printed deterministically after awaiting even if completion order is concurrent" },
      { id: "world-16-boss-explore-6", number: "06", title: "Failure scenario", language: 'Kotlin', subtitle: "failure cancels ordinary siblings", code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ supervisorScope{ val a=async{1}; val b=async{2}; println(a.await()+b.await()) } }"], whatItMeans: [{ label: 'Behavior', description: "failure cancels ordinary siblings" }], whatChanged: "Distinct coverage: failure cancels ordinary siblings" },
      { id: "world-16-boss-explore-7", number: "07", title: "Dispatcher/context scenario", language: 'Kotlin', subtitle: "dispatcher/context choice must be justified rather than decorative", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "dispatcher/context choice must be justified rather than decorative" }], whatChanged: "Distinct coverage: dispatcher/context choice must be justified rather than decorative" },
      { id: "world-16-boss-explore-8", number: "08", title: "Boss scenario", language: 'Kotlin', subtitle: "boss uses a coherent subset, not every coroutine API", code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], whatItMeans: [{ label: 'Behavior', description: "boss uses a coherent subset, not every coroutine API" }], whatChanged: "Distinct coverage: boss uses a coherent subset, not every coroutine API" }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-boss-predict-1", questionNumber: 1, totalQuestions: 8, title: "Coroutinescope check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "CoroutineScope owns child tasks.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Coroutinescope check", detail: "CoroutineScope owns child tasks." } },
      { id: "world-16-boss-predict-2", questionNumber: 2, totalQuestions: 8, title: "Async check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Async is appropriate for returned values.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Async check", detail: "Async is appropriate for returned values." } },
      { id: "world-16-boss-predict-3", questionNumber: 3, totalQuestions: 8, title: "Await check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Await check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-boss-predict-4", questionNumber: 4, totalQuestions: 8, title: "Launch check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Launch is appropriate for side effects.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Launch check", detail: "Launch is appropriate for side effects." } },
      { id: "world-16-boss-predict-5", questionNumber: 5, totalQuestions: 8, title: "Results check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Results check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-boss-predict-6", questionNumber: 6, totalQuestions: 8, title: "Failure check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Failure cancels ordinary siblings.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Failure check", detail: "Failure cancels ordinary siblings." } },
      { id: "world-16-boss-predict-7", questionNumber: 7, totalQuestions: 8, title: "Dispatcher/context check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Dispatcher/context choice must be justified rather than decorative.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Dispatcher/context check", detail: "Dispatcher/context choice must be justified rather than decorative." } },
      { id: "world-16-boss-predict-8", questionNumber: 8, totalQuestions: 8, title: "Boss check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun runTasks() = coroutineScope {", "    val a = async { delay(2); 20 }", "    val b = async { delay(1); 22 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(runTasks()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Boss uses a coherent subset, not every coroutine API.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Boss check", detail: "Boss uses a coherent subset, not every coroutine API." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Run Two Owned Tasks",
    description: "Use coroutineScope with two async children and print results in input order after awaiting both. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "RunTwoOwnedTasks.kt",
    initialCode: "import kotlinx.coroutines.*\nsuspend fun runTasks(): List<String> = coroutineScope {\n    // TODO start async tasks returning \"A\" and \"B\"\n    // TODO await and return them in A,B order\n    emptyList()\n}\nfun main() = runBlocking { println(runTasks().joinToString(\",\")) }",
    solutionCode: "import kotlinx.coroutines.*\nsuspend fun runTasks(): List<String> = coroutineScope {\n    val first = async(Dispatchers.Default) { \"A\" }\n    val second = async(Dispatchers.Default) { \"B\" }\n    listOf(first.await(), second.await())\n}\nfun main() = runBlocking { println(runTasks().joinToString(\",\")) }",
    sampleInput: "main()",
    expectedOutput: "A,B",
    testCase: { call: "", expected: "A,B" }
  },
  debug: {
    title: "Keep Task Failure inside Structured Ownership",
    subtitle: "Detached async work hides its failure from the task runner.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\n@OptIn(DelicateCoroutinesApi::class)\nsuspend fun runTask(): String {\n    GlobalScope.async { throw IllegalStateException(\"task failed\") }\n    return \"ok\"\n}\nfun main()=runBlocking{println(runTask())}",
    fixedCode: "import kotlinx.coroutines.*\nsuspend fun runTask(): String = coroutineScope {\n    val task = async<String> { throw IllegalStateException(\"task failed\") }\n    try { task.await() } catch (e: IllegalStateException) { \"failed\" }\n}\nfun main()=runBlocking{println(runTask())}",
    expectedOutput: "failed",
    hints: [
      "Identify the coroutine ownership, result, cancellation, or failure rule being violated.",
      "Do not translate the behavior into JavaScript Promise semantics.",
      "Apply one focused coroutine repair and preserve structured ownership."
    ],
    explanation: "The repair changes the coroutine-specific cause rather than masking the symptom. It requires real kotlinx.coroutines semantics."
  },
  mastered: {
    topicTitle: "Concurrent Task Runner",
    summary: "Coverage is authored and mapped, but World 16 is not automatically Verified because CodeDo coroutine-runtime capability remains a separate gate.",
    passedCount: "8 / 8 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "8 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "8 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Requires real kotlinx.coroutines; CodeDo-runner verification is not claimed" }
    ],
    xpEarned: 20,
    streakDays: 1,
    accuracy: "100%"
  }
};

export const WORLD_16_LESSONS: FiveStageLesson[] = [
  COROUTINE_FUNDAMENTALS_BUILDER_LESSON,
  LAUNCH_ASYNC_LESSON,
  AWAIT_SUSPENDING_FUNCTIONS_LESSON,
  SUSPEND_COROUTINE_CONTEXT_LESSON,
  DISPATCHERS_JOBS_LESSON,
  CANCELLATION_COOPERATIVE_CANCELLATION_LESSON,
  STRUCTURED_CONCURRENCY_LESSON,
  COROUTINE_SCOPE_LESSON,
  SUPERVISOR_SCOPE_LESSON,
  EXCEPTION_HANDLING_IN_COROUTINES_LESSON,
  COROUTINE_BEST_PRACTICES_LESSON,
  CONCURRENT_TASK_RUNNER_BOSS_LESSON,
];
