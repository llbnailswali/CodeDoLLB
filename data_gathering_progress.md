# CodeDo Curriculum Data Gathering & Question Authoring Progress

**Status:** Active — reflects the real, currently-shipped content against `CODEDO_MASTER_PLAN.md`'s actual 22-world structure.

This file has two sections that must not be conflated:

1. **Five-Stage Content Progress** — the real lesson format (`Learn → Explore → Predict → Write&Run → Debug → Mastered`) that the app actually runs, tracked against `MASTER_PLAN.md`'s real world names/numbers. This is the number that matters for "is World N actually done."
2. **Legacy Question Bank Inventory** — an older, different format (`LessonQuestion[]`, flat MCQ/bug-fix/output-prediction banks) authored before `MASTER_PLAN.md`'s 22-world structure existed. Its world numbers/topics do **not** match `MASTER_PLAN.md`'s current numbering (e.g. the old "World 9" bank is about Jetpack Compose; `MASTER_PLAN.md`'s real World 9 is "Lambda Lab"). This content is not wasted — it's real, validated Kotlin questions — but it must be **remapped** to whichever `MASTER_PLAN.md` world actually covers that topic before it counts as progress on that world. Do not read a legacy bank's existence as "World N is done."

---

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
| World 6 — Collection Valley | 1 / 11 | 🟡 In progress |
| World 7 — Null Safety Shield | 0 / 11 | ⬜ Not started |
| World 8 — Object Kingdom | 0 / 14 | ⬜ Not started |
| World 9 — Lambda Lab | 0 / 12 | ⬜ Not started |
| World 10 — Collection Wizardry | 0 / 10 | ⬜ Not started |
| World 11 — OOP Evolution | 0 / 14 | ⬜ Not started |
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

**5 of 22 worlds complete by the format that actually ships.** Everything else in `masterCurriculumCatalog.ts` beyond the complete worlds is placeholder metadata (`questionsCount: 0`, no `fiveStageLessonKey`) — this is expected and self-documented in that file, not a bug.

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

Author World 5 (Function Forge) as real five-stage content, remapping applicable questions from the legacy `world4_functions.ts` bank where topically relevant, following World 1-4's already-completed lessons as the template.

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
