'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { testimonials } from '@/data/testimonials';
import { ArrowLeft, ArrowRight, Star, CheckCircle, ShieldCheck, Quote } from 'lucide-react';

export default function VariantTravelStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = testimonials.slice(0, 6);
  const currentStory = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Supporting side reviews for rich editorial density (#27)
  const supportingStories = stories.filter((_, idx) => idx !== currentIndex).slice(0, 2);

  return (
    <section
      id="stories"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Connected Layout with Adjacent Navigation (#26 & #29) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 06 · REAL TRAVELLER REVIEWS
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              They went. <br />
              They came back smiling.
            </h2>
          </div>

          {/* Connected Compact Navigation Dock (#29) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <VariantGlass
              intensity="pill"
              className="rounded-full px-4 py-1.5 flex items-center gap-3 border-white/70 dark:border-white/15 shadow-md"
            >
              <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] font-medium tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
              </span>

              <div className="h-4 w-px bg-black/10 dark:bg-white/15" />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous story"
                  className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next story"
                  className="w-8 h-8 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </VariantGlass>
          </div>
        </div>

        {/* Editorial Story Layout: 60% Featured Story + 40% Supporting Memory Cards (#27) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Featured Traveller Story (approx 60% weight) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#151310] rounded-3xl p-6 sm:p-8 lg:p-10 border border-black/5 dark:border-white/10 shadow-[0_24px_70px_rgba(23,21,18,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center mb-6">
              {/* Traveller Portrait */}
              <div className="sm:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-[#E8DED0] dark:bg-[#1C1916] border-4 border-[#FBF8F1] dark:border-[#1F1C18]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStory.id}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={
                          currentStory.avatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
                        }
                        alt={currentStory.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Verified Traveller Pill */}
                  <div className="absolute inset-x-3 bottom-3 z-10">
                    <VariantGlass
                      intensity="photo"
                      className="rounded-xl p-2.5 text-white border-white/25"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">
                            {currentStory.name}
                          </div>
                          <div className="text-[9px] font-mono text-[#D4A467]">
                            {currentStory.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-mono bg-white/20 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-2.5 h-2.5 text-[#D4A467]" />
                          <span>Verified</span>
                        </div>
                      </div>
                    </VariantGlass>
                  </div>
                </div>
              </div>

              {/* Quote & Stars */}
              <div className="sm:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#D4A467]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#6D665E] dark:text-[#B6ADA1] uppercase">
                    5.0 ★ Google Review
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                    className="space-y-3"
                  >
                    <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171512] dark:text-[#F5EFE6] leading-snug tracking-tight">
                      &ldquo;{currentStory.quote}&rdquo;
                    </blockquote>

                    {currentStory.highlight && (
                      <p className="text-xs font-mono text-[#C85D3A] dark:text-[#E16A43] bg-[#C85D3A]/8 dark:bg-[#E16A43]/15 p-2.5 rounded-xl border border-[#C85D3A]/20 inline-block">
                        <span className="font-semibold mr-1">Highlight:</span>
                        {currentStory.highlight}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
                <span>Trip: {currentStory.trip || currentStory.tripDestination}</span>
              </div>
              <span>{currentStory.date}</span>
            </div>
          </div>

          {/* Supporting Side Memory Cards (approx 40% weight) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {supportingStories.map((supportStory, sIdx) => (
              <motion.div
                key={supportStory.id}
                onClick={() => {
                  const targetIdx = stories.findIndex((s) => s.id === supportStory.id);
                  if (targetIdx !== -1) setCurrentIndex(targetIdx);
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 dark:bg-[#1C1916] rounded-3xl p-5 border border-black/5 dark:border-white/10 shadow-md cursor-pointer flex-1 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6D665E] dark:text-[#B6ADA1]">
                    <span className="font-semibold text-[#C85D3A] dark:text-[#E16A43]">
                      {supportStory.tripDestination}
                    </span>
                    <span>{supportStory.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-[#171512] dark:text-[#F5EFE6] line-clamp-3 leading-relaxed">
                    &ldquo;{supportStory.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#171512] dark:text-white">
                    {supportStory.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#174E48] dark:text-[#D4A467] group-hover:underline">
                    View Story →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
