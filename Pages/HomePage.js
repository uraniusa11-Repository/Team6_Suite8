import { expect } from '@playwright/test';
import { assertVisible, hover } from '../support/helpers.js';

export class HomePage {

    constructor(page, logger = null) {
        this.page = page;
        this.logger = logger;
        this.dashboardLink = page
            .locator('iframe')
            .contentFrame()
            .getByRole('link', { name: 'SUITECRM DASHBOARD' });
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

    async verifyRecentlyViewedItemsVisible() {
        this.logger?.debug('Verifying recently viewed panel is visible');
        await assertVisible(this.recentlyViewedPanel);
        const items = await this.recentlyViewedItems.all();
        this.logger?.debug(`Recently viewed items count: ${items.length}`);
        if (items.length > 0) {
            for (const item of items) {
                await assertVisible(item);
            }
        } else {
            this.logger?.debug('No recently viewed items — verifying empty state text');
            await assertVisible(this.page.getByText('No Recently Viewed Items'));
        }
    }


}
