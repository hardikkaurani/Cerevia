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
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'courses',
      label: 'Courses Completed',
      value: `${completedModules} / ${totalModules}`,
      change: '66% Completion Rate',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      id: 'certificates',
      label: 'Verified Certificates',
      value: '3 Certificates',
      change: '1 Specialization Honors',
      icon: Award,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200',
    },
    {
      id: 'assignments',
      label: 'Labs & Assignments',
      value: '28 Submitted',
      change: '100% Pass Rate',
      icon: CheckSquare,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      id: 'accuracy',
      label: 'Quiz Accuracy',
      value: '94.8%',
      change: '+2.4% vs Avg Scholar',
      icon: Target,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
    },
    {
      id: 'hours',
      label: 'Total Study Time',
      value: '64.5 Hours',
      change: 'Avg 1.5 hrs/day',
      icon: Clock,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200',
    },
    {
      id: 'rank',
      label: 'Global Percentile',
      value: 'Top 2%',
      change: '#14 Global Leaderboard',
      icon: Trophy,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200',
    },
    {
      id: 'streak',
      label: 'Longest Streak',
      value: '21 Days',
      change: `Current: ${currentStreak} Days`,
      icon: Flame,
      color: 'text-orange-600',
      bg: 'bg-orange-50 border-orange-200',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Learning Overview & Performance</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time metrics calculated from your verified Cerevia activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {statMetrics.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
                  {st.label}
                </span>
                <div className={`p-2 rounded-xl border ${st.bg} shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon className={`h-4 w-4 ${st.color}`} />
                </div>
              </div>

              <div>
                <p className="text-xl font-black text-slate-900 tracking-tight">{st.value}</p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 pt-0.5">
                  <TrendingUp className="h-3 w-3 text-emerald-600 shrink-0" />
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
