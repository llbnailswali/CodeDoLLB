/** Eager collection runtime. Kept local to runner values, not Array.prototype. */
export class KotlinPair {
  constructor(public first: any, public second: any) {}
  *[Symbol.iterator]() { yield this.first; yield this.second; }
  component1() { return this.first; }
  component2() { return this.second; }
}
const compare = (a: any, b: any): number => a === b ? 0 : a == null ? -1 : b == null ? 1 : a < b ? -1 : 1;
const equal = (a: any, b: any): boolean => a === b || (Number.isNaN(a) && Number.isNaN(b)) ||
  (a instanceof KotlinList && b instanceof KotlinList && a.length === b.length && a.every((v: any, i: number) => equal(v, b[i]))) ||
  (a instanceof KotlinPair && b instanceof KotlinPair && equal(a.first, b.first) && equal(a.second, b.second));
const positive = (value: number) => { if (!Number.isInteger(value) || value <= 0) throw new Error('size and step must be positive integers'); };
// A dynamic base accommodates Kotlin overloads that differ from JS Array signatures.
const ArrayBase: any = Array;
export class KotlinList extends ArrayBase {
  declare length: number;
  [index: number]: any;
  [Symbol.iterator](): ArrayIterator<any> { return Array.prototype[Symbol.iterator].call(this); }
  static get [Symbol.species]() { return Array; }
  constructor(values: Iterable<any> = []) { super(); for (const value of values) this.push(value); }
  get size() { return this.length; }
  map(fn: any) { return new KotlinList(Array.prototype.map.call(this, (v: any) => fn(v))); }
  filter(fn: any) { return new KotlinList(Array.prototype.filter.call(this, (v: any) => fn(v))); }
  mapNotNull(fn: any) { return this.map(fn).filter((v: any) => v != null); }
  filterNot(fn: any) { return this.filter((v: any) => !fn(v)); }
  filterNotNull() { return this.filter((v: any) => v != null); }
  flatMap(fn: any) { const result = new KotlinList(); for (const v of this) for (const item of fn(v)) result.push(item); return result; }
  flatten() { return this.flatMap((v: any) => v); }
  fold(initial: any, fn: any) { let result = initial; for (const v of this) result = fn(result, v); return result; }
  reduce(fn: any) { if (!this.length) throw new Error('Empty collection cannot be reduced'); let result = this[0]; for (let i = 1; i < this.length; i++) result = fn(result, this[i]); return result; }
  groupBy(key: any, value: any = (v: any) => v) { const result = new Map(); for (const v of this) { const k = key(v); if (!result.has(k)) result.set(k, new KotlinList()); result.get(k).push(value(v)); } return result; }
  associate(fn: any) { const result = new Map(); for (const v of this) { const pair = fn(v); result.set(pair.first, pair.second); } return result; }
  associateBy(key: any) { return this.associate((v: any) => new KotlinPair(key(v), v)); }
  associateWith(value: any) { return this.associate((v: any) => new KotlinPair(v, value(v))); }
  partition(fn: any) { const yes = new KotlinList(), no = new KotlinList(); for (const v of this) (fn(v) ? yes : no).push(v); return new KotlinPair(yes, no); }
  zip(other: Iterable<any>, fn: any = (a: any, b: any) => new KotlinPair(a, b)) { const right = Array.from(other); return new KotlinList(Array.from(this).slice(0, right.length).map((v, i) => fn(v, right[i]))); }
  chunked(size: number, fn?: any) { return this.windowed(size, size, true, fn); }
  windowed(size: number, step: number | Function = 1, partialWindows: boolean = false, fn?: any) {
    if (typeof step === 'function') { fn = step; step = 1; }
    if (typeof partialWindows === 'function') { fn = partialWindows; partialWindows = false; }
    positive(size); positive(step as number); const result = new KotlinList();
    for (let i = 0; i < this.length; i += step as number) { const window = new KotlinList(Array.prototype.slice.call(this, i, i + size)); if (!partialWindows && window.length < size) break; result.push(fn ? fn(window) : window); } return result;
  }
  distinct() { const result = new KotlinList(); for (const v of this) if (!result.some((x: any) => equal(x, v))) result.push(v); return result; }
  distinctBy(fn: any) { const keys: any[] = []; return this.filter((v: any) => { const k = fn(v); if (keys.some(x => equal(x, k))) return false; keys.push(k); return true; }); }
  sorted() { return new KotlinList(Array.from(this).sort(compare)); }
  sortedDescending() { return this.sorted().reversed(); }
  sortedBy(fn: any) { return new KotlinList(Array.from(this).sort((a, b) => compare(fn(a), fn(b)))); }
  sortedByDescending(fn: any) { return new KotlinList(Array.from(this).sort((a, b) => compare(fn(b), fn(a)))); }
  reversed() { return new KotlinList(Array.from(this).reverse()); }
  sum() { return this.fold(0, (a: number, b: number) => a + b); }
  average() { return this.length ? this.sum() / this.length : NaN; }
  any(fn?: any) { return fn ? this.some((v: any) => fn(v)) : this.length > 0; }
  all(fn: any) { return this.every((v: any) => fn(v)); }
  none(fn?: any) { return !this.any(fn); }
  minOrNull() { return this.length ? this.reduce((a: any, b: any) => compare(a, b) <= 0 ? a : b) : null; }
  maxOrNull() { return this.length ? this.reduce((a: any, b: any) => compare(a, b) >= 0 ? a : b) : null; }
  min() { if (!this.length) throw new Error('Collection is empty'); return this.minOrNull(); }
  max() { if (!this.length) throw new Error('Collection is empty'); return this.maxOrNull(); }
  first(fn: any = () => true) { for (const v of this) if (fn(v)) return v; throw new Error('Collection contains no matching element'); }
  firstOrNull(fn: any = () => true) { for (const v of this) if (fn(v)) return v; return null; }
  find(fn: any) { return this.firstOrNull(fn); }
  last(fn: any = () => true) { return this.reversed().first(fn); }
  lastOrNull(fn: any = () => true) { return this.reversed().firstOrNull(fn); }
  count(fn?: any) { return fn ? this.filter(fn).length : this.length; }
  contains(value: any) { return this.some((v: any) => equal(v, value)); }
  isEmpty() { return this.length === 0; }
  isNotEmpty() { return this.length !== 0; }
  get(index: number) { if (!Number.isInteger(index) || index < 0 || index >= this.length) throw new Error('Index out of bounds'); return this[index]; }
}
