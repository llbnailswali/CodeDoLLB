# World 11 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Changes required**.

## Scope and evidence

Reviewed all 14 catalog-linked lessons in OOP Evolution:
1. `world-11-inheritance-abstract-classes` (Inheritance & Abstract Classes)
2. `world-11-interfaces-multiple-interface-implementa` (Interfaces & Multiple Interface Implementation)
3. `world-11-sealed-classes-sealed-interfaces` (Sealed Classes & Sealed Interfaces)
4. `world-11-data-classes-in-domain-modeling-enum-cla` (Data Classes in Domain Modeling & Enum Classes)
5. `world-11-nested-classes` (Nested Classes)
6. `world-11-inner-classes` (Inner Classes)
7. `world-11-object-declarations` (Object Declarations)
8. `world-11-companion-objects` (Companion Objects)
9. `world-11-extension-functions` (Extension Functions)
10. `world-11-extension-properties` (Extension Properties)
11. `world-11-delegation` (Delegation)
12. `world-11-delegated-properties` (Delegated Properties)
13. `world-11-visibility-and-api-design` (Visibility & API Design)
14. `world-11-boss` (Boss: Scalable Domain Engine)

Source: `src/data/curriculum/world11LessonsData.ts`.

**Curriculum Structure & Editor Boundary Gating**:
- In accordance with `LESSON_QUALITY_STANDARD.md` section 4 (Correctness and editor capability), teaching content is aligned with real Kotlin language semantics while respecting teaching runner capacity.
- The editor now runs the verified inheritance subset, all data-class/enum activities including `copy()` and value equality, object declarations, and the current Boss examples.
- The 3 lessons with full 5-stage flows remain `data-classes-domain-modeling-enum-classes`, `object-declarations`, and `boss`. Inheritance has exact Learn/Explore/Predict execution evidence but no implementation stage because the existing capability gate has not yet been expanded.
- The other 11 lessons teach real Kotlin OOP constructs through Learn, Explore, and Predict stages. Those activities are not editor-execution verified unless stated in the capability map below.

`npm run audit:world11-quality` currently checks catalog registration, stage configuration, question counts, option structures, and the three existing Write & Run/Debug pairs. It does **not** execute or assert outputs for Learn, Explore, or Predict activities, so its passing result is structural evidence only.

**Audit execution results:**
- 14 catalog lessons structurally verified
- 44 Explore cards and 44 Predict questions checked for IDs, counts, answer-option structure, and duplicate snippets
- 12 Write & Run / Debug executions tested and passed (starter failure, solution success, broken Debug failure, repaired Debug success)
- 37 Learn, Explore, and Predict activities now have exact-output or compiler-rejection checks across inheritance, interfaces, data classes/enums, object declarations, and the Boss
- Remaining capability-gated activities still require explicit execution classification below

## Concept and capability map

The capability tracker is the source for the intended boundary. Counts are retained only where each existing scenario covers a distinct everyday variation; any added activity must extend this map rather than repeat names or literals.

| Lesson | Core coverage in current Learn / Explore / Predict | Editor result | Practice decision / limitation |
| --- | --- | --- | --- |
| Inheritance & abstract classes | shared base state, abstract contract, dynamic dispatch | All Learn/Explore/Predict activities execute; missing abstract implementations produce a compiler diagnostic | Tracker-promised subset is restored. Decide separately whether focused implementation practice adds assessment value. |
| Interfaces | multiple contracts, narrow parameters, default-conflict resolution | All Learn/Explore/Predict activities execute | Supports the lesson's abstract contracts, multiple interfaces, default methods, and qualified `super<Interface>` selection. |
| Sealed classes/interfaces | payload variants, shared state, exhaustive `when` | No activities execute | Teach compiler-exhaustiveness reasoning; gate execution until sealed declarations and checks are supported. |
| Data classes & enums | generated text/equality, enum fields, copy | All current activities execute with named `copy()` replacements and value equality | Existing Write/Debug pair remains valid and is exact-output checked. |
| Nested classes | static-like nesting, qualification, no outer capture | No activities execute | Class-body parser needs nested declaration support. |
| Inner classes | captured outer instance and member access | No activities execute | Requires outer-instance capture. |
| Object declarations | singleton state, shared methods, initialization | All current activities execute | Existing Write/Debug pair is valid; keep output checks. |
| Companion objects | class-level factory and state | No activities execute | Requires companion lowering/dispatch. |
| Extension functions | receiver access, chaining, nullable receiver | 2/3 Explore and Predict execute | Define a supported receiver-dispatch subset before enabling implementation assessment. |
| Extension properties | computed getter and receiver state | Learn/Explore fail; 1 Predict happens to execute | Requires extension getter lowering; do not treat accidental prediction execution as support. |
| Delegation | interface forwarding, selective override, delegate receiver | No activities execute | Requires forwarding generation. |
| Delegated properties | `lazy`, observable changes, map lookup | No activities execute | `lazy` is feasible; observable and map delegation need separate capability decisions. |
| Visibility & API design | private setter, protected, internal API boundaries | 2/4 Explore and 3/4 Predict execute | Visibility compilation diagnostics are not reliable in the teaching runner; retain conceptual compiler questions. |
| Boss | data record, enum, stateless formatter reuse | All current activities execute | Existing two-input Debug is a useful hardcode-resistance check; add assessment variation only after the data-class boundary is settled. |

