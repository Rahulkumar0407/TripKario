'use client';

import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

interface CustomTripCTAProps {
  onOpenPlanTrip: () => void;
}

export default function CustomTripCTA({ onOpenPlanTrip }: CustomTripCTAProps) {
  return (
    <section id="custom-trip" className="py-20 md:py-28 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <Card className="bg-[var(--brand-teal)] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden border-none shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <Badge variant="saffron" className="mb-4">
              Bespoke Itinerary Planning
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white leading-tight mb-4">
              Your trip doesn&apos;t have to fit a template.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
              Tell us what you&apos;re looking for and we&apos;ll help you build the right journey with hand-selected hotels, private cars, and flexible itineraries.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="saffron"
                size="lg"
                onClick={() => onOpenPlanTrip()}
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => openWhatsApp('Hi Tripkario! I would like to design a custom itinerary for my holiday.')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Talk on WhatsApp</span>
              </Button>
            </div>

            {/* Guarantees */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>Zero obligation customized quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--brand-saffron)]" />
                <span>24-hour turnaround time</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
