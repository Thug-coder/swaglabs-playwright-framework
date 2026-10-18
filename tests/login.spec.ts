import { test, expect } from '../src/fixtures/testFixtures'
import { LoginPage } from '../src/pages/LoginPage';
import { validUser } from '../src/data/loginTestUsers';
import { invalidPasswordUser } from '../src/data/loginTestUsers';
import { lockedoutUser } from '../src/data/loginTestUsers';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
})

test.describe('Positive Login Testcases', () => {
  test('Login with Standard User', async ({ loginPage }) => {
    await loginPage.login(validUser.username, validUser.password);
  });

  test('Login Input Textbox should display the Placeholder', async ({ loginPage }) => {

    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show an error for an incorrect password', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login(
      invalidPasswordUser.username,
      invalidPasswordUser.password
    );

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});

test.describe('Negative Login Test cases', () => {
  test('Login with Locked User', async ({ loginPage }) => {
    //const loginPage = new LoginPage(page); removed as Fixture is implemented for this

    await loginPage.login(lockedoutUser.username, lockedoutUser.password)
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
  });
})
