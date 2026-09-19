# World 1 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress** -- correctness/capability findings and
the highest-severity coverage/pedagogy/assessment findings from the first pass
below are now fixed and verified; the full activity-ID coverage map and
count expansion in the correction plan have not been authored yet.

## Correction pass (2026-09-19, same day as first pass)

Findings W1-01 through W1-05 (editor capability/correctness) were already
fixed in the engine before this pass started; re-verified here with the same
scratch checks the original findings used, plus `npm run audit:world1-quality`
(48/48 execution checks, including the new hardcode-resistance spot checks
below). One additional engine defect was found and fixed while verifying a
new Float writeRun task: `.toFloat()` printed float32-rounding noise
(`19.989999771118164`) instead of Kotlin's shortest-decimal Float output
(`19.99`) -- see [PITFALLS.md](PITFALLS.md) for the fix.

Concrete fixes applied and re-verified via `compileAndRunKotlin`:

- **W1-06 (Long/Float practice)**: Int/Long's Write & Run now requires an
  explicit `.toLong()` conversion and a Long multiplication (previously
  Int-arithmetic only). Float/Double's Write & Run now requires a `.toFloat()`
  conversion from a computed Double (previously Double-arithmetic only).
- **W1-06 (Boss mastery overclaim)**: the Boss Write & Run previously only
  used String/Char/Int, while its mastery claim listed Long/Float/Double/
  Boolean as demonstrated. The task now also exercises `var` mutation
  (`score += bonus`) and a comparison-derived Boolean, and the mastery
  summary/verification items were reworded to claim only what the Boss task
  itself demonstrates -- Long/Float/Double are attributed to their own
  lessons, not re-claimed here.
- **W1-07 (pedagogy)**: print/println's debug bug was a generic identifier
  typo (`prntln`) unrelated to the taught concept; replaced with a
  same-output-required scenario where using `println()` instead of `print()`
  for the label breaks the required single-line format -- this exercises the
  print/println line-ending distinction itself. Char's debug bug was a
  same-shape-different-letter-case value swap; replaced with a missing-
  backslash escape-sequence bug (`'t'` vs `'\t'`), which is reproducible in
  this simulator (unlike a Char-vs-String quoting bug -- see PITFALLS.md's
  "Debug exercises must be reproducible by this app's simulator" rule) and
  exercises escape sequences, a concept this lesson teaches but had no
  debug/write evidence for. val/var's mastery claim wording ("compile-time
  immutability") was reworded to avoid implying deep object immutability,
  per the master plan's val/var boundary note.
- **W1-08 (assessment strength, partial)**: added hardcode-resistance spot
  checks to `audit-world1-quality.ts` for the three writeRun tasks revised
  above -- each mutates the task's own input literals and asserts the
  recomputed output differs from the original expected output, which a
  hardcoded `println("18250000")`-style solution would fail. This is
  evidence for 3 of 13 lessons, not full-world coverage; the other 10
  writeRun/debug tasks still only have fixed-output assertions and remain an
  open assessment-strength gap.

Not done in this pass: the full concept-level activity-ID coverage map and
the correction plan's planned Explore/Predict count expansion (43/45 across
all 13 lessons) below. Those counts describe a target shape, not yet
authored content -- treat the table as the plan for the next pass, not
current state.

## Commonly-used-features audit (2026-09-19, against the new
LESSON_QUALITY_STANDARD.md rule)

`LESSON_QUALITY_STANDARD.md` section 1 now requires Explore + Predict to
cover every commonly used feature of a lesson's topic at basic/intermediate
level, including distinct common variations, not just one introductory
shape. Spot-checked several lessons against this rule -- not yet a full
pass over all 13.

**Three more engine defects found and fixed** while verifying candidate new
examples against real Kotlin behavior (see [PITFALLS.md](PITFALLS.md) for
full root-cause writeups):

- A decimal literal (`10.0`) was silently misclassified as `Int` by
  `kotlinFunctions.ts`'s type inference, which broke `__kt_decimalText`
  Double-formatting for every BARE `val`/`var` Double reference (`val total
  = 10.0; println(total)` printed `10`, not `10.0`) and caused an outright
  `Compilation error: Type mismatch: expected Double, got Int` for compound
  assignment on an explicitly `Double`-typed `var` (`var total: Double =
  10.0; total *= 1.5`). This was a same-day regression from the World 2
  tokenizer fix below -- both fixed and re-verified together.
