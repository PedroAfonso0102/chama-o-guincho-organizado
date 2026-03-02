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

        // Suporte legado
        const legados = { 'moto': 'motos', 'car': 'leves', 'suv': 'utilitario', 'van': 'vans' };
        const mappedType = legados[vehicleType] || vehicleType;

        const category = CONFIG.PRICING.TABELA_VEICULOS[mappedType];

        // Fail-safe
        if (!category) return 0;

        let total = category.saida;

        // Se a distância cobrir mais que o limite da Saída
        if (distance > CONFIG.PRICING.LIMITE_KM_BASE) {
            let quilometragemExcedente = distance - CONFIG.PRICING.LIMITE_KM_BASE;
            total += (quilometragemExcedente * category.km_adicional);
        }

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
