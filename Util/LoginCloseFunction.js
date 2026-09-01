const { expect } = require('@playwright/test');

async function loginModalClose(page) 
{
    // Defining a variable with close (X) locator
        const loginWindowClose = page.locator('#logInModal .close');

    // Checking the close (x) mark is visible
        await expect(loginWindowClose).toBeVisible();

    // Clicking on it
        await loginWindowClose.click();
    
    // Checking the entire login window is not visible after clicking on the close (x) mark
        await expect(page.locator('#logInModal')).not.toBeVisible();
    
}

module.exports = { loginModalClose };
