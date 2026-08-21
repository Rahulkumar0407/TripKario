import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { tripPackages } from '../src/data/trips';
import { getImageKitUrl, getCardImageUrl, getModalHeroImageUrl, getThumbnailImageUrl } from '../src/lib/imagekit';

interface TripAuditResult {
  index: number;
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  route?: string;
  coverImageSrc?: string;
  coverImageAlt?: string;
  coverImageLocation?: string;
  coverImagePhotographer?: string;
  coverImageSource?: string;
  coverImageSourceUrl?: string;
  coverImageLicense?: string;
  coverImageVerified?: boolean;
  sourceMetadata?: {
    sourceName?: string;
    sourceUrl?: string;
    sourceCheckedAt?: string;
    source?: string;
    sourcePackageName?: string;
  };
  httpStatus?: number;
  contentType?: string;
  contentLength?: number;
  hash?: string;
  isImageKitHost: boolean;
  imageKitPath?: string;
  expectedFolderMatch: boolean;
  folderDestinationMismatch: boolean;
  folderTripIdMismatch: boolean;
  hasSuspiciousPlaceholder: boolean;
  hasEmptyAlt: boolean;
  error?: string;
}

async function runAudit() {
  console.log('================================================================');
  console.log('TRIPKARIO — COMPREHENSIVE PROGRAMMATIC IMAGE QA AUDIT');
  console.log('================================================================\n');

  console.log(`Loaded ${tripPackages.length} trip packages from src/data/trips.ts`);

  const results: TripAuditResult[] = [];
  const urlCountMap = new Map<string, string[]>();
  const hashMap = new Map<string, string[]>();

  // Target retried trips to explicitly check
  const RETRIED_TRIP_IDS = [
    'ladakh-bike-circuit',
    'ladakh-bike-delhi-hanle-umlingla-12d',
    'ladakh-bike-delhi-srinagar-12d',
    'ladakh-bike-srinagar-delhi-12d',
    'himachal-hampta-pass-trek',
    'himachal-beas-kund-trek',
    'himachal-jibhi-tirthan',
    'goa-slow-coastal',
    'uttarakhand-brahmatal-winter-trek',
    'uttarakhand-har-ki-dun-trek',
    'uttarakhand-auli-snow-skiing-5d',
    'south-vacation-to-south-8d',
    'south-beautiful-journey-9d',
  ];

  console.log('\n--- Step 1 & 2 & 3: Verifying all 86 ImageKit URLs via HTTP ---');

  for (let i = 0; i < tripPackages.length; i++) {
    const trip = tripPackages[i];
    const cover = typeof trip.coverImage === 'string' ? { src: trip.coverImage, alt: trip.title } : trip.coverImage;
    const src = cover?.src || '';
    const alt = cover?.alt || '';

    // Check placeholder / suspicious words
    const lowerSrc = src.toLowerCase();
    const lowerAlt = alt.toLowerCase();
    const hasSuspiciousPlaceholder =
      lowerSrc.includes('placeholder') ||
      lowerSrc.includes('image-not-found') ||
      lowerSrc.includes('test-image') ||
      lowerSrc.includes('demo-image') ||
      lowerAlt.includes('placeholder') ||
      lowerAlt.includes('test image') ||
      lowerAlt.includes('demo image');

    const hasEmptyAlt = !alt || alt.trim() === '';

    const isImageKitHost = src.startsWith('https://ik.imagekit.io/tripkario/');
    
    // Parse path: https://ik.imagekit.io/tripkario/tripkario/itineraries/<destination>/<trip-id>/hero.jpg
    let imageKitPath = '';
    let expectedFolderMatch = false;
    let folderDestinationMismatch = false;
    let folderTripIdMismatch = false;

    if (isImageKitHost) {
      const urlObj = new URL(src);
      imageKitPath = urlObj.pathname; // e.g. /tripkario/tripkario/itineraries/kashmir/kashmir-signature/hero.jpg
      const parts = imageKitPath.split('/').filter(Boolean); // ['tripkario', 'tripkario', 'itineraries', dest, tripId, 'hero.jpg']
      
      const destIndex = parts.indexOf('itineraries');
      if (destIndex !== -1 && parts.length >= destIndex + 3) {
        const folderDest = parts[destIndex + 1];
        const folderTripId = parts[destIndex + 2];
        const fileName = parts[destIndex + 3];

        if (folderTripId !== trip.id) {
          folderTripIdMismatch = true;
        }
        
        if (
          folderDest.toLowerCase() !== trip.destinationId.toLowerCase() &&
          folderDest.toLowerCase() !== trip.destination.toLowerCase().replace(/\s+/g, '-')
        ) {
          folderDestinationMismatch = true;
        }

        if (!folderTripIdMismatch && !folderDestinationMismatch && fileName === 'hero.jpg') {
          expectedFolderMatch = true;
        }
      }
    }

    // Index URL usage
    if (src) {
      const list = urlCountMap.get(src) || [];
      list.push(trip.id);
      urlCountMap.set(src, list);
    }

    // HTTP fetch
    let httpStatus = 0;
    let contentType = '';
    let contentLength = 0;
    let hash = '';
    let error: string | undefined;

    try {
      const res = await fetch(src, {
        method: 'GET',
        headers: {
          'User-Agent': 'TripKario-QA-Auditor/1.0',
        },
      });

      httpStatus = res.status;
      contentType = res.headers.get('content-type') || '';
      
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const buf = Buffer.from(arrayBuf);
        contentLength = buf.length;
        hash = crypto.createHash('sha256').update(buf).digest('hex');

        const hashList = hashMap.get(hash) || [];
        hashList.push(trip.id);
        hashMap.set(hash, hashList);
      } else {
        error = `HTTP Error ${res.status} ${res.statusText}`;
      }
    } catch (err: any) {
      error = err.message || String(err);
    }

    const itemResult: TripAuditResult = {
      index: i + 1,
      id: trip.id,
      title: trip.title,
      destination: trip.destination,
      destinationId: trip.destinationId,
      route: trip.route,
      coverImageSrc: src,
      coverImageAlt: alt,
      coverImageLocation: cover?.location,
      coverImagePhotographer: cover?.photographer,
      coverImageSource: cover?.source,
      coverImageSourceUrl: cover?.sourceUrl,
      coverImageLicense: cover?.license,
      coverImageVerified: cover?.verified,
      sourceMetadata: trip.sourceMetadata,
      httpStatus,
      contentType,
      contentLength,
      hash,
      isImageKitHost,
      imageKitPath,
      expectedFolderMatch,
      folderDestinationMismatch,
      folderTripIdMismatch,
      hasSuspiciousPlaceholder,
      hasEmptyAlt,
      error,
    };

    results.push(itemResult);

    process.stdout.write(
      `[${i + 1}/86] Trip: ${trip.id} -> HTTP ${httpStatus} | ${contentType} | ${(contentLength / 1024).toFixed(1)} KB | ${error ? '❌ ' + error : '✅'}\n`
    );
  }

  // Statistics
  const totalTrips = results.length;
  const http200Count = results.filter((r) => r.httpStatus === 200).length;
  const validImageContentTypeCount = results.filter((r) => r.contentType && r.contentType.startsWith('image/')).length;
  const isImageKitHostCount = results.filter((r) => r.isImageKitHost).length;
  const expectedFolderCount = results.filter((r) => r.expectedFolderMatch).length;
  const tripIdFolderMismatchCount = results.filter((r) => r.folderTripIdMismatch).length;
  const destFolderMismatchCount = results.filter((r) => r.folderDestinationMismatch).length;
  const emptyAltCount = results.filter((r) => r.hasEmptyAlt).length;
  const suspiciousPlaceholderCount = results.filter((r) => r.hasSuspiciousPlaceholder).length;

  // Provenance checks
  let missingSourceMetadataCount = 0;
  let missingCoverSourceCount = 0;
  let missingSourceUrlCount = 0;
  let missingSourceCheckedAtCount = 0;

  for (const r of results) {
    if (!r.sourceMetadata) {
      missingSourceMetadataCount++;
    } else {
      if (!r.sourceMetadata.source && !r.sourceMetadata.sourceName) missingCoverSourceCount++;
      if (!r.sourceMetadata.sourceUrl) missingSourceUrlCount++;
      if (!r.sourceMetadata.sourceCheckedAt) missingSourceCheckedAtCount++;
    }
  }

  // Duplicate checks
  const duplicateUrls = Array.from(urlCountMap.entries()).filter(([_, ids]) => ids.length > 1);
  const duplicateHashes = Array.from(hashMap.entries()).filter(([_, ids]) => ids.length > 1);

  // Retried trips explicit check
  console.log('\n================================================================');
  console.log('--- Step 10: Explicit Inspection of 13 Retried/Previously Broken Trips ---');
  console.log('================================================================');
  const retriedResults = results.filter((r) => RETRIED_TRIP_IDS.includes(r.id));
  for (const r of retriedResults) {
    console.log(`Trip ID: ${r.id}`);
    console.log(`  Title: ${r.title}`);
    console.log(`  Destination: ${r.destination}`);
    console.log(`  ImageKit URL: ${r.coverImageSrc}`);
    console.log(`  HTTP Status: ${r.httpStatus} | Content-Type: ${r.contentType} | Size: ${(r.contentLength || 0) / 1024} KB`);
    console.log(`  Folder Match: ${r.expectedFolderMatch ? 'PERFECT' : 'CHECK'} (Trip ID Match: ${!r.folderTripIdMismatch}, Dest Match: ${!r.folderDestinationMismatch})`);
    console.log(`  Provenance: Source=${r.sourceMetadata?.source || r.sourceMetadata?.sourceName}, URL=${r.sourceMetadata?.sourceUrl}`);
    console.log(`  Alt: "${r.coverImageAlt}"`);
    console.log(`  Location: "${r.coverImageLocation}" | Photographer: "${r.coverImagePhotographer}"`);
    console.log('');
  }

  // ImageKit URL Transformation checks
  console.log('\n================================================================');
  console.log('--- Step 8: Testing ImageKit Transformations Utility ---');
  console.log('================================================================');
  const samplePath = 'tripkario/itineraries/kashmir/kashmir-signature/hero.jpg';
  const sampleUrl = 'https://ik.imagekit.io/tripkario/tripkario/itineraries/kashmir/kashmir-signature/hero.jpg';
  
  const defaultUrl = getImageKitUrl(samplePath);
  const cardUrl = getCardImageUrl(samplePath);
  const modalUrl = getModalHeroImageUrl(samplePath);
  const thumbUrl = getThumbnailImageUrl(samplePath);
  const retransformedUrl = getImageKitUrl(sampleUrl, { width: 600, quality: 75 });

  console.log(`Sample Base Input: ${samplePath}`);
  console.log(`  Default:       ${defaultUrl}`);
  console.log(`  Card (w=900):  ${cardUrl}`);
  console.log(`  Modal (w=1920): ${modalUrl}`);
  console.log(`  Thumb (w=320): ${thumbUrl}`);
  console.log(`  Re-transform:  ${retransformedUrl}`);

  // Test transformation URL accessibility
  console.log('\nVerifying transformed URLs return HTTP 200 from ImageKit CDN...');
  const testUrls = [
    { name: 'Card (900px)', url: cardUrl },
    { name: 'Modal (1920px)', url: modalUrl },
    { name: 'Thumb (320px)', url: thumbUrl },
  ];
  for (const t of testUrls) {
    const res = await fetch(t.url, { method: 'HEAD' });
    console.log(`  ${t.name} -> HTTP ${res.status} | Content-Type: ${res.headers.get('content-type')}`);
  }

  // Write detailed JSON audit data for report generation
  const summaryJson = {
    totalTrips,
    http200Count,
    validImageContentTypeCount,
    isImageKitHostCount,
    expectedFolderCount,
    tripIdFolderMismatchCount,
    destFolderMismatchCount,
    emptyAltCount,
    suspiciousPlaceholderCount,
    missingSourceMetadataCount,
    missingCoverSourceCount,
    missingSourceUrlCount,
    missingSourceCheckedAtCount,
    duplicateUrlsCount: duplicateUrls.length,
    duplicateUrlsList: duplicateUrls,
    duplicateContentHashesCount: duplicateHashes.length,
    duplicateHashesList: duplicateHashes.map(([hash, ids]) => ({ hash, tripIds: ids })),
    retriedTripResults: retriedResults,
    allResults: results,
  };

  const outputPath = path.resolve(__dirname, 'image-qa-results.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(summaryJson, null, 2)
  );

  console.log(`\nSaved full raw audit results to ${outputPath}`);
}

runAudit().catch(console.error);
