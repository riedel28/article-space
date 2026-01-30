import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AddCommentForm from './AddCommentForm';

const meta: Meta<typeof AddCommentForm> = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSendComment: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof AddCommentForm>;

export const Normal: Story = {
  args: {},
  decorators: [StoreDecorator({})],
};
