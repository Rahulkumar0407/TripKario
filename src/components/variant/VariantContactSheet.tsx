'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { contactSheetPhotos, ContactPhoto } from '@/data/variant/variantData';

export default function VariantContactSheet() {
  const [activePhoto, setActivePhoto] = useState<ContactPhoto | null>(null);

  return (
    <section id="editorial" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#E8DED0]/50 dark:bg-[#11100E] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C95D39] dark:text-[#E06A42] font-semibold">
                SCENE 05 · FIELD NOTES
              </span>
              <span className="h-px w-6 bg-[#C95D39]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F4EEE4] leading-tight">
              India, one photo <br className="hidden sm:block" />
              at a time.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#756E64] dark:text-[#B3AA9E] max-w-md font-normal leading-relaxed">
            Real moments from roads, mountain glades, spice alleys, and backwater mornings. No stock setups.
          </p>
        </div>

        {/* Physical Photo Board Contact Sheet Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {contactSheetPhotos.map((photo, index) => {
            const isHovered = activePhoto?.id === photo.id;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
                onMouseEnter={() => setActivePhoto(photo)}
                onMouseLeave={() => setActivePhoto(null)}
                style={{
                  rotate: `${photo.tilt}deg`,
                }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  photo.spanCol === 2 ? 'sm:col-span-2' : 'col-span-1'
                } ${isHovered ? 'z-30 scale-[1.03]' : 'z-10'}`}
              >
                {/* Physical Print Mount with Clean Paper Margins */}
                <div className="bg-white dark:bg-[#1A1815] p-3 sm:p-4 rounded-2xl shadow-[0_15px_40px_rgba(23,21,18,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10 transition-shadow duration-300 group-hover:shadow-[0_25px_60px_rgba(201,93,57,0.15)]">
                  {/* Photo Container */}
                  <div
                    className={`relative overflow-hidden rounded-xl bg-[#E8DED0] dark:bg-[#25221E] ${
                      photo.aspect === 'portrait'
                        ? 'aspect-[3/4]'
                        : photo.aspect === 'landscape'
                        ? 'aspect-[16/10]'
                        : photo.aspect === 'wide'
                        ? 'aspect-[16/9]'
                        : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isHovered ? 'scale-108' : 'scale-100'
                      }`}
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tiny Glass Caption (#17) */}
                    <div className="absolute inset-x-3 bottom-3 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <VariantGlass
                        intensity="deep"
                        className="rounded-xl p-2.5 text-white border-white/30"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#E0B36E]">
                          <span>{photo.location}</span>
                          <span>{photo.time}</span>
                        </div>
                        <p className="text-xs font-bold text-white mt-0.5 truncate">
                          {photo.title} · {photo.category}
                        </p>
                      </VariantGlass>
                    </div>
                  </div>

                  {/* Print Margins & Clean Metadata */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#756E64] dark:text-[#B3AA9E] px-1">
                    <span className="truncate">{photo.title}</span>
                    <span className="text-[10px] text-[#C95D39] dark:text-[#E06A42] shrink-0 font-medium">
                      {photo.category}
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
