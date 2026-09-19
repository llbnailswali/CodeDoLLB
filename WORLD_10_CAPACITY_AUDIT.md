# World 10 collection capacity audit

The editor supports the verified eager-list teaching scope below. This is an engine audit, not certification that every lesson has sufficient content. World 10 still uses repeated Explore/Predict templates; those need separate coverage-driven authoring. Do not infer complete lesson coverage from a runnable workbook status.

Quality authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).

## Coverage analysis for lesson authoring

The following is an initial topic inventory for the coverage map required by the quality standard; it does not establish final activity counts or certify stage coverage.

| Lesson | Concepts examples and predictions must cover | Writing and debugging targets |
| --- | --- | --- |
| map / mapNotNull / filter | Transformation versus selection; null removal; preserved order; empty input; pipeline order | Transform selected values; repair wrong predicate and retained nulls |
| filterNot / filterIsInstance / flatMap | Negated selection; mixed-type filtering; flattening each transformed iterable; empty nested collections | Filter mixed data; repair accidental nesting and inverted conditions |
| flatten / reduce / fold | One-level flattening; first-element versus explicit seed; noncommutative accumulators; empty input | Aggregate nested data; repair incorrect seed and empty reduction |
| groupBy / associate / partition | Many values per key; duplicate-key overwrite; Pair construction/access/destructuring; single predicate evaluation | Build grouped reports; repair wrong keys, overwritten values, and reversed partition predicate |
| zip / chunked / windowed | Shortest zip; Pair and transform overloads; final short chunk; overlap; step; partial windows; positive sizes | Batch and rolling calculations; repair stride, partial-window settings and invalid sizes |
| distinct / sorted | First-occurrence retention; ascending order; source preservation; nested-list equality | Deduplicate and sort; repair operation ordering and mutation assumptions |
| sortedBy / min / max | Derived keys; stable ties; strings and numbers; nullable versus throwing empty extrema | Sort records and find extrema; repair wrong selector and empty handling |
| sum / average / any / all / none | Numeric aggregates; empty sum/NaN; predicate versus no-predicate forms; empty all=true; short-circuit reasoning | Summarize and validate data; repair all/any confusion and wrong divisor |
| first / find / pipelines | First match; predicate lookup; missing-result exception versus null; derived-list methods; intermediate types | Select a result from a pipeline; repair stage order and missing-match handling |
| Boss | Selection, transformation, grouping/aggregation, result lookup and empty-input policy | Integrate a meaningful report and diagnose multiple interacting rules |

## Implementation and verification

- Runner-owned lists retain collection methods after transformations without installing collection operations on native Array.prototype.
- Partition returns a Pair and evaluates each input once. The existing lesson now uses `.first`, which is valid Kotlin, instead of `[0]`.
- Pair construction using `to`, pair printing, destructuring, zip transforms, chunk transforms, stepped/partial windows and named window arguments are supported.
- Empty reduction/first/extrema and invalid size/step produce errors; nullable lookups return null. Extrema compare strings as well as numbers.
- Shared fixtures: `scripts/collection-runner-cases.ts`; editor checks: `npm run test:collection-runner`; optional local Kotlin reference comparison: `npm run test:collection-kotlin` with `KOTLIN_COMPILER_CLASSPATH`.

## Remaining limits

- `filterIsInstance` supports String, Boolean, Number and declared classes. Int/Long/Float/Double distinctions are not represented by the JavaScript runtime and are explicitly rejected. String filtering in programs containing Char literals is also rejected rather than silently conflating Char and String. Generic, nullable and reified filters remain unsupported.
- Distinct/contains use value equality for primitives, runner lists and pairs. Custom equals/hashCode and data-class structural equality are not modeled here. Map keys still use JavaScript Map identity semantics.
- This audit covers eager lists, not Sequence, all Set/Map extension overloads, custom comparators, complete Kotlin type checking or numeric overflow. Array factories retain their previous basic helper implementation.
- Standard-library inline return rules and arbitrary expression/map-alias indexing remain limited by the existing teaching transpiler. Only tested syntax should be claimed as verified.
- JavaScript number formatting still omits `.0` for integral floating-point values; average arithmetic works, but exact Kotlin Double formatting is not certified.

Semantics were checked against the official Kotlin [transformations](https://kotlinlang.org/docs/collection-transformations.html), [filtering](https://kotlinlang.org/docs/collection-filtering.html), [aggregation](https://kotlinlang.org/docs/collection-aggregate.html), and [collection parts](https://kotlinlang.org/docs/collection-parts.html) documentation, plus the local Kotlin compiler.
