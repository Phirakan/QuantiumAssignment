import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser, type UserLogin } from '../testdata/user';

type AuthFixtures = {
  loginPage: LoginPage;
  userLogin: UserLogin;
  authedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  userLogin: [validUser, { option: true }],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  authedPage: async ({ page, userLogin }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(userLogin);
    await use(page);
  },
});
export { expect } from '@playwright/test';