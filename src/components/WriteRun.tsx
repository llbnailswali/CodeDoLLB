import React, { useRef, useState, useEffect } from 'react';
import { Stage4WriteRunData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { runKotlinCode, KotlinExecutionResult } from '../utils/kotlinRunner';
import { KotlinCodeEditor, KotlinCodeEditorHandle } from './ide/KotlinCodeEditor';

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
  isDark,
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

  // Preparing state with progress animation before auto-opening Task dialog
  const [isPreparing, setIsPreparing] = useState<boolean>(true);
  const [prepProgress, setPrepProgress] = useState<number>(15);
  const prepTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Auto-open Task dialog with 1 second delay
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [modalAnimState, setModalAnimState] = useState<'open' | 'closing' | 'opening' | 'closed'>('closed');
  const [heroStyle, setHeroStyle] = useState<React.CSSProperties>({});
  const [isTaskButtonCatching, setIsTaskButtonCatching] = useState<boolean>(false);

  const [cursorArrowsVisible, setCursorArrowsVisible] = useState<boolean>(false);
  const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState<boolean>(false);

  const editorRef = useRef<KotlinCodeEditorHandle>(null);
  const taskButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute Hero transition coordinates between center dialog and Top Task button
  const computeHeroStyle = (forOpening = false): React.CSSProperties => {
    const btnEl = taskButtonRef.current;
    const modalEl = modalRef.current;

    let btnCenterX = 70;
    let btnCenterY = 40;
    let btnWidth = 74;
    let btnHeight = 28;

    if (btnEl) {
      const bRect = btnEl.getBoundingClientRect();
      btnCenterX = bRect.left + bRect.width / 2;
      btnCenterY = bRect.top + bRect.height / 2;
      btnWidth = bRect.width;
      btnHeight = bRect.height;
    }

    let modalCenterX = window.innerWidth / 2;
    let modalCenterY = window.innerHeight / 2;
    let modalWidth = Math.min(372, window.innerWidth - 32);
    let modalHeight = Math.min(window.innerHeight * 0.82, 520);

    if (modalEl && !forOpening) {
      const mRect = modalEl.getBoundingClientRect();
      if (mRect.width > 50 && mRect.height > 50) {
        modalCenterX = mRect.left + mRect.width / 2;
        modalCenterY = mRect.top + mRect.height / 2;
        modalWidth = mRect.width;
        modalHeight = mRect.height;
      }
    }

    const dx = btnCenterX - modalCenterX;
    const dy = btnCenterY - modalCenterY;
    const scaleX = Math.max(0.06, btnWidth / modalWidth);
    const scaleY = Math.max(0.04, btnHeight / modalHeight);

    return {
      '--hero-dx': `${dx.toFixed(1)}px`,
      '--hero-dy': `${dy.toFixed(1)}px`,
      '--hero-scale-x': `${scaleX.toFixed(3)}`,
      '--hero-scale-y': `${scaleY.toFixed(3)}`,
    } as React.CSSProperties;
  };

  // Auto-open Task dialog with a preparation progress animation ("Preparing Write & Run Exercise")
  useEffect(() => {
    prepTimersRef.current.forEach(clearTimeout);
    prepTimersRef.current = [];
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);

    setIsPreparing(true);
    setPrepProgress(12);

    const t1 = setTimeout(() => setPrepProgress(38), 450);
    const t2 = setTimeout(() => setPrepProgress(65), 1050);
    const t3 = setTimeout(() => setPrepProgress(88), 1750);
    const t4 = setTimeout(() => setPrepProgress(100), 2250);

    autoOpenTimerRef.current = setTimeout(() => {
      setIsPreparing(false);
      const style = computeHeroStyle(true);
      setHeroStyle(style);
      setShowTaskModal(true);
      setModalAnimState('opening');

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setModalAnimState('open');
      }, 360);
    }, 2550);

    prepTimersRef.current.push(t1, t2, t3, t4, autoOpenTimerRef.current);

    return () => {
      prepTimersRef.current.forEach(clearTimeout);
      prepTimersRef.current = [];
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    };
  }, [data]);

  // Clean up animation timeouts on unmount
  useEffect(() => {
    return () => {
      prepTimersRef.current.forEach(clearTimeout);
      prepTimersRef.current = [];
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, []);

  // Hero scale-down into the Top Task button so user sees where it went
  const handleCloseTaskModal = () => {
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    if (modalAnimState === 'closing') return;
    soundFX.playClick();

    const style = computeHeroStyle(false);
    setHeroStyle(style);
    setModalAnimState('closing');

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setShowTaskModal(false);
      setModalAnimState('closed');

      // Trigger the Task button catch bounce and glowing ring
      setIsTaskButtonCatching(true);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = setTimeout(() => {
        setIsTaskButtonCatching(false);
      }, 700);
    }, 380);
  };

  // Hero scale-up expanding out from the Top Task button
  const handleOpenTaskModal = () => {
    prepTimersRef.current.forEach(clearTimeout);
    prepTimersRef.current = [];
    setIsPreparing(false);
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    soundFX.playClick();
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

    const style = computeHeroStyle(true);
    setHeroStyle(style);

    setShowTaskModal(true);
    setModalAnimState('opening');

    animTimeoutRef.current = setTimeout(() => {
      setModalAnimState('open');
    }, 360);
  };

  const handleToggleTaskModal = () => {
    if (showTaskModal && modalAnimState !== 'closing') {
      handleCloseTaskModal();
    } else {
      handleOpenTaskModal();
    }
  };

  // Escape key closes modal with Hero scale-down effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTaskModal && modalAnimState === 'open') {
        handleCloseTaskModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTaskModal, modalAnimState]);

  // Any edit to the code should dismiss a currently-shown run result, since
  // it no longer describes what's in the editor.
  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode);
    setExecutionResult(null);
    setShowOutputPanel(false);
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
      editorRef.current?.resetTo(data.solutionCode, data.solutionCode.length);
    }
  };

  // Derive lesson-relevant accessory tokens dynamically
  const accessoryTokens = React.useMemo(() => {
    const tokens = new Set<string>();
    if (data.requirements?.name) tokens.add(data.requirements.name);
    if (data.requirements?.params) {
      const parts = data.requirements.params.split(',');
      for (const p of parts) {
        const clean = p.trim().split(':')[0].trim();
        if (clean) tokens.add(clean);
      }
    }
    if (data.testCase?.call) {
      const fnName = data.testCase.call.split('(')[0].trim();
      if (fnName) tokens.add(fnName);
    }
    return Array.from(tokens);
  }, [data.requirements, data.testCase]);

  return (
    <main
      className={`w-full max-w-2xl h-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between relative overflow-hidden shadow-2xl border-x-0 md:border md:rounded-2xl select-none ${
        isDark ? 'bg-[#090d16] md:border-slate-800/80 text-slate-100' : 'bg-white md:border-slate-300 text-slate-900'
      }`}
    >
      {/* ================= BEGIN: Minimal Top Toolbar (Sticky Top) ================= */}
      {/* Safe-area padding lives on this OUTER element with no fixed height,
          so it adds to the header's total height instead of eating into a
          fixed h-10 box (which squished/clipped the button row on devices
          with a real status-bar inset -- invisible in browser preview,
          where the inset is always 0). */}
      <header
        className={`sticky top-0 z-30 w-full border-b shrink-0 select-none pt-[env(safe-area-inset-top,0px)] ${
          isDark ? 'bg-[#0d121d] border-ide-border' : 'bg-[#e8eaf0] border-slate-300'
        }`}
      >
      <div className="px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Left: Back button & Problem Details Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            aria-label="Go Back"
            onClick={onBack || onContinue}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-95 transition-transform cursor-pointer shrink-0 ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/60 text-slate-300'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Short & meaningful Task Button with Hero animation */}
          <button
            ref={taskButtonRef}
            type="button"
            id="task-trigger-btn"
            onClick={handleToggleTaskModal}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
              isTaskButtonCatching ? 'animate-task-catch ring-2 ring-indigo-400' : ''
            } ${
              showTaskModal
                ? 'bg-indigo-600/25 border-indigo-500/70 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                : isDark
                ? 'bg-[#131826] hover:bg-[#1c2438] border-slate-700/80 text-slate-200'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
            }`}
            aria-label="Toggle Task"
            title="Click to view Task instructions"
          >
            {/* When minimized into the button, show an attractive subtle pulse beacon */}
            {!showTaskModal && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500 border border-white/60"></span>
              </span>
            )}
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

        {/* Right: Run button and Overflow Menu (Undo/Redo now live above the
            keyboard, right-aligned, within easy thumb reach while typing) */}
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            aria-label="Execute code"
            onClick={handleExecute}
            className="h-9 px-4 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_14px_rgba(99,102,241,0.45)] active:scale-95 transition-all cursor-pointer"
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
            className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
              isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.75" />
              <circle cx="12" cy="12" r="1.75" />
              <circle cx="12" cy="19" r="1.75" />
            </svg>
          </button>

          {/* Overflow Dropdown */}
          {showOverflowMenu && (
            <div
              className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-2xl p-1.5 z-50 text-xs animate-fadeIn ${
                isDark ? 'bg-[#141926] border-slate-700/80' : 'bg-white border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  handleExecute();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
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
                  handleOpenTaskModal();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-indigo-400">help_outline</span>
                <span>View Task</span>
              </button>

              {data.solutionCode && (
                <button
                  type="button"
                  onClick={() => {
                    setShowOverflowMenu(false);
                    setShowSolutionModal(true);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-indigo-300 flex items-center gap-2 cursor-pointer ${
                    isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100 text-indigo-600'
                  }`}
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
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-amber-300 flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100 text-amber-700'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-amber-400">auto_fix_high</span>
                <span>Auto-Complete</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  soundFX.playClick();
                  editorRef.current?.toggleCursorArrows();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {cursorArrowsVisible ? 'keyboard_hide' : 'keyboard'}
                </span>
                <span>{cursorArrowsVisible ? 'Hide' : 'Show'} Cursor Arrows</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  soundFX.playClick();
                  editorRef.current?.toggleHorizontalScroll();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {horizontalScrollEnabled ? 'wrap_text' : 'unfold_more'}
                </span>
                <span>{horizontalScrollEnabled ? 'Disable' : 'Enable'} Horizontal Scroll</span>
              </button>

              <div className={`h-[1px] my-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

              <button
                type="button"
                onClick={() => {
                  setShowOverflowMenu(false);
                  soundFX.playClick();
                  editorRef.current?.resetTo(data.initialCode);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-rose-300 flex items-center gap-2 cursor-pointer ${
                  isDark ? 'hover:bg-rose-950/40' : 'hover:bg-rose-50 text-rose-600'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                <span>Reset to Starter</span>
              </button>
            </div>
          )}
        </div>
      </div>
      </header>
      {/* ================= END: Minimal Top Toolbar ================= */}

      <KotlinCodeEditor
        ref={editorRef}
        code={userCode}
        onCodeChange={handleCodeChange}
        onCursorArrowsVisibilityChange={setCursorArrowsVisible}
        onHorizontalScrollChange={setHorizontalScrollEnabled}
        onRunRequested={handleExecute}
        customTokens={accessoryTokens}
        isDark={isDark}
      />

      {/* ================= BEGIN: Preparing Exercise Progress Animation ================= */}
      {isPreparing && !showTaskModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn"
          id="preparing-writerun-modal"
        >
          <div
            className={`w-full max-w-[310px] rounded-2xl border p-5 shadow-2xl flex flex-col items-center text-center animate-scaleUp ${
              isDark
                ? 'bg-[#101422] border-indigo-500/30 text-slate-100 shadow-[0_0_35px_rgba(99,102,241,0.25)]'
                : 'bg-white border-indigo-200 text-slate-900 shadow-[0_12px_36px_rgba(99,102,241,0.15)]'
            }`}
          >
            {/* Animated Icon with subtle ping halo */}
            <div className="relative mb-3.5 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-11 w-11 rounded-2xl bg-indigo-500/25" />
              <div
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner ${
                  isDark
                    ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-600'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">terminal</span>
              </div>
            </div>

            <h4 className={`font-bold text-sm tracking-tight mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Preparing Write &amp; Run Exercise
            </h4>
            <p className={`text-xs mb-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Setting up compiler &amp; test workspace...
            </p>

            {/* Smooth animated progress bar */}
            <div className="w-full space-y-1.5">
              <div
                className={`w-full h-2 rounded-full overflow-hidden border p-[1px] ${
                  isDark ? 'bg-[#090d16] border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-sky-400 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(99,102,241,0.7)]"
                  style={{ width: `${prepProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono">
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Initializing</span>
                <span className="text-indigo-400 font-semibold">{prepProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ================= END: Preparing Exercise Progress Animation ================= */}

      {/* ================= BEGIN: Task Details Modal (Hero Scale Animation) ================= */}
      {showTaskModal && (
        <div
          className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 select-text ${
            modalAnimState === 'closing'
              ? 'animate-hero-backdrop-out'
              : modalAnimState === 'opening'
              ? 'animate-hero-backdrop-in'
              : ''
          }`}
          onClick={handleCloseTaskModal}
        >
          <div
            ref={modalRef}
            style={modalAnimState === 'open' ? undefined : heroStyle}
            className={`w-full max-w-[372px] mx-auto rounded-2xl border shadow-2xl max-h-[82vh] flex flex-col overflow-hidden ${
              modalAnimState === 'closing'
                ? 'animate-hero-down'
                : modalAnimState === 'opening'
                ? 'animate-hero-up'
                : ''
            } ${
              isDark ? 'border-slate-700/80 bg-[#121622] text-slate-100' : 'border-slate-300 bg-white text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
            id="task-details-modal"
          >
            {/* Sticky Top Header: Title + Cross Button */}
            <div className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border tracking-tight ${
                    isDark
                      ? 'bg-indigo-950/90 text-indigo-300 border-indigo-700/50'
                      : 'bg-indigo-100 text-indigo-700 border-indigo-300'
                  }`}
                >
                  Stage 4 - Write &amp; Run Exercise
                </span>
              </div>
              <button
                type="button"
                aria-label="Close task details"
                onClick={handleCloseTaskModal}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-5 py-3.5 space-y-3.5 flex-1 overscroll-contain">
              <div>
                <h3 className={`font-bold text-base mb-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {data.title || topicTitle || 'Kotlin Code Task'}
                </h3>
                <p className={`text-xs leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {data.description}
                </p>
              </div>

              {/* Specifications Card */}
              <div
                className={`space-y-2 p-3.5 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-[#090d16] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Signature & Types
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>Function:</span>
                  <span className={isDark ? 'text-indigo-300 font-semibold' : 'text-indigo-600 font-semibold'}>{data.requirements.name}</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>Parameters:</span>
                  <span className={isDark ? 'text-amber-300' : 'text-amber-700'}>{data.requirements.params}</span>
                </div>
                <div className={`flex justify-between items-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>Returns:</span>
                  <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>{data.requirements.returns}</span>
                </div>
              </div>

              {/* Sample Input / Output */}
              {(data.sampleInput || data.expectedOutput) && (
                <div
                  className={`p-3.5 rounded-xl border text-xs font-mono ${
                    isDark ? 'bg-[#090d16] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Example Case
                  </div>
                  {data.sampleInput && (
                    <div className={`flex justify-between items-start gap-2.5 mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="shrink-0 leading-snug">Call:</span>
                      <span className={`text-right leading-snug break-words ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>{data.sampleInput}</span>
                    </div>
                  )}
                  {data.expectedOutput && (
                    <div className={`flex justify-between items-start gap-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="shrink-0 leading-snug">Output:</span>
                      <span className={`text-right leading-snug break-words whitespace-pre-line ${isDark ? 'text-emerald-400 font-bold' : 'text-emerald-700 font-bold'}`}>{data.expectedOutput}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fixed Bottom Footer */}
            <div className={`flex items-center justify-end px-5 py-3 border-t shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <button
                type="button"
                onClick={handleCloseTaskModal}
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
            className={`w-full max-w-[372px] mx-auto rounded-2xl border shadow-2xl animate-scaleUp max-h-[85vh] flex flex-col overflow-hidden ${
              isDark ? 'border-slate-700/80 bg-[#121622] text-slate-100' : 'border-slate-300 bg-white text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
            id="run-result-modal"
          >
            {/* Modal Header - Sticky to top */}
            <div className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center gap-2">
                {executionResult.success ? (
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[10.5px] font-bold border flex items-center gap-1 ${
                      isDark
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/50'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}
                  >
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>TEST PASSED</span>
                  </span>
                ) : (
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[10.5px] font-bold border flex items-center gap-1 ${
                      isDark ? 'bg-rose-950/90 text-rose-300 border-rose-700/50' : 'bg-rose-100 text-rose-700 border-rose-300'
                    }`}
                  >
                    <svg className="w-3 h-3 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>RUN FAILED</span>
                  </span>
                )}
                <span className="text-slate-500 text-xs">·</span>
                <span className={`font-mono text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {executionResult.executionTimeMs || 12}ms
                </span>
              </div>

              <button
                type="button"
                aria-label="Close run result"
                onClick={() => setShowOutputPanel(false)}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${
                  isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-5 py-4 flex-1 overscroll-contain">
              {executionResult.success ? (
                <>
                  <h3 className={`font-bold text-base mb-1 flex items-center gap-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    <span>All Tests Passed!</span>
                    <span className="text-emerald-400">🎉</span>
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Your code compiled and executed smoothly with the expected output.
                  </p>

                  <div
                    className={`my-3.5 p-3.5 rounded-xl border font-mono text-xs space-y-2 ${
                      isDark ? 'bg-[#090d16] border-emerald-500/30' : 'bg-slate-50 border-emerald-400/50'
                    }`}
                  >
                    <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Output Verification
                    </div>
                    <div className={`flex justify-between items-start gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className={`shrink-0 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Output:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded border leading-snug break-words whitespace-pre-line text-right ${
                          isDark ? 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                        }`}
                      >
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                    {data.expectedOutput && (
                      <div className={`flex justify-between items-start gap-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="shrink-0 leading-snug">Expected:</span>
                        <span className={`text-right leading-snug break-words whitespace-pre-line ${isDark ? 'text-slate-300 font-medium' : 'text-slate-700 font-medium'}`}>{data.expectedOutput}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Execution Error
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {executionResult.error?.message || 'The code produced an unexpected output or failed to compile.'}
                  </p>

                  <div
                    className={`my-3.5 p-3.5 rounded-xl border font-mono text-xs space-y-2 ${
                      isDark ? 'bg-[#090d16] border-rose-500/30' : 'bg-slate-50 border-rose-400/50'
                    }`}
                  >
                    <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Output Details
                    </div>
                    <div className={`flex justify-between items-start gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className={`shrink-0 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Your Output:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded border leading-snug break-words whitespace-pre-line text-right ${
                          isDark ? 'text-rose-400 bg-rose-500/15 border-rose-500/30' : 'text-rose-700 bg-rose-100 border-rose-300'
                        }`}
                      >
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                    {data.expectedOutput && (
                      <div className={`flex justify-between items-start gap-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="shrink-0 leading-snug">Expected:</span>
                        <span className={`text-right leading-snug break-words whitespace-pre-line ${isDark ? 'text-emerald-400 font-medium' : 'text-emerald-700 font-medium'}`}>{data.expectedOutput}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Modal Actions - Sticky to bottom */}
            <div className={`flex items-center justify-end gap-2.5 px-5 py-3 border-t shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <button
                type="button"
                onClick={() => setShowOutputPanel(false)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
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
          <div
            className={`w-full max-w-sm rounded-2xl border shadow-2xl max-h-[85vh] flex flex-col overflow-hidden ${
              isDark ? 'border-slate-700/80 bg-[#121622] text-slate-100' : 'border-slate-300 bg-white text-slate-900'
            }`}
          >
            {/* Sticky Header */}
            <div className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Reference Solution</h3>
              <button
                type="button"
                aria-label="Close reference solution"
                onClick={() => setShowSolutionModal(false)}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto px-5 py-3.5 flex-1 overscroll-contain">
              <div
                className={`p-3 rounded-xl border font-mono text-xs whitespace-pre overflow-x-auto ${
                  isDark ? 'bg-[#090d16] border-slate-800 text-indigo-300' : 'bg-slate-50 border-slate-200 text-indigo-700'
                }`}
              >
                {data.solutionCode}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className={`flex items-center justify-end gap-2 px-5 py-3 border-t shrink-0 ${isDark ? 'border-slate-800 bg-[#121622]' : 'border-slate-200 bg-white'}`}>
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSolutionModal(false);
                  handleAcceptSuggestion();
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-[0_0_14px_rgba(99,102,241,0.4)]"
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
