'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { initialTrips, SeedTrip, SeedItineraryDay } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  MapPin,
  Clock,
  IndianRupee,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Upload,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle2,
  Search,
} from 'lucide-react';

function AdminTripsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab');

  const [trips, setTrips] = useState<SeedTrip[]>(initialTrips);
  const [activeTrip, setActiveTrip] = useState<SeedTrip | null>(null);
  const [editorSection, setEditorSection] = useState<'details' | 'photos' | 'itinerary'>('details');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick inline price editing state
  const [quickPriceTripSlug, setQuickPriceTripSlug] = useState<string | null>(null);
  const [quickPriceValue, setQuickPriceValue] = useState<number>(0);
  const [quickPriceIsOnRequest, setQuickPriceIsOnRequest] = useState<boolean>(false);

  // Media Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<
    | { type: 'cover' }
    | { type: 'gallery' }
    | { type: 'itinerary'; dayIndex: number; imageIndex?: number; isAdd?: boolean }
  >({ type: 'cover' });

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tripkario_admin_trips');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTrips(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read admin trips from local storage:', e);
    }
  }, []);

  // If URL has ?tab=itineraries, default editor to itinerary when a trip is selected
  useEffect(() => {
    if (initialTab === 'itineraries') {
      setEditorSection('itinerary');
    }
  }, [initialTab]);

  const handleCreateNewTrip = () => {
    if (isDirty) {
      if (!confirm('You have unsaved changes. Leave without saving?')) {
        return;
      }
    }
    const newTrip: SeedTrip = {
      slug: `trip-${Date.now()}`,
      destinationName: 'Kashmir',
      title: 'New Curated Journey',
      overview: 'A handpicked holiday experience planned around slow mornings and verified boutique stays.',
      coverImageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1600&auto=format&fit=crop',
      durationNights: 5,
      durationDays: 6,
      pricePerPerson: 24999,
      isPriceOnRequest: false,
      status: 'published',
      highlights: ['Private sanitized car', 'Boutique stays', 'Scenic drives'],
      inclusions: ['Chauffeur transport', 'Breakfast & Dinner', 'Entry permits'],
      exclusions: ['Flights', 'Personal expenses'],
      galleryUrls: [
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=800&auto=format&fit=crop',
      ],
      itineraryDays: [
        {
          dayNumber: 1,
          title: 'Arrival & Welcome Stays',
          location: 'Srinagar',
          description: 'Airport pickup, check-in to boutique verified accommodations, and relaxed evening shikara ride.',
          images: ['https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=800&auto=format&fit=crop'],
        },
        {
          dayNumber: 2,
          title: 'Scenic Mountain Exploration',
          location: 'Gulmarg',
          description: 'High-altitude scenic drive through pine glades with gondola pass access and meadow tea stops.',
          images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=800&auto=format&fit=crop'],
        },
      ],
    };
    setActiveTrip(newTrip);
    setIsDirty(true);
    setEditorSection('details');
  };

  const handleBackToList = () => {
    if (isDirty) {
      if (!confirm('You have unsaved changes. Leave without saving?')) {
        return;
      }
    }
    setIsDirty(false);
    setActiveTrip(null);
  };

  const handleSaveTrip = async () => {
    if (!activeTrip) return;
    const updated = trips.some((t) => t.slug === activeTrip.slug)
      ? trips.map((t) => (t.slug === activeTrip.slug ? activeTrip : t))
      : [activeTrip, ...trips];

    setTrips(updated);

    try {
      localStorage.setItem('tripkario_admin_trips', JSON.stringify(updated));
      await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/itineraries' }),
      }).catch(() => {});
    } catch (e) {
      console.warn('Could not persist trips to local storage or trigger revalidation:', e);
    }

    setIsDirty(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTrip(null);
    }, 1000);
  };

  const handleDeleteTrip = (slug: string) => {
    if (confirm('Are you sure you want to delete this trip package?')) {
      const updated = trips.filter((t) => t.slug !== slug);
      setTrips(updated);
      try {
        localStorage.setItem('tripkario_admin_trips', JSON.stringify(updated));
      } catch (e) {}
      if (activeTrip?.slug === slug) {
        setIsDirty(false);
        setActiveTrip(null);
      }
    }
  };

  const handleSaveQuickPrice = (slug: string) => {
    const updated = trips.map((t) =>
      t.slug === slug
        ? {
            ...t,
            pricePerPerson: quickPriceIsOnRequest ? 0 : quickPriceValue,
            isPriceOnRequest: quickPriceIsOnRequest,
          }
        : t
    );
    setTrips(updated);
    try {
      localStorage.setItem('tripkario_admin_trips', JSON.stringify(updated));
    } catch (e) {}
    setQuickPriceTripSlug(null);
  };

  // Itinerary Day actions
  const handleAddDay = () => {
    if (!activeTrip) return;
    const currentDays = activeTrip.itineraryDays || [];
    const nextDayNum = currentDays.length + 1;
    const newDay: SeedItineraryDay = {
      dayNumber: nextDayNum,
      title: `Day ${nextDayNum} Discovery`,
      location: activeTrip.destinationName || 'Destination',
      description: 'Relaxed morning exploration with private chauffeur transfers and local discoveries.',
      images: [activeTrip.coverImageUrl],
    };
    setIsDirty(true);
    setActiveTrip({
      ...activeTrip,
      itineraryDays: [...currentDays, newDay],
    });
  };

  const handleRemoveDay = (dayIndex: number) => {
    if (!activeTrip) return;
    const updated = (activeTrip.itineraryDays || [])
      .filter((_, idx) => idx !== dayIndex)
      .map((day, idx) => ({ ...day, dayNumber: idx + 1 }));
    setIsDirty(true);
    setActiveTrip({ ...activeTrip, itineraryDays: updated });
  };

  const handleMoveDay = (dayIndex: number, direction: 'up' | 'down') => {
    if (!activeTrip || !activeTrip.itineraryDays) return;
    const days = [...activeTrip.itineraryDays];
    const targetIdx = direction === 'up' ? dayIndex - 1 : dayIndex + 1;
    if (targetIdx < 0 || targetIdx >= days.length) return;

    const temp = days[dayIndex];
    days[dayIndex] = days[targetIdx];
    days[targetIdx] = temp;

    const reordered = days.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    setIsDirty(true);
    setActiveTrip({ ...activeTrip, itineraryDays: reordered });
  };

  // Media selection handler
  const handleMediaSelected = (url: string) => {
    if (!activeTrip) return;
    setIsDirty(true);

    if (mediaTarget.type === 'cover') {
      setActiveTrip({ ...activeTrip, coverImageUrl: url });
    } else if (mediaTarget.type === 'gallery') {
      const currentGallery = activeTrip.galleryUrls || [];
      setActiveTrip({ ...activeTrip, galleryUrls: [...currentGallery, url] });
    } else if (mediaTarget.type === 'itinerary') {
      const { dayIndex, imageIndex, isAdd } = mediaTarget;
      const days = [...(activeTrip.itineraryDays || [])];
      if (!days[dayIndex]) return;

      const currentImages = [...(days[dayIndex].images || [])];
      if (isAdd) {
        currentImages.push(url);
      } else if (typeof imageIndex === 'number') {
        currentImages[imageIndex] = url;
      } else {
        currentImages[0] = url;
      }
      days[dayIndex].images = currentImages;
      setActiveTrip({ ...activeTrip, itineraryDays: days });
    }
  };

  const handleRemoveItineraryImage = (dayIndex: number, imageIndex: number) => {
    if (!activeTrip || !activeTrip.itineraryDays) return;
    setIsDirty(true);
    const days = [...activeTrip.itineraryDays];
    const images = (days[dayIndex].images || []).filter((_, idx) => idx !== imageIndex);
    days[dayIndex].images = images;
    setActiveTrip({ ...activeTrip, itineraryDays: days });
  };

  // Filtered trips for admin search
  const filteredTrips = trips.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.destinationName.toLowerCase().includes(q) ||
      (t.route && t.route.toLowerCase().includes(q)) ||
      t.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            TRIPS & ITINERARIES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            {activeTrip ? `Editing: ${activeTrip.title}` : `Trip Management (${trips.length} Packages)`}
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            {activeTrip
              ? 'Update price, trip overview, photos, and day-by-day itinerary images.'
              : 'Easily update prices, trip details, and itinerary photos.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTrip ? (
            <button
              type="button"
              onClick={handleBackToList}
              className="px-4 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold uppercase text-[#6D665E] dark:text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Trip List</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreateNewTrip}
              className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Trip</span>
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW 1: SIMPLE TRIP LIST
          ══════════════════════════════════════════════════ */}
      {!activeTrip && (
        <div className="space-y-4">
          {/* Quick Search in Admin */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 86 trips by title, destination, or route..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono text-[#171512] dark:text-white placeholder-[#8C8479] outline-none focus:border-[#C85D3A]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredTrips.map((trip) => {
              const isEditingPrice = quickPriceTripSlug === trip.slug;
              const priceDisplay = trip.isPriceOnRequest || !trip.pricePerPerson || trip.pricePerPerson <= 0
                ? 'Price on request'
                : `₹${trip.pricePerPerson.toLocaleString('en-IN')}`;

              return (
                <div
                  key={trip.slug}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] shadow-sm hover:border-[#C85D3A]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left: Thumbnail + Title + Duration */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/10 shrink-0 border border-black/5 dark:border-white/10">
                      <Image
                        src={trip.coverImageUrl}
                        alt={trip.title}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#C85D3A] uppercase font-bold tracking-wider">
                          {trip.destinationName}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                            trip.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                              : trip.status === 'draft'
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                              : 'bg-stone-500/10 text-stone-600 border-stone-500/20'
                          }`}
                        >
                          {trip.status === 'published' ? 'Published' : trip.status === 'draft' ? 'Draft' : 'Archived'}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-[#171512] dark:text-white truncate">
                        {trip.title}
                      </h2>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#6D665E] dark:text-[#8C8479]">
                        <span>{trip.durationNights} Nights · {trip.durationDays} Days</span>
                        <span>•</span>
                        <span>{trip.itineraryDays?.length || 0} Itinerary Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Simple Price Display & Action Buttons */}
                  <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center shrink-0">
                    {/* Price Section */}
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#8C8479] uppercase block font-semibold">
                        Starting Price
                      </span>

                      {isEditingPrice ? (
                        <div className="flex flex-col items-end gap-1.5 mt-0.5">
                          <div className="flex items-center gap-1.5">
                            <label className="flex items-center gap-1 text-[10px] font-mono text-[#8C8479] cursor-pointer mr-1">
                              <input
                                type="checkbox"
                                checked={quickPriceIsOnRequest}
                                onChange={(e) => setQuickPriceIsOnRequest(e.target.checked)}
                                className="w-3.5 h-3.5 rounded text-[#C85D3A]"
                              />
                              <span>On request</span>
                            </label>

                            {!quickPriceIsOnRequest && (
                              <>
                                <span className="text-sm font-bold font-mono text-[#171512] dark:text-white">₹</span>
                                <input
                                  type="number"
                                  autoFocus
                                  value={quickPriceValue}
                                  onChange={(e) => setQuickPriceValue(Number(e.target.value))}
                                  className="w-24 p-1 text-sm font-bold font-mono rounded-lg border border-[#C85D3A] bg-white dark:bg-[#1C1916] text-[#171512] dark:text-white outline-none"
                                />
                              </>
                            )}
                            <button
                              type="button"
                              onClick={() => handleSaveQuickPrice(trip.slug)}
                              className="p-1.5 rounded-lg bg-[#174E48] text-white hover:bg-[#143E3A]"
                              title="Save Price"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setQuickPriceTripSlug(null)}
                              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 text-[#8C8479]"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-bold font-mono text-[#174E48] dark:text-[#D4A467]">
                            {priceDisplay}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setQuickPriceTripSlug(trip.slug);
                              setQuickPriceValue(trip.pricePerPerson || 0);
                              setQuickPriceIsOnRequest(trip.isPriceOnRequest || false);
                            }}
                            className="text-[10px] font-mono text-[#C85D3A] hover:underline font-bold"
                            title="Quick Edit Price"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTrip(trip);
                          setIsDirty(false);
                          setEditorSection('details');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        Edit Trip
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTrip(trip.slug)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2: EDIT TRIP
          ══════════════════════════════════════════════════ */}
      {activeTrip && (
        <div className="bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] shadow-xl overflow-hidden space-y-6">
          {/* Section Navigation Tabs & Save Button */}
          <div className="p-4 sm:p-6 border-b border-[#E5DFD5] dark:border-[#262420] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F2] dark:bg-[#11100E]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'details', label: '1. Basic Details & Price' },
                { id: 'photos', label: '2. Photos & Gallery' },
                { id: 'itinerary', label: `3. Itinerary & Images (${activeTrip.itineraryDays?.length || 0} Days)` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditorSection(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    editorSection === tab.id
                      ? 'bg-[#174E48] text-white shadow-sm'
                      : 'bg-white dark:bg-[#1C1916] text-[#6D665E] dark:text-[#B8B0A4] border border-[#E5DFD5] dark:border-[#262420]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {saveSuccess && (
                <span className="text-xs font-mono text-[#174E48] dark:text-[#D4A467] font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Changes Saved!</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveTrip}
                className="px-6 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* SECTION 1: BASIC DETAILS & PRICE */}
            {editorSection === 'details' && (
              <div className="max-w-2xl space-y-6 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">Trip Name</label>
                  <input
                    type="text"
                    value={activeTrip.title}
                    onChange={(e) => {
                      setIsDirty(true);
                      setActiveTrip({ ...activeTrip, title: e.target.value });
                    }}
                    placeholder="e.g. The Great Kashmir Escape"
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-sm outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">Destination</label>
                    <input
                      type="text"
                      value={activeTrip.destinationName}
                      onChange={(e) => {
                        setIsDirty(true);
                        setActiveTrip({ ...activeTrip, destinationName: e.target.value });
                      }}
                      placeholder="e.g. Kashmir, Kerala, Rajasthan"
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">Publication Status</label>
                    <select
                      value={activeTrip.status}
                      onChange={(e) => {
                        setIsDirty(true);
                        setActiveTrip({ ...activeTrip, status: e.target.value as any });
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs outline-none font-mono"
                    >
                      <option value="published">Published (Visible on website)</option>
                      <option value="draft">Draft (Hidden from public)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* PRICING CONTROL WITH PRICE ON REQUEST TOGGLE */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[#8C8479] uppercase font-bold text-xs">Pricing Setup</label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                      <input
                        type="checkbox"
                        checked={activeTrip.isPriceOnRequest || false}
                        onChange={(e) => {
                          setIsDirty(true);
                          setActiveTrip({
                            ...activeTrip,
                            isPriceOnRequest: e.target.checked,
                            pricePerPerson: e.target.checked ? 0 : (activeTrip.pricePerPerson || 15000),
                          });
                        }}
                        className="w-4 h-4 rounded text-[#C85D3A] focus:ring-[#C85D3A]"
                      />
                      <span className="font-bold text-[#171512] dark:text-white">Price on request</span>
                    </label>
                  </div>

                  {activeTrip.isPriceOnRequest ? (
                    <div className="p-3 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-xs font-mono text-[#8C8479]">
                      ✓ This package is configured as <strong className="text-[#171512] dark:text-white">Price on request</strong>. No fixed amount will be displayed to travelers.
                    </div>
                  ) : (
                    <div>
                      <label className="text-[#8C8479] uppercase block mb-1 font-bold">
                        Starting Price per person (₹ INR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-[#8C8479] font-bold">₹</span>
                        <input
                          type="number"
                          value={activeTrip.pricePerPerson}
                          onChange={(e) => {
                            setIsDirty(true);
                            setActiveTrip({ ...activeTrip, pricePerPerson: Number(e.target.value) });
                          }}
                          placeholder="24999"
                          className="w-full p-2.5 pl-8 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-mono text-sm font-bold outline-none focus:border-[#C85D3A]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">Duration (Nights)</label>
                    <input
                      type="number"
                      value={activeTrip.durationNights}
                      onChange={(e) => {
                        setIsDirty(true);
                        setActiveTrip({ ...activeTrip, durationNights: Number(e.target.value) });
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1 font-bold">Duration (Days)</label>
                    <input
                      type="number"
                      value={activeTrip.durationDays}
                      onChange={(e) => {
                        setIsDirty(true);
                        setActiveTrip({ ...activeTrip, durationDays: Number(e.target.value) });
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs outline-none focus:border-[#C85D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1 font-bold">Short Description / Overview</label>
                  <textarea
                    rows={3}
                    value={activeTrip.overview}
                    onChange={(e) => {
                      setIsDirty(true);
                      setActiveTrip({ ...activeTrip, overview: e.target.value });
                    }}
                    placeholder="Short summary of the holiday experience..."
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed outline-none focus:border-[#C85D3A]"
                  />
                </div>
              </div>
            )}

            {/* SECTION 2: PHOTOS */}
            {editorSection === 'photos' && (
              <div className="space-y-8 max-w-3xl">
                {/* Cover Photo */}
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-[#8C8479] font-bold block">
                    Cover Photo
                  </span>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="relative w-full sm:w-72 aspect-[16/10] rounded-2xl overflow-hidden bg-black/10 border border-black/5 dark:border-white/10">
                      <Image
                        src={activeTrip.coverImageUrl}
                        alt={activeTrip.title}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMediaTarget({ type: 'cover' });
                          setIsMediaPickerOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#C85D3A] hover:bg-[#FAF7F2]/80 flex items-center gap-2 cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Change Cover Photo</span>
                      </button>
                      <p className="text-[11px] font-mono text-[#8C8479]">
                        Select or upload a high-resolution photo for the main card and hero.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trip Gallery */}
                <div className="space-y-3 pt-6 border-t border-[#E5DFD5] dark:border-[#262420]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#8C8479] font-bold block">
                        Trip Gallery ({activeTrip.galleryUrls?.length || 0} photos)
                      </span>
                      <p className="text-[11px] font-mono text-[#8C8479]">
                        Additional photos displayed in the trip package view
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget({ type: 'gallery' });
                        setIsMediaPickerOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {activeTrip.galleryUrls?.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 border border-black/5 dark:border-white/10 group"
                      >
                        <Image src={url} alt={`Gallery ${idx}`} fill sizes="200px" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = activeTrip.galleryUrls?.filter((_, i) => i !== idx);
                            setIsDirty(true);
                            setActiveTrip({ ...activeTrip, galleryUrls: updated });
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: ITINERARY & ITINERARY IMAGES */}
            {editorSection === 'itinerary' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                  <div>
                    <h2 className="text-base font-bold text-[#171512] dark:text-white">
                      Day-by-Day Itinerary ({activeTrip.itineraryDays?.length || 0} Days)
                    </h2>
                    <p className="text-xs text-[#6D665E] dark:text-[#8C8479]">
                      Manage each day&apos;s title, destination location, narrative, and attached photos.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddDay}
                    className="px-4 py-2 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Day {(activeTrip.itineraryDays?.length || 0) + 1}</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {activeTrip.itineraryDays?.map((day, dayIdx) => (
                    <div
                      key={day.dayNumber || dayIdx}
                      className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] dark:bg-[#1A1815] border border-[#E5DFD5] dark:border-[#262420] space-y-4"
                    >
                      {/* Top Bar for Day */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-3 py-1 rounded-xl bg-[#174E48] text-white font-mono font-bold text-xs">
                            DAY {String(day.dayNumber).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-bold text-[#171512] dark:text-white">
                            {day.title || `Day ${day.dayNumber}`}
                          </span>
                        </div>

                        {/* Reorder and Delete Day buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={dayIdx === 0}
                            onClick={() => handleMoveDay(dayIdx, 'up')}
                            className="p-1.5 rounded-lg text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30"
                            title="Move Day Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={dayIdx === (activeTrip.itineraryDays?.length || 0) - 1}
                            onClick={() => handleMoveDay(dayIdx, 'down')}
                            className="p-1.5 rounded-lg text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30"
                            title="Move Day Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(dayIdx)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 ml-2"
                            title="Remove Day"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day Details Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <label className="text-[#8C8479] uppercase block mb-1">Day Title</label>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => {
                              setIsDirty(true);
                              const updated = [...(activeTrip.itineraryDays || [])];
                              updated[dayIdx].title = e.target.value;
                              setActiveTrip({ ...activeTrip, itineraryDays: updated });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[#8C8479] uppercase block mb-1">Location</label>
                          <input
                            type="text"
                            value={day.location}
                            onChange={(e) => {
                              setIsDirty(true);
                              const updated = [...(activeTrip.itineraryDays || [])];
                              updated[dayIdx].location = e.target.value;
                              setActiveTrip({ ...activeTrip, itineraryDays: updated });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="text-xs font-mono">
                        <label className="text-[#8C8479] uppercase block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={day.description}
                          onChange={(e) => {
                            setIsDirty(true);
                            const updated = [...(activeTrip.itineraryDays || [])];
                            updated[dayIdx].description = e.target.value;
                            setActiveTrip({ ...activeTrip, itineraryDays: updated });
                          }}
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                        />
                      </div>

                      {/* Day Photos Grid */}
                      <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase text-[#8C8479] font-bold">
                            Itinerary Photos ({day.images?.length || 0})
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setMediaTarget({ type: 'itinerary', dayIndex: dayIdx, isAdd: true });
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-[11px] font-mono font-bold text-[#C85D3A] hover:bg-[#C85D3A] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>+ Add Photo</span>
                          </button>
                        </div>

                        {(!day.images || day.images.length === 0) ? (
                          <div className="p-4 rounded-xl border border-dashed border-[#E5DFD5] dark:border-[#262420] text-center text-[11px] font-mono text-[#8C8479]">
                            No photos added for this day yet.{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setMediaTarget({ type: 'itinerary', dayIndex: dayIdx, isAdd: true });
                                setIsMediaPickerOpen(true);
                              }}
                              className="text-[#C85D3A] font-bold underline ml-1"
                            >
                              Add photo
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                            {day.images.map((imgUrl, imgIdx) => (
                              <div
                                key={imgIdx}
                                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/10 border border-black/5 dark:border-white/10 group"
                              >
                                <Image
                                  src={imgUrl}
                                  alt={`Day ${day.dayNumber} Photo ${imgIdx + 1}`}
                                  fill
                                  sizes="120px"
                                  className="object-cover"
                                />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMediaTarget({
                                        type: 'itinerary',
                                        dayIndex: dayIdx,
                                        imageIndex: imgIdx,
                                      });
                                      setIsMediaPickerOpen(true);
                                    }}
                                    className="p-1 rounded-md bg-white text-[#171512] hover:bg-[#C85D3A] hover:text-white transition-colors"
                                    title="Change Photo"
                                  >
                                    <ImageIcon className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItineraryImage(dayIdx, imgIdx)}
                                    className="p-1 rounded-md bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                    title="Remove Photo"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Save Bar */}
          <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between bg-[#FAF7F2] dark:bg-[#11100E]">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-[#8C8479] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveTrip}
              className="px-8 py-3 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Reusable Media Picker */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={handleMediaSelected}
        categoryFilter="Trip"
        title="Select Photograph"
      />
    </div>
  );
}

export default function AdminTripsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs font-mono text-[#8C8479]">Loading trips...</div>}>
      <AdminTripsContent />
    </Suspense>
  );
}
