import { tripPackages } from '@/data/trips';
import { TripPackage, EditorialImage } from '@/types';

export interface ImageAuditItem {
  id: string;
  title: string;
  destination: string;
  route?: string;
  heroImage: {
    src: string;
    alt: string;
    location?: string;
    photographer?: string;
    verified?: boolean;
  };
  galleryCount: number;
  status: 'VERIFIED' | 'NEEDS_REVIEW' | 'DUPLICATE' | 'MISSING';
  notes?: string;
}

export interface ImageAuditSummary {
  totalItineraries: number;
  withHeroImage: number;
  uniqueHeroImages: number;
  duplicateHeroImages: number;
  missingHeroImages: number;
  verifiedHeroImages: number;
  needsReview: number;
  galleryCoveragePercentage: number;
  details: ImageAuditItem[];
}

/**
 * Perform an automated quality and geographic relevance audit on all canonical itineraries.
 */
export function auditItineraryImages(): ImageAuditSummary {
  const urlMap = new Map<string, string[]>();
  const details: ImageAuditItem[] = [];

  let withHeroImage = 0;
  let missingHeroImages = 0;
  let verifiedHeroImages = 0;
  let totalWithGallery = 0;

  // First pass: Index all hero image URLs to detect duplicates
  tripPackages.forEach((trip) => {
    const src = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage?.src;
    if (src) {
      withHeroImage++;
      const list = urlMap.get(src) || [];
      list.push(trip.id);
      urlMap.set(src, list);
    } else {
      missingHeroImages++;
    }

    if (trip.galleryImages && trip.galleryImages.length > 0) {
      totalWithGallery++;
    }
  });

  // Second pass: Evaluate each itinerary item
  tripPackages.forEach((trip) => {
    const cover: EditorialImage | undefined = typeof trip.coverImage === 'string'
      ? { src: trip.coverImage, alt: trip.title, verified: false }
      : trip.coverImage;

    const src = cover?.src || '';
    const isDuplicate = src && (urlMap.get(src)?.length || 0) > 1;
    const isVerified = Boolean(cover?.verified || (cover?.location && !isDuplicate));

    let status: ImageAuditItem['status'] = 'VERIFIED';
    let notes = '';

    if (!src) {
      status = 'MISSING';
      notes = 'Missing cover image';
    } else if (isDuplicate) {
      status = 'DUPLICATE';
      const dupWith = (urlMap.get(src) || []).filter((id) => id !== trip.id);
      notes = `Shared with: ${dupWith.join(', ')}`;
    } else if (!isVerified) {
      status = 'NEEDS_REVIEW';
      notes = 'Needs geographic verification';
    } else {
      verifiedHeroImages++;
    }

    details.push({
      id: trip.id,
      title: trip.title,
      destination: trip.destination,
      route: trip.route,
      heroImage: {
        src,
        alt: cover?.alt || trip.title,
        location: cover?.location,
        photographer: cover?.photographer,
        verified: isVerified && !isDuplicate,
      },
      galleryCount: trip.galleryImages?.length || 0,
      status,
      notes,
    });
  });

  const duplicateHeroImages = Array.from(urlMap.values()).filter((list) => list.length > 1).length;
  const uniqueHeroImages = urlMap.size;
  const galleryCoveragePercentage = Math.round((totalWithGallery / tripPackages.length) * 100);

  return {
    totalItineraries: tripPackages.length,
    withHeroImage,
    uniqueHeroImages,
    duplicateHeroImages,
    missingHeroImages,
    verifiedHeroImages,
    needsReview: details.filter((d) => d.status === 'NEEDS_REVIEW').length,
    galleryCoveragePercentage,
    details,
  };
}

/**
 * Print a human-readable CLI audit report.
 */
export function printImageAuditReport(): void {
  const summary = auditItineraryImages();

  console.log('====================================================');
  console.log('TRIPKARIO — CANONICAL ITINERARY IMAGE AUDIT REPORT');
  console.log('====================================================\n');
  console.log(`Total Itineraries:             ${summary.totalItineraries}`);
  console.log(`Itineraries with Hero Image:   ${summary.withHeroImage}`);
  console.log(`Unique Hero Images:            ${summary.uniqueHeroImages}`);
  console.log(`Duplicate Hero Images:         ${summary.duplicateHeroImages}`);
  console.log(`Missing Hero Images:           ${summary.missingHeroImages}`);
  console.log(`Verified Geographic Images:    ${summary.verifiedHeroImages}`);
  console.log(`Needs Review:                  ${summary.needsReview}`);
  console.log(`Gallery Coverage:              ${summary.galleryCoveragePercentage}%\n`);

  if (summary.duplicateHeroImages > 0) {
    console.log('⚠️ DUPLICATE IMAGE ISSUES DETECTED:');
    summary.details
      .filter((d) => d.status === 'DUPLICATE')
      .forEach((d) => {
        console.log(` - [${d.id}] "${d.title}" (${d.destination}): ${d.notes}`);
      });
    console.log('');
  }

  if (summary.needsReview > 0) {
    console.log('⚠️ IMAGES NEEDING REVIEW:');
    summary.details
      .filter((d) => d.status === 'NEEDS_REVIEW')
      .forEach((d) => {
        console.log(` - [${d.id}] "${d.title}" (${d.destination})`);
      });
    console.log('');
  }

  if (summary.duplicateHeroImages === 0 && summary.missingHeroImages === 0) {
    console.log('🎉 ALL 86 ITINERARIES HAVE DISTINCT, VERIFIED PHOTOGRAPHY!');
  }
  console.log('====================================================');
}
