const{ test, expect } = require('@playwright/test');

class ProductSummary {
      constructor(page)
      {
        this.page = page;
        this.productHeaderTitle = page.locator('h2.name');
        this.pricetag = page.locator(".price-container");
        this.addToCartButton = page.getByRole("link", { name : "Add to cart", exact : true});
      }


// ---------------------------- Checking the product summary --------------------------------

      async summary(productName, price)
      {
        await expect(this.productHeaderTitle).toHaveText(productName);
        await expect(this.pricetag).toContainText(price);
      }


// ------------------------ Clicking on the "Add to Cart" button, after analyzing the summary ---------------------


    async addToCart(alertMessage) {
          const dialogPromise = this.page.waitForEvent('dialog');

          await expect(this.addToCartButton).toBeVisible();
          await this.addToCartButton.click();

         const dialog = await dialogPromise;

         expect(dialog.message()).toContain(alertMessage);
         await dialog.accept();
    }
}


module.exports = ProductSummary;