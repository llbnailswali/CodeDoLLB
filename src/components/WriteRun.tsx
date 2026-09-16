import React, { useState, useEffect, useRef } from 'react';
import { Stage4WriteRunData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { runKotlinCode, KotlinExecutionResult } from '../utils/kotlinRunner';
import { renderHighlightedLine } from '../utils/ideSyntaxHighlighter';
import { CodingAccessoryToolbar } from './ide/CodingAccessoryToolbar';
import { MobileCodingKeyboard } from './ide/MobileCodingKeyboard';

interface WriteRunStageProps {
  data: Stage4WriteRunData;
  topicTitle?: string;
  isDark: boolean;
  revealStep?: number;
  setRevealStep?: React.Dispatch<React.SetStateAction<number>>;
  userCode: string;
  setUserCode: (code: string) => void;
  hasRunCode: boolean;
  setHasRunCode: (hasRun: boolean) => void;
  actualOutput: string;
  setActualOutput?: (output: string) => void;
  onRunCode?: () => void;
  onContinue: () => void;
  onBack?: () => void;
  nextStageLabel?: string;
}

export const WriteRun: React.FC<WriteRunStageProps> = ({
  data,
  topicTitle = 'Kotlin Basics',
  userCode,
  setUserCode,
  setHasRunCode,
  setActualOutput,
  onRunCode,
  onContinue,
  onBack,
}) => {
  const [executionResult, setExecutionResult] = useState<KotlinExecutionResult | null>(null);
  const [showOutputPanel, setShowOutputPanel] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState<boolean>(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(true);
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<string[]>([userCode]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Cursor and Selection tracking
  const [cursorPosition, setCursorPosition] = useState<number>(() => {
    const idx = userCode.indexOf('return');
    return idx !== -1 ? idx + 'return'.length : userCode.length;
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

  // Sync initial code if userCode changes externally
  useEffect(() => {
    if (history[historyIndex] !== userCode) {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), userCode]);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [userCode]);

  const updateCodeWithHistory = (newCode: string, newCursorPos?: number) => {
    setUserCode(newCode);
    setExecutionResult(null);
    setShowOutputPanel(false);
    setHistory((prev) => {
      const next = [...prev.slice(0, historyIndex + 1), newCode];
      return next.slice(-40);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 39));

    if (newCursorPos !== undefined) {
      setCursorPosition(newCursorPos);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
          textareaRef.current.focus();
        }
      }, 10);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      soundFX.playClick();
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      const prevCode = history[nextIdx];
      setUserCode(prevCode);
      setCursorPosition(prevCode.length);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      soundFX.playClick();
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const nextCode = history[nextIdx];
      setUserCode(nextCode);
      setCursorPosition(nextCode.length);
    }
  };

  // Insert token or text with auto-closing brackets support
  const handleInsertToken = (textToInsert: string) => {
    soundFX.playClick();
    const textarea = textareaRef.current;
    const start = textarea ? textarea.selectionStart : cursorPosition;
    const end = textarea ? textarea.selectionEnd : cursorPosition;

    let insert = textToInsert;
    let cursorOffset = textToInsert.length;

    // Auto-closing brackets
    if (textToInsert === '{') {
      insert = '{}';
      cursorOffset = 1;
    } else if (textToInsert === '(') {
      insert = '()';
      cursorOffset = 1;
    } else if (textToInsert === '[') {
      insert = '[]';
      cursorOffset = 1;
    } else if (textToInsert === '"') {
      insert = '""';
      cursorOffset = 1;
    }

    const before = userCode.slice(0, start);
    const after = userCode.slice(end);
    const newCode = before + insert + after;
    const newPos = start + cursorOffset;

    updateCodeWithHistory(newCode, newPos);
  };

  // Smart Backspace: deletes matching bracket pair if empty
  const handleSmartBackspace = () => {
    soundFX.playClick();
    const textarea = textareaRef.current;
    const start = textarea ? textarea.selectionStart : cursorPosition;
    const end = textarea ? textarea.selectionEnd : cursorPosition;

    if (start === end && start > 0) {
      const charBefore = userCode[start - 1];
      const charAfter = userCode[start];

      const isPair =
        (charBefore === '{' && charAfter === '}') ||
        (charBefore === '(' && charAfter === ')') ||
        (charBefore === '[' && charAfter === ']') ||
        (charBefore === '"' && charAfter === '"');

      if (isPair) {
        const before = userCode.slice(0, start - 1);
        const after = userCode.slice(start + 1);
        updateCodeWithHistory(before + after, start - 1);
        return;
      }

      const before = userCode.slice(0, start - 1);
      const after = userCode.slice(start);
      updateCodeWithHistory(before + after, start - 1);
    } else if (start !== end) {
      const before = userCode.slice(0, start);
      const after = userCode.slice(end);
      updateCodeWithHistory(before + after, start);
    }
  };

  // Smart Indentation on Enter / Return
  const handleSmartReturn = () => {
    soundFX.playClick();
    const textarea = textareaRef.current;
    const pos = textarea ? textarea.selectionStart : cursorPosition;

    const textBefore = userCode.slice(0, pos);
    const textAfter = userCode.slice(pos);
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
  };

  const handleSpace = () => {
    soundFX.playClick();
    handleInsertToken(' ');
  };

  // Execute Kotlin Code
  const handleExecute = async () => {
    soundFX.playClick();

    // Prevent success if the user hasn't edited anything yet
    const trimmedUser = userCode.trim().replace(/\r\n/g, '\n');
    const trimmedInitial = (data.initialCode || '').trim().replace(/\r\n/g, '\n');
    if (trimmedUser === trimmedInitial) {
      soundFX.playError();
      const uneditedResult: KotlinExecutionResult = {
        success: false,
        output: '',
        logs: [],
        error: {
          message: 'Code has not been edited yet. Please write the required logic before running.',
          line: 1,
          type: 'runtime_error',
        },
        executionTimeMs: 0,
        exitCode: 1,
      };
      setExecutionResult(uneditedResult);
      setShowOutputPanel(true);
      setHasRunCode(true);
      return;
    }

    const res = await runKotlinCode(userCode, data.expectedOutput, data.testCase);
    setExecutionResult(res);
    setShowOutputPanel(true);
    setHasRunCode(true);

    if (setActualOutput) {
      setActualOutput(res.output);
    }
    if (onRunCode) {
      onRunCode();
    }

    if (res.success) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
  };

  // Autocomplete suggestion handler
  const handleAcceptSuggestion = () => {
    soundFX.playSuccess();
    if (data.solutionCode) {
      updateCodeWithHistory(data.solutionCode, data.solutionCode.length);
    } else {
      handleInsertToken('return a * b');
    }
  };

  // Physical Keyboard listener
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!userCode.includes('return a * b')) {
        handleAcceptSuggestion();
      } else {
        handleInsertToken('    ');
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      handleRedo();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSmartReturn();
    } else if (e.key === 'Backspace') {
      // Allow default or smart backspace
    }
  };

  // Calculate lines and active line index
  const lines = userCode.split('\n');
  const displayLineCount = Math.max(14, lines.length + 1);

  // Compute line index for cursor
  let currentLineIndex = 7; // Default to line 8 (0-indexed 7) matching screenshot
  let charCount = 0;
  for (let i = 0; i < lines.length; i++) {
    charCount += lines[i].length + 1;
    if (cursorPosition < charCount) {
      currentLineIndex = i;
      break;
    }
  }

  return (
    <main className="w-full max-w-[412px] h-full max-h-[100dvh] bg-[#090d16] flex flex-col relative overflow-hidden shadow-2xl border border-slate-800/80 md:rounded-[36px] text-slate-100 select-none">
      {/* ================= BEGIN: Minimal Top Toolbar ================= */}
      <header className="w-full bg-[#0d121d] border-b border-ide-border px-3 h-10 flex items-center justify-between shrink-0 z-20 select-none">
        {/* Left: Back button & Problem Details Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Go Back"
            onClick={onBack || onContinue}
            className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center text-slate-300 active:scale-95 transition-transform cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Short & meaningful Task Button (no doc icon) */}
          <button
            type="button"
            id="task-trigger-btn"
            onClick={() => {
              soundFX.playClick();
              setShowTaskModal((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
              showTaskModal
                ? 'bg-indigo-600/25 border-indigo-500/70 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                : 'bg-[#131826] hover:bg-[#1c2438] border-slate-700/80 text-slate-200'
            }`}
            aria-label="Toggle Task"
            title="Click to view Task"
          >
            <span className="font-semibold tracking-tight">Task</span>
            <svg
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                showTaskModal ? 'rotate-180 text-indigo-300' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right: Undo / Redo, Moved Run button, and Overflow Menu */}
        <div className="flex items-center gap-1.5 relative">
          {/* Undo / Redo controls */}
          <div className="flex items-center gap-0.5 text-slate-400 mr-0.5">
            <button
              type="button"
              aria-label="Undo"
              disabled={historyIndex <= 0}
              onClick={handleUndo}
              className={`w-7 h-7 rounded-md flex items-center justify-center hover:text-slate-200 hover:bg-[#1e2538] active:scale-95 transition-transform cursor-pointer ${
                historyIndex <= 0 ? 'opacity-30 pointer-events-none' : ''
              }`}
              title="Undo (Ctrl+Z)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 20v-7a4 4 0 00-4-4H4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Redo"
              disabled={historyIndex >= history.length - 1}
              onClick={handleRedo}
              className={`w-7 h-7 rounded-md flex items-center justify-center hover:text-slate-200 hover:bg-[#1e2538] active:scale-95 transition-transform cursor-pointer ${
                historyIndex >= history.length - 1 ? 'opacity-30 pointer-events-none' : ''
              }`}
              title="Redo (Ctrl+Y)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M15 14l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20v-7a4 4 0 014-4h12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Primary Run Action moved to Toolbar */}
          <button
            type="button"
            aria-label="Execute code"
            onClick={handleExecute}
            className="h-7 px-3.5 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-xs flex items-center gap-1.5 shadow-[0_0_14px_rgba(99,102,241,0.45)] active:scale-95 transition-all cursor-pointer"
            id="run-btn"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="tracking-wide">Run</span>
          </button>

          <button
            type="button"
            aria-label="More options"
            onClick={() => setShowOverflowMenu((prev) => !prev)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.75" />
              <circle cx="12" cy="12" r="1.75" />
              <circle cx="12" cy="19" r="1.75" />
            </svg>
          </button>

          {/* Overflow Dropdown */}
          {showOverflowMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#141926] border border-slate-700/80 shadow-2xl p-1.5 z-50 text-xs animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  handleExecute();
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-indigo-400 fill-current" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Run (Ctrl+Enter)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  setShowTaskModal(true);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-indigo-400">help_outline</span>
                <span>View Task</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  setShowVirtualKeyboard((prev) => !prev);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-slate-400">keyboard</span>
                <span>{showVirtualKeyboard ? 'Hide' : 'Show'} Keyboard</span>
              </button>

              {data.solutionCode && (
                <button
                  type="button"
                  onClick={() => {
                    setShowOverflowMenu(false);
                    setShowSolutionModal(true);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-indigo-300 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px] text-indigo-400">visibility</span>
                  <span>View Solution</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  handleAcceptSuggestion();
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-amber-300 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-amber-400">auto_fix_high</span>
                <span>Auto-Complete</span>
              </button>

              <div className="h-[1px] bg-slate-800 my-1" />

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  soundFX.playClick();
                  updateCodeWithHistory(data.initialCode, data.initialCode.length);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-300 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                <span>Reset to Starter</span>
              </button>
            </div>
          )}
        </div>
      </header>
      {/* ================= END: Minimal Top Toolbar ================= */}

      {/* ================= BEGIN: Dominant Code Editor Surface ================= */}
      <section
        className="flex-1 flex flex-col min-h-0 bg-[#0a0d16] relative overflow-hidden"
        data-purpose="dominant-ide-surface"
      >
        {/* Code Canvas Surface: dominant, clear, comfortable font */}
        <div
          ref={editorScrollRef}
          onClick={() => textareaRef.current?.focus()}
          className="flex-1 overflow-y-auto overflow-x-auto relative flex font-mono text-[13.5px] leading-[24px] bg-[#0b0f19] cursor-text"
        >
          {/* Gutter: Ultra-thin line numbers to maximize horizontal space for code */}
          <div className="w-auto min-w-[14px] py-2 flex flex-col items-center px-0.5 text-slate-600 select-none bg-[#090d15]/90 border-r border-ide-border shrink-0 text-[10px] font-mono tracking-tighter">
            {Array.from({ length: displayLineCount }).map((_, idx) => {
              const lineNum = idx + 1;
              const isActive = idx === currentLineIndex;
              return (
                <span
                  key={lineNum}
                  className={`h-[24px] leading-[24px] text-center w-full block transition-colors ${
                    isActive ? 'text-indigo-400 font-bold' : 'text-slate-600'
                  }`}
                >
                  {lineNum}
                </span>
              );
            })}
          </div>

          {/* Code Text Content */}
          <div className="flex-1 py-2 pl-1.5 pr-2 whitespace-pre relative font-medium min-w-max">
            {/* Hidden sync textarea for native typing & cursor gestures */}
            <textarea
              ref={textareaRef}
              wrap="off"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              value={userCode}
              onChange={(e) => {
                const val = e.target.value;
                setUserCode(val);
                setCursorPosition(e.target.selectionStart);
                setExecutionResult(null);
                setShowOutputPanel(false);
              }}
              onSelect={(e) => {
                const target = e.target as HTMLTextAreaElement;
                setCursorPosition(target.selectionStart);
              }}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 opacity-0 w-full h-full resize-none p-0 cursor-text font-mono text-[13.5px] leading-[24px] z-10"
            />

            {/* Syntax Highlighted Lines */}
            {lines.map((lineStr, lineIdx) => {
              const isActive = lineIdx === currentLineIndex;

              return (
                <div
                  key={lineIdx}
                  className={`leading-[24px] transition-colors relative ${
                    isActive ? '-mx-1.5 px-1.5 bg-[#13192c] rounded-xs' : ''
                  }`}
                >
                  {renderHighlightedLine(lineStr || ' ', `line-${lineIdx}`)}

                  {/* Clear Blinking Cursor */}
                  {isActive && (
                    <span className="inline-block w-[2px] h-[17px] bg-indigo-400 align-middle ml-0.5 blinking-cursor shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= END: Dominant Code Editor Surface ================= */}

      {/* ================= BEGIN: Code Helper Keywords and Symbols ================= */}
      <CodingAccessoryToolbar
        onInsertToken={handleInsertToken}
        onInsertSymbol={handleInsertToken}
        customTokens={['a', 'b', 'a * b']}
      />
      {/* ================= END: Code Helper Keywords and Symbols ================= */}

      {/* ================= BEGIN: Mobile Coding Keyboard ================= */}
      {showVirtualKeyboard && (
        <MobileCodingKeyboard
          onInsertChar={handleInsertToken}
          onBackspace={handleSmartBackspace}
          onReturn={handleSmartReturn}
          onSpace={handleSpace}
        />
      )}
      {/* ================= END: Mobile Coding Keyboard ================= */}

      {/* ================= BEGIN: Task Details Modal ================= */}
      {showTaskModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setShowTaskModal(false)}
        >
          <div 
            className="w-full max-w-[372px] mx-auto rounded-2xl border border-slate-700/80 bg-[#121622] p-5 text-slate-100 shadow-2xl animate-scaleUp max-h-[82vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            id="task-details-modal"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-indigo-950/90 text-indigo-300 font-mono text-[10.5px] font-bold border border-indigo-700/50">
                  TASK
                </span>
                <span className="text-slate-500 text-xs">·</span>
                <span className="font-mono text-xs text-slate-400 font-medium">
                  {data.fileName || 'SplitLoot.kt'}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close task details"
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="my-3.5">
              <h3 className="font-bold text-base text-slate-100 mb-1.5">
                {data.title || 'Multiply Two Numbers'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Specifications Card */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono my-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">
                Signature & Types
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Function:</span>
                <span className="text-indigo-300 font-semibold">{data.requirements.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Parameters:</span>
                <span className="text-amber-300">{data.requirements.params}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Returns:</span>
                <span className="text-emerald-300">{data.requirements.returns}</span>
              </div>
            </div>

            {/* Sample Input / Output */}
            {(data.sampleInput || data.expectedOutput) && (
              <div className="p-3.5 rounded-xl bg-[#090d16] border border-slate-800 text-xs font-mono my-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-sans">
                  Example Case
                </div>
                {data.sampleInput && (
                  <div className="flex justify-between items-center text-slate-400 mb-1">
                    <span>Call:</span>
                    <span className="text-sky-300">{data.sampleInput}</span>
                  </div>
                )}
                {data.expectedOutput && (
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Output:</span>
                    <span className="text-emerald-400 font-bold">{data.expectedOutput}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
              >
                <span>Back to Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ================= END: Task Details Modal ================= */}

      {/* ================= BEGIN: Run Result Dialog ================= */}
      {showOutputPanel && executionResult && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setShowOutputPanel(false)}
        >
          <div
            className="w-full max-w-[372px] mx-auto rounded-2xl border border-slate-700/80 bg-[#121622] p-5 text-slate-100 shadow-2xl animate-scaleUp max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            id="run-result-modal"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {executionResult.success ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 font-mono text-[10.5px] font-bold border border-emerald-700/50 flex items-center gap-1">
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>TEST PASSED</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-rose-950/90 text-rose-300 font-mono text-[10.5px] font-bold border border-rose-700/50 flex items-center gap-1">
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>RUN FAILED</span>
                  </span>
                )}
                <span className="text-slate-500 text-xs">·</span>
                <span className="font-mono text-xs text-slate-400 font-medium">
                  {executionResult.executionTimeMs || 12}ms
                </span>
              </div>

              <button
                type="button"
                aria-label="Close run result"
                onClick={() => setShowOutputPanel(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="my-3.5">
              {executionResult.success ? (
                <>
                  <h3 className="font-bold text-base text-slate-100 mb-1 flex items-center gap-1.5">
                    <span>All Tests Passed!</span>
                    <span className="text-emerald-400">🎉</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your code compiled and executed smoothly with the expected output.
                  </p>

                  <div className="my-3.5 p-3.5 rounded-xl bg-[#090d16] border border-emerald-500/30 font-mono text-xs space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">
                      Output Verification
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">Output:</span>
                      <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                    {data.expectedOutput && (
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Expected:</span>
                        <span className="text-slate-300 font-medium">{data.expectedOutput}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold text-base text-slate-100 mb-1">
                    Execution Error
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {executionResult.error?.message || 'The code produced an unexpected output or failed to compile.'}
                  </p>

                  <div className="my-3.5 p-3.5 rounded-xl bg-[#090d16] border border-rose-500/30 font-mono text-xs space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">
                      Output Details
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">Your Output:</span>
                      <span className="text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30">
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                    {data.expectedOutput && (
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Expected:</span>
                        <span className="text-emerald-400 font-medium">{data.expectedOutput}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowOutputPanel(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium active:scale-95 transition-all cursor-pointer"
              >
                {executionResult.success ? 'Keep Editing' : 'Back to Code'}
              </button>

              {executionResult.success ? (
                <button
                  type="button"
                  id="run-dialog-continue-btn"
                  onClick={() => {
                    soundFX.playSuccess();
                    setShowOutputPanel(false);
                    onContinue();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(99,102,241,0.5)] transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                data.solutionCode && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowOutputPanel(false);
                      setShowSolutionModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 text-xs font-medium active:scale-95 transition-all cursor-pointer"
                  >
                    View Solution
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {/* ================= END: Run Result Dialog ================= */}

      {/* Reference Solution Modal (accessible via overflow menu) */}
      {showSolutionModal && data.solutionCode && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700/80 bg-[#121622] p-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100">Reference Solution</h3>
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="my-3 p-3 rounded-xl bg-[#090d16] border border-slate-800 font-mono text-xs text-indigo-300 whitespace-pre overflow-x-auto">
              {data.solutionCode}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSolutionModal(false);
                  handleAcceptSuggestion();
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
              >
                Apply Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
