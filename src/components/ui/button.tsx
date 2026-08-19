import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-40 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-xs',
        saffron:
          'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-xs',
        outline:
          'border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] hover:border-[var(--text-muted)]',
        secondary:
          'bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]/80',
        ghost:
          'hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)]',
        teal:
          'bg-[var(--teal-secondary)] text-white hover:bg-[var(--teal-secondary)]/90',
        link:
          'text-[var(--accent)] underline-offset-4 hover:underline lowercase tracking-normal font-medium',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-8 px-4 text-[11px]',
        lg: 'h-12 px-8 text-xs tracking-widest',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
