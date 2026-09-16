import React, { useState } from 'react';

interface MobileCodingKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onReturn: () => void;
  onSpace: () => void;
  className?: string;
}

const LETTERS_ROW_1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const LETTERS_ROW_2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const LETTERS_ROW_3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

const SYMBOLS_ROW_1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const SYMBOLS_ROW_2 = ['@', '#', '$', '%', '&', '-', '+', '(', ')', '"'];
const SYMBOLS_ROW_3 = ['*', '/', ':', ';', '!', '?', '\'', '`'];

export const MobileCodingKeyboard: React.FC<MobileCodingKeyboardProps> = ({
  onInsertChar,
  onBackspace,
  onReturn,
  onSpace,
  className = '',
}) => {
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);
  const [isSymbolsMode, setIsSymbolsMode] = useState<boolean>(false);

  const triggerHaptic = () => {
    try {
      if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(8);
      }
    } catch {
      // Ignored if vibration is blocked
    }
  };

  const handleKeyClick = (char: string) => {
    triggerHaptic();
    const finalChar = isShiftActive ? char.toUpperCase() : char;
    onInsertChar(finalChar);
    // If shift was active for a single capital letter, turn it off like standard keyboards
    if (isShiftActive) {
      setIsShiftActive(false);
    }
  };

  const currentLettersRow1 = isSymbolsMode ? SYMBOLS_ROW_1 : LETTERS_ROW_1;
  const currentLettersRow2 = isSymbolsMode ? SYMBOLS_ROW_2 : LETTERS_ROW_2;
  const currentLettersRow3 = isSymbolsMode ? SYMBOLS_ROW_3 : LETTERS_ROW_3;

  return (
    <footer
      className={`bg-[#121622] pt-1.5 pb-4 px-1 shrink-0 border-t border-slate-800/90 select-none ${className}`}
      data-purpose="mobile-keyboard"
    >
      {/* Key Row 1 */}
      <div className="flex justify-center gap-1 my-1">
        {currentLettersRow1.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeyClick(k)}
            className="w-[34px] h-[41px] rounded-md bg-[#252c3d] hover:bg-[#2d354a] active:bg-indigo-600 text-slate-100 text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          >
            {isShiftActive ? k.toUpperCase() : k}
          </button>
        ))}
      </div>

      {/* Key Row 2 */}
      <div className="flex justify-center gap-1 my-1">
        {currentLettersRow2.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeyClick(k)}
            className="w-[34px] h-[41px] rounded-md bg-[#252c3d] hover:bg-[#2d354a] active:bg-indigo-600 text-slate-100 text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          >
            {isShiftActive ? k.toUpperCase() : k}
          </button>
        ))}
      </div>

      {/* Key Row 3: Shift + letters + Backspace */}
      <div className="flex justify-center gap-1 my-1">
        {/* Shift Key */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            setIsShiftActive((prev) => !prev);
          }}
          className={`w-[44px] h-[41px] rounded-md transition-colors flex items-center justify-center shadow cursor-pointer active:scale-95 ${
            isShiftActive
              ? 'bg-indigo-600 text-white'
              : 'bg-[#191f2e] text-slate-300 hover:bg-[#22293d] active:bg-indigo-600'
          }`}
          aria-label={isShiftActive ? 'Shift Active' : 'Shift Inactive'}
        >
          <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {currentLettersRow3.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeyClick(k)}
            className="w-[34px] h-[41px] rounded-md bg-[#252c3d] hover:bg-[#2d354a] active:bg-indigo-600 text-slate-100 text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          >
            {isShiftActive ? k.toUpperCase() : k}
          </button>
        ))}

        {/* Backspace Key */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            onBackspace();
          }}
          className="w-[44px] h-[41px] rounded-md bg-[#191f2e] hover:bg-[#22293d] active:bg-indigo-600 text-slate-300 text-sm font-medium shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          aria-label="Backspace"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
          </svg>
        </button>
      </div>

      {/* Key Row 4: Symbols toggle, Slash, Spacebar ("CodeDo"), Dot, and Return Key */}
      <div className="flex justify-center gap-1 my-1 px-1">
        {/* Number/Symbols Mode Toggle */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            setIsSymbolsMode((prev) => !prev);
          }}
          className={`w-[44px] h-[41px] rounded-md text-xs font-semibold shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${
            isSymbolsMode
              ? 'bg-indigo-600 text-white'
              : 'bg-[#191f2e] text-slate-300 hover:bg-[#22293d] active:bg-indigo-600'
          }`}
        >
          {isSymbolsMode ? 'ABC' : '?123'}
        </button>

        {/* Slash Operator */}
        <button
          type="button"
          onClick={() => handleKeyClick('/')}
          className="w-[32px] h-[41px] rounded-md bg-[#202737] hover:bg-[#283144] active:bg-indigo-600 text-slate-200 text-sm font-mono shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
        >
          /
        </button>

        {/* Main Spacebar with CodeDo Brand Identity */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            onSpace();
          }}
          className="flex-1 h-[41px] rounded-md bg-[#252c3d] hover:bg-[#2e374c] active:bg-[#31394d] text-slate-400 hover:text-slate-200 text-xs font-medium tracking-wide shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
        >
          CodeDo
        </button>

        {/* Dot Symbol */}
        <button
          type="button"
          onClick={() => handleKeyClick('.')}
          className="w-[32px] h-[41px] rounded-md bg-[#202737] hover:bg-[#283144] active:bg-indigo-600 text-slate-200 text-base font-bold shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95"
        >
          .
        </button>

        {/* High-contrast Return Button */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            onReturn();
          }}
          className="w-[64px] h-[41px] rounded-md bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-xs shadow flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
        >
          <span>Return</span>
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Android Home Indicator Pill Bar */}
      <div className="w-32 h-1 bg-slate-600/50 rounded-full mx-auto mt-2.5" />
    </footer>
  );
};
