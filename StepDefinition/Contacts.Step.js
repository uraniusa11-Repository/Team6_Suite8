import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage.js';
import { ContactsPage } from '../Pages/ContactsPage.js';

import createContactData from '../data/createContactData.json'assert { type: 'json' };

import { LogoutPage } from '../Pages/LogoutPage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { appConfig } from '../config/environment.config.js';
import { createLogger } from '../Utils/logger.js';
const { Given, When, Then, Before, After } = createBdd();
/** @type {ContactsPage} */
let loginpage;
let homePage;
let contactsPage;
let currentTestData;
let logger;
let navLinksToVerify = [];
Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    homePage = new HomePage(page, logger);
    contactsPage = new ContactsPage(page);
    logger.info('Home test setup complete');
});

Given('user is on contact home page', async ({ page }) => {

   logger.info('Navigating to home page');
        await navigateTo(page, 'home');
});


When('user clicks on contacts menu', async ({page}) => {
     logger.info('Clicking calender menu');
    await contactsPage.clickContactsMenu();
});

Then('user should see below options in contacts dropdown', async ({page}, dataTable) => {
  const expectedOptions = dataTable.raw().flat();
  const actualOptions = await contactsPage.getDropdownOptionsText();
    expect(actualOptions).toEqual(expectedOptions);
});

When('user clicks Create Contact from contacts dropdown', async ({page}) => {
    logger.info('Clicking create contact');
     await contactsPage.hoverContactsMenu();
     await contactsPage.clickCreateContact();

});

Then('user should be navigated to corresponding page', async ({page}) => {
    await contactsPage.verifyCreateContactPage();
});

When('user fills contact details using {string} and user clicks cancel button', async ({page}, testData) => {
    logger.info('create contact filling form');
    currentTestData = testData;
    const data = createContactData[testData];
    await contactsPage.fillContactDetails(data);
    await contactsPage.clickCancelButton();

});

Then('contact warning popup should be displayed', async ({page}) => {
     await contactsPage.clickOkButton();
});

Given('contact warning popup is displayed', async ({page}) => {
  
    logger.info('warning popup...');
    await contactsPage.hoverContactsMenu();
    await contactsPage.clickCreateContact();
    await contactsPage.fillContactDetails();
    await contactsPage.clickCancelButton();
    await contactsPage.verifyPopupDisplayed();
   
});

When('user fills contact details using {string}, clicks cancel button, and clicks Ok button on popup',
  async ({page},testData) => {

    logger.info('fills form and clicks cancel');
    const data = createContactData[testData];
    await contactsPage.fillContactDetails(data);
    await contactsPage.clickCancelButton();
    await contactsPage.verifyPopupDisplayed();
    await contactsPage.clickOkButton();
  }
);


Then('user should navigate away from create contact page', async ({page}) => {

 await contactsPage.verifyCancelNavigation();
});


Given('user is on create contact page', async ({page}) => {
  
   logger.info('create contact page');
    await contactsPage.hoverContactsMenu();
    await contactsPage.clickCreateContact();
    
});


When('user fills contact details using {string} and user clicks save button', async ({page}, testData) => {
    
    logger.info('fills form and clicks save');
    currentTestData = testData;
    const data = createContactData[testData];
    await contactsPage.fillContactDetails(data);
    await contactsPage.clickSaveButton();

});

Then('user should be navigated to contact details page', async ({ page }) => {
    
     const data = createContactData[currentTestData];
    await contactsPage.verifySaveNavigation(data.firstName,data.lastName);

  });

When('user clicks Create Contact from vCard from contacts dropdown', async ({page}) => {

    logger.info('create vcard');
  contactsPage.clickCreateContactFromVcard();
});

Then('user should be navigated to corresponding vcard page', async ({page}) => {
    await contactsPage.verifyImportVcardPage();
});

Given('user is on import vcard page', async ({page}) => {
    
    logger.info('import vcard');
    await contactsPage.hoverContactsMenu();
    await contactsPage.clickCreateContactFromVcard();
});

When('user uploads vcard file', async ({page}) => {
      
    logger.info('file upload');
      contactsPage.uploadVcardFileMethod();
});

Then('contact should be imported successfully', async ({page}) => {
    
    await contactsPage.verifyImportedContact();
});

Given('user is on import contacts page',async ({ page }) => {

  logger.info('imports contacts');
    await contactsPage.clickImportContacts();
});

When('user imports contact file',async ({ page }) => {

   logger.info('import files');
    await contactsPage.uploadImportFile();
    await contactsPage.confirmFileProperties();
    await contactsPage.mapImportFields();
    await contactsPage.importContacts();
});
Then('contacts should be imported successfully',async ({ page }) => {

   
    await contactsPage.verifyImportResults();
});


When('user enters contact details {string} without Last Name', async ({ page },testData) => {

   logger.info('contact details form fill without last name');
   const data = createContactData[testData];
    await contactsPage.enterContactWithoutLastName(data);
      
});

Then('missing required message should be displayed', async ({ page }) => {


    await contactsPage.verifyLastNameValidationMessage();
});

When('user hovers over Contacts menu and clicks View Contacts',async ({ page }) => {

    logger.info('view contacts');
    await contactsPage.navigateToViewContacts();
});

Then('Contacts page should be displayed',async () => {

    await contactsPage.verifyContactsPage();
});