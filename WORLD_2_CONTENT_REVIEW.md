# World 2 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Changes required** for coverage, with one engine
defect found and fixed during this pass. This is the first audit pass, not a
completed rewrite or quality certification.

## Scope and evidence

Reviewed the 7 catalog-linked lessons in Operator Forge (Arithmetic,
Comparison, Logical, Assignment, Increment & Decrement, Operator Precedence,
Boss), covering Learn, Explore, Predict, Write & Run, Debug, and mastery
claims. Sources: `src/data/curriculum/world2LessonsData.ts` and
`src/data/curriculum/masterCurriculumCatalog.ts`.

**Orphaned legacy content excluded**: `src/data/curriculum/world2_logic.ts`
(`WORLD_2_QUESTIONS`) is themed "Logic & Branches" / Boolean truthiness --
leftover content from an old world-numbering scheme, wired only into the
legacy free-standing "Drill" feature (`App.tsx`'s `conditionals` drill type),
not into the current catalog-linked five-stage lesson flow for `world-2`
(Operator Forge). Excluded from this audit, matching the World 1 review's
exclusion of the orphan `variables` lesson.

`npm run audit:world2-quality` checks registration, question totals/answer-key
structure, probes all 34 Explore examples, runs all 28 writeRun/debug
execution assertions, and 2 hardcode-resistance spot checks. All pass as of
this pass. That result does not validate coverage, diagnostic quality, or
resistance to hardcoding beyond the 2 lessons spot-checked.

## Engine defect found and fixed during this pass

**W2-01 (High -- engine capability, now fixed).** `world-2-arithmetic-
operators/card-arith-4` (`println(a / 2.0)`, demonstrating that a Double
literal promotes Int/Int division away from truncation -- the direct
opposite lesson of the truncation this world also teaches) failed with
`Runtime error: missing ) after argument list`. Root cause:
`kotlinFunctions.ts` has its own private tokenizer, separate from
`kotlinSource.ts`'s shared `scanKotlin`, and it split decimal literals like
`2.0` into three tokens (`2`, `.`, `0`) instead of one. That fooled
`kotlinFunctions.ts`'s own, independent Int/Long division-truncation check
(a second implementation of the same idea as `kotlinRunner.ts`'s
`wrapIntDivision`, introduced by prior work and never unified with it) into
treating the bare `2` as a standalone Int literal, producing
`Math.trunc(a / 2).0` -- a syntax error. Fixed by giving the local lexer a
proper numeric-literal branch matching `scanKotlin`'s. See
[PITFALLS.md](PITFALLS.md) for the full root-cause writeup and the standing
rule about this file's two independent tokenizers/truncation
implementations. Re-verified via `compileAndRunKotlin` and the full test
suite (`audit:world1-quality`, `audit:world2-quality`,
`test:lambda-runner`, `test:collection-runner`, `test:world11-content`,
`tsc --noEmit`) -- no regressions.

This was the only capability/correctness defect found; every other Explore
example, Predict question, Write & Run solution/starter, and Debug
repair/broken pair executes and produces the output the lesson claims.

## Coverage and pedagogy findings

Overall this world is noticeably higher quality than World 1's original
content -- consistent with the master plan citing this world's Arithmetic
Operators lesson as the required Write & Run task-structure standard. Each
lesson's Learn/Explore/Predict content is topic-specific, uses realistic
misconception-based distractors, and explains precedence/behavior accurately
against real Kotlin semantics (verified against the actual Kotlin operator
precedence table: `* / %` > `+ -` > comparisons > `&&` > `||`, matching what
every lesson teaches). Findings below are coverage gaps and one pedagogy
gap, not correctness defects.

| ID | Severity / category | Evidence | Repair required |
| --- | --- | --- | --- |
| W2-02 | High -- coverage gap, not a justified deferral | Increment & Decrement's Learn section states prefix/postfix "only matters when the ++/-- expression's own result is used directly inside a larger expression, which this lesson intentionally avoids." Verified the engine already computes this correctly (`println(count++)` prints the OLD value then increments; `println(++count)` prints the NEW value) -- unlike other deferred features in this codebase (e.g. World 3's if-inside-when gap), this is not blocked by any engine limitation. | Add Explore/Predict coverage of prefix vs. postfix used as an expression value (e.g. `val old = count++` vs `val new = ++count`), the actual real-world reason this distinction matters and a common source of off-by-one bugs. Current content teaches only the "used as a standalone statement" case, where the distinction is invisible. |
| W2-03 | Low -- latent diagnostic gap, not currently triggered | `staticValidateKotlin`'s val-reassignment regex (`kotlinRunner.ts`) checks `+=, -=, *=, /=, =, ++, --` but omits `%=` -- a `val x = 5; x %= 2` falls through static validation and fails only at runtime with a raw `Assignment to constant variable` message instead of the lesson's usual `Val cannot be reassigned` diagnostic. No current lesson content exercises `%=` on a `val` (Assignment Operators' own %= card correctly uses `var`), so this has not produced a wrong-looking exercise -- but it should be fixed before any future debug exercise relies on a `%=`-on-`val` bug, per this project's diagnostic-quality precedent (see W1-05). |
| W2-04 | Medium -- assessment strength, partial evidence only | Same class of gap as World 1's W1-08: writeRun/debug grading is fixed-output string matching. 2 of 7 lessons (Arithmetic Operators, Boss) now have hardcode-resistance spot checks in `audit-world2-quality.ts` proving a hardcoded literal print would fail; the other 5 (Comparison, Logical, Assignment, Increment/Decrement, Operator Precedence) remain unverified against hardcoding. |

No findings about `bugType: 'type'` debug exercises being simulator-
unreproducible (the World 1 Char/Boolean/Float pitfall) -- this world's
debug bugs are all `logic` or `syntax`/mutability bugs with genuinely
different literal values or a genuinely different compiled result, which is
exactly the safe pattern PITFALLS.md recommends.

## Commonly-used-features audit (2026-09-19, against the new
LESSON_QUALITY_STANDARD.md rule)

`LESSON_QUALITY_STANDARD.md` section 1 now requires Explore + Predict to
cover every commonly used feature of a topic at basic/intermediate level,
including distinct common variations (e.g. a form used standalone vs.
inside a larger expression, or applied to different operand types) -- not
just one introductory shape. Re-checked this world against that rule.

**Two more engine defects found and fixed** verifying candidate examples
against real Kotlin behavior (see [PITFALLS.md](PITFALLS.md)):

- A decimal literal (`10.0`) was silently misclassified as `Int`, breaking
  Double-formatting for bare `val`/`var` references and causing an outright
  compile error for compound assignment on an explicitly `Double`-typed
  `var` -- found while testing whether Assignment Operators' `*=`/`+=`
  worked on a Double, not just an Int. Fixed.
- `\$` escaping inside a string template printed the wrong output (found
  while auditing World 1, fixed the same session -- affects any World 2
  lesson content that might print a literal `$`, e.g. a price).

**New coverage findings** (not yet fixed as content):

| ID | Lesson | Gap |
| --- | --- | --- |
| W2-02 | Increment & Decrement (already flagged) | Prefix vs. postfix used as an EXPRESSION VALUE (`val old = count++` vs `val new = ++count`) is never taught -- confirmed the engine already computes this correctly, so this is a pure content gap, not a capability limit. |
| W2-05 | Assignment Operators | Every Explore/Predict/Write&Run example uses `Int` operands only. Two commonly used variations are entirely absent: (1) `+=` on a `String` (`message += ", World!"`, verified working) -- one of the most common real-world uses of `+=`; (2) compound assignment on a `Double` (`total *= 1.5`, now correctly formatted after the engine fix above). Both are common, basic-to-intermediate usages of the exact operators this lesson teaches. |
| W2-06 | Comparison Operators | Only numeric `<`/`>`/`<=`/`>=` comparisons are taught. String ordering comparison (`"apple" < "banana"`, lexicographic, verified working via Kotlin's `Comparable`) is a commonly used but entirely unexplored variation -- the lesson's own `==`/`!=` cards already use Strings, but the relational operators never do. |
| W2-07 | Logical Operators | Learn's prose explicitly teaches short-circuit evaluation ("if the left side is false, Kotlin never even evaluates the right side") as a named behavior, but no Explore example or Predict question demonstrates it operationally (e.g. showing a side effect on the right-hand side is skipped) -- verified the engine correctly implements real short-circuiting. Every existing example only shows the final Boolean result, which looks identical whether or not short-circuiting actually happened. |

Not yet checked against this rule in this pass: Arithmetic Operators,
Operator Precedence, Boss (each reviewed for correctness already; a
dedicated commonly-used-features pass on these three is still open).

**Update, same day: W2-02, W2-05, W2-06, W2-07 authored and verified.**
Added `card-incdec-5`/`card-incdec-6` + `pred-incdec-6`/`pred-incdec-7`
(prefix/postfix as an expression value); `card-assignop-7`/`card-assignop-8`
+ `pred-assignop-5`/`pred-assignop-6` (`+=` on String, `*=` on Double);
`card-cmp-6` + `pred-cmp-6` (String ordering with `<`/`>`); `card-logic-6` +
`pred-logic-6` (operational short-circuit-evaluation demonstration, using a
side-effecting local function to prove the right side is skipped, not just
that the final Boolean happens to match). Catalog `questionsCount` updated
for Increment & Decrement (5->7), Assignment Operators (4->6), Comparison
Operators (5->6), and Logical Operators (5->6).
`npm run audit:world2-quality` now reports 40 examples / 37 predictions
(previously 34/31), all 28 execution checks and 2 hardcode-resistance spot
checks still pass, and `tsc --noEmit` is clean.

## Remaining audit work

1. Author the concept-level activity-ID coverage map per
   `LESSON_QUALITY_STANDARD.md` section 1 for all 7 lessons -- not done in
   this pass. Current Explore/Predict counts (4-6 examples, 3-5 predictions
   per lesson) look reasonable on inspection but haven't been verified
   against an explicit knowledge-point list the way the standard requires.
2. Fix W2-02 (prefix/postfix expression-value coverage) -- the highest-value
   gap, since the engine already supports what's missing.
3. Fix W2-03 (`%=` val-reassignment diagnostic) proactively, before it's
   needed by new content.
4. Extend hardcode-resistance verification (W2-04) to the remaining 5
   lessons.
5. This pass did not perform browser visual QA (rendered code/output/hint
   layout, mobile width) -- that gate remains open, same as World 1's.

Language references consulted: official Kotlin
[operator overloading / precedence](https://kotlinlang.org/docs/operator-overloading.html)
and [equality](https://kotlinlang.org/docs/equality.html) docs, cross-checked
against the actual Kotlin grammar's operator precedence table.
