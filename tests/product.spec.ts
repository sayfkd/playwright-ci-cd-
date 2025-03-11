import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import ProductPage from '../pages/product.page';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    await loginPage.saisirUsername('standard_user');
    await loginPage.saisirPassword('secret_sauce');
    await loginPage.cliquerSurLogin();
});

test('Affichage des produits', async ({ page }) => {
    const productPage = new ProductPage(page);
    await expect(productPage.elements.productTitle()).toHaveText("Products");
    const numberOfProducts = await productPage.getNumberOfProducts();
    
    expect(numberOfProducts).toBeGreaterThan(0);
});

test('Tri des produits par prix croissant', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.selectSorting("lohi");
    const firstProductName = await productPage.getProductName(1);
    const lastProductName = await productPage.getProductName(6);

    expect(firstProductName).toBe("Sauce Labs Onesie");
    expect(lastProductName).toBe("Sauce Labs Fleece Jacket");
});

test('add to cart, remove frome cart / icon', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.addToCart(0);
    await productPage.addToCart(1);

    const cartCount = await productPage.getCartBadgeCount();
    expect(cartCount).toBe(2);

    await productPage.removeFromCart(0);
    const updatedCartCount = await productPage.getCartBadgeCount();
    expect(updatedCartCount).toBe(1);
});