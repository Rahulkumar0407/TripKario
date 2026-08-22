import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Star,
  Sparkles,
  ArrowLeft,
  Utensils,
  Moon,
  ShieldCheck,
  Compass,
  ChevronRight,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getCanonicalServerTrip, getAllCanonicalServerTrips } from '@/lib/serverTrips';
import { formatPrice } from '@/lib/utils';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface PageProps {
  params: Promise<{ tripId: string }>;
}

export async function generateStaticParams() {
  const allTrips = getAllCanonicalServerTrips();
  return allTrips.map((trip) => ({
    tripId: trip.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tripId } = await params;
  const trip = getCanonicalServerTrip(tripId, false);

  if (!trip) {
    return {
      title: 'Itinerary Not Found | TripKario',
      description: 'The requested curated itinerary could not be found.',
    };
  }

  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage.src;
  const priceText = trip.isPriceOnRequest || !trip.pricePerPerson ? 'Price on Request' : `From ${formatPrice(trip.pricePerPerson)}`;

  return {
    title: `${trip.title} (${trip.durationNights}N/${trip.durationDays}D) | TripKario`,
    description: `${trip.shortDescription} Route: ${trip.route}. ${priceText}. Handcrafted by TripKario.`,
    openGraph: {
      title: `${trip.title} | TripKario Curated Itinerary`,
      description: trip.shortDescription,
      images: [
        {
          url: coverSrc,
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
    },
  };
}

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { tripId } = await params;
  const trip = getCanonicalServerTrip(tripId, false);

  if (!trip) {
    notFound();
  }

  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage?.src;
  const formattedPrice = formatPrice(trip.pricePerPerson, trip.isPriceOnRequest);
  const defaultExclusions = [
    'Airfare / Train tickets to starting point',
    'Personal expenses, laundry, telephone, and tipping',
    'Monument entry tickets, camera fees, or optional adventure activities not mentioned in inclusions',
    'Cost arising from natural calamities, roadblocks, or flight cancellations',
    'Personal travel and medical insurance',
  ];
  const exclusionsList = trip.exclusions && trip.exclusions.length > 0 ? trip.exclusions : defaultExclusions;

  const priceText =
    trip.isPriceOnRequest || !trip.pricePerPerson || trip.pricePerPerson <= 0
      ? 'Price on request'
      : `starting at ${formatPrice(trip.pricePerPerson)}`;
  const routeText = trip.route ? `\nRoute: ${trip.route}` : '';
  const whatsAppMessage = `Hi TripKario,
I am interested in booking:
"${trip.title}"

Destination: ${trip.destination}
Duration: ${trip.durationNights} Nights · ${trip.durationDays} Days${routeText}
Pricing: ${priceText}

I would like to check available departure dates and get the complete day-by-day plan.`;
  const whatsAppUrl = getWhatsAppUrl(whatsAppMessage);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar />

      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 text-xs font-mono">
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Itineraries</span>
          </Link>

          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
            Canonical ID: <code className="text-[var(--accent)] font-bold">{trip.id}</code>
          </span>
        </div>

        {/* ── 01. EDITORIAL HERO HEADER ── */}
        <div className="relative aspect-[21/10] sm:aspect-[16/7] md:aspect-[16/6] w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] bg-black/20">
          {coverSrc && (
            <Image
              src={coverSrc}
              alt={trip.coverImage?.alt || trip.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

          {/* Top Destination & Duration Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-[#E46B3B] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
              {trip.destination}
            </span>
            {trip.category && (
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-semibold uppercase tracking-wider border border-white/15">
                {trip.category}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-mono font-semibold uppercase tracking-wider border border-white/20">
              {trip.durationNights}N · {trip.durationDays}D
            </span>
          </div>

          {/* Bottom Title & Price Headline */}
          <div className="absolute bottom-5 left-5 right-5 text-white space-y-2.5 z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/15 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-bold text-[#FFAA70]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {trip.rating || 4.9} ({trip.reviewCount || 48} reviews)
                </span>
                <span>•</span>
                <span className="text-white/80">
                  {trip.durationDays} Days Comprehensive Circuit
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] text-white/70 uppercase">Starting:</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {formattedPrice}
                </span>
                {!trip.isPriceOnRequest && trip.pricePerPerson > 0 && (
                  <span className="text-xs text-white/80">/ person</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 02. COMPLETE ROUTE BAR ── */}
        {trip.route && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] font-semibold border border-[var(--border-subtle)] shadow-sm">
            <MapPin className="w-4 h-4 shrink-0 text-[var(--accent)]" />
            <span className="uppercase text-[10px] tracking-wider text-[var(--text-muted)] shrink-0 font-bold">
              Complete Route:
            </span>
            <span className="text-[var(--text-primary)] leading-normal">{trip.route}</span>
          </div>
        )}

        {/* ── 03. OVERVIEW & HIGHLIGHTS ── */}
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-medium text-[var(--text-primary)]">
              Journey Overview
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-light">
              {trip.longDescription || trip.shortDescription}
            </p>
          </div>

          {/* Curated Highlights */}
          {trip.highlights && trip.highlights.length > 0 && (
            <div className="pt-2 space-y-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {trip.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] flex items-center gap-2.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── 04. VERTICAL DAY-BY-DAY TIMELINE ── */}
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] p-6 sm:p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <h2 className="text-xl font-serif font-medium text-[var(--text-primary)]">
                The Day-by-Day Journey
              </h2>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                {trip.itinerary?.length || trip.durationDays} Days Comprehensive Verified Itinerary
              </p>
            </div>
          </div>

          {trip.itinerary && trip.itinerary.length > 0 ? (
            <div className="relative pl-5 sm:pl-8 border-l-2 border-[var(--border-subtle)] space-y-6 sm:space-y-8 my-4 ml-2.5 sm:ml-4 min-w-0 max-w-full">
              {trip.itinerary.map((day, index) => {
                const dayFormatted = String(day.dayNumber).padStart(2, '0');

                return (
                  <div key={day.dayNumber || index} className="relative group min-w-0 max-w-full">
                    {/* Timeline Milestone Dot */}
                    <div className="absolute -left-[27px] sm:-left-[39px] top-2.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center shadow-xs">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent)]" />
                    </div>

                    {/* Milestone Content Box */}
                    <div className="rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] p-4 sm:p-6 space-y-3 sm:space-y-3.5 transition-all hover:border-[var(--accent)]/40 hover:shadow-sm min-w-0 max-w-full">
                      {/* Header: Day Badge + Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                        <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
                          <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider shrink-0 mt-0.5 sm:mt-0">
                            DAY {dayFormatted}
                          </span>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug break-words min-w-0 flex-1">
                            {day.title}
                          </h3>
                        </div>

                        {day.location && (
                          <span className="self-start sm:self-auto px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[9.5px] sm:text-[10.5px] font-mono font-semibold shrink-0">
                            📍 {day.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal break-words min-w-0">
                        {day.description}
                      </p>

                      {/* Key Places Tags */}
                      {day.places && day.places.length > 0 && (
                        <div className="pt-1 flex flex-wrap items-center gap-1.5 min-w-0">
                          <span className="text-[9.5px] font-mono uppercase text-[var(--text-muted)] font-bold mr-0.5 shrink-0">
                            Key Stops:
                          </span>
                          {day.places.map((place, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] sm:text-[10.5px] font-mono text-[var(--text-primary)] break-words max-w-full"
                            >
                              {place}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Activities Tags */}
                      {day.activities && day.activities.length > 0 && (
                        <div className="pt-0.5 flex flex-wrap items-center gap-1.5 min-w-0">
                          <span className="text-[9.5px] font-mono uppercase text-[var(--accent)] font-bold mr-0.5 shrink-0">
                            Experiences:
                          </span>
                          {day.activities.map((act, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] sm:text-[10.5px] font-mono font-medium break-words max-w-full"
                            >
                              ✦ {act}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meals & Overnight Info */}
                      {(day.meals || day.overnight) && (
                        <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] sm:text-[11px] font-mono text-[var(--text-muted)] min-w-0">
                          {day.meals && (
                            <div className="flex items-center gap-1 min-w-0">
                              <Utensils className="w-3 h-3 text-[var(--accent)] shrink-0" />
                              <span className="break-words">Meals: {day.meals}</span>
                            </div>
                          )}
                          {day.overnight && (
                            <div className="flex items-center gap-1 min-w-0">
                              <Moon className="w-3 h-3 text-[var(--accent)] shrink-0" />
                              <span className="break-words">Stay: {day.overnight}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Day-by-day plan is verified and customized upon inquiry.
            </p>
          )}
        </div>

        {/* ── 05. INCLUSIONS & EXCLUSIONS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>What&apos;s Included</span>
            </div>
            <ul className="space-y-3 text-xs text-[var(--text-muted)] font-normal">
              {trip.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-rose-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>What&apos;s Not Included</span>
            </div>
            <ul className="space-y-3 text-xs text-[var(--text-muted)] font-normal">
              {exclusionsList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 06. STICKY BOOKING ACTION BAR ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block font-semibold">
              {!trip.isPriceOnRequest && trip.pricePerPerson > 0 ? 'Starting From' : 'Package Pricing'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                {formattedPrice}
              </span>
              {!trip.isPriceOnRequest && trip.pricePerPerson > 0 && (
                <span className="text-xs font-mono text-[var(--text-muted)]">/ person</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/itineraries"
              className="px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-[var(--border-card)] hover:bg-[var(--bg-surface-2)] transition-colors"
            >
              Explore Other Trips
            </Link>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-lg shadow-[#E46B3B]/25 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <TravelChatbot />
      <WhatsAppButton />
    </main>
  );
}
