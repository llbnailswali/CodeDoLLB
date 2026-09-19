# World 9 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress**.

## Scope and coverage plan

Reopened the previous “Audit completed” report. Read every stage of all 12 catalog-linked lessons in `world9LessonsData.ts`, including the shared factories. Excluded `world9_compose.ts`: its `WORLD_9_QUESTIONS` belongs to the legacy `ALL_CURRICULUM_QUESTIONS`/Drill pool, not Lambda Lab.

Baseline: 39 Explore, 39 Predict, 9 writing and 9 debugging tasks. The previous script did not assert Explore outputs and reported prediction defects without failing. It also omitted Learn execution. Baseline counts alone did not establish coverage.

Coverage is planned by behavior below. E/P suffixes refer to lesson-local activity IDs. Existing evidence is retained unless explicitly replaced; additions independently assess the named gap. Counts follow these behaviors rather than a quota.

| Lesson / outcome | Learn / existing E/P | Missing behavior to add | Writing / Debug decision | Boundary |
| --- | --- | --- | --- | --- |
| Lambda expressions | Parameters 0/1/2, last expression, closure; E/P1–5 | Mutating captured state; unused parameter | Keep creation; replace arithmetic Debug with an uninvoked callback | Destructuring with collections in World 10 |
| Anonymous functions | Block/expression bodies, filter callback; E/P1–4 | Guard-return prediction; inferred parameter/expression result | Keep formatter; Debug must test local return rather than input arithmetic | Receiver literals covered with function types |
| Function types | Multiple inputs, supplier, reassignment; E/P1–3 | Unit callback, nullable callable vs nullable result, receiver type | Keep explicit contract; Debug incompatible return type | Aliases in type-alias topic; suspend types World 16 |
| Higher-order functions | Accept/invoke, trailing/stored arguments; E/P1–3 | Return a closure; repeat a Unit callback | Writing returns configured behavior; Debug retains ignored policy fault | Generic algorithms World 12 |
| it | Map, method, predicate; E/P1–3 | Nested shadowing and explicit outer name | Keep implicit parameter writing; Debug wrong nested receiver | Collection APIs preview World 10; map supplies each element |
| Function references | Named/local reference, immediate invocation; E/P1–3 | Bound/unbound member and constructor references | Keep named formatter; Debug existing named reference | Reflection/property references deferred; extensions with extension topic |
| Returning from lambdas | Multiline, if, Boolean; E/P1–3 | when result and Unit-ending side effect | Keep final result writing; multiline wrong-result Debug | Labelled exits next lesson |
| Local returns | Implicit/explicit label, non-local; E/P1–3 | Explicit-label prediction with returned value | Keep focused skip/sum and early-exit Debug | Arbitrary nested control flow not certified |
| inline | Substitution, code size, non-local return; E/P1–3 | Compiler rejection when callback is not inline | Assess runtime return boundaries separately from JVM performance | Runtime simulation cannot prove allocation/bytecode claims; reified World 12 |
| noinline | Store, mixed callbacks; E/P1–3 | Returning callback for later invocation; actual invalid bare return | Existing reasoning classification reviewed, executable semantics need explicit evidence | Runtime behavior is supported; object-allocation guarantees not simulated |
| crossinline | Wrapped invocation, local returns; E/P1–3 | Actual forbidden bare-return prediction | Existing reasoning classification reviewed, executable semantics need explicit evidence | crossinline does not imply asynchronous execution |
| Boss | Invoke, composition, predicate count; E/P1–3 | Composition-order prediction; reference integration | Replace recycled single-operation Debug with one reversed-composition fault | Claim only practiced skills |

Final IDs/counts and verification results follow after execution. Browser QA and hardcode resistance are outside this pass; no Verified status is granted.

## Final activity map and task-scope audit

The lesson-local prefix is the catalog ID with `world-9-` removed; for example `function-types-explore-4`. Learn now uses topic-specific key ideas, with the new behavior explanations alongside the original syntax. Every lesson has one focused writing task and one independent single-fault Debug task. E/P additions carry the intermediate variations that do not need to be bundled into those tasks.

| Lesson prefix | Explore IDs | Predict IDs | Write & Run evidence | Debug fault |
| --- | --- | --- | --- | --- |
| lambda-expressions | 1–7 | 1–7 | Create an Int transformation | Reading a captured-state callback instead of invoking it |
| anonymous-functions | 1–5 | 1–6 | Declare a text-returning anonymous function | Guard evaluates zero without returning |
| function-types | 1–6 | 1–6 | Declare an explicit callable contract | Int body violates String result type |
| higher-order-functions | 1–5 | 1–5 | Return independently configured fee calculators | Ignores supplied policy |
| it | 1–4 | 1–4 | Use the implicit String input | Inner it incorrectly used for both nested inputs |
| function-references | 1–5 | 1–5 | Store and invoke a named formatter reference | Identity lambda bypasses the named function |
| returning-from-lambdas | 1–5 | 1–5 | Return the shipping total | Wrong final expression in multiline lambda |
| local-returns | 1–3 | 1–4 | Skip negative values without ending the sum | Bare return prematurely ends the outer function |
| inline-functions | 1–3 | 1–4 | Invoke a supplied inline action | Missing inline rejects the intended non-local return |
| noinline | 1–4 | 1–5 | Return a retained callback for later use | Retains the fallback instead of the selected callback |
| crossinline | 1–3 | 1–4 | Invoke the callback through a stored helper | Bare return instead of local return@wrap |
| boss | 1–4 | 1–4 | Reuse a typed operation with stored/trailing lambdas | Reversed composition order |

Final counts: **54 Explore, 59 Predict, 12 writing and 12 debugging tasks**. Explore and Predict counts intentionally differ. Existing redundant predictions were replaced with multiline results, expression-body inference, operation swapping, predicate boundaries and caller-defined selection. The Boss's Debug no longer repeats the higher-order lesson's ignored-operation mechanism.

