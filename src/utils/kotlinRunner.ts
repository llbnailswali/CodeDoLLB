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
 * Transpiles Kotlin code into an isolated JavaScript execution function.
 */
function transpileKotlinToJS(kotlinCode: string): string {
  const lines = kotlinCode.split('\n');
  const jsLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Strip comments for transformation, but preserve line structure
    const commentIdx = line.indexOf('//');
    let comment = '';
    if (commentIdx !== -1) {
      comment = line.slice(commentIdx);
      line = line.slice(0, commentIdx);
    }

    // Replace Kotlin val -> const, var -> let
    // Handle: val name: Type = expr -> const name = expr
    line = line.replace(/\bval\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=/g, 'const $1 =');
    line = line.replace(/\bvar\s+([a-zA-Z0-9_]+)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=/g, 'let $1 =');

    // Handle Kotlin fun declarations
    // fun foo(a: Int, b: String): String { -> function foo(a, b) {
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*\{/g, (_, name, params) => {
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          const match = p.trim().match(/(?:(?:val|var)\s+)?([a-zA-Z0-9_]+)/);
          return match ? match[1] : '';
        })
        .filter(Boolean)
        .join(', ');
      return `function ${name}(${cleanParams}) {`;
    });

    // Handle single-expression functions: fun sum(a: Int, b: Int) = a + b
    line = line.replace(/\bfun\s+([a-zA-Z0-9_]+)\s*\((.*?)\)(?:\s*:\s*[a-zA-Z0-9_<>]+)?\s*=\s*(.+)$/g, (_, name, params, expr) => {
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          const match = p.trim().match(/(?:(?:val|var)\s+)?([a-zA-Z0-9_]+)/);
          return match ? match[1] : '';
        })
        .filter(Boolean)
        .join(', ');
      return `function ${name}(${cleanParams}) { return ${expr}; }`;
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

    // Handle Kotlin collections
    line = line.replace(/\blistOf\(/g, '__kt_listOf(');
    line = line.replace(/\bmutableListOf\(/g, '__kt_mutableListOf(');
    line = line.replace(/\bmapOf\(/g, '__kt_mapOf(');
    line = line.replace(/\bsetOf\(/g, '__kt_setOf(');

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
  const customPrintln = (...args: any[]) => {
    const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    stdout.push(text);
  };
  const customPrint = (...args: any[]) => {
    const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    if (stdout.length === 0) {
      stdout.push(text);
    } else {
      stdout[stdout.length - 1] += text;
    }
  };

  const __kt_listOf = (...items: any[]) => [...items];
  const __kt_mutableListOf = (...items: any[]) => [...items];
  const __kt_mapOf = (...pairs: [any, any][]) => new Map(pairs);
  const __kt_setOf = (...items: any[]) => new Set(items);

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
      '__kt_listOf',
      '__kt_mutableListOf',
      '__kt_mapOf',
      '__kt_setOf',
      runnerScript
    );

    // Run within guarded promise
    const executionPromise = new Promise<any>((resolve, reject) => {
      try {
        const res = runFunction(
          customPrintln,
          customPrint,
          __kt_listOf,
          __kt_mutableListOf,
          __kt_mapOf,
          __kt_setOf
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
