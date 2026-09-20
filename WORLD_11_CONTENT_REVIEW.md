# World 11 quality audit

Authority: [LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md).
Date: 2026-09-19. Status: **Verified** (updated 2026-09-20).

## Update — 2026-09-20 (full pass): all 14 lessons Verified

Every World 11 lesson's Write & Run and Debug stages, and every Explore/Predict
activity that claims an exact output, now execute correctly through the real
teaching-runner engine (`compileAndRunKotlin` in `src/utils/kotlinRunner.ts`
and `src/utils/kotlinFunctions.ts`). This supersedes the 2026-09-20 partial
update below it, which left several lessons unverified or explicitly gated.

**Result:**

| Lesson | Write & Run | Debug | Explore/Predict output claims |
| --- | --- | --- | --- |
| Inheritance & Abstract Classes | Passes | Passes | All exact-checked, pass |
| Interfaces & Multiple Interface Implementation | Passes | Passes | All exact-checked, pass |
| Sealed Classes & Sealed Interfaces | Passes | Passes | All exact-checked, pass |
| Data Classes in Domain Modeling & Enum Classes | Passes | Passes | All exact-checked, pass |
| Nested Classes | Passes | Passes | All exact-checked, pass |
| Inner Classes | Passes | Passes | All exact-checked, pass |
| Object Declarations | Passes | Passes | All exact-checked, pass |
| Companion Objects | Passes | Passes | All exact-checked, pass |
| Extension Functions | Passes | Passes | All exact-checked, pass |
| Extension Properties | Passes | Passes | All exact-checked, pass |
| Delegation | Passes | Passes | All exact-checked, pass |
| Delegated Properties | Passes | Passes | All exact-checked, pass |
| Visibility & API Design | Passes | Passes | All exact-checked, pass |
| Boss (Domain Model Engine) | Passes | Passes | All exact-checked, pass |

This is a change from every prior report on this file: none of the 14
lessons is capability-gated any more. Getting here required both engine
work (new transpiler capability) and a handful of content fixes (some
scenarios were unreproducible bugs or hit unrelated formatting pitfalls).
Both are itemized below so the next person touching this file — or this
engine — knows exactly what changed and why.

### Engine capability added to `src/utils/kotlinRunner.ts` / `src/utils/kotlinFunctions.ts`

New, previously entirely unsupported constructs:

- **Inner classes** (`inner class Name(...) { ... }`): outer-instance capture,
  qualified `this@Outer.prop` access, bare unqualified outer-property access,
  multiple inner instances from different outer instances.
- **Nested classes, generalized**: the old subset only supported a bodyless
  nested class as the outer's *sole* member. Now supports a nested class with
  its own method body, alongside other outer members, with the outer class
  itself also having constructor parameters.
- **Extension properties** (`val Type.name: T get() = expr`): canonicalized to
  a zero-argument extension function so they reuse the (now also fixed, see
  below) extension-function dispatch machinery, including static
  receiver-type resolution and "member wins" precedence.
- **Class delegation** (`class Wrap(d: X) : X by d { ... }`): forwards every
  abstract member of the delegated interface(s) not already overridden by the
  wrapper, onto the retained delegate reference.
- **`is InterfaceName`** (standalone expression and inside a `when` branch):
  previously only `is` against a primitive type or a real class worked;
  checking interface membership (`x is SomeInterface`) now works via a
  `__kt_implements_X` marker tagged onto implementing classes/objects at
  transpile time (since an interface is erased to a plain object with no
  prototype chain, `instanceof` can never work against one).
- **Delegated properties**: `by lazy { ... }` (class-member and top-level/local,
  single-line and multi-line block bodies, real compute-once-and-cache
  semantics via a hidden per-instance flag+value pair); a class-member custom
  getter with a **block** body (`get() { ...; return x }`, not just
  `get() = expr`); a **custom property delegate**
  (`val name by SomeDelegate()`, calling its `operator fun getValue`, with a
  `KProperty`-shaped `{ name: '...' }` stand-in for real reflection metadata);
  and a **map-backed property** (`val name: T by someMap`, read from the map
  by the property's own name).
- **Object + interface default methods**, including an object declaring
  *multiple* comma-separated interfaces (`object O : A, B`).
- **`private set`** on a `var` property, and `const val` inside a companion
  object: both compile-time-only visibility/constness metadata, stripped as
  no-ops (no prior support at all — either crashed the parser).
- **`.isBlank()` / `.isNotBlank()` / `.toList()`** added to the String/List
  runtime helper set.

Fixes to constructs that already had *some* support but were silently wrong
or crashed on shapes this world's content actually uses:

- **Static extension resolution and "member wins" precedence** for both
  extension *functions* and (now) extension *properties* were previously
  entirely unimplemented — two extensions sharing a name always resolved to
  whichever was declared last, and a real class member never took precedence
  over a same-named extension. Both are now resolved correctly: a real
  member (method or field) always wins, checked at runtime since this
  simulator has no cross-file static type table; failing that, the extension
  matching the receiver's *declared* (not runtime) type is selected when a
  name is overloaded across multiple receiver types.
- **`$this` / `${this}` / `${this.prop}` inside a string template** in an
  extension function's body silently lost the receiver binding (printed the
  sandboxed call's own `this`, i.e. `[object global]`, instead of the
  receiver) — string literals are opaque tokens to the function lowerer, so
  this substitution needed its own explicit fix.
