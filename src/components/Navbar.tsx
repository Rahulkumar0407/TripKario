'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './ui/MagneticButton';

interface NavbarProps {
  onOpenPlanTrip?: (preselectedDestination?: string) => void;
}

export default function Navbar({ onOpenPlanTrip }: NavbarProps) {
  const router = useRouter();
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
    { name: 'Gallery', href: '/gallery' },
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
              ? 'h-[58px] bg-[var(--bg-surface)]/95 md:bg-[var(--glass-bg)] border border-[var(--border-subtle)] md:border-[var(--glass-border)] md:backdrop-blur-2xl shadow-xl shadow-black/10'
              : 'h-[66px] bg-black/75 md:bg-black/25 border border-white/15 md:border-white/12 md:backdrop-blur-lg'
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <ThemeToggle />

            <MagneticButton
              onClick={() => {
                if (onOpenPlanTrip) onOpenPlanTrip();
                else router.push('/itineraries');
              }}
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

            {/* Mobile menu toggle (min 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`
                min-w-[44px] min-h-[44px] rounded-full lg:hidden flex items-center justify-center cursor-pointer active:scale-95 touch-manipulation
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

      {/* ===== MOBILE DRAWER (< 1024px) ===== */}
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
              className="fixed inset-0 z-[95] bg-black/70 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-3 right-3 top-[80px] z-[96] lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-bold">
                    Menu
                  </span>
                  <ThemeToggle variant="pill" />
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className="min-h-[44px] text-[15px] font-medium text-[var(--text-primary)] hover:text-[var(--accent)] py-2.5 px-3 rounded-xl hover:bg-[var(--bg-surface-2)] active:bg-[var(--bg-surface-2)] transition-colors flex items-center justify-between touch-manipulation"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    </motion.a>
                  ))}
                </nav>

                <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenPlanTrip) onOpenPlanTrip();
                      else router.push('/itineraries');
                    }}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md active:scale-95 touch-manipulation"
                  >
                    <span>Plan My Trip</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] font-mono text-center text-[var(--text-muted)] pt-1">
                    Aap destination batao. Baaki hum dekh lenge.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
