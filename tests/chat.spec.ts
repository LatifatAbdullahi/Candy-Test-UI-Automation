import { test, expect } from '@playwright/test';
import { LoginUtil } from "../pages/login_actions";
import chatActions from '../pages/chat';


let pages: chatActions;

test('Verifying Users are able to login successfully', async ({ page }) => {
  await LoginUtil.login(page)
  pages = new chatActions(page);
});

test('Verifying Users are able to chat with a Companion', async ({ page }) => {
  await LoginUtil.login(page)
  pages = new chatActions(page);
  await pages.chatWithACompanion();
});

test('Verifying Users are able to search a Profile', async ({ page }) => {
  await LoginUtil.login(page)
  pages = new chatActions(page);
  await pages.searchACompanion();
});




