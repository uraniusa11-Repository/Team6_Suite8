Feature: Leads page Registration form


Scenario: User accessing Leads page
    
    When    user click on Leads
    Then    user should be able to navigate to Leads page

Scenario: User Navigate to CreateLeads
    When    user clicks on CreateLeads
    Then    user should view on createLeads form

# Negative case
Scenario: User Save the form without form details 
    When    user clicked on Save wihout filled the form
    Then    Error should be thrown

# Positive case
Scenario: Create lead form with multiple users
    When  user fills and save the form sequentially using JSON data, one record at a time
    Then  the lead record should display correct name on Overview tab
    Then  Overview tab has user Fullname
    
Scenario: User clicks on BaktoTop button
    When    user clicked on BacktoTop Button 
    Then    Page should moved to top


Scenario: User Cancel the form
    When    user clicked on Cancel 
    Then    CreateLeads form should be calnceled and moved to Leads page


Scenario: View Leads details 
    When    user clicked on View Leads 
    Then    view leads pages should be displayed with details


# Scenario: Verify Schedule Meeting from View Leads page
#     When    user select any resource and schedule meeting 
#     Then    meeting should be scheduled


Scenario: View Import Leads page
    When    user clicked on Import Leads from Leads Dropdown
    Then    Import Leads pages should be displayed with details


Scenario: Download import file template and upload a valid CSV file from data folder
    When the user downloads the import file template and Create new records only 
    Then the CSV file should be uploaded successfully with New data    
    When the user downloads the import file template and Create new records and update existing records 
    Then the CSV file should be uploaded successfully 





