import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getAllCanonicalGalleryImages,
  saveCanonicalGalleryImage,
  deleteCanonicalGalleryImage,
} from '@/lib/serverGallery';

export async function GET() {
  try {
    const images = await getAllCanonicalGalleryImages();
    return NextResponse.json({ success: true, count: images.length, images });
  } catch (err: any) {
    console.error('Failed to get gallery images:', err);
    return NextResponse.json({ error: 'Failed to retrieve gallery images' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, images } = body;

    if (Array.isArray(images)) {
      const savedList = [];
      for (const img of images) {
        if (img && img.imageUrl && img.location) {
          const saved = await saveCanonicalGalleryImage(img);
          savedList.push(saved);
        }
      }
      try {
        revalidatePath('/gallery');
        revalidatePath('/gallery/location/[slug]');
        revalidatePath('/adminconsole1811/gallery');
        revalidatePath('/');
      } catch (revalErr) {
        console.warn('Revalidation notice:', revalErr);
      }
      return NextResponse.json({ success: true, message: 'Gallery photos saved successfully.', images: savedList });
    }

    const payload = image || body;
    if (!payload || !payload.imageUrl?.trim() || !payload.location?.trim()) {
      return NextResponse.json({ error: 'Image URL and Location are required fields.' }, { status: 400 });
    }

    const saved = await saveCanonicalGalleryImage(payload);

    try {
      revalidatePath('/gallery');
      revalidatePath('/gallery/location/[slug]');
      revalidatePath('/adminconsole1811/gallery');
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Photo uploaded and saved successfully.',
      image: saved,
    });
  } catch (err: any) {
    console.error('Failed to save gallery photo:', err);
    return NextResponse.json({ error: 'Failed to persist gallery photo updates' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing photo id for deletion' }, { status: 400 });
    }

    await deleteCanonicalGalleryImage(id);

    try {
      revalidatePath('/gallery');
      revalidatePath('/gallery/location/[slug]');
      revalidatePath('/adminconsole1811/gallery');
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully.',
      id,
    });
  } catch (err: any) {
    console.error('Failed to delete photo:', err);
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
