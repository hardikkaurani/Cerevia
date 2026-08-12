'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Sparkles, Search, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';
import { cn } from '@/lib/utils';

interface LessonItem {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  xpReward: number;
  completedAt?: string;
  completed?: boolean;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  useEffect(() => {
    async function loadLessons() {
      try {
        const [lessonsRes, progressRes] = await Promise.all([
          api.get<{ lessons: LessonItem[] }>('/api/lessons'),
          api.get<{ completedLessons?: Array<{ id: string }> }>('/api/lessons/progress'),
        ]);

        if (lessonsRes.success && lessonsRes.data) {
          const rawLessons = lessonsRes.data.lessons || [];
          const completedIds = new Set<string>();

          if (progressRes.success && progressRes.data) {
            const completedList = progressRes.data.completedLessons || [];
            completedList.forEach((p: { id: string }) => completedIds.add(p.id));
          }

          const mapped = rawLessons.map((l) => ({
            ...l,
            completed: completedIds.has(l.id),
          }));

          setLessons(mapped);
        }
      } catch (err) {
        console.error('Failed to load lessons list:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLessons();
  }, []);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'ALL' || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <PageContainer className="bg-slate-50/40 dark:bg-transparent min-h-screen">
      <PageHeader
        title="Curriculum & Syllabus Modules"
        description="Choose a structured lesson to practice backend engineering concepts, complete assignments, and earn XP."
      />

      <ContentWrapper className="space-y-6">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800/80 shadow-xs">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search syllabus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-sans"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer',
                  difficultyFilter === diff
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List Grid */}
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-400 bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xs">
            No curriculum modules match your search filter.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  'rounded-2xl border bg-white dark:bg-zinc-900/40 p-6 space-y-4 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md',
                  lesson.completed 
                    ? 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/20 dark:bg-emerald-950/20' 
                    : 'border-slate-200 dark:border-zinc-800/80'
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/30 px-2 py-0.5 rounded-md">
                      {lesson.difficulty}
                    </span>
                    {lesson.completed && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">{lesson.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                    {lesson.description || 'Master key backend development principles and complete hands-on coding exercises.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 font-mono flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> +{lesson.xpReward} XP
                  </span>

                  <Link href={`/lessons/${lesson.id}`}>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs">
                      <span>{lesson.completed ? 'Review' : 'Start Lesson'}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
