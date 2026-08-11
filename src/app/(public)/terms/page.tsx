import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service — Cerevia Educational Platform',
  description:
    'Terms and conditions governing the use of Cerevia learning paths, code sandboxes, and student accounts.',
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Scale className="h-3.5 w-3.5" />
            <span>User Agreement</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-zinc-500">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 border-t border-zinc-200 pt-8 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              1. Acceptable Use
            </h3>
            <p>
              By registering on Cerevia, you agree to use our in-browser code
              execution sandboxes solely for educational purposes. Automated
              scraping, malicious payload execution, or denial-of-service attempts
              against sandbox containers will result in immediate account
              termination.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              2. Academic Integrity
            </h3>
            <p>
              Submitting automated solution bots to game XP or artificially
              manipulate leaderboard rankings is strictly prohibited.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
