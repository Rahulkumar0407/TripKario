'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialTrips, SeedTrip } from '@/lib/admin/seedData';
import MediaPickerModal from '@/components/admin/MediaPickerModal';
import {
  Plus,
  Eye,
  Trash2,
  Check,
  X,
  MapPin,
  Clock,
  IndianRupee,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  Edit2,
  Upload,
} from 'lucide-react';

interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  description: string;
  imageUrl?: string;
  activities: string[];
}

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<SeedTrip[]>(initialTrips);
  const [activeTrip, setActiveTrip] = useState<SeedTrip | null>(null);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<'cover' | 'gallery' | number>('cover');

  // Itinerary state for current trip
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    {
      dayNumber: 1,
      title: 'Arrival & Dal Lake Houseboat Check-in',
      location: 'Srinagar',
      description: 'Chauffeur pickup at Srinagar airport. Sunset shikara ride along the serene lotus waters of Dal Lake.',
      imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=800&auto=format&fit=crop',
      activities: ['Airport Meet & Greet', 'Boutique Houseboat Check-in', 'Sunset Shikara'],
    },
    {
      dayNumber: 2,
      title: 'Meadow of Flowers & Gondola Ride',
      location: 'Gulmarg',
      description: 'Scenic high-altitude drive through pine forests. Phase 1 & 2 Gondola ride overlooking snow-capped Apharwat Peak.',
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=800&auto=format&fit=crop',
      activities: ['Gondola Phase 2 Pass', 'Pine Forest Chai Break', 'Evening Return to Srinagar'],
    },
  ]);

  const handleAddNewTrip = () => {
    const newTrip: SeedTrip = {
      slug: `trip-${Date.now()}`,
      destinationName: 'Kashmir',
      title: 'New Curated Journey',
      overview: 'A handpicked holiday experience planned around slow mornings and verified boutique stays.',
      coverImageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1600&auto=format&fit=crop',
      durationNights: 5,
      durationDays: 6,
      pricePerPerson: 29999,
      status: 'draft',
      highlights: ['Private chauffeur for all transfers', 'Boutique heritage stays', 'Curated slow-paced route'],
      inclusions: ['Private sanitized vehicle', 'Daily breakfast & dinner', 'Entry tickets & passes'],
      exclusions: ['Flight tickets', 'Personal expenses', 'Emergency travel insurance'],
      galleryUrls: [
        'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=800&auto=format&fit=crop',
      ],
    };
    setActiveTrip(newTrip);
    setWizardStep(1);
  };

  const handleSaveAndClose = (status: 'published' | 'draft') => {
    if (!activeTrip) return;
    const finalTrip: SeedTrip = { ...activeTrip, status };
    setTrips((prev) => {
      const exists = prev.some((t) => t.slug === finalTrip.slug);
      if (exists) {
        return prev.map((t) => (t.slug === finalTrip.slug ? finalTrip : t));
      }
      return [finalTrip, ...prev];
    });
    setActiveTrip(null);
  };

  const handleDeleteTrip = (slug: string) => {
    setTrips((prev) => prev.filter((t) => t.slug !== slug));
    if (activeTrip?.slug === slug) setActiveTrip(null);
  };

  const handleAddItineraryDay = () => {
    const nextDay: ItineraryDay = {
      dayNumber: itineraryDays.length + 1,
      title: `Day ${itineraryDays.length + 1} Scenic Route`,
      location: activeTrip?.destinationName || 'Destination',
      description: 'Relaxed morning exploration with private chauffeur transfers and local discoveries.',
      activities: ['Guided walking tour', 'Scenic photo stops'],
    };
    setItineraryDays([...itineraryDays, nextDay]);
  };

  const handleMediaSelected = (url: string) => {
    if (!activeTrip) return;

    if (mediaTarget === 'cover') {
      setActiveTrip({ ...activeTrip, coverImageUrl: url });
    } else if (mediaTarget === 'gallery') {
      const currentGallery = activeTrip.galleryUrls || [];
      setActiveTrip({ ...activeTrip, galleryUrls: [...currentGallery, url] });
    } else if (typeof mediaTarget === 'number') {
      const dayIdx = mediaTarget;
      setItineraryDays((prev) =>
        prev.map((d, i) => (i === dayIdx ? { ...d, imageUrl: url } : d))
      );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD5] dark:border-[#262420]">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C85D3A] dark:text-[#E06A42] font-semibold">
            CURATED TRIPS & ITINERARIES
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171512] dark:text-white tracking-tight mt-0.5">
            Trip Package Editor ({trips.length} packages)
          </h1>
          <p className="text-xs sm:text-sm text-[#6D665E] dark:text-[#B8B0A4] font-normal">
            Manage handpicked travel circuits, day-by-day itineraries, inclusions, and photo galleries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddNewTrip}
            className="px-5 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-2 shadow-md shadow-[#C85D3A]/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Trip (Wizard)</span>
          </button>
        </div>
      </div>

      {/* Trips Grid View */}
      {!activeTrip && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {trips.map((trip) => (
            <div
              key={trip.slug}
              className="rounded-3xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#E8DED0] dark:bg-[#1A1815]">
                <Image
                  src={trip.coverImageUrl}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase">
                  {trip.destinationName}
                </span>

                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                    trip.status === 'published' ? 'bg-[#174E48] text-white' : 'bg-black/60 text-white/70'
                  }`}
                >
                  {trip.status}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono text-[#F4A261] uppercase tracking-wider block">
                    {trip.durationNights}N / {trip.durationDays}D
                  </span>
                  <h3 className="text-xl font-bold font-serif line-clamp-1">{trip.title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] line-clamp-2 leading-relaxed">
                  {trip.overview}
                </p>

                <div className="pt-3 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C8479] uppercase block">Price per person</span>
                    <span className="text-sm font-bold text-[#174E48] dark:text-[#D4A467] font-mono">
                      ₹{trip.pricePerPerson.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTrip(trip);
                        setWizardStep(1);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-white/5 hover:bg-[#C85D3A] hover:text-white text-[#171512] dark:text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors"
                    >
                      Edit Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTrip(trip.slug)}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-500/10"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          TRIP WIZARD (#15)
          ══════════════════════════════════════════════════ */}
      {activeTrip && (
        <div className="bg-white dark:bg-[#14120F] rounded-3xl border border-[#E5DFD5] dark:border-[#262420] shadow-xl overflow-hidden animate-in fade-in duration-200">
          {/* Wizard Header Bar */}
          <div className="p-6 border-b border-[#E5DFD5] dark:border-[#262420] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FAF7F2] dark:bg-[#11100E]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C85D3A] font-bold">
                TRIP BUILDER WIZARD
              </span>
              <h2 className="text-xl font-bold text-[#171512] dark:text-white">
                {activeTrip.title}
              </h2>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { step: 1, label: '1. Basic Details' },
                { step: 2, label: '2. Photos' },
                { step: 3, label: '3. Itinerary' },
                { step: 4, label: '4. Inclusions' },
                { step: 5, label: '5. Preview & Publish' },
              ].map((s) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setWizardStep(s.step)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors shrink-0 cursor-pointer ${
                    wizardStep === s.step
                      ? 'bg-[#174E48] text-white'
                      : 'bg-white dark:bg-[#1C1916] text-[#6D665E] dark:text-[#8C8479] border border-[#E5DFD5] dark:border-[#262420]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wizard Body */}
          <div className="p-6 sm:p-8 min-h-[420px]">
            {/* STEP 1: Basic Details */}
            {wizardStep === 1 && (
              <div className="max-w-2xl space-y-5 text-xs font-mono">
                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Trip Name</label>
                  <input
                    type="text"
                    value={activeTrip.title}
                    onChange={(e) => setActiveTrip({ ...activeTrip, title: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-base outline-none focus:border-[#C85D3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Destination Name</label>
                    <input
                      type="text"
                      value={activeTrip.destinationName}
                      onChange={(e) =>
                        setActiveTrip({ ...activeTrip, destinationName: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Price Per Person (₹)</label>
                    <input
                      type="number"
                      value={activeTrip.pricePerPerson}
                      onChange={(e) =>
                        setActiveTrip({ ...activeTrip, pricePerPerson: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Duration Nights</label>
                    <input
                      type="number"
                      value={activeTrip.durationNights}
                      onChange={(e) =>
                        setActiveTrip({ ...activeTrip, durationNights: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8C8479] uppercase block mb-1">Duration Days</label>
                    <input
                      type="number"
                      value={activeTrip.durationDays}
                      onChange={(e) =>
                        setActiveTrip({ ...activeTrip, durationDays: Number(e.target.value) })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white outline-none focus:border-[#C85D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8C8479] uppercase block mb-1">Overview / Short Story</label>
                  <textarea
                    rows={3}
                    value={activeTrip.overview}
                    onChange={(e) => setActiveTrip({ ...activeTrip, overview: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs outline-none focus:border-[#C85D3A]"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Photos (#16) */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono uppercase text-[#8C8479] block font-bold mb-2">
                    Cover Photograph
                  </label>
                  <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 group">
                    <Image
                      src={activeTrip.coverImageUrl}
                      alt={activeTrip.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setMediaTarget('cover');
                          setIsMediaPickerOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-[#171512] text-xs font-bold font-mono tracking-wider uppercase shadow-md cursor-pointer"
                      >
                        Choose from Library
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-mono uppercase text-[#8C8479] font-bold">
                      Trip Gallery ({activeTrip.galleryUrls?.length || 0} photos)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaTarget('gallery');
                        setIsMediaPickerOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold text-[#C85D3A] hover:bg-[#FAF7F2]/80 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Gallery Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeTrip.galleryUrls?.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DED0] dark:bg-[#1C1916] border border-black/5 dark:border-white/10 group"
                      >
                        <Image src={url} alt={`Gallery ${idx}`} fill sizes="200px" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = activeTrip.galleryUrls?.filter((_, i) => i !== idx);
                            setActiveTrip({ ...activeTrip, galleryUrls: updated });
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Itinerary Builder (#17) */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] dark:border-[#262420]">
                  <div>
                    <h3 className="text-base font-bold text-[#171512] dark:text-white">
                      Day-by-Day Itinerary ({itineraryDays.length} Days)
                    </h3>
                    <p className="text-xs text-[#6D665E] dark:text-[#8C8479]">
                      Add pacing, stays, chauffeur routes, and daily photographs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-4 py-2 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day {itineraryDays.length + 1}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {itineraryDays.map((day, idx) => (
                    <div
                      key={day.dayNumber}
                      className="p-5 rounded-3xl bg-[#FAF7F2] dark:bg-[#1A1815] border border-[#E5DFD5] dark:border-[#262420] flex flex-col sm:flex-row gap-5 items-start justify-between"
                    >
                      {/* Left Day Pill */}
                      <span className="w-12 h-12 rounded-2xl bg-[#174E48] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                        0{day.dayNumber}
                      </span>

                      {/* Middle Content Fields */}
                      <div className="space-y-3 flex-1 min-w-0 text-xs font-mono">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[#8C8479] uppercase block mb-1">Day Title</label>
                            <input
                              type="text"
                              value={day.title}
                              onChange={(e) => {
                                const updated = [...itineraryDays];
                                updated[idx].title = e.target.value;
                                setItineraryDays(updated);
                              }}
                              className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans font-bold text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[#8C8479] uppercase block mb-1">Location</label>
                            <input
                              type="text"
                              value={day.location}
                              onChange={(e) => {
                                const updated = [...itineraryDays];
                                updated[idx].location = e.target.value;
                                setItineraryDays(updated);
                              }}
                              className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[#8C8479] uppercase block mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={day.description}
                            onChange={(e) => {
                              const updated = [...itineraryDays];
                              updated[idx].description = e.target.value;
                              setItineraryDays(updated);
                            }}
                            className="w-full p-2 rounded-xl bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs"
                          />
                        </div>
                      </div>

                      {/* Right Photo Preview */}
                      <div className="w-full sm:w-28 space-y-1.5 shrink-0">
                        {day.imageUrl ? (
                          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                            <Image src={day.imageUrl} alt={day.title} fill sizes="120px" className="object-cover" />
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => {
                            setMediaTarget(idx);
                            setIsMediaPickerOpen(true);
                          }}
                          className="w-full py-1 rounded-lg bg-white dark:bg-[#14120F] border border-[#E5DFD5] dark:border-[#262420] text-[10px] font-mono font-bold text-[#C85D3A]"
                        >
                          {day.imageUrl ? 'Change Photo' : '+ Add Photo'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Inclusions & Highlights */}
            {wizardStep === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div className="space-y-3">
                  <label className="text-[#174E48] dark:text-[#D4A467] font-bold uppercase block">
                    What is Included
                  </label>
                  <textarea
                    rows={6}
                    value={activeTrip.inclusions?.join('\n')}
                    onChange={(e) =>
                      setActiveTrip({ ...activeTrip, inclusions: e.target.value.split('\n') })
                    }
                    placeholder="One item per line (e.g. Private chauffeur transfers)"
                    className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-red-500 font-bold uppercase block">
                    What is Not Included
                  </label>
                  <textarea
                    rows={6}
                    value={activeTrip.exclusions?.join('\n')}
                    onChange={(e) =>
                      setActiveTrip({ ...activeTrip, exclusions: e.target.value.split('\n') })
                    }
                    placeholder="One item per line (e.g. Flight tickets)"
                    className="w-full p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1916] border border-[#E5DFD5] dark:border-[#2C2824] text-[#171512] dark:text-white font-sans text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Preview & Publish */}
            {wizardStep === 5 && (
              <div className="space-y-6 max-w-2xl">
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
                  <Image
                    src={activeTrip.coverImageUrl}
                    alt={activeTrip.title}
                    fill
                    sizes="700px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-[11px] font-mono text-[#F4A261] uppercase tracking-widest font-bold">
                      {activeTrip.destinationName} · {activeTrip.durationNights}N / {activeTrip.durationDays}D
                    </span>
                    <h2 className="text-3xl font-serif">{activeTrip.title}</h2>
                    <span className="text-sm font-mono text-[#10B981] font-bold block pt-1">
                      ₹{activeTrip.pricePerPerson.toLocaleString('en-IN')} / person
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#6D665E] dark:text-[#B8B0A4] leading-relaxed">
                  {activeTrip.overview}
                </p>
              </div>
            )}
          </div>

          {/* Wizard Footer Navigation */}
          <div className="p-6 border-t border-[#E5DFD5] dark:border-[#262420] flex items-center justify-between bg-[#FAF7F2] dark:bg-[#11100E]">
            <div className="flex items-center gap-3">
              {wizardStep > 1 && (
                <button
                  type="button"
                  onClick={() => setWizardStep((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-[#E5DFD5] dark:border-[#262420] text-xs font-mono font-bold uppercase text-[#6D665E] dark:text-[#8C8479]"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveTrip(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-[#8C8479] hover:bg-black/5"
              >
                Close Editor
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSaveAndClose('draft')}
                className="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-mono font-bold uppercase text-[#171512] dark:text-white"
              >
                Save as Draft
              </button>

              {wizardStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setWizardStep((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-[#174E48] hover:bg-[#143E3A] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSaveAndClose('published')}
                  className="px-6 py-2.5 rounded-xl bg-[#C85D3A] hover:bg-[#B54F2E] text-white text-xs font-mono font-bold uppercase shadow-md shadow-[#C85D3A]/25 cursor-pointer"
                >
                  Publish Trip to Website
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={handleMediaSelected}
        categoryFilter="Trip"
        title="Select Photograph for Trip"
      />
    </div>
  );
}
