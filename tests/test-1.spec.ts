import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://suite8demo.suiteondemand.com/#/Login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('will');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('will');
  await page.getByRole('button', { name: 'Log In' }).click();
});