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
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1.5 rounded-full select-none shadow-md shadow-cyan-500/5">
            <Flame className="h-4 w-4 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span>Refreshes dynamically</span>
          </div>
        }
      />

      <ContentWrapper className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main leaderboard standings */}
          <Card className="md:col-span-2 rounded-2xl border border-gray-900 bg-gray-950/40 shadow-lg overflow-hidden backdrop-blur-sm">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 text-white font-bold tracking-tight">
                <Trophy className="h-5 w-5 text-cyan-400" />
                <span>Global Standings</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs mt-1.5 font-normal">
                The rankings compile dynamically based on lesson completions and weekly XP logs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-t border-gray-900/60">
              {loading ? (
                <div className="divide-y divide-gray-900/40">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 px-6 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="h-4 w-6 bg-gray-800 rounded" />
                        <div className="h-8 w-8 bg-gray-800 rounded-full" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-28 bg-gray-800 rounded" />
                          <div className="h-3 w-16 bg-gray-800 rounded" />
                        </div>
                      </div>
                      <div className="h-4 w-12 bg-gray-800 rounded" />
                    </div>
                  ))}
                </div>
              ) : board.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm font-medium">
                  No weekly leaderboard entries found yet. Start a lesson to join the board!
                </div>
              ) : (
                <div className="divide-y divide-gray-900/40">
                  {board.map((entry) => {
                    const isSelf = entry.userId === user?.id;
                    return (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-4 px-6 transition-all hover:bg-gray-900/20 ${
                          isSelf ? 'bg-cyan-500/[0.03] border-y border-cyan-500/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-bold w-6 ${
                            entry.rank === 1 ? 'text-yellow-400' :
                            entry.rank === 2 ? 'text-gray-300' :
                            entry.rank === 3 ? 'text-amber-600' : 'text-gray-500'
                          }`}>
                            #{entry.rank}
                          </span>
                          <Avatar fallback={entry.fullName || 'Student'} size="sm" className="border border-gray-800 shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-white truncate flex items-center gap-2">
                              {entry.fullName || 'Student'}
                              {isSelf && (
                                <Badge variant="success" className="text-[9px] px-1.5 py-0 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 select-none">
                                  You
                                </Badge>
                              )}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                              Syllabus Level {Math.floor((entry.weeklyXP || 0) / 100) + 1}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-cyan-400">
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
            <Card className="bg-[#090d16]/80 border border-gray-900 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base flex items-center gap-2 text-white font-bold tracking-tight">
                  <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
                  <span>Streak Multipliers</span>
                </CardTitle>
                <CardDescription className="text-xs text-gray-400 mt-1">
                  Maintain your daily streak to increase your score multiplier for new lessons.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3.5 text-xs leading-relaxed font-semibold text-gray-300">
                <div className="flex justify-between items-center py-2 border-b border-gray-900/60">
                  <span className="text-gray-400 font-normal">Base Multiplier</span>
                  <span className="text-white">1.0x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-900/60">
                  <span className="text-gray-400 font-normal">3-Day Streak Boost</span>
                  <span className="text-cyan-400">1.1x XP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-900/60">
                  <span className="text-gray-400 font-normal">7-Day Streak Boost</span>
                  <span className="text-cyan-400">1.25x XP</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 font-normal">14+ Day Streak Boost</span>
                  <span className="text-cyan-400">1.5x XP</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}
