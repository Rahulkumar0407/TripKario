'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Compass, IndianRupee, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import GlassSurface from './ui/GlassSurface';
import MagneticButton from './ui/MagneticButton';

interface TripFinderProps {
  onSearch: (filters: {
    destination: string;
    travelStyle: string;
    duration: string;
    budget: string;
  }) => void;
  onOpenPlanTrip: () => void;
}

export default function TripFinder({ onSearch, onOpenPlanTrip }: TripFinderProps) {
  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<'dest' | 'style' | 'budget' | null>(null);

  const styleOptions = ['Couple', 'Family', 'Friends', 'Solo'];
  const budgetOptions = ['Under ₹15K', '₹15K–₹30K', '₹30K–₹50K', '₹50K+'];

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const handleSelectDest = (destName: string) => {
    setSelectedDestination(destName);
    setDestinationQuery(destName);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    onSearch({
      destination: selectedDestination || destinationQuery,
      travelStyle: selectedStyle,
      duration: '',
      budget: selectedBudget,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <GlassSurface variant="frost" rounded="3xl" className="p-3 sm:p-4 text-white shadow-2xl border border-white/20">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
          <div className="relative sm:col-span-5">
            <div
              onClick={() => setActiveDropdown(activeDropdown === 'dest' ? null : 'dest')}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                  WHERE
                </span>
                <span className="block text-sm font-semibold truncate text-white">
                  {selectedDestination || 'Search destination'}
                </span>
              </div>
            </div>

            {activeDropdown === 'dest' && (
              <div className="absolute top-full left-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl p-4 z-50 overflow-hidden bg-[#11100E]/95 text-white border border-white/20">
                <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
                  {filteredDestinations.map((dest) => {
                    const imgSrc = typeof dest.image === 'string' ? dest.image : dest.image.src;
                    return (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => handleSelectDest(dest.name)}
                        className="w-full text-left p-2 rounded-xl text-xs transition-all flex items-center gap-3 cursor-pointer hover:bg-white/10 text-white"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-black/20">
                          <Image src={imgSrc} alt={dest.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold block truncate">{dest.name}</span>
                          <span className="text-[10px] text-white/70">From {formatPrice(dest.startingPrice)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="relative sm:col-span-3">
            <div
              onClick={() => setActiveDropdown(activeDropdown === 'style' ? null : 'style')}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                  TRAVELLING AS
                </span>
                <span className="block text-sm font-semibold truncate text-white">
                  {selectedStyle || 'Couple'}
                </span>
              </div>
            </div>
          </div>

          <div className="relative sm:col-span-4 flex items-center gap-2">
            <div
              onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition-all flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E46B3B]/20 text-[#E46B3B] flex items-center justify-center shrink-0">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 font-semibold">
                  BUDGET
                </span>
                <span className="block text-sm font-semibold truncate text-white">
                  {selectedBudget || '₹25K'}
                </span>
              </div>
            </div>

            <MagneticButton
              type="submit"
              className="px-7 h-12 rounded-2xl bg-[#E46B3B] hover:bg-[#ED7B4D] text-white shadow-xl flex items-center gap-2 shrink-0"
            >
              <span>FIND TRIP</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </form>
      </GlassSurface>
    </div>
  );
}
