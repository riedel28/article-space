import { expect,test } from '@playwright/test';

import { login } from '../../helpers/test-utils';

test.describe('Routing', () => {
  test.describe('User is NOT authorized', () => {
    test('Navigating to main page', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByTestId('MainPage')).toBeVisible();
    });

    test('Opening profile page redirects to main', async ({ page }) => {
      await page.goto('/profile/1');
      await expect(page.getByTestId('MainPage')).toBeVisible();
    });

    test('Navigating to non-existent route shows NotFound page', async ({ page }) => {
      await page.goto('/fasfasfasf');
      await expect(page.getByTestId('NotFoundPage')).toBeVisible();
    });
  });

  test.describe('User is authorized', () => {
    test.beforeEach(async ({ request, page }) => {
      await page.goto('/');
      await login(request, page);
    });

    test('Opening profile page shows profile', async ({ page }) => {
      await page.goto('/profile/1');
      await expect(page.getByTestId('ProfilePage')).toBeVisible();
    });

    test('Opening articles page shows articles list', async ({ page }) => {
      await page.goto('/articles');
      await expect(page.getByTestId('ArticlesPage')).toBeVisible();
    });
  });
});
