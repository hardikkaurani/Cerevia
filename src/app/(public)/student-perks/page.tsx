import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { CheckCircle2, Gift } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Student Perks — Free AI Sandbox & Student Pass',
  description:
    'Unlock free AI pair programming tokens, cloud container sandboxes, and verifiably signed certificates.',
};

export default function StudentPerksPage() {
  const perks = [
    {
      title: 'Free Core Access',
      desc: '100% free access to all foundational lessons, quizzes, and streak multipliers.',
    },
    {
      title: 'Unlimited AI Sandbox',
      desc: 'In-browser Node.js, Python, React 19, and Java compilation with real-time AST feedback.',
    },
    {
      title: 'Verified Certificates',
      desc: 'Cryptographically verifiable completion certificates for LinkedIn and developer portfolios.',
    },
    {
      title: 'Peer Code Reviews',
      desc: 'Get feedback on your solutions from senior engineering mentors and top leaderboard peers.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Gift className="h-3.5 w-3.5" />
            <span>Student Benefits</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Cerevia Student Perks
          </h1>
          <p className="text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            We believe world-class software engineering education should be
            accessible to every passionate builder.
          </p>
        </div>

        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {perks.map((p) => (
            <div
              key={p.title}
              className="flex items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" />
              <div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold">Ready to Start Learning?</h3>
          <p className="mt-2 text-xs text-blue-100">
            Create your account now and claim your free student pass instantly.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/register"
              className="rounded-full bg-white px-8 py-3 text-xs font-bold text-blue-600 transition-all hover:bg-blue-50"
            >
              Claim Free Student Pass &rarr;
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
