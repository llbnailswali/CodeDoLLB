import { prepareKotlinSource, scanKotlin, KotlinSourceError } from './kotlinSource';
import { KotlinList, KotlinPair, KotlinSequence } from './kotlinCollections';
import { lowerKotlinFunctions, KotlinFunctionError } from './kotlinFunctions';
import {
  kotlinAsync,
  KotlinCoroutineStart,
  kotlinDelay,
  kotlinEnsureActive,
  kotlinYield,
  kotlinWithContext,
  kotlinCoroutineContext,
  kotlinCoroutineName,
  kotlinCoroutineExceptionHandler,
  kotlinCoroutineScope,
  kotlinSupervisorScope,
  KotlinCoroutineNameKey,
  KotlinDispatchers,
  KotlinJobKey,
  kotlinLaunch,
  kotlinRunBlocking,
  kotlinGlobalScopeLaunch,
  prepareCoroutineSource,
} from './kotlinCoroutines';
import {
  Throwable, Exception, RuntimeException, IllegalStateException, IllegalArgumentException,
  NumberFormatException, IndexOutOfBoundsException, ArithmeticException, NoSuchElementException,
  UnsupportedOperationException, KotlinResult, kotlinRunCatching,
} from './kotlinExceptions';

const BUILTIN_EXCEPTION_NAMES = [
  'Throwable', 'Exception', 'RuntimeException', 'IllegalStateException', 'IllegalArgumentException',
  'NumberFormatException', 'IndexOutOfBoundsException', 'ArithmeticException', 'NoSuchElementException',
  'UnsupportedOperationException',
];

/**
 * Kotlin In-Browser Compilation & Execution Engine
 * Evaluates Kotlin code safely, enforces val immutability, type constraints,
 * syntax validity, captures stdout (println/print), and produces structured diagnostics.
 */

export interface KotlinDiagnostic {
  message: string;
  line: number;
  column?: number;
  type: 'syntax_error' | 'compiler_error' | 'type_mismatch' | 'val_reassignment' | 'unresolved_reference' | 'runtime_error';
  codeSnippet?: string;
}

export interface KotlinExecutionResult {
  success: boolean;
  output: string;
  logs: string[];
  returnValue?: any;
  error?: KotlinDiagnostic;
  executionTimeMs: number;
  exitCode: number;
}

interface VarDeclaration {
  name: string;
  isVal: boolean;
  type?: string;
  line: number;
  /** True for `val xs = mutableListOf(...)` (or MutableSet/MutableMap/etc.) -- `xs += x` there is legal Kotlin (resolves to the collection's own `plusAssign`, not a reassignment of `xs` itself), unlike every other `val`. */
  isMutableCollectionRef?: boolean;
}

const MUTABLE_COLLECTION_INITIALIZER = /^(?:mutableListOf|mutableSetOf|mutableMapOf|ArrayList|HashSet|HashMap|LinkedHashSet|LinkedHashMap)\s*[(<]/;
const MUTABLE_COLLECTION_TYPE = /^Mutable(?:List|Set|Map)\s*</;

/**
 * World 15: Kotlin classes are final (non-inheritable) by default -- only
 * `open`/`abstract`/`sealed` classes may be subclassed. This engine had no
 * such check at all (see PITFALLS.md's "Debug exercises: the bug must be
 * reproducible" entry): a `class Parent(...)` (no `open`) subclassed by
 * `class Child : Parent(...)` previously transpiled and ran successfully
 * either way, making a `bugType: 'type'` debug exercise built around
 * exactly this mistake (World 15's Custom Exceptions lesson) auto-"pass"
 * with zero edits, since broken and fixed code produced identical output.
 * Scoped narrowly to classes DECLARED IN THIS SAME SOURCE -- a built-in
 * exception class like `Exception`/`RuntimeException` (see
 * kotlinExceptions.ts) is never flagged, since it is real Kotlin's own
 * open type and this simulator has no source text for it to check a
 * modifier against.
 */
function checkFinalClassInheritance(code: string): KotlinDiagnostic | null {
  const declaredOpen = new Map<string, boolean>();
  for (const line of code.split('\n')) {
    const m = line.match(/^(.*?)\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/);
    if (!m) continue;
    const [, prefix, name] = m;
    const isOpen = /\b(open|abstract|sealed)\b/.test(prefix);
    declaredOpen.set(name, isOpen);
  }
  const superRe = /\bclass\s+[A-Za-z_][A-Za-z0-9_]*(?:\s*<[^>{}]+>)?\s*(?:\([^)]*\))?\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = superRe.exec(code)) !== null) {
    const parentName = match[1];
    if (declaredOpen.get(parentName) === false) {
      const line = code.slice(0, match.index).split('\n').length;
      return { message: `Compilation error: '${parentName}' is final, so it cannot be inherited from -- mark it 'open' (or 'abstract'/'sealed') to allow subclassing`, line, type: 'compiler_error' };
    }
  }
  return null;
}

/**
 * Validates Kotlin code for static errors before execution:
 * - Unbalanced braces/parentheses
 * - Unclosed strings
 * - val reassignment
 * - basic unresolved references
 */
function staticValidateKotlin(code: string): KotlinDiagnostic | null {
  const lines = code.split('\n');

  const stack: { text: string; line: number }[] = [];
  for (const token of scanKotlin(code)) {
    if (token.kind !== 'symbol') continue;
    const line = code.slice(0, token.start).split('\n').length;
    if ('({['.includes(token.text)) stack.push({ text: token.text, line });
    else if (')}]'.includes(token.text)) {
      const open = stack.pop();
      if (!open || '({['.indexOf(open.text) !== ')}]'.indexOf(token.text)) return { message: 'Syntax error: mismatched closing delimiter', line, type: 'syntax_error' };
    }
  }
  if (stack.length) return { message: 'Syntax error: unclosed delimiter', line: stack.at(-1)!.line, type: 'syntax_error' };

  // World 16 Lesson 3: a suspend function may only be called from another
  // suspend function or a recognized coroutine builder body. This narrow
  // source-level check covers ordinary block-bodied functions, including the
  // lesson's canonical invalid `fun main() { println(load()) }`, before the
  // suspend modifier is intentionally erased for JavaScript lowering.
  const suspendNames = [...code.matchAll(/\bsuspend\s+fun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)].map(match => match[1]);
  if (suspendNames.length) {
    const ordinaryFunctions = /\bfun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)[^{=]*\{/g;
    for (const fn of code.matchAll(ordinaryFunctions)) {
      if (/suspend\s+$/.test(code.slice(0, fn.index ?? 0))) continue;
      const open = (fn.index ?? 0) + fn[0].lastIndexOf('{');
      let depth = 1, end = open + 1;
      while (end < code.length && depth) {
        if (code[end] === '{') depth++;
        else if (code[end] === '}') depth--;
        end++;
      }
      const body = code.slice(open + 1, Math.max(open + 1, end - 1));
      const illegal = suspendNames.find(name => new RegExp(`\\b${name}\\s*\\(`).test(body));
      if (illegal) return {
        message: `Suspend function '${illegal}' can be called only from a coroutine or another suspend function`,
        line: code.slice(0, open).split('\n').length,
        type: 'compiler_error',
      };
    }
  }

  const abstractContracts = [...code.matchAll(/abstract\s+class\s+([A-Za-z_][A-Za-z0-9_]*)[^\{]*\{([\s\S]*?)\n?\}/g)]
    .map((match) => ({ base: match[1], methods: [...match[2].matchAll(/abstract\s+fun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)].map((method) => method[1]) }));
  for (const contract of abstractContracts) {
    if (!contract.methods.length) continue;
    const subclasses = [...code.matchAll(new RegExp(`\\bclass\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*:\\s*${contract.base}\\s*\\([^)]*\\)(?:\\s*\\{([\\s\\S]*?)\\})?`, 'g'))];
    for (const subclass of subclasses) {
      const body = subclass[2] ?? '';
      const missing = contract.methods.find((method) => !new RegExp(`\\boverride\\s+fun\\s+${method}\\s*\\(`).test(body));
      if (missing) return {
        message: `Class ${subclass[1]} must implement ${missing}() or be abstract`,
        line: code.slice(0, subclass.index).split('\n').length,
        type: 'compiler_error',
      };
    }
  }

  // 3. Track val vs var declarations and catch val reassignment
  const declaredVars: Map<string, VarDeclaration> = new Map();
  // Standard built-ins that shouldn't be flagged as unresolved
  const builtIns = new Set([
    'println', 'print', 'listOf', 'mutableListOf', 'mapOf', 'setOf',
    'maxOf', 'minOf', 'repeat', 'arrayOf', 'Int', 'String', 'Boolean', 'Double', 'Float',
    'true', 'false', 'null', 'args', 'this', 'it'
  ]);

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const commentIdx = rawLine.indexOf('//');
    const lineWithoutComment = commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine;
    const trimmed = lineWithoutComment.trim();
    if (!trimmed) continue;

    // Detect function parameters e.g., fun foo(player: String, coins: Int)
    const funMatch = trimmed.match(/fun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)/);
    if (funMatch && funMatch[2]) {
      const params = funMatch[2].split(',');
      for (const p of params) {
        const pTrimmed = p.trim();
        const pMatch = pTrimmed.match(/(?:(val|var)\s+)?([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)/);
        if (pMatch) {
          const isVal = pMatch[1] !== 'var'; // function params in Kotlin are default val (read-only)
          const varName = pMatch[2];
          declaredVars.set(varName, {
            name: varName,
            isVal,
            type: pMatch[3],
            line: i + 1,
          });
        }
      }
    }

    // Detect val/var declarations: val x: Int = 5 or val x = 5
    const declMatch = trimmed.match(/\b(val|var)\s+([a-zA-Z0-9_]+)(?:\s*:\s*([a-zA-Z0-9_<>]+))?(?:\s*=\s*(.+))?/);
    if (declMatch) {
      const isVal = declMatch[1] === 'val';
      const varName = declMatch[2];
      const type = declMatch[3];
      const initialExpr = declMatch[4]?.trim();

      // Check simple static type mismatch on declaration
      if (type && initialExpr) {
        if (type === 'Int' && (initialExpr.startsWith('"') || /^-?\d[\d_]*\.\d/.test(initialExpr))) {
          return {
            message: `Type mismatch: Inferred type is not Int`,
            line: i + 1,
            type: 'type_mismatch',
            codeSnippet: rawLine.trim(),
          };
        } else if (type === 'String' && !initialExpr.startsWith('"') && !initialExpr.endsWith('"') && !isNaN(Number(initialExpr))) {
          return {
            message: `Type mismatch: Inferred type is Int but String was expected`,
            line: i + 1,
            type: 'type_mismatch',
            codeSnippet: rawLine.trim(),
          };
        } else if (type === 'Boolean' && initialExpr !== 'true' && initialExpr !== 'false' && !initialExpr.includes('==') && !initialExpr.includes('>')) {
          if (!isNaN(Number(initialExpr))) {
            return {
              message: `Type mismatch: Inferred type is Int but Boolean was expected`,
              line: i + 1,
              type: 'type_mismatch',
              codeSnippet: rawLine.trim(),
            };
          }
        }
      }

      const isMutableCollectionRef =
        (!!type && MUTABLE_COLLECTION_TYPE.test(type)) || (!!initialExpr && MUTABLE_COLLECTION_INITIALIZER.test(initialExpr));
      declaredVars.set(varName, {
        name: varName,
        isVal,
        type,
        line: i + 1,
        isMutableCollectionRef,
      });
      continue;
    }

    // Check reassignments to val: e.g. player = "Bob" or coins += 15.
    // `=(?!=)` (not `=`) is required: a bare `=` alternative also matches the
    // FIRST `=` of a `==` comparison, so a line starting with a comparison
    // like `x == 3` was wrongly read as an assignment attempt `x = ...` and
    // rejected as a val-reassignment error -- confirmed as a real, previously
    // dormant bug: `with(receiver) { x == 3 && y == 4 }` runs fine when the
    // comparison stays on the SAME line as `with(...) {`, but throws this
    // false positive the moment it's reformatted onto its own line, which is
    // exactly what happens for a multi-statement/multi-line block body.
    const assignMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|(?:\/=)|=(?!=)|\+\+|--)/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const op = assignMatch[2];
      const decl = declaredVars.get(varName);
      // `xs += x` on `val xs = mutableListOf(...)` is legal Kotlin: `+=`/`-=`
      // resolve to the collection's own `plusAssign`/`minusAssign` operator,
      // which mutates the collection in place rather than reassigning `xs`
      // itself -- only `=`/`++`/`--` (or `+=`/`-=` on anything else) really
      // reassign the val reference. Confirmed as a real, previously dormant
      // false positive the same way as the `==` case above: `xs += x` buried
      // mid-line (`fun add(x: String) { xs += x }`) was invisible to this
      // line-start-anchored check until reformatted onto its own line.
      const isLegalCompoundOnMutableCollection = decl?.isMutableCollectionRef && (op === '+=' || op === '-=');
      if (decl && decl.isVal && !isLegalCompoundOnMutableCollection) {
        return {
          message: `Val cannot be reassigned: '${varName}' is declared with 'val'`,
          line: i + 1,
          type: 'val_reassignment',
          codeSnippet: rawLine.trim(),
        };
      }
    }
  }

  return null;
}

/**
 * Conservatively infers which val/var names (AND function parameter names)
 * are statically known to be Int/Long (as opposed to Double/Float/String/
 * Boolean/etc.), from explicit type annotations or a bare integer-literal
 * initializer. Used only to decide when `/` needs Kotlin's Int-division
 * truncation -- see `wrapIntDivision` below. Deliberately does not attempt
 * to trace values through arbitrary expressions; when a variable's type
 * can't be determined this way, it's simply left out of the set, which
 * preserves today's (already-shipped, already-tested) plain-JS-division
 * behavior for it.
 */
function inferIntTypedVars(code: string): Set<string> {
  const intVars = new Set<string>();
  for (const rawLine of code.split('\n')) {
    const commentIdx = rawLine.indexOf('//');
    const line = commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine;

    const declMatch = line.match(/\b(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*([a-zA-Z_][a-zA-Z0-9_<>]*))?\s*=\s*(.+)$/);
    if (declMatch) {
      const [, name, explicitType, rhsRaw] = declMatch;
      const rhs = rhsRaw.trim();
      if (explicitType) {
        if (explicitType === 'Int' || explicitType === 'Long') intVars.add(name);
      } else if (/^-?\d[\d_]*[lL]?$/.test(rhs)) {
        intVars.add(name);
      }
    }

    // Function parameters with an explicit Int/Long type, e.g.
    // `fun average(a: Int, b: Int): Int {` -- these never go through the
    // val/var declaration pattern above, so without this a division
    // between two Int PARAMETERS (a very common pattern in this world's
    // content) would silently fail to truncate.
    const funMatch = line.match(/\bfun\s+[a-zA-Z0-9_]+\s*\(([^)]*)\)/);
    if (funMatch) {
      for (const param of funMatch[1].split(',')) {
        const paramMatch = param.trim().match(/^(?:vararg\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(Int|Long)\b/);
        if (paramMatch) intVars.add(paramMatch[1]);
      }
    }
  }
  return intVars;
}

/**
 * Finds the [start, end) character ranges of double-quoted string literals
 * on a single line (respecting backslash escapes), so `wrapIntDivision`
 * never rewrites a `/` that only appears inside a string.
 */
function findStringRanges(line: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  let inString = false;
  let start = -1;
  let escaped = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '\\' && inString) {
      escaped = !escaped;
      continue;
    }
    if (ch === '"' && !escaped) {
      if (!inString) {
        inString = true;
        start = i;
      } else {
        inString = false;
        ranges.push([start, i]);
      }
    } else {
      escaped = false;
    }
  }
  return ranges;
}

/**
 * Kotlin's `/` performs truncating integer division when BOTH operands are
 * Int/Long -- `47 / 5` is `9`, not `9.4`. Plain JS `/` never truncates, so
 * without this, any graded writeRun/debug exercise that divides two Ints
 * with a non-exact quotient would compute the wrong (fractional) result in
 * this simulator even when the learner's Kotlin is perfectly correct -- see
 * PITFALLS.md. This only rewrites the narrow, unambiguous case of a bare
 * identifier or integer literal divided by another bare identifier or
 * integer literal (the pattern actual lesson content uses); anything more
 * complex (parenthesized sub-expressions, chained arithmetic) is left
 * untouched rather than guessed at.
 */
function wrapIntDivision(line: string, intVars: Set<string>): string {
  if (!line.includes('/')) return line;
  const stringRanges = findStringRanges(line);
  const isInString = (idx: number) => stringRanges.some(([s, e]) => idx > s && idx < e);

  // The trailing `(?!\.\d)` on each digit-literal alternative stops this from
  // matching just the INTEGER part of a decimal literal on either side (e.g.
  // the `2` in `a / 2.0`) -- without it, `a / 2.0` becomes
  // `Math.trunc(a / 2).0`, a syntax error, because the regex greedily
  // consumes "2" (a `\b` word boundary already exists between "2" and ".")
  // and leaves the ".0" dangling right after the inserted `Math.trunc(...)`
  // call. The leading `(?<![.\d])` lookbehind already protects the mirror
  // case (matching the fractional digits of a decimal literal, e.g. the `0`
  // in `5.0 / b`, as its own operand); this closes the equivalent gap on the
  // other side of the decimal point.
  const divRe = /(?<![.\d])(-?\d[\d_]*(?!\.\d)|[a-zA-Z_][a-zA-Z0-9_]*)\s*\/\s*(-?\d[\d_]*(?!\.\d)|[a-zA-Z_][a-zA-Z0-9_]*)\b/g;

  return line.replace(divRe, (match, left, right, offset) => {
    if (isInString(offset)) return match;
    const isIntLiteral = (tok: string) => /^-?\d[\d_]*$/.test(tok);
    const leftIsInt = isIntLiteral(left) || intVars.has(left);
    const rightIsInt = isIntLiteral(right) || intVars.has(right);
    return leftIsInt && rightIsInt ? `Math.trunc(${left} / ${right})` : match;
  });
}

/**
 * Rewrites a Kotlin range-based `for` loop header into a plain JS `for`
 * loop, since `for (i in 1..10) { ... }` is not valid JS syntax at all.
 * Supports exactly the range forms World 4 (Loop Master) teaches:
 * `a..b`, `a until b` (exclusive upper bound), `a downTo b` (counting
 * down), and any of those with a trailing `step n`. Deliberately does
 * NOT support `for (x in someCollection)` (iterating a List/Set/Map) --
 * that's a later-world topic (Collections), out of scope here.
 *
 * Must run BEFORE `transformTypeChecks`/`transformRanges` in the per-line
 * pipeline: those two look for a bare `in`/`!in` keyword to rewrite as a
 * boolean check, and a for-loop header also contains the word `in` --
 * once this function has fully rewritten the header into a plain JS
 * `for (let i = ...; ...; ...) {`, there's no `in` keyword left for them
 * to (mis)match.
 */
