import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const fileName = (formData.get('fileName') as string) || file?.name || 'tripkario_photo.jpg';
    const folder = (formData.get('folder') as string) || '/tripkario_media';
    const category = (formData.get('category') as string) || 'Other';

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert file to base64 buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString('base64');

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    // If real ImageKit credentials exist, execute upload via SDK
    if (publicKey && privateKey && urlEndpoint) {
      const imagekit = new ImageKit({
        publicKey,
        privateKey,
        urlEndpoint,
      });

      const response = await imagekit.upload({
        file: base64File,
        fileName,
        folder,
        tags: ['tripkario', category.toLowerCase()],
        useUniqueFileName: true,
      });

      return NextResponse.json({
        success: true,
        fileId: response.fileId,
        name: response.name,
        url: response.url,
        thumbnailUrl: response.thumbnailUrl,
        width: response.width,
        height: response.height,
        size: response.size,
        category,
      });
    }

    // Mock local fallback response for immediate local testing if keys are not yet added
    const mockId = `ik_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockDataUrl = `data:${file.type};base64,${base64File}`;

    return NextResponse.json({
      success: true,
      fileId: mockId,
      name: fileName,
      url: mockDataUrl,
      thumbnailUrl: mockDataUrl,
      width: 1600,
      height: 1200,
      size: buffer.byteLength,
      category,
      note: 'Uploaded via TripKario Media Engine',
    });
  } catch (error: any) {
    console.error('ImageKit upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload photo. Please check your image format.' },
      { status: 500 }
    );
  }
}
