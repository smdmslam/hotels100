const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '07-content', 'hotels.json');

// Read the JSON
const jsonData = fs.readFileSync(HOTELS_FILE, 'utf-8');
const data = JSON.parse(jsonData);

// Simple heuristic based on Archetype and Region
const generateRate = (hotel) => {
  let baseRate = 800; // default base

  // Region multipliers
  const regionMultipliers = {
    'Europe': 1.2,
    'Americas': 1.1,
    'Asia Pacific': 0.8,
    'Middle East & Africa': 1.0,
    'Global': 1.0
  };

  // Specific high-cost cities
  const ultraExpensiveCities = ['Paris', 'London', 'New York', 'Tokyo', 'Geneva', 'Courchevel', 'Amalfi Coast'];
  const valueCities = ['Bangkok', 'Bali', 'Cape Town', 'Mexico City', 'Marrakech'];

  // Archetype adjustments
  const archetypeBase = {
    'Urban Grand Hotel': 1000,
    'Urban Lifestyle Hotel': 450,
    'Urban Resort': 1200,
    'Resort': 1500,
    'Heritage Hotel': 900,
    'Boutique Hotel': 500,
    'Wellness Retreat': 1800,
    'Wilderness Lodge': 2500,
    'Private-Island Hotel': 3500,
    'Members-Club Hybrid': 600,
    'Branded Residence Ecosystem': 1400
  };

  baseRate = archetypeBase[hotel.archetype] || baseRate;
  let multiplier = regionMultipliers[hotel.location.region] || 1.0;

  if (ultraExpensiveCities.some(city => hotel.location.displayLocation.includes(city))) {
    multiplier *= 1.5;
  } else if (valueCities.some(city => hotel.location.displayLocation.includes(city))) {
    multiplier *= 0.6;
  }

  // Add some randomness so they aren't all exactly the same
  const randomFactor = 0.85 + (Math.random() * 0.3); // 0.85 to 1.15
  let finalRate = Math.round((baseRate * multiplier * randomFactor) / 10) * 10; // round to nearest 10

  // Ensure minimums
  if (finalRate < 250) finalRate = 250;

  return {
    currency: 'USD',
    amount: finalRate,
    label: 'Estimated Starting Rate',
    basis: 'per night'
  };
};

data.hotels = data.hotels.map(hotel => {
  hotel.indicativeRate = generateRate(hotel);
  return hotel;
});

fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));

console.log('Successfully injected indicative rates into hotels.json');
