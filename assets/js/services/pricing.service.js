// Pricing Service - Pure Logic
import { CONFIG } from '../modules/config.js';

export class PricingService {
    /**
     * Calculates the estimated price based on distance and vehicle type.
     * @param {number} distanceInKm - Distance in kilometers.
     * @param {string} vehicleType - Type of vehicle (moto, car, suv, van).
     * @returns {number} - The calculated price.
     */
    static calculate(distanceInKm, vehicleType) {
        let distance = Math.max(0, distanceInKm);
        const multiplier = CONFIG.PRICING.TIPO_VEICULO[vehicleType] || 1.0;

        // Base Formula
        let total = (CONFIG.PRICING.PRECO_BASE * multiplier) + (distance * CONFIG.PRICING.PRECO_POR_KM);

        // Weekend logic
        const day = new Date().getDay();
        if (day === 0) { // Sunday
            total *= CONFIG.PRICING.ADICIONAL_FDS;
        }

        return parseFloat(total.toFixed(2));
    }

    static formatPrice(price) {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
}
