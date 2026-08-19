'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenPlanTrip: (preselectedDestination?: string) => void;
}

export default function Navbar({ onOpenPlanTrip }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Journeys', href: '#journeys' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Stories', href: '#stories' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 px-4 sm:px-6'
            : 'py-6 px-4 sm:px-8'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full px-5 py-2.5 ${
            scrolled
              ? 'glass-panel text-[var(--text-primary)] shadow-lg'
              : 'bg-transparent text-white'
          }`}
        >
          {/* Logo on Left */}
          <Link href="/" className="group flex items-center">
            <TripkarioLogo
              badgeSize={34}
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
                className={`text-xs tracking-wider uppercase font-semibold transition-colors duration-200 ${
                  scrolled
                    ? 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle + Plan a Trip Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button
              variant="default"
              size="sm"
              onClick={() => onOpenPlanTrip()}
              className="hidden sm:inline-flex items-center gap-2 rounded-full"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border md:hidden cursor-pointer ${
                scrolled
                  ? 'border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 px-6 pb-8 flex flex-col justify-between md:hidden border-b border-[var(--border-subtle)]"
          >
            <div className="space-y-4">
              <div className="flex flex-col gap-3 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif font-normal text-[var(--text-primary)] hover:text-[var(--accent)] flex items-center justify-between py-3.5 border-b border-[var(--border-subtle)] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant="default"
                size="lg"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
