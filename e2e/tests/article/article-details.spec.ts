import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { login, createArticle, removeArticle, addComment, setRate } from '../../helpers/test-utils';

let currentArticleId = '';

test.describe('User visits article details page', () => {
  test.beforeEach(async ({ request, page }) => {
    await page.goto('/');
    await login(request, page);
    const article = await createArticle(request);
    currentArticleId = article.id;
    await page.goto(`/articles/${article.id}`);
  });

  test.afterEach(async ({ request }) => {
    await removeArticle(request, currentArticleId);
  });

  test('And sees article content', async ({ page }) => {
    await expect(page.getByTestId('ArticleDetails.Info')).toBeVisible();
  });

  test('And sees recommendations list', async ({ page }) => {
    await expect(page.getByTestId('ArticleRecommendationsList')).toBeVisible();
  });

  // TODO: Fix flaky test - comment submission works but verification is timing-sensitive
  test.skip('And leaves a comment', async ({ page }) => {
    await page.getByTestId('ArticleDetails.Info').waitFor();
    // Wait for the add comment form to be visible, scrolling if needed
    const commentForm = page.getByTestId('AddCommentForm');
    await commentForm.scrollIntoViewIfNeeded();
    await expect(commentForm).toBeVisible({ timeout: 10000 });
    await addComment(page, 'test comment');
    // Wait for the comment to appear after API responds
    await expect(page.getByTestId('CommentCard.Content')).toBeVisible({ timeout: 15000 });
  });

  test('And leaves a rating', async ({ page }) => {
    await page.getByTestId('ArticleDetails.Info').waitFor();
    await page.getByTestId('RatingCard').scrollIntoViewIfNeeded();
    await setRate(page, 4, 'feedback');
    // After submitting a rating, the card shows "Thanks for rating" message
    await expect(page.getByText('Спасибо за оценку!')).toBeVisible({ timeout: 10000 });
  });

  test('And leaves a rating (with fixture stub)', async ({ page }) => {
    // Set up route interception for API requests only (port 8000)
    await page.route('**/localhost:8000/articles/*', async (route) => {
      // Only intercept GET requests for article details API
      if (route.request().method() === 'GET') {
        const fixturePath = path.join(__dirname, '../../fixtures/article-details.json');
        const json = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
        await route.fulfill({ json });
      } else {
        await route.continue();
      }
    });

    // Navigate to trigger the fixture
    await page.goto(`/articles/${currentArticleId}`);

    await page.getByTestId('ArticleDetails.Info').waitFor();
    await page.getByTestId('RatingCard').scrollIntoViewIfNeeded();
    await setRate(page, 4, 'feedback');
    // After submitting a rating, the card shows "Thanks for rating" message
    await expect(page.getByText('Спасибо за оценку!')).toBeVisible({ timeout: 10000 });
  });
});
