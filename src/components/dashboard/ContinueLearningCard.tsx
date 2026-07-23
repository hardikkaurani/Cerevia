'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, BookOpen, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

interface NextLesson {
  id: string;
  title: string;
  difficulty: string;
  xpReward: number;
}

interface ContinueLearningCardProps {
  loading: boolean;
  nextLesson: NextLesson | null;
  completedCount: number;
  totalCount: number;
}

export function ContinueLearningCard({
  loading,
  nextLesson,
  completedCount,
  totalCount,
}: ContinueLearningCardProps) {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-xl flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
      
      {/* Background WebP Accent */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none overflow-hidden hidden sm:block">
        <Image
          src="/images/dashboard/courses.webp"
          alt="Active Track Visual"
          fill
          unoptimized
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950" />
      </div>

      <div className="relative z-10 space-y-4 max-w-xl">
        
        {/* Header Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
            Active Learning Track
          </span>
        </div>

        {/* Lesson Information */}
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-7 w-3/4 bg-zinc-900 rounded-xl" />
            <div className="h-4 w-1/2 bg-zinc-900 rounded-lg" />
          </div>
        ) : nextLesson ? (
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {nextLesson.title}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Master core principles and earn <span className="font-bold text-amber-400">+{nextLesson.xpReward} XP</span> upon completion.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Syllabus Completed!
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Awesome work! You have finished all available modules in this learning path. Check back for new releases or review past quizzes.
            </p>
          </div>
        )}

        {/* Progress Bar & Details */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-400">Module Progress</span>
            <span className="text-white font-bold">{completedCount} of {totalCount} completed ({progressPercent}%)</span>
          </div>

          <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Meta Stats Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-medium pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-zinc-500" /> ~15 Mins
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Interactive Practice
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Auto Evaluated
          </span>
        </div>

      </div>

      {/* Action CTA */}
      <div className="relative z-10 pt-6 border-t border-zinc-800/80 mt-6 flex items-center justify-between">
        {loading ? (
          <div className="h-10 w-36 bg-zinc-900 rounded-xl animate-pulse" />
        ) : nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-lg hover:bg-zinc-100 transition-all transform hover:-translate-y-0.5"
          >
            <Play className="h-3.5 w-3.5 fill-zinc-950" />
            <span>Resume Syllabus</span>
          </Link>
        ) : (
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <span>Review Course Syllabus</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}

        <Link
          href="/lessons"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
        >
          <span>View All Modules</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

    </div>
  );
}
