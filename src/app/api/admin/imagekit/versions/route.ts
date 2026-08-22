import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export interface ImageVersionItem {
  versionId: string;
  label: string; // 'CURRENT' | 'PREVIOUS' | 'ORIGINAL' | 'Version 2'
  date: string;
  url: string;
  thumbnailUrl: string;
  isCurrent: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    const filePath = searchParams.get('path');
    const fileIdParam = searchParams.get('fileId');

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!privateKey || !publicKey || !urlEndpoint) {
      return NextResponse.json(
        { error: 'ImageKit credentials not configured on server.' },
        { status: 500 }
      );
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    let targetFileId = fileIdParam;
    let targetPath = filePath;

    // If full URL provided, extract path
    if (fileUrl && !targetPath) {
      try {
        const parsed = new URL(fileUrl);
        // e.g. /tripkario/tripkario/itineraries/kashmir/hero.jpg -> /itineraries/kashmir/hero.jpg
        targetPath = parsed.pathname.replace(/^\/tripkario/, '');
      } catch {
        targetPath = fileUrl;
      }
    }

    // Try finding file ID via ImageKit listFiles if not directly provided
    if (!targetFileId && targetPath) {
      try {
        const parts = targetPath.split('/').filter(Boolean);
        const fileName = parts.pop() || '';
        const folder = '/' + parts.join('/');

        const files = await imagekit.listFiles({
          name: fileName,
          path: folder || undefined,
          limit: 1,
        });

        if (Array.isArray(files) && files.length > 0) {
          const firstItem = files[0] as any;
          if (firstItem && firstItem.fileId) {
            targetFileId = firstItem.fileId;
          }
        }
      } catch (e) {
        console.warn('Could not search file on ImageKit:', e);
      }
    }

    // If fileId found on ImageKit, query version history and details
    if (targetFileId) {
      const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;
      try {
        // First try official ImageKit list versions endpoint: /v1/files/{fileId}/versions
        const [versionsRes, detailsRes] = await Promise.all([
          fetch(`https://api.imagekit.io/v1/files/${targetFileId}/versions`, {
            headers: { Authorization: authHeader },
          }).catch(() => null),
          fetch(`https://api.imagekit.io/v1/files/${targetFileId}/details`, {
            headers: { Authorization: authHeader },
          }).catch(() => null),
        ]);

        let versionsList: any[] = [];
        let details: any = {};

        if (detailsRes && detailsRes.ok) {
          details = await detailsRes.json();
          if (Array.isArray(details.versionInfo)) {
            versionsList = details.versionInfo;
          }
        }

        if (versionsRes && versionsRes.ok) {
          const vData = await versionsRes.json();
          if (Array.isArray(vData) && vData.length > 0) {
            versionsList = vData;
          } else if (Array.isArray(vData?.versions)) {
            versionsList = vData.versions;
          }
        }

        if (versionsList.length > 0) {
          const total = versionsList.length;
          const formatted: ImageVersionItem[] = versionsList.map((v: any, idx: number) => {
            const isCurrent = idx === 0;
            const isOriginal = idx === total - 1 && total > 1;
            const label = isCurrent
              ? 'CURRENT'
              : isOriginal
              ? 'ORIGINAL'
              : idx === 1
              ? 'PREVIOUS'
              : `Version ${total - idx}`;

            const dateObj = new Date(v.updatedAt || v.createdAt || Date.now());
            const dateStr = dateObj.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            const vId = v.id || v.versionId || `ver_${idx}`;
            const baseUrl = v.url || details.url || fileUrl;
            const versionUrl = baseUrl.includes('?') ? `${baseUrl}&v=${vId}` : `${baseUrl}?v=${vId}`;
            const thumbBase = v.thumbnail || details.thumbnail || baseUrl;
            const versionThumb = thumbBase.includes('?') ? `${thumbBase}&v=${vId}` : `${thumbBase}?v=${vId}`;

            return {
              versionId: vId,
              label,
              date: dateStr,
              url: versionUrl,
              thumbnailUrl: versionThumb,
              isCurrent,
            };
          });

          return NextResponse.json({
            success: true,
            fileId: targetFileId,
            versions: formatted,
          });
        }
      } catch (err) {
        console.warn('Error fetching ImageKit version details:', err);
      }
    }

    // Default baseline: Current original version
    const fallbackUrl = fileUrl || `${urlEndpoint}/${targetPath || 'hero.jpg'}`;
    const defaultVersion: ImageVersionItem = {
      versionId: targetFileId ? `${targetFileId}_v1` : 'original_v1',
      label: 'CURRENT',
      date: 'Original asset',
      url: fallbackUrl,
      thumbnailUrl: fallbackUrl,
      isCurrent: true,
    };

    return NextResponse.json({
      success: true,
      fileId: targetFileId || 'ik_file_default',
      versions: [defaultVersion],
    });
  } catch (error: any) {
    console.error('Failed to get versions:', error);
    return NextResponse.json(
      { error: "Couldn't load image history. Try again." },
      { status: 500 }
    );
  }
}
