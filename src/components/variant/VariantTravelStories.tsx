'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { testimonials, Testimonial } from '@/data/testimonials';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const AUTOPLAY_DURATION = 3500; // Fast & lively 3.5s frequent transitions

// Authentic trip destination photography matching each traveller's journey
const tripPhotographs: Record<string, { image: string; destination: string; route: string }> = {
  't-abhishek-goswami': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: 'Kashmir',
    route: 'Srinagar → Gulmarg → Pahalgam',
  },
  't-aditya-kanojia': {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
    destination: 'Himachal',
    route: 'Kullu → Manali → Solang Valley',
  },
  't-bhairo-parmar': {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
    destination: 'Kerala',
    route: 'Kochi → Munnar → Alleppey',
  },
  't-babalu-yadav': {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
    destination: 'Manali',
    route: 'Chandigarh → Manali → Solang',
  },
  't-yashika': {
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop',
    destination: 'Goa',
    route: 'Panaji → Divar Island → South Goa',
  },
  't-vipul-giri': {
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
    destination: 'Rajasthan',
    route: 'Jaipur → Jodhpur → Jaisalmer',
  },
  't-sameer-priyanka': {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: 'Kashmir',
    route: 'Srinagar → Nigeen Lake → Gulmarg',
  },
  't-dr-rajesh': {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
    destination: 'Rajasthan',
    route: 'Jodhpur → Jaisalmer Dunes',
  },
  't-tanvi-saxena': {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
    destination: 'Meghalaya',
    route: 'Shillong → Cherrapunji → Dawki',
  },
};

export default function VariantTravelStories() {
  const sectionRef = useRef<HTMLElement>(null);
  // Viewport trigger: only autoplay and trigger when the user scrolls to this section
  const isInView = useInView(sectionRef, { amount: 0.25 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const stories = testimonials;
  const currentStory: Testimonial = stories[currentIndex] || stories[0];

  const photoMeta = tripPhotographs[currentStory.id] || {
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    destination: currentStory.tripDestination || 'India',
    route: currentStory.trip || 'Curated Tour',
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

  const handleSelectIndex = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Viewport-aware continuous autoplay (starts automatically when user stops at the review section)
  useEffect(() => {
    if (!isInView || isHovered) return;

    const intervalStep = 40;
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
  }, [isInView, isHovered, handleNext]);

  return (
    <section
      ref={sectionRef}
      id="stories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#F4EFE7] dark:bg-[#0D0C0A] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Intro: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10"
        >
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
        </motion.div>

        {/* Main Composition: Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
        >
          {/* LEFT COLUMN: Large Travel Photo + Photo Filmstrip */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Authentic Travel Photograph with Cinematic Reveal */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden bg-[#12120A] shadow-[0_20px_60px_rgba(23,21,18,0.10)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)] border border-black/5 dark:border-white/10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStory.id}
                  initial={{
                    opacity: 0.2,
                    scale: 1.05,
                    x: direction === 1 ? 55 : -55,
                    filter: 'blur(4px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0.2,
                    scale: 0.96,
                    x: direction === 1 ? -50 : 50,
                    filter: 'blur(4px)',
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={photoMeta.image}
                    alt={currentStory.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover"
                  />
                  {/* Subtle Gradient Protection for Bottom Location Label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
                </motion.div>
              </AnimatePresence>

              {/* Small Glass Destination Label on Image */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/50 backdrop-blur-md text-white border border-white/20 font-bold">
                  {photoMeta.destination} · {photoMeta.route.split('→')[0].trim()}
                </span>
                <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 hidden sm:inline-block">
                  TripKario Travel Archive
                </span>
              </div>
            </div>

            {/* Photo Filmstrip: Contact Sheet of Upcoming Memories */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar pt-1">
              {stories.map((story, idx) => {
                const isSelected = idx === currentIndex;
                const thumbMeta = tripPhotographs[story.id] || photoMeta;

                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => handleSelectIndex(idx)}
                    aria-label={`View memory by ${story.name}`}
                    className={`relative shrink-0 w-16 sm:w-20 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-[#C85D3A] ring-offset-2 ring-offset-[#F4EFE7] dark:ring-offset-[#0D0C0A] opacity-100 scale-105 shadow-md'
                        : 'opacity-40 hover:opacity-85'
                    }`}
                  >
                    <Image
                      src={thumbMeta.image}
                      alt={story.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {/* Active Indicator */}
                    {isSelected && (
                      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-[#C85D3A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Open Editorial Typography & Integrated Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch space-y-6 pt-2">
            {/* The Real Testimonial Quote with Line Reveal Animation */}
            <div className="min-h-[140px] sm:min-h-[160px] flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(2px)' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171512] dark:text-[#F5EFE6] tracking-tight leading-[1.3] drop-shadow-sm">
                    &ldquo;{currentStory.quote}&rdquo;
                  </blockquote>

                  {currentStory.highlight && (
                    <p className="text-xs font-mono text-[#C85D3A] dark:text-[#E16A43] font-semibold">
                      ✦ {currentStory.highlight}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Traveller Identity, Rating & Integrated Editorial Controls */}
            <div className="space-y-5 pt-4 border-t border-black/5 dark:border-white/10">
              {/* Name & Trip with Stagger Animation */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white tracking-tight uppercase">
                        {currentStory.name}
                      </h3>
                      <p className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] mt-0.5">
                        {currentStory.trip || currentStory.tripDestination}
                      </p>
                    </div>

                    {/* Genuine 5-Star Rating */}
                    <div className="flex text-[#D4A467]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Integrated Editorial Controls: 01 / 09 ——————— ← → */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#171512] dark:text-white tracking-widest">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                  </span>

                  {/* Frequent Transition Progress Line */}
                  <div className="w-24 sm:w-36 h-[2px] bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C85D3A] transition-all duration-75 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Standalone Editorial Arrows */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous memory"
                    className="p-2 text-[#171512] dark:text-[#F5EFE6] hover:text-[#C85D3A] dark:hover:text-[#E16A43] transition-all duration-200 hover:-translate-x-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next memory"
                    className="p-2 text-[#171512] dark:text-[#F5EFE6] hover:text-[#C85D3A] dark:hover:text-[#E16A43] transition-all duration-200 hover:translate-x-1 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
