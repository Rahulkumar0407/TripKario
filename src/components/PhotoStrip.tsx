'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fieldNotes } from '@/data/gallery';
import GlassSurface from './ui/GlassSurface';
import { Camera } from 'lucide-react';

export default function PhotoStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth horizontal movement right -> left tied to scroll
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['5%', '-25%']);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-semibold block mb-2">
            Field Notes
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] tracking-tight">
            Observed across India.
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Camera className="w-4 h-4 text-[var(--accent)]" />
          <span>Real field photography & verified route notes</span>
        </div>
      </div>

      {/* Horizontal Draggable / Scroll-Animated Photo Strip */}
      <div className="relative w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
        <motion.div
          style={{ x: xTranslation }}
          className="flex items-center gap-6 px-4 sm:px-10 min-w-max pb-6"
        >
          {fieldNotes.map((note, idx) => {
            const aspectClasses = {
              portrait: 'w-[280px] sm:w-[340px] aspect-[3/4]',
              landscape: 'w-[360px] sm:w-[460px] aspect-[16/10]',
              square: 'w-[300px] sm:w-[380px] aspect-square',
            };

            return (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                data-cursor="VIEW"
                className={`relative ${aspectClasses[note.aspect]} rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] group shrink-0 select-none`}
              >
                <Image
                  src={note.image.src}
                  alt={note.image.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Index Counter */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                    0{idx + 1} / 0{fieldNotes.length}
                  </span>
                </div>

                {/* Glass Attribution & Timestamp Caption on Hover */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <GlassSurface
                    variant="dark"
                    rounded="xl"
                    className="p-3 sm:p-4 text-white"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#F4A261] font-semibold mb-1">
                      <span>{note.location}</span>
                      <span>{note.time}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-serif font-medium text-white line-clamp-1">
                      {note.title}
                    </h4>
                    <div className="text-[10px] font-mono text-white/60 pt-1">
                      Photo — {note.photographer}
                    </div>
                  </GlassSurface>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
