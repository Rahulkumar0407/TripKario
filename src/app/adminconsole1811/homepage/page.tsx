'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialHomepageSections, SeedHomepageSection } from '@/lib/admin/seedData';
import {
  Layers,
  Eye,
  ArrowUp,
  ArrowDown,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const sectionRouteLinks: Record<string, string> = {
  hero: '/adminconsole1811/hero',
  featured_trips: '/adminconsole1811/trips',
  destinations: '/adminconsole1811/destinations',
  travel_styles: '/adminconsole1811/styles',
  field_notes: '/adminconsole1811/stories',
  testimonials: '/adminconsole1811/testimonials',
  team: '/adminconsole1811/team',
  custom_trip: '/adminconsole1811/settings',
  final_cta: '/adminconsole1811/settings',
};

export default function AdminHomepageManagerPage() {
  const [sections, setSections] = useState<SeedHomepageSection[]>(initialHomepageSections);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key: string) => {
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const newSec = [...sections];
    const temp = newSec[index];
    newSec[index] = newSec[targetIdx];
    newSec[targetIdx] = temp;
    newSec.forEach((s, i) => (s.displayOrder = i + 1));
    setSections(newSec);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            VISUAL LAYOUT CONTROLLER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Homepage Section Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Turn sections on or off, reorder vertical page flow, and jump directly to editor modules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          {isSaved ? <Check className="w-4 h-4 text-[#D4A467]" /> : null}
          <span>{isSaved ? 'Changes Published!' : 'Save & Publish Layout'}</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-3.5 max-w-3xl">
        {sections.map((sec, idx) => {
          const editLink = sectionRouteLinks[sec.key] || '/adminconsole1811';
          return (
            <div
              key={sec.key}
              className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#14120F] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
                sec.isActive
                  ? 'border-[#E5DFD5] dark:border-[#262420]'
                  : 'border-dashed border-black/15 dark:border-white/15 opacity-50'
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="w-8 h-8 rounded-full bg-[#FAF7F2] dark:bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-[#C85D3A] shrink-0">
                  0{idx + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#171512] dark:text-white truncate">
                      {sec.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        sec.isActive
                          ? 'bg-[#174E48]/10 text-[#174E48] dark:text-[#D4A467]'
                          : 'bg-black/5 dark:bg-white/5 text-[#8C8479]'
                      }`}
                    >
                      {sec.isActive ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  {sec.subtitle && (
                    <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-1">
                      {sec.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Reorder up/down */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-white/5 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-[#8C8479] hover:text-[#171512] dark:hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 rounded-lg text-[#8C8479] hover:text-[#171512] dark:hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct Edit Module Link */}
                <Link
                  href={editLink}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-xs font-mono font-bold uppercase text-[#171512] dark:text-white transition-colors"
                >
                  Edit Content
                </Link>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggle(sec.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-colors ${
                    sec.isActive
                      ? 'bg-[#174E48] text-white'
                      : 'bg-black/10 dark:bg-white/10 text-[#8C8479]'
                  }`}
                >
                  {sec.isActive ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
