'use client';

import React from 'react';
import { MessageCircle, ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

interface ConciergePreviewSectionProps {
  onOpenPlanTrip: () => void;
}

export default function ConciergePreviewSection({ onOpenPlanTrip }: ConciergePreviewSectionProps) {
  const quickPicks = [
    { q: 'I want a honeymoon.', action: 'Honeymoon in Kashmir / Kerala' },
    { q: 'I have ₹20K.', action: 'Royal Rajasthan 5N/6D' },
    { q: 'Show me Kashmir.', action: 'Signature Dal Lake & Gulmarg' },
    { q: 'Help me choose.', action: 'Interactive Recommendation' },
  ];

  return (
    <section className="py-20 md:py-24 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="bg-[var(--bg-surface)] p-8 sm:p-12 md:p-14 rounded-2xl border border-[var(--border-card)] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
                TripKario Concierge
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[var(--text-primary)]">
              Got questions?
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
              Ask us. We&apos;ve heard worse travel plans. Connect with our dedicated planning desk on WhatsApp or launch our custom planner.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {quickPicks.map((pick) => (
                <button
                  key={pick.q}
                  type="button"
                  onClick={() => openWhatsApp(`Hi TripKario! ${pick.q}`)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[var(--bg-surface-2)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  &ldquo;{pick.q}&rdquo;
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="default"
                onClick={() => openWhatsApp('Hi TripKario! I have questions regarding planning a trip.')}
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>TALK TO TRIPKARIO</span>
              </Button>

              <Button
                variant="outline"
                onClick={onOpenPlanTrip}
              >
                <span>PLAN MANUALLY →</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
