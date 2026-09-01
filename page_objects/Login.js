const{ test, expect } = require('@playwright/test');

class Login {
      constructor(page)
      {
        this.page = page;
        this.loginModal = page.locator('#logInModal');
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.loginButton = page.getByRole("button", { name : 'Log in'});
        this.loginWindowCloseMark= page.locator('#logInModal .close');
      }


// ------------------------------ Valid Login ----------------------------------------

async validLogin(username,password)
      {
        expect(username).toBeDefined();
        expect(password).toBeDefined();

        await expect(this.loginModal).toBeVisible();

        await this.username.fill(username); //pass the value in runtime
        await this.password.fill(password); //pass the value in runtime

        const loginResponsePromise = this.page.waitForResponse(response => 
        response.url().includes('login') && response.status() === 200);

        await this.loginButton.click();

        // Playwright waits here until the server actually replies "Success"
        await loginResponsePromise;

        await expect(this.loginModal).not.toBeVisible();
      }


// ------------------------------- Invalid Login --------------------------------------
    
async invalidLogin(username, password, alertMessage)
      {
        expect(username).toBeDefined();
        expect(password).toBeDefined();

        await expect(this.loginModal).toBeVisible();
        
        await this.username.fill(username); //pass the value in runtime
        await this.password.fill(password); //pass the value in runtime


        // Alert popup loaded after invalid login
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.loginButton.click();
            
        // Pause here until the dialog appears!
        const dialog = await dialogPromise;

        // Verify and Accept
        expect(dialog.message()).toContain(alertMessage);
        await dialog.accept();
      }


// ------------------ Cloase the login window by clicking on the close (x) mark -----------------

    async closeLoginModal()
      {
        await expect(this.loginWindowCloseMark).toBeVisible();
        await this.loginWindowCloseMark.click();
        await expect(this.loginModal).not.toBeVisible();
      }
}

module.exports = Login;