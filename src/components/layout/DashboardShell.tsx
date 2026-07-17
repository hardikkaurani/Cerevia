'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';
import { GamificationOverlay } from '@/components/gamification/GamificationOverlay';
import { useAuth } from '@/providers/AuthProvider';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#083344] via-[#030712] to-black text-white font-sans">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-2 border-r-2 border-cyan-500 animate-spin" />
          <div className="absolute h-10 w-10 rounded-full border-b-2 border-l-2 border-blue-500 animate-spin [animation-direction:reverse]" />
          <div className="absolute h-4 w-4 bg-cyan-400 rounded-full animate-ping" />
        </div>
        <p className="mt-8 text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono animate-pulse">
          Loading Cerevia Space...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
      {/* Sidebar: handles desktop fixed sidebar + mobile drawer state */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main viewport area, offset on desktop by sidebar width */}
      <div
        className={cn(
          'flex flex-col min-h-screen flex-1 transition-all duration-300',
          isCollapsed ? 'md:pl-20' : 'md:pl-64'
        )}
      >
        {/* Sticky top navigation bar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Content container */}
        <main className="flex-1 flex flex-col animate-fade-in">
          {children}
        </main>
        <GamificationOverlay />
      </div>
    </div>
  );
}
