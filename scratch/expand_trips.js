const fs = require('fs');

const newTrips = [
  {
    id: "kashmir-paradise-4d",
    destinationId: "kashmir",
    destination: "Kashmir",
    title: "Paradise of Kashmir Short Getaway",
    subtitle: "Dal Lake shikaras, Gulmarg alpine gondola & saffron valleys",
    shortDescription: "A curated 4-night Himalayan escape featuring private houseboat stays on Dal Lake, scenic meadow walks in Gulmarg, and saffron trails in Pampore.",
    longDescription: "Designed for a high-impact, refreshing mountain retreat. Wake up to the gentle lap of Dal Lake waters on a heritage cedar houseboat, glide across floating markets, and ascend to snow-dusted ridges on the Apharwat Gondola in Gulmarg.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 15500,
    isPriceOnRequest: false,
    rating: 4.8,
    reviewCount: 96,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop",
      alt: "Morning shikara ride on serene Dal Lake Srinagar",
      location: "Dal Lake, Srinagar"
    },
    route: "Srinagar → Gulmarg → Srinagar",
    inclusions: [
      "4 Nights in Verified Cedar Houseboats & Boutique Hotels",
      "Daily Breakfast & Warm Traditional Dinners",
      "Dedicated Private Chauffeur for All Transfers",
      "Sunset Shikara Ride on Dal Lake",
      "Gondola Phase 1 & 2 Assistance"
    ],
    highlights: [
      "Cedar Houseboat Stay",
      "Gulmarg Gondola Pass",
      "Pampore Saffron Fields"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/paradise-of-kashmir",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Paradise of Kashmir (4N/5D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Arrival in Srinagar & Dal Lake Houseboat", location: "Srinagar", description: "Pickup at airport, check-in to heritage cedar houseboat, evening Shikara ride." },
      { dayNumber: 2, title: "Srinagar to Gulmarg Alpine Day", location: "Gulmarg", description: "Drive through pine groves, ride Gondola to Apharwat peak, stroll meadow chalets." },
      { dayNumber: 3, title: "Mughal Gardens & Old Srinagar Bazaar", location: "Srinagar", description: "Explore Shalimar and Nishat Bagh, Hazratbal shrine, and artisanal copper workshops." },
      { dayNumber: 4, title: "Day Excursion to Doodhpathri Valley", location: "Doodhpathri", description: "Visit the untouched milky stream valley surrounded by deodar forests." },
      { dayNumber: 5, title: "Departure from Srinagar", location: "Srinagar", description: "Morning kahwa tea and transfer to Srinagar Airport." }
    ]
  },
  {
    id: "kashmir-awesome-6d",
    destinationId: "kashmir",
    destination: "Kashmir",
    title: "Awesome Kashmir Valley Circuit",
    subtitle: "Lidder River chalets, Sonamarg glaciers & Gulmarg snow meadows",
    shortDescription: "A comprehensive 5-night journey exploring Srinagar, Pahalgam's Betaab valley, Sonamarg's Thajiwas glacier, and Gulmarg's high peaks.",
    longDescription: "Immerse yourself in Kashmir's most celebrated landscapes. From the tranquil waters of Dal Lake to the roaring rapids of the Lidder River and the golden meadows of Sonamarg.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 18500,
    isPriceOnRequest: false,
    rating: 4.9,
    reviewCount: 112,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop",
      alt: "Alpine snow peaks in Gulmarg Kashmir",
      location: "Gulmarg, Kashmir"
    },
    route: "Srinagar → Pahalgam → Gulmarg → Sonamarg",
    inclusions: [
      "5 Nights in Handpicked Luxury Cottages & Houseboats",
      "Buffet Breakfast & Kashmiri Dinners",
      "Private Chauffeur Vehicle for All Days",
      "Betaab Valley & Aru Valley Sightseeing",
      "Shikara Ride & Floating Market Tour"
    ],
    highlights: [
      "Thajiwas Glacier Walk",
      "Betaab Valley Chalets",
      "Gulmarg Gondola Ride"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/awesome-kashmir",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Awesome Kashmir (5N/6D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Srinagar Arrival & Dal Lake Stays", location: "Srinagar", description: "Check into houseboat and sunset shikara ride." },
      { dayNumber: 2, title: "Srinagar to Pahalgam Valley of Shepherds", location: "Pahalgam", description: "Scenic drive via saffron fields and Lidder river banks." },
      { dayNumber: 3, title: "Aru Valley & Betaab Valley Exploration", location: "Pahalgam", description: "Visit scenic filming meadows and pine forest trails." },
      { dayNumber: 4, title: "Pahalgam to Gulmarg Alpine Meadows", location: "Gulmarg", description: "Gondola cable car ride to Apharwat peak." },
      { dayNumber: 5, title: "Day Trip to Sonamarg Golden Meadow", location: "Sonamarg", description: "Pony trek or walk to Thajiwas Glacier." },
      { dayNumber: 6, title: "Farewell Kashmir & Airport Transfer", location: "Srinagar", description: "Transfer to Srinagar Airport for onward journey." }
    ]
  },
  {
    id: "kashmir-circle-6d",
    destinationId: "kashmir",
    destination: "Kashmir",
    title: "Kashmir Grand Scenic Circle",
    subtitle: "Complete valley loop with Yusmarg meadows, Pahalgam & Gulmarg",
    shortDescription: "A circular valley trail uncovering both famous mountain stops and offbeat meadows like Yusmarg and Nilnag Lake.",
    longDescription: "Travel in a full panoramic circle through the heart of Kashmir. Experience Yusmarg's quiet pine glades, Pahalgam's pine rivers, and Gulmarg's high gondola passes.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 19200,
    isPriceOnRequest: false,
    rating: 4.8,
    reviewCount: 78,
    category: "Offbeat",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop",
      alt: "Pahalgam riverside valley and pine forests",
      location: "Pahalgam, Kashmir"
    },
    route: "Srinagar → Yusmarg → Pahalgam → Gulmarg",
    inclusions: [
      "5 Nights in Boutique Mountain Resorts",
      "Breakfast & Traditional Kashmiri Dinners",
      "Dedicated AC Chauffeur Vehicle",
      "Yusmarg & Nilnag Lake Excursion",
      "Pahalgam Valley Entry Passes"
    ],
    highlights: [
      "Yusmarg Meadow Walks",
      "Lidder River Camping",
      "Cedar Houseboat Experience"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/kashmir-circle",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Kashmir Circle (5N/6D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Arrival in Srinagar & Nigeen Lake", location: "Srinagar", description: "Houseboat check-in and heritage lake tour." },
      { dayNumber: 2, title: "Yusmarg Meadows of Jesus Day Tour", location: "Yusmarg", description: "Walk through untouched green pastures and Doodh Ganga." },
      { dayNumber: 3, title: "Scenic Transfer to Pahalgam", location: "Pahalgam", description: "Check into riverside alpine resort." },
      { dayNumber: 4, title: "Pahalgam to Gulmarg Gondola Base", location: "Gulmarg", description: "Mountain drive and high gondola ride." },
      { dayNumber: 5, title: "Sonamarg Glacial Valley Exploration", location: "Sonamarg", description: "Thajiwas glacier trails and return to Srinagar." },
      { dayNumber: 6, title: "Airport Drop & Return", location: "Srinagar", description: "Souvenir shopping and airport drop." }
    ]
  },
  {
    id: "kashmir-triangle-5d",
    destinationId: "kashmir",
    destination: "Kashmir",
    title: "Kashmir Golden Triangle Express",
    subtitle: "Srinagar, Gulmarg & Pahalgam curated in 5 days",
    shortDescription: "The essential Kashmir triad connecting Srinagar's tranquil lakes, Gulmarg's high peaks, and Pahalgam's pine rivers.",
    longDescription: "A well-paced 4-night escape hitting the top 3 jewels of Kashmir with seamless private chauffeur logistics and premium stays.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 14900,
    isPriceOnRequest: false,
    rating: 4.7,
    reviewCount: 84,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1600&auto=format&fit=crop",
      alt: "Dal Lake houseboats Srinagar",
      location: "Srinagar, Kashmir"
    },
    route: "Srinagar → Gulmarg → Pahalgam",
    inclusions: [
      "4 Nights in Verified Deluxe Stays",
      "Daily Breakfast & Dinners",
      "Private Chauffeur Car for All Routes",
      "Dal Lake Shikara Ride"
    ],
    highlights: [
      "Dal Lake Houseboat",
      "Gulmarg Gondola Ride",
      "Lidder River Walks"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/kashmir-triangle",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Kashmir Triangle (4N/5D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Srinagar Arrival & Houseboat", location: "Srinagar", description: "Houseboat check-in and evening shikara." },
      { dayNumber: 2, title: "Gulmarg Day Trip", location: "Gulmarg", description: "Gondola cable car and meadow walk." },
      { dayNumber: 3, title: "Pahalgam Valley Stay", location: "Pahalgam", description: "Lidder riverbank chalet check-in." },
      { dayNumber: 4, title: "Betaab Valley & Return to Srinagar", location: "Srinagar", description: "Sightseeing and evening boulevard walk." },
      { dayNumber: 5, title: "Srinagar Airport Departure", location: "Srinagar", description: "Transfer to airport." }
    ]
  },
  {
    id: "ladakh-turtuk-siachen-9d",
    destinationId: "ladakh",
    destination: "Ladakh",
    title: "Ladakh with Turtuk & Siachen Base Camp",
    subtitle: "Balti heritage, Nubra sand dunes, Siachen border & Pangong Tso",
    shortDescription: "A border expedition traversing Khardung La to the Balti village of Turtuk, OP Baba shrine at Siachen Base Camp, and azure Pangong Lake.",
    longDescription: "Venture deep into the northernmost frontier of India. Ride across Khardung La (17,982 ft), stay in the apricot orchards of Turtuk, visit the gateway to Siachen Glacier, and camp under star-filled skies at Pangong Tso.",
    durationNights: 8,
    durationDays: 9,
    pricePerPerson: 27900,
    isPriceOnRequest: false,
    rating: 4.9,
    reviewCount: 92,
    category: "Adventure",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1600&auto=format&fit=crop",
      alt: "Nubra Valley sand dunes Ladakh",
      location: "Nubra Valley, Ladakh"
    },
    route: "Leh → Nubra → Turtuk → Siachen Base Camp → Pangong Tso → Leh",
    inclusions: [
      "8 Nights in Handpicked Luxury Camps & Boutique Stays",
      "Breakfast & Dinners for All Days",
      "Dedicated 4x4 or Tempo Traveler with Experienced Driver",
      "Inner Line Permits & Siachen Base Camp Clearances",
      "Oxygen Cylinder & High Altitude Safety Support"
    ],
    highlights: [
      "Turtuk Balti Village Walk",
      "Siachen Glacier Gateway",
      "Pangong Lake Camping"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/ladakh-turtuk-siachen",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Ladakh with Turtuk & Siachen Base Camp (8N/9D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Arrival in Leh & Acclimatization", location: "Leh", description: "Rest and acclimatize to 11,500 ft. Evening Shanti Stupa visit." },
      { dayNumber: 2, title: "Sham Valley Monasteries & Magnetic Hill", location: "Leh", description: "Visit Sangam confluence, Magnetic Hill, and Hall of Fame." },
      { dayNumber: 3, title: "Leh to Nubra Valley via Khardung La", location: "Nubra Valley", description: "Cross 17,982 ft Khardung La pass. Hunder double-humped camel safari." },
      { dayNumber: 4, title: "Nubra to Turtuk Border Village", location: "Turtuk", description: "Explore the last Indian village before LoC with rich Balti culture and apricot trees." },
      { dayNumber: 5, title: "Turtuk to Siachen Base Camp & Panamik", location: "Panamik", description: "Visit the Siachen War Memorial and hot sulfur springs." },
      { dayNumber: 6, title: "Nubra to Pangong Tso via Shyok River", location: "Pangong Tso", description: "Off-road along the Shyok canyon to the vibrant cobalt lake." },
      { dayNumber: 7, title: "Pangong Sunrise to Hanle Dark Sky Reserve", location: "Hanle", description: "Drive across Chushul to India's premier astronomical dark sky reserve." },
      { dayNumber: 8, title: "Hanle to Leh via Chang La", location: "Leh", description: "Cross 17,590 ft Chang La pass and visit Thiksey Monastery." },
      { dayNumber: 9, title: "Departure from Leh", location: "Leh", description: "Airport drop for flight back home." }
    ]
  },
  {
    id: "ladakh-zanskar-shinkula-10d",
    destinationId: "ladakh",
    destination: "Ladakh",
    title: "Zanskar Valley & Shinku La Expedition",
    subtitle: "Phugtal cliff monastery, Gonbo Rangjon monolith & Padum",
    shortDescription: "An adventurous trans-Himalayan expedition into the mystical heart of Zanskar across the 16,580 ft Shinku La pass.",
    longDescription: "Embark on one of the ultimate offbeat Himalayan road journeys. Experience the hanging honey-comb Phugtal Monastery, sacred Gonbo Rangjon peak, Drang Drung Glacier, and traditional Zanskari villages.",
    durationNights: 9,
    durationDays: 10,
    pricePerPerson: 32000,
    isPriceOnRequest: false,
    rating: 4.9,
    reviewCount: 64,
    category: "Adventure",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1600&auto=format&fit=crop",
      alt: "Zanskar Valley dramatic cliffs",
      location: "Zanskar, Ladakh"
    },
    route: "Manali → Jispa → Shinku La → Padum → Phugtal → Kargil → Leh",
    inclusions: [
      "9 Nights in Homestays, Camps & Verified Hotels",
      "All Meals in Zanskar Region",
      "Specially Modified 4x4 Expedition Vehicles",
      "Inner Line Permits & Monastery Entry Fees",
      "Experienced Expedition Leader"
    ],
    highlights: [
      "Phugtal Cliff Monastery Trek",
      "Gonbo Rangjon Monolith",
      "Drang Drung Glacier Vista"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/ladakh-zanskar-valley",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Ladakh with Zanskar Valley (9N/10D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Manali Arrival & Jispa Drive", location: "Jispa", description: "Cross Atal Tunnel into Lahaul valley." },
      { dayNumber: 2, title: "Jispa to Purne across Shinku La (16,580 ft)", location: "Purne", description: "Drive past the monumental Gonbo Rangjon rock into Zanskar." },
      { dayNumber: 3, title: "Day Trek to Cliffside Phugtal Gompa", location: "Phugtal", description: "Hike to the ancient monastery built into a limestone cliff cave." },
      { dayNumber: 4, title: "Purne to Padum Capital of Zanskar", location: "Padum", description: "Explore Karsha Monastery and Stongdey Gompa." },
      { dayNumber: 5, title: "Padum to Rangdum via Drang Drung Glacier", location: "Rangdum", description: "Spectacular views of massive winding ice rivers and Nun-Kun peaks." },
      { dayNumber: 6, title: "Rangdum to Kargil", location: "Kargil", description: "Descend Suru Valley past green apricoted hamlets." },
      { dayNumber: 7, title: "Kargil to Leh via Lamayuru Moonland", location: "Leh", description: "Visit ancient Lamayuru Monastery and Magnetic Hill." },
      { dayNumber: 8, title: "Leh to Pangong Tso Lake", location: "Pangong Tso", description: "Cross Chang La to camp alongside the brilliant blue waters." },
      { dayNumber: 9, title: "Pangong to Leh", location: "Leh", description: "Return to Leh for celebratory dinner and market stroll." },
      { dayNumber: 10, title: "Departure from Leh Airport", location: "Leh", description: "Drop at Kushok Bakula Rimpochee Airport." }
    ]
  },
  {
    id: "spiti-pin-valley-mudh-9d",
    destinationId: "spiti",
    destination: "Spiti Valley",
    title: "Spiti Valley with Pin Valley & Mudh Village",
    subtitle: "Snow leopard sanctuary, Mudh red cliffs, Key Gompa & Chandratal",
    shortDescription: "An extended high-altitude Spiti circuit featuring the national park of Pin Valley, traditional Mudh village, Dhankar cliff gompa, and Chandratal Lake.",
    longDescription: "Go beyond the standard Spiti route into the dramatic Pin Valley National Park. Experience Buddhist cliff sanctuaries, high fossil villages of Langza and Komik, and camp alongside Chandratal.",
    durationNights: 8,
    durationDays: 9,
    pricePerPerson: 21900,
    isPriceOnRequest: false,
    rating: 4.8,
    reviewCount: 76,
    category: "Adventure",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop",
      alt: "Pin Valley snowy peaks Spiti",
      location: "Pin Valley, Spiti"
    },
    route: "Shimla → Kalpa → Tabo → Pin Valley → Kaza → Chandratal → Manali",
    inclusions: [
      "8 Nights in Verified Homestays & High-Altitude Camps",
      "Breakfast & Dinners Across All Stops",
      "Dedicated High-Clearance 4x4 or Tempo",
      "Pin Valley & Chandratal Permits",
      "Oxygen Cylinder & Emergency Medical Kit"
    ],
    highlights: [
      "Pin Valley & Mudh Village",
      "1,000-Yr Key Gompa",
      "Chandratal Glacial Camp"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/spiti-pin-valley",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Spiti Valley with Pin Valley (8N/9D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Shimla to Sarahan / Narkanda", location: "Sarahan", description: "Drive through apple orchards and visit Bhimakali Temple." },
      { dayNumber: 2, title: "Sarahan to Kalpa with Kinner Kailash Vista", location: "Kalpa", description: "Scenic Kinnaur road past Roghi cliff point." },
      { dayNumber: 3, title: "Kalpa to Tabo 1,000-Year Monastery", location: "Tabo", description: "Enter Spiti, visit Tabo's ancient mud frescoes." },
      { dayNumber: 4, title: "Tabo to Mudh Village in Pin Valley", location: "Pin Valley", description: "Explore the colorful mineral canyons of Pin Valley." },
      { dayNumber: 5, title: "Pin Valley to Kaza via Dhankar Monastery", location: "Kaza", description: "Visit cliffside Dhankar Gompa and scenic lake." },
      { dayNumber: 6, title: "Hikkim, Komic & Langza Fossil Village", location: "Kaza", description: "World's highest post office and giant Buddha statue." },
      { dayNumber: 7, title: "Kaza to Key Monastery & Chandratal Lake", location: "Chandratal", description: "Explore 1,000-year Key Gompa and camp near Chandratal." },
      { dayNumber: 8, title: "Chandratal to Manali across Kunzum & Rohtang", location: "Manali", description: "Drive through Kunzum Pass (14,931 ft) to Manali." },
      { dayNumber: 9, title: "Manali to Delhi Onward Journey", location: "Manali", description: "Morning stroll in Old Manali and evening departure." }
    ]
  },
  {
    id: "meghalaya-caving-adventure-6d",
    destinationId: "meghalaya",
    destination: "Meghalaya",
    title: "Meghalaya Caving & Extreme Waterfalls",
    subtitle: "Mawsmai & Krem Puri cave exploration, Wei Sawdong & rainbow falls",
    shortDescription: "An adventurous 5-night Meghalaya itinerary focused on limestone caving expeditions, river canyoning, and hidden multi-tier waterfalls.",
    longDescription: "Step off the beaten trail into Meghalaya's deepest subterranean caverns and clearest river canyons. Experience the living root bridges, Krem Mawmluh caves, and Dawki's transparent waters.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 17500,
    isPriceOnRequest: false,
    rating: 4.9,
    reviewCount: 58,
    category: "Adventure",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop",
      alt: "Meghalaya rainforest waterfalls",
      location: "Cherrapunji, Meghalaya"
    },
    route: "Guwahati → Shillong → Cherrapunji → Shnongpdeng → Mawlynnong",
    inclusions: [
      "5 Nights in Eco-Lodges & Riverside Swiss Tents",
      "Daily Breakfast & Dinners",
      "Caving Equipment, Helmets & Certified Cave Guides",
      "Double Decker Root Bridge & Rainbow Falls Trek",
      "Dawki Cliff Jumping & River Kayaking"
    ],
    highlights: [
      "Krem Mawmluh Caving",
      "Double Decker Root Bridge",
      "Wei Sawdong 3-Tier Falls"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/meghalaya-caving",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Meghalaya Caving & Waterfalls (5N/6D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Guwahati to Shillong Scotland of the East", location: "Shillong", description: "Visit Umiam Lake and Police Bazar." },
      { dayNumber: 2, title: "Shillong to Cherrapunji Waterfalls", location: "Cherrapunji", description: "Nohkalikai Falls, Wei Sawdong 3-tier cascade." },
      { dayNumber: 3, title: "Double Decker Root Bridge & Rainbow Falls Trek", location: "Nongriat", description: "Hike 3,500 stone steps into the deep emerald rainforest." },
      { dayNumber: 4, title: "Krem Mawmluh Caving & Mawsmai", location: "Cherrapunji", description: "Equipped cave exploration through underground rivers." },
      { dayNumber: 5, title: "Dawki Glass River & Shnongpdeng Camping", location: "Shnongpdeng", description: "Boating on transparent Umngot River and riverside bonfire." },
      { dayNumber: 6, title: "Mawlynnong Cleanest Village to Guwahati", location: "Guwahati", description: "Living root bridge and airport drop." }
    ]
  },
  {
    id: "tawang-kaziranga-circuit-8d",
    destinationId: "tawang",
    destination: "Tawang & Arunachal",
    title: "Tawang High Passes & Kaziranga Safari Circuit",
    subtitle: "One-horned rhino safari, Sela Pass & 400-year-old Tawang Gompa",
    shortDescription: "A grand 7-night Northeast expedition uniting UNESCO Kaziranga National Park's rhino grasslands with the snow peaks and Buddhist monasteries of Tawang.",
    longDescription: "From the fertile tea plains of Assam to the 13,700 ft Sela Pass in Arunachal Pradesh. Spot one-horned rhinos on elephant safari, visit the ancient Tawang Monastery, and gaze upon glacial Madhuri Lake.",
    durationNights: 7,
    durationDays: 8,
    pricePerPerson: 24900,
    isPriceOnRequest: false,
    rating: 4.8,
    reviewCount: 72,
    category: "Signature",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1548013146-72479768bada?q=90&w=1600&auto=format&fit=crop",
      alt: "Tawang monastery snow mountains",
      location: "Tawang, Arunachal Pradesh"
    },
    route: "Guwahati → Kaziranga → Dirang → Sela Pass → Tawang → Bomdila",
    inclusions: [
      "7 Nights in Verified Resorts & Mountain Cottages",
      "Breakfast & Dinners for All Days",
      "Kaziranga Jeep Safari & Elephant Safari Passes",
      "Arunachal Inner Line Permit (ILP) Clearance",
      "Dedicated Private Chauffeur Vehicle"
    ],
    highlights: [
      "Kaziranga Rhino Safari",
      "Sela Pass (13,700 ft)",
      "400-Year Tawang Gompa"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/tours/tawang-kaziranga",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Tawang & Kaziranga Wildlife (7N/8D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Guwahati to Kaziranga National Park", location: "Kaziranga", description: "Drive past Assam tea estates. Evening cultural dance." },
      { dayNumber: 2, title: "Kaziranga Morning Safari to Bhalukpong", location: "Bhalukpong", description: "Jeep safari to spot one-horned rhinos, wild elephants." },
      { dayNumber: 3, title: "Bhalukpong to Dirang Valley", location: "Dirang", description: "Visit Dirang Dzong, hot water spring, and kiwi orchards." },
      { dayNumber: 4, title: "Dirang to Tawang via Sela Pass (13,700 ft)", location: "Tawang", description: "Drive across frozen Sela Lake and Jaswant Garh war memorial." },
      { dayNumber: 5, title: "Tawang Monastery & Madhuri Lake Tour", location: "Tawang", description: "Explore Asia's 2nd largest monastery and PT Tso Lake." },
      { dayNumber: 6, title: "Tawang to Bomdila", location: "Bomdila", description: "Visit Nuranang Waterfalls (Jung Falls) and Bomdila Monastery." },
      { dayNumber: 7, title: "Bomdila to Guwahati", location: "Guwahati", description: "Scenic descent to the Brahmaputra valley." },
      { dayNumber: 8, title: "Kamakhya Temple & Airport Drop", location: "Guwahati", description: "Visit Kamakhya Devi Temple and airport drop." }
    ]
  },
  {
    id: "himachal-hampta-chandratal-6d",
    destinationId: "himachal",
    destination: "Himachal Pradesh",
    title: "Hampta Pass & Chandratal Glacial Trek",
    subtitle: "Lush Kullu valley crossover to Spiti moonscape & moon lake",
    shortDescription: "A dramatic 5-night Himalayan crossover trek from the green fir forests of Manali across 14,065 ft Hampta Pass into the arid moonscape of Chandratal.",
    longDescription: "One of India's most dramatic landscape transitions. Walk along flower-filled meadows in Jobra and Balu Ka Ghera, conquer the pass summit, and pitch tents beside turquoise Chandratal Lake.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 11500,
    isPriceOnRequest: false,
    rating: 4.9,
    reviewCount: 138,
    category: "Trekking",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=90&w=1600&auto=format&fit=crop",
      alt: "Hampta Pass crossover view",
      location: "Hampta Pass, Himachal"
    },
    route: "Manali → Jobra → Balu Ka Ghera → Hampta Pass → Shea Goru → Chandratal",
    inclusions: [
      "5 Nights in Alpine Dome Tents & Sleeping Bags",
      "All Nutritious Vegetarian Trek Meals",
      "Certified Mountaineering Guides & Support Staff",
      "Forest Permits & Camping Charges",
      "4x4 Transfer from Shea Goru to Chandratal & Manali"
    ],
    highlights: [
      "14,065 ft Hampta Pass Summit",
      "Lush to Desert Crossover",
      "Chandratal Glacial Camping"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/trek/hampta-pass-chandratal",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Hampta Pass + Chandratal Camping (5N/6D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Manali to Jobra Drive & Trek to Chika", location: "Chika", description: "Drive through 42 hairpin bends to Jobra, trek through pine forest to Chika." },
      { dayNumber: 2, title: "Chika to Balu Ka Ghera Valley", location: "Balu Ka Ghera", description: "Trek along the river bed surrounded by wildflowers." },
      { dayNumber: 3, title: "Balu Ka Ghera to Shea Goru via Hampta Pass (14,065 ft)", location: "Hampta Pass", description: "Challenging ascent to the pass with panoramic views of Indrasan peak." },
      { dayNumber: 4, title: "Shea Goru to Chatru & Drive to Chandratal", location: "Chandratal", description: "River crossing and 4x4 drive to the crescent moon lake." },
      { dayNumber: 5, title: "Chandratal Sunrise & Drive to Manali via Atal Tunnel", location: "Manali", description: "Photography by the lake and drive back to Manali." },
      { dayNumber: 6, title: "Departure from Manali", location: "Manali", description: "Rest and evening bus to Delhi." }
    ]
  },
  {
    id: "himachal-malana-magic-valley-4d",
    destinationId: "himachal",
    destination: "Himachal Pradesh",
    title: "Malana & Magic Valley Alpine Trek",
    subtitle: "Ancient democratic village, Waichin valley & glacier streams",
    shortDescription: "An offbeat 3-night Parvati trek uncovering the ancient Greek-descendant village of Malana and the secluded alpine heights of Waichin Magic Valley.",
    longDescription: "Escape the tourist crowds into the serene heights above Kasol. Hike to the historic village of Malana, camp under starlit skies in Magic Valley, and enjoy crystal waterfall pools.",
    durationNights: 3,
    durationDays: 4,
    pricePerPerson: 7490,
    isPriceOnRequest: false,
    rating: 4.7,
    reviewCount: 65,
    category: "Trekking",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=90&w=1600&auto=format&fit=crop",
      alt: "Magic Valley Parvati pine mountains",
      location: "Parvati Valley, Himachal"
    },
    route: "Kasol → Jari → Malana Dam → Magic Valley (Waichin) → Kasol",
    inclusions: [
      "3 Nights in Alpine Tents & Wooden Chalets",
      "Daily Breakfast & Dinners",
      "Experienced Local Trek Leader",
      "Campfire Sessions in Magic Valley",
      "Local Transportation from Kasol"
    ],
    highlights: [
      "Ancient Malana Village",
      "Magic Valley Camping",
      "Parvati River Chill Stays"
    ],
    sourceMetadata: {
      sourceName: "International Youth Club",
      sourceUrl: "https://internationalyouthclub.org/trek/malana-magic-valley",
      sourceCheckedAt: "2026-08-22",
      source: "IYC",
      sourcePackageName: "Malana & Magic Valley Trek (3N/4D)"
    },
    itinerary: [
      { dayNumber: 1, title: "Kasol Arrival & Chalal River Trail", location: "Kasol", description: "Café hopping and riverside walks along Parvati River." },
      { dayNumber: 2, title: "Drive to Malana Dam & Trek to Magic Valley", location: "Magic Valley", description: "Hike up the secluded canyon to Waichin Valley camping ground." },
      { dayNumber: 3, title: "Explore Glacier Streams & Malana Village", location: "Malana", description: "Visit the historic village with unique customs and Jamlu Devta temple." },
      { dayNumber: 4, title: "Trek Down & Departure from Kasol", location: "Kasol", description: "Descent to dam and return to Kasol for onward journey." }
    ]
  },
  {
    id: "south-india-delights-10d",
    destinationId: "south-india",
    destination: "South India",
    title: "South India Delights Grand Circuit",
    subtitle: "Tirupati, Mysore Palace, Ooty Nilgiris, Madurai & Kanyakumari",
    shortDescription: "A landmark 9-night voyage through South India connecting sacred temples, royal palaces, misty tea hills, and the ocean confluence at Cape Comorin.",
    longDescription: "An all-encompassing South Indian pilgrimage and hill tour. Marvel at Tirupati Balaji, the illuminated Mysore Palace, Ooty's toy train, Madurai Meenakshi Temple, and ocean sunsets at Kanyakumari.",
    durationNights: 9,
    durationDays: 10,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 104,
    category: "Heritage",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Meenakshi Amman Temple Madurai",
      location: "Madurai, Tamil Nadu"
    },
    route: "Bangalore → Tirupati → Mysore → Ooty → Madurai → Rameshwaram → Kanyakumari",
    inclusions: [
      "9 Nights in Handpicked Premium Heritage & Hill Stays",
      "Buffet Breakfast & Traditional Dinners",
      "Dedicated Private AC Vehicle for Entire Circuit",
      "Temple Darshan & Sightseeing Passes",
      "Ooty Nilgiri Toy Train Booking Assistance"
    ],
    highlights: [
      "Mysore Royal Palace",
      "Madurai Meenakshi Temple",
      "Kanyakumari Ocean Confluence"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/south-india-delights",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "South India Delights Tour (09 Nights / 10 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore Arrival & Sightseeing", location: "Bangalore", description: "Visit Lalbagh Botanical Garden and Vidhana Soudha." },
      { dayNumber: 2, title: "Bangalore to Tirupati Balaji", location: "Tirupati", description: "Drive to sacred Tirumala hills for darshan." },
      { dayNumber: 3, title: "Tirupati to Mysore Cultural Capital", location: "Mysore", description: "Visit Chamundi Hills and illuminated Mysore Palace." },
      { dayNumber: 4, title: "Mysore to Ooty Queen of Hill Stations", location: "Ooty", description: "Drive through Bandipur and Mudumalai forests." },
      { dayNumber: 5, title: "Ooty & Coonoor Tea Estates", location: "Ooty", description: "Nilgiri Mountain Railway ride, Botanical Gardens, Doddabetta Peak." },
      { dayNumber: 6, title: "Ooty to Madurai Temple City", location: "Madurai", description: "Evening darshan at 2,500-year-old Meenakshi Amman Temple." },
      { dayNumber: 7, title: "Madurai to Rameshwaram Island", location: "Rameshwaram", description: "Cross Pamban Bridge, visit Ramanathaswamy Temple and Dhanushkodi." },
      { dayNumber: 8, title: "Rameshwaram to Kanyakumari", location: "Kanyakumari", description: "Vivekananda Rock Memorial and sunset at Triveni Sangam." },
      { dayNumber: 9, title: "Kanyakumari to Trivandrum / Kovalam", location: "Kovalam", description: "Relax at Kovalam lighthouse beach." },
      { dayNumber: 10, title: "Trivandrum Departure", location: "Trivandrum", description: "Airport/railway station drop." }
    ]
  },
  {
    id: "south-colors-of-south-10d",
    destinationId: "south-india",
    destination: "South India",
    title: "Colors of South India Circuit",
    subtitle: "Bangalore tech, Coorg coffee, Mysore royalty, Ooty hills & Madurai",
    shortDescription: "A scenic 9-night South Indian odyssey combining coffee plantation stays in Coorg, palaces in Mysore, Nilgiri hills in Ooty, and temple art in Madurai.",
    longDescription: "Experience the vibrant contrasts of southern India. Wander through lush Coorg coffee estates, marvel at the golden Mysore Palace, breathe fresh pine air in Ooty, and explore temple architecture in Madurai.",
    durationNights: 9,
    durationDays: 10,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 88,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop",
      alt: "Coorg coffee plantation hills",
      location: "Coorg, Karnataka"
    },
    route: "Bangalore → Coorg → Mysore → Ooty → Madurai",
    inclusions: [
      "9 Nights in Verified Plantation Bungalows & Resorts",
      "Daily Breakfast & Dinners",
      "Private AC Chauffeur Car for All Transfers",
      "Coffee Estate Walking Tour & Tasting",
      "Mysore Palace & Ooty Sightseeing"
    ],
    highlights: [
      "Coorg Coffee Estate Stay",
      "Nilgiri Toy Train Ride",
      "Mysore Palace Illuminations"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/colors-of-south",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Colors of South (09 Nights / 10 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore Arrival", location: "Bangalore", description: "Pickup and check-in to boutique stay." },
      { dayNumber: 2, title: "Bangalore to Coorg Scotland of India", location: "Coorg", description: "Visit Bylakuppe Tibetan Monastery and Dubare Elephant Camp." },
      { dayNumber: 3, title: "Coorg Coffee Trails & Abbey Falls", location: "Coorg", description: "Plantation walk, Abbey Falls, and Raja's Seat sunset." },
      { dayNumber: 4, title: "Coorg to Mysore Royal City", location: "Mysore", description: "Visit Mysore Palace and Brindavan Gardens." },
      { dayNumber: 5, title: "Mysore to Ooty Hills", location: "Ooty", description: "Drive through Bandipur Tiger Reserve." },
      { dayNumber: 6, title: "Ooty Lake & Coonoor Tea Slopes", location: "Ooty", description: "Sim's Park, Dolphin's Nose, and tea factory tour." },
      { dayNumber: 7, title: "Ooty to Kodaikanal Princess of Hill Stations", location: "Kodaikanal", description: "Scenic mountain transfer past Palani hills." },
      { dayNumber: 8, title: "Kodaikanal Lake & Pillar Rocks", location: "Kodaikanal", description: "Boating on Kodai Lake, Coaker's Walk, and Pillar Rocks." },
      { dayNumber: 9, title: "Kodaikanal to Madurai", location: "Madurai", description: "Meenakshi Temple evening aarti and bazaar walk." },
      { dayNumber: 10, title: "Madurai Departure", location: "Madurai", description: "Drop at Madurai Airport / Railway Station." }
    ]
  },
  {
    id: "south-culture-cum-beach-7d",
    destinationId: "south-india",
    destination: "South India",
    title: "South Indian Culture & Beach Tour",
    subtitle: "Madurai temples, Rameshwaram island, Kanyakumari cape & Kovalam beach",
    shortDescription: "A 6-night journey blending ancient Dravidian temple architecture with coastal beach sunsets along the southern tip of India.",
    longDescription: "From the towering gopurams of Madurai to the sacred island of Rameshwaram, the three-ocean confluence at Kanyakumari, and the golden shores of Kovalam beach.",
    durationNights: 6,
    durationDays: 7,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 74,
    category: "Beach",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop",
      alt: "Kovalam beach lighthouse sunset",
      location: "Kovalam, Kerala"
    },
    route: "Madurai → Rameshwaram → Kanyakumari → Kovalam → Trivandrum",
    inclusions: [
      "6 Nights in Verified 4-Star Beach & Heritage Stays",
      "Daily Breakfast & Dinners",
      "Dedicated Private AC Chauffeur Vehicle",
      "Rameshwaram Pamban Bridge & Dhanushkodi Safari",
      "Kovalam Beachfront Resort Access"
    ],
    highlights: [
      "Madurai Meenakshi Temple",
      "Dhanushkodi Ghost Town",
      "Kovalam Lighthouse Beach"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/culture-cum-beach",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "South Indian Culture cum Beach Tour (06 Nights / 07 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Madurai Arrival & Temple Tour", location: "Madurai", description: "Meenakshi Temple and Thirumalai Nayakkar Palace." },
      { dayNumber: 2, title: "Madurai to Rameshwaram Island", location: "Rameshwaram", description: "Ramanathaswamy Temple 22 holy kunds." },
      { dayNumber: 3, title: "Dhanushkodi Land's End & Kanyakumari", location: "Kanyakumari", description: "Drive past Dhanushkodi ruins and sunset at Cape Comorin." },
      { dayNumber: 4, title: "Kanyakumari Sunrise & Vivekananda Rock", location: "Kanyakumari", description: "Ferry to Vivekananda Memorial and drive to Kovalam." },
      { dayNumber: 5, title: "Kovalam Beach Leisure Day", location: "Kovalam", description: "Relax at Lighthouse Beach and Hawa Beach." },
      { dayNumber: 6, title: "Poovar Island Backwaters & Trivandrum", location: "Trivandrum", description: "Mangrove boat cruise and Padmanabhaswamy Temple." },
      { dayNumber: 7, title: "Trivandrum Airport Departure", location: "Trivandrum", description: "Airport transfer." }
    ]
  },
  {
    id: "south-vacation-to-south-8d",
    destinationId: "south-india",
    destination: "South India",
    title: "A Vacation to South India",
    subtitle: "Bangalore, Mysore, Coorg, Ooty & Kodaikanal hill stations",
    shortDescription: "A complete 7-night hill station circuit exploring the royal heritage of Mysore, coffee estates of Coorg, and misty peaks of Ooty and Kodaikanal.",
    longDescription: "The classic southern hill vacation. Travel through green Western Ghats valleys, stay in coffee estates, ride heritage mountain railways, and boat on misty high-altitude lakes.",
    durationNights: 7,
    durationDays: 8,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 95,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Ooty tea slopes Nilgiris",
      location: "Ooty, Tamil Nadu"
    },
    route: "Bangalore → Mysore → Coorg → Ooty → Kodaikanal",
    inclusions: [
      "7 Nights in Handpicked Hill Resorts",
      "Breakfast & Dinners for All Days",
      "Private AC Chauffeur Vehicle for Entire Route",
      "All Sightseeing & Toll Taxes"
    ],
    highlights: [
      "Mysore Royal Palace",
      "Coorg Coffee Plantations",
      "Kodaikanal Lake Boating"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/vacation-to-south",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "A Vacation to South (07 Nights / 08 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore to Mysore", location: "Mysore", description: "Visit Srirangapatna and illuminated Mysore Palace." },
      { dayNumber: 2, title: "Mysore to Coorg Coffee Hills", location: "Coorg", description: "Tibetan Monastery and Dubare Elephant Camp." },
      { dayNumber: 3, title: "Coorg Plantation & Abbey Falls", location: "Coorg", description: "Coffee walk, Talakaveri, and sunset at Raja's Seat." },
      { dayNumber: 4, title: "Coorg to Ooty Nilgiri Hills", location: "Ooty", description: "Bandipur forest drive and Ooty lake boating." },
      { dayNumber: 5, title: "Ooty & Coonoor Sightseeing", location: "Ooty", description: "Botanical Garden, Doddabetta Peak, and tea estates." },
      { dayNumber: 6, title: "Ooty to Kodaikanal", location: "Kodaikanal", description: "Scenic mountain drive and evening lake walk." },
      { dayNumber: 7, title: "Kodaikanal Pillar Rocks & Waterfalls", location: "Kodaikanal", description: "Silver Cascade, Coaker's Walk, Pillar Rocks." },
      { dayNumber: 8, title: "Kodaikanal to Coimbatore / Bangalore Departure", location: "Coimbatore", description: "Drop at airport." }
    ]
  },
  {
    id: "south-beautiful-journey-9d",
    destinationId: "south-india",
    destination: "South India",
    title: "A Beautiful Journey to South",
    subtitle: "Complete Karnataka & Tamil Nadu hill, forest & heritage loop",
    shortDescription: "An 8-night scenic voyage spanning Bangalore, Coorg, Ooty, Kodaikanal, and the heritage textile city of Coimbatore.",
    longDescription: "An expansive holiday across the lush hills and wildlife sanctuaries of Karnataka and Tamil Nadu. Enjoy plantation retreats, tiger reserve crossings, and mountain railway vistas.",
    durationNights: 8,
    durationDays: 9,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 68,
    category: "Signature",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop",
      alt: "Western Ghats mist hills",
      location: "Coorg, Karnataka"
    },
    route: "Bangalore → Coorg → Ooty → Kodaikanal → Coimbatore",
    inclusions: [
      "8 Nights in Verified Boutique Resorts",
      "Daily Breakfast & Dinners",
      "Dedicated AC Chauffeur Car",
      "Plantation & Lake Tours"
    ],
    highlights: [
      "Coorg Rain Valley",
      "Nilgiri Toy Train",
      "Kodaikanal Pine Forests"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/beautiful-journey",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "A Beautiful Journey to South (08 Nights / 09 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore Arrival & Leisure", location: "Bangalore", description: "City check-in and botanical garden stroll." },
      { dayNumber: 2, title: "Bangalore to Coorg", location: "Coorg", description: "Bylakuppe Golden Temple and coffee estate stay." },
      { dayNumber: 3, title: "Coorg Nature & Waterfalls", location: "Coorg", description: "Abbey Falls, Mandalpatti peak 4x4 drive." },
      { dayNumber: 4, title: "Coorg to Ooty Nilgiris", location: "Ooty", description: "Mudumalai forest drive to Ooty." },
      { dayNumber: 5, title: "Ooty & Coonoor Exploration", location: "Ooty", description: "Toy train, tea plantations, and Dolphin's Nose." },
      { dayNumber: 6, title: "Ooty to Kodaikanal", location: "Kodaikanal", description: "Transfer to Princess of Hill Stations." },
      { dayNumber: 7, title: "Kodaikanal Sightseeing", location: "Kodaikanal", description: "Kodai Lake, Pine Forest, and Guna Caves." },
      { dayNumber: 8, title: "Kodaikanal to Coimbatore", location: "Coimbatore", description: "Visit Adiyogi Shiva Statue and city bazaar." },
      { dayNumber: 9, title: "Coimbatore Departure", location: "Coimbatore", description: "Airport / Railway drop." }
    ]
  },
  {
    id: "south-bangalore-ooty-5d",
    destinationId: "south-india",
    destination: "South India",
    title: "Bangalore & Ooty Nilgiri Getaway",
    subtitle: "Garden city sights, Bandipur forest drive & Coonoor tea slopes",
    shortDescription: "A crisp 4-night escape linking Bangalore's garden architecture with Ooty's cool pine forests and Nilgiri tea estates.",
    longDescription: "Perfect for a refreshing weekend extension. Enjoy Bangalore's palaces and botanical gardens, drive through Bandipur Tiger Reserve, and relax in the cool mountain climate of Ooty.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.7,
    reviewCount: 62,
    category: "Weekend",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Ooty tea slopes",
      location: "Ooty, Tamil Nadu"
    },
    route: "Bangalore → Ooty → Coonoor → Bangalore",
    inclusions: [
      "4 Nights in Verified Deluxe Hotels & Resorts",
      "Daily Breakfast & Dinners",
      "Private AC Chauffeur Vehicle for All Days",
      "Ooty Botanical Gardens & Coonoor Sightseeing"
    ],
    highlights: [
      "Nilgiri Mountain Railway",
      "Coonoor Tea Gardens",
      "Bandipur Forest Crossing"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/bangalore-ooty",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Bangalore Ooty Tour (04 Nights / 05 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore Arrival & City Tour", location: "Bangalore", description: "Lalbagh, Cubbon Park, and Vidhana Soudha." },
      { dayNumber: 2, title: "Bangalore to Ooty Hills", location: "Ooty", description: "Drive through Bandipur Tiger Reserve to Ooty." },
      { dayNumber: 3, title: "Ooty & Coonoor Tea Tour", location: "Ooty", description: "Botanical Garden, Sim's Park, and tea tasting." },
      { dayNumber: 4, title: "Pykara Lake & Waterfalls", location: "Ooty", description: "Boating at Pykara Lake and Shooting Point." },
      { dayNumber: 5, title: "Ooty to Bangalore Departure", location: "Bangalore", description: "Return drive and airport/station drop." }
    ]
  },
  {
    id: "south-mysore-ooty-6d",
    destinationId: "south-india",
    destination: "South India",
    title: "Mysore Palace & Ooty Mountain Escape",
    subtitle: "Wodeyar royal palaces, Chamundi temple, toy train & Coonoor",
    shortDescription: "A 5-night cultural and hill getaway exploring the grand palaces of Mysore and the romantic tea slopes of Ooty.",
    longDescription: "Unite the regal history of Mysore with the pine-scented serenity of the Nilgiris. Visit Mysore Palace, Chamundeshwari Temple, Brindavan Gardens, and Ooty Lake.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 71,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Mysore Palace illuminated night",
      location: "Mysore, Karnataka"
    },
    route: "Bangalore → Mysore → Ooty → Bangalore",
    inclusions: [
      "5 Nights in Verified Heritage & Mountain Stays",
      "Breakfast & Dinners for All Days",
      "Dedicated AC Chauffeur Car",
      "Mysore Palace & Ooty Lake Passes"
    ],
    highlights: [
      "Mysore Palace Illuminations",
      "Doddabetta Peak Vista",
      "Nilgiri Mountain Train"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/mysore-ooty",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Mysore Ooty Tour (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore to Mysore", location: "Mysore", description: "Srirangapatna and Mysore Palace check-in." },
      { dayNumber: 2, title: "Mysore Heritage & Brindavan", location: "Mysore", description: "Chamundi Hills, St. Philomena's Church, Brindavan Gardens." },
      { dayNumber: 3, title: "Mysore to Ooty", location: "Ooty", description: "Drive through Mudumalai forest to Nilgiri hills." },
      { dayNumber: 4, title: "Ooty Botanical & Doddabetta", location: "Ooty", description: "Highest Nilgiri peak and Ooty Lake boating." },
      { dayNumber: 5, title: "Coonoor Tea Estates & Toy Train", location: "Ooty", description: "Heritage toy train ride to Coonoor and Sim's Park." },
      { dayNumber: 6, title: "Ooty to Bangalore Return", location: "Bangalore", description: "Return drive and airport transfer." }
    ]
  },
  {
    id: "south-coorg-mysore-ooty-6d",
    destinationId: "south-india",
    destination: "South India",
    title: "Coorg, Mysore & Ooty Golden Triangle",
    subtitle: "Coffee plantation mist, illuminated palaces & Nilgiri tea hills",
    shortDescription: "A 5-night signature southern triad connecting Coorg's lush rainforests, Mysore's royal heritage, and Ooty's colonial hill charm.",
    longDescription: "The ultimate 5-night circuit of southern Karnataka and Tamil Nadu. Stay in Coorg coffee estates, explore the golden Mysore Palace, and enjoy mountain breezes in Ooty.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 110,
    category: "Signature",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop",
      alt: "Coorg plantation resort",
      location: "Coorg, Karnataka"
    },
    route: "Bangalore → Coorg → Mysore → Ooty → Bangalore",
    inclusions: [
      "5 Nights in Luxury Plantation Stays & Heritage Hotels",
      "Buffet Breakfast & Dinners",
      "Private AC Chauffeur Vehicle for All Transfers",
      "Coffee Estate Tour & Mysore Palace Entry"
    ],
    highlights: [
      "Coorg Coffee Estate Bungalow",
      "Mysore Royal Palace Tour",
      "Ooty Nilgiri Toy Train"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/coorg-mysore-ooty",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Coorg Mysore Ooty Tour (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore to Coorg Coffee Hills", location: "Coorg", description: "Bylakuppe Golden Temple and coffee resort check-in." },
      { dayNumber: 2, title: "Coorg Waterfalls & Raja's Seat", location: "Coorg", description: "Abbey Falls, Talakaveri, and panoramic sunset." },
      { dayNumber: 3, title: "Coorg to Mysore Royal City", location: "Mysore", description: "Mysore Palace and Brindavan musical fountains." },
      { dayNumber: 4, title: "Mysore to Ooty Hill Station", location: "Ooty", description: "Bandipur forest drive and Ooty lake boating." },
      { dayNumber: 5, title: "Ooty & Coonoor Tea Slopes", location: "Ooty", description: "Doddabetta Peak, Tea Factory, and Sim's Park." },
      { dayNumber: 6, title: "Ooty to Bangalore Drop", location: "Bangalore", description: "Return drive to Bangalore." }
    ]
  },
  {
    id: "south-bangalore-mysore-coorg-5d",
    destinationId: "south-india",
    destination: "South India",
    title: "Bangalore, Mysore & Coorg Heritage Trail",
    subtitle: "Palaces, Tibetan golden monasteries & coffee plantation chalets",
    shortDescription: "A 4-night circuit exploring Bangalore's gardens, Mysore's royal palace, and Coorg's mist-shrouded coffee estates.",
    longDescription: "A balanced 4-night retreat through southern Karnataka. Walk through royal courtyards, visit sacred Buddhist gompas, and unwind in private coffee estate bungalows.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 83,
    category: "Signature",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=90&w=1600&auto=format&fit=crop",
      alt: "Coorg coffee estate misty morning",
      location: "Coorg, Karnataka"
    },
    route: "Bangalore → Mysore → Coorg → Bangalore",
    inclusions: [
      "4 Nights in Verified Boutique Resorts",
      "Daily Breakfast & Dinners",
      "Dedicated AC Chauffeur Vehicle",
      "Coffee Estate Walking Tour"
    ],
    highlights: [
      "Mysore Palace Tour",
      "Bylakuppe Golden Temple",
      "Coorg Coffee Estate Stays"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/south-india/bangalore-mysore-coorg",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Bangalore Mysore Coorg Tour (04 Nights / 05 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Bangalore to Mysore", location: "Mysore", description: "Srirangapatna and Mysore Palace." },
      { dayNumber: 2, title: "Mysore to Coorg", location: "Coorg", description: "Chamundi Hills and drive to Coorg." },
      { dayNumber: 3, title: "Coorg Plantation & Abbey Falls", location: "Coorg", description: "Dubare Elephant Camp and Abbey Falls." },
      { dayNumber: 4, title: "Bylakuppe & Raja's Seat", location: "Coorg", description: "Golden Temple and sunset viewpoints." },
      { dayNumber: 5, title: "Coorg to Bangalore Departure", location: "Bangalore", description: "Return drive to Bangalore airport." }
    ]
  },
  {
    id: "kerala-honeymoon-special-5d",
    destinationId: "kerala",
    destination: "Kerala",
    title: "Kerala Honeymoon Special with Private Houseboat",
    subtitle: "Munnar misty tea hills, spice plantations & Alleppey backwater cruise",
    shortDescription: "A romantic 4-night couple's escape featuring misty tea estate chalets in Munnar, private candlelit dinners, and an exclusive luxury houseboat cruise in Alleppey.",
    longDescription: "Crafted specifically for couples and slow travelers. Stroll hand-in-hand through lush Munnar tea slopes, visit spice gardens in Thekkady, and spend a romantic night aboard a private wooden houseboat floating along tranquil Alleppey palm canals.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 98,
    category: "Honeymoon",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1600&auto=format&fit=crop",
      alt: "Private luxury houseboat on Alleppey backwaters Kerala",
      location: "Alleppey, Kerala"
    },
    route: "Kochi → Munnar → Thekkady → Alleppey → Kochi",
    inclusions: [
      "3 Nights in Luxury Mountain Resorts + 1 Night in Private Houseboat",
      "All Meals on Houseboat + Daily Breakfast & Candlelight Dinners",
      "Dedicated Private Chauffeur AC Sedan",
      "Houseboat Flower Bed Decoration & Honeymoon Cake",
      "Munnar Tea Plantation & Spice Garden Tours"
    ],
    highlights: [
      "Exclusive Houseboat Cruise",
      "Munnar Tea Estate Resort",
      "Candlelight Backwater Dinner"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/kerala/honeymoon-special",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Kerala Honeymoon Special (04 Nights / 05 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Kochi to Munnar Misty Hills", location: "Munnar", description: "Drive past Cheeyappara waterfalls to tea resort check-in." },
      { dayNumber: 2, title: "Munnar Tea Gardens & Eravikulam", location: "Munnar", description: "Eravikulam National Park, Mattupetty Dam, and sunset point." },
      { dayNumber: 3, title: "Munnar to Thekkady Spice Hills", location: "Thekkady", description: "Periyar lake boating and cardamom plantation walk." },
      { dayNumber: 4, title: "Thekkady to Alleppey Private Houseboat", location: "Alleppey", description: "Check into private traditional houseboat, cruise palm canals." },
      { dayNumber: 5, title: "Alleppey to Kochi Departure", location: "Kochi", description: "Fort Kochi Chinese fishing nets and airport drop." }
    ]
  },
  {
    id: "goa-honeymoon-beach-4d",
    destinationId: "goa",
    destination: "Goa",
    title: "Goa Honeymoon Beach Escape",
    subtitle: "Private beach resort, Fontainhas heritage walk & sunset cruise",
    shortDescription: "A romantic 3-night coastal retreat featuring luxury beachfront stays in South Goa, private Mandovi sunset yacht cruises, and candlelit seafood dinners.",
    longDescription: "Experience the quieter, deeply romantic soul of Goa. Relax on uncrowded white sands in Agonda and Palolem, explore the colorful Portuguese heritage lanes of Fontainhas, and watch golden sunsets over the Arabian Sea.",
    durationNights: 3,
    durationDays: 4,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 76,
    category: "Honeymoon",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop",
      alt: "Quiet sunset beach in South Goa",
      location: "South Goa"
    },
    route: "Panjim → Fontainhas → Palolem → Agonda → Cabo de Rama",
    inclusions: [
      "3 Nights in Verified 5-Star Beachfront Luxury Resort",
      "Daily Buffet Breakfast & Romantic Beachside Dinner",
      "Private Chauffeur Car for All Transfers",
      "Private Sunset Cruise on Mandovi River",
      "Fontainhas Heritage Walking Tour"
    ],
    highlights: [
      "Beachfront Resort Stays",
      "Fontainhas Latin Walk",
      "Mandovi Sunset Yacht"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/goa/honeymoon-beach",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Goa Honeymoon Beach Special (03 Nights / 04 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Goa Arrival & Beach Resort Check-in", location: "South Goa", description: "Private airport transfer, welcome drinks, beach sunset." },
      { dayNumber: 2, title: "Fontainhas Latin Quarters & Sunset Cruise", location: "Panjim", description: "Explore Portuguese heritage lanes and luxury river cruise." },
      { dayNumber: 3, title: "Cabo de Rama Fort & South Goa Coves", location: "Palolem", description: "Cliff fort ocean views, Butterfly beach boat trip, candlelit dinner." },
      { dayNumber: 4, title: "Leisure Morning & Airport Drop", location: "Goa", description: "Spa session and transfer to Dabolim/Mopa airport." }
    ]
  },
  {
    id: "uttarakhand-chardham-haridwar-10d",
    destinationId: "uttarakhand",
    destination: "Uttarakhand",
    title: "Chardham Sacred Yatra from Haridwar",
    subtitle: "Yamunotri, Gangotri, Kedarnath & Badrinath sacred pilgrimage",
    shortDescription: "A 9-night sacred pilgrimage starting from Haridwar, covering the four holy Himalayan dhams with VIP darshan passes and mountain lodge stays.",
    longDescription: "Embark on India's most venerated spiritual yatra. Journey through deep Garhwal valleys to the glacial sources of Yamuna and Ganga, climb to Kedarnath Jyotirlinga, and visit the sacred shrine of Badrinath.",
    durationNights: 9,
    durationDays: 10,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 145,
    category: "Spiritual",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Kedarnath Temple surrounded by snow peaks",
      location: "Kedarnath, Uttarakhand"
    },
    route: "Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Guptkashi → Kedarnath → Badrinath → Rishikesh",
    inclusions: [
      "9 Nights in Verified Yatra Lodges & Deluxe Camps",
      "Pure Vegetarian Breakfast & Warm Dinners",
      "Dedicated Private AC Tempo/Innova with Mountain Driver",
      "Chardham Biometric Registration & Darshan Assistance",
      "Helicopter / Pony Booking Support"
    ],
    highlights: [
      "All 4 Sacred Himalayan Dhams",
      "Kedarnath Jyotirlinga Darshan",
      "Ganga Aarti in Haridwar & Rishikesh"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/chardham/haridwar-chardham-10d",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Chardham Yatra from Haridwar (09 Nights / 10 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Haridwar to Barkot", location: "Barkot", description: "Drive past Mussoorie and Kempty Falls to Barkot." },
      { dayNumber: 2, title: "Barkot to Yamunotri Dham to Barkot", location: "Yamunotri", description: "Trek to Yamunotri Temple, hot water dip at Surya Kund." },
      { dayNumber: 3, title: "Barkot to Uttarkashi", location: "Uttarkashi", description: "Visit Kashi Vishwanath Temple in Uttarkashi." },
      { dayNumber: 4, title: "Uttarkashi to Gangotri Dham to Uttarkashi", location: "Gangotri", description: "Drive through Harsil Valley to holy Gangotri Temple." },
      { dayNumber: 5, title: "Uttarkashi to Guptkashi", location: "Guptkashi", description: "Drive along Mandakini River past Tilwara." },
      { dayNumber: 6, title: "Guptkashi to Kedarnath Dham", location: "Kedarnath", description: "Trek or heli ride to Kedarnath Jyotirlinga. Evening Aarti." },
      { dayNumber: 7, title: "Kedarnath to Guptkashi / Pipalkoti", location: "Pipalkoti", description: "Morning darshan and trek down to base." },
      { dayNumber: 8, title: "Pipalkoti to Badrinath Dham", location: "Badrinath", description: "Visit Badrinath Temple, Tapt Kund, and Mana last village." },
      { dayNumber: 9, title: "Badrinath to Rudraprayag / Rishikesh", location: "Rishikesh", description: "Drive past Vishnuprayag, Nandaprayag, Karnaprayag, Devprayag." },
      { dayNumber: 10, title: "Rishikesh to Haridwar Departure", location: "Haridwar", description: "Morning Ganga Aarti and departure." }
    ]
  },
  {
    id: "uttarakhand-nainital-mussoorie-corbett-6d",
    destinationId: "uttarakhand",
    destination: "Uttarakhand",
    title: "Nainital, Mussoorie & Corbett Wildlife Tour",
    subtitle: "Lakeside boat rides, Queen of Hills & Bengal tiger jungle safari",
    shortDescription: "A 5-night family circuit uniting Nainital's emerald lakes, Corbett's royal Bengal tiger reserves, and Mussoorie's colonial hill promenades.",
    longDescription: "Experience Uttarakhand's three most iconic destinations in one seamless holiday. Cruise on Naini Lake, take a 4x4 open jeep safari inside Jim Corbett National Park, and stroll the historic Mall Road in Mussoorie.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 91,
    category: "Signature",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Nainital Lake surrounded by Kumaon mountains",
      location: "Nainital, Uttarakhand"
    },
    route: "Delhi → Nainital → Jim Corbett → Mussoorie → Delhi",
    inclusions: [
      "5 Nights in Verified Heritage Resorts & Jungle Lodges",
      "Daily Buffet Breakfast & Dinners",
      "Open 4x4 Jeep Safari in Jim Corbett National Park",
      "Private AC Chauffeur Car for All Transfers",
      "Naini Lake Boating & Kempty Falls Entry"
    ],
    highlights: [
      "Jim Corbett Open Jeep Safari",
      "Naini Lake Yacht Boating",
      "Mussoorie Gun Hill Vista"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/uttarakhand/nainital-mussoorie-corbett",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Nainital Mussoorie Corbett Tour (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Delhi to Nainital Lake City", location: "Nainital", description: "Scenic drive to Kumaon hills, evening Naini Lake stroll." },
      { dayNumber: 2, title: "Nainital Lake Tour & Viewpoints", location: "Nainital", description: "Bhimtal, Naukuchiatal, Snow View Point, and Mall Road." },
      { dayNumber: 3, title: "Nainital to Jim Corbett National Park", location: "Corbett", description: "Drive to jungle lodge, evening nature walk by Kosi river." },
      { dayNumber: 4, title: "Corbett Morning Jeep Safari to Mussoorie", location: "Mussoorie", description: "Open 4x4 tiger safari and drive to Queen of Hills." },
      { dayNumber: 5, title: "Mussoorie Kempty Falls & Gun Hill", location: "Mussoorie", description: "Visit Kempty Falls, Company Garden, Camel's Back Road." },
      { dayNumber: 6, title: "Mussoorie to Delhi Departure", location: "Delhi", description: "Return drive to Delhi airport." }
    ]
  },
  {
    id: "uttarakhand-kumaon-hills-kausani-6d",
    destinationId: "uttarakhand",
    destination: "Uttarakhand",
    title: "The Best of Kumaon Hills & Kausani",
    subtitle: "Nainital lakes, Kausani 300km Himalayan vista & Ranikhet golf glades",
    shortDescription: "A tranquil 5-night Kumaon circuit across Nainital, Almora's cultural heritage, Kausani's 300km snow peak panoramas, and Ranikhet's pine glades.",
    longDescription: "Escape deep into the quiet soul of the Kumaon Himalaya. Gaze upon Trishul, Nanda Devi, and Panchachuli peaks from Kausani, visit ancient Baijnath temples, and stroll through Ranikhet's fragrant pine forests.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 68,
    category: "Offbeat",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Kausani Himalayan panorama Nanda Devi",
      location: "Kausani, Uttarakhand"
    },
    route: "Delhi → Nainital → Kausani → Ranikhet → Delhi",
    inclusions: [
      "5 Nights in Handpicked Mountain Cottages & Eco-Lodges",
      "Daily Breakfast & Dinners",
      "Private AC Chauffeur Car for All Routes",
      "Baijnath Temple & Kausani Tea Garden Tour"
    ],
    highlights: [
      "300km Himalayan Vista at Kausani",
      "Ranikhet Pine Golf Course",
      "Ancient Baijnath Temple"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/uttarakhand/best-of-kumaon-hills",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "The Best of Kumaon Hills (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Delhi to Nainital", location: "Nainital", description: "Drive to Kumaon hills and check-in." },
      { dayNumber: 2, title: "Nainital Lakes & Naina Devi", location: "Nainital", description: "Boating on Naini Lake and visit Bhimtal." },
      { dayNumber: 3, title: "Nainital to Kausani Switzerland of India", location: "Kausani", description: "Panoramic views of Nanda Devi and Trishul peaks." },
      { dayNumber: 4, title: "Kausani to Baijnath & Almora", location: "Kausani", description: "12th-century stone temples and Anasakti Ashram." },
      { dayNumber: 5, title: "Kausani to Ranikhet Queen's Meadow", location: "Ranikhet", description: "Visit Chaubatia apple orchards and Golf Course." },
      { dayNumber: 6, title: "Ranikhet to Delhi Departure", location: "Delhi", description: "Return drive to Delhi." }
    ]
  },
  {
    id: "uttarakhand-auli-snow-skiing-5d",
    destinationId: "uttarakhand",
    destination: "Uttarakhand",
    title: "Winter Auli Snow & Skiing Tour",
    subtitle: "India's premier ski resort, Nanda Devi ropeway & Chopta meadows",
    shortDescription: "A 4-night winter skiing and alpine snow holiday in Auli, featuring Asia's longest cable car ride with 360-degree vistas of Mount Nanda Devi.",
    longDescription: "Experience the winter wonderland of Auli. Glide down snowy ski slopes, ride the high ropeway from Joshimath, visit sacred Devprayag confluence, and enjoy evenings in cozy wooden chalets.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 88,
    category: "Adventure",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Snow covered slopes of Auli with Nanda Devi",
      location: "Auli, Uttarakhand"
    },
    route: "Rishikesh → Joshimath → Auli → Chopta → Rishikesh",
    inclusions: [
      "4 Nights in Mountain Resorts & Ski Lodges",
      "Daily Breakfast & Warm Dinners",
      "Private AC Chauffeur Vehicle for Mountain Routes",
      "Auli Ropeway Passes & Ski Equipment Rental Support"
    ],
    highlights: [
      "Auli Ski Slopes & Training",
      "Joshimath-Auli Cable Car (4.15 km)",
      "360-Degree Nanda Devi Views"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/uttarakhand/auli-snow-skiing",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Winter Auli Snow Skiing Tour (04 Nights / 05 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Rishikesh to Joshimath Gateway to Auli", location: "Joshimath", description: "Drive along Ganga and Alaknanda confluences." },
      { dayNumber: 2, title: "Joshimath to Auli via Cable Car", location: "Auli", description: "Ride Asia's longest ropeway, check into ski resort, basic ski session." },
      { dayNumber: 3, title: "Auli Snow Adventure & Gorson Bugyal Trek", location: "Auli", description: "Snow trek to Gorson Bugyal meadows with Nanda Devi views." },
      { dayNumber: 4, title: "Auli to Chopta Mini Switzerland", location: "Chopta", description: "Drive through pine bugyals, sunset at Chopta." },
      { dayNumber: 5, title: "Chopta to Rishikesh / Delhi Departure", location: "Rishikesh", description: "Return drive to Rishikesh." }
    ]
  },
  {
    id: "uttarakhand-nainital-lake-escape-4d",
    destinationId: "uttarakhand",
    destination: "Uttarakhand",
    title: "03 Nights in Nainital Lake Escape",
    subtitle: "Emerald lakes, Naina Peak, Bhimtal boating & colonial bakeries",
    shortDescription: "A relaxing 3-night mountain weekend visiting Nainital's famous lakes, British-era colonial heritage, and panoramic snow viewpoints.",
    longDescription: "The quintessential Kumaon weekend. Glide on yachts across Naini Lake, visit Naukuchiatal's nine-cornered lake, and savor warm apple pies on Mall Road.",
    durationNights: 3,
    durationDays: 4,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.7,
    reviewCount: 75,
    category: "Weekend",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=90&w=1600&auto=format&fit=crop",
      alt: "Nainital Lake boats and mountains",
      location: "Nainital, Uttarakhand"
    },
    route: "Delhi → Nainital → Bhimtal → Delhi",
    inclusions: [
      "3 Nights in Heritage Lakeside Hotel",
      "Daily Breakfast & Dinners",
      "Private AC Chauffeur Car for All Transfers",
      "Naini Lake & Bhimtal Boating Passes"
    ],
    highlights: [
      "Naini Lake Yacht Boating",
      "Bhimtal & Sattal Tour",
      "Snow View Point Ropeway"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/uttarakhand/nainital-3n",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "03 Nights in Nainital Tour (03 Nights / 04 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Delhi to Nainital", location: "Nainital", description: "Drive to lake city, evening Mall Road walk." },
      { dayNumber: 2, title: "Lake Tour (Bhimtal, Sattal, Naukuchiatal)", location: "Nainital", description: "Explore the scenic lake cluster and water sports." },
      { dayNumber: 3, title: "Naina Peak & Snow Viewpoint", location: "Nainital", description: "Ropeway to Snow View, Governor's House, and St. John's Church." },
      { dayNumber: 4, title: "Nainital to Delhi Departure", location: "Delhi", description: "Return drive to Delhi." }
    ]
  },
  {
    id: "rajasthan-royal-forts-desert-8d",
    destinationId: "rajasthan",
    destination: "Rajasthan",
    title: "Royal Rajasthan Grand Forts & Desert Circuit",
    subtitle: "Jaipur pink city, Jodhpur blue fort, Jaisalmer Thar dunes & Udaipur lakes",
    shortDescription: "A majestic 7-night grand circuit exploring Rajasthan's royal citadels, private havelis, Thar desert camel safaris, and romantic Lake Pichola palaces.",
    longDescription: "Experience the royal heritage of Rajputana in its full glory. Wander through Amber Fort in Jaipur, gaze down from Mehrangarh Fort in Jodhpur, camp under starry desert skies in Jaisalmer, and cruise on Lake Pichola in Udaipur.",
    durationNights: 7,
    durationDays: 8,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 124,
    category: "Heritage",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop",
      alt: "Rajasthan desert fort courtyard",
      location: "Jaisalmer, Rajasthan"
    },
    route: "Jaipur → Jodhpur → Jaisalmer → Udaipur",
    inclusions: [
      "7 Nights in Restored Heritage Havelis & Luxury Desert Camps",
      "Daily Royal Buffet Breakfast & Dinners",
      "Dedicated Private AC Chauffeur Vehicle for All Inter-city Routes",
      "Thar Desert Camel Safari & Folk Dance Dinner",
      "Lake Pichola Sunset Boat Cruise"
    ],
    highlights: [
      "Amber Fort & City Palace Jaipur",
      "Thar Desert Stargazing Camp",
      "Lake Pichola Palace Cruise"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/rajasthan/grand-circuit-8d",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Royal Rajasthan Grand Circuit (07 Nights / 08 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Jaipur Arrival & Pink City", location: "Jaipur", description: "Hawa Mahal, City Palace, and Jantar Mantar." },
      { dayNumber: 2, title: "Amber Fort & Nahargarh Sunset", location: "Jaipur", description: "Elephant/jeep ride to Amber Fort and sunset over the city." },
      { dayNumber: 3, title: "Jaipur to Jodhpur Blue City", location: "Jodhpur", description: "Mehrangarh Fort and Jaswant Thada." },
      { dayNumber: 4, title: "Jodhpur to Jaisalmer Golden City", location: "Jaisalmer", description: "Drive into Thar desert, check-in to luxury desert camp." },
      { dayNumber: 5, title: "Jaisalmer Fort & Sam Sand Dunes", location: "Jaisalmer", description: "Living fort, Patwon Ki Haveli, camel safari, and Kalbelia dance." },
      { dayNumber: 6, title: "Jaisalmer to Udaipur City of Lakes", location: "Udaipur", description: "Drive past Ranakpur Jain Temple." },
      { dayNumber: 7, title: "Udaipur City Palace & Lake Pichola", location: "Udaipur", description: "City Palace museum and private boat cruise." },
      { dayNumber: 8, title: "Udaipur Airport Departure", location: "Udaipur", description: "Airport transfer." }
    ]
  },
  {
    id: "rajasthan-golden-triangle-ranthambore-6d",
    destinationId: "rajasthan",
    destination: "Rajasthan",
    title: "Golden Triangle with Ranthambore Tiger Safari",
    subtitle: "Delhi monuments, Taj Mahal at dawn, tiger safari & Jaipur palaces",
    shortDescription: "A 5-night journey blending India's iconic Golden Triangle (Delhi, Agra, Jaipur) with thrilling Royal Bengal tiger jeep safaris in Ranthambore.",
    longDescription: "The perfect blend of Mughal architecture, wildlife, and Rajput royalty. Watch the sunrise over the Taj Mahal, track wild tigers in Ranthambore National Park, and explore Amber Fort in Jaipur.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 96,
    category: "Wildlife",
    featured: false,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1600&auto=format&fit=crop",
      alt: "Taj Mahal and Rajasthan palaces",
      location: "Agra & Rajasthan"
    },
    route: "Delhi → Agra → Ranthambore → Jaipur → Delhi",
    inclusions: [
      "5 Nights in Verified 5-Star Heritage & Safari Lodges",
      "Daily Buffet Breakfast & Dinners",
      "Open 4x4 Jeep Safaris in Ranthambore National Park",
      "Dedicated Private AC Chauffeur Car",
      "Taj Mahal Sunrise Guide & Monuments Passes"
    ],
    highlights: [
      "Taj Mahal Sunrise View",
      "Ranthambore Tiger Safaris",
      "Amber Fort Jeep Climb"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/golden-triangle/with-ranthambore",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Golden Triangle with Ranthambore (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Delhi Sights to Agra", location: "Agra", description: "Qutub Minar, India Gate, drive via Yamuna Expressway." },
      { dayNumber: 2, title: "Taj Mahal Sunrise to Ranthambore", location: "Ranthambore", description: "Taj Mahal sunrise tour, Agra Fort, drive to tiger reserve." },
      { dayNumber: 3, title: "Ranthambore Tiger Jungle Safaris", location: "Ranthambore", description: "Morning and afternoon open jeep safaris inside the park." },
      { dayNumber: 4, title: "Ranthambore to Jaipur Pink City", location: "Jaipur", description: "Drive to Jaipur, evening Chokhi Dhani village experience." },
      { dayNumber: 5, title: "Amber Fort & Jaipur Palaces", location: "Jaipur", description: "Amber Fort, City Palace, Hawa Mahal." },
      { dayNumber: 6, title: "Jaipur to Delhi Departure", location: "Delhi", description: "Return drive to Delhi airport." }
    ]
  },
  {
    id: "andaman-exotic-beach-scuba-6d",
    destinationId: "andaman",
    destination: "Andaman",
    title: "Andaman Exotic Beach & Scuba Expedition",
    subtitle: "Havelock Radhanagar beach, scuba diving, Neil island & Cellular Jail",
    shortDescription: "A 5-night tropical island expedition featuring Asia's finest Radhanagar Beach, coral reef scuba diving, and private catamaran cruises.",
    longDescription: "Dive into the turquoise coral waters of the Andaman Sea. Experience Havelock's powdery white sand, Neil Island's natural rock bridge, scuba diving at Elephant Beach, and the historic Cellular Jail sound and light show.",
    durationNights: 5,
    durationDays: 6,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.9,
    reviewCount: 114,
    category: "Beach",
    featured: true,
    popular: true,
    coverImage: {
      src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1600&auto=format&fit=crop",
      alt: "Havelock Island turquoise water beach",
      location: "Havelock Island, Andaman"
    },
    route: "Port Blair → Havelock Island → Neil Island → Port Blair",
    inclusions: [
      "5 Nights in Verified Beachfront Luxury Resorts",
      "Daily Breakfast & Dinners",
      "Private High-Speed Catamaran (Makruzz/Nautika) Transfers",
      "Scuba Diving Session with Underwater Photography",
      "Cellular Jail Light & Sound Show Entry"
    ],
    highlights: [
      "Radhanagar Beach (Asia's #1)",
      "Elephant Beach Coral Scuba",
      "Neil Island Natural Bridge"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/andaman/exotic-scuba-6d",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Andaman Exotic Beach & Scuba Tour (05 Nights / 06 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Port Blair Arrival & Cellular Jail", location: "Port Blair", description: "Corbyn's Cove Beach and Cellular Jail sound and light show." },
      { dayNumber: 2, title: "Private Cruise to Havelock Island", location: "Havelock", description: "Catamaran cruise to Havelock and sunset at Radhanagar Beach." },
      { dayNumber: 3, title: "Elephant Beach Scuba & Snorkeling", location: "Havelock", description: "Speedboat to Elephant Beach for coral reef scuba diving." },
      { dayNumber: 4, title: "Havelock to Neil Island", location: "Neil Island", description: "Bharatpur Beach, Laxmanpur Beach sunset, Natural Rock Bridge." },
      { dayNumber: 5, title: "Neil Island to Port Blair", location: "Port Blair", description: "Catamaran back to Port Blair, local handicraft shopping." },
      { dayNumber: 6, title: "Port Blair Departure", location: "Port Blair", description: "Airport transfer." }
    ]
  },
  {
    id: "northeast-kaziranga-majuli-5d",
    destinationId: "northeast",
    destination: "Northeast",
    title: "Kaziranga Rhino Safari & Majuli Island Culture",
    subtitle: "One-horned rhinos, Brahmaputra ferry & world's largest river island",
    shortDescription: "A 4-night cultural and wildlife circuit exploring UNESCO Kaziranga National Park's rhinos and the Vaishnavite monasteries of Majuli Island.",
    longDescription: "Discover the unique living heritage of the Brahmaputra valley. Track rhinos and royal Bengal tigers on jungle safaris in Kaziranga, cross the Brahmaputra River by ferry to Majuli Island, and visit ancient Neo-Vaishnavite Satras.",
    durationNights: 4,
    durationDays: 5,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.8,
    reviewCount: 52,
    category: "Wildlife",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop",
      alt: "Brahmaputra river and Kaziranga grasslands",
      location: "Kaziranga & Majuli, Assam"
    },
    route: "Guwahati → Kaziranga → Jorhat → Majuli Island → Guwahati",
    inclusions: [
      "4 Nights in Heritage Eco-Lodges & Bamboo Cottages",
      "Daily Breakfast & Traditional Assamese Dinners",
      "Kaziranga Jeep Safari & Elephant Safari Passes",
      "Brahmaputra River Ferry Tickets & Satra Tour Guide"
    ],
    highlights: [
      "Kaziranga Rhino Safari",
      "Majuli Island Bamboo Cottages",
      "Ancient Mask Making Satras"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/northeast/kaziranga-majuli",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Kaziranga & Majuli Island Cultural Tour (04 Nights / 05 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Guwahati to Kaziranga National Park", location: "Kaziranga", description: "Drive past Assam tea gardens and evening cultural folk show." },
      { dayNumber: 2, title: "Kaziranga Wildlife Safaris", location: "Kaziranga", description: "Morning elephant safari and afternoon jeep safari across central zone." },
      { dayNumber: 3, title: "Kaziranga to Majuli Island via Ferry", location: "Majuli", description: "Cross the mighty Brahmaputra river to world's largest river island." },
      { dayNumber: 4, title: "Majuli Satras & Mask-Making Culture", location: "Majuli", description: "Visit Kamalabari Satra and Samaguri Satra mask artisans." },
      { dayNumber: 5, title: "Majuli to Guwahati Departure", location: "Guwahati", description: "Ferry return and drive to Guwahati airport." }
    ]
  },
  {
    id: "bengal-sundarbans-mangrove-safari-3d",
    destinationId: "bengal",
    destination: "West Bengal",
    title: "Sundarbans Mangrove Royal Bengal Tiger Safari",
    subtitle: "UNESCO mangrove delta, private boat safari & Sajnekhali watchtower",
    shortDescription: "A thrilling 2-night river boat safari through the world's largest mangrove delta, home to the elusive Royal Bengal Tiger and estuarine crocodiles.",
    longDescription: "Cruise through the dense mangrove waterways of the Sundarbans Delta. Board a specialized safari boat, visit Sajnekhali and Sudhanyakhali watchtowers, and experience traditional village folk theatre in the mangrove forests.",
    durationNights: 2,
    durationDays: 3,
    pricePerPerson: 0,
    isPriceOnRequest: true,
    rating: 4.7,
    reviewCount: 48,
    category: "Wildlife",
    featured: false,
    popular: false,
    coverImage: {
      src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1600&auto=format&fit=crop",
      alt: "Sundarbans mangrove delta river boat",
      location: "Sundarbans, West Bengal"
    },
    route: "Kolkata → Godkhali → Sajnekhali → Sudhanyakhali → Dobanki → Kolkata",
    inclusions: [
      "2 Nights in Eco-Resorts in Sundarbans Delta",
      "All Meals Prepared Fresh on Safari Boat",
      "Exclusive Safari Boat for Delta Cruising",
      "Forest Department Entry Permits & Guide Fees",
      "Kolkata Pick and Drop Transfers"
    ],
    highlights: [
      "Royal Bengal Tiger Boat Safari",
      "Dobanki Canopy Walk",
      "Sajnekhali Mangrove Center"
    ],
    sourceMetadata: {
      sourceName: "Ghumega India",
      sourceUrl: "https://www.ghumegaindia.com/wildlife/sundarbans-safari",
      sourceCheckedAt: "2026-08-22",
      source: "Ghumega",
      sourcePackageName: "Sundarbans Mangrove Tiger Safari (02 Nights / 03 Days)"
    },
    itinerary: [
      { dayNumber: 1, title: "Kolkata to Godkhali & Boat to Sajnekhali", location: "Sundarbans", description: "Scenic transfer from Kolkata, board safari boat, cruise to delta resort." },
      { dayNumber: 2, title: "Full Day Mangrove Wildlife Cruise", location: "Sundarbans", description: "Explore Sudhanyakhali and Dobanki watchtowers for tiger and crocodile sightings." },
      { dayNumber: 3, title: "Village Walk & Return to Kolkata", location: "Kolkata", description: "Morning birdwatching cruise and drive back to Kolkata airport." }
    ]
  }
];

// Read existing trips.ts
const existingContent = fs.readFileSync('src/data/trips.ts', 'utf8');

// Append new trips right before closing '];'
const lastBracketIndex = existingContent.lastIndexOf('];');
if (lastBracketIndex === -1) {
  console.error('Could not find closing bracket in trips.ts');
  process.exit(1);
}

const formattedNewTrips = ',\n' + newTrips.map(trip => '  ' + JSON.stringify(trip, null, 2).replace(/\n/g, '\n  ')).join(',\n') + '\n';

const updatedContent = existingContent.slice(0, lastBracketIndex) + formattedNewTrips + existingContent.slice(lastBracketIndex);

fs.writeFileSync('src/data/trips.ts', updatedContent, 'utf8');
console.log(`Successfully added ${newTrips.length} new trips to trips.ts!`);
