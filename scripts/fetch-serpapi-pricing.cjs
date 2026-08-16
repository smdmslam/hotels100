const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.SERPAPI_KEY;

if (!API_KEY) {
  console.error("ERROR: SERPAPI_KEY is not defined in .env");
  process.exit(1);
}

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const PRICING_FILE = path.join(__dirname, '..', '07-content', 'pricing-intelligence.json');

// We will fetch exactly 4 weeks out for a 1-night stay for all 100 hotels
const TEST_DATE = new Date();
TEST_DATE.setDate(TEST_DATE.getDate() + 28);
const checkIn = TEST_DATE.toISOString().split('T')[0];
const checkOut = new Date(TEST_DATE.setDate(TEST_DATE.getDate() + 1)).toISOString().split('T')[0];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function fetchHotelPrice(hotelName, city) {
  const query = `${hotelName} ${city}`;
  
  const params = new URLSearchParams({
    engine: 'google_hotels',
    q: query,
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: '2',
    currency: 'USD',
    gl: 'us',
    hl: 'en',
    api_key: API_KEY
  });

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    const data = await response.json();
    
    if (data.error) {
      console.error(`SerpApi Error for ${query}:`, data.error);
      return null;
    }

    let targetHotel = null;
    if (data.properties && data.properties.length > 0) {
      targetHotel = data.properties[0];
    } else if (data.name && (data.prices || data.rate_per_night)) {
      targetHotel = data;
    }

    if (!targetHotel) {
      return null;
    }

    let bestRate = null;
    let isOfficial = false;

    // Check for official direct rate first
    if (targetHotel.featured_prices && targetHotel.featured_prices.length > 0) {
       const official = targetHotel.featured_prices.find(p => p.official);
       if (official && official.rate_per_night && official.rate_per_night.extracted_lowest) {
           bestRate = official.rate_per_night.extracted_lowest;
           isOfficial = true;
       }
    }
    
    // Fallback to lowest overall
    if (!bestRate && targetHotel.rate_per_night && targetHotel.rate_per_night.extracted_lowest) {
       bestRate = targetHotel.rate_per_night.extracted_lowest;
    }

    return {
       rate: bestRate,
       source: isOfficial ? 'Official Site' : 'OTA / Market Lowest'
    };

  } catch (err) {
    console.error(`Failed to fetch for ${query}:`, err);
    return null;
  }
}

async function runBatch() {
  console.log(`Starting baseline pricing fetch for 100 hotels...`);
  console.log(`Stay Date: ${checkIn}`);
  
  const rawHotels = fs.readFileSync(HOTELS_FILE, 'utf8');
  const hotelsData = JSON.parse(rawHotels);
  
  let existingPricing = {};
  if (fs.existsSync(PRICING_FILE)) {
      existingPricing = JSON.parse(fs.readFileSync(PRICING_FILE, 'utf8'));
  }

  // We only run the top 100
  const top100 = hotelsData.hotels.slice(0, 100);
  let count = 0;

  for (const hotel of top100) {
      console.log(`Fetching [${count+1}/100]: ${hotel.name}`);
      const priceInfo = await fetchHotelPrice(hotel.name, hotel.location.city);
      
      if (priceInfo && priceInfo.rate) {
          console.log(` -> $${priceInfo.rate} (${priceInfo.source})`);
          existingPricing[hotel.id] = {
              status: "complete",
              currency: "USD",
              roomBasis: "Lowest standard room",
              occupancyBasis: "2 Adults",
              taxesIncluded: true,
              collectionDate: new Date().toISOString().split('T')[0],
              sourceMethod: `SerpApi Google Hotels (${priceInfo.source})`,
              lowestObservedRate: priceInfo.rate,
              medianObservedRate: priceInfo.rate,
              highestObservedRate: priceInfo.rate,
              dataPoints: [
                  {
                      date: checkIn,
                      rate: priceInfo.rate,
                      available: true,
                      roomCategory: "Standard",
                      rateType: priceInfo.source === 'Official Site' ? 'direct' : 'flexible'
                  }
              ],
              eventMarkers: [],
              limitations: "Single date snapshot."
          };
      } else {
          console.log(` -> No rate found.`);
      }
      
      count++;
      
      // Save progressively in case it crashes or hits rate limit
      fs.writeFileSync(PRICING_FILE, JSON.stringify(existingPricing, null, 2));
      
      // 1.5 second delay to avoid getting rate limited by SerpApi
      await delay(1500);
  }
  
  console.log('Finished fetching baseline pricing!');
}

runBatch();
