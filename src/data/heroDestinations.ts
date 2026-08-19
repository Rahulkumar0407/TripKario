/**
 * TripKario — Dedicated Hero Destination Photography
 *
 * This is the ONLY dataset used for the hero background sequence.
 * Do NOT reuse destination card images here.
 *
 * Every image must pass the editorial quality filter:
 * 1. Professionally photographed
 * 2. Recognizable destination identity
 * 3. Depth & interesting light
 * 4. Strong focal point
 * 5. Clean space for hero typography
 * 6. Stands alone without text
 * 7. Real place, real photographer
 *
 * PHOTOGRAPHY SOURCES: Unsplash (free license)
 * NO AI IMAGES. NO GENERIC STOCK.
 */

export interface HeroDestination {
  id: string;
  destination: string;
  image: string;
  alt: string;
  caption: string;
  route: string;
  duration: string;
  price: string;
  photographer: string;
  source: string;
  license: string;
  focalPoint: { x: number; y: number };
  focalPosition: string;
  safeTextSide: 'left' | 'right';
  atmosphereColor: string;
  /** Color wash that travels with this destination during transitions */
  atmosphereWash: string;
  transitionDirection: 'right-to-left' | 'left-to-right' | 'bottom-to-top' | 'diagonal';
  /** Controls navbar glass tint over this scene */
  sceneMode: 'dark' | 'bright';
  region: string;
  startingPrice: number;
  durationNights: number;
  durationDays: number;
  routeString: string;
  /** Contact sheet display: "01 / 07" */
  contactSheet: string;
}

