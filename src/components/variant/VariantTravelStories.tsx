'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { testimonials } from '@/data/testimonials';
import { ArrowLeft, ArrowRight, Star, CheckCircle, ShieldCheck } from 'lucide-react';

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

  return (
    <section id="stories" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F3EFE6] dark:bg-[#0D0C0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Simple Plain Language */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
                SCENE 06 · REAL REVIEWS
              </span>
              <span className="h-px w-6 bg-[#C95D39]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F4EEE4] leading-tight">
              They went. <br className="hidden sm:block" />
              They came back smiling.
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#756E64] dark:text-[#B3AA9E]">
              {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-11 h-11 rounded-full bg-white/70 dark:bg-white/10 border border-white/80 dark:border-white/15 flex items-center justify-center text-[#171512] dark:text-white shadow-md hover:bg-[#C95D39] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="w-11 h-11 rounded-full bg-[#C95D39] text-white flex items-center justify-center shadow-md hover:bg-[#B34F2D] transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Story Spread Card */}
        <div className="relative bg-white dark:bg-[#171512] rounded-3xl p-6 sm:p-10 lg:p-14 border border-black/5 dark:border-white/10 shadow-[0_24px_70px_rgba(23,21,18,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Real Traveller Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-[#E8DED0] dark:bg-[#25221E] border-4 border-[#F3EFE6] dark:border-[#0D0C0A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={
                        currentStory.avatar ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
                      }
                      alt={currentStory.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Traveller Label Pill */}
                <div className="absolute inset-x-4 bottom-4 z-10">
                  <VariantGlass
                    intensity="deep"
                    className="rounded-xl p-3 text-white border-white/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          {currentStory.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#E0B36E]">
                          {currentStory.location} · {currentStory.tripDestination}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-[#E0B36E]" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </VariantGlass>
                </div>
              </div>
            </div>

            {/* Right Col: Simple Authentic Quote */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex text-[#E0B36E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono tracking-widest text-[#756E64] dark:text-[#B3AA9E] uppercase">
                  5.0 ★ Verified Google Review
                </span>
              </div>

              {/* Quote Animation: Words & Lines (#20) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4"
                >
                  <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171512] dark:text-[#F4EEE4] leading-snug tracking-tight">
                    &ldquo;{currentStory.quote}&rdquo;
                  </blockquote>

                  {currentStory.highlight && (
                    <p className="text-sm font-mono text-[#C95D39] dark:text-[#E06A42] bg-[#C95D39]/5 dark:bg-[#E06A42]/10 p-3 rounded-xl border border-[#C95D39]/20 inline-block">
                      <span className="font-semibold mr-1">Traveller Note:</span>
                      {currentStory.highlight}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#756E64] dark:text-[#B3AA9E]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#174D47] dark:text-[#1D5B54]" />
                  <span>Trip: {currentStory.trip || currentStory.tripDestination}</span>
                </div>
                <span>{currentStory.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