function transformForLoops(line: string): string {
  // Destructured Map iteration: `for ((key, value) in map) { ... }` -> JS
  // `for (const [key, value] of map) {`, since iterating a JS Map yields
  // [key, value] tuples natively. Must run before the bare-identifier
  // branch below, which would not match a parenthesized `(key, value)`
  // anyway (it requires a single identifier), but is kept as a distinct
  // regex/replace for clarity.
  const destructured = line.replace(
    /\bfor\s*\(\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)\s+in\s+(.+)\)\s*\{\s*$/,
    (_whole, keyName, valName, mapExpr) => `for (const [${keyName}, ${valName}] of ${mapExpr.trim()}) {`
  );
  if (destructured !== line) return destructured;

  return line.replace(
    /\bfor\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s+in\s+(.+)\)\s*\{\s*$/,
    (whole, varName, rangeExprRaw) => {
      const expr = rangeExprRaw.trim();
      let m: RegExpMatchArray | null;

      if ((m = expr.match(/^(.+?)\s+downTo\s+(.+?)\s+step\s+(.+)$/))) {
        const [, start, end, step] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} >= ${end.trim()}; ${varName} -= ${step.trim()}) {`;
      }
      if ((m = expr.match(/^(.+?)\s+downTo\s+(.+)$/))) {
        const [, start, end] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} >= ${end.trim()}; ${varName}--) {`;
      }
      if ((m = expr.match(/^(.+?)\.\.(.+?)\s+step\s+(.+)$/))) {
        const [, start, end, step] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} <= ${end.trim()}; ${varName} += ${step.trim()}) {`;
      }
      if ((m = expr.match(/^(.+?)\s+until\s+(.+?)\s+step\s+(.+)$/))) {
        const [, start, end, step] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} < ${end.trim()}; ${varName} += ${step.trim()}) {`;
      }
      if ((m = expr.match(/^(.+?)\.\.(.+)$/))) {
        const [, start, end] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} <= ${end.trim()}; ${varName}++) {`;
      }
      if ((m = expr.match(/^(.+?)\s+until\s+(.+)$/))) {
        const [, start, end] = m;
        return `for (let ${varName} = ${start.trim()}; ${varName} < ${end.trim()}; ${varName}++) {`;
      }
      // A bare identifier (no .., until, or downTo) -- treat it as an
      // array-like value and iterate its VALUES with JS `for...of`.
      // This specifically covers `for (item in varargParam)` (this
      // world's `vararg` produces a real JS array at runtime). Without
      // this, the line would fall through unchanged and JS would still
      // happily parse `for (item in arr)` as its OWN native for-in
      // loop -- which iterates ARRAY INDICES AS STRINGS, not values, a
      // silent-wrong-answer bug rather than a clear error. `for...of`
      // is the correct translation both for a vararg array today and
      // for a real Kotlin collection once that becomes supported later.
      if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(expr)) {
        return `for (const ${varName} of ${expr}) {`;
      }
      // Any other unrecognized range form -- leave untouched rather
      // than guess; this deliberately surfaces as a clear JS error
      // downstream instead of silently misbehaving.
      return whole;
    }
  );
}

/**
 * Rewrites `x in a..b` / `x !in a..b` (numeric or single-quoted-char range
 * endpoints) into a plain boolean expression. Used both as a standalone
 * per-line transform (e.g. `if (x in 1..10)`) and reused, with the subject
 * substituted in directly, by `transpileWhenBlocks` for `when`'s range
 * branches.
 */
function transformRanges(line: string): string {
  return line.replace(
    /([a-zA-Z_][a-zA-Z0-9_.]*|\([^()]*\))\s+(!in|in)\s+(-?\d[\d_]*|'.')\.\.(-?\d[\d_]*|'.')/g,
    (_m, expr, kw, lo, hi) => {
      const check = `((${expr}) >= ${lo} && (${expr}) <= ${hi})`;
      return kw === '!in' ? `!${check}` : check;
    }
  );
}

/**
 * Rewrites `x is Type` / `x !is Type` into a runtime `typeof` check.
 * Deliberately supports only Int/Long/Float/Double (all -> 'number'),
 * String, and Boolean -- the distinctions this simulator's plain-JS-value
 * model can actually tell apart. `is Char` is intentionally NOT supported:
 * a Kotlin Char and a same-text String are indistinguishable JS strings
 * here (see PITFALLS.md), so an `is Char` check would silently misbehave
 * exactly like the Char-vs-String debug bugs documented there.
 */
/** Every declared `interface Name` in `code`, bodied or bodyless -- used by
 * `transformTypeChecks` to pick `instanceof` (a real class/object, backed
 * by a real prototype chain) vs the `__kt_implements_Name` marker property
 * (an interface, erased to a plain object with none) for an `is` check,
 * since calling `instanceof` against the latter throws a TypeError
 * ("right-hand side ... is not callable") rather than just being wrong. */
function getAllInterfaceNames(code: string): Set<string> {
  const names = new Set<string>();
  const re = /\binterface\s+([A-Za-z_][A-Za-z0-9_]*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) names.add(m[1]);
  return names;
}

function transformTypeChecks(line: string, interfaceNames: Set<string> = new Set()): string {
  const typeofMap: Record<string, string> = {
    Int: 'number', Long: 'number', Float: 'number', Double: 'number',
    String: 'string', Boolean: 'boolean',
  };
  return line.replace(
    // A primitive Kotlin type maps to a typeof check (never Char -- a
    // single-quoted Char and a same-text String are indistinguishable JS
    // strings, see the standing pitfall on this). A known interface name
    // (`Open is Trackable`) checks the `__kt_implements_Trackable` marker
    // instead -- see `getAllInterfaceNames`'s doc comment for why.
    // Anything else (a declared class/object) falls back to `instanceof`,
    // matching the identical class-vs-primitive split already used inside
    // a `when` branch's `is Type ->` condition (see `parseWhenBranches`)
    // -- this is the standalone-expression form of the same check.
    // The trailing boundary is a negative lookahead, not `\b`: when the
    // optional `<...>` generic suffix IS consumed, the character right
    // after it (typically `)` or end of line) is non-word, and so is the
    // `>` right before it -- `\b` requires a word/non-word transition, so
    // it would fail exactly there and force the regex to backtrack into
    // NOT consuming the generic after all, silently leaving `<Int>`
    // dangling, unconverted, in the output (confirmed directly: `s is
    // Sequence<Int>` produced `(s instanceof Sequence)<Int>`, a syntax
    // error). `(?![A-Za-z0-9_])` only asserts "not immediately followed by
    // another identifier character," which is satisfiable regardless of
    // what came just before it.
    // World 15: the LHS can also be a zero/simple-arg method call on a
    // dotted receiver (`r.exceptionOrNull() is NumberFormatException`) --
    // the optional `(?:\([^()]*\))?` tail covers that shape without
    // needing full nested-call parsing, matching every lesson usage.
    /([a-zA-Z_][a-zA-Z0-9_.]*(?:\([^()]*\))?|\([^()]*\))\s+(is|!is)\s+([A-Z][a-zA-Z0-9_]*)(?:<[^<>]*>)?(?![A-Za-z0-9_])/g,
    (_m, expr, kw, type) => {
      const jsType = typeofMap[type];
      const check = jsType
        ? `typeof (${expr}) === '${jsType}'`
        : interfaceNames.has(type)
          ? `Boolean((${expr}) && (${expr}).__kt_implements_${type})`
          : `(${expr}) instanceof ${type}`;
      return kw === '!is' ? `!(${check})` : `(${check})`;
    }
  );
}

/**
 * Recursively converts a Kotlin if-expression (including chained `else if`)
 * into nested JS ternaries.
 */
// World 15: a `throw` in an if-expression branch (`if (cond) value else
// throw X(...)`) is real, common Kotlin -- `throw` has type `Nothing`,
// which is compatible with any expected type. JS has no such expression
// (`throw` is a statement, so a bare `throw` inside a ternary branch is a
// SyntaxError), so a branch that is exactly `throw EXPR` is rewritten to
// call `__kt_throw(EXPR)` (a plain function that throws its argument)
// instead -- valid anywhere an expression is expected.
function wrapThrowBranch(branch: string): string {
  const m = branch.match(/^throw\s+(.+)$/);
  return m ? `__kt_throw(${m[1]})` : branch;
}
function convertIfExpr(expr: string): string {
  const m = expr.match(/^\s*if\s*\((.+?)\)\s+([^\n]+?)\s+else\s+([^\n]+)$/);
  if (!m) return wrapThrowBranch(expr.trim());
  const [, cond, thenBranch, elseBranch] = m;
  return `((${cond}) ? (${wrapThrowBranch(thenBranch.trim())}) : (${convertIfExpr(elseBranch.trim())}))`;
}

/**
 * Converts Kotlin if-expressions (single-line or chained else-if)
 * into JS ternaries.
 */
function transformIfExpression(line: string): string {
  const match = line.match(/(=\s*|\breturn\s+)(if\s*\(.+?\)\s+.+?\s+else\s+.+)$/);
  if (!match || match.index === undefined) return line;
  const prefix = match[1];
  const ifExpr = match[2];
  return line.slice(0, match.index) + prefix + convertIfExpr(ifExpr);
}

/**
 * Rewrites multiline if-expressions with braces:
 *   val x = if (cond) { ... } else { ... }
 * or
 *   return if (cond) { ... } else { ... }
 * into an IIFE:
 *   val x = (() => { if (cond) { ... } else { ... } })()
 */
function transpileMultilineIfExpressions(code: string): string {
  const ifRe = /(=\s*|\breturn\s+)if\s*\(([^)]+)\)\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = ifRe.exec(code)) !== null) {
    const prefix = match[1];
    const condition = match[2].trim();
    const ifStart = match.index;
    const thenBraceStart = match.index + match[0].length - 1;

    let depth = 1;
    let i = thenBraceStart + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) {
      ifRe.lastIndex = thenBraceStart + 1;
      continue;
    }
    const thenBody = code.slice(thenBraceStart + 1, i - 1).trim();

    const remaining = code.slice(i);
    const elseMatch = remaining.match(/^\s*else\s*\{/);
    if (!elseMatch) {
      ifRe.lastIndex = i;
      continue;
    }
    const elseBraceStart = i + elseMatch[0].length - 1;
    depth = 1;
    let j = elseBraceStart + 1;
    for (; j < code.length && depth > 0; j++) {
      if (code[j] === '{') depth++;
      else if (code[j] === '}') depth--;
    }
    if (depth !== 0) {
      ifRe.lastIndex = elseBraceStart + 1;
      continue;
    }
    const elseBody = code.slice(elseBraceStart + 1, j - 1).trim();
    const blockEnd = j;

    const thenReturn = thenBody.startsWith('return ') ? thenBody : `return (${thenBody})`;
    const elseReturn = elseBody.startsWith('return ') ? elseBody : `return (${elseBody})`;

    const rewritten = `${prefix}(() => { if (${condition}) { ${thenReturn}; } else { ${elseReturn}; } })()`;
    result += code.slice(cursor, ifStart) + rewritten;
    cursor = blockEnd;
    ifRe.lastIndex = blockEnd;
  }
  result += code.slice(cursor);
  return result;
}

/**
 * Strips Kotlin generic type parameters from collection helper calls:
 * e.g. mutableListOf<Int>() -> mutableListOf()
 */
function stripCollectionGenerics(code: string): string {
  return code.replace(/\b(emptyList|listOf|mutableListOf|arrayOf|setOf|mutableSetOf|mapOf|mutableMapOf)<[a-zA-Z0-9_?,<>\s]+>\s*\(/g, '$1(');
}

/**
 * `inline fun <reified T> name(...): R = ...T is used inside...` has no
 * direct JS equivalent: real Kotlin substitutes T with the actual type
 * argument at every call site at compile time (that's what "reified"
 * means), but this engine has no per-call-site inlining/specialization
 * mechanism at all. Rather than build one, T is turned into an ordinary
 * runtime parameter carrying the type NAME as a plain string (supplied by
 * the caller's explicit type argument), and `value is T` becomes a call to
 * `__kt_isReifiedType(value, T)`, which does the same typeof-based dispatch
 * every other `is`/`as?` check in this file already uses (never Char, never
 * an arbitrary declared class -- this engine has no runtime class registry
 * keyed by a string name; see `__kt_isReifiedType`'s own doc comment).
 *
 * Scope, deliberately narrow (verify with `compileAndRunKotlin` before
 * relying on anything wider): the declaration's header (`inline fun <
 * reified T> name(params): ReturnType = expr`, `inline` and the return type
 * both optional) must be a SINGLE line ending in a single-expression body
 * (`= expr`) -- a block body (`{ ... }`) is not supported, matching this
 * file's existing single-line-header convention elsewhere (see
 * `transpileClassDeclarations`/`splitClassMembers`'s own limits). Only one
 * reified type parameter per function is supported. A call site's explicit
 * type argument must be a single bare type name (`name<String>(...)`), not
 * a nested/qualified generic.
 */
function transpileReifiedFunctions(code: string): string {
  const reifiedFunctions = new Map<string, string>();
  code = code.replace(
    /\b(?:inline\s+)?fun\s*<\s*reified\s+([A-Za-z_][A-Za-z0-9_]*)\s*>\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)(\s*:\s*[A-Za-z0-9_<>?.]+)?\s*=\s*(.+)$/gm,
    (_whole, typeParam: string, name: string, params: string, returnType: string | undefined, body: string) => {
      reifiedFunctions.set(name, typeParam);
      const esc = typeParam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rewrittenBody = body
        .replace(new RegExp(`([A-Za-z_][A-Za-z0-9_.]*|\\([^()]*\\))\\s+!is\\s+${esc}\\b`, 'g'), (_m: string, expr: string) => `!__kt_isReifiedType(${expr}, ${typeParam})`)
        .replace(new RegExp(`([A-Za-z_][A-Za-z0-9_.]*|\\([^()]*\\))\\s+is\\s+${esc}\\b`, 'g'), (_m: string, expr: string) => `__kt_isReifiedType(${expr}, ${typeParam})`);
      const trimmedParams = params.trim();
      const newParams = trimmedParams ? `${trimmedParams}, ${typeParam}: String` : `${typeParam}: String`;
      return `fun ${name}(${newParams})${returnType ?? ''} = ${rewrittenBody}`;
    }
  );
  if (reifiedFunctions.size === 0) return code;
  for (const [name, typeParam] of reifiedFunctions) {
    const escName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    code = code.replace(new RegExp(`\\b${escName}\\s*<\\s*([A-Za-z_][A-Za-z0-9_]*)\\s*>\\s*\\(([^()]*)\\)`, 'g'), (_m: string, typeArg: string, args: string) => {
      const trimmedArgs = args.trim();
      return `${name}(${trimmedArgs ? trimmedArgs + ', ' : ''}"${typeArg}")`;
    });
  }
  return code;
}

/**
 * Transforms mapOf / mutableMapOf calls across single or multiple lines,
 * translating `key to value` pairs into `[key, value]` arrays.
 */
function transpileMapDeclarations(code: string): string {
  return code.replace(/\b(mapOf|mutableMapOf)\s*\(([\s\S]*?)\)/g, (_whole, factory, inner) => {
    const entries = splitTopLevelCommas(inner);
    const pairs = entries.map((entry) => {
      const parts = entry.trim().split(/\s+to\s+/);
      return parts.length === 2 ? `[${parts[0]}, ${parts[1]}]` : entry;
    });
    return `${factory === 'mutableMapOf' ? '__kt_mutableMapOf' : '__kt_mapOf'}(${pairs.join(', ')})`;
  });
}

/**
 * Parses the branches inside a `when (subject) { ... }` body. Each branch
 * must be a single line of the form `<match> -> <result>`, where `<match>`
 * is one of: `else`, a comma-separated list of values (equality, OR'd
 * together), or `in a..b` / `!in a..b` (a numeric/char range). `<result>`
 * must be a single-line expression or statement -- multi-line
 * (`{ ... }`-bodied) branches are not supported, matching
 * `transformIfExpression`'s single-line-only scope above.
 */
function parseWhenBranches(body: string, subject: string | null): Array<{ condition: string | null; result: string }> {
  const branches: Array<{ condition: string | null; result: string }> = [];
  // A `;` separates multiple branches on one physical line (Kotlin allows
  // this the same as any other statement separator), matching the
  // single-line `when(s){A->0;is B->s.n}` shape some lesson content uses
  // for compactness -- naive on a literal `;` inside a branch's own
  // string/expression, but no lesson content puts one there.
  for (const rawLine of body.split('\n').flatMap((line) => line.split(';'))) {
    const line = rawLine.trim();
    if (!line) continue;
    const arrowIdx = line.indexOf('->');
    if (arrowIdx === -1) continue;
    const rawCond = line.slice(0, arrowIdx).trim();
    const result = line.slice(arrowIdx + 2).trim().replace(/,\s*$/, '');

    if (rawCond === 'else') {
      branches.push({ condition: null, result });
      continue;
    }

    if (!subject) {
      // Subject-less when branch: rawCond is already the boolean expression
      branches.push({ condition: rawCond, result });
      continue;
    }

    const rangeMatch = rawCond.match(/^(!in|in)\s+(-?\d[\d_]*|'.')\.\.(-?\d[\d_]*|'.')$/);
    if (rangeMatch) {
      const [, kw, lo, hi] = rangeMatch;
      const check = `((${subject}) >= ${lo} && (${subject}) <= ${hi})`;
      branches.push({ condition: kw === '!in' ? `!${check}` : check, result });
      continue;
    }

    // `is Type -> ...` / `!is Type -> ...`: a primitive Kotlin type maps to
    // a typeof check (see transformTypeChecks above, same scope: never
    // Char, since a single-quoted Char and a same-text String are
    // indistinguishable JS strings in this simulator); any other capitalized
    // name is treated as a class/data-class/object variant (e.g. a sealed
    // hierarchy member) and checked with `instanceof`, which is exactly
    // what this engine's real JS classes support.
    const isMatch = rawCond.match(/^(is|!is)\s+([A-Za-z_][A-Za-z0-9_]*)\??$/);
    if (isMatch) {
      const [, kw, type] = isMatch;
      const typeofMap: Record<string, string> = { Int: 'number', Long: 'number', Float: 'number', Double: 'number', String: 'string', Boolean: 'boolean' };
      const check = typeofMap[type] ? `typeof (${subject}) === '${typeofMap[type]}'` : `(${subject}) instanceof ${type}`;
      branches.push({ condition: kw === '!is' ? `!(${check})` : check, result });
      continue;
    }

    const values = rawCond.split(',').map((v) => v.trim()).filter(Boolean);
    const eqChecks = values.map((v) => `(${subject}) === ${v}`).join(' || ');
    branches.push({ condition: eqChecks, result });
  }
  return branches;
}

/**
 * Rewrites every `when (subject) { ... }` or subject-less `when { ... }`
 * block (statement or expression form) into equivalent JS. Runs once over
 * the whole source, before the per-line pass, because a `when` block spans
 * multiple lines and needs balanced-brace scanning to find its extent.
 */
function transpileWhenBlocks(code: string): string {
  const whenRe = /\bwhen(?:\s*\(([^)]*)\))?\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = whenRe.exec(code)) !== null) {
    const blockStart = match.index;
    const openBraceIdx = match.index + match[0].length - 1;
    const subject = match[1] ? match[1].trim() : null;

    let depth = 1;
    let i = openBraceIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) {
      whenRe.lastIndex = openBraceIdx + 1;
      continue;
    }
    const blockEnd = i;
    const body = code.slice(openBraceIdx + 1, i - 1);

    const linePrefix = (code.slice(0, blockStart).split('\n').pop() || '').trimEnd();
    const isExpression = /(?:=|return)$/.test(linePrefix);

    const branches = parseWhenBranches(body, subject);
    let rewritten: string;
    if (isExpression) {
      const arms = branches
        .map(({ condition, result: res }) => (condition ? `if (${condition}) { return (${res}); }` : `{ return (${res}); }`))
        .join(' else ');
      rewritten = `(() => { ${arms} })()`;
    } else {
      const arms = branches
        .map(({ condition, result: res }) => (condition ? `if (${condition}) { ${res}; }` : `{ ${res}; }`))
        .join(' else ');
      rewritten = arms;
    }

    result += code.slice(cursor, blockStart) + rewritten;
    cursor = blockEnd;
    whenRe.lastIndex = blockEnd;
  }
  result += code.slice(cursor);
  return result;
}

