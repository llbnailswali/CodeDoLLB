# World 4 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Changes required** for one coverage gap; clean
on correctness and task scope. This is the first audit pass.

## Scope and evidence

Reviewed the 11 catalog-linked lessons in Loop Master (`for`, `while`,
`do-while`, Ranges, Progressions, `downTo`, `step`, `break`, `continue`,
Nested loops, Boss), covering Learn, Explore, Predict, Write & Run, Debug,
and mastery claims. Source: `src/data/curriculum/world4LessonsData.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world4_functions.ts`
(`WORLD_4_QUESTIONS`) is themed "Functions & Modules" -- that's World 5's
topic ("Function Forge") under the current numbering, not World 4's. It's
leftover content from an old world-numbering scheme, spread only into the
legacy `ALL_CURRICULUM_QUESTIONS` pool used by the free-standing "Drill"/
mistake-review features (`App.tsx`), not into the current catalog-linked
five-stage lesson flow for `world-4` (Loop Master). Excluded, matching the
exclusions in the World 1-3 reviews.

`npm run audit:world4-quality` checks registration, question totals/answer-
key structure, probes all 57 Explore examples, and runs all 44 writeRun/
debug execution assertions. **All pass, zero open diagnostic defects, zero
example execution gaps** -- same clean result as World 3.

## Engine-correctness audit

- **No labeled `break@`/`continue@` anywhere** -- correctly avoided. Grepped
  `kotlinRunner.ts`: there is no transform for Kotlin's labeled loop syntax
  at all (`outer@ for` / `break@outer`), so any lesson using it would fail
  outright. Nested Loops correctly scopes its whole lesson to unlabeled
  `break`/`continue` only ever affecting the innermost loop -- exactly what
  the engine supports, and appropriate content for this world's beginner
  level regardless (labels are typically an intermediate/advanced topic).
- **Range/progression forms**: every range used is one of `a..b`, `a until
  b`, `a downTo b`, optionally with `step n` -- all within
  `transformForLoops`'s documented support. No char ranges, no collection
  iteration.
- **Ranges lesson explicitly documents the engine's own scope** ("In this
  engine, a range only works in two places: directly inside a for-loop
  header... or directly inside a membership check with in/!in") rather than
  teaching general Kotlin `Range`/`IntProgression` objects the simulator
  can't represent. This is exactly the kind of engine-aware authoring
  PITFALLS.md asks for.
- Verified a claim from the Boss's mastery text directly: plain `until`
  without `step` (`for (i in 0 until 5)`) executes correctly in the engine
  -- see W4-01 below, since this exact form is never actually taught.

**No correctness or capability defects found.**

## Write & Run / Debug task-scope audit

