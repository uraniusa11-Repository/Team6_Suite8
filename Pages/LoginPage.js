
export async function login(page)
{

// await page.getByRole('textbox', { name: 'Username' }).hover();
//await page.getByRole('textbox', { name: 'Username' }).fill('will');
// await page.locator('input[name="username"]').fill('will');
// await page.locator('input[name="password"]').fill('will');

await page.getByPlaceholder('Username').fill('will');
await page.getByPlaceholder('Password').fill('will');
//await page.getByRole('textbox', { name: 'Username' }).fill('will');

// await page.getByRole('textbox', { name: 'Username' }).press('Tab');
// await page.getByRole('textbox', { name: 'Password' }).fill('will');
await page.getByRole('button', { name: 'Log In' }).click();
}