import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ArticlesPageFilters } from './ArticlesPageFilters';

export default {
  title: 'pages/ArticlesPage/ArticlesPageFilters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof ArticlesPageFilters>;

const Template: StoryFn<typeof ArticlesPageFilters> = (args) => (
  <ArticlesPageFilters {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
