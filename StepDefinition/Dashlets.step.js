import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { DashletPage } from '../Pages/DashletPage.js';
import { createLogger } from '../Utils/logger.js';

const { Given, When, Then, Before } = createBdd();

/** @type {DashletPage} */
let dashletPage;
let logger;

Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    dashletPage = new DashletPage(page, logger);
    logger.info('Dashlet test setup complete');
});

Given('User is on the Dashboard', async () => {
    logger.info('Navigating to SuiteCRM Dashboard');
    await dashletPage.navigateToDashboard();
});

When('user adds the {string} dashlet from the Actions menu', async ({}, dashletName) => {
    logger.info(`Adding "${dashletName}" dashlet from Actions menu`);
    await dashletPage.addDashlet(dashletName);
});

Then('the {string} dashlet should be visible on the dashboard', async ({}, dashletName) => {
    logger.info(`Verifying "${dashletName}" dashlet is visible`);
    await dashletPage.verifyDashletVisible(dashletName);
});

Then('the {string} dashlet should display pagination controls', async ({}, dashletName) => {
    logger.info(`Verifying pagination controls on "${dashletName}" dashlet`);
    await dashletPage.verifyPaginationVisible(dashletName);
});

Then('the pagination should show the total record count', async () => {
    logger.info('Verifying pagination count text on My Calls dashlet');
    await dashletPage.verifyPaginationCount('My Calls');
});

Then('the {string} dashlet should navigate to next page if multiple pages exist or confirm single page', async ({}, dashletName) => {
    logger.info(`Checking page navigation for "${dashletName}" dashlet`);
    await dashletPage.verifyNextPageNavigation(dashletName);
});

Then('the {string} dashlet should return to page 1 after navigating back if multiple pages exist or confirm single page', async ({}, dashletName) => {
    logger.info(`Checking previous page navigation for "${dashletName}" dashlet`);
    await dashletPage.verifyPrevPageNavigation(dashletName);
});

When('user clicks the view button on each record in {string} dashlet', async ({}, dashletName) => {
    logger.info(`Clicking view button on all records in "${dashletName}" dashlet`);
    await dashletPage.clickAllViewBtns(dashletName);
});

Then('user should see the My Calls record page for each record', async () => {
    logger.info('All record pages verified — back on dashboard with My Calls dashlet visible');
    await dashletPage.verifyDashletVisible('My Calls');
});

When('user clicks the edit button on each record in {string} dashlet', async ({}, dashletName) => {
    logger.info(`Clicking edit button on all records in "${dashletName}" dashlet`);
    await dashletPage.clickAllEditBtns(dashletName);
});

Then('user should see the My Calls edit page for each record', async () => {
    logger.info('All edit pages verified — back on dashboard with My Calls dashlet visible');
    await dashletPage.verifyDashletVisible('My Calls');
});
