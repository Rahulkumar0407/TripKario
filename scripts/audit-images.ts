import { tripPackages } from '../src/data/trips';

console.log('Auditing image integrity across all 86 packages in src/data/trips.ts...\n');

let missingCovers = 0;
let emptyAlt = 0;
const imageMap = new Map<string, string[]>();

tripPackages.forEach((trip) => {
  const cover = typeof trip.coverImage === 'string' ? trip.coverImage : trip.coverImage?.src;
  const alt = typeof trip.coverImage === 'string' ? trip.title : trip.coverImage?.alt;

  if (!cover || !cover.startsWith('http')) {
    console.error(`[CRITICAL] Trip ${trip.id} has invalid cover image: ${cover}`);
    missingCovers++;
  }

  if (!alt || alt.trim() === '') {
    emptyAlt++;
  }

  if (cover) {
    const list = imageMap.get(cover) || [];
    list.push(`[${trip.id}] (${trip.destination})`);
    imageMap.set(cover, list);
  }
});

console.log(`Audited ${tripPackages.length} packages.`);
console.log(`Missing/Invalid cover URLs: ${missingCovers}`);
console.log(`Missing Alt Text: ${emptyAlt}`);

let multiUsedImages = 0;
imageMap.forEach((trips, url) => {
  if (trips.length > 1) {
    multiUsedImages++;
    // Check if shared across different destinations
    const dests = new Set(trips.map((t) => t.split('(')[1]?.replace(')', '')));
    if (dests.size > 1) {
      console.warn(`[NOTICE] Image shared across different destinations: ${Array.from(dests).join(', ')} -> ${url.slice(0, 60)}...`);
    }
  }
});

console.log(`\nUnique image URLs in use: ${imageMap.size}`);
console.log('✅ Image audit complete.');
