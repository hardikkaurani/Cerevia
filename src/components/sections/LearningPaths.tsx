'use client';

import { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Layers, Sparkles, Shield, Cpu, Cloud, Code, Database, Terminal } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  role: string;
  icon: any;
  duration: string;
  level: string;
  demand: string;
  description: string;
  milestones: { step: string; title: string; skills: string[] }[];
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Software Engineer',
    role: 'Senior Full Stack Developer',
    icon: Layers,
    duration: '5 Months',
    level: 'Comprehensive',
    demand: 'Very High',
    description: 'Master end-to-end Web Applications with React 19, Next.js, Node.js, Prisma, PostgreSQL, and Cloud Deployment.',
    milestones: [
      { step: '01', title: 'Frontend Mastery', skills: ['React 19', 'Next.js App Router', 'TypeScript', 'Tailwind CSS'] },
      { step: '02', title: 'Backend & DB Design', skills: ['Node.js API', 'PostgreSQL', 'Prisma ORM', 'Redis Caching'] },
      { step: '03', title: 'DevOps & Launch', skills: ['Docker', 'Vercel Deployment', 'CI/CD Pipelines', 'Security'] }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    role: 'AI Engineer / ML Specialist',
    icon: Cpu,
    duration: '6 Months',
    level: 'Advanced',
    demand: 'Extremely High',
    description: 'Build LLM powered applications, fine-tune neural networks, implement RAG systems, and deploy autonomous agents.',
    milestones: [
      { step: '01', title: 'Python & Math Foundations', skills: ['Python', 'NumPy & Pandas', 'Linear Algebra', 'PyTorch'] },
      { step: '02', title: 'LLMs & RAG Pipelines', skills: ['LangChain', 'Vector DBs (Pinecone)', 'OpenAI API', 'Embeddings'] },
      { step: '03', title: 'Agent Deployment', skills: ['FastAPI', 'Model Fine-tuning', 'Production Ops', 'Evaluation'] }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    role: 'Senior Frontend Architect',
    icon: Code,
    duration: '3 Months',
    level: 'Beginner to Pro',
    demand: 'High',
    description: 'Specialize in modern UI frameworks, micro-interactions, web performance optimization, and accessible component libraries.',
    milestones: [
      { step: '01', title: 'Core Web Standards', skills: ['HTML5/CSS3', 'Modern JS (ES6+)', 'DOM Manipulation', 'Git'] },
      { step: '02', title: 'React Ecosystem', skills: ['React', 'State Management', 'Custom Hooks', 'UI Systems'] },
      { step: '03', title: 'Performance & Testing', skills: ['Lighthouse', 'Cypress', 'A11y Standards', 'Bundle Tuning'] }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Systems Engineer',
    role: 'Distributed Systems Architect',
    icon: Database,
    duration: '4 Months',
    level: 'Intermediate',
    demand: 'High',
    description: 'Design resilient microservices, high-throughput message queues, database indexing, and fault-tolerant architectures.',
    milestones: [
      { step: '01', title: 'System Architecture', skills: ['Node.js & Go', 'REST & gRPC', 'Database Indexing', 'SQL'] },
      { step: '02', title: 'Caching & Queues', skills: ['Redis', 'RabbitMQ/Kafka', 'Data Partitioning', 'Consensus'] },
      { step: '03', title: 'Scalability Ops', skills: ['Kubernetes', 'Prometheus', 'Load Balancers', 'Stress Testing'] }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps Engineer',
    role: 'Cloud Solutions Architect',
    icon: Cloud,
    duration: '4 Months',
    level: 'Intermediate',
    demand: 'High',
    description: 'Automate cloud infrastructure with Infrastructure-as-Code (Terraform), manage CI/CD pipelines, and secure cloud environments.',
    milestones: [
      { step: '01', title: 'Linux & Networking', skills: ['Bash Scripting', 'Networking', 'SSH & Security', 'Docker'] },
      { step: '02', title: 'Cloud Infrastructure', skills: ['AWS / GCP', 'Terraform', 'Kubernetes', 'IAM Security'] },
      { step: '03', title: 'Continuous Integration', skills: ['GitHub Actions', 'ArgoCD', 'Monitoring', 'Cost Tuning'] }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & AppSec Specialist',
    role: 'Security Engineer',
    icon: Shield,
    duration: '5 Months',
    level: 'Advanced',
    demand: 'High',
    description: 'Identify application vulnerabilities, perform penetration testing, implement zero-trust protocols, and audit cloud security.',
    milestones: [
      { step: '01', title: 'Network & Web Security', skills: ['OWASP Top 10', 'Cryptographic Specs', 'HTTP Exploits', 'Wireshark'] },
      { step: '02', title: 'Application Security', skills: ['Penetration Testing', 'Static Code Audit', 'OAuth2/JWT', 'Zero Trust'] },
      { step: '03', title: 'Incident Response', skills: ['Threat Modeling', 'SIEM Tools', 'Compliance', 'Hardening'] }
    ]
  },
  {
    id: 'datascience',
    title: 'Data Science & Analytics',
    role: 'Data Scientist / Analyst',
    icon: Terminal,
    duration: '4 Months',
    level: 'Intermediate',
    demand: 'High',
    description: 'Transform raw datasets into actionable insights using statistical modeling, data visualization, and predictive analytics.',
    milestones: [
      { step: '01', title: 'Data Wrangling', skills: ['Pandas & Polars', 'Data Cleaning', 'SQL Queries', 'Exploratory Data'] },
      { step: '02', title: 'Statistical Modeling', skills: ['Scikit-Learn', 'Hypothesis Testing', 'Regression', 'Clustering'] },
      { step: '03', title: 'Data Storytelling', skills: ['Tableau / PowerBI', 'Plotly', 'A/B Testing', 'Reporting'] }
    ]
  }
];

export function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(LEARNING_PATHS[0]);

  return (
    <section id="learning-paths" className="py-24 bg-[#FAFAFA] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Compass className="h-3.5 w-3.5" />
            <span>Structured Career Journeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Learning Paths &amp; Career Roadmaps
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Choose a guided path designed by principal engineers to take you from foundational concepts to production mastery.
          </p>
        </div>

        {/* Layout: Path Selector list & Detailed Interactive Path Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Path Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {LEARNING_PATHS.map((path) => {
              const Icon = path.icon;
              const isSelected = selectedPath.id === path.id;

              return (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-zinc-950 bg-white dark:border-white dark:bg-zinc-900 shadow-lg scale-[1.01]'
                      : 'border-zinc-200/80 bg-white/60 hover:bg-white dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950 dark:text-white">{path.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{path.duration} &bull; {path.level}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    {path.demand}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Interactive Timeline Card */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            
            {/* Ambient Background Watermark Icon */}
            <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none">
              {(() => {
                const SelectedIcon = selectedPath.icon;
                return <SelectedIcon className="h-64 w-64 text-zinc-950 dark:text-white" />;
              })()}
            </div>

            {/* Path Title & Header Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Target Outcome: {selectedPath.role}
                </span>
                <h3 className="text-2xl font-black text-zinc-950 dark:text-white mt-1">
                  {selectedPath.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  ⏱️ {selectedPath.duration}
                </span>
                <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-semibold">
                  {selectedPath.level}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 my-6 leading-relaxed">
              {selectedPath.description}
            </p>

            {/* Milestones Roadmap Timeline */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Roadmap Milestones</h4>
              
              <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                {selectedPath.milestones.map((ms, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-10">
                    
                    {/* Step Number Dot */}
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold shadow-md">
                      {ms.step}
                    </div>

                    <div className="flex-1 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 p-4 border border-zinc-200/50 dark:border-zinc-800/50">
                      <h5 className="text-sm font-bold text-zinc-950 dark:text-white">{ms.title}</h5>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ms.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80"
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Enroll in Path CTA */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-medium">Includes Certificates &amp; Project Audits</span>
              
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 px-6 py-2.5 text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <span>Start This Path</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
