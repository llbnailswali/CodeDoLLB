/**
 * Function/lambda lowering for the learning runner. Parsing is token based so
 * strings, comments, nested delimiters and lexical return targets stay intact.
 * This is a teaching subset, not a replacement for Kotlin compiler diagnostics.
 */
type Token = { text: string; start: number; end: number };
type Type = { inlineOwner?: Frame; inlineMode?: 'inline' | 'crossinline'; mutable?: boolean; runtimeName?: string; name: string; nullable?: boolean; params?: Type[]; result?: Type; receiver?: Type };
type Parameter = { name: string; type?: Type; mode?: string; defaultCode?: string };
type Signature = { params: Parameter[]; result?: Type; inline: boolean; receiver?: Type };
type Frame = { token: string; label?: string; kind: 'function' | 'lambda'; inline: boolean; used: boolean; result?: Type };
type Context = { vars: Map<string, Type>; frames: Frame[]; receiver?: string; receiverType?: Type };
const unknown: Type = { name: '?' };
const unit: Type = { name: 'Unit' };
const isName = (text: string) => /^[A-Za-z_][A-Za-z_0-9]*$/.test(text);

export class KotlinFunctionError extends Error {
  constructor(message: string, public line: number) { super(message); }
}

function lex(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const start = i;
    if (/\s/.test(source[i])) { i++; continue; }
    if (source.startsWith('//', i)) { while (i < source.length && source[i] !== '\n') i++; continue; }
    if (source.startsWith('/*', i)) {
      i += 2; let depth = 1;
      while (i < source.length && depth) {
        if (source.startsWith('/*', i)) { depth++; i += 2; }
        else if (source.startsWith('*/', i)) { depth--; i += 2; }
        else i++;
      }
      continue;
    }
    if (source[i] === '"' || source[i] === "'") {
      const quote = source[i++];
      while (i < source.length) {
        if (source[i] === '\\') { i += 2; continue; }
        if (source[i++] === quote) break;
      }
    } else if (/[0-9]/.test(source[i])) {
      // Numeric literals must be scanned as ONE token (including an optional
      // decimal part, exponent, and type suffix) -- the generic alnum branch
      // below stops at the first non-alnum character, so "2.0" would
      // otherwise split into three separate tokens ("2", ".", "0"), fooling
      // the Int/Long division-truncation check further down into treating
      // the bare "2" as a standalone Int literal and wrapping it in
      // Math.trunc(...), leaving the ".0" dangling right after as invalid
      // syntax. The `(?!\.)` after the decimal point additionally keeps a
      // range like "5..10" from being misread as "5." followed by ".10".
      const m = source.slice(i).match(/^\d[\d_]*(?:\.(?!\.)[\d_]+)?(?:[eE][+-]?\d+)?[fFdDL]?/)!;
      i += m[0].length;
    } else if (/[A-Za-z_0-9]/.test(source[i])) {
      while (i < source.length && /[A-Za-z_0-9]/.test(source[i])) i++;
    } else {
      const operator = ['===', '!==', '::', '->', '?.', '?:', '!!', '==', '!=', '<=', '>=', '&&', '||', '+=', '-=', '*=', '/=', '++', '--', '..'].find(op => source.startsWith(op, i));
      i += operator?.length ?? 1;
    }
    tokens.push({ text: source.slice(start, i), start, end: i });
  }
  return tokens;
}

