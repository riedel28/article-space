import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);
const normalArgs = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' }
    }
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' }
    },
    isLoading: true
};
