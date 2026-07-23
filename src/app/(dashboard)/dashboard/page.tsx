'use client';

import { useState, useEffect } from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { ContinueLearningCard } from '@/components/dashboard/ContinueLearningCard';
import { DailyGoals } from '@/components/dashboard/DailyGoals';
import { ProgressOverview } from '@/components/dashboard/ProgressOverview';
import { FeaturedCoursesGrid } from '@/components/dashboard/FeaturedCoursesGrid';
import { AssignmentsTimeline } from '@/components/dashboard/AssignmentsTimeline';
import { AchievementsShowcase } from '@/components/dashboard/AchievementsShowcase';
import { LeaderboardPreviewWidget } from '@/components/dashboard/LeaderboardPreviewWidget';
import { AIMentorCard } from '@/components/dashboard/AIMentorCard';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import api from '@/services/api';

interface LessonProgress {
  totalCompleted: number;
  remainingLessons: { id: string; title: string; difficulty: string; xpReward: number }[];
}

interface LeaderboardRank {
  rank: number;
  weeklyXP: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    completedCount: number;
    totalCount: number;
    nextLesson: { id: string; title: string; difficulty: string; xpReward: number } | null;
    rank: number;
    weeklyXP: number;
  } | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [progressRes, rankRes] = await Promise.all([
          api.get<LessonProgress>('/api/lessons/progress'),
          api.get<LeaderboardRank>('/api/user/leaderboard/rank'),
        ]);

        if (progressRes.success && progressRes.data && rankRes.success && rankRes.data) {
          const completedCount = progressRes.data.totalCompleted;
          const totalCount = completedCount + progressRes.data.remainingLessons.length;
          const nextLesson = progressRes.data.remainingLessons[0] || null;

          setStats({
            completedCount,
            totalCount,
            nextLesson,
            rank: rankRes.data.rank,
            weeklyXP: rankRes.data.weeklyXP,
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Action Shortcuts */}
      <QuickActionsBar />

      {/* Continue Learning Card & Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ContinueLearningCard
            loading={loading}
            nextLesson={stats?.nextLesson || null}
            completedCount={stats?.completedCount || 0}
            totalCount={stats?.totalCount || 0}
          />
        </div>
        <div className="lg:col-span-1">
          <DailyGoals />
        </div>
      </div>

      {/* Analytics Overview & Leaderboard Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressOverview />
        </div>
        <div className="lg:col-span-1">
          <LeaderboardPreviewWidget
            userRank={stats?.rank}
            userWeeklyXP={stats?.weeklyXP}
          />
        </div>
      </div>

      {/* Featured Enrolled Course Syllabus Tracks */}
      <FeaturedCoursesGrid />

      {/* Assignments Timeline */}
      <div id="assignments">
        <AssignmentsTimeline />
      </div>

      {/* Achievements Showcase */}
      <div id="achievements">
        <AchievementsShowcase />
      </div>

      {/* AI Mentor Assistant & Mini Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2" id="ai-mentor">
          <AIMentorCard />
        </div>
        <div className="lg:col-span-1" id="calendar">
          <CalendarWidget />
        </div>
      </div>

    </div>
  );
}
