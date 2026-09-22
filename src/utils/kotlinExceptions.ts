/**
 * World 15 (Error Fortress): a real Kotlin/Java-shaped Throwable hierarchy,
 * used for both `throw`/`catch` type matching (`instanceof`) and for
 * `.message`/`.cause`/`e::class.simpleName`. Deliberately NOT `extends
 * Error` -- JS's own `Error` sets `message` as an own, non-nullable-string
 * instance property inside its constructor, which fights with Kotlin's
 * real, nullable `Throwable.message: String?` (an `Exception()` with no
 * arguments has `message == null`, not `""`). Since this simulator never
 * needs a real JS stack trace, a plain class avoids that entirely rather
 * than working around it.
 *
 * Classes are named exactly like their real Kotlin counterparts (no
 * "Kotlin" prefix) so `e::class.simpleName` -- lowered to
 * `e.constructor.name` -- prints the real name with zero extra mapping,
 * and so `insertNewForInstantiation`/`extends` in kotlinRunner.ts can treat
 * them exactly like any other known class name.
 *
 * The subtype relationships matter directly for a `catch (e: T)` clause's
 * `instanceof` check to behave like real Kotlin -- e.g. `NumberFormatException`
 * must be a subtype of `IllegalArgumentException` for
 * `catch (e: IllegalArgumentException)` to match a thrown
 * `NumberFormatException`, exactly as World 15's own Multiple Catch Blocks
 * lesson content depends on.
 */
export class Throwable {
  message: string | null;
  cause: Throwable | null;
  constructor(message: string | null = null, cause: Throwable | null = null) {
    this.message = message ?? (cause ? cause.toString() : null);
    this.cause = cause ?? null;
  }
  toString(): string {
    const name = (this.constructor as any).name;
    return this.message != null ? `${name}: ${this.message}` : name;
  }
}
export class Exception extends Throwable {}
export class RuntimeException extends Exception {}
export class IllegalStateException extends RuntimeException {}
export class IllegalArgumentException extends RuntimeException {}
export class NumberFormatException extends IllegalArgumentException {}
export class IndexOutOfBoundsException extends RuntimeException {}
export class ArithmeticException extends RuntimeException {}
export class NoSuchElementException extends RuntimeException {}
export class UnsupportedOperationException extends RuntimeException {}

/**
 * `Result<T>` (World 15's Result/runCatching/Success-failure-handling
 * lessons): a plain success/failure value container, matching the real
 * Kotlin stdlib API surface these lessons actually exercise. Kept
 * deliberately simple (no `Result.map`/`.onSuccess` return-type
 * generic-tracking beyond what these lessons use).
 */
export class KotlinResult {
  private value: any;
  private error: Throwable | null;
  private constructor(value: any, error: Throwable | null) {
    this.value = value;
    this.error = error;
  }
  static success(value: any): KotlinResult { return new KotlinResult(value, null); }
  static failure(error: Throwable): KotlinResult { return new KotlinResult(undefined, error); }
  get isSuccess(): boolean { return this.error === null; }
  get isFailure(): boolean { return this.error !== null; }
  getOrNull(): any { return this.isSuccess ? this.value : null; }
  exceptionOrNull(): Throwable | null { return this.error; }
  getOrDefault(defaultValue: any): any { return this.isSuccess ? this.value : defaultValue; }
  getOrElse(onFailure: (e: Throwable) => any): any { return this.isSuccess ? this.value : onFailure(this.error!); }
  getOrThrow(): any { if (this.isSuccess) return this.value; throw this.error; }
  fold(onSuccess: (v: any) => any, onFailure: (e: Throwable) => any): any {
    return this.isSuccess ? onSuccess(this.value) : onFailure(this.error!);
  }
  onSuccess(action: (v: any) => void): KotlinResult { if (this.isSuccess) action(this.value); return this; }
  onFailure(action: (e: Throwable) => void): KotlinResult { if (this.isFailure) action(this.error!); return this; }
  recover(transform: (e: Throwable) => any): KotlinResult { return this.isSuccess ? this : KotlinResult.success(transform(this.error!)); }
  map(transform: (v: any) => any): KotlinResult { return this.isSuccess ? KotlinResult.success(transform(this.value)) : this; }
  mapCatching(transform: (v: any) => any): KotlinResult {
    if (this.isFailure) return this;
    try { return KotlinResult.success(transform(this.value)); }
    catch (e) { return KotlinResult.failure(e instanceof Throwable ? e : new Exception(String((e as any)?.message ?? e))); }
  }
  toString(): string { return this.isSuccess ? `Success(${this.value})` : `Failure(${this.error})`; }
}

/** `runCatching { block }` and the receiver form `receiver.runCatching { block }`. */
export function kotlinRunCatching(block: () => any, receiver?: any): KotlinResult {
  try {
    return KotlinResult.success(receiver !== undefined ? block.call(receiver) : block());
  } catch (e) {
    return KotlinResult.failure(e instanceof Throwable ? e : new Exception(String((e as any)?.message ?? e)));
  }
}
