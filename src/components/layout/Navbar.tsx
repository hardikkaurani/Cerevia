'use client';

import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';
import { Logo } from './Logo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Generate page title based on path for mobile view
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/lessons':
        return 'Lessons';
      case '/leaderboard':
        return 'Leaderboard';
      case '/xp':
        return 'XP Tracker';
      case '/profile':
        return 'Profile';
      case '/settings':
        return 'Settings';
      default:
        return 'Cerevia';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 md:px-6 shadow-sm">
      {/* Left side: Hamburger menu & logo on mobile, breadcrumb on desktop */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Mobile Title View */}
      <h1 className="text-sm font-semibold text-foreground md:hidden absolute left-1/2 -translate-x-1/2">
        {getPageTitle(pathname)}
      </h1>

      {/* Right side: Notifications / Profile placeholder */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-background" />
        </button>
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="Avatar"
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground border border-border select-none">
            {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
