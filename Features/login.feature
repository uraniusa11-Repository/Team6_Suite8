Feature: Login

  Background:
    Given User is on the login page

  Scenario Outline: <Scenario>
    When User Logs in with "<Scenario>"
    Then Verify Expected  message for "<Scenario>"

    Examples:
    

    
      | Scenario                                                    |
      | Valid credentials - user logs in successfully               |
      | Invalid credentials - shows error alert                     |
      | Wrong username only - shows error alert                     |
      | Wrong password only - shows error alert                     |
      | Both fields empty - shows validation errors on both fields  |
      | Empty username - shows username validation error            |
      | Empty password - shows password validation error            |
      
      