export function lowerKotlinFunctions(source: string): string {
  const t = lex(source);
  const pairs = new Map<number, number>();
  const stack: number[] = [];
  for (let i = 0; i < t.length; i++) {
    if (['(', '[', '{'].includes(t[i].text)) stack.push(i);
    else if ([')', ']', '}'].includes(t[i].text)) {
      const open = stack.pop();
      if (open !== undefined) { pairs.set(open, i); pairs.set(i, open); }
    }
  }
  const text = (a: number, b: number) => a < b ? source.slice(t[a].start, t[b - 1].end) : '';
  const at = (i: number) => t[i]?.text ?? '';
  const line = (i: number) => source.slice(0, t[i]?.start ?? source.length).split('\n').length;
  const fail = (message: string, i: number): never => { throw new KotlinFunctionError(message, line(i)); };
  const newline = (a: number, b: number) => a >= 0 && b < t.length && source.slice(t[a].end, t[b].start).includes('\n');
  const top = (a: number, b: number, needle: string): number => {
    for (let i = a; i < b; i++) {
      if (at(i) === needle) return i;
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    return -1;
  };
  const lastOperator = (a: number, b: number, operators: string[]) => {
    let found = -1;
    for (let i = a; i < b; i++) {
      if (i > a && operators.includes(at(i))) found = i;
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    return found;
  };
  const split = (a: number, b: number, separator = ',', types = false): [number, number][] => {
    const parts: [number, number][] = []; let start = a; let angle = 0;
    for (let i = a; i < b; i++) {
      if (types && at(i) === '<') angle++;
      if (types && at(i) === '>') angle--;
      if (at(i) === separator && angle === 0) { parts.push([start, i]); start = i + 1; }
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    if (start < b) parts.push([start, b]);
    return parts;
  };
  const aliases = new Map<string, Type>();
  function readType(a: number, b: number): Type {
    if (a >= b) return unknown;
    if (at(b - 1) === '?' && top(a, b, '->') < 0) return { ...readType(a, b - 1), nullable: true };
    if (at(a) === '(' && pairs.get(a) === b - 1) return readType(a + 1, b - 1);
    const arrow = top(a, b, '->');
    if (arrow >= 0) {
      let open = a; let receiver: Type | undefined;
      if (at(a) !== '(') {
        open = top(a, arrow, '(');
        if (open < 0 || at(open - 1) !== '.') return unknown;
        receiver = readType(a, open - 1);
      }
      const close = pairs.get(open)!;
      return { name: 'Function', receiver, params: split(open + 1, close, ',', true).map(([x, y]) => {
        const colon = top(x, y, ':'); return readType(colon < 0 ? x : colon + 1, y);
      }), result: readType(arrow + 1, b) };
    }
    if (aliases.has(text(a, b))) return aliases.get(text(a, b))!;
    // A USE-SITE variance annotation (`Array<in String>`, `Array<out
    // String>` -- as opposed to the DECLARATION-site `class Foo<out T>`
    // handled by `variantTypeNames` below) has no runtime meaning either,
    // but sits inside the raw text with real whitespace around it (`in
    // String`); stripped here, before that whitespace is collapsed below,
    // or it would glue into the type name as `inString`/`outString`.
    const hasUseSiteVariance = /<\s*(?:in|out)\s+/.test(text(a, b));
    const raw = text(a, b).replace(/<\s*(?:in|out)\s+/g, '<').replace(/\s/g, '');
    const angleIdx = raw.indexOf('<');
    // A use-site variance annotation makes the argument mismatch-tolerant
    // regardless of whether the base type (here possibly a built-in like
    // `Array`, never itself registered in `variantTypeNames`) is a
    // declaration-site variant type.
    if (angleIdx > 0 && (hasUseSiteVariance || variantTypeNames.has(raw.slice(0, angleIdx)))) return { name: raw.slice(0, angleIdx) };
    return { name: raw };
  }
  function parameters(a: number, b: number): Parameter[] {
    return split(a, b, ',', true).map(([start, end]) => {
      const mode = ['noinline', 'crossinline', 'vararg'].includes(at(start)) ? at(start++) : undefined;
      const eq = top(start, end, '=');
      const colon = top(start, eq < 0 ? end : eq, ':');
      return { name: at(start), mode, type: colon < 0 ? undefined : readType(colon + 1, eq < 0 ? end : eq), defaultCode: eq < 0 ? undefined : text(eq + 1, end) };
    });
  }
  function expressionEnd(a: number, end: number): number {
    let i = a;
    for (; i < end; i++) {
      if ([',', ';', '}', ')', ']'].includes(at(i))) break;
      if (i > a && newline(i - 1, i) && !['.', '?.', '?:', 'else', 'catch', 'finally', '{', '(', '+', '-', '*', '/', '&&', '||'].includes(at(i)) && !['=', '->', '+', '-', '*', '/', '&&', '||', ',', 'return'].includes(at(i - 1))) break;
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    return i;
  }
  type Header = { name: string; open: number; close: number; body: number; signature: Signature; anonymous: boolean };
  function header(i: number): Header | undefined {
    let p = i + 1;
    if (at(p) === '<') {
      // Capture this function's own generic type parameter names (`fun
      // <A, B> transform(...)` -> "A", "B") into the shared
      // `genericTypeParamNames` set, the same way `compatible()` already
      // treated the literal names "T"/"R" as always-compatible wildcards.
      // That hardcoding only worked by coincidence for lessons whose
      // generic functions happened to use the literal name "T" -- a
      // function declared with different names (`fun <A, B> transform(...)`)
      // had its parameter type ("A") compared against a real argument type
      // ("Int") and always failed as a false "Type mismatch", since this
      // engine has no real generic substitution at a call site.
      let depth = 1; let j = p + 1; let segStart = j;
      const addName = (start: number, end: number) => {
        if (start >= end) return;
        const idx = (at(start) === 'in' || at(start) === 'out') ? start + 1 : start;
        if (idx < end) genericTypeParamNames.add(at(idx));
      };
      while (j < t.length && depth > 0) {
        if (at(j) === '<') depth++;
        else if (at(j) === '>') { depth--; if (depth === 0) addName(segStart, j); }
        else if (at(j) === ',' && depth === 1) { addName(segStart, j); segStart = j + 1; }
        j++;
      }
      p = j;
    }
    let open = p;
    while (open < t.length && at(open) !== '(' && !['{', '=', ';'].includes(at(open))) open++;
    if (at(open) !== '(' || !pairs.has(open)) return undefined;
    const anonymous = open === p || at(open - 1) === '.';
    const name = anonymous ? '' : at(open - 1);
    const receiverEnd = anonymous ? open - 1 : open - 2;
    // A nullable receiver type (`fun String?.orDash() = ...`) tokenizes
    // its trailing `?` fused with the following dot into one `?.` token
    // (see `lex` above), not as separate `?` and `.` tokens -- so the
    // plain `at(receiverEnd) === '.'` check below never recognizes it,
    // and the declaration was silently registered as an ordinary,
    // non-extension function with no receiver at all. Recognize the fused
    // `?.` form too, and mark the resulting receiver type nullable
    // (readType only sees the plain `String` token in this branch, since
    // the `?` isn't a separate token to strip).
    const receiver = at(receiverEnd) === '.' ? readType(p, receiverEnd)
      : at(receiverEnd) === '?.' ? { ...readType(p, receiverEnd), nullable: true }
      : undefined;
    const close = pairs.get(open)!;
    let body = close + 1;
    let result: Type | undefined;
    if (at(body) === ':') {
      const start = ++body;
      while (body < t.length && !['{', '=', ';'].includes(at(body)) && !newline(body - 1, body)) {
        if (pairs.has(body) && pairs.get(body)! > body) body = pairs.get(body)!;
        body++;
      }
      result = readType(start, body);
    }
    return { name, open, close, body, anonymous, signature: { params: parameters(open + 1, close), result, receiver, inline: at(i - 1) === 'inline' } };
  }
  const functions = new Map<string, Signature>();
  const classes = new Set<string>();
  const variantTypeNames = new Set<string>();
  const classTypeParams = new Map<string, string[]>();
  const genericTypeParamNames = new Set<string>(['T', 'R']);
  const headers = new Map<number, Header>();
  // Real Kotlin resolves an extension call by the receiver's declared
  // (static) type, so `fun A.f()` and `fun B.f()` can coexist and a
  // `val x: A = B()` call still picks A's version. This simulator has no
  // subtype-aware resolution, only exact-name matching -- but that is
  // enough for the deliberate "two receiver types, same extension name"
  // teaching scenario. Only mangle a name into per-receiver-type JS
  // functions when it is actually overloaded this way; a name declared
  // with a single receiver type keeps its plain, unmangled
  // `__kt_extension_<name>` identity so every other extension-using lesson
  // (a single receiver type per name) is completely unaffected.
  const extensionsByReceiver = new Map<string, Map<string, Signature>>();
  const extensionJsName = (name: string, receiverTypeName?: string): string => {
    const overloads = extensionsByReceiver.get(name);
    if (overloads && overloads.size > 1 && receiverTypeName && overloads.has(receiverTypeName)) return `__kt_extension_${name}__${receiverTypeName}`;
    return `__kt_extension_${name}`;
  };
  const declarationBodies = new Set<number>();
  const constructors = new Map<string, Type[]>();
  // A primary constructor's own parameter list (`class Box(var n: Int = 0)`)
  // is never re-lowered as a class body -- only actual class/object/
  // interface BODY braces are protected via `declarationBodies` above --
  // so the top-level statement walk further below still passes straight
  // through these tokens like any other code. A parameter written with
  // `val`/`var` and a default value (`var n: Int = 0`) is then
  // indistinguishable, token-by-token, from a genuine local `var n: Int =
  // 0` declaration statement, and gets registered into the (shared, root)
  // `ctx.vars` map as if it were one -- silently leaking a name that only
  // ever exists as a constructor parameter into every later scope in the
  // file, including a completely unrelated `run`/`apply`/`with` receiver
  // block that reuses the same name for its own receiver property. Every
  // token inside such a parameter list is recorded here so that specific
  // branch can skip it.
  const constructorParamTokens = new Set<number>();
  for (let i = 0; i < t.length; i++) {
    if (at(i) === 'typealias') {
      const end = expressionEnd(i + 3, t.length);
      aliases.set(at(i + 1), readType(i + 3, end));
    }
    if (at(i) === 'class') {
      classes.add(at(i + 1));
      // A generic class's own type parameter list (`class Box<T>(...)`) sits
      // between the class name and its primary constructor's parens -- skip
      // over it (recording the bare parameter names, variance keyword
      // stripped) before looking for the constructor, so a generic class's
      // constructor is registered at all. Without this, `at(i + 2) === '('`
      // never matched for ANY generic class (it's always `<` first), so
      // `constructors` silently stayed empty for every generic class.
      let ctorAt = i + 2;
      if (at(ctorAt) === '<') {
        let depth = 1; let j = ctorAt + 1; let paramStart = j;
        const rawNames: string[] = [];
        while (j < t.length && depth > 0) {
          if (at(j) === '<') depth++;
          else if (at(j) === '>') { depth--; if (depth === 0) { rawNames.push(text(paramStart, j).trim()); } }
          else if (at(j) === ',' && depth === 1) { rawNames.push(text(paramStart, j).trim()); paramStart = j + 1; }
          j++;
        }
        classTypeParams.set(at(i + 1), rawNames.map((n) => n.replace(/^(in|out)\s+/, '').split(/[\s:]/)[0]));
        ctorAt = j;
      }
      if (at(ctorAt) === '(') {
        const ctorClose = pairs.get(ctorAt)!;
        constructors.set(at(i + 1), split(ctorAt + 1, ctorClose).map(([a, b]) => {
          const colon = top(a, b, ':'); const eq = top(a, b, '='); return readType(colon + 1, eq < 0 ? b : eq);
        }));
        for (let k = ctorAt; k <= ctorClose; k++) constructorParamTokens.add(k);
      }
    }
    // Interfaces are registered the same way classes are (into the shared
    // `classes` set the loose `compatible()` name-check below consults) so
    // that passing an implementing class instance to a parameter typed as
    // the interface it implements type-checks. This is not real subtype
    // tracking -- like the class/class case already handled below, it just
    // treats any two known declared type names as mutually compatible --
    // but it is enough to stop a real, valid Kotlin call like
    // `announce(person)` (where `fun announce(g: Greetable)` and `Person :
    // Greetable`) from being wrongly rejected as a type mismatch.
    if (at(i) === 'interface') classes.add(at(i + 1));
    // A type parameter declared `in`/`out` (declaration-site variance) means
    // a differing type ARGUMENT between the declared type and an assigned
    // value's own implemented type is not necessarily a real mismatch --
    // that is the entire point of variance (`Logger<Any>` assignable to a
    // `Logger<String>`-typed variable, since Logger<in T> is contravariant).
    // This simulator has no real subtype-direction checking for generic
    // arguments (JS erases them; nothing here tracks what argument a given
    // instance's class actually supplies for a generic interface/class it
    // implements), so full variance-direction validation is out of scope.
    // Instead: once any parameter of a class/interface is marked variant,
    // `readType` (below) drops the `<...>` argument text from that type's
    // `.name` entirely, falling back to the existing loose "two known
    // declared type names are compatible" rule already used for ordinary
    // interface implementation. An invariant generic (no `in`/`out`) keeps
    // its argument text as part of `.name`, preserving the current (if
    // approximate) behavior of rejecting an explicit argument mismatch.
    if ((at(i) === 'class' || at(i) === 'interface') && at(i + 2) === '<') {
      let depth = 1;
      let j = i + 3;
      let hasVariance = false;
      while (j < t.length && depth > 0) {
        if (at(j) === '<') depth++;
        else if (at(j) === '>') depth--;
        else if (at(j) === 'in' || at(j) === 'out') hasVariance = true;
        j++;
      }
      if (hasVariance) variantTypeNames.add(at(i + 1));
    }
    if (['class', 'object', 'interface'].includes(at(i))) {
      for (let j = i + 2; j < t.length; j++) {
        if (at(j) === '{') { declarationBodies.add(j); break; }
        if (newline(j - 1, j) && ![':', '{'].includes(at(j))) break;
        if (pairs.has(j) && pairs.get(j)! > j) j = pairs.get(j)!;
      }
    }
    if (at(i) === 'fun') {
      const h = header(i);
      if (h) {
        headers.set(i, h);
        if (h.name) functions.set(h.name, h.signature);
        if (h.name && h.signature.receiver) {
          if (!extensionsByReceiver.has(h.name)) extensionsByReceiver.set(h.name, new Map());
          extensionsByReceiver.get(h.name)!.set(h.signature.receiver.name, h.signature);
        }
      }
    }
  }
  const builtins = new Map<string, Signature>([
    // World 16 Lesson 1 only: synchronous/eager coroutine teaching helpers.
    // Registering their zero-parameter blocks prevents the generic trailing-
    // lambda fallback from inventing an `it` parameter and renames calls to
    // the sandbox's __kt_-prefixed runtime functions.
    ['runBlocking', { inline: false, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: unknown }],
    ['coroutineScope', { inline: false, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: unknown }],
    ['supervisorScope', { inline: false, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: unknown }],
    ['CoroutineExceptionHandler', { inline: false, params: [{ name: 'handler', type: { name: 'Function', params: [{ name: 'CoroutineContext' }, { name: 'Throwable' }], result: unit } }], result: { name: 'CoroutineContext' } }],
    ['launch', { inline: false, params: [
      { name: 'context', type: { name: 'CoroutineContext' }, defaultCode: 'undefined' },
      { name: 'block', type: { name: 'Function', params: [], result: unknown } },
    ], result: { name: 'Job' } }],
    ['async', { inline: false, params: [
      { name: 'start', type: unknown, defaultCode: 'undefined' },
      { name: 'block', type: { name: 'Function', params: [], result: unknown } },
    ], result: { name: 'Deferred' } }],
    ['delay', { inline: false, params: [{ name: 'milliseconds', type: { name: 'Int' } }], result: unit }],
    ['yield', { inline: false, params: [], result: unit }],
    ['ensureActive', { inline: false, params: [], result: unit }],
    ['withContext', { inline: false, params: [
      { name: 'context', type: { name: 'CoroutineContext' } },
      { name: 'block', type: { name: 'Function', params: [], result: unknown } },
    ], result: unknown }],
    ['run', { inline: true, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: unknown }],
    ['repeat', { inline: true, params: [{ name: 'times', type: { name: 'Int' } }, { name: 'action', type: { name: 'Function', params: [{ name: 'Int' }], result: unit } }], result: unit }],
    // `with(receiver) { block }` (World 13) is a plain top-level call, not a
    // member call. Registered under its real Kotlin name -- the existing
    // `builtins.has(at(i))` bare-name check further below already renames
    // any occurrence of a `builtins` key to `__kt_<name>` in the generated
    // JS (the same mechanism `run`/`repeat` above already rely on), which
    // is what keeps the literal word `with` -- reserved by JS's own,
    // unrelated `with` statement -- out of the final generated code.
    ['with', { inline: true, params: [{ name: 'receiver', type: { name: 'T' } }, { name: 'block', type: { name: 'Function', receiver: { name: 'T' }, params: [], result: { name: 'R' } } }], result: { name: 'R' } }],
    // World 15's `runCatching { block }` takes a ZERO-parameter block, same
    // shape as `run` above -- registering it here (rather than leaving it
    // unregistered) matters specifically to stop `lambda()`'s own
    // no-signature fallback from defaulting an unregistered call's trailing
    // block to a single `it`-bound parameter, which would be wrong here.
    ['runCatching', { inline: true, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: { name: 'Result' } }],
  ]);
  // `let`/`run`/`apply`/`also` (World 13) are only ever used as extension
  // calls (`X.let { ... }`) -- registering them in `builtins` would also
  // make bare `run { ... }` (already a distinct, receiver-less builtin
  // above) match this receiver-having signature instead. Kept in their own
  // map, consulted only for a dot-prefixed call in `callInfo` below, so the
  // pre-existing standalone `run { ... }` is completely unaffected.
  const scopeReceiver: Type = { name: 'T' };
  const scopeResult: Type = { name: 'R' };
  const scopeMemberSignatures = new Map<string, Signature>([
    ['let', { inline: true, receiver: scopeReceiver, params: [{ name: 'block', type: { name: 'Function', params: [scopeReceiver], result: scopeResult } }], result: scopeResult }],
    ['also', { inline: true, receiver: scopeReceiver, params: [{ name: 'block', type: { name: 'Function', params: [scopeReceiver], result: unknown } }], result: scopeReceiver }],
    ['run', { inline: true, receiver: scopeReceiver, params: [{ name: 'block', type: { name: 'Function', receiver: scopeReceiver, params: [], result: scopeResult } }], result: scopeResult }],
    ['apply', { inline: true, receiver: scopeReceiver, params: [{ name: 'block', type: { name: 'Function', receiver: scopeReceiver, params: [], result: unknown } }], result: scopeReceiver }],
    // Receiver form: `"25".runCatching { toInt() }` (World 15) -- the block
    // is a receiver-style, zero-argument function, same shape as `run`'s
    // receiver entry above.
    ['runCatching', { inline: true, receiver: scopeReceiver, params: [{ name: 'block', type: { name: 'Function', receiver: scopeReceiver, params: [], result: scopeResult } }], result: { name: 'Result' } }],
  ]);
  // Names a receiver-context block's bare identifiers must NEVER resolve
  // to `receiver.name` for -- every global the sandbox actually injects
  // (see the `new Function(...)` parameter list in kotlinRunner.ts) plus
  // the Kotlin-level collection-factory names it recognizes before they are
  // renamed to their `__kt_`-prefixed runtime equivalents, and a few bare
  // keywords/literals that can appear in an expression position.
  const receiverExcludedNames = new Set(['println', 'print', 'listOf', 'mutableListOf', 'arrayOf', 'setOf', 'mutableSetOf', 'mapOf', 'mutableMapOf', 'emptyList', 'Pair', 'TODO', 'true', 'false', 'null', 'it', 'this', 'super']);
  let serial = 0;
  const child = (ctx: Context): Context => ({ ...ctx, vars: new Map(ctx.vars), frames: [...ctx.frames] });
  const frame = (kind: Frame['kind'], result?: Type, label?: string, inline = false): Frame => ({ token: `__kt_target_${++serial}`, label, kind, inline, used: false, result });
  function compatible(expected: Type | undefined, actual: Type | undefined): boolean {
    if (!expected || !actual || expected.name === '?' || actual.name === '?' || expected.name === 'Any' || genericTypeParamNames.has(expected.name)) return true;
    if (actual.name === 'Nothing' && actual.nullable) return !!expected.nullable;
    if (actual.nullable && !expected.nullable) return false;
    if (expected.name !== actual.name) {
      // General class/type checking remains with the existing runner.
      if (classes.has(expected.name) && classes.has(actual.name)) return true;
      // A use-site variance annotation (`Array<in String>`) makes `readType`
      // erase ITS OWN side down to the bare base name ("Array"), but the
      // other side of the comparison (e.g. a plain `val a: Array<Any>`
      // declaration with no variance keyword of its own) keeps its full
      // bracketed name -- so a genuinely valid call would otherwise be
      // rejected on a string mismatch that has nothing to do with a real
      // type error. This engine has no real generic-argument tracking for
      // built-in collection types anyway (unlike the user-defined-class
      // case above, which deliberately keeps comparing full bracketed
      // names so an invariant mismatch like `Box<Int> = Box("seven")`
      // still gets flagged) -- so it's safe to compare only the base name
      // for these specific built-ins.
      const GENERIC_BUILTINS = new Set(['Array', 'List', 'MutableList', 'Set', 'MutableSet', 'Map', 'MutableMap', 'Pair']);
      const baseName = (n: string) => { const i = n.indexOf('<'); return i === -1 ? n : n.slice(0, i); };
      const be = baseName(expected.name), ba = baseName(actual.name);
      if (be === ba && GENERIC_BUILTINS.has(be)) return true;
      return false;
    }
    if (expected.name === 'Function') {
      const ep = expected.receiver ? [expected.receiver, ...expected.params!] : expected.params!;
      const ap = actual.receiver ? [actual.receiver, ...actual.params!] : actual.params!;
      return ep.length === ap.length && ep.every((type, i) => compatible(ap[i], type)) && compatible(expected.result, actual.result);
    }
    return true;
  }
  const typeName = (type?: Type): string => !type ? '?' : type.name === 'Function'
    ? `${type.receiver ? typeName(type.receiver) + '.' : ''}(${type.params!.map(typeName).join(', ')}) -> ${typeName(type.result)}${type.nullable ? '?' : ''}`
    : type.name + (type.nullable ? '?' : '');
  function check(expected: Type | undefined, actual: Type | undefined, i: number) {
    if (!compatible(expected, actual)) fail(`Type mismatch: expected ${typeName(expected)}, got ${typeName(actual)}`, i);
  }
  function infer(a: number, b: number, ctx: Context): Type {
    if (a >= b) return unit;
    if (at(a) === '(' && pairs.get(a) === b - 1) return infer(a + 1, b - 1, ctx);
    if (at(b - 1) === '!!') return { ...infer(a, b - 1, ctx), nullable: false };
    const cast = top(a, b, 'as');
    if (cast >= 0 && at(cast + 1) === '?' && cast + 3 === b) return { name: at(cast + 2), nullable: true };
    const elvis = top(a, b, '?:');
    if (elvis > a && !['val', 'var', 'fun'].includes(at(a))) {
      const left = infer(a, elvis, ctx), right = infer(elvis + 1, b, ctx);
      return { ...left, nullable: !!right.nullable };
    }
    if (at(a) === 'null') return { name: 'Nothing', nullable: true };
    if (at(a) === 'return') return infer(a + 1, b, ctx);
    const h = headers.get(a);
    if (h) return { name: 'Function', params: h.signature.params.map(p => p.type ?? unknown), result: h.signature.result ?? infer(h.body + 1, expressionEnd(h.body + 1, b), ctx), receiver: h.signature.receiver };
    const ref = top(a, b, '::');
    if (ref >= 0) {
      const sig = functions.get(at(ref + 1));
      if (sig) return { name: 'Function', params: ((classes.has(at(a)) || sig.receiver?.name === at(a)) && ref === a + 1 ? [sig.receiver ?? { name: at(a) }] : []).concat(sig.params.map(p => p.type ?? unknown)), result: sig.result ?? unknown };
      if (classes.has(at(ref + 1))) return { name: 'Function', params: constructors.get(at(ref + 1)) ?? [], result: { name: at(ref + 1) } };
    }
    if (at(a) === '{') {
      const end = pairs.get(a)!;
      const arrow = top(a + 1, end, '->');
      const params = arrow < 0 ? [] : parameters(a + 1, arrow);
      const inner = child(ctx);
      params.forEach(p => inner.vars.set(p.name, p.type ?? unknown));
      const last = statements(arrow < 0 ? a + 1 : arrow + 1, end).at(-1);
      return { name: 'Function', params: params.map(p => p.type ?? unknown), result: last ? infer(last[0], last[1], inner) : unit };
    }
    for (const op of ['==', '!=', '<', '>', '<=', '>=', '&&', '||', 'is']) if (top(a, b, op) >= 0) return { name: 'Boolean' };
    const plus = top(a, b, '+');
    if (plus >= 0) {
      const left = infer(a, plus, ctx), right = infer(plus + 1, b, ctx);
      return left.name === 'String' ? left : left.name === right.name ? left : unknown;
    }
    for (const op of ['-', '*', '/', '%']) {
      const index = top(a, b, op);
      if (index > a) return infer(a, index, ctx);
    }
    if (at(b - 1) === ')' && at(b - 2) === '(' && at(b - 4) === '.') {
      const conversions: Record<string, string> = { toLong: 'Long', toInt: 'Int', toFloat: 'Float', toDouble: 'Double', trimIndent: 'String' };
      if (conversions[at(b - 3)]) return { name: conversions[at(b - 3)] };
      if (at(b - 3) === 'average') return { name: 'Double' };
    }
    if (at(b - 1) === 'length' || at(b - 1) === 'size') return { name: 'Int' };
    if (at(a).startsWith('"')) return { name: 'String' };
    if (at(a).startsWith("'")) return { name: 'Char' };
    if (['true', 'false'].includes(at(a))) return { name: 'Boolean' };
    // A decimal point inside a numeric literal (e.g. "10.0") is now part of
    // ONE token (see `lex()`'s dedicated numeric branch), not a separate
    // top-level "." token -- `top(a, b, '.')` can never find it there. Check
    // the literal's own text for a decimal point directly instead. Using
    // `top(...)` here used to appear to work only because the OLD, buggy
    // lexer split a decimal literal into three tokens ("10", ".", "0"),
    // making the "." briefly visible as its own top-level token -- see
    // PITFALLS.md for the tokenizer fix this relied on before it was fixed.
    if (/^-?\d/.test(at(a)) || (at(a) === '-' && /^\d/.test(at(a + 1)))) return { name: /[fF]$/.test(text(a, b)) ? 'Float' : /L$/.test(text(a, b)) ? 'Long' : /\.\d/.test(text(a, b)) ? 'Double' : 'Int' };
    if (at(a + 1) === '(' && pairs.get(a + 1) === b - 1) {
      if (['println', 'print'].includes(at(a))) return unit;
      if (classes.has(at(a))) {
        // A generic class's constructor call (`Box("seven")`) carries no
        // syntax of its own for the type argument -- Kotlin infers it from
        // the constructor's actual arguments. This engine has no general
        // generic-argument inference either, but for the common case of a
        // SINGLE type parameter whose constructor parameter is declared
        // with that exact bare name (`class Box<T>(val v: T)`), the
        // argument passed at that parameter's position tells us the real
        // instantiated type -- inferring it here (rather than leaving the
        // constructed value's type generic-argument-less) is what lets
        // `compatible()` correctly accept a matching declared type
        // (`val b: Box<String> = Box("x")`) and correctly reject a
        // genuine mismatch (`val b: Box<Int> = Box("seven")`) for the
        // RIGHT reason, instead of an accidental string-shape coincidence.
        const typeParams = classTypeParams.get(at(a));
        if (typeParams && typeParams.length === 1) {
          const paramTypes = constructors.get(at(a));
          const argIndex = paramTypes?.findIndex((pt) => pt.name === typeParams[0]) ?? -1;
          if (argIndex >= 0) {
            const args = split(a + 2, b - 1);
            if (args[argIndex]) {
              const [argA, argB] = args[argIndex];
              const argType = infer(argA, argB, ctx);
              if (argType.name !== '?') return { name: `${at(a)}<${argType.name}>` };
            }
          }
        }
        return { name: at(a) };
      }
      return ctx.vars.get(at(a))?.result ?? functions.get(at(a))?.result ?? unknown;
    }
    return a + 1 === b ? ctx.vars.get(at(a)) ?? unknown : unknown;
  }
  function wrap(body: string, f: Frame): string {
    if (!f.used) return body;
    return `\nconst ${f.token} = {};\ntry {\n${body}\n} catch (__kt_jump) {\nif (__kt_jump && __kt_jump.__kt_target === ${f.token}) { return __kt_jump.value; }\nthrow __kt_jump;\n}\n`;
  }
  function statements(a: number, b: number): [number, number][] {
    const parts: [number, number][] = []; let start = a;
    for (let i = a; i < b; i++) {
      if (at(i) === ';') { if (start < i) parts.push([start, i]); start = i + 1; continue; }
      if (i > start && newline(i - 1, i) && !['else', 'catch', 'finally', '.', '?.', '?:', '+', '-', '*', '/', '&&', '||', '{', '('].includes(at(i)) && !['=', '->', '+', '-', '*', '/', ',', 'return'].includes(at(i - 1))) {
        parts.push([start, i]); start = i;
      }
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    if (start < b) parts.push([start, b]);
    return parts;
  }
  // World 15: try/catch/finally. `parseTryChain` walks the token stream
  // starting at a `try` keyword, collecting every consecutive `catch (name:
  // Type) { ... }` clause plus an optional trailing `finally { ... }` --
  // Kotlin requires at least one of the two. `branchBody` is a narrower
  // sibling of `valueBody` above: it lowers a branch's statements the same
  // way, but the caller supplies HOW the final expression should be
  // embedded (`wrap`) instead of always prepending `return` -- reused both
  // for a real `return`-per-branch rendering (the tail-of-block case, and
  // any try/catch used as a value) and, via `renderTry`'s `asValue: false`
  // path, not used at all (plain `lower()` suffices when no value is
  // needed). It deliberately does NOT replicate `valueBody`'s own nested
  // if-expression-branch recursion (see the if-inside-when gap documented
  // in PITFALLS.md for the same kind of narrow, deliberate scope limit) --
  // no lesson content nests an if-expression as a try/catch branch's last
  // statement.
  function parseTryChain(i: number): { tryOpen: number; tryClose: number; catches: { varName: string; typeName: string; open: number; close: number }[]; finallyOpen: number; finallyClose: number; end: number } {
    const tryOpen = i + 1;
    const tryClose = pairs.get(tryOpen)!;
    let cursor = tryClose + 1;
    const catches: { varName: string; typeName: string; open: number; close: number }[] = [];
    while (at(cursor) === 'catch' && at(cursor + 1) === '(') {
      const pClose = pairs.get(cursor + 1)!;
      const varName = at(cursor + 2);
      const typeName = text(cursor + 4, pClose).trim();
      const bodyOpen = pClose + 1;
      const bodyClose = pairs.get(bodyOpen)!;
      catches.push({ varName, typeName, open: bodyOpen, close: bodyClose });
      cursor = bodyClose + 1;
    }
    let finallyOpen = -1, finallyClose = -1;
    if (at(cursor) === 'finally' && at(cursor + 1) === '{') {
      finallyOpen = cursor + 1;
      finallyClose = pairs.get(finallyOpen)!;
      cursor = finallyClose + 1;
    }
    if (!catches.length && finallyOpen < 0) fail('A try expression must have at least one catch or finally block', i);
    return { tryOpen, tryClose, catches, finallyOpen, finallyClose, end: cursor };
  }
  function branchBody(a: number, b: number, ctx: Context, expected: Type | undefined, wrap: (expr: string) => string): string {
    const parts = statements(a, b);
    if (!parts.length) return '';
    const last = parts.pop()!;
    let output = parts.map(([x, y]) => lower(x, y, ctx) + ';').join('\n');
    const [x, y] = last;
    const statement = ['return', 'throw', 'val', 'var', 'for', 'while', 'if'].includes(at(x));
    const code = lower(x, y, ctx, expected);
    output += `\n${statement ? code : wrap(code)};`;
    return output;
  }
  function renderCatchDispatch(chain: ReturnType<typeof parseTryChain>, ctx: Context, branchRender: (open: number, close: number, ctx2: Context) => string): string {
    // The `__kt_target` check preserves the non-local-return jump-object
    // transfer protocol used elsewhere in this file (see the inline-lambda
    // frame handling above) -- a user catch block must never swallow one of
    // these internal transfers meant for an outer frame.
    const errVar = `__kt_e_${++serial}`;
    const arms = chain.catches.map(c => {
      const branchCtx = child(ctx);
      branchCtx.vars.set(c.varName, unknown);
      return `if (${errVar} instanceof ${c.typeName}) {\nconst ${c.varName} = ${errVar};\n${branchRender(c.open, c.close, branchCtx)}\n}`;
    });
    const chainText = arms.join(' else ') + ` else { throw ${errVar}; }`;
    return `catch (${errVar}) {\nif (${errVar} && ${errVar}.__kt_target) { throw ${errVar}; }\n${chainText}\n}`;
  }
  // `asValue: true` renders every branch (try body and each catch body) with
  // its trailing expression turned into a real `return` statement instead
  // of a plain lowered expression -- valid real JS control flow, no IIFE
  // needed, so a `return` a lesson's own try/catch body might independently
  // contain still targets the correct (real, enclosing) function. The ONE
  // caller that still needs an IIFE (`val x = try {...} catch...`, where
  // there is no enclosing function boundary to return into at this point)
  // wraps this function's own output in `(() => { ... })()` itself.
  function renderTry(i: number, ctx: Context, opts: { expected?: Type; asValue: boolean }): { text: string; end: number } {
    const chain = parseTryChain(i);
    const tryBody = opts.asValue
      ? branchBody(chain.tryOpen + 1, chain.tryClose, child(ctx), opts.expected, (e) => `return ${e}`)
      : lower(chain.tryOpen + 1, chain.tryClose, child(ctx));
    const catchText = chain.catches.length
      ? renderCatchDispatch(chain, ctx, (o, c, bctx) => opts.asValue ? branchBody(o + 1, c, bctx, opts.expected, (e) => `return ${e}`) : lower(o + 1, c, bctx))
      : '';
    const finallyText = chain.finallyOpen >= 0 ? `finally {\n${lower(chain.finallyOpen + 1, chain.finallyClose, child(ctx))}\n}` : '';
    const text = `try {\n${tryBody}\n} ${catchText} ${finallyText}`.trim();
    return { text, end: chain.end };
  }
  function valueBody(a: number, b: number, ctx: Context, expected?: Type): string {
    const parts = statements(a, b);
    if (!parts.length) { check(expected, unit, a); return ''; }
    const last = parts.pop()!;
    let output = parts.map(([x, y]) => lower(x, y, ctx) + ';').join('\n');
    const [x, y] = last;
    if (at(x) === 'if' && at(x + 1) === '(') {
      const close = pairs.get(x + 1)!;
      const branch = close + 1;
      if (at(branch) === '{') {
        const end = pairs.get(branch)!;
        if (at(end + 1) === 'else') {
          const other = end + 2;
          const rhs = at(other) === '{' ? valueBody(other + 1, pairs.get(other)!, child(ctx), expected) : valueBody(other, y, child(ctx), expected);
          return output + `\nif (${lower(x + 2, close, ctx)}) {\n${valueBody(branch + 1, end, child(ctx), expected)}\n} else {\n${rhs}\n}`;
        }
      } else {
        const otherwise = top(branch, y, 'else');
        if (otherwise >= 0) return output + `\nif (${lower(x + 2, close, ctx)}) {\n${valueBody(branch, otherwise, child(ctx), expected)}\n} else {\n${valueBody(otherwise + 1, y, child(ctx), expected)}\n}`;
      }
    }
    if (at(x) === 'try' && at(x + 1) === '{') {
      const { text: tryText } = renderTry(x, ctx, { expected, asValue: true });
      return output + '\n' + tryText;
    }
    const statement = ['return', 'throw', 'val', 'var', 'for', 'while', 'if'].includes(at(x));
    const actual = statement ? unit : infer(x, y, ctx);
    if (!statement && expected?.name !== 'Unit') check(expected, actual, x);
    const code = lower(x, y, ctx, expected);
    output += `\n${statement || expected?.name === 'Unit' ? code : 'return ' + code};`;
    return output;
  }
  function lambda(a: number, b: number, ctx: Context, expected?: Type, label?: string, allowed = false): string {
    const arrow = top(a + 1, b, '->');
    let params = arrow < 0 ? [] : parameters(a + 1, arrow);
    if (arrow < 0 && ((!expected?.params && label) || expected?.params?.length === 1)) params = [{ name: 'it', type: expected?.params?.[0] }];
    if (expected?.params && params.length !== expected.params.length) fail(`Lambda requires ${expected.params.length} parameter(s), got ${params.length}`, a);
    const inner = child(ctx);
    params = params.map((p, i) => { check(expected?.params?.[i], p.type, a); const type = p.type ?? expected?.params?.[i] ?? unknown; inner.vars.set(p.name, type); return { ...p, type }; });
    const f = frame('lambda', expected?.result, label, allowed); inner.frames.push(f);
    let receiver = '';
    if (expected?.receiver) { receiver = `__kt_receiver_${++serial}`; inner.receiver = receiver; inner.receiverType = expected.receiver; }
    let body = valueBody(arrow < 0 ? a + 1 : arrow + 1, b, inner, expected?.result);
    // A string template inside a `run`/`apply`/`with` receiver block (World
    // 13) is never re-parsed as Kotlin by this function -- `lower()`
    // leaves a string literal's contents completely untouched, so
    // `$this`/`${this.x}`/a bare `$name` referring to the receiver are
    // still the literal, unresolved characters from the source once
    // `body` is computed here. kotlinRunner.ts's own later pass turns a
    // template placeholder into a real JS expression using WHATEVER
    // identifier text is already there, with no idea that a name like
    // `length` was meant to mean the block's receiver rather than an
    // undeclared bare reference -- so every one of these forms is rewritten
    // to use the real receiver parameter name now, while it's still known.
    // A name already declared locally inside this very block (`const`/`let`
    // in the lowered body), one of the lambda's own parameters, or a name
    // `receiverExcludedNames` already treats as a real global is left
    // alone, matching the equivalent, narrower `$this`-only fixup already
    // used for a declared receiver FUNCTION's body a few lines below.
    if (receiver) {
      const declaredLocally = new Set(params.map(p => p.name));
      for (const m of body.matchAll(/\b(?:const|let)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/g)) declaredLocally.add(m[1]);
      body = body
        .replace(/\$\{\s*this\.([A-Za-z_][A-Za-z0-9_]*)\s*\}/g, `\${${receiver}.$1}`)
        .replace(/\$\{\s*this\s*\}/g, `\${${receiver}}`)
        .replace(/\$this\b/g, `$${receiver}`)
        .replace(/\$\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}/g, (whole, name) =>
          declaredLocally.has(name) || receiverExcludedNames.has(name) ? whole : `\${${receiver}.${name}}`)
        .replace(/\$([A-Za-z_][A-Za-z0-9_]*)\b/g, (whole, name) =>
          declaredLocally.has(name) || receiverExcludedNames.has(name) || name === receiver ? whole : `\${${receiver}.${name}}`);
    }
    return `((${[...(receiver ? [receiver] : []), ...params.map((p, i) => p.name === '_' ? `__kt_unused_${i}` : p.name)].join(', ')}) => {\n${wrap(body, f)}\n})`;
  }
  function callInfo(open: number, ctx: Context): { signature?: Signature; name: string; inline: boolean } {
    const name = at(open - 1) === 'invoke' && ['.', '?.'].includes(at(open - 2)) ? at(open - 3) : at(open - 1);
    const variable = ctx.vars.get(name);
    const memberDot = ['.', '?.'].includes(at(open - 2));
    const signature = variable?.name === 'Function' ? { params: (variable.receiver ? [variable.receiver, ...variable.params!] : variable.params!).map((type, i) => ({ name: `p${i}`, type })), result: variable.result, inline: false }
      : (memberDot && !ctx.vars.has(name) && scopeMemberSignatures.has(name)) ? scopeMemberSignatures.get(name)
      : functions.get(name) ?? (!['.', '?.'].includes(at(open - 2)) && !(ctx.receiver && name === 'repeat') ? builtins.get(name) : undefined);
    return { signature, name, inline: signature?.inline ?? ['forEach', 'map', 'filter', 'fold', 'flatMap', 'mapNotNull', 'filterNot', 'run', 'let', 'also', 'apply', 'repeat'].includes(name) };
  }
  function lower(a: number, b: number, ctx: Context, expected?: Type, callLabel?: string, inline = false, allowInlineValue = false): string {
    if (a >= b) return '';
    const expression = !['val', 'var', 'fun', 'return', 'if', 'for', 'while', 'when', 'class', 'throw'].includes(at(a)) && expressionEnd(a, b) === b;
    if (expression) {
      if (b === a + 1 && ctx.vars.get(at(a))?.inlineOwner && !allowInlineValue) {
        fail(`Inline parameter ${at(a)} cannot be stored or returned as a value; use noinline`, a);
      }
      const elvis = top(a, b, '?:');
      const assertion = lastOperator(a, b, ['!!']);
      const cast = top(a, b, 'as');
      if (elvis >= 0 || assertion >= 0 || cast >= 0 || top(a, b, '?.') >= 0) {
        // Kotlin Elvis binds more tightly than comparisons and Boolean operators.
        for (const operators of [['||'], ['&&'], ['==', '!=', '===', '!=='], ['<', '>', '<=', '>=']]) {
          const splitAt = lastOperator(a, b, operators);
          if (splitAt > a) {
            const expression = `(${lower(a, splitAt, ctx)} ${at(splitAt)} ${lower(splitAt + 1, b, ctx)})`;
            return at(splitAt) === '/' && ['Int', 'Long'].includes(infer(a, splitAt, ctx).name) && ['Int', 'Long'].includes(infer(splitAt + 1, b, ctx).name) ? `Math.trunc(${expression})` : expression;
          }
        }
        if (elvis > a) {
          // World 15: `expr ?: throw X(...)`. JS's `??` requires a real
          // expression on both sides, and `throw` is a statement -- a bare
          // `expr ?? throw x` is invalid JS. `__kt_throw` (a plain runtime
          // function that throws its argument) turns it into a call
          // expression instead, valid anywhere an expression is expected.
          const rhs = at(elvis + 1) === 'throw' ? `__kt_throw(${lower(elvis + 2, b, ctx)})` : lower(elvis + 1, b, ctx);
          return `(${lower(a, elvis, ctx)} ?? ${rhs})`;
        }
        for (const operators of [['+', '-'], ['*', '/', '%']]) {
          const splitAt = lastOperator(a, b, operators);
          if (splitAt > a) {
            const expression = `(${lower(a, splitAt, ctx)} ${at(splitAt)} ${lower(splitAt + 1, b, ctx)})`;
            return at(splitAt) === '/' && ['Int', 'Long'].includes(infer(a, splitAt, ctx).name) && ['Int', 'Long'].includes(infer(splitAt + 1, b, ctx).name) ? `Math.trunc(${expression})` : expression;
          }
        }
        if (cast > a && at(cast + 1) === '?') {
          const target = at(cast + 2);
          if (!['String', 'Boolean', 'Int', 'Long', 'Float', 'Double'].includes(target) || cast + 3 !== b) fail('Unsupported safe cast target; Char and generic casts are not simulated', cast);
          const sourceType = infer(a, cast, ctx);
          const runtimeType = sourceType.runtimeName ?? sourceType.name;
          if (runtimeType === 'Char') fail('Char/String runtime casts are not simulated', cast);
          if (['Int', 'Long', 'Float', 'Double'].includes(target) && sourceType.mutable) fail('Numeric runtime casts from mutable sources are not simulated', cast);
          if (['Int', 'Long', 'Float', 'Double'].includes(target) && !['Int', 'Long', 'Float', 'Double', 'String', 'Boolean', 'Nothing'].includes(runtimeType)) fail('Numeric runtime cast needs a known primitive source type in this editor', cast);
          const condition = target === 'String' ? 'typeof __kt_value === "string"' : target === 'Boolean' ? 'typeof __kt_value === "boolean"' : runtimeType === target ? 'typeof __kt_value === "number"' : 'false';
          return `((__kt_value) => ${condition} ? __kt_value : null)(${lower(a, cast, ctx)})`;
        }
        if (assertion > a) return `__kt_notNull(${lower(a, assertion, ctx)})${lower(assertion + 1, b, ctx)}`;
      }
    }
    const to = top(a, b, 'to');
    if (to > a && !['val', 'var', 'fun', 'return', 'if'].includes(at(a)) && expressionEnd(a, b) === b) {
      return `Pair(${lower(a, to, ctx)}, ${lower(to + 1, b, ctx)})`;
    }
    let out = ''; let cursor = t[a].start;
    const emit = (start: number, end: number, replacement: string) => {
      out += source.slice(cursor, t[start].start) + replacement;
      cursor = t[end - 1].end;
    };
    for (let i = a; i < b; i++) {
      const variable = ctx.vars.get(at(i));
      const guardedInCondition = (text(a, i).includes(`${at(i)} != null &&`) || text(a, i).includes(`${at(i)} == null ||`));
      if (variable?.nullable && variable.name !== 'Function' && variable.runtimeName === 'Nothing' && !guardedInCondition) {
        // A call to an extension whose OWN declared receiver type is
        // itself nullable (`fun String?.lengthOrZero() = ...`) is real
        // Kotlin's documented way to handle a nullable receiver WITHOUT a
        // `?.` at the call site -- the extension is written to accept
        // null and is expected to be called on a nullable value directly
        // (`s.lengthOrZero()`, not `s?.lengthOrZero()`). Excluded from the
        // "needs ?. or !!." rule below, same as the existing `toString`
        // exception.
        const calledExtensionAcceptsNull = functions.get(at(i + 2))?.receiver?.nullable;
        if (at(i + 1) === '.' && !['toString'].includes(at(i + 2)) && !calledExtensionAcceptsNull) fail('Only safe (?.) or non-null asserted (!!.) calls are allowed on this nullable receiver', i);
        if (['Int', 'Long', 'Float', 'Double'].includes(variable.name) && ((i + 1 < b && ['+', '-', '*', '/', '%'].includes(at(i + 1))) || (i > a && ['+', '-', '*', '/', '%'].includes(at(i - 1))))) fail('Nullable numeric value requires a null check or fallback before arithmetic', i);
      }
      if (at(i) === 'filterIsInstance' && at(i + 1) === '<') {
        const type = at(i + 2);
        if (at(i + 3) !== '>' || at(i + 4) !== '(' || at(i + 5) !== ')') fail('Unsupported filterIsInstance type', i);
        if (!['String', 'Boolean', 'Number'].includes(type) && !classes.has(type)) fail('filterIsInstance supports String, Boolean, Number and declared classes; primitive numeric distinctions are not supported', i);
        if (type === 'String' && t.some(token => token.text.startsWith("'"))) fail('String/Char distinction in filterIsInstance is not supported', i);
        const condition = type === 'String' ? 'typeof __kt_item === "string"' : type === 'Boolean' ? 'typeof __kt_item === "boolean"' : type === 'Number' ? 'typeof __kt_item === "number"' : `__kt_item instanceof ${type}`;
        emit(i, i + 6, `filter((__kt_item) => ${condition})`); i += 5; continue;
      }
      if (at(i) === 'is' && at(i + 1) === 'Char') fail('Char runtime type checks are not simulated', i);
      if (at(i) === 'typealias') { const end = expressionEnd(i + 3, b); emit(i, end, ''); i = end - 1; continue; }
      if (at(i) === 'inline' && at(i + 1) === 'fun') { emit(i, i + 1, ''); continue; }
      const h = headers.get(i);
      if (h && ['{', '='].includes(at(h.body))) {
        const inner = child(ctx);
        const sig = h.signature;
        const fnExpected = h.anonymous ? expected : undefined;
        const params = sig.params.map((p, index) => ({ ...p, type: p.type ?? fnExpected?.params?.[index] ?? unknown }));
        const result = sig.result ?? fnExpected?.result ?? (at(h.body) === '{' ? unit : undefined);
        const f = frame('function', result, h.name); inner.frames.push(f);
        params.forEach(p => inner.vars.set(p.name, sig.inline && p.type.name === 'Function' && p.mode !== 'noinline'
          ? {...p.type, inlineOwner: f, inlineMode: p.mode === 'crossinline' ? 'crossinline' : 'inline'} : p.type));
        let receiverParam = '';
        if (sig.receiver || fnExpected?.receiver) {
          receiverParam = `__kt_receiver_${++serial}`;
          inner.receiver = receiverParam;
          inner.receiverType = sig.receiver ?? fnExpected?.receiver;
        }
        const end = at(h.body) === '{' ? pairs.get(h.body)! + 1 : expressionEnd(h.body + 1, b);
        let body = at(h.body) === '{' ? lower(h.body + 1, end - 1, inner) : valueBody(h.body + 1, end, inner, result);
        // `lower()` treats a whole double-quoted string as one opaque token,
        // so `this` written inside a `$this`/`${this}` string-template
        // interpolation is never seen as the token this function already
        // renames everywhere else (`ctx.receiver` substitution above only
        // fires on a bare `this` token outside of any string). Left alone,
        // the raw word "this" survives into the generated JS body, where it
        // no longer refers to the receiver (renamed to `receiverParam`) --
        // it silently becomes the sandboxed call's own `this` (the global
        // object) instead. Covers a bare `$this`/`${this}` and a single
        // receiver property access (`${this.x}`, as a canonicalized
        // extension property's getter body produces -- see
        // `transpileExtensionProperties` in kotlinRunner.ts); a deeper
        // chained/computed expression inside the template (`${this.x.y}`)
        // is out of scope for this narrow fix.
        if (receiverParam) body = body
          .replace(/\$\{\s*this\.([A-Za-z_][A-Za-z0-9_]*)\s*\}/g, `\${${receiverParam}.$1}`)
          .replace(/\$\{\s*this\s*\}/g, `\${${receiverParam}}`)
          .replace(/\$this\b/g, `$${receiverParam}`);
        if (!sig.result && at(h.body) === '=') sig.result = infer(h.body + 1, end, inner);
        const paramCode = (receiverParam ? [receiverParam] : []).concat(params.map(p => `${p.mode === 'vararg' ? 'vararg ' : ''}${p.name}${h.anonymous ? '' : ': ' + (p.type.name === 'Function' ? 'Function' : p.type.name === '?' ? 'Any' : p.type.name) + (p.type.nullable ? '?' : '')}${p.defaultCode ? ' = ' + p.defaultCode : ''}`)).join(', ');
        if (h.anonymous) {
          const actual: Type = { name: 'Function', params: params.map(p => p.type), receiver: sig.receiver ?? fnExpected?.receiver, result: sig.result ?? result ?? unknown };
          check(fnExpected, actual, i);
        }
        const declaredName = h.anonymous ? '' : sig.receiver ? extensionJsName(h.name, sig.receiver.name) : h.name;
        emit(i, end, `${h.anonymous ? 'function' : 'fun ' + declaredName}(${paramCode})${h.anonymous ? '' : ': ' + (sig.result?.name === 'Function' ? 'Function' : (sig.result?.name === '?' ? 'Any' : sig.result?.name) ?? 'Any')} {\n${wrap(body, f)}\n}`);
        i = end - 1; continue;
      }
      if (['val', 'var'].includes(at(i)) && !constructorParamTokens.has(i) && at(i + 1) === '(') {
        const close = pairs.get(i + 1)!;
        if (at(close + 1) === '=') {
          const names = split(i + 2, close).map(([start]) => at(start));
          names.forEach(name => ctx.vars.set(name, unknown));
          emit(i, close + 1, `${at(i) === 'val' ? 'const' : 'let'} [${names.join(', ')}]`);
          i = close; continue;
        }
      }
      if (['val', 'var'].includes(at(i)) && !constructorParamTokens.has(i) && isName(at(i + 1))) {
        const end = expressionEnd(i + 2, b);
        const eq = top(i + 2, end, '=');
        const colon = at(i + 2) === ':' ? i + 2 : -1;
        const declared = colon >= 0 ? readType(colon + 1, eq < 0 ? end : eq) : undefined;
        if (eq >= 0) {
          const name = at(i + 1);
          const actual = infer(eq + 1, end, ctx);
          const inferred = declared ? { ...declared, mutable: at(i) === 'var', runtimeName: actual.runtimeName ?? actual.name } : { ...actual, mutable: at(i) === 'var' };
          const elvisReturn = top(eq + 1, end, '?:');
          if (elvisReturn > eq && at(elvisReturn + 1) === 'return') {
            const value = lower(eq + 1, elvisReturn, ctx);
            const earlyReturn = lower(elvisReturn + 1, end, ctx);
            ctx.vars.set(name, { ...infer(eq + 1, elvisReturn, ctx), nullable: false });
            emit(i, end, `${at(i)} ${name} = ${value};\nif (${name} == null) { ${earlyReturn}; }`);
            i = end - 1; continue;
          }
          const rhs = lower(eq + 1, end, ctx, declared);
          if (!['{', 'fun'].includes(at(eq + 1))) check(declared, infer(eq + 1, end, ctx), eq + 1);
          ctx.vars.set(name, inferred);
          emit(i, end, `${at(i)} ${name}${declared ? ': ' + (declared.name === 'Function' ? 'Function' : declared.name) : ''} = ${rhs}`);
          i = end - 1; continue;
        }
      }
      // A bare `name = value` inside a `run`/`apply`/`with` receiver block
      // (World 13) that ISN'T a known local var can only be a write to a
      // receiver property -- Kotlin has no bare, undeclared assignment
      // target otherwise. Rewriting just the LHS token is enough; the `=`
      // and the RHS lower normally on the following iterations.
      if (ctx.receiver && isName(at(i)) && at(i + 1) === '=' && !['.', '?.'].includes(at(i - 1)) && !ctx.vars.has(at(i)) && !['val', 'var', 'fun'].includes(at(i - 1)) && !functions.has(at(i)) && !classes.has(at(i))) {
        emit(i, i + 1, `${ctx.receiver}.${at(i)}`);
      }
      if (isName(at(i)) && at(i + 1) === '=' && ctx.vars.has(at(i))) {
        const end = expressionEnd(i + 2, b);
        const type = ctx.vars.get(at(i));
        if (type && type.name !== 'Function') ctx.vars.set(at(i), { ...type, runtimeName: infer(i + 2, end, ctx).runtimeName ?? infer(i + 2, end, ctx).name });
        if (type?.name === 'Function') {
          const rhs = lower(i + 2, end, ctx, { ...type, nullable: false });
          if (!['{', 'fun'].includes(at(i + 2))) check(type, infer(i + 2, end, ctx), i + 2);
          emit(i, end, `${at(i)} = ${rhs}`); i = end - 1; continue;
        }
      }
      // World 15: `try { ... } catch (e: T) { ... } catch (...) { ... }
      // finally { ... }`. Whether this construct needs to PRODUCE a value
      // (`val x = try {...} catch...`, `return try {...} catch...`) is
      // decided purely from the REAL token immediately preceding it in the
      // original source (`=` or `return`) -- reliable here because `at()`
      // indexes the whole token stream, not just this call's `[a, b)`
      // sub-range, so it still sees that outer context even when this
      // `try` is the very first token this particular `lower()` call was
      // asked to process (exactly the case for a val/var RHS or a
      // `return`'s value expression). The tail-of-block case (an implicit,
      // `return`-free last expression) is handled separately, directly in
      // `valueBody` above, which is why it's deliberately NOT one of the
      // two triggers here.
      if (at(i) === 'try' && at(i + 1) === '{') {
        const asValue = ['=', 'return'].includes(at(i - 1));
        const { text: tryText, end } = renderTry(i, ctx, { expected, asValue });
        emit(i, end, asValue ? `(() => {\n${tryText}\n})()` : tryText);
        i = end - 1; continue;
      }
      if (at(i) === 'return') {
        let start = i + 1; let target: Frame | undefined;
        if (at(start) === '@') {
          const label = at(start + 1); start += 2;
          target = [...ctx.frames].reverse().find(f => f.label === label);
          if (!target) fail(`Unresolved return label: ${label}`, i);
          const crossed = ctx.frames.slice(ctx.frames.indexOf(target) + 1);
          if (crossed.some(f => f.kind === 'function' || !f.inline)) fail(`Return to ${label} crosses a non-inline function boundary`, i);
        } else {
          target = [...ctx.frames].reverse().find(f => f.kind === 'function');
          if (!target) fail('return is not allowed outside a function', i);
          const crossed = ctx.frames.slice(ctx.frames.indexOf(target) + 1);
          if (crossed.some(f => !f.inline)) fail('Non-local return is only allowed in an inline lambda (not noinline or crossinline)', i);
        }
        let end = newline(start - 1, start) ? start : expressionEnd(start, b);
        const actual = infer(start, end, ctx); check(target.result, actual, i);
        const value = start < end ? lower(start, end, ctx, target.result) : 'undefined';
        if (target === ctx.frames.at(-1) && target.kind === 'function') emit(i, end, `return ${value}`);
        else { target.used = true; emit(i, end, `throw { __kt_target: ${target.token}, value: ${value} }`); }
        i = end - 1; continue;
      }
      // Explicit lambda labels attach to the literal, not to a variable.
      if (isName(at(i)) && at(i + 1) === '@' && at(i + 2) === '{') {
        const end = pairs.get(i + 2)!;
        emit(i, end + 1, lambda(i + 2, end, ctx, expected, at(i), inline)); i = end; continue;
      }
      // Resolve the receiver expression once when binding a member reference.
      if (isName(at(i)) || at(i).startsWith('"')) {
        let ref = i + 1;
        while (ref < b) {
          if (['(', '['].includes(at(ref))) ref = pairs.get(ref)! + 1;
          else if (at(ref) === '.' && isName(at(ref + 1))) ref += 2;
          else break;
        }
        if (ref < b && at(ref) === '::') {
          const receiver = lower(i, ref, ctx);
          const name = at(ref + 1);
          const unbound = ref === i + 1 && (classes.has(at(i)) || ['String', 'Int', 'Double', 'Boolean'].includes(at(i)));
          const extension = functions.get(name)?.receiver;
          const member = extension ? `__kt_extension_${name}(__kt_receiver, ...__kt_args)` : ['plus', 'minus', 'times', 'div'].includes(name)
            ? `(__kt_receiver ${({ plus: '+', minus: '-', times: '*', div: '/' } as Record<string, string>)[name]} __kt_args[0])`
            : `__kt_receiver.${name}(...__kt_args)`;
          const replacement = unbound ? `((__kt_receiver, ...__kt_args) => ${member})`
            : `((__kt_receiver) => ((...__kt_args) => ${member}))(${receiver})`;
          emit(i, ref + 2, replacement); i = ref + 1; continue;
        }
      }
      if (at(i) === '(' && pairs.get(i)! < b) {
        const close = pairs.get(i)!;
        // A call immediately followed by `.extFn(...)` (e.g. `Foo().ext()`,
        // a constructor call receiving an extension call right after it) is
        // about to be re-consumed WHOLESALE by that trailing call's own
        // `receiverCall` handling below, which walks `receiverStart`
        // backward through this call's closing `)` to lower the entire
        // receiver expression as one unit. If this call is also processed
        // here as an ordinary standalone call first, its `emit` commits
        // this range (and advances `cursor` past it) before the trailing
        // call's emit ever runs -- so that later emit's `source.slice`
        // finds nothing left to remove and the original, now-stale call
        // text and its rewritten `__kt_extension_...` replacement both end
        // up concatenated in the output (`new A()__kt_extension_ext(new
        // A())`), a syntax error. Skip this call's own handling entirely
        // and let the trailing receiver call fully own the range instead.
        if (at(close + 1) === '.' && isName(at(close + 2)) && at(close + 3) === '(' &&
          (ctx.vars.get(at(close + 2))?.receiver || functions.get(at(close + 2))?.receiver)) {
          continue;
        }
        const info = callInfo(i, ctx);
        const receiverCall = at(i - 2) === '.' && at(i - 1) !== 'invoke' && (ctx.vars.get(info.name)?.receiver || functions.get(info.name)?.receiver);
        let receiverStart = i - 3;
        if (receiverCall && [')', ']'].includes(at(receiverStart))) {
          receiverStart = pairs.get(receiverStart)!;
          if (isName(at(receiverStart - 1))) receiverStart--;
        }
        const receiverCode = receiverCall ? lower(receiverStart, i - 2, ctx) : '';
        // The receiver's declared (static) type -- not its runtime
        // subtype -- is what real Kotlin uses to resolve which extension
        // applies; `infer` already reports a variable's declared type
        // (narrowed only by an explicit smart-cast guard), which is
        // exactly this simulator's best approximation of that rule.
        const receiverTypeName = receiverCall ? infer(receiverStart, i - 2, ctx).name : undefined;
        if (receiverCall && info.signature && ctx.vars.get(info.name)?.receiver) info.signature = { ...info.signature, params: info.signature.params.slice(1) };
        const callable = isName(at(i - 1)) && !['class', 'interface', 'constructor'].includes(at(i - 2)) && !['if', 'while', 'for', 'when', 'catch', 'switch', 'fun'].includes(at(i - 1));
        const trailingStart = at(close + 1) === '{' ? close + 1 : at(close + 2) === '@' && at(close + 3) === '{' ? close + 3 : -1;
        const trailing = callable && trailingStart >= 0 && trailingStart < b && !declarationBodies.has(trailingStart);
        const args = split(i + 1, close);
        const inlineParameter = ctx.vars.get(info.name);
        if (callable && inlineParameter?.inlineOwner && inlineParameter.inlineMode !== 'crossinline') {
          const crossed = ctx.frames.slice(ctx.frames.indexOf(inlineParameter.inlineOwner) + 1);
          if (crossed.some(f => !f.inline)) fail(`Inline parameter ${info.name} is captured across a non-inline boundary; use crossinline or noinline`, i);
        }
        if (callable && info.signature) {
          const required = info.signature.params.filter(p => !p.defaultCode && p.mode !== 'vararg').length;
          if (args.length + Number(trailing) < required || (!info.signature.params.some(p => p.mode === 'vararg') && args.length + Number(trailing) > info.signature.params.length)) fail(`Wrong argument count for ${info.name}: expected ${info.signature.params.length}`, i);
          if (ctx.vars.get(info.name)?.nullable && !(at(i - 1) === 'invoke' && at(i - 2) === '?.')) fail(`Nullable function ${info.name} requires a safe call or non-null assertion`, i);
        }
        // Named-argument reordering. Collection helpers (windowed/chunked) are
        // real JS functions with their own fixed parameter order, so their
        // names are hardcoded; an ordinary user-defined function already
        // carries its own declared parameter names in `info.signature`, which
        // doubles as the reordering key for a named call to it (e.g.
        // `move(y = 4, x = 2)`).
        const collectionNames: Record<string, string[]> = { windowed: ['size', 'step', 'partialWindows'], chunked: ['size'] };
        const names = at(i - 2) === '.' ? collectionNames[info.name] : info.signature?.params.map(p => p.name);
        let rendered = args.map(([x, y], index) => {
          const param = info.signature?.params[index];
          if (!['{', 'fun'].includes(at(x))) check(param?.type, infer(x, y, ctx), x);
          const start = names && at(x + 1) === '=' ? x + 2 : x;
          const sourceParam = ctx.vars.get(at(start));
          const forwarding = info.inline && param?.mode !== 'noinline' &&
            (param?.mode !== 'crossinline' || sourceParam?.inlineMode === 'crossinline');
          return lower(start, y, ctx, param?.type, callable ? info.name : undefined, info.inline && !param?.mode, forwarding);
        });
        if (['println', 'print'].includes(info.name) && !functions.has(info.name)) {
          rendered = rendered.map((value, index) => ['Float', 'Double'].includes(infer(args[index][0], args[index][1], ctx).name) ? `__kt_decimalText(${value})` : value);
        }
        if (names && args.some(([x]) => at(x + 1) === '=')) {
          // Every unfilled position is left as the literal string 'undefined'
          // rather than reconstructed from the parameter's own default-value
          // expression: a user-defined function is transpiled with real JS
          // default parameters (see the `fun` declaration lowering above), and
          // JS already applies those defaults itself when called with an
          // `undefined` argument -- so no separate default-lookup is needed
          // here. windowed/chunked are plain JS helper functions instead
          // (not real Kotlin defaults), so they keep their own literal
          // fallback values.
          const ordered = info.name === 'windowed' ? ['undefined', '1', 'false']
            : info.name === 'chunked' ? ['undefined']
            : names.map(() => 'undefined');
          args.forEach(([x], index) => {
            const position = at(x + 1) === '=' ? names.indexOf(at(x)) : index;
            if (position < 0 || position >= names.length) fail('Unsupported named argument', x);
            ordered[position] = rendered[index];
          });
          rendered = ordered;
        }
        if (trailing) {
          const last = info.signature?.params.at(-1);
          const end = pairs.get(trailingStart)!;
          const renderedLambda = lambda(trailingStart, end, ctx, last?.type, trailingStart === close + 1 ? info.name : at(close + 1), info.inline && !last?.mode);
          // A named argument plus a trailing lambda (for example
          // `async(start = CoroutineStart.LAZY) { ... }`) has already been
          // expanded above into the signature's full positional array,
          // including an `undefined` placeholder for the final block. Fill
          // that slot instead of appending a third argument after it -- an
          // earlier version appended unconditionally, producing THREE
          // JavaScript arguments for a two-parameter helper the moment a
          // call combined a named argument with a trailing lambda (see
          // PITFALLS.md, World 16 Lesson 2).
          if (info.signature && rendered.length === info.signature.params.length && rendered.at(-1) === 'undefined') rendered[rendered.length - 1] = renderedLambda;
          else rendered.push(renderedLambda);
          emit(i, end + 1, `(${rendered.join(', ')})`); i = end;
        } else {
          const isExtensionCall = receiverCall && functions.get(info.name)?.receiver && !ctx.vars.has(info.name);
          // A real member (a method OR, for a canonicalized extension
          // property -- see `transpileExtensionProperties` in
          // kotlinRunner.ts -- a plain field) with the same name always
          // wins over an extension (see PITFALLS.md); this simulator
          // lowers class bodies in a separate later pass with no
          // visibility here into which members a class actually declares,
          // so the choice is made at runtime instead of statically: a real
          // method is called with the call's own arguments, a real plain
          // field is read directly (ignoring any arguments -- an extension
          // PROPERTY call site is synthesized with `()` it never really
          // had), and only when neither exists does it fall through to the
          // extension. `__kt_recv` evaluates the receiver expression
          // exactly once, so a receiver with side effects (a fresh
          // constructor call, a function call) is not run twice.
          const receiverExpr = isExtensionCall
            ? `((__kt_recv) => __kt_recv == null ? ${extensionJsName(info.name, receiverTypeName)}(__kt_recv${rendered.length ? ', ' : ''}${rendered.join(', ')}) : typeof __kt_recv.${info.name} === 'function' ? __kt_recv.${info.name}(${rendered.join(', ')}) : Object.prototype.hasOwnProperty.call(__kt_recv, '${info.name}') ? __kt_recv.${info.name} : ${extensionJsName(info.name, receiverTypeName)}(__kt_recv${rendered.length ? ', ' : ''}${rendered.join(', ')}))(${receiverCode})`
            : `${info.name}(${receiverCode}${rendered.length ? ', ' : ''}${rendered.join(', ')})`;
          emit(receiverCall ? receiverStart : i, close + 1, receiverCall ? receiverExpr : `(${rendered.join(', ')})`);
          i = close;
        }
        continue;
      }
      if (at(i) === '{') {
        const end = pairs.get(i)!;
        // `when(subject) { branch -> result; ... }` / bare `when { ... }`:
        // a branch's `cond -> result` reads identically to an explicit
        // lambda parameter list (`{ Idle -> ... }`), so without this check
        // the literal-lambda heuristic below misparses the first branch's
        // condition as a lambda parameter and mangles the rest of the
        // block. `when` is a whole-source, balanced-brace pre-pass handled
        // separately by `transpileWhenBlocks` in kotlinRunner.ts, which
        // runs after this function -- leave the block's source untouched
        // here (no emit) so that pass sees pristine Kotlin.
        const whenOpenParen = at(i - 1) === ')' ? pairs.get(i - 1) : undefined;
        const isWhenBlock = at(i - 1) === 'when' || (whenOpenParen !== undefined && at(whenOpenParen - 1) === 'when');
        if (isWhenBlock) { i = end; continue; }
        const arrow = top(i + 1, end, '->');
        const literal = i === a || ['=', '(', ',', 'return', '->'].includes(at(i - 1)) || (arrow >= 0 && /^[A-Za-z_][A-Za-z_0-9\s,:?<>]*$/.test(text(i + 1, arrow)));
        const trailing = !declarationBodies.has(i) && isName(at(i - 1)) && !['else', 'try', 'finally', 'do', 'init', 'when'].includes(at(i - 1)) && at(i - 2) !== 'class' && at(i - 2) !== 'object' && at(i - 2) !== 'interface' && at(i - 2) !== 'companion';
        if (trailing) {
          const info = callInfo(i, ctx), param = info.signature?.params.at(-1);
          emit(i, end + 1, `(${lambda(i, end, ctx, param?.type, info.name, info.inline && !param?.mode)})`);
        } else if (literal) {
          emit(i, end + 1, lambda(i, end, ctx, expected, callLabel, inline));
        } else {
          const branch = child(ctx);
          const close = i - 1;
          const open = pairs.get(close);
          if (at(close) === ')' && open !== undefined && at(open - 1) === 'if') {
            const condition = text(open + 1, close);
            if (!condition.includes('||')) for (const match of condition.matchAll(/\b([A-Za-z_]\w*)\s*!=\s*null/g)) {
              const type = branch.vars.get(match[1]);
              if (type) branch.vars.set(match[1], { ...type, nullable: false });
            }
          }
          emit(i, end + 1, `{\n${lower(i + 1, end, branch)}\n}`);
        }
        i = end; continue;
      }
      if (at(i) === '::') {
        const name = at(i + 1);
        emit(i, i + 2, classes.has(name) ? `((...__kt_args) => new ${name}(...__kt_args))` : name);
        i++; continue;
      }
      if (at(i) === '.' || at(i) === '?.') {
        if (at(i + 1) === 'invoke' && at(i + 2) === '(') { emit(i, i + 2, at(i) === '?.' ? '?.' : ''); i++; continue; }
      }
      if (builtins.has(at(i)) && !(ctx.receiver && at(i) === 'repeat') && !functions.has(at(i)) && !ctx.vars.has(at(i)) && !['.', '?.'].includes(at(i - 1))) emit(i, i + 1, `__kt_${at(i)}`);
      if (ctx.receiver && at(i) === 'this') emit(i, i + 1, ctx.receiver);
      // Any other bare identifier read inside a receiver block (World 13's
      // `run`/`apply`/`with`) that isn't a known local var, a declared
      // function/class, a `builtins` name, or a name the sandbox injects as
      // a real global (see `receiverExcludedNames` above) can only be a
      // receiver member -- Kotlin resolves a bare name to the implicit
      // receiver exactly when nothing else in scope already owns it.
      // `at(i + 1) !== '='` excludes an assignment TARGET, which the
      // dedicated rule above already rewrites on its own -- without this,
      // both rules fire for the same token and the receiver prefix is
      // emitted twice (`receiver.name` then `receiver.namereceiver.name =`).
      else if (ctx.receiver && isName(at(i)) && !ctx.vars.has(at(i)) && !['.', '?.'].includes(at(i - 1)) && at(i + 1) !== '=' && !['val', 'var', 'fun'].includes(at(i - 1)) && !functions.has(at(i)) && !classes.has(at(i)) && !builtins.has(at(i)) && !receiverExcludedNames.has(at(i))) emit(i, i + 1, `${ctx.receiver}.${at(i)}`);
      if (at(i) === '/' && i > a && i + 1 < b && isName(at(i - 1)) && /^(Int|Long)$/.test(ctx.vars.get(at(i - 1))?.name ?? '') && (ctx.vars.get(at(i + 1))?.name === 'Int' || /^\d+$/.test(at(i + 1)))) {
        emit(i - 1, i + 2, `Math.trunc(${at(i - 1)} / ${at(i + 1)})`); i++;
      }
    }
    const result = out + source.slice(cursor, t[b - 1].end);
    return expression && top(a, b, '?.') >= 0 ? `(${result} ?? null)` : result;
  }
  return lower(0, t.length, { vars: new Map(), frames: [] });
}
