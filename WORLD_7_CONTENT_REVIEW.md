# World 7 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress**.

## Scope and evidence

All 11 catalog-linked Null Safety Shield lessons and all six stages were read in full in `src/data/curriculum/world7LessonsData.ts`. Registration is checked against `masterCurriculumCatalog.ts`. `world7_generics.ts` exports the legacy `WORLD_7_QUESTIONS`, wired into `ALL_CURRICULUM_QUESTIONS` and Drill, not these lessons; it is excluded.

Baseline: 33 Explore cards, 33 predictions, 11 writing tasks and 11 debugging tasks. Existing examples mostly demonstrate only literal null/present values. Counts below are derived from the missing behavior groups, before authoring, not imposed as quotas.

## Coverage plan and activity map

E/P numbers are the stable lesson-local Explore/Predict suffixes. Learn references name the relevant key idea/explanation. W/D refer to the sole focused task in that lesson, not a requirement to combine all variants in one program.

| Lesson / common behavior | Learn reference | Explore / Predict evidence planned | Writing / debugging decision | Boundary |
| --- | --- | --- | --- | --- |
| Nullable types: value/null, numeric nullable, nullable parameters | Type? and absence | E/P1–3 retained; E/P4 nullable parameter/function boundary | W nullable declaration; D empty versus missing value. Parameter variation is separately assessed in E/P4. | Nullable numeric arithmetic is taught in Elvis and Null Checks, not silently treated as zero. |
| Nullable variables: transitions, latest value, nullable return | Reassignment | E/P1–3 retained; E/P4 nullable function result replacing a value | W ticket lifecycle; D wrong variable. Both are one state-update task. | Explain explicit nullable annotation when starting from null; advanced inference deferred. |
| Safe call: property, missing value, method/argument skipping, two levels | Safe member access and nullable result | E/P1–3 retained with compiler-error correction; E/P4 method call; E/P5 nested receiver | W safe property read; D missing safe call. Nested data is demonstrated/assessed without adding an OOP writing prerequisite. | Tiny supplied data classes preview the receiver shape from World 8. Safe assignment to mutable properties deferred there. |
| Elvis: fallback/present, safe call, lazy function default, several fallbacks, arithmetic, early return | Default only for null | E/P1–3 retained; E/P4–7 for four distinct missing forms | W theme default; D self-referential fallback. Function-default/return forms have independent E/P evidence, not bundled tasks. | throw/exception design in World 15. |
| Non-null assertion: success, failure, plain value, map lookup | Assertion versus recovery | E/P1–3 retained; E/P4 lookup assertion | W known username; D unsafe assertion replaced by safe default | Multiple-assertion binding is covered by engine regressions, not promoted as a style recommendation. |
| Null checks: present/missing branches, reverse check, numeric arithmetic, short circuit | Branch handling | E/P1–3 retained; E/P4 arithmetic; E/P5 &&/|| | W age reporting; D one swapped branch decision | No compound unrelated task. |
| Smart casts: guarded access, fallback, flow scope, early return, is, reassignment | Flow proof and stability | E/P1–3 corrected; E/P4 guard return; E/P5 is String; E/P6 reassignment invalidation | W guarded bio; D missing guard | Full compiler flow/alias/property analysis remains outside simulator fidelity. |
| Safe casts: success/failure/default, nullable source, chaining, no numeric conversion | Runtime type versus conversion | E/P1–3 retained; E/P4 null Any?; E/P5 cast + safe call; E/P6 numeric mismatch | W mismatched cast; D wrong target | Char and erased numeric runtime types must fail explicitly; no false String/Char or numeric-subtype guarantees. |
| Nullable collections: elements/reference/map, both nullable, missing key vs null entry, filterNotNull | Position of ? | E/P1–3 retained; E/P4–6 for three missing variations | W nullable-list size; D missing safe call. Filtering and key-presence decisions assessed independently in E/P. | Generic runtime casts deferred; generic declaration comma handling must execute. |
| Chaining: present/null/missing key, two lookups, methods, null in text | Failure points and one final default | E/P1–3 retained; E/P4–6 for nested lookup, method chain, output context | W two nickname lookups; D missing fallback on one line | Scope functions belong in World 13. |
| Boss: report, count real data, fallback | Honest missing-data report | E/P1–3 retained; E/P4 zero versus missing/all-missing boundary | Keep report+counter integration and one misplaced increment fault | Narrow mastery claim: writing does not use Elvis or safe casts. |

Planned result: 57 Explore and 57 Predict scenarios (4,4,5,7,4,5,6,6,6,6,4 by lesson), retaining 11 focused writing and 11 single-fault debugging tasks. These are coverage-derived counts; reference verification can still reveal a need to revise them.

## Engine-correctness audit and findings

**W7-01 — High: silent null-output corruption, fixed.** A failed safe-call expression could retain JavaScript `undefined`, leaking into concatenation/interpolation even where direct printing looked correct. Normalize safe-call expression results to real null and format template expressions through Kotlin's formatter. Dedicated probes check direct, stored, interpolated and concatenated results; every expected null is printed as `null`.

**W7-02 — High: expression rewriting changed Kotlin semantics, fixed.** Line-based Elvis/assertion rewriting did not preserve Kotlin precedence and postfix boundaries. Multiple `!!` on one line, assertions on function/map results, arithmetic with asserted values, and Elvis mixed with comparisons could fail or compute the wrong result. Token/delimiter-aware lowering now preserves these boundaries, left-associative arithmetic, integer division and lazy defaults. Multiple independent and chained assertions are regression-tested, including a second assertion that must throw. The old PITFALLS one-assertion-per-line restriction is superseded for these supported forms.

