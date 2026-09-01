const{ test, expect } = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../Util/StorePurchaseTestData.json'))); 
const { loginModalClose } = require('../Util/LoginCloseFunction');
const { userLogin } = require('../Util/Login_Valid');

test.describe.configure({mode : 'serial'});

//----------------------------------------------------------------------------------------------

test.describe('Demoblaze User Flow', () => {

    // Defining a variable to store the created username
    let createdUsername;
    let addToCartButton;


//--------------------------------- Test 1 -----------------------------------------

test('1. Click on Signup_Do the Signup', async({ page }) => {

    // Creating the random username
    const randomNumber = Math.floor(Math.random() * 1000);
    createdUsername = `user_${randomNumber}`;

    await page.goto('https://www.demoblaze.com');

    // Success alert after signup
    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.successMessage);       
           await dialog.accept()
    }); 

    await page.getByRole("link", {name: 'Sign up'}).click();

    await page.getByLabel("Username:").fill(createdUsername);
    await page.getByLabel("Password:").fill(testData.validPassword);
    await page.getByRole("button", {name: 'Sign up'}).click();

    await expect(page.locator('#signInModal')).not.toBeVisible();

});


// ---------------------------------- Test 2 --------------------------------------------

test('2. Click on Signup_Click on Close', async({ page }) => {

    expect(createdUsername).toBeDefined();

    await page.goto('https://www.demoblaze.com');
    await page.getByRole("link", {name: 'Sign up'}).click();

    await page.getByLabel("Username:").fill(createdUsername);
    await page.getByLabel("Password:").fill(testData.validPassword);

    const closeButton = page.locator('#signInModal .modal-footer >> text="Close"');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    await expect(page.locator('#signInModal')).not.toBeVisible();

});


// ----------------------------------- Test 3 ---------------------------------------------

test('3. Valid Login', async({ page }) => {

    await userLogin(page, createdUsername, testData.validPassword);

});


// --------------------------------- Test 4 ------------------------------------------------

test('4. Invalid Login_Invalid Username', async({ page }) => {

    await page.goto('https://www.demoblaze.com');

    // Alert for the Invalid Login
    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.invalidUserErrorMessage);       
           await dialog.accept()
    }); 

    await page.getByRole("link", {name: 'Log in'}).click();

    await page.locator('#loginusername').fill(testData.invalidUsername);
    await page.locator('#loginpassword').fill(testData.validPassword);

    await page.getByRole("button", { name : 'Log in'}).click();
    
    await loginModalClose(page);

});



// ------------------------------- Test 5 -----------------------------------------------

test('5. Invalid Login_Invalid Password', async({ page }) => {

    await page.goto('https://www.demoblaze.com');

    // Alert for the Invalid Login
    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.invalidPasswordErrorMessage);       
           await dialog.accept()
    }); 

    await page.getByRole("link", {name: 'Log in'}).click();

    await page.locator('#loginusername').fill(createdUsername);
    await page.locator('#loginpassword').fill(testData.wrongPassword);

    await page.getByRole("button", { name : 'Log in'}).click();

    await loginModalClose(page);


});


// --------------------------------- Test 6 ---------------------------------------

test('6. Invalid Login_Invalid Username & Password', async({ page }) => {

    await page.goto('https://www.demoblaze.com');

    // Alert for the Invalid Login
    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.invalidUserErrorMessage);       
           await dialog.accept()
    }); 

    await page.getByRole("link", {name: 'Log in'}).click();

    await page.locator('#loginusername').fill(testData.invalidUsername);
    await page.locator('#loginpassword').fill(testData.wrongPassword);

    await page.getByRole("button", { name : 'Log in'}).click();

    await loginModalClose(page);

});


// ----------------------------------- Test 7 -------------------------------------------------

test('7. Login-> Select a Laptop product -> Add to Cart -> Click "ok" on the popup', async({ page }) => {
    
    await userLogin(page, createdUsername, testData.validPassword);

    await page.getByRole("link", { name : 'Laptops', exact : true }).click();

    // Created a const variable, assign the required product locator to that, then checking using expect
    const laptopProduct = page.locator('.card').filter({ hasText: testData.laptop });
    await expect(laptopProduct).toBeVisible();

    // Taking all the laptopp titles and then print
    const laptopTitles = await page.locator(".card-title").allTextContents();
    console.log(laptopTitles);


    // Putting if-else to click either on the product image or title link
    if (testData.clickType === 'image')
        {
            console.log("Clikcing on the image of the item");
            await laptopProduct.locator('img').click();
        } 
    
    else
        {
            console.log("Clicking on the title link of the item");
            
            const laptopLink = page.getByRole('link', { name: testData.laptop });
            await expect(laptopLink).toBeVisible();
            await laptopLink.click();
        }


    // Product Summary
    await expect(page.locator('h2.name')).toHaveText(testData.laptop);
    await expect(page.locator(".price-container")).toContainText("$790");
    addToCartButton = page.getByRole("link", { name : "Add to cart", exact : true});
    await expect(addToCartButton).toBeVisible();

    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.purchaseAlert);       
           await dialog.accept()
    });

    await addToCartButton.click();

    await page.getByRole("link", { name : "Home "}).click();

    
});


