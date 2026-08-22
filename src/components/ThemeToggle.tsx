'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'pill' | 'header' | 'sidebar';
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = '',
  variant = 'default',
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const handleToggle = () => {
    // 1. Instant theme state update
    toggleTheme();

    // 2. Brief 140ms visual confirmation glow
    setIsFlashing(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => {
      setIsFlashing(false);
    }, 140);
  };

  const isDark = theme === 'dark';

  if (!mounted) {
    return (
      <div
        className={`w-[38px] h-[38px] rounded-full bg-black/5 dark:bg-white/10 ${className}`}
        aria-hidden="true"
      />
    );
  }

  // ── Pill Variant (Mobile Drawer & Context Bars) ───────────────
  if (variant === 'pill') {
    return (
      <motion.button
        type="button"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        transition={{ duration: 0.14, ease: 'easeOut' }}
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
          bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15
          border border-black/10 dark:border-white/15
          text-xs font-mono font-medium text-[var(--text-primary)]
          transition-colors duration-150 touch-manipulation select-none
          focus-visible:ring-2 focus-visible:ring-[#E46B3B] focus-visible:outline-hidden
          ${isFlashing ? 'shadow-[0_0_0_3px_rgba(200,93,58,0.25)]' : ''}
          ${className}
        `}
      >
        <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon-pill"
                initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#FF8A50] flex items-center justify-center"
              >
                <Moon className="w-3.5 h-3.5 fill-current" />
              </motion.div>
            ) : (
              <motion.div
                key="sun-pill"
                initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#C85D3A] flex items-center justify-center"
              >
                <Sun className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </motion.button>
    );
  }

  // ── Sidebar Variant (Admin Console Sidebar) ───────────────────
  if (variant === 'sidebar') {
    return (
      <motion.button
        type="button"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.14, ease: 'easeOut' }}
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`
          w-full flex items-center justify-between px-4 py-2.5 rounded-xl
          bg-white/5 hover:bg-white/10 border border-white/10
          text-xs font-medium text-white transition-colors duration-150
          cursor-pointer touch-manipulation select-none
          focus-visible:ring-2 focus-visible:ring-[#E46B3B] focus-visible:outline-hidden
          ${isFlashing ? 'shadow-[0_0_0_3px_rgba(200,93,58,0.25)]' : ''}
          ${className}
        `}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon-side"
                  initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#FF8A50] flex items-center justify-center"
                >
                  <Moon className="w-4 h-4 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun-side"
                  initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#D4A467] flex items-center justify-center"
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="font-mono text-[11px] tracking-wider uppercase">
            Theme: {isDark ? 'Dark' : 'Light'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40 uppercase">Toggle</span>
      </motion.button>
    );
  }

  // ── Default Circular Variant (Navbar, Header, Floating) ──────
  return (
    <motion.button
      type="button"
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.14, ease: 'easeOut' }}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative w-[38px] h-[38px] min-w-[38px] min-h-[38px] rounded-full cursor-pointer
        flex items-center justify-center shrink-0
        bg-white/10 dark:bg-white/10 backdrop-blur-md
        border border-white/20 dark:border-white/15
        hover:bg-white/20 dark:hover:bg-white/18
        hover:border-white/35 dark:hover:border-white/30
        transition-colors duration-150
        focus-visible:ring-2 focus-visible:ring-[#E46B3B] focus-visible:outline-hidden
        touch-manipulation select-none
        ${isFlashing ? 'shadow-[0_0_0_3px_rgba(200,93,58,0.3)]' : 'shadow-xs'}
        ${className}
      `}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#FF8A50] flex items-center justify-center"
            >
              <Moon className="w-4 h-4 fill-current drop-shadow-[0_0_4px_rgba(255,138,80,0.4)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: 25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, rotate: -25, opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#D45C31] flex items-center justify-center"
            >
              <Sun className="w-4 h-4 drop-shadow-[0_0_4px_rgba(212,92,49,0.3)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="sr-only">
          {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
      )}
    </motion.button>
  );
}
