/**
 * Utility functions.
 * General purpose helpers used across the application.
 */

/**
 * Fetches a resource with a specified timeout.
 * Wraps the native fetch API with an AbortController.
 *
 * @param {RequestInfo} resource - The resource URL or object to fetch.
 * @param {RequestInit} [options={}] - Fetch configuration options.
 * @param {number} [timeout=5000] - Timeout duration in milliseconds.
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
 * Ensures the function is only called once after the specified wait time has elapsed since the last invocation.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function wrapper.
 */
export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
