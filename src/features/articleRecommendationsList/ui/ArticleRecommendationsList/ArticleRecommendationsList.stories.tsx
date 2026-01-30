import type { Meta, StoryObj } from '@storybook/react';

import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta: Meta<typeof ArticleRecommendationsList> = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
};

export default meta;
type Story = StoryObj<typeof ArticleRecommendationsList>;

const article: Article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa'
};

export const Normal: Story = {
  args: {},
  decorators: [StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: `${__API__}/articles?_limit=3`,
        method: 'GET',
        status: 200,
        response: [
          { ...article, id: '1' },
          { ...article, id: '2' },
          { ...article, id: '3' }
        ]
      }
    ]
  }
};
