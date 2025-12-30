// Geo Service - External Data Layer
import { CONFIG } from '../modules/config.js';
import { fetchWithTimeout } from '../modules/utils.js';

export class GeoService {
    /**
     * Gets driving distance between two addresses using OSRM.
     * @param {string} origin
     * @param {string} destination
     * @returns {Promise<{distanceInKm: number, route: any}>}
     */
    static async getDistance(origin, destination) {
        // Resolve coordinates
        const [originCoords, destCoords] = await Promise.all([
            this.getCoordinates(origin),
            this.getCoordinates(destination)
        ]);

        const base = CONFIG.BASE_COORDS;

        // Route: Base -> Origin -> Destination -> Base (Circular Logic)
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${base.lon},${base.lat};${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat};${base.lon},${base.lat}?overview=false`;

        const response = await fetchWithTimeout(osrmUrl);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distanceInKm = Math.round(data.routes[0].distance / 1000);
            return {
                distanceInKm: distanceInKm > 0 ? distanceInKm : 1,
                route: data.routes[0]
            };
        }

        throw new Error('Unable to calculate route');
    }

    /**
     * Geocodes an address string to coordinates.
     * @param {string} address
     * @returns {Promise<{lat: number, lon: number}>}
     */
    static async getCoordinates(address) {
        const cleanAddr = address.toLowerCase().trim();

        // Check local cache first
        for (const [city, coords] of Object.entries(CONFIG.CITY_COORDS)) {
            if (cleanAddr.includes(city)) return coords;
        }

        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=br`;
        const response = await fetchWithTimeout(nominatimUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }

        throw new Error(`Address not found: ${address}`);
    }

    /**
     * Reverse geocodes coordinates to an address.
     * @param {number} lat
     * @param {number} lon
     * @returns {Promise<string>}
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
