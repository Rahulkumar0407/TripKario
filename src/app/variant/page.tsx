'use client';

import React, { useState } from 'react';
import VariantNavbar from '@/components/variant/VariantNavbar';
import VariantHero from '@/components/variant/VariantHero';
import VariantPinboardMorph from '@/components/variant/VariantPinboardMorph';
import VariantDestinationEditorial from '@/components/variant/VariantDestinationEditorial';
import VariantMoodTiles from '@/components/variant/VariantMoodTiles';
import VariantContactSheet from '@/components/variant/VariantContactSheet';
import VariantTravelStories from '@/components/variant/VariantTravelStories';
import VariantItineraryEditorial from '@/components/variant/VariantItineraryEditorial';
import VariantBrandStory from '@/components/variant/VariantBrandStory';
import VariantCustomTrip from '@/components/variant/VariantCustomTrip';
import VariantWhereToNext from '@/components/variant/VariantWhereToNext';
import VariantFooter from '@/components/variant/VariantFooter';
import TravelChatbot from '@/components/TravelChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import PlanTripModal from '@/components/PlanTripModal';
import { MoodTile } from '@/data/variant/variantData';

export default function VariantPage() {
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [preselectedDestination, setPreselectedDestination] = useState<string | undefined>(undefined);

  const handleOpenPlanTrip = (destination?: string) => {
    setPreselectedDestination(destination);
    setIsPlanModalOpen(true);
  };

  const handleSelectMood = (mood: MoodTile) => {
    setPreselectedDestination(mood.destinationHint.split('&')[0].trim());
    setIsPlanModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F3EFE6] dark:bg-[#0D0C0A] text-[#171512] dark:text-[#F4EEE4] selection:bg-[#C95D39]/20 selection:text-[#C95D39] transition-colors duration-500 relative">
      {/* 00. Floating Liquid Glass Editorial Dock Navigation */}
      <VariantNavbar onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 01. Scene 01: The Travel Pinboard Hero with Assembly Sequence & Search */}
      <VariantHero
        onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 02. Scene 02: Pinboard → Destination Morph (From memory to full destination) */}
      <VariantPinboardMorph
        onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 03. Scene 03: The Moving Travel Strip (Horizontal Destination Carousel) */}
      <VariantDestinationEditorial
        onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 04. Scene 04: "What kind of trip do you want?" Floating Mood Tiles */}
      <VariantMoodTiles onSelectMood={handleSelectMood} />

      {/* 05. Scene 05: Field Notes Contact Sheet ("India, one photo at a time") */}
      <VariantContactSheet />

      {/* 06. Scene 06: Traveller Stories ("They went. They came back smiling.") */}
      <VariantTravelStories />

      {/* 07. Scene 07: Daily Flow Contact Sheet ("How a day unfolds, step by step") */}
      <VariantItineraryEditorial />

      {/* 08. Scene 08: "India is bigger than a bucket list" Perspectives & Cultural Humor */}
      <VariantBrandStory />

      {/* 09. Scene 09: Custom Trip ("Your trip can be different.") */}
      <VariantCustomTrip onOpenPlanTrip={() => handleOpenPlanTrip()} />

      {/* 10. Scene 10: The Full-Circle Final Pinboard ("WHERE TO NEXT?") */}
      <VariantWhereToNext
        onOpenPlanTrip={(dest) => handleOpenPlanTrip(dest)}
      />

      {/* 11. Editorial Footer */}
      <VariantFooter />

      {/* Concierge Chatbot & Direct WhatsApp Trigger */}
      <TravelChatbot />
      <WhatsAppButton />

      {/* Interactive Trip Planner Modal */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialDestination={preselectedDestination}
      />
    </main>
  );
}
