'use client';

import React from 'react';
import { Palette, Plus, Edit2 } from 'lucide-react';

const travelStyles = [
  { id: 'ts-1', title: 'Mountain Escapes', count: '8 journeys', desc: 'Serene pine glades, alpine lakes, and snow passes.' },
  { id: 'ts-2', title: 'Romantic Getaways', count: '6 journeys', desc: 'Private houseboats, heritage suites, and candlelit dune dinners.' },
  { id: 'ts-3', title: 'Unhurried Family', count: '7 journeys', desc: 'Gentle pacing, verified private cars, and kid-safe excursions.' },
  { id: 'ts-4', title: 'Heritage & Desert', count: '5 journeys', desc: 'Sandstone forts, royal havelis, and Rajasthani folklore.' },
];

export default function AdminTravelStylesPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            MOODS & THEMES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Travel Styles ({travelStyles.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Organize trips by travel theme (Honeymoon, Mountain, Family, Heritage, Weekend).
          </p>
        </div>

        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Travel Style</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {travelStyles.map((style) => (
          <div
            key={style.id}
            className="bg-white dark:bg-[#14120F] rounded-3xl p-6 border border-[#E5DFD5] dark:border-[#262420] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#171512] dark:text-white">
                  {style.title}
                </h3>
                <span className="text-xs font-mono font-bold text-[#174E48] dark:text-[#D4A467]">
                  {style.count}
                </span>
              </div>
              <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] mt-2 leading-relaxed">
                {style.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C8479]">Active</span>
              <span className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] dark:bg-white/5 text-[#171512] dark:text-white font-bold flex items-center gap-1">
                <Edit2 className="w-3 h-3 text-[#C85D3A]" />
                <span>Edit</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
