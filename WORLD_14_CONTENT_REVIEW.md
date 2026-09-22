# World 14 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-21. Status: **Verified** (execution/coverage correctness
only) — all 13 lessons. This audit did NOT include a
[LESSON_CLARITY_STANDARD.md](LESSON_CLARITY_STANDARD.md) pass — that
remains queued for the later, batch clarity audit across all worlds, per
explicit direction this session.

## Result

World 14 (Sequence Dimension) content existed in `world14LessonsData.ts`
from a prior sync commit with **zero** prior engine support for its topic:
this simulator had no support at all for `Sequence`, `sequenceOf`,
`generateSequence`, `.asSequence()`, or any lazy-evaluation machinery
before this session. Every activity that exercises the topic — the entire
world — would have failed at runtime.

Unlike several earlier synced worlds, this one's content was unusually
carefully authored: every Explore card and Predict question is pre-labeled
`verified-by-real-kotlin`, `conceptual-real-kotlin-required`, or
`deferred-by-capability`, anticipating exactly the kind of engine gaps
this audit exists to catch. That discipline meant almost every gap found
here was a genuine missing capability, not a wrong content claim.

| Lesson | Write & Run | Debug |
| --- | --- | --- |
| What sequences are | Passes | Passes |
| Eager collection processing | Passes | Passes |
| Lazy processing | Passes | Passes |
| Creating sequences | Passes | Passes |
| `asSequence()` | Passes | Passes |
| Intermediate operations | Passes | Passes |
| Terminal operations | Passes | Passes |
| Sequence evaluation order | Passes | Passes |
| Short-circuiting | Passes | Passes |
| Sequences vs collections | Passes | Passes |
| Performance trade-offs | Passes | Passes |
| When sequences should and should not be used | Passes | Passes |
| Boss (Large Dataset Processor) | Passes | Passes |

## Engine capability added

**A real, generator-backed `KotlinSequence` class** (`src/utils/kotlinCollections.ts`),
the largest addition: `map`/`filter`/`take`/`takeWhile`/`drop` each wrap
the upstream iterable in a fresh JS `function*`, so pulling one element
from the outermost generator naturally pulls exactly one element through
every intermediate stage before the next source element is requested --
this is what gives genuine element-by-element evaluation order (verified
against the lesson's own expected traces: `filter` then `map` prints F1,
M1, F2, M2, ..., never a whole filter pass before any map), not just a
correct final materialized result. Terminal operations
(`toList`/`first`/`find`/`count`/`fold`/`forEach`/`any`/`all`/`none`/`sum`)
each guard their own iteration count independently of the transpiled-loop
`__kt_check_loop` mechanism (which only instruments actual Kotlin
`while`/`for` loops) -- a synchronous `for...of` draining an unbounded
generator would otherwise block the single JS thread forever, with no
external timeout able to preempt a loop that never yields control back to
the event loop.

**Single-use vs. reusable semantics**, matching real Kotlin exactly:
`sequenceOf`, a seeded `generateSequence(seed) { next }`, and an
`Iterable.asSequence()` are reusable (each fresh iteration recomputes
correctly); the no-seed `generateSequence { next }` overload and a bare
`Iterator.asSequence()` are single-use, throwing `"This sequence can only
be iterated once."` on a second traversal -- confirmed against real
Kotlin's own documented behavior for that overload, not guessed.

**The `sequence { yield(1); yieldAll(listOf(2, 3)) }` builder**, handled
via a new `protectSequenceBuilders` protect-and-restore pass (mirroring
the existing `protectLazyBlocks` pattern): the block is replaced with a
placeholder before `lowerKotlinFunctions` ever tokenizes the source (its
lambda lowering has no concept of `yield`), then restored -- transformed
into `new Sequence(function* () {...}, false)`, with `yieldAll(x)`
rewritten to `yield* (x)` (`yield(x)` is already valid JS as-is, a plain
parenthesized operand of the `yield` keyword) -- immediately after, so the
block's own inner Kotlin still flows through every later transform
normally.

**Standalone range values as expressions** (`(1..100).asSequence()...`,
`val source = 1..100`), previously entirely unsupported (`1..100` used as
a bare value is not valid JS and wasn't handled outside a for-loop
header): added `__kt_range(a, b)`, returning a real, reusable `KotlinList`
so every existing List operation and the new `.asSequence()` work on it
for free. Two narrow regex forms cover the lesson's actual usages: wrapped
in parens (`(a..b)`, required whenever chaining a method off it) and a
bare range as a whole assignment RHS (`= a..b` at end of line).

