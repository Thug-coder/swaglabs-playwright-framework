import { type Page, type Locator } from '@playwright/test'

export class AboutUsPage {
    private readonly page: Page
    readonly loginTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginTab = page.getByText('Login', { exact: true })
    }
}