# CodeDo Curriculum Data Gathering & Question Authoring Progress

**Status:** Active — reflects the real, currently-shipped content against `CODEDO_MASTER_PLAN.md`'s actual 22-world structure.

This file has two sections that must not be conflated:

1. **Five-Stage Content Progress** — the real lesson format (`Learn → Explore → Predict → Write&Run → Debug → Mastered`) that the app actually runs, tracked against `MASTER_PLAN.md`'s real world names/numbers. This is the number that matters for "is World N actually done."
2. **Legacy Question Bank Inventory** — an older, different format (`LessonQuestion[]`, flat MCQ/bug-fix/output-prediction banks) authored before `MASTER_PLAN.md`'s 22-world structure existed. Its world numbers/topics do **not** match `MASTER_PLAN.md`'s current numbering (e.g. the old "World 9" bank is about Jetpack Compose; `MASTER_PLAN.md`'s real World 9 is "Lambda Lab"). This content is not wasted — it's real, validated Kotlin questions — but it must be **remapped** to whichever `MASTER_PLAN.md` world actually covers that topic before it counts as progress on that world. Do not read a legacy bank's existence as "World N is done."

---

## Quality verification (separate from content inventory)

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md). A registered
lesson or an auto-generated “Complete” row below does not mean quality-verified.
World 1: **Changes required**, with capability blockers; first-pass evidence and
repair queue are in [WORLD_1_CONTENT_REVIEW.md](WORLD_1_CONTENT_REVIEW.md).
Worlds 2–6: first-pass audits are recorded in their `WORLD_N_CONTENT_REVIEW.md`
files; see each review for status and remaining work.
World 7: **Audit in progress** — all 11 lessons reviewed, engine/content fixes
and execution evidence in [WORLD_7_CONTENT_REVIEW.md](WORLD_7_CONTENT_REVIEW.md).
Browser QA and hardcode-resistance checks remain open; this is not Verified.
World 9: **Audit in progress** — all 12 lessons re-audited; coverage, practice
and engine repairs are in [WORLD_9_CONTENT_REVIEW.md](WORLD_9_CONTENT_REVIEW.md).
Browser QA and assessment hardening remain open.
World 10: **Audit in progress** — all runnable lesson activities have exact
execution evidence and the collection runner was repaired; browser QA,
hardcode-resistance assessment, and optional real-Kotlin comparison remain
open. See [WORLD_10_CONTENT_REVIEW.md](WORLD_10_CONTENT_REVIEW.md).
World 11: **Changes required** — 14 lessons are authored, while the runner now
has exact evidence for inheritance, interfaces, data classes/enums, object
declarations, and the Boss. Companion objects, nested/inner classes, extension
properties, delegation, delegated properties, and visibility diagnostics remain
engine work. See [WORLD_11_CONTENT_REVIEW.md](WORLD_11_CONTENT_REVIEW.md).
Later worlds are not certified under this standard by this audit. Earlier reviews
remain useful evidence but do not automatically establish acceptance.

## 1. Five-Stage Content Progress (source of truth for actual completion)

Format: `src/data/lessonStagesData.ts` (shared lessons) + `src/data/curriculum/world1LessonsData.ts` (World 1's own lessons), registered in `AVAILABLE_FIVE_STAGE_LESSONS` and linked from `masterCurriculumCatalog.ts` via `fiveStageLessonKey`.

**This table is auto-generated — do not hand-edit it.** Run
`npm run update-progress` (or `node scripts/update-data-gathering-progress.mjs`)
to regenerate it from the actual state of `masterCurriculumCatalog.ts`. Edit
everything else in this file by hand as normal; only the block between the
markers below is overwritten.

<!-- AUTO-GENERATED:FIVE-STAGE-PROGRESS:START -->

| World (per `MASTER_PLAN.md`) | Five-stage lessons authored | Status |
| :--- | :--- | :--- |
| World 1 — Kotlin Awakening | 13 / 13 | ✅ Complete |
| World 2 — Operator Forge | 7 / 7 | ✅ Complete |
| World 3 — Decision Maker | 9 / 9 | ✅ Complete |
| World 4 — Loop Master | 11 / 11 | ✅ Complete |
| World 5 — Function Forge | 9 / 9 | ✅ Complete |
| World 6 — Collection Valley | 11 / 11 | ✅ Complete |
| World 7 — Null Safety Shield | 11 / 11 | ✅ Complete |
| World 8 — Object Kingdom | 14 / 14 | ✅ Complete |
| World 9 — Lambda Lab | 12 / 12 | ✅ Complete |
| World 10 — Collection Wizardry | 10 / 10 | ✅ Complete |
| World 11 — OOP Evolution | 14 / 14 | ✅ Complete |
| World 12 — Generic Realm | 0 / 15 | ⬜ Not started |
| World 13 — Scope Masters | 0 / 10 | ⬜ Not started |
| World 14 — Sequence Dimension | 0 / 13 | ⬜ Not started |
| World 15 — Error Fortress | 0 / 15 | ⬜ Not started |
| World 16 — Coroutine Academy | 0 / 12 | ⬜ Not started |
| World 17 — Flow Universe | 0 / 10 | ⬜ Not started |
| World 18 — Concurrency Arena | 0 / 14 | ⬜ Not started |
| World 19 — Kotlin Blacksmith | 0 / 16 | ⬜ Not started |
| World 20 — JVM Bridge | 0 / 10 | ⬜ Not started |
| World 21 — Performance Lab | 0 / 15 | ⬜ Not started |
| World 22 — Production Kotlin | 0 / 22 | ⬜ Not started |

**11 of 22 worlds complete by the format that actually ships.** Everything else in `masterCurriculumCatalog.ts` beyond the complete worlds is placeholder metadata (`questionsCount: 0`, no `fiveStageLessonKey`) — this is expected and self-documented in that file, not a bug.

<!-- AUTO-GENERATED:FIVE-STAGE-PROGRESS:END -->

(Run the script above to fill in the real, current numbers for every world
— the two rows shown here are just placeholders until the first run.)

---

## 2. Legacy Question Bank Inventory (old format — needs remapping, not yet counted above)

Format: `LessonQuestion[]` in `src/data/curriculum/world{N}_*.ts`, aggregated via `src/data/curriculum/index.ts`'s `ALL_CURRICULUM_QUESTIONS`. This is the **old, pre-`MASTER_PLAN` 16-world catalog** (`index.ts`'s `WORLDS_CATALOG`) — its world numbers are a separate, conflicting scheme from `MASTER_PLAN.md` and must not be read as "world N progress."

