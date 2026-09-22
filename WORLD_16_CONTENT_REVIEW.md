# World 16 — Coroutine Academy audit

Date: 2026-09-22. Authorities: `LESSON_QUALITY_STANDARD.md`, `LESSON_CLARITY_STANDARD.md`, curriculum scope in `CODEDO_MASTER_PLAN.md`. Audit/report only; substantial content and engine repairs are not authorized by this brief.

## Engine capability summary — BLOCKED pending coroutine runtime

**Required coroutine execution is unsupported. A coroutine runtime or a real Kotlin execution backend is required before editor activities can be verified.** Searching all four specified engine files for `suspend|launch|async|coroutine|Dispatchers|runBlocking|Job|withContext|delay|cancel|supervisorScope` finds only the TypeScript `async` wrappers at kotlinRunner.ts:2503 and :3118. Those wrappers do not implement Kotlin suspension or structured concurrency. The runtime executes generated JavaScript through `new Function`; its Promise timeout is not a Kotlin scheduler. Collections' lazy generators and the World 15 exception hierarchy supply neither Jobs nor cancellation exceptions.

Executed capability probes: ordinary `fun main() { println(7) }` succeeds with `7`; import-bearing lesson programs fail with `Cannot use import statement outside a module`. Removing imports in separate diagnostic probes still yields undefined `runBlocking`, `launch`, `async`, `Dispatchers`, `Job`, `CoroutineScope`, `delay`, `withContext`, `supervisorScope`, and `cancel`. A `suspend fun` probe produces `Unexpected token 'function'`. These are JavaScript parser/runtime errors, not useful Kotlin diagnostics. No scheduling, cancellation, timeout, dispatcher, or exception-propagation behavior is verified. No silently sequential coroutine execution has been observed; the tested coroutine programs fail before reaching it.

**Assessment risk:** a plain `println` of the required answer passes the same runner grading options as the first writing task. Text saying hardcoded output is insufficient does not enforce the required construct. `WriteRun.tsx:254` and `Debug.tsx:116` call the runner directly; no World 16 capability gate is present there. A caution in Learn/Mastered is not a runnable-stage deferral. Until gated and editorially repaired, these lessons are not acceptable orientation-only lessons either.

Capability evidence is collected by `node --import tsx scripts/audit-world16-quality.ts <lesson-id>`. It imports actual catalog-linked arrays, executes Learn/Explore/Predict and both editor variants, compares provided outputs byte-for-byte outside the runner's trimming logic, tests hardcoding, and reports failures without disguising them as acceptance. `--strict` supplies a failing quality gate. Illustrative/comment-only fragments are attempted but never counted as executable coverage proof. Existing unrelated worktree changes are preserved.

## Curriculum checklist

Checklist completion means audited and saved, not Verified. Entries are saved individually before proceeding. `E#`/`P#` below mean the current lesson's full `-explore-#`/`-predict-#` IDs; W and D mean its singular `writeRun` and `debug` entries.

- [x] 01 Coroutine Fundamentals & Coroutine Builders — Blocked by capability; changes required
- [x] 02 launch & async — Blocked by capability; changes required
- [x] 03 await & Suspending Functions — Blocked by capability; changes required
- [ ] 04 suspend & Coroutine Context — Not audited
- [ ] 05 Dispatchers & Jobs — Not audited
- [ ] 06 Cancellation & Cooperative Cancellation — Not audited
- [ ] 07 Structured Concurrency — Not audited
- [ ] 08 coroutineScope — Not audited
- [ ] 09 supervisorScope — Not audited
- [ ] 10 Exception Handling in Coroutines — Not audited
- [ ] 11 Coroutine Best Practices — Not audited
- [ ] 12 Boss: Concurrent Task Runner — Not audited

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
