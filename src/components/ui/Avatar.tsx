'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { getAvatarInitial } from '@/utils/avatar';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  /** Name used for initial extraction (first priority). */
  fallback?: string | null;
  /** Email used for initial extraction (second priority). */
  email?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Avatar({
  src,
  alt,
  fallback,
  email,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  // Reset error state when src changes (e.g. user updates avatar URL)
  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-24 w-24 text-3xl md:h-28 md:w-28 md:text-4xl',
  };

  const initial = React.useMemo(
    () => getAvatarInitial(fallback, email),
    [fallback, email],
  );

  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-border bg-secondary select-none font-sans font-medium text-foreground items-center justify-center',
        sizes[size],
        className
      )}
      role="img"
      aria-label={alt || fallback || 'User avatar'}
      {...props}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || 'Avatar'}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  );
}

