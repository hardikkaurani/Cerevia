import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { MessageSquare, Award, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Community Forum — Cerevia Engineering Network',
  description:
    'Connect with 20,000+ student engineers, share code reviews, participate in weekly sprints, and discuss system design.',
};

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>20,000+ Engineers</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Cerevia Peer Community
          </h1>
          <p className="text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Join regional study groups, participate in weekly competitive
            coding sprints, and review code with global peers.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Discord Guild
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Real-time voice channels, pair programming lobbies, and monthly
              hackathons.
            </p>
            <a
              href="https://discord.gg/cerevia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Join Discord Lobbies &rarr;
            </a>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Global Leaderboard
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Compete for weekly XP trophies, league promotions, and recruiter
              visibility.
            </p>
            <Link
              href="/leaderboard"
              className="text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
            >
              View Leaderboards &rarr;
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Open Source Curriculum
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Contribute new coding lab challenges, report edge cases, or
              improve documentation.
            </p>
            <a
              href="https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-600 hover:underline dark:text-purple-400"
            >
              GitHub Organization &rarr;
            </a>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
