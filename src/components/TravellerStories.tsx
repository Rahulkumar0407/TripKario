'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { journalPhotos } from '@/data/gallery';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';

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
      quote: 'Every morning felt like a painted postcard. The chauffeur, Bashir Bhai, knew every quiet tea stall along the Lidder River in Pahalgam. Zero stress.',
      rating: 5,
      reviewSummary: 'Beautifully planned from start to finish with confirmed boutique stays.',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=85&w=1600&auto=format&fit=crop',
    },
    {
      id: 'story-2',
      traveller: 'Vikramaditya & Family',
      trip: 'Rajasthan · April 2026',
      quote: 'Planning a trip for 6 family members usually creates 17 opinions and total chaos. TripKario made the pacing effortless: relaxed breakfasts, private guided fort walks, and wonderful havelis.',
      rating: 5,
      reviewSummary: '12 people. 17 opinions. TripKario handled every single detail.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1600&auto=format&fit=crop',
    },
    {
      id: 'story-3',
      traveller: 'Pooja Nair',
      trip: 'Meghalaya · June 2026',
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
      className="py-24 md:py-36 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Scene Header */}
        <div className="max-w-3xl mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
              Traveller Journal
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
              They went. <br />
              They came back smiling.
            </h2>
          </div>

          {/* Minimal Story Progress (01 ————— 03) */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-xs font-mono tracking-widest text-[var(--text-muted)] font-semibold">
                0{currentIdx + 1} ————— 0{total}
              </span>
              <div className="w-24 h-[1.5px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-[var(--accent)] transition-all ease-linear"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MagneticButton
                onClick={prevStory}
                className="w-11 h-11 rounded-full glass-surface flex items-center justify-center text-[var(--text-primary)]"
                aria-label="Previous story"
              >
                <ArrowLeft className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={nextStory}
                className="w-11 h-11 rounded-full glass-surface flex items-center justify-center text-[var(--text-primary)]"
                aria-label="Next story"
              >
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Large Cinematic Photo Story Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] group">
          {/* STEP 1: IMAGE TRANSITION */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{
                opacity: 0,
                x: direction === 'next' ? 50 : -50,
                scale: 1.05,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction === 'next' ? -50 : 50,
                scale: 0.96,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.traveller}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* STEP 2: DESTINATION LABEL (Appears fast) */}
          <motion.div
            key={`tag-${current.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="absolute top-6 left-6 z-20"
          >
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono uppercase tracking-widest font-bold">
              {current.trip}
            </span>
          </motion.div>

          {/* STEP 3 & 4: QUOTE & GLASS REVIEW OVERLAY (Settles smoothly) */}
          <motion.div
            key={`overlay-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            className="absolute bottom-6 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <GlassSurface
              variant="dark"
              enableRefraction
              rounded="2xl"
              className="p-6 md:p-8 max-w-2xl text-white shadow-2xl border border-white/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold">4.9 / 5.0</span>
                <span className="text-xs text-white/70 font-mono">· Verified Guest</span>
              </div>

              <p className="text-base sm:text-xl font-serif leading-relaxed text-white mb-4">
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
                className="p-5 text-white text-right shrink-0 max-w-xs shadow-xl border border-white/20"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block mb-1">
                  Guest Experience
                </span>
                <span className="text-sm font-semibold">
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
