'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  MapPin,
  Sparkles,
  Clock,
  ChevronRight,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import TripDetailModal from '@/components/TripDetailModal';
import { tripPackages, getTripById, getTripForDestination, getItineraryCount } from '@/data/trips';
import { TripPackage } from '@/types';

export interface JourneyDeckItem {
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
  dayPreview: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
}

export const journeyDeckItems: JourneyDeckItem[] = [
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
    image: {
      src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
      alt: 'Shikara cutting through morning mist on Dal Lake in Srinagar, Kashmir',
    },
    highlights: ['Cedar Houseboat Stays', 'Gulmarg Gondola Passes', 'Lidder River Chalet'],
    dayPreview: [
      { day: '01', title: 'Arrival in Srinagar', detail: 'Dal Lake shikara cruise at golden hour & heritage cedar houseboat.' },
      { day: '02', title: 'Gulmarg Gondola', detail: 'Phase 1 & 2 cable car to Kongdoori & Apharwat alpine trails.' },
      { day: '03', title: 'Pahalgam Lidder Valley', detail: 'Riverside pine trails, Betaab Valley & Aru pine glades.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1600&auto=format&fit=crop',
      alt: 'Ancient cliffside Thiksey Monastery in Ladakh',
    },
    highlights: ['Khardung La (17,982 ft)', 'Pangong Cobalt Lake', 'Cliffside Gompa Prayers'],
    dayPreview: [
      { day: '01', title: 'Leh Acclimatization', detail: 'Slow tea stroll through Leh market and Shanti Stupa sunset.' },
      { day: '02', title: 'Nubra via Khardung La', detail: 'Cross the world’s iconic pass down into white sand dunes of Hunder.' },
      { day: '03', title: 'Pangong Tso Cobalt Shore', detail: 'High-altitude shore stargazing and dramatic mountain reflections.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
      alt: 'Dramatic canyon valleys and snowy peaks in Spiti Valley',
    },
    highlights: ['1,000-Yr Key Gompa', 'Crescent Chandratal Lake', 'Highest Post Office (Hikkim)'],
    dayPreview: [
      { day: '01', title: 'Shimla to Kalpa', detail: 'Kinnaur apple valleys and majestic sunset views of Kinner Kailash.' },
      { day: '02', title: 'Kalpa to Kaza', detail: 'Through the moonscape terrain and mud monasteries of Tabo.' },
      { day: '03', title: 'Key Monastery & Hikkim', detail: 'Clifftop fortress prayer halls and postcard mailing from Hikkim.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
      alt: 'Living root bridge enveloped by rainforest mist in Meghalaya',
    },
    highlights: ['Double Decker Root Trek', 'Umngot Glass River Boating', 'Cherrapunji Waterfalls'],
    dayPreview: [
      { day: '01', title: 'Guwahati to Shillong', detail: 'Umiam Lake viewpoint and pine-lined boutique stay in Shillong.' },
      { day: '02', title: 'Cherrapunji Waterfalls', detail: 'Nohkalikai Falls, Wei Sawdong canyon pools & misty gorges.' },
      { day: '03', title: 'Nongriat Living Roots', detail: '3,000-step trek to the ancient biological double-decker root bridge.' },
    ],
  },
  {
    id: 'tawang-monasteries',
    chapterNumber: '05',
    destination: 'Arunachal Pradesh',
    title: 'Tawang High Pass Circuit',
    subtitle: 'Sela Pass & 400-year-old monastery',
    route: 'Guwahati → Dirang → Sela Pass → Tawang',
    duration: '6 Nights · 7 Days',
    priceDisplay: '₹21,000',
    isPriceOnRequest: false,
    tag: 'Eastern Himalaya',
    image: {
      src: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
      alt: 'Buddhist monastery in Tawang with snow peaks in background',
    },
    highlights: ['Sela Mountain Pass (13,700 ft)', '400-Year Tawang Gompa', 'Madhuri Glacial Lake'],
    dayPreview: [
      { day: '01', title: 'Guwahati to Dirang', detail: 'Crossing the Brahmaputra into Kameng river valleys & kiwi orchards.' },
      { day: '02', title: 'Sela Pass to Tawang', detail: 'Ascending 13,700 ft across prayer flag passes and frozen lakes.' },
      { day: '03', title: 'Tawang Monastery & Gompas', detail: 'Exploring India’s largest Buddhist monastery and old library halls.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
      alt: 'Traditional wooden Himalayan home surrounded by cedar trees in Tirthan',
    },
    highlights: ['Cedar Riverside Chalets', 'Jalori Pass Summit Walk', 'Trout Stream Trails'],
    dayPreview: [
      { day: '01', title: 'Arrival in Jibhi', detail: 'Check-in to riverside cedarwood cottages and village waterfall walk.' },
      { day: '02', title: 'Jalori Pass & Serolsar Lake', detail: 'Hike through oak forests to the sacred high-altitude mountain lake.' },
      { day: '03', title: 'Tirthan Valley & GHNP', detail: 'Riverside angling, trout tasting and Great Himalayan National Park walk.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
      alt: 'Sandstone courtyard illuminated by desert sunlight in Rajasthan',
    },
    highlights: ['Restored Heritage Havelis', 'Thar Desert Stargazing Camp', 'Private Fort Walks'],
    dayPreview: [
      { day: '01', title: 'Pink City Heritage', detail: 'Private Amber Fort ramparts walk, City Palace courtyards & evening tea.' },
      { day: '02', title: 'Jodhpur Blue City', detail: 'Towering Mehrangarh Fort ramparts & sunset over the indigo lanes.' },
      { day: '03', title: 'Thar Desert Sand Dunes', detail: 'Camel trek at dusk, royal tent stay under clear starry desert skies.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop',
      alt: 'Tranquil sunset on quiet palm beach in South Goa',
    },
    highlights: ['Fontainhas Latin Walking Tour', 'Uncrowded Agonda Sands', 'Cabo de Rama Cliff Sunset'],
    dayPreview: [
      { day: '01', title: 'Panjim Latin Quarters', detail: 'Pastel Portuguese villas of Fontainhas, boutique bakeries & fado music.' },
      { day: '02', title: 'South Goa Hidden Coves', detail: 'Butterfly beach boat cruise, dolphin sightings & quiet Agonda cove.' },
      { day: '03', title: 'Cabo de Rama & Spice Farm', detail: 'Clifftop fort sunset overlooking the Arabian Sea and organic spice lunch.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
      alt: 'Wooden houseboat floating through emerald palm-fringed backwaters of Alleppey',
    },
    highlights: ['Private Houseboat Cruise', 'Munnar Tea Slopes Walk', 'Cardamom Plantation Trails'],
    dayPreview: [
      { day: '01', title: 'Kochi to Munnar', detail: 'Drive through Cheeyappara waterfalls to mist-wrapped tea hills.' },
      { day: '02', title: 'Munnar Tea Estates', detail: 'Kolukkumalai high-elevation tea plantation walk and Eravikulam wildlife.' },
      { day: '03', title: 'Alleppey Backwaters Cruise', detail: 'Private wood-and-coir houseboat gliding along emerald canal villages.' },
    ],
  },
  {
    id: 'south-coorg-wayanad',
    chapterNumber: '10',
    destination: 'Coorg & Wayanad',
    title: 'Coffee Plantations & Rainforest Streams',
    subtitle: 'Estate bungalows & Wayanad peaks',
    route: 'Bangalore → Mysore → Coorg → Wayanad',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    tag: 'Western Ghats',
    image: {
      src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop',
      alt: 'Lush green coffee estate and mist in Coorg',
    },
    highlights: ['Estate Heritage Bungalows', 'Coffee Tasting Walk', 'Rainforest Waterfalls'],
    dayPreview: [
      { day: '01', title: 'Bangalore to Coorg', detail: 'Arrive at a colonial coffee estate bungalow enveloped in pepper vines.' },
      { day: '02', title: 'Abbey Falls & Coffee Walks', detail: 'Private bean-to-cup plantation tour, Raja’s Seat dusk panorama.' },
      { day: '03', title: 'Wayanad Chembra Peak', detail: 'Heart-shaped mountain lake trek and bamboo rafting along Vythiri stream.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop',
      alt: 'Alpine meadows and high mountain ranges in Chopta Uttarakhand',
    },
    highlights: ['Tungnath Summit (12,100 ft)', 'Riverside Ganga Camps', 'Alpine Bugyal Meadows'],
    dayPreview: [
      { day: '01', title: 'Rishikesh Ganga Ghats', detail: 'Private riverside evening aarti and serene boutique ashram stay.' },
      { day: '02', title: 'Devprayag to Chopta', detail: 'Confluence of Alaknanda & Bhagirathi into rhododendron meadows.' },
      { day: '03', title: 'Tungnath & Chandrashila Peak', detail: 'Sunrise ascent to Chandrashila with 360° views of Nanda Devi & Trishul.' },
    ],
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
    image: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop',
      alt: 'Rolling tea gardens and pine hills in Nilgiris and Southern Cape',
    },
    highlights: ['UNESCO Heritage Toy Train', 'Pillar Rocks Vista', 'Ocean Sunset Horizon'],
    dayPreview: [
      { day: '01', title: 'Nilgiri Mountain Railway', detail: 'Historic steam toy train through 208 curves and eucalyptus valleys.' },
      { day: '02', title: 'Coonoor Tea Plantations', detail: 'Dolphin’s Nose cliff view and artisanal tea tasting at high-grown gardens.' },
      { day: '03', title: 'Kodaikanal Mist & Pine Forests', detail: 'Row boating on star-shaped Kodai Lake & silent pine forest trails.' },
    ],
  },
];

interface IndiaJourneyShowcaseProps {
  onSelectJourney?: (destination: string) => void;
}

export default function IndiaJourneyShowcase({ onSelectJourney }: IndiaJourneyShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number | null>(0);
  const [selectedTripForDetail, setSelectedTripForDetail] = useState<TripPackage | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const totalItems = journeyDeckItems.length;
  const currentItem = journeyDeckItems[activeIndex];

  const getDeckItemImage = useCallback((item: JourneyDeckItem) => {
    const matched = getTripById(item.id);
    if (matched && matched.coverImage) {
      const src = typeof matched.coverImage === 'string' ? matched.coverImage : matched.coverImage.src;
      const alt = typeof matched.coverImage === 'string' ? matched.title : matched.coverImage.alt || matched.title;
      return { src, alt };
    }
    return item.image;
  }, []);

  const handleNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleSelectIndex = (idx: number) => {
    setDirection(idx > activeIndex ? 'next' : 'prev');
    setActiveIndex(idx);
  };

  const handleExplore = (item: JourneyDeckItem) => {
    const matchedTrip =
      getTripById(item.id) ||
      getTripForDestination(item.id) ||
      tripPackages.find((t) => t.id === item.id) ||
      getTripForDestination(item.destination);

    if (matchedTrip) {
      setSelectedTripForDetail(matchedTrip);
    } else if (onSelectJourney) {
      onSelectJourney(item.destination);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Upcoming neighbor items for desktop tray (next 3 items)
  const neighborIndices = [
    (activeIndex + 1) % totalItems,
    (activeIndex + 2) % totalItems,
    (activeIndex + 3) % totalItems,
  ];

  return (
    <section
      id="india-journey"
      className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-700 py-16 sm:py-24 md:py-28 select-none"
      aria-label="Kinetic Journey Deck — Kashmir to Kanyakumari"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-8 sm:space-y-12">
        {/* ── 01. EDITORIAL HEADER & MINIMAL HUD ───────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[var(--border-subtle)]"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
              <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>A few journeys from our India collection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[var(--text-primary)] leading-[1.05] tracking-tight">
              From Kashmir to Kanyakumari.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-normal leading-relaxed">
              One country. So many ways to travel. 12 curated journeys across mountain passes, rainforest bridges, and southern coastlines.
            </p>
          </div>

          {/* Minimal Editorial HUD Controls (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Chapter Indicator */}
            <div className="text-xs font-mono tracking-widest text-[var(--text-muted)] px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-bold text-[var(--text-primary)]">
                {currentItem.chapterNumber}
              </span>
              <span className="text-[var(--text-muted)]">/</span>
              <span>{String(totalItems).padStart(2, '0')}</span>
              <span className="text-[10px] text-[var(--accent)] uppercase font-semibold pl-1">
                · {currentItem.destination}
              </span>
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous itinerary"
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next itinerary"
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 02. MINIMAL DESTINATION STRIP (Horizontal quick-jump) ───────── */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
          {journeyDeckItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white font-medium shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] border border-transparent'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                  {item.chapterNumber}
                </span>
                <span>{item.destination}</span>
              </button>
            );
          })}
        </div>

        {/* ── 03. DESKTOP KINETIC JOURNEY DECK (>= 1024px) ─────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Active Hero Card (Approx 64% Width / col-span-8) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: direction === 'next' ? 36 : -36,
                        scale: 0.96,
                      }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: direction === 'next' ? -36 : 36,
                        scale: 0.96,
                      }
                }
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                className="relative h-full min-h-[540px] rounded-3xl overflow-hidden border border-[var(--border-card)] bg-[#171614] text-white shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-10 group"
              >
                {/* Background Photography with Depth Layer */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={getDeckItemImage(currentItem).src}
                    alt={getDeckItemImage(currentItem).alt}
                    fill
                    sizes="(max-width: 1280px) 70vw, 850px"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                    priority
                    quality={90}
                  />
                  {/* Subtle Cinematic Vignette & Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11100E] via-[#11100E]/75 via-45% to-black/25" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{currentItem.chapterNumber} · {currentItem.destination}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent)] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-semibold uppercase">
                      {currentItem.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[var(--accent)]" />
                    <span>{currentItem.duration}</span>
                  </span>
                </div>

                {/* Bottom Content & Expandable Details */}
                <div className="relative z-10 space-y-4 mt-auto pt-8">
                  <div className="space-y-1.5 max-w-2xl">
                    <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white leading-tight">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {currentItem.subtitle}
                    </p>
                  </div>

                  {/* Route Pill */}
                  <div className="flex items-center gap-2 text-xs font-mono text-white/90 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/10 w-fit">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span className="truncate">{currentItem.route}</span>
                  </div>

                  {/* Expandable Day Preview Layer (Revealed smoothly on hover) */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isHeroHovered ? 'auto' : 0,
                      opacity: isHeroHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-2 pt-1"
                  >
                    <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-white/15">
                      {currentItem.dayPreview.map((d, di) => (
                        <div
                          key={di}
                          className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 space-y-1"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold block">
                            DAY {d.day}
                          </span>
                          <h4 className="text-[11px] font-bold text-white line-clamp-1">
                            {d.title}
                          </h4>
                          <p className="text-[10px] text-white/70 line-clamp-2 leading-relaxed">
                            {d.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pricing & Primary CTA Row */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/60 block">
                        {currentItem.isPriceOnRequest ? 'Pricing' : 'Starting From'}
                      </span>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-white">
                        {currentItem.priceDisplay}{' '}
                        {!currentItem.isPriceOnRequest && (
                          <span className="text-xs font-normal text-white/60 font-sans">/ person</span>
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExplore(currentItem)}
                      className="px-6 py-3 rounded-full bg-[var(--accent)] hover:opacity-95 text-white text-xs font-mono font-medium transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <span>Explore full itinerary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Tray: Upcoming Itineraries Cascade (Approx 36% Width / col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold block px-1">
                Up Next in Collection
              </span>

              {neighborIndices.map((nIdx) => {
                const item = journeyDeckItems[nIdx];
                return (
                  <motion.div
                    key={item.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSelectIndex(nIdx);
                    }}
                    onClick={() => handleSelectIndex(nIdx)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 4 }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group relative outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/20">
                      <Image
                        src={getDeckItemImage(item).src}
                        alt={getDeckItemImage(item).alt}
                        fill
                        sizes="100px"
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                          {item.chapterNumber} · {item.destination}
                        </span>
                        <span className="text-[9px] font-mono text-[var(--text-muted)]">
                          {item.duration.split('·')[0]}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-serif font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                        {item.route}
                      </p>

                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[11px] font-serif font-semibold text-[var(--text-primary)]">
                          {item.priceDisplay}
                        </span>
                        <span className="text-[9px] font-mono text-[var(--accent)] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>View</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Section Link: Explore Complete Archive */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                  Looking for more destinations?
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-sans">
                Browse our complete collection of {getItineraryCount()} curated itineraries with verified hotels and private transport.
              </p>
              <Link
                href="/itineraries"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] font-semibold hover:underline pt-1"
              >
                <span>View all {getItineraryCount()} itineraries</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 04. MOBILE RESPONSIVE EDITORIAL FEED (< 1024px) ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
          {journeyDeckItems.map((item, idx) => {
            const isExpanded = expandedMobileIdx === idx;
            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm flex flex-col justify-between"
              >
                {/* Cover Photograph Box */}
                <div
                  className="relative h-60 w-full overflow-hidden bg-black/20 cursor-pointer"
                  onClick={() => setExpandedMobileIdx(isExpanded ? null : idx)}
                >
                  <Image
                    src={getDeckItemImage(item).src}
                    alt={getDeckItemImage(item).alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      {item.chapterNumber} · {item.destination}
                    </span>
                    <span className="text-[10px] font-mono text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-[var(--accent)]" />
                      <span>{item.duration}</span>
                    </span>
                  </div>

                  {/* Title overlay on photo */}
                  <div className="absolute bottom-3 left-4 right-4 pointer-events-none space-y-0.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-serif font-medium text-white line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                      {item.subtitle}
                    </p>

                    {/* Route line */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-primary)]">
                      <MapPin className="w-3 h-3 text-[var(--accent)] shrink-0" />
                      <span className="truncate">{item.route}</span>
                    </div>

                    {/* Expandable Day Preview for Mobile */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 pt-2 border-t border-[var(--border-subtle)] overflow-hidden"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent)] block font-semibold">
                            Day-by-Day Highlights:
                          </span>
                          <div className="space-y-1.5">
                            {item.dayPreview.map((d, di) => (
                              <div
                                key={di}
                                className="p-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[10px]"
                              >
                                <span className="font-mono text-[var(--accent)] font-bold">
                                  DAY {d.day}:{' '}
                                </span>
                                <span className="font-semibold text-[var(--text-primary)]">
                                  {d.title}
                                </span>
                                <p className="text-[var(--text-muted)] pt-0.5">{d.detail}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Footer: Price & CTA */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                        {item.isPriceOnRequest ? 'Pricing' : 'Starting From'}
                      </span>
                      <span className="text-base font-serif font-bold text-[var(--text-primary)]">
                        {item.priceDisplay}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExplore(item)}
                      className="px-4 py-2 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 05. SECTION BOTTOM EXPLORE LINK ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)] text-center sm:text-left">
          <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
            <span>Verified boutique stays</span>
            <span className="opacity-40">·</span>
            <span>Private chauffeur</span>
            <span className="opacity-40">·</span>
            <span>Flexible daily pacing</span>
          </div>

          <Link
            href="/itineraries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] hover:opacity-90 text-white text-xs font-mono font-medium transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Explore all {getItineraryCount()} itineraries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── 06. TRIP DETAIL MODAL ────────────────────────────────────────── */}
      <TripDetailModal
        trip={selectedTripForDetail}
        onClose={() => setSelectedTripForDetail(null)}
        onPlanCustom={(title) => {
          setSelectedTripForDetail(null);
          if (onSelectJourney) onSelectJourney(title);
        }}
      />
    </section>
  );
}
