Feature: Contacts Module

  Background:
    Given user is on contact home page

  Scenario: Verify contacts dropdown options
    When user clicks on contacts menu
    Then user should see below options in contacts dropdown

      | Create Contact            |
      | Create Contact From vC...    |
      | View Contacts             |
      | Import Contacts           |

   Scenario: Verify Create Contact navigation
    When user clicks Create Contact from contacts dropdown
    Then user should be navigated to corresponding page
     
   Scenario Outline: Save contact successfully
   Given user is on create contact page
    When user fills contact details using "<testData>" and user clicks save button
    Then user should be navigated to contact details page

    Examples:

      | testData |
      | contact1 |
      | contact2 |
  
Scenario Outline: Verify validation message when Last Name is left blank

  Given user is on create contact page
  When user enters contact details "<testData>" without Last Name
  Then missing required message should be displayed
    Examples:

       | testData |
       | contact3 |
       
  
   Scenario Outline: Verify cancel popup message
    Given user is on create contact page
    When  user fills contact details using "<testData>" and user clicks cancel button
    Then contact warning popup should be displayed
  Examples:

      | testData |
      | contact1 |
      | contact2 |

   Scenario Outline: Verify Ok button on cancel popup
  Given user is on create contact page
  When user fills contact details using "<testData>", clicks cancel button, and clicks Ok button on popup
  Then user should navigate away from create contact page

Examples:
  | testData |
  | contact1 |
  | contact2 |

   Scenario: Verify Create Contact from vCard navigation
    When user clicks Create Contact from vCard from contacts dropdown
    Then user should be navigated to corresponding vcard page

   Scenario: Import vCard
    Given user is on import vcard page
    When user uploads vcard file
    Then contact should be imported successfully

   Scenario: Verify Import contact page  
    Given user is on import contacts page
    When user imports contact file
    Then contacts should be imported successfully

  Scenario: Verify user can navigate to View Contacts page
    
    When user hovers over Contacts menu and clicks View Contacts
    Then Contacts page should be displayed