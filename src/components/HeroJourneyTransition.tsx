'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, MapPin, Sparkles } from 'lucide-react';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';
import { formatPrice } from '@/lib/utils';
import { destinations } from '@/data/destinations';

export interface TransitionJourneyData {
  id: string;
  name: string;
  tagline: string;
  descriptor: string;
  title: string;
  routePoints: string[];
  routeString: string;
  duration: string;
  startingPrice: number;
  primaryImage: {
    src: string;
    alt: string;
    photographer: string;
    location: string;
  };
  secondaryImage: {
    src: string;
    alt: string;
    photographer: string;
    location: string;
  };
  direction: 'left-to-right' | 'right-to-left' | 'bottom-to-top' | 'diagonal' | 'center-expansion';
  atmosphere: string;
}

export const TRANSITION_SCENES: TransitionJourneyData[] = [
  {
    id: 'kashmir',
    name: 'Kashmir',
    tagline: 'Misty waters, cedar woods & alpine snow',
    descriptor: 'Where morning mist drifts over cedar houseboats.',
    title: 'The Great Kashmir Escape',
    routePoints: ['SRINAGAR', 'GULMARG', 'PAHALGAM'],
    routeString: 'Srinagar → Gulmarg → Pahalgam',
    duration: '06N · 07D',
    startingPrice: 24999,
    primaryImage: {
      src: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=90&w=2600&auto=format&fit=crop',
      alt: 'Shikara cutting through morning mist on Dal Lake in Srinagar, Kashmir',
      photographer: 'Ayan Mukherjee',
      location: 'Dal Lake, Srinagar',
    },
    secondaryImage: {
      src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=2600&auto=format&fit=crop',
      alt: 'Snow-dusted pine valley and turquoise stream in Betaab Valley, Kashmir',
      photographer: 'Imran Khuroo',
      location: 'Betaab Valley, Pahalgam',
    },
    direction: 'right-to-left',
    atmosphere: 'rgba(45, 90, 120, 0.18)',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    tagline: 'Sunlit sandstone citadels & starry dunes',
    descriptor: 'Where sunset casts 300-year-old fort shadows.',
    title: 'Royal Citadels & Desert Dunes',
    routePoints: ['JAIPUR', 'JODHPUR', 'JAISALMER'],
    routeString: 'Jaipur → Jodhpur → Jaisalmer',
    duration: '05N · 06D',
    startingPrice: 21999,
    primaryImage: {
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2600&auto=format&fit=crop',
      alt: 'Traveller walking through warm sandstone haveli courtyard in Rajasthan',
      photographer: 'Prateek Gautam',
      location: 'Jaisalmer Fort',
    },
    secondaryImage: {
      src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=90&w=2600&auto=format&fit=crop',
      alt: 'Golden sun setting over the Thar Desert dunes with a solitary caravan',
      photographer: 'Sanket Joshi',
      location: 'Sam Sand Dunes, Thar',
    },
    direction: 'bottom-to-top',
    atmosphere: 'rgba(180, 120, 60, 0.16)',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: 'Monsoon waterways, spice hills & slow mornings',
    descriptor: 'Where emerald waters whisper through coconut groves.',
    title: 'Emerald Backwaters & Cardamom Slopes',
    routePoints: ['KOCHI', 'MUNNAR', 'ALLEPPEY'],
    routeString: 'Kochi → Munnar → Alleppey',
    duration: '05N · 06D',
    startingPrice: 19999,
    primaryImage: {
      src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=2600&auto=format&fit=crop',
      alt: 'Local boatman navigating a wooden canoe through palm backwaters in Alleppey',
      photographer: 'Navaneeth Kishore',
      location: 'Vembanad Lake, Alleppey',
    },
    secondaryImage: {
      src: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=90&w=2600&auto=format&fit=crop',
      alt: 'Misty layered green tea plantation hills in Munnar at dawn',
      photographer: 'Kishore PV',
      location: 'Munnar Tea Highlands',
    },
    direction: 'diagonal',
    atmosphere: 'rgba(60, 140, 90, 0.14)',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    tagline: 'Living root bridges, sacred groves & cloud trails',
    descriptor: 'Where living bridges grow across turquoise river canyons.',
    title: 'Living Root Bridges & Sacred Valleys',
    routePoints: ['SHILLONG', 'CHERRAPUNJI', 'DAWKI'],
    routeString: 'Shillong → Cherrapunji → Dawki',
    duration: '04N · 05D',
    startingPrice: 22499,
    primaryImage: {
      src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=2600&auto=format&fit=crop',
      alt: 'Ancient double-decker living root bridge in Nongriat, Cherrapunji',
      photographer: 'Subham Kar',
      location: 'Nongriat, Cherrapunji',
    },
    secondaryImage: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=2600&auto=format&fit=crop',
      alt: 'Crystal clear emerald waters of the Umngot River canyon in Dawki',
      photographer: 'Anirudh Roy',
      location: 'Umngot River, Dawki',
    },
    direction: 'center-expansion',
    atmosphere: 'rgba(40, 100, 70, 0.16)',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    tagline: 'High-altitude mountain passes & celestial skies',
    descriptor: 'Where the high mountain road meets the sky.',
    title: 'High-Altitude Passes & Monasteries',
    routePoints: ['LEH', 'NUBRA VALLEY', 'PANGONG TSO'],
    routeString: 'Leh → Nubra → Pangong',
    duration: '07N · 08D',
    startingPrice: 31999,
    primaryImage: {
      src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=2600&auto=format&fit=crop',
      alt: 'Monk standing on terrace of Thiksey Gompa overlooking the Indus Valley',
      photographer: 'Rohit Sharma',
      location: 'Thiksey Gompa, Leh',
    },
    secondaryImage: {
      src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=2600&auto=format&fit=crop',
      alt: 'Monk standing on terrace of Thiksey Gompa overlooking the Indus Valley',
      photographer: 'Rohit Sharma',
      location: 'Thiksey Gompa, Leh',
    },
    direction: 'left-to-right',
    atmosphere: 'rgba(60, 80, 130, 0.18)',
  },
];

