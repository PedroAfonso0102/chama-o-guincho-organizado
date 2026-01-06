/**
 * Map Module.
 * Handles the interactive coverage map by updating the Google Maps iframe.
 */

/**
 * Initializes the coverage map interaction.
 * Listens for clicks on city buttons and updates the map iframe source to focus on the selected city.
 */
export function initCoverageMap() {
    const cityButtonsContainer = document.querySelector('.coverage__cities');
    const mapFrame = document.getElementById('coverage-map');

    if (!cityButtonsContainer || !mapFrame) return;

    cityButtonsContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.btn');
        if (!button) return;

        const cityName = button.textContent.trim();
        if (cityName) {
            // Update iframe source with new search query
            mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(cityName)}&hl=pt&z=12&amp&output=embed`;
        }
    });
}
