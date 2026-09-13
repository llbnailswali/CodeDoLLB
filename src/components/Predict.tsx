import React, { useState } from 'react';
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
}

// Reveal steps:
// 0: Title only
// 1: Subtitle + sticky questions navigator
// 2 to 1 + questions.length: Progressive question cards revealed one by one
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
}) => {
  const totalQuestions = data.questions.length;
  const maxRevealStep = 1 + totalQuestions;

  const handleNextReveal = () => {
    soundFX.playClick();
    if (revealStep < maxRevealStep) {
      setRevealStep((prev) => {
        const next = prev + 1;
        if (next >= 2) {
          const qIdx = next - 2;
          setActivePredictCardIdx(qIdx);
        }
        setTimeout(() => {
          const rootEl = document.getElementById('root');
          if (rootEl) {
            rootEl.scrollTo({ top: rootEl.scrollHeight, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 60);
        return next;
      });
    }
  };

  const isFullyRevealed = revealStep >= maxRevealStep;

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* 0: Step Header & Guidance (Always visible initially) */}
      <section className="pt-1 mb-2">
        <h1
          className={`font-['Outfit'] text-2xl font-semibold tracking-tight mb-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h1>
      </section>

      {/* 1: Subtitle & Sticky Question Navigation Chips (Revealed on tap 1) */}
      {revealStep >= 1 && (
        <section className="mb-5 transition-all duration-300 animate-fadeIn">
          <p
            className={`text-sm font-medium leading-relaxed mb-4 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {data.subtitle}
          </p>

          <div
            className={`sticky top-14 z-30 py-2.5 px-3 rounded-2xl flex items-center justify-between border backdrop-blur-md shadow-sm transition-colors duration-200 ${
              isDark
                ? 'bg-[#171b26]/95 border-[#262c3d] shadow-black/20'
                : 'bg-white/95 border-slate-200/90 shadow-slate-900/5'
            }`}
          >
            <span
              className={`text-[11px] font-['Outfit'] font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {Math.min(Math.max(revealStep - 1, 1), data.questions.length)} OF {data.questions.length} QUESTIONS
            </span>
            <div className="flex items-center gap-1.5">
              {data.questions.map((q, idx) => {
                const isAnswered = predictAnswers[idx] !== undefined;
                const isSelected = activePredictCardIdx === idx;
                const isQuestionRevealed = revealStep >= 2 + idx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    disabled={!isQuestionRevealed}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      setActivePredictCardIdx(idx);
                      scrollToElement(`predict-q-${idx}`, 120);
                    }}
                    className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected && isQuestionRevealed
                        ? 'bg-indigo-600 text-white shadow-sm scale-105'
                        : isAnswered && isQuestionRevealed
                        ? isDark
                          ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-700/50'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : isQuestionRevealed
                        ? isDark
                          ? 'bg-[#0f131d] text-slate-400 border border-[#262c3d] hover:text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                        : 'opacity-30 cursor-not-allowed bg-slate-200/40 text-slate-400 dark:bg-slate-800/40'
                    }`}
                  >
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                    {isAnswered && (
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Prediction Question Cards (Revealed one by one on subsequent taps) */}
      <div className="space-y-6 mb-6">
        {data.questions.map((question, qIdx) => {
          const isQuestionRevealed = revealStep >= 2 + qIdx;
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
                setActivePredictCardIdx(qIdx);
              }}
              className={`w-full rounded-2xl p-5 border flex flex-col gap-4 transition-all duration-300 animate-fadeIn ${
                isDark
                  ? 'bg-[#171b26] border-[#262c3d] shadow-lg'
                  : 'bg-white border-slate-200/80 shadow-[6px_6px_14px_rgba(0,0,0,0.06),-6px_-6px_14px_rgba(255,255,255,0.7)]'
              }`}
            >
              {/* Card Meta */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-purple-500">
                    psychology
                  </span>
                  <span>
                    Question {question.questionNumber} of {question.totalQuestions} • {question.topicMeta}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    isDark
                      ? 'bg-[#0f131d] text-indigo-400 border border-[#262c3d]'
                      : 'bg-indigo-50 text-indigo-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.6)]'
                  }`}
                >
                  {question.language}
                </span>
              </div>

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
                      ) : line.includes('println') ? (
                        <span className="pl-4">
                          <span className="font-semibold">println</span>(
                          <span className="text-emerald-500">
                            {line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'))}
                          </span>
                          )
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
                        onSelectOption(qIdx, opt.id);
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
                        <span
                          className={`text-sm ${
                            isSelected ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>

                      {isSelected ? (
                        <div
                          className={`w-6 h-6 rounded-full text-white flex items-center justify-center shadow-sm ${
                            opt.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {opt.isCorrect ? 'check' : 'close'}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full border ${
                            isDark
                              ? 'border-slate-600 bg-[#0f131d]'
                              : 'border-slate-300 bg-slate-100 shadow-inner'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Explanation */}
              {hasAnswered && (
                <div
                  className={`mt-1 p-3.5 rounded-xl border flex flex-col gap-1.5 animate-fadeIn ${
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

      {/* Spacer to push content up so hint sits cleanly at bottom with breathing space */}
      <div className="flex-1 min-h-[16px]" />

      {/* Bottom CTA / Tap Hint */}
      <div
        className={`sticky bottom-0 left-0 right-0 w-full pt-1.5 pb-2 transition-all ${
          isDark
            ? 'bg-gradient-to-t from-[#0f131d] via-[#0f131d]/95 to-transparent'
            : 'bg-gradient-to-t from-[#f1f4f9] via-[#f1f4f9]/95 to-transparent'
        }`}
      >
        {!isFullyRevealed ? (
          /* Subtle Minimalist Tap Hint (Finger icon + short text) positioned nicely above bottom edge */
          <div className="flex justify-center w-full">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextReveal();
              }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border shadow-md transition-all duration-200 active:scale-95 cursor-pointer select-none ${
                isDark
                  ? 'bg-[#171b26] border-indigo-500/40 text-indigo-300 hover:text-white hover:border-indigo-400'
                  : 'bg-white border-indigo-200 text-indigo-700 hover:border-indigo-300 shadow-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-indigo-500 animate-bounce">
                touch_app
              </span>
              <span className="text-xs font-semibold font-['Outfit'] tracking-wide">
                Tap to continue
              </span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-['Outfit'] font-bold text-base shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to Write & Run</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
