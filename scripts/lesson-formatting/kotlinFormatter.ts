/**
 * Structural-only Kotlin snippet reformatter for the lesson-formatting tool.
 *
 * Deliberately narrow in scope: it only ever inserts/removes line breaks and
 * recomputes indentation. It never rewrites tokens, renames anything, or
 * touches string/char/comment contents. That keeps every transformation
 * semantically inert -- the formatted code must still compile and run to the
 * exact same output as the original, which the caller (server.ts) verifies
 * via the real engine before allowing a save.
 *
 * Processing happens per ORIGINAL line so every existing line boundary is
 * preserved by construction (never silently merged); a whole-snippet token
 * scan is used only to decide, up front, which `{ ... }` blocks need to be
 * split across multiple lines. A block is only ever split further within the
 * single original line(s) it already spans -- this tool never merges two
 * originally-separate lines into one.
 *
 * Every non-empty `{ ... }` block is expanded onto multiple lines (including
 * single-statement ones); a top-level `;`-separated crammed sequence is also
 * split onto separate lines. `{}` (empty block) is left untouched.
 */
import { KotlinSourceError, scanKotlin, type SourceToken } from '../../src/utils/kotlinSource';

const OPENERS = new Set(['{', '(', '[']);
const CLOSERS = new Set(['}', ')', ']']);

function isSymbol(token: SourceToken, text: string): boolean {
  return token.kind === 'symbol' && token.text === text;
}

/** Matches `{`/`}` pairs across the whole snippet, keyed by character offset (not token index, so per-line lookups can match by position). */
function findBracePairsByOffset(tokens: SourceToken[]): { closeToOpen: Map<number, number> } {
  const stack: SourceToken[] = [];
  const closeToOpen = new Map<number, number>();
  for (const t of tokens) {
    if (isSymbol(t, '{')) stack.push(t);
    else if (isSymbol(t, '}')) {
      const open = stack.pop();
      if (open) closeToOpen.set(t.start, open.start);
    }
  }
  return { closeToOpen };
}

function countLeadingClosers(tokens: SourceToken[]): number {
  let n = 0;
  for (const t of tokens) {
    if (t.kind === 'symbol' && CLOSERS.has(t.text)) n++;
    else break;
  }
  return n;
}

function netBracketDelta(tokens: SourceToken[]): number {
  let delta = 0;
  for (const t of tokens) {
    if (t.kind !== 'symbol') continue;
    if (OPENERS.has(t.text)) delta++;
    else if (CLOSERS.has(t.text)) delta--;
  }
  return delta;
}

/**
 * scanKotlin tokenizes a `/* ... *\/` block comment or a `""" ... """` raw
 * string as ONE token spanning as far as needed to find its closer -- which
 * is exactly right for the whole-snippet scan this file does up front, but
 * breaks down for the rest of this file's PER-LINE tokenizing: a line that
 * only contains the opening half of one of these constructs has no closer
 * on that same line, so scanKotlin throws for that line in isolation. Such
 * a line (and every line until the real closer) must be passed through
 * completely unprocessed -- this tool has no way to safely reindent or
 * split content it cannot itself tokenize, and guessing would risk
 * corrupting the comment/string's own text (exactly the bug this detects).
 */
// Deliberately excludes `*`: a trailing `*` is far more often a wildcard
// import (`import kotlinx.coroutines.*`) than a wrapped multiplication --
// confirmed as an actual false-positive bug (bumped indent on the line
// after every wildcard import) before this exclusion was added.
const CONTINUATION_OPERATORS = new Set(['=', '&&', '||', '+', '-', '/', '%', '==', '!=', '<=', '>=']);

/**
 * Whether this segment's actual LAST TOKEN (ignoring a trailing comment,
 * which carries no operator meaning) is a continuation-suggesting operator.
 * Checks token kind/text, never raw substring matching -- a raw-text regex
 * would treat a trailing `*&#47;` comment-closer's `/` as a false-positive
 * division operator (confirmed: this was an actual bug caught by testing).
 */
function endsWithContinuationOperator(tokens: SourceToken[]): boolean {
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    if (t.kind === 'comment') continue;
    if (t.kind !== 'symbol') return false;
    if (t.text === '+' || t.text === '-') {
      const prev = tokens[i - 1];
      if (prev && prev.kind === 'symbol' && prev.text === t.text && prev.end === t.start) return false; // `++`/`--`, not continuation
    }
    return CONTINUATION_OPERATORS.has(t.text);
  }
  return false;
}

