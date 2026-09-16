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

  // 1. Check unclosed string literals
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    // Strip comments
    const commentIdx = rawLine.indexOf('//');
    const line = commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine;

    let inString = false;
    let escaped = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '\\' && inString) {
        escaped = !escaped;
      } else if (char === '"' && !escaped) {
        inString = !inString;
      } else {
        escaped = false;
      }
    }
    if (inString) {
      return {
        message: "Syntax error: Unclosed string literal",
        line: i + 1,
        type: 'syntax_error',
        codeSnippet: rawLine.trim(),
      };
    }
  }

  // 2. Check balanced braces, brackets, and parentheses
  const stack: { char: string; line: number; col: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const commentIdx = rawLine.indexOf('//');
    const line = commentIdx !== -1 ? rawLine.slice(0, commentIdx) : rawLine;

    let inString = false;
    let escaped = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '\\' && inString) {
        escaped = !escaped;
        continue;
      }
      if (char === '"' && !escaped) {
        inString = !inString;
        continue;
      }
      if (inString) continue;

      if (char === '{' || char === '(' || char === '[') {
        stack.push({ char, line: i + 1, col: c + 1 });
      } else if (char === '}' || char === ')' || char === ']') {
        const top = stack.pop();
        if (!top) {
          return {
            message: `Syntax error: Unexpected closing '${char}'`,
            line: i + 1,
            column: c + 1,
            type: 'syntax_error',
            codeSnippet: rawLine.trim(),
          };
        }
        const matches =
          (top.char === '{' && char === '}') ||
          (top.char === '(' && char === ')') ||
          (top.char === '[' && char === ']');
        if (!matches) {
          const expected = top.char === '{' ? '}' : top.char === '(' ? ')' : ']';
          return {
            message: `Syntax error: Mismatched '${char}', expected '${expected}'`,
            line: i + 1,
            column: c + 1,
            type: 'syntax_error',
            codeSnippet: rawLine.trim(),
          };
        }
      }
    }
  }

  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    const expected = unclosed.char === '{' ? '}' : unclosed.char === '(' ? ')' : ']';
    return {
      message: `Syntax error: Expecting '${expected}' to close '${unclosed.char}' opened on line ${unclosed.line}`,
      line: unclosed.line,
      column: unclosed.col,
      type: 'syntax_error',
      codeSnippet: lines[unclosed.line - 1]?.trim(),
    };
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
        if (type === 'Int' && (initialExpr.startsWith('"') || initialExpr.includes('.'))) {
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

      declaredVars.set(varName, {
        name: varName,
        isVal,
        type,
        line: i + 1,
      });
      continue;
    }

    // Check reassignments to val: e.g. player = "Bob" or coins += 15
    const assignMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|(?:\/=)|=|\+\+|--)/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const op = assignMatch[2];
      const decl = declaredVars.get(varName);
      if (decl && decl.isVal) {
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

  const divRe = /(?<![.\d])(-?\d[\d_]*|[a-zA-Z_][a-zA-Z0-9_]*)\s*\/\s*(-?\d[\d_]*|[a-zA-Z_][a-zA-Z0-9_]*)\b/g;

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
function transformTypeChecks(line: string): string {
  const typeofMap: Record<string, string> = {
    Int: 'number', Long: 'number', Float: 'number', Double: 'number',
    String: 'string', Boolean: 'boolean',
  };
  return line.replace(
    /([a-zA-Z_][a-zA-Z0-9_.]*|\([^()]*\))\s+(is|!is)\s+(Int|Long|Float|Double|String|Boolean)\b/g,
    (_m, expr, kw, type) => {
      const jsType = typeofMap[type];
      return kw === '!is' ? `(typeof (${expr}) !== '${jsType}')` : `(typeof (${expr}) === '${jsType}')`;
    }
  );
}

/**
 * Rewrites `expr as? Type` into a runtime typeof-guarded ternary, the same
 * narrow Int/Long/Float/Double/String/Boolean-only subset `is`/`!is`
 * already support (see `transformTypeChecks`) -- never Char, for the same
 * indistinguishable-from-String reason documented in PITFALLS.md. Plain
 * (non-safe) `as` is intentionally NOT supported -- it isn't in World 7's
 * topic list, and force-casting isn't otherwise used by any lesson yet.
 */
function transformSafeCasts(line: string): string {
  const typeofMap: Record<string, string> = {
    Int: 'number', Long: 'number', Float: 'number', Double: 'number',
    String: 'string', Boolean: 'boolean',
  };
  return line.replace(
    /([a-zA-Z_][a-zA-Z0-9_.]*|\([^()]*\))\s+as\?\s+(Int|Long|Float|Double|String|Boolean)\b/g,
    (_m, expr, type) => `(typeof (${expr}) === '${typeofMap[type]}' ? (${expr}) : null)`
  );
}

/**
 * Rewrites Kotlin's Elvis operator (`a ?: b`) into JS's nullish-coalescing
 * operator (`a ?? b`). The two are semantically equivalent for this
 * simulator's purposes: Kotlin null maps to JS null/undefined (a `?.`
 * chain that short-circuits produces JS undefined, not null -- see
 * `formatKotlinValue`'s undefined-to-"null" handling below, which keeps
 * both printing the same as Kotlin's single null), and `??` treats both as
 * "nothing there" exactly like Kotlin's Elvis operator does.
 */
function transformElvisOperator(line: string): string {
  return line.replace(/\?:/g, '??');
}

/**
 * Rewrites Kotlin's non-null assertion (`expr!!`) into a runtime check that
 * throws if the expression is null/undefined, otherwise passes the value
 * through -- mirroring Kotlin's own NullPointerException-on-null-assert
 * behavior rather than silently treating `!!` as a no-op. Deliberately
 * scoped to exactly ONE `!!` per line, on a simple identifier/property/
 * index chain immediately to its left (`user!!`, `user!!.name`,
 * `list[0]!!`) -- a non-global match, so a line with two independent `!!`
 * uses would only convert the first and leave the second as invalid JS,
 * surfacing as a loud syntax error rather than silently mishandling the
 * chain. Lesson content authored against this engine keeps to one `!!` per
 * line for exactly this reason.
 */
function transformNonNullAssertion(line: string): string {
  return line.replace(/([a-zA-Z_][a-zA-Z0-9_.[\]]*)!!/, '__kt_notNull($1)');
}

/**
 * Recursively converts a Kotlin if-expression (including chained `else if`)
 * into nested JS ternaries.
 */
function convertIfExpr(expr: string): string {
  const m = expr.match(/^\s*if\s*\((.+?)\)\s+([^\n]+?)\s+else\s+([^\n]+)$/);
  if (!m) return expr;
  const [, cond, thenBranch, elseBranch] = m;
  return `((${cond}) ? (${thenBranch.trim()}) : (${convertIfExpr(elseBranch.trim())}))`;
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
  return code.replace(/\b(listOf|mutableListOf|arrayOf|setOf|mutableSetOf|mapOf|mutableMapOf)<[a-zA-Z0-9_?,<>\s]+>\s*\(/g, '$1(');
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
  for (const rawLine of body.split('\n')) {
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
  return params
    .split(',')
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      const varargMatch = trimmed.match(/^vararg\s+([a-zA-Z0-9_]+)/);
      if (varargMatch) return `...${varargMatch[1]}`;
      const m = trimmed.match(/^(?:(?:val|var)\s+)?([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?.]+)?(?:\s*=\s*(.+))?$/);
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
  }
  return mapVars;
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
    /\b(?:(?:private|public|protected|internal|open|abstract|override)\s+)+(?=(?:class|val|var|fun|constructor)\b)/g,
    ''
  );
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

function rewriteClassPropertyAccess(lines: string[], classProps: Set<string>, paramNames: Set<string>): string[] {
  const localVars = new Set<string>();
  return lines.map((line) => {
    const declMatch = line.match(/\b(?:val|var)\s+([a-zA-Z0-9_]+)/);
    if (declMatch) {
      localVars.add(declMatch[1]);
    }
    const chunks = splitCodeAndStrings(line);
    for (const chunk of chunks) {
      if (chunk.isString) continue;
      for (const prop of classProps) {
        if (paramNames.has(prop) || localVars.has(prop)) continue;
        chunk.text = chunk.text.replace(new RegExp(`(?<![.\\w])(${prop})(?![\\w])`, 'g'), (m, name, offset, str) => {
          const before = str.slice(0, offset).trimEnd();
          if (before.endsWith('.') || /(?:val|var)$/.test(before)) return m;
          return `this.${name}`;
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
  const header = memberLines[0].trim();

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
function stripInterfaceDeclarations(code: string): string {
  const re = /\binterface\s+[A-Za-z_][A-Za-z0-9_]*\s*\{/g;
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
    result += code.slice(cursor, blockStart);
    cursor = i;
    re.lastIndex = i;
  }
  result += code.slice(cursor);
  return result;
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
function transpileClassDeclarations(code: string, classNamesOut: Set<string>): string {
  const classRe = /\b(data\s+)?class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?\s*(?:\:\s*([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?)?\s*(\{)?/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = classRe.exec(code)) !== null) {
    const [whole, dataFlag, className, ctorParamsRaw, superName, superArgsRaw, hasBrace] = match;
    classNamesOut.add(className);
    const blockStart = match.index;
    let blockEnd = blockStart + whole.length;
    let bodyLines: string[] = [];

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
    }

    const ctorParams = ctorParamsRaw ? parseConstructorParams(ctorParamsRaw) : [];
    const propertyAssignments = ctorParams.filter((p) => p.isProperty).map((p) => `    this.${p.name} = ${p.name};`);
    const classProps = new Set(ctorParams.filter((p) => p.isProperty).map((p) => p.name));
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

    const superCallLine = superName && superArgsRaw !== undefined ? [`    super(${superArgsRaw});`] : [];
    const ctorBodyLines = [...superCallLine, ...propertyAssignments, ...ctorExtraLines];

    // Built via concatenation, NOT a template literal with `${className}(`
    // directly adjacent -- the later `insertNewForInstantiation` pass looks
    // for `ClassName(` as literal text anywhere in the source, with no
    // awareness of string-literal context, so a template literal here would
    // get its own generated toString corrupted into `new ClassName(...)`
    // text embedded inside the returned string.
    const toStringLine = dataFlag
      ? [`  toString() { return '${className}' + '(' + ${ctorParams.map((p) => `'${p.name}=' + this.${p.name}`).join(" + ', ' + ")} + ')'; }`]
      : [];

    // A supertype WITHOUT parens (`: Greetable`) is an interface -- Kotlin
    // requires parens (a constructor call, `: Animal(name)`) only when
    // actually extending a class. JS has no interface concept, so an
    // interface supertype contributes no `extends` at all (the
    // implementing class already supplies real methods via `override fun`).
    const isRealSuperclass = Boolean(superName) && superArgsRaw !== undefined;
    const extendsClause = isRealSuperclass ? ` extends ${superName}` : '';
    const rewritten = [
      `class ${className}${extendsClause} {`,
      `  constructor(${renderCtorParams(ctorParams)}) {`,
      ...ctorBodyLines,
      '  }',
      ...methodLines,
      ...toStringLine,
      '}',
    ].join('\n');

    result += code.slice(cursor, blockStart) + rewritten;
    cursor = blockEnd;
    classRe.lastIndex = blockEnd;
  }
  result += code.slice(cursor);
  return result;
}

/**
 * Replaces every `object Name { ... }` singleton declaration with an
 * immediately-instantiated anonymous JS class: `const Name = new (class {
 * ... })();`. Every later `Name.member` access then just works, matching
 * Kotlin's own single-shared-instance semantics. Scoped to a plain object
 * declaration -- `object Name : Interface { ... }` is not supported.
 */
function transpileObjectDeclarations(code: string): string {
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

    const members = splitClassMembers(bodyLines);
    const ctorExtraLines: string[] = [];
    const methodLines: string[] = [];
    for (const member of members) {
      const { ctorLines, methodLines: mLines } = transpileClassMember(member);
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

    result += code.slice(cursor, blockStart) + rewritten;
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
  let result = code;
  for (const name of classNames) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<!new\\s)\\b${escaped}\\s*\\(`, 'g');
    result = result.replace(re, `new ${name}(`);
  }
  return result;
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
  code = stripModifierKeywords(code);
  code = transpileEnumClasses(code);
  code = stripInterfaceDeclarations(code);
  code = transpileObjectDeclarations(code);
  const classNames = new Set<string>();
  code = transpileClassDeclarations(code, classNames);
  code = insertNewForInstantiation(code, classNames);
  return code;
}

/**
 * Transpiles Kotlin code into an isolated JavaScript execution function.
 */
function transpileKotlinToJS(kotlinCode: string): string {
  kotlinCode = stripCollectionGenerics(kotlinCode);
  kotlinCode = transpileMapDeclarations(kotlinCode);
  kotlinCode = transpileOOPDeclarations(kotlinCode);
  kotlinCode = transpileWhenBlocks(kotlinCode);
  kotlinCode = transpileMultilineIfExpressions(kotlinCode);
  const lines = kotlinCode.split('\n');
  const jsLines: string[] = [];
  const intVars = inferIntTypedVars(kotlinCode);
  const mapVars = inferMapVars(kotlinCode);

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
    line = transformTypeChecks(line);
    line = transformRanges(line);

    // Null-safety operators -- see `transformSafeCasts`/
    // `transformElvisOperator`/`transformNonNullAssertion` above. Safe
    // casts must run before the Elvis transform since `as? Type` never
    // contains a literal `?:`, so order between these three doesn't
    // otherwise matter.
    line = transformSafeCasts(line);
    line = transformElvisOperator(line);
    line = transformNonNullAssertion(line);

    // Replace Kotlin val -> const, var -> let
    // Handle: val name: Type = expr -> const name = expr
    // The type char class includes `?` so a nullable declared type
    // (`val name: String? = ...`, `val ages: List<Int?> = ...`) is
    // consumed and stripped along with the rest of the annotation, rather
    // than leaving a stray `?` behind that would break the rest of the line.
    line = line.replace(/\bval\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*=/g, 'const $1 =');
    line = line.replace(/\bvar\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>?,\s]+)?\s*=/g, 'let $1 =');

    // Kotlin single-line if-expression (`val x = if (cond) a else b`) ->
    // JS ternary -- see `transformIfExpression` above.
    line = transformIfExpression(line);

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
        let transformed = inner.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, '${$1}');
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
    // A nullable collection reference's safe-call size (`bonuses?.size`) is
    // handled separately from plain `.size` -- JS's own `?.` short-circuits
    // to `undefined` before ever reaching a property, but `__kt_size`
    // unconditionally reads `.size`/`.length`, which would throw on a null
    // receiver instead of safely producing null. Must run before the plain
    // `.size` replace below (which wouldn't match the `?` anyway, but this
    // keeps the safe-call case handled first and explicitly).
    line = line.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\?\.size\b/g, '($1 == null ? null : __kt_size($1))');
    line = line.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\.size\b/g, '__kt_size($1)');
    line = line.replace(/\barrayOf\(/g, '__kt_arrayOf(');
    line = line.replace(/\blistOf\(/g, '__kt_listOf(');
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
        line: 1,
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
    if (Array.isArray(value)) return `[${value.map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Set) return `[${[...value].map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Map) return `{${[...value.entries()].map(([k, v]) => `${formatKotlinValue(k)}=${formatKotlinValue(v)}`).join(', ')}}`;
    return String(value);
  };

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
  if (typeof (String.prototype as any).toInt !== 'function') {
    (String.prototype as any).toInt = function () {
      return parseInt(this, 10);
    };
  }
  if (typeof (String.prototype as any).toDouble !== 'function') {
    (String.prototype as any).toDouble = function () {
      return parseFloat(this);
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
    return list;
  };
  const withSetContains = (set: Set<any>) => {
    (set as any).contains = (item: any) => set.has(item);
    (set as any).isEmpty = () => set.size === 0;
    (set as any).isNotEmpty = () => set.size > 0;
    (set as any).first = () => [...set][0];
    (set as any).last = () => [...set][set.size - 1];
    return set;
  };
  const __kt_arrayOf = (...items: any[]) => withArrayContains([...items]);
  const __kt_listOf = (...items: any[]) => withArrayContains([...items]);
  const __kt_mutableListOf = (...items: any[]) => {
    const list = withArrayContains([...items]) as any[] & { add?: (item: any) => boolean; remove?: (item: any) => boolean; removeAt?: (index: number) => any };
    list.add = (item: any) => { list.push(item); return true; };
    list.remove = (item: any) => {
      const index = list.indexOf(item);
      if (index === -1) return false;
      list.splice(index, 1);
      return true;
    };
    list.removeAt = (index: number) => list.splice(index, 1)[0];
    return list;
  };
  const withMapChecks = (map: Map<any, any>) => {
    (map as any).containsKey = (key: any) => map.has(key);
    (map as any).containsValue = (value: any) => [...map.values()].includes(value);
    (map as any).isEmpty = () => map.size === 0;
    return map;
  };
  const __kt_mapOf = (...pairs: [any, any][]) => withMapChecks(new Map(pairs));
  const __kt_mutableMapOf = (...pairs: [any, any][]) => withMapChecks(new Map(pairs));
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
          __kt_notNull
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