**`is Sequence<Int>` / `is List<Int>`**: extended `transformTypeChecks`'s
generic-suffix handling (already erasing `<...>` elsewhere in the engine)
and exposed `Sequence`/`List` as real globals resolving to
`KotlinSequence`/`KotlinList` for `instanceof`.

**`.take()`/`.drop()`/`.takeWhile()`/`.dropWhile()` on `KotlinList`
itself** (not just `KotlinSequence`) -- World 14's whole premise is
comparing the SAME operation names in eager vs. lazy form, and the eager
half needed these as real `Iterable` methods too.

**`.takeIf`/`.takeUnless`**, added to `Object.prototype` alongside World
13's `let`/`run`/`also`/`apply` (needed by the Creating Sequences lesson's
single-use-boundary example, `(n--).takeIf { it > 0 }`) -- no signature
registration needed in `kotlinFunctions.ts`, since its generic
trailing-lambda lowering already defaults an unregistered call name to an
`it`-bound lambda.

## Two pre-existing bugs this world's content surfaced (not new features)

**A JS automatic-semicolon-insertion hazard**: `let c = 0` (no trailing
`;`, since Kotlin never requires one) immediately followed by a statement
starting with `(` gets misparsed by JS as ONE statement, `let c =
0(...)`, calling the number `0` as a function (`0 is not a function`) --
this could not have surfaced before World 14, since nothing previously
produced a bare parenthesized expression statement immediately after a
literal-initialized declaration; the new standalone-range support is
exactly that shape. Fixed narrowly: a declaration whose RHS is a bare,
self-contained literal (never a multi-line chain's own first line) now
gets an explicit trailing `;` appended.

**`KotlinList` had no real `.equals()` method**, so `__kt_equals`
(backing every `==` comparison) silently fell back to reference equality
for two structurally-identical-but-distinct Lists (`listOf(1,2,3).map{...}
== listOf(1,2,3).asSequence().map{...}.toList()` printed `false` instead
of `true`) -- despite `KotlinList`'s own internal `equal()` helper already
implementing correct structural comparison and being used by
`.contains()`/`.distinct()` internally the whole time. This is exactly
the kind of "plausible-looking wrong answer" this codebase's own pitfalls
file warns about repeatedly, caught only because World 14's own
Sequences-vs-Collections lesson happens to compare two Lists built two
different ways -- no prior lesson's graded content did that. Fixed by
adding a real `.equals()` delegating to the same `equal()` helper.

## Verification

- `npm run test:world14-content` (new script, `197` checks): every
  Explore card, every Predict question (skipping the handful that are
  deliberately conceptual-only, code-as-comment performance-reasoning
  questions with nothing to execute, and correctly requiring a thrown
  error rather than success for the one question whose own correct answer
  IS "throws IllegalStateException"), every Write & Run solution/starter
  pair, and every Debug fixed/broken pair.
- Full cross-world regression, zero failures: `npm run test:lambda-runner`
  (80), `npm run test:collection-runner` (31+5+20), `npm run
  test:world11-content` (56), `npm run test:world12-runner` (6), `npm run
  test:world13-content` (158), `npm run audit:output-quotes` (49 blocks),
  `npm run audit:dash-collision` (0 findings), `npx tsc --noEmit`, `npm
  run build`.

## Content bugs found and fixed (catalog metadata, not lesson prose)

- Stale `questionsCount` (all `4`) across all 13 World 14 catalog rows in
  `masterCurriculumCatalog.ts` -- same recurring pattern as every other
  synced world (12, 13) audited so far.
- **A real id mismatch**, not just staleness: the "When sequences should
  and should not be used" lesson's catalog `id`/`fiveStageLessonKey` and
  its `lessonStagesData.ts` registration key were all truncated to
  `world-14-when-sequences-should-and-should-not-be-` (missing "used"),
  while the lesson object's OWN internal `id` field was the full,
  untruncated string. Anything keying off the lesson's own `.id` (e.g.
  progress tracking) vs. the catalog/registry key would have silently
  diverged for this one lesson. Fixed by renaming the catalog id and
  registration key to the full, correct string.

## Scope not covered by this pass

- `LESSON_CLARITY_STANDARD.md`'s readability/confusion/dash-collision/
  generic-subtitle checks -- deferred, per explicit direction, to a later
  batch pass across all worlds.
- Browser visual QA and a real-Kotlin-compiler comparison, matching every
  other world's review file's disclosed scope in this environment.
