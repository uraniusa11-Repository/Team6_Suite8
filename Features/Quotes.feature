Feature: Quotes Module

  Background:
    Given user is on quotes home page

  Scenario: Verify Quotes dropdown options
    When user clicks on quotes menu
    Then user should see below options in quotes dropdown
      | Create Quote       |
      | View Quotes        |
      | Import             |
      | Import Line Items  |

  Scenario: Navigate to Create Quote page
    When user clicks Create Quote from quotes dropdown
    Then user should be navigated to create quote page

  Scenario Outline: Create quote with valid data
    Given user is on create quote page
    When user fills quote details using "<testData>" and user clicks save button
    Then user should be navigated to quote details page

    Examples:
      | testData |
      | quote1   |

  Scenario: Cancel quote creation
    Given user is on create quote page
    When user fills quote details and clicks cancel button
    Then quote warning popup should be displayed

 Scenario: Confirm cancel navigation on quote page
  Given user is on create quote page
  When user fills quote details and clicks cancel button
  Then user should navigate away from create quote page

  Scenario: Navigate to View Quotes page
    When user clicks View Quotes from quotes dropdown
    Then user should be navigated to quotes list page

  Scenario: Navigate to Import Quotes page
    When user clicks Import Quotes from quotes dropdown
    Then user should be navigated to import quotes page
