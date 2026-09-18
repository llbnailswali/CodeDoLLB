// Shared, framework-free helpers for the mobile code editor (WriteRun.tsx).
// Kept separate from the component so the column-math/word-boundary/bracket
// logic can be unit-reasoned about without React in the loop.

export const AUTO_PAIR_MAP: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']',
  '"': '"',
  "'": "'",
};

export const CLOSING_CHARS = new Set(Object.values(AUTO_PAIR_MAP));

const IDENTIFIER_CHAR = /[a-zA-Z0-9_$]/;

// Removes one indent level (4 spaces) from a whitespace-only string, never
// going negative. Mirrors the 4-space convention handleSmartReturn already uses.
export function dedentLine(indent: string, spacesPerLevel: number = 4): string {
  if (indent.length <= spacesPerLevel) return '';
  return indent.slice(0, indent.length - spacesPerLevel);
}

// Given a line of text and a character column, returns the [start, end) range
// of the "word" under that column: an identifier run if the column sits on/
// beside one, a single punctuation character if it sits on punctuation, or a
// collapsed (no-op) range if it sits on whitespace/out of bounds.
export function getWordRangeAt(line: string, col: number): { start: number; end: number } {
  const clamped = Math.max(0, Math.min(line.length, col));
  const isIdentChar = (idx: number) => idx >= 0 && idx < line.length && IDENTIFIER_CHAR.test(line[idx]);

  if (isIdentChar(clamped) || isIdentChar(clamped - 1)) {
    let start = clamped;
    let end = clamped;
    while (start > 0 && isIdentChar(start - 1)) start--;
    while (end < line.length && isIdentChar(end)) end++;
    return { start, end };
  }

  if (clamped < line.length && !/\s/.test(line[clamped])) {
    return { start: clamped, end: clamped + 1 };
  }

  return { start: clamped, end: clamped };
}

// Lesson starter code marks the blank(s) a learner needs to fill in with a
// `// ...` comment directly above them (e.g. `// 1. Declare ...:` followed by
// a blank or `}` line). The editor should open with the cursor already
// sitting on that first fill-in line, not wherever a generic heuristic lands.
export function findInitialCursorPosition(code: string): number {
  const lines = code.split('\n');
  const firstCommentLineIdx = lines.findIndex((line) => line.trim().startsWith('//'));

  if (firstCommentLineIdx !== -1 && firstCommentLineIdx + 1 < lines.length) {
    let offset = 0;
    for (let i = 0; i <= firstCommentLineIdx; i++) {
      offset += lines[i].length + 1;
    }
    return offset;
  }

  const returnIdx = code.indexOf('return');
  return returnIdx !== -1 ? returnIdx + 'return'.length : code.length;
}

// Like `findInitialCursorPosition`, but also guarantees the learner has
// `blankLineCount` blank lines to write into right after the first `// ...`
// TODO-style comment -- inserting more if the starter code has fewer (some
// lessons leave only one, or none at all when the comment sits directly
// above a closing `}`). Returns the (possibly modified) code alongside the
// cursor position, since this can change the document itself, not just
// where the caret sits. If no comment line exists at all, the code is
// returned unchanged (this only applies to the TODO-comment convention).
export function ensureBlankLinesAfterFirstComment(
  code: string,
  blankLineCount: number = 2
): { code: string; cursorPosition: number } {
  const lines = code.split('\n');
  const firstCommentLineIdx = lines.findIndex((line) => line.trim().startsWith('//'));

  if (firstCommentLineIdx === -1 || firstCommentLineIdx + 1 >= lines.length) {
    return { code, cursorPosition: findInitialCursorPosition(code) };
  }

  let existingBlankLines = 0;
  while (
    firstCommentLineIdx + 1 + existingBlankLines < lines.length &&
    lines[firstCommentLineIdx + 1 + existingBlankLines].trim() === ''
  ) {
    existingBlankLines++;
  }

  const missing = Math.max(0, blankLineCount - existingBlankLines);
  if (missing > 0) {
    lines.splice(firstCommentLineIdx + 1 + existingBlankLines, 0, ...Array(missing).fill(''));
  }

  let cursorPosition = 0;
  for (let i = 0; i <= firstCommentLineIdx; i++) {
    cursorPosition += lines[i].length + 1;
  }

  return { code: lines.join('\n'), cursorPosition };
}

// Converts a tap/press point (clientX/clientY) into a character column
// within `lineStr`, using the browser's own text hit-testing rather than
// assumed monospace character-width math. This is what makes tap-to-column
// and long-press-to-select-word work correctly whether the line renders as
// a single row (horizontal-scroll mode) or wraps across multiple visual
// rows (default mode) -- a fixed "pixels per character" assumption breaks
// the moment a line wraps, since the click's Y coordinate then also matters,
// not just X. `lineEl` must be the element containing exactly this line's
// rendered text (and nothing else), so summing preceding text-node lengths
// up to the hit point gives the correct absolute column.
export function columnFromPoint(lineEl: HTMLElement, lineStr: string, clientX: number, clientY: number): number {
  try {
    const doc = document as Document & {
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
      caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    };

    let hitNode: Node | null = null;
    let hitOffset = 0;

    if (doc.caretRangeFromPoint) {
      const range = doc.caretRangeFromPoint(clientX, clientY);
      if (range) {
        hitNode = range.startContainer;
        hitOffset = range.startOffset;
      }
    } else if (doc.caretPositionFromPoint) {
      const pos = doc.caretPositionFromPoint(clientX, clientY);
      if (pos) {
        hitNode = pos.offsetNode;
        hitOffset = pos.offset;
      }
    }

    if (hitNode && lineEl.contains(hitNode)) {
      const walker = document.createTreeWalker(lineEl, NodeFilter.SHOW_TEXT);
      let offsetInLine = 0;
      let node = walker.nextNode();
      while (node) {
        if (node === hitNode) {
          offsetInLine += hitOffset;
          return Math.max(0, Math.min(lineStr.length, offsetInLine));
        }
        offsetInLine += (node.textContent || '').length;
        node = walker.nextNode();
      }
    }
  } catch {
    // Fall through to the coarse fallback below.
  }

  // Fallback (hit-testing API unavailable, or the point fell outside any
  // text node, e.g. in trailing padding): clamp to the nearer end of the
  // line based on which half of its bounding box was touched.
  const rect = lineEl.getBoundingClientRect();
  return clientX < rect.left + rect.width / 2 ? 0 : lineStr.length;
}
