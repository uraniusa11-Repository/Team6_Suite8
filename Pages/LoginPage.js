
import { HomePage } from '../Pages/HomePage';
import { navigateTo, fill, click, assertVisible, waitForURL } from '../support/helpers';
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
        await fill(this.userNameTextbox, username);
        await fill(this.passwordTextbox, password);
        await this.loginButton.waitFor({ state: 'visible', timeout: 30000 });
        await click(this.loginButton);
    }

    async userlogin(username, password)
    {
    await navigateTo(this.page, 'Login');
    await this.login(username, password);
    await waitForURL(this.page, '/home');
    await assertVisible(new HomePage(this.page).dashboardLink, { timeout: 30000 });
   

    }

    async checkForAlert(testInfo) {
        try{
        await this.credentialsError.waitFor({ state: 'visible', timeout: 5000 });
            const isCount = await this.credentialsError.count(); 
            console.log(`Alert found: ${isCount}`);
            const alertText = await this.credentialsError.textContent()
            console.log(`Alert found: ${alertText}`)
           // await this.page.pause();       
            if (isCount>0) {
                const alertText = await this.credentialsError.textContent()
                console.log(`Alert found: ${alertText}`)
                await testInfo.attach('alert-message', {
                    body: alertText.trim(),
                    contentType: 'text/plain'
                                       })
                throw new Error(`Alert displayed: ${alertText.trim()}`)                               
                            }             
                        }

         catch(error)  
         {
            
         }             
    }
//}

//     async checkForAlert() {
//     try {
        
//         console.log("print I am here");
//         //
//         const isVisible = await this.credentialsError.isVisible()
//         const isVisible =this.page.getByRole('alert').isVisible()
//        const isvisible1= this.page.getByText('Too many failed login').isVisible()

//        console.log("isvisible1 is ",isvisible1);

//        if(!isvisible)
//        {
//         console.log("I am  not visible");
//        }


//        if(isvisible1)
//        {
//         console.log("I am visible");
//        }

//         if (isVisible) {
//         const alertText = await this.credentialsError.textContent()
//         console.log(`Alert found: ${alertText}`)
//         await testInfo.attach('alert-message', {
//             body: alertText.trim(),
//             contentType: 'text/plain'
//                                             })
//              throw new Error(`Alert displayed: ${alertText.trim()}`)                               
//                         }
//         //await this.credentialsError .waitFor({ state: 'visible', timeout: 3000 });
//         //await this.page.Pause();
//         //const alertText = await this.alertMessage.textContent();
//        // console.log("print",alertText);
//         // await testInfo.attach('alert-message', {
//         //     body: alertText.trim(),
//         //     contentType: 'text/plain'
//         //})

        

//     } catch (error) {
        
        
        
//     }
// }
}
