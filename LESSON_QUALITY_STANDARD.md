# CodeDo lesson quality standard

This is the authoritative quality-control rule for every world and every lesson, including bosses. It replaces comparisons with any particular lesson, all fixed activity counts, numeric minimums, maxima and count formulas in older plans. The master plan defines curriculum scope; this file defines acceptance quality. World review files record evidence and findings, not competing rules.

## 1. Plan coverage before choosing counts

Before writing or revising activities, identify prerequisites, the practical learning outcome, all commonly used concepts and syntax within the lesson, everyday variations, important boundaries and common mistakes. Explicitly name specialist material deferred to a later lesson. Do not omit everyday concepts because the editor lacks support.

Record a concept-level map in the world's audit file:

| Concept / behavior and learning outcome | Learn explanation | Explore IDs | Predict IDs | Write & Run IDs | Debug IDs | Capability / justified deferral |
| --- | --- | --- | --- | --- | --- | --- |
| One specific skill or important variation | Where and why taught | Concrete demonstration | Independent reasoning scenario | Implementation evidence | Mistake and repair evidence | Verified, limited, or deferred with destination/reason |

Derive example and prediction counts separately from this map and explain why each distinct scenario is needed. There is **no fixed count, minimum or maximum** for any stage. Changing only names or numbers does not add coverage. Split a scenario when it overloads a beginner; combine concepts only when the resulting task meaningfully exercises and checks each one.

Carry the explored and predicted concepts into Write & Run and Debug where applicable. A single writing or debugging task is sufficient only if the coverage map proves it. UI/schema limits are implementation gaps, not permission to reduce required learning coverage. Counts are finalized before authoring, and revised when new gaps emerge; they are never a completion score.

Explore and Predict together must cover every commonly used feature of the lesson's topic -- its main features plus their ordinary basic and intermediate-level usage, not just a single introductory shape of each. A feature used only at expert/edge-case depth may be deferred per the map above, but a feature an everyday Kotlin program at this lesson's level would actually use may not be skipped, and must not be represented by only one example when it has distinct common variations (e.g. a form used standalone vs. as part of a larger expression, or with different operand/argument types). Add more examples and predictions whenever this coverage requires it -- there is still no fixed count.

## 2. Write & Run and Debug task scope

Do not force every Explore/Predict concept into a single Write & Run or Debug task. A task that stitches together every taught feature regardless of whether they naturally belong together (e.g. an escape sequence, an unrelated type conversion, and a short-circuit demonstration all crammed into one program) tests assembly-following, not understanding, and becomes harder to write clear hints and checks for as it grows. Coverage is satisfied by the concept map across however many tasks it takes -- it is never a requirement that one task cover everything a lesson taught.

Group only concepts that would naturally co-occur in a small, real program at this lesson's level (state changes feeding a decision, a calculation feeding formatted output). When a commonly used feature is typically applied in isolation rather than combined with the lesson's other concepts (a one-off conversion, an escape sequence, a rarely-combined variation), give it its own small, focused task instead of folding it into an existing one -- or, if Explore and Predict already give adequate evidence for it and a dedicated task would add no new evidence, note that choice in the coverage map rather than forcing a task to exist. Add more Write & Run or Debug tasks whenever coverage calls for it; there is no fixed count and no preference for fewer, larger tasks over more, focused ones.

A Debug task specifically should target one reproducible fault tied to one concept (or one natural interaction between two, such as the precedence bugs in World 2). A broken program combining several unrelated mistakes at once makes the hints and explanation incoherent and turns diagnosis into guesswork rather than reasoning about a specific misconception.

Signs a task has outgrown this scope: its description needs numbered steps that do not build on each other, its hints or explanation must address multiple unrelated ideas, or the resulting program no longer resembles something a learner at this level would plausibly write or debug in one sitting. Split it instead of trimming coverage elsewhere to compensate.

