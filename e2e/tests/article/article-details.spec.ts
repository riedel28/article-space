import { test, expect } from '@playwright/test';
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

  test('And leaves a comment', async ({ page }) => {
    await page.getByTestId('ArticleDetails.Info').waitFor();
    await page.getByTestId('AddCommentForm').scrollIntoViewIfNeeded();
    await addComment(page, 'test comment');
    const comments = page.getByTestId('CommentCard.Content');
    expect(await comments.count()).toBe(1);
  });

  test('And leaves a rating', async ({ page }) => {
    await page.getByTestId('ArticleDetails.Info').waitFor();
    await page.getByTestId('RatingCard').scrollIntoViewIfNeeded();
    await setRate(page, 4, 'feedback');
    const selectedStars = page.locator('[data-selected=true]');
    expect(await selectedStars.count()).toBe(4);
  });

  test('And leaves a rating (with fixture stub)', async ({ page }) => {
    await page.route('**/articles/*', async (route) => {
      const json = await import('../../fixtures/article-details.json');
      await route.fulfill({ json: json.default });
    });

    await page.reload();

    await page.getByTestId('ArticleDetails.Info').waitFor();
    await page.getByTestId('RatingCard').scrollIntoViewIfNeeded();
    await setRate(page, 4, 'feedback');
    const selectedStars = page.locator('[data-selected=true]');
    expect(await selectedStars.count()).toBe(4);
  });
});
