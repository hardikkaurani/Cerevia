'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AchievementGallery } from '@/components/gamification/AchievementGallery';
import { BadgeCollection } from '@/components/gamification/BadgeCollection';
import { LearningHeatmap } from '@/components/gamification/LearningHeatmap';
import {
  Trophy,
  Flame,
  Star,
  BookOpen,
  Mail,
  Calendar,
  User as UserIcon,
  Loader2,
  Sparkles,
  Activity,
  Award,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import api from '@/services/api';

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
          api.get<XpData>('/api/user/xp?limit=5'),
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
            totalCount:
              progressRes.data.totalCompleted + progressRes.data.remainingLessons.length,
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
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Jul 2026';

  const currentLevel = xpData?.levelInfo?.level || 1;

  const getLevelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Explorer Scholar';
    if (lvl <= 2) return 'Learner Scholar';
    if (lvl <= 3) return 'Builder Engineer';
    if (lvl <= 4) return 'Creator Architect';
    return 'Master Engineer';
  };

  const levelTitle = getLevelTitle(currentLevel);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full pb-16 px-4 md:px-0">
      
      {/* Profile Header Hero Card */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          
          {/* Avatar with WebP Level Frame */}
          <div className="relative h-28 w-28 rounded-full border-4 border-blue-500/50 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            {profile?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt={profile.fullName || 'User'}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon className="h-12 w-12 text-zinc-400" />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-[9px] font-black text-white text-center py-0.5 uppercase tracking-widest">
              LVL {currentLevel}
            </div>
          </div>

          {/* Identity & Bio */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile?.fullName || 'Anonymous Student'}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  <ShieldCheck className="h-3 w-3 text-blue-400" />
                  <span>{levelTitle}</span>
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono flex items-center justify-center md:justify-start gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                {profile?.email}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
              {profile?.bio ||
                'Full-Stack & Distributed Systems Scholar at Cerevia. Building software applications.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-400" /> Joined {joinedDate}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Flame className="h-3.5 w-3.5 fill-amber-400" /> {profile?.currentStreak || 0} Day Streak
              </span>
            </div>
          </div>

          <Link href="/settings" className="shrink-0">
            <button className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all">
              Edit Settings
            </button>
          </Link>

        </div>

        {/* Quick Stat Tiles Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800/80">
          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-blue-400" /> Experience
            </span>
            <p className="text-xl font-black text-white">{profile?.totalXP || 0} XP</p>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Daily Streak
            </span>
            <p className="text-xl font-black text-white">{profile?.currentStreak || 0} Days</p>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" /> Completed
            </span>
            <p className="text-xl font-black text-white">
              {stats ? stats.completedCount : 0} Modules
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 space-y-1">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-amber-400" /> Scholar Tier
            </span>
            <p className="text-xl font-black text-white">Level {currentLevel}</p>
          </div>
        </div>

      </div>

      {/* Badge Showcase */}
      <BadgeCollection />

      {/* Achievement Gallery */}
      <AchievementGallery />

      {/* Learning Heatmap */}
      <LearningHeatmap />

      {/* Activity Log */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Activity Stream
              </span>
              <p className="text-xs font-bold text-white">Recent Experience Log</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
          {xpData?.history && xpData.history.length > 0 ? (
            xpData.history.map((item: ActivityItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-zinc-800/60 first:pt-0 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{item.reason}</p>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-xs sm:text-sm font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                  +{item.xpEarned} XP
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs font-medium text-zinc-500">
              No recent experience events recorded.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
