export interface VariantHeroDestination {
  id: string;
  num: string;
  name: string;
  shortVibe: string;
  tagline: string;
  simpleNote: string;
  region: string;
  price: string;
  duration: string;
  image: string;
  photographer: string;
  location: string;
  route: string;
  highlights: string[];
}

export const variantHeroDestinations: VariantHeroDestination[] = [
  {
    id: 'kashmir',
    num: '01',
    name: 'Kashmir',
    shortVibe: 'Lakes. Mountains. Quiet mornings.',
    tagline: 'Cedar houseboats on Dal Lake and snow in Gulmarg.',
    simpleNote: 'Wake up to steaming kahwa and mountain mist outside your window.',
    region: 'North India',
    price: '₹24,999',
    duration: '6 Nights · 7 Days',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Ayan Mukherjee',
    location: 'Dal Lake, Srinagar',
    route: 'Srinagar → Gulmarg → Pahalgam',
    highlights: ['Private Sunset Shikara', 'Gondola Cable Car Passes', 'Riverside Cottage Stay'],
  },
  {
    id: 'ladakh',
    num: '02',
    name: 'Ladakh',
    shortVibe: 'High passes. Ancient gompas. Blue lakes.',
    tagline: 'Cross 17,000 ft passes and see stars like never before.',
    simpleNote: 'Quiet mountain passes, morning chants, and roads worth getting lost on.',
    region: 'High Himalayas',
    price: '₹31,999',
    duration: '7 Nights · 8 Days',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Rohit Sharma',
    location: 'Thiksey Gompa, Leh',
    route: 'Leh → Nubra Valley → Pangong Lake',
    highlights: ['Pangong Lake Camp', 'Monastery Morning Chants', 'Khardung La High Drive'],
  },
  {
    id: 'rajasthan',
    num: '03',
    name: 'Rajasthan',
    shortVibe: 'Golden forts. Desert dunes. Good food.',
    tagline: 'Walk through sandstone citadels and sleep under desert stars.',
    simpleNote: 'Where sandstone havelis turn gold every afternoon before sunset.',
    region: 'Western Desert',
    price: '₹21,999',
    duration: '5 Nights · 6 Days',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Prateek Gautam',
    location: 'Jaisalmer Fort',
    route: 'Jaipur → Jodhpur → Jaisalmer',
    highlights: ['Private Fort Walk', 'Desert Stargazing Camp', 'Heritage Haveli Stays'],
  },
  {
    id: 'kerala',
    num: '04',
    name: 'Kerala',
    shortVibe: 'Green canals. Cardamom hills. Slow canoes.',
    tagline: 'Quiet palm backwaters and misty tea plantations.',
    simpleNote: 'Some mornings are better taken slowly on a wooden boat.',
    region: 'South Coast',
    price: '₹19,999',
    duration: '5 Nights · 6 Days',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Navaneeth Kishore',
    location: 'Vembanad Lake, Alleppey',
    route: 'Kochi → Munnar → Alleppey',
    highlights: ['Private Houseboat Cruise', 'Organic Spice Trail', 'Cliffside Sunset Walk'],
  },
  {
    id: 'meghalaya',
    num: '05',
    name: 'Meghalaya',
    shortVibe: 'Root bridges. Crystal rivers. Cloud trails.',
    tagline: 'Trek into living root bridges and boat on mirror rivers.',
    simpleNote: 'Follow the road directly into the rainforest clouds.',
    region: 'Northeast Hills',
    price: '₹22,499',
    duration: '4 Nights · 5 Days',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Subham Kar',
    location: 'Cherrapunji & Dawki',
    route: 'Shillong → Cherrapunji → Dawki',
    highlights: ['Living Root Bridge Trek', 'Crystal River Boating', 'Local Village Homestay'],
  },
  {
    id: 'goa',
    num: '06',
    name: 'Goa',
    shortVibe: 'Yellow balconies. Palm shadows. Susegad.',
    tagline: 'Old Portuguese quarters, quiet beaches and seafood.',
    simpleNote: 'Take the scenic route. Stay longer than planned.',
    region: 'Konkan Coast',
    price: '₹16,999',
    duration: '4 Nights · 5 Days',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=2600&auto=format&fit=crop',
    photographer: 'Shubhankar Sharma',
    location: 'Fontainhas, Panaji',
    route: 'Panaji → Divar Island → South Goa',
    highlights: ['Fontainhas Walk', 'Estuary Boat Trail', 'Boutique Villa Stay'],
  },
];

export interface MoodTile {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  humorLine?: string;
  description: string;
  image: string;
  destinationHint: string;
  priceFrom: string;
  duration: string;
}

