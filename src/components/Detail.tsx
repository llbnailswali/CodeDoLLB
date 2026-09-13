import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { AppTheme, UserStats } from '../types';
import { FiveStageLesson, AVAILABLE_FIVE_STAGE_LESSONS } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

// 6 Lesson Stage Components (1: Learn, 2: Explore, 3: Predict, 4: Write & Run, 5: Debug, 6: Mastered)
import { Learn } from './Learn';
import { Explore } from './Explore';
import { Predict } from './Predict';
import { WriteRun } from './WriteRun';
import { Debug } from './Debug';
import { Mastered } from './Mastered';

interface DetailProps {
  theme: AppTheme;
  initialLessonKey?: string;
  userStats: UserStats;
  onExit: () => void;
  onCompleteLesson: (earnedXP: number) => void;
  onToggleTheme?: () => void;
  tapToRevealEnabled?: boolean;
  onToggleTapToReveal?: () => void;
}

// Lets the parent (App.tsx) drive stage-by-stage back navigation from the
// Android hardware back button, without Detail needing its own browser-
// history hack.
export interface DetailHandle {
  goBack: () => void;
}

const renderSnippetLine = (line: string, isDark: boolean) => {
  const trimmed = line.trim();
  const indent = line.startsWith('    ') || line.startsWith('\t');
  const indentClass = indent ? 'pl-4' : '';

  if (trimmed.startsWith('//')) {
    return (
      <div className={`${indentClass} ${isDark ? 'text-slate-500 italic' : 'text-slate-400 italic'}`}>
        {line}
      </div>
    );
  }

  if (trimmed.startsWith('fun ')) {
    const afterFun = trimmed.slice(4);
    const parenIdx = afterFun.indexOf('(');
    const fnName = parenIdx !== -1 ? afterFun.slice(0, parenIdx) : afterFun;
    const rest = parenIdx !== -1 ? afterFun.slice(parenIdx) : '';
    return (
      <div className={indentClass}>
        <span className={isDark ? 'text-[#c084fc] font-semibold' : 'text-indigo-600 font-semibold'}>fun</span>{' '}
        <span className={isDark ? 'text-[#93c5fd] font-semibold' : 'text-indigo-900 font-semibold'}>{fnName}</span>
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>{rest}</span>
      </div>
    );
  }

  if (trimmed.startsWith('for ')) {
    return (
      <div className={indentClass}>
        <span className={isDark ? 'text-[#c084fc] font-semibold' : 'text-indigo-600 font-semibold'}>for</span>{' '}
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>(</span>
        <span className={isDark ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>i</span>{' '}
        <span className={isDark ? 'text-[#c084fc] font-semibold' : 'text-indigo-600 font-semibold'}>in</span>{' '}
        <span className={isDark ? 'text-[#fbbf24]' : 'text-amber-600'}>1..3</span>
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>) {'{'}</span>
      </div>
    );
  }

  if (trimmed.startsWith('val ') || trimmed.startsWith('var ')) {
    const kw = trimmed.startsWith('val ') ? 'val' : 'var';
    const rest = trimmed.slice(4);
    const eqIdx = rest.indexOf('=');
    if (eqIdx !== -1) {
      const lhs = rest.slice(0, eqIdx).trim();
      const rhs = rest.slice(eqIdx + 1).trim();
      return (
        <div className={indentClass}>
          <span className={isDark ? 'text-[#c084fc] font-semibold' : 'text-indigo-600 font-semibold'}>{kw}</span>{' '}
          <span className={isDark ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>{lhs}</span>{' '}
          <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>=</span>{' '}
          <span className={isDark ? 'text-[#34d399]' : 'text-emerald-600'}>{rhs}</span>
        </div>
      );
    }
  }

  if (trimmed.startsWith('println(')) {
    const inside = trimmed.slice(8, trimmed.lastIndexOf(')'));
    return (
      <div className={indentClass}>
        <span className={isDark ? 'text-[#38bdf8]' : 'text-blue-600'}>println</span>
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>(</span>
        <span className={isDark ? 'text-[#34d399]' : 'text-emerald-600'}>{inside}</span>
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>)</span>
      </div>
    );
  }

  if (trimmed.startsWith('return ')) {
    const expr = trimmed.slice(7);
    return (
      <div className={indentClass}>
        <span className={isDark ? 'text-[#c084fc] font-semibold' : 'text-indigo-600 font-semibold'}>return</span>{' '}
        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{expr}</span>
      </div>
    );
  }

  if (trimmed === '}') {
    return (
      <div className={indentClass}>
        <span className={isDark ? 'text-[#94a3b8]' : 'text-slate-700'}>{'}'}</span>
      </div>
    );
  }

  return <div className={`${indentClass} ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{line}</div>;
};

// The six possible stage keys, in their fixed relative order. Which ones are
// actually present for a given lesson depends on its data (see activeStages
// below) -- Learn and Mastered always run; the rest only run when the lesson
// provides that stage's data, per CODEDO_MASTER_PLAN.md's "topic-aware
// activity selection" (e.g. a purely conceptual topic may only need
// Learn -> Predict-as-MCQ -> Mastered).
type StageKey = 'learn' | 'explore' | 'predict' | 'writeRun' | 'debug' | 'mastered';

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
  userStats,
  onExit,
  onCompleteLesson,
  onToggleTheme,
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
  const [actualOutput, setActualOutput] = useState<string>(lessonData.writeRun?.expectedOutput ?? '');

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
  const [currentStageKey, setCurrentStageKey] = useState<StageKey>(activeStages[0]);
  const currentStageIndex = activeStages.indexOf(currentStageKey);
  const nextStageKey = activeStages[currentStageIndex + 1];
  const nextStageLabel = nextStageKey ? STAGE_CONTINUE_LABELS[nextStageKey] : undefined;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      setCurrentStageKey(activeStages[currentStageIndex + 1]);
      scrollToTop();
    } else {
      soundFX.playSuccess();
      onCompleteLesson(lessonData.mastered.xpEarned);
    }
  };

  const handlePreviousStage = () => {
    soundFX.playClick();
    if (currentStageIndex > 0) {
      setCurrentStageKey(activeStages[currentStageIndex - 1]);
      scrollToTop();
    } else {
      onExit();
    }
  };

  // Exposed so the app-wide hardware back-button handler (App.tsx) can step
  // back through lesson stages the same way the in-screen back arrow does.
  useImperativeHandle(ref, () => ({
    goBack: handlePreviousStage,
  }));

  const handleJumpToStage = (key: StageKey) => {
    soundFX.playClick();
    setCurrentStageKey(key);
    scrollToTop();
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

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center select-none pb-2 transition-colors duration-300 ${
        isDark ? 'bg-[#0f131d] text-[#dfe2f1]' : 'bg-[#f1f4f9] text-slate-800'
      }`}
    >
      {/* ================= STICKY ELEVATED TOOLBAR (NATIVE ANDROID STYLE) ================= */}
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
          isDark
            ? 'bg-[#0f131d]/95 backdrop-blur-md border-[#262c3d] shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 backdrop-blur-md border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="w-full max-w-md mx-auto px-4 h-14 flex items-center justify-between">
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
            {/* Temp: Skip Tap Flow Button on the first active stage */}
            {currentStageIndex === 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSkipMenu((prev) => !prev)}
                  className={`text-[11px] font-semibold font-mono px-2 py-1 rounded-lg border flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                      : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  }`}
                  title="Temporary Skip: Jump directly to any stage without tap-to-reveal"
                >
                  <span className="material-symbols-outlined text-[14px]">fast_forward</span>
                  <span>Skip</span>
                </button>

                {/* Dropdown to jump directly to any desired stage */}
                {showSkipMenu && (
                  <div
                    className={`absolute right-0 top-full mt-1.5 w-44 rounded-xl border p-1.5 shadow-xl z-50 transition-all ${
                      isDark ? 'bg-[#151b28] border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Jump to Screen:
                    </div>
                    {activeStages.map((key, idx) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setShowSkipMenu(false);
                          if (key === 'learn') {
                            // Max out reveal step so it's fully revealed
                            setLearnRevealStep(10);
                          }
                          handleJumpToStage(key);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          currentStageKey === key
                            ? 'bg-indigo-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{`Stage ${idx + 1}: ${STAGE_LABELS[key]}`}</span>
                        {currentStageKey === key && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </button>
                    ))}
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
      <div className="w-full max-w-md px-4 pt-3 flex flex-col">
        {/* ================= PROGRESS STRIP (SHOWS LESSON NAME + STEP PROGRESS) ================= */}
        <section
          className={`mb-4 flex items-center justify-between px-4 py-2.5 rounded-2xl border transition-all ${
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

        {/* ================= LEARN ================= */}
        {currentStageKey === 'learn' && (
          <Learn
            data={lessonData.learn}
            isDark={isDark}
            revealStep={learnRevealStep}
            setRevealStep={setLearnRevealStep}
            onContinue={handleNextStage}
            renderSnippetLine={renderSnippetLine}
            nextStageLabel={nextStageLabel}
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

        {/* ================= WRITE & RUN (only when this lesson uses it) ================= */}
        {currentStageKey === 'writeRun' && lessonData.writeRun && (
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
            nextStageLabel={nextStageLabel}
          />
        )}

        {/* ================= DEBUG (only when this lesson uses it) ================= */}
        {currentStageKey === 'debug' && lessonData.debug && (
          <Debug
            data={lessonData.debug}
            topicTitle={lessonData.topicTitle}
            isDark={isDark}
            revealStep={debugRevealStep}
            setRevealStep={setDebugRevealStep}
            onContinue={handleNextStage}
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
      </div>
    </div>
  );
});

Detail.displayName = 'Detail';
