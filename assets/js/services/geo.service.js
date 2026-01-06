/**
 * Geo Service - External Data Layer.
 * Handles interactions with external mapping and routing APIs (OSRM, OpenStreetMap).
 * Provides functionality for geocoding, reverse geocoding, and distance calculation.
 */
import { CONFIG } from '../modules/config.js';
import { fetchWithTimeout } from '../modules/utils.js';

export class GeoService {
    /**
     * Gets driving distance between two addresses using OSRM.
     * Calculates the total route: Base -> Origin -> Destination -> Base.
     * This logic accounts for the tow truck starting from the base and returning.
     *
     * @param {string} origin - The starting address (client location).
     * @param {string} destination - The destination address.
     * @returns {Promise<{distanceInKm: number, route: any}>} - Returns the distance in KM and the route object.
     * @throws {Error} - Throws error if route calculation fails or API is unreachable.
     */
    static async getDistance(origin, destination) {
        // Resolve coordinates for both addresses
        const [originCoords, destCoords] = await Promise.all([
            this.getCoordinates(origin),
            this.getCoordinates(destination)
        ]);

        const base = CONFIG.BASE_COORDS;

        // Route Construction: Base -> Origin -> Destination -> Base (Circular Logic)
        // This ensures the pricing covers the entire trip for the service provider.
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${base.lon},${base.lat};${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat};${base.lon},${base.lat}?overview=false&skip_waypoints=true`;

        const response = await fetchWithTimeout(osrmUrl);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            // Convert meters to kilometers and round
            const distanceInKm = Math.round(data.routes[0].distance / 1000);
            return {
                distanceInKm: distanceInKm > 0 ? distanceInKm : 1, // Minimum 1km
                route: data.routes[0]
            };
        }

        throw new Error('Unable to calculate route');
    }

    /**
     * Geocodes an address string to coordinates (Latitude/Longitude).
     * First checks a local cache (CONFIG.CITY_COORDS) for common cities to save API calls.
     * Fallbacks to Nominatim (OSM) API.
     *
     * @param {string} address - The address to geocode.
     * @returns {Promise<{lat: number, lon: number}>} - The coordinates object.
     * @throws {Error} - Throws error if address is not found.
     */
    static async getCoordinates(address) {
        const cleanAddr = address.toLowerCase().trim();

        // Optimization: Check local cache first for known cities
        for (const [city, coords] of Object.entries(CONFIG.CITY_COORDS)) {
            if (cleanAddr.includes(city)) return coords;
        }

        // External API Call
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=br`;
        const response = await fetchWithTimeout(nominatimUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }

        throw new Error(`Address not found: ${address}`);
    }

    /**
     * Reverse geocodes coordinates to a human-readable address string.
     * Uses Nominatim (OSM) API.
     *
     * @param {number} lat - Latitude.
     * @param {number} lon - Longitude.
     * @returns {Promise<string>} - The resolved address string.
     * @throws {Error} - Throws error if lookup fails.
     */
    static async getAddressFromCoords(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const res = await fetchWithTimeout(url);
        const data = await res.json();

        if (data && data.display_name) {
            return data.display_name;
        }
        throw new Error('Address lookup failed');
    }
}
