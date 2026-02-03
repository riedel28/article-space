import { Page } from '@playwright/test';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  '';

// Service role client bypasses RLS for test data setup/teardown
const serviceClient: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Anon client for user authentication (respects RLS)
const anonClient: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface User {
  id: string;
  username: string;
  roles: string[];
  avatar?: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  img: string | null;
  views: number;
  created_at: string;
  user_id: string;
  type: string[];
  content: string | null;
}

export async function login(
  _request: unknown,
  page: Page,
  username: string = 'testuser',
  password: string = '123'
): Promise<User> {
  const email = `${username}@article-space.local`;

  const { data, error } = await anonClient.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.session) {
    throw new Error(`Login failed for ${email}: ${error?.message ?? 'no session'}`);
  }

  const session = data.session;

  // Fetch the user's profile
  const { data: profile, error: profileError } = await serviceClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile) {
    throw new Error(`Profile fetch failed: ${profileError?.message ?? 'no profile'}`);
  }

  // Inject the Supabase session into the browser's localStorage
  // so that the app's initAuthData picks it up on reload
  const storageKey = `sb-${new URL(SUPABASE_URL).hostname.split('.')[0]}-auth-token`;

  await page.evaluate(
    ([key, sessionJson]) => {
      window.localStorage.setItem(key, sessionJson);
    },
    [storageKey, JSON.stringify(session)]
  );

  await page.reload();

  return {
    id: profile.id,
    username: profile.username,
    roles: profile.roles,
    avatar: profile.avatar ?? undefined
  };
}

export async function createArticle(
  _request: unknown,
  article?: Partial<Article>
): Promise<Article> {
  const defaultArticle = {
    title: 'TESTING ARTICLE',
    subtitle: 'Test subtitle',
    img: 'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
    views: 1022,
    type: ['SCIENCE'],
    content: ''
  };

  // Look up user_id from the testuser profile if not provided
  let userId = article?.user_id;
  if (!userId) {
    const { data: profile } = await serviceClient
      .from('profiles')
      .select('id')
      .eq('username', 'testuser')
      .single();
    userId = profile?.id;
  }

  const insertData = {
    ...defaultArticle,
    ...article,
    user_id: userId
  };

  const { data, error } = await serviceClient.from('articles').insert(insertData).select().single();

  if (error || !data) {
    throw new Error(`Article creation failed: ${error?.message ?? 'no data'}`);
  }

  return data as Article;
}

export async function removeArticle(_request: unknown, articleId: string): Promise<void> {
  const { error } = await serviceClient.from('articles').delete().eq('id', articleId);

  if (error) {
    throw new Error(`Article deletion failed: ${error.message}`);
  }
}

export async function resetProfile(_request: unknown, profileId: string): Promise<void> {
  const { error } = await serviceClient
    .from('profiles')
    .update({
      first_name: 'test',
      last_name: 'user',
      age: 465,
      currency: 'EUR',
      country: 'Ukraine',
      city: 'Moscow',
      username: 'testuser',
      avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg'
    })
    .eq('id', profileId);

  if (error) {
    throw new Error(`Profile reset failed: ${error.message}`);
  }
}

export async function updateProfile(
  page: Page,
  firstname: string,
  lastname: string
): Promise<void> {
  await page.getByTestId('ProfileCard.EditButton').click();
  await page.getByTestId('ProfileCard.firstname').clear();
  await page.getByTestId('ProfileCard.firstname').fill(firstname);
  await page.getByTestId('ProfileCard.lastname').clear();
  await page.getByTestId('ProfileCard.lastname').fill(lastname);
  await page.getByTestId('ProfileCard.SaveButton').click();
}

export async function addComment(page: Page, text: string): Promise<void> {
  await page.getByTestId('AddCommentForm.Input').fill(text);
  await page.getByTestId('AddCommentForm.Button').click();
}

export async function setRate(
  page: Page,
  starsCount: number = 5,
  feedback: string = 'feedback'
): Promise<void> {
  // Click the nth star in Mantine's Rating component
  const stars = page.getByTestId('RatingCard.Stars').locator('label');
  await stars.nth(starsCount - 1).click();
  await page.getByTestId('RatingCard.Input').fill(feedback);
  await page.getByTestId('RatingCard.Send').click();
}
