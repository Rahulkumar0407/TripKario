'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  PanInfo,
} from 'framer-motion';
import {
  Search,
  MapPin,
  Compass,
  IndianRupee,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  MessageCircle,
} from 'lucide-react';
import { EASE } from '@/lib/motion';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';
import {
  heroDestinations,
  preloadHeroImage,
  HERO_AUTOPLAY_MS,
  HERO_TRANSITION_DURATION,
} from '@/data/heroDestinations';
import type { HeroDestination } from '@/data/heroDestinations';
import { destinations } from '@/data/destinations';
import { openWhatsApp } from '@/lib/whatsapp';

// ════════════════════════════════════════════════════════════════
// TRANSITION DIRECTION & PHYSICAL OVERSHOOT HELPERS
// ════════════════════════════════════════════════════════════════

/**
 * Compute enter (initial/keyframes) and exit (animate-to) values
 * for the cinematic destination transition with subtle physical overshoot
 * (e.g. scale: 1.08 -> 0.996 -> 1.0, x: +5vw -> -0.3vw -> 0).
 */
function getTransitionValues(
  direction: HeroDestination['transitionDirection'],
  isNext: boolean
) {
  const f = isNext ? 1 : -1;

  switch (direction) {
    case 'left-to-right':
      return {
        enterInitial: {
          x: `${-5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0,
        },
        enterAnimate: {
          x: [`${-5 * f}vw`, `${0.3 * f}vw`, '0vw'],
          y: ['0vh', '0vh', '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
        },
        exitAnimate: {
          x: `${5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0.2,
        },
      };
    case 'bottom-to-top':
      return {
        enterInitial: {
          x: 0,
          y: `${5 * f}vh`,
          scale: 1.08,
          opacity: 0,
        },
        enterAnimate: {
          x: ['0vw', '0vw', '0vw'],
          y: [`${5 * f}vh`, `${-0.3 * f}vh`, '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
        },
        exitAnimate: {
          x: 0,
          y: `${-5 * f}vh`,
          scale: 1.08,
          opacity: 0.2,
        },
      };
    case 'diagonal':
      return {
        enterInitial: {
          x: `${4 * f}vw`,
          y: `${3 * f}vh`,
          scale: 1.08,
          opacity: 0,
        },
        enterAnimate: {
          x: [`${4 * f}vw`, `${-0.2 * f}vw`, '0vw'],
          y: [`${3 * f}vh`, `${-0.2 * f}vh`, '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
        },
        exitAnimate: {
          x: `${-4 * f}vw`,
          y: `${-3 * f}vh`,
          scale: 1.08,
          opacity: 0.2,
        },
      };
    case 'right-to-left':
    default:
      return {
        enterInitial: {
          x: `${5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0,
        },
        enterAnimate: {
          x: [`${5 * f}vw`, `${-0.3 * f}vw`, '0vw'],
          y: ['0vh', '0vh', '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
        },
        exitAnimate: {
          x: `${-5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0.2,
        },
      };
  }
}

/** Settled scene (no motion) */
const SCENE_SETTLED = {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 1,
};

// ════════════════════════════════════════════════════════════════
// HERO COMPONENT
// ════════════════════════════════════════════════════════════════

interface HeroProps {
  slides?: HeroDestination[];
  signature?: {
    enabled?: boolean;
    name?: string;
    prefix?: string;
    signatureEnabled?: boolean;
    signatureName?: string;
    signaturePrefix?: string;
  };
  onOpenPlanTrip: (destination?: string) => void;
  onExploreJourney?: (destination: string) => void;
  onSearch: (filters: {
    destination: string;
    travelStyle: string;
    duration: string;
    budget: string;
  }) => void;
}

export default function Hero({ slides, signature, onOpenPlanTrip, onExploreJourney, onSearch }: HeroProps) {
  const slidesList = slides && slides.length > 0 ? slides : heroDestinations;
  const slideCount = slidesList.length;

  // ── Scene State ──────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ── Pause / Manual Resume State ──────────────────────────────
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Search State ─────────────────────────────────────────────
  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<
    'dest' | 'style' | 'budget' | null
  >(null);

  // ── Mouse Parallax (Image Layer Only — Zero React Rerenders) ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 30, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 30, mass: 0.5 });
  // Clamped subtle background photo parallax: X: ±6px, Y: ±3.5px
  const imgParallaxX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const imgParallaxY = useTransform(smoothMouseY, [-1, 1], [-3.5, 3.5]);

  const heroRef = useRef<HTMLDivElement>(null);
  const lastValidIdx = useRef(0);

  // ── Scroll Parallax ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imgExitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const headingExitY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);
  const headingExitOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const infoExitY = useTransform(scrollYProgress, [0, 1], ['0px', '-25px']);
  const infoExitOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const searchExitY = useTransform(scrollYProgress, [0, 1], ['0px', '30px']);
  const searchExitOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const scrollInviteOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // ── Derived ──────────────────────────────────────────────────
  const current = slidesList[activeIdx] ?? slidesList[0];
  const exiting =
    exitingIdx !== null ? slidesList[exitingIdx] : null;

  const isAnticipating = false;

  // Paused when: scrolled away, user focusing search input, search dropdown open, or manual pause cooldown
  const isPaused =
    hasScrolled || isFocused || activeDropdown !== null || manualPause;

  // ── Trigger Manual Interaction (cancels autoplay, resets, waits 4s) ──
  const registerManualInteraction = useCallback(() => {
    setManualPause(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setManualPause(false);
    }, 4000); // 4.0s resume delay after user interaction
  }, []);

  // ── Navigation Callbacks ─────────────────────────────────────
  const goTo = useCallback(
    (nextIdx: number, dir: 'next' | 'prev', isManual = false) => {
      if (isTransitioning || nextIdx === activeIdx) return;
      if (isManual) {
        registerManualInteraction();
      }
      setDirection(dir);
      setExitingIdx(activeIdx);
      setActiveIdx(nextIdx);
      setIsTransitioning(true);
      lastValidIdx.current = activeIdx;
    },
    [activeIdx, isTransitioning, registerManualInteraction]
  );

  const nextScene = useCallback(
    (isManual = false) => {
      goTo((activeIdx + 1) % slideCount, 'next', isManual);
    },
    [activeIdx, goTo, slideCount]
  );

  const prevScene = useCallback(
    (isManual = false) => {
      goTo(
        (activeIdx - 1 + slideCount) % slideCount,
        'prev',
        isManual
      );
    },
    [activeIdx, goTo, slideCount]
  );

  // ── Transition Cleanup ───────────────────────────────────────
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setExitingIdx(null);
    }, HERO_TRANSITION_DURATION * 1000 + 100);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // ── Preload Next Image ───────────────────────────────────────
  useEffect(() => {
    const nextIdx = (activeIdx + 1) % slideCount;
    if (slidesList[nextIdx]?.image) {
      preloadHeroImage(slidesList[nextIdx].image);
    }
  }, [activeIdx, slideCount, slidesList]);

  // ── Auto-Rotation (7.5s smoothly paced, pauses on scroll/search) ───
  useEffect(() => {
    if (isPaused || isTransitioning) return;
    const timer = setTimeout(() => {
      nextScene(false);
    }, HERO_AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [isPaused, isTransitioning, activeIdx, nextScene]);

  // ── Scroll Detection (pauses on scroll, resumes only when back at top and idle) ──
  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled) {
        setHasScrolled(true);
      } else {
        if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = setTimeout(() => {
          setHasScrolled(false);
        }, 1000);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, []);

  // ── Mouse Parallax (Desktop Only, Clamped, Direct Motion Value Updates) ──
  useEffect(() => {
    // Only register mouse parallax on desktop devices with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const rawX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const rawY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      // Strictly clamp coordinates to [-1, 1] range to avoid runaway values
      const clampedX = Math.max(-1, Math.min(1, rawX));
      const clampedY = Math.max(-1, Math.min(1, rawY));
      mouseX.set(clampedX);
      mouseY.set(clampedY);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  // ── Drag / Swipe ─────────────────────────────────────────────
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 200) {
      if (info.offset.x < 0 || info.velocity.x < -200) {
        nextScene(true);
      } else {
        prevScene(true);
      }
    }
  };

  // ── Transition Animation Values ──────────────────────────────
  const transitionDir = current.transitionDirection;
  const isNext = direction === 'next';
  const { enterInitial, enterAnimate, exitAnimate } = getTransitionValues(
    transitionDir,
    isNext
  );

  // ── Content directional animation & subtle anticipation ──────
  const contentEnterX = isNext ? 18 : -18;
  const contentExitX = isNext ? -18 : 18;
  const anticipationOffset = isAnticipating ? (isNext ? -5 : 5) : 0;

  // ── Search Helpers ───────────────────────────────────────────
  const styleOptions = ['Couple', 'Family', 'Friends', 'Solo'];
  const budgetOptions = ['Under ₹15K', '₹15K–₹30K', '₹30K–₹50K', '₹50K+'];

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const handleSelectDest = (destName: string) => {
    setSelectedDestination(destName);
    setDestinationQuery(destName);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    onSearch({
      destination: selectedDestination || destinationQuery,
      travelStyle: selectedStyle,
      duration: '',
      budget: selectedBudget,
    });
  };

  // ════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════
  return (
    <section
      ref={heroRef}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative overflow-hidden bg-[#090908] text-white"
    >
      {/* ════════════════════════════════════════════════════════════════
          MOBILE COMPOSITION (< 1024px)
          Fast, thumb-friendly, beautiful travel app composition
          Structure: NAV -> PHOTOGRAPH -> METADATA -> HEADLINE -> COPY -> CTAs -> QUICK PILLS -> SEARCH
          ════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10 flex flex-col justify-between pt-20 pb-8 px-4 sm:px-6 min-h-[92vh] sm:min-h-screen">
        {/* 01. Mobile Photograph Viewport */}
        <div className="relative w-full h-[40vh] sm:h-[46vh] min-h-[260px] max-h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/40">
          <Image
            src={current.image}
            alt={current.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: current.focalPosition }}
            className="object-cover transition-opacity duration-300"
          />
          {/* Subtle protective gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Floating Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
            <span className="px-3 py-1 rounded-full bg-[#E46B3B] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
              {current.destination}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/20">
              {current.duration}
            </span>
          </div>

          {/* Bottom Route Bar */}
          <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none z-10 flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-[#FFAA70] font-semibold truncate drop-shadow-sm">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{current.routeString}</span>
            </span>
            <span className="text-[10px] text-white/70 font-mono pl-2 shrink-0">
              {current.region}
            </span>
          </div>
        </div>

        {/* 02. Mobile Typography & Primary Actions */}
        <div className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[#FFAA70] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E46B3B]" />
              <span>{current.destination} · {current.contactSheet}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-serif font-normal leading-[1.08] tracking-tight text-white">
              Where will you <span className="text-[#FF8A50]">go next?</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed line-clamp-2">
              Verified boutique stays, dedicated private chauffeurs, and curated itineraries across India.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onOpenPlanTrip(current.destination)}
              className="h-12 px-4 rounded-2xl bg-[#E46B3B] hover:bg-[#ED7B4D] active:scale-[0.98] text-white text-xs font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
            >
              <span>Find My Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                openWhatsApp(
                  `Hi TripKario! I am interested in planning a trip to ${current.destination}. Please help me with curated stays and private transport.`
                );
              }}
              className="h-12 px-4 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/25 text-white text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Destination Quick Selector Strip */}
          <div className="pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {slidesList.map((dest, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => goTo(i, i > activeIdx ? 'next' : 'prev', true)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-1 touch-manipulation ${
                      isActive
                        ? 'bg-[#E46B3B] text-white font-bold shadow-md'
                        : 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/15'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isActive ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                    <span>{dest.destination}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Search Trigger Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onOpenPlanTrip()}
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-left flex items-center gap-3 cursor-pointer shadow-lg active:scale-[0.98] transition-all touch-manipulation"
            >
              <div className="w-8 h-8 rounded-xl bg-[#E46B3B]/25 text-[#FF8A50] flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9px] font-mono uppercase tracking-wider text-white/60 font-bold">
                  WHERE ARE YOU GOING?
                </span>
                <span className="block text-xs text-white font-medium truncate">
                  Search destinations across India →
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP COMPOSITION (>= 1024px)
          Full-bleed cinematic layers with physical depth & glass controls
          ════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-[105vh] flex-col justify-end pb-[12vh] px-6 md:px-10 relative">
        {/* ── LAYER 0: Full-Bleed Photography Viewport ── */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ scale: imgExitScale }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {/* ── EXITING SCENE (visible only during transition) ── */}
          <AnimatePresence>
            {exiting && exitingIdx !== null && (
              <motion.div
                key={`exit-${exitingIdx}`}
                className="absolute inset-0 z-0"
                initial={false}
                animate={exitAnimate}
                exit={{ opacity: 0 }}
                transition={{
                  duration: HERO_TRANSITION_DURATION,
                  ease: EASE.out as [number, number, number, number],
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    x: imgParallaxX,
                    y: imgParallaxY,
                  }}
                >
                  <Image
                    src={exiting.image}
                    alt={exiting.alt}
                    fill
                    sizes="100vw"
                    style={{ objectPosition: exiting.focalPosition }}
                    className="object-cover"
                  />
                </motion.div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(9,9,8,0.92) 0%, rgba(9,9,8,0.82) 28%, rgba(9,9,8,0.48) 48%, rgba(9,9,8,0.12) 68%, rgba(9,9,8,0) 100%), linear-gradient(to top, #090908 0%, rgba(9,9,8,0.82) 10%, rgba(9,9,8,0.25) 24%, transparent 40%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 70% at 18% 46%, rgba(9,9,8,0.65) 0%, rgba(9,9,8,0.25) 50%, transparent 80%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── ENTERING / CURRENT SCENE ── */}
          <motion.div
            key={`scene-${activeIdx}`}
            className="absolute inset-0 z-[1] hero-camera-breathe"
            initial={isTransitioning ? enterInitial : false}
            animate={isTransitioning ? enterAnimate : SCENE_SETTLED}
            transition={{
              duration: HERO_TRANSITION_DURATION,
              times: isTransitioning ? [0, 0.78, 1] : undefined,
              ease: EASE.out as [number, number, number, number],
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                x: imgParallaxX,
                y: imgParallaxY,
              }}
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="100vw"
                style={{ objectPosition: current.focalPosition }}
                className="object-cover"
                onError={() => {
                  if (lastValidIdx.current !== activeIdx) {
                    setActiveIdx(lastValidIdx.current);
                  }
                }}
              />
            </motion.div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(9,9,8,0.92) 0%, rgba(9,9,8,0.80) 28%, rgba(9,9,8,0.45) 48%, rgba(9,9,8,0.10) 68%, rgba(9,9,8,0) 100%), linear-gradient(to top, #090908 0%, rgba(9,9,8,0.82) 10%, rgba(9,9,8,0.22) 24%, transparent 40%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 18% 46%, rgba(9,9,8,0.65) 0%, rgba(9,9,8,0.25) 50%, transparent 80%)',
              }}
            />

            <div
              className="absolute inset-0 bg-grain pointer-events-none"
              style={{ opacity: 0.12 }}
            />
          </motion.div>
        </motion.div>

        {/* ── LAYER 2: Foreground Content ── */}
        <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-row items-end justify-between gap-12 pt-32">
          {/* Left Column: Stable Headline */}
          <motion.div
            className="max-w-3xl space-y-5"
            style={{ y: headingExitY, opacity: headingExitOpacity }}
          >
            <h1>
              <span className="block overflow-hidden pb-1 -mb-1">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: EASE.out as [number, number, number, number],
                  }}
                  className="block text-[clamp(2.8rem,7vw+0.5rem,7.5rem)] font-serif font-normal leading-[1.04] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
                >
                  Where will you
                </motion.span>
              </span>

              <span className="block overflow-hidden pb-4 -mb-4 pt-1">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: EASE.out as [number, number, number, number],
                  }}
                  className="block text-[clamp(2.8rem,7vw+0.5rem,7.5rem)] font-serif font-normal leading-[1.04] tracking-[-0.02em] text-[#FF8A50] drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)] pb-1"
                >
                  go next?
                </motion.span>
              </span>
            </h1>

            {/* Staggered Destination Info */}
            <div className="space-y-2 pt-1 min-h-[54px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: contentEnterX }}
                  animate={{
                    opacity: 1,
                    x: anticipationOffset,
                  }}
                  exit={{ opacity: 0, x: contentExitX }}
                  transition={{
                    duration: 0.45,
                    ease: EASE.out as [number, number, number, number],
                  }}
                  className="space-y-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.06,
                      ease: EASE.out as [number, number, number, number],
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A50]" />
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#FFAA70] font-bold">
                      {current.destination}
                    </span>
                    <span className="text-white/40 text-xs">·</span>
                    <span className="text-[11px] font-mono text-white/90 font-medium">
                      {current.region}
                    </span>
                  </motion.div>

                  <p className="text-base text-white/90 font-light leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                    {current.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ─── DYNAMIC BRAND SIGNATURE (Brand layer: mounts once, stable across slide transitions) ─── */}
            {((signature?.signatureEnabled !== undefined ? signature.signatureEnabled : signature?.enabled) !== false) && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.85,
                  ease: EASE.out as [number, number, number, number],
                }}
                className="pt-1 flex items-baseline gap-1.5 select-none"
                aria-label={`${signature?.signaturePrefix || signature?.prefix || 'with love,'} ${signature?.signatureName || signature?.name || 'Yashi'}`}
              >
                <span className="text-[11px] sm:text-xs font-mono font-normal tracking-wide text-white/55">
                  {signature?.signaturePrefix || signature?.prefix || 'with love,'}
                </span>
                <span className="text-sm sm:text-[15px] font-serif font-normal text-[#F4A261] tracking-normal">
                  {signature?.signatureName || signature?.name || 'Yashi'}
                </span>
              </motion.div>
            )}

            {/* Brand Wit */}
            <p className="text-[11px] font-mono tracking-[0.06em] text-white/40 max-w-xs">
              Planning a trip shouldn&apos;t require 47 WhatsApp messages.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton
                onClick={() => onOpenPlanTrip(current.destination)}
                className="px-7 h-[48px] rounded-full bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-xl shadow-black/60 text-[13px] font-bold tracking-wide transition-all border border-white/20"
              >
                <span>Find My Trip</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  window.open(
                    `https://wa.me/919999999999?text=${encodeURIComponent(
                      'Hi TripKario! I am interested in planning a trip.'
                    )}`,
                    '_blank'
                  );
                }}
                className="px-5 h-[48px] rounded-full text-white text-[13px] font-bold tracking-wide border border-white/40 bg-black/60 hover:bg-black/80 hover:border-white/70 backdrop-blur-md shadow-xl shadow-black/50 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>Talk to an Expert</span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Glass Journey Note + Controls */}
          <motion.div
            className="mb-1 flex flex-col items-end gap-4"
            style={{ y: infoExitY, opacity: infoExitOpacity }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`note-${current.id}`}
                initial={{
                  opacity: 0,
                  x: direction === 'next' ? 22 : -22,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction === 'next' ? -22 : 22,
                }}
                transition={{
                  duration: 0.45,
                  ease: EASE.out as [number, number, number, number],
                }}
              >
                <GlassSurface
                  variant="dark"
                  enableRefraction
                  rounded="2xl"
                  className="p-5 text-white w-[310px] shadow-2xl border border-white/20 bg-black/60 backdrop-blur-xl space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FFAA70] font-bold">
                      {current.destination}
                    </span>
                    <span className="text-[10px] font-mono text-white/85 font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                      {current.duration}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-white/90 truncate font-medium flex items-center gap-1.5 pt-0.5">
                    <MapPin className="w-3 h-3 text-[#FFAA70] shrink-0" />
                    <span className="truncate">{current.routeString}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onExploreJourney) {
                        onExploreJourney(current.destination);
                      } else {
                        onOpenPlanTrip(current.destination);
                      }
                    }}
                    className="w-full text-center text-[11px] font-semibold tracking-wide text-[#FF8A50] hover:text-white hover:bg-white/10 transition-all py-2 rounded-xl border border-white/15 cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                  >
                    <span>Explore journey</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </GlassSurface>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Prev / Next & Progress Bar */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-1 min-w-[84px]">
                <div className="overflow-hidden h-[18px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`navtitle-${current.id}`}
                      initial={{ opacity: 0, y: isNext ? 8 : -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isNext ? -8 : 8 }}
                      transition={{
                        duration: 0.3,
                        ease: EASE.out as [number, number, number, number],
                      }}
                      className="block text-[11px] font-mono tracking-[0.2em] text-white font-bold uppercase tabular-nums"
                    >
                      {current.destination}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/50 tabular-nums">
                    {current.contactSheet}
                  </span>
                  <div className="w-16 h-[1.5px] bg-white/15 rounded-full overflow-hidden">
                    <div
                      key={`hero-progress-${activeIdx}`}
                      className="h-full bg-[#E46B3B]"
                      style={{
                        animation: isPaused || isTransitioning ? 'none' : `progressAnim ${HERO_AUTOPLAY_MS}ms linear forwards`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MagneticButton
                  onClick={() => prevScene(true)}
                  aria-label="Previous destination"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#141816]/80 hover:bg-[#C85D3A] active:bg-[#141816] text-[#FAF4E8] hover:text-white border border-white/30 hover:border-[#C85D3A] backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-200 ease-out flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C85D3A] focus-visible:outline-hidden cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  onClick={() => nextScene(true)}
                  aria-label="Next destination"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#141816]/80 hover:bg-[#C85D3A] active:bg-[#141816] text-[#FAF4E8] hover:text-white border border-white/30 hover:border-[#C85D3A] backdrop-blur-md shadow-lg shadow-black/40 transition-all duration-200 ease-out flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C85D3A] focus-visible:outline-hidden cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── LAYER 3: Desktop Search Bar Dock ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: EASE.out as [number, number, number, number],
          }}
          style={{ y: searchExitY, opacity: searchExitOpacity }}
          className="relative z-30 max-w-4xl mx-auto w-full mt-6 space-y-3"
        >
          {/* Destination Quick Selector Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {slidesList.map((dest, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => goTo(i, i > activeIdx ? 'next' : 'prev', true)}
                  className={`group relative px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#E46B3B] text-white font-bold shadow-lg shadow-[#E46B3B]/30'
                      : 'bg-black/35 hover:bg-black/60 text-white/70 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-md'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-white scale-110'
                        : 'bg-white/30 group-hover:bg-white/60'
                    }`}
                  />
                  <span>{dest.destination}</span>
                  {isActive && (
                    <span className="text-[9px] opacity-80 pl-0.5">
                      {dest.contactSheet}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <GlassSurface
            variant="frost"
            enableRefraction
            rounded="3xl"
            className="px-2 py-2 shadow-2xl border border-[var(--border-card)] bg-[var(--bg-surface)]/95 backdrop-blur-2xl text-[var(--text-primary)]"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-12 gap-1 items-center"
            >
              {/* Field 1: Destination */}
              <div className="relative col-span-5">
                <div
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'dest' ? null : 'dest'
                    )
                  }
                  className={`px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                    activeDropdown === 'dest'
                      ? 'bg-black/5 dark:bg-white/10 ring-1 ring-[#E46B3B]/40'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-[#6B625A] dark:text-[#A89F91] font-bold">
                      WHERE
                    </span>
                    <span className={`block text-[13px] font-medium truncate ${selectedDestination ? 'text-[#24211F] dark:text-[#FAF4E8]' : 'text-[#857B72] dark:text-[#A89F91]'}`}>
                      {selectedDestination || 'Search destination'}
                    </span>
                  </div>
                  {selectedDestination && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDestination('');
                        setDestinationQuery('');
                      }}
                      className="p-0.5 text-[#857B72] hover:text-[#24211F] dark:text-white/50 dark:hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Destination Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'dest' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl p-3 z-50 overflow-hidden bg-[var(--bg-surface)] dark:bg-[#141816] text-[var(--text-primary)] border border-[var(--border-card)] backdrop-blur-2xl"
                    >
                      <div className="relative mb-2">
                        <Search className="w-3.5 h-3.5 text-[#857B72] dark:text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search (e.g. Kashmir, Rajasthan)"
                          value={destinationQuery}
                          onChange={(e) =>
                            setDestinationQuery(e.target.value)
                          }
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[var(--bg-surface-2)] dark:bg-white/10 text-[#24211F] dark:text-[#FAF4E8] placeholder:text-[#857B72] dark:placeholder:text-white/40 border border-[var(--border-subtle)] focus:outline-none focus:border-[#E46B3B]"
                          autoFocus
                        />
                      </div>

                      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#6B625A] dark:text-white/50 font-bold px-1 block mb-1.5">
                        Popular Destinations
                      </span>

                      <div className="space-y-1 max-h-56 overflow-y-auto no-scrollbar">
                        <button
                          type="button"
                          onClick={() => handleSelectDest('')}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between text-[#24211F] dark:text-[#FAF4E8] cursor-pointer"
                        >
                          <span>Search anywhere in India</span>
                          {!selectedDestination && (
                            <Check className="w-3 h-3 text-[#E46B3B]" />
                          )}
                        </button>

                        {filteredDestinations.map((dest) => (
                          <button
                            key={dest.id}
                            type="button"
                            onClick={() => handleSelectDest(dest.name)}
                            className={`w-full text-left p-1.5 rounded-lg text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                              selectedDestination === dest.name
                                ? 'bg-[#E46B3B] text-white'
                                : 'hover:bg-black/5 dark:hover:bg-white/10 text-[#24211F] dark:text-[#FAF4E8]'
                            }`}
                          >
                            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-black/10">
                              <Image
                                src={dest.image.src}
                                alt={dest.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-semibold block truncate text-[12px]">
                                {dest.name}
                              </span>
                              <span className={`text-[10px] ${selectedDestination === dest.name ? 'text-white/80' : 'text-[#6B625A] dark:text-white/60'}`}>
                                {dest.durationDays}D / {dest.durationNights}N · {dest.region}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="col-span-0 hidden lg:flex justify-center">
                <div className="w-px h-8 bg-[var(--border-subtle)]" />
              </div>

              {/* Field 2: Travel Style */}
              <div className="relative col-span-3">
                <div
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'style' ? null : 'style'
                    )
                  }
                  className={`px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                    activeDropdown === 'style'
                      ? 'bg-black/5 dark:bg-white/10 ring-1 ring-[#E46B3B]/40'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-[#6B625A] dark:text-[#A89F91] font-bold">
                      TRAVELLING AS
                    </span>
                    <span className="block text-[13px] font-medium truncate text-[#24211F] dark:text-[#FAF4E8]">
                      {selectedStyle || 'Couple'}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === 'style' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-2xl p-2.5 z-50 bg-[var(--bg-surface)] dark:bg-[#141816] text-[var(--text-primary)] border border-[var(--border-card)] backdrop-blur-2xl"
                    >
                      <div className="space-y-0.5">
                        {styleOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSelectedStyle(opt);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                              selectedStyle === opt
                                ? 'bg-[#E46B3B] text-white'
                                : 'hover:bg-black/5 dark:hover:bg-white/10 text-[#24211F] dark:text-[#FAF4E8]'
                            }`}
                          >
                            <span>{opt}</span>
                            {selectedStyle === opt && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Field 3: Budget + Submit */}
              <div className="relative col-span-4 flex items-center gap-1.5">
                <div
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'budget' ? null : 'budget'
                    )
                  }
                  className={`flex-1 px-3 py-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer ${
                    activeDropdown === 'budget'
                      ? 'bg-black/5 dark:bg-white/10 ring-1 ring-[#E46B3B]/40'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <IndianRupee className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-[#6B625A] dark:text-[#A89F91] font-bold">
                      BUDGET
                    </span>
                    <span className="block text-[13px] font-medium truncate text-[#24211F] dark:text-[#FAF4E8]">
                      {selectedBudget || '₹25K'}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeDropdown === 'budget' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-2xl p-2.5 z-50 bg-[var(--bg-surface)] dark:bg-[#141816] text-[var(--text-primary)] border border-[var(--border-card)] backdrop-blur-2xl"
                    >
                      <div className="space-y-0.5">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setSelectedBudget(b);
                              setActiveDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                              selectedBudget === b
                                ? 'bg-[#E46B3B] text-white'
                                : 'hover:bg-black/5 dark:hover:bg-white/10 text-[#24211F] dark:text-[#FAF4E8]'
                            }`}
                          >
                            <span>{b}</span>
                            {selectedBudget === b && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <MagneticButton
                  type="submit"
                  className="px-5 h-[42px] rounded-xl bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-lg text-[12px] font-semibold tracking-wide shrink-0 cursor-pointer"
                >
                  <span>Find My Trip</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </div>
            </form>
          </GlassSurface>
        </motion.div>

        {/* ── LAYER 4: Scroll Invitation ── */}
        <motion.div
          style={{ opacity: scrollInviteOpacity }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 ${
            hasScrolled ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/50 font-semibold">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-white/30 scroll-line-anim" />
        </motion.div>

        {/* ── LAYER 5: Attribution ── */}
        {current.photographer && (
          <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2 text-[9px] font-mono text-white/40 tracking-wide">
            <span className="w-1 h-1 rounded-full bg-[#E46B3B]" />
            <span>Photo — {current.photographer}</span>
            <span className="text-white/20">·</span>
            <span className="hidden sm:inline">{current.source}</span>
          </div>
        )}
      </div>
    </section>
  );
}

