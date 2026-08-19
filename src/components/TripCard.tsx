'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import MagneticButton from './ui/MagneticButton';

interface TripCardProps {
  trip: TripPackage;
  onSelect: (trip: TripPackage) => void;
}

export default function TripCard({ trip, onSelect }: TripCardProps) {
  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src;

  return (
    <Card
      onClick={() => onSelect(trip)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-[var(--border-card)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
        <Image
          src={coverSrc}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <Badge variant="saffron">{trip.destination}</Badge>
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[11px] font-mono text-[#F4A261] uppercase tracking-wider block">
            {trip.durationNights}N / {trip.durationDays}D
          </span>
          <h3 className="text-lg font-serif font-medium text-white line-clamp-1">
            {trip.title}
          </h3>
        </div>
      </div>

      <CardContent className="p-5 space-y-3">
        <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
          {trip.shortDescription}
        </p>

        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">From</span>
            <span className="text-lg font-serif font-bold text-[var(--text-primary)]">
              {formatPrice(trip.pricePerPerson)}
            </span>
          </div>

          <MagneticButton
            onClick={(e) => {
              e.stopPropagation();
              onSelect(trip);
            }}
            className="px-4 h-9 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs flex items-center gap-1"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>
      </CardContent>
    </Card>
  );
}
