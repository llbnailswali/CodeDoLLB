# World 5 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress** -- one severe engine defect
found and fixed, the coverage map completed and every identified gap closed
for all 9 lessons. Not marked Verified: hardcode-resistance assessment
checks and browser visual QA (section 4/5 of the standard) have not been
performed for this world.

## Scope and evidence

Reviewed the 9 catalog-linked lessons in Function Forge (Defining
functions, Function parameters, Return values, Default parameters, Named
arguments, Single-expression functions, Local functions, `vararg`, Boss).
Source: `src/data/curriculum/world5LessonsData.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world5_oop.ts`
(`WORLD_5_QUESTIONS`) is themed "Classes & Object-Oriented Kotlin" -- that's
World 8's topic ("Object Kingdom") under the current numbering. Leftover
content from an old world-numbering scheme, wired only into the legacy
`ALL_CURRICULUM_QUESTIONS` pool, not the current catalog-linked flow.
Excluded, matching every prior world's review.

**Structurally different from Worlds 1-4**: this file is a thin
`makeLesson(config)` factory (331 lines total for 9 lessons, vs.
2000-3000+ lines per world previously) that mechanically generates exactly
3 Explore cards, 3 Predict questions, 1 Write & Run, and 1 Debug for every
lesson regardless of topic complexity. This predates
`LESSON_QUALITY_STANDARD.md` and directly conflicts with its core rule
("There is no fixed count, minimum or maximum for any stage") -- see the
Findings section.

`npm run audit:world5-quality` (created for this pass) checks registration,
question totals/answer-key structure, probes all 27 Explore examples, runs
all 36 writeRun/debug execution assertions, and 3 new output-correctness
checks added during this pass. All pass now; they did **not** all
meaningfully pass before the fix below, because the pre-existing check only
verified success, not correctness.

## Engine defect found and fixed: named arguments silently reordered wrong

