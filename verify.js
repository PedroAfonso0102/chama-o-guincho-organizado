
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the local index.html file
    await page.goto('file:///app/index.html', { waitUntil: 'networkidle' });

    // Scroll to the bottom of the page to ensure all content is loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for any lazy-loaded content or animations
    await page.waitForTimeout(1000);

    // Take a screenshot of the full page
    await page.screenshot({ path: '/home/jules/verification/verification.png', fullPage: true });

    console.log('Screenshot taken successfully.');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
