# CodeDo — Pitfalls

Known bugs that have already happened once, their root cause, the fix, and
the rule/verification step to stop them recurring. Not project docs or
architecture notes — see the other `CODEDO_*.md` files for that.

## `if`-expression, `when`, ranges, and `is` checks needed real engine support before World 3

World 3 (Decision Maker) is entirely about `if`/`when`/ranges/`is` — and
before this world, `kotlinRunner.ts` had **zero** support for any of them
beyond bare `if (cond) { } else { }` as a statement (which happens to
already be valid JS as-is, so it worked by accident). Kotlin's `when` isn't
valid JS syntax at all, `if`/`when` used as expressions
(`val x = if (a) b else c`) aren't either, and `in`/`!in` ranges and `is`
type checks had no transform. Any World 3 exercise using these would have
failed to even parse as JS.

Added four new, narrowly-scoped transforms to `kotlinRunner.ts`:

- **`transformIfExpression`** — converts a *single-line, brace-free*
  `val x = if (cond) a else b` into a JS ternary. Block-bodied if-expressions
  (`if (cond) { ...; a } else { ...; b }`) are NOT supported.
- **`transpileWhenBlocks`** — a whole-source (not per-line) pre-pass that
  finds every `when (subject) { ... }` block via balanced-brace scanning and
  rewrites it into an if/else-if chain (statement form) or an IIFE returning
  a value (expression form, when assigned to a `val`/`var` or used after
  `return`). Only supports: a required subject (no subject-less
  `when { ... }`), branches of `value1, value2 -> result` (equality, OR'd),
  `in a..b` / `!in a..b` (range), and `else`. **Every branch `result` must
  be a single line** — multi-line/block-bodied branches are not supported.
- **`transformRanges`** — `x in a..b` / `x !in a..b` (numeric or
  single-quoted-char endpoints only) -> a plain `>=`/`<=` boolean check.
  Reused both standalone (`if (x in 1..10)`) and inside `when`'s range
  branches.
- **`transformTypeChecks`** — `x is Type` / `x !is Type` -> a `typeof`
  check, but **only** for `Int`/`Long`/`Float`/`Double` (all -> `'number'`),
  `String`, and `Boolean`. `is Char` is deliberately NOT supported: a Char
  and a same-text String are indistinguishable JS strings in this simulator
  (see the Char/String entry below), so an `is Char` check would silently
  misclassify exactly like every other Char-vs-String bug already
  documented here.

**Known, deliberate gap:** nesting an if-expression inside a `when` branch's
result (`in 90..100 -> if (hasBonus) "A+" else "A"`) does NOT work —
`transpileWhenBlocks` collapses the whole `when` block onto one line before
`transformIfExpression` ever runs on it, and by then there are multiple
`if`/`else` keywords on that one line, which the single-line ternary regex
can't disambiguate. Don't author lesson content that nests these two
features inside each other; each works correctly on its own.

**Rule:** when authoring World 3+ content that uses `if`-as-expression,
`when`, ranges, or `is`, stay inside the subset above (single-line branch
results, no subject-less `when`, no `is Char`, no nested if-inside-when),
and actually run the code through `compileAndRunKotlin` to confirm — same
as every other pitfall on this page, reading the data is not enough to
trust it.

## Functions needed real engine support before World 5: default params, vararg, and two silent-wrong-answer bugs

World 5 (Function Forge) exercised parts of `kotlinRunner.ts`'s `fun`
handling that had never actually been tested end-to-end before, and two of
the gaps were **silent wrong answers, not errors** — the most dangerous
kind, since a broken exercise looks like it's working.

1. **Default parameter values were silently dropped.** The old param-cleaning
   regex (`(?:(?:val|var)\s+)?([a-zA-Z0-9_]+)`) only ever captured the
   parameter *name* — `name: String = "Guest"` became bare `name` in the
   generated JS, with the `= "Guest"` thrown away entirely. Calling the
   function without that argument passed JS `undefined` instead of running
   the default, so `greet()` printed `"Hello, undefined!"` instead of
   `"Hello, Guest!"`. Fixed by a shared `cleanKotlinParams` helper (used by
   both the block-bodied and single-expression `fun` transforms) that
   preserves a `= default` suffix as a real JS default parameter.

2. **`vararg name: Type` had no transform at all** — it fell through the
   same param cleaner as a plain parameter, losing the `vararg` keyword and
   just capturing `name`, so a function like `fun sumAll(vararg nums: Int)`
   compiled to `function sumAll(nums)`, silently treating the whole varargs
   as a single value. Fixed in the same `cleanKotlinParams` helper:
   `vararg name: Type` -> JS rest parameter `...name`, which behaves the
   same way (an array of the trailing arguments) for everything this app's
   lessons need.

3. **`for (item in varargOrArrayIdentifier)` silently ran as the WRONG kind
   of loop.** `transformForLoops` (added for World 4) only recognized range
   forms (`a..b`, `until`, `downTo`) in a for-loop header; a bare identifier
   like a vararg parameter matched none of them and was returned
   unchanged — but `for (item in arr)` is *also* valid, unrelated JS
   syntax: native JS `for...in` iterates an array's **indices, as
   strings**, not its values. So `for (n in nums)` over `nums = [10, 20,
   30]` ran without any error at all, just silently bound `n` to `"0"`,
   `"1"`, `"2"` instead of `10`, `20`, `30` — a wrong answer with no
   diagnostic anywhere. Fixed by extending `transformForLoops`: a bare
   identifier for-loop subject now becomes JS `for (const item of expr)`
   (iterating values, matching Kotlin's semantics), instead of falling
   through to JS's own, different-meaning `for...in`.

4. **Function parameters were invisible to `inferIntTypedVars`.** The
   Int/Long type-inference pass that drives `Int / Int` truncation (see the
   entry below) only scanned `val`/`var` declarations, so a division
   between two Int *parameters* (`fun divide(a: Int, b: Int) = a / b`)
   never got wrapped in `Math.trunc(...)`, even though the exact same
   division on two `val`-declared Ints already worked correctly. Fixed by
   also scanning `fun` parameter lists for `name: Int`/`name: Long`
   annotations (vararg-aware) and adding those names to the same intVars
   set `wrapIntDivision` already consults.

**Rule, reinforced by cases 2 and 3 above:** a transform that silently
produces a *plausible-looking wrong answer* is far more dangerous than one
that errors out loudly, because nothing about running it looks broken —
only comparing the output against a hand-traced expected value catches it.
This is exactly why every lesson's `writeRun`/`debug`/executable `predict`
code gets run through the real engine and diffed, not just read, before
shipping (see the Resume Protocol in `data_gathering_progress.md`).

**Scope still not supported — avoid in graded (writeRun/debug) content:**
named arguments at a call site (`greet(name = "Bob")`) are NOT
transpiled — Kotlin allows reordering by name, and this simplified,
line-by-line transpiler has no cross-reference between a call site and the
callee's parameter order to support that safely. It's fine to *explain*
named arguments in Learn/Explore/Predict (never executed by the app), but
keep `writeRun`/`debug` code calling functions positionally.

## Kotlin `Int / Int` division never truncated in the simulator

Found while authoring World 2 (Operator Forge)'s Arithmetic Operators
lesson, whose whole premise is that `Int / Int` truncates
(`47 / 5` is `9`, not `9.4`). `kotlinRunner.ts`'s `transpileKotlinToJS` used
to translate Kotlin's `/` straight into JS `/` with no adjustment at all —
and JS numbers have no Int/Double distinction, so `/` is always
floating-point division there. A `writeRun`/`debug` exercise whose
`solutionCode` divided two Ints with a non-exact quotient (e.g.
`coins / players`) would compute the mathematically exact (fractional)
result instead of Kotlin's truncated one, so even byte-for-byte-correct
Kotlin failed the exact-match grading. Caught by actually running every
lesson's `writeRun.solutionCode`/`debug.brokenCode`/`debug.fixedCode`
through `compileAndRunKotlin` in a standalone harness and diffing against
`expectedOutput` — reading the data alone did not surface it, since the
numbers only diverge from truncation when authoring an exercise with a
non-exact division.

Fixed with two small additions in `kotlinRunner.ts`, both narrowly scoped:
`inferIntTypedVars` does a conservative, line-by-line static pass (explicit
`: Int`/`: Long` annotations, or a bare integer-literal initializer with no
decimal point) to build a set of variable names known to be Int/Long — it
deliberately leaves anything it can't classify (expressions, Double/Float,
etc.) out of the set rather than guessing. `wrapIntDivision` then rewrites
only the unambiguous case of `identifier|literal / identifier|literal`
where *both* sides are in that set into `Math.trunc(left / right)`, skipping
matches inside string literals and matches that are actually the
fractional part of a decimal literal (`5.0 / b` must stay untouched — the
lookbehind `(?<![.\d])` exists specifically for this). Deeper expressions
(`(a + b) / c`) are left exactly as before, which is no worse than the
prior behavior.

**Rule:** don't trust a `writeRun`/`debug` exercise's numbers by reading
them — actually run `solutionCode`/`brokenCode`/`fixedCode` through
`compileAndRunKotlin` (a small Node/tsx harness importing the lesson data
directly works well) and diff against `expectedOutput` before shipping new
content, the same way `audit:output-quotes` catches whitespace mismatches
mechanically instead of by eye. This is especially important for any lesson
whose taught concept is itself a numeric/arithmetic behavior (truncation,
overflow, precision), since those are exactly the behaviors a simplified
transpiler like this one is most likely to get wrong.

## `print()` immediately followed by `println()`: track whether the line is still open

`src/utils/kotlinRunner.ts`'s simulated stdout used to model `print()` and
`println()` inconsistently: `customPrint` assumed the last stdout entry was
always still "open" (no newline yet) and appended to it, but `customPrintln`
always pushed a brand-new entry unconditionally, with no concept of a line
left open by a preceding `print()`. So `print("Status: ")` followed by
`println("ACTIVE")` produced two separate stdout entries joined with `\n` →
`"Status: \nACTIVE"` instead of the correct `"Status: ACTIVE"`. Since grading
does an exact string match, even a lesson's own byte-for-byte-correct
`solutionCode` could never pass.

Fixed with a shared `lineOpen` boolean both functions read and update:
`print()` leaves the line open (next output stays on the same line),
`println()` closes it (next output starts fresh). If you touch this stdout
simulation again, verify it against a `print()` immediately followed by a
`println()` specifically — the all-`println` case (the common one) hides
this bug completely, since every call already starts a new entry there.

## Debug/Write & Run code editors: the textarea must scroll horizontally, not clip

The editable `<textarea>` in both `Debug.tsx` and `WriteRun.tsx` had
`overflow-x-hidden` (with `whitespace-pre` and no wrap) — so any line longer
than the visible width was invisibly clipped, not scrollable. A long
`// comment` or line of code simply vanished past the right edge with no way
to see or reach the rest of it, even though the outer wrapper div already
had `overflow-x-auto` (which doesn't help if the inner textarea itself
clips its own content first). Fixed by changing both textareas'
`overflow-x-hidden` to `overflow-x-auto`. If you add another code-editing
textarea, default to `overflow-x-auto` — `overflow-x-hidden` on an
unwrapped, non-wrapping textarea silently hides content, it doesn't just
look different.

## Kotlin numeric literals: `_` separators and `L`/`f`/`F`/`d`/`D` suffixes need special care

Two independent past bugs, both around the same Kotlin feature (numeric
literals with digit-group `_` separators and/or a trailing type suffix like
`100_000_000_000L` or `3.14f`):

1. **Rendering (`src/utils/codeHighlighter.tsx`):** the token regex used to
   match numbers as `\b\d+\b`, which requires a word boundary *after* the
   digits. But `_` and a suffix letter are both "word" characters in regex
   terms, so there is NEVER a boundary between digits and an adjacent `_` or
   suffix letter. Every alternative in the tokenizer failed to match at that
   position (numbers can't start an identifier either), so the leading digit
   group was silently dropped from the render entirely — `100_000_000_000L`
   rendered as `_000_000_000L`, `500L` rendered as bare `L`. Fixed by
   matching the whole literal as one token:
   `\d[\d_]*(?:\.[\d_]+)?[fFdDL]?` (no trailing `\b` needed — the character
   class is precise enough on its own). If you touch the tokenizer again,
   keep testing it against underscore-separated and suffixed literals
   specifically, since this class of bug is invisible from the plain digit
   case (`\b\d+\b` works fine for `20` or `500` alone).

2. **Execution (`src/utils/kotlinRunner.ts`):** `transpileKotlinToJS` never
   stripped Kotlin's numeric type suffix before treating the code as plain
   JavaScript — but JS has no such suffix syntax at all (`100_000L` is a
   `SyntaxError` in JS, even though the `_` separator itself is valid ES2021
   JS). Any graded `writeRun`/`debug` code containing a suffixed literal
   would fail to execute, INCLUDING a lesson's own "correct" `solutionCode`/
   `fixedCode` if it used one. Fixed with a line-level strip before any other
   transform: `line.replace(/\b(\d[\d_]*(?:\.[\d_]+)?)[fFdDL]\b/g, '$1')`.
   If you add a new numeric-literal transform to this file, make sure it
   still runs before (or accounts for) this stripping.

**Lesson for content authoring:** if a `writeRun`/`debug` exercise's
`solutionCode`/`fixedCode` uses an `L`/`f`/`F`/`d`/`D` suffix, actually run
it (mentally or via a quick Node harness replicating `transpileKotlinToJS` +
execution) rather than assuming it will execute — this engine is a
simplified transpiler, not a real Kotlin compiler, and it silently fails in
ways that are easy to miss by only reading the data.

## Kotlin single-quote Char literals and triple-quote raw strings: same root bug, twice more

Two more instances of the exact same failure mode as above (a character that
isn't in ANY tokenizer alternative's character class silently vanishes from
the render), both found while testing the Char and Strings lessons:

1. **Char literals (`'A'`, `'$'`, `'\n'`).** The tokenizer had NO alternative
   for single-quoted content at all — only `"[^"]*"` for double-quoted
   Strings. A bare `'` isn't punctuation, isn't an identifier-start, isn't
   anything else in the regex, so `'A'` rendered as bare `A`, `'$'`
   disappeared completely, and `'\n'` rendered as bare `n`. Fixed by adding
   `'(?:\\.|[^'\\])*'` as its own alternative (styled the same as strings).
   This deliberately matches zero-or-more characters, not exactly one, so a
   lesson's intentionally-invalid example (`'AB'` — real Kotlin: "too many
   characters in a character literal") still renders with its quotes
   visible instead of silently losing them and leaving a bare, unquoted
   `AB` that no longer illustrates the mistake being taught.

2. **Triple-quoted raw strings (`"""..."""`).** `"[^"]*"` greedily pairs the
   *first two* quotes of a `"""` run into an (empty) string token, leaving
   the third quote with no partner on that same alternative — and, like a
   bare `'`, a lone `"` wasn't in the punctuation class either, so it also
   silently vanished (`val banner = """` rendered as `val banner = ""`).
   Fixed by adding `"` to the punctuation character class. This doesn't
   give triple-quoted strings their own "raw string" color (that needs
   cross-line state tracking, comparable to `renderKotlinCodeLines`'s block
   comment handling) — it only guarantees the quote characters are never
   dropped.

**The pattern to watch for:** any time a new Kotlin syntax element is added
to lesson content, check whether every character it introduces is matched
by SOME alternative in `TOKEN_REGEX` (`src/utils/codeHighlighter.tsx`).
A character with no matching alternative doesn't error or fall back to
plain text — it disappears from the rendered output entirely, silently,
which is easy to miss unless you specifically compare the rendered code
against the source data character-for-character.

## Debug exercises: the "bug" must be reproducible by this app's simulator, not just real Kotlin

`kotlinRunner.ts` is a from-scratch, simplified Kotlin→JS transpiler — it
has NO 32-bit `Int` vs 64-bit `Long` width simulation. All numbers are
plain JS doubles under the hood, so arithmetic that would genuinely
overflow/wrap on the real JVM (e.g. `100_000 * 100_000` computed as 32-bit
`Int * Int`) just computes the mathematically correct result in this
engine — no overflow, because JS numbers don't have a 32-bit width to wrap
around. A debug exercise built around this kind of "silent Int overflow"
bug will have its `brokenCode` and `fixedCode` produce IDENTICAL (correct)
output in this simulator, so the exercise auto-"passes" the moment the user
taps Run, even with zero edits — exactly the failure mode this app hit with
an earlier version of the Int & Long lesson's debug stage.

**Rule:** before writing a debug exercise's `brokenCode`/`fixedCode` pair,
mentally trace (or run) both through the actual transform pipeline in
`kotlinRunner.ts` and confirm they produce genuinely DIFFERENT output.
Prefer bugs that are real logic/value mistakes with no JVM-specific,
width-dependent, or otherwise unsimulated behavior behind them — e.g. a
wrong arithmetic operator, an off-by-one range, a wrong variable — over
anything relying on integer overflow, precision loss, threading/ordering,
or other behavior this simplified engine doesn't model. It's fine for the
topic (e.g. `Long` literals) to still appear in the code; the *bug itself*
just can't depend on something the simulator can't reproduce.

**This is not a one-off — it's a whole class of exercise that's especially
prone to this failure, and it has hit World 1 four separate times:** any
`bugType: 'type'` exercise built around Kotlin's static type distinctions
(`Int` vs `Long`, `Float` vs `Double`, `Boolean` vs `String`, `Char` vs
`String`) is suspect, because `kotlinRunner.ts` has no real type system at
all — every Kotlin value becomes a plain JS primitive (number, string, or
boolean), and JS doesn't distinguish `Int`/`Long`/`Float`/`Double` from each
other, or a single-quoted `Char` from a double-quoted `String` of the same
text. Concretely:
- `val x: Boolean = "true"` (String) vs `val x: Boolean = true` (Boolean) —
  both print the identical text `"true"` once converted to output.
- `val x: Char = "Z"` (String) vs `val x: Char = 'Z'` (Char) — both single-
  and double-quoted literals are just JS strings; both print `Z`.
- `val x: Float = 0.08` (Double) vs `val x: Float = 0.08f` (Float) — the
  numeric-suffix stripping above makes both identical once transpiled.

`staticValidateKotlin` only catches a narrow set of these on its own: `Int`
typed with a quoted/decimal initializer, `String` typed with a bare number,
and `Boolean` typed with a bare number (see the `declMatch` block in
`kotlinRunner.ts`) — it does NOT catch a `Boolean`/`Char` typed as a
same-looking `String`, or any `Float`/`Double`/`Long` suffix mismatch. If a
debug exercise's bug is exactly one of the un-caught cases above, both
`brokenCode` and `fixedCode` will produce the same output and/or the same
"no error" result, and the exercise auto-passes on tap with zero edits.

Before shipping a `bugType: 'type'` debug exercise, check whether the
mismatch is one `staticValidateKotlin` actually flags; if not, either extend
the validator to genuinely catch it, or (usually simpler, and the approach
used to fix all four cases above) replace it with a `bugType: 'logic'` bug
whose two literal *values* actually differ (a wrong operator, a wrong
literal value, a wrong case) so the plain JS output is provably different
regardless of what the type system would have said in real Kotlin.

## Kotlin code-line rendering: always use the shared highlighter

Any UI that renders Kotlin code (Learn, Explore, Predict, Debug, or any
future lesson stage) MUST call `renderKotlinCodeLines` (or, only for a
genuinely standalone single line, `renderKotlinCodeLine`) from
`src/utils/codeHighlighter.tsx` — never re-implement ad-hoc highlighting
(e.g. `line.startsWith('fun ')`, `line.includes('println')`, etc.) inline in
a component.

**Why:** `Explore.tsx`, `Predict.tsx`, and `Detail.tsx`/`Learn.tsx` each used
to have their own bespoke, substring-based "highlighter." Those checks don't
account for a leading `//`, so a commented-out line like
`// println("Debug: health is $health")` matched the `println` branch and
rendered as if it were live, active code — the `//` and surrounding text
were silently discarded. The shared implementation tokenizes the whole line
first, so comments (whole-line or trailing) and quoted strings (which might
contain `//`, e.g. `"http://..."`) are always recognized before any
keyword/call-name matching happens. It also tracks `/* ... */` block
comments *across* lines (`renderKotlinCodeLines` only — see below), which is
something no per-component implementation ever handled correctly.

**How to use it — always prefer the plural, array-based form:**
```tsx
import { renderKotlinCodeLines } from '../utils/codeHighlighter';

{renderKotlinCodeLines(lines, { isDark }).map((node, idx) => (
  <div key={idx} className="whitespace-pre">{node}</div>
))}
```
`renderKotlinCodeLines` takes the whole `code`/`codeSnippet` array and
carries a "currently inside a block comment" flag from one line to the next,
so a `/* ...` opened on one array entry and closed with `*/` several entries
later is greyed out in full, the same way a `//` comment already is.

`renderKotlinCodeLine` (singular) exists only for a single, standalone line
that is not part of a larger array being mapped — using it inside a `.map()`
over a `code` array reintroduces the exact bug above for any multi-line
block comment, since each call starts with no memory of previous lines.

Both support light/dark theming via the `isDark` option (default `true`, for
call sites like `ActiveLessonView.tsx`'s fixed-dark code-editor mock).

If a new Kotlin construct needs highlighting that this function doesn't yet
recognize, extend `renderKotlinCodeLines`/`renderCodeFragment` in
`codeHighlighter.tsx` itself — don't add a parallel implementation in the
component.

## Expected/actual output panels: always make whitespace visible

Any UI that shows an exact "expected output" or the program's actual output
for the learner to compare by eye MUST render it through
`renderVisibleWhitespace` from `src/utils/outputDisplay.tsx` — never as
plain text.

**Why:** several exercises' correctness depends on an exact space that only
appears in the middle of a string (e.g. `print("Status: ")` +
`println("ACTIVE")` must produce `"Status: ACTIVE"`, not `"Status:ACTIVE"`).
A plain-text render gives the learner (and whoever is authoring/reviewing
lesson data) no way to tell a space is there at all — the character renders
as literally nothing. `renderVisibleWhitespace` marks every space with a
small, muted middle-dot so this becomes visible instead of a silent trap.

**How to use it:**
```tsx
import { renderVisibleWhitespace } from '../utils/outputDisplay';

<div className="font-mono ...">{renderVisibleWhitespace(output)}</div>
```

Already wired into `KotlinCodeRunner.tsx` (both the actual-output panel and
the "Expected: ..." diff line) and `Debug.tsx` ("Target Expected Output" and
"Program Output"). Use it in any new place that renders an exact output
string — never in prose/instructions or in source code (source code has its
own highlighter, see above; dotting it there would hurt readability for no
benefit).

## Expected/actual output panels: never let a single line word-wrap

Any container that renders an exact expected/actual output string (paired
with `renderVisibleWhitespace` above) must use `whitespace-nowrap
overflow-x-auto` (or a plain `<pre>`, which defaults to `white-space: pre`)
— never `whitespace-pre-wrap` / `break-words` / unset (browser-default
`normal`) white-space.

**Why:** `renderVisibleWhitespace` already inserts a real `<br/>` for every
actual `\n` in the output, so line breaks are never left to CSS. If the
container still allows word-wrap, a single long output line can visually
wrap onto a second line purely due to container width — and a wrapped line
looks *exactly* like the program produced an extra newline that isn't
actually there. Forcing `nowrap` (with horizontal scroll via
`overflow-x-auto` for long lines) guarantees what's rendered on one visual
line is really one line of output, nothing more.

This bit both `KotlinCodeRunner.tsx`'s actual-output panel (was
`whitespace-pre-wrap break-words`) and its "Expected: ..." diff line, and
`Debug.tsx`'s "Target Expected Output" card (had no whitespace class at all,
i.e. browser-default `normal`, which also collapses runs of spaces). Both
are now `whitespace-nowrap overflow-x-auto`.

## Instructional prose that quotes an exact output: keep it unbreakable

Any lesson-stage prose (e.g. a Write & Run `description`) that quotes a
literal expected-output phrase (e.g. `so they appear together as
"Status: ACTIVE".`) MUST be rendered through
`renderProseWithUnbreakableQuotes` from `src/utils/outputDisplay.tsx`
instead of as plain text.

**Why:** ordinary prose word-wraps at arbitrary points to fit the screen
width. If a quoted phrase like `"Status: ACTIVE"` happens to wrap right
between `"Status:` and `ACTIVE"`, it visually reads as if the expected
output itself contains a line break after `"Status:` — exactly the kind of
false signal a learner has no way to question, since they can't see the
raw string, only the rendered, wrapped prose. Wrapping every `"..."`
quoted span in `white-space: nowrap` forces the whole quoted phrase to move
to the next line together instead of splitting mid-phrase.

**How to use it:**
```tsx
import { renderProseWithUnbreakableQuotes } from '../utils/outputDisplay';

<p>{renderProseWithUnbreakableQuotes(data.description)}</p>
```
Already wired into `WriteRun.tsx`'s challenge description. Use it anywhere
else prose quotes an exact string the learner needs to reproduce
character-for-character.

This is a rendering fix only (keeps a quoted phrase from being split by
word-wrap). It intentionally does NOT dot-mark whitespace the way
`renderVisibleWhitespace` does above — decorating every quoted word in a
sentence would be visual clutter for no benefit, and whether the quoted
text is *correct* is a content-authoring concern, not a rendering one. See
the next rule for that.

## Content rule: description, TODO hint, solution, and expected output must all agree

Every `writeRun` (and `debug`) lesson has (at minimum) four places that
describe the same expected string: the `description` prose, the `// TODO:
...` hint left inside `initialCode`, the real `print()`/`println()`
argument(s) in `solutionCode`/`fixedCode`, and `expectedOutput` itself. When
any of these quotes a literal phrase describing a `print()`/`println()`
argument or the final assembled output (e.g. `Use print() to output
"Status: " and println() to output "ACTIVE"`), that quoted phrase's
whitespace MUST exactly match the real literal in `solutionCode`/
`fixedCode` (and, for a "whole result" phrase, `expectedOutput`) — not just
the same words trimmed. This applies uniformly to `description`,
`initialCode`'s TODO comment, and `debug.subtitle` — whichever of them
quotes the phrase.

**Why:** a learner has no other way to know a print target needs a
trailing/leading space than by reading the instructions (prose) or the
starter-code hint (TODO comment). If the code says `print("Status: ")`
(trailing space) but the description or TODO says `output "Status:"` (no
space), the instructions themselves teach the wrong thing — the learner
would reasonably conclude no space is needed, then fail the exercise for a
reason the instructions actively hid from them. When a space isn't
essential to what the lesson teaches, prefer removing the requirement
entirely (as was done for the `print()`/`println()` lesson) over asking
every description/hint to painstakingly reproduce it.

**How to check it — run the audit script, don't eyeball the data:**
```sh
npm run audit:output-quotes
```
This runs `scripts/audit-output-quotes.mjs`, which scans every
`writeRun`/`debug` block across `src/data/**`, extracts every
`print()`/`println()` string-literal argument from `solutionCode`/
`fixedCode`, and flags any quoted phrase in `description`/`subtitle` OR
`initialCode`'s TODO comment whose trimmed text matches a real literal (or
the assembled output) but whose exact whitespace doesn't. It exits non-zero
and lists every mismatch found
if there is at least one.

