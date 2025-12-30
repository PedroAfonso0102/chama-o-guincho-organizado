import { CONFIG } from './config.js';
import { fetchWithTimeout } from './utils.js';
import { UI } from './ui.js';

export function initPriceCalculator() {
    const estimator = document.getElementById('price-estimator-form');
    if (!estimator) return;

    const originInput = document.getElementById('price-origin');
    const destinationInput = document.getElementById('price-destination');
    const distanceInput = document.getElementById('price-distance');
    const vehicleSelect = document.getElementById('price-vehicle');
    const priceOutput = estimator.querySelector('.price-estimator__price');

    // Auto-calculate on input
    const inputs = [distanceInput, vehicleSelect];
    inputs.forEach(el => {
        if (el) el.addEventListener('input', () => calculatePrice(distanceInput, vehicleSelect, priceOutput));
    });

    // Distance calculation on blur
    [originInput, destinationInput].forEach(el => {
        if (el) el.addEventListener('blur', () => updateDistance(originInput, destinationInput, distanceInput));
    });
}

async function updateDistance(originInput, destinationInput, distanceInput) {
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    if (origin.length < 3 || destination.length < 3) return;

    try {
        const [originCoords, destCoords] = await Promise.all([
            getCoordinates(origin),
            getCoordinates(destination)
        ]);

        const base = CONFIG.BASE_COORDS;

        // Multi-point route: Base -> Origin -> Destination -> Base
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${base.lon},${base.lat};${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat};${base.lon},${base.lat}?overview=false`;

        const response = await fetchWithTimeout(osrmUrl);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distanceInKm = Math.round(data.routes[0].distance / 1000);
            distanceInput.value = distanceInKm > 0 ? distanceInKm : 1;

            // Trigger calculation
            distanceInput.dispatchEvent(new Event('input'));

            // Detail the segments for transparency in log (optional but good for debugging)
            console.log(`Circular Distance: ${distanceInKm} km (Base -> ${origin} -> ${destination} -> Base)`);
            UI.showNotification(`Logística calculada: ${distanceInKm} km (trajeto circular)`, 'success');
        }
    } catch (error) {
        console.warn('Distance calculation failed', error);
        UI.showNotification('Não foi possível calcular a logística automaticamente.', 'warning');
    }
}

async function getCoordinates(address) {
    const cleanAddr = address.toLowerCase().trim();
    // Check cache
    for (const [city, coords] of Object.entries(CONFIG.CITY_COORDS)) {
        if (cleanAddr.includes(city)) return coords;
    }

    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=br`;
    const response = await fetchWithTimeout(nominatimUrl);
    const data = await response.json();
    if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    throw new Error('Address not found');
}

function calculatePrice(distanceInput, vehicleSelect, priceOutput) {
    let distance = parseInt(distanceInput.value, 10) || 0;
    if (distance < 0) distance = 0;

    const vehicleType = vehicleSelect.value;
    const vehicleMultiplier = CONFIG.PRICING.TIPO_VEICULO[vehicleType] || 1.0;

    let total = (CONFIG.PRICING.PRECO_BASE * vehicleMultiplier) + (distance * CONFIG.PRICING.PRECO_POR_KM);

    // Weekend logic
    const day = new Date().getDay();
    if (day === 0) total *= CONFIG.PRICING.ADICIONAL_FDS;

    if (priceOutput) {
        priceOutput.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}
