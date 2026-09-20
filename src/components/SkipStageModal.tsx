import React, { useEffect } from 'react';
import { StageKey } from './Detail';
import { soundFX } from '../utils/audio';

interface SkipStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStages: StageKey[];
  currentStageIndex: number;
  onSelectStage: (key: StageKey) => void;
  isDark: boolean;
}

interface StageMetadata {
  label: string;
  icon: string;
  description: string;
  badgeColor: string;
  badgeBgLight: string;
  badgeBgDark: string;
}

const STAGE_META: Record<StageKey, StageMetadata> = {
  learn: {
    label: 'Learn',
    icon: 'menu_book',
    description: 'Core concepts & interactive explanations',
    badgeColor: 'text-indigo-600 dark:text-indigo-400',
    badgeBgLight: 'bg-indigo-50 border-indigo-200',
    badgeBgDark: 'bg-indigo-950/40 border-indigo-800/50',
  },
  explore: {
    label: 'Explore',
    icon: 'explore',
    description: 'Interactive code variations & visual mental models',
    badgeColor: 'text-sky-600 dark:text-sky-400',
    badgeBgLight: 'bg-sky-50 border-sky-200',
    badgeBgDark: 'bg-sky-950/40 border-sky-800/50',
  },
  predict: {
    label: 'Predict',
    icon: 'psychology',
    description: 'Predict code outputs & test comprehension',
    badgeColor: 'text-purple-600 dark:text-purple-400',
    badgeBgLight: 'bg-purple-50 border-purple-200',
    badgeBgDark: 'bg-purple-950/40 border-purple-800/50',
  },
  writeRun: {
    label: 'Write & Run',
    icon: 'terminal',
    description: 'Interactive coding challenge with live runner',
    badgeColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBgLight: 'bg-emerald-50 border-emerald-200',
    badgeBgDark: 'bg-emerald-950/40 border-emerald-800/50',
  },
  debug: {
    label: 'Debug',
    icon: 'bug_report',
    description: 'Diagnose and fix broken Kotlin code snippets',
    badgeColor: 'text-rose-600 dark:text-rose-400',
    badgeBgLight: 'bg-rose-50 border-rose-200',
    badgeBgDark: 'bg-rose-950/40 border-rose-800/50',
  },
  mastered: {
    label: 'Mastered',
    icon: 'verified',
    description: 'Review key takeaways & claim lesson rewards',
    badgeColor: 'text-amber-600 dark:text-amber-400',
    badgeBgLight: 'bg-amber-50 border-amber-200',
    badgeBgDark: 'bg-amber-950/40 border-amber-800/50',
  },
};

export const SkipStageModal: React.FC<SkipStageModalProps> = ({
  isOpen,
  onClose,
  activeStages,
  currentStageIndex,
  onSelectStage,
  isDark,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter for next upcoming screens (screens 2, 3, 4, 5...)
  const nextStages = activeStages
    .map((stageKey, originalIdx) => ({
      stageKey,
      stageNumber: originalIdx + 1,
    }))
    .filter((stage) => stage.stageNumber > currentStageIndex + 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skip-stage-title"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl p-5 shadow-2xl border transition-all ${
          isDark
            ? 'bg-[#151a27] border-white/10 text-slate-100 shadow-black/80'
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                isDark
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-600'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">fast_forward</span>
            </div>
            <div>
              <h2 id="skip-stage-title" className="font-['Outfit'] font-bold text-base tracking-tight leading-tight">
                Skip to Screen
              </h2>
              <p className="font-['Outfit'] text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Jump directly to any upcoming stage
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-0.5">
          {nextStages.map(({ stageKey, stageNumber }) => {
            const meta = STAGE_META[stageKey] || {
              label: stageKey,
              icon: 'arrow_forward',
              description: '',
              badgeColor: 'text-indigo-500',
              badgeBgLight: 'bg-indigo-50 border-indigo-200',
              badgeBgDark: 'bg-indigo-950/40 border-indigo-800/50',
            };

            return (
              <button
                key={stageKey}
                type="button"
                id={`skip-option-stage-${stageNumber}`}
                onClick={() => {
                  soundFX.playClick();
                  onSelectStage(stageKey);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer group active:scale-[0.98] ${
                  isDark
                    ? 'bg-[#1b2234] border-white/5 hover:border-amber-500/40 hover:bg-[#20293f]'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Number pill */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-['Outfit'] font-bold text-sm shrink-0 border transition-transform group-hover:scale-105 ${
                      isDark ? meta.badgeBgDark : meta.badgeBgLight
                    } ${meta.badgeColor}`}
                  >
                    {stageNumber}
                  </div>

                  {/* Text details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-['Outfit'] font-bold text-xs tracking-wide">
                        Screen {stageNumber}: {meta.label}
                      </span>
                    </div>
                    <p className="font-['Outfit'] text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {meta.description}
                    </p>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isDark
                      ? 'text-slate-500 group-hover:text-amber-300 group-hover:bg-amber-500/10'
                      : 'text-slate-400 group-hover:text-amber-700 group-hover:bg-amber-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer cancel button */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-['Outfit'] font-semibold transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
