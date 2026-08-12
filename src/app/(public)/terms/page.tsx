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
              1. Introduction &amp; Agreement
            </h3>
            <p>
              Welcome to Cerevia. By creating an account or accessing our interactive in-browser sandboxes, AI pair programming tools, or structured learning roadmaps, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              2. Account Responsibilities &amp; Credentials
            </h3>
            <p>
              You are responsible for maintaining the confidentiality of your authentication credentials and for all activities conducted under your account. You agree to provide accurate registration information and update it promptly.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              3. In-Browser Sandbox &amp; Platform Conduct
            </h3>
            <p>
              Cerevia provides containerized execution environments for learning software engineering. You agree not to attempt security escapes, launch unauthorized automated traffic, execute malicious payloads, or abuse sandbox resource quotas.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              4. Academic Integrity &amp; Leaderboards
            </h3>
            <p>
              Leaderboards, streaks, and XP points are designed to foster authentic peer learning. Automated solution bots, artificial XP farming, or plagiarized project audits violate platform integrity and may result in point resets or account suspension.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              5. Intellectual Property
            </h3>
            <p>
              All curriculum content, interactive challenges, platform branding, and software architecture remain the intellectual property of Cerevia Inc. You retain ownership of code you independently author in our sandboxes.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              6. Disclaimers &amp; Limitation of Liability
            </h3>
            <p>
              The platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis for educational purposes. Cerevia is not liable for indirect or consequential damages resulting from service interruptions or sandbox container restarts.
            </p>
          </section>

          <section className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
              7. Contact Information
            </h3>
            <p>
              For questions regarding these Terms of Service, please contact our support team at{' '}
              <a href="mailto:support@cerevia.edu" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                support@cerevia.edu
              </a>.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
