'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Explicitly check saved theme. Default to light mode for new visitors.
    const savedTheme = (localStorage.getItem('tripkario_theme') || localStorage.getItem('tripkario-theme')) as Theme | null;
    if (savedTheme === 'dark') {
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    } else {
      setThemeState('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const applyTheme = useCallback((nextTheme: Theme) => {
    // 1. Synchronously update DOM class IMMEDIATELY (0ms latency)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Update React state immediately
    setThemeState(nextTheme);

    // 3. Persist to storage
    try {
      localStorage.setItem('tripkario_theme', nextTheme);
      localStorage.setItem('tripkario-theme', nextTheme);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      // Immediate synchronous DOM update
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try {
        localStorage.setItem('tripkario_theme', next);
        localStorage.setItem('tripkario-theme', next);
      } catch {}
      return next;
    });
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
