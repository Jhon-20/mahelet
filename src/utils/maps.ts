import type { EventLocation } from '../types/invitation';

/**
 * Normalizes location URL or generates a standard Google Maps query
 */
export function getDirectionsUrl(location: EventLocation): string {
  if (location.googleMapsUrl && location.googleMapsUrl.startsWith('http')) {
    return location.googleMapsUrl;
  }
  const query = encodeURIComponent(`${location.venueName}, ${location.address}, ${location.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
