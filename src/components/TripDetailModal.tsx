'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Star,
  Sparkles,
  Calendar,
  ShieldCheck,
  Compass,
  Utensils,
  Moon,
  User,
  Phone,
  Mail,
  Users,
  MessageCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TripPackage } from '@/types';
import { formatPrice } from '@/lib/utils';
import { openWhatsApp } from '@/lib/whatsapp';

interface TripDetailModalProps {
  trip: TripPackage | null;
  onClose: () => void;
  onPlanCustom?: (tripTitle: string) => void;
}

export default function TripDetailModal({
  trip,
  onClose,
  onPlanCustom,
}: TripDetailModalProps) {
  // Embedded Plan Form State
  const [plannerName, setPlannerName] = useState('');
  const [plannerPhone, setPlannerPhone] = useState('');
  const [plannerEmail, setPlannerEmail] = useState('');
  const [plannerDates, setPlannerDates] = useState('');
  const [plannerTravellers, setPlannerTravellers] = useState('2 Adults');
  const [plannerNotes, setPlannerNotes] = useState('');

  const planSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset form and scroll whenever a new trip is opened (prevents state leakage)
  useEffect(() => {
    if (trip) {
      setPlannerName('');
      setPlannerPhone('');
      setPlannerEmail('');
      setPlannerDates('');
      setPlannerTravellers('2 Adults');
      setPlannerNotes('');
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [trip?.id]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (trip) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [trip]);

  if (!trip) return null;

  const defaultExclusions = [
    'Airfare / Train tickets to starting point',
    'Personal expenses, laundry, and tipping',
    'Monument entry tickets or camera charges not specifically mentioned',
    'Optional adventure activities or personal equipment rentals',
    'Travel insurance & personal medical emergency expenses',
  ];

  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage?.src;
  const hasItinerary = trip.itinerary && trip.itinerary.length > 0;
  const exclusionsList = trip.exclusions && trip.exclusions.length > 0 ? trip.exclusions : defaultExclusions;
  const formattedPrice = formatPrice(trip.pricePerPerson, trip.isPriceOnRequest);

  const handleWhatsAppInquiry = () => {
    const routeText = trip.route ? `\nRoute: ${trip.route}` : '';
    const userDetailText = plannerName
      ? `\n\nTraveller:\n${plannerName}${plannerPhone ? ` (${plannerPhone})` : ''}${plannerDates ? `\nPreferred Dates: ${plannerDates}` : ''}${plannerTravellers ? `\nTravellers: ${plannerTravellers}` : ''}${plannerNotes ? `\nNotes: ${plannerNotes}` : ''}`
      : '';

    const text = `Hello TripKario! I'd like help planning a trip.

Trip:
${trip.title}

Destination:
${trip.destination}${routeText}

Duration:
${trip.durationNights} Nights · ${trip.durationDays} Days${userDetailText}

Please help me plan this journey with verified stays and private transport.`;
    openWhatsApp(text, true);
  };

  const handlePlanFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannerName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!plannerPhone.trim()) {
      alert('Please enter your WhatsApp or phone number');
      return;
    }

    const messageLines = [
      "Hello TripKario! I'd like help planning a trip.\n",
      `Trip:\n${trip.title}`,
      `Destination:\n${trip.destination}`,
      trip.route ? `Route:\n${trip.route}` : null,
      `Duration:\n${trip.durationNights} Nights · ${trip.durationDays} Days`,
      plannerDates.trim() ? `Travel dates:\n${plannerDates.trim()}` : null,
      plannerTravellers.trim() ? `Travellers:\n${plannerTravellers.trim()}` : null,
      `Name:\n${plannerName.trim()}`,
      `Phone:\n${plannerPhone.trim()}`,
      plannerEmail.trim() ? `Email:\n${plannerEmail.trim()}` : null,
      plannerNotes.trim() ? `Additional requirements:\n${plannerNotes.trim()}` : null,
      '\nPlease help me plan this journey with verified stays and private chauffeur transport.'
    ].filter(Boolean).join('\n\n');

    openWhatsApp(messageLines, true);
  };

  const scrollToPlanSection = () => {
    if (planSectionRef.current) {
      planSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={!!trip} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="fixed inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 translate-x-0 translate-y-0 w-full max-w-full sm:max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[90vh] p-0 rounded-none sm:rounded-3xl border-0 sm:border border-[var(--border-card)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl overflow-hidden flex flex-col">
        {/* Single Dedicated Scroll Region */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          {/* ══════════════════════════════════════════════════
              01. EDITORIAL HERO HEADER (DYNAMIC FLEX HEIGHT)
              Never overlaps timeline below: establishes its own true height
              ══════════════════════════════════════════════════ */}
          <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] w-full overflow-hidden bg-[#11100E] flex flex-col justify-between p-4 sm:p-7 md:p-8">
            {/* Background Photography with Fill */}
            {coverSrc && (
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={coverSrc}
                  alt={trip.coverImage?.alt || trip.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
                {/* Responsive Charcoal Protective Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11100E] via-[#11100E]/75 via-50% to-black/35" />
              </div>
            )}

            {/* Top Destination, Category & Duration Chips */}
            <div className="relative z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 pr-12 max-w-full">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#E46B3B] text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
                {trip.destination}
              </span>
              {trip.category && (
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/80 text-white text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider border border-white/20">
                  {trip.category}
                </span>
              )}
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider border border-white/25">
                {trip.durationNights}N · {trip.durationDays}D
              </span>
              {trip.coverImage?.location && (
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white/90 text-[10px] font-mono border border-white/20">
                  <MapPin className="w-3 h-3 text-[#FFAA70]" />
                  <span>{trip.coverImage.location}</span>
                </span>
              )}
            </div>

            {/* Bottom Title & Price Headline */}
            <div className="relative z-10 text-white space-y-2.5 sm:space-y-3 pt-6 sm:pt-8 min-w-0">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-medium leading-snug sm:leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] break-words">
                {trip.title}
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-white/20 text-xs text-white/90 font-mono">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-1 font-bold text-[#FFAA70]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {trip.rating || 4.9} ({trip.reviewCount || 48} reviews)
                  </span>
                  <span>•</span>
                  <span className="text-white/80 text-[11px] sm:text-xs">
                    {trip.durationDays} Days Comprehensive Circuit
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] text-white/70 uppercase">Starting:</span>
                  <span className="text-base sm:text-xl font-serif font-bold text-white">
                    {formattedPrice}
                  </span>
                  {!trip.isPriceOnRequest && trip.pricePerPerson > 0 && (
                    <span className="text-[10px] text-white/70">/ person</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              02. MODAL BODY: SEQUENTIAL ITINERARY NARRATIVE
              ══════════════════════════════════════════════════ */}
          <div className="p-4 sm:p-7 md:p-8 space-y-6 sm:space-y-8 min-w-0 max-w-full pb-16 sm:pb-8">
          {/* Complete Route Bar */}
          {trip.route && (
            <div className="flex items-start sm:items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-2xl bg-[var(--bg-surface-2)] text-xs font-mono text-[var(--accent)] font-semibold border border-[var(--border-subtle)] shadow-2xs min-w-0 max-w-full">
              <MapPin className="w-4 h-4 shrink-0 text-[var(--accent)] mt-0.5 sm:mt-0" />
              <div className="min-w-0 flex-1 flex flex-wrap sm:flex-nowrap items-baseline sm:items-center gap-1 sm:gap-2">
                <span className="uppercase text-[10px] tracking-wider text-[var(--text-muted)] shrink-0 font-bold">
                  Route:
                </span>
                <span className="text-[var(--text-primary)] break-words leading-relaxed min-w-0 flex-1">{trip.route}</span>
              </div>
            </div>
          )}

          {/* Journey Overview & Curated Highlights */}
          <div className="space-y-4 min-w-0 max-w-full">
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-light break-words">
              {trip.longDescription || trip.shortDescription}
            </p>

            {trip.highlights && trip.highlights.length > 0 && (
              <div className="space-y-2 pt-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                  Experience Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 min-w-0">
                  {trip.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] flex items-center gap-2 min-w-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span className="break-words min-w-0 flex-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Route Photography Strip */}
            {trip.galleryImages && trip.galleryImages.length > 0 && (
              <div className="space-y-2 pt-3 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                  Route Highlights & Landscapes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                  {trip.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative h-40 sm:h-44 rounded-2xl overflow-hidden group border border-[var(--border-subtle)] shadow-xs min-w-0">
                      <Image
                        src={typeof img === 'string' ? img : img.src}
                        alt={typeof img === 'string' ? `${trip.title} route` : img.alt || trip.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                        <span className="text-xs font-serif font-medium drop-shadow-sm break-words line-clamp-1">
                          {typeof img === 'string' ? trip.title : img.alt}
                        </span>
                        {typeof img !== 'string' && img.location && (
                          <span className="text-[10px] font-mono text-[#FFAA70] flex items-center gap-1 mt-0.5 font-semibold">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{img.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════
              03. COMPLETE DAY-BY-DAY ITINERARY
              ══════════════════════════════════════════════════ */}
          <div className="space-y-5 sm:space-y-6 pt-2 border-t border-[var(--border-subtle)] min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                  The Day-by-Day Journey
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {trip.itinerary?.length || trip.durationDays} Days Comprehensive Verified Plan
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={scrollToPlanSection}
                className="rounded-full text-[11px] font-mono uppercase tracking-wider border-[var(--border-card)] hover:bg-[var(--bg-surface-2)] cursor-pointer shrink-0"
              >
                Plan this trip ↓
              </Button>
            </div>

            {/* Vertical Timeline */}
            {hasItinerary ? (
              <div className="relative pl-5 sm:pl-8 border-l-2 border-[var(--border-subtle)] space-y-4 sm:space-y-6 ml-2.5 sm:ml-4 min-w-0 max-w-full">
                {trip.itinerary!.map((day, index) => {
                  const dayFormatted = String(day.dayNumber).padStart(2, '0');

                  return (
                    <div
                      key={day.dayNumber || index}
                      className="relative group min-w-0 max-w-full"
                    >
                      {/* Timeline Milestone Dot */}
                      <div className="absolute -left-[27px] sm:-left-[39px] top-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center shadow-xs">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent)]" />
                      </div>

                      {/* Milestone Content Box */}
                      <div className="rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 transition-all hover:border-[var(--accent)]/40 hover:shadow-sm min-w-0 max-w-full">
                        {/* Header: Day Badge + Location */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
                            <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider shrink-0 mt-0.5 sm:mt-0">
                              DAY {dayFormatted}
                            </span>
                            <h4 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug break-words min-w-0 flex-1">
                              {day.title}
                            </h4>
                          </div>

                          {day.location && (
                            <span className="self-start sm:self-auto px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[9.5px] sm:text-[10px] font-mono font-semibold shrink-0">
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
              <div className="p-6 sm:p-8 text-center rounded-2xl bg-[var(--bg-surface-2)] border border-dashed border-[var(--border-subtle)] space-y-2 min-w-0">
                <Sparkles className="w-6 h-6 mx-auto text-[var(--accent)]" />
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Day-by-day plan is verified and customized upon inquiry.
                </p>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════
              04. INCLUSIONS & EXCLUSIONS
              ══════════════════════════════════════════════════ */}
          <div className="space-y-5 sm:space-y-6 pt-4 border-t border-[var(--border-subtle)] min-w-0 max-w-full">
            <div>
              <h3 className="text-base sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                Inclusions & Exclusions
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                Transparent inclusions with zero hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0 max-w-full">
              {/* Inclusions */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/10 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-3 min-w-0">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>What&apos;s Included</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--text-muted)] font-normal min-w-0">
                  {trip.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 min-w-0">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed break-words min-w-0 flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/10 dark:bg-rose-950/20 border border-rose-500/20 space-y-3 min-w-0">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>What&apos;s Not Included</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--text-muted)] font-normal min-w-0">
                  {exclusionsList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 min-w-0">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <span className="leading-relaxed break-words min-w-0 flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TripKario Quality Guarantee Note */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] flex items-start sm:items-center gap-3 text-xs font-mono text-[var(--text-muted)] min-w-0">
              <ShieldCheck className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5 sm:mt-0" />
              <span className="leading-relaxed break-words min-w-0 flex-1">
                TripKario Guarantee: Verified boutique heritage accommodations, certified private chauffeurs, transparent pricing, and 24/7 on-ground WhatsApp assistance.
              </span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              05. PLAN YOUR TRIP ENQUIRY FORM (EMBEDDED)
              Appears naturally after the complete itinerary
              ══════════════════════════════════════════════════ */}
          <div
            ref={planSectionRef}
            className="pt-6 border-t-2 border-[var(--border-subtle)] space-y-4 sm:space-y-5 min-w-0 max-w-full"
          >
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-bold block">
                READY TO PLAN THIS JOURNEY?
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
                Plan Your Trip
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-normal max-w-xl leading-relaxed break-words">
                We will customize this exact itinerary for your dates and travel style. Stays, private chauffeur car, and route pacing are fully tailored.
              </p>
            </div>

            {/* Current Trip Context Pill */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono min-w-0">
              <div className="space-y-0.5 min-w-0 flex-1">
                <span className="text-[9.5px] uppercase text-[var(--text-muted)] font-bold block">
                  Enquiring About:
                </span>
                <span className="font-serif font-bold text-sm text-[var(--text-primary)] break-words block">
                  {trip.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent)] font-bold">
                  {trip.destination}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-bold">
                  {trip.durationNights}N · {trip.durationDays}D
                </span>
              </div>
            </div>

            <form onSubmit={handlePlanFormSubmit} className="space-y-3.5 min-w-0 max-w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                <div className="min-w-0">
                  <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Full Name *</span>
                  </label>
                  <Input
                    placeholder="Your full name"
                    value={plannerName}
                    onChange={(e) => setPlannerName(e.target.value)}
                    className="min-w-0 w-full"
                    required
                  />
                </div>

                <div className="min-w-0">
                  <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>WhatsApp / Phone *</span>
                  </label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={plannerPhone}
                    onChange={(e) => setPlannerPhone(e.target.value)}
                    className="min-w-0 w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                <div className="min-w-0">
                  <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Email (Optional)</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="name@email.com"
                    value={plannerEmail}
                    onChange={(e) => setPlannerEmail(e.target.value)}
                    className="min-w-0 w-full"
                  />
                </div>

                <div className="min-w-0">
                  <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Travel Dates</span>
                  </label>
                  <Input
                    placeholder="e.g. Oct 2026 / Flexible"
                    value={plannerDates}
                    onChange={(e) => setPlannerDates(e.target.value)}
                    className="min-w-0 w-full"
                  />
                </div>

                <div className="min-w-0">
                  <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                    <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Travellers</span>
                  </label>
                  <Input
                    placeholder="e.g. 2 Adults, 1 Child"
                    value={plannerTravellers}
                    onChange={(e) => setPlannerTravellers(e.target.value)}
                    className="min-w-0 w-full"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase text-[var(--text-primary)] font-bold mb-1.5">
                  <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Special Preferences / Notes</span>
                </label>
                <Textarea
                  placeholder="Preferred room types, private vehicle upgrades, pacing preferences..."
                  value={plannerNotes}
                  onChange={(e) => setPlannerNotes(e.target.value)}
                  className="min-w-0 w-full"
                  rows={2}
                />
              </div>

              <div className="pt-2 min-w-0">
                <button
                  type="submit"
                  className="w-full min-h-[48px] px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer active:scale-95 touch-manipulation"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp →</span>
                </button>
              </div>
            </form>
          </div>

          {/* ══════════════════════════════════════════════════
              06. ACTION FOOTER
              ══════════════════════════════════════════════════ */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 min-w-0 max-w-full">
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block font-semibold">
                {!trip.isPriceOnRequest && trip.pricePerPerson > 0 ? 'Starting From' : 'Package Pricing'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                  {formattedPrice}
                </span>
                {!trip.isPriceOnRequest && trip.pricePerPerson > 0 && (
                  <span className="text-xs font-mono text-[var(--text-muted)]">/ person</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3 min-w-0">
              <Button
                variant="outline"
                onClick={scrollToPlanSection}
                className="w-full sm:w-auto min-h-[44px] rounded-full text-xs font-mono font-bold uppercase tracking-wider border-[var(--border-card)] hover:bg-[var(--bg-surface-2)] cursor-pointer"
              >
                Plan this trip
              </Button>

              <Button
                variant="default"
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto min-h-[44px] gap-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-md shadow-[#E46B3B]/25 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      </DialogContent>
    </Dialog>
  );
}
