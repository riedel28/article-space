import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { AppImage } from './AppImage';

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof AppImage>;

const Template: StoryFn<typeof AppImage> = (args) => <AppImage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
