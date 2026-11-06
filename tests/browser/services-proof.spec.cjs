const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const sharp = require('sharp');

const evidence = 'context/qa/services-proof';
const destinations = ['water-damage-restoration', 'mold-remediation', 'fire-and-smoke-restoration', 'cleaning-and-sanitization', 'emergency-services', 'air-duct-cleaning'].map(slug => '/services/' + slug);

function luminance(rgb) {
  const linear = rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

// Sample the rendered photograph/overlay with only foreground text hidden.
async function renderedContrast(page, section) {
  const boxes = await section.locator('h2,h3,p,span').evaluateAll(nodes => nodes.map(node => {
    const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
    return { tag: node.tagName, text: node.textContent.trim(), color: style.color.match(/[\d.]+/g).slice(0, 3).map(Number), large: parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700), left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
  }));
  // The persistent mobile call chip occludes some text while scrolling. Its
  // white letters are foreground UI, not the service card's background.
  const occlusions = await page.locator('body *').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).position === 'fixed').map(node => {
    const rect = node.getBoundingClientRect();
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
  }));
  const hidden = await page.addStyleTag({ content: '[data-services-overview] :is(h2,h3,p,span) { transition:none !important; color:transparent !important; }' });
  const sample = await page.screenshot();
  const { data, info } = await sharp(sample).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  await hidden.evaluate(node => node.remove());
  const results = [];
  for (const box of boxes) {
    const left = Math.max(0, Math.ceil(box.left)), right = Math.min(info.width, Math.floor(box.right));
    const top = Math.max(84, Math.ceil(box.top)), bottom = Math.min(info.height, Math.floor(box.bottom));
    if (right <= left || bottom <= top) continue;
    let brightest = 0, samples = 0;
    for (let y = top; y < bottom; y += 2) for (let x = left; x < right; x += 2) {
      if (occlusions.some(rect => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)) continue;
      const offset = (y * info.width + x) * info.channels;
      brightest = Math.max(brightest, luminance([...data.subarray(offset, offset + 3)]));
      samples++;
    }
    if (!samples) continue;
    const ratio = (luminance(box.color) + .05) / (brightest + .05);
    expect(ratio, `${box.tag}: ${box.text}`).toBeGreaterThanOrEqual(box.large ? 3 : 4.5);
    results.push({ tag: box.tag, text: box.text, ratio: Number(ratio.toFixed(2)), required: box.large ? 3 : 4.5 });
  }
  return results;
}

for (const width of [375, 430, 768, 1440]) test(`restoration photo composition and coverage at ${width}`, async ({ page }) => {
  const viewportHeight = width < 500 ? 900 : 1000;
  await page.setViewportSize({ width, height: viewportHeight });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator('[data-services-overview]'), image = section.locator('img');
  const heightBeforeImage = await section.evaluate(node => node.offsetHeight);
  await section.scrollIntoViewIfNeeded();
  await image.evaluate(image => image.decode());
  expect(await section.evaluate(node => node.offsetHeight)).toBe(heightBeforeImage);
  await expect(section.locator('h2')).toHaveText('Full-Service Emergency Restoration');
  expect(await section.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(destinations);
  await expect(section.locator('a')).toHaveCount(6);
  await expect(image).toHaveAttribute('loading', 'lazy');
  await expect(image).toHaveAttribute('alt', '');
  const panel = section.locator('.services-photo-panel');
  expect(await panel.evaluate(node => getComputedStyle(node).position)).toBe(width >= 1024 ? 'sticky' : 'absolute');
  const { top, height } = await section.evaluate(node => ({ top: node.getBoundingClientRect().top + scrollY, height: node.offsetHeight }));
  await fs.mkdir(evidence, { recursive: true });
  const observations = [];
  for (const [tag, offset] of [['top', -84], ['middle', (height - viewportHeight) / 2], ['bottom', height - viewportHeight + 84]]) {
    await page.evaluate(y => scrollTo(0, y), Math.max(0, top + offset));
    const bounds = await section.evaluate(node => {
      const section = node.getBoundingClientRect(), panel = node.querySelector('.services-photo-panel').getBoundingClientRect();
      return { sectionTop: section.top, sectionBottom: section.bottom, panelTop: panel.top, panelBottom: panel.bottom, viewport: innerHeight };
    });
    expect(bounds.panelTop).toBeLessThanOrEqual(Math.max(0, bounds.sectionTop) + 1);
    expect(bounds.panelBottom).toBeGreaterThanOrEqual(Math.min(bounds.viewport, bounds.sectionBottom) - 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await sharp(await page.screenshot()).webp({ quality: 85 }).toFile(`${evidence}/services-${width}-${tag}.webp`);
    observations.push({ tag, ...bounds, contrast: await renderedContrast(page, section) });
  }
  if (width >= 1024) {
    const travel = height - viewportHeight;
    expect(travel).toBeGreaterThan(50);
    const pin = [];
    for (const offset of [20, Math.min(120, travel - 10)]) {
      await page.evaluate(y => scrollTo(0, y), top + offset);
      pin.push((await panel.boundingBox()).y);
    }
    expect(Math.abs(pin[1] - pin[0])).toBeLessThan(2);
  }
  const source = await image.evaluate(node => ({ url: node.currentSrc, naturalWidth: node.naturalWidth, complete: node.complete }));
  const asset = await page.request.get(source.url);
  const bytes = (await asset.body()).byteLength;
  expect(asset.ok()).toBe(true);
  await fs.writeFile(`${evidence}/coverage-${width}.json`, JSON.stringify({ width, sectionHeight: height, imageBytes: bytes, source, observations }, null, 2) + '\n');
  expect(errors).toEqual([]);
});

test('reduced motion is static, links work, and review boilerplate is absent', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('[data-services-overview]');
  await section.scrollIntoViewIfNeeded();
  expect(await section.locator('.services-photo-panel').evaluate(node => getComputedStyle(node).position)).toBe('absolute');
  const reviews = page.locator('[data-google-reviews]').first();
  await expect(reviews.locator('[data-review-id]')).toHaveCount(22);
  await expect(reviews).not.toContainText('Rating checked');
  await expect(reviews).not.toContainText('Selected customer reviews');
  await expect(reviews.locator('a,button')).toHaveCount(0);
  const first = section.locator('a').first();
  await first.focus();
  expect(await first.evaluate(node => getComputedStyle(node).outlineStyle)).toBe('solid');
  for (const href of destinations) {
    await page.goto('/');
    await page.locator(`[data-services-overview] a[href="${href}"]`).click();
    await expect(page).toHaveURL(new RegExp(href + '$'));
  }
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto('/');
    await reviews.evaluate(node => scrollTo(0, node.getBoundingClientRect().top + scrollY - 84));
    const bounds = await reviews.boundingBox();
    await sharp(await page.screenshot()).extract({ left: Math.round(bounds.x), top: Math.round(bounds.y), width: Math.round(bounds.width), height: Math.ceil(bounds.height) }).webp({ quality: 85 }).toFile(`${evidence}/reviews-${width}.webp`);
  }
});

test('touch desktop also uses the static fallback', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: process.env.QA_BASE_URL || 'http://127.0.0.1:3000', viewport: { width: 1440, height: 1000 }, hasTouch: true, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto('/');
  expect(await page.locator('.services-photo-panel').evaluate(node => getComputedStyle(node).position)).toBe('absolute');
  await context.close();
});