function opensUnclosedMultilineConstruct(line: string): 'comment' | 'string' | null {
  try {
    scanKotlin(line);
    return null;
  } catch (err) {
    if (!(err instanceof KotlinSourceError)) return null;
    if (/Unclosed block comment/.test(err.message)) return 'comment';
    if (/Unclosed raw string/.test(err.message)) return 'string';
    return null;
  }
}

/** Splits ONE original line's text into output segments using the precomputed expand-eligible open-brace offsets (by absolute offset within the whole joined source). `lineStartOffset` is this line's own start offset in that joined source. */
/**
 * If `tokens[braceIdx]` is a `{` that opens a lambda with an explicit
 * parameter list (`{ name: Type, other -> ... }`), returns the end offset of
 * the `->` token so the caller can keep the parameter header attached to the
 * opening `{` (idiomatic Kotlin) instead of stranding it alone on the next
 * line. Returns null when no such arrow immediately follows (plain block,
 * or the body starts before any `->` could apply).
 */
function findLambdaArrowCut(tokens: SourceToken[], braceIdx: number): number | null {
  let localDepth = 0;
  for (let i = braceIdx + 1; i < tokens.length; i++) {
    const u = tokens[i];
    if (u.kind !== 'symbol') continue;
    if (OPENERS.has(u.text)) {
      if (localDepth === 0) return null; // a nested block starts before any arrow -- no parameter header here
      localDepth++;
    } else if (CLOSERS.has(u.text)) {
      if (localDepth === 0) return null; // reached this brace's own close with no arrow found
      localDepth--;
    } else if (u.text === ';' && localDepth === 0) {
      return null; // a statement starts before any arrow -- no parameter header
    } else if (u.text === '-' && localDepth === 0) {
      // scanKotlin has no multi-character symbol tokens -- `->` is two
      // adjacent one-character tokens, `-` immediately followed by `>`.
      const next = tokens[i + 1];
      if (next && next.kind === 'symbol' && next.text === '>' && next.start === u.end) {
        return next.end;
      }
    }
  }
  return null;
}

function splitLine(lineText: string, lineStartOffset: number, expandOpens: Set<number>, closeToOpen: Map<number, number>): string[] {
  let tokens: SourceToken[];
  try {
    tokens = scanKotlin(lineText);
  } catch {
    return [lineText.trim()];
  }
  if (tokens.length === 0) return [];

  interface Cut { at: number; resumeFrom: number; }
  const cuts: Cut[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const globalStart = lineStartOffset + t.start;
    if (t.kind !== 'symbol') continue;
    if (t.text === ';') {
      cuts.push({ at: t.start, resumeFrom: t.end });
    } else if (t.text === '{' && expandOpens.has(globalStart)) {
      const arrowEnd = findLambdaArrowCut(tokens, i);
      const cutAt = arrowEnd ?? t.end;
      cuts.push({ at: cutAt, resumeFrom: cutAt });
    } else if (t.text === '}') {
      const openGlobal = closeToOpen.get(globalStart);
      if (openGlobal !== undefined && expandOpens.has(openGlobal)) {
        cuts.push({ at: t.start, resumeFrom: t.start });
      }
    }
  }
  cuts.sort((a, b) => a.at - b.at);

  const segments: string[] = [];
  let cursor = 0;
  for (const c of cuts) {
    segments.push(lineText.slice(cursor, c.at));
    cursor = c.resumeFrom;
  }
  segments.push(lineText.slice(cursor));

  return segments.map((s) => s.trim()).filter((s) => s.length > 0);
}

