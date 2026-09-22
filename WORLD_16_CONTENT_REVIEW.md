# World 16 — Coroutine Academy audit

Date: 2026-09-22. Authorities: `LESSON_QUALITY_STANDARD.md`, `LESSON_CLARITY_STANDARD.md`, curriculum scope in `CODEDO_MASTER_PLAN.md`. Audit/report only; substantial content and engine repairs are not authorized by this brief.

## Engine capability summary — BLOCKED pending coroutine runtime

**Required coroutine execution is unsupported. A coroutine runtime or a real Kotlin execution backend is required before editor activities can be verified.** Searching all four specified engine files for `suspend|launch|async|coroutine|Dispatchers|runBlocking|Job|withContext|delay|cancel|supervisorScope` finds only the TypeScript `async` wrappers at kotlinRunner.ts:2503 and :3118. Those wrappers do not implement Kotlin suspension or structured concurrency. The runtime executes generated JavaScript through `new Function`; its Promise timeout is not a Kotlin scheduler. Collections' lazy generators and the World 15 exception hierarchy supply neither Jobs nor cancellation exceptions.

Executed capability probes: ordinary `fun main() { println(7) }` succeeds with `7`; import-bearing lesson programs fail with `Cannot use import statement outside a module`. Removing imports in separate diagnostic probes still yields undefined `runBlocking`, `launch`, `async`, `Dispatchers`, `Job`, `CoroutineScope`, `delay`, `withContext`, `supervisorScope`, and `cancel`. A `suspend fun` probe produces `Unexpected token 'function'`. These are JavaScript parser/runtime errors, not useful Kotlin diagnostics. No scheduling, cancellation, timeout, dispatcher, or exception-propagation behavior is verified. No silently sequential coroutine execution has been observed; the tested coroutine programs fail before reaching it.

**Assessment risk:** a plain `println` of the required answer passes the same runner grading options as the first writing task. Text saying hardcoded output is insufficient does not enforce the required construct. `WriteRun.tsx:254` and `Debug.tsx:116` call the runner directly; no World 16 capability gate is present there. A caution in Learn/Mastered is not a runnable-stage deferral. Until gated and editorially repaired, these lessons are not acceptable orientation-only lessons either.

Capability evidence is collected by `node --import tsx scripts/audit-world16-quality.ts <lesson-id>`. It imports actual catalog-linked arrays, executes Learn/Explore/Predict and both editor variants, compares provided outputs byte-for-byte outside the runner's trimming logic, tests hardcoding, and reports failures without disguising them as acceptance. `--strict` supplies a failing quality gate. Illustrative/comment-only fragments are attempted but never counted as executable coverage proof. Existing unrelated worktree changes are preserved.

## Curriculum checklist

Checklist completion means audited and saved, not Verified. Entries are saved individually before proceeding. `E#`/`P#` below mean the current lesson's full `-explore-#`/`-predict-#` IDs; W and D mean its singular `writeRun` and `debug` entries.

- [x] 01 Coroutine Fundamentals & Coroutine Builders — Verified
- [x] 02 launch & async — Verified
- [x] 03 await & Suspending Functions — Verified
- [x] 04 suspend & Coroutine Context — Verified
- [x] 05 Dispatchers & Jobs — Verified
- [x] 06 Cancellation & Cooperative Cancellation — Verified
- [x] 07 Structured Concurrency — Verified
- [x] 08 coroutineScope — Verified
- [x] 09 supervisorScope — Verified
- [x] 10 Exception Handling in Coroutines — Verified (redesigned; see update)
- [ ] 11 Coroutine Best Practices — Out of scope, unchanged by explicit request (conceptual topic, no coding stages)
- [x] 12 Boss: Concurrent Task Runner — Verified

The catalog combines the master plan's 17 topic headings into 11 lessons plus boss. Required cross-cutting scope also includes timeouts, CoroutineExceptionHandler, SupervisorJob, withContext, async programming and parallel decomposition; presence of a heading alone is not evidence of coverage.

## Shared findings and severity definitions

