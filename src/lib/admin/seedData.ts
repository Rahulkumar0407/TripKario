import { tripPackages } from '@/data/trips';
import { testimonials } from '@/data/testimonials';
import { heroDestinations } from '@/data/heroDestinations';
import { destinations } from '@/data/destinations';

export interface SeedMediaItem {
  id: string;
  name: string;
  url: string;
  category: 'Hero' | 'Destination' | 'Trip' | 'Itinerary' | 'Past Trip' | 'Team' | 'Testimonial' | 'Story' | 'Other';
  altText: string;
  photographer?: string;
  usageCount: number;
}

export interface SeedHeroSlide {
  id: string;
  destination: string;
  tagline: string;
  imageUrl: string;
  route: string;
  duration: string;
  startingPrice: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SeedDestination {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  isActive: boolean;
  highlights: string[];
}

export interface SeedItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  description: string;
  images: string[];
}

export interface SeedTrip {
  slug: string;
  destinationName: string;
  title: string;
  overview: string;
  coverImageUrl: string;
  durationNights: number;
  durationDays: number;
  pricePerPerson: number;
  isPriceOnRequest?: boolean;
  status: 'published' | 'draft' | 'archived';
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  galleryUrls: string[];
  route?: string;
  sourceMetadata?: {
    sourceName?: string;
    sourceUrl?: string;
    sourceCheckedAt?: string;
    source?: 'IYC' | 'GHUMEGA';
    sourcePackageName?: string;
  };
  itineraryDays?: SeedItineraryDay[];
}


export interface SeedTestimonial {
  id: string;
  customerName: string;
  location?: string;
  quote: string;
  tripName?: string;
  tripDestination?: string;
  rating: number;
  reviewDate?: string;
  source: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SeedTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  phone?: string;
  email?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SeedPastVisit {
  id: string;
  destination: string;
  date: string;
  title?: string;
  coverImageUrl: string;
  photos: string[];
}

export interface SeedStory {
  slug: string;
  title: string;
  destinationName: string;
  tripDate: string;
  coverImageUrl: string;
  storyText: string;
  isPublished: boolean;
}

export interface SeedChatbotNode {
  nodeKey: string;
  message: string;
  options: string[];
  nextAction: string;
}

export interface SeedWhatsAppSettings {
  businessPhone: string;
  defaultMessage: string;
  handoffPrompt: string;
  isFloatingEnabled: boolean;
}

export interface SeedHomepageSection {
  key: string;
  title: string;
  subtitle?: string;
  isActive: boolean;
  order: number;
  displayOrder: number;
}

export interface SeedEnquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  destination: string;
  travelDates: string;
  travellersCount?: string;
  travellerCount?: string;
  budgetRange: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'planning' | 'quoted' | 'booked' | 'lost' | string;
  notes?: string;
  createdAt?: string;
}

export const initialMediaLibrary: SeedMediaItem[] = [
  {
    id: 'm-kashmir-shikara',
    name: 'Kashmir Dal Lake Shikara',
    url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop',
    category: 'Hero',
    altText: 'Traditional cedar shikara boat on serene Dal Lake in Kashmir',
    photographer: 'Unsplash Travel',
    usageCount: 4,
  },
  {
    id: 'm-himachal-mountains',
    name: 'Himachal Snow Ridges & Passes',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop',
    category: 'Hero',
    altText: 'Majestic snowy mountain peaks in Himachal Pradesh',
    photographer: 'Unsplash Himalayas',
    usageCount: 3,
  },
  {
    id: 'm-rajasthan-fort',
    name: 'Jaisalmer Sandstone Fort at Dusk',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop',
    category: 'Destination',
    altText: 'Golden sandstone architectural fortress in Rajasthan',
    photographer: 'Unsplash Heritage',
    usageCount: 3,
  },
  {
    id: 'm-kerala-houseboat',
    name: 'Kerala Alleppey Backwaters & Palms',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop',
    category: 'Destination',
    altText: 'Tranquil emerald backwaters and traditional houseboat in Kerala',
    photographer: 'Unsplash South',
    usageCount: 4,
  },
  {
    id: 'm-ladakh-pangong',
    name: 'Ladakh High Mountain Lake & Clouds',
    url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1600&auto=format&fit=crop',
    category: 'Hero',
    altText: 'Deep blue alpine lake against barren mountains in Ladakh',
    photographer: 'Unsplash High Altitude',
    usageCount: 2,
  },
  {
    id: 'm-meghalaya-dawki',
    name: 'Meghalaya Crystal River & Living Roots',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop',
    category: 'Destination',
    altText: 'Crystal-clear transparent river and lush green hills of Meghalaya',
    photographer: 'Unsplash Northeast',
    usageCount: 3,
  },
];

