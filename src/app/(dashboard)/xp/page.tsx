'use client';

import { useState, useEffect } from 'react';
import { XPTrackerHero } from '@/components/gamification/XPTrackerHero';
import { LevelSystemVisualizer } from '@/components/gamification/LevelSystemVisualizer';
import { StreakEngineCard } from '@/components/gamification/StreakEngineCard';
import { DailyChallengesChecklist } from '@/components/gamification/DailyChallengesChecklist';
import { WeeklyMissionsCard } from '@/components/gamification/WeeklyMissionsCard';
import { AchievementGallery } from '@/components/gamification/AchievementGallery';
import { BadgeCollection } from '@/components/gamification/BadgeCollection';
import { LearningHeatmap } from '@/components/gamification/LearningHeatmap';
import { Sparkles, Loader2, Activity, History } from 'lucide-react';
import api from '@/services/api';

interface XpHistoryItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

interface XpData {
  totalXP: number;
  levelInfo?: {
    level: number;
    xpInCurrentLevel: number;
  };
  history?: XpHistoryItem[];
}

interface UserProfile {
  currentStreak: number;
}

export default function XpPage() {
  const [loading, setLoading] = useState(true);
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadXpData() {
      try {
        const [xpRes, profileRes] = await Promise.all([
          api.get<XpData>('/api/user/xp?limit=20'),
          api.get<UserProfile>('/api/user/profile'),
        ]);

        if (xpRes.success && xpRes.data) {
          setXpData(xpRes.data);
        }
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch XP tracking data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadXpData();
  }, []);

  const totalXP = xpData?.totalXP || 0;
  const currentLevel = xpData?.levelInfo?.level || 1;
  const xpInCurrentLevel = xpData?.levelInfo?.xpInCurrentLevel || 0;
  const streak = profile?.currentStreak || 0;

  let streakMultiplier = 1.0;
  if (streak >= 14) streakMultiplier = 1.5;
  else if (streak >= 7) streakMultiplier = 1.25;
  else if (streak >= 3) streakMultiplier = 1.1;

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-16 px-4 md:px-0">
      
      {/* XP Hero Card */}
      <XPTrackerHero
        totalXP={totalXP}
        level={currentLevel}
        xpInCurrentLevel={xpInCurrentLevel}
        xpForNextLevel={100}
        streak={streak}
        streakMultiplier={streakMultiplier}
      />

      {/* Level System Visualizer */}
      <LevelSystemVisualizer currentLevel={currentLevel} />

      {/* Streak Engine */}
      <StreakEngineCard currentStreak={streak} />

      {/* Daily Challenges & Weekly Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DailyChallengesChecklist />
        <WeeklyMissionsCard />
      </div>

      {/* Achievement Gallery */}
      <AchievementGallery />

      {/* Badge Showcase */}
      <BadgeCollection />

      {/* Consistency Heatmap */}
      <LearningHeatmap />

      {/* Recent XP Audit Trail Log */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <History className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Audit Trail Log
              </span>
              <p className="text-xs font-bold text-white">Experience Point Activity History</p>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400">
            {xpData?.history?.length || 0} Recent Events
          </span>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
          {xpData?.history && xpData.history.length > 0 ? (
            xpData.history.map((item: XpHistoryItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-zinc-800/60 first:pt-0 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {item.reason}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                  +{item.xpEarned} XP
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs font-medium text-zinc-500">
              No experience point events recorded yet. Complete a lesson or quiz to view activity logs.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
