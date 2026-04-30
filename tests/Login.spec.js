import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';

test('User can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage  = new HomePage(page);

    await page.goto('./#/Login');
    await page.waitForURL(url => url.href.includes('/Login'));

    await loginPage.login(process.env.SUITE_USERNAME, process.env.SUITE_PASSWORD);

    await page.waitForURL(url => url.href.includes('/home'));
    await expect(homePage.dashboardLink).toBeVisible();
});
