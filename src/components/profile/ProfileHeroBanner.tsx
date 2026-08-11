'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Mail, Calendar, Trophy, Share2, Edit3, Globe, Check, Sparkles } from 'lucide-react';

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
    <div className="relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 overflow-hidden shadow-xs transition-all duration-300">
      {/* Cover Gradient Header */}
      <div className="relative h-28 md:h-36 w-full bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-pink-600/20 overflow-hidden">
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Top Badges overlay on banner */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-slate-900/60 dark:bg-zinc-950/60 backdrop-blur-md border border-white/10 dark:border-zinc-800 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
            <Trophy className="h-3 w-3 text-amber-400" />
            <span>{league}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-blue-600/85 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>Level {level} Scholar</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="px-6 md:px-8 pb-6 pt-0 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-14 md:-mt-16">
          
          {/* Avatar & Title Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-white dark:border-zinc-900 bg-slate-100 dark:bg-zinc-800 overflow-hidden shadow-md shrink-0 group">
              <Image
                src={avatar}
                alt={fullName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" title="Active Learning" />
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{fullName}</h1>
                <span title="Verified Cerevia Engineer">
                  <ShieldCheck className="h-5.5 w-5.5 text-blue-600 dark:text-blue-400 shrink-0" />
                </span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-blue-700 dark:text-blue-400">{bioText}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" /> {email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" /> Member since {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 pt-4 md:pt-0">
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                isPublic
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40'
                  : 'bg-slate-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{isPublic ? 'Public Profile' : 'Private Profile'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-400" />}
              <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>

            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-850 p-6 md:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/60 pb-3">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Edit Profile Headline</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
                  Learning Title / Specialization Headline
                </label>
                <input
                  type="text"
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-xs font-medium">
                Tip: Highlighting your target engineering specialization helps recruiters and peers evaluate your Cerevia Verified Portfolio.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
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
