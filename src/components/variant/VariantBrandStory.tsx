'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { brandPerspectives, BrandStoryPerspective } from '@/data/variant/variantData';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function VariantBrandStory() {
  const [activePerspIdx, setActivePerspIdx] = useState(0);
  const activePersp = brandPerspectives[activePerspIdx];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Giant Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14 sm:mb-18">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 08 · BRAND PERSPECTIVE
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[0.98]">
              India is bigger <br />
              <span className="text-[#174E48] dark:text-[#D4A467]">than a bucket list.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6D665E] dark:text-[#B6ADA1] max-w-lg font-normal leading-relaxed mt-4">
              Some places are worth visiting. Others are worth getting lost in.
            </p>
          </div>

          {/* Cultural Humour Cards */}
          <div className="lg:col-span-5 space-y-3 pt-2">
            <VariantGlass
              intensity="medium"
              className="rounded-2xl p-4 border-black/5 dark:border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#171512] dark:text-[#F5EFE6]">
                <span className="w-2 h-2 rounded-full bg-[#C85D3A] shrink-0" />
                <span>&ldquo;Budget sensible. Dreams ambitious.&rdquo;</span>
              </div>
            </VariantGlass>

            <VariantGlass
              intensity="medium"
              className="rounded-2xl p-4 border-black/5 dark:border-white/10 shadow-sm"
            >
              <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-[#171512] dark:text-[#F5EFE6]">
                <MessageCircle className="w-4 h-4 text-[#174E48] dark:text-[#D4A467] shrink-0" />
                <span>&ldquo;Planning a trip shouldn&apos;t require 47 WhatsApp messages.&rdquo;</span>
              </div>
            </VariantGlass>
          </div>
        </div>

        {/* Interactive Perspectives Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#151310] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(23,21,18,0.08)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10">
          {/* Left Col: Perspectives Selector Tabs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              {brandPerspectives.map((persp, idx) => {
                const isActive = idx === activePerspIdx;
                return (
                  <button
                    key={persp.id}
                    onClick={() => setActivePerspIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#174E48] text-white dark:bg-[#1E5A53] shadow-md'
                        : 'text-[#171512] dark:text-[#F5EFE6] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest block ${
                        isActive ? 'text-[#D4A467]' : 'text-[#6D665E] dark:text-[#B6ADA1]'
                      }`}>
                        {persp.tag}
                      </span>
                      <span className="text-lg font-bold tracking-tight mt-0.5 block">
                        {persp.headline}
                      </span>
                    </div>
                    <span className={`text-xs font-mono ${isActive ? 'text-white' : 'text-[#6D665E]'}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePersp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-2xl bg-[#F4EFE7] dark:bg-[#0D0C0A] border border-black/5 dark:border-white/10 text-xs sm:text-sm text-[#171512]/80 dark:text-[#F5EFE6]/80 leading-relaxed font-normal"
              >
                {activePersp.text}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Col: Large Photographic View */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-[#E8DED0] dark:bg-[#25221E] border-4 border-[#FBF8F1] dark:border-[#1F1C18]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersp.id}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activePersp.image}
                    alt={activePersp.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Tag */}
              <div className="absolute inset-x-4 bottom-4 z-10">
                <VariantGlass
                  intensity="photo"
                  className="rounded-xl p-3 text-white border-white/25 flex items-center justify-between"
                >
                  <span className="text-xs font-medium text-white/95 truncate">
                    {activePersp.headline}
                  </span>
                  <span className="text-[10px] font-mono text-[#D4A467] shrink-0">
                    {activePersp.location}
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