export const initialHeroSlides: SeedHeroSlide[] = heroDestinations.map((h, idx) => ({
  id: h.id,
  destination: h.destination,
  tagline: h.caption,
  imageUrl: h.image,
  route: h.route,
  duration: h.duration,
  startingPrice: h.price,
  displayOrder: idx + 1,
  isActive: true,
}));

export const initialDestinations: SeedDestination[] = destinations.map((d) => ({
  slug: d.id,
  name: d.name,
  region: d.region,
  tagline: d.tagline,
  description: d.description,
  imageUrl: d.image.src,
  startingPrice: d.startingPrice,
  isActive: true,
  highlights: d.curatedHighlights || ['Boutique stays', 'Private transfers', 'Scenic routes'],
}));

export const initialTrips: SeedTrip[] = tripPackages.map((t) => ({
  slug: t.id,
  destinationName: t.destination,
  title: t.title,
  overview: t.shortDescription,
  coverImageUrl: t.coverImage.src,
  durationNights: t.durationNights,
  durationDays: t.durationDays,
  pricePerPerson: t.pricePerPerson,
  isPriceOnRequest: t.isPriceOnRequest || false,
  status: 'published',
  highlights: t.highlights || ['Private sanitized car', 'Handpicked stays', 'Scenic drives'],
  inclusions: t.inclusions || ['Chauffeur transport', 'Breakfast & Dinner', 'Entry permits'],
  exclusions: t.exclusions || ['Flights', 'Personal expenses'],
  galleryUrls: t.galleryImages?.map((g) => g.src) || [t.coverImage.src],
  route: t.route,
  sourceMetadata: t.sourceMetadata,
  itineraryDays: t.itinerary && t.itinerary.length > 0

    ? t.itinerary.map((d) => ({
        dayNumber: d.dayNumber,
        title: d.title,
        location: d.location || t.destination,
        description: d.description,
        images: d.images || [t.coverImage.src],
      }))
    : [
        {
          dayNumber: 1,
          title: 'Arrival & Welcome Stays',
          location: t.destination,
          description: 'Chauffeur pickup, check-in to boutique verified accommodations, and relaxed evening stroll.',
          images: [t.coverImage.src],
        },
        {
          dayNumber: 2,
          title: 'Scenic Exploration & Local Discoveries',
          location: t.destination,
          description: 'Unhurried sightseeing, authentic local culinary stops, and sunset photo points.',
          images: t.galleryImages?.[0] ? [t.galleryImages[0].src] : [t.coverImage.src],
        },
      ],
}));

export const initialPastVisits: SeedPastVisit[] = [];


export const initialTestimonials: SeedTestimonial[] = testimonials.map((t, idx) => ({
  id: t.id,
  customerName: t.name,
  location: t.location || 'India',
  quote: t.quote,
  tripName: t.trip || 'Curated Circuit',
  tripDestination: t.tripDestination || 'India',
  rating: t.rating || 5,
  reviewDate: t.date || '2026',
  source: 'Google Review',
  displayOrder: idx + 1,
  isActive: true,
}));

export const initialTeamMembers: SeedTeamMember[] = [];


export const initialStories: SeedStory[] = [
  {
    slug: 'story-1',
    title: 'Misty Mornings in Pahalgam Valley',
    destinationName: 'Kashmir',
    tripDate: 'May 2026',
    coverImageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=1600&auto=format&fit=crop',
    storyText: 'Zero stress, fresh kahwa by the Lidder River, and quiet cedar chalets.',
    isPublished: true,
  },
  {
    slug: 'story-2',
    title: 'Living Root Bridges of Cherrapunji',
    destinationName: 'Meghalaya',
    tripDate: 'June 2026',
    coverImageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=85&w=1600&auto=format&fit=crop',
    storyText: 'Crystal-clear natural pools and rainforest walks without the crowds.',
    isPublished: true,
  },
];

export const initialChatbotNodes: SeedChatbotNode[] = [
  {
    nodeKey: 'greeting',
    message: 'Hello! I am your TripKario travel concierge. What kind of journey are you imagining?',
    options: ['Romantic Honeymoon', 'Family Vacation', 'Scenic Road Trip', 'Custom Circuit'],
    nextAction: 'ask_budget',
  },
  {
    nodeKey: 'ask_budget',
    message: 'Wonderful! What approximate budget per person do you have in mind?',
    options: ['₹20K – ₹35K', '₹35K – ₹50K', '₹50K – ₹80K', 'Luxury / ₹80K+'],
    nextAction: 'whatsapp_handoff',
  },
];

