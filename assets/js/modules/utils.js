// Utility functions

/**
 * Fetches a resource with a specified timeout.
 * @param {RequestInfo} resource - The resource to fetch.
 * @param {RequestInit} [options={}] - Fetch options.
 * @param {number} [timeout=5000] - Timeout in milliseconds.
 * @returns {Promise<Response>} - The fetch response.
 */
export function fetchWithTimeout(resource, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = fetch(resource, {
        ...options,
        signal: controller.signal
    });
    response.finally(() => clearTimeout(id));
    return response;
}

/**
 * Debounces a function execution.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The wait time in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
