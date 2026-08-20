'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

interface VariantCustomTripProps {
  onOpenPlanTrip: () => void;
}

export default function VariantCustomTrip({ onOpenPlanTrip }: VariantCustomTripProps) {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#FBF8F1]/60 dark:bg-[#151310] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Full-bleed Editorial Photographic Card with Photography as Primary (#11) */}
        <div className="relative rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[620px] flex items-center justify-center p-4 sm:p-8 lg:p-12 border-4 sm:border-8 border-white dark:border-[#1F1C18] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] bg-[#171512]">
          {/* Dominant Background Master Travel Photograph */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2600&auto=format&fit=crop"
              alt="Custom Travel Atmosphere in Rajasthan"
              fill
              sizes="100vw"
              className="object-cover scale-102 transition-transform duration-1000"
            />
            {/* Subtle Gradient Scrim - keeps photograph crisp & visible while ensuring text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 backdrop-blur-[1px]" />
          </div>

          {/* Staggered Floating Glass Billboard (#12) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-xl w-full text-center"
          >
            {/* Translucent Glass - lets the photograph breathe behind it */}
            <VariantGlass
              intensity="photo"
              className="rounded-3xl p-6 sm:p-10 lg:p-11 shadow-[0_24px_80px_rgba(0,0,0,0.55)] border-white/30 backdrop-blur-xl"
            >
              <div className="space-y-4 sm:space-y-5">
                {/* 01. Label */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C85D3A]/25 border border-[#C85D3A]/40 text-[10px] font-mono tracking-widest text-[#D4A467] uppercase font-semibold"
                >
                  <Sparkles className="w-3 h-3 text-[#D4A467]" />
                  <span>Custom Trip Planner</span>
                </motion.div>

                {/* 02. Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05]"
                >
                  Your trip can be different.
                </motion.h2>

                {/* 03. Hinglish Warmth Line */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-sm sm:text-base font-mono text-[#D4A467] font-semibold"
                >
                  &ldquo;Aap destination batao. Baaki hum dekh lenge.&rdquo;
                </motion.p>

                {/* 04. Simple Body Copy */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-xs sm:text-sm text-white/85 max-w-md mx-auto font-normal leading-relaxed"
                >
                  Tell us where you want to go. We&apos;ll help plan the rest — cars, confirmed boutique stays, passes, and daily routes.
                </motion.p>

                {/* 05. Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={onOpenPlanTrip}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_10px_28px_rgba(200,93,58,0.45)] hover:shadow-[0_14px_34px_rgba(200,93,58,0.6)] transition-all duration-300 group"
                  >
                    <span>BUILD MY TRIP</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openWhatsApp('Hi TripKario! I would like to plan a custom trip for our upcoming travel.')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/25 backdrop-blur-md transition-all duration-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#D4A467]" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </motion.div>
              </div>
            </VariantGlass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