Run this after adding or editing any `writeRun`/`debug` lesson content —
whitespace mismatches like this are invisible by eye (a missing single
space in a paragraph of prose is not something a reviewer will reliably
spot by reading), so use the script rather than manually re-reading the
text.

## World 6's Sets lesson needed `.contains()` and mutable-Set `.remove()` added to the engine first

Before authoring World 6's Sets topic, `kotlinRunner.ts` had `setOf`/
`mutableSetOf` support (native JS `Set`, from the Arrays/Lists work) but no
`.contains(...)` method on any collection, and no `.remove(...)` on a
`mutableSetOf` result. Kotlin's `Set.contains(value)` is central to what a
Set lesson has to teach (membership checking is the main reason to reach
for a Set over a List), and a bare `.contains(` call would have transpiled
to valid-looking JS that throws `TypeError: ... .contains is not a
function` at runtime for every array/Set/mutableSetOf value — not a silent
wrong answer this time, but still a hard blocker discovered only by
actually running the exercise code, not by reading it.

Fixed by attaching real instance methods on the collection factories
themselves (no line-level regex transform needed, since `.contains(x)` and
`.remove(x)` are already valid JS method-call syntax once something in the
prototype chain — or, here, the instance itself — defines them):
`__kt_arrayOf`/`__kt_listOf`/`__kt_mutableListOf` results get a `.contains`
that delegates to `Array.prototype.includes`; `__kt_setOf`/
`__kt_mutableSetOf` results get a `.contains` delegating to
`Set.prototype.has`; and `__kt_mutableSetOf` additionally gets a `.remove`
delegating to `Set.prototype.delete` (mirroring how `__kt_mutableListOf`
already synthesizes `.add`/`.remove` on a plain JS array). `mapOf`/
`mutableMapOf` (`containsKey`/`containsValue`) were deliberately left
untouched — no Maps lesson content needed them yet at the time of this fix,
so extend them narrowly if/when a Maps exercise actually requires it,
rather than pre-building unused surface area.

**Rule, reinforced:** before writing Explore/Predict/Write&Run/Debug
content for any collection-related topic, grep `kotlinRunner.ts` for the
exact method/operator the lesson's code will call (`.contains(`, `.remove(`,
`in`, etc.) — a missing method here throws loudly rather than silently
misbehaving, but it's still a blocker only caught by actually running the
code through `compileAndRunKotlin`, exactly as every other entry on this
page insists.

## Finishing World 6 needed six more collection methods, Map destructuring in for-loops, and a near-miss with `!!`

