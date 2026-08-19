import { SiteConfig, Testimonial } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'TripKario',
  tagline: 'Every trip has a story.',
  slogan: 'ARRIVE • DISCOVER • REMEMBER',
  description: 'Curated journeys across India and beyond, planned around the way you travel. Verified boutique stays, private chauffeurs, and human planning support.',
  whatsappNumber: '+919876543210',
  whatsappDisplayNumber: '+91 98765 43210',
  supportEmail: 'hello@tripkario.com',
  officeAddress: 'B-402, Signature Towers, Sector 32, Gurugram, Delhi NCR, India',
  businessHours: 'Mon – Sat: 9:00 AM – 8:00 PM IST',
  stats: {
    happyTravellers: '500+',
    curatedJourneys: '50+',
    destinations: '25+',
    travellerRating: '4.9/5',
  },
  socialLinks: {
    instagram: 'https://instagram.com/tripkario',
    facebook: 'https://facebook.com/tripkario',
    youtube: 'https://youtube.com/@tripkario',
    linkedin: 'https://linkedin.com/company/tripkario',
  },
};

export const reviewsData: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Ananya & Rohan Sharma',
    location: 'Mumbai',
    tripName: 'The Great Kashmir Escape',
    tripDestination: 'Kashmir',
    rating: 5,
    date: 'May 2026',
    quote: 'Every morning in Pahalgam felt like a painted postcard. The chauffeur, Bashir Bhai, was courteous and knew every quiet tea stall along the Lidder River. Zero stress.',
    travelerType: 'Honeymoon Couple',
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya Rao & Family',
    location: 'Bengaluru',
    tripName: 'The Royal Route',
    tripDestination: 'Rajasthan',
    rating: 5,
    date: 'April 2026',
    quote: 'Planning a trip with 6 family members usually causes chaos. TripKario nailed the pacing: leisurely breakfasts, private guided fort walks, and wonderful heritage havelis.',
    travelerType: 'Family Vacation',
  },
  {
    id: 'rev-3',
    name: 'Pooja Nair',
    location: 'Delhi NCR',
    tripName: 'Living Root Bridges & Rainforest Pools',
    tripDestination: 'Meghalaya',
    rating: 5,
    date: 'June 2026',
    quote: 'Down in Cherrapunji, our local guide took us to natural river pools without another tourist in sight. This is how travel should feel.',
    travelerType: 'Solo / Friends',
  },
];
