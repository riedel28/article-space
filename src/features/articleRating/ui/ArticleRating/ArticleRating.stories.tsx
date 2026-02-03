import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
  title: 'features/ArticleRating',
  component: ArticleRating,
};

export default meta;
type Story = StoryObj<typeof ArticleRating>;

export const Normal: Story = {
  args: {
    articleId: '1'
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: { id: '1' }
      }
    })
  ],
  parameters: {}
};

export const WithoutRate: Story = {
  args: {
    articleId: '1'
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: { id: '1' }
      }
    })
  ],
  parameters: {}
};