// ----------------------------------- Test 8 ---------------------------------------------------

test('8. Login-> Select a Phone-> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async({ page }) => {
    
    await userLogin(page, createdUsername, testData.validPassword);

    await page.getByRole("link", { name : 'Phones', exact : true }).click();

    // Created a const variable, assign the required product locator to that, then checking using expect
    const phoneProduct = page.locator('.card').filter({ hasText: testData.phone });
    await expect(phoneProduct).toBeVisible();

    // Taking all the laptopp titles and then print
    const phoneTitles = await page.locator(".card-title").allTextContents();
    console.log(phoneTitles);


    // Putting if-else to click either on the product image or title link
    if (testData.clickType === 'image') {
        console.log("Clikcing on the image of the item");
        await phoneProduct.locator('img').click();

    } 
    
    else {
        console.log("Clicking on the title link of the item");
        
        const phoneLink = page.getByRole('link', { name: testData.phone });
        await expect(phoneLink).toBeVisible();
        await phoneLink.click();
    }

    
    // Product Summary
    await expect(page.locator('h2.name')).toHaveText(testData.phone);
    await expect(page.locator(".price-container")).toContainText("$790");
    addToCartButton = page.getByRole("link", { name : "Add to cart", exact : true});
    await expect(addToCartButton).toBeVisible();

    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.purchaseAlert);       
           await dialog.accept()
    });

    await addToCartButton.click();

    await page.getByRole("link", { name : "Cart", exact : true}).click();
    
    const unwantedCartItemRow = page.locator('tr').filter({ hasText : testData.laptop });
    await unwantedCartItemRow.getByRole("link", { name : 'Delete'}).click();
    await expect(unwantedCartItemRow).not.toBeVisible();

    await page.getByRole("button", { name : "Place Order"}).click();

    await expect(page.locator('#orderModal')).toBeVisible();

    await page.locator("#name").fill(testData.customer_Name);
    await page.locator("#country").fill(testData.customer_Country);
    await page.locator("#city").fill(testData.customer_City);
    await page.locator("#card").fill(testData.customer_cardNumber);
    await page.locator("#month").fill(testData.customer_cardMonth);
    await page.locator("#year").fill(testData.customer_cardYear);
    await page.getByRole("button", { name : "Purchase"}).click();

    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

    await page.waitForTimeout(1000);

    await Promise.all([
        page.waitForURL(/index\.html/), 
        page.locator('.sweet-alert').getByRole('button', { name: 'OK' }).click()
    ]);

    await expect(page).toHaveTitle("STORE");

});


// --------------------------------------------- Test 9 -----------------------------------------------------------------------------------------

test('9. Login-> Select a Monitor -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async({ page }) => {
    
    await userLogin(page, createdUsername, testData.validPassword);

    await page.getByRole("link", { name : 'Monitors', exact : true }).click();

    // Created a const variable, assign the required product locator to that, then checking using expect
    const monitorProduct = page.locator('.card').filter({ hasText: testData.monitor });
    await expect(monitorProduct).toBeVisible();

    // Taking all the laptopp titles and then print
    const monitorTitles = await page.locator(".card-title").allTextContents();
    console.log(monitorTitles);


    // Putting if-else to click either on the product image or title link
    if (testData.clickType === 'image') {
        console.log("Clikcing on the image of the item");
        await monitorProduct.locator('img').click();

    } 
    
    else {
        console.log("Clicking on the title link of the item");
        
        const monitorLink = page.getByRole('link', { name: testData.monitor });
        await expect(monitorLink).toBeVisible();
        await monitorLink.click();
    }

    
    // Product Summary
    await expect(page.locator('h2.name')).toHaveText(testData.monitor);
    await expect(page.locator(".price-container")).toContainText("$400");
    addToCartButton = page.getByRole("link", { name : "Add to cart", exact : true});
    await expect(addToCartButton).toBeVisible();

    page.on('dialog', async dialog =>{
           expect(dialog.message()).toContain(testData.purchaseAlert);       
           await dialog.accept()
    });

    await addToCartButton.click();

    await page.getByRole("link", { name : "Cart", exact : true}).click();
    
    await page.getByRole("button", { name : "Place Order"}).click();

    await expect(page.locator('#orderModal')).toBeVisible();

    await page.locator("#name").fill(testData.customer_Name);
    await page.locator("#country").fill(testData.customer_Country);
    await page.locator("#city").fill(testData.customer_City);
    await page.locator("#card").fill(testData.customer_cardNumber);
    await page.locator("#month").fill(testData.customer_cardMonth);
    await page.locator("#year").fill(testData.customer_cardYear);
    await page.getByRole("button", { name : "Purchase"}).click();

    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();

    await page.waitForTimeout(1000);

    await Promise.all([
        page.waitForURL(/index\.html/), 
        page.locator('.sweet-alert').getByRole('button', { name: 'OK' }).click()
    ]);

    await expect(page).toHaveTitle("STORE");
    
});


// --------------------------------------------- Test 10 ----------------------------------------------------------

test('10. Login with valid credentials -> Logout', async({ page }) => {
    
    await userLogin(page, createdUsername, testData.validPassword);
    await page.getByRole("link", { name : "Log out"}).click();

    await page.pause();

});

});


