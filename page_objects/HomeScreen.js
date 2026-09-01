const{ test, expect } = require('@playwright/test');

class HomeScreen {
      constructor(page)
      {
        this.page = page;
        this.homeLink = page.getByRole("link", { name : "Home "});
        this.signupLink = page.getByRole("link", {name: 'Sign up'});
        this.loginLink = page.getByRole("link", {name: 'Log in'});
        this.logoutLink = page.getByRole("link", { name : "Log out"});
        this.cartLink = page.getByRole("link", { name : "Cart", exact : true});
        this.welcomeUser = page.locator('#nameofuser');
        
      }


// Home screen links

    async gotoHome()
    {
        await this.page.goto('https://www.demoblaze.com/');
    }


    async gotoSignup()
    {
        await this.signupLink.click();
    }


    async gotoLogin()
    {
        await this.loginLink.click();
    }


    async gotoLogout()
    {
        await this.logoutLink.click();
    }


    async gotoCart()
    {
        await this.cartLink.click();
    }


    async welcomeUserIcon(username)
    {
        await expect(this.welcomeUser).toBeVisible();
        await expect(this.welcomeUser).toContainText(`Welcome ${username}`);
    }

    

// --------------------------------------- Category Selection -----------------------------------------------

async selectCategory(categoryName)
{
    await this.page.getByRole("link", { name : categoryName, exact : true }).click();
}


//-------------------------- Product selection by clicking on the image or title link ------------------------


async selectProduct(productName, clickType = 'link')
   {
        const productGrid = this.page.locator('.card').filter({ hasText: productName });
        await expect(productGrid.first()).toBeVisible();

        
            if (clickType === 'image') 
                {
                    await productGrid.locator('img').first().click();
                } 
                
            else
                {
                    await this.page.getByRole('link', { name: productName }).click();
                }
    }
}


module.exports = HomeScreen; //exporting the class
