export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userNameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton    = page.getByRole('button', { name: 'Log In' });
    }

    async login(username, password) {
        await this.userNameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
}