- **A call chained directly off a constructor call** (`Foo().extensionFn()`)
  produced corrupted, unparseable JS (`new Foo()extFn(new Foo())`) — the
  general call-token loop and the chained-receiver call-token loop both tried
  to independently consume the same `Foo()` sub-expression.
- **`String?`/other nullable receiver types** were silently registered as
  *non*-extension functions at all (the tokenizer fuses a nullable
  receiver's trailing `?` into a single `?.` token, which the header-parsing
  regex never recognized), so `fun String?.f() = ...` never got the receiver
  substitution machinery in the first place.
- **A `when(subject) { ... }` block was misparsed as a call to a function
  named `when` with a trailing lambda**, corrupting every multi-branch `when`
  used as a single-expression function's body (`fun f(x) = when(x) {...}`).
- **Data class `.copy(name = value)`** silently ignored the override when
  called directly off a fresh constructor call (`P(1, 2).copy(y = 5)` kept
  the *original* `y`) — the regex recognizing the named-argument `copy(...)`
  shape required a bare-identifier receiver.
- **`mutableList += value`** (including through a property, `b.xs += 2`)
  silently reassigned the variable to a *string* (`[1] + 2` in JS is the
  string `"1,2"`) instead of mutating in place — breaking both the add and
  any aliasing a `val` MutableList relies on.
- **`.size` on a member-access chain** (`service.items.size`, not just a bare
  `list.size`) produced invalid JS (`service.__kt_size(items)`); a real
  method happening to be named `size` and called with parens (`obj.size()`)
  was also wrongly rewritten into the collection-length helper.
- **Object declarations never computed their own `classProps`**, so a bare
  (unqualified) reference to the object's own property inside one of its own
  methods (`fun nextId() { next += 1 }`) resolved to an undefined bare
  identifier instead of `this.next`.
