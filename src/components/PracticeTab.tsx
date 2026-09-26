import React from 'react';
import { AppTheme, UserStats } from '../types';
import { CODEDO_MASTER_WORLDS, MasterWorldEntry } from '../data/curriculum/masterCurriculumCatalog';
import { AVAILABLE_FIVE_STAGE_LESSONS } from '../data/lessonStagesData';
import { LessonRepository } from '../data/dailyBattleQuestions';
import { StorageManager, PracticeProblemMode } from '../utils/storage';
import { pickRandomPracticeTask } from '../utils/randomPractice';
import { soundFX } from '../utils/audio';
import { DrillType } from './PracticeView';

interface PracticeTabProps {
  theme: AppTheme;
  userStats: UserStats;
  onStartDrill: (drillType?: DrillType) => void;
  onOpenWorldProblems: (worldId: string, mode: PracticeProblemMode) => void;
  onOpenLesson: (lessonKey: string, mode: PracticeProblemMode, isRandomPractice?: boolean) => void;
}

// Same "content is authored" check Listing.tsx uses -- a world only counts
// as practice-able once every one of its lessons has real five-stage data.
const hasCollectedWorldData = (world: MasterWorldEntry) =>
  world.lessons.length > 0 && world.lessons.every((l) => Boolean(l.fiveStageLessonKey));

