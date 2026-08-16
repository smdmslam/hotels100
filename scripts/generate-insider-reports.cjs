require('dotenv').config();
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('Error: OPENROUTER_API_KEY is not set in .env');
  process.exit(1);
}

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

// Test on specific hotels
const TARGET_SLUGS = ['the-connaught-london', 'hotel-de-paris-monte-carlo', 'aman-new-york'];

async function fetchInsiderReport(hotelName, location) {
  const prompt = `You are a highly connected, investigative luxury hospitality journalist writing an "Insider Report" for the legendary hotel: ${hotelName} in ${location}.

Your goal is to provide information asymmetry. Do NOT write generic marketing fluff (e.g. "It features a spa and 100 rooms"). We want the secret lore, the quirks, the power dynamics, and the true insider knowledge.

Please research and provide your findings exactly as a JSON object matching this schema:
{
  "unGoogleableHistory": "string", // The secret history, scandals, or lore.
  "operationalQuirks": "string",   // Secret entrances, special services, oddities, or unique operations.
  "famousGuests": "string",        // Notable past/present clientele, specifically interesting or controversial ones.
  "theTrueBestRoom": "string",     // Which exact room number, tier, or wing to book and why. Be specific (e.g. 'Book the corner suites on the 4th floor for the larger terrace, avoid the new wing').
  "powerDynamics": "string"        // Who actually owns the asset vs who manages it? Any interesting investor/operator friction?
}

Ensure the response is valid JSON and contains only the JSON object. Do not include markdown formatting like \`\`\`json.`;

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
    
    // Clean up markdown if it sneaks in
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    const parsed = JSON.parse(content);
    return parsed;
  } catch (error) {
    console.error(`Failed to fetch report for ${hotelName}:`, error);
    return null;
  }
}

async function run() {
  let updated = false;

  for (let i = 0; i < data.hotels.length; i++) {
    const hotel = data.hotels[i];
    
    if (TARGET_SLUGS.includes(hotel.slug)) {
      console.log(`Generating Insider Report for ${hotel.name}...`);
      
      const report = await fetchInsiderReport(hotel.name, hotel.location.displayLocation);
      
      if (report) {
        hotel.insiderReport = report;
        updated = true;
        console.log(`✅ Successfully generated report for ${hotel.name}`);
      } else {
        console.log(`❌ Failed to generate report for ${hotel.name}`);
      }
      
      // Sleep slightly to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  if (updated) {
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
    console.log(`\nUpdated ${HOTELS_FILE} with new Insider Reports.`);
  }
}

run();