**W5-01 (High -- engine capability, now fixed).** The Named Arguments
lesson's own Explore cards (`move(y = 4, x = 2)`, `color(red = 255, green =
120, blue = 0)`, etc.) ran without error but printed the **wrong values**:
`move(y = 4, x = 2)` printed `4, 2` instead of the correct `2, 4` --
`kotlinFunctions.ts` was treating the written order of named arguments as
plain positional order, completely ignoring the `x =`/`y =` labels, rather
than reordering by name (or failing loudly, which would at least have been
honest). This is precisely the "plausible-looking wrong answer" failure
class this project's `PITFALLS.md` is built to prevent, and it slipped past
detection because the audit script only checked that Explore cards ran
*successfully*, never that their output was correct.

Root cause and fix documented in full in [PITFALLS.md](PITFALLS.md). In
short: the reordering logic already existed but was gated to fire only for
two hardcoded collection helpers (`windowed`/`chunked`); it now also
activates for ordinary user-defined functions, using the callee's own
declared parameter names as the reordering key. Verified against reordered
args, labeled same-type args, mixed positional+named args, and a named call
omitting a defaulted parameter -- all now match real Kotlin. Verified zero
regressions across the full existing test suite (Worlds 1-4's audit
scripts, lambda-runner, collection-runner, World 11 content, `tsc
--noEmit`).

Added 3 output-correctness spot checks to `audit-world5-quality.ts`
specifically for this lesson, since "runs without throwing" was exactly the
blind spot that let the bug through.

## Coverage findings (against the fixed-count authoring pattern)

**W5-02 (now stale content following the W5-01 fix) -- fixed.** The Named
Arguments lesson's Write & Run and Debug both explicitly avoided named-
argument syntax with disclaimers ("The simulator does not execute named
arguments. Define a multi-parameter function and call it positionally.")
-- accurate advice when written, but factually outdated once W5-01 fixed
the underlying gap. Rewrote both:
- **Write & Run** (`Call a Function Using Named Arguments`) now requires an
  actual reordered named-argument call: `schedule(hour = 9, day =
  "Monday")` against `fun schedule(day: String, hour: Int)`, printing
  `Monday at 9`.
- **Debug** (`Fix the Mislabeled Coordinates`) is now a genuine named-
  argument bug: `position(x = 5, y = 2)` has the right labels but the wrong
  values swapped under them, printing `5,2` instead of the intended `2,5`
  -- a mistake that's only possible to make (and only meaningful to debug)
  once named arguments actually work.
- Removed the now-false "does not transpile named arguments" claim from
  the Learn `explanation` text.

Verified via `compileAndRunKotlin` and `npm run audit:world5-quality`,
including 3 dedicated output-correctness checks added for this lesson.

**W5-03 (systemic, "no fixed count" rule) -- two concrete gaps fixed, the
systemic pattern remains open.** Every lesson in this world has exactly 3
Explore / 3 Predict / 1 Write & Run / 1 Debug via the `makeLesson` factory,
regardless of topic complexity -- directly contradicting
`LESSON_QUALITY_STANDARD.md` section 1. This world was very likely authored
before that standard existed (its uniform shape is the "5-6 examples" era
pattern the standard explicitly superseded, just with the number 3 instead
of 5-6).

Fixed the two concrete gaps identified in the first pass:
- **Function parameters**: added a 4th Explore card + Predict question
  passing a **variable** as an argument (`val playerName = "Maya";
  greet(playerName)`) -- every prior example passed a literal directly.
  Catalog `questionsCount` updated 3 -> 4.
- **`vararg`**: added a 4th Explore card + Predict question combining a
  required leading parameter with a trailing vararg (`fun greetAll(prefix:
  String, vararg names: String)`) -- every prior example was vararg-only.
  Catalog `questionsCount` updated 3 -> 4.

Both verified via `compileAndRunKotlin` and `npm run audit:world5-quality`.

**Update, same day: three more gaps closed.**
- **Return values**: added a Boolean-returning example (`isAdult(age: Int):
  Boolean`) -- every prior example returned Int or String, never Boolean.
- **Default parameters**: added a two-default-parameters example, overriding
  only the first (`order(item, quantity = 1, expressShipping = false)`
  called as `order("Pen", 3)`) -- every prior example had only one default.
- **Named arguments**: added an example using a named argument specifically
  to target a *later* default while skipping an earlier one
  (`order("Pen", expressShipping = true)`) -- the natural, powerful reason
  to reach for named arguments once defaults exist, not yet demonstrated.
  This legitimately builds on Default Parameters, which the master plan's
  own topic order places immediately before Named Arguments in this world.

All three verified via `compileAndRunKotlin` and `npm run
audit:world5-quality` (now 32 examples / 32 predictions, all 36 execution
checks + 3 named-argument correctness checks passing). Catalog
`questionsCount` updated for all three lessons (3 -> 4). Full Worlds 1-4 +
engine test-suite regression run confirmed no side effects.

**Update, same day: coverage map completed for all 9 lessons.** Checked
`defining-functions`, `single-expression-functions`, `local-functions`, and
`boss` (the four not yet reviewed) against an explicit knowledge-point list
each:

- **Defining functions**: had no example of calling a top-level function
  declared *later* in the file -- a common beginner surprise (expecting
  Kotlin to need forward declarations, the way some languages do). Added an
  Explore card and Predict question demonstrating this.
- **Single-expression functions**: had never combined the `=` syntax with
  an if-expression body (`fun max(a, b) = if (a > b) a else b`) -- a very
  idiomatic, everyday combination of this lesson with World 3's
  if-expressions. Added an Explore card and Predict question.
- **Local functions**: reviewed against its own knowledge points (a basic
  helper, closing over an outer value, improving readability) and found
  adequately covered for the topic's actual scope -- no addition made, to
  avoid padding a topic that is genuinely this narrow.
- **Boss**: added a named-argument call to the capstone (`greeting(name =
  "Kai")` in Explore, a two-parameter named/reordered call in Predict) --
  the only one of the world's 8 concepts the capstone previously never
  touched at all, even though it is a fully working capability after W5-01.

All four verified via `compileAndRunKotlin`. Catalog `questionsCount`
updated for the three expanded lessons (3 -> 4 each; `local-functions`
unchanged at 3). Final state: 35 examples / 35 predictions across the
world, all 36 execution checks + 3 named-argument correctness checks
passing, full Worlds 1-4 + engine test-suite regression run clean, `tsc
--noEmit` clean.

This closes every finding raised in this review (W5-01 through W5-03) and
completes the "no fixed count" coverage-map requirement for World 5.
Remaining open items match every other audited world: hardcode-resistance
spot checks (the W1-08/W2-04 class of finding) and browser visual QA have
not been performed for this world.

## Update (2026-09-19): Write & Run / Debug scenario duplication found and fixed

A cross-world sweep (comparing every lesson's `writeRun.solutionCode`
against its `debug.fixedCode`) found **three lessons whose Debug fixed
code was byte-for-byte identical to their own Write & Run solution**:
`single-expression-functions` (`minutesToSeconds`/`* 60`), `local-functions`
(`format`/`"User: $name"`), and `vararg` (`sumScores`/`5, 10, 15`). In each
case a learner who finished Write & Run had already typed the exact
answer Debug expected. Fixed all three by giving each Debug exercise its
own scenario (`hoursToMinutes`, `announce`/title, `sumPoints`/`4, 8, 12`)
while keeping the same bug mechanism (wrong multiplier, ignored parameter,
`=` instead of `+=`). Verified via `compileAndRunKotlin` and `npm run
audit:world5-quality` -- no regressions. The other 6 lessons in this world
did not have this issue.

## Write & Run / Debug task-scope audit

No overload found -- every task is single-concept, single-fault. This is
the one dimension where the template's uniformity is actually harmless:
one function-behavior-per-lesson, one matching bug, cleanly scoped.

## Remaining audit work

1. Fix W5-02 (bring Named Arguments' Write & Run/Debug up to date with the
   now-working capability).
2. Fix W5-03: build the concept-level coverage map for all 9 lessons and
   expand Explore/Predict per lesson to match actual topic complexity --
   the largest remaining content gap of any world audited so far.
3. Assessment-strength (hardcode resistance): not yet spot-checked.
4. This pass did not perform browser visual QA.

Language references consulted: official Kotlin
[functions](https://kotlinlang.org/docs/functions.html) docs, specifically
the named-arguments and default-arguments sections.