Authoring World 6's remaining lessons (Mutable vs Read-Only, Creating and
Accessing, Adding/Removing/Updating, Iterating, Basic Operations, and the
World Boss) needed several more `kotlinRunner.ts` additions beyond the
`.contains()`/`.containsKey()` work already documented above:

- `.isEmpty()`/`.isNotEmpty()`/`.first()`/`.last()`/`.get(index)` on
  List/Array/Set results, and `.sorted()` (returning a **new**, ascending
  copy via `[...list].sort((a, b) => a < b ? -1 : a > b ? 1 : 0)` — the
  default `Array.prototype.sort()` compares elements as strings, which
  would silently misorder a list of numbers like `[5, 10, 2]` into
  `[10, 2, 5]` instead of `[2, 5, 10]`).
- `.removeAt(index)` on `mutableListOf` results (`list.splice(index, 1)[0]`,
  mirroring the existing `.add`/`.remove` synthesis).
- Destructured Map iteration, `for ((key, value) in map) { ... }` →
  `for (const [key, value] of map) {` in `transformForLoops` — the
  existing bare-identifier branch only matched a single loop variable, not
  a parenthesized pair, so this needed its own regex branch checked first.

All were verified with a 12-case scratch harness (including two
regression checks confirming plain `for (x in list/set)` iteration still
worked) before any lesson content was authored against them.

**A near-miss worth calling out:** the World 6 Boss's first draft used
`scores[name]!!` to satisfy what would be real Kotlin's nullable
`Map[key]` return type. Running it hit an immediate parse error —
`kotlinRunner.ts` has **no** support at all yet for `!!`, `?.`, or `?:`
(Null Safety is World 7, not yet built). Rather than half-building
non-null-assertion support just to unblock one exercise, the Boss was
redesigned to use `for ((name, score) in scores)` destructuring instead,
which yields a plain, already-non-null `Int` with no nullable ambiguity at
all — sidestepping the unbuilt feature entirely instead of reaching for it.

**Rule, reinforced again:** before authoring content that would naturally
reach for a nullable-safety operator (`?.`, `?:`, `!!`, `as?`) ahead of
World 7, redesign the exercise to avoid the nullable case structurally
(e.g. destructuring a Map's entries instead of indexing it by a
possibly-absent key) rather than writing Kotlin that this engine cannot
run yet. When World 7 is actually authored, `!!`/`?.`/`?:` need real
transpiler support added and verified the same way every other operator on
this page was, before any Null Safety lesson content is written.

## World 7 (Null Safety Shield): building `?.`/`?:`/`!!`/`as?` from zero

World 7 is entirely about nullable types and their operators, and
`kotlinRunner.ts` had **no** support for any of them beforehand (see the
entry above). Building it surfaced several gotchas:

1. **`?.` needed no new transform at all.** JS has had optional chaining
   (`?.`) since ES2020, with the same short-circuit-on-null/undefined
   semantics Kotlin's safe call has. The only wrinkle: JS optional chaining
   short-circuits to `undefined`, not `null`, while Kotlin has only one
   null. Fixed by making `formatKotlinValue` print `undefined` the same as
   `null` — otherwise `x?.length` for a null `x` would print the word
   "undefined" while `x` alone prints "null", an inconsistency with no
   Kotlin equivalent.

2. **`?:` (Elvis) is just JS `??`.** A single `line.replace(/\?:/g, '??')`
   is enough, since nullish coalescing treats null/undefined identically to
   Kotlin's Elvis operator.

3. **`!!` needed a real runtime helper, not a no-op strip.** A naive
   approach might just delete the `!!` characters, but that would silently
   turn a would-be-crashing assertion into a silent pass-through — exactly
   the "plausible-looking wrong answer" anti-pattern this file already
   warns about repeatedly. Instead, `expr!!` compiles to
   `__kt_notNull(expr)`, a helper that throws when the value is actually
   null/undefined, mirroring Kotlin's own NullPointerException-on-failed-
   assertion behavior. **Scope limit:** the regex is deliberately
   non-global, supporting only ONE `!!` per line. A naive global version
   mis-binds a second, independent `!!` on the same line to the wrong
   sub-expression (verified this failure mode directly before choosing the
   single-match design) — so lesson content never chains two separate `!!`
   assertions on one line.

4. **Nullable type annotations needed the type-stripping regexes widened
   twice, not once.** First pass: `val name: String? = ...` needed `?`
   added to the character class the `val`/`var` (and `fun` return-type)
   regexes use to consume and discard a declared type. Second, easy-to-miss
   pass: `val scores: Map<String, Int?> = ...` still failed to transpile
   even after that fix, because a multi-parameter generic like
   `Map<String, Int?>` contains a **comma and a space**, neither of which
   were in the character class either — the whole optional type-annotation
   group would then fail to match ANYTHING for that declaration, leaving
   the raw `val scores: Map<...> = ...` untouched and producing a
   `SyntaxError` at execution. A single-parameter generic (`List<Int?>`)
   happened to already work by accident (no comma inside), which is
   exactly the kind of instance that hides a bug until a differently-
   shaped example is actually run — caught only by executing a Map-typed
   nullable declaration through the real engine, not by reading the regex.

5. **A nullable collection reference's `.size` needed its own transform.**
   `bonuses?.size` for a `List<Int>?` doesn't match the existing
   `x.size` -> `__kt_size(x)` regex at all (the `?` breaks the match), so
   it fell through as literal `bonuses?.size` -- which IS valid JS
   (optional chaining), but JS arrays have `.length`, not `.size`, so it
   silently evaluated to `undefined` instead of the real count. Fixed with
   a dedicated `bonuses?.size` -> `(bonuses == null ? null : __kt_size(bonuses))`
   transform that runs before the plain one, preserving both the null-safety
   AND the custom size semantics together.

6. **`as? Type` reuses `is`/`!is`'s existing typeof-map**, scoped to the
   same Int/Long/Float/Double/String/Boolean set (never Char, for the
   established reason). Plain, unsafe `as` remains unsupported —
   deliberately out of scope since it isn't in World 7's topic list.

**Rule, reinforced yet again:** every one of these six gaps was caught by
actually executing code through `compileAndRunKotlin` in a scratch harness
*before* authoring lesson content against it -- reading the transform's
regex was not enough to predict any of these failures, especially #4
(single- vs multi-parameter generics) and #5 (a property name that
collides with a custom helper function, not a real JS property).

## World 8 (Object Kingdom): building class/data class/enum/interface/object from zero

World 8 is entirely about basic OOP, and needed the single largest
`kotlinRunner.ts` addition so far: a whole-source pre-pass,
`transpileOOPDeclarations`, that runs BEFORE every other transform and
handles `class`, `data class`, `enum class`, `interface`, and `object`
declarations. The full implementation lives in `kotlinRunner.ts` around
`transpileClassDeclarations`/`transpileEnumClasses`/
`transpileObjectDeclarations`/`stripInterfaceDeclarations`. Three bugs
here were only caught by actually running the generated JS:

1. **Trailing blank lines silently misclassified single-line members.**
   `splitClassMembers` divides a class body into members by scanning line
   by line, but a blank line sitting right before the class's own closing
   brace gets attached to the LAST member as an extra trailing line. That
   made a genuinely single-line member (a single-expression `fun greet() =
   ...` or a `val x = ...` property) look like a multi-line member, so the
   single-line-only classification checks failed and the member fell
   through to "pass through unchanged" -- leaving raw, un-transpiled Kotlin
   (`fun greet() = ...`) sitting inside a JS class body, a guaranteed
   syntax error. Fixed by trimming trailing blank lines in
   `transpileClassMember` before classifying the member.

2. **A data class's generated `toString()` got corrupted by the very next
   pass that runs after it.** The first version built it as a template
   literal, `` `${className}(${...})` ``, which puts the literal text
   `ClassName(` directly in the generated source. But the LAST step of the
   OOP pipeline, `insertNewForInstantiation`, blindly inserts `new` before
   ANY occurrence of `ClassName(` in the whole code string -- with zero
   awareness of whether that occurrence is a real instantiation or just
   characters sitting inside a string literal. It matched the toString’s
   own generated text and rewrote it into `new ClassName(...)` mid-string,
   corrupting the output. Fixed by building the toString via string
   concatenation instead (`'ClassName' + '(' + ...`), so the class name is
   never immediately followed by a literal `(` anywhere in the generated
   source text -- this is a general hazard for anything that pre-generates
   code containing a class name: check it doesn't accidentally look like a
   call site to the next pass.

3. **A bare-name supertype (`: Greetable`, an interface) was treated as a
   real superclass.** The class regex captures a supertype name whether or
   not it’s followed by constructor-call parens, but the first version
   added `extends SuperName` unconditionally whenever a supertype was
   present at all -- so implementing an interface (no parens) produced
   `extends Greetable`, and since `Greetable`'s own declaration had already
   been deleted entirely (see below), this threw `Greetable is not
   defined` at runtime. Fixed by gating `extends`/`super(...)` on whether
   the supertype was ACTUALLY followed by parens -- that presence/absence
   is exactly what distinguishes "extends a class" from "implements an
   interface" in Kotlin’s own grammar.

**A deliberate, load-bearing scope decision, not a bug:** method bodies in
this engine MUST reference their own class's properties via explicit
`this.propertyName` -- never a bare identifier. Method body statements are
passed through completely unchanged (verbatim) by the OOP pre-pass, relying
entirely on the *outer* per-line pipeline to process them normally
afterward, which is what keeps the whole implementation tractable. But that
also means there is no real lexical scope resolution: a bare `name` inside
a method has no way to know it should resolve to `this.name` instead of,
say, a same-named parameter (`fun setName(name: String) { name = name }`
is a completely ordinary, realistic pattern that a naive bare-name rewrite
would corrupt). Author every World 8+ lesson's method bodies with explicit
`this.` for property access, and never rely on Kotlin's real behavior of
resolving a bare name to a property when no local shadows it.

**Other scope limits, deliberately not supported (document before
extending):**
- A member's header (`fun foo(...) {`, `init {`, `val x: Int = ...`) must
  be a single line -- wrapping it across multiple lines before the opening
  brace breaks `splitClassMembers`'s member detection.
- No secondary constructors, no multiple supertypes/interfaces at once
  (single inheritance/interface only), no nested/inner classes.
- `enum class` bodies support only a plain, optionally-constructor-
  parameterized constant list -- no extra members after the constants, and
  no `.values()`/`.ordinal`.
- `interface` declarations are deleted WHOLESALE at transpile time (JS has
  no structural-interface concept to enforce, and every implementing class
  already supplies real methods via `override fun`) -- an interface with a
  DEFAULT method body that some implementer relies on WITHOUT overriding it
  would silently vanish. Every World 8 lesson's interfaces only declare
  abstract signatures, never default bodies, for exactly this reason.

**Rule, reinforced once more:** every one of these three bugs, plus the
`this.`-required convention, was found by actually compiling and running
representative snippets through `compileAndRunKotlin` in a scratch harness
BEFORE authoring lesson content -- including printing the transpiled output
directly (`transpileOOPDeclarations` was temporarily exported for this,
then reverted) to see exactly what JS a given piece of Kotlin produced.
Reading the regex/string-building code was not enough to predict any of
these three failures.

## Function values: parse scopes before lowering to JavaScript

The function/lambda pass now lives in `src/utils/kotlinFunctions.ts`. Do not
restore the old single-line lambda regexes: they lose multiline bodies, nested
function signatures, lexical receivers, and the destination of a return.

Supported and regression-tested behavior includes:

- Multiline/multiple-statement lambdas, closures, nested `it`, last-expression
  results (including `if` and subject-based `when`), and trailing lambda calls.
- Anonymous functions with expression or block bodies, local early returns,
  inferred parameters in a typed context, and receiver functions.
- Nested, nullable, named-parameter, receiver, and aliased function types;
  function arguments/results; ordinary and `invoke` calls; generic higher-order
  examples. A nullable function type differs from a nullable return type.
- Top-level/local, bound/unbound member, constructor, and extension function
  references. A bound receiver is evaluated once and retains that instance.
- Implicit and explicit return labels; non-local returns through supported
  standard inline callbacks and user-defined inline function parameters.
  `noinline` and `crossinline` disallow non-local returns. Anonymous functions
  establish their own ordinary-return boundary.
- Basic function-signature checks before execution: known parameter/result
  types, argument/parameter counts, function-reference compatibility, nullable
  invocation, and invalid return targets. Diagnostics retain source line numbers.

Non-local returns use per-invocation target objects. Only the matching lexical
boundary catches its return; other boundaries rethrow it. User catch blocks must
also rethrow these internal transfers, while finally blocks still run. Never
replace a non-local return with a JavaScript callback's ordinary `return`.

Verification:

- `npm run test:lambda-runner` checks valid results and compiler-style rejections.
- `npm run test:lambda-kotlin` independently compiles/runs the shared fixtures
  with real Kotlin. Set `KOTLIN_COMPILER_CLASSPATH` to an installed Kotlin JVM
  compiler and its dependency JARs; optionally set `KOTLIN_RUNTIME_CLASSPATH`.
  This test does not install or download a compiler.
- Existing Stage 4 and typing/program suites exercise the rest of the runner.

This remains a browser teaching runner. The signature checks do not implement
Kotlin's complete type system, overload resolution, reflection, suspend functions,
or JVM inlining/performance. Do not grade those compiler/runtime guarantees as
if they were simulated. Execute each new lesson's particular code before marking
it supported in `CodeDo_Editor_capacity_per_lesson_status.xlsx`. The deleted
`CODEDO_EDITOR_CAPACITY.md` must not be recreated as a second capacity tracker.

### World 10 collections

#### Re-audit: trailing-lambda Map producers were not recognized for bracket lookup

The runner identifies variables initialized by `groupBy`/`associate` so Kotlin
`groups[key]` becomes JavaScript `groups.get(key)`. That detector required an
opening parenthesis after the operation name. Idiomatic Kotlin normally writes
`items.groupBy { ... }`, so the result printed as a valid Map while a following
String-key bracket lookup silently returned null through JavaScript property
access. In `groups["key"]?.sum() ?: 0`, it ran successfully and printed a
plausible but wrong zero.

Accept either `(` or `{` after Map-producing collection operations. The World
10 exact-output audit exercises grouped String keys in a filter/group/sum
pipeline; real-Kotlin comparison verifies the same values. Keep Map-result
detection in sync with every supported trailing-lambda Map producer.

Use `KotlinList` for list factories and transformation results so chained operations retain Kotlin behavior. Do not reinstall collection helpers on native Array.prototype. Pair is an iterable object with `.first`/`.second`; JS Map constructors require conversion to two-element arrays. Partition must evaluate its predicate once per element. Validate chunk/window size and step before entering synchronous loops.

Run `npm run test:collection-runner`; optionally compare the shared fixtures against a local Kotlin compiler with `npm run test:collection-kotlin`. See [WORLD_10_CAPACITY_AUDIT.md](WORLD_10_CAPACITY_AUDIT.md) for numeric type filtering, equality, formatting and content-coverage limits. Keep those limits in the existing XLSX tracker.

