'use client';

import { Target, Trophy, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export function WeeklyMissionsCard() {
  const missions = [
    { title: 'Syllabus Lessons Goal', current: 5, target: 8, unit: 'Lessons' },
    { title: 'Weekly Experience Target', current: 280, target: 400, unit: 'XP' },
    { title: 'Concept Quiz Mastery', current: 3, target: 4, unit: 'Quizzes' },
  ];

  const overallPercent = 70; // 70% completed

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Weekly Sprint Mission
            </span>
            <p className="text-xs font-bold text-white">7-Day Achievement Milestone</p>
          </div>
        </div>

        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl">
          {overallPercent}% Mission Progress
        </span>
      </div>

      {/* Progress Bar Header */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-zinc-400">
          <span>Weekly Objectives Overview</span>
          <span className="text-white font-bold">+200 XP Bonus Reward</span>
        </div>
        <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Sub-missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missions.map((m, i) => {
          const pct = Math.min(100, Math.round((m.current / m.target) * 100));

          return (
            <div key={i} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white leading-tight">{m.title}</span>
                <span className="font-mono text-zinc-400">{pct}%</span>
              </div>

              <div className="space-y-1">
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-zinc-500 text-right">
                  {m.current} / {m.target} {m.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
