'use client';

import React from 'react';
import {
  CalendarDays,
  HeartHandshake,
  Users2,
  Mountain,
  Palmtree,
  Crown,
  PlaneTakeoff,
  Sparkles,
} from 'lucide-react';

interface TravelCategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function TravelCategory({
  selectedCategory,
  onSelectCategory,
}: TravelCategoryProps) {
  const categories = [
    {
      id: 'All',
      label: 'All Styles',
      icon: Sparkles,
      tag: 'All Trips',
    },
    {
      id: 'Weekend',
      label: 'Weekend',
      icon: CalendarDays,
      tag: '2–4 Days',
    },
    {
      id: 'Honeymoon',
      label: 'Honeymoon',
      icon: HeartHandshake,
      tag: 'Romantic',
    },
    {
      id: 'Family',
      label: 'Family',
      icon: Users2,
      tag: 'Guided & Safe',
    },
    {
      id: 'Adventure',
      label: 'Adventure',
      icon: Mountain,
      tag: 'Treks & Passes',
    },
    {
      id: 'Friends',
      label: 'Friends',
      icon: Palmtree,
      tag: 'Group Trips',
    },
    {
      id: 'Luxury',
      label: 'Luxury',
      icon: Crown,
      tag: '5-Star Stays',
    },
    {
      id: 'International',
      label: 'International',
      icon: PlaneTakeoff,
      tag: 'Beyond India',
    },
  ];

  return (
    <section id="categories" className="py-12 md:py-16 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--brand-teal)] dark:text-[var(--brand-saffron)] font-semibold block mb-1">
              Trip Styles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[var(--text-primary)]">
              What are you travelling for?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm">
            Filter our signature holidays by your desired pace, travel companions, or vacation style.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`relative flex flex-col items-center justify-between text-center p-3.5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--brand-teal)] text-white border-[var(--brand-teal)] shadow-sm'
                    : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--brand-teal)]/40'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                    isSelected
                      ? 'bg-white/15 text-[var(--brand-saffron)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--brand-teal)] dark:text-[var(--brand-saffron)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title */}
                <span className="text-xs font-semibold tracking-tight line-clamp-1 block mb-1">
                  {cat.label}
                </span>

                {/* Tag */}
                <span
                  className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/15 text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                  }`}
                >
                  {cat.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
