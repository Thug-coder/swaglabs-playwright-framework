import { test, expect } from '../src/fixtures/testFixtures'
import { validUser } from '../src/data/loginTestUsers';
import { InventoryPage } from '../src/pages/Inventory';

test.beforeEach(async ({standardUserLogin}) => {
})

test.describe('Sort Test', () => {
    test('Sort Z-A', async ({ inventoryPage}) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('za')
        await expect(inventoryPage.productName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)')

        const actualNames = await inventoryPage.productName.allInnerTexts();
        console.log(actualNames);

        const azSorted = [...actualNames].sort((a, b) => b.localeCompare(a))
        console.log(azSorted);

        expect(actualNames).toEqual(azSorted)

    });

    test('Sort A-Z', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('az')

        const actualNames = await inventoryPage.productName.allInnerTexts();
        console.log(actualNames);

        const azSorted = [...actualNames].sort((a, b) => a.localeCompare(b))
        console.log(azSorted);

        expect(actualNames).toEqual(azSorted)
    });

    test('Sort Low to High', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('lohi')

        const actualPrice = await inventoryPage.productPrice.allInnerTexts();
        const ascendingActualPrice = [...actualPrice].sort((a, b) => Number(a.replace('$', '')) - Number(b.replace('$', '')))

        expect(actualPrice).toEqual(ascendingActualPrice);
    });

    test('Sort High to Low', async ({ inventoryPage }) => {
        //const inventoryPage = new InventoryPage(page); we have used fixtures for this
        await inventoryPage.sortBy('hilo')

        const actualPrice = await inventoryPage.productPrice.allInnerTexts();
        const ascendingActualPrice = [...actualPrice].sort((a, b) => Number(b.replace('$', '')) - Number(a.replace('$', '')))

        expect(actualPrice).toEqual(ascendingActualPrice);
    });
});

test.describe('Add to Cart Tests', () => {
    test('Add and remove Product from Cart', async ({ inventoryPage }) => {
        await inventoryPage.addToCart('Sauce Labs Backpack')
        await expect(inventoryPage.cartBadgeNumber).toHaveText('1')

        await inventoryPage.removeProductFromCart('Sauce Labs Backpack')
        await expect(inventoryPage.cartBadgeNumber).toBeHidden();
    });

    test('Add All Products & Remove All Products', async ({ inventoryPage}) => {
        await expect(inventoryPage.pageTitle).toHaveText('Products');
        const products = await inventoryPage.productName.allInnerTexts();

        for (const product of products) {
            await inventoryPage.addToCart(product);
        }

        await expect(inventoryPage.cartBadgeNumber).toHaveText('6')

        const addedProducts = await inventoryPage.productName.allInnerTexts();

        for (const product of addedProducts) {
            await inventoryPage.removeProductFromCart(product)
        }

        await expect(inventoryPage.cartBadgeNumber).toBeHidden();

    })
})

test.describe('Check Product details', () => {
    test('Check all products in the page', async ({ inventoryPage }) => {
        await expect(inventoryPage.productName).toHaveCount(6);
        await expect(inventoryPage.productName).toHaveText(['Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'])
    })
})