import { supabase } from '@/lib/supabase/client';
import { heroDestinations, HeroDestination } from '@/data/heroDestinations';
import { destinations } from '@/data/destinations';
import { tripPackages } from '@/data/trips';
import { testimonials } from '@/data/testimonials';
import type { Destination, TripPackage, Testimonial } from '@/types';
import { initialHomepageSections } from '@/lib/admin/seedData';

export interface HomepageData {
  heroSlides: HeroDestination[];
  destinations: Destination[];
  trips: TripPackage[];
  testimonials: Testimonial[];
  sections: Array<{ key: string; title: string; subtitle?: string; isActive: boolean; order: number }>;
}

/**
 * Robust data-access layer for the public homepage.
 * Queries published/active records from Supabase, with automatic graceful fallback to seeded data.
 */
export async function getHomepageData(): Promise<HomepageData> {
  // Defaults from approved static repository data
  const fallbackData: HomepageData = {
    heroSlides: heroDestinations,
    destinations: destinations,
    trips: tripPackages,
    testimonials: testimonials,
    sections: initialHomepageSections,
  };

  // If Supabase URL is mock/empty, return approved static data immediately
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://mock-tripkario.supabase.co'
  ) {
    return fallbackData;
  }

  try {
    // Parallel fetch of published records
    const [heroRes, destRes, tripRes, testRes, secRes] = await Promise.allSettled([
      supabase
        .from('hero_slides')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true }),
      supabase
        .from('destinations')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true }),
      supabase
        .from('trips')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true }),
      supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true }),
      supabase
        .from('homepage_sections')
        .select('*')
        .order('display_order', { ascending: true }),
    ]);

    // 01. Transform Hero Slides
    let heroSlides = fallbackData.heroSlides;
    if (heroRes.status === 'fulfilled' && heroRes.value.data && heroRes.value.data.length > 0) {
      heroSlides = heroRes.value.data.map((row: any, idx: number) => {
        const matchingFallback = heroDestinations[idx] || heroDestinations[0];
        return {
          id: row.id,
          destination: row.destination,
          image: row.image_url,
          alt: `${row.destination} travel photograph`,
          caption: row.tagline,
          route: row.route || matchingFallback.route,
          duration: row.duration || matchingFallback.duration,
          price: row.starting_price || matchingFallback.price,
          photographer: matchingFallback.photographer,
          source: matchingFallback.source,
          license: matchingFallback.license,
          focalPoint: matchingFallback.focalPoint,
          focalPosition: matchingFallback.focalPosition,
          safeTextSide: matchingFallback.safeTextSide,
          atmosphereColor: matchingFallback.atmosphereColor,
          atmosphereWash: matchingFallback.atmosphereWash,
          transitionDirection: matchingFallback.transitionDirection,
          sceneMode: matchingFallback.sceneMode,
          region: matchingFallback.region,
          startingPrice: matchingFallback.startingPrice,
          durationNights: matchingFallback.durationNights,
          durationDays: matchingFallback.durationDays,
          routeString: matchingFallback.routeString,
          contactSheet: matchingFallback.contactSheet || `0${idx + 1} / 07`,
        };
      });
    }

    // 02. Transform Destinations
    let destList = fallbackData.destinations;
    if (destRes.status === 'fulfilled' && destRes.value.data && destRes.value.data.length > 0) {
      destList = destRes.value.data.map((row: any, idx: number) => {
        const matchingFallback = destinations[idx] || destinations[0];
        return {
          id: row.slug || row.id,
          name: row.name,
          region: row.region,
          zone: matchingFallback.zone,
          tagline: row.short_description || matchingFallback.tagline,
          description: row.full_description || matchingFallback.description,
          image: {
            src: row.cover_image_url || matchingFallback.image.src,
            alt: `${row.name} scenery`,
            photographer: matchingFallback.image.photographer,
            source: 'TripKario Media',
            license: 'Editorial',
            location: row.name,
            year: '2026',
          },
          startingPrice: row.starting_price || matchingFallback.startingPrice,
          durationDays: matchingFallback.durationDays,
          durationNights: matchingFallback.durationNights,
          packageCount: matchingFallback.packageCount,
          curatedHighlights: row.highlights || matchingFallback.curatedHighlights,
          route: matchingFallback.route,
        };
      });
    }

    // 03. Transform Trips
    let tripList = fallbackData.trips;
    if (tripRes.status === 'fulfilled' && tripRes.value.data && tripRes.value.data.length > 0) {
      tripList = tripRes.value.data.map((row: any, idx: number) => {
        const matchingFallback = tripPackages[idx] || tripPackages[0];
        return {
          id: row.slug || row.id,
          destinationId: row.destination_name?.toLowerCase() || matchingFallback.destinationId,
          destination: row.destination_name || matchingFallback.destination,
          title: row.title,
          subtitle: matchingFallback.subtitle,
          shortDescription: row.overview || matchingFallback.shortDescription,
          longDescription: row.overview || matchingFallback.longDescription,
          durationNights: row.duration_nights || matchingFallback.durationNights,
          durationDays: row.duration_days || matchingFallback.durationDays,
          pricePerPerson: row.price_per_person || matchingFallback.pricePerPerson,
          rating: 4.9,
          reviewCount: matchingFallback.reviewCount,
          category: matchingFallback.category,
          coverImage: {
            src: row.cover_image_url || matchingFallback.coverImage.src,
            alt: row.title,
            photographer: matchingFallback.coverImage.photographer,
            source: 'TripKario Media',
            license: 'Editorial',
            location: row.destination_name,
          },
          galleryImages: matchingFallback.galleryImages,
          highlights: row.highlights || matchingFallback.highlights,
          inclusions: row.inclusions || matchingFallback.inclusions,
          exclusions: row.exclusions || matchingFallback.exclusions,
        };
      });
    }

    // 04. Transform Testimonials
    let testList = fallbackData.testimonials;
    if (testRes.status === 'fulfilled' && testRes.value.data && testRes.value.data.length > 0) {
      testList = testRes.value.data.map((row: any, idx: number) => {
        const matchingFallback = testimonials[idx] || testimonials[0];
        return {
          id: row.id,
          name: row.customer_name,
          location: row.location || matchingFallback.location,
          quote: row.quote,
          trip: row.trip_name || matchingFallback.trip,
          tripDestination: row.trip_destination || matchingFallback.tripDestination,
          date: row.review_date || matchingFallback.date,
          avatar: row.avatar_url || matchingFallback.avatar,
          rating: row.rating ? Number(row.rating) : matchingFallback.rating,
          highlight: matchingFallback.highlight,
          source: row.source || 'Google',
        };
      });
    }

    // 05. Homepage Section Toggles
    let sectionList = fallbackData.sections;
    if (secRes.status === 'fulfilled' && secRes.value.data && secRes.value.data.length > 0) {
      sectionList = secRes.value.data.map((row: any) => ({
        key: row.section_key,
        title: row.title,
        subtitle: row.subtitle,
        isActive: row.is_active,
        order: row.display_order,
      }));
    }

    return {
      heroSlides,
      destinations: destList,
      trips: tripList,
      testimonials: testList,
      sections: sectionList,
    };
  } catch (e) {
    console.warn('Failed to query Supabase homepage data, falling back gracefully:', e);
    return fallbackData;
  }
}
