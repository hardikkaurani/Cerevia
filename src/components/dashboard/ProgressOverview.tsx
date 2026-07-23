'use client';

import { TrendingUp, Clock, CheckCircle2, Zap, BarChart3 } from 'lucide-react';

export function ProgressOverview() {
  const weeklyData = [
    { day: 'Mon', xp: 40, height: '40%' },
    { day: 'Tue', xp: 60, height: '60%' },
    { day: 'Wed', xp: 90, height: '90%' },
    { day: 'Thu', xp: 35, height: '35%' },
    { day: 'Fri', xp: 80, height: '80%' },
    { day: 'Sat', xp: 100, height: '100%' },
    { day: 'Sun', xp: 50, height: '50%' },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Learning Analytics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Weekly Performance & XP Growth
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <TrendingUp className="h-4 w-4" />
          <span>+28% vs last week</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Total XP Earned</span>
          </div>
          <p className="text-2xl font-black text-white">455 XP</p>
          <p className="text-[10px] text-zinc-500">This week</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5 text-blue-400" />
            <span>Study Time</span>
          </div>
          <p className="text-2xl font-black text-white">8.5 hrs</p>
          <p className="text-[10px] text-zinc-500">Avg 1.2 hrs/day</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Pass Rate</span>
          </div>
          <p className="text-2xl font-black text-white">94%</p>
          <p className="text-[10px] text-zinc-500">17 quizzes completed</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
            <span>Global Rank</span>
          </div>
          <p className="text-2xl font-black text-white">Top 5%</p>
          <p className="text-[10px] text-zinc-500">Of 20,000+ students</p>
        </div>

      </div>

      {/* Visual Chart Bars */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
          <span>XP Activity Distribution</span>
          <span>Mon - Sun</span>
        </div>

        <div className="flex items-end justify-between gap-2 h-36 pt-4 px-2 bg-zinc-900/40 rounded-2xl border border-zinc-800/60">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div className="w-full max-w-[36px] bg-zinc-800 rounded-t-lg overflow-hidden flex items-end h-full">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 group-hover:from-blue-500 group-hover:to-amber-400 transition-all duration-300 rounded-t-lg"
                  style={{ height: d.height }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
