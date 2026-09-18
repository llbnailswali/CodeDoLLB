/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { AppTheme, FontSize, LessonQuestion, TabType, UserStats } from './types';
import {
  ALL_CURRICULUM_QUESTIONS,
  DAILY_BATTLE_POOL,
  LESSON_QUESTIONS,
  WORLD_1_QUESTIONS,
  WORLD_2_QUESTIONS,
  WORLD_3_QUESTIONS,
  LessonRepository,
} from './data/curriculumData';
import { soundFX } from './utils/audio';
import { StorageManager, DEFAULT_USER_STATS } from './utils/storage';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Listing } from './components/Listing';
import { ActiveLessonView } from './components/ActiveLessonView';
import { PracticeView, DrillType } from './components/PracticeView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { Detail, DetailHandle, StageKey } from './components/Detail';
import { World1VisualsShowcase } from './components/World1VisualsShowcase';
import { FontThemesView } from './components/FontThemesView';
import { applyFontComboToDom, getSavedFontCombo } from './utils/fontThemes';

type AppRoute =
  | { kind: 'tab'; tab: TabType; worldId?: string; scrollTop?: number }
  | { kind: 'drill'; scrollTop?: number }
  | { kind: 'lesson'; lessonKey: string; initialStage?: StageKey; scrollTop?: number }
  | { kind: 'visuals'; scrollTop?: number }
  | { kind: 'font-themes'; scrollTop?: number };

