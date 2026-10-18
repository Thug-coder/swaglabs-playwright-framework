import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage{
    private readonly page: Page;

    readonly FirstName: Locator;
    readonly LastName: Locator;
    readonly ZipPostal: Locator;
    readonly ContinueButton: Locator;
    readonly CancelButton: Locator;
    readonly FirstNameErrorMessage: Locator;
    readonly CheckoutTitle: Locator;
    readonly FinishButton: Locator;
    readonly ItemTotal: Locator;
    readonly ConfirmationMesssage: Locator;
    readonly GeneratePDFButton: Locator;
    readonly BackHomeButton: Locator;

    constructor(page:Page){
        this.page = page;

        this.FirstName = page.getByPlaceholder('First Name', {exact: true});
        this.LastName = page.getByPlaceholder('Last Name', {exact: true});
        this.ZipPostal = page.getByPlaceholder('Zip/Postal Code', {exact: true});
        this.ContinueButton = page.getByRole('button', {name: 'Continue'});
        this.CancelButton = page.getByRole('button', {name: 'Cancel'});
        this.CheckoutTitle = page.getByText('Checkout: Overview', {exact:true});
        this.FinishButton = page.getByRole('button', {name: 'Finish'});
        this.FirstNameErrorMessage = page.getByText('Error: First Name is required', {exact:true});
        this.ItemTotal = page.locator('.summary_total_label');
        this.ConfirmationMesssage = page.getByText('Thank you for your order!', {exact: true});
        this.GeneratePDFButton = page.getByRole('button', {name: 'Generate PDF order'})
        this.BackHomeButton = page.getByRole('button', {name: 'Back Home'})
    }

    async fillCheckoutDetails(firstname: string, lastname: string, zipPostal:string){
        await this.FirstName.fill(firstname);
        await this.LastName.fill(lastname);
        await this.ZipPostal.fill(zipPostal);
    }

    async continueToOverview(){
        await this.ContinueButton.click();
    }

    async finishOrder(){
        await this.FinishButton.click()
    }
}