const{ test, expect } = require('@playwright/test');
const POManager = require('../page_objects/POManager');
const testData = JSON.parse(JSON.stringify(require('../Util/StorePurchaseTestData.json'))); 

test.describe.configure({mode : 'serial'});

//-----------------------------------------------------------------------------------

test.describe('Demoblaze User Flow', () => {

// Defining the POM objects
    let pomanager;
    let homescreen;
    let signup;
    let login;
    let productSummary;
    let checkout;


    test.beforeEach(async ({ page }) => {
        pomanager = new POManager(page);
        homescreen = pomanager.getHomescreen();
        signup = pomanager.getSignup();
        login = pomanager.getLogin();
        productSummary = pomanager.getProductData();
        checkout = pomanager.getCheckoutDetails();
    });


// Defining a variable to store the created username
    let createdUsername;


//--------------------------------- Test 1 -----------------------------------------

test('1. Click on Signup_Do the Signup', async() => {

    // Creating the random username
    const randomNumber = Math.floor(Math.random() * 1000);
    createdUsername = `Diyona_${randomNumber}`;

    await homescreen.gotoHome();
    await homescreen.gotoSignup();
    await signup.signupRegistration(createdUsername, testData.validPassword, testData.successMessage);
    await pomanager.page.waitForTimeout(2000);
    
});


// ---------------------------------- Test 2 --------------------------------------------

test('2. Click on Signup_Click on Close', async() => {
    
    expect(createdUsername).toBeDefined();

    await homescreen.gotoHome();
    await homescreen.gotoSignup();

    await signup.closeSignupModal(createdUsername, testData.validPassword);

});


// ----------------------------------- Test 3 ---------------------------------------------

test('3. Valid Login', async() => {

    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.validLogin(createdUsername, testData.validPassword);
    await homescreen.welcomeUserIcon(createdUsername);

});


// --------------------------------- Test 4 ------------------------------------------------

test('4. Invalid Login_Invalid Username', async() => {

    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.invalidLogin(testData.invalidUsername, testData.validPassword, testData.invalidUserErrorMessage)
    await login.closeLoginModal();

});


// ------------------------------- Test 5 -----------------------------------------------

test('5. Invalid Login_Invalid Password', async() => {

    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.invalidLogin(createdUsername, testData.wrongPassword, testData.invalidPasswordErrorMessage);
    await login.closeLoginModal();
    
});


// --------------------------------- Test 6 ---------------------------------------

test('6. Invalid Login_Invalid Username & Password', async() => {

    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.invalidLogin(testData.invalidUsername, testData.wrongPassword, testData.invalidUserErrorMessage);
    await login.closeLoginModal();

});


// ----------------------------------- Test 7 -------------------------------------------------

test('7. Login-> Select a Laptop product -> Add to Cart -> Click "ok" on the popup', async() => {
    
    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.validLogin(createdUsername, testData.validPassword);
    await homescreen.welcomeUserIcon(createdUsername);


    // Clicking on the Category link from the home page
    await homescreen.selectCategory(testData.laptopCategory);


    // Product Selection
    await homescreen.selectProduct(testData.laptop, testData.clickType);


    // Validating the product details
    await productSummary.summary(testData.laptop, "$790");
    await productSummary.addToCart(testData.purchaseAlert);
        
    // Redirecting to the home page
    await homescreen.gotoHome();

    
});


// ----------------------------------- Test 8 ---------------------------------------------------

test('8. Login-> Select a Phone-> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async() => {
    
    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.validLogin(createdUsername, testData.validPassword);
    await homescreen.welcomeUserIcon(createdUsername);


    // Clicking on the Category link from the home page
    await homescreen.selectCategory(testData.phoneCategory);


    // Product Selection
    await homescreen.selectProduct(testData.phone, testData.clickType);


    // Validating the product details
    await productSummary.summary(testData.phone, "$790");
    await productSummary.addToCart(testData.purchaseAlert);
        

    // Moving to the Cart
    await homescreen.gotoCart();
    
    
    // Removing the unwanted products
    await checkout.itemRemoval(testData.laptop);
    

    // Placing the order by entering the customer data
    await checkout.placeOrder(testData);


    // Validating the Purchase success
    await checkout.PurchaseSuccess();

});


// --------------------------------------------- Test 9 -----------------------------------------------------------------------------------------

test('9. Login-> Select a Monitor -> Add to Cart -> Click "ok" on the popup -> Add details -> Purchase', async() => {
    
    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.validLogin(createdUsername, testData.validPassword);
    await homescreen.welcomeUserIcon(createdUsername);


    // Clicking on the Category link from the home page
    await homescreen.selectCategory(testData.monitorCategory);


    // Product Selection
    await homescreen.selectProduct(testData.monitor, testData.clickType);


    // Validating the product details
    await productSummary.summary(testData.monitor, "$400");
    await productSummary.addToCart(testData.purchaseAlert);
        

    // Moving to the Cart
    await homescreen.gotoCart();

    // Placing the order by entering the customer data
    await checkout.placeOrder(testData);


    // Validating the Purchase success
    await checkout.PurchaseSuccess();

});


// --------------------------------------------- Test 10 ----------------------------------------------------------

test('10. Login with valid credentials -> Logout', async({ page }) => {
    
    await homescreen.gotoHome();
    await homescreen.gotoLogin();
    await login.validLogin(createdUsername, testData.validPassword);
    await homescreen.welcomeUserIcon(createdUsername);
    await homescreen.gotoLogout();
    await expect(homescreen.loginLink).toBeVisible();

   // await page.pause();

});

});


