# World 16 Lesson 1 — Coroutine Editor Capability

## Result

The browser editor now supports the exact coroutine subset used by World 16
Lesson 1: the wildcard coroutine import, `suspend fun`, `runBlocking`,
`launch`, `Job.join()`, `Job.isCompleted`, `delay(Int)`, `async`, and
`Deferred.await()`.

The implementation uses a deterministic single-threaded queue. A builder
registers a pending child in the current `runBlocking` scope. `join()` or
`await()` executes that child, and `runBlocking` drains children not explicitly
waited for before returning. `delay()` validates its non-negative integer
argument but performs no timing. This is intentionally not real concurrency.

## Verification summary

All 19 authored programs were passed independently through
`compileAndRunKotlin`; all completed successfully with the outputs below.

| # | Lesson program | Transpiled JS | Exact output |
|---:|---|---|---|
| 1 | Learn | A | `child\ndone` |
| 2 | Explore 1 | A | `child\ndone` |
| 3 | Explore 2 | B | `resumed` |
| 4 | Explore 3 | C | `true` |
| 5 | Explore 4 | B | `resumed` |
| 6 | Explore 5 | A | `child\ndone` |
| 7 | Explore 6 | A | `child\ndone` |
| 8 | Explore 7 | A | `child\ndone` |
| 9 | Predict 1 | A | `child\ndone` |
| 10 | Predict 2 | D | empty |
| 11 | Predict 3 | A | `child\ndone` |
| 12 | Predict 4 | D | empty |
| 13 | Predict 5 | A | `child\ndone` |
| 14 | Predict 6 | E | empty |
| 15 | Predict 7 | A | `child\ndone` |
| 16 | Write & Run starter | F | `0` |
| 17 | Write & Run solution | G | `7` |
| 18 | Debug broken | H | `Deferred{Active}` |
| 19 | Debug fixed | I | `13` |

Repeated lesson entries contain byte-equivalent source and therefore produce
the same exact JavaScript shown under the referenced letter.

### A — Learn, E1, E5, E6, E7, P1, P3, P5, P7

```javascript
function main() {

return __kt_runBlocking ((() => {
const job = __kt_launch ((() => {
__kt_delay(1);
return println("child");
}));
job.join();
return println("done");
}));
}
```

### B — E2, E4

```javascript
function main() {

return __kt_runBlocking((() => {
__kt_delay(1);
return println("resumed");
}));
}
```

### C — E3

```javascript
function main() {

return __kt_runBlocking((() => {
const j = __kt_launch((() => {

}));
j.join();
return println(j.isCompleted);
}));
}
```

### D — P2, P4

```javascript
function f() {
__kt_delay(1)
}
```

### E — P6

```javascript

```

### F — Write & Run starter

```javascript

function main() {

return __kt_runBlocking ((() => {
let result = 0;
const job = __kt_launch ((() => {
__kt_delay(1);
return result = 7;
}));
// TODO wait for job
return println(result);
}));
}
```

### G — Write & Run solution

```javascript

function main() {

return __kt_runBlocking ((() => {
let result = 0;
const job = __kt_launch ((() => {
__kt_delay(1);
return result = 7;
}));
job.join();
return println(result);
}));
}
```

### H — Debug broken

```javascript

function main() {

return __kt_runBlocking ((() => {
const value = __kt_async ((() => {

return 13;
}));
return println(value);
}));
}
```

### I — Debug fixed

```javascript

function main() {

return __kt_runBlocking ((() => {
const value = __kt_async ((() => {

return 13;
}));
return println(value.await());
}));
}
```

## Expected-output checks

- Write & Run solution prints exactly `7`, matching `expectedOutput: "7"`.
- Its starter prints `0`, so omitting `join()` no longer receives a false pass.
- Debug fixed code prints exactly `13`, matching `expectedOutput: "13"`.
- Debug broken code prints `Deferred{Active}`, not `13`, preserving the bug.

## Differences from real Kotlin

- No thread, event-loop, dispatcher, or time-based scheduling is simulated.
- `delay()` is a no-op and does not yield or wait.
- Child execution order is deterministic registration order when the scope
  drains; real Kotlin scheduling must not be inferred from this engine.
- The stable object strings `Job{Active|Completed}` and
  `Deferred{Active|Completed}` are teaching-runner representations, not the
  implementation-dependent strings printed by real kotlinx.coroutines.
- Cancellation, contexts, dispatchers, timeouts, supervision, and general
  exception-propagation semantics remain unsupported.

For this lesson's programs, the visible output matches real Kotlin for all
deterministic joined/awaited examples. The Write & Run starter's `0` follows
the default `runBlocking` scheduling used by the lesson, but must not be
generalized into a promise about arbitrary coroutine dispatchers.

## Pass ordering

`prepareLessonOneCoroutineSource` runs first inside `transpileKotlinToJS`.
It removes only a whole-line `import kotlinx.coroutines.*` and lexically
removes `suspend` only when it modifies `fun`; its scanner copies strings,
line comments, nested block comments, and all other code unchanged.

It runs before every existing runner pass: KProperty/operator normalization,
class-name reflection lowering, annotation and `where` erasure, numeric-member
normalization, range lowering, reified functions, source inference,
extension-property lowering, collection-generic erasure, companion/getter/
lazy/sequence protection, `lowerKotlinFunctions`, protected-block restoration,
map declarations, OOP declarations, `when`, multiline `if`, and all per-line
passes (comment separation, numeric suffixes, loops, loop guards, integer
division, type/range checks, declarations, semicolon insertion, single-line
`if`, equality, residual functions, templates, maps/lists, size, and factories).

Inside `lowerKotlinFunctions`, builder signatures are registered before its
inference/lowering walk. This gives each trailing coroutine block a known
zero-parameter function type and renames calls to `__kt_runBlocking`,
`__kt_launch`, `__kt_async`, and `__kt_delay`. It does not reorder any existing
function pass. The standard per-line `val`/`var` and residual `fun` transforms
then convert the lowerer's intentionally Kotlin-shaped declarations into JS.

The runtime helpers are injected only when executing the already-transpiled
script, after every source transform. They therefore cannot corrupt source
text or string literals.
