require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');

if (!fs.existsSync(HOTELS_FILE)) {
  console.error(`Error: Cannot find ${HOTELS_FILE}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

// Command line options: --city=London --limit=10 --overwrite
const args = process.argv.slice(2);
let targetCity = null;
let targetSlug = null;
let limit = null;
let overwrite = false;

args.forEach(arg => {
  if (arg.startsWith('--city=')) targetCity = arg.split('=')[1];
  if (arg.startsWith('--slug=')) targetSlug = arg.split('=')[1];
  if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1], 10);
  if (arg === '--overwrite') overwrite = true;
});

async function fetchOfficialUrl(hotelName, location) {
  const prompt = `Find the official website URL and official direct booking URL for the luxury hotel: "${hotelName}" in ${location}.

Output STRICTLY a single raw JSON object with this exact format:
{
  "officialWebsite": "https://www.example.com",
  "bookingUrl": "https://www.example.com/rooms"
}

Rules:
1. Provide the REAL, accurate official domain of the hotel (e.g. for Claridge's in London, use "https://www.claridges.co.uk").
2. Do NOT use OTA links (Booking.com, Expedia, Tripadvisor). Only use official brand/hotel website URLs.
3. Return ONLY raw valid JSON. No markdown backticks or explanations.`;

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
          { role: "system", content: "You are a precise luxury hotel data assistant. You output raw valid JSON." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }

    const responseData = await response.json();
    let content = responseData.choices[0].message.content;
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(content);

    if (parsed.officialWebsite && typeof parsed.officialWebsite === 'string' && parsed.officialWebsite.startsWith('http')) {
      return {
        officialWebsite: parsed.officialWebsite.trim(),
        bookingUrl: (parsed.bookingUrl && parsed.bookingUrl.startsWith('http')) ? parsed.bookingUrl.trim() : parsed.officialWebsite.trim()
      };
    }
    return null;
  } catch (error) {
    console.error(`  ⚠️ Failed to fetch URL for ${hotelName}: ${error.message}`);
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

  if (!overwrite) {
    targetHotels = targetHotels.filter(h => !h.links || !h.links.officialWebsite);
  }

  if (limit && limit > 0) {
    targetHotels = targetHotels.slice(0, limit);
  }

  console.log(`🚀 Starting Official Website URL Fetcher for ${targetHotels.length} target hotels...`);

  let updatedCount = 0;
  const BATCH_SIZE = 5;

  for (let i = 0; i < targetHotels.length; i += BATCH_SIZE) {
    const batch = targetHotels.slice(i, i + BATCH_SIZE);
    
    await Promise.all(batch.map(async (hotel) => {
      const idx = data.hotels.findIndex(h => h.id === hotel.id);
      console.log(`[${idx + 1}/${data.hotels.length}] Searching URL for ${hotel.name} (${hotel.location.displayLocation})...`);
      
      const result = await fetchOfficialUrl(hotel.name, hotel.location.displayLocation);

      if (result) {
        data.hotels[idx].links = {
          ...data.hotels[idx].links,
          officialWebsite: result.officialWebsite,
          bookingUrl: result.bookingUrl
        };
        updatedCount++;
        console.log(`  ✅ Found URL for ${hotel.name}: ${result.officialWebsite}`);
      }
    }));

    // Save progress after each batch
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));

    // Rate limiting delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (updatedCount > 0) {
    console.log(`\n🎉 Successfully updated ${updatedCount} hotel URLs in ${HOTELS_FILE}`);
    console.log('🔄 Regenerating collections.json...');
    execSync('node scripts/generate-collections.cjs', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    console.log('✨ All collections updated with live hotel website links!');
  } else {
    console.log('\nNo new hotel URLs were updated.');
  }
}

run();
