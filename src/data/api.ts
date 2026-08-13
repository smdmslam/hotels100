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
 * Currently, only 'st-martins-lane-london' is fully mocked.
 */
export function getHotelProfile(slug: string): HotelProfile | null {
  if (slug === 'st-martins-lane-london') {
    return stMartinsLane;
  }
  
  // For other hotels, we don't have full profiles yet, but we shouldn't throw. 
  // Returning null allows the UI to handle the 'Not found' or 'Profile in preparation' state.
  return null;
}
