import type { Meta, StoryObj } from '@storybook/react';

import { MantineDecorator } from '@/shared/config/storybook/MantineDecorator/MantineDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationList } from './NotificationList';

const meta: Meta<typeof NotificationList> = {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  decorators: [MantineDecorator, StoreDecorator({})]
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Normal: Story = {
  args: {},
  parameters: {}
};
