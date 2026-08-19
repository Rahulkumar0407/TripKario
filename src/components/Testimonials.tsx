'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => {
            const avatarSrc = item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop';
            return (
              <div key={item.id} className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-card)] space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-serif text-[var(--text-primary)] leading-relaxed">
                  &ldquo;{item.comment || item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black/10">
                    <Image src={avatarSrc} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.name}</h4>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
