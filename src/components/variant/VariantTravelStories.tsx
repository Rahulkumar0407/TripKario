'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { testimonials, Testimonial } from '@/data/testimonials';
import { ArrowLeft, ArrowRight, Star, ArrowUpRight, X, Compass } from 'lucide-react';

const AUTOPLAY_DURATION = 5500; // 5.5 seconds per memory (#10)

// Authentic trip destination photography matching each traveller's journey (#22 & #23)
const tripPhotographs: Record<string, { image: string; destination: string; duration: string }> = {
  't-abhishek-goswami': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: 'KASHMIR',
    duration: '06N · 07D',
  },
  't-aditya-kanojia': {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
    destination: 'HIMACHAL',
    duration: '05N · 06D',
  },
  't-bhairo-parmar': {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
    destination: 'KERALA',
    duration: '05N · 06D',
  },
  't-babalu-yadav': {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
    destination: 'MANALI',
    duration: '04N · 05D',
  },
  't-yashika': {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop',
    destination: 'GOA',
    duration: '04N · 05D',
  },
  't-vipul-giri': {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
    destination: 'RAJASTHAN',
    duration: '05N · 06D',
  },
  't-sameer-priyanka': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: 'KASHMIR',
    duration: '06N · 07D',
  },
  't-dr-rajesh': {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
    destination: 'RAJASTHAN',
    duration: '05N · 06D',
  },
  't-tanvi-saxena': {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
    destination: 'MEGHALAYA',
    duration: '04N · 05D',
  },
};

