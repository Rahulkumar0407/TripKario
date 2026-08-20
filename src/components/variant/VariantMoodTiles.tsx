'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { moodTiles, MoodTile } from '@/data/variant/variantData';
import { ArrowUpRight } from 'lucide-react';

interface VariantMoodTilesProps {
  onSelectMood: (mood: MoodTile) => void;
}

export default function VariantMoodTiles({ onSelectMood }: VariantMoodTilesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="moods" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#E8DED0]/40 dark:bg-[#0D0C0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Simple Plain Language */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
                SCENE 04 · INTENT
              </span>
              <span className="h-px w-6 bg-[#C95D39]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F4EEE4] leading-tight">
              What kind of trip <br className="hidden sm:block" />
              do you want?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#756E64] dark:text-[#B3AA9E] max-w-md font-normal leading-relaxed">
            Pick by the kind of break you need. Every trip is planned around how you and your companions actually travel.
          </p>
        </div>

        {/* 6 Simple Mood Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {moodTiles.map((tile, idx) => {
            const isHovered = hoveredId === tile.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <motion.div
                key={tile.id}
                onMouseEnter={() => setHoveredId(tile.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectMood(tile)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`relative group cursor-pointer rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-between p-4 transition-all duration-500 border border-white/60 dark:border-white/10 ${
                  isHovered
                    ? 'lg:scale-[1.04] z-20 shadow-[0_30px_70px_rgba(23,21,18,0.18)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.7)]'
                    : isAnyHovered
                    ? 'opacity-60 scale-[0.98] z-10'
                    : 'shadow-[0_16px_40px_rgba(23,21,18,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)]'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                </div>

                {/* Top Tag & CTA Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <VariantGlass
                    intensity="subtle"
                    className="rounded-full px-2.5 py-1 text-[9px] font-mono text-white tracking-widest uppercase bg-black/40 backdrop-blur-md border-white/20"
                  >
                    {tile.tag}
                  </VariantGlass>

                  <div
                    className={`w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 ${
                      isHovered ? 'translate-x-0.5 -translate-y-0.5 bg-[#C95D39]' : ''
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                      {tile.title}
                    </h3>
                    <p className="text-[11px] text-[#E0B36E] font-medium tracking-wide mt-1">
                      {tile.subtitle}
                    </p>
                  </div>

                  <VariantGlass
                    intensity="deep"
                    className={`rounded-2xl p-3 border-white/20 transition-all duration-300 ${
                      isHovered ? 'translate-y-[-2px] shadow-lg' : ''
                    }`}
                  >
                    {tile.humorLine && (
                      <p className="text-[10px] font-mono text-[#E0B36E] mb-1 font-semibold">
                        &ldquo;{tile.humorLine}&rdquo;
                      </p>
                    )}
                    <p className="text-[11px] text-white/90 leading-snug line-clamp-2">
                      {tile.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/80">
                      <span>{tile.duration}</span>
                      <span className="text-[#E0B36E] font-bold">from {tile.priceFrom}</span>
                    </div>
                  </VariantGlass>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
