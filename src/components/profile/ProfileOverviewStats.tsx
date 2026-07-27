'use client';

import { Star, BookOpen, Award, CheckSquare, Target, Clock, Trophy, Flame, TrendingUp } from 'lucide-react';

interface ProfileOverviewStatsProps {
  totalXP?: number;
  completedModules?: number;
  totalModules?: number;
  currentStreak?: number;
}

export function ProfileOverviewStats({
  totalXP = 4850,
  completedModules = 8,
  totalModules = 12,
  currentStreak = 14,
}: ProfileOverviewStatsProps) {
  const statMetrics = [
    {
      id: 'xp',
      label: 'Total Experience',
      value: `${totalXP.toLocaleString()} XP`,
      change: '+450 XP this week',
      icon: Star,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30',
    },
    {
      id: 'courses',
      label: 'Courses Completed',
      value: `${completedModules} / ${totalModules}`,
      change: '66% Completion Rate',
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30',
    },
    {
      id: 'certificates',
      label: 'Verified Certificates',
      value: '3 Certificates',
      change: '1 Specialization Honors',
      icon: Award,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/30',
    },
    {
      id: 'assignments',
      label: 'Labs & Assignments',
      value: '28 Submitted',
      change: '100% Pass Rate',
      icon: CheckSquare,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30',
    },
    {
      id: 'accuracy',
      label: 'Quiz Accuracy',
      value: '94.8%',
      change: '+2.4% vs Avg Scholar',
      icon: Target,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/30',
    },
    {
      id: 'hours',
      label: 'Total Study Time',
      value: '64.5 Hours',
      change: 'Avg 1.5 hrs/day',
      icon: Clock,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/30',
    },
    {
      id: 'rank',
      label: 'Global Percentile',
      value: 'Top 2%',
      change: '#14 Global Leaderboard',
      icon: Trophy,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/30',
    },
    {
      id: 'streak',
      label: 'Longest Streak',
      value: '21 Days',
      change: `Current: ${currentStreak} Days`,
      icon: Flame,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Learning Overview & Performance</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Real-time metrics calculated from your verified Cerevia activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {statMetrics.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.id}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-2.5 shadow-2xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors">
                  {st.label}
                </span>
                <div className={`p-2 rounded-xl border ${st.bg} shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon className={`h-4 w-4 ${st.color}`} />
                </div>
              </div>

              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{st.value}</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 pt-0.5">
                  <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{st.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
