'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { variantHeroDestinations } from '@/data/variant/variantData';
import { ArrowLeft, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

interface VariantDestinationEditorialProps {
  onOpenPlanTrip: (destination?: string) => void;
}

const AUTOPLAY_DURATION = 7000; // 7 seconds per destination

// Subtle destination atmosphere ambient tints
const destinationAtmospheres: Record<string, string> = {
  kashmir: 'rgba(23, 77, 71, 0.12)',     // cool green-blue
  ladakh: 'rgba(29, 60, 84, 0.12)',      // cool stone-blue
  rajasthan: 'rgba(200, 93, 58, 0.12)',   // warm sandstone
  kerala: 'rgba(24, 78, 54, 0.12)',      // soft tropical green
  meghalaya: 'rgba(18, 70, 60, 0.12)',    // misty green
  goa: 'rgba(212, 164, 103, 0.12)',      // warm coastal gold
};

export default function VariantDestinationEditorial({
  onOpenPlanTrip,
}: VariantDestinationEditorialProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHoveredCard, setIsHoveredCard] = useState(false);

  const destinations = variantHeroDestinations;
  const activeDest = destinations[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setProgress(0);
  }, [destinations.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    setProgress(0);
  }, [destinations.length]);

  // Autoplay and continuous progress line (only active when section is in viewport)
  useEffect(() => {
    if (!isInView || isHovered) return;

    const intervalStep = 50;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (intervalStep / AUTOPLAY_DURATION) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isInView, isHovered, handleNext]);

  const activeAtmosphere = destinationAtmospheres[activeDest.id] || 'rgba(200, 93, 58, 0.10)';

  return (
    <section
      ref={sectionRef}
      id="destinations"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-700"
    >
      {/* Subtle Atmospheric Ambient Tint */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(800px circle at 50% 45%, ${activeAtmosphere}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 03 · THE DESTINATION ALBUM
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              Pick a place. <br />
              We&apos;ll handle the details.
            </h2>
          </div>

          {/* Integrated Editorial Controls: 05 / 06    ←  → */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="text-xs font-mono font-bold text-[#171512] dark:text-white tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination"
                className="p-2 text-[#171512] dark:text-[#F5EFE6] hover:text-[#C85D3A] dark:hover:text-[#E16A43] transition-all duration-200 hover:-translate-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination"
                className="p-2 text-[#171512] dark:text-[#F5EFE6] hover:text-[#C85D3A] dark:hover:text-[#E16A43] transition-all duration-200 hover:translate-x-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Physical Photo Stack Showcase Container: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] rounded-3xl overflow-hidden border-4 sm:border-8 border-white dark:border-[#1F1C18] bg-[#12120A] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-10 lg:p-14"
        >
          {/* Animated Background Photograph Layer with Storytelling Flow */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeDest.id}
              initial={{
                opacity: 0,
                scale: 1.07,
                x: direction === 1 ? '4vw' : '-4vw',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.04,
                x: direction === 1 ? '-4vw' : '4vw',
              }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 z-0 bg-[#12120A]"
            >
              <Image
                src={activeDest.image}
                alt={activeDest.tagline}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover hero-camera-breathe"
              />
              {/* Localized Bottom/Side Gradient Mask for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top Tag & Subtle Progress Line */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <VariantGlass
              intensity="photo"
              className="rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-white uppercase border-white/30"
            >
              {activeDest.num} · {activeDest.region}
            </VariantGlass>

            {/* Continuous 7-Second Progress Line */}
            <div className="w-28 sm:w-44 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
              <div
                className="h-full bg-[#C85D3A] transition-all duration-75 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Content: IMAGE → PLACE → TRIP → ACTION */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Col: Place & Staggered Typography Integrated with Photograph */}
            <div className="lg:col-span-7 space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDest.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A467] font-semibold drop-shadow-sm">
                    {activeDest.shortVibe}
                  </span>
                  <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase mt-1 drop-shadow-md">
                    {activeDest.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/95 max-w-xl font-normal leading-relaxed mt-2 drop-shadow-sm">
                    {activeDest.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Inclusions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeDest.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/95 bg-black/40 backdrop-blur-md border border-white/20"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#D4A467]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Dedicated Dark Premium Glass Information Card */}
            <div className="lg:col-span-5">
              <motion.div
                onMouseEnter={() => setIsHoveredCard(true)}
                onMouseLeave={() => setIsHoveredCard(false)}
                animate={{
                  y: isHoveredCard ? -3 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="relative rounded-3xl p-6 sm:p-7 transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(12, 12, 10, 0.78)',
                  backdropFilter: 'blur(22px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(22px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: isHoveredCard
                    ? '0 32px 85px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
                    : '0 24px 70px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                {/* Subtle top edge crisp refraction highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="space-y-4">
                  {/* Pacing & Price Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/12">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8B0A4] block">
                        Pacing
                      </span>
                      <span className="text-base font-bold text-[#F5EFE6]">
                        {activeDest.duration}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8B0A4] block">
                        From
                      </span>
                      <span className="text-xl font-bold text-[#D4A467]">
                        {activeDest.price}
                      </span>
                      <span className="text-[10px] font-mono text-[#B8B0A4] block">
                        per person
                      </span>
                    </div>
                  </div>

                  {/* Route Snippet */}
                  <div className="text-xs font-mono text-[#F5EFE6]/90 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#E06A43] shrink-0" />
                    <span>Route: {activeDest.route}</span>
                  </div>

                  {/* CTA Button: Burnt Terracotta */}
                  <button
                    type="button"
                    onClick={() => onOpenPlanTrip(activeDest.name)}
                    className="w-full py-3.5 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/35 transition-all duration-300 group cursor-pointer"
                  >
                    <span>SEE THE {activeDest.name.toUpperCase()} TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Destination Indicators */}
          <div className="relative z-10 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-white/12">
            {destinations.map((dest, idx) => (
              <button
                key={dest.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-10 bg-[#C85D3A]' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to ${dest.name}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
