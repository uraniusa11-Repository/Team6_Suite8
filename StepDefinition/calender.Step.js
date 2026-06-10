import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage.js';
import { CalendarPage } from '../Pages/calenderPage.js';

import calendarMeetingData from '../data/calenderMeetingData.json' assert { type: 'json' };
import calendarData from '../data/calendercallData.json' assert { type: 'json' };
import { LogoutPage } from '../Pages/LogoutPage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import { appConfig } from '../config/environment.config.js';
import { createLogger } from '../Utils/logger.js';
const { Given, When, Then, Before, After } = createBdd();
let loginpage;
let homePage;
let calendarPage;
let currentTestData;
let logger;
let navLinksToVerify = [];
Before(async ({ page, $testInfo }) => {
    logger = createLogger($testInfo);
    homePage = new HomePage(page, logger);
     calendarPage = new CalendarPage(page);
    logger.info('Home test setup complete');
});

Given('user is on Home page', async ({ page }) => {

   logger.info('Navigating to home page');
        await navigateTo(page, 'home');
});

When('user hovers over Calendar menu and clicks Schedule Meeting',async ({ page }) => {
  
    logger.info('Clicking on schedule meeting');
    await calendarPage.navigateToScheduleMeeting();
 
});

Then('Meeting Create page should be displayed',async () => {
    logger.info('Navigating to meeting page');
    await calendarPage.verifyMeetingPage();
});

Given('user is on Schedule Meeting page',async ({ page }) => {

         logger.info('schedule meeting page...');
         await calendarPage.navigateToScheduleMeeting();
});

When('user enters meeting details using {string} and clicks Save button',async ({ page }, testData) => {

    logger.info('fill meeting details');
    currentTestData = testData;
    const data = calendarMeetingData[testData];
    await calendarPage.createMeeting(data);
    await calendarPage.clickSaveButton();
  
});

Then('created meeting subject should be displayed correctly',async ({ page }) => {

  
    const data = calendarMeetingData[currentTestData];
    await calendarPage.verifyCreatedMeeting(data.subject);
    
});

When('user hovers over Calendar menu and clicks Schedule Call',async ({ page }) => {

    logger.info('click schedule call');
    await calendarPage.navigateToScheduleCall();
});

Then('Call Create page should be displayed',async () => {

    await calendarPage.verifyCallPage();
});

Given('user is on Schedule Call page',async ({ page }) => {
  
    logger.info('schedule call page');
    await calendarPage.navigateToScheduleCall();
});

When('user enters call details using {string} and clicks Save',async ({ page }, testData) => {

    logger.info('fill details in call page and click save');
    currentTestData = testData;
    const data = calendarData[testData];
    await calendarPage.createCall(data);
});

Then('created call subject should be displayed correctly',async () => {

    const data = calendarData[currentTestData];
    await calendarPage.verifyCreatedCall(data.subject);
});

When('user hovers over Calendar menu and clicks Create Task',async ({ page }) => {

    logger.info('click create task');
    await calendarPage.navigateToCreateTask();
});

Then('Task Create page should be displayed',async () => {

    await calendarPage.verifyTaskPage();
});

Given('user is on Create Task page',async ({ page }) => {
  
    logger.info('Task page');  
    await calendarPage.navigateToCreateTask();
});

When('user enters task details using {string} and clicks Save',async ({ page }, testData) => {

    logger.info('fill detials in task page and click save');
    currentTestData = testData;
    const data = calendarData[testData];
    await calendarPage.createTask(data);
});

Then('created task subject should be displayed correctly',async () => {

    const data = calendarData[currentTestData];
    await calendarPage.verifyCreatedTask(data.subject);
});

When('user hovers over Calendar menu and clicks Today',async ({ page }) => {

    logger.info('click today option');
    await calendarPage.navigateToToday();
});

Then('Calendar Day View page should be displayed',async () => {

    await calendarPage.verifyCalendarPage();
});
