# World 10 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit in progress**.

## Scope and evidence

Reopened the previous “Audit completed” report. The former audit only checked whether examples ran, logged incorrect prediction outputs without failing, and did not execute Learn snippets. It also declared activity counts that no longer matched the lesson data. The replacement audit uses explicit hand-traced outcomes, asserts output equality, and fails on every mismatch.

Activity counts come from the coverage map in [WORLD_10_CAPACITY_AUDIT.md](WORLD_10_CAPACITY_AUDIT.md), not a fixed quota. The additions cover empty results, declared-class filtering, flattening, reduce/fold boundaries, missing map keys, transformed `zip`, partial stepped windows, equality/order, stable derived-key sorting, empty extrema, numeric and logical identities, nullable lookup, and an integrated grouped-report Boss pipeline.

| Lesson | Explore | Predict |
| --- | ---: | ---: |
| `map-mapnotnull-filter` | 5 | 5 |
| `filternot-filterisinstance-flatmap` | 5 | 5 |
| `flatten-reduce-fold` | 4 | 5 |
| `groupby-associate-partition` | 5 | 5 |
| `zip-chunked-windowed` | 5 | 6 |
| `distinct-sorted` | 4 | 4 |
| `sortedby-min-max` | 4 | 5 |
| `sum-average-any-all-none` | 5 | 5 |
| `first-find-collection-pipelines-and-chai` | 4 | 4 |
| `boss` | 5 | 5 |

Final activity totals: **46 Explore, 49 Predict, 10 Write & Run, and 10 Debug** tasks. The audit treats every Learn, Explore, and runnable Predict snippet as an exact-output test; it also checks each starter, solution, broken Debug version, and repair.

Source: `src/data/curriculum/world10LessonsData.ts`.

**Curriculum Structure**:
- All 10 lessons are full 5-stage Runnable lessons containing interactive Learn, Explore, Predict, Write & Run (1 challenge each), Debug (1 challenge each), and Mastered stages.
- Supported operations run directly on `KotlinList` eagerly inside `src/utils/kotlinCollections.ts` without relying on browser Array prototypes or external runtimes.
- Rejection cases documented in `WORLD_10_CAPACITY_AUDIT.md` (e.g. non-positive step sizes, empty list `first()` / `reduce()`, unsupported reified types) are fully respected across all lesson snippets.

`npm run audit:world10-quality` checks catalog registration, unique activity IDs, stage configuration, question counts, answer keys, exact Learn/Explore/Predict outcomes, and all Write & Run and Debug failure/success pairs through `compileAndRunKotlin`.

**Audit execution results:**
- 10 catalog lessons verified
- 10 Learn snippets, 46 Explore examples, and 49 Predict questions executed with exact expected outcomes
- 40 Write & Run / Debug executions tested: starters and broken programs fail; solutions and repairs pass with exact output
- 0 execution failures in the current audit run
- Browser QA and hardcode-resistance assessment remain open; this does not establish a Verified status

## Collection engine capacity & simulator alignment

As analyzed in `WORLD_10_CAPACITY_AUDIT.md`:
1. **Eager List Runtime**: All functional methods (`filter`, `map`, `fold`, `partition`, etc.) return new `KotlinList` instances. Immutability guarantees hold across all stages.
2. **Reified Type Filtering**: `filterIsInstance<T>()` in the simulator handles standard types (`String`, `Number`, `Boolean`, and user-declared class names). Lessons use supported types without complex generic projections.
3. **Empty Collection Semantics**: `reduce` and `first` throw `NoSuchElementException` on empty collections, while `fold`, `minOrNull`, `maxOrNull`, and `find` handle empty collections safely without throwing. These semantics are taught and tested in the curriculum.
4. **Batching & Sliding Windows**: `chunked` and `windowed` correctly produce nested lists and validate positive chunk/window sizes.
5. **Map-producing trailing lambdas**: `groupBy { ... }`, `associate { ... }`, `associateBy { ... }`, and `associateWith { ... }` are recognized as Maps before lambda lowering. This prevents a String-key lookup such as `groups["premium"]?.sum() ?: 0` from silently taking the zero fallback through JavaScript property access.

Automated behavioral harness verified: `npm run test:collection-runner`: 31 behavioral cases, 5 rejection cases, and 20 lesson solutions passing. The grouped-report regression is also part of the World 10 exact-output audit.

## Write & Run / Debug scenario independence: zero duplicates (100% compliant)

Per `LESSON_QUALITY_STANDARD.md` section 2, a Debug stage's `fixedCode` must never duplicate the lesson's Write & Run `solutionCode`. Across all 10 lessons in World 10, every Debug challenge features an independent scenario, distinct variable names, and fresh problem contexts:

