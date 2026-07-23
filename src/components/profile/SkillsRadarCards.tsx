'use client';

import { useState } from 'react';
import { Code2, Cpu, Server, Database, Cloud, Layers, Terminal, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  progress: number;
  xp: number;
  level: string;
  icon: any;
  color: string;
  bg: string;
  topics: string[];
}

export function SkillsRadarCards() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skillsList: SkillItem[] = [
    {
      id: 'react-next',
      name: 'React 19 & Next.js App Router',
      category: 'Frontend Architecture',
      progress: 92,
      xp: 1450,
      level: 'Level 5 Master',
      icon: Code2,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200',
      topics: ['Server Components & Server Actions', 'TailwindCSS Design Systems', 'Hydration Safety & Suspense', 'Zustand State Management'],
    },
    {
      id: 'python-ai',
      name: 'Python for AI & Data Science',
      category: 'AI & Machine Learning',
      progress: 88,
      xp: 1200,
      level: 'Level 4 Specialist',
      icon: Cpu,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
      topics: ['PyTorch & Tensor Operations', 'FastAPI Microservice APIs', 'LangChain & Vector Embeddings', 'Pandas & NumPy Analytics'],
    },
    {
      id: 'node-micro',
      name: 'Node.js & Scalable Microservices',
      category: 'Backend Engineering',
      progress: 85,
      xp: 980,
      level: 'Level 4 Architect',
      icon: Server,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
      topics: ['Express & NestJS Services', 'Event Loop & Worker Threads', 'RabbitMQ & Event Streaming', 'JWT & OAuth2 Security'],
    },
    {
      id: 'postgres-prisma',
      name: 'PostgreSQL & Prisma Relational ORM',
      category: 'Database Systems',
      progress: 90,
      xp: 1100,
      level: 'Level 5 Master',
      icon: Database,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200',
      topics: ['Relational Schema Migration', 'Index Optimization & EXPLAIN ANALYZE', 'Redis Caching Layer', 'Transaction Isolation Levels'],
    },
    {
      id: 'system-design',
      name: 'Distributed Systems & System Design',
      category: 'Software Architecture',
      progress: 78,
      xp: 750,
      level: 'Level 3 Practitioner',
      icon: Layers,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200',
      topics: ['Load Balancing & Consistent Hashing', 'Rate Limiting Algorithms', 'CAP Theorem & Eventual Consistency', 'CDN & Edge Caching'],
    },
    {
      id: 'cloud-docker',
      name: 'Cloud Native & Docker Containers',
      category: 'DevOps & Cloud',
      progress: 72,
      xp: 620,
      level: 'Level 3 Practitioner',
      icon: Cloud,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
      topics: ['Multi-Stage Docker Builds', 'Kubernetes Deployment Pods', 'GitHub Actions CI/CD Pipelines', 'AWS ECS & Lambda Serverless'],
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      category: 'Computer Science Core',
      progress: 84,
      xp: 890,
      level: 'Level 4 Master',
      icon: Terminal,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      topics: ['Dynamic Programming & Graph Traversal', 'Tree Balancing & Trie Search', 'Sliding Window & Two Pointers', 'Big-O Space/Time Complexity'],
    },
    {
      id: 'llm-engineering',
      name: 'AI Engineering & Prompt System Design',
      category: 'Emerging Tech',
      progress: 80,
      xp: 810,
      level: 'Level 4 Specialist',
      icon: Sparkles,
      color: 'text-violet-600',
      bg: 'bg-violet-50 border-violet-200',
      topics: ['RAG Vector Search Pipelines', 'Function Calling & Tool Calling Agents', 'Prompt Safety & Moderation', 'Fine-Tuning Open-Weights LLMs'],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Verified Engineering Skills</h2>
          <p className="text-xs text-slate-500 font-medium">Demonstrated proficiency through Cerevia interactive labs & coding evaluations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillsList.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${skill.bg} shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className={`h-5 w-5 ${skill.color}`} />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {skill.level}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{skill.category}</span>
                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Proficiency</span>
                  <span className="text-slate-900">{skill.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-0.5">
                  <span>{skill.xp} XP Earned</span>
                  <span className="flex items-center gap-0.5 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${selectedSkill.bg}`}>
                  <selectedSkill.icon className={`h-6 w-6 ${selectedSkill.color}`} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{selectedSkill.category}</span>
                  <h3 className="text-lg font-black text-slate-900">{selectedSkill.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level Tier</span>
                  <p className="text-sm font-extrabold text-slate-900">{selectedSkill.level}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total XP Earned</span>
                  <p className="text-sm font-extrabold text-slate-900">{selectedSkill.xp} XP</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Verified Skill Competencies</h4>
                <div className="space-y-2">
                  {selectedSkill.topics.map((tp, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-white text-xs font-medium text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{tp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
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
