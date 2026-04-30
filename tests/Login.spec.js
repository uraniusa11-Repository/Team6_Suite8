import { test, expect } from '@playwright/test';
import {login} from '../Pages/LoginPage';
import { login} from 

test('LoginPage', async ({ page }) => {
  await page.goto('./#/Login');
  login(page);
});