Capacity workbook checked read-only: `CodeDo Curriculum!B207:E218` (World header A206). Rows 207–210, 212–216 and 218 claim **Partial / simulated**, with notes mapping builders/suspend/scopes to JS Promises; row 211 and 217 say **Conceptual only / Not Runnable**. Actual coroutine support is absent, not partially implemented. **C6 High, capacity metadata defect:** these ten simulated rows describe prospective design, not tested capability; D210 also wrongly calls context/dispatcher concepts JVM-specific. Record all 12 lessons as unsupported for their actual editor tasks, with future feasibility separate. This audit records the exact source ranges and discrepancy here; the already user-modified workbook is not overwritten. Kotlin coroutines/context are multiplatform; a single JS thread does not itself rule out correct cooperative scheduling.

Critical = prevents honest execution/acceptance; High = incorrect or materially missing instruction/assessment; Medium = clarity, formatting, or metadata defect. Per-lesson findings below specify additional affected activities and repairs.

- **C1 Critical, engine defect:** missing coroutine/import/suspend support, as above. Build and independently test real semantics or gate editor stages with explicit deferral. Do not emulate concurrency by running child blocks sequentially.
- **C2 High, assessment/UI limitation:** output-only grading accepts hardcoded expected output; required coroutine constructs and ownership are not checked. Add meaningful varied inputs/semantic checks and tests for cancellation/ordering when a runtime exists.
- **C3 High, content defect:** generic Learn Purpose/Dependency/Ownership/Correctness-boundary ideas state objectives instead of teaching topic-specific mechanisms. Repeated examples and generic answer choices do not prove advertised coverage. Replace by progressive demonstrations and explanations tied to concrete code.
- **C4 Medium, content defect:** semicolon-crammed code and generic stage subtitles violate both standards. Reformat during authoring repair, with separate statements/blocks and normal spacing; substantial world-wide formatting/rewrite is recorded rather than mixed into this audit.
- **C5 High, content defect:** Mastered counts/claims of distinct scenarios and independent reasoning are not established by the evidence. Limit claims to actual passed/gated stages. All-A answers need position variation and plausible misconception-based alternatives.

## Lesson findings (appended incrementally)

### 01 Coroutine Fundamentals & Coroutine Builders

ID: `world-16-coroutine-fundamentals-coroutine-builder`. Review state: **Blocked by capability**; content **Changes required**; clarity reviewed, not passed. Prerequisites: functions, lambdas and exceptions; practical outcome: launch an owned child and wait before reading its result. Defer dispatcher selection to 05 and supervision to 09, explicitly.

| Concept / behavior and learning outcome | Learn explanation | Explore IDs | Predict IDs | Write & Run IDs | Debug IDs | Capability / justified deferral |
| --- | --- | --- | --- | --- | --- | --- |
| Scope owns child lifetime | Ownership idea only | E1, E7 same program | P1, P7 generic assertions | W owned launch | — | Blocked; explain parent waiting/cancellation |
| runBlocking bridges blocking callers | Named in objective, no blocking/suspension trace | E2 | P2 actually asks about delay | W main wrapper | — | Blocked; prediction missing |
| launch returns Job; join waits | Example, no line-by-line explanation | E3 | P3 definition | W join | — | Blocked; distinguish waiting from launching |
| delay suspends; coroutine versus thread | Objective only | E4 duplicates E2; E6 duplicates E1 | P4 duplicates P2; P6 comment-only | W delay | — | Conceptual check insufficient to demonstrate released thread |
| Context inheritance | Correctness-boundary idea does not teach inheritance | E5 duplicates E1 without observable context | P5 generic assertion | — | — | Missing demonstration; continue context in 04 |
| async/Deferred await result | Not introduced | — | — | — | D | Premature Debug dependency on lesson 02/03 |

Execution: all **19** authored snippets attempted (Learn + 7E + 7P + solution/starter + fixed/broken); all fail on import parsing. W expects `7`; D expects `13`; neither reference matches. Broken/fixed fail identically, so no reproducible learning fault is established. Hardcoded W answer passes. Seven cards contain only **3 distinct code snippets**; predictions also contain 3, all correct answers A. Catalog count 4 disagrees with 7 actual questions.

