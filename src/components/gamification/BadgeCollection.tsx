'use client';

import Image from 'next/image';
import { Award, Lock, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeItem {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  unlocked: boolean;
  image: string;
}

export function BadgeCollection() {
  const badges: BadgeItem[] = [
    {
      id: 'b1',
      name: 'Scholar Apprentice',
      rarity: 'Common',
      description: 'Completed basic HTML & CSS syllabus modules.',
      unlocked: true,
      image: '/images/gamification/levels/explorer.webp',
    },
    {
      id: 'b2',
      name: 'Async Specialist',
      rarity: 'Rare',
      description: 'Mastered JavaScript Promises & Event Loop concepts.',
      unlocked: true,
      image: '/images/gamification/badges/rare.webp',
    },
    {
      id: 'b3',
      name: 'Architecture Hero',
      rarity: 'Epic',
      description: 'Built high-throughput Next.js 15 Server Actions.',
      unlocked: true,
      image: '/images/gamification/badges/epic.webp',
    },
    {
      id: 'b4',
      name: 'Grandmaster Architect',
      rarity: 'Legendary',
      description: 'Achieved Level 5 Scholar status and top leaderboard rank.',
      unlocked: false,
      image: '/images/gamification/badges/legendary.webp',
    },
  ];

  const getRarityBadgeStyle = (rarity: BadgeItem['rarity']) => {
    switch (rarity) {
      case 'Common':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'Rare':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Epic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Legendary':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            <Award className="h-3.5 w-3.5" />
            <span>Insignia & Badges</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Badge Showcase
          </h3>
        </div>

        <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
          {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className={cn(
              'rounded-2xl border p-5 space-y-3 text-center flex flex-col items-center justify-between transition-all duration-300 relative group overflow-hidden shadow-md',
              b.unlocked
                ? 'bg-zinc-900/80 border-zinc-800 hover:border-indigo-500/50'
                : 'bg-zinc-950/40 border-zinc-800/40 opacity-50'
            )}
          >
            <div className="space-y-3 flex flex-col items-center w-full">
              <span
                className={cn(
                  'text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md border',
                  getRarityBadgeStyle(b.rarity)
                )}
              >
                {b.rarity}
              </span>

              <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 p-2 flex items-center justify-center">
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  unoptimized
                  className={cn(
                    'object-contain p-2 group-hover:scale-110 transition-transform duration-300',
                    !b.unlocked && 'grayscale'
                  )}
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {b.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {b.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 w-full text-[10px] font-semibold text-zinc-400 flex items-center justify-center gap-1">
              {b.unlocked ? (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Unlocked & Equippable</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 text-zinc-600" />
                  <span className="text-zinc-600">Locked Badge</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
