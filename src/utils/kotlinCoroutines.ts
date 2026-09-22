/**
 * World 16 Lesson 1 coroutine teaching runtime.
 *
 * This is deliberately deterministic and single-threaded. `launch`/`async`
 * enqueue a child in the current runBlocking scope; join/await execute that
 * child, and runBlocking drains any children that were not explicitly waited
 * for before returning. `delay` is a documented no-op. This preserves Lesson
 * 1's important distinction between reading state before and after `join`
 * without pretending to provide real scheduling, threads, cancellation,
 * contexts, timing, or sibling-coroutine interleaving.
 */

export class KotlinJob {
  private completed = false;
  private error: unknown;
  constructor(private readonly action: () => unknown = () => undefined) {}
  get isCompleted(): boolean { return this.completed; }
  join(): void {
    if (!this.completed) {
      try { this.action(); }
      catch (error) { this.error = error; }
      finally { this.completed = true; }
    }
    if (this.error !== undefined) throw this.error;
  }
  toString(): string { return `Job{${this.completed ? 'Completed' : 'Active'}}`; }
}

export class KotlinDeferred<T = unknown> extends KotlinJob {
  private value!: T;
  constructor(action: () => T) { super(() => { this.value = action(); }); }
  await(): T { this.join(); return this.value; }
  toString(): string { return `Deferred{${this.isCompleted ? 'Completed' : 'Active'}}`; }
}

type CoroutineScope = { children: KotlinJob[] };
const scopes: CoroutineScope[] = [];

function register<T extends KotlinJob>(job: T): T {
  const scope = scopes.at(-1);
  if (!scope) throw new Error('Coroutine builder requires runBlocking in this lesson simulator');
  scope.children.push(job);
  return job;
}

export function kotlinRunBlocking<T>(block: () => T): T {
  const scope: CoroutineScope = { children: [] };
  scopes.push(scope);
  try {
    const result = block();
    for (const child of scope.children) child.join();
    return result;
  } finally {
    scopes.pop();
  }
}

export function kotlinLaunch(block: () => unknown): KotlinJob {
  return register(new KotlinJob(block));
}

export function kotlinAsync<T>(block: () => T): KotlinDeferred<T> {
  return register(new KotlinDeferred(block));
}

export function kotlinDelay(milliseconds: number): void {
  if (!Number.isInteger(milliseconds) || milliseconds < 0) {
    throw new Error('delay requires a non-negative Int in this lesson simulator');
  }
  // Intentionally no timing: see the module-level concurrency-model note.
}

/**
 * Removes only Lesson 1's supported coroutine import and the `suspend`
 * function modifier. The modifier scan is lexical: strings and comments are
 * copied untouched, so text such as "suspend fun" is never corrupted.
 */
export function prepareLessonOneCoroutineSource(source: string): string {
  source = source.replace(
    /^[ \t]*import[ \t]+kotlinx\.coroutines\.\*[ \t]*;?[ \t]*(?:\/\/[^\n]*)?$/gm,
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
