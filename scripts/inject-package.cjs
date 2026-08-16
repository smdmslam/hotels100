const fs = require('fs');
const path = require('path');

const HOTELS_FILE = path.join(__dirname, '..', '07-content', 'hotels.json');
const data = JSON.parse(fs.readFileSync(HOTELS_FILE, 'utf8'));

const hotel = data.hotels.find(h => h.slug === 'the-connaught-london');
if (hotel) {
  hotel.specialPackages = [
    {
      id: 'pkg-1',
      title: "Valentine's Day Retreat",
      description: "Experience the ultimate romance in Mayfair. Your suite will be transformed with a path of velvet rose petals leading to the bedroom, where a chilled bottle of Laurent-Perrier Grand Siècle and bespoke chocolate truffles await. Includes breakfast in bed and a late 2 PM checkout.",
      price: 2450,
      currency: "GBP",
      validity: "Feb 10 - Feb 16",
      imageUrl: "https://images.unsplash.com/photo-1574621100236-d25b61edbebc?q=80&w=1200&auto=format&fit=crop",
      linkUrl: "https://www.the-connaught.co.uk/"
    }
  ];
  fs.writeFileSync(HOTELS_FILE, JSON.stringify(data, null, 2));
  console.log('Injected special package into The Connaught');
} else {
  console.error('Hotel not found');
}