/**
 * Cleans a Kotlin function parameter list into a JS parameter list, shared
 * by both the block-bodied and single-expression `fun` transforms below.
 * Handles:
 *  - stripping `val`/`var` and the `: Type` annotation
 *  - preserving a default value (`name: Type = default` -> `name = default`),
 *    which the previous version of this cleaner silently dropped, so a
 *    function with a default parameter value ran fine in real Kotlin but
 *    always received `undefined` here when called without that argument
 *  - `vararg name: Type` -> JS rest parameter `...name`, since Kotlin's
 *    vararg and a JS rest parameter behave the same way (an array of the
 *    trailing arguments) for everything this app's lessons need
 */
function cleanKotlinParams(params: string): string {
  return splitTopLevelCommas(params)
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      const varargMatch = trimmed.match(/^vararg\s+([a-zA-Z0-9_]+)/);
      if (varargMatch) return `...${varargMatch[1]}`;
      // `*` (a star projection, e.g. `v: List<*>`) is valid inside a type
      // annotation's `<...>` but wasn't in this character class -- since
      // the whole match is anchored to `$`, a type this regex can't fully
      // consume doesn't partially match, it fails to match AT ALL, so the
      // entire parameter (including its NAME) was silently dropped,
      // producing a function with no parameter at all instead of one
      // whose type was merely not stripped. See PITFALLS.md.
      const m = trimmed.match(/^(?:(?:val|var)\s+)?([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?.*]+)?(?:\s*=\s*(.+))?$/);
      if (!m) return '';
      const [, name, defaultVal] = m;
      return defaultVal ? `${name} = ${defaultVal.trim()}` : name;
    })
    .filter(Boolean)
    .join(', ');
}

/** Finds variables initialized with mapOf/mutableMapOf so only their square
 * bracket access is translated into JavaScript Map.get/Map.set calls. */
function inferMapVars(code: string): Set<string> {
  const mapVars = new Set<string>();
  for (const line of code.split('\n')) {
    const match = line.match(/\b(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)[^=]*=\s*(?:__kt_)?(?:mapOf|mutableMapOf)\s*\(/);
    if (match) mapVars.add(match[1]);
    const derived = line.match(/\b(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)[^=]*=\s*.*\.(?:groupBy|associate|associateBy|associateWith)\s*(?:\(|\{)/);
    if (derived) mapVars.add(derived[1]);
  }
  return mapVars;
}

/**
 * Finds names known to hold a MutableList -- from a `mutableListOf(...)`
 * initializer, or a declared `: MutableList<...>` type (a local/property
 * `val`/`var`, or a primary-constructor property) -- so `name += value`
 * can be rewritten to `name.add(value)` (see the `+=` handling in the
 * per-line pass below). Plain JS `+=` on an array coerces both sides to
 * strings and REASSIGNS the variable to that string (`[1] + 2` is the
 * string `"1,2"`), which is silently wrong twice over: it neither adds the
 * element nor preserves the shared-reference aliasing a `val` MutableList
 * (which cannot itself be reassigned) actually has in Kotlin.
 */
function inferMutableListVars(code: string): Set<string> {
  const names = new Set<string>();
  for (const line of code.split('\n')) {
    const initMatch = line.match(/\b(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)[^=]*=\s*(?:__kt_)?mutableListOf\s*\(/);
    if (initMatch) names.add(initMatch[1]);
    const typeMatch = line.matchAll(/(?:\b(?:val|var)\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*MutableList</g);
    for (const m of typeMatch) names.add(m[1]);
  }
  return names;
}

/**
 * Strips modifier keywords (visibility, `open`, `abstract`, `override`) that
 * precede a declaration keyword. None of these affect runtime behavior in
 * this simplified simulator -- there is no real access control, and `open`/
 * `override` only matter to Kotlin's compile-time inheritance checks, which
 * this engine doesn't perform. Scoped to fire only when immediately
 * followed by `class`/`val`/`var`/`fun`/`constructor`, so an ordinary
 * printed sentence containing one of these words (e.g. "this is private")
 * is never touched.
 */
function stripModifierKeywords(code: string): string {
  return code.replace(
    /\b(?:(?:private|public|protected|internal|open|abstract|override|const)\s+)+(?=(?:class|val|var|fun|constructor)\b)/g,
    ''
  );
}

function stripAbstractMemberDeclarations(code: string): string {
  return code.replace(/^\s*abstract\s+fun\s+[A-Za-z_][A-Za-z0-9_]*\s*\([^)]*\)\s*(?::\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*)?\s*$/gm, '');
}

/**
 * Splits a class/object body into top-level "members" (a property, a
 * method, or an init block), each represented as its own array of source
 * lines. Depth-aware so a member's own nested braces (an if-block inside a
 * method, for instance) don't prematurely end it. Deliberately requires
 * every member header (`fun foo(...) {`, `init {`, `val x: Int = ...`) to
 * start on its own line -- a header that wraps across multiple lines
 * before its opening brace is NOT supported, since no lesson content
 * authored against this engine needs it.
 */
function splitClassMembers(bodyLines: string[]): string[][] {
  const members: string[][] = [];
  let current: string[] = [];
  let depth = 0;
  for (const line of bodyLines) {
    const trimmed = line.trim();
    const opensNewMember = depth === 0 && current.length > 0 && /^(val|var|fun|init|constructor)\b/.test(trimmed);
    if (opensNewMember) {
      members.push(current);
      current = [];
    }
    current.push(line);
    for (const ch of line) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
  }
  if (current.length) members.push(current);
  return members.filter((m) => m.some((l) => l.trim().length > 0));
}

/** Parses a Kotlin primary-constructor/enum-constructor parameter list into
 * structured info: which params are actual properties (`val`/`var`), their
 * names, and any default value. Reuses the same shape `cleanKotlinParams`
 * targets but keeps the property/name/default split explicit, since class
 * construction needs to know which params also become `this.x` fields. */
function parseConstructorParams(paramsRaw: string): { name: string; isProperty: boolean; default?: string }[] {
  return paramsRaw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const m = p.match(/^(?:(val|var)\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*[a-zA-Z0-9_<>?,\s]+)?(?:\s*=\s*(.+))?$/);
      if (!m) return { name: p, isProperty: false };
      return { name: m[2], isProperty: !!m[1], default: m[3]?.trim() };
    });
}

/** Renders a constructor's JS parameter list from parsed constructor params. */
function renderCtorParams(params: { name: string; default?: string }[]): string {
  return params.map((p) => (p.default ? `${p.name} = ${p.default}` : p.name)).join(', ');
}

/**
 * Converts one class/object body member's raw source lines into JS.
 * - `init { ... }` -> its inner lines are returned as `ctorLines` (spliced
 *   directly into the generated constructor, in source order).
 * - a property with an initializer (`val x: Int = expr`) -> also becomes a
 *   `ctorLines` entry (`this.x = expr;`), NOT a JS class-field declaration
 *   -- a class-field initializer can't see constructor parameters, but a
 *   Kotlin property initializer can, so constructor-body assignment is the
 *   only form that supports both.
 * - a property with no initializer (`val x: Int`) -> produces nothing; it
 *   exists only so a later `init` block's `this.x = x` has somewhere to
 *   assign, which needs no JS declaration at all.
 * - a method (`fun name(...) { ... }` or `fun name(...) = expr`) -> becomes
 *   a JS method, appended to `methodLines`. Single-expression form is
 *   single-line only, matching the same limitation as top-level functions.
 */
function splitCodeAndStrings(line: string): Array<{ text: string; isString: boolean }> {
  const chunks: Array<{ text: string; isString: boolean }> = [];
  const strRe = /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  while ((match = strRe.exec(line)) !== null) {
    if (match.index > lastIdx) {
      chunks.push({ text: line.slice(lastIdx, match.index), isString: false });
    }
    chunks.push({ text: match[0], isString: true });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < line.length) {
    chunks.push({ text: line.slice(lastIdx), isString: false });
  }
  return chunks;
}

/**
 * Turns a `lazy { ... }` block's raw body text into a JS function body that
 * `return`s its Kotlin last-expression value -- Kotlin lambda blocks are
 * implicitly value-returning on their last statement; JS requires an
 * explicit `return`. Splits on both real newlines and a `;`-joined single
 * line (`lazy{println("build");7}` is valid, common Kotlin), since either
 * form is just "a list of statements" once separated -- naive on a literal
 * `;` inside a string, but no lesson content puts one there.
 */
function wrapLazyBlockBody(rawBody: string): string {
  const statements = rawBody
    .split('\n')
    .flatMap((line) => line.split(';'))
    .map((s) => s.trim())
    .filter(Boolean);
  if (statements.length === 0) return '';
  const last = statements.pop()!;
  return [...statements.map((s) => `${s};`), `return (${last});`].join('\n');
}

function rewriteClassPropertyAccess(lines: string[], classProps: Set<string>, paramNames: Set<string>, prefix = 'this.'): string[] {
  const localVars = new Set<string>();
  return lines.map((line) => {
    const declMatch = line.match(/\b(?:val|var)\s+([a-zA-Z0-9_]+)/);
    if (declMatch) {
      localVars.add(declMatch[1]);
    }
    const chunks = splitCodeAndStrings(line);
    for (const chunk of chunks) {
      if (chunk.isString) {
        for (const prop of classProps) {
          if (paramNames.has(prop)) continue;
          chunk.text = chunk.text.replace(new RegExp(`\\$${prop}(?![\\w])`, 'g'), `\${${prefix}${prop}}`);
        }
        continue;
      }
      for (const prop of classProps) {
        if (paramNames.has(prop) || localVars.has(prop)) continue;
        chunk.text = chunk.text.replace(new RegExp(`(?<![.\\w])(${prop})(?![\\w])`, 'g'), (m, name, offset, str) => {
          const before = str.slice(0, offset).trimEnd();
          // Skip a property-declaration target (`val`/`var name`, already
          // handled) AND a function being DECLARED with this same name
          // (`fun name(...)`) -- a class body can legitimately have a
          // method whose name matches an in-scope property name (an inner
          // class's own method named the same as an outer property it
          // reads, for instance); rewriting the declaration itself would
          // corrupt it into `fun this.propName(...)`, not a call site.
          if (before.endsWith('.') || /(?:val|var|fun)$/.test(before)) return m;
          return `${prefix}${name}`;
        });
      }
    }
    return chunks.map((c) => c.text).join('');
  });
}

function transpileClassMember(rawMemberLines: string[], classProps: Set<string> = new Set()): { ctorLines: string[]; methodLines: string[] } {
  // Trailing blank lines are an artifact of how `splitClassMembers` divides
  // the body text (a blank line right before the class's own closing brace
  // gets attached to the last member) -- strip them so a genuinely
  // single-line member (a property or a single-expression fun) is still
  // recognized as such, rather than looking like a multi-line member.
  const memberLines = [...rawMemberLines];
  while (memberLines.length > 1 && memberLines[memberLines.length - 1].trim() === '') {
    memberLines.pop();
  }
  // `private set` (or `protected`/`internal set`) directly below a
  // property header restricts who may assign it -- compile-time-only
  // visibility metadata with no runtime effect in this simulator (same
  // rationale as `stripModifierKeywords` above), so once it's confirmed to
  // be the harmless trailing line it always is here, drop it and let the
  // property header behind it be classified as if it were a plain,
  // single-line property.
  while (
    memberLines.length > 1 &&
    /^(?:private|protected|internal)\s+set\s*;?$/.test(memberLines[memberLines.length - 1].trim())
  ) {
    memberLines.pop();
  }
  const header = memberLines[0].trim();

  const getterProp = header.match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*[a-zA-Z0-9_<>?,\s]+\s+get\(\)\s*=\s*(.+)$/);
  if (getterProp && memberLines.length === 1) {
    const [, name, expr] = getterProp;
    const rewrittenExpr = rewriteClassPropertyAccess([expr], classProps, new Set())[0];
    return { ctorLines: [], methodLines: [`  get ${name}() { return ${rewrittenExpr}; }`] };
  }

  // `val name[: Type] by lazy { ... }` -- computes once on first access and
  // caches the result, backed by two hidden instance fields (a `computed`
  // flag and the cached value) checked/set from a real JS getter, so every
  // subsequent `instance.name` read (no parens, matching how Kotlin itself
  // reads it) is free after the first. Two shapes: the block spans several
  // lines (closing `}` alone on its own trailing line), or the whole thing
  // -- header and block -- sits on one line.
  const lazyPropBlock = header.match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*[a-zA-Z0-9_<>?,\s]+)?\s+by\s+lazy\s*\{\s*$/);
  if (lazyPropBlock && memberLines.length > 1 && memberLines[memberLines.length - 1].trim() === '}') {
    const [, name] = lazyPropBlock;
    const inner = rewriteClassPropertyAccess(memberLines.slice(1, -1), classProps, new Set());
    const wrapped = wrapLazyBlockBody(inner.join('\n'));
    return { ctorLines: [], methodLines: [
      `  get ${name}() {`,
      `    if (!this.__kt_lazy_computed_${name}) {`,
      `      this.__kt_lazy_computed_${name} = true;`,
      `      this.__kt_lazy_value_${name} = (() => {`,
      ...wrapped.split('\n'),
      `      })();`,
      `    }`,
      `    return this.__kt_lazy_value_${name};`,
      `  }`,
    ] };
  }
  const lazyPropSingleLine = header.match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*[a-zA-Z0-9_<>?,\s]+)?\s+by\s+lazy\s*\{(.*)\}\s*$/);
  if (lazyPropSingleLine && memberLines.length === 1) {
    const [, name, block] = lazyPropSingleLine;
    const rewrittenBlock = rewriteClassPropertyAccess([block], classProps, new Set())[0];
    const wrapped = wrapLazyBlockBody(rewrittenBlock);
    return { ctorLines: [], methodLines: [
      `  get ${name}() {`,
      `    if (!this.__kt_lazy_computed_${name}) {`,
      `      this.__kt_lazy_computed_${name} = true;`,
      `      this.__kt_lazy_value_${name} = (() => { ${wrapped.replace(/\n/g, ' ')} })();`,
      `    }`,
      `    return this.__kt_lazy_value_${name};`,
      `  }`,
    ] };
  }

  // `val name: Type` on its own line, followed by a separate `get() {
  // ...block body with an explicit return... }` -- a class-member custom
  // getter that (unlike `getterProp` above) is not a single expression.
  // The body's own `return` statement is kept as-is (no implicit
  // last-expression wrapping needed, unlike a `lazy` block).
  const blockGetterHeader = header.match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*[a-zA-Z0-9_<>?,\s]+$/);
  if (blockGetterHeader && memberLines.length > 1) {
    const rest = memberLines.slice(1).join('\n');
    const blockGetterBody = rest.match(/^\s*get\(\)\s*\{([\s\S]*)\}\s*$/);
    if (blockGetterBody) {
      const [, name] = blockGetterHeader;
      const inner = rewriteClassPropertyAccess(blockGetterBody[1].split('\n'), classProps, new Set());
      return { ctorLines: [], methodLines: [`  get ${name}() {`, ...inner, '  }'] };
    }
  }

  if (/^init\b/.test(header)) {
    const inner = memberLines.slice(0, -1).join('\n').replace(/^\s*init\s*\{/, '').split('\n');
    // Drop the header's own `init {` remnant on the first line, and the
    // lone closing `}` this member ends with.
    const first = inner[0] ?? '';
    const rest = inner.slice(1);
    const cleanedFirst = first.replace(/^.*init\s*\{/, '');
    return { ctorLines: [cleanedFirst, ...rest].filter((l) => l.trim().length > 0), methodLines: [] };
  }

  const propMatch = header.match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*[a-zA-Z0-9_<>?,\s]+)?(?:\s*=\s*(.+))?$/);
  if (propMatch && memberLines.length === 1) {
    const [, name, initExpr] = propMatch;
    return { ctorLines: initExpr ? [`this.${name} = ${initExpr};`] : [], methodLines: [] };
  }

  const singleExprFun = header.match(/^fun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*=\s*(.+)$/);
  if (singleExprFun && memberLines.length === 1) {
    const [, name, params, expr] = singleExprFun;
    const paramNames = new Set(
      params
        .split(',')
        .map((p) => p.trim().split(/[\s=:]/)[0])
        .filter(Boolean)
    );
    const rewrittenExpr = rewriteClassPropertyAccess([expr], classProps, paramNames)[0];
    return { ctorLines: [], methodLines: [`  ${name}(${cleanKotlinParams(params)}) { return ${rewrittenExpr}; }`] };
  }

  const blockFunHeader = header.match(/^fun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*\{\s*$/);
  if (blockFunHeader) {
    const [, name, params] = blockFunHeader;
    const inner = memberLines.slice(1, -1);
    const paramNames = new Set(
      params
        .split(',')
        .map((p) => p.trim().split(/[\s=:]/)[0])
        .filter(Boolean)
    );
    const rewrittenInner = rewriteClassPropertyAccess(inner, classProps, paramNames);
    return { ctorLines: [], methodLines: [`  ${name}(${cleanKotlinParams(params)}) {`, ...rewrittenInner, '  }'] };
  }

  // Unrecognized member shape -- pass through verbatim rather than losing
  // it silently; this will likely surface as a JS syntax error rather than
  // a silent misbehavior, consistent with this file's stated preference.
  return { ctorLines: [], methodLines: memberLines };
}

/**
 * Replaces every `enum class Name(ctorParams)? { CONST1(args), CONST2, ... }`
 * with a plain JS object mapping each constant name to its own object,
 * carrying a `name` property (matching Kotlin's `.name`) plus any
 * constructor-declared properties, and a `toString()` returning `.name` so
 * printing/string-concatenating a constant shows its name instead of
 * "[object Object]". Deliberately does NOT support extra members after the
 * constant list (a trailing `;` followed by more properties/methods) or
 * `.values()`/`.ordinal` -- out of scope for what this world's lessons need.
 */
function transpileEnumClasses(code: string): string {
  return code.replace(
    /\benum\s+class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?\s*\{([^}]*)\}/g,
    (_whole, name, ctorParamsRaw, body) => {
      const ctorParams = ctorParamsRaw ? parseConstructorParams(ctorParamsRaw) : [];
      const entries = splitTopLevelCommas(body).map((entry: string) => entry.trim()).filter(Boolean);
      const constants = entries.map((entry: string) => {
        const m = entry.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?$/);
        if (!m) return '';
        const [, constName, argsRaw] = m;
        const args = argsRaw ? splitTopLevelCommas(argsRaw).map((a: string) => a.trim()) : [];
        const props = ctorParams.map((p, idx) => `${p.name}: ${args[idx] ?? 'undefined'}`);
        return `${constName}: { name: '${constName}', ${props.join(', ')}${props.length ? ', ' : ''}toString() { return this.name; } }`;
      });
      return `const ${name} = {\n  ${constants.join(',\n  ')}\n};`;
    }
  );
}

/** Splits a comma-separated string at its TOP LEVEL only, respecting
 * nested parens -- so `NORTH(0, 1), SOUTH(0, -1)` splits into the two
 * constant entries, not four fragments broken at each inner comma. */
function splitTopLevelCommas(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of text) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

/**
 * Removes every `interface Name { ... }` block entirely. JS has no runtime
 * concept of an interface -- it never checks structural conformance -- so
 * an interface declaration contributes nothing at runtime as long as every
 * implementing class actually supplies real methods (which `override fun`
 * already does). A default method BODY written directly in an interface
 * (rather than overridden by every implementer) is NOT supported -- out of
 * scope, since it would require the interface to become a real mixin.
 */
