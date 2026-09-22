/**
 * World 16 Lesson 1 coroutine teaching runtime.
 *
 * This is deliberately deterministic and single-threaded. `launch`/`async`
 * enqueue a child in the current runBlocking scope; join/await execute that
 * child, and runBlocking drains any children that were not explicitly waited
 * for before returning. `delay` is a documented no-op. This preserves Lesson
 * 1's important distinction between reading state before and after `join`
 * without pretending to provide real scheduling, threads, cancellation,
 * timing, or sibling-coroutine interleaving. Lesson 4 adds a small context
 * model, but dispatcher values remain metadata and never switch threads.
 */

export class KotlinJob {
  private completed = false;
  private cancelled = false;
  private running = false;
  protected error: unknown;
  private readonly children = new Set<KotlinJob>();
  constructor(private readonly action: () => unknown = () => undefined) {}
  get isCompleted(): boolean { return this.completed; }
  get isCancelled(): boolean { return this.cancelled; }
  get isActive(): boolean { return !this.completed && !this.cancelled; }
  addChild(child: KotlinJob): void { this.children.add(child); }
  cancel(): void {
    if (this.completed) return;
    this.cancelled = true;
    for (const child of this.children) child.cancel();
  }
  cancelAndJoin(): void { this.cancel(); this.join(); }
  start(): boolean {
    if (this.completed) return false;
    this.ensureRun();
    return true;
  }
  /**
   * Runs the action if it hasn't already, capturing (never throwing) any
   * failure. Shared by the public, never-throwing `join()` below and by
   * `__drainComplete` (the scope's own internal structural-propagation
   * path) -- keeping "did the action run" separate from "does completing
   * it expose an error" is exactly the distinction real Kotlin draws
   * between Job.join() and Deferred.await().
   */
  protected ensureRun(): void {
    if (this.completed) return;
    if (this.cancelled && !this.running) {
      this.completed = true;
      return;
    }
    this.running = true;
    try { this.action(); }
    catch (error) {
      if (!(error instanceof KotlinCancellationException)) this.error = error;
    }
    finally { this.running = false; this.completed = true; }
  }
  /**
   * Real Kotlin's `Job.join()` suspends until the job completes and never
   * exposes/rethrows a completion exception -- only `Deferred.await()`
   * does that (confirmed directly against Kotlin 2.0.21/coroutines 1.8.1:
   * `async<Int> { throw ... }; job.join(); println("done")` inside
   * supervisorScope prints "done" and exits 0, it does not throw). A
   * previous version of this simulator had `join()` unconditionally
   * rethrow any stored error, which silently turned a correct "join()
   * doesn't observe failure" lesson scenario into an incorrect crash.
   */
  join(): void {
    this.ensureRun();
  }
  /**
   * Used ONLY by the owning scope's own structural drain (see
   * `drainScope`/`drainSupervisorScope` below) -- this is what actually
   * propagates a child's failure to its parent the way real Kotlin's Job
   * hierarchy does automatically, independent of whether user code ever
   * calls join()/await() on that child at all. Never call this from
   * user-facing Kotlin lowering; only the scope-drain functions may.
   */
  __drainComplete(): void {
    this.ensureRun();
    if (this.error !== undefined) throw this.error;
  }
  toString(): string { return `Job{${this.cancelled ? 'Cancelled' : this.completed ? 'Completed' : 'Active'}}`; }
}

export class KotlinCancellationException extends Error {
  constructor(message = 'Coroutine was cancelled') {
    super(message);
    this.name = 'CancellationException';
  }
}

export class KotlinDeferred<T = unknown> extends KotlinJob {
  private value!: T;
  constructor(action: () => T) { super(() => { this.value = action(); }); }
  // Deferred.await(), unlike Job.join(), DOES retrieve and rethrow the
  // stored completion exception -- this is the one place in real Kotlin
  // where a coroutine builder's outcome is actually exposed to the caller.
  await(): T {
    this.ensureRun();
    if (this.error !== undefined) throw this.error;
    return this.value;
  }
  toString(): string { return `Deferred{${this.isCompleted ? 'Completed' : 'Active'}}`; }
}