Every task is single-concept or a natural two-form pairing; no Debug bundles
unrelated faults (the Boss's debug here is a *single* fault, tighter than
World 3's Boss debug):

| Lesson | Write & Run scope | Debug scope |
| --- | --- | --- |
| for | Single concept (sum a range) | Single fault (wrong upper bound) |
| while | Single concept (countdown) | Single fault (wrong comparison operator) |
| do-while | Single concept (count up) | Single fault (`while` used where `do-while` was needed) |
| Ranges | Single concept (count values in a range) | Single fault (range membership bug) |
| Progressions | Single concept (print every third number) | Single fault (wrong step value) |
| downTo | Single concept (countdown) | Single fault (broken countdown range) |
| step | Single concept (count up by 5) | Single fault (missing final value / range-form mixup) |
| break | Single concept (stop a scan early) | Single fault (wrong threshold) |
| continue | Single concept (skip multiples of four) | Single fault (`break` used where `continue` was needed) |
| Nested loops | Single concept (multiplication table) | Single fault (inner range not tied to outer variable) |
| Boss | Multiple concepts (stepped range + `continue` filter + accumulator + `break` limit) integrated by design -- the sanctioned capstone exception | **Single** fault (accumulator overwritten instead of accumulated) -- tighter scoping than World 3's two-fault Boss debug |

No duplicate/near-duplicate debug scenarios found across lessons (the
`while`-vs-`do-while` and `break`-vs-`continue` "wrong keyword used" bugs
are each unique to their own lesson pair and genuinely test that specific
distinction, not a repeat of another lesson's bug shape).

## Findings

**W4-01 (Medium -- coverage gap, against the "commonly used features" rule
in `LESSON_QUALITY_STANDARD.md` section 1).** Kotlin's `until` (exclusive
range) is **never taught in its basic, unstepped form** anywhere in this
world. Every appearance of `until` in Explore/Predict is already combined
with `step` (`0 until 15 step 5`, `1 until 10 step 3`, etc.) -- there is no
example of the plain, everyday form (`for (i in 0 until 5) { ... }`), even
though `until` is a genuinely common, basic Kotlin idiom (0-based indexing
loops, "n times" loops) distinct from `..`. Verified the engine already
executes plain `until` correctly (`for (i in 0 until 5)` prints `0 1 2 3
4`), so this is a pure content gap, not a capability limit. The Boss's
mastery summary claims "`for`-loops with ranges, **until**, downTo, and
step" as demonstrated content, but no activity anywhere actually teaches
`until` on its own -- an overclaim riding on the same gap.

**Fixed.** Added a 6th Learn key idea introducing `until` as `..`'s
exclusive counterpart, a new Explore card (`card-ranges-6`, `for (i in 0
until 5)`, plain and unstepped) and a matching Predict question
(`pred-ranges-7`) to the **Ranges** lesson, where `..` is already
introduced as a loop-driving range form -- `until` is `..`'s natural
sibling there, and the master plan's own World 4 topic list has no separate
"until" lesson slot, so Ranges is the correct home for it. Catalog
`questionsCount` and description updated (6 -> 7). Verified via
`compileAndRunKotlin` and `npm run audit:world4-quality` (58 examples, 60
predictions, 44/44 execution checks still passing), plus the full World
1-3 regression suite and `tsc --noEmit` for cross-file safety.

**Observation, not a defect**: Progressions (lesson 5) introduces `step`
and `downTo` before either gets its own dedicated lesson (lessons 6-7).
This ordering is mandated by the master plan's own World 4 topic sequence
(`Ranges, Progressions, downTo, step, break, continue`), not an authoring
choice, so it isn't fixable at the content level without violating
curriculum-to-world alignment. The content handles the inversion about as
gracefully as possible: `downTo`'s lesson leads with a genuinely new
contribution (the "backwards `..` is NOT `downTo`" trap, never covered in
Progressions) rather than just repeating step content, and `step`'s lesson
systematically covers all three range forms (`..`, `until`, `downTo`) as a
deliberate reference matrix, which is a different and additive treatment
from Progressions' more scattered introduction -- not simple duplication.

## Update (2026-09-19): Write & Run / Debug scenario duplication found and fixed

A cross-world sweep (comparing every lesson's `writeRun.solutionCode`
against its `debug.fixedCode`) found that **`downTo`'s Debug exercise was
byte-for-byte identical to its own Write & Run solution** (`for (i in 5
downTo 1) { println(i) }; println("Go!")`, both outputting `5 4 3 2 1
Go!`) -- and the broken code's "backwards `..`" bug also duplicated the
lesson's own `card-downto-5` Explore scenario. A learner who completed
Write & Run had already seen the exact fixed answer, and the Explore
example already gave away the bug. Fixed by giving the Debug exercise its
own scenario (a 4-to-0 launch countdown) while keeping the same bug
mechanism (`4..0` instead of `4 downTo 0`). Verified via
`compileAndRunKotlin` and `npm run audit:world4-quality` -- no regressions.
No other lesson in this world had this issue (checked via the same
solutionCode/fixedCode comparison across all 11 lessons).

## Remaining audit work

1. Fix W4-01 (add plain `until` coverage to the Ranges lesson).
2. Author the concept-level activity-ID coverage map per
   `LESSON_QUALITY_STANDARD.md` section 1 -- not done in this pass.
3. Assessment-strength (hardcode resistance): not yet spot-checked for
   World 4.
4. This pass did not perform browser visual QA.

Language references consulted: official Kotlin
[ranges and progressions](https://kotlinlang.org/docs/ranges.html) and
[control flow](https://kotlinlang.org/docs/control-flow.html) docs.
