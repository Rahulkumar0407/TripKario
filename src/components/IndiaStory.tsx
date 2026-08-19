'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';

interface IndiaStoryProps {
  onSelectDestination: (destName: string) => void;
}

export default function IndiaStory({ onSelectDestination }: IndiaStoryProps) {
  const [activeZone, setActiveZone] = useState<'NORTH' | 'WEST' | 'SOUTH' | 'NORTHEAST'>('NORTH');

  const zones: { id: 'NORTH' | 'WEST' | 'SOUTH' | 'NORTHEAST'; label: string; tagline: string }[] = [
    { id: 'NORTH', label: '01. North', tagline: 'Kashmir · Ladakh · Himachal' },
    { id: 'WEST', label: '02. West', tagline: 'Rajasthan · Thar Dunes' },
    { id: 'SOUTH', label: '03. South', tagline: 'Kerala Backwaters & Spice Hills' },
    { id: 'NORTHEAST', label: '04. Northeast', tagline: 'Meghalaya Rainforests & Living Roots' },
  ];

  const zoneDestinations = destinations.filter((d) => d.zone === activeZone);
  const featured = zoneDestinations[0] || destinations[0];

  return (
    <section className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block">
            Territory Stories
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
            One country. <br />
            Four distinct worlds.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal pt-1">
            Travel across regional geography from Himalayan mountain lakes to desert havelis, tropical backwaters, and subtropical rainforest bridges.
          </p>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-[var(--border-subtle)]">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeZone === z.id
                  ? 'bg-[var(--accent)] text-white shadow-md font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              <span>{z.label}</span>
              <span className="text-[10px] opacity-75">({z.tagline})</span>
            </button>
          ))}
        </div>

        {/* Feature Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Editorial Photo */}
          <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Overlaid Large Editorial Typography */}
                <div className="absolute top-6 left-6 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#F4A261] font-bold block mb-1">
                    {featured.region}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white">
                    {featured.name}
                  </h3>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <p className="text-xs sm:text-sm text-white/85 max-w-md font-normal line-clamp-2">
                    {featured.description}
                  </p>
                  <div className="text-[10px] font-mono text-white/50 shrink-0">
                    Photo — {featured.image.photographer}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Sub-Circuits & Inclusions */}
          <div className="lg:col-span-4 space-y-4">
            {zoneDestinations.map((d) => (
              <div
                key={d.id}
                onClick={() => onSelectDestination(d.name)}
                data-cursor="EXPLORE"
                className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] hover:border-[var(--accent)] shadow-xs hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase font-bold text-[var(--accent)] tracking-wider">
                    {d.name}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    From {formatPrice(d.startingPrice)}
                  </span>
                </div>
                <h4 className="text-base font-serif font-medium text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {d.tagline}
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                  {d.curatedHighlights?.map((h, i) => (
                    <span key={i} className="text-[10px] font-mono bg-[var(--bg-surface-2)] text-[var(--text-muted)] px-2 py-0.5 rounded-md">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2">
              <MagneticButton
                onClick={() => onSelectDestination(featured.name)}
                className="w-full h-12 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg flex items-center justify-center gap-2"
              >
                <span>EXPLORE {featured.name.toUpperCase()} JOURNEYS</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