## `toFloat()` printed raw float32-rounding noise instead of Kotlin's shortest decimal

Found while fixing World 1's Float & Double lesson (`WORLD_1_CONTENT_REVIEW.md`
finding W1-06): `Number.prototype.toFloat` returned `Math.fround(Number(this))`
directly -- the nearest true 32-bit float value, but as a raw JS double. JS has
no separate float32 printing path, so `println`ing that value showed the
double's full decimal expansion of the float32 approximation (e.g.
`19.989999771118164` for `19.99`), while real Kotlin's `Float.toString()`
prints the shortest decimal that round-trips to the same float32 (`19.99`).
Any `writeRun`/`debug` exercise built around a `.toFloat()` conversion would
have graded byte-for-byte-correct Kotlin as wrong, exactly like the `Int / Int`
truncation bug above.

Fixed by rounding to 7 significant digits (float32's precision ceiling) before
converting back to a plain number: `Number(Math.fround(Number(this)).toPrecision(7))`.
This isn't a full shortest-round-trip algorithm (real Kotlin/Java's
`Float.toString` is more precise about it for edge cases), but it reproduces
the expected output for the lesson-scale values this app's content actually
uses. If a future lesson needs a Float value where this heuristic visibly
diverges from real Kotlin, verify with `compileAndRunKotlin` before shipping,
the same as every other numeric-formatting entry on this page.

## `kotlinFunctions.ts` has its OWN tokenizer, and it split decimal literals into three tokens

Found while auditing World 2 (Operator Forge)'s Arithmetic Operators lesson:
an Explore card's `println(a / 2.0)` (Int variable divided by a Double
literal, meant to demonstrate Double-promotion -- the exact opposite of Int
truncation) failed with `Runtime error: missing ) after argument list`.

Root cause: `kotlinFunctions.ts` (the function/lambda lowering pass) does
**not** reuse `kotlinSource.ts`'s shared `scanKotlin` tokenizer -- it has its
own private `lex()`, and that lexer's numeric-literal handling was folded
into the generic alnum-run branch (`/[A-Za-z_0-9]/`), which stops at the
first non-alphanumeric character. Since `.` isn't in that character class,
`2.0` tokenized as THREE separate tokens: `2`, `.`, `0` -- unlike
`scanKotlin`, which already scans a decimal literal as one token. This
silently broke the Int/Long division-truncation check a few lines later
(`kotlinFunctions.ts` has its own, independent copy of that logic, separate
from `kotlinRunner.ts`'s `wrapIntDivision` -- see the entry above; the two
never shared an implementation): the check only looks at the token
immediately after `/`, expecting either a real number token or an
Int/Long-typed variable, and a bare `2` (the split-off integer part) matched
`/^\d+$/` and got wrapped as `Math.trunc(a / 2)`, with the literal `.0` from
the original source left dangling right after -- `Math.trunc(a / 2).0`, a
syntax error the moment ANY Int variable was divided by an inline Double
literal like `2.0` (dividing by a Double VARIABLE, or by an Int variable,
never hit this, since both of those are still single tokens either way --
that's exactly why this had never been caught until an Explore example
happened to use this precise shape).

Fixed by giving `lex()` its own numeric-literal branch (checked before the
generic alnum branch), scanning the same shape `scanKotlin` does: optional
digit-group separators, an optional decimal part guarded by `(?!\.)` (so a
range like `5..10` still tokenizes as `5`, `..`, `10`, not `5.` followed by
garbage), an optional exponent, and an optional type suffix.

