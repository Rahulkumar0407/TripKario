'use client';

import React from 'react';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { Card, CardContent } from '@/components/ui/card';

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-5 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all">
              {cat.image && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-black/10">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                </div>
              )}
              <h3 className="text-base font-serif font-semibold text-[var(--text-primary)] mb-1">{cat.name}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{cat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
