import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/tripkario';
    const configuredLimitGb = process.env.IMAGEKIT_STORAGE_LIMIT_GB
      ? parseFloat(process.env.IMAGEKIT_STORAGE_LIMIT_GB)
      : null;

    if (!privateKey) {
      return NextResponse.json(
        { error: 'ImageKit private key is not configured.' },
        { status: 500 }
      );
    }

    const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;

    // ImageKit usage API requires startDate and endDate in YYYY-MM-DD format covering the month boundary
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    const usageUrl = `https://api.imagekit.io/v1/accounts/usage?startDate=${startDate}&endDate=${endDate}`;

    let mediaLibraryStorageBytes = 0;
    let rawApiResponse: any = null;

    try {
      const res = await fetch(usageUrl, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          Accept: 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (res.ok) {
        rawApiResponse = await res.json();
        // Official field: mediaLibraryStorageBytes (Current Media Library Storage)
        // We explicitly isolate this metric from bandwidthBytes, videoProcessingUnits, extensionUnits, etc.
        if (typeof rawApiResponse?.mediaLibraryStorageBytes === 'number') {
          mediaLibraryStorageBytes = rawApiResponse.mediaLibraryStorageBytes;
        }
      } else {
        console.warn('ImageKit accounts/usage HTTP status:', res.status);
      }
    } catch (fetchErr) {
      console.warn('Could not query accounts/usage:', fetchErr);
    }

    // If accounts/usage is lagging behind recent uploads or returned 0 due to aggregation window,
    // query live media library files directly via ImageKit SDK to get the real-time exact storage.
    let liveMediaStorageBytes = 0;
    if (publicKey && privateKey) {
      try {
        const imagekit = new ImageKit({
          publicKey,
          privateKey,
          urlEndpoint,
        });

        let skip = 0;
        const limit = 100;
        let fetchedAny = false;

        while (true) {
          const files = await imagekit.listFiles({
            skip,
            limit,
          });

          if (!Array.isArray(files) || files.length === 0) break;
          fetchedAny = true;

          for (const file of files) {
            const item = file as any;
            liveMediaStorageBytes += typeof item?.size === 'number' ? item.size : 0;
          }

          if (files.length < limit) break;
          skip += limit;
        }

        if (!fetchedAny) {
          liveMediaStorageBytes = 0;
        }
      } catch (sdkErr) {
        console.warn('Live file storage aggregation fallback error:', sdkErr);
      }
    }

    // Authoritative Current Media Library Storage in bytes
    // Uses the maximum of official aggregated metric and live file scan to ensure accurate dashboard parity
    const storageBytes: number = Math.max(mediaLibraryStorageBytes, liveMediaStorageBytes);

    // Format human-readable storage
    let formattedUsed = '0 MB';
    if (storageBytes > 0) {
      const mb = storageBytes / (1024 * 1024);
      if (mb < 1024) {
        formattedUsed = `${mb.toFixed(1)} MB`;
      } else {
        const gb = storageBytes / (1024 * 1024 * 1024);
        formattedUsed = `${gb.toFixed(2)} GB`;
      }
    }

    // Plan Limit / Quota calculations
    let limitBytes: number | null = null;
    let formattedLimit: string | null = null;
    let formattedRemaining: string | null = null;
    let percentUsed: number | null = null;
    const limitKnown = Boolean(configuredLimitGb && configuredLimitGb > 0);

    if (limitKnown && configuredLimitGb) {
      limitBytes = configuredLimitGb * 1024 * 1024 * 1024;
      formattedLimit = `${configuredLimitGb} GB`;
      const usedGb = storageBytes / (1024 * 1024 * 1024);
      const remainingGb = Math.max(0, configuredLimitGb - usedGb);
      formattedRemaining = `${remainingGb.toFixed(2)} GB`;
      percentUsed = Math.min(100, Math.round((usedGb / configuredLimitGb) * 100));
    }

    const warningStatus =
      percentUsed !== null && percentUsed >= 90
        ? 'critical'
        : percentUsed !== null && percentUsed >= 75
        ? 'warning'
        : 'normal';

    return NextResponse.json({
      success: true,
      storageBytes,
      formattedUsed,
      limitBytes,
      formattedLimit,
      formattedRemaining,
      percentUsed,
      limitKnown,
      warningStatus,
      lastUpdated: 'Updated periodically',
      dashboardUrl: 'https://imagekit.io/dashboard',
      metric: 'mediaLibraryStorageBytes',
    });
  } catch (error: any) {
    console.error('Failed to fetch ImageKit storage usage:', error);
    return NextResponse.json(
      { error: "Couldn't load storage usage. Try again." },
      { status: 500 }
    );
  }
}
