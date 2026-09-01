const{ test, expect } = require('@playwright/test');

class Checkout {
      constructor(page)
        {
            this.page = page;
            this.totalPriceHeading = page.locator('#totalp'); // Main cart total display
            this.buttonToPlaceOrder = page.getByRole("button", { name : "Place Order"});
           // this.orderModal = page.locator('#orderModal');
            this.orderModal = page.getByRole("dialog", { name: "Place order" });
            this.name = page.locator("#name");
            this.country = page.locator("#country");
            this.city = page.locator("#city");
            this.crediCard = page.locator("#card");
            this.month = page.locator("#month");
            this.year = page.locator("#year");
            this.purchaseButton = page.getByRole("button", { name : "Purchase"});
            this.thankYouNote = page.getByText("Thank you for your purchase!");
            this.okButton = page.locator('.sweet-alert').getByRole('button', { name: 'OK' });
        }


// ---------------- Remove the unwanted items from the cart other than the selection ----------------------

    async itemRemoval(productName) 
        {
            const unwantedCartItemRow = this.page.locator('tr').filter({ hasText : productName });
            await expect(unwantedCartItemRow).toBeVisible();
            await unwantedCartItemRow.getByRole("link", { name : 'Delete'}).click();
            await expect(unwantedCartItemRow).not.toBeVisible();
        }


// ----------------------------- Place the order and enter the customer data ----------------------------------

    async placeOrder(customerData)
       {
            // 1. Wait for cart total to populate from API before proceeding
            await expect(this.totalPriceHeading).not.toBeEmpty();
            await expect(this.totalPriceHeading).toBeVisible();   

            await expect(this.buttonToPlaceOrder).toBeVisible();
            await this.buttonToPlaceOrder.click();
            await expect(this.orderModal).toBeVisible();

            // Fill form
            await this.name.fill(customerData.customer_Name);
            await this.country.fill(customerData.customer_Country);
            await this.city.fill(customerData.customer_City);
            await this.crediCard.fill(customerData.customer_cardNumber);
            await this.month.fill(customerData.customer_cardMonth);
            await this.year.fill(customerData.customer_cardYear);
            
            // Complete Purchase
            await this.purchaseButton.click();
        }


// ------------------------- Checking for the success message after the purchase ----------------------------------
    
    async PurchaseSuccess()
       {
            await expect(this.thankYouNote).toBeVisible();
            await this.page.waitForTimeout(1000);
            
            await Promise.all([
            this.page.waitForURL(/index\.html/), 
            this.okButton.click()
            ]);
            await expect(this.page).toHaveTitle("STORE");
       }

    }
module.exports = Checkout;