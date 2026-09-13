import React, { useState, useEffect } from 'react';
import { AppTheme, UserStats } from '../types';
import { FiveStageLesson, AVAILABLE_FIVE_STAGE_LESSONS } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

// 5 Lesson Stage Components (1: Learn, 2: Explore, 3: Predict, 4: Write & Run, 5: Mastered)
import { Learn } from './Learn';
import { Explore } from './Explore';
import { Predict } from './Predict';
import { WriteRun } from './WriteRun';
import { Mastered } from './Mastered';

interface DetailProps {
  theme: AppTheme;
  initialLessonKey?: string;
  userStats: UserStats;
  onExit: () => void;
  onCompleteLesson: (earnedXP: number) => void;
  onToggleTheme?: () => void;
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
  5: 'Stage 5 - MASTERED',
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
  const [writeRunRevealStep, setWriteRunRevealStep] = useState<number>(0);

  // Predict state: support all questions, no default selected answer
  const [predictAnswers, setPredictAnswers] = useState<Record<number, string>>({});
  const [activePredictCardIdx, setActivePredictCardIdx] = useState<number>(0);

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

  // Sync scroll position with Step 2 (Explore) example chips
  useEffect(() => {
    if (currentStage !== 2) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cards = lessonData.explore.cards;
          const rootEl = document.getElementById('root');
          const currentScroll = rootEl && rootEl.scrollTop > 0 ? rootEl.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0);
          const scrollPos = currentScroll + 140;
          for (let i = cards.length - 1; i >= 0; i--) {
            const el = document.getElementById(`explore-card-${i}`);
            if (el && el.offsetTop <= scrollPos) {
              setExploreCardIndex((prev) => (prev !== i ? i : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rootEl) {
        rootEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentStage, lessonData.explore.cards]);

  // Sync scroll position with Step 3 (Predict) question chips
  useEffect(() => {
    if (currentStage !== 3) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const questions = lessonData.predict.questions;
          const rootEl = document.getElementById('root');
          const currentScroll = rootEl && rootEl.scrollTop > 0 ? rootEl.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0);
          const scrollPos = currentScroll + 140;
          for (let i = questions.length - 1; i >= 0; i--) {
            const el = document.getElementById(`predict-q-${i}`);
            if (el && el.offsetTop <= scrollPos) {
              setActivePredictCardIdx((prev) => (prev !== i ? i : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rootEl) {
        rootEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentStage, lessonData.predict.questions]);

  const handleNextStage = () => {
    soundFX.playClick();
    if (currentStage < 5) {
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
    soundFX.playClick();
    setHasRunCode(true);
    setActualOutput(lessonData.writeRun.expectedOutput);
    soundFX.playSuccess();
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

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            {onToggleTheme ? (
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
            ) : (
              <div className="w-9" />
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
            {[1, 2, 3, 4, 5].map((step) => {
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
            onRunCode={handleRunCode}
            onContinue={handleNextStage}
          />
        )}

        {/* ================= STEP 5: MASTERED ================= */}
        {currentStage === 5 && (
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
