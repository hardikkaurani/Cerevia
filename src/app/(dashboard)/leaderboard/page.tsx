'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/providers/AuthProvider';
import { Trophy, Flame, Sparkles } from 'lucide-react';
import api from '@/services/api';

interface LeaderboardEntry {
  userId: string;
  fullName: string | null;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  streak?: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  pagination: {
    limit: number;
    skip: number;
    totalCount: number;
  };
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await api.get<LeaderboardResponse>('/api/user/leaderboard?limit=25');
        if (res.success && res.data) {
          setBoard(res.data.leaderboard);
        }
      } catch (err) {
        console.error('Failed to load weekly leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, []);

  return (
    <PageContainer>
      <PageHeader
        title="Weekly Leaderboard"
        description="Compete with other engineers, earn experience multipliers, and secure the top spot."
        actions={
          <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full select-none">
            <Flame className="h-3.5 w-3.5 fill-primary text-primary animate-pulse" />
            <span>Refreshes dynamically</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main leaderboard standings */}
          <Card className="md:col-span-2">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 font-bold tracking-tight">
                <Trophy className="h-4.5 w-4.5 text-primary" />
                <span>Global Standings</span>
              </CardTitle>
              <CardDescription className="text-xs mt-1.5 font-normal">
                The rankings compile dynamically based on lesson completions and weekly XP logs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-t border-border">
              {loading ? (
                <div className="divide-y divide-border">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-6 bg-secondary rounded" />
                        <div className="h-8 w-8 bg-secondary rounded-full" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-28 bg-secondary rounded" />
                          <div className="h-3 w-16 bg-secondary rounded" />
                        </div>
                      </div>
                      <div className="h-4 w-12 bg-secondary rounded" />
                    </div>
                  ))}
                </div>
              ) : board.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm font-medium tracking-wide">
                  No weekly leaderboard entries found yet. Start a lesson to join the board!
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {board.map((entry) => {
                    const isSelf = entry.userId === user?.id;
                    return (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-4 px-6 transition-all hover:bg-primary/[0.01] ${
                          isSelf ? 'bg-primary/[0.03] border-y border-primary/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-sans font-semibold w-6 ${
                            entry.rank === 1 ? 'text-primary font-bold' :
                            entry.rank === 2 ? 'text-foreground/80' :
                            entry.rank === 3 ? 'text-foreground/60' : 'text-muted-foreground/45'
                          }`}>
                            #{entry.rank}
                          </span>
                          <Avatar fallback={entry.fullName || 'Student'} size="sm" className="border border-border shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-sans font-semibold text-foreground truncate flex items-center gap-2">
                               {entry.fullName || 'Student'}
                               {isSelf && (
                                 <Badge variant="success" className="select-none">
                                   You
                                 </Badge>
                               )}
                            </span>
                            <span className="text-[10px] font-sans text-muted-foreground flex items-center gap-1 font-medium">
                              Syllabus Level {Math.floor((entry.weeklyXP || 0) / 100) + 1}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-sans font-semibold tracking-wide text-primary">
                          {entry.weeklyXP} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leaderboard stats / rules panel */}
          <div className="space-y-6">
            <Card className="p-8">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base flex items-center gap-2 font-bold tracking-tight">
                  <Sparkles className="h-4.5 w-4.5 text-primary" />
                  <span>Streak Multipliers</span>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground/80 mt-1">
                  Maintain your daily streak to increase your score multiplier for new lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3.5 text-xs leading-relaxed font-sans font-medium text-muted-foreground">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Base Multiplier</span>
                  <span className="text-foreground font-semibold">1.0x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">3-Day Streak Boost</span>
                  <span className="text-primary font-semibold">1.1x XP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">7-Day Streak Boost</span>
                  <span className="text-primary font-semibold">1.25x XP</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">14+ Day Streak Boost</span>
                  <span className="text-primary font-semibold">1.5x XP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
