'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';
import type { Destination } from '@/types';

interface DestinationCarouselProps {
  destinations?: Destination[];
  onSelectDestination: (destName: string) => void;
}

export default function DestinationCarousel({
  destinations: destinationsProp,
  onSelectDestination,
}: DestinationCarouselProps) {
  const destList = destinationsProp && destinationsProp.length > 0 ? destinationsProp : destinations;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const total = destList.length;
  const AUTOPLAY_DURATION = 6000;

  const nextSlide = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // IntersectionObserver: only autoplay when visible in viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Single-timeout autoplay (zero 50ms intervals)
  useEffect(() => {
    if (!isVisible || isHovered || hoveredCardIdx !== null) return;

    const timer = setTimeout(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [isVisible, isHovered, hoveredCardIdx, activeIndex, total]);

  const activeDest = destList[activeIndex] || destList[0];

  // Ambient atmosphere wash per destination
  const ambientGlowColors: Record<string, string> = {
    kashmir: 'rgba(232, 106, 58, 0.20)',
    rajasthan: 'rgba(216, 154, 90, 0.24)',
    kerala: 'rgba(36, 90, 86, 0.22)',
    meghalaya: 'rgba(100, 140, 160, 0.22)',
    himachal: 'rgba(232, 106, 58, 0.18)',
    ladakh: 'rgba(232, 106, 58, 0.20)',
  };
  const activeGlow = ambientGlowColors[activeDest.id] || 'rgba(232, 106, 58, 0.20)';

  return (
    <section
      ref={sectionRef}
      id="destinations"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredCardIdx(null);
      }}
      className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-x-clip overflow-y-visible relative"
    >
      {/* LAYER 1: Ambient Background Color Wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{ backgroundColor: activeGlow }}
          transition={{ duration: 1.0 }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Territory Carousel
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
            India is calling.
          </h2>
        </div>

        {/* Carousel Navigation & Animated Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-xs">
            <span className="text-xs font-mono tracking-wider text-[var(--text-muted)] font-semibold">
              {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {total < 10 ? `0${total}` : total}
            </span>
            <div className="w-14 h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden ml-1">
              <div
                key={`dest-progress-${activeIndex}`}
                className="h-full bg-[var(--accent)]"
                style={{
                  animation: !isVisible || isHovered || hoveredCardIdx !== null ? 'none' : `progressAnim ${AUTOPLAY_DURATION}ms linear forwards`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous destination"
              className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next destination"
              className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] border border-[var(--border-card)] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* LAYER 2 & 3: Layered 3D Depth Carousel Container with Momentum Physics */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-visible">
        {destList.map((dest, idx) => {
          let position = idx - activeIndex;
          if (position < -2) position += total;
          if (position > 2) position -= total;

          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          if (!isVisible) return null;

          const isHoveredCard = hoveredCardIdx === idx;
          const isAnyCardHovered = hoveredCardIdx !== null;

          let cardOpacity = isCenter ? 1 : 0.88;
          let cardScale = isCenter ? 1 : 0.88;
          let cardY = 0;
          let cardZIndex = isHoveredCard ? 60 : isCenter ? 50 : 30;
          let cardFilter = 'blur(0px) grayscale(0%) brightness(1)';

          if (isHoveredCard) {
            cardOpacity = 1;
            cardScale = isCenter ? 1.02 : 0.94;
            cardY = -8;
            cardFilter = 'blur(0px) grayscale(0%) brightness(1.03)';
          } else if (isAnyCardHovered) {
            cardOpacity = 0.45;
            cardScale = isCenter ? 0.96 : 0.84;
            cardY = 0;
            cardFilter = 'blur(0.5px) grayscale(15%) brightness(0.85)';
          }

          return (
            <motion.div
              key={dest.id}
              initial={false}
              style={{ zIndex: cardZIndex }}
              animate={{
                x: `${position * 80}%`,
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
                if (info.offset.x < -40 || info.velocity.x < -300) {
                  nextSlide();
                } else if (info.offset.x > 40 || info.velocity.x > 300) {
                  prevSlide();
                }
              }}
              className="absolute w-[88vw] sm:w-[68vw] md:w-[58vw] max-w-[760px] flex items-center justify-center pointer-events-auto"
            >
              <div
                onClick={() => {
                  if (!isCenter) {
                    if (position > 0) nextSlide();
                    else prevSlide();
                  } else {
                    onSelectDestination(dest.id || dest.name);
                  }
                }}
                className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] cursor-pointer select-none transition-shadow duration-300 relative"
              >
                <Image
                  src={dest.image.src}
                  alt={dest.image.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                {/* Region Chip */}
                <div className="absolute top-5 left-5">
                  <GlassSurface variant="clear" rounded="full" className="px-3.5 py-1 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                    {dest.region}
                  </GlassSurface>
                </div>

                {/* Bottom Editorial Content */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#F4A261] tracking-widest block mb-1 font-semibold">
                      {dest.tagline}
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white">
                      {dest.name}
                    </h3>
                  </div>

                  {isCenter && (
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] font-mono text-white/70 block uppercase">From</span>
                        <span className="text-xl font-serif font-bold text-white">
                          {formatPrice(dest.startingPrice)}
                        </span>
                      </div>

                      <MagneticButton
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDestination(dest.id || dest.name);
                        }}
                        className="px-6 h-11 rounded-full bg-[#E46B3B] hover:bg-[#ED7B4D] text-white flex items-center gap-2 shadow-lg cursor-pointer"
                      >
                        <span>EXPLORE</span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
