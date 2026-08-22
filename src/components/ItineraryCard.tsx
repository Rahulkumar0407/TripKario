'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import { getOptimizedCardImageUrl } from '@/lib/imagekit';

export interface ItineraryCardProps {
  trip: TripPackage;
  index: number;
  isFirstHero: boolean;
  onSelect: (trip: TripPackage) => void;
}

function ItineraryCard({
  trip,
  index,
  isFirstHero,
  onSelect,
}: ItineraryCardProps) {
  const formattedPrice = formatPrice(trip.pricePerPerson, trip.isPriceOnRequest);
  const optimizedImageSrc = getOptimizedCardImageUrl(trip.coverImage, isFirstHero);
  const imageAlt = typeof trip.coverImage === 'string' ? trip.title : trip.coverImage?.alt || trip.title;

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(trip);
      }}
      onClick={() => onSelect(trip)}
      className={`group bg-[var(--bg-surface)] rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-xs transition-[transform,box-shadow,border-color] duration-200 flex flex-col justify-between cursor-pointer relative outline-none focus:ring-2 focus:ring-[var(--accent)] active:scale-[0.98] touch-manipulation min-w-0 w-full [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:border-[var(--accent)]/50 ${
        isFirstHero ? 'sm:col-span-2 lg:col-span-2 lg:flex-row' : ''
      } ${index >= 3 ? '[content-visibility:auto] [contain-intrinsic-size:auto_400px]' : ''}`}
    >
      {/* ── Cover Image Box ────────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden bg-black/20 ${
          isFirstHero
            ? 'w-full lg:w-1/2 h-52 sm:h-72 lg:h-auto min-h-[220px] sm:min-h-[240px]'
            : 'w-full h-48 sm:h-60'
        }`}
      >
        <Image
          src={optimizedImageSrc}
          alt={imageAlt}
          fill
          sizes={
            isFirstHero
              ? '(max-width: 1024px) 100vw, 60vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
          }
          className="object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-105"
          priority={index === 0}
          loading={index === 0 ? undefined : 'lazy'}
          decoding="async"
        />

        {/* Protective Charcoal Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Top Floating Badges (Crisp Translucent Black - Zero Blur Compositing Cost) */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/75 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{trip.destination}</span>
          </span>

          <span className="text-[10px] font-mono text-white bg-black/75 px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-sm shrink-0">
            <Clock className="w-3 h-3 text-[var(--accent)]" />
            <span>
              {trip.durationNights}N · {trip.durationDays}D
            </span>
          </span>
        </div>

        {/* Bottom Route Preview */}
        {trip.route && (
          <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 pointer-events-none z-10 min-w-0">
            <span className="text-[10.5px] sm:text-[11px] font-mono text-white/95 truncate block drop-shadow-sm">
              {trip.route}
            </span>
          </div>
        )}
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────── */}
      <div
        className={`p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4 min-w-0 ${
          isFirstHero ? 'lg:w-1/2' : ''
        }`}
      >
        <div className="space-y-2 min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            {trip.category && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold truncate">
                {trip.category}
              </span>
            )}
            {trip.featured && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[var(--accent)] px-2 py-0.5 rounded-full font-medium shadow-xs flex items-center gap-1 shrink-0">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <h3
            className={`font-serif font-normal text-[var(--text-primary)] leading-snug break-words min-w-0 [@media(hover:hover)]:group-hover:text-[var(--accent)] transition-colors ${
              isFirstHero ? 'text-xl sm:text-3xl' : 'text-base sm:text-xl'
            }`}
          >
            {trip.title}
          </h3>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed font-sans break-words min-w-0">
            {trip.shortDescription}
          </p>

          {/* Highlights Snippet */}
          {trip.highlights && trip.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono min-w-0">
              {trip.highlights.slice(0, 3).map((h, hi) => (
                <span
                  key={hi}
                  className="bg-[var(--bg-primary)] text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-subtle)] truncate max-w-full"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Pricing & CTA */}
        <div className="pt-3.5 sm:pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
              {trip.isPriceOnRequest ? 'Pricing' : 'Starting From'}
            </span>
            <span className="text-sm sm:text-lg font-serif font-medium text-[var(--text-primary)] truncate block">
              {formattedPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(trip);
            }}
            className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 shrink-0 [@media(hover:hover)]:group-hover:translate-x-0.5"
          >
            <span>Explore journey</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform [@media(hover:hover)]:group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ItineraryCard);
