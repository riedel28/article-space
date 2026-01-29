import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const profileData = {
  username: 'johndoe',
  lastname: 'Doe',
  first: 'John',
  avatar
};

export const ViewMode = Template.bind({});
ViewMode.args = {
  data: profileData,
  readonly: true,
  canEdit: true,
  onEdit: action('onEdit')
};

export const ViewModeWithoutEditPermission = Template.bind({});
ViewModeWithoutEditPermission.args = {
  data: profileData,
  readonly: true,
  canEdit: false
};

export const EditMode = Template.bind({});
EditMode.args = {
  data: profileData,
  readonly: false,
  canEdit: true,
  onSubmit: action('onSubmit'),
  onCancel: action('onCancel')
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'true'
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
