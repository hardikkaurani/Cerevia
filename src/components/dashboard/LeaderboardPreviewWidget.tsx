'use client';

import { Trophy, ChevronRight, Crown, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export function LeaderboardPreviewWidget({ userRank, userWeeklyXP }: { userRank?: number; userWeeklyXP?: number }) {
  const topStudents: LeaderboardUser[] = [
    { rank: 1, name: 'Aarav Sharma', xp: 950, streak: 24 },
    { rank: 2, name: 'Ananya Roy', xp: 880, streak: 19 },
    { rank: 3, name: 'Rohan Gupta', xp: 810, streak: 15 },
    { rank: 4, name: 'Priya Nair', xp: 740, streak: 12 },
    { rank: 5, name: 'Kabir Verma', xp: 690, streak: 10 },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="h-3.5 w-3.5 fill-amber-400" />
            <span>Weekly Standing</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Leaderboard Honor Roll
          </h3>
        </div>

        <Link
          href="/leaderboard"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Full Rankings</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Top Rankings List */}
      <div className="space-y-2.5">
        {topStudents.map((student) => (
          <div
            key={student.rank}
            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
              student.rank === 1
                ? 'bg-amber-500/10 border-amber-500/30'
                : student.rank === 2
                ? 'bg-zinc-900/90 border-zinc-700/60'
                : student.rank === 3
                ? 'bg-amber-900/10 border-amber-800/30'
                : 'bg-zinc-900/40 border-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs shrink-0 select-none">
                {student.rank === 1 ? <Crown className="h-5 w-5 text-amber-400 fill-amber-400" /> :
                 student.rank === 2 ? <span className="text-zinc-300 font-extrabold">#2</span> :
                 student.rank === 3 ? <span className="text-amber-600 font-extrabold">#3</span> :
                 <span className="text-zinc-500">#{student.rank}</span>}
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white">{student.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-400 fill-amber-400" /> {student.streak}d streak
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold text-blue-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {student.xp} XP
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* User Current Standing Footer */}
      <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
            #{userRank || 'Unranked'}
          </div>
          <div>
            <p className="text-xs font-bold text-white">Your Current Rank</p>
            <p className="text-[10px] text-blue-300">{userWeeklyXP || 0} XP accumulated this week</p>
          </div>
        </div>

        <Link href="/leaderboard">
          <button className="h-8 px-3 rounded-xl bg-white text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-colors">
            Compete Now
          </button>
        </Link>
      </div>

    </div>
  );
}
