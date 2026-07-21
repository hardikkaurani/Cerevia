'use client';

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentWrapper } from '@/components/layout/ContentWrapper';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Sparkles, Search } from 'lucide-react';
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
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-6 rounded-lg border border-border shadow-sm">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
            <input 
              type="text" 
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all font-sans"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((diff) => (
              <button 
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-4 py-2 rounded-md text-xs font-sans font-medium transition-all border shrink-0 ${
                  difficultyFilter === diff 
                    ? 'bg-primary text-primary-foreground border-transparent shadow-sm' 
                    : 'bg-transparent text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
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
              <div key={i} className="animate-pulse bg-card border border-border rounded-lg p-6 h-48 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-secondary rounded w-1/3" />
                  <div className="h-5 bg-secondary rounded w-3/4" />
                </div>
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-secondary rounded" />
                  <div className="h-3 w-5/6 bg-secondary rounded" />
                </div>
                <div className="h-10 bg-secondary rounded mt-4" />
              </div>
            ))}
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg p-16 text-center bg-card min-h-[300px]">
            <BookOpen className="h-10 w-10 text-primary/40 mb-4" />
            <h4 className="text-sm font-sans font-semibold text-foreground mb-1">No Modules Found</h4>
            <p className="text-xs font-sans text-muted-foreground max-w-sm leading-relaxed">
              We could not find any lessons matching your filters. Try a different query.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`transition-all flex flex-col justify-between overflow-hidden ${
                  lesson.completed ? 'opacity-85 border-primary/40 bg-card/60' : 'hover:border-primary/40 hover:shadow-md'
                }`}
              >
                <CardHeader className="pb-4 p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={lesson.completed ? 'success' : 'secondary'}>
                      {lesson.completed ? 'Completed' : lesson.difficulty}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      ID: {lesson.id.substring(0, 8)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5">
                    {lesson.description || 'No module description provided.'}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col mt-auto">
                  <CardContent className="py-4 flex items-center justify-between text-xs border-y border-border bg-muted/35 font-sans">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                      <span className="text-muted-foreground">Core Syllabus</span>
                    </div>
                    <span className="font-semibold text-primary">+{lesson.xpReward} XP</span>
                  </CardContent>
                  <CardFooter className="pt-6 justify-between bg-transparent p-6">
                    {lesson.completed ? (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          Review Completed Lesson
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/lessons/${lesson.id}`} className="w-full">
                        <Button variant="primary" size="sm" className="w-full group flex items-center justify-center gap-1.5">
                          <span>Start Lesson</span>
                          <Sparkles className="h-3 w-3" />
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
