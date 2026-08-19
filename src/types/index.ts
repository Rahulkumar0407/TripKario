export interface EditorialImage {
  src: string;
  alt: string;
  photographer?: string;
  source?: string;
  license?: string;
  location?: string;
  year?: string;
  time?: string;
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
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category?: 'Popular' | 'Signature' | 'Luxury' | 'Boutique' | 'Adventure';
  travelStyle?: string;
  badge?: string;
  coverImage: EditorialImage;
  galleryImages?: EditorialImage[];
  route?: string;
  inclusions: string[];
  highlights?: string[];
  exclusions?: string[];
  bestSeason?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Active';
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
  location: string;
  avatar?: string;
  rating: number;
  comment?: string;
  quote?: string;
  tripName?: string;
  tripDestination?: string;
  tripTitle?: string;
  travelerType?: string;
  date?: string;
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
