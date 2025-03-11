import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('login pom', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.saisirUsername('standard_user');
    await loginPage.saisirPassword('secret_sauce');
    await loginPage.cliquerSurLogin(); 
    await expect(page.getByText("Products")).toBeVisible();
  });

test('login negatif', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.saisirUsername('standard_user');
    await loginPage.saisirPassword('secret_sauceee');
    await loginPage.cliquerSurLogin();
    await expect(loginPage.elements.errormsg()).toBeVisible();
  
  });
