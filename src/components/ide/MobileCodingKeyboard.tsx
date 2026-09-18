import React, { useEffect, useRef, useState } from 'react';

interface MobileCodingKeyboardProps {
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onReturn: () => void;
  onSpace: () => void;
  // A swipe anywhere on the keypad moves the text cursor instead of typing:
  // left/right move it by character, up/down move it by line. A plain tap
  // on a key still does what that key normally does.
  onCursorSwipeHorizontal?: (deltaChars: number) => void;
  onCursorSwipeVertical?: (deltaLines: number) => void;
  className?: string;
  isDark?: boolean;
}

// Distance (px) that counts as one character (horizontal) or one line
// (vertical) of cursor movement, and the minimum movement before a press is
// treated as a swipe rather than a tap on whatever key it started on.
const SWIPE_STEP_X_PX = 14;
const SWIPE_STEP_Y_PX = 20;
const SWIPE_MOVE_THRESHOLD_PX = 10;

// Holding Backspace down repeats the delete, like a physical keyboard's key
// repeat: an initial pause (so a quick tap doesn't accidentally double-delete)
// then a fast, steady repeat until released.
const BACKSPACE_REPEAT_DELAY_MS = 450;
const BACKSPACE_REPEAT_INTERVAL_MS = 70;

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
  onCursorSwipeHorizontal,
  onCursorSwipeVertical,
  className = '',
  isDark = true,
}) => {
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);
  const [isSymbolsMode, setIsSymbolsMode] = useState<boolean>(false);

  const letterKeyClass = isDark
    ? 'bg-[#252c3d] hover:bg-[#2d354a] active:bg-indigo-600 text-slate-100'
    : 'bg-white hover:bg-slate-100 active:bg-indigo-100 text-slate-800 shadow-sm border border-slate-300';
  const secondaryKeyClass = (active: boolean) =>
    active
      ? 'bg-indigo-600 text-white'
      : isDark
      ? 'bg-[#191f2e] text-slate-300 hover:bg-[#22293d] active:bg-indigo-600'
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-indigo-100 border border-slate-300';
  const punctuationKeyClass = isDark
    ? 'bg-[#202737] hover:bg-[#283144] active:bg-indigo-600 text-slate-200'
    : 'bg-white hover:bg-slate-100 active:bg-indigo-100 text-slate-700 border border-slate-300';

  // Tracks an in-progress press anywhere on the keypad so a drag can move the
  // cursor while a plain tap still activates whatever key it started on.
  // Once a direction is committed (whichever axis crosses the threshold
  // first), the gesture is locked to that axis for its whole duration.
  const swipeStateRef = useRef<{
    startX: number;
    startY: number;
    lastStepX: number;
    lastStepY: number;
    axis: 'x' | 'y' | null;
  } | null>(null);
  // Set once a gesture actually became a swipe, so the synthetic click that
  // still fires on pointerup can be swallowed instead of activating a key.
  const wasSwipingRef = useRef<boolean>(false);

  const handleKeyboardPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    swipeStateRef.current = { startX: e.clientX, startY: e.clientY, lastStepX: e.clientX, lastStepY: e.clientY, axis: null };
  };

  const handleKeyboardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const state = swipeStateRef.current;
    if (!state) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (state.axis === null) {
      // Only commit to "this is a swipe" once movement on one axis clearly
      // dominates the other and exceeds the accidental-touch threshold.
      if (Math.abs(dx) > SWIPE_MOVE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
        state.axis = 'x';
      } else if (Math.abs(dy) > SWIPE_MOVE_THRESHOLD_PX && Math.abs(dy) > Math.abs(dx)) {
        state.axis = 'y';
      } else {
        return;
      }
    }

    if (state.axis === 'x') {
      const steps = Math.trunc((e.clientX - state.lastStepX) / SWIPE_STEP_X_PX);
      if (steps !== 0 && onCursorSwipeHorizontal) {
        triggerHaptic();
        onCursorSwipeHorizontal(steps);
        state.lastStepX += steps * SWIPE_STEP_X_PX;
      }
    } else {
      const steps = Math.trunc((e.clientY - state.lastStepY) / SWIPE_STEP_Y_PX);
      if (steps !== 0 && onCursorSwipeVertical) {
        triggerHaptic();
        onCursorSwipeVertical(steps);
        state.lastStepY += steps * SWIPE_STEP_Y_PX;
      }
    }
  };

  const handleKeyboardPointerUp = () => {
    wasSwipingRef.current = swipeStateRef.current?.axis !== null && swipeStateRef.current !== null;
    swipeStateRef.current = null;
  };

  const handleKeyboardPointerCancel = () => {
    swipeStateRef.current = null;
  };

  // Runs before any key's own onClick (capture phase). If the press that's
  // ending was actually a swipe, swallow the click so the key it happened to
  // end on doesn't also activate.
  const handleKeyboardClickCapture = (e: React.MouseEvent) => {
    if (wasSwipingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasSwipingRef.current = false;
    }
  };

  const triggerHaptic = () => {
    try {
      if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(8);
      }
    } catch {
      // Ignored if vibration is blocked
    }
  };

  // Press-and-hold repeat for Backspace.
  const backspaceDelayTimerRef = useRef<number | null>(null);
  const backspaceIntervalRef = useRef<number | null>(null);
  // Deleting updates cursorPosition/code, which recreates onBackspace
  // (handleSmartBackspace) every render with a fresh closure over that new
  // state. A setInterval callback keeps whatever closure was captured when
  // it was created, so calling the captured `onBackspace` directly on every
  // tick would keep re-deleting from the same stale starting point instead
  // of progressing -- each tick must go through this ref so it always calls
  // the *latest* onBackspace, not the one from when the hold began.
  const onBackspaceRef = useRef(onBackspace);
  useEffect(() => {
    onBackspaceRef.current = onBackspace;
  }, [onBackspace]);

  const clearBackspaceTimers = () => {
    if (backspaceDelayTimerRef.current !== null) {
      window.clearTimeout(backspaceDelayTimerRef.current);
      backspaceDelayTimerRef.current = null;
    }
    if (backspaceIntervalRef.current !== null) {
      window.clearInterval(backspaceIntervalRef.current);
      backspaceIntervalRef.current = null;
    }
  };

  // Clear any in-flight repeat if the component unmounts mid-hold (e.g. the
  // keyboard is hidden or the screen is navigated away from while held).
  useEffect(() => clearBackspaceTimers, []);

  const handleBackspacePointerDown = (e: React.PointerEvent) => {
    // Decouple from the footer's whole-keypad swipe tracking entirely --
    // holding Backspace should always repeat-delete, never get reinterpreted
    // as a cursor swipe from natural hand tremor during the hold.
    e.stopPropagation();
    triggerHaptic();
    onBackspaceRef.current();
    clearBackspaceTimers();
    backspaceDelayTimerRef.current = window.setTimeout(() => {
      backspaceIntervalRef.current = window.setInterval(() => {
        triggerHaptic();
        onBackspaceRef.current();
      }, BACKSPACE_REPEAT_INTERVAL_MS);
    }, BACKSPACE_REPEAT_DELAY_MS);
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
      className={`${isDark ? 'bg-[#121622] border-slate-800/90' : 'bg-[#f1f2f6] border-slate-300/70'} pt-1 pb-1.5 px-1 shrink-0 border-t select-none ${className}`}
      data-purpose="mobile-keyboard"
      style={{ touchAction: 'none' }}
      onPointerDown={handleKeyboardPointerDown}
      onPointerMove={handleKeyboardPointerMove}
      onPointerUp={handleKeyboardPointerUp}
      onPointerCancel={handleKeyboardPointerCancel}
      onClickCapture={handleKeyboardClickCapture}
    >
      {/* Key Row 1 */}
      <div className="flex justify-center gap-1 my-1">
        {currentLettersRow1.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeyClick(k)}
            className={`w-[34px] h-[41px] rounded-md text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${letterKeyClass}`}
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
            className={`w-[34px] h-[41px] rounded-md text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${letterKeyClass}`}
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
          className={`w-[44px] h-[41px] rounded-md transition-colors flex items-center justify-center shadow cursor-pointer active:scale-95 ${secondaryKeyClass(isShiftActive)}`}
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
            className={`w-[34px] h-[41px] rounded-md text-base font-normal shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${letterKeyClass}`}
          >
            {isShiftActive ? k.toUpperCase() : k}
          </button>
        ))}

        {/* Backspace Key -- holding it repeats the delete (see handleBackspacePointerDown) */}
        <button
          type="button"
          onPointerDown={handleBackspacePointerDown}
          onPointerUp={clearBackspaceTimers}
          onPointerLeave={clearBackspaceTimers}
          onPointerCancel={clearBackspaceTimers}
          className={`w-[44px] h-[41px] rounded-md text-sm font-medium shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${secondaryKeyClass(false)}`}
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
          className={`w-[44px] h-[41px] rounded-md text-xs font-semibold shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${secondaryKeyClass(isSymbolsMode)}`}
        >
          {isSymbolsMode ? 'ABC' : '?123'}
        </button>

        {/* Slash Operator */}
        <button
          type="button"
          onClick={() => handleKeyClick('/')}
          className={`w-[32px] h-[41px] rounded-md text-sm font-mono shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${punctuationKeyClass}`}
        >
          /
        </button>

        {/* Main Spacebar with CodeDo Brand Identity. A tap inserts a space;
            a swipe anywhere on the keypad (see footer handlers above) moves
            the text cursor instead. */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic();
            onSpace();
          }}
          className={`flex-1 h-[41px] rounded-md text-xs font-medium tracking-wide shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${
            isDark
              ? 'bg-[#252c3d] hover:bg-[#2e374c] active:bg-[#31394d] text-slate-400 hover:text-slate-200'
              : 'bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-500 hover:text-slate-700 border border-slate-300'
          }`}
        >
          CodeDo
        </button>

        {/* Dot Symbol */}
        <button
          type="button"
          onClick={() => handleKeyClick('.')}
          className={`w-[32px] h-[41px] rounded-md text-base font-bold shadow flex items-center justify-center cursor-pointer transition-colors active:scale-95 ${punctuationKeyClass}`}
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
    </footer>
  );
};
