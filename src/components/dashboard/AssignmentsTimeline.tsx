'use client';

import { CheckCircle2, Clock, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AssignmentItem {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'upcoming' | 'overdue' | 'completed';
  priority: 'High' | 'Medium' | 'Low';
}

export function AssignmentsTimeline() {
  const assignments: AssignmentItem[] = [
    {
      id: '1',
      title: 'Full-Stack Prisma Schema Migration & Seeding',
      course: 'Next.js 15 Deep Dive',
      dueDate: 'Today, 11:59 PM',
      status: 'upcoming',
      priority: 'High',
    },
    {
      id: '2',
      title: 'Zod API Request Validator Challenge',
      course: 'TypeScript Engineering',
      dueDate: 'Tomorrow, 5:00 PM',
      status: 'upcoming',
      priority: 'Medium',
    },
    {
      id: '3',
      title: 'PostgreSQL Index Optimization Benchmark',
      course: 'Database Architecture',
      dueDate: 'Completed Yesterday',
      status: 'completed',
      priority: 'Low',
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Calendar className="h-3.5 w-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Upcoming & Active Assignments
          </h3>
        </div>

        <Link
          href="/lessons"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {assignments.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5',
                  item.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                  item.status === 'overdue' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                  'bg-blue-500/10 border-blue-500/20 text-blue-400'
                )}>
                  {item.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> :
                   item.status === 'overdue' ? <AlertTriangle className="h-4 w-4" /> :
                   <Clock className="h-4 w-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                    <span className={cn(
                      'text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                      item.priority === 'High' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                      item.priority === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      'bg-zinc-800 border-zinc-700 text-zinc-400'
                    )}>
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{item.course}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                <span className="text-xs font-semibold text-zinc-400">{item.dueDate}</span>
                <Link href="/lessons">
                  <button className="h-8 px-3.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors">
                    {item.status === 'completed' ? 'Review' : 'Submit'}
                  </button>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
