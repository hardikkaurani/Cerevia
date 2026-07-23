'use client';

import Image from 'next/image';
import { Award, Lock, CheckCircle2, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelTier {
  level: number;
  title: string;
  minXP: number;
  perks: string[];
  badgeImage: string;
  badgeColor: string;
  bgColor: string;
  borderColor: string;
}

export function LevelSystemVisualizer({ currentLevel }: { currentLevel: number }) {
  const levelTiers: LevelTier[] = [
    {
      level: 1,
      title: 'Explorer',
      minXP: 0,
      perks: ['Basic Course Syllabus', 'Daily Streak Engine', 'Standard AI Tutor'],
      badgeImage: '/images/gamification/levels/explorer.webp',
      badgeColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      level: 2,
      title: 'Learner',
      minXP: 100,
      perks: ['Interactive Code Sandboxes', 'Concept Quizzes', 'Custom Avatars'],
      badgeImage: '/images/gamification/levels/learner.webp',
      badgeColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
    },
    {
      level: 3,
      title: 'Builder',
      minXP: 200,
      perks: ['Full-Stack Project Labs', 'AI Code Diagnostics', 'Downloadable PDF Notes'],
      badgeImage: '/images/gamification/levels/builder.webp',
      badgeColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      level: 4,
      title: 'Creator',
      minXP: 300,
      perks: ['Priority AI Copilot', 'Weekly Leaderboard Podium', 'Verifiable Certificate Badge'],
      badgeImage: '/images/gamification/levels/creator.webp',
      badgeColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      level: 5,
      title: 'Master',
      minXP: 400,
      perks: ['Master Engineer Title', 'Honor Roll Hall of Fame', 'Lifetime Verified Pass'],
      badgeImage: '/images/gamification/levels/master.webp',
      badgeColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            <Award className="h-3.5 w-3.5" />
            <span>Scholarship Progression</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Academic Level Tiers & Unlocks
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-xl">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <span>Current Status: Level {currentLevel}</span>
        </div>
      </div>

      {/* Level Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {levelTiers.map((tier) => {
          const isCurrent = currentLevel === tier.level;
          const isUnlocked = currentLevel >= tier.level;

          return (
            <div
              key={tier.level}
              className={cn(
                'rounded-2xl border p-5 space-y-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md',
                isCurrent
                  ? 'bg-zinc-900/90 border-blue-500/80 ring-2 ring-blue-500/30'
                  : isUnlocked
                  ? 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
                  : 'bg-zinc-950/40 border-zinc-800/40 opacity-50'
              )}
            >
              {/* Badge Icon Top Container */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-zinc-500">
                    LVL 0{tier.level}
                  </span>

                  {isCurrent ? (
                    <span className="text-[9px] font-extrabold uppercase tracking-wider bg-blue-500/20 border border-blue-500/30 text-blue-400 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  ) : isUnlocked ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Lock className="h-4 w-4 text-zinc-600" />
                  )}
                </div>

                {/* Level WebP Image Thumbnail */}
                <div className="relative h-20 w-full rounded-xl overflow-hidden bg-zinc-900/80 border border-zinc-800 flex items-center justify-center p-2">
                  <Image
                    src={tier.badgeImage}
                    alt={tier.title}
                    fill
                    unoptimized
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className={cn('text-base font-extrabold leading-tight', isUnlocked ? 'text-white' : 'text-zinc-500')}>
                    {tier.title}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400">{tier.minXP} XP Min</p>
                </div>
              </div>

              {/* Perks Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400">
                {tier.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-1.5 truncate">
                    <Shield className={cn('h-3 w-3 shrink-0', isUnlocked ? tier.badgeColor : 'text-zinc-600')} />
                    <span className="truncate">{perk}</span>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
