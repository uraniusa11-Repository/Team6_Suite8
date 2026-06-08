import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { LogoutPage } from '../Pages/LogoutPage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { appConfig } from '../config/environment.config.js';
import { createLogger } from '../Utils/logger.js';
import { AccountsPage } from '../Pages/AccountsPage.js';

import createAccountData from '../data/createAccountData.json' assert { type: 'json' };


const { Given, When, Then, Before, After } = createBdd();

/** @type {HomePage} */
let homePage;
let logger;
let navLinksToVerify = [];
let loginpage;
let homepage;
let accountsPage;
let currentTestData;

Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    homePage = new HomePage(page, logger);
    logger.info('Home test setup complete');
});
Given('user is on home page', async ({ page }) => {
    logger.info('Navigating to home page');
    await navigateTo(page, 'home');
});

When('user clicks on accounts menu', async ({ page }) => {
  accountsPage = new AccountsPage(page);

  await accountsPage.clickAccountsMenu();
});

Then('user should see below options in accounts dropdown', async ({ page }, dataTable) => {
  const expectedOptions = dataTable.raw().flat();

  const actualOptions = await accountsPage.getDropdownOptionsText();

  console.log('actual options are:', actualOptions);

  expect(actualOptions).toEqual(expect.arrayContaining(expectedOptions));
});

When('user clicks Create Account from accounts dropdown',async ({ page }) => {accountsPage = new AccountsPage(page);

    await accountsPage.hoverAccountsMenu();

    await accountsPage.clickCreateAccount();
  }
);

Then('user should be navigated to create account page',async ({ page }) => {
    await accountsPage.verifyCreateAccountPage();
  }
);

Given('user is on create account page', async ({ page }) => {
  accountsPage = new AccountsPage(page);

  await accountsPage.hoverAccountsMenu();

  await accountsPage.clickCreateAccount();
});

When('user fills account details using {string} and user clicks save button',async ({ page }, testData) => {
    currentTestData = testData;

    const data = createAccountData[testData];

    console.log(data);

    await accountsPage.fillAccountDetails(data);

    await accountsPage.clickSaveButton();
  }
);

Then('user should be navigated to account details page',async ({ page }) => {
    accountsPage = new AccountsPage(page);

    const data = createAccountData[currentTestData];

    await accountsPage.verifySaveNavigation(data.accountName);
  }
);

When('user fills account details and clicks cancel button', async ({ page }) => {
  accountsPage = new AccountsPage(page);

  await accountsPage.clickAccountsMenu();
  await accountsPage.clickCreateAccount();

  await expect(accountsPage.nameTextbox).toBeVisible({ timeout: 15000 });

  await accountsPage.fillAccountDetails({
    accountName: 'Cancel Test Account',
    officePhone: '9876543210',
    website: 'https://test.com',
    email: 'cancel@test.com',
    address: 'Atlanta',
    city: 'Atlanta',
    state: 'Georgia'
  });

  await accountsPage.clickCancelButton();
});

Then('warning popup should be displayed', async ({ page }) => {
  await accountsPage.verifyPopupDisplayed();
});

Given('warning popup is displayed on account page',async ({ page }) => {
    const data = createAccountData.account1;

    accountsPage = new AccountsPage(page);

    await accountsPage.hoverAccountsMenu();

    await accountsPage.clickCreateAccount();

    await accountsPage.fillAccountDetails(data);

    await accountsPage.clickCancelButton();

    await accountsPage.verifyPopupDisplayed();
  }
);

When('user clicks Ok button on popup', async ({ page }) => {
  accountsPage = new AccountsPage(page);

  await accountsPage.clickOkButton();
});

Then('user should navigate away from create account page',async ({ page }) => {
    accountsPage = new AccountsPage(page);

    await accountsPage.verifyCancelNavigation();
  }
);

When('user clicks View Accounts from accounts dropdown',async ({ page }) => {
    accountsPage = new AccountsPage(page);

    await accountsPage.hoverAccountsMenu();

    await accountsPage.clickViewAccounts();
  }
);

Then('user should be navigated to accounts list page',async ({ page }) => {
    await accountsPage.verifyAccountsPage();
  }
);

When('user clicks Import Accounts from accounts dropdown',async ({ page }) => {
    accountsPage = new AccountsPage(page);

    await accountsPage.hoverAccountsMenu();

    await accountsPage.clickImportAccounts();
  }
);

Then('user should be navigated to import accounts page',async ({ page }) => {
    await accountsPage.verifyImportAccountsPage();
  }
);