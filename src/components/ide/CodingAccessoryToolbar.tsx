import React from 'react';

interface CodingAccessoryToolbarProps {
  onInsertToken: (token: string) => void;
  onInsertSymbol: (symbol: string) => void;
  customTokens?: string[];
  onCursorLeft: () => void;
  onCursorRight: () => void;
  onCursorUp: () => void;
  onCursorDown: () => void;
  // Swiping anywhere on the keypad already moves the cursor, so these
  // dedicated arrow buttons are opt-in (off by default) rather than always
  // taking up space in the toolbar.
  showCursorArrows?: boolean;
  // Undo/Redo pinned to the right edge, directly above the keyboard --
  // within easy thumb reach while typing, rather than up in a header.
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isDark?: boolean;
}

const DEFAULT_KEYWORDS = [
  {
    text: 'println',
    dark: 'text-amber-300 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 font-semibold',
    light: 'text-amber-800 border-amber-400/60 bg-amber-100 hover:bg-amber-200 font-semibold',
  },
  {
    text: 'val',
    dark: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40',
    light: 'text-purple-800 border-purple-400/60 bg-purple-100 hover:bg-purple-200',
  },
  {
    text: 'var',
    dark: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40',
    light: 'text-purple-800 border-purple-400/60 bg-purple-100 hover:bg-purple-200',
  },
  {
    text: 'fun',
    dark: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40',
    light: 'text-purple-800 border-purple-400/60 bg-purple-100 hover:bg-purple-200',
  },
  {
    text: 'return',
    dark: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-900/50',
    light: 'text-indigo-800 border-indigo-400/60 bg-indigo-100 hover:bg-indigo-200',
  },
  {
    text: 'if',
    dark: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40',
    light: 'text-sky-800 border-sky-400/60 bg-sky-100 hover:bg-sky-200',
  },
  {
    text: 'else',
    dark: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40',
    light: 'text-sky-800 border-sky-400/60 bg-sky-100 hover:bg-sky-200',
  },
  {
    text: 'when',
    dark: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40',
    light: 'text-sky-800 border-sky-400/60 bg-sky-100 hover:bg-sky-200',
  },
  {
    text: 'for',
    dark: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40',
    light: 'text-emerald-800 border-emerald-400/60 bg-emerald-100 hover:bg-emerald-200',
  },
  {
    text: 'in',
    dark: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40',
    light: 'text-emerald-800 border-emerald-400/60 bg-emerald-100 hover:bg-emerald-200',
  },
  {
    text: 'listOf',
    dark: 'text-teal-300 border-teal-500/40 bg-teal-950/30 hover:bg-teal-900/40',
    light: 'text-teal-800 border-teal-400/60 bg-teal-100 hover:bg-teal-200',
  },
  {
    text: 'mapOf',
    dark: 'text-teal-300 border-teal-500/40 bg-teal-950/30 hover:bg-teal-900/40',
    light: 'text-teal-800 border-teal-400/60 bg-teal-100 hover:bg-teal-200',
  },
  {
    text: 'Int',
    dark: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40',
    light: 'text-amber-800 border-amber-400/60 bg-amber-100 hover:bg-amber-200',
  },
  {
    text: 'String',
    dark: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40',
    light: 'text-amber-800 border-amber-400/60 bg-amber-100 hover:bg-amber-200',
  },
  {
    text: 'Boolean',
    dark: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40',
    light: 'text-amber-800 border-amber-400/60 bg-amber-100 hover:bg-amber-200',
  },
];

// '.' is deliberately not here -- it already has its own dedicated key on
// MobileCodingKeyboard's row 4, so repeating it here would be redundant.
// Every symbol appears exactly once, including '<'/'>' (shared by the plain
// comparison/generic usage and the compound '<='/'>=' operators below).
const PROGRAMMING_SYMBOLS = [
  { label: 'Tab', value: '    ', width: 'px-2.5' },
  { label: '(', value: '(', width: 'w-[30px]' },
  { label: ')', value: ')', width: 'w-[30px]' },
  { label: '{', value: '{', width: 'w-[30px]' },
  { label: '}', value: '}', width: 'w-[30px]' },
  { label: '[', value: '[', width: 'w-[30px]' },
  { label: ']', value: ']', width: 'w-[30px]' },
  { label: '=', value: '=', width: 'w-[30px]' },
  { label: '"', value: '"', width: 'w-[30px]' },
  { label: ':', value: ':', width: 'w-[30px]' },
  { label: ',', value: ',', width: 'w-[30px]' },
  { label: '+', value: '+', width: 'w-[30px]' },
  { label: '-', value: '-', width: 'w-[30px]' },
  { label: '*', value: '*', width: 'w-[30px]', special: true },
  // Numeric literal separators (100_000) and SCREAMING_SNAKE_CASE constants.
  { label: '_', value: '_', width: 'w-[30px]' },
  // Comparison operators (<, >) and generics (List<Int>) — otherwise
  // untypeable anywhere in the app; see World 2 & World 12 curriculum.
  { label: '<', value: '<', width: 'w-[30px]' },
  { label: '>', value: '>', width: 'w-[30px]' },
  { label: ';', value: ';', width: 'w-[30px]' },
  // Logical OR (||) — '&&' was already reachable via the '&' key, but '||'
  // had no way to be typed at all without this.
  { label: '|', value: '|', width: 'w-[30px]' },
  // String escape sequences (\n, \", \\, \$).
  { label: '\\', value: '\\', width: 'w-[30px]' },
  { label: '<=', value: '<=', width: 'w-[34px]' },
  { label: '>=', value: '>=', width: 'w-[34px]' },
];

