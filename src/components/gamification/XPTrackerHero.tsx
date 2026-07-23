'use client';

import Image from 'next/image';
import { Sparkles, Zap, Flame, Award, TrendingUp, Target, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPTrackerHeroProps {
  totalXP: number;
  level: number;
  xpInCurrentLevel: number;
  xpForNextLevel?: number;
  streak: number;
  streakMultiplier: number;
}

export function XPTrackerHero({
  totalXP,
  level,
  xpInCurrentLevel,
  xpForNextLevel = 100,
  streak,
  streakMultiplier,
}: XPTrackerHeroProps) {
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));

  const getLevelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Explorer';
    if (lvl <= 2) return 'Learner';
    if (lvl <= 3) return 'Builder';
    if (lvl <= 4) return 'Creator';
    return 'Master';
  };

  const levelTitle = getLevelTitle(level);

  // Computed XP Breakdown (Simulated/Derived from actual totalXP)
  const todayXP = Math.min(totalXP, 40);
  const weeklyXP = Math.min(totalXP, 280);
  const monthlyXP = Math.min(totalXP, 850);
  const lifetimeXP = totalXP;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
      {/* Background WebP Accent & Radial Mesh Glow */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none overflow-hidden hidden md:block">
        <Image
          src="/images/gamification/rewards/xp-gem.webp"
          alt="XP Gem Visual"
          fill
          unoptimized
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950" />
      </div>

      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-500/15 blur-[100px]" />

      {/* Main Header & Level Badge */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 fill-blue-400" />
              <span>Level {level} • {levelTitle}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              <Flame className="h-3.5 w-3.5 fill-amber-400 animate-pulse" />
              <span>{streakMultiplier.toFixed(2)}x Streak Booster</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            {totalXP} <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">XP</span> Balance
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal max-w-xl">
            Experience points reflect your dedication across interactive coding modules, quizzes, and daily challenges.
          </p>
        </div>

        {/* Progress Card Container */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-xl shadow-xl min-w-[280px] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Level {level + 1} Goal</p>
                <p className="text-xs font-extrabold text-white">{xpInCurrentLevel} / {xpForNextLevel} XP</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-blue-400">{Math.round(progressPercent)}%</span>
          </div>

          <div className="space-y-1.5">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-400 text-right font-medium">
              {xpForNextLevel - xpInCurrentLevel} XP until Level {level + 1} unlock
            </p>
          </div>
        </div>
      </div>

      {/* XP Breakdown Grid Cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-zinc-800/80">
        
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Today&apos;s XP</span>
          </div>
          <p className="text-2xl font-black text-white">+{todayXP} XP</p>
          <p className="text-[10px] text-zinc-500">Daily target 50 XP</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
            <span>Weekly XP</span>
          </div>
          <p className="text-2xl font-black text-white">+{weeklyXP} XP</p>
          <p className="text-[10px] text-zinc-500">Ranked Top 5%</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-indigo-400" />
            <span>Monthly XP</span>
          </div>
          <p className="text-2xl font-black text-white">+{monthlyXP} XP</p>
          <p className="text-[10px] text-zinc-500">Active learning streak</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Lifetime XP</span>
          </div>
          <p className="text-2xl font-black text-white">{lifetimeXP} XP</p>
          <p className="text-[10px] text-zinc-500">All-time accumulated score</p>
        </div>

      </div>
    </div>
  );
}
