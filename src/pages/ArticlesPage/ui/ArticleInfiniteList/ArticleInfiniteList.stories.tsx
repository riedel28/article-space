import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ArticleInfiniteList } from './ArticleInfiniteList';

export default {
    title: 'pages/ArticlesPage/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleInfiniteList>;

const Template: StoryFn<typeof ArticleInfiniteList> = (args) => (
    <ArticleInfiniteList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
