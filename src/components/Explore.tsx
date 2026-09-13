import React, { useState } from 'react';
import { Stage2ExploreData } from '../data/lessonStagesData';
import { soundFX } from '../utils/audio';

interface ExploreStageProps {
  data: Stage2ExploreData;
  isDark: boolean;
  revealStep: number;
  setRevealStep: React.Dispatch<React.SetStateAction<number>>;
  exploreCardIndex: number;
  setExploreCardIndex: (index: number) => void;
  scrollToElement: (id: string, offset?: number) => void;
  onContinue: () => void;
}

// Reveal steps:
// 0: Title only
// 1: Subtitle + sticky examples navigator + 1st Example Card revealed together
// 2 to cards.length: Subsequent example cards (card 1, card 2, ...)
export const Explore: React.FC<ExploreStageProps> = ({
  data,
  isDark,
  revealStep,
  setRevealStep,
  exploreCardIndex,
  setExploreCardIndex,
  scrollToElement,
  onContinue,
}) => {
  const totalCards = data.cards.length;
  // Step 0: title only
  // Step 1: subtitle + sticky indicators + 1st example card (card 0)
  // Step 2..totalCards: card 1, card 2, ...
  const maxRevealStep = totalCards;

  const handleNextReveal = () => {
    soundFX.playClick();
    if (revealStep < maxRevealStep) {
      setRevealStep((prev) => {
        const next = prev + 1;
        // If revealing a card, also update the active card index
        if (next >= 1) {
          const cardIdx = next - 1;
          setExploreCardIndex(cardIdx);
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
      {/* 0: Concept Title (Always visible initially) */}
      <div className="pt-1 mb-2">
        <h2
          className={`font-['Outfit'] font-extrabold text-[28px] leading-tight tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {data.title}
        </h2>
      </div>

      {/* 1: Subtitle & Sticky Example Navigation Indicator (Revealed on tap 1 together with 1st example) */}
      {revealStep >= 1 && (
        <>
          <p
            className={`text-[15px] leading-snug font-normal mb-3 transition-all duration-300 animate-fadeIn ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {data.subtitle}
          </p>

          {/* Sticky Indicator Navigation Bar - Sticks below elevated toolbar when scrolling down */}
          <div className="sticky top-14 z-30 mb-5 py-1 flex justify-center w-full">
            <div
              className={`inline-flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-md shadow-md transition-colors duration-200 ${
                isDark
                  ? 'bg-[#171b26]/95 border-[#262c3d] shadow-black/30'
                  : 'bg-white/95 border-slate-200/90 shadow-slate-900/10'
              }`}
            >
              {data.cards.map((card, idx) => {
                const isCardRevealed = revealStep >= 1 + idx;
                const buttonLabel = idx + 1; // 1, 2, 3, 4, 5
                return (
                  <button
                    key={card.id}
                    type="button"
                    disabled={!isCardRevealed}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playClick();
                      setExploreCardIndex(idx);
                      scrollToElement(`explore-card-${idx}`, 120);
                    }}
                    className={`min-w-[32px] h-8 px-2.5 flex items-center justify-center text-xs font-bold font-['Outfit'] rounded-full transition-all cursor-pointer ${
                      exploreCardIndex === idx && isCardRevealed
                        ? 'bg-indigo-600 text-white shadow-sm scale-105'
                        : isCardRevealed
                        ? isDark
                          ? 'bg-[#0f131d] text-slate-400 border border-[#262c3d] hover:text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                        : 'opacity-30 cursor-not-allowed bg-slate-200/40 text-slate-400 dark:bg-slate-800/40'
                    }`}
                  >
                    {buttonLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Progressive Example Cards (1st example card shown with indicator at revealStep >= 1, then card 1, 2... on taps) */}
      <div className="space-y-5 mb-6">
        {data.cards.map((card, idx) => {
          const isCardRevealed = revealStep >= 1 + idx;
          if (!isCardRevealed) return null;

          return (
            <article
              key={card.id}
              id={`explore-card-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                setExploreCardIndex(idx);
              }}
              className={`w-full rounded-2xl p-5 border transition-all duration-300 animate-fadeIn ${
                exploreCardIndex === idx
                  ? isDark
                    ? 'bg-[#171b26] border-indigo-500/40 shadow-lg'
                    : 'bg-white border-indigo-200/90 shadow-md'
                  : isDark
                  ? 'bg-[#171b26] border-[#262c3d] shadow-sm'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <header className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                      isDark
                        ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}
                  >
                    {card.number}
                  </span>
                  <h3
                    className={`font-['Outfit'] font-bold text-lg ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isDark
                      ? 'bg-[#0f131d] text-slate-300 border border-[#262c3d]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {card.language}
                </span>
              </header>

              <p
                className={`text-sm mb-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {card.subtitle}
              </p>

              {/* Code Snippet Container */}
              <div
                className={`rounded-xl p-4 font-mono text-sm leading-relaxed mb-4 overflow-x-auto ${
                  isDark
                    ? 'bg-[#0f131d] border border-[#262c3d] text-slate-200'
                    : 'bg-slate-50 border border-slate-200/70 text-slate-800'
                }`}
              >
                {card.code.map((line, lIdx) => (
                  <div key={lIdx} className="whitespace-pre">
                    {line.startsWith('fun ') ? (
                      <>
                        <span className="text-indigo-500 font-semibold">fun </span>
                        <span className="text-slate-900 dark:text-white font-medium">
                          {line.substring(4)}
                        </span>
                      </>
                    ) : line.includes('println') ? (
                      <span className="pl-4">
                        <span className="text-slate-900 dark:text-white">println</span>
                        (
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
              </div>

              {/* What it means breakdown */}
              <div className="mb-4">
                <h4
                  className={`text-[11px] font-['Outfit'] font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  WHAT IT MEANS
                </h4>
                <ul
                  className={`text-xs space-y-1.5 leading-normal ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {card.whatItMeans.map((item, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>
                        <code
                          className={`font-mono px-1 py-0.5 rounded text-[11px] ${
                            isDark
                              ? 'bg-[#0f131d] text-slate-200'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.label}
                        </code>{' '}
                        → {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What changed callout */}
              <div
                className={`rounded-xl p-3.5 border ${
                  isDark
                    ? 'bg-indigo-950/40 border-indigo-800/40 text-slate-200'
                    : 'bg-indigo-50/60 border border-indigo-100 text-slate-800'
                }`}
              >
                <h4
                  className={`text-[10px] font-['Outfit'] font-bold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-indigo-300' : 'text-indigo-700'
                  }`}
                >
                  WHAT CHANGED
                </h4>
                <p className="text-xs font-medium">{card.whatChanged}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Spacer to push content up so hint sits cleanly at bottom with breathing space */}
      <div className="flex-1 min-h-[16px]" />

      {/* Primary CTA / Tap Hint */}
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
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-['Outfit'] font-bold text-base rounded-2xl shadow-lg shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all cursor-pointer animate-fadeIn"
          >
            <span>Continue to Predict</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
