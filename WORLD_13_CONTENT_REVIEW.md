# World 13 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-21. Status: **Verified** — all 10 lessons.

## Result

World 13 (Scope Masters) content existed in `world13LessonsData.ts` from a
prior sync (`Sync code from CodeDoInspiro`/`CodeDoJoyFull`) with **zero**
prior quality audit and **zero** engine support for its topic: this
simulator had no support at all for `.let`/`.run`/`.apply`/`.also` as
member calls, or for `with(receiver) { ... }`, before this session. Every
Learn/Explore/Predict/Write&Run/Debug activity that actually exercises a
scope function — effectively the entire world — would have failed at
runtime.

| Lesson | Write & Run | Debug |
| --- | --- | --- |
| `let` & `run` | Passes | Passes |
| `apply` | Passes | Passes |
| `also` | Passes | Passes |
| `with` | Passes | Passes |
| `this` vs `it` | Passes | Passes |
| Return values of scope functions | Passes | Passes |
| Choosing the appropriate scope function | Passes | Passes |
| Scope-function chaining | Passes | Passes |
| Avoiding overuse and nesting | Passes | Passes |
| Boss (Configuration Builder) | Passes | Passes |

Zero lessons are capability-gated after this session's engine work, with
one narrow, documented exception (labeled receivers, `this@label`) that
was avoided in content rather than built — see "Deliberate scope
limitations" below.

## Engine capability added to `src/utils/kotlinFunctions.ts` / `src/utils/kotlinRunner.ts`

Previously entirely unsupported constructs, verified with a 16-case
scratch harness before any lesson content was trusted, then re-verified
against every actual Learn/Explore/Predict/Write&Run/Debug snippet in the
lesson data (158 checks, `npm run test:world13-content`):

- **`X.let { ... }` / `X.also { ... }`** (argument-style, `it`) and
  **`X.run { ... }` / `X.apply { ... }`** (receiver-style, `this`) as
  member calls on any receiver type. Registered as a new
  `scopeMemberSignatures` map in `kotlinFunctions.ts`, consulted only for a
  dot-prefixed call so the pre-existing, unrelated standalone `run { ... }`
  builtin (no receiver) is untouched. Every generated lambda already takes
  the receiver as an ordinary first positional parameter regardless of
  argument- vs receiver-style (the same mechanism a declared `T.() -> R`
  receiver function type already used) — so the runtime side needed only
  `Object.prototype.let/run/also/apply` helpers (`kotlinRunner.ts`) that
  call `block(receiver)` and, for `also`/`apply`, return the receiver
  instead of the block's result. `Object.prototype.apply` does not shadow
  `Function.prototype.apply` for a real function value (closer in the
  prototype chain), so this is safe for every receiver type an actual
  lesson uses.
- **`with(receiver) { ... }`** — a plain (non-extension) call, registered
  in the existing `builtins` map under its literal name; the
  pre-existing `builtins.has(at(i))` bare-name auto-rename mechanism
  already used for `run`/`repeat` renames it to `__kt_with` in the
  generated JS wherever it appears, which is what keeps JS's own reserved
  `with` statement keyword out of the final code — no separate source-level
  rename pass was needed.
- **Bare receiver-member access with no `this.` prefix** inside a
  `run`/`apply`/`with` block — `apply`'s whole point is exactly this
  (`Profile().apply { name = "Ada" }`). Generalized a previous six-name
  hardcoded whitelist (`length`, `uppercase`, ...) into a real rule: any
  bare identifier that isn't a known local var, function, class, `builtins`
  entry, or a short list of real sandbox globals (`println`, `listOf`,
  etc.) is treated as a receiver member, for both reads and — a new,
  separate rule — assignment targets (`name = "Ada"`). Also extended to
  string-template content (`"$this has $length letters"`, `with`'s own
  Learn example and a graded Write & Run solution): a string literal's `$`
  content is never touched by the general lowering pass, so `$this`,
  `${this.x}`, and now a bare `$name`/`${name}` referring to the receiver
  are rewritten to the real receiver parameter before the lambda body is
  returned, reusing the pattern an existing `fun`-header receiver-function
  fixup already established for `$this` alone.