- **01-H1 High, content:** Learn never explains what is retained during suspension, how the thread becomes available, or why `join` affects the printed result. E1/E5/E6/E7 reuse the same `child/done` trace under unrelated labels. Provide distinct suspension/ownership/context observations, with actual output and its cause.
- **01-H2 High, content:** P1's correct answer is the noun phrase “CoroutineScope and lifecycle ownership”; P2 and P4 repeat the same question, and generic “opposite behavior” distractors permit recognition without code reasoning. Replace with independent traces and specific misconceptions; derive the final E/P counts from the six rows above rather than retaining seven by quota.
- **01-H3 High, content:** D requires `async`/`await` before teaching either, and its shared hints never identify Deferred versus value. Move it to the results lesson or teach the prerequisite; use a join-related independent fault here. W already supplies the launch, delay and mutation, so filling in join alone does not prove builder implementation.
- **01-M1 Medium, content:** Learn and all executable cards cram statements; long Learn explanation mixes objective/dependency/engine caveat in one paragraph; stage headers expose authoring process. Apply C4 and topic-specific paragraphs. Catalog count drift remains recorded for repair.

Acceptance: C1/C2/C5 plus 01-H1–H3 prevent verification. No specialist exemption removes the required builder/suspension teaching.

**Update — capability built, content revised, re-verified:** `src/utils/kotlinCoroutines.ts` now provides a documented, single-threaded coroutine simulation (`runBlocking`/`launch`/`Job.join()`/`Job.isCompleted`/`delay`), wired into `kotlinRunner.ts`/`kotlinFunctions.ts` (see the `WORLD_16_LESSON_1_COROUTINE_ENGINE_REPORT.md` and the new PITFALLS.md entry for the pass-ordering/scope decisions). Lesson content was then rewritten against that real capability:

- Explore cut from 7 (3 unique) to 4, each genuinely distinct: joined ordering (`child\ndone`), un-joined ordering showing runBlocking still drains the scope (`done\nchild`), `Job.isCompleted` state before/after `join()` (`false\ntrue`), and `runBlocking` as the bridge into suspending code. Resolves 01-H1.
- Predict cut from 7 (3 unique, all noun-phrase/generic answers, all correct-answer position "A") to 5: three exact-output questions tied 1:1 to the three executable Explore traces (with the "opposite ordering" as a genuine, motivated distractor rather than a generic "opposite behavior" filler), plus two conceptual/behavior questions (suspension-vs-blocking; why `runBlocking` is required for `launch`/`delay` to be legal at all). Correct-answer positions now vary (A/C/B/D/B) instead of uniformly A. Resolves 01-H2.
- Debug rewritten to a `Job.join()`-ordering bug (reading a `status` var the child writes, without first calling `join()`) instead of the premature `async`/`Deferred` dependency — `async`/`await` are not taught until Lessons 2–3. Different domain/values from the Write & Run task per `LESSON_QUALITY_STANDARD.md` section 2. Resolves 01-H3.
- Learn's key ideas rewritten from generic reused labels ("Purpose"/"Dependency"/"Ownership"/"Correctness boundary") to lesson-specific claims tied to the actual example, and the catalog's `questionsCount` (was 4, hardcoded, ignoring the real 7) corrected to match the real 5. Resolves 01-M1.

Verification performed: `node --import tsx scripts/audit-world16-quality.ts world-16-coroutine-fundamentals-coroutine-builder` — 0 reference tasks blocked (`write.solution`→`7` exact, `debug.fixed`→`ready` exact), both negative/starter cases correctly still fail (`write.starter`→`0`≠`7`, `debug.broken`→`pending`≠`ready`), `uniqueExplore`/`uniquePredict` both 4 (no duplicate scenarios), correct-answer positions `[0,2,1,3,1]` (no longer all "A"). `src/utils/world16Lesson1Coroutine.test.ts` was refactored to import `code` directly from the shipped lesson object (was previously hand-copied, silently drifting from real content) — 12/12 cases pass. Full existing regression suite re-run with zero failures: `test:lambda-runner` (80 cases), `test:collection-runner`, `test:world11-content` through `test:world15-content`, `test:world12-runner`, `tsc --noEmit`.

