'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TripkarioLogo from '@/components/TripkarioLogo';
import VariantThemeToggle from './VariantThemeToggle';
import VariantGlass from './VariantGlass';
import { ArrowUpRight, Menu, X, Compass } from 'lucide-react';

interface VariantNavbarProps {
  onOpenPlanTrip: (destination?: string) => void;
}

export default function VariantNavbar({ onOpenPlanTrip }: VariantNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Journeys', href: '#journeys' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Stories', href: '#stories' },
    { label: 'Itinerary', href: '#itinerary' },
    { label: 'Editorial', href: '#editorial' },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl pointer-events-auto"
        >
          <VariantGlass
            intensity={isScrolled ? 'deep' : 'medium'}
            className="rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 shadow-[0_16px_40px_rgba(23,21,18,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/70 dark:border-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left: Original Brand Logo */}
              <Link href="/variant" className="flex items-center gap-3 group focus:outline-none">
                <TripkarioLogo
                  badgeSize={34}
                  showWordmark={true}
                  className="transition-transform duration-300 group-hover:scale-102"
                />
                <span className="hidden xl:inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-[#C85D3A]/10 text-[#C85D3A] border border-[#C85D3A]/20 font-medium">
                  Edition 02 · Desk
                </span>
              </Link>

              {/* Center: Editorial Links (Desktop) */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03]">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-tight text-[#171512]/80 dark:text-[#F5EFE6]/80 hover:text-[#C85D3A] dark:hover:text-[#E16A43] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Right: Actions */}
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <VariantThemeToggle />

                {/* Back to Original View Link Pill */}
                <Link
                  href="/"
                  className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#6D665E] dark:text-[#B6ADA1] hover:text-[#171512] dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] transition-colors"
                >
                  <Compass className="w-3 h-3 text-[#174E48] dark:text-[#1E5A53]" />
                  Original View
                </Link>

                {/* Primary Editorial CTA */}
                <button
                  type="button"
                  onClick={() => onOpenPlanTrip()}
                  className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-full bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_16px_rgba(200,93,58,0.3)] hover:shadow-[0_8px_24px_rgba(200,93,58,0.45)] transition-all duration-300 flex items-center gap-1.5"
                >
                  <span className="relative z-10">Plan My Trip</span>
                  <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#D4A467]/20 to-transparent transition-transform duration-500" />
                </button>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className="md:hidden p-2 rounded-full bg-white/50 dark:bg-white/10 text-[#171512] dark:text-white border border-white/60 dark:border-white/10"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </VariantGlass>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <VariantGlass
              intensity="deep"
              className="rounded-3xl p-6 shadow-2xl border-white/80 dark:border-white/15"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#756E64] dark:text-[#B3AA9E]">
                    Edition 02 Navigation
                  </span>
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-mono text-[#C95D39] underline"
                  >
                    View Original
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-base font-medium text-[#171512] dark:text-[#F4EEE4] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlanTrip();
                  }}
                  className="w-full mt-2 py-3 rounded-full bg-[#C95D39] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Plan My Trip</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </VariantGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
