'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Eye, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';
import { tripPackages } from '@/data/trips';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import TripDetailModal from './TripDetailModal';

interface TripCarouselProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function TripCarousel({ onOpenPlanTrip }: TripCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quickViewTrip, setQuickViewTrip] = useState<TripPackage | null>(null);
  const [activeModalTrip, setActiveModalTrip] = useState<TripPackage | null>(null);

  const total = tripPackages.length;
  const AUTOPLAY_DURATION = 6000;

  const nextSlide = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  useEffect(() => {
    if (isHovered || quickViewTrip || activeModalTrip) return;

    const interval = 50;
    const step = (interval / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          nextSlide();
          return 0;
        }
        return old + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHovered, activeIndex, quickViewTrip, activeModalTrip]);

  return (
    <section
      id="packages"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Curated Journeys
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
            Trips people actually book.
          </h2>
        </div>

        {/* Carousel Controls & Progress */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-mono tracking-widest text-[var(--text-muted)] font-semibold">
              {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} /{' '}
              {total < 10 ? `0${total}` : total}
            </span>
            <div className="w-20 h-[1.5px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-[var(--accent)] transition-all ease-linear"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton
              onClick={prevSlide}
              aria-label="Previous trip"
              className="w-11 h-11 rounded-full glass-surface flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={nextSlide}
              aria-label="Next trip"
              className="w-11 h-11 rounded-full glass-surface flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] shadow-lg"
            >
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Layered Package Carousel with Directional Physics */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 min-h-[480px] sm:min-h-[560px] flex items-center justify-center">
        {tripPackages.map((trip, idx) => {
          let position = idx - activeIndex;
          if (position < -2) position += total;
          if (position > 2) position -= total;

          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          if (!isVisible) return null;

          return (
            <motion.div
              key={trip.id}
              initial={false}
              animate={{
                x: `${position * 72}%`,
                scale: isCenter ? 1 : 0.90,
                rotateZ: position * 2,
                opacity: isCenter ? 1 : 0.65,
                zIndex: isCenter ? 20 : 10,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 30,
                mass: 0.7,
              }}
              onClick={() => {
                if (!isCenter) {
                  if (position > 0) nextSlide();
                  else prevSlide();
                }
              }}
              data-cursor={isCenter ? 'EXPLORE' : 'VIEW'}
              className="absolute w-[88vw] sm:w-[72vw] md:w-[60vw] max-w-[800px] bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] cursor-pointer group select-none flex flex-col md:flex-row"
            >
              {/* Image Column */}
              <div
                className="relative aspect-[16/11] md:aspect-auto md:w-3/5 overflow-hidden bg-black/10 min-h-[280px] sm:min-h-[360px]"
                onClick={() => isCenter && setActiveModalTrip(trip)}
              >
                <Image
                  src={trip.coverImage.src}
                  alt={trip.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Top Duration & Quick View Trigger */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-bold">
                    {trip.durationNights}N / {trip.durationDays}D
                  </span>

                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewTrip(trip);
                      }}
                      className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-medium flex items-center gap-1.5 hover:bg-[var(--accent)] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick view</span>
                    </button>
                  )}
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F4A261] font-bold block mb-1">
                    {trip.destination}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white line-clamp-1">
                    {trip.title}
                  </h3>
                </div>
              </div>

              {/* Info Column */}
              <div className="p-6 sm:p-8 md:w-2/5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="font-bold text-[var(--text-primary)]">4.9</span>
                    <span className="text-[var(--text-muted)] font-mono">
                      ({trip.reviewCount} travellers)
                    </span>
                  </div>

                  {trip.route && (
                    <div className="text-xs font-mono text-[var(--accent)] bg-[var(--bg-surface-2)] p-2.5 rounded-xl font-semibold">
                      Route: {trip.route}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed font-normal">
                    {trip.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">From</span>
                    <span className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                      {formatPrice(trip.pricePerPerson)}
                    </span>
                  </div>

                  {isCenter && (
                    <MagneticButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalTrip(trip);
                      }}
                      className="px-5 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center gap-1.5 shadow-md"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </MagneticButton>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick View Staggered Glass Sheet Dialog */}
      <Dialog open={!!quickViewTrip} onOpenChange={(open) => !open && setQuickViewTrip(null)}>
        {quickViewTrip && (
          <DialogContent className="max-w-lg p-6 sm:p-8 glass-surface border border-white/20 shadow-2xl">
            <DialogHeader>
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-mono uppercase text-[var(--accent)] font-semibold tracking-wider block"
              >
                {quickViewTrip.destination} — {quickViewTrip.durationNights}N / {quickViewTrip.durationDays}D
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.06 }}
              >
                <DialogTitle className="text-2xl font-serif font-medium">
                  {quickViewTrip.title}
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] text-xs font-mono text-[var(--accent)] font-semibold"
              >
                Route: {quickViewTrip.route}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.18 }}
              >
                <span className="text-xs font-semibold text-[var(--text-primary)] block mb-2.5">
                  Package Inclusions:
                </span>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-[var(--text-muted)] font-medium">
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--accent)]" /> Verified Boutique Stays</span>
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--accent)]" /> Daily Breakfast & Dinner</span>
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--accent)]" /> Private Chauffeur Vehicle</span>
                  <span className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--accent)]" /> Sightseeing & Passes</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.24 }}
                className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">From</span>
                  <span className="text-2xl font-serif font-bold text-[var(--accent)]">
                    {formatPrice(quickViewTrip.pricePerPerson)}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]"> / person</span>
                </div>

                <MagneticButton
                  onClick={() => {
                    const t = quickViewTrip;
                    setQuickViewTrip(null);
                    setActiveModalTrip(t);
                  }}
                  className="px-6 h-11 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center gap-2"
                >
                  <span>VIEW FULL JOURNEY</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Full Trip Detail Modal */}
      <TripDetailModal
        trip={activeModalTrip}
        onClose={() => setActiveModalTrip(null)}
        onPlanCustom={(tripTitle) => onOpenPlanTrip(tripTitle)}
      />
    </section>
  );
}