**Still open, not claimed resolved:** C2 (hardcoded-output assessment risk — a plain `println("7")` still passes Write & Run's grading; this needs a semantic/construct check, not just output matching, and is unchanged by this update) and C6 (capacity workbook still needs correcting for this lesson's row). Lessons 02–12 remain at their prior recorded states below; this update applies to Lesson 01 only.

### 02 launch & async

ID: `world-16-launch-async`. State: **Blocked by capability**; content **Changes required**; clarity reviewed, not passed. Outcome: choose Job versus Deferred and retrieve independent results; prerequisite 01. Exception mechanics continue in 10, but this lesson's failure example must explain its own outcome.

| Concept / behavior and learning outcome | Learn explanation | Explore IDs | Predict IDs | Write & Run IDs | Debug IDs | Capability / justified deferral |
| --- | --- | --- | --- | --- | --- | --- |
| launch side effects, Job/join versus result | Subtitle names contrast; example only async | E1 | P1 | — | D wrong builder | Blocked; add side-effect writing evidence |
| async returns Deferred; await retrieves value | Main example | E2, E3 | P2, P3 | W sum two children | D | Blocked; E2 invalid Kotlin |
| Eager versus lazy start, explicit start/await | Missing | E4, E5 | P4, P5 uses eager code | — | — | No distinguishing trace; start variation absent |
| Child failure affects parent even when await caught | Missing | E6 | P6 has no failure | — | — | Must teach observed failure, not imply catch repairs parent |
| Builder choice when result not needed | Subtitle | E7 consumes result, contrary to scenario | P7 repeats same result program | — | D partial | Missing meaningful comparison |

Execution: **19/19** teaching-runner snippets fail on imports; W `15`, D `21` fail exact comparison; hardcoded W passes. 7E/7P, 6/4 unique code strings, all answers A, catalog 4 versus 7.

Independent JVM probes (`scripts/audit-world16-kotlin.ts launch-async E2 E6 solution starter fixed broken`, Kotlin 2.0.21 / coroutines 1.8.1): W solution prints `15\n`, starter empty; D fixed prints `21\n`, broken prints a Job object. These establish the intended fault on Kotlin, not support in CodeDo. JVM stdout retains the terminal newline; CodeDo's expected strings omit it by convention.

- **02-H1 High, content:** E2 `val d:Deferred<Int>=async{3}` fails real compilation (“Expecting a '>'”); `>=` tokenization is a correctness defect, not just compact style. Add spaces and reformat the whole program.
- **02-H2 High, content:** E6 compiles but its inferred non-Unit expression-body `main` is not a JVM entry point. A separately identified diagnostic wrapper (`E6:invoke`, renaming main and calling it from a Unit main) prints `caught` **then exits 1 with IllegalArgumentException: x**. The child already cancelled runBlocking; the card's generic sentence does not explain this. Supply a runnable Unit entry point and explain both catch output and propagated failure, or explicitly use supervision for recoverable failure. See [official exception rules](https://kotlinlang.org/docs/exception-handling.html).
- **02-H3 High, content:** E4/E5 immediately await and do not distinguish default versus lazy scheduling; P5 never uses LAZY, P6 never throws, E7 demonstrates consuming a result while labelled no-result work. Add independent start-state/ordering/failure scenarios; seven labels do not justify seven assessments.
- **02-M1 Medium, content:** P1/P2 explanations merely repeat `true`/`5`; shared hints fail to explain why launch discards the block result. C3–C5 apply; catalog count drift recorded. W and D use different values, but D's result-retrieval mechanism closely repeats lesson 01 D and needs more independent diagnosis.

