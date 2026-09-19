# World 8 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress** -- one engine defect found
and fixed, one severe (100%-of-eligible-lessons) scenario-duplication
finding fixed. This is the first audit pass.

## Scope and evidence

Reviewed the 14 catalog-linked lessons in Object Kingdom (Classes, Objects,
Properties, Methods, Constructors, Primary Constructors, `init`, Visibility
Modifiers, Data Classes, Enums, Basic Inheritance, Interfaces, Overriding
Members, Boss). Source: `src/data/curriculum/world8LessonsData.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world8_coroutines.ts`
(`WORLD_8_QUESTIONS`) is themed "Coroutines & Asynchronous Kotlin" -- that's
World 16's topic under the current numbering. Leftover content from an old
world-numbering scheme, wired only into the legacy `ALL_CURRICULUM_QUESTIONS`
pool, not the current catalog-linked flow. Excluded, matching every prior
world's review.

**Topic-type classification correctly applied**: Visibility Modifiers is
explicitly marked and implemented as a Reasoning-type topic (Learn ->
Explore -> Predict -> Mastered, no Write & Run/Debug), with an inline
comment explaining why: real access-control enforcement is a compile-time-
only concept this simulator has no way to check once a class is transpiled
to a plain JS class, so a graded exercise's "bug" would silently fail to be
caught by the engine -- exactly the failure mode `PITFALLS.md` warns about
repeatedly. This is a deliberate, documented deferral, not a gap.

**Method-body convention correctly followed throughout**: every method body
in this file uses explicit `this.propertyName` for property access, per
the World 8 PITFALLS.md entry's load-bearing scope decision (this engine's
OOP pre-pass has no real lexical scope resolution, so a bare identifier
inside a method body cannot safely be rewritten to `this.name`).

`npm run audit:world8-quality` (created for this pass) checks registration,
catalog `questionsCount` sync, executes all Explore cards, and runs all
Write&Run/Debug solution/starter/broken/fixed pairs through
`compileAndRunKotlin`. All pass: 42 examples, 42 predictions, 52 execution
checks, zero failures.

## Engine defect found and fixed: a class was never type-compatible with the interface it implements

**High -- engine capability, now fixed.** `interfaces-explore-3` -- an
ordinary, correct piece of Kotlin (`fun announce(g: Greetable)` called with
a `Person` implementing `Greetable`) -- failed with `Compilation error:
Type mismatch: expected Greetable, got Person`. Root cause and fix
documented in full in [PITFALLS.md](PITFALLS.md): `kotlinFunctions.ts`'s
loose class/class name-compatibility check only ever consulted a `classes`
set populated by `class` declarations; `interface` declarations were never
added to it, so a class was never recognized as compatible with an
interface it genuinely implements. Fixed by also registering `interface`
names into that same set. Verified via `compileAndRunKotlin` (the exact
call now correctly prints `Hi, I'm Zoe`) and the full existing regression
suite (Worlds 1, 5, 6, 7, lambda-runner, collection-runner, World 11
content, `tsc --noEmit`) -- zero regressions.

## Write & Run / Debug scenario duplication: found and fixed for 100% of eligible lessons

**Severe (content, not engine) -- fixed.** A `writeRun.solutionCode` vs.
`debug.fixedCode` comparison across every lesson in this world found that
**all 12 of the 12 lessons with both stages** had byte-for-byte identical
code between them -- Classes, Objects, Properties, Methods, Constructors,
Primary Constructors, Data Classes, Enums, Basic Inheritance, Interfaces,
Overriding Members, and the Boss. (Visibility Modifiers is the world's
13th lesson but correctly has neither stage, as a Reasoning-type topic --
see above; `init` was the only writeRun/debug-eligible lesson NOT affected,
since its Debug exercise already used a different scenario, "Announce a
Reservation" vs. an out-of-order-`init`-blocks bug on the same class.)

This is the same class of issue already found and fixed in Worlds 4, 5, 6,
and 7 during this session's audit sweep (see those worlds' review files
and `LESSON_QUALITY_STANDARD.md` section 2, which was written specifically
in response to this recurring pattern) -- but at 12/12 (100%) of eligible
lessons, this is the worst instance found in any world so far, worse than
World 6's 9/10.