| Lesson | Write & Run scenario | Debug scenario | Bug mechanism diagnosed |
| --- | --- | --- | --- |
| `map-mapnotnull-filter` | Product price discount (`prices.filter { it > 30 }.map { it - 5 }`) | Temperature sensor calibration (`readings.filter { it >= 20 }.map { it * 2 }`) | Arithmetic operator bug (addition `it + 5` instead of multiplication `it * 2`) |
| `filternot-filterisinstance-flatmap` | Active department roster (`departments.flatMap { it }.filterNot { it == "Research" }`) | Build release tag sanitization (`tags.flatMap { it }.filterNot { it == "deprecated" }`) | Inverted filter target (excluding `"core"` instead of `"deprecated"`) |
| `flatten-reduce-fold` | Warehouse shift hours tally (`weeklyShifts.flatten().fold(10) { acc, h -> acc + h }`) | Loyalty tier point balance (`dailyPoints.fold(100) { acc, pts -> acc + pts }`) | Missing initial balance seed (`fold(0)` instead of `fold(100)`) |
| `groupby-associate-partition` | Exam scores partition (`scores.partition { it >= 60 }`) | HTTP health check partition (`statuses.partition { it < 400 }`) | Inverted threshold condition (`it >= 400` placed errors into success) |
| `zip-chunked-windowed` | API request ID batches (`requests.chunked(3)`) | Sensor reading batching (`readings.chunked(2)`) | Incorrect chunk size (`chunked(3)` instead of `chunked(2)`) |
| `distinct-sorted` | Clean category tags (`tags.distinct().sorted()`) | Priority queue ordering (`levels.distinct().sorted()`) | Inverted sort direction (`sortedDescending()` instead of `sorted()`) |
| `sortedby-min-max` | Sort cities by length (`cities.sortedBy { it.length }`) | Weather station coldest reading (`readings.minOrNull()`) | Extrema direction bug (`maxOrNull()` called instead of `minOrNull()`) |
| `sum-average-any-all-none` | Step goal validation & sum (`steps.all { it >= 5000 }`, `steps.sum()`) | Honor roll grade qualification (`grades.all { it >= 70 }`) | Weak quantifier bug (`any` used instead of universal `all`) |
| `first-find-collection-pipelines-and-chai` | Long username lookup (`accounts.filter { it.length > 8 }.map { it.uppercase() }.first()`) | Coupon discount threshold (`prices.map { it - 30 }.filter { it > 10 }.first()`) | Pipeline phase ordering (filtered before applying coupon discount) |
| `boss` | Premium order revenue tally (`orders.filter { it >= 100 }.map { it - 20 }.sum()`) | Excess latency monitor (`pingSamples.filter { it >= 100 }.map { it - 100 }.sorted()`) | Missing terminal sort in pipeline (`sorted()` omitted from chain) |

## Write & Run / Debug task-scope audit

All tasks conform to single-concept, single-fault pedagogical boundaries:
- Write & Run tasks require implementing the core collection transformations taught in the Learn section.
- Unfinished starters contain commented step instructions and do NOT pass the expected output check.
- Debug tasks contain exactly one logic defect with 3 progressive hints and an explicit explanation.
- No task introduces unsupported language constructs or external dependencies.

## Predict question quality

All 49 Predict questions adhere to structural quality checks:
- 4 multiple-choice options per question (`A`, `B`, `C`, `D`) with exactly one correct option.
- Distractors reflect realistic learner misconceptions (e.g. unflattened nested lists, inverted partition halves, lexicographical vs numeric sorting, vacuous truth on empty collections, pipeline evaluation order).
- Detailed explanations reference the exact execution flow and Kotlin language rules.

The audit does not yet prove that each distractor is pedagogically effective or that a learner cannot hardcode a required answer; those are acceptance tasks below.

## Verification commands

- `npm run audit:world10-quality`: Automated structural, content, and execution audit across all 10 lessons.
- `npm run test:collection-runner`: Kotlin simulator collection behavioral tests and rejection cases.
- `npm run lint`: TypeScript type-checking across the codebase.
- `npm run build`: Vite production bundle compilation.

## Remaining audit work

1. Browser visual QA: verify code wrapping, stage navigation, feedback, and mobile layout for the added activities.
2. Hardcode resistance and required-construct assessment: vary inputs and confirm Write & Run assessment requires the taught collection operations rather than only the displayed output.
3. Optional real-Kotlin comparison: `npm run test:world10-kotlin` compares exported runnable reference cases when local compiler JARs are supplied through `KOTLIN_COMPILER_CLASSPATH`.

Status remains **Audit in progress**, not Verified. Successful simulator execution is evidence only for the documented eager-list teaching scope, not for arbitrary Kotlin programs.
