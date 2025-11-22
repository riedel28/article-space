import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import ArticleEditPage from './ArticleEditPage';

export default {
    title: 'pages/ArticleEditPage/ArticleEditPage',
    component: ArticleEditPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ArticleEditPage>;

const Template: StoryFn<typeof ArticleEditPage> = (args) => (
    <ArticleEditPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
