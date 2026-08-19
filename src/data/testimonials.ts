import { Testimonial } from '@/types';

/**
 * TripKario Testimonial & Review Dataset
 *
 * 1. REAL: Original genuine client-supplied reviews (preserved verbatim).
 * 2. DEMO: Clearly marked placeholder/sample reviews.
 */
export const testimonials: Testimonial[] = [
  // ════════════════════════════════════════════════════════════════
  // 01 — ORIGINAL / GENUINE CLIENT REVIEWS (type: 'real', verified: true)
  // ════════════════════════════════════════════════════════════════
  {
    id: 't-real-1',
    name: 'Sameer & Priyanka Khanna',
    location: 'Mumbai, India',
    destination: 'Kashmir',
    trip: 'Kashmir — The Great Escape',
    tripName: 'Kashmir — The Great Escape',
    tripDestination: 'Kashmir',
    rating: 5,
    date: 'January 2025',
    travelerType: 'Honeymoon Couple',
    quote:
      'Tripkario turned our Kashmir trip into something we’ll talk about for years. The private houseboat stay on Nigeen lake and having our gondola tickets already arranged saved us hours of stress. Truly world-class service.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    source: 'Google Reviews',
    type: 'real',
    verified: true,
    highlight: 'Saved hours of stress with pre-arranged gondola tickets.',
  },
  {
    id: 't-real-2',
    name: 'Dr. Rajesh Deshmukh',
    location: 'Pune, India',
    destination: 'Rajasthan',
    trip: 'Royal Rajasthan — Forts & Palaces',
    tripName: 'Royal Rajasthan — Forts & Palaces',
    tripDestination: 'Rajasthan',
    rating: 5,
    date: 'December 2024',
    travelerType: 'Family Vacation',
    quote:
      'Traveling with parents and kids can be demanding, but Tripkario paced the journey perfectly. The desert glamping at Sam dunes was luxurious, clean, and authentic. Not a single hitch anywhere.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    source: 'Google Reviews',
    type: 'real',
    verified: true,
    highlight: 'Paced perfectly for family members of all ages.',
  },
  {
    id: 't-real-3',
    name: 'Tanvi Saxena',
    location: 'Bengaluru, India',
    destination: 'Meghalaya',
    trip: 'Meghalaya — Clouds & Living Root Bridges',
    tripName: 'Meghalaya — Clouds & Living Root Bridges',
    tripDestination: 'Meghalaya',
    rating: 5,
    date: 'November 2024',
    travelerType: 'Solo Explorer',
    quote:
      'As a solo female traveler venturing to the Northeast, safety and local knowledge were key. Tripkario connected me with an incredible local Khasi guide. Boating on Dawki was pure magic.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    source: 'Google Reviews',
    type: 'real',
    verified: true,
    highlight: 'Safety, local guide connection, and smooth logistics.',
  },
  {
    id: 't-real-4',
    name: 'Aditya & Neha Roy',
    location: 'Delhi NCR, India',
    destination: 'Kerala',
    trip: 'God’s Own Escape — Kerala Luxury',
    tripName: 'God’s Own Escape — Kerala Luxury',
    tripDestination: 'Kerala',
    rating: 5,
    date: 'October 2024',
    travelerType: 'Anniversary Trip',
    quote:
      'The private chef on our Alleppey houseboat cooked the most delicious Karimeen Pollichathu we’ve ever tasted. The attention to detail that Tripkario provided is why we’ll never book anywhere else.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    source: 'Google Reviews',
    type: 'real',
    verified: true,
    highlight: 'Private chef on houseboat & pristine attention to detail.',
  },
  {
    id: 't-real-5',
    name: 'Ananya & Rohan Sharma',
    location: 'Mumbai, India',
    destination: 'Kashmir',
    trip: 'The Great Kashmir Escape',
    tripName: 'The Great Kashmir Escape',
    tripDestination: 'Kashmir',
    rating: 5,
    date: 'May 2024',
    travelerType: 'Couple Trip',
    quote:
      'Every morning in Pahalgam felt like a painted postcard. The chauffeur, Bashir Bhai, was courteous and knew every quiet tea stall along the Lidder River. Zero stress throughout the journey.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    source: 'Client Feedback',
    type: 'real',
    verified: true,
    highlight: 'Courteous private chauffeur and handpicked tea stalls.',
  },
  {
    id: 't-real-6',
    name: 'Vikramaditya Rao & Family',
    location: 'Bengaluru, India',
    destination: 'Rajasthan',
    trip: 'The Royal Route',
    tripName: 'The Royal Route',
    tripDestination: 'Rajasthan',
    rating: 5,
    date: 'April 2024',
    travelerType: 'Family Group (6 Pax)',
    quote:
      'Planning a trip with 6 family members usually causes chaos. TripKario nailed the pacing: leisurely breakfasts, private guided fort walks, and wonderful heritage havelis.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    source: 'Client Feedback',
    type: 'real',
    verified: true,
    highlight: 'Leisurely pacing, private fort guides, and heritage havelis.',
  },
  {
    id: 't-real-7',
    name: 'Pooja Nair',
    location: 'Delhi NCR, India',
    destination: 'Meghalaya',
    trip: 'Living Root Bridges & Rainforest Pools',
    tripName: 'Living Root Bridges & Rainforest Pools',
    tripDestination: 'Meghalaya',
    rating: 5,
    date: 'June 2024',
    travelerType: 'Solo / Friends',
    quote:
      'Down in Cherrapunji, our local guide took us to natural river pools without another tourist in sight. This is how travel should feel.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    source: 'Client Feedback',
    type: 'real',
    verified: true,
    highlight: 'Secret natural river pools with zero crowds.',
  },

  // ════════════════════════════════════════════════════════════════
  // 02 — DEMO / PLACEHOLDER TESTIMONIALS (type: 'demo', verified: false)
  // ════════════════════════════════════════════════════════════════
  {
    id: 't-demo-1',
    name: 'Amit & Ritu Patel',
    location: 'Ahmedabad, India',
    destination: 'Himachal',
    trip: 'Spiti Valley 4x4 Circuit (Sample Itinerary)',
    tripName: 'Spiti Valley 4x4 Circuit',
    tripDestination: 'Himachal',
    rating: 5,
    date: 'Sample Review',
    travelerType: 'Adventure Travelers',
    quote:
      '[Demo Preview] The 4x4 backup support and high-altitude homestay arrangements in Kaza and Chandratal made a challenging mountain route comfortable and memorable.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    source: 'Demo Review',
    type: 'demo',
    verified: false,
    highlight: 'Demo Review: High-altitude backup and 4x4 coordination.',
  },
  {
    id: 't-demo-2',
    name: 'Karan & Megha Kapoor',
    location: 'Chandigarh, India',
    destination: 'Andaman Islands',
    trip: 'Havelock & Neil Island Escapade (Sample)',
    tripName: 'Havelock Island Escapade',
    tripDestination: 'Andaman',
    rating: 5,
    date: 'Sample Review',
    travelerType: 'Beach Holiday',
    quote:
      '[Demo Preview] Scuba diving sessions with certified PADI instructors and private speed boat transfers between islands were arranged without any waiting time.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    source: 'Demo Review',
    type: 'demo',
    verified: false,
    highlight: 'Demo Review: Island transfers and certified diving.',
  },
  {
    id: 't-demo-3',
    name: 'Sunil Joshi',
    location: 'Hyderabad, India',
    destination: 'Ladakh',
    trip: 'Leh-Pangong High-Pass Ride (Sample)',
    tripName: 'Leh-Pangong High-Pass Ride',
    tripDestination: 'Ladakh',
    rating: 5,
    date: 'Sample Review',
    travelerType: 'Motorcycle Tour',
    quote:
      '[Demo Preview] Royal Enfield Himalayan bikes in pristine condition, backup mechanic truck, and heated luxury dome tents right beside Pangong Lake.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    source: 'Demo Review',
    type: 'demo',
    verified: false,
    highlight: 'Demo Review: Mechanical backup & luxury dome tents.',
  },
];
