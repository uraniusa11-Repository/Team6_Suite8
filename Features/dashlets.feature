Feature: Dashlets

  Background:
    Given User is on the Dashboard

  Scenario: Add My Calls dashlet and verify it is visible
    When user adds the "My Calls" dashlet from the Actions menu
    Then the "My Calls" dashlet should be visible on the dashboard

  Scenario: Verify My Calls dashlet pagination controls are visible
    Then the "My Calls" dashlet should display pagination controls
    And the pagination should show the total record count

  Scenario: Verify My Calls dashlet navigates to next page
    Then the "My Calls" dashlet should navigate to next page if multiple pages exist or confirm single page

  Scenario: Verify My Calls dashlet navigates back to the previous page
    Then the "My Calls" dashlet should return to page 1 after navigating back if multiple pages exist or confirm single page

  Scenario: Verify View button on My Calls dashlet first page records
    When user clicks the view button on each record in "My Calls" dashlet
    Then user should see the My Calls record page for each record

  Scenario: Verify Edit button on My Calls dashlet first page records
    When user clicks the edit button on each record in "My Calls" dashlet
    Then user should see the My Calls edit page for each record
