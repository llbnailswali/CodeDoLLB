import React, { forwardRef, useState, useEffect, useLayoutEffect, useImperativeHandle, useRef, useMemo } from 'react';
import { AppTheme, UserStats } from '../types';
import { FiveStageLesson, AVAILABLE_FIVE_STAGE_LESSONS } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';
import { DetailedTutorialView } from './DetailedTutorialView';
import { getDetailedTutorial } from '../data/detailedTutorialsData';
import { OLD_TUTORIALS_BACKUP } from '../data/detailedTutorialsData.OLD_BACKUP'; // TEMP: remove once the old-vs-new comparison is done

// 6 Lesson Stage Components (1: Learn, 2: Explore, 3: Predict, 4: Write & Run, 5: Debug, 6: Mastered)
import { Learn } from './Learn';
import { Explore } from './Explore';
import { Predict } from './Predict';
import { WriteRun } from './WriteRun';
import { DebugIde } from './DebugIde';
import { Mastered } from './Mastered';
import { SkipStageModal } from './SkipStageModal';

export type StageKey = 'learn' | 'explore' | 'predict' | 'writeRun' | 'debug' | 'mastered';

interface DetailProps {
  theme: AppTheme;
  initialLessonKey?: string;
  initialStageKey?: StageKey;
  userStats: UserStats;
  onExit: () => void;
  onCompleteLesson: (earnedXP: number, worldId?: string) => void;
  onToggleTheme?: () => void;
  tapToRevealEnabled?: boolean;
  onToggleTapToReveal?: () => void;
}

// Lets the parent (App.tsx) drive stage-stack back navigation from the
// Android hardware back button without coupling lesson navigation to browser
// history.
export interface DetailHandle {
  goBack: () => void;
}

// The six possible stage keys, in their fixed relative order. Which ones are
// actually present for a given lesson depends on its data (see activeStages
// below) -- Learn and Mastered always run; the rest only run when the lesson
// provides that stage's data, per CODEDO_MASTER_PLAN.md's "topic-aware
// activity selection" (e.g. a purely conceptual topic may only need
// Learn -> Predict-as-MCQ -> Mastered).

const STAGE_LABELS: Record<StageKey, string> = {
  learn: 'LEARN',
  explore: 'EXPLORE',
  predict: 'PREDICT',
  writeRun: 'WRITE & RUN',
  debug: 'DEBUG',
  mastered: 'MASTERED',
};

// Title-case versions for "Continue to X" buttons, since stages can be
// skipped per-lesson (see activeStages) -- these must never be hardcoded
// in the child stage components.
const STAGE_CONTINUE_LABELS: Record<StageKey, string> = {
  learn: 'Learn',
  explore: 'Explore',
  predict: 'Predict',
  writeRun: 'Write & Run',
  debug: 'Debug',
  mastered: 'Mastered',
};

