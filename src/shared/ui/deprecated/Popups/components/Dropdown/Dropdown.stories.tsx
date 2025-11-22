import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};
