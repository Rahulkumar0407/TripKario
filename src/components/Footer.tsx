'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import { siteConfig, getWhatsAppLink } from '@/data/siteConfig';
import { getItineraryCount } from '@/data/trips';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--bg-primary)] text-[var(--text-primary)] pt-16 pb-12 border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <TripkarioLogo badgeSize={34} />
            </Link>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm font-normal">
              Trips across India, planned around you. Verified boutique stays, private chauffeurs, and dedicated human assistance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold uppercase transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[var(--border-card)] hover:border-[#E1306C] text-xs font-mono text-[var(--text-muted)] hover:text-[#E1306C] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block font-semibold">
              Explore
            </span>
            <ul className="space-y-2 text-xs font-medium text-[var(--text-muted)]">
              <li><Link href="/itineraries" className="text-[var(--accent)] font-semibold hover:underline transition-colors">All {getItineraryCount()} Itineraries →</Link></li>
              <li><a href="/#india-journey" className="hover:text-[var(--text-primary)] transition-colors">Kashmir to Kanyakumari</a></li>
              <li><a href="/#packages" className="hover:text-[var(--text-primary)] transition-colors">Curated Trips</a></li>
              <li><a href="/#destinations" className="hover:text-[var(--text-primary)] transition-colors">Destinations</a></li>
              <li><a href="/#testimonials" className="hover:text-[var(--text-primary)] transition-colors">Traveller Reviews</a></li>
              <li><a href="/#team" className="hover:text-[var(--text-primary)] transition-colors">Why TripKario?</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block font-semibold">
              Get in Touch
            </span>
            <ul className="space-y-3 text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--text-primary)] transition-colors font-mono">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[var(--text-primary)] transition-colors font-mono font-bold text-[var(--text-primary)]">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: End Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[var(--accent)] font-semibold">
            <span>Aap destination batao. Baaki hum dekh lenge.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
