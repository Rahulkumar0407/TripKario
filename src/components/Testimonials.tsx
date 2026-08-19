'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { googleReviews, type GoogleReview } from '@/data/googleReviews';
import GlassSurface from './ui/GlassSurface';

interface TestimonialCardProps {
  review: GoogleReview;
}

function TestimonialCard({ review }: TestimonialCardProps) {
  const avatar =
    review.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop';

  return (
    <div className="w-[360px] sm:w-[420px] shrink-0 p-1">
      <GlassSurface
        variant="frost"
        rounded="3xl"
        className="h-full p-6 flex flex-col justify-between border border-[var(--border-card)] shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 bg-[var(--bg-surface)]/90 dark:bg-[#121816]/90 backdrop-blur-xl"
      >
        {/* Card Header: Reviewer info + Google badge */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* Reviewer Avatar */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-[var(--brand-saffron, #E85D30)]/30 bg-black/10">
                <Image
                  src={avatar}
                  alt={review.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              {/* Name & Location */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[14px] font-bold text-[var(--text-primary)] leading-tight">
                    {review.name}
                  </h4>
                  {review.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  <span>{review.location}</span>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>

            {/* Google "G" Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-white/10 shadow-xs border border-black/5 dark:border-white/10 shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-[10px] font-bold text-gray-700 dark:text-gray-200">
                5.0
              </span>
            </div>
          </div>

          {/* 5-Star Rating */}
          <div className="flex items-center gap-1 text-[#F59E0B] mb-2.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>

          {/* Trip Tag */}
          <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--brand-saffron, #E85D30)]/10 text-[var(--brand-saffron, #E85D30)] text-[11px] font-mono font-medium mb-3">
            {review.trip}
          </div>

          {/* Highlight Hook */}
          {review.highlight && (
            <p className="text-xs font-semibold text-[var(--text-primary)] mb-2 italic">
              &ldquo;{review.highlight}&rdquo;
            </p>
          )}

          {/* Detailed Review Text */}
          <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed line-clamp-4">
            {review.review}
          </p>
        </div>

        {/* Card Footer: Verified Booking mark */}
        <div className="pt-4 mt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <span className="flex items-center gap-1 text-[10px] text-[#10B981]">
            <CheckCircle2 className="w-3 h-3" />
            Verified Google Review
          </span>
          <Quote className="w-4 h-4 text-[var(--brand-saffron, #E85D30)]/30" />
        </div>
      </GlassSurface>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate array to enable seamless infinite right-to-left marquee loop
  const marqueeItems = [...googleReviews, ...googleReviews];

  return (
    <section className="py-24 bg-[var(--bg-surface-2)]/40 relative overflow-hidden border-y border-[var(--border-subtle)]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--brand-saffron, #E85D30)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 mb-12">
        {/* Section Header with Google Rating Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            {/* Google Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 border border-black/8 dark:border-white/15 shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--text-primary)]">
                <span>4.9 / 5.0</span>
                <span className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] border-l border-black/10 dark:border-white/10 pl-2">
                TripKario.com · New Delhi
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[var(--text-primary)]">
              Real Journeys.{' '}
              <span className="italic text-[var(--brand-saffron, #E85D30)] font-normal">
                Real Stories.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
              Authentic reviews from travelers who planned and booked their custom holidays through our New Delhi office.
            </p>
          </div>

          {/* External Google Review link / CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.google.com/search?q=tripkario.com+new+delhi+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-surface text-xs font-mono text-[var(--text-primary)] hover:border-[var(--brand-saffron, #E85D30)]/40 transition-all shadow-sm group"
            >
              <span>View all on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--brand-saffron, #E85D30)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SMOOTH RIGHT-TO-LEFT MOVING MARQUEE TRACK
          ════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right edge blur masks for smooth bleed */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent pointer-events-none" />

        {/* Marquee Row: Smooth Right-to-Left Continuous Movement */}
        <div className="animate-marquee-rtl flex items-stretch gap-2 py-2">
          {marqueeItems.map((review, idx) => (
            <TestimonialCard
              key={`${review.id}-m1-${idx}`}
              review={review}
            />
          ))}
        </div>
      </div>

      {/* Pause indicator hint */}
      <div className="text-center mt-6">
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
          Hover card to pause · 100% verified traveler feedback
        </span>
      </div>
    </section>
  );
}
