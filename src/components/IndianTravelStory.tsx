'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface IndianTravelStoryProps {
  onSelectDestination: (destination: string) => void;
}

export default function IndianTravelStory({ onSelectDestination }: IndianTravelStoryProps) {
  const journeys = [
    {
      step: '01',
      region: 'North Himalayas',
      destination: 'Kashmir',
      title: 'Alpine Lakes & Houseboats',
      desc: 'Wake up to the gentle ripples of Dal Lake and snow-dusted pine ridges in Gulmarg.',
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop',
    },
    {
      step: '02',
      region: 'Desert Citadels',
      destination: 'Rajasthan',
      title: 'Palaces & Thar Dunes',
      desc: 'Stroll through amber courtyards and sleep beneath galactic skies in luxury desert camps.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
    },
    {
      step: '03',
      region: 'Tropical Waters',
      destination: 'Kerala',
      title: 'Backwaters & Tea Slopes',
      desc: 'Drift through palm-fringed canals in private cedar houseboats and misty Munnar hills.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
    },
    {
      step: '04',
      region: 'Rainforest Clouds',
      destination: 'Meghalaya',
      title: 'Living Root Bridges',
      desc: 'Descend ancient bio-engineered stone trails to crystal turquoise rainforest pools.',
      image: 'https://images.unsplash.com/photo-1626014303757-6466336e4f35?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] text-[var(--text-primary)] relative overflow-hidden border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <Badge variant="secondary" className="mb-3">
            Indian Travel Story
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[var(--text-primary)] mb-3">
            From the mountains to the coast.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            India isn&apos;t one destination. It&apos;s thousands of journeys waiting to be experienced.
          </p>
        </div>

        {/* Horizontal Connecting Route Line (Railway/Map style) */}
        <div className="relative">
          {/* Subtle Route Graphic Track */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-dashed border-t-2 border-dashed border-[var(--brand-teal)]/30 -translate-y-12 z-0" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {journeys.map((item) => (
              <Card
                key={item.destination}
                className="overflow-hidden group hover:border-[var(--brand-teal)]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                    <Image
                      src={item.image}
                      alt={item.destination}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono">
                        Route {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-[var(--brand-saffron)] mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{item.region}</span>
                    </div>
                    <h3 className="text-lg font-serif font-medium text-[var(--text-primary)] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectDestination(item.destination)}
                    className="w-full justify-between"
                  >
                    <span>Explore {item.destination}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--brand-saffron)]" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
