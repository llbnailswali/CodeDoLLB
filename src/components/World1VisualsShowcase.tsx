import React from 'react';
import { AppTheme } from '../types';
import { soundFX } from '../utils/audio';
import { WORLD_1_LESSON_VISUALS } from '../data/world1LessonVisuals';

interface World1VisualsShowcaseProps {
  theme: AppTheme;
  onBack: () => void;
}

// Standalone gallery: every World 1 (Kotlin Awakening) lesson's mental-model
// visual, stacked and labeled by lesson name, independent of whether that
// lesson's full Learn-stage content has been authored yet.
export const World1VisualsShowcase: React.FC<World1VisualsShowcaseProps> = ({ theme, onBack }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex-1 w-full overflow-y-auto ${isDark ? 'bg-[#0b0f19]' : 'bg-[#f8f9fb]'}`}>
      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-10">
        <div className="flex items-center gap-2.5 mb-1">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => {
              soundFX.playClick();
              onBack();
            }}
            className={`w-10 h-10 rounded-xl neu-raised flex items-center justify-center active:neu-pressed transition-all shrink-0 ${
              isDark ? 'bg-[#151b28] text-slate-200' : 'bg-[#e8eaf0] text-[#1e2433]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div>
            <h1 className={`font-['Outfit'] text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              World 1 Visuals
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Kotlin Awakening &middot; {WORLD_1_LESSON_VISUALS.length} lessons
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {WORLD_1_LESSON_VISUALS.map((entry, index) => (
            <section key={entry.lessonId}>
              <div className="flex items-baseline gap-2 mb-2 px-1">
                <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className={`font-['Outfit'] text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {entry.title}
                </h2>
              </div>
              {entry.render(isDark)}
              <p className={`text-[11px] mt-2 px-1 leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {entry.idea}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
