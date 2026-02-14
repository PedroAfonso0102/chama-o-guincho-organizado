// WhatsApp Service - Link Generation
import { CONFIG } from '../modules/config.js';

export class WhatsAppService {
    /**
     * Generates a WhatsApp API URL.
     * @param {string} title - The message title.
     * @param {object} data - Key-value pairs to include in the message body.
     * @returns {string} - The complete URL.
     */
    static generateUrl(title, data = {}) {
        let message = `*${title.toUpperCase()}*\n\n`;

        Object.entries(data).forEach(([key, value]) => {
            if (value && String(value).trim()) {
                message += `*${key}:*\n${String(value).trim()}\n\n`;
            }
        });

        return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }
}
