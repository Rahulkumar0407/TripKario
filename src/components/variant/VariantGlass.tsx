'use client';

import React, { useRef, useState, useCallback } from 'react';

interface VariantGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'deep' | 'pill' | 'hero' | 'nav' | 'control' | 'photo' | 'content';
  interactive?: boolean;
  borderTint?: 'default' | 'terracotta' | 'green' | 'gold';
}

export default function VariantGlass({
  children,
  className = '',
  intensity = 'medium',
  interactive = true,
  borderTint = 'default',
  ...rest
}: VariantGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, [interactive]);

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'subtle':
        return 'backdrop-blur-md bg-white/35 dark:bg-white/[0.04] shadow-[0_12px_40px_rgba(23,21,18,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.3)]';
      case 'deep':
        return 'backdrop-blur-2xl bg-white/65 dark:bg-[#151310]/85 shadow-[0_24px_60px_rgba(23,21,18,0.08)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.5)]';
      case 'pill':
        return 'backdrop-blur-xl bg-white/50 dark:bg-white/[0.08] shadow-[0_10px_30px_rgba(23,21,18,0.05)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.35)]';
      case 'hero':
        return 'backdrop-blur-2xl bg-white/70 dark:bg-[#171512]/80 shadow-[0_24px_70px_rgba(23,21,18,0.09)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]';
      case 'nav':
        return 'backdrop-blur-2xl bg-white/60 dark:bg-[#151310]/80 shadow-[0_16px_40px_rgba(23,21,18,0.07)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]';
      case 'control':
        return 'backdrop-blur-xl bg-white/75 dark:bg-white/12 shadow-[0_8px_24px_rgba(23,21,18,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]';
      case 'photo':
        return 'backdrop-blur-xl bg-black/45 dark:bg-black/60 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] border-white/25';
      case 'content':
        return 'backdrop-blur-xl bg-white/55 dark:bg-[#1C1916]/80 shadow-[0_20px_50px_rgba(23,21,18,0.07)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]';
      case 'medium':
      default:
        return 'backdrop-blur-xl bg-white/48 dark:bg-white/[0.07] shadow-[0_20px_50px_rgba(23,21,18,0.06)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)]';
    }
  };

  const getBorderClasses = () => {
    switch (borderTint) {
      case 'terracotta':
        return 'border border-[#C85D3A]/35 dark:border-[#E16A43]/35';
      case 'green':
        return 'border border-[#174E48]/35 dark:border-[#1E5A53]/35';
      case 'gold':
        return 'border border-[#D4A467]/40 dark:border-[#D4A467]/30';
      case 'default':
      default:
        return 'border border-white/80 dark:border-white/12';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-all duration-300 ${getIntensityClasses()} ${getBorderClasses()} ${className}`}
      {...rest}
    >
      {/* Specular physical light sheen following pointer */}
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />
      )}

      {/* Crisp top edge refraction highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
