import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Flame, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-28 border-b border-border/10">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-primary/5 opacity-30 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-8">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-sans font-medium text-primary select-none animate-fade-in">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bespoke Syllabus Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-wide text-foreground max-w-2xl leading-[1.15]">
              Keep learning momentum alive with{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic font-normal">
                Cerevia
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light tracking-wide">
              Cerevia is a state-of-the-art interactive gamification platform for engineers. Master backend architecture, track daily learning streaks, and climb the weekly leaderboards in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
              <Link
                href="/dashboard"
                className="group flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features"
                className="flex h-11 w-full sm:w-auto items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Interactive Illustration Column */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-square rounded-lg border border-border bg-card p-6 shadow-xl overflow-hidden group transition-all duration-200">
              <div className="flex flex-col gap-5 h-full justify-between relative z-10">
                {/* Simulated Leaderboard Widget */}
                <div className="rounded-lg border border-border bg-card/75 p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-2 tracking-normal font-sans">
                      <Trophy className="h-4 w-4 text-primary" />
                      Weekly Leaderboard
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">1h cache</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1.5 border-b border-border text-xs">
                      <span className="text-foreground">1. Avadhut P.</span>
                      <span className="font-semibold text-primary">2,450 XP</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-border text-xs opacity-90">
                      <span className="text-foreground">2. Areesh A.</span>
                      <span className="text-muted-foreground">2,120 XP</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 text-xs opacity-80">
                      <span className="text-foreground">3. Hardik K.</span>
                      <span className="text-muted-foreground">1,890 XP</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Streak Widget */}
                <div className="rounded-lg border border-border bg-card/75 p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Flame className="h-5 w-5 text-primary fill-primary/10" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">7 Days Streak!</span>
                      <span className="text-[10px] text-muted-foreground">Next target in 14 hours</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full select-none">
                    +100 XP
                  </span>
                </div>

                {/* Graph Shimmer */}
                <div className="rounded-lg border border-border bg-card/75 p-4 space-y-2 shadow-sm">
                  <div className="h-2.5 w-24 bg-secondary rounded-full" />
                  <div className="h-16 flex items-end gap-2 pt-2">
                    <div className="flex-1 bg-primary/20 hover:bg-primary transition-colors h-8 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-primary/20 hover:bg-primary transition-colors h-12 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-primary/20 hover:bg-primary transition-colors h-6 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-primary/20 hover:bg-primary transition-colors h-14 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-primary/20 hover:bg-primary transition-colors h-10 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-primary hover:bg-primary h-16 rounded-sm cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
