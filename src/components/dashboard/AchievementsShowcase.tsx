'use client';

import { Award, Flame, Trophy, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Award;
  unlocked: boolean;
  unlockedAt?: string;
  badgeColor: string;
  bgColor: string;
}

export function AchievementsShowcase() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: '100 XP Benchmark',
      description: 'Accumulated 100+ experience points in Cerevia',
      icon: Sparkles,
      unlocked: true,
      unlockedAt: 'Unlocked Jul 15',
      badgeColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      id: '2',
      title: '7 Day Streak Master',
      description: 'Maintained a uninterrupted 7-day daily learning streak',
      icon: Flame,
      unlocked: true,
      unlockedAt: 'Unlocked Jul 20',
      badgeColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      id: '3',
      title: 'Course Master',
      description: 'Complete 100% of modules in a single track syllabus',
      icon: Trophy,
      unlocked: true,
      unlockedAt: 'Unlocked Yesterday',
      badgeColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      id: '4',
      title: 'Top Performer',
      description: 'Rank in the top 5 of the weekly honor roll leaderboard',
      icon: Award,
      unlocked: false,
      badgeColor: 'text-zinc-500',
      bgColor: 'bg-zinc-900 border-zinc-800',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="h-3.5 w-3.5" />
            <span>Honors & Medals</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Unlocked Achievements
          </h3>
        </div>

        <Link
          href="/xp"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          View All Badges
        </Link>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border p-5 space-y-3 transition-all duration-200 shadow-md relative overflow-hidden group',
                item.unlocked ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-700' : 'bg-zinc-950/50 border-zinc-800/60 opacity-60'
              )}
            >
              <div className="flex items-center justify-between">
                <div className={cn('h-10 w-10 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105', item.bgColor, item.badgeColor)}>
                  <Icon className="h-5 w-5" />
                </div>

                {item.unlocked ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Lock className="h-4 w-4 text-zinc-600" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-1 text-[10px] font-semibold text-zinc-500">
                {item.unlocked ? item.unlockedAt : 'Locked • Complete challenges'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
