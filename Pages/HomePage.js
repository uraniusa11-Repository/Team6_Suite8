import { expect } from '@playwright/test';
import { assertVisible, hover } from '../support/helpers.js';

export class HomePage {

    constructor(page, logger = null) {
        this.page = page;
        this.logger = logger;
        this.iframeContent = page.locator('iframe').first().contentFrame();
        this.dashboardLink = this.iframeContent.getByRole('link', { name: 'SUITECRM DASHBOARD' });
        this.actionsBtn = this.iframeContent.getByRole('link', { name: /actions/i });
        this.actionsDropdown = this.iframeContent.locator('ul.dropdown-menu.tab-actions');
        this.actionsToggle = this.iframeContent.locator('li#tab-actions a.dropdown-toggle');
        this.dashletTable = this.iframeContent.locator('table.dashletTable');
        this.dashletPanels = this.iframeContent.locator('div.dashletPanel');
        this.homeIcon = page.locator('svg-icon.image-home');
        this.searchIcon = page.getByRole('button', { name: 'Search' });
        this.searchContainer = page.locator('form.search-bar-global div.input-group.dropdown');
        this.profileIcon = page.locator('svg-icon.image-user');
        this.profileDropdown = page.locator('div.dropdown-menu.global-links-dropdown');
        this.quickCreateBtn = page.getByLabel('Quick Create');
        this.quickCreateDropdown = page.locator('div.action-new.action-dropdown ul.dropdown-menu');
        this.recentlyViewedIcon = page.locator('svg-icon.image-recently_viewed');
        this.recentlyViewedBtn = page.getByLabel('Recently Viewed');
        this.profileBtn = page.locator('a.dropdown-toggle.nav-link.primary-global-link');
        this.recentlyViewedPanel = page.locator('div.dropdown-menu.recently-viewed-nav-header');
        this.recentlyViewedItems = page.locator('div.dropdown-menu.recently-viewed-nav-header a.new-list-item');
        this.moreLink = page.locator('a.nav-link-nongrouped').filter({ hasText: /^\s*More\s*$/i });
        this.moreDropdown = page.locator('div.dropdown-menu.more-menu.submenu');
        this.actionsDropdownAddDashlets = this.iframeContent.getByRole('button', { name: 'Add Dashlets' });
        this.actionsDropdownAddTab = this.iframeContent.getByRole('button', { name: 'Add Tab' });
        this.actionsDropdownEditTabs = this.iframeContent.getByRole('button', { name: 'Edit Tabs' });
        this.actionDialogHeader = this.iframeContent.getByRole('dialog').locator('h4.modal-title');
        this.actionDialogClose = this.iframeContent.getByRole('dialog').getByLabel('Close');
    }


    navLink(menuItem) {
        return this.page.locator('a.top-nav-link').filter({ hasText: new RegExp(`^\\s*${menuItem}\\s*$`, 'i') });
    }

    navLinkDropdown(menuItem) {
        if (menuItem === 'More') {
            return this.moreDropdown;
        }
        return this.page.locator('li.top-nav')
            .filter({ has: this.navLink(menuItem) })
            .locator('div.dropdown-menu.submenu');
    }


    hoverableElement(name) {
        const locatormap = {
            'Quick Actions':   this.quickCreateBtn,
            'Recently Viewed': this.recentlyViewedBtn,
            'Profile':         this.profileBtn,
            'More':            this.moreLink,
        };
        return locatormap[name] || this.navLink(name);
    }

    profileDropdownOption(option) {
        return this.profileDropdown.locator('a.dropdown-item', { hasText: option });
    }

    quickCreateMenuItem(action) {
        return this.quickCreateDropdown.locator('a', { hasText: action });
    }

    async verifyElementHighlighted(name) {
        this.logger?.debug(`Hovering over element: ${name}`);
        await hover(this.hoverableElement(name));
        this.logger?.debug(`Verifying highlight CSS for: ${name}`);
        await expect(this.hoverableElement(name)).toHaveCSS('background-color', 'rgb(102, 97, 118)');
    }

    async verifySearchHighlighted() {
        this.logger?.debug('Verifying search container highlight CSS');
        await expect(this.searchContainer).toHaveCSS('background-color', 'rgb(151, 148, 162)');
    }

    async hoverNavLink(menuItem) {
        this.logger?.debug(`Hovering over nav link: ${menuItem}`);
        await hover(this.hoverableElement(menuItem));
    }

    actionsDropdownItem(option) {
        return this.actionsDropdown.getByRole('button', { name: option });
    }

    async clickActionsDropdownOption(actionsDropdown) {
        this.logger?.debug('Opening Actions dropdown');
        await this.clickActionsBtn();
        await assertVisible(this.actionsDropdownItem(actionsDropdown));
        this.logger?.debug(`Clicking Actions dropdown option: ${actionsDropdown}`);
        await this.actionsDropdownItem(actionsDropdown).click();
    }

    async verifyActionDialogHeader(expectedHeader) {
        this.logger?.debug(`Verifying dialog header: "${expectedHeader}"`);
        await assertVisible(this.actionDialogHeader, { timeout: 10000 });
        await this.page.waitForTimeout(1500);
        await expect(this.actionDialogHeader).toHaveText(expectedHeader, { timeout: 10000 });
        await this.actionDialogClose.click();
    }

    async clickActionsBtn() {
        this.logger?.debug('Clicking Actions button');
        await this.actionsBtn.waitFor({ state: 'visible' });
        await this.actionsBtn.click();
    }

    async verifyActionsDropdownOpen(options) {
        this.logger?.debug('Verifying Actions dropdown is expanded');
        await expect(this.actionsToggle).toHaveAttribute('aria-expanded', 'true');
        this.logger?.debug('Verifying Actions dropdown items are visible');
        for (const option of options) {
            await assertVisible(this.actionsDropdownItem(option));
        }
    }

    async clickDashboardLink() {
        this.logger?.debug('Clicking SuiteCRM Dashboard link');
        await this.dashboardLink.click();
    }

    async verifyDashletsVisible(testInfo = null) {
        this.logger?.debug('Checking dashlet table is visible');
        await assertVisible(this.dashletTable);

        const dashletTitleDivs = this.dashletTable.locator('div.dashboard-title');
        const titles = await dashletTitleDivs.allTextContents();
        const trimmedTitles = titles.map(t => t.trim()).filter(t => t.length > 0);
        console.log('Dashlet titles:', trimmedTitles);

        if (trimmedTitles.length > 0) {
            this.logger?.debug(`Dashlets found: ${trimmedTitles.join(', ')}`);
        } else {
            this.logger?.debug('No dashlets found — user has not enabled dashlets on the dashboard');
        }

        await testInfo?.attach('Dashlet Titles', {
            body: trimmedTitles.length > 0 ? trimmedTitles.join('\n') : 'No dashlets found',
            contentType: 'text/plain',
        });
    }

    async verifyRecentlyViewedItemsVisible() {
        this.logger?.debug('Verifying recently viewed panel is visible');
        await assertVisible(this.recentlyViewedPanel);
        const recentitems = await this.recentlyViewedItems.all();
        this.logger?.debug(`Recently viewed items count: ${recentitems.length}`);
        if (recentitems.length > 0) {
            for (const item of recentitems) {
                await assertVisible(item);
            }
        } else {
            this.logger?.debug('No recently viewed items — verifying empty state text');
            await assertVisible(this.page.getByText('No Recently Viewed Items'));
        }
    }


}
