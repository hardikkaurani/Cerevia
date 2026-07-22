'use client';

import Image from 'next/image';
import { Bot, Flame, Code2, LineChart, Trophy, Award, Sparkles, Check } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  illustration: string;
  badge: string;
  highlights: string[];
}

const FEATURES: Feature[] = [
  {
    id: 'ai-mentor',
    title: 'AI Mentor & Code Reviewer',
    subtitle: '24/7 Intelligent Pair Programmer',
    description: 'Get instant feedback on your code syntax, memory optimization, and architectural decisions as you type.',
    icon: Bot,
    illustration: '/images/illustrations/ai-mentor-visual.webp',
    badge: 'AI Powered',
    highlights: ['Instant AST code inspection', 'Automated bug detection', 'Personalized hints'],
  },
  {
    id: 'gamification',
    title: 'Gamified Learning Engine',
    subtitle: 'Daily Streaks & Level XP',
    description: 'Turn study habits into an addictive RPG experience. Earn XP, maintain daily streaks, and unlock achievement badges.',
    icon: Flame,
    illustration: '/images/illustrations/gamified-xp-visual.webp',
    badge: 'High Engagement',
    highlights: ['Daily streak multiplier', 'Skill milestone badges', 'Rank level ups'],
  },
  {
    id: 'hands-on',
    title: 'Hands-on Web Sandboxes',
    subtitle: 'Zero Setup In-Browser IDE',
    description: 'Execute code instantly in isolated sandboxes supporting React, Node.js, Python, Java, and C++ with full terminal output.',
    icon: Code2,
    illustration: '/images/illustrations/hands-on-coding.webp',
    badge: 'Zero Setup',
    highlights: ['Real-time execution', 'Multi-language runtime', 'Unit test integration'],
  },
  {
    id: 'progress',
    title: 'Deep Analytics & Progress',
    subtitle: 'Visual Skill Mastery Matrix',
    description: 'Track your growth across algorithms, backend design, and frontend systems with granular performance charts.',
    icon: LineChart,
    illustration: '/images/illustrations/ai-mentor-visual.webp',
    badge: 'Data Driven',
    highlights: ['Weak spot detection', 'Completion velocity', 'Skill heatmap'],
  },
  {
    id: 'leaderboards',
    title: 'Global Peer Leaderboards',
    subtitle: 'Competitive Weekly Arena',
    description: 'Compete against thousands of global engineering students in timed coding sprints and weekly leaderboard ranks.',
    icon: Trophy,
    illustration: '/images/illustrations/gamified-xp-visual.webp',
    badge: 'Social Learning',
    highlights: ['Global & regional ranks', 'Peer code comparisons', 'Weekly prize pools'],
  },
  {
    id: 'certificates',
    title: 'Verified Certificates',
    subtitle: 'Industry-Recognized Credentials',
    description: 'Earn cryptographic certificates upon course completion that can be embedded on your LinkedIn profile and resume.',
    icon: Award,
    illustration: '/images/illustrations/certificate-badge.webp',
    badge: 'Career Ready',
    highlights: ['LinkedIn integration', 'Verifiable credential URL', 'Recruiter ready'],
  },
];

export function WhyCerevia() {
  return (
    <section id="why-cerevia" className="py-24 bg-[#FAFAFA] dark:bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why Engineers Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            Built for Modern Learning
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Everything you need to transform theoretical knowledge into real-world software engineering expertise.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-[10px] font-bold text-zinc-600 dark:text-zinc-300">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    {feature.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                        <span className="h-4 w-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subdued Bottom WebP Illustration strip */}
                <div className="relative h-14 w-full rounded-xl overflow-hidden mt-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={feature.illustration}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900/90 to-transparent" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
