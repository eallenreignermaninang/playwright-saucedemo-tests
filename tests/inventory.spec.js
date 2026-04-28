const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../utils/testData');

test.describe('Inventory', () => {

  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    // Every inventory test starts by logging in first
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('should display the products page after login', async ({ page }) => {
    // Confirm we are on the inventory page
    await expect(page).toHaveURL('/inventory.html');

    // Confirm the page title says "Products"
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
  });

  test('should display 6 products', async () => {
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('should add a product to the cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Cart badge should now show 1
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should add multiple products to the cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Cart badge should now show 2
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('2');
  });

  test('should sort products by name Z to A', async () => {
    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getProductNames();

    // First product should come last alphabetically
    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getProductPrices();

    // Convert "$7.99" to 7.99 and check it's the lowest
    const first = parseFloat(prices[0].replace('$', ''));
    const last = parseFloat(prices[prices.length - 1].replace('$', ''));

    expect(first).toBeLessThan(last);
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.sortBy('hilo');

    const prices = await inventoryPage.getProductPrices();

    const first = parseFloat(prices[0].replace('$', ''));
    const last = parseFloat(prices[prices.length - 1].replace('$', ''));

    expect(first).toBeGreaterThan(last);
  });

  test('should navigate to cart when cart icon is clicked', async ({ page }) => {
    await inventoryPage.goToCart();
    await expect(page).toHaveURL('/cart.html');
  });

  test('should logout successfully', async ({ page }) => {
    await inventoryPage.logout();

    // After logout we should be back on the login page
    await expect(page).toHaveURL('/');
  });

});