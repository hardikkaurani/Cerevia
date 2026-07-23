'use client';

import { useState } from 'react';
import { Activity, Flame, CheckCircle2, Clock, Terminal, Zap } from 'lucide-react';

interface ActivityHistoryItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

interface ActivityHeatmapTrackerProps {
  history?: ActivityHistoryItem[];
}

export function ActivityHeatmapTracker({ history = [] }: ActivityHeatmapTrackerProps) {
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Generate 52 weeks x 7 days mock contribution data grid
  const daysInGrid = Array.from({ length: 140 }).map((_, idx) => {
    // Generate variable activity levels (0=none, 1=low, 2=medium, 3=high)
    const level = (idx * 7 + 3) % 5 === 0 ? 3 : (idx * 3 + 1) % 4 === 0 ? 2 : (idx % 3 === 0) ? 1 : 0;
    return { id: idx, level };
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 3:
        return 'bg-blue-600 border-blue-700';
      case 2:
        return 'bg-blue-400 border-blue-500';
      case 1:
        return 'bg-blue-200 border-blue-300';
      default:
        return 'bg-slate-100 border-slate-200/80';
    }
  };

  const sampleActivities = history.length > 0 ? history : [
    { id: '1', xpEarned: 150, reason: 'Passed Next.js Server Components Assessment', timestamp: '2 hours ago' },
    { id: '2', xpEarned: 100, reason: 'Completed PostgreSQL Indexing Coding Lab', timestamp: 'Yesterday' },
    { id: '3', xpEarned: 50, reason: 'Solved AI Mentor Algorithmic Prompt Quiz', timestamp: '3 days ago' },
    { id: '4', xpEarned: 200, reason: 'Earned 7-Day Flame Streak Bonus', timestamp: '4 days ago' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Coding Activity & Contribution Heatmap</h2>
          <p className="text-xs text-slate-500 font-medium">Daily learning cadence and verified platform submissions.</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-2xs">
        {/* Heatmap Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>284 Submissions in 2026</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-400">Less</span>
              <div className="h-3 w-3 rounded-xs bg-slate-100 border border-slate-200" />
              <div className="h-3 w-3 rounded-xs bg-blue-200 border border-blue-300" />
              <div className="h-3 w-3 rounded-xs bg-blue-400 border border-blue-500" />
              <div className="h-3 w-3 rounded-xs bg-blue-600 border border-blue-700" />
              <span className="text-slate-400">More</span>
            </div>
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-2 pt-1">
            {daysInGrid.map((day) => (
              <div
                key={day.id}
                className={`h-3 w-3 rounded-xs border transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer ${getHeatmapColor(day.level)}`}
                title={`Day ${day.id + 1}: ${day.level * 50} XP earned`}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity Log Feed */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>Recent Activity Stream</span>
          </h3>

          <div className="space-y-2">
            {sampleActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4 text-xs hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900">{act.reason}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{act.timestamp}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs shrink-0 border border-emerald-200">
                  +{act.xpEarned} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
