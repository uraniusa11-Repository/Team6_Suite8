// Project-level Setup — runs as a special test before the bdd project.
// Uses the page fixture directly (no need to manually create browser/context/page).
import { test as setup } from '@playwright/test';
import { appConfig } from './environment.config.js';

setup('authenticate', async ({ page }) => {
    await page.goto('./#/Login');
    await page.waitForURL(url => url.href.includes('/Login'));
    await page.getByRole('textbox', { name: 'Username' }).fill(appConfig.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(appConfig.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForURL(url => url.href.includes('/home'));

    // Save authenticated session to auth.json
    await page.context().storageState({ path: 'auth.json' });
});
