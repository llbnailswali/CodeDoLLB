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