- **`StringBuilder`** — a from-scratch `class KotlinStringBuilder` with
  `.append()` (returns `this`, supporting the real chaining style) and
  `toString()`, registered as a real global (not a sandbox parameter, the
  same way `Number`/`Array`/`Map` already work) and added to
  `insertNewForInstantiation`'s recognized class-name set so
  `StringBuilder()` gets `new` inserted. World 13's `apply`/`also` Explore
  content and one Predict question use it as their flagship
  configuration/observation example.
- A bare Int **literal** immediately followed by `.member` (`4.also { ... }`,
  used in an actual Predict question) is valid Kotlin but a JS
  `SyntaxError` (`4.also` — JS's numeric-literal grammar greedily consumes
  the trailing `.` into the literal itself, per direct testing:
  `4.toString()` alone throws). Fixed with a general pre-pass,
  `(\d+)\.(?=[A-Za-z_])` → `($1).`, rather than hand-parenthesizing every
  occurrence the way `(250).centsLabel(...)` already did in World 11 —
  the lookahead requires a letter/underscore right after the dot, so a
  real decimal literal (`3.14`) is never touched.

## A serious, previously-latent engine bug this world's content surfaced

**Any class's primary-constructor parameter written `val`/`var name: Type =
default` silently leaked `name` into the ROOT scope as if it were a real
top-level `var`/`val` declaration statement.** `kotlinFunctions.ts`'s
top-level statement walk processes every token in the whole file, including
inside a class's own constructor parameter list — no pass had ever
protected that specific range (only class/object/interface BODY braces
were tracked, via `declarationBodies`). Its `val`/`var`-declaration
recognizer distinguishes "a real declaration" from "just the keyword
appearing somewhere" by checking for a following `=` — and a defaulted
constructor parameter (`class Box(var n: Int = 0)`) is textually
indistinguishable from a genuine local declaration once that check passes,
so `n` got registered into `ctx.vars` at the root context, which every
later scope in the file inherits from.

This was **completely invisible** before this session — nothing in
Worlds 1–12 ever checked whether a *later, unrelated* scope's bare name
happened to collide with an *earlier* class's defaulted constructor
parameter name, because nothing needed to distinguish "an unqualified name
already exists in scope" from "this name should resolve to something else"
until World 13's `apply`/`run` bare-receiver-member support (above) added
exactly that check (`!ctx.vars.has(name)`) as its condition for treating a
bare name as a receiver member. The very first lesson to combine a
defaulted-parameter data class with `.apply { name = "..." }` (a
completely ordinary, idiomatic pattern) hit it immediately: `Account().apply
{ name = "Mira" }` silently assigned to an accidental global `name`
instead of the receiver's property, leaving `account.name` untouched —
exactly the "plausible-looking wrong answer" failure mode this codebase's
own pitfalls file warns about repeatedly, not a loud crash.

Fixed with a new `constructorParamTokens` token-index set, populated
alongside the existing primary-constructor scan (which already computes
the exact paren range for `constructors.set(...)`), and consulted by both
`val`/`var`-declaration branches (destructuring and plain) to skip a
parameter-list token instead of processing it as a statement. Verified
directly: `class Box(var n: Int = 0); Box().apply { n = 5 }` now correctly
sets the instance's `n`, and the full existing regression suite (Worlds
1–12, lambda-runner, collection-runner) still passes with zero
regressions — nothing in prior worlds depended on the old, wrong behavior.

## Content bugs found and fixed (not engine bugs)

- **A real array-hole bug in the shipped data**, found only because the
  new `test:world13-content` script iterates every Explore card and
  Predict question and asserts none is `undefined`: the `let & run`
  lesson's `explore.cards` and `predict.questions` arrays each had an
  extra card/question appended as `, { id: ... }` on its own line, right
  after the previous entry's own already-comma-terminated line — i.e.
  `[..., previousCard, , { id: "...-6", ... }]`, a JS sparse-array hole
  (`[a, b,, c]`) between the 5th and 6th entries. `Object.values`/`.map`
  over such an array yields `undefined` for that slot, which the real app
  would either skip silently or crash on when rendering that specific
  card/question. Fixed by removing the stray leading comma on both lines.
- **A Write & Run starter that already passed before any edit** (`Avoiding
  overuse and nesting`'s "Refactor for Clarity" task): its `initialCode`
  was the *complete*, already-correct (if deliberately messy) nested-`let`
  program the task asks the learner to refactor — not a `TODO()`-based
  unfinished starter — so it produced the exact `expectedOutput` with zero
  edits, violating `LESSON_QUALITY_STANDARD.md` section 3's explicit "the
  unfinished starter must not already pass" requirement. Rewritten to the
  standard `// N. ...` comment + `TODO()` starter shape every other
  Write & Run in this file already uses, with a matching numbered-steps
  description (per `CODEDO_MASTER_PLAN.md`'s Write & Run authoring
  standard).
