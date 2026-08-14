import type { IndexData, HotelProfile, HotelSummary } from './types';
import indexDataRaw from '../../07-content/hotels.json';
import stMartinsLaneRaw from './st-martins-lane.json';

const indexData = indexDataRaw as unknown as IndexData;
const stMartinsLane = stMartinsLaneRaw as unknown as HotelProfile;

/**
 * Returns the index data containing the ranking of 100 hotels (prototype).
 */
export function getIndexData(): IndexData {
  return indexData;
}

/**
 * Returns all hotels from the index.
 */
export function getAllHotels(): HotelSummary[] {
  return indexData.hotels;
}

/**
 * Returns a specific hotel profile by its slug.
 */
export function getHotelProfile(slug: string): HotelProfile | null {
  // Try to find the hotel in the master index
  const hotel = indexData.hotels.find(h => h.slug === slug);
  
  if (hotel) {
    return hotel as unknown as HotelProfile;
  }
  
  // Keep St Martins Lane as a hardcoded fallback if it's requested directly but missing
  if (slug === 'st-martins-lane-london') {
    return stMartinsLane;
  }
  
  return null;
}
