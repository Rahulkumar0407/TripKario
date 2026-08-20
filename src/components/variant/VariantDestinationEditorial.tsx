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
  const destinations = variantHeroDestinations;
  const activeDest = destinations[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F3EFE6] dark:bg-[#0D0C0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Simple Plain Language */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
                SCENE 03 · THE TRAVEL STRIP
              </span>
              <span className="h-px w-6 bg-[#C95D39]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F4EEE4] leading-tight">
              Pick a place. <br className="hidden sm:block" />
              We&apos;ll handle the details.
            </h2>
          </div>

          {/* Navigation Controls: Previous / Next & Counter */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#756E64] dark:text-[#B3AA9E]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous trip panel"
                className="w-11 h-11 rounded-full bg-white/70 dark:bg-white/10 border border-white/80 dark:border-white/15 flex items-center justify-center text-[#171512] dark:text-white shadow-md hover:bg-[#C95D39] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next trip panel"
                className="w-11 h-11 rounded-full bg-[#C95D39] text-white flex items-center justify-center shadow-md hover:bg-[#B34F2D] transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The Moving Travel Strip Showcase Container (#12, #13, #14) */}
        <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] rounded-3xl overflow-hidden border-4 sm:border-8 border-white dark:border-[#1F1C18] bg-[#E8DED0] dark:bg-[#171512] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          {/* Animated Background Photograph Layer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, scale: 1.06, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.04, x: -40 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={activeDest.image}
                alt={activeDest.tagline}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top Tag */}
          <div className="relative z-10 self-start mb-auto">
            <VariantGlass
              intensity="deep"
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
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E0B36E] font-semibold">
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
                    <CheckCircle2 className="w-3 h-3 text-[#E0B36E]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Price & Action */}
            <div className="lg:col-span-5">
              <VariantGlass
                intensity="deep"
                className="rounded-3xl p-6 sm:p-7 shadow-2xl border-white/80 dark:border-white/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#756E64] dark:text-[#B3AA9E] block">
                        Pacing
                      </span>
                      <span className="text-base font-bold text-[#171512] dark:text-[#F4EEE4]">
                        {activeDest.duration}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#756E64] dark:text-[#B3AA9E] block">
                        From
                      </span>
                      <span className="text-xl font-bold text-[#174D47] dark:text-[#E0B36E]">
                        {activeDest.price}
                      </span>
                      <span className="text-[10px] font-mono text-[#756E64] dark:text-[#B3AA9E] block">
                        per person
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#171512]/80 dark:text-[#F4EEE4]/80 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C95D39] shrink-0" />
                    <span>Route: {activeDest.route}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenPlanTrip(activeDest.name)}
                    className="w-full py-3.5 rounded-2xl bg-[#C95D39] hover:bg-[#B34F2D] text-white font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C95D39]/30 transition-all duration-300 group"
                  >
                    <span>SEE THE {activeDest.name.toUpperCase()} TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </VariantGlass>
            </div>
          </div>

          {/* Bottom Destination Indicators */}
          <div className="relative z-10 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-white/20">
            {destinations.map((dest, idx) => (
              <button
                key={dest.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-10 bg-[#C95D39]' : 'w-3 bg-white/40 hover:bg-white/70'
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
