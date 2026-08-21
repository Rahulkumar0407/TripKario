'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, MapPin, Sparkles, Clock, ChevronRight } from 'lucide-react';

export interface OrbitItinerary {
  id: string;
  chapterNumber: string;
  destination: string;
  title: string;
  subtitle: string;
  route: string;
  duration: string;
  priceDisplay: string;
  isPriceOnRequest: boolean;
  tag: string;
  image: {
    src: string;
    alt: string;
  };
  highlights: string[];
  atmosphereColor: string;
}

export const orbitItineraries: OrbitItinerary[] = [
  {
    id: 'kashmir-signature',
    chapterNumber: '01',
    destination: 'Kashmir',
    title: 'The Great Kashmir Escape',
    subtitle: 'Lakeside cedar houseboats & Lidder chalets',
    route: 'Srinagar → Gulmarg → Pahalgam → Sonamarg',
    duration: '6 Nights · 7 Days',
    priceDisplay: '₹20,900',
    isPriceOnRequest: false,
    tag: 'Signature Circuit',
    atmosphereColor: 'rgba(56, 189, 248, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
      alt: 'Shikara cutting through morning mist on Dal Lake in Srinagar, Kashmir',
    },
    highlights: ['Cedar Houseboat Stays', 'Gulmarg Gondola Passes', 'Lidder River Chalet'],
  },
  {
    id: 'ladakh-high-passes',
    chapterNumber: '02',
    destination: 'Ladakh',
    title: 'High Passes & Monastery Chants',
    subtitle: 'Cobalt Pangong Tso & ancient cliff gompas',
    route: 'Leh → Sham Valley → Nubra → Pangong Tso',
    duration: '7 Nights · 8 Days',
    priceDisplay: '₹22,000',
    isPriceOnRequest: false,
    tag: 'Trans-Himalayan',
    atmosphereColor: 'rgba(96, 165, 250, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1600&auto=format&fit=crop',
      alt: 'Ancient cliffside Thiksey Monastery in Ladakh',
    },
    highlights: ['Khardung La (17,982 ft)', 'Pangong Cobalt Lake', 'Cliffside Gompa Prayers'],
  },
  {
    id: 'spiti-circuit',
    chapterNumber: '03',
    destination: 'Spiti Valley',
    title: 'Spiti High-Altitude Circuit',
    subtitle: 'Key cliff gompa & Chandratal camping',
    route: 'Shimla → Kalpa → Kaza → Chandratal → Manali',
    duration: '7 Nights · 8 Days',
    priceDisplay: '₹18,990',
    isPriceOnRequest: false,
    tag: 'Offbeat Himalayan',
    atmosphereColor: 'rgba(251, 146, 60, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
      alt: 'Dramatic canyon valleys and snowy peaks in Spiti Valley',
    },
    highlights: ['1,000-Yr Key Gompa', 'Crescent Chandratal Lake', 'Highest Post Office (Hikkim)'],
  },
  {
    id: 'meghalaya-cloud-trails',
    chapterNumber: '04',
    destination: 'Meghalaya',
    title: 'Living Roots & Sacred Rainforests',
    subtitle: 'Double-decker root bridges & crystal rivers',
    route: 'Guwahati → Shillong → Cherrapunji → Dawki',
    duration: '5 Nights · 6 Days',
    priceDisplay: '₹15,999',
    isPriceOnRequest: false,
    tag: 'Rainforest Wonder',
    atmosphereColor: 'rgba(16, 185, 129, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
      alt: 'Living root bridge enveloped by rainforest mist in Meghalaya',
    },
    highlights: ['Double Decker Root Trek', 'Umngot Glass River Boating', 'Cherrapunji Waterfalls'],
  },
  {
    id: 'tawang-monasteries',
    chapterNumber: '05',
    destination: 'Tawang & Arunachal',
    title: 'Tawang High Pass Circuit',
    subtitle: 'Sela Pass & 400-year-old monastery',
    route: 'Guwahati → Dirang → Sela Pass → Tawang',
    duration: '6 Nights · 7 Days',
    priceDisplay: '₹21,000',
    isPriceOnRequest: false,
    tag: 'Eastern Himalaya',
    atmosphereColor: 'rgba(14, 165, 233, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
      alt: 'Buddhist monastery in Tawang with snow peaks in background',
    },
    highlights: ['Sela Mountain Pass (13,700 ft)', '400-Year Tawang Gompa', 'Madhuri Glacial Lake'],
  },
  {
    id: 'himachal-jibhi-tirthan',
    chapterNumber: '06',
    destination: 'Himachal Pradesh',
    title: 'Tirthan River & Jibhi Pine Glades',
    subtitle: 'Crystal trout rivers & wooden chalets',
    route: 'Delhi → Aut → Jibhi → Jalori Pass → Tirthan',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Slow Mountain',
    atmosphereColor: 'rgba(34, 197, 94, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
      alt: 'Traditional wooden Himalayan home surrounded by cedar trees in Tirthan',
    },
    highlights: ['Cedar Riverside Chalets', 'Jalori Pass Summit Walk', 'Trout Stream Trails'],
  },
  {
    id: 'rajasthan-heritage',
    chapterNumber: '07',
    destination: 'Rajasthan',
    title: 'Royal Citadels & Desert Dunes',
    subtitle: 'Sandstone forts & Jaisalmer stargazing',
    route: 'Jaipur → Jodhpur → Jaisalmer Thar Desert',
    duration: '5 Nights · 6 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Royal Heritage',
    atmosphereColor: 'rgba(245, 158, 11, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
      alt: 'Sandstone courtyard illuminated by desert sunlight in Rajasthan',
    },
    highlights: ['Restored Heritage Havelis', 'Thar Desert Stargazing Camp', 'Private Fort Walks'],
  },
  {
    id: 'goa-slow-coastal',
    chapterNumber: '08',
    destination: 'Goa',
    title: 'Portuguese Quarters & Hidden Coves',
    subtitle: 'Fontainhas heritage lanes & Agonda sands',
    route: 'Panjim → Fontainhas → Palolem → Agonda',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Coastal Soul',
    atmosphereColor: 'rgba(20, 184, 166, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop',
      alt: 'Tranquil sunset on quiet palm beach in South Goa',
    },
    highlights: ['Fontainhas Latin Walking Tour', 'Uncrowded Agonda Sands', 'Cabo de Rama Cliff Sunset'],
  },
  {
    id: 'kerala-backwaters',
    chapterNumber: '09',
    destination: 'Kerala',
    title: 'Emerald Waters & Spice Hills',
    subtitle: 'Palm canal houseboats & Munnar tea slopes',
    route: 'Kochi → Munnar → Thekkady → Alleppey',
    duration: '5 Nights · 6 Days',
    priceDisplay: '₹11,100',
    isPriceOnRequest: false,
    tag: 'Tropical Haven',
    atmosphereColor: 'rgba(16, 185, 129, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
      alt: 'Wooden houseboat floating through emerald palm-fringed backwaters of Alleppey',
    },
    highlights: ['Private Houseboat Cruise', 'Munnar Tea Slopes Walk', 'Cardamom Plantation Trails'],
  },
  {
    id: 'south-coorg-wayanad',
    chapterNumber: '10',
    destination: 'South India Hills',
    title: 'Coffee Plantations & Rainforest Streams',
    subtitle: 'Estate bungalows & Wayanad peaks',
    route: 'Bangalore → Mysore → Coorg → Wayanad',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Western Ghats',
    atmosphereColor: 'rgba(34, 197, 94, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop',
      alt: 'Lush green coffee estate and mist in Coorg',
    },
    highlights: ['Estate Heritage Bungalows', 'Coffee Tasting Walk', 'Rainforest Waterfalls'],
  },
  {
    id: 'uttarakhand-rishikesh-chopta',
    chapterNumber: '11',
    destination: 'Uttarakhand',
    title: 'Chopta Tungnath & Rishikesh Trail',
    subtitle: 'Highest Shiva temple & alpine meadows',
    route: 'Delhi → Rishikesh → Devprayag → Chopta',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Alpine Sanctuary',
    atmosphereColor: 'rgba(56, 189, 248, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop',
      alt: 'Alpine meadows and high mountain ranges in Chopta Uttarakhand',
    },
    highlights: ['Tungnath Summit (12,100 ft)', 'Riverside Ganga Camps', 'Alpine Bugyal Meadows'],
  },
  {
    id: 'south-ooty-kodaikanal',
    chapterNumber: '12',
    destination: 'Deep South',
    title: 'Nilgiri Blue Hills & Southern Horizons',
    subtitle: 'Heritage toy train & mist pine lakes',
    route: 'Coimbatore → Ooty → Coonoor → Kodaikanal',
    duration: '5 Nights · 6 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Southern Cape',
    atmosphereColor: 'rgba(14, 165, 233, 0.10)',
    image: {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop',
      alt: 'Rolling tea gardens and pine hills in Nilgiris and Southern Cape',
    },
    highlights: ['UNESCO Heritage Toy Train', 'Pillar Rocks Vista', 'Ocean Sunset Horizon'],
  },
];

