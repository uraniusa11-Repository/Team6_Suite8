import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { LogoutPage } from '../Pages/LogoutPage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { appConfig } from '../config/environment.config.js';
import { createLogger } from '../Utils/logger.js';

// Global setup (config/global.setup.js) logs in once before all tests.
// Global teardown (config/global.teardown.js) logs out once after all tests.
const { Given, When, Then, Before, After } = createBdd();

/** @type {HomePage} */
let homePage;
let logger;
let navLinksToVerify = [];

Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    homePage = new HomePage(page, logger);
    logger.info('Home test setup complete');
});

// Per-test logout — replaced by global teardown (config/global.teardown.js)
// After(async ({ page }) => {
//     const logoutPage = new LogoutPage(page, homePage.profileBtn);
//     await logoutPage.logout();
// });

// Per-test login — replaced by global setup + storageState (auth.json)
// Given('user is logged in and on the home page', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.userlogin(appConfig.username, appConfig.password);
// });

// Auth state injected via storageState (auth.json) — just navigate to home
Given('user is logged in and on the home page', async ({ page }) => {
    logger.info('Navigating to home page');
    await navigateTo(page, 'home');
});

// Scenario: Verify all nav links are visible in the navigation bar
Then('User should see the following menu items in the navigation bar', async ({}, menuTable) => {
    const menuItems = menuTable.rows().map(row => row[0]);
    logger.info(`Verifying nav menu items are visible: ${menuItems.join(', ')}`);
    for (const item of menuItems) {
        await assertVisible(homePage.hoverableElement(item));
    }
});

// Scenario: Verify nav links and icons are highlighted on hover
When('User hovers over the following navigation elements and icons', async ({}, table) => {
    navLinksToVerify = table.rows().map(row => row[0]);
    logger.info(`Queued elements to verify highlight: ${navLinksToVerify.join(', ')}`);
});

Then('each navigation element should be highlighted', async () => {
    logger.info('Verifying each navigation element is highlighted on hover');
    for (const name of navLinksToVerify) {
        await homePage.verifyElementHighlighted(name);
    }
});

// Scenario: Verify navigation links show dropdown on hover
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


// Scenario: Verify Quick Actions
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


// Scenario: Verify User profile icon
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

// Scenario: Verify Home Icon
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

// Scenario: Verify Search field
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





// Scenario: Verify Recently Viewed
When('User hovers over the Recently Viewed icon', async () => {
    logger.info('Hovering over Recently Viewed icon');
    await hover(homePage.recentlyViewedIcon);
});

Then('the recently viewed items should be displayed', async () => {
    logger.info('Verifying Recently Viewed panel and items');
    await homePage.verifyRecentlyViewedItemsVisible();
});