function transpileInterfaceDeclarations(code: string): string {
  // A generic interface's type parameter list (`interface Logger<in T>`) --
  // including a variance annotation, since that's compile-time-only and
  // has no runtime representation -- sits between the name and the body;
  // the optional `(?:<[^>{}]*>)?` accounts for it so a generic interface
  // isn't left completely unmatched (and therefore un-transpiled) here.
  const re = /\binterface\s+[A-Za-z_][A-Za-z0-9_]*\s*(?:<[^>{}]*>)?\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    const blockStart = match.index;
    const openBraceIdx = match.index + match[0].length - 1;
    let depth = 1;
    let i = openBraceIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) {
      re.lastIndex = openBraceIdx + 1;
      continue;
    }
    const name = match[0].match(/interface\s+([A-Za-z_][A-Za-z0-9_]*)/)![1];
    const body = code.slice(openBraceIdx + 1, i - 1);
    const methods = [...body.matchAll(/(?:fun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)(?:\s*:\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*)?\s*=\s*([^\n}]+)|fun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*:\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*\{\s*return\s+([^;}]+)[;}]|function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*\{\s*return\s+([^;}]+)[;}])/g)]
      .map((method) => [method[1] ?? method[4] ?? method[7], method[2] ?? method[5] ?? method[8], method[3] ?? method[6] ?? method[9]]);
    const helper = `const __kt_interface_${name} = { ${methods.map((method) => `${method[0]}(${cleanKotlinParams(method[1])}) { return ${method[2].trim()}; }`).join(', ')} };\n`;
    result += code.slice(cursor, blockStart) + helper;
    cursor = i;
    re.lastIndex = i;
  }
  result += code.slice(cursor);
  return result.replace(/super<([A-Za-z_][A-Za-z0-9_]*)>\.([A-Za-z_][A-Za-z0-9_]*)\(([^)]*)\)/g, '__kt_interface_$1.$2.call(this$3)');
}

/**
 * Replaces every `(data )?class Name(ctorParams)? (: Super(args)?)? { ... }`
 * declaration (body optional -- a bodyless class ending right after its
 * constructor parameter list, or after the supertype clause, is valid
 * Kotlin) with an equivalent JS class. Collects every declared class name
 * into `classNamesOut` so a later pass can insert `new` before its
 * constructor calls (Kotlin never writes `new`). See the member-level
 * helpers above for how the body itself is handled.
 */
function transpileClassDeclarations(code: string, classNamesOut: Set<string>, interfaceMembers: Map<string, string[]> = new Map()): string {
  // A supertype/interface in the `: ...` clause can itself carry a generic
  // type argument (`: Logger<Any>`, `: Formatter<User>`) -- the optional
  // `(?:\s*<[^>{}]+>)?` right after each supertype name (both the first
  // and any comma-separated additional ones) accounts for it, the same way
  // the class's own type parameter list is already handled right after its
  // name. Without it, the `<...>` text is left unmatched and leaks out as
  // raw, unparseable trailing source after the class block.
  const classRe = /\b(data\s+)?class\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s*<[^>{}]+>)?\s*(?:\(([^)]*)\))?\s*(?:\:\s*(([A-Za-z_][A-Za-z0-9_]*)(?:\s*<[^>{}]+>)?(?:\s*\(([^)]*)\))?(?:\s+by\s+[A-Za-z_][A-Za-z0-9_]*)?(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*(?:\s*<[^>{}]+>)?(?:\s*\([^)]*\))?)*))?\s*(\{)?/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = classRe.exec(code)) !== null) {
    const [whole, dataFlag, className, ctorParamsRaw, supertypesRaw, superName, superArgsRaw, hasBrace] = match;
    classNamesOut.add(className);
    const blockStart = match.index;
    let blockEnd = blockStart + whole.length;
    let bodyLines: string[] = [];
    let companionName: string | undefined;
    let companionLines: string[] = [];

    if (hasBrace) {
      const openBraceIdx = blockStart + whole.length - 1;
      let depth = 1;
      let i = openBraceIdx + 1;
      for (; i < code.length && depth > 0; i++) {
        if (code[i] === '{') depth++;
        else if (code[i] === '}') depth--;
      }
      if (depth !== 0) {
        classRe.lastIndex = openBraceIdx + 1;
        continue;
      }
      blockEnd = i;
      bodyLines = code.slice(openBraceIdx + 1, i - 1).split('\n');
      const body = bodyLines.join('\n');
      const companion = /\bcompanion\s+object(?:\s+([A-Za-z_][A-Za-z0-9_]*))?(?:\s*:\s*[A-Za-z_][A-Za-z0-9_]*)?\s*\{/.exec(body);
      if (companion && companion.index !== undefined) {
        const open = companion.index + companion[0].length - 1;
        let companionDepth = 1;
        let end = open + 1;
        for (; end < body.length && companionDepth > 0; end++) {
          if (body[end] === '{') companionDepth++;
          else if (body[end] === '}') companionDepth--;
        }
        if (companionDepth === 0) {
          companionName = companion[1];
          companionLines = body.slice(open + 1, end - 1).split('\n').flatMap((line) => {
            // Support the compact factory form commonly used in the lesson
            // content: `fun of(x) { return Product(x) }`.
            const compact = line.match(/^(\s*fun\s+[A-Za-z_][A-Za-z0-9_]*\s*\([^)]*\)(?:\s*:\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*)?)\s*\{\s*return\s+(.+?)\s*\}\s*$/);
            return compact ? [`${compact[1]} = ${compact[2]}`] : [line];
          });
          bodyLines = (body.slice(0, companion.index) + body.slice(end)).split('\n');
        }
      }
    }

    // `: Interface by delegateExpr` (class delegation) names the
    // constructor parameter/property whose members get forwarded. Kotlin
    // retains a reference to the delegate even when it has no `val`/`var`
    // of its own (`class Wrap(p: P) : P by p`), so this simulator forces
    // one into existence below rather than requiring lesson content to
    // always write `val`/`var` on the delegate parameter.
    const delegateVar = (supertypesRaw ?? '').match(/\bby\s+([A-Za-z_][A-Za-z0-9_]*)\s*$/)?.[1];

    const ctorParams = ctorParamsRaw ? parseConstructorParams(ctorParamsRaw) : [];
    const propertyAssignments = ctorParams.filter((p) => p.isProperty).map((p) => `    this.${p.name} = ${p.name};`);
    if (delegateVar && ctorParams.some((p) => p.name === delegateVar && !p.isProperty)) {
      propertyAssignments.push(`    this.${delegateVar} = ${delegateVar};`);
    }
    const classProps = new Set(ctorParams.filter((p) => p.isProperty).map((p) => p.name));
    if (delegateVar) classProps.add(delegateVar);
    for (const line of bodyLines) {
      const pm = line.trim().match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (pm) classProps.add(pm[1]);
    }
    if (superName && superArgsRaw !== undefined) {
      for (const inherited of getClassOwnPropertyNames(code, superName)) classProps.add(inherited);
    }

    const members = splitClassMembers(bodyLines);
    const ctorExtraLines: string[] = [];
    const methodLines: string[] = [];
    for (const member of members) {
      const { ctorLines, methodLines: mLines } = transpileClassMember(member, classProps);
      ctorExtraLines.push(...ctorLines.map((l) => `    ${l}`));
      methodLines.push(...mLines);
    }

    const companionStaticLines: string[] = [];
    for (const rawMember of splitClassMembers(companionLines)) {
      // A companion body that spans multiple SOURCE lines (the `{`/`}` on
      // their own lines, as a multi-line companion naturally reads) leaves
      // a trailing blank line attached to its last real member -- the same
      // `splitClassMembers` artifact `transpileClassMember` itself trims
      // for a class's own members. Trim it here too so a genuinely
      // single-line member (`const val X = 4`) is still recognized as one
      // instead of falling through to the general member path below, which
      // (correctly, for an INSTANCE property) returns a constructor
      // assignment -- discarded here, since a companion only reads
      // `methodLines` -- silently dropping the property.
      const member = [...rawMember];
      while (member.length > 1 && member[member.length - 1].trim() === '') member.pop();
      const header = member[0]?.trim() ?? '';
      const property = header.match(/^(?:val|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?::\s*[^=]+)?\s*=\s*(.+)$/);
      if (property && member.length === 1) {
        companionStaticLines.push(`  static ${property[1]} = ${property[2]};`);
        continue;
      }
      const { methodLines: companionMethods } = transpileClassMember(member);
      companionStaticLines.push(...companionMethods.map((line, index) => index === 0 ? line.replace(/^  /, '  static ') : line));
    }

    const superCallLine = superName && superArgsRaw !== undefined ? [`    super(${superArgsRaw});`] : [];
    const ctorBodyLines = [...superCallLine, ...propertyAssignments, ...ctorExtraLines];

    // Built via concatenation, NOT a template literal with `${className}(`
    // directly adjacent -- the later `insertNewForInstantiation` pass looks
    // for `ClassName(` as literal text anywhere in the source, with no
    // awareness of string-literal context, so a template literal here would
    // get its own generated toString corrupted into `new ClassName(...)`
    // text embedded inside the returned string.
    const dataClassLines = dataFlag
      ? [
          `  copy(overrides = {}) { return new ${className}(${ctorParams.map((p) => `Object.prototype.hasOwnProperty.call(overrides, '${p.name}') ? overrides.${p.name} : this.${p.name}`).join(', ')}); }`,
          `  equals(other) { return other instanceof ${className} && ${ctorParams.map((p) => `__kt_equals(this.${p.name}, other.${p.name})`).join(' && ')}; }`,
          `  toString() { return '${className}' + '(' + ${ctorParams.map((p) => `'${p.name}=' + this.${p.name}`).join(" + ', ' + ")} + ')'; }`,
        ]
      : [];

    // A supertype WITHOUT parens (`: Greetable`) is an interface -- Kotlin
    // requires parens (a constructor call, `: Animal(name)`) only when
    // actually extending a class. JS has no interface concept, so an
    // interface supertype contributes no `extends` at all (the
    // implementing class already supplies real methods via `override fun`).
    const isRealSuperclass = Boolean(superName) && superArgsRaw !== undefined;
    const extendsClause = isRealSuperclass ? ` extends ${superName}` : '';
    const interfaceClause = (supertypesRaw ?? '').replace(/\s+by\s+[A-Za-z_][A-Za-z0-9_]*\s*$/, '');
    const interfaceNames = interfaceClause
      .split(',')
      .map((part) => part.trim().replace(/\s*\([^)]*\)$/, '').replace(/<[^>]*>$/, ''))
      .filter((name) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) && (!isRealSuperclass || name !== superName));
    const rewritten = [
      `class ${className}${extendsClause} {`,
      `  constructor(${renderCtorParams(ctorParams)}) {`,
      ...ctorBodyLines,
      '  }',
      ...methodLines,
      ...companionStaticLines,
      ...dataClassLines,
      '}',
    ].join('\n');

    const defaultMixins = interfaceNames.length
      ? `\nfor (const __kt_defaults of [${interfaceNames.map((name) => `__kt_interface_${name}`).join(', ')}]) for (const [__kt_name, __kt_method] of Object.entries(__kt_defaults)) if (!Object.prototype.hasOwnProperty.call(${className}.prototype, __kt_name)) ${className}.prototype[__kt_name] = __kt_method;\n${interfaceNames.map((name) => `${className}.prototype.__kt_implements_${name} = true;`).join('\n')}`
      : '';
    // Interface delegation (`class Wrap(d: X) : X by d`): forward every
    // abstract member of the delegated interface(s) the wrapper does NOT
    // already define itself (an `override fun` in the wrapper's own body
    // must win -- checked against the method names actually emitted into
    // `methodLines`) onto the retained delegate reference. `...args`
    // forwards any arity uniformly since this simulator has no per-member
    // parameter-list introspection; every interface this world's lessons
    // delegate to happens to declare zero-arg members, so this is not a
    // narrowing in practice.
    let delegationMixin = '';
    if (delegateVar) {
      const overridden = new Set(
        methodLines.map((line) => line.match(/^\s*(?:static\s+)?(?:get\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*\(/)?.[1]).filter((n): n is string => Boolean(n))
      );
      const toForward = interfaceNames.flatMap((name) => interfaceMembers.get(name) ?? []).filter((name) => !overridden.has(name));
      if (toForward.length) {
        delegationMixin = `\nfor (const __kt_delegate_name of ${JSON.stringify(toForward)}) if (!Object.prototype.hasOwnProperty.call(${className}.prototype, __kt_delegate_name)) ${className}.prototype[__kt_delegate_name] = function(...__kt_delegate_args) { return this.${delegateVar}[__kt_delegate_name](...__kt_delegate_args); };`;
      }
    }
    result += code.slice(cursor, blockStart) + rewritten + defaultMixins + delegationMixin + (companionName ? `\n${className}.${companionName} = ${className};` : '');
    cursor = blockEnd;
    classRe.lastIndex = blockEnd;
  }
  result += code.slice(cursor);
  return result;
}

function transpileDataClassCopyCalls(code: string): string {
  // The receiver can be a bare variable (`a.copy(...)`) or a fresh
  // constructor call chained straight off (`P(1, 2).copy(...)`, real and
  // common Kotlin) -- the optional `(?:\([^()]*\))?` covers the latter so
  // its whole "P(1, 2)" text is kept as the receiver, not just the
  // unmatched tail after the last `.`, which previously left `.copy(y=5)`
  // completely untouched (no bare identifier immediately precedes it) and
  // let it fall through to be misinterpreted as an ordinary call with a
  // plain assignment argument -- silently ignoring the override entirely.
  return code.replace(/\b([A-Za-z_][A-Za-z0-9_]*(?:\([^()]*\))?)\.copy\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([^()]+?)\s*\)/g, '$1.copy({ $2: $3 })');
}

function eraseGenericConstructorArguments(code: string): string {
  code = code.replace(/\b([A-Z][A-Za-z0-9_]*)\s*<[^>{}]+>\s*\(/g, '$1(');
  // World 15: an explicit type argument on a member/static call
  // (`Result.failure<Int>(...)`) is compile-time-only, same as a
  // constructor's -- but the callee name here (`failure`) is lowercase, so
  // the capitalized-name-only pattern above never matches it. Scoped to a
  // dot-prefixed call specifically (`.name<...>(`), which is never
  // confusable with a `<`/`>` comparison chain the way a bare identifier
  // would be.
  code = code.replace(/\.([a-zA-Z_][A-Za-z0-9_]*)\s*<[^>{}]+>\s*\(/g, '.$1(');
  return code;
}

/**
 * Replaces every `object Name { ... }` singleton declaration with an
 * immediately-instantiated anonymous JS class: `const Name = new (class {
 * ... })();`. Every later `Name.member` access then just works, matching
 * Kotlin's own single-shared-instance semantics. Scoped to a plain object
 * declaration -- `object Name : Interface { ... }` is not supported.
 */
function transpileObjectDeclarations(code: string, objectInterfaces: Map<string, string[]> = new Map()): string {
  const re = /\bobject\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(code)) !== null) {
    const [whole, name] = match;
    const blockStart = match.index;
    const openBraceIdx = blockStart + whole.length - 1;
    let depth = 1;
    let i = openBraceIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) {
      re.lastIndex = openBraceIdx + 1;
      continue;
    }
    const blockEnd = i;
    const bodyLines = code.slice(openBraceIdx + 1, i - 1).split('\n');

    const classProps = new Set<string>();
    for (const line of bodyLines) {
      const pm = line.trim().match(/^(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (pm) classProps.add(pm[1]);
    }

    const members = splitClassMembers(bodyLines);
    const ctorExtraLines: string[] = [];
    const methodLines: string[] = [];
    for (const member of members) {
      const { ctorLines, methodLines: mLines } = transpileClassMember(member, classProps);
      ctorExtraLines.push(...ctorLines.map((l) => `    ${l}`));
      methodLines.push(...mLines);
    }

    const rewritten = [
      `const ${name} = new (class {`,
      `  constructor() {`,
      ...ctorExtraLines,
      '  }',
      ...methodLines,
      '})();',
    ].join('\n');

    // An object implementing an interface has no `extends`/prototype chain
    // of its own to inherit a default method through (unlike a class,
    // whose `defaultMixins` -- see `transpileClassDeclarations` -- patch
    // the prototype); this is the instance-level equivalent, skipping any
    // name the object's own body already defines. Also tags the instance
    // with `__kt_implements_<Interface>` for each declared interface, so a
    // later `x is Interface` check (see `transformTypeChecks`) has
    // something real to read -- interfaces are erased to a plain
    // `__kt_interface_X` object with no prototype relation, so
    // `instanceof` can never work against one.
    const interfaces = objectInterfaces.get(name) ?? [];
    const defaultMixin = interfaces
      .map((interfaceName) => `\nfor (const [__kt_name, __kt_method] of Object.entries(__kt_interface_${interfaceName})) if (typeof ${name}[__kt_name] !== 'function') ${name}[__kt_name] = __kt_method;\n${name}.__kt_implements_${interfaceName} = true;`)
      .join('');

    result += code.slice(cursor, blockStart) + rewritten + defaultMixin;
    cursor = blockEnd;
    re.lastIndex = blockEnd;
  }
  result += code.slice(cursor);
  return result;
}

/**
 * Final pass, run after every class/object/enum/interface declaration has
 * been transpiled: Kotlin instantiates with `ClassName(args)` (no `new`),
 * so every call site referring to a name collected in `classNames` gets
 * `new ` inserted before it. Safe against double-insertion via a negative
 * lookbehind, and never touches a class's own declaration (`class Foo {`
 * has no `(` right after the name once transpiled) or a `super(...)` call
 * (a literal `super`, never one of the collected class names).
 */
function insertNewForInstantiation(code: string, classNames: Set<string>): string {
  const regexes = [...classNames].map((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return { name, re: new RegExp(`(?<!new\\s)\\b${escaped}\\s*\\(`, 'g') };
  });
  // A blind whole-source replace would also rewrite `"ClassName("` text
  // sitting inside an unrelated STRING LITERAL (e.g. a method building a
  // display string like `"Box(" + value + ")"`) into `"new Box("` --
  // corrupting the literal instead of leaving it alone, since this regex
  // has no idea it isn't looking at a real instantiation there. Restricted
  // to non-string chunks of each line, the same way `rewriteClassPropertyAccess`
  // already avoids corrupting a string's own content elsewhere in this file.
  return code
    .split('\n')
    .map((line) => {
      const chunks = splitCodeAndStrings(line);
      for (const chunk of chunks) {
        if (chunk.isString) continue;
        for (const { name, re } of regexes) chunk.text = chunk.text.replace(re, `new ${name}(`);
      }
      return chunks.map((c) => c.text).join('');
    })
    .join('\n');
}

/**
 * Finds the start of the postfix expression ending right before `endExclusive`
 * (a `.` position) -- either a bare identifier (`a`) or a single call whose
 * own closing paren sits right there (`Outer("x")`). Scoped to exactly the
 * receiver shapes World 11's inner-class lessons use; a longer chain
 * (`a.b.Inner()`) is not walked past its last segment.
 */
function findReceiverExpressionStart(code: string, endExclusive: number): number {
  let i = endExclusive - 1;
  while (i >= 0 && /\s/.test(code[i])) i--;
  if (i >= 0 && code[i] === ')') {
    let depth = 1;
    i--;
    while (i >= 0 && depth > 0) {
      if (code[i] === ')') depth++;
      else if (code[i] === '(') depth--;
      i--;
    }
  }
  while (i >= 0 && /[A-Za-z0-9_]/.test(code[i])) i--;
  return i + 1;
}

/**
 * Supported World 11 inner-class subset: `inner class Inner(...) { ... }`
 * declared as the sole nested block inside `class Outer(...) { ... }`.
 * Kotlin constructs it as `outerInstance.Inner(...)`, capturing that
 * specific outer instance for the lifetime of the inner object -- unlike a
 * plain nested class (no `inner`), which captures nothing. Lowered to an
 * ordinary top-level class taking the outer instance as a real (property)
 * constructor parameter named `__outer`, so the shared class transpiler
 * that runs after this needs no changes of its own: `this@Outer.prop` and
 * a bare, unshadowed outer property reference both become
 * `this.__outer.prop`, reusing `rewriteClassPropertyAccess` (the same
 * string-template-aware rewrite an ordinary class body already gets) with
 * `this.__outer.` as its prefix instead of the default `this.`.
 */
function transpileInnerClasses(code: string): string {
  const innerClasses: Array<{ innerName: string; loweredName: string }> = [];
  const outerRe = /\bclass\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = outerRe.exec(code)) !== null) {
    const [whole, outerName, outerCtorRaw] = match;
    const openBraceIdx = match.index + whole.length - 1;
    let depth = 1;
    let i = openBraceIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) { outerRe.lastIndex = openBraceIdx + 1; continue; }
    const blockEnd = i;
    const body = code.slice(openBraceIdx + 1, blockEnd - 1);

    const innerRe = /\binner\s+class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?\s*\{/;
    const innerMatch = innerRe.exec(body);
    if (!innerMatch) continue;
    const [innerWhole, innerName, innerCtorRaw] = innerMatch;
    const innerOpenIdx = innerMatch.index! + innerWhole.length - 1;
    let innerDepth = 1;
    let j = innerOpenIdx + 1;
    for (; j < body.length && innerDepth > 0; j++) {
      if (body[j] === '{') innerDepth++;
      else if (body[j] === '}') innerDepth--;
    }
    if (innerDepth !== 0) continue;
    const innerBlockEnd = j;
    const innerBodyRaw = body.slice(innerOpenIdx + 1, innerBlockEnd - 1);

    const outerProps = new Set(
      (outerCtorRaw ?? '').split(',').map((p) => p.trim().match(/^(?:val|var)\s+([A-Za-z_][A-Za-z0-9_]*)/)?.[1]).filter((n): n is string => Boolean(n))
    );
    const innerParamNames = new Set(
      (innerCtorRaw ?? '').split(',').map((p) => p.trim().match(/^(?:(?:val|var)\s+)?([A-Za-z_][A-Za-z0-9_]*)/)?.[1]).filter((n): n is string => Boolean(n))
    );

    let innerBody = innerBodyRaw.replace(new RegExp(`this@${outerName}\\.([A-Za-z_][A-Za-z0-9_]*)`, 'g'), 'this.__outer.$1');
    innerBody = rewriteClassPropertyAccess(innerBody.split('\n'), outerProps, innerParamNames, 'this.__outer.').join('\n');

    const loweredName = `__KtInner_${outerName}_${innerName}`;
    const loweredClass = `\nclass ${loweredName}(val __outer${innerCtorRaw ? `, ${innerCtorRaw}` : ''}) {${innerBody}}`;
    innerClasses.push({ innerName, loweredName });

    const newBody = body.slice(0, innerMatch.index!) + body.slice(innerBlockEnd);
    const newWhole = code.slice(match.index, openBraceIdx + 1) + newBody + '}' + loweredClass;
    code = code.slice(0, match.index) + newWhole + code.slice(blockEnd);
    outerRe.lastIndex = match.index + newWhole.length;
  }

  for (const { innerName, loweredName } of innerClasses) {
    const marker = `.${innerName}(`;
    let searchFrom = 0;
    for (;;) {
      const dotIdx = code.indexOf(marker, searchFrom);
      if (dotIdx === -1) break;
      const openParenIdx = dotIdx + marker.length - 1;
      let depth = 1;
      let k = openParenIdx + 1;
      for (; k < code.length && depth > 0; k++) {
        if (code[k] === '(') depth++;
        else if (code[k] === ')') depth--;
      }
      const closeParenIdx = k;
      const argsText = code.slice(openParenIdx + 1, k - 1).trim();
      const receiverStart = findReceiverExpressionStart(code, dotIdx);
      const receiverText = code.slice(receiverStart, dotIdx);
      const replacement = `new ${loweredName}(${receiverText}${argsText ? `, ${argsText}` : ''})`;
      code = code.slice(0, receiverStart) + replacement + code.slice(closeParenIdx);
      searchFrom = receiverStart + replacement.length;
    }
  }
  return code;
}

