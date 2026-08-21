export interface EditorialImage {
  src: string;
  alt: string;
  photographer?: string;
  source?: string;
  license?: string;
  location?: string;
  year?: string;
  time?: string;
  orientation?: 'landscape' | 'portrait';
  heroSafeArea?: 'left' | 'right' | 'center';
  focalPosition?: string;
  pointOfView?: string;
}

export interface HeroPhotograph {
  id: string;
  destinationId: string;
  destinationName: string;
  region: string;
  src: string;
  alt: string;
  photographer: string;
  source: string;
  license: string;
  location: string;
  year: string;
  orientation: 'landscape' | 'portrait';
  heroSafeArea: 'left' | 'right' | 'center';
  focalPosition: string;
  focalPoint: {
    x: number;
    y: number;
  };
  motionProfile: {
    camera: 'zoom-forward' | 'drift-vertical' | 'lateral-pan' | 'push-through-mist' | 'slow-pan';
    parallaxSpeed: number;
    directionHint: string;
    animationClass: string;
  };
  editorialHeadline: {
    line1: string;
    line2: string;
    accentWord: string;
  };
  sensoryMicrocopy: string;
  pointOfView: string;
  routeString: string;
  startingPrice: number;
  durationNights: number;
  durationDays: number;
  atmosphereColor: string;
  filmGrainOpacity: number;
  contactSheetNumber: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  zone?: 'NORTH' | 'WEST' | 'SOUTH' | 'NORTHEAST';
  tagline: string;
  description: string;
  image: EditorialImage;
  startingPrice: number;
  durationDays: number;
  durationNights: number;
  packageCount?: number;
  tripCount?: number;
  curatedHighlights?: string[];
  popularFor?: string[];
  route?: string;
}

export interface TripPackage {
  id: string;
  destinationId: string;
  destination: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  longDescription?: string;
  durationNights: number;
  durationDays: number;
  pricePerPerson: number;
  isPriceOnRequest?: boolean;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category?: 'Popular' | 'Signature' | 'Luxury' | 'Boutique' | 'Adventure' | 'Weekend' | 'Offbeat';
  travelStyle?: string;
  badge?: string;
  featured?: boolean;
  popular?: boolean;
  coverImage: EditorialImage;
  galleryImages?: EditorialImage[];
  route?: string;
  inclusions: string[];
  highlights?: string[];
  exclusions?: string[];
  bestSeason?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Active';
  sourceMetadata?: {
    sourceName: string;
    sourceUrl: string;
    sourceCheckedAt: string;
  };
  itinerary?: Array<{
    dayNumber: number;
    title: string;
    location?: string;
    description: string;
    images?: string[];
  }>;
}

export interface TravellerStory {
  id: string;
  traveller: string;
  trip: string;
  quote: string;
  rating: number;
  reviewSummary: string;
  image: EditorialImage;
  date: string;
}

export interface FieldNote {
  id: string;
  title: string;
  location: string;
  time: string;
  photographer: string;
  aspect: 'portrait' | 'landscape' | 'square';
  image: EditorialImage;
}

export interface JournalPhoto {
  id: string;
  caption: string;
  location: string;
  image: string;
  photographer?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  destination?: string;
  trip?: string;
  tripName?: string;
  tripDestination?: string;
  date?: string;
  rating?: number;
  image?: string;
  avatar?: string;
  source?: string;
  type?: 'real' | 'demo';
  verified?: boolean;
  location?: string;
  travelerType?: string;
  highlight?: string;
  comment?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  description?: string;
  avatar?: string;
  photo?: string;
  experienceYears?: number;
  favoriteDestination?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  tagline?: string;
  packageCount?: number;
  slug?: string;
  icon?: string;
  image?: string;
}

export interface ChatbotQA {
  id: string;
  question: string;
  keywords?: string[];
  answer?: string;
  shortAnswer?: string;
  details?: string;
  recommendedTrips?: string[];
  suggestedActionText?: string;
  whatsappPrefillText?: string;
  category?: string;
  followUps?: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  slogan?: string;
  description: string;
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  supportEmail: string;
  officeAddress: string;
  businessHours?: string;
  stats?: {
    happyTravelers?: string;
    happyTravellers?: string;
    destinationsCovered?: string;
    destinations?: string;
    curatedItineraries?: string;
    curatedJourneys?: string;
    averageRating?: string;
    travellerRating?: string;
  };
  socials?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
    linkedin?: string;
  };
}
