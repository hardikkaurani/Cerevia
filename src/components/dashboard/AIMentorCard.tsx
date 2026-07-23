'use client';

import Image from 'next/image';
import { Bot, Sparkles, MessageSquare, HelpCircle, Code2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function AIMentorCard() {
  const promptTriggers = [
    { label: 'Explain Prisma Migrations', icon: Code2 },
    { label: 'Generate Next.js 15 Quiz', icon: HelpCircle },
    { label: 'Suggest Next Learning Path', icon: Sparkles },
    { label: 'Debug React Hydration Error', icon: MessageSquare },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl group">
      
      {/* WebP Mentor Background */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none overflow-hidden hidden sm:block">
        <Image
          src="/images/dashboard/mentor.webp"
          alt="AI Mentor Visual"
          fill
          unoptimized
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950" />
      </div>

      {/* Header Badge */}
      <div className="relative z-10 space-y-2 max-w-xl">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Cerevia AI Copilot
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          Stuck on a Code Problem? Ask Your AI Mentor
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-normal">
          Get instant 24/7 code explanation, bug detection, automated quiz generation, and personalized roadmap recommendations.
        </p>
      </div>

      {/* Quick Triggers Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
        {promptTriggers.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.label}
              className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/80 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-left group/btn"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                <span>{t.label}</span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <Link
          href="/lessons"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-lg hover:bg-cyan-400 transition-all transform hover:-translate-y-0.5"
        >
          <Bot className="h-4 w-4" />
          <span>Launch AI Copilot Chat</span>
        </Link>
        <span className="text-[11px] text-zinc-500 font-medium hidden sm:inline">
          Powered by Cerevia Neural Engine
        </span>
      </div>

    </div>
  );
}
