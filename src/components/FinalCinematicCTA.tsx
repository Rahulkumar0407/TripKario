'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Plane } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';
import TripkarioLogo from './TripkarioLogo';
import MagneticButton from './ui/MagneticButton';

interface FinalCinematicCTAProps {
  onOpenPlanTrip: () => void;
}

export default function FinalCinematicCTA({ onOpenPlanTrip }: FinalCinematicCTAProps) {
  return (
    <section className="relative min-h-[640px] sm:min-h-[760px] flex items-center justify-center overflow-hidden border-t border-[var(--border-subtle)] bg-[#090908]">
      {/* Background Full-Viewport Authentic Mountain Road Landscape */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        whileInView={{ scale: 1.0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=2600&auto=format&fit=crop"
          alt="High mountain road leading into the golden horizon in Ladakh"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-black/75 to-black/55" />
      </motion.div>

      {/* Animated Final Journey Path Route Line & Airplane */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 1440 800" fill="none" className="w-full h-full opacity-40">
          <motion.path
            d="M 80 720 Q 680 380, 1380 120"
            stroke="#E46B3B"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
          {/* Endpoint marker at the end of the trajectory */}
          <motion.circle
            cx="1380"
            cy="120"
            r="3.5"
            fill="#E46B3B"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 2.2, ease: 'easeOut' }}
          />
        </svg>

        {/* Minimal Airplane marker traveling along the route */}
        <motion.div
          initial={{ offsetDistance: '0%', opacity: 0 }}
          whileInView={{ offsetDistance: '98%', opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.1 }}
          style={{
            offsetPath: 'path("M 80 720 Q 680 380, 1380 120")',
          }}
          className="absolute text-[#E46B3B] drop-shadow-[0_0_8px_rgba(228,107,59,0.8)]"
        >
          <Plane className="w-4 h-4 -rotate-12" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-10 text-center text-white space-y-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex justify-center"
        >
          <TripkarioLogo badgeSize={42} variant="white" />
        </motion.div>

        {/* Masked Split Headline */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal leading-[0.98] text-white tracking-tight"
          >
            Ready to go <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-[#E46B3B] inline-block"
            >
              somewhere?
            </motion.span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-white/85 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Your next trip is probably closer than you think. Tell us where you want to wake up next, and we will handle the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <MagneticButton
            onClick={onOpenPlanTrip}
            data-cursor="GO"
            className="gap-2.5 rounded-full px-8 h-13 bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-2xl flex items-center font-medium"
          >
            <span>PLAN MY TRIP</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            onClick={() => openWhatsApp('Hi TripKario! I am ready to plan my next vacation.')}
            data-cursor="TALK"
            className="border border-white/30 text-white hover:bg-white/10 gap-2 rounded-full px-8 h-13 glass-surface flex items-center font-medium"
          >
            <MessageCircle className="w-4 h-4 text-[#E46B3B]" />
            <span>TALK TO US</span>
          </MagneticButton>
        </motion.div>

        {/* End-of-Journey Personal Brand Signature: with love, Yashi */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="pt-10 flex flex-col items-center justify-center gap-3 select-none"
        >
          {/* Connecting route line & endpoint */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 44, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.1, ease: 'easeOut' }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#E46B3B] to-[#E46B3B]"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 2.3, ease: 'easeOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#E46B3B] shadow-[0_0_8px_rgba(228,107,59,0.8)]"
            />
          </div>

          {/* Signature text: with love, Yashi */}
          <div
            tabIndex={0}
            role="note"
            aria-label="with love, Yashi"
            className="group inline-flex items-baseline gap-1.5 cursor-default focus:outline-none transition-all duration-300"
          >
            {/* 'with love,' - small, calm, font-mono */}
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              whileInView={{ opacity: 0.7, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.4, ease: 'easeOut' }}
              className="text-xs sm:text-[13px] font-mono font-normal tracking-wide text-white/60 group-hover:text-white/85 group-focus-visible:text-white/85 transition-colors"
            >
              with love,
            </motion.span>

            {/* 'Yashi' - elegant, warm gold tone, strictly font-normal (zero italics) */}
            <motion.span
              initial={{ opacity: 0, x: 4 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2.55, ease: 'easeOut' }}
              className="text-base sm:text-lg font-serif font-normal text-[#F4A261] group-hover:text-[#ED7B4D] group-focus-visible:text-[#ED7B4D] group-hover:tracking-[0.02em] group-focus-visible:tracking-[0.02em] transition-all duration-300"
            >
              Yashi
            </motion.span>
          </div>

          <div className="text-[9px] font-mono text-white/25 tracking-widest uppercase">
            Road into the Himalayas · Ladakh · Photo — Rohit Sharma
          </div>
        </motion.div>
      </div>
    </section>
  );
}
