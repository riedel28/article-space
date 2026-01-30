import type { Preview } from '@storybook/react';
import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'fullscreen'
  },

  decorators: [
    StyleDecorator,
    ThemeDecorator('light'),
    RouterDecorator,
    SuspenseDecorator,
    FeaturesFlagsDecorator({})
  ]
};

export default preview;
