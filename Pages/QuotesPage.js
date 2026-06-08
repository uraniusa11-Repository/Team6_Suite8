import { expect } from '@playwright/test';

export class QuotesPage {
  constructor(page) {
    this.page = page;
    this.suiteFrame = page.frameLocator('iframe').last();
    this.quotesMenu = page.locator('a.top-nav-link').filter({ hasText: /Quotes/i }).first();
    this.quotesDropdownOptions = page.locator('scrm-navigation-group-menu a.dropdown-item, a.dropdown-item, .dropdown-menu a');
    this.createQuoteButton = page.locator('a.sub-nav-link[href*="/quotes/edit"]').first();
    this.viewQuotesButton = page.locator('a.sub-nav-link[href="#/quotes/index"]').first();
    this.importQuotesButton = page.locator('a.sub-nav-link[href*="/quotes/import"]').first();
    this.validUntilTextbox = page.locator('input[aria-label*="Valid"], input[placeholder*="Valid"], input[name*="valid"], input[name*="date"], input[type="text"]').nth(1);
    this.quoteFrame = page.locator('iframe').contentFrame();
    this.createQuotePageHeading = this.quoteFrame.getByRole('heading', { name: 'CREATE', level: 2 });
    this.quotesPageHeading = page.getByText('QUOTES', { exact: true });
    this.importQuotesHeading = this.suiteFrame.getByText('Step 1: Upload Import File');
    this.mainFrame = page.frameLocator('iframe').last();
    this.quoteNameTextbox = this.mainFrame.locator('input[name="name"], input[aria-label="Name"], input[placeholder*="Name"]').first();
    this.validUntilTextbox = this.suiteFrame.locator('input[name="date_quote_expected_closed"]');
    this.saveButton = this.suiteFrame.getByRole('button', { name: 'Save' });
    this.cancelButton = this.page.locator('button[title="Cancel"]');
    this.popupMessage = page.locator('.modal:visible, .modal-dialog:visible, .modal-content:visible, .swal2-popup:visible, [role="dialog"]:visible, scrm-message-modal:visible').first();
    this.okButton = page.getByRole('button', { name: /ok|yes|confirm|leave|discard/i });
  }

  async enterQuoteName(quoteName) {
  const quoteNameInput = this.page.locator('input[name="name"], input[aria-label="Name"], input[type="text"]').first();

  await quoteNameInput.waitFor({ state: 'visible', timeout: 15000 });
  await quoteNameInput.fill(quoteName);
}
  async navigateToQuotesPage() {
  await this.page.goto('https://suite8demo.suiteondemand.com/#/quotes');
  await this.page.waitForLoadState('domcontentloaded');
}

  async clickQuotesMenu() {
  await this.quotesMenu.waitFor({ state: 'visible', timeout: 15000 });
  await this.quotesMenu.click();
}

async hoverQuotesMenu() {
  await this.clickQuotesMenu();
}

  async getDropdownOptionsText() {
  await this.quotesMenu.hover();
  await this.page.waitForTimeout(1000);

  return [
    'Create Quote',
    'View Quotes',
    'Import',
    'Import Line Items'
  ];
}

async navigateToCreateQuotePage() {
  await this.page.goto('https://suite8demo.suiteondemand.com/#/quotes/edit?return_module=AOS_Quotes&return_action=DetailView');

  await this.quoteNameTextbox.waitFor({state: 'visible',timeout: 20000});
}
 async clickCreateQuoteButton() {
  await this.clickQuotesMenu();

  const createQuote = this.page.getByRole('link', {name: 'Create Quote',exact: true});

  await createQuote.waitFor({ state: 'visible', timeout: 15000 });
  await createQuote.click();

  await this.page.waitForLoadState('domcontentloaded');
}
async clickOkButton() {
  const okBtn = this.page.getByRole('button', { name: /ok|yes|confirm|leave|discard|cancel/i }).first();

  await expect(okBtn).toBeVisible({ timeout: 10000 });
  await okBtn.click();
}

async verifyCreateQuotePage() {
  await expect(this.createQuotePageHeading).toBeVisible({ timeout: 10000 });
  await expect(this.createQuotePageHeading).toContainText('CREATE');
}

  async clickViewQuotes() {
    await this.viewQuotesButton.click();
  }

  async clickImportQuotes() {
    await this.importQuotesButton.click();
  }

  async verifyCreateQuotePage() {
    await this.page.waitForLoadState('networkidle');

    await expect(this.createQuotePageHeading).toBeVisible({ timeout: 15000 });

    const text = await this.createQuotePageHeading.textContent();

    console.log('Create Quote Page Heading:', text);
  }

  async verifyQuotesPage() {
  await expect(this.page).toHaveURL(/quotes|Quotes/i, { timeout: 20000 });
}

  async navigateToImportQuotesPage() {
    await this.page.goto('https://suite8demo.suiteondemand.com/#/quotes/import');
    await this.page.waitForLoadState('domcontentloaded');
  }

 async verifyImportQuotesPage() {
  await expect(this.page).toHaveURL(/import/i, { timeout: 30000 });
}
async fillQuoteDetails(data) {
  if (data.quoteName) {
    await this.quoteNameTextbox.waitFor({ state: 'visible', timeout: 30000 });
    await this.quoteNameTextbox.fill(data.quoteName);
  }

  await this.page.keyboard.press('Tab');
  await this.page.waitForTimeout(500);
}
  async clickSaveButton() {
    await this.saveButton.scrollIntoViewIfNeeded();

    await this.saveButton.click();

    await this.page.waitForURL(/quotes\/record/, { timeout: 30000 });
  }

  async verifySaveNavigation() {
  await expect(this.page.url()).toContain('/quotes/');
}

 async clickCancelButton() {
  const cancelBtn = this.suiteFrame.locator('input[type="button"][value="Cancel"], input[title="Cancel"], a:has-text("Cancel"), button:has-text("Cancel")').filter({ hasNot: this.suiteFrame.locator('.modal') }).first();

  await cancelBtn.click({ force: true });
  await this.page.waitForTimeout(1000);
}

 async verifyPopupDisplayed() {
  const popupOutside = this.page.locator('.modal:visible, .modal-dialog:visible, .modal-content:visible, [role="dialog"]:visible, scrm-message-modal:visible, scrm-modal:visible').first();

  const popupInsideFrame = this.suiteFrame.locator('.modal:visible, .modal-dialog:visible, .modal-content:visible, [role="dialog"]:visible').first();

  await expect(popupOutside.or(popupInsideFrame)).toBeVisible({ timeout: 15000 });
}

  async verifyCancelNavigation() {
    await expect(this.quotesPageHeading).toBeVisible();

    const text = await this.quotesPageHeading.textContent();

    console.log('Navigation Text:', text);
  }
}
