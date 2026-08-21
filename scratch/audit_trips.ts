import { tripPackages } from '../src/data/trips';

console.log('Total trips:', tripPackages.length);

tripPackages.forEach((t, i) => {
  const itinCount = t.itinerary ? t.itinerary.length : 0;
  console.log(
    `${i + 1}. [${t.id}] "${t.title}" | ${t.destination} | ${t.durationNights}N/${t.durationDays}D | ₹${t.pricePerPerson} | isReq: ${t.isPriceOnRequest} | src: ${t.sourceMetadata?.source} | days: ${itinCount} | route: ${t.route}`
  );
});
