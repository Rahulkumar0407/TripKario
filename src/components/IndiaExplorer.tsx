'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import MagneticButton from './ui/MagneticButton';

interface IndiaExplorerProps {
  onSelectDestination: (destName: string) => void;
}

export default function IndiaExplorer({ onSelectDestination }: IndiaExplorerProps) {
  const [activeZone, setActiveZone] = useState<string>('All');

  const filtered = activeZone === 'All'
    ? destinations
    : destinations.filter((d) => d.zone === activeZone);

  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((dest) => {
            const imgSrc = typeof dest.image === 'string' ? dest.image : dest.image.src;
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.name)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-card)] hover:border-[var(--accent)] transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={imgSrc} alt={dest.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono text-[#F4A261] uppercase">{dest.region}</span>
                    <h3 className="text-2xl font-serif font-medium text-white">{dest.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold">From {formatPrice(dest.startingPrice)}</span>
                  <MagneticButton className="px-4 h-9 rounded-full bg-[var(--accent)] text-white text-xs">
                    Explore
                  </MagneticButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