A Debug task's `fixedCode` must not be the same scenario as the lesson's own Write & Run `solutionCode` -- not the same variable names, not the same literal values, not the same expected output. Reusing it turns Debug into recognizing what the learner just typed minutes earlier instead of independent diagnosis, and it is invisible to execution-only checks (both still run and produce the claimed output) -- it only surfaces by explicitly comparing the two. Keep the bug's underlying mechanism (the actual mistake being taught) but change the surrounding scenario: different variable names, different values, a different but structurally equivalent domain. The same rule applies across lessons, not just within one: a Debug exercise should not recycle another lesson's Explore/Predict/Debug scenario either (see the World 3 review's W3-01 finding for a cross-lesson instance of this).

## 3. Stage acceptance criteria

| Stage | Required evidence |
| --- | --- |
| Learn | Clear purpose, prerequisites, accurate explanation, realistic code/context and explanation of behavior. Introduce syntax before relying on it. Key ideas must be topic-specific, with no fixed number. Label fragments versus complete programs. |
| Explore | Distinct progressive examples covering the map; explain exact behavior, output or compile failure and the reason. Include common variations and consequential boundaries. Repeating the Learn example alone is insufficient. |
| Predict | Independent code reasoning, plausible misconception-based distractors, one unambiguous correct answer and an explanation tied to the code. Ask explicitly whether the learner is predicting output, type, compilation or a particular step. Conceptual questions are appropriate for non-code outcomes but do not replace code reasoning for executable concepts. Avoid answer-position patterns and duplicate scenarios. |
| Write & Run | Precise task, meaningful starter, expected behavior/output, verified reference solution and checks that enforce the learning objective. A hardcoded output must not earn proof of a required construct or transformation; use input variation or an appropriate semantic check where needed. The unfinished starter must not already pass. |
| Debug | Reproducible topic-specific fault; broken program demonstrably fails the stated requirement, and the repair passes. Hints progress from symptom to cause to repair without immediately giving away the answer. Explain why the change fixes the underlying mistake. A parser crash is not a useful compiler diagnostic. |
| Mastered | Claims and counts reflect evidence from actual available activities. Do not claim implementation mastery for read/predict-only material or world-wide mastery from a narrow boss. |

Non-executable orientation lessons can omit editor stages with a recorded reason and appropriate comprehension checks. Do not fabricate a coding task merely to fill a stage.

## 4. Correctness and editor capability

Use official Kotlin documentation for language claims and a real Kotlin compiler for disputed semantics, numeric behavior or compiler-error expectations. The teaching runner is not the authority on Kotlin. Keep whitespace, blank lines, escaping and numeric formatting exact when they matter; state the context of fragments.

The capacity source is `CodeDo_Editor_capacity_per_lesson_status.xlsx`. Verify each actual activity, not just the topic's status. Record unsupported behavior and the affected practice explicitly in the audit; retain correct Kotlin teaching and defer or gate misleading execution. Do not recreate the deleted capacity Markdown file.

Verify solutions, starters, broken versions and repairs. Check prediction answer keys against the question actually asked; type questions are not output questions. Automated checks must use the lesson's actual arrays and catalog entries, not assumed counts. Review rendered readability when content/UI changes, including code, output, hints and mobile layout. Automated execution does not replace editorial review.

Every `codeSnippet`/`code` array (Learn, Explore, Predict) must render as properly formatted Kotlin: each declaration, statement and closing brace on its own line, consistent indentation, a blank line separating a class/function block from the code that uses it, and normal spacing around `=`, `:`, and operators (`val x: Int = 1 + 2`, not `val x:Int=1+2`). Do not cram multiple declarations or statements onto one semicolon-joined line for compactness. This is a readability requirement independent of execution -- a cramped one-liner and its properly formatted equivalent behave identically once compiled -- but it is also a proven source of engine bugs: this teaching runner's class-body parser (`splitClassMembers` in `kotlinRunner.ts`) divides members by line, so two members joined with `;` on one physical line (e.g. `class Counter{var n=0;private set;fun inc(){n++}}`) can silently fail to parse or fail to execute correctly, even when the exact same code split across real lines works. Reformat any such content on sight rather than treating it as pre-existing and out of scope.

## 5. Audit process and completion gate

Audit in curriculum order, beginning at World 1. Use catalog-linked lessons, deduplicating aliases and excluding orphaned legacy content.

1. Inventory stages, existing counts and execution capabilities.
2. Review every stage and record a concept-level coverage map; flag missing teaching, prediction, writing and debugging separately.
3. Record findings with lesson/activity identifiers, severity, observed evidence and a concrete repair. Distinguish content defects, engine defects and assessment/UI limitations.
4. Plan distinct scenarios and derive counts before rewriting. Fix correctness and misleading mastery first, then coverage and presentation.
5. Verify revised activities and affected regressions; record commands/results and any checks not performed.
6. Accept a lesson only when every in-scope common concept has appropriate teaching and assessment, all applicable gates pass, and limitations/deferrals are explicit. Accept a world only when all its lessons meet this gate.

Use these review states: **Not audited**, **Audit in progress**, **Changes required**, **Blocked by capability**, **Verified**. A report can list both content changes and capability blockers. A justified specialist deferral is not a missing requirement; an unimplemented required practice prevents full verification. No averaged quality score may hide a failed gate.

Keep three statuses distinct: registered/shipped content, editor capability, and quality verification. An auto-generated “Complete” inventory means content exists, not that this standard passed. Reopen verification when relevant content, runner behavior or checks change.
