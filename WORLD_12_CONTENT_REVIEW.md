# World 12 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-20. Status: **Verified** — all 15 lessons.

## Result

Every World 12 (Generic Realm) lesson's Write & Run and Debug stages now
execute correctly through the real teaching-runner engine
(`compileAndRunKotlin` in `src/utils/kotlinRunner.ts` and
`src/utils/kotlinFunctions.ts`), and every lesson's Learn/Explore/Predict
code content has been reformatted to meet
[LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md) section 4's
formatting rule.

| Lesson | Write & Run | Debug |
| --- | --- | --- |
| Generic Classes | Passes | Passes |
| Generic Functions | Passes | Passes |
| Type Parameters | Passes | Passes |
| Generic Constraints | Passes | Passes |
| Multiple Constraints | Passes | Passes |
| `in` Variance | Passes | Passes |
| `out` Variance | Passes | Passes |
| Invariance | Passes | Passes |
| Declaration-site Variance | Passes | Passes |
| Use-site Variance | Passes | Passes |
| Star Projections | Passes | Passes |
| Reified Type Parameters | Passes | Passes |
| Type Aliases | Passes | Passes |
| Type-safe Generic APIs | Passes | Passes |
| Boss (Generic Data Toolkit) | Passes | Passes |

Zero lessons are capability-gated. Getting here required both new engine
capability and a number of content fixes -- both are itemized below.

## Engine capability added to `src/utils/kotlinRunner.ts` / `src/utils/kotlinFunctions.ts`

New, previously entirely unsupported constructs:

- **Star Projections (`List<*>`)**: `cleanKotlinParams`'s type-annotation
  character class never included `*`. Since the whole match is anchored,
  a type it can't fully consume doesn't partially match -- the ENTIRE
  parameter (name included) was silently dropped, not just its type,
  producing a function with a missing parameter and a confusing
  `x is not defined` at runtime with no connection to the real cause.
  One-character fix (`*` added to the class).
