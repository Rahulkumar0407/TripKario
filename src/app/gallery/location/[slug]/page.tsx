'use client';

import React, { useState, useEffect, useMemo, useCallback, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import { galleryImages as defaultGalleryImages, GalleryImage } from '@/data/gallery';
import {
  getLocationBySlug,
  loadClientGalleryImages,
  LocationGroup,
} from '@/lib/gallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LocationGalleryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  useEffect(() => {
    // 1. Initial fast display from cache if present
    setAllImages(loadClientGalleryImages());

    // 2. Fetch authoritative canonical gallery from backend
    fetch('/api/admin/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.images)) {
          setAllImages(data.images);
          try {
            localStorage.setItem('tripkario_admin_gallery', JSON.stringify(data.images));
          } catch (e) {}
        }
      })
      .catch((err) => {
        console.warn('Could not load location gallery from backend:', err);
      });

    const handleStorageChange = () => {
      fetch('/api/admin/gallery')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.images)) {
            setAllImages(data.images);
          }
        })
        .catch(() => {
          setAllImages(loadClientGalleryImages());
        });
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tripkario-gallery-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tripkario-gallery-updated', handleStorageChange);
    };
  }, []);

  // Find the location group matching this slug
  const locationGroup: LocationGroup | null = useMemo(() => {
    return getLocationBySlug(allImages, slug);
  }, [allImages, slug]);

  const photos = useMemo(() => {
    return locationGroup ? locationGroup.photos : [];
  }, [locationGroup]);

  const activePhoto = activeLightboxIndex !== null && photos[activeLightboxIndex] ? photos[activeLightboxIndex] : null;

  const handleNextPhoto = useCallback(() => {
    if (activeLightboxIndex === null || photos.length === 0) return;
    setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % photos.length);
  }, [activeLightboxIndex, photos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activeLightboxIndex === null || photos.length === 0) return;
    setActiveLightboxIndex((prev) => ((prev ?? 0) - 1 + photos.length) % photos.length);
  }, [activeLightboxIndex, photos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      else if (e.key === 'ArrowRight') handleNextPhoto();
      else if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNextPhoto, handlePrevPhoto]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex]);

  // 404 / Location Not Found State
  if (!locationGroup) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent)] selection:text-white">
        <Navbar onOpenPlanTrip={() => setIsPlanModalOpen(true)} />
        <main className="pt-32 pb-24 flex-1 flex items-center justify-center px-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-md w-full shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
              <Camera className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-medium text-[var(--text-primary)]">
                Location Not Found
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                We couldn&apos;t find an archive for this location, or all photographs from this place have been moved.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-semibold hover:opacity-90 transition-all shadow-md touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gallery Index</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent)] selection:text-white transition-colors duration-700">
      {/* Floating Navbar */}
      <Navbar onOpenPlanTrip={() => setIsPlanModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-24 md:pb-32 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-8 sm:space-y-12">
          {/* ── 01. Location Breadcrumb & Editorial Header ────────────────────── */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <Link
                href="/gallery"
                className="hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Gallery Archive</span>
              </Link>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-medium truncate">
                {locationGroup.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{locationGroup.count} {locationGroup.count === 1 ? 'Curated Print' : 'Curated Prints'}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-normal text-[var(--text-primary)] leading-[1.05] tracking-tight">
                {locationGroup.name}
              </h1>

              {locationGroup.caption && (
                <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal max-w-2xl leading-relaxed pt-1">
                  {locationGroup.caption}
                </p>
              )}
            </div>
          </div>

          {/* ── 02. Photographic Editorial Spread Grid ────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {photos.map((photo, idx) => {
              const rotClass = idx % 2 === 0 ? '-rotate-0.5' : 'rotate-0.5';
              const heightClass =
                photo.aspect === 'portrait'
                  ? 'h-80 sm:h-96'
                  : photo.aspect === 'square'
                  ? 'h-72 sm:h-80'
                  : 'h-60 sm:h-68';

              return (
                <div
                  key={photo.id}
                  data-photo-index={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`group cursor-pointer rounded-3xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-md hover:shadow-2xl transition-all duration-300 transform ${rotClass} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
                >
                  {/* Photo Container */}
                  <div className={`relative w-full overflow-hidden bg-black/20 ${heightClass}`}>
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt || `${locationGroup.name} photograph`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      loading={idx < 3 ? undefined : 'lazy'}
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                    {/* Stamp / Index badge */}
                    <div className="absolute top-3 left-3 pointer-events-none z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-wider border border-white/20">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Location Title overlay */}
                    <div className="absolute bottom-3 left-4 right-4 pointer-events-none z-10 space-y-0.5">
                      <h3 className="text-base font-serif font-medium text-white line-clamp-1 drop-shadow-sm">
                        {photo.location}
                      </h3>
                    </div>
                  </div>

                  {/* Metadata Footer */}
                  <div className="p-4 sm:p-5 space-y-2 bg-[var(--bg-surface)]">
                    {photo.caption && (
                      <p className="text-xs text-[var(--text-muted)] font-sans line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    )}

                    <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span className="truncate flex items-center gap-1.5 text-[var(--text-primary)]">
                        {photo.tripName ? (
                          <>
                            <Compass className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                            <span className="truncate">{photo.tripName}</span>
                          </>
                        ) : (
                          <span>{locationGroup.name}</span>
                        )}
                      </span>

                      <span className="text-[var(--accent)] font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                        View ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── 03. Connected Itinerary Section / Bottom Card ─────────────────── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experience {locationGroup.name}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)]">
                Ready to explore {locationGroup.name} in person?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Our destination curators craft private journeys and guided photography circuits through this region.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/gallery"
                className="px-6 py-3 rounded-full border border-[var(--border-card)] hover:border-[var(--accent)] bg-[var(--bg-surface)] text-xs font-mono font-semibold text-[var(--text-primary)] transition-all active:scale-95 touch-manipulation cursor-pointer"
              >
                All Locations
              </Link>
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(true)}
                className="px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono font-semibold transition-all shadow-md active:scale-95 touch-manipulation cursor-pointer"
              >
                Plan Journey Here
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── 04. Fullscreen Lightbox Photo Viewer ─────────────────────────────── */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200 h-[100dvh] w-screen"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white z-20 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FFAA70]">
                <span>{locationGroup.name}</span>
                {activePhoto.elevation && (
                  <>
                    <span>·</span>
                    <span>{activePhoto.elevation}</span>
                  </>
                )}
              </div>
              <h2 className="text-base sm:text-xl font-serif font-medium text-white truncate max-w-md sm:max-w-xl">
                {activePhoto.location}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center touch-manipulation"
              aria-label="Close photo viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Stage: Photo Display */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.alt || activePhoto.location}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>

            {/* Left Prev Arrow (Within Location) */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="min-h-[44px] min-w-[44px] absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center touch-manipulation"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Next Arrow (Within Location) */}
            {photos.length > 1 && (
              <button
                type="button"
                onClick={handleNextPhoto}
                className="min-h-[44px] min-w-[44px] absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center touch-manipulation"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption, Trip Link, Index */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/80 text-xs font-mono pt-3 border-t border-white/10 max-w-5xl mx-auto w-full z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5 text-center sm:text-left">
              {activePhoto.caption && (
                <p className="text-xs sm:text-sm text-white/90 font-sans max-w-2xl">
                  {activePhoto.caption}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[11px] text-white/60">
                {(activeLightboxIndex ?? 0) + 1} / {photos.length}
              </span>

              {activePhoto.tripId && (
                <Link
                  href={`/itineraries/${activePhoto.tripId}`}
                  className="min-h-[38px] px-4 py-1.5 rounded-full bg-[var(--accent)] hover:opacity-90 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-xs touch-manipulation"
                >
                  <span>View Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

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
