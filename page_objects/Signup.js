const{ test, expect } = require('@playwright/test');

class Signup {
      constructor(page)
      {
        this.page = page;
        this.signupModal = page.locator('#signInModal')
        this.username = page.getByLabel("Username:");
        this.password = page.getByLabel("Password:");
        this.signupButton = page.getByRole("button", {name: 'Sign up'})
        this.signupCloseButton = page.locator('#signInModal .modal-footer >> text="Close"');
      }

 
// ----------------------------------- Valid Signup Procedure ----------------------------------------    

    async signupRegistration(username, password, alertMessage)
      {
        await expect(this.signupModal).toBeVisible();        
        await this.username.fill(username); //pass the value in runtime
        await this.password.fill(password); //pass the value in runtime

        
      // Success alert after signup
            
      const dialogPromise = this.page.waitForEvent('dialog');

            await this.signupButton.click();
            
            // Pause here until the dialog appears!
            const dialog = await dialogPromise;

            // Verify and Accept
            expect(dialog.message()).toContain(alertMessage);
            await dialog.accept();
          }



// ------------- Closing the Signup window by clicking on the "Close" button after entering the details -----------

    async closeSignupModal(username, password)
      {
        await expect(this.signupModal).toBeVisible();        
        await this.username.fill(username); //pass the value in runtime
        await this.password.fill(password); //pass the value in runtime
        
        await expect(this.signupCloseButton).toBeVisible();
        await this.signupCloseButton.click();
        await expect(this.signupModal).not.toBeVisible();
      }
}

module.exports = Signup;