- **Reified type parameters** (`inline fun <reified T> f(...) = value is T`):
  this engine has no per-call-site inlining/specialization mechanism, so
  building true reification was rejected as disproportionate. Instead, a
  new whole-source pre-pass, `transpileReifiedFunctions`, turns the
  reified type parameter into an ordinary runtime parameter carrying the
  type NAME as a plain string, rewrites `value is T` into a call to a new
  runtime helper (`__kt_isReifiedType`, added alongside `__kt_notNull` and
  threaded through the sandbox the same way), and rewrites every call
  site's explicit type argument (`isType<String>(x)` -> `isType(x,
  "String")`) so the type name flows in as a real argument instead of
  being erased. Scoped narrowly: single-line, single-expression-body
  declaration, one reified parameter, and a call site's type argument
  must be a single bare name -- see the dedicated PITFALLS.md entry for
  the two separate failures this replaced (a comparison-syntax misparse
  at the call site, and an undefined-identifier crash in the body).
- **Generic supertype parsing** (`class X : Interface<Arg> { ... }`,
  `object X : Interface<Arg> { ... }`, `interface Logger<in T> { ... }`):
  none of `transpileInterfaceDeclarations`, `classRe`, or the separate
  `objectInterfaces` capture regex allowed a `<...>` generic argument in
  the position they needed to for World 12's variance lessons -- every one
  either failed to parse the declaration at all, or leaked the `<Arg>{...}`
  tail through as unparseable trailing text. This benefits every world,
  not just 12: it retroactively fixed a **previously undetected, silently
  broken bug in World 11's own Boss lesson**
  (`object UserFormatter:Formatter<User>{...}`), never caught by World
  11's own audit because that specific Explore card is labeled
  `'Behavior'`, not `'Output'`, so it was never exact-execution-checked.
- **Real generic-argument inference for constructor calls.** Previously, a
  declared type kept its full `<Arg>` text (e.g. `Box<Int>`) but a
  constructor call's inferred type never carried any argument at all
  (`Box("seven")` inferred as bare `Box`) -- so a genuinely matching
  invariant generic assignment (`val b: MutableBox<String> =
  MutableBox("draft")`) was wrongly rejected as a type mismatch, while a
  genuinely mismatched one (`val b: Box<Int> = Box("seven")`, which one
  Predict question in Generic Classes relies on being flagged) only
  happened to be rejected by accidental string-shape coincidence, not real
  type comparison. Fixed properly: added `classTypeParams` (tracking a
  class's own declared type parameter names) and fixed constructor
  registration to actually run for a generic class (it silently never ran
  before, for ANY generic class), then infer the real instantiated type
  from the actual constructor argument for the common single-type-parameter
  case. Both the false rejection and the accidental-pass-for-the-wrong-
  reason are now correct for the right reason.
- **Use-site variance base-name comparison.** `Array<in String>` correctly
  stripped to a bare `Array` once recognized, but the actual argument
  passed at a call site (e.g. `val a: Array<Any>`, no variance keyword of
  its own) kept its full bracketed name, so a valid call was rejected on a
  string mismatch unrelated to any real type error. Fixed with a narrow
  fallback: compare base names (text before `<`) for a fixed set of
  built-in generic collection types (`Array`, `List`, `MutableList`,
  `Set`, `MutableSet`, `Map`, `MutableMap`, `Pair`) that this engine has no
  real generic-argument tracking for anyway.
- **Generic function type-parameter names generalized beyond `T`/`R`.**
  `compatible()` hardcoded exactly the two literal names `T` and `R` as
  always wildcard-compatible; a function declared with any other name
  (`fun <A, B> transform(v: A, f: (A) -> B): B = f(v)`, used by the Boss
  lesson) had its parameter type compared literally against a real
  argument type and always failed. Fixed by having `header()` capture
  whatever type parameter names a function actually declares into a
  shared `genericTypeParamNames` set, consulted by `compatible()` instead
  of the two hardcoded literals.
- **`where T : X, T : Y` clause stripping**: compile-time-only constraint
  metadata with no runtime meaning was previously glued onto the return
  type with no whitespace, corrupting both the type and the function body
  that followed it. Erased before any other transform runs.
- **`insertNewForInstantiation` string-literal safety** (a general fix,
  not World-12-specific, found while building the above): this pass
  blindly inserted `new` before every `ClassName(` occurrence in the whole
  source with no awareness of whether the match sat inside an actual
  instantiation or inside an unrelated string literal that merely
  contained the same text. Fixed to only replace in non-string chunks of
  each line.

Full detail and root-cause writeups for every item above are in
[PITFALLS.md](PITFALLS.md) under the "World 12" entries.

None of the above changes altered the transpiler's treatment of anything
verified working before this pass -- every fix was scoped to the specific
syntax shape it targets, and the full regression suite (all 11 other
audited worlds, the lambda/function-engine tests, the collection-engine
tests, `tsc --noEmit`) was re-run after each meaningfully sized change and
passes with zero regressions.

## Content fixes in `src/data/curriculum/world12LessonsData.ts`

1. **Nine Debug exercises redesigned from an unreproducible `bugType:
   'type'` bug into a reproducible `bugType: 'logic'` bug**, per the
   standing PITFALLS.md rule that this engine has no real type system --
   a debug exercise relying purely on a type-declaration difference
   (rather than a difference in actual values/logic) often produces
   IDENTICAL output for both "broken" and "fixed" code, auto-passing with
   zero edits. Affected: Generic Classes (hardcoded placeholder instead of
   the real generic value), Type Parameters (key/value read in swapped
   order), Generic Constraints (wrong markup multiplier), Multiple
   Constraints (off-by-one on a guaranteed property), `in` Variance,
   `out` Variance, Declaration-site Variance, Use-site Variance (each:
   hardcoded placeholder instead of the real consumed/produced/read
   value), and Star Projections (hardcoded placeholder instead of the
   real list size). Reified Type Parameters' debug exercise was left as
   `bugType: 'type'` since it is now genuinely reproducible for the
   right reason (an ordinary, non-reified `<T>` function's `is T` check
   fails to compile/run at all, while the reified version succeeds) --
   not every `type` bug needs converting, only ones that were silently
   unreproducible.
2. **Multiple Constraints' Write & Run/Debug had no `main()` call and an
   empty `expectedOutput`** before this pass -- a genuine content bug (the
   function was declared but never invoked, so there was nothing to
   compare) found and fixed alongside the debug redesign above.
3. **Generic Constraints' original debug `expectedOutput` was ugly
   floating-point noise** (`110.00000000000001` from a `1.1` "tax"
   multiplier) -- switched to a `1.5` "markup" framing, verified to
   produce clean `150.0`/`100.0` values with no floating-point artifacts.
4. **Two semicolon-crammed single-line class bodies**, the exact
   recurring pattern documented in PITFALLS.md ("lesson code arrays must
   be properly formatted, not semicolon-crammed"): Type-safe Generic
   APIs' `MemoryStore` and the Boss's `DataStore` both failed with
   `Unexpected identifier 'items'` until reformatted across real lines --
   `splitClassMembers` only recognizes a new member at the start of a
   physical line, so every member after the first on a `;`-joined line
   was invisible to it.
5. **Stale catalog metadata**: `masterCurriculumCatalog.ts`'s
   `questionsCount` field for every one of World 12's 15 lessons was out
   of sync with the lessons' actual authored `predict.questions.length`
   (e.g. catalog said 4 where the real count was 6, 7, or 8) -- the same
   class of drift already found and fixed in World 11. Corrected all 15
   entries to match the real counts.

## Formatting pass (LESSON_QUALITY_STANDARD.md section 4)

All 15 lessons' `learn.codeSnippet`, every `explore.cards[].code`, and
every `predict.questions[].code` array, plus every `writeRun`/`debug`
`initialCode`/`solutionCode`/`brokenCode`/`fixedCode` string, were
reformatted into properly spaced, multi-line Kotlin (class/interface
bodies split across real lines, consistent 4-space indentation, blank
lines separating top-level declarations, spaced `:`/`,`/operators, `where
T : X, T : Y` bound-colon spacing matching real Kotlin style). One
predict question (Multiple Constraints predict-3) intentionally
illustrates INVALID double-bound syntax (`fun <T : A : B> use(v: T) {}`)
to test recognition of the mistake -- the illustrated error itself was
preserved verbatim; only its surrounding spacing was cleaned up.

Every `writeRun.solutionCode`/`debug.brokenCode`/`debug.fixedCode` was
re-verified via `compileAndRunKotlin` after reformatting to confirm
byte-for-byte identical output to before the formatting pass -- this is a
whitespace-only change, never a behavior change.

## Scope and evidence

Reviewed all 15 catalog-linked lessons in Generic Realm:
1. `world-12-generic-classes` (Generic Classes)
2. `world-12-generic-functions` (Generic Functions)
3. `world-12-type-parameters` (Type Parameters)
4. `world-12-generic-constraints` (Generic Constraints)
5. `world-12-multiple-constraints` (Multiple Constraints)
6. `world-12-in-variance` (`in` Variance)
7. `world-12-out-variance` (`out` Variance)
8. `world-12-invariance` (Invariance)
9. `world-12-declaration-site-variance` (Declaration-site Variance)
10. `world-12-use-site-variance` (Use-site Variance)
11. `world-12-star-projections` (Star Projections)
12. `world-12-reified-type-parameters` (Reified Type Parameters)
13. `world-12-type-aliases` (Type Aliases)
14. `world-12-type-safe-generic-apis` (Type-safe Generic APIs)
15. `world-12-generic-data-toolkit-boss` (Boss: Generic Data Toolkit)

Source: `src/data/curriculum/world12LessonsData.ts`.

**Audit execution results:**
- 15 catalog lessons structurally verified
- 93 Explore cards and 93 Predict questions across all 15 lessons
- 60 Write & Run / Debug execution checks (starter unfinished, solution
  success, broken Debug failure, repaired Debug success) across all 15
  lessons, all passing
- Zero capability-gated activities remain

## Write & Run / Debug scenario independence

Per `LESSON_QUALITY_STANDARD.md` section 2, a Debug stage's `fixedCode`
must never duplicate the lesson's Write & Run `solutionCode`. Every Debug
challenge in World 12 uses independent variable names, literal values, and
expected outputs while preserving the core mechanism being taught:

| Lesson | Write & Run scenario | Debug scenario | Bug mechanism diagnosed |
| --- | --- | --- | --- |
| Generic Classes | `ResultBox("Success")`, `ResultBox(200)` | `Wrapper<T>(42).show()` | Hardcoded placeholder instead of the real generic value |
| Type Parameters | `Cell("level", 12)` | `Cell("id", 42).describe()` | Key/value read in the wrong order |
| `in` Variance | `Logger<in T>` + `AnyLogger` + `"Saved"` | `Receiver<in T>` + `UniversalReceiver(7)` | Hardcoded placeholder instead of the real consumed value |
| Use-site Variance | `Array<in String>` + `putText` + `"Ready"` | `Array<out Int>` + `firstDoubled` | Hardcoded placeholder instead of the real read value |
| Boss | `DataStore<Int>` + `transform` returning `"value=20"` | `SingleCache<T>` returning `Any` instead of `T` | Widening a generic return type to `Any` discards the type relationship, forcing an unsafe cast at the call site |

## Verification commands

- `npx tsx scripts/_scratch-audit-w12.ts`: full Write & Run/Debug
  execution harness across all 15 lessons (kept as a reusable script for
  future re-verification, unlike the deleted one-off scratch scripts used
  mid-pass).
- `npm run test:world12-runner`: baseline generic-runtime capability
  cases.
- `npm run lint` (`tsc --noEmit`): TypeScript type checking.
- Full cross-world regression, re-run after every engine change in this
  pass: `npm run audit:world1-quality` through `audit:world11-quality`,
  `npm run test:lambda-runner`, `npm run test:collection-runner`,
  `npm run test:world11-content`. All pass with zero regressions.
- `npm run test:world7-kotlin` (real-Kotlin comparison): requires a local
  Kotlin compiler classpath (`KOTLIN_COMPILER_CLASSPATH`) not configured
  in this environment; fails identically before and after this pass and
  is an environment/tooling gap, not a regression introduced here.

## Remaining work

None outstanding for engine capability or Write & Run/Debug correctness.
Two items remain for a future pass, both lower priority since they don't
block any current lesson content:

1. Real-Kotlin comparison for World 12's compiler-boundary Predict
   questions (variance direction, generic constraint satisfaction, star
   projection restrictions, reified-vs-erased type checks) requires a
   configured local Kotlin compiler classpath, not available in this
   environment.
2. Browser visual QA (rendered code/output/hints on mobile and desktop)
   for World 12's Write & Run and Debug stages has not been performed as
   part of this pass, which was scoped to engine/runner correctness and
   content formatting.

## Historical: pre-authoring audit (resolved)

This file originally recorded a pre-authoring coverage/capability plan,
dated 2026-09-19, before any World 12 lesson content existed. It is kept
here for continuity since every concern it raised is now resolved by the
work recorded above.

**Original scope sources:** curriculum scope from
[CODEDO_MASTER_PLAN.md](CODEDO_MASTER_PLAN.md) (World 12 — Generic Realm);
catalog slots in `src/data/curriculum/masterCurriculumCatalog.ts`
(`world-12`); editor capacity from
`CodeDo_Editor_capacity_per_lesson_status.xlsx` rows 146-160; reusable
legacy source material from `src/data/curriculum/world7_generics.ts` (a
31-question legacy bank across six old lesson groups: generic basics,
constraints, variance, star projections, reification, and a boss).

**W12-01 — High: generic-class erasure was missing.** *Resolved.* Not
only is erasure now correct, real generic-argument inference for
constructor calls was added (see the Engine capability section above),
which the original finding did not anticipate needing.

**W12-02 — Most of the world is compile-time semantics; cannot be proven
by successful JavaScript execution.** *Resolved for every lesson's Write &
Run and Debug stage* -- every one of them is now backed by genuinely
reproducible, executable Kotlin (either a real runtime behavior, like
variance-permitted assignments, or a real logic bug per the debug-redesign
work above), not a claim resting on an unrunnable compile-time-only
distinction. Predict questions about pure compiler-boundary behavior
(e.g. "does this compile") remain editorially validated against real
Kotlin semantics rather than executed, which is the correct treatment per
`LESSON_QUALITY_STANDARD.md` section 3 ("Predict... Ask explicitly whether
the learner is predicting output, type, compilation, or a particular
step").

**W12-03 — High: reified simulation was not available.** *Resolved* --
see "Reified type parameters" under Engine capability above. The narrow
subset this finding called for (single reified parameter, single-line
declaration) is exactly what was built and verified.

All four "Next data-gathering steps" from the original plan are complete:
the reified subset was implemented and verified; this environment has no
local Kotlin compiler configured (documented, not resolved -- see
"Remaining work" above); the legacy question bank was superseded by
freshly authored content rather than mapped question-by-question, since
authoring against the concept-coverage map directly (per
`LESSON_QUALITY_STANDARD.md` section 1) produced adequate coverage without
needing the legacy bank; and every lesson was authored with prerequisites,
common variations, boundaries, and capability gates identified up front,
per the coverage map this file originally called for.
