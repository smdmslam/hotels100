const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const COLLECTIONS_FILE = path.join(__dirname, '..', '07-content', 'collections.json');

// Read the master JSON
const jsonData = fs.readFileSync(HOTELS_FILE, 'utf-8');
const data = JSON.parse(jsonData);

const allHotels = data.hotels;

// Base lists
const publicHotels = allHotels.filter(h => h.publicationStatus !== 'research-draft');
const internalHotels = allHotels.filter(h => h.publicationStatus === 'research-draft');

// 1. The Global 100
// Take the top 100 hotels from the public list (already sorted by consensus)
const global100Hotels = publicHotels.slice(0, 100);

const global100 = {
  slug: 'the-global-100',
  title: "The World's 100 Most Exceptional Hotels",
  edition: "2026",
  description: "The 2026 ranking, assessed through hospitality strategy, amenities, pricing power, brand position and enduring asset value.",
  hotels: global100Hotels
};

// 2. The Accessible 50 (Under $500)
// Filter hotels under $500
const affordableHotels = publicHotels.filter(h => h.indicativeRate && h.indicativeRate.amount <= 500);

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
  edition: "2026",
  description: "The ultimate guide to the world's most exceptional hotels delivering unparalleled value. Every property on this list offers a starting rate under $500 per night.",
  hotels: top50Affordable
};

// 3. The London 50
const londonHotels = publicHotels.filter(h => h.location.city === 'London');
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
  edition: "2026",
  description: "The definitive ranking of London's most exceptional hospitality experiences, diving deep into the properties that define the city.",
  hotels: top50London
};

// 4. The New York 50
const nyHotels = publicHotels.filter(h => h.location.city === 'New York');
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
  edition: "2026",
  description: "The definitive ranking of New York's most exceptional hospitality experiences, diving deep into the properties that define the city.",
  hotels: top50Ny
};

// 5. The Zurich 25
const zurichHotels = publicHotels.filter(h => h.location.city === 'Zurich' || h.location.city === 'Andermatt');
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
  edition: "2026",
  description: "Zurich's luxury-hospitality market is not defined by spectacle. Its strongest hotels monetise discretion, institutional trust, lake and landscape access, and unusually demanding business-travel expectations.",
  hotels: top25Zurich
};

// 6. The London Accessible
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
  title: "The London Accessible",
  edition: "2026",
  description: "The definitive ranking of London's most exceptional hospitality experiences available for under $500 per night. Curated for the frequent luxury business traveler.",
  hotels: topLondonAccessible
};

// 7. The Paris 25
const parisHotels = publicHotels.filter(h => h.location.city === 'Paris');
const sortedParis = parisHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const top25Paris = sortedParis.slice(0, 25).map((h, index) => {
  return { ...h, rank: index + 1 };
});
const paris25 = {
  slug: 'the-paris-25',
  title: "The Paris 25",
  edition: "2026",
  description: "Paris is the global reference market for converting culture, architecture, fashion authority, and address scarcity into hotel pricing power. The question is not whether an asset is prestigious; it is whether its hotel operation turns prestige into a coherent and commercially durable guest proposition.",
  hotels: top25Paris
};

// 8. The Italian & Swiss Lakes 35
const lakeLocations = ['Lake Como', 'Lake Garda', 'Lake Maggiore', 'Lake Orta', 'Franciacorta', 'Ascona', 'Lugano'];
const lakesHotels = publicHotels.filter(h => lakeLocations.includes(h.location.city));
const sortedLakes = lakesHotels.sort((a, b) => {
  const scoreA = a.scores ? a.scores.totalScore : 0;
  const scoreB = b.scores ? b.scores.totalScore : 0;
  return scoreB - scoreA;
});
const top35Lakes = sortedLakes.slice(0, 35).map((h, index) => {
  return { ...h, rank: index + 1 };
});
const lakes35 = {
  slug: 'the-italian-and-swiss-lakes-35',
  title: "The Italian & Swiss Lakes 35",
  edition: "2026",
  description: "The ultimate edit of the heritage palaces, intimate villas, and contemporary wellness resorts defining the alpine lake rivieras of Italy and Switzerland.",
  hotels: top35Lakes
};

// 9. INTERNAL RESEARCH: Monaco & Eastern Riviera 30
const monacoHotels = internalHotels.filter(h => h.rank > 100 && h.rank <= 130);
const monaco30 = {
  slug: 'the-monaco-and-eastern-riviera-30',
  title: "INTERNAL RESEARCH: Monaco & Eastern Riviera 30",
  edition: "Research Draft",
  description: "Working list of 30 properties across Monaco, Nice, Èze, Menton, and the surrounding Eastern Riviera.",
  hotels: monacoHotels
};

const collections = [global100, accessible50, london50, newYork50, zurich25, londonAccessible, paris25, lakes35, monaco30];

fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify({ collections }, null, 2));

console.log('Successfully generated collections.json with ' + collections.length + ' collections.');