export function formatKotlinLines(lines: string[]): { lines: string[]; changed: boolean } {
  const source = lines.join('\n');
  if (!source.trim()) return { lines: [...lines], changed: false };

  let fullTokens: SourceToken[];
  try {
    fullTokens = scanKotlin(source);
  } catch {
    // Unparseable as standalone Kotlin (e.g. a deliberately-broken fragment) -- leave untouched.
    return { lines: [...lines], changed: false };
  }

  const { closeToOpen } = findBracePairsByOffset(fullTokens);
  const openToClose = new Map<number, number>();
  for (const [close, open] of closeToOpen) openToClose.set(open, close);

  const expandOpens = new Set<number>();
  for (const [openStart, closeStart] of openToClose) {
    if (closeStart === openStart + 1) continue; // `{}` empty block -- never expand
    expandOpens.add(openStart);
  }

  const out: string[] = [];
  let depth = 0;
  let offset = 0;
  // When a line is a fluent-chain continuation (`.collect { ... }` following
  // a receiver on an earlier line), every line it opens -- including its own
  // closing brace -- gets one extra indent level so the continuation reads
  // as attached to its receiver, not as a fresh top-level statement. Active
  // while `depth` stays above the level recorded when the continuation began.
  let continuationBonusUntilDepth: number | null = null;
  // A line ending in a trailing operator with no bracket change (`... where
  // T : X =`) implies the NEXT line is a wrapped continuation of it, which
  // bracket-depth tracking alone has no way to know about. Applies once, to
  // the very next non-blank line only.
  let pendingOperatorContinuation = false;
  let insideBlockComment = false;
  let insideRawString = false;

  for (const rawLine of lines) {
    const lineStartOffset = offset;
    offset += rawLine.length + 1; // +1 for the '\n' joining this line to the next

    if (insideBlockComment) {
      out.push(rawLine);
      if (rawLine.includes('*/')) insideBlockComment = false;
      continue;
    }
    if (insideRawString) {
      out.push(rawLine);
      if (rawLine.includes('"""')) insideRawString = false;
      continue;
    }

    if (rawLine.trim() === '') {
      if (out.length > 0 && out[out.length - 1] !== '') out.push('');
      continue;
    }

    const opensConstruct = opensUnclosedMultilineConstruct(rawLine);
    if (opensConstruct === 'comment') {
      out.push(rawLine);
      insideBlockComment = true;
      continue;
    }
    if (opensConstruct === 'string') {
      out.push(rawLine);
      insideRawString = true;
      continue;
    }

    const depthAtLineStart = depth;
    const segments = splitLine(rawLine, lineStartOffset, expandOpens, closeToOpen);
    segments.forEach((seg, segIdx) => {
      let segTokens: SourceToken[];
      try {
        segTokens = scanKotlin(seg);
      } catch {
        out.push(seg);
        return;
      }
      const leadingClosers = countLeadingClosers(segTokens);
      const rawIndent = Math.max(0, depth - leadingClosers);

      if (segIdx === 0 && continuationBonusUntilDepth === null && seg.startsWith('.')) {
        continuationBonusUntilDepth = depthAtLineStart;
      }
      const opBonus = segIdx === 0 && pendingOperatorContinuation ? 1 : 0;
      if (segIdx === 0) pendingOperatorContinuation = false;
      const bonus = continuationBonusUntilDepth !== null ? 1 : opBonus;

      out.push('    '.repeat(rawIndent + bonus) + seg);
      depth = Math.max(0, depth + netBracketDelta(segTokens));

      if (continuationBonusUntilDepth !== null && depth <= continuationBonusUntilDepth) {
        continuationBonusUntilDepth = null;
      }

      if (segIdx === segments.length - 1) {
        pendingOperatorContinuation = depth === depthAtLineStart && endsWithContinuationOperator(segTokens);
      }
    });
  }

  // Trim a possible trailing blank line introduced by processing order.
  while (out.length > 0 && out[out.length - 1] === '' && lines[lines.length - 1]?.trim() !== '') out.pop();

  const withImportSpacing = insertBlankLineAfterImports(out);

  const changed = withImportSpacing.join('\n') !== lines.join('\n');
  return { lines: withImportSpacing, changed };
}

/** Ensures exactly one blank line separates a leading run of `import ...` statements from the rest of the code, if there's any following code at all. */
function insertBlankLineAfterImports(lines: string[]): string[] {
  let i = 0;
  while (i < lines.length && /^import\s+\S/.test(lines[i].trim())) i++;
  if (i === 0 || i >= lines.length) return lines; // no imports, or nothing follows them
  if (lines[i].trim() === '') return lines; // already separated
  return [...lines.slice(0, i), '', ...lines.slice(i)];
}

export function formatJoinedKotlin(code: string): { code: string; changed: boolean } {
  const { lines, changed } = formatKotlinLines(code.split('\n'));
  return { code: lines.join('\n'), changed };
}
