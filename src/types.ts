export type AppTheme = 'light' | 'dark';

export type TabType = 'learn' | 'practice' | 'leaderboard' | 'profile' | 'curriculum';

export type ChallengeType =
  | 'multiple-choice'
  | 'code-completion'
  | 'bug-fix'
  | 'output-prediction'
  | 'code-ordering';

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  subtitle: string;
  isCorrect: boolean;
}

export interface LessonQuestion {
  id: string;
  challengeType?: ChallengeType;
  stepNumber: number;
  totalSteps: number;
  worldId?: string;
  worldName: string;
  lessonId?: string;
  topicTag: string;
  skill?: string;
  difficulty?: 1 | 2 | 3;
  xpReward: number;
  question: string;
  codeFileName: string;
  languageVersion: string;
  codeSnippet: string[];
  options: QuizOption[];
  hint: string;
  explanation: {
    title: string;
    text: string;
    highlights: string[];
  };
  // Specific challenge extras
  buggyLineIndex?: number;
  codeOrderingItems?: { id: string; code: string }[];
  correctOrderIds?: string[];
  isBoss?: boolean;
}

export interface LessonMeta {
  id: string;
  title: string;
  worldId: string;
  skill: string;
  durationMinutes: number;
  xpReward: number;
  description: string;
  questionsCount: number;
  isBoss?: boolean;
}

export interface WorldMeta {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  order: number;
  lessons: LessonMeta[];
}

export interface UserStats {
  streak: number;
  stars: number;
  gems: number;
  hearts: number;
  xp: number;
  completedLessons: number;
  todayLessonsCompleted: number;
  todayGoal: number;
}

export interface UserMistake {
  questionId: string;
  skill: string;
  questionTitle: string;
  mistakeCount: number;
  lastMistakeDate: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  current: number;
  target: number;
  xpReward: number;
  gemReward: number;
  isCompleted: boolean;
}

export interface PathNode {
  id: string;
  title: string;
  xpText: string;
  status: 'completed' | 'active' | 'locked' | 'chest' | 'gate';
  position: 'left' | 'center' | 'right';
  badge?: string;
  isBoss?: boolean;
}

