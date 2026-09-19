# World 12 pre-authoring audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Not audited** — data gathering and capacity mapping started; no World 12 lesson content is authored.

## Scope sources

- Curriculum scope: [CODEDO_MASTER_PLAN.md](CODEDO_MASTER_PLAN.md), World 12 — Generic Realm.
- Catalog slots: `src/data/curriculum/masterCurriculumCatalog.ts` (`world-12`).
- Editor capacity: `CodeDo_Editor_capacity_per_lesson_status.xlsx`, rows 146–160.
- Reusable source material: `src/data/curriculum/world7_generics.ts`, a legacy question bank. It is input material only; its old world number and lesson structure do not count as World 12 progress.

## Coverage and capability map

| Catalog lesson | In-scope common behavior | Legacy source material | Editor capacity / authoring decision |
| --- | --- | --- | --- |
| Generic classes | Type parameter declaration, construction with inferred/explicit types, member use, multiple parameters | `generics-basics` | Runnable for erased declaration and constructor syntax, including multiple type parameters. Exact runner fixture required. |
| Generic functions | Inference, explicit type arguments where useful, generic return values | `generics-basics` | Runnable. Do not claim runtime type preservation. |
| Type parameters | Declaration versus inferred argument, scope of `T`, erasure | `generics-basics` | Conceptual/compiler-reference evidence; runtime cannot observe the type distinction. |
| Generic constraints | Upper bounds, allowed member access, nullable/default bounds | `type-constraints` | Compiler-reference evidence. Gate runner execution rather than accepting a parser/runtime failure. |
| Multiple constraints | `where` clauses and independently required capabilities | `type-constraints` | Compiler-reference evidence. |
| `in` variance | Consumer position, safe accepted values, prohibited production | `variance-in-out` | Compiler-reference evidence. |
| `out` variance | Producer position, safe reads, prohibited consumption | `variance-in-out` | Compiler-reference evidence. |
| Invariance | Why `Box<Child>` is not `Box<Parent>`, mutation safety | `variance-in-out` | Compiler-reference evidence. |
| Declaration-site variance | `class Source<out T>` / `Sink<in T>` API design | `variance-in-out` | Compiler-reference evidence. |
| Use-site variance | `Array<out T>` projections and call-site restriction | `variance-in-out` | Compiler-reference evidence. |
| Star projections | Safe reads, prohibited typed writes, relation to raw types | `star-projection` | Compiler-reference evidence. |
| Reified type parameters | `inline reified`, `is T`, class-literal access, erased non-reified contrast | `reified-types` | Partial/simulated. First define and test a narrow supported subset; generic/nullable filters remain gated. |
| Type aliases | Alias substitution, readability, no new runtime type | No direct legacy lesson | Runnable. Verify alias substitution and retain compiler-reference explanation of type identity. |
| Type-safe generic APIs | Generic contracts, constrained API boundaries, multi-type callers | `generics-basics`, `type-constraints` | Runnable for erased generic-class syntax. Assessment must vary input types so a hardcoded result cannot pass. |
| Generic Data Toolkit Boss | Reusable generic component with explicit safety policy and multiple concrete clients | `generics-boss` | Runnable for the verified generic-class/API subset. Do not depend on variance or constraints unless their capability gate is resolved. |

## Legacy-bank inventory

The legacy bank provides 31 questions across six old lesson groups: generic basics, constraints, variance, star projections, reification, and a boss. Reuse Kotlin facts and misconception patterns only after reviewing every candidate against the catalog lesson above, current runner behavior, and the quality standard. It does not cover the current type-alias or type-safe-API lessons directly.

## Initial findings

**W12-01 — High: generic-class erasure was missing, fixed for the tested subset.** The runner now erases generic parameters from class declarations and explicit constructor calls. A six-case fixture verifies generic classes (including multiple type parameters), generic functions, type aliases, generic APIs, and the Boss shape. This is runtime erasure only, not generic type checking.

**W12-02 — Most of the world is compile-time semantics.** Constraints, variance, projections, and star projections cannot be proven by successful JavaScript execution. Teach accurate Kotlin semantics with code reasoning and real-Kotlin compiler evidence; do not use runner parser failures as learner-facing diagnostics.

**W12-03 — High: reified simulation is not currently available for authored syntax.** `inline fun <reified T> ... value is T` fails with `Unexpected identifier 'is'`. Define and implement a narrow tested subset before selecting reified activities; retain generic, nullable, and numeric distinctions as explicit limits.

## Next data-gathering steps

1. Define and implement the narrow reified subset before adding reified activities.
2. Locate local Kotlin compiler JARs or document their absence before accepting compiler-error claims for constraints, variance, projections, and star projections.
3. Read and map individual legacy questions into distinct current-lesson coverage candidates; reject duplicates and unsupported shapes.
4. Author lessons only after this map names prerequisites, common variations, boundaries, deferrals, and activity-level capacity gates.
