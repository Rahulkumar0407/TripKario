'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
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
  HERO_DESTINATION_COUNT,
  HERO_AUTOPLAY_MS,
  HERO_TRANSITION_DURATION,
} from '@/data/heroDestinations';
import type { HeroDestination } from '@/data/heroDestinations';
import { destinations } from '@/data/destinations';

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
          filter: 'blur(3px)',
        },
        enterAnimate: {
          x: [`${-5 * f}vw`, `${0.3 * f}vw`, '0vw'],
          y: ['0vh', '0vh', '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
          filter: ['blur(3px)', 'blur(0.5px)', 'blur(0px)'],
        },
        exitAnimate: {
          x: `${5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0.2,
          filter: 'blur(2px)',
        },
      };
    case 'bottom-to-top':
      return {
        enterInitial: {
          x: 0,
          y: `${5 * f}vh`,
          scale: 1.08,
          opacity: 0,
          filter: 'blur(3px)',
        },
        enterAnimate: {
          x: ['0vw', '0vw', '0vw'],
          y: [`${5 * f}vh`, `${-0.3 * f}vh`, '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
          filter: ['blur(3px)', 'blur(0.5px)', 'blur(0px)'],
        },
        exitAnimate: {
          x: 0,
          y: `${-5 * f}vh`,
          scale: 1.08,
          opacity: 0.2,
          filter: 'blur(2px)',
        },
      };
    case 'diagonal':
      return {
        enterInitial: {
          x: `${4 * f}vw`,
          y: `${3 * f}vh`,
          scale: 1.08,
          opacity: 0,
          filter: 'blur(3px)',
        },
        enterAnimate: {
          x: [`${4 * f}vw`, `${-0.2 * f}vw`, '0vw'],
          y: [`${3 * f}vh`, `${-0.2 * f}vh`, '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
          filter: ['blur(3px)', 'blur(0.5px)', 'blur(0px)'],
        },
        exitAnimate: {
          x: `${-4 * f}vw`,
          y: `${-3 * f}vh`,
          scale: 1.08,
          opacity: 0.2,
          filter: 'blur(2px)',
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
          filter: 'blur(3px)',
        },
        enterAnimate: {
          x: [`${5 * f}vw`, `${-0.3 * f}vw`, '0vw'],
          y: ['0vh', '0vh', '0vh'],
          scale: [1.08, 0.996, 1.0],
          opacity: [0, 0.85, 1],
          filter: ['blur(3px)', 'blur(0.5px)', 'blur(0px)'],
        },
        exitAnimate: {
          x: `${-5 * f}vw`,
          y: 0,
          scale: 1.08,
          opacity: 0.2,
          filter: 'blur(2px)',
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
  filter: 'blur(0px)',
};

// ════════════════════════════════════════════════════════════════
// HERO COMPONENT
// ════════════════════════════════════════════════════════════════

interface HeroProps {
  slides?: HeroDestination[];
  onOpenPlanTrip: (destination?: string) => void;
  onExploreJourney?: (destination: string) => void;
  onSearch: (filters: {
    destination: string;
    travelStyle: string;
    duration: string;
    budget: string;
  }) => void;
}

export default function Hero({ slides, onOpenPlanTrip, onExploreJourney, onSearch }: HeroProps) {
  const slidesList = slides && slides.length > 0 ? slides : heroDestinations;
  const slideCount = slidesList.length;

  // ── Scene State ──────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);

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

  // ── Parallax State ───────────────────────────────────────────
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
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

  // Pre-transition anticipation: ~500ms before auto-transition (>93% progress)
  const isAnticipating = sceneProgress > 93;

  // Paused when: scrolled away, user focusing search input, search dropdown open, or manual pause cooldown
  const isPaused =
    hasScrolled || isFocused || activeDropdown !== null || manualPause;

  // ── Trigger Manual Interaction (cancels autoplay, resets, waits 4s) ──
  const registerManualInteraction = useCallback(() => {
    setManualPause(true);
    setSceneProgress(0);
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
      setSceneProgress(0);
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
    const tickMs = 50;
    const step = (tickMs / HERO_AUTOPLAY_MS) * 100;
    const timer = setInterval(() => {
      setSceneProgress((old) => {
        if (old >= 100) {
          nextScene(false);
          return 0;
        }
        return old + step;
      });
    }, tickMs);
    return () => clearInterval(timer);
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

  // ── Mouse Parallax ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseParallax({ x, y });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

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
      className="relative min-h-[105vh] flex flex-col justify-end pb-[12vh] px-4 sm:px-6 md:px-10 overflow-hidden bg-[#090908]"
    >
      {/* ════════════════════════════════════════════
          LAYER 0: Full-Bleed Photography Viewport
          TWO-LAYER CINEMATIC TRANSITION SYSTEM
          ════════════════════════════════════════════ */}
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
                animate={{
                  x: mouseParallax.x * 3,
                  y: mouseParallax.y * 2,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 40 }}
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
              {/* Responsive Cinematic Directional Overlays */}
              {/* Desktop: Left-to-Right gradient (dark text zone on left -> crystal clear photograph on right) */}
              <div
                className="hidden lg:block absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(9,9,8,0.92) 0%, rgba(9,9,8,0.82) 28%, rgba(9,9,8,0.48) 48%, rgba(9,9,8,0.12) 68%, rgba(9,9,8,0) 100%), linear-gradient(to top, #090908 0%, rgba(9,9,8,0.82) 10%, rgba(9,9,8,0.25) 24%, transparent 40%)',
                }}
              />
              {/* Desktop Localized Text Focus Zone */}
              <div
                className="hidden lg:block absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 70% at 18% 46%, rgba(9,9,8,0.65) 0%, rgba(9,9,8,0.25) 50%, transparent 80%)',
                }}
              />
              {/* Mobile: Top-to-Bottom gradient (visible image on top -> dark text zone at bottom) */}
              <div
                className="lg:hidden block absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(9,9,8,0.30) 0%, transparent 18%, rgba(9,9,8,0.35) 45%, rgba(9,9,8,0.85) 70%, #090908 100%)',
                }}
              />
              {/* Exiting atmosphere wash — slides toward exit edge */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0 }}
                transition={{ duration: HERO_TRANSITION_DURATION * 0.8 }}
                style={{ backgroundColor: exiting.atmosphereWash }}
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
          {/* Parallax Image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              x: mouseParallax.x * 4,
              y: mouseParallax.y * 3,
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 40 }}
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
                // If image fails to load, revert to last valid
                if (lastValidIdx.current !== activeIdx) {
                  setActiveIdx(lastValidIdx.current);
                }
              }}
            />
          </motion.div>

          {/* ── Responsive Cinematic Directional Overlays ── */}
          {/* Desktop: Left-to-Right directional gradient (left 35-40% dark for typography -> right half 100% transparent & visible photograph) */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(9,9,8,0.92) 0%, rgba(9,9,8,0.80) 28%, rgba(9,9,8,0.45) 48%, rgba(9,9,8,0.10) 68%, rgba(9,9,8,0) 100%), linear-gradient(to top, #090908 0%, rgba(9,9,8,0.82) 10%, rgba(9,9,8,0.22) 24%, transparent 40%)',
            }}
          />
          {/* Desktop Localized Text Focus Zone */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 18% 46%, rgba(9,9,8,0.65) 0%, rgba(9,9,8,0.25) 50%, transparent 80%)',
            }}
          />

          {/* Mobile: Top-to-Bottom directional gradient (photograph clear on top -> rich dark contrast for text at bottom) */}
          <div
            className="lg:hidden block absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(9,9,8,0.30) 0%, transparent 18%, rgba(9,9,8,0.35) 45%, rgba(9,9,8,0.85) 70%, #090908 100%)',
            }}
          />

          {/* Subtle Destination atmosphere tint */}
          <motion.div
            key={`tint-${current.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: current.atmosphereColor }}
          />

          {/* Entering atmosphere wash — arrives with the scene */}
          {isTransitioning && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: HERO_TRANSITION_DURATION,
                delay: 0.25,
              }}
              style={{ backgroundColor: current.atmosphereWash }}
            />
          )}

          {/* Restrained photographic film grain */}
          <div
            className="absolute inset-0 bg-grain pointer-events-none"
            style={{ opacity: 0.12 }}
          />
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════════
          LAYER 2: Foreground Content
          Stable headline + staggered destination story
          Choreography: IMAGE -> CONTEXT -> INFO -> ACTION
          ════════════════════════════════════════════ */}
      <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 pt-32">
        {/* ── Left Column: Permanent Headline + Dynamic Destination ── */}
        <motion.div
          className="max-w-3xl space-y-5"
          style={{ y: headingExitY, opacity: headingExitOpacity }}
          animate={{
            x: mouseParallax.x * 8,
            y: mouseParallax.y * 6,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 35 }}
        >
          {/* ─── STABLE HEADLINE (animates once on mount, then stays) ─── */}
          <h1>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: EASE.out as [number, number, number, number],
                }}
                className="block text-[clamp(2.8rem,7vw+0.5rem,7.5rem)] font-serif font-normal leading-[0.95] tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
              >
                Where will you
              </motion.span>
            </span>

            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: EASE.out as [number, number, number, number],
                }}
                className="block text-[clamp(2.8rem,7vw+0.5rem,7.5rem)] font-serif font-normal leading-[0.95] tracking-[-0.02em] text-[#FF8A50] drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
              >
                go next?
              </motion.span>
            </span>
          </h1>

          {/* ─── STAGGERED DESTINATION INFO (changes with scene) ─── */}
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
                {/* 1. Destination Label (50-80ms behind image) */}
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

                {/* 2. Description (80-120ms behind image) */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1,
                    ease: EASE.out as [number, number, number, number],
                  }}
                  className="text-[14px] sm:text-base text-white/95 max-w-md leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                >
                  {current.caption}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── YASHI BRAND SIGNATURE (Brand layer: mounts once, stable across slide transitions) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.85,
              ease: EASE.out as [number, number, number, number],
            }}
            className="pt-1 select-none"
            aria-label="with love, Yashi"
          >
            <div className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <span className="text-[11px] sm:text-xs font-mono font-normal tracking-wide text-white/90">
                with love,
              </span>
              <span className="text-sm sm:text-[15px] font-serif text-[#FFAA70] tracking-normal font-semibold">
                Yashi
              </span>
            </div>
          </motion.div>

          {/* Brand Wit */}
          <p className="text-[11px] font-mono tracking-[0.06em] text-white/80 max-w-xs drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Planning a trip shouldn&apos;t require 47 WhatsApp messages.
          </p>

          {/* CTAs (150-220ms behind image) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.18,
              ease: EASE.out as [number, number, number, number],
            }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
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
          </motion.div>
        </motion.div>

        {/* ── Right Column: Glass Journey Note + Nav Controls ── */}
        <motion.div
          className="lg:mb-1 flex flex-col items-start sm:items-end gap-4"
          style={{ y: infoExitY, opacity: infoExitOpacity }}
          animate={{
            x: mouseParallax.x * 10,
            y: mouseParallax.y * 8,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 35 }}
        >
          {/* ─── GLASS JOURNEY NOTE ─── */}
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
                className="p-4 sm:p-5 text-white w-[280px] sm:w-[310px] shadow-2xl border border-white/20 bg-black/60 backdrop-blur-xl space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#FFAA70] font-bold">
                    {current.destination}
                  </span>
                  <span className="text-[10px] font-mono text-white/85 font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                    {current.duration}
                  </span>
                </div>

                {/* Route (100-150ms behind) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                  className="text-[11px] font-mono text-white/90 truncate font-medium flex items-center gap-1.5 pt-0.5"
                >
                  <MapPin className="w-3 h-3 text-[#FFAA70] shrink-0" />
                  <span className="truncate">{current.routeString}</span>
                </motion.div>

                {/* CTA Button */}
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

          {/* ─── COMPACT GLASS CONTROLS + DESTINATION TITLE TRANSITION ─── */}
          <div className="flex items-center gap-4">
            {/* Sliding Destination Title & Contact Sheet (Section 21) */}
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
                {/* 1.5px Progress Line (Section 11) */}
                <div className="w-16 h-[1.5px] bg-white/15 rounded-full overflow-hidden">
                  <motion.div
                    style={{ width: `${sceneProgress}%` }}
                    className="h-full bg-[#E46B3B] transition-all ease-linear"
                  />
                </div>
              </div>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <MagneticButton
                onClick={() => prevScene(true)}
                aria-label="Previous destination"
                className="w-9 h-9 rounded-full glass-surface flex items-center justify-center text-white/80 hover:text-white hover:border-[#E46B3B]/50 shadow-lg cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => nextScene(true)}
                aria-label="Next destination"
                className="w-9 h-9 rounded-full glass-surface flex items-center justify-center text-white/80 hover:text-white hover:border-[#E46B3B]/50 shadow-lg cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          LAYER 3: Destination Switcher & Search Dock
          ════════════════════════════════════════════ */}
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
        <div className="flex items-center justify-center sm:justify-start gap-1.5 overflow-x-auto no-scrollbar py-1">
          {heroDestinations.map((dest, i) => {
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

        {/* Mobile: single glass button */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => onOpenPlanTrip()}
            className="w-full px-5 py-3.5 rounded-2xl glass-surface text-white text-left flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-sm text-white/70 font-medium">
              Where are you going?
            </span>
          </button>
        </div>

        {/* Desktop: compact search bar */}
        <div className="hidden sm:block">
          <GlassSurface
            variant="frost"
            enableRefraction
            rounded="3xl"
            className="px-2 py-2 text-white shadow-2xl border border-white/15"
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
                      ? 'bg-white/12 ring-1 ring-[#E46B3B]/30'
                      : 'hover:bg-white/8'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-white/50 font-semibold">
                      WHERE
                    </span>
                    <span className="block text-[13px] font-medium truncate text-white">
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
                      className="p-0.5 text-white/50 hover:text-white"
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
                      className="absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl p-3 z-50 overflow-hidden bg-[#11100E]/95 text-white border border-white/15 backdrop-blur-2xl"
                    >
                      <div className="relative mb-2">
                        <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search (e.g. Kashmir, Rajasthan)"
                          value={destinationQuery}
                          onChange={(e) =>
                            setDestinationQuery(e.target.value)
                          }
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white/8 text-white placeholder:text-white/35 border border-white/8 focus:outline-none focus:border-[#E46B3B]/60"
                          autoFocus
                        />
                      </div>

                      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40 font-semibold px-1 block mb-1.5">
                        Popular Destinations
                      </span>

                      <div className="space-y-1 max-h-56 overflow-y-auto no-scrollbar">
                        <button
                          type="button"
                          onClick={() => handleSelectDest('')}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-white/8 flex items-center justify-between text-white"
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
                                : 'hover:bg-white/8 text-white'
                            }`}
                          >
                            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-black/20">
                              <Image
                                src={dest.image.src}
                                alt={dest.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-medium block truncate text-[12px]">
                                {dest.name}
                              </span>
                              <span className="text-[10px] text-white/60">
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
                <div className="w-px h-8 bg-white/10" />
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
                      ? 'bg-white/12 ring-1 ring-[#E46B3B]/30'
                      : 'hover:bg-white/8'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-white/50 font-semibold">
                      TRAVELLING AS
                    </span>
                    <span className="block text-[13px] font-medium truncate text-white">
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
                      className="absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-2xl p-2.5 z-50 bg-[#11100E]/95 text-white border border-white/15 backdrop-blur-2xl"
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
                                : 'hover:bg-white/8 text-white'
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
                      ? 'bg-white/12 ring-1 ring-[#E46B3B]/30'
                      : 'hover:bg-white/8'
                  }`}
                >
                  <IndianRupee className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                  <div className="flex-1 min-w-0 text-left">
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-white/50 font-semibold">
                      BUDGET
                    </span>
                    <span className="block text-[13px] font-medium truncate text-white">
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
                      className="absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-2xl p-2.5 z-50 bg-[#11100E]/95 text-white border border-white/15 backdrop-blur-2xl"
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
                                : 'hover:bg-white/8 text-white'
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
                  className="px-5 h-[42px] rounded-xl bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-lg text-[12px] font-semibold tracking-wide shrink-0"
                >
                  <span>Find My Trip</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </div>
            </form>
          </GlassSurface>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
          LAYER 4: Scroll Invitation
          ════════════════════════════════════════════ */}
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

      {/* ════════════════════════════════════════════
          LAYER 5: Attribution
          ════════════════════════════════════════════ */}
      {current.photographer && (
        <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2 text-[9px] font-mono text-white/40 tracking-wide">
          <span className="w-1 h-1 rounded-full bg-[#E46B3B]" />
          <span>Photo — {current.photographer}</span>
          <span className="text-white/20">·</span>
          <span className="hidden sm:inline">{current.source}</span>
        </div>
      )}
    </section>
  );
}
