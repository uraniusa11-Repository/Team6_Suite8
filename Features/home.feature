Feature: Home Page

  Background:
    Given user is logged in and on the home page

  Scenario: Verify all nav links  are visible in the navigation bar
    Then User should see the following menu items in the navigation bar
      | Menu Item     |
      | Accounts      |
      | Contacts      |
      | Opportunities |
      | Leads         |
      | Quotes        |
      | Calendar      |
      | Documents     |
      | More          |

  Scenario: Verify nav links and icons are highlighted on hover
    When User hovers over the following navigation elements and icons
      | Element         |
      | Accounts        |
      | Contacts        |
      | Opportunities   |
      | Leads           |
      | Quotes          |
      | Calendar        |
      | Documents       |
      | More            |
      | Quick Actions   |
      | Recently Viewed |
      | Profile         |
    
    Then each navigation element should be highlighted  


  Scenario: Verify navigation links show dropdown on hover
    When User hovers over the following navigation links
      | Menu Item     |
      | Accounts      |
      | Contacts      |
      | Opportunities |
      | Leads         |
      | Quotes        |
      | Calendar      |
      | Documents     |
      | More          |
    Then each navigation link should be highlighted and show a dropdown

   Scenario: Verify Quick Actions
    When User hovers over the Quick Actions icon
    Then Quick Actions drop down should be visible with below Actions
      | Action             |
      | Create Account     |
      | Create Contact     |
      | Create Opportunity |
      | Create Lead        |
      | Create Quote       |
      | Schedule Meeting   |
      | Schedule Call      |  

   Scenario: Verify User profile icon
     When user hovers over the User Profile icon
     Then the user profile dropdown should be visible with following <Options>
       | Options         |
       | Edit Profile    |
       | Employees       |
       | Community Forum |
       | About           |
       | Logout          |   

      

      
  Scenario: Verify Home Icon
    Given HomeIcon is visible.
    When User clicks on the home icon
    Then User should be redirected to the home Dashboard page

 

  Scenario: Verify Search field
    Given User can see the search field
    When User hovers over the Search field
    Then Search fieldd get highlighted

 

  Scenario: Verify Recently Viewed
    When User hovers over the Recently Viewed icon
    Then the recently viewed items should be displayed

  



  

