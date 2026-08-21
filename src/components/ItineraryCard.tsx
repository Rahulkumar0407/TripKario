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
  isAuditMode: boolean;
  onSelect: (trip: TripPackage) => void;
}

function ItineraryCard({
  trip,
  index,
  isFirstHero,
  isAuditMode,
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
      className={`group bg-[var(--bg-surface)] rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-xs transition-[transform,box-shadow,border-color] duration-200 flex flex-col justify-between cursor-pointer relative outline-none focus:ring-2 focus:ring-[var(--accent)] active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:border-[var(--accent)]/50 ${
        isFirstHero ? 'sm:col-span-2 lg:col-span-2 lg:flex-row' : ''
      } ${index >= 3 ? '[content-visibility:auto] [contain-intrinsic-size:auto_420px]' : ''}`}
    >
      {/* ── Cover Image Box ────────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden bg-black/20 ${
          isFirstHero
            ? 'w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[260px]'
            : 'w-full h-60 sm:h-64'
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
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/75 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>{trip.destination}</span>
          </span>

          <span className="text-[10px] font-mono text-white bg-black/75 px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-sm">
            <Clock className="w-3 h-3 text-[var(--accent)]" />
            <span>
              {trip.durationNights}N · {trip.durationDays}D
            </span>
          </span>
        </div>

        {/* Bottom Route Preview */}
        {trip.route && (
          <div className="absolute bottom-3 left-4 right-4 pointer-events-none z-10">
            <span className="text-[11px] font-mono text-white/95 line-clamp-1 drop-shadow-sm">
              {trip.route}
            </span>
          </div>
        )}
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────── */}
      <div
        className={`p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 ${
          isFirstHero ? 'lg:w-1/2' : ''
        }`}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            {trip.category && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                {trip.category}
              </span>
            )}
            {trip.featured && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[var(--accent)] px-2 py-0.5 rounded-full font-medium shadow-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <h3
            className={`font-serif font-normal text-[var(--text-primary)] leading-snug [@media(hover:hover)]:group-hover:text-[var(--accent)] transition-colors ${
              isFirstHero ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {trip.title}
          </h3>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed font-sans">
            {trip.shortDescription}
          </p>

          {/* Highlights Snippet */}
          {trip.highlights && trip.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono">
              {trip.highlights.slice(0, 3).map((h, hi) => (
                <span
                  key={hi}
                  className="bg-[var(--bg-primary)] text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-subtle)] line-clamp-1"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* ── Development-Only Image Audit Overlay ──────────────────── */}
          {isAuditMode && (
            <div className="mt-3 p-3.5 rounded-2xl bg-black/90 text-stone-200 border border-amber-500/40 text-[11px] font-mono space-y-1.5 select-text shadow-lg">
              <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-1.5">
                <span className="text-amber-400 font-bold">
                  #{index + 1} ID: {trip.id}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-semibold">
                  {trip.destinationId}
                </span>
              </div>
              <div className="space-y-1 text-[10px] leading-tight">
                <div className="flex items-start gap-1">
                  <span className="text-stone-400 whitespace-nowrap">📍 Location:</span>
                  <span className="text-emerald-300 font-medium line-clamp-1">
                    {typeof trip.coverImage === 'object' && trip.coverImage?.location
                      ? trip.coverImage.location
                      : 'None specified'}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-stone-400 whitespace-nowrap">🏛️ Source:</span>
                  <span className="text-sky-300 font-medium line-clamp-1">
                    {trip.sourceMetadata?.source ||
                      trip.sourceMetadata?.sourceName ||
                      (typeof trip.coverImage === 'object' && trip.coverImage?.source) ||
                      'N/A'}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-stone-400 whitespace-nowrap">📝 Alt:</span>
                  <span className="text-stone-300 italic line-clamp-1">
                    &ldquo;{typeof trip.coverImage === 'object' ? trip.coverImage?.alt : trip.title}&rdquo;
                  </span>
                </div>
                {typeof trip.coverImage === 'object' && trip.coverImage?.photographer && (
                  <div className="flex items-start gap-1">
                    <span className="text-stone-400 whitespace-nowrap">👤 Photographer:</span>
                    <span className="text-stone-300">{trip.coverImage.photographer}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Pricing & CTA */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
              {trip.isPriceOnRequest ? 'Pricing' : 'Starting From'}
            </span>
            <span className="text-base sm:text-lg font-serif font-medium text-[var(--text-primary)]">
              {formattedPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(trip);
            }}
            className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 [@media(hover:hover)]:group-hover:translate-x-0.5"
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
