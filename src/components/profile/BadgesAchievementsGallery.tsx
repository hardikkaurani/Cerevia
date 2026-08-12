'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Lock, CheckCircle2 } from 'lucide-react';

interface AchievementBadge {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  unlockedDate?: string;
  progress: number; // 0 to 100
  xpReward: number;
  iconImage: string;
  status: 'unlocked' | 'locked';
}

interface BadgesAchievementsGalleryProps {
  totalXP?: number;
  completedModules?: number;
  currentStreak?: number;
}

export function BadgesAchievementsGallery({
  totalXP = 0,
  completedModules = 0,
  currentStreak = 0,
}: BadgesAchievementsGalleryProps) {
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  const badgesList: AchievementBadge[] = useMemo(() => {
    return [
      {
        id: 'b1',
        name: 'Quiz Master 100%',
        rarity: 'Legendary',
        description: 'Achieved 100% accuracy on 10 consecutive advanced technical quizzes.',
        progress: 0,
        xpReward: 500,
        iconImage: '/images/profile/badges/quiz-master.webp',
        status: 'locked',
      },
      {
        id: 'b2',
        name: '30-Day Flame Streak',
        rarity: 'Epic',
        description: 'Logged in and submitted code for 30 consecutive calendar days.',
        progress: Math.min(100, Math.floor((currentStreak / 30) * 100)),
        xpReward: 300,
        iconImage: '/images/profile/badges/streak-flame.webp',
        status: currentStreak >= 30 ? 'unlocked' : 'locked',
        unlockedDate: currentStreak >= 30 ? 'Recently' : undefined,
      },
      {
        id: 'b3',
        name: 'Top 1% Global Scholar',
        rarity: 'Legendary',
        description: 'Ranked in the top 1% of all active engineering scholars worldwide.',
        progress: 0,
        xpReward: 1000,
        iconImage: '/images/profile/badges/top-learner.webp',
        status: 'locked',
      },
      {
        id: 'b4',
        name: 'Course Champion',
        rarity: 'Rare',
        description: 'Completed 5 core engineering courses with Grade A distinction.',
        progress: Math.min(100, Math.floor((completedModules / 5) * 100)),
        xpReward: 250,
        iconImage: '/images/profile/badges/course-champion.webp',
        status: completedModules >= 5 ? 'unlocked' : 'locked',
        unlockedDate: completedModules >= 5 ? 'Recently' : undefined,
      },
      {
        id: 'b5',
        name: 'XP Titan (10,000 XP)',
        rarity: 'Legendary',
        description: 'Accumulate a total of 10,000 XP across all platform activities.',
        progress: Math.min(100, Math.floor((totalXP / 10000) * 100)),
        xpReward: 1500,
        iconImage: '/images/profile/badges/xp-titan.webp',
        status: totalXP >= 10000 ? 'unlocked' : 'locked',
        unlockedDate: totalXP >= 10000 ? 'Recently' : undefined,
      },
      {
        id: 'b6',
        name: 'Bug Hunter Grandmaster',
        rarity: 'Epic',
        description: 'Successfully debugged 50 complex production code snippets.',
        progress: 0,
        xpReward: 400,
        iconImage: '/images/profile/badges/quiz-master.webp',
        status: 'locked',
      },
    ];
  }, [totalXP, completedModules, currentStreak]);

  const getRarityBadge = (rarity: AchievementBadge['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Epic':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Rare':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Achievements & Badges Collection</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Earn rare emblems and XP bonuses by completing platform milestones.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {badgesList.map((badge) => {
          const isUnlocked = badge.status === 'unlocked';
          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`p-4 rounded-2xl border bg-white dark:bg-zinc-900/40 space-y-3 shadow-2xs hover:shadow-md transition-all duration-300 text-center cursor-pointer group relative overflow-hidden ${
                isUnlocked ? 'border-slate-200 dark:border-zinc-800/80 hover:-translate-y-1' : 'border-slate-200/80 dark:border-zinc-800/40 bg-slate-50/60 dark:bg-zinc-950/20 opacity-75'
              }`}
            >
              {/* Badge Icon Image */}
              <div className="relative h-16 w-16 mx-auto rounded-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 p-2 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Image src={badge.iconImage} alt={badge.name} fill className="object-contain p-1" />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-2xs">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getRarityBadge(badge.rarity)}`}>
                  {badge.rarity}
                </span>
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-450 transition-colors">
                  {badge.name}
                </h3>
              </div>

              {/* Progress bar or Unlocked Tag */}
              {isUnlocked ? (
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-450 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-450" /> Unlocked
                </span>
              ) : (
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${badge.progress}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-zinc-400">{badge.progress}% Progress</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-850 p-6 md:p-8 max-w-sm w-full space-y-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-24 w-24 mx-auto p-3 rounded-full bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200 dark:border-blue-800/30 shadow-inner">
              <Image src={selectedBadge.iconImage} alt={selectedBadge.name} fill className="object-contain p-2" />
            </div>

            <div className="space-y-1.5">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border ${getRarityBadge(selectedBadge.rarity)}`}>
                {selectedBadge.rarity} Achievement
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedBadge.name}</h3>
              <p className="text-xs text-slate-650 dark:text-zinc-450 leading-relaxed">{selectedBadge.description}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center justify-between">
              <span>Reward Bonus:</span>
              <span className="font-extrabold text-blue-700 dark:text-blue-400">+{selectedBadge.xpReward} XP</span>
            </div>

            {selectedBadge.status === 'unlocked' ? (
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-450">
                ✓ Earned {selectedBadge.unlockedDate}
              </p>
            ) : (
              <p className="text-xs font-bold text-amber-700 dark:text-amber-450">
                🔒 In Progress — {selectedBadge.progress}% Complete
              </p>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white dark:text-zinc-205 text-xs font-bold hover:bg-slate-800 dark:hover:bg-zinc-750 transition-colors shadow-sm cursor-pointer"
            >
              Close Badge Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
