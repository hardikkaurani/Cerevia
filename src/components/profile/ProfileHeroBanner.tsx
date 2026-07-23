'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Mail, Calendar, Flame, Star, Trophy, Share2, Edit3, Globe, Copy, Check, Sparkles, Award } from 'lucide-react';

interface ProfileHeroBannerProps {
  fullName?: string;
  email?: string;
  avatar?: string;
  joinedDate?: string;
  totalXP?: number;
  currentStreak?: number;
  level?: number;
  league?: string;
  title?: string;
}

export function ProfileHeroBanner({
  fullName = 'Hardik Kaurani',
  email = 'hardik@cerevia.edu',
  avatar = '/images/profile/avatars/student-avatar.webp',
  joinedDate = 'January 2026',
  totalXP = 4850,
  currentStreak = 14,
  level = 12,
  league = 'Diamond League',
  title = 'Senior Full-Stack & AI Engineer Candidate',
}: ProfileHeroBannerProps) {
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bioText, setBioText] = useState(title);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300">
      {/* Cover Image Header */}
      <div className="relative h-48 md:h-64 w-full bg-slate-900 overflow-hidden">
        <Image
          src="/images/profile/backgrounds/cover-banner.webp"
          alt="Profile Cover Banner"
          fill
          priority
          className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
        
        {/* Top Badges overlay on banner */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>{league}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Level {level} Scholar</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="px-6 md:px-8 pb-8 pt-0 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6">
          
          {/* Avatar & Title Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-md shrink-0 group">
              <Image
                src={avatar}
                alt={fullName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" title="Active Learning" />
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{fullName}</h1>
                <span title="Verified Cerevia Engineer">
                  <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-700">{bioText}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" /> {email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Member since {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
                isPublic
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{isPublic ? 'Public Profile' : 'Private Profile'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-600" />}
              <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>

            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Experience</p>
              <p className="text-lg font-black text-slate-900">{totalXP.toLocaleString()} XP</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-100">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Learning Streak</p>
              <p className="text-lg font-black text-slate-900">{currentStreak} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Global League</p>
              <p className="text-lg font-black text-slate-900">{league}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Specializations</p>
              <p className="text-lg font-black text-slate-900">3 Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">Edit Profile Headline</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Learning Title / Specialization Headline
                </label>
                <input
                  type="text"
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-medium">
                Tip: Highlighting your target engineering specialization helps recruiters and peers evaluate your Cerevia Verified Portfolio.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Headline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
