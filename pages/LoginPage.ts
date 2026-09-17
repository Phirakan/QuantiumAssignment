import { expect, Locator, Page } from '@playwright/test';
import type { UserLogin } from '../testdata/user';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page
      .getByTestId('username-input')
    this.passwordInput = page
      .getByTestId('password-input')
    this.submitButton = page
      .getByTestId('login-submit')
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.usernameInput).toBeVisible();
  }

  async login({ username, password }: UserLogin) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.page).toHaveURL('https://qa-exercise.quantiumtech.net/#/home');
  }

}