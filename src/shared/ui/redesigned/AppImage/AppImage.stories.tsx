import type { Meta, StoryObj } from '@storybook/react';

import { AppImage } from './AppImage';

const meta: Meta<typeof AppImage> = {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

export default meta;
type Story = StoryObj<typeof AppImage>;

export const Normal: Story = {
  args: {}
};