Scope boundaries: aliases/reified/generic APIs belong to World 12; extension functions to World 11; collection destructuring/combinators to World 10; suspending callbacks to World 16. Receiver function types, member/constructor references and nullable callbacks are included here because they use already-introduced types, objects and null safety. The writing tasks exercise creation/application; Debug exercises diagnosis. The remaining E/P variants provide separate reasoning evidence rather than an unrelated combined writing checklist.

## Findings and repairs

**W9-01 — High: audit evidence overstated, fixed.** The old report claimed completion, used inconsistent 36/39 prediction counts, and asserted complete coverage without an activity map. Its script never asserted Explore output and could log prediction failures while exiting successfully. The replacement checks all Learn and Explore outputs against explicit expectations, all executable prediction answers, catalog/ID/count structure, and all starter/solution/broken/repair outcomes. Any execution discrepancy now fails the command. The unsupported “Audit completed” state is replaced by **Audit in progress**.

**W9-02 — High: common callable variations omitted, fixed for the mapped scope.** Returned closures, Unit callbacks, nullable callable versus nullable result, receiver function types, nested input binding, bound/unbound/constructor references, and actual compiler-rejection questions were missing. Added 15 demonstrations and 20 independently authored predictions; replaced low-information repeated forecasts as described above. Correct answers no longer always occupy A. Counts and mastery summaries use actual arrays.

**W9-03 — Medium: Learn and practice assessed generic skills, fixed.** The shared Learn factory repeated the same three ideas for every runnable topic. Several Debug tasks tested only addition/subtraction or string formatting. Replaced generic key ideas and the affected Debug tasks with topic-specific callable faults, progressive hints and distinct scenarios. No writing solution equals its Debug repair. This editorial comparison checks scenario independence; it does not prove hardcode resistance.

**W9-04 — High: runnable modifier semantics were omitted, fixed.** The previous report incorrectly justified omitting all editor practice because inlining is a bytecode optimization. JVM allocation/performance cannot be proved in this simulator, but callback invocation, storage and return boundaries can be practiced. Added focused writing/debugging for inline, noinline and crossinline while keeping conceptual performance questions. Corrected claims that noinline necessarily creates a fresh closure on every call, and qualified inline's allocation benefit. Inline declaration fragments are now complete programs with declarations outside main; declaration-only examples now actually invoke their callbacks.

**W9-05 — High: bound constructor-expression reference rejected, fixed.** `Scale(3)::apply` was inferred as `(Scale, Int) -> Int`, although it is bound and accepts only Int. Inference tested whether the receiver began with a class name instead of whether the receiver was only a type name. Require `::` immediately after the type token for unbound inference, matching lowering. Both authored content and a dedicated lambda fixture check bound and unbound forms.

**W9-06 — High: invalid inline parameter escapes silently accepted, fixed for tested forms.** The runner accepted returning an ordinary inline parameter without noinline and capturing it in a stored lambda without crossinline/noinline. Both produce plausible output despite being invalid Kotlin. Track the parameter's declaration frame and modifier, reject standalone stored/returned uses, and check invocation across non-inline boundaries. Preserve forwarding to compatible inline callees. The audit now requires the two previously accepted programs to fail compilation; dedicated lambda tests also check storage, ordinary-function forwarding and valid inline/crossinline forwarding. Root causes and scope are documented in [PITFALLS.md](PITFALLS.md).

The earlier trailing-lambda label fix remains in place and was regression-tested; this pass does not claim to have newly implemented it. Exact source-name/signature resolution, arbitrary compiler escape analysis, backend allocation and bytecode identity are not certified by these tests.

## Verification evidence

- `audit:world9-quality`: all 12 Learn snippets, 54 Explore cards, 59 predictions (including conceptual questions), and 48 writing/debug executions checked. Exact outputs are required for runnable examples/predictions; compiler-error questions have explicit error expectations. Two inline-validation regression cases also require rejection.
- `test:world9-kotlin`: local Kotlin 2.1.10 independently checks **140 runnable/reference outputs and 5 compiler rejections**. Six conceptual questions have no executable code and are reviewed editorially. Compiler JARs are supplied through `KOTLIN_COMPILER_CLASSPATH`; nothing is downloaded.
- Engine regression run: audits for Worlds 1–8, lambda runner, collection runner, World 11 content and `tsc --noEmit` pass. The production build passes with its existing large-chunk warning. Output-quote audit reports no mismatches.
- Shared lambda regressions: `test:lambda-runner` passes 80 cases; `test:lambda-kotlin` passes 50 exact outputs and 21 compiler rejections. Collection checks pass 31 behavior cases, 5 rejections and 20 lesson solutions; World 11 checks pass 14 lessons and 12 runner probes.

## Remaining audit work

1. Browser visual QA: code wrapping, stage navigation, mobile layout and feedback, including the three newly enabled editor-stage pairs.
2. Hardcode resistance and required-construct assessment: reference/starter execution does not establish that a learner must use the required syntax. Test input variation and semantic assessment before claiming implementation mastery.
3. Compiler fidelity beyond the recorded cases remains bounded. Do not interpret successful simulator execution as acceptance of arbitrary Kotlin, or output equality as proof of JVM allocation/performance behavior.

Status stays **Audit in progress**, not Verified. The generated content inventory still measures presence, not quality acceptance.

Language references consulted: [Kotlin higher-order functions and lambdas](https://kotlinlang.org/docs/lambdas.html), [Kotlin inline functions](https://kotlinlang.org/docs/inline-functions.html). The master plan supplies World 9's scope and Functional Utility Engine boss; [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md) supplies the acceptance rules.
