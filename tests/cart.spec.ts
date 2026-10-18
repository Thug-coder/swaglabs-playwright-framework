import { test, expect } from '../src/fixtures/testFixtures'
import { InventoryPage } from '../src/pages/Inventory';
import { validUser } from '../src/data/loginTestUsers';

// test.beforeEach(async ({ loginPage, inventoryPage }) => {
//     await loginPage.goto();
//     await loginPage.login(validUser.username, validUser.password);
//     await expect(inventoryPage.pageTitle).toHaveText('Products');
// })

test.describe('Cart Page', () => {
    test('Navigate to Cart Page', async ({cartPage,inventoryPage,standardUserWithProduct}) => {
        await expect(inventoryPage.cartBadgeNumber).toHaveText('1');

        await inventoryPage.goToCartPage();
        expect(cartPage.cartPageTitle);

        //await cartPage.checkProductName('Sauce Labs Fleece Jacket') 
        await expect(cartPage.cartItem).toHaveCount(1)
        await expect(cartPage.cartItem).toContainText('Sauce Labs Backpack');

        await cartPage.removeProduct('Sauce Labs Backpack')
        await expect(cartPage.cartItem).toHaveCount(0)

        await cartPage.returnToInventoryPage();

        await expect(inventoryPage.pageTitle).toHaveText('Products');
    })
})
