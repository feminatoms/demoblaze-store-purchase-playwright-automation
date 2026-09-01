const { expect } = require('@playwright/test');

async function userLogin(page, username, password) 
{
    expect(username).toBeDefined();
    expect(password).toBeDefined();

    await page.goto('https://www.demoblaze.com');
    await page.getByRole("link", {name: 'Log in'}).click();

    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);

    await page.getByRole("button", { name : 'Log in'}).click();

    const welcomeUser = page.locator('#nameofuser');
    await expect(welcomeUser).toContainText(`Welcome ${username}`);
}

module.exports = { userLogin };
