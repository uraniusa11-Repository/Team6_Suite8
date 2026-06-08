import { expect } from '@playwright/test';

export class AccountsPage {
  constructor(page) {
    this.page = page;
    
    this.accountsMenu = page.locator('a.top-nav-link').filter({ hasText: 'Accounts' });

    this.accountDropdownOptions = page.locator('a.sub-nav-link:visible');

    this.createAccountButton = page.getByRole('link', {name: 'Create Account',exact: true});

    this.viewAccountsButton = page.getByRole('link', {name: 'View Accounts',exact: true});

    this.importAccountsButton = page.getByRole('link', {name: 'Import Accounts',exact: true});

    this.createPageHeading = page.locator('scrm-dynamic-label span').first();

    this.accountsPageHeading = page.getByText('ACCOUNTS',{ exact: true });

    this.importPageHeading = page.locator('iframe').contentFrame().getByRole('heading', {name: 'Step 1: Upload Import File'});

    
    this.nameTextbox = page.locator('scrm-field-layout .dynamic-field-name-name input').first();

    this.officePhoneTextbox = page.locator('.dynamic-field-name-phone_office input');

    this.websiteTextbox = page.locator('.dynamic-field-name-website input');


    this.emailTextbox =  page.locator('scrm-varchar-edit input').nth(1);

    this.billingAddressTextbox = page.locator('textarea').first();

    this.cityTextbox = page.locator('.dynamic-field-name-billing_address_city input');

    this.stateTextbox = page.locator('.dynamic-field-name-billing_address_state input');

    this.saveButton = page.getByRole('button', {name: 'Save'});

    this.cancelButton = page.getByRole('button', {name: 'Cancel'});

    this.popupMessage = page.locator('div.modal-body span.dynamic-label');

    this.okButton = page.getByRole('button', {name: 'Ok'});
  }

  
  async clickAccountsMenu() {
    await this.accountsMenu.click();
  }

  async hoverAccountsMenu() {
    await this.accountsMenu.hover();
  }

  async getDropdownOptionsText() {
    const options =
      await this.accountDropdownOptions.allTextContents();

    const cleanedOptions = options.map(option =>
      option.replace(/\s+/g, ' ').trim()
    );

    console.log('Accounts Dropdown Options:');
    console.log(cleanedOptions);

    return cleanedOptions;
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async clickViewAccounts() {
    await this.viewAccountsButton.click();
  }

  async clickImportAccounts() {
    await this.importAccountsButton.click();
  }

  async verifyCreateAccountPage() {
    await this.page.waitForLoadState('networkidle');

    await expect(this.createPageHeading)
      .toContainText('Create');

    const text =
      await this.createPageHeading.textContent();

    console.log('Page Heading:', text);
  }

  async verifyAccountsPage() {
    await expect(this.accountsPageHeading)
      .toBeVisible();

    const text =
      await this.accountsPageHeading.textContent();

    console.log('Accounts Page:', text);
  }

  async verifyImportAccountsPage() {
    await this.page.waitForLoadState('networkidle');

    await expect(this.importPageHeading)
      .toContainText('Step 1: Upload Import File');

    const text =
      await this.importPageHeading.textContent();

    console.log('Import Page Heading:', text);
  }

  
  async fillAccountDetails(data) {
    
    await this.nameTextbox.fill(data.accountName);
    await this.officePhoneTextbox.fill(data.officePhone);
    await this.websiteTextbox.fill(data.website);
    await this.emailTextbox.waitFor({ state: 'visible' });
    await this.emailTextbox.fill(data.email);
    await this.billingAddressTextbox.fill(data.address);
    await this.cityTextbox.fill(data.city);
    await this.stateTextbox.fill(data.state);
  }

  async clickSaveButton() {
    await this.saveButton.scrollIntoViewIfNeeded();

    await this.saveButton.click();

    await this.page.waitForURL(/accounts\/record/,{ timeout: 30000 });
  }

  async verifySaveNavigation(accountName) {
    const savedAccount = this.page.locator('.record-view-name span.dynamic-label').last();

    await expect(savedAccount).toBeVisible({ timeout: 20000 });

    const text =
    await savedAccount.textContent();

    console.log('Saved Account:', text);

    expect(text).toContain(accountName);
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async verifyPopupDisplayed() {
    await expect(this.popupMessage).toBeVisible();

    const text =
      await this.popupMessage.textContent();

    console.log('Popup Message:', text);

    expect(text).toContain('You are about to leave this record');
  }

  async clickOkButton() {
    await this.okButton.click();
  }

  async verifyCancelNavigation() {
    await expect(this.accountsPageHeading).toBeVisible();

    const text =
      await this.accountsPageHeading.textContent();

    console.log('Navigation Text:', text);
  }
}