export const moodTiles: MoodTile[] = [
  {
    id: 'weekend',
    tag: 'MOOD 01',
    title: 'Weekend',
    subtitle: 'Short break. Big reset.',
    humorLine: 'Weekend aa gaya. Ab bahana kya hai?',
    description: 'Quick mountain chalets or heritage escapes just 3–5 hours away.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Himachal & Tirthan Valley',
    priceFrom: '₹14,999',
    duration: '2N / 3D',
  },
  {
    id: 'honeymoon',
    tag: 'MOOD 02',
    title: 'Honeymoon',
    subtitle: 'Quiet sunsets & private stays.',
    humorLine: 'Shaadi done. Ab honeymoon.',
    description: 'Private houseboats, candlelight haveli courtyards, and zero rush.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Kashmir & Udaipur',
    priceFrom: '₹24,999',
    duration: '5N / 6D',
  },
  {
    id: 'family',
    tag: 'MOOD 03',
    title: 'Family',
    subtitle: 'Zero chaos. Everyone happy.',
    humorLine: '12 people. 17 opinions. One itinerary.',
    description: 'Spacious cars, comfortable hotels, and pacing that works for both kids and parents.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Kerala & Rajasthan',
    priceFrom: '₹19,999',
    duration: '6N / 7D',
  },
  {
    id: 'adventure',
    tag: 'MOOD 04',
    title: 'Adventure',
    subtitle: 'Passes, roads & raw terrain.',
    humorLine: 'Where regular buses don’t go.',
    description: 'High mountain passes, living root bridges, and trails where tourists do not go.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Ladakh & Spiti Circuit',
    priceFrom: '₹31,999',
    duration: '7N / 8D',
  },
  {
    id: 'friends',
    tag: 'MOOD 05',
    title: 'Friends',
    subtitle: 'Trips that actually happen.',
    humorLine: 'Stop making plans in WhatsApp. Let’s go.',
    description: 'Campfires, road trips, private villas, and group pricing that makes sense.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Goa & Meghalaya',
    priceFrom: '₹16,999',
    duration: '4N / 5D',
  },
  {
    id: 'slow-travel',
    tag: 'MOOD 06',
    title: 'Slow Travel',
    subtitle: 'Unrushed mornings & local chai.',
    humorLine: 'No 5:00 AM alarms.',
    description: 'Houseboat mornings on mirror canals, village walks, and pure relaxation.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1400&auto=format&fit=crop',
    destinationHint: 'Alleppey & Kashmir',
    priceFrom: '₹22,499',
    duration: '6N / 7D',
  },
];

export interface ContactPhoto {
  id: string;
  title: string;
  category: string;
  location: string;
  time: string;
  aspect: 'portrait' | 'landscape' | 'square' | 'wide';
  image: string;
  photographer: string;
  tilt: number;
  spanCol: number;
}

export const contactSheetPhotos: ContactPhoto[] = [
  {
    id: 'cs-1',
    title: 'Morning Lake Shikara',
    category: 'Quiet Waters',
    location: 'Dal Lake, Kashmir',
    time: '05:40 AM',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Ayan Mukherjee',
    tilt: -1.2,
    spanCol: 1,
  },
  {
    id: 'cs-2',
    title: 'Old Sandstone Alley',
    category: 'Architecture',
    location: 'Jaisalmer, Rajasthan',
    time: '04:20 PM',
    aspect: 'landscape',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1400&auto=format&fit=crop',
    photographer: 'Prateek Gautam',
    tilt: 1.4,
    spanCol: 2,
  },
  {
    id: 'cs-3',
    title: 'Monastery Terrace Walk',
    category: 'Mountains',
    location: 'Thiksey, Ladakh',
    time: '07:15 AM',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Rohit Sharma',
    tilt: -0.8,
    spanCol: 1,
  },
  {
    id: 'cs-4',
    title: 'Palm Waterways Canoe',
    category: 'Backwaters',
    location: 'Alleppey, Kerala',
    time: '06:10 AM',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Navaneeth Kishore',
    tilt: 1.1,
    spanCol: 1,
  },
  {
    id: 'cs-5',
    title: 'Double Root Bridge',
    category: 'Rainforests',
    location: 'Cherrapunji, Meghalaya',
    time: '10:45 AM',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Subham Kar',
    tilt: -1.5,
    spanCol: 1,
  },
  {
    id: 'cs-6',
    title: 'Snow Mountain Ridge',
    category: 'High Peaks',
    location: 'Gulmarg, Kashmir',
    time: '01:30 PM',
    aspect: 'wide',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop',
    photographer: 'Ayan Mukherjee',
    tilt: 0.8,
    spanCol: 2,
  },
  {
    id: 'cs-7',
    title: 'Yellow Street Balcony',
    category: 'Streets',
    location: 'Panaji, Goa',
    time: '03:15 PM',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Shubhankar Sharma',
    tilt: -1.0,
    spanCol: 1,
  },
  {
    id: 'cs-8',
    title: 'Saffron & Spice Market',
    category: 'Food & Bazaar',
    location: 'Old Delhi',
    time: '11:00 AM',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1200&auto=format&fit=crop',
    photographer: 'Prateek Gautam',
    tilt: 1.2,
    spanCol: 1,
  },
];

