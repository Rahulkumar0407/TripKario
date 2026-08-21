'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Eye, Check, MapPin } from 'lucide-react';
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
  trips?: TripPackage[];
  onOpenPlanTrip: (destination?: string) => void;
}

export default function TripCarousel({
  trips: tripsProp,
  onOpenPlanTrip,
}: TripCarouselProps) {
  const tripsList = tripsProp && tripsProp.length > 0 ? tripsProp : tripPackages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [quickViewTrip, setQuickViewTrip] = useState<TripPackage | null>(null);
  const [activeModalTrip, setActiveModalTrip] = useState<TripPackage | null>(null);

  const total = tripsList.length;
  const AUTOPLAY_DURATION = 7000;

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
    if (isHovered || hoveredCardIdx !== null || quickViewTrip || activeModalTrip) return;

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
  }, [isHovered, hoveredCardIdx, activeIndex, quickViewTrip, activeModalTrip, total]);

  const activeTrip = tripsList[activeIndex] || tripsList[0];

  // Ambient atmosphere washes per destination
  const ambientGlowColors: Record<string, string> = {
    'kashmir-signature': 'rgba(228, 107, 59, 0.16)',
    'rajasthan-heritage': 'rgba(197, 154, 99, 0.20)',
    'kerala-backwaters': 'rgba(37, 78, 74, 0.22)',
    'meghalaya-living-roots': 'rgba(80, 130, 150, 0.18)',
    'ladakh-monasteries': 'rgba(228, 107, 59, 0.18)',
  };
  const activeGlow = ambientGlowColors[activeTrip.id] || 'rgba(228, 107, 59, 0.16)';

  return (
    <section
      id="packages"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden relative"
    >
      {/* Ambient Backdrop Illumination */}
      <motion.div
        animate={{ backgroundColor: activeGlow }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none blur-[120px] opacity-70"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Curated Journeys
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
            Trips people actually book.
          </h2>
        </div>

        {/* Carousel Controls & Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-xs">
            <span className="text-xs font-mono tracking-wider text-[var(--text-muted)] font-semibold">
              {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {total < 10 ? `0${total}` : total}
            </span>
            <div className="w-14 h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden ml-1">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-[var(--accent)] transition-all ease-linear"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous trip"
              className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next trip"
              className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Layered Package Carousel Container with Spring Physics */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 min-h-[500px] sm:min-h-[580px] flex items-center justify-center">
        {tripsList.map((trip, idx) => {
          let position = idx - activeIndex;
          if (position < -2) position += total;
          if (position > 2) position -= total;

          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          if (!isVisible) return null;

          const isHoveredCard = hoveredCardIdx === idx;
          const isAnyCardHovered = hoveredCardIdx !== null;

          let cardOpacity = isCenter ? 1 : 0.82;
          let cardScale = isCenter ? 1 : 0.93;
          let cardY = 0;
          let cardZIndex = isCenter ? 20 : 10;
          let cardFilter = 'blur(0px) grayscale(0%) brightness(1)';

          if (isHoveredCard) {
            cardOpacity = 1;
            cardScale = isCenter ? 1.03 : 0.98;
            cardY = -14;
            cardZIndex = 40;
            cardFilter = 'blur(0px) grayscale(0%) brightness(1.05)';
          } else if (isAnyCardHovered) {
            cardOpacity = 0.35;
            cardScale = isCenter ? 0.94 : 0.88;
            cardY = 0;
            cardZIndex = 5;
            cardFilter = 'blur(1.5px) grayscale(35%) brightness(0.75)';
          }

          return (
            <motion.div
              key={trip.id}
              initial={false}
              animate={{
                x: `${position * 72}%`,
                scale: cardScale,
                y: cardY,
                rotateZ: position * 1.5,
                opacity: cardOpacity,
                filter: cardFilter,
                zIndex: cardZIndex,
              }}
              onMouseEnter={() => setHoveredCardIdx(idx)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 30,
                mass: 0.7,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -350) {
                  nextSlide();
                } else if (info.offset.x > 50 || info.velocity.x > 350) {
                  prevSlide();
                }
              }}
              onClick={() => {
                if (!isCenter) {
                  if (position > 0) nextSlide();
                  else prevSlide();
                }
              }}
              data-cursor={isCenter ? 'EXPLORE' : 'VIEW'}
              className="absolute w-[88vw] sm:w-[72vw] md:w-[62vw] max-w-[840px] bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] cursor-pointer select-none flex flex-col md:flex-row transition-shadow duration-300"
            >
              {/* Image Column */}
              <div
                className="relative aspect-[16/11] md:aspect-auto md:w-3/5 overflow-hidden bg-black/10 min-h-[300px] sm:min-h-[380px]"
                onClick={() => isCenter && setActiveModalTrip(trip)}
              >
                <Image
                  src={trip.coverImage.src}
                  alt={trip.coverImage.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                {/* Top Duration & Quick View Trigger */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-bold border border-white/10">
                    {trip.durationNights}N / {trip.durationDays}D
                  </span>

                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewTrip(trip);
                      }}
                      className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10.5px] font-medium flex items-center gap-1.5 hover:bg-[var(--accent)] transition-colors cursor-pointer border border-white/10"
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-white line-clamp-1">
                    {trip.title}
                  </h3>
                </div>
              </div>

              {/* Info Column (Staggered hierarchy: Route -> Description -> Price -> Action) */}
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
                    <div className="text-xs font-mono text-[var(--accent)] bg-[var(--bg-surface-2)] p-2.5 rounded-xl font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{trip.route}</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed font-normal">
                    {trip.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">
                      {!trip.isPriceOnRequest && trip.pricePerPerson > 0 ? 'From' : 'Pricing'}
                    </span>
                    <span className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                      {formatPrice(trip.pricePerPerson, trip.isPriceOnRequest)}
                    </span>
                  </div>

                  {isCenter && (
                    <MagneticButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalTrip(trip);
                      }}
                      className="px-5 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center gap-1.5 shadow-md font-medium"
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
          <DialogContent className="max-w-lg p-6 sm:p-8 glass-surface border border-white/20 shadow-2xl bg-[var(--bg-surface)] text-[var(--text-primary)]">
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
                <DialogTitle className="text-2xl font-serif font-medium text-[var(--text-primary)]">
                  {quickViewTrip.title}
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Route: {quickViewTrip.route}</span>
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
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">
                    {!quickViewTrip.isPriceOnRequest && quickViewTrip.pricePerPerson > 0 ? 'From' : 'Pricing'}
                  </span>
                  <span className="text-2xl font-serif font-bold text-[var(--accent)]">
                    {formatPrice(quickViewTrip.pricePerPerson, quickViewTrip.isPriceOnRequest)}
                  </span>
                  {!quickViewTrip.isPriceOnRequest && quickViewTrip.pricePerPerson > 0 && (
                    <span className="text-xs font-mono text-[var(--text-muted)]"> / person</span>
                  )}
                </div>

                <MagneticButton
                  onClick={() => {
                    const t = quickViewTrip;
                    setQuickViewTrip(null);
                    setActiveModalTrip(t);
                  }}
                  className="px-6 h-11 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center gap-2 font-medium"
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
