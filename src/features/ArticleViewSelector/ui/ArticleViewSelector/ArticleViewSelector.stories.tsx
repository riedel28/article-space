import type { Meta, StoryObj } from '@storybook/react';

import { ArticleViewSelector } from './ArticleViewSelector';

const meta: Meta<typeof ArticleViewSelector> = {
  title: 'features/ArticleViewSelector',
  component: ArticleViewSelector,
};

export default meta;
type Story = StoryObj<typeof ArticleViewSelector>;

export const Normal: Story = {
  args: {}
};