/**
 * Supported World 11 nested-class subset: an ordinary (non-`inner`) class
 * declared inside another class's body -- with or without its own `{ ...
 * }` body, and regardless of whether the OUTER class itself has
 * constructor parameters. Unlike `transpileInnerClasses`, a nested class
 * captures nothing from its outer -- Kotlin gives it no implicit outer
 * receiver at all, so any outer state it needs must arrive as an ordinary,
 * explicit parameter (`fun f(o: Outer) = o.x`, real Kotlin and exactly
 * what this lowering already handles for free once the class is a
 * perfectly normal top-level one). Lowering is therefore just "move the
 * declaration to the top level under a unique name, then rewrite every
 * `Outer.Nested` reference (construction or bare name) to it" -- run
 * AFTER `transpileInnerClasses`, so an `inner class` has already been
 * extracted and cannot be mistaken for a nested one here.
 */
function transpileNestedClasses(code: string): string {
  const nestedNames: Array<{ outer: string; nested: string; lowered: string }> = [];
  const outerRe = /\bclass\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\([^)]*\))?\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = outerRe.exec(code)) !== null) {
    const [whole, outerName] = match;
    const openBraceIdx = match.index + whole.length - 1;
    let depth = 1;
    let i = openBraceIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    if (depth !== 0) { outerRe.lastIndex = openBraceIdx + 1; continue; }
    const blockEnd = i;
    const body = code.slice(openBraceIdx + 1, blockEnd - 1);

    const nestedRe = /(?<!inner\s+)\bclass\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?\s*(\{)?/;
    const nestedMatch = nestedRe.exec(body);
    if (!nestedMatch) continue;
    const [nestedWhole, nestedName, nestedCtorRaw, hasBrace] = nestedMatch;
    const loweredName = `__KtNested_${outerName}_${nestedName}`;
    nestedNames.push({ outer: outerName, nested: nestedName, lowered: loweredName });

    let nestedEnd = nestedMatch.index! + nestedWhole.length;
    let nestedBody = '';
    if (hasBrace) {
      let nestedDepth = 1;
      let j = nestedEnd;
      for (; j < body.length && nestedDepth > 0; j++) {
        if (body[j] === '{') nestedDepth++;
        else if (body[j] === '}') nestedDepth--;
      }
      nestedBody = body.slice(nestedEnd, j - 1);
      nestedEnd = j;
    }

    const loweredClass = `\nclass ${loweredName}${nestedCtorRaw !== undefined ? `(${nestedCtorRaw})` : ''} {${nestedBody}}`;
    const newBody = body.slice(0, nestedMatch.index) + body.slice(nestedEnd);
    const newWhole = code.slice(match.index, openBraceIdx + 1) + newBody + '}' + loweredClass;
    code = code.slice(0, match.index) + newWhole + code.slice(blockEnd);
    outerRe.lastIndex = match.index + newWhole.length;
  }

  for (const { outer, nested, lowered } of nestedNames) {
    code = code.replace(new RegExp(`\\b${outer}\\.${nested}\\b`, 'g'), lowered);
  }
  return code;
}

/**
 * Runs the full class/object/enum/interface transpilation pipeline, in the
 * order each stage depends on: modifiers stripped first (so every later
 * regex sees a plain `class`/`fun`/`val` with no leading keyword noise),
 * enums and interfaces removed/replaced next (so the general class regex
 * never mistakes an enum body's constant list for ordinary class members),
 * then objects and classes themselves, and finally the `new` insertion
 * pass once every class name is known.
 */
function transpileOOPDeclarations(code: string): string {
  code = stripAbstractMemberDeclarations(code);
  code = stripModifierKeywords(code);
  // Captured before any interface-erasing transform below (both replace
  // the ORIGINAL `interface X { ... }` text entirely), since class
  // delegation (`: X by d`, further down) needs to know which abstract
  // members to forward and there is no representation of them left once
  // an interface has been lowered to its runtime `__kt_interface_X`
  // default-method-only object.
  const interfaceMembers = getAllInterfaceMemberNames(code);
  // The supported sealed subset has ordinary runtime class/object behavior;
  // exhaustiveness remains a separate compiler-validation concern.
  code = code.replace(/\bsealed\s+(?=(?:class|interface)\b)/g, '');
  code = code.replace(/\bdata\s+object\b/g, 'object');
  code = code.replace(/\binterface\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?=\n|$)/g, 'const __kt_interface_$1 = {};');
  // Capture each object's interface supertype (if any) before discarding
  // the `: Interface` clause, so an object implementing an interface with
  // a default method (`object O : X` where `X` has `fun f() = ...`) still
  // gets that default mixed in below -- otherwise `O.f()` would throw
  // "not a function", since the object literal this lowers to has no
  // other way to inherit it.
  const objectInterfaces = new Map<string, string[]>();
  // As with a class's supertype clause, an object's interface can itself
  // carry a generic type argument (`object UserFormatter : Formatter<User>`)
  // -- the optional `(?:<[^>{}]+>)?` after each name accounts for it, and
  // it is stripped back off (kept out of the captured interface name)
  // before being recorded, since the interface lookups below key on the
  // bare declared name.
  code = code.replace(/\bobject\s+([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*(?:<[^>{}]+>)?(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*(?:<[^>{}]+>)?)*)(?=\s*(?:\{|\n|$))/g, (_whole, name, interfaceClause) => {
    objectInterfaces.set(name, interfaceClause.split(',').map((n: string) => n.trim().replace(/<[^>]*>$/, '')));
    return `object ${name}`;
  });
  code = code.replace(/\bobject\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?=\n|$)/g, 'object $1 {}');
  code = transpileInnerClasses(code);
  code = transpileNestedClasses(code);
  // Visibility on a primary constructor is compile-time metadata; remove it
  // before class declaration matching so `class X private constructor(...)`
  // is parsed as a normal constructor while retaining the runtime shape.
  code = code.replace(/\b(?:private|public|protected|internal)\s+constructor\b/g, '');
  code = code.replace(/\bconstructor\s*(?=\()/g, '');
  // Kotlin permits a bodyless class declaration; give the JavaScript
  // transpiler an explicit empty body so it cannot swallow the next top-level
  // function declaration.
  code = transpileDataClassCopyCalls(code);
  code = eraseGenericConstructorArguments(code);
  code = transpileEnumClasses(code);
  code = transpileInterfaceDeclarations(code);
  const classNames = new Set<string>(['StringBuilder', ...BUILTIN_EXCEPTION_NAMES]);
  code = transpileClassDeclarations(code, classNames, interfaceMembers);
  code = transpileObjectDeclarations(code, objectInterfaces);
  code = insertNewForInstantiation(code, classNames);
  // Runs last: any `by lazy { ... }` still in the source at this point is
  // NOT a class member (transpileClassDeclarations, above, has already
  // consumed and replaced every one inside a class/object body with a
  // real getter), so it must be a top-level or local declaration instead.
  code = transpileTopLevelLazyProperties(code);
  code = transpileTopLevelCustomDelegatedProperties(code, inferMapVars(code));
  return code;
}

/** Keeps companion members in Kotlin form while the general function lowerer
 * processes top-level functions. The lowerer intentionally understands
 * anonymous `object` expressions, but a companion is a class member and must
 * be handled by `transpileClassDeclarations` instead. */
function protectCompanionBlocks(code: string): { code: string; blocks: string[] } {
  const blocks: string[] = [];
  const companionRe = /\bcompanion\s+object(?:\s+[A-Za-z_][A-Za-z0-9_]*)?(?:\s*:\s*[A-Za-z_][A-Za-z0-9_]*)?\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = companionRe.exec(code)) !== null) {
    const open = match.index + match[0].length - 1;
    let depth = 1;
    let end = open + 1;
    for (; end < code.length && depth > 0; end++) {
      if (code[end] === '{') depth++;
      else if (code[end] === '}') depth--;
    }
    if (depth !== 0) continue;
    const marker = `__KT_COMPANION_${blocks.length}__`;
    blocks.push(code.slice(match.index, end));
    result += code.slice(cursor, match.index) + marker;
    cursor = end;
    companionRe.lastIndex = end;
  }
  return { code: result + code.slice(cursor), blocks };
}

/**
 * Shields a class-member computed-getter property (`val name: Type get() =
 * expr`, handled later by `transpileClassMember`'s own `getterProp` branch)
 * from the general function lowerer the same way `protectCompanionBlocks`
 * shields a companion. kotlinFunctions.ts's own `val`/`var` handling has no
 * concept of a `get()` accessor -- it treats everything between the `:` and
 * the final `=` as one (bogus) declared type, and `readType`'s fallback
 * reconstructs that "type" by concatenating token text with NO original
 * whitespace between tokens, so `List<String> get()` collapses into
 * `List<String>get()`. That corrupted text then fails every later
 * text-based transform that expects a plain type annotation (including the
 * `val`->`const` per-line rewrite), leaving a literal, invalid `val` in the
 * final JS. Protecting the whole line keeps kotlinFunctions.ts from ever
 * seeing it in the first place. Single-line only, matching the getter
 * shape this simulator actually supports.
 */
function protectGetterProperties(code: string): { code: string; blocks: string[] } {
  const blocks: string[] = [];
  const newCode = code.replace(
    /^[ \t]*(?:val|var)\s+[A-Za-z_][A-Za-z0-9_]*\s*:\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*\s+get\(\)\s*=\s*[^\n]+$/gm,
    (whole) => {
      const marker = `__KT_GETTERPROP_${blocks.length}__`;
      blocks.push(whole);
      return marker;
    }
  );
  return { code: newCode, blocks };
}

/**
 * Shields a class-member property whose getter has a BLOCK body split
 * across its own line(s) (`val name: Type` then, on a separate line,
 * `get() { ... }` -- as opposed to `protectGetterProperties`'s
 * single-expression, single-line `val name: Type get() = expr`) from the
 * general function lowerer. `get` is an ordinary identifier to
 * kotlinFunctions.ts; `get()` immediately followed by `{` matches its
 * generic trailing-lambda heuristic, and a `return` inside that
 * synthetic lambda then fails with "return is not allowed outside a
 * function" since it isn't a real recognized function frame. Balanced-
 * brace scanned so a multi-statement getter body is captured whole.
 * `transpileClassMember`'s `blockGetterProp` branch does the real
 * lowering once this is restored.
 */
function protectBlockGetterProperties(code: string): { code: string; blocks: string[] } {
  const blocks: string[] = [];
  const re = /\b(?:val|var)\s+[A-Za-z_][A-Za-z0-9_]*\s*:\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*\n\s*get\(\)\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    const openIdx = match.index + match[0].length - 1;
    let depth = 1;
    let end = openIdx + 1;
    for (; end < code.length && depth > 0; end++) {
      if (code[end] === '{') depth++;
      else if (code[end] === '}') depth--;
    }
    if (depth !== 0) continue;
    const marker = `__KT_BLOCKGETTER_${blocks.length}__`;
    blocks.push(code.slice(match.index, end));
    result += code.slice(cursor, match.index) + marker;
    cursor = end;
    re.lastIndex = end;
  }
  return { code: result + code.slice(cursor), blocks };
}

/**
 * Shields a property-delegation `by lazy { ... }` block (class-member --
 * see `transpileClassMember`'s `lazyPropBlock`/`lazyPropSingleLine`
 * branches -- or top-level/local, see `transpileTopLevelLazyProperties`)
 * from the general function lowerer. `lazy` is an ordinary identifier to
 * kotlinFunctions.ts, not a keyword, so a `{` immediately after it (with
 * nothing else marking it as special) matches its generic trailing-lambda
 * heuristic and gets rewritten into a real `lazy(...)` CALL with an arrow
 * function -- valid-looking JS, but not a shape either lazy-property
 * transform below still recognizes, and `lazy` is never actually defined
 * as a runtime helper. Balanced-brace scanned, since a lazy block's own
 * body can contain further nested braces (an `if`, a lambda argument).
 */
/**
 * World 14's `sequence { yield(1); yieldAll(listOf(2, 3)) }` builder is
 * protected the same way `by lazy { ... }` is: replaced with a placeholder
 * before `lowerKotlinFunctions` ever tokenizes the source (its generic
 * lambda/trailing-call lowering has no concept of `yield`/`yieldAll` and
 * would otherwise mangle the block trying to treat it as an ordinary
 * lambda argument), then restored -- transformed -- immediately after.
 * Restoring before the OOP pass and the later per-line loop (rather than
 * at the very end) is deliberate: it lets the block's own inner Kotlin
 * (e.g. `listOf(2, 3)` inside `yieldAll`) still go through every normal
 * later transform (collection-name rewriting, etc.) instead of needing
 * its own separate, parallel mini-pipeline.
 */
function protectSequenceBuilders(code: string): { code: string; blocks: string[] } {
  const blocks: string[] = [];
  const re = /\bsequence\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    const openIdx = match.index + match[0].length - 1;
    let depth = 1;
    let end = openIdx + 1;
    for (; end < code.length && depth > 0; end++) {
      if (code[end] === '{') depth++;
      else if (code[end] === '}') depth--;
    }
    if (depth !== 0) continue;
    const marker = `__KT_SEQBLOCK_${blocks.length}__`;
    blocks.push(code.slice(openIdx + 1, end - 1));
    result += code.slice(cursor, match.index) + marker;
    cursor = end;
    re.lastIndex = end;
  }
  return { code: result + code.slice(cursor), blocks };
}

/**
 * Supported top-level/local subset of property delegation: `val name[:
 * Type] by lazy { ... }` outside any class body (a class-member lazy
 * property is handled separately by `transpileClassMember`, which has
 * already consumed and removed every one inside a class/object body by
 * the time this runs). Since a plain local/top-level binding has no
 * receiver to hang a real getter off of, the property name itself
 * becomes a memoized zero-arg function, and every later bare read of
 * that name is rewritten to a call to it -- the same
 * declare-then-rewrite-call-sites strategy `transpileExtensionProperties`
 * already uses. Declarations are replaced with a placeholder marker
 * first and substituted back in only AFTER usage sites are rewritten, so
 * the declaration's own internal references to the name are not
 * themselves mistaken for a usage site and double-wrapped.
 */
function transpileTopLevelLazyProperties(code: string): string {
  const lazyNames: string[] = [];
  const declarations: string[] = [];
  code = code.replace(
    /\b(?:val|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?::\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*)?\s+by\s+lazy\s*\{([^{}]*)\}/g,
    (_whole, name, block) => {
      const wrapped = wrapLazyBlockBody(block);
      const marker = `__KT_LAZYDECL_${declarations.length}__`;
      declarations.push(
        `let __kt_lazy_computed_${name} = false, __kt_lazy_value_${name}; const ${name} = () => { if (!__kt_lazy_computed_${name}) { __kt_lazy_computed_${name} = true; __kt_lazy_value_${name} = (() => {\n${wrapped}\n})(); } return __kt_lazy_value_${name}; };`
      );
      lazyNames.push(name);
      return marker;
    }
  );
  for (const name of lazyNames) {
    code = code.replace(new RegExp(`\\b${name}\\b(?!\\s*\\()`, 'g'), `${name}()`);
  }
  declarations.forEach((decl, index) => {
    code = code.replace(`__KT_LAZYDECL_${index}__`, decl);
  });
  return code;
}

