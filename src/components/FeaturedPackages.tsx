'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { tripPackages } from '@/data/trips';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import MagneticButton from './ui/MagneticButton';

interface FeaturedPackagesProps {
  onSelectTrip: (trip: TripPackage) => void;
  onOpenPlanTrip: () => void;
}

export default function FeaturedPackages({ onSelectTrip, onOpenPlanTrip }: FeaturedPackagesProps) {
  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tripPackages.slice(0, 3).map((trip) => {
            const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src;
            return (
              <div
                key={trip.id}
                onClick={() => onSelectTrip(trip)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-card)] hover:border-[var(--accent)] transition-all shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={coverSrc} alt={trip.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="saffron">{trip.destination}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-xl font-serif font-medium text-white line-clamp-1">{trip.title}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">{trip.shortDescription}</p>
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] block">From</span>
                      <span className="text-lg font-serif font-bold text-[var(--text-primary)]">{formatPrice(trip.pricePerPerson)}</span>
                    </div>
                    <MagneticButton className="px-4 h-9 rounded-full bg-[var(--accent)] text-white text-xs">
                      Explore
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
