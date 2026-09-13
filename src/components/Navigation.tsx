import React from 'react';
import { Code } from 'lucide-react';
import { AppTheme, TabType } from '../types';
import { soundFX } from '../utils/audio';

interface NavigationProps {
  theme: AppTheme;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  activeTab,
  onSelectTab,
}) => {
  const isDark = theme === 'dark';

  const tabs = [
    { id: 'learn' as TabType, label: 'Learn', icon: 'school' },
    { id: 'practice' as TabType, label: 'Practice', icon: 'code' },
    { id: 'leaderboard' as TabType, label: 'League', icon: 'leaderboard' },
    { id: 'profile' as TabType, label: 'Profile', icon: 'account_circle' },
  ];

  return (
    <nav
      className={`fixed bottom-0 inset-x-0 z-50 pb-safe backdrop-blur-xl neu-nav border-t transition-colors duration-200 ${
        isDark ? 'bg-[#0b0f19]/95 border-white/10' : 'bg-[#e8eaf0]/95 border-white/50'
      }`}
    >
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? isDark
                    ? 'text-indigo-400 neu-pressed bg-[#151b28]'
                    : 'text-indigo-600 neu-pressed bg-[#e8eaf0]'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 active:neu-pressed'
                  : 'text-slate-600 hover:text-[#2e3040] active:neu-pressed'
              }`}
            >
              {tab.id === 'practice' ? (
                <Code size={22} strokeWidth={2} />
              ) : (
                <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
              )}
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] font-bold tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
