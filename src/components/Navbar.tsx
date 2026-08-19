'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import MagneticButton from './ui/MagneticButton';
import GlassSurface from './ui/GlassSurface';

interface NavbarProps {
  onOpenPlanTrip: (preselectedDestination?: string) => void;
}

export default function Navbar({ onOpenPlanTrip }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Journeys', href: '#packages' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Field Notes', href: '#field-notes' },
    { name: 'Stories', href: '#stories' },
    { name: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2.5 px-4 sm:px-6' : 'py-5 px-4 sm:px-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <GlassSurface
            variant={scrolled ? 'frost' : 'clear'}
            rounded="full"
            className={`flex items-center justify-between px-5 sm:px-6 py-2.5 transition-all duration-500 shadow-xl ${
              scrolled
                ? 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-primary)]'
                : 'bg-black/35 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            {/* Logo on Left */}
            <Link href="/" className="group flex items-center shrink-0">
              <TripkarioLogo
                badgeSize={32}
                variant={scrolled ? 'desktop' : 'white'}
                className="transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </Link>

            {/* Center Navigation Links (Floating Glass Capsule) */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-wider uppercase font-mono font-medium transition-colors duration-200 ${
                    scrolled
                      ? 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                      : 'text-white/85 hover:text-white drop-shadow-xs'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions: Theme Toggle + Plan a Trip Button */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <MagneticButton
                onClick={() => onOpenPlanTrip()}
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 h-9 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium shadow-md"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className={`p-2 rounded-full border md:hidden cursor-pointer ${
                  scrolled
                    ? 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </GlassSurface>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <GlassSurface
              variant="frost"
              rounded="3xl"
              className="p-6 space-y-4 shadow-2xl border border-[var(--border-card)]"
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-serif font-medium text-[var(--text-primary)] hover:text-[var(--accent)] py-1.5 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <Button
                  variant="default"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlanTrip();
                  }}
                  className="w-full justify-center gap-2 rounded-full"
                >
                  <span>Plan My Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
