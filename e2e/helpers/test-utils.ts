import { APIRequestContext, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:8000';

interface User {
  id: string;
  username: string;
  roles: string[];
  avatar?: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  userId: string;
  type: string[];
  blocks: unknown[];
}

export const USER_LOCALSTORAGE_KEY = 'user';

export async function login(
  request: APIRequestContext,
  page: Page,
  username: string = 'testuser',
  password: string = '123'
): Promise<User> {
  const response = await request.post(`${BASE_URL}/login`, {
    data: { username, password }
  });
  const user = (await response.json()) as User;

  await page.evaluate(
    ([key, value]) => {
      window.localStorage.setItem(key, value);
    },
    [USER_LOCALSTORAGE_KEY, JSON.stringify(user)]
  );

  return user;
}

export async function createArticle(
  request: APIRequestContext,
  article?: Partial<Article>
): Promise<Article> {
  const defaultArticle = {
    title: 'TESTING ARTICLE',
    subtitle: 'Test subtitle',
    img: 'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    type: ['SCIENCE'],
    blocks: []
  };

  const response = await request.post(`${BASE_URL}/articles`, {
    headers: { Authorization: 'test' },
    data: article ?? defaultArticle
  });

  return response.json();
}

export async function removeArticle(
  request: APIRequestContext,
  articleId: string
): Promise<void> {
  await request.delete(`${BASE_URL}/articles/${articleId}`, {
    headers: { Authorization: 'test' }
  });
}

export async function resetProfile(
  request: APIRequestContext,
  profileId: string
): Promise<void> {
  await request.put(`${BASE_URL}/profile/${profileId}`, {
    headers: { Authorization: 'test' },
    data: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: 465,
      currency: 'EUR',
      country: 'Ukraine',
      city: 'Moscow',
      username: 'testuser',
      avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg'
    }
  });
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
  await page.getByTestId(`StarRating.${starsCount}`).click();
  await page.getByTestId('RatingCard.Input').fill(feedback);
  await page.getByTestId('RatingCard.Send').click();
}
