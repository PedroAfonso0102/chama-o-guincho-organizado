/**
 * Global configuration constants for the application.
 * Contains WhatsApp number, base address, pricing rules, and city coordinates.
 */
export const CONFIG = {
    WHATSAPP_NUMBER: '5519993502969',
    BASE_ADDRESS: 'Rua Coronel Job de Figueiredo, 847, Campinas, SP',
    BASE_COORDS: { lat: -22.956637, lon: -47.062085 },
    PRICING: {
        PRECO_BASE: 100.00,
        PRECO_POR_KM: 4.50,
        ADICIONAL_FDS: 1.20,     // +20%
        TIPO_VEICULO: {
            'moto': 1.0,
            'car': 1.6,
            'suv': 1.8,
            'van': 2.0,
        }
    },
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
