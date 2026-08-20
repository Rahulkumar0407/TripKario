'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { testimonials, Testimonial } from '@/data/testimonials';
import { ArrowLeft, ArrowRight, Compass, ArrowUpRight, X } from 'lucide-react';

// Authentic trip destination photography matching each traveller's journey
const tripPhotographs: Record<string, { image: string; location: string; route: string }> = {
  't-abhishek-goswami': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    location: 'Dal Lake, Srinagar',
    route: 'Srinagar → Gulmarg → Pahalgam',
  },
  't-aditya-kanojia': {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
    location: 'Solang & Rohtang Pass',
    route: 'Kullu → Manali → Solang Valley',
  },
  't-bhairo-parmar': {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
    location: 'Munnar Tea Hills',
    route: 'Kochi → Munnar → Alleppey Backwaters',
  },
  't-babalu-yadav': {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
    location: 'Manali Pine Glades',
    route: 'Chandigarh → Manali → Solang',
  },
  't-yashika': {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop',
    location: 'Goa Coastal Quarters',
    route: 'Panaji → Divar Island → South Goa',
  },
  't-vipul-giri': {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
    location: 'Jaisalmer Sandstone Fort',
    route: 'Jaipur → Jodhpur → Jaisalmer',
  },
  't-sameer-priyanka': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    location: 'Nigeen Lake Houseboat',
    route: 'Srinagar → Nigeen Lake → Gulmarg',
  },
  't-dr-rajesh': {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
    location: 'Sam Sand Dunes',
    route: 'Jodhpur → Jaisalmer Dunes',
  },
  't-tanvi-saxena': {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
    location: 'Living Root Bridges & Dawki',
    route: 'Shillong → Cherrapunji → Dawki',
  },
};