- **A Debug pair and an Explore card relying on labeled receivers**
  (`this@outer`) this engine does not support (see below) — rewritten to
  use a named local variable for the outer receiver instead of a label,
  preserving the exact same "nested receivers can hide the intended
  context" teaching point with only supported syntax.
- **Stale `questionsCount` in `masterCurriculumCatalog.ts`** for all 10
  World 13 catalog rows: every one still said `4` from before the
  "distinct coverage" Predict questions (5th/6th/7th, added in the same
  pass that introduced the array-hole bug above) were appended. Corrected
  to the real per-lesson counts (5, 6, or 7) the content actually has.

## Deliberate scope limitation, not a bug

**Labeled receivers (`this@label`) are not supported.** Kotlin lets a
nested receiver lambda be labeled (`"outer".run outer@{ ... this@outer
... }`) to disambiguate which enclosing receiver `this` should mean when
more than one is in scope. This engine's lambda labels
(`isName(at(i)) && at(i+1)==='@' && at(i+2)==='{'`) already exist, but only
drive *return*-label resolution (`return@outer`) — there is no matching
mechanism that tracks a *receiver* frame's label and resolves
`this@label` back to the right ancestor's parameter name. Building that is
a real, separate feature, not a one-line extension of the existing label
machinery. World 13's one lesson that taught this (`Avoiding overuse and
nesting`'s Explore card 3 and its Debug pair) was rewritten to reach the
same "nested receivers can be ambiguous" point through a named local
variable instead — which is itself the more commonly recommended, more
readable Kotlin style, so nothing pedagogically real was lost. If a later
lesson genuinely needs `this@label`, implement it the same way every other
gap on `PITFALLS.md` was closed: build the narrow feature, verify with a
scratch harness, then author content against it.

## Verification

- `npm run test:world13-content` (new script; also registered as
  `test:world13-content` in `package.json`): 158 checks across all 10
  lessons — every Explore card and Predict question executed through the
  real `compileAndRunKotlin`, every Write & Run solution/starter pair, and
  every Debug fixed/broken pair, including confirming every broken pair
  produces genuinely different output (or a real error) from its fix.
- Full cross-world regression, zero failures: `npm run test:lambda-runner`
  (80 cases), `npm run test:collection-runner` (31 + 5 + 20 cases),
  `npm run test:world11-content` (56 checks), `npm run test:world12-runner`
  (6 cases), `npm run audit:output-quotes` (49 blocks), `npx tsc --noEmit`,
  and `npm run build`.
- Not performed: browser visual QA (rendered code/output/hints on mobile
  and desktop) and a real-Kotlin-compiler comparison, matching every other
  world's review file's disclosed scope in this environment.

## Clarity pass (2026-09-21) — [LESSON_CLARITY_STANDARD.md](LESSON_CLARITY_STANDARD.md)

Everything above verifies execution correctness only. This is the
separate readability/confusion/line-break pass `LESSON_CLARITY_STANDARD.md`
requires, and the first real application of that standard (see its own
worked-example section). A subagent read every prose field across all 10
lessons end to end; findings and fixes below.

**Systemic pattern, all 10 lessons: meta-commentary leaking into
learner-facing text.** Every lesson had 2-3 "filler" Explore
cards/Predict questions (the `id`s prefixed `world-13-...`, added after
the original set) whose text was an authoring note, not teaching content:
`whatChanged: "Added distinct coverage for <title>."`; a placeholder
`subtitle` that was just the title plus a period; a generic `"Behavior"`
label in `whatItMeans` instead of a real code term; and a predict `prompt`
that literally read `"Behavior/receiver/return-value question: which
statement is correct?"` with three verbatim-identical boilerplate wrong
options reused across all ~19 occurrences regardless of lesson
(`"All scope functions always return Unit."`, `"The context is always
available as both this and it."`, `"All scope functions return the
original object."`). All ~19 card/question pairs across every lesson were
rewritten: real subtitles distinct from the title, a real code-reference
`whatItMeans` label, a natural "what is printed?" (or equivalent) prompt
tied to the actual shown code, and distractor options representing
plausible misconceptions about THAT code rather than a reused template
question about scope functions in general.