**Rule, reinforced:** this file has TWO independent tokenizers
(`kotlinSource.ts`'s `scanKotlin`, shared broadly, and `kotlinFunctions.ts`'s
private `lex()`) and TWO independent Int/Long division-truncation
implementations (`kotlinRunner.ts`'s `wrapIntDivision`, string/regex-based,
and `kotlinFunctions.ts`'s token-based one at the bottom of `lower()`). A
fix to one does NOT automatically cover the other -- when touching numeric-
literal handling or division-truncation logic, grep for both
implementations and verify both with `compileAndRunKotlin`, specifically
including the case of an Int identifier divided by an inline Double literal
(`a / 2.0`), not just two bare identifiers or two bare literals.

**Immediate follow-up regression from the fix above, in the same file:**
fixing `lex()` to scan a decimal literal as one token broke a SEPARATE piece
of logic that had been silently depending on the old three-token split:
`infer()`'s numeric-literal branch detected `Double` by checking
`top(a, b, '.') >= 0` -- "is there a standalone `.` token in this range" --
which only ever found one because the old lexer bug happened to produce a
literal `.` token between the two half-tokens of a decimal literal. Once
`lex()` correctly emitted `10.0` as ONE token, that standalone `.` token no
longer existed, so `top(a, b, '.')` always returned -1 and every decimal
literal was misclassified as `Int`. This silently broke `__kt_decimalText`
formatting (see the "Kotlin `Int / Int` division never truncated" pitfall
above for that helper) for EVERY bare Double reference -- `val total = 10.0;
println(total)` printed `10`, not `10.0` -- and, far more visibly, broke
compound assignment on an explicitly-typed Double var entirely: `var total:
Double = 10.0; total *= 1.5` raised `Compilation error: Type mismatch:
expected Double, got Int`, because the RHS of the compound assignment was
also misinferred as Int against the declared Double type. Fixed by checking
the literal's own source text for a decimal point (`/\.\d/.test(text(a,
b))`) instead of hunting for a top-level `.` token that no longer exists.

**Rule, reinforced again, harder this time:** a fix to a tokenizer is not
"done" once the bug it targeted is verified fixed -- grep every OTHER place
in the same file that inspects token structure (`top(...)`, token-count
comparisons like `a + 1 === b`, etc.) for anything that might have been
unknowingly relying on the exact SHAPE of tokens the old (buggy) tokenizer
produced. This is why `WORLD_1_CONTENT_REVIEW.md`/`WORLD_2_CONTENT_REVIEW.md`
authoring now specifically tests bare `var`/`val` Double references and
compound assignment on a Double, not just Double arithmetic expressions --
the arithmetic-expression case alone did not surface this regression, since
`infer()`'s `+`/`-`/`*`/`/` branches recurse into their operands rather than
re-checking `top(a, b, '.')` themselves.

## `mutableMapOf(...).remove(key)` was never synthesized, unlike Set's `.remove()`

Found while auditing World 6 (Collection Valley). The "Finishing World 6"
entry above documents adding `.remove(item)` to `mutableSetOf` results,
delegating to `Set.prototype.delete` -- but the equivalent method was never
added to `mutableMapOf` results. `withMapChecks` only ever added
`containsKey`/`containsValue`/`isEmpty`, so `scores.remove("Tom")` on a
`mutableMapOf` result threw `scores.remove is not a function`, even though
this is completely ordinary, commonly-taught Kotlin (`MutableMap.remove`
deletes the entry for a given key). This is exactly the kind of loud,
easy-to-miss-until-you-actually-run-it capability gap this file exists to
catch -- it went unnoticed because no lesson content had exercised Map
removal until this audit pass tried to add it.

Fixed by giving `__kt_mutableMapOf`'s result its own `.remove(key)`,
delegating to `Map.prototype.has`/`.get`/`.delete` (mirroring Kotlin's own
`remove` semantics: return the removed value, or null if the key wasn't
present) rather than JS's native `Map.prototype.delete` directly, which is
differently named and returns a boolean instead of the removed value.
Scoped to `__kt_mutableMapOf`'s own returned instance only -- `__kt_mapOf`
(the read-only factory) still has no `.remove` at all, correctly matching
that real Kotlin's read-only `Map` has no such method either. Verified a
read-only `mapOf(...).remove(...)` call still fails, and a
`mutableMapOf(...).remove(...)` call now both removes the entry and
returns the correct leftover map.

## Escaped `\$` inside a string template was wrongly turned into `${identifier}`

Found while auditing World 1's String Templates lesson against the new
"commonly used features" rule in `LESSON_QUALITY_STANDARD.md`: the lesson's
own Learn section teaches escaping a literal dollar sign with `\$` (e.g. so
`"Price: \$price"` prints the literal text `Price: $price`, not an
interpolated value) but had no Explore/Predict exercising it -- and
attempting to add one immediately surfaced that the engine got it wrong:
`println("Price: \$price")` printed `Price: ${price}` (with literal curly
braces!) instead of `Price: $price`.

Root cause: `transpileKotlinToJS`'s string-template transform
(`inner.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, '${$1}')`) blindly wraps
every `$identifier` it finds in `${...}`, with no awareness that a
preceding backslash means Kotlin's own escape for a literal dollar rather
than an interpolation marker. So `\$price` (backslash, dollar, "price")
became `\${price}` in the generated JS template literal. JS's OWN escape
rules for `\$` (escaping only the dollar, not a following `{`) then kicked
in: since a literal `{` immediately followed the escaped `$`, JS printed
the `$` as literal text but rendered `{price}` as its own literal text too
(no interpolation, since the `$` right before it was already consumed as
an escape) -- producing the wrong `${price}` instead of correctly leaving
`price` as ordinary trailing text with no braces at all.

Fixed with a negative lookbehind, `(?<!\\)\$([a-zA-Z_][a-zA-Z0-9_]*)`, so a
backslash-escaped `$identifier` is left completely untouched by this
transform. This works because JS's own template-literal escaping already
treats a bare `\$` (not followed by `{`) as producing a literal `$`
character with no further special handling of what follows it -- so once
this transform stops adding synthetic braces, the pre-existing backslash
already produces the exact right output on its own, with zero extra code
needed for the "already correctly escaped" case.

**Rule, reinforced:** this bug was found specifically because the new
"commonly used features" rule requires testing a feature the Learn section
itself claims to teach (`\$` escaping) rather than stopping once the
lesson's *existing* Explore/Predict examples all pass. A lesson's Learn
prose describing a behavior is not evidence that the behavior actually
works in this simulator -- run it through `compileAndRunKotlin` before
authoring an Explore/Predict example around it, the same as every other
entry on this page.

## Named arguments silently reordered wrong instead of failing or working

Found while auditing World 5 (Function Forge)'s Named Arguments lesson.
Every prior note about this feature (see the "Functions needed real engine
support before World 5" entry above) said named arguments at a call site
were simply **not transpiled** -- meaning code using them should either be
confined to non-executed Learn/Predict text or avoided in
`writeRun`/`debug`. In practice the engine did something worse: it silently
ran `move(y = 4, x = 2)` and printed `4, 2` -- treating the WRITTEN order of
the named arguments as if it were plain positional order, completely
ignoring the `x =`/`y =` labels, instead of either reordering correctly
(`2, 4`) or failing loudly. This is exactly the "plausible-looking wrong
answer" failure mode this file warns about repeatedly, and it slipped past
World 5's own audit script because that script only checked that Explore
cards ran *successfully*, never that their output was actually correct.

Root cause: `kotlinFunctions.ts`'s named-argument reordering logic already
existed, but the `names` array driving it (the ordered list of parameter
names a `paramName = value` argument gets matched against) was populated
**only** for two hardcoded collection helpers, `windowed` and `chunked`
(`collectionNames[info.name]`, gated on a leading `.` receiver call) --
never for an ordinary user-defined function. So for any regular function, the
"is this argument named?" branch never activated, and each argument's full
source text (including the `paramName = ` prefix) got passed straight
through to `lower(...)` as a plain expression. `y = 4` and `x = 2` are each
independently valid JS assignment expressions (assigning to a same-named
identifier and evaluating to the assigned value), so `move(y = 4, x = 2)`
transpiled to something that behaved like `move(4, 2)` -- silently correct
looking JS, silently wrong Kotlin semantics.

Fixed by also populating `names` from the callee's own declared parameter
list (`info.signature?.params.map(p => p.name)`) for an ordinary function
call, reusing the same reordering logic already in place for
windowed/chunked. Unfilled positions (a caller relying on a default value)
are left as the literal string `'undefined'` rather than reconstructed from
each parameter's own default-value expression -- a user-defined function is
already transpiled with real JS default parameters (see where `fun`
declarations are lowered), and JS applies those defaults itself whenever it
receives an `undefined` argument, so no separate default-lookup is needed.
Verified against reordered args, labeled same-type args, mixed positional +
named args, and a named call that omits a defaulted parameter -- all now
match real Kotlin. Also verified zero regressions across the full existing
test suite (all five worlds' audit scripts, lambda-runner, collection-
runner, World 11 content).

**Rule, reinforced:** an Explore/Predict card that merely *runs without
throwing* is not proof it teaches the right thing -- add an explicit
expected-output assertion (not just a success/failure check) for any
example whose entire teaching point is a specific printed value, the same
way `writeRun`/`debug` are already checked against `expectedOutput`. This
bug would have been caught immediately by such a check; it was invisible to
a check that only asks "did it crash."

## World 7 audit: null operators need expression boundaries, not line regexes

The earlier “World 7 ... building from zero” entry describes the original
implementation. Its one-assertion-per-line limit and direct Elvis substitution
are superseded by this audit's token-based lowering in `kotlinFunctions.ts`.

**High — silently wrong output.** A safe call used directly in println printed
`null`, but storing it and interpolating/concatenating it printed `undefined`.
The old formatter normalized only final print arguments; JavaScript had already
converted undefined into part of a string before that formatter ran. Safe-call
expression results now coalesce to actual null before composition, and template
expressions use the shared Kotlin value formatter. Tests cover direct printing,
stored results, `$value`, `${receiver?.length}` and concatenation.

**High — Elvis precedence.** Replacing `?:` with `??` did not preserve Kotlin's
precedence relative to comparisons and Boolean operators. `n ?: 0 > 1` with
n=2 printed `2` instead of `true`; mixing Elvis with || could fail JS parsing.
The function lowerer now splits expressions at token/delimiter boundaries and
emits explicit grouping. Elvis fallback functions remain lazy. A declaration
such as `val text = name ?: return 0` now lowers to a value assignment followed
by a null guard and the existing scoped return handling. This adds the ordinary
guard-return form; it is not a claim to implement every throw/return expression.

**High — assertions and casts bound to the wrong operand.** The line regex
could not handle two `!!` uses, quoted map indices, or function-call receivers.
Assertions now wrap the complete postfix expression; independent/chained uses,
left-associative arithmetic and integer division are regression-tested. A null
assertion still throws, including when it is the second assertion on a line.
The old safe-cast regex also repeated its operand and could not parse a function
call. The replacement evaluates that operand once using a local lambda value.

**High — a numeric safe cast silently converted the wrong type.** All numeric
targets previously used typeof number, so `val x: Any = 2.5; x as? Int` returned
2.5 instead of null. For statically known immutable primitive values, the
lowerer retains the initializer's type and distinguishes numeric targets.
Numeric safe casts from mutable or erased/unknown sources are explicitly
rejected; this is an editor limit, not a Kotlin restriction. Char targets and
known Char-to-String safe casts also fail explicitly rather than pretending
that JS string values preserve Kotlin Char identity. Full runtime type tagging,
generic casts and comprehensive flow analysis are still not implemented.

**High — a known null numeric value acted like zero.** `val n: Int? = null;
println(n + 1)` printed 1. The lowerer now rejects arithmetic and unguarded
member access on tracked known-null locals, with guards for the checked branch
and ordinary short-circuit forms. This is a limited diagnostic improvement, not
full Kotlin smart-cast verification for arbitrary parameters, aliases, mutable
properties or callbacks. Language explanations must describe Kotlin's compile-
time rejection, even where the simulator's remaining checks are incomplete.

Verification: `npm run audit:world7-quality` compares exact Learn/Explore/Predict
outcomes, all writing/debugging pairs, and `null-safety-runner-cases.ts` boundary
probes. `test:world7-kotlin` optionally checks these against a local compiler.
Never replace these output assertions with success-only checks: that would
reintroduce the blind spot which hid the interpolation, Elvis and cast defects.

## World 8 audit: a class was never type-compatible with the interface it implements

Auditing World 8's Interfaces lesson found `interfaces-explore-3` -- an
entirely ordinary, correct piece of Kotlin (`fun announce(g: Greetable)`
called as `announce(p)` where `p: Person` and `class Person(...) :
Greetable`) -- failing with `Compilation error: Type mismatch: expected
Greetable, got Person`. Root cause in `kotlinFunctions.ts`: the loose
class/class name-compatibility check `compatible()` uses to avoid rejecting
valid calls only ever consults a `classes: Set<string>` populated by `class`
declarations; `interface` declarations were never added to that same set,
so a class name and the interface it implements were never recognized as
compatible at all. Fixed with a one-line addition right after the existing
`class` registration: `if (at(i) === 'interface') classes.add(at(i + 1));`
-- interfaces now register into the exact same set the class/class check
already treats as mutually compatible. This is not real subtype
tracking -- like the pre-existing class/class case, it just treats any two
known declared type names as compatible -- but it's enough to stop a valid
implements-and-passes-as-the-interface-type call from being wrongly
rejected. Verified via `compileAndRunKotlin` (the exact failing call now
prints `Hi, I'm Zoe`) and the full existing regression suite (Worlds 1, 5,
6, 7, lambda-runner, collection-runner, World 11 content, `tsc --noEmit`)
-- zero regressions.

**Same audit, a content-only finding, not an engine bug:** all 12 of World
8's lessons with both a Write & Run and a Debug stage had `debug.fixedCode`
byte-for-byte identical to their own `writeRun.solutionCode` -- the same
systemic issue already found and fixed in Worlds 4, 5, 6, and 7 (see
`LESSON_QUALITY_STANDARD.md` section 2's rule against this). Every one of
Classes, Objects, Properties, Methods, Constructors, Primary Constructors,
Data Classes, Enums, Basic Inheritance, Interfaces, Overriding Members, and
the Boss was affected -- the worst case of any world audited so far (100%
of the eligible lessons, versus 9/10 for World 6 and smaller counts
elsewhere). Fixed the same way as every prior instance: gave each Debug
exercise its own scenario (different class/variable names, values, and in
several cases domain) while keeping the exact bug mechanism the lesson
already taught (swapped constructor property order, reading an undeclared
property, subtract-instead-of-add, a missing multiplication factor, reading
`this.param` instead of the bare constructor parameter, a missing `val`,
a missing `data` keyword, wrong enum constant arguments, a wrong operator
inside an override, an unexplained subtraction inside an override, a
missing `override` entirely, and the Boss's off-by-boundary `>` vs `>=`
comparison). Verified every new scenario individually via
`compileAndRunKotlin` before editing, then confirmed zero remaining
duplicates with a `writeRun.solutionCode`/`debug.fixedCode` comparison
script across all of World 8, `npm run audit:world8-quality` (42 examples,
42 predictions, 52 execution checks, all passing), and the same full
cross-world regression suite as above.

## Trailing lambdas with explicit parameter arrows were mistakenly emitted as literal lambdas instead of attaching to the call site

Found while auditing World 9 (Lambda Lab): `return@forEach` inside a trailing lambda with an explicit parameter arrow (`items.forEach { item -> if (item < 0) return@forEach; println(item) }`) failed to compile with `Compilation error: Unresolved return label: forEach`.

Root cause: in `src/utils/kotlinFunctions.ts`, the lowering loop emits lambda expressions through two branches:
1. `trailing` (a lambda immediately trailing a function/method call), which assigns the callee's name (`forEach`, `filter`, etc.) as the implicit label for labelled returns (`return@forEach`).
2. `literal` (a standalone lambda expression `{ ... }`).

When a lambda contained an explicit parameter arrow (`item ->`), the lookup checked `literal` before `trailing`, or the condition matched `literal` because both `trailing` and `literal` records were indexed by opening brace. Because `literal` was selected over `trailing`, the engine emitted the lambda as a standalone function value rather than associating it with the enclosing call. Consequently, the call's name was never registered as an active label in the lambda's lexical scope, causing `return@forEach` to be rejected as an unresolved return label.

Fixed in `src/utils/kotlinFunctions.ts` by prioritizing `trailing` lambdas over `literal` lambdas when both match a token index (`const lambda = trailing ?? literal`). This ensures trailing lambdas with explicit parameter arrows are correctly associated with their call site, allowing implicit labels like `@forEach` to resolve properly. Verified via `npm run test:lambda-runner` (119/119 passing), `npm run audit:world9-quality`, and cross-world regression tests.


## World 9 re-audit: constructor-expression references are bound

`val action: (Int) -> Int = Scale(3)::apply` was rejected as if its type
were `(Scale, Int) -> Int`. The inference pass identified an unbound
reference merely because the receiver started with a class name; lowering
correctly treated the full constructor expression as an instance. Require
`::` immediately after the type token when inferring an unbound receiver,
matching the lowering decision. `Scale::apply` still takes the instance as
an argument; `Scale(3)::apply` captures the constructed instance. Regression:
`constructor expression produces a bound member reference` in
`lambda-runner-cases.ts`, plus the authored World 9 member-reference prediction.

### World 9 inline-parameter validation: storing and capturing require modifiers

The runner checked forbidden non-local returns at call sites but accepted
`inline fun keep(action: () -> Unit): () -> Unit { return action }` without
`noinline`, and accepted capturing plain `action` inside a stored helper
lambda without `crossinline`/`noinline`. Real Kotlin rejects both.

Track an inline parameter's declaring function frame and modifier in lexical
type context. Reject using an inlinable parameter as a standalone stored or
returned value; require `noinline`. Reject invoking an ordinary inline
parameter across a non-inline function/lambda boundary; allow `crossinline`.
Forwarding to compatible inline parameters remains supported; forwarding to
an ordinary/noinline parameter needs a storable callback. Regression cases
live in `scripts/world9-inline-validation-cases.ts`, and both the World 9
runner audit and real-Kotlin reference test require compilation rejection.
This is scoped validation of these forms, not complete Kotlin escape analysis.

## Content rule: lesson code arrays must be properly formatted, not semicolon-crammed

Found repeatedly across World 11's audit (six separate lessons): an
Explore/Predict `code` array entry that squeezes multiple class/object
members onto one physical line with `;` (e.g. `class Counter{var n=0;private
set;fun inc(){n++}}`) is not just hard to read -- it silently breaks
execution. `splitClassMembers` in `kotlinRunner.ts` divides a class/object
body into members by scanning **line by line**, matching a new member only
when a line trimmed-starts with `val`/`var`/`fun`/`init`/`constructor`. Every
member after the first on a semicolon-joined line is invisible to this scan
and gets absorbed into the previous member's body text instead of being
recognized as its own declaration, producing anything from a silent wrong
answer to a hard parse failure -- and the *exact same code*, reformatted
onto separate lines with no other change, works correctly.

The same failure mode also hit a `when(s) { A->0;is B->s.n }` single-line,
semicolon-joined branch list (`parseWhenBranches` also only split on
newline until fixed) and a `by lazy { stmt1; stmt2 }` single-line lazy
block. All three were fixed by teaching the respective parser to also split
on top-level `;`, but new lesson content should not rely on that -- write
every class/object body, `when` branch list, and `lazy`/other block body
across real lines from the start, matching this file's own multi-line
style everywhere else. This is now a standing authoring rule, not just a
one-off fix: see `LESSON_QUALITY_STANDARD.md` section 4's formatting
paragraph, and check any newly authored `code`/`codeSnippet` array against
it before shipping, the same way every other pitfall on this page insists
on running the code rather than reading it.

## `insertNewForInstantiation` corrupted a class name that appeared inside an unrelated string literal

A generic class's own method building a display string, `"Wrapped(" +
value + ")"`, got silently corrupted into `"new Wrapped(" + value + ")"`.
`insertNewForInstantiation` (`kotlinRunner.ts`) is the final pass that
inserts `new` before every `ClassName(` occurrence in the whole source, but
it was a blind whole-string regex replace with no idea whether a given
match sat inside an actual instantiation or inside a string literal that
merely happened to contain the same text. Any Kotlin string literal
containing `"<SomeKnownClassName>("` -- not just a `toString()`-style
override (already worked around by building those via concatenation, see
the data-class `toString()` pitfall above) but *any* ordinary string a
method returns -- was silently corrupted the same way.

Fixed by restricting the replace to non-string chunks of each line, reusing
`splitCodeAndStrings` (the same string/code split `rewriteClassPropertyAccess`
already uses) instead of running the regex over raw, undifferentiated
source text. If you add another whole-source text transform to this file,
check whether it needs the same string-literal exclusion before assuming a
plain global regex replace is safe.

## World 12 (Generic Realm): generic class/interface names with `<...>` broke parsing wherever they appeared

Building World 12 surfaced a cluster of bugs, all variations on the same
theme: earlier code (`kotlinRunner.ts`'s class/interface/object regexes,
and `kotlinFunctions.ts`'s type reader) was written and tested before any
lesson used a GENERIC class/interface as a supertype or return type, so
none of it accounted for a `<...>` argument sitting where only a bare name
was expected.

1. **`where T : X, T : Y` multi-bound clauses corrupted the return type and
   body.** `kotlinFunctions.ts`'s return-type reader has no concept of a
   `where` clause, so it kept consuming tokens past it, gluing it onto the
   return type with no whitespace (`StringwhereT:Named,T:Prioritized`) --
   corrupt text that then failed to parse as either a type or a function
   body. Fixed in `kotlinRunner.ts` by stripping `\bwhere\s+...` (up to the
   next `=`/`{`) before any other transform runs.

2. **`interface Logger<in T>{...}` itself failed to parse.**
   `transpileInterfaceDeclarations`'s regex required the interface name to
   be immediately followed by `{`, with no room for a generic type
   parameter list. Fixed by allowing an optional `(?:<[^>{}]*>)?` between
   the name and the brace.

3. **A generic supertype broke both `class X : Interface<Arg>{...}` and
   `object X : Interface<Arg>{...}`.** Neither `classRe` (class
   declarations) nor the separate `objectInterfaces` capture regex (object
   declarations) allowed a `<...>` after a supertype/interface name, so the
   `<Arg>{...}` tail leaked through as raw, unparseable trailing text. Both
   were fixed the same way (allowing an optional generic argument after
   each supertype name), and the `interfaceNames` derivation also needed to
   strip a trailing `<...>` in addition to the trailing `(...)` it already
   stripped, so the interface-default-mixin/`__kt_implements_X` logic still
   recognized the bare interface name underneath. **This retroactively
   uncovered a real, previously undetected bug in World 11's own Boss
   lesson** (`object UserFormatter:Formatter<User>{...}`) that had been
   silently broken since it was written -- it was never caught by the
   World 11 audit because that specific Explore card is labeled
   `'Behavior'`, not `'Output'`, so it was never exact-execution-checked.
   **Rule, reinforced:** a card without an exact-output check is not a card
   that's been verified to run at all; run it anyway, the same as every
   other card, even when nothing will diff its result.

4. **`insertNewForInstantiation` also needed string-literal awareness for
   an unrelated reason found in the same pass -- see the dedicated entry
   above.**

## World 12: generic type ARGUMENTS were never actually inferred, only accidentally guessed at via string shape

`kotlinFunctions.ts`'s `readType()` builds a declared type's `.name` as the
raw source text including any `<Arg>` (e.g. a `val b: Box<Int>` declaration
reads as `.name = "Box<Int>"`), but a CONSTRUCTOR CALL's inferred type
(`Box("seven")`) only ever resolved to the bare class name with no argument
at all (`.name = "Box"`) -- there was no mechanism to infer what `T` had
actually been instantiated as. This produced two different failures
depending on which way the accidental string mismatch cut:

- **False rejection:** `class MutableBox<T>(var value:T)` with
  `val b: MutableBox<String> = MutableBox("draft")` -- a completely valid,
  matching assignment -- was rejected as `Type mismatch: expected
  MutableBox<String>, got MutableBox`, purely because the actual side never
  carried its `<String>` argument at all.
- **Accidental pass, for the wrong reason:** the existing Generic Classes
  lesson's Predict question relies on `val b: Box<Int> = Box("seven")`
  being flagged as a compile error -- and it was, but only because
  `"Box<Int>"` happened to not equal the bare string `"Box"`, not because
  the engine understood that a String was passed where an Int was
  expected. A genuinely matching case in the same shape (`Box<String> =
  Box("draft")`) would have hit the exact same false-rejection bug above
  had anyone tried it before this audit.

Fixed properly rather than patched around: added `classTypeParams` (a
class name -> its own declared type parameter names, e.g. `Box` -> `['T']`)
and fixed constructor registration to actually run for a GENERIC class
(the pre-existing check `at(i + 2) === '('` never matched when a `<T>`
clause came first, so `constructors` was silently empty for every generic
class beforehand). Then, for the common case of a single type parameter
whose constructor parameter is declared with that exact bare name, the
constructor-call inference in `infer()` now looks up which constructor
parameter position corresponds to `T` and infers the real argument type
from the actual expression passed there, returning e.g. `{name:
"Box<String>"}` for `Box("seven")` instead of a bare `{name: "Box"}`. This
makes both cases above correct for the RIGHT reason: `MutableBox<String> =
MutableBox("draft")` now compares `"MutableBox<String>"` against
`"MutableBox<String>"` (match, correctly accepted), and `Box<Int> =
Box("seven")` now compares `"Box<Int>"` against `"Box<String>"` (mismatch,
correctly rejected with an honest error message naming the real inferred
type, not a coincidental string collision).

**Scope limit:** only single-type-parameter classes get this treatment
(`Cell<K, V>` still falls back to the old bare-name behavior) -- extend
`classTypeParams`/the inference lookup to multiple type parameters
together only once a lesson actually needs it, verifying with
`compileAndRunKotlin` the same way as everywhere else on this page.

## World 12: a use-site variance annotation only stripped ONE side of a generic comparison, and a generic function's own type parameter names were hardcoded to only "T"/"R"

Two related but separate bugs, both in `compatible()`/`readType()` in
`kotlinFunctions.ts`:

1. **`Array<in String>` (a function parameter's use-site-projected type)
   correctly stripped down to a bare `"Array"` once `readType` recognized
   the projection, but the ACTUAL argument passed at the call site (e.g.
   `val a: Array<Any> = arrayOf(0)`, with no variance keyword of its own)
   kept its full `"Array<Any>"` name -- so `compatible()` compared `"Array"`
   against `"Array<Any>"` and still rejected a genuinely valid call.
   Fixed by adding a narrow fallback in `compatible()`: when the two names
   differ, also compare their BASE names (text before `<`) for a fixed set
   of built-in generic collection types (`Array`, `List`, `MutableList`,
   `Set`, `MutableSet`, `Map`, `MutableMap`, `Pair`) -- this engine has no
   real generic-argument tracking for these built-ins anyway (unlike the
   user-defined-class case, which deliberately keeps comparing full
   bracketed names so a genuine mismatch like `Box<Int> = Box("seven")`
   above still gets flagged for the right reason).

2. **A generic function's own type parameter name was hardcoded.**
   `compatible()` treated the literal names `"T"` and `"R"` as always
   wildcard-compatible (since this engine has no real per-call-site generic
   substitution), but `header()` never recorded a function's ACTUAL
   declared type parameter names anywhere -- so a function declared as
   `fun <A, B> transform(v: A, f: (A) -> B): B = f(v)` had its parameter
   type `"A"` compared literally against a real argument's type (e.g.
   `"Int"`) and always failed with a false `Type mismatch: expected A, got
   Int`, even though the call was completely valid Kotlin. This had gone
   unnoticed until World 12's Boss lesson, since every earlier generic
   function in the curriculum happened to use the literal name `T`. Fixed
   by having `header()` capture whatever type parameter names a function
   actually declares (`fun <A, B, ...>`) into a shared
   `genericTypeParamNames` set (seeded with `'T'`/`'R'` for backward
   compatibility), and having `compatible()` consult that set instead of
   the two hardcoded literals.

**Rule, reinforced by both bugs above:** don't assume a generic mechanism
"already works" just because it happens to work for the ONE letter every
prior lesson used (`T`) or the ONE built-in every prior lesson happened to
compare against a matching bracketed shape -- a hardcoded special case for
a specific name/shape is a strong signal that the general case was never
actually implemented. Test a lesson's own concrete class/type-parameter
names, not a renamed copy of a previously-verified example.

## World 12: a class body crammed onto one semicolon-joined line broke parsing again, in NEW lessons written after the rule already existed

Two of World 12's lessons (Type-safe Generic APIs' `MemoryStore` and the
World Boss's `DataStore`) were authored with exactly the semicolon-crammed
single-line class body pattern the "Content rule: lesson code arrays must
be properly formatted" entry above already documents as a known, standing
authoring hazard (`class MemoryStore<T>{private val
items=mutableListOf<T>();fun add(v:T){items.add(v)};fun
first():T?=items.firstOrNull()}`) -- both failed with `Unexpected
identifier 'items'` for exactly the reason already written down:
`splitClassMembers` only recognizes a new member at the start of a
physical line, so every member after the first on a `;`-joined line is
invisible to it. Reformatting both across real lines (matching this file's
own multi-line style) fixed both immediately, with zero other changes.

**Rule, reinforced once more, because it was violated again just one world
later:** this is not merely a style preference to clean up during review --
treat any semicolon-joined multi-member one-liner in NEW content as a
correctness bug to fix before ever running it, not just a readability nit
to fix afterward. See `LESSON_QUALITY_STANDARD.md` section 4's formatting
paragraph.

## World 12: Star Projections (`List<*>`) silently dropped the WHOLE parameter, not just its type

`cleanKotlinParams` (`kotlinRunner.ts`) strips a parameter's type annotation
via a character class, `[a-zA-Z0-9_<>?.]+`, that never included `*`. Since
the whole match is anchored (`^...$`), a type this class can't fully
consume doesn't partially match -- the ENTIRE regex fails to match, so the
parameter's NAME was silently dropped too, not just its type. A function
like `fun describe(v: List<*>): String = "size=" + v.size` compiled to
`function describe()` with no parameter at all, so `v` inside the body
threw `v is not defined` -- a runtime error with no hint that the real
cause was a type-annotation character, not a missing declaration. Fixed by
adding `*` to the character class. One-character fix, but only found by
actually running the code and reading past the misleading error message
to the real cause, rather than assuming "not defined" meant an actually
undeclared variable.

## World 12: reified type parameters -- turning an erased `T` into a real runtime string argument instead of building true call-site inlining

`inline fun <reified T> isType(value: Any): Boolean = value is T` has no
direct JS equivalent: real Kotlin substitutes `T` with the actual type
argument at every call site at compile time, which is the entire meaning
of "reified." This engine has no per-call-site inlining/specialization
mechanism, and building one (rewriting a function body per call site) was
considered and rejected as disproportionate to what any lesson actually
needs. Two separate, stacked failures existed before this was built:

1. **The call site itself didn't parse.** `isType<String>("CodeDo")` (an
   explicit type argument) isn't valid JS syntax -- with nothing to
   recognize `<...>` as a type argument list, it silently parsed as a
   chained comparison (`isType < String > ("CodeDo")`), throwing a
   confusing `String is not defined` (or whatever type name was used) with
   no connection to the real cause.
2. **Even with a valid call, the body's `value is T` had no meaning.**
   `T` isn't a real class, so the generic `is Type` fallback
   (`transformTypeChecks`) emitted `(value) instanceof T`, throwing
   `T is not defined` at runtime -- `T` was never bound to anything at all.

Fixed with `transpileReifiedFunctions` (`kotlinRunner.ts`), a whole-source
pre-pass run before `lowerKotlinFunctions`: it turns the reified type
parameter into an ORDINARY runtime parameter carrying the type NAME as a
plain string (`isType(value: Any, T: String)`), rewrites the body's
`value is T` into a call to a new runtime helper, `__kt_isReifiedType(value,
T)` (added alongside `__kt_notNull`/`__kt_equals` and threaded through the
`new Function(...)` sandbox the same way), and rewrites every call site
(`isType<String>(x)` -> `isType(x, "String")`) so the actual type name
flows in as a real argument instead of being erased. `__kt_isReifiedType`
implements the same typeof-based dispatch every other `is`/`as?` check in
this file already uses -- Int/Long/Float/Double -> `typeof === 'number'`,
String -> `'string'`, Boolean -> `'boolean'` -- and throws for anything
else, since there is no runtime class registry keyed by a string name to
support an arbitrary declared class, and Char is excluded for the
established Char/String-indistinguishability reason repeated throughout
this file.

**Scope, deliberately narrow, matching this file's established
single-line-header convention elsewhere:** the declaration itself
(`inline fun <reified T> name(params): ReturnType = expr`, `inline` and
the return type both optional) must be a single line ending in a
single-expression body -- a block body (`{ ... }`) is not supported. Only
one reified type parameter per function. A call site's explicit type
argument must be a single bare type name, not a nested/qualified generic.
None of World 12's actual lesson content needs anything wider; extend this
narrowly, and re-verify with `compileAndRunKotlin`, if a future lesson
actually requires a block-bodied reified function or more than one reified
parameter.

## World 13 (Scope Masters): `let`/`run`/`apply`/`also`/`with` from zero, and a defaulted constructor parameter that silently leaked into every later scope in the file

World 13's content (synced in from another source with no prior engine
support or quality audit -- see `WORLD_13_CONTENT_REVIEW.md`) needed all
five scope functions built from scratch. The mechanics mirror earlier
receiver-function work (`String.() -> Int` values already had correct
bare-member resolution and receiver-as-first-parameter lowering) --
`let`/`run`/`apply`/`also` were registered as a new, dot-call-only
`scopeMemberSignatures` map in `kotlinFunctions.ts` (kept separate from the
pre-existing, receiver-less standalone `run { ... }` builtin so the two
don't collide), and `with` reuses the existing `builtins` map plus its
already-established bare-name-to-`__kt_`-prefix auto-rename mechanism
(the same one `run`/`repeat` already relied on), which is what keeps JS's
own reserved `with` statement keyword out of the generated code -- no
separate source-level rename pass needed. Every generated lambda for any
of these already takes the receiver as an ordinary first positional
parameter (argument- and receiver-style alike), so the ENTIRE runtime side
is four `Object.prototype.let/run/also/apply` helpers in `kotlinRunner.ts`
that call `block(receiver)`, with `also`/`apply` returning the receiver
instead of the block's result. `Object.prototype.apply` does not shadow
`Function.prototype.apply` for a real function value (closer in the
prototype chain), so this is safe.

Three smaller, narrowly-scoped additions were needed alongside this:

1. **Bare receiver-member access with no `this.` prefix** -- `apply`'s
   entire reason to exist is exactly this
   (`Profile().apply { name = "Ada" }`). A previous six-name hardcoded
   whitelist (`length`, `uppercase`, `lowercase`, `reversed`, `repeat`,
   `toInt`, `toString`) was generalized into a real rule: any bare
   identifier inside a receiver context that isn't a known local var,
   function, class, `builtins` entry, or one of a short list of real
   sandbox globals (`println`, `listOf`, `Pair`, etc. -- see
   `receiverExcludedNames`) is a receiver member, for both reads AND (a
   separate, new rule) assignment targets. Also extended into STRING
   TEMPLATES: a string literal's `$` content is never touched by the
   general lowering pass, so `$this`, `${this.x}`, and now a bare
   `$name`/`${name}` referring to the receiver are rewritten to the real
   receiver parameter before the lambda body is returned -- reusing the
   exact pattern an existing `fun`-header receiver-function fixup already
   used for `$this` alone, generalized to any name not already declared
   locally inside that specific block.
2. **`StringBuilder`** had zero support at all (World 13's `apply`/`also`
   Explore content uses it as the flagship example). Added as a real
   global `class KotlinStringBuilder` with `.append()` (returns `this`)
   and `toString()`, the same way `Number`/`Array`/`Map` already work
   without being passed as sandbox parameters, plus added to
   `insertNewForInstantiation`'s recognized class-name set so
   `StringBuilder()` gets `new` inserted.
3. **A bare Int literal immediately followed by `.member`** (`4.also {
   ... }`, from an actual Predict question) is valid Kotlin but a JS
   `SyntaxError` -- verified directly: `4.toString()` alone throws,
   because JS's numeric-literal grammar greedily consumes the trailing `.`
   into the literal itself, leaving `also`/`toString` with no operator
   before it. World 11 content had already hand-parenthesized this one
   occurrence at a time (`(250).centsLabel(...)`); generalized here with a
   `(\d+)\.(?=[A-Za-z_])` -> `($1).` pre-pass (the lookahead requires a
   letter/underscore right after the dot, so a real decimal literal like
   `3.14` is never touched) so future content doesn't need to remember to
   do this by hand.

**The serious one, found only because of #1 above:** `kotlinFunctions.ts`'s
top-level statement walk processes every token in the whole file,
including inside a class's own primary-constructor parameter list --
nothing had ever protected that specific range (only class/object/
interface BODY braces were tracked, via `declarationBodies`). Its
`val`/`var`-declaration recognizer distinguishes "a real declaration" from
"the keyword just appears somewhere" by checking for a following `=` --
and a defaulted constructor parameter (`class Box(var n: Int = 0)`) is
textually indistinguishable from a genuine local declaration once that
check passes, so `n` got silently registered into `ctx.vars` at the ROOT
context, which every later scope in the file inherits from. This was
**completely invisible through Worlds 1-12**, because nothing before
World 13 needed to check "does an unqualified name already exist
somewhere in scope" -- that check (`!ctx.vars.has(name)`) is exactly what
#1 above introduced as its condition for treating a bare name as a
receiver member. The very first lesson combining a defaulted-parameter
data class with `.apply { name = "..." }` -- a completely ordinary,
idiomatic pattern, not an edge case -- hit it immediately: `Account().apply
{ name = "Mira" }` silently wrote to an accidental global `name` instead
of the receiver's property, leaving `account.name` untouched. Exactly the
"plausible-looking wrong answer" failure mode this file warns about
repeatedly, not a loud crash -- caught only by actually running the code
and checking the real output value, never by reading the generated JS or
the Kotlin source.

Fixed with a `constructorParamTokens` token-index set, populated alongside
the existing primary-constructor scan (which already computes the exact
paren range for `constructors.set(...)`), and consulted by both
`val`/`var`-declaration branches (destructuring and plain) to skip a
parameter-list token instead of processing it as a statement.

**Deliberate scope limitation, not a bug:** labeled receivers (`this@label`,
used to disambiguate a nested receiver lambda) are NOT supported. This
engine's lambda labels already exist but only drive *return*-label
resolution (`return@outer`); there is no mechanism tracking a *receiver*
frame's label to resolve `this@label` back to the right ancestor's
parameter name -- building that is a real, separate feature. World 13's
one lesson that taught this was rewritten to reach the same "nested
receivers can be ambiguous" point through a named local variable instead,
which loses nothing pedagogically (it's the more commonly recommended,
more readable Kotlin style anyway). Build the real feature, verified with
a scratch harness the same way as every other entry here, only once a
future lesson actually needs it.

**Rule, reinforced once more, and by the worst instance yet:** every one
of these gaps -- especially the constructor-parameter leak, which produced
a silently WRONG value with no error at all -- was found only by actually
executing representative code through `compileAndRunKotlin` and checking
the real output, not by reading the transform code or the lesson data.
The leak bug in particular is a reminder that a fix motivated by ONE new
feature (bare receiver-member resolution) can surface a completely
unrelated, previously-dormant bug elsewhere in the same shared lowering
pass -- re-run the FULL existing regression suite (every prior world, not
just the one being worked on) after any change to shared tokenizing/
scoping logic in `kotlinFunctions.ts`, exactly as was done here (Worlds
1-12, lambda-runner, and collection-runner all re-verified with zero
regressions before this work was considered done).

## Lesson prose: the plain-ASCII `--` em-dash convention collides with `--` as an operator

This codebase's lesson prose widely uses plain ASCII `--` as a stand-in for
an em dash (a house-style convention, not a typo -- see its use throughout
this very file: `"...-- see also..."`, `"...-- not a bug..."`). That
convention is harmless almost everywhere, but it silently backfires in any
lesson whose own subject matter is the `--` (decrement) operator -- or,
less severely, `++`, since the two-character `--` glyph is identical
either way.

Found while auditing World 2's Increment & Decrement lesson (`world-2` ->
lesson 5 -> stage 1, Learn): both `learn.subtitle` and `learn.keyTakeaway`
used a punctuation `--` in the same sentence as -- or immediately after --
a literal mention of the `--` operator itself:

```
subtitle: '... ++ (increment) and -- (decrement). ... and both only work on a mutable var -- never on a read-only val.'
keyTakeaway: 'x++, ++x, x--, and --x are shorthand for "reassign x to x + 1" or "x - 1" -- and like any reassignment, they require var.'
```

A reader's eye, already primed by the operator discussion a few words
earlier, is prone to misread the punctuation dash as another instance of
the operator rather than as a sentence break -- exactly the kind of subtle,
easy-to-miss-by-reading confusion this file otherwise exists to catch for
code, not just prose. `keyTakeaway` additionally had an independent,
compounding wording bug: its two quoted phrases weren't parallel
(`"reassign x to x + 1"` vs. a bare `"x - 1"` missing its own `"reassign x
to"`), and which operator maps to `+1` vs. `-1` was only implied by list
order, never stated.

Fixed (see `WORLD_2_CONTENT_REVIEW.md`'s W2-08 for the full record) by
replacing the colliding dash with a comma in the subtitle, and rewriting
the keyTakeaway into two explicit, parallel, semicolon-joined clauses
naming the +1/-1 pairing directly instead of leaving it implied.

**Rule: don't rely on re-reading prose to catch this -- run the mechanical
scan instead.**

```sh
npm run audit:dash-collision
```

This runs `scripts/audit-dash-collision.mjs`, which scans every
`.ts`/`.tsx` file under `src/data` for a prose-bearing field (`subtitle`,
`explanation`, `keyTakeaway`, `description`, `whatChanged`, `detail`,
`summary`, `title`, `label`, `bugLabel` -- deliberately excluding
`code`/`codeSnippet`/`initialCode`/`solutionCode`/`fixedCode`/`brokenCode`,
where a bare `--`/`++` is real Kotlin syntax, not prose) that contains
BOTH the house-style punctuation dash (`--` with a space on each side) AND
a glued operator mention (`--`/`++` touching a non-space character, e.g.
`x--`, `--x`, `x++`, `` `--` ``) in the same string. It prints every match
across the WHOLE curriculum, not just World 2 -- this is what makes it
scannable by an AI agent or a human auditor without having to remember to
re-read any specific lesson.

This is a candidate scanner, not an auto-fail check: a match still needs a
read to tell a real misread risk (operator mention and punctuation dash
sitting close enough in the same sentence to actually confuse a reader --
the World 2 subtitle/keyTakeaway case above) apart from a harmless
coincidence (e.g. `-- (decrement)` itself, which the running script still
flags in World 2's Increment & Decrement subtitle even after the fix above
-- it's self-disambiguating by the parenthetical right next to it, so it's
a legitimate remaining match with nothing left to fix). Treat every run's
output as a worklist, not a pass/fail gate.

Not yet swept-and-fixed everywhere a match appears: the tool itself is new
and this world's own Explore/Predict/Debug copy (several more instances
noted in W2-08 but left unfixed) and every other world have not had their
flagged candidates individually triaged yet. Run this audit whenever
authoring or editing lesson prose for a topic involving `++`/`--` (or any
other operator/symbol likely to visually collide with this codebase's
ASCII punctuation conventions), and whenever doing a broader content
sweep -- triage its findings the same way W2-08 did before deciding
whether each one needs a rewrite.

## Learn's subtitle/explanation/keyTakeaway and Debug's explanation silently dropped every `\n` line break

`WriteRun.tsx`'s `description` paragraph has always used `whitespace-pre-line`
(so its established `'step 1.\n\nstep 2.\n\n...'` authoring convention -- see
`CODEDO_MASTER_PLAN.md`'s Write & Run Task Authoring Standard -- actually
renders as separate paragraphs). But `Learn.tsx`'s `subtitle`, `explanation`,
and `keyTakeaway` paragraphs, and `Debug.tsx`/`DebugIde.tsx`'s `explanation`
paragraph, had no such class -- plain browser-default `white-space: normal`,
which collapses a literal `\n` (and any run of whitespace) into a single
space. Any multi-sentence Learn/Debug prose written with `\n\n` between
ideas -- exactly the "break at natural idea boundaries" authoring guidance
this project follows for readability -- would have silently rendered as one
dense, run-on paragraph with no visible break at all, not an error and not
even a visual difference a quick glance would catch.

Found while adding paragraph breaks to World 2's Increment & Decrement
lesson (`learn.subtitle`, `learn.explanation`, `debug.explanation`) for
readability -- the breaks were invisible in the actual rendered app until
this was fixed. Fixed by adding `whitespace-pre-line` to all four
containers: `Learn.tsx`'s subtitle `<p>`, explanation `<span>`, and
keyTakeaway `<p>`; `Debug.tsx`'s resolved-state explanation `<p>`;
`DebugIde.tsx`'s Defect Diagnosis explanation `<p>`. `whitespace-pre-line`
(not `whitespace-pre-wrap`) matches `WriteRun.tsx`'s existing choice: it
preserves line breaks while still collapsing incidental multiple spaces,
which is the right behavior for authored prose (as opposed to code/output,
which needs every space preserved -- see the "Expected/actual output
panels: always make whitespace visible" entries above for that separate,
stricter case).

**Rule:** any Learn/Explore/Predict/Debug text container that is meant to
hold more than one idea must be checked for `whitespace-pre-line` (or
equivalent) before authoring a `\n`-separated multi-paragraph string into
it -- a missing class here doesn't error, doesn't look obviously wrong in
the data file, and doesn't fail any of `audit:output-quotes`/
`audit:dash-collision`/`tsc`/`build`; it only becomes visible by actually
opening the rendered page. Verify by rendering the actual component (or,
short of that, grep the component for the field and confirm
`whitespace-pre-line`/`whitespace-pre-wrap` is present on its container)
before assuming a `\n\n` added to lesson prose will actually show up as a
line break.

## The simulator can't correctly print or compare Kotlin's `Unit` value

Found while authoring a World 13 (`with`) Predict question meant to
demonstrate that `with`'s return type follows its block's last
expression, using a block whose last statement was itself `println(...)`
(which returns `Unit`). Real Kotlin prints `kotlin.Unit` for a `Unit`
value; this simulator's `formatKotlinValue` instead prints `null` --
confirmed directly: `with("Kotlin") { println(length) }` assigned to a
`val r` and then `println(r)` outputs `null`, not `kotlin.Unit`. Worse,
there is no `Unit` identifier usable in generated code at all: `println(r
== Unit)` throws `Runtime error: Unit is not defined`. So this gap can't
even be worked around with an equality check.

This means any lesson content whose correctness depends on Kotlin's real
`Unit` representation (printing it, or comparing a value against it) will
silently teach the simulator's own formatting bug (`null`) as if it were
real Kotlin, or hit a hard `ReferenceError` if it tries the `== Unit`
route -- both are exactly the "simulator disagrees with real Kotlin"
failure mode `LESSON_QUALITY_STANDARD.md` section 4 already warns about
generally ("The teaching runner is not the authority on Kotlin"), just
newly confirmed for this specific case.

**Not fixed at the engine level** -- no World 13 lesson's *graded*
content actually needed this (the Predict question was rewritten to use a
Boolean-returning example instead, sidestepping Unit entirely; see
`WORLD_13_CONTENT_REVIEW.md`'s clarity-pass section). If a future lesson
genuinely needs to demonstrate printing or comparing `Unit` (Null Safety/
Advanced Types territory, `Unit` is explicitly in `CODEDO_MASTER_PLAN.md`'s
"Advanced Nullability & Types" topic list for a later world), this needs
real engine work first: register a `Unit` singleton value the sandbox
recognizes for equality/`is` checks, and fix `formatKotlinValue` to print
`kotlin.Unit` instead of falling through to the `null`/`undefined` case --
verified with `compileAndRunKotlin` the same way as every other gap on
this page, before authoring content that depends on it.

## World 14 (Sequence Dimension): real lazy `Sequence` from zero, and two pre-existing bugs it surfaced

World 14's whole topic is lazy evaluation, and the simulator had zero
support for `Sequence`/`sequenceOf`/`generateSequence`/`.asSequence()`
beforehand. The build (`KotlinSequence` in `kotlinCollections.ts`) uses
real JS generators: every intermediate operation (`map`/`filter`/`take`/
`takeWhile`/`drop`) wraps its upstream iterable in a fresh `function*`, so
pulling one element from the outermost generator naturally pulls exactly
one element through every stage first -- this is what gives genuine
element-by-element evaluation order (a `filter` then `map` prints F1, M1,
F2, M2, ..., never a whole filter pass before any map), not just a
correct final result, which matters enormously here since three whole
lessons (Lazy Processing, Sequence Evaluation Order, Short-Circuiting)
exist specifically to teach that ordering via `println` side effects.
Terminal operations (`toList`/`first`/`count`/`fold`/`forEach`/`any`/
`all`/`none`/`sum`) each guard their own iteration count independently of
`__kt_check_loop` (which only instruments actual transpiled Kotlin `while`/
`for` loops) -- a synchronous `for...of` draining an infinite generator
would otherwise block the single JS thread forever, and no external
`Promise.race` timeout can preempt a loop that never yields control back
to the event loop.

Single-use vs. reusable semantics are modeled explicitly and match real
Kotlin: `sequenceOf`, a seeded `generateSequence(seed) { next }`, and
`Iterable.asSequence()` are reusable; the no-seed `generateSequence {
next }` overload and a bare `Iterator.asSequence()` are single-use and
throw `"This sequence can only be iterated once."` on a second traversal
-- confirmed against real Kotlin's own documented behavior for that
overload specifically, the same way every other exact-behavior claim on
this page is checked rather than assumed.

Standalone range VALUES (`(1..100).asSequence()`, `val source = 1..100`)
had no support at all outside a for-loop header (`1..100` alone isn't
valid JS) -- added `__kt_range(a, b)`, returning a real, reusable
`KotlinList` so every existing List operation works on it for free,
including the new `.asSequence()`.

**Two pre-existing, previously-invisible bugs this content surfaced, not
new-feature gaps:**

1. **A JS automatic-semicolon-insertion hazard.** `let c = 0` (no trailing
   `;` -- Kotlin never requires one) immediately followed by a statement
   starting with `(` is misparsed by JS as ONE statement, `let c =
   0(...)`, calling the number `0` as a function
   (`TypeError: 0 is not a function`). This could not have surfaced
   before World 14, since nothing previously produced a bare
   parenthesized expression statement immediately after a
   literal-initialized declaration -- the new standalone-range support is
   exactly that shape (`var c=0` followed by `(1..5).map{...}.take(2)` as
   its own statement, no assignment). Fixed narrowly: a declaration whose
   RHS is a bare, self-contained literal (`=\s*(-?\d+(\.\d+)?|true|false|
   null)\s*$`) gets an explicit trailing `;` appended. Deliberately scoped
   to literal RHS only, NEVER a general "add `;` after every declaration"
   rule -- that would terminate a real multi-line chain
   (`val result = source\n    .filter { ... }`) after its first line,
   since Kotlin's own multi-line chains never start with a bare literal.
2. **`KotlinList` had no real `.equals()` method.** `__kt_equals`
   (backing every `==` comparison, `kotlinRunner.ts`) only ever calls a
   value's own `.equals` method, falling back to `===` (reference
   equality) when one isn't defined -- so two structurally-identical but
   reference-distinct Lists (`listOf(1,2,3).map{...} ==
   listOf(1,2,3).asSequence().map{...}.toList()`) silently compared as
   `false` instead of `true`, even though `KotlinList`'s own internal
   `equal()` helper already implements correct structural comparison and
   is used internally by `.contains()`/`.distinct()` the whole time -- it
   just was never exposed as `.equals` itself. Exactly the
   "plausible-looking wrong answer" failure mode this file warns about
   repeatedly: caught only because World 14's Sequences-vs-Collections
   lesson happens to compare two Lists built two different ways, which no
   prior lesson's graded content ever did. Fixed by adding a real
   `.equals()` delegating to the same `equal()` helper every other
   KotlinList method already trusts.

**Rule, reinforced once more:** both bugs above were found only by
actually executing the lesson's own `writeRun.solutionCode` through
`compileAndRunKotlin` and reading the real error/output, not by reading
either the transform code or the runtime helper code. A new engine
feature (standalone ranges; nothing new for `.equals()`) can surface a
completely unrelated, previously-dormant bug in shared code the moment
some new content shape happens to exercise it for the first time -- the
exact same lesson as World 13's constructor-parameter-leak bug, one world
earlier.

## World 15 (Error Fortress): building a real exception hierarchy, try/catch dispatch, and expression-position `throw` from zero

World 15 is entirely about exceptions, and before this world
`kotlinRunner.ts`/`kotlinFunctions.ts` had **zero** real support for any of
it: no exception class hierarchy (`Exception`/`RuntimeException`/etc. all
undefined), a single untyped `catch` clause only (no dispatch, and a
second consecutive `catch` was a hard parse error), no try/catch as an
expression, no expression-position `throw` (Elvis/if-branch), no
`Result`/`runCatching`, no `require`/`check`, and `String.toInt()` used
lenient `parseInt` (never threw). See `WORLD_15_CONTENT_REVIEW.md` for the
full engine-capability writeup; the two most generalizable lessons from
building it:

**A "type" simulation gap can hide inside CONTROL FLOW, not just a
value's runtime representation.** Every prior `bugType: 'type'` entry on
this page (see "Debug/Write & Run: the 'bug' must be reproducible...")
was about a value looking the same at runtime despite a real Kotlin type
distinction (Boolean-vs-String, Char-vs-String, etc.). World 15's Custom
Exceptions debug exercise hit a NEW variant of the same root problem:
Kotlin classes are final unless marked `open`/`abstract`/`sealed`, and
this simulator had never modeled that at all -- a `class Child :
Parent(...)` subclassing a non-open `Parent` transpiled and ran
successfully regardless, so the debug exercise's broken (`class
Parent(...)`) and fixed (`open class Parent(...)`) code produced
IDENTICAL output, auto-"passing" with zero edits. Fixed with a real,
narrowly-scoped compile-time check (`checkFinalClassInheritance` in
`kotlinRunner.ts`, run alongside `staticValidateKotlin`): scan same-source
`class Name` declarations for an `open`/`abstract`/`sealed` modifier, then
flag any `class Child : Parent(...)` whose `Parent` was declared plain.
**Rule, generalized:** a `bugType: 'type'` exercise is suspect not just
when its two variants look the same VALUE-wise at runtime, but whenever it
depends on a compile-time-only Kotlin rule (visibility, finality,
overload resolution, variance) this simulator has no dedicated check for
-- the same "does the engine actually enforce this distinction" question
applies to control-flow/declaration-level rules, not only primitive-value
representation.

**A double comma in a hand-authored array literal (`},,`) is a silent,
invisible data-loss bug, not a typo that merely looks odd.** Found via
this world's own content audit: 30 occurrences of `},,` across
`predict.questions`/`explore.cards` arrays in `world15LessonsData.ts`. A
JS array literal treats a doubled comma as a sparse hole (`[a, b,, c]` has
`.length === 4` with index 2 EMPTY) -- `.length` reports the padded,
too-large count (masking the bug from any naive "does the array have the
right length" check), while `.map()`/`for...of`/spread all silently SKIP
the hole, dropping that one card/question from iteration -- including in
the real learner-facing UI, not just this audit's own test script. This
is exactly why `LESSON_QUALITY_STANDARD.md`'s audit process asserts
`cards.length === new Set(cards.map(c => c.id)).size` AND actually runs
every card through the real engine, rather than trusting `.length` alone:
the very first attempt at that assertion here threw "Explore cards array
has a hole" from `assert.ok(card, ...)` inside the loop, which is what
surfaced this. **Rule:** when authoring or editing a lesson data file by
hand (or via a bulk script), grep the file for `},,` (or more generally
`,\s*,`) before trusting the array's own reported length -- a sparse hole
does not throw, does not change `.length`, and is invisible to anything
that doesn't specifically iterate and check every element.

**Reinforced again:** an Explore/Predict card whose own code references an
undefined helper (`risky()`, `useDefault()`, `load()` -- a recurring
placeholder pattern in this world's content, standing in for "some
operation that might fail") throws a plain, loud `ReferenceError` the
moment it's actually run, exactly the kind of gap this page insists on
catching by executing content rather than reading it. Nine separate
snippets across World 15 had this; fixed by prepending a minimal, real
definition to each (matching the specific exception TYPE its surrounding
catch clause(s) actually expect, not just making it parse).

## World 16 Lesson 1 — eager `launch` made a missing `join` pass

**Symptom:** A first synchronous coroutine approximation invoked every
`launch` block immediately. The Write & Run starter, which intentionally omits
`job.join()`, therefore printed `7` -- the same output as the correct solution.
The engine appeared to support the lesson while making its required operation
unobservable.

**Cause:** Treating `launch` as an ordinary immediate function call preserves
the happy-path solution output but destroys the semantic distinction the task
is designed to teach.

**Fix:** Lesson 1 uses a deterministic, single-threaded child queue.
`launch`/`async` register pending jobs in the current `runBlocking` scope;
`join`/`await` execute the requested job; `runBlocking` drains unwaited children
before returning. `delay` remains an explicit no-op. This is not real coroutine
scheduling, but the starter prints `0`, the joined solution prints `7`, and the
broken Deferred example prints the object rather than `13`.

**Standing rule:** A simulator implementation must preserve the observable
difference between broken and fixed lesson code, not merely reproduce the
fixed example's expected output.

## World 16 Lesson 2 — named arguments plus a trailing lambda created an extra argument

`async(start = CoroutineStart.LAZY) { ... }` exposed a collision in the
generic function lowerer. Named-argument reordering first expanded the call to
the signature's full positional array, leaving `undefined` in the final block
slot. The trailing-lambda branch then appended the lambda instead of filling
that slot, producing three JavaScript arguments for a two-parameter helper.

The lowerer now replaces a final `undefined` signature slot with the rendered
trailing lambda; it appends only when no such slot exists. This is a general
call-lowering correction, not coroutine-specific syntax rewriting.

**Standing rule:** whenever a built-in supports both named arguments and a
trailing lambda, trace the final positional argument array. Correct argument
count before reordering does not prove correct emitted argument count after
placeholder expansion.

## World 16 Lesson 3 — erasing `suspend` also erased its caller restriction

The JavaScript runtime does not need a `suspend` modifier, so the coroutine
pre-pass intentionally removes it. That made an illegal Kotlin program such as
`fun main() { load() }` run successfully when `load` was declared suspend.
Lesson 3 now performs a narrow source-level validation before transpilation:
calls from ordinary block-bodied functions are rejected, while suspend
functions and recognized coroutine-builder bodies remain legal.

**Standing rule:** when compile-time-only syntax is erased for execution,
validate any learner-visible restriction that syntax enforces before erasure.

## World 16 Lesson 4 — accepting context syntax is not context semantics

Merely stripping `import kotlin.coroutines.coroutineContext` and defining
`withContext` as `block()` makes simple examples parse, but it cannot prove
Job lookup, CoroutineName inheritance, nested override, or restoration. It can
also accidentally suggest that dispatcher tokens perform real thread switches.

Lesson 4 therefore uses a scoped context stack. `runBlocking` installs Job and
default-dispatcher elements; `launch` and `async` capture the active elements
and replace Job with their own lifecycle object; `withContext` overlays one
element for the duration of its block and restores the prior context in a
`finally` path. `Dispatchers.Default/IO/Main` remain named metadata only.

**Standing rule:** when teaching context, test both the value inside an override
and the restored value afterward. Keep dispatcher scheduling/thread behavior
outside the acceptance claim unless the runtime actually implements it.

## World 16 Lesson 5 — dispatcher syntax without a builder overload

Defining `Dispatchers.Default` in the sandbox was not sufficient for
`launch(Dispatchers.Default) { ... }`. The function lowerer still described
launch as a one-parameter block function, and the runtime accepted only a block.
Lesson 5 adds an optional context parameter to both layers. The runtime overlays
the supplied element on the inherited context before assigning the child Job.

The original Write starter also printed the literal expected word `completed`
whether or not the learner added `join()`, so output-only grading could not
observe the required repair. It now reads a flag written by the queued child:
the starter prints false and the joined solution prints true.

**Standing rule:** adding a global API value is not capability until every
intended call shape is lowered and executed. A lifecycle exercise must make the
missing wait observably different from the correct solution.

## World 16 Lesson 6 — an infinite cooperative loop needs a scheduler

The original lesson repeatedly used `while (isActive) { yield() }`, followed by
cancellation from the parent. In a synchronous teaching runtime, starting that
child enters the loop and prevents the parent from ever reaching cancel;
leaving the child queued means cancellation happens before its body and proves
nothing about a running loop. Treating yield as a simple no-op would hang.

Lesson 6 instead uses deterministic self-cancellation: the running child marks
its own Job cancelled, then reaches ensureActive, yield, or delay. Each helper
checks the active context Job and exits through normal cancellation semantics;
finally still runs. This proves cooperative control flow without inventing
interleaving. Arbitrary blocking interruption remains unsupported.

**Standing rule:** do not teach parent/child interleaving with a runtime that
cannot suspend and resume continuations. Use deterministic checkpoint traces,
and state the missing preemption/scheduler boundary explicitly.

## World 16 Lesson 7 — waiting at runBlocking end is too late for an inner read

runBlocking already drains children before it returns, but that does not make a
read inside its block automatically occur after those children. A program that
launches a child, immediately prints shared state, and only then reaches the
runBlocking boundary still observes the pre-child value in this deterministic
runtime. Treating runBlocking's eventual drain as equivalent to an earlier
structured boundary would make broken and fixed tasks indistinguishable.

`coroutineScope` now owns an inner child list and drains it before returning.
Children created by children are registered with that same active scope. A
child failure cancels later owned children and propagates outward. Registration
order is deterministic simulation, not a real scheduler guarantee.

**Standing rule:** place the ownership/completion boundary before the dependent
read. Eventual parent completion does not establish ordering for earlier code.

## World 16 Lesson 8 — scope completion is not result retrieval

coroutineScope waits for its children, but merely creating an async child does
not make that child's value the scope result. The block's own final expression
still determines what the suspending function returns. A broken example that
creates `async { "ready" }` and then ends with `"pending"` correctly returns
pending even though the Deferred is structurally completed.

**Standing rule:** test structured ownership and value flow separately. Waiting
for a Deferred to complete does not implicitly call await or replace the
enclosing block's final expression.

## World 16 Lesson 9 — eager async must store failure, not throw from the builder

The deterministic runtime starts default async work immediately. Its original
`start()` called join directly, so a failing block threw from `async { ... }`
before the program could reach `await`. That contradicts Deferred's core
contract and made supervisorScope examples impossible to express honestly.

Start now executes work while retaining any failure on the Deferred. Await
rethrows it. supervisorScope drains all children without cancelling siblings
for a child-level error, while ordinary coroutineScope still propagates child
failure as a unit. Failure of the supervisor block itself remains fatal to its
children.

**Standing rule:** eager execution timing must not change which API exposes a
result or failure. For Deferred, that boundary is await, not the async call.

## World 16 Lesson 10 — an exception handler is not universal catch logic

The original lesson reused one failed-Deferred example under launch, child,
CancellationException, handler, supervision, and finally labels. That made the
stage appear broad while exercising almost none of those distinct boundaries.
It also risked suggesting that `CoroutineExceptionHandler` handles `async`
results or overrides ordinary structured propagation.

Lesson 10 now assigns each mechanism its own trace. Failed Deferred values are
handled at `await`; an ordinary launch failure reaches its owning scope; normal
cancellation is not reported as an ordinary failure; finally performs cleanup;
and the handler example is limited to an eligible supervised launch case. The
runtime intentionally does not claim complete root-handler or suppressed-error
aggregation semantics.

**Standing rule:** identify the builder and ownership boundary before choosing
error handling. Use await/catch for Deferred results, owner-level handling for
ordinary structured child failure, and CoroutineExceptionHandler only where
uncaught launch-style exceptions are actually eligible for it.

## World 16 Lesson 12 — dispatcher-aware launch support does not imply async support

The runner already accepted `launch(Dispatchers.Default)`, but the boss Write
solution used `async(Dispatchers.Default)`. Reusing the launch assumption would
leave the authored solution unsupported: async's first argument had previously
been interpreted only as CoroutineStart.

The async runtime now distinguishes a start-mode string from a context element,
overlays supported context metadata, and keeps Deferred result behavior intact.
The boss scenarios then assemble named results explicitly instead of inferring
output order from delay values or simulated scheduling.

**Standing rule:** verify every builder overload used by learner code. Context
support for launch is not automatically context support for async, and neither
overload proves real dispatcher threads or concurrent timing.

## World 16 Lessons 2–12 handoff: three claims that were false, found only by actually running the delivered code

A second AI-assisted handoff delivered engine changes and content for World 16
Lessons 2–12 in one batch, with every lesson's own write-up claiming its
program cases were verified. None of that verification had actually been run
against this repository -- every write-up said so explicitly ("pending actual
repository harness and regression runs"). Running the delivered code for real
(the same `compileAndRunKotlin`/`audit-world16-quality.ts`/real-JVM-probe
process every other entry on this page insists on) surfaced three defects the
write-ups did not mention:

1. **A global-scope identifier collision that broke unrelated, already-shipped
   content.** The coroutine sandbox prelude unconditionally injected
   `const Job = kotlinJobKey;` into *every* generated script, coroutine lesson
   or not. World 13's own `data class Job(var state: String = "")` --
   completely unrelated content, untouched by this handoff -- collided with
   it: `Identifier 'Job' has already been declared`. Real Kotlin never hits
   this (these names are only in scope where a file actually imports
   `kotlinx.coroutines`); this flat-scope simulator has no such namespacing.
   Fixed by detecting whether the source actually references coroutines
   (import, `runBlocking`, `launch(`, `async(`, `coroutineScope{`, etc.)
   before injecting the coroutine prelude's bare-named bindings (`Job`,
   `CoroutineName`, `CoroutineExceptionHandler`, `Dispatchers`,
   `CoroutineStart`, `coroutineContext`) at all.

2. **A real, previously-unexercised syntax gap.** `async<Int> { ... }` (an
   explicit type argument on a coroutine builder call whose block is a
   trailing LAMBDA, not a call with parens) was never stripped by any
   transform -- `eraseGenericConstructorArguments` only strips a `<...>`
   immediately before `(`. The literal `<Int>` survived into the generated
   JS as `__kt_async<Int> { ... }`, not valid JavaScript at all, and broke
   Lessons 9, 10, and 12 outright with a confusing `Unexpected token 'new'`
   error (the actual cause, a parse failure, was nowhere near what the error
   pointed at). Fixed by stripping `async<Type>`/`launch<Type>` immediately
   before `{` or `(`, scoped to those two builder names specifically so it
   can never misfire on an unrelated `x < Type > y` comparison chain.

3. **`Job.join()` was rethrowing a stored completion exception -- real
   Kotlin's `Job.join()` never does that.** Confirmed directly against
   Kotlin 2.0.21 + kotlinx-coroutines 1.8.1: `async<Int> { throw ... };
   job.join(); println("done")` inside `supervisorScope` prints `done` and
   exits 0 -- `join()` waits for completion and returns, full stop; only
   `Deferred.await()` retrieves and rethrows a failure. The delivered
   `KotlinJob.join()` unconditionally rethrew any stored error for BOTH
   `Job` and `Deferred`, which is why Lesson 10's own Debug `brokenCode`
   (`d.join(); println("done")`, deliberately meant to demonstrate a
   silently-swallowed exception) instead crashed outright with no output at
   all -- the exact "plausible-looking wrong answer becomes a loud crash
   instead" near-miss this file has warned about before, just inverted.
   Fixed by splitting the class: `join()` now only ever runs the action and
   swallows any error (matching real Kotlin); a new internal
   `__drainComplete()` (used exclusively by the owning scope's own
   structural drain, `drainScope`/`drainSupervisorScope`) is what actually
   propagates a child's failure to its parent, matching real Kotlin's
   automatic Job-hierarchy propagation -- independent of whether or when
   user code ever calls `join()`/`await()` on that child at all. This one
   fix, with zero further content changes, resolved every remaining
   reference-task failure across Lessons 2-9 and 12 simultaneously; before
   it, several of those lessons' own `debug.fixedCode`/`writeRun.solutionCode`
   were failing for reasons the delivered write-ups never surfaced.

**A fourth issue was content, not an engine defect, and needed a real redesign
rather than a one-line fix:** Lesson 10's entire premise -- that catching a
failed Deferred's exception at `await()` is sufficient -- is false. Verified
directly on the JVM: `async<Int> { throw IllegalStateException("bad") };
try { d.await() } catch (...) { println("caught") }` inside a plain
(non-supervised) `runBlocking` prints `caught`, then the program **still
crashes** with the same uncaught exception, because the child's failure had
already propagated structurally to `runBlocking` the moment it threw --
independent of whether the caller later catches it via `await()`. This is the
*exact same nuance* Lesson 2's own E6 example was already redesigned around
(see that entry above) -- Lesson 10 reintroduced the identical mistake across
its Learn, Explore, Predict, Write & Run, and Debug stages. Fixed by
redesigning rather than patching around it: Learn/Explore-1/Predict-1 now keep
the crash and teach it directly and honestly (a legitimate, testable "what
actually happens" outcome), while Write & Run and Debug's `fixedCode` were
changed to wrap the example in `supervisorScope` -- framed explicitly as *why*
supervision exists, not an arbitrary requirement.

**Standing rule, reinforced hard by this handoff specifically:** a delivered
write-up that repeatedly states its own verification is "pending" is telling
you, in its own words, that nothing in it has been checked yet -- treat every
one of its claims with exactly the same suspicion as an unverified claim with
no disclaimer at all, and re-run the SAME full process this file has insisted
on since World 1: actually execute every reference/negative case through
`compileAndRunKotlin`, re-run the full prior-world regression suite (a fix
motivated by one lesson broke a different, already-shipped world here, exactly
as it did for World 13's own constructor-parameter leak), and verify any
disputed real-Kotlin behavior against an actual compiler rather than trusting
either side's prose description of what Kotlin "should" do.
