// Map logic (preserving iframe approach)
export function initCoverageMap() {
    const cityButtonsContainer = document.querySelector('.coverage__cities');
    const mapFrame = document.getElementById('coverage-map');

    if (!cityButtonsContainer || !mapFrame) return;

    cityButtonsContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.btn'); // assuming class update
        if (!button) return;

        const cityName = button.textContent.trim();
        if (cityName) {
            mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(cityName)}&hl=pt&z=12&amp&output=embed`;
        }
    });
}
