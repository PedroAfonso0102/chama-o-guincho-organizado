import '../css/input.css';
import { initNavigation, initScrollAnimation, Carousel, UI } from './modules/ui.js';
import { initForms } from './modules/forms.js';
import { initPriceCalculator } from './modules/calculator.js';
import { initCoverageMap } from './modules/map.js';
import { initModals } from './modules/modals.js';
import autoAnimate from '@formkit/auto-animate';

import { Layout } from './components/layout.js';
import { UI as Components } from './components/ui-components.js';

document.addEventListener('DOMContentLoaded', () => {
    // Determine active page
    const path = window.location.pathname;
    const activePage = path.includes('servicos') ? 'services' : 'home';

    // Init Core Structural Layout
    Layout.init({
        basePath: './',
        activePage: activePage
    });

    // Init Dynamic UI Components
    Components.init({
        basePath: './'
    });

    // Init Core UI Logic
    initNavigation();
    initScrollAnimation();

    // Init Logic Modules
    initForms();
    initPriceCalculator();
    initCoverageMap();
    initModals();

    // Init Carousel
    document.querySelectorAll('.slideshow').forEach(el => new Carousel(el));

    // Init Effects
    const faqContainer = document.querySelector('.faq__container');
    if (faqContainer) autoAnimate(faqContainer);

    const lists = document.querySelectorAll('.features__list, .services__grid');
    lists.forEach(list => autoAnimate(list));

    // Expose UI for debugging or inline scripts if strictly necessary
    window.UI = UI;
});
