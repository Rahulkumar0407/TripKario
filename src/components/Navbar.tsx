'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './ui/MagneticButton';

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
    { name: 'Journeys', href: '/#packages' },
    { name: 'India Tour', href: '/#india-journey' },
    { name: 'Destinations', href: '/#destinations' },
    { name: 'All Itineraries', href: '/itineraries' },
    { name: 'Philosophy', href: '/#philosophy' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out"
        style={{ paddingTop: scrolled ? '10px' : '18px' }}
      >
        <nav
          className={`
            mx-auto flex items-center justify-between
            max-w-[1260px]
            rounded-full
            px-5 lg:px-6
            transition-all duration-500 ease-out
            ${scrolled
              ? 'h-[58px] bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-2xl shadow-xl shadow-black/10'
              : 'h-[66px] bg-black/25 border border-white/12 backdrop-blur-lg'
            }
          `}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 'calc(100% - 32px)' }}
        >
          {/* ===== LEFT: Logo Lockup ===== */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <TripkarioLogo
              badgeSize={scrolled ? 32 : 38}
              variant={scrolled ? 'desktop' : 'white'}
              className="transition-all duration-500 ease-out group-hover:scale-[1.02]"
            />
          </Link>

          {/* ===== CENTER: Navigation Links (Desktop Only) ===== */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  text-[12.5px] font-medium tracking-[0.04em] whitespace-nowrap
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                    : 'text-white/80 hover:text-white'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* ===== RIGHT: Theme Toggle + CTA + Mobile Menu ===== */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            <MagneticButton
              onClick={() => onOpenPlanTrip()}
              className={`
                hidden sm:inline-flex items-center gap-1.5
                rounded-[20px] px-5 h-[40px]
                text-[12px] font-semibold tracking-wide
                bg-[var(--accent)] hover:bg-[var(--accent-hover)]
                text-white shadow-md
                transition-all duration-200
              `}
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`
                p-2 rounded-full lg:hidden cursor-pointer
                transition-colors duration-200
                ${scrolled
                  ? 'text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]'
                  : 'text-white hover:bg-white/10'
                }
              `}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 right-4 top-[88px] z-[96] lg:hidden"
            >
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-2xl backdrop-blur-2xl p-6 space-y-4">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className="text-[15px] font-medium text-[var(--text-primary)] hover:text-[var(--accent)] py-2.5 px-2 rounded-xl hover:bg-[var(--bg-surface-2)] transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>

                <div className="pt-3 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPlanTrip();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-full h-[44px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <span>Plan My Trip</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
