export interface GalleryImage {
  id: string;
  imageUrl: string;
  location: string;
  destination?: string;
  tripId?: string;
  tripName?: string;
  caption?: string;
  alt?: string;
  aspect?: 'landscape' | 'portrait' | 'square' | 'panoramic';
  elevation?: string;
  filmNote?: string;
  rotation?: string;
  imagekitFileId?: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationGroup {
  slug: string;
  name: string;
  count: number;
  featuredImage: GalleryImage;
  photos: GalleryImage[];
  caption?: string;
  tripName?: string;
}

/**
 * Normalizes location string for grouping comparison (case-insensitive, trimmed whitespace)
 */
export function normalizeLocationKey(location: string): string {
  if (!location) return '';
  return location.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Converts a human-readable location into a URL-friendly slug
 * e.g. "Dal Lake, Srinagar" -> "dal-lake-srinagar"
 */
export function slugifyLocation(location: string): string {
  if (!location) return '';
  return location
    .toLowerCase()
    .trim()
    .replace(/[&]/g, 'and')
    .replace(/[^\w\s-]/g, '') // remove special characters except spaces & hyphens
    .replace(/\s+/g, '-')     // replace spaces with -
    .replace(/-+/g, '-')      // collapse multiple -
    .replace(/^-+|-+$/g, ''); // trim leading/trailing -
}

/**
 * Groups a list of gallery images by their canonical location.
 * Only locations that actually have photos will be returned.
 */
export function groupGalleryByLocation(images: GalleryImage[]): LocationGroup[] {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }

  const map = new Map<string, { name: string; slug: string; photos: GalleryImage[] }>();

  images.forEach((img) => {
    if (!img.location || !img.imageUrl) return;
    const normKey = normalizeLocationKey(img.location);
    if (!normKey) return;

    const existing = map.get(normKey);
    if (existing) {
      existing.photos.push(img);
    } else {
      const slug = slugifyLocation(img.location);
      map.set(normKey, {
        name: img.location.trim(),
        slug: slug || `loc-${map.size + 1}`,
        photos: [img],
      });
    }
  });

  const groups: LocationGroup[] = [];

  map.forEach((item) => {
    if (item.photos.length === 0) return;
    const featured = item.photos[0];
    const caption = item.photos.find((p) => Boolean(p.caption?.trim()))?.caption;
    const tripName = item.photos.find((p) => Boolean(p.tripName?.trim()))?.tripName;

    groups.push({
      slug: item.slug,
      name: item.name,
      count: item.photos.length,
      featuredImage: featured,
      photos: item.photos,
      caption: caption || undefined,
      tripName: tripName || undefined,
    });
  });

  return groups;
}

/**
 * Finds a specific location group by its slug
 */
export function getLocationBySlug(images: GalleryImage[], slug: string): LocationGroup | null {
  const groups = groupGalleryByLocation(images);
  return groups.find((g) => g.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Loads current canonical gallery images from localStorage if available in browser,
 * otherwise returns an empty array (NO FAKE / MOCK DATA).
 */
export function loadClientGalleryImages(): GalleryImage[] {
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('tripkario_admin_gallery');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read admin gallery from localStorage:', e);
    }
  }
  return [];
}
