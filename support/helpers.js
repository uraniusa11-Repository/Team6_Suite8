export const navigateTo = async (page, relativePath) => {
  await page.goto(`./#/${relativePath}`);
  await page.waitForURL(url => url.href.includes(`/${relativePath}`));
};


