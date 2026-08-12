'use client';

import { useMemo } from 'react';
import { Calendar, GitPullRequest, Circle } from 'lucide-react';

interface ActivityHeatmapTrackerProps {
  history?: {
    id: string;
    xpEarned: number;
    reason: string;
    timestamp: string;
  }[];
}

export function ActivityHeatmapTracker({ history = [] }: ActivityHeatmapTrackerProps) {
  
  // Group activities by date and construct 140 grid cells for the last 20 weeks
  const gridCells = useMemo(() => {
    const cells = [];
    const now = new Date();
    
    // Group history by local date string YYYY-MM-DD
    const xpByDate: Record<string, number> = {};
    history.forEach((item) => {
      if (!item.timestamp) return;
      const d = new Date(item.timestamp);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const date = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${date}`;
      xpByDate[dateStr] = (xpByDate[dateStr] || 0) + item.xpEarned;
    });

    // Generate past 140 days
    for (let i = 139; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const date = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${date}`;
      
      const xp = xpByDate[dateStr] || 0;
      let level = 0;
      if (xp > 75) level = 4;
      else if (xp > 40) level = 3;
      else if (xp > 20) level = 2;
      else if (xp > 0) level = 1;

      cells.push({
        date: dateStr,
        level,
        xp,
      });
    }

    return cells;
  }, [history]);

  const totalSubmissions = history.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      {/* Activity Heatmap Grid */}
      <div className="lg:col-span-2 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" /> Coding Contribution Calendar
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Visual log of lesson submissions and XP achievements.</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-350 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
            {totalSubmissions} Submission{totalSubmissions !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Heatmap Grid Wrapper */}
        <div className="pt-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1 md:gap-1.5 w-full justify-start overflow-x-auto pb-2">
            {gridCells.map((cell, idx) => {
              let colorClass = 'bg-slate-100 dark:bg-zinc-850'; // level 0
              if (cell.level === 1) colorClass = 'bg-blue-100 dark:bg-blue-950/40';
              if (cell.level === 2) colorClass = 'bg-blue-300 dark:bg-blue-800/40';
              if (cell.level === 3) colorClass = 'bg-blue-500 dark:bg-blue-600/70';
              if (cell.level === 4) colorClass = 'bg-blue-700 dark:bg-blue-500';

              return (
                <div
                  key={idx}
                  className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer ${colorClass}`}
                  title={`${cell.date}: ${cell.xp} XP`}
                />
              );
            })}
          </div>
          
          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 pt-2.5 font-bold">
            <span>140 Days Ago</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="h-2.5 w-2.5 rounded-xs bg-slate-100 dark:bg-zinc-850" />
              <div className="h-2.5 w-2.5 rounded-xs bg-blue-100 dark:bg-blue-950/40" />
              <div className="h-2.5 w-2.5 rounded-xs bg-blue-300 dark:bg-blue-800/40" />
              <div className="h-2.5 w-2.5 rounded-xs bg-blue-500 dark:bg-blue-600/70" />
              <div className="h-2.5 w-2.5 rounded-xs bg-blue-700 dark:bg-blue-500" />
              <span>More</span>
            </div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Stream */}
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-4 shadow-2xs">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <GitPullRequest className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" /> Recent Activity Stream
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Real-time log of learning completions.</p>
        </div>

        <div className="space-y-3.5 max-h-[175px] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-center text-xs font-medium text-slate-400 dark:text-zinc-500 px-4 border border-dashed border-zinc-150 dark:border-zinc-800 rounded-2xl">
              No recent learning submissions. Complete your first lesson module to start logging activity.
            </div>
          ) : (
            history.map((act) => {
              const formattedTime = act.timestamp
                ? new Date(act.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : 'Recently';

              return (
                <div key={act.id} className="flex items-start gap-2.5 group">
                  <Circle className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400 shrink-0 mt-1" />
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-450 transition-colors">
                      {act.reason}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-zinc-500 font-bold">
                      <span>{formattedTime}</span>
                      <span>•</span>
                      <span className="text-emerald-700 dark:text-emerald-450">+{act.xpEarned} XP</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
