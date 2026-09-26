/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppTheme, LessonMeta } from '../types';
import { CODEDO_MASTER_WORLDS } from '../data/curriculum/masterCurriculumCatalog';
import { AVAILABLE_FIVE_STAGE_LESSONS, FiveStageLesson } from '../data/lessonStagesData';
import { StorageManager, PracticeProblemMode, PracticeProblemStatus } from '../utils/storage';
import { soundFX } from '../utils/audio';

interface TaskListScreenProps {
  theme: AppTheme;
  worldId: string;
  mode: PracticeProblemMode;
  onBack: () => void;
  onOpenLesson: (lessonKey: string, mode: PracticeProblemMode) => void;
  onToggleTheme?: () => void;
}

interface ProblemEntry {
  lesson: LessonMeta;
  five: FiveStageLesson;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: PracticeProblemStatus;
}

const DIFFICULTY_STYLES: Record<'easy' | 'medium' | 'hard', string> = {
  easy: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  hard: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
};

// Debug's `subtitle` is authored as one run-on paragraph with no "\n\n"
// breaks (see PITFALLS.md's "Learn's subtitle/explanation/keyTakeaway..."
// entry -- that's the data-level version of this same problem), so break
// onto a new line after each completed sentence there. Write & Run's own
// `description` already follows the numbered-steps authoring standard with
// real "\n\n" breaks -- including "1. ...", "2. ..." markers whose trailing
// "N." would otherwise look like a sentence end to this same regex and get
// wrongly split from its own step text. Any text that already has a real
// line break is trusted as-is and left untouched.
const breakAfterSentences = (text: string): string =>
  text.includes('\n') ? text : text.replace(/([.!?])\s+(?=[A-Z(])/g, '$1\n\n');

export const TaskListScreen: React.FC<TaskListScreenProps> = ({
  theme,
  worldId,
  mode,
  onBack,
  onOpenLesson,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';
  const world = CODEDO_MASTER_WORLDS.find((w) => w.id === worldId);
  const visibleLessons = (world?.lessons ?? []).filter((l) => !l.isBoss);

  const problems: ProblemEntry[] = [];
  visibleLessons.forEach((lesson, idx) => {
    if (!lesson.fiveStageLessonKey) return;
    const five = AVAILABLE_FIVE_STAGE_LESSONS[lesson.fiveStageLessonKey];
    if (!five) return;

    if (mode === 'writeRun' && five.writeRun) {
      // No real difficulty rating exists yet for Write & Run exercises --
      // this is a display-only heuristic (position within the world) until
      // real per-exercise difficulty data is authored.
      const fraction = idx / Math.max(1, visibleLessons.length - 1);
      const difficulty: 'easy' | 'medium' | 'hard' =
        fraction < 0.34 ? 'easy' : fraction < 0.7 ? 'medium' : 'hard';
      problems.push({
        lesson,
        five,
        title: five.writeRun.title,
        description: five.writeRun.description,
        difficulty,
        status: StorageManager.getPracticeProblemStatus(five.id, 'writeRun'),
      });
    } else if (mode === 'debug' && five.debug) {
      problems.push({
        lesson,
        five,
        title: five.debug.title,
        description: five.debug.subtitle,
        difficulty: five.debug.difficulty,
        status: StorageManager.getPracticeProblemStatus(five.id, 'debug'),
      });
    }
  });

  const totalCount = problems.length;
  const completedCount = problems.filter((p) => p.status === 'completed').length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const modePillLabel = mode === 'writeRun' ? 'WRITE & RUN' : 'DEBUG CODE';
  const modeIcon = mode === 'writeRun' ? 'code' : 'bug_report';
  const modeIconColor = mode === 'writeRun' ? 'text-indigo-500' : 'text-rose-500';
  // Header tint doubles as the mode indicator (no separate pill/chip needed).
  const modeHeaderTint =
    mode === 'writeRun'
      ? isDark
        ? 'bg-indigo-950/40 border-indigo-500/25'
        : 'bg-indigo-50/90 border-indigo-200 shadow-xs'
      : isDark
      ? 'bg-rose-950/30 border-rose-500/25'
      : 'bg-rose-50/90 border-rose-200 shadow-xs';

  const handleOpenProblem = (problem: ProblemEntry) => {
    soundFX.playClick();
    if (problem.status === 'not_started') {
      StorageManager.setPracticeProblemStatus(problem.five.id, mode, 'in_progress');
    }
    onOpenLesson(problem.lesson.fiveStageLessonKey!, mode);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#f8f9fb] text-[#191c1e]'
      }`}
    >
      {/* Header -- sticky within the app's single #root scroll container
          (not its own nested overflow-y-auto div), so this screen's scroll
          position is captured/restored the same way every other tab screen's
          is (see App.tsx's pushRoute/scrollTop handling). */}
      <header
        className={`sticky top-0 px-4 py-2.5 border-b flex items-center gap-3 z-30 transition-colors ${modeHeaderTint}`}
      >
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onBack();
          }}
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${
            isDark
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80'
          }`}
          aria-label="Back"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="flex-1 flex items-center gap-1.5 min-w-0">
          <span className={`material-symbols-outlined text-[15px] shrink-0 ${modeIconColor}`}>{modeIcon}</span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold truncate leading-tight tracking-tight font-['Outfit']">
                {world?.title ?? 'Practice'}
              </h1>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-500">
                World {world?.order ?? ''}
              </span>
            </div>
            <span className={`text-[11px] font-medium leading-none mt-0.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {modePillLabel}
            </span>
          </div>
        </div>
        {onToggleTheme && (
          <button
            type="button"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onClick={() => {
              soundFX.playClick();
              onToggleTheme();
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-amber-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        )}
      </header>

      <div className="w-full max-w-md mx-auto pb-8">
          {/* Practice Progress */}
          <div className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                isDark ? 'bg-[#151b28] border-white/10 shadow-lg' : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-indigo-500">task_alt</span>
                  <span className={`text-[10px] font-extrabold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    PRACTICE PROGRESS
                  </span>
                  <span className="text-[11px] font-semibold ml-0.5">
                    • {completedCount} of {totalCount} completed
                  </span>
                </div>
                <span className="text-indigo-500 font-bold text-xs tracking-tight">{progressPct}%</span>
              </div>
              <div
                className={`w-full h-1.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-[#090d16]' : 'bg-slate-200'
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="px-4 mt-3">
            <div className="flex flex-col px-1 mb-2.5">
              <h3 className="text-xs font-bold tracking-widest uppercase">PRACTICE PROBLEMS</h3>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Problems combine skills from across this World.
              </p>
            </div>

            {totalCount === 0 ? (
              <div
                className={`p-4 rounded-2xl border text-center ${
                  isDark ? 'bg-[#151b28] border-white/10 text-slate-400' : 'bg-white border-slate-200/80 text-slate-500'
                }`}
              >
                <p className="text-xs font-medium">No problems available for this World yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {problems.map((problem, idx) => {
                  const completed = problem.status === 'completed';
                  const inProgress = problem.status === 'in_progress';

                  const actionLabel = completed ? 'Practice Again' : inProgress ? 'Continue' : 'Start';

                  return (
                    <article
                      key={problem.five.id}
                      onClick={() => handleOpenProblem(problem)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenProblem(problem);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border flex flex-col gap-2 transition-all active:scale-[0.99] cursor-pointer ${
                        isDark
                          ? `bg-[#151b28] shadow-lg ${inProgress ? 'border-indigo-500/30' : 'border-white/10'}`
                          : `bg-white shadow-sm ${inProgress ? 'border-indigo-500/30' : 'border-slate-200/80'}`
                      }`}
                    >
                      <div className="flex flex-col min-w-0 w-full gap-1.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-full border-2 border-indigo-500/30 text-indigo-500 flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                              isDark ? 'bg-[#151b28]' : 'bg-white'
                            }`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                          <h4 className="text-xs font-bold leading-tight min-w-0 flex-1">{problem.title}</h4>
                          <span
                            className={`material-symbols-outlined text-[12px] shrink-0 ${modeIconColor}`}
                            aria-hidden="true"
                          >
                            {modeIcon}
                          </span>
                        </div>
                        <p className={`text-[11px] font-medium leading-snug whitespace-pre-line text-left py-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {breakAfterSentences(problem.description)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0 ${DIFFICULTY_STYLES[problem.difficulty]}`}
                          >
                            {problem.difficulty}
                          </span>
                          {completed && (
                            <span className={`text-[10px] font-medium truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>• Completed</span>
                          )}
                          {inProgress && <span className="text-[10px] text-indigo-500 font-semibold truncate">• In Progress</span>}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProblem(problem);
                          }}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all ${
                            inProgress
                              ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                              : completed
                              ? isDark
                                ? 'bg-[#0f1420] text-slate-400'
                                : 'bg-[#f0f3f8] text-slate-500'
                              : 'bg-indigo-500/10 text-indigo-500'
                          }`}
                        >
                          <span>{actionLabel}</span>
                          <span className="material-symbols-outlined text-[11px]">chevron_right</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};
