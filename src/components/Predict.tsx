import React, { useEffect, useRef } from 'react';
import { Stage3PredictData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

interface PredictStageProps {
  data: Stage3PredictData;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  predictAnswers: Record<number, string>;
  activePredictCardIdx: number;
  setActivePredictCardIdx: (idx: number) => void;
  onSelectOption: (qIdx: number, optId: string) => void;
  scrollToElement: (id: string, offset?: number) => void;
  onContinue: () => void;
  tapToRevealEnabled?: boolean;
}

export const Predict: React.FC<PredictStageProps> = ({
  data,
  isDark,
  revealStep,
  setRevealStep,
  predictAnswers,
  activePredictCardIdx,
  setActivePredictCardIdx,
  onSelectOption,
  scrollToElement,
  onContinue,
  tapToRevealEnabled = true,
}) => {
  const totalQuestions = data.questions.length;
  const maxRevealStep = totalQuestions;

  // Helper to determine if question is answered correctly
  const isQuestionCorrect = (qIdx: number): boolean => {
    const selectedOptId = predictAnswers[qIdx];
    if (!selectedOptId) return false;
    const question = data.questions[qIdx];
    const opt = question?.options.find((o) => o.id === selectedOptId);
    return opt?.isCorrect ?? false;
  };

  // Helper to determine if question has any answer selected
  const isQuestionAnswered = (qIdx: number): boolean => {
    return predictAnswers[qIdx] !== undefined;
  };

  // Only correct answers unlock the next question
  // When revealStep is 0 (initial step before revealing first question), tapping to reveal Q1 is allowed.
  // Once revealStep >= 1, all questions revealed so far (0 .. revealStep - 1) must have a correct answer.
  const allRevealedCorrect =
    revealStep === 0 ||
    Array.from({ length: revealStep }).every((_, i) => isQuestionCorrect(i));
  const canContinue = !tapToRevealEnabled || allRevealedCorrect;
  const isFullyRevealed = !tapToRevealEnabled || revealStep >= maxRevealStep;
  const allQuestionsCorrect = data.questions.every((_, idx) =>
    isQuestionCorrect(idx)
  );

  // Status of the current active question (revealStep - 1)
  const currentQIdx = Math.max(0, revealStep - 1);
  const currentQAnswered = isQuestionAnswered(currentQIdx);

  // Refs for smooth scroll & user scroll detection without highlight fluctuation
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const programmaticTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate exact offset so the question section is scrolled to sit JUST below the sticky indicator bar
  const getIndicatorBottomOffset = () => {
    const indicatorEl = document.getElementById('predict-indicator-bar');
    const indicatorHeight = indicatorEl ? indicatorEl.offsetHeight : 44;
    return 56 + indicatorHeight + 8; // 56px top toolbar + indicator bar height + 8px minor spacing
  };

  // Helper to scroll to first unsolved/incorrect question if user tries to continue without answering correctly
  const scrollToUnsolved = () => {
    const firstUnsolvedIdx = Array.from({ length: Math.max(revealStep, 1) }).findIndex(
      (_, i) => !isQuestionCorrect(i)
    );
    const targetIdx = firstUnsolvedIdx !== -1 ? firstUnsolvedIdx : activePredictCardIdx;
    setActivePredictCardIdx(targetIdx);
    requestAnimationFrame(() => {
      setTimeout(() => {
        const offset = getIndicatorBottomOffset();
        scrollToElement(`predict-q-${targetIdx}`, offset);
      }, 50);
    });
  };

  // When user taps to continue: reveal indicator and question, highlight relevant number, and scroll so question sits just below indicator
  const handleNextReveal = () => {
    if (!canContinue) {
      scrollToUnsolved();
      return;
    }

    soundFX.playClick();
    if (revealStep < maxRevealStep) {
      const nextStep = revealStep + 1;
      const targetQuestionIdx = nextStep - 1;

      isProgrammaticScrollRef.current = true;
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

      setRevealStep(nextStep);
      setActivePredictCardIdx(targetQuestionIdx);

      requestAnimationFrame(() => {
        setTimeout(() => {
          const offset = getIndicatorBottomOffset();
          scrollToElement(`predict-q-${targetQuestionIdx}`, offset);

          programmaticTimerRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 750);
        }, 60);
      });
    }
  };

  // When user directly taps an indicator button: highlight that question and scroll so it sits just below indicator
  const handleIndicatorClick = (idx: number) => {
    // If in non-tap mode or idx is already revealed, allow navigating to it
    if (!tapToRevealEnabled || idx < revealStep) {
      soundFX.playClick();
      isProgrammaticScrollRef.current = true;
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

      setActivePredictCardIdx(idx);

      requestAnimationFrame(() => {
        setTimeout(() => {
          const offset = getIndicatorBottomOffset();
          scrollToElement(`predict-q-${idx}`, offset);

          programmaticTimerRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 750);
        }, 60);
      });
      return;
    }

    // If idx is the next unrevealed question, allow revealing it ONLY if current questions are answered
    if (idx === revealStep && canContinue) {
      handleNextReveal();
      return;
    }

    // If clicked a locked question without answering correctly, scroll to unsolved question
    if (!canContinue) {
      scrollToUnsolved();
    }
  };

  // When user clicks a card directly
  const handleCardClick = (idx: number) => {
    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

    setActivePredictCardIdx(idx);

    programmaticTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 400);
  };

  // Scroll screen to bottom helper when an answer is selected
  const scrollToBottom = () => {
    isProgrammaticScrollRef.current = true;
    if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);

    // Double frame + small timeout ensures feedback drawer DOM has mounted and layout reflowed
    requestAnimationFrame(() => {
      setTimeout(() => {
        const bottomAnchor = document.getElementById('predict-bottom-anchor');
        if (bottomAnchor) {
          bottomAnchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        const rootEl = document.getElementById('root');
        if (rootEl && rootEl.scrollHeight > rootEl.clientHeight) {
          rootEl.scrollTo({ top: rootEl.scrollHeight, behavior: 'smooth' });
        }

        window.scrollTo({
          top: Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
          ),
          behavior: 'smooth',
        });

        programmaticTimerRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 750);
      }, 100);
    });
  };

  // When user selects an answer option
  const handleSelectOption = (qIdx: number, optId: string) => {
    setActivePredictCardIdx(qIdx);
    onSelectOption(qIdx, optId);
    scrollToBottom();
  };

  // Keep the scrolling-highlight in sync whenever the content is scrolled
  useEffect(() => {
    const handleUserGesture = () => {
      // User manual interaction takes precedence over programmatic scroll lock
      isProgrammaticScrollRef.current = false;
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    };

    const rootEl = document.getElementById('root');
    const gestureTargets: (Window | HTMLElement)[] = [window];
    if (rootEl) gestureTargets.push(rootEl);

    gestureTargets.forEach((target) => {
      target.addEventListener('touchstart', handleUserGesture, { passive: true });
      target.addEventListener('touchmove', handleUserGesture, { passive: true });
      target.addEventListener('wheel', handleUserGesture, { passive: true });
      target.addEventListener('pointerdown', handleUserGesture, { passive: true });
      target.addEventListener('keydown', handleUserGesture as EventListener, { passive: true });
    });

    let ticking = false;
    const updateActiveQuestionOnScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      // In non-tap mode (!tapToRevealEnabled), all questions are visible
      const visibleCount = !tapToRevealEnabled ? totalQuestions : Math.min(revealStep, totalQuestions);
      if (visibleCount <= 0) return;

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (rootEl ? rootEl.scrollTop : 0);

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        rootEl ? rootEl.scrollHeight : 0
      );

      const clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        (rootEl ? rootEl.clientHeight : 0);

      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

      if (isAtBottom) {
        setActivePredictCardIdx(visibleCount - 1);
        return;
      }

      const headerOffset = getIndicatorBottomOffset();
      let matchedIdx = 0;
      for (let i = visibleCount - 1; i >= 0; i--) {
        const el = document.getElementById(`predict-q-${i}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerOffset + 60) {
          matchedIdx = i;
          break;
        }
      }
      setActivePredictCardIdx(matchedIdx);
    };

    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        updateActiveQuestionOnScroll();
        ticking = false;
      });
      ticking = true;
    };

    const handleScrollEnd = () => {
      isProgrammaticScrollRef.current = false;
      updateActiveQuestionOnScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scrollend', handleScrollEnd, { passive: true });
    if (rootEl) {
      rootEl.addEventListener('scroll', handleScroll, { passive: true });
      rootEl.addEventListener('scrollend', handleScrollEnd, { passive: true });
    }

    // Initial check on mount or when mode/step updates
    updateActiveQuestionOnScroll();

    return () => {
      gestureTargets.forEach((target) => {
        target.removeEventListener('touchstart', handleUserGesture);
        target.removeEventListener('touchmove', handleUserGesture);
        target.removeEventListener('wheel', handleUserGesture);
        target.removeEventListener('pointerdown', handleUserGesture);
        target.removeEventListener('keydown', handleUserGesture as EventListener);
      });
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (rootEl) {
        rootEl.removeEventListener('scroll', handleScroll);
        rootEl.removeEventListener('scrollend', handleScrollEnd);
      }
      if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
    };
  }, [revealStep, totalQuestions, tapToRevealEnabled, setActivePredictCardIdx]);

  return (
    <div
      onClick={!isFullyRevealed && canContinue ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed && canContinue ? 'cursor-pointer' : ''
      }`}
    >
      {/* 0: Step Header (Always visible initially) */}
      <section className="pt-1 mb-2">
        <h1
          className={`font-['Outfit'] text-2xl font-semibold tracking-tight mb-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h1>
      </section>

      {/* Sticky Indicator Navigation Bar - Shown after tap or when tapToReveal is disabled */}
      {(!tapToRevealEnabled || revealStep >= 1) && (
        <div
          id="predict-indicator-bar"
          className="sticky top-14 z-30 mb-2.5 py-0.5 flex justify-center w-full animate-fadeIn"
        >
          {/* Rectangle shape indicator navigation container */}
          <div
            className={`inline-flex items-center gap-1.5 p-1.5 rounded-xl border backdrop-blur-md shadow-md transition-colors duration-200 ${
              isDark
                ? 'bg-[#171b26]/95 border-[#262c3d] shadow-black/40'
                : 'bg-white/95 border-slate-200/90 shadow-slate-900/10'
            }`}
          >
            {data.questions.map((q, idx) => {
              const buttonLabel = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
              const isHighlighted = activePredictCardIdx === idx;
              const isAnswered = isQuestionAnswered(idx);
              const isCorrect = isQuestionCorrect(idx);
              const isRevealed = !tapToRevealEnabled || revealStep > idx;
              const isLocked = !isRevealed && (!canContinue || idx > revealStep);

              return (
                <button
                  key={q.id}
                  type="button"
                  disabled={isLocked}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLocked) {
                      handleIndicatorClick(idx);
                    } else {
                      scrollToUnsolved();
                    }
                  }}
                  className={`min-w-[42px] h-8 px-2.5 flex items-center justify-center gap-1 text-xs font-bold font-mono tracking-wider rounded-lg transition-all duration-150 select-none ${
                    isLocked
                      ? 'opacity-40 cursor-not-allowed bg-transparent text-slate-500 border border-transparent'
                      : isHighlighted
                      ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500/50 scale-[1.03] cursor-pointer'
                      : isDark
                      ? 'bg-[#121622] text-slate-400 border border-[#262c3d] hover:text-slate-200 hover:border-slate-500 hover:bg-[#181d2c] cursor-pointer'
                      : 'bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-200/70 cursor-pointer'
                  }`}
                >
                  <span>{buttonLabel}</span>
                  {isCorrect ? (
                    <span className="material-symbols-outlined text-[13px] leading-none text-emerald-400">
                      check
                    </span>
                  ) : isAnswered ? (
                    <span className="material-symbols-outlined text-[13px] leading-none text-rose-400">
                      close
                    </span>
                  ) : isLocked ? (
                    <span className="material-symbols-outlined text-[11px] leading-none text-slate-500">
                      lock
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progressive Prediction Question Cards - Shown after tap or when tapToReveal is disabled */}
      {(!tapToRevealEnabled || revealStep >= 1) && (
        <div className="space-y-4 mb-6">
          {data.questions.map((question, qIdx) => {
            const isQuestionRevealed = !tapToRevealEnabled || revealStep >= 1 + qIdx;
            if (!isQuestionRevealed) return null;

            const selectedOptId = predictAnswers[qIdx];
            const hasAnswered = selectedOptId !== undefined;
            const selectedOpt = question.options.find((o) => o.id === selectedOptId);
            const isCorrect = selectedOpt?.isCorrect ?? false;

            return (
              <article
                key={question.id}
                id={`predict-q-${qIdx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(qIdx);
                }}
                className={`w-full rounded-2xl p-5 border flex flex-col gap-4 transition-all duration-300 animate-fadeIn ${
                  activePredictCardIdx === qIdx
                    ? isDark
                      ? 'bg-[#171b26] border-indigo-500/40 shadow-lg'
                      : 'bg-white border-indigo-200/90 shadow-md'
                    : isDark
                    ? 'bg-[#171b26] border-[#262c3d] shadow-md'
                    : 'bg-white border-slate-200/80 shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.7)]'
                }`}
              >
                {/* Card Header with Number Tag and Title like in Explore */}
                <header className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md shrink-0 inline-flex items-center justify-center ${
                        isDark
                          ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {qIdx < 9 ? `0${qIdx + 1}` : `${qIdx + 1}`}
                    </span>
                    <h3
                      className={`font-['Outfit'] font-bold text-sm sm:text-base leading-5 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {question.title || question.topicMeta}
                    </h3>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                      isDark
                        ? 'bg-[#0f131d] text-slate-300 border border-[#262c3d]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {question.language}
                  </span>
                </header>

                {/* Inset Carved Neomorphic Code Block */}
                <div
                  className={`w-full rounded-xl p-4 overflow-x-auto ${
                    isDark
                      ? 'bg-[#0f131d] border border-[#262c3d] text-slate-200'
                      : 'bg-slate-50 border border-slate-200/80 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)]'
                  }`}
                >
                  <pre className="font-mono text-xs leading-relaxed">
                    {question.code.map((line, idx) => (
                      <div key={idx} className="whitespace-pre">
                        {line.startsWith('fun ') ? (
                          <>
                            <span className="text-purple-500 font-semibold">fun </span>
                            <span className="text-indigo-500 font-semibold">
                              {line.substring(4, line.indexOf('(') > -1 ? line.indexOf('(') : undefined)}
                            </span>
                            <span>{line.substring(line.indexOf('(') > -1 ? line.indexOf('(') : 4)}</span>
                          </>
                        ) : line.trim().startsWith('val ') ? (
                          <>
                            <span className="text-purple-500 font-semibold">val </span>
                            <span>{line.trim().substring(4)}</span>
                          </>
                        ) : line.trim().startsWith('var ') ? (
                          <>
                            <span className="text-amber-500 font-semibold">var </span>
                            <span>{line.trim().substring(4)}</span>
                          </>
                        ) : line.includes('println') ? (
                          <span>
                            <span className="font-semibold text-indigo-400">println</span>
                            {line.substring(line.indexOf('println') + 7)}
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}
                  </pre>
                </div>

                {/* Question Title */}
                <div>
                  <h2
                    className={`text-base font-semibold tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {question.prompt}
                  </h2>
                </div>

                {/* Answer Options Grid */}
                <div className="flex flex-col gap-2.5" role="radiogroup">
                  {question.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectOption(qIdx, opt.id);
                        }}
                        className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all border cursor-pointer ${
                          isSelected
                            ? isDark
                              ? opt.isCorrect
                                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/50 border-rose-500 text-rose-200'
                              : opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                              : 'bg-rose-50 border-rose-500 text-rose-900'
                            : isDark
                            ? 'bg-[#0f131d] border-[#262c3d] text-slate-300 hover:border-indigo-500/40'
                            : 'bg-white border-slate-200/80 shadow-[3px_3px_8px_rgba(0,0,0,0.04),-3px_-3px_8px_rgba(255,255,255,0.6)] text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                              isSelected
                                ? opt.isCorrect
                                  ? 'bg-emerald-600 text-white font-bold'
                                  : 'bg-rose-600 text-white font-bold'
                                : isDark
                                ? 'bg-[#171b26] text-slate-400'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <span className="text-sm font-medium">{opt.label}</span>
                        </div>
                        {isSelected && (
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              opt.isCorrect ? 'text-emerald-500' : 'text-rose-500'
                            }`}
                          >
                            {opt.isCorrect ? 'check_circle' : 'cancel'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Drawer */}
                {hasAnswered && (
                  <div
                    className={`rounded-xl p-4 border transition-all animate-fadeIn flex flex-col gap-2 ${
                      isCorrect
                        ? isDark
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-200'
                          : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : isDark
                          ? 'bg-rose-950/40 border-rose-500/40 text-slate-200'
                          : 'bg-rose-50/80 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${
                        isCorrect
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isCorrect ? 'check_circle' : 'info'}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider font-['Outfit']">
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed font-medium ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      <code
                        className={`font-mono text-[11px] ${
                          isCorrect
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {question.explanation.codeRef}
                      </code>{' '}
                      {question.explanation.detail}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Spacer to push content up so hint sits cleanly at bottom with breathing space */}
      <div className="flex-1 min-h-[16px]" />

      {/* Bottom CTA / Tap Hint */}
      <div
        id="predict-bottom-cta"
        className={`sticky bottom-0 left-0 right-0 w-full pt-1.5 pb-2 transition-all ${
          isDark
            ? 'bg-gradient-to-t from-[#0f131d] via-[#0f131d]/95 to-transparent'
            : 'bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9]/95 to-transparent'
        }`}
      >
        {!isFullyRevealed ? (
          /* Minimalist Tap Hint positioned nicely above bottom edge */
          <div className="flex justify-center w-full">
            <button
              type="button"
              disabled={!canContinue}
              onClick={(e) => {
                e.stopPropagation();
                if (canContinue) {
                  handleNextReveal();
                } else {
                  scrollToUnsolved();
                }
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-md transition-all duration-200 select-none ${
                canContinue
                  ? isDark
                    ? 'bg-[#171b26] border-indigo-500/50 text-indigo-300 hover:text-white hover:border-indigo-400 active:scale-95 cursor-pointer ring-2 ring-indigo-500/20'
                    : 'bg-white border-indigo-200 text-indigo-700 hover:border-indigo-300 shadow-slate-200 active:scale-95 cursor-pointer ring-2 ring-indigo-500/15'
                  : isDark
                  ? 'bg-[#121622]/90 border-[#262c3d] text-slate-500 cursor-not-allowed opacity-75'
                  : 'bg-slate-100/90 border-slate-200 text-slate-400 cursor-not-allowed opacity-80'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  canContinue ? 'text-indigo-500 animate-bounce' : 'text-slate-400'
                }`}
              >
                {canContinue ? 'touch_app' : 'lock'}
              </span>
              <span className="text-xs font-semibold font-['Outfit'] tracking-wide">
                {canContinue
                  ? 'Tap to continue'
                  : currentQAnswered
                  ? 'Select the correct answer to continue'
                  : 'Select an answer to continue'}
              </span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={tapToRevealEnabled && !allQuestionsCorrect}
            onClick={(e) => {
              e.stopPropagation();
              if (!tapToRevealEnabled || allQuestionsCorrect) {
                onContinue();
              } else {
                scrollToUnsolved();
              }
            }}
            className={`w-full h-14 rounded-2xl font-['Outfit'] font-bold text-base flex items-center justify-center gap-2 transition-all ${
              !tapToRevealEnabled || allQuestionsCorrect
                ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white shadow-lg shadow-indigo-600/35 cursor-pointer animate-fadeIn'
                : isDark
                ? 'bg-[#171b26] border border-[#262c3d] text-slate-500 cursor-not-allowed opacity-60'
                : 'bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
            }`}
          >
            <span>
              {!tapToRevealEnabled || allQuestionsCorrect
                ? 'Continue to Write & Run'
                : 'Select the correct answer to continue'}
            </span>
            <span className="material-symbols-outlined text-[20px]">
              {!tapToRevealEnabled || allQuestionsCorrect ? 'arrow_forward' : 'lock'}
            </span>
          </button>
        )}
      </div>

      {/* Non-sticky anchor at absolute end of view to reliably scroll screen to bottom */}
      <div id="predict-bottom-anchor" className="h-2 w-full pointer-events-none" aria-hidden="true" />
    </div>
  );
};
