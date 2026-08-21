'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { fieldNotes } from '@/data/gallery';
import GlassSurface from './ui/GlassSurface';
import { Camera, MapPin, Clock } from 'lucide-react';

export default function PhotoStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll interpolation with spring physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const xTranslation = useTransform(smoothProgress, [0, 1], ['8%', '-32%']);

  return (
    <section
      id="field-notes"
      ref={containerRef}
      className="py-24 md:py-36 bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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
          <span>Real field photography & verified route moments</span>
        </div>
      </div>

      {/* Parallax Layered Photographic Strip */}
      <div className="relative w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-8">
        <motion.div
          style={{ x: xTranslation }}
          className="flex items-center gap-7 px-4 sm:px-12 min-w-max"
        >
          {fieldNotes.map((note, idx) => {
            // Asymmetric aspect ratios and subtle staggered vertical parallax offsets
            const verticalOffsets = ['translate-y-0', 'translate-y-4', '-translate-y-3', 'translate-y-2'];
            const verticalOffset = verticalOffsets[idx % verticalOffsets.length];

            const aspectClasses = {
              portrait: 'w-[290px] sm:w-[350px] aspect-[3/4]',
              landscape: 'w-[370px] sm:w-[480px] aspect-[16/10]',
              square: 'w-[310px] sm:w-[390px] aspect-square',
            };

            return (
              <PhotoCard
                key={note.id}
                note={note}
                idx={idx}
                total={fieldNotes.length}
                aspectClass={aspectClasses[note.aspect]}
                verticalOffset={verticalOffset}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PhotoCard({
  note,
  idx,
  total,
  aspectClass,
  verticalOffset,
}: {
  note: any;
  idx: number;
  total: number;
  aspectClass: string;
  verticalOffset: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 2-5px mouse parallax on desktop hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative ${aspectClass} ${verticalOffset} rounded-3xl overflow-hidden shadow-xl border border-[var(--border-card)] group shrink-0 select-none transition-shadow duration-500 hover:shadow-2xl`}
      style={{
        x: springX,
        y: springY,
      }}
    >
      <Image
        src={note.image.src}
        alt={note.image.alt}
        fill
        sizes="(max-width: 768px) 85vw, 40vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Frame Index Counter */}
      <div className="absolute top-4 left-4">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest font-bold border border-white/10">
          0{idx + 1} / 0{total}
        </span>
      </div>

      {/* Photographer Attribution in Corner */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/85 text-[9.5px] font-mono border border-white/10">
          {note.photographer}
        </span>
      </div>

      {/* Glass Caption & Metadata Overlay with Staggered Hierarchy (LOCATION → TIME → CAPTION) */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <GlassSurface
          variant="dark"
          rounded="2xl"
          className="p-3.5 sm:p-4 text-white border border-white/15"
        >
          <div className="flex items-center justify-between text-[10.5px] font-mono text-[#F4A261] font-semibold mb-1">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {note.location}
            </span>
            <span className="flex items-center gap-1 shrink-0 ml-2">
              <Clock className="w-3 h-3" />
              {note.time}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-serif font-medium text-white line-clamp-1 group-hover:text-white transition-colors">
            {note.title}
          </h4>
        </GlassSurface>
      </div>
    </motion.div>
  );
}
