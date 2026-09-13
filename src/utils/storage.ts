import { AppTheme, UserStats, UserMistake } from '../types';

const STATS_KEY = 'codedo_user_stats';
const THEME_KEY = 'codedo_app_theme';
const SOUND_KEY = 'codedo_sound_enabled';
const MISTAKES_KEY = 'codedo_user_mistakes';
const LAST_ACTIVE_DATE_KEY = 'codedo_last_active_date';

export const DEFAULT_USER_STATS: UserStats = {
  streak: 12,
  stars: 2800,
  gems: 420,
  hearts: 5,
  xp: 2800,
  completedLessons: 2,
  todayLessonsCompleted: 1,
  todayGoal: 3,
};

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Robust, typed storage manager with daily reset handling and fallbacks
 */
export const StorageManager = {
  getTheme(): AppTheme {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  },

  setTheme(theme: AppTheme): void {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  },

  getSoundEnabled(): boolean {
    try {
      const saved = localStorage.getItem(SOUND_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return true;
  },

  setSoundEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(SOUND_KEY, String(enabled));
    } catch {
      // ignore
    }
  },

  getUserStats(): UserStats {
    try {
      const today = getTodayDateString();
      const lastActive = localStorage.getItem(LAST_ACTIVE_DATE_KEY);
      const savedStatsStr = localStorage.getItem(STATS_KEY);

      let stats: UserStats = DEFAULT_USER_STATS;
      if (savedStatsStr) {
        const parsed = JSON.parse(savedStatsStr);
        stats = {
          ...DEFAULT_USER_STATS,
          ...parsed,
        };
      }

      // Check daily reset
      if (lastActive && lastActive !== today) {
        // New day detected! Reset daily progress counter
        stats.todayLessonsCompleted = 0;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        localStorage.setItem(LAST_ACTIVE_DATE_KEY, today);
      } else if (!lastActive) {
        localStorage.setItem(LAST_ACTIVE_DATE_KEY, today);
      }

      return stats;
    } catch {
      return DEFAULT_USER_STATS;
    }
  },

  saveUserStats(stats: UserStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      localStorage.setItem(LAST_ACTIVE_DATE_KEY, getTodayDateString());
    } catch {
      // Quota exceeded or private browsing
    }
  },

  getMistakes(): UserMistake[] {
    try {
      const data = localStorage.getItem(MISTAKES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  recordMistake(questionId: string, skill: string, questionTitle: string): void {
    try {
      const mistakes = this.getMistakes();
      const existingIdx = mistakes.findIndex((m) => m.questionId === questionId);
      const today = getTodayDateString();

      if (existingIdx >= 0) {
        mistakes[existingIdx].mistakeCount += 1;
        mistakes[existingIdx].lastMistakeDate = today;
      } else {
        mistakes.push({
          questionId,
          skill,
          questionTitle,
          mistakeCount: 1,
          lastMistakeDate: today,
        });
      }
      localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
    } catch {
      // ignore
    }
  },

  clearMistakes(): void {
    try {
      localStorage.removeItem(MISTAKES_KEY);
    } catch {
      // ignore
    }
  },

  resetAll(): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(DEFAULT_USER_STATS));
      localStorage.setItem(LAST_ACTIVE_DATE_KEY, getTodayDateString());
      localStorage.removeItem(MISTAKES_KEY);
    } catch {
      // ignore
    }
  },
};
