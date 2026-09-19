# World 10 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Audit completed** -- full curriculum implemented, all 10 lessons audited with zero open diagnostic defects, zero example execution gaps, and zero scenario duplication.

## Scope and evidence

Reviewed all 10 catalog-linked lessons in Collection Wizardry against [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md) Section 1:
- *Quality principle*: Activity counts are derived strictly from a concept-by-concept coverage map based on lesson complexity, rejecting rigid fixed quotas.
- For lessons covering broader sub-concept ground:
  - `world-10-map-mapnotnull-filter`: Calibrated to 4 Explore cards and 4 Predict questions to independently cover (1) filter-then-map pipelines, (2) `mapNotNull` null-discarding transformations, (3) `filterNotNull` for pre-existing nullable lists, and (4) collection immutability preservation.
  - `world-10-zip-chunked-windowed`: Calibrated to 4 Explore cards and 4 Predict questions to independently cover (1) standard `zip` pairing, (2) `zip` with inline transformation lambdas, (3) `chunked` batching with remainder handling, and (4) `windowed` sliding frames.
- Focused 3-concept topics (`flatten-reduce-fold`, `groupby-associate-partition`, `distinct-sorted`, etc.) maintain 3 focused examples and checks without artificial filler or duplication.

1. `world-10-map-mapnotnull-filter` (map & mapNotNull & filter) -- 4 Explore, 4 Predict
2. `world-10-filternot-filterisinstance-flatmap` (filterNot & filterIsInstance & flatMap) -- 3 Explore, 3 Predict
3. `world-10-flatten-reduce-fold` (flatten & reduce & fold) -- 3 Explore, 3 Predict
4. `world-10-groupby-associate-partition` (groupBy & associate & partition) -- 3 Explore, 3 Predict
5. `world-10-zip-chunked-windowed` (zip & chunked & windowed) -- 4 Explore, 4 Predict
6. `world-10-distinct-sorted` (distinct & sorted) -- 3 Explore, 3 Predict
7. `world-10-sortedby-min-max` (sortedBy & min / max) -- 3 Explore, 3 Predict
8. `world-10-sum-average-any-all-none` (sum / average & any / all / none) -- 3 Explore, 3 Predict
9. `world-10-first-find-collection-pipelines-and-chai` (first / find & Collection pipelines and chaining) -- 3 Explore, 3 Predict
10. `world-10-boss` (Boss: Data Transformation Engine) -- 3 Explore, 3 Predict

Source: `src/data/curriculum/world10LessonsData.ts`.

**Curriculum Structure**:
- All 10 lessons are full 5-stage Runnable lessons containing interactive Learn, Explore, Predict, Write & Run (1 challenge each), Debug (1 challenge each), and Mastered stages.
- Supported operations run directly on `KotlinList` eagerly inside `src/utils/kotlinCollections.ts` without relying on browser Array prototypes or external runtimes.
- Rejection cases documented in `WORLD_10_CAPACITY_AUDIT.md` (e.g. non-positive step sizes, empty list `first()` / `reduce()`, unsupported reified types) are fully respected across all lesson snippets.

`npm run audit:world10-quality` checks catalog registration, stage configuration, question counts, executes all 32 Explore code examples, and verifies all 10 Write & Run (starter failure, solution success) and 10 Debug (broken code failure, repaired code success) pairs through `compileAndRunKotlin`.

**Audit execution results:**
- 10 catalog lessons verified
- 32 Explore examples executed and passed
- 32 Predict questions executed and verified with exact matching outputs and detailed explanations
- 20 Write & Run / Debug execution pairs tested and passed
- 0 open diagnostic defects or unclosed syntax gaps

## Collection engine capacity & simulator alignment

As analyzed in `WORLD_10_CAPACITY_AUDIT.md`:
1. **Eager List Runtime**: All functional methods (`filter`, `map`, `fold`, `partition`, etc.) return new `KotlinList` instances. Immutability guarantees hold across all stages.
2. **Reified Type Filtering**: `filterIsInstance<T>()` in the simulator handles standard types (`String`, `Number`, `Boolean`, and user-declared class names). Lessons use supported types without complex generic projections.
3. **Empty Collection Semantics**: `reduce` and `first` throw `NoSuchElementException` on empty collections, while `fold`, `minOrNull`, `maxOrNull`, and `find` handle empty collections safely without throwing. These semantics are taught and tested in the curriculum.
4. **Batching & Sliding Windows**: `chunked` and `windowed` correctly produce nested lists and validate positive chunk/window sizes.

Automated behavioral harness verified:
`npm run test:collection-runner`: 31 behavioral cases, 5 rejection cases, 20 lesson solutions passing.

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

All 30 Predict questions adhere to quality standards:
- 4 multiple-choice options per question (`A`, `B`, `C`, `D`) with exactly one correct option.
- Distractors reflect realistic learner misconceptions (e.g. unflattened nested lists, inverted partition halves, lexicographical vs numeric sorting, vacuous truth on empty collections, pipeline evaluation order).
- Detailed explanations reference the exact execution flow and Kotlin language rules.

## Verification commands

- `npm run audit:world10-quality`: Automated structural, content, and execution audit across all 10 lessons.
- `npm run test:collection-runner`: Kotlin simulator collection behavioral tests and rejection cases.
- `npm run lint`: TypeScript type-checking across the codebase.
- `npm run build`: Vite production bundle compilation.
