import { expect } from '@playwright/test';
import { navigateTo } from '../support/helpers';

export class LeadsPage{

    constructor(page)
    //page fixture as parameter
    {
          
        this.page = page;


        //*****Accessing Lead page from dorpdown*****
        this.leadDropdown = page.locator('a').filter({ hasText: /^Leads$/ });

        //*****Validating the page *****
        this.leadDropdownconfirm  = page.getByText('LEADS', { exact: true });

         //*****Accessing +CreateLeads page from dorpdown*****
        this.homeleadstitle = page.locator('a').nth(1); //after accessing Leads page Lead page locator has changed
        this.createLeadsDropdown = page.getByRole('link', { name: 'Create Lead', exact: true });
      //  this.createLeadstitleDropdown = page.locator('a').filter({ hasText: /^Create Lead$/ });
              //the above is not working, add any one of this
         // this.createLeadstitleDropdown = page.locator('a[href*="leads/edit"]');
      //   this.createLeadstitleDropdown = page.locator('span').filter({ hasText: 'Create Lead' });

         // await page.getByRole('textbox', { name: 'Username' }).click();
         // this.createLeadtitleButton = page.locator('a[href*="leads/edit"]');

       
         //*****Validating the page *****
        this.createleadsDropdownconfirm  = page.getByText('Create', { exact: true });



         //Form BackToTop option 

        this.BackToTopButton = page.locator('a').filter({ hasText: 'Back To Top Arrow Up' });

        //Save the file (Save Button)

        this.CreateLeadSaveButton = page.getByRole('button', { name: 'Save' });
        //Save without fill the form
      //   this.SaveError = page.getByText('There are validation errors,'); //not working
      //   this.SaveError = page.locator('scrm-message-ui .message-container'); //not working
         this.CRSaveError = page.locator('.invalid-feedback:visible');

        //Cancel the file without saving

        this.CreateLeadCancelButton = page.getByRole('button', { name: 'Cancel' });      


      //Option1: CreateLead Form Locators

           
    //*****Basic details*****
        // this.List_salutationpage = page.locator('select')
        
        this.salutationDropdown = page.locator('scrm-dropdownenum-edit select').first();
        this.leadFirstname = page.locator('.dynamic-field-name-first_name input');
        this.leadLastname = page.locator('.dynamic-field-name-last_name input');
        this.leadJobTitle = page.locator('.dynamic-field-name-title input');
        this.leadDepartment = page.locator('.dynamic-field-name-department input');
        this.leadAccountname = page.locator('.dynamic-field-name-account_name input');
        
        //*****Primary Address*****
        //*****Primary Address*****
        this.leadstreet = page.locator('.dynamic-field-name-primary_address_street textarea');
        this.leadPostalcode = page.locator('.dynamic-field-name-primary_address_postalcode input');
        this.leadCity = page.locator('.dynamic-field-name-primary_address_city input');
        this.leadState = page.locator('.dynamic-field-name-primary_address_state input');
        this.leadCountry = page.locator('.dynamic-field-name-primary_address_country input');

        //*****Email Address details*****
        this.leadEmailHeader = page.getByText('EMAIL ADDRESS', { exact: true }); 
        this.leadEmail = page.locator('.dynamic-field-name-email_address input[type="email"]').first();
        this.leadEmailcheckbox = page.locator('.dynamic-field-name-email_address .checkmark').first();

        //adding additional EmailAddress text boxes and check boxes by clicking on + symbol

        // this.EmailAddButton = page.locator('.line-item-buttons > scrm-button > .btn');
        // this.EmailSecondText =  page.locator('div:nth-child(2) > .flex-grow-1.line-item-entry-composite > .composite > .dynamic-field.dynamic-field-mode-edit.dynamic-field-name-email-fields > div > scrm-composite-field > .align-items-start > div > .field-group-field > .dynamic-field > .d-flex > .flex-grow-1 > .form-control');
        // this.EmailSecondCheckbox = page.locator('div:nth-child(2) > .flex-grow-1.line-item-entry-composite > .composite > .dynamic-field.dynamic-field-mode-edit.dynamic-field-name-email-fields > div > scrm-composite-field > .align-items-start > div:nth-child(3) > .field-group-field > .dynamic-field > .d-flex > .flex-grow-1 > .pb-4 > .checkbox-container > .checkmark');
        // this.EmailDescriptionText = page.locator('textarea').nth(2);

        //Assigned to Combo Box, search and select name

        this.leadAssignedTo = page.getByRole('combobox', { name: 'Select an item' });
        this.leadAssignedToClear = page.locator('.p-dropdown-clear-icon');
        this.leadAssignedTodropdown =  page.getByRole('button', { name: 'dropdown trigger' });
        this.leadAssignedToDorpdownClear = page.locator('.p-dropdown-clear-icon > path');
        this.leadAssignedToDorpdownButton = page.getByRole('button', { name: 'dropdown trigger' });
        this.leadAssignedToComboSearch = page.locator('#pn_id_1').getByRole('textbox');
        this.leadAssignedToComboOption = page.getByRole('option', { name: 'Will Westin' });

       //Contact - Mobile,Phone and website

         this.leadMobile = page.locator('.dynamic-field-name-phone_mobile input');
         this.leadOfficePhone = page.locator('.dynamic-field-name-phone_work input');
         this.leadWebsite = page.locator('.dynamic-field-name-website input');

       //Other Address
         this.leadAltAddressLabel = page.getByText('OTHER ADDRESS');
         this.leadAltStreet = page.locator('.dynamic-field-name-alt_address_street textarea');
         this.leadAltPostcode = page.locator('.dynamic-field-name-alt_address_postalcode input');
         this.leadAltCity = page.locator('.dynamic-field-name-alt_address_city input');
         this.leadAltState = page.locator('.dynamic-field-name-alt_address_state input');
         this.leadAltCountry = page.locator('.dynamic-field-name-alt_address_country input');  
           
   //*****View on "View Leads page*****

       //View Leads page Navigations and Locators
       //*****Accessing View Leads page from dorpdown*****
        this.leadView = page.getByRole('link', { name: 'View Leads' });   

   //*****View on "Overview" tab from after save the CretaLead form*****

        //Header firstname + lastname

        this.leadFullNameHeader = page.locator('scrm-dynamic-label span.dynamic-label');

        // Overview tab 
        this.leadOverviewTab = page.getByRole('tab', { name: 'OVERVIEW' });
        this.leadNameLabel = page.locator('strong').filter({ hasText: /^NAME$/ });

   
       
       //*****Import Leads page Navigation from dorpdown*****
        this.leadImportleads = page.getByRole('link', { name: 'Import Leads' });     
        this.leadImportHeader = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File' });
        
        
       //*****Download Import Leads Template*****
        this.leadDownloadTemplate = page.locator('iframe').contentFrame().getByRole('link', { name: 'Download Import File Template' });

       //*****Upload downloaded template*****
       this.leadSelectfile = page.locator('iframe').contentFrame().getByRole('button', { name: 'Select file:' }); //to import click on "choose" button to upload
       this.leadNewimport = page.locator('iframe').contentFrame().locator('#import_create');
       this.leadBothimport = page.locator('iframe').contentFrame().locator('#import_update');
       this.leadEmptynextDialogue = null;
       this.leadImportnext = page.locator('iframe').contentFrame().getByRole('button', { name: 'Next >' }); // trying to use the same for 3 times when importing the file


               
      }

