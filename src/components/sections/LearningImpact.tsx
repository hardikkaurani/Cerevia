'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, CheckCircle, Award, Sparkles, TrendingUp } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: any;
  description: string;
  color: string;
}

const STATS: StatItem[] = [
  {
    id: 'students',
    label: 'Active Students',
    value: 20000,
    suffix: '+',
    icon: Users,
    description: 'Engineers & students learning daily on Cerevia',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'courses',
    label: 'Interactive Courses',
    value: 150,
    suffix: '+',
    icon: GraduationCap,
    description: 'Hands-on syllabi spanning AI, Full Stack & Cloud',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'lessons',
    label: 'Lessons Completed',
    value: 1000000,
    suffix: '+',
    icon: CheckCircle,
    description: 'Code submissions evaluated with instant feedback',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'completion',
    label: 'Completion Rate',
    value: 98,
    suffix: '%',
    icon: Award,
    description: 'Industry leading retention & goal achievement',
    color: 'from-purple-600 to-pink-600',
  },
];

export function LearningImpact() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    students: 0,
    courses: 0,
    lessons: 0,
    completion: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counters
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
              students: Math.min(20000, Math.floor(20000 * progress)),
              courses: Math.min(150, Math.floor(150 * progress)),
              lessons: Math.min(1000000, Math.floor(1000000 * progress)),
              completion: Math.min(98, Math.floor(98 * progress)),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section id="impact" ref={sectionRef} className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/10 opacity-50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-1.5 text-xs font-semibold text-amber-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Proven Student Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Learning Impact &amp; Global Reach
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            Empowering students across 120+ countries to master technical engineering and land top software roles.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            const valueDisplay = formatNumber(counts[stat.id] || 0);

            return (
              <div
                key={stat.id}
                className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 text-center backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90"
              >
                {/* Icon Capsule */}
                <div className="mx-auto h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-amber-400" />
                </div>

                {/* Animated Count */}
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                  <span>{valueDisplay}</span>
                  <span className="text-amber-400 font-bold">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-base font-bold text-zinc-200 mb-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Activity Ribbon */}
        <div className="mt-16 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-zinc-200">Real-time Platform Pulse:</span>
            <span>Over 1,420 students actively solving code challenges right now</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span>99.9% Uptime Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
}
