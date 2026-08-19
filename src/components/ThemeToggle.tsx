'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  if (!mounted) {
    return <div className="w-[38px] h-[38px] rounded-full bg-white/10" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        w-[38px] h-[38px] rounded-full cursor-pointer
        flex items-center justify-center
        bg-white/10 backdrop-blur-md border border-white/15
        hover:bg-white/18 hover:border-white/25
        transition-all duration-200
        shadow-sm
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="text-[#E46B3B]"
          >
            <Moon className="w-[15px] h-[15px] fill-current" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="text-[#D45C31]"
          >
            <Sun className="w-[15px] h-[15px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
