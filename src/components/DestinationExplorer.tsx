'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';

interface DestinationExplorerProps {
  onSelectDestination: (destName: string) => void;
}

export default function DestinationExplorer({ onSelectDestination }: DestinationExplorerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDest = filtered[activeIdx] || destinations[0];

  return (
    <section id="destinations" className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
              Territory Highlights
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
              India is calling.
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination (e.g. Kash)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIdx(0);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[var(--bg-surface)] text-xs font-mono border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Visual Frame */}
          <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0"
              >
                <Image
                  src={typeof activeDest.image === 'string' ? activeDest.image : activeDest.image.src}
                  alt={typeof activeDest.image === 'string' ? activeDest.name : activeDest.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-6 left-6 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#F4A261] font-bold block mb-1">
                    {activeDest.region}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-serif font-normal text-white">
                    {activeDest.name}
                  </h3>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <p className="text-xs sm:text-sm text-white/85 max-w-md font-normal line-clamp-2">
                    {activeDest.description}
                  </p>
                  <MagneticButton
                    onClick={() => onSelectDestination(activeDest.name)}
                    className="px-6 h-11 rounded-full bg-[#E46B3B] hover:bg-[#ED7B4D] text-white flex items-center gap-2 shadow-lg"
                  >
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Selector List */}
          <div className="lg:col-span-4 space-y-3 max-h-[500px] overflow-y-auto no-scrollbar">
            {filtered.map((d, i) => {
              const isActive = activeDest.id === d.id;
              const imgSrc = typeof d.image === 'string' ? d.image : d.image.src;

              return (
                <div
                  key={d.id}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--bg-surface)] border-[var(--accent)] shadow-md'
                      : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-black/10">
                    <Image src={imgSrc} alt={d.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-[var(--text-primary)] block truncate">
                        {d.name}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                        From {formatPrice(d.startingPrice)}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[var(--text-muted)] line-clamp-1">
                      {d.tagline}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
