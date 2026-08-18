require('dotenv').config();
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');

if (!fs.existsSync(HOTELS_FILE)) {
  console.error(`Error: Cannot find ${HOTELS_FILE}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

// Parse command line arguments
const args = process.argv.slice(2);
let targetCity = null;
let targetSlug = null;
let limit = null;

args.forEach(arg => {
  if (arg.startsWith('--city=')) targetCity = arg.split('=')[1];
  if (arg.startsWith('--slug=')) targetSlug = arg.split('=')[1];
  if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1], 10);
});

async function fetchPerplexityData(hotelName, location) {
  const prompt = `You are a senior hospitality strategist and investigative luxury hotel researcher for DMW Finance Group — The World’s 100 Most Exceptional Hotels.

Conduct deep, high-asymmetry research on the property: ${hotelName} in ${location}.

We require four core categories of information:
1. OFFICIAL WEBSITE LINKS & IDENTITY: Official website URL, direct booking URL, brand, operator, owner, architect, and designer.
2. BOOKING-STYLE GRANULAR AMENITIES & PROPERTY FACTS: Comprehensive amenity breakdown across Wellness, Food & Drink, Connectivity, Access, Rooms, and Service.
3. DMW 10-DIMENSION METHODOLOGY EVALUATION: Analytical breakdown and score distribution across DMW's 10 strategic dimensions. For "Service and Operating Execution", look for concrete empirical evidence of, if any: (a) anticipatory service intuition (such as seamless curbside name recognition or preference memory persistence), (b) unscripted front-line staff empowerment (e.g., line staff authorized to execute immediate surprise & delight gestures without manager approval), and (c) high staff-to-key operational density. If no evidence exists of unscripted empowerment or anticipatory intuition, cap the score accordingly.
4. 5-PART INSIDER REPORT: Information-asymmetric lore, operational quirks, famous clientele, exact best room numbers to book, and ownership/operator power dynamics.

Output your research STRICTLY as a single valid JSON object adhering to the schema below. Use null for any numbers or missing fields (do NOT use words like 'not available' or 'N/A'). Do not wrap in markdown text explanations. Return ONLY raw JSON.

{
  "links": {
    "officialWebsite": "https://www.claridges.co.uk",
    "bookingUrl": "https://www.claridges.co.uk/rooms-suites/"
  },
  "identity": {
    "brand": "Maybourne Hotel Group",
    "operator": "Maybourne Hotel Group",
    "owner": "Constellation Hotels",
    "ownershipPubliclyConfirmed": true,
    "architect": "CW Stephens",
    "designer": "Thierry Despont / Bryan O'Sullivan"
  },
  "propertyFacts": {
    "openingYear": 1897,
    "lastMajorRenovationYear": 2022,
    "roomCount": 120,
    "suiteCount": 35,
    "checkInTime": "15:00",
    "checkOutTime": "12:00",
    "propertyType": "Urban Grand Hotel"
  },
  "amenities": [
    { "id": "spa", "label": "Subterranean Spa & Hydrotherapy Sanctuary", "category": "Wellness", "available": true, "detail": "Full hydrotherapy pool, steam room, and thermal suites." },
    { "id": "gym", "label": "24-Hour Fitness Studio", "category": "Wellness", "available": true, "detail": "Technogym Artis series, Peloton bikes, and private trainers." },
    { "id": "michelin-dining", "label": "Michelin-Starred Dining", "category": "Food & Drink", "available": true, "venueName": "Signature Restaurant" },
    { "id": "bar", "label": "Destination Cocktail Lounge", "category": "Food & Drink", "available": true, "venueName": "Main Bar" },
    { "id": "room-service", "label": "24-Hour In-Room Dining", "category": "Food & Drink", "available": true },
    { "id": "butler-service", "label": "24-Hour Private Butler Service", "category": "Service", "available": true },
    { "id": "concierge", "label": "Les Clefs d'Or Concierge Desk", "category": "Service", "available": true },
    { "id": "valet-parking", "label": "Valet Parking & Underground Garage", "category": "Transport", "available": true },
    { "id": "ev-charging", "label": "EV Charging Stations", "category": "Transport", "available": true },
    { "id": "executive-wifi", "label": "High-Speed Encrypted Wi-Fi", "category": "Business", "available": true },
    { "id": "meeting-rooms", "label": "Private Boardrooms & Executive Salon", "category": "Business", "available": true }
  ],
  "scores": {
    "totalScore": 92.4,
    "confidence": "DMW Researched",
    "dimensions": [
      { "label": "Proposition and Strategic Coherence", "score": 14.2, "maxScore": 15, "weight": 15 },
      { "label": "Service and Operating Execution", "score": 11.1, "maxScore": 12, "weight": 12 },
      { "label": "Distinctiveness and Emotional Resonance", "score": 11.5, "maxScore": 12, "weight": 12 },
      { "label": "Rooms and Spatial Logic", "score": 9.1, "maxScore": 10, "weight": 10 },
      { "label": "Asset Scarcity and Physical Context", "score": 9.6, "maxScore": 10, "weight": 10 },
      { "label": "Pricing Power and Revenue Strategy", "score": 9.4, "maxScore": 10, "weight": 10 },
      { "label": "Amenities and Hospitality Ecosystem", "score": 9.0, "maxScore": 10, "weight": 10 },
      { "label": "Brand and Clientele Coherence", "score": 7.5, "maxScore": 8, "weight": 8 },
      { "label": "Business-Travel Effectiveness", "score": 6.2, "maxScore": 7, "weight": 7 },
      { "label": "Long-Term Resilience", "score": 5.7, "maxScore": 6, "weight": 6 }
    ]
  },
  "analysis": {
    "hospitalityProposition": "High-level thesis on why this hotel exists and its core guest promise.",
    "atmosphere": "Tactile and sensory description of arrival experience, lighting, acoustic profile, and crowd.",
    "intendedClientele": "Primary guest personas (HNW leisure, sovereign wealth, C-suite executives, fashion leaders).",
    "designLogic": "Architectural and interior design strategy (materials, spatial flow, lighting).",
    "locationLogic": "Micro-location advantages and address scarcity.",
    "revenueStrategy": "How the asset monetises F&B, rooms, spa, and ancillary services.",
    "pricingPowerThesis": "Why the hotel can command premium ADRs relative to immediate competitors.",
    "competitiveMoat": "Structural advantages protecting market share (heritage, address, brand license).",
    "investorQuestion": "The central strategic question facing owners and asset managers."
  },
  "insiderReport": {
    "unGoogleableHistory": "Secret history, scandals, historic architectural lore, or unpublicised origins.",
    "operationalQuirks": "Secret entrances, discreet arrival protocols, luggage routing, or unique staff service habits.",
    "famousGuests": "Notable past/present clientele, royalty, heads of state, or cultural figures.",
    "theTrueBestRoom": "Specific room numbers, suite tiers, or floor wings to book (and which specific rooms to avoid).",
    "powerDynamics": "Ownership structure, operator agreement terms, asset ownership friction, or management dynamics."
  }
}`;

  if (!OPENROUTER_API_KEY) {
    console.log(`[DRY-RUN / MOCK MODE] Simulated Perplexity research for ${hotelName}`);
    return null;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "perplexity/sonar",
        messages: [
          { role: "system", content: "You are an expert luxury hotel researcher. You output raw, strict JSON objects." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    let content = responseData.choices[0].message.content;
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    // Robustly sanitize non-standard LLM JSON outputs
    content = content.replace(/:\s*not available/gi, ': null');
    content = content.replace(/:\s*N\/A/gi, ': null');
    content = content.replace(/:\s*unknown/gi, ': null');
    content = content.replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed Perplexity query for ${hotelName}:`, error.message);
    return null;
  }
}

