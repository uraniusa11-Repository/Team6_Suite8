import { expect } from '@playwright/test';
export class ContactsPage {

  constructor(page) {

    this.page = page;

    this.contactsMenu =page.locator('a.top-nav-link').filter({ hasText: 'Contacts' });
    this.contactDropdownOptions =page.locator('a.sub-nav-link:visible');
    this.createContactButton = page.getByRole('link', { name: 'Create Contact', exact: true });
     this.createPageHeading = page.locator('scrm-dynamic-label span').first();
   this.createContactVc = page.getByRole('link', { name: 'Create Contact From vC...' });
   this.createVcPageHeading = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Import vCard' });
   this.viewContacts = page.getByRole('link', { name: 'View Contacts' });
   this.viewContactPageHeading = page.getByText('CONTACTS', { exact: true });
   this.importContact = page.getByRole('link', { name: 'Import Contacts' });
   this.importContactaPageHeading = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File' });
   this.saveButton =page.getByRole('button', { name: 'Save' });
   this.saveClickPageNavigation = page.locator('scrm-dynamic-label span.dynamic-label');
   this.cancelButton = page.getByRole('button', { name: 'Cancel' });
   this.popupMessage = page.locator('div.modal-body span.dynamic-label');
   this.okButton = page.getByRole('button', { name: 'Ok' });
   this.cancelClickPageNavigation = page.getByText('CONTACTS', { exact: true });
   

    // Form Locators
    this.salutationDropdown = page.locator('select').first();
    this.firstNameTextbox = page.locator('.dynamic-field-name-first_name input');
    this.lastNameTextbox = page.locator('.dynamic-field-name-last_name input');
    this.officePhoneTextbox = page.locator('.dynamic-field-name-phone_work input');
   this.mobileTextbox = page.locator('.dynamic-field-name-phone_mobile input');
   this.jobTitleTextbox = page.locator('.dynamic-field-name-title input');
    this.departmentTextbox =  page.locator('.dynamic-field-name-department input');
      this.accountNameTextbox = page.locator('.related-item-label');
    this.accountDropdownArrow = page.locator('.dynamic-field-name-account_name .p-dropdown-trigger');
    this.accountSearchTextbox = page.locator('input.p-dropdown-filter');
    this.accountOptions = page.locator('.p-dropdown-item');
    this.emailTextbox = page.getByRole('textbox').nth(7);
    this.primaryAddressTextbox = page.locator('textarea').first();
    this.lastNameValidationMessage = page.locator('.invalid-feedback span.dynamic-label');
    this.validationBanner = page.getByText('There are validation errors');

    // Save Button
   this.saveButton = page.getByRole('button', {name: 'Save'});

      //option 2 : createcontactfromVCF
      this.createContactFromVCFOption = page.getByRole('link', {name: 'Create Contact From vC...'});
      this.frame = page.locator('iframe').contentFrame();
      this.chooseFileButton = this.frame.getByRole('button',{ name: 'Choose File' });
      this.importVcardButton = this.frame.getByRole('button',{ name: 'Import vCard' });
       this.importedContactName = page.locator('scrm-dynamic-label');
   

//Import Contacts

      this.importContactsOption = page.getByRole('link', { name: 'Import Contacts' });
      this.selectFileButton = this.frame.getByRole('button', {name: 'Select file:'});
      this.nextButton = this.frame.getByRole('button', {name: 'Next >'});
      this.firstNameDropdown = this.frame.locator('select[name="colnum_0"]');
      this.lastNameDropdown = this.frame.locator('select[name="colnum_1"]');
      this.importSettingsTextbox = this.frame.getByRole('textbox', {name: 'To save the import settings,'});
      this.importNowButton = this.frame.getByRole('button', {name: 'Import Now'});
      this.importResultsHeading = this.frame.getByRole('heading', {name: 'Step 5: View Import Results'});
 // View Contacts
      this.viewContactsLink = page.getByRole('link', {name: 'View Contacts'});
 // Contacts heading
      this.contactsHeading = page.getByText('CONTACTS', {exact: true});

  }
  //import contacts submodule methods
  //import
    async clickImportContacts() {

       await this.hoverContactsMenu();
       await this.importContactsOption.click();
    }
    async uploadImportFile() {

       await this.selectFileButton.setInputFiles('data/contact.vcf');
       await this.nextButton.click();
    }
    async confirmFileProperties() {

        await this.page.waitForLoadState('networkidle');
        await this.nextButton.click();
    }
    async mapImportFields() {

    await expect(this.firstNameDropdown).toBeVisible({ timeout: 30000 });
    await this.firstNameDropdown.selectOption('first_name');
    await this.lastNameDropdown.selectOption('last_name');
    await this.nextButton.click();
  }
  async importContacts() {

    await this.importSettingsTextbox.fill('anusha');
    await this.importNowButton.click();
  }
  async verifyImportResults() {

   await expect(
    this.importResultsHeading
).toBeVisible({ timeout: 30000 });
}


async clickCreateContactFromVcard() {
    

    await this.hoverContactsMenu();

     await this.createContactFromVCFOption.waitFor({state: 'visible'});

    await this.createContactFromVCFOption.click();

    await this.page.waitForURL(/importvcard/,{ timeout: 30000 });

    console.log(await this.page.url());
}

async verifyImportVcardPage() {

    await this.page.waitForLoadState('networkidle');
      await expect(this.createVcPageHeading).toContainText('Import vCard');

        const text = await this.createVcPageHeading.textContent();

        console.log("Page Heading:", text);
    
   
}

async uploadVcardFileMethod() {
 

    await this.chooseFileButton.setInputFiles('data/contact.vcf');
     await this.importVcardButton.click();

  
}
async verifyImportedContact() {
  await this.page.waitForLoadState('networkidle');
  
    await expect(this.importedContactName).toBeVisible({timeout: 120000});
   const importedName = (await this.importedContactName.textContent())?.trim();

    console.log('Imported Contact:',importedName);

    expect(importedName.length).toBeGreaterThan(0);
}
  // Navigation Methods
  async clickContactsMenu() {
    
    await this.contactsMenu.click();

  }
  async clickContactFromVCF(){
    await this.createContactFromVCF.click();
  }

  
   async getDropdownOptionsText() {

    const options = await this.contactDropdownOptions.allTextContents();
        const cleanedOptions =
        options.map(option =>
            option.replace(/\s+/g, ' ').trim()
        );

    console.log('Contacts Dropdown Options:');

    cleanedOptions.forEach(option => {
    
    });
     return cleanedOptions;
  }