export const heroDestinations: HeroDestination[] = [
  // ═══════════════════════════════════════════════
  // 01 — LADAKH
  // Photographic direction: Dramatic mountain road
  // with leading lines winding into Himalayan pass.
  // Feeling: altitude + adventure + vast scale
  // ═══════════════════════════════════════════════
  {
    id: 'hero-ladakh',
    destination: 'Ladakh',
    region: 'Trans-Himalayas · 17,590 ft',
    image:
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=90&w=2800&auto=format&fit=crop',
    alt: 'Dramatic winding road cutting through stark barren Himalayan mountain ranges in Ladakh',
    caption: 'High passes. Monasteries. Roads worth getting lost on.',
    route: 'Leh → Nubra → Pangong',
    duration: '7N · 8D',
    price: '₹31,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 50, y: 40 },
    focalPosition: '50% 40%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(50, 75, 120, 0.14)',
    atmosphereWash: 'rgba(80, 110, 160, 0.25)',
    transitionDirection: 'right-to-left',
    sceneMode: 'dark',
    startingPrice: 31999,
    durationNights: 7,
    durationDays: 8,
    routeString: 'Leh → Nubra → Pangong',
    contactSheet: '01 / 07',
  },

  // ═══════════════════════════════════════════════
  // 02 — KASHMIR
  // Photographic direction: Real Kashmir valley landscape
  // with mountains, river, pine forests, and soft mist.
  // Feeling: escape + calm + mountain tranquility
  // ═══════════════════════════════════════════════
  {
    id: 'hero-kashmir',
    destination: 'Kashmir',
    region: 'Jammu & Kashmir · Pir Panjal',
    image:
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=2800&auto=format&fit=crop',
    alt: 'Panoramic view of lush green Kashmir valley surrounded by snow-dusted Himalayan peaks and pine forests',
    caption:
      'Misty mornings, cedar valleys and one very good excuse to disappear.',
    route: 'Srinagar → Gulmarg → Pahalgam',
    duration: '6N · 7D',
    price: '₹24,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 48, y: 50 },
    focalPosition: '48% 50%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(45, 90, 120, 0.12)',
    atmosphereWash: 'rgba(70, 120, 150, 0.22)',
    transitionDirection: 'right-to-left',
    sceneMode: 'dark',
    startingPrice: 24999,
    durationNights: 6,
    durationDays: 7,
    routeString: 'Srinagar → Gulmarg → Pahalgam',
    contactSheet: '02 / 07',
  },

  // ═══════════════════════════════════════════════
  // 03 — RAJASTHAN
  // Photographic direction: Sandstone haveli / fort
  // architecture in warm late-afternoon light. Long shadows.
  // Architectural depth. Human scale.
  // Feeling: history + warmth + discovery
  // ═══════════════════════════════════════════════
  {
    id: 'hero-rajasthan',
    destination: 'Rajasthan',
    region: 'Thar Desert · Marwar Citadel',
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=2800&auto=format&fit=crop',
    alt: 'Warm golden-hour light falling on ancient sandstone haveli archways with long shadows in Jaisalmer, Rajasthan',
    caption: 'Where sandstone turns gold before sunset.',
    route: 'Jaipur → Jodhpur → Jaisalmer',
    duration: '5N · 6D',
    price: '₹21,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 60, y: 40 },
    focalPosition: '60% 40%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(180, 120, 60, 0.10)',
    atmosphereWash: 'rgba(200, 150, 80, 0.22)',
    transitionDirection: 'left-to-right',
    sceneMode: 'dark',
    startingPrice: 21999,
    durationNights: 5,
    durationDays: 6,
    routeString: 'Jaipur → Jodhpur → Jaisalmer',
    contactSheet: '03 / 07',
  },

  // ═══════════════════════════════════════════════
  // 04 — KERALA
  // Photographic direction: Real Kerala boat/backwater scene.
  // Boat movement. Reflection. Palms. Water texture.
  // Early morning or late afternoon light.
  // Feeling: slow travel + calm + tropical atmosphere
  // ═══════════════════════════════════════════════
  {
    id: 'hero-kerala',
    destination: 'Kerala',
    region: 'Malabar Coast · Backwaters',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=2800&auto=format&fit=crop',
    alt: 'Boatman navigating a wooden canoe through palm-lined backwater channels in golden evening light, Alleppey, Kerala',
    caption: 'Some mornings are better taken slowly.',
    route: 'Kochi → Munnar → Alleppey',
    duration: '5N · 6D',
    price: '₹19,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 50, y: 50 },
    focalPosition: '50% 50%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(60, 140, 90, 0.10)',
    atmosphereWash: 'rgba(80, 160, 100, 0.20)',
    transitionDirection: 'bottom-to-top',
    sceneMode: 'dark',
    startingPrice: 19999,
    durationNights: 5,
    durationDays: 6,
    routeString: 'Kochi → Munnar → Alleppey',
    contactSheet: '04 / 07',
  },

  // ═══════════════════════════════════════════════
  // 05 — MEGHALAYA
  // Photographic direction: Living root bridge in mist.
  // Fog. Depth. Lush green. Human scale. Wet textures.
  // Feeling: mystery + discovery
  // ═══════════════════════════════════════════════
  {
    id: 'hero-meghalaya',
    destination: 'Meghalaya',
    region: 'Khasi Hills · Cloud Rainforest',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=2800&auto=format&fit=crop',
    alt: 'Person walking across an ancient double-decker living root bridge suspended over a forest stream in mist, Cherrapunji, Meghalaya',
    caption: 'Follow the road into the clouds.',
    route: 'Shillong → Cherrapunji → Dawki',
    duration: '4N · 5D',
    price: '₹22,499',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 52, y: 45 },
    focalPosition: '52% 45%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(40, 100, 70, 0.12)',
    atmosphereWash: 'rgba(60, 130, 90, 0.22)',
    transitionDirection: 'right-to-left',
    sceneMode: 'dark',
    startingPrice: 22499,
    durationNights: 4,
    durationDays: 5,
    routeString: 'Shillong → Cherrapunji → Dawki',
    contactSheet: '05 / 07',
  },

  // ═══════════════════════════════════════════════
  // 06 — HIMACHAL
  // Photographic direction: Himalayan road or valley.
  // Cedars. Mountain village. Morning light.
  // Road leading into distance.
  // Feeling: escape + mountain life
  // ═══════════════════════════════════════════════
  {
    id: 'hero-himachal',
    destination: 'Himachal',
    region: 'Western Himalayas · Cedar Valley',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=2800&auto=format&fit=crop',
    alt: 'Traditional wooden Himalayan village home nestled among cedar trees with snow-capped peaks in the background, Himachal Pradesh',
    caption: 'A little mountain air never hurt.',
    route: 'Shimla → Jibhi → Spiti',
    duration: '5N · 6D',
    price: '₹17,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 50, y: 45 },
    focalPosition: '50% 45%',
    safeTextSide: 'right',
    atmosphereColor: 'rgba(50, 90, 75, 0.12)',
    atmosphereWash: 'rgba(70, 120, 100, 0.22)',
    transitionDirection: 'left-to-right',
    sceneMode: 'dark',
    startingPrice: 17999,
    durationNights: 5,
    durationDays: 6,
    routeString: 'Shimla → Jibhi → Spiti',
    contactSheet: '06 / 07',
  },

  // ═══════════════════════════════════════════════
  // 07 — GOA
  // Photographic direction: NOT a generic beach sunset.
  // Old Portuguese architecture. Coastal road. Local street.
  // Quiet morning. Monsoon atmosphere.
  // Feeling: laid-back + lived-in + coastal
  // ═══════════════════════════════════════════════
  {
    id: 'hero-goa',
    destination: 'Goa',
    region: 'Konkan Coast · Latin Quarter',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=2800&auto=format&fit=crop',
    alt: 'Serene coastal palm-fringed shoreline and gentle waves in Goa',
    caption: 'Take the scenic route. Stay longer than planned.',
    route: 'Panaji → Divar Island → South Goa',
    duration: '4N · 5D',
    price: '₹16,999',
    photographer: '',
    source: 'Unsplash',
    license: 'Unsplash License',
    focalPoint: { x: 50, y: 45 },
    focalPosition: '50% 45%',
    safeTextSide: 'left',
    atmosphereColor: 'rgba(190, 130, 70, 0.10)',
    atmosphereWash: 'rgba(210, 160, 90, 0.22)',
    transitionDirection: 'diagonal',
    sceneMode: 'dark',
    startingPrice: 16999,
    durationNights: 4,
    durationDays: 5,
    routeString: 'Panaji → Divar Island → South Goa',
    contactSheet: '07 / 07',
  },
];

/** Total number of hero destinations */
export const HERO_DESTINATION_COUNT = heroDestinations.length;

/** Auto-play interval in milliseconds (7.5 seconds per destination) */
export const HERO_AUTOPLAY_MS = 7500;

/** Transition duration in seconds */
export const HERO_TRANSITION_DURATION = 1.3;

/**
 * Preload a hero photograph for zero-flicker transitions.
 * Call this for the NEXT image in the sequence.
 */
export function preloadHeroImage(src: string): void {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = src;
}
