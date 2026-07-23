'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import api from '@/services/api';

import { ProfileHeroBanner } from '@/components/profile/ProfileHeroBanner';
import { ProfileOverviewStats } from '@/components/profile/ProfileOverviewStats';
import { SkillsRadarCards } from '@/components/profile/SkillsRadarCards';
import { CertificatesGallery } from '@/components/profile/CertificatesGallery';
import { LearningJourneyTimeline } from '@/components/profile/LearningJourneyTimeline';
import { BadgesAchievementsGallery } from '@/components/profile/BadgesAchievementsGallery';
import { ActivityHeatmapTracker } from '@/components/profile/ActivityHeatmapTracker';
import { LearningGoalsAnalytics } from '@/components/profile/LearningGoalsAnalytics';
import { PublicPortfolioShowcase } from '@/components/profile/PublicPortfolioShowcase';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

interface ActivityItem {
  id: string;
  xpEarned: number;
  reason: string;
  timestamp: string;
}

interface ProfileData {
  createdAt?: string;
  totalXP?: number;
  currentStreak?: number;
  fullName?: string;
  avatar?: string;
  bio?: string;
  email?: string;
}

interface XpData {
  levelInfo?: {
    level: number;
  };
  history?: ActivityItem[];
}

interface LessonProgressResponse {
  totalCompleted: number;
  remainingLessons: { id: string }[];
}

interface UserStats {
  completedCount: number;
  totalCount: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const [profileRes, xpRes, progressRes] = await Promise.all([
          api.get<ProfileData>('/api/user/profile'),
          api.get<XpData>('/api/user/xp?limit=10'),
          api.get<LessonProgressResponse>('/api/lessons/progress'),
        ]);

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
        if (xpRes.success && xpRes.data) {
          setXpData(xpRes.data);
        }
        if (progressRes.success && progressRes.data) {
          setStats({
            completedCount: progressRes.data.totalCompleted,
            totalCount: progressRes.data.totalCompleted + progressRes.data.remainingLessons.length,
          });
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []);

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'January 2026';

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <PageContainer className="bg-slate-50/60 min-h-screen pb-16">
      <PageHeader
        title="Student Learning Identity & Verified Credentials"
        description="Your comprehensive academic portfolio, verified specialization certificates, verified skill competencies, and learning journey."
      />

      <ContentWrapper className="space-y-8 mt-4">
        
        {/* 1. Profile Hero Banner */}
        <ProfileHeroBanner
          fullName={profile?.fullName || 'Hardik Kaurani'}
          email={profile?.email || 'hardik@cerevia.edu'}
          avatar={profile?.avatar || '/images/profile/avatars/student-avatar.webp'}
          joinedDate={joinedDate}
          totalXP={profile?.totalXP || 4850}
          currentStreak={profile?.currentStreak || 14}
          level={xpData?.levelInfo?.level || 12}
          league="Diamond League"
          title={profile?.bio || 'Senior Full-Stack & AI Engineer Candidate'}
        />

        {/* 2. Core Metrics & Performance Overview */}
        <ProfileOverviewStats
          totalXP={profile?.totalXP || 4850}
          completedModules={stats?.completedCount || 8}
          totalModules={stats?.totalCount || 12}
          currentStreak={profile?.currentStreak || 14}
        />

        {/* 3. Verified Certificates & Specializations Showcase */}
        <CertificatesGallery />

        {/* 4. Verified Engineering Skills */}
        <SkillsRadarCards />

        {/* 5. Learning Journey Timeline */}
        <LearningJourneyTimeline />

        {/* 6. Badges & Achievements Collection */}
        <BadgesAchievementsGallery />

        {/* 7. Coding Activity & Contribution Heatmap */}
        <ActivityHeatmapTracker history={xpData?.history} />

        {/* 8. XP Growth Analytics & Target Goals */}
        <LearningGoalsAnalytics />

        {/* 9. Public Portfolio & Capstone Projects Showcase */}
        <PublicPortfolioShowcase />

      </ContentWrapper>
    </PageContainer>
  );
}
