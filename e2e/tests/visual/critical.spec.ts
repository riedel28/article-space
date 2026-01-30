import { test, expect } from '@playwright/test';
import { login } from '../../helpers/test-utils';

test.describe('Critical Visual Regression Tests', () => {
  test.describe('Public pages', () => {
    test('Main page', async ({ page }) => {
      await page.goto('/');
      // Wait for page to stabilize
      await page.waitForLoadState('networkidle');
      await expect(page.getByTestId('MainPage')).toBeVisible();
      await expect(page).toHaveScreenshot('main-page.png', {
        maxDiffPixelRatio: 0.1
      });
    });

    test('Not found page', async ({ page }) => {
      await page.goto('/non-existent-route');
      await page.waitForLoadState('networkidle');
      await expect(page.getByTestId('NotFoundPage')).toBeVisible();
      await expect(page).toHaveScreenshot('not-found-page.png', {
        maxDiffPixelRatio: 0.1
      });
    });
  });

  test.describe('Authenticated pages', () => {
    test.beforeEach(async ({ request, page }) => {
      await page.goto('/');
      await login(request, page);
    });

    test('Profile page', async ({ page }) => {
      await page.goto('/profile/1');
      await page.waitForLoadState('networkidle');
      // Wait for profile to load
      await page.getByTestId('ProfilePage').waitFor();
      await expect(page).toHaveScreenshot('profile-page.png', {
        maxDiffPixelRatio: 0.1
      });
    });

    test('Articles list page - small cards view', async ({ page }) => {
      await page.goto('/articles');
      await page.waitForLoadState('networkidle');
      await page.getByTestId('ArticleList').waitFor();
      // Wait for at least one article to load
      await page.getByTestId('ArticleListItem').first().waitFor();
      await expect(page).toHaveScreenshot('articles-list-small.png', {
        maxDiffPixelRatio: 0.1
      });
    });

    test('Article details page', async ({ page }) => {
      // Navigate to first article
      await page.goto('/articles');
      await page.getByTestId('ArticleListItem').first().click();
      await page.waitForLoadState('networkidle');
      await page.getByTestId('ArticleDetails.Info').waitFor();
      await expect(page).toHaveScreenshot('article-details.png', {
        maxDiffPixelRatio: 0.1
      });
    });

    test('About page', async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('about-page.png', {
        maxDiffPixelRatio: 0.1
      });
    });
  });

  test.describe('UI Components', () => {
    test('Sidebar collapsed and expanded', async ({ page, request }) => {
      await page.goto('/');
      await login(request, page);
      await page.waitForLoadState('networkidle');

      // Screenshot with sidebar visible
      const sidebar = page.getByTestId('Sidebar');
      await sidebar.waitFor();
      await expect(sidebar).toHaveScreenshot('sidebar-expanded.png', {
        maxDiffPixelRatio: 0.1
      });

      // Toggle sidebar
      await page.getByTestId('sidebar-toggle').click();
      await page.waitForTimeout(300); // Wait for animation

      await expect(sidebar).toHaveScreenshot('sidebar-collapsed.png', {
        maxDiffPixelRatio: 0.1
      });
    });

    test('Navbar', async ({ page, request }) => {
      await page.goto('/');
      await login(request, page);
      await page.waitForLoadState('networkidle');

      const navbar = page.getByTestId('Navbar');
      await navbar.waitFor();
      await expect(navbar).toHaveScreenshot('navbar.png', {
        maxDiffPixelRatio: 0.1
      });
    });
  });
});
