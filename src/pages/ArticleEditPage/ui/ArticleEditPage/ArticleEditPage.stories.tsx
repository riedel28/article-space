import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleEditPage from './ArticleEditPage';

export default {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof ArticleEditPage>;

const Template: StoryFn<typeof ArticleEditPage> = (args) => (
  <ArticleEditPage {...args} />
);

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
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах.'
      ]
    },
    {
      id: '2',
      type: ArticleBlockType.CODE,
      code: 'console.log("Hello, world!");'
    }
  ]
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: { id: '1', username: 'admin' }
    }
  })
];
Normal.parameters = {
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
};

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    user: {
      authData: { id: '1', username: 'admin' }
    }
  })
];
Loading.parameters = {
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
};
