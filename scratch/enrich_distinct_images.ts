import fs from 'fs';
import path from 'path';
import { tripPackages } from '../src/data/trips';
import { TripPackage } from '../src/types';

const destinationImageMap: Record<string, { src: string; alt: string }> = {
  // Andaman
  'andaman-exotic-beach-scuba-6d': {
    src: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=85&w=1600&auto=format&fit=crop',
    alt: 'Turquoise ocean waters and tropical sandy shores of Havelock Island in Andaman'
  },
  // Jim Corbett
  'uttarakhand-nainital-mussoorie-corbett-6d': {
    src: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=85&w=1600&auto=format&fit=crop',
    alt: 'Dense sal forest and wildlife landscape in Jim Corbett National Park'
  },
  // Sundarbans
  'bengal-sundarbans-mangrove-safari-3d': {
    src: 'https://images.unsplash.com/photo-1618245318763-a1517938b2ca?q=85&w=1600&auto=format&fit=crop',
    alt: 'Tidal mangrove creeks and boat safari channels in the Sundarbans Delta'
  },
  // Golden Triangle
  'rajasthan-golden-triangle-classic': {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=85&w=1600&auto=format&fit=crop',
    alt: 'The iconic marble dome of the Taj Mahal in Agra during golden hour'
  },
  'rajasthan-golden-triangle-ranthambore-6d': {
    src: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=85&w=1600&auto=format&fit=crop',
    alt: 'Bengal tiger walking through the dry deciduous forest of Ranthambore National Park'
  },
  // South India
  'south-india-delights-10d': {
    src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=1600&auto=format&fit=crop',
    alt: 'Grand Dravidian temple gopuram towers of Meenakshi Amman in Madurai'
  },
  'south-culture-cum-beach-7d': {
    src: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=85&w=1600&auto=format&fit=crop',
    alt: 'Sunset over the rocky ocean coastline of Kanyakumari where three seas meet'
  },
  // Northeast Kaziranga & Majuli
  'northeast-kaziranga-majuli-5d': {
    src: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=85&w=1600&auto=format&fit=crop',
    alt: 'Great Indian One-Horned Rhinoceros grazing in Kaziranga National Park grasslands'
  },
  // Kumaon Hills
  'uttarakhand-kumaon-hills-kausani-6d': {
    src: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=85&w=1600&auto=format&fit=crop',
    alt: 'Terraced pine ridges and panoramic Himalayan peaks from Kausani in Kumaon'
  }
};

let modifiedCount = 0;

const updated = tripPackages.map((trip) => {
  const customImg = destinationImageMap[trip.id];
  if (customImg) {
    modifiedCount++;
    return {
      ...trip,
      coverImage: {
        src: customImg.src,
        alt: customImg.alt
      }
    };
  }
  return trip;
});

console.log(`Updated ${modifiedCount} packages with distinct destination imagery.`);

const fileHeader = `import { TripPackage } from '@/types';\n\nexport const tripPackages: TripPackage[] = `;
const jsonString = JSON.stringify(updated, null, 2);
const fullContent = fileHeader + jsonString + ';\n';

fs.writeFileSync(path.join(__dirname, '../src/data/trips.ts'), fullContent, 'utf-8');
console.log('Successfully written to src/data/trips.ts');
