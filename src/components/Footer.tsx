'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import TripkarioLogo from './TripkarioLogo';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site';
import { openWhatsApp } from '@/lib/whatsapp';

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
              {siteConfig.description}
            </p>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openWhatsApp('Hi TripKario! I would like to enquire about holiday packages.')}
                className="gap-2 rounded-full"
              >
                <MessageCircle className="w-4 h-4 text-[var(--accent)]" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block font-semibold">
              Explore
            </span>
            <ul className="space-y-2 text-xs font-medium text-[var(--text-muted)]">
              <li><a href="#journeys" className="hover:text-[var(--text-primary)] transition-colors">Curated Journeys</a></li>
              <li><a href="#destinations" className="hover:text-[var(--text-primary)] transition-colors">Territory Highlights</a></li>
              <li><a href="#itinerary" className="hover:text-[var(--text-primary)] transition-colors">Itinerary Experience</a></li>
              <li><a href="#stories" className="hover:text-[var(--text-primary)] transition-colors">Traveller Stories</a></li>
              <li><a href="#why-us" className="hover:text-[var(--text-primary)] transition-colors">Why TripKario</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block font-semibold">
              Contact Desk
            </span>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{siteConfig.officeAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-[var(--text-primary)] transition-colors">
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <a href={`tel:${siteConfig.whatsappNumber}`} className="hover:text-[var(--text-primary)] transition-colors font-mono">
                  {siteConfig.whatsappDisplayNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: End Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[var(--accent)] font-semibold">
            <span>See you somewhere beautiful.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
