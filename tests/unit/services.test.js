// Unit tests for Services
// Run with: node tests/unit/services.test.js
import assert from 'node:assert';
import { test, describe } from 'node:test';
import { PricingService } from '../../assets/js/services/pricing.service.js';
import { WhatsAppService } from '../../assets/js/services/whatsapp.service.js';
import { CONFIG } from '../../assets/js/modules/config.js';

describe('PricingService', () => {
    test('should calculate base price correctly', () => {
        // Mock Sunday check by overwriting Date if needed,
        // but for now we assume non-Sunday or check logic dynamically.
        // Let's just calculate manual expectation.

        const isSunday = new Date().getDay() === 0;
        const base = 100.00;
        const perKm = 4.50;
        const distance = 10;
        const multiplier = 1.0; // moto

        let expected = (base * multiplier) + (distance * perKm);
        if (isSunday) expected *= 1.20;

        const result = PricingService.calculate(10, 'moto');
        assert.strictEqual(result, parseFloat(expected.toFixed(2)));
    });

    test('should apply vehicle multiplier', () => {
        const isSunday = new Date().getDay() === 0;
        const result = PricingService.calculate(10, 'van'); // Multiplier 2.0

        let expected = (100.00 * 2.0) + (10 * 4.50); // 200 + 45 = 245
        if (isSunday) expected *= 1.20;

        assert.strictEqual(result, parseFloat(expected.toFixed(2)));
    });

    test('should return 0 or base for negative distance', () => {
         const result = PricingService.calculate(-5, 'moto');
         // Should treat as 0 distance
         const isSunday = new Date().getDay() === 0;
         let expected = 100.00;
         if (isSunday) expected *= 1.20;

         assert.strictEqual(result, parseFloat(expected.toFixed(2)));
    });
});

describe('WhatsAppService', () => {
    test('should generate correct URL', () => {
        const url = WhatsAppService.generateUrl('Teste', { 'Nome': 'Jules', 'Preço': 'R$ 50' });
        assert.ok(url.includes('wa.me'));
        assert.ok(url.includes('TESTE'));
        assert.ok(url.includes('Nome'));
        assert.ok(url.includes('Jules'));
    });
});
