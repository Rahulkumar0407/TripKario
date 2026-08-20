'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, MessageCircle, ArrowUpRight, Compass } from 'lucide-react';
import TripkarioLogo from '@/components/TripkarioLogo';
import VariantGlass from './VariantGlass';
import { siteConfig } from '@/data/site';
import { openWhatsApp } from '@/lib/whatsapp';

export default function VariantFooter() {
  return (
    <footer id="contact" className="bg-[#FBF8F1]/80 dark:bg-[#0D0C0A] text-[#171512] dark:text-[#F5EFE6] pt-16 pb-12 border-t border-black/5 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-black/5 dark:border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/variant" className="inline-block">
              <TripkarioLogo badgeSize={36} />
            </Link>

            <p className="text-xs text-[#6D665E] dark:text-[#B6ADA1] leading-relaxed max-w-sm font-normal">
              TripKario Edition 02 — An interactive travel desk crafted for curious travellers who value unhurried pacing, authentic stays, and dedicated human help.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openWhatsApp('Hi TripKario! I am exploring Variant 02 and would like to enquire about curated journeys.')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#174E48] text-white dark:bg-[#1E5A53] text-xs font-mono tracking-wider shadow-sm hover:bg-[#113834] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D4A467]" />
                <span>Chat on WhatsApp</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 text-xs font-mono text-[#171512] dark:text-white border border-black/5 dark:border-white/15 hover:bg-white transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#C85D3A]" />
                <span>Original Cinematic Version</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C85D3A] dark:text-[#E16A43] block font-semibold">
              Travel Desk Sections
            </span>
            <ul className="space-y-2 text-xs font-medium text-[#6D665E] dark:text-[#B6ADA1]">
              <li><a href="#moods" className="hover:text-[#171512] dark:hover:text-white transition-colors">01. Pick Your Mood</a></li>
              <li><a href="#destinations" className="hover:text-[#171512] dark:hover:text-white transition-colors">02. Destination Spread</a></li>
              <li><a href="#editorial" className="hover:text-[#171512] dark:hover:text-white transition-colors">03. Field Notes Gallery</a></li>
              <li><a href="#stories" className="hover:text-[#171512] dark:hover:text-white transition-colors">04. Real Traveller Stories</a></li>
              <li><a href="#itinerary" className="hover:text-[#171512] dark:hover:text-white transition-colors">05. Daily Flow Schedule</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C85D3A] dark:text-[#E16A43] block font-semibold">
              TripKario Desk
            </span>
            <ul className="space-y-2.5 text-xs text-[#6D665E] dark:text-[#B6ADA1]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C85D3A] shrink-0 mt-0.5" />
                <span>{siteConfig.officeAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#174E48] dark:text-[#D4A467] shrink-0" />
                <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-[#171512] dark:hover:text-white transition-colors font-mono">
                  {siteConfig.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#174E48] dark:text-[#D4A467] shrink-0" />
                <a href={`tel:${siteConfig.whatsappNumber}`} className="hover:text-[#171512] dark:hover:text-white transition-colors font-mono">
                  {siteConfig.whatsappDisplayNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
          <p>© {new Date().getFullYear()} {siteConfig.name} — Edition 02. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[#C85D3A] dark:text-[#E16A43] font-semibold">
            <span>GO SOMEWHERE BEAUTIFUL.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
