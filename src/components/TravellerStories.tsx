'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import GlassSurface from './ui/GlassSurface';

export default function TravellerStories() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const stories = [
    {
      id: 'story-1',
      traveller: 'Ananya & Rohan',
      trip: 'Kashmir · May 2026',
      shortDestination: 'Kashmir',
      quote: 'Every morning felt like a painted postcard. The chauffeur, Bashir Bhai, knew every quiet tea stall along the Lidder River in Pahalgam. Zero stress.',
      rating: 5,
      reviewSummary: 'Beautifully planned from start to finish with confirmed boutique stays.',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1600&auto=format&fit=crop',
    },
    {
      id: 'story-2',
      traveller: 'Vikramaditya & Family',
      trip: 'Rajasthan · April 2026',
      shortDestination: 'Rajasthan',
      quote: 'Planning a trip for 6 family members usually creates 17 opinions and total chaos. TripKario made the pacing effortless: relaxed breakfasts, private guided fort walks, and wonderful havelis.',
      rating: 5,
      reviewSummary: '6 family members. Zero chaos. Handled every single detail.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1600&auto=format&fit=crop',
    },
    {
      id: 'story-3',
      traveller: 'Pooja Nair',
      trip: 'Meghalaya · June 2026',
      shortDestination: 'Meghalaya',
      quote: 'Down in Cherrapunji, our local guide took us to crystal-clear river pools without another tourist in sight. This is how authentic travel should feel.',
      rating: 5,
      reviewSummary: 'Living root bridges, rainforest trails, and genuine local hosts.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1600&auto=format&fit=crop',
    },
  ];

  const total = stories.length;
  const AUTOPLAY_DURATION = 7500;

  const nextStory = () => {
    setDirection('next');
    setCurrentIdx((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const prevStory = () => {
    setDirection('prev');
    setCurrentIdx((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  const selectStory = (index: number) => {
    if (index === currentIdx) return;
    setDirection(index > currentIdx ? 'next' : 'prev');
    setCurrentIdx(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = 50;
    const step = (interval / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          nextStory();
          return 0;
        }
        return old + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHovered, currentIdx]);

  const current = stories[currentIdx];

  return (
    <section
      id="stories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-20 md:py-28 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Clean, Full-Width Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-12">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold block">
              Real Traveller Stories
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-[var(--text-primary)] tracking-tight leading-[1.08]">
              They went. <br className="hidden sm:inline" />
              They came back smiling.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] pt-1">
              Real moments from travellers who explored India with TripKario.
            </p>
          </div>

          {/* Simple, Human Story Tabs & Clean Arrows */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-xs">
              {stories.map((s, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectStory(idx)}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer overflow-hidden flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                    }`}
                  >
                    <span>{s.shortDestination}</span>
                    {isActive && (
                      <motion.div
                        style={{ width: `${progress}%` }}
                        className="absolute bottom-0 left-0 h-[2px] bg-white/75"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevStory}
                aria-label="Previous story"
                className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={nextStory}
                aria-label="Next story"
                className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Cinematic Photo Story Frame */}
        <div className="relative aspect-[16/11] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] group">
          {/* IMAGE TRANSITION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{
                opacity: 0,
                x: direction === 'next' ? 40 : -40,
                scale: 1.04,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction === 'next' ? -40 : 40,
                scale: 0.97,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.traveller}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
            </motion.div>
          </AnimatePresence>

          {/* DESTINATION LABEL */}
          <motion.div
            key={`tag-${current.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider font-semibold border border-white/10">
              {current.trip}
            </span>
          </motion.div>

          {/* QUOTE & GLASS REVIEW OVERLAY */}
          <motion.div
            key={`overlay-${current.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
            className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
          >
            <GlassSurface
              variant="dark"
              enableRefraction
              rounded="2xl"
              className="p-5 sm:p-7 max-w-2xl text-white shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex items-center text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold">5.0 / 5.0</span>
                <span className="text-xs text-white/70 font-mono">· Verified Guest</span>
              </div>

              <p className="text-sm sm:text-lg font-serif leading-relaxed text-white mb-3">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="text-xs font-mono text-[#F4A261] font-semibold">
                — {current.traveller}
              </div>
            </GlassSurface>

            <div className="hidden lg:block">
              <GlassSurface
                variant="dark"
                rounded="2xl"
                className="p-4 sm:p-5 text-white text-right shrink-0 max-w-xs shadow-xl border border-white/20"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 block mb-1">
                  Trip Highlight
                </span>
                <span className="text-xs sm:text-sm font-semibold">
                  {current.reviewSummary}
                </span>
              </GlassSurface>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
