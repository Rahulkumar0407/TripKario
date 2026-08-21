'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [wipeTheme, setWipeTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Explicitly check saved theme. Default to light mode for all new visitors.
    const savedTheme = (localStorage.getItem('tripkario_theme') || localStorage.getItem('tripkario-theme')) as Theme | null;
    if (savedTheme === 'dark') {
      setThemeState('dark');
      document.documentElement.classList.add('dark');
    } else {
      setThemeState('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const executeThemeChange = useCallback((nextTheme: Theme) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setWipeTheme(nextTheme);

    // After wipe reaches mid-point (280ms), switch the root class cleanly
    const switchTimer = setTimeout(() => {
      setThemeState(nextTheme);
      try {
        localStorage.setItem('tripkario_theme', nextTheme);
      } catch {}
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, 280);

    // Complete the wipe after 580ms
    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
      setWipeTheme(null);
    }, 580);

    return () => {
      clearTimeout(switchTimer);
      clearTimeout(endTimer);
    };
  }, [isTransitioning]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    executeThemeChange(next);
  }, [theme, executeThemeChange]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme !== theme) {
      executeThemeChange(newTheme);
    }
  }, [theme, executeThemeChange]);

  return (
    <ThemeContext.Provider value={{ theme, isTransitioning, toggleTheme, setTheme }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>

      {/* Global Top → Bottom Synchronized Lighting Wipe Overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none transition-all duration-[580ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: wipeTheme === 'dark' ? '#0D0C0A' : '#F4EFE7',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            animation: 'themeWipeDown 580ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      )}
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
