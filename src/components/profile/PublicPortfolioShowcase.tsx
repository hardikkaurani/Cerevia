'use client';

import { useState } from 'react';
import { ExternalLink, Download, Code, FileText, GitBranch } from 'lucide-react';

interface PublicPortfolioShowcaseProps {
  fullName?: string;
  email?: string;
}

export function PublicPortfolioShowcase({ fullName = 'Student' }: PublicPortfolioShowcaseProps) {
  const [showReportModal, setShowReportModal] = useState(false);

  const projectsList = [
    {
      id: 'p1',
      name: 'Distributed Cerevia Real-Time Learning Platform',
      tech: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
      description: 'Full-Stack LMS with real-time gamification, automated quiz grading, and AI mentor streaming.',
      stars: 42,
      link: 'https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia',
    },
    {
      id: 'p2',
      name: 'RAG LLM Context Embeddings Engine',
      tech: ['Python', 'FastAPI', 'PyTorch', 'Qdrant Vector DB'],
      description: 'Enterprise search microservice utilizing local embeddings and function-calling agents.',
      stars: 38,
      link: 'https://github.com',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Student Portfolio & Capstone Projects</h2>
          <p className="text-xs text-slate-500 font-medium">Showcase of verified repositories, GitHub contributions, and executive learning report.</p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <FileText className="h-3.5 w-3.5 text-blue-400" />
          <span>Download Learning Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsList.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 space-y-3.5 shadow-2xs hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 shrink-0">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 pt-0.5">
                    <GitBranch className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-550" />
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">{project.stars} Stars</span>
                  </div>
                </div>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-850 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
                title="View Repository"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100 dark:border-zinc-800/60">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-800/65"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-850 p-6 md:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/60 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Executive Learning Transcript</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-350 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-zinc-400">
              <p>
                Generates a verified 2-page PDF portfolio including all course completion transcripts, skill evaluations, verified credentials, and GitHub capstone repositories.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 space-y-1 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Credentials:</span>
                  <span className="font-bold text-blue-700 dark:text-blue-400">3 Specializations</span>
                </div>
                <div className="flex justify-between">
                  <span>Total XP:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-450">4,850 XP</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  alert('Executive Learning Report PDF generated successfully!');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
