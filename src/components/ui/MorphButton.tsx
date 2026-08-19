'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MorphButton({
  children = "LET'S GO",
  className = '',
  onClick,
  ...props
}: MorphButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center gap-3 px-8 h-12 rounded-full font-semibold uppercase text-xs tracking-wider text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-xl overflow-hidden cursor-pointer group',
        className
      )}
      {...props}
    >
      {/* Route Animation Track on Hover */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: hovered ? 1 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      <span className="relative z-10">{children}</span>
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative z-10"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </button>
  );
}
