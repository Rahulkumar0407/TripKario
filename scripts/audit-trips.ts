import { tripPackages } from '../src/data/trips';
import { TripPackage } from '../src/types';

interface AuditIssue {
  tripId: string;
  field: string;
  issue: string;
  severity: 'CRITICAL' | 'WARNING';
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('TRIPKARIO — COMPREHENSIVE CANONICAL ITINERARY DATA INTEGRITY AUDIT');
console.log('═══════════════════════════════════════════════════════════════\n');

const issues: AuditIssue[] = [];
const seenIds = new Set<string>();
const seenTitles = new Map<string, string>();

tripPackages.forEach((trip: TripPackage, index: number) => {
  const prefix = `[${index + 1}/${tripPackages.length}] (${trip.id || 'NO_ID'})`;

  // 1. ID check
  if (!trip.id || trip.id.trim() === '') {
    issues.push({ tripId: 'UNKNOWN', field: 'id', issue: 'Missing or empty trip ID', severity: 'CRITICAL' });
  } else if (seenIds.has(trip.id)) {
    issues.push({ tripId: trip.id, field: 'id', issue: `Duplicate trip ID: ${trip.id}`, severity: 'CRITICAL' });
  } else {
    seenIds.add(trip.id);
  }

  // 2. Title check
  if (!trip.title || trip.title.trim() === '') {
    issues.push({ tripId: trip.id, field: 'title', issue: 'Missing trip title', severity: 'CRITICAL' });
  } else if (trip.title.includes('Lorem') || trip.title.includes('placeholder')) {
    issues.push({ tripId: trip.id, field: 'title', issue: 'Contains placeholder text in title', severity: 'CRITICAL' });
  }

  // 3. Destination check
  if (!trip.destination || trip.destination.trim() === '') {
    issues.push({ tripId: trip.id, field: 'destination', issue: 'Missing destination', severity: 'CRITICAL' });
  }

  // 4. Duration internal consistency
  if (!trip.durationDays || trip.durationDays <= 0) {
    issues.push({ tripId: trip.id, field: 'durationDays', issue: 'Invalid durationDays', severity: 'CRITICAL' });
  }
  if (trip.durationNights === undefined || trip.durationNights < 0) {
    issues.push({ tripId: trip.id, field: 'durationNights', issue: 'Invalid durationNights', severity: 'CRITICAL' });
  }
  if (trip.durationDays !== trip.durationNights + 1 && trip.durationDays !== trip.durationNights) {
    issues.push({
      tripId: trip.id,
      field: 'duration',
      issue: `Duration mismatch: ${trip.durationNights}N / ${trip.durationDays}D`,
      severity: 'WARNING'
    });
  }

  // 5. Route check
  if (!trip.route || trip.route.trim() === '') {
    issues.push({ tripId: trip.id, field: 'route', issue: 'Missing route', severity: 'CRITICAL' });
  }

  // 6. Cover image check
  const coverSrc = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage?.src;
  if (!coverSrc || coverSrc.trim() === '') {
    issues.push({ tripId: trip.id, field: 'coverImage', issue: 'Missing cover image', severity: 'CRITICAL' });
  }

  // 7. Descriptions check
  if (!trip.shortDescription || trip.shortDescription.trim() === '') {
    issues.push({ tripId: trip.id, field: 'shortDescription', issue: 'Missing short description', severity: 'CRITICAL' });
  } else if (trip.shortDescription.includes('Lorem') || trip.shortDescription.includes('placeholder')) {
    issues.push({ tripId: trip.id, field: 'shortDescription', issue: 'Placeholder text in shortDescription', severity: 'CRITICAL' });
  }

  // 8. Day-wise Itinerary check
  if (!trip.itinerary || trip.itinerary.length === 0) {
    issues.push({ tripId: trip.id, field: 'itinerary', issue: 'Missing day-wise itinerary', severity: 'CRITICAL' });
  } else {
    // Check day count vs durationDays
    if (trip.itinerary.length !== trip.durationDays) {
      issues.push({
        tripId: trip.id,
        field: 'itinerary.length',
        issue: `Itinerary day count (${trip.itinerary.length}) does not match durationDays (${trip.durationDays})`,
        severity: 'CRITICAL'
      });
    }

    // Check individual days
    const seenDayNumbers = new Set<number>();
    trip.itinerary.forEach((day, dIdx) => {
      if (day.dayNumber !== dIdx + 1) {
        issues.push({
          tripId: trip.id,
          field: `itinerary[${dIdx}].dayNumber`,
          issue: `Day numbering mismatch: index ${dIdx} has dayNumber ${day.dayNumber}`,
          severity: 'CRITICAL'
        });
      }
      if (seenDayNumbers.has(day.dayNumber)) {
        issues.push({
          tripId: trip.id,
          field: `itinerary[${dIdx}].dayNumber`,
          issue: `Duplicate day number ${day.dayNumber}`,
          severity: 'CRITICAL'
        });
      }
      seenDayNumbers.add(day.dayNumber);

      if (!day.title || day.title.trim() === '') {
        issues.push({
          tripId: trip.id,
          field: `itinerary[${dIdx}].title`,
          issue: `Missing title for Day ${day.dayNumber}`,
          severity: 'CRITICAL'
        });
      }

      if (!day.description || day.description.trim() === '') {
        issues.push({
          tripId: trip.id,
          field: `itinerary[${dIdx}].description`,
          issue: `Missing description for Day ${day.dayNumber}`,
          severity: 'CRITICAL'
        });
      } else if (day.description.includes('Lorem') || day.description.includes('TODO')) {
        issues.push({
          tripId: trip.id,
          field: `itinerary[${dIdx}].description`,
          issue: `Placeholder text in Day ${day.dayNumber} description`,
          severity: 'CRITICAL'
        });
      }
    });
  }

  // 9. Inclusions & Exclusions
  if (!trip.inclusions || trip.inclusions.length === 0) {
    issues.push({ tripId: trip.id, field: 'inclusions', issue: 'Missing inclusions list', severity: 'CRITICAL' });
  }
  if (!trip.exclusions || trip.exclusions.length === 0) {
    issues.push({ tripId: trip.id, field: 'exclusions', issue: 'Missing exclusions list', severity: 'CRITICAL' });
  }

  // 10. Price check
  if (!trip.isPriceOnRequest && (!trip.pricePerPerson || trip.pricePerPerson <= 0)) {
    issues.push({
      tripId: trip.id,
      field: 'pricePerPerson',
      issue: 'Price is zero or negative but isPriceOnRequest is false',
      severity: 'CRITICAL'
    });
  }

  // 11. Provenance check
  if (!trip.sourceMetadata?.sourceUrl) {
    issues.push({ tripId: trip.id, field: 'sourceMetadata', issue: 'Missing sourceUrl in provenance', severity: 'WARNING' });
  }
});

console.log(`Audited ${tripPackages.length} packages in src/data/trips.ts`);
console.log(`Unique IDs: ${seenIds.size} / ${tripPackages.length}`);

const criticalIssues = issues.filter((i) => i.severity === 'CRITICAL');
const warningIssues = issues.filter((i) => i.severity === 'WARNING');

console.log(`\nResults:`);
console.log(`- Critical Issues: ${criticalIssues.length}`);
console.log(`- Warning Issues: ${warningIssues.length}`);

if (issues.length > 0) {
  console.log('\n--- DETAILED ISSUE LIST ---');
  issues.forEach((iss) => {
    console.log(`[${iss.severity}] [${iss.tripId}] ${iss.field}: ${iss.issue}`);
  });
}

if (criticalIssues.length > 0) {
  console.error(`\n❌ AUDIT FAILED with ${criticalIssues.length} critical issues.`);
  process.exit(1);
} else {
  console.log('\n✅ ALL 86 TRIPS PASSED CANONICAL INTEGRITY AUDIT!');
  process.exit(0);
}