export const Detail = forwardRef<DetailHandle, DetailProps>(({
  theme,
  initialLessonKey = 'functions',
  initialStageKey,
  userStats,
  onExit,
  onCompleteLesson,
  onToggleTheme,
  tapToRevealEnabled = true,
}, ref) => {
  const [currentLessonKey] = useState<string>(initialLessonKey);
  const [exploreCardIndex, setExploreCardIndex] = useState<number>(0);

  // Preserve reveal steps across stage navigation (when user clicks back/forward)
  const [learnRevealStep, setLearnRevealStep] = useState<number>(0);
  const [exploreRevealStep, setExploreRevealStep] = useState<number>(0);
  const [predictRevealStep, setPredictRevealStep] = useState<number>(0);
  const [writeRunRevealStep, setWriteRunRevealStep] = useState<number>(0);
  const [debugRevealStep, setDebugRevealStep] = useState<number>(0);

  // Predict state: support all questions, no default selected answer
  const [predictAnswers, setPredictAnswers] = useState<Record<number, string>>({});
  const [activePredictCardIdx, setActivePredictCardIdx] = useState<number>(0);

  // Temporary developer/tester tools
  const [showSkipMenu, setShowSkipMenu] = useState<boolean>(false);

  // Write & Run state
  const lessonData: FiveStageLesson =
    AVAILABLE_FIVE_STAGE_LESSONS[currentLessonKey] ||
    AVAILABLE_FIVE_STAGE_LESSONS.functions ||
    AVAILABLE_FIVE_STAGE_LESSONS.variables;
  const [userCode, setUserCode] = useState<string>(lessonData.writeRun?.initialCode ?? '');
  const [hasRunCode, setHasRunCode] = useState<boolean>(false);
  const [actualOutput, setActualOutput] = useState<string>('');

  // Detailed Tutorial state
  const [showDetailedTutorial, setShowDetailedTutorial] = useState<boolean>(false);
  const [showTutorialHint, setShowTutorialHint] = useState<boolean>(true);
  const [isHoveringTutorialBtn, setIsHoveringTutorialBtn] = useState<boolean>(false);
  const [showOldTutorialVersion, setShowOldTutorialVersion] = useState<boolean>(false); // TEMP: old-vs-new comparison toggle
  const tutorialButtonRef = useRef<HTMLButtonElement>(null);
  const tutorialHintRef = useRef<HTMLDivElement>(null);

  const newDetailedTutorial = useMemo(() => {
    return (
      getDetailedTutorial(lessonData.id, lessonData) ||
      getDetailedTutorial(currentLessonKey, lessonData) ||
      getDetailedTutorial(lessonData.topicTitle, lessonData)
    );
  }, [lessonData, currentLessonKey]);

  // TEMP: only lessons with a saved backup entry can show the "old version" -- remove alongside OLD_TUTORIALS_BACKUP
  const oldDetailedTutorial = newDetailedTutorial ? OLD_TUTORIALS_BACKUP[newDetailedTutorial.lessonId] : undefined;
  const detailedTutorial = showOldTutorialVersion && oldDetailedTutorial ? oldDetailedTutorial : newDetailedTutorial;

  useEffect(() => {
    // Show tutorial hint when entering a lesson with a tutorial
    if (detailedTutorial) {
      setShowTutorialHint(true);
    }
  }, [currentLessonKey, detailedTutorial]);

  // Click outside to dismiss tutorial hint
  useEffect(() => {
    if (!showTutorialHint) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        tutorialHintRef.current &&
        !tutorialHintRef.current.contains(target) &&
        tutorialButtonRef.current &&
        !tutorialButtonRef.current.contains(target)
      ) {
        setShowTutorialHint(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTutorialHint]);

  useEffect(() => {
    setUserCode(lessonData.writeRun?.initialCode ?? '');
    setHasRunCode(false);
    setActualOutput('');
  }, [currentLessonKey]);

  // Which stages this specific lesson actually uses, in order. Learn and
  // Mastered always run; explore/predict/writeRun/debug only run when the
  // lesson provides that stage's data (see the FiveStageLesson comment).
  const activeStages: StageKey[] = [
    'learn',
    ...(lessonData.explore ? (['explore'] as const) : []),
    ...(lessonData.predict ? (['predict'] as const) : []),
    ...(lessonData.writeRun ? (['writeRun'] as const) : []),
    ...(lessonData.debug ? (['debug'] as const) : []),
    'mastered',
  ];
  // Stage navigation is an explicit stack rather than an inferred numeric
  // position. Advancing pushes the next stage; Back pops it. This preserves a
  // real visit trail when a learner jumps between stages from the stage rail.
  const [stageStack, setStageStack] = useState<StageKey[]>(() => [
    initialStageKey && activeStages.includes(initialStageKey) ? initialStageKey : activeStages[0],
  ]);
  const currentStageKey = stageStack[stageStack.length - 1];
  const stageScrollPositions = useRef<Partial<Record<StageKey, number>>>({});
  const currentStageIndex = activeStages.indexOf(currentStageKey);
  const nextStageKey = activeStages[currentStageIndex + 1];
  const nextStageLabel = nextStageKey ? STAGE_CONTINUE_LABELS[nextStageKey] : undefined;

  const saveCurrentStageScroll = () => {
    const rootEl = document.getElementById('root');
    stageScrollPositions.current[currentStageKey] = rootEl ? rootEl.scrollTop : window.scrollY;
  };

  const restoreCurrentStageScroll = () => {
    const scrollTop = stageScrollPositions.current[currentStageKey] ?? 0;
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.scrollTo({ top: scrollTop, behavior: 'auto' });
    } else {
      window.scrollTo({ top: scrollTop, behavior: 'auto' });
    }
  };

  const openDetailedTutorial = () => {
    saveCurrentStageScroll();
    setShowDetailedTutorial(true);
  };

  const closeDetailedTutorial = () => {
    setShowDetailedTutorial(false);
    requestAnimationFrame(restoreCurrentStageScroll);
  };

  // A stage is a nested screen in a lesson. On Back, restore its saved
  // position; a stage visited for the first time starts at the top.
  useLayoutEffect(() => {
    restoreCurrentStageScroll();
  }, [currentStageKey]);

  const scrollToElement = (elementId: string, headerOffset = 120) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const rootEl = document.getElementById('root');
    if (rootEl && rootEl.scrollHeight > rootEl.clientHeight) {
      const rootRect = rootEl.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScroll = rootEl.scrollTop + (elRect.top - rootRect.top) - headerOffset;
      rootEl.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    } else {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
  };

  // Note: Stage 2 (Explore) and Stage 3 (Predict) indicator highlighting and scroll sync
  // are managed directly inside their respective components to avoid fluctuation during
  // tap-to-continue programmatic scrolls and only sync when user manually scrolls.

  const handleNextStage = () => {
    soundFX.playClick();
    if (currentStageIndex < activeStages.length - 1) {
      saveCurrentStageScroll();
      setStageStack((previous) => [...previous, activeStages[currentStageIndex + 1]]);
    } else {
      soundFX.playSuccess();
      onCompleteLesson(lessonData.mastered.xpEarned, lessonData.worldId);
    }
  };

  const handlePreviousStage = () => {
    soundFX.playClick();
    if (showDetailedTutorial) {
      closeDetailedTutorial();
      return;
    }
    if (stageStack.length > 1) {
      saveCurrentStageScroll();
      setStageStack((previous) => previous.slice(0, -1));
    } else {
      // A lesson may open directly on Write & Run from Practice. With no
      // earlier visited stage to pop, return to the calling screen rather
      // than inventing an unvisited stage.
      onExit();
    }
  };

  // Exposed so the app-wide hardware back-button handler (App.tsx) can step
  // back through lesson stages the same way the in-screen back arrow does.
  useImperativeHandle(ref, () => ({
    goBack: () => {
      if (showDetailedTutorial) {
        closeDetailedTutorial();
        return;
      }
      handlePreviousStage();
    },
  }));

  const handleJumpToStage = (key: StageKey) => {
    soundFX.playClick();
    saveCurrentStageScroll();
    setStageStack((previous) => {
      const existingIndex = previous.lastIndexOf(key);
      // Selecting a previously visited stage behaves like Back: discard the
      // forward branch. Selecting a new stage pushes it onto the trail.
      return existingIndex >= 0 ? previous.slice(0, existingIndex + 1) : [...previous, key];
    });
  };

  const handleRunCode = () => {
    setHasRunCode(true);
  };

  const handleSelectPredictOption = (qIdx: number, optId: string) => {
    soundFX.playClick();
    setPredictAnswers((prev) => ({ ...prev, [qIdx]: optId }));
    const question = lessonData.predict?.questions[qIdx];
    const opt = question?.options.find((o) => o.id === optId);
    if (opt?.isCorrect) {
      soundFX.playSuccess();
    }
  };

  // Temp auto fill correct answers for Predict stage
  const handleAutoFillPredictAnswers = () => {
    if (!lessonData.predict) return;
    soundFX.playSuccess();
    const correctMap: Record<number, string> = {};
    lessonData.predict.questions.forEach((q, idx) => {
      const correctOpt = q.options.find((opt) => opt.isCorrect);
      if (correctOpt) {
        correctMap[idx] = correctOpt.id;
      }
    });
    setPredictAnswers(correctMap);
    // Reveal all questions so user can inspect or advance immediately
    setPredictRevealStep(lessonData.predict.questions.length);
  };

  const isDark = theme === 'dark';

  // If detailed tutorial is requested, show full tutorial screen
  if (showDetailedTutorial && detailedTutorial) {
    return (
      <DetailedTutorialView
        tutorial={detailedTutorial}
        isDark={isDark}
        onBack={closeDetailedTutorial}
        onToggleTheme={onToggleTheme}
        oldVersionAvailable={!!oldDetailedTutorial}
        isShowingOldVersion={showOldTutorialVersion}
        onToggleOldVersion={() => setShowOldTutorialVersion((v) => !v)}
      />
    );
  }

  if (currentStageKey === 'writeRun' && lessonData.writeRun) {
    return (
      <div
        className={`fixed inset-0 z-40 w-full h-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center p-0 select-none ${
          isDark ? 'bg-[#06080e]' : 'bg-[#0f141f]'
        }`}
      >
        <WriteRun
          data={lessonData.writeRun}
          topicTitle={lessonData.topicTitle}
          isDark={isDark}
          revealStep={writeRunRevealStep}
          setRevealStep={setWriteRunRevealStep}
          userCode={userCode}
          setUserCode={setUserCode}
          hasRunCode={hasRunCode}
          setHasRunCode={setHasRunCode}
          actualOutput={actualOutput}
          setActualOutput={setActualOutput}
          onRunCode={handleRunCode}
          onContinue={handleNextStage}
          onBack={handlePreviousStage}
          nextStageLabel={nextStageLabel}
        />
      </div>
    );
  }

  if (currentStageKey === 'debug' && lessonData.debug) {
    return (
      <div
        className={`fixed inset-0 z-40 w-full h-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center p-0 select-none ${
          isDark ? 'bg-[#06080e]' : 'bg-[#0f141f]'
        }`}
      >
        <DebugIde
          data={lessonData.debug}
          topicTitle={lessonData.topicTitle}
          isDark={isDark}
          onContinue={handleNextStage}
          onBack={handlePreviousStage}
          nextStageLabel={nextStageLabel}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center select-none pb-2 transition-colors duration-300 ${
        isDark ? 'bg-[#0f131d] text-[#dfe2f1]' : 'bg-[#f1f4f9] text-slate-800'
      }`}
    >
      {/* ================= STICKY ELEVATED TOOLBAR (NATIVE ANDROID STYLE) ================= */}
      <header
        className={`sticky top-0 z-50 w-full pt-safe transition-colors duration-200 border-b ${
          isDark
            ? 'bg-[#0f131d]/95 backdrop-blur-md border-[#262c3d] shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 backdrop-blur-md border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 h-14 flex items-center justify-between">
          {/* Back button -- matches the shared Header's back button used on Listing */}
          <button
            aria-label="Go back"
            type="button"
            onClick={handlePreviousStage}
            className={`w-9 h-9 rounded-xl neu-raised flex items-center justify-center active:neu-pressed transition-all ${
              isDark ? 'bg-[#151b28] text-slate-200' : 'bg-[#e8eaf0] text-[#1e2433]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Current Step Name in Toolbar (Learn, Explore, Predict, Write & Run, Mastered) */}
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`font-['Outfit'] font-bold text-base tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {`Stage ${currentStageIndex + 1} - ${STAGE_LABELS[currentStageKey]}`}
            </h1>
          </div>

          {/* Action / Tools Area in Toolbar */}
          <div className="flex items-center gap-1.5">
            {/* Detailed Tutorial Book Button & Guidance Tooltip on Stage 1 Learn */}
            {currentStageIndex === 0 && (
              <div className="relative">
                <button
                  type="button"
                  id="stage1-tutorial-btn"
                  ref={tutorialButtonRef}
                  onClick={() => {
                    soundFX.playClick();
                    openDetailedTutorial();
                    setShowTutorialHint(false);
                  }}
                  onMouseEnter={() => setIsHoveringTutorialBtn(true)}
                  onMouseLeave={() => setIsHoveringTutorialBtn(false)}
                  className={`relative w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm ${
                    isDark
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400/50'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300'
                  }`}
                  aria-label="Open detailed tutorial"
                  title="Detailed Tutorial"
                >
                  <span className="material-symbols-outlined text-[20px] text-indigo-600 dark:text-indigo-400">
                    auto_stories
                  </span>
                  <span className="tutorial-hint-dot" aria-hidden="true" />
                </button>

                {/* Guidance Tooltip */}
                {showTutorialHint && detailedTutorial && (
                  <div
                    ref={tutorialHintRef}
                    role="tooltip"
                    aria-live="polite"
                    className={`tutorial-hint ${
                      isDark ? 'tutorial-hint-dark text-slate-100' : 'tutorial-hint-light text-slate-900'
                    } absolute right-0 top-[calc(100%+12px)] z-50 w-72 max-w-[calc(100vw-28px)] rounded-2xl p-4`}
                  >
                    <span
                      className={`tutorial-hint-arrow ${
                        isDark ? 'tutorial-arrow-dark' : 'tutorial-arrow-light'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Header with icon & close */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`flex items-center justify-center w-6 h-6 rounded-lg shrink-0 ${
                          isDark
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
                        }`}>
                          <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                        </span>
                        <span className={`font-['Outfit'] font-bold text-[11px] tracking-wider uppercase truncate ${
                          isDark ? 'text-indigo-400' : 'text-slate-800'
                        }`}>
                          Detailed Tutorial
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-label="Close tutorial hint"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFX.playClick();
                          setShowTutorialHint(false);
                        }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>

                    {/* Explanatory text */}
                    <p className={`text-[12px] leading-relaxed mb-3.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Tap this{' '}
                      <span className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded-md text-[11px] align-baseline ${
                        isDark
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                      }`}>
                        <span className="material-symbols-outlined text-[13px] text-indigo-600 dark:text-indigo-400">auto_stories</span>
                        book icon
                      </span>{' '}
                      anytime for an in-depth guide with code breakdowns, mental models, and quick cheatsheets.
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          openDetailedTutorial();
                          setShowTutorialHint(false);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl font-['Outfit'] text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 active:scale-[0.98] shadow-sm shadow-indigo-600/25 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                        <span>Open Guide</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          setShowTutorialHint(false);
                        }}
                        className={`px-3 py-2 rounded-xl font-['Outfit'] text-[11px] font-semibold border transition-all active:scale-[0.98] cursor-pointer ${
                          isDark
                            ? 'border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        Got it
                      </button>
                    </div>
                  </div>
                )}

                {/* Hover Tooltip (shows on hover after the main hint is closed) */}
                {!showTutorialHint && isHoveringTutorialBtn && (
                  <div
                    role="tooltip"
                    className={`absolute right-0 top-[calc(100%+8px)] z-50 whitespace-nowrap rounded-xl px-2.5 py-1.5 text-[11px] font-medium pointer-events-none transition-all flex items-center gap-1.5 shadow-xl ${
                      isDark
                        ? 'bg-[#151b28] text-slate-200 border border-white/10 shadow-black/60'
                        : 'bg-slate-900 text-white shadow-slate-900/25'
                    }`}
                  >
                    <span
                      className={`absolute right-[13px] -top-1 w-2 h-2 rotate-45 ${
                        isDark ? 'bg-[#151b28] border-l border-t border-white/10' : 'bg-slate-900'
                      }`}
                    />
                    <span className="material-symbols-outlined text-[14px] text-indigo-400">auto_stories</span>
                    <span>Detailed Tutorial Guide</span>
                  </div>
                )}
              </div>
            )}

            {/* Temp: Auto Fill Answer Button on the Predict stage */}
            {currentStageKey === 'predict' && (
              <button
                type="button"
                onClick={handleAutoFillPredictAnswers}
                className={`text-[11px] font-semibold font-mono px-2 py-1 rounded-lg border flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                }`}
                title="Temporary Tool: Auto fill correct answers for all predict questions"
              >
                <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                <span>Auto Fill</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                aria-label="Toggle theme"
                type="button"
                onClick={onToggleTheme}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'text-amber-400 hover:text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="w-full max-w-2xl mx-auto px-1.5 sm:px-3 pt-2 flex flex-col">
        {/* ================= PROGRESS STRIP (SHOWS LESSON NAME + STEP PROGRESS) ================= */}
        <div className="relative mb-3">
        <section
          className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d] shadow-sm'
              : 'bg-white/90 backdrop-blur-sm border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
            <span
              className={`font-['Outfit'] font-semibold text-xs tracking-wide truncate ${
                isDark ? 'text-indigo-300' : 'text-indigo-900'
              }`}
            >
              {lessonData.topicTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {activeStages.map((key, idx) => {
              const isActive = idx === currentStageIndex;
              const isPassed = idx < currentStageIndex;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleJumpToStage(key)}
                  className={`rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-500/40'
                      : isPassed
                      ? 'w-2 h-2 bg-indigo-600'
                      : isDark
                      ? 'w-1.5 h-1.5 bg-slate-700'
                      : 'w-1.5 h-1.5 bg-slate-300'
                  }`}
                  title={`Stage ${idx + 1} - ${STAGE_LABELS[key]}`}
                />
              );
            })}
          </div>
        </section>
        </div>

        {/* ================= LEARN ================= */}
        {currentStageKey === 'learn' && (
          <Learn
            data={lessonData.learn}
            isDark={isDark}
            revealStep={learnRevealStep}
            setRevealStep={setLearnRevealStep}
            onContinue={handleNextStage}
            onSkip={() => setShowSkipMenu(true)}
            nextStageLabel={nextStageLabel}
            tapToRevealEnabled={tapToRevealEnabled}
          />
        )}

        {/* ================= EXPLORE (only when this lesson uses it) ================= */}
        {currentStageKey === 'explore' && lessonData.explore && (
          <Explore
            data={lessonData.explore}
            isDark={isDark}
            revealStep={exploreRevealStep}
            setRevealStep={setExploreRevealStep}
            exploreCardIndex={exploreCardIndex}
            setExploreCardIndex={setExploreCardIndex}
            scrollToElement={scrollToElement}
            onContinue={handleNextStage}
            nextStageLabel={nextStageLabel}
          />
        )}

        {/* ================= PREDICT / MCQ (only when this lesson uses it) ================= */}
        {currentStageKey === 'predict' && lessonData.predict && (
          <Predict
            data={lessonData.predict}
            isDark={isDark}
            revealStep={predictRevealStep}
            setRevealStep={setPredictRevealStep}
            predictAnswers={predictAnswers}
            activePredictCardIdx={activePredictCardIdx}
            setActivePredictCardIdx={setActivePredictCardIdx}
            onSelectOption={handleSelectPredictOption}
            scrollToElement={scrollToElement}
            onContinue={handleNextStage}
            nextStageLabel={nextStageLabel}
          />
        )}

        {/* ================= MASTERED ================= */}
        {currentStageKey === 'mastered' && (
          <Mastered
            data={lessonData.mastered}
            stageName={lessonData.stageName}
            isDark={isDark}
            onContinue={handleNextStage}
          />
        )}

        {/* Skip to Next Screen Modal (Jump to screens 2, 3, 4, 5...) */}
        <SkipStageModal
          isOpen={showSkipMenu}
          onClose={() => setShowSkipMenu(false)}
          activeStages={activeStages}
          currentStageIndex={currentStageIndex}
          onSelectStage={(targetStage) => {
            setLearnRevealStep(10);
            handleJumpToStage(targetStage);
          }}
          isDark={isDark}
        />
      </div>
    </div>
  );
});

Detail.displayName = 'Detail';
