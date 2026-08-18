const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

const RAW_UAE_LIST = [
  { rank: 1, name: "Burj Al Arab Jumeirah", city: "Dubai", neighbourhood: "Jumeirah", tier: "Ranked candidate" },
  { rank: 2, name: "Atlantis The Royal", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Ranked candidate" },
  { rank: 3, name: "Bulgari Resort Dubai", city: "Dubai", neighbourhood: "Jumeira Bay", tier: "Ranked candidate" },
  { rank: 4, name: "One&Only The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Ranked candidate" },
  { rank: 5, name: "Four Seasons Resort Dubai at Jumeirah Beach", city: "Dubai", neighbourhood: "Jumeirah", tier: "Ranked candidate" },
  { rank: 6, name: "Mandarin Oriental Jumeira, Dubai", city: "Dubai", neighbourhood: "Jumeirah", tier: "Ranked candidate" },
  { rank: 7, name: "Jumeirah Marsa Al Arab", city: "Dubai", neighbourhood: "Jumeirah", tier: "Ranked candidate" },
  { rank: 8, name: "The Lana, Dorchester Collection", city: "Dubai", neighbourhood: "Business Bay", tier: "Ranked candidate" },
  { rank: 9, name: "Armani Hotel Dubai", city: "Dubai", neighbourhood: "Burj Khalifa / Downtown", tier: "Ranked candidate" },
  { rank: 10, name: "Jumeirah Al Naseem", city: "Dubai", neighbourhood: "Madinat Jumeirah", tier: "Ranked candidate" },
  { rank: 11, name: "Jumeirah Dar Al Masyaf", city: "Dubai", neighbourhood: "Madinat Jumeirah", tier: "Ranked candidate" },
  { rank: 12, name: "Park Hyatt Dubai", city: "Dubai", neighbourhood: "Dubai Creek", tier: "Ranked candidate" },
  { rank: 13, name: "One&Only Royal Mirage", city: "Dubai", neighbourhood: "Jumeirah Beach", tier: "Ranked candidate" },
  { rank: 14, name: "Al Maha, a Luxury Collection Desert Resort & Spa", city: "Dubai", neighbourhood: "Dubai Desert Conservation Reserve", tier: "Ranked candidate" },
  { rank: 15, name: "Four Seasons Hotel Dubai International Financial Centre", city: "Dubai", neighbourhood: "DIFC", tier: "Ranked candidate" },
  { rank: 16, name: "Emirates Palace Mandarin Oriental", city: "Abu Dhabi", neighbourhood: "Corniche", tier: "Ranked candidate" },
  { rank: 17, name: "Qasr Al Sarab Desert Resort by Anantara", city: "Abu Dhabi", neighbourhood: "Al Dhafra / Liwa Desert", tier: "Ranked candidate" },
  { rank: 18, name: "Park Hyatt Abu Dhabi Hotel and Villas", city: "Abu Dhabi", neighbourhood: "Saadiyat Island", tier: "Ranked candidate" },
  { rank: 19, name: "The St. Regis Saadiyat Island Resort", city: "Abu Dhabi", neighbourhood: "Saadiyat Island", tier: "Ranked candidate" },
  { rank: 20, name: "Jumeirah at Saadiyat Island Resort", city: "Abu Dhabi", neighbourhood: "Saadiyat Island", tier: "Ranked candidate" },
  { rank: 21, name: "The Abu Dhabi EDITION", city: "Abu Dhabi", neighbourhood: "Al Bateen Marina", tier: "Ranked candidate" },
  { rank: 22, name: "The Ritz-Carlton Ras Al Khaimah, Al Wadi Desert", city: "Ras Al Khaimah", neighbourhood: "Al Wadi Desert", tier: "Ranked candidate" },
  { rank: 23, name: "Waldorf Astoria Ras Al Khaimah", city: "Ras Al Khaimah", neighbourhood: "Al Hamra", tier: "Ranked candidate" },
  { rank: 24, name: "Anantara Mina Al Arab Ras Al Khaimah Resort", city: "Ras Al Khaimah", neighbourhood: "Mina Al Arab", tier: "Ranked candidate" },
  { rank: 25, name: "The Oberoi Beach Resort, Al Zorah", city: "Ajman", neighbourhood: "Al Zorah", tier: "Ranked candidate" },
  { rank: 26, name: "Atlantis, The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 27, name: "Jumeirah Beach Hotel", city: "Dubai", neighbourhood: "Jumeirah", tier: "Serious contender" },
  { rank: 28, name: "Jumeirah Mina A'Salam", city: "Dubai", neighbourhood: "Madinat Jumeirah", tier: "Serious contender" },
  { rank: 29, name: "The St. Regis Dubai, The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 30, name: "Raffles The Palm Dubai", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 31, name: "The Ritz-Carlton, Dubai", city: "Dubai", neighbourhood: "JBR", tier: "Serious contender" },
  { rank: 32, name: "Address Beach Resort", city: "Dubai", neighbourhood: "JBR", tier: "Serious contender" },
  { rank: 33, name: "Address Downtown", city: "Dubai", neighbourhood: "Downtown Dubai", tier: "Serious contender" },
  { rank: 34, name: "Address Sky View", city: "Dubai", neighbourhood: "Downtown Dubai", tier: "Serious contender" },
  { rank: 35, name: "The Dubai EDITION", city: "Dubai", neighbourhood: "Downtown Dubai", tier: "Serious contender" },
  { rank: 36, name: "W Dubai – The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 37, name: "Raffles Dubai", city: "Dubai", neighbourhood: "Wafi", tier: "Serious contender" },
  { rank: 38, name: "Palazzo Versace Dubai", city: "Dubai", neighbourhood: "Culture Village", tier: "Serious contender" },
  { rank: 39, name: "Anantara The Palm Dubai Resort", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 40, name: "Fairmont The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 41, name: "Sofitel Dubai The Palm", city: "Dubai", neighbourhood: "Palm Jumeirah", tier: "Serious contender" },
  { rank: 42, name: "Nikki Beach Resort & Spa Dubai", city: "Dubai", neighbourhood: "Pearl Jumeira", tier: "Serious contender" },
  { rank: 43, name: "Banyan Tree Dubai", city: "Dubai", neighbourhood: "Bluewaters Island", tier: "Serious contender" },
  { rank: 44, name: "Bab Al Shams Desert Resort", city: "Dubai", neighbourhood: "Al Qudra Desert", tier: "Serious contender" },
  { rank: 45, name: "JA The Resort – Jebel Ali", city: "Dubai", neighbourhood: "Jebel Ali", tier: "Serious contender" },
  { rank: 46, name: "Rosewood Abu Dhabi", city: "Abu Dhabi", neighbourhood: "Al Maryah Island", tier: "Serious contender" },
  { rank: 47, name: "Four Seasons Hotel Abu Dhabi at Al Maryah Island", city: "Abu Dhabi", neighbourhood: "Al Maryah Island", tier: "Serious contender" },
  { rank: 48, name: "The St. Regis Abu Dhabi", city: "Abu Dhabi", neighbourhood: "Corniche", tier: "Serious contender" },
  { rank: 49, name: "Conrad Abu Dhabi Etihad Towers", city: "Abu Dhabi", neighbourhood: "Corniche", tier: "Serious contender" },
  { rank: 50, name: "The Ritz-Carlton Abu Dhabi, Grand Canal", city: "Abu Dhabi", neighbourhood: "Grand Canal", tier: "Serious contender" },
  { rank: 51, name: "W Abu Dhabi – Yas Island", city: "Abu Dhabi", neighbourhood: "Yas Island", tier: "Strategic comparable" },
  { rank: 52, name: "Saadiyat Rotana Resort & Villas", city: "Abu Dhabi", neighbourhood: "Saadiyat Island", tier: "Strategic comparable" },
  { rank: 53, name: "Rixos Premium Saadiyat Island", city: "Abu Dhabi", neighbourhood: "Saadiyat Island", tier: "Strategic comparable" },
  { rank: 54, name: "Al Wathba, a Luxury Collection Desert Resort & Spa", city: "Abu Dhabi", neighbourhood: "Al Wathba Desert", tier: "Strategic comparable" },
  { rank: 55, name: "Anantara Eastern Mangroves Abu Dhabi Hotel", city: "Abu Dhabi", neighbourhood: "Eastern Mangroves", tier: "Strategic comparable" },
  { rank: 56, name: "Anantara Sir Bani Yas Island Al Sahel Villa Resort", city: "Abu Dhabi", neighbourhood: "Sir Bani Yas Island", tier: "Strategic comparable" },
  { rank: 57, name: "Anantara Sir Bani Yas Island Al Yamm Villa Resort", city: "Abu Dhabi", neighbourhood: "Sir Bani Yas Island", tier: "Strategic comparable" },
  { rank: 58, name: "InterContinental Ras Al Khaimah Mina Al Arab Resort & Spa", city: "Ras Al Khaimah", neighbourhood: "Mina Al Arab", tier: "Strategic comparable" },
  { rank: 59, name: "The Ritz-Carlton Ras Al Khaimah, Al Hamra Beach", city: "Ras Al Khaimah", neighbourhood: "Al Hamra", tier: "Strategic comparable" },
  { rank: 60, name: "Sofitel Al Hamra Beach Resort", city: "Ras Al Khaimah", neighbourhood: "Al Hamra", tier: "Strategic comparable" },
  { rank: 61, name: "Mövenpick Resort Al Marjan Island", city: "Ras Al Khaimah", neighbourhood: "Al Marjan Island", tier: "Strategic comparable" },
  { rank: 62, name: "Rixos Bab Al Bahr", city: "Ras Al Khaimah", neighbourhood: "Al Marjan Island", tier: "Strategic comparable" },
  { rank: 63, name: "Address Beach Resort Fujairah", city: "Fujairah", neighbourhood: "Al Aqah", tier: "Strategic comparable" },
  { rank: 64, name: "Al Zorah Beach Resort", city: "Ajman", neighbourhood: "Al Zorah", tier: "Strategic comparable" },
  { rank: 65, name: "The Chedi Al Bait, Sharjah", city: "Sharjah", neighbourhood: "Heart of Sharjah", tier: "Strategic comparable" }
];

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

let addedCount = 0;

RAW_UAE_LIST.forEach(item => {
  const slug = generateSlug(item.name);
  
  // Check if hotel already exists
  const existing = data.hotels.find(h => h.slug === slug || h.name.toLowerCase() === item.name.toLowerCase());
  
  if (!existing) {
    const newHotel = {
      id: slug,
      slug: slug,
      edition: 2026,
      rank: item.rank,
      rankStatus: "final",
      name: item.name,
      location: {
        city: item.city,
        country: "United Arab Emirates",
        countryCode: "AE",
        region: "Middle East",
        neighbourhood: item.neighbourhood,
        displayLocation: `${item.neighbourhood ? item.neighbourhood + ', ' : ''}${item.city}, UAE`
      },
      archetype: item.name.includes("Desert") || item.name.includes("Resort") ? "Urban Resort" : "Urban Grand Hotel",
      publicationStatus: "published",
      featured: item.rank <= 5,
      strategicLens: `${item.tier} — UAE Hospitality`,
      dmwJudgement: `Assessed within the DMW UAE luxury hotel universe (${item.tier}).`,
      indicativeRate: {
        currency: "USD",
        amount: item.rank <= 10 ? 950 : item.rank <= 30 ? 650 : 450,
        label: "Starting Rate",
        basis: "per night"
      },
      scores: null,
      essentialAmenities: [],
      distinctions: item.rank <= 10 ? ["Pricing Power", "Independent Excellence"] : ["Best for Business Travel"],
      hasFieldReport: false,
      hasStrategicFeature: true,
      hasPricingAnalysis: false,
      primaryImage: {
        id: `img-${slug}`,
        url: "/assets/hero.png",
        alt: item.name
      },
      profileUrl: `/hotels/${slug}`
    };
    
    data.hotels.push(newHotel);
    addedCount++;
  }
});

fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
console.log(`✅ Successfully added ${addedCount} new UAE hotels into ${HOTELS_FILE}`);
console.log(`Total universe size is now: ${data.hotels.length} hotels`);
