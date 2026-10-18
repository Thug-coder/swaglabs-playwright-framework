import { test, expect } from '../src/fixtures/testFixtures'
import { validUser } from '../src/data/loginTestUsers';
import { InventoryPage } from '../src/pages/Inventory';

// test.beforeEach(async ({ loginPage, inventoryPage }) => {
//     await loginPage.goto();
//     await loginPage.login(validUser.username, validUser.password);
//     await expect(inventoryPage.pageTitle).toHaveText('Products');
// })

test.describe('Sort Test', () => {
    test('Sort Z-A', async ({ inventoryPage, standardUserWithProduct }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('za')
        await expect(inventoryPage.productName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)')
    });

    test('Sort A-Z', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('az')
    });

    test('Sort Low to High', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('lohi')
    });

    test('Sort High to Low', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('hilo')
    });
});

test.describe('Add to Cart Tests', () => {
    test('Add to Cart Single Item using Product Name', async ({inventoryPage, standardUserWithProduct}) => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadgeNumber).toHaveText('1')
    })
})

test.describe('Check Product details', () => {
    test('Check all products in the page', async ({inventoryPage, standardUserWithProduct}) => {
        await expect(inventoryPage.productName).toHaveCount(6);
        await expect(inventoryPage.productName).toHaveText(['Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)'])
    })
})