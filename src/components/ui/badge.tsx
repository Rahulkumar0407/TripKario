import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-medium transition-colors focus:outline-none uppercase tracking-wider',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--brand-teal)] text-white',
        saffron:
          'border-transparent bg-[var(--brand-saffron)] text-white',
        secondary:
          'border-transparent bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
        outline:
          'border-[var(--border-subtle)] text-[var(--text-primary)] bg-transparent',
        success:
          'border-transparent bg-emerald-600 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
