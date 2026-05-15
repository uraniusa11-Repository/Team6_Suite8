// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { appConfig } from './config/environment.config.js'
import { defineBddConfig } from 'playwright-bdd';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bddTestDir = defineBddConfig({
  features: ['Features/login.feature', 'Features/home.feature'],
  steps: ['StepDefinition/login.steps.js', 'StepDefinition/Home.step.js'],
  outputDir: '.features-gen/login',
});

// const bddTestDir1 = defineBddConfig({
//   features: 'Features/login1.feature',
//   steps: ['StepDefinition/login1.steps.js'],
//   outputDir: '.features-gen/login1',
// });

// const bddTestDir2 = defineBddConfig({
//   features: 'Features/login2.feature',
//   steps: ['StepDefinition/login2.steps.js'],
//   outputDir: '.features-gen/login2',
// });

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
  // Global setup/teardown approach — replaced by project-level setup/teardown below
  // globalSetup: path.join(__dirname, 'config/global.setup.js'),
  // globalTeardown: path.join(__dirname, 'config/global.teardown.js'),
  //testDir: './tests',
  //testDir:'bddTestDir',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    baseURL: appConfig.baseURL,
    screenshot: 'only-on-failure',
    //trace: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [

    // Project-level setup — logs in once and saves auth.json before bdd tests run
    {
      name: 'setup',
      testMatch: 'config/auth.setup.js',
      use: { ...devices['Desktop Chrome'] },
    },

    // Project-level teardown — logs out once after bdd tests complete
    {
      name: 'teardown',
      testMatch: 'config/auth.teardown.js',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },

    {
      name: 'bdd',
      testDir: bddTestDir,
      fullyParallel: false,
      dependencies: ['setup'],   // runs after setup
      teardown: 'teardown',      // runs teardown when bdd finishes
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json', // reuse auth state saved by setup project
      },
    },
    // {
    //   name: 'login2',
    //   testDir: bddTestDir2,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'chromium',
      testDir: './tests',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      testDir: './tests',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      testDir: './tests',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