interface IndiaJourneyShowcaseProps {
  onSelectJourney?: (destination: string) => void;
}

export default function IndiaJourneyShowcase({ onSelectJourney }: IndiaJourneyShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitTrackRef = useRef<HTMLDivElement>(null);

  const [activeFrontIdx, setActiveFrontIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(480);

  // ── Physics Refs (NO continuous React re-renders) ───────────────────────────
  const targetRotRef = useRef(0);
  const currentRotRef = useRef(0);
  const activeFrontIdxRef = useRef(0);

  const totalCards = orbitItineraries.length;

  // Responsive orbit radius
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setOrbitRadius(260);
      } else if (w < 1024) {
        setOrbitRadius(380);
      } else {
        setOrbitRadius(480);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll tracking: Native scroll updates targetRotRef immediately
  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      // 1.5 full turns across the section
      targetRotRef.current = progress * Math.PI * 2 * 1.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  // Single Animation Loop (Operates purely on DOM ref without React re-renders)
  useEffect(() => {
    if (isReducedMotion) return;

    let animId: number;
    const animate = () => {
      const diff = targetRotRef.current - currentRotRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentRotRef.current += diff * 0.08;

        // Directly rotate the single parent orbit track in hardware
        if (orbitTrackRef.current) {
          orbitTrackRef.current.style.transform = `rotateX(9deg) rotateY(${currentRotRef.current}rad)`;
        }

        // Determine which chapter is closest to front (angle closest to 0)
        const normalizedRot = -currentRotRef.current % (Math.PI * 2);
        const positiveRot = (normalizedRot + Math.PI * 2) % (Math.PI * 2);
        const newFrontIdx = Math.round((positiveRot / (Math.PI * 2)) * totalCards) % totalCards;

        // ONLY trigger React state update when chapter index actually transitions
        if (newFrontIdx !== activeFrontIdxRef.current) {
          activeFrontIdxRef.current = newFrontIdx;
          setActiveFrontIdx(newFrontIdx);
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isReducedMotion, totalCards]);

  const activeChapter = orbitItineraries[activeFrontIdx] || orbitItineraries[0];

  // ── Reduced Motion Fallback Grid ─────────────────────────────────────────────
  if (isReducedMotion) {
    return (
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
            A few journeys from our India collection.
          </span>
          <h2 className="text-4xl font-serif">From Kashmir to Kanyakumari.</h2>
          <p className="text-sm text-[var(--text-muted)]">
            One country. So many ways to travel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orbitItineraries.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectJourney && onSelectJourney(ch.destination)}
              className="rounded-2xl overflow-hidden border border-[#2C2925] bg-[#171614] p-4 space-y-3 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <Image
                  src={ch.image.src}
                  alt={ch.image.alt}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--accent)] font-semibold">
                {ch.destination}
              </span>
              <h3 className="text-lg font-serif text-[#F5F4F0]">{ch.title}</h3>
              <p className="text-xs text-[#A8A29E]">{ch.route}</p>
              <div className="flex justify-between items-center pt-2 border-t border-[#2C2925]">
                <span className="text-sm font-medium text-[#F5F4F0]">{ch.priceDisplay}</span>
                <span className="text-xs font-mono text-[var(--accent)]">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── 3D Circular Orbit Experience ────────────────────────────────────────────
  return (
    <section
      id="india-journey"
      ref={containerRef}
      className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-700 select-none"
      style={{ height: '220vh' }}
      aria-label="Kashmir to Kanyakumari Circular Itinerary Orbit"
    >
      {/* ── Sticky Fullscreen Viewport Stage ───────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-14 pb-5 sm:pt-18 sm:pb-7 z-10">
        {/* Soft Regional Atmosphere Glow (Subtle Ambience) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[500px] sm:h-[700px] rounded-full blur-[200px] pointer-events-none transition-colors duration-1000 -z-10 opacity-40 dark:opacity-25"
          style={{ background: activeChapter.atmosphereColor }}
        />

        {/* ── Editorial Header & Clean HUD Counter ─────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full relative z-30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
                A few journeys from our India collection
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
                From Kashmir to Kanyakumari.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-normal">
                One country. So many ways to travel. 12 journeys arranged in physical space.
              </p>
            </div>

            {/* Minimalist Editorial HUD Counter */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <div className="text-xs font-mono tracking-widest text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 shadow-sm flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="font-bold text-[var(--text-primary)]">
                  {activeChapter.chapterNumber}
                </span>{' '}
                / <span>{String(totalCards).padStart(2, '0')}</span>
                <span className="text-[10px] text-[var(--accent)] font-semibold uppercase ml-1">
                  · {activeChapter.destination}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3D SPATIAL ORBIT STAGE ───────────────────────────────────────── */}
        <div
          className="relative w-full flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[480px] mt-4 sm:mt-8"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Quiet Center Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0 opacity-40">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[var(--text-muted)] block">
              12 Curated Journeys
            </span>
            <span className="text-[9px] font-mono text-[var(--text-muted)] block pt-0.5">
              Scroll to Rotate Orbit · Hover Card to Inspect
            </span>
          </div>

          {/* ── THE ONE PARENT ORBIT TRACK (Hardware Rotated by RAF) ─────────── */}
          <div
            ref={orbitTrackRef}
            className="relative w-0 h-0 flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(9deg) rotateY(0rad)',
              willChange: 'transform',
            }}
          >
            {orbitItineraries.map((item, idx) => {
              const baseAngle = (idx / totalCards) * Math.PI * 2;
              const isHovered = hoveredIdx === idx;
              const isFront = activeFrontIdx === idx;

              return (
                /* ── STATIC ORBIT CARD SHELL: Fixed in 3D orbit space ───────── */
                <div
                  key={item.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] sm:w-[220px] md:w-[245px] h-[270px] sm:h-[310px] md:h-[345px]"
                  style={{
                    transform: `rotateY(${baseAngle}rad) translateZ(${orbitRadius}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* ── HIT AREA: Stationary boundary relative to orbit (Prevents shake) ── */}
                  <div
                    tabIndex={0}
                    onFocus={() => setHoveredIdx(idx)}
                    onBlur={() => setHoveredIdx(null)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => onSelectJourney && onSelectJourney(item.destination)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onSelectJourney && onSelectJourney(item.destination);
                      } else if (e.key === 'Escape') {
                        setHoveredIdx(null);
                      }
                    }}
                    className="w-full h-full relative outline-none"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* ── VISUAL CONTAINER: Receives hover micro-scale & elevation ONLY ── */}
                    <div
                      className={`w-full h-full rounded-2xl overflow-hidden cursor-pointer border relative transition-all duration-300 ${
                        isHovered
                          ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                          : isFront
                          ? 'border-[#3D3833]'
                          : 'border-[#2C2925]'
                      }`}
                      style={{
                        transform: isHovered ? 'scale(1.05) translateY(-6px)' : 'scale(1.0)',
                        boxShadow: isHovered
                          ? '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px var(--accent)'
                          : isFront
                          ? '0 16px 25px -8px rgba(0, 0, 0, 0.45)'
                          : '0 8px 16px -4px rgba(0, 0, 0, 0.35)',
                        transformStyle: 'preserve-3d',
                        backgroundColor: '#171614',
                      }}
                    >
                      {/* ── FRONT FACE (Visible when facing camera: Photo + Text Overlay) ── */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {/* High-Resolution Crisp Photo Layer */}
                        <div className="absolute inset-0 w-full h-full">
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
                            className="object-cover"
                            priority={idx < 4}
                            quality={90}
                          />
                        </div>

                        {/* Dark Charcoal Gradient Overlay */}
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                            isHovered
                              ? 'bg-gradient-to-t from-[#171614] via-[#171614]/85 via-50% to-transparent'
                              : 'bg-gradient-to-t from-[#171614] via-[#171614]/75 via-45% to-transparent'
                          }`}
                        />

                        {/* Stable Flex Layout: Top Badges + Bottom Details */}
                        <div className="relative h-full w-full p-3.5 sm:p-4 flex flex-col justify-between z-10 select-none">
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-2 pointer-events-none">
                            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#F5F4F0] bg-[#171614]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#3D3833] shadow-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                              <span>{item.chapterNumber} · {item.destination}</span>
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-[#A8A29E] bg-[#171614]/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#3D3833] flex items-center gap-1 shadow-sm">
                              <Clock className="w-2.5 h-2.5 text-[var(--accent)]" />
                              <span>{item.duration}</span>
                            </span>
                          </div>

                          {/* In-Card Bottom Content */}
                          <div className="space-y-1.5 pointer-events-none mt-auto">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block">
                              {item.tag}
                            </span>

                            {/* Title with natural wrapping */}
                            <h3 className="text-sm sm:text-base font-serif font-medium leading-snug text-[#F5F4F0] line-clamp-2">
                              {item.title}
                            </h3>

                            {/* Extended Details Revealed on Pop/Hover */}
                            <div
                              className={`space-y-2 transition-all duration-300 overflow-hidden ${
                                isHovered
                                  ? 'max-h-52 opacity-100 pt-1'
                                  : 'max-h-0 opacity-0'
                              }`}
                            >
                              {/* Curated Route */}
                              <div className="space-y-0.5">
                                <span className="text-[8px] font-mono uppercase tracking-widest text-[#A8A29E] block">
                                  Route
                                </span>
                                <p className="text-[10px] text-[#D6D3CD] leading-relaxed line-clamp-2 font-mono">
                                  {item.route}
                                </p>
                              </div>

                              {/* Highlights */}
                              <div className="flex flex-wrap gap-1 text-[8.5px] font-mono">
                                {item.highlights.slice(0, 3).map((h, hi) => (
                                  <span
                                    key={hi}
                                    className="bg-[#24211D] border border-[#38332E] text-[#D6D3CD] px-1.5 py-0.5 rounded flex items-center gap-1"
                                  >
                                    <Sparkles className="w-2 h-2 text-[var(--accent)] shrink-0" />
                                    <span className="line-clamp-1">{h}</span>
                                  </span>
                                ))}
                              </div>

                              {/* Pricing & CTA Bottom Row */}
                              <div className="pt-2 border-t border-[#2C2925] flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <span className="text-[8px] font-mono uppercase tracking-wider text-[#A8A29E] block">
                                    {item.isPriceOnRequest ? 'Pricing' : 'Starting From'}
                                  </span>
                                  <span className="text-xs sm:text-sm font-serif font-medium text-[#F5F4F0] truncate block">
                                    {item.priceDisplay}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[var(--accent)] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium shrink-0 shadow-sm">
                                  <span>Explore</span>
                                  <ChevronRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── BACK FACE (Visible when facing rear: Photograph ONLY, Zero Mirrored Text) ── */}
                      <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
                          className="object-cover"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-black/45" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Section Bar: Scroll Cue + Direct 54 Itineraries Link ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full relative z-30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
            <span>Scroll down to rotate orbit</span>
            <span className="opacity-40">·</span>
            <span>Hover any card to inspect journey</span>
          </div>

          <Link
            href="/itineraries"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--accent)] hover:opacity-90 text-white text-xs font-mono font-medium transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap ml-auto"
          >
            <span>Explore all 54 itineraries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
