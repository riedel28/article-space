import type { Meta, StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';

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
