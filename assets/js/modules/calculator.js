import { PricingService } from '../services/pricing.service.js';
import { GeoService } from '../services/geo.service.js';
import { UI } from './ui.js';

/**
 * Initializes the price calculator module.
 * Acts as a View Controller, delegating logic to Services.
 */
export function initPriceCalculator() {
    const estimator = document.getElementById('price-estimator-form');
    if (!estimator) return;

    const dom = {
        origin: document.getElementById('price-origin'),
        destination: document.getElementById('price-destination'),
        distance: document.getElementById('price-distance'),
        vehicle: document.getElementById('price-vehicle'),
        output: estimator.querySelector('.price-estimator__price')
    };

    // Auto-calculate on input
    [dom.distance, dom.vehicle].forEach(el => {
        if (el) el.addEventListener('input', () => updatePriceDisplay(dom));
    });

    // Distance calculation on blur
    [dom.origin, dom.destination].forEach(el => {
        if (el) el.addEventListener('blur', () => handleDistanceUpdate(dom));
    });
}

/**
 * Handles the async distance update process.
 * @param {object} dom - Reference to DOM elements.
 */
async function handleDistanceUpdate(dom) {
    const origin = dom.origin.value.trim();
    const destination = dom.destination.value.trim();

    if (origin.length < 3 || destination.length < 3) return;

    try {
        UI.setInputLoading(dom.distance, true);

        const result = await GeoService.getDistance(origin, destination);

        dom.distance.value = result.distanceInKm;
        dom.distance.dispatchEvent(new Event('input')); // Trigger price update

        console.log(`Calculated Distance: ${result.distanceInKm} km`);
        UI.showNotification(`Logística calculada: ${result.distanceInKm} km`, 'success');

    } catch (error) {
        console.warn('Distance calculation failed', error);
        UI.showNotification('Não conseguimos calcular a rota automaticamente. Por favor, insira a distância manualmente.', 'warning');
    } finally {
        UI.setInputLoading(dom.distance, false);
    }
}

/**
 * Updates the price display using the PricingService.
 * @param {object} dom - Reference to DOM elements.
 */
function updatePriceDisplay(dom) {
    const distance = parseInt(dom.distance.value, 10) || 0;
    const vehicleType = dom.vehicle.value;

    const price = PricingService.calculate(distance, vehicleType);

    if (dom.output) {
        dom.output.textContent = PricingService.formatPrice(price);
    }
}