| Old-catalog world # | File | Topic (old catalog's own label) | Lessons | Questions | Which real `MASTER_PLAN.md` topic this likely maps to |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `world1_foundations.ts` | Kotlin Foundations | 8 | 40 | World 1 (already superseded by the real five-stage World 1 above — this file's content is redundant now, not a gap) |
| 2 | `world2_logic.ts` | Logic & Branches | 5 + Boss | 26 | World 3 — Decision Maker |
| 3 | `world3_loops.ts` | Loops | 5 + Boss | 26 | World 4 — Loop Master |
| 4 | `world4_functions.ts` | Functions | 7 + Boss | 36 | World 5 — Function Forge |
| 5 | `world5_oop.ts` | Classes & OOP | 6 + Boss | 31 | World 8 — Object Kingdom |
| 6 | `world6_collections.ts` | Collections & Functional Kotlin | 6 + Boss | 31 | World 6 — Collection Valley (and/or World 10 — Collection Wizardry for the functional-operations half) |
| 7 | `world7_generics.ts` | Generics & Advanced Type System | 5 + Boss | 26 | World 12 — Generic Realm |
| 8 | `world8_coroutines.ts` | Coroutines & Async Kotlin | 5 + Boss | 26 | World 16 — Coroutine Academy |
| 9 | `world9_compose.ts` | Android & Jetpack Compose | 5 + Boss | 26 | Not yet a `MASTER_PLAN.md` world (Compose/Android isn't in the current 22-world Core-Kotlin-only scope) |
| 10 | `world10_architecture.ts` | Real-World Architecture & Clean Code | 5 + Boss | 26 | Not yet a `MASTER_PLAN.md` world |
| — | `dailyBattleBank.ts` | Daily Battle question pool | — | 10 | Cross-cutting, not world-specific |

**Total legacy bank: ~294 curriculum questions + 10 Daily Battle questions across the old 10-world scheme.** This is genuinely valuable, previously-validated content — the actual data-gathering work for Worlds 2+ should draw on it as raw material, remapped per the right-hand column above, rather than writing every question from scratch.

The "topic → real world" mapping above is a first-pass guess based on topic overlap, not a confirmed plan — confirm against `MASTER_PLAN.md`'s actual per-world topic list before remapping any specific question.

---

## 3. Known data-quality caveats when remapping (see `PITFALLS.md` for full detail)

- Any Debug exercise relying on a type distinction (`Int`/`Long`, `Float`/`Double`, `Boolean`/`Char` vs `String`) needs re-verification — the simulator (`kotlinRunner.ts`) has no real type system and this class of bug has already caused silent auto-pass exercises 4 times.
- Any code containing single-quote Char literals, numeric literals with `_`/type suffixes, or triple-quoted strings renders correctly now (fixed this cycle), but re-verify visually after remapping into a new lesson, since these were previously silently corrupted.
- Run `npm run audit:output-quotes` after authoring any `writeRun`/`debug` content — it catches whitespace mismatches between description/TODO/solution/expectedOutput automatically.

---

## 4. Next action

The next un-authored curriculum world is **World 12 — Generic Realm** (`0 / 15`).
Before authoring it, finish the World 11 OOP capabilities that World 12 relies
on, beginning with companion objects, then nested/inner classes. Each runner
feature must have direct regression cases and exact checks against the actual
World 11 Learn, Explore, and Predict activity arrays.

In parallel, close the non-engine acceptance work already identified:

- World 10: browser visual QA, hardcode-resistance assessment, and optional
  real-Kotlin comparison.
- World 11: per-activity capability classification, remaining OOP engine work,
  browser QA, and hardcode-resistance review for existing Write/Debug tasks.

Use [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md), not the master
plan, for activity selection, counts, stage acceptance, and audit status. Do
not declare a world quality-verified solely because its authored inventory is
complete.

---

## 5. Resume protocol (start of every content-authoring session)

(Salvaged from the now-retired `CODEDO_DATA_GATHERING.md`.)

1. Read this file (`data_gathering_progress.md`) in full.
2. Read `CODEDO_MASTER_PLAN.md` for the world/topic you're about to author.
3. Read `PITFALLS.md` (auto-loaded already via `CLAUDE.md`) — check for anything relevant to what you're about to write.
4. Inspect the actual current state of `src/data/curriculum/` — don't trust this file blindly if it looks stale; verify against the code.
5. Identify the first incomplete world/lesson from Section 1 above.
6. Continue from that exact location — never assume work starts from World 1.
7. After authoring: run `tsc --noEmit` and `npm run audit:output-quotes`, and
   actually execute every new `writeRun.solutionCode`/`debug.brokenCode`/
   `debug.fixedCode` through `compileAndRunKotlin` (a small Node/tsx harness
   importing the lesson data directly) diffed against `expectedOutput` —
   see PITFALLS.md's "Int / Int division never truncated" entry for why
   reading the data alone isn't enough.
8. Run `npm run update-progress` to regenerate Section 1's table from the actual state of `masterCurriculumCatalog.ts` — never hand-edit that table, the script derives it from real code so it can't drift stale again.
9. Append a session log entry below.

## 6. Session log

Append one entry per meaningful session, most recent first.

```text
## 2026-09-18 (World 9, COMPLETE)

World/Lesson: World 9 — Lambda Lab, all 12 lessons: Lambda Expressions,
Anonymous Functions, Function Types, Higher-Order Functions, it, Function
References, Returning from Lambdas, Local Returns, Inline Functions,
noinline, crossinline, and the Functional Utility Engine boss.
Completed:
- Authored all 12 topics as real five-stage content in
  src/data/curriculum/world9LessonsData.ts, registered every lesson in
  AVAILABLE_FIVE_STAGE_LESSONS, and replaced all World 9 catalog placeholders
  with real descriptions, question counts, and fiveStageLessonKey values.
- The eight runtime-safe topics use Learn, Explore, Predict, Write & Run,
  Debug, and Mastered. The four compiler-semantic topics (local returns,
  inline, noinline, and crossinline) use Learn, Predict, and Mastered only;
  they deliberately do not offer misleading JS-simulator coding exercises.
Added:
- Phase 1 function-as-value runner support in kotlinRunner.ts: typed and
  implicit-`it` single-expression lambdas, function-type annotations,
  higher-order calls including trailing-lambda syntax, ::function references,
  and anonymous functions with local returns. The supported scope is explicit:
  no labelled/non-local returns or compiler-only inline behavior.
- scripts/test-lambda-runner.ts plus npm run test:lambda-runner, covering five
  representative callable-value programs.
Verification:
- Executed 64 World 9 runnable solution/debug/predict/Explore snippets through
  compileAndRunKotlin: 0 failures. Every fixed debug program matched its
  expected output; every broken program executed and produced a distinct
  result where applicable.
- npm run audit:output-quotes passed (49 blocks), npx tsc --noEmit passed,
  npm run build passed, and the existing Stage 4 editor/curriculum regression
  suite passed all 150 checks.

## 2026-09-16 (World 8, COMPLETE)

World/Lesson: World 8 — Object Kingdom, all 14 lessons: Classes, Objects,
Properties, Methods, Constructors, Primary Constructors, init, Visibility
Modifiers, Data Classes, Enums, Basic Inheritance, Interfaces, Overriding
Members, and the World Boss (Student Grade Manager).
Completed:
- Authored all 14 topics as real five-stage content in the new
  src/data/curriculum/world8LessonsData.ts, registered each in
  AVAILABLE_FIVE_STAGE_LESSONS, and gave each masterCurriculumCatalog.ts
  entry a real description/questionsCount/fiveStageLessonKey (all were
  placeholders).
- Visibility Modifiers used the Reasoning topic-type pattern (Learn ->
  Explore -> Predict -> Mastered, no Write & Run/Debug) since real access-
  control ENFORCEMENT is a compile-time-only concept this engine has no
  way to check (a private property is just a plain, fully-accessible JS
  property once transpiled) -- grading a "private access should fail" bug
  would be exactly the silent-auto-pass trap this file warns about
  repeatedly. Every other lesson used the full six stages.
- World 8 — Object Kingdom is now 14/14, COMPLETE (8/22 overall).
Added:
- The single largest kotlinRunner.ts engine addition to date: a whole-
  source OOP pre-pass (`transpileOOPDeclarations`, run before every other
  transform) adding real support for `class`/`data class`/`enum class`/
  `interface`/`object`, primary constructors (val/var shorthand and plain
  parameters), `init` blocks (including multiple, running in written
  order), methods, property overrides, `open`/`override` inheritance with
  `extends`+`super()`, and interface implementation (distinguished from
  class extension by the presence/absence of constructor-call parens after
  the supertype name). Kotlin's no-`new`-keyword instantiation is handled
  by collecting every declared class name and inserting `new` before its
  call sites in one final pass.
- Three real bugs caught only by executing generated JS, not by reading
  the transform code: (1) trailing blank lines from body-splitting made a
  single-line member look multi-line, so single-expression methods and
  property initializers were misclassified and left untranspiled -- fixed
  by trimming trailing blank lines in `transpileClassMember`. (2) a data
  class's generated `toString()` used a template literal with the class
  name directly adjacent to `(`, which the later `new`-insertion pass then
  corrupted (since it has no notion of "inside a string literal") --
  fixed by building the string via concatenation instead, so the class
  name is never immediately followed by a literal `(` in the source text.
  (3) the `extends` clause was being added whenever ANY supertype was
  named, without checking whether it was a real class (parens) or an
  interface (no parens) -- fixed to gate `extends`/`super()` on the
  presence of constructor-call parens specifically.
- One scope decision adopted (not a bug, a documented convention): method
  bodies must reference a class's own properties via explicit
  `this.propertyName`, never a bare identifier. Bare-name property access
  would require real lexical scope resolution to avoid corrupting a method
  parameter that happens to share a property's name (e.g.
  `fun setName(name: String) { name = name }`), which this line-based
  transpiler can't safely do. All World 8 lesson content was authored
  consistently with this convention.
- A `data class`'s `toString()` needed the class name genuinely absent
  from the `new`-insertion regex's blast radius (see bug #2 above);
  verified by printing a data class instance both directly and inside a
  string concatenation.
Reused (from legacy bank):
- world5_oop.ts was noted as the likely source for World 8 remapping in
  Section 2, but was not read this session -- all content was authored
  fresh against the newly-built engine subset, following the same
  from-scratch-content pattern as Worlds 4, 6, and 7.
Verification:
- 109 checks across every lesson's writeRun.solutionCode, debug.brokenCode/
  fixedCode pairs, every executable predict snippet, AND every Explore
  card's code (not just writeRun/debug/predict, extended this session
  since Explore cards are illustrative but still worth confirming they
  actually run) were executed through compileAndRunKotlin by importing
  world8LessonsData.ts directly -- 0 failures, and every debug pair
  confirmed to produce genuinely different broken-vs-fixed output.
- A full regression sweep re-ran Worlds 2-8's existing writeRun/debug
  content after the OOP engine changes (World 1 skipped due to a pre-
  existing circular-import quirk between world1LessonsData.ts and
  lessonStagesData.ts when imported directly outside Vite -- confirmed
  unrelated to this session by testing World-1-style constructs inline
  instead, and via npm run build, which resolves the real circular import
  fine) -- 0 regressions across 130 checks.
- npm run audit:output-quotes passed (49 blocks -- this world's content
  mostly concatenates variables/expressions into println rather than bare
  string literals, so little of it was newly flagged). npx tsc --noEmit
  shows only the same three pre-existing ErrorBoundary.tsx errors. npm run
  build succeeds.
Gaps found:
- None new. The pre-existing orphaned-lesson bug (`functions-lesson`,
  `loops-lesson`) remains unfixed and out of scope, flagged again here
  only for continuity.
Scope limitations documented in PITFALLS.md for future OOP-adjacent
content (World 11 — OOP Evolution will need to respect these too):
- Method/member headers must be single-line (no wrapping before `{`).
- No chained/nested classes, no secondary constructors, no multiple
  supertypes (single inheritance/interface at a time).
- Enum bodies support only a plain constant list -- no extra members,
  `.values()`, or `.ordinal`.
- Interfaces with a DEFAULT method body (not just abstract signatures) are
  silently dropped -- interface declarations are deleted wholesale at
  transpile time.

## 2026-09-16 (World 7, COMPLETE)

World/Lesson: World 7 — Null Safety Shield, all 11 lessons: Nullable Types,
Nullable Variables, Safe Call ?., Elvis Operator ?:, Non-null Assertion !!,
Null Checks, Smart Casts, Safe Casts as?, Nullable Collections & Collection
Values, Chaining Nullable Operations, and the World Boss (Safe Data
Processor).
Completed:
- Authored all 11 topics as real five-stage content in the new
  src/data/curriculum/world7LessonsData.ts, registered each in
  AVAILABLE_FIVE_STAGE_LESSONS, and gave each masterCurriculumCatalog.ts
  entry a real description/questionsCount/fiveStageLessonKey (all were
  placeholders).
- World 7 — Null Safety Shield is now 11/11, COMPLETE (7/22 overall).
Added:
- This world needed the single largest kotlinRunner.ts engine expansion
  since the project started, since it had ZERO prior support for any
  null-safety syntax. New support, in the order it was built:
  - Nullable type annotations (`String?`, `List<Int?>`, `Map<String, Int?>`)
    -- widened the val/var (and fun-signature) type-stripping regexes to
    accept `?`, and separately to accept `,`/whitespace for multi-param
    generics like `Map<K, V>` (the first version only handled single-
    parameter generics and silently failed to transpile a Map-typed
    declaration at all -- caught by the harness, not by reading the regex).
  - `?.` needs NO new transform -- it's already valid JS optional chaining
    with matching null-propagation semantics.
  - `?:` (Elvis) -- straight `?:` -> `??` (JS nullish coalescing is
    semantically equivalent for this simulator's null/undefined model).
  - `!!` (non-null assertion) -- a new `__kt_notNull()` runtime helper that
    throws a real error (surfacing as `result.success: false`, exactly like
    Kotlin's own NullPointerException) when the asserted value actually is
    null/undefined. Deliberately scoped to ONE `!!` per line (non-global
    regex) -- chaining two independent `!!` assertions on the same line is
    NOT supported and documented as an explicit scope limit, since a naive
    global match mis-binds the second assertion to the wrong sub-expression
    (verified this failure mode before choosing the single-match design).
  - `as? Type` (safe cast) -- reuses the same Int/Long/Float/Double/String/
    Boolean typeof-map `is`/`!is` already used, deliberately excluding Char
    for the same reason documented elsewhere in PITFALLS.md. Plain
    (unsafe) `as` remains unsupported -- not in this world's topic list.
  - `formatKotlinValue` now treats JS `undefined` the same as `null` when
    printing -- needed because a `?.` chain that short-circuits produces
    `undefined` in JS, not `null`, and Kotlin has only one null to begin
    with.
  - A nullable collection reference's safe-call size (`list?.size`) needed
    its own transform, `($1 == null ? null : __kt_size($1))`, since the
    existing `.size` -> `__kt_size(...)` regex doesn't match across the
    `?` and, more importantly, `__kt_size` itself would throw on a null
    receiver rather than safely producing null.
  - Destructured Map iteration (`for ((key, value) in map)`) was already
    added during World 6 and reused directly here for the Boss and the
    Chaining/Nullable-Collections lessons -- no changes needed.
- All additions verified with dedicated scratch harnesses (15 cases for
  the core operators, 9 more for nullable-collection access, plus a 9-case
  full regression sweep across Worlds 1-7) before any lesson content was
  authored against them, confirming zero regressions.
Reused (from legacy bank):
- Not applicable this session -- World 7 has no corresponding legacy-bank
  entry in Section 2 (the old catalog's null-safety coverage, if any, was
  folded elsewhere); all content authored fresh against the newly-built
  engine subset.
Verification:
- Every one of the 11 lessons' writeRun.solutionCode and debug.brokenCode/
  fixedCode pairs (22 checks total) were executed through the real
  compileAndRunKotlin by importing world7LessonsData.ts directly in a
  scratch harness, confirming fixedCode matches expectedOutput exactly AND
  that brokenCode produces genuinely different output (including several
  brokenCode cases that correctly crash outright -- e.g. calling `!!` on an
  actual null, or `.length` on a null String with no safe call -- verified
  as loud, real errors rather than silent wrong answers).
- All 33 executable predict-question code snippets across the world were
  also run through the same engine and diffed against each question's
  marked-correct option.
- npm run audit:output-quotes passed (49 blocks checked -- this world's
  content mostly concatenates variables into println rather than using
  bare literal arguments, so little of it was newly flagged by this
  whitespace-specific audit; still ran it to confirm no regressions).
  npx tsc --noEmit shows only the same three pre-existing
  ErrorBoundary.tsx errors, unrelated to this session. npm run build
  succeeds.
Gaps found:
- None new. The pre-existing orphaned-lesson bug (`functions-lesson`,
  `loops-lesson`) noted in earlier sessions remains unfixed and out of
  scope, flagged again here only for continuity.

## 2026-09-16 (World 6, COMPLETE)

World/Lesson: World 6 — Collection Valley, remaining 7 lessons (5 through 11 of 11):
Mutable vs Read-Only Collections, Creating and Accessing Collections,
Adding/Removing/Updating Mutable Elements, Iterating Over Collections,
Basic Collection Operations, Choosing the Right Collection Type, and the
World Boss (Student Records).
Completed:
- Authored all 7 remaining topics as real five-stage content in
  src/data/curriculum/world6LessonsData.ts, registered each in
  AVAILABLE_FIVE_STAGE_LESSONS, and gave each masterCurriculumCatalog.ts
  entry a real description/questionsCount/fiveStageLessonKey (all were
  placeholders).
- "Choosing the Right Collection Type" deliberately used the Reasoning
  topic-type pattern from CODEDO_MASTER_PLAN.md (Learn -> Explore ->
  Predict -> Mastered, no Write & Run/Debug) since it's a comparison
  topic, not new code to write -- mirrors World 1's "What is Kotlin?"
  conceptual pattern. Every other lesson used the full six stages.
- World 6 — Collection Valley is now 11/11, COMPLETE (6/22 overall).
Added:
- Major kotlinRunner.ts engine work required before these lessons could
  run: `.isEmpty()`/`.isNotEmpty()`/`.first()`/`.last()`/`.sorted()`/
  `.get(index)` on List/Array/Set results, `.removeAt(index)` on
  mutableListOf results, and destructured Map iteration
  (`for ((key, value) in map)`) in transformForLoops. Verified with a
  12-case scratch harness before authoring any lesson content, plus every
  individual lesson's writeRun/debug/predict snippets re-verified after
  assembly.
- Deliberately did NOT add `!!`/`?:` (Null Safety, World 7) support this
  session -- discovered while first drafting the World Boss, which
  originally tried `scores[name]!!` and hit a hard parse error. Redesigned
  the Boss to use `for ((name, score) in scores)` destructuring instead
  (which returns a non-null Int directly, with no nullable ambiguity),
  avoiding the unbuilt feature entirely rather than half-supporting it.
  Flagged as the concrete first blocker for World 7 in Section 4 above.
- The World Boss (Student Records) combines a List, a Set, and a mutable
  Map with an accumulator loop, plus a debug exercise built around an
  off-by-boundary comparison (score > 40 vs >= 40) rather than a syntax
  bug, matching the "boundary is subtle, not just a typo" spirit of a
  boss-level bug.
Verification:
- All 6 remaining writeRun/debug pairs (Mutable vs Read-Only through the
  World Boss; Choosing the Right Collection Type has neither) executed
  through compileAndRunKotlin and diffed against expectedOutput, including
  confirming every debug bugType:'logic'/'runtime' pair produces genuinely
  different broken-vs-fixed output. All executable predict snippets passed
  the same way. The Mutable vs Read-Only debug/predict content
  deliberately includes a case that errors out (calling .add() on a
  read-only listOf result) -- confirmed via the harness that this is a
  real, loud runtime error in the engine (TypeError), not a silent wrong
  answer, before using it as a debug/predict scenario.
- npm run audit:output-quotes passed (49 blocks checked -- most of this
  session's new code prints concatenated expressions/variables rather than
  bare string literals, so it wasn't newly flagged by this whitespace-
  specific audit; still ran it to confirm no regressions). npx tsc
  --noEmit shows only the same three pre-existing ErrorBoundary.tsx
  errors, unrelated to this session.
Next: World 7 — Null Safety Shield. Needs new kotlinRunner.ts support for
nullable types, `?.`, `?:`, and `!!` before any content can be authored --
see Section 4 above.

## 2026-09-16 (World 6, in progress, continued)

World/Lesson: World 6 — Collection Valley, Maps (4 of 11 lessons)
Completed:
- Authored Maps as real five-stage content in
  src/data/curriculum/world6LessonsData.ts, registered it in
  AVAILABLE_FIVE_STAGE_LESSONS and gave masterCurriculumCatalog.ts's
  world-6-maps entry real description/questionsCount/fiveStageLessonKey
  (was placeholder).
- World 6 is now 4/11 in the auto-generated progress table.
Added:
- kotlinRunner.ts engine work required before Maps content could run:
  `.containsKey(...)` and `.containsValue(...)` on mapOf/mutableMapOf
  results (delegating to Map.prototype.has and a values-array .includes
  check respectively). Verified with a 9-case scratch harness (create +
  print, key lookup, containsKey true/false, size, mutable key update, and
  a genuine broken/fixed wrong-key debug pair) run through the real
  compileAndRunKotlin engine before authoring the final lesson content.
- Deliberately avoided teaching missing-key bracket access (map["missing"])
  in Predict content: the engine's Map.get returns JS undefined for an
  absent key, which formatKotlinValue renders as the string "undefined"
  rather than Kotlin's "null" for a nullable lookup miss. Used
  containsKey (which the engine handles correctly) instead of relying on
  an unverified null-formatting edge case.
Verification:
- All Maps Write & Run solution, broken/fixed Debug code, and all three
  prediction snippets pass compileAndRunKotlin exactly, including
  confirming the debug bugType:'logic' pair produces genuinely different
  output.
- npm run audit:output-quotes passed (49 blocks checked, no mismatches).
  npx tsc --noEmit shows only the same three pre-existing
  ErrorBoundary.tsx errors, unrelated to this change.
Next: Mutable vs read-only collections (world-6-mutable-vs-read-only-collections),
the 5th of 11 World 6 lessons.

## 2026-09-16 (World 6, in progress)

World/Lesson: World 6 — Collection Valley, Sets (3 of 11 lessons)
Completed:
- Authored Sets as real five-stage content in
  src/data/curriculum/world6LessonsData.ts, registered it in
  AVAILABLE_FIVE_STAGE_LESSONS and gave masterCurriculumCatalog.ts's
  world-6-sets entry real description/questionsCount/fiveStageLessonKey
  (was placeholder).
- World 6 is now 3/11 in the auto-generated progress table.
Added:
- kotlinRunner.ts engine work required before Sets content could run:
  `.contains(...)` on arrayOf/listOf/mutableListOf/setOf/mutableSetOf
  results, and `.remove(...)` on mutableSetOf results (delegating to
  Set.prototype.delete) — see new PITFALLS.md entry for detail. Verified
  with a 9-case scratch harness (dedup on creation, contains true/false,
  mutable add, duplicate-add no-op, and a genuine broken/fixed debug pair)
  run through the real compileAndRunKotlin engine before authoring the
  final lesson content, and again after assembly.
Verification:
- All Sets Write & Run solution, broken/fixed Debug code, and all three
  prediction snippets pass compileAndRunKotlin exactly, including
  confirming the debug bugType:'logic' pair produces genuinely different
  output (per the "Debug exercises must be reproducible by this app's
  simulator" pitfall).
- npm run audit:output-quotes passed (49 blocks checked, no mismatches).
  npx tsc --noEmit shows only the same three pre-existing
  ErrorBoundary.tsx errors, unrelated to this change.
Next: Maps (world-6-maps), the 4th of 11 World 6 lessons.

## 2026-09-15 (World 6, in progress)

World/Lesson: World 6 — Collection Valley, Arrays (1 of 11 lessons)
Completed:
- Authored Arrays as real five-stage content in
  src/data/curriculum/world6LessonsData.ts and registered it in
  AVAILABLE_FIVE_STAGE_LESSONS and masterCurriculumCatalog.ts.
- World 6 is now 1/11 in the auto-generated progress table.
Added:
- Narrow simulator support for arrayOf, Kotlin-style collection printing,
  List/Array size, mutable-list add/remove, setOf, mapOf `to` pairs,
  Map lookup, and mutable Map updates, verified with six representative
  Kotlin programs before Arrays content was authored.
Verification:
- Arrays Write & Run solution, broken/fixed Debug code, and all three
  prediction snippets pass compileAndRunKotlin exactly.
- npm run audit:output-quotes passed. npm run lint remains blocked by the
  same three pre-existing ErrorBoundary.tsx typing errors.

## 2026-09-15 (World 5)

World/Lesson: World 5 — Function Forge (all 9 lessons)
Completed:
- Defining functions, Function parameters, Return values, Default
  parameters, Named arguments, Single-expression functions, Local
  functions, vararg, and the World Boss (Utility Toolkit) — all six
  stages each, in src/data/curriculum/world5LessonsData.ts.
- Registered all 9 in AVAILABLE_FIVE_STAGE_LESSONS (lessonStagesData.ts)
  and gave masterCurriculumCatalog.ts's World 5 block real
  descriptions/questionsCount/fiveStageLessonKey values (was all
  placeholder metadata).
- World 5 now 9/9 in the auto-generated progress table (5/22 overall).
Added:
- Coverage-driven three-example and three-prediction sets for every
  Function Forge topic, plus a Write & Run and reproducible logic-debug
  exercise for each lesson.
- The World Boss combines return values, default parameters,
  single-expression functions, and vararg accumulation.
Reused (from legacy bank):
- world4_functions.ts informed the Kotlin facts and topic framing, while
  all final five-stage content was authored fresh against the current
  curriculum and simulator subset.
Verification:
- All 9 Write & Run solutions plus all 9 broken/fixed debug pairs were
  executed through compileAndRunKotlin. All 24 executable prediction
  snippets also passed their expected-output checks.
- The three named-argument predictions are deliberately display-only:
  named calls are valid Kotlin but explicitly unsupported in executable
  simulator content. Its Write & Run and Debug stages correctly use
  positional calls.
- Follow-up QA moved every pre-Local-Functions declaration back to
  top-level scope and made prediction choices render exact output with
  visible whitespace and preserved newlines. A full rerun passed all 51
  executable World 5 snippets.
- npm run audit:output-quotes passed. npm run lint remains blocked by
  three pre-existing ErrorBoundary.tsx typing errors (state/props missing
  on ErrorBoundary), unrelated to World 5.

## 2026-09-15 (World 4)

World/Lesson: World 4 — Loop Master (all 11 lessons)
Completed:
- for, while, do-while, Ranges, Progressions, downTo, step, break,
  continue, Nested loops, and the World Boss (Pattern & Number
  Analyzer) — all six stages each, in
  src/data/curriculum/world4LessonsData.ts.
- Registered all 11 in AVAILABLE_FIVE_STAGE_LESSONS (lessonStagesData.ts)
  and gave masterCurriculumCatalog.ts's World 4 block real
  descriptions/questionsCount/fiveStageLessonKey (was all placeholder).
- World 4 now 11/11 in the auto-generated progress table (4/22 overall).
Added:
- Major kotlinRunner.ts engine work required before any World 4 content
  could run at all: `transformForLoops`, a per-line regex transform
  that rewrites `for (i in <range>) { ... }` into a plain JS for-loop,
  supporting `a..b`, `a until b`, `a downTo b`, and any of those with a
  trailing `step n`. Deliberately does NOT support iterating a
  collection (`for (x in list)`) or a standalone range/progression
  value (`val r = 1..10`) — out of scope until a later world. Ordered
  to run BEFORE World 3's `transformTypeChecks`/`transformRanges`
  (those look for a bare `in`/`!in` and would otherwise misfire on a
  for-loop header's `in` keyword before it's rewritten). `while`,
  `do-while`, `break`, `continue`, and nested loops needed zero engine
  work — all already valid JS as-is. New PITFALLS.md-style verification:
  16 engine-level checks (range/until/downTo/step in every combination,
  while, do-while including the at-least-once guarantee, break,
  continue, nested loops) all run through the real engine before any
  content was authored, then every lesson's writeRun/debug/predict code
  re-verified the same way after assembly — zero regressions against
  World 1-3.
- Hit an agent-pool rate limit mid-batch (9 of 11 agents failed
  simultaneously with a 429). Recovered by retrying the failed lessons
  in smaller batches (3, then 3, then 1) instead of all at once — no
  content was lost, this only affected pacing.
Reused (from legacy bank):
- world3_loops.ts was noted as the likely source for World 4 remapping
  in Section 2 below, but was not actually read this session — all
  content was authored fresh against the engine-verified syntax subset
  rather than adapted from the legacy bank.
Gaps found:
- Same pre-existing orphaned-lesson bug as prior sessions
  (`functions-lesson`, `loops-lesson`) and the same latent
  `staticValidateKotlin` comment-inside-string bug — still out of
  scope, still unfixed, flagged again here for continuity.

## 2026-09-15 (World 3)

World/Lesson: World 3 — Decision Maker (all 9 lessons)
Completed:
- if, if-else, else-if, when, when with ranges, when as an expression,
  Multiple conditions and nested conditions, Type checks with is where
  appropriate, and the World Boss (Grade & Eligibility System) — all
  six stages each, in src/data/curriculum/world3LessonsData.ts.
- Registered all 9 in AVAILABLE_FIVE_STAGE_LESSONS (lessonStagesData.ts)
  and gave masterCurriculumCatalog.ts's World 3 block real
  descriptions/questionsCount/fiveStageLessonKey (was all placeholder).
- World 3 now 9/9 in the auto-generated progress table (3/22 overall).
Added:
- Major kotlinRunner.ts engine work required before any World 3 content
  could run at all: single-line if-as-expression (ternary), a whole-
  source `when` block transpiler (statement and expression form; comma-
  value branches, `in`/`!in` range branches, required subject, single-
  line branch results only), standalone `in`/`!in` range checks, and
  `is`/`!is` type checks narrowly scoped to Int/Long/Float/Double/
  String/Boolean (never Char, never inside `when`). New PITFALLS.md
  entry documents the exact supported subset and the known gap (an
  if-expression nested inside a when-branch result is unsupported).
- All 9 lessons' writeRun/debug code, plus every predict question with
  a `code` array, were executed through the real `compileAndRunKotlin`
  engine (not just hand-traced) via a scratch harness — zero failures,
  zero regressions against World 1/2's existing suite.
Reused (from legacy bank):
- world2_logic.ts's `if-else-expression` and `when-expression` lesson
  content informed the Kotlin facts and framing used (if-expression
  replaces the ternary operator, comma-value/range `when` branches),
  though all final content was authored fresh for the six-stage format.
Gaps found:
- Same pre-existing orphaned-lesson bug as last session (`functions-lesson`,
  `loops-lesson`) — still out of scope, still unfixed, flagged again here.
- New, pre-existing (not caused by this session), latent bug found while
  running World 1's predict-question code through the real engine as a
  bonus check: `staticValidateKotlin`'s per-line comment-stripping does
  `rawLine.indexOf('//')` without checking whether that `//` is actually
  inside a string literal, so a line like `println("// Not a comment")`
  is misread as having its string truncated at the `//`, producing a
  false "Unclosed string literal" error. Never affects a real user today
  since Predict-stage code is only displayed, never executed (confirmed
  by grepping Explore.tsx/Predict.tsx/Learn.tsx for compileAndRunKotlin
  -- no matches) -- but would break a future writeRun/debug exercise
  whose code contains `//` inside a string. Confirmed none of World 2/3's
  new graded code triggers it. Not fixed this session -- out of scope,
  flagged for whoever next touches `staticValidateKotlin`.

## 2026-09-15 (World 2)

World/Lesson: World 2 — Operator Forge (all 7 lessons)
Completed:
- Arithmetic operators, Comparison operators, Logical operators,
  Assignment operators, Increment/decrement, Operator precedence,
  and the World Boss (Smart Calculator) — all six stages each, in
  src/data/curriculum/world2LessonsData.ts.
- Registered all 7 in AVAILABLE_FIVE_STAGE_LESSONS (lessonStagesData.ts)
  and gave masterCurriculumCatalog.ts's World 2 block real
  descriptions/questionsCount/fiveStageLessonKey (was all placeholder).
- World 2 now 7/7 in the auto-generated progress table.
Added:
- Comparison Operators and Logical Operators expanded from the drafted
  3 explore/3 predict to 5/5 each (individual <, >, standalone !, a
  combined &&/||/! example) per explicit user direction not to stick to
  the bare minimum when a topic supports more coverage.
- New PITFALLS.md entry + kotlinRunner.ts fix: Int/Int division never
  truncated in the simulator (47 / 5 computed as 9.4, not 9) — fixed
  with a conservative static int-type inference pass + targeted
  Math.trunc() wrapping for the identifier/literal ÷ identifier/literal
  case. Found by actually executing every writeRun/debug block through
  compileAndRunKotlin rather than reading the data, which is now the
  documented standard verification step (see Section 5, step 7).
Reused (from legacy bank):
- world1_foundations.ts's "operators" lesson (division truncation,
  modulo, precedence, val-increment bug) and world2_logic.ts's
  "comparisons"/"logical-operators" lessons informed the Kotlin facts
  used, though all final content was authored fresh for the six-stage
  format and independently hand-verified rather than copied.
Gaps found:
- Two orphaned, non-MASTER_PLAN legacy lessons in lessonStagesData.ts
  ('functions-lesson', worldId 'world-4'; 'loops-lesson') have
  writeRun.solutionCode that defines a function but never calls/prints
  it, so it produces empty output against a non-empty expectedOutput.
  Pre-existing, unrelated to World 2, out of scope for this session —
  flagged here rather than fixed silently.
```

```text
## YYYY-MM-DD

World/Lesson:
Completed:
- ...
Added:
- ...
Reused (from legacy bank):
- ...
Gaps found:
- ...
```

## 2026-09-19 — World 12 data gathering started

Completed:
- Created [WORLD_12_CONTENT_REVIEW.md](WORLD_12_CONTENT_REVIEW.md) with the
  15 catalog lessons, authoritative capacity decisions, legacy-bank inventory,
  and pre-authoring findings.
- Added generic-class erasure for declarations and explicit constructor calls.
  `npm run test:world12-runner` verifies six exact runtime cases: generic
  classes/functions, multiple parameters, aliases, APIs, and the Boss shape.

Reused (from legacy bank):
- Identified 31 generic-programming questions in `world7_generics.ts` as
  source material only. They require lesson-by-lesson remapping and runner or
  real-Kotlin verification before they count as World 12 activities.

Gaps found:
- The representative `inline reified` / `is T` probe also fails; do not author
  reified runnable activities until a narrow supported subset exists.
- Constraints, variance, projections, and star projections require
  compiler-reference evidence rather than simulator execution claims.

## 2026-09-19 — Quality tracking and World 11 runner repairs

Completed:
- Replaced the stale World 11 pre-authoring queue with the active World 11
  capability work and World 12 authoring priority.
- Recorded World 10 and World 11 quality states separately from their complete
  authored-inventory rows.
- Updated `CODEDO_MASTER_PLAN.md` so `LESSON_QUALITY_STANDARD.md` exclusively
  governs activity counts, stage selection, evidence, and acceptance.

Added:
- World 11 runner support and exact audit checks for data-class `copy()` and
  value equality, abstract inheritance, multiple interfaces, interface default
  methods, and qualified interface `super` calls.

Gaps found:
- World 11 still needs companion objects, nested/inner classes, extension
  properties, delegation, delegated properties, and visibility diagnostics.
- World 10 still needs browser QA, hardcode-resistance assessment, and optional
  real-Kotlin comparison before it can be Verified.

## 2026-09-19 — World 10 editor capacity

Collection runner audit and implementation completed for the scope in [WORLD_10_CAPACITY_AUDIT.md](WORLD_10_CAPACITY_AUDIT.md). Added 31 behavior fixtures checked against real Kotlin, 5 rejection checks and execution checks for all 20 existing writing/debug solutions. Updated the ten World 10 workbook rows with verified behavior and remaining limits. Corrected the partition lesson to use Pair.first.

Content authoring remains separate: existing repeated Explore/Predict templates have not been expanded. The audit maps required concepts to examples/predictions and writing/debugging targets; counts must follow that coverage analysis, not a fixed quota.
