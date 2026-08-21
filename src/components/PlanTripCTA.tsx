'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { openWhatsApp } from '@/lib/whatsapp';

interface PlanTripCTAProps {
  onOpenPlanTrip: () => void;
}

export default function PlanTripCTA({ onOpenPlanTrip }: PlanTripCTAProps) {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F5] text-[#121316]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#1E3A2F] text-[#FAF8F5] p-10 sm:p-16 md:p-20 shadow-2xl">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
              alt="Misty Mountain Forest"
              fill
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A2F] via-[#1E3A2F]/90 to-[#1E3A2F]/70" />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#D97736] mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Begin Your Odyssey</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white leading-tight mb-6">
              Your next story <span className="italic font-normal">starts here.</span>
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10">
              Tell us where you want to go. We’ll help you figure out the rest. Receive a bespoke day-by-day itinerary tailored to your exact budget, schedule, and tastes within 24 hours.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPlanTrip}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF8F5] text-[#121316] font-semibold text-xs uppercase tracking-widest hover:bg-[#EAE5DC] transition-all duration-300 shadow-xl cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#1E3A2F]" />
                <span>Plan My Trip</span>
              </button>

              <button
                onClick={() => openWhatsApp('Hi Tripkario! I am ready to start planning my upcoming trip.')}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs uppercase tracking-wider font-semibold transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
