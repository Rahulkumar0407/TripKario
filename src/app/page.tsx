'use client';

import React, { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TripCarousel from '@/components/TripCarousel';
import DestinationCarousel from '@/components/DestinationCarousel';
import IndiaJourneyShowcase from '@/components/IndiaJourneyShowcase';
import Testimonials from '@/components/Testimonials';
import WhyTripkario from '@/components/WhyTripkario';
import CustomJourney from '@/components/CustomJourney';
import FinalCinematicCTA from '@/components/FinalCinematicCTA';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import TripDetailModal from '@/components/TripDetailModal';
import { getHomepageData, HomepageData } from '@/lib/supabase/homepageData';
import { getTripForDestination } from '@/data/trips';
import { loadClientTripPackages, getCanonicalTripById, TripPackage } from '@/lib/trips';

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [preselectedDestination, setPreselectedDestination] = useState<string | undefined>(undefined);
  const [selectedTripForDetail, setSelectedTripForDetail] = useState<TripPackage | null>(null);
  const [, setTripUpdateKey] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTripUpdateKey((prev) => prev + 1);
      getHomepageData().then((res) => {
        setData(res);
      });
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('tripkario-trips-updated', handleUpdate);
    window.addEventListener('tripkario-settings-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('tripkario-trips-updated', handleUpdate);
      window.removeEventListener('tripkario-settings-updated', handleUpdate);
    };
  }, []);

  // Load published database data with instant static fallback
  useEffect(() => {
    getHomepageData().then((res) => {
      setData(res);
    });
  }, []);

  const handleOpenPlanTrip = (destination?: string) => {
    setPreselectedDestination(destination);
    setIsPlanModalOpen(true);
  };

  const handleOpenTripDetail = (tripOrDest: TripPackage | string) => {
    if (typeof tripOrDest === 'object' && tripOrDest !== null) {
      const canonical = getCanonicalTripById(tripOrDest.id) || tripOrDest;
      setSelectedTripForDetail(canonical);
    } else if (typeof tripOrDest === 'string') {
      const allTrips = loadClientTripPackages();
      const destLower = tripOrDest.toLowerCase().trim();
      const matched =
        allTrips.find(
          (t) =>
            t.destinationId.toLowerCase() === destLower ||
            t.destination.toLowerCase() === destLower ||
            t.destination.toLowerCase().includes(destLower)
        ) || getTripForDestination(tripOrDest);

      if (matched) {
        setSelectedTripForDetail(matched);
      } else {
        handleOpenPlanTrip(tripOrDest);
      }
    }
  };

  const handleScrollToJourneys = () => {
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFilter = (filters: {
    destination: string;
    travelStyle: string;
    duration: string;
    budget: string;
  }) => {
    if (filters.destination && filters.destination !== 'All') {
      handleOpenTripDetail(filters.destination);
    } else {
      handleScrollToJourneys();
    }
  };

  // Helper for section visibility controlled from Admin Homepage Manager
  const isSectionActive = (key: string) => {
    if (!data?.sections) return true;
    const sec = data.sections.find((s) => s.key === key);
    return sec ? sec.isActive : true;
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative">
      {/* Brand Opening Preloader */}
      <Preloader />

      {/* Floating Glass Navigation */}
      <Navbar onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 01. HERO: Dynamic Destination Showcase (Database-Driven) */}
      {isSectionActive('hero') && (
        <Hero
          slides={data?.heroSlides}
          signature={data?.settings}
          onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
          onExploreJourney={(dest) => handleOpenTripDetail(dest)}
          onSearch={handleSearchFilter}
        />
      )}

      {/* 02. CURATED TRIPS: Discovery & Focus States (Database-Driven) */}
      {isSectionActive('featured_trips') && (
        <TripCarousel
          trips={data?.trips}
          onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
        />
      )}

      {/* 03. DESTINATIONS: 3D Layered Depth (Database-Driven) */}
      {isSectionActive('destinations') && (
        <DestinationCarousel
          destinations={data?.destinations}
          onSelectDestination={(dest) => handleOpenTripDetail(dest)}
        />
      )}

      {/* 04. EDITORIAL SHOWCASE: KASHMIR → KANYAKUMARI (12 Curated Itineraries) */}
      <IndiaJourneyShowcase onSelectJourney={(dest) => handleOpenTripDetail(dest)} />

      {/* 05. TRAVELLER REVIEWS: Google Reviews Testimonials (Database-Driven) */}
      {isSectionActive('testimonials') && (
        <Testimonials testimonials={data?.testimonials} />
      )}

      {/* 06. PHILOSOPHY: You Enjoy the Trip. We Handle the Chaos. */}
      {isSectionActive('team') && <WhyTripkario />}

      {/* 07. BESPOKE CUSTOM TRIP: Your Route. Your Rules. */}
      {isSectionActive('custom_trip') && (
        <CustomJourney onOpenPlanTrip={() => handleOpenPlanTrip()} />
      )}

      {/* 08. FINAL DEPARTURE CTA: Ready to Go Somewhere? */}
      {isSectionActive('final_cta') && (
        <FinalCinematicCTA
          signature={data?.settings}
          onOpenPlanTrip={() => handleOpenPlanTrip()}
        />
      )}

      {/* 09. MINIMAL FOOTER */}
      <Footer />

      {/* Floating Concierge & Subtle WhatsApp */}
      <TravelChatbot />
      <WhatsAppButton />

      {/* Complete Canonical Trip Detail Modal */}
      <TripDetailModal
        trip={selectedTripForDetail}
        onClose={() => setSelectedTripForDetail(null)}
        onPlanCustom={(tripTitle) => {
          setSelectedTripForDetail(null);
          handleOpenPlanTrip(tripTitle);
        }}
      />

      {/* Plan Journey Modal */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialDestination={preselectedDestination}
      />
    </main>
  );
}
