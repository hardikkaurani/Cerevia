import { PublicHeader } from '@/components/layout/PublicHeader';
import { CTA } from '@/components/sections/CTA';
import { PublicFooter } from '@/components/layout/Footer';
import { Mail, MessageSquare, Globe, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — Cerevia Engineering Support',
  description:
    'Get in touch with the Cerevia engineering board, support team, and community forums.',
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />

      <main className="flex flex-1 flex-col mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Contact Cerevia Engineering
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Have questions about our AI mentoring, course syllabi, enterprise partnerships, or developer platform? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 flex flex-col items-center text-center space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Email Support</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Reach out directly to our developer relations and student support team.
            </p>
            <a href="mailto:support@cerevia.edu" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              support@cerevia.edu
            </a>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 flex flex-col items-center text-center space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Community Discord</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Join over 20,000+ engineers discussing labs, code reviews, and career tips.
            </p>
            <a href="https://discord.gg/cerevia" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              discord.gg/cerevia
            </a>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 flex flex-col items-center text-center space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">GitHub Repository</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Explore open-source curriculum modules, report bugs, or contribute.
            </p>
            <a href="https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
              GitHub Community
            </a>
          </div>
        </div>

        <CTA />
      </main>

      <PublicFooter />
    </div>
  );
}
