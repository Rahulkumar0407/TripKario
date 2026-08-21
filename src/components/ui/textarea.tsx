import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[85px] w-full rounded-xl border border-[var(--border-subtle)] bg-white dark:bg-[#201D19] px-3.5 py-2.5 text-base sm:text-xs font-medium text-[var(--text-primary)] shadow-xs placeholder:text-[var(--text-muted)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85D3A]/40 focus-visible:border-[#C85D3A] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
