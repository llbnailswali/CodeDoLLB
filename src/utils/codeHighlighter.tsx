import React from 'react';

/**
 * Lightweight, zero-dependency Kotlin syntax highlighter for CodeDo.
 *
 * This is the SINGLE shared implementation for rendering Kotlin code across
 * every lesson stage (Learn, Explore, Predict, Debug's read-only views,
 * etc). Do not re-implement ad-hoc `startsWith('fun ')` /
 * `includes('println')` branching in a component -- that pattern has
 * previously caused commented-out lines (e.g. `// println(...)`) to render
 * as if they were live code, because a naive `.includes('println')` check
 * matches regardless of a leading `//`.
 *
 * Prefer `renderKotlinCodeLines` (plural) whenever you're rendering a whole
 * `code`/`codeSnippet` array: it tracks `/* ... *\/` block comments *across*
 * lines, so a multi-line block comment (opened on one array entry, closed on
 * a later one) is greyed out in full, the same way a single-line `//`
 * comment already is. `renderKotlinCodeLine` (singular) only sees one line
 * at a time and therefore can't detect a block comment that spans multiple
 * array entries -- only use it for a genuinely standalone line.
 */
export interface RenderKotlinCodeLineOptions {
  /** Highlights the `_____` fill-in-the-blank placeholder as actively selected. */
  isBlankHighlighted?: boolean;
  /** Use light-theme token colors instead of the dark-theme defaults. */
  isDark?: boolean;
}

const KEYWORDS = [
  'val',
  'var',
  'fun',
  'class',
  'when',
  'if',
  'else',
  'for',
  'in',
  'downTo',
  'step',
  'until',
  'return'
];
const LITERAL_KEYWORDS = ['true', 'false', 'null'];
const TYPE_KEYWORDS = ['Int', 'String', 'Boolean', 'Double', 'Unit', 'Float', 'List', 'Set', 'Map'];
const BUILTIN_CALLS = ['println', 'print', 'listOf', 'mutableListOf'];

// Tokenize regex for Kotlin basics. The `\/\/.*$` and `"[^"]*"` alternatives
// are listed first so a trailing comment or a quoted string (which might
// itself contain "//", e.g. "http://...") is captured as one token instead
// of being torn apart by the keyword/identifier alternatives below.
//
// The number alternative (`\d[\d_]*(?:\.[\d_]+)?[fFdDL]?`) intentionally
// does NOT use a trailing `\b`: Kotlin numeric literals can contain `_`
// digit-group separators (`100_000`) and a trailing type suffix (`500L`,
// `3.14f`) -- both `_` and a suffix letter are "word" characters in regex
// terms, so no boundary ever exists between the digits and either of them.
// A `\b\d+\b` pattern can therefore never match the leading digit group of
// `100_000_000_000L` or `500L` at all (every alternative fails at that
// position), silently dropping it from the rendered output while the
// remainder gets swallowed into a plain identifier token instead.
//
// The `'(?:\\.|[^'\\])*'` alternative matches a single-quoted Char literal
// (`'A'`, `'$'`, `'\n'`, `'\''`) as one token, the same way `"[^"]*"` does
// for String literals. Without it, single quotes aren't in ANY
// alternative's character class (not punctuation, not identifier-start),
// so `'`, and non-letter contents like `$` or `\`, silently vanish from
// the render one character at a time -- `'A'` becomes bare `A`, `'$'`
// disappears entirely, and `'\n'` becomes bare `n`.
//
// This deliberately allows zero-or-more characters between the quotes
// (via `*`, not requiring exactly one) even though a real Char literal
// only ever holds one -- a lesson's "this is invalid" example, e.g.
// `'AB'` (real Kotlin: "too many characters in a character literal"),
// still needs its quotes rendered so the code visibly shows single-quoted
// content, rather than the quotes vanishing and leaving an unquoted `AB`
// that no longer illustrates the mistake at all. This mirrors how the
// double-quote alternative already tolerates any content unconditionally.
//
// `"` is also included in the punctuation character class below. Kotlin's
// triple-quoted raw strings (`"""..."""`) contain a run of 3 quote
// characters with no matching partner *within that same run* -- the
// `"[^"]*"` alternative greedily pairs the first two into an (empty)
// string token, leaving the third quote unmatched by any alternative
// (single quotes/keywords/types/calls/numbers don't apply, and it isn't
// punctuation either without this addition), so it silently vanished the
// same way an unmatched `'` or digit-adjacent-to-suffix did before their
// fixes above. This doesn't render triple-quoted strings with dedicated
// "raw string" styling (that would need cross-line state tracking, like
// `renderKotlinCodeLines`'s block-comment handling), but it guarantees no
// character is ever silently dropped from the render.
//
// `&` and `|` were missing from the punctuation class entirely -- neither
// character is punctuation, an operator elsewhere in this regex, or an
// identifier char, so Kotlin's `&&`/`||` logical operators silently vanished
// from every rendered line that used them (this was a live, shipped bug:
// World 2's whole Logical Operators lesson, plus World 1/5 debug content,
// renders `&&`/`||` in Explore/Predict/Debug/Learn views). `\` is included
// for the same reason -- string escape sequences like `\n`/`\"` outside a
// quoted-string token would otherwise drop the backslash and leave a bare
// letter, exactly like the unmatched-`'`/digit-suffix bugs described above.
const TOKEN_REGEX =
  /(\/\/.*$|"[^"]*"|'(?:\\.|[^'\\])*'|_____|\b(?:val|var|fun|class|when|if|else|for|in|downTo|step|until|return|null|true|false|is)\b|\b(?:Int|String|Boolean|Double|Unit|Float|List|Set|Map)\b|\b(?:println|print|listOf|mutableListOf)\b|\d[\d_]*(?:\.[\d_]+)?[fFdDL]?|[{}()+\-*\/=?:.,!<>"&|\\]+|[A-Za-z_][A-Za-z0-9_]*|\s+)/g;

