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

// Helper for making safe OpenRouter Perplexity queries
async function queryPerplexityAPI(systemPrompt, userPrompt) {
  if (!OPENROUTER_API_KEY) return null;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "perplexity/sonar",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`API returned status ${response.status}: ${response.statusText}`);
  }

  const responseData = await response.json();
  let content = responseData.choices[0].message.content;
  content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  content = content.replace(/:\s*not available/gi, ': null');
  content = content.replace(/:\s*N\/A/gi, ': null');
  content = content.replace(/:\s*unknown/gi, ': null');
  content = content.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(content);
}

// Lane 1: Property Facts, Amenities & 10 DMW Dimension Scorecards
async function fetchLane1FactsAndScores(hotelName, location) {
  const prompt = `Conduct deep research on property: ${hotelName} in ${location}.
Return a single JSON object with links, identity, propertyFacts, amenities, and scores.

JSON Schema:
{
  "links": { "officialWebsite": "https://...", "bookingUrl": "https://..." },
  "identity": { "brand": "...", "operator": "...", "owner": "...", "architect": "...", "designer": "..." },
  "propertyFacts": { "openingYear": 1897, "lastMajorRenovationYear": 2022, "roomCount": 120, "suiteCount": 35, "checkInTime": "15:00", "checkOutTime": "12:00", "propertyType": "Urban Grand Hotel" },
  "amenities": [
    { "id": "spa", "label": "Subterranean Spa & Hydrotherapy Sanctuary", "category": "Wellness", "available": true, "detail": "..." },
    { "id": "gym", "label": "24-Hour Fitness Studio", "category": "Wellness", "available": true, "detail": "..." },
    { "id": "michelin-dining", "label": "Michelin-Starred Dining", "category": "Food & Drink", "available": true },
    { "id": "bar", "label": "Destination Lounge", "category": "Food & Drink", "available": true }
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
  }
}`;

  return queryPerplexityAPI("You are an expert luxury hotel data auditor. Output strict JSON.", prompt);
}

// Lane 2: Dedicated High-Asymmetry Insider Writer (The Main Event)
async function fetchLane2InsiderReport(hotelName, location) {
  const prompt = `You are the lead investigative luxury hotel researcher for DMW Finance Group — The World’s 100 Most Exceptional Hotels.
Conduct deep, high-asymmetry research on property: ${hotelName} in ${location}.

Your 100% focus is on generating rich, detailed, 120-250 word unhedged narrative paragraphs for the 5-part Insider Report, along with custom, property-specific editorial section titles (e.g. "From Coburg to Maybourne: 125 Years of Mayfair Power" instead of generic labels).

CRITICAL DIRECTIVES:
- DO NOT use generic disclaimers like "could not be verified", "not clearly public", or "N/A".
- State exact room numbers, floor tiers, facing aspects (e.g. "Book upper-floor Seine view suite stock; avoid 2nd floor street-facing rooms near main lobby").
- Describe specific unscripted service nuances (e.g. curbside name recognition, line staff authorized with free drink tokens, private butler routing).
- For each section, provide a property-specific custom headline title and rich text paragraph.

JSON Schema:
{
  "insiderReport": {
    "unGoogleableHistory": { "title": "Custom History Headline", "text": "Rich historical provenance..." },
    "operationalQuirks": { "title": "Custom Service Quirks Headline", "text": "Unscripted front-line staff service habits..." },
    "famousGuests": { "title": "Custom Clientele Headline", "text": "Notable past and contemporary guest lore..." },
    "theTrueBestRoom": { "title": "Custom Room Booking Headline", "text": "EXACT room numbers, floor tiers, or facing aspects to book vs avoid..." },
    "powerDynamics": { "title": "Custom Ownership Headline", "text": "Ownership structure, operator agreement terms, management dynamics..." }
  }
}`;

  return queryPerplexityAPI("You are an investigative luxury hospitality author. Output strict JSON with dynamic section titles and deep narrative paragraphs.", prompt);
}

// Multi-Lane Parallel Execution Engine (Max 2 Lanes to avoid rate caps)
async function fetchPerplexityData(hotelName, location) {
  try {
    const [lane1, lane2] = await Promise.all([
      fetchLane1FactsAndScores(hotelName, location).catch(e => { console.error(`  ⚠️ Lane 1 failed for ${hotelName}:`, e.message); return null; }),
      fetchLane2InsiderReport(hotelName, location).catch(e => { console.error(`  ⚠️ Lane 2 failed for ${hotelName}:`, e.message); return null; })
    ]);

    if (!lane1 && !lane2) return null;

    return {
      ...(lane1 || {}),
      insiderReport: lane2?.insiderReport || lane1?.insiderReport || null
    };
  } catch (err) {
    console.error(`Multi-lane research failed for ${hotelName}:`, err.message);
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

  console.log(`Starting 2-Lane Parallel Perplexity enrichment for ${targetHotels.length} target hotels...`);

  let updatedCount = 0;

  for (let i = 0; i < targetHotels.length; i++) {
    const hotel = targetHotels[i];
    console.log(`[${i + 1}/${targetHotels.length}] Running 2-Lane Parallel Research for ${hotel.name} (${hotel.location.displayLocation})...`);

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

      // Anti-hedging guardrail for Insider Report
      if (result.insiderReport) {
        const isHedged = (str) => typeof str === 'string' && (
          str.toLowerCase().includes('could not be verified') || 
          str.toLowerCase().includes('not clearly public') || 
          str.toLowerCase().includes('no specific data available')
        );

        if (!hotel.insiderReport) {
          hotel.insiderReport = result.insiderReport;
        } else {
          hotel.insiderReport = {
            unGoogleableHistory: isHedged(result.insiderReport.unGoogleableHistory) ? hotel.insiderReport.unGoogleableHistory : result.insiderReport.unGoogleableHistory,
            operationalQuirks: isHedged(result.insiderReport.operationalQuirks) ? hotel.insiderReport.operationalQuirks : result.insiderReport.operationalQuirks,
            famousGuests: isHedged(result.insiderReport.famousGuests) ? hotel.insiderReport.famousGuests : result.insiderReport.famousGuests,
            theTrueBestRoom: isHedged(result.insiderReport.theTrueBestRoom) ? hotel.insiderReport.theTrueBestRoom : result.insiderReport.theTrueBestRoom,
            powerDynamics: isHedged(result.insiderReport.powerDynamics) ? hotel.insiderReport.powerDynamics : result.insiderReport.powerDynamics,
          };
        }
      }

      updatedCount++;
      console.log(`  ✅ Successfully enriched ${hotel.name} via 2-Lane Execution`);
    } else {
      console.log(`  ⚠️ Skipped / No API response for ${hotel.name}`);
    }
  }

  fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
  console.log(`\nSuccessfully updated ${updatedCount} hotel records in ${HOTELS_FILE}`);
}

run();
