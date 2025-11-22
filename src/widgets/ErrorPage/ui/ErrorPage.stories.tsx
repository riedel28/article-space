import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ErrorPage } from './ErrorPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'widgets/ErrorPage',
    component: ErrorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ErrorPage>;

const Template: StoryFn<typeof ErrorPage> = (args) => (
    <ErrorPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
