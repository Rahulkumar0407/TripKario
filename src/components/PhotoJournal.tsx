'use client';

import React from 'react';
import Image from 'next/image';
import { journalPhotos } from '@/data/gallery';

export default function PhotoJournal() {
  return (
    <section className="py-16 bg-[var(--bg-surface-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journalPhotos.map((photo) => (
            <div key={photo.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[var(--border-card)]">
              <Image src={photo.image} alt={photo.caption} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-mono text-[#F4A261]">{photo.location}</span>
                <p className="text-sm font-serif font-medium text-white">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