/**
 * Supported top-level/local subset of the two remaining, non-`lazy`
 * property-delegation forms this world's lessons use, read-only (`val`)
 * only -- a mutable (`var`) custom delegate would also need every
 * assignment site rewritten to a `setValue(...)` call, which no lesson
 * content here actually exercises:
 *  - Map-backed (`val name: Type by someMap`, `someMap` a known
 *    `mapOf`/`mutableMapOf` variable per `mapVars`): Kotlin looks up the
 *    entry whose key is the property's OWN name. Read-only and eager (the
 *    map already exists), so this becomes a plain `const`, no accessor
 *    function needed.
 *  - Custom delegate (`val name by SomeDelegate()`): Kotlin calls the
 *    delegate's `operator fun getValue(thisRef, property)` on every read,
 *    passing a `KProperty`-shaped object whose `.name` is the delegated
 *    property's own name -- reproduced here as a plain `{ name: '...' }`
 *    object literal, this simulator's stand-in for real `KProperty`
 *    reflection metadata. Uses the same declare-a-marker-then-rewrite-call-
 *    sites strategy as `transpileTopLevelLazyProperties`.
 */
function transpileTopLevelCustomDelegatedProperties(code: string, mapVars: Set<string>): string {
  code = code.replace(/^\s*import\s+[A-Za-z0-9_.]+\s*$/gm, '');
  const accessorNames: string[] = [];
  const declarations: string[] = [];
  code = code.replace(
    // `insertNewForInstantiation` (an earlier pass) has already turned a
    // constructor-call delegate expression into `new D()` by the time
    // this runs, hence the optional leading `new `.
    /\bval\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?::\s*[A-Za-z_][A-Za-z0-9_<>?,\s]*)?\s+by\s+((?:new\s+)?[A-Za-z_][A-Za-z0-9_]*(?:\([^()]*\))?)\s*(?=\n|;|$)/g,
    (whole, name, delegateExpr) => {
      const delegateHead = delegateExpr.replace(/^new\s+/, '').match(/^[A-Za-z_][A-Za-z0-9_]*/)[0];
      if (delegateHead === 'lazy') return whole;
      const marker = `__KT_CUSTOMDELEGATE_${declarations.length}__`;
      if (mapVars.has(delegateHead)) {
        declarations.push(`const ${name} = ${delegateExpr}.get('${name}');`);
        return marker;
      }
      declarations.push(
        `const __kt_delegate_${name} = ${delegateExpr}; const ${name} = () => __kt_delegate_${name}.getValue(null, { name: '${name}' });`
      );
      accessorNames.push(name);
      return marker;
    }
  );
  for (const name of accessorNames) {
    code = code.replace(new RegExp(`\\b${name}\\b(?!\\s*\\()`, 'g'), `${name}()`);
  }
  declarations.forEach((decl, index) => {
    code = code.replace(`__KT_CUSTOMDELEGATE_${index}__`, decl);
  });
  return code;
}

/** Finds every `interface Name { ... }` in `code` and lists its abstract
 * member names (a `fun` header, with or without a default `=`/`{ ... }`
 * body -- class delegation forwards a name regardless of whether the
 * interface itself supplies a default, since an explicit wrapper override
 * must still be able to win either way). Used only by class delegation
 * (`: Interface by delegate`); see `transpileClassDeclarations`. */
function getAllInterfaceMemberNames(code: string): Map<string, string[]> {
  const result = new Map<string, string[]>();
  const re = /\binterface\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const names: string[] = [];
    const fnRe = /\bfun\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
    let fm: RegExpExecArray | null;
    while ((fm = fnRe.exec(m[2])) !== null) names.push(fm[1]);
    result.set(m[1], names);
  }
  return result;
}

/** Finds a class's own primary-constructor property names in `code`, for
 * rewriting bare references to them inside an extension property's getter
 * (see `transpileExtensionProperties`). Returns an empty set for a type
 * with no user-declared class in this program (e.g. `String`). */
function getClassPropertyNames(code: string, typeName: string): Set<string> {
  const m = new RegExp(`\\b(?:data\\s+)?class\\s+${typeName}\\s*\\(([^)]*)\\)`).exec(code);
  if (!m) return new Set();
  return new Set(
    m[1].split(',').map((p) => p.trim().match(/^(?:val|var)\s+([A-Za-z_][A-Za-z0-9_]*)/)?.[1]).filter((n): n is string => Boolean(n))
  );
}

/** Finds ALL of a class's own properties visible to a subclass -- both
 * primary-constructor properties and plain body `val`/`var` declarations
 * (leading visibility modifiers like `protected` stripped first) -- used
 * so a subclass's bare reference to an inherited property (`fun read() =
 * code`, reading a `protected val code` declared on the base class) is
 * still recognized as `this.code` rather than an undefined bare
 * identifier. This is real Kotlin's inheritance-visibility model
 * simplified to "any base property is reachable by name from a
 * subclass" -- adequate for this simulator's single-inheritance depth. */
function getClassOwnPropertyNames(code: string, typeName: string): Set<string> {
  const names = new Set<string>();
  const propLine = /^(?:(?:private|protected|internal|open)\s+)?(?:val|var)\s+([A-Za-z_][A-Za-z0-9_]*)/;
  const withBody = new RegExp(`\\bclass\\s+${typeName}\\b\\s*(?:\\(([^)]*)\\))?\\s*(?:\\:[^{]*)?\\{`).exec(code);
  if (withBody) {
    if (withBody[1]) {
      for (const p of withBody[1].split(',')) {
        const match = p.trim().match(propLine);
        if (match) names.add(match[1]);
      }
    }
    const openIdx = withBody.index + withBody[0].length - 1;
    let depth = 1;
    let i = openIdx + 1;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === '{') depth++;
      else if (code[i] === '}') depth--;
    }
    for (const line of code.slice(openIdx + 1, i - 1).split('\n')) {
      const match = line.trim().match(propLine);
      if (match) names.add(match[1]);
    }
    return names;
  }
  const bodyless = new RegExp(`\\bclass\\s+${typeName}\\s*\\(([^)]*)\\)`).exec(code);
  if (bodyless) {
    for (const p of bodyless[1].split(',')) {
      const match = p.trim().match(propLine);
      if (match) names.add(match[1]);
    }
  }
  return names;
}

/**
 * Supported World 11 extension-property subset: `val Type(?).name: RetType
 * get() = expr` (single line, or the property header and `get()` split
 * across two lines), with a single-expression getter body and no setter.
 * An extension property is semantically a zero-argument extension
 * function wearing property syntax (same static, receiver-type-based
 * resolution, same "member wins" rule) -- so rather than reimplementing
 * that dispatch logic a second time, this canonicalizes the declaration
 * into `fun Type(?).name() = expr` and every bare `receiver.name` call
 * site into `receiver.name()`, and lets the already-supported extension
 * FUNCTION pipeline (lowerKotlinFunctions in kotlinFunctions.ts) do the
 * rest. A bare, unqualified reference to the receiver's own
 * primary-constructor property inside the getter body (`width*height`,
 * not `this.width*this.height`) is rewritten to `this.width*this.height`
 * first via the same `rewriteClassPropertyAccess` helper an ordinary
 * class body already uses -- kotlinFunctions.ts then substitutes that
 * `this` for the real receiver parameter, exactly like any other
 * extension function.
 */
function transpileExtensionProperties(code: string): string {
  const propNames: string[] = [];
  code = code.replace(
    /\bval\s+([A-Za-z_][A-Za-z0-9_]*)(\?)?\s*\.\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*[A-Za-z_][A-Za-z0-9_<>?]*\s*\n?\s*get\(\)\s*=\s*([^\n]+)/g,
    (_whole, receiverType, nullable, propName, body) => {
      const receiverProps = getClassPropertyNames(code, receiverType);
      const rewrittenBody = rewriteClassPropertyAccess([body], receiverProps, new Set(), 'this.')[0];
      propNames.push(propName);
      return `fun ${receiverType}${nullable ?? ''}.${propName}() = ${rewrittenBody}`;
    }
  );
  for (const propName of propNames) {
    code = code.replace(new RegExp(`\\.${propName}\\b(?!\\()`, 'g'), `.${propName}()`);
  }
  return code;
}

function protectLazyBlocks(code: string): { code: string; blocks: string[] } {
  const blocks: string[] = [];
  const re = /\bby\s+lazy\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(code)) !== null) {
    const openIdx = match.index + match[0].length - 1;
    let depth = 1;
    let end = openIdx + 1;
    for (; end < code.length && depth > 0; end++) {
      if (code[end] === '{') depth++;
      else if (code[end] === '}') depth--;
    }
    if (depth !== 0) continue;
    const marker = `__KT_LAZYBLOCK_${blocks.length}__`;
    blocks.push(code.slice(match.index, end));
    result += code.slice(cursor, match.index) + marker;
    cursor = end;
    re.lastIndex = end;
  }
  return { code: result + code.slice(cursor), blocks };
}

/**
 * Transpiles Kotlin code into an isolated JavaScript execution function.
 */
