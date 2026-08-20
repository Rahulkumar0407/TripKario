'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialHeroSlides, SeedHeroSlide } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Eye,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Sparkles,
  MapPin,
  Clock,
  IndianRupee,
  Layers,
  Edit2,
} from 'lucide-react';

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<SeedHeroSlide[]>(initialHeroSlides);
  const [editingSlide, setEditingSlide] = useState<SeedHeroSlide | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState<SeedHeroSlide | null>(null);
  const [safetyMessage, setSafetyMessage] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    const target = slides.find((s) => s.id === id);
    if (target?.isActive) {
      const activeCount = slides.filter((s) => s.isActive).length;
      if (activeCount <= 1) {
        setSafetyMessage('At least one hero slide must remain active on your website.');
        setTimeout(() => setSafetyMessage(null), 3500);
        return;
      }
    }
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;
    newSlides.forEach((s, idx) => (s.displayOrder = idx + 1));
    setSlides(newSlides);
  };

  const handleDuplicate = (slide: SeedHeroSlide) => {
    const duplicated: SeedHeroSlide = {
      ...slide,
      id: `hero_${Date.now()}`,
      destination: `${slide.destination} (Copy)`,
      displayOrder: slides.length + 1,
    };
    setSlides((prev) => [...prev, duplicated]);
  };

  const handleDelete = (id: string) => {
    const activeCount = slides.filter((s) => s.isActive).length;
    const target = slides.find((s) => s.id === id);
    if (target?.isActive && activeCount <= 1) {
      setSafetyMessage('Cannot delete the only active hero slide. Create or activate another slide first.');
      setTimeout(() => setSafetyMessage(null), 3500);
      return;
    }
    setSlides((prev) => prev.filter((s) => s.id !== id));
    if (editingSlide?.id === id) setEditingSlide(null);
  };

  const handleAddNew = () => {
    const newSlide: SeedHeroSlide = {
      id: `hero_${Date.now()}`,
      destination: 'New Destination',
      tagline: 'Experience the pristine landscapes and timeless serenity.',
      imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1800&auto=format&fit=crop',
      route: 'Circuit · 6 Days',
      duration: '6 Days / 5 Nights',
      startingPrice: 'From ₹24,999 / person',
      displayOrder: slides.length + 1,
      isActive: true,
    };
    setSlides((prev) => [newSlide, ...prev]);
    setEditingSlide(newSlide);
  };

  const handleSaveSlide = (saved: SeedHeroSlide) => {
    setSlides((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
    setEditingSlide(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            HOMEPAGE HERO SLIDES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Hero Carousel Manager ({slides.length} slides)
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Manage the cinematic full-bleed destination slides at the very top of TripKario.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hero Slide</span>
          </button>
        </div>
      </div>

      {/* Safety Warning Banner */}
      {safetyMessage && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
          <span>⚠️ {safetyMessage}</span>
        </div>
      )}

      {/* Slide Cards List */}
      <div className="space-y-4">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#14120F] border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm hover:shadow-md ${
              slide.isActive
                ? 'border-[#E5DFD5] dark:border-[#262420]'
                : 'border-dashed border-black/10 dark:border-white/10 opacity-60'
            }`}
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
              {/* Order index */}
              <span className="w-8 h-8 rounded-full bg-[#FAF7F2] dark:bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-[#C85D3A] shrink-0">
                0{idx + 1}
              </span>

              {/* Thumbnail */}
              <div className="relative w-24 sm:w-32 aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] shrink-0 border border-black/5 dark:border-white/10 shadow-xs">
                <Image
                  src={slide.imageUrl}
                  alt={slide.destination}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white truncate">
                    {slide.destination}
                  </h3>
                  {slide.isActive ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#174E48]/10 text-[#174E48] dark:text-[#D4A467] text-[10px] font-mono font-bold">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8C8479] text-[10px] font-mono font-bold">
                      Draft / Hidden
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-1">
                  {slide.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#8C8479] pt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C85D3A]" />
                    {slide.route}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4A467]" />
                    {slide.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[#174E48] dark:text-[#D4A467] font-semibold">
                    {slide.startingPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5DFD5] dark:border-[#262420]">
              {/* Reorder up/down */}
              <div className="flex items-center gap-1 bg-[#FAF7F2] dark:bg-white/5 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-[#8C8479] hover:text-[#171512] dark:hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === slides.length - 1}
                  className="p-1.5 rounded-lg text-[#8C8479] hover:text-[#171512] dark:hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preview Button */}
              <button
                type="button"
                onClick={() => setShowPreviewModal(slide)}
                className="p-2 rounded-xl text-[#6D665E] dark:text-[#B8B0A4] hover:bg-[#FAF7F2] dark:hover:bg-white/5"
                title="Preview Slide"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Duplicate Button */}
              <button
                type="button"
                onClick={() => handleDuplicate(slide)}
                className="p-2 rounded-xl text-[#6D665E] dark:text-[#B8B0A4] hover:bg-[#FAF7F2] dark:hover:bg-white/5"
                title="Duplicate Slide"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => setEditingSlide(slide)}
                className="px-3.5 py-1.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-xs"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>

              {/* Active Toggle Switch */}
              <button
                type="button"
                onClick={() => handleToggleActive(slide.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                  slide.isActive
                    ? 'bg-[#174E48]/10 text-[#174E48] dark:text-[#D4A467] hover:bg-[#174E48]/20'
                    : 'bg-black/5 dark:bg-white/5 text-[#8C8479] hover:bg-black/10'
                }`}
              >
                {slide.isActive ? 'Active' : 'Off'}
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDelete(slide.id)}
                className="p-2 rounded-xl text-red-500 hover:bg-red-500/10"
                title="Delete Slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slide Drawer */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingSlide(null)}
          />

          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#14120F] h-full shadow-2xl border-l border-[#E5DFD5] dark:border-[#262420] flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] font-bold">
                    HERO SLIDE EDITOR
                  </span>
                  <h2 className="text-lg font-bold text-[#171512] dark:text-white">
                    Edit {editingSlide.destination}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Preview & Change Button */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#8C8479] block font-bold">
                  Hero Photograph
                </label>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 group">
                  <Image
                    src={editingSlide.imageUrl}
                    alt={editingSlide.destination}
                    fill
                    sizes="450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="px-4 py-2 rounded-xl bg-white text-[#171512] text-xs font-bold font-mono tracking-wider uppercase shadow-md cursor-pointer"
                    >
                      Choose from Library
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="w-full py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#C85D3A] hover:bg-[#FAF7F2]/80 transition-colors"
                >
                  Change Photo from Media Library
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Destination Name</label>
                  <input
                    type="text"
                    value={editingSlide.destination}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, destination: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Tagline / Short Line</label>
                  <textarea
                    rows={2}
                    value={editingSlide.tagline}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, tagline: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Route / Territory</label>
                    <input
                      type="text"
                      value={editingSlide.route}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, route: e.target.value })
                      }
                      className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingSlide.duration}
                      onChange={(e) =>
                        setEditingSlide({ ...editingSlide, duration: e.target.value })
                      }
                      className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Starting Price Line</label>
                  <input
                    type="text"
                    value={editingSlide.startingPrice}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, startingPrice: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-3 bg-[#FAF7F2] dark:bg-[#11100E]">
              <button
                type="button"
                onClick={() => setEditingSlide(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6D665E] dark:text-[#8C8479] hover:bg-black/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSaveSlide(editingSlide)}
                className="px-6 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-sm cursor-pointer"
              >
                Save & Publish Slide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (editingSlide) {
            setEditingSlide({ ...editingSlide, imageUrl: url });
          }
        }}
        categoryFilter="Hero"
        title="Select Hero Background Photograph"
      />

      {/* Live Preview Modal (#28) */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#14120F] border border-white/15 shadow-2xl">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={showPreviewModal.imageUrl}
                alt={showPreviewModal.destination}
                fill
                sizes="900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#F4A261] font-bold">
                  {showPreviewModal.route} · {showPreviewModal.duration}
                </span>
                <h2 className="text-4xl sm:text-6xl font-serif">{showPreviewModal.destination}</h2>
                <p className="text-sm text-white/80 max-w-md">{showPreviewModal.tagline}</p>
                <div className="pt-2">
                  <span className="text-base font-bold text-[#F4A261]">
                    {showPreviewModal.startingPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#14120F] flex justify-end">
              <button
                type="button"
                onClick={() => setShowPreviewModal(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
