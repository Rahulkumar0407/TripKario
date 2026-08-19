'use client';

import React from 'react';
import { tripPackages } from '@/data/trips';
import TripCard from './TripCard';
import { TripPackage } from '@/types';

interface TripGridProps {
  onSelectTrip: (trip: TripPackage) => void;
}

export default function TripGrid({ onSelectTrip }: TripGridProps) {
  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tripPackages.map((trip) => (
            <TripCard key={trip.id} trip={trip} onSelect={onSelectTrip} />
          ))}
        </div>
      </div>
    </section>
  );
}