export function transpileKotlinToJS(kotlinCode: string): string {
  // World 16 Lesson 1 normalization must run before lowerKotlinFunctions:
  // imports are not executable in the new-Function sandbox, and `suspend`
  // is modifier metadata for this deliberately synchronous teaching subset.
  // The helper's lexical scan preserves matching text in strings/comments.
  kotlinCode = prepareCoroutineSource(kotlinCode);
  // A custom property-delegate's `getValue`/`setValue` signature takes a
  // `KProperty<*>` parameter (real reflection metadata this simulator does
  // not model) -- the star-projected generic `<*>` breaks
  // kotlinFunctions.ts's parameter-list parsing (it silently drops the
  // whole parameter, not just its type), so it is erased before that pass
  // ever sees it. `operator` is a modifier `stripModifierKeywords` doesn't
  // reach until AFTER function lowering has already run; strip it here too
  // so it never lingers as stray leftover text in front of the generated
  // `function getValue(...)`.
  kotlinCode = kotlinCode.replace(/KProperty<[^>]*>/g, 'KProperty').replace(/\boperator\s+(?=fun\b)/g, '');
  // World 16: `async<Int> { ... }` (an explicit type argument on a
  // coroutine builder call whose block is a trailing LAMBDA, not a call
  // with parens) is real, common Kotlin used to pin a Deferred's result
  // type -- but `eraseGenericConstructorArguments` (below) only strips a
  // `<...>` immediately before `(`, never before `{`. Left alone, the
  // literal `<Int>` survives all the way into the generated JS as
  // `__kt_async<Int> { ... }`, which is not valid JavaScript at all
  // (confirmed directly: `new Function(...)` rejects it with `Unexpected
  // token 'new'`, a confusing error with no visible connection to the
  // real cause). Scoped to `async`/`launch` specifically -- the only
  // coroutine builders any lesson gives an explicit type argument -- so
  // this can never misfire on an unrelated `x < Type > y` comparison chain.
  kotlinCode = kotlinCode.replace(/\b(async|launch)\s*<\s*[A-Za-z_][A-Za-z0-9_]*\s*>\s*(?=[({])/g, '$1 ');
  // World 15: `e::class.simpleName` (a caught exception's runtime type
  // name, e.g. printed as "NumberFormatException") -> `e.constructor.name`.
  // Every built-in and user-declared exception class is named exactly like
  // its real Kotlin counterpart (see kotlinExceptions.ts), so the JS
  // class's own `.name` already IS the right string with no extra mapping.
  // Scoped to a bare identifier receiver (`e`, `it`) -- the only shape any
  // lesson content actually uses.
  kotlinCode = kotlinCode.replace(/\b([A-Za-z_][A-Za-z0-9_]*)::class\.simpleName\b/g, '$1.constructor.name');
  // A whole-line `@Annotation(...)` (World 15's Checked vs Unchecked
  // Exception Model lesson uses `@Throws(...)` purely to illustrate a
  // Java-interop concept Kotlin itself does not enforce -- see PITFALLS.md)
  // has no runtime meaning this simulator needs to model; JS has no
  // annotation syntax at all, so left in place it would be a hard
  // SyntaxError. Scoped to a line that IS only the annotation (matching
  // how this and every other annotation appear in lesson content, always
  // on their own source line immediately before the thing they annotate).
  kotlinCode = kotlinCode.replace(/^[ \t]*@[A-Za-z_][A-Za-z0-9_.]*\([^\n]*\)[ \t]*$/gm, '');
  // A `where T : X, T : Y` clause (multiple upper bounds on one type
  // parameter) is compile-time-only constraint metadata with no runtime
  // meaning, but kotlinFunctions.ts's return-type reader has no concept of
  // it: it just keeps consuming tokens up to the next `=`/`{`, so the whole
  // clause gets glued onto the return type with no spaces between tokens
  // (`StringwhereT:Named,T:Prioritized`) -- corrupt text that then fails to
  // parse as either a type or a function body. Erased before that pass
  // ever runs; non-greedy up to the next `=`/`{`, since a `where` clause's
  // own comma list never itself contains one.
  kotlinCode = kotlinCode.replace(/\s*\bwhere\s+[A-Za-z_][\s\S]*?(?=[={])/g, '');
  // A bare integer literal immediately followed by `.member` (e.g.
  // `4.also { ... }`, from World 13's scope-function lessons) is valid
  // Kotlin, but JS's own numeric-literal grammar greedily consumes the
  // trailing `.` into the number itself (`4.` is a complete float), then
  // fails to parse the immediately-adjacent identifier with no operator
  // between them (`4.also` -> `SyntaxError: Invalid or unexpected token`).
  // Existing lesson content already sidesteps this by hand (`(250).foo()`
  // in World 11) -- generalized here so new content doesn't have to. The
  // lookahead requires a letter/underscore right after the dot, so a real
  // decimal literal (`3.14`, digit after the dot) is never touched.
  kotlinCode = kotlinCode.replace(/\b(\d+)\.(?=[A-Za-z_])/g, '($1).');
  // A standalone Kotlin range VALUE used as an expression (World 14, e.g.
  // `(1..100).asSequence()`, `(1..1_000_000).filter { ... }`) is not
  // valid JS at all -- `1..100` isn't a JS token sequence -- unlike a
  // for-loop header's `a..b` (`transformForLoops`, a separate later
  // pass). Every lesson usage wraps the range in its own parens
  // specifically to call a method off the result, so requiring `(` and
  // `)` immediately around the range is enough to avoid colliding with a
  // for-loop header (`for (i in 1..10)` -- the parens there belong to the
  // `for(...)` call, not to `1..10` alone) or the existing `x in a..b`
  // boolean-membership form. `__kt_range` (added to the runtime below)
  // returns a real, reusable KotlinList so every existing List operation
  // -- and the new `.asSequence()` -- already works on it for free.
  kotlinCode = kotlinCode.replace(/\((\d[\d_]*)\.\.(\d[\d_]*)\)/g, '(__kt_range($1, $2))');
  // The same range-as-value case, but assigned directly with no wrapping
  // parens at all (World 14's Boss lesson: `val source = 1..100`, then
  // `source.filter { ... }` later) -- unambiguous only when the range is
  // the WHOLE remaining line (`$`, in multiline mode), since a range used
  // as part of a larger expression on the same line already needs its own
  // parens in real Kotlin to chain a method off it.
  kotlinCode = kotlinCode.replace(/=(\s*)(\d[\d_]*)\.\.(\d[\d_]*)\s*$/gm, '=$1__kt_range($2, $3)');
  kotlinCode = transpileReifiedFunctions(kotlinCode);
  // Capture Map-producing declarations before lambda lowering expands a
  // chained expression across lines. The post-lowering scan below still
  // catches declarations introduced or normalized by the lowering passes.
  const sourceMapVars = inferMapVars(kotlinCode);
  const sourceInterfaceNames = getAllInterfaceNames(kotlinCode);
  const sourceMutableListVars = inferMutableListVars(kotlinCode);
  kotlinCode = transpileExtensionProperties(kotlinCode);
  kotlinCode = stripCollectionGenerics(kotlinCode);
  const protectedCompanions = protectCompanionBlocks(kotlinCode);
  kotlinCode = protectedCompanions.code;
  const protectedGetters = protectGetterProperties(kotlinCode);
  kotlinCode = protectedGetters.code;
  const protectedBlockGetters = protectBlockGetterProperties(kotlinCode);
  kotlinCode = protectedBlockGetters.code;
  const protectedLazyBlocks = protectLazyBlocks(kotlinCode);
  kotlinCode = protectedLazyBlocks.code;
  const protectedSequenceBuilders = protectSequenceBuilders(kotlinCode);
  kotlinCode = protectedSequenceBuilders.code;
  kotlinCode = lowerKotlinFunctions(kotlinCode);
  protectedSequenceBuilders.blocks.forEach((block, index) => {
    // `yield(x)` is already valid JS as-is inside a `function*` (a plain
    // parenthesized operand of the `yield` keyword) -- only `yieldAll(x)`
    // needs rewriting, to JS's `yield* (x)`. Deliberately narrow ([^)]* --
    // a single argument, no nested parens): every lesson usage is exactly
    // this shape; widen only if real content needs more.
    const generatorBody = block.replace(/\byieldAll\(([^)]*)\)/g, 'yield* ($1)');
    kotlinCode = kotlinCode.replace(`__KT_SEQBLOCK_${index}__`, `new Sequence(function* () {${generatorBody}}, false)`);
  });
  protectedLazyBlocks.blocks.forEach((block, index) => {
    kotlinCode = kotlinCode.replace(`__KT_LAZYBLOCK_${index}__`, block);
  });
  protectedBlockGetters.blocks.forEach((block, index) => {
    kotlinCode = kotlinCode.replace(`__KT_BLOCKGETTER_${index}__`, block);
  });
  protectedGetters.blocks.forEach((block, index) => {
    kotlinCode = kotlinCode.replace(`__KT_GETTERPROP_${index}__`, block);
  });
  protectedCompanions.blocks.forEach((block, index) => {
    kotlinCode = kotlinCode.replace(`__KT_COMPANION_${index}__`, block);
  });
  kotlinCode = transpileMapDeclarations(kotlinCode);
  kotlinCode = transpileOOPDeclarations(kotlinCode);
  kotlinCode = transpileWhenBlocks(kotlinCode);
  kotlinCode = transpileMultilineIfExpressions(kotlinCode);
  const lines = kotlinCode.split('\n');
  const jsLines: string[] = [];
  const intVars = inferIntTypedVars(kotlinCode);
  const mapVars = new Set([...sourceMapVars, ...inferMapVars(kotlinCode)]);
  const mutableListVars = new Set([...sourceMutableListVars, ...inferMutableListVars(kotlinCode)]);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Strip comments for transformation, but preserve line structure
    const commentIdx = line.indexOf('//');
    let comment = '';
    if (commentIdx !== -1) {
      comment = line.slice(commentIdx);
      line = line.slice(0, commentIdx);
    }

    // Strip Kotlin numeric literal type suffixes (100_000L, 3.14f, 19.99d/D)
    // before treating the line as JS -- JS has no such suffix syntax, so
    // `100_000L` (still valid, since JS does support the `_` digit-group
    // separator) is otherwise a SyntaxError and the whole program fails to
    // run, even when the Kotlin code itself is perfectly correct. The
    // underscore separator needs no further handling; only the trailing
    // type-suffix letter must go.
    line = line.replace(/\b(\d[\d_]*(?:\.[\d_]+)?)[fFdDL]\b/g, '$1');

    // Range-based for loops (`for (i in 1..10) { ... }`) -- must run
    // before the is/in transforms below, see `transformForLoops` above.
    line = transformForLoops(line);

    // Guard loops against infinite execution in the browser
    line = line.replace(/\b((?:while|for)\s*\([^)]*\))\s*\{/, '$1 { __kt_check_loop();');
    line = line.replace(/\bdo\s*\{/, 'do { __kt_check_loop();');

    // Truncate Int/Int division the way real Kotlin does (see
    // `wrapIntDivision` above) -- must run after suffix-stripping so a
    // literal like `100L` is already bare `100` by the time we classify it.
    line = wrapIntDivision(line, intVars);

    // `is`/`!is` type checks and `in`/`!in` range checks -- see
    // `transformTypeChecks`/`transformRanges` above.
    line = transformTypeChecks(line, sourceInterfaceNames);
    line = transformRanges(line);

    // Null-safety expressions are lowered with token boundaries in kotlinFunctions.ts.

    // Replace Kotlin val -> const, var -> let
    // Handle: val name: Type = expr -> const name = expr
    // The type char class includes `?` so a nullable declared type
    // (`val name: String? = ...`, `val ages: List<Int?> = ...`) is
    // consumed and stripped along with the rest of the annotation, rather
    // than leaving a stray `?` behind that would break the rest of the line.
    line = line.replace(/\bval\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*=/g, 'const $1 =');
    line = line.replace(/\bvar\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*=/g, 'let $1 =');
    // A `const`/`let` declaration whose RHS is a bare, self-contained
    // literal (never continued onto a later line, unlike a chained
    // pipeline's receiver expression) needs an explicit trailing `;` --
    // Kotlin never requires one, so the line is otherwise emitted exactly
    // as written. Without it, if the VERY NEXT statement happens to start
    // with `(` (World 14's standalone `(a..b)` range values, or any bare
    // parenthesized expression used as its own statement), JS automatic
    // semicolon insertion does NOT insert a semicolon before a line
    // starting with `(` -- so `let c = 0\n(range).map(...)` is parsed as
    // ONE statement, `let c = 0(range).map(...)`, calling the number `0`
    // as a function (`TypeError: 0 is not a function`). Confirmed via
    // direct execution before narrowing the fix to this literal-RHS-only
    // shape, specifically to avoid ever terminating a real multi-line
    // chain (`val result = source\n    .filter { ... }`), whose own
    // first line's RHS is never a bare literal.
    if (/=\s*(-?\d+(?:\.\d+)?|true|false|null)\s*$/.test(line)) line = line + ';';

    // Kotlin single-line if-expression (`val x = if (cond) a else b`) ->
    // JS ternary -- see `transformIfExpression` above.
    line = transformIfExpression(line);

    // Kotlin equality calls an object's generated/declared equals method;
    // JavaScript's `==` only compares object identity. This narrow lowering
    // covers the identifiers and property accesses used by the teaching
    // runner while retaining primitive equality behavior.
    line = line.replace(/\b([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)?)\s*==\s*([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)?|\d+|true|false|null)\b/g, '__kt_equals($1, $2)');

    // Handle Kotlin fun declarations
    // fun foo(a: Int, b: String): String { -> function foo(a, b) {
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>?]+)?\s*\{/g, (_, name, params) => {
      return `function ${name}(${cleanKotlinParams(params)}) {`;
    });

    // Handle single-expression functions: fun sum(a: Int, b: Int) = a + b
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>?]+)?\s*=\s*(.+)$/g, (_, name, params, expr) => {
      return `function ${name}(${cleanKotlinParams(params)}) { return ${expr}; }`;
    });

    // Transform Kotlin string templates within double quotes:
    // "Hello $name! You have ${coins + 5} coins" -> `Hello ${name}! You have ${coins + 5} coins`
    line = line.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, inner) => {
      if (inner.includes('$')) {
        // Convert ${expr} -> ${expr}
        // Convert $varName -> ${varName}
        // A `$` immediately preceded by a backslash is Kotlin's OWN escape
        // for a literal, non-interpolating dollar sign (`\$price` should
        // print the two characters "$price", not run price as a template
        // reference) -- the negative lookbehind skips converting that one
        // into `${price}`. The backslash+dollar is then left exactly as
        // written in the resulting JS template literal, where `\$` (not
        // followed by `{`) is ALSO already a literal-dollar escape in JS,
        // so no further rewriting is needed for it to print correctly.
        let transformed = inner.replace(/(?<!\\)\$([a-zA-Z_][a-zA-Z0-9_]*)/g, '${$1}');
        transformed = transformed.replace(/(?<!\\)\$\{([^{}]+)\}/g, (_whole: string, expression: string) => '${__kt_format(' + lowerKotlinFunctions(expression) + ')}');
        return `\`${transformed}\``;
      }
      return match;
    });

    // Handle Kotlin collections. Map pairs use Kotlin's `key to value`
    // syntax; this deliberately supports the simple literal/identifier
    // pairs used by the beginner Collection Valley lessons.
    line = line.replace(/\b(mapOf|mutableMapOf)\(([^)]*)\)/g, (_whole, factory, args) => {
      const pairs = args.split(',').map((entry: string) => {
        const parts = entry.trim().split(/\s+to\s+/);
        return parts.length === 2 ? `[${parts[0]}, ${parts[1]}]` : entry;
      });
      return `${factory === 'mutableMapOf' ? '__kt_mutableMapOf' : '__kt_mapOf'}(${pairs.join(', ')})`;
    });
    for (const mapVar of mapVars) {
      const escaped = mapVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const assignment = new RegExp(`\\b${escaped}\\s*\\[([^\\]]+)\\]\\s*=\\s*(.+)$`);
      line = line.replace(assignment, (_whole, key, value) => `${mapVar}.set(${key}, ${value})`);
      const access = new RegExp(`\\b${escaped}\\s*\\[([^\\]]+)\\]`, 'g');
      line = line.replace(access, (_whole, key) => `${mapVar}.get(${key})`);
    }
    for (const listVar of mutableListVars) {
      const escaped = listVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // `receiver.xs += value` as well as a bare `xs += value` -- an
      // optional leading `identifier.` receiver chain covers a mutable
      // list reached through a property (`b.xs += 2`), not just a local
      // variable. The `[^;\n]+` value stops at the next statement
      // (several statements often share one physical line here), so it
      // never swallows a trailing `; nextStatement()` as part of the value.
      const plusAssign = new RegExp(`((?:[a-zA-Z_][a-zA-Z0-9_]*\\.)?${escaped})\\s*\\+=\\s*([^;\\n]+)`, 'g');
      line = line.replace(plusAssign, (_whole, target, value) => `${target}.add(${value.trim()})`);
    }
    // A nullable collection reference's safe-call size (`bonuses?.size`) is
    // handled separately from plain `.size` -- JS's own `?.` short-circuits
    // to `undefined` before ever reaching a property, but `__kt_size`
    // unconditionally reads `.size`/`.length`, which would throw on a null
    // receiver instead of safely producing null. Must run before the plain
    // `.size` replace below (which wouldn't match the `?` anyway, but this
    // keeps the safe-call case handled first and explicitly).
    line = line.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\?\.size\b(?!\s*\()/g, '($1 == null ? null : __kt_size($1))');
    // The receiver can itself be a member-access chain (`service.items.size`,
    // not just a bare `list.size`) -- capture every dotted segment leading
    // up to the final `.size`, not just the single identifier closest to
    // it, so the whole chain becomes the argument to `__kt_size` instead of
    // only its last segment (`service.__kt_size(items)`, invalid). The
    // negative lookahead excludes a real `.size(...)` METHOD call (a class
    // or object member happens to be named `size`, distinct from a
    // collection's `.size` PROPERTY) from being mistaken for one.
    line = line.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\.size\b(?!\s*\()/g, '__kt_size($1)');
    line = line.replace(/\barrayOf\(/g, '__kt_arrayOf(');
    line = line.replace(/\b(?:listOf|emptyList)\(/g, '__kt_listOf(');
    line = line.replace(/\bmutableListOf\(/g, '__kt_mutableListOf(');
    line = line.replace(/\bsetOf\(/g, '__kt_setOf(');
    line = line.replace(/\bmutableSetOf\(/g, '__kt_mutableSetOf(');

    jsLines.push(line + comment);
  }

  return jsLines.join('\n');
}



/**
 * Compiles and runs a Kotlin program in-browser with sandboxing,
 * output streaming, diagnostic generation, and optional test case execution.
 */
export async function compileAndRunKotlin(
  code: string,
  options?: {
    testCase?: { call?: string; expected?: string };
    expectedOutput?: string;
    timeoutMs?: number;
  }
): Promise<KotlinExecutionResult> {
  const startTime = performance.now();
  const timeoutMs = options?.timeoutMs || 2000;

  try { code = prepareKotlinSource(code); }
  catch (err) {
    return { success: false, output: '', logs: [], error: { message: `Syntax error: ${(err as Error).message}`, line: err instanceof KotlinSourceError ? err.line : 1, type: 'syntax_error' }, executionTimeMs: 0, exitCode: 1 };
  }

  // World 16: `Job`/`CoroutineName`/`CoroutineExceptionHandler`/`Dispatchers`
  // are bare top-level identifiers a coroutine lesson's code needs in
  // scope (`coroutineContext[Job]`, `Dispatchers.Default`, etc.), but
  // they are also completely ordinary, plausible NAMES a non-coroutine
  // lesson's own Kotlin might declare for unrelated domain types --
  // World 13's own `data class Job(var state: String = "")` is exactly
  // this collision, confirmed directly: unconditionally injecting
  // `const Job = ...` into every generated script's top-level scope
  // broke that lesson with `Identifier 'Job' has already been declared`.
  // Real Kotlin never has this problem (these names are only in scope
  // where a file actually imports kotlinx.coroutines); this flat-scope
  // simulator reproduces that by only injecting the coroutine prelude
  // when the ORIGINAL source actually references coroutines.
  const usesCoroutines = /\bkotlinx\.coroutines\b|\brunBlocking\b|\blaunch\s*\(|\basync\s*\(|\bcoroutineScope\s*\{|\bsupervisorScope\s*\{|\bwithContext\s*\(|\bcoroutineContext\b|\bCoroutineStart\b|\bCoroutineName\s*\(|\bDispatchers\./.test(code);

  // 1. Static Validation (Lexical, Syntax, Immutability, Type Constraints)
  const validationError = staticValidateKotlin(code);
  if (validationError) {
    const elapsed = Math.round(performance.now() - startTime);
    return {
      success: false,
      output: '',
      logs: [],
      error: validationError,
      executionTimeMs: elapsed,
      exitCode: 1,
    };
  }
  const inheritanceError = checkFinalClassInheritance(code);
  if (inheritanceError) {
    const elapsed = Math.round(performance.now() - startTime);
    return { success: false, output: '', logs: [], error: inheritanceError, executionTimeMs: elapsed, exitCode: 1 };
  }

  // 2. Transpilation to Safe JS
  let transpiledJS = '';
  try {
    transpiledJS = transpileKotlinToJS(code);
  } catch (err: any) {
    const elapsed = Math.round(performance.now() - startTime);
    return {
      success: false,
      output: '',
      logs: [],
      error: {
        message: `Compilation error: ${err?.message || 'Failed to parse Kotlin code'}`,
        line: err instanceof KotlinFunctionError ? err.line : 1,
        type: 'compiler_error',
      },
      executionTimeMs: elapsed,
      exitCode: 1,
    };
  }

  // 3. Execution Environment
  const stdout: string[] = [];
  // Tracks whether the last stdout entry is a line still "open" (started by
  // a print() call that hasn't been newline-terminated yet) vs. a completed
  // line (the previous call was println(), or there's no previous call at
  // all). Both print() and println() must consult and update this flag --
  // print() alone assuming the last entry is always open breaks as soon as
  // it's preceded by a println() (which must start a fresh entry, not
  // append to the finished line above it).
  let lineOpen = false;
  const appendOutput = (text: string) => {
    if (lineOpen && stdout.length > 0) {
      stdout[stdout.length - 1] += text;
    } else {
      stdout.push(text);
    }
  };
  const formatKotlinValue = (value: any): string => {
    // JS optional chaining (`?.`) short-circuits to `undefined`, not
    // `null`, when the left side is nullish -- but Kotlin has only ONE
    // null value, and a safe-call chain that fizzles out should print
    // exactly like an explicit `null` would. Without this, `x?.length`
    // would print "undefined" for a null x while `x` itself prints "null",
    // an inconsistency with no equivalent in real Kotlin.
    if (value === undefined) return 'null';
    if (value instanceof KotlinPair) return `(${formatKotlinValue(value.first)}, ${formatKotlinValue(value.second)})`;
    if (Array.isArray(value)) return `[${value.map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Set) return `[${[...value].map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Map) return `{${[...value.entries()].map(([k, v]) => `${formatKotlinValue(k)}=${formatKotlinValue(v)}`).join(', ')}}`;
    return String(value);
  };

  if (!(Number.prototype as any).toLong) {
    Object.defineProperties(Number.prototype, {
      toLong: { value: function () { const value = Math.trunc(Number(this)); if (!Number.isSafeInteger(value)) throw new Error('Long conversion outside the editor safe-integer range'); return value; } },
      toInt: { value: function () { return Math.trunc(Number(this)); } },
      toDouble: { value: function () { return Number(this); } },
      // Math.fround alone gives the nearest true 32-bit float value, but
      // printing that raw double (e.g. 19.989999771118164 for 19.99f)
      // exposes float32-rounding noise that real Kotlin's Float.toString
      // never shows -- it prints the shortest decimal that round-trips to
      // the same float32, e.g. "19.99". Rounding to 7 significant digits
      // (float32's precision ceiling) before converting back to a plain
      // number reproduces that shortest-decimal behavior for lesson-scale
      // values without needing a full float32 shortest-round-trip algorithm.
      toFloat: { value: function () { return Number(Math.fround(Number(this)).toPrecision(7)); } },
    });
  }
  // World 13's `let`/`run`/`apply`/`also` are Kotlin extension functions on
  // EVERY type (`T.let(...)`, etc.), so this simulator has no single
  // built-in prototype to attach them to -- Object.prototype is the one
  // place every value (including boxed primitives, via the standard JS
  // autoboxing that already happens for e.g. `"x".length`) inherits from.
  // kotlinFunctions.ts already lowers each call's trailing lambda to a
  // plain function that takes the receiver as its own first positional
  // parameter (never JS `this`) -- see the `size: String.() -> Int = {
  // length }` case this reuses -- so all four just need to call `block`
  // with `this` (unboxed back to a primitive first; a boxed String/Number/
  // Boolean would otherwise make e.g. `it is String` checks see `typeof
  // 'object'` instead of the real primitive type). `run`/`apply` receive a
  // receiver-style block (no separate argument), but that's exactly the
  // same call shape once lowered -- both forms already collapse to a
  // single positional parameter. `also`/`apply` discard the block's own
  // result and return the original (unboxed) receiver instead, matching
  // Kotlin. `Object.prototype.apply` does not shadow `Function.prototype
  // .apply` for an actual function value -- Function.prototype is closer
  // in the prototype chain and already defines its own `apply` -- so this
  // only ever applies to non-function receivers, which is the only case
  // any World 13 lesson exercises.
  if (!(Object.prototype as any).let) {
    const __kt_unbox = (value: any) => (value instanceof Number || value instanceof String || value instanceof Boolean) ? value.valueOf() : value;
    Object.defineProperties(Object.prototype, {
      let: { value: function (block: (receiver: any) => any) { return block(__kt_unbox(this)); }, configurable: true, writable: true },
      run: { value: function (block: (receiver: any) => any) { return block(__kt_unbox(this)); }, configurable: true, writable: true },
      also: { value: function (block: (receiver: any) => any) { const receiver = __kt_unbox(this); block(receiver); return receiver; }, configurable: true, writable: true },
      apply: { value: function (block: (receiver: any) => any) { const receiver = __kt_unbox(this); block(receiver); return receiver; }, configurable: true, writable: true },
      // World 14's Creating Sequences lesson uses `(n--).takeIf { it > 0 }`
      // to model the single-use, no-seed generateSequence overload. Same
      // `it`-argument shape as let/also -- kotlinFunctions.ts's generic
      // trailing-lambda lowering already defaults an UNREGISTERED call
      // name to an `it`-bound lambda (see the `!expected?.params && label`
      // branch in `lambda()`), so no signature registration was needed
      // here, only the runtime method itself.
      takeIf: { value: function (predicate: (receiver: any) => boolean) { const receiver = __kt_unbox(this); return predicate(receiver) ? receiver : null; }, configurable: true, writable: true },
      takeUnless: { value: function (predicate: (receiver: any) => boolean) { const receiver = __kt_unbox(this); return predicate(receiver) ? null : receiver; }, configurable: true, writable: true },
      // World 15's receiver form, `"25".runCatching { toInt() }` -- a
      // dot-prefixed call, so kotlinFunctions.ts resolves it via
      // `scopeMemberSignatures` (like let/run/also/apply) rather than the
      // bare-name `__kt_runCatching` rename above, and it reaches the
      // runtime as a real method call needing a real prototype method.
      runCatching: { value: function (block: () => any) { return kotlinRunCatching(block, __kt_unbox(this)); }, configurable: true, writable: true },
    });
  }
  // World 13's apply/also Explore examples build up text with
  // StringBuilder (`StringBuilder().apply { append("dark"); append(...) }`)
  // -- there is no JS equivalent, so `new StringBuilder()` (inserted by
  // `insertNewForInstantiation`, which also needs "StringBuilder" added to
  // its recognized class-name set -- see transpileKotlinToJS) would
  // otherwise fail with "StringBuilder is not defined". Defined as a real
  // global rather than a sandbox-passed parameter, the same way Number/
  // Array/Map already work inside the generated code without being
  // explicitly injected. `.append` returns `this` to support the real
  // Kotlin chaining style (`sb.append(a).append(b)`), and `toString()`
  // covers both explicit calls and this simulator's own print/format path
  // (`formatKotlinValue` falls back to `String(value)`, which itself calls
  // `toString()`).
  if (!(globalThis as any).StringBuilder) {
    (globalThis as any).StringBuilder = class KotlinStringBuilder {
      __kt_text: string;
      constructor(initial: string = '') { this.__kt_text = initial; }
      append(value: any) { this.__kt_text += String(value); return this; }
      get length() { return this.__kt_text.length; }
      toString() { return this.__kt_text; }
    };
  }
  // World 15: the exception hierarchy, `Result`/`runCatching`, `require`/
  // `check`, and `__kt_throw` -- all exposed as real globals (not sandbox
  // parameters) the same way StringBuilder/Sequence already are, so
  // generated code can reference them by their literal Kotlin names with
  // no separate call-site renaming pass. `__kt_throw` turns Kotlin's
  // expression-position `throw` (Elvis right-hand side, an if-expression
  // branch) into a plain function call -- JS's own `throw` is a statement
  // and cannot appear inside a ternary or `??`, so every expression-
  // position `throw` is rewritten to call this instead (see
  // `transformIfExpression`/`kotlinFunctions.ts`'s elvis handling).
  if (!(globalThis as any).Exception) {
    (globalThis as any).Throwable = Throwable;
    (globalThis as any).Exception = Exception;
    (globalThis as any).RuntimeException = RuntimeException;
    (globalThis as any).IllegalStateException = IllegalStateException;
    (globalThis as any).IllegalArgumentException = IllegalArgumentException;
    (globalThis as any).NumberFormatException = NumberFormatException;
    (globalThis as any).IndexOutOfBoundsException = IndexOutOfBoundsException;
    (globalThis as any).ArithmeticException = ArithmeticException;
    (globalThis as any).NoSuchElementException = NoSuchElementException;
    (globalThis as any).UnsupportedOperationException = UnsupportedOperationException;
    (globalThis as any).Result = KotlinResult;
    (globalThis as any).runCatching = (block: () => any) => kotlinRunCatching(block);
    (globalThis as any).require = (condition: boolean, lazyMessage?: () => string) => {
      if (!condition) throw new IllegalArgumentException(lazyMessage ? lazyMessage() : 'Failed requirement.');
    };
    (globalThis as any).check = (condition: boolean, lazyMessage?: () => string) => {
      if (!condition) throw new IllegalStateException(lazyMessage ? lazyMessage() : 'Check failed.');
    };
    (globalThis as any).error = (message: any) => { throw new IllegalStateException(String(message)); };
    (globalThis as any).__kt_throw = (error: any) => { throw error; };
  }
  // World 14: Sequence and its creation functions, exposed as real
  // globals (not sandbox parameters) the same way StringBuilder is --
  // generated code references them by their literal Kotlin names
  // (`Sequence`, `sequenceOf`, `generateSequence`), so no separate
  // call-site renaming pass is needed.
  if (!(globalThis as any).Sequence) {
    (globalThis as any).Sequence = KotlinSequence;
    // World 14's Eager Collection Processing lesson has a Predict question
    // asking `x is List<Int>` (contrasted against `is Sequence<Int>`
    // elsewhere in the same world) -- needs "List" resolvable as a real
    // instanceof target the same way "Sequence" now is. Scoped to just
    // List for now, matching the one case that actually needs it; extend
    // with MutableList/Set/Map only once real content requires them too.
    (globalThis as any).List = KotlinList;
    (globalThis as any).sequenceOf = (...items: any[]) => new KotlinSequence(() => items[Symbol.iterator](), false);
    // Two distinct real-Kotlin overloads, disambiguated by arity (JS
    // leaves `next` undefined for a one-argument call): `generateSequence
    // (seed, nextFunction)` always yields the seed first, then repeatedly
    // reapplies nextFunction to the previous value until it returns null
    // -- reusable, since each fresh iteration recomputes from the same
    // seed. `generateSequence(nextFunction)` (no seed) instead calls a
    // stateful zero-arg function for every value including the first, and
    // real Kotlin documents this overload as constrained to one
    // iteration -- a second traversal must throw, not silently restart.
    (globalThis as any).generateSequence = (seedOrNext: any, next?: (prev: any) => any) => {
      if (typeof next === 'function') {
        const seed = seedOrNext;
        return new KotlinSequence(function* () {
          let current = seed;
          while (current != null) { yield current; current = next(current); }
        }, false);
      }
      const nextFn = seedOrNext as () => any;
      return new KotlinSequence(function* () {
        let value = nextFn();
        while (value != null) { yield value; value = nextFn(); }
      }, true);
    };
    (globalThis as any).__kt_range = (a: number, b: number) => {
      const out = new KotlinList();
      for (let i = a; i <= b; i++) out.push(i);
      return out;
    };
  }
  // World 16 Lesson 11: `GlobalScope.launch { ... }` is the anti-pattern
  // the lesson teaches learners to avoid -- see `kotlinGlobalScopeLaunch`'s
  // doc comment in kotlinCoroutines.ts for exactly what this does and does
  // not simulate. Exposed as a real global the same way Exception/Sequence/
  // StringBuilder already are, so generated code can reference the literal
  // Kotlin name with no separate call-site renaming pass.
  if (!(globalThis as any).GlobalScope) {
    (globalThis as any).GlobalScope = { launch: kotlinGlobalScopeLaunch };
  }
  if (!(String.prototype as any).trimIndent) Object.defineProperty(String.prototype, 'trimIndent', { value: function () {
    const lines = String(this).split(/\r?\n/);
    if (lines.length && !lines[0].trim()) lines.shift();
    if (lines.length && !lines.at(-1)!.trim()) lines.pop();
    const nonblank = lines.filter(line => line.trim());
    const indent = nonblank.length ? Math.min(...nonblank.map(line => line.match(/^\s*/)![0].length)) : 0;
    return lines.map(line => line.trim() ? line.slice(indent) : '').join('\n');
  } });

  // Standard Kotlin String and Collection utility prototypes
  if (typeof (String.prototype as any).reversed !== 'function') {
    (String.prototype as any).reversed = function () {
      return this.split('').reverse().join('');
    };
  }
  if (typeof (String.prototype as any).lowercase !== 'function') {
    (String.prototype as any).lowercase = function () {
      return this.toLowerCase();
    };
  }
  if (typeof (String.prototype as any).uppercase !== 'function') {
    (String.prototype as any).uppercase = function () {
      return this.toUpperCase();
    };
  }
  // World 15: real Kotlin's `String.toInt()` validates the WHOLE string
  // (optional leading sign, then digits only -- no surrounding whitespace,
  // no trailing garbage) and throws `NumberFormatException` otherwise, with
  // an exact, JVM-matching message (`For input string: "text"`) that
  // World 15's own Boss lesson asserts verbatim in its `expectedOutput`.
  // The previous `parseInt(this, 10)` was lenient exactly like JS's own
  // `parseInt` -- `"12x".toInt()` silently returned 12 instead of throwing
  // -- a silent-wrong-answer bug of exactly the kind this codebase's own
  // pitfalls file warns about repeatedly, invisible until a lesson actually
  // needed the throwing behavior (World 1-14 content never did).
  if (typeof (String.prototype as any).toInt !== 'function' || !(String.prototype as any).__kt_toIntThrows) {
    (String.prototype as any).toInt = function () {
      const s = String(this);
      if (!/^[+-]?\d+$/.test(s) || !Number.isSafeInteger(parseInt(s, 10))) {
        throw new NumberFormatException(`For input string: "${s}"`);
      }
      return parseInt(s, 10);
    };
    (String.prototype as any).__kt_toIntThrows = true;
  }
  if (typeof (String.prototype as any).toIntOrNull !== 'function') {
    (String.prototype as any).toIntOrNull = function () {
      const s = String(this);
      if (!/^[+-]?\d+$/.test(s) || !Number.isSafeInteger(parseInt(s, 10))) return null;
      return parseInt(s, 10);
    };
  }
  if (typeof (String.prototype as any).toDouble !== 'function') {
    (String.prototype as any).toDouble = function () {
      return parseFloat(this);
    };
  }
  if (typeof (String.prototype as any).isBlank !== 'function') {
    (String.prototype as any).isBlank = function () {
      return this.trim().length === 0;
    };
  }
  if (typeof (String.prototype as any).isNotBlank !== 'function') {
    (String.prototype as any).isNotBlank = function () {
      return this.trim().length > 0;
    };
  }
  if (typeof (String.prototype as any).isEmpty !== 'function') {
    (String.prototype as any).isEmpty = function () {
      return this.length === 0;
    };
  }
  if (typeof (String.prototype as any).isNotEmpty !== 'function') {
    (String.prototype as any).isNotEmpty = function () {
      return this.length > 0;
    };
  }
  if (typeof (Array.prototype as any).joinToString !== 'function') {
    (Array.prototype as any).joinToString = function (separator = ', ') {
      return this.map(formatKotlinValue).join(separator);
    };
  }
  if (typeof (Array.prototype as any).reversed !== 'function') {
    (Array.prototype as any).reversed = function () {
      return [...this].reverse();
    };
  }
  const customPrintln = (...args: any[]) => {
    const text = args.map(formatKotlinValue).join(' ');
    appendOutput(text);
    lineOpen = false;
  };
  const customPrint = (...args: any[]) => {
    const text = args.map(formatKotlinValue).join(' ');
    appendOutput(text);
    lineOpen = true;
  };

  const withArrayContains = (list: any[]) => {
    (list as any).contains = (item: any) => list.includes(item);
    (list as any).isEmpty = () => list.length === 0;
    (list as any).isNotEmpty = () => list.length > 0;
    (list as any).first = () => list[0];
    (list as any).last = () => list[list.length - 1];
    (list as any).sorted = () => [...list].sort((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
    (list as any).get = (index: number) => list[index];
    (list as any).joinToString = (separator: string = ', ') => list.map(formatKotlinValue).join(separator);
    (list as any).reversed = () => [...list].reverse();
    (list as any).count = () => list.length;
    (list as any).asSequence = () => new KotlinSequence(() => list[Symbol.iterator](), false);
    return list;
  };
  const withSetContains = (set: Set<any>) => {
    (set as any).contains = (item: any) => set.has(item);
    (set as any).isEmpty = () => set.size === 0;
    (set as any).isNotEmpty = () => set.size > 0;
    (set as any).first = () => [...set][0];
    (set as any).last = () => [...set][set.size - 1];
    (set as any).asSequence = () => new KotlinSequence(() => set[Symbol.iterator](), false);
    return set;
  };
  const __kt_arrayOf = (...items: any[]) => withArrayContains([...items]);
  const __kt_listOf = (...items: any[]) => new KotlinList(items);
  const __kt_mutableListOf = (...items: any[]) => {
    const list = new KotlinList(items) as unknown as any[] & { add?: (item: any) => boolean; remove?: (item: any) => boolean; removeAt?: (index: number) => any };
    list.add = (item: any) => { list.push(item); return true; };
    list.remove = (item: any) => {
      const index = list.indexOf(item);
      if (index === -1) return false;
      list.splice(index, 1);
      return true;
    };
    list.removeAt = (index: number) => list.splice(index, 1)[0];
    (list as any).toList = () => new KotlinList([...list]);
    return list;
  };
  const withMapChecks = (map: Map<any, any>) => {
    (map as any).containsKey = (key: any) => map.has(key);
    (map as any).containsValue = (value: any) => [...map.values()].includes(value);
    (map as any).isEmpty = () => map.size === 0;
    return map;
  };
  const __kt_mapOf = (...pairs: [any, any][]) => withMapChecks(new Map(pairs.map(pair => Array.from(pair) as [any, any])));
  const __kt_mutableMapOf = (...pairs: [any, any][]) => {
    const map = withMapChecks(new Map(pairs.map(pair => Array.from(pair) as [any, any]))) as Map<any, any> & { remove?: (key: any) => any };
    // Kotlin's MutableMap.remove(key) returns the removed value (or null if
    // absent) and deletes the entry -- mirroring how mutableSetOf's .remove
    // already delegates to Set.prototype.delete, this delegates to
    // Map.prototype.delete/get rather than JS's own differently-named,
    // differently-behaved (returns a boolean) native method.
    map.remove = (key: any) => {
      const existing = map.has(key) ? map.get(key) : null;
      map.delete(key);
      return existing;
    };
    return map;
  };
  const __kt_setOf = (...items: any[]) => withSetContains(new Set(items));
  const __kt_mutableSetOf = (...items: any[]) => {
    const set = withSetContains(new Set(items)) as Set<any> & { remove?: (item: any) => boolean };
    set.remove = (item: any) => set.delete(item);
    return set;
  };
  const __kt_size = (value: any) => value instanceof Map || value instanceof Set ? value.size : value.length;
  const __kt_notNull = (value: any) => {
    if (value === null || value === undefined) {
      throw new Error('NullPointerException: non-null assertion (!!) failed because the expression was null');
    }
    return value;
  };
  const __kt_equals = (left: any, right: any) => {
    if (left === null || left === undefined || right === null || right === undefined) return left === right;
    return typeof left.equals === 'function' ? left.equals(right) : left === right;
  };
  // Backs `value is T` inside an `inline fun <reified T>` body once T has
  // been rewritten (see `transpileReifiedFunctions`) into an ordinary
  // runtime parameter carrying the type NAME as a string (e.g. "String"),
  // supplied by the caller's explicit type argument (`isType<String>(x)`
  // -> `isType(x, "String")`). Scoped to the same primitive set every
  // other `is`/`as?` check in this file supports -- never Char (a
  // single-quoted Char and same-text String are indistinguishable JS
  // values here, see the standing pitfall on this) and never an arbitrary
  // declared class (this engine has no runtime class registry keyed by a
  // string name to look up).
  const __kt_isReifiedType = (value: any, typeName: string): boolean => {
    switch (typeName) {
      case 'Int': case 'Long': case 'Float': case 'Double': return typeof value === 'number';
      case 'String': return typeof value === 'string';
      case 'Boolean': return typeof value === 'boolean';
      default: throw new Error(`Reified type check for "${typeName}" is not supported`);
    }
  };

  let returnValue: any = undefined;

  try {
    // Construct execution sandbox
    // If the code contains `fun main()`, call `main()`.
    // If a testCase call is provided (e.g. `calculatePlayerInventory("Alex", 25)`), evaluate that too.
    let runnerScript = `
      let __kt_loop_start = Date.now();
      let __kt_loop_iter = 0;
      const __kt_check_loop = () => {
        if (++__kt_loop_iter > 250000 || Date.now() - __kt_loop_start > ${timeoutMs}) {
          throw new Error('Execution timed out (possible infinite loop)');
        }
      };

      const __kt_decimalText = (value) => value == null ? 'null' : Number.isInteger(value) ? String(value) + '.0' : String(value);
      const __kt_run = (action) => action();
      // with(receiver) { block } -- registered as a plain builtins entry
      // in kotlinFunctions.ts (same as run/repeat above), which already
      // auto-renames a bare "with" token to "__kt_with" wherever it's
      // used, so the reserved JS "with" statement keyword never reaches
      // the generated code. block is already lowered to take the receiver
      // as its own first positional parameter (same shape as the
      // Object.prototype.let/run/also/apply helpers below), so calling it
      // directly with receiver is all that's needed.
      const __kt_with = (receiver, block) => block(receiver);
      const __kt_repeat = (times, action) => {
        for (let index = 0; index < times; index++) {
          __kt_check_loop();
          action(index);
        }
      };
      // World 15's standalone \`runCatching { block }\` -- registered as a
      // plain builtins entry in kotlinFunctions.ts (same as run/with/repeat
      // above), so it is likewise auto-renamed to \`__kt_runCatching\` at
      // every call site. Delegates to the real \`runCatching\` global
      // (kotlinRunner.ts exposes it on globalThis) rather than duplicating
      // its Result-wrapping logic here.
      const __kt_runCatching = (block) => runCatching(block);
      // World 16 Lesson 1 uses a deterministic single-threaded child queue.
      // These helpers do not imply real scheduling; see kotlinCoroutines.ts.
      const __kt_runBlocking = (block) => kotlinRunBlocking(block);
      const __kt_coroutineScope = (block) => kotlinCoroutineScope(block);
      const __kt_supervisorScope = (block) => kotlinSupervisorScope(block);
      const __kt_CoroutineExceptionHandler = (handler) => kotlinCoroutineExceptionHandler(handler);
      const __kt_launch = (contextOrBlock, maybeBlock) => kotlinLaunch(contextOrBlock, maybeBlock);
      const __kt_async = (startOrBlock, maybeBlock) => kotlinAsync(startOrBlock, maybeBlock);
      const __kt_delay = (milliseconds) => kotlinDelay(milliseconds);
      const __kt_ensureActive = () => kotlinEnsureActive();
      const __kt_yield = () => kotlinYield();
      const __kt_withContext = (context, block) => kotlinWithContext(context, block);
      ${usesCoroutines ? `
      const CoroutineStart = kotlinCoroutineStart;
      const coroutineContext = kotlinCoroutineContext;
      const Job = kotlinJobKey;
      const CoroutineName = Object.assign((name) => kotlinCoroutineName(name), { toString: () => kotlinCoroutineNameKey });
      const CoroutineExceptionHandler = __kt_CoroutineExceptionHandler;
      const Dispatchers = kotlinDispatchers;
      ` : ''}

      ${transpiledJS}

      let __lastResult = undefined;
      if (typeof main === 'function') {
        __lastResult = main();
      }
    `;

    if (options?.testCase?.call) {
      runnerScript += `
        try {
          __lastResult = ${options.testCase.call};
        } catch(e) {
          throw new Error('Test case execution failed (' + ${JSON.stringify(options.testCase.call)} + '): ' + (e && e.message ? e.message : String(e)));
        }
      `;
    }

    runnerScript += `\nreturn __lastResult;`;

    // Execute with timeout safeguard
    const runFunction = new Function(
      'println',
      'print',
      '__kt_arrayOf',
      '__kt_listOf',
      '__kt_mutableListOf',
      '__kt_mapOf',
      '__kt_mutableMapOf',
      '__kt_setOf',
      '__kt_mutableSetOf',
      '__kt_size',
      '__kt_notNull',
      '__kt_equals',
      '__kt_isReifiedType',
      'kotlinRunBlocking',
      'kotlinCoroutineScope',
      'kotlinSupervisorScope',
      'kotlinLaunch',
      'kotlinAsync',
      'kotlinCoroutineStart',
      'kotlinDelay',
      'kotlinEnsureActive',
      'kotlinYield',
      'kotlinWithContext',
      'kotlinCoroutineContext',
      'kotlinCoroutineName',
      'kotlinCoroutineExceptionHandler',
      'kotlinCoroutineNameKey',
      'kotlinDispatchers',
      'kotlinJobKey',
      'Pair',
      '__kt_format',
      runnerScript
    );

    // Run within guarded promise
    const executionPromise = new Promise<any>((resolve, reject) => {
      try {
        const res = runFunction(
          customPrintln,
          customPrint,
          __kt_arrayOf,
          __kt_listOf,
          __kt_mutableListOf,
          __kt_mapOf,
          __kt_mutableMapOf,
          __kt_setOf,
          __kt_mutableSetOf,
          __kt_size,
          __kt_notNull,
          __kt_equals,
          __kt_isReifiedType,
          kotlinRunBlocking,
          kotlinCoroutineScope,
          kotlinSupervisorScope,
          kotlinLaunch,
          kotlinAsync,
          KotlinCoroutineStart,
          kotlinDelay,
          kotlinEnsureActive,
          kotlinYield,
          kotlinWithContext,
          kotlinCoroutineContext,
          kotlinCoroutineName,
          kotlinCoroutineExceptionHandler,
          KotlinCoroutineNameKey,
          KotlinDispatchers,
          KotlinJobKey,
          (a: any, b: any) => new KotlinPair(a, b),
          formatKotlinValue
        );
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timed out (possible infinite loop)')), timeoutMs)
    );

    returnValue = await Promise.race([executionPromise, timeoutPromise]);
  } catch (runtimeErr: any) {
    const elapsed = Math.round(performance.now() - startTime);
    const errMessage = runtimeErr?.message || String(runtimeErr);

    // Try to extract line number from stack trace if available
    let line = 1;
    if (runtimeErr?.stack) {
      const match = runtimeErr.stack.match(/<anonymous>:(\d+):(\d+)/);
      if (match) {
        line = Math.max(1, parseInt(match[1], 10) - 2);
      }
    }

    return {
      success: false,
      output: stdout.join('\n'),
      logs: stdout,
      error: {
        message: `Runtime error: ${errMessage}`,
        line,
        type: 'runtime_error',
      },
      executionTimeMs: elapsed,
      exitCode: 1,
    };
  }

  const elapsed = Math.max(1, Math.round(performance.now() - startTime));
  const finalOutput = stdout.length > 0 ? stdout.join('\n') : returnValue !== undefined ? String(returnValue) : '';

  // Validate output against expected output if defined
  const expectedTarget = options?.expectedOutput ?? options?.testCase?.expected;
  if (expectedTarget !== undefined && expectedTarget !== '') {
    const normActual = finalOutput.trim().replace(/\r\n/g, '\n');
    const normExpected = expectedTarget.trim().replace(/\r\n/g, '\n');

    if (normActual !== normExpected) {
      return {
        success: false,
        output: finalOutput,
        logs: stdout,
        returnValue,
        error: {
          message: normActual === ''
            ? `No output generated. Expected: '${expectedTarget}'`
            : `Output mismatch: expected '${expectedTarget}', but got '${finalOutput}'`,
          line: 1,
          type: 'runtime_error',
        },
        executionTimeMs: elapsed,
        exitCode: 1,
      };
    }
  }

  return {
    success: true,
    output: finalOutput,
    logs: stdout,
    returnValue,
    executionTimeMs: elapsed,
    exitCode: 0,
  };
}

export async function runKotlinCode(
  code: string,
  expectedOutput?: string,
  testCase?: { call?: string; expected?: string }
): Promise<KotlinExecutionResult> {
  return compileAndRunKotlin(code, {
    expectedOutput,
    testCase,
  });
}
