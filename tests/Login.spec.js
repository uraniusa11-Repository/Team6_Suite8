import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
import { navigateTo } from '../support/helpers.js';
import { errorMessages } from '../data/errorMessages.js';
import { appConfig } from '../config/environment.config.js';



test.describe('Login', () => {
let loginPage;
let homePage;
let loginmsg;

 test.beforeEach(async ({ page }) => {

     loginPage= new LoginPage(page);
     homePage  = new HomePage(page);
     await navigateTo(page, 'Login');
     
 })


  test('Valid credentials - user logs in successfully', async ({ page },testInfo) => {
    await loginPage.login(appConfig.username, appConfig.password);
    //await page.pause();
    await loginPage.checkForAlert(testInfo);
    //  console.log("isvisible is  ",await loginPage.credentialsError.count());
    // console.log("is attached is  ",await loginPage.credentialsError.isattached());
    // console.log("error message is ",await loginPage.credentialsError.textContent());
    await page.waitForURL(url => url.href.includes('/home'));
    await expect(homePage.dashboardLink).toBeVisible();
  });

  test('Invalid credentials - shows error alert', async ({ page }) => {
    await loginPage.login('wrongusername', 'wrongpassword');
    await expect(loginPage.credentialsError).toContainText(errorMessages.invalidCredentials);
  });

   test('Wrong username only - shows error alert', async ({ page }) => {
    await loginPage.login('wrongusername', appConfig.password);
    console.log("error message is ",await loginPage.credentialsError.textContent());
    await expect(loginPage.credentialsError).toContainText(errorMessages.invalidCredentials);
  });

  test('Wrong password only - shows error alert', async ({ page }) => {
    await loginPage.login(appConfig.username, 'wrongpassword');
    await expect(loginPage.credentialsError).toContainText(errorMessages.invalidCredentials);
  });

  test('Both fields empty - shows validation errors on both fields', async ({ page }) => {
    
    await loginPage.login('','');
    await expect.soft(loginPage.usernameValidationError).toHaveText(errorMessages.missingRequiredField);
    await expect.soft(loginPage.passwordValidationError).toHaveText(errorMessages.missingRequiredField);
  });

  test('Empty username - shows username validation error', async ({ page }) => {
   
    await loginPage.login('', appConfig.password);
    await expect(loginPage.usernameValidationError).toHaveText(errorMessages.missingRequiredField);
  });

  test('Empty password - shows password validation error', async ({ page }) => {

    await loginPage.login(appConfig.username, '');
    await expect(loginPage.passwordValidationError).toHaveText(errorMessages.missingRequiredField);
  });

});

