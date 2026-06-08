import { expect } from '@playwright/test';
import { assertVisible, navigateTo } from '../support/helpers.js';
import { HomePage } from './HomePage.js';

export class DashletPage {
    constructor(page, logger = null) {
        this.page = page;
        this.logger = logger;
        const homePage = new HomePage(page, logger);
        this.iframeContent = homePage.iframeContent;
        this.dashletPanels = homePage.dashletPanels;
        this.homePage = homePage;
        this.addDashletsModal = this.iframeContent.locator('.modal-content').filter({ hasText: 'Add Dashlets' });
    }

    dashletPanel(name) {
        return this.iframeContent.locator('div.dashletPanel', { hasText: name }).first();
    }

    dashletLink(name) {
        return this.addDashletsModal.getByRole('link', { name });
    }

    nextPageBtn(dashletName) {
        return this.dashletPanel(dashletName).getByRole('button', { name: 'Next' });
    }

    prevPageBtn(dashletName) {
        return this.dashletPanel(dashletName).getByRole('button', { name: 'Previous' });
    }

    paginationCount(dashletName) {
        return this.dashletPanel(dashletName).locator('span.pageNumbers');
    }

    async navigateToDashboard() {
        this.logger?.debug('Navigating to home page');
        await navigateTo(this.page, 'home');
        this.logger?.debug('Clicking SuiteCRM Dashboard link');
        await this.homePage.clickDashboardLink();
    }

    async addDashlet(name) {
        this.logger?.debug('Opening Actions > Add Dashlets via HomePage');
        await this.homePage.clickActionsDropdownOption('Add Dashlets');
        await this.addDashletsModal.waitFor({ state: 'visible' });
        this.logger?.debug(`Selecting "${name}" dashlet`);
        await this.dashletLink(name).click();
        await this.addDashletsModal.getByLabel('Close').click();
        await this.addDashletsModal.waitFor({ state: 'hidden' });
    }

    async verifyDashletVisible(name) {
        this.logger?.debug(`Verifying "${name}" dashlet is visible`);
        await assertVisible(this.dashletPanel(name));
    }

    async verifyPaginationVisible(name) {
        this.logger?.debug(`Verifying pagination controls on "${name}" dashlet`);
        await assertVisible(this.nextPageBtn(name));
        await assertVisible(this.prevPageBtn(name));
    }

    async verifyPaginationCount(name) {
        this.logger?.debug(`Verifying pagination count text on "${name}" dashlet`);
        const count = this.paginationCount(name);
        await assertVisible(count);
        await expect(count).toHaveText(/\(\d+ - \d+ of \d+\)/);
    }

    async hasMultiplePages(name) {
        const text = await this.paginationCount(name).textContent();
        const match = text?.match(/\((\d+) - (\d+) of (\d+)\)/);
        if (!match) return false;
        const shown = parseInt(match[2]) - parseInt(match[1]) + 1;
        return parseInt(match[3]) > shown;
    }

    async verifyNextPageNavigation(name) {
        const isMultiple = await this.hasMultiplePages(name);
        if (isMultiple) {
            this.logger?.debug(`"${name}" has multiple pages — navigating to next page`);
            await this.clickNextPage(name);
            const start = await this.getCurrentPageStart(name);
            expect(start).toBeGreaterThan(1);
        } else {
            this.logger?.info(`"${name}" dashlet has only one page — next page navigation not applicable`);
        }
    }

    async verifyPrevPageNavigation(name) {
        const isMultiple = await this.hasMultiplePages(name);
        if (isMultiple) {
            this.logger?.debug(`"${name}" has multiple pages — navigating to next then previous`);
            await this.clickNextPage(name);
            await this.clickPrevPage(name);
            const start = await this.getCurrentPageStart(name);
            expect(start).toBe(1);
        } else {
            this.logger?.info(`"${name}" dashlet has only one page — previous page navigation not applicable`);
        }
    }

    async clickNextPage(name) {
        this.logger?.debug(`Clicking next page on "${name}" dashlet`);
        await this.nextPageBtn(name).click();
        await this.page.waitForTimeout(1000);
    }

    async clickPrevPage(name) {
        this.logger?.debug(`Clicking previous page on "${name}" dashlet`);
        await this.prevPageBtn(name).click();
        await this.page.waitForTimeout(1000);
    }

    async getCurrentPageStart(name) {
        const text = await this.paginationCount(name).textContent();
        const match = text?.match(/\((\d+) - \d+ of \d+\)/);
        return match ? parseInt(match[1]) : 1;
    }

    viewBtns(dashletName) {
        return this.dashletPanel(dashletName).locator('a[title="View"]');
    }

    editBtns(dashletName) {
        return this.dashletPanel(dashletName).locator('a[title="Edit"]');
    }

    async clickAllViewBtns(dashletName) {
        const count = await this.viewBtns(dashletName).count();
        this.logger?.debug(`Clicking view on ${count} records in "${dashletName}" dashlet`);

        for (let i = 0; i < count; i++) {
            const btn = this.viewBtns(dashletName).nth(i);

            const subject = (await btn.locator('xpath=ancestor::tr[1]').locator('td a:not(.list-view-data-icon)').first().textContent()).trim();
            this.logger?.debug(`Row ${i + 1}: subject = "${subject}"`);

            await btn.click();
            await this.page.waitForURL(/calls\/record\//);

            const recordIframe = this.page.locator('iframe').first().contentFrame();
            const heading = recordIframe.getByRole('heading', { level: 2 });
            await heading.waitFor({ state: 'visible', timeout: 15000 });
            await assertVisible(recordIframe.getByText('Calls', { exact: true }));
            await expect(heading).toHaveText(new RegExp(subject, 'i'));
            this.logger?.debug(`Record page verified: CALLS header and subject "${subject}" matched`);

            await this.navigateToDashboard();
            await this.paginationCount(dashletName).waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    async clickAllEditBtns(dashletName) {
        const count = await this.editBtns(dashletName).count();
        this.logger?.debug(`Clicking edit on ${count} records in "${dashletName}" dashlet`);
        for (let i = 0; i < count; i++) {
            await this.editBtns(dashletName).nth(i).click();
            await this.page.waitForURL(/calls\/edit\//);
            this.logger?.debug(`Edit page opened for row ${i + 1} of ${count}`);
            await this.navigateToDashboard();
        }
    }
}
