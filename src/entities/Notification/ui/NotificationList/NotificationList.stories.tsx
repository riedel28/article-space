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
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            title: 'Уведомление',
            description: 'Поставь лайк и оставь комментарий под Ulbi TV'
          },
          {
            id: '2',
            title: 'Уведомление 2',
            description: 'Поставь лайк и оставь комментарий под Ulbi TV'
          },
          {
            id: '3',
            title: 'Уведомление 3',
            description: 'Поставь лайк и оставь комментарий под Ulbi TV'
          }
        ]
      }
    ]
  }
};
