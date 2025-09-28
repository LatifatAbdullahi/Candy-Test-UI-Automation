
const selector = require('../elements/locators.json')
import { expect, Page } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });


class chatActions {
  constructor(private page: Page) {} 


    async chatWithACompanion() {

        await this.page.locator(selector.signInPage.chatOption).click();
        const modal = this.page.locator(selector.signInPage.promptModal).first();
        if (await modal.isVisible({ timeout: 1500 })) {
          await this.page.locator(selector.signInPage.checkBox).click();
          await this.page.locator(selector.signInPage.closePromptModal).click();
          await expect(modal).toBeHidden();
        }
        const input = this.page.locator(selector.signInPage.messageField);
        await expect(input).toBeVisible();
        await input.fill('Hello dear');
        await input.press('Enter')
        await this.page.locator(selector.signInPage.hamburgerIcon).click();
        await this.page.locator(selector.signInPage.resetChat).click();
        await this.page.locator(selector.signInPage.confirmButton).click();
        console.log("Chat successful");
      }

async searchACompanion(): Promise<string> {
  const expected = 'Lila Crazy';

  await this.page.locator(selector.signInPage.chatOption).click();

  const modal = this.page.locator(selector.signInPage.promptModal).first();
  if (await modal.isVisible({ timeout: 1500 }).catch(() => false)) {
    await this.page.locator(selector.signInPage.checkBox).click();
    await this.page.locator(selector.signInPage.closePromptModal).click();
    await expect(modal).toBeHidden();
  }

  const searchField = this.page.locator(selector.signInPage.searchField);
  await expect(searchField).toBeVisible();
  await searchField.fill(expected);
  
  const results = this.page.locator(selector.signInPage.searchResult);
  const emptySel = selector.signInPage.searchEmpty as string | undefined;

  const sawAny = await results.first().isVisible({ timeout: 5000 }).catch(() => false);
  if (!sawAny) {
    if (emptySel && await this.page.locator(emptySel).isVisible().catch(() => false)) {
      console.log('Result not found');
      return 'Result not found';
    }
   
    if (await results.count() === 0) {
      console.log('Result not found');
      return 'Result not found';
    }
  }

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = results
    .filter({ hasText: new RegExp(`\\b${escapeRegExp(expected)}\\b`, 'i') })
    .first();
  const hasMatch = await match.isVisible({ timeout: 2000 }).catch(() => false);
  if (!hasMatch) {
    console.log('Result not found');
    return 'Result not found';
  }
  const text = (await match.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.toLowerCase()).toContain(expected.toLowerCase());
  console.log('Search companion is successful:', text);
  return text;
}



 }

    

  

   

  
export default chatActions;

