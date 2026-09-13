/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
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
import { Detail, DetailHandle } from './components/Detail';

export default function App() {
  const [theme, setTheme] = useState<AppTheme>(() => StorageManager.getTheme());
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [isLessonActive, setIsLessonActive] = useState<boolean>(false);
  const [fiveStageLessonKey, setFiveStageLessonKey] = useState<string | null>(null);
  const [activeQuestionPool, setActiveQuestionPool] = useState<LessonQuestion[]>(LESSON_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // Question 2 (Step 2 of 5: val x = 10, val y = 20)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => StorageManager.getSoundEnabled());
  const [fontSize, setFontSize] = useState<FontSize>(() => StorageManager.getFontSize());

  // User Stats loaded from storage with daily reset check
  const [userStats, setUserStats] = useState<UserStats>(() => StorageManager.getUserStats());
  const [curriculumWorldId, setCurriculumWorldId] = useState<string>('world-1');
  const detailRef = useRef<DetailHandle>(null);

  // Open Curriculum Map with optional target world
  const handleOpenCurriculum = (worldId?: string) => {
    soundFX.playClick();
    if (worldId) {
      setCurriculumWorldId(worldId);
    }
    setActiveTab('curriculum');
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
    setIsLessonActive(true);
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

    setIsLessonActive(true);
  };

  const handleExitLesson = () => {
    soundFX.playClick();
    setIsLessonActive(false);
  };

  // Make every screen respect the Android hardware back button instead of the
  // default (exit the app from wherever it's pressed): step back through the
  // lesson stages, close an active drill, or return to the Learn tab -- only
  // exiting the app once we're already at that true root.
  useEffect(() => {
    const listenerPromise = CapacitorApp.addListener('backButton', () => {
      if (fiveStageLessonKey) {
        detailRef.current?.goBack();
      } else if (isLessonActive) {
        handleExitLesson();
      } else if (activeTab === 'curriculum') {
        soundFX.playClick();
        setActiveTab('learn');
      } else if (activeTab !== 'learn') {
        soundFX.playClick();
        setActiveTab('learn');
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      listenerPromise.then((handle) => handle.remove());
    };
  }, [fiveStageLessonKey, isLessonActive, activeTab]);

  const handleLessonComplete = (earnedXP: number) => {
    setUserStats((prev) => {
      const updated: UserStats = {
        ...prev,
        stars: prev.stars + earnedXP,
        xp: prev.xp + earnedXP,
        todayLessonsCompleted: Math.min(prev.todayGoal, prev.todayLessonsCompleted + 1),
        completedLessons: prev.completedLessons + 1,
      };
      StorageManager.saveUserStats(updated);
      return updated;
    });

    // Check if next step exists in this drill/lesson session
    if (currentQuestionIndex + 1 < activeQuestionPool.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsLessonActive(false);
    }
  };

  const handleResetProgress = () => {
    StorageManager.resetAll();
    setUserStats(DEFAULT_USER_STATS);
    setIsLessonActive(false);
    setActiveTab('learn');
  };

  return (
    <div className={`min-h-full min-h-screen w-full flex flex-col relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#f8f9fb] text-[#191c1e]'
    }`}>
        {/* Top Header */}
        {!fiveStageLessonKey && (
          <Header
            theme={theme}
            activeTab={activeTab}
            onProfileClick={() => {
              setIsLessonActive(false);
              setFiveStageLessonKey(null);
              setActiveTab('profile');
            }}
            onToggleTheme={toggleTheme}
            showBack={isLessonActive || activeTab === 'curriculum'}
            title={isLessonActive ? 'Active Lesson' : activeTab === 'curriculum' ? 'Curriculum' : undefined}
            onBack={() => {
              if (isLessonActive) {
                setIsLessonActive(false);
              } else if (activeTab === 'curriculum') {
                setActiveTab('learn');
              }
            }}
          />
        )}

        {/* Screen Switcher */}
        <main className={`flex-1 w-full flex flex-col font-size-${fontSize}`}>
          {fiveStageLessonKey ? (
            /* 5-Stage Interactive Lesson Flow (Learn -> Explore -> Predict -> Write & Run -> Mastered) */
            <Detail
              ref={detailRef}
              theme={theme}
              initialLessonKey={fiveStageLessonKey}
              userStats={userStats}
              onExit={() => setFiveStageLessonKey(null)}
              onCompleteLesson={(earnedXP) => {
                handleLessonComplete(earnedXP);
                setFiveStageLessonKey(null);
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
              onJumpToToday={() => setActiveTab('learn')}
              onStartLesson={(topic) => setFiveStageLessonKey(topic || 'variables')}
            />
          ) : activeTab === 'learn' ? (
            /* Main Learning Odyssey Path: Worlds-only landing page */
            <Home
              theme={theme}
              userStats={userStats}
              onStartLesson={() => setFiveStageLessonKey('variables')}
              onOpenCurriculum={handleOpenCurriculum}
              onSelectWorld={handleOpenCurriculum}
            />
          ) : activeTab === 'practice' ? (
            /* Practice & Code Sandbox */
            <PracticeView
              theme={theme}
              onStartDrill={handleStartDrill}
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
              onStartLesson={() => setFiveStageLessonKey('variables')}
              onOpenCurriculum={() => handleOpenCurriculum('world-1')}
              onToggleTheme={toggleTheme}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              fontSize={fontSize}
              onChangeFontSize={changeFontSize}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {/* Bottom Navigation Bar (Hidden when actively in lesson or drill) */}
        {!isLessonActive && !fiveStageLessonKey && (
          <Navigation
            theme={theme}
            activeTab={activeTab === 'curriculum' ? 'learn' : activeTab}
            onSelectTab={(tab) => {
              setIsLessonActive(false);
              setFiveStageLessonKey(null);
              setActiveTab(tab);
            }}
          />
        )}
      </div>
  );
}
