import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    onEdit: fn(),
    onSubmit: fn(),
    onCancel: fn()
  }
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

const profileData = {
  username: 'johndoe',
  lastname: 'Doe',
  first: 'John',
  avatar
};

export const ViewMode: Story = {
  args: {
    data: profileData,
    readonly: true,
    canEdit: true
  }
};

export const ViewModeWithoutEditPermission: Story = {
  args: {
    data: profileData,
    readonly: true,
    canEdit: false
  }
};

export const EditMode: Story = {
  args: {
    data: profileData,
    readonly: false,
    canEdit: true
  }
};

export const WithError: Story = {
  args: {
    error: 'true'
  }
};

export const Loading: Story = {
  args: {
    isLoading: true
  }
};