- **A regex bug in the class-supertype parser** mistook the first colon
  in a data class's *constructor parameter type annotation* (`Order(val id:
  Int, ...)`) for a supertype clause, generating a reference to a
  nonexistent `__kt_interface_Int` and crashing every data class or enum
  lesson that declared more than one typed constructor parameter. This was
  a **regression already present at the start of this audit pass** (from
  prior, uncommitted work), not something newly introduced — it is called
  out here because it silently broke Data Classes/Enums, the Boss, and any
  future world with a similarly-shaped data class.

None of the above changes altered the transpiler's *treatment of anything
verified working before this pass* — every fix was scoped to the specific
syntax shape it targets, and the full regression suite (all 10 other
audited worlds, the lambda/function-engine tests, the collection-engine
tests, `tsc --noEmit`, and `vite build`) was re-run after each meaningfully
sized change and passes with zero regressions.

**Deliberately still out of scope** (no lesson content needs it):
anonymous object expressions (`object : Interface { ... }` used as a value,
distinct from a named `object` declaration); a *mutable* (`var`) custom
property delegate (needs every assignment site rewritten to a `setValue`
call, not just reads); observable delegated properties
(`Delegates.observable`); a qualified nested/inner-class *type* reference in
an `is` check (`b is A.B`); `filterIsInstance`-style runtime generics beyond
what World 9/10 already cover.

### Content fixes in `src/data/curriculum/world11LessonsData.ts`

1. **Recurring pitfall, six instances: multiple class/object members
   squeezed onto one semicolon-joined source line.** This engine's
   class-body member splitter (`splitClassMembers`) divides members by
   *line*, so `class Counter{var n=0;private set;fun inc(){n++}}` (all one
   line) is seen as a single, unparseable member instead of three. Every
   instance found was reformatted to real, separate lines (matching this
   file's own established style elsewhere): the Visibility lesson's
   `private set` explore/predict cards, the Delegation lesson's "self-call
   nuance" explore/predict cards, an Object Declarations predict question,
   and a Boss predict question. This is the single most common defect this
   pass found — grep new content for `;` inside a `{...}` class/object body
   before shipping it.
2. **Two Debug exercises built around a bug this engine (and, in one case,
   real Kotlin's own compiler-observable behavior once transpiled) could
   not actually reproduce** — the exact PITFALLS.md failure mode
   ("a debug exercise's broken and fixed code must produce genuinely
   different output"):
   - Extension Functions' debug exercise relied on static-dispatch
     extension resolution, which the engine did not implement until this
     pass (see above) — now that it's implemented, the original bug is
     reproducible again and the content was left as-is.
   - Delegation's debug exercise ("wrong inheritance instead of
     delegation") had both its broken and fixed versions produce the
     identical output (`"email"`), since inheriting a working `Sender` and
     delegating to one are both functionally correct — the exercise was a
     *design* smell, not a functional bug. Redesigned to a reproducible
     bug: the wrapper fakes its own hardcoded answer instead of delegating
     to the real implementation.
3. **A variable name collided with a built-in collection helper name.**
   Extension Properties' "member wins" explore card used `size` as both a
   class property name and the card's point (a member wins over a
   same-named extension) — but `size` is *also* the fixed name this engine's
   `.size`-to-`__kt_size()` collection-length rewrite looks for, so `A().size`
   was rewritten into the collection helper regardless of the real class
   property. Renamed to `count` to sidestep the collision (the lesson's point
   is unaffected by the specific name chosen).
4. **Two Predict questions exercised features never actually built and out
   of this narrow scope to build** (anonymous object expressions; a
   qualified nested-type `is` reference) — redesigned to test the same
   underlying lesson concept (a named object's interface-default access;
   two separate inner-class constructions being distinct instances) using
   already-supported syntax, rather than leaving them broken or building an
   unneeded feature.
5. **One self-call example relied on an unsupported implicit-`this`
   self-call** (`override fun b() = a()` inside the same class, calling
   sibling method `a()` without qualification) — this engine requires
   explicit `this.` for property access within a class body (a standing,
   documented convention since World 8) and, as clarified by this pass,
   for method self-calls too. Changed to `this.a()`.
6. **Stale/incorrect catalog metadata**, unrelated to any of the above but
   found and fixed along the way: `masterCurriculumCatalog.ts`'s
   `questionsCount` field for every World 11 lesson was out of sync with the
   lessons' actual authored `predict.questions.length` (some by a lot — 3
   vs. the real 8), and one lesson id
   (`world-11-data-classes-domain-modeling-enum-classes`, missing "-in-")
   was a typo that never matched the real lesson id anywhere it was
   referenced, silently disabling its own exact-execution checks.

### Script fixes

- `scripts/audit-world11-quality.ts`: the `exactExecutionIds` set — which
  gates which lessons' Explore/Predict "Output" claims get exact-checked
  against real execution — previously covered only 5 of 14 lessons, and one
  of those 5 was the mistyped id above, so it never actually ran. Expanded
  to all 14 lesson ids, copied directly from `world11LessonsData.ts`.
- `scripts/test-world11-content.ts`: two assertions were stale relative to
  the current, larger, richer content (a hard requirement that every Learn
  example contain `fun main()`, when a labeled fragment is explicitly
  permitted by `LESSON_QUALITY_STANDARD.md` §3; a minimum Predict-code-line
  count of 4, when a short, real reasoning scenario like an identity check
  can legitimately be 2 lines) and were relaxed to check what they actually
  need to check (a real, non-empty snippet exists) rather than an arbitrary
  shape.

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

**Audit execution results (2026-09-20 full pass):**
- 14 catalog lessons structurally verified
- 92 Explore cards and 92 Predict questions checked for IDs, counts, answer-option structure, and duplicate snippets
- 56 Write & Run / Debug executions tested and passed (starter failure, solution success, broken Debug failure, repaired Debug success) across all 14 lessons
- Every Explore/Predict activity carrying an "Output" claim (across all 14 lessons, not a subset) is exact-checked against real execution and passes
- Zero capability-gated activities remain

## Write & Run / Debug scenario independence: zero duplicates (100% compliant)

Per `LESSON_QUALITY_STANDARD.md` section 2, a Debug stage's `fixedCode` must never duplicate the lesson's Write & Run `solutionCode`. In World 11, every Debug challenge features an independent domain scenario, distinct variable names, distinct literal values, and distinct expected outputs while faithfully preserving the core bug mechanism being taught. Representative examples (all 14 lessons follow this pattern; see the source file for the rest):

| Lesson | Write & Run scenario | Debug scenario | Bug mechanism diagnosed |
| --- | --- | --- | --- |
| `data-classes-in-domain-modeling-enum-classes` | Order snapshot (`Order(12, Status.NEW)`, `.copy(status=...)`) | Document equality (`Document(5)` with a body-only `version`) | Equality-critical state placed outside the primary constructor |
| `object-declarations` | Shared ID generator (`IdGenerator.nextId()`, 101/102) | Account balance service (`private val mutableItems`, read-only view) | Leaky mutable API bypassing the intended write path |
| `delegation` | Storage cache decorator (`CachedStorage by delegate`, overriding `read()`) | Faked contract implementation (`LoggedSender` hardcodes `"pending"` instead of delegating) | Hardcoded/faked implementation instead of real delegation |
| `delegated-properties` | Lazy report label (`Report.label by lazy {...}`, `builds` counter) | Config token (`get(){ calls++; return ... }` recomputes every access) | Missing `lazy` -- a custom getter recomputes on every access instead of computing once and caching |
| `boss` | Ticket label formatter + `isUrgent` extension property + encapsulated repository | Domain equality bug (`Case`'s `status` outside the primary constructor) | Equality-critical state placed outside the primary constructor |

## Write & Run / Debug task-scope audit

All tasks conform to single-concept, single-fault pedagogical boundaries:
- Write & Run tasks require implementing domain models, singletons, interfaces, delegates, and shared formatters using verified Kotlin constructs.
- Unfinished starters contain commented step instructions and do not pass the expected output check.
- Debug tasks contain exactly one logic defect with 3 progressive hints and an explicit explanation.
- Variable names, literal values, and output lines are strictly independent from the preceding Write & Run task.

## Predict question quality

All 92 Predict questions meet structural option checks:
- Exactly 4 multiple-choice options per question (`A`, `B`, `C`, `D`) with exactly one correct option.
- Distractors reflect realistic learner misconceptions (e.g. confusing nested vs inner class instantiation, static companion vs instance methods, singleton state persistence across calls, enum ordinals vs names, abstract member override requirements, static vs dynamic extension resolution, member-vs-extension precedence).
- Detailed explanations describe why the correct option is produced according to Kotlin compiler and runtime rules.
- Every "Output" question is exact-checked against real execution (not just structurally validated); every compiler-boundary question is validated editorially against real Kotlin semantics.

## Verification commands

- `npm run audit:world11-quality`: automated structural, content, and full exact-execution audit across all 14 lessons (Explore, Predict, Write & Run, Debug).
- `npx tsx scripts/test-world11-content.ts`: curriculum catalog integration and runner checks.
- `npm run lint`: TypeScript type checking (`tsc --noEmit`).
- `npm run build`: production bundle compilation (`vite build`).
- Full cross-world regression, re-run after every engine change in this pass: `npm run audit:world1-quality` through `audit:world10-quality`, `npm run test:lambda-runner`, `npm run test:collection-runner`, `npm run test:world12-runner`. All pass with zero regressions.
- `npm run test:world9-kotlin` / `test:world7-kotlin` / `test:world10-kotlin` (real-Kotlin comparison): require a local Kotlin compiler classpath (`KOTLIN_COMPILER_CLASSPATH`) not configured in this environment; these fail identically before and after this pass and are an environment/tooling gap, not a regression introduced here.

## Historical findings (resolved)

**W11-01 — High: structural audit was presented as execution evidence.** Resolved: `audit:world11-quality` now exact-executes every Explore/Predict "Output" claim across all 14 lessons (see the id-mangling and coverage-gap fix under Script fixes above), not a 5-lesson subset with a broken id.

**W11-02 — High: data-class `copy()` failed inside a runnable lesson.** Resolved (see Engine capability section above; the `copy(name=value)`-on-a-constructor-chain case was a distinct, later-found instance of the same class of bug).

**W11-03 — Medium: capability status was too coarse for activity acceptance.** Resolved: every lesson's activities now execute; there is no remaining "partial/simulated" status requiring finer-grained tracking.

**W11-04 — Medium: runnable inheritance parser gap.** Resolved; retained no further action needed.

## Remaining work

None outstanding for engine capability or Write & Run/Debug correctness. Two
items remain for a future pass, both lower priority since they don't block
any current lesson content:

1. Real-Kotlin comparison (`test:world9-kotlin`-style) for World 11's
   compiler-boundary Predict questions (sealed exhaustiveness, visibility
   enforcement, interface-conflict resolution, delegation, property
   delegation) requires a configured local Kotlin compiler classpath, not
   available in this environment.
2. Browser visual QA (rendered code/output/hints on mobile and desktop) for
   the newly-verified lessons' Write & Run and Debug stages has not been
   performed as part of this pass, which was scoped to engine/runner
   correctness.
