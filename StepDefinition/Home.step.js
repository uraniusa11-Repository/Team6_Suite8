import { createBdd } from 'playwright-bdd';
import { HomePage } from '../Pages/HomePage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { createLogger } from '../Utils/logger.js';

const { Given, When, Then, Before } = createBdd();

/** @type {HomePage} */
let homePage;
let logger;
let navLinksToVerify = [];

Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    homePage = new HomePage(page, logger);
    logger.info('Home test setup complete');
});

Given('user is logged in and on the home page', async ({ page }) => {
    logger.info('Navigating to home page');
    await navigateTo(page, 'home');
});

Then('User should see the following menu items in the navigation bar', async ({}, menuTable) => {
    const menuItems = menuTable.rows().map(row => row[0]);
    logger.info(`Verifying nav menu items are visible: ${menuItems.join(', ')}`);
    for (const item of menuItems) {
        await assertVisible(homePage.hoverableElement(item));
    }
});

When('User hovers over the following navigation elements and icons', async ({}, menutableandicons) => {
    navLinksToVerify =  menutableandicons.rows().map(row => row[0]);
    logger.info(`Queued elements to verify highlight: ${navLinksToVerify.join(', ')}`);
});

Then('each navigation element should be highlighted', async () => {
    logger.info('Verifying each navigation element is highlighted on hover');
    for (const name of navLinksToVerify) {
        await homePage.verifyElementHighlighted(name);
    }
});

When('User hovers over the following navigation links', async ({}, menuTable) => {
    navLinksToVerify = menuTable.rows().map(row => row[0]);
    logger.info(`Queued nav links to verify dropdown: ${navLinksToVerify.join(', ')}`);
});

Then('each navigation link should be highlighted and show a dropdown', async () => {
    logger.info('Verifying each nav link shows a dropdown on hover');
    for (const item of navLinksToVerify) {
        await homePage.hoverNavLink(item);
        await assertVisible(homePage.navLinkDropdown(item));
    }
});

When('User hovers over the Quick Actions icon', async () => {
    logger.info('Hovering over Quick Actions icon');
    await hover(homePage.quickCreateBtn);
});

Then('Quick Actions drop down should be visible with below Actions', async ({}, table) => {
    logger.info('Verifying Quick Actions dropdown and its items');
    await assertVisible(homePage.quickCreateDropdown);
    const actions = table.rows().map(row => row[0]);
    for (const action of actions) {
        await assertVisible(homePage.quickCreateMenuItem(action));
    }
});

When('user hovers over the User Profile icon', async () => {
    logger.info('Hovering over User Profile icon');
    await hover(homePage.profileIcon);
});

Then('the user profile dropdown should be visible with following <Options>', async ({}, optionsTable) => {
    logger.info('Verifying profile dropdown options');
    const options = optionsTable.rows().map(row => row[0]);
    for (const option of options) {
        await assertVisible(homePage.profileDropdownOption(option));
    }
});

Given('HomeIcon is visible.', async () => {
    logger.info('Verifying Home icon is visible');
    await assertVisible(homePage.homeIcon);
});

When('User clicks on the home icon', async () => {
    logger.info('Clicking Home icon');
    await click(homePage.homeIcon);
});

Then('User should be redirected to the home Dashboard page', async () => {
    logger.info('Verifying redirect to home dashboard');
    await assertVisible(homePage.dashboardLink);
});

Given('User can see the search field', async () => {
    logger.info('Verifying Search field is visible');
    await assertVisible(homePage.searchIcon);
});

When('User hovers over the Search field', async () => {
    logger.info('Hovering over Search field');
    await hover(homePage.searchIcon);
});

Then('Search fieldd get highlighted', async () => {
    logger.info('Verifying Search field is highlighted');
    await homePage.verifySearchHighlighted();
});

When('User clicks on the Actions button on the dashboard', async () => {
    logger.info('Clicking Actions button on dashboard');
    await homePage.clickActionsBtn();
});

Then('the Actions dropdown should be visible with the following options', async ({}, actionsDropdown) => {
    logger.info('Verifying Actions dropdown is open and options are visible');
    const actionsDropdownoptions = actionsDropdown.rows().map(row => row[0]);
    await homePage.verifyActionsDropdownOpen(actionsDropdownoptions);
});

When('User clicks on {string} from the Actions dropdown', async ({}, actionOption) => {
    logger.info(`Clicking "${actionOption}" from Actions dropdown`);
    await homePage.clickActionsDropdownOption(actionOption);
});

Then('the dialog header should display {string}', async ({}, expectedHeader) => {
    logger.info(`Verifying dialog header: "${expectedHeader}"`);
    await homePage.verifyActionDialogHeader(expectedHeader);
});

When('User clicks on the SuiteCRM Dashboard link', async () => {
    logger.info('Clicking SuiteCRM Dashboard link');
    await homePage.clickDashboardLink();
});

Then('dashlets should be displayed', async ({ $testInfo }) => {
    logger.info('Verifying dashlets are visible on the dashboard');
    await homePage.verifyDashletsVisible($testInfo);
});

When('User hovers over the Recently Viewed icon', async () => {
    logger.info('Hovering over Recently Viewed icon');
    await hover(homePage.recentlyViewedIcon);
});

Then('the recently viewed items should be displayed', async () => {
    logger.info('Verifying Recently Viewed panel and items');
    await homePage.verifyRecentlyViewedItemsVisible();
});
