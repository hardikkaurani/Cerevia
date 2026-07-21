import * as React from 'react';
import { UserPlus, BookOpen, BarChart4 } from 'lucide-react';

interface StepCardProps {
  step: string;
  icon: typeof UserPlus;
  title: string;
  description: string;
}

function StepCard({ step, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg shadow-sm hover:border-primary/40 transition-all duration-200">
      {/* Step badge */}
      <span className="absolute -top-3 left-6 inline-flex items-center justify-center h-6 px-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary select-none font-sans">
        STEP {step}
      </span>
      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
        <Icon className="h-6 w-6 shrink-0" />
      </div>
      <h3 className="text-sm font-semibold tracking-normal text-foreground mb-2 font-sans">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: '1. Create Your Profile',
      description: 'Set up your student account in seconds. Customise dashboard layouts and pick your learning focus area.',
    },
    {
      step: '02',
      icon: BookOpen,
      title: '2. Complete Daily Lessons',
      description: 'Access gamified micro-lessons. Answer multiple-choice quizzes and submit completions to earn streak rewards.',
    },
    {
      step: '03',
      icon: BarChart4,
      title: '3. Track & Compete',
      description: 'Watch your streak multiply, monitor analytics, and secure your place on the cached weekly leaderboard.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-primary">
            Workflow Process
          </span>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-foreground sm:text-4xl">
            Simple steps to start learning
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light tracking-wide">
            A frictionless learning experience designed to motivate students and reduce cognitive load.
          </p>
        </div>

        {/* Steps Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((stepItem) => (
            <StepCard
              key={stepItem.step}
              step={stepItem.step}
              icon={stepItem.icon}
              title={stepItem.title}
              description={stepItem.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