**A genuine engine gap found while rewriting one of these** (`with`'s
"may return Unit" filler card/question): the simulator prints `null` for
a Kotlin `Unit` value instead of real Kotlin's `kotlin.Unit`, and has no
`Unit` identifier at all for an equality check (`r == Unit` throws `Unit
is not defined`). Rather than teach a fact that's only true of this
simulator's own formatting bug (or one the engine can't even execute),
replaced the card/question with a different, verified-safe example:
`with(Point(3, 4)) { x == 3 && y == 4 }` (Boolean result), which still
demonstrates "with's return type follows the block's last expression"
without touching the broken Unit path. Not fixed at the engine level --
this is a real, narrow `formatKotlinValue`/Unit-representation gap that
should be logged if a future lesson needs to print or compare `Unit`
directly.

**Three Write & Run tasks were unsolvable from their own text.**
`apply`'s "Configure an Account", `with`'s "Summarize a Product", and
`Return values of scope functions`'s "Demonstrate Both Return Families"
each had a `description`/`initialCode` that never stated the exact
values or output string the task required (e.g. `expectedOutput:
"Mira:3"` with nothing in the learner-facing text naming "Mira" or "3"
anywhere). All three rewritten with the numbered-steps convention and an
explicit `// N. ...` TODO comment naming the required value(s), matching
every other Write & Run in this file.

**A count-drift bug in `let-run`'s Mastered summary**: `verificationItems`
said "5 patterns" / "5/5" for Examples explored / Predictions completed,
but the lesson actually has 6 of each (`passedCount` already correctly
said "6 / 6"). Corrected both strings and named the 6th pattern.

**Readability (wall-of-text) fixes**: `learn.explanation` and/or
`learn.subtitle` in `let-run`, `apply`, `also`, `with`, `this-vs-it`,
`return-values-of-scope-functions`, `scope-function-chaining`, and
`avoiding-overuse-and-nesting` were each one dense multi-idea paragraph
with no line breaks; split at natural idea boundaries with `\n\n`.
`choosing-the-appropriate-scope-function`'s explanation was the worst
offender -- a single ~340-character sentence mapping all five scope
functions to their use cases -- broken into one line per function.
`boss`'s explanation additionally had the same "describes the lesson's
own design decision" meta-commentary pattern as the filler cards
("The boss integrates the world's mental model without forcing every
scope function into one program") and was rewritten into direct teaching
content about what apply/also/run each do in the chain.

**A minor grammar fix**: `scope-function-chaining`'s subtitle had a
subject-verb agreement error ("value and type flows" -> "flow").

**Verified**: `npm run test:world13-content` (158 checks, still 0
failures -- confirms every hand-traced output written above is what the
real engine actually produces, catching the Unit-printing mistake before
it shipped), `npm run audit:dash-collision` (0 findings), `npm run
audit:output-quotes` (49 blocks), `npx tsc --noEmit`, `npm run build`,
and the full cross-world regression suite (lambda-runner 80,
collection-runner 31+5+20, World 11 content 56, World 12 runner 6) --
zero regressions.

**Not covered by this pass**: `explore.cards[].whatItMeans[].description`
and `predict.questions[].prompt` for the ORIGINAL (non-filler) cards in
each lesson were read but not systematically rewritten (only the filler
ones, which had the confirmed meta-commentary bug); `debug.hints`/
`debug.explanation` across lessons other than `apply`/`avoiding-overuse-
and-nesting` were read by the auditing agent with no findings reported,
but were not independently re-verified line by line the way the filler
pattern was. Browser visual QA of how these breaks actually render is
still open, same as noted above.
