'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Flag, Award, Trophy, Flame, Sparkles, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'milestone' | 'certificate' | 'challenge' | 'streak';
  description: string;
  xpEarned: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

interface LearningJourneyTimelineProps {
  history?: {
    id: string;
    xpEarned: number;
    reason: string;
    timestamp: string;
  }[];
  createdAt?: string;
}

export function LearningJourneyTimeline({ history = [], createdAt }: LearningJourneyTimelineProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'milestone' | 'certificate' | 'challenge'>('all');

  const timelineEvents: TimelineEvent[] = useMemo(() => {
    // 1. Map history items to TimelineEvents
    const mapped = history.map((act) => {
      let category: 'milestone' | 'certificate' | 'challenge' | 'streak' = 'milestone';
      let icon = Sparkles;
      let color = 'text-emerald-600';
      let bg = 'bg-emerald-50 border-emerald-200';

      const reasonUpper = act.reason.toUpperCase();
      if (reasonUpper.includes('STREAK')) {
        category = 'streak';
        icon = Flame;
        color = 'text-orange-600';
        bg = 'bg-orange-50 border-orange-200';
      } else if (reasonUpper.includes('CERTIFICATE') || reasonUpper.includes('SPECIALIZATION')) {
        category = 'certificate';
        icon = Award;
        color = 'text-blue-600';
        bg = 'bg-blue-50 border-blue-200';
      } else if (reasonUpper.includes('CHALLENGE') || reasonUpper.includes('LEADERBOARD') || reasonUpper.includes('RANK')) {
        category = 'challenge';
        icon = Trophy;
        color = 'text-amber-600';
        bg = 'bg-amber-50 border-amber-200';
      }

      const date = act.timestamp
        ? new Date(act.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Recently';

      return {
        id: act.id,
        date,
        title: act.reason,
        category,
        description: `Successfully completed. Earned ${act.xpEarned} XP.`,
        xpEarned: act.xpEarned,
        icon,
        color,
        bg,
      };
    });

    // 2. Add standard "Joined" event at the end
    const joinedDateStr = createdAt
      ? new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Recently';

    const joinedEvent: TimelineEvent = {
      id: 'joined',
      date: joinedDateStr,
      title: 'Joined Cerevia Academy',
      category: 'milestone',
      description: 'Enrolled in Full-Stack & AI Engineering Learning Path.',
      xpEarned: 0,
      icon: Flag,
      color: 'text-slate-700 dark:text-zinc-400',
      bg: 'bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700',
    };

    return [...mapped, joinedEvent];
  }, [history, createdAt]);

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((ev) => {
      if (filterCategory === 'all') return true;
      return ev.category === filterCategory;
    });
  }, [timelineEvents, filterCategory]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Learning Journey Timeline</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Chronological record of your achievements, certificates, and milestones.</p>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold shrink-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterCategory === 'all' ? 'bg-white dark:bg-zinc-950 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilterCategory('certificate')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterCategory === 'certificate' ? 'bg-white dark:bg-zinc-950 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Certificates
          </button>
          <button
            onClick={() => setFilterCategory('challenge')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              filterCategory === 'challenge' ? 'bg-white dark:bg-zinc-950 text-blue-700 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            League Wins
          </button>
        </div>
      </div>

      {/* Timeline Layout */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-slate-500 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900/40">
          No timeline events match the selected category.
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-zinc-850">
          {filteredEvents.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="relative group">
                {/* Timeline Dot Icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 ${event.bg} bg-white dark:bg-zinc-950 flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110 z-10`}
                >
                  <Icon className={`h-4 w-4 ${event.color}`} />
                </div>

                {/* Event Card */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 space-y-2 shadow-2xs hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400">
                      <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{event.date}</span>
                    </div>
                    {event.xpEarned > 0 && (
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450 border border-emerald-200 dark:border-emerald-800/30">
                        +{event.xpEarned} XP
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-650 dark:text-zinc-400 leading-relaxed">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
