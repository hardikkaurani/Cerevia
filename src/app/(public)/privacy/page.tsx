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
              When you create an account on Cerevia, we collect your email address, full name, and profile avatar. As you complete lessons and code in our in-browser sandboxes, we collect submission code snippets, execution metrics, and streak progress to calculate XP levels and leaderboard rankings.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              2. How Information Is Used
            </h3>
            <p>
              We use collected information strictly to personalize your learning experience, provide real-time AST code mentoring, issue verifiable completion certificates, compute streak statistics, and ensure platform security.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              3. Data Security &amp; Encryption
            </h3>
            <p>
              All traffic between your client and our services is encrypted using TLS/HTTPS protocols. User passwords are salted and hashed using bcrypt. Access tokens are stored securely in HttpOnly, SameSite cookies and local storage.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              4. Cookies &amp; Local Storage
            </h3>
            <p>
              We use essential session cookies and local storage items to keep you authenticated as you navigate between dashboard tools, sandboxes, and leaderboard metrics. We do not use intrusive third-party tracking cookies.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              5. Data Retention &amp; User Rights
            </h3>
            <p>
              You may request a copy of your personal data or request profile account deletion at any time by contacting support or accessing settings.
            </p>
          </section>

          <section className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              6. Contact Us
            </h3>
            <p>
              If you have questions regarding data privacy or security practices, email us at{' '}
              <a href="mailto:privacy@cerevia.edu" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                privacy@cerevia.edu
              </a>.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
