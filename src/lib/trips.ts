import { tripPackages as staticTripPackages } from '@/data/trips';
import { TripPackage } from '@/types';

export type { TripPackage };

/**
 * Loads current canonical trip packages by merging local admin modifications
 * (stored in localStorage['tripkario_admin_trips']) with the base catalog.
 */
export function loadClientTripPackages(): TripPackage[] {
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('tripkario_admin_trips');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const adminMap = new Map(
            parsed.map((t: any) => [(t.slug || t.id || '').toLowerCase(), t])
          );

          return staticTripPackages.map((pkg) => {
            const adminTrip = adminMap.get(pkg.id.toLowerCase()) || adminMap.get(((pkg as any).slug || '').toLowerCase());
            if (adminTrip) {
              const coverSrc = adminTrip.coverImageUrl || (typeof adminTrip.coverImage === 'string' ? adminTrip.coverImage : adminTrip.coverImage?.src) || pkg.coverImage.src;
              return {
                ...pkg,
                ...adminTrip,
                id: pkg.id,
                title: adminTrip.title || pkg.title,
                destination: adminTrip.destination || adminTrip.destinationName || pkg.destination,
                pricePerPerson: typeof adminTrip.pricePerPerson === 'number' ? adminTrip.pricePerPerson : pkg.pricePerPerson,
                isPriceOnRequest: adminTrip.isPriceOnRequest ?? pkg.isPriceOnRequest,
                durationDays: adminTrip.durationDays || pkg.durationDays,
                durationNights: adminTrip.durationNights || pkg.durationNights,
                coverImage: {
                  ...pkg.coverImage,
                  src: coverSrc,
                  alt: adminTrip.title || pkg.coverImage.alt || pkg.title,
                },
                galleryImages: Array.isArray(adminTrip.galleryUrls)
                  ? adminTrip.galleryUrls.map((src: string) => ({ src, alt: pkg.title }))
                  : pkg.galleryImages,
              };
            }
            return pkg;
          });
        }
      }
    } catch (e) {
      console.warn('Could not load client trip packages:', e);
    }
  }

  return staticTripPackages;
}

/**
 * Returns single canonical trip by ID or slug.
 */
export function getCanonicalTripById(idOrSlug: string): TripPackage | undefined {
  if (!idOrSlug) return undefined;
  const all = loadClientTripPackages();
  const lower = idOrSlug.toLowerCase().trim();
  return all.find((t) => t.id.toLowerCase() === lower || ((t as any).slug && (t as any).slug.toLowerCase() === lower));
}
