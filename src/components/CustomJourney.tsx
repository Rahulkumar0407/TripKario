'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

interface CustomJourneyProps {
  onOpenPlanTrip: () => void;
}

export default function CustomJourney({ onOpenPlanTrip }: CustomJourneyProps) {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] min-h-[480px] flex items-center p-8 sm:p-14 md:p-20">
        {/* Background Full-Bleed Authentic Indian Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2400&auto=format&fit=crop"
            alt="Rajasthan Golden Desert Sunset and Sandstone Citadels"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-white space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E86A3A] font-bold block">
            Bespoke Planning
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.04] text-white tracking-tight">
            Your route. <br />
            Your rules.
          </h2>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
            Tell us where you want to go. We&apos;ll figure out the rest — verified boutique stays, private chauffeurs, passes, and flexible pacing.
          </p>

          <div className="text-xs font-mono text-[#F4A261]">
            Aap destination batao. Baaki hum dekh lenge.
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={onOpenPlanTrip}
              data-cursor="BUILD"
              className="gap-2.5 rounded-full px-8 h-12 bg-[#E86A3A] hover:bg-[#F07A4C] text-white"
            >
              <span>BUILD MY TRIP</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => openWhatsApp('Hi TripKario! Aap destination batao, baaki hum dekh lenge. I want to build a custom route.')}
              data-cursor="TALK"
              className="border-white/30 text-white hover:bg-white/10 gap-2 rounded-full px-8 h-12"
            >
              <MessageCircle className="w-4 h-4 text-[#E86A3A]" />
              <span>WHATSAPP AN EXPERT</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
