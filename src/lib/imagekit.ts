/**
 * TripKario — ImageKit URL & Transformation Utilities
 *
 * Provides deterministic, responsive ImageKit delivery with modern formats (WebP/AVIF),
 * automatic quality optimization, and graceful fallbacks.
 */

export const IMAGEKIT_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
  process.env.IMAGEKIT_URL_ENDPOINT ||
  'https://ik.imagekit.io/tripkario';

export const IMAGEKIT_FALLBACK_HERO = `${IMAGEKIT_ENDPOINT}/default-image.jpg`;

export interface ImageKitTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  blur?: number;
  crop?: 'maintain_ratio' | 'force' | 'at_max' | 'at_least';
  focus?: 'center' | 'top' | 'auto';
  dpr?: number;
}

/**
 * Builds an optimized ImageKit delivery URL from a relative storage path or existing ImageKit URL.
 *
 * Example:
 * getImageKitUrl('tripkario/itineraries/kashmir/kashmir-signature/hero.jpg', { width: 800, quality: 85 })
 * -> "https://ik.imagekit.io/tripkario/tripkario/itineraries/kashmir/kashmir-signature/hero.jpg?tr=w-800,q-85,f-auto"
 */
export function getImageKitUrl(
  pathOrUrl: string | undefined | null,
  options?: ImageKitTransformOptions
): string {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') {
    return IMAGEKIT_FALLBACK_HERO;
  }

  const cleanInput = pathOrUrl.trim();
  if (!cleanInput) return IMAGEKIT_FALLBACK_HERO;

  let baseUrl = '';

  if (cleanInput.startsWith('http://') || cleanInput.startsWith('https://')) {
    // If it's already an ImageKit URL, strip existing ?tr= or ?updatedAt for clean re-transformation
    if (cleanInput.includes('ik.imagekit.io')) {
      baseUrl = cleanInput.split('?')[0];
    } else {
      // External source URL (e.g. fallback before migration)
      return cleanInput;
    }
  } else {
    // Relative path e.g. "tripkario/itineraries/kashmir/..."
    const normalizedPath = cleanInput.startsWith('/') ? cleanInput.slice(1) : cleanInput;
    baseUrl = `${IMAGEKIT_ENDPOINT}/${normalizedPath}`;
  }

  if (!options) {
    return `${baseUrl}?tr=f-auto,q-85`;
  }

  const transforms: string[] = [];

  if (options.width) transforms.push(`w-${Math.round(options.width)}`);
  if (options.height) transforms.push(`h-${Math.round(options.height)}`);
  if (options.quality) transforms.push(`q-${Math.round(options.quality)}`);
  if (options.blur) transforms.push(`bl-${options.blur}`);
  if (options.dpr && options.dpr > 1) transforms.push(`dpr-${options.dpr}`);
  if (options.crop) transforms.push(`c-${options.crop}`);
  if (options.focus) transforms.push(`fo-${options.focus}`);

  // Default to automatic format selection (WebP / AVIF) based on client browser support
  transforms.push(`f-${options.format || 'auto'}`);

  return `${baseUrl}?tr=${transforms.join(',')}`;
}

/**
 * Convenience helper for responsive itinerary card image URLs
 */
export function getCardImageUrl(
  pathOrUrl: string | undefined | null,
  options?: { isFeatured?: boolean; width?: number; quality?: number }
): string {
  const isFeatured = options?.isFeatured ?? false;
  const width = options?.width || (isFeatured ? 960 : 720);
  const quality = options?.quality || (isFeatured ? 82 : 80);

  return getImageKitUrl(pathOrUrl, {
    width,
    quality,
    format: 'auto',
  });
}

/**
 * Normalizes any image URL (ImageKit, Unsplash, external) for catalogue cards
 * to ensure fast decoding, low memory footprint, and high visual fidelity.
 */
export function getOptimizedCardImageUrl(
  imageInput: string | { src: string } | undefined | null,
  options?: { isFeatured?: boolean; width?: number; quality?: number } | boolean
): string {
  if (!imageInput) return IMAGEKIT_FALLBACK_HERO;

  const rawUrl = typeof imageInput === 'string' ? imageInput.trim() : imageInput.src?.trim();
  if (!rawUrl) return IMAGEKIT_FALLBACK_HERO;

  const opts = typeof options === 'boolean' ? { isFeatured: options } : options;
  const isFeatured = opts?.isFeatured ?? false;
  const width = opts?.width || (isFeatured ? 960 : 720);
  const quality = opts?.quality || (isFeatured ? 82 : 80);

  // ImageKit URLs & Relative Paths
  if (rawUrl.includes('ik.imagekit.io') || !rawUrl.startsWith('http')) {
    return getCardImageUrl(rawUrl, { isFeatured, width, quality });
  }

  // Unsplash URLs
  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(rawUrl);
      urlObj.searchParams.set('w', String(width));
      urlObj.searchParams.set('q', String(quality));
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      return urlObj.toString();
    } catch {
      return rawUrl;
    }
  }

  // Other external URLs (Wikimedia, etc.)
  return rawUrl;
}


/**
 * Convenience helper for high-resolution modal hero image URLs
 */
export function getModalHeroImageUrl(pathOrUrl: string | undefined | null): string {
  return getImageKitUrl(pathOrUrl, {
    width: 1920,
    quality: 90,
    format: 'auto',
  });
}

/**
 * Convenience helper for thumbnail image URLs
 */
export function getThumbnailImageUrl(pathOrUrl: string | undefined | null): string {
  return getImageKitUrl(pathOrUrl, {
    width: 320,
    quality: 80,
    format: 'auto',
  });
}

