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
  enableRefraction = true,
  enableHoverLift = true,
  rounded = '2xl',
  ...props
}: GlassSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableRefraction || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const variantStyles = {
    default: 'glass-surface',
    light: 'bg-white/45 backdrop-blur-2xl border border-white/60 shadow-xl',
    dark: 'bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl',
    frost: 'bg-white/10 dark:bg-black/30 backdrop-blur-3xl border border-white/20 shadow-2xl',
    clear: 'bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 shadow-md',
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
        enableHoverLift && 'hover:-translate-y-0.5 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {/* Dynamic Edge Lighting & Refraction Glow */}
      {enableRefraction && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.4 : 0.15,
            background: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
