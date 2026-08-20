'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { variantHeroDestinations } from '@/data/variant/variantData';
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Compass,
  Check,
} from 'lucide-react';

interface VariantHeroProps {
  onOpenPlanTrip: (destination?: string) => void;
  onSearchSubmit?: (filters: { destination: string; month: string; travellers: string }) => void;
}

export default function VariantHero({ onOpenPlanTrip, onSearchSubmit }: VariantHeroProps) {
  const [selectedDest, setSelectedDest] = useState('Kashmir');
  const [selectedWhen, setSelectedWhen] = useState('April – June 2026');
  const [selectedTravellers, setSelectedTravellers] = useState('2 Travellers');
  const [activePopover, setActivePopover] = useState<'destination' | 'when' | 'travellers' | null>(null);

  // Pinboard interactive hover state for individual pinned photos
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const destinationOptions = [
    'Kashmir',
    'Ladakh',
    'Rajasthan',
    'Kerala',
    'Meghalaya',
    'Himachal',
    'Goa',
  ];

  const whenOptions = [
    'This Weekend (Quick Getaway)',
    'April – June 2026 (Summer Break)',
    'July – Sept 2026 (Monsoon Season)',
    'Oct – Dec 2026 (Festive & Autumn)',
    'Jan – March 2027 (Snow & Desert Season)',
    'Not sure yet (Flexible)',
  ];

  const travellerOptions = [
    'Solo (Just me)',
    'Couple (2 Travellers)',
    'Family (Parents & Kids)',
    'Friends Group (3–6 people)',
    'Big Group (7+ people)',
  ];

  const handleSearchAction = () => {
    if (onSearchSubmit) {
      onSearchSubmit({
        destination: selectedDest,
        month: selectedWhen,
        travellers: selectedTravellers,
      });
    }
    onOpenPlanTrip(selectedDest);
    setActivePopover(null);
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden bg-[#F3EFE6] dark:bg-[#0D0C0A] transition-colors duration-500">
      {/* Background Studio Lighting & Texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C95D39]/6 dark:bg-[#E06A42]/4 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-[#174D47]/6 dark:bg-[#1D5B54]/4 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        {/* Top Header & Physical Board Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center mb-8 sm:mb-12">
          {/* Left Column: Simple Human Editorial Headline (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
                TRIPKARIO · PINBOARD 02
              </span>
              <span className="h-px w-8 bg-[#C95D39]/30" />
            </motion.div>

            {/* Main Headline: Go somewhere beautiful. (Strict Zero Italics) */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#171512] dark:text-[#F4EEE4] tracking-tight leading-[0.95]"
              >
                Go somewhere <br />
                <span className="text-[#C95D39] dark:text-[#E06A42]">beautiful.</span>
              </motion.h1>

              {/* Simple Language Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg text-[#171512]/80 dark:text-[#F4EEE4]/80 font-normal leading-relaxed max-w-md pt-2"
              >
                Pick a place. We&apos;ll help with the rest.
              </motion.p>
            </div>

            {/* Quick Travel Note Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm max-w-md"
            >
              <p className="text-xs sm:text-sm font-mono text-[#756E64] dark:text-[#B3AA9E] leading-relaxed">
                <span className="text-[#174D47] dark:text-[#E0B36E] font-semibold mr-1">Quick note:</span>
                Confirmed hotels, private cars, zero 5:00 AM rush. Real trips for real people.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Physical Pinboard Composition (approx 7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]">
            {/* The Physical Studio Board Surface */}
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-3xl bg-[#E8DED0]/70 dark:bg-[#171512] p-4 sm:p-6 border-4 sm:border-8 border-white dark:border-[#1F1C18] shadow-[0_24px_80px_rgba(23,21,18,0.1)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Subtle Board Background Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* ── PHOTO 01: Kashmir Shikara (Slides in from Left) ── */}
              <motion.div
                initial={{ x: -120, y: 40, opacity: 0, rotate: -8 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: -2 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                onMouseEnter={() => setHoveredPin(1)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => onOpenPlanTrip('Kashmir')}
                className="absolute top-4 sm:top-6 left-4 sm:left-6 w-48 sm:w-64 aspect-[4/3] bg-white dark:bg-[#1F1C18] p-2.5 sm:p-3 rounded-2xl shadow-[0_16px_40px_rgba(23,21,18,0.12)] cursor-pointer z-10 border border-black/5 dark:border-white/10"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E8DED0]">
                  <Image
                    src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1200&auto=format&fit=crop"
                    alt="Kashmir Dal Lake"
                    fill
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-mono text-white flex items-center justify-between">
                    <span>KASHMIR</span>
                    <span className="text-[#E0B36E]">₹24,999</span>
                  </div>
                </div>
              </motion.div>

              {/* ── PHOTO 02: Ladakh Monk & Passes (Slides in from Top) ── */}
              <motion.div
                initial={{ y: -100, opacity: 0, rotate: 6 }}
                animate={{ y: 0, opacity: 1, rotate: 2 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                onMouseEnter={() => setHoveredPin(2)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => onOpenPlanTrip('Ladakh')}
                className="absolute top-8 sm:top-10 right-4 sm:right-8 w-44 sm:w-60 aspect-[3/4] bg-white dark:bg-[#1F1C18] p-2.5 sm:p-3 rounded-2xl shadow-[0_20px_50px_rgba(23,21,18,0.15)] cursor-pointer z-20 border border-black/5 dark:border-white/10"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E8DED0]">
                  <Image
                    src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1200&auto=format&fit=crop"
                    alt="Ladakh Thiksey Gompa"
                    fill
                    sizes="(max-width: 640px) 176px, 240px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-mono text-white flex items-center justify-between">
                    <span>LADAKH</span>
                    <span className="text-[#E0B36E]">₹31,999</span>
                  </div>
                </div>
              </motion.div>

              {/* ── PHOTO 03: Rajasthan Citadel (Slides in from Bottom-Left) ── */}
              <motion.div
                initial={{ x: 60, y: 100, opacity: 0, rotate: -5 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 1.5 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                onMouseEnter={() => setHoveredPin(3)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => onOpenPlanTrip('Rajasthan')}
                className="absolute bottom-4 sm:bottom-6 left-12 sm:left-24 w-48 sm:w-64 aspect-[16/10] bg-white dark:bg-[#1F1C18] p-2.5 sm:p-3 rounded-2xl shadow-[0_18px_45px_rgba(23,21,18,0.14)] cursor-pointer z-15 border border-black/5 dark:border-white/10"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E8DED0]">
                  <Image
                    src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1200&auto=format&fit=crop"
                    alt="Rajasthan Haveli"
                    fill
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-mono text-white flex items-center justify-between">
                    <span>RAJASTHAN</span>
                    <span className="text-[#E0B36E]">₹21,999</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Real-world Board Object: Route Snippet Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none"
              >
                <VariantGlass
                  intensity="deep"
                  className="rounded-full px-4 py-1.5 text-xs font-mono text-[#171512] dark:text-white shadow-xl border-white/80 dark:border-white/20 flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C85D3A]" />
                  <span>Delhi → Srinagar → Gulmarg</span>
                </VariantGlass>
              </motion.div>

              {/* Delicate Stamp Metaphor: Circular Territorial Entry Seal */}
              <div className="absolute bottom-3 right-4 pointer-events-none opacity-40 dark:opacity-25 select-none hidden sm:block">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#174E48] dark:border-[#D4A467] flex items-center justify-center p-1 rotate-[-12deg]">
                  <div className="text-[8px] font-mono text-center leading-tight uppercase font-semibold text-[#174E48] dark:text-[#D4A467]">
                    TRIPKARIO<br />ENTRY<br />2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Glass Search Island (#15 & #16) */}
        <div className="relative z-30 max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
          >
            <VariantGlass
              intensity="deep"
              className="rounded-3xl p-3 sm:p-4 shadow-[0_24px_70px_rgba(23,21,18,0.1)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] border-white/90 dark:border-white/15"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 items-center">
                {/* Field 1: Pick A Place */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePopover(activePopover === 'destination' ? null : 'destination')
                    }
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex flex-col justify-center ${
                      activePopover === 'destination'
                        ? 'bg-white dark:bg-white/15 shadow-sm border border-[#C95D39]/30'
                        : 'hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#756E64] dark:text-[#B3AA9E] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C95D39]" />
                      Pick A Place
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold text-[#171512] dark:text-[#F4EEE4] truncate">
                        {selectedDest}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#756E64] shrink-0" />
                    </div>
                  </button>

                  {/* Popover */}
                  <AnimatePresence>
                    {activePopover === 'destination' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-3 left-0 w-72 sm:w-80 z-50"
                      >
                        <VariantGlass
                          intensity="deep"
                          className="rounded-2xl p-3 shadow-2xl border-white/90 dark:border-white/20"
                        >
                          <div className="text-[11px] font-mono uppercase tracking-widest text-[#756E64] dark:text-[#B3AA9E] px-2 py-1 border-b border-black/5 dark:border-white/10 mb-2">
                            Where would you like to go?
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                            {destinationOptions.map((dest) => (
                              <button
                                key={dest}
                                type="button"
                                onClick={() => {
                                  setSelectedDest(dest);
                                  setActivePopover(null);
                                }}
                                className={`px-3 py-2 rounded-xl text-xs text-left font-medium flex items-center justify-between transition-colors ${
                                  selectedDest === dest
                                    ? 'bg-[#C95D39] text-white'
                                    : 'text-[#171512] dark:text-[#F4EEE4] hover:bg-black/5 dark:hover:bg-white/10'
                                }`}
                              >
                                <span>{dest}</span>
                                {selectedDest === dest && <Check className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </VariantGlass>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Field 2: When Are You Going? */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePopover(activePopover === 'when' ? null : 'when')
                    }
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex flex-col justify-center ${
                      activePopover === 'when'
                        ? 'bg-white dark:bg-white/15 shadow-sm border border-[#C95D39]/30'
                        : 'hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#756E64] dark:text-[#B3AA9E] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#174D47] dark:text-[#E0B36E]" />
                      When?
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold text-[#171512] dark:text-[#F4EEE4] truncate">
                        {selectedWhen.split(' ')[0]} {selectedWhen.split(' ')[1] || ''}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#756E64] shrink-0" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activePopover === 'when' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-3 left-0 w-80 z-50"
                      >
                        <VariantGlass
                          intensity="deep"
                          className="rounded-2xl p-3 shadow-2xl border-white/90 dark:border-white/20"
                        >
                          <div className="text-[11px] font-mono uppercase tracking-widest text-[#756E64] dark:text-[#B3AA9E] px-2 py-1 border-b border-black/5 dark:border-white/10 mb-2">
                            Select Timing
                          </div>
                          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                            {whenOptions.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setSelectedWhen(item);
                                  setActivePopover(null);
                                }}
                                className={`px-3 py-2 rounded-xl text-xs text-left font-medium flex items-center justify-between transition-colors ${
                                  selectedWhen === item
                                    ? 'bg-[#174D47] text-white dark:bg-[#1D5B54]'
                                    : 'text-[#171512] dark:text-[#F4EEE4] hover:bg-black/5 dark:hover:bg-white/10'
                                }`}
                              >
                                <span>{item}</span>
                                {selectedWhen === item && <Check className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </VariantGlass>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Field 3: Who Is Traveling? */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePopover(activePopover === 'travellers' ? null : 'travellers')
                    }
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex flex-col justify-center ${
                      activePopover === 'travellers'
                        ? 'bg-white dark:bg-white/15 shadow-sm border border-[#C95D39]/30'
                        : 'hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#756E64] dark:text-[#B3AA9E] flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#E0B36E]" />
                      Travellers
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold text-[#171512] dark:text-[#F4EEE4] truncate">
                        {selectedTravellers.split(' ')[0]} {selectedTravellers.split(' ')[1] || ''}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#756E64] shrink-0" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activePopover === 'travellers' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full mb-3 left-0 w-80 z-50"
                      >
                        <VariantGlass
                          intensity="deep"
                          className="rounded-2xl p-3 shadow-2xl border-white/90 dark:border-white/20"
                        >
                          <div className="text-[11px] font-mono uppercase tracking-widest text-[#756E64] dark:text-[#B3AA9E] px-2 py-1 border-b border-black/5 dark:border-white/10 mb-2">
                            Who is joining?
                          </div>
                          <div className="flex flex-col gap-1">
                            {travellerOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setSelectedTravellers(opt);
                                  setActivePopover(null);
                                }}
                                className={`px-3 py-2 rounded-xl text-xs text-left font-medium flex items-center justify-between transition-colors ${
                                  selectedTravellers === opt
                                    ? 'bg-[#C95D39] text-white'
                                    : 'text-[#171512] dark:text-[#F4EEE4] hover:bg-black/5 dark:hover:bg-white/10'
                                }`}
                              >
                                <span>{opt}</span>
                                {selectedTravellers === opt && <Check className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </VariantGlass>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary CTA: FIND MY TRIP → */}
                <div className="pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={handleSearchAction}
                    className="w-full h-12 rounded-2xl bg-[#C95D39] hover:bg-[#B34F2D] text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(201,93,57,0.35)] hover:shadow-[0_12px_28px_rgba(201,93,57,0.5)] transition-all duration-300 group"
                  >
                    <span>FIND MY TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </VariantGlass>
          </motion.div>
        </div>
      </div>

      {/* Minimal Scroll Anchor */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-6">
        <a
          href="#pinboard-morph"
          className="flex flex-col items-center gap-2 text-[#756E64] dark:text-[#B3AA9E] hover:text-[#C95D39] transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1.5px] h-6 bg-black/10 dark:bg-white/15 overflow-hidden rounded-full">
            <div className="w-full h-full bg-[#C95D39] scroll-line-anim origin-top" />
          </div>
        </a>
      </div>
    </section>
  );
}
