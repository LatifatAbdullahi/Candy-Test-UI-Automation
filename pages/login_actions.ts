const selector = require('../elements/locators.json')
import {expect, Page} from '@playwright/test'
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', 'login.env') });

export class LoginUtil{
    static async login(page: Page) {
    await page.goto("/");
    await page.setViewportSize({ width: 1530, height: 960 });
    await  page.locator(selector.homepage.loginButton).click();
    await page.locator(selector.homepage.emailField).fill(process.env.TEST_EMAIL || '');
    await page.locator(selector.homepage.passwordField).fill(process.env.TEST_PASSWORD || '');
    await page.locator(selector.homepage.signInButton).click();
    await page.locator(selector.signInPage.profileIcon).waitFor({ state: 'visible' });
    console.log("Login Successful");     
   
}
}
