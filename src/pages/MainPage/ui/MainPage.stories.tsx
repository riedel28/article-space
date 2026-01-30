import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
  title: 'pages/MainPage',
  component: MainPage,
  decorators: [StoreDecorator({})]
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Normal: Story = {
  args: {}
};

export const Dark: Story = {
  args: {},
  decorators: [ThemeDecorator('dark')]
};
