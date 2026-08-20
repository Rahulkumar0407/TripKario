'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function WhyTripkario() {
  const pillars = [
    {
      num: '01',
      title: 'Curated stays',
      desc: 'Boutique heritage havelis, lake houseboats, and secluded mountain chalets personally vetted for comfort and authenticity.',
    },
    {
      num: '02',
      title: 'Verified transport',
      desc: 'Dedicated private chauffeurs and verified vehicles for your entire circuit. Fixed pricing with zero hidden toll arguments.',
    },
    {
      num: '03',
      title: 'Thoughtful itineraries',
      desc: 'Sensible driving distances, scenic chai breaks, and zero rushed tourist traps so your family actually returns rested.',
    },
    {
      num: '04',
      title: 'Human support',
      desc: 'Direct WhatsApp and phone assistance with your dedicated travel specialist before and during your trip.',
    },
  ];

  return (
    <section id="why-us" className="py-24 md:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* Left Large Statement */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block">
              The Philosophy
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.05] text-[var(--text-primary)] tracking-tight">
              You enjoy the trip. <br />
              <span className="text-[var(--accent)]">
                We handle the chaos.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-md font-normal">
              Because coordinating 8 people on WhatsApp is already a full-time job. We handle verified boutique rooms, private chauffeur transport, entry passes, and route pacing.
            </p>
          </div>

          {/* Right Pillar Flow Along Route */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="p-6 sm:p-7 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] shadow-xs flex items-start gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--accent)]/30 cursor-pointer"
              >
                <span className="text-sm font-mono font-bold text-[var(--accent)] mt-0.5">
                  {p.num}
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
              <span>Human chahiye? Bilkul.</span>
              <span className="text-[var(--accent)] font-semibold">100% Handcrafted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
