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
        //await this.loginButton.click();
    }

    async userlogin(username, password)
    {
    await navigateTo(page, 'Login');
    await login(username, password);
    await page.waitForURL(url => url.href.includes('/home'));
    await expect(new HomePage(page).dashboardLink).toBeVisible();
    }

//     async checkForAlert() {
//     try {
        
//         await this.credentialsError .waitFor({ state: 'visible', timeout: 3000 })
//         const alertText = await this.alertMessage.textContent()
//         await testInfo.attach('alert-message', {
//             body: alertText.trim(),
//             contentType: 'text/plain'
//         })

//         throw new Error(`Alert displayed: ${alertText.trim()}`)

//     } catch (error) {
        
//         if (error.message.includes('Alert detected')) {
//             throw error
//         }
        
//     }
// }
}
