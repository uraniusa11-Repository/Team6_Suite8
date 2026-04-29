import { test, expect } from '@playwright/test';
import {login} from '../Pages/LoginPage';

test('test', async ({ page }) => {
  await page.goto('./#/Login');
  login(page);
});