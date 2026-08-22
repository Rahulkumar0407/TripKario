'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TripkarioLogo from './TripkarioLogo';

import { useIsMobile } from '@/hooks/use-mobile';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const isMobile = useIsMobile();
  const [isFinished, setIsFinished] = useState(true); // Default to finished to prevent mobile flash

  useEffect(() => {
    // Skip preloader entirely on mobile viewports (<768px) and for returning visits to maximize FCP & LCP
    const hasSeenPreloader = typeof window !== 'undefined' ? sessionStorage.getItem('tripkario_preloader_seen') : null;

    if (isMobile || hasSeenPreloader) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // First-time desktop visit: brief brand greeting (400ms max)
    setIsFinished(false);
    sessionStorage.setItem('tripkario_preloader_seen', '1');

    const timer = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="brand-takeoff-preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] dark:bg-[#0B1110] text-[#141716] dark:text-[#F4EFE5] select-none pointer-events-auto overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-sm">
            {/* Logo Emblem */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mb-4"
            >
              <TripkarioLogo
                variant="animated"
                badgeSize={54}
                showWordmark={false}
              />
            </motion.div>

            {/* Airplane Traveling Along Drawing Route */}
            <div className="relative w-40 h-6 flex items-center justify-center my-1.5">
              <svg viewBox="0 0 200 24" className="w-full h-full overflow-visible">
                <motion.path
                  d="M 10 12 Q 60 4, 100 12 T 190 12"
                  fill="none"
                  stroke="var(--brand-saffron, #E85D30)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </svg>

              <motion.div
                className="absolute text-[var(--brand-saffron, #E85D30)]"
                initial={{ x: -75, y: 0, opacity: 0 }}
                animate={{ x: 75, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transform rotate-90">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </motion.div>
            </div>

            {/* Wordmark Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-col items-center mt-1"
            >
              <h2 className="text-lg font-serif font-bold tracking-[0.2em] uppercase text-[var(--brand-teal)] dark:text-white">
                Tripkario
              </h2>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
