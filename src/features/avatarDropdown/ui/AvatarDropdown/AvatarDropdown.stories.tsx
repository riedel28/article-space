import type { Meta, StoryObj } from '@storybook/react';

import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { AvatarDropdown } from './AvatarDropdown';

const meta: Meta<typeof AvatarDropdown> = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
};

export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const Normal: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: '1',
          username: 'admin',
          avatar: 'https://i.pravatar.cc/150?img=3'
        }
      }
    })
  ]
};

export const AdminUser: Story = {
  args: {},
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: '1',
          username: 'admin',
          avatar: 'https://i.pravatar.cc/150?img=3',
          roles: [UserRole.ADMIN]
        }
      }
    })
  ]
};
