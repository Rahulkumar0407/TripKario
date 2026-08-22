import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileId, versionId, targetUrl } = body;

    if (!fileId || !versionId) {
      return NextResponse.json(
        { error: 'Missing file or version identifier for restore.' },
        { status: 400 }
      );
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return NextResponse.json(
        { error: 'ImageKit private key not configured.' },
        { status: 500 }
      );
    }

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    let targetFileId = fileId && !fileId.startsWith('ik_file_') && !fileId.startsWith('sim_') ? fileId : null;

    if (!targetFileId && targetUrl && publicKey && urlEndpoint) {
      try {
        const ImageKit = (await import('imagekit')).default;
        const imagekit = new ImageKit({
          publicKey,
          privateKey,
          urlEndpoint,
        });

        const parsed = new URL(targetUrl.startsWith('http') ? targetUrl : `https://ik.imagekit.io${targetUrl}`);
        const cleanPath = parsed.pathname.replace(/^\/tripkario/, '');
        const parts = cleanPath.split('/').filter(Boolean);
        const fileName = parts.pop() || '';
        const folder = '/' + parts.join('/');

        const files = await imagekit.listFiles({
          name: fileName,
          path: folder || undefined,
          limit: 1,
        });

        if (Array.isArray(files) && files.length > 0 && (files[0] as any).fileId) {
          targetFileId = (files[0] as any).fileId;
        }
      } catch (e) {
        console.warn('Could not lookup fileId for restore:', e);
      }
    }

    // If real fileId exists on ImageKit, invoke restore API
    if (targetFileId) {
      const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;
      const res = await fetch(`https://api.imagekit.io/v1/files/${targetFileId}/versions/${versionId}/restore`, {
        method: 'PUT',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn('ImageKit restore version returned status:', res.status, errText);
      }
    }

    const restoredUrl = targetUrl.includes('?') ? `${targetUrl}&restored=${Date.now()}` : `${targetUrl}?restored=${Date.now()}`;

    // Recompute and update the stored hash for this asset so future uploads compare against the restored binary
    try {
      const { computeRemoteImageHash, recordAssetHash, getVersionHash } = await import('@/lib/imageHashStore');
      const knownVersionHash = getVersionHash(versionId);
      if (knownVersionHash) {
        recordAssetHash(targetUrl, knownVersionHash, versionId);
      } else {
        const newHash = await computeRemoteImageHash(targetUrl);
        if (newHash) {
          recordAssetHash(targetUrl, newHash, versionId);
        }
      }
    } catch (hashErr) {
      console.warn('Could not update asset hash after restore:', hashErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Image restored.',
      url: restoredUrl,
    });
  } catch (error: any) {
    console.error('Failed to restore image version:', error);
    return NextResponse.json(
      { error: "Couldn't restore this image. Please try again." },
      { status: 500 }
    );
  }
}
