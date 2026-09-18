# CodeDo Editor Capacity per Lesson

This Markdown file is the editable source of truth for deciding whether a
Kotlin lesson may use Write & Run / Debug in CodeDo.

The original `CodeDo_Editor_capacity_per_lesson.xlsx` remains an untouched
backup. Update this file whenever editor or runner capability changes.

## 1. Status legend

| Status | Meaning | Lesson treatment now |
| :--- | :--- | :--- |
| Built (verified) | The engine already runs the feature and its lesson code has been executed. | Full five-stage lesson, including Write & Run and Debug. |
| Runnable | The feature maps directly to JavaScript with high fidelity. | Add normal runnable practice after verification. |
| Partial / simulated | A useful approximation is possible, but it differs from real Kotlin/JVM behavior. | Add capability only with explicit simplified framing and execution tests. |
| Conceptual only | The behavior requires a Kotlin compiler, JVM, threads, external tooling, or another unavailable system. | Learn, Explore, and Predict only. Never fake a runnable task. |

## 2. Decision column

Use this value for every lesson’s **Runnable after capability added?** field.

| Decision | Meaning |
| :--- | :--- |
| Yes — add runner capability | A focused engine feature can make the exercise truthful and executable. |
| Yes — requires Kotlin compiler/checker | It can be graded only after integrating real Kotlin compiler diagnostics or execution. |
| No — outside editor scope | It depends on JVM/tooling/infrastructure behavior that CodeDo should not imitate. |
| Already runnable | The present engine supports it; execute all lesson snippets before shipping. |

## 3. World 11 — OOP Evolution

| No. | Lesson | Current editor status | Current limitation | Runnable after capability added? | Required capability / decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Inheritance & Abstract classes | Partial / simulated | Single inheritance works; abstract-member enforcement is compiler-only. | Yes — requires Kotlin compiler/checker | Keep abstract-class practice conceptual until compiler diagnostics exist. |
| 2 | Interfaces & Multiple interface implementation | Partial / simulated | One interface works; multiple interfaces do not parse. | Yes — add runner capability | Parse multiple supertypes and preserve each implemented contract. |
| 3 | Sealed classes & Sealed interfaces | Partial / simulated | A closed hierarchy can be shown, but exhaustiveness is not checked. | Yes — requires Kotlin compiler/checker | Add real compiler checking for exhaustive `when` behavior. |
| 4 | Data classes in domain modeling & Enum classes | Built (verified) | Simple data classes and enums already run. | Already runnable | Use full runnable tasks and execute every snippet. |
| 5 | Nested classes | Partial / simulated | The class-body parser cannot safely parse a class inside another class. | Yes — add runner capability | Add depth-aware nested-class parsing. |
| 6 | Inner classes | Partial / simulated | Requires a captured outer-instance reference. | Yes — add runner capability | Model `inner` receiver/outer-instance access. |
| 7 | Object declarations | Built (verified) | Plain singleton objects already run. | Already runnable | Use full runnable tasks and execute every snippet. |
| 8 | Companion objects | Partial / simulated | `companion object` syntax is not transpiled. | Yes — add runner capability | Extend object/class transpilation for class-level singleton members. |
| 9 | Extension functions | Partial / simulated | Receiver-style dispatch is not transpiled. | Yes — add runner capability | Add targeted extension dispatch; avoid global prototype mutation. |
| 10 | Extension properties | Partial / simulated | Needs extension dispatch plus getter-only semantics. | Yes — add runner capability | Add extension-property getter transform. |
| 11 | Delegation | Partial / simulated | `by delegate` forwarding is not transpiled. | Yes — add runner capability | Generate forwarding calls for a limited delegation subset. |
| 12 | Delegated properties | Partial / simulated | `by lazy` is feasible; custom delegate protocol is not built. | Yes — add runner capability | Start with `lazy` getter semantics only. |
| 13 | Visibility and API design | Conceptual only | The JS runner cannot enforce Kotlin visibility boundaries. | Yes — requires Kotlin compiler/checker | Keep current lesson conceptual until diagnostics are integrated. |
| 14 | Domain Model Engine | Partial / simulated | Depends on selected advanced OOP capabilities. | Yes — add runner capability | Keep boss runnable only with the already verified data-class/enum/object subset. |

## 4. Authoring rule

1. Check this table before writing a lesson.

2. Use Write & Run / Debug only when its decision is **Already runnable** or
   the listed capability has been built and execution-tested.

3. For every other lesson, still provide real Kotlin examples in Learn,
   progressive examples in Explore, and code-based Predict questions.

4. After a capability changes, update the affected row’s status, limitation,
   decision, and the lesson data together.