export default function VariantTravelStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

  const stories = testimonials;
  const currentStory: Testimonial = stories[currentIndex] || stories[0];

  const photoMeta = tripPhotographs[currentStory.id] || {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: currentStory.tripDestination?.toUpperCase() || 'INDIA',
    duration: 'CURATED TOUR',
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    setProgress(0);
  }, [stories.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setProgress(0);
  }, [stories.length]);

  // Autoplay with continuous 5.5s progress line (#10, #11, #12)
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (intervalStep / AUTOPLAY_DURATION) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Exactly 2 background photos for physical depth stack (#06, #07)
  const prevStory = stories[(currentIndex - 1 + stories.length) % stories.length];
  const nextStory = stories[(currentIndex + 1) % stories.length];
  const prevPhotoMeta = tripPhotographs[prevStory.id] || photoMeta;
  const nextPhotoMeta = tripPhotographs[nextStory.id] || photoMeta;

  return (
    <section
      id="stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500 flex flex-col justify-center"
      style={{ minHeight: '65vh' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header: Clean Editorial Intro (#03) */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E16A43] font-semibold">
              TRAVELLER STORIES
            </span>
            <span className="h-px w-6 bg-[#C85D3A]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171512] dark:text-[#F5EFE6] leading-tight">
            They went. They came back smiling.
          </h2>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B6ADA1] font-normal mt-1">
            A few words from people who travelled with us.
          </p>
        </div>

        {/* Compact Layout: 55% Left Photo Stack + 45% Right Open Text (#04, #05, #25) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Physical Photographic Memory Stack (#05, #06, #08) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
            {/* Background Photo 1 (Previous, Behind-Left #06) */}
            <div
              className="absolute w-[86%] sm:w-[90%] aspect-[4/3] rounded-3xl overflow-hidden bg-[#E8DED0] dark:bg-[#181613] opacity-45 pointer-events-none hidden sm:block border-2 border-white dark:border-[#1F1C18] shadow-md transition-all duration-700"
              style={{
                transform: 'translate(-24px, 8px) scale(0.94) rotate(-1.5deg)',
              }}
            >
              <Image
                src={prevPhotoMeta.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 80vw, 540px"
                className="object-cover brightness-85"
              />
            </div>

            {/* Background Photo 2 (Next, Behind-Right #06) */}
            <div
              className="absolute w-[86%] sm:w-[90%] aspect-[4/3] rounded-3xl overflow-hidden bg-[#E8DED0] dark:bg-[#151310] opacity-32 pointer-events-none hidden sm:block border-2 border-white dark:border-[#1F1C18] shadow-md transition-all duration-700"
              style={{
                transform: 'translate(24px, 14px) scale(0.91) rotate(1.5deg)',
              }}
            >
              <Image
                src={nextPhotoMeta.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 80vw, 540px"
                className="object-cover brightness-75"
              />
            </div>

            {/* Active Front-most Travel Photograph (#05, #08, #35) */}
            <div
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
              onClick={() => setSelectedImageModal(photoMeta.image)}
              className="relative w-full max-w-[620px] aspect-[4/3] rounded-3xl overflow-hidden border-4 sm:border-6 border-white dark:border-[#1F1C18] bg-[#12120A] shadow-[0_24px_70px_rgba(23,21,18,0.12)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)] cursor-pointer z-10 group"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStory.id}
                  initial={{
                    opacity: 0.25,
                    scale: 0.94,
                    x: direction === 1 ? 80 : -80,
                    rotate: direction === 1 ? 1.5 : -1.5,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isPhotoHovered ? 1.025 : 1,
                    x: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0.25,
                    scale: 0.94,
                    x: direction === 1 ? -70 : 70,
                    rotate: direction === 1 ? -1.5 : 1.5,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={photoMeta.image}
                    alt={photoMeta.destination}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover transition-transform duration-700 ease-out"
                  />
                  {/* Localized Bottom Gradient Protection for Label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15" />
                </motion.div>
              </AnimatePresence>

              {/* Small Glass Memory Label (#24) */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <VariantGlass
                  intensity="photo"
                  className="rounded-full px-3.5 py-1 text-[10px] font-mono tracking-widest text-white uppercase border-white/25 flex items-center gap-2"
                >
                  <span className="font-bold text-[#D4A467]">{photoMeta.destination}</span>
                  <span className="text-white/40">·</span>
                  <span>{photoMeta.duration}</span>
                </VariantGlass>

                {/* Magic Hover Indicator (#35) */}
                <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1">
                  <span>View Memory</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4A467]" />
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Open Breathable Quote & Traveller Information (#04, #15, #18, #25) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            {/* The Real Testimonial Quote (#15, #16, #21) */}
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171512] dark:text-[#F5EFE6] tracking-tight leading-[1.25]"
                >
                  &ldquo;{currentStory.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Traveller Identity & Rating (#18) */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white tracking-tight uppercase">
                    {currentStory.name}
                  </h3>
                  <p className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] mt-0.5">
                    {currentStory.trip || currentStory.tripDestination}
                  </p>
                </div>

                {/* Rating (small, non-intrusive #16) */}
                <div className="flex text-[#D4A467]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Navigation Dock with Integrated Progress Line (#12, #13, #14) */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <VariantGlass
                  intensity="pill"
                  className="rounded-full px-4 py-2 flex items-center gap-3 border-white/70 dark:border-white/15 shadow-sm"
                >
                  <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] font-semibold tracking-widest">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                  </span>

                  <div className="h-4 w-px bg-black/10 dark:bg-white/15" />

                  {/* 40-44px Circular Glass Arrows (#14) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous traveller memory"
                      className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/10 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white flex items-center justify-center transition-all duration-200 active:scale-96 shadow-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next traveller memory"
                      className="w-8 h-8 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white flex items-center justify-center transition-all duration-200 active:scale-96 shadow-sm cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </VariantGlass>
              </div>

              {/* Progress Line (#12) */}
              <div className="w-24 sm:w-32 h-1 bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85D3A] transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Lightbox Modal on Image Click (#35) */}
      <AnimatePresence>
        {selectedImageModal && (
          <div
            onClick={() => setSelectedImageModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#171512] p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-[#D4A467] uppercase tracking-wider">
                  {photoMeta.destination} · {photoMeta.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedImageModal(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src={selectedImageModal}
                  alt={currentStory.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="pt-2 text-white">
                <p className="text-sm font-medium leading-relaxed">&ldquo;{currentStory.quote}&rdquo;</p>
                <p className="text-xs font-mono text-[#D4A467] mt-2 font-bold uppercase">
                  — {currentStory.name} ({currentStory.trip || currentStory.tripDestination})
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
