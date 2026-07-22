'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Code2, Bot, Trophy, CheckCircle2, Play, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 bg-[#FAFAFA] dark:bg-[#111111]">
      {/* Background Decorative Grids & Glow Meshes */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e4e4e705_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e705_1px,transparent_1px)] bg-[size:32px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
      
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute left-1/4 top-10 -z-10 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 opacity-70 blur-[130px] pointer-events-none" />
      <div className="absolute right-1/4 top-32 -z-10 h-[400px] w-[500px] rounded-full bg-amber-500/10 opacity-60 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Storytelling Column */}
          <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            
            {/* Platform Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm backdrop-blur-md transition-all hover:scale-105">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-600 dark:text-zinc-400">Next-Gen AI Education</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 fill-amber-400" /> Cerevia v2.0
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Learn Smarter.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Practice Better.
              </span>{' '}
              Build Your Future.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-normal">
              Master coding, AI, cloud computing, and software engineering through interactive learning experiences designed for the next generation.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/register"
                className="group flex h-13 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-zinc-950 px-8 text-sm font-semibold text-white shadow-xl shadow-zinc-950/20 hover:bg-zinc-800 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a
                href="#courses"
                className="flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-zinc-200/90 bg-white/80 px-7 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Play className="h-4 w-4 fill-zinc-800 dark:fill-zinc-200" />
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="flex items-center gap-6 pt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>20,000+ Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>150+ Interactive Courses</span>
              </div>
            </div>

          </div>

          {/* Premium Hero Visual & Interactive Code Sandbox Preview Column */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Main Interactive Floating Mockup Card */}
            <div className="relative w-full max-w-xl rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/90 dark:bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:shadow-blue-500/10">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 px-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/90" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/90" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">Cerevia Code Environment &mdash; main.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                  <Zap className="h-3 w-3" /> Live Sandbox
                </div>
              </div>

              {/* Code Playground Simulation */}
              <div className="p-4 bg-zinc-950 text-zinc-100 rounded-2xl font-mono text-xs leading-relaxed space-y-2 mt-3 shadow-inner overflow-hidden">
                <div className="text-zinc-500">// Welcome to Cerevia AI-Powered Workspace</div>
                <div className="text-blue-400">
                  <span className="text-purple-400">async function</span> <span className="text-amber-300">masterSoftwareEngineering</span>() &#123;
                </div>
                <div className="pl-4 text-zinc-300">
                  <span className="text-purple-400">const</span> student = <span className="text-purple-400">await</span> Cerevia.connect(&#123;
                </div>
                <div className="pl-8 text-emerald-400">
                  level: <span className="text-amber-300">&quot;Advanced Full-Stack &amp; AI&quot;</span>,
                </div>
                <div className="pl-8 text-emerald-400">
                  aiMentor: <span className="text-blue-300">true</span>,
                </div>
                <div className="pl-8 text-emerald-400">
                  interactivePractice: <span className="text-blue-300">true</span>
                </div>
                <div className="pl-4 text-zinc-300">&#125;);</div>
                <div className="pl-4 text-amber-300">return student.accelerateCareer();</div>
                <div className="text-blue-400">&#125;</div>
              </div>

              {/* AI Feedback Card Float */}
              <div className="mt-3 rounded-xl border border-blue-500/20 bg-blue-50/80 dark:bg-blue-950/40 p-3 flex items-start gap-3 backdrop-blur-md">
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <span>AI Mentor Instant Review</span>
                    <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">100% Score</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 mt-0.5 font-sans">
                    Optimal algorithm space complexity detected (O(1)). +150 XP awarded!
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 - AI Mentor */}
              <div className="absolute -top-5 -right-5 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 shadow-xl animate-float">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-zinc-900 dark:text-white">Daily Streak #12</div>
                  <div className="text-zinc-500 text-[10px]">Top 1% Global Peer</div>
                </div>
              </div>

              {/* Floating Badge 2 - Live Code Execution */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 shadow-xl animate-float-delayed">
                <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Code2 className="h-5 w-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-zinc-900 dark:text-white">Interactive Sandbox</div>
                  <div className="text-zinc-500 text-[10px]">Real-Time Code Feedback</div>
                </div>
              </div>

              {/* WebP Hero Preview Image background element */}
              <div className="mt-3 relative h-16 w-full rounded-xl overflow-hidden opacity-90">
                <Image 
                  src="/images/hero/hero-dashboard.webp" 
                  alt="Cerevia Platform Preview" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
