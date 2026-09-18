# World 11 content review

Benchmark: World 8, lesson 12 (Interfaces), reviewed across Learn, Explore,
Predict, Write & Run, Debug, and Mastered on 2026-09-18.

## Current authoring requirement

The [coverage-first rule](CODEDO_MASTER_PLAN.md#required-authoring-rule--analyze-coverage-before-choosing-counts)
now requires a concept-by-concept coverage map before selecting example and
prediction counts, followed by corresponding supported Write & Run and Debug
coverage. No fixed count or numeric minimum applies. The counts and checks below
describe the existing rewrite; they do not certify that this new coverage
analysis has been completed. World 11 still needs that analysis before claiming
coverage of every commonly used concept under the new rule.

## Quality standard

- **Learn:** a complete Kotlin example, an explanation of its output, three
  topic-specific ideas, and a practical takeaway.
- **Explore:** enough distinct patterns to cover the lesson's commonly used
  concepts, progressing from direct use
  to composition, state, dispatch, or an important boundary. Each includes
  concrete output and explains why it occurs.
- **Predict:** different code from the corresponding example, plausible
  distractors, one correct answer, varied answer positions, and reasoning
  tied to the code. Compiler-error questions explicitly ask about compilation.
- **Write & Run:** concrete requirements, numbered starter guidance, exact
  expected output, and a verified solution where editor capability allows.
- **Debug:** an observable logic error, three increasingly specific hints,
  and an explanation of the root cause and repair.
- **Mastered:** topic-specific evidence reflecting only available activities.

All 14 lessons now follow this standard: 43 Explore cards and 43 distinct
code-based Predict questions. Visibility has a fourth pattern to cover the
module boundary as well as private state, private setters, and protected access.
Catalog descriptions and question counts now match the authored lessons.

## Editor boundary

Data classes/enums, object declarations, and the boss retain Write & Run and
Debug. The other 11 lessons teach real Kotlin through Learn, Explore, and
Predict; they do not claim the learning runner enforces unsupported semantics.
Data-class `copy()` and generated value equality are also read/predict topics;
the editor exercises use verified construction, field access, display, and enums.
See [editor capacity](CODEDO_EDITOR_CAPACITY.md).

## Verification

- `npm run test:world11-content`: checks registration, catalog counts,
  content diversity, answers, capability gating, and 12 runner executions.
  All three writing solutions and debug fixes pass. All three unfinished
  starters and broken programs fail to produce the required output.
- Real Kotlin/JVM 2.1.10: 99 Learn, Explore, valid Predict, and solution snippets
  compiled and printed their exact expected output. All seven intentional
  compiler-error questions were rejected for the stated reason.
- `npm run lint` and `npm run build` check integration.

Semantic references reviewed: [interfaces](https://kotlinlang.org/docs/interfaces.html),
[sealed types](https://kotlinlang.org/docs/sealed-classes.html),
[data classes](https://kotlinlang.org/docs/data-classes.html),
[nested/inner classes](https://kotlinlang.org/docs/nested-classes.html),
[objects/companions](https://kotlinlang.org/docs/object-declarations.html),
[extensions](https://kotlinlang.org/docs/extensions.html),
[delegation](https://kotlinlang.org/docs/delegation.html),
[delegated properties](https://kotlinlang.org/docs/delegated-properties.html), and
[visibility](https://kotlinlang.org/docs/visibility-modifiers.html).
