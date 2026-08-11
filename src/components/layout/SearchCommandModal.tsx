'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Search, Monitor, BookOpen, Trophy, Settings, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchItem {
  name: string;
  category: 'Navigation' | 'Quick Actions';
  icon: React.ElementType;
  path: string;
}

/**
 * SearchCommandModal
 * Command palette search dialog popup.
 * Provides real-time filtering across dashboard navigation links,
 * keyboard navigation (Up/Down/Enter/Escape), and active item tracking.
 */
export function SearchCommandModal({ isOpen, onClose }: SearchCommandModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const searchItems: SearchItem[] = React.useMemo(
    () => [
      { name: 'Dashboard Overview', category: 'Navigation', icon: Monitor, path: '/dashboard' },
      { name: 'Browse Lessons', category: 'Navigation', icon: BookOpen, path: '/lessons' },
      { name: 'Global Leaderboard', category: 'Navigation', icon: Trophy, path: '/leaderboard' },
      { name: 'User Profile', category: 'Quick Actions', icon: User, path: '/profile' },
      { name: 'Account Settings', category: 'Quick Actions', icon: Settings, path: '/settings' },
    ],
    []
  );

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return searchItems;
    return searchItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchItems]);

  // Handle keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      } else if (e.key === 'Enter' && filteredItems.length > 0) {
        e.preventDefault();
        const selected = filteredItems[activeIndex];
        if (selected) {
          router.push(selected.path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, router, onClose]);

  // Reset active selection index when search query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Backdrop overlay listener */}
      <div className="fixed inset-0 z-[100]" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Box */}
      <div className="relative z-[101] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Search className="mr-3 h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex h-9 w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-900 dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="mr-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="inline-flex h-6 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 px-2 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400"
          >
            ESC
          </button>
        </div>

        {/* Results List Area */}
        <div className="max-h-[320px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center">
              <Search className="mx-auto h-7 w-7 text-zinc-400 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-medium text-zinc-900 dark:text-white">No results found</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                No matching pages found for &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = activeIndex === index;

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      router.push(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm w-full text-left transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IconComponent className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 shrink-0">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
