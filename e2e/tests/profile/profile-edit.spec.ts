import { test, expect } from '@playwright/test';
import { login, resetProfile, updateProfile } from '../../helpers/test-utils';

let profileId = '';

test.describe('User visits the profile page', () => {
  test.beforeEach(async ({ request, page }) => {
    await page.goto('/');
    const user = await login(request, page);
    profileId = user.id;
    await page.goto(`/profile/${user.id}`);
  });

  test.afterEach(async ({ request }) => {
    await resetProfile(request, profileId);
  });

  test('And profile loads successfully', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'test user' })).toBeVisible();
  });

  test('And edits it', async ({ page }) => {
    const newName = 'new';
    const newLastname = 'lastname';
    await updateProfile(page, newName, newLastname);
    // After save, the profile shows the updated name in view mode
    await expect(page.getByRole('heading', { name: `${newName} ${newLastname}` })).toBeVisible();
  });
});
