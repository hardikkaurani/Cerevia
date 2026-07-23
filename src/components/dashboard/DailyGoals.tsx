'use client';

import { CheckCircle2, Target, Zap, Code2, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalItem {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: typeof Target;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function DailyGoals() {
  const goals: GoalItem[] = [
    {
      id: 'lessons',
      title: 'Lessons Today',
      current: 1,
      target: 2,
      unit: 'modules',
      icon: CheckCircle2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      id: 'xp',
      title: 'XP Target',
      current: 40,
      target: 50,
      unit: 'XP',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      id: 'quiz',
      title: 'Quiz Challenge',
      current: 1,
      target: 1,
      unit: 'quiz',
      icon: Award,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      id: 'coding',
      title: 'Coding Sandbox',
      current: 2,
      target: 3,
      unit: 'problems',
      icon: Code2,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Flame className="h-3.5 w-3.5 fill-amber-400" />
            <span>Daily Targets</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Today&apos;s Learning Goals
          </h3>
        </div>
        <span className="text-xs font-semibold text-zinc-400">75% Completed</span>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const isComplete = goal.current >= goal.target;

          return (
            <div
              key={goal.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 hover:border-zinc-700 transition-all duration-200 shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    {goal.title}
                  </span>
                  <h4 className="text-xl font-extrabold text-white">
                    {goal.current} <span className="text-xs font-semibold text-zinc-500">/ {goal.target} {goal.unit}</span>
                  </h4>
                </div>

                <div className={cn('h-9 w-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105', goal.bgColor, goal.borderColor, goal.color)}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-500 rounded-full',
                      isComplete ? 'bg-emerald-400' : 'bg-gradient-to-r from-blue-500 to-amber-400'
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                  <span>{percentage}% Done</span>
                  <span>{isComplete ? 'Goal Achieved!' : `${goal.target - goal.current} left`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
