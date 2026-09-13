import React, { useState, useEffect } from 'react';
import { AppTheme, LessonQuestion, UserStats } from '../types';
import { soundFX } from '../utils/audio';
import { renderKotlinCodeLine } from '../utils/codeHighlighter';
import { LessonSuccessModal } from './LessonSuccessModal';

interface ActiveLessonViewProps {
  theme: AppTheme;
  question: LessonQuestion;
  userStats: UserStats;
  onExit: () => void;
  onLessonComplete: (earnedXP: number) => void;
}

export const ActiveLessonView: React.FC<ActiveLessonViewProps> = ({
  theme,
  question,
  userStats,
  onExit,
  onLessonComplete,
}) => {
  // Option B is selected by default as in the user's mockup image
  const [selectedOptionId, setSelectedOptionId] = useState<string>('B');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [showReportToast, setShowReportToast] = useState<boolean>(false);
  const [wrongAnswerMessage, setWrongAnswerMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOptionId('B');
    setIsChecking(false);
    setShowSuccessModal(false);
    setWrongAnswerMessage(null);
  }, [question.id]);

  const handleSelectOption = (id: string) => {
    soundFX.playClick();
    setSelectedOptionId(id);
    setWrongAnswerMessage(null);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;

    soundFX.playClick();
    setIsChecking(true);

    setTimeout(() => {
      setIsChecking(false);
      const chosen = question.options.find((opt) => opt.id === selectedOptionId);

      if (chosen?.isCorrect) {
        soundFX.playSuccess();
        setShowSuccessModal(true);
      } else {
        soundFX.playError();
        setWrongAnswerMessage(question.hint || 'Not quite! Review the syntax and try again.');
      }
    }, 450);
  };

  const handleContinueNext = () => {
    onLessonComplete(question.xpReward);
  };

  const getChallengeBadge = () => {
    switch (question.challengeType) {
      case 'bug-fix':
        return { label: 'Bug Hunter', icon: 'pest_control', color: 'text-rose-400 bg-rose-500/10 border-rose-400/20' };
      case 'code-completion':
        return { label: 'Fill in Blank', icon: 'extension', color: 'text-amber-400 bg-amber-500/10 border-amber-400/20' };
      case 'output-prediction':
        return { label: 'Predict Output', icon: 'terminal', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-400/20' };
      default:
        return { label: 'Multiple Choice', icon: 'quiz', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-400/20' };
    }
  };

  const challengeBadge = getChallengeBadge();

  return (
    <div className="relative min-h-full w-full max-w-md mx-auto flex flex-col justify-between pb-8 pt-2 px-4 select-none">
      {/* Background container substrate */}
      <div className="flex flex-col w-full">
        {/* Gamified Top Bar: Exit, Progress, Streak & Hearts */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Exit Challenge */}
          <button
            aria-label="Exit Lesson"
            onClick={() => {
              soundFX.playClick();
              onExit();
            }}
            type="button"
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-all ${
              theme === 'dark'
                ? 'bg-[#162036] border border-[#2a374f] text-slate-300 hover:text-white'
                : 'bg-[#f2f4f6] text-[#191c1e] neumorph-raised-soft'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] font-bold">close</span>
          </button>

          {/* Inset Progress Trench */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex justify-between items-center px-1">
              <span className="font-['Outfit'] text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Step {question.stepNumber} of {question.totalSteps}
              </span>
              <span
                className={`font-['Outfit'] text-[11px] font-bold ${
                  theme === 'dark' ? 'text-cyan-400' : 'text-[#3748dd]'
                }`}
              >
                {Math.round((question.stepNumber / question.totalSteps) * 100)}%
              </span>
            </div>
            <div
              className={`h-2.5 w-full rounded-full p-[1.5px] flex items-center overflow-hidden ${
                theme === 'dark'
                  ? 'bg-[#162036] border border-[#223048]'
                  : 'bg-[#eceef0] neumorph-active-pill'
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-500 via-[#6366f1] to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.65)]'
                    : 'bg-gradient-to-r from-[#3748dd] to-[#7a5aed] shadow-[0_1px_4px_rgba(55,72,221,0.4)]'
                }`}
                style={{ width: `${(question.stepNumber / question.totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Gamified Counters (Streak & Lives) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Streak Pill */}
            <div
              className={`h-9 px-2.5 rounded-full flex items-center gap-1 shadow-sm ${
                theme === 'dark'
                  ? 'bg-[#162036] border border-[#2a374f]'
                  : 'bg-[#f2f4f6] neumorph-raised-soft'
              }`}
            >
              <span className="text-[14px]">🔥</span>
              <span className="font-['Outfit'] text-xs font-bold text-orange-500">
                {userStats.streak}
              </span>
            </div>

            {/* Lives Pill */}
            <div
              className={`h-9 px-2.5 rounded-full flex items-center gap-1 shadow-sm ${
                theme === 'dark'
                  ? 'bg-[#162036] border border-[#2a374f]'
                  : 'bg-[#f2f4f6] neumorph-raised-soft'
              }`}
            >
              <span className="material-symbols-outlined text-rose-500 text-[18px] icon-filled">
                favorite
              </span>
              <span className="font-['Outfit'] text-xs font-bold text-inherit">
                {userStats.hearts}
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Prompt Header */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-[#171e33] border border-[#2f3f64]'
                    : 'bg-[#dfe0ff]/50'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    theme === 'dark' ? 'bg-cyan-400 shadow-[0_0_8px_#4cd7f6]' : 'bg-[#3748dd]'
                  }`}
                />
                <span
                  className={`font-['Outfit'] text-[10px] font-bold tracking-wider uppercase ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-[#3748dd]'
                  }`}
                >
                  {question.topicTag}
                </span>
              </div>

              {/* Challenge Type Badge */}
              <div
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-['Outfit'] font-semibold ${challengeBadge.color}`}
              >
                <span className="material-symbols-outlined text-[13px]">{challengeBadge.icon}</span>
                <span>{challengeBadge.label}</span>
              </div>
            </div>

            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold ${
                theme === 'dark'
                  ? 'bg-[#261f07] border border-[#5c4300]/80 text-amber-400'
                  : 'bg-[#ffddb8] text-[#2a1700]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-amber-500 icon-filled">
                bolt
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px]">+{question.xpReward} XP</span>
            </div>
          </div>

          <h2 className="font-['Outfit'] text-xl font-bold tracking-tight text-inherit mt-1 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Miniature Dark Code Editor */}
        <div className="w-full rounded-2xl bg-[#0D1322] shadow-2xl overflow-hidden mb-5 text-left border border-slate-800/80">
          {/* Top Chrome */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#090D17] border-b border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
              <span className="font-['JetBrains_Mono'] text-xs text-slate-400 ml-2 font-medium">
                {question.codeFileName}
              </span>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/10">
              <span className="font-['JetBrains_Mono'] text-[10px] text-indigo-300">
                {question.languageVersion}
              </span>
            </div>
          </div>

          {/* Code Editor Body */}
          <div className="p-4 font-['JetBrains_Mono'] text-xs leading-relaxed select-none overflow-x-auto text-slate-200">
            {question.codeSnippet.map((line, idx) => {
              const isBuggyLine =
                question.challengeType === 'bug-fix' && question.buggyLineIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center min-h-[1.4rem] rounded px-1 ${
                    isBuggyLine && wrongAnswerMessage
                      ? 'bg-rose-950/40 border border-rose-500/30'
                      : ''
                  }`}
                >
                  <span className="w-6 text-slate-600 select-none text-right mr-4 text-[11px]">
                    {idx + 1}
                  </span>
                  <span>
                    {renderKotlinCodeLine(
                      line,
                      question.challengeType === 'code-completion'
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Multiple-Choice Options */}
        <div className="flex flex-col gap-3 mb-5" id="quiz-options">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                type="button"
                className={`text-left w-full p-3.5 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all duration-200 ${
                  isSelected
                    ? theme === 'dark'
                      ? 'bg-[#1a2542] border-2 border-cyan-400 dark-neon-glow'
                      : 'bg-[#3748dd]/10 border-2 border-[#3748dd] neumorph-inset'
                    : theme === 'dark'
                    ? 'bg-[#162036] border border-[#2a374f] hover:border-slate-600'
                    : 'bg-[#f8f9fb] neumorph-raised'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-slate-950 font-bold'
                          : 'bg-[#3748dd] text-white font-bold'
                        : theme === 'dark'
                        ? 'bg-[#0e1526] border border-[#25324c] text-slate-300'
                        : 'bg-[#f2f4f6] text-[#454655] font-bold shadow-sm'
                    }`}
                  >
                    <span className="font-['Outfit'] text-sm">{option.id}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-['JetBrains_Mono'] text-[15px] font-bold tracking-wide ${
                        isSelected
                          ? theme === 'dark'
                            ? 'text-white'
                            : 'text-[#3748dd]'
                          : 'text-inherit'
                      }`}
                    >
                      {option.title}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-xs text-slate-400 truncate">
                      {option.subtitle}
                    </span>
                  </div>
                </div>

                {/* Radio / Checkmark status indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? theme === 'dark'
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(76,215,246,0.8)]'
                        : 'bg-[#3748dd] text-white shadow-md'
                      : theme === 'dark'
                      ? 'border-2 border-[#2f3f64] bg-[#0d1424]'
                      : 'bg-[#eceef0] shadow-inner'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {wrongAnswerMessage && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{wrongAnswerMessage}</span>
          </div>
        )}
      </div>

      {/* Bottom Interactive Action Area */}
      <div className="flex flex-col gap-3 mt-auto pt-2">
        {/* Utility Buttons: Hint & Report */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setShowHintModal(true);
            }}
            type="button"
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-400 icon-filled">
              lightbulb
            </span>
            <span className="font-['Outfit'] text-xs font-semibold">Need a hint?</span>
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setShowReportToast(true);
              setTimeout(() => setShowReportToast(false), 2500);
            }}
            type="button"
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span className="font-['Outfit'] text-xs">Report</span>
          </button>
        </div>

        {showReportToast && (
          <div className="p-2 text-center text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg animate-in fade-in">
            Thanks! Issue reported for review.
          </div>
        )}

        {/* Primary CTA Check Button */}
        <button
          id="check-btn"
          type="button"
          onClick={handleCheckAnswer}
          disabled={isChecking}
          className={`w-full h-14 rounded-full font-['Outfit'] text-[18px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] active:translate-y-0.5 transition-all shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-indigo-500 via-[#6366f1] to-cyan-400 text-white shadow-[0_0_24px_rgba(99,102,241,0.5)] border border-[#a5b4fc]/30'
              : 'bg-gradient-to-r from-[#3748dd] to-[#7a5aed] text-white shadow-[0_8px_20px_rgba(55,72,221,0.38)]'
          }`}
        >
          {isChecking ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>CHECKING...</span>
            </>
          ) : (
            <>
              <span>CHECK ANSWER</span>
              <span className="material-symbols-outlined text-[20px] font-bold">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </div>

      {/* Hint Dialog Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-3 animate-in zoom-in-95 ${
              theme === 'dark'
                ? 'bg-[#151c2c] border border-amber-400/30 text-white'
                : 'bg-white text-[#191c1e]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500 font-['Outfit'] font-bold">
                <span className="material-symbols-outlined icon-filled">lightbulb</span>
                <span>Pro Tip Hint</span>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-500/10"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed text-slate-300">
              {question.hint}
            </p>
            <button
              onClick={() => setShowHintModal(false)}
              className="mt-2 w-full py-2.5 rounded-full bg-amber-500 text-slate-950 font-['Outfit'] text-xs font-bold"
            >
              Got it, let me try!
            </button>
          </div>
        </div>
      )}

      {/* Success Modal Sheet Popup */}
      {showSuccessModal && (
        <LessonSuccessModal
          theme={theme}
          question={question}
          earnedXP={question.xpReward}
          streak={userStats.streak}
          onContinue={handleContinueNext}
        />
      )}
    </div>
  );
};
