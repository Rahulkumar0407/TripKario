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

/**
 * Canonical baseline gallery images.
 * Purely data-driven: Starts empty until photographs are uploaded via the Admin Console.
 */
export const galleryImages: GalleryImage[] = [];

export const journalPhotos: {
  id: string;
  caption: string;
  location: string;
  image: string;
  photographer: string;
}[] = [];
