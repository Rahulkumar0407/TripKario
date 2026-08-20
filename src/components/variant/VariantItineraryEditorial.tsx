'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { variantItineraryDays, VariantItineraryDay } from '@/data/variant/variantData';
import { Clock, MapPin, Sparkles, Compass } from 'lucide-react';

export default function VariantItineraryEditorial() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const activeDay = variantItineraryDays[activeDayIdx];

  // Directional transition mappings (#22 & #32)
  const getTransitionVariants = (idx: number) => {
    switch (idx) {
      case 1:
        return { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };
      case 2:
        return { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 50 } };
      case 3:
        return { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -50 } };
      default:
        return { initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } };
    }
  };

  const variants = getTransitionVariants(activeDayIdx);

  return (
    <section
      id="itinerary"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#FBF8F1]/60 dark:bg-[#151310] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 07 · DAILY FLOW STORY
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              How a day unfolds, <br />
              step by step.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#6D665E] dark:text-[#B6ADA1] max-w-md font-normal leading-relaxed">
            No 5:00 AM rush. No chaos. Here is what an actual 4-day unhurried journey feels like on the ground.
          </p>
        </div>

        {/* Day Selector Navigation Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 pb-2 border-b border-black/5 dark:border-white/10">
          {variantItineraryDays.map((day, idx) => {
            const isActive = idx === activeDayIdx;
            return (
              <button
                key={day.dayNum}
                onClick={() => setActiveDayIdx(idx)}
                className={`relative px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-white font-bold bg-[#174E48] dark:bg-[#1E5A53] shadow-lg shadow-[#174E48]/25'
                    : 'text-[#6D665E] dark:text-[#B6ADA1] hover:text-[#171512] dark:hover:text-white bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                <span className="text-[#D4A467] font-bold">DAY {day.dayNum}</span>
                <span>{day.action}</span>
              </button>
            );
          })}
        </div>

        {/* Day Showcase Layout: Storytelling Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#1C1916] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(23,21,18,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10">
          {/* Left Col: Day Typography & Timing */}
          <div className="lg:col-span-6 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.dayNum}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-6xl font-black text-[#C85D3A] dark:text-[#E16A43]">
                    {activeDay.dayNum}
                  </span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#6D665E] dark:text-[#B6ADA1] block">
                      DAY {activeDay.dayNum} · {activeDay.action}
                    </span>
                    <span className="text-xs font-mono text-[#174E48] dark:text-[#D4A467] font-semibold">
                      {activeDay.subtitle}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171512] dark:text-[#F5EFE6] leading-tight">
                  {activeDay.title}
                </h3>

                <p className="text-sm sm:text-base text-[#171512]/80 dark:text-[#F5EFE6]/80 leading-relaxed font-normal">
                  {activeDay.experience}
                </p>

                {/* Simple Note Glass Pill */}
                <VariantGlass
                  intensity="medium"
                  className="rounded-2xl p-4 border-[#C85D3A]/20 bg-[#C85D3A]/5 dark:bg-[#E16A43]/10"
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#C85D3A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] dark:text-[#E16A43] font-semibold block">
                        What it feels like
                      </span>
                      <p className="text-xs font-medium text-[#171512] dark:text-[#F5EFE6] mt-0.5">
                        &ldquo;{activeDay.simpleNote}&rdquo;
                      </p>
                    </div>
                  </div>
                </VariantGlass>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C85D3A]" />
                    <span className="truncate">{activeDay.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
                    <span className="truncate">{activeDay.timing}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Col: Directional Transition Photograph (#32) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-[#E8DED0] dark:bg-[#25221E] border-4 border-[#FBF8F1] dark:border-[#1F1C18]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay.dayNum}
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeDay.image}
                    alt={activeDay.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <VariantGlass
                  intensity="photo"
                  className="rounded-xl p-3 text-white border-white/25 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-white truncate">
                    {activeDay.subtitle}
                  </span>
                  <span className="text-[10px] font-mono text-[#D4A467] shrink-0">
                    Day {activeDay.dayNum} of 04
                  </span>
                </VariantGlass>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
