'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Star, Clock } from 'lucide-react';
import { tripPackages } from '@/data/trips';
import { formatPrice } from '@/lib/utils';
import MagneticButton from './ui/MagneticButton';
import TripDetailModal from './TripDetailModal';
import { TripPackage } from '@/types';

interface JourneyRailProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function JourneyRail({ onOpenPlanTrip }: JourneyRailProps) {
  const [selectedTrip, setSelectedTrip] = useState<TripPackage | null>(null);

  return (
    <section id="journeys" className="py-24 md:py-36 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Curated Journeys
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
            Journeys worth taking.
          </h2>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto no-scrollbar px-4 sm:px-10 pb-6">
        {tripPackages.map((trip) => {
          const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src;

          return (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              data-cursor="EXPLORE"
              className="w-[85vw] sm:w-[500px] md:w-[600px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] relative shrink-0 group cursor-pointer select-none"
            >
              <Image
                src={coverSrc}
                alt={trip.title}
                fill
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-5 left-5">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                  {trip.destination} · {trip.durationNights}N/{trip.durationDays}D
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-1">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-white/80 font-mono">
                    Route: {trip.route}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-white/70 block uppercase">From</span>
                    <span className="text-lg font-serif font-bold text-white">
                      {formatPrice(trip.pricePerPerson)}
                    </span>
                  </div>
                  <MagneticButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTrip(trip);
                    }}
                    className="px-5 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center gap-1.5 shadow-md"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TripDetailModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onPlanCustom={(tripTitle) => onOpenPlanTrip(tripTitle)}
      />
    </section>
  );
}
