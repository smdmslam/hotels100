const fs = require('fs');
const path = require('path');

const hotelsFilePath = path.join(__dirname, '../07-content/hotels.json');
const rawData = fs.readFileSync(hotelsFilePath, 'utf8');
const data = JSON.parse(rawData);

const URBAN_AMENITIES = [
  { id: 'wifi', label: 'Free High-Speed Wi-Fi', category: 'Connectivity & Work', available: true },
  { id: 'workspace', label: 'Executive Workspace', category: 'Connectivity & Work', available: true },
  { id: 'spa', label: 'Luxury Spa & Wellness', category: 'Wellness', available: true },
  { id: 'gym', label: '24-Hour Fitness Center', category: 'Wellness', available: true },
  { id: 'pool', label: 'Indoor Swimming Pool', category: 'Wellness', available: true },
  { id: 'restaurant', label: 'Michelin / Fine Dining', category: 'Food & Drink', available: true },
  { id: 'bar', label: 'Cocktail Bar & Lounge', category: 'Food & Drink', available: true },
  { id: 'breakfast', label: 'Gourmet Breakfast', category: 'Food & Drink', available: true },
  { id: 'room-service', label: '24-Hour Room Service', category: 'Food & Drink', available: true },
  { id: 'parking', label: 'Valet Parking & Garage', category: 'Access & Transport', available: true },
  { id: 'ev-charging', label: 'EV Charging Stations', category: 'Access & Transport', available: true },
  { id: 'concierge', label: '24-Hour Concierge & Butler', category: 'Service', available: true },
  { id: 'pet-friendly', label: 'Pet Friendly Policies', category: 'Policies', available: true },
  { id: 'air-conditioning', label: 'Individual Climate Control AC', category: 'Rooms', available: true },
];

const RESORT_AMENITIES = [
  { id: 'wifi', label: 'Free High-Speed Wi-Fi', category: 'Connectivity & Work', available: true },
  { id: 'pool', label: 'Infinity Swimming Pool', category: 'Wellness', available: true },
  { id: 'spa', label: 'World-Class Spa & Sanctuary', category: 'Wellness', available: true },
  { id: 'gym', label: 'Fitness Center & Outdoor Gym', category: 'Wellness', available: true },
  { id: 'restaurant', label: 'Signature Oceanfront Dining', category: 'Food & Drink', available: true },
  { id: 'bar', label: 'Beach & Sunset Lounge', category: 'Food & Drink', available: true },
  { id: 'breakfast', label: 'Daily Gourmet Breakfast', category: 'Food & Drink', available: true },
  { id: 'room-service', label: '24-Hour In-Villa Dining', category: 'Food & Drink', available: true },
  { id: 'concierge', label: 'Private Butler & Concierge', category: 'Service', available: true },
  { id: 'parking', label: 'Valet Parking & Private Transfers', category: 'Access & Transport', available: true },
  { id: 'pet-friendly', label: 'Pet Friendly', category: 'Policies', available: true },
  { id: 'air-conditioning', label: 'Climate Control AC', category: 'Rooms', available: true },
];

let enrichedCount = 0;

data.hotels = data.hotels.map((hotel) => {
  const isResort = (hotel.archetype || '').toLowerCase().includes('resort') || 
                  (hotel.archetype || '').toLowerCase().includes('island') || 
                  (hotel.archetype || '').toLowerCase().includes('lodge');

  const amenitySet = isResort ? RESORT_AMENITIES : URBAN_AMENITIES;

  // Preserve any custom existing amenity IDs if present
  const existing = hotel.amenities || hotel.essentialAmenities || [];
  const existingMap = new Map(existing.map((item) => [item.id, item]));

  const merged = amenitySet.map((std) => {
    if (existingMap.has(std.id)) {
      return { ...std, ...existingMap.get(std.id) };
    }
    return std;
  });

  hotel.amenities = merged;
  hotel.essentialAmenities = merged;
  enrichedCount++;
  return hotel;
});

fs.writeFileSync(hotelsFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully enriched amenities for ${enrichedCount} hotels in ${hotelsFilePath}`);
