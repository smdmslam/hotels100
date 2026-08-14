const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '../07-content/hotels.json');
const PRICING_INTEL_FILE = path.join(__dirname, '../07-content/pricing-intelligence.json');

if (!fs.existsSync(PRICING_INTEL_FILE)) {
  console.log('No pricing intelligence data found, skipping merge.');
  process.exit(0);
}

const hotelsData = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf-8'));
const pricingIntel = JSON.parse(fs.readFileSync(PRICING_INTEL_FILE, 'utf-8'));

let mergedCount = 0;

hotelsData.hotels = hotelsData.hotels.map(hotel => {
  if (pricingIntel[hotel.id]) {
    hotel.pricingIntelligence = pricingIntel[hotel.id];
    // Override the generic indicative rate with the real median
    if (pricingIntel[hotel.id].medianObservedRate) {
      hotel.indicativeRate = {
        currency: pricingIntel[hotel.id].currency,
        amount: pricingIntel[hotel.id].medianObservedRate,
        label: 'Observed Typical Rate',
        basis: 'per night'
      };
    }
    mergedCount++;
  }
  return hotel;
});

fs.writeFileSync(HOTELS_FILE, JSON.stringify(hotelsData, null, 2));
console.log(`Successfully merged pricing intelligence for ${mergedCount} hotels.`);
