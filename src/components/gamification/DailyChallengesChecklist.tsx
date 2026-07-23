'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, Gift, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Challenge {
  id: string;
  title: string;
  target: number;
  current: number;
  xpReward: number;
  claimed: boolean;
}

export function DailyChallengesChecklist() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: 'Complete 2 Lessons', target: 2, current: 1, xpReward: 50, claimed: false },
    { id: '2', title: 'Earn 50 XP in Syllabus', target: 50, current: 40, xpReward: 25, claimed: false },
    { id: '3', title: 'Finish 1 Concept Quiz', target: 1, current: 1, xpReward: 30, claimed: true },
    { id: '4', title: 'Practice Code in Sandbox', target: 3, current: 2, xpReward: 40, claimed: false },
    { id: '5', title: 'Read Interactive Lesson Notes', target: 1, current: 1, xpReward: 20, claimed: false },
  ]);

  const handleClaim = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, claimed: true } : c))
    );
  };

  const totalCompleted = challenges.filter((c) => c.current >= c.target).length;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
            <span>Daily Objectives</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Daily Challenges Checklist
          </h3>
        </div>

        <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
          {totalCompleted} / {challenges.length} Completed
        </span>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {challenges.map((c) => {
          const isDone = c.current >= c.target;

          return (
            <div
              key={c.id}
              className={cn(
                'flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border transition-all select-none',
                c.claimed
                  ? 'bg-zinc-950/40 border-zinc-800/40 text-zinc-500'
                  : isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300'
              )}
            >
              <div className="flex items-center gap-3">
                {c.claimed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-zinc-600 shrink-0" />
                )}

                <div>
                  <h4 className={cn('text-xs sm:text-sm font-bold', c.claimed && 'line-through text-zinc-500')}>
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    Progress: {c.current} / {c.target}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                  +{c.xpReward} XP
                </span>

                {isDone && !c.claimed && (
                  <button
                    onClick={() => handleClaim(c.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-xs font-extrabold text-zinc-950 hover:bg-emerald-400 transition-all shadow-md"
                  >
                    <Gift className="h-3.5 w-3.5" />
                    <span>Claim</span>
                  </button>
                )}

                {c.claimed && (
                  <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-bold px-2 py-1">
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Claimed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
