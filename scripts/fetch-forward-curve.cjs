require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.SERPAPI_KEY;

if (!API_KEY) {
  console.error("Missing SERPAPI_KEY in .env");
  process.exit(1);
}

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const PRICING_FILE = path.join(__dirname, '..', '07-content', 'pricing-intelligence.json');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const targetMonths = [
  { label: 'Jan', monthIndex: 0 },
  { label: 'Mar', monthIndex: 2 },
  { label: 'May', monthIndex: 4 },
  { label: 'Jul', monthIndex: 6 },
  { label: 'Sep', monthIndex: 8 },
  { label: 'Nov', monthIndex: 10 }
];

function getDatesForFixedMonth(monthIndex) {
  const d = new Date();
  let targetYear = d.getFullYear();
  
  // If the target month has already passed this year (buffer of 15 days), push to next year
  // Actually, just if current month is strictly greater, or same month but past the 10th
  if (d.getMonth() > monthIndex || (d.getMonth() === monthIndex && d.getDate() > 10)) {
    targetYear++;
  }
  
  // Force time to noon UTC to avoid timezone drift before iso string
  const checkInDate = new Date(Date.UTC(targetYear, monthIndex, 15, 12, 0, 0));
  const checkIn = checkInDate.toISOString().split('T')[0];
  
  const checkOutDate = new Date(Date.UTC(targetYear, monthIndex, 16, 12, 0, 0));
  const checkOut = checkOutDate.toISOString().split('T')[0];
  
  return { checkIn, checkOut };
}

async function fetchHotelPrice(hotelName, city, checkIn, checkOut) {
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

    if (targetHotel.featured_prices && targetHotel.featured_prices.length > 0) {
       const official = targetHotel.featured_prices.find(p => p.official);
       if (official && official.rate_per_night && official.rate_per_night.extracted_lowest) {
           bestRate = official.rate_per_night.extracted_lowest;
           isOfficial = true;
       }
    }
    
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

async function runForwardCurveBatch() {
  console.log(`Starting forward curve fetch for Top 5 hotels...`);
  
  const rawHotels = fs.readFileSync(HOTELS_FILE, 'utf8');
  const hotelsData = JSON.parse(rawHotels);
  
  let existingPricing = {};
  if (fs.existsSync(PRICING_FILE)) {
      existingPricing = JSON.parse(fs.readFileSync(PRICING_FILE, 'utf8'));
  }

  // Only run top 5 hotels
  const top5 = hotelsData.hotels.slice(0, 5);
  let count = 0;

  for (const hotel of top5) {
      console.log(`Fetching Forward Curve [${count+1}/5]: ${hotel.name}`);
      
      const dataPoints = [];
      let minRate = Infinity;
      let maxRate = -Infinity;
      
      for (const tm of targetMonths) {
          const { checkIn, checkOut } = getDatesForFixedMonth(tm.monthIndex);
          console.log(`  -> ${tm.label} (${checkIn})`);
          
          const priceInfo = await fetchHotelPrice(hotel.name, hotel.location.city, checkIn, checkOut);
          
          if (priceInfo && priceInfo.rate) {
              console.log(`     $${priceInfo.rate} (${priceInfo.source})`);
              dataPoints.push({
                  date: checkIn,
                  rate: priceInfo.rate,
                  available: true,
                  roomCategory: "Standard",
                  rateType: priceInfo.source === 'Official Site' ? 'direct' : 'flexible',
                  tenor: tm.label
              });
              
              if (priceInfo.rate < minRate) minRate = priceInfo.rate;
              if (priceInfo.rate > maxRate) maxRate = priceInfo.rate;
          } else {
              console.log(`     No rate found.`);
          }
          
          await delay(1500); // Wait between dates
      }
      
      if (dataPoints.length > 0) {
          // Sort dates just in case
          dataPoints.sort((a, b) => new Date(a.date) - new Date(b.date));
          
          // Calculate median
          const sortedRates = dataPoints.map(d => d.rate).sort((a, b) => a - b);
          const median = sortedRates[Math.floor(sortedRates.length / 2)];
          
          existingPricing[hotel.id] = {
              ...existingPricing[hotel.id],
              status: "complete",
              collectionDate: new Date().toISOString().split('T')[0],
              sourceMethod: "SerpApi Google Hotels",
              lowestObservedRate: minRate,
              medianObservedRate: median,
              highestObservedRate: maxRate,
              dataPoints: dataPoints,
              limitations: "5-point institutional forward curve."
          };
      }
      
      count++;
      fs.writeFileSync(PRICING_FILE, JSON.stringify(existingPricing, null, 2));
  }
  
  console.log('Finished fetching forward curves!');
}

runForwardCurveBatch();