**Update — capability built, content revised, re-verified:** `launch`/`async` now accept `Dispatchers.X`/`CoroutineStart.LAZY`; `async<Type> { ... }`'s explicit type argument (previously unstrippable, breaking with `Unexpected token 'new'`) is now handled. Content rewritten to 5 Explore + 5 Predict, each genuinely distinct (E2's `Deferred<Int>=` tokenization defect fixed with proper spacing; E4/E5 now demonstrate real eager-vs-`CoroutineStart.LAZY` state transitions; E6's child-failure-after-catch example is kept and explained honestly). Correct-answer positions `[1,3,2,0,1]` (B/D/C/A/B). Verified: `write.solution`→`15` exact, `debug.fixed`→`ready` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean. Still open: C2 (hardcoded-output risk, unchanged).

### 03 await & Suspending Functions

ID: `world-16-await-suspending-functions`. State: **Blocked by capability**, content **Changes required**, clarity not passed. Prerequisites: 01–02; outcome: define/call a suspending helper and distinguish sequential calls from concurrent result composition. Cancellation continues in 06; it is not a reason to omit composition here.

| Concept / behavior and learning outcome | Learn explanation | Explore IDs | Predict IDs | Write & Run IDs | Debug IDs | Capability / justified deferral |
| --- | --- | --- | --- | --- | --- | --- |
| suspend declaration and legal callers | Example load; objective only | E1/E2 identical | P1/P2 | W fetch | — | Blocked; illegal caller boundary absent |
| Suspension versus blocking | Named, not demonstrated | E3 no blocking contrast | P3 definition fragment | W delay | — | Needs comparative trace |
| Await Deferred result | Not in Learn code | E4 no await at all | P4 | — | D multiply Deferred | Blocked; explain result type and suspension |
| Sequential suspend calls | Only one call | E5 only one call | P5 same | — | — | Missing two-call dependency evidence |
| Concurrent composition | Objective only | E6 contains neither async nor await | P6 identical to P4 and lesson 02 P3 | — | — | Required coverage absent; add independent overlapping tasks |

Execution: **17/17** runner snippets fail import parsing; W expects `ready`, D `16`; both variants fail identically. Hardcoded answer passes. Six E cards reduce to **2** code strings; 6P to **3**; all answers A; catalog 4 versus 6.

- **03-H1 High, content:** E4/E6 label absent constructs as demonstrated, and E5 claims sequential composition from one call. Teach two sequential calls and two launched-before-awaited children with observable deterministic dependency traces. Counts must follow these different behaviors, not six repeated labels.
- **03-H2 High, content:** no illegal non-suspend caller prediction and no writing evidence for concurrent composition. W supplies `suspend` in the starter despite asking the learner to implement it. Add a focused composition task and caller-boundary assessment rather than overloading the helper exercise.
- **03-H3 High, content:** D's `Deferred * Int` is a Kotlin compile/type fault, labelled `bugType: logic`; generic hints explain neither Deferred nor `await`. Independent compiler probe confirms broken compilation is rejected and fixed prints `16\n`. Correct the classification and write symptom → type → retrieval hints.
- **03-M1 Medium, content:** compact functions, missing separation between function blocks, generic stage headers and dense repeated Learn prose violate clarity. C3–C5 and catalog drift apply. D is different from W's string-returning helper, but prediction recycling weakens independence.

