'use client';

import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { Logo } from './Logo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchCommandModal } from './SearchCommandModal';
import * as React from 'react';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

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
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Button (Hidden on very small screens or shown as icon) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="sm:hidden relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <NotificationsMenu />
        
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="Avatar"
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 rounded-full object-cover border border-border shrink-0 ml-1 sm:ml-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground border border-border select-none shrink-0 ml-1 sm:ml-0">
            {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
          </div>
        )}
      </div>

      <SearchCommandModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}
