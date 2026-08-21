'use client';

import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getItineraryCount, getUniqueDestinationCount } from '@/data/trips';

export default function TrustSection() {
  const stats = [
    { label: 'Happy Travellers', value: siteConfig.stats?.happyTravellers || '5,000+', icon: HeartHandshake },
    { label: 'Destinations', value: `${getUniqueDestinationCount()}+`, icon: Sparkles },
    { label: 'Curated Itineraries', value: `${getItineraryCount()}+`, icon: Award },
    { label: 'Average Rating', value: '4.9/5', icon: ShieldCheck },
  ];

  return (
    <section className="py-16 bg-[var(--bg-surface-2)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] space-y-2">
                <Icon className="w-6 h-6 mx-auto text-[var(--accent)]" />
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)] block">{s.value}</span>
                <span className="text-xs font-mono text-[var(--text-muted)]">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
