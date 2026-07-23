'use client';

import Link from 'next/link';
import { Play, HelpCircle, CheckSquare, Bot, Award, Zap } from 'lucide-react';

export function QuickActionsBar() {
  const actions = [
    { label: 'Resume Syllabus', href: '/lessons', icon: Play, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Take Quiz', href: '/lessons', icon: HelpCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Assignments', href: '#assignments', icon: CheckSquare, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'AI Copilot', href: '#ai-mentor', icon: Bot, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Certificates', href: '/profile', icon: Award, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none select-none">
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 shrink-0 flex items-center gap-1 font-mono">
        <Zap className="h-3 w-3 text-amber-400 fill-amber-400" /> Quick Actions
      </span>
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.label}
            href={act.href}
            className={`flex items-center gap-2 rounded-xl border ${act.bg} px-3.5 py-2 text-xs font-bold ${act.color} hover:bg-zinc-800 transition-all shrink-0`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{act.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