A learner who completed a lesson's Write & Run task had, in every one of
these 12 lessons, already typed out the exact code Debug would later ask
them to arrive at -- reducing Debug to recognizing what they'd written
minutes earlier instead of independent diagnosis of a fresh scenario.

Fixed all 12 by giving each Debug exercise its own scenario (different
class/variable names, values, and in several cases domain) while
preserving the exact bug mechanism each lesson already taught:

| Lesson | Original scenario (now Write & Run only) | New Debug scenario | Bug mechanism preserved |
| --- | --- | --- | --- |
| Classes | `Book(title, pages)` | `Recipe(name, servings)` | Swapped constructor property order |
| Objects | `AppInfo` singleton | `GameSettings` singleton | Reading an undeclared property |
| Properties | `Account(owner, balance)` | `Tank(label, fuel)` | Subtract instead of add |
| Methods | `Circle.area()` | `Cylinder.volume()` | Missing one multiplication factor |
| Constructors | `Temperature` via `init` | `Invoice` via `init` | Reading `this.param` instead of the bare constructor parameter |
| Primary Constructors | `Song(title, playCount)` | `Episode(title, listens)` | Missing `val` on a primary-constructor parameter |
| Data Classes | `Product(name, price)` | `Ticket(event, price)` | Missing `data` keyword |
| Enums | `Direction(dx, dy)` | `Move(dx, dy)` | Wrong enum constant arguments (duplicate of another constant's values) |
| Basic Inheritance | `Square.area()` override | `Rectangle.perimeter()` override | Wrong/missing operator in an override |
| Interfaces | `Invoice.amount()` via `Payable` | `Order.finalPrice()` via `Discountable` | Unexplained subtraction inside an override |
| Overriding Members | `Circle.area()` via `Shape` | `Rectangle.area()` via `Shape` | Missing `override` entirely, silently falling back to the parent's default |
| Boss | Amy/Ben/Cy roster | Ivy/Omar/Tess roster | Off-by-boundary comparison (`>` vs `>=` at the exact passing threshold) |

Each new scenario was verified individually via `compileAndRunKotlin`
before editing the lesson data. After all 12 edits: a
`writeRun.solutionCode`/`debug.fixedCode` comparison across all of World 8
confirms zero remaining duplicates; `npm run audit:world8-quality` still
passes (42 examples, 42 predictions, 52 execution checks); and the full
cross-world regression suite (Worlds 1, 5, 6, 7, lambda-runner,
collection-runner, World 11 content, `tsc --noEmit`) shows zero
regressions.

## Write & Run / Debug task-scope audit

No overload found. Every task is single-concept, single-fault, including
the Boss (a single off-by-boundary comparison bug, not multiple unrelated
faults). No Debug exercise combines more than one mistake.

## Remaining audit work

1. Author the concept-level activity-ID coverage map per
   `LESSON_QUALITY_STANDARD.md` section 1 -- not done in this pass. In
   particular, worth checking: whether Enums should demonstrate a
   bodiless (no-constructor) enum alongside the constructor-parameterized
   form already shown, and whether Interfaces should show a class
   implementing more than a single-method interface (the current example
   set only ever declares one abstract method per interface).
2. Assessment-strength (hardcode resistance): not yet spot-checked for
   World 8.
3. This pass did not perform browser visual QA.

Language references consulted: official Kotlin
[classes](https://kotlinlang.org/docs/classes.html),
[data classes](https://kotlinlang.org/docs/data-classes.html),
[enum classes](https://kotlinlang.org/docs/enum-classes.html), and
[interfaces](https://kotlinlang.org/docs/interfaces.html) docs.
