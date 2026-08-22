import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { checkIsDuplicateImage, recordAssetHash, computeBufferHash } from '@/lib/imageHashStore';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const fileName = (formData.get('fileName') as string) || file?.name || 'tripkario_photo.jpg';
    const folder = (formData.get('folder') as string) || '/tripkario_media';
    const category = (formData.get('category') as string) || 'Other';
    const currentImageUrl = (formData.get('currentImageUrl') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert file to buffer for cryptographic hash & upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString('base64');
    const assetKey = `${folder}/${fileName}`;

    // ── 01. CONTENT HASH DEDUPLICATION CHECK ───────────────────────────
    // Compare cryptographic SHA-256 hash of incoming buffer against the current active image
    const { isDuplicate, currentHash, newHash } = await checkIsDuplicateImage(
      buffer,
      assetKey,
      currentImageUrl
    );

    if (isDuplicate) {
      console.log(`[ImageKit Upload] Duplicate binary detected for ${assetKey} (Hash: ${newHash}). Skipping upload.`);
      return NextResponse.json({
        success: false,
        isDuplicate: true,
        message: 'This image is already the current image.',
        contentHash: newHash,
        currentHash,
        url: currentImageUrl,
      });
    }

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    const useUniqueParam = formData.get('useUniqueFileName');
    const useUniqueFileName = useUniqueParam === 'false' ? false : true;

    // ── 02. EXECUTE UPLOAD ONLY FOR DISTINCT BINARIES ──────────────────
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
        useUniqueFileName,
        overwriteFile: !useUniqueFileName,
      });

      const versionId = (response as any).versionInfo?.id || (response as any).versionId || `v_${Date.now()}`;
      // Record the confirmed new hash for future deduplication comparisons and restore mapping
      recordAssetHash(assetKey, newHash, versionId);

      const versionUrl = response.url.includes('?')
        ? `${response.url}&v=${versionId}`
        : `${response.url}?v=${versionId}`;

      return NextResponse.json({
        success: true,
        isDuplicate: false,
        message: 'Image replaced successfully.',
        fileId: response.fileId,
        versionId,
        name: response.name,
        url: versionUrl,
        rawUrl: response.url,
        thumbnailUrl: response.thumbnailUrl ? `${response.thumbnailUrl}&v=${versionId}` : versionUrl,
        width: response.width,
        height: response.height,
        size: response.size,
        contentHash: newHash,
        category,
      });
    }

    // Mock local fallback response for testing without keys
    recordAssetHash(assetKey, newHash);
    const mockId = `ik_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockDataUrl = `data:${file.type};base64,${base64File}`;

    return NextResponse.json({
      success: true,
      isDuplicate: false,
      message: 'Image replaced successfully.',
      fileId: mockId,
      versionId: `mock_${Date.now()}`,
      name: fileName,
      url: mockDataUrl,
      rawUrl: mockDataUrl,
      thumbnailUrl: mockDataUrl,
      width: 1600,
      height: 1200,
      size: buffer.byteLength,
      contentHash: newHash,
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
