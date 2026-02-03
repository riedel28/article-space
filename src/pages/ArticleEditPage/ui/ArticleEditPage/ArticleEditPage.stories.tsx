import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleEditPage from './ArticleEditPage';

const meta: Meta<typeof ArticleEditPage> = {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
};

export default meta;
type Story = StoryObj<typeof ArticleEditPage>;

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
    }
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
    }
  }
};
