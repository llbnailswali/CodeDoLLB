# World 11 content review

Quality authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
The earlier lesson-to-lesson benchmark is retired. This is a historical review
of the existing rewrite, not verification against the current standard.
World 11 still requires a concept-by-concept coverage audit.

The existing rewrite contains: 43 Explore cards and 43 distinct
code-based Predict questions. Visibility has a fourth pattern to cover the
module boundary as well as private state, private setters, and protected access.
Catalog descriptions and question counts now match the authored lessons.

## Editor boundary

Data classes/enums, object declarations, and the boss retain Write & Run and
Debug. The other 11 lessons teach real Kotlin through Learn, Explore, and
Predict; they do not claim the learning runner enforces unsupported semantics.
Data-class `copy()` and generated value equality are also read/predict topics;
the editor exercises use verified construction, field access, display, and enums.
See [editor capacity](CodeDo_Editor_capacity_per_lesson_status.xlsx).

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
