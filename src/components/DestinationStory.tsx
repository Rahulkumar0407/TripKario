'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, Shield } from 'lucide-react';
import { tripPackages } from '@/data/trips';

interface DestinationStoryProps {
  onSelectTrip: (tripId: string) => void;
  onOpenPlanTrip: (destination: string) => void;
}

export default function DestinationStory({ onSelectTrip, onOpenPlanTrip }: DestinationStoryProps) {
  return (
    <section className="relative py-32 md:py-44 bg-[#121316] text-[#FAF8F5] overflow-hidden">
      {/* Cinematic Background with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=2400&auto=format&fit=crop"
          alt="Kashmir Valley and Alpine Pine Forest"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-[#121316]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Destination Spotlight</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif font-light text-[#FAF8F5] tracking-tight leading-[0.95] mb-4"
          >
            KASHMIR
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#EAE5DC] font-light mb-8"
          >
            Where the mountains slow time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-[#FAF8F5]/80 font-light leading-relaxed mb-10 max-w-xl"
          >
            Glide across early morning cedar waters of Dal Lake, ascend the highest gondola in the world at Gulmarg, and walk beneath pine canopies in Pahalgam. Our signature Kashmir journey is curated for unhurried wonder.
          </motion.p>

          {/* Highlights Mini Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-10 text-xs font-mono uppercase tracking-wider text-white/90"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              6 Nights · 7 Days
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Heritage Cedar Houseboat
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Gulmarg Gondola Passes
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              Private Chauffeur
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onOpenPlanTrip('Kashmir')}
              data-cursor="KASHMIR"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF8F5] text-[#121316] font-semibold text-xs uppercase tracking-widest hover:bg-[#EAE5DC] transition-all duration-300 shadow-xl"
            >
              <span>Discover Kashmir</span>
              <ArrowRight className="w-4 h-4 text-[#1E3A2F]" />
            </button>

            <span className="text-xs font-mono text-white/60">
              Starting from ₹24,999 / person
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
