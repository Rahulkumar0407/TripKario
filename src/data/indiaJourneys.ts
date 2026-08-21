export interface IndiaJourneyChapter {
  id: string;
  chapterNumber: string;
  destination: string;
  tripId: string;
  title: string;
  route: string;
  duration: string;
  priceDisplay: string;
  isPriceOnRequest: boolean;
  image: {
    src: string;
    alt: string;
    location: string;
  };
  accentColor: string; // Subtle atmospheric ambient glow color
  highlights: string[];
}

export const indiaJourneyChapters: IndiaJourneyChapter[] = [
  {
    id: 'kashmir',
    chapterNumber: '01',
    destination: 'Kashmir',
    tripId: 'kashmir-signature',
    title: 'The Great Kashmir Escape',
    route: 'Srinagar → Gulmarg → Pahalgam',
    duration: '6 Nights · 7 Days',
    priceDisplay: '₹20,900',
    isPriceOnRequest: false,
    image: {
      src: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=2600&auto=format&fit=crop',
      alt: 'Shikara boat on serene misty waters of Dal Lake in Kashmir',
      location: 'Dal Lake, Srinagar',
    },
    accentColor: 'rgba(56, 189, 248, 0.18)',
    highlights: ['Cedar Houseboat Stays', 'Gulmarg Gondola Passes', 'Lidder River Chalet'],
  },
  {
    id: 'ladakh',
    chapterNumber: '02',
    destination: 'Ladakh',
    tripId: 'ladakh-high-passes',
    title: 'High Passes & Monastery Chants',
    route: 'Leh → Nubra → Pangong',
    duration: '6 Nights · 7 Days',
    priceDisplay: '₹22,000',
    isPriceOnRequest: false,
    image: {
      src: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=2600&auto=format&fit=crop',
      alt: 'Cliffside Thiksey Monastery overlooking Ladakh mountain valley',
      location: 'Thiksey Gompa, Leh',
    },
    accentColor: 'rgba(96, 165, 250, 0.18)',
    highlights: ['Khardung La Pass', 'Pangong Cobalt Lake', 'Ancient Cliff Gompas'],
  },
  {
    id: 'spiti',
    chapterNumber: '03',
    destination: 'Spiti Valley',
    tripId: 'spiti-circuit',
    title: 'Spiti Valley High-Altitude Circuit',
    route: 'Shimla → Kaza → Chandratal → Manali',
    duration: '7 Nights · 8 Days',
    priceDisplay: '₹18,990',
    isPriceOnRequest: false,
    image: {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=2600&auto=format&fit=crop',
      alt: 'Dramatic canyon valleys and snowy peaks of Spiti Valley',
      location: 'Key Gompa, Spiti',
    },
    accentColor: 'rgba(251, 146, 60, 0.16)',
    highlights: ['Key Gompa on Cliff', 'Crescent Chandratal Lake', 'Highest Post Office'],
  },
  {
    id: 'rajasthan',
    chapterNumber: '04',
    destination: 'Rajasthan',
    tripId: 'rajasthan-heritage',
    title: 'Royal Citadels & Desert Dunes',
    route: 'Jaipur → Jodhpur → Jaisalmer',
    duration: '5 Nights · 6 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    image: {
      src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2600&auto=format&fit=crop',
      alt: 'Sandstone fort architecture in Rajasthan glowing at golden hour',
      location: 'Jaisalmer Fort, Rajasthan',
    },
    accentColor: 'rgba(234, 88, 12, 0.18)',
    highlights: ['Private Fort Walk', 'Thar Desert Stargazing', 'Heritage Haveli Stays'],
  },
  {
    id: 'goa',
    chapterNumber: '05',
    destination: 'Goa Coast',
    tripId: 'goa-slow-coastal',
    title: 'South Goa Portuguese Quarters',
    route: 'Panjim → Fontainhas → Palolem → Agonda',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    image: {
      src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=2600&auto=format&fit=crop',
      alt: 'Tranquil palm fringed beach in South Goa during sunset',
      location: 'Palolem Beach, South Goa',
    },
    accentColor: 'rgba(20, 184, 166, 0.16)',
    highlights: ['Latin Quarter Walk', 'Hidden South Coves', 'Cabo de Rama Sunset'],
  },
  {
    id: 'karnataka-south',
    chapterNumber: '06',
    destination: 'Karnataka & Wayanad',
    tripId: 'south-coorg-wayanad',
    title: 'Coffee Plantations & Rainforest Streams',
    route: 'Bengaluru → Mysore → Coorg → Wayanad',
    duration: '4 Nights · 5 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    image: {
      src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=2600&auto=format&fit=crop',
      alt: 'Rolling mist over green coffee and tea hills in the Western Ghats',
      location: 'Coorg & Wayanad Hills',
    },
    accentColor: 'rgba(34, 197, 94, 0.16)',
    highlights: ['Estate Bungalow Stay', 'Coffee Tasting Walk', 'Rainforest Waterfalls'],
  },
  {
    id: 'kerala',
    chapterNumber: '07',
    destination: 'Kerala',
    tripId: 'kerala-backwaters',
    title: 'Emerald Waters & Spice Hills',
    route: 'Kochi → Munnar → Thekkady → Alleppey',
    duration: '5 Nights · 6 Days',
    priceDisplay: '₹11,100',
    isPriceOnRequest: false,
    image: {
      src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=2600&auto=format&fit=crop',
      alt: 'Traditional wooden houseboat navigating palm-fringed Kerala backwaters',
      location: 'Alleppey Backwaters, Kerala',
    },
    accentColor: 'rgba(16, 185, 129, 0.18)',
    highlights: ['Private Houseboat Cruise', 'Munnar Tea Estate', 'Spice Plantation Walk'],
  },
  {
    id: 'deep-south',
    chapterNumber: '08',
    destination: 'Deep South',
    tripId: 'south-ooty-kodaikanal',
    title: 'Nilgiri Blue Hills & Southern Horizons',
    route: 'Coimbatore → Ooty → Coonoor → Kodaikanal',
    duration: '5 Nights · 6 Days',
    priceDisplay: 'Price on request',
    isPriceOnRequest: true,
    image: {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=2600&auto=format&fit=crop',
      alt: 'Eucalyptus hills and mountain railway track in South India',
      location: 'Nilgiri Mountain Range',
    },
    accentColor: 'rgba(14, 165, 233, 0.16)',
    highlights: ['UNESCO Toy Train', 'Coonoor Tea Slopes', 'Pillar Rock Vista'],
  },
];
