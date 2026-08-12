'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { cn, getCleanDisplayName } from '@/lib/utils';

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const displayName = getCleanDisplayName(user);
  const displayEmail = user?.email || 'student@cerevia.edu';
  const initial = (displayName[0] || 'S').toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full p-0.5 text-left transition-all hover:ring-2 hover:ring-blue-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={displayName}
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 rounded-full border border-zinc-200 object-cover shrink-0 dark:border-zinc-800"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/20 text-xs font-bold text-blue-500 dark:text-blue-400 select-none">
            {initial}
          </div>
        )}
        <ChevronDown className={cn("h-3 w-3 text-zinc-400 transition-transform duration-200 hidden sm:block", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-900 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
          {/* User Info Header */}
          <div className="flex items-center gap-3 border-b border-zinc-100 px-3 py-3 dark:border-zinc-800">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={displayName}
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 rounded-full border border-zinc-200 object-cover shrink-0 dark:border-zinc-800"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/20 text-xs font-bold text-blue-500 dark:text-blue-400 select-none">
                {initial}
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-bold text-zinc-950 dark:text-white">
                {displayName}
              </span>
              <span className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                {displayEmail}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              <UserIcon className="h-4 w-4 text-zinc-400" />
              <span>Student Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
            >
              <Settings className="h-4 w-4 text-zinc-400" />
              <span>Account Settings</span>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="border-t border-zinc-100 pt-1 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
