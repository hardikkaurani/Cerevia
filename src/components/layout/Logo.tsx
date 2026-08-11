import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 rounded-xl px-1.5 py-1.5 transition-all duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 ${className}`}
      aria-label="Cerevia Home"
    >
      <div className={`relative overflow-hidden rounded-lg shrink-0 border border-zinc-200/10 dark:border-zinc-800/50 shadow-sm ${dimensions[size]}`}>
        <Image
          src="/branding/cerevia-logo-square.jpg"
          alt="Cerevia Logo"
          fill
          sizes="(max-width: 768px) 32px, 44px"
          priority
          className="object-cover"
        />
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-sans text-[18px] font-black tracking-[0.16em] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent uppercase leading-none">
            Cerevia
          </span>
          <span className="font-sans text-[6.5px] font-extrabold tracking-[0.24em] text-zinc-500 dark:text-zinc-400 uppercase mt-1.5 leading-none">
            Learn. Level Up. Lead.
          </span>
        </div>
      )}
    </Link>
  );
}

