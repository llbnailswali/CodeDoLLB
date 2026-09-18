/**
 * Function/lambda lowering for the learning runner. Parsing is token based so
 * strings, comments, nested delimiters and lexical return targets stay intact.
 * This is a teaching subset, not a replacement for Kotlin compiler diagnostics.
 */
type Token = { text: string; start: number; end: number };
type Type = { name: string; nullable?: boolean; params?: Type[]; result?: Type; receiver?: Type };
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
    return aliases.get(text(a, b)) ?? { name: text(a, b).replace(/\s/g, '') };
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
      if (i > a && newline(i - 1, i) && !['.', '?.', '?:', 'else', '{', '(', '+', '-', '*', '/', '&&', '||'].includes(at(i)) && !['=', '->', '+', '-', '*', '/', '&&', '||', ',', 'return'].includes(at(i - 1))) break;
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    return i;
  }
  type Header = { name: string; open: number; close: number; body: number; signature: Signature; anonymous: boolean };
  function header(i: number): Header | undefined {
    let p = i + 1;
    if (at(p) === '<') { while (p < t.length && at(p) !== '>') p++; p++; }
    let open = p;
    while (open < t.length && at(open) !== '(' && !['{', '=', ';'].includes(at(open))) open++;
    if (at(open) !== '(' || !pairs.has(open)) return undefined;
    const anonymous = open === p || at(open - 1) === '.';
    const name = anonymous ? '' : at(open - 1);
    const receiverEnd = anonymous ? open - 1 : open - 2;
    const receiver = at(receiverEnd) === '.' ? readType(p, receiverEnd) : undefined;
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
  const headers = new Map<number, Header>();
  const declarationBodies = new Set<number>();
  const constructors = new Map<string, Type[]>();
  for (let i = 0; i < t.length; i++) {
    if (at(i) === 'typealias') {
      const end = expressionEnd(i + 3, t.length);
      aliases.set(at(i + 1), readType(i + 3, end));
    }
    if (at(i) === 'class') {
      classes.add(at(i + 1));
      if (at(i + 2) === '(') constructors.set(at(i + 1), split(i + 3, pairs.get(i + 2)!).map(([a, b]) => {
        const colon = top(a, b, ':'); const eq = top(a, b, '='); return readType(colon + 1, eq < 0 ? b : eq);
      }));
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
      if (h) { headers.set(i, h); if (h.name) functions.set(h.name, h.signature); }
    }
  }
  const builtins = new Map<string, Signature>([
    ['run', { inline: true, params: [{ name: 'block', type: { name: 'Function', params: [], result: unknown } }], result: unknown }],
    ['repeat', { inline: true, params: [{ name: 'times', type: { name: 'Int' } }, { name: 'action', type: { name: 'Function', params: [{ name: 'Int' }], result: unit } }], result: unit }],
  ]);
  let serial = 0;
  const child = (ctx: Context): Context => ({ ...ctx, vars: new Map(ctx.vars), frames: [...ctx.frames] });
  const frame = (kind: Frame['kind'], result?: Type, label?: string, inline = false): Frame => ({ token: `__kt_target_${++serial}`, label, kind, inline, used: false, result });
  function compatible(expected: Type | undefined, actual: Type | undefined): boolean {
    if (!expected || !actual || expected.name === '?' || actual.name === '?' || expected.name === 'Any' || expected.name === 'T' || expected.name === 'R') return true;
    if (actual.name === 'Nothing' && actual.nullable) return !!expected.nullable;
    if (actual.nullable && !expected.nullable) return false;
    if (expected.name !== actual.name) {
      // General class/type checking remains with the existing runner.
      if (classes.has(expected.name) && classes.has(actual.name)) return true;
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
    if (at(a) === 'null') return { name: 'Nothing', nullable: true };
    if (at(a) === 'return') return infer(a + 1, b, ctx);
    const h = headers.get(a);
    if (h) return { name: 'Function', params: h.signature.params.map(p => p.type ?? unknown), result: h.signature.result ?? infer(h.body + 1, expressionEnd(h.body + 1, b), ctx), receiver: h.signature.receiver };
    const ref = top(a, b, '::');
    if (ref >= 0) {
      const sig = functions.get(at(ref + 1));
      if (sig) return { name: 'Function', params: ((classes.has(at(a)) || sig.receiver?.name === at(a)) && ref > a ? [sig.receiver ?? { name: at(a) }] : []).concat(sig.params.map(p => p.type ?? unknown)), result: sig.result ?? unknown };
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
    if (at(b - 1) === 'length' || at(b - 1) === 'size') return { name: 'Int' };
    if (at(a).startsWith('"')) return { name: 'String' };
    if (at(a).startsWith("'")) return { name: 'Char' };
    if (['true', 'false'].includes(at(a))) return { name: 'Boolean' };
    if (/^-?\d/.test(at(a)) || (at(a) === '-' && /^\d/.test(at(a + 1)))) return { name: top(a, b, '.') >= 0 ? 'Double' : 'Int' };
    if (at(a + 1) === '(' && pairs.get(a + 1) === b - 1) {
      if (['println', 'print'].includes(at(a))) return unit;
      if (classes.has(at(a))) return { name: at(a) };
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
      if (i > start && newline(i - 1, i) && !['else', '.', '?.', '?:', '+', '-', '*', '/', '&&', '||', '{', '('].includes(at(i)) && !['=', '->', '+', '-', '*', '/', ',', 'return'].includes(at(i - 1))) {
        parts.push([start, i]); start = i;
      }
      if (pairs.has(i) && pairs.get(i)! > i) i = pairs.get(i)!;
    }
    if (start < b) parts.push([start, b]);
    return parts;
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
    const body = valueBody(arrow < 0 ? a + 1 : arrow + 1, b, inner, expected?.result);
    return `((${[...(receiver ? [receiver] : []), ...params.map((p, i) => p.name === '_' ? `__kt_unused_${i}` : p.name)].join(', ')}) => {\n${wrap(body, f)}\n})`;
  }
  function callInfo(open: number, ctx: Context): { signature?: Signature; name: string; inline: boolean } {
    const name = at(open - 1) === 'invoke' && ['.', '?.'].includes(at(open - 2)) ? at(open - 3) : at(open - 1);
    const variable = ctx.vars.get(name);
    const signature = variable?.name === 'Function' ? { params: (variable.receiver ? [variable.receiver, ...variable.params!] : variable.params!).map((type, i) => ({ name: `p${i}`, type })), result: variable.result, inline: false } : functions.get(name) ?? (!['.', '?.'].includes(at(open - 2)) && !(ctx.receiver && name === 'repeat') ? builtins.get(name) : undefined);
    return { signature, name, inline: signature?.inline ?? ['forEach', 'map', 'filter', 'fold', 'flatMap', 'mapNotNull', 'filterNot', 'run', 'let', 'also', 'apply', 'repeat'].includes(name) };
  }
  function lower(a: number, b: number, ctx: Context, expected?: Type, callLabel?: string, inline = false): string {
    if (a >= b) return '';
    let out = ''; let cursor = t[a].start;
    const emit = (start: number, end: number, replacement: string) => {
      out += source.slice(cursor, t[start].start) + replacement;
      cursor = t[end - 1].end;
    };
    for (let i = a; i < b; i++) {
      if (at(i) === 'typealias') { const end = expressionEnd(i + 3, b); emit(i, end, ''); i = end - 1; continue; }
      if (at(i) === 'inline' && at(i + 1) === 'fun') { emit(i, i + 1, ''); continue; }
      const h = headers.get(i);
      if (h && ['{', '='].includes(at(h.body))) {
        const inner = child(ctx);
        const sig = h.signature;
        const fnExpected = h.anonymous ? expected : undefined;
        const params = sig.params.map((p, index) => ({ ...p, type: p.type ?? fnExpected?.params?.[index] ?? unknown }));
        params.forEach(p => inner.vars.set(p.name, p.type));
        const result = sig.result ?? fnExpected?.result ?? (at(h.body) === '{' ? unit : undefined);
        const f = frame('function', result, h.name); inner.frames.push(f);
        let receiverParam = '';
        if (sig.receiver || fnExpected?.receiver) {
          receiverParam = `__kt_receiver_${++serial}`;
          inner.receiver = receiverParam;
          inner.receiverType = sig.receiver ?? fnExpected?.receiver;
        }
        const end = at(h.body) === '{' ? pairs.get(h.body)! + 1 : expressionEnd(h.body + 1, b);
        const body = at(h.body) === '{' ? lower(h.body + 1, end - 1, inner) : valueBody(h.body + 1, end, inner, result);
        if (!sig.result && at(h.body) === '=') sig.result = infer(h.body + 1, end, inner);
        const paramCode = (receiverParam ? [receiverParam] : []).concat(params.map(p => `${p.mode === 'vararg' ? 'vararg ' : ''}${p.name}${h.anonymous ? '' : ': ' + (p.type.name === 'Function' ? 'Function' : p.type.name === '?' ? 'Any' : p.type.name)}${p.defaultCode ? ' = ' + p.defaultCode : ''}`)).join(', ');
        if (h.anonymous) {
          const actual: Type = { name: 'Function', params: params.map(p => p.type), receiver: sig.receiver ?? fnExpected?.receiver, result: sig.result ?? result ?? unknown };
          check(fnExpected, actual, i);
        }
        emit(i, end, `${h.anonymous ? 'function' : 'fun ' + (sig.receiver ? '__kt_extension_' : '') + h.name}(${paramCode})${h.anonymous ? '' : ': ' + (sig.result?.name === 'Function' ? 'Function' : (sig.result?.name === '?' ? 'Any' : sig.result?.name) ?? 'Any')} {\n${wrap(body, f)}\n}`);
        i = end - 1; continue;
      }
      if (['val', 'var'].includes(at(i)) && isName(at(i + 1))) {
        const end = expressionEnd(i + 2, b);
        const eq = top(i + 2, end, '=');
        const colon = at(i + 2) === ':' ? i + 2 : -1;
        const declared = colon >= 0 ? readType(colon + 1, eq < 0 ? end : eq) : undefined;
        if (eq >= 0) {
          const name = at(i + 1);
          const inferred = declared ?? infer(eq + 1, end, ctx);
          const rhs = lower(eq + 1, end, ctx, declared);
          if (!['{', 'fun'].includes(at(eq + 1))) check(declared, infer(eq + 1, end, ctx), eq + 1);
          ctx.vars.set(name, inferred);
          emit(i, end, `${at(i)} ${name}${declared ? ': ' + (declared.name === 'Function' ? 'Function' : declared.name) : ''} = ${rhs}`);
          i = end - 1; continue;
        }
      }
      if (isName(at(i)) && at(i + 1) === '=' && ctx.vars.has(at(i))) {
        const end = expressionEnd(i + 2, b);
        const type = ctx.vars.get(at(i));
        if (type?.name === 'Function') {
          const rhs = lower(i + 2, end, ctx, { ...type, nullable: false });
          if (!['{', 'fun'].includes(at(i + 2))) check(type, infer(i + 2, end, ctx), i + 2);
          emit(i, end, `${at(i)} = ${rhs}`); i = end - 1; continue;
        }
      }
      if (at(i) === 'catch' && at(i + 1) === '(') {
        const close = pairs.get(i + 1)!;
        const body = close + 1, end = pairs.get(body)!;
        const name = at(i + 2);
        emit(i, end + 1, `catch (${name}) {
if (${name} && ${name}.__kt_target) { throw ${name}; }
${lower(body + 1, end, child(ctx))}
}`);
        i = end; continue;
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
        const info = callInfo(i, ctx);
        const receiverCall = at(i - 2) === '.' && at(i - 1) !== 'invoke' && (ctx.vars.get(info.name)?.receiver || functions.get(info.name)?.receiver);
        let receiverStart = i - 3;
        if (receiverCall && [')', ']'].includes(at(receiverStart))) {
          receiverStart = pairs.get(receiverStart)!;
          if (isName(at(receiverStart - 1))) receiverStart--;
        }
        const receiverCode = receiverCall ? lower(receiverStart, i - 2, ctx) : '';
        if (receiverCall && info.signature && ctx.vars.get(info.name)?.receiver) info.signature = { ...info.signature, params: info.signature.params.slice(1) };
        const callable = isName(at(i - 1)) && !['class', 'interface', 'constructor'].includes(at(i - 2)) && !['if', 'while', 'for', 'when', 'catch', 'switch', 'fun'].includes(at(i - 1));
        const trailingStart = at(close + 1) === '{' ? close + 1 : at(close + 2) === '@' && at(close + 3) === '{' ? close + 3 : -1;
        const trailing = callable && trailingStart >= 0 && trailingStart < b && !declarationBodies.has(trailingStart);
        const args = split(i + 1, close);
        if (callable && info.signature) {
          const required = info.signature.params.filter(p => !p.defaultCode && p.mode !== 'vararg').length;
          if (args.length + Number(trailing) < required || (!info.signature.params.some(p => p.mode === 'vararg') && args.length + Number(trailing) > info.signature.params.length)) fail(`Wrong argument count for ${info.name}: expected ${info.signature.params.length}`, i);
          if (ctx.vars.get(info.name)?.nullable && !(at(i - 1) === 'invoke' && at(i - 2) === '?.')) fail(`Nullable function ${info.name} requires a safe call or non-null assertion`, i);
        }
        const rendered = args.map(([x, y], index) => {
          const param = info.signature?.params[index];
          if (!['{', 'fun'].includes(at(x))) check(param?.type, infer(x, y, ctx), x);
          return lower(x, y, ctx, param?.type, callable ? info.name : undefined, info.inline && !param?.mode);
        });
        if (trailing) {
          const last = info.signature?.params.at(-1);
          const end = pairs.get(trailingStart)!;
          rendered.push(lambda(trailingStart, end, ctx, last?.type, trailingStart === close + 1 ? info.name : at(close + 1), info.inline && !last?.mode));
          emit(i, end + 1, `(${rendered.join(', ')})`); i = end;
        } else {
          emit(receiverCall ? receiverStart : i, close + 1, receiverCall ? `${functions.get(info.name)?.receiver && !ctx.vars.has(info.name) ? '__kt_extension_' : ''}${info.name}(${receiverCode}${rendered.length ? ', ' : ''}${rendered.join(', ')})` : `(${rendered.join(', ')})`);
          i = close;
        }
        continue;
      }
      if (at(i) === '{') {
        const end = pairs.get(i)!;
        const arrow = top(i + 1, end, '->');
        const literal = i === a || ['=', '(', ',', 'return', '->'].includes(at(i - 1)) || (arrow >= 0 && /^[A-Za-z_][A-Za-z_0-9\s,:?<>]*$/.test(text(i + 1, arrow)));
        const trailing = !declarationBodies.has(i) && isName(at(i - 1)) && !['else', 'try', 'finally', 'do', 'init', 'when'].includes(at(i - 1)) && at(i - 2) !== 'class' && at(i - 2) !== 'object' && at(i - 2) !== 'interface';
        if (literal) emit(i, end + 1, lambda(i, end, ctx, expected, callLabel, inline));
        else if (trailing) {
          const info = callInfo(i, ctx), param = info.signature?.params.at(-1);
          emit(i, end + 1, `(${lambda(i, end, ctx, param?.type, info.name, info.inline && !param?.mode)})`);
        } else emit(i, end + 1, `{\n${lower(i + 1, end, child(ctx))}\n}`);
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
      else if (ctx.receiver && !ctx.vars.has(at(i)) && at(i - 1) !== '.' && ['length', 'uppercase', 'lowercase', 'reversed', 'repeat', 'toInt', 'toString'].includes(at(i))) emit(i, i + 1, `${ctx.receiver}.${at(i)}`);
      if (at(i) === '/' && i > a && i + 1 < b && isName(at(i - 1)) && /^(Int|Long)$/.test(ctx.vars.get(at(i - 1))?.name ?? '') && (ctx.vars.get(at(i + 1))?.name === 'Int' || /^\d+$/.test(at(i + 1)))) {
        emit(i - 1, i + 2, `Math.trunc(${at(i - 1)} / ${at(i + 1)})`); i++;
      }
    }
    return out + source.slice(cursor, t[b - 1].end);
  }
  return lower(0, t.length, { vars: new Map(), frames: [] });
}