interface HeroJourneyTransitionProps {
  activeSceneIdx?: number;
  onOpenPlanTrip: (destination?: string) => void;
}

export default function HeroJourneyTransition({
  activeSceneIdx = 0,
  onOpenPlanTrip,
}: HeroJourneyTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const safeIdx = Math.max(0, Math.min(activeSceneIdx, TRANSITION_SCENES.length - 1));
  const scene = TRANSITION_SCENES[safeIdx] || TRANSITION_SCENES[0];

  // ─── Continuous Scroll Scrubbing ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Camera forward zoom & hero image transform
  const heroImgScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.15]);
  const heroImgOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 0.85, 0.15]);
  const heroImgY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-8%']);

  // Route path reveal (0.15 -> 0.65)
  const routeLineProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 100]);
  const routeOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.8, 0.95], [0, 1, 1, 0.3]);
  const routeY = useTransform(scrollYProgress, [0.15, 0.55], [25, 0]);

  // Second Deep Photograph reveal (0.35 -> 0.75)
  const secondImgScale = useTransform(scrollYProgress, [0.35, 0.75, 1], [1.12, 1.0, 1.02]);
  const secondImgOpacity = useTransform(scrollYProgress, [0.32, 0.52], [0, 1]);
  const secondImgParallaxY = useTransform(scrollYProgress, [0.5, 1], ['0px', '-30px']);

  // Directional clip reveal transforms based on active destination direction
  const clipLeftToRight = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)']
  );
  const clipRightToLeft = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)']
  );
  const clipBottomToTop = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  );
  const clipCenterExpansion = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ['inset(20% 20% 20% 20% round 30px)', 'inset(0% 0% 0% 0% round 0px)']
  );

  const getActiveClipPath = () => {
    if (isReducedMotion) return undefined;
    switch (scene.direction) {
      case 'left-to-right':
        return clipLeftToRight;
      case 'right-to-left':
        return clipRightToLeft;
      case 'bottom-to-top':
        return clipBottomToTop;
      case 'center-expansion':
      case 'diagonal':
      default:
        return clipCenterExpansion;
    }
  };

  // Typography transitions (0.50 -> 0.85)
  const headerOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.45, 0.65], [40, 0]);

  const descriptorOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const descriptorY = useTransform(scrollYProgress, [0.55, 0.75], [30, 0]);

  const cardOpacity = useTransform(scrollYProgress, [0.65, 0.88], [0, 1]);
  const cardScale = useTransform(scrollYProgress, [0.65, 0.88], [0.92, 1]);
  const cardY = useTransform(scrollYProgress, [0.65, 0.88], [35, 0]);

  // Ambient atmosphere wash
  const ambientOpacity = useTransform(scrollYProgress, [0.15, 0.65], [0.3, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#090908] text-[var(--text-primary)]"
      id="journey-transition"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-10">

        {/* ════════════════════════════════════════════
            BACKGROUND LAYER: Hero Photographic Continuity
            ════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{
            scale: isReducedMotion ? 1 : heroImgScale,
            opacity: isReducedMotion ? 0.3 : heroImgOpacity,
            y: isReducedMotion ? '0%' : heroImgY,
          }}
        >
          <Image
            src={scene.primaryImage.src}
            alt={scene.primaryImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.75]"
          />
          {/* Deep atmosphere gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60" />
        </motion.div>

        {/* ════════════════════════════════════════════
            ATMOSPHERIC GLOW LAYER: Destination-specific wash
            ════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none blur-[100px]"
          style={{
            backgroundColor: scene.atmosphere,
            opacity: isReducedMotion ? 0.4 : ambientOpacity,
          }}
        />

        {/* ════════════════════════════════════════════
            STAGE LAYER: Second Deep Photograph (Forward Camera Move)
            ════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[2] overflow-hidden"
          style={{
            clipPath: getActiveClipPath(),
            opacity: isReducedMotion ? 1 : secondImgOpacity,
            scale: isReducedMotion ? 1 : secondImgScale,
            y: isReducedMotion ? '0px' : secondImgParallaxY,
          }}
        >
          <div
            className="relative w-full h-full cursor-pointer group"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            onClick={() => onOpenPlanTrip(scene.name)}
          >
            <Image
              src={scene.secondaryImage.src}
              alt={scene.secondaryImage.alt}
              fill
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-700 ease-out ${
                isHoveringImage ? 'scale-[1.04]' : 'scale-100'
              }`}
            />
            {/* Cinematic shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-black/35 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

            {/* Hover Glass Pill Cue */}
            <AnimatePresence>
              {isHoveringImage && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                >
                  <div className="px-6 py-3 rounded-full bg-black/60 border border-white/30 backdrop-blur-2xl text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-2xl">
                    <Sparkles className="w-3.5 h-3.5 text-[#E46B3B]" />
                    <span>Explore {scene.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E46B3B]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════
            FOREGROUND LAYER: Cinematic Route Line Annotation
            ════════════════════════════════════════════ */}
        <motion.div
          className="relative z-10 max-w-[1400px] mx-auto w-full pt-16 sm:pt-20 pointer-events-none"
          style={{
            opacity: isReducedMotion ? 1 : routeOpacity,
            y: isReducedMotion ? 0 : routeY,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#E46B3B]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E46B3B] font-bold">
                TRANSITION SCENE · {scene.name}
              </span>
            </div>

            {/* Dynamic Animated Route Waypoints */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {scene.routePoints.map((point, i) => (
                <React.Fragment key={point}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E46B3B] animate-pulse" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/80 font-semibold">
                      {point}
                    </span>
                  </div>
                  {i < scene.routePoints.length - 1 && (
                    <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-white/40 via-[#E46B3B]/60 to-white/40" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════
            FOREGROUND LAYER: Typography & Settled Journey Card
            ════════════════════════════════════════════ */}
        <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 sm:pb-12">

          {/* ── Left Editorial Story ── */}
          <div className="max-w-2xl space-y-4 text-white">
            {/* Supertitle */}
            <motion.div
              style={{
                opacity: isReducedMotion ? 1 : headerOpacity,
                y: isReducedMotion ? 0 : headerY,
              }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F4A261] font-semibold">
                YOUR NEXT JOURNEY
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[11px] font-mono text-white/60">
                Start with a place. We&apos;ll help with the rest.
              </span>
            </motion.div>

            {/* Main Destination Title */}
            <motion.div
              style={{
                opacity: isReducedMotion ? 1 : headerOpacity,
                y: isReducedMotion ? 0 : headerY,
              }}
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight leading-[0.96] text-white">
                {scene.name}
              </h2>
            </motion.div>

            {/* Descriptor */}
            <motion.p
              style={{
                opacity: isReducedMotion ? 1 : descriptorOpacity,
                y: isReducedMotion ? 0 : descriptorY,
              }}
              className="text-base sm:text-xl text-white/85 font-normal leading-relaxed max-w-lg"
            >
              {scene.descriptor}
            </motion.p>
          </div>

          {/* ── Right Settled Journey Action Card ── */}
          <motion.div
            style={{
              opacity: isReducedMotion ? 1 : cardOpacity,
              scale: isReducedMotion ? 1 : cardScale,
              y: isReducedMotion ? 0 : cardY,
            }}
            className="w-full lg:w-auto"
          >
            <GlassSurface
              variant="dark"
              enableRefraction
              rounded="3xl"
              className="p-6 sm:p-7 text-white w-full lg:w-[360px] shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#F4A261] font-bold">
                  {scene.title}
                </span>
                <span className="text-[10px] font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                  {scene.duration}
                </span>
              </div>

              <div className="text-xs font-mono text-white/60 mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E46B3B] shrink-0" />
                <span className="truncate">{scene.routeString}</span>
              </div>

              <div className="flex items-baseline justify-between pt-4 border-t border-white/15 mb-5">
                <span className="text-[11px] font-mono text-white/60">Starting from</span>
                <span className="text-2xl font-serif font-bold text-white tabular-nums">
                  {formatPrice(scene.startingPrice)}{' '}
                  <span className="text-xs font-normal text-white/60 font-sans">/ person</span>
                </span>
              </div>

              <MagneticButton
                onClick={() => onOpenPlanTrip(scene.name)}
                dataCursor="EXPLORE"
                className="w-full h-12 rounded-2xl bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2"
              >
                <span>EXPLORE THIS JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </GlassSurface>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════
            METADATA ATTACHMENT: Photographer Credit
            ════════════════════════════════════════════ */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>Scene — {scene.secondaryImage.location}</span>
          <span>Photo — {scene.secondaryImage.photographer}</span>
        </div>
      </div>
    </section>
  );
}
