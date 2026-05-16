// Project-level Teardown — runs as a special test after the bdd project completes.
// Uses the page fixture directly to logout.
import { test as teardown } from '@playwright/test';

teardown('logout', async ({ page }) => {
    await page.goto('./#/home');
    await page.waitForURL(url => url.href.includes('/home'));
    await page.locator('a.dropdown-toggle.nav-link.primary-global-link').hover();
    await page.locator('div.dropdown-menu.global-links-dropdown')
        .locator('a.dropdown-item', { hasText: 'Logout' })
        .click();
});
