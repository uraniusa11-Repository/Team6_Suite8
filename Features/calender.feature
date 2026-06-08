Feature: Calendar Module
Background:
    Given user is on Home page

Scenario: Verify user can navigate to Schedule Meeting page
  
  When user hovers over Calendar menu and clicks Schedule Meeting
  Then Meeting Create page should be displayed

Scenario Outline: Verify user can create a meeting successfully
  Given user is on Schedule Meeting page
  When user enters meeting details using "meeting1" and clicks Save button
  Then created meeting subject should be displayed correctly
  
  Examples:
    | testData |
    | meeting1 |

Scenario: Verify user can navigate to Schedule Call page
    
    When user hovers over Calendar menu and clicks Schedule Call
    Then Call Create page should be displayed

Scenario Outline: Verify user can create a Call successfully
    Given user is on Schedule Call page
    When user enters call details using "<testData>" and clicks Save
    Then created call subject should be displayed correctly

Examples:
    | testData |
    | call1 |

Scenario: Verify user can navigate to Create Task page
    
    When user hovers over Calendar menu and clicks Create Task
    Then Task Create page should be displayed

Scenario Outline: Verify user can create a Task successfully
    Given user is on Create Task page
    When user enters task details using "<testData>" and clicks Save
    Then created task subject should be displayed correctly

Examples:
    | testData |
    | task1 |

Scenario: Verify user can navigate to Calendar Day View using Today link
  
    When user hovers over Calendar menu and clicks Today
    Then Calendar Day View page should be displayed