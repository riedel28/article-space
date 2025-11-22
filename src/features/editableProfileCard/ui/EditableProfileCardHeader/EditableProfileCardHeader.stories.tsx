import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';

export default {
    title: 'features/editableProfileCard/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof EditableProfileCardHeader>;

const Template: StoryFn<typeof EditableProfileCardHeader> = (args) => (
    <EditableProfileCardHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
