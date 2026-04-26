class LoginPage {
  constructor(page) {
    // 'page' is Playwright's browser page object — it's how we control the browser
    this.page = page;

    // These are our selectors — pointing to elements on the SauceDemo login page
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto('/');
  }

  // Fill in credentials and click login
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Get the error message text when login fails
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

// Export so our test files can import and use this class
module.exports = { LoginPage };