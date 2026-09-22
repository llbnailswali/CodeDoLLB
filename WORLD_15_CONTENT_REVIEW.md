# World 15 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-21. Status: **Verified** (execution/coverage correctness
only) — all 15 lessons. This audit did NOT include a
[LESSON_CLARITY_STANDARD.md](LESSON_CLARITY_STANDARD.md) pass — that
remains queued for the later, batch clarity audit across all worlds, per
explicit direction this session.

## Result

World 15 (Error Fortress) content existed in `world15LessonsData.ts` from a
prior sync commit with almost **zero** prior engine support for its topic:
before this session, `kotlinRunner.ts`/`kotlinFunctions.ts` had no
exception class hierarchy, no typed multi-catch dispatch, no try/catch as
an expression, no expression-position `throw`, no `Result`/`runCatching`,
no `require`/`check`/`error`, and `String.toInt()` never threw at all
(lenient `parseInt`). Every activity in every one of this world's 15
lessons exercises at least one of these — the entire world would have
failed at runtime before this session.

| Lesson | Write & Run | Debug |
| --- | --- | --- |
| Exceptions & try | Passes | Passes |
| Catch | Passes | Passes |
| finally | Passes | Passes |
| throw | Passes | Passes |
| Multiple catch blocks | Passes | Passes |
| Try as an expression | Passes | Passes |
| Custom exceptions | Passes | Passes |
| Checked vs unchecked exception model | N/A (conceptual topic — see below) | N/A |
| Result | Passes | Passes |
| runCatching | Passes | Passes |
| Success/failure handling | Passes | Passes |
| Error handling patterns | Passes | Passes |
| Avoiding swallowed errors | N/A (no writeRun — see below) | Passes |
| Designing meaningful failure paths | Passes | Passes |
| Boss (Reliable Order Engine) | Passes | Passes |

Two lessons intentionally have a narrower stage set than the rest, both
correct per `LESSON_QUALITY_STANDARD.md`'s topic-type guidance, not gaps:

- **Checked vs Unchecked Exception Model** is a Conceptual topic (Kotlin's
  language *rule*, not a constructible program) — Learn + Explore + Predict
  only, no Write & Run/Debug, matching `CODEDO_MASTER_PLAN.md`'s
  Conceptual flow.
- **Avoiding Swallowed Errors** is a Reasoning-style topic with a Debug
  stage (diagnosing a swallowing mistake) but no Write & Run — recognizing
  and fixing the mistake is the whole point, not authoring new code from
  scratch.

## Engine capability added

**A real `Throwable`/`Exception`/`RuntimeException`/`IllegalStateException`/
`IllegalArgumentException`/`NumberFormatException`/`IndexOutOfBoundsException`/
`ArithmeticException`/`NoSuchElementException`/`UnsupportedOperationException`
class hierarchy** (new file, `src/utils/kotlinExceptions.ts`), deliberately
NOT extending JS's own `Error` — `Error`'s constructor forces `message`
into an own, non-nullable string property, which fights with Kotlin's real
`Throwable.message: String?` (a no-arg `Exception()` has `message == null`,
not `""`). Classes are named exactly like their real Kotlin counterparts
(no `Kotlin`-prefix) so `e::class.simpleName` (lowered to
`e.constructor.name`) prints the right name with zero extra mapping, and so
they slot into `insertNewForInstantiation`'s/`extends`'s existing
class-name machinery like any user-declared class. Subtype relationships
match the real hierarchy exactly (`NumberFormatException` under
`IllegalArgumentException`, both under `RuntimeException`) since a
`catch (e: IllegalArgumentException)` matching a thrown
`NumberFormatException` is exactly what World 15's own Multiple Catch
Blocks lesson content depends on.

**A `Result<T>` class + `runCatching` (standalone and receiver forms)**,
same file — `success`/`failure`/`isSuccess`/`isFailure`/`getOrNull`/
`getOrDefault`/`getOrElse`/`getOrThrow`/`exceptionOrNull`/`fold`/
`onSuccess`/`onFailure`/`recover`/`map`/`mapCatching`, matching the real
Kotlin stdlib surface World 15's Result/runCatching/Success-Failure-
Handling lessons actually exercise. `runCatching { block }` (standalone,
registered in `kotlinFunctions.ts`'s `builtins` map, same pattern as
`run`/`with`) and `"25".runCatching { toInt() }` (receiver form, a real
`Object.prototype.runCatching` method, same pattern as `let`/`run`/`also`/
`apply`) both route through the one `kotlinRunCatching` helper.

**A whole new try/catch/finally lowering pass in `kotlinFunctions.ts`**,
replacing the old single-untyped-catch-only handling: `parseTryChain`
walks a `try` keyword forward through every consecutive
`catch (name: Type) { ... }` clause plus an optional `finally { ... }`;
`renderCatchDispatch` builds a real `instanceof`-chain dispatch (first
matching type wins, no match rethrows, preserving the pre-existing
`__kt_target` non-local-return-transfer passthrough check). Whether the
construct needs to PRODUCE A VALUE is decided purely from the real,
original token immediately preceding it (`=` or `return`) — reliable even
when this `try` is the very first token a given `lower()` call was asked
to process, since `at()` indexes the whole token stream, not just that
call's own sub-range:

- **Value-needed via `=`/`return`** (`val x = try {...} catch...`, `return
  try {...} catch...`) renders every branch's trailing expression as a real
  `return` statement and wraps the whole thing in an IIFE, `(() => {...})()`
  — simplest correct option for an arbitrary expression position.
- **The tail-of-a-block case** (`fun f() = try {...} catch...`, or an
  implicit last-line block-body expression) is handled directly in
  `valueBody`, mirroring the pre-existing `if`-as-expression special case
  there: branches become real `return` statements with NO IIFE at all,
  since a function/lambda body already has a real return boundary to
  target — strictly better than the `=`/`return` case where no such
  boundary exists yet.
- **Everything else** (a bare statement-form try, side effects only)
  renders plain, unwrapped `try {...} catch...} finally {...}` — critical
  for a `return` inside such a try to still exit the REAL enclosing
  function rather than being captured by an accidental IIFE.

Two boundary-detection functions needed a small but important extension for
multi-line `try {...}` \\n `catch (...) {...}` (catch clause starting on
its own line, common in this world's Predict content):
`expressionEnd`/`statements` previously only excluded `else`/`.`/operators
etc. from their newline-triggers-a-split heuristic — `catch`/`finally` were
never in that list, so a val declaration's own RHS boundary (or a block's
statement-splitting) would cut a multi-line try/catch construct in half,
leaving a dangling, unparseable `catch (...)` clause. Both now also exclude
`catch`/`finally`.

**Expression-position `throw`** (`expr ?: throw X(...)`, `if (cond) value
else throw X(...)`, both real, common Kotlin since `throw` has type
`Nothing`, compatible with any expected type): a new `__kt_throw(x)`
runtime helper (`{ throw x; }`) turns a JS-illegal bare `throw` inside a
ternary/`??` into a plain, valid function call. Wired into the Elvis
operator's right-hand side in `kotlinFunctions.ts` and into
`kotlinRunner.ts`'s `convertIfExpr` (the existing if-expression-to-ternary
transform) for either branch of an if-expression.

**`String.toInt()` fixed to actually throw** `NumberFormatException` with
an exact, JVM-matching message (`For input string: "text"`, verified
against World 15's own Boss lesson, which asserts this text verbatim in
its `expectedOutput`) for any string that isn't a valid whole integer —
the previous `parseInt(this, 10)` was lenient exactly like JS's own
`parseInt` (`"12x".toInt()` silently returned `12`), a silent-wrong-answer
bug invisible until a lesson actually needed the throwing behavior (no
prior world's content did). Added `.toIntOrNull()` alongside it.

**`require(cond) { msg }`, `check(cond) { msg }`, `error(msg)`** — real
Kotlin stdlib functions throwing `IllegalArgumentException`/
`IllegalStateException`/`IllegalStateException` respectively, exposed as
plain globals.

**A real compile-time "class is final by default" check**,
`checkFinalClassInheritance` in `kotlinRunner.ts`: Kotlin classes cannot be
subclassed unless marked `open`/`abstract`/`sealed`, and this simulator had
**no such check at all** before this session — a `class Parent(...)`
subclassed by `class Child : Parent(...)` (no `open`) previously
transpiled and ran successfully either way. This is exactly the
`bugType: 'type'` failure mode PITFALLS.md warns about repeatedly (a
simulated type distinction the engine doesn't actually enforce silently
makes a debug exercise's broken and fixed code produce identical output),
and it hit World 15's own Custom Exceptions debug exercise
("Type Bug: Final Exception Parent") until this check was added. Scoped
narrowly to classes declared in the same source (a built-in exception
class like `Exception` is real Kotlin's own open type and has no source
text here to check a modifier against).

**Small supporting additions**: `String.isEmpty()`/`.isNotEmpty()`
(missing entirely; needed by the Designing Meaningful Failure Paths
writeRun solution); a generic-type-argument-on-a-member-call eraser
(`Result.failure<Int>(...)` — the pre-existing
`eraseGenericConstructorArguments` only matched a capitalized identifier
immediately before `<...>(`, never a lowercase method name like
`.failure<Int>(`); `is`/`!is`'s left-hand-side regex widened to accept a
simple zero/some-arg method call (`r.exceptionOrNull() is
NumberFormatException`), not just a bare dotted identifier.

## Verification

- `npm run test:world15-content` (new script, `227` checks): every Explore
  card, every Predict question, every Write & Run solution/starter pair,
  and every Debug fixed/broken pair, across all 15 lessons. Several
  Predict/Explore items deliberately teach that a program crashes,
  propagates, or fails to compile (per real Kotlin) — the script does real
  reachability analysis (a small call-graph walk from the snippet's actual
  entry point, including through `runCatching`'s absorb-everything
  semantics) to tell those apart from a genuine runner regression, rather
  than trusting the correct answer's prose text alone.
- Full cross-world regression, zero failures: `npm run test:lambda-runner`
  (80), `npm run test:collection-runner` (31+5+20), `npm run
  test:world11-content` (56), `npm run test:world12-runner` (6), `npm run
  test:world13-content` (158), `npm run test:world14-content` (197), `npm
  run audit:output-quotes` (49 blocks), `npm run audit:dash-collision` (0
  findings), `npx tsc --noEmit`, `npm run build`.

## Content bugs found and fixed

- **Stale `questionsCount`** (all `4`) across all 15 World 15 catalog rows
  in `masterCurriculumCatalog.ts` — same recurring pattern as every other
  synced world audited so far.
- **A genuine data-corruption bug, not staleness**: 30 occurrences of a
  literal double comma (`},,`) inside `predict.questions`/`explore.cards`
  array literals across `world15LessonsData.ts`. A JS array literal like
  `[a, b,, c]` is *sparse* — the doubled comma creates an empty hole at
  that index, which inflates `.length` (so the array LOOKS the right size)
  while `Array.prototype.map`/`for...of` skip the hole entirely, silently
  dropping that one card/question from anything that iterates the array
  (including the real learner-facing UI, not just this audit). Every
  occurrence was a `},,` immediately after a card/question object literal.
  Fixed with a single project-wide `},,` → `},` replace across this file;
  verified zero remaining occurrences.
- **`risky()`/`useDefault()`/`load()` referenced but never defined** across
  9 Explore/Predict snippets (a recurring shorthand placeholder pattern in
  this world's content, standing in for "some operation that might fail").
  Where a *matching* definition already existed elsewhere in the same
  snippet it was left alone; every snippet missing one got a minimal,
  throwing definition (`fun risky() { throw IllegalStateException(...) }`,
  etc.) prepended, preserving the illustrated control-flow shape (a
  multi-catch snippet's helper throws the type its first catch expects,
  etc.) rather than just making it parse.
- **`world-15-multiple-catch-blocks-explore-1`**'s two catch types
  (`NumberFormatException`, `IllegalStateException`) needed its `risky()`
  stub to specifically throw the FIRST one (`"bad".toInt()`) so the
  "each gets its own response" framing the card's own text describes is
  actually demonstrated, not just made to run.

## Scope not covered by this pass

- `LESSON_CLARITY_STANDARD.md`'s readability/confusion/dash-collision/
  generic-subtitle checks — deferred, per explicit direction, to a later
  batch pass across all worlds.
- `java.io.IOException` in the Checked vs Unchecked Exception Model
  lesson's `@Throws` Explore card/Predict question — genuinely
  non-executable in this simulator (no Java stdlib surface modeled at
  all), and correctly so: it's illustrating a *Java-interop* concept
  Kotlin itself does not enforce, not real Kotlin behavior this engine
  needs to reproduce. `@Annotation(...)` lines are now stripped as inert
  (harmless) wherever they appear; this one specific card/question is
  still excluded from execution in `test:world15-content` with a
  documented reason, matching this file's established pattern for a
  justified, recorded capability limit rather than a silently-skipped gap.
- Browser visual QA and a real-Kotlin-compiler comparison, matching every
  other world's review file's disclosed scope in this environment.
