import { TripPackage } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';

// Existing 26 packages base
import { tripPackages as allPackages } from '../src/data/trips';

const existingSourceMapping: Record<string, { source: 'IYC' | 'GHUMEGA'; sourcePackageName: string }> = {
  'kashmir-signature': { source: 'IYC', sourcePackageName: 'Kashmir Group Tour (6N/7D)' },
  'kashmir-backpacking': { source: 'IYC', sourcePackageName: 'Kashmir Backpacking Tour (5N/6D)' },
  'ladakh-high-passes': { source: 'IYC', sourcePackageName: 'Leh to Leh (7D/6N)' },
  'ladakh-bike-circuit': { source: 'IYC', sourcePackageName: 'Ladakh Bike Expedition (6N/7D)' },
  'spiti-circuit': { source: 'IYC', sourcePackageName: 'Spiti Valley Group Trip (7N/8D)' },
  'spiti-short-escape': { source: 'IYC', sourcePackageName: 'Spiti Valley 4D Quick Tour' },
  'meghalaya-cloud-trails': { source: 'IYC', sourcePackageName: 'Meghalaya Backpacking Tour (5N/6D)' },
  'meghalaya-delight': { source: 'IYC', sourcePackageName: 'Meghalaya Delight Tour (4N/5D)' },
  'tawang-monasteries': { source: 'IYC', sourcePackageName: 'Tawang Tour (7D / 6N)' },
  'tawang-short-escape': { source: 'IYC', sourcePackageName: '5 Days Tawang Tour' },
  'sikkim-darjeeling-classic': { source: 'IYC', sourcePackageName: 'Divine North East / Darjeeling Gangtok (5N/6D)' },
  'sikkim-gangtok-weekend': { source: 'IYC', sourcePackageName: 'Short Weekend in North East (Gangtok) 3N/4D' },
  'kerala-backwaters': { source: 'IYC', sourcePackageName: 'Kerala Holiday Packages (5N/6D)' },
  'kerala-short-weekend': { source: 'IYC', sourcePackageName: 'Kerala Weekend Tour (2N/3D)' },
  'andaman-island-escape': { source: 'IYC', sourcePackageName: 'Andaman Nicobar Tour Package (5N/6D)' },
  'himachal-manali-snow': { source: 'IYC', sourcePackageName: 'Manali Winter Snow Trek (4N/5D)' },
  'himachal-parvati-kheerganga': { source: 'IYC', sourcePackageName: 'Kheerganga & Kasol Tour Ex-Delhi (3N/4D)' },
  'uttarakhand-kedarnath-yatra': { source: 'IYC', sourcePackageName: 'Kedarnath Yatra (4N/5D)' },
  'uttarakhand-valley-of-flowers': { source: 'IYC', sourcePackageName: 'Valley of Flowers Trek (5N/6D)' },
  'himachal-jibhi-tirthan': { source: 'GHUMEGA', sourcePackageName: 'Tirthan River & Jibhi Pine Glades (4N/5D)' },
  'uttarakhand-rishikesh-chopta': { source: 'GHUMEGA', sourcePackageName: 'Chopta Tungnath & Rishikesh Ganga Trail (4N/5D)' },
  'rajasthan-heritage': { source: 'GHUMEGA', sourcePackageName: 'Royal Citadels & Desert Dunes (5N/6D)' },
  'rajasthan-udaipur-mountabu': { source: 'GHUMEGA', sourcePackageName: 'Udaipur Lake Palaces & Mount Abu Hills (4N/5D)' },
  'goa-slow-coastal': { source: 'GHUMEGA', sourcePackageName: 'South Goa Portuguese Quarters & Hidden Coves (4N/5D)' },
  'south-coorg-wayanad': { source: 'GHUMEGA', sourcePackageName: 'Coffee Plantations & Rainforest Streams (4N/5D)' },
  'south-ooty-kodaikanal': { source: 'GHUMEGA', sourcePackageName: 'Nilgiri Blue Hills & Misty Pine Lakes (5N/6D)' },
};

const updatedPackages = allPackages.map((pkg) => {
  if (existingSourceMapping[pkg.id]) {
    const meta = existingSourceMapping[pkg.id];
    return {
      ...pkg,
      sourceMetadata: {
        ...pkg.sourceMetadata,
        source: meta.source,
        sourcePackageName: meta.sourcePackageName,
        sourceUrl: pkg.sourceMetadata?.sourceUrl || '',
        sourceCheckedAt: pkg.sourceMetadata?.sourceCheckedAt || '2026-08-21',
      },
    };
  }
  return pkg;
});

const fileHeader = `import { TripPackage } from '@/types';\n\nexport const tripPackages: TripPackage[] = `;
const fileContent = `${fileHeader}${JSON.stringify(updatedPackages, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, '../src/data/trips.ts'), fileContent, 'utf-8');
console.log('Successfully enriched all 54 packages with complete sourceMetadata in src/data/trips.ts!');
