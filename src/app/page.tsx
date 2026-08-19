'use client';

import React, { useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TripCarousel from '@/components/TripCarousel';
import DestinationCarousel from '@/components/DestinationCarousel';
import PhotoStrip from '@/components/PhotoStrip';
import IndiaStory from '@/components/IndiaStory';
import SurpriseMeCTA from '@/components/SurpriseMeCTA';
import ItineraryStory from '@/components/ItineraryStory';
import TripMatcher from '@/components/TripMatcher';
import TravellerStories from '@/components/TravellerStories';
import WhyTripkario from '@/components/WhyTripkario';
import CustomJourney from '@/components/CustomJourney';
import FinalCinematicCTA from '@/components/FinalCinematicCTA';
import Footer from '@/components/Footer';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';

export default function Home() {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [preselectedDestination, setPreselectedDestination] = useState<string | undefined>(undefined);

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

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Brand Opening Preloader */}
      <Preloader />

      {/* Floating Glass Navigation */}
      <Navbar onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 01. HERO CAROUSEL: Dynamic Destination Showcase */}
      <Hero
        onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
        onSearch={handleSearchFilter}
      />

      {/* 02. CURATED TRIPS: Discovery & Focus States + Quick View Glass Sheet */}
      <TripCarousel onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)} />

      {/* 03. DESTINATION CAROUSEL: 3D Layered Depth + Ambient Lighting */}
      <DestinationCarousel
        onSelectDestination={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 04. NEW SCENE: THE TRIPKARIO FIELD NOTES (Horizontal Photographic Strip) */}
      <PhotoStrip />

      {/* 05. INDIA TERRITORY STORY: North, West, South, Northeast Editorial Stories */}
      <IndiaStory
        onSelectDestination={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 06. MICRO-MOMENT: SURPRISE ME */}
      <SurpriseMeCTA
        onSelectDestination={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 07. STICKY ITINERARY: What the Journey Actually Feels Like */}
      <ItineraryStory />

      {/* 08. CONVERSATIONAL MATCHER */}
      <TripMatcher
        onSelectTrip={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 09. TRAVELLER STORIES: Real Photography + Glass Review Overlays */}
      <TravellerStories />

      {/* 10. PHILOSOPHY: You Enjoy the Trip. We Handle the Chaos. */}
      <WhyTripkario />

      {/* 11. BESPOKE CUSTOM TRIP: Your Route. Your Rules. */}
      <CustomJourney onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 12. FINAL DEPARTURE: Ready to Go Somewhere? */}
      <FinalCinematicCTA onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 13. MINIMAL FOOTER */}
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