  async clickCreateContact() {

    await this.createContactButton.click();

  }

  async verifyCreateContactPage() {
    await this.page.waitForLoadState('networkidle');
      await expect(this.createPageHeading).toContainText('Create');
      const text = await this.createPageHeading.textContent();
        console.log("Page Heading:", text);
    }

 async hoverContactsMenu() {

        await this.contactsMenu.hover();
    }


   async clickSaveButton() {
   
 
      const errors = await this.page.locator('.invalid-feedback').allTextContents();
      console.log(errors);
      await this.saveButton.scrollIntoViewIfNeeded();
       await this.saveButton.click();
      await this.page.waitForURL(/contacts\/record/,{ timeout: 30000 });
   
    }

    async verifySaveNavigation(firstName,lastName) {

      const savedContact = this.page.locator('.record-view-name span.dynamic-label').last();
          await expect(savedContact).toBeVisible({ timeout: 20000 });
      const text = await savedContact.textContent();
        console.log("Saved Contact:", text);
        expect(text).toContain(firstName);
        expect(text).toContain(lastName);

     }
  async clickCancelButton() {

        await this.cancelButton.click();
    }
async verifyPopupDisplayed() {

    await expect(this.popupMessage).toBeVisible();
    const text = await this.popupMessage.textContent();
    console.log("Popup Message:",text);
    expect(text).toContain('You are about to leave this record');
}


    async clickOkButton() {

        await this.okButton.click();
    }



    async verifyCancelNavigation() {

        await expect(this.cancelClickPageNavigation).toBeVisible();
         const text = await this.cancelClickPageNavigation.textContent();
        console.log("Navigation Text:", text);
    }


  

 // Fill Contact Details
 async fillContactDetails(data) {

    
    // Store Expected Name

    this.expectedContactName =`${data.firstName} ${data.lastName}`;

    // Fill Form
    

    await this.salutationDropdown
      .selectOption(data.salutation);

    await this.firstNameTextbox
      .fill(data.firstName);

    await this.lastNameTextbox
      .fill(data.lastName);

    await this.officePhoneTextbox
      .fill(data.officePhone);

      await this.mobileTextbox
        .fill(data.mobile);

     await this.jobTitleTextbox
       .fill(data.jobTitle);

     await this.departmentTextbox
       .fill(data.department);
//account

await this.accountDropdownArrow.click();
console.log("Dropdown panel count:",
    await this.page.locator('.p-dropdown-panel').count()
);
await expect(this.page.locator('input.p-dropdown-filter')).toBeVisible({ timeout: 10000 });

await this.page.locator('input.p-dropdown-filter').fill(data.accountName);

await expect(this.page.locator('li[role="option"]').first()).toBeVisible({ timeout: 60000 });

await this.page.locator('li[role="option"]').first().click();


  }

  async enterContactWithoutLastName(data) {

     await this.firstNameTextbox.fill(data.firstName);
    await this.lastNameTextbox.fill(data.lastName);
    await this.officePhoneTextbox.fill(data.officePhone);
         await this.saveButton.click();
   
}

async verifyLastNameValidationMessage() {

    await expect(this.lastNameValidationMessage).toBeVisible();
    const message = await this.lastNameValidationMessage.textContent();
    console.log('Validation Message:', message);
    expect(message.trim()).toBe('Missing required field: Last Name');
}

async navigateToViewContacts() {

    await this.contactsMenu.hover();
    await this.viewContactsLink.click();
}

async verifyContactsPage() {

    await expect(this.contactsHeading).toBeVisible();
    const text = await this.contactsHeading.textContent();
    console.log('Contacts Heading:',text);
}
  


}
