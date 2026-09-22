import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Bug } from 'lucide-react';
import { Stage5DebugData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { compileAndRunKotlin, KotlinExecutionResult } from '../utils/kotlinRunner';
import { KotlinCodeEditor, KotlinCodeEditorHandle } from './ide/KotlinCodeEditor';

interface DebugIdeProps {
  data: Stage5DebugData;
  topicTitle?: string;
  isDark: boolean;
  onContinue: () => void;
  onBack?: () => void;
  nextStageLabel?: string;
}

export const DebugIde: React.FC<DebugIdeProps> = ({
  data,
  topicTitle = 'Kotlin Debugging',
  isDark,
  onContinue,
  onBack,
  nextStageLabel = 'Mastered',
}) => {
  const [userCode, setUserCode] = useState<string>(data.brokenCode);
  const [executionResult, setExecutionResult] = useState<KotlinExecutionResult | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [showOutputPanel, setShowOutputPanel] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [showOverflowMenu, setShowOverflowMenu] = useState<boolean>(false);

  // Progressive hints reveal state (0 initially revealed, unlocked on click)
  const [unlockedHintCount, setUnlockedHintCount] = useState<number>(0);

  // Preparing state with progress animation before auto-opening Task dialog
  const [isPreparing, setIsPreparing] = useState<boolean>(true);
  const [prepProgress, setPrepProgress] = useState<number>(15);
  const prepTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Auto-open Task modal with 1 second delay
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

  // Reset code when challenge data changes
  useEffect(() => {
    setUserCode(data.brokenCode);
    setExecutionResult(null);
    setIsResolved(false);
    setShowOutputPanel(false);
    setUnlockedHintCount(0);
  }, [data.brokenCode]);

  // Auto-open Task dialog with a preparation progress animation ("Preparing Debug Exercise")
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
      setHeroStyle(computeHeroStyle(true));
      setShowTaskModal(true);
      setModalAnimState('opening');

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setModalAnimState('open');
      }, 280);
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

  // Compute Hero transition coordinates between center dialog and Top Task button
  const computeHeroStyle = (forOpening = false): React.CSSProperties => {
    const btnEl = taskButtonRef.current;
    const modalEl = modalRef.current;

    let btnCenterX = 60;
    let btnCenterY = 20;
    let btnWidth = 72;
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

  const handleOpenTaskModal = () => {
    prepTimersRef.current.forEach(clearTimeout);
    prepTimersRef.current = [];
    setIsPreparing(false);
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    soundFX.playClick();
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);

    setHeroStyle(computeHeroStyle(true));
    setShowTaskModal(true);
    setModalAnimState('opening');

    animTimeoutRef.current = setTimeout(() => {
      setModalAnimState('open');
    }, 280);
  };

  const handleCloseTaskModal = () => {
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    soundFX.playClick();
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);

    setHeroStyle(computeHeroStyle(false));
    setModalAnimState('closing');

    animTimeoutRef.current = setTimeout(() => {
      setShowTaskModal(false);
      setModalAnimState('closed');
      setIsTaskButtonCatching(true);
      pulseTimeoutRef.current = setTimeout(() => {
        setIsTaskButtonCatching(false);
      }, 700);
    }, 240);
  };

  const handleToggleTaskModal = () => {
    if (showTaskModal) {
      handleCloseTaskModal();
    } else {
      handleOpenTaskModal();
    }
  };

  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode);
    if (executionResult) {
      setExecutionResult(null);
    }
  };

  const handleExecuteFix = async () => {
    if (isTesting) return;
    soundFX.playClick();
    setIsTesting(true);

    try {
      const result = await compileAndRunKotlin(userCode, {
        expectedOutput: data.expectedOutput,
      });

      const trimmedOutput = (result.output || '').trim();
      const expected = (data.expectedOutput || '').trim();

      const outputMatches = trimmedOutput === expected || trimmedOutput.includes(expected);
      const noErrors = result.success && !result.error;
      const success = outputMatches && noErrors;

      const fullResult: KotlinExecutionResult = {
        ...result,
        success,
        error: !success
          ? result.error || {
              message: outputMatches
                ? (result.error?.message ?? 'Runtime error encountered.')
                : `Output mismatch: Expected "${expected}", got "${trimmedOutput || '(no output)'}"`,
              line: result.error?.line || 1,
              type: 'runtime_error',
            }
          : undefined,
      };

      setExecutionResult(fullResult);
      setShowOutputPanel(true);

      if (success) {
        setIsResolved(true);
        soundFX.playSuccess();
      } else {
        setIsResolved(false);
        soundFX.playError();
      }
    } catch {
      setExecutionResult({
        success: false,
        output: '',
        logs: [],
        error: {
          message: 'Compilation failed unexpectedly. Please check syntax.',
          line: 1,
          type: 'compiler_error',
        },
        executionTimeMs: 0,
        exitCode: 1,
      });
      setShowOutputPanel(true);
      soundFX.playError();
    } finally {
      setIsTesting(false);
    }
  };

  const handleApplySolution = () => {
    soundFX.playClick();
    setUserCode(data.fixedCode);
    editorRef.current?.resetTo(data.fixedCode);
    setShowSolutionModal(false);
  };

  const handleResetToBroken = () => {
    soundFX.playClick();
    setUserCode(data.brokenCode);
    editorRef.current?.resetTo(data.brokenCode);
    setExecutionResult(null);
    setIsResolved(false);
  };

  const handleUnlockNextHint = () => {
    soundFX.playClick();
    setUnlockedHintCount((prev) => Math.min(3, prev + 1));
  };

  const accessoryTokens = useMemo(() => {
    return ['val', 'var', 'fun', 'println', 'Int', 'String', 'Boolean', 'Double', 'return', 'if', 'else', '==', '!='];
  }, []);

  return (
    <main
      className={`w-full max-w-2xl h-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between relative overflow-hidden shadow-2xl border-x-0 md:border md:rounded-2xl select-none ${
        isDark ? 'bg-[#0b0810] md:border-rose-950/60 text-slate-100' : 'bg-[#fffcfc] md:border-rose-200/80 text-slate-900'
      }`}
    >
      {/* ================= Minimal Top Toolbar (Stage 5 - Debug Theme) ================= */}
      <header
        className={`sticky top-0 z-30 w-full border-b shrink-0 select-none pt-[env(safe-area-inset-top,0px)] relative ${
          isDark ? 'bg-[#140c15] border-rose-950/80' : 'bg-[#fdf2f4] border-rose-200/80'
        }`}
      >
        {/* Subtle accent indicator bar for Debug Stage */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 opacity-90" />

        <div className="px-3 sm:px-4 h-14 flex items-center justify-between">
          {/* Left: Back button & Task Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              aria-label="Go Back"
              onClick={onBack || onContinue}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-95 transition-transform cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-rose-950/30 hover:bg-rose-900/50 border-rose-900/40 text-rose-200'
                  : 'bg-white hover:bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Short & meaningful Debug Tag Button with Hero animation */}
            <button
              ref={taskButtonRef}
              type="button"
              id="task-trigger-btn"
              onClick={handleToggleTaskModal}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                isTaskButtonCatching ? 'animate-task-catch ring-2 ring-rose-400' : ''
              } ${
                showTaskModal
                  ? 'bg-rose-600/25 border-rose-500/70 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                  : isDark
                  ? 'bg-[#1b0f19] hover:bg-[#281525] border-rose-800/60 text-rose-200'
                  : 'bg-white hover:bg-rose-50 border-rose-300 text-rose-800'
              }`}
              aria-label="Toggle Debug Details"
              title="Click to view Debug instructions"
            >
              {!showTaskModal && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 border border-white/60"></span>
                </span>
              )}
              <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="font-semibold tracking-tight">Debug</span>
              <svg
                className={`w-3.5 h-3.5 text-rose-400 transition-transform duration-200 shrink-0 ${
                  showTaskModal ? 'rotate-180 text-rose-300' : ''
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

          {/* Right: Run button and Overflow Menu */}
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              aria-label="Execute code"
              disabled={isTesting}
              onClick={handleExecuteFix}
              className="h-9 px-4 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_14px_rgba(244,63,94,0.45)] active:scale-95 transition-all cursor-pointer"
              id="run-btn"
            >
              {isTesting ? (
                <>
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="tracking-wide">Testing...</span>
                </>
              ) : (
                <>
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span className="tracking-wide">Run</span>
                </>
              )}
            </button>

            <button
              type="button"
              aria-label="More options"
              onClick={() => setShowOverflowMenu((prev) => !prev)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                isDark ? 'text-rose-300/80 hover:text-rose-200' : 'text-rose-700/80 hover:text-rose-900'
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
                  isDark ? 'bg-[#180f1b] border-rose-900/60 text-rose-100' : 'bg-white border-rose-200 text-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowOverflowMenu(false);
                    handleExecuteFix();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                    isDark ? 'hover:bg-rose-950/50 text-rose-200' : 'hover:bg-rose-50 text-slate-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-rose-400 fill-current" viewBox="0 0 24 24">
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
                    isDark ? 'hover:bg-rose-950/50 text-rose-200' : 'hover:bg-rose-50 text-slate-700'
                  }`}
                >
                  <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>View Debug</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOverflowMenu(false);
                    setShowSolutionModal(true);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                    isDark ? 'hover:bg-rose-950/50 text-rose-300' : 'hover:bg-rose-50 text-rose-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] text-rose-400">visibility</span>
                  <span>View Solution</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowOverflowMenu(false);
                    handleApplySolution();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                    isDark ? 'hover:bg-slate-800 text-amber-300' : 'hover:bg-slate-100 text-amber-700'
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
                    handleResetToBroken();
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                    isDark ? 'hover:bg-rose-950/60 text-rose-300' : 'hover:bg-rose-50 text-rose-600'
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

      {/* ================= Code Editor Core ================= */}
      <KotlinCodeEditor
        ref={editorRef}
        code={userCode}
        onCodeChange={handleCodeChange}
        onCursorArrowsVisibilityChange={setCursorArrowsVisible}
        onHorizontalScrollChange={setHorizontalScrollEnabled}
        onRunRequested={handleExecuteFix}
        customTokens={accessoryTokens}
        isDark={isDark}
      />

      {/* ================= BEGIN: Preparing Debug Exercise Progress Animation ================= */}
      {isPreparing && !showTaskModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn"
          id="preparing-debug-modal"
        >
          <div
            className={`w-full max-w-[310px] rounded-2xl border p-5 shadow-2xl flex flex-col items-center text-center animate-scaleUp ${
              isDark
                ? 'bg-[#180e1a] border-rose-500/30 text-slate-100 shadow-[0_0_35px_rgba(244,63,94,0.25)]'
                : 'bg-white border-rose-200 text-slate-900 shadow-[0_12px_36px_rgba(244,63,94,0.15)]'
            }`}
          >
            {/* Animated Icon with subtle ping halo */}
            <div className="relative mb-3.5 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-11 w-11 rounded-2xl bg-rose-500/25" />
              <div
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner ${
                  isDark
                    ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                    : 'bg-rose-50 border-rose-200 text-rose-600'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">troubleshoot</span>
              </div>
            </div>

            <h4 className={`font-bold text-sm tracking-tight mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Preparing Debug Exercise
            </h4>
            <p className={`text-xs mb-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Inspecting defect &amp; runtime harness...
            </p>

            {/* Smooth animated progress bar */}
            <div className="w-full space-y-1.5">
              <div
                className={`w-full h-2 rounded-full overflow-hidden border p-[1px] ${
                  isDark ? 'bg-[#0c0810] border-rose-950/60' : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(244,63,94,0.7)]"
                  style={{ width: `${prepProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10.5px] font-mono">
                <span className={isDark ? 'text-rose-400/60' : 'text-slate-400'}>Analyzing</span>
                <span className="text-rose-400 font-semibold">{prepProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ================= END: Preparing Debug Exercise Progress Animation ================= */}

      {/* ================= Hero-Animated Task Modal ================= */}
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
              isDark ? 'border-rose-900/70 bg-[#160d17] text-slate-100 shadow-[0_0_35px_rgba(244,63,94,0.15)]' : 'border-rose-200 bg-white text-slate-900 shadow-[0_12px_36px_rgba(225,29,72,0.1)]'
            }`}
            onClick={(e) => e.stopPropagation()}
            id="task-details-modal"
          >
            {/* Sticky Top Header: Title + Cross Button */}
            <div
              className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-rose-50/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border tracking-tight ${
                    isDark
                      ? 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  Stage 5 - Debug Exercise
                </span>
              </div>
              <button
                type="button"
                aria-label="Close task details"
                onClick={handleCloseTaskModal}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${
                  isDark
                    ? 'text-rose-300/70 hover:text-rose-100 hover:bg-rose-950/60'
                    : 'text-rose-700/70 hover:text-rose-900 hover:bg-rose-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto px-5 py-3.5 space-y-3.5 flex-1 overscroll-contain text-xs">
              <div>
                <h3 className={`font-bold text-base mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {data.title || topicTitle}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {data.subtitle}
                </p>
              </div>

              {/* Target Expected Output */}
              {data.expectedOutput && (
                <div
                  className={`p-3 rounded-xl border font-mono space-y-1 ${
                    isDark ? 'bg-[#0c0810] border-rose-950/60' : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div
                    className={`text-[10.5px] font-bold uppercase tracking-wider mb-1 font-sans flex items-center justify-between ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <span>Expected Correct Output</span>
                    <span className="material-symbols-outlined text-[13px] text-emerald-500">task_alt</span>
                  </div>
                  <div
                    className={`font-bold p-2 rounded border whitespace-pre break-words ${
                      isDark
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {data.expectedOutput}
                  </div>
                </div>
              )}

              {/* Progressive 3-Tier Hints */}
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between font-bold text-[11px] uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-amber-500">lightbulb</span>
                    <span>Progressive Hints</span>
                  </span>
                  <span className="font-mono text-[10px] text-amber-500">
                    {unlockedHintCount} / 3
                  </span>
                </div>

                {data.hints.slice(0, unlockedHintCount).map((hint, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border transition-all animate-fadeIn ${
                      isDark
                        ? 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-[10.5px] mb-0.5 text-amber-500">
                      <span>Hint {idx + 1}</span>
                      <span>·</span>
                      <span className="text-[10px] uppercase font-mono">
                        {idx === 0 ? 'Conceptual' : idx === 1 ? 'Reasoning' : 'Direction'}
                      </span>
                    </div>
                    <p className="leading-relaxed">{hint}</p>
                  </div>
                ))}

                {unlockedHintCount < 3 && (
                  <button
                    type="button"
                    onClick={handleUnlockNextHint}
                    className={`w-full py-1.5 px-3 rounded-xl border border-dashed flex items-center justify-center gap-1.5 font-medium text-xs cursor-pointer transition-colors active:scale-98 ${
                      isDark
                        ? 'border-amber-700/50 text-amber-400 hover:bg-amber-950/30'
                        : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">lock_open</span>
                    <span>Unlock Next Hint ({unlockedHintCount + 1} of 3)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div
              className={`flex items-center justify-between gap-2 px-5 py-3 border-t shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-rose-50/40'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  handleCloseTaskModal();
                  setShowSolutionModal(true);
                }}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'text-rose-400 hover:bg-rose-950/50' : 'text-rose-700 hover:bg-rose-100'
                }`}
              >
                View Solution
              </button>

              <button
                type="button"
                onClick={handleCloseTaskModal}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-semibold cursor-pointer shadow-[0_0_14px_rgba(244,63,94,0.4)] transition-all"
              >
                Start Fixing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Run Result Bottom Dialog / Drawer ================= */}
      {showOutputPanel && executionResult && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowOutputPanel(false)}
        >
          <div
            className={`w-full max-w-sm rounded-2xl border shadow-2xl max-h-[85vh] flex flex-col overflow-hidden ${
              isDark ? 'border-rose-900/70 bg-[#160d17] text-slate-100' : 'border-rose-200 bg-white text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Result Badge */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-md font-mono text-[10.5px] font-bold border flex items-center gap-1 ${
                    executionResult.success
                      ? isDark
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                      : isDark
                      ? 'bg-rose-950/80 text-rose-300 border-rose-700/50'
                      : 'bg-rose-100 text-rose-700 border-rose-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {executionResult.success ? 'check_circle' : 'error'}
                  </span>
                  <span>{executionResult.success ? 'DEFECT RESOLVED' : 'DEFECT PERSISTS'}</span>
                </span>
                <span className={`text-slate-500 font-mono text-[10.5px]`}>
                  {executionResult.executionTimeMs}ms
                </span>
              </div>
              <button
                type="button"
                aria-label="Close run results"
                onClick={() => setShowOutputPanel(false)}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${
                  isDark
                    ? 'text-rose-300/70 hover:text-rose-100 hover:bg-rose-950/60'
                    : 'text-rose-700/70 hover:text-rose-900 hover:bg-rose-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto px-4 py-3 space-y-3 flex-1 text-xs overscroll-contain">
              {executionResult.success ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      Fix Verified! Output Matches
                    </h3>
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Great job! Your corrected Kotlin code compiles without errors and produces the expected output.
                  </p>

                  {/* Defect Diagnosis (Post-Mortem Explanation) */}
                  {data.explanation && (
                    <div
                      className={`p-3 rounded-xl border space-y-1.5 ${
                        isDark
                          ? 'bg-rose-950/25 border-rose-900/50 text-rose-200'
                          : 'bg-rose-50/80 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-rose-400">
                        <span className="material-symbols-outlined text-[14px] text-rose-500">troubleshoot</span>
                        <span>Defect Diagnosis</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line text-xs">{data.explanation}</p>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl border font-mono space-y-2 ${
                      isDark ? 'bg-[#090d16] border-emerald-500/30' : 'bg-slate-50 border-emerald-300'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-bold uppercase tracking-wider font-sans ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Terminal Output
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-slate-500">Output:</span>
                      <span
                        className={`font-bold px-1.5 py-0.5 rounded border whitespace-pre break-words text-right ${
                          isDark
                            ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
                            : 'text-emerald-800 bg-emerald-100 border-emerald-200'
                        }`}
                      >
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                      !
                    </span>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      Defect Still Present
                    </h3>
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {executionResult.error?.message || 'The code still produces an unexpected output or failed to compile.'}
                  </p>

                  <div
                    className={`p-3 rounded-xl border font-mono space-y-2 ${
                      isDark ? 'bg-[#090d16] border-rose-500/30' : 'bg-slate-50 border-rose-300'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-bold uppercase tracking-wider font-sans ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      Output Comparison
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-slate-500 shrink-0">Your Output:</span>
                      <span
                        className={`font-bold px-1.5 py-0.5 rounded border whitespace-pre break-words text-right ${
                          isDark
                            ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                            : 'text-rose-700 bg-rose-100 border-rose-200'
                        }`}
                      >
                        {executionResult.output || '(no output)'}
                      </span>
                    </div>
                    {data.expectedOutput && (
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-slate-500 shrink-0">Expected:</span>
                        <span className="text-right whitespace-pre break-words text-emerald-400 font-medium">
                          {data.expectedOutput}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div
              className={`flex items-center justify-end gap-2 px-4 py-2.5 border-t shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowOutputPanel(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium active:scale-95 transition-all cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {executionResult.success ? 'Keep Editing' : 'Back to Code'}
              </button>

              {executionResult.success ? (
                <button
                  type="button"
                  id="debug-continue-btn"
                  onClick={() => {
                    soundFX.playSuccess();
                    setShowOutputPanel(false);
                    onContinue();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_16px_rgba(244,63,94,0.5)] cursor-pointer transition-all"
                >
                  <span>Continue to {nextStageLabel}</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowOutputPanel(false);
                    setShowSolutionModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 text-xs font-medium active:scale-95 transition-all cursor-pointer"
                >
                  View Solution
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= Reference Solution Modal ================= */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div
            className={`w-full max-w-sm rounded-2xl border shadow-2xl max-h-[85vh] flex flex-col overflow-hidden ${
              isDark ? 'border-rose-900/70 bg-[#160d17] text-slate-100' : 'border-rose-200 bg-white text-slate-900'
            }`}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-white'
              }`}
            >
              <h3 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Reference Solution
              </h3>
              <button
                type="button"
                aria-label="Close solution modal"
                onClick={() => setShowSolutionModal(false)}
                className={`cursor-pointer p-1 rounded-lg transition-colors ${
                  isDark
                    ? 'text-rose-300/70 hover:text-rose-100 hover:bg-rose-950/60'
                    : 'text-rose-700/70 hover:text-rose-900 hover:bg-rose-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-3 flex-1 text-xs overscroll-contain">
              <div
                className={`p-3 rounded-xl border font-mono whitespace-pre overflow-x-auto ${
                  isDark ? 'bg-[#0c0810] border-rose-950/60 text-rose-300' : 'bg-rose-50/50 border-rose-200 text-rose-900'
                }`}
              >
                {data.fixedCode}
              </div>
            </div>

            <div
              className={`flex items-center justify-end gap-2 px-4 py-2.5 border-t shrink-0 ${
                isDark ? 'border-rose-950/80 bg-[#160d17]' : 'border-rose-100 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleApplySolution}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer shadow-[0_0_12px_rgba(244,63,94,0.4)] transition-all"
              >
                Apply Fix
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
