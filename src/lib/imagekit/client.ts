/**
 * ImageKit Media Optimization & Delivery Utility for TripKario
 */

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/tripkario';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  cropMode?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  blur?: number;
}

/**
 * Builds an optimized ImageKit delivery URL with responsive transformations
 */
export function getOptimizedImageUrl(
  rawUrlOrPath: string,
  options: ImageTransformOptions = {}
): string {
  if (!rawUrlOrPath) return '';

  // If it's an external URL (e.g. Unsplash) or already transformed, return safe URL
  if (rawUrlOrPath.startsWith('http://') || rawUrlOrPath.startsWith('https://')) {
    if (!rawUrlOrPath.includes('ik.imagekit.io')) {
      return rawUrlOrPath;
    }
  }

  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    cropMode = 'maintain_ratio',
    blur,
  } = options;

  const transforms: string[] = [];

  if (width) transforms.push(`w-${width}`);
  if (height) transforms.push(`h-${height}`);
  if (quality) transforms.push(`q-${quality}`);
  if (format) transforms.push(`f-${format}`);
  if (cropMode) transforms.push(`cm-${cropMode}`);
  if (blur) transforms.push(`bl-${blur}`);

  const transformString = transforms.length > 0 ? `tr:${transforms.join(',')}` : '';
  const cleanPath = rawUrlOrPath.startsWith('/') ? rawUrlOrPath.slice(1) : rawUrlOrPath;

  if (transformString) {
    return `${IMAGEKIT_ENDPOINT}/${transformString}/${cleanPath}`;
  }

  return `${IMAGEKIT_ENDPOINT}/${cleanPath}`;
}
