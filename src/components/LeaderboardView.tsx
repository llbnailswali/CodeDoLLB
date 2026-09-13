import React from 'react';
import { AppTheme, UserStats } from '../types';
import { soundFX } from '../utils/audio';

interface LeaderboardViewProps {
  theme: AppTheme;
  userStats: UserStats;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ theme, userStats }) => {
  const leaderboardUsers = [
    { rank: 1, name: 'Elena Rostova', xp: '3,450 XP', streak: 28, badge: '🥇', avatar: '👩‍💻' },
    { rank: 2, name: 'Tariq Al-Mansoor', xp: '3,120 XP', streak: 19, badge: '🥈', avatar: '👨‍🚀' },
    { rank: 3, name: 'You (Alex)', xp: `${(userStats.stars).toLocaleString()} XP`, streak: userStats.streak, badge: '🥉', avatar: '🧑‍💻', isSelf: true },
    { rank: 4, name: 'Mei Lin', xp: '2,640 XP', streak: 14, badge: '', avatar: '👩‍🎨' },
    { rank: 5, name: 'Lucas Silva', xp: '2,410 XP', streak: 10, badge: '', avatar: '👨‍🎓' },
    { rank: 6, name: 'Sarah Connor', xp: '2,180 XP', streak: 9, badge: '', avatar: '👩‍🔬' },
    { rank: 7, name: 'Kenji Sato', xp: '1,990 XP', streak: 7, badge: '', avatar: '🥷' },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 select-none">
      {/* League Banner */}
      <div
        className={`p-5 rounded-2xl mb-4 flex items-center justify-between transition-all ${
          theme === 'dark'
            ? 'dark-glass-card border border-cyan-500/20'
            : 'bg-white neumorph-raised'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <span className="material-symbols-outlined text-[32px]">diamond</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Outfit'] text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                ACTIVE LEAGUE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-['JetBrains_Mono'] text-[10px] font-bold">
                TOP 3
              </span>
            </div>
            <h2 className="font-['Outfit'] text-xl font-bold tracking-tight text-inherit">
              Diamond Division
            </h2>
            <p className="font-['Outfit'] text-xs text-slate-400">Ends in 2d 14h • Top 5 advance</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-2 text-xs font-['Outfit'] text-slate-400 font-bold uppercase tracking-wider">
          <span>Rank &amp; Developer</span>
          <span>Weekly XP</span>
        </div>

        {leaderboardUsers.map((user) => {
          return (
            <div
              key={user.rank}
              onClick={() => soundFX.playClick()}
              className={`p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer active:scale-[0.99] ${
                user.isSelf
                  ? theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-2 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                    : 'bg-[#3748dd]/10 border-2 border-[#3748dd] neumorph-inset'
                  : theme === 'dark'
                  ? 'bg-[#151c2c] border border-slate-800 hover:border-slate-700'
                  : 'bg-white neumorph-raised-soft'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 font-['Outfit'] text-center font-bold text-sm text-slate-400">
                  {user.badge || user.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center text-xl">
                  {user.avatar}
                </div>
                <div>
                  <h4 className="font-['Outfit'] text-sm font-bold text-inherit flex items-center gap-1.5">
                    {user.name}
                    {user.isSelf && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500 text-white">
                        YOU
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span className="text-orange-500">🔥 {user.streak}d streak</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-['JetBrains_Mono'] text-sm font-bold text-indigo-400">
                  {user.xp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
