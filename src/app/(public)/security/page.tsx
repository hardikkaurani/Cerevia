import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/Footer';
import { ShieldCheck, Lock, Server } from 'lucide-react';

export const metadata = {
  title: 'Security Audit — Cerevia Platform Security & Compliance',
  description:
    'Learn about Cerevia zero-trust infrastructure, sandbox isolation, container security, and AES encryption.',
};

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Infrastructure Hardening</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            Security &amp; Audit Overview
          </h1>
          <p className="text-xs text-zinc-500">Enterprise Grade Isolation</p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <Server className="h-6 w-6 text-blue-500" />
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Container Sandbox Isolation
            </h3>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Student code runs in unprivileged ephemeral Docker/gVisor containers
              with strict CPU, memory, and network limits.
            </p>
          </div>

          <div className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <Lock className="h-6 w-6 text-emerald-500" />
            <h3 className="text-base font-bold text-zinc-950 dark:text-white">
              Zero-Trust Authentication
            </h3>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Cryptographic JWT tokens, HttpOnly secure cookies, and password
              hashing using bcrypt algorithm.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
