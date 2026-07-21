import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
<<<<<<< HEAD
        'rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200',
=======
        'rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-300 overflow-hidden',
>>>>>>> origin/main
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
<<<<<<< HEAD
      className={cn('flex flex-col space-y-1.5 p-6 border-b border-border', className)}
=======
      className={cn('flex flex-col space-y-1.5 p-6 border-b border-border/20', className)}
>>>>>>> origin/main
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
<<<<<<< HEAD
      className={cn('font-sans font-semibold text-lg tracking-tight text-foreground', className)}
=======
      className={cn('font-sans font-semibold text-base md:text-lg tracking-tight text-foreground', className)}
>>>>>>> origin/main
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
<<<<<<< HEAD
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
=======
      className={cn('text-xs md:text-sm text-muted-foreground leading-relaxed', className)}
>>>>>>> origin/main
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
<<<<<<< HEAD
      className={cn('flex items-center p-6 border-t border-border', className)}
=======
      className={cn('flex items-center p-6 border-t border-border/20', className)}
>>>>>>> origin/main
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

