'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { variantHeroDestinations } from '@/data/variant/variantData';
import { ArrowLeft, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

interface VariantDestinationEditorialProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function VariantDestinationEditorial({
  onOpenPlanTrip,
}: VariantDestinationEditorialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const destinations = variantHeroDestinations;
  const activeDest = destinations[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <section
      id="destinations"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Connected Layout with Adjacent Controls (#21 & #22) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 03 · THE TRAVEL STRIP
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              Pick a place. <br />
              We&apos;ll handle the details.
            </h2>
          </div>

          {/* Connected Compact Navigation Dock (#21 & #22) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <VariantGlass
              intensity="pill"
              className="rounded-full px-4 py-1.5 flex items-center gap-3 border-white/70 dark:border-white/15 shadow-md"
            >
              <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] font-medium tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
              </span>

              <div className="h-4 w-px bg-black/10 dark:bg-white/15" />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous destination"
                  className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next destination"
                  className="w-8 h-8 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </VariantGlass>
          </div>
        </div>

        {/* Physical Photo Stack Carousel Showcase (#24 & #25) */}
        <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] rounded-3xl overflow-hidden border-4 sm:border-8 border-white dark:border-[#1F1C18] bg-[#FBF8F1] dark:bg-[#151310] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Animated Background Photograph Layer with Directional Translation (#23) */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, scale: 1.05, x: direction === 1 ? 70 : -70 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: direction === 1 ? -70 : 70 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0 bg-[#E8DED0]"
            >
              <Image
                src={activeDest.image}
                alt={activeDest.tagline}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top Tag */}
          <div className="relative z-10 self-start">
            <VariantGlass
              intensity="photo"
              className="rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-white uppercase border-white/30"
            >
              {activeDest.num} · {activeDest.region}
            </VariantGlass>
          </div>

          {/* Bottom Content: IMAGE → PLACE → TRIP → ACTION */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Col: Place & Simple Copy */}
            <div className="lg:col-span-7 space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDest.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A467] font-semibold">
                    {activeDest.shortVibe}
                  </span>
                  <h3 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase mt-1">
                    {activeDest.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 max-w-xl font-normal leading-relaxed mt-2">
                    {activeDest.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Simple Inclusions */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeDest.highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/90 bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#D4A467]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Price & Action */}
            <div className="lg:col-span-5">
              <VariantGlass
                intensity="photo"
                className="rounded-3xl p-6 sm:p-7 shadow-2xl border-white/35 backdrop-blur-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B6ADA1] block">
                        Pacing
                      </span>
                      <span className="text-base font-bold text-white">
                        {activeDest.duration}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B6ADA1] block">
                        From
                      </span>
                      <span className="text-xl font-bold text-[#D4A467]">
                        {activeDest.price}
                      </span>
                      <span className="text-[10px] font-mono text-[#B6ADA1] block">
                        per person
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-white/85 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C85D3A] shrink-0" />
                    <span>Route: {activeDest.route}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenPlanTrip(activeDest.name)}
                    className="w-full py-3.5 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/35 transition-all duration-300 group"
                  >
                    <span>SEE THE {activeDest.name.toUpperCase()} TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </VariantGlass>
            </div>
          </div>

          {/* Bottom Destination Indicators */}
          <div className="relative z-10 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-white/15">
            {destinations.map((dest, idx) => (
              <button
                key={dest.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-10 bg-[#C85D3A]' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to ${dest.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
