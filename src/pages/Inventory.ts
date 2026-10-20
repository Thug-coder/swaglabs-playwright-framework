import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
    private readonly page: Page;

    readonly pageTitle: Locator;
    readonly productName: Locator;
    readonly cartBadge: Locator;
    readonly cartBadgeNumber: Locator;
    readonly sortDropdown: Locator;
    readonly productPrice: Locator;
    readonly removeProduct: Locator;
    readonly hamburgerButton: Locator;
    readonly dynamicCatelogDropdown: Locator;
    readonly aboutOption: Locator;
    readonly LogoutOption: Locator;

    constructor(page:Page){
        this.page = page;

        this.pageTitle = page.locator('.title');
        this.productName = page.locator('.inventory_item_name ');
        this.cartBadge = page.locator('.shopping_cart_link');
        this.cartBadgeNumber = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('.product_sort_container');
        this.productPrice = page.locator('.inventory_item_price');
        this.removeProduct = page.getByRole('button', {name: 'Remove'});
        this.hamburgerButton = page.getByRole('button', {name: 'Open Menu'});
        this.dynamicCatelogDropdown = page.locator('#dynamic_catalog_sidebar_link');
        this.aboutOption = page.getByText('About', {exact: true});
        this.LogoutOption = page.getByText('Logout', {exact: true});
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void>{
        await this.sortDropdown.selectOption(option);
    }

    async addToCart(productName: string): Promise<void>{
        const product = this.page.locator('.inventory_item').filter({has:this.page.getByText(productName, {exact:true})})
        await product.getByRole('button', {name: 'Add to cart'}).click();
    }

    async goToCartPage():Promise<void>{
        await this.cartBadge.click();
    }

    async removeProductFromCart(productName:string){
        const product = this.page.locator('.inventory_item').filter({has:this.page.getByText(productName, {exact:true})});
        await product.getByRole('button', {name: 'Remove'}).click();
    }

    async logout(){
        await this.hamburgerButton.click();
        await this.LogoutOption.click();
    }

    async navigateToAboutUsPage(){
        await this.hamburgerButton.click();
        await this.aboutOption.click();
    }
}