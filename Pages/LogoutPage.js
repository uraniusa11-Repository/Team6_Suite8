import { hover, click } from '../support/helpers.js';

export class LogoutPage {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {import('@playwright/test').Locator} profileBtn - pass homePage.profileBtn
     */
    constructor(page, profileBtn) {
        this.profileBtn = profileBtn;
        this.logoutOption = page.locator('div.dropdown-menu.global-links-dropdown').locator('a.dropdown-item', { hasText: 'Logout' });
    }

    async logout() {
        await hover(this.profileBtn);
        await click(this.logoutOption);
    }

}
