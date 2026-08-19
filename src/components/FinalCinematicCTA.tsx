'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import TripkarioLogo from './TripkarioLogo';

interface FinalCinematicCTAProps {
  onOpenPlanTrip: () => void;
}

export default function FinalCinematicCTA({ onOpenPlanTrip }: FinalCinematicCTAProps) {
  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden border-t border-[var(--border-subtle)] bg-[#11100E]">
      {/* Background Full-Viewport Indian Landscape */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=90&w=2600&auto=format&fit=crop"
          alt="Dal Lake Kashmir at Dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100E] via-black/80 to-black/60" />
      </div>

      {/* Animated Final Flight Path Route Line */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 1440 800" fill="none" className="w-full h-full opacity-40">
          <motion.path
            d="M 100 700 Q 700 400, 1400 100"
            stroke="#E86A3A"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-10 text-center text-white space-y-8 py-20">
        <div className="inline-flex justify-center">
          <TripkarioLogo badgeSize={42} variant="white" />
        </div>

        <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal leading-[0.98] text-white tracking-tight">
          Ready to go <br />
          <span className="text-[#E86A3A]">somewhere?</span>
        </h2>

        <p className="text-base sm:text-xl text-white/85 max-w-xl mx-auto font-normal leading-relaxed">
          Your next trip is probably closer than you think. Tell us where you want to wake up next, and we will handle the rest.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="default"
            size="lg"
            onClick={onOpenPlanTrip}
            data-cursor="GO"
            className="gap-2.5 rounded-full px-8 h-12 bg-[#E86A3A] hover:bg-[#F07A4C] text-white"
          >
            <span>PLAN MY TRIP</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => openWhatsApp('Hi TripKario! I am ready to plan my next vacation.')}
            data-cursor="TALK"
            className="border-white/30 text-white hover:bg-white/10 gap-2 rounded-full px-8 h-12"
          >
            <MessageCircle className="w-4 h-4 text-[#E86A3A]" />
            <span>TALK TO AN EXPERT</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
