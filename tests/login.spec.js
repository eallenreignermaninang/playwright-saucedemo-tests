const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../utils/testData');

test.describe('Login', () => {

  // 'page' is automatically provided by Playwright for every test
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Before every test, create a fresh LoginPage and navigate to it
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with standard user', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    // After login, we should land on the inventory page
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    // The error message should mention locked out
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');

    // The error message should mention username and password
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show error when username is empty', async () => {
    await loginPage.login('', 'secret_sauce');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('should show error when password is empty', async () => {
    await loginPage.login('standard_user', '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

});