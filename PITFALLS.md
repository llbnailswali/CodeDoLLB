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

