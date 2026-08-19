'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from './ui/GlassSurface';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('tripkario_theme', 'dark');
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('tripkario_theme', 'light');
      } catch (e) {}
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass-surface flex items-center justify-center opacity-50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Sunlit Light Mode' : 'Switch to Midnight Dark Mode'}
      className="relative p-0.5 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
    >
      <GlassSurface
        variant="frost"
        rounded="full"
        className="w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors shadow-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-[#E46B3B]"
            >
              <Moon className="w-4 h-4 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-[#D45C31]"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </GlassSurface>
    </button>
  );
}
