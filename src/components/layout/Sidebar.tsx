'use client';

import { useEffect } from 'react';
import {
  LayoutDashboard,
  Trophy,
  BookOpen,
  User,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Bot,
  Calendar,
  Award,
  CheckSquare,
  Compass,
} from 'lucide-react';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/lessons', icon: BookOpen, label: 'Syllabus & Practice' },
  { href: '/leaderboard', icon: Trophy, label: 'Global Leaderboard' },
  { href: '/xp', icon: Sparkles, label: 'XP & Level Progress' },
  { href: '/profile', icon: User, label: 'Student Profile' },
];

const workspaceItems = [
  { href: '/dashboard#ai-mentor', icon: Bot, label: 'AI Copilot' },
  { href: '/dashboard#assignments', icon: CheckSquare, label: 'Assignments' },
  { href: '/dashboard#calendar', icon: Calendar, label: 'Academic Calendar' },
  { href: '/profile#certificates', icon: Award, label: 'Certificates' },
];

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-zinc-950 border-r border-zinc-800/80 z-40 transition-all duration-300 ease-in-out select-none',
          isCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        {/* Header Branding */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-zinc-800/80 relative',
            isCollapsed ? 'justify-center' : 'justify-between px-6'
          )}
        >
          <Logo showText={!isCollapsed} size="sm" />

          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all cursor-pointer shadow-sm',
              isCollapsed ? 'right-2' : '-right-3'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none" aria-label="Main Navigation">
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
                Main Core
              </p>
            )}
            {navigationItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>

          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
                Workspace
              </p>
            )}
            {workspaceItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </nav>

        {/* Bottom Section: Settings, Logout, User Card */}
        <div className="border-t border-zinc-800/80 bg-zinc-950 p-3 space-y-1">
          <SidebarItem
            href="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
            className="text-zinc-400 hover:text-white"
          />

          <button
            type="button"
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 rounded-xl p-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer',
              isCollapsed ? 'justify-center' : 'px-3 py-2.5'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Logout</span>}
          </button>

          {/* User Account Info */}
          <div
            className={cn(
              'flex items-center gap-3 border-t border-zinc-800/80 pt-3 mt-2',
              isCollapsed ? 'justify-center' : 'px-2 py-1'
            )}
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full object-cover border border-zinc-800 shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 select-none">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-bold text-white leading-snug">
                  {user?.fullName || 'Student Account'}
                </span>
                <span className="truncate text-[10px] text-zinc-400">{user?.email || 'student@cerevia.edu'}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-zinc-800 z-50 flex flex-col transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Drawer Navigation"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-800">
          <Logo />
          <button
            type="button"
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus-visible:outline-none"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6" aria-label="Mobile Navigation">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
              Main Core
            </p>
            {navigationItems.map((item) => (
              <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} onClick={onClose} />
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono mb-2">
              Workspace
            </p>
            {workspaceItems.map((item) => (
              <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} onClick={onClose} />
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950 space-y-2">
          <SidebarItem
            href="/settings"
            icon={Settings}
            label="Settings"
            onClick={onClose}
          />
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
