# World 9 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit completed** -- full curriculum implemented, one engine defect found and fixed, all 12 lessons audited with zero open diagnostic defects and zero scenario duplication.

## Scope and evidence

Reviewed the 12 catalog-linked lessons in Lambda Lab against [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md) Section 1:
- *Quality principle*: Activity counts are derived strictly from a concept-by-concept coverage map based on lesson complexity, rejecting rigid fixed quotas.
- For lessons with broader sub-concept surface areas (e.g. `world-9-lambda-expressions` covering zero-param suppliers, single-param, multi-param, multiline returns, and outer closure variable capture), Stage 2 Explore and Stage 3 Predict were expanded to 5 activities each.
- For `world-9-anonymous-functions` (covering syntax contracts, local guard returns, expression bodies, and passing anonymous functions into higher-order collections), Explore and Predict were calibrated to 4 activities each.
- Focused single-concept topics (`it`, `function-references`, `noinline`, `crossinline`, etc.) maintain 3 tightly focused examples and checks without artificial inflation or duplicate mechanics.

1. `world-9-lambda-expressions` (Lambda expressions) -- 5 Explore, 5 Predict
2. `world-9-anonymous-functions` (Anonymous functions) -- 4 Explore, 4 Predict
3. `world-9-function-types` (Function types) -- 3 Explore, 3 Predict
4. `world-9-higher-order-functions` (Higher-order functions) -- 3 Explore, 3 Predict
5. `world-9-it` (`it`) -- 3 Explore, 3 Predict
6. `world-9-function-references` (Function references) -- 3 Explore, 3 Predict
7. `world-9-returning-from-lambdas` (Returning from lambdas) -- 3 Explore, 3 Predict
8. `world-9-local-returns` (Local returns) -- 3 Explore, 3 Predict
9. `world-9-inline-functions` (Inline functions) -- 3 Explore, 3 Predict
10. `world-9-noinline` (`noinline`) -- 3 Explore, 3 Predict
11. `world-9-crossinline` (`crossinline`) -- 3 Explore, 3 Predict
12. `world-9-boss` (Boss: Functional Utility Pipeline) -- 3 Explore, 3 Predict

Source: `src/data/curriculum/world9LessonsData.ts`.

**Topic-type classification correctly applied**:
- `inline-functions`, `noinline`, and `crossinline` are explicitly authored as Reasoning-type topics (Learn -> Explore -> Predict -> Mastered, without Write & Run / Debug). Inlining, `noinline` object allocation preservation, and `crossinline` non-local return restrictions are compiler-level bytecode transformations. As documented in `PITFALLS.md`, the browser teaching simulator lowers Kotlin directly to JavaScript and cannot reliably simulate JVM call-stack inlining or compile-time non-local escape analyses in an interactive editor without introducing false failures or false positives. Conceptual mastery is thoroughly tested via high-fidelity Explore cards and calibrated Predict questions.
- The remaining 9 lessons (including Boss) are full 5-stage Runnable lessons containing interactive Explore, Predict, Write & Run, and Debug stages.

`npm run audit:world9-quality` checks catalog registration, stage configuration, question counts, executes all 39 Explore code examples, and verifies all 9 Write & Run (starter failure, solution success) and 9 Debug (broken code failure, repaired code success) pairs through `compileAndRunKotlin`.

**Audit execution results:**
- 12 catalog lessons verified
- 39 Explore examples executed and passed
- 39 Predict questions verified with correct answer keys and detailed explanations
- 18 Write & Run / Debug execution pairs tested and passed
- Zero open diagnostic defects or unclosed syntax gaps

## Engine defect found and fixed: trailing lambdas with explicit parameter arrows bypassed call-site label binding

**High -- engine capability, now fixed.**
During the audit of `world-9-local-returns`, code using `return@forEach` inside a trailing lambda with explicit parameter arrows:
```kotlin
values.forEach { item ->
    if (item < 0) return@forEach
    total += item
}
```
failed compilation with:
`Compilation error: Unresolved return label: forEach`.