/** Syntax-level start modes used by Lesson 2. DEFAULT starts immediately;
 * LAZY waits for start()/await()/scope completion. Neither mode schedules a
 * thread or models real interleaving in this single-threaded simulator. */
export const KotlinCoroutineStart = Object.freeze({
  DEFAULT: 'DEFAULT',
  LAZY: 'LAZY',
} as const);
export type KotlinCoroutineStartValue = typeof KotlinCoroutineStart[keyof typeof KotlinCoroutineStart];

export const KotlinJobKey = 'Job';
export const KotlinCoroutineNameKey = 'CoroutineName';
export const KotlinDispatcherKey = 'ContinuationInterceptor';
export const KotlinExceptionHandlerKey = 'CoroutineExceptionHandler';
export type KotlinContextElement = { key: string; [property: string]: unknown };
type KotlinContext = Record<string, unknown>;
type CoroutineScope = { children: KotlinJob[]; context: KotlinContext };
const scopes: CoroutineScope[] = [];
const contexts: KotlinContext[] = [];

export const KotlinDispatchers = Object.freeze({
  Default: Object.freeze({ key: KotlinDispatcherKey, name: 'Default' }),
  IO: Object.freeze({ key: KotlinDispatcherKey, name: 'IO' }),
  Main: Object.freeze({ key: KotlinDispatcherKey, name: 'Main' }),
});

export function kotlinCoroutineName(name: string): KotlinContextElement {
  return Object.freeze({ key: KotlinCoroutineNameKey, name });
}

export function kotlinCoroutineExceptionHandler(
  handler: (context: KotlinContext, error: unknown) => void,
): KotlinContextElement {
  return Object.freeze({ key: KotlinExceptionHandlerKey, handler });
}

export const kotlinCoroutineContext: KotlinContext = new Proxy({}, {
  get(_target, property) {
    if (typeof property !== 'string') return undefined;
    return contexts.at(-1)?.[property];
  },
});

function inContext<T>(context: KotlinContext, block: () => T): T {
  contexts.push(context);
  try { return block(); }
  finally { contexts.pop(); }
}

function currentContext(): KotlinContext {
  const context = contexts.at(-1);
  if (!context) throw new Error('coroutineContext requires runBlocking in this lesson simulator');
  return context;
}

function register<T extends KotlinJob>(job: T): T {
  const scope = scopes.at(-1);
  if (!scope) throw new Error('Coroutine builder requires runBlocking in this lesson simulator');
  scope.children.push(job);
  const parent = scope.context[KotlinJobKey];
  if (parent instanceof KotlinJob) parent.addChild(job);
  return job;
}

function drainScope(scope: CoroutineScope): void {
  for (let index = 0; index < scope.children.length; index++) {
    try { scope.children[index].__drainComplete(); }
    catch (error) {
      for (let sibling = index + 1; sibling < scope.children.length; sibling++) {
        scope.children[sibling].cancel();
      }
      throw error;
    }
  }
}

function drainSupervisorScope(scope: CoroutineScope): void {
  for (let index = 0; index < scope.children.length; index++) {
    try { scope.children[index].__drainComplete(); }
    catch { /* supervised child failure remains observable through join/await */ }
  }
}

export function kotlinRunBlocking<T>(block: () => T): T {
  const rootJob = new KotlinJob();
  const context: KotlinContext = {
    [KotlinJobKey]: rootJob,
    [KotlinDispatcherKey]: KotlinDispatchers.Default,
  };
  const scope: CoroutineScope = { children: [], context };
  scopes.push(scope);
  try {
    const result = inContext(context, block);
    drainScope(scope);
    return result;
  } finally {
    scopes.pop();
  }
}