export interface VariantItineraryDay {
  dayNum: string;
  action: string;
  title: string;
  subtitle: string;
  location: string;
  timing: string;
  experience: string;
  simpleNote: string;
  image: string;
  photographer: string;
}

export const variantItineraryDays: VariantItineraryDay[] = [
  {
    dayNum: '01',
    action: 'ARRIVE',
    title: 'Houseboat Check-in & Evening Shikara',
    subtitle: 'Srinagar Dal Lake',
    location: 'Dal Lake, Srinagar',
    timing: '03:30 PM Pickup & Check-in',
    experience: 'Private airport pickup, settle into your wooden cedar houseboat, and take a sunset shikara ride across calm lotus channels.',
    simpleNote: 'Steaming hot kahwa, walnut wood furniture, and lake water at dusk.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1800&auto=format&fit=crop',
    photographer: 'Ayan Mukherjee',
  },
  {
    dayNum: '02',
    action: 'EXPLORE',
    title: 'Gondola Cable Car to Snow Peak',
    subtitle: 'Gulmarg Phase II',
    location: 'Mount Apharwat · 13,780 ft',
    timing: '08:45 AM Pre-booked Pass',
    experience: 'Zero-line boarding passes for the Gulmarg cable car. Rise above pine glades directly onto snow fields.',
    simpleNote: 'Clear mountain air above the clouds with snowy peaks all around.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1800&auto=format&fit=crop',
    photographer: 'Ayan Mukherjee',
  },
  {
    dayNum: '03',
    action: 'DISCOVER',
    title: 'Riverside Cottage in the Pines',
    subtitle: 'Pahalgam Lidder Valley',
    location: 'Pahalgam, Kashmir',
    timing: '11:00 AM Scenic Drive',
    experience: 'Drive through saffron fields to a quiet riverside chalet by the rushing Lidder river.',
    simpleNote: 'The sound of river water over stones and fresh pine air.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1800&auto=format&fit=crop',
    photographer: 'Prateek Gautam',
  },
  {
    dayNum: '04',
    action: 'RELAX',
    title: 'Village Walk & Kashmiri Dinner',
    subtitle: 'Aru Valley & Old City',
    location: 'Aru Valley & Srinagar',
    timing: '04:00 PM Easy Stroll',
    experience: 'Relaxed stroll through village meadows, visit local woodcraft workshops, and enjoy a traditional Kashmiri dinner.',
    simpleNote: 'No rush, delicious food, and memories to take home.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1800&auto=format&fit=crop',
    photographer: 'Prateek Gautam',
  },
];

export interface BrandStoryPerspective {
  id: string;
  tag: string;
  headline: string;
  text: string;
  image: string;
  location: string;
}

export const brandPerspectives: BrandStoryPerspective[] = [
  {
    id: 'mountains',
    tag: '01 · MOUNTAINS',
    headline: 'High passes & quiet chalets',
    text: 'Not a quick photo from a crowded bus. A wooden chalet where morning chai happens in total silence.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1800&auto=format&fit=crop',
    location: 'Thiksey, Ladakh',
  },
  {
    id: 'waterways',
    tag: '02 · WATERWAYS',
    headline: 'Quiet canals & palm trees',
    text: 'Small wooden canoes gliding through backwaters where big tourist boats can’t fit.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1800&auto=format&fit=crop',
    location: 'Vembanad, Kerala',
  },
  {
    id: 'citadels',
    tag: '03 · CITADELS',
    headline: 'Golden havelis & desert stars',
    text: 'Ancient sandstone palaces where stories are shared over tea by someone who grew up inside the fort.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1800&auto=format&fit=crop',
    location: 'Jaisalmer, Rajasthan',
  },
  {
    id: 'rainforests',
    tag: '04 · RAINFORESTS',
    headline: 'Living root bridges in the clouds',
    text: 'Bridges grown by village ancestors across rushing river streams. Real nature nestled in rainforest mist.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1800&auto=format&fit=crop',
    location: 'Cherrapunji, Meghalaya',
  },
];
