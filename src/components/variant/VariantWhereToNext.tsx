'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import TripkarioLogo from '@/components/TripkarioLogo';
import { ArrowRight, Compass } from 'lucide-react';

interface VariantWhereToNextProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function VariantWhereToNext({ onOpenPlanTrip }: VariantWhereToNextProps) {
  const [selectedDest, setSelectedDest] = useState('Kashmir');

  const destinations = [
    {
      name: 'Kashmir',
      code: 'SXR',
      duration: '6N/7D',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=600&auto=format&fit=crop',
      tilt: -2,
    },
    {
      name: 'Rajasthan',
      code: 'JAI',
      duration: '5N/6D',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=600&auto=format&fit=crop',
      tilt: 1.5,
    },
    {
      name: 'Kerala',
      code: 'COK',
      duration: '5N/6D',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=600&auto=format&fit=crop',
      tilt: -1.2,
    },
    {
      name: 'Ladakh',
      code: 'IXL',
      duration: '7N/8D',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=600&auto=format&fit=crop',
      tilt: 2,
    },
    {
      name: 'Meghalaya',
      code: 'GAU',
      duration: '4N/5D',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=600&auto=format&fit=crop',
      tilt: -1.8,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F3EFE6] dark:bg-[#0D0C0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto text-center">
        {/* Editorial Subtitle & Heading: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
              SCENE 10 · THE FULL CIRCLE PINBOARD
            </span>
            <span className="h-px w-6 bg-[#C95D39]/30" />
          </div>

          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-[#171512] dark:text-[#F4EEE4] tracking-tight leading-none uppercase mb-4">
            WHERE TO NEXT?
          </h2>

          <p className="text-base sm:text-lg text-[#756E64] dark:text-[#B3AA9E] max-w-md mx-auto font-normal leading-relaxed mb-12">
            Pick your next destination and we&apos;ll get everything started.
          </p>
        </motion.div>

        {/* The Gathering Final Pinboard Layout: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto rounded-3xl bg-[#E8DED0]/60 dark:bg-[#171512] p-6 sm:p-10 border-4 sm:border-8 border-white dark:border-[#1F1C18] shadow-[0_24px_80px_rgba(23,21,18,0.1)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)] mb-12"
        >
          {/* Centered Brand Badge */}
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-white dark:bg-[#1A1815] rounded-2xl shadow-md border border-black/5 dark:border-white/10">
              <TripkarioLogo badgeSize={38} showWordmark={true} />
            </div>
          </div>

          {/* Pinned Photos Arranged Around Center */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {destinations.map((dest, idx) => {
              const isSelected = selectedDest === dest.name;
              return (
                <motion.button
                  key={dest.name}
                  type="button"
                  onClick={() => setSelectedDest(dest.name)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.04, zIndex: 20 }}
                  style={{ rotate: `${dest.tilt}deg` }}
                  className={`p-2.5 rounded-2xl transition-all duration-300 text-left cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#25221E] shadow-xl ring-2 ring-[#C95D39] scale-102 z-10'
                      : 'bg-white/80 dark:bg-[#1F1C18] shadow-md hover:bg-white dark:hover:bg-[#25221E]'
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-[#E8DED0]">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 150px, 200px"
                      className="object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-[9px] font-mono text-white">
                      {dest.code}
                    </span>
                  </div>

                  <div className="px-1">
                    <span className="text-xs font-bold text-[#171512] dark:text-white block">
                      {dest.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#756E64] dark:text-[#B3AA9E] block">
                      {dest.duration}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Final CTA Button: PLAN MY TRIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => onOpenPlanTrip(selectedDest)}
            className="px-10 py-5 rounded-full bg-[#C95D39] hover:bg-[#B34F2D] text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-[0_12px_36px_rgba(201,93,57,0.4)] hover:shadow-[0_16px_44px_rgba(201,93,57,0.55)] transition-all duration-300 group cursor-pointer"
          >
            <span>PLAN MY {selectedDest.toUpperCase()} TRIP</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </button>
        </motion.div>

        {/* Route Exit Line */}
        <div className="relative mt-16 max-w-xs mx-auto flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-[#C95D39] via-[#174D47] to-transparent" />
          <div className="flex items-center gap-2 mt-2 text-[10px] font-mono tracking-widest text-[#756E64] dark:text-[#B3AA9E] uppercase">
            <Compass className="w-3.5 h-3.5 text-[#C95D39]" />
            <span>TripKario Curated Journeys · India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
