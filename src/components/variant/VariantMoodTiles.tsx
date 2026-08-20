'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { moodTiles, MoodTile } from '@/data/variant/variantData';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';

interface VariantMoodTilesProps {
  onSelectMood: (mood: MoodTile) => void;
}

export default function VariantMoodTiles({ onSelectMood }: VariantMoodTilesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Enter directions for physical tabletop assembly motion (#19)
  const enterVariants = [
    { x: -40, y: 0 },   // Card 1: from left
    { x: 0, y: 45 },    // Card 2: from bottom
    { x: 0, y: -45 },   // Card 3: from top
    { x: 40, y: 0 },    // Card 4: from right
    { x: 0, y: 45 },    // Card 5: from bottom
    { x: 0, y: -45 },   // Card 6: from top
  ];

  return (
    <section
      id="moods"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#FBF8F1]/70 dark:bg-[#151310] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 max-w-5xl"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                SCENE 04 · CHOOSE YOUR MOOD
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              What kind of trip <br />
              do you want?
            </h2>
          </div>

          <div className="md:max-w-xs lg:max-w-sm pb-1">
            <p className="text-sm sm:text-base text-[#6D665E] dark:text-[#B6ADA1] font-normal leading-relaxed">
              Pick by the break you need. Every journey is planned around how you and your companions actually travel.
            </p>
          </div>
        </motion.div>

        {/* Visual Hierarchy Grid: 1 Featured + 2 Medium + 3 Supporting Cards (#14) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {moodTiles.map((tile, idx) => {
            const isHovered = hoveredId === tile.id;
            const isAnyHovered = hoveredId !== null;
            const isFeatured = idx === 0; // 01 Weekend is Featured (approx 20% larger prominence)
            const isMedium = idx === 1 || idx === 3; // Honeymoon & Adventure

            // Dynamic column spans for editorial rhythm
            const colSpanClass = isFeatured
              ? 'lg:col-span-4 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px]'
              : isMedium
              ? 'lg:col-span-4 min-h-[380px] sm:min-h-[420px] lg:min-h-[470px]'
              : 'lg:col-span-4 min-h-[360px] sm:min-h-[400px] lg:min-h-[450px]';

            const enterOffset = enterVariants[idx % enterVariants.length];

            return (
              <motion.div
                key={tile.id}
                onMouseEnter={() => setHoveredId(tile.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectMood(tile)}
                initial={{ opacity: 0, x: enterOffset.x, y: enterOffset.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative group cursor-pointer rounded-3xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 transition-all duration-500 border border-white/70 dark:border-white/10 ${colSpanClass} ${
                  isHovered
                    ? 'scale-[1.018] z-20 shadow-[0_28px_70px_rgba(23,21,18,0.18)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.7)] ring-2 ring-[#C85D3A]/40'
                    : isAnyHovered
                    ? 'opacity-65 scale-[0.985] z-10'
                    : 'shadow-[0_16px_40px_rgba(23,21,18,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
                }`}
              >
                {/* Background Image with Fallback and Localized Bottom Gradient (#16) */}
                <div className="absolute inset-0 z-0 bg-[#E8DED0] dark:bg-[#1C1916]">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                </div>

                {/* Top Row: Tag + Featured Badge (#17) */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <VariantGlass
                    intensity="pill"
                    className="rounded-full px-3 py-1 text-[11px] font-mono tracking-wider text-white uppercase border-white/20"
                  >
                    {tile.tag}
                  </VariantGlass>

                  {isFeatured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C85D3A] text-white text-[10px] font-mono uppercase font-bold tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Bottom Content: Connected Text & Action (#18) */}
                <div className="relative z-10 space-y-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight uppercase">
                      {tile.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 font-normal leading-relaxed line-clamp-2 mt-1">
                      {tile.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/15">
                    <span className="text-[11px] font-mono text-[#D4A467] flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#C85D3A]" />
                      {tile.destinationHint}
                    </span>

                    <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#C85D3A] text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
