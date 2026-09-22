import { FiveStageLesson } from '../lessonStagesData';

export const COROUTINE_FUNDAMENTALS_BUILDER_LESSON: FiveStageLesson = {
  id: "world-16-coroutine-fundamentals-coroutine-builder",
  worldId: "world-16",
  worldName: "Coroutine Academy",
  stageName: "STAGE 16 — COROUTINES",
  topicTitle: "Coroutine Fundamentals & Coroutine Builders",
  learn: {
    title: "Coroutine Fundamentals & Coroutine Builders",
    subtitle: "A coroutine is a suspendable unit of work started inside a CoroutineScope. runBlocking creates that scope from ordinary blocking code, and launch starts a child inside it. Prerequisite: functions, lambdas, and exceptions.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Core coroutine behavior",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"],
    explanation: "runBlocking starts a CoroutineScope and blocks the calling thread until every coroutine launched inside it has finished -- it is the bridge between ordinary blocking code (like main) and suspending code. launch starts a child coroutine inside that scope and immediately returns a Job handle; the child's own body does not run to completion at the launch call itself. job.join() suspends the caller until that specific child finishes, which is why \"child\" is guaranteed to print before \"done\" here -- remove the join() and the ordering is no longer guaranteed by this line of code alone (see Explore 2). delay(1) marks a suspension point: it does not block the thread the way Thread.sleep would, though this teaching runner does not simulate real timing (see the caveat on Explore 4).",
    keyIdeas: [
      { number: 1, title: "runBlocking bridges blocking and suspending code", description: "It creates a CoroutineScope, runs its block, and blocks the calling thread until every child coroutine launched inside that block has completed." },
      { number: 2, title: "launch starts a child and returns a Job", description: "The child's body is not guaranteed to have run by the time launch returns -- the Job is a handle you can join() or query, not the result of already-finished work." },
      { number: 3, title: "join() is what makes ordering deterministic", description: "job.join() suspends the caller until that child finishes. Without it, code after launch keeps running immediately, and the child still completes -- but on its own schedule, not yours." },
      { number: 4, title: "Suspension is not blocking", description: "delay() marks a point where a coroutine can give up the thread instead of holding it, unlike Thread.sleep(). This lesson's runner does not model real timing/threads; treat delay() here as a legal suspension point, not a demonstrated wait." }
    ],
    keyTakeaway: "runBlocking opens a scope that waits for every child it starts; launch starts a child and hands back a Job; join() is what turns \"eventually\" into \"before this exact line runs.\""
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "4 coverage-derived scenarios: join controls ordering, an un-joined child still runs, Job.isCompleted reflects real state, and runBlocking bridges blocking code. Counts follow distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-1", number: "01", title: "join() makes ordering deterministic", language: 'Kotlin', subtitle: "job.join() suspends the caller, so \"child\" is guaranteed to print before \"done\"", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Output', description: "Prints \"child\" then \"done\", in that order, every time" }, { label: 'Why', description: "job.join() does not return until the launched child has finished running" }], whatChanged: "Baseline: launch + explicit join()" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-2", number: "02", title: "An un-joined child still runs -- just not on your line", language: 'Kotlin', subtitle: "Without job.join(), runBlocking still waits for the child before returning, but the order flips", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    launch { println(\"child\") }", "    println(\"done\")", "}"], whatItMeans: [{ label: 'Output', description: "Prints \"done\" then \"child\" -- the reverse of Explore 1" }, { label: 'Why', description: "println(\"done\") runs immediately after launch; the un-joined child only runs when runBlocking drains its scope before returning" }], whatChanged: "Removed job.join(): scope ownership still guarantees completion, but not the print order" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-3", number: "03", title: "Job.isCompleted reflects real state, not the declaration", language: 'Kotlin', subtitle: "isCompleted is false right after launch and true only after join() returns", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    println(job.isCompleted)", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Output', description: "Prints \"false\" then \"true\"" }, { label: 'Why', description: "Calling launch does not finish the child's work; only join() (or the child finishing on its own) flips isCompleted to true" }], whatChanged: "New: query Job state directly instead of only inferring it from print order" },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-explore-4", number: "04", title: "runBlocking bridges a blocking caller to suspending code", language: 'Kotlin', subtitle: "No launch here -- delay() is called directly inside runBlocking's own body", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    delay(1)", "    println(\"resumed\")", "}"], whatItMeans: [{ label: 'Output', description: "Prints \"resumed\"" }, { label: 'Why', description: "delay() is a suspend function; it can only be called from inside a coroutine (or another suspend function). runBlocking is what makes that legal from ordinary main()" }], whatChanged: "New: runBlocking as the entry point into suspending code, without any child coroutine involved. This teaching runner does not model real timing -- treat delay() here as a legal suspension point, not a demonstrated wait." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about exact print order, Job state, and where a suspend function is legal to call -- derived from the four Explore concepts.",
    questions: [
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-1", questionNumber: 1, totalQuestions: 5, title: "Joined launch: print order", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1); println(\"child\") }", "    job.join()", "    println(\"done\")", "}"], prompt: "Output question: exactly what does this program print, in order?", options: [{ id: "A", label: "child\ndone", isCorrect: true }, { id: "B", label: "done\nchild", isCorrect: false }, { id: "C", label: "child", isCorrect: false }, { id: "D", label: "done", isCorrect: false }], explanation: { codeRef: "Explore 1", detail: "job.join() suspends main's coroutine until the launched child finishes, so \"child\" is always printed before \"done\". (Option B is what this exact program would print if job.join() were removed -- see Predict 2.)" } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-2", questionNumber: 2, totalQuestions: 5, title: "Un-joined launch: print order", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    launch { println(\"child\") }", "    println(\"done\")", "}"], prompt: "Output question: exactly what does this program print, in order?", options: [{ id: "A", label: "child\ndone", isCorrect: false }, { id: "B", label: "child", isCorrect: false }, { id: "C", label: "done\nchild", isCorrect: true }, { id: "D", label: "done", isCorrect: false }], explanation: { codeRef: "Explore 2", detail: "launch returns immediately without running the child's body, so println(\"done\") executes first. The child still runs -- runBlocking will not return until its scope's children finish -- so \"child\" prints too, just after \"done\"." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-3", questionNumber: 3, totalQuestions: 5, title: "Job.isCompleted before and after join()", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { delay(1) }", "    println(job.isCompleted)", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "Output question: exactly what does this program print, in order?", options: [{ id: "A", label: "true\ntrue", isCorrect: false }, { id: "B", label: "false\ntrue", isCorrect: true }, { id: "C", label: "false\nfalse", isCorrect: false }, { id: "D", label: "true\nfalse", isCorrect: false }], explanation: { codeRef: "Explore 3", detail: "launch only starts the child and returns a Job -- it does not finish the child's work, so isCompleted is false immediately after. join() suspends until the child finishes, so the second read is true." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-4", questionNumber: 4, totalQuestions: 5, title: "Suspension versus blocking", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    delay(1)", "    println(\"resumed\")", "}"], prompt: "Behavior question: which statement about delay() here is correct?", options: [{ id: "A", label: "delay() blocks the current thread exactly like Thread.sleep().", isCorrect: false }, { id: "B", label: "delay() starts a new thread for the remaining code.", isCorrect: false }, { id: "C", label: "delay() is a Kotlin language keyword, not a function.", isCorrect: false }, { id: "D", label: "delay() marks a suspension point; it does not block the underlying thread the way Thread.sleep() would.", isCorrect: true }], explanation: { codeRef: "Explore 4", detail: "delay() is a suspend function: it marks a point where a coroutine can give up the thread instead of holding it. This teaching runner does not model real timing, so it cannot demonstrate the thread actually being released -- treat this as the documented Kotlin behavior, not something this program's output proves." } },
      { id: "world-16-coroutine-fundamentals-coroutine-builder-predict-5", questionNumber: 5, totalQuestions: 5, title: "Why runBlocking is needed here", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    launch { println(\"child\") }", "    println(\"done\")", "}"], prompt: "Behavior question: if runBlocking were removed from this program, but launch were still called directly, what would happen?", options: [{ id: "A", label: "It would run exactly the same, since runBlocking has no effect on scope.", isCorrect: false }, { id: "B", label: "It would not compile -- launch (and delay) are only callable inside a CoroutineScope, and runBlocking is what supplies one from ordinary blocking code.", isCorrect: true }, { id: "C", label: "It would run, but print only \"child\" and never \"done\".", isCorrect: false }, { id: "D", label: "It would throw a runtime NullPointerException.", isCorrect: false }], explanation: { codeRef: "Explore 2 and 4 together", detail: "runBlocking is not just a wrapper for print ordering -- it is the CoroutineScope that makes calling launch (or delay) legal from an ordinary, non-suspending main() in the first place." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Join a Child Job",
    description: "Launch a child coroutine that sets result to 7, then wait for it before printing result. Right now the program prints result before the child has a chance to set it.\n\n1. Inside the launch block, the child already delays and sets result = 7.\n2. Add the one call that makes main's coroutine wait for that child to finish before continuing.\n3. Expected output: 7",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "JoinaChildJob.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var result = 0\n    val job = launch {\n        delay(1)\n        result = 7\n    }\n    // TODO: wait for job to finish before reading result\n    println(result)\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var result = 0\n    val job = launch {\n        delay(1)\n        result = 7\n    }\n    job.join()\n    println(result)\n}",
    sampleInput: "main()",
    expectedOutput: "7",
    testCase: { call: "", expected: "7" }
  },
  debug: {
    title: "Read the Status Before It's Ready",
    subtitle: "The program prints status before the launched child has a chance to update it.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "easy",
    bugType: "logic",
    bugLabel: "Missing join() before reading a value the child writes",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var status = \"pending\"\n    val job = launch {\n        delay(1)\n        status = \"ready\"\n    }\n    println(status)\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    var status = \"pending\"\n    val job = launch {\n        delay(1)\n        status = \"ready\"\n    }\n    job.join()\n    println(status)\n}",
    expectedOutput: "ready",
    hints: [
      "Symptom: the program prints \"pending\" instead of \"ready\", even though the launched child clearly sets status = \"ready\".",
      "Cause: launch returns a Job immediately, before the child's body has run. println(status) executes right after launch, so it reads status before the child gets a chance to change it.",
      "Repair: call job.join() on the Job before reading status, so the read happens only after the child finishes."
    ],
    explanation: "launch does not run its block synchronously -- it starts a child and hands back a Job right away. Reading a value the child writes, without first calling join() on that Job, races the child instead of waiting for it. Adding job.join() before println(status) makes the read happen after the child has finished, so it observes \"ready\"."
  },
  mastered: {
    topicTitle: "Coroutine Fundamentals & Coroutine Builders",
    summary: "This lesson's coroutine subset (runBlocking, launch, Job.join()/isCompleted, delay) now executes in the CodeDo runner and is verified against it. Broader World 16 capability (dispatchers, cancellation, structured exception propagation, async/await) is introduced starting Lesson 2 and remains a separate gate for those lessons.",
    passedCount: "4 / 4 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "4 distinct Explore scenarios: joined ordering, un-joined ordering, Job.isCompleted state, runBlocking as bridge" },
      { title: "Reasoning coverage", subtitle: "5 independent Predict scenarios, each with misconception-based distractors" },
      { title: "Implementation", subtitle: "1 focused Write & Run task (join a child before reading its result), verified executable" },
      { title: "Debugging", subtitle: "1 independent join-ordering repair, in a different scenario/domain from the Write & Run task" },
      { title: "Capability", subtitle: "Executes in the CodeDo runner via a documented, single-threaded coroutine simulation -- not real scheduling, cancellation, or timing" }
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
    subtitle: "Choose launch for side effects and async when a child must return a value.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Handle a failed Deferred at await",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var saved = false", "    val saveJob = launch { saved = true }", "    val total = async { 20 + 22 }", "    saveJob.join()", "    println(\"saved=$saved\")", "    println(\"total=${total.await()}\")", "}"],
    explanation: "launch returns a Job that represents side-effect work; it does not preserve the block's final expression as a usable result. async returns Deferred<T>, and await retrieves its value. Both children belong to runBlocking here, while join and await establish the points where their completion is required.",
    keyIdeas: [{ number: 1, title: "Job for side effects", description: "saveJob tracks completion of the save operation; join waits for that operation but returns no business value." }, { number: 2, title: "Deferred for values", description: "total is a Deferred<Int>; await completes it if necessary and returns 42." }, { number: 3, title: "Builder choice", description: "Use launch when completion is enough, and async only when the caller needs a returned value." }, { number: 4, title: "Explicit dependency", description: "The program reads saved only after join and reads the calculation only through await, so it does not rely on scheduler timing." }],
    keyTakeaway: "launch gives you a Job for completion; async gives you a Deferred whose value is retrieved with await."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five distinct scenarios compare Job, Deferred, multiple results, lazy start, and builder choice.",
    cards: [
      { id: "world-16-launch-async-explore-1", number: "01", title: "Wait for a side effect", language: 'Kotlin', subtitle: "launch returns a Job whose join establishes completion", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var status = \"waiting\"", "    val job = launch { status = \"sent\" }", "    println(status)", "    job.join()", "    println(status)", "}"], whatItMeans: [{ label: 'Before join', description: "The queued child has not changed status yet, so waiting prints." }, { label: 'After join', description: "join completes the Job, so sent prints." }], whatChanged: "Job completion controls when a side effect can be safely read." },
      { id: "world-16-launch-async-explore-2", number: "02", title: "Retrieve an async value", language: 'Kotlin', subtitle: "async returns Deferred<T>; await returns T", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val answer: Deferred<Int> = async { 3 }", "    println(answer.await())", "}"], whatItMeans: [{ label: 'Deferred', description: "answer represents a pending or completed Int computation." }, { label: 'Await', description: "await returns the computed Int value 3." }], whatChanged: "The corrected spacing also keeps Deferred<Int> separate from the assignment operator." },
      { id: "world-16-launch-async-explore-3", number: "03", title: "Combine independent results", language: 'Kotlin', subtitle: "multiple Deferred values can be awaited and combined", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val base = async { 4 }", "    val bonus = async { 5 }", "    println(base.await() + bonus.await())", "}"], whatItMeans: [{ label: 'Independent children', description: "Each async block owns one result." }, { label: 'Composition', description: "await retrieves both values before their sum is printed." }], whatChanged: "Two result-producing children are combined into 9." },
      { id: "world-16-launch-async-explore-4", number: "04", title: "Start lazily", language: 'Kotlin', subtitle: "CoroutineStart.LAZY defers the block until start or await", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var computed = false", "    val report = async(start = CoroutineStart.LAZY) {", "        computed = true", "        8", "    }", "    println(computed)", "    println(report.await())", "    println(computed)", "}"], whatItMeans: [{ label: 'Before await', description: "computed is false because the lazy block has not started." }, { label: 'At await', description: "await starts the block, returns 8, and leaves computed true." }], whatChanged: "The observable false → 8 → true trace distinguishes lazy start." },
      { id: "world-16-launch-async-explore-5", number: "05", title: "Choose both builders", language: 'Kotlin', subtitle: "use launch for completion and async for a returned value", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var saved = false", "    val saveJob = launch { saved = true }", "    val score = async { 7 }", "    saveJob.join()", "    println(\"$saved:${score.await()}\")", "}"], whatItMeans: [{ label: 'launch', description: "The save operation communicates through its side effect and Job completion." }, { label: 'async', description: "The score operation communicates through Deferred<Int>." }], whatChanged: "One program makes the builder-selection rule concrete without relying on timing." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Predict Job completion, Deferred values, lazy start, and appropriate builder choice.",
    questions: [
      { id: "world-16-launch-async-predict-1", questionNumber: 1, totalQuestions: 5, title: "Read after join", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var status = \"waiting\"", "    val job = launch { status = \"sent\" }", "    println(status)", "    job.join()", "    println(status)", "}"], prompt: "What is printed?", options: [{ id: "A", label: "sent\nsent", isCorrect: false }, { id: "B", label: "waiting\nsent", isCorrect: true }, { id: "C", label: "waiting\nwaiting", isCorrect: false }, { id: "D", label: "Job\nsent", isCorrect: false }], explanation: { codeRef: "Read after join", detail: "launch returns before the queued child runs in this scope; join completes it before the second read." } },
      { id: "world-16-launch-async-predict-2", questionNumber: 2, totalQuestions: 5, title: "Await a value", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val value = async { 5 }", "    println(value.await())", "}"], prompt: "What is printed?", options: [{ id: "A", label: "Deferred", isCorrect: false }, { id: "B", label: "Unit", isCorrect: false }, { id: "C", label: "Nothing until the scope ends", isCorrect: false }, { id: "D", label: "5", isCorrect: true }], explanation: { codeRef: "Await a value", detail: "async keeps the block result in Deferred<Int>, and await returns that Int." } },
      { id: "world-16-launch-async-predict-3", questionNumber: 3, totalQuestions: 5, title: "Choose the result builder", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val task = launch { 99 }", "    task.join()", "}"], prompt: "Why can this program not retrieve 99 from task?", options: [{ id: "A", label: "join converts every result to null.", isCorrect: false }, { id: "B", label: "99 is available through task.await().", isCorrect: false }, { id: "C", label: "launch returns Job and discards the block result; async is required for a value.", isCorrect: true }, { id: "D", label: "launch requires a new operating-system thread.", isCorrect: false }], explanation: { codeRef: "Choose the result builder", detail: "Job represents lifecycle and completion, not a computed business value." } },
      { id: "world-16-launch-async-predict-4", questionNumber: 4, totalQuestions: 5, title: "Lazy Deferred", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var started = false", "    val task = async(start = CoroutineStart.LAZY) {", "        started = true", "        12", "    }", "    println(started)", "    println(task.await())", "    println(started)", "}"], prompt: "What is printed?", options: [{ id: "A", label: "false\n12\ntrue", isCorrect: true }, { id: "B", label: "true\n12\ntrue", isCorrect: false }, { id: "C", label: "false\nDeferred\nfalse", isCorrect: false }, { id: "D", label: "false\nUnit\ntrue", isCorrect: false }], explanation: { codeRef: "Lazy Deferred", detail: "LAZY defers the block, while await starts it and retrieves 12." } },
      { id: "world-16-launch-async-predict-5", questionNumber: 5, totalQuestions: 5, title: "Use each builder for its role", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var uploaded = false", "    val upload = launch { uploaded = true }", "    val points = async { 9 }", "    upload.join()", "    println(\"$uploaded:${points.await()}\")", "}"], prompt: "What is printed?", options: [{ id: "A", label: "false:9", isCorrect: false }, { id: "B", label: "true:9", isCorrect: true }, { id: "C", label: "true:Job", isCorrect: false }, { id: "D", label: "Deferred:9", isCorrect: false }], explanation: { codeRef: "Use each builder for its role", detail: "join establishes the upload side effect; await retrieves the points value." } }
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
    title: "Return a Generated Report",
    subtitle: "The report text is a result, but the code uses the side-effect builder.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val report = launch { \"ready\" }\n    println(report)\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    val report = async { \"ready\" }\n    println(report.await())\n}",
    expectedOutput: "ready",
    hints: [
      "The printed object tracks completion; it does not contain the block's String result.",
      "Choose the builder that returns Deferred<T>.",
      "Retrieve the Deferred value before printing it."
    ],
    explanation: "launch returns Job, so the String expression is discarded. Replacing it with async returns Deferred<String>, and await retrieves \"ready\"."
  },
  mastered: {
    topicTitle: "launch & async",
    summary: "You can now choose launch for side effects, async for values, combine Deferred results, and recognize lazy start.",
    passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "5 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "5 independent Predict scenarios" },
      { title: "Implementation", subtitle: "Combine two async results" },
      { title: "Debugging", subtitle: "Replace launch with async for a returned value" },
      { title: "Capability", subtitle: "Deterministic single-threaded simulation; no real scheduler or threads" }
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
    subtitle: "Define suspending helpers, call them from coroutine-aware code, and compose their results sequentially or with async.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Combine two owned results",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "suspend fun loadScore(): Int {", "    delay(1)", "    return 7", "}", "fun main() = runBlocking {", "    val score = async { loadScore() }", "    println(score.await())", "}"],
    explanation: "A suspend function may call suspension points such as delay and must be invoked from another suspend function or a coroutine body. async returns Deferred<Int>; await establishes the dependency and returns the value. CodeDo accepts delay as a documented no-op and does not model real timing or thread release.",
    keyIdeas: [{ number: 1, title: "Suspending declaration", description: "suspend allows loadScore to call delay." }, { number: 2, title: "Legal caller", description: "The async coroutine body may call loadScore." }, { number: 3, title: "Deferred result", description: "async stores the Int result in Deferred<Int>." }, { number: 4, title: "Awaited dependency", description: "await returns 7 before println runs." }],
    keyTakeaway: "suspend defines a coroutine-aware function boundary; await retrieves a Deferred result where it is needed."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "6 coverage-derived scenarios; counts are based on distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-await-suspending-functions-explore-1", number: "01", title: "Suspend scenario", language: 'Kotlin', subtitle: "suspend marks a function that may suspend", code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Behavior', description: "suspend marks a function that may suspend" }], whatChanged: "Distinct coverage: suspend marks a function that may suspend" },
      { id: "world-16-await-suspending-functions-explore-2", number: "02", title: "Compose suspending helpers", language: 'Kotlin', subtitle: "one suspend function can call another", code: ["import kotlinx.coroutines.*", "suspend fun base(): Int = 4", "suspend fun doubled(): Int = base() * 2", "fun main() = runBlocking {", "    println(doubled())", "}"], whatItMeans: [{ label: 'Composition', description: "doubled legally calls base and returns 8." }], whatChanged: "Adds a distinct suspend-to-suspend call path." },
      { id: "world-16-await-suspending-functions-explore-3", number: "03", title: "Reach a suspension point", language: 'Kotlin', subtitle: "delay is legal inside a suspending helper", code: ["import kotlinx.coroutines.*", "suspend fun message(): String {", "    delay(1)", "    return \"resumed\"", "}", "fun main() = runBlocking {", "    println(message())", "}"], whatItMeans: [{ label: 'Real Kotlin', description: "delay suspends rather than calling Thread.sleep." }, { label: 'Simulator', description: "CodeDo accepts delay as a documented no-op." }], whatChanged: "Shows a real suspend boundary without claiming timing." },
      { id: "world-16-await-suspending-functions-explore-4", number: "04", title: "Await a Deferred", language: 'Kotlin', subtitle: "await returns the Deferred value", code: ["import kotlinx.coroutines.*", "suspend fun load(): Int = 9", "fun main() = runBlocking {", "    val result = async { load() }", "    println(result.await())", "}"], whatItMeans: [{ label: 'Dependency', description: "await completes result if necessary and returns 9." }], whatChanged: "Actually exercises await instead of merely labeling it." },
      { id: "world-16-await-suspending-functions-explore-5", number: "05", title: "Call sequentially", language: 'Kotlin', subtitle: "ordinary suspend calls remain ordered", code: ["import kotlinx.coroutines.*", "suspend fun first(): Int { println(\"first\"); return 2 }", "suspend fun second(): Int { println(\"second\"); return 3 }", "fun main() = runBlocking {", "    println(first() + second())", "}"], whatItMeans: [{ label: 'Trace', description: "first completes, then second, then 5 prints." }], whatChanged: "Uses two calls to demonstrate sequential composition." },
      { id: "world-16-await-suspending-functions-explore-6", number: "06", title: "Compose with async", language: 'Kotlin', subtitle: "create both result children before awaiting", code: ["import kotlinx.coroutines.*", "suspend fun left(): Int = 4", "suspend fun right(): Int = 5", "fun main() = runBlocking {", "    val a = async { left() }", "    val b = async { right() }", "    println(a.await() + b.await())", "}"], whatItMeans: [{ label: 'Composition', description: "Both Deferred values exist before their results are combined." }], whatChanged: "Actually exercises async plus await and prints 9." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason about explicit output, completion, cancellation, exception propagation, compilation, or lifecycle behavior without assuming scheduler order.",
    questions: [
      { id: "world-16-await-suspending-functions-predict-1", questionNumber: 1, totalQuestions: 6, title: "Suspend check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load():Int { delay(1); return 7 }", "fun main() = runBlocking { println(load()) }"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "Suspend marks a function that may suspend.", isCorrect: true }, { id: "B", label: "The opposite behavior is guaranteed.", isCorrect: false }, { id: "C", label: "The behavior is equivalent to JavaScript Promise semantics.", isCorrect: false }, { id: "D", label: "The API guarantees a new thread.", isCorrect: false }], explanation: { codeRef: "Suspend check", detail: "Suspend marks a function that may suspend." } },
      { id: "world-16-await-suspending-functions-predict-2", questionNumber: 2, totalQuestions: 6, title: "Suspend caller boundary", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load(): Int = 7", "fun main() {", "    println(load())", "}"], prompt: "Why is this invalid Kotlin?", options: [{ id: "A", label: "A suspend function must return Deferred.", isCorrect: false }, { id: "B", label: "println cannot print Int.", isCorrect: false }, { id: "C", label: "load must be called from a suspend function or coroutine body.", isCorrect: true }, { id: "D", label: "Every suspend function requires async internally.", isCorrect: false }], explanation: { codeRef: "Suspend caller boundary", detail: "Ordinary main has no coroutine continuation from which it can call load." } },
      { id: "world-16-await-suspending-functions-predict-3", questionNumber: 3, totalQuestions: 6, title: "Delay check", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun f(){delay(1)}"], prompt: "Behavior question: which result or statement is correct?", options: [{ id: "A", label: "delay suspends the coroutine; it is not Thread.sleep.", isCorrect: true }, { id: "B", label: "delay always blocks its thread.", isCorrect: false }, { id: "C", label: "delay creates a new thread.", isCorrect: false }, { id: "D", label: "delay is a Kotlin keyword.", isCorrect: false }], explanation: { codeRef: "Delay check", detail: "delay suspends the coroutine; it is not Thread.sleep." } },
      { id: "world-16-await-suspending-functions-predict-4", questionNumber: 4, totalQuestions: 6, title: "Await check", topicMeta: "completion", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main()=runBlocking{ val x=async{11}; println(x.await()) }"], prompt: "Completion question: which result or statement is correct?", options: [{ id: "A", label: "await suspends until the Deferred completes and yields 11.", isCorrect: true }, { id: "B", label: "await blocks the underlying thread by definition.", isCorrect: false }, { id: "C", label: "await returns Job.", isCorrect: false }, { id: "D", label: "await always starts a new thread.", isCorrect: false }], explanation: { codeRef: "Await check", detail: "await suspends until the Deferred completes and yields 11." } },
      { id: "world-16-await-suspending-functions-predict-5", questionNumber: 5, totalQuestions: 6, title: "Sequential trace", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun one(): Int { println(\"one\"); return 1 }", "suspend fun two(): Int { println(\"two\"); return 2 }", "fun main() = runBlocking { println(one() + two()) }"], prompt: "What is printed?", options: [{ id: "A", label: "3\none\ntwo", isCorrect: false }, { id: "B", label: "one\ntwo\n3", isCorrect: true }, { id: "C", label: "two\none\n3", isCorrect: false }, { id: "D", label: "one\n3", isCorrect: false }], explanation: { codeRef: "Sequential trace", detail: "The first call completes before the second call begins; their returned values are then added." } },
      { id: "world-16-await-suspending-functions-predict-6", questionNumber: 6, totalQuestions: 6, title: "Compose two results", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun left(): Int = 6", "suspend fun right(): Int = 7", "fun main() = runBlocking {", "    val a = async { left() }", "    val b = async { right() }", "    println(a.await() + b.await())", "}"], prompt: "What is printed?", options: [{ id: "A", label: "Deferred", isCorrect: false }, { id: "B", label: "7", isCorrect: false }, { id: "C", label: "42", isCorrect: false }, { id: "D", label: "13", isCorrect: true }], explanation: { codeRef: "Compose two results", detail: "Both awaited Int values are added: 6 + 7 = 13." } }
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
      "number is Deferred<Int>, not Int.",
      "Retrieve the Deferred result before applying arithmetic.",
      "Use the suspending result operation taught in this lesson."
    ],
    explanation: "async returns Deferred<Int>. Calling await produces the Int value 8, which can then be multiplied to print 16."
  },
  mastered: {
    topicTitle: "await & Suspending Functions",
    summary: "You can define and legally call suspend functions, distinguish sequential calls from async composition, and await Deferred results.",
    passedCount: "6 / 6 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "6 distinct Explore scenarios" },
      { title: "Reasoning coverage", subtitle: "6 independent Predict scenarios" },
      { title: "Implementation", subtitle: "1 focused real-coroutine Write & Run task" },
      { title: "Debugging", subtitle: "1 independent coroutine-specific repair" },
      { title: "Capability", subtitle: "Suspend-call boundary validation plus deterministic await simulation" }
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
    subtitle: "Read inherited context elements and override one element for a focused block.",
    exampleTag: "EXAMPLE",
    exampleTitle: "A suspending function can inspect its current Job",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "", "suspend fun hasJob(): Boolean = coroutineContext[Job] != null", "", "fun main() = runBlocking {", "    println(hasJob())", "}"],
    explanation: "Every coroutine has a CoroutineContext made from keyed elements. runBlocking supplies a Job, so the suspending helper prints true. Child coroutines inherit the parent's elements by default. withContext adds or replaces an element only while its block runs and returns that block's result.",
    keyIdeas: [
      { number: 1, title: "Keyed elements", description: "coroutineContext[Job] looks up the Job element by its key and returns null when that element is absent." },
      { number: 2, title: "Inheritance", description: "A child starts with its parent's context, while receiving its own Job for lifecycle tracking." },
      { number: 3, title: "Focused override", description: "withContext(CoroutineName(...)) replaces the name inside the block and restores the outer context afterward." },
      { number: 4, title: "Simulation boundary", description: "The editor models context values and deterministic block results; dispatcher tokens do not switch threads." }
    ],
    keyTakeaway: "CoroutineContext is a keyed set of inherited elements; withContext temporarily replaces selected elements and returns its block result."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five programs isolate lookup, naming, inheritance, override, and result propagation.",
    cards: [
      { id: "world-16-suspend-coroutine-context-explore-1", number: "01", title: "Look up the Job", language: 'Kotlin', subtitle: "runBlocking installs a Job element", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "suspend fun hasJob() = coroutineContext[Job] != null", "fun main() = runBlocking { println(hasJob()) }"], whatItMeans: [{ label: 'Output', description: "true, because the current context contains a Job." }], whatChanged: "The lookup observes a real simulated context element instead of a hardcoded result." },
      { id: "world-16-suspend-coroutine-context-explore-2", number: "02", title: "Name a context", language: 'Kotlin', subtitle: "withContext installs CoroutineName for its block", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    withContext(CoroutineName(\"reader\")) {", "        println(coroutineContext[CoroutineName]?.name)", "    }", "}"], whatItMeans: [{ label: 'Output', description: "reader" }], whatChanged: "A name is read through its context key while the block is active." },
      { id: "world-16-suspend-coroutine-context-explore-3", number: "03", title: "Inherit the name", language: 'Kotlin', subtitle: "a launched child inherits its parent's CoroutineName", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    withContext(CoroutineName(\"parent\")) {", "        val child = launch { println(coroutineContext[CoroutineName]?.name) }", "        child.join()", "    }", "}"], whatItMeans: [{ label: 'Output', description: "parent" }], whatChanged: "The child captures the active parent context, while owning a distinct Job." },
      { id: "world-16-suspend-coroutine-context-explore-4", number: "04", title: "Override then restore", language: 'Kotlin', subtitle: "only the selected element changes inside withContext", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    withContext(CoroutineName(\"outer\")) {", "        withContext(CoroutineName(\"inner\")) { println(coroutineContext[CoroutineName]?.name) }", "        println(coroutineContext[CoroutineName]?.name)", "    }", "}"], whatItMeans: [{ label: 'Output', description: "inner, then outer." }], whatChanged: "Leaving the inner block restores the outer CoroutineName." },
      { id: "world-16-suspend-coroutine-context-explore-5", number: "05", title: "Return a block result", language: 'Kotlin', subtitle: "withContext returns its final expression", code: ["import kotlinx.coroutines.*", "suspend fun answer() = withContext(Dispatchers.Default) { 42 }", "fun main() = runBlocking { println(answer()) }"], whatItMeans: [{ label: 'Output', description: "42" }, { label: 'Boundary', description: "Default is accepted as context metadata; this editor does not claim a thread switch." }], whatChanged: "The caller receives the block result directly without a separate Deferred." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Trace context lookup, inheritance, restoration, and withContext results.",
    questions: [
      { id: "world-16-suspend-coroutine-context-predict-1", questionNumber: 1, totalQuestions: 5, title: "Job lookup", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking { println(coroutineContext[Job] != null) }"], prompt: "What is printed?", options: [{ id: "A", label: "false", isCorrect: false }, { id: "B", label: "true", isCorrect: true }, { id: "C", label: "Job", isCorrect: false }, { id: "D", label: "null", isCorrect: false }], explanation: { codeRef: "Job lookup", detail: "runBlocking supplies the current coroutine's Job element." } },
      { id: "world-16-suspend-coroutine-context-predict-2", questionNumber: 2, totalQuestions: 5, title: "Child inheritance", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    withContext(CoroutineName(\"api\")) {", "        val child = async { coroutineContext[CoroutineName]?.name }", "        println(child.await())", "    }", "}"], prompt: "What is printed?", options: [{ id: "A", label: "null", isCorrect: false }, { id: "B", label: "Deferred", isCorrect: false }, { id: "C", label: "api", isCorrect: true }, { id: "D", label: "CoroutineName", isCorrect: false }], explanation: { codeRef: "Child inheritance", detail: "async captures the active CoroutineName, and await retrieves the child's result." } },
      { id: "world-16-suspend-coroutine-context-predict-3", questionNumber: 3, totalQuestions: 5, title: "Restored outer name", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    withContext(CoroutineName(\"A\")) {", "        withContext(CoroutineName(\"B\")) { println(coroutineContext[CoroutineName]?.name) }", "        println(coroutineContext[CoroutineName]?.name)", "    }", "}"], prompt: "What is printed?", options: [{ id: "A", label: "B\nA", isCorrect: true }, { id: "B", label: "B\nB", isCorrect: false }, { id: "C", label: "A\nB", isCorrect: false }, { id: "D", label: "A\nA", isCorrect: false }], explanation: { codeRef: "Restored outer name", detail: "The inner override ends with its block, revealing the outer A again." } },
      { id: "world-16-suspend-coroutine-context-predict-4", questionNumber: 4, totalQuestions: 5, title: "Block result", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = withContext(Dispatchers.Default) { 6 * 7 }", "fun main() = runBlocking { println(value()) }"], prompt: "What is printed?", options: [{ id: "A", label: "Default", isCorrect: false }, { id: "B", label: "Unit", isCorrect: false }, { id: "C", label: "Deferred", isCorrect: false }, { id: "D", label: "42", isCorrect: true }], explanation: { codeRef: "Block result", detail: "withContext returns the final expression of its block." } },
      { id: "world-16-suspend-coroutine-context-predict-5", questionNumber: 5, totalQuestions: 5, title: "Dispatcher boundary", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun load() = withContext(Dispatchers.IO) { \"done\" }"], prompt: "What can this editor honestly verify about this function?", options: [{ id: "A", label: "It always creates a new operating-system thread.", isCorrect: false }, { id: "B", label: "It accepts the IO context token and returns done, but does not verify thread switching.", isCorrect: true }, { id: "C", label: "Dispatchers.IO is a Job.", isCorrect: false }, { id: "D", label: "withContext returns Deferred<String>.", isCorrect: false }], explanation: { codeRef: "Dispatcher boundary", detail: "The deterministic runtime models context and result flow, not dispatcher scheduling or threads." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Read the Current Job", description: "Return whether the current coroutine context contains a Job. Inspect the context; do not hardcode the output.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "ReadCurrentJob.kt",
    initialCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nsuspend fun hasJob(): Boolean {\n    // TODO inspect coroutineContext\n    return false\n}\n\nfun main() = runBlocking { println(hasJob()) }",
    solutionCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nsuspend fun hasJob(): Boolean {\n    return coroutineContext[Job] != null\n}\n\nfun main() = runBlocking { println(hasJob()) }",
    sampleInput: "main()", expectedOutput: "true", testCase: { call: "", expected: "true" }
  },
  debug: {
    title: "Return the Context Block's Value", subtitle: "The block computes 42, but the function discards it and returns 0.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Discarded withContext result",
    brokenCode: "import kotlinx.coroutines.*\n\nsuspend fun answer(): Int {\n    withContext(Dispatchers.Default) { 42 }\n    return 0\n}\n\nfun main() = runBlocking { println(answer()) }",
    fixedCode: "import kotlinx.coroutines.*\n\nsuspend fun answer(): Int =\n    withContext(Dispatchers.Default) { 42 }\n\nfun main() = runBlocking { println(answer()) }",
    expectedOutput: "42",
    hints: ["The withContext block already produces the value the caller needs.", "withContext returns its block's final expression; it does not return a Job or Deferred.", "Return the withContext expression from answer instead of discarding it."],
    explanation: "The broken function evaluates the context block and then explicitly returns 0. The fixed expression body returns withContext's Int result, so main prints 42."
  },
  mastered: {
    topicTitle: "suspend & Coroutine Context", summary: "You can look up keyed context elements, trace child inheritance, apply a focused override, and use a withContext result without assuming thread behavior.", passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Context lookup", subtitle: "Job and CoroutineName are observable by key" },
      { title: "Inheritance", subtitle: "launch and async capture active context elements" },
      { title: "Focused override", subtitle: "nested withContext restores the outer value" },
      { title: "Result flow", subtitle: "withContext returns its block result" },
      { title: "Capability boundary", subtitle: "dispatcher values are metadata; no thread-switch claim" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    subtitle: "Choose execution context separately from lifecycle and completion.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Launch on a dispatcher and wait for its Job",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "", "fun main() = runBlocking {", "    val job = launch(Dispatchers.Default) {", "        println(\"computed\")", "    }", "    job.join()", "    println(job.isCompleted)", "}"],
    explanation: "A dispatcher describes where coroutine work should execute; a Job represents that coroutine's lifecycle. launch(Dispatchers.Default) returns a Job immediately, and join waits for its completion. The CodeDo editor preserves dispatcher syntax, context selection, lifecycle state, and deterministic results, but does not create JVM thread pools or claim thread switching.",
    keyIdeas: [
      { number: 1, title: "Default for CPU work", description: "Dispatchers.Default is the conventional choice for CPU-intensive work on supported real platforms." },
      { number: 2, title: "IO for blocking I/O", description: "Dispatchers.IO is intended for blocking I/O on platforms that provide it; it is not a replacement for lifecycle ownership." },
      { number: 3, title: "Job owns lifecycle", description: "The Job returned by launch exposes completion and can be joined independently of the selected dispatcher." },
      { number: 4, title: "Main is platform-provided", description: "Dispatchers.Main requires a platform integration such as Android; this editor accepts the token but does not emulate a UI thread." }
    ],
    keyTakeaway: "A dispatcher selects execution context; a Job tracks lifecycle. Choosing one does not replace the other."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five distinct programs separate dispatcher choice, returned values, and Job completion.",
    cards: [
      { id: "world-16-dispatchers-jobs-explore-1", number: "01", title: "Default plus Job", language: 'Kotlin', subtitle: "launch accepts a dispatcher and returns a Job", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch(Dispatchers.Default) { println(\"cpu\") }", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Output', description: "cpu, then true after join." }, { label: 'Boundary', description: "The editor records Default as context metadata; it does not create a worker thread." }], whatChanged: "Dispatcher choice and lifecycle observation appear in the same valid builder call." },
      { id: "world-16-dispatchers-jobs-explore-2", number: "02", title: "IO result", language: 'Kotlin', subtitle: "withContext returns the block's value", code: ["import kotlinx.coroutines.*", "suspend fun load() = withContext(Dispatchers.IO) { \"loaded\" }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Output', description: "loaded" }, { label: 'Real platform', description: "IO is intended for blocking I/O; this example only verifies context/result flow." }], whatChanged: "IO selection is shown without inventing a thread name or scheduling order." },
      { id: "world-16-dispatchers-jobs-explore-3", number: "03", title: "Two dispatcher tokens", language: 'Kotlin', subtitle: "completion remains explicit for each Job", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val cpu = launch(Dispatchers.Default) { println(\"cpu\") }", "    val io = launch(Dispatchers.IO) { println(\"io\") }", "    cpu.join()", "    io.join()", "    println(cpu.isCompleted && io.isCompleted)", "}"], whatItMeans: [{ label: 'Output', description: "cpu, io, then true in the deterministic editor." }, { label: 'Rule', description: "Each builder returns its own Job regardless of dispatcher." }], whatChanged: "Two different context tokens still use the same explicit Job lifecycle API." },
      { id: "world-16-dispatchers-jobs-explore-4", number: "04", title: "Completion transition", language: 'Kotlin', subtitle: "join establishes the point after which completion is guaranteed", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var finished = false", "    val job = launch(Dispatchers.Default) { finished = true }", "    println(finished)", "    job.join()", "    println(finished)", "}"], whatItMeans: [{ label: 'Editor trace', description: "false, then true." }, { label: 'Do not generalize', description: "The pre-join value reflects this deterministic simulator, not a universal scheduler ordering guarantee." }], whatChanged: "The state change makes the role of join observable." },
      { id: "world-16-dispatchers-jobs-explore-5", number: "05", title: "Main availability", language: 'Kotlin', subtitle: "Main depends on the host platform", code: ["import kotlinx.coroutines.*", "suspend fun label() = withContext(Dispatchers.Main) { \"ui\" }", "// Dispatchers.Main needs a platform Main dispatcher in real Kotlin."], whatItMeans: [{ label: 'Concept', description: "Android supplies a Main dispatcher; plain JVM projects need an appropriate Main module." }, { label: 'Editor boundary', description: "CodeDo recognizes the token as metadata but does not claim a real UI thread." }], whatChanged: "Platform availability is taught explicitly instead of being hidden behind unrelated Job code." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Distinguish dispatcher purpose from Job lifecycle and trace only deterministic dependencies.",
    questions: [
      { id: "world-16-dispatchers-jobs-predict-1", questionNumber: 1, totalQuestions: 5, title: "Default job", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch(Dispatchers.Default) { println(\"work\") }", "    job.join()", "    println(job.isCompleted)", "}"], prompt: "What is printed in this editor?", options: [{ id: "A", label: "true only", isCorrect: false }, { id: "B", label: "work\ntrue", isCorrect: true }, { id: "C", label: "Default\nfalse", isCorrect: false }, { id: "D", label: "Job\nwork", isCorrect: false }], explanation: { codeRef: "Default job", detail: "join executes/completes the queued child before isCompleted is read." } },
      { id: "world-16-dispatchers-jobs-predict-2", questionNumber: 2, totalQuestions: 5, title: "Choose IO", topicMeta: "design", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun readFile() = withContext(Dispatchers.IO) { \"data\" }"], prompt: "Why is IO the conventional dispatcher here on JVM?", options: [{ id: "A", label: "It converts the String into a Job.", isCorrect: false }, { id: "B", label: "It guarantees one new thread per call.", isCorrect: false }, { id: "C", label: "It is intended for blocking I/O work on supported platforms.", isCorrect: true }, { id: "D", label: "It makes join unnecessary for every launched Job.", isCorrect: false }], explanation: { codeRef: "Choose IO", detail: "Dispatcher choice describes execution context; it does not change the block result into a lifecycle object." } },
      { id: "world-16-dispatchers-jobs-predict-3", questionNumber: 3, totalQuestions: 5, title: "Lifecycle owner", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val upload = launch(Dispatchers.IO) { println(\"sent\") }", "    upload.join()", "}"], prompt: "Which value tracks the launched coroutine's completion?", options: [{ id: "A", label: "Dispatchers.IO", isCorrect: false }, { id: "B", label: "runBlocking's return String", isCorrect: false }, { id: "C", label: "println", isCorrect: false }, { id: "D", label: "upload, the returned Job", isCorrect: true }], explanation: { codeRef: "Lifecycle owner", detail: "The dispatcher selects context; the Job stored in upload tracks lifecycle." } },
      { id: "world-16-dispatchers-jobs-predict-4", questionNumber: 4, totalQuestions: 5, title: "Result from context", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun score() = withContext(Dispatchers.Default) { 20 + 2 }", "fun main() = runBlocking { println(score()) }"], prompt: "What is printed?", options: [{ id: "A", label: "22", isCorrect: true }, { id: "B", label: "Default", isCorrect: false }, { id: "C", label: "Job", isCorrect: false }, { id: "D", label: "Unit", isCorrect: false }], explanation: { codeRef: "Result from context", detail: "withContext returns its block result directly." } },
      { id: "world-16-dispatchers-jobs-predict-5", questionNumber: 5, totalQuestions: 5, title: "Main boundary", topicMeta: "platform", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun updateUi() = withContext(Dispatchers.Main) { \"updated\" }"], prompt: "Which statement is accurate?", options: [{ id: "A", label: "Main is available identically in every Kotlin runtime.", isCorrect: false }, { id: "B", label: "Main requires platform support; CodeDo only recognizes its context token.", isCorrect: true }, { id: "C", label: "Main is another name for Job.", isCorrect: false }, { id: "D", label: "Main guarantees that no suspension can occur.", isCorrect: false }], explanation: { codeRef: "Main boundary", detail: "A real Main dispatcher is supplied by a host integration such as Android; this editor does not emulate that UI thread." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Wait for Default Work", description: "Launch work with Dispatchers.Default, join its Job, then print the updated completion flag.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "WaitForDefaultWork.kt",
    initialCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var completed = false\n    val job = launch(Dispatchers.Default) { completed = true }\n    // TODO wait for the Job\n    println(completed)\n}",
    solutionCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var completed = false\n    val job = launch(Dispatchers.Default) { completed = true }\n    job.join()\n    println(completed)\n}",
    sampleInput: "main()", expectedOutput: "true", testCase: { call: "", expected: "true" }
  },
  debug: {
    title: "Check Completion after Join", subtitle: "The program reads Job state before establishing completion.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Premature lifecycle check",
    brokenCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    val job = launch(Dispatchers.IO) { println(\"uploaded\") }\n    println(job.isCompleted)\n    job.join()\n}",
    fixedCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    val job = launch(Dispatchers.IO) { println(\"uploaded\") }\n    job.join()\n    println(job.isCompleted)\n}",
    expectedOutput: "uploaded\ntrue",
    hints: ["isCompleted only reports the Job's state at the instant it is read.", "join establishes completion regardless of the dispatcher token used by launch.", "Move the lifecycle check after job.join()."],
    explanation: "The broken code prints false before the queued child runs, then uploaded during join. The fixed code joins first, so uploaded is followed by true."
  },
  mastered: {
    topicTitle: "Dispatchers & Jobs", summary: "You can select a dispatcher context, retain the returned Job, and establish completion without confusing execution context with lifecycle.", passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Dispatcher purpose", subtitle: "Default, IO, and platform Main roles are distinguished" },
      { title: "Job lifecycle", subtitle: "join and isCompleted are traced independently of dispatcher choice" },
      { title: "Implementation", subtitle: "launch(Default) plus explicit Job completion" },
      { title: "Debugging", subtitle: "move a lifecycle read after join" },
      { title: "Capability boundary", subtitle: "context tokens are supported; real thread pools are not claimed" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    subtitle: "Request cancellation and stop work at explicit cooperative checkpoints.",
    exampleTag: "EXAMPLE",
    exampleTitle: "A cancelled Job stops at ensureActive",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        ensureActive()", "        println(\"unreachable\")", "    }", "    job.join()", "    println(job.isCancelled)", "}"],
    explanation: "cancel requests cancellation; it does not forcibly interrupt arbitrary instructions. Cooperative APIs such as delay, yield, and ensureActive observe the cancelled Job and stop the coroutine with CancellationException semantics. Here the child cancels its own Job, ensureActive prevents the final println, and join completes normally before true is printed.",
    keyIdeas: [
      { number: 1, title: "Cancellation is a request", description: "Job.cancel marks the Job cancelled; coroutine code stops when it reaches a cooperative check." },
      { number: 2, title: "Checkpoints", description: "delay, yield, and ensureActive check cancellation in this lesson subset." },
      { number: 3, title: "Observable state", description: "A cancelled Job reports isCancelled true and isActive false; joining it establishes completion." },
      { number: 4, title: "Cleanup", description: "finally still runs when a cooperative checkpoint exits by cancellation, making it suitable for non-suspending cleanup." }
    ],
    keyTakeaway: "Cancellation becomes effective at cooperative checks; use Job state for observation and finally for cleanup."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five programs isolate state, ensureActive, yield, delay, and finally cleanup.",
    cards: [
      { id: "world-16-cancellation-cooperative-cancellation-explore-1", number: "01", title: "Cancellation state", language: 'Kotlin', subtitle: "cancel changes isActive and isCancelled", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        val current = coroutineContext[Job]", "        current?.cancel()", "        println(current?.isActive)", "        println(current?.isCancelled)", "    }", "    job.join()", "}"], whatItMeans: [{ label: 'Output', description: "false, then true." }], whatChanged: "The running child observes its own Job state immediately after requesting cancellation." },
      { id: "world-16-cancellation-cooperative-cancellation-explore-2", number: "02", title: "ensureActive checkpoint", language: 'Kotlin', subtitle: "ensureActive stops a cancelled child", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        ensureActive()", "        println(\"unreachable\")", "    }", "    job.join()", "    println(job.isCancelled)", "}"], whatItMeans: [{ label: 'Output', description: "true; unreachable is not printed." }], whatChanged: "The explicit checkpoint converts the cancellation request into control-flow exit." },
      { id: "world-16-cancellation-cooperative-cancellation-explore-3", number: "03", title: "yield checkpoint", language: 'Kotlin', subtitle: "yield checks cancellation before continuing", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        yield()", "        println(\"unreachable\")", "    }", "    job.join()", "    println(\"stopped\")", "}"], whatItMeans: [{ label: 'Output', description: "stopped" }, { label: 'Boundary', description: "The editor treats yield as a checkpoint but has no scheduler to transfer execution to." }], whatChanged: "yield provides the cooperative observation point without claiming real interleaving." },
      { id: "world-16-cancellation-cooperative-cancellation-explore-4", number: "04", title: "delay checkpoint", language: 'Kotlin', subtitle: "delay checks cancellation before its simulated no-op", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        delay(1)", "        println(\"unreachable\")", "    }", "    job.join()", "    println(job.isCompleted)", "}"], whatItMeans: [{ label: 'Output', description: "true" }, { label: 'Boundary', description: "No elapsed time is modeled." }], whatChanged: "The existing delay no-op now preserves its cancellation-check responsibility." },
      { id: "world-16-cancellation-cooperative-cancellation-explore-5", number: "05", title: "Cleanup in finally", language: 'Kotlin', subtitle: "finally runs when ensureActive exits by cancellation", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        try {", "            coroutineContext[Job]?.cancel()", "            ensureActive()", "        } finally {", "            println(\"cleanup\")", "        }", "    }", "    job.join()", "    println(job.isCancelled)", "}"], whatItMeans: [{ label: 'Output', description: "cleanup, then true." }], whatChanged: "The cancellation exit still executes the cleanup block." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Trace cancellation state and checkpoints without assuming preemptive interruption.",
    questions: [
      { id: "world-16-cancellation-cooperative-cancellation-predict-1", questionNumber: 1, totalQuestions: 6, title: "Cancelled state", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch { coroutineContext[Job]?.cancel() }", "    job.join()", "    println(job.isCancelled)", "}"], prompt: "What is printed?", options: [{ id: "A", label: "false", isCorrect: false }, { id: "B", label: "true", isCorrect: true }, { id: "C", label: "Job", isCorrect: false }, { id: "D", label: "Nothing", isCorrect: false }], explanation: { codeRef: "Cancelled state", detail: "The child cancels its Job; join completes it and isCancelled remains true." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-2", questionNumber: 2, totalQuestions: 6, title: "Checkpoint exit", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        ensureActive()", "        println(\"after\")", "    }", "    job.join()", "    println(\"done\")", "}"], prompt: "What is printed?", options: [{ id: "A", label: "after\ndone", isCorrect: false }, { id: "B", label: "after", isCorrect: false }, { id: "C", label: "done", isCorrect: true }, { id: "D", label: "CancellationException\ndone", isCorrect: false }], explanation: { codeRef: "Checkpoint exit", detail: "ensureActive stops the child normally through cancellation semantics; outer code prints done." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-3", questionNumber: 3, totalQuestions: 6, title: "Finally ordering", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        try { coroutineContext[Job]?.cancel(); yield() }", "        finally { println(\"release\") }", "    }", "    job.join()", "    println(\"joined\")", "}"], prompt: "What is printed?", options: [{ id: "A", label: "joined only", isCorrect: false }, { id: "B", label: "joined\nrelease", isCorrect: false }, { id: "C", label: "CancellationException", isCorrect: false }, { id: "D", label: "release\njoined", isCorrect: true }], explanation: { codeRef: "Finally ordering", detail: "yield observes cancellation, finally releases first, and join then returns to print joined." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-4", questionNumber: 4, totalQuestions: 6, title: "No checkpoint", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        coroutineContext[Job]?.cancel()", "        println(\"continued\")", "    }", "    job.join()", "}"], prompt: "Why does continued print in this deterministic example?", options: [{ id: "A", label: "cancel is a request; no cooperative checkpoint occurs before println.", isCorrect: true }, { id: "B", label: "cancel resets the Job to active.", isCorrect: false }, { id: "C", label: "println catches CancellationException.", isCorrect: false }, { id: "D", label: "join removes cancellation.", isCorrect: false }], explanation: { codeRef: "No checkpoint", detail: "Cancellation does not preempt the next ordinary instruction." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-5", questionNumber: 5, totalQuestions: 6, title: "Blocking boundary", topicMeta: "concept", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A long blocking call contains no coroutine cancellation checkpoint."], prompt: "Which statement is correct?", options: [{ id: "A", label: "cancel always interrupts any blocking library call.", isCorrect: false }, { id: "B", label: "Blocking code must return or use an interruptible/cooperative integration before cancellation can take effect.", isCorrect: true }, { id: "C", label: "Every loop automatically checks Job state.", isCorrect: false }, { id: "D", label: "Dispatchers.Default converts blocking code into delay.", isCorrect: false }], explanation: { codeRef: "Blocking boundary", detail: "Coroutine cancellation is cooperative, not arbitrary thread preemption." } },
      { id: "world-16-cancellation-cooperative-cancellation-predict-6", questionNumber: 6, totalQuestions: 6, title: "Normal cancellation", topicMeta: "concept", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Cooperative checkpoints use CancellationException semantics."], prompt: "How should normal cancellation be treated?", options: [{ id: "A", label: "As proof that the parent always failed.", isCorrect: false }, { id: "B", label: "As an unrelated compile error.", isCorrect: false }, { id: "C", label: "As normal coroutine completion by cancellation, while still running finally cleanup.", isCorrect: true }, { id: "D", label: "As a returned Deferred value.", isCorrect: false }], explanation: { codeRef: "Normal cancellation", detail: "CancellationException signals normal cancellation and does not skip finally." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Stop at yield", description: "After the child cancels its Job, add a cooperative yield checkpoint so continued is not printed.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "StopAtYield.kt",
    initialCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nfun main() = runBlocking {\n    val job = launch {\n        coroutineContext[Job]?.cancel()\n        // TODO add a cooperative checkpoint\n        println(\"continued\")\n    }\n    job.join()\n    println(job.isCancelled)\n}",
    solutionCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nfun main() = runBlocking {\n    val job = launch {\n        coroutineContext[Job]?.cancel()\n        yield()\n        println(\"continued\")\n    }\n    job.join()\n    println(job.isCancelled)\n}",
    sampleInput: "main()", expectedOutput: "true", testCase: { call: "", expected: "true" }
  },
  debug: {
    title: "Move Cleanup into finally", subtitle: "Cancellation skips the statement after ensureActive, so cleanup never runs.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Skipped cancellation cleanup",
    brokenCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nfun main() = runBlocking {\n    val job = launch {\n        coroutineContext[Job]?.cancel()\n        ensureActive()\n        println(\"cleanup\")\n    }\n    job.join()\n    println(job.isCancelled)\n}",
    fixedCode: "import kotlinx.coroutines.*\nimport kotlin.coroutines.coroutineContext\n\nfun main() = runBlocking {\n    val job = launch {\n        try {\n            coroutineContext[Job]?.cancel()\n            ensureActive()\n        } finally {\n            println(\"cleanup\")\n        }\n    }\n    job.join()\n    println(job.isCancelled)\n}",
    expectedOutput: "cleanup\ntrue",
    hints: ["The statement after ensureActive is unreachable once the Job is cancelled.", "finally executes when the checkpoint exits through cancellation.", "Place non-suspending cleanup inside finally, then inspect the Job after join."],
    explanation: "The broken cleanup is after a throwing checkpoint and is skipped. The fixed version puts cleanup in finally, producing cleanup then true."
  },
  mastered: {
    topicTitle: "Cancellation & Cooperative Cancellation", summary: "You can request cancellation, inspect Job state, stop at cooperative checkpoints, and preserve cleanup with finally.", passedCount: "6 / 6 PASSED",
    verificationItems: [
      { title: "Cancellation state", subtitle: "isActive and isCancelled reflect the request" },
      { title: "Checkpoints", subtitle: "ensureActive, yield, and delay observe cancellation" },
      { title: "Cleanup", subtitle: "finally runs during cooperative cancellation exit" },
      { title: "Implementation", subtitle: "add yield so cancelled work cannot continue" },
      { title: "Capability boundary", subtitle: "no preemption, blocking interruption, timing, or scheduler interleaving" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    subtitle: "Keep child work inside an owner whose lifetime includes every child.",
    exampleTag: "EXAMPLE",
    exampleTitle: "The scope completes after its child",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "", "fun main() = runBlocking {", "    coroutineScope {", "        launch { println(\"child\") }", "    }", "    println(\"scope complete\")", "}"],
    explanation: "coroutineScope does not return until all children created inside it complete. The launch belongs to that scope, so child prints before execution continues to scope complete. If an ordinary child fails, the scope cancels its remaining children and propagates the failure rather than leaving detached work behind.",
    keyIdeas: [
      { number: 1, title: "Owned lifetime", description: "Children created inside coroutineScope remain attached to that scope." },
      { number: 2, title: "Completion boundary", description: "The scope returns only after its block and all owned children complete." },
      { number: 3, title: "Nested ownership", description: "A child may create another child; the enclosing scope still waits for the complete hierarchy." },
      { number: 4, title: "Failure boundary", description: "An ordinary child failure cancels remaining owned children and propagates out of the scope." }
    ],
    keyTakeaway: "Structured concurrency makes child lifetime, completion, cancellation, and failure part of an explicit parent scope."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five scenarios isolate waiting, multiple children, nesting, state visibility, and failure ownership.",
    cards: [
      { id: "world-16-structured-concurrency-explore-1", number: "01", title: "Wait for one child", language: 'Kotlin', subtitle: "code after coroutineScope runs after its child", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { println(\"child\") } }", "    println(\"after\")", "}"], whatItMeans: [{ label: 'Output', description: "child, then after." }], whatChanged: "The scope boundary provides the wait; no detached child remains." },
      { id: "world-16-structured-concurrency-explore-2", number: "02", title: "Own two children", language: 'Kotlin', subtitle: "both Jobs belong to the same scope", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope {", "        launch { println(\"first\") }", "        launch { println(\"second\") }", "    }", "    println(\"all done\")", "}"], whatItMeans: [{ label: 'Editor output', description: "first, second, then all done." }, { label: 'Boundary', description: "Real sibling scheduling order must not be inferred; only all done being last is structural." }], whatChanged: "The owner waits for both registered children." },
      { id: "world-16-structured-concurrency-explore-3", number: "03", title: "Own a nested child", language: 'Kotlin', subtitle: "the scope includes grandchildren created by a child", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope {", "        launch {", "            println(\"parent child\")", "            launch { println(\"grandchild\") }", "        }", "    }", "    println(\"complete\")", "}"], whatItMeans: [{ label: 'Output', description: "parent child, grandchild, complete." }], whatChanged: "Draining the scope includes children registered by another owned child." },
      { id: "world-16-structured-concurrency-explore-4", number: "04", title: "Read state after the scope", language: 'Kotlin', subtitle: "the child update is established before the outer read", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var saved = false", "    coroutineScope { launch { saved = true } }", "    println(saved)", "}"], whatItMeans: [{ label: 'Output', description: "true" }], whatChanged: "The outer read is safe because coroutineScope has completed its child." },
      { id: "world-16-structured-concurrency-explore-5", number: "05", title: "Propagate child failure", language: 'Kotlin', subtitle: "failure leaves the scope instead of becoming detached", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    try {", "        coroutineScope {", "            val failing = launch { throw IllegalArgumentException(\"boom\") }", "            failing.join()", "        }", "    } catch (e: IllegalArgumentException) {", "        println(\"caught\")", "    }", "}"], whatItMeans: [{ label: 'Output', description: "caught" }], whatChanged: "The child failure crosses the owning scope boundary and can be handled outside it." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Trace ownership and completion without guessing sibling scheduler order.",
    questions: [
      { id: "world-16-structured-concurrency-predict-1", questionNumber: 1, totalQuestions: 5, title: "Scope completion", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { println(\"inside\") } }", "    println(\"outside\")", "}"], prompt: "What is guaranteed?", options: [{ id: "A", label: "outside prints before inside.", isCorrect: false }, { id: "B", label: "inside completes before outside prints.", isCorrect: true }, { id: "C", label: "The child is detached.", isCorrect: false }, { id: "D", label: "coroutineScope returns a Job immediately.", isCorrect: false }], explanation: { codeRef: "Scope completion", detail: "coroutineScope cannot return while its owned child is incomplete." } },
      { id: "world-16-structured-concurrency-predict-2", questionNumber: 2, totalQuestions: 5, title: "Two children", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope {", "        launch { println(\"A\") }", "        launch { println(\"B\") }", "    }", "    println(\"C\")", "}"], prompt: "Which ordering claim is structurally valid?", options: [{ id: "A", label: "A must always precede B on every dispatcher.", isCorrect: false }, { id: "B", label: "C may print while either child is incomplete.", isCorrect: false }, { id: "C", label: "Both A and B complete before C; sibling order is not generally guaranteed.", isCorrect: true }, { id: "D", label: "B is outside the parent scope.", isCorrect: false }], explanation: { codeRef: "Two children", detail: "Structured completion constrains C, not arbitrary sibling scheduling." } },
      { id: "world-16-structured-concurrency-predict-3", questionNumber: 3, totalQuestions: 5, title: "Nested ownership", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope {", "        launch { launch { println(\"nested\") } }", "    }", "    println(\"done\")", "}"], prompt: "What must be true?", options: [{ id: "A", label: "done can print before nested.", isCorrect: false }, { id: "B", label: "The inner launch has no parent.", isCorrect: false }, { id: "C", label: "Only the direct child is awaited.", isCorrect: false }, { id: "D", label: "nested completes before done.", isCorrect: true }], explanation: { codeRef: "Nested ownership", detail: "The grandchild remains in the enclosing structured lifetime." } },
      { id: "world-16-structured-concurrency-predict-4", questionNumber: 4, totalQuestions: 5, title: "Visible update", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var count = 0", "    coroutineScope { launch { count = 3 } }", "    println(count)", "}"], prompt: "What is printed?", options: [{ id: "A", label: "3", isCorrect: true }, { id: "B", label: "0", isCorrect: false }, { id: "C", label: "Job", isCorrect: false }, { id: "D", label: "null", isCorrect: false }], explanation: { codeRef: "Visible update", detail: "The scope completes the child update before the read." } },
      { id: "world-16-structured-concurrency-predict-5", questionNumber: 5, totalQuestions: 5, title: "Failure ownership", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// An ordinary child fails inside coroutineScope."], prompt: "What is the structured rule?", options: [{ id: "A", label: "The failure is silently discarded.", isCorrect: false }, { id: "B", label: "The scope cancels remaining children and propagates the failure.", isCorrect: true }, { id: "C", label: "Every sibling becomes a detached global coroutine.", isCorrect: false }, { id: "D", label: "coroutineScope converts the exception into null.", isCorrect: false }], explanation: { codeRef: "Failure ownership", detail: "Ordinary structured failure cancels siblings and leaves through the parent boundary." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Wait through an owning scope", description: "Wrap the launched update in coroutineScope so the value is changed before it is printed.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "OwnedChildUpdate.kt",
    initialCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var result = 0\n    launch { result = 7 }\n    println(result)\n}",
    solutionCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var result = 0\n    coroutineScope {\n        launch { result = 7 }\n    }\n    println(result)\n}",
    sampleInput: "main()", expectedOutput: "7", testCase: { call: "", expected: "7" }
  },
  debug: {
    title: "Keep both updates inside the scope", subtitle: "The total is printed before either owned update is established.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Missing structured boundary",
    brokenCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var total = 0\n    launch { total += 4 }\n    launch { total += 5 }\n    println(total)\n}",
    fixedCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    var total = 0\n    coroutineScope {\n        launch { total += 4 }\n        launch { total += 5 }\n    }\n    println(total)\n}",
    expectedOutput: "9",
    hints: ["runBlocking owns the children but does not reach its final drain before the current println.", "A nested coroutineScope supplies an earlier completion boundary.", "Put both launches inside the scope and read total only after that scope returns."],
    explanation: "The broken version prints 0 before runBlocking drains its children. The fixed scope completes both updates before total is read, so it prints 9."
  },
  mastered: {
    topicTitle: "Structured Concurrency", summary: "You can keep direct and nested children inside an explicit owner, wait at the scope boundary, and reason about failure propagation.", passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Owned children", subtitle: "coroutineScope retains direct and nested child lifetime" },
      { title: "Completion", subtitle: "code after the scope runs after all owned work" },
      { title: "Failure", subtitle: "ordinary child failure cancels remaining children and propagates" },
      { title: "Implementation", subtitle: "use a nested scope as the required completion boundary" },
      { title: "Capability boundary", subtitle: "deterministic draining; no sibling scheduling guarantee" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    subtitle: "Build a suspending function that owns children and returns one structured result.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Return two awaited child results",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "", "suspend fun total(): Int = coroutineScope {", "    val left = async { 4 }", "    val right = async { 6 }", "    left.await() + right.await()", "}", "", "fun main() = runBlocking { println(total()) }"],
    explanation: "coroutineScope is a suspending expression: it creates a local structured boundary, allows child builders inside it, waits for all owned children, and returns the block's final value. Here both Deferred values belong to total's scope, and their awaited Int values form the returned result 10.",
    keyIdeas: [
      { number: 1, title: "Suspending expression", description: "coroutineScope can be called from a suspend function and used as that function's return expression." },
      { number: 2, title: "Block result", description: "After owned children complete, the block's final expression becomes the coroutineScope result." },
      { number: 3, title: "Local ownership", description: "Children cannot outlive the suspending helper's scope boundary." },
      { number: 4, title: "Failure as a unit", description: "An ordinary child failure cancels remaining children and prevents a normal block result." }
    ],
    keyTakeaway: "Use coroutineScope inside suspend functions to combine owned child work into one returned result."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five programs focus on expression results, child completion, nesting, and failure.",
    cards: [
      { id: "world-16-coroutinescope-explore-1", number: "01", title: "Return the block value", language: 'Kotlin', subtitle: "coroutineScope is an expression", code: ["import kotlinx.coroutines.*", "suspend fun value(): Int = coroutineScope { 4 }", "fun main() = runBlocking { println(value()) }"], whatItMeans: [{ label: 'Output', description: "4" }], whatChanged: "The simplest form establishes that coroutineScope returns its final expression." },
      { id: "world-16-coroutinescope-explore-2", number: "02", title: "Combine two Deferred values", language: 'Kotlin', subtitle: "both result children are locally owned", code: ["import kotlinx.coroutines.*", "suspend fun total(): Int = coroutineScope {", "    val a = async { 4 }", "    val b = async { 6 }", "    a.await() + b.await()", "}", "fun main() = runBlocking { println(total()) }"], whatItMeans: [{ label: 'Output', description: "10" }], whatChanged: "The returned value depends on two children created inside the helper." },
      { id: "world-16-coroutinescope-explore-3", number: "03", title: "Wait before returning text", language: 'Kotlin', subtitle: "an unjoined launch still completes before the scope result returns", code: ["import kotlinx.coroutines.*", "suspend fun load(): String = coroutineScope {", "    launch { println(\"child\") }", "    \"done\"", "}", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Output', description: "child, then done." }], whatChanged: "The String result is delivered only after the owned launch completes." },
      { id: "world-16-coroutinescope-explore-4", number: "04", title: "Nest a result scope", language: 'Kotlin', subtitle: "a child can call another suspending coroutineScope", code: ["import kotlinx.coroutines.*", "suspend fun nested(): Int = coroutineScope {", "    val value = async { coroutineScope { 3 } }", "    value.await() + 4", "}", "fun main() = runBlocking { println(nested()) }"], whatItMeans: [{ label: 'Output', description: "7" }], whatChanged: "Both the inner and outer scope return values through their structured boundaries." },
      { id: "world-16-coroutinescope-explore-5", number: "05", title: "Lose the normal result on failure", language: 'Kotlin', subtitle: "a failing child exits the scope exceptionally", code: ["import kotlinx.coroutines.*", "suspend fun load(): Int = coroutineScope {", "    val failing = launch { throw IllegalArgumentException(\"boom\") }", "    failing.join()", "    9", "}", "fun main() = runBlocking {", "    try { println(load()) }", "    catch (e: IllegalArgumentException) { println(\"caught\") }", "}"], whatItMeans: [{ label: 'Output', description: "caught; 9 is not returned." }], whatChanged: "Failure prevents the scope from producing its normal final value." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Trace coroutineScope as a suspending, result-producing ownership boundary.",
    questions: [
      { id: "world-16-coroutinescope-predict-1", questionNumber: 1, totalQuestions: 5, title: "Expression result", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun answer() = coroutineScope { 21 * 2 }", "fun main() = runBlocking { println(answer()) }"], prompt: "What is printed?", options: [{ id: "A", label: "Unit", isCorrect: false }, { id: "B", label: "42", isCorrect: true }, { id: "C", label: "Job", isCorrect: false }, { id: "D", label: "Deferred", isCorrect: false }], explanation: { codeRef: "Expression result", detail: "The final Int expression is the coroutineScope result." } },
      { id: "world-16-coroutinescope-predict-2", questionNumber: 2, totalQuestions: 5, title: "Owned launch", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun report() = coroutineScope {", "    launch { println(\"prepared\") }", "    \"ready\"", "}", "fun main() = runBlocking { println(report()) }"], prompt: "What is printed in this deterministic editor?", options: [{ id: "A", label: "ready only", isCorrect: false }, { id: "B", label: "ready\nprepared", isCorrect: false }, { id: "C", label: "prepared\nready", isCorrect: true }, { id: "D", label: "Job\nready", isCorrect: false }], explanation: { codeRef: "Owned launch", detail: "The scope finishes the launch before returning ready to println." } },
      { id: "world-16-coroutinescope-predict-3", questionNumber: 3, totalQuestions: 5, title: "Two results", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun sum() = coroutineScope {", "    val x = async { 2 }", "    val y = async { 5 }", "    x.await() + y.await()", "}", "fun main() = runBlocking { println(sum()) }"], prompt: "What is printed?", options: [{ id: "A", label: "Deferred", isCorrect: false }, { id: "B", label: "5", isCorrect: false }, { id: "C", label: "10", isCorrect: false }, { id: "D", label: "7", isCorrect: true }], explanation: { codeRef: "Two results", detail: "Both awaited Int values are added and returned." } },
      { id: "world-16-coroutinescope-predict-4", questionNumber: 4, totalQuestions: 5, title: "Suspending caller", topicMeta: "compilation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "suspend fun value() = coroutineScope { 8 }", "fun main() { println(value()) }"], prompt: "Why is this invalid Kotlin?", options: [{ id: "A", label: "An ordinary main cannot call the suspend function value directly.", isCorrect: true }, { id: "B", label: "coroutineScope can return only Unit.", isCorrect: false }, { id: "C", label: "Int is not allowed in a coroutine.", isCorrect: false }, { id: "D", label: "Every coroutineScope requires Dispatchers.IO.", isCorrect: false }], explanation: { codeRef: "Suspending caller", detail: "A suspend helper needs a coroutine or another suspend caller." } },
      { id: "world-16-coroutinescope-predict-5", questionNumber: 5, totalQuestions: 5, title: "Failed result", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A child fails before coroutineScope can return its final expression."], prompt: "What happens to the normal result?", options: [{ id: "A", label: "It is always returned before the failure.", isCorrect: false }, { id: "B", label: "The scope propagates failure instead of returning the normal result.", isCorrect: true }, { id: "C", label: "It becomes a detached Deferred automatically.", isCorrect: false }, { id: "D", label: "It is converted to null.", isCorrect: false }], explanation: { codeRef: "Failed result", detail: "Failure exits the structured scope exceptionally." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Return from coroutineScope", description: "Create two async children inside coroutineScope and return their awaited sum.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "ReturnFromCoroutineScope.kt",
    initialCode: "import kotlinx.coroutines.*\n\nsuspend fun total(): Int = coroutineScope {\n    // TODO create async values 4 and 6 and return their awaited sum\n    0\n}\n\nfun main() = runBlocking { println(total()) }",
    solutionCode: "import kotlinx.coroutines.*\n\nsuspend fun total(): Int = coroutineScope {\n    val a = async { 4 }\n    val b = async { 6 }\n    a.await() + b.await()\n}\n\nfun main() = runBlocking { println(total()) }",
    sampleInput: "main()", expectedOutput: "10", testCase: { call: "", expected: "10" }
  },
  debug: {
    title: "Return the child's value", subtitle: "The scope returns a placeholder instead of awaiting its result child.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Discarded structured result",
    brokenCode: "import kotlinx.coroutines.*\n\nsuspend fun status(): String = coroutineScope {\n    async { \"ready\" }\n    \"pending\"\n}\n\nfun main() = runBlocking { println(status()) }",
    fixedCode: "import kotlinx.coroutines.*\n\nsuspend fun status(): String = coroutineScope {\n    val result = async { \"ready\" }\n    result.await()\n}\n\nfun main() = runBlocking { println(status()) }",
    expectedOutput: "ready",
    hints: ["coroutineScope returns its block's final expression.", "The async child stores ready in Deferred<String>.", "Keep the Deferred and make its awaited String the block's final expression."],
    explanation: "The broken block explicitly ends with pending, so that is its result. The fixed block awaits the owned Deferred and returns ready."
  },
  mastered: {
    topicTitle: "coroutineScope", summary: "You can use coroutineScope as a suspending expression that owns children and returns their combined result.", passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Expression result", subtitle: "the final block expression becomes the returned value" },
      { title: "Owned results", subtitle: "async children are awaited and combined locally" },
      { title: "Nested scopes", subtitle: "structured results compose through suspend functions" },
      { title: "Failure", subtitle: "child failure prevents normal result return" },
      { title: "Capability", subtitle: "deterministic structured execution without real concurrency" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    subtitle: "Keep independent children owned while isolating one child's failure from its siblings.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Handle one failed Deferred and keep the healthy result",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "", "fun main() = runBlocking {", "    supervisorScope {", "        val bad = async<Int> { throw IllegalStateException(\"bad\") }", "        val good = async { 7 }", "        try { bad.await() }", "        catch (e: IllegalStateException) { println(\"bad\") }", "        println(good.await())", "    }", "}"],
    explanation: "supervisorScope still owns and waits for its children, but one direct child's failure does not automatically cancel independent siblings. async stores its failure in Deferred, so awaiting bad exposes the exception; handling it does not prevent good from returning 7. Supervision isolates failure propagation—it does not erase the failure.",
    keyIdeas: [
      { number: 1, title: "Sibling isolation", description: "A direct child failure does not automatically cancel other children in the supervisor scope." },
      { number: 2, title: "Still structured", description: "The supervisor waits for every child; it does not detach them." },
      { number: 3, title: "Failure remains observable", description: "A failed Deferred still throws from await and must be handled deliberately." },
      { number: 4, title: "Scope failure differs", description: "If the supervisor block itself fails, its children are cancelled and the failure propagates." }
    ],
    keyTakeaway: "Use supervisorScope for independent sibling work, then explicitly handle each child result or failure."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five scenarios separate waiting, sibling isolation, explicit handling, scope failure, and parent cancellation.",
    cards: [
      { id: "world-16-supervisorscope-explore-1", number: "01", title: "Wait for a healthy child", language: 'Kotlin', subtitle: "supervision remains structured", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope { launch { println(\"child\") } }", "    println(\"after\")", "}"], whatItMeans: [{ label: 'Output', description: "child, then after." }], whatChanged: "The supervisor waits just like an ordinary structured scope when no failure occurs." },
      { id: "world-16-supervisorscope-explore-2", number: "02", title: "Isolate a failed Deferred", language: 'Kotlin', subtitle: "the healthy sibling remains available", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val bad = async<Int> { throw IllegalStateException(\"bad\") }", "        val good = async { 7 }", "        try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }", "        println(good.await())", "    }", "}"], whatItMeans: [{ label: 'Output', description: "bad, then 7." }], whatChanged: "Handling the failed Deferred does not cancel the independent good result." },
      { id: "world-16-supervisorscope-explore-3", number: "03", title: "Do not suppress failure", language: 'Kotlin', subtitle: "await still exposes the stored exception", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val failed = async<Int> { throw IllegalArgumentException(\"x\") }", "        try { failed.await() }", "        catch (e: IllegalArgumentException) { println(\"handled\") }", "    }", "}"], whatItMeans: [{ label: 'Output', description: "handled" }], whatChanged: "Supervision changes sibling cancellation, not Deferred failure retrieval." },
      { id: "world-16-supervisorscope-explore-4", number: "04", title: "Fail the supervisor block", language: 'Kotlin', subtitle: "a scope-level failure still propagates", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    try {", "        supervisorScope {", "            launch { println(\"cancelled child\") }", "            throw IllegalStateException(\"scope\")", "        }", "    } catch (e: IllegalStateException) {", "        println(\"scope failed\")", "    }", "}"], whatItMeans: [{ label: 'Editor output', description: "scope failed; the queued child is cancelled." }, { label: 'Boundary', description: "No sibling scheduling order is claimed for real dispatchers." }], whatChanged: "The failure originates in the supervisor block, not an isolated child result." },
      { id: "world-16-supervisorscope-explore-5", number: "05", title: "Parent cancellation still descends", language: 'Kotlin', subtitle: "supervision does not block downward cancellation", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    supervisorScope {", "        val child = launch { println(\"unreachable\") }", "        coroutineContext[Job]?.cancel()", "        println(child.isCancelled)", "    }", "}"], whatItMeans: [{ label: 'Output', description: "true" }], whatChanged: "Cancelling the parent Job still cancels its supervised child." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Distinguish sibling isolation from exception suppression and detachment.",
    questions: [
      { id: "world-16-supervisorscope-predict-1", questionNumber: 1, totalQuestions: 5, title: "Healthy sibling", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val bad = async<Int> { throw IllegalStateException(\"bad\") }", "        val good = async { 5 }", "        try { bad.await() } catch (e: IllegalStateException) { println(\"caught\") }", "        println(good.await())", "    }", "}"], prompt: "What is printed?", options: [{ id: "A", label: "5 only", isCorrect: false }, { id: "B", label: "caught\n5", isCorrect: true }, { id: "C", label: "caught\nCancellationException", isCorrect: false }, { id: "D", label: "scope failed", isCorrect: false }], explanation: { codeRef: "Healthy sibling", detail: "The failed Deferred is handled and the supervised good sibling remains usable." } },
      { id: "world-16-supervisorscope-predict-2", questionNumber: 2, totalQuestions: 5, title: "Still owned", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope { launch { println(\"owned\") } }", "    println(\"done\")", "}"], prompt: "Which statement is correct?", options: [{ id: "A", label: "The child is detached from every parent.", isCorrect: false }, { id: "B", label: "done may print while the child remains incomplete.", isCorrect: false }, { id: "C", label: "The supervisor waits for the owned child before returning.", isCorrect: true }, { id: "D", label: "supervisorScope returns the child Job immediately.", isCorrect: false }], explanation: { codeRef: "Still owned", detail: "Supervision preserves structured lifetime." } },
      { id: "world-16-supervisorscope-predict-3", questionNumber: 3, totalQuestions: 5, title: "Awaited failure", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A failed Deferred is awaited inside supervisorScope."], prompt: "What does supervision do to the exception?", options: [{ id: "A", label: "Converts it to zero.", isCorrect: false }, { id: "B", label: "Silently removes it.", isCorrect: false }, { id: "C", label: "Returns it as a Job.", isCorrect: false }, { id: "D", label: "Leaves it observable through await for explicit handling.", isCorrect: true }], explanation: { codeRef: "Awaited failure", detail: "Sibling isolation is not exception suppression." } },
      { id: "world-16-supervisorscope-predict-4", questionNumber: 4, totalQuestions: 5, title: "Scope-level failure", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// The supervisorScope block itself throws before returning."], prompt: "What is the rule?", options: [{ id: "A", label: "The scope cancels its children and propagates the block failure.", isCorrect: true }, { id: "B", label: "The block failure is always ignored.", isCorrect: false }, { id: "C", label: "All children become global coroutines.", isCorrect: false }, { id: "D", label: "The failure becomes a successful null result.", isCorrect: false }], explanation: { codeRef: "Scope-level failure", detail: "Supervision isolates child failures, not failure of the owning block itself." } },
      { id: "world-16-supervisorscope-predict-5", questionNumber: 5, totalQuestions: 5, title: "Parent cancellation", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// The parent Job of a supervisorScope is cancelled."], prompt: "What happens to supervised children?", options: [{ id: "A", label: "They become permanently detached.", isCorrect: false }, { id: "B", label: "Parent cancellation still propagates downward to them.", isCorrect: true }, { id: "C", label: "They turn into Deferred null values.", isCorrect: false }, { id: "D", label: "They ignore every cancellation request.", isCorrect: false }], explanation: { codeRef: "Parent cancellation", detail: "Supervisor isolation applies between siblings, not against cancellation from above." } }
    ]
  },
  writeRun: {
    challengeNumber: 1, totalChallenges: 1, xpReward: 20,
    title: "Isolate an expected child failure", description: "Use supervisorScope so a handled failed Deferred does not invalidate the healthy sibling result.",
    requirements: { name: "main", params: "(none)", returns: "Unit" }, fileName: "IsolateExpectedFailure.kt",
    initialCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    try {\n        coroutineScope {\n            val bad = async<Int> { throw IllegalStateException(\"bad\") }\n            val good = async { 7 }\n            try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }\n            println(good.await())\n        }\n    } catch (e: IllegalStateException) {\n        println(\"scope failed\")\n    }\n}",
    solutionCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    supervisorScope {\n        val bad = async<Int> { throw IllegalStateException(\"bad\") }\n        val good = async { 7 }\n        try { bad.await() } catch (e: IllegalStateException) { println(\"bad\") }\n        println(good.await())\n    }\n}",
    sampleInput: "main()", expectedOutput: "bad\n7", testCase: { call: "", expected: "bad\n7" }
  },
  debug: {
    title: "Keep the cached result independent", subtitle: "Ordinary coroutineScope reports failure after the handled remote child.", challengeNumber: 1, totalChallenges: 1, difficulty: "medium", bugType: "logic", bugLabel: "Wrong failure boundary",
    brokenCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    try {\n        coroutineScope {\n            val remote = async<String> { throw IllegalStateException(\"offline\") }\n            val cached = async { \"cached\" }\n            try { remote.await() } catch (e: IllegalStateException) { println(\"offline\") }\n            println(cached.await())\n        }\n    } catch (e: IllegalStateException) { println(\"scope failed\") }\n}",
    fixedCode: "import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n    supervisorScope {\n        val remote = async<String> { throw IllegalStateException(\"offline\") }\n        val cached = async { \"cached\" }\n        try { remote.await() } catch (e: IllegalStateException) { println(\"offline\") }\n        println(cached.await())\n    }\n}",
    expectedOutput: "offline\ncached",
    hints: ["The two results are intentionally independent.", "Catching await handles the failed Deferred, but ordinary coroutineScope still fails as a unit.", "Use supervisorScope so the cached sibling remains valid without a later scope failure."],
    explanation: "The broken scope prints offline and cached, then propagates the child failure and prints scope failed. The supervisor version keeps the handled failure isolated and ends after cached."
  },
  mastered: {
    topicTitle: "supervisorScope", summary: "You can isolate independent sibling failure while preserving structured ownership and explicit error handling.", passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Sibling isolation", subtitle: "one child failure does not cancel healthy siblings" },
      { title: "Structured lifetime", subtitle: "the supervisor still waits for every child" },
      { title: "Explicit failure", subtitle: "Deferred failure remains observable through await" },
      { title: "Scope failure", subtitle: "failure of the owning block still propagates" },
      { title: "Cancellation", subtitle: "parent cancellation still travels downward" }
    ], xpEarned: 20, streakDays: 1, accuracy: "100%"
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
    explanation: "await() retrieves and rethrows a Deferred's stored failure -- but catching it there only handles your own local read of the result. It does not undo the fact that the child coroutine already failed: in an ordinary (non-supervised) scope, that failure has already propagated structurally to runBlocking the moment the child threw, independent of whether or when you call await(). So this exact program prints \"bad\" (the catch runs) and then still crashes with the same exception, because runBlocking itself also fails. Verified directly against Kotlin 2.0.21 -- this is real, documented Kotlin behavior, not a simulator quirk. supervisorScope (Lesson 9) is what actually isolates a child's failure from its parent; plain catching at await() does not.",
    keyIdeas: [{ number: 1, title: "Catching is not immunity", description: "try/catch around await() handles your read of the Deferred's value -- it does not stop the coroutine's own failure from also failing an ordinary parent scope." }, { number: 2, title: "Structured launch", description: "An unhandled launch failure normally fails its ordinary parent scope the same way -- the builder doesn't matter, the scope's supervision does." }, { number: 3, title: "Handler boundary", description: "CoroutineExceptionHandler observes eligible uncaught launch-style failures; it is not a universal try/catch, and does not apply to Deferred failures at all." }, { number: 4, title: "Cancellation", description: "CancellationException communicates normal cooperative cancellation and should usually be rethrown by broad catch logic." }],
    keyTakeaway: "Catching a Deferred's exception at await() only handles your local read of it -- it does not stop that failure from also failing an ordinary parent scope. Use supervisorScope to actually isolate it."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Five distinct traces cover Deferred failure, structured launch propagation, cancellation, handlers, and cleanup.",
    cards: [
      { id: "world-16-exception-handling-in-coroutines-explore-1", number: "01", title: "Catching at await() is not enough on its own", language: 'Kotlin', subtitle: "the failure already propagated to runBlocking before await() ever ran", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalArgumentException(\"bad\") }", "    try { d.await() } catch (e: IllegalArgumentException) { println(e.message) }", "}"], whatItMeans: [{ label: 'Prints', description: "bad -- the catch block runs and prints the message." }, { label: 'Then', description: "The program still crashes with the same IllegalArgumentException, because this ordinary (non-supervised) scope already failed when the child threw -- verified directly against real Kotlin." }], whatChanged: "Shows the actual, easy-to-miss behavior: local catching does not isolate the scope." },
      { id: "world-16-exception-handling-in-coroutines-explore-2", number: "02", title: "Propagate a launch failure", language: 'Kotlin', subtitle: "ordinary structured scope fails as a unit", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    try { coroutineScope { launch { throw IllegalStateException(\"child\") } } }", "    catch (e: IllegalStateException) { println(\"scope failed\") }", "}"], whatItMeans: [{ label: 'Output', description: "scope failed" }], whatChanged: "The owner handles an uncaught launch failure after its child completes." },
      { id: "world-16-exception-handling-in-coroutines-explore-3", number: "03", title: "Treat cancellation normally", language: 'Kotlin', subtitle: "cancelled Job completes without ordinary failure", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { println(\"unreachable\") }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], whatItMeans: [{ label: 'Output', description: "true" }], whatChanged: "Normal cancellation does not print an error or execute the queued body." },
      { id: "world-16-exception-handling-in-coroutines-explore-4", number: "04", title: "Observe an uncaught launch", language: 'Kotlin', subtitle: "handler is for launch-style uncaught failure", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val handler = CoroutineExceptionHandler { _, e -> println(e.message) }", "    supervisorScope { launch(handler) { throw IllegalStateException(\"handled\") } }", "}"], whatItMeans: [{ label: 'Output', description: "handled" }, { label: 'Boundary', description: "The editor models this eligible supervised launch case only." }], whatChanged: "The handler observes the launch exception; it does not convert Deferred failures into values." },
      { id: "world-16-exception-handling-in-coroutines-explore-5", number: "05", title: "Clean up on cancellation", language: 'Kotlin', subtitle: "finally still runs after a checkpoint exits", code: ["import kotlinx.coroutines.*", "import kotlin.coroutines.coroutineContext", "fun main() = runBlocking {", "    val job = launch {", "        try { coroutineContext[Job]?.cancel(); ensureActive() }", "        finally { println(\"cleanup\") }", "    }", "    job.join()", "}"], whatItMeans: [{ label: 'Output', description: "cleanup" }], whatChanged: "Cancellation exits through finally without becoming an ordinary child failure." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Choose the correct failure boundary without treating a handler as universal catch logic.",
    questions: [
      { id: "world-16-exception-handling-in-coroutines-predict-1", questionNumber: 1, totalQuestions: 5, title: "Deferred failure in an ordinary scope", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val d = async<Int> { throw IllegalStateException(\"bad\") }", "    try { d.await() } catch (e: IllegalStateException) { println(\"caught\") }", "}"], prompt: "What actually happens when this program runs?", options: [{ id: "A", label: "It prints caught, and the whole program then completes normally.", isCorrect: false }, { id: "B", label: "It prints caught, and the program still crashes afterward with the same exception, because the child's failure already propagated to runBlocking.", isCorrect: true }, { id: "C", label: "It prints bad and stops there; catch is never reached.", isCorrect: false }, { id: "D", label: "Nothing prints; await() silently suppresses the failure.", isCorrect: false }], explanation: { codeRef: "Deferred failure in an ordinary scope", detail: "await() does retrieve and rethrow into the catch, so caught prints -- but this is a plain runBlocking scope, not supervisorScope, so the child's already-propagated failure still fails the scope itself afterward. Verified directly against real Kotlin 2.0.21." } },
      { id: "world-16-exception-handling-in-coroutines-predict-2", questionNumber: 2, totalQuestions: 5, title: "Launch ownership", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    try { coroutineScope { launch { throw IllegalStateException(\"x\") } } }", "    catch (e: IllegalStateException) { println(\"owner\") }", "}"], prompt: "Why does owner print?", options: [{ id: "A", label: "launch returns the exception as a value.", isCorrect: false }, { id: "B", label: "runBlocking ignores every child.", isCorrect: false }, { id: "C", label: "The ordinary owning scope propagates its unhandled child failure.", isCorrect: true }, { id: "D", label: "delay throws automatically.", isCorrect: false }], explanation: { codeRef: "Launch ownership", detail: "Structured launch failure is handled at the owner boundary." } },
      { id: "world-16-exception-handling-in-coroutines-predict-3", questionNumber: 3, totalQuestions: 5, title: "Handler limit", topicMeta: "exception propagation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A failed Deferred is awaited while a CoroutineExceptionHandler is present."], prompt: "Which statement is correct?", options: [{ id: "A", label: "The handler changes the result to zero.", isCorrect: false }, { id: "B", label: "The handler makes await return null.", isCorrect: false }, { id: "C", label: "The handler prevents all parent cancellation.", isCorrect: false }, { id: "D", label: "The Deferred failure must still be handled at await.", isCorrect: true }], explanation: { codeRef: "Handler limit", detail: "CoroutineExceptionHandler does not replace Deferred result handling." } },
      { id: "world-16-exception-handling-in-coroutines-predict-4", questionNumber: 4, totalQuestions: 5, title: "Normal cancellation", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val job = launch { println(\"work\") }", "    job.cancelAndJoin()", "    println(job.isCancelled)", "}"], prompt: "What is printed in this deterministic editor?", options: [{ id: "A", label: "true", isCorrect: true }, { id: "B", label: "work\ntrue", isCorrect: false }, { id: "C", label: "CancellationException", isCorrect: false }, { id: "D", label: "false", isCorrect: false }], explanation: { codeRef: "Normal cancellation", detail: "The queued child is cancelled before execution and completes normally as cancelled." } },
      { id: "world-16-exception-handling-in-coroutines-predict-5", questionNumber: 5, totalQuestions: 5, title: "Cleanup boundary", topicMeta: "cleanup", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A running coroutine reaches a cancellation checkpoint inside try/finally."], prompt: "Which block is still guaranteed to run?", options: [{ id: "A", label: "A later unreachable print", isCorrect: false }, { id: "B", label: "The finally block", isCorrect: true }, { id: "C", label: "Every sibling body", isCorrect: false }, { id: "D", label: "No block can run", isCorrect: false }], explanation: { codeRef: "Cleanup boundary", detail: "Stack unwinding runs finally when cooperative cancellation exits the body." } }
    ]
  },
  writeRun: {
    challengeNumber: 1,
    totalChallenges: 1,
    xpReward: 20,
    title: "Isolate and Handle a Deferred Failure",
    description: "Catching a failed Deferred's exception at await() is not enough by itself -- in an ordinary scope the child's failure has already propagated and will still crash the program afterward (see Learn). Use supervisorScope to actually isolate the failure, then catch it at await() and print -1. This task requires real kotlinx.coroutines behavior; hardcoded output is not evidence of the required construct.",
    requirements: { name: "main", params: "(none)", returns: "Unit" },
    fileName: "IsolateAndHandleADeferredFailure.kt",
    initialCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    // TODO wrap this in supervisorScope so the failure is isolated\n    val result = async<Int> { throw IllegalArgumentException(\"invalid\") }\n    // TODO await safely and print -1 on IllegalArgumentException\n}",
    solutionCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val result = async<Int> { throw IllegalArgumentException(\"invalid\") }\n        val value = try { result.await() } catch (e: IllegalArgumentException) { -1 }\n        println(value)\n    }\n}",
    sampleInput: "main()",
    expectedOutput: "-1",
    testCase: { call: "", expected: "-1" }
  },
  debug: {
    title: "Retrieve the Deferred Failure",
    subtitle: "join() waits for completion but never exposes a failure -- only await() retrieves (and can catch) it.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val d = async<Int> { throw IllegalStateException(\"boom\") }\n        d.join()\n        println(\"done\")\n    }\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val d = async<Int> { throw IllegalStateException(\"boom\") }\n        try { d.await() } catch (e: IllegalStateException) { println(\"handled\") }\n    }\n}\n",
    expectedOutput: "handled",
    hints: [
      "The failed operation was created with async, so its outcome belongs to Deferred.",
      "join() only waits for completion -- it never retrieves or rethrows the Deferred's result or failure, so the program silently prints \"done\" as if nothing went wrong.",
      "Replace join with await and catch IllegalStateException at that call to actually observe the failure."
    ],
    explanation: "join() genuinely never exposes a completion exception in real Kotlin -- only await() does -- so the broken version silently swallows the failure and prints done as if the child succeeded. Both versions are inside supervisorScope so an isolated child failure never crashes the surrounding program; the repair replaces join() with await(), which retrieves and lets the catch block observe the stored exception, printing handled."
  },
  mastered: {
    topicTitle: "Exception Handling in Coroutines",
    summary: "You can place coroutine error handling at the builder's real failure boundary, understand that catching at await() alone does not isolate an ordinary scope from a child's failure, and know that join() never exposes a failure the way await() does.",
    passedCount: "5 / 5 PASSED",
    verificationItems: [
      { title: "Deferred failures", subtitle: "async errors are retrieved and caught at await() -- but that alone does not stop an ordinary scope from still failing" },
      { title: "Launch failures", subtitle: "ordinary structured owners receive unhandled child failure" },
      { title: "Isolation", subtitle: "supervisorScope, not local catching, is what actually isolates a failed child from its parent" },
      { title: "join() vs await()", subtitle: "join() waits but never exposes a failure; only await() retrieves and can catch it" },
      { title: "Cleanup", subtitle: "finally executes during cooperative cancellation" }
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
    subtitle: "Make dispatcher choice and coroutine ownership explicit and testable -- never hidden inside a hardcoded default or a detached GlobalScope launch.",
    exampleTag: "EXAMPLE",
    exampleTitle: "Inject the dispatcher instead of hardcoding it",
    language: "Kotlin",
    codeSnippet: ["import kotlinx.coroutines.*", "class Repo(private val dispatcher: CoroutineDispatcher) {", "    suspend fun load(): Int = withContext(dispatcher) { 12 }", "}", "fun main() = runBlocking { println(Repo(Dispatchers.Default).load()) }"],
    explanation: "Repo takes its CoroutineDispatcher as a constructor parameter instead of calling withContext(Dispatchers.Default) directly inside load(). This is a small change with a real benefit: a test can now construct Repo with a different, deterministic dispatcher without touching Repo's own code at all -- the dispatcher choice belongs to whoever owns Repo's lifecycle, not to Repo itself. withContext still returns its block's value directly (12), so the caller's suspending call reads exactly like an ordinary function call.",
    keyIdeas: [
      { number: 1, title: "Inject the dispatcher", description: "A constructor parameter, not a hardcoded Dispatchers.Default inside the function, is what makes a suspend function's execution context swappable and testable." },
      { number: 2, title: "Never launch detached work from inside a suspend function", description: "GlobalScope.launch { ... } is not owned by any caller's scope -- nothing waits for it, so code right after it can observe state from before it ever ran (see Explore 2)." },
      { number: 3, title: "Structured ownership fixes it", description: "Replacing a detached GlobalScope.launch with a real owned scope (coroutineScope/launch) makes the caller's read happen only after the child actually completes (see Explore 4)." },
      { number: 4, title: "Never swallow CancellationException", description: "Catching a broad exception type and not rethrowing CancellationException lets code run after a cancellation point that was supposed to stop -- this simulator does not model that distinction executably, so treat it as a stated rule, not a demonstrated one." }
    ],
    keyTakeaway: "Inject dispatchers instead of hardcoding them, and never start work you don't structurally own -- an unowned GlobalScope launch can silently let a caller read state before that work ever ran."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "4 coverage-derived scenarios: dispatcher injection, the GlobalScope anti-pattern demonstrated with real differing output, its structured fix, and a distinct CPU-context computation. Counts follow distinct concepts, not a fixed quota.",
    cards: [
      { id: "world-16-coroutine-best-practices-explore-1", number: "01", title: "Inject a dispatcher", language: 'Kotlin', subtitle: "the constructor parameter makes the dispatcher swappable", code: ["import kotlinx.coroutines.*", "class Repo(private val dispatcher: CoroutineDispatcher) {", "    suspend fun load(): Int = withContext(dispatcher) { 12 }", "}", "fun main() = runBlocking { println(Repo(Dispatchers.Default).load()) }"], whatItMeans: [{ label: 'Output', description: "12" }, { label: 'Why', description: "withContext returns its block's value directly; the caller chose which dispatcher to pass in." }], whatChanged: "Baseline: dispatcher injected through the constructor." },
      { id: "world-16-coroutine-best-practices-explore-2", number: "02", title: "The GlobalScope anti-pattern, with real wrong output", language: 'Kotlin', subtitle: "detached work is never waited for -- the caller reads stale state", code: ["import kotlinx.coroutines.*", "class Repo {", "    suspend fun load(): Int {", "        var n = 0", "        GlobalScope.launch { n = 12 }", "        return n", "    }", "}", "fun main() = runBlocking { println(Repo().load()) }"], whatItMeans: [{ label: 'Output', description: "0 -- not 12" }, { label: 'Why', description: "GlobalScope.launch is not owned by load()'s caller, so nothing waits for it. return n runs immediately, before the detached block ever gets a chance to set n." }], whatChanged: "New: the exact anti-pattern Debug asks you to repair, with its real (wrong) output shown here first." },
      { id: "world-16-coroutine-best-practices-explore-3", number: "03", title: "withContext for a real computation", language: 'Kotlin', subtitle: "a distinct value shows this isn't just echoing the same constant", code: ["import kotlinx.coroutines.*", "suspend fun square(x: Int) = withContext(Dispatchers.Default) { x * x }", "fun main() = runBlocking { println(square(9)) }"], whatItMeans: [{ label: 'Output', description: "81" }], whatChanged: "A genuine computation (9*9), not the same literal 12 as Explore 1." },
      { id: "world-16-coroutine-best-practices-explore-4", number: "04", title: "Fix the anti-pattern with real ownership", language: 'Kotlin', subtitle: "coroutineScope makes the caller wait for the child before returning", code: ["import kotlinx.coroutines.*", "class Repo {", "    suspend fun load(): Int {", "        var n = 0", "        coroutineScope {", "            launch { n = 12 }", "        }", "        return n", "    }", "}", "fun main() = runBlocking { println(Repo().load()) }"], whatItMeans: [{ label: 'Output', description: "12 -- the fix for Explore 2" }, { label: 'Why', description: "coroutineScope does not return until its own launch completes, so return n now reads the updated value." }], whatChanged: "The structured-ownership fix for Explore 2's exact bug, verified to produce the opposite (correct) output." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Predict dispatcher-injection output, the GlobalScope anti-pattern's real (surprising) output, and why structured ownership fixes it.",
    questions: [
      { id: "world-16-coroutine-best-practices-predict-1", questionNumber: 1, totalQuestions: 5, title: "Injected dispatcher result", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "class Repo(private val dispatcher: CoroutineDispatcher) {", "    suspend fun load(): Int = withContext(dispatcher) { 12 }", "}", "fun main() = runBlocking { println(Repo(Dispatchers.Default).load()) }"], prompt: "What is printed?", options: [{ id: "A", label: "12", isCorrect: true }, { id: "B", label: "Unit", isCorrect: false }, { id: "C", label: "Default", isCorrect: false }, { id: "D", label: "Deferred", isCorrect: false }], explanation: { codeRef: "Explore 1", detail: "withContext returns its block's value directly to the suspending caller." } },
      { id: "world-16-coroutine-best-practices-predict-2", questionNumber: 2, totalQuestions: 5, title: "The GlobalScope anti-pattern's real output", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "class Repo {", "    suspend fun load(): Int {", "        var n = 0", "        GlobalScope.launch { n = 12 }", "        return n", "    }", "}", "fun main() = runBlocking { println(Repo().load()) }"], prompt: "What does this program actually print?", options: [{ id: "A", label: "12", isCorrect: false }, { id: "B", label: "Compilation error", isCorrect: false }, { id: "C", label: "0", isCorrect: true }, { id: "D", label: "Runtime exception", isCorrect: false }], explanation: { codeRef: "Explore 2", detail: "0, because GlobalScope.launch is never awaited by load()'s caller: return n reads n before the detached block runs. This is the entire reason GlobalScope is discouraged -- nothing structurally owns or waits for its work, so a caller can easily read stale state." } },
      { id: "world-16-coroutine-best-practices-predict-3", questionNumber: 3, totalQuestions: 5, title: "Why the structured version differs", topicMeta: "behavior", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "class Repo {", "    suspend fun load(): Int {", "        var n = 0", "        coroutineScope {", "            launch { n = 12 }", "        }", "        return n", "    }", "}", "fun main() = runBlocking { println(Repo().load()) }"], prompt: "This prints 12, unlike the GlobalScope version's 0. Why?", options: [{ id: "A", label: "launch behaves differently inside coroutineScope than inside GlobalScope.", isCorrect: false }, { id: "B", label: "coroutineScope makes launch execute synchronously and immediately.", isCorrect: false }, { id: "C", label: "n becomes a shared global variable once inside coroutineScope.", isCorrect: false }, { id: "D", label: "coroutineScope does not return until its own launched child completes, so return n now reads the updated value.", isCorrect: true }], explanation: { codeRef: "Explore 4", detail: "The fix is ownership, not different launch semantics -- coroutineScope structurally waits for what it starts." } },
      { id: "world-16-coroutine-best-practices-predict-4", questionNumber: 4, totalQuestions: 5, title: "Swallowing cancellation", topicMeta: "cancellation", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A broad catch block catches CancellationException and does not rethrow it."], prompt: "What is the problem with this, conceptually?", options: [{ id: "A", label: "It is a compile error in real Kotlin.", isCorrect: false }, { id: "B", label: "Code after the catch block keeps running even though the coroutine was supposed to stop at that cancellation point.", isCorrect: true }, { id: "C", label: "It converts the cancellation into a completed, successful result automatically.", isCorrect: false }, { id: "D", label: "It has no effect either way, since cancellation cannot be caught.", isCorrect: false }], explanation: { codeRef: "Learn key idea 4", detail: "A generic catch swallowing CancellationException breaks cooperative cancellation -- rethrow it (or catch a narrower type) so the coroutine actually stops. This simulator does not model catch-based cancellation swallowing executably; treat this as a stated Kotlin rule." } },
      { id: "world-16-coroutine-best-practices-predict-5", questionNumber: 5, totalQuestions: 5, title: "Why inject rather than hardcode", topicMeta: "design", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "class Repo(private val dispatcher: CoroutineDispatcher) {", "    suspend fun load(): Int = withContext(dispatcher) { 12 }", "}"], prompt: "Why take dispatcher as a constructor parameter instead of calling withContext(Dispatchers.Default) directly inside load()?", options: [{ id: "A", label: "It makes load() run faster.", isCorrect: false }, { id: "B", label: "It is required by the Kotlin compiler for any suspend function.", isCorrect: false }, { id: "C", label: "It lets a caller (such as a test) supply a different, deterministic dispatcher without changing Repo's own code.", isCorrect: true }, { id: "D", label: "It removes the need for withContext entirely.", isCorrect: false }], explanation: { codeRef: "Learn key idea 1", detail: "Dispatcher choice belongs to whoever owns the component's lifecycle -- injecting it is what makes the component testable." } }
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
    summary: "You can inject a dispatcher instead of hardcoding it, recognize the GlobalScope anti-pattern by its real (surprising) output, and explain why structured ownership fixes it.",
    passedCount: "4 / 4 PASSED",
    verificationItems: [
      { title: "Concept coverage", subtitle: "4 distinct Explore scenarios: dispatcher injection, the GlobalScope bug with real wrong output, its structured fix, and a genuine CPU-context computation" },
      { title: "Reasoning coverage", subtitle: "5 independent Predict scenarios, each with misconception-based distractors" },
      { title: "Implementation", subtitle: "1 focused Write & Run task (inject a dispatcher), verified executable" },
      { title: "Debugging", subtitle: "1 independent GlobalScope-to-structured-ownership repair, verified to actually change the program's output" },
      { title: "Capability", subtitle: "Dispatcher injection, withContext, and GlobalScope.launch (as a deliberately never-awaited detached Job) all execute in the CodeDo runner and are verified against it" }
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
    explanation: "The task runner owns both Deferred children through coroutineScope, retrieves each result with await, and assembles the final value explicitly. The delays suggest independent work, but the only output guarantee comes from awaiting named results and adding them—not from guessing which child completes first.",
    keyIdeas: [{ number: 1, title: "Own every task", description: "Keep child work inside coroutineScope or another intentional structured owner." }, { number: 2, title: "Choose the right builder", description: "Use async for returned values and launch for side effects." }, { number: 3, title: "Assemble deterministically", description: "Await named results and build output in the required order." }, { number: 4, title: "Handle failure deliberately", description: "Use ordinary scope for fail-as-a-unit work or supervision for intentionally independent results." }],
    keyTakeaway: "A reliable task runner makes ownership, result order, context, and failure policy explicit."
  },
  explore: {
    title: "Explore the Concept",
    subtitle: "Seven integration scenarios combine ownership, builders, ordering, context, and failure policy.",
    cards: [
      { id: "world-16-boss-explore-1", number: "01", title: "Combine owned values", language: 'Kotlin', subtitle: "coroutineScope returns an assembled result", code: ["import kotlinx.coroutines.*", "suspend fun total() = coroutineScope {", "    val first = async { 20 }", "    val second = async { 22 }", "    first.await() + second.await()", "}", "fun main() = runBlocking { println(total()) }"], whatItMeans: [{ label: 'Output', description: "42" }], whatChanged: "Both values remain owned until the combined result is returned." },
      { id: "world-16-boss-explore-2", number: "02", title: "Select async context", language: 'Kotlin', subtitle: "dispatcher context and result retrieval are separate", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val task = async(Dispatchers.Default) { \"cpu\" }", "    println(task.await())", "}"], whatItMeans: [{ label: 'Output', description: "cpu" }, { label: 'Boundary', description: "The editor models context metadata, not a real thread pool." }], whatChanged: "async now accepts an explicit supported context element." },
      { id: "world-16-boss-explore-3", number: "03", title: "Join a side effect", language: 'Kotlin', subtitle: "launch completion precedes the dependent read", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    var saved = false", "    val job = launch { saved = true }", "    job.join()", "    println(saved)", "}"], whatItMeans: [{ label: 'Output', description: "true" }], whatChanged: "launch is used for a side effect and join establishes completion." },
      { id: "world-16-boss-explore-4", number: "04", title: "Preserve result order", language: 'Kotlin', subtitle: "await named tasks in output order", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val first = async { delay(2); \"A\" }", "    val second = async { delay(1); \"B\" }", "    println(first.await() + \",\" + second.await())", "}"], whatItMeans: [{ label: 'Output', description: "A,B" }], whatChanged: "Explicit assembly—not delay duration—determines the printed order." },
      { id: "world-16-boss-explore-5", number: "05", title: "Fail as one unit", language: 'Kotlin', subtitle: "ordinary scope propagates child failure", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    try { coroutineScope { async<Int> { throw IllegalStateException(\"x\") } } }", "    catch (e: IllegalStateException) { println(\"failed\") }", "}"], whatItMeans: [{ label: 'Output', description: "failed" }], whatChanged: "The task group has an all-or-fail policy." },
      { id: "world-16-boss-explore-6", number: "06", title: "Keep independent fallback", language: 'Kotlin', subtitle: "supervision isolates an expected failed result", code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    supervisorScope {", "        val good = async { \"A\" }", "        val bad = async<String> { throw IllegalStateException(\"x\") }", "        val fallback = try { bad.await() } catch (e: IllegalStateException) { \"fallback\" }", "        println(good.await() + \",\" + fallback)", "    }", "}"], whatItMeans: [{ label: 'Output', description: "A,fallback" }], whatChanged: "The two results are intentionally independent and each is handled." },
      { id: "world-16-boss-explore-7", number: "07", title: "Return from IO context", language: 'Kotlin', subtitle: "withContext returns its block value", code: ["import kotlinx.coroutines.*", "suspend fun load() = withContext(Dispatchers.IO) { \"loaded\" }", "fun main() = runBlocking { println(load()) }"], whatItMeans: [{ label: 'Output', description: "loaded" }, { label: 'Boundary', description: "No real IO thread switch is claimed." }], whatChanged: "Context choice remains explicit without controlling result assembly." }
    ]
  },
  predict: {
    title: "What will this code do?",
    subtitle: "Reason across ownership, builder choice, deterministic assembly, context, and failure policy.",
    questions: [
      { id: "world-16-boss-predict-1", questionNumber: 1, totalQuestions: 7, title: "Combined result", topicMeta: "output", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val a = async { 6 }", "    val b = async { 7 }", "    println(a.await() * b.await())", "}"], prompt: "What is printed?", options: [{ id: "A", label: "13", isCorrect: false }, { id: "B", label: "42", isCorrect: true }, { id: "C", label: "Deferred", isCorrect: false }, { id: "D", label: "Nothing", isCorrect: false }], explanation: { codeRef: "Combined result", detail: "Both Deferred values are retrieved before multiplication." } },
      { id: "world-16-boss-predict-2", questionNumber: 2, totalQuestions: 7, title: "Builder choice", topicMeta: "design", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// A child must calculate and return a String to its owner."], prompt: "Which builder/result pair fits?", options: [{ id: "A", label: "launch and cancel", isCorrect: false }, { id: "B", label: "launch and joinToString", isCorrect: false }, { id: "C", label: "async and await", isCorrect: true }, { id: "D", label: "delay and join", isCorrect: false }], explanation: { codeRef: "Builder choice", detail: "async represents a future value and await retrieves it." } },
      { id: "world-16-boss-predict-3", questionNumber: 3, totalQuestions: 7, title: "Output order", topicMeta: "ordering", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    val a = async { delay(2); \"A\" }", "    val b = async { delay(1); \"B\" }", "    println(a.await() + b.await())", "}"], prompt: "What establishes the output AB?", options: [{ id: "A", label: "Default always finishes first.", isCorrect: false }, { id: "B", label: "delay creates alphabetical ordering.", isCorrect: false }, { id: "C", label: "The scheduler guarantees registration order.", isCorrect: false }, { id: "D", label: "The program explicitly assembles a before b.", isCorrect: true }], explanation: { codeRef: "Output order", detail: "Result assembly is deterministic even when completion timing is not." } },
      { id: "world-16-boss-predict-4", questionNumber: 4, totalQuestions: 7, title: "Owned completion", topicMeta: "ownership", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "fun main() = runBlocking {", "    coroutineScope { launch { println(\"child\") } }", "    println(\"done\")", "}"], prompt: "What is printed?", options: [{ id: "A", label: "child\ndone", isCorrect: true }, { id: "B", label: "done only", isCorrect: false }, { id: "C", label: "done\nchild is guaranteed", isCorrect: false }, { id: "D", label: "Job", isCorrect: false }], explanation: { codeRef: "Owned completion", detail: "coroutineScope waits for the owned launch before returning." } },
      { id: "world-16-boss-predict-5", questionNumber: 5, totalQuestions: 7, title: "Ordinary failure policy", topicMeta: "failure", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// One child fails inside an ordinary coroutineScope."], prompt: "Which policy applies?", options: [{ id: "A", label: "The failure is always ignored.", isCorrect: false }, { id: "B", label: "The scope fails and cancels remaining owned siblings.", isCorrect: true }, { id: "C", label: "Every child becomes global.", isCorrect: false }, { id: "D", label: "The failed value becomes null.", isCorrect: false }], explanation: { codeRef: "Ordinary failure policy", detail: "Ordinary structured concurrency treats the group as one failure unit." } },
      { id: "world-16-boss-predict-6", questionNumber: 6, totalQuestions: 7, title: "Independent results", topicMeta: "supervision", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "// Two intentionally independent Deferred results need separate handling."], prompt: "Which design is appropriate?", options: [{ id: "A", label: "GlobalScope and no await", isCorrect: false }, { id: "B", label: "A guessed delay before reading", isCorrect: false }, { id: "C", label: "supervisorScope plus explicit await handling", isCorrect: true }, { id: "D", label: "A handler that converts every Deferred to null", isCorrect: false }], explanation: { codeRef: "Independent results", detail: "Supervision isolates siblings, while await still exposes each result or failure." } },
      { id: "world-16-boss-predict-7", questionNumber: 7, totalQuestions: 7, title: "Dispatcher boundary", topicMeta: "context", language: 'Kotlin', code: ["import kotlinx.coroutines.*", "val task = async(Dispatchers.Default) { 42 }"], prompt: "What can this editor verify?", options: [{ id: "A", label: "A new OS thread is always created.", isCorrect: false }, { id: "B", label: "The CPU pool size is exactly four.", isCorrect: false }, { id: "C", label: "Execution switches to Android Main.", isCorrect: false }, { id: "D", label: "The context token is accepted and await returns 42; real scheduling is not verified.", isCorrect: true }], explanation: { codeRef: "Dispatcher boundary", detail: "The deterministic engine models context and value flow, not thread scheduling." } }
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
    title: "Keep Independent Results Available",
    subtitle: "An ordinary scope still fails as a unit after one Deferred failure is locally caught.",
    challengeNumber: 1,
    totalChallenges: 1,
    difficulty: "medium",
    bugType: "logic",
    bugLabel: "Coroutine-specific bug",
    brokenCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    try {\n        coroutineScope {\n            val good = async { \"A\" }\n            val bad = async<String> { throw IllegalStateException(\"x\") }\n            val fallback = try { bad.await() } catch (e: IllegalStateException) { \"fallback\" }\n            println(good.await() + \",\" + fallback)\n        }\n    } catch (e: IllegalStateException) { println(\"scope failed\") }\n}",
    fixedCode: "import kotlinx.coroutines.*\nfun main() = runBlocking {\n    supervisorScope {\n        val good = async { \"A\" }\n        val bad = async<String> { throw IllegalStateException(\"x\") }\n        val fallback = try { bad.await() } catch (e: IllegalStateException) { \"fallback\" }\n        println(good.await() + \",\" + fallback)\n    }\n}",
    expectedOutput: "A,fallback",
    hints: [
      "The good and bad tasks represent intentionally independent results.",
      "Catching bad.await() does not change ordinary coroutineScope's fail-as-a-unit policy.",
      "Use supervisorScope while keeping explicit await handling for the failed Deferred."
    ],
    explanation: "The broken version prints A,fallback and then reports scope failed because ordinary coroutineScope propagates the child failure. The supervised version preserves the handled fallback and ends after A,fallback."
  },
  mastered: {
    topicTitle: "Concurrent Task Runner",
    summary: "You can build an owned task runner with deliberate builder choice, deterministic result assembly, explicit context, and an intentional failure policy.",
    passedCount: "7 / 7 PASSED",
    verificationItems: [
      { title: "Structured ownership", subtitle: "every task remains inside an explicit owner" },
      { title: "Builder choice", subtitle: "async returns values; launch performs side effects" },
      { title: "Deterministic output", subtitle: "named results are awaited and assembled explicitly" },
      { title: "Context", subtitle: "supported dispatcher tokens flow into async tasks" },
      { title: "Failure policy", subtitle: "ordinary and supervised groups are chosen deliberately" }
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
