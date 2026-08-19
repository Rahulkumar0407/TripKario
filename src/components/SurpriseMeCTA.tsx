'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SurpriseMeCTAProps {
  onSelectDestination: (destName: string) => void;
}

export default function SurpriseMeCTA({ onSelectDestination }: SurpriseMeCTAProps) {
  const [isCycling, setIsCycling] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const surpriseList = [
    {
      name: 'MEGHALAYA',
      tagline: 'Misty roads. Living root bridges. Very little traffic.',
      route: 'Guwahati → Shillong → Cherrapunji',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1200&auto=format&fit=crop',
    },
    {
      name: 'KASHMIR',
      tagline: 'Cedar houseboats, pine ridge walks, and zero work emails.',
      route: 'Srinagar → Gulmarg → Pahalgam',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=85&w=1200&auto=format&fit=crop',
    },
    {
      name: 'RAJASTHAN',
      tagline: 'Sunset dunes, candlelit haveli courtyards, and golden citadels.',
      route: 'Jaipur → Jodhpur → Udaipur',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1200&auto=format&fit=crop',
    },
    {
      name: 'KERALA',
      tagline: 'Canal cruises, aromatic Munnar tea slopes, and quiet backwaters.',
      route: 'Kochi → Munnar → Alleppey',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1200&auto=format&fit=crop',
    },
  ];

  const handleSurprise = () => {
    setIsCycling(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedIdx(Math.floor(Math.random() * surpriseList.length));
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsCycling(false);
      }
    }, 120);
  };

  const currentPick = selectedIdx !== null ? surpriseList[selectedIdx] : null;

  return (
    <section className="py-16 md:py-20 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="bg-[var(--bg-surface)] rounded-2xl p-8 sm:p-12 border border-[var(--border-card)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-lg space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block">
              Can&apos;t decide?
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-[var(--text-primary)]">
              Surprise me.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-normal">
              We&apos;ll pick a destination. You pretend it was your idea.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <Button
              variant="default"
              size="lg"
              onClick={handleSurprise}
              disabled={isCycling}
              className="gap-2.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isCycling ? 'Picking for you...' : 'Surprise me →'}</span>
            </Button>
          </div>
        </div>

        {/* Revealed Result */}
        <AnimatePresence>
          {currentPick && !isCycling && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[var(--accent)] font-semibold tracking-wider block">
                  TripKario Picked:
                </span>
                <h4 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
                  {currentPick.name}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  &ldquo;{currentPick.tagline}&rdquo;
                </p>
                <div className="text-xs font-mono text-[var(--text-subtle)] pt-1">
                  Route: {currentPick.route}
                </div>
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={() => onSelectDestination(currentPick.name)}
                className="shrink-0 gap-2"
              >
                <span>Explore {currentPick.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
