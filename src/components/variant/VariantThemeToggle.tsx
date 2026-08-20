'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';

export default function VariantThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group relative flex items-center justify-between w-16 h-8 p-1 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-[0_4px_16px_rgba(23,21,18,0.06)] hover:border-[#C95D39]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C95D39] ${className}`}
    >
      {/* Visual background track icons */}
      <span className="flex items-center justify-center w-6 h-6 text-[#C85D3A] opacity-70 group-hover:opacity-100 transition-opacity">
        <Sun className="w-3.5 h-3.5" />
      </span>
      <span className="flex items-center justify-center w-6 h-6 text-[#D4A467] opacity-70 group-hover:opacity-100 transition-opacity">
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Floating physical glass pill thumb */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-[#151310] shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/80 dark:border-white/20"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 32,
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-[#D4A467]" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#C85D3A]" />
        )}
      </motion.div>
    </button>
  );
}
