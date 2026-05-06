Feature: Login

  Background:
    Given user is on the login page

  Scenario: Valid credentials - user logs in successfully
    When user logs in with valid credentials
    Then user should be redirected to the home page

  Scenario: Invalid username and password - shows error alert
    When user logs in with username "wronguser" and password "wrongpass"
    Then user should see credentials error

  Scenario: Wrong username only - shows error alert
    When user logs in with wrong username and valid password
    Then user should see credentials error

  Scenario: Wrong password only - shows error alert
    When user logs in with valid username and wrong password
    Then user should see credentials error

  Scenario: Both fields empty - shows validation errors on both fields
    When user submits the login form with empty fields
    Then user should see validation errors on both fields

  Scenario: Empty username - shows username validation error
    When user logs in with empty username and valid password
    Then user should see username validation error

  Scenario: Empty password - shows password validation error
    When user logs in with valid username and empty password
    Then user should see password validation error
