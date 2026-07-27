import Link from 'next/link';

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
      <div className={`flex items-center justify-center shrink-0 ${dimensions[size]}`}>
        {/* Eye-catching, Glowing Neural-Infused 'C' Brand Mark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          className="h-full w-full filter drop-shadow-[0_2px_8px_rgba(124,58,237,0.35)]"
        >
          <defs>
            {/* Ultra-Vibrant Multi-Stop Gradient */}
            <linearGradient id="cereviaVibrantGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF007F" />   {/* Hot Pink */}
              <stop offset="35%" stopColor="#7C3AED" />  {/* Neon Purple */}
              <stop offset="70%" stopColor="#2563EB" />  {/* Electric Blue */}
              <stop offset="100%" stopColor="#00F2FE" /> {/* Neon Cyan */}
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Glowing Hexagon Shield representing Tech/Security */}
          <polygon
            points="50,11 85,31 85,71 50,91 15,71 15,31"
            stroke="url(#cereviaVibrantGlow)"
            strokeWidth="8"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Hexagonal Framework representing StackForge abstraction */}
          <polygon
            points="50,24 74,38 74,64 50,78 26,64 26,38"
            stroke="url(#cereviaVibrantGlow)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.65"
          />

          {/* Neural Network Pathways from Vertices to Center */}
          <line x1="50" y1="11" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />
          <line x1="85" y1="31" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />
          <line x1="85" y1="71" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />
          <line x1="50" y1="91" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />
          <line x1="15" y1="71" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />
          <line x1="15" y1="31" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" className="stroke-white dark:stroke-zinc-300" />

          {/* AI Central Neural Core starburst */}
          <circle cx="50" cy="50" r="7.5" fill="url(#cereviaVibrantGlow)" filter="url(#neonBloom)" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />

          {/* Glowing node vertices */}
          <circle cx="50" cy="11" r="3.5" fill="#FF007F" filter="url(#neonBloom)" />
          <circle cx="85" cy="31" r="3.5" fill="#7C3AED" filter="url(#neonBloom)" />
          <circle cx="85" cy="71" r="3.5" fill="#2563EB" filter="url(#neonBloom)" />
          <circle cx="50" cy="91" r="3.5" fill="#00F2FE" filter="url(#neonBloom)" />
          <circle cx="15" cy="71" r="3.5" fill="#7C3AED" filter="url(#neonBloom)" />
          <circle cx="15" cy="31" r="3.5" fill="#FF007F" filter="url(#neonBloom)" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-sans text-[18px] font-black tracking-[0.16em] bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent uppercase leading-none">
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