export const PracticeTab: React.FC<PracticeTabProps> = ({
  theme,
  userStats,
  onStartDrill,
  onOpenWorldProblems,
  onOpenLesson,
}) => {
  const isDark = theme === 'dark';

  // Same coarse, global-counter progress approximation Listing.tsx already
  // uses (there's no true per-lesson completion tracking yet) -- reused
  // here rather than inventing a second, differently-shaped estimate.
  const completedWorldsCount =
    (userStats.completedLessons ?? 0) > 15 ? userStats.completedWorlds ?? 0 : 0;

  const worldStats = CODEDO_MASTER_WORLDS.filter(hasCollectedWorldData).map((world) => {
    const visibleLessons = world.lessons.filter((l) => !l.isBoss);
    const totalLessons = Math.max(1, visibleLessons.length);
    const completedInThisWorld =
      world.order === 1
        ? Math.min(totalLessons, userStats.completedLessons ?? 0)
        : world.order <= completedWorldsCount
        ? totalLessons
        : 0;

    let writeRunCount = 0;
    let debugCount = 0;
    visibleLessons.forEach((lesson) => {
      const five = lesson.fiveStageLessonKey
        ? AVAILABLE_FIVE_STAGE_LESSONS[lesson.fiveStageLessonKey]
        : undefined;
      if (five?.writeRun) writeRunCount += 1;
      if (five?.debug) debugCount += 1;
    });

    return {
      world,
      visibleLessons,
      totalLessons,
      completedInThisWorld,
      writeRunCount,
      debugCount,
      // A world beyond the one currently in progress hasn't been touched
      // at all yet -- practicing it wouldn't reinforce anything real.
      practiceLocked: world.order > completedWorldsCount + 1,
    };
  });

  const handleSurpriseMe = () => {
    soundFX.playClick();
    const pick = pickRandomPracticeTask(userStats);
    if (!pick) return;

    const five = AVAILABLE_FIVE_STAGE_LESSONS[pick.lessonKey];
    if (five && StorageManager.getPracticeProblemStatus(five.id, pick.mode) === 'not_started') {
      StorageManager.setPracticeProblemStatus(five.id, pick.mode, 'in_progress');
    }
    onOpenLesson(pick.lessonKey, pick.mode, true);
  };

  // "Continue Practicing" shows whichever Write & Run / Debug problem the
  // learner most recently opened -- not a generic "next lesson to learn"
  // guess -- and is hidden entirely until that actually exists.
  const lastAttempt = StorageManager.getLastPracticeAttempt();
  const lastAttemptFive = lastAttempt ? AVAILABLE_FIVE_STAGE_LESSONS[lastAttempt.lessonKey] : undefined;
  const lastAttemptStatus =
    lastAttempt && lastAttemptFive
      ? StorageManager.getPracticeProblemStatus(lastAttemptFive.id, lastAttempt.mode)
      : 'not_started';
  const lastAttemptStageLabel = lastAttempt?.mode === 'writeRun' ? 'Write & Run' : 'Debug Code';
  const lastAttemptTitle = lastAttemptFive
    ? (lastAttempt!.mode === 'writeRun' ? lastAttemptFive.writeRun?.title : lastAttemptFive.debug?.title) ??
      lastAttemptFive.topicTitle
    : undefined;

  // Weak-skill counts, derived from real logged mistakes (StorageManager) --
  // never fabricated. Only shown once the learner actually has some.
  const mistakeQuestions = StorageManager.getMistakes()
    .map((m) => LessonRepository.getById(m.questionId))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));
  const bugFixMistakeCount = mistakeQuestions.filter((q) => q.challengeType === 'bug-fix').length;
  const writeRunMistakeCount = mistakeQuestions.length - bugFixMistakeCount;

  const handleReviewMistakes = () => {
    onStartDrill('mistakes');
  };

  return (
    <div
      className={`min-h-full min-h-screen w-full flex flex-col items-center select-none pb-28 pt-2 px-4 transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-[#e2e8f0]' : 'bg-[#f1f4f9] text-[#1e2433]'
      }`}
    >
      <div className="w-full max-w-md flex flex-col space-y-4">
        <p className={`pt-1 text-left text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Write code. Fix bugs. Strengthen what you've learned.
        </p>

        {/* Surprise Me -- deliberately styled apart from every other flat
            card on this screen (gradient + glow + sparkle accent) so it
            reads as a special, "try something magical" pick rather than
            just another list item. */}
        <section>
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="relative w-full rounded-2xl p-3.5 overflow-hidden flex items-center justify-between text-left transition-all active:scale-[0.98] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 border border-white/10 animate-surprise-glow animate-surprise-gradient"
          >
            {/* Ambient sparkle glints */}
            <span className="absolute top-2 right-10 flex h-1.5 w-1.5 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/90" />
            </span>
            <span className="absolute bottom-3 right-16 h-1 w-1 rounded-full bg-white/60 pointer-events-none" />

            <div className="flex items-center gap-2.5 relative">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/80 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">celebration</span>
                  Surprise Me
                </span>
                <h3 className="text-sm font-bold font-['Outfit'] tracking-tight text-white">Random Exercise</h3>
                <span className="text-[11px] font-medium block text-white/70">
                  Jump into an exercise from learned concepts
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-white/90 relative">
              auto_awesome
            </span>
          </button>
        </section>

        {/* Continue Practicing -- only appears once the learner has actually
            opened a Write & Run / Debug problem at least once. */}
        {lastAttempt && lastAttemptFive && (
          <section
            className={`rounded-2xl p-4 border transition-all ${
              isDark ? 'bg-[#151b28] border-white/10 shadow-lg' : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-500 block">
                  Continue Practicing
                </span>
                <h2 className="text-[15px] font-bold font-['Outfit'] tracking-tight truncate">
                  {lastAttemptTitle}
                </h2>
                <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lastAttemptStageLabel} · {lastAttemptFive.worldName}
                </p>
                <span
                  className={`inline-block mt-1 text-[10px] font-semibold ${
                    lastAttemptStatus === 'completed' ? 'text-emerald-500' : 'text-indigo-500'
                  }`}
                >
                  {lastAttemptStatus === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onOpenLesson(lastAttempt.lessonKey, lastAttempt.mode);
                }}
                className="px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1 shrink-0 transition-all active:scale-95 bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* Recommended for You -- only shown once real mistake data exists */}
        {mistakeQuestions.length > 0 && (
          <section
            className={`rounded-2xl p-4 border flex flex-col gap-2.5 transition-all ${
              isDark ? 'bg-[#151b28] border-white/10 shadow-lg' : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-500 block">
                Recommended for You
              </span>
              <h3 className="text-sm font-bold font-['Outfit'] tracking-tight">Strengthen Your Weak Skills</h3>
              <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Personalized from your recent attempts
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  handleReviewMistakes();
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isDark ? 'bg-[#0f1420] border-white/5' : 'bg-[#f0f3f8] border-slate-200/60'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-indigo-500">code</span>
                <span className="font-mono font-bold text-[13px]">{writeRunMistakeCount}</span>
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Write &amp; Run
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  handleReviewMistakes();
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isDark ? 'bg-[#0f1420] border-white/5' : 'bg-[#f0f3f8] border-slate-200/60'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-rose-500">bug_report</span>
                <span className="font-mono font-bold text-[13px]">{bugFixMistakeCount}</span>
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Debug Code
                </span>
              </button>
            </div>
          </section>
        )}

        {/* Practice by World */}
        <section className="space-y-3">
          <div className="space-y-0.5 px-0.5">
            <h2 className="text-base font-bold font-['Outfit'] tracking-tight">Practice by World</h2>
            <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Choose a World and sharpen your Kotlin skills
            </p>
          </div>
          <div className="space-y-3">
            {worldStats.map((entry) => {
              if (entry.practiceLocked) {
                return (
                  <div
                    key={entry.world.id}
                    className={`rounded-2xl p-4 border opacity-75 flex flex-col gap-2 ${
                      isDark ? 'bg-[#151b28] border-white/5' : 'bg-white border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                          isDark ? 'bg-[#0f1420] text-slate-500' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        World {entry.world.order}
                      </span>
                      <div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium ${
                          isDark ? 'bg-[#0f1420] text-slate-500' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">lock</span>
                        <span>Practice Locked</span>
                      </div>
                    </div>
                    <h3 className={`text-sm font-bold font-['Outfit'] tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {entry.world.title}
                    </h3>
                    <div
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl ${
                        isDark ? 'bg-[#0f1420]' : 'bg-slate-50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-slate-500 shrink-0">
                        lock_clock
                      </span>
                      <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Learn your first concept in this World to unlock practice.
                      </p>
                    </div>
                  </div>
                );
              }

              const fullyLearned = entry.completedInThisWorld >= entry.totalLessons;

              return (
                <div
                  key={entry.world.id}
                  className={`rounded-2xl p-4 border flex flex-col gap-2.5 transition-all ${
                    isDark ? 'bg-[#151b28] border-white/10 shadow-lg' : 'bg-white border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase text-indigo-500 bg-indigo-500/10">
                      World {entry.world.order}
                    </span>
                    {fullyLearned ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold text-emerald-500 bg-emerald-500/10">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        <span>
                          {entry.completedInThisWorld} / {entry.totalLessons} learned
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {entry.completedInThisWorld} / {entry.totalLessons} learned
                        </span>
                        <div
                          className={`w-10 h-1.5 rounded-full overflow-hidden ${
                            isDark ? 'bg-[#090d16]' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${Math.round((entry.completedInThisWorld / entry.totalLessons) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold font-['Outfit'] tracking-tight">{entry.world.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onOpenWorldProblems(entry.world.id, 'writeRun');
                      }}
                      disabled={entry.writeRunCount === 0}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
                        isDark ? 'bg-[#0f1420] border-white/5' : 'bg-[#f0f3f8] border-slate-200/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px] text-indigo-500">code</span>
                      <span className="font-mono font-bold text-[13px]">{entry.writeRunCount}</span>
                      <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Write &amp; Run
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onOpenWorldProblems(entry.world.id, 'debug');
                      }}
                      disabled={entry.debugCount === 0}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
                        isDark ? 'bg-[#0f1420] border-white/5' : 'bg-[#f0f3f8] border-slate-200/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px] text-rose-500">bug_report</span>
                      <span className="font-mono font-bold text-[13px]">{entry.debugCount}</span>
                      <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Debug Code
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
