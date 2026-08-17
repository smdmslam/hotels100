const fs = require('fs');
const path = require('path');

const hotelNames = [
  "Hôtel de Paris Monte-Carlo",
  "Hôtel Hermitage Monte-Carlo",
  "Hôtel Métropole Monte-Carlo",
  "Monte-Carlo Bay Hotel & Resort",
  "Monte-Carlo Beach",
  "Grand-Hôtel du Cap-Ferrat, A Four Seasons Hotel",
  "The Maybourne Riviera",
  "Cap Estel",
  "Château de la Chèvre d’Or",
  "Château Eza",
  "La Réserve de Beaulieu",
  "Hôtel Royal-Riviera",
  "Hôtel Negresco",
  "Anantara Plaza Nice Hotel",
  "Hyatt Regency Nice Palais de la Méditerranée",
  "Boscolo Nice Hotel & Spa",
  "Hôtel La Pérouse Nice",
  "Le Méridien Nice",
  "Hôtel Amour Nice",
  "Hotel Le Saint-Paul, Nice",
  "Fairmont Monte Carlo",
  "Le Méridien Beach Plaza",
  "Columbus Hotel Monte-Carlo",
  "Port Palace Hotel",
  "Welcome Hotel, Villefranche-sur-Mer",
  "Villa Genesis, Menton",
  "Hôtel Napoleon, Menton",
  "Le Mas Candille, Mougins",
  "Moulin de Mougins",
  "Château de la Bégude"
];

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function parseCity(name) {
  if (name.includes('Nice')) return 'Nice';
  if (name.includes('Monte-Carlo')) return 'Monaco';
  if (name.includes('Menton')) return 'Menton';
  if (name.includes('Mougins')) return 'Mougins';
  if (name.includes('Villefranche')) return 'Villefranche-sur-Mer';
  if (name.includes('Eza') || name.includes('Èze') || name.includes('Chèvre')) return 'Èze';
  if (name.includes('Cap-Ferrat')) return 'Saint-Jean-Cap-Ferrat';
  if (name.includes('Beaulieu')) return 'Beaulieu-sur-Mer';
  return 'Monaco / Riviera'; // fallback
}

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const rawData = fs.readFileSync(HOTELS_FILE, 'utf8');
const data = JSON.parse(rawData);

let currentRank = 101;

const newHotels = hotelNames.map((name, index) => {
  const city = parseCity(name);
  const country = city === 'Monaco' ? 'Monaco' : 'France';
  
  return {
    id: `research-${100 + index + 1}`,
    slug: generateSlug(name),
    edition: 2026,
    rank: currentRank++,
    name: name,
    location: {
      city: city,
      country: country,
      region: 'Europe',
      displayLocation: `${city}, ${country}`
    },
    archetype: 'Resort', // Default placeholder
    publicationStatus: 'research-draft',
    featured: false,
    hasStrategicFeature: false,
    hasPricingAnalysis: false,
    essentialAmenities: [],
    distinctions: [],
    profileUrl: `/hotels/${generateSlug(name)}`
  };
});

data.hotels = data.hotels.concat(newHotels);

fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
console.log(`Added ${newHotels.length} hotels to hotels.json`);