export const initialWhatsAppSettings: SeedWhatsAppSettings = {
  businessPhone: '+919958034778',
  defaultMessage: 'Hi TripKario, I want help planning a trip.',
  handoffPrompt: 'Connect with human specialist on WhatsApp',
  isFloatingEnabled: true,
};

export const initialSiteSettings = {
  companyName: 'TripKario',
  phone: '+91 99580 34778',
  email: 'tripkario1811@gmail.com',
  whatsappNumber: '+919958034778',
  address: 'D-115 UGF KH NO-863 CHHATTRPUR EXTN NEW DELHI 110074',
  description: 'Trips across India, planned around you. Confirmed hotels, private cars, zero rush.',
  instagramUrl: 'https://www.instagram.com/tripkario_com/',
  facebookUrl: 'https://facebook.com/tripkario',
  youtubeUrl: 'https://youtube.com/@tripkario',
  linkedinUrl: 'https://linkedin.com/company/tripkario',
  footerCopyright: '© 2026 TripKario. All rights reserved.',
};

export const initialHomepageSections: SeedHomepageSection[] = [
  { key: 'hero', title: 'Hero Carousel & Destination Search', subtitle: 'Main visual arrival and search widget', isActive: true, order: 1, displayOrder: 1 },
  { key: 'featured_trips', title: 'Featured Journeys & Packages', subtitle: 'Handcrafted itineraries with fixed pricing', isActive: true, order: 2, displayOrder: 2 },
  { key: 'destinations', title: 'Territories & Destinations', subtitle: 'Regional showcase (Kashmir, Himachal, Kerala, etc.)', isActive: true, order: 3, displayOrder: 3 },
  { key: 'travel_styles', title: 'Travel Styles & Moods', subtitle: 'Weekend, Honeymoon, Family, Adventure filters', isActive: true, order: 4, displayOrder: 4 },
  { key: 'field_notes', title: 'Field Notes & Photo Gallery', subtitle: 'Authentic travel photography contact sheet', isActive: true, order: 5, displayOrder: 5 },
  { key: 'testimonials', title: 'Traveller Reviews & Stories', subtitle: 'Genuine feedback and memory reel', isActive: true, order: 6, displayOrder: 6 },
  { key: 'team', title: 'Team & Why TripKario', subtitle: 'Direct human concierge & unhurried pacing guarantees', isActive: true, order: 7, displayOrder: 7 },
  { key: 'custom_trip', title: 'Custom Trip Planner CTA', subtitle: 'Tailor-made journey inquiry launcher', isActive: true, order: 8, displayOrder: 8 },
  { key: 'final_cta', title: 'Final Destination Picker', subtitle: 'End of page where-to-next pinboard', isActive: true, order: 9, displayOrder: 9 },
];

export const initialEnquiries: SeedEnquiry[] = [
  {
    id: 'enq-001',
    customerName: 'Aarav Sharma',
    phone: '+91 98112 34567',
    email: 'aarav.sharma@gmail.com',
    destination: 'Kashmir',
    travelDates: 'May 12 – May 18, 2026',
    travellersCount: 'Couple (2 Adults)',
    travellerCount: 'Couple (2 Adults)',
    budgetRange: '₹50,000 – ₹75,000',
    message: 'Looking for a relaxed trip to Srinagar & Gulmarg with confirmed gondola phase 2 passes and private houseboat.',
    source: 'Hero Search',
    status: 'new',
    createdAt: '2026-08-20T14:32:00Z',
  },
  {
    id: 'enq-002',
    customerName: 'Meera Nambiar',
    phone: '+91 94471 89012',
    email: 'meera.nambiar@yahoo.com',
    destination: 'Meghalaya',
    travelDates: 'June 5 – June 11, 2026',
    travellersCount: '3 Friends',
    travellerCount: '3 Friends',
    budgetRange: '₹40,000 – ₹60,000',
    message: 'We want to trek the double-decker living root bridges and boat on the transparent Dawki river.',
    source: 'Website Modal',
    status: 'contacted',
    createdAt: '2026-08-19T10:15:00Z',
  },
  {
    id: 'enq-003',
    customerName: 'Vikram & Ananya Roy',
    phone: '+91 98300 12345',
    email: 'vikram.roy@outlook.com',
    destination: 'Rajasthan',
    travelDates: 'October 2026 (Festive)',
    travellersCount: 'Family (4 Members)',
    travellerCount: 'Family (4 Members)',
    budgetRange: '₹1,00,000+',
    message: 'Family vacation with elderly parents. Need comfortable pacing, heritage havelis, and desert glamping in Jaisalmer.',
    source: 'Custom Trip CTA',
    status: 'planning',
    createdAt: '2026-08-18T18:45:00Z',
  },
];
