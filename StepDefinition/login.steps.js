import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage.js';
import { HomePage } from '../Pages/HomePage.js';
import { navigateTo, waitForURL, assertVisible, assertText } from '../support/helpers.js';
import { scenarioData } from '../data/loginScenarioData.js';
import { createLogger } from '../Utils/logger.js';

const { Given, When, Then, Before } = createBdd();

/** @type {LoginPage} */
let loginPage;

Before(async ({ page }) => {
  loginPage = new LoginPage(page);
});

Given('User is on the login page', async ({ page }) => {
  await navigateTo(page, 'Login');
});

When('User Logs in with {string}', async ({}, scenario) => {
  const { username, password } = scenarioData[scenario];
  await loginPage.login(username, password);
});

Then('Verify Expected  message for {string}', async ({ page }, scenario) => {
  const { assertType, expectedMessage } = scenarioData[scenario];

  switch (assertType) {
    case 'redirect':
      await waitForURL(page, '/home');
      await assertVisible(new HomePage(page).dashboardLink);
      break;

    case 'credentialsError':
      await assertText(loginPage.credentialsError, expectedMessage, { match: 'contains' });
      break;

    case 'bothValidation':
      await assertText(loginPage.usernameValidationError, expectedMessage, { soft: true });
      await assertText(loginPage.passwordValidationError, expectedMessage, { soft: true });
      break;

    case 'usernameValidation':
      await assertText(loginPage.usernameValidationError, expectedMessage);
      break;

    case 'passwordValidation':
      await assertText(loginPage.passwordValidationError, expectedMessage);
      break;
  }
});
