'use client';

import { Calendar as CalendarIcon, Clock, ChevronRight, Video } from 'lucide-react';
import Link from 'next/link';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'Workshop' | 'Deadline' | 'Quiz';
  time: string;
  date: string;
}

export function CalendarWidget() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Live Q&A: Next.js Server Components',
      type: 'Workshop',
      time: '4:00 PM',
      date: 'Today',
    },
    {
      id: '2',
      title: 'Prisma Migration Submission',
      type: 'Deadline',
      time: '11:59 PM',
      date: 'Today',
    },
    {
      id: '3',
      title: 'Weekly Full-Stack Knowledge Quiz',
      type: 'Quiz',
      time: '6:00 PM',
      date: 'Tomorrow',
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Academic Schedule</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Upcoming Events & Deadlines
          </h3>
        </div>

        <Link
          href="/lessons"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Calendar</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                {evt.type === 'Workshop' ? <Video className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>

              <div>
                <p className="text-xs font-bold text-white">{evt.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span>{evt.type}</span>
                  <span>•</span>
                  <span>{evt.time}</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700">
              {evt.date}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