    async OpenLeadsDropdown()
    {
       await this.leadDropdown.click();
    }

     async verifyLeadsTextVisible() 
     {
        await expect(this.leadDropdownconfirm).toBeVisible();
     }

      //Method calling - Navigation to CreateLeads page

      async NavigateCreateLeads()
      {
         // await this.createLeadstitleDropdown.waitFor({ state: 'visible' });         
         // await this.createLeadstitleDropdown.click(); --> this is not working         
         // await this.titleDropdownCreateconfirm.click();
         // await this.waitForLoadState('networkidle');
         // await this.titleDropdown.hover();
         // await this.createLeadstitleDropdown.waitFor({ state: 'visible' });
         await this.homeleadstitle.hover();
         await this.createLeadsDropdown.click();
         await this.page.waitForLoadState('networkidle');

         //after clik on CreateLeads from dropdown move cursor away from dropdown
         await this.page.mouse.move(0, 0);
         
      }   

      async verifycreateTextVisible()
      {
         await expect(this.page).toHaveURL(/leads\/edit/);
         await expect(this.createleadsDropdownconfirm).toBeVisible();
      }
     
      async SavePasitive()
      {
         await this.CreateLeadSaveButton.click();
         //wait for URL to change from /edit to /record (saved record page)
         await this.page.waitForURL(/leads\/record/, { timeout: 15000 });
         await this.page.waitForLoadState('networkidle', { timeout: 15000 });
      }

      async SaveNegative() //verify the error message is visible
      {
         await this.CreateLeadSaveButton.click();
         await expect(this.CRSaveError).toBeVisible();
      }

      async getNegativeErrorText() 
      {
         return (await this.CRSaveError.textContent()).trim();
      }

      
      async Cancel()
      {
         await this.CreateLeadCancelButton.click();
      }

       async Bactotop()
      {
         await this.BackToTopButton.click();

      }


   //*****Create Lead Form Methods*****
    async fillbasic(data) 
    {
                
        await this.salutationDropdown.selectOption(data.title);
        await this.leadFirstname.fill(data.firstName);
        await this.leadLastname.fill(data.lastName);
        await this.leadJobTitle.fill(data.jobTitle);
        await this.leadDepartment.fill(data.department);
        await this.leadAccountname.fill(data.accountName);
    }
    
