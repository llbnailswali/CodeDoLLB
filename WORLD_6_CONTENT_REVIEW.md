# World 6 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress** -- one engine defect found
and fixed, two concrete coverage gaps closed. This is the first audit pass.

## Scope and evidence

Reviewed the 11 catalog-linked lessons in Collection Valley (Arrays, Lists,
Sets, Maps, Mutable vs Read-Only Collections, Creating and Accessing
Collections, Adding/Removing/Updating Mutable Elements, Iterating Over
Collections, Basic Collection Operations, Choosing the Right Collection
Type, Boss). Source: `src/data/curriculum/world6LessonsData.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world6_collections.ts`
(`WORLD_6_QUESTIONS`) is themed "Collections & Functional Kotlin" -- a
differently-scoped legacy world (merging what are now Worlds 6 and 10)
under the old numbering. Wired only into the legacy
`ALL_CURRICULUM_QUESTIONS` pool, not the current catalog-linked flow.
Excluded, matching every prior world's review.

**Notably better authored than World 5**: hand-written (not a rigid
factory), with counts that already vary by topic (3 for simple topics, 4
for `adding-removing-updating` and `basic-collection-operations` before
this pass) -- the "no fixed count" rule was largely already being followed
here, unlike World 5's uniform 3/3 template.

**Topic-type classification correctly applied**: "Choosing the Right
Collection Type" is explicitly marked and implemented as a Reasoning-type
topic (Learn -> Explore -> Predict -> Mastered, no Write & Run/Debug),
with an inline comment citing the master plan's topic-type framework. This
is the first world to explicitly implement that distinction in both code
and commentary, rather than defaulting every lesson to all six stages.

`npm run audit:world6-quality` (created for this pass) checks registration,
question totals/answer-key structure, probes all Explore examples, and
runs all writeRun/debug execution assertions. All pass.

## Engine defect found and fixed: Map had no `.remove(key)`

**High -- engine capability, now fixed.** `mutableMapOf(...).remove(key)`
threw `scores.remove is not a function` -- a previous World 6 fix
(documented in [PITFALLS.md](PITFALLS.md)'s "Finishing World 6" entry)
added `.remove(item)` to `mutableSetOf` results, but the equivalent was
never added to `mutableMapOf`. This is completely ordinary Kotlin
(`MutableMap.remove(key)`), and the gap had gone unnoticed because no
lesson content had ever exercised Map removal -- see the coverage finding
below for why. Fixed by giving `mutableMapOf`'s result its own
`.remove(key)`, delegating to `Map.prototype.has/get/delete` (returning the
removed value or null, matching Kotlin's own semantics) rather than JS's
differently-behaved native `.delete`. Scoped so a read-only `mapOf(...)`
still correctly has no `.remove` at all. Verified via `compileAndRunKotlin`
and the full existing test suite (all 6 worlds' audit scripts,
lambda-runner, collection-runner, World 11 content, `tsc --noEmit`) -- zero
regressions.

## Coverage findings, fixed

**Set/Map removal was never taught anywhere.** The "Adding, Removing &
Updating Mutable Elements" lesson -- whose own title and master-plan topic
name are collection-generic, not List-specific -- only ever demonstrated
List's `add`/`remove`/`removeAt`/`[] =`. Sets lesson demonstrated `add` but
never `remove`; Maps lesson demonstrated `[] =` for updates but never
`remove(key)`. This meant a fundamental, commonly-needed operation (undoing
an entry) was absent for two of the world's four collection types, and is
exactly what let the engine gap above go undetected. Fixed by adding two
Explore cards + two Predict questions to the mutation lesson: `mutableSetOf
(...).remove(value)` and `mutableMapOf(...).remove(key)`, plus updating the
Learn section's key ideas to state the Map-removes-by-key vs.
List/Set-remove-by-value distinction explicitly. Catalog `questionsCount`
updated 4 -> 6.

**`contains()` was only ever shown on a Set.** `.contains()` works
identically on `List`/`Set`/`Array` in this engine (per the original
"Finishing World 6" work), but Lists' own lesson never demonstrated it, and
neither did "Basic Collection Operations" -- the lesson explicitly about
operations shared *across* collection types, where this omission was most
conspicuous. Fixed by adding an Explore card + Predict question showing
`.contains()` on a `List`, explicitly framed as "the same `contains` you
may have already seen on a Set." Catalog `questionsCount` updated: Explore
3 -> 4, Predict 4 -> 5.

Both additions verified via `compileAndRunKotlin` and `npm run
audit:world6-quality` (now 37 examples / 39 predictions, all 40 execution
checks passing), plus the full 5-world regression suite.

## Write & Run / Debug task-scope audit

No overload found. Every task is single-concept, single-fault, including
the Boss (a single off-by-boundary comparison bug, not multiple unrelated
faults like World 3's Boss). The Boss's multi-collection integration (List
+ mutable Map + loop) is the sanctioned capstone exception.

**Update (2026-09-19): severe scenario-duplication finding, fixed.** A
cross-world sweep (comparing every lesson's `writeRun.solutionCode` against
its `debug.fixedCode`) found that **9 of this world's 10 writeRun/debug
lessons had byte-for-byte identical Debug fixed code and Write & Run
solution code** -- Arrays, Lists, Sets, Maps, Mutable vs Read-Only
Collections, Creating and Accessing Collections, Iterating Over
Collections, Basic Collection Operations, and the Boss. Only `Adding,
Removing & Updating Mutable Elements` was unaffected. This meant a learner
who completed a lesson's Write & Run task had, in every other lesson, just
typed the exact fixed code Debug would later ask them to arrive at --
Debug was reduced to recognizing what they'd already written minutes
earlier, not independent diagnosis. Fixed all 9 by giving each Debug
exercise its own scenario (different variable names, values, and domain)
while preserving each bug's original mechanism (wrong index, duplicate
Set value, wrong Map key, `listOf` instead of `mutableListOf`, wrong
`get()` index, overwrite-instead-of-accumulate, missing `sorted()`, and
the Boss's off-by-boundary comparison). Verified via `compileAndRunKotlin`
and `npm run audit:world6-quality` (37 examples / 39 predictions, 40
execution checks, all passing) -- no regressions.

## Remaining audit work

1. Author the concept-level activity-ID coverage map per
   `LESSON_QUALITY_STANDARD.md` section 1 for the remaining 9 lessons --
   only the two touched by this pass have been checked against an explicit
   knowledge-point list so far. Candidates worth checking next: whether
   Arrays lesson should demonstrate `for`-loop iteration directly (the
   Iterating lesson's Learn text mentions Array iteration works but never
   shows it), and whether Maps should show `getOrDefault`-style safe
   lookups given a missing key currently returns null with no taught way
   to handle it gracefully within this world (Null Safety is World 7).
2. Assessment-strength (hardcode resistance): not yet spot-checked.
3. This pass did not perform browser visual QA.

Language references consulted: official Kotlin
[collections overview](https://kotlinlang.org/docs/collections-overview.html)
and [map-specific operations](https://kotlinlang.org/docs/map-operations.html) docs.
