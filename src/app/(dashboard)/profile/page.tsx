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
import { useAuth } from '@/providers/AuthProvider';
import { getCleanDisplayName } from '@/lib/utils';

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
  maxStreak?: number;
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
  completedLessons?: { id: string }[];
}

interface UserStats {
  completedCount: number;
  totalCount: number;
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
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
          if (progressRes.data.completedLessons) {
            setCompletedLessonIds(progressRes.data.completedLessons.map((l) => l.id));
          }
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []);

  const displayName = getCleanDisplayName(profile?.fullName ? profile : authUser);
  const displayEmail = profile?.email || authUser?.email || '';

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'January 2026';

  const userXP = profile?.totalXP ?? authUser?.totalXP ?? 0;
  
  const league = userXP >= 4000
    ? 'Diamond League'
    : userXP >= 2000
    ? 'Gold League'
    : userXP >= 500
    ? 'Silver League'
    : 'Bronze League';

  const defaultHeadline = userXP > 0
    ? 'Senior Full-Stack & AI Engineer Candidate'
    : 'Aspiring Software Engineer';
  const bioHeadline = profile?.bio || defaultHeadline;

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <PageContainer className="bg-slate-50/40 dark:bg-transparent min-h-screen pb-16">
      <PageHeader
        title="Student Learning Identity & Verified Credentials"
        description="Your comprehensive academic portfolio, verified specialization certificates, verified skill competencies, and learning journey."
      />

      <ContentWrapper className="space-y-8 mt-4">
        
        {/* 1. Profile Hero Banner */}
        <ProfileHeroBanner
          fullName={displayName}
          email={displayEmail}
          avatar={profile?.avatar || authUser?.avatar || '/images/profile/avatars/student-avatar.webp'}
          joinedDate={joinedDate}
          totalXP={userXP}
          currentStreak={profile?.currentStreak ?? authUser?.currentStreak ?? 0}
          level={xpData?.levelInfo?.level ?? 1}
          league={league}
          title={bioHeadline}
        />

        {/* 2. Core Metrics & Performance Overview */}
        <ProfileOverviewStats
          totalXP={userXP}
          completedModules={stats?.completedCount ?? 0}
          totalModules={stats?.totalCount ?? 0}
          currentStreak={profile?.currentStreak ?? authUser?.currentStreak ?? 0}
          maxStreak={profile?.maxStreak ?? authUser?.maxStreak ?? 0}
        />

        {/* 3. Verified Certificates & Specializations Showcase */}
        <CertificatesGallery 
          fullName={displayName} 
          email={displayEmail} 
          completedModules={stats?.completedCount ?? 0}
        />

        {/* 4. Verified Engineering Skills */}
        <SkillsRadarCards completedLessonIds={completedLessonIds} />

        {/* 5. Learning Journey Timeline */}
        <LearningJourneyTimeline history={xpData?.history} createdAt={profile?.createdAt} />

        {/* 6. Badges & Achievements Collection */}
        <BadgesAchievementsGallery 
          totalXP={userXP}
          completedModules={stats?.completedCount ?? 0}
          currentStreak={profile?.currentStreak ?? authUser?.currentStreak ?? 0}
        />

        {/* 7. Coding Activity & Contribution Heatmap */}
        <ActivityHeatmapTracker history={xpData?.history} />

        {/* 8. XP Growth Analytics & Target Goals */}
        <LearningGoalsAnalytics history={xpData?.history} />

        {/* 9. Public Portfolio & Capstone Projects Showcase */}
        <PublicPortfolioShowcase 
          fullName={displayName} 
          email={displayEmail} 
          completedModules={stats?.completedCount ?? 0}
          totalXP={userXP}
        />

      </ContentWrapper>
    </PageContainer>
  );
}