export default function App() {
  const [theme, setTheme] = useState<AppTheme>(() => StorageManager.getTheme());
  const [navigationStack, setNavigationStack] = useState<AppRoute[]>([{ kind: 'tab', tab: 'learn' }]);
  const [activeQuestionPool, setActiveQuestionPool] = useState<LessonQuestion[]>(LESSON_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // Question 2 (Step 2 of 5: val x = 10, val y = 20)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => StorageManager.getSoundEnabled());
  const [fontSize, setFontSize] = useState<FontSize>(() => StorageManager.getFontSize());

  // Apply persisted font combo to DOM on startup
  useEffect(() => {
    applyFontComboToDom(getSavedFontCombo());
  }, []);

  // User Stats loaded from storage with daily reset check
  const [userStats, setUserStats] = useState<UserStats>(() => StorageManager.getUserStats());
  const detailRef = useRef<DetailHandle>(null);
  const currentRoute = navigationStack[navigationStack.length - 1];
  const activeTab = currentRoute.kind === 'tab' ? currentRoute.tab : 'learn';
  const curriculumWorldId = currentRoute.kind === 'tab' && currentRoute.tab === 'curriculum' ? currentRoute.worldId || 'world-1' : 'world-1';
  const isLessonActive = currentRoute.kind === 'drill';
  const fiveStageLessonKey = currentRoute.kind === 'lesson' ? currentRoute.lessonKey : null;
  const fiveStageInitialStage = currentRoute.kind === 'lesson' ? currentRoute.initialStage : undefined;
  const showVisualsGallery = currentRoute.kind === 'visuals';
  const showFontThemes = currentRoute.kind === 'font-themes';

  const getRootScrollTop = () => {
    const rootEl = document.getElementById('root');
    return rootEl ? rootEl.scrollTop : window.scrollY;
  };

  const pushRoute = (route: AppRoute) => setNavigationStack((previous) => {
    const current = previous[previous.length - 1];
    return [...previous.slice(0, -1), { ...current, scrollTop: getRootScrollTop() }, route];
  });
  const popRoute = () => setNavigationStack((previous) => previous.length > 1 ? previous.slice(0, -1) : previous);

  // Home is the app's only root. Tabs are destinations from that root, not a
  // history trail: Back from any tab always returns to Home.
  const routeFromHome = (route: AppRoute) => setNavigationStack((previous) => {
    const current = previous[previous.length - 1];
    const existingHome = previous.find(
      (entry): entry is Extract<AppRoute, { kind: 'tab' }> => entry.kind === 'tab' && entry.tab === 'learn'
    );
    const home = current.kind === 'tab' && current.tab === 'learn'
      ? { ...current, scrollTop: getRootScrollTop() }
      : existingHome || { kind: 'tab' as const, tab: 'learn' as TabType };
    return [home, route];
  });

  const openTab = (tab: TabType) => {
    if (tab === 'learn') {
      setNavigationStack((previous) => {
        const current = previous[previous.length - 1];
        const existingHome = previous.find(
          (entry): entry is Extract<AppRoute, { kind: 'tab' }> => entry.kind === 'tab' && entry.tab === 'learn'
        );
        return [
          current.kind === 'tab' && current.tab === 'learn'
            ? { ...current, scrollTop: getRootScrollTop() }
            : existingHome || { kind: 'tab' as const, tab: 'learn' as TabType },
        ];
      });
      return;
    }
    routeFromHome({ kind: 'tab', tab });
  };

  // Each route owns its position in the app's single scroll container. A new
  // route starts at the top; popping restores the exact place the learner left.
  useLayoutEffect(() => {
    const scrollTop = currentRoute.scrollTop ?? 0;
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.scrollTo({ top: scrollTop, behavior: 'auto' });
    } else {
      window.scrollTo({ top: scrollTop, behavior: 'auto' });
    }
  }, [currentRoute]);

  // Open Curriculum Map with optional target world
  const handleOpenCurriculum = (worldId?: string) => {
    soundFX.playClick();
    routeFromHome({ kind: 'tab', tab: 'curriculum', worldId: worldId || curriculumWorldId });
  };

  // Sync sound setting with soundFX utility
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // Sync dark theme class on document element for tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    StorageManager.setTheme(theme);
  }, [theme]);

  // Persist font-size preference; applied via className on <main> only, so
  // the Header toolbar and bottom Navigation tabs are never affected.
  useEffect(() => {
    StorageManager.setFontSize(fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      StorageManager.setTheme(next);
      return next;
    });
  };

  const changeFontSize = (next: FontSize) => {
    setFontSize(next);
    StorageManager.setFontSize(next);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFX.enabled = next;
      StorageManager.setSoundEnabled(next);
      return next;
    });
  };

  const handleStartLesson = () => {
    soundFX.playClick();
    setActiveQuestionPool(LESSON_QUESTIONS);
    setCurrentQuestionIndex(1); // Step 2 of 5 (matching prompt)
    routeFromHome({ kind: 'drill' });
  };

  const handleStartDrill = (drillType?: DrillType) => {
    soundFX.playClick();

    switch (drillType) {
      case 'battle':
        setActiveQuestionPool(DAILY_BATTLE_POOL);
        setCurrentQuestionIndex(0);
        break;
      case 'sprint':
        setActiveQuestionPool(WORLD_1_QUESTIONS.slice(0, 3));
        setCurrentQuestionIndex(0);
        break;
      case 'inference':
        setActiveQuestionPool(
          ALL_CURRICULUM_QUESTIONS.filter(
            (q) => q.skill === 'null-safety' || q.skill === 'variables'
          )
        );
        setCurrentQuestionIndex(0);
        break;
      case 'conditionals':
        setActiveQuestionPool(WORLD_2_QUESTIONS);
        setCurrentQuestionIndex(0);
        break;
      case 'loops':
        setActiveQuestionPool(WORLD_3_QUESTIONS);
        setCurrentQuestionIndex(0);
        break;
      case 'mistakes': {
        const logged = StorageManager.getMistakes();
        const pool = logged
          .map((m) => LessonRepository.getById(m.questionId))
          .filter(Boolean) as LessonQuestion[];
        setActiveQuestionPool(pool.length > 0 ? pool : WORLD_1_QUESTIONS);
        setCurrentQuestionIndex(0);
        break;
      }
      default:
        setActiveQuestionPool(LESSON_QUESTIONS);
        setCurrentQuestionIndex(0);
        break;
    }

    routeFromHome({ kind: 'drill' });
  };

  const handleExitLesson = () => {
    soundFX.playClick();
    popRoute();
  };

  // Make every screen respect the Android hardware back button instead of the
  // default (exit the app from wherever it's pressed): step back through the
  // lesson stages, close an active drill, or return to the Learn tab -- only
  // exiting the app once we're already at that true root.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    let removeListener: (() => void) | null = null;
    CapacitorApp.addListener('backButton', () => {
      if (showVisualsGallery) {
        popRoute();
      } else if (showFontThemes) {
        popRoute();
      } else if (fiveStageLessonKey) {
        detailRef.current?.goBack();
      } else if (isLessonActive) {
        handleExitLesson();
      } else if (navigationStack.length > 1) {
        soundFX.playClick();
        popRoute();
      } else {
        CapacitorApp.exitApp();
      }
    })
      .then((handle) => {
        removeListener = () => handle.remove();
      })
      .catch(() => {
        // Safe fallback on environments where plugin is not supported
      });

    return () => {
      removeListener?.();
    };
  }, [showVisualsGallery, showFontThemes, fiveStageLessonKey, isLessonActive, navigationStack.length]);

  const handleLessonComplete = (earnedXP: number, completedWorldId?: string) => {
    setUserStats((prev) => {
      const nextCompletedLessons = prev.completedLessons + 1;
      let nextCompletedWorlds = prev.completedWorlds ?? 4;

      if (completedWorldId) {
        const orderMatch = completedWorldId.match(/\d+/);
        if (orderMatch) {
          const worldOrder = parseInt(orderMatch[0], 10);
          if (worldOrder > nextCompletedWorlds) {
            nextCompletedWorlds = Math.min(22, worldOrder);
          }
        }
      }

      const updated: UserStats = {
        ...prev,
        stars: prev.stars + earnedXP,
        xp: prev.xp + earnedXP,
        todayLessonsCompleted: Math.min(prev.todayGoal, prev.todayLessonsCompleted + 1),
        completedLessons: nextCompletedLessons,
        completedWorlds: nextCompletedWorlds,
      };
      StorageManager.saveUserStats(updated);
      return updated;
    });

    // A drill owns a multi-question session; a five-stage lesson owns its
    // own completion transition in the Detail callback below.
    if (currentRoute.kind === 'drill') {
      if (currentQuestionIndex + 1 < activeQuestionPool.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        popRoute();
      }
    }
  };

  const handleResetProgress = () => {
    StorageManager.resetAll();
    setUserStats(DEFAULT_USER_STATS);
    setNavigationStack([{ kind: 'tab', tab: 'learn' }]);
  };

  return (
    <div className={`min-h-full min-h-screen w-full flex flex-col relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#f8f9fb] text-[#191c1e]'
    }`}>
        {/* Top Header */}
        {!fiveStageLessonKey && !showVisualsGallery && !showFontThemes && (
          <Header
            theme={theme}
            activeTab={activeTab}
            onProfileClick={() => {
              openTab('profile');
            }}
            onToggleTheme={toggleTheme}
            // Tabs stay visually clean; Android Back returns them to Home.
            // Curriculum is part of the explicit learning path, so it keeps
            // its visible Back affordance.
            showBack={activeTab === 'curriculum' && navigationStack.length > 1}
            title={isLessonActive ? 'Active Lesson' : activeTab === 'curriculum' ? 'Curriculum' : undefined}
            onBack={() => {
              if (isLessonActive) {
                popRoute();
              } else if (navigationStack.length > 1) {
                popRoute();
              }
            }}
          />
        )}

        {/* Screen Switcher */}
        <main className={`flex-1 w-full flex flex-col font-size-${fontSize}`}>
          {showVisualsGallery ? (
            <World1VisualsShowcase theme={theme} onBack={popRoute} />
          ) : showFontThemes ? (
            <FontThemesView theme={theme} onBack={popRoute} />
          ) : fiveStageLessonKey ? (
            /* 5-Stage Interactive Lesson Flow (Learn -> Explore -> Predict -> Write & Run -> Mastered) */
            <Detail
              ref={detailRef}
              theme={theme}
              initialLessonKey={fiveStageLessonKey}
              initialStageKey={fiveStageInitialStage}
              userStats={userStats}
              onExit={() => {
                popRoute();
              }}
              onCompleteLesson={(earnedXP, worldId) => {
                handleLessonComplete(earnedXP, worldId);
                popRoute();
              }}
              onToggleTheme={toggleTheme}
            />
          ) : isLessonActive ? (
            /* Active Challenge / Drill View */
            <ActiveLessonView
              theme={theme}
              question={activeQuestionPool[currentQuestionIndex] || activeQuestionPool[0] || LESSON_QUESTIONS[0]}
              userStats={userStats}
              onExit={handleExitLesson}
              onLessonComplete={handleLessonComplete}
            />
          ) : activeTab === 'curriculum' ? (
            /* Curriculum Explorer View (Unrestricted dynamic core topic worlds) */
            <Listing
              theme={theme}
              initialWorldId={curriculumWorldId}
              restoreScrollPosition={typeof currentRoute.scrollTop === 'number'}
              userStats={userStats}
              onJumpToToday={() => openTab('learn')}
              onStartLesson={(topic) => {
                pushRoute({ kind: 'lesson', lessonKey: topic || 'variables' });
              }}
            />
          ) : activeTab === 'learn' ? (
            /* Main Learning Odyssey Path: Worlds-only landing page */
            <Home
              theme={theme}
              userStats={userStats}
              onStartLesson={() => {
                pushRoute({ kind: 'lesson', lessonKey: 'variables' });
              }}
              onOpenCurriculum={handleOpenCurriculum}
              onSelectWorld={handleOpenCurriculum}
            />
          ) : activeTab === 'practice' ? (
            /* Practice & Code Sandbox */
            <PracticeView
              theme={theme}
              onStartDrill={handleStartDrill}
              onOpenCodingChallenge={(lessonKey) => {
                routeFromHome({ kind: 'lesson', lessonKey: lessonKey || 'functions', initialStage: 'writeRun' });
              }}
            />
          ) : activeTab === 'leaderboard' ? (
            /* Rankings & Leaderboard */
            <LeaderboardView
              theme={theme}
              userStats={userStats}
            />
          ) : (
            /* User Profile & Settings */
            <ProfileView
              theme={theme}
              userStats={userStats}
              onStartLesson={() => routeFromHome({ kind: 'lesson', lessonKey: 'variables' })}
              onOpenCurriculum={() => handleOpenCurriculum('world-1')}
              onToggleTheme={toggleTheme}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              fontSize={fontSize}
              onChangeFontSize={changeFontSize}
              onResetProgress={handleResetProgress}
              onOpenVisualsGallery={() => routeFromHome({ kind: 'visuals' })}
              onOpenFontThemes={() => routeFromHome({ kind: 'font-themes' })}
            />
          )}
        </main>

        {/* Bottom Navigation Bar (Hidden when actively in lesson or drill) */}
        {!isLessonActive && !fiveStageLessonKey && !showVisualsGallery && !showFontThemes && (
          <Navigation
            theme={theme}
            activeTab={activeTab === 'curriculum' ? 'learn' : activeTab}
            onSelectTab={(tab) => {
              openTab(tab);
            }}
          />
        )}
      </div>
  );
}
