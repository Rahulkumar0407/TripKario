'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import { GalleryImage } from '@/data/gallery';
import { groupGalleryByLocation, loadClientGalleryImages, LocationGroup } from '@/lib/gallery';

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    setAllImages(loadClientGalleryImages());

    const handleStorageChange = () => {
      setAllImages(loadClientGalleryImages());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tripkario-gallery-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tripkario-gallery-updated', handleStorageChange);
    };
  }, []);

  // Derive location groups dynamically from canonical photos
  const locationGroups: LocationGroup[] = useMemo(() => {
    return groupGalleryByLocation(allImages);
  }, [allImages]);

  // Total photographs count
  const totalPhotosCount = useMemo(() => {
    return allImages.length;
  }, [allImages]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent)] selection:text-white transition-colors duration-700">
      {/* Floating Navbar */}
      <Navbar onOpenPlanTrip={() => setIsPlanModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-24 md:pb-32 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-10 sm:space-y-14">
          {/* ── 01. Editorial Photographic Journal Hero ──────────────────────── */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] shadow-xs">
              <Camera className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>TripKario Photographic Journal</span>
              <span className="opacity-40">·</span>
              <span className="font-bold text-[var(--text-primary)]">
                {locationGroups.length} {locationGroups.length === 1 ? 'Location' : 'Locations'} Archive
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
              India, in{' '}
              <span className="italic font-normal text-[var(--accent)]">
                frames.
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed">
              A location-first archive of places, mountain roads, and quiet moments captured along our bespoke travel routes. Explore each place through its curated photograph collection.
            </p>
          </div>

          {/* ── 02. Location Index Section ───────────────────────────────────── */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 text-xs font-mono">
              <span className="text-[var(--text-muted)] uppercase tracking-widest text-[11px] font-semibold">
                Places we&apos;ve captured
              </span>
              <span className="text-[var(--text-muted)]">
                {totalPhotosCount} {totalPhotosCount === 1 ? 'photograph' : 'photographs'} total
              </span>
            </div>

            {locationGroups.length === 0 ? (
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)]">
                    Gallery coming to life.
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    Upload your first travel photograph from the admin console.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/itineraries"
                    className="inline-block px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-all shadow-xs"
                  >
                    Browse Travel Itineraries
                  </Link>
                </div>
              </div>
            ) : (
              /* Location Cards Grid: Single column on mobile, 2 col on tablet, 3 col on desktop */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {locationGroups.map((group, idx) => {
                  const numberString = String(idx + 1).padStart(2, '0');
                  const rotClass = idx % 3 === 0 ? '-rotate-0.5' : idx % 3 === 1 ? 'rotate-0.5' : '';

                  return (
                    <Link
                      key={group.slug}
                      href={`/gallery/location/${group.slug}`}
                      className={`group block rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-md hover:shadow-2xl transition-all duration-300 transform ${rotClass} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
                    >
                      {/* Featured Photograph Container */}
                      <div className="relative h-64 sm:h-72 w-full bg-black/20 overflow-hidden">
                        <Image
                          src={group.featuredImage.imageUrl}
                          alt={group.featuredImage.alt || `${group.name} photograph`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                          priority={idx === 0}
                          loading={idx === 0 ? undefined : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        {/* Photographic Numbering Stamp */}
                        <div className="absolute top-4 left-4 pointer-events-none z-10">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono tracking-widest border border-white/20 font-bold">
                            {numberString}
                          </span>
                        </div>

                        {/* Location Header on Image */}
                        <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FFAA70] tracking-wider uppercase font-semibold">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>Location Archive</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-serif font-medium text-white line-clamp-1 drop-shadow-sm">
                            {group.name}
                          </h2>
                        </div>
                      </div>

                      {/* Card Content & Action Footer */}
                      <div className="p-5 space-y-3 bg-[var(--bg-surface)] flex-1 flex flex-col justify-between">
                        {group.caption ? (
                          <p className="text-xs text-[var(--text-muted)] font-sans line-clamp-2 leading-relaxed">
                            {group.caption}
                          </p>
                        ) : (
                          <p className="text-xs text-[var(--text-muted)] font-sans italic">
                            Photographic collection from {group.name}.
                          </p>
                        )}

                        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                          <span className="text-[var(--text-primary)] font-semibold tracking-wider">
                            {group.count} {group.count === 1 ? 'FRAME' : 'FRAMES'}
                          </span>

                          <span className="text-[var(--accent)] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>Explore Archive</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── 03. Bottom Custom Itinerary Note ─────────────────────────────── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Want to see these locations in person?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)]">
                Every location in this archive is part of a verified TripKario itinerary.
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Browse our curated routes or let our team design a bespoke private journey tailored to you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/itineraries"
                className="px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono font-semibold transition-all shadow-md active:scale-95 touch-manipulation"
              >
                Browse Itineraries
              </Link>
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(true)}
                className="px-6 py-3 rounded-full border border-[var(--border-card)] hover:border-[var(--accent)] bg-[var(--bg-surface)] text-xs font-mono font-semibold text-[var(--text-primary)] transition-all active:scale-95 touch-manipulation cursor-pointer"
              >
                Plan Custom Route
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Plan Trip Modal */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot & WhatsApp */}
      <TravelChatbot />
      <WhatsAppButton />
    </div>
  );
}
