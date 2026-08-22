import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getAllCanonicalServerTrips,
  getCanonicalServerTrip,
  savePersistedTrip,
  deletePersistedTrip,
} from '@/lib/serverTrips';
import { supabaseServer } from '@/lib/supabase/server';

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
  );
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabaseServer
            .from('trips')
            .select('*')
            .eq('slug', id)
            .single();

          if (data && !error) {
            const canonical = getCanonicalServerTrip(id) || ({} as any);
            return NextResponse.json({
              success: true,
              trip: {
                ...canonical,
                id: data.slug || data.id,
                title: data.title,
                destination: data.destination_name,
                durationNights: data.duration_nights,
                durationDays: data.duration_days,
                pricePerPerson: data.price_per_person,
                shortDescription: data.overview,
                coverImage: {
                  ...canonical.coverImage,
                  src: data.cover_image_url || canonical.coverImage?.src,
                },
                highlights: data.highlights || canonical.highlights,
                inclusions: data.inclusions || canonical.inclusions,
                exclusions: data.exclusions || canonical.exclusions,
                status: data.status || 'published',
              },
            });
          }
        } catch (dbErr) {
          console.warn('[api/admin/trips] Supabase fetch single trip failed, using server fallback:', dbErr);
        }
      }

      const trip = getCanonicalServerTrip(id);
      if (!trip) {
        return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, trip });
    }

    // List all trips
    const canonicalTrips = getAllCanonicalServerTrips();

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabaseServer
          .from('trips')
          .select('*')
          .order('display_order', { ascending: true });

        if (data && !error && data.length > 0) {
          const dbMap = new Map(data.map((row) => [row.slug.toLowerCase(), row]));
          const mergedList = canonicalTrips.map((pkg) => {
            const dbTrip = dbMap.get(pkg.id.toLowerCase()) || dbMap.get(((pkg as any).slug || '').toLowerCase());
            if (dbTrip) {
              return {
                ...pkg,
                title: dbTrip.title,
                destination: dbTrip.destination_name,
                durationNights: dbTrip.duration_nights,
                durationDays: dbTrip.duration_days,
                pricePerPerson: dbTrip.price_per_person,
                shortDescription: dbTrip.overview,
                coverImage: {
                  ...pkg.coverImage,
                  src: dbTrip.cover_image_url || pkg.coverImage.src,
                },
                highlights: dbTrip.highlights || pkg.highlights,
                inclusions: dbTrip.inclusions || pkg.inclusions,
                exclusions: dbTrip.exclusions || pkg.exclusions,
                status: dbTrip.status || 'published',
              };
            }
            return pkg;
          });

          return NextResponse.json({ success: true, count: mergedList.length, trips: mergedList });
        }
      } catch (dbErr) {
        console.warn('[api/admin/trips] Supabase list trips failed, using server fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, count: canonicalTrips.length, trips: canonicalTrips });
  } catch (err: any) {
    console.error('Failed to get canonical trips:', err);
    return NextResponse.json({ error: 'Failed to retrieve trips' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tripId, slug, updates } = body;

    const id = tripId || slug || updates?.id || updates?.slug;
    if (!id) {
      return NextResponse.json({ error: 'Missing trip identifier (tripId or slug)' }, { status: 400 });
    }

    const payload = updates || body;
    const status = payload.status || 'published';

    // Validate required fields when publishing
    if (status === 'published') {
      const title = payload.title?.trim();
      const dest = (payload.destinationName || payload.destination)?.trim();
      const cover =
        payload.coverImageUrl ||
        (typeof payload.coverImage === 'string' ? payload.coverImage : payload.coverImage?.src);
      const days = payload.durationDays || payload.durationNights;
      const itinerary = payload.itineraryDays || payload.itinerary;

      if (!title || !dest || !cover || !days || (Array.isArray(itinerary) && itinerary.length === 0)) {
        return NextResponse.json(
          {
            error:
              'Cannot publish trip: Missing required fields (Title, Destination, Duration, Cover Image, and at least one Day in Itinerary).',
          },
          { status: 400 }
        );
      }
    }

    // 1. Save to Supabase PostgreSQL database if configured
    if (isSupabaseConfigured()) {
      try {
        const nights = payload.durationNights || 4;
        const days = payload.durationDays || 5;
        const price = payload.pricePerPerson || 0;
        const isOnReq = Boolean(payload.isPriceOnRequest);

        await supabaseServer.from('trips').upsert(
          {
            slug: id,
            title: payload.title || 'Curated Journey',
            destination_name: payload.destinationName || payload.destination || 'India',
            duration_nights: nights,
            duration_days: days,
            duration_text: `${nights} Nights · ${days} Days`,
            price_per_person: price,
            price_formatted: isOnReq ? 'Price on Request' : `₹${price.toLocaleString('en-IN')}`,
            cover_image_url:
              payload.coverImageUrl ||
              (typeof payload.coverImage === 'string' ? payload.coverImage : payload.coverImage?.src) ||
              '',
            overview: payload.overview || payload.shortDescription || '',
            highlights: payload.highlights || [],
            inclusions: payload.inclusions || [],
            exclusions: payload.exclusions || [],
            status: payload.status || 'published',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'slug' }
        );
      } catch (dbErr) {
        console.warn('[api/admin/trips] Failed to upsert trip to Supabase:', dbErr);
      }
    }

    // 2. Persist to local JSON override store for offline/local resilience
    const saved = savePersistedTrip(id, payload);

    // 3. Trigger on-demand revalidation for affected routes
    try {
      revalidatePath('/itineraries');
      revalidatePath(`/itineraries/${id}`);
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    const canonicalTrip = getCanonicalServerTrip(id);

    return NextResponse.json({
      success: true,
      message: 'Trip saved successfully.',
      trip: canonicalTrip || saved,
    });
  } catch (err: any) {
    console.error('Failed to save trip:', err);
    return NextResponse.json({ error: 'Failed to persist trip updates' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { tripId, slug } = body;
    const id = tripId || slug;

    if (!id) {
      return NextResponse.json({ error: 'Missing trip identifier for deletion' }, { status: 400 });
    }

    // 1. Delete from Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        await supabaseServer.from('trips').delete().eq('slug', id);
      } catch (dbErr) {
        console.warn('[api/admin/trips] Failed to delete trip from Supabase:', dbErr);
      }
    }

    // 2. Delete from local override store
    deletePersistedTrip(id);

    // 3. Trigger revalidation
    try {
      revalidatePath('/itineraries');
      revalidatePath(`/itineraries/${id}`);
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Trip deleted successfully.',
      id,
    });
  } catch (err: any) {
    console.error('Failed to delete trip:', err);
    return NextResponse.json({ error: 'Failed to delete trip' }, { status: 500 });
  }
}