This map leaves the world in **Changes required**, not “verified” or merely “in progress”: accepted practice cannot claim execution where the activity itself fails.

## Write & Run / Debug scenario independence: zero duplicates (100% compliant)

Per `LESSON_QUALITY_STANDARD.md` section 2, a Debug stage's `fixedCode` must never duplicate the lesson's Write & Run `solutionCode`. In World 11, every Debug challenge features an independent domain scenario, distinct variable names, distinct literal values, and distinct expected outputs while faithfully preserving the core bug mechanism being taught:

| Lesson | Write & Run scenario | Debug scenario | Bug mechanism diagnosed |
| --- | --- | --- | --- |
| `data-classes-domain-modeling-enum-classes` | Ticket issue registry (`Ticket(7, "Ana")`, `Ticket(8, "Bo")`, `Level.HIGH`) | Device inventory status (`Device(101, "Tablet")`, `Device(102, "Phone")`, `Status.ACTIVE`) | Duplicated record reference (`println(d1)` printed twice instead of `println(d2)`) |
| `object-declarations` | Website visit tracker (`VisitCounter.record()`, `total` 2 and 3) | Savings coin vault (`CoinVault.deposit()`, `balance` 10 and 15) | Singleton state reset bug (`this.balance = 5` instead of `this.balance = this.balance + 5`) |
| `boss` | Ticket label formatter (`Ticket(12, "Ana")`, `Ticket(13, "Bo")`, `TicketPrinter.label(ticket)`, `Level.HIGH`) | Conference badge printer (`Badge(41, "Kai")`, `Badge(42, "Lia")`, `BadgePrinter.format(badge)`, `Tier.VIP`) | Hard-coded field in shared service (`"B-" + badge.code + " Kai"` instead of `badge.attendee`) |

## Write & Run / Debug task-scope audit

All tasks conform to single-concept, single-fault pedagogical boundaries:
- Write & Run tasks require implementing domain models, singletons, and shared formatters using verified Kotlin constructs.
- Unfinished starters contain commented step instructions and do not pass the expected output check.
- Debug tasks contain exactly one logic defect with 3 progressive hints and an explicit explanation.
- Variable names, literal values, and output lines are strictly independent from the preceding Write & Run task.

## Findings

**W11-01 — High: structural audit was presented as execution evidence.** `audit:world11-quality` never ran Learn, Explore, or Predict snippets, while the report said all examples were validated and listed zero diagnostic defects. The measurement pass found widespread runtime failures in unsupported OOP forms. The report now distinguishes structural checks, executed practice, and unexecuted teaching content. The audit script still needs exact-outcome checks for every supported activity and explicit expected capability-gate classifications for the others.

**W11-02 — High: data-class `copy()` failed inside a runnable lesson, fixed.** The `copy()` Explore and Predict snippets previously failed with `original.copy is not a function`, and JavaScript identity would have made the data-class equality prediction incorrect. The runner now lowers named `copy()` replacements and uses generated data-class equality. All four Explore and four Predict activities execute with exact expected output.

**W11-03 — Medium: capability status is too coarse for activity acceptance.** The tracker marks several topics partial, but current snippets range from no execution through partial execution. Capability decisions must name the supported syntax and the affected activity IDs; “partial/simulated” alone is not evidence that a displayed snippet runs.

**W11-04 — Medium: runnable inheritance parser gap, fixed; implementation assessment remains a coverage decision.** Abstract member declarations previously leaked into JavaScript and invalid concrete subclasses failed at runtime. The runner now omits abstract declarations from emitted code and reports a compiler-style diagnostic when a concrete subclass omits a required member. All current inheritance Learn/Explore/Predict activities are exact-checked; a Write/Debug stage is not automatically required without a scoped assessment case.

## Predict question quality

All 44 Predict questions currently meet structural option checks:
- Exactly 4 multiple-choice options per question (`A`, `B`, `C`, `D`) with exactly one correct option.
- Distractors reflect realistic learner misconceptions (e.g. confusing nested vs inner class instantiation, static companion vs instance methods, singleton state persistence across calls, enum ordinals vs names, abstract member override requirements).
- Detailed explanations describe why the correct option is produced according to Kotlin compiler and runtime rules.

Correct option structure does not establish executable correctness. Compiler-error questions and all capability-gated snippets require real-Kotlin comparison or an explicit documented deferral.

## Verification commands

- `npm run audit:world11-quality`: Automated structural, content, capability, and execution audit across all 14 lessons.
- `npx tsx scripts/test-world11-content.ts`: Curriculum catalog integration and runner checks.
- `npm run lint`: TypeScript type checking and syntax validation.
- `npm run build`: Production bundle compilation.

## Remaining audit work

1. Add exact Learn/Explore/Predict outcome checks for each supported extension-function activity, then classify unsupported forms by syntax.
2. Implement or explicitly gate sealed hierarchies, nested/inner classes, companions, extension properties, delegation, delegated properties, and visibility diagnostics at the individual-activity level.
3. Compare compiler-result teaching examples with local Kotlin before accepting sealed-hierarchy, visibility, interface-conflict, delegation, and property-delegation claims.
4. Perform browser visual QA and hardcode-resistance review for the three existing Write/Debug pairs after their runtime boundaries are settled.
