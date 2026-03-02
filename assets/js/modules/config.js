/**
 * Global configuration constants for the application.
 * Acts as a centralized source of truth for business logic and external integrations.
 */
export const CONFIG = {
    // Contact Information
    WHATSAPP_NUMBER: '5519993502969',
    BASE_ADDRESS: 'Rua Coronel Job de Figueiredo, 847, Campinas, SP',

    // Base of Operations Coordinates (Used for return trip calculations)
    BASE_COORDS: { lat: -22.9261, lon: -47.0452 },

    // Pricing Business Rules
    PRICING: {
        LIMITE_KM_BASE: 40,      // O preço de saída cobre até 40km (ida e volta somadas)
        ADICIONAL_FDS: 1.20,     // Weekend surcharge (+20%)

        // Definindo a política oficial de Saída e Km Adicional por categoria
        TABELA_VEICULOS: {
            'leves': { saida: 160.00, km_adicional: 3.50 },
            'utilitario': { saida: 240.00, km_adicional: 4.00 },
            'motos': { saida: 160.00, km_adicional: 3.50 },
            'vans': { saida: 350.00, km_adicional: 4.00 }
        }
    },

    // Pre-defined City Coordinates (Cache for GeoService)
    // Helps avoid API calls for common service areas
    CITY_COORDS: {
        'campinas': { lat: -22.9099, lon: -47.0626 },
        'valinhos': { lat: -22.9697, lon: -46.9958 },
        'vinhedo': { lat: -23.0302, lon: -46.9736 },
        'sumaré': { lat: -22.8203, lon: -47.2666 },
        'hortolândia': { lat: -22.8612, lon: -47.2197 },
        'paulínia': { lat: -22.7635, lon: -47.1533 },
        'indaiatuba': { lat: -23.0903, lon: -47.2180 }
    }
};
