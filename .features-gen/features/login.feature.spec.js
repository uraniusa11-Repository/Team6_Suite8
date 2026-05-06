// Generated from: Features\login.feature
import { test } from "playwright-bdd";

test.describe('Login', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('user is on the login page', null, { page }); 
  });
  
  test('Valid credentials - user logs in successfully', async ({ When, Then, page }) => { 
    await When('user logs in with valid credentials'); 
    await Then('user should be redirected to the home page', null, { page }); 
  });

  test('Invalid username and password - shows error alert', async ({ When, Then }) => { 
    await When('user logs in with username "wronguser" and password "wrongpass"'); 
    await Then('user should see credentials error'); 
  });

  test('Wrong username only - shows error alert', async ({ When, Then }) => { 
    await When('user logs in with wrong username and valid password'); 
    await Then('user should see credentials error'); 
  });

  test('Wrong password only - shows error alert', async ({ When, Then }) => { 
    await When('user logs in with valid username and wrong password'); 
    await Then('user should see credentials error'); 
  });

  test('Both fields empty - shows validation errors on both fields', async ({ When, Then }) => { 
    await When('user submits the login form with empty fields'); 
    await Then('user should see validation errors on both fields'); 
  });

  test('Empty username - shows username validation error', async ({ When, Then }) => { 
    await When('user logs in with empty username and valid password'); 
    await Then('user should see username validation error'); 
  });

  test('Empty password - shows password validation error', async ({ When, Then }) => { 
    await When('user logs in with valid username and empty password'); 
    await Then('user should see password validation error'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('Features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then user should be redirected to the home page","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When user logs in with username \"wronguser\" and password \"wrongpass\"","stepMatchArguments":[{"group":{"start":27,"value":"\"wronguser\"","children":[{"start":28,"value":"wronguser","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":52,"value":"\"wrongpass\"","children":[{"start":53,"value":"wrongpass","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then user should see credentials error","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When user logs in with wrong username and valid password","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then user should see credentials error","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When user logs in with valid username and wrong password","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then user should see credentials error","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When user submits the login form with empty fields","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then user should see validation errors on both fields","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When user logs in with empty username and valid password","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then user should see username validation error","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user is on the login page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When user logs in with valid username and empty password","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then user should see password validation error","stepMatchArguments":[]}]},
]; // bdd-data-end