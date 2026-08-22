'use client';

import React, { useState, useEffect } from 'react';
import { tripPackages as defaultTripPackages } from '@/data/trips';
import { loadClientTripPackages, TripPackage } from '@/lib/trips';
import TripCard from './TripCard';

interface TripGridProps {
  onSelectTrip: (trip: TripPackage) => void;
}

export default function TripGrid({ onSelectTrip }: TripGridProps) {
  const [trips, setTrips] = useState<TripPackage[]>(defaultTripPackages);

  useEffect(() => {
    setTrips(loadClientTripPackages());

    const handleUpdate = () => {
      setTrips(loadClientTripPackages());
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('tripkario-trips-updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('tripkario-trips-updated', handleUpdate);
    };
  }, []);

  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onSelect={onSelectTrip} />
          ))}
        </div>
      </div>
    </section>
  );
}
