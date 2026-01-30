import type { Meta, StoryObj } from '@storybook/react';

import { Article, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleEditPage from './ArticleEditPage';

const meta: Meta<typeof ArticleEditPage> = {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
};

export default meta;
type Story = StoryObj<typeof ArticleEditPage>;

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  user: {
    id: '1',
    username: 'admin'
  },
  content: `<h3>Заголовок этого блока</h3>
<p>Программа, которую по традиции называют «Hello, world!», очень проста.</p>
<p>JavaScript — это язык, программы на котором можно выполнять в разных средах.</p>
<pre><code>console.log("Hello, world!");</code></pre>`
};

export const Normal: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: { id: '1', username: 'admin' }
      }
    })
  ],
  parameters: {
    reactRouter: {
      routePath: '/articles/:id/edit',
      routeParams: { id: '1' }
    },
    mockData: [
      {
        url: `${__API__}/articles/1`,
        method: 'GET',
        status: 200,
        response: article
      }
    ]
  }
};

export const Loading: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: { id: '1', username: 'admin' }
      }
    })
  ],
  parameters: {
    reactRouter: {
      routePath: '/articles/:id/edit',
      routeParams: { id: '1' }
    },
    mockData: [
      {
        url: `${__API__}/articles/1`,
        method: 'GET',
        status: 200,
        response: article,
        delay: 10000
      }
    ]
  }
};
