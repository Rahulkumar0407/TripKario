'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialDestinations, SeedDestination } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Eye,
  Trash2,
  MapPin,
  Check,
  X,
  Edit2,
  Sparkles,
} from 'lucide-react';

export default function AdminDestinationsPage() {
  const [destList, setDestList] = useState<SeedDestination[]>(initialDestinations);
  const [editingDest, setEditingDest] = useState<SeedDestination | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = destList.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (slug: string) => {
    setDestList((prev) =>
      prev.map((d) => (d.slug === slug ? { ...d, isActive: !d.isActive } : d))
    );
  };

  const handleAddNew = () => {
    const newDest: SeedDestination = {
      slug: `dest-${Date.now()}`,
      name: 'New Destination',
      region: 'North India',
      tagline: 'Scenic vistas and tranquil hideaways.',
      description: 'An exceptional territory waiting to be discovered with handpicked boutique stays.',
      imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1600&auto=format&fit=crop',
      startingPrice: 24999,
      isActive: true,
      highlights: ['Scenic drives', 'Verified boutique rooms', 'Private chauffeur'],
    };
    setDestList((prev) => [newDest, ...prev]);
    setEditingDest(newDest);
  };

  const handleSave = (saved: SeedDestination) => {
    setDestList((prev) => prev.map((d) => (d.slug === saved.slug ? saved : d)));
    setEditingDest(null);
  };

  const handleDelete = (slug: string) => {
    setDestList((prev) => prev.filter((d) => d.slug !== slug));
    if (editingDest?.slug === slug) setEditingDest(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            DESTINATION DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Destinations & Territories ({destList.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Add or edit travel regions, starting prices, curated highlights, and imagery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNew}
            className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Destination</span>
          </button>
        </div>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.slug}
            className={`rounded-3xl bg-white dark:bg-[#14120F] border overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md ${
              dest.isActive
                ? 'border-[#E5DFD5] dark:border-[#262420]'
                : 'border-dashed border-black/10 dark:border-white/10 opacity-60'
            }`}
          >
            <div className="relative aspect-[16/10] bg-[#E8DED0] dark:bg-[#1A1815] overflow-hidden">
              <Image
                src={dest.imageUrl}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase">
                {dest.region}
              </span>

              <span
                className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                  dest.isActive ? 'bg-[#174E48] text-white' : 'bg-black/60 text-white/70'
                }`}
              >
                {dest.isActive ? 'Published' : 'Hidden'}
              </span>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono text-[#F4A261] uppercase tracking-wider block">
                  {dest.tagline}
                </span>
                <h3 className="text-xl font-bold font-serif">{dest.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-2 leading-relaxed">
                {dest.description}
              </p>

              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#8C8479] uppercase block">Starting from</span>
                  <span className="text-sm font-bold text-[#174E48] dark:text-[#D4A467] font-mono">
                    ₹{dest.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDest(dest)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(dest.slug)}
                    className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Destination Edit Drawer */}
      {editingDest && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingDest(null)}
          />

          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#14120F] h-full shadow-2xl border-l border-[#E5DFD5] dark:border-[#262420] flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] font-bold">
                    DESTINATION EDITOR
                  </span>
                  <h2 className="text-lg font-bold text-[#171512] dark:text-white">
                    Edit {editingDest.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#8C8479] block font-bold">
                  Cover Photo
                </label>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 group">
                  <Image
                    src={editingDest.imageUrl}
                    alt={editingDest.name}
                    fill
                    sizes="450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                  className="w-full py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#C85D3A]"
                >
                  Change Cover Photo
                </button>
              </div>

              {/* Fields */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Destination Name</label>
                  <input
                    type="text"
                    value={editingDest.name}
                    onChange={(e) =>
                      setEditingDest({ ...editingDest, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Region / Zone</label>
                    <input
                      type="text"
                      value={editingDest.region}
                      onChange={(e) =>
                        setEditingDest({ ...editingDest, region: e.target.value })
                      }
                      className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Starting Price (₹)</label>
                    <input
                      type="number"
                      value={editingDest.startingPrice}
                      onChange={(e) =>
                        setEditingDest({ ...editingDest, startingPrice: Number(e.target.value) })
                      }
                      className="w-full p-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Short Tagline</label>
                  <input
                    type="text"
                    value={editingDest.tagline}
                    onChange={(e) =>
                      setEditingDest({ ...editingDest, tagline: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Full Description</label>
                  <textarea
                    rows={4}
                    value={editingDest.description}
                    onChange={(e) =>
                      setEditingDest({ ...editingDest, description: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420]">
                  <span className="font-bold text-[#171512] dark:text-white">
                    Show on Homepage Carousel
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingDest({ ...editingDest, isActive: !editingDest.isActive })
                    }
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                      editingDest.isActive
                        ? 'bg-[#174E48] text-white'
                        : 'bg-black/10 text-[#8C8479]'
                    }`}
                  >
                    {editingDest.isActive ? 'Active' : 'Off'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between gap-3 bg-[#FAF7F2] dark:bg-[#11100E]">
              <button
                type="button"
                onClick={() => setEditingDest(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6D665E] dark:text-[#8C8479]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleSave(editingDest)}
                className="px-6 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-sm"
              >
                Save & Publish
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
          if (editingDest) {
            setEditingDest({ ...editingDest, imageUrl: url });
          }
        }}
        categoryFilter="Destination"
        title="Select Destination Cover Photo"
      />
    </div>
  );
}
