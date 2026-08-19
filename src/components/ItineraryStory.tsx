'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import MagneticButton from './ui/MagneticButton';

export default function ItineraryStory() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  const itineraryDays = [
    {
      day: '01',
      title: 'Arrive in Srinagar',
      location: 'Dal Lake & Houseboat Stay',
      desc: 'Land in Srinagar to a warm private chauffeur welcome. Check into your handcrafted cedarwood houseboat on Dal Lake and embark on a tranquil sunset Shikara cruise.',
      highlights: ['Chauffeur Airport Pickup', 'Handcrafted Cedar Houseboat', 'Private Sunset Shikara Cruise'],
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1400&auto=format&fit=crop',
    },
    {
      day: '02',
      title: 'Gulmarg Heights',
      location: 'Meadow of Flowers & Gondola Pass',
      desc: 'Ascend through dense pine forests to Gulmarg. Board the high-altitude Gondola Phase II to Mount Apharwat (13,780 ft) with pre-arranged zero-queue boarding passes.',
      highlights: ['Gondola Phase I & II Passes', 'Mount Apharwat Views', 'Alpine Pine Meadow Walks'],
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=85&w=1400&auto=format&fit=crop',
    },
    {
      day: '03',
      title: 'Pahalgam Valley',
      location: 'Betaab Valley & Lidder River',
      desc: 'Drive along saffron fields and walnut groves to Pahalgam. Stroll along the rushing turquoise Lidder river and explore Betaab Valley and Chandanwari trails.',
      highlights: ['Betaab Valley Excursion', 'Lidder Riverside Stroll', 'Riverside Pine Cottage'],
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1400&auto=format&fit=crop',
    },
    {
      day: '04',
      title: 'Sonamarg Glaciers',
      location: 'Golden Meadow & Sindh River',
      desc: 'Journey to the gateway of Ladakh along the sparkling Sindh river. Trek or ride to the Thajiwas Glacier surrounded by towering snow-capped Himalayan peaks.',
      highlights: ['Sindh River Scenic Drive', 'Thajiwas Glacier Trek', 'Sunset Return to Srinagar'],
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1400&auto=format&fit=crop',
    },
  ];

  const handleSelectDay = (idx: number) => {
    setDirection(idx > activeDayIdx ? 'right' : 'left');
    setActiveDayIdx(idx);
  };

  const currentDay = itineraryDays[activeDayIdx];

  return (
    <section id="itinerary" className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Scene Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Sticky Storytelling
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight mb-3">
            What the journey actually feels like.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal">
            Day 3. You&apos;ll want your camera ready. Experience how each day transforms smoothly into the next.
          </p>
        </div>

        {/* Sticky Itinerary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Pinned Image Frame */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] bg-[var(--bg-surface)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDay.day}
                  initial={{
                    opacity: 0,
                    x: direction === 'right' ? 30 : -30,
                    scale: 1.04,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: direction === 'right' ? -30 : 30,
                    scale: 0.97,
                  }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentDay.image}
                    alt={currentDay.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-widest font-bold">
                      DAY {currentDay.day} · {currentDay.location}
                    </span>
                  </div>

                  {/* Bottom Day Title */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                      {currentDay.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Days List / Progression */}
          <div className="lg:col-span-6 space-y-4">
            {itineraryDays.map((item, idx) => {
              const isActive = activeDayIdx === idx;

              return (
                <div
                  key={item.day}
                  onClick={() => handleSelectDay(idx)}
                  onMouseEnter={() => handleSelectDay(idx)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--bg-surface)] border-[var(--accent)] shadow-xl scale-[1.01]'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                      Day {item.day}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-subtle)]">
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-medium text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-[var(--bg-primary)] text-[10.5px] font-mono text-[var(--text-muted)] flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-[var(--accent)]" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex items-center justify-between">
              <MagneticButton
                onClick={() => openWhatsApp('Hi TripKario! I would like to book the signature 7-Day Kashmir itinerary.')}
                className="px-8 h-12 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-xl flex items-center gap-2"
              >
                <span>BOOK THIS ITINERARY</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
