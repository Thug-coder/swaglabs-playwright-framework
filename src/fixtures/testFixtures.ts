import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/Inventory';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { validUser } from '../data/loginTestUsers';

type FrameworkFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    standardUserLogin: void;
    standardUserWith1ProductAddToCart: void
};

export const test = base.extend<FrameworkFixtures>({
    loginPage: async ({ page }, use) => {
        const loginpage = new LoginPage(page)
        await use(loginpage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page)
        await use(cartPage)
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        use(checkoutPage)
    },

    standardUserLogin: async (
        { loginPage },
        use) => {
        await loginPage.goto();
        await loginPage.login(
            validUser.username,
            validUser.password
        );
        await use();
    },

    standardUserWith1ProductAddToCart: async (
        { loginPage, inventoryPage },
        use,
    ) => {
        await loginPage.goto();
        await loginPage.login(
            validUser.username,
            validUser.password,
        );
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await use();
    },

});

export { expect } from '@playwright/test';