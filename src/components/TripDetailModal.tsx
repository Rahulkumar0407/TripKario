'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, CheckCircle2, MessageSquare, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import { openWhatsApp } from '@/lib/whatsapp';

interface TripDetailModalProps {
  trip: TripPackage | null;
  onClose: () => void;
  onPlanCustom: (tripTitle: string) => void;
}

export default function TripDetailModal({
  trip,
  onClose,
  onPlanCustom,
}: TripDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gallery'>('itinerary');

  if (!trip) return null;

  const defaultExclusions = [
    'Airfare / Train tickets to starting city',
    'Personal expenses, laundry, and tips',
    'Monument entry fees not mentioned',
    'Travel insurance & medical expenses',
  ];

  const handleWhatsAppInquiry = () => {
    const text = `Hi TripKario! I am interested in booking "${trip.title}" (${trip.durationNights}N/${trip.durationDays}D in ${trip.destination}) starting at ${formatPrice(trip.pricePerPerson)}. Please share the detailed itinerary and next available dates.`;
    openWhatsApp(text);
  };

  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src;

  return (
    <Dialog open={!!trip} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-primary)]">
        {/* Cover Image & Header */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-black/10">
          <Image
            src={coverSrc}
            alt={trip.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="saffron">{trip.destination}</Badge>
            <Badge variant="secondary">{trip.category}</Badge>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-normal leading-tight mb-1 text-white">
              {trip.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {trip.durationNights} Nights / {trip.durationDays} Days
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {trip.rating} ({trip.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Route Bar */}
          {trip.route && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--bg-surface-2)] text-xs font-mono text-[var(--accent)] font-semibold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Route: {trip.route}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-[var(--border-subtle)] pb-2">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-[var(--accent)] text-white font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'inclusions'
                  ? 'bg-[var(--accent)] text-white font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Inclusions & Exclusions
            </button>
          </div>

          {/* Tab 1: Itinerary / Overview */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
              <p>{trip.longDescription}</p>
              <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-2">
                <span className="font-semibold text-[var(--text-primary)] block">Trip Highlights:</span>
                <ul className="list-disc list-inside space-y-1">
                  {trip.inclusions.slice(0, 4).map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Inclusions & Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">
                  ✓ What&apos;s Included
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
                  {trip.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-rose-600 dark:text-rose-400 block uppercase tracking-wider">
                  ✕ Not Included
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--text-muted)]">
                  {(trip.exclusions || defaultExclusions).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Pricing & CTA Footer */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Total Package Starting</span>
              <span className="text-2xl font-serif font-bold text-[var(--text-primary)]">
                {formatPrice(trip.pricePerPerson)}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]"> / person</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  onPlanCustom(trip.title);
                }}
                className="rounded-full text-xs"
              >
                Customize Route
              </Button>

              <Button
                variant="default"
                onClick={handleWhatsAppInquiry}
                className="gap-2 rounded-full text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Talk on WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
