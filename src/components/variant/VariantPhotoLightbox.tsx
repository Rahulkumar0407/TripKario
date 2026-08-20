'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import VariantGlass from './VariantGlass';
import { ContactPhoto } from '@/data/variant/variantData';
import { X, ArrowLeft, ArrowRight, MapPin, Clock, Camera, Sparkles } from 'lucide-react';

interface VariantPhotoLightboxProps {
  photo: ContactPhoto | null;
  allPhotos: ContactPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: ContactPhoto) => void;
}

export default function VariantPhotoLightbox({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}: VariantPhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % allPhotos.length;
        onSelectPhoto(allPhotos[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
        onSelectPhoto(allPhotos[prevIndex]);
      }
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, allPhotos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIndex]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop with Motion Blur & Darkening */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Physical Photo Pop-up Card using motion.dev Spring Physics */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 28,
            mass: 0.9,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#151310] p-4 sm:p-6 md:p-8 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] border-4 sm:border-8 border-white dark:border-[#1F1C18] flex flex-col max-h-[92vh] overflow-y-auto"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#C85D3A]/10 text-[#C85D3A] font-semibold">
                PHOTO {String(currentIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
              </span>
              <span className="text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1] hidden sm:inline">
                {photo.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo preview"
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#C85D3A] hover:text-white transition-colors text-[#171512] dark:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* High-Resolution Photo Display Area */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] shadow-inner">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-108"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-108"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* In-Photo Glass Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto z-20">
              <VariantGlass
                intensity="deep"
                className="rounded-2xl p-3.5 text-white border-white/30 max-w-md shadow-2xl"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#D4A467] uppercase tracking-wider mb-1">
                  <span>{photo.location}</span>
                  <span>{photo.time}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {photo.title}
                </h3>
              </VariantGlass>
            </div>
          </div>

          {/* Bottom Field Notes Metadata */}
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6D665E] dark:text-[#B6ADA1]">
            <div className="flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#C85D3A]" />
              <span>Shot by {photo.photographer} · Authentic Travel Archive</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#174E48] dark:text-[#D4A467]" />
              <span>Recorded at {photo.time}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
