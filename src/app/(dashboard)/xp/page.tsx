'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Section } from '@/components/layout/Section';
import { Sparkles, Flame, Loader2 } from 'lucide-react';
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
  const xpForNextLevel = 100; // Each level takes 100 XP
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));
  
  // Streak booster multiplier calculation
  const streak = profile?.currentStreak || 0;
  let streakMultiplier = 1.0;
  if (streak >= 14) streakMultiplier = 1.5;
  else if (streak >= 7) streakMultiplier = 1.25;
  else if (streak >= 3) streakMultiplier = 1.1;

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="XP Tracker & History"
        description="Track your experience points, streak multipliers, and history of completed milestones."
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* XP Balance Widget */}
          <Section title="XP Balance" description="Your total earned experience points.">
            <div className="flex flex-col items-center justify-center p-6 text-center bg-card border border-border rounded-lg shadow-sm min-h-[160px]">
              <div className="h-16 w-16 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <span className="text-3xl font-sans font-bold text-primary">{totalXP} XP</span>
              <span className="text-xs font-sans text-muted-foreground mt-1.5 font-medium">Level {currentLevel} Backend Scholar</span>
            </div>
          </Section>

          {/* XP Multipliers Widget */}
          <Section title="Active Multipliers" description="XP bonuses active on your account.">
            <div className="space-y-4 bg-card border border-border rounded-lg shadow-sm p-6 min-h-[160px] flex flex-col justify-center">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-xs text-muted-foreground font-sans font-medium flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-primary fill-primary shrink-0 animate-pulse" />
                  Streak Multiplier ({streak} Days)
                </span>
                <span className="text-xs font-sans font-bold text-primary">{streakMultiplier.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-muted-foreground font-sans font-medium">Effective XP Multiplier</span>
                <span className="text-xs font-sans font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">{streakMultiplier.toFixed(2)}x</span>
              </div>
            </div>
          </Section>

          {/* Milestones Target Widget */}
          <Section title="Next Milestone" description="Progress towards your next reward tier.">
            <div className="space-y-4 bg-card border border-border rounded-lg shadow-sm p-6 min-h-[160px] flex flex-col justify-center">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-xs text-muted-foreground font-sans font-medium">Progress to Level {currentLevel + 1}</span>
                  <span className="font-sans font-semibold text-foreground">{xpInCurrentLevel} / {xpForNextLevel} XP</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-550" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                Earn {xpForNextLevel - xpInCurrentLevel} more XP to reach Level {currentLevel + 1} and advance your backend scholar status.
              </p>
            </div>
          </Section>
        </div>

        {/* XP Log */}
        <Section title="XP History Log" description="A record of recent XP events.">
          <div className="divide-y divide-border bg-card border border-border rounded-lg p-8 shadow-sm">
            {xpData?.history && xpData.history.length > 0 ? (
              xpData.history.map((item: XpHistoryItem) => (
                <div key={item.id} className="flex items-center justify-between py-3.5 border-b border-border first:pt-0 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-sans font-semibold text-foreground leading-tight">{item.reason}</span>
                    <span className="text-xs font-sans text-muted-foreground mt-0.5">
                      {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-sm font-sans font-bold text-primary">+{item.xpEarned} XP</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-sm font-sans font-medium text-muted-foreground">
                No experience point events have been logged yet. Complete a lesson to begin.
              </div>
            )}
          </div>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
}
