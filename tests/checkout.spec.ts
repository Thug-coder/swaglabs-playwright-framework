import { test, expect } from '../src/fixtures/testFixtures'
import { validUser } from '../src/data/loginTestUsers';
import { ValidInformation, NoFirstName } from '../src/data/testUserData';

// test.beforeEach(async ({ loginPage, inventoryPage }) => {
//     await loginPage.goto();
//     await loginPage.login(validUser.username, validUser.password);
//     await expect(inventoryPage.pageTitle).toHaveText('Products');
// })

test.describe('Checkout Testcases', () => {
    test('Checkout Flow', async ({standardUserWithProduct, inventoryPage, cartPage, checkoutPage}) => {
        await expect(inventoryPage.cartBadgeNumber).toHaveText('1');

        await inventoryPage.goToCartPage();
        expect(cartPage.cartPageTitle);

        //await cartPage.checkProductName('Sauce Labs Fleece Jacket') 
        await expect(cartPage.cartItem).toHaveCount(1)
        await expect(cartPage.cartItem).toContainText('Sauce Labs Backpack');

        await cartPage.navigateToCheckoutPage();
        await checkoutPage.fillCheckoutDetails(ValidInformation.firstname, ValidInformation.lastname, ValidInformation.ZipPostal);

        await checkoutPage.continueToOverview();

        expect(checkoutPage.CheckoutTitle);

        await checkoutPage.finishOrder();

        expect(checkoutPage.ConfirmationMesssage).toBeVisible();
    }) 
})

test.describe('Error Messages', () => {
    test('Error messages testcases', async ({inventoryPage, cartPage, checkoutPage, standardUserWithProduct}) => {
        await expect(inventoryPage.cartBadgeNumber).toHaveText('1');

        await inventoryPage.goToCartPage();
        expect(cartPage.cartPageTitle);

        //await cartPage.checkProductName('Sauce Labs Fleece Jacket') 
        await expect(cartPage.cartItem).toHaveCount(1)
        await expect(cartPage.cartItem).toContainText('Sauce Labs Backpack');

        await cartPage.navigateToCheckoutPage();
        await checkoutPage.fillCheckoutDetails(NoFirstName.firstname, NoFirstName.lastname, NoFirstName.ZipPostal);

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.FirstNameErrorMessage).toHaveText('Error: First Name is required');
    }) 
})
