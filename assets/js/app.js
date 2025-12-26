import '../css/input.css';
import { initNavigation, initScrollAnimation, Carousel, UI } from './modules/ui.js';
import { initForms } from './modules/forms.js';
import { initPriceCalculator } from './modules/calculator.js';
import { initCoverageMap } from './modules/map.js';
import autoAnimate from '@formkit/auto-animate';

document.addEventListener('DOMContentLoaded', () => {
    // Init Core UI
    initNavigation();
    initScrollAnimation();

    // Init Components
    document.querySelectorAll('.slideshow').forEach(el => new Carousel(el));

    // Init Business Logic
    initForms();
    initPriceCalculator();
    initCoverageMap();

    // Init Effects
    const faqContainer = document.querySelector('.faq__container');
    if (faqContainer) autoAnimate(faqContainer);

    const lists = document.querySelectorAll('.features__list, .services__grid');
    lists.forEach(list => autoAnimate(list));

    // Expose UI for debugging or inline scripts if strictly necessary
    window.UI = UI;
});
