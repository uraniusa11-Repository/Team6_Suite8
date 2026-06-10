// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { appConfig } from './config/environment.config.js'
import { defineBddConfig } from 'playwright-bdd';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bddTestDir = defineBddConfig({
  features: [
    'Features/login.feature',
    'Features/home.feature',
    'Features/dashlets.feature',
    'Features/Accounts.feature',
    'Features/createleads.feature',
    'Features/Quotes.feature',
    'Features/calender.feature',
    'Features/contact.feature',
  ],
  steps: [
    'StepDefinition/login.steps.js',
    'StepDefinition/Home.step.js',
    'StepDefinition/Dashlets.step.js',
    'StepDefinition/Accounts.step.js',
    'StepDefinition/leads.step.js',
    'StepDefinition/Quotes.step.js',
    'StepDefinition/calender.Step.js',
    'StepDefinition/Contacts.Step.js',
  ],
  outputDir: '.features-gen/',
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
   reporter: [
    ['line'], 
    ['allure-playwright'], 
    ['html']
  ],

  

  use: {
  
    baseURL: appConfig.baseURL,
    screenshot: 'only-on-failure',
    //trace: 'retain-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
 
  projects: [
    
    {
      name: 'setup',
      testMatch: 'config/auth.setup.js',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'teardown',
      testMatch: 'config/auth.teardown.js',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
    {
      name: 'login',
      testDir: bddTestDir,
      testMatch: '**/login.feature.spec.js',
      fullyParallel: false,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'bdd',
      testDir: bddTestDir,
      testIgnore: '**/login.feature.spec.js',
      fullyParallel: false,
      dependencies: ['setup'],   
      teardown: 'teardown',      
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json', 
      },
    },
    
  ],
 
});