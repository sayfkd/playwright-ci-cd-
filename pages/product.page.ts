import { Page } from "@playwright/test";

class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        productTitle: () => this.page.locator('.title'),
        productList: () => this.page.locator('.inventory_item'),
        sortDropdown: () => this.page.locator('[data-test="product-sort-container"]'),
        addToCartButtons: () => this.page.locator('button[data-test^="add-to-cart"]'),
        removeFromCartButtons: () => this.page.locator('button[data-test^="remove"]'),
        cartBadge: () => this.page.locator('.shopping_cart_badge'),
        cartIcon: () => this.page.locator('.shopping_cart_link'),
        productName: (index: number) => this.page.locator(`.inventory_item:nth-child(${index}) .inventory_item_name`)
    };

    async getNumberOfProducts(): Promise<number> {
        return await this.elements.productList().count();
    }

    async addToCart(index: number) {
        await this.elements.addToCartButtons().nth(index).click();
    }

    async removeFromCart(index: number) {
        await this.elements.removeFromCartButtons().nth(index).click();
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = await this.elements.cartBadge();
        return await badge.isVisible() ? parseInt(await badge.textContent() || "0") : 0;
    }

    async selectSorting(option: string) {
        await this.elements.sortDropdown().selectOption(option);
    }

    async getProductName(index: number): Promise<string> {
        return await this.elements.productName(index).innerText();
    }
}

export default ProductPage;
