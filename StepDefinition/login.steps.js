import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { appConfig } from '../config/environment.config.js';
import { errorMessages } from '../data/errorMessages.js';
import { navigateTo } from '../support/helpers.js';

const { Given, When, Then, Before } = createBdd();

let loginPage;

Before(async ({ page }) => {
  loginPage = new LoginPage(page);
});

Given('user is on the login page', async ({ page }) => {
  await navigateTo(page, 'Login');
});


/*use this*/

// Given('user is loogedin', async ({page }) => {
//  await (new LoginPage(page)).userlogin(appConfig.username, appConfig.password)
// });



When('user logs in with valid credentials', async () => {
  await loginPage.login(appConfig.username, appConfig.password);
});

When('user logs in with username {string} and password {string}', async ({}, username, password) => {
  await loginPage.login(username, password);
});

When('user logs in with wrong username and valid password', async () => {
  await loginPage.login('wrong username', appConfig.password);
});

When('user logs in with valid username and wrong password', async () => {
  await loginPage.login(appConfig.username, 'wrongpassword');
});

When('user submits the login form with empty fields', async () => {
  await loginPage.login('', '');
});

When('user logs in with empty username and valid password', async () => {
  await loginPage.login('', appConfig.password);
});

When('user logs in with valid username and empty password', async () => {
  await loginPage.login(appConfig.username, '');
});

Then('user should be redirected to the home page', async ({ page }) => {
  await page.waitForURL(url => url.href.includes('/home'));
  await expect(new HomePage(page).dashboardLink).toBeVisible();
});

Then('user should see credentials error', async () => {
  await expect(loginPage.credentialsError).toContainText(errorMessages.invalidCredentials);
});

Then('user should see username validation error', async () => {
  await expect(loginPage.usernameValidationError).toHaveText(errorMessages.missingRequiredField);
});

Then('user should see password validation error', async () => {
  await expect(loginPage.passwordValidationError).toHaveText(errorMessages.missingRequiredField);
});

Then('user should see validation errors on both fields', async () => {
  await expect.soft(loginPage.usernameValidationError).toHaveText(errorMessages.missingRequiredField);
  await expect.soft(loginPage.passwordValidationError).toHaveText(errorMessages.missingRequiredField);
});
