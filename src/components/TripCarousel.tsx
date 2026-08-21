'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Eye,
  Check,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
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
  const [activeModalTrip, setActiveModalTrip] = useState<TripPackage | null>(null);

  const total = tripsList.length;
  const AUTOPLAY_DURATION = 8000;

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
    if (isHovered || hoveredCardIdx !== null || activeModalTrip) return;

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
  }, [isHovered, hoveredCardIdx, activeIndex, activeModalTrip, total]);

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
      className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-x-clip overflow-y-visible relative"
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

      {/* ══════════════════════════════════════════════════
          LAYERED PACKAGE CAROUSEL CONTAINER
          ══════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 min-h-[640px] sm:min-h-[680px] md:min-h-[620px] flex items-center justify-center overflow-visible">
        {tripsList.map((trip, idx) => {
          let position = idx - activeIndex;
          if (position < -2) position += total;
          if (position > 2) position -= total;

          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          if (!isVisible) return null;

          const isHoveredCard = hoveredCardIdx === idx;
          const isAnyCardHovered = hoveredCardIdx !== null;

          // Deterministic Depth-Based Stacking System (Center: 50, Neighbors: 30, Hover: 60)
          let cardOpacity = isCenter ? 1 : 0.88;
          let cardScale = isCenter ? 1 : 0.88;
          let cardY = 0;
          let cardZIndex = isHoveredCard ? 60 : isCenter ? 50 : 30;
          let cardFilter = 'blur(0px) grayscale(0%) brightness(1)';

          if (isHoveredCard) {
            cardOpacity = 1;
            cardScale = isCenter ? 1.02 : 0.94;
            cardY = -6;
            cardFilter = 'blur(0px) grayscale(0%) brightness(1.02)';
          } else if (isAnyCardHovered) {
            cardOpacity = 0.5;
            cardScale = isCenter ? 0.96 : 0.84;
            cardY = 0;
            cardFilter = 'blur(0.5px) grayscale(10%) brightness(0.92)';
          }

          const hasDays = Boolean(trip.itinerary && trip.itinerary.length > 0);
          const totalDays = trip.itinerary?.length || trip.durationDays || 0;
          const daysToShow = totalDays <= 3 ? (trip.itinerary || []) : (trip.itinerary?.slice(0, 3) || []);
          const remainingDaysCount = trip.itinerary ? Math.max(0, trip.itinerary.length - 3) : 0;
          const formattedPrice = formatPrice(trip.pricePerPerson, trip.isPriceOnRequest);

          return (
            <motion.div
              key={trip.id}
              initial={false}
              style={{ zIndex: cardZIndex }}
              animate={{
                x: `${position * 82}%`,
                scale: cardScale,
                y: cardY,
                rotateZ: position * -1.2,
                opacity: cardOpacity,
                filter: cardFilter,
              }}
              onMouseEnter={() => setHoveredCardIdx(idx)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
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
              className="absolute w-[88vw] sm:w-[76vw] md:w-[62vw] lg:w-[54vw] max-w-[780px] flex items-center justify-center pointer-events-auto"
            >
              <div
                onClick={() => {
                  if (!isCenter) {
                    if (position > 0) nextSlide();
                    else prevSlide();
                  } else {
                    setActiveModalTrip(trip);
                  }
                }}
                className={`w-full bg-[var(--bg-surface)] rounded-3xl overflow-hidden border cursor-pointer select-none flex flex-col md:flex-row transition-all duration-400 ${
                  isHoveredCard
                    ? 'border-[var(--accent)] shadow-2xl shadow-black/30'
                    : isCenter
                    ? 'border-[var(--border-card)] shadow-2xl'
                    : 'border-[var(--border-card)] shadow-lg'
                }`}
              >
              {/* Image Column */}
              <div className="relative aspect-[16/11] md:aspect-auto md:w-5/12 overflow-hidden bg-black/10 min-h-[260px] sm:min-h-[320px] md:min-h-[460px]">
                <Image
                  src={typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src}
                  alt={typeof trip.coverImage === 'string' ? trip.title : trip.coverImage?.alt || trip.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

                {/* Top Duration & Destination Tags */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-bold border border-white/15 shadow-sm">
                    {trip.durationNights}N · {trip.durationDays}D
                  </span>

                  {trip.category && (
                    <span className="text-[10px] font-mono tracking-wider uppercase text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold">
                      {trip.category}
                    </span>
                  )}
                </div>

                {/* Bottom Image Headline */}
                <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none z-10">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FFAA70] font-bold block mb-1">
                    {trip.destination}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-white line-clamp-2 leading-tight drop-shadow-md">
                    {trip.title}
                  </h3>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════
                  INFO COLUMN (SMOOTH HOVER ITINERARY PREVIEW)
                  ══════════════════════════════════════════════════ */}
              <div className="p-6 sm:p-7 md:p-8 md:w-7/12 flex flex-col justify-between space-y-4 bg-[var(--bg-surface)]">
                <div className="space-y-3.5">
                  {/* Top Destination & Price/Duration Header */}
                  <div className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-[var(--accent)] font-bold uppercase tracking-wider text-[11px]">
                      <span>{trip.destination}</span>
                      <span className="text-[var(--text-muted)] font-normal">·</span>
                      <span className="text-[var(--text-primary)]">{trip.durationNights}N / {trip.durationDays}D</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[var(--text-primary)]">4.9</span>
                      <span className="text-[var(--text-muted)] font-mono">
                        ({trip.reviewCount || 48})
                      </span>
                    </div>
                  </div>

                  {/* Complete Route Bar */}
                  {trip.route && (
                    <div className="text-xs font-mono text-[var(--accent)] bg-[var(--bg-surface-2)] p-2.5 rounded-xl font-semibold flex items-center gap-2 border border-[var(--border-subtle)]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="uppercase text-[9px] tracking-wider text-[var(--text-muted)] shrink-0">Route:</span>
                      <span className="truncate">{trip.route}</span>
                    </div>
                  )}

                  {/* Default overview vs Hover Rich Day-by-Day Preview */}
                  {isHoveredCard && hasDays ? (
                    <div className="space-y-2.5 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
                          ITINERARY PREVIEW:
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                          {totalDays} Days Complete Plan
                        </span>
                      </div>

                      <div className="space-y-2">
                        {daysToShow.map((day) => (
                          <div
                            key={day.dayNumber}
                            className="p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs flex items-start gap-2.5 shadow-2xs"
                          >
                            <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-[9.5px] font-mono font-bold shrink-0 mt-0.5">
                              DAY 0{day.dayNumber}
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-[var(--text-primary)] block truncate text-[12px]">
                                {day.title}
                              </span>
                              <span className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-0.5 block font-normal">
                                {day.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {remainingDaysCount > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalTrip(trip);
                          }}
                          className="text-[11px] font-mono text-[var(--accent)] hover:underline font-bold flex items-center gap-1 pt-1 cursor-pointer"
                        >
                          <span>+{remainingDaysCount} more days · View full itinerary →</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed font-light">
                        {trip.shortDescription}
                      </p>

                      {/* Curated Highlights / Inclusions Tags */}
                      {trip.inclusions && trip.inclusions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {trip.inclusions.slice(0, 3).map((inc, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface-2)] text-[10.5px] font-mono text-[var(--text-muted)] border border-[var(--border-subtle)] truncate max-w-[240px]"
                            >
                              ✓ {inc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Pricing & Explore Action */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">
                      {!trip.isPriceOnRequest && trip.pricePerPerson > 0 ? 'Starting From' : 'Pricing'}
                    </span>
                    <span className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                      {formattedPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalTrip(trip);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[var(--accent)]/25 transition-all cursor-pointer hover:scale-102 active:scale-95"
                  >
                    <span>View full itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
        })}
      </div>

      {/* ══════════════════════════════════════════════════
          COMPLETE TRIP DETAIL MODAL
          ══════════════════════════════════════════════════ */}
      <TripDetailModal
        trip={activeModalTrip}
        onClose={() => setActiveModalTrip(null)}
        onPlanCustom={(tripTitle) => {
          setActiveModalTrip(null);
          onOpenPlanTrip(tripTitle);
        }}
      />
    </section>
  );
}
