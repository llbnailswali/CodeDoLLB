import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Clipboard } from '@capacitor/clipboard';
import { soundFX } from '../../utils/audio';
import { renderHighlightedLine } from '../../utils/ideSyntaxHighlighter';
import {
  AUTO_PAIR_MAP,
  CLOSING_CHARS,
  columnFromPoint,
  dedentLine,
  ensureBlankLinesAfterFirstComment,
  findInitialCursorPosition,
  getWordRangeAt,
} from '../../utils/editorLogic';
import { CodingAccessoryToolbar } from './CodingAccessoryToolbar';
import { MobileCodingKeyboard } from './MobileCodingKeyboard';

export interface KotlinCodeEditorHandle {
  // Replaces the whole document (e.g. "Reset to Starter", "Apply Solution").
  // When cursorPos is omitted, the code is also normalized to guarantee 2
  // blank lines after the first TODO comment (see ensureBlankLinesAfterFirstComment),
  // and the cursor is placed on the first of them -- the same treatment the
  // editor gives the starter code on first mount.
  resetTo: (code: string, cursorPos?: number) => void;
  // Shows/hides the dedicated on-screen arrow buttons. Off by default since
  // swiping anywhere on the keypad already moves the cursor in all 4
  // directions; some users may still want the explicit buttons.
  toggleCursorArrows: () => void;
  // Switches between wrapping long lines to fit the screen width (default,
  // no horizontal scrollbar -- write code without ever scrolling sideways)
  // and the old no-wrap-plus-horizontal-scroll behavior.
  toggleHorizontalScroll: () => void;
}

interface KotlinCodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  // Ctrl/Cmd+Enter shortcut. What "running" means (graded vs. freeform) is
  // entirely up to the consumer.
  onRunRequested?: () => void;
  customTokens?: string[];
  className?: string;
  // Reports the current on/off state whenever it changes, so a consumer's
  // own menu (e.g. WriteRun's overflow menu) can reflect it in a label.
  onCursorArrowsVisibilityChange?: (visible: boolean) => void;
  // Reports the current wrap/scroll mode whenever it changes, so a
  // consumer's own menu (e.g. WriteRun's overflow menu) can reflect it.
  onHorizontalScrollChange?: (enabled: boolean) => void;
  // Matches the app's light/dark theme toggle -- defaults to dark to match
  // this editor's original always-dark look.
  isDark?: boolean;
}

const LONG_PRESS_MS = 450;
const LONG_PRESS_MOVE_THRESHOLD_PX = 8;

