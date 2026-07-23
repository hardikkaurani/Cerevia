'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trophy, Lock, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  image: string;
  category: 'Milestone' | 'Streak' | 'Syllabus' | 'Special';
}

export function AchievementGallery() {
  const [filter, setFilter] = useState<'All' | 'Unlocked' | 'In Progress'>('All');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Lesson Complete',
      description: 'Finish your very first software engineering module.',
      xpReward: 100,
      unlocked: true,
      unlockedAt: 'Jul 20, 2026',
      image: '/images/gamification/achievements/first-lesson.webp',
      category: 'Syllabus',
    },
    {
      id: '2',
      title: '100 XP Milestone',
      description: 'Earn your first 100 total experience points.',
      xpReward: 100,
      unlocked: true,
      unlockedAt: 'Jul 21, 2026',
      image: '/images/gamification/achievements/100-xp.webp',
      category: 'Milestone',
    },
    {
      id: '3',
      title: '500 XP Milestone',
      description: 'Accumulate 500 total experience points.',
      xpReward: 250,
      unlocked: false,
      image: '/images/gamification/achievements/500-xp.webp',
      category: 'Milestone',
    },
    {
      id: '4',
      title: '1000 XP Titan',
      description: 'Cross the 1,000 XP barrier and join the elite scholars.',
      xpReward: 500,
      unlocked: false,
      image: '/images/gamification/achievements/1000-xp.webp',
      category: 'Milestone',
    },
    {
      id: '5',
      title: 'Quiz Master',
      description: 'Score 100% on 3 concept quizzes consecutively.',
      xpReward: 150,
      unlocked: true,
      unlockedAt: 'Jul 22, 2026',
      image: '/images/gamification/badges/quiz-master.webp',
      category: 'Special',
    },
    {
      id: '6',
      title: '7 Day Streak Hero',
      description: 'Maintain an active daily learning streak for 7 full days.',
      xpReward: 200,
      unlocked: true,
      unlockedAt: 'Jul 22, 2026',
      image: '/images/gamification/badges/streak-hero.webp',
      category: 'Streak',
    },
    {
      id: '7',
      title: 'AI Explorer',
      description: 'Interact with the AI Copilot to debug 5 code blocks.',
      xpReward: 100,
      unlocked: true,
      unlockedAt: 'Jul 22, 2026',
      image: '/images/gamification/achievements/ai-explorer.webp',
      category: 'Special',
    },
  ];

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'Unlocked') return a.unlocked;
    if (filter === 'In Progress') return !a.unlocked;
    return true;
  });

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Trophy className="h-3.5 w-3.5" />
            <span>Academic Trophies</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Achievement Gallery
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold">
          {(['All', 'Unlocked', 'In Progress'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-all',
                filter === tab ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((ach) => (
          <div
            key={ach.id}
            className={cn(
              'rounded-2xl border p-5 space-y-4 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-md',
              ach.unlocked
                ? 'bg-zinc-900/80 border-zinc-800 hover:border-amber-500/50'
                : 'bg-zinc-950/40 border-zinc-800/40 opacity-60'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 p-2 flex items-center justify-center shrink-0">
                <Image
                  src={ach.image}
                  alt={ach.title}
                  fill
                  unoptimized
                  className={cn(
                    'object-contain p-1 transition-transform duration-300 group-hover:scale-110',
                    !ach.unlocked && 'grayscale'
                  )}
                />
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg">
                  +{ach.xpReward} XP
                </span>
                {ach.unlocked ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-500">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                {ach.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {ach.description}
              </p>
            </div>

            {ach.unlockedAt && (
              <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-mono">
                Unlocked on {ach.unlockedAt}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
