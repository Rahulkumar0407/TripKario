'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { testimonials, Testimonial } from '@/data/testimonials';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  CheckCircle,
  ShieldCheck,
  Quote,
  MapPin,
  Calendar,
  Sparkles,
  Compass,
  FileCheck2,
} from 'lucide-react';

export default function VariantTravelStories() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'editorial'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group testimonials from the single source of truth (src/data/testimonials.ts)
  const filteredStories = testimonials.filter((item, idx) => {
    if (activeFilter === 'verified') return idx < 6; // Genuine Google reviews
    if (activeFilter === 'editorial') return idx >= 6; // Curated editorial journeys
    return true;
  });

  // Ensure currentIndex stays within bounds when filtering
  const safeIndex = currentIndex >= filteredStories.length ? 0 : currentIndex;
  const currentStory: Testimonial = filteredStories[safeIndex] || testimonials[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const isGoogleVerified = safeIndex < 6 && (activeFilter === 'all' || activeFilter === 'verified');

  return (
    <section
      id="stories"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Connected Editorial Relationship */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 06 · TRAVELLER MEMORIES & REVIEWS
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              They went. <br />
              They came back smiling.
            </h2>
          </div>

          {/* Filter Pills + Compact Navigation Dock */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-[#1C1916] text-[#171512] dark:text-white font-bold shadow-sm'
                    : 'text-[#6D665E] dark:text-[#B6ADA1] hover:text-[#171512] dark:hover:text-white'
                }`}
              >
                All Stories ({testimonials.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('verified');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  activeFilter === 'verified'
                    ? 'bg-white dark:bg-[#1C1916] text-[#171512] dark:text-white font-bold shadow-sm'
                    : 'text-[#6D665E] dark:text-[#B6ADA1] hover:text-[#171512] dark:hover:text-white'
                }`}
              >
                Google Reviews (6)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('editorial');
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  activeFilter === 'editorial'
                    ? 'bg-white dark:bg-[#1C1916] text-[#171512] dark:text-white font-bold shadow-sm'
                    : 'text-[#6D665E] dark:text-[#B6ADA1] hover:text-[#171512] dark:hover:text-white'
                }`}
              >
                Editorial (3)
              </button>
            </div>

            {/* Adjacent Controls Dock */}
            <VariantGlass
              intensity="pill"
              className="rounded-full px-4 py-1.5 flex items-center gap-3 border-white/70 dark:border-white/15 shadow-md"
            >
              <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] font-medium tracking-widest">
                {String(safeIndex + 1).padStart(2, '0')} / {String(filteredStories.length).padStart(2, '0')}
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

        {/* Physical Travel Desk Letter & Memory Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Pinned Traveller Letter (approx 65% weight) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#151310] rounded-3xl p-6 sm:p-8 lg:p-10 border-4 border-white dark:border-[#1F1C18] shadow-[0_24px_70px_rgba(23,21,18,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Desk Paper Watermark / Seal */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-20 dark:opacity-10 select-none hidden sm:block">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#174E48] dark:border-[#D4A467] flex items-center justify-center rotate-12">
                <span className="text-[9px] font-mono font-bold uppercase text-center text-[#174E48] dark:text-[#D4A467]">
                  TRIPKARIO<br />VERIFIED<br />STORY
                </span>
              </div>
            </div>

            <div>
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#D4A467]">
                    {[...Array(currentStory.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono tracking-widest uppercase font-semibold text-[#174E48] dark:text-[#D4A467]">
                    {isGoogleVerified ? '5.0 ★ Verified Google Review' : 'TripKario Editorial Story'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
                  <Calendar className="w-3.5 h-3.5 text-[#C85D3A]" />
                  <span>{currentStory.date || 'Recent Traveller'}</span>
                </div>
              </div>

              {/* Main Content Grid: Portrait + Animated Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* Real Traveller Portrait */}
                <div className="sm:col-span-4 relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-[#E8DED0] dark:bg-[#1C1916] border-2 border-white dark:border-white/10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStory.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom Traveller Label Pill */}
                    <div className="absolute inset-x-2.5 bottom-2.5 z-10">
                      <VariantGlass
                        intensity="photo"
                        className="rounded-xl p-2 text-white border-white/25"
                      >
                        <div className="flex items-center justify-between text-left">
                          <div className="truncate pr-1">
                            <span className="text-xs font-bold text-white leading-none block truncate">
                              {currentStory.name}
                            </span>
                            <span className="text-[9px] font-mono text-[#D4A467] truncate block mt-0.5">
                              {currentStory.location || 'India'}
                            </span>
                          </div>
                          <span className="shrink-0 p-1 rounded-full bg-white/20">
                            <CheckCircle className="w-3 h-3 text-[#D4A467]" />
                          </span>
                        </div>
                      </VariantGlass>
                    </div>
                  </div>
                </div>

                {/* Direct Authentic Quote */}
                <div className="sm:col-span-8 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStory.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45 }}
                      className="space-y-4"
                    >
                      <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171512] dark:text-[#F5EFE6] leading-snug tracking-tight">
                        &ldquo;{currentStory.quote}&rdquo;
                      </blockquote>

                      {currentStory.highlight && (
                        <div className="p-3 rounded-2xl bg-[#F4EFE7] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-[#C85D3A] shrink-0 mt-0.5" />
                          <p className="text-xs font-mono text-[#171512] dark:text-[#F5EFE6] leading-relaxed">
                            <span className="font-semibold text-[#174E48] dark:text-[#D4A467] mr-1">
                              Key Experience:
                            </span>
                            {currentStory.highlight}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Trip Destination Badge */}
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#174E48] dark:text-[#D4A467]" />
                <span>
                  Trip Itinerary: <strong>{currentStory.trip || currentStory.tripDestination}</strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Verified TripKario Traveller</span>
              </div>
            </div>
          </div>

          {/* Supporting Postcard Index Stack (approx 35% weight) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D665E] dark:text-[#B6ADA1] px-1 font-semibold">
              Browse More Traveller Notes
            </span>

            {filteredStories
              .filter((_, idx) => idx !== safeIndex)
              .slice(0, 3)
              .map((story) => {
                const targetIdx = filteredStories.findIndex((s) => s.id === story.id);
                return (
                  <motion.button
                    key={story.id}
                    type="button"
                    onClick={() => setCurrentIndex(targetIdx)}
                    whileHover={{ scale: 1.02 }}
                    className="w-full text-left bg-white/80 dark:bg-[#1C1916] rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-all group flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                        <span className="font-semibold text-[#C85D3A] dark:text-[#E16A43]">
                          {story.tripDestination || story.trip}
                        </span>
                        <span className="text-[#6D665E] dark:text-[#B6ADA1]">{story.date}</span>
                      </div>

                      <p className="text-xs font-medium text-[#171512] dark:text-[#F5EFE6] line-clamp-2 leading-relaxed">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#171512] dark:text-white">
                        {story.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#174E48] dark:text-[#D4A467] group-hover:underline">
                        Read Review →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
