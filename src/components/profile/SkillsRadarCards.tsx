'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { Code2, Cpu, Server, Database, Layers, Cloud, CheckCircle2, ChevronRight } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  progress: number;
  xp: number;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  topics: string[];
}

interface SkillsRadarCardsProps {
  completedLessonIds?: string[];
}

export function SkillsRadarCards({ completedLessonIds = [] }: SkillsRadarCardsProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);

  const skillsList: SkillItem[] = useMemo(() => {
    // 1. Next.js App Router (id: 'b9d1a905-4087-6f38-b0a7-2f991158923e')
    const hasNext = completedSet.has('b9d1a905-4087-6f38-b0a7-2f991158923e');
    // 2. PostgreSQL & Prisma (id: 'c0e2b016-5198-7f49-c1b8-3fa02269034f')
    const hasDb = completedSet.has('c0e2b016-5198-7f49-c1b8-3fa02269034f');
    // 3. Frontend Basics (HTML & CSS: 'e6a8d672-1d54-4f05-87d4-fdf6ee25690b' and 'f7b9e783-2e65-4f16-98e5-0ef7ff36701c')
    const hasHtml = completedSet.has('e6a8d672-1d54-4f05-87d4-fdf6ee25690b');
    const hasCss = completedSet.has('f7b9e783-2e65-4f16-98e5-0ef7ff36701c');
    const htmlCssProgress = (hasHtml ? 50 : 0) + (hasCss ? 50 : 0);
    const htmlCssXp = (hasHtml ? 10 : 0) + (hasCss ? 15 : 0);
    // 4. JavaScript Basics (id: 'a8c0f894-3f76-5f27-a9f6-1f880047812d')
    const hasJs = completedSet.has('a8c0f894-3f76-5f27-a9f6-1f880047812d');

    return [
      {
        id: 'react-next',
        name: 'React 19 & Next.js App Router',
        category: 'Frontend Architecture',
        progress: hasNext ? 100 : 0,
        xp: hasNext ? 30 : 0,
        level: hasNext ? 'Level 1 Scholar' : 'Locked',
        icon: Code2,
        color: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/30',
        topics: ['Server Components & Server Actions', 'TailwindCSS Design Systems', 'Hydration Safety & Suspense', 'Zustand State Management'],
      },
      {
        id: 'html-css',
        name: 'HTML5 & CSS3 Essentials',
        category: 'Frontend Core',
        progress: htmlCssProgress,
        xp: htmlCssXp,
        level: htmlCssProgress === 100 ? 'Level 1 Scholar' : htmlCssProgress > 0 ? 'In Progress' : 'Locked',
        icon: Code2,
        color: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30',
        topics: ['Semantic Structure & HTML Tags', 'CSS Selectors & Box Model', 'Flexbox & Grid Layouts', 'Responsive Web Design'],
      },
      {
        id: 'javascript',
        name: 'JavaScript Fundamentals',
        category: 'Web Programming',
        progress: hasJs ? 100 : 0,
        xp: hasJs ? 20 : 0,
        level: hasJs ? 'Level 1 Scholar' : 'Locked',
        icon: Code2,
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30',
        topics: ['Variables & Primitive Types', 'Control Flow & Loops', 'Functions & Variable Scope', 'DOM Manipulation Basics'],
      },
      {
        id: 'postgres-prisma',
        name: 'PostgreSQL & Prisma Relational ORM',
        category: 'Database Systems',
        progress: hasDb ? 100 : 0,
        xp: hasDb ? 25 : 0,
        level: hasDb ? 'Level 1 Scholar' : 'Locked',
        icon: Database,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/30',
        topics: ['Relational Schema Migration', 'Index Optimization & EXPLAIN ANALYZE', 'Redis Caching Layer', 'Transaction Isolation Levels'],
      },
      {
        id: 'python-ai',
        name: 'Python for AI & Data Science',
        category: 'AI & Machine Learning',
        progress: 0,
        xp: 0,
        level: 'Locked',
        icon: Cpu,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30',
        topics: ['PyTorch & Tensor Operations', 'FastAPI Microservice APIs', 'LangChain & Vector Embeddings', 'Pandas & NumPy Analytics'],
      },
      {
        id: 'node-micro',
        name: 'Node.js & Scalable Microservices',
        category: 'Backend Engineering',
        progress: 0,
        xp: 0,
        level: 'Locked',
        icon: Server,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30',
        topics: ['Express & NestJS Services', 'Event Loop & Worker Threads', 'RabbitMQ & Event Streaming', 'JWT & OAuth2 Security'],
      },
      {
        id: 'system-design',
        name: 'Distributed Systems & System Design',
        category: 'Software Architecture',
        progress: 0,
        xp: 0,
        level: 'Locked',
        icon: Layers,
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/30',
        topics: ['Load Balancing & Consistent Hashing', 'Rate Limiting Algorithms', 'CAP Theorem & Eventual Consistency', 'CDN & Edge Caching'],
      },
      {
        id: 'cloud-docker',
        name: 'Cloud Native & Docker Containers',
        category: 'DevOps & Cloud',
        progress: 0,
        xp: 0,
        level: 'Locked',
        icon: Cloud,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30',
        topics: ['Multi-Stage Docker Builds', 'Kubernetes Deployment Pods', 'GitHub Actions CI/CD Pipelines', 'AWS ECS & Lambda Serverless'],
      },
    ];
  }, [completedSet]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Verified Engineering Skills</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Demonstrated proficiency through Cerevia interactive labs & coding evaluations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillsList.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/85 bg-white dark:bg-zinc-900/40 space-y-3 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${skill.bg} shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`h-5 w-5 ${skill.color}`} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800">
                  {skill.level}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">{skill.category}</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-450 transition-colors">
                  {skill.name}
                </h3>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 dark:text-zinc-400">Proficiency</span>
                  <span className="text-slate-900 dark:text-white">{skill.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-zinc-500 pt-0.5">
                  <span>{skill.xp} XP Earned</span>
                  <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                    Details <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-850 p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/60 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${selectedSkill.bg}`}>
                  <selectedSkill.icon className={`h-6 w-6 ${selectedSkill.color}`} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-550">{selectedSkill.category}</span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{selectedSkill.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-slate-650 dark:text-zinc-500 dark:hover:text-zinc-300 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Level Tier</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedSkill.level}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Total XP Earned</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">{selectedSkill.xp} XP</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Verified Skill Competencies</h4>
                <div className="space-y-2">
                  {selectedSkill.topics.map((tp, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 text-xs font-medium text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{tp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-zinc-800/60">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white dark:text-zinc-200 text-xs font-bold hover:bg-slate-800 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
              >
                Close Competency View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