export function kotlinCoroutineScope<T>(block: () => T): T {
  const context = currentContext();
  const scope: CoroutineScope = { children: [], context };
  scopes.push(scope);
  try {
    const result = block();
    drainScope(scope);
    return result;
  } catch (error) {
    for (const child of scope.children) child.cancel();
    throw error;
  } finally {
    scopes.pop();
  }
}

export function kotlinSupervisorScope<T>(block: () => T): T {
  const context = currentContext();
  const scope: CoroutineScope = { children: [], context };
  scopes.push(scope);
  try {
    const result = block();
    drainSupervisorScope(scope);
    return result;
  } catch (error) {
    for (const child of scope.children) child.cancel();
    throw error;
  } finally {
    scopes.pop();
  }
}

export function kotlinLaunch(block: () => unknown): KotlinJob;
export function kotlinLaunch(context: KotlinContextElement, block: () => unknown): KotlinJob;
export function kotlinLaunch(contextOrBlock: KotlinContextElement | (() => unknown), maybeBlock?: () => unknown): KotlinJob {
  const block = typeof contextOrBlock === 'function' ? contextOrBlock : maybeBlock;
  if (!block) throw new Error('launch requires a block');
  const inherited = { ...currentContext() };
  if (typeof contextOrBlock !== 'function') {
    if (!contextOrBlock || typeof contextOrBlock.key !== 'string') {
      throw new Error('launch requires a supported context element');
    }
    inherited[contextOrBlock.key] = contextOrBlock;
  }
  let job!: KotlinJob;
  job = new KotlinJob(() => inContext({ ...inherited, [KotlinJobKey]: job }, () => {
    try { return block(); }
    catch (error) {
      const element = inherited[KotlinExceptionHandlerKey] as { handler?: (context: KotlinContext, error: unknown) => void } | undefined;
      if (element?.handler) {
        element.handler(inherited, error);
        return undefined;
      }
      throw error;
    }
  }));
  return register(job);
}

export function kotlinAsync<T>(block: () => T): KotlinDeferred<T>;
export function kotlinAsync<T>(start: KotlinCoroutineStartValue, block: () => T): KotlinDeferred<T>;
export function kotlinAsync<T>(context: KotlinContextElement, block: () => T): KotlinDeferred<T>;
export function kotlinAsync<T>(startOrContextOrBlock: KotlinCoroutineStartValue | KotlinContextElement | (() => T), maybeBlock?: () => T): KotlinDeferred<T> {
  const block = typeof startOrContextOrBlock === 'function' ? startOrContextOrBlock : maybeBlock;
  if (!block) throw new Error('async requires a block');
  const element = typeof startOrContextOrBlock === 'object' ? startOrContextOrBlock : undefined;
  const start = typeof startOrContextOrBlock === 'string' ? startOrContextOrBlock : KotlinCoroutineStart.DEFAULT;
  if (start !== KotlinCoroutineStart.DEFAULT && start !== KotlinCoroutineStart.LAZY) {
    throw new Error(`Unsupported CoroutineStart value: ${String(start)}`);
  }
  const inherited = { ...currentContext() };
  if (element) {
    if (typeof element.key !== 'string') throw new Error('async requires a supported context element');
    inherited[element.key] = element;
  }
  let deferred!: KotlinDeferred<T>;
  deferred = register(new KotlinDeferred(() => inContext({ ...inherited, [KotlinJobKey]: deferred }, block)));
  if (start === KotlinCoroutineStart.DEFAULT) deferred.start();
  return deferred;
}

export function kotlinWithContext<T>(element: KotlinContextElement, block: () => T): T {
  if (!element || typeof element.key !== 'string') {
    throw new Error('withContext requires a supported context element');
  }
  return inContext({ ...currentContext(), [element.key]: element }, block);
}

