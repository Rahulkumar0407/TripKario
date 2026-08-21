'use client';

import React, { useState, useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
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
import { getHomepageData, HomepageData } from '@/lib/supabase/homepageData';

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [preselectedDestination, setPreselectedDestination] = useState<string | undefined>(undefined);

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
      handleOpenPlanTrip(filters.destination);
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
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Brand Opening Preloader */}
      <Preloader />

      {/* Floating Glass Navigation */}
      <Navbar onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 01. HERO: Dynamic Destination Showcase (Database-Driven) */}
      {isSectionActive('hero') && (
        <Hero
          slides={data?.heroSlides}
          onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
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
          onSelectDestination={(dest) => handleOpenPlanTrip(dest)}
        />
      )}

      {/* 04. EDITORIAL SHOWCASE: KASHMIR → KANYAKUMARI (12 Curated Itineraries) */}
      <IndiaJourneyShowcase onSelectJourney={(dest) => handleOpenPlanTrip(dest)} />

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
        <FinalCinematicCTA onOpenPlanTrip={() => handleOpenPlanTrip()} />
      )}

      {/* 09. MINIMAL FOOTER */}
      <Footer />

      {/* Floating Concierge & Subtle WhatsApp */}
      <TravelChatbot />
      <WhatsAppButton />

      {/* Plan Journey Modal */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialDestination={preselectedDestination}
      />
    </main>
  );
}