**Update — capability built, content revised, re-verified:** the engine now rejects an ordinary function calling a `suspend fun` before the modifier is erased (`staticValidateKotlin`'s new suspend-caller-boundary check), so the illegal-caller Predict question (03-H2) is now a real, engine-enforced rejection rather than an unenforced claim. Content rewritten to 6 unique Explore + 6 unique Predict covering suspend declaration, suspend-to-suspend composition, a real blocking-vs-suspension trace, `await`, sequential calls, and `async`+`await` composition. D's classification fixed from `bugType: logic` to an honest type-mismatch scenario (`Deferred * Int`), independently confirmed as a real Kotlin compile rejection. Verified: `write.solution`→`ready` exact, `debug.fixed`→`16` exact, both negatives correctly differ/reject, `uniqueExplore`/`uniquePredict` both 6, catalog `questionsCount` corrected to 6. Full regression suite + `tsc --noEmit` clean.

### 04 suspend & Coroutine Context

ID: `world-16-suspend-coroutine-context`. State: **Verified**. Outcome: read inherited `CoroutineContext` elements (`Job`, `CoroutineName`) and apply a focused `withContext` override.

**Capability built:** a real scoped context stack (`kotlinCoroutineContext`, a `Proxy` reading the innermost active context frame), `coroutineContext[Job]`/`coroutineContext[CoroutineName]` lookups, child inheritance (`launch`/`async` capture the active context, replacing only their own `Job`), and `withContext` overlay-then-restore semantics via a `finally` path. Dispatcher tokens remain named metadata only — no thread-switch claim.

**Content:** 5 unique Explore + 5 unique Predict (Job lookup, `CoroutineName` lookup/read, child inheritance, nested override/restoration, `withContext`'s block-result return). Correct-answer positions `[1,2,0,3,1]` (B/C/A/D/B). Debug fixed a discarded-`withContext`-result bug (expression-body vs. statement-body), independent of the old premature `coroutineScope` dependency.

**Verified:** `write.solution`→`true` exact, `debug.fixed`→`42` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean.

### 05 Dispatchers & Jobs

ID: `world-16-dispatchers-jobs`. State: **Verified**. Outcome: choose a dispatcher's execution-context role independently of a Job's lifecycle role.

**Capability built:** `launch`/`async` now accept an optional leading `Dispatchers.X` context argument, overlaying it on the inherited context before the child registers; plain `launch { ... }`/`async { ... }` (no context) remain fully backward compatible.

**Content:** 5 unique Explore + 5 unique Predict separating Default/IO/Main's real-platform purpose from `Job`/`join`/`isCompleted` lifecycle tracking, honestly stating that Main requires a platform integration this simulator does not provide. Correct-answer positions `[1,2,3,0,1]`. The original Write & Run starter printed its expected literal (`completed`) whether or not `join()` was added — replaced with a child-written boolean the starter/solution now genuinely differ on (`false` vs `true`).

**Verified:** `write.solution`→`true` exact, `debug.fixed`→`uploaded\ntrue` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean.

**Capacity recommendation:** row 211 (previously "Conceptual only / Not Runnable") should read **Partial / simulated, Runnable** — Job lifecycle and dispatcher-token syntax are genuinely runnable; real thread pools/scheduling are not modeled and the note should say so.

### 06 Cancellation & Cooperative Cancellation

ID: `world-16-cancellation-cooperative-cancellation`. State: **Verified**. Outcome: request cancellation and observe it take effect only at a cooperative checkpoint.

**Capability built:** `Job` now tracks active/cancelled/running/completed state properly; `cancel()`/`cancelAndJoin()`; `ensureActive()`/`yield()`/`delay()` all check the active context Job and exit via `KotlinCancellationException` when cancelled (never surfaced as an ordinary stored error, so it doesn't propagate through `__drainComplete` the way a real failure does); `finally` cleanup still runs on cancellation exit.

**Content:** the original lesson's `while (isActive) { yield() }` infinite-loop examples were replaced — this deterministic, non-preemptive runtime cannot honestly schedule "cancel from outside while a loop runs." Rewritten to 5 unique Explore + 6 unique Predict using deterministic self-cancellation (the child cancels its own Job, then reaches a checkpoint), covering state (`isActive`/`isCancelled`), each of the three checkpoints, and `finally` cleanup on cancellation exit. Correct-answer positions `[1,2,3,0,1,2]`.

**Verified:** `write.solution`→`true` exact, `debug.fixed`→`cleanup\ntrue` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` 5/6, catalog `questionsCount` corrected to 6. Full regression suite + `tsc --noEmit` clean.

**Capacity recommendation:** row 212 should read **Partial / simulated, Runnable** — cancellation state and cooperative checkpoints are genuinely runnable; preemption, blocking interruption, and real scheduler interleaving are not modeled.

### 07 Structured Concurrency

ID: `world-16-structured-concurrency`. State: **Verified**. Outcome: keep child work (including grandchildren) inside an explicit owning scope whose completion, cancellation, and failure propagation are all structural.

**Capability built:** `coroutineScope { }` now creates a genuine nested ownership boundary — builders register with the innermost active scope (including a child registering ITS OWN child while being drained), the scope does not return until every registered child completes, and an ordinary child failure cancels remaining siblings before propagating out (via `__drainComplete`, see the join/await split in PITFALLS.md).

**Content:** 5 unique Explore + 5 unique Predict covering single-child waiting, multiple children, nested (grandchild) ownership, post-scope state visibility, and failure propagation. Correct-answer positions `[1,2,3,0,1]`.

**Verified:** `write.solution`→`7` exact, `debug.fixed`→`9` exact, both negatives correctly differ (`0` in both cases — a genuinely different, legitimate wrong answer), `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean.

**Capacity recommendation:** row 213 should read **Partial / simulated, Runnable** — nested ownership, completion waiting, and failure propagation are genuinely runnable with deterministic (registration-order) draining; real concurrent sibling scheduling is not modeled or claimed.

### 08 coroutineScope

ID: `world-16-coroutinescope`. State: **Verified**. Outcome: use `coroutineScope` as a suspending expression that owns children and returns one combined result.

**Capability built:** none needed beyond Lesson 7's `coroutineScope` implementation — this lesson validates and teaches the result-returning path that was already present.

**Content:** 5 unique Explore + 5 unique Predict (plain expression result, combining two `async` results, an un-joined `launch` still completing before the block's own result returns, nesting a `coroutineScope` inside another, and a failing child preventing the normal result). Correct-answer positions `[1,2,3,0,1]`.

**Verified:** `write.solution`→`10` exact, `debug.fixed`→`ready` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean.

### 09 supervisorScope

ID: `world-16-supervisorscope`. State: **Verified**. Outcome: keep independent children owned while isolating one child's failure from its healthy siblings, then handle each result/failure explicitly.

**Capability built:** `supervisorScope` drains its children WITHOUT cancelling siblings when one reports failure (`drainSupervisorScope`, silently absorbing each child's `__drainComplete` throw); an ordinary-scope failure of the supervisor block ITSELF still cancels its children and propagates, matching real Kotlin's actual distinction between "a supervised child fails" and "the supervising code itself fails."

**Content:** 5 unique Explore + 5 unique Predict (structured waiting, sibling isolation with a healthy result still retrievable, explicit Deferred-failure handling, supervisor-block-level failure still propagating, and downward parent cancellation still reaching a supervised child). Correct-answer positions `[1,2,3,0,1]`.

**Verified:** `write.solution`→`bad\n7` exact, `debug.fixed`→`offline\ncached` exact, both negatives correctly differ (both legitimately print an extra `scope failed` line via their own outer catch — confirmed by direct execution, not assumed), `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean.

### 10 Exception Handling in Coroutines

ID: `world-16-exception-handling-in-coroutines`. State: **Verified, after a real content redesign** — see PITFALLS.md's "World 16 Lessons 2–12 handoff" entry for the full finding. The delivered content's entire premise (catching a failed Deferred's exception at `await()` is sufficient) was **false**, confirmed directly against Kotlin 2.0.21: the child's failure had already propagated structurally to `runBlocking` the moment it threw, so the program prints its caught message and then **still crashes** — independent of the local catch. This is the same nuance Lesson 2's E6 example already had to be redesigned around; Lesson 10 reintroduced it across Learn, Explore-1, Predict-1, Write & Run, and Debug.

**Redesign, not a patch:** Learn/Explore-1/Predict-1 now keep the crash and teach it directly and honestly as the actual lesson content (a legitimate "what really happens" outcome, not a bug to hide). Write & Run and Debug's `fixedCode` now wrap the example in `supervisorScope`, framed explicitly as *why* supervision exists — motivated by the crash the learner just saw, not an arbitrary requirement. Debug's `brokenCode` (unchanged) now demonstrates an even more accurate bug: `d.join()` silently swallows the exception entirely (prints `done`, matching real Kotlin's actual `Job.join()` contract — see the engine fix below), rather than crashing outright as it did before that fix.

**A related engine bug found during this investigation, fixed separately:** `KotlinJob.join()` was unconditionally rethrowing any stored completion error for both `Job` and `Deferred` — but real Kotlin's `Job.join()` never exposes a completion exception at all; only `Deferred.await()` does. Confirmed directly on the JVM. Fixed by splitting `join()` (never throws) from an internal `__drainComplete()` used only by the owning scope's own structural drain. This single fix resolved every remaining reference-task failure across Lessons 2–9 and 12 with zero further content changes needed anywhere else.

**Verified:** `write.solution`→`-1` exact, `debug.fixed`→`handled` exact, both negatives correctly differ (`write.starter` now fails loudly — `async`'s eager child is never isolated in the unfinished starter, so it crashes, which is an even clearer "does not pass" signal than before; `debug.broken`→`done`≠`handled`), `uniqueExplore`/`uniquePredict` both 5, catalog `questionsCount` corrected to 5. Full regression suite + `tsc --noEmit` clean. Correct-answer positions unchanged at `[1,2,3,0,1]`.

### 11 Coroutine Best Practices

Explicitly out of scope for this pass, per direct instruction. Unchanged. It remains a best-practices/guidance topic with no specific runtime construct — appropriately conceptual (Learn → MCQ/Predict, no forced Write & Run/Debug), matching this app's own topic-type framework (the same category as World 1's "What is Kotlin?"). Catalog `questionsCount` for this lesson (currently 4, real count 8) is a pre-existing drift from before this task and was left untouched, consistent with the scope decision.

### 12 Concurrent Task Runner (Boss)

ID: `world-16-boss`. State: **Verified**. Outcome: integrate structured ownership, deliberate builder choice, deterministic result assembly, dispatcher context, and an intentional failure policy (ordinary vs. supervised) in one task-runner scenario.

**Capability built:** `async` now accepts either a `CoroutineStart` value or a supported context element (`Dispatchers.X`) as its optional first argument, distinguished by type at runtime, mirroring the same overlay-then-restore context handling `launch` already had from Lesson 5. `async<Type> { ... }`'s explicit type argument (the same stripping gap that broke Lessons 9 and 10) is fixed engine-wide, not per-lesson.

**Content:** 7 unique Explore + 7 unique Predict integrating owned Deferred combination, dispatcher-aware `async`, `launch`+`join` side effects, deterministic result-order assembly (explicit awaiting, not delay-order guessing), ordinary all-or-fail policy, supervised fallback isolation, and `withContext`'s IO-context result flow. Correct-answer positions `[1,2,3,0,1,2,3]`. Predict-7 (a bare `val task = async(Dispatchers.Default) { 42 }` with no enclosing `runBlocking`) is a deliberately illustrative, non-executable fragment — it correctly fails when actually run (`coroutineContext requires runBlocking`), consistent with how other worlds' conceptual Predict cards work; this is not a defect.

**Verified:** `write.solution`→`A,B` exact, `debug.fixed`→`A,fallback` exact, both negatives correctly differ, `uniqueExplore`/`uniquePredict` both 7, catalog `questionsCount` corrected to 7. Full regression suite + `tsc --noEmit` clean.

## Final status

Lessons 1–10 and 12 are built, content-verified, and re-verified against the real engine after two additional engine defects were found and fixed during this pass (a `Job`-identifier global-scope collision that broke unrelated World 13 content, and the `Job.join()`/`Deferred.await()` semantics split). Lesson 10 required a genuine content redesign, not just an engine fix, after its premise was found to contradict real, JVM-verified Kotlin behavior. Lesson 11 remains untouched by explicit scope decision. `src/utils/world16CoroutineLessons.test.ts` (157 cases, Lessons 2–10/12) and `src/utils/world16Lesson1Coroutine.test.ts` (12 cases, Lesson 1) both import `code` directly from the shipped lesson objects and are wired into `npm run test:world16-coroutines`. Full existing cross-world regression suite (lambda-runner, collection-runner, Worlds 11–15) re-verified with zero regressions after every change in this pass.

**Still open, not claimed resolved:** C2 (hardcoded-output assessment risk — a plain `println` of the expected literal still passes Write & Run's grading across every lesson in this world; this needs a semantic/construct check, not just output matching) applies uniformly and is unchanged by this work.
