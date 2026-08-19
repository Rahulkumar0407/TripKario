'use client';

import React from 'react';
import { Star, CheckCircle2, Quote, ExternalLink, MapPin } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import type { Testimonial } from '@/types';
import GlassSurface from './ui/GlassSurface';

interface TestimonialCardProps {
  item: Testimonial;
}

const AVATAR_GRADIENTS = [
  'from-[#E85D30] to-[#F59E0B] text-white',
  'from-[#10B981] to-[#059669] text-white',
  'from-[#6366F1] to-[#4F46E5] text-white',
  'from-[#EC4899] to-[#DB2777] text-white',
  'from-[#0EA5E9] to-[#0284C7] text-white',
  'from-[#F59E0B] to-[#D97706] text-white',
  'from-[#8B5CF6] to-[#7C3AED] text-white',
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function TestimonialCard({ item }: TestimonialCardProps) {
  const initials = getInitials(item.name);
  const gradientClass = getAvatarGradient(item.name);

  return (
    <div className="w-[320px] sm:w-[360px] shrink-0 p-1.5 flex">
      <GlassSurface
        variant="frost"
        rounded="3xl"
        className="w-full p-5 sm:p-6 flex flex-col justify-between border border-[var(--border-card)] shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-[var(--bg-surface)]/90 dark:bg-[#121816]/90 backdrop-blur-xl"
      >
        <div className="space-y-3.5">
          {/* Header: Initials Avatar, Name, Location & Google Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* User Initials Avatar */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center font-bold text-xs tracking-wider shadow-sm shrink-0 border border-white/20`}
                aria-hidden="true"
              >
                {initials}
              </div>

              {/* Name & Location */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13.5px] font-bold text-[var(--text-primary)] leading-tight">
                    {item.name}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--brand-saffron, #E85D30)]" />
                    {item.location || 'Verified Traveler'}
                  </span>
                  {item.date && (
                    <>
                      <span>·</span>
                      <span>{item.date}</span>
                    </>
                  )}
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

          {/* 5-Star Rating & Trip Tag */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[#F59E0B]">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            {item.trip && (
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--brand-saffron, #E85D30)]/10 text-[var(--brand-saffron, #E85D30)] text-[11px] font-mono font-medium truncate max-w-[170px]">
                {item.trip}
              </span>
            )}
          </div>

          {/* Highlight Hook */}
          {item.highlight && (
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              &ldquo;{item.highlight}&rdquo;
            </p>
          )}

          {/* Review Text */}
          <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed line-clamp-4">
            {item.quote || item.comment}
          </p>
        </div>

        {/* Card Footer: Verified Mark & Quote Icon */}
        <div className="pt-3.5 mt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
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
  // Duplicate array for seamless continuous 100% infinite marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[var(--bg-surface-2)]/40 relative overflow-hidden border-y border-[var(--border-subtle)]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--brand-saffron, #E85D30)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 mb-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            {/* Google Rating Badge */}
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
                <span>5.0 / 5.0</span>
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
              Authentic traveler experiences and custom holiday reviews for Tripkario.com.
            </p>
          </div>

          {/* External Google Review Link */}
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
        {/* Left & Right edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent pointer-events-none" />

        {/* Marquee Row: Smooth Right-to-Left Continuous Movement */}
        <div className="animate-marquee-rtl flex items-stretch gap-2 py-2">
          {marqueeItems.map((item, idx) => (
            <TestimonialCard key={`${item.id}-m1-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Hover to pause hint */}
      <div className="text-center mt-6">
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
          Hover card to pause · Smooth Right-to-Left Continuous Scroll
        </span>
      </div>
    </section>
  );
}
