import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { BookOpen, Code, Terminal, Cpu, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Documentation — Cerevia Developer & Student Guide',
  description:
    'Comprehensive documentation for Cerevia in-browser sandboxes, AI mentoring, API integration, and curriculum roadmaps.',
};

export default function DocumentationPage() {
  const docsSections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      description:
        'Learn how to set up your student profile, run your first in-browser lab, and track daily streaks.',
      links: [
        'Platform Overview',
        'Account Setup',
        'Daily Streaks & XP',
        'Command Palette (⌘K)',
      ],
    },
    {
      title: 'AI Code Assistant',
      icon: Cpu,
      description:
        'Understand how the 24/7 AI Pair Programmer inspects AST syntax, suggests optimizations, and debugs errors.',
      links: [
        'AI Mentor Overview',
        'Prompt Guidelines',
        'AST Inspection',
        'Token Quotas',
      ],
    },
    {
      title: 'In-Browser Sandboxes',
      icon: Terminal,
      description:
        'Execute Node.js, Python, React 19, Java, and C++ directly in secure isolated container environments.',
      links: [
        'Multi-Language Runtime',
        'Terminal Output',
        'Unit Test Audits',
        'Memory Limits',
      ],
    },
    {
      title: 'API & Developer Tools',
      icon: Code,
      description:
        'Integrate custom webhooks, fetch leaderboard rankings programmatically, and access OpenAPI specs.',
      links: [
        'REST API Reference',
        'Swagger Docs (/api/docs)',
        'JWT Authentication',
        'Rate Limiting',
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Developer Knowledge Base</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Cerevia Documentation
          </h1>
          <p className="text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Everything you need to master our interactive sandboxes, AI mentor
            APIs, and learning path roadmaps.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {docsSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                    {sec.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {sec.description}
                </p>
                <ul className="space-y-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  {sec.links.map((linkText) => (
                    <li
                      key={linkText}
                      className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span>{linkText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-zinc-950 p-8 text-center text-white shadow-xl dark:bg-zinc-900">
          <h3 className="text-xl font-bold">Looking for API Specifications?</h3>
          <p className="mt-2 text-xs text-zinc-400">
            Explore interactive Swagger/OpenAPI endpoints and HTTP status payloads.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/api/docs"
              className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
            >
              Open API Reference (/api/docs)
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
