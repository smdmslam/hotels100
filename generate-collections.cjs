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

// 3. The London 50
const londonHotels = allHotels.filter(h => h.location.city === 'London');
const sortedLondon = londonHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const top50London = sortedLondon.slice(0, 50).map((h, index) => {
  return { ...h, rank: index + 1 };
});
const london50 = {
  slug: 'the-london-50',
  title: "The London 50",
  edition: "2024–2025",
  description: "The definitive ranking of London's most exceptional hospitality experiences, diving deep into the properties that define the city.",
  hotels: top50London
};

// 4. The New York 50
const nyHotels = allHotels.filter(h => h.location.city === 'New York');
const sortedNy = nyHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const top50Ny = sortedNy.slice(0, 50).map((h, index) => {
  return { ...h, rank: index + 1 };
});
const newYork50 = {
  slug: 'the-new-york-50',
  title: "The New York 50",
  edition: "2024–2025",
  description: "The definitive ranking of New York's most exceptional hospitality experiences, diving deep into the properties that define the city.",
  hotels: top50Ny
};

// 5. The Zurich 25
const zurichHotels = allHotels.filter(h => h.location.city === 'Zurich' || h.location.city === 'Andermatt');
const sortedZurich = zurichHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const top25Zurich = sortedZurich.slice(0, 25).map((h, index) => {
  return { ...h, rank: index + 1 };
});
const zurich25 = {
  slug: 'the-zurich-25',
  title: "The Zurich 25",
  edition: "2024–2025",
  description: "Zurich's luxury-hospitality market is not defined by spectacle. Its strongest hotels monetise discretion, institutional trust, lake and landscape access, and unusually demanding business-travel expectations.",
  hotels: top25Zurich
};

// 6. The London Accessible Edit
const londonAccessibleHotels = londonHotels.filter(h => h.indicativeRate && h.indicativeRate.amount <= 500);
const sortedLondonAccessible = londonAccessibleHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const topLondonAccessible = sortedLondonAccessible.map((h, index) => {
  return { ...h, rank: index + 1 };
});
const londonAccessible = {
  slug: 'the-london-accessible',
  title: "The London Accessible Edit",
  edition: "2024–2025",
  description: "The definitive ranking of London's most exceptional hospitality experiences available for under $500 per night. Curated for the frequent luxury business traveler.",
  hotels: topLondonAccessible
};

const collections = [global100, accessible50, london50, newYork50, zurich25, londonAccessible];

fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify({ collections }, null, 2));

console.log('Successfully generated collections.json with ' + collections.length + ' collections.');
