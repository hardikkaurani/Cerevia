'use client';

import { useState } from 'react';
import { Flag, Award, Trophy, Flame, CheckCircle2, Sparkles, Star, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'milestone' | 'certificate' | 'challenge' | 'streak';
  description: string;
  xpEarned: number;
  icon: any;
  color: string;
  bg: string;
}

export function LearningJourneyTimeline() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'milestone' | 'certificate' | 'challenge'>('all');

  const timelineEvents: TimelineEvent[] = [
    {
      id: 'e1',
      date: 'July 15, 2026',
      title: 'Placed #2 in Global Diamond League',
      category: 'challenge',
      description: 'Earned 1,450 XP in weekly competitive coding challenges against 5,000+ engineers.',
      xpEarned: 500,
      icon: Trophy,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      id: 'e2',
      date: 'June 18, 2026',
      title: 'Earned Full-Stack Distributed Engineering Certificate',
      category: 'certificate',
      description: 'Passed final proctored capstone with 98.4% grade, verified by Academic Board.',
      xpEarned: 1000,
      icon: Award,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      id: 'e3',
      date: 'May 24, 2026',
      title: 'Earned AI & LLM Systems Specialization Certificate',
      category: 'certificate',
      description: 'Built production RAG vector search pipeline using PyTorch & LangChain.',
      xpEarned: 850,
      icon: Award,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200',
    },
    {
      id: 'e4',
      date: 'May 10, 2026',
      title: 'Reached 30-Day Consecutive Streak',
      category: 'streak',
      description: 'Maintained unbroken daily coding activity across 30 consecutive calendar days.',
      xpEarned: 300,
      icon: Flame,
      color: 'text-orange-600',
      bg: 'bg-orange-50 border-orange-200',
    },
    {
      id: 'e5',
      date: 'April 02, 2026',
      title: 'Reached Scholar Level 10 Status',
      category: 'milestone',
      description: 'Crossed 3,000 Total XP milestone on Cerevia learning platform.',
      xpEarned: 250,
      icon: Sparkles,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      id: 'e6',
      date: 'January 15, 2026',
      title: 'Joined Cerevia Academy',
      category: 'milestone',
      description: 'Enrolled in Full-Stack & AI Engineering Learning Path.',
      xpEarned: 100,
      icon: Flag,
      color: 'text-slate-700',
      bg: 'bg-slate-100 border-slate-300',
    },
  ];

  const filteredEvents = timelineEvents.filter((ev) => {
    if (filterCategory === 'all') return true;
    return ev.category === filterCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Learning Journey Timeline</h2>
          <p className="text-xs text-slate-500 font-medium">Chronological record of your achievements, certificates, and milestones.</p>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'all' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilterCategory('certificate')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'certificate' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setFilterCategory('challenge')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'challenge' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            League Wins
          </button>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {filteredEvents.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative group">
              {/* Timeline Dot Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 ${event.bg} bg-white flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110 z-10`}
              >
                <Icon className={`h-4 w-4 ${event.color}`} />
              </div>

              {/* Event Card */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-2xs hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    +{event.xpEarned} XP
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