export default function VariantTravelStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [activeSourceModal, setActiveSourceModal] = useState<string | null>(null);

  const stories = testimonials;
  const currentStory: Testimonial = stories[currentIndex] || stories[0];
  const photoMeta = tripPhotographs[currentStory.id] || {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    location: currentStory.tripDestination || 'India',
    route: currentStory.trip || 'Curated Journey',
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // 3-4 Layered physical background photographs for physical stack depth (#09)
  const nextStory1 = stories[(currentIndex + 1) % stories.length];
  const nextStory2 = stories[(currentIndex + 2) % stories.length];
  const photoMetaNext1 = tripPhotographs[nextStory1.id] || photoMeta;
  const photoMetaNext2 = tripPhotographs[nextStory2.id] || photoMeta;

  return (
    <section
      id="stories"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Intro (#06) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                TRAVELLER STORIES
              </span>
              <span className="h-px w-6 bg-[#C85D3A]/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-[1.05]">
              They went. <br />
              They came back smiling.
            </h2>
            <p className="text-sm sm:text-base text-[#6D665E] dark:text-[#B6ADA1] font-normal leading-relaxed mt-2 max-w-md">
              A few words from people who travelled with us.
            </p>
          </div>

          {/* Compact Story Navigation Dock (#13) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <VariantGlass
              intensity="pill"
              className="rounded-full px-4 py-2 flex items-center gap-3 border-white/70 dark:border-white/15 shadow-md"
            >
              <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] font-semibold tracking-widest">
                {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
              </span>

              <div className="h-4 w-px bg-black/10 dark:bg-white/15" />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous memory"
                  className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next memory"
                  className="w-8 h-8 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </VariantGlass>
          </div>
        </div>

        {/* The Physical Travel Memories Stage (#05, #07, #08, #09, #10, #11) */}
        <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex items-center justify-center">
          {/* Layered Physical Background Stack Photo 2 (recessed behind, 1.8 deg tilt) */}
          <div
            className="absolute inset-x-4 sm:inset-x-8 top-6 bottom-2 rounded-3xl overflow-hidden bg-[#E8DED0] dark:bg-[#151310] opacity-40 scale-[0.93] pointer-events-none hidden sm:block border-4 border-white dark:border-[#1F1C18] shadow-lg"
            style={{ transform: 'rotate(1.8deg) translateY(12px)' }}
          >
            <Image
              src={photoMetaNext2.image}
              alt=""
              fill
              className="object-cover brightness-75"
            />
          </div>

          {/* Layered Physical Background Stack Photo 1 (recessed behind, -1.5 deg tilt) */}
          <div
            className="absolute inset-x-2 sm:inset-x-4 top-3 bottom-1 rounded-3xl overflow-hidden bg-[#E8DED0] dark:bg-[#181613] opacity-65 scale-[0.96] pointer-events-none hidden sm:block border-4 border-white dark:border-[#1F1C18] shadow-xl"
            style={{ transform: 'rotate(-1.5deg) translateY(6px)' }}
          >
            <Image
              src={photoMetaNext1.image}
              alt=""
              fill
              className="object-cover brightness-85"
            />
          </div>

          {/* Active Front-most Travel Photograph (#08, #11) */}
          <div className="relative w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] rounded-3xl overflow-hidden border-4 sm:border-8 border-white dark:border-[#1F1C18] bg-[#12120A] shadow-[0_30px_90px_rgba(23,21,18,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10">
            {/* Background Master Photograph with Cinematic Transition (#11) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStory.id}
                initial={{
                  opacity: 0,
                  scale: 1.06,
                  x: direction === 1 ? '4vw' : '-4vw',
                  filter: 'blur(2px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 1.04,
                  x: direction === 1 ? '-4vw' : '4vw',
                  filter: 'blur(2px)',
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 z-0 bg-[#12120A]"
              >
                <Image
                  src={photoMeta.image}
                  alt={currentStory.tripDestination || currentStory.trip || 'Travel memory'}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover hero-camera-breathe"
                />
                {/* Localized Bottom/Side Gradient Mask for 100% Quote Contrast (#26) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* Top Destination & Route Note (#07) */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <VariantGlass
                intensity="photo"
                className="rounded-full px-4 py-1.5 text-xs font-mono tracking-widest text-white uppercase border-white/30"
              >
                {currentStory.tripDestination || 'India'}
              </VariantGlass>

              <div className="text-xs font-mono text-white/80 hidden sm:flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#D4A467]" />
                <span>{photoMeta.route}</span>
              </div>
            </div>

            {/* Bottom Content: The Traveller Story (#07, #08, #12) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left Col: The Real Quote */}
              <div className="lg:col-span-8 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3"
                  >
                    <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                      &ldquo;{currentStory.quote}&rdquo;
                    </blockquote>

                    {/* Traveller Identity: Name + Trip (#02, #19) */}
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono">
                      <span className="font-bold text-[#D4A467] uppercase tracking-wider">
                        {currentStory.name}
                      </span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/85">
                        {currentStory.trip || currentStory.tripDestination}
                      </span>
                      {currentStory.rating && (
                        <>
                          <span className="text-white/40">·</span>
                          <span className="text-[#D4A467] font-bold">5.0 ★</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Col: Optional Original Review Link / Subtle Note (#14, #20) */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
                <div className="text-right space-y-2">
                  <p className="text-[11px] font-mono text-[#D4A467] hidden sm:block">
                    &ldquo;Photos fade. Good trips don&apos;t.&rdquo;
                  </p>

                  {/* Optional Original Review Screenshot Access (#14) */}
                  {currentStory.image && (
                    <button
                      type="button"
                      onClick={() => setActiveSourceModal(currentStory.image || null)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                    >
                      <span>See original review</span>
                      <ArrowUpRight className="w-3 h-3 text-[#D4A467]" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Transition to Custom Trip (#30) */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#6D665E] dark:text-[#B6ADA1]">
            Ready to make your own story? ↓
          </p>
        </div>
      </div>

      {/* Optional Source Review Modal (#14) */}
      <AnimatePresence>
        {activeSourceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-[#171512] p-4 rounded-3xl border border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="text-xs font-mono text-white/80">Original Review Source</span>
                <button
                  type="button"
                  onClick={() => setActiveSourceModal(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                <Image
                  src={activeSourceModal}
                  alt="Original review source"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