async function run() {
  let targetHotels = data.hotels;

  if (targetSlug) {
    targetHotels = targetHotels.filter(h => h.slug === targetSlug);
  } else if (targetCity) {
    targetHotels = targetHotels.filter(h => h.location.city.toLowerCase() === targetCity.toLowerCase());
  }

  if (limit && limit > 0) {
    targetHotels = targetHotels.slice(0, limit);
  }

  console.log(`Starting Perplexity enrichment for ${targetHotels.length} target hotels...`);

  let updatedCount = 0;

  for (let i = 0; i < targetHotels.length; i++) {
    const hotel = targetHotels[i];
    console.log(`[${i + 1}/${targetHotels.length}] Querying Perplexity for ${hotel.name} (${hotel.location.displayLocation})...`);

    const result = await fetchPerplexityData(hotel.name, hotel.location.displayLocation);

    if (result) {
      if (result.links) hotel.links = result.links;
      if (result.identity) hotel.identity = { ...hotel.identity, ...result.identity };
      if (result.propertyFacts) hotel.propertyFacts = { ...hotel.propertyFacts, ...result.propertyFacts };
      if (result.amenities && Array.isArray(result.amenities)) {
        hotel.amenities = result.amenities;
        hotel.essentialAmenities = result.amenities;
      }
      if (result.scores) hotel.scores = result.scores;
      if (result.analysis) hotel.analysis = { ...hotel.analysis, ...result.analysis };
      if (result.insiderReport) hotel.insiderReport = result.insiderReport;

      updatedCount++;
      console.log(`  ✅ Successfully enriched ${hotel.name}`);
    } else {
      console.log(`  ⚠️ Skipped / No API response for ${hotel.name}`);
    }

    // Rate limiting pause
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  if (updatedCount > 0) {
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
    console.log(`\nSuccessfully updated ${updatedCount} hotel records in ${HOTELS_FILE}`);
  }
}

run();
