/**
 * Calculator Module.
 * Manages the interactive price estimation form.
 * Connects user inputs (Origin, Destination, Vehicle) with the GeoService and PricingService.
 */
import { PricingService } from '../services/pricing.service.js';
import { GeoService } from '../services/geo.service.js';
import { UI } from './ui.js';

/**
 * Initializes the price calculator module.
 * Binds event listeners to form inputs to enable real-time updates and distance calculation.
 */
export function initPriceCalculator() {
    const estimator = document.getElementById('price-estimator-form');
    if (!estimator) return;

    // DOM references for key inputs
    const dom = {
        origin: document.getElementById('price-origin'),
        destination: document.getElementById('price-destination'),
        distance: document.getElementById('price-distance'),
        vehicle: document.getElementById('price-vehicle'),
        output: estimator.querySelector('.price-estimator__price')
    };

    // Auto-calculate price when distance or vehicle type changes
    [dom.distance, dom.vehicle].forEach(el => {
        if (el) el.addEventListener('input', () => updatePriceDisplay(dom));
    });

    // Trigger automatic distance calculation when origin or destination loses focus
    [dom.origin, dom.destination].forEach(el => {
        if (el) el.addEventListener('blur', () => handleDistanceUpdate(dom));
    });
}

/**
 * Handles the asynchronous distance update process.
 * Calls GeoService to get the distance between origin and destination.
 * Updates the distance input and triggers a price recalculation.
 *
 * @param {object} dom - Object containing references to DOM elements.
 */
async function handleDistanceUpdate(dom) {
    const origin = dom.origin.value.trim();
    const destination = dom.destination.value.trim();

    // Only attempt calculation if both fields have sufficient content
    if (origin.length < 3 || destination.length < 3) return;

    try {
        UI.setInputLoading(dom.distance, true);

        // Fetch distance from external service
        const result = await GeoService.getDistance(origin, destination);

        // Update DOM
        dom.distance.value = result.distanceInKm;
        dom.distance.dispatchEvent(new Event('input')); // Trigger price update automatically

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
 * Updates the price display based on current form values.
 * Uses PricingService to perform the business logic calculation.
 *
 * @param {object} dom - Object containing references to DOM elements.
 */
function updatePriceDisplay(dom) {
    const distance = parseInt(dom.distance.value, 10) || 0;
    const vehicleType = dom.vehicle.value;

    const price = PricingService.calculate(distance, vehicleType);

    if (dom.output) {
        dom.output.textContent = PricingService.formatPrice(price);
    }
}