- Escaping a literal `$` in a string template (`"\$price"`) printed the
  wrong thing entirely: `${price}` (with literal curly braces) instead of
  `$price`. This directly affects the String Templates lesson, whose own
  Learn section teaches `\$` escaping as a key idea with zero Explore/Predict
  coverage of it -- exactly the kind of gap this new rule is meant to catch.

**New coverage findings** (not yet fixed as content):

| ID | Lesson | Gap |
| --- | --- | --- |
| W1-09 | String Templates | Learn teaches escaping `$` with `\$` as a named key idea, but no Explore example or Predict question exercises it. Now that the engine bug above is fixed, this is authorable. |
| W1-10 | Char | Mastered claims `\n` and `\t` escape coverage, but only `\t` has an Explore card (`card-char-3`) and a Debug exercise (after this session's earlier fix); `\n` is mentioned only in Learn's code snippet, never explored or predicted independently. |
| W1-11 | Comments (pre-existing, reconfirmed) | `pred-comments-3` tests `//` inside a string literal with no matching Explore card teaching that behavior first -- already flagged in the original audit pass, still open. |
| W1-12 | print/println (pre-existing, reconfirmed) | `pred-print-3` tests an empty `println()` call with no matching Explore card -- already flagged in the original audit pass, still open. |
| W1-13 | Float & Double | This session's own earlier Write & Run fix (`.toFloat()` conversion) introduced a method never taught anywhere in Learn/Explore/Predict for this lesson -- the equivalent gap Int/Long avoids only because it already has `card-intlong-3` teaching `.toLong()` first. Needs an Explore card + Predict question introducing `.toFloat()`/`.toDouble()` conversion before the Write & Run task that requires it. |

Not yet checked against this rule: val/var, Variables & Type Inference,
Int & Long, Boolean, String, Boss. A full pass across all 13 lessons is
still open work.

## Write & Run / Debug task-scope audit (2026-09-19, against
LESSON_QUALITY_STANDARD.md section 2)