export const CodingAccessoryToolbar: React.FC<CodingAccessoryToolbarProps> = ({
  onInsertToken,
  onInsertSymbol,
  customTokens = [],
  onCursorLeft,
  onCursorRight,
  onCursorUp,
  onCursorDown,
  showCursorArrows = false,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isDark = true,
}) => {
  const squareButtonClass = isDark
    ? 'bg-[#1f2638] hover:bg-[#28324a] active:bg-indigo-600 text-slate-200 border-slate-700/50'
    : 'bg-white hover:bg-slate-100 active:bg-indigo-100 text-slate-700 border-slate-300';

  const disabledButtonClass = isDark ? 'opacity-30 pointer-events-none' : 'opacity-40 pointer-events-none';

  return (
    <nav
      aria-label="Code Input Quick Bar"
      className={`border-t px-2 py-1 shrink-0 flex flex-col gap-1 z-20 select-none ${
        isDark ? 'bg-[#121623] border-slate-800/90' : 'bg-[#eef0f5] border-slate-300/70'
      }`}
    >
      {/* Row 1: Contextual Kotlin suggestions row */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5">
        {/* Custom lesson tokens shown first with high priority styling */}
        {customTokens.map((token) => (
          <button
            key={`custom-${token}`}
            type="button"
            onClick={() => onInsertToken(token)}
            className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
              isDark
                ? 'bg-indigo-900/60 text-indigo-200 border-indigo-400/50 hover:bg-indigo-800/80'
                : 'bg-indigo-100 text-indigo-800 border-indigo-400/60 hover:bg-indigo-200'
            }`}
          >
            {token}
          </button>
        ))}

        {DEFAULT_KEYWORDS.filter((item) => !customTokens.includes(item.text)).map((item) => (
          <button
            key={item.text}
            type="button"
            onClick={() => onInsertToken(item.text)}
            className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border shrink-0 active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
              isDark ? item.dark : item.light
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>

      {/* Row 2: optional cursor-navigation cluster, scrollable programming
          symbols, and a right-pinned Undo/Redo pair (handy above the keyboard) */}
      <div className="flex items-center gap-1 py-0.5 px-0.5">
        {/* Cursor arrow controls: opt-in, since a keypad swipe already moves
            the cursor in all 4 directions (see the toggle in the overflow menu) */}
        {showCursorArrows && (
          <div
            className={`flex items-center gap-0.5 shrink-0 border-r pr-1 mr-0.5 ${
              isDark ? 'border-slate-700/50' : 'border-slate-300'
            }`}
          >
            <button
              type="button"
              aria-label="Move cursor left"
              onClick={onCursorLeft}
              className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass}`}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Move cursor up"
              onClick={onCursorUp}
              className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass}`}
            >
              ↑
            </button>
            <button
              type="button"
              aria-label="Move cursor down"
              onClick={onCursorDown}
              className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass}`}
            >
              ↓
            </button>
            <button
              type="button"
              aria-label="Move cursor right"
              onClick={onCursorRight}
              className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass}`}
            >
              →
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
          {PROGRAMMING_SYMBOLS.map((sym, idx) => (
            <button
              key={`${sym.label}-${idx}`}
              type="button"
              onClick={() => onInsertSymbol(sym.value)}
              className={`font-mono text-[12px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${sym.width} ${
                sym.special ? (isDark ? 'text-indigo-300 font-bold' : 'text-indigo-600 font-bold') : ''
              } ${squareButtonClass}`}
            >
              {sym.label}
            </button>
          ))}
        </div>

        {/* Undo / Redo: pinned to the right edge, directly above the keyboard */}
        <div className={`flex items-center gap-0.5 shrink-0 border-l pl-1 ml-0.5 ${isDark ? 'border-slate-700/50' : 'border-slate-300'}`}>
          <button
            type="button"
            aria-label="Undo"
            disabled={!canUndo}
            onClick={onUndo}
            className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass} ${
              !canUndo ? disabledButtonClass : ''
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
            disabled={!canRedo}
            onClick={onRedo}
            className={`w-[26px] h-[28px] rounded-md border shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${squareButtonClass} ${
              !canRedo ? disabledButtonClass : ''
            }`}
            title="Redo (Ctrl+Y)"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M15 14l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 20v-7a4 4 0 014-4h12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
