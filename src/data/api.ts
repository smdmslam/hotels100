import type { IndexData, HotelProfile, HotelSummary, Collection } from './types';
import indexDataRaw from '../../07-content/hotels.json';
import collectionsDataRaw from '../../07-content/collections.json';

const indexData = indexDataRaw as unknown as IndexData;
const collectionsData = collectionsDataRaw as unknown as { collections: Collection[] };

/**
 * Returns the index data containing the ranking of 100 hotels (prototype).
 */
export function getIndexData(): Omit<IndexData, 'hotels'> {
  const { hotels: _hotels, ...meta } = indexData;
  return meta;
}

/**
 * Returns all hotels from the index.
 */
export function getAllHotels(): HotelSummary[] {
  return indexData.hotels;
}

/**
 * Returns a collection by its slug.
 */
export function getCollection(slug: string): Collection | undefined {
  return collectionsData.collections.find(c => c.slug === slug);
}

/**
 * Returns a specific hotel profile by its slug.
 */
export function getHotelProfile(slug: string): HotelProfile | undefined {
  // Try to find the hotel in the master index
  const hotel = indexData.hotels.find(h => h.slug === slug);
  
  if (hotel) {
    return hotel as unknown as HotelProfile;
  }
  return undefined;
}
