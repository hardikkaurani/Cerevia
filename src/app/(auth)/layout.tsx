import { type ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Ambient background glow layers */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] bg-blue-600/5 dark:bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] bg-amber-500/5 dark:bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Split-screen container */}
      <div className="w-full max-w-md md:max-w-6xl min-h-[680px] overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-950/80 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row relative z-10 my-auto transition-colors duration-300">
        
        {/* Animated Left Storytelling Panel */}
        <AuthLeftPanel />

        {/* Form Input Right Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 md:p-12 overflow-y-auto bg-white/90 dark:bg-zinc-950/90 relative z-10 transition-colors duration-300">
          
          {/* Mobile Logo Branding */}
          <div className="flex md:hidden flex-col items-center mb-6 select-none">
            <Logo showText={true} />
            <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest mt-1.5">
              Next-Gen AI Education
            </span>
          </div>

          {/* Render Active Auth Route (Login, Register, Forgot Password, Reset Password, Verify Email) */}
          {children}
        </div>

      </div>
    </div>
  );
}
