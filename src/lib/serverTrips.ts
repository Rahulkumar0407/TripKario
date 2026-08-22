import fs from 'fs';
import path from 'path';
import { tripPackages as baselineTripPackages } from '@/data/trips';
import { TripPackage, EditorialImage } from '@/types';

const PERSISTED_TRIPS_PATH = path.join(process.cwd(), 'src', 'data', 'persisted_trips.json');

export interface TripOverride {
  id?: string;
  slug?: string;
  title?: string;
  destination?: string;
  destinationName?: string;
  coverImageUrl?: string;
  originalCoverImageUrl?: string;
  coverImage?: {
    src: string;
    alt?: string;
    location?: string;
    photographer?: string;
  };
  pricePerPerson?: number;
  isPriceOnRequest?: boolean;
  durationDays?: number;
  durationNights?: number;
  shortDescription?: string;
  longDescription?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  status?: 'published' | 'draft' | 'archived';
  galleryUrls?: string[];
  galleryImages?: EditorialImage[];
  itinerary?: any[];
  itineraryDays?: any[];
  updatedAt?: string;
}

/**
 * Reads persisted trip overrides from disk
 */
export function getPersistedTripsMap(): Map<string, TripOverride> {
  const map = new Map<string, TripOverride>();
  try {
    if (fs.existsSync(PERSISTED_TRIPS_PATH)) {
      const raw = fs.readFileSync(PERSISTED_TRIPS_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (Array.isArray(parsed)) {
          parsed.forEach((item: TripOverride) => {
            const key = item.id || item.slug;
            if (key) map.set(key.toLowerCase(), item);
          });
        } else {
          Object.entries(parsed).forEach(([k, v]) => {
            if (v && typeof v === 'object') {
              map.set(k.toLowerCase(), v as TripOverride);
            }
          });
        }
      }
    }
  } catch (err) {
    console.warn('[serverTrips] Failed to read persisted trips:', err);
  }
  return map;
}

/**
 * Saves or updates a trip override on disk
 */
