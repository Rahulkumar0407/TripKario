'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark' | 'frost' | 'clear';
  enableRefraction?: boolean;
  enableHoverLift?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export default function GlassSurface({
  children,
  className = '',
  variant = 'default',
  enableRefraction = false,
  enableHoverLift = true,
  rounded = '2xl',
  ...props
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableRefraction || !containerRef.current) return;
    // Touch / Coarse pointer check (bypass on mobile)
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const variantStyles = {
    default: 'glass-surface',
    light: 'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-md',
    dark: 'bg-black/50 backdrop-blur-md border border-white/10 shadow-lg',
    frost: 'bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-card)] shadow-md',
    clear: 'bg-white/5 backdrop-blur-xs border border-white/10 shadow-xs',
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variantStyles[variant],
        roundedClasses[rounded],
        enableHoverLift && 'hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}
      {...props}
    >
      {/* Dynamic Edge Lighting & Refraction Glow (Desktop pointer-fine only) */}
      {enableRefraction && (
        <div
          className="hidden md:block pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.35 : 0.1,
            background: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
