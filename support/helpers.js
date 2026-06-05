import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} relativePath
 */
export const navigateTo = async (page, relativePath) => {
  await page.goto(`./#/${relativePath}`);
  await page.waitForURL(url => url.href.includes(`/${relativePath}`));
};

/**
 * @param {import('@playwright/test').Locator} locator
 * @returns {Promise<string>}
 */
export const getBackgroundColor = async (locator) => {
  return await locator.evaluate(el => getComputedStyle(el).backgroundColor);
};

/**
 * @param {import('@playwright/test').Locator} locator
 * @returns {Promise<string>}
 */
export const getBackgroundColorOnHover = async (locator) => {
  await locator.hover();
  return await locator.evaluate(el => getComputedStyle(el).backgroundColor);
};

/**
 * @param {import('@playwright/test').Locator} locator
 * @param {string} value
 */
export const fill = async (locator, value) => {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
};

/**
 * @param {import('@playwright/test').Locator} locator
 */
export const click = async (locator) => {
    await locator.click();
};

/**
 * @param {import('@playwright/test').Locator} locator
 */
export const hover = async (locator) => {
    await locator.hover();
};

/**
 * @param {import('@playwright/test').Locator} locator
 * @param {{ timeout?: number }} [options]
 */
export const assertVisible = async (locator, options = {}) => {
    await expect(locator).toBeVisible(options);
};

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} urlPath
 */
export const waitForURL = async (page, urlPath) => {
    await page.waitForURL(url => url.href.includes(urlPath));
};

/**
 * @param {import('@playwright/test').Locator} locator
 * @param {string} text
 * @param {{ match?: 'exact' | 'contains', soft?: boolean }} [options]
 */
export const assertText = async (locator, text, { match = 'exact', soft = false } = {}) => {
    const assertion = soft ? expect.soft(locator) : expect(locator);
    if (match === 'contains') {
        await assertion.toContainText(text);
    } else {
        await assertion.toHaveText(text);
    }
};
