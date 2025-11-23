import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Notifications } from './Notifications';

export default {
    title: 'features/Notifications',
    component: Notifications,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Notifications>;

const Template: StoryFn<typeof Notifications> = (args) => (
    <Notifications {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