Reviewed all 12 Write & Run / Debug pairs across World 1 (`kotlin-syntax`
through `boss`; the conceptual `what-is-kotlin` lesson has neither, correctly
per section 2's non-executable-orientation allowance) against the new rule:
do not force every taught concept into one task, group only naturally
co-occurring concepts, and keep each Debug tied to one reproducible fault.

**Verdict: no task in World 1 is overloaded.** Every Write & Run task
combines at most two concepts, and each pairing is a concept that would
naturally co-occur in a small real program at this lesson's level, not an
arbitrary stitch of unrelated features:

| Lesson | Write & Run scope | Debug scope |
| --- | --- | --- |
| Kotlin syntax | Single concept (println a message) | Single fault (unterminated string) |
| Comments | Single concept (comment out a line) | Single fault (unclosed block comment) |
| print/println | Two naturally paired concepts (print then println, the lesson's own core combination) | Single fault (println ends the line too early) |
| val vs var | Single concept (reassign a var) | Single fault (val reassignment) |
| Variables & Type Inference | Two related forms of the same action (inferred + explicit declaration) | Single fault (type mismatch) |
| Int & Long | Two naturally sequenced concepts (convert Int->Long, then use it in Long arithmetic) | Single fault (wrong arithmetic operator on Longs) |
| Float & Double | Two naturally sequenced concepts (Double arithmetic, then convert to Float for display) | Single fault (wrong arithmetic operator on Doubles) |
| Boolean | Single concept (negate with !) | Single fault, but see W1-14 below |
| Char | Single concept (print a Char) | Single fault (missing backslash in an escape sequence) |
| String | Single concept (concatenate and print) | Single fault (unterminated string) |
| String Templates | Single concept (variable interpolation) | Single fault (missing braces for property access) |
| Boss | Four concepts (String, Char, var mutation, Boolean comparison) integrated by design -- this is the sanctioned exception section 2 allows for a capstone whose entire purpose (per the master plan) is testing combination, not a violation | Single fault (unterminated string / wrong quote type) |

**W1-14 (prerequisite violation, found during this pass) -- fixed.**
Boolean's Debug exercise (`Fix the Boolean Logic Mistake`) required
understanding `||` vs `&&` to diagnose -- compound logical operators, which
are explicitly World 2 (Operator Forge) material, not yet taught anywhere
in World 1. Replaced with `Fix the Missing Negation`: a Boolean-only bug
where `val soundEnabled = isMuted` should have been `val soundEnabled =
!isMuted` -- a genuine, reproducible fault using only `!`, the negation
operator this lesson actually teaches. World 2's Logical Operators lesson
already teaches the `||`-vs-`&&` precedence mistake correctly at the right
point in the curriculum (see `WORLD_2_CONTENT_REVIEW.md`), so no coverage
was lost by removing it from here. Verified via `compileAndRunKotlin`
(broken prints `true`, fixed prints `false`) and `npm run
audit:world1-quality` (48/48 execution checks still pass).

## Update, same day: W1-09 through W1-13 authored and verified. Added
`card-tmpl-4`/`pred-tmpl-4` (escaped `\$`), `card-char-4`/`pred-char-4`
(`\n` escape), `card-float-4`/`pred-float-4` (`.toFloat()`/`.toDouble()`
conversion), `card-comments-4` (`//` inside a string literal), and
`card-print-4` (empty `println()` blank line). Catalog `questionsCount`
updated for String Templates/Char/Float & Double (3 -> 4 each).
`npm run audit:world1-quality` now reports 41 examples / 42 predictions
(previously 36/39), all 48 execution checks and 3 hardcode-resistance spot
checks still pass, and `tsc --noEmit` is clean. This closed the specific
gaps found so far, not the full 13-lesson pass.

## Scope and evidence

Reviewed the 13 catalog-linked lessons in Kotlin Awakening, including Learn, Explore, Predict, writing, debugging and mastery claims. Sources: `src/data/lessonStagesData.ts`, `src/data/curriculum/world1LessonsData.ts`, and `src/data/curriculum/masterCurriculumCatalog.ts`. Registry aliases were deduplicated; the orphan `variables` lesson was excluded.

Current inventory: 36 Explore examples, 39 predictions, 12 writing tasks and 12 debugging tasks. These counts describe existing content, not recommended counts. The conceptual introduction intentionally omits coding stages.

`npm run audit:world1-quality` checks registration, question totals/answer-key structure, probes all Explore examples and runs solutions, starters, broken code and repairs. All 48 writing/debug execution assertions pass: reference solutions/repairs produce expected output, and starters/broken programs do not. That result does not validate coverage, diagnostic quality or resistance to hardcoded answers.

## Initial coverage map and required revisions

E/P below refer to existing examples/predictions by order within the lesson. W/D refer to the current writing/debug tasks. These rows identify the scenario groups that need a detailed activity-ID map before rewriting. Final counts have deliberately not been chosen before that mapping.

| Lesson | Common concepts and existing teaching/prediction evidence | Writing/debugging evidence and gap | Required next revision / deferral |
| --- | --- | --- | --- |
| What is Kotlin? | Learn and three comprehension checks cover origins, applications and static typing; no Explore | No editor task: justified for orientation | Keep conceptual assessment; explicitly connect static typing to a beginner-readable illustration and avoid claiming coding mastery. Verify platform claims when revising. |
| Kotlin syntax | E1–3/P1–3 cover main, output, sequence and empty body | W prints one line; D fixes a quote | Assess statement order in writing and debug structure/order, not only a malformed string. Keep function parameters and packages for later scope. |
| Comments | E1–3 cover line/block comments and disabled code; P3 covers markers inside strings | W only disables one line; D has unclosed block comment | Add teaching for P3 before testing it; map nested blocks or explicitly defer them. Exercise block comments as well as line comments. Repair diagnostic defect below. |
| print / println | E1–3 cover line behavior; P3 asks about empty println without an explicit matching Explore scenario | W mixes print/println; D only fixes misspelled prntln | Teach blank-line behavior; debug a line-break/spacing mistake that actually tests this lesson. Include whitespace-visible outputs. |
| val / var | E/P cover declaration, reassignment and choosing val | W/D both exercise changing a value | Avoid “compile-time immutability” implying deeply immutable objects. Assess an intentional val/var choice; defer mutable object contents to collections/OOP with a clear boundary. |
| Variables / inference | E/P cover inference, explicit annotations and incompatible reassignment | W uses both declaration forms; D repairs a type mismatch | Strengthen explanation of fixed variable type versus changing value. Keep deferred initialization/scope explicit rather than claiming every declaration pattern covered. |
| Int / Long | E covers arithmetic, L and toLong; P covers default type, L and separators | W is Int arithmetic only; D changes an arithmetic operator | Add meaningful Long practice and conversion assessment after editor repair; map representable ranges and boundary awareness. Overflow details may be deferred with rationale. |
| Float / Double | E/P cover default decimal type, f suffix and incompatible declaration | W/D use Double arithmetic only | Teach and test a valid Float declaration, conversion/precision awareness and exact output. Float editor and formatting blockers must be resolved or practice gated. |
| Boolean | E/P cover true/false, comparison, negation and quoted String distinction | W only negates a literal; D repairs a Boolean value | Carry comparison-produced Boolean into practice; explicitly defer compound logic/short-circuiting to the operators lesson. |
| Char | E covers quotes, String distinction and escapes; P covers valid/invalid literals and printing a digit | W prints K; D changes z to Z | Practice/diagnose Char-versus-String or escapes rather than letter substitution alone. Type enforcement must be verified before requiring compiler errors. |
| String | E covers length, concatenation and raw multiline strings; P covers length, concatenation and empty string | W concatenates; D repairs closing quote | Add prediction and practice coverage for raw strings and length; map escaping/indexing or explicitly assign them elsewhere. Gate raw-string execution until supported. |
| String templates | E covers variable/expression/property interpolation; P compares literal arithmetic with expression braces | W only interpolates variables; D correctly repairs property interpolation | Add implementation evidence for expression/property interpolation; map literal dollar signs and defer advanced template features. |
| Boss | E/P combine some primitives, state updates and formatting | W uses String/Char/Int only; D fixes a quote | Build an integrated task using learned state changes and computed expressions. Narrow mastery claims until Long/Float/Boolean and other claimed skills have actual evidence. |

## Findings, ordered by consequence

| ID | Severity / category | Evidence | Repair required |
| --- | --- | --- | --- |
| W1-01 | High — editor capability | `world-1-int-long/card-intlong-3`: valid `small.toLong()` fails with “small.toLong is not a function”. | Implement faithful conversion for the taught scope or label this example read/predict-only and record deferred practice. |
| W1-02 | High — editor capability | `world-1-float-double/card-float-2` and `card-float-3`: valid Float literals are rejected as “expected Float, got Double”. | Preserve Float literal typing through lowering and test valid and invalid assignments against Kotlin. |
| W1-03 | High — editor capability | `world-1-string/card-str-3`: valid triple-quoted string with trimIndent fails as an unclosed string. | Repair raw-string handling or gate execution; preserve correct Kotlin teaching. |
| W1-04 | Medium — output fidelity | `world-1-float-double/card-float-1`: runner prints `10` for a Double product whose Kotlin output is `10.0`. | Preserve relevant numeric formatting or explicitly limit exact-output activities. |
| W1-05 | Medium — diagnostic quality | Comments broken debug fails with “Cannot read properties of undefined (reading 'start')”, rather than an understandable unterminated-comment diagnostic. | Report the actual syntax issue and source location; rejection alone is insufficient. |
| W1-06 | High — coverage and mastery | Long and Float are taught, but corresponding writing tasks only use Int/Double. Char escape and raw-string concepts lack practical assessment. Boss claims mastery of all primitive types despite narrow practice. | Complete the map and needed tasks, then align mastery claims with evidence. |
| W1-07 | Medium — pedagogy | print/println debug repairs a spelling error; Char debug only changes letter case; val mastery says “compile-time immutability”. | Use topic-specific misconceptions and precise read-only-binding language. |
| W1-08 | Medium — assessment strength | Existing execution assertions check fixed expected output, not whether required constructs were used. | Review actual grading and demonstrate that hardcoding cannot satisfy construct-specific objectives before verification. This is an unverified assessment gate, not a confirmed UI exploit. |

## Remaining audit work and repair order

1. Resolve correctness/capability findings W1-01 through W1-05, or explicitly gate unsupported examples.
2. Turn each lesson's scenario groups above into the standard's concept-level activity-ID map, including Learn references and justified deferrals. Derive counts from that map before authoring.
3. Revise teaching and assessment together, prioritizing narrow practice and inflated mastery. Recheck all answer keys against their actual prompt; a type question is not an output question.
4. Validate grading beyond reference outputs and review rendered code/output/mobile presentation. This pass did not perform browser visual QA or compile every activity with real Kotlin; those gates remain open.
5. Re-run evidence checks and complete editorial acceptance before marking World 1 Verified. Later worlds remain unaudited under the new standard.

Language references consulted: official Kotlin [basic syntax](https://kotlinlang.org/docs/basic-syntax.html), [numbers](https://kotlinlang.org/docs/numbers.html), and [strings](https://kotlinlang.org/docs/strings.html). These establish language behavior; runner execution above establishes the observed implementation gaps.

## Correction plan (recorded before authoring)

Each row is one coherent lesson outcome. Existing IDs are retained; new cards/questions append in the order below. E/P numbers are derived from distinct behavior groups, not a common quota. W/D each combine the listed supported concepts in one small program; instructions and alternative-input checks will explicitly exercise them.

| Lesson | Learn / concept groups mapped to E and P | Planned E / P | W / D outcome | Boundary |
| --- | --- | --- | --- | --- |
| Orientation | purpose, platforms, static typing; illustrated typing in Learn, comprehension P1–3 | 0 / 3 | Conceptual only | No coding mastery |
| Syntax | entry E1/P3; output E2/P1; order E3/P2 | 3 / 3 | Ordered two-line greeting / swapped statements | Parameters deferred to functions |
| Comments | line E1/P1; block E2/P2; disabled code E3; string markers E4/P3; nested block E5/P4 | 5 / 4 | Disable diagnostic lines using both forms, preserve marker text / repair nested closing delimiters | KDoc deferred to documentation |
| Output | println E1/P2; print E2; mixed E3/P1; blank line E4/P3–4 | 4 / 4 | Print a labelled value and blank separator / repair line breaks | Output values can be changed by checks |
| val/var | binding E1/P3; update E2/P1; illegal reassignment E3/P2 | 3 / 3 | Keep a fixed label and update a counter / repair mutable binding | Mutable object contents deferred to collections |
| Inference | inferred E1/P1; explicit E2/P3; fixed type E3/P2 | 3 / 3 | Use both forms / fix incompatible assignment | Scope/deferred initialization later |
| Int/Long | arithmetic E1; Long E2/P2; conversion E3/P4; separators/range E4/P1,P3 | 4 / 4 | Convert a daily Int amount and compute a Long total / repair incorrect conversion/arithmetic | Full Long range and overflow taught as boundaries, not claimed by runner |
| Float/Double | default E1/P1; Float E2/P2; invalid suffix E3/P3; conversion E4/P4 | 4 / 4 | Float and Double values, conversion and arithmetic / repair Float declaration | Precision/rounding explained; advanced IEEE behavior deferred |
| Boolean | literal E1/P2; comparison E2/P3; negation E3/P1 | 3 / 3 | Comparison and opposite flag / repair comparison | Compound logic in operators |
| Char | characters E1/P3; Char/String E2/P1–2; escapes E3/P4 | 3 / 4 | Print Char, String and tab separator / repair Char type | Unicode code points later |
| String | length E1/P1,P3; concat E2/P2; raw E3/P4; escaped text E4/P5 | 4 / 5 | Build title, length and raw banner / repair raw delimiter and concatenation | Indexing and advanced text APIs deferred |
| Templates | variable E1/P1; expression E2/P2–3; property E3/P4; literal dollar E4/P5 | 4 / 5 | Variable/property/expression report with literal dollar / repair braces | Advanced interpolation later |
| Boss | profile E1/P1; update E2/P3; report E3/P2 | 3 / 3 | Update score, compute pass flag and format profile / repair state and template | Claims limited to demonstrated integration |

Total planned: 43 Explore and 45 Predict activities, with 12 integrated writing and 12 debugging tasks. No new count becomes a requirement for other lessons. Each runnable stage must pass its solution plus objective checks and reject both its unfinished/broken version and direct hardcoded-output substitutions.