    async contact(data)
    {

        await this.leadMobile.fill(data.mobile);
        await this.leadOfficePhone.fill(data.officePhone);
        await this.leadWebsite.fill(data.website);


    }

    async primaryaddress(data)
    {
        await this.leadstreet.fill(data.primaryStreet);
        await this.leadPostalcode.fill(data.primaryPostalCode);
        await this.leadCity.fill(data.primaryCity);
        await this.leadState.fill(data.primaryState);
        await this.leadCountry.fill(data.primaryCountry);
        
    }

    async altaddress(data)
    {
        //await this.leadAltAddressLabel.hover();
	     await this.leadAltStreet.fill(data.altStreet);
        await this.leadAltPostcode.fill(data.altPostalCode);
        await this.leadAltCity.fill(data.altCity);
        await this.leadAltState.fill(data.altState);
        await this.leadAltCountry.fill(data.altCountry);
    }

    //call method to fill the form
    async fillForm(data) 
    {
        await this.fillbasic(data);
        await this.contact(data);
        await this.primaryaddress(data);
        await this.altaddress(data);
    }        

      //First Then
    async SaveConfirmText(LeadData)
    {
      //   await expect(this.page.locator('scrm-dynamic-label', { hasText: firstName } )).toBeVisible();

      //   const enteredName = await this.leadFirstname.inputValue();
      //   await expect(this.page.locator('scrm-dynamic-label').getByText(enteredName)).toBeVisible();
      //  console.log('leadData:', leadData);
       console.log('firstName:', LeadData.firstName);
       console.log('lastName:', LeadData.lastName);

       //wait for header to appear before asserting
       await expect(this.leadFullNameHeader).toBeVisible({ timeout: 10000 });

       await expect(this.leadFullNameHeader).toContainText(LeadData.firstName);
       await expect(this.leadFullNameHeader).toContainText(LeadData.lastName);

    }

    //Second Then
    async Overviewtabname(firstName, lastName)
    {
      //Step 1: Verify Overview Tab is visible
      await this.leadOverviewTab.click();
      await expect(this.leadOverviewTab).toBeVisible();

    // Step 2: Verify NAME label is visible on Overview tab 
      await expect(this.leadNameLabel).toBeVisible();

    // Step 3: Verify header contains firstName + lastName combined
    const expectedFullName = `${firstName} ${lastName}`;
    //const expectedFullName = firstname + ' ' + lastname;
    await expect(this.leadFullNameHeader).toContainText(expectedFullName);   

    }

    //Method for View Leads page
    async NavigateViewLeads()
      {
         await this.homeleadstitle.hover();
         await Promise.all([
         
         this.page.waitForLoadState('networkidle', { timeout: 15000 }),
         this.leadView.click()]);

         //after clik on CreateLeads from dropdown move cursor away from dropdown
         await this.page.mouse.move(0, 0);
      } 

   //Method for navigate Import Leads page
   async NavigateImportLeads()
      {
         await this.homeleadstitle.hover();
         // await this.page.pause();
         await Promise.all([
         
         this.page.waitForLoadState('networkidle', { timeout: 15000 }),         
         this.leadImportleads.click()]);

         //after clik on CreateLeads from dropdown move cursor away from dropdown
         await this.page.mouse.move(0, 0);
      }

   async ImportLeadsconfirm()
   {

         await expect(this.leadImportHeader).toBeVisible();
   } 

   async DownloadImporttemplate()
   {

      await Promise.all([
         this.page.waitForLoadState('networkidle', { timeout: 30000}), 
         this.leadDownloadTemplate.click()]);
         
   }

   
  async UploadCSVfile(importMode) {
  
      
           await this.leadSelectfile.setInputFiles('./data/Leads.csv');
      
  
      // Select import mode radio button 
      if (importMode === 'new') {
  
        // "Create new records only"
        await this.leadNewimport.check();
        await expect(this.leadNewimport).toBeChecked();
  
      } else if (importMode === 'update') {
  
        // "Create new records and update existing records"
        await this.leadBothimport.check();
        await expect(this.leadBothimport).toBeChecked();
  
      }
      
      //using the same locators for step2 , 3 and 4
      
      await this.leadImportnext.click();
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  
      
      await this.leadImportnext.click();
      await this.page.waitForLoadState('networkidle', { timeout: 20000 });
  
      
      await this.leadImportnext.click();
      await this.page.waitForLoadState('networkidle', { timeout: 40000 });
    }

   async Importsuccessvalidation() 
   {
      //once uploaded the file, the page is not indicating that success state or moving to Leads page. Its moving to 
      //      'https://suite8demo.suiteondemand.com/#/import/step1?import_module=Leads&return_module=Leads&return_action=index'
      //So validating the URL page after import the file

      const url = this.page.url();

      expect(url).toContain('/#/import/step1');
      expect(url).toContain('import_module=Leads');
}

}




        