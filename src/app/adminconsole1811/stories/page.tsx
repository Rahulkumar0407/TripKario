'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialStories, SeedStory } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import { Plus, Trash2, Edit2, Calendar, MapPin, X } from 'lucide-react';

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<SeedStory[]>(initialStories);
  const [editingStory, setEditingStory] = useState<SeedStory | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const handleAddNew = () => {
    const newStory: SeedStory = {
      slug: `story-${Date.now()}`,
      title: 'Monsoon Magic in the Western Ghats',
      destinationName: 'Kerala',
      tripDate: 'July 2026',
      coverImageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1600&auto=format&fit=crop',
      storyText: 'Waking up to misty tea plantations and enjoying quiet cups of freshly plucked cardamom tea.',
      isPublished: true,
    };
    setStories([newStory, ...stories]);
    setEditingStory(newStory);
  };

  const handleSave = (saved: SeedStory) => {
    setStories((prev) => prev.map((s) => (s.slug === saved.slug ? saved : s)));
    setEditingStory(null);
  };

  const handleDelete = (slug: string) => {
    setStories((prev) => prev.filter((s) => s.slug !== slug));
    if (editingStory?.slug === slug) setEditingStory(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            PAST TRIPS & FIELD NOTES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Traveller Stories ({stories.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Real guest moments and photographic dispatches from recent circuits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Story</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {stories.map((story) => (
          <div
            key={story.slug}
            className="rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#E8DED0] dark:bg-[#1A1815]">
              <Image src={story.coverImageUrl} alt={story.title} fill sizes="350px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold uppercase">
                {story.destinationName}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#8C8479] uppercase block mb-1">
                  {story.tripDate}
                </span>
                <h3 className="text-base font-bold text-[#171512] dark:text-white line-clamp-1">
                  {story.title}
                </h3>
                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-2 mt-1">
                  {story.storyText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingStory(story)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-xs font-mono font-bold uppercase transition-colors"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(story.slug)}
                  className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {editingStory && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditingStory(null)} />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#14120F] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5] dark:border-[#262420]">
                <h2 className="text-base font-bold text-[#171512] dark:text-white">Edit Story</h2>
                <button onClick={() => setEditingStory(null)}><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-1">
                <label className="text-[#8C8479] uppercase block">Cover Photo</label>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/10">
                  <Image src={editingStory.coverImageUrl} alt={editingStory.title} fill sizes="350px" className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="w-full py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] text-[#C85D3A] font-bold mt-1"
                >
                  Change Photo
                </button>
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Story Title</label>
                <input
                  type="text"
                  value={editingStory.title}
                  onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1">Story Narrative</label>
                <textarea
                  rows={4}
                  value={editingStory.storyText}
                  onChange={(e) => setEditingStory({ ...editingStory, storyText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD5] dark:border-[#262420] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave(editingStory)}
                className="px-5 py-2 rounded-xl bg-[#174E48] text-white text-xs font-mono font-bold uppercase"
              >
                Save Story
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => {
          if (editingStory) setEditingStory({ ...editingStory, coverImageUrl: url });
        }}
        categoryFilter="Past Trip"
      />
    </div>
  );
}
