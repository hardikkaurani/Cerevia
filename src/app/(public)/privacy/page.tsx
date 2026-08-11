import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Cerevia Data Protection',
  description:
    'Learn how Cerevia protects your personal data, code sandbox executions, and student profile privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500">Last updated: August 2026</p>
        </div>

        <div className="space-y-8 border-t border-zinc-200 pt-8 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              1. Information We Collect
            </h3>
            <p>
              We collect your email address, full name, and avatar when you create
              an account. When you complete coding labs in our in-browser IDE, we
              record submission code, execution outputs, and XP metrics to
              calculate streak data and leaderboard placement.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              2. How We Use Data
            </h3>
            <p>
              Your data is strictly used to deliver interactive learning
              experiences, provide AI mentoring hints, generate verified
              completion credentials, and prevent platform abuse.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              3. Security &amp; Integrity
            </h3>
            <p>
              All HTTP traffic is encrypted via TLS/HTTPS. Passwords are hashed
              using bcrypt. Authentication cookies use HttpOnly, Secure, and
              SameSite attributes.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
