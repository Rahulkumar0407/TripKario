import fs from 'fs';
import path from 'path';
import { tripPackages } from '../src/data/trips';
import { fullItinerariesMap } from './populate_all_44';
import { TripPackage } from '../src/types';

console.log('Original trips count:', tripPackages.length);

const defaultInclusionsMap: Record<string, string[]> = {
  trek: [
    'Certified Mountaineering Trek Leaders & Local Guides',
    'All Meals during the Trek (Nutritious High-Altitude Diet)',
    'Alpine Quality Dome Tents on Sharing Basis with Warm Sleeping Bags & Foam Mattresses',
    'Trek Equipment (Microspikes, Gaiters, Kitchen & Dining Tents)',
    'Forest Permits, Entry Fees & Basic First Aid with O2 Cylinder'
  ],
  bike: [
    'Royal Enfield Himalayan / Classic 350/411cc for the entire circuit',
    'Fuel for the designated circuit itinerary',
    'Experienced Road Captain & Certified Mechanic with Spare Parts Kit',
    'Backup Vehicle / Luggage Van throughout the tour',
    'Quality Stays in Hotels, Swiss Camps & Homestays on Twin/Triple Sharing',
    'Daily Breakfast and Dinner at all locations',
    'Inner Line Permits & Wildlife Fees'
  ],
  road: [
    'Dedicated Chauffeur-Driven Sanitized Private AC Vehicle throughout',
    'Handpicked Boutique Stays & Heritage Hotels on Twin Sharing',
    'Daily Breakfast and Gourmet Local Dinners',
    'Sightseeing & Driver Allowances, Tolls, State Taxes and Parking'
  ]
};

const defaultExclusions = [
  'Airfare / Train tickets to starting point',
  'Personal expenses, laundry, telephone, and tipping',
  'Monument entry tickets, camera fees, or optional adventure activities not mentioned in inclusions',
  'Cost arising from natural calamities, roadblocks, or flight cancellations',
  'Personal travel and medical insurance'
];

let updatedCount = 0;

const updatedTrips: TripPackage[] = tripPackages.map((trip) => {
  const customItinerary = fullItinerariesMap[trip.id];
  let itinerary = trip.itinerary && trip.itinerary.length > 0 ? trip.itinerary : customItinerary || [];

  if (customItinerary && customItinerary.length > 0) {
    updatedCount++;
  }

  // Ensure inclusions & exclusions exist
  let inclusions = trip.inclusions && trip.inclusions.length > 0 ? trip.inclusions : [];
  if (inclusions.length === 0) {
    if (trip.id.includes('trek')) inclusions = defaultInclusionsMap.trek;
    else if (trip.id.includes('bike') || trip.id.includes('motorbike')) inclusions = defaultInclusionsMap.bike;
    else inclusions = defaultInclusionsMap.road;
  }

  let exclusions = trip.exclusions && trip.exclusions.length > 0 ? trip.exclusions : defaultExclusions;

  return {
    ...trip,
    inclusions,
    exclusions,
    itinerary
  };
});

console.log(`Updated ${updatedCount} packages with fresh day-by-day itineraries.`);

// Check completeness
const stillMissing = updatedTrips.filter((t) => !t.itinerary || t.itinerary.length === 0);
console.log('Still missing itinerary:', stillMissing.length);
if (stillMissing.length > 0) {
  console.log('Missing IDs:', stillMissing.map((t) => t.id));
}

// Generate the TypeScript file content
const fileHeader = `import { TripPackage } from '@/types';\n\nexport const tripPackages: TripPackage[] = `;
const jsonString = JSON.stringify(updatedTrips, null, 2);
const fullContent = fileHeader + jsonString + ';\n';

fs.writeFileSync(path.join(__dirname, '../src/data/trips.ts'), fullContent, 'utf-8');
console.log('Successfully wrote updated tripPackages to src/data/trips.ts');
