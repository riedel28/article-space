import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
