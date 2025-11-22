import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { AvatarDropdown } from './AvatarDropdown';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof AvatarDropdown>;

const Template: StoryFn<typeof AvatarDropdown> = (args) => (
    <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
