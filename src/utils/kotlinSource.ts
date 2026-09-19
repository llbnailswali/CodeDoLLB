/** Shared lexical boundary handling for the teaching runner and lesson checks. */
export type SourceToken = { text: string; start: number; end: number; kind: 'comment' | 'string' | 'char' | 'word' | 'number' | 'symbol' };
export class KotlinSourceError extends Error {
  constructor(message: string, public line: number) { super(message); }
}
export function scanKotlin(source: string): SourceToken[] {
  const tokens: SourceToken[] = [];
  let i = 0;
  const fail = (message: string, start: number): never => { throw new KotlinSourceError(message, source.slice(0, start).split('\n').length); };
  while (i < source.length) {
    if (/\s/.test(source[i])) { i++; continue; }
    const start = i; let kind: SourceToken['kind'] = 'symbol';
    if (source.startsWith('//', i)) {
      kind = 'comment'; while (i < source.length && source[i] !== '\n') i++;
    } else if (source.startsWith('/*', i)) {
      kind = 'comment'; i += 2; let depth = 1;
      while (i < source.length && depth) {
        if (source.startsWith('/*', i)) { depth++; i += 2; }
        else if (source.startsWith('*/', i)) { depth--; i += 2; }
        else i++;
      }
      if (depth) fail('Unclosed block comment: add */', start);
    } else if (source.startsWith('"""', i)) {
      kind = 'string'; const end = source.indexOf('"""', i + 3);
      if (end < 0) fail('Unclosed raw string: add triple quotes', start);
      i = end + 3;
    } else if (source[i] === '"' || source[i] === "'") {
      const quote = source[i++]; kind = quote === '"' ? 'string' : 'char'; let closed = false;
      while (i < source.length && source[i] !== '\n') {
        if (source[i] === '\\') { i += 2; continue; }
        if (source[i++] === quote) { closed = true; break; }
      }
      if (!closed) fail('Unclosed string literal', start);
      if (kind === 'char') {
        const inner = source.slice(start + 1, i - 1);
        if (!/^(?:[^\\]|\\[tbnr'"\\$]|\\u[0-9a-fA-F]{4})$/.test(inner)) fail('Invalid Char literal: expected one character or escape', start);
      }
    } else if (/[A-Za-z_]/.test(source[i])) {
      kind = 'word'; while (i < source.length && /[A-Za-z_0-9]/.test(source[i])) i++;
    } else if (/\d/.test(source[i])) {
      kind = 'number'; const m = source.slice(i).match(/^\d[\d_]*(?:\.(?!\.)[\d_]+)?(?:[eE][+-]?\d+)?[fFL]?/)!; i += m[0].length;
    } else i++;
    tokens.push({ text: source.slice(start, i), start, end: i, kind });
  }
  return tokens;
}
export function prepareKotlinSource(source: string): string {
  const tokens = scanKotlin(source); let result = '', cursor = 0;
  for (const token of tokens) {
    result += source.slice(cursor, token.start);
    if (token.kind === 'comment') result += token.text.replace(/[^\n]/g, ' ');
    else if (token.text.startsWith('"""')) {
      // Preserve raw backslashes and quotes while making the multiline value a JS-compatible literal.
      result += JSON.stringify(token.text.slice(3, -3)).replace(/\//g, '\\u002f');
    } else if (token.kind === 'string' || token.kind === 'char') result += token.text.replace(/\//g, '\\u002f');
    else result += token.text;
    cursor = token.end;
  }
  return result + source.slice(cursor);
}