interface ColorClasses {
  commentClass: string;
  stringClass: string;
  keywordClass: string;
  literalClass: string;
  typeClass: string;
  callClass: string;
  numberClass: string;
  punctuationClass: string;
  defaultClass: string;
}

function resolveOptions(options: RenderKotlinCodeLineOptions | boolean): Required<RenderKotlinCodeLineOptions> {
  const { isBlankHighlighted = false, isDark = true } =
    typeof options === 'boolean' ? { isBlankHighlighted: options } : options;
  return { isBlankHighlighted, isDark };
}

function getColorClasses(isDark: boolean): ColorClasses {
  return {
    commentClass: isDark ? 'text-slate-500 italic' : 'text-slate-400 italic',
    stringClass: isDark ? 'text-emerald-300' : 'text-emerald-600',
    keywordClass: isDark ? 'text-purple-400 font-bold' : 'text-indigo-600 font-bold',
    literalClass: isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold',
    typeClass: isDark ? 'text-indigo-300 font-semibold' : 'text-indigo-700 font-semibold',
    callClass: isDark ? 'text-cyan-400 font-medium' : 'text-blue-600 font-medium',
    numberClass: isDark ? 'text-amber-300' : 'text-amber-600',
    punctuationClass: isDark ? 'text-slate-400' : 'text-slate-500',
    defaultClass: isDark ? 'text-slate-200' : 'text-slate-800'
  };
}

// Renders a fragment of code that is guaranteed NOT to contain any part of a
// `/* */` block comment (that's already been sliced out by the caller). It
// still recognizes `//` trailing comments and quoted strings on its own.
function renderCodeFragment(
  fragment: string,
  isBlankHighlighted: boolean,
  classes: ColorClasses,
  keyPrefix: string
): React.ReactNode[] {
  if (fragment === '') return [];
  const tokens = fragment.match(TOKEN_REGEX) || [fragment];

  return tokens.map((token, i) => {
    const key = `${keyPrefix}-${i}`;
    if (token.startsWith('//')) {
      return (
        <span key={key} className={classes.commentClass}>
          {token}
        </span>
      );
    }
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'") && token.length >= 2)
    ) {
      return (
        <span key={key} className={classes.stringClass}>
          {token}
        </span>
      );
    }
    if (token === '_____') {
      return (
        <span
          key={key}
          className={`font-bold px-2 py-0.5 rounded border border-dashed ${
            isBlankHighlighted
              ? 'bg-amber-400/20 text-amber-300 border-amber-400 animate-pulse'
              : 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
          }`}
        >
          _____
        </span>
      );
    }
    if (KEYWORDS.includes(token)) {
      return (
        <span key={key} className={classes.keywordClass}>
          {token}
        </span>
      );
    }
    if (LITERAL_KEYWORDS.includes(token)) {
      return (
        <span key={key} className={classes.literalClass}>
          {token}
        </span>
      );
    }
    if (TYPE_KEYWORDS.includes(token)) {
      return (
        <span key={key} className={classes.typeClass}>
          {token}
        </span>
      );
    }
    if (BUILTIN_CALLS.includes(token)) {
      return (
        <span key={key} className={classes.callClass}>
          {token}
        </span>
      );
    }
    if (/^\d[\d_]*(?:\.[\d_]+)?[fFdDL]?$/.test(token)) {
      return (
        <span key={key} className={classes.numberClass}>
          {token}
        </span>
      );
    }
    if (/^[{}()+\-*\/=?:.,!<>"&|\\]+$/.test(token)) {
      return (
        <span key={key} className={classes.punctuationClass}>
          {token}
        </span>
      );
    }
    return (
      <span key={key} className={classes.defaultClass}>
        {token}
      </span>
    );
  });
}

interface LineSegment {
  text: string;
  isComment: boolean;
}

// Splits a single line into alternating code/block-comment segments, given
// whether we're already inside an unclosed `/* ... */` block comment carried
// over from a previous line. Returns the segments plus the updated
// "still inside a block comment" state for the next line. Does not support
// nested block comments (Kotlin allows them, but lesson code never needs
// that, and a single boolean toggle covers every real case in this app).
function splitBlockCommentSegments(line: string, startsInsideBlockComment: boolean): { segments: LineSegment[]; endsInsideBlockComment: boolean } {
  const segments: LineSegment[] = [];
  let rest = line;
  let insideBlockComment = startsInsideBlockComment;

  while (rest.length > 0) {
    if (insideBlockComment) {
      const closeIdx = rest.indexOf('*/');
      if (closeIdx === -1) {
        segments.push({ text: rest, isComment: true });
        rest = '';
      } else {
        segments.push({ text: rest.slice(0, closeIdx + 2), isComment: true });
        rest = rest.slice(closeIdx + 2);
        insideBlockComment = false;
      }
    } else {
      const openIdx = rest.indexOf('/*');
      if (openIdx === -1) {
        segments.push({ text: rest, isComment: false });
        rest = '';
      } else {
        if (openIdx > 0) {
          segments.push({ text: rest.slice(0, openIdx), isComment: false });
        }
        const afterOpen = rest.slice(openIdx);
        const closeIdx = afterOpen.indexOf('*/', 2);
        if (closeIdx === -1) {
          segments.push({ text: afterOpen, isComment: true });
          rest = '';
          insideBlockComment = true;
        } else {
          segments.push({ text: afterOpen.slice(0, closeIdx + 2), isComment: true });
          rest = afterOpen.slice(closeIdx + 2);
        }
      }
    }
  }

  return { segments, endsInsideBlockComment: insideBlockComment };
}

/**
 * Renders an ENTIRE `code`/`codeSnippet` array, tracking `/* ... *\/` block
 * comments across lines. Returns one React node per input line -- wrap each
 * in your own line container (e.g. `<div className="whitespace-pre">`).
 *
 * This is the preferred entry point for any lesson-stage code block; use
 * `renderKotlinCodeLine` only for a single, standalone line.
 */
export function renderKotlinCodeLines(lines: string[], options: RenderKotlinCodeLineOptions = {}): React.ReactNode[] {
  const { isBlankHighlighted, isDark } = resolveOptions(options);
  const classes = getColorClasses(isDark);
  let insideBlockComment = false;

  return lines.map((line, lineIdx) => {
    // Preserve the existing whole-line `//` comment behavior (renders the
    // full original line, including its leading whitespace, in one span)
    // when we're not already inside a block comment.
    if (!insideBlockComment && line.trim().startsWith('//')) {
      return (
        <span key={lineIdx} className={classes.commentClass}>
          {line}
        </span>
      );
    }

    const { segments, endsInsideBlockComment } = splitBlockCommentSegments(line, insideBlockComment);
    insideBlockComment = endsInsideBlockComment;

    return (
      <React.Fragment key={lineIdx}>
        {segments.map((segment, segIdx) =>
          segment.isComment ? (
            <span key={`c-${segIdx}`} className={classes.commentClass}>
              {segment.text}
            </span>
          ) : (
            renderCodeFragment(segment.text, isBlankHighlighted, classes, `${lineIdx}-${segIdx}`)
          )
        )}
      </React.Fragment>
    );
  });
}

/**
 * Renders a single, standalone line of Kotlin code. Does NOT track a block
 * comment that spans multiple lines -- if you're mapping over a `code`/
 * `codeSnippet` array, use `renderKotlinCodeLines` instead so a `/* ... *\/`
 * comment opened on one line and closed on a later one is still recognized.
 */
export function renderKotlinCodeLine(
  line: string,
  options: RenderKotlinCodeLineOptions | boolean = {}
): React.ReactNode {
  return renderKotlinCodeLines([line], typeof options === 'boolean' ? { isBlankHighlighted: options } : options)[0];
}
