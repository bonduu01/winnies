const puppeteer = require('puppeteer');

const URL = 'http://localhost:8000';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  function record(name, passed, detail = '') {
    results.push({ name, passed, detail });
  }

  // 1. Page load
  try {
    const response = await page.goto(URL, { waitUntil: 'networkidle2' });
    record('Page loads with HTTP 200', response.status() === 200, `status: ${response.status()}`);
  } catch (e) {
    record('Page loads with HTTP 200', false, e.message);
  }

  // 2. Required sections
  const sectionIds = ['home', 'gallery', 'about', 'services', 'pricing', 'contact'];
  for (const id of sectionIds) {
    const el = await page.$(`#${id}`);
    record(`Section #${id} exists`, !!el);
  }

  // 3. Header is sticky/fixed
  const header = await page.$('header');
  if (header) {
    const position = await page.evaluate(el => getComputedStyle(el).position, header);
    record('Header is sticky/fixed', position === 'fixed' || position === 'sticky', `position: ${position}`);
  } else {
    record('Header is sticky/fixed', false, 'header not found');
  }

  // 4. Hero media (video or image fallback)
  const heroMedia = await page.$('.hero-video, .hero-image');
  if (heroMedia) {
    const src = await page.evaluate(el => el.getAttribute('src') || el.querySelector('source')?.getAttribute('src'), heroMedia);
    const poster = await page.evaluate(el => el.getAttribute('poster'), heroMedia);
    record('Hero media element exists', true, `src: ${src || 'none'}, poster: ${poster || 'none'}`);
  } else {
    record('Hero media element exists', false);
  }

  // 5. Gallery filter buttons show/hide images + aria-pressed sync
  const filterButtons = await page.$$('.filter-btn');
  if (filterButtons.length > 0) {
    // Click the first filter button
    await filterButtons[0].click();
    await sleep(300);
    const visibleImages = await page.$$eval('.gallery-card:not(.hidden) img', imgs => imgs.length);
    record('Gallery filter buttons toggle images', visibleImages > 0, `visible images after first filter: ${visibleImages}`);

    if (filterButtons.length > 1) {
      await filterButtons[1].click();
      await sleep(200);
      const pressed = await page.evaluate(el => el.getAttribute('aria-pressed'), filterButtons[1]);
      const firstPressed = await page.evaluate(el => el.getAttribute('aria-pressed'), filterButtons[0]);
      record(
        'Filter button aria-pressed syncs',
        pressed === 'true' && firstPressed === 'false',
        `clicked: ${pressed}, previous: ${firstPressed}`
      );
    }
  } else {
    record('Gallery filter buttons toggle images', false, 'no filter buttons found');
  }

  // 6. Mobile menu toggle (+ hidden attribute sync)
  await page.setViewport({ width: 375, height: 667 });
  await sleep(200);
  const menuToggle = await page.$('.menu-toggle');
  if (menuToggle) {
    const isVisible = await page.evaluate(el => getComputedStyle(el).display !== 'none', menuToggle);
    if (isVisible) {
      await menuToggle.click();
      await sleep(300);
      const nav = await page.$('.mobile-nav');
      const isOpen = nav
        ? await page.evaluate(
            el => el.classList.contains('open') && getComputedStyle(el).display !== 'none' && !el.hasAttribute('hidden'),
            nav
          )
        : false;
      record('Mobile menu toggles', isOpen);
      // Close it again so later tests start clean
      await menuToggle.click();
      await sleep(200);
    } else {
      record('Mobile menu toggles', false, 'menu toggle hidden at mobile viewport');
    }
  } else {
    record('Mobile menu toggles', false, 'no menu toggle found');
  }

  // 7. Pricing lightbox (open, zoom, close)
  await page.setViewport({ width: 1280, height: 800 });
  await sleep(200);
  const zoomTrigger = await page.$('.pricing-zoom-trigger');
  const lightbox = await page.$('#pricing-lightbox');
  if (zoomTrigger && lightbox) {
    await zoomTrigger.click();
    await sleep(300);
    const isOpen = await page.evaluate(el => el.open, lightbox);
    record('Pricing lightbox opens', isOpen);

    const lightboxImage = await page.$('#lightbox-image');
    if (lightboxImage && isOpen) {
      await lightboxImage.click();
      await sleep(200);
      const isZoomed = await page.evaluate(el => el.classList.contains('is-zoomed'), lightbox);
      record('Pricing lightbox zoom toggles', isZoomed);
    }

    const lightboxClose = await page.$('#lightbox-close');
    if (lightboxClose && isOpen) {
      await lightboxClose.click();
      await sleep(200);
      const stillOpen = await page.evaluate(el => el.open, lightbox);
      record('Pricing lightbox closes', !stillOpen);
    }
  } else {
    record('Pricing lightbox opens', false, 'trigger or dialog not found');
  }

  // 8. CTA links
  const ctaHrefs = await page.$$eval('a[href]', links => links.map(l => l.href));
  const hasWhatsApp = ctaHrefs.some(h => h.includes('wa.me'));
  const hasPhone = ctaHrefs.some(h => h.startsWith('tel:'));
  const hasEmail = ctaHrefs.some(h => h.startsWith('mailto:'));
  record('WhatsApp CTA present', hasWhatsApp);
  record('Phone CTA present', hasPhone);
  record('Email CTA present', hasEmail);

  // 9. Both addresses
  const pageText = await page.evaluate(() => document.body.innerText);
  record('NY address present', pageText.includes('NY') || pageText.includes('New York'));
  record('MN address present', pageText.includes('MN') || pageText.includes('Minnesota'));

  // 10. Responsive viewports
  const viewports = [320, 768, 1440];
  for (const width of viewports) {
    await page.setViewport({ width, height: 800 });
    await sleep(200);
    const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    record(`Viewport ${width}px has no horizontal overflow`, !hasHorizontalScroll);
  }

  await browser.close();

  // Print results
  let passed = 0;
  let failed = 0;
  for (const r of results) {
    if (r.passed) passed++; else failed++;
    const status = r.passed ? 'PASS' : 'FAIL';
    console.log(`[${status}] ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
  }
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
