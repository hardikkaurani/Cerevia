'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, Award } from 'lucide-react';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  duration: string;
  progress: number;
  image: string;
}

export function FeaturedCoursesGrid() {
  const courses: CourseItem[] = [
    {
      id: 'fullstack-nextjs',
      title: 'Full-Stack Next.js 15 & Prisma',
      category: 'Software Engineering',
      difficulty: 'Intermediate',
      duration: '14 hrs',
      progress: 65,
      image: '/images/dashboard/courses.webp',
    },
    {
      id: 'ai-agents-llm',
      title: 'Building Production AI Agents & Copilots',
      category: 'Artificial Intelligence',
      difficulty: 'Advanced',
      duration: '18 hrs',
      progress: 30,
      image: '/images/dashboard/mentor.webp',
    },
    {
      id: 'dsa-system-design',
      title: 'Data Structures & System Architecture',
      category: 'Computer Science',
      difficulty: 'Beginner',
      duration: '22 hrs',
      progress: 90,
      image: '/images/dashboard/progress.webp',
    },
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Curriculum Tracks</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Enrolled Course Tracks
          </h3>
        </div>

        <Link
          href="/lessons"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Explore All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-xl group"
          >
            {/* Card Image Thumbnail */}
            <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
              <Image
                src={course.image}
                alt={course.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <span className="absolute top-3 left-3 rounded-xl bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 text-[10px] font-bold text-zinc-300 backdrop-blur-md">
                {course.difficulty}
              </span>

              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                {course.category}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {course.title}
                </h4>

                <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-amber-400" /> Certificate
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-semibold text-zinc-400">
                  <span>Progress</span>
                  <span className="text-white font-bold">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 pt-0">
              <Link
                href="/lessons"
                className="flex items-center justify-center gap-1.5 w-full h-10 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 group-hover:bg-zinc-800 group-hover:text-white transition-all"
              >
                <span>Continue Track</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
