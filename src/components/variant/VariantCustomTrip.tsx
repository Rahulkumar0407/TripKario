'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface VariantCustomTripProps {
  onOpenPlanTrip: () => void;
}

export default function VariantCustomTrip({ onOpenPlanTrip }: VariantCustomTripProps) {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#E8DED0]/40 dark:bg-[#11100E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Full-bleed Editorial Glass Card */}
        <div className="relative rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[540px] flex items-center justify-center p-6 sm:p-12 lg:p-16 border-4 sm:border-8 border-white dark:border-[#1F1C18] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] bg-[#E8DED0] dark:bg-[#171512]">
          {/* Background Ambient Photograph */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2600&auto=format&fit=crop"
              alt="Custom Travel Atmosphere in Rajasthan"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-[2px]" />
          </div>

          {/* Central Translucent Glass Master Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-3xl w-full text-center"
          >
            <VariantGlass
              intensity="deep"
              className="rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl border-white/80 dark:border-white/20"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C95D39]/15 border border-[#C95D39]/30 text-[11px] font-mono tracking-widest text-[#C95D39] dark:text-[#E06A42] uppercase font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Trip Planner</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171512] dark:text-[#F4EEE4] tracking-tight leading-tight">
                  Your trip can be different.
                </h2>

                <p className="text-base sm:text-xl font-mono text-[#174D47] dark:text-[#E0B36E] font-medium">
                  &ldquo;Aap destination batao. Baaki hum dekh lenge.&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[#756E64] dark:text-[#B3AA9E] max-w-lg mx-auto font-normal leading-relaxed">
                  Tell us where you want to go. We&apos;ll help plan the rest — cars, confirmed stays, passes, and daily routes.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenPlanTrip}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C95D39] hover:bg-[#B34F2D] text-white font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(201,93,57,0.4)] transition-all duration-300 group"
                  >
                    <span>BUILD MY TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href="https://wa.me/919999999999?text=Hi%20TripKario,%20I%20would%20like%20to%20plan%20a%20trip."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#171512] dark:text-[#F4EEE4] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-black/10 dark:border-white/20 transition-all duration-300"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#174D47] dark:text-[#E0B36E]" />
                    <span>Talk on WhatsApp</span>
                  </a>
                </div>
              </div>
            </VariantGlass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
