/**
 * WhatsApp Service - Link Generation.
 * Handles the creation of direct links to WhatsApp with pre-filled messages.
 */
import { CONFIG } from '../modules/config.js';

export class WhatsAppService {
    /**
     * Generates a WhatsApp API URL with a formatted message.
     * The message is constructed using a title and a key-value data object.
     *
     * @param {string} title - The header title of the message (e.g., "ORÇAMENTO ONLINE").
     * @param {object} data - Key-value pairs of information to include in the message body.
     *                        Example: { "Origem": "Campinas", "Destino": "São Paulo" }
     * @returns {string} - The complete, encoded WhatsApp URL ready for redirection.
     */
    static generateUrl(title, data = {}) {
        let message = `*${title.toUpperCase()}*\n\n`;

        // Iterate over data fields and append non-empty values to the message
        Object.entries(data).forEach(([key, value]) => {
            if (value && String(value).trim()) {
                message += `*${key}:*\n${String(value).trim()}\n\n`;
            }
        });

        // Construct the final URL using the configured phone number
        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
}
