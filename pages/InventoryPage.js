class InventoryPage {
  constructor(page) {
    this.page = page;

    // The main container that holds all products
    this.productList = page.locator('.inventory_list');

    // All product items on the page
    this.productItems = page.locator('.inventory_item');

    // The page title — says "Products"
    this.pageTitle = page.locator('.title');

    // The sort dropdown — lets you sort by name or price
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    // The shopping cart icon in the top right
    this.cartIcon = page.locator('.shopping_cart_link');

    // The cart badge — the number shown on the cart icon
    this.cartBadge = page.locator('.shopping_cart_badge');

    // The burger menu button in the top left
    this.menuButton = page.locator('#react-burger-menu-btn');

    // The logout link inside the burger menu
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // Get the text of the page title
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  // Get how many products are showing on the page
  async getProductCount() {
    return await this.productItems.count();
  }

  // Add a product to cart by its name
  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName,
    });
    await product.locator('button').click();
  }

  // Get the number shown on the cart badge
  async getCartCount() {
    return await this.cartBadge.textContent();
  }

  // Sort products using the dropdown
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  // Get the names of all products as an array
  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  // Get the prices of all products as an array
  async getProductPrices() {
    return await this.page.locator('.inventory_item_price').allTextContents();
  }

  // Navigate to the cart page
  async goToCart() {
    await this.cartIcon.click();
  }

  // Logout via the burger menu
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };