import { type Locator, type Page } from "@playwright/test";
import { InventoryPage } from "./Inventory";

export class CartPage{
    private readonly page: Page;

    readonly cartPageTitle: Locator;
    readonly productName: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItem: Locator;

    constructor(page:Page){
        this.page = page;

        this.cartPageTitle = page.getByText('Your Cart', {exact: true});
        this.productName = page.locator('.inventory_item_name ');
        this.removeButton = page.getByRole('button', {name: 'Remove'});
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'});
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'});
        this.cartItem = page.locator('.cart_item');
    }

    async removeProduct(productName: string): Promise<void>{
        const product = this.cartItem.filter({has:this.page.getByText(productName, {exact:true})});
        await product.getByRole('button', {name: 'Remove'}).click();
    }

    async returnToInventoryPage(){
        await this.continueShoppingButton.click();
    }

    async navigateToCheckoutPage(){
        await this.checkoutButton.click();
    }
}