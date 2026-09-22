import assert from 'node:assert/strict';
import { WORLD_15_LESSONS } from '../src/data/curriculum/world15LessonsData';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../src/data/lessonStagesData';
import { CODEDO_MASTER_WORLDS } from '../src/data/curriculum/masterCurriculumCatalog';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const lessons = WORLD_15_LESSONS;
const world = CODEDO_MASTER_WORLDS.find(w => w.id === 'world-15')!;
assert.equal(lessons.length, 15, 'World 15 should register exactly 15 lessons');

let executions = 0;
async function verify(code: string, expected: string, name: string, shouldPass = true) {
  const result = await compileAndRunKotlin(code);
  const passes = result.success && result.output === expected;
  assert.equal(passes, shouldPass, `${name}: expected ${shouldPass ? '' : 'NOT '}${JSON.stringify(expected)}, got ${JSON.stringify(result)}`);
  executions++;
}

// `@Throws(java.io.IOException::class)` / `java.io.IOException()` is a
// deliberately conceptual Java-interop illustration (Checked vs Unchecked
// Exception Model lesson) -- `java.io.IOException` is a real JVM class this
// simulator never models (no Java stdlib surface at all), so it cannot run.
const CONCEPTUAL_ONLY_IDS = new Set([
  'world-15-checked-vs-unchecked-exception-model-explore-4',
  'world-15-checked-vs-unchecked-exception-model-predict-4',
  // Illustrative pseudocode referencing an undefined `processOrder`/`input`
  // pair purely to ask a design question ("what must happen before
  // reporting success") -- not meant to execute.
  'world-15-boss-predict-4',
]);

// A `throw` with no `catch` anywhere in a snippet usually means the
// snippet is expected to crash when run -- UNLESS every `throw` sits
// inside a `fun name(...) { ... }` definition that is never actually
// reachable from the snippet's real entry point (several Explore/Predict
// examples define a validating function purely to show its shape, without
// invoking it, sometimes even nested two calls deep). Does a real,
// transitive call-graph reachability walk: `main` (if present) is always
// a root, since `compileAndRunKotlin` invokes it directly; otherwise the
// roots are whatever function names are actually called OUTSIDE every
// function body (the snippet's own top-level statements).
// Splits a snippet into its top-level code (everything outside any `fun
// name(...) { ... }`/`fun name(...) = expr` definition) plus a name -> body
// map for each definition found, so callers can walk real reachability from
// the snippet's actual entry point instead of just grepping raw source text
// (which can't tell "called" apart from "merely mentioned inside a
// never-invoked function's own body").
function splitTopLevel(code: string): { topLevel: string; funcs: Map<string, string> } {
  const funcs = new Map<string, string>();
  let topLevel = '';
  let cursor = 0;
  const re = /\bfun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)[^{]*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    topLevel += code.slice(cursor, m.index);
    const name = m[1];
    const braceStart = m.index + m[0].length - 1;
    let depth = 1, j = braceStart + 1;
    while (j < code.length && depth > 0) {
      if (code[j] === '{') depth++;
      else if (code[j] === '}') depth--;
      j++;
    }
    funcs.set(name, code.slice(braceStart + 1, j - 1));
    cursor = j;
    re.lastIndex = j;
  }
  topLevel += code.slice(cursor);
  // A single-expression function (`fun fail(): Nothing = throw ...`) has
  // no `{`/`}` body at all -- the block-bodied pass above never touches
  // it, so its RHS is still sitting in `topLevel` verbatim. Strip those
  // too (same one-line convention this file's content already follows),
  // recording the RHS as that function's body the same way.
  topLevel = topLevel.replace(/\bfun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)(?:\s*:\s*[A-Za-z_][\w<>?,\s]*)?\s*=\s*([^\n]*)/g,
    (whole, name, body) => { funcs.set(name, body); return ''; });
  return { topLevel, funcs };
}

// Walks real reachability from a snippet's actual entry point (`main` if
// present -- `compileAndRunKotlin` calls it directly -- otherwise whatever
// is invoked at true top level) and reports whether any REACHED function
// body (or the top level itself) satisfies `predicate`.
function reachableWhere(code: string, predicate: (text: string) => boolean): boolean {
  const { topLevel, funcs } = splitTopLevel(code);
  const roots = new Set<string>();
  if (funcs.has('main')) roots.add('main');
  for (const name of funcs.keys()) if (new RegExp(`\\b${name}\\s*\\(`).test(topLevel)) roots.add(name);
  const visited = new Set<string>();
  const queue = [...roots];
  let reached = predicate(topLevel);
  while (queue.length) {
    const name = queue.pop()!;
    if (visited.has(name)) continue;
    visited.add(name);
    const body = funcs.get(name) ?? '';
    if (predicate(body)) reached = true;
    for (const other of funcs.keys()) if (other !== name && new RegExp(`\\b${other}\\s*\\(`).test(body)) queue.push(other);
  }
  return reached;
}

// A `throw` with no `catch` anywhere in a snippet usually means the
// snippet is expected to crash when run -- UNLESS every `throw` sits
// inside a `fun name(...) { ... }` definition that is never actually
// reachable from the snippet's real entry point (several Explore/Predict
// examples define a validating function purely to show its shape, without
// invoking it, sometimes even nested two calls deep).
function hasReachableThrow(code: string): boolean {
  // `runCatching { ... }` always absorbs whatever it throws into a Result
  // instead of propagating it -- same bail-out rationale as an explicit
  // `catch (...)` clause below.
  if (!/\bthrow\b/.test(code) || /\bcatch\s*\(/.test(code) || /\brunCatching\b/.test(code)) return false;
  return reachableWhere(code, (text) => /\bthrow\b/.test(text));
}

// Whether the snippet's real entry point reaches ANY function call at all
// -- used to gate text-based "propagates"/"throws" heuristics away from a
// purely definitional, never-invoked snippet whose correct answer's prose
// merely describes what WOULD happen if it were called.
function hasReachableCall(code: string): boolean {
  return reachableWhere(code, (text) => /\b[A-Za-z_][A-Za-z0-9_]*\s*\(/.test(text));
}

for (const [index, lesson] of lessons.entries()) {
  const entry = world.lessons[index];
  assert.equal(AVAILABLE_FIVE_STAGE_LESSONS[entry.fiveStageLessonKey!], lesson, `${entry.id}: wrong lesson registration`);
  assert.equal(entry.questionsCount, lesson.predict!.questions.length, `${entry.id}: stale question count`);
  assert.ok(!entry.description.includes('Placeholder'), `${entry.id}: stale description`);
  assert.ok(lesson.learn.codeSnippet.length > 0, `${lesson.id}: missing Learn example`);

  const cards = lesson.explore!.cards;
  assert.equal(cards.length, new Set(cards.map(c => c.id)).size, `${lesson.id}: duplicate Explore card id`);
  for (const card of cards) {
    assert.ok(card, `${lesson.id}: Explore cards array has a hole`);
    if (CONCEPTUAL_ONLY_IDS.has(card.id)) continue;
    const code = card.code.join('\n');
    const wrapped = code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
    const result = await compileAndRunKotlin(wrapped);
    // A handful of Explore cards deliberately demonstrate an exception
    // PROPAGATING past a non-matching catch (real, correct Kotlin
    // behavior) -- their own description text says so, so an uncaught
    // runtime error there is the expected, correct outcome, not a runner
    // bug.
    const cardText = `${card.title} ${card.whatChanged} ${card.whatItMeans.map(w => w.description).join(' ')}`;
    // An uncaught `throw` with no `catch` anywhere in the snippet (several
    // World 15 Explore cards deliberately isolate expression-position
    // `throw` or propagation with nothing there to catch it) always means
    // the card is expected to crash at runtime.
    const uncaughtThrow = hasReachableThrow(code);
    // The text-based signal is only trustworthy when the snippet actually
    // HAS a catch clause (a mismatched-type catch, which `hasReachableThrow`
    // always treats as "not reachable" by design, since it cannot itself
    // judge a type match) -- otherwise a merely DESCRIPTIVE title/summary
    // that happens to mention "propagate" (discussing the topic, not this
    // specific snippet's own behavior) would be a false positive.
    const hasCatch = /\bcatch\s*\(/.test(code);
    const textSignalsPropagation = hasCatch && /propagat|does not (match|handle)|uncaught|not caught/i.test(cardText);
    const expectsPropagation = uncaughtThrow || textSignalsPropagation;
    if (expectsPropagation) {
      assert.ok(!result.success, `${lesson.id}::${card.id}: expected an uncaught propagating error, but it succeeded with ${JSON.stringify(result.output)}`);
      executions++;
      continue;
    }
    assert.ok(result.success, `${lesson.id}::${card.id}: Explore example failed to run: ${JSON.stringify(result.error)}`);
    executions++;
  }
  const questions = lesson.predict!.questions;
  assert.equal(questions.length, new Set(questions.map(q => q.id)).size, `${lesson.id}: duplicate Predict question id`);
  for (const q of questions) {
    assert.ok(q, `${lesson.id}: Predict questions array has a hole`);
    assert.equal(q.options.filter(o => o.isCorrect).length, 1, `${q.id}: must have exactly one correct option`);
    if (!q.code) continue;
    if (CONCEPTUAL_ONLY_IDS.has(q.id)) continue;
    const code = q.code.join('\n');
    const wrapped = code.includes('fun main(') ? code : `fun main() {\n${code}\n}`;
    const result = await compileAndRunKotlin(wrapped);
    const isConceptualOnly = code.trim().startsWith('//');
    if (isConceptualOnly) continue;
    const correct = q.options.find(o => o.isCorrect)!;
    // Several World 15 Predict questions correctly teach that a program
    // crashes / propagates an uncaught exception -- that is the CORRECT
    // real-Kotlin answer, not a runner bug, so these must NOT require
    // success.
    // An uncaught `throw` with no `catch` anywhere in the snippet (several
    // Checked-vs-Unchecked-Exception-Model questions deliberately show this
    // to illustrate that Kotlin does NOT require a catch-or-declare) always
    // means the program is expected to crash at runtime -- real Kotlin
    // behavior, not a runner bug.
    const uncaughtThrow = hasReachableThrow(code);
    // Like the Explore-card heuristic above, the text-based signals are
    // only trustworthy when the snippet actually calls something that
    // could plausibly throw at ALL (a real function invocation is
    // present) -- otherwise a purely definitional/never-invoked snippet
    // (e.g. `fun parse(text: String): Int = text.toInt()`, illustrating
    // what WOULD happen on invalid input without ever calling it) would
    // false-positive purely because its correct answer's prose describes
    // that hypothetical behavior.
    const hasAnyCall = hasReachableCall(code);
    const explicitlyPropagates = hasAnyCall && /propagat|rethrown|rethrows?\b/i.test(correct.label);
    // Deliberately excludes a bare "throws" -- that word alone is also used
    // in ordinary Kotlin/Java terminology unrelated to THIS snippet actually
    // throwing when run (e.g. "No throws declaration is required").
    const explicitlyThrows = hasAnyCall && /\b(is|gets?|will be) thrown\b|throws an exception|\bcrash(es)?\b/i.test(correct.label) && !/catch|caught|fallback|recover/i.test(correct.label);
    // A "compilation" question whose own correct answer describes a
    // CHANGE needed before the code would compile (e.g. "mark X as open")
    // is intentionally showing code that does not compile as given --
    // Kotlin classes are final by default, so a custom exception parent
    // subclassed without `open` is a real compile error, not a runner bug.
    const expectsCompileError = q.topicMeta === 'compilation' && /\bmark\b.*\b(open|abstract|inheritable)\b/i.test(correct.label);
    const expectsException = uncaughtThrow || explicitlyPropagates || explicitlyThrows || expectsCompileError;
    if (expectsException) {
      assert.ok(!result.success, `${lesson.id}::${q.id}: expected a runtime error (per its own correct answer), but it succeeded with ${JSON.stringify(result.output)}`);
      executions++;
      continue;
    }
    assert.ok(result.success, `${lesson.id}::${q.id}: Predict example failed to run: ${JSON.stringify(result.error)}`);
    // World 15 mixes pure "what is printed" questions (topicMeta 'output',
    // whose correct label IS the literal output) with questions that ALSO
    // mention printing but whose correct label is descriptive prose about
    // control flow (e.g. "The success branch runs and prints ok:3.") --
    // only the former's label is a literal string to compare byte-for-byte.
    if (q.topicMeta === 'output' && q.prompt.toLowerCase().includes('what') && (q.prompt.toLowerCase().includes('print') || q.prompt.toLowerCase().includes('printed'))) {
      assert.equal(result.output, correct.label.replace(/\\n/g, '\n'), `${q.id}: correct option must match real execution`);
    }
    executions++;
  }

  // Checked vs Unchecked Exception Model is a conceptual/language-rule
  // topic (per CODEDO_MASTER_PLAN.md's "Conceptual" topic type) -- it
  // intentionally has no Write & Run or Debug stage, the same way a
  // non-executable orientation lesson is allowed to omit editor stages.
  if (lesson.id === 'world-15-checked-vs-unchecked-exception-model') {
    assert.ok(!lesson.writeRun && !lesson.debug, `${lesson.id}: expected no writeRun/debug (conceptual topic)`);
    continue;
  }
  // Avoiding Swallowed Errors is a reasoning-style topic (per
  // CODEDO_MASTER_PLAN.md's adaptive activity selection) with a Debug
  // stage but deliberately no Write & Run -- the lesson's own point is
  // recognizing/fixing a swallowing mistake, not authoring new code from
  // scratch.
  if (lesson.id === 'world-15-avoiding-swallowed-errors') {
    assert.ok(!lesson.writeRun, `${lesson.id}: expected no writeRun stage`);
    assert.ok(lesson.debug, `${lesson.id}: missing debug stage`);
  } else {
    assert.ok(lesson.writeRun, `${lesson.id}: missing writeRun stage`);
    assert.ok(lesson.debug, `${lesson.id}: missing debug stage`);
  }
  if (lesson.writeRun) {
    const write = lesson.writeRun;
    assert.equal(write.expectedOutput, write.testCase.expected);
    await verify(write.solutionCode, write.expectedOutput, `${lesson.id}: write solution`);
    await verify(write.initialCode, write.expectedOutput, `${lesson.id}: unfinished starter`, false);
  }
  if (lesson.debug) {
    const debug = lesson.debug;
    await verify(debug.fixedCode, debug.expectedOutput, `${lesson.id}: debug solution`);
    await verify(debug.brokenCode, debug.expectedOutput, `${lesson.id}: broken debug`, false);
  }
}
console.log(`World 15 content audit passed: ${lessons.length} lessons, ${executions} runner checks.`);
