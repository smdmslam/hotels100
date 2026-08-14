const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '07-content', 'hotels.json');
const COLLECTIONS_FILE = path.join(__dirname, '07-content', 'collections.json');

// Read the master JSON
const jsonData = fs.readFileSync(HOTELS_FILE, 'utf-8');
const data = JSON.parse(jsonData);

const allHotels = data.hotels;

// 1. The Global 100
// Take the top 100 hotels from the master list (already sorted by consensus)
const global100Hotels = allHotels.slice(0, 100);

const global100 = {
  slug: 'the-global-100',
  title: "The World's 100 Most Exceptional Hotels",
  edition: "2024–2025",
  description: "The provisional 2024-2025 ranking, assessed through hospitality strategy, amenities, pricing power, brand position and enduring asset value.",
  hotels: global100Hotels
};

// 2. The Accessible 50 (Under $500)
// Filter hotels under $500
const affordableHotels = allHotels.filter(h => h.indicativeRate && h.indicativeRate.amount <= 500);

// Sort them by their original totalScore to find the best ones
const sortedAffordable = affordableHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});

// Take top 50, re-rank them 1 to 50
const top50Affordable = sortedAffordable.slice(0, 50).map((h, index) => {
  return {
    ...h,
    rank: index + 1 // Re-rank for this specific list
  };
});

const accessible50 = {
  slug: 'the-accessible-50',
  title: "The Accessible 50: Best Under $500",
  edition: "2024–2025",
  description: "The ultimate guide to the world's most exceptional hotels delivering unparalleled value. Every property on this list offers a starting rate under $500 per night.",
  hotels: top50Affordable
};

// 3. The Europe 50
// Filter hotels strictly in Europe
const europeHotels = allHotels.filter(h => h.location.region === 'Europe');

// Sort them by their original totalScore to find the best ones
const sortedEurope = europeHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});

// Take top 50, re-rank them 1 to 50
const top50Europe = sortedEurope.slice(0, 50).map((h, index) => {
  return {
    ...h,
    rank: index + 1 // Re-rank for this specific list
  };
});

const europe50 = {
  slug: 'the-europe-50',
  title: "The Europe 50",
  edition: "2024–2025",
  description: "The definitive ranking of Europe's most exceptional hospitality experiences, from historic grand dames in Paris to secluded Mediterranean retreats.",
  hotels: top50Europe
};

const collections = [global100, accessible50, europe50];

fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify({ collections }, null, 2));

console.log('Successfully generated collections.json with ' + collections.length + ' collections.');
