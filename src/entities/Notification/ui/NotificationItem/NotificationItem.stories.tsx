import type { Meta, StoryObj } from '@storybook/react';

import { NotificationItem } from './NotificationItem';
import { MantineDecorator } from '@/shared/config/storybook/MantineDecorator/MantineDecorator';

const meta: Meta<typeof NotificationItem> = {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  decorators: [MantineDecorator]
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Unread: Story = {
  args: {
    item: {
      id: '1',
      title: 'New comment on your article',
      description: 'Someone left a comment on your article',
      unread: true
    }
  }
};

export const Read: Story = {
  args: {
    item: {
      id: '2',
      title: 'New follower: Sarah K.',
      description: 'You have a new follower'
    }
  }
};

export const WithLink: Story = {
  args: {
    item: {
      id: '3',
      title: 'Your article was featured',
      description: 'Click to view your featured article',
      href: 'https://example.com/articles/1',
      unread: true
    }
  }
};
