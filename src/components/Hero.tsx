'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Compass, IndianRupee, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import { Destination } from '@/types';

interface HeroProps {
  onOpenPlanTrip: (destination?: string) => void;
  onSearch: (filters: {
    destination: string;
    travelStyle: string;
    duration: string;
    budget: string;
  }) => void;
}

export default function Hero({ onOpenPlanTrip, onSearch }: HeroProps) {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [sceneDirection, setSceneDirection] = useState<'next' | 'prev'>('next');
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);

  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<'dest' | 'style' | 'budget' | null>(null);

  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Top 5 Hero Cinematic Destination Scenes
  const heroScenes: Destination[] = destinations.slice(0, 5);
  const totalScenes = heroScenes.length;
  const AUTOPLAY_TIME = 7500; // 7.5s per scene

  const nextScene = () => {
    setSceneDirection('next');
    setActiveSceneIdx((prev) => (prev + 1) % totalScenes);
    setSceneProgress(0);
  };

  const prevScene = () => {
    setSceneDirection('prev');
    setActiveSceneIdx((prev) => (prev - 1 + totalScenes) % totalScenes);
    setSceneProgress(0);
  };

  // Autoplay with instant pause on interaction
  useEffect(() => {
    if (isHeroHovered || activeDropdown) return;

    const interval = 50;
    const step = (interval / AUTOPLAY_TIME) * 100;

    const timer = setInterval(() => {
      setSceneProgress((old) => {
        if (old >= 100) {
          nextScene();
          return 0;
        }
        return old + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isHeroHovered, activeSceneIdx, activeDropdown]);

  // Desktop Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentScene = heroScenes[activeSceneIdx];

  const styleOptions = ['Couple', 'Family', 'Friends', 'Solo'];
  const budgetOptions = ['Under ₹15K', '₹15K–₹30K', '₹30K–₹50K', '₹50K+'];

  const filteredDestinations = destinations.filter((d) =>
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

  return (
    <section
      ref={heroRef}
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
      className="relative min-h-[110vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#090908]"
    >
      {/* LAYER 1: Full-Bleed Authentic Editorial Photography Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{
              opacity: 0,
              x: sceneDirection === 'next' ? 60 : -60,
              scale: 1.06,
            }}
            animate={{ opacity: 1, x: 0, scale: 1.02 }}
            exit={{
              opacity: 0,
              x: sceneDirection === 'next' ? -60 : 60,
              scale: 0.98,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentScene.image.src}
              alt={currentScene.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle Gradient Atmospheres */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090908] via-black/45 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-grain opacity-35 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LAYER 2: Typography & Floating Metadata Over Photography */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto pt-4 sm:pt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        {/* Left Editorial Heading */}
        <motion.div
          animate={{
            x: mouseParallax.x * 2.5,
            y: mouseParallax.y * 2.5,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
          className="max-w-3xl space-y-5"
        >
          {/* Brand Tagline */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-[0.3em] text-[#E46B3B] uppercase font-bold">
              TRIPKARIO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-xs font-mono text-white/80">
              {currentScene.region}
            </span>
          </div>

          {/* Huge Heading */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal leading-[0.96] tracking-tight text-white">
              Where will you <br />
              <span className="text-white">go </span>
              <span className="text-[#E46B3B]">next?</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/85 max-w-lg font-normal leading-relaxed">
            {currentScene.description}
          </p>

          {/* Photo Credit */}
          {currentScene.image.photographer && (
            <div className="text-[11px] font-mono text-white/55 pt-1">
              Photo — {currentScene.image.photographer} ({currentScene.image.location})
            </div>
          )}
        </motion.div>

        {/* Right Floating Scene Navigator & Metadata */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-end gap-5 lg:mb-4">
          {/* Glass Destination Chip */}
          <motion.div
            key={`chip-${currentScene.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassSurface
              variant="dark"
              enableRefraction
              rounded="2xl"
              className="p-5 sm:p-6 text-white max-w-xs shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#F4A261] font-bold">
                  {currentScene.name}
                </span>
                <span className="text-[10px] font-mono text-white/70">
                  {currentScene.durationNights}N · {currentScene.durationDays}D
                </span>
              </div>
              <h4 className="text-lg font-serif font-medium text-white mb-2 line-clamp-1">
                {currentScene.tagline}
              </h4>
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/15">
                <span className="text-white/70">From</span>
                <span className="text-sm font-serif font-bold text-white">
                  {formatPrice(currentScene.startingPrice)} / person
                </span>
              </div>
            </GlassSurface>
          </motion.div>

          {/* Scene Carousel Glass Arrows & Progress */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono tracking-widest text-white/70 font-semibold">
                0{activeSceneIdx + 1} / 0{totalScenes}
              </span>
              <div className="w-20 h-[1.5px] bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${sceneProgress}%` }}
                  className="h-full bg-[#E46B3B] transition-all ease-linear"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MagneticButton
                onClick={prevScene}
                aria-label="Previous scene"
                className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-white hover:border-[#E46B3B] shadow-lg"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </MagneticButton>

              <MagneticButton
                onClick={nextScene}
                aria-label="Next scene"
                className="w-10 h-10 rounded-full glass-surface flex items-center justify-center text-white hover:border-[#E46B3B] shadow-lg"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Interface — Floating Glass Search Dock */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-30 max-w-5xl mx-auto w-full mt-6"
      >
        <GlassSurface
          variant="frost"
          enableRefraction
          rounded="3xl"
          className="p-3 sm:p-4 text-white shadow-2xl border border-white/20"
        >
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
            {/* Field 1: Destination */}
            <div className="relative sm:col-span-5">
              <div
                onClick={() => setActiveDropdown(activeDropdown === 'dest' ? null : 'dest')}
                className={`px-4 py-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                  activeDropdown === 'dest' ? 'bg-white/15 ring-1 ring-[#E46B3B]/40' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                    WHERE
                  </span>
                  <span className="block text-sm font-semibold truncate text-white">
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
                    className="p-1 text-white/60 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Destination Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'dest' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    className="absolute top-full left-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl p-4 z-50 overflow-hidden bg-[#11100E]/95 text-white border border-white/20"
                  >
                    <div className="relative mb-3">
                      <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search (e.g. Kashmir, Rajasthan)"
                        value={destinationQuery}
                        onChange={(e) => setDestinationQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-[#E46B3B]"
                        autoFocus
                      />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-semibold px-1 block mb-2">
                      Popular Destinations
                    </span>

                    <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                      <button
                        type="button"
                        onClick={() => handleSelectDest('')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 flex items-center justify-between text-white"
                      >
                        <span>Search anywhere in India</span>
                        {!selectedDestination && <Check className="w-3.5 h-3.5 text-[#E46B3B]" />}
                      </button>

                      {filteredDestinations.map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => handleSelectDest(dest.name)}
                          className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center gap-3 cursor-pointer ${
                            selectedDestination === dest.name
                              ? 'bg-[#E46B3B] text-white'
                              : 'hover:bg-white/10 text-white'
                          }`}
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-black/20">
                            <Image src={dest.image.src} alt={dest.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold block truncate">{dest.name}</span>
                            <span className="text-[10px] text-white/70">
                              From {formatPrice(dest.startingPrice)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 2: Travelling As */}
            <div className="relative sm:col-span-3">
              <div
                onClick={() => setActiveDropdown(activeDropdown === 'style' ? null : 'style')}
                className={`px-4 py-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                  activeDropdown === 'style' ? 'bg-white/15 ring-1 ring-[#E46B3B]/40' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                    TRAVELLING AS
                  </span>
                  <span className="block text-sm font-semibold truncate text-white">
                    {selectedStyle || 'Couple'}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {activeDropdown === 'style' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-56 glass-panel rounded-2xl shadow-2xl p-3 z-50 bg-[#11100E]/95 text-white border border-white/20"
                  >
                    <div className="space-y-1">
                      {styleOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedStyle(opt);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                            selectedStyle === opt ? 'bg-[#E46B3B] text-white' : 'hover:bg-white/10 text-white'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedStyle === opt && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 3: Budget & Submit */}
            <div className="relative sm:col-span-4 flex items-center gap-2">
              <div
                onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')}
                className={`flex-1 px-4 py-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                  activeDropdown === 'budget' ? 'bg-white/15 ring-1 ring-[#E46B3B]/40' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                    BUDGET
                  </span>
                  <span className="block text-sm font-semibold truncate text-white">
                    {selectedBudget || '₹25K'}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {activeDropdown === 'budget' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-56 glass-panel rounded-2xl shadow-2xl p-3 z-50 bg-[#11100E]/95 text-white border border-white/20"
                  >
                    <div className="space-y-1">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(b);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                            selectedBudget === b ? 'bg-[#E46B3B] text-white' : 'hover:bg-white/10 text-white'
                          }`}
                        >
                          <span>{b}</span>
                          {selectedBudget === b && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Magnetic Submit Button */}
              <MagneticButton
                type="submit"
                dataCursor="GO"
                className="px-7 h-12 rounded-2xl bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-xl flex items-center gap-2 shrink-0"
              >
                <span>FIND MY TRIP</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>
        </GlassSurface>
      </motion.div>
    </section>
  );
}
