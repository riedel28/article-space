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

export const Normal = Template.bind({});
Normal.args = {
  item: {
    id: '1',
    title: 'Notification Title',
    description: 'This is a notification description'
  }
};

export const WithLink = Template.bind({});
WithLink.args = {
  item: {
    id: '2',
    title: 'Notification with Link',
    description: 'Click to view more details',
    href: 'https://example.com'
  }
};
