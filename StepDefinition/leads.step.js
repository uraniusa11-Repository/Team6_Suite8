import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage';
import { LeadsPage } from '../Pages/LeadsPage';
import { appConfig } from '../config/environment.config.js';
import { HomePage } from '../Pages/HomePage.js';
import { assertVisible, hover, click, navigateTo } from '../support/helpers.js';
import LeadData from '../data/LeadData.json' assert { type: 'json' };

const {Before, Given, When, Then} = createBdd();
let loginpage;
let leadspage;
    
Before(async ({ page }) => {

    // loginpage = new LoginPage(page);

    await navigateTo(page, 'home');
    leadspage = new LeadsPage(page);

    // await loginpage.userlogin(appConfig.username, appConfig.password);
     
});

 
  
//Scenario 1: Navigate to Leads page
When('user click on Leads', async ({page}) => {

    // loginpage = new LoginPage(page);

    // leadspage = new LeadsPage(page);

    // await loginpage.userlogin(appConfig.username, appConfig.password);
    await leadspage.OpenLeadsDropdown();
});

     

Then('user should be able to navigate to Leads page', async ({}) => {

    await leadspage.verifyLeadsTextVisible();
});

//Scenario 2: User Navigate to CreateLeads

When('user clicks on CreateLeads', async ({page}) => {
  await leadspage.OpenLeadsDropdown(); 
  await leadspage.NavigateCreateLeads();
});

Then('user should view on createLeads form', async ({}) => {
  // await expect(page).toHaveURL(/leads\/edit/);
  // await expect(leadspage.titleDropdownCreateconfirm).toBeVisible();
  await leadspage.verifycreateTextVisible();
    
});


//Scenario 3: User Save the form without form details -> Negative Use case

When('user clicked on Save wihout filled the form', async ({page}) => {
  // Step: When user clicked on Save wihout filled the form
  // From: Features\createleads.feature:18:5
  await leadspage.OpenLeadsDropdown(); 
  await leadspage.NavigateCreateLeads();
  await leadspage.verifycreateTextVisible();
  await leadspage.SaveNegative();
  
});

Then('Error should be thrown', async ({}) => {
  // Step: Then Error should be thrown
  // From: Features\createleads.feature:19:5

  await leadspage.SaveNegative();

  // print captured message
  const errorText = await leadspage.getNegativeErrorText();
  console.log(errorText);  
  await expect(errorText).toContain('Missing required field');
    
});


//Scenario 4: Create lead form with multiple users -> Pasitive case
When('user fills and save the form sequentially using JSON data, one record at a time', async ({page}) => {
  await leadspage.OpenLeadsDropdown(); 
  await leadspage.NavigateCreateLeads();
  await leadspage.verifycreateTextVisible();
    
  
 for (let i = 0; i < LeadData.length; i++) // i is defined HERE
  {   
    

    const data = LeadData[i]; 
    
    await leadspage.fillForm(data);   
    // single object
    await leadspage.Bactotop();
    await leadspage.SavePasitive();      // save after each record
    
    await leadspage.SaveConfirmText(data); // Validate saved record using firstName from JSON

     //only navigate to new form if there are more records to fill
    if (i < LeadData.length - 1) 
      {
        await leadspage.NavigateCreateLeads();  // Go to form for next record
      }

       
    }


  });

  Then('the lead record should display correct name on Overview tab', async function () {
    const lastRecord = LeadData[LeadData.length - 1]; // last saved record
    
    await leadspage.SaveConfirmText(lastRecord);
        
  });

  Then('Overview tab has user Fullname', async ({}) => {
    const lastRecord = LeadData[LeadData.length - 1]; // last saved record
    
    await leadspage.Overviewtabname(lastRecord.firstName, lastRecord.lastName);
    
});



//Scenario 5: User clicks on BaktoTop button
When('user clicked on BacktoTop Button', async ({page}) => {
  // Step: When user clicked on BacktoTop Button
  // From: Features\createleads.feature:40:5
  await leadspage.OpenLeadsDropdown(); 
  await leadspage.NavigateCreateLeads();
  await expect(page).toHaveURL(/leads\/edit/);
  await expect(leadspage.createleadsDropdownconfirm).toBeVisible();
  await leadspage.Bactotop();
});

Then('Page should moved to top', async ({}) => {
  // Step: Then Page should moved to top
  // From: Features\createleads.feature:41:5
  await expect(leadspage.CreateLeadSaveButton).toBeVisible();
});

//Scenario 6: User Cancel the form

When('user clicked on Cancel', async ({page}) => {
  // Step: When user clicked on Cancel
  // From: Features\createleads.feature:40:5

      await leadspage.OpenLeadsDropdown(); 
      await leadspage.NavigateCreateLeads();
      await leadspage.Cancel();
      
});

Then('CreateLeads form should be calnceled and moved to Leads page', async ({}) => {
  // Step: Then CreateLeads form should be calnceled and values should not saved
  // From: Features\createleads.feature:41:5
  //page should moved to Leads page

  await leadspage.verifyLeadsTextVisible();
});

//Scenario 7: User clicked on View Leads from Dropdown and view the form

When('user clicked on View Leads', async ({}) => {
  
  await leadspage.OpenLeadsDropdown();
  await leadspage.NavigateViewLeads();

});

Then('view leads pages should be displayed with details', async ({}) => {
  await leadspage.verifyLeadsTextVisible();
  
});


//Scenario 9: View Import Leads page

When('user clicked on Import Leads from Leads Dropdown', async ({}) => {
  await leadspage.OpenLeadsDropdown();
  await leadspage.NavigateImportLeads();

});

Then('Import Leads pages should be displayed with details', async ({}) => {
  await leadspage.ImportLeadsconfirm();
});


// Scenario 10: Download import file template and upload a valid CSV file from data folder

When('the user downloads the import file template and Create new records only', async ({}) => {
  await leadspage.OpenLeadsDropdown();
  await leadspage.NavigateImportLeads();
  // await leadspage.ImportLeadsconfirm();
  await leadspage.DownloadImporttexmplate();
  await leadspage.UploadCSVfile('new');
  
});

Then('the CSV file should be uploaded successfully with New data', async ({}) => {
  
  await leadspage.Importsuccessvalidation();
});


When('the user downloads the import file template and Create new records and update existing records', async ({}) => {
  await leadspage.OpenLeadsDropdown();
  await leadspage.NavigateImportLeads();
  // await leadspage.ImportLeadsconfirm();
  await leadspage.DownloadImporttexmplate();
  await leadspage.UploadCSVfile('update');
});

Then('the CSV file should be uploaded successfully', async ({}) => {
  await leadspage.Importsuccessvalidation();

});


