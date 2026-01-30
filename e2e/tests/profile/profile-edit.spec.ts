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
    await expect(page.getByText('test')).toBeVisible();
  });

  test('And edits it', async ({ page }) => {
    const newName = 'new';
    const newLastname = 'lastname';
    await updateProfile(page, newName, newLastname);
    await expect(page.getByTestId('ProfileCard.firstname')).toHaveValue(newName);
    await expect(page.getByTestId('ProfileCard.lastname')).toHaveValue(newLastname);
  });
});
