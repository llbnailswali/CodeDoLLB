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
 * Converts a single-line, brace-free Kotlin if-expression
 * (`val x = if (cond) a else b`) into a JS ternary. Kotlin's block-bodied
 * if-expression form (`if (cond) { ...; a } else { ...; b }`) is NOT
 * supported -- lesson content authored against this engine sticks to the
 * single-line form for anything that needs if-as-an-expression.
 */
function transformIfExpression(line: string): string {
  return line.replace(
    /=\s*if\s*\((.+?)\)\s*([^\n]+?)\s+else\s+([^\n]+)$/,
    (_m, cond, a, b) => `= (${cond}) ? (${a.trim()}) : (${b.trim()})`
  );
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
function parseWhenBranches(body: string, subject: string): Array<{ condition: string | null; result: string }> {
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
 * Rewrites every `when (subject) { ... }` block (statement or expression
 * form) into equivalent JS, since JS has no `when`/`switch`-expression
 * equivalent that matches Kotlin's semantics. Runs once over the whole
 * source, before the per-line pass, because a `when` block spans multiple
 * lines and needs balanced-brace scanning to find its extent. Subject-less
 * `when { ... }` is not supported -- every branch condition here is
 * derived from comparing a required subject.
 */
function transpileWhenBlocks(code: string): string {
  const whenRe = /\bwhen\s*\(([^)]*)\)\s*\{/g;
  let result = '';
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = whenRe.exec(code)) !== null) {
    const blockStart = match.index;
    const openBraceIdx = match.index + match[0].length - 1;
    const subject = match[1].trim();

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
    const match = line.match(/\b(?:val|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)[^=]*=\s*(?:mapOf|mutableMapOf)\s*\(/);
    if (match) mapVars.add(match[1]);
  }
  return mapVars;
}

/**
 * Transpiles Kotlin code into an isolated JavaScript execution function.
 */
function transpileKotlinToJS(kotlinCode: string): string {
  kotlinCode = transpileWhenBlocks(kotlinCode);
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

    // Truncate Int/Int division the way real Kotlin does (see
    // `wrapIntDivision` above) -- must run after suffix-stripping so a
    // literal like `100L` is already bare `100` by the time we classify it.
    line = wrapIntDivision(line, intVars);

    // `is`/`!is` type checks and `in`/`!in` range checks -- see
    // `transformTypeChecks`/`transformRanges` above.
    line = transformTypeChecks(line);
    line = transformRanges(line);

    // Replace Kotlin val -> const, var -> let
    // Handle: val name: Type = expr -> const name = expr
    line = line.replace(/\bval\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=/g, 'const $1 =');
    line = line.replace(/\bvar\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=/g, 'let $1 =');

    // Kotlin single-line if-expression (`val x = if (cond) a else b`) ->
    // JS ternary -- see `transformIfExpression` above.
    line = transformIfExpression(line);

    // Handle Kotlin fun declarations
    // fun foo(a: Int, b: String): String { -> function foo(a, b) {
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*\{/g, (_, name, params) => {
      return `function ${name}(${cleanKotlinParams(params)}) {`;
    });

    // Handle single-expression functions: fun sum(a: Int, b: Int) = a + b
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=\s*(.+)$/g, (_, name, params, expr) => {
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
    if (Array.isArray(value)) return `[${value.map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Set) return `[${[...value].map(formatKotlinValue).join(', ')}]`;
    if (value instanceof Map) return `{${[...value.entries()].map(([k, v]) => `${formatKotlinValue(k)}=${formatKotlinValue(v)}`).join(', ')}}`;
    return String(value);
  };
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

  const __kt_arrayOf = (...items: any[]) => [...items];
  const __kt_listOf = (...items: any[]) => [...items];
  const __kt_mutableListOf = (...items: any[]) => {
    const list = [...items] as any[] & { add?: (item: any) => boolean; remove?: (item: any) => boolean };
    list.add = (item: any) => { list.push(item); return true; };
    list.remove = (item: any) => {
      const index = list.indexOf(item);
      if (index === -1) return false;
      list.splice(index, 1);
      return true;
    };
    return list;
  };
  const __kt_mapOf = (...pairs: [any, any][]) => new Map(pairs);
  const __kt_mutableMapOf = (...pairs: [any, any][]) => new Map(pairs);
  const __kt_setOf = (...items: any[]) => new Set(items);
  const __kt_mutableSetOf = (...items: any[]) => new Set(items);
  const __kt_size = (value: any) => value instanceof Map || value instanceof Set ? value.size : value.length;

  let returnValue: any = undefined;

  try {
    // Construct execution sandbox
    // If the code contains `fun main()`, call `main()`.
    // If a testCase call is provided (e.g. `calculatePlayerInventory("Alex", 25)`), evaluate that too.
    let runnerScript = `
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
          // If function name differed or call failed, keep existing result
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
          __kt_size
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

  return {
    success: true,
    output: finalOutput,
    logs: stdout,
    returnValue,
    executionTimeMs: elapsed,
    exitCode: 0,
  };
}
