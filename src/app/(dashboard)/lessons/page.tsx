'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Sparkles, Trophy, Search } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';

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
          api.get<LessonItem[]>('/api/lessons'),
          api.get<any>('/api/lessons/progress'),
        ]);

        if (lessonsRes.success && lessonsRes.data) {
          const rawLessons = lessonsRes.data;
          const completedIds = new Set<string>();

          if (progressRes.success && progressRes.data && progressRes.data.completed) {
            progressRes.data.completed.forEach((p: any) => completedIds.add(p.lessonId));
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
    <PageContainer>
      <PageHeader 
        title="Curriculum Modules"
        description="Choose a structured lesson to practice backend engineering concepts, complete assignments, and earn XP."
      />

      <ContentWrapper className="space-y-8">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-950/45 p-4 rounded-2xl border border-gray-900/60 backdrop-blur-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#090d16] border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
              <button 
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                  difficultyFilter === diff 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/10' 
                    : 'bg-transparent text-gray-400 border-gray-850 hover:text-white hover:bg-gray-900/40'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-950/20 border border-gray-900/60 rounded-2xl p-6 h-48 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-1/3" />
                  <div className="h-5 bg-gray-800 rounded w-3/4" />
                </div>
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-gray-800 rounded" />
                  <div className="h-3 w-5/6 bg-gray-800 rounded" />
                </div>
                <div className="h-10 bg-gray-800 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-2xl p-12 text-center bg-gray-950/20 min-h-[300px]">
            <BookOpen className="h-10 w-10 text-gray-600 mb-4 animate-bounce" />
            <h4 className="text-sm font-semibold text-white mb-1">No Modules Found</h4>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              We could not find any lessons matching your filters. Try a different query.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`rounded-2xl border border-gray-900 bg-gray-950/40 hover:bg-gray-950/80 transition-all flex flex-col justify-between overflow-hidden shadow-lg ${
                  lesson.completed ? 'opacity-70 border-emerald-500/10' : 'hover:border-cyan-500/20 hover:shadow-cyan-500/5'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={lesson.completed ? 'success' : 'secondary'}>
                      {lesson.completed ? 'Completed' : lesson.difficulty}
                    </Badge>
                    <span className="text-[10px] text-gray-500 font-mono">
                      ID: {lesson.id.substring(0, 8)}
                    </span>
                  </div>
                  <CardTitle className="text-base text-white font-bold tracking-tight line-clamp-1">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5 text-xs text-gray-400 leading-relaxed font-normal">
                    {lesson.description || 'No module description provided.'}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-auto">
                  <CardContent className="py-3 flex items-center justify-between text-xs border-y border-gray-900/60 bg-gray-900/20">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-gray-400 font-medium">Core Syllabus</span>
                    </div>
                    <span className="font-bold text-cyan-400">+{lesson.xpReward} XP</span>
                  </CardContent>
                  <CardFooter className="pt-4 justify-between bg-gray-950/10 p-6">
                    {lesson.completed ? (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full text-xs font-bold border-gray-800 text-gray-400 hover:text-white">
                          Review Completed Lesson
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="primary" size="sm" className="w-full group text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md shadow-cyan-500/10">
                          <span>Start Lesson</span>
                          <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
