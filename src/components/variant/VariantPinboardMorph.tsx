'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface VariantPinboardMorphProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function VariantPinboardMorph({ onOpenPlanTrip }: VariantPinboardMorphProps) {
  return (
    <section
      id="pinboard-morph"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#FBF8F1]/60 dark:bg-[#151310] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
            FROM MEMORY TO DESTINATION
          </span>
          <span className="h-px w-6 bg-[#C85D3A]/30" />
        </div>

        {/* The Expanded Destination Board Experience */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] border-4 sm:border-8 border-white dark:border-[#1F1C18] bg-[#FBF8F1] dark:bg-[#171512] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-10 lg:p-14"
        >
          {/* Main Background Master Photograph */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=2600&auto=format&fit=crop"
              alt="Kashmir Dal Lake at Dawn"
              fill
              sizes="100vw"
              className="object-cover"
            />
            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
          </div>

          {/* Top Board Tag */}
          <div className="relative z-10 self-start">
            <VariantGlass
              intensity="deep"
              className="rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-white uppercase border-white/30"
            >
              Territory 01 · North India · 5,200 ft
            </VariantGlass>
          </div>

          {/* Bottom Content Spread */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Col: Giant Typography & Simple Pacing Words */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A467] font-semibold">
                LAKES · MOUNTAINS · QUIET MORNINGS
              </span>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none uppercase">
                KASHMIR
              </h2>
              <p className="text-base sm:text-lg text-white/90 max-w-xl font-normal leading-relaxed">
                Cedar houseboats on Dal Lake, morning kahwa in misty valleys, and snow passes in Gulmarg.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Private Sunset Shikara', 'Gulmarg Gondola Passes', 'Lidder Riverside Chalet'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-white/90 bg-white/10 backdrop-blur-md border border-white/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A467]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Col: Glass Action Island */}
            <div className="lg:col-span-5">
              <VariantGlass
                intensity="deep"
                className="rounded-3xl p-6 sm:p-7 shadow-2xl border-white/80 dark:border-white/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D665E] dark:text-[#B6ADA1] block">
                        Duration
                      </span>
                      <span className="text-base font-bold text-[#171512] dark:text-[#F5EFE6]">
                        6 Nights · 7 Days
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D665E] dark:text-[#B6ADA1] block">
                        From
                      </span>
                      <span className="text-xl font-bold text-[#174E48] dark:text-[#D4A467]">
                        ₹24,999
                      </span>
                      <span className="text-[10px] font-mono text-[#6D665E] dark:text-[#B6ADA1] block">
                        per person
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6D665E] dark:text-[#B6ADA1]">
                    Chauffeur pickup, daily breakfast & dinner, confirmed stays, and direct human concierge.
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenPlanTrip('Kashmir')}
                    className="w-full py-4 rounded-2xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#C85D3A]/30 transition-all duration-300 group"
                  >
                    <span>EXPLORE KASHMIR</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </VariantGlass>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
