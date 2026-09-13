import React, { useState } from 'react';
import { Stage4WriteRunData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

interface WriteRunStageProps {
  data: Stage4WriteRunData;
  topicTitle: string;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  userCode: string;
  setUserCode: (code: string) => void;
  hasRunCode: boolean;
  setHasRunCode: (hasRun: boolean) => void;
  actualOutput: string;
  onRunCode: () => void;
  onContinue: () => void;
}

// Reveal steps:
// 0: Header & Challenge Title only (initial state)
// 1: Challenge Description & details
// 2: Requirements card
// 3: Code Editor & Execution section (Run Code button is interactive)
const MAX_REVEAL_STEP = 3;

export const WriteRun: React.FC<WriteRunStageProps> = ({
  data,
  topicTitle,
  isDark,
  revealStep,
  setRevealStep,
  userCode,
  setUserCode,
  hasRunCode,
  setHasRunCode: _setHasRunCode,
  actualOutput,
  onRunCode,
  onContinue,
}) => {
  const handleNextReveal = () => {
    soundFX.playClick();
    if (revealStep < MAX_REVEAL_STEP) {
      setRevealStep((prev) => {
        const next = prev + 1;
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

  const isFullyRevealed = revealStep >= MAX_REVEAL_STEP;

  return (
    <div
      onClick={!isFullyRevealed ? handleNextReveal : undefined}
      className={`flex flex-col min-h-[78vh] transition-all select-none ${
        !isFullyRevealed ? 'cursor-pointer' : ''
      }`}
    >
      {/* 0: Step Header & Challenge Progress (Always visible initially) */}
      <div className="flex items-center justify-between px-1 mb-3 pt-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {topicTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold tracking-wide uppercase font-['Outfit'] ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            CHALLENGE {data.challengeNumber} OF {data.totalChallenges}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-500/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
          </div>
        </div>
      </div>

      {/* Challenge Card (Title visible initially; description revealed on tap 1) */}
      <section
        className={`rounded-3xl p-5 border mb-4 shadow-sm transition-all ${
          isDark
            ? 'bg-[#171b26] border-[#262c3d]'
            : 'bg-white border-slate-100 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <span
            className={`text-[10px] font-extrabold tracking-wider uppercase font-['Outfit'] ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            CHALLENGE {data.challengeNumber} OF {data.totalChallenges}
          </span>
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isDark
                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                : 'bg-indigo-50 text-indigo-600'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] filled text-indigo-500">
              bolt
            </span>
            <span>+{data.xpReward} XP</span>
          </div>
        </div>

        <h1
          className={`text-xl font-bold font-['Outfit'] mb-1.5 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h1>

        {/* 1: Challenge Description (Revealed on tap 1) */}
        {revealStep >= 1 && (
          <p
            className={`text-xs leading-relaxed transition-all duration-300 animate-fadeIn ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {data.description}
          </p>
        )}
      </section>

      {/* 2: Requirements Card (Revealed on tap 2) */}
      {revealStep >= 2 && (
        <section
          className={`rounded-2xl p-4 border mb-4 transition-all duration-300 animate-fadeIn ${
            isDark
              ? 'bg-[#171b26] border-[#262c3d]'
              : 'bg-white border-slate-100 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div className="flex items-center gap-1.5 mb-3">
            <span className="material-symbols-outlined text-[16px] text-slate-400">
              checklist
            </span>
            <h3 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-['Outfit']">
              REQUIREMENTS
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                NAME
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.name}
              </span>
            </div>
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                PARAMS
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md break-all max-w-[70%] text-right ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.params}
              </span>
            </div>
            <div
              className={`p-2.5 px-3 rounded-xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-[#0f131d] border-[#262c3d]' : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                RETURNS
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isDark ? 'text-indigo-300 bg-indigo-950/60' : 'text-indigo-700 bg-indigo-50'
                }`}
              >
                {data.requirements.returns}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 3: Code Editor & Execution section (Revealed on tap 3) */}
      {revealStep >= 3 && (
        <div className="transition-all duration-300 animate-fadeIn">
          {/* Code Editor Container */}
          <section
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl border bg-slate-950 border-slate-800 shadow-xl overflow-hidden mb-4"
          >
            {/* Window chrome / tabs */}
            <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800 mx-1" />
                <span className="font-mono text-xs text-slate-400 font-medium">
                  solution.kt
                </span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Kotlin 1.9
              </span>
            </div>

            {(() => {
              const lines = userCode.split('\n');
              const lineCount = Math.max(lines.length, 3);
              return (
                <div className="p-4 flex gap-3">
                  {/* Line Numbers */}
                  <div
                    className="font-mono text-xs text-slate-600 select-none text-right flex flex-col leading-[1.625rem]"
                    aria-hidden="true"
                  >
                    {Array.from({ length: lineCount }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  {/* Code Content & Input */}
                  <div className="flex-1 font-mono text-xs leading-relaxed text-slate-200 min-w-0">
                    <textarea
                      value={userCode}
                      rows={lineCount}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-indigo-300 font-mono text-xs leading-[1.625rem] resize-none p-0 focus:ring-0 overflow-hidden block"
                      style={{ height: `${lineCount * 1.625}rem` }}
                      spellCheck={false}
                    />
                    <div className="text-slate-500 italic text-[11px] pt-1">// Ready to execute</div>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Run Code Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRunCode();
            }}
            className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold font-['Outfit'] text-sm shadow-md flex items-center justify-center gap-2 mb-4 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] filled">play_arrow</span>
            <span>RUN CODE</span>
          </button>

          {/* Actual Output Card */}
          {hasRunCode && (
            <section
              className={`rounded-2xl p-4 border mb-4 animate-fadeIn ${
                isDark
                  ? 'bg-[#171b26] border-[#262c3d]'
                  : 'bg-white border-slate-100 shadow-[0_10px_25px_-3px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Outfit']">
                  OUTPUT
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Return value
                </span>
              </div>
              <div className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-sm font-semibold tracking-wide border border-slate-800 flex items-center justify-between">
                <span>{actualOutput}</span>
                <span className="text-xs text-slate-400 font-sans font-normal">Executed in 12ms</span>
              </div>
            </section>
          )}
        </div>
      )}

      {/* Spacer to push content up so hint sits cleanly at bottom with breathing space */}
      <div className="flex-1 min-h-[16px]" />

      {/* Next Challenge / Stage CTA or Minimalist Tap Hint */}
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
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold font-['Outfit'] text-sm shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to Mastered</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
