import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { login } from '../../helpers/test-utils';

test.describe('User visits articles list page', () => {
  test.beforeEach(async ({ request, page }) => {
    await page.goto('/');
    await login(request, page);
    await page.goto('/articles');
  });

  test('Articles load successfully', async ({ page }) => {
    await expect(page.getByTestId('ArticleList')).toBeVisible();
    const items = page.getByTestId('ArticleListItem');
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThan(3);
  });

  test('Articles load with fixtures (mocked)', async ({ page }) => {
    await page.route('**/articles?*', async (route) => {
      const fixturePath = path.join(__dirname, '../../fixtures/articles.json');
      const json = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
      await route.fulfill({ json });
    });

    await page.reload();

    await expect(page.getByTestId('ArticleList')).toBeVisible();
    const items = page.getByTestId('ArticleListItem');
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThan(3);
  });
});