export const KotlinCodeEditor = forwardRef<KotlinCodeEditorHandle, KotlinCodeEditorProps>(
  (
    {
      code,
      onCodeChange,
      onRunRequested,
      customTokens = [],
      className = '',
      onCursorArrowsVisibilityChange,
      onHorizontalScrollChange,
      isDark = true,
    },
    ref
  ) => {
    const [showVirtualKeyboard] = useState<boolean>(true);
    const [showCursorArrows, setShowCursorArrows] = useState<boolean>(false);
    // Off by default: lines wrap to fit the screen width and there is no
    // horizontal scrollbar, so writing code never requires scrolling
    // sideways. Turning this on restores the old no-wrap + horizontal-scroll
    // behavior for anyone who prefers it.
    const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState<boolean>(false);

    useEffect(() => {
      onCursorArrowsVisibilityChange?.(showCursorArrows);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCursorArrows]);

    useEffect(() => {
      onHorizontalScrollChange?.(horizontalScrollEnabled);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [horizontalScrollEnabled]);

    // Undo / Redo History Stack
    const [history, setHistory] = useState<string[]>([code]);
    const [historyIndex, setHistoryIndex] = useState<number>(0);

    // Cursor and Selection tracking. Starter code marks its fill-in blanks
    // with a `// ...` comment directly above them, so open with the caret
    // already on the first such blank rather than defaulting to the end.
    const [cursorPosition, setCursorPosition] = useState<number>(() => findInitialCursorPosition(code));

    // On first mount only: normalize the starter code to guarantee 2 blank
    // lines after the first TODO comment (some lessons leave just one, or
    // none at all when the comment sits directly above a closing `}`).
    useEffect(() => {
      const normalized = ensureBlankLinesAfterFirstComment(code);
      if (normalized.code !== code) {
        onCodeChange(normalized.code);
      }
      setCursorPosition(normalized.cursorPosition);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Long-press-driven text selection (a real range, distinct from the
    // single blinking-caret cursorPosition above) and the menu it opens.
    const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
    const [longPressMenu, setLongPressMenu] = useState<{ x: number; y: number; lineIdx: number } | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cursorSpanRef = useRef<HTMLSpanElement>(null);
    const editorScrollRef = useRef<HTMLDivElement>(null);
    const longPressTimerRef = useRef<number | null>(null);
    const longPressStartRef = useRef<{ x: number; y: number } | null>(null);
    const justLongPressedRef = useRef<boolean>(false);

    // Sync history if `code` changes externally (e.g. loading a new lesson)
    useEffect(() => {
      if (history[historyIndex] !== code) {
        setHistory((prev) => [...prev.slice(0, historyIndex + 1), code]);
        setHistoryIndex((prev) => prev + 1);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    const updateCodeWithHistory = (newCode: string, newCursorPos?: number) => {
      onCodeChange(newCode);
      setSelection(null);
      setHistory((prev) => {
        const next = [...prev.slice(0, historyIndex + 1), newCode];
        return next.slice(-40);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 39));

      if (newCursorPos !== undefined) {
        setCursorPosition(newCursorPos);
      }
    };

    const handleUndo = () => {
      if (historyIndex > 0) {
        soundFX.playClick();
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        const prevCode = history[nextIdx];
        onCodeChange(prevCode);
        setCursorPosition(prevCode.length);
      }
    };

    const handleRedo = () => {
      if (historyIndex < history.length - 1) {
        soundFX.playClick();
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        const nextCode = history[nextIdx];
        onCodeChange(nextCode);
        setCursorPosition(nextCode.length);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        resetTo: (newCode: string, cursorPos?: number) => {
          if (cursorPos !== undefined) {
            updateCodeWithHistory(newCode, cursorPos);
            return;
          }
          const normalized = ensureBlankLinesAfterFirstComment(newCode);
          updateCodeWithHistory(normalized.code, normalized.cursorPosition);
        },
        toggleCursorArrows: () => setShowCursorArrows((prev) => !prev),
        toggleHorizontalScroll: () => setHorizontalScrollEnabled((prev) => !prev),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [historyIndex]
    );

    // Insert token or text with auto-closing brackets support. If a selection
    // is active, the inserted text replaces it (standard editor behavior).
    const handleInsertToken = (textToInsert: string) => {
      soundFX.playClick();
      const start = selection ? Math.min(selection.start, selection.end) : cursorPosition;
      const end = selection ? Math.max(selection.start, selection.end) : cursorPosition;

      // Overtype / step-over if next character matches the closing bracket/quote being typed
      if (start === end && CLOSING_CHARS.has(textToInsert) && code[start] === textToInsert) {
        updateCodeWithHistory(code, start + 1);
        return;
      }

      // Auto-dedent when '}' closes a block on an otherwise-blank line
      if (textToInsert === '}' && start === end) {
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        const beforeCursorOnLine = code.slice(lineStart, start);
        if (beforeCursorOnLine.length > 0 && /^\s+$/.test(beforeCursorOnLine)) {
          const dedented = dedentLine(beforeCursorOnLine);
          const newCode = code.slice(0, lineStart) + dedented + '}' + code.slice(start);
          updateCodeWithHistory(newCode, lineStart + dedented.length + 1);
          return;
        }
      }

      let insert = textToInsert;
      let cursorOffset = textToInsert.length;

      // Auto-closing brackets/quotes (only for a single-character opener typed with no selection)
      const autoClose = AUTO_PAIR_MAP[textToInsert];
      if (autoClose && start === end) {
        insert = textToInsert + autoClose;
        cursorOffset = 1;
      }

      const before = code.slice(0, start);
      const after = code.slice(end);
      const newCode = before + insert + after;
      const newPos = start + cursorOffset;

      updateCodeWithHistory(newCode, newPos);
    };

    // Smart Backspace: deletes the active selection, or a matching empty
    // bracket pair, or the single preceding character.
    const handleSmartBackspace = () => {
      soundFX.playClick();
      const start = selection ? Math.min(selection.start, selection.end) : cursorPosition;
      const end = selection ? Math.max(selection.start, selection.end) : cursorPosition;

      if (start === end && start > 0) {
        const charBefore = code[start - 1];
        const charAfter = code[start];
        const isPair = AUTO_PAIR_MAP[charBefore] === charAfter;

        if (isPair) {
          const before = code.slice(0, start - 1);
          const after = code.slice(start + 1);
          updateCodeWithHistory(before + after, start - 1);
          return;
        }

        const before = code.slice(0, start - 1);
        const after = code.slice(start);
        updateCodeWithHistory(before + after, start - 1);
      } else if (start !== end) {
        const before = code.slice(0, start);
        const after = code.slice(end);
        updateCodeWithHistory(before + after, start);
      }
    };

    // Smart Indentation on Enter / Return. Replaces the active selection (if any).
    const handleSmartReturn = () => {
      soundFX.playClick();
      const pos = selection ? Math.min(selection.start, selection.end) : cursorPosition;
      const selEnd = selection ? Math.max(selection.start, selection.end) : cursorPosition;

      const textBefore = code.slice(0, pos);
      const textAfter = code.slice(selEnd);
      const currentLineMatch = textBefore.match(/(?:^|\n)([^\n]*)$/);
      const currentLine = currentLineMatch ? currentLineMatch[1] : '';

      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      const trimmedLine = currentLine.trim();
      const endsWithOpenBrace = trimmedLine.endsWith('{');
      const nextCharIsCloseBrace = textAfter.startsWith('}');

      let insert = '\n' + currentIndent;
      let cursorOffset = insert.length;

      if (endsWithOpenBrace) {
        if (nextCharIsCloseBrace) {
          insert = '\n' + currentIndent + '    \n' + currentIndent;
          cursorOffset = 1 + currentIndent.length + 4;
        } else {
          insert = '\n' + currentIndent + '    ';
          cursorOffset = insert.length;
        }
      }

      const newCode = textBefore + insert + textAfter;
      updateCodeWithHistory(newCode, pos + cursorOffset);
      // A new line starts fresh at (or near) column 0 -- show it from the
      // start rather than leaving the view scrolled wherever the previous,
      // possibly long, line had scrolled to.
      if (editorScrollRef.current) {
        editorScrollRef.current.scrollLeft = 0;
      }
    };

    const handleSpace = () => {
      soundFX.playClick();
      handleInsertToken(' ');
    };

    // Calculate lines and active line index
    const lines = code.split('\n');
    const displayLineCount = Math.max(14, lines.length + 1);

    let currentLineIndex = 0;
    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
      charCount += lines[i].length + 1;
      if (cursorPosition < charCount) {
        currentLineIndex = i;
        break;
      }
      if (i === lines.length - 1) {
        currentLineIndex = i;
      }
    }

    // Keep the caret visible whenever it moves. `nearest` is a no-op if it's
    // already fully on-screen, and otherwise scrolls exactly enough to
    // reveal it -- for a cursor at the true end of a long line, that lands
    // scrollLeft at the container's max (revealing the whole line's end),
    // while a short line (e.g. a fresh blank line right after Return) is
    // simply left alone instead of being force-scrolled to the document's
    // unrelated global max (handleSmartReturn's explicit scrollLeft reset
    // handles putting a new line's start in view).
    useEffect(() => {
      cursorSpanRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }, [cursorPosition, code]);

    // Cursor movement, shared by the physical-keyboard listener below, the
    // on-screen arrow buttons, and the whole-keypad swipe gesture.
    const moveCursorHorizontal = (delta: number) => {
      setSelection(null);
      setCursorPosition((prev) => Math.max(0, Math.min(code.length, prev + delta)));
    };

    // Moves the cursor by `lineDelta` lines, preserving column where possible.
    // Uses the setState-updater form (rather than closing over the render's
    // `cursorPosition`/`currentLineIndex`) so a fast swipe that fires this
    // multiple times in one tick still accumulates correctly instead of every
    // call recomputing from the same stale starting point.
    const moveCursorVerticalBy = (lineDelta: number) => {
      if (lineDelta === 0) return;
      setSelection(null);
      setCursorPosition((prev) => {
        const lineOffsets: number[] = [];
        let off = 0;
        for (let i = 0; i < lines.length; i++) {
          lineOffsets.push(off);
          off += lines[i].length + 1;
        }
        let curLine = lines.length - 1;
        for (let i = 0; i < lines.length; i++) {
          if (prev < lineOffsets[i] + lines[i].length + 1) {
            curLine = i;
            break;
          }
        }
        const targetLine = curLine + lineDelta;
        if (targetLine < 0) return 0;
        if (targetLine > lines.length - 1) return code.length;
        const colInCurrentLine = prev - lineOffsets[curLine];
        return lineOffsets[targetLine] + Math.min(colInCurrentLine, lines[targetLine].length);
      });
    };

    const moveCursorVertical = (direction: -1 | 1) => moveCursorVerticalBy(direction);

    // Desktop physical keyboard listener - allows typing without focusing a native mobile input
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          handleInsertToken('    ');
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          onRunRequested?.();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
          e.preventDefault();
          handleRedo();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleSmartReturn();
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          handleSmartBackspace();
        } else if (e.key === 'Delete') {
          e.preventDefault();
          if (cursorPosition < code.length) {
            const before = code.slice(0, cursorPosition);
            const after = code.slice(cursorPosition + 1);
            updateCodeWithHistory(before + after, cursorPosition);
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          moveCursorHorizontal(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          moveCursorHorizontal(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          moveCursorVertical(-1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          moveCursorVertical(1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          let off = 0;
          for (let i = 0; i < currentLineIndex; i++) {
            off += lines[i].length + 1;
          }
          setSelection(null);
          setCursorPosition(off);
        } else if (e.key === 'End') {
          e.preventDefault();
          let off = 0;
          for (let i = 0; i < currentLineIndex; i++) {
            off += lines[i].length + 1;
          }
          setSelection(null);
          setCursorPosition(off + lines[currentLineIndex].length);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          handleInsertToken(e.key);
        }
      };

      const handleGlobalPaste = (e: ClipboardEvent) => {
        const text = e.clipboardData?.getData('text');
        if (text) {
          e.preventDefault();
          handleInsertToken(text);
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      window.addEventListener('paste', handleGlobalPaste);
      return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
        window.removeEventListener('paste', handleGlobalPaste);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, cursorPosition, historyIndex, lines, currentLineIndex, selection]);

    const getLineStartOffset = (lineIdx: number): number => {
      let offset = 0;
      for (let i = 0; i < lineIdx && i < lines.length; i++) {
        offset += lines[i].length + 1;
      }
      return offset;
    };

    const getLineBounds = (lineIdx: number): { start: number; end: number } => {
      const start = getLineStartOffset(lineIdx);
      const end = start + (lines[lineIdx]?.length ?? 0);
      return { start, end };
    };

    // Tap directly on a line to move the cursor to the tapped character
    // column (not just the end of the line), without opening the device keyboard.
    // Uses real DOM hit-testing (columnFromPoint) rather than assumed
    // character-width math, so it stays correct whether the line renders as
    // a single row (horizontal-scroll mode) or wraps across several visual
    // rows (default mode).
    const handleLineClick = (lineIdx: number, e?: React.MouseEvent<HTMLElement>) => {
      if (e) e.stopPropagation();
      if (justLongPressedRef.current) {
        justLongPressedRef.current = false;
        return;
      }
      setSelection(null);
      setLongPressMenu(null);

      const offset = getLineStartOffset(lineIdx);
      const targetLine = lines[lineIdx] ?? '';
      let col = targetLine.length;
      if (e) {
        col = columnFromPoint(e.currentTarget, targetLine, e.clientX, e.clientY);
      }
      const newPos = Math.min(offset + col, code.length);
      setCursorPosition(newPos);
    };

    // Tap empty canvas below code to position cursor at end of code
    const handleCanvasClick = () => {
      setSelection(null);
      setLongPressMenu(null);
      setCursorPosition(code.length);
    };

    const clearLongPressTimer = () => {
      if (longPressTimerRef.current !== null) {
        window.clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };

    // Long-press (touch/pointer hold) on a line: select the word under the
    // touch point and open a contextual action menu near it.
    const triggerLongPress = (lineIdx: number, clientX: number, clientY: number, el: HTMLElement) => {
      const targetLine = lines[lineIdx] ?? '';
      const offset = getLineStartOffset(lineIdx);
      const col = columnFromPoint(el, targetLine, clientX, clientY);
      const { start, end } = getWordRangeAt(targetLine, col);

      soundFX.playClick();
      justLongPressedRef.current = true;
      setSelection(start === end ? null : { start: offset + start, end: offset + end });
      setCursorPosition(offset + end);
      setLongPressMenu({ x: clientX, y: clientY, lineIdx });
    };

    const handleLinePointerDown = (lineIdx: number, e: React.PointerEvent<HTMLDivElement>) => {
      longPressStartRef.current = { x: e.clientX, y: e.clientY };
      clearLongPressTimer();
      const target = e.currentTarget;
      const clientX = e.clientX;
      const clientY = e.clientY;
      longPressTimerRef.current = window.setTimeout(() => {
        triggerLongPress(lineIdx, clientX, clientY, target);
      }, LONG_PRESS_MS);
    };

    const handleLinePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const start = longPressStartRef.current;
      if (!start) return;
      if (Math.abs(e.clientX - start.x) > LONG_PRESS_MOVE_THRESHOLD_PX || Math.abs(e.clientY - start.y) > LONG_PRESS_MOVE_THRESHOLD_PX) {
        clearLongPressTimer();
      }
    };

    const handleLinePointerUp = () => {
      clearLongPressTimer();
      longPressStartRef.current = null;
    };

    const closeLongPressMenu = () => setLongPressMenu(null);

    const getSelectedText = (): string => {
      if (!selection) return '';
      const s = Math.min(selection.start, selection.end);
      const e = Math.max(selection.start, selection.end);
      return code.slice(s, e);
    };

    const handleCopySelection = async () => {
      soundFX.playClick();
      const text = getSelectedText();
      if (text) {
        try {
          await Clipboard.write({ string: text });
        } catch {
          soundFX.playError();
        }
      }
      closeLongPressMenu();
    };

    const handleCutSelection = async () => {
      soundFX.playClick();
      const text = getSelectedText();
      if (text && selection) {
        try {
          await Clipboard.write({ string: text });
        } catch {
          soundFX.playError();
          // Still remove the selected text below even if the copy failed --
          // the user asked to cut, and losing the clipboard write shouldn't
          // also block the edit itself.
        }
        const s = Math.min(selection.start, selection.end);
        const e = Math.max(selection.start, selection.end);
        updateCodeWithHistory(code.slice(0, s) + code.slice(e), s);
      }
      closeLongPressMenu();
    };

    const handlePasteFromClipboard = async () => {
      soundFX.playClick();
      try {
        const { value } = await Clipboard.read();
        if (value) {
          handleInsertToken(value);
        } else {
          soundFX.playError();
        }
      } catch {
        soundFX.playError();
      }
      closeLongPressMenu();
    };

    const handleSelectAll = () => {
      soundFX.playClick();
      setSelection({ start: 0, end: code.length });
      setCursorPosition(code.length);
    };

    const handleDuplicateLine = (lineIdx: number) => {
      soundFX.playClick();
      const { start, end } = getLineBounds(lineIdx);
      const lineText = code.slice(start, end);
      const hasTrailingNewline = end < code.length;
      const insertion = hasTrailingNewline ? lineText + '\n' : '\n' + lineText;
      const insertAt = hasTrailingNewline ? end + 1 : end;
      const newCode = code.slice(0, insertAt) + insertion + code.slice(insertAt);
      // Insertion happens entirely after the current line, so the absolute
      // cursor offset within/before this line is still valid unchanged.
      updateCodeWithHistory(newCode, cursorPosition);
      closeLongPressMenu();
    };

    const handleDeleteLine = (lineIdx: number) => {
      soundFX.playClick();
      if (lines.length <= 1) {
        // Only one line exists — clear it but keep a single, valid empty line.
        updateCodeWithHistory('', 0);
        closeLongPressMenu();
        return;
      }
      const { start, end } = getLineBounds(lineIdx);
      let delStart = start;
      let delEnd = end;
      if (end < code.length) {
        delEnd = end + 1; // also consume this line's own trailing newline
      } else if (start > 0) {
        delStart = start - 1; // last line: consume the preceding newline instead
      }
      const newCode = code.slice(0, delStart) + code.slice(delEnd);
      updateCodeWithHistory(newCode, Math.min(delStart, newCode.length));
      closeLongPressMenu();
    };

    return (
      <div className={`flex-1 flex flex-col min-h-0 relative overflow-hidden ${className}`} data-purpose="kotlin-code-editor">
        {/* ================= BEGIN: Code Editor Surface ================= */}
        <div
          ref={editorScrollRef}
          onClick={handleCanvasClick}
          // scroll-padding gives scrollIntoView({inline:'nearest'}) room to stop
          // short of the true edge -- e.g. after a Backspace merges the cursor
          // onto the end of a long previous line, the view now scrolls to
          // reveal that spot PLUS this much breathing room to its right,
          // like a person would naturally scroll, instead of stopping the
          // instant the cursor is barely visible flush against the edge.
          style={{ scrollPaddingLeft: 24, scrollPaddingRight: 96, scrollPaddingTop: 24, scrollPaddingBottom: 24 }}
          className={`flex-1 overflow-y-auto ${
            horizontalScrollEnabled ? 'overflow-x-auto' : 'overflow-x-hidden'
          } overscroll-contain relative font-mono text-[13.5px] leading-[24px] cursor-text ${
            isDark ? 'bg-[#0b0f19]' : 'bg-white'
          }`}
        >
          {/* Each logical line is one row: [gutter cell][code cell] together,
              so the gutter number naturally stays aligned with its line even
              when that line wraps across multiple visual rows (default mode). */}
          <div className={`relative flex flex-col ${horizontalScrollEnabled ? 'min-w-max' : ''}`}>
            {/* Read-only sync textarea with inputMode="none" ensuring native device keyboard is NEVER triggered.
                Sized to this wrapper (which grows with all the lines) rather than the outer
                scrollable viewport, so it covers the full document, not just what's on-screen. */}
            <textarea
              ref={textareaRef}
              wrap="off"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              readOnly
              inputMode="none"
              tabIndex={-1}
              aria-hidden="true"
              value={code}
              className="absolute inset-0 opacity-0 w-full h-full resize-none p-0 pointer-events-none font-mono text-[13.5px] leading-[24px] -z-10 select-none"
            />
            {lines.map((lineStr, lineIdx) => {
              const isActive = lineIdx === currentLineIndex;

              let lineStartOffset = 0;
              for (let i = 0; i < lineIdx; i++) {
                lineStartOffset += lines[i].length + 1;
              }
              const colInLine = Math.max(0, Math.min(lineStr.length, cursorPosition - lineStartOffset));

              const selStart = selection ? Math.min(selection.start, selection.end) : null;
              const selEnd = selection ? Math.max(selection.start, selection.end) : null;
              const hasSelectionOnLine =
                selStart !== null && selEnd !== null && selEnd > lineStartOffset && selStart < lineStartOffset + lineStr.length;

              return (
                <div key={lineIdx} className="flex items-stretch">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLineClick(lineIdx);
                    }}
                    className={`sticky left-0 z-10 w-[22px] shrink-0 pt-[3px] text-center select-none cursor-pointer text-[10px] font-mono tracking-tighter border-r transition-colors ${
                      isDark ? 'bg-[#090d15]/90 border-ide-border' : 'bg-slate-100 border-slate-300'
                    } ${
                      isActive
                        ? 'text-indigo-400 font-bold'
                        : isDark
                        ? 'text-slate-600 hover:text-slate-400'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {lineIdx + 1}
                  </span>
                  <div
                    onClick={(e) => handleLineClick(lineIdx, e)}
                    onPointerDown={(e) => handleLinePointerDown(lineIdx, e)}
                    onPointerMove={handleLinePointerMove}
                    onPointerUp={handleLinePointerUp}
                    onPointerCancel={handleLinePointerUp}
                    className={`flex-1 py-0 pl-1.5 pr-8 leading-[24px] transition-colors relative cursor-pointer font-mono ${
                      horizontalScrollEnabled ? 'whitespace-pre' : 'whitespace-pre-wrap break-words min-w-0'
                    } ${
                      isActive ? (isDark ? 'bg-[#13192c]' : 'bg-indigo-50') : isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-100'
                    }`}
                  >
                    {hasSelectionOnLine ? (
                      <>
                        {renderHighlightedLine(lineStr.slice(0, Math.max(0, selStart! - lineStartOffset)), `line-${lineIdx}-a`, isDark)}
                        <span className="bg-indigo-500/40 rounded-[2px]">
                          {renderHighlightedLine(
                            lineStr.slice(
                              Math.max(0, selStart! - lineStartOffset),
                              Math.min(lineStr.length, selEnd! - lineStartOffset)
                            ),
                            `line-${lineIdx}-b`,
                            isDark
                          )}
                        </span>
                        {renderHighlightedLine(lineStr.slice(Math.min(lineStr.length, selEnd! - lineStartOffset)), `line-${lineIdx}-c`, isDark)}
                      </>
                    ) : isActive ? (
                      <>
                        {renderHighlightedLine(lineStr.slice(0, colInLine), `line-${lineIdx}-before`, isDark)}
                        <span
                          ref={cursorSpanRef}
                          className="inline-block w-[2px] h-[17px] bg-indigo-400 align-middle blinking-cursor shadow-[0_0_8px_rgba(129,140,248,0.9)] mx-[0.5px]"
                        />
                        {renderHighlightedLine(lineStr.slice(colInLine), `line-${lineIdx}-after`, isDark)}
                      </>
                    ) : (
                      renderHighlightedLine(lineStr || ' ', `line-${lineIdx}`, isDark)
                    )}
                  </div>
                </div>
              );
            })}

            {/* Filler rows below the real content, purely decorative so a
                short file doesn't look cramped -- matches the old fixed
                14-line-minimum gutter padding. */}
            {Array.from({ length: Math.max(0, displayLineCount - lines.length) }).map((_, i) => (
              <div key={`filler-${i}`} className="flex items-stretch h-[24px] shrink-0">
                <span
                  className={`sticky left-0 z-10 w-[22px] shrink-0 text-center text-[10px] font-mono tracking-tighter border-r ${
                    isDark ? 'text-slate-600 bg-[#090d15]/90 border-ide-border' : 'text-slate-400 bg-slate-100 border-slate-300'
                  }`}
                >
                  {lines.length + i + 1}
                </span>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
        {/* ================= END: Code Editor Surface ================= */}

        {/* ================= BEGIN: Long-Press Contextual Action Menu ================= */}
        {longPressMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setLongPressMenu(null)} />
            <div
              className={`fixed z-50 w-44 rounded-xl border shadow-2xl p-1.5 text-xs animate-fadeIn ${
                isDark ? 'bg-[#141926] border-slate-700/80' : 'bg-white border-slate-300'
              }`}
              style={{
                left: Math.min(Math.max(8, longPressMenu.x - 88), window.innerWidth - 184),
                top: Math.max(8, longPressMenu.y - 190),
              }}
            >
              <button
                type="button"
                onClick={handleSelectAll}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Select All</span>
              </button>
              <button
                type="button"
                onClick={handleCopySelection}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Copy</span>
              </button>
              <button
                type="button"
                onClick={handleCutSelection}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Cut</span>
              </button>
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Paste</span>
              </button>
              <div className={`h-[1px] my-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <button
                type="button"
                onClick={() => handleDuplicateLine(longPressMenu.lineIdx)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-indigo-300 flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100 text-indigo-600'
                }`}
              >
                <span>Duplicate Line</span>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteLine(longPressMenu.lineIdx)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-rose-300 flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-rose-950/40' : 'hover:bg-rose-50 text-rose-600'
                }`}
              >
                <span>Delete Line</span>
              </button>
            </div>
          </>
        )}
        {/* ================= END: Long-Press Contextual Action Menu ================= */}

        {/* ================= BEGIN: Sticky Bottom Keyboard & Accessories ================= */}
        <div
          className={`sticky bottom-0 z-30 w-full shrink-0 mt-auto pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t ${
            isDark ? 'bg-[#121622] border-slate-800/80' : 'bg-[#e8eaf0] border-slate-300'
          }`}
          data-purpose="sticky-bottom-keyboard-panel"
        >
          <CodingAccessoryToolbar
            onInsertToken={handleInsertToken}
            onInsertSymbol={handleInsertToken}
            customTokens={customTokens}
            onCursorLeft={() => moveCursorHorizontal(-1)}
            onCursorRight={() => moveCursorHorizontal(1)}
            onCursorUp={() => moveCursorVertical(-1)}
            onCursorDown={() => moveCursorVertical(1)}
            showCursorArrows={showCursorArrows}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            isDark={isDark}
          />

          {showVirtualKeyboard && (
            <MobileCodingKeyboard
              onInsertChar={handleInsertToken}
              onBackspace={handleSmartBackspace}
              onReturn={handleSmartReturn}
              onSpace={handleSpace}
              onCursorSwipeHorizontal={moveCursorHorizontal}
              onCursorSwipeVertical={moveCursorVerticalBy}
              isDark={isDark}
            />
          )}
        </div>
        {/* ================= END: Sticky Bottom Keyboard & Accessories ================= */}
      </div>
    );
  }
);

KotlinCodeEditor.displayName = 'KotlinCodeEditor';
