import { expect } from '@playwright/test';
export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userNameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton    = page.getByRole('button', { name: 'Log In' });
        this.credentialsError        = page.getByRole('alert');
        this.usernameValidationError = page.locator('.inner-addon').filter({ has: page.getByRole('textbox', { name: 'Username' }) }).locator('.invalid-feedback')
        this.passwordValidationError = page.locator('.inner-addon').filter({ has: page.getByRole('textbox', { name: 'password' }) }).locator('.invalid-feedback')
    }

    async login(username, password) {
        await this.userNameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.waitFor({ state: 'visible', timeout: 30000 })
        await this.loginButton.click({ timeout: 15000 })
    }
}
