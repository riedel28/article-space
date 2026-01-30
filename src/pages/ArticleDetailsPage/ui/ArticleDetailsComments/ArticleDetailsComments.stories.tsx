import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsComments } from './ArticleDetailsComments';

const meta: Meta<typeof ArticleDetailsComments> = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsComments>;

export const Normal: Story = {
  args: {
    id: '1'
  },
  decorators: [StoreDecorator({})]
};
