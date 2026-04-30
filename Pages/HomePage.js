export class HomePage {

    constructor(page) {
        this.page = page;
        this.dashboardLink = page
            .locator('iframe')
            .contentFrame()
            .getByRole('link', { name: 'SUITECRM DASHBOARD' });
    }
}
