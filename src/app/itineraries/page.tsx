'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Compass,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import TripDetailModal from '@/components/TripDetailModal';
import ItineraryCard from '@/components/ItineraryCard';
import { tripPackages } from '@/data/trips';
import { TripPackage } from '@/types';

const BATCH_SIZE = 16;




function ItinerariesCatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial filter values from URL params
  const initialDest = searchParams.get('destination') || 'ALL';
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'ALL';

  // Development-only image audit mode (?imageAudit=1)
  const isDev = process.env.NODE_ENV === 'development';
  const isImageAuditParam = searchParams.get('imageAudit') === '1' || searchParams.get('imageAudit') === 'true';
  const isAuditMode = isDev && isImageAuditParam;

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDestination, setSelectedDestination] = useState<string>(initialDest);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDuration, setSelectedDuration] = useState<string>('ALL');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'RECOMMENDED' | 'PRICE_ASC' | 'PRICE_DESC' | 'DURATION_ASC' | 'DURATION_DESC' | 'ALPHA'>('RECOMMENDED');
  const [visibleCount, setVisibleCount] = useState<number>(isAuditMode ? tripPackages.length : BATCH_SIZE);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Auto-expand all packages when entering audit mode
  useEffect(() => {
    if (isAuditMode) {
      setVisibleCount(tripPackages.length);
    }
  }, [isAuditMode]);

  // Modal states
  const [selectedTripForDetail, setSelectedTripForDetail] = useState<TripPackage | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedTripForCustomPlan, setSelectedTripForCustomPlan] = useState<string | undefined>(undefined);

  // Sync state to URL for bookmarkable/refreshable filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDestination && selectedDestination !== 'ALL') {
      params.set('destination', selectedDestination);
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    if (selectedCategory && selectedCategory !== 'ALL') {
      params.set('category', selectedCategory);
    }
    if (isImageAuditParam) {
      params.set('imageAudit', '1');
    }
    const queryString = params.toString();
    const newUrl = queryString ? `/itineraries?${queryString}` : '/itineraries';
    window.history.replaceState(null, '', newUrl);
  }, [selectedDestination, searchQuery, selectedCategory, isImageAuditParam]);

  // Unique destinations present in actual data
  const dynamicDestinations = useMemo(() => {
    const counts = new Map<string, { name: string; count: number }>();
    tripPackages.forEach((t) => {
      const existing = counts.get(t.destinationId);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(t.destinationId, { name: t.destination, count: 1 });
      }
    });
    return Array.from(counts.entries()).map(([id, data]) => ({
      id,
      name: data.name,
      count: data.count,
    }));
  }, []);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    tripPackages.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  // Filter count indicator
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDestination !== 'ALL') count += 1;
    if (selectedCategory !== 'ALL') count += 1;
    if (selectedDuration !== 'ALL') count += 1;
    if (selectedPriceFilter !== 'ALL') count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [selectedDestination, selectedCategory, selectedDuration, selectedPriceFilter, searchQuery]);

  // Filtering & Sorting Logic
  const filteredTrips = useMemo(() => {
    return tripPackages
      .filter((trip) => {
        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = trip.title.toLowerCase().includes(q);
          const matchDest = trip.destination.toLowerCase().includes(q);
          const matchRoute = trip.route?.toLowerCase().includes(q) || false;
          const matchDesc = trip.shortDescription.toLowerCase().includes(q);
          const matchCategory = trip.category?.toLowerCase().includes(q) || false;
          const matchHighlights = trip.highlights?.some((h) => h.toLowerCase().includes(q)) || false;
          if (!matchTitle && !matchDest && !matchRoute && !matchDesc && !matchCategory && !matchHighlights) {
            return false;
          }
        }

        // Destination Filter
        if (selectedDestination !== 'ALL' && trip.destinationId !== selectedDestination) {
          return false;
        }

        // Category Filter
        if (selectedCategory !== 'ALL' && trip.category !== selectedCategory) {
          return false;
        }

        // Duration Filter
        if (selectedDuration === 'SHORT' && trip.durationDays > 4) return false;
        if (selectedDuration === 'MEDIUM' && (trip.durationDays < 5 || trip.durationDays > 7)) return false;
        if (selectedDuration === 'LONG' && trip.durationDays < 8) return false;

        // Price Filter
        if (selectedPriceFilter === 'UNDER_10K') {
          if (trip.isPriceOnRequest || trip.pricePerPerson <= 0 || trip.pricePerPerson > 10000) return false;
        } else if (selectedPriceFilter === '10K_TO_20K') {
          if (trip.isPriceOnRequest || trip.pricePerPerson < 10000 || trip.pricePerPerson > 20000) return false;
        } else if (selectedPriceFilter === '20K_PLUS') {
          if (trip.isPriceOnRequest || trip.pricePerPerson < 20000) return false;
        } else if (selectedPriceFilter === 'PRICE_ON_REQUEST') {
          if (!trip.isPriceOnRequest && trip.pricePerPerson > 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') {
          if (a.isPriceOnRequest && !b.isPriceOnRequest) return 1;
          if (!a.isPriceOnRequest && b.isPriceOnRequest) return -1;
          return a.pricePerPerson - b.pricePerPerson;
        }
        if (sortBy === 'PRICE_DESC') {
          if (a.isPriceOnRequest && !b.isPriceOnRequest) return 1;
          if (!a.isPriceOnRequest && b.isPriceOnRequest) return -1;
          return b.pricePerPerson - a.pricePerPerson;
        }
        if (sortBy === 'DURATION_ASC') {
          return a.durationDays - b.durationDays;
        }
        if (sortBy === 'DURATION_DESC') {
          return b.durationDays - a.durationDays;
        }
        if (sortBy === 'ALPHA') {
          return a.title.localeCompare(b.title);
        }
        // Recommended / Default
        return (b.featured ? 2 : 0) + (b.popular ? 1 : 0) - ((a.featured ? 2 : 0) + (a.popular ? 1 : 0)) || b.rating - a.rating;
      });
  }, [searchQuery, selectedDestination, selectedCategory, selectedDuration, selectedPriceFilter, sortBy]);

  const visibleTrips = useMemo(() => {
    return filteredTrips.slice(0, visibleCount);
  }, [filteredTrips, visibleCount]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('ALL');
    setSelectedCategory('ALL');
    setSelectedDuration('ALL');
    setSelectedPriceFilter('ALL');
    setSortBy('RECOMMENDED');
    setVisibleCount(BATCH_SIZE);
  };

  const handleOpenQuickView = useCallback((trip: TripPackage) => {
    setSelectedTripForDetail(trip);
  }, []);

  const handleOpenCustomPlan = useCallback((dest?: string) => {
    setSelectedTripForCustomPlan(dest);
    setIsPlanModalOpen(true);
  }, []);


  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative flex flex-col justify-between select-none">
      {/* Floating Glass Navigation */}
      <Navbar onOpenPlanTrip={() => handleOpenCustomPlan()} />

      <main className="pt-24 sm:pt-32 pb-24 md:pb-32 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-8 sm:space-y-12">
          {/* ── Editorial Archive Hero ──────────────────────────────────────── */}
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--accent)] shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>TripKario India Travel Archive</span>
              <span className="opacity-40">·</span>
              <span className="font-bold text-[var(--text-primary)]">
                {tripPackages.length} journeys · {dynamicDestinations.length} destinations
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[var(--text-primary)] leading-[1.02] tracking-tight">
              Find your next journey.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal max-w-2xl">
              Browse mountain trips, beach escapes, treks, road trips and more across India.
            </p>
          </div>

          {/* ── Dev Image Audit Mode Banner (Development Only) ──────────────── */}
          {isDev && (
            <div className={`p-4 sm:p-5 rounded-3xl border text-xs font-mono transition-all ${
              isAuditMode 
                ? 'bg-amber-950/30 border-amber-500/50 text-amber-200 shadow-lg' 
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`w-2.5 h-2.5 rounded-full ${isAuditMode ? 'bg-amber-400 animate-pulse' : 'bg-stone-500'}`} />
                  <span className="font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    {isAuditMode ? '🛠️ DEV IMAGE QA MODE ACTIVE (?imageAudit=1)' : '🛠️ MANUAL IMAGE QA TOOLS'}
                  </span>
                  <span className="opacity-40 hidden sm:inline">·</span>
                  <span>
                    {isAuditMode 
                      ? `All ${tripPackages.length} journeys expanded with ID, location metadata & provenance overlays`
                      : 'Enable dev overlay to inspect Trip ID, location metadata, and source provenance'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {isAuditMode ? (
                    <button
                      type="button"
                      onClick={() => {
                        const params = new URLSearchParams(window.location.search);
                        params.delete('imageAudit');
                        const qs = params.toString();
                        router.push(qs ? `/itineraries?${qs}` : '/itineraries');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono transition-all cursor-pointer"
                    >
                      Exit Audit Overlay
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const params = new URLSearchParams(window.location.search);
                        params.set('imageAudit', '1');
                        router.push(`/itineraries?${params.toString()}`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white text-xs font-mono font-medium transition-all cursor-pointer shadow-sm"
                    >
                      Enable ?imageAudit=1
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Search & Filter Command Panel ───────────────────────────────── */}
          <div className="bg-[var(--bg-surface)] p-4 sm:p-6 md:p-8 rounded-3xl border border-[var(--border-subtle)] shadow-sm space-y-6">
            {/* Search Input and Sort Selection */}
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-stretch md:items-center">
              {/* Primary Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(BATCH_SIZE);
                  }}
                  placeholder="Search by trip name, destination, route (e.g., Umling La, Chadar, Munnar, Kashmir)..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Controls Group: Sort & Mobile Filter Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mobile Filter Drawer Button */}
                <button
                  onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                  className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 flex-1 md:flex-initial">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider hidden sm:inline-block whitespace-nowrap">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort itineraries"
                    className="w-full md:w-auto px-4 py-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer transition-all"
                  >
                    <option value="RECOMMENDED">Recommended / Featured</option>
                    <option value="PRICE_ASC">Price: Low → High</option>
                    <option value="PRICE_DESC">Price: High → Low</option>
                    <option value="DURATION_ASC">Duration: Shortest First</option>
                    <option value="DURATION_DESC">Duration: Longest First</option>
                    <option value="ALPHA">A – Z Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── Dynamic Destination Shortcuts (Chips) ────────────────────── */}
            <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[var(--accent)]" />
                  Destinations:
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset all ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Scrollable Destination Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedDestination('ALL');
                    setVisibleCount(BATCH_SIZE);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedDestination === 'ALL'
                      ? 'bg-[var(--accent)] text-white font-medium shadow-sm'
                      : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  All ({tripPackages.length})
                </button>
                {dynamicDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => {
                      setSelectedDestination(dest.id);
                      setVisibleCount(BATCH_SIZE);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedDestination === dest.id
                        ? 'bg-[var(--accent)] text-white font-medium shadow-sm'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {dest.name} ({dest.count})
                  </button>
                ))}
              </div>
            </div>

            {/* ── Desktop & Expanded Filter Selectors ───────────────────────── */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono ${isFilterDrawerOpen ? 'block' : 'hidden md:grid'}`}>
              {/* Trip Style / Category */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-1.5 font-semibold">
                  Trip Style / Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setVisibleCount(BATCH_SIZE);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="ALL">All Trip Styles</option>
                  {categories.filter((c) => c !== 'ALL').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-1.5 font-semibold">
                  Duration:
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => {
                    setSelectedDuration(e.target.value);
                    setVisibleCount(BATCH_SIZE);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="ALL">All Durations</option>
                  <option value="SHORT">Short (1–4 Days)</option>
                  <option value="MEDIUM">Classic (5–7 Days)</option>
                  <option value="LONG">Extended (8+ Days)</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-1.5 font-semibold">
                  Budget / Pricing:
                </label>
                <select
                  value={selectedPriceFilter}
                  onChange={(e) => {
                    setSelectedPriceFilter(e.target.value);
                    setVisibleCount(BATCH_SIZE);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <option value="ALL">All Price Tiers</option>
                  <option value="UNDER_10K">Under ₹10,000</option>
                  <option value="10K_TO_20K">₹10,000 – ₹20,000</option>
                  <option value="20K_PLUS">₹20,000 & Above</option>
                  <option value="PRICE_ON_REQUEST">Price on Request</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Results Bar ─────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] px-1">
            <span>
              Showing <strong className="text-[var(--text-primary)]">{filteredTrips.length}</strong> of{' '}
              {tripPackages.length} curated domestic journeys
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-[var(--accent)] font-medium">
                Filtered by {activeFiltersCount} active criteria
              </span>
            )}
          </div>

          {/* ── Empty State ─────────────────────────────────────────────────── */}
          {filteredTrips.length === 0 && (
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-12 sm:p-16 text-center space-y-5 max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-medium text-[var(--text-primary)]">
                  No journeys match that search.
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  We could not find any itineraries matching your current filters. Try relaxing your filters or searching for another destination.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-medium hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear all filters</span>
              </button>
            </div>
          )}

          {/* ── Editorial Travel Cards Grid ─────────────────────────────────── */}
          {filteredTrips.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleTrips.map((trip, index) => (
                <ItineraryCard
                  key={trip.id}
                  trip={trip}
                  index={index}
                  isFirstHero={index === 0 && activeFiltersCount === 0}
                  isAuditMode={isAuditMode}
                  onSelect={handleOpenQuickView}
                />
              ))}
            </div>
          )}


          {/* ── Progressive Load More Bar ───────────────────────────────────── */}
          {visibleCount < filteredTrips.length && (
            <div className="text-center pt-8 space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
                  className="px-8 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-subtle)] text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-medium transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Load more journeys ({filteredTrips.length - visibleCount} remaining)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredTrips.length)}
                  className="px-6 py-3.5 rounded-full bg-[var(--bg-surface)] hover:border-[var(--accent)] text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all cursor-pointer"
                >
                  Show All ({filteredTrips.length})
                </button>
              </div>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">
                Showing {Math.min(visibleCount, filteredTrips.length)} of {filteredTrips.length} journeys
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge & WhatsApp */}
      <TravelChatbot />
      <WhatsAppButton />

      {/* ── Trip Detail Quick-View Modal ────────────────────────────────────── */}
      <TripDetailModal
        trip={selectedTripForDetail}
        onClose={() => setSelectedTripForDetail(null)}
        onPlanCustom={(title) => {
          setSelectedTripForDetail(null);
          handleOpenCustomPlan(title);
        }}
      />

      {/* ── Plan Custom Journey Modal ───────────────────────────────────────── */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialDestination={selectedTripForCustomPlan}
      />
    </div>
  );
}

export default function ItinerariesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-8 text-xs font-mono text-[var(--text-muted)]">
        Loading India Travel Archive...
      </div>
    }>
      <ItinerariesCatalogueContent />
    </Suspense>
  );
}
