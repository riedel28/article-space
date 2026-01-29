import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { NotificationItem } from './NotificationItem';
import { MantineDecorator } from '@/shared/config/storybook/MantineDecorator/MantineDecorator';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [MantineDecorator]
} as Meta<typeof NotificationItem>;

const Template: StoryFn<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const Unread = Template.bind({});
Unread.args = {
  item: {
    id: '1',
    title: 'New comment on your article',
    description: 'Someone left a comment on your article',
    unread: true
  }
};

export const Read = Template.bind({});
Read.args = {
  item: {
    id: '2',
    title: 'New follower: Sarah K.',
    description: 'You have a new follower'
  }
};

export const WithLink = Template.bind({});
WithLink.args = {
  item: {
    id: '3',
    title: 'Your article was featured',
    description: 'Click to view your featured article',
    href: 'https://example.com/articles/1',
    unread: true
  }
};