**W7-03 — High: safe casts could misrepresent runtime types, fixed within an explicit subset.** Safe-cast operands now evaluate once. Known immutable primitive sources retain sufficient type information to distinguish a numeric cast from conversion. Mutable or erased numeric sources are rejected explicitly when their runtime subtype cannot be established. `Char` targets for `is`, `!is` and `as?`, and known Char-to-String casts, are explicitly rejected rather than silently treating Char as String. These are editor capability errors for valid Kotlin, not claims that Kotlin prohibits those operations. General numeric `is` subtype fidelity and generic runtime casts remain outside this pass; no lesson relies on them.

**W7-04 — High: nullable operations could succeed with a wrong value, fixed for tracked local cases.** JavaScript can coerce null to zero during arithmetic and does not implement Kotlin's compile-time nullable receiver restrictions. Added conservative diagnostics for known-null local arithmetic/member access while allowing the tested guarded branches and short-circuit forms. Preserved nullable function parameter annotations and supported the taught Elvis/early-return guard form. This is not a complete nullable type checker or full smart-cast analysis: aliases, callbacks, mutable properties and arbitrary control flow remain limitations.

**Nullable generic declarations — checked, no new defect reproduced.** `Map<String, Int?>` and nested nullable generics execute with exact expected values; comma-containing annotations survive the existing type stripping. Nullable collection/reference/element distinctions, absent versus null map entries, and filtering are exercised in both authored content and regression fixtures.

No authored World 7 lesson depends on Char runtime checks or multiple assertions on one line. The latter is exercised deliberately in engine regression probes. Root causes, repair details and supported boundaries are recorded in [PITFALLS.md](PITFALLS.md), under “World 7 audit: null operators need expression boundaries, not line regexes”.

## Content findings and repairs

**W7-05 — High: incorrect compiler-versus-runtime explanations, fixed.** Safe-call Predict 3 and Smart Casts Predict 1 described unsafe nullable access as a runtime crash. They now identify compilation rejection. Related safe-call, smart-cast and nullable-collection Debug text/hints agree with the actual fault. The intentional `!!` null examples still correctly demonstrate a runtime exception.

**W7-06 — Medium: smart-cast explanation was too broad, fixed.** Proof does not always end at a closing brace: a terminating guard can establish non-nullness for subsequent code, while reassignment can invalidate it. Learn, Explore and Predict now distinguish these cases. Replaced the misleading fixed-non-null scope example with a nullable parameter and a path where null can reach the later access.

**W7-07 — High: common intermediate variations missing, fixed.** Added 24 Explore cards and 24 separately authored prediction scenarios following the coverage map above. Additions include lazy function defaults, chained Elvis, nullable numeric arithmetic, the common `?.` + `?:` idiom, two-level receivers, skipped method arguments, early-return guards, safe-cast chaining, nullable collection elements/references, missing keys, and zero-versus-missing Boss data. Correct-answer positions now vary; catalog totals and mastery summaries match actual questions. Writing descriptions state expected output. Boss mastery no longer claims the writing task uses Elvis when it does not.

Actual result: **57 Explore and 57 Predict**, with lesson counts **4, 4, 5, 7, 4, 5, 6, 6, 6, 6, 4**. Counts differ because the behavior groups differ, not to meet a fixed quota.

## Write & Run / Debug task-scope audit

All 11 writing tasks remain focused on the named lesson objective; all 11 Debug tasks have a reproducible single fault. The activity map records each writing target and Debug fault. In particular, the Boss combines reporting and counting as permitted by the standard; its Debug repair moves one counter increment into the appropriate branch. It does not bundle unrelated casting, syntax and null-handling failures.

Intermediate alternatives receive distinct Explore/Predict assessment instead of turning each writing task into a checklist. Fixed programs reach the required output; every starter/broken program fails to meet that output. This checks the supplied content, not whether output-only assessment can resist hardcoded submissions.

## Execution evidence

- `npm run audit:world7-quality`: checks registration, unique IDs, catalog totals, answer keys and all 11 Learn examples, 57 Explore cards, 57 predictions, and 44 writing/debug executions. Includes 24 targeted null-safety regression cases. **Zero failures.** Intentional compile failures and runtime exceptions have explicit expected outcomes; successful snippets require exact output.
- `npm run test:world7-kotlin`, using local Kotlin 2.1.10 compiler JARs through `KOTLIN_COMPILER_CLASSPATH`: **161 runnable cases (including expected null-pointer exceptions) and 4 separate compiler rejections pass**. Editor-only unsupported forms are excluded from Kotlin-invalid assertions. This checks the authored positive programs and selected probes against the real language, not merely the simulator's own answer keys.
- Final regression run: `audit:world1-quality` through `audit:world6-quality`, `test:lambda-runner` (74 cases), `test:collection-runner` (31 behavior + 5 rejection + 20 lesson solutions), `test:world11-content` (14 lessons, 12 runner checks), and `tsc --noEmit` all pass. `npm run build` passes with the existing large-bundle warning; `audit:output-quotes` reports no mismatches.

## Remaining audit work

Status remains **Audit in progress**, not Verified. Browser visual QA (mobile layout, wrapping, interaction and rendered feedback) and hardcode-resistance assessment checks are out of scope and remain open. The simulator limits above are explicit; this pass does not certify arbitrary Kotlin programs or full static type analysis. Deferred language topics in the coverage map should be checked when their destination worlds are audited.

Semantic references: [Kotlin null safety](https://kotlinlang.org/docs/null-safety.html) and [Kotlin type checks and casts](https://kotlinlang.org/docs/typecasts.html). Local authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md), [PITFALLS.md](PITFALLS.md), and the World 7 topic list/Boss in [CODEDO_MASTER_PLAN.md](CODEDO_MASTER_PLAN.md).
