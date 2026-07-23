'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, Star, Flame, Trophy, Lock, CheckCircle2, Sparkles, Shield, Info } from 'lucide-react';

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

export function BadgesAchievementsGallery() {
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  const badgesList: AchievementBadge[] = [
    {
      id: 'b1',
      name: 'Quiz Master 100%',
      rarity: 'Legendary',
      description: 'Achieved 100% accuracy on 10 consecutive advanced technical quizzes.',
      unlockedDate: 'June 20, 2026',
      progress: 100,
      xpReward: 500,
      iconImage: '/images/profile/badges/quiz-master.webp',
      status: 'unlocked',
    },
    {
      id: 'b2',
      name: '30-Day Flame Streak',
      rarity: 'Epic',
      description: 'Logged in and submitted code for 30 consecutive calendar days.',
      unlockedDate: 'May 10, 2026',
      progress: 100,
      xpReward: 300,
      iconImage: '/images/profile/badges/streak-flame.webp',
      status: 'unlocked',
    },
    {
      id: 'b3',
      name: 'Top 1% Global Scholar',
      rarity: 'Legendary',
      description: 'Ranked in the top 1% of all active engineering scholars worldwide.',
      unlockedDate: 'July 01, 2026',
      progress: 100,
      xpReward: 1000,
      iconImage: '/images/profile/badges/top-learner.webp',
      status: 'unlocked',
    },
    {
      id: 'b4',
      name: 'Course Champion',
      rarity: 'Rare',
      description: 'Completed 5 core engineering courses with Grade A distinction.',
      unlockedDate: 'June 05, 2026',
      progress: 100,
      xpReward: 250,
      iconImage: '/images/profile/badges/course-champion.webp',
      status: 'unlocked',
    },
    {
      id: 'b5',
      name: 'XP Titan (10,000 XP)',
      rarity: 'Legendary',
      description: 'Accumulate a total of 10,000 XP across all platform activities.',
      progress: 48, // 4,850 / 10,000
      xpReward: 1500,
      iconImage: '/images/profile/badges/xp-titan.webp',
      status: 'locked',
    },
    {
      id: 'b6',
      name: 'Bug Hunter Grandmaster',
      rarity: 'Epic',
      description: 'Successfully debugged 50 complex production code snippets.',
      progress: 75,
      xpReward: 400,
      iconImage: '/images/profile/badges/quiz-master.webp',
      status: 'locked',
    },
  ];

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
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Achievements & Badges Collection</h2>
          <p className="text-xs text-slate-500 font-medium">Earn rare emblems and XP bonuses by completing platform milestones.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {badgesList.map((badge) => {
          const isUnlocked = badge.status === 'unlocked';
          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`p-4 rounded-2xl border bg-white space-y-3 shadow-2xs hover:shadow-md transition-all duration-300 text-center cursor-pointer group relative overflow-hidden ${
                isUnlocked ? 'border-slate-200 hover:-translate-y-1' : 'border-slate-200/80 bg-slate-50/60 opacity-75'
              }`}
            >
              {/* Badge Icon Image */}
              <div className="relative h-16 w-16 mx-auto rounded-full bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Image src={badge.iconImage} alt={badge.name} fill className="object-contain p-1" />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center backdrop-blur-2xs">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getRarityBadge(badge.rarity)}`}>
                  {badge.rarity}
                </span>
                <h3 className="text-xs font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {badge.name}
                </h3>
              </div>

              {/* Progress bar or Unlocked Tag */}
              {isUnlocked ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Unlocked
                </span>
              ) : (
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${badge.progress}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">{badge.progress}% Progress</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-sm w-full space-y-5 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-24 w-24 mx-auto p-3 rounded-full bg-blue-50 border-2 border-blue-200 shadow-inner">
              <Image src={selectedBadge.iconImage} alt={selectedBadge.name} fill className="object-contain p-2" />
            </div>

            <div className="space-y-1.5">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border ${getRarityBadge(selectedBadge.rarity)}`}>
                {selectedBadge.rarity} Achievement
              </span>
              <h3 className="text-lg font-black text-slate-900">{selectedBadge.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedBadge.description}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Reward Bonus:</span>
              <span className="font-extrabold text-blue-700">+{selectedBadge.xpReward} XP</span>
            </div>

            {selectedBadge.status === 'unlocked' ? (
              <p className="text-xs font-bold text-emerald-700">
                ✓ Earned on {selectedBadge.unlockedDate}
              </p>
            ) : (
              <p className="text-xs font-bold text-amber-700">
                🔒 In Progress — {selectedBadge.progress}% Complete
              </p>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Close Badge Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
