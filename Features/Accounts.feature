Feature: Accounts Module

  Background:
    Given user is on home page

  Scenario: Verify accounts dropdown options
  Given user is on home page
  When user clicks on accounts menu
  Then user should see below options in accounts dropdown
  | Create Account  |
  | View Accounts   |
  | Import Accounts |

  Scenario: Verify Create Account navigation
    When user clicks Create Account from accounts dropdown
    Then user should be navigated to create account page

  Scenario Outline: Save account successfully
    Given user is on create account page
    When user fills account details using "<testData>" and user clicks save button
    Then user should be navigated to account details page

    Examples:
      | testData |
      | account1 |
      | account2 |

  Scenario: Verify cancel popup message
    Given user is on create account page
    When user fills account details and clicks cancel button
    Then warning popup should be displayed

  Scenario: Verify Ok button on cancel popup
    Given warning popup is displayed on account page
    When user clicks Ok button on popup
    Then user should navigate away from create account page

  Scenario: Verify View Accounts navigation
    When user clicks View Accounts from accounts dropdown
    Then user should be navigated to accounts list page

  Scenario: Verify Import Accounts navigation
    When user clicks Import Accounts from accounts dropdown
    Then user should be navigated to import accounts page
