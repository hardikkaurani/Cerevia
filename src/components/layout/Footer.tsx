'use client';

import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    platform: [
      { label: 'Home', href: '#home' },
      { label: 'Courses', href: '#courses' },
      { label: 'Learning Paths', href: '#learning-paths' },
      { label: 'Leaderboard', href: '#leaderboard' },
      { label: 'Why Cerevia', href: '#why-cerevia' },
    ],
    courses: [
      { label: 'Python for AI', href: '#courses' },
      { label: 'Java Enterprise', href: '#courses' },
      { label: 'React 19 & Next.js', href: '#courses' },
      { label: 'Node.js Microservices', href: '#courses' },
      { label: 'Cloud & Kubernetes', href: '#courses' },
      { label: 'System Design', href: '#courses' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community Forum', href: '#contact' },
      { label: 'Student Perks', href: '#impact' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security Audit', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Logo />
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Learn Smarter. Practice Better. Build Your Future.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Cerevia is an AI-powered education platform designed to empower engineers with hands-on coding sandboxes, interactive paths, and gamified streak systems.
            </p>

            {/* Platform Status Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Platform Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Platform</h4>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {navigation.platform.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-blue-600 dark:hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Courses</h4>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {navigation.courses.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-blue-600 dark:hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Resources</h4>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {navigation.resources.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-blue-600 dark:hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">Company</h4>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {navigation.company.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-blue-600 dark:hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Social & Copyright Ribbon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {currentYear} Cerevia Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium">
              Twitter / X
            </a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium">
              LinkedIn
            </a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium">
              Discord
            </a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors font-medium">
              YouTube
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export { Footer as PublicFooter };
