import { supabaseServer } from '@/lib/supabase/server';

export interface CanonicalGalleryImage {
  id: string;
  imageUrl: string;
  location: string;
  caption?: string;
  tripId?: string;
  tripName?: string;
  imagekitFileId?: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
  );
};

/**
 * Authoritative read of gallery images from Supabase PostgreSQL
 */
export async function getAllCanonicalGalleryImages(): Promise<CanonicalGalleryImage[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseServer
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[serverGallery] Supabase gallery query error:', error.message);
        return [];
      }

      if (data && Array.isArray(data)) {
        return data.map((row: any, idx: number) => ({
          id: row.id,
          imageUrl: row.image_url || row.url,
          location: row.location || 'India',
          caption: row.caption || '',
          tripId: row.trip_id || '',
          tripName: row.trip_name || '',
          imagekitFileId: row.imagekit_file_id || '',
          displayOrder: typeof row.display_order === 'number' ? row.display_order : idx + 1,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (dbErr: any) {
      console.error('[serverGallery] Supabase gallery exception:', dbErr.message);
      return [];
    }
  }

  return [];
}

/**
 * Authoritative save/update of a gallery image to Supabase PostgreSQL
 */
export async function saveCanonicalGalleryImage(image: Partial<CanonicalGalleryImage> & { imageUrl: string; location: string }): Promise<CanonicalGalleryImage> {
  const id = image.id || crypto.randomUUID();

  const formatted: CanonicalGalleryImage = {
    id,
    imageUrl: image.imageUrl.trim(),
    location: image.location.trim(),
    caption: image.caption ? image.caption.trim() : '',
    tripId: image.tripId ? image.tripId.trim() : '',
    tripName: image.tripName ? image.tripName.trim() : '',
    imagekitFileId: image.imagekitFileId ? image.imagekitFileId.trim() : '',
    displayOrder: typeof image.displayOrder === 'number' ? image.displayOrder : 0,
    createdAt: image.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const payload: any = {
      image_url: formatted.imageUrl,
      location: formatted.location,
      caption: formatted.caption,
      trip_id: formatted.tripId || null,
      trip_name: formatted.tripName || null,
      imagekit_file_id: formatted.imagekitFileId || null,
      display_order: formatted.displayOrder,
      updated_at: formatted.updatedAt,
    };
    if (isUUID) {
      payload.id = id;
    }

    const { data, error } = await supabaseServer
      .from('gallery_images')
      .upsert(payload, { onConflict: isUUID ? 'id' : undefined })
      .select('*')
      .single();

    if (error) {
      console.error('[serverGallery] Supabase gallery upsert error:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    if (data) {
      formatted.id = data.id;
      formatted.createdAt = data.created_at;
    }
  }

  return formatted;
}

/**
 * Authoritative delete of a gallery image from Supabase PostgreSQL
 */
export async function deleteCanonicalGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const { error } = await supabaseServer.from('gallery_images').delete().eq('id', id);
    if (error) {
      console.error('[serverGallery] Supabase gallery delete error:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }
  }

  return true;
}
