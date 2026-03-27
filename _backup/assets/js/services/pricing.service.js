/**
 * Pricing Service - Pure Logic.
 * Responsible for all price calculations based on business rules.
 */
import { CONFIG } from '../modules/config.js';

export class PricingService {
    /**
     * Calculates the estimated price based on distance and vehicle type.
     * Applies multipliers for vehicle type and weekend surcharges.
     *
     * @param {number} distanceInKm - Total round-trip distance in kilometers.
     * @param {string} vehicleType - Type of vehicle (e.g., 'moto', 'carro', 'suv', 'van').
     * @returns {number} - The calculated total price.
     */
    static calculate(distanceInKm, vehicleType) {
        let distance = Math.max(0, distanceInKm);

        // Get multiplier based on vehicle type, default to 1.0 if unknown
        const multiplier = CONFIG.PRICING.TIPO_VEICULO[vehicleType] || 1.0;

        // Base Formula: (Base Price * Vehicle Multiplier) + (Distance * Price Per Km)
        let total = (CONFIG.PRICING.PRECO_BASE * multiplier) + (distance * CONFIG.PRICING.PRECO_POR_KM);

        // Weekend Logic: Apply surcharge on Sundays
        const day = new Date().getDay();
        if (day === 0) { // 0 represents Sunday
            total *= CONFIG.PRICING.ADICIONAL_FDS;
        }

        return parseFloat(total.toFixed(2));
    }

    /**
     * Formats a number as a Brazilian currency string (BRL).
     *
     * @param {number} price - The price to format.
     * @returns {string} - Formatted string (e.g., "R$ 150,00")
     */
    static formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
}
