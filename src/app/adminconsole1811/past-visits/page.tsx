'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialPastVisits, SeedPastVisit } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ArrowLeft,
  ImageIcon,
  Star,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  Calendar,
  MapPin,
} from 'lucide-react';

export default function AdminPastVisitsPage() {
  const [visits, setVisits] = useState<SeedPastVisit[]>(initialPastVisits);
  const [activeVisit, setActiveVisit] = useState<SeedPastVisit | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Visit creation modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleCreateVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestination || !newDate) return;

    const defaultImg =
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1200&auto=format&fit=crop';

    const created: SeedPastVisit = {
      id: `visit-${Date.now()}`,
      destination: newDestination,
      date: newDate,
      title: newTitle || `${newDestination} Trip`,
      coverImageUrl: defaultImg,
      photos: [defaultImg],
    };

    setVisits([created, ...visits]);
    setActiveVisit(created);
    setIsCreateModalOpen(false);
    setNewDestination('');
    setNewDate('');
    setNewTitle('');
  };

  const handleSaveVisit = () => {
    if (!activeVisit) return;
    setVisits((prev) =>
      prev.map((v) => (v.id === activeVisit.id ? activeVisit : v))
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleDeleteVisit = (id: string) => {
    if (confirm('Are you sure you want to delete this past trip album?')) {
      setVisits((prev) => prev.filter((v) => v.id !== id));
      if (activeVisit?.id === id) setActiveVisit(null);
    }
  };

  const handleAddPhotos = (url: string) => {
    if (!activeVisit) return;
    const currentPhotos = activeVisit.photos || [];
    const updated = [...currentPhotos, url];
    setActiveVisit({ ...activeVisit, photos: updated });
  };

  const handleRemovePhoto = (photoUrl: string) => {
    if (!activeVisit) return;
    const updated = activeVisit.photos.filter((p) => p !== photoUrl);
    let newCover = activeVisit.coverImageUrl;
    if (activeVisit.coverImageUrl === photoUrl) {
      newCover = updated[0] || '';
    }
    setActiveVisit({ ...activeVisit, photos: updated, coverImageUrl: newCover });
  };

  const handleSetCoverPhoto = (photoUrl: string) => {
    if (!activeVisit) return;
    setActiveVisit({ ...activeVisit, coverImageUrl: photoUrl });
  };

  const handleMovePhoto = (index: number, direction: 'left' | 'right') => {
    if (!activeVisit) return;
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= activeVisit.photos.length) return;

    const list = [...activeVisit.photos];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setActiveVisit({ ...activeVisit, photos: list });
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            PAST TRIPS & PHOTO GALLERIES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            {activeVisit
              ? `${activeVisit.destination} — ${activeVisit.date}`
              : `Past Visits (${visits.length})`}
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            {activeVisit
              ? `Manage photos and cover image for this completed trip gallery (${activeVisit.photos.length} photos).`
              : 'Manage photo galleries from trips that have already happened.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeVisit ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleSaveVisit();
                  setActiveVisit(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold uppercase text-[#6D665E] dark:text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Visits</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Photos</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Past Visit</span>
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW 1: LIST OF PAST VISITS (#08)
          ══════════════════════════════════════════════════ */}
      {!activeVisit && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] overflow-hidden shadow-sm hover:border-[#C85D3A]/40 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] bg-black/10">
                <Image
                  src={visit.coverImageUrl}
                  alt={visit.title || visit.destination}
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase">
                    {visit.destination}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono text-[#F4A261] uppercase tracking-wider block font-bold">
                    {visit.date}
                  </span>
                  <h3 className="text-base font-bold font-serif line-clamp-1">
                    {visit.title || `${visit.destination} Visit`}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-[#E5DFD5] dark:border-[#262420] bg-[#FAF7F2]/50 dark:bg-[#11100E]/50">
                <span className="text-xs font-mono text-[#6D665E] dark:text-[#8C8479]">
                  {visit.photos.length} {visit.photos.length === 1 ? 'photo' : 'photos'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveVisit(visit)}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1C1916] hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                  >
                    Open Gallery
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteVisit(visit.id)}
                    className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10"
                    title="Delete Visit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2: PHOTO GALLERY FOR SELECTED VISIT (#09)
          ══════════════════════════════════════════════════ */}
      {activeVisit && (
        <div className="bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#174E48] text-white font-mono font-bold text-xs">
                  {activeVisit.destination}
                </span>
                <span className="text-xs font-mono font-bold text-[#8C8479]">
                  {activeVisit.date}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#171512] dark:text-white mt-1">
                {activeVisit.title || `${activeVisit.destination} Photo Gallery`}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {saveSuccess && (
                <span className="text-xs font-mono text-[#174E48] dark:text-[#D4A467] font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Gallery Saved</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveVisit}
                className="px-6 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Visit</span>
              </button>
            </div>
          </div>

          {/* Quick Edit Visit Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono bg-[#FAF7F2] dark:bg-[#1A1815] p-4 rounded-2xl border border-[#E5DFD5] dark:border-white/5">
            <div>
              <label className="text-[#8C8479] uppercase block mb-1 font-bold">Destination</label>
              <input
                type="text"
                value={activeVisit.destination}
                onChange={(e) => setActiveVisit({ ...activeVisit, destination: e.target.value })}
                className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1 font-bold">Trip Date / Period</label>
              <input
                type="text"
                value={activeVisit.date}
                onChange={(e) => setActiveVisit({ ...activeVisit, date: e.target.value })}
                placeholder="e.g. March 2026"
                className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="text-[#8C8479] uppercase block mb-1 font-bold">Short Title / Note</label>
              <input
                type="text"
                value={activeVisit.title || ''}
                onChange={(e) => setActiveVisit({ ...activeVisit, title: e.target.value })}
                placeholder="e.g. Spring Blooms in Srinagar"
                className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
              />
            </div>
          </div>

          {/* Photos Grid (#09) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#8C8479] font-bold">
                Photo Gallery ({activeVisit.photos.length} photos)
              </span>
              <span className="text-[11px] font-mono text-[#8C8479]">
                Click star to set Cover Photo · Use arrows to reorder
              </span>
            </div>

            {activeVisit.photos.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-[#E5DFD5] dark:border-[#262420] space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-[#C85D3A]" />
                <p className="text-xs text-[#8C8479]">No photos in this past trip gallery yet.</p>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#C85D3A] text-white text-xs font-bold font-mono"
                >
                  + Add Photos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {activeVisit.photos.map((photoUrl, idx) => {
                  const isCover = activeVisit.coverImageUrl === photoUrl;

                  return (
                    <div
                      key={idx}
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 border group transition-all ${
                        isCover
                          ? 'ring-3 ring-[#C85D3A] border-[#C85D3A]'
                          : 'border-black/5 dark:border-white/10'
                      }`}
                    >
                      <Image
                        src={photoUrl}
                        alt={`Photo ${idx + 1}`}
                        fill
                        sizes="250px"
                        className="object-cover"
                      />

                      {/* Cover Badge */}
                      {isCover && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#C85D3A] text-white text-[9px] font-mono font-bold uppercase shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Cover Photo</span>
                        </div>
                      )}

                      {/* Photo Actions Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        {/* Top action: Set as Cover */}
                        <div className="flex justify-end">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverPhoto(photoUrl)}
                              className="px-2 py-1 rounded-lg bg-white text-[#171512] hover:bg-[#C85D3A] hover:text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md transition-colors"
                              title="Set as Cover Photo"
                            >
                              <Star className="w-3 h-3" />
                              <span>Set Cover</span>
                            </button>
                          )}
                        </div>

                        {/* Bottom actions: Reorder left/right & delete */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePhoto(idx, 'left')}
                              className="p-1 rounded-lg bg-white/80 text-[#171512] hover:bg-white disabled:opacity-40"
                              title="Move Left"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === activeVisit.photos.length - 1}
                              onClick={() => handleMovePhoto(idx, 'right')}
                              className="p-1 rounded-lg bg-white/80 text-[#171512] hover:bg-white disabled:opacity-40"
                              title="Move Right"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(photoUrl)}
                            className="p-1 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Create New Past Visit Album */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <form
            onSubmit={handleCreateVisit}
            className="bg-white dark:bg-[#14120F] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5DFD5] dark:border-[#262420] shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
              <h3 className="text-lg font-bold text-[#171512] dark:text-white">
                Add Past Visit Gallery
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-[#8C8479] hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Destination Name
                </label>
                <input
                  type="text"
                  required
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="e.g. Kashmir, Kerala, Rajasthan"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Date / Month & Year
                </label>
                <input
                  type="text"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. March 2026"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                  Album Title (Optional)
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Spring Blooms in Srinagar"
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#6D665E] dark:text-[#8C8479]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-md shadow-[#C85D3A]/25"
              >
                Create Visit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media Picker for Adding Photos */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={handleAddPhotos}
        categoryFilter="Past Trip"
        title="Add Photos to Past Visit Gallery"
      />
    </div>
  );
}