### Root Cause
In `src/utils/kotlinFunctions.ts`, the function lowering loop emitted lambdas by checking two dictionaries: `trailing` (associated with an immediate call site and registering the callee name as an implicit label) and `literal` (standalone lambda expressions). When a lambda declared explicit parameters (`item ->`), the indexing logic matched `literal` instead of `trailing`, dropping the association with the enclosing `forEach` call. Consequently, the callee name was omitted from the lexical label environment.

### Fix
Prioritized `trailing` over `literal` when matching tokens at an opening brace (`const lambda = trailing ?? literal`). This ensures trailing lambdas with parameter arrows retain their call-site association and implicit labels like `@forEach`. Documented in detail in [PITFALLS.md](PITFALLS.md). Verified via `npm run test:lambda-runner` (119/119 passing) and `npm run audit:world9-quality` with zero regressions.

## Write & Run / Debug scenario independence: zero duplicates (100% compliant)

Per `LESSON_QUALITY_STANDARD.md` section 2, a Debug stage's `fixedCode` must never duplicate the lesson's Write & Run `solutionCode`. Across all 9 runnable lessons in World 9, every Debug challenge features an independent scenario, distinct variable names, and fresh problem contexts:

| Lesson | Write & Run scenario | Debug scenario | Bug mechanism diagnosed |
| --- | --- | --- | --- |
| Lambda expressions | `triple` lambda (`number * 3`) | `fuelCost` lambda (`distance * 4`) | Arithmetic operator bug (`+` instead of `*`) |
| Anonymous functions | `format` anonymous fun (`Score: 42`) | `parseCode` anonymous fun (`REF-100`) | Input mutation bug (`code + 1` instead of `code`) |
| Function types | `discount: (Int) -> Int` (`price - 5`) | `addSurcharge: (Int) -> Int` (`weight + 8`) | Subtraction instead of addition |
| Higher-order functions | `applyBonus(value, operation)` | `modifyScore(score, policy)` | Function argument ignored (returning raw parameter) |
| `it` | `cheer: (String) -> String` (`"Go, " + it + "!"`) | `addUnit: (Int) -> String` (`it.toString() + "px"`) | Reversed concatenation order (`"px" + it`) |
| Function references | `::stamp` passed to `formatter` | `::calculateTax` assigned to `taxFunc` | Bypassed function reference using dummy identity lambda |
| Returning from lambdas | `total` lambda returning `subtotal + 4` | `calculateBonus` multiline lambda | Multiline lambda returning intermediate variable instead of sum |
| Local returns | `sumPositive` with `return@forEach` | `countLongWords` with `return@forEach` | Bare `return count` prematurely exiting enclosing function |
| Boss | `applyRule(value, rule)` pipeline | `runTransform(number, operation)` pipeline | Ignored lambda argument returning unmodified input |

## Write & Run / Debug task-scope audit

All tasks conform to single-concept, single-fault pedagogical boundaries:
- Write & Run tasks require implementing the core callable syntax taught in the Learn section.
- Debug tasks contain exactly one logic defect with 3 progressive hints and an explicit explanation.
- No task introduces unlabeled `break` or `continue` jumps or unsupported language constructs.

## Predict question quality

All 36 Predict questions adhere to quality standards:
- 4 multiple-choice options per question (`A`, `B`, `C`, `D`) with exactly one correct option.
- Distractors reflect realistic learner misconceptions (e.g. operator precedence, argument order confusion, uncalled lambda references, premature function returns).
- Detailed explanations reference the exact execution flow and Kotlin language rules.

## Remaining audit work

1. Author optional end-to-end Kotlin JVM compiler comparison script if local Kotlin toolchain is installed (`KOTLIN_COMPILER_CLASSPATH`).
2. Spot-check mobile responsive viewport rendering in device emulators.
