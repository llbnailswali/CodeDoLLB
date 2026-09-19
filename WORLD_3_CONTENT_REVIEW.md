# World 3 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Verified for correctness and task scope**, with
one coverage/duplication finding and the standard assessment-strength gap
still open. This is the first audit pass.

## Scope and evidence

Reviewed the 9 catalog-linked lessons in Decision Maker (`if`, `if/else`,
`else-if`, `when`, `when` with ranges, `when` as an expression, multiple/
nested conditions, `is` type checks, Boss), covering Learn, Explore,
Predict, Write & Run, Debug, and mastery claims. Source:
`src/data/curriculum/world3LessonsData.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world3_loops.ts`
(`WORLD_3_QUESTIONS`) is themed "Loops & Iterations" -- that's World 4's
topic under the current numbering, not World 3's. It's leftover content
from an old world-numbering scheme, wired only into the legacy free-
standing "Drill" feature (`App.tsx`'s `loops` drill type), not into the
current catalog-linked five-stage lesson flow for `world-3` (Decision
Maker). Excluded from this audit, matching the exclusions in the World 1
and World 2 reviews.

`npm run audit:world3-quality` checks registration, question totals/answer-
key structure, probes all 43 Explore examples, and runs all 36 writeRun/
debug execution assertions. **All pass, with zero open diagnostic defects
and zero example execution gaps** -- this is the first world where the
mechanical audit found nothing broken on the first pass.

## Engine-correctness audit (against PITFALLS.md's documented World 3 limits)

World 3 is exactly the world PITFALLS.md's own "`if`-expression, `when`,
ranges, and `is` checks needed real engine support before World 3" entry
describes, so every example was checked against that entry's documented
limits, not just executed:

- **If-expression scope**: every `if`-as-expression in the file
  (`if/else` lesson, Boss) is single-line and brace-free
  (`val x = if (cond) a else b`). No block-bodied form appears anywhere.
- **`when` scope**: every `when` has a required subject -- no subject-less
  `when { }`. Every branch result is a single line. Range branches use only
  numeric endpoints (`in a..b`, `!in a..b`) -- no char-range branches.
- **The documented if-inside-when gap**: no lesson nests an if-expression
  inside a `when` branch's result (the one combination PITFALLS.md
  documents as broken). `when as an Expression` and the Boss both keep
  `when` and `if`/`&&`/`||` as separate, sequential statements rather than
  nesting one inside the other's branch.
- **`is`/`!is` scope**: only `Int`, `String`, and `Boolean` are ever checked
  with `is`/`!is` (`Type checks with is` lesson) -- `Char` never appears,
  correctly avoiding the documented Char-vs-String indistinguishability
  trap.
- **Smart-cast-like access after `is`**: `if (input is String &&
  input.length > 3)` (card-is-4) relies on accessing `.length` on an
  `Any`-typed value right after an `is String` check. Verified this works
  in the simulator (confirmed by the passing audit run) -- it works as a
  side effect of JS being dynamically typed at runtime, not because the
  engine performs real smart-cast analysis, so this is safe but worth
  knowing if a future example tries something structurally similar with a
  type the engine can't distinguish.

**No correctness or capability defects found.** This is the cleanest world
audited so far -- content was clearly authored with the engine's documented
limits in mind from the start, rather than discovered against them after
the fact.

## Write & Run / Debug task-scope audit (against section 2)

Every task combines at most two concepts, and each pairing is one the
lesson itself teaches as a natural duality, not an arbitrary stitch:

| Lesson | Write & Run scope | Debug scope |
| --- | --- | --- |
| if | Single concept (threshold check) | Single fault (wrong comparison operator) |
| if/else | Two natural forms of the same lesson (if/else as a statement, then as an expression) | Single fault (inverted comparison) |
| else-if | Single concept (grade chain) | Single fault (branches in the wrong order) |
| when | Single concept (day classifier) | Single fault (wrong value placed in a branch) |
| when with ranges | Single concept (grade classifier via ranges) | Single fault (off-by-one range boundary) |
| when as an expression | Single concept (temperature classifier) | Single fault, but see W3-01 below |
| Multiple/nested conditions | Two natural forms of the same lesson (nested outer check + combined && inner condition) | Single fault (a dependent check written as two independent ifs instead of nested) |
| is type checks | Single concept (classify input by type) | Single fault (wrong type checked) |
| Boss | Multiple concepts (when-expression + combined &&/\|\| eligibility) integrated by design -- the sanctioned capstone exception | Two independent faults (when-range order + wrong logical operator) -- see note below |

**Boss debug note**: two unrelated faults in one broken program is, read
literally, outside section 2's "one fault, or one natural interaction
between two" guidance. It's kept here as within the Boss's sanctioned scope
because the hints and explanation address each fault separately and
clearly (not the "incoherent, guesswork" failure mode section 2 warns
about), and the master plan explicitly requires the World Boss to include
"at least one deliberately broken component" testing integrated diagnosis.
Flagged for awareness, not as a required fix.

**W3-01 (coverage/duplication) -- fixed.** `when as an Expression`'s Debug
exercise (`Diagnose the Grade Boundary Bug`, off-by-one lower-bound
exclusion, `in 91..100` instead of `in 90..100`) was nearly identical in
structure to `when with Ranges`'s Debug exercise one lesson earlier, and
tested nothing specific to using `when` as an expression. Replaced with
`Diagnose the Unused Expression Result`: the `when`-expression correctly
computes `grade` and assigns it, but the following `println("Grade:
$score")` interpolates the raw input (`score`) instead of the computed
result (`grade`) -- a bug that only makes sense once you understand the
whole point of the expression form is that it produces a value you then
have to actually use, in contrast to the statement form's per-branch
printing. Broken prints `Grade: 72` (the raw score); fixed prints
`Grade: C` (the computed grade). Verified via `compileAndRunKotlin` and
`npm run audit:world3-quality` (36/36 execution checks still pass), plus
the full World 1/2 regression suite for cross-file safety.

## Mastery-claim spot check

Mastered `verificationItems` were checked against actual Explore/Predict
counts for exercises that state a specific count (e.g. `is` lesson's "4
progressive is/!is patterns" against its 4 Explore cards, `else-if`'s "5
progressive else-if patterns" against its 5 Explore cards). All matched --
no overclaiming found, unlike World 1's original Boss claims before that
world's correction pass.

## Remaining audit work

1. Fix W3-01 (When-as-Expression's duplicated debug scenario).
2. Author the concept-level activity-ID coverage map per
   `LESSON_QUALITY_STANDARD.md` section 1 -- not done in this pass. Current
   counts (4-5 Explore, 4-6 Predict per lesson) look reasonable on
   inspection but haven't been verified against an explicit knowledge-point
   list.
3. Assessment-strength (hardcode resistance, the W1-08/W2-04 class of
   finding): not yet spot-checked for World 3. Every writeRun check is
   still fixed-output string matching.
4. This pass did not perform browser visual QA (rendered code/output/hint
   layout, mobile width).

Language references consulted: official Kotlin
[control flow](https://kotlinlang.org/docs/control-flow.html) and
[type checks and casts](https://kotlinlang.org/docs/typecasts.html) docs.
