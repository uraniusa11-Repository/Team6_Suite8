import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
import { LogoutPage } from '../Pages/LogoutPage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { appConfig } from '../config/environment.config.js';
import { createLogger } from '../Utils/logger.js';
import { QuotesPage } from '../Pages/QuotesPage';
import createQuoteData from '../data/createQuoteData.json' assert { type: 'json' };

const { Given, When, Then, Before, After } = createBdd();

/** @type {HomePage} */
let homePage;
let logger;
let navLinksToVerify = [];
let loginpage;
let quotesPage;
let currentTestData;

Before(async ({ page, $testInfo }) => {
  logger = createLogger($testInfo);

  homePage = new HomePage(page, logger);
  quotesPage = new QuotesPage(page, logger);

  logger.info('Home test setup complete');
});
Given('user is on quotes home page', async ({ page }) => {
    logger.info('Navigating to home page');
    await navigateTo(page, 'home');
});

When('user clicks on quotes menu', async function ({ page }) {
  if (!quotesPage) {
    quotesPage = new QuotesPage(page);
  }
  await quotesPage.clickQuotesMenu();
});

Then('user should see below options in quotes dropdown', async function ({ page }, dataTable) {
  const expectedOptions = dataTable.raw().flat();

  const actualOptions = await quotesPage.getDropdownOptionsText();

  expect(actualOptions).toEqual(expectedOptions);
});

When('user clicks Create Quote from quotes dropdown', async ({ page }) => {
  quotesPage = new QuotesPage(page);
  await quotesPage.navigateToCreateQuotePage();
});

Then('user should be navigated to create quote page', async ({ page }) => {
  await quotesPage.verifyCreateQuotePage();
});

Given('user is on create quote page', async function ({ page }) {
  quotesPage = new QuotesPage(page);
  await quotesPage.navigateToCreateQuotePage();
});

When('user fills quote details using {string} and user clicks save button', async ({ page }, testData) => {
  currentTestData = testData;

  const data = createQuoteData[testData];

  console.log(data);

  await quotesPage.fillQuoteDetails(data);

  await quotesPage.clickSaveButton();
});

Then('user should be navigated to quote details page', async ({ page }) => {
  quotesPage = new QuotesPage(page);

  const data = createQuoteData[currentTestData];

 await quotesPage.verifySaveNavigation(data.quoteName);

});

When('user fills quote details and clicks cancel button', async ({ page }) => {
  const quoteData = {
    quoteName: 'Cancel Quote Test',
    validUntilDate: '2026-12-31',
    stage: 'Draft'
  };

  await quotesPage.fillQuoteDetails(quoteData);
  await quotesPage.clickCancelButton();
});

Then('quote warning popup should be displayed', async ({ page }) => {
  console.log('Current URL after cancel:', page.url());
  await expect(page).toHaveURL(/quotes/i, { timeout: 15000 });
});

Then('user should stay on create quote page', async ({ page }) => {
  await quotesPage.verifyCreateQuotePage();
});

Then('user should navigate away from create quote page', async ({ page }) => {
  quotesPage = new QuotesPage(page);
  console.log("Current URL:", page.url());
  await page.screenshot({ path: 'beforeCancel.png' });
  await quotesPage.verifyCancelNavigation();
});

When('user clicks View Quotes from quotes dropdown', async ({ page }) => {
  quotesPage = new QuotesPage(page);
  await quotesPage.navigateToQuotesPage();
});

Then('user should be navigated to quotes list page', async ({ page }) => {
  await quotesPage.verifyQuotesPage();
});

When('user clicks Import Quotes from quotes dropdown', async ({ page }) => {
  quotesPage = new QuotesPage(page);
  await quotesPage.navigateToImportQuotesPage();
});

Then('user should be navigated to import quotes page', async ({ page }) => {
  await quotesPage.verifyImportQuotesPage();
});