export function savePersistedTrip(tripId: string, updates: Partial<TripOverride>): TripOverride {
  const cleanId = tripId.toLowerCase().trim();
  const map = getPersistedTripsMap();
  const existing = map.get(cleanId) || {};

  // Preserve and establish immutable originalCoverImageUrl
  let stableOriginal = existing.originalCoverImageUrl || updates.originalCoverImageUrl;
  if (!stableOriginal) {
    const baseline = baselineTripPackages.find(
      (t) => t.id.toLowerCase() === cleanId || ((t as any).slug && (t as any).slug.toLowerCase() === cleanId)
    );
    if (baseline) {
      stableOriginal = baseline.coverImage.src;
    } else {
      stableOriginal = existing.coverImageUrl || updates.coverImageUrl;
    }
  }

  const merged: TripOverride = {
    ...existing,
    ...updates,
    originalCoverImageUrl: stableOriginal,
    id: tripId,
    slug: tripId,
    updatedAt: new Date().toISOString(),
  };

  map.set(cleanId, merged);

  const outObj: Record<string, TripOverride> = {};
  map.forEach((v, k) => {
    outObj[k] = v;
  });

  const dir = path.dirname(PERSISTED_TRIPS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(PERSISTED_TRIPS_PATH, JSON.stringify(outObj, null, 2), 'utf-8');
  return merged;
}

/**
 * Deletes a trip override from disk
 */
export function deletePersistedTrip(tripId: string): boolean {
  const cleanId = tripId.toLowerCase().trim();
  const map = getPersistedTripsMap();
  const deleted = map.delete(cleanId);

  const outObj: Record<string, TripOverride> = {};
  map.forEach((v, k) => {
    outObj[k] = v;
  });

  const dir = path.dirname(PERSISTED_TRIPS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(PERSISTED_TRIPS_PATH, JSON.stringify(outObj, null, 2), 'utf-8');
  return deleted;
}

/**
 * Resolves a single canonical trip by merging baseline catalog with persisted override
 */
export function getCanonicalServerTrip(tripId: string, includeUnpublished: boolean = true): TripPackage | undefined {
  const cleanId = tripId.toLowerCase().trim();
  const baseline = baselineTripPackages.find(
    (t) => t.id.toLowerCase() === cleanId || ((t as any).slug && (t as any).slug.toLowerCase() === cleanId)
  );

  const overrides = getPersistedTripsMap();
  const override = overrides.get(cleanId);

  if (!baseline && !override) return undefined;

  // Protect unpublished / draft trips from public access unless explicitly requested by admin
  if (!includeUnpublished && override?.status && override.status !== 'published') {
    return undefined;
  }

  if (!baseline && override) {
    // Brand new trip created via admin
    const coverSrc = override.coverImageUrl || (typeof override.coverImage === 'string' ? override.coverImage : override.coverImage?.src) || '';
    const originalCoverSrc = override.originalCoverImageUrl || coverSrc;
    const galleryImgs: EditorialImage[] = Array.isArray(override.galleryUrls)
      ? override.galleryUrls.map((src) => ({ src, alt: override.title || 'Gallery' }))
      : (override.galleryImages || []).map((img) => ({ src: img.src, alt: img.alt || override.title || 'Gallery', location: img.location }));

    return {
      id: override.id || override.slug || tripId,
      destinationId: (override.destination || override.destinationName || 'india').toLowerCase().replace(/\s+/g, '-'),
      destination: override.destination || override.destinationName || 'India',
      title: override.title || 'Curated Journey',
      subtitle: override.shortDescription || '',
      shortDescription: override.shortDescription || '',
      longDescription: override.longDescription || override.shortDescription || '',
      durationNights: override.durationNights || 5,
      durationDays: override.durationDays || 6,
      pricePerPerson: override.pricePerPerson || 0,
      isPriceOnRequest: override.isPriceOnRequest ?? true,
      rating: 4.9,
      reviewCount: 48,
      category: 'Signature',
      status: override.status || 'published',
      originalCoverImageUrl: originalCoverSrc,
      coverImage: {
        src: coverSrc,
        alt: override.title || 'Curated Journey',
      },
      galleryImages: galleryImgs,
      route: '',
      inclusions: override.inclusions || [],
      exclusions: override.exclusions || [],
      highlights: override.highlights || [],
      itinerary: (override.itinerary && override.itinerary.length > 0 ? override.itinerary : override.itineraryDays) || [],
    };
  }

  // Merge baseline with override
  const b = baseline!;
  const o = override;

  if (!o) return b;

  const coverSrc = o.coverImageUrl || (typeof o.coverImage === 'string' ? o.coverImage : o.coverImage?.src) || b.coverImage.src;
  const originalCoverSrc = o.originalCoverImageUrl || b.coverImage.src;

  const galleryImgs: EditorialImage[] = Array.isArray(o.galleryUrls)
    ? o.galleryUrls.map((src) => ({ src, alt: o.title || b.title }))
    : o.galleryImages
    ? o.galleryImages.map((img) => ({ src: img.src, alt: img.alt || b.title, location: img.location }))
    : b.galleryImages || [];

  const rawItinerary = (o.itinerary && o.itinerary.length > 0 ? o.itinerary : o.itineraryDays) || b.itinerary || [];

  return {
    ...b,
    title: o.title || b.title,
    destination: o.destination || o.destinationName || b.destination,
    durationDays: o.durationDays || b.durationDays,
    durationNights: o.durationNights || b.durationNights,
    pricePerPerson: typeof o.pricePerPerson === 'number' ? o.pricePerPerson : b.pricePerPerson,
    isPriceOnRequest: o.isPriceOnRequest ?? b.isPriceOnRequest,
    shortDescription: o.shortDescription || b.shortDescription,
    longDescription: o.longDescription || b.longDescription,
    status: o.status || 'published',
    originalCoverImageUrl: originalCoverSrc,
    coverImage: {
      ...b.coverImage,
      src: coverSrc,
      alt: o.title || b.coverImage.alt || b.title,
    },
    galleryImages: galleryImgs,
    highlights: o.highlights || b.highlights,
    inclusions: o.inclusions || b.inclusions,
    exclusions: o.exclusions || b.exclusions,
    itinerary: rawItinerary,
  };
}

/**
 * Returns all canonical trips for server-side rendering
 */
export function getAllCanonicalServerTrips(includeUnpublished: boolean = true): TripPackage[] {
  const overrides = getPersistedTripsMap();
  if (overrides.size === 0) {
    return baselineTripPackages;
  }

  const result: TripPackage[] = [];

  for (const pkg of baselineTripPackages) {
    const override = overrides.get(pkg.id.toLowerCase()) || overrides.get(((pkg as any).slug || '').toLowerCase());
    if (!override) {
      result.push(pkg);
      continue;
    }

    if (!includeUnpublished && override.status && override.status !== 'published') {
      continue;
    }

    const coverSrc = override.coverImageUrl || (typeof override.coverImage === 'string' ? override.coverImage : override.coverImage?.src) || pkg.coverImage.src;
    const originalCoverSrc = override.originalCoverImageUrl || pkg.coverImage.src;

    const galleryImgs: EditorialImage[] = Array.isArray(override.galleryUrls)
      ? override.galleryUrls.map((src) => ({ src, alt: override.title || pkg.title }))
      : override.galleryImages
      ? override.galleryImages.map((img) => ({ src: img.src, alt: img.alt || pkg.title, location: img.location }))
      : pkg.galleryImages || [];

    result.push({
      ...pkg,
      title: override.title || pkg.title,
      destination: override.destination || override.destinationName || pkg.destination,
      durationDays: override.durationDays || pkg.durationDays,
      durationNights: override.durationNights || pkg.durationNights,
      pricePerPerson: typeof override.pricePerPerson === 'number' ? override.pricePerPerson : pkg.pricePerPerson,
      isPriceOnRequest: override.isPriceOnRequest ?? pkg.isPriceOnRequest,
      shortDescription: override.shortDescription || pkg.shortDescription,
      longDescription: override.longDescription || pkg.longDescription,
      status: override.status || 'published',
      originalCoverImageUrl: originalCoverSrc,
      coverImage: {
        ...pkg.coverImage,
        src: coverSrc,
        alt: override.title || pkg.coverImage.alt || pkg.title,
      },
      galleryImages: galleryImgs,
      highlights: override.highlights || pkg.highlights,
      inclusions: override.inclusions || pkg.inclusions,
      exclusions: override.exclusions || pkg.exclusions,
      itinerary: (override.itinerary && override.itinerary.length > 0 ? override.itinerary : override.itineraryDays) || pkg.itinerary,
    });
  }

  // Also include any new trips added through admin
  overrides.forEach((override, slug) => {
    const isBaseline = baselineTripPackages.some(
      (b) => b.id.toLowerCase() === slug || ((b as any).slug && (b as any).slug.toLowerCase() === slug)
    );
    if (!isBaseline) {
      if (!includeUnpublished && override.status && override.status !== 'published') {
        return;
      }
      const coverSrc = override.coverImageUrl || (typeof override.coverImage === 'string' ? override.coverImage : override.coverImage?.src) || '';
      const originalCoverSrc = override.originalCoverImageUrl || coverSrc;
      const galleryImgs: EditorialImage[] = Array.isArray(override.galleryUrls)
        ? override.galleryUrls.map((src) => ({ src, alt: override.title || 'Gallery' }))
        : (override.galleryImages || []).map((img) => ({ src: img.src, alt: img.alt || override.title || 'Gallery', location: img.location }));

      result.push({
        id: override.id || override.slug || slug,
        destinationId: (override.destination || override.destinationName || 'india').toLowerCase().replace(/\s+/g, '-'),
        destination: override.destination || override.destinationName || 'India',
        title: override.title || 'Curated Journey',
        subtitle: override.shortDescription || '',
        shortDescription: override.shortDescription || '',
        longDescription: override.longDescription || override.shortDescription || '',
        durationNights: override.durationNights || 5,
        durationDays: override.durationDays || 6,
        pricePerPerson: override.pricePerPerson || 0,
        isPriceOnRequest: override.isPriceOnRequest ?? true,
        rating: 4.9,
        reviewCount: 48,
        category: 'Signature',
        status: override.status || 'published',
        originalCoverImageUrl: originalCoverSrc,
        coverImage: {
          src: coverSrc,
          alt: override.title || 'Curated Journey',
        },
        galleryImages: galleryImgs,
        route: '',
        inclusions: override.inclusions || [],
        exclusions: override.exclusions || [],
        highlights: override.highlights || [],
        itinerary: (override.itinerary && override.itinerary.length > 0 ? override.itinerary : override.itineraryDays) || [],
      });
    }
  });

  return result;
}
