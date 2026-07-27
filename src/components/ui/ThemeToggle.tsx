'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { Switch } from './Switch';

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Handle hydration match
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 h-9 px-2 shrink-0 select-none opacity-0" aria-hidden="true" />
    );
  }

  // Resolve system theme dynamically
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center gap-2 px-1 py-1 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 transition-all select-none h-9 shrink-0">
      <Sun className={`h-3.5 w-3.5 transition-colors duration-300 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-zinc-400 dark:text-zinc-500'}`} />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle theme"
        className="scale-90"
      />
      <Moon className={`h-3.5 w-3.5 transition-colors duration-300 ${isDark ? 'text-indigo-400 fill-indigo-400/20' : 'text-zinc-400 dark:text-zinc-500'}`} />
    </div>
  );
}
