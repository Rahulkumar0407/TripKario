'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { formatPrice } from '@/lib/utils';
import MagneticButton from './ui/MagneticButton';

interface IndiaCollageProps {
  onSelectDestination: (destName: string) => void;
}

export default function IndiaCollage({ onSelectDestination }: IndiaCollageProps) {
  const kashmir = destinations.find((d) => d.id === 'kashmir') || destinations[0];
  const rajasthan = destinations.find((d) => d.id === 'rajasthan') || destinations[1];
  const meghalaya = destinations.find((d) => d.id === 'meghalaya') || destinations[3];

  const kashmirSrc = typeof kashmir.image === 'string' ? kashmir.image : kashmir.image.src;
  const rajasthanSrc = typeof rajasthan.image === 'string' ? rajasthan.image : rajasthan.image.src;
  const meghalayaSrc = typeof meghalaya.image === 'string' ? meghalaya.image : meghalaya.image.src;

  return (
    <section className="py-24 md:py-36 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block">
            Visual Collage
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
            One country. <br />
            A thousand ways to get lost.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal pt-2">
            From the high Himalayan lakes of Kashmir to the golden sand dunes of Rajasthan and the misty rainforest roots of Meghalaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div
            className="md:col-span-7 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-card)] group cursor-pointer"
            onClick={() => onSelectDestination(kashmir.name)}
          >
            <Image
              src={kashmirSrc}
              alt={kashmir.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                HIMALAYAS · {kashmir.name}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white">{kashmir.name}</h3>
                <p className="text-xs text-white/80 font-mono mt-1">{kashmir.tagline}</p>
              </div>
              <span className="text-sm font-serif font-bold text-white">
                From {formatPrice(kashmir.startingPrice)}
              </span>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div
              className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] group cursor-pointer"
              onClick={() => onSelectDestination(rajasthan.name)}
            >
              <Image
                src={rajasthanSrc}
                alt={rajasthan.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                  ROYAL DESERT
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-serif font-medium text-white">{rajasthan.name}</h4>
                  <span className="text-[11px] font-mono text-white/75">From {formatPrice(rajasthan.startingPrice)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div
              className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] group cursor-pointer"
              onClick={() => onSelectDestination(meghalaya.name)}
            >
              <Image
                src={meghalayaSrc}
                alt={meghalaya.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                  RAINFOREST TRAILS
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <h4 className="text-xl font-serif font-medium text-white">{meghalaya.name}</h4>
                  <span className="text-[11px] font-mono text-white/75">From {formatPrice(meghalaya.startingPrice)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