export function kotlinDelay(milliseconds: number): void {
  if (!Number.isInteger(milliseconds) || milliseconds < 0) {
    throw new Error('delay requires a non-negative Int in this lesson simulator');
  }
  kotlinEnsureActive();
  // Intentionally no timing: see the module-level concurrency-model note.
}

export function kotlinEnsureActive(): void {
  const job = currentContext()[KotlinJobKey];
  if (job instanceof KotlinJob && job.isCancelled) throw new KotlinCancellationException();
}

export function kotlinYield(): void {
  kotlinEnsureActive();
  // A checkpoint only; this deterministic runtime has no scheduler to yield to.
}

/**
 * Removes supported coroutine imports and the `suspend`
 * function modifier. The modifier scan is lexical: strings and comments are
 * copied untouched, so text such as "suspend fun" is never corrupted.
 */
export function prepareCoroutineSource(source: string): string {
  source = source.replace(
    /^[ \t]*import[ \t]+kotlinx\.coroutines\.\*[ \t]*;?[ \t]*(?:\/\/[^\n]*)?$/gm,
    '',
  );
  source = source.replace(
    /^[ \t]*import[ \t]+kotlin\.coroutines\.coroutineContext[ \t]*;?[ \t]*(?:\/\/[^\n]*)?$/gm,
    '',
  );

  let output = '';
  let i = 0;
  while (i < source.length) {
    if (source.startsWith('//', i)) {
      const end = source.indexOf('\n', i);
      const stop = end < 0 ? source.length : end;
      output += source.slice(i, stop);
      i = stop;
      continue;
    }
    if (source.startsWith('/*', i)) {
      let j = i + 2;
      let depth = 1;
      while (j < source.length && depth > 0) {
        if (source.startsWith('/*', j)) { depth++; j += 2; }
        else if (source.startsWith('*/', j)) { depth--; j += 2; }
        else j++;
      }
      output += source.slice(i, j);
      i = j;
      continue;
    }
    if (source[i] === '"' || source[i] === "'") {
      const quote = source[i];
      let j = i + 1;
      while (j < source.length) {
        if (source[j] === '\\') { j += 2; continue; }
        if (source[j++] === quote) break;
      }
      output += source.slice(i, j);
      i = j;
      continue;
    }

    const match = source.slice(i).match(/^suspend\b(?=\s+fun\b)/);
    if (match && (i === 0 || !/[A-Za-z0-9_]/.test(source[i - 1]))) {
      i += match[0].length;
      continue;
    }
    output += source[i++];
  }
  return output;
}

/** Backward-compatible alias for Lesson 1 callers; new code uses the
 * capability-wide name above. */
export const prepareLessonOneCoroutineSource = prepareCoroutineSource;

/**
 * World 16 Lesson 11 (Coroutine Best Practices): `GlobalScope.launch { ... }`
 * is the well-known anti-pattern this lesson teaches learners to AVOID --
 * work detached from any structured scope, whose completion no caller can
 * observe or wait for. Real Kotlin's `GlobalScope` is a real, always-active
 * top-level scope tied to the process; this simulator has no background
 * event loop or process lifetime to run detached work on at all, so the
 * most honest reproduction of "detached from structured concurrency" is
 * literal: the returned Job is a real `KotlinJob` (so `is Job`,
 * `.isCompleted`, etc. all still behave normally if inspected), but it is
 * deliberately never registered with any scope's children -- nothing in
 * this deterministic runtime will ever call join()/await()/__drainComplete
 * on it, so its action never runs during synchronous execution. This
 * reproduces the exact bug World 16 Lesson 11's Debug exercise teaches:
 * code that reads state a `GlobalScope.launch` block was supposed to set
 * observes the OLD value, because the detached work was never awaited (or,
 * in this simulator, never run at all).
 */
export function kotlinGlobalScopeLaunch(block: () => unknown): KotlinJob {
  return new KotlinJob(block);
}
