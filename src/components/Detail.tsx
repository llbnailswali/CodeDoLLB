import React, { useState, useEffect } from 'react';
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

const STAGE_TITLES: Record<number, string> = {
  1: 'Stage 1 - LEARN',
  2: 'Stage 2 - EXPLORE',
  3: 'Stage 3 - PREDICT',
  4: 'Stage 4 - WRITE & RUN',
  5: 'Stage 5 - DEBUG',
  6: 'Stage 6 - MASTERED',
};

export const Detail: React.FC<DetailProps> = ({
  theme,
  initialLessonKey = 'functions',
  userStats,
  onExit,
  onCompleteLesson,
  onToggleTheme,
}) => {
  const [currentLessonKey] = useState<string>(initialLessonKey);
  const [currentStage, setCurrentStage] = useState<number>(1); // 1: Learn, 2: Explore, 3: Predict, 4: WriteRun, 5: Mastered
  const [exploreCardIndex, setExploreCardIndex] = useState<number>(0);

  // Preserve reveal steps across stage navigation (when user clicks back/forward)
  const [learnRevealStep, setLearnRevealStep] = useState<number>(0);
  const [exploreRevealStep, setExploreRevealStep] = useState<number>(0);
  const [predictRevealStep, setPredictRevealStep] = useState<number>(0);
  const [writeRunRevealStep, setWriteRunRevealStep] = useState<number>(3);

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
  const [userCode, setUserCode] = useState<string>(lessonData.writeRun.initialCode);
  const [hasRunCode, setHasRunCode] = useState<boolean>(false);
  const [actualOutput, setActualOutput] = useState<string>(lessonData.writeRun.expectedOutput);

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

  // Sync browser/device back button with screen back button
  useEffect(() => {
    window.history.replaceState({ codedoStage: 1 }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.codedoStage === 'number') {
        setCurrentStage(e.state.codedoStage);
        scrollToTop();
      } else {
        onExit();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onExit]);

  // Note: Stage 2 (Explore) and Stage 3 (Predict) indicator highlighting and scroll sync
  // are managed directly inside their respective components to avoid fluctuation during
  // tap-to-continue programmatic scrolls and only sync when user manually scrolls.

  const handleNextStage = () => {
    soundFX.playClick();
    if (currentStage < 6) {
      const nextStage = currentStage + 1;
      window.history.pushState({ codedoStage: nextStage }, '');
      setCurrentStage(nextStage);
      scrollToTop();
    } else {
      soundFX.playSuccess();
      onCompleteLesson(lessonData.mastered.xpEarned);
    }
  };

  const handlePreviousStage = () => {
    soundFX.playClick();
    if (currentStage > 1) {
      window.history.back();
    } else {
      onExit();
    }
  };

  const handleJumpToStage = (step: number) => {
    soundFX.playClick();
    window.history.pushState({ codedoStage: step }, '');
    setCurrentStage(step);
    scrollToTop();
  };

  const handleRunCode = () => {
    setHasRunCode(true);
  };

  const handleSelectPredictOption = (qIdx: number, optId: string) => {
    soundFX.playClick();
    setPredictAnswers((prev) => ({ ...prev, [qIdx]: optId }));
    const question = lessonData.predict.questions[qIdx];
    const opt = question?.options.find((o) => o.id === optId);
    if (opt?.isCorrect) {
      soundFX.playSuccess();
    }
  };

  // Temp auto fill correct answers for Predict stage
  const handleAutoFillPredictAnswers = () => {
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
          {/* Back button */}
          <button
            aria-label="Go back"
            type="button"
            onClick={handlePreviousStage}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
              isDark
                ? 'text-slate-200 hover:text-white hover:bg-white/10'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>

          {/* Current Step Name in Toolbar (Learn, Explore, Predict, Write & Run, Mastered) */}
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`font-['Outfit'] font-bold text-base tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {STAGE_TITLES[currentStage] || 'Learn'}
            </h1>
          </div>

          {/* Action / Tools Area in Toolbar */}
          <div className="flex items-center gap-1.5">
            {/* Temp: Skip Tap Flow Button on Step 1 */}
            {currentStage === 1 && (
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
                    {[
                      { stage: 1, label: 'Stage 1: Learn (Full)' },
                      { stage: 2, label: 'Stage 2: Explore' },
                      { stage: 3, label: 'Stage 3: Predict' },
                      { stage: 4, label: 'Stage 4: Write & Run' },
                      { stage: 5, label: 'Stage 5: Debug' },
                      { stage: 6, label: 'Stage 6: Mastered' },
                    ].map((item) => (
                      <button
                        key={item.stage}
                        type="button"
                        onClick={() => {
                          setShowSkipMenu(false);
                          if (item.stage === 1) {
                            // Max out reveal step so it's fully revealed
                            setLearnRevealStep(10);
                          }
                          handleJumpToStage(item.stage);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          currentStage === item.stage
                            ? 'bg-indigo-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currentStage === item.stage && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Temp: Auto Fill Answer Button on Predict Screen (Step 3) */}
            {currentStage === 3 && (
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
            {[1, 2, 3, 4, 5, 6].map((step) => {
              const isActive = step === currentStage;
              const isPassed = step < currentStage;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleJumpToStage(step)}
                  className={`rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-500/40'
                      : isPassed
                      ? 'w-2 h-2 bg-indigo-600'
                      : isDark
                      ? 'w-1.5 h-1.5 bg-slate-700'
                      : 'w-1.5 h-1.5 bg-slate-300'
                  }`}
                  title={STAGE_TITLES[step]}
                />
              );
            })}
          </div>
        </section>

        {/* ================= STEP 1: LEARN ================= */}
        {currentStage === 1 && (
          <Learn
            data={lessonData.learn}
            isDark={isDark}
            revealStep={learnRevealStep}
            setRevealStep={setLearnRevealStep}
            onContinue={handleNextStage}
            renderSnippetLine={renderSnippetLine}
          />
        )}

        {/* ================= STEP 2: EXPLORE ================= */}
        {currentStage === 2 && (
          <Explore
            data={lessonData.explore}
            isDark={isDark}
            revealStep={exploreRevealStep}
            setRevealStep={setExploreRevealStep}
            exploreCardIndex={exploreCardIndex}
            setExploreCardIndex={setExploreCardIndex}
            scrollToElement={scrollToElement}
            onContinue={handleNextStage}
          />
        )}

        {/* ================= STEP 3: PREDICT ================= */}
        {currentStage === 3 && (
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
          />
        )}

        {/* ================= STEP 4: WRITE & RUN ================= */}
        {currentStage === 4 && (
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
          />
        )}

        {/* ================= STEP 5: DEBUG ================= */}
        {currentStage === 5 && (
          <Debug
            data={lessonData.debug}
            topicTitle={lessonData.topicTitle}
            isDark={isDark}
            onContinue={handleNextStage}
          />
        )}

        {/* ================= STEP 6: MASTERED ================= */}
        {currentStage === 6 && (
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
